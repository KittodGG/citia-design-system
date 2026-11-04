using System.Globalization;
using System.Net;
using Citia.DesignSystem.Localization;
using Citia.DesignSystem.Ui;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Extensions.DependencyInjection;

namespace Citia.DesignSystem.TagHelpers;

/// <summary>Shared helpers of the navigation tag helpers (icons with a safe fallback, attribute encoding).</summary>
static class NavHtml
{
    public static string E(string? value) => WebUtility.HtmlEncode(value ?? "");

    /// <summary>Icon from the set when it exists, otherwise the given stroke paths (icons added after this file was written).</summary>
    public static IHtmlContent Icon(string name, string fallbackPaths, string css = "ds-icon")
    {
        if (Citia.DesignSystem.Icons.Icon.Exists(name)) return Citia.DesignSystem.Icons.Icon.Svg(name, css);
        return new HtmlString("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" " +
            $"stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"{E(css)}\" aria-hidden=\"true\" focusable=\"false\">{fallbackPaths}</svg>");
    }

    public static IHtmlContent Known(string name, string css = "ds-icon") => Citia.DesignSystem.Icons.Icon.Svg(name, css);

    public static IHtmlContent ChevronsLeft(string css = "ds-icon") => Icon("chevrons-left", "<path d=\"m11 17-5-5 5-5\"/><path d=\"m18 17-5-5 5-5\"/>", css);
    public static IHtmlContent ChevronsRight(string css = "ds-icon") => Icon("chevrons-right", "<path d=\"m6 17 5-5-5-5\"/><path d=\"m13 17 5-5-5-5\"/>", css);
    public static IHtmlContent Monitor(string css = "ds-icon") => Icon("monitor", "<rect width=\"20\" height=\"14\" x=\"2\" y=\"3\" rx=\"2\"/><path d=\"M8 21h8M12 17v4\"/>", css);
    public static IHtmlContent Globe(string css = "ds-icon") => Icon("globe", "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"/><path d=\"M2 12h20\"/>", css);
    public static IHtmlContent More(string css = "ds-icon") => Icon("more", "<circle cx=\"5\" cy=\"12\" r=\"1\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"19\" cy=\"12\" r=\"1\"/>", css);
}

/* ------------------------------------------------------------------------------------------------ tabs */

/// <summary>One tab of <c>&lt;ds-tabs&gt;</c>. Child content is the panel; with <c>href</c> the tab is a link and has no panel.</summary>
[HtmlTargetElement("ds-tab", ParentTag = "ds-tabs")]
public sealed class TabTagHelper : TagHelper
{
    /// <summary>Stable key (used for the URL hash and for <c>selected</c>).</summary>
    public string Id { get; set; } = "";
    public string Label { get; set; } = "";
    /// <summary>Icon name from the set (decorative).</summary>
    public string? Icon { get; set; }
    /// <summary>Count shown after the label.</summary>
    public string? Count { get; set; }
    /// <summary>Link tab: URL of the page this tab opens.</summary>
    public string? Href { get; set; }
    /// <summary>Link tab: this is the current page (aria-current="page").</summary>
    public bool Current { get; set; }
    public bool Disabled { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var panel = await output.GetChildContentAsync();
        if (context.Items.TryGetValue(typeof(TabsTagHelper), out var items) && items is List<TabItem> list)
            list.Add(new TabItem(Id, Label, Icon, Count, Href, Current, Disabled, panel));
        output.SuppressOutput();
    }
}

sealed record TabItem(string Id, string Label, string? Icon, string? Count, string? Href, bool Current, bool Disabled, IHtmlContent Panel);

/// <summary>
/// Tabs. Panel tabs: <c>&lt;ds-tabs label="Project sections"&gt;&lt;ds-tab id="overview" label="Overview"&gt;panel…&lt;/ds-tab&gt;&lt;/ds-tabs&gt;</c>.
/// Link tabs: give every <c>ds-tab</c> an <c>href</c> and mark the current one with <c>current</c>.
/// Options: <c>variant="underline|pill|boxed"</c>, <c>size="sm|md|lg"</c>, <c>vertical</c>, <c>manual</c> (manual activation),
/// <c>full</c> (tabs share the width), <c>hash</c> (sync the selected tab with the URL hash), <c>selected="id"</c>.
/// </summary>
[HtmlTargetElement("ds-tabs")]
[RestrictChildren("ds-tab")]
public sealed class TabsTagHelper : TagHelper
{
    public string? Label { get; set; }
    public string Variant { get; set; } = "underline";
    public string Size { get; set; } = "md";
    public bool Vertical { get; set; }
    public bool Manual { get; set; }
    public bool Full { get; set; }
    public bool Hash { get; set; }
    public string? Selected { get; set; }

    [HtmlAttributeNotBound, ViewContext]
    public ViewContext ViewContext { get; set; } = null!;

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var items = new List<TabItem>();
        context.Items[typeof(TabsTagHelper)] = items;
        await output.GetChildContentAsync();

        var http = ViewContext.HttpContext.Items;
        var n = http.TryGetValue("ds.tabs", out var last) && last is int previous ? previous + 1 : 1;
        http["ds.tabs"] = n;
        var prefix = $"ds-tabs-{n}";

        var linkMode = items.Any(i => i.Href is not null);
        var variant = Variant.ToLowerInvariant();
        var css = "ds-tabs";
        if (variant is "pill" or "boxed") css += $" is-{variant}";
        if (Size is "sm" or "lg") css += $" is-{Size}";
        if (Vertical) css += " is-vertical";
        if (Full) css += " is-full";

        output.TagName = linkMode ? "nav" : "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, css);
        output.Attributes.SetAttribute("data-ds-tabs", "");
        if (Manual) output.Attributes.SetAttribute("data-ds-activation", "manual");
        if (Hash) output.Attributes.SetAttribute("data-ds-tabs-hash", "");
        if (linkMode && !string.IsNullOrEmpty(Label)) output.Attributes.SetAttribute("aria-label", Label);

        var selectedId = Selected ?? items.FirstOrDefault(i => !i.Disabled)?.Id;
        var html = new HtmlContentBuilder();
        html.AppendHtml("<div class=\"ds-tabs__list\"");
        if (!linkMode)
        {
            html.AppendHtml(" role=\"tablist\"");
            if (!string.IsNullOrEmpty(Label)) html.AppendHtml($" aria-label=\"{NavHtml.E(Label)}\"");
            if (Vertical) html.AppendHtml(" aria-orientation=\"vertical\"");
        }
        html.AppendHtml(">");

        foreach (var item in items)
        {
            var key = string.IsNullOrEmpty(item.Id) ? NavHtml.E(item.Label) : NavHtml.E(item.Id);
            if (linkMode)
            {
                html.AppendHtml($"<a class=\"ds-tabs__tab\" href=\"{NavHtml.E(item.Href ?? "#")}\"{(item.Current ? " aria-current=\"page\"" : "")}{(item.Disabled ? " aria-disabled=\"true\"" : "")}>");
            }
            else
            {
                var selected = string.Equals(item.Id, selectedId, StringComparison.Ordinal);
                html.AppendHtml($"<button type=\"button\" class=\"ds-tabs__tab\" role=\"tab\" id=\"{prefix}-tab-{key}\" aria-controls=\"{prefix}-panel-{key}\" " +
                    $"aria-selected=\"{(selected ? "true" : "false")}\" tabindex=\"{(selected ? "0" : "-1")}\" data-ds-tab=\"{key}\"{(item.Disabled ? " disabled" : "")}>");
            }
            if (!string.IsNullOrEmpty(item.Icon)) html.AppendHtml(NavHtml.Known(item.Icon));
            html.AppendHtml("<span>").Append(item.Label).AppendHtml("</span>");
            if (!string.IsNullOrEmpty(item.Count)) html.AppendHtml("<span class=\"ds-tabs__count\">").Append(item.Count).AppendHtml("</span>");
            html.AppendHtml(linkMode ? "</a>" : "</button>");
        }
        html.AppendHtml("</div>");

        if (!linkMode)
        {
            foreach (var item in items)
            {
                var key = string.IsNullOrEmpty(item.Id) ? NavHtml.E(item.Label) : NavHtml.E(item.Id);
                var selected = string.Equals(item.Id, selectedId, StringComparison.Ordinal);
                html.AppendHtml($"<div class=\"ds-tabs__panel\" role=\"tabpanel\" id=\"{prefix}-panel-{key}\" aria-labelledby=\"{prefix}-tab-{key}\" tabindex=\"0\"{(selected ? "" : " hidden")}>");
                html.AppendHtml(item.Panel);
                html.AppendHtml("</div>");
            }
        }
        output.Content.SetHtmlContent(html);
    }
}

/* ------------------------------------------------------------------------------------------------ breadcrumb */

/// <summary>One level of <c>&lt;ds-breadcrumb&gt;</c>. Without <c>href</c> it is the current page.</summary>
[HtmlTargetElement("ds-breadcrumb-item", ParentTag = "ds-breadcrumb")]
public sealed class BreadcrumbItemTagHelper : TagHelper
{
    public string? Href { get; set; }
    /// <summary>Icon name placed before the label (for example a home icon on the first level).</summary>
    public string? Icon { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var label = (await output.GetChildContentAsync()).GetContent().Trim();
        if (context.Items.TryGetValue(typeof(BreadcrumbTagHelper), out var items) && items is List<CrumbItem> list)
            list.Add(new CrumbItem(label, Href, Icon));
        output.SuppressOutput();
    }
}

sealed record CrumbItem(string Label, string? Href, string? Icon);

/// <summary>
/// Breadcrumb: <c>&lt;ds-breadcrumb&gt;&lt;ds-breadcrumb-item href="/"&gt;Home&lt;/ds-breadcrumb-item&gt;…&lt;ds-breadcrumb-item&gt;Current page&lt;/ds-breadcrumb-item&gt;&lt;/ds-breadcrumb&gt;</c>.
/// The last item is the current page. <c>collapse</c> folds the middle levels into a "…" menu in narrow containers;
/// <c>separator="chevron"</c> replaces the slash; <c>label</c> overrides the landmark name.
/// </summary>
[HtmlTargetElement("ds-breadcrumb")]
[RestrictChildren("ds-breadcrumb-item")]
public sealed class BreadcrumbTagHelper : TagHelper
{
    public string? Label { get; set; }
    public string Separator { get; set; } = "slash";
    public bool Collapse { get; set; } = true;

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var items = new List<CrumbItem>();
        context.Items[typeof(BreadcrumbTagHelper)] = items;
        await output.GetChildContentAsync();

        var collapse = Collapse && items.Count > 3;
        output.TagName = "nav";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-breadcrumb" + (string.Equals(Separator, "chevron", StringComparison.OrdinalIgnoreCase) ? " is-chevron" : "") + (collapse ? " is-collapsible" : ""));
        output.Attributes.SetAttribute("aria-label", Label ?? DsText.T("breadcrumb.label"));

        var html = new HtmlContentBuilder();
        html.AppendHtml("<ol>");
        for (var i = 0; i < items.Count; i++)
        {
            var item = items[i];
            var last = i == items.Count - 1;
            var middle = collapse && i > 0 && !last;
            html.AppendHtml(middle ? "<li data-collapsible>" : "<li>");
            html.AppendHtml(last || item.Href is null
                ? $"<span aria-current=\"page\" title=\"{NavHtml.E(item.Label)}\">"
                : $"<a href=\"{NavHtml.E(item.Href)}\" title=\"{NavHtml.E(item.Label)}\">");
            if (!string.IsNullOrEmpty(item.Icon)) html.AppendHtml(NavHtml.Known(item.Icon));
            html.Append(item.Label);
            html.AppendHtml(last || item.Href is null ? "</span>" : "</a>");
            html.AppendHtml("</li>");

            if (collapse && i == 0)
            {
                html.AppendHtml("<li class=\"ds-breadcrumb__collapse\"><details class=\"ds-breadcrumb__more\" data-ds-popdown>");
                html.AppendHtml($"<summary aria-label=\"{NavHtml.E(DsText.T("breadcrumb.more"))}\">").AppendHtml(NavHtml.More()).AppendHtml("</summary>");
                html.AppendHtml("<ul class=\"ds-breadcrumb__menu\">");
                for (var j = 1; j < items.Count - 1; j++)
                {
                    var hidden = items[j];
                    html.AppendHtml("<li>");
                    html.AppendHtml(hidden.Href is null ? "<span>" : $"<a href=\"{NavHtml.E(hidden.Href)}\">");
                    html.Append(hidden.Label);
                    html.AppendHtml(hidden.Href is null ? "</span>" : "</a>");
                    html.AppendHtml("</li>");
                }
                html.AppendHtml("</ul></details></li>");
            }
        }
        html.AppendHtml("</ol>");
        output.Content.SetHtmlContent(html);
    }
}

/* ------------------------------------------------------------------------------------------------ pagination */

/// <summary>Page numbers to show: 1-based numbers, <c>null</c> where an ellipsis goes.</summary>
public static class PageRange
{
    /// <param name="page">Current page, 1-based (clamped).</param>
    /// <param name="pageCount">Number of pages.</param>
    /// <param name="siblings">Pages shown on each side of the current one.</param>
    /// <param name="boundaries">Pages always shown at the start and the end.</param>
    public static IReadOnlyList<int?> Compute(int page, int pageCount, int siblings = 1, int boundaries = 1)
    {
        pageCount = Math.Max(1, pageCount);
        page = Math.Clamp(page, 1, pageCount);
        siblings = Math.Max(0, siblings);
        boundaries = Math.Max(1, boundaries);

        var start = Enumerable.Range(1, Math.Min(boundaries, pageCount)).ToList();
        var endFrom = Math.Max(pageCount - boundaries + 1, boundaries + 1);
        var end = endFrom <= pageCount ? Enumerable.Range(endFrom, pageCount - endFrom + 1).ToList() : new List<int>();

        var siblingsStart = Math.Max(Math.Min(page - siblings, pageCount - boundaries - siblings * 2 - 1), boundaries + 2);
        var siblingsEnd = Math.Min(Math.Max(page + siblings, boundaries + siblings * 2 + 2), end.Count > 0 ? end[0] - 2 : pageCount - 1);

        var items = new List<int?>();
        items.AddRange(start.Select(p => (int?)p));
        if (siblingsStart > boundaries + 2) items.Add(null);
        else if (boundaries + 1 < pageCount - boundaries) items.Add(boundaries + 1);
        for (var p = siblingsStart; p <= siblingsEnd; p++) items.Add(p);
        if (siblingsEnd < pageCount - boundaries - 1) items.Add(null);
        else if (pageCount - boundaries > boundaries) items.Add(pageCount - boundaries);
        items.AddRange(end.Select(p => (int?)p));
        return items;
    }
}

/// <summary>
/// Numbered pagination: <c>&lt;ds-pagination page="3" page-count="12" /&gt;</c>. Links keep the current query and set <c>page</c>;
/// <c>href-template="/projects/page/{0}"</c> builds path URLs instead. Options: <c>siblings</c> (1), <c>boundaries</c> (1),
/// <c>edges</c> (first and last buttons), <c>simple</c> (previous, summary, next only), <c>outline</c>, <c>size="sm|lg"</c>, <c>label</c>.
/// Renders nothing when there is one page or fewer.
/// </summary>
[HtmlTargetElement("ds-pagination")]
public sealed class PaginationTagHelper : TagHelper
{
    public int Page { get; set; } = 1;
    public int PageCount { get; set; } = 1;
    public string? HrefTemplate { get; set; }
    public int Siblings { get; set; } = 1;
    public int Boundaries { get; set; } = 1;
    public bool Edges { get; set; }
    public bool Simple { get; set; }
    public bool Outline { get; set; }
    public string? Size { get; set; }
    public string? Label { get; set; }

    [HtmlAttributeNotBound, ViewContext]
    public ViewContext ViewContext { get; set; } = null!;

    string Href(int page) => HrefTemplate is not null
        ? HrefTemplate.Replace("{0}", page.ToString(CultureInfo.InvariantCulture), StringComparison.Ordinal)
        : QueryUrl.With(ViewContext.HttpContext.Request, ("page", page == 1 ? null : page.ToString(CultureInfo.InvariantCulture)));

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        if (PageCount <= 1) { output.SuppressOutput(); return; }
        var page = Math.Clamp(Page, 1, PageCount);

        output.TagName = "nav";
        output.TagMode = TagMode.StartTagAndEndTag;
        var css = "ds-pagination";
        if (Simple) css += " is-simple";
        if (Outline) css += " is-outline";
        if (Size is "sm" or "lg") css += $" is-{Size}";
        Classes.Add(output, css);
        output.Attributes.SetAttribute("aria-label", Label ?? DsText.T("pagination.label"));

        var html = new HtmlContentBuilder();
        html.AppendHtml("<ul class=\"ds-pagination__list\">");

        void Control(string kind, int target, bool enabled, IHtmlContent iconBefore, IHtmlContent iconAfter, string text, string aria, bool edge)
        {
            html.AppendHtml(edge ? "<li class=\"ds-pagination__edge\">" : "<li>");
            if (enabled)
                html.AppendHtml($"<a class=\"ds-pagination__link {kind}\" href=\"{NavHtml.E(Href(target))}\" aria-label=\"{NavHtml.E(aria)}\"{(kind == "is-prev" ? " rel=\"prev\"" : kind == "is-next" ? " rel=\"next\"" : "")}>");
            else
                html.AppendHtml($"<a class=\"ds-pagination__link {kind}\" aria-disabled=\"true\" aria-label=\"{NavHtml.E(aria)}\">");
            html.AppendHtml(iconBefore);
            if (text.Length > 0) html.AppendHtml("<span>").Append(text).AppendHtml("</span>");
            html.AppendHtml(iconAfter);
            html.AppendHtml("</a></li>");
        }

        var none = HtmlString.Empty;
        if (Edges) Control("is-first", 1, page > 1, NavHtml.ChevronsLeft(), none, "", DsText.T("pagination.first"), true);
        Control("is-prev", page - 1, page > 1, NavHtml.Known("chevron-left"), none, DsText.T("pagination.previous"), DsText.T("pagination.previous"), false);

        foreach (var number in PageRange.Compute(page, PageCount, Siblings, Boundaries))
        {
            if (number is null)
            {
                html.AppendHtml("<li class=\"ds-pagination__gap\" aria-hidden=\"true\">…</li>");
                continue;
            }
            var n = number.Value;
            var current = n == page;
            html.AppendHtml("<li class=\"ds-pagination__page\">");
            html.AppendHtml($"<a class=\"ds-pagination__link\" href=\"{NavHtml.E(Href(n))}\" aria-label=\"{NavHtml.E(DsText.T(current ? "pagination.current" : "pagination.goto", n))}\"{(current ? " aria-current=\"page\"" : "")}>");
            html.Append(n.ToString(CultureInfo.CurrentCulture)).AppendHtml("</a></li>");
        }

        html.AppendHtml("<li class=\"ds-pagination__summary\">").Append(DsText.T("pagination.summary", page, PageCount)).AppendHtml("</li>");
        Control("is-next", page + 1, page < PageCount, none, NavHtml.Known("chevron-right"), DsText.T("pagination.next"), DsText.T("pagination.next"), false);
        if (Edges) Control("is-last", PageCount, page < PageCount, none, NavHtml.ChevronsRight(), "", DsText.T("pagination.last"), true);

        html.AppendHtml("</ul>");
        output.Content.SetHtmlContent(html);
    }
}

/* ------------------------------------------------------------------------------------------------ theme switcher */

/// <summary>
/// Theme control for theme.js. <c>&lt;ds-theme-switcher /&gt;</c> renders a light / dark / system segmented control;
/// <c>variant="labels"</c> adds the words; <c>variant="toggle"</c> renders one icon button that flips light and dark.
/// <c>size="sm|lg"</c> scales the segmented control; <c>label</c> overrides the group name.
/// </summary>
[HtmlTargetElement("ds-theme-switcher", TagStructure = TagStructure.WithoutEndTag)]
public sealed class ThemeSwitcherTagHelper : TagHelper
{
    public string Variant { get; set; } = "segmented";
    public string? Size { get; set; }
    public string? Label { get; set; }

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var html = new HtmlContentBuilder();
        if (string.Equals(Variant, "toggle", StringComparison.OrdinalIgnoreCase))
        {
            output.TagName = "button";
            output.TagMode = TagMode.StartTagAndEndTag;
            Classes.Add(output, "ds-theme-toggle");
            output.Attributes.SetAttribute("type", "button");
            output.Attributes.SetAttribute("data-ds-theme-toggle", "");
            output.Attributes.SetAttribute("aria-label", DsText.T("theme.toDark"));
            html.AppendHtml(Citia.DesignSystem.Icons.Icon.Svg("sun", "ds-icon ds-theme-toggle__light"));
            html.AppendHtml(Citia.DesignSystem.Icons.Icon.Svg("moon", "ds-icon ds-theme-toggle__dark"));
            output.Content.SetHtmlContent(html);
            return;
        }

        var labels = string.Equals(Variant, "labels", StringComparison.OrdinalIgnoreCase);
        output.TagName = "div";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-segmented ds-theme-switcher" + (labels ? " has-labels" : "") + (Size is "sm" or "lg" ? $" is-{Size}" : ""));
        output.Attributes.SetAttribute("role", "group");
        output.Attributes.SetAttribute("aria-label", Label ?? DsText.T("theme.label"));
        output.Attributes.SetAttribute("data-ds-segmented", "");

        void Option(string mode, IHtmlContent icon)
        {
            var name = DsText.T($"theme.{mode}");
            html.AppendHtml($"<button type=\"button\" data-ds-theme-set=\"{mode}\" aria-pressed=\"false\" title=\"{NavHtml.E(name)}\"{(labels ? "" : $" aria-label=\"{NavHtml.E(name)}\"")}>");
            html.AppendHtml(icon);
            if (labels) html.AppendHtml("<span>").Append(name).AppendHtml("</span>");
            html.AppendHtml("</button>");
        }
        Option("light", NavHtml.Known("sun"));
        Option("dark", NavHtml.Known("moon"));
        Option("system", NavHtml.Monitor());
        output.Content.SetHtmlContent(html);
    }
}

/* ------------------------------------------------------------------------------------------------ language switcher */

/// <summary>
/// Language links with endonyms (English, Bahasa Indonesia), <c>lang</c> and <c>hreflang</c> on every link and
/// <c>aria-current="true"</c> on the current one.
/// <c>&lt;ds-language-switcher languages="en,id" current="@lang" href-template="/{0}/pricing" /&gt;</c>.
/// Without <c>href-template</c> the links reuse the current URL with <c>?culture=xx&amp;ui-culture=xx</c> (the query string provider of
/// ASP.NET Core request localization). <c>action="/culture"</c> renders a POST form with one button per language and a
/// <c>returnUrl</c> field (cookie pattern, see the page). <c>variant="segmented|code|menu"</c>; <c>remember</c> writes the culture cookie
/// from the browser when a link is followed; <c>label</c> overrides the group name.
/// </summary>
[HtmlTargetElement("ds-language-switcher", TagStructure = TagStructure.WithoutEndTag)]
public sealed class LanguageSwitcherTagHelper : TagHelper
{
    public string Languages { get; set; } = "en,id";
    public string? Current { get; set; }
    public string? HrefTemplate { get; set; }
    public string? Action { get; set; }
    public string? ReturnUrl { get; set; }
    public string Variant { get; set; } = "segmented";
    public bool Remember { get; set; }
    public string? Label { get; set; }

    [HtmlAttributeNotBound, ViewContext]
    public ViewContext ViewContext { get; set; } = null!;

    static string Endonym(string code)
    {
        var name = DsText.T($"language.name.{code}");
        if (name != $"language.name.{code}") return name;
        try
        {
            var native = CultureInfo.GetCultureInfo(code).NativeName;
            return char.ToUpper(native[0], CultureInfo.CurrentCulture) + native[1..];
        }
        catch (CultureNotFoundException) { return code.ToUpperInvariant(); }
    }

    string Href(string code) => HrefTemplate is not null
        ? HrefTemplate.Replace("{0}", code, StringComparison.Ordinal)
        : QueryUrl.With(ViewContext.HttpContext.Request, ("culture", code), ("ui-culture", code));

    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        var codes = Languages.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        var current = (Current ?? CultureInfo.CurrentUICulture.TwoLetterISOLanguageName).ToLowerInvariant();
        var label = Label ?? DsText.T("language.label");
        var menu = string.Equals(Variant, "menu", StringComparison.OrdinalIgnoreCase);
        var code = string.Equals(Variant, "code", StringComparison.OrdinalIgnoreCase);
        var post = !string.IsNullOrEmpty(Action);
        var html = new HtmlContentBuilder();

        if (post) AddPost(output, html, codes, current, label, code);
        else if (menu) AddMenu(output, html, codes, current, label);
        else
        {
            output.TagName = "nav";
            output.TagMode = TagMode.StartTagAndEndTag;
            Classes.Add(output, "ds-segmented ds-language-switcher");
            output.Attributes.SetAttribute("aria-label", label);
            output.Attributes.SetAttribute("data-ds-segmented", "");
            foreach (var lang in codes)
            {
                var text = code ? lang.ToUpperInvariant() : Endonym(lang);
                var title = code ? $" aria-label=\"{NavHtml.E(Endonym(lang))}\" title=\"{NavHtml.E(Endonym(lang))}\"" : "";
                html.AppendHtml($"<a href=\"{NavHtml.E(Href(lang))}\" lang=\"{NavHtml.E(lang)}\" hreflang=\"{NavHtml.E(lang)}\"{title}{(lang == current ? " aria-current=\"true\"" : "")}>").Append(text).AppendHtml("</a>");
            }
        }
        if (Remember && !post) output.Attributes.SetAttribute("data-ds-language-remember", "");
        output.Content.SetHtmlContent(html);
    }

    void AddMenu(TagHelperOutput output, HtmlContentBuilder html, string[] codes, string current, string label)
    {
        output.TagName = "details";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-language-switcher is-menu");
        output.Attributes.SetAttribute("data-ds-popdown", "");
        html.AppendHtml($"<summary aria-label=\"{NavHtml.E(label)}\">").AppendHtml(NavHtml.Globe());
        html.AppendHtml($"<span lang=\"{NavHtml.E(current)}\">").Append(Endonym(current)).AppendHtml("</span>");
        html.AppendHtml(NavHtml.Known("chevron-down", "ds-icon ds-language-switcher__chevron")).AppendHtml("</summary>");
        html.AppendHtml("<ul class=\"ds-language-switcher__panel\">");
        foreach (var lang in codes)
        {
            var on = lang == current;
            html.AppendHtml($"<li><a href=\"{NavHtml.E(Href(lang))}\" lang=\"{NavHtml.E(lang)}\" hreflang=\"{NavHtml.E(lang)}\"{(on ? " aria-current=\"true\"" : "")}>");
            html.AppendHtml("<span>").Append(Endonym(lang)).AppendHtml("</span>");
            if (on) html.AppendHtml(NavHtml.Known("check"));
            html.AppendHtml("</a></li>");
        }
        html.AppendHtml("</ul>");
        if (Remember) output.Attributes.SetAttribute("data-ds-language-remember", "");
    }

    void AddPost(TagHelperOutput output, HtmlContentBuilder html, string[] codes, string current, string label, bool code)
    {
        output.TagName = "form";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-segmented ds-language-switcher");
        output.Attributes.SetAttribute("method", "post");
        output.Attributes.SetAttribute("action", Action);
        output.Attributes.SetAttribute("role", "group");
        output.Attributes.SetAttribute("aria-label", label);
        output.Attributes.SetAttribute("data-ds-segmented", "");

        var http = ViewContext.HttpContext;
        var returnUrl = ReturnUrl ?? $"{http.Request.PathBase}{http.Request.Path}{http.Request.QueryString}";
        html.AppendHtml($"<input type=\"hidden\" name=\"returnUrl\" value=\"{NavHtml.E(returnUrl)}\" />");
        var antiforgery = http.RequestServices.GetService<IAntiforgery>();
        if (antiforgery is not null)
        {
            var tokens = antiforgery.GetAndStoreTokens(http);
            html.AppendHtml($"<input type=\"hidden\" name=\"{NavHtml.E(tokens.FormFieldName)}\" value=\"{NavHtml.E(tokens.RequestToken)}\" />");
        }
        foreach (var lang in codes)
        {
            var text = code ? lang.ToUpperInvariant() : Endonym(lang);
            var extra = code ? $" aria-label=\"{NavHtml.E(Endonym(lang))}\" title=\"{NavHtml.E(Endonym(lang))}\"" : "";
            html.AppendHtml($"<button type=\"submit\" name=\"culture\" value=\"{NavHtml.E(lang)}\" lang=\"{NavHtml.E(lang)}\"{extra} aria-pressed=\"{(lang == current ? "true" : "false")}\">").Append(text).AppendHtml("</button>");
        }
    }
}
