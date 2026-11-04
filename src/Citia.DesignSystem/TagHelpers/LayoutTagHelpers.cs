using Citia.DesignSystem.Localization;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Citia.DesignSystem.TagHelpers;

/// <summary>
/// <c>&lt;ds-container size="lg"&gt;</c> → <c>div.ds-container</c>. size: sm | md | lg | xl (default) | prose | full. <c>flush</c> removes the side padding.
/// </summary>
[HtmlTargetElement("ds-container")]
public sealed class ContainerTagHelper : TagHelper
{
    public string? Size { get; set; }
    public bool Flush { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-container" + (string.IsNullOrEmpty(Size) ? "" : $" is-{Size}") + (Flush ? " is-flush" : ""));
    }
}

/// <summary>Slots collected from the child tag helpers of <c>ds-page-header</c>.</summary>
sealed class PageHeaderSlots
{
    public string? Breadcrumb { get; set; }
    public string? Meta { get; set; }
    public string? Tabs { get; set; }
    public string? Actions { get; set; }
}

/// <summary>
/// <c>&lt;ds-page-header title="Invoices" description="…" sticky&gt;</c> with optional <c>ds-page-header-breadcrumb</c>,
/// <c>ds-page-header-meta</c>, <c>ds-page-header-actions</c> (primary action last) and <c>ds-page-header-tabs</c> children.
/// Flags: <c>sticky</c> (translucent bar that compacts on scroll), <c>compact</c> (smaller title). <c>heading-level</c> defaults to 1.
/// </summary>
[HtmlTargetElement("ds-page-header")]
public sealed class PageHeaderTagHelper : TagHelper
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public bool Sticky { get; set; }
    public bool Compact { get; set; }
    public int HeadingLevel { get; set; } = 1;

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var slots = new PageHeaderSlots();
        context.Items[typeof(PageHeaderSlots)] = slots;
        await output.GetChildContentAsync();

        output.TagName = "header";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-page-header" + (Sticky ? " is-sticky" : "") + (Compact ? " is-compact" : ""));
        var level = Math.Clamp(HeadingLevel, 1, 6);
        output.Content.Clear();
        if (slots.Breadcrumb is { } crumb) output.Content.AppendHtml($"<div class=\"ds-page-header__breadcrumb\">{crumb}</div>");
        output.Content.AppendHtml("<div class=\"ds-page-header__text\">");
        output.Content.AppendHtml($"<h{level} class=\"ds-page-title\">").Append(Title ?? "").AppendHtml($"</h{level}>");
        if (!string.IsNullOrEmpty(Description)) output.Content.AppendHtml("<p class=\"ds-page-desc\">").Append(Description).AppendHtml("</p>");
        if (slots.Meta is { } meta) output.Content.AppendHtml($"<div class=\"ds-page-header__meta\">{meta}</div>");
        output.Content.AppendHtml("</div>");
        if (slots.Actions is { } actions) output.Content.AppendHtml($"<div class=\"ds-page-header__actions\">{actions}</div>");
        if (slots.Tabs is { } tabs) output.Content.AppendHtml($"<div class=\"ds-page-header__tabs\">{tabs}</div>");
    }
}

/// <summary>Base of the slot children of <c>ds-page-header</c>: the rendered markup moves into the parent.</summary>
public abstract class PageHeaderSlotTagHelper : TagHelper
{
    internal abstract void Assign(PageHeaderSlots slots, string html);

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var content = await output.GetChildContentAsync();
        if (context.Items.TryGetValue(typeof(PageHeaderSlots), out var value) && value is PageHeaderSlots slots)
            Assign(slots, content.GetContent());
        output.SuppressOutput();
    }
}

[HtmlTargetElement("ds-page-header-breadcrumb", ParentTag = "ds-page-header")]
public sealed class PageHeaderBreadcrumbTagHelper : PageHeaderSlotTagHelper
{
    internal override void Assign(PageHeaderSlots slots, string html) => slots.Breadcrumb = html;
}

[HtmlTargetElement("ds-page-header-meta", ParentTag = "ds-page-header")]
public sealed class PageHeaderMetaTagHelper : PageHeaderSlotTagHelper
{
    internal override void Assign(PageHeaderSlots slots, string html) => slots.Meta = html;
}

[HtmlTargetElement("ds-page-header-actions", ParentTag = "ds-page-header")]
public sealed class PageHeaderActionsTagHelper : PageHeaderSlotTagHelper
{
    internal override void Assign(PageHeaderSlots slots, string html) => slots.Actions = html;
}

[HtmlTargetElement("ds-page-header-tabs", ParentTag = "ds-page-header")]
public sealed class PageHeaderTabsTagHelper : PageHeaderSlotTagHelper
{
    internal override void Assign(PageHeaderSlots slots, string html) => slots.Tabs = html;
}

/// <summary>
/// <c>&lt;ds-toolbar label="Formatting" overflow&gt;</c> → <c>div.ds-toolbar[role=toolbar]</c> with roving focus. Flags: <c>overflow</c>
/// (items that do not fit move into a "More actions" menu), <c>vertical</c>, <c>flat</c> (no frame). Children: <c>ds-toolbar-group</c>,
/// <c>ds-toolbar-separator</c>, <c>ds-toolbar-spacer</c>; items are <c>button.ds-toolbar__item</c>.
/// </summary>
[HtmlTargetElement("ds-toolbar")]
public sealed class ToolbarTagHelper : TagHelper
{
    public string? Label { get; set; }
    public bool Overflow { get; set; }
    public bool Vertical { get; set; }
    public bool Flat { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-toolbar" + (Vertical ? " is-vertical" : "") + (Flat ? " is-flat" : ""));
        output.Attributes.SetAttribute("role", "toolbar");
        output.Attributes.SetAttribute("aria-label", Label ?? DsText.T("toolbar.label"));
        if (Vertical) output.Attributes.SetAttribute("aria-orientation", "vertical");
        if (Overflow) output.Attributes.SetAttribute("data-ds-toolbar-overflow", "");
    }
}

/// <summary><c>&lt;ds-toolbar-group label="Alignment"&gt;</c> → <c>div.ds-toolbar__group[role=group]</c>.</summary>
[HtmlTargetElement("ds-toolbar-group", ParentTag = "ds-toolbar")]
public sealed class ToolbarGroupTagHelper : TagHelper
{
    public string? Label { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-toolbar__group");
        output.Attributes.SetAttribute("role", "group");
        if (!string.IsNullOrEmpty(Label)) output.Attributes.SetAttribute("aria-label", Label);
    }
}

/// <summary><c>&lt;ds-toolbar-separator /&gt;</c> → hairline between groups.</summary>
[HtmlTargetElement("ds-toolbar-separator", TagStructure = TagStructure.WithoutEndTag)]
public sealed class ToolbarSeparatorTagHelper : TagHelper
{
    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-toolbar__separator");
        output.Attributes.SetAttribute("role", "separator");
    }
}

/// <summary><c>&lt;ds-toolbar-spacer /&gt;</c> → flexible gap that pushes the following items to the end.</summary>
[HtmlTargetElement("ds-toolbar-spacer", TagStructure = TagStructure.WithoutEndTag)]
public sealed class ToolbarSpacerTagHelper : TagHelper
{
    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-toolbar__spacer");
        output.Attributes.SetAttribute("aria-hidden", "true");
    }
}

/// <summary>
/// <c>&lt;ds-resizable orientation="horizontal" persist="workspace-split"&gt;</c> with <c>ds-resizable-panel</c> and
/// <c>ds-resizable-handle</c> children → panel group with ARIA separators. orientation: horizontal (side by side, default) | vertical (stacked).
/// <c>height</c> is any CSS length for the group (a stacked group needs one).
/// </summary>
[HtmlTargetElement("ds-resizable")]
public sealed class ResizableTagHelper : TagHelper
{
    public string Orientation { get; set; } = "horizontal";
    public string? Persist { get; set; }
    public string? Height { get; set; }
    public int? Step { get; set; }
    public bool Bare { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-resizable" + (Orientation == "vertical" ? " is-vertical" : "") + (Bare ? " is-bare" : ""));
        output.Attributes.SetAttribute("data-ds-resizable", "");
        if (!string.IsNullOrEmpty(Persist)) output.Attributes.SetAttribute("data-ds-resizable-id", Persist);
        if (Step is int step) output.Attributes.SetAttribute("data-step", step);
        if (!string.IsNullOrEmpty(Height)) output.Attributes.SetAttribute("style", $"--ds-resizable-height: {Height}");
    }
}

/// <summary><c>&lt;ds-resizable-panel size="30" min="20" max="60" collapsible&gt;</c>. Sizes are percentages; they are normalised to 100.</summary>
[HtmlTargetElement("ds-resizable-panel", ParentTag = "ds-resizable")]
public sealed class ResizablePanelTagHelper : TagHelper
{
    public double? Size { get; set; }
    public double? Min { get; set; }
    public double? Max { get; set; }
    public bool Collapsible { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-resizable__panel");
        if (Size is double size) output.Attributes.SetAttribute("style", FormattableString.Invariant($"--ds-panel-size: {size}"));
        if (Min is double min) output.Attributes.SetAttribute("data-min", FormattableString.Invariant($"{min}"));
        if (Max is double max) output.Attributes.SetAttribute("data-max", FormattableString.Invariant($"{max}"));
        if (Collapsible) output.Attributes.SetAttribute("data-collapsible", "");
    }
}

/// <summary><c>&lt;ds-resizable-handle label="Resize sidebar" /&gt;</c> → focusable <c>role="separator"</c> between two panels.</summary>
[HtmlTargetElement("ds-resizable-handle", ParentTag = "ds-resizable", TagStructure = TagStructure.WithoutEndTag)]
public sealed class ResizableHandleTagHelper : TagHelper
{
    public string? Label { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-resizable__handle");
        output.Attributes.SetAttribute("role", "separator");
        output.Attributes.SetAttribute("tabindex", "0");
        output.Attributes.SetAttribute("aria-label", Label ?? DsText.T("resizable.handle"));
    }
}
