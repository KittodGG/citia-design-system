using System.Net;
using System.Text;
using Citia.DesignSystem.Icons;
using Citia.DesignSystem.Localization;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Citia.DesignSystem.TagHelpers;

/// <summary>
/// Toolbar above a data table: search, your filters (child content), then reset, a columns menu, a density toggle and an export link.
/// <code>
/// &lt;ds-data-table-toolbar search-value="@Model.Q" density export-href="@Url.Page("Export")" reset-href="@Url.Page("Index")"
///     column-status="Status" column-owner="Owner" hidden-columns="owner"&gt;
///     &lt;select name="status" class="select" data-ds-autosubmit aria-label="Status"&gt;…&lt;/select&gt;
/// &lt;/ds-data-table-toolbar&gt;
/// </code>
/// Server mode (default) renders a GET <c>form</c> that keeps <c>sort</c>, <c>direction</c> and <c>size</c> from the query and drops <c>page</c>.
/// <c>client</c> renders a <c>div</c> and filters the rows already on the page (data-ds-table-search). Put it inside <c>.ds-data-table[data-ds-table]</c>.
/// </summary>
[HtmlTargetElement("ds-data-table-toolbar")]
public sealed class DataTableToolbarTagHelper : TagHelper
{
    /// <summary>Form action; empty posts to the current URL.</summary>
    public string? Action { get; set; }

    /// <summary>Query parameter of the search box. Empty hides the search box. Default "q".</summary>
    public string? SearchName { get; set; } = "q";

    public string? SearchValue { get; set; }

    /// <summary>Accessible name of the search box (default: "Search").</summary>
    public string? SearchLabel { get; set; }

    public string? SearchPlaceholder { get; set; }

    /// <summary>Filter the rows on the page in the browser instead of submitting a request.</summary>
    public bool Client { get; set; }

    /// <summary>Show the comfortable / compact toggle.</summary>
    public bool Density { get; set; }

    /// <summary>"comfortable" or "compact".</summary>
    public string DensityValue { get; set; } = "comfortable";

    /// <summary>Link of the export button (an export endpoint that honours the current query). Empty hides it.</summary>
    public string? ExportHref { get; set; }

    public string? ExportLabel { get; set; }

    /// <summary>File kind named in the "preparing" toast (data-ds-export), e.g. Excel or CSV.</summary>
    public string ExportKind { get; set; } = "Excel";

    /// <summary>Link of the reset button (same page without a query). Empty hides it.</summary>
    public string? ResetHref { get; set; }

    /// <summary>Comma separated column keys that start hidden.</summary>
    public string? HiddenColumns { get; set; }

    /// <summary>Query parameters copied into hidden fields so the sort and page size survive a search.</summary>
    public string Keep { get; set; } = "sort,direction,size";

    /// <summary>Columns of the view menu: <c>column-status="Status"</c> gives key "status", label "Status". Cells carry <c>data-col="status"</c>.</summary>
    [HtmlAttributeName("columns", DictionaryAttributePrefix = "column-")]
    public IDictionary<string, string> Columns { get; set; } = new Dictionary<string, string>();

    [ViewContext]
    [HtmlAttributeNotBound]
    public ViewContext? ViewContext { get; set; }

    static string E(string? value) => WebUtility.HtmlEncode(value ?? "");

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var child = await output.GetChildContentAsync();
        output.TagName = Client ? "div" : "form";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, "ds-table-toolbar is-inline");
        output.Attributes.SetAttribute("role", "search");
        if (!Client)
        {
            output.Attributes.SetAttribute("method", "get");
            if (!string.IsNullOrEmpty(Action)) output.Attributes.SetAttribute("action", Action);
        }

        var html = new HtmlContentBuilder();
        if (!Client && ViewContext?.HttpContext.Request.Query is { } query)
        {
            foreach (var key in Keep.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
                if (query.TryGetValue(key, out var value) && !string.IsNullOrEmpty(value.ToString()))
                    html.AppendHtml($"<input type=\"hidden\" name=\"{E(key)}\" value=\"{E(value.ToString())}\">");
        }

        if (!string.IsNullOrEmpty(SearchName))
        {
            var label = SearchLabel ?? DsText.T("table.search");
            var marker = Client ? " data-ds-table-search" : "";
            html.AppendHtml("<div class=\"ds-search\">").AppendHtml(Icon.Svg("search"))
                .AppendHtml($"<input type=\"search\" name=\"{E(SearchName)}\" value=\"{E(SearchValue)}\" class=\"input\" aria-label=\"{E(label)}\" placeholder=\"{E(SearchPlaceholder ?? DsText.T("table.searchPlaceholder"))}\" autocomplete=\"off\"{marker}>")
                .AppendHtml("</div>");
        }

        html.AppendHtml(child);
        html.AppendHtml("<span class=\"ds-table-toolbar__spacer\"></span>");
        html.AppendHtml("<div class=\"ds-table-toolbar__group\">");

        if (!string.IsNullOrEmpty(ResetHref))
            html.AppendHtml($"<a class=\"btn btn-ghost btn-sm\" href=\"{E(ResetHref)}\">").Append(DsText.T("table.reset")).AppendHtml("</a>");

        if (Columns.Count > 0)
        {
            var hidden = new HashSet<string>((HiddenColumns ?? "").Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries), StringComparer.OrdinalIgnoreCase);
            html.AppendHtml("<details class=\"ds-disclosure-menu\" data-ds-menu><summary class=\"btn btn-ghost btn-sm\">")
                .AppendHtml(Icon.Svg("columns")).Append(DsText.T("table.columns")).AppendHtml("</summary>")
                .AppendHtml("<div class=\"ds-menu-panel\"><div class=\"ds-table-columns\">");
            foreach (var (key, name) in Columns)
            {
                html.AppendHtml($"<label><input type=\"checkbox\" class=\"checkbox checkbox-sm\" data-ds-column=\"{E(key)}\"{(hidden.Contains(key) ? "" : " checked")}>")
                    .Append(name).AppendHtml("</label>");
            }
            html.AppendHtml("</div><button type=\"button\" class=\"btn btn-ghost btn-sm\" data-ds-columns-reset>").Append(DsText.T("table.columnsReset")).AppendHtml("</button></div></details>");
        }

        if (Density)
        {
            var compact = string.Equals(DensityValue, "compact", StringComparison.OrdinalIgnoreCase);
            html.AppendHtml($"<div class=\"ds-density-toggle\" role=\"group\" aria-label=\"{E(DsText.T("table.density"))}\">")
                .AppendHtml($"<button type=\"button\" data-ds-density-set=\"comfortable\" aria-pressed=\"{(!compact).ToString().ToLowerInvariant()}\" aria-label=\"{E(DsText.T("table.densityComfortable"))}\" title=\"{E(DsText.T("table.densityComfortable"))}\">").AppendHtml(Icon.Svg("rows")).AppendHtml("</button>")
                .AppendHtml($"<button type=\"button\" data-ds-density-set=\"compact\" aria-pressed=\"{compact.ToString().ToLowerInvariant()}\" aria-label=\"{E(DsText.T("table.densityCompact"))}\" title=\"{E(DsText.T("table.densityCompact"))}\">").AppendHtml(Icon.Svg("list")).AppendHtml("</button>")
                .AppendHtml("</div>");
        }

        if (!string.IsNullOrEmpty(ExportHref))
            html.AppendHtml($"<a class=\"btn btn-ghost btn-sm\" href=\"{E(ExportHref)}\" data-ds-export=\"{E(ExportKind)}\">")
                .AppendHtml(Icon.Svg("download")).Append(ExportLabel ?? DsText.T("table.export")).AppendHtml("</a>");

        html.AppendHtml("</div>");
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>
/// Keyboard keys. <c>&lt;ds-kbd keys="Mod+K" /&gt;</c> renders a combination; <c>size="sm|lg"</c>, <c>ghost</c> for the quiet style inside buttons.
/// Tokens: Mod (Ctrl, ⌘ on Apple), Ctrl, Alt, Shift, Enter, Esc, Tab, Backspace, Delete, Space, Up, Down, Left, Right, Home, End, PageUp, PageDown,
/// F1–F12 or any single character. Child content is used when <c>keys</c> is empty.
/// </summary>
[HtmlTargetElement("ds-kbd")]
public sealed class KbdTagHelper : TagHelper
{
    public string? Keys { get; set; }

    /// <summary>"sm" or "lg"; empty is the default size.</summary>
    public string? Size { get; set; }

    public bool Ghost { get; set; }

    // token → (text, Apple text, accessible label key, accessible label key on Apple)
    static readonly Dictionary<string, (string Text, string? Mac, string? Label, string? MacLabel)> Known = new(StringComparer.OrdinalIgnoreCase)
    {
        ["mod"] = ("Ctrl", "⌘", "kbd.ctrl", "kbd.cmd"),
        ["ctrl"] = ("Ctrl", "⌃", "kbd.ctrl", "kbd.ctrl"),
        ["cmd"] = ("⌘", null, "kbd.cmd", null),
        ["alt"] = ("Alt", "⌥", "kbd.alt", "kbd.option"),
        ["option"] = ("Alt", "⌥", "kbd.alt", "kbd.option"),
        ["shift"] = ("Shift", "⇧", "kbd.shift", "kbd.shift"),
        ["enter"] = ("Enter", "↵", "kbd.enter", "kbd.enter"),
        ["esc"] = ("Esc", null, "kbd.esc", null),
        ["tab"] = ("Tab", null, "kbd.tab", null),
        ["backspace"] = ("Backspace", "⌫", "kbd.backspace", "kbd.backspace"),
        ["delete"] = ("Del", "⌦", "kbd.delete", "kbd.delete"),
        ["space"] = ("Space", null, "kbd.space", null),
        ["up"] = ("↑", null, "kbd.up", null),
        ["down"] = ("↓", null, "kbd.down", null),
        ["left"] = ("←", null, "kbd.left", null),
        ["right"] = ("→", null, "kbd.right", null),
        ["home"] = ("Home", null, "kbd.home", null),
        ["end"] = ("End", null, "kbd.end", null),
        ["pageup"] = ("PgUp", null, "kbd.pageup", null),
        ["pagedown"] = ("PgDn", null, "kbd.pagedown", null),
    };

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var spec = !string.IsNullOrWhiteSpace(Keys) ? Keys : (await output.GetChildContentAsync()).GetContent();
        var keys = (spec ?? "").Split('+', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        var size = string.IsNullOrEmpty(Size) ? "" : $" is-{WebUtility.HtmlEncode(Size)}";
        var ghost = Ghost ? " is-ghost" : "";
        var html = new HtmlContentBuilder();
        for (var i = 0; i < keys.Length; i++)
        {
            if (i > 0) html.AppendHtml("<span class=\"ds-kbd-sep\">+</span>");
            var token = keys[i];
            var attrs = new StringBuilder();
            var text = token.Length == 1 ? token.ToUpperInvariant() : token;
            if (Known.TryGetValue(token, out var known))
            {
                text = known.Text;
                if (known.Mac is not null && known.Mac != known.Text)
                {
                    attrs.Append($" data-ds-kbd-mac=\"{WebUtility.HtmlEncode(known.Mac)}\"");
                    if (known.MacLabel is not null) attrs.Append($" data-ds-kbd-mac-label=\"{WebUtility.HtmlEncode(DsText.T(known.MacLabel))}\"");
                }
                // Symbols need a spoken name; words speak for themselves.
                if (known.Label is not null && text != token && !text.All(char.IsLetter))
                    attrs.Append($" aria-label=\"{WebUtility.HtmlEncode(DsText.T(known.Label))}\"");
            }
            html.AppendHtml($"<kbd class=\"ds-kbd{size}{ghost}\"{attrs}>").Append(text).AppendHtml("</kbd>");
        }

        if (keys.Length <= 1)
        {
            output.TagName = null;
        }
        else
        {
            output.TagName = "span";
            output.TagMode = TagMode.StartTagAndEndTag;
            Classes.Add(output, "ds-kbd-group");
        }
        output.Content.SetHtmlContent(html);
    }
}

/// <summary>
/// Code block with language label, copy button and optional line numbers, highlighted lines, wrap toggle and collapsed height.
/// <code>
/// &lt;ds-code-block language="csharp" title="Program.cs" line-numbers highlight="2,4-5" wrap-toggle collapsible="14" code="@Model.Snippet" /&gt;
/// </code>
/// Use <c>code</c> for dynamic text. Child content is taken literally as written in the view (it is dedented and HTML-encoded once), so it
/// suits static snippets without Razor expressions. <c>diff</c> (or <c>language="diff"</c>) marks lines that start with + or − and removes that first
/// character (a space marks a context line). Syntax colouring is not applied here; wrap tokens in <c>.ds-syntax-*</c> spans on the page if needed.
/// </summary>
[HtmlTargetElement("ds-code-block")]
public sealed class CodeBlockTagHelper : TagHelper
{
    public string? Language { get; set; }
    public string? Title { get; set; }

    /// <summary>The code. When empty the child content is used.</summary>
    public string? Code { get; set; }

    public bool LineNumbers { get; set; }

    /// <summary>Lines to highlight, one-based: "2,4-6".</summary>
    public string? Highlight { get; set; }

    public bool Diff { get; set; }

    /// <summary>Start with wrapped lines.</summary>
    public bool Wrap { get; set; }

    /// <summary>Show the wrap toggle in the bar.</summary>
    public bool WrapToggle { get; set; }

    /// <summary>Collapsed height in rem; a "Show all lines" button appears when the code is taller.</summary>
    public double? Collapsible { get; set; }

    /// <summary>Hide the copy button.</summary>
    public bool NoCopy { get; set; }

    /// <summary>Id of the pre element (generated when empty).</summary>
    public string? PreId { get; set; }

    static readonly Dictionary<string, string> Names = new(StringComparer.OrdinalIgnoreCase)
    {
        ["csharp"] = "C#", ["cs"] = "C#", ["cshtml"] = "Razor", ["razor"] = "Razor", ["html"] = "HTML", ["css"] = "CSS", ["js"] = "JavaScript",
        ["javascript"] = "JavaScript", ["ts"] = "TypeScript", ["typescript"] = "TypeScript", ["json"] = "JSON", ["bash"] = "Shell", ["sh"] = "Shell",
        ["powershell"] = "PowerShell", ["ps1"] = "PowerShell", ["xml"] = "XML", ["sql"] = "SQL", ["yaml"] = "YAML", ["diff"] = "Diff",
    };

    static string E(string? value) => WebUtility.HtmlEncode(value ?? "");

    static HashSet<int> ParseLines(string? spec)
    {
        var set = new HashSet<int>();
        foreach (var part in (spec ?? "").Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            var range = part.Split('-', 2);
            if (int.TryParse(range[0], out var from))
            {
                var to = range.Length == 2 && int.TryParse(range[1], out var t) ? t : from;
                for (var n = from; n <= to && n - from < 10000; n++) set.Add(n);
            }
        }
        return set;
    }

    static string[] Dedent(string text)
    {
        var lines = text.Replace("\r\n", "\n").Replace('\r', '\n').Split('\n').ToList();
        while (lines.Count > 0 && string.IsNullOrWhiteSpace(lines[0])) lines.RemoveAt(0);
        while (lines.Count > 0 && string.IsNullOrWhiteSpace(lines[^1])) lines.RemoveAt(lines.Count - 1);
        var indent = lines.Where(l => !string.IsNullOrWhiteSpace(l)).Select(l => l.Length - l.TrimStart().Length).DefaultIfEmpty(0).Min();
        return lines.Select(l => l.Length >= indent ? l[indent..] : l.TrimStart()).ToArray();
    }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var source = Code ?? (await output.GetChildContentAsync()).GetContent();
        var lines = Dedent(source ?? "");
        var diff = Diff || string.Equals(Language, "diff", StringComparison.OrdinalIgnoreCase);
        var marked = ParseLines(Highlight);
        var id = string.IsNullOrWhiteSpace(PreId) ? "ds-code-" + Guid.NewGuid().ToString("N")[..8] : PreId!;
        var languageName = string.IsNullOrWhiteSpace(Language) ? null : Names.TryGetValue(Language!, out var pretty) ? pretty : Language!.ToUpperInvariant();

        output.TagName = "figure";
        output.TagMode = TagMode.StartTagAndEndTag;
        Classes.Add(output, Wrap ? "ds-code is-wrapped" : "ds-code");
        if (Collapsible is { } rem)
            output.Attributes.SetAttribute("data-ds-code-collapsible", rem.ToString(System.Globalization.CultureInfo.InvariantCulture));

        var html = new HtmlContentBuilder();
        var hasBar = languageName is not null || !string.IsNullOrEmpty(Title) || !NoCopy || WrapToggle;
        if (hasBar)
        {
            html.AppendHtml("<div class=\"ds-code__bar\">");
            if (languageName is not null) html.AppendHtml("<span class=\"ds-code__lang\">").Append(languageName).AppendHtml("</span>");
            if (!string.IsNullOrEmpty(Title)) html.AppendHtml("<span class=\"ds-code__title\">").Append(Title).AppendHtml("</span>");
            html.AppendHtml("<div class=\"ds-code__actions\">");
            if (WrapToggle)
                html.AppendHtml($"<button type=\"button\" class=\"ds-code__btn\" data-ds-code-wrap aria-pressed=\"{Wrap.ToString().ToLowerInvariant()}\">")
                    .AppendHtml(Icon.Svg("align-left")).Append(DsText.T("code.wrap")).AppendHtml("</button>");
            if (!NoCopy)
                html.AppendHtml("<button type=\"button\" class=\"ds-code__btn ds-code__copy\" data-ds-code-copy>")
                    .AppendHtml(Icon.Svg("copy", "ds-icon is-rest-icon")).AppendHtml(Icon.Svg("check", "ds-icon is-copied-icon")).AppendHtml(Icon.Svg("x", "ds-icon is-failed-icon"))
                    .AppendHtml("<span class=\"ds-code__label-rest\">").Append(DsText.T("code.copy")).AppendHtml("</span>")
                    .AppendHtml("<span class=\"ds-code__label-copied\">").Append(DsText.T("code.copied")).AppendHtml("</span>")
                    .AppendHtml("<span class=\"ds-code__label-failed\">").Append(DsText.T("code.failed")).AppendHtml("</span></button>");
            html.AppendHtml("</div></div>");
        }

        var langClass = string.IsNullOrWhiteSpace(Language) ? "" : $" class=\"language-{E(Language!.ToLowerInvariant())}\"";
        html.AppendHtml($"<pre class=\"ds-code-block{(LineNumbers ? " has-line-numbers" : "")}\" id=\"{E(id)}\" tabindex=\"0\"><code{langClass}>");
        var wrapLines = LineNumbers || marked.Count > 0 || diff;
        for (var i = 0; i < lines.Length; i++)
        {
            var line = lines[i];
            if (!wrapLines)
            {
                html.Append(line);
            }
            else
            {
                var attrs = new StringBuilder();
                if (marked.Contains(i + 1)) attrs.Append(" data-highlight");
                if (diff && line.Length > 0)
                {
                    if (line[0] == '+') attrs.Append(" data-change=\"added\"");
                    else if (line[0] == '-') attrs.Append(" data-change=\"removed\"");
                    line = line[1..];
                }
                else if (diff) { line = ""; }
                html.AppendHtml($"<span class=\"ds-code-line\"{attrs}>").Append(line).AppendHtml("</span>");
            }
            if (i < lines.Length - 1) html.Append("\n");
        }
        html.AppendHtml("</code></pre>");

        if (Collapsible is not null)
            html.AppendHtml("<div class=\"ds-code__foot\" hidden>")
                .AppendHtml($"<button type=\"button\" class=\"ds-code__btn\" data-ds-code-expand aria-expanded=\"false\" aria-controls=\"{E(id)}\"><span data-ds-code-expand-label>")
                .Append(DsText.T("code.expand")).AppendHtml("</span>").AppendHtml(Icon.Svg("chevron-down")).AppendHtml("</button></div>");

        output.Content.SetHtmlContent(html);
    }
}
