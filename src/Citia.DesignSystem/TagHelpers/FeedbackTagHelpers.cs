using System.Net;
using Citia.DesignSystem.Localization;
using Citia.DesignSystem.Ui;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Citia.DesignSystem.TagHelpers;

/// <summary>Slot a child tag helper fills for its parent (the actions of an alert or banner).</summary>
sealed class FeedbackParts
{
    public string Actions { get; set; } = "";
}

/// <summary>
/// Inline alert. <c>&lt;ds-alert tone="Warning" title="Storage almost full" dismissible&gt;You have used 92% of 50 GB.
/// &lt;ds-alert-actions&gt;&lt;a class="btn btn-sm" href="#"&gt;Upgrade&lt;/a&gt;&lt;/ds-alert-actions&gt;&lt;/ds-alert&gt;</c>.
/// Tone Error renders role="alert"; the others role="status" (override with <c>role</c>). Flags: <c>dismissible</c>, <c>compact</c>.
/// </summary>
[HtmlTargetElement("ds-alert")]
public sealed class AlertTagHelper : TagHelper
{
    public Tone Tone { get; set; } = Tone.Info;
    public string? Title { get; set; }
    /// <summary>Icon name; defaults to the icon of the tone.</summary>
    [HtmlAttributeName("icon")]
    public string? IconName { get; set; }
    public bool Dismissible { get; set; }
    public bool Compact { get; set; }
    public string? Role { get; set; }
    public string? DismissLabel { get; set; }

    public override void Init(TagHelperContext context) => context.Items[typeof(AlertTagHelper)] = new FeedbackParts();

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var parts = (FeedbackParts)context.Items[typeof(AlertTagHelper)];
        var text = (await output.GetChildContentAsync()).GetContent();
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, $"ds-alert {Tone.Css()}{(Compact ? " is-compact" : "")}");
        if (!output.Attributes.ContainsName("role")) output.Attributes.SetAttribute("role", Role ?? (Tone == Tone.Error ? "alert" : "status"));

        var html = new HtmlContentBuilder();
        html.AppendHtml(Icons.Icon.Svg(IconName ?? Tone.IconName(), "ds-icon ds-alert__icon"));
        html.AppendHtml("<div class=\"ds-alert__body\">");
        if (!string.IsNullOrWhiteSpace(Title)) html.AppendHtml("<p class=\"ds-alert__title\">").Append(Title).AppendHtml("</p>");
        if (!string.IsNullOrWhiteSpace(text)) html.AppendHtml("<div class=\"ds-alert__text\">").AppendHtml(text).AppendHtml("</div>");
        if (!string.IsNullOrWhiteSpace(parts.Actions)) html.AppendHtml("<div class=\"ds-alert__actions\">").AppendHtml(parts.Actions).AppendHtml("</div>");
        html.AppendHtml("</div>");
        if (Dismissible)
            html.AppendHtml("<button type=\"button\" class=\"ds-alert__close\" data-ds-alert-close aria-label=\"")
                .Append(DismissLabel ?? DsText.T("alert.dismiss")).AppendHtml("\">")
                .AppendHtml(Icons.Icon.Svg("x", "ds-icon")).AppendHtml("</button>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>Action buttons or links of the parent <c>ds-alert</c>.</summary>
[HtmlTargetElement("ds-alert-actions", ParentTag = "ds-alert")]
public sealed class AlertActionsTagHelper : TagHelper
{
    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var parts = (FeedbackParts)context.Items[typeof(AlertTagHelper)];
        parts.Actions = (await output.GetChildContentAsync()).GetContent();
        output.SuppressOutput();
    }
}

/// <summary>
/// Page or app banner. <c>&lt;ds-banner tone="Warning" key="maintenance-2026-11" dismissible sticky&gt;Planned maintenance on 2 Nov, 22:00 to 23:30.&lt;/ds-banner&gt;</c>.
/// <c>key</c> makes the dismissal persistent (browser storage; <c>remember="session|none"</c>, <c>days</c> to ask again later).
/// Flags: <c>dismissible</c>, <c>sticky</c>, <c>bar</c> (edge to edge), <c>critical</c> (role alert, blinking icon),
/// <c>system</c> with <c>status-label="Degraded performance"</c> (a status dot instead of the icon).
/// </summary>
[HtmlTargetElement("ds-banner")]
public sealed class BannerTagHelper : TagHelper
{
    public Tone Tone { get; set; } = Tone.Info;
    public string? Title { get; set; }
    [HtmlAttributeName("icon")]
    public string? IconName { get; set; }
    public bool Dismissible { get; set; }
    public bool Sticky { get; set; }
    public bool Bar { get; set; }
    public bool Critical { get; set; }
    [HtmlAttributeName("system")]
    public bool IsSystem { get; set; }
    public string? StatusLabel { get; set; }
    /// <summary>Id used to remember the dismissal.</summary>
    public string? Key { get; set; }
    /// <summary>local (default), session or none.</summary>
    public string? Remember { get; set; }
    public int? Days { get; set; }
    public string? DismissLabel { get; set; }

    public override void Init(TagHelperContext context) => context.Items[typeof(BannerTagHelper)] = new FeedbackParts();

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var parts = (FeedbackParts)context.Items[typeof(BannerTagHelper)];
        var text = (await output.GetChildContentAsync()).GetContent();
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, $"ds-banner {Tone.Css()}{(Sticky ? " is-sticky" : "")}{(Bar ? " is-bar" : "")}{(Critical ? " is-critical" : "")}{(IsSystem ? " is-system" : "")}");
        if (!output.Attributes.ContainsName("role")) output.Attributes.SetAttribute("role", Critical ? "alert" : "status");
        if (!string.IsNullOrEmpty(Key))
        {
            output.Attributes.SetAttribute("data-ds-banner", Key);
            if (!string.IsNullOrEmpty(Remember)) output.Attributes.SetAttribute("data-ds-banner-remember", Remember);
            if (Days is > 0) output.Attributes.SetAttribute("data-ds-banner-days", Days.Value.ToString());
        }

        var html = new HtmlContentBuilder();
        if (IsSystem)
            html.AppendHtml("<span class=\"ds-banner__status\"><span class=\"ds-banner__dot\" aria-hidden=\"true\"></span>").Append(StatusLabel ?? Title ?? "").AppendHtml("</span>");
        else
            html.AppendHtml(Icons.Icon.Svg(IconName ?? Tone.IconName(), "ds-icon ds-banner__icon"));
        html.AppendHtml("<div class=\"ds-banner__body\">");
        if (!IsSystem && !string.IsNullOrWhiteSpace(Title)) html.AppendHtml("<strong class=\"ds-banner__title\">").Append(Title).AppendHtml("</strong> ");
        html.AppendHtml(text).AppendHtml("</div>");
        if (!string.IsNullOrWhiteSpace(parts.Actions)) html.AppendHtml("<div class=\"ds-banner__actions\">").AppendHtml(parts.Actions).AppendHtml("</div>");
        if (Dismissible)
            html.AppendHtml("<button type=\"button\" class=\"ds-banner__close\" data-ds-banner-close aria-label=\"")
                .Append(DismissLabel ?? DsText.T("banner.dismiss")).AppendHtml("\">")
                .AppendHtml(Icons.Icon.Svg("x", "ds-icon")).AppendHtml("</button>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>Action buttons or links of the parent <c>ds-banner</c>.</summary>
[HtmlTargetElement("ds-banner-actions", ParentTag = "ds-banner")]
public sealed class BannerActionsTagHelper : TagHelper
{
    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var parts = (FeedbackParts)context.Items[typeof(BannerTagHelper)];
        parts.Actions = (await output.GetChildContentAsync()).GetContent();
        output.SuppressOutput();
    }
}

/// <summary>
/// Tooltip on any element: <c>&lt;button ds-tooltip="Delete" ds-tooltip-placement="bottom"&gt;…&lt;/button&gt;</c> becomes
/// <c>data-ds-tooltip</c>. Optional: <c>ds-tooltip-title</c> (rich), <c>ds-tooltip-kbd</c>, <c>ds-tooltip-delay</c> (ms).
/// </summary>
[HtmlTargetElement(Attributes = "ds-tooltip")]
public sealed class TooltipAttributeTagHelper : TagHelper
{
    [HtmlAttributeName("ds-tooltip")]
    public string? Text { get; set; }
    [HtmlAttributeName("ds-tooltip-title")]
    public string? Title { get; set; }
    [HtmlAttributeName("ds-tooltip-placement")]
    public string? Placement { get; set; }
    [HtmlAttributeName("ds-tooltip-kbd")]
    public string? Kbd { get; set; }
    [HtmlAttributeName("ds-tooltip-delay")]
    public int? Delay { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        if (!string.IsNullOrEmpty(Text)) output.Attributes.SetAttribute("data-ds-tooltip", Text);
        if (!string.IsNullOrEmpty(Title)) output.Attributes.SetAttribute("data-ds-tooltip-title", Title);
        if (!string.IsNullOrEmpty(Placement)) output.Attributes.SetAttribute("data-ds-tooltip-placement", Placement);
        if (!string.IsNullOrEmpty(Kbd)) output.Attributes.SetAttribute("data-ds-tooltip-kbd", Kbd);
        if (Delay is not null) output.Attributes.SetAttribute("data-ds-tooltip-delay", Delay.Value.ToString());
    }
}

/// <summary>
/// Focusable wrapper that carries a tooltip for a disabled control (disabled elements swallow pointer and focus events):
/// <c>&lt;ds-tooltip text="Ask an admin for access"&gt;&lt;button class="btn" disabled&gt;Delete&lt;/button&gt;&lt;/ds-tooltip&gt;</c>.
/// </summary>
[HtmlTargetElement("ds-tooltip")]
public sealed class TooltipWrapTagHelper : TagHelper
{
    public string Text { get; set; } = "";
    public string? Title { get; set; }
    public string? Placement { get; set; }
    public string? Kbd { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "span";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-tooltip-wrap");
        output.Attributes.SetAttribute("tabindex", "0");
        output.Attributes.SetAttribute("data-ds-tooltip", Text);
        if (!string.IsNullOrEmpty(Title)) output.Attributes.SetAttribute("data-ds-tooltip-title", Title);
        if (!string.IsNullOrEmpty(Placement)) output.Attributes.SetAttribute("data-ds-tooltip-placement", Placement);
        if (!string.IsNullOrEmpty(Kbd)) output.Attributes.SetAttribute("data-ds-tooltip-kbd", Kbd);
    }
}

sealed class AccordionState
{
    public string? Name { get; init; }
}

/// <summary>
/// Accordion on &lt;details&gt;. <c>&lt;ds-accordion single&gt;&lt;ds-accordion-item title="Billing" open&gt;…&lt;/ds-accordion-item&gt;&lt;/ds-accordion&gt;</c>.
/// <c>single</c> keeps one item open (native exclusive accordion through a shared <c>name</c>); without it several can be open.
/// Variants: <c>card</c> (one bordered group), <c>separated</c> (a card per item).
/// </summary>
[HtmlTargetElement("ds-accordion")]
public sealed class AccordionTagHelper : TagHelper
{
    public bool Single { get; set; }
    public bool Card { get; set; }
    public bool Separated { get; set; }
    /// <summary>Group name for single mode; generated when empty.</summary>
    public string? Name { get; set; }

    public override void Init(TagHelperContext context) =>
        context.Items[typeof(AccordionTagHelper)] = new AccordionState { Name = Single ? Name ?? "ds-acc-" + Guid.NewGuid().ToString("N")[..8] : null };

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, $"ds-accordion{(Card ? " is-card" : "")}{(Separated ? " is-separated" : "")}");
        if (Single) output.Attributes.SetAttribute("data-ds-accordion", "single");
    }
}

/// <summary>One item of a <c>ds-accordion</c>. Attributes: <c>title</c>, <c>hint</c> (second line), <c>meta</c> (end text), <c>icon</c>, <c>open</c>, <c>disabled</c>.</summary>
[HtmlTargetElement("ds-accordion-item", ParentTag = "ds-accordion")]
public sealed class AccordionItemTagHelper : TagHelper
{
    public string Title { get; set; } = "";
    public string? Hint { get; set; }
    public string? Meta { get; set; }
    [HtmlAttributeName("icon")]
    public string? IconName { get; set; }
    public bool Open { get; set; }
    public bool Disabled { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var state = (AccordionState)context.Items[typeof(AccordionTagHelper)];
        var body = (await output.GetChildContentAsync()).GetContent();
        output.TagName = "details";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-accordion__item");
        if (state.Name is not null) output.Attributes.SetAttribute("name", state.Name);
        if (Open && !Disabled) output.Attributes.SetAttribute("open", "open");
        if (Disabled) output.Attributes.SetAttribute("aria-disabled", "true");

        var html = new HtmlContentBuilder();
        html.AppendHtml("<summary class=\"ds-accordion__trigger\">");
        if (!string.IsNullOrEmpty(IconName)) html.AppendHtml(Icons.Icon.Svg(IconName, "ds-icon ds-accordion__icon"));
        html.AppendHtml("<span class=\"ds-accordion__label\"><span>").Append(Title).AppendHtml("</span>");
        if (!string.IsNullOrEmpty(Hint)) html.AppendHtml("<span class=\"ds-accordion__hint\">").Append(Hint).AppendHtml("</span>");
        html.AppendHtml("</span>");
        if (!string.IsNullOrEmpty(Meta)) html.AppendHtml("<span class=\"ds-accordion__meta\">").Append(Meta).AppendHtml("</span>");
        html.AppendHtml("</summary><div class=\"ds-accordion__panel\">").AppendHtml(body).AppendHtml("</div>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>Single disclosure on &lt;details&gt;: <c>&lt;ds-collapsible title="Show technical details"&gt;…&lt;/ds-collapsible&gt;</c>. Flag: <c>open</c>.</summary>
[HtmlTargetElement("ds-collapsible")]
public sealed class CollapsibleTagHelper : TagHelper
{
    public string Title { get; set; } = "";
    public bool Open { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var body = (await output.GetChildContentAsync()).GetContent();
        output.TagName = "details";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-collapsible");
        if (Open) output.Attributes.SetAttribute("open", "open");
        var html = new HtmlContentBuilder();
        html.AppendHtml("<summary>").Append(Title).AppendHtml("</summary><div class=\"ds-collapsible__content\">").AppendHtml(body).AppendHtml("</div>");
        output.Content.SetHtmlContent(html);
    }
}

public enum StepState { Auto, Complete, Current, Upcoming, Error }

public enum StepperOrientation { Vertical, Horizontal }

sealed record StepInfo(string Title, string? Description, string? Href, StepState State, bool Optional, bool Disabled);

sealed class StepperState
{
    public List<StepInfo> Steps { get; } = new();
}

/// <summary>
/// Stepper. <c>&lt;ds-stepper current="2" orientation="Horizontal" label="Checkout"&gt;&lt;ds-step title="Account" href="/signup" /&gt;…&lt;/ds-stepper&gt;</c>.
/// <c>current</c> is 1-based: earlier steps are complete, later ones upcoming (a step can override with <c>state</c>).
/// A step with <c>href</c> is a link, one without is status only. Narrow containers show "Step 2 of 4" for the horizontal layout.
/// </summary>
[HtmlTargetElement("ds-stepper")]
public sealed class StepperTagHelper : TagHelper
{
    public int Current { get; set; }
    public StepperOrientation Orientation { get; set; } = StepperOrientation.Vertical;
    public bool Centered { get; set; }
    public string? Label { get; set; }

    public override void Init(TagHelperContext context) => context.Items[typeof(StepperTagHelper)] = new StepperState();

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var state = (StepperState)context.Items[typeof(StepperTagHelper)];
        await output.GetChildContentAsync();
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-stepper");

        var horizontal = Orientation == StepperOrientation.Horizontal;
        var html = new HtmlContentBuilder();
        var total = state.Steps.Count;
        if (horizontal && Current >= 1 && Current <= total)
            html.AppendHtml("<p class=\"ds-stepper__compact\" aria-hidden=\"true\">").Append(DsText.T("stepper.step", Current, total))
                .AppendHtml(": <span>").Append(state.Steps[Current - 1].Title).AppendHtml("</span></p>");
        html.AppendHtml($"<ol class=\"ds-steps{(horizontal ? " is-horizontal" : "")}{(horizontal && Centered ? " is-centered" : "")}\" aria-label=\"")
            .Append(Label ?? DsText.T("stepper.label")).AppendHtml("\">");
        for (var i = 0; i < total; i++)
        {
            var step = state.Steps[i];
            var index = i + 1;
            var status = step.State != StepState.Auto ? step.State : index < Current ? StepState.Complete : index == Current ? StepState.Current : StepState.Upcoming;
            var isCurrent = status == StepState.Current || (index == Current && status == StepState.Error);
            var css = "ds-step" + (status == StepState.Complete ? " is-complete" : "") + (status == StepState.Error ? " is-error" : "")
                + (step.Optional ? " is-optional" : "") + (step.Disabled ? " is-disabled" : "");
            html.AppendHtml($"<li class=\"{css}\"{(isCurrent ? " aria-current=\"step\"" : "")}{(step.Disabled ? " aria-disabled=\"true\"" : "")}>");
            var link = !string.IsNullOrEmpty(step.Href) && !step.Disabled;
            html.AppendHtml(link ? $"<a class=\"ds-step__link\" href=\"{WebUtility.HtmlEncode(step.Href)}\">" : "<div class=\"ds-step__link\">");
            html.AppendHtml("<span class=\"ds-step__marker\" aria-hidden=\"true\"></span><span class=\"ds-step__label\">");
            var spoken = step.Disabled ? "stepper.disabled" : status == StepState.Complete ? "stepper.complete" : status == StepState.Error ? "stepper.error" : null;
            if (spoken is not null) html.AppendHtml("<span class=\"ds-visually-hidden\">").Append(DsText.T(spoken)).AppendHtml("</span>");
            html.Append(step.Title);
            if (step.Optional) html.AppendHtml("<span class=\"ds-step__tag\">").Append(DsText.T("stepper.optional")).AppendHtml("</span>");
            html.AppendHtml("</span>");
            if (!string.IsNullOrEmpty(step.Description)) html.AppendHtml("<span class=\"ds-step__desc\">").Append(step.Description).AppendHtml("</span>");
            html.AppendHtml(link ? "</a></li>" : "</div></li>");
        }
        html.AppendHtml("</ol>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>One step of a <c>ds-stepper</c>. Attributes: <c>title</c>, <c>description</c>, <c>href</c>, <c>state</c> (Auto, Complete, Current, Upcoming, Error), <c>optional</c>, <c>disabled</c>.</summary>
[HtmlTargetElement("ds-step", ParentTag = "ds-stepper")]
public sealed class StepTagHelper : TagHelper
{
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public string? Href { get; set; }
    public StepState State { get; set; } = StepState.Auto;
    public bool Optional { get; set; }
    public bool Disabled { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        ((StepperState)context.Items[typeof(StepperTagHelper)]).Steps.Add(new StepInfo(Title, Description, Href, State, Optional, Disabled));
        output.SuppressOutput();
    }
}
