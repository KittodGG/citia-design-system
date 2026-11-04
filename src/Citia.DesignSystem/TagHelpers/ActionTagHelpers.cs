using System.Net;
using System.Text.Encodings.Web;
using Citia.DesignSystem.Localization;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Citia.DesignSystem.TagHelpers;

/// <summary>Shared mapping from the readable attributes of the action tag helpers to ds-* / daisyUI classes.</summary>
static class ActionClasses
{
    static int _sequence;

    /// <summary>Unique id for the description of an aria-disabled control.</summary>
    public static string NextId(string prefix) => $"{prefix}-{Interlocked.Increment(ref _sequence)}";

    /// <summary>Variant to button classes: primary, secondary (default), outline, soft, ghost/tertiary, link, neutral, destructive, success, warning, info, accent, excel, pdf.</summary>
    public static string Variant(string? variant) => (variant ?? "secondary").Trim().ToLowerInvariant() switch
    {
        "primary" => "btn-primary",
        "outline" or "outlined" => "btn-outline",
        "soft" or "tonal" => "btn-soft",
        "ghost" or "tertiary" or "text" => "btn-ghost",
        "link" => "btn-link",
        "neutral" => "btn-neutral",
        "destructive" or "error" or "danger" => "btn-error",
        "success" => "btn-success",
        "warning" => "btn-warning",
        "info" => "btn-info",
        "accent" => "btn-accent",
        "excel" => "btn-excel",
        "pdf" => "btn-pdf",
        _ => "",
    };

    /// <summary>Tone for quiet styles (outline, soft, ghost, link): danger/error, success, warning, info, neutral, accent.</summary>
    public static string Tone(string? tone) => (tone ?? "").Trim().ToLowerInvariant() switch
    {
        "danger" or "error" or "destructive" => "btn-error",
        "success" => "btn-success",
        "warning" => "btn-warning",
        "info" => "btn-info",
        "neutral" => "btn-neutral",
        "accent" => "btn-accent",
        _ => "",
    };

    /// <summary>Size class for .btn: xs, sm, md (default, no class), lg, xl.</summary>
    public static string ButtonSize(string? size) => (size ?? "md").Trim().ToLowerInvariant() switch
    {
        "xs" => "btn-xs",
        "sm" => "btn-sm",
        "lg" => "btn-lg",
        "xl" => "btn-xl",
        _ => "",
    };

    /// <summary>Size class for icon buttons, toggles and FABs (is-xs to is-xl); md is the default.</summary>
    public static string ComponentSize(string? size) => (size ?? "md").Trim().ToLowerInvariant() switch
    {
        "xs" => "is-xs",
        "sm" => "is-sm",
        "lg" => "is-lg",
        "xl" => "is-xl",
        _ => "",
    };

    public static IHtmlContent Svg(string name, string css) => Citia.DesignSystem.Icons.Icon.Svg(name, css);

    public static IHtmlContent NewTabText() =>
        new HtmlString($"<span class=\"ds-visually-hidden\"> {WebUtility.HtmlEncode(DsText.T("actions.newTab"))}</span>");

    /// <summary>Common attributes for a control that may be an anchor or a button: disabled, aria-disabled with a reason, or busy.</summary>
    public static void Availability(TagHelperOutput output, bool anchor, bool disabled, string? reason, bool loading, out string? reasonId)
    {
        reasonId = null;
        if (loading) output.Attributes.SetAttribute("aria-busy", "true");
        if (!disabled && string.IsNullOrEmpty(reason)) return;
        if (!string.IsNullOrEmpty(reason))
        {
            // aria-disabled keeps the control focusable, so the reason can be read: title for the pointer, a description for assistive technology.
            reasonId = NextId("ds-reason");
            output.Attributes.SetAttribute("aria-disabled", "true");
            output.Attributes.SetAttribute("aria-describedby", reasonId);
            output.Attributes.SetAttribute("title", reason);
        }
        else if (anchor)
        {
            output.Attributes.SetAttribute("aria-disabled", "true");
            output.Attributes.SetAttribute("role", "link");
        }
        else
        {
            output.Attributes.SetAttribute("disabled", "disabled");
        }
    }

    public static void AppendReason(TagHelperOutput output, string? reasonId, string? reason)
    {
        if (reasonId is null || reason is null) return;
        output.PostElement.AppendHtml($"<span id=\"{WebUtility.HtmlEncode(reasonId)}\" class=\"ds-visually-hidden\">")
            .Append(reason).AppendHtml("</span>");
    }
}

/// <summary>
/// <c>&lt;ds-button variant="primary" size="md" icon="send" loading-label="Sending…"&gt;Send invoice&lt;/ds-button&gt;</c> renders <c>&lt;button class="btn …"&gt;</c>.
/// Variants: primary, secondary (default), outline, soft, ghost, link, neutral, destructive, success, warning, info, accent, excel, pdf.
/// <c>tone</c> colours the quiet variants (danger, success, warning, info). With <c>href</c> the output is an anchor.
/// <c>disabled-reason</c> renders aria-disabled (focusable) with the reason as title and description; <c>disabled</c> alone renders the native attribute.
/// <c>loading</c> renders aria-busy="true" (spinner, input blocked); <c>loading-label</c> is the text shown while a submit is busy (data-ds-loading-label).
/// <c>pressed</c> makes it a toggle button (aria-pressed).
/// </summary>
[HtmlTargetElement("ds-button")]
public sealed class DsButtonTagHelper : TagHelper
{
    public string Variant { get; set; } = "secondary";
    public string? Tone { get; set; }
    public string Size { get; set; } = "md";
    /// <summary>Icon before the label (name from the icon set).</summary>
    public string? Icon { get; set; }
    /// <summary>Icon after the label.</summary>
    public string? IconEnd { get; set; }
    /// <summary>Icon only: the child content becomes the accessible name (aria-label) and the button is square.</summary>
    public bool IconOnly { get; set; }
    public bool Loading { get; set; }
    public string? LoadingLabel { get; set; }
    public bool FullWidth { get; set; }
    public bool? Pressed { get; set; }
    public bool Selected { get; set; }
    public bool Disabled { get; set; }
    public string? DisabledReason { get; set; }
    public string? Href { get; set; }
    public bool External { get; set; }
    /// <summary>button | submit | reset (buttons only).</summary>
    public string Type { get; set; } = "button";

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var child = await output.GetChildContentAsync();
        var anchor = !string.IsNullOrEmpty(Href);
        var blocked = Disabled || !string.IsNullOrEmpty(DisabledReason);
        output.TagName = anchor ? "a" : "button";
        output.TagMode = TagMode.StartTagAndEndTag;

        var css = "btn " + ActionClasses.Variant(Variant);
        if (!string.IsNullOrEmpty(Tone)) css += " " + ActionClasses.Tone(Tone);
        css += " " + ActionClasses.ButtonSize(Size);
        if (FullWidth) css += " btn-block";
        if (IconOnly) css += " btn-square";
        if (Selected) css += " is-selected";
        Classes.Add(output, css);

        if (anchor)
        {
            if (!blocked) output.Attributes.SetAttribute("href", Href);
            if (External && !blocked)
            {
                output.Attributes.SetAttribute("target", "_blank");
                output.Attributes.SetAttribute("rel", "noopener noreferrer");
            }
        }
        else
        {
            output.Attributes.SetAttribute("type", Type);
            if (!string.IsNullOrEmpty(LoadingLabel) && Type == "submit") output.Attributes.SetAttribute("data-ds-loading-label", LoadingLabel);
        }
        if (Pressed is { } pressed) output.Attributes.SetAttribute("aria-pressed", pressed ? "true" : "false");
        if (IconOnly) output.Attributes.SetAttribute("aria-label", child.GetContent().Trim());

        ActionClasses.Availability(output, anchor, Disabled, DisabledReason, Loading, out var reasonId);

        var html = new HtmlContentBuilder();
        if (!string.IsNullOrEmpty(Icon)) html.AppendHtml(ActionClasses.Svg(Icon, "ds-icon"));
        if (!IconOnly)
        {
            html.AppendHtml("<span class=\"ds-btn__label\">");
            if (Loading && !string.IsNullOrEmpty(LoadingLabel)) html.Append(LoadingLabel);
            else html.AppendHtml(child);
            html.AppendHtml("</span>");
        }
        if (!string.IsNullOrEmpty(IconEnd) && !IconOnly) html.AppendHtml(ActionClasses.Svg(IconEnd, "ds-icon is-end"));
        if (External && anchor) html.AppendHtml(ActionClasses.NewTabText());
        output.Content.SetHtmlContent(html);
        ActionClasses.AppendReason(output, reasonId, DisabledReason);
    }
}

/// <summary>
/// <c>&lt;ds-icon-button icon="trash" label="Delete invoice INV-2026-0418" variant="standard" size="md" badge="3" /&gt;</c> renders a square icon button.
/// <c>label</c> is required: it is the accessible name and the tooltip (title). Variants: standard (default), filled, tonal, outlined.
/// <c>badge</c> is a short count, <c>badge-dot</c> a dot. <c>round</c> makes it a circle.
/// </summary>
[HtmlTargetElement("ds-icon-button", TagStructure = TagStructure.WithoutEndTag)]
public sealed class DsIconButtonTagHelper : TagHelper
{
    public string Icon { get; set; } = "";
    public string Label { get; set; } = "";
    public string Variant { get; set; } = "standard";
    public string? Tone { get; set; }
    public string Size { get; set; } = "md";
    public bool Round { get; set; }
    public string? Badge { get; set; }
    public bool BadgeDot { get; set; }
    public bool Loading { get; set; }
    public bool? Pressed { get; set; }
    public bool Disabled { get; set; }
    public string? DisabledReason { get; set; }
    public string? Href { get; set; }
    public string Type { get; set; } = "button";

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var anchor = !string.IsNullOrEmpty(Href);
        var blocked = Disabled || !string.IsNullOrEmpty(DisabledReason);
        output.TagName = anchor ? "a" : "button";
        output.TagMode = TagMode.StartTagAndEndTag;

        var variant = (Variant ?? "standard").Trim().ToLowerInvariant() switch
        {
            "filled" => "is-filled",
            "tonal" => "is-tonal",
            "outlined" => "is-outlined",
            _ => "",
        };
        var css = $"ds-icon-button {variant} {ActionClasses.ComponentSize(Size)}{(Round ? " is-round" : "")}";
        if (!string.IsNullOrEmpty(Tone)) css += " " + ActionClasses.Tone(Tone);
        Classes.Add(output, css);

        if (anchor)
        {
            if (!blocked) output.Attributes.SetAttribute("href", Href);
        }
        else
        {
            output.Attributes.SetAttribute("type", Type);
        }
        var name = string.IsNullOrEmpty(Badge) ? Label : $"{Label}, {Badge}";
        output.Attributes.SetAttribute("aria-label", name);
        if (!output.Attributes.ContainsName("title") && string.IsNullOrEmpty(DisabledReason)) output.Attributes.SetAttribute("title", Label);
        if (Pressed is { } pressed) output.Attributes.SetAttribute("aria-pressed", pressed ? "true" : "false");

        ActionClasses.Availability(output, anchor, Disabled, DisabledReason, Loading, out var reasonId);

        var html = new HtmlContentBuilder();
        if (!string.IsNullOrEmpty(Icon)) html.AppendHtml(ActionClasses.Svg(Icon, "ds-icon"));
        if (BadgeDot) html.AppendHtml("<span class=\"ds-icon-button__badge is-dot\" aria-hidden=\"true\"></span>");
        else if (!string.IsNullOrEmpty(Badge)) html.AppendHtml("<span class=\"ds-icon-button__badge\" aria-hidden=\"true\">").Append(Badge).AppendHtml("</span>");
        output.Content.SetHtmlContent(html);
        ActionClasses.AppendReason(output, reasonId, DisabledReason);
    }
}

/// <summary>
/// <c>&lt;ds-toggle pressed="true" icon="bold" label="Bold" /&gt;</c> renders a button with aria-pressed (data-ds-toggle flips it).
/// Child content is the visible text; without it the toggle is icon-only and <c>label</c> is its accessible name.
/// Variants: ghost (default), outlined, filled, tonal.
/// </summary>
[HtmlTargetElement("ds-toggle")]
public sealed class DsToggleTagHelper : TagHelper
{
    public string? Icon { get; set; }
    public string? Label { get; set; }
    public string Variant { get; set; } = "ghost";
    public string Size { get; set; } = "md";
    public bool Pressed { get; set; }
    public bool Disabled { get; set; }
    public string? DisabledReason { get; set; }
    public bool Loading { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var child = await output.GetChildContentAsync();
        var text = child.GetContent().Trim();
        var iconOnly = text.Length == 0;
        output.TagName = "button";
        output.TagMode = TagMode.StartTagAndEndTag;
        var variant = (Variant ?? "ghost").Trim().ToLowerInvariant() switch
        {
            "outlined" or "outline" => "is-outlined",
            "filled" => "is-filled",
            "tonal" => "is-tonal",
            _ => "",
        };
        Classes.Add(output, $"ds-toggle {variant} {ActionClasses.ComponentSize(Size)}{(iconOnly ? " is-icon" : "")}");
        output.Attributes.SetAttribute("type", "button");
        output.Attributes.SetAttribute("data-ds-toggle", "");
        output.Attributes.SetAttribute("aria-pressed", Pressed ? "true" : "false");
        if (iconOnly && !string.IsNullOrEmpty(Label))
        {
            output.Attributes.SetAttribute("aria-label", Label);
            if (!output.Attributes.ContainsName("title")) output.Attributes.SetAttribute("title", Label);
        }
        ActionClasses.Availability(output, false, Disabled, DisabledReason, Loading, out var reasonId);
        var html = new HtmlContentBuilder();
        if (!string.IsNullOrEmpty(Icon)) html.AppendHtml(ActionClasses.Svg(Icon, "ds-icon"));
        if (!iconOnly) html.AppendHtml("<span class=\"ds-btn__label\">").AppendHtml(child).AppendHtml("</span>");
        output.Content.SetHtmlContent(html);
        ActionClasses.AppendReason(output, reasonId, DisabledReason);
    }
}

/// <summary>
/// <c>&lt;ds-toggle-group type="single" label="View" name="view" value="list" size="sm"&gt;&lt;ds-toggle-item value="list" icon="list"&gt;List&lt;/ds-toggle-item&gt;…&lt;/ds-toggle-group&gt;</c>.
/// type="single" renders role="radiogroup" (aria-checked, arrows select); type="multiple" renders role="toolbar" (aria-pressed, arrows move focus).
/// <c>deselectable</c> lets a single group be cleared (role="group", aria-pressed). <c>name</c> posts the selected value(s) as hidden inputs after the group.
/// <c>value</c> is the selected value (single) or a comma-separated list (multiple). <c>spaced</c> separates the items; <c>vertical</c> stacks them.
/// </summary>
[HtmlTargetElement("ds-toggle-group")]
public sealed class DsToggleGroupTagHelper : TagHelper
{
    public string Type { get; set; } = "single";
    /// <summary>Accessible name of the group (required).</summary>
    public string Label { get; set; } = "";
    public string? Name { get; set; }
    public string? Value { get; set; }
    public string Size { get; set; } = "md";
    public string Variant { get; set; } = "outlined";
    public bool Spaced { get; set; }
    public bool Vertical { get; set; }
    public bool Deselectable { get; set; }

    internal bool Multiple => string.Equals(Type, "multiple", StringComparison.OrdinalIgnoreCase);
    internal bool Radio => !Multiple && !Deselectable;

    internal bool IsSelected(string? value)
    {
        if (string.IsNullOrEmpty(Value) || value is null) return false;
        return Multiple
            ? Value.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).Contains(value, StringComparer.Ordinal)
            : string.Equals(Value, value, StringComparison.Ordinal);
    }

    public override void Init(TagHelperContext context) => context.Items[typeof(DsToggleGroupTagHelper)] = this;

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var child = await output.GetChildContentAsync();
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, $"ds-toggle-group{(Spaced ? " is-spaced" : "")}{(Vertical ? " is-vertical" : "")}");
        output.Attributes.SetAttribute("data-ds-toggle-group", Multiple ? "multiple" : "single");
        if (Deselectable && !Multiple) output.Attributes.SetAttribute("data-ds-deselectable", "");
        output.Attributes.SetAttribute("role", Radio ? "radiogroup" : Multiple ? "toolbar" : "group");
        if (!string.IsNullOrEmpty(Label)) output.Attributes.SetAttribute("aria-label", Label);
        if (Vertical) output.Attributes.SetAttribute("aria-orientation", "vertical");
        if (!string.IsNullOrEmpty(Name)) output.Attributes.SetAttribute("data-ds-name", Name);
        output.Content.SetHtmlContent(child);

        if (!string.IsNullOrEmpty(Name) && !string.IsNullOrEmpty(Value))
        {
            var values = Multiple ? Value.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries) : new[] { Value };
            foreach (var value in values)
                output.PostElement.AppendHtml($"<input type=\"hidden\" data-ds-toggle-input name=\"{HtmlEncoder.Default.Encode(Name)}\" value=\"{HtmlEncoder.Default.Encode(value)}\" />");
        }
    }
}

/// <summary>One item of <c>&lt;ds-toggle-group&gt;</c>: <c>&lt;ds-toggle-item value="grid" icon="layout-grid" label="Grid view" /&gt;</c> (icon only) or with text.</summary>
[HtmlTargetElement("ds-toggle-item", ParentTag = "ds-toggle-group")]
public sealed class DsToggleItemTagHelper : TagHelper
{
    public string Value { get; set; } = "";
    public string? Icon { get; set; }
    /// <summary>Accessible name for an icon-only item.</summary>
    public string? Label { get; set; }
    public bool Selected { get; set; }
    public bool Disabled { get; set; }
    public string? DisabledReason { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var group = context.Items.TryGetValue(typeof(DsToggleGroupTagHelper), out var g) ? g as DsToggleGroupTagHelper : null;
        var child = await output.GetChildContentAsync();
        var iconOnly = child.GetContent().Trim().Length == 0;
        var selected = Selected || (group?.IsSelected(Value) ?? false);
        output.TagName = "button";
        output.TagMode = TagMode.StartTagAndEndTag;
        var variant = (group?.Variant ?? "outlined").Trim().ToLowerInvariant() switch
        {
            "filled" => "is-filled",
            "tonal" => "is-tonal",
            _ => "",
        };
        Classes.Add(output, $"ds-toggle {variant} {ActionClasses.ComponentSize(group?.Size)}{(iconOnly ? " is-icon" : "")}");
        output.Attributes.SetAttribute("type", "button");
        output.Attributes.SetAttribute("data-value", Value);
        if (group?.Radio ?? false)
        {
            output.Attributes.SetAttribute("role", "radio");
            output.Attributes.SetAttribute("aria-checked", selected ? "true" : "false");
        }
        else
        {
            output.Attributes.SetAttribute("aria-pressed", selected ? "true" : "false");
        }
        if (iconOnly && !string.IsNullOrEmpty(Label))
        {
            output.Attributes.SetAttribute("aria-label", Label);
            output.Attributes.SetAttribute("title", Label);
        }
        ActionClasses.Availability(output, false, Disabled, DisabledReason, false, out var reasonId);
        var html = new HtmlContentBuilder();
        if (!string.IsNullOrEmpty(Icon)) html.AppendHtml(ActionClasses.Svg(Icon, "ds-icon"));
        if (!iconOnly) html.AppendHtml("<span class=\"ds-btn__label\">").AppendHtml(child).AppendHtml("</span>");
        output.Content.SetHtmlContent(html);
        ActionClasses.AppendReason(output, reasonId, DisabledReason);
    }
}

/// <summary>
/// <c>&lt;ds-fab icon="plus" label="New invoice" floating hide-on-scroll /&gt;</c> renders a floating action button, bottom-end above the safe area.
/// Child content makes it extended (icon + text). Sizes: sm, md (default), lg. Variants: primary (default), tonal, surface.
/// <c>label</c> is the accessible name of an icon-only FAB. With <c>href</c> it renders an anchor.
/// </summary>
[HtmlTargetElement("ds-fab")]
public sealed class DsFabTagHelper : TagHelper
{
    public string Icon { get; set; } = "plus";
    public string? Label { get; set; }
    public string Size { get; set; } = "md";
    public string Variant { get; set; } = "primary";
    public bool Floating { get; set; }
    public bool Start { get; set; }
    public bool HideOnScroll { get; set; }
    public bool Loading { get; set; }
    public bool Disabled { get; set; }
    public string? DisabledReason { get; set; }
    public string? Href { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var child = await output.GetChildContentAsync();
        var extended = child.GetContent().Trim().Length > 0;
        var anchor = !string.IsNullOrEmpty(Href);
        var blocked = Disabled || !string.IsNullOrEmpty(DisabledReason);
        output.TagName = anchor ? "a" : "button";
        output.TagMode = TagMode.StartTagAndEndTag;
        var size = Size?.Trim().ToLowerInvariant() switch { "sm" => " is-sm", "lg" => " is-lg", _ => "" };
        var variant = Variant?.Trim().ToLowerInvariant() switch { "tonal" => " is-tonal", "surface" => " is-surface", _ => "" };
        Classes.Add(output, $"ds-fab{size}{variant}{(extended ? " is-extended" : "")}{(Floating ? " is-floating" : "")}{(Floating && Start ? " is-start" : "")}");
        if (HideOnScroll) output.Attributes.SetAttribute("data-ds-fab-hide", "");
        if (anchor)
        {
            if (!blocked) output.Attributes.SetAttribute("href", Href);
        }
        else
        {
            output.Attributes.SetAttribute("type", "button");
        }
        if (!extended && !string.IsNullOrEmpty(Label))
        {
            output.Attributes.SetAttribute("aria-label", Label);
            output.Attributes.SetAttribute("title", Label);
        }
        ActionClasses.Availability(output, anchor, Disabled, DisabledReason, Loading, out var reasonId);
        var html = new HtmlContentBuilder();
        html.AppendHtml(ActionClasses.Svg(Icon, "ds-icon"));
        if (extended) html.AppendHtml("<span class=\"ds-btn__label\">").AppendHtml(child).AppendHtml("</span>");
        output.Content.SetHtmlContent(html);
        ActionClasses.AppendReason(output, reasonId, DisabledReason);
    }
}

/// <summary>
/// <c>&lt;ds-link href="/invoices" standalone&gt;All invoices&lt;/ds-link&gt;</c> renders <c>&lt;a class="ds-link …"&gt;</c>.
/// <c>standalone</c> adds the arrow, <c>external</c> opens a new tab with an icon and hidden "(opens in a new tab)" text,
/// <c>current</c> sets aria-current="page", <c>disabled</c> renders an anchor without href (role="link", aria-disabled), <c>prose</c> enables :visited styling.
/// </summary>
[HtmlTargetElement("ds-link")]
public sealed class DsLinkTagHelper : TagHelper
{
    public string? Href { get; set; }
    public bool Standalone { get; set; }
    public bool External { get; set; }
    public bool Current { get; set; }
    public bool Disabled { get; set; }
    public bool Prose { get; set; }
    /// <summary>accent | subtle</summary>
    public string? Tone { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var child = await output.GetChildContentAsync();
        output.TagName = "a";
        output.TagMode = TagMode.StartTagAndEndTag;
        var tone = Tone?.Trim().ToLowerInvariant() switch { "accent" => " is-accent", "subtle" => " is-subtle", _ => "" };
        Classes.Add(output, $"ds-link{tone}{(Standalone ? " is-standalone" : "")}{(External ? " is-external" : "")}{(Prose ? " is-prose" : "")}");
        if (Disabled || string.IsNullOrEmpty(Href))
        {
            output.Attributes.SetAttribute("role", "link");
            output.Attributes.SetAttribute("aria-disabled", "true");
        }
        else
        {
            output.Attributes.SetAttribute("href", Href);
            if (External)
            {
                output.Attributes.SetAttribute("target", "_blank");
                output.Attributes.SetAttribute("rel", "noopener noreferrer");
            }
        }
        if (Current) output.Attributes.SetAttribute("aria-current", "page");
        var html = new HtmlContentBuilder();
        html.AppendHtml(child);
        if (External) html.AppendHtml(ActionClasses.NewTabText());
        output.Content.SetHtmlContent(html);
    }
}
