using System.Net;
using Citia.DesignSystem.Icons;
using Citia.DesignSystem.Ui;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Citia.DesignSystem.TagHelpers;

/// <summary>
/// <c>&lt;ds-icon name="plus" /&gt;</c> → inline SVG. Optional: <c>size="xs|sm|md|lg|xl"</c>, <c>class</c>, <c>label</c>
/// (only when the icon is the sole content of a control without another accessible name).
/// </summary>
[HtmlTargetElement("ds-icon", TagStructure = TagStructure.WithoutEndTag)]
public sealed class IconTagHelper : TagHelper
{
    public string Name { get; set; } = "";
    public string? Size { get; set; }
    public string? Label { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var css = "ds-icon";
        if (!string.IsNullOrEmpty(Size)) css += $" is-{Size}";
        if (output.Attributes.TryGetAttribute("class", out var cls)) css += $" {cls.Value}";
        // Other attributes (data-*, id, style) travel onto the <svg>.
        var extra = string.Concat(output.Attributes.Where(a => a.Name != "class")
            .Select(a => $" {a.Name}=\"{WebUtility.HtmlEncode(a.Value?.ToString() ?? "")}\""));
        var svg = Icon.Svg(Name, css, Label).ToString()!;
        output.TagName = null;
        output.Attributes.Clear();
        output.Content.SetHtmlContent(extra.Length == 0 ? svg : "<svg" + extra + svg[4..]);
    }
}

/// <summary>
/// <c>&lt;ds-pill tone="Success"&gt;Active&lt;/ds-pill&gt;</c> → status pill (dot + word). Flags: <c>live</c> (blinking dot),
/// <c>outline</c> (not active yet / scheduled), <c>plain</c> (no dot); <c>size="sm|lg"</c>.
/// </summary>
[HtmlTargetElement("ds-pill")]
public sealed class PillTagHelper : TagHelper
{
    public Tone Tone { get; set; } = Tone.Neutral;
    public bool Live { get; set; }
    public bool Outline { get; set; }
    public bool Plain { get; set; }
    public string? Size { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "span";
        output.TagMode = TagMode.StartTagAndEndTag;
        var css = $"ds-pill {Tone.Css()}{(Live ? " is-live" : "")}{(Outline ? " is-outline" : "")}{(Plain ? " is-plain" : "")}{(string.IsNullOrEmpty(Size) ? "" : $" is-{Size}")}";
        Classes.Add(output, css);
    }
}

/// <summary>
/// <c>&lt;ds-tag tone="Info"&gt;Trial&lt;/ds-tag&gt;</c> → small label without a dot (category, plan, count).
/// Options: <c>outline</c>, <c>size="sm|lg"</c>, <c>icon="tag"</c> (leading icon), <c>removable</c> (adds a remove button named
/// "Remove {text}"; the app handles the click, e.g. <c>data-ds-*</c> or its own script).
/// </summary>
[HtmlTargetElement("ds-tag")]
public sealed class TagTagHelper : TagHelper
{
    public Tone Tone { get; set; } = Tone.Neutral;
    public bool Outline { get; set; }
    public string? Size { get; set; }
    public string? Icon { get; set; }
    public bool Removable { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "span";
        output.TagMode = TagMode.StartTagAndEndTag;
        var css = (Tone == Tone.Neutral ? "ds-tag" : $"ds-tag {Tone.Css()}")
            + (Outline ? " is-outline" : "") + (string.IsNullOrEmpty(Size) ? "" : $" is-{Size}");
        Classes.Add(output, css);
        if (string.IsNullOrEmpty(Icon) && !Removable) return;

        var child = await output.GetChildContentAsync();
        var text = child.GetContent();
        if (!string.IsNullOrEmpty(Icon)) output.PreContent.SetHtmlContent(Citia.DesignSystem.Icons.Icon.Svg(Icon));
        output.Content.SetHtmlContent($"<span class=\"ds-tag__label\">{text}</span>");
        if (Removable)
        {
            var label = WebUtility.HtmlEncode(Localization.DsText.T("chip.remove", WebUtility.HtmlDecode(text).Trim()));
            output.PostContent.SetHtmlContent($"<button type=\"button\" class=\"ds-tag__remove\" aria-label=\"{label}\">{Citia.DesignSystem.Icons.Icon.Svg("x")}</button>");
        }
    }
}

/// <summary>
/// Empty state: icon, one heading, one sentence (child content), a primary action and an optional secondary action.
/// <c>variant="first-use|no-results|error|permission|compact"</c>.
/// <c>&lt;ds-empty icon="briefcase" title="No projects yet" action-label="New project" action-href="/Projects/Create" boxed&gt;Projects you create appear here.&lt;/ds-empty&gt;</c>
/// </summary>
[HtmlTargetElement("ds-empty")]
public sealed class EmptyStateTagHelper : TagHelper
{
    public string Icon { get; set; } = "info";
    public string Title { get; set; } = "";
    public string? ActionLabel { get; set; }
    public string? ActionHref { get; set; }
    public string ActionIcon { get; set; } = "plus";
    public bool Boxed { get; set; }
    /// <summary>Heading level, 2 by default (3 inside a card that already has an h2).</summary>
    public int Level { get; set; } = 2;
    /// <summary>first-use | no-results | error | permission | compact (adds <c>is-&lt;variant&gt;</c>).</summary>
    public string? Variant { get; set; }
    /// <summary>Optional second, quieter action (e.g. "Clear filters", "Learn more").</summary>
    public string? SecondaryLabel { get; set; }
    public string? SecondaryHref { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var text = (await output.GetChildContentAsync()).GetContent();
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        var variant = Variant is { Length: > 0 } v && System.Text.RegularExpressions.Regex.IsMatch(v, "^[a-z-]+$") ? $" is-{v}" : "";
        Classes.Add(output, (Boxed ? "ds-empty is-boxed" : "ds-empty") + variant);
        var level = Math.Clamp(Level, 2, 4);
        var html = new HtmlContentBuilder();
        html.AppendHtml("<span class=\"ds-empty-icon\">").AppendHtml(Icons.Icon.Svg(Icon, "ds-icon is-lg")).AppendHtml("</span>");
        html.AppendHtml($"<h{level}>").Append(Title).AppendHtml($"</h{level}>");
        if (!string.IsNullOrWhiteSpace(text)) html.AppendHtml("<p>").AppendHtml(text).AppendHtml("</p>");
        var primary = !string.IsNullOrEmpty(ActionLabel) && !string.IsNullOrEmpty(ActionHref);
        var secondary = !string.IsNullOrEmpty(SecondaryLabel) && !string.IsNullOrEmpty(SecondaryHref);
        if (primary || secondary)
        {
            html.AppendHtml("<div class=\"ds-empty__actions\">");
            if (secondary)
                html.AppendHtml($"<a class=\"btn btn-ghost btn-sm\" href=\"{WebUtility.HtmlEncode(SecondaryHref)}\">").Append(SecondaryLabel!).AppendHtml("</a>");
            if (primary)
                html.AppendHtml($"<a class=\"btn btn-primary btn-sm\" href=\"{WebUtility.HtmlEncode(ActionHref)}\">")
                    .AppendHtml(Icons.Icon.Svg(ActionIcon)).Append(ActionLabel!).AppendHtml("</a>");
            html.AppendHtml("</div>");
        }
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>TagHelperOutput.AddClass accepts one class at a time; this adds a space-separated list.</summary>
static class Classes
{
    public static void Add(TagHelperOutput output, string classes)
    {
        foreach (var name in classes.Split(' ', StringSplitOptions.RemoveEmptyEntries))
            output.AddClass(name, System.Text.Encodings.Web.HtmlEncoder.Default);
    }
}
