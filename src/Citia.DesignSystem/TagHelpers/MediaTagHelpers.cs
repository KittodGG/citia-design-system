using System.Globalization;
using Citia.DesignSystem.Localization;
using Citia.DesignSystem.Ui;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Citia.DesignSystem.TagHelpers;

static class MediaCss
{
    /// <summary>Invariant number for CSS custom properties and SVG attributes (id-ID would write a comma).</summary>
    public static string N(double value) => Math.Round(value, 2).ToString("0.##", CultureInfo.InvariantCulture);

    public static string SizeClass(string? size) => size?.ToLowerInvariant() switch
    {
        "xs" => " is-xs",
        "sm" => " is-sm",
        "lg" => " is-lg",
        "xl" => " is-xl",
        _ => "",
    };

    /// <summary>"16/9", "16-9", "16:9" → "is-16-9"; "1/1" and "square" → "is-square".</summary>
    public static string RatioClass(string? ratio)
    {
        var r = (ratio ?? "").Trim().ToLowerInvariant().Replace('/', '-').Replace(':', '-');
        if (r.Length == 0) return "";
        if (r is "1-1" or "square") return "is-square";
        return "is-" + new string(r.Where(c => char.IsLetterOrDigit(c) || c == '-').ToArray());
    }

    public static string Percent(double value, double max) => N(max <= 0 ? 0 : Math.Clamp(value / max * 100, 0, 100));
}

/// <summary>
/// <c>&lt;ds-progress value="62" label="Import" show-value tone="Success" size="sm" /&gt;</c> → linear progress with role="progressbar".
/// No <c>value</c> → indeterminate. <c>buffer="80"</c> adds a buffer layer, <c>circular</c> a ring, <c>steps="5"</c> with
/// <c>value="3"</c> a segmented bar. <c>label</c> is the accessible name; with <c>visible-label</c> it is also printed above the bar,
/// and <c>show-value</c> prints the value on the right.
/// </summary>
[HtmlTargetElement("ds-progress", TagStructure = TagStructure.WithoutEndTag)]
public sealed class ProgressTagHelper : TagHelper
{
    public double? Value { get; set; }
    public double Max { get; set; } = 100;
    public double? Buffer { get; set; }
    public string? Label { get; set; }
    /// <summary>Text for assistive technology instead of the percentage, e.g. "3 of 5 files".</summary>
    public string? ValueText { get; set; }
    public Tone Tone { get; set; } = Tone.Primary;
    public string? Size { get; set; }
    public bool ShowValue { get; set; }
    public bool VisibleLabel { get; set; }
    public bool Circular { get; set; }
    /// <summary>Number of segments; <c>value</c> is the number of completed segments.</summary>
    public int Steps { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var label = string.IsNullOrWhiteSpace(Label) ? DsText.T("media.progress") : Label;
        var determinate = Value.HasValue;
        var max = Steps > 0 ? Steps : Max;
        var value = Math.Clamp(Value ?? 0, 0, max);
        var percent = MediaCss.Percent(value, max);
        var shown = Math.Round(max <= 0 ? 0 : value / max * 100, 1).ToString("0.#", CultureInfo.CurrentCulture) + "%";
        var text = Steps > 0 ? DsText.T("media.progress.step", MediaCss.N(value), Steps) : shown;

        var bar = new TagBuilder("div");
        bar.AddCssClass(Circular ? "ds-progress-circle" : Steps > 0 ? "ds-progress-steps" : "ds-progress");
        if (Tone != Tone.Primary) bar.AddCssClass(Tone.Css());
        foreach (var c in MediaCss.SizeClass(Size).Split(' ', StringSplitOptions.RemoveEmptyEntries)) bar.AddCssClass(c);
        if (!determinate) bar.AddCssClass("is-indeterminate");
        bar.Attributes["role"] = "progressbar";
        bar.Attributes["aria-label"] = label;
        bar.Attributes["aria-valuemin"] = "0";
        if (determinate)
        {
            bar.Attributes["aria-valuemax"] = MediaCss.N(max);
            bar.Attributes["aria-valuenow"] = MediaCss.N(value);
            bar.Attributes["aria-valuetext"] = string.IsNullOrWhiteSpace(ValueText) ? text : ValueText;
            if (Steps == 0) bar.Attributes["style"] = "--ds-value:" + percent;
        }

        if (Circular)
        {
            bar.InnerHtml.AppendHtml("<svg viewBox=\"0 0 36 36\" aria-hidden=\"true\" focusable=\"false\"><circle class=\"ds-progress-circle__track\" cx=\"18\" cy=\"18\" r=\"15.9155\" pathLength=\"100\"></circle><circle class=\"ds-progress-circle__bar\" cx=\"18\" cy=\"18\" r=\"15.9155\" pathLength=\"100\"></circle></svg>");
            if (determinate && ShowValue && Size is not ("sm" or "xs"))
                bar.InnerHtml.AppendHtml("<span class=\"ds-progress-circle__label\">").Append(shown).AppendHtml("</span>");
        }
        else if (Steps > 0)
        {
            for (var i = 1; i <= Steps; i++)
                bar.InnerHtml.AppendHtml(i <= value ? "<span class=\"is-done\"></span>" : determinate && i == (int)value + 1 ? "<span aria-current=\"step\"></span>" : "<span></span>");
        }
        else
        {
            if (determinate && Buffer.HasValue)
                bar.InnerHtml.AppendHtml("<span class=\"ds-progress__buffer\" style=\"--ds-buffer:" + MediaCss.Percent(Buffer.Value, max) + "\"></span>");
            bar.InnerHtml.AppendHtml("<span class=\"ds-progress__bar\"></span>");
        }

        output.TagMode = TagMode.StartTagAndEndTag;
        if (Circular || (!VisibleLabel && !ShowValue))
        {
            output.TagName = null;
            output.Content.SetHtmlContent(bar);
            return;
        }

        output.TagName = "div";
        Classes.Add(output, "ds-meter");
        var all = new HtmlContentBuilder();
        all.AppendHtml("<div class=\"ds-meter-row\"><span>");
        if (VisibleLabel) all.Append(label);
        all.AppendHtml("</span><span>");
        if (determinate && ShowValue) all.Append(shown);
        all.AppendHtml("</span></div>");
        all.AppendHtml(bar);
        output.Content.SetHtmlContent(all);
    }
}

/// <summary>
/// <c>&lt;ds-skeleton shape="Text" lines="3" /&gt;</c> → placeholder shapes, always aria-hidden. Shapes: Text, Heading, Avatar, Rect, Image,
/// Button, Pill. <c>lines</c> &gt; 1 renders a paragraph whose last line is shorter. <c>delayed</c> shows it only after 300 ms.
/// Put <c>aria-busy="true"</c> on the region that is loading and announce it once with a status message.
/// </summary>
[HtmlTargetElement("ds-skeleton", TagStructure = TagStructure.WithoutEndTag)]
public sealed class SkeletonTagHelper : TagHelper
{
    public string Shape { get; set; } = "Text";
    public int Lines { get; set; } = 1;
    public bool Delayed { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var shape = Shape.ToLowerInvariant() switch
        {
            "heading" => " is-heading",
            "avatar" => " is-avatar",
            "rect" => " is-rect",
            "image" => " is-image",
            "button" => " is-button",
            "pill" => " is-pill",
            _ => " is-text",
        };
        var delayed = Delayed ? " is-delayed" : "";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("aria-hidden", "true");
        if (Lines > 1 && shape == " is-text")
        {
            output.TagName = "div";
            Classes.Add(output, "ds-skeleton-stack ds-skeleton-lines");
            var html = new HtmlContentBuilder();
            for (var i = 0; i < Math.Min(Lines, 12); i++) html.AppendHtml("<span class=\"ds-skeleton is-text" + delayed + "\"></span>");
            output.Content.SetHtmlContent(html);
            return;
        }
        output.TagName = "span";
        Classes.Add(output, "ds-skeleton" + shape + delayed);
    }
}

/// <summary>
/// <c>&lt;ds-spinner label="Saving…" size="lg" /&gt;</c> → ring with a visible label inside role="status". Without <c>label</c> the
/// default "Loading…" is used. Under reduced motion the ring is hidden and the label remains. <c>block</c> centers it in its container.
/// </summary>
[HtmlTargetElement("ds-spinner", TagStructure = TagStructure.WithoutEndTag)]
public sealed class SpinnerTagHelper : TagHelper
{
    public string? Label { get; set; }
    public string? Size { get; set; }
    public Tone Tone { get; set; } = Tone.Neutral;
    public bool Block { get; set; }
    /// <summary>Hide the label visually (kept for assistive technology). Use only next to other visible text.</summary>
    public bool QuietLabel { get; set; }
    public bool Delayed { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var label = string.IsNullOrWhiteSpace(Label) ? DsText.T("media.loading") : Label;
        output.TagName = "span";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("role", "status");
        Classes.Add(output, "ds-loading" + (Block ? " is-block" : "") + (Delayed ? " ds-delayed" : ""));
        var ring = new TagBuilder("span");
        ring.AddCssClass("ds-spinner" + MediaCss.SizeClass(Size) + (Tone == Tone.Neutral ? "" : " " + Tone.Css()));
        ring.Attributes["aria-hidden"] = "true";
        var html = new HtmlContentBuilder();
        html.AppendHtml(ring);
        html.AppendHtml(QuietLabel ? "<span class=\"ds-visually-hidden\">" : "<span class=\"ds-loading__label\">").Append(label).AppendHtml("</span>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>
/// <c>&lt;ds-separator /&gt;</c> → <c>&lt;hr&gt;</c> (semantic). <c>decorative</c> → role="none". <c>vertical</c> → inline divider for toolbars.
/// <c>label="or"</c> → line, text, line. Flags: <c>inset</c>, <c>strong</c>, <c>dashed</c>, <c>flush</c>; <c>align="Start|End"</c> for a labelled one.
/// </summary>
[HtmlTargetElement("ds-separator")]
public sealed class SeparatorTagHelper : TagHelper
{
    public string? Label { get; set; }
    public bool Vertical { get; set; }
    public bool Decorative { get; set; }
    public bool Inset { get; set; }
    public bool Strong { get; set; }
    public bool Dashed { get; set; }
    public bool Flush { get; set; }
    public string? Align { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var css = "ds-separator" + (Inset ? " is-inset" : "") + (Strong ? " is-strong" : "") + (Dashed ? " is-dashed" : "") + (Flush ? " is-flush" : "");
        if (!string.IsNullOrWhiteSpace(Label))
        {
            output.TagName = "div";
            output.TagMode = TagMode.StartTagAndEndTag;
            css += " has-label" + (string.Equals(Align, "start", StringComparison.OrdinalIgnoreCase) ? " is-start" : string.Equals(Align, "end", StringComparison.OrdinalIgnoreCase) ? " is-end" : "");
            Classes.Add(output, css);
            output.Content.SetContent(Label);
            return;
        }
        output.Content.Clear();
        if (Vertical)
        {
            output.TagName = "div";
            output.TagMode = TagMode.StartTagAndEndTag;
            css += " is-vertical";
            output.Attributes.SetAttribute("role", Decorative ? "none" : "separator");
            if (!Decorative) output.Attributes.SetAttribute("aria-orientation", "vertical");
        }
        else if (Decorative)
        {
            output.TagName = "div";
            output.TagMode = TagMode.StartTagAndEndTag;
            output.Attributes.SetAttribute("role", "none");
        }
        else
        {
            output.TagName = "hr";
            output.TagMode = TagMode.SelfClosing;
        }
        Classes.Add(output, css);
    }
}

/// <summary><c>&lt;ds-aspect-ratio ratio="16/9"&gt;…&lt;/ds-aspect-ratio&gt;</c> → box with a fixed ratio; the child (img, video, iframe, svg) fills it.</summary>
[HtmlTargetElement("ds-aspect-ratio")]
public sealed class AspectRatioTagHelper : TagHelper
{
    /// <summary>1/1 (or "square"), 4/3, 3/2, 16/9, 21/9, 3/4, 9/16.</summary>
    public string Ratio { get; set; } = "16/9";
    public bool Flat { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-aspect " + MediaCss.RatioClass(Ratio) + (Flat ? " is-flat" : ""));
    }
}

/// <summary>
/// <c>&lt;ds-image src="/img/site.jpg" alt="Site office, north entrance" width="1200" height="800" ratio="3/2" caption="North entrance" zoom /&gt;</c>.
/// Lazy by default; <c>priority</c> loads eagerly with high fetch priority (the first image above the fold). <c>placeholder="blur"</c> with
/// <c>blur="data:image/…"</c> shows a blurred preview while loading. <c>zoom</c> links to <c>zoom-src</c> (or <c>src</c>) and opens a lightbox with JavaScript.
/// <c>alt</c> is required: use <c>alt=""</c> only for decorative images.
/// </summary>
[HtmlTargetElement("ds-image", TagStructure = TagStructure.WithoutEndTag)]
public sealed class ImageTagHelper : TagHelper
{
    public string Src { get; set; } = "";
    public string Alt { get; set; } = "";
    public int? Width { get; set; }
    public int? Height { get; set; }
    public string? Srcset { get; set; }
    public string? Sizes { get; set; }
    public string? Ratio { get; set; }
    /// <summary>none, sm, lg, xl, full (default is the box radius).</summary>
    public string? Radius { get; set; }
    /// <summary>cover (default), contain, fill, none, scale-down.</summary>
    public string? Fit { get; set; }
    public string? Caption { get; set; }
    public bool Zoom { get; set; }
    public string? ZoomSrc { get; set; }
    public bool Priority { get; set; }
    public string? Placeholder { get; set; }
    public string? Blur { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var img = new TagBuilder("img") { TagRenderMode = TagRenderMode.SelfClosing };
        img.Attributes["src"] = Src;
        img.Attributes["alt"] = Alt;
        if (Width is > 0) img.Attributes["width"] = Width.Value.ToString(CultureInfo.InvariantCulture);
        if (Height is > 0) img.Attributes["height"] = Height.Value.ToString(CultureInfo.InvariantCulture);
        if (!string.IsNullOrEmpty(Srcset)) img.Attributes["srcset"] = Srcset;
        if (!string.IsNullOrEmpty(Sizes)) img.Attributes["sizes"] = Sizes;
        img.Attributes["decoding"] = "async";
        if (Priority) img.Attributes["fetchpriority"] = "high";
        else img.Attributes["loading"] = "lazy";

        var frame = new TagBuilder("div");
        frame.AddCssClass("ds-image-frame");
        if (!string.IsNullOrEmpty(Fit)) frame.AddCssClass("is-" + Fit.ToLowerInvariant());
        if (!string.IsNullOrEmpty(Radius)) frame.AddCssClass("is-radius-" + Radius.ToLowerInvariant());
        if (string.Equals(Placeholder, "blur", StringComparison.OrdinalIgnoreCase) && !string.IsNullOrEmpty(Blur))
        {
            frame.Attributes["data-placeholder"] = "blur";
            frame.Attributes["data-ds-blur"] = Blur;
        }
        frame.InnerHtml.AppendHtml(img);

        IHtmlContent media = frame;
        if (!string.IsNullOrEmpty(Ratio))
        {
            var box = new TagBuilder("div");
            box.AddCssClass("ds-aspect " + MediaCss.RatioClass(Ratio));
            box.InnerHtml.AppendHtml(frame);
            media = box;
        }
        if (Zoom)
        {
            var link = new TagBuilder("a");
            link.AddCssClass("ds-image-zoom");
            link.Attributes["href"] = string.IsNullOrEmpty(ZoomSrc) ? Src : ZoomSrc;
            link.Attributes["data-ds-zoom"] = "";
            link.InnerHtml.AppendHtml(media);
            media = link;
        }

        output.TagMode = TagMode.StartTagAndEndTag;
        if (string.IsNullOrWhiteSpace(Caption))
        {
            output.TagName = null;
            output.Content.SetHtmlContent(media);
            return;
        }
        output.TagName = "figure";
        Classes.Add(output, "ds-figure");
        var figure = new HtmlContentBuilder();
        figure.AppendHtml(media).AppendHtml("<figcaption>").Append(Caption).AppendHtml("</figcaption>");
        output.Content.SetHtmlContent(figure);
    }
}

/// <summary>Indicator style of a carousel.</summary>
public enum CarouselIndicators
{
    Dots,
    Thumbs,
    Count,
    None,
}

/// <summary>
/// <c>&lt;ds-carousel label="Site photos" per-view="3" loop autoplay="6000" indicators="Thumbs"&gt;&lt;ds-slide&gt;…&lt;/ds-slide&gt;&lt;/ds-carousel&gt;</c>.
/// Scroll snap works without JavaScript; ds.js adds buttons, indicators, keyboard, drag and the live region. Autoplay is off unless
/// <c>autoplay</c> (milliseconds) is set and never runs under reduced motion. <c>label</c> names the carousel for assistive technology.
/// </summary>
[HtmlTargetElement("ds-carousel")]
public sealed class CarouselTagHelper : TagHelper
{
    public string? Label { get; set; }
    /// <summary>Slides visible at once (1–4). Narrow containers show fewer.</summary>
    public int PerView { get; set; } = 1;
    public bool Loop { get; set; }
    /// <summary>Milliseconds between slides; 0 = off.</summary>
    public int Autoplay { get; set; }
    public CarouselIndicators Indicators { get; set; } = CarouselIndicators.Dots;

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var slides = await output.GetChildContentAsync();
        output.TagName = "section";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-carousel");
        output.Attributes.SetAttribute("data-ds-carousel", "");
        output.Attributes.SetAttribute("aria-roledescription", "carousel");
        output.Attributes.SetAttribute("aria-label", string.IsNullOrWhiteSpace(Label) ? DsText.T("media.carousel") : Label);
        if (Loop) output.Attributes.SetAttribute("data-ds-loop", "");
        if (Autoplay > 0) output.Attributes.SetAttribute("data-ds-autoplay", Autoplay.ToString(CultureInfo.InvariantCulture));
        if (Indicators != CarouselIndicators.Dots) output.Attributes.SetAttribute("data-ds-indicators", Indicators.ToString().ToLowerInvariant());
        if (PerView > 1)
        {
            var style = "--ds-per-view:" + Math.Clamp(PerView, 1, 4).ToString(CultureInfo.InvariantCulture);
            var existing = output.Attributes.TryGetAttribute("style", out var attribute) ? attribute.Value?.ToString() : null;
            output.Attributes.SetAttribute("style", string.IsNullOrEmpty(existing) ? style : existing.TrimEnd(';') + ";" + style);
        }
        var html = new HtmlContentBuilder();
        html.AppendHtml("<div class=\"ds-carousel__viewport\"><div class=\"ds-carousel__track\">").AppendHtml(slides).AppendHtml("</div></div>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>One slide of <c>&lt;ds-carousel&gt;</c>. The position label ("2 of 5") is added by ds.js.</summary>
[HtmlTargetElement("ds-slide", ParentTag = "ds-carousel")]
public sealed class CarouselSlideTagHelper : TagHelper
{
    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-carousel__slide");
    }
}

/// <summary>
/// <c>&lt;ds-sparkline values="@(new double[] { 12, 14, 13, 18, 21 })" label="Orders, last 5 days: from 12 to 21" /&gt;</c> → inline trend line
/// (role="img"). <c>area</c> fills under the line, <c>large</c> is 9 × 2.5 rem. The label should state the start, the end and the direction.
/// </summary>
[HtmlTargetElement("ds-sparkline", TagStructure = TagStructure.WithoutEndTag)]
public sealed class SparklineTagHelper : TagHelper
{
    public IEnumerable<double>? Values { get; set; }
    public string? Label { get; set; }
    public Tone Tone { get; set; } = Tone.Primary;
    public bool Area { get; set; }
    public bool Large { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var data = Values?.ToArray() ?? Array.Empty<double>();
        output.TagName = "svg";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-sparkline" + (Large ? " is-lg" : "") + (Tone == Tone.Primary ? "" : " " + Tone.Css()));
        output.Attributes.SetAttribute("viewBox", "0 0 96 24");
        output.Attributes.SetAttribute("role", "img");
        output.Attributes.SetAttribute("aria-label", string.IsNullOrWhiteSpace(Label) ? DsText.T("media.trend") : Label);
        output.Attributes.SetAttribute("focusable", "false");
        if (data.Length < 2)
        {
            output.Content.SetHtmlContent("");
            return;
        }
        double min = data.Min(), max = data.Max(), span = max - min;
        string X(int i) => MediaCss.N(2 + i * 92.0 / (data.Length - 1));
        string Y(double v) => MediaCss.N(span <= 0 ? 12 : 21 - (v - min) / span * 18);
        var line = string.Join(" ", data.Select((v, i) => (i == 0 ? "M" : "L") + X(i) + " " + Y(v)));
        var html = new HtmlContentBuilder();
        if (Area) html.AppendHtml("<path class=\"ds-area\" d=\"" + line + " L" + X(data.Length - 1) + " 24 L" + X(0) + " 24 Z\"></path>");
        html.AppendHtml("<path class=\"ds-line\" d=\"" + line + "\"></path>");
        html.AppendHtml("<circle class=\"ds-dot\" cx=\"" + X(data.Length - 1) + "\" cy=\"" + Y(data[^1]) + "\" r=\"2.5\"></circle>");
        output.Content.SetHtmlContent(html);
    }
}
