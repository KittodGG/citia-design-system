using System.Globalization;
using System.Net;
using System.Text.RegularExpressions;
using Citia.DesignSystem.Localization;
using Citia.DesignSystem.Ui;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Citia.DesignSystem.TagHelpers;

static class DisplayHtml
{
    public static string E(string? value) => WebUtility.HtmlEncode(value ?? "");
    public static string Size(string? size) => string.IsNullOrEmpty(size) || size == "md" ? "" : $" is-{size}";
}

/// <summary>
/// <c>&lt;ds-avatar name="Ayu Lestari" src="/img/ayu.jpg" size="lg" shape="circle" presence="online" /&gt;</c>.
/// Image with initials behind it (shown while loading or when the image fails), or an icon when there is no name.
/// <c>size</c>: xs sm md lg xl. <c>shape</c>: square (default) or circle. <c>presence</c>: online away busy offline.
/// </summary>
[HtmlTargetElement("ds-avatar", TagStructure = TagStructure.WithoutEndTag)]
public sealed class AvatarTagHelper : TagHelper
{
    public string? Name { get; set; }
    public string? Src { get; set; }
    public string? Icon { get; set; }
    public string? Size { get; set; }
    public string Shape { get; set; } = "square";
    public string? Presence { get; set; }
    /// <summary>Accessible name override; defaults to the name (plus presence).</summary>
    public string? Label { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "span";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, $"ds-avatar {Avatar.ColorClass(Name)}{DisplayHtml.Size(Size)}{(Shape == "circle" ? " is-round" : "")}");
        var presenceText = string.IsNullOrEmpty(Presence) ? null : DsText.T($"avatar.presence.{Presence}");
        var name = Label ?? Name;
        if (!string.IsNullOrEmpty(name))
        {
            output.Attributes.SetAttribute("role", "img");
            output.Attributes.SetAttribute("aria-label", presenceText is null ? name : $"{name}, {presenceText}");
        }
        else output.Attributes.SetAttribute("aria-hidden", "true");

        var html = new HtmlContentBuilder();
        if (!string.IsNullOrEmpty(Icon) && string.IsNullOrEmpty(Name)) html.AppendHtml(Icons.Icon.Svg(Icon));
        else html.AppendHtml("<span aria-hidden=\"true\">").Append(Avatar.Initials(Name)).AppendHtml("</span>");
        if (!string.IsNullOrEmpty(Src))
            html.AppendHtml($"<img class=\"ds-avatar__img\" src=\"{DisplayHtml.E(Src)}\" alt=\"\" loading=\"lazy\" decoding=\"async\">");
        if (!string.IsNullOrEmpty(Presence))
            html.AppendHtml($"<span class=\"ds-avatar__presence\" data-presence=\"{DisplayHtml.E(Presence)}\" aria-hidden=\"true\"></span>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>
/// Overlapping stack of avatars with a "+N" overflow avatar (its title and accessible name list the hidden people).
/// <c>&lt;ds-avatar-group names="@Model.Members" max="4" size="sm" shape="circle" /&gt;</c>
/// </summary>
[HtmlTargetElement("ds-avatar-group", TagStructure = TagStructure.WithoutEndTag)]
public sealed class AvatarGroupTagHelper : TagHelper
{
    public IEnumerable<string> Names { get; set; } = [];
    public int Max { get; set; } = 4;
    public string? Size { get; set; }
    public string Shape { get; set; } = "circle";
    public string? Label { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var all = Names.ToList();
        var shown = all.Take(Math.Max(1, Max)).ToList();
        var rest = all.Skip(shown.Count).ToList();
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-avatar-group");
        if (!string.IsNullOrEmpty(Label))
        {
            output.Attributes.SetAttribute("role", "group");
            output.Attributes.SetAttribute("aria-label", Label);
        }
        var shape = Shape == "circle" ? " is-round" : "";
        var html = new HtmlContentBuilder();
        foreach (var name in shown)
            html.AppendHtml($"<span class=\"ds-avatar {Avatar.ColorClass(name)}{DisplayHtml.Size(Size)}{shape}\" role=\"img\" aria-label=\"{DisplayHtml.E(name)}\" title=\"{DisplayHtml.E(name)}\"><span aria-hidden=\"true\">{DisplayHtml.E(Avatar.Initials(name))}</span></span>");
        if (rest.Count > 0)
        {
            var names = string.Join(", ", rest);
            var text = DsText.T("avatar.more", rest.Count, names);
            html.AppendHtml($"<span class=\"ds-avatar is-more{DisplayHtml.Size(Size)}{shape}\" role=\"img\" aria-label=\"{DisplayHtml.E(text)}\" title=\"{DisplayHtml.E(names)}\"><span aria-hidden=\"true\">+{rest.Count}</span></span>");
        }
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>
/// Count or dot badge. <c>&lt;ds-badge count="@unread" max="99" label="unread" /&gt;</c> renders "99+" above the cap and hides at 0
/// (<c>show-zero</c> keeps it). <c>dot</c> renders a dot; give it <c>label</c> so the meaning is in the accessible name.
/// <c>tone</c>, <c>soft</c>, <c>outline</c>, <c>size</c> (sm, lg), <c>live</c> (announces changes).
/// </summary>
[HtmlTargetElement("ds-badge", TagStructure = TagStructure.WithoutEndTag)]
public sealed class BadgeTagHelper : TagHelper
{
    public int Count { get; set; }
    public int Max { get; set; } = 99;
    public bool Dot { get; set; }
    public bool ShowZero { get; set; }
    public Tone Tone { get; set; } = Tone.Primary;
    public bool Soft { get; set; }
    public bool Outline { get; set; }
    public string? Size { get; set; }
    public string? Label { get; set; }
    public bool Live { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "span";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, $"ds-badge {Tone.Css()}{(Soft ? " is-soft" : "")}{(Outline ? " is-outline" : "")}{(Dot ? " is-dot" : "")}{DisplayHtml.Size(Size)}");
        var html = new HtmlContentBuilder();
        if (Dot)
        {
            if (!string.IsNullOrEmpty(Label)) html.AppendHtml("<span class=\"ds-visually-hidden\">").Append(Label).AppendHtml("</span>");
        }
        else
        {
            var n = Math.Max(0, Count);
            output.Attributes.SetAttribute("data-ds-badge", "");
            output.Attributes.SetAttribute("data-count", n);
            output.Attributes.SetAttribute("data-ds-badge-max", Max);
            if (!string.IsNullOrEmpty(Label)) output.Attributes.SetAttribute("data-ds-badge-label", Label);
            if (Live) output.Attributes.SetAttribute("data-ds-badge-live", "");
            if (ShowZero) output.Attributes.SetAttribute("data-ds-badge-zero", "show");
            if (n == 0 && !ShowZero) output.Attributes.SetAttribute("hidden", "hidden");
            var shown = n > Max ? $"{Max}+" : n.ToString(CultureInfo.InvariantCulture);
            var sr = !string.IsNullOrEmpty(Label) ? $"{n} {Label}" : n > Max ? DsText.T("badge.overflow", Max) : n == 1 ? DsText.T("badge.one") : DsText.T("badge.count", n);
            html.AppendHtml("<span data-ds-badge-text=\"\" aria-hidden=\"true\">").Append(shown).AppendHtml("</span>")
                .AppendHtml("<span class=\"ds-visually-hidden\"").AppendHtml(Live ? " role=\"status\" aria-live=\"polite\"" : "").AppendHtml(">").Append(sr).AppendHtml("</span>");
        }
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>
/// Record status: squared tonal label with a dot. <c>&lt;ds-status tone="Success"&gt;Active&lt;/ds-status&gt;</c>.
/// Flags: <c>live</c> (blinking dot), <c>outline</c>, <c>no-dot</c>; <c>size</c> sm or lg. For workflow states use <c>ds-pill</c>.
/// </summary>
[HtmlTargetElement("ds-status")]
public sealed class StatusTagHelper : TagHelper
{
    public Tone Tone { get; set; } = Tone.Neutral;
    public bool Live { get; set; }
    public bool Outline { get; set; }
    public bool NoDot { get; set; }
    public string? Size { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "span";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, $"ds-status {Tone.Css()}{(NoDot ? "" : " has-dot")}{(Live ? " is-live" : "")}{(Outline ? " is-outline" : "")}{DisplayHtml.Size(Size)}");
    }
}

public enum ChipVariant { Filter, Input, Assist, Suggestion }

/// <summary>
/// Chip. Filter (toggle, <c>pressed</c>), Input (removable), Assist and Suggestion (button, or link with <c>href</c>).
/// <c>&lt;ds-chip variant="Filter" pressed count="12"&gt;Overdue&lt;/ds-chip&gt;</c>,
/// <c>&lt;ds-chip variant="Input"&gt;ayu@example.com&lt;/ds-chip&gt;</c>. Wrap several in <c>ds-chip-set</c> for roving focus.
/// </summary>
[HtmlTargetElement("ds-chip")]
public sealed class ChipTagHelper : TagHelper
{
    public ChipVariant Variant { get; set; } = ChipVariant.Filter;
    public bool Pressed { get; set; }
    public string? Icon { get; set; }
    public int? Count { get; set; }
    public string? Href { get; set; }
    public bool Disabled { get; set; }
    public bool Error { get; set; }
    public string? Size { get; set; }
    public string? RemoveLabel { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var text = (await output.GetChildContentAsync()).GetContent();
        var variantClass = Variant switch { ChipVariant.Input => " is-input", ChipVariant.Assist => " is-assist", ChipVariant.Suggestion => " is-suggestion", _ => "" };
        Classes.Add(output, $"ds-chip{variantClass}{(Error ? " is-error" : "")}{DisplayHtml.Size(Size)}");
        output.TagMode = TagMode.StartTagAndEndTag;
        if (Variant == ChipVariant.Input)
        {
            output.TagName = "span";
            output.Attributes.SetAttribute("tabindex", "-1");
            if (Disabled) output.Attributes.SetAttribute("aria-disabled", "true");
        }
        else if (!string.IsNullOrEmpty(Href) && Variant != ChipVariant.Filter)
        {
            output.TagName = "a";
            output.Attributes.SetAttribute("href", Href);
            if (Disabled) output.Attributes.SetAttribute("aria-disabled", "true");
        }
        else
        {
            output.TagName = "button";
            output.Attributes.SetAttribute("type", "button");
            if (Disabled) output.Attributes.SetAttribute("disabled", "disabled");
            if (Variant == ChipVariant.Filter)
            {
                output.Attributes.SetAttribute("aria-pressed", Pressed ? "true" : "false");
                output.Attributes.SetAttribute("data-ds-chip-toggle", "");
            }
        }

        var html = new HtmlContentBuilder();
        if (Variant == ChipVariant.Filter && string.IsNullOrEmpty(Icon))
            html.AppendHtml("<span class=\"ds-chip__check\">").AppendHtml(Icons.Icon.Svg("check")).AppendHtml("</span>");
        else if (!string.IsNullOrEmpty(Icon))
            html.AppendHtml(Icons.Icon.Svg(Icon, "ds-icon ds-chip__icon"));
        html.AppendHtml("<span class=\"ds-chip__label\">").AppendHtml(text).AppendHtml("</span>");
        if (Count is { } n) html.AppendHtml("<span class=\"ds-chip__count\">").Append(n.ToString(CultureInfo.CurrentCulture)).AppendHtml("</span>");
        if (Variant == ChipVariant.Input)
        {
            var plain = WebUtility.HtmlDecode(Regex.Replace(text, "<.*?>", "")).Trim();
            var label = RemoveLabel ?? DsText.T("chip.remove", plain);
            html.AppendHtml($"<button type=\"button\" class=\"ds-chip__remove\" tabindex=\"-1\" data-ds-chip-remove=\"\" aria-label=\"{DisplayHtml.E(label)}\"{(Disabled ? " disabled" : "")}>")
                .AppendHtml(Icons.Icon.Svg("x")).AppendHtml("</button>");
        }
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>Chip set: <c>mode="single"</c> makes pressed filter chips exclusive; <c>max</c> collapses the rest behind "+N more"; <c>nowrap</c> scrolls in one row.</summary>
[HtmlTargetElement("ds-chip-set")]
public sealed class ChipSetTagHelper : TagHelper
{
    public string? Label { get; set; }
    public string Mode { get; set; } = "multiple";
    public int? Max { get; set; }
    public bool Nowrap { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, $"ds-chips{(Nowrap ? " is-nowrap" : "")}");
        output.Attributes.SetAttribute("role", "group");
        if (!string.IsNullOrEmpty(Label)) output.Attributes.SetAttribute("aria-label", Label);
        output.Attributes.SetAttribute("data-ds-chips", Mode.Equals("single", StringComparison.OrdinalIgnoreCase) ? "single" : "");
        if (Max is { } m) output.Attributes.SetAttribute("data-ds-chips-max", m);
    }
}

sealed class CardParts
{
    public IHtmlContent? Actions { get; set; }
    public IHtmlContent? Footer { get; set; }
}

/// <summary>
/// Card. <c>&lt;ds-card title="Website redesign" eyebrow="PRJ-1024" description="Updated 2 Nov 2026" href="/projects/1024"&gt;Body&lt;/ds-card&gt;</c>.
/// <c>href</c> makes the whole card one link (the title); <c>selectable</c> + <c>name</c>/<c>value</c> makes it a checkbox or radio (<c>input-type</c>);
/// <c>image</c> adds media; <c>horizontal</c> puts it beside the content; <c>loading</c> renders a skeleton. Child tags: <c>ds-card-actions</c>, <c>ds-card-footer</c>.
/// </summary>
[HtmlTargetElement("ds-card")]
public sealed class CardTagHelper : TagHelper
{
    public string? Title { get; set; }
    public string? Eyebrow { get; set; }
    public string? Description { get; set; }
    public string? Href { get; set; }
    public string? Image { get; set; }
    public string ImageAlt { get; set; } = "";
    public bool Horizontal { get; set; }
    public bool Selectable { get; set; }
    public string InputType { get; set; } = "checkbox";
    public string? Name { get; set; }
    public string? Value { get; set; }
    public bool Checked { get; set; }
    public bool Disabled { get; set; }
    public bool Loading { get; set; }
    public bool Danger { get; set; }
    /// <summary>Heading level of the title, 3 by default.</summary>
    public int Level { get; set; } = 3;

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var parts = new CardParts();
        context.Items[typeof(CardParts)] = parts;
        var body = (await output.GetChildContentAsync()).GetContent();
        var level = Math.Clamp(Level, 2, 6);
        var interactive = !string.IsNullOrEmpty(Href) && !Selectable && !Loading;

        output.TagName = Selectable ? "label" : "article";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, $"ds-card{(interactive ? " is-interactive" : "")}{(Selectable ? " is-selectable" : "")}{(Horizontal ? " is-horizontal" : "")}{(Danger ? " is-danger" : "")}");
        if (Loading) output.Attributes.SetAttribute("aria-busy", "true");
        if (Disabled && !Selectable) output.Attributes.SetAttribute("aria-disabled", "true");

        var html = new HtmlContentBuilder();
        if (Selectable)
        {
            var radio = InputType.Equals("radio", StringComparison.OrdinalIgnoreCase);
            var kind = radio ? "radio" : "checkbox";
            html.AppendHtml($"<input type=\"{kind}\" class=\"{kind} {kind}-sm ds-card__input\"" +
                (Name is null ? "" : $" name=\"{DisplayHtml.E(Name)}\"") + (Value is null ? "" : $" value=\"{DisplayHtml.E(Value)}\"") +
                (Checked ? " checked" : "") + (Disabled ? " disabled" : "") + ">");
        }
        if (Loading)
        {
            html.AppendHtml("<span class=\"ds-visually-hidden\" role=\"status\">").Append(DsText.T("card.loading")).AppendHtml("</span>");
            if (!string.IsNullOrEmpty(Image)) html.AppendHtml("<div class=\"ds-card__media\"><span class=\"ds-bone is-block\"></span></div>");
            html.AppendHtml("<div class=\"ds-card__body\" aria-hidden=\"true\"><span class=\"ds-bone is-title\"></span><span class=\"ds-bone\"></span><span class=\"ds-bone is-short\"></span></div>");
            output.Content.SetHtmlContent(html);
            return;
        }
        if (!string.IsNullOrEmpty(Image))
            html.AppendHtml($"<div class=\"ds-card__media\"><img src=\"{DisplayHtml.E(Image)}\" alt=\"{DisplayHtml.E(ImageAlt)}\" loading=\"lazy\" decoding=\"async\"></div>");
        if (Horizontal) html.AppendHtml("<div class=\"ds-card__content\">");
        if (!string.IsNullOrEmpty(Title) || parts.Actions is not null)
        {
            html.AppendHtml("<header class=\"ds-card__header\"><div>");
            if (!string.IsNullOrEmpty(Eyebrow)) html.AppendHtml("<span class=\"ds-card__eyebrow\">").Append(Eyebrow).AppendHtml("</span>");
            if (!string.IsNullOrEmpty(Title))
            {
                html.AppendHtml($"<h{level} class=\"ds-card__title\">");
                if (interactive) html.AppendHtml($"<a class=\"ds-card__link\" href=\"{DisplayHtml.E(Href)}\">").Append(Title).AppendHtml("</a>");
                else html.Append(Title);
                html.AppendHtml($"</h{level}>");
            }
            if (!string.IsNullOrEmpty(Description)) html.AppendHtml("<p class=\"ds-card__description\">").Append(Description).AppendHtml("</p>");
            html.AppendHtml("</div>");
            if (parts.Actions is not null) html.AppendHtml("<div class=\"ds-card__actions\">").AppendHtml(parts.Actions).AppendHtml("</div>");
            html.AppendHtml("</header>");
        }
        if (!string.IsNullOrWhiteSpace(body)) html.AppendHtml("<div class=\"ds-card__body\">").AppendHtml(body).AppendHtml("</div>");
        if (parts.Footer is not null) html.AppendHtml("<footer class=\"ds-card__footer\">").AppendHtml(parts.Footer).AppendHtml("</footer>");
        if (Horizontal) html.AppendHtml("</div>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>Header actions of a <c>ds-card</c> (buttons, a menu).</summary>
[HtmlTargetElement("ds-card-actions", ParentTag = "ds-card")]
public sealed class CardActionsTagHelper : TagHelper
{
    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var content = await output.GetChildContentAsync();
        if (context.Items.TryGetValue(typeof(CardParts), out var parts)) ((CardParts)parts).Actions = new HtmlString(content.GetContent());
        output.SuppressOutput();
    }
}

/// <summary>Footer of a <c>ds-card</c>.</summary>
[HtmlTargetElement("ds-card-footer", ParentTag = "ds-card")]
public sealed class CardFooterTagHelper : TagHelper
{
    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var content = await output.GetChildContentAsync();
        if (context.Items.TryGetValue(typeof(CardParts), out var parts)) ((CardParts)parts).Footer = new HtmlString(content.GetContent());
        output.SuppressOutput();
    }
}

public enum Trend { None, Up, Down, Flat }

/// <summary>
/// Statistic (KPI). <c>&lt;ds-stat label="Open invoices" value="128" unit="items" delta="12%" trend="Up" compare="vs last month" icon="receipt" /&gt;</c>.
/// The delta shows an arrow and a sentiment tone (Up = success, Down = error by default; set <c>delta-tone</c> when down is good) and carries a
/// hidden sentence. <c>href</c> makes it a link; <c>loading</c> renders a skeleton; child content is the sparkline slot.
/// </summary>
[HtmlTargetElement("ds-stat")]
public sealed class StatTagHelper : TagHelper
{
    public string Label { get; set; } = "";
    public string Value { get; set; } = "";
    public string? Unit { get; set; }
    public string? Delta { get; set; }
    public Trend Trend { get; set; } = Trend.None;
    public Tone? DeltaTone { get; set; }
    /// <summary>Hidden sentence for screen readers, e.g. "up 12% from last month". Defaults to "Up 12%".</summary>
    public string? DeltaText { get; set; }
    public string? Compare { get; set; }
    public string? Sub { get; set; }
    public string? Icon { get; set; }
    public string? Href { get; set; }
    public bool Loading { get; set; }
    public bool Bar { get; set; }
    public Tone Tone { get; set; } = Tone.Primary;

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var spark = (await output.GetChildContentAsync()).GetContent();
        output.TagName = !string.IsNullOrEmpty(Href) && !Loading ? "a" : "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        if (output.TagName == "a") output.Attributes.SetAttribute("href", Href);
        Classes.Add(output, $"ds-stat {Tone.Css()}{(Bar ? " has-bar" : "")}");
        var html = new HtmlContentBuilder();
        if (Loading)
        {
            output.Attributes.SetAttribute("aria-busy", "true");
            html.AppendHtml("<span class=\"ds-visually-hidden\" role=\"status\">").Append(DsText.T("card.loading")).AppendHtml("</span>")
                .AppendHtml("<span class=\"ds-bone is-short\"></span><span class=\"ds-bone is-value\"></span><span class=\"ds-bone is-short\"></span>");
            output.Content.SetHtmlContent(html);
            return;
        }
        html.AppendHtml("<div class=\"ds-stat__top\"><span class=\"ds-stat__label\">").Append(Label).AppendHtml("</span>");
        if (!string.IsNullOrEmpty(Icon)) html.AppendHtml("<span class=\"ds-stat__icon\">").AppendHtml(Icons.Icon.Svg(Icon)).AppendHtml("</span>");
        html.AppendHtml("</div><div class=\"ds-stat__value\">").Append(Value);
        if (!string.IsNullOrEmpty(Unit)) html.AppendHtml("<span class=\"ds-stat__unit\">").Append(Unit).AppendHtml("</span>");
        html.AppendHtml("</div>");
        if (Trend != Trend.None || !string.IsNullOrEmpty(Compare))
        {
            html.AppendHtml("<div class=\"ds-stat__foot\">");
            if (Trend != Trend.None)
            {
                var tone = DeltaTone ?? (Trend == Trend.Up ? Ui.Tone.Success : Trend == Trend.Down ? Ui.Tone.Error : Ui.Tone.Neutral);
                var icon = Trend == Trend.Up ? "arrow-up" : Trend == Trend.Down ? "arrow-down" : "minus";
                var sr = DeltaText ?? (Trend == Trend.Up ? DsText.T("stat.up", Delta ?? "") : Trend == Trend.Down ? DsText.T("stat.down", Delta ?? "") : DsText.T("stat.flat"));
                html.AppendHtml($"<span class=\"ds-stat__delta {tone.Css()}\">").AppendHtml(Icons.Icon.Svg(icon))
                    .AppendHtml("<span aria-hidden=\"true\">").Append(Delta ?? "").AppendHtml("</span><span class=\"ds-visually-hidden\">").Append(sr).AppendHtml("</span></span>");
            }
            if (!string.IsNullOrEmpty(Compare)) html.AppendHtml("<span aria-hidden=\"true\">").Append(Compare).AppendHtml("</span>");
            html.AppendHtml("</div>");
        }
        if (!string.IsNullOrEmpty(Sub)) html.AppendHtml("<div class=\"ds-stat__sub\">").Append(Sub).AppendHtml("</div>");
        if (!string.IsNullOrWhiteSpace(spark)) html.AppendHtml("<div class=\"ds-stat__spark\" aria-hidden=\"true\">").AppendHtml(spark).AppendHtml("</div>");
        output.Content.SetHtmlContent(html);
    }
}
