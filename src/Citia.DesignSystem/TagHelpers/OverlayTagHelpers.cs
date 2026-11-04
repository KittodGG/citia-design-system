using System.Text.Encodings.Web;
using Citia.DesignSystem.Localization;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Razor.TagHelpers;
using IconSvg = Citia.DesignSystem.Icons.Icon;

namespace Citia.DesignSystem.TagHelpers;

/// <summary>Footer content collected from a child slot tag helper (ds-dialog-footer, ds-sheet-footer).</summary>
sealed class OverlaySlot
{
    public IHtmlContent? Footer { get; set; }
}

static class Overlay
{
    public static string E(string? value) => HtmlEncoder.Default.Encode(value ?? "");

    /// <summary>Header with title, optional description and an optional close button (the caller picks the part prefix).</summary>
    public static IHtmlContent Header(string block, string id, string? title, string? description, bool closable, string closeAttr, string closeLabel, string? icon = null, string? iconTone = null)
    {
        var html = new HtmlContentBuilder();
        html.AppendHtml($"<div class=\"{block}__header\"><div class=\"{block}__heading\">");
        if (!string.IsNullOrEmpty(icon))
            html.AppendHtml($"<span class=\"{block}__icon{(string.IsNullOrEmpty(iconTone) ? "" : " is-" + E(iconTone))}\">")
                .AppendHtml(IconSvg.Svg(icon)).AppendHtml("</span>");
        if (!string.IsNullOrEmpty(title))
            html.AppendHtml($"<h2 id=\"{E(id)}-title\" class=\"{block}__title\">").Append(title).AppendHtml("</h2>");
        if (!string.IsNullOrEmpty(description))
            html.AppendHtml($"<p id=\"{E(id)}-description\" class=\"{block}__description\">").Append(description).AppendHtml("</p>");
        html.AppendHtml("</div>");
        if (closable)
            html.AppendHtml($"<button type=\"button\" class=\"{block}__close\" {closeAttr} aria-label=\"{E(closeLabel)}\">")
                .AppendHtml(IconSvg.Svg("x")).AppendHtml("</button>");
        html.AppendHtml("</div>");
        return html;
    }
}

/// <summary>
/// Modal dialog on a native &lt;dialog&gt; with the daisyUI modal box:
/// <c>&lt;ds-dialog id="invite" title="Invite a teammate" description="…" size="md" dismissible&gt;…&lt;ds-dialog-footer&gt;…&lt;/ds-dialog-footer&gt;&lt;/ds-dialog&gt;</c>.
/// Open with <c>data-ds-dialog-open="invite"</c>. <c>alert</c> renders role="alertdialog" without a close button.
/// Sizes: sm (26rem), default (34rem), md (42rem), lg (54rem); <c>full-mobile</c> fills the screen below 640px.
/// </summary>
[HtmlTargetElement("ds-dialog")]
public sealed class DialogTagHelper : TagHelper
{
    public string Id { get; set; } = "";
    public string? Title { get; set; }
    public string? Description { get; set; }
    /// <summary>sm | md | lg (empty = default 34rem).</summary>
    public string? Size { get; set; }
    /// <summary>A press on the scrim closes the dialog. Use only when nothing is lost by closing.</summary>
    public bool Dismissible { get; set; }
    public bool FullMobile { get; set; }
    /// <summary>role="alertdialog": no close button, Cancel gets the initial focus.</summary>
    public bool Alert { get; set; }
    /// <summary>Show the close button (default: true, false for alert dialogs).</summary>
    public bool? Closable { get; set; }
    /// <summary>Open as soon as the page loads (e.g. after a POST with validation errors).</summary>
    public bool OpenOnLoad { get; set; }
    /// <summary>Leading icon name (alert dialogs) and its tone: danger | warning | primary.</summary>
    public string? Icon { get; set; }
    public string? IconTone { get; set; }
    public string? CloseLabel { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var slot = new OverlaySlot();
        context.Items[typeof(OverlaySlot)] = slot;
        var body = await output.GetChildContentAsync();
        var id = string.IsNullOrEmpty(Id) ? $"ds-dialog-{context.UniqueId}" : Id;

        output.TagName = "dialog";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("id", id);
        Classes.Add(output, "modal");
        if (!string.IsNullOrEmpty(Title)) output.Attributes.SetAttribute("aria-labelledby", $"{id}-title");
        if (!string.IsNullOrEmpty(Description)) output.Attributes.SetAttribute("aria-describedby", $"{id}-description");
        if (Alert) output.Attributes.SetAttribute("role", "alertdialog");
        if (Dismissible) output.Attributes.SetAttribute("data-ds-dismissible", "");
        if (OpenOnLoad) output.Attributes.SetAttribute("data-ds-open-on-load", "");

        var box = "modal-box ds-dialog";
        if (!string.IsNullOrEmpty(Size)) box += $" is-{Overlay.E(Size)}";
        if (FullMobile) box += " is-full-mobile";
        var html = new HtmlContentBuilder();
        html.AppendHtml($"<div class=\"{box}\">");
        html.AppendHtml(Overlay.Header("ds-dialog", id, Title, Description, Closable ?? !Alert, "data-ds-dialog-close=\"close\"", CloseLabel ?? DsText.T("dialog.close"), Icon, IconTone));
        html.AppendHtml("<div class=\"ds-dialog__body\">").AppendHtml(body).AppendHtml("</div>");
        if (slot.Footer is not null) html.AppendHtml("<div class=\"ds-dialog__footer\">").AppendHtml(slot.Footer).AppendHtml("</div>");
        html.AppendHtml("</div>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>Actions of a ds-dialog: rendered after the scrolling body, primary action last (right-most).</summary>
[HtmlTargetElement("ds-dialog-footer", ParentTag = "ds-dialog")]
public sealed class DialogFooterTagHelper : TagHelper
{
    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var content = await output.GetChildContentAsync();
        if (context.Items.TryGetValue(typeof(OverlaySlot), out var value) && value is OverlaySlot slot) slot.Footer = content;
        output.SuppressOutput();
    }
}

/// <summary>
/// Sheet: <c>&lt;ds-sheet id="filters" side="end" title="Filters" size="lg"&gt;…&lt;ds-sheet-footer&gt;…&lt;/ds-sheet-footer&gt;&lt;/ds-sheet&gt;</c>.
/// side: start | end (default) | top | bottom. Bottom sheets get a drag handle; <c>snap="45%,100%"</c> adds snap points.
/// Open with <c>data-ds-sheet-open="filters"</c> or <c>DS.sheet.open("filters")</c>.
/// </summary>
[HtmlTargetElement("ds-sheet")]
public sealed class SheetTagHelper : TagHelper
{
    public string Id { get; set; } = "";
    public string Side { get; set; } = "end";
    public string? Size { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Snap { get; set; }
    /// <summary>Show the drag handle (default: bottom and top sheets).</summary>
    public bool? Handle { get; set; }
    /// <summary>Scrim press closes the sheet (default true).</summary>
    public bool Dismissible { get; set; } = true;
    public string? CloseLabel { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var slot = new OverlaySlot();
        context.Items[typeof(OverlaySlot)] = slot;
        var body = await output.GetChildContentAsync();
        var id = string.IsNullOrEmpty(Id) ? $"ds-sheet-{context.UniqueId}" : Id;
        var side = Side is "start" or "top" or "bottom" ? Side : "end";

        output.TagName = "dialog";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("id", id);
        Classes.Add(output, $"ds-sheet is-{side}{(string.IsNullOrEmpty(Size) ? "" : $" is-{Overlay.E(Size)}")}");
        output.Attributes.SetAttribute("data-ds-sheet", "");
        if (!string.IsNullOrEmpty(Title)) output.Attributes.SetAttribute("aria-labelledby", $"{id}-title");
        if (!string.IsNullOrEmpty(Description)) output.Attributes.SetAttribute("aria-describedby", $"{id}-description");
        if (!string.IsNullOrEmpty(Snap)) output.Attributes.SetAttribute("data-ds-sheet-snap", Snap);
        if (!Dismissible) output.Attributes.SetAttribute("data-ds-dismissible", "false");

        var html = new HtmlContentBuilder();
        if (Handle ?? side is "bottom" or "top")
        {
            var label = DsText.T(string.IsNullOrEmpty(Snap) ? "sheet.handleClose" : "sheet.handle");
            html.AppendHtml($"<button type=\"button\" class=\"ds-sheet__handle\" aria-label=\"{Overlay.E(label)}\"></button>");
        }
        html.AppendHtml(Overlay.Header("ds-sheet", id, Title, Description, true, "data-ds-sheet-close", CloseLabel ?? DsText.T("sheet.close")));
        html.AppendHtml("<div class=\"ds-sheet__body\">").AppendHtml(body).AppendHtml("</div>");
        if (slot.Footer is not null) html.AppendHtml("<div class=\"ds-sheet__footer\">").AppendHtml(slot.Footer).AppendHtml("</div>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>Actions of a ds-sheet, pinned under the scrolling body.</summary>
[HtmlTargetElement("ds-sheet-footer", ParentTag = "ds-sheet")]
public sealed class SheetFooterTagHelper : TagHelper
{
    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var content = await output.GetChildContentAsync();
        if (context.Items.TryGetValue(typeof(OverlaySlot), out var value) && value is OverlaySlot slot) slot.Footer = content;
        output.SuppressOutput();
    }
}

/// <summary>
/// Popover panel (HTML Popover API): <c>&lt;ds-popover id="share" title="Share PRJ-1024" side="bottom" align="end" arrow&gt;…&lt;/ds-popover&gt;</c>
/// with a trigger <c>&lt;button popovertarget="share"&gt;</c>. size: sm | lg | auto. role="dialog", labelled by the title.
/// </summary>
[HtmlTargetElement("ds-popover")]
public sealed class PopoverTagHelper : TagHelper
{
    public string Id { get; set; } = "";
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string Side { get; set; } = "bottom";
    public string Align { get; set; } = "start";
    public string? Size { get; set; }
    public bool Arrow { get; set; }
    public bool Closable { get; set; }
    /// <summary>Accessible name when there is no visible title.</summary>
    public string? Label { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var body = await output.GetChildContentAsync();
        var id = string.IsNullOrEmpty(Id) ? $"ds-popover-{context.UniqueId}" : Id;
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("id", id);
        output.Attributes.SetAttribute("popover", "auto");
        output.Attributes.SetAttribute("role", "dialog");
        output.Attributes.SetAttribute("data-ds-side", Side);
        output.Attributes.SetAttribute("data-ds-align", Align);
        Classes.Add(output, $"ds-popover{(Arrow ? " is-arrow" : "")}{(string.IsNullOrEmpty(Size) ? "" : $" is-{Overlay.E(Size)}")}");
        if (!string.IsNullOrEmpty(Title)) output.Attributes.SetAttribute("aria-labelledby", $"{id}-title");
        else if (!string.IsNullOrEmpty(Label)) output.Attributes.SetAttribute("aria-label", Label);

        var html = new HtmlContentBuilder();
        if (!string.IsNullOrEmpty(Title) || Closable)
            html.AppendHtml(Overlay.Header("ds-popover", id, Title, Description, Closable, $"popovertarget=\"{Overlay.E(id)}\" popovertargetaction=\"hide\"", DsText.T("popover.close")));
        html.AppendHtml("<div class=\"ds-popover__body\">").AppendHtml(body).AppendHtml("</div>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>Hover card panel: <c>&lt;ds-hover-card id="user-ayu"&gt;…&lt;/ds-hover-card&gt;</c>, trigger <c>&lt;a href="…" data-ds-hover-card="user-ayu"&gt;</c>.</summary>
[HtmlTargetElement("ds-hover-card")]
public sealed class HoverCardTagHelper : TagHelper
{
    public string Id { get; set; } = "";
    public string Side { get; set; } = "bottom";
    public string Align { get; set; } = "center";
    public bool Arrow { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("id", string.IsNullOrEmpty(Id) ? $"ds-hover-card-{context.UniqueId}" : Id);
        output.Attributes.SetAttribute("popover", "manual");
        output.Attributes.SetAttribute("data-ds-side", Side);
        output.Attributes.SetAttribute("data-ds-align", Align);
        Classes.Add(output, Arrow ? "ds-hover-card is-arrow" : "ds-hover-card");
    }
}

/// <summary>
/// Dropdown menu panel: <c>&lt;ds-menu id="row-menu" label="Actions for INV-2026-0418"&gt;&lt;ds-menu-item icon="pencil"&gt;Edit&lt;/ds-menu-item&gt;…&lt;/ds-menu&gt;</c>
/// with a trigger <c>&lt;button aria-haspopup="menu" popovertarget="row-menu"&gt;</c>. Also used by context menus and menubars.
/// </summary>
[HtmlTargetElement("ds-menu")]
public sealed class MenuTagHelper : TagHelper
{
    public string Id { get; set; } = "";
    public string? Label { get; set; }
    public string? Side { get; set; }
    public string? Align { get; set; }
    public string? Size { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("id", string.IsNullOrEmpty(Id) ? $"ds-menu-{context.UniqueId}" : Id);
        output.Attributes.SetAttribute("popover", "auto");
        output.Attributes.SetAttribute("role", "menu");
        if (!string.IsNullOrEmpty(Label)) output.Attributes.SetAttribute("aria-label", Label);
        if (!string.IsNullOrEmpty(Side)) output.Attributes.SetAttribute("data-ds-side", Side);
        if (!string.IsNullOrEmpty(Align)) output.Attributes.SetAttribute("data-ds-align", Align);
        Classes.Add(output, string.IsNullOrEmpty(Size) ? "ds-menu" : $"ds-menu is-{Overlay.E(Size)}");
    }
}

/// <summary>
/// Menu item. Child content is the label. <c>type</c>: item (default) | checkbox | radio; <c>href</c> renders a link;
/// <c>submenu="id"</c> opens a nested ds-menu placed right after this item inside a <c>ds-menu-sub</c>.
/// </summary>
[HtmlTargetElement("ds-menu-item")]
public sealed class MenuItemTagHelper : TagHelper
{
    public string Type { get; set; } = "item";
    public string? Icon { get; set; }
    public string? Shortcut { get; set; }
    public string? Description { get; set; }
    public string? Href { get; set; }
    public string? Value { get; set; }
    public bool Checked { get; set; }
    public bool Disabled { get; set; }
    public bool Danger { get; set; }
    public string? Submenu { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var label = await output.GetChildContentAsync();
        var isLink = !string.IsNullOrEmpty(Href) && !Disabled && string.IsNullOrEmpty(Submenu);
        output.TagName = isLink ? "a" : "button";
        output.TagMode = TagMode.StartTagAndEndTag;
        if (isLink) output.Attributes.SetAttribute("href", Href);
        else output.Attributes.SetAttribute("type", "button");
        var role = Type switch { "checkbox" => "menuitemcheckbox", "radio" => "menuitemradio", _ => "menuitem" };
        output.Attributes.SetAttribute("role", role);
        output.Attributes.SetAttribute("tabindex", "-1");
        if (role != "menuitem") output.Attributes.SetAttribute("aria-checked", Checked ? "true" : "false");
        if (Disabled) output.Attributes.SetAttribute("aria-disabled", "true");
        if (!string.IsNullOrEmpty(Value)) output.Attributes.SetAttribute("data-value", Value);
        if (!string.IsNullOrEmpty(Submenu))
        {
            output.Attributes.SetAttribute("aria-haspopup", "menu");
            output.Attributes.SetAttribute("aria-expanded", "false");
            output.Attributes.SetAttribute("aria-controls", Submenu);
        }
        Classes.Add(output, Danger ? "ds-menu__item is-danger" : "ds-menu__item");

        var html = new HtmlContentBuilder();
        if (role != "menuitem")
            html.AppendHtml("<span class=\"ds-menu__indicator\" aria-hidden=\"true\">").AppendHtml(IconSvg.Svg("check", "")).AppendHtml("</span>");
        else if (!string.IsNullOrEmpty(Icon))
            html.AppendHtml(IconSvg.Svg(Icon));
        html.AppendHtml("<span class=\"ds-menu__text\"><span>").AppendHtml(label).AppendHtml("</span>");
        if (!string.IsNullOrEmpty(Description))
            html.AppendHtml("<span class=\"ds-menu__description\">").Append(Description).AppendHtml("</span>");
        html.AppendHtml("</span>");
        if (!string.IsNullOrEmpty(Submenu)) html.AppendHtml(IconSvg.Svg("chevron-right", "ds-menu__chevron"));
        else if (!string.IsNullOrEmpty(Shortcut)) html.AppendHtml("<kbd class=\"ds-menu__shortcut\">").Append(Shortcut).AppendHtml("</kbd>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>Wrapper for a submenu item and its nested ds-menu (role="none"), so the submenu stays a DOM child of its parent menu.</summary>
[HtmlTargetElement("ds-menu-sub")]
public sealed class MenuSubTagHelper : TagHelper
{
    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("role", "none");
        Classes.Add(output, "ds-menu__sub");
    }
}

/// <summary>Group of related items, e.g. radio items: <c>&lt;ds-menu-group label="Sort by"&gt;</c>. The label is shown and names the group.</summary>
[HtmlTargetElement("ds-menu-group")]
public sealed class MenuGroupTagHelper : TagHelper
{
    public string? Label { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("role", "group");
        Classes.Add(output, "ds-menu__group");
        if (string.IsNullOrEmpty(Label)) return;
        var id = $"ds-menu-label-{context.UniqueId}";
        output.Attributes.SetAttribute("aria-labelledby", id);
        output.PreContent.AppendHtml($"<div id=\"{id}\" class=\"ds-menu__label\" role=\"presentation\">").Append(Label).AppendHtml("</div>");
    }
}

/// <summary>Visible section label inside a menu (not focusable).</summary>
[HtmlTargetElement("ds-menu-label")]
public sealed class MenuLabelTagHelper : TagHelper
{
    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("role", "presentation");
        Classes.Add(output, "ds-menu__label");
    }
}

/// <summary>Hairline between groups of menu items.</summary>
[HtmlTargetElement("ds-menu-separator", TagStructure = TagStructure.WithoutEndTag)]
public sealed class MenuSeparatorTagHelper : TagHelper
{
    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("role", "separator");
        Classes.Add(output, "ds-menu__separator");
    }
}

/// <summary>
/// Command list or palette: <c>&lt;ds-command id="palette" palette shortcut="mod+k"&gt;&lt;ds-command-group label="Pages"&gt;…&lt;/ds-command-group&gt;&lt;/ds-command&gt;</c>.
/// Without <c>palette</c> it renders inline. <c>source="/search?q={query}"</c> loads results from a JSON endpoint.
/// </summary>
[HtmlTargetElement("ds-command")]
public sealed class CommandTagHelper : TagHelper
{
    public string Id { get; set; } = "";
    public bool Palette { get; set; }
    public string? Shortcut { get; set; }
    public string? Placeholder { get; set; }
    public string? Label { get; set; }
    public string? Source { get; set; }
    public int? MinLength { get; set; }
    /// <summary>Show the keyboard hints row (palette default true).</summary>
    public bool? Hints { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var items = await output.GetChildContentAsync();
        var id = string.IsNullOrEmpty(Id) ? $"ds-command-{context.UniqueId}" : Id;
        var label = Label ?? DsText.T("command.label");
        var placeholder = Placeholder ?? DsText.T("command.placeholder");
        var source = string.IsNullOrEmpty(Source) ? "" : $" data-ds-command-source=\"{Overlay.E(Source)}\"" + (MinLength is int min ? $" data-ds-command-min=\"{min}\"" : "");

        var html = new HtmlContentBuilder();
        html.AppendHtml("<div class=\"ds-command__search\">").AppendHtml(IconSvg.Svg("search"));
        html.AppendHtml($"<input type=\"search\" class=\"ds-command__input\" id=\"{Overlay.E(id)}-input\" placeholder=\"{Overlay.E(placeholder)}\" aria-label=\"{Overlay.E(label)}\" autocomplete=\"off\" spellcheck=\"false\" data-ds-initial-focus>");
        if (Palette) html.AppendHtml("<kbd class=\"ds-kbd\">Esc</kbd>");
        html.AppendHtml("</div>");
        html.AppendHtml($"<div class=\"ds-command__list\" id=\"{Overlay.E(id)}-list\" role=\"listbox\" aria-label=\"{Overlay.E(DsText.T("command.results"))}\">").AppendHtml(items).AppendHtml("</div>");
        html.AppendHtml("<div class=\"ds-command__empty\" hidden><strong>").Append(DsText.T("command.noResultsFor"))
            .AppendHtml(" “<span data-ds-command-query></span>”</strong><span data-ds-command-message>").Append(DsText.T("command.noResultsHint")).AppendHtml("</span></div>");
        html.AppendHtml("<div class=\"ds-command__loading\" hidden><span class=\"ds-spinner\" aria-hidden=\"true\"></span>").Append(DsText.T("command.loading")).AppendHtml("</div>");
        if (Hints ?? Palette)
        {
            html.AppendHtml("<div class=\"ds-command__footer\" aria-hidden=\"true\">")
                .AppendHtml("<span><kbd class=\"ds-kbd\">↑</kbd><kbd class=\"ds-kbd\">↓</kbd>").Append(DsText.T("command.navigate")).AppendHtml("</span>")
                .AppendHtml("<span><kbd class=\"ds-kbd\">Enter</kbd>").Append(DsText.T("command.select")).AppendHtml("</span>");
            if (Palette) html.AppendHtml("<span><kbd class=\"ds-kbd\">Esc</kbd>").Append(DsText.T("command.close")).AppendHtml("</span>");
            html.AppendHtml("</div>");
        }

        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("id", id);
        if (Palette)
        {
            output.TagName = "dialog";
            Classes.Add(output, "ds-command-dialog");
            output.Attributes.SetAttribute("data-ds-command", "");
            output.Attributes.SetAttribute("aria-label", label);
            if (!string.IsNullOrEmpty(Shortcut)) output.Attributes.SetAttribute("data-ds-command-shortcut", Shortcut);
            var wrapper = new HtmlContentBuilder();
            wrapper.AppendHtml($"<div class=\"ds-command\"{source}>").AppendHtml(html).AppendHtml("</div>");
            output.Content.SetHtmlContent(wrapper);
        }
        else
        {
            output.TagName = "div";
            Classes.Add(output, "ds-command is-inline");
            if (!string.IsNullOrEmpty(Source)) output.Attributes.SetAttribute("data-ds-command-source", Source);
            if (!string.IsNullOrEmpty(Source) && MinLength is int minimum) output.Attributes.SetAttribute("data-ds-command-min", minimum.ToString(System.Globalization.CultureInfo.InvariantCulture));
            output.Content.SetHtmlContent(html);
        }
    }
}

/// <summary>Group of command items with a visible label.</summary>
[HtmlTargetElement("ds-command-group")]
public sealed class CommandGroupTagHelper : TagHelper
{
    public string? Label { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        output.Attributes.SetAttribute("role", "group");
        Classes.Add(output, "ds-command__group");
        if (string.IsNullOrEmpty(Label)) return;
        var id = $"ds-command-group-{context.UniqueId}";
        output.Attributes.SetAttribute("aria-labelledby", id);
        output.PreContent.AppendHtml($"<div id=\"{id}\" class=\"ds-command__group-label\">").Append(Label).AppendHtml("</div>");
    }
}

/// <summary>Command item (role="option"). Child content is the label; <c>href</c> renders a link.</summary>
[HtmlTargetElement("ds-command-item")]
public sealed class CommandItemTagHelper : TagHelper
{
    public string? Icon { get; set; }
    public string? Description { get; set; }
    public string? Shortcut { get; set; }
    public string? Href { get; set; }
    public string? Value { get; set; }
    public string? Keywords { get; set; }
    public bool Disabled { get; set; }
    public bool Danger { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var label = await output.GetChildContentAsync();
        var isLink = !string.IsNullOrEmpty(Href) && !Disabled;
        output.TagName = isLink ? "a" : "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        if (isLink) output.Attributes.SetAttribute("href", Href);
        output.Attributes.SetAttribute("role", "option");
        output.Attributes.SetAttribute("aria-selected", "false");
        output.Attributes.SetAttribute("id", $"ds-command-item-{context.UniqueId}");
        if (Disabled) output.Attributes.SetAttribute("aria-disabled", "true");
        if (!string.IsNullOrEmpty(Value)) output.Attributes.SetAttribute("data-value", Value);
        if (!string.IsNullOrEmpty(Keywords)) output.Attributes.SetAttribute("data-keywords", Keywords);
        Classes.Add(output, Danger ? "ds-command__item is-danger" : "ds-command__item");

        var html = new HtmlContentBuilder();
        if (!string.IsNullOrEmpty(Icon)) html.AppendHtml(IconSvg.Svg(Icon));
        html.AppendHtml("<span class=\"ds-command__text\"><span class=\"ds-command__label\">").AppendHtml(label).AppendHtml("</span>");
        if (!string.IsNullOrEmpty(Description)) html.AppendHtml("<span class=\"ds-command__description\">").Append(Description).AppendHtml("</span>");
        html.AppendHtml("</span>");
        if (!string.IsNullOrEmpty(Shortcut)) html.AppendHtml("<kbd class=\"ds-command__shortcut\">").Append(Shortcut).AppendHtml("</kbd>");
        output.Content.SetHtmlContent(html);
    }
}
