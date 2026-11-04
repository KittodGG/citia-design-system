using System.Collections.Concurrent;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using Markdig;
using Markdig.Extensions.Alerts;
using Markdig.Extensions.Tables;
using Markdig.Renderers;
using Markdig.Renderers.Html;
using Markdig.Syntax;
using Markdig.Syntax.Inlines;

namespace Citia.DesignSystem.Docs.Docs;

public sealed record DocHeading(string Id, string Text, int Level);

public sealed record DocSection(string Id, string Html);

public sealed record RenderedDoc(string IntroHtml, IReadOnlyList<DocSection> Sections, IReadOnlyList<DocHeading> Headings);

/// <summary>
/// Markdown → HTML for one page. Each "##" opens a section (the scroll tracker follows h2/h3/h4). Extras:
/// GitHub alerts as callouts, ```html preview fences as live previews, ```ds-* fences as token directives,
/// .md links rewritten to site routes in the page's language. Content is first-party and trusted (previews are inserted as HTML on purpose).
/// </summary>
public sealed partial class MarkdownRenderer(DocsCatalog catalog, Directives directives)
{
    static readonly MarkdownPipeline Pipeline = new MarkdownPipelineBuilder()
        .UseAlertBlocks()
        .UsePipeTables()
        .UseAutoLinks()
        .UseTaskLists()
        .UseEmphasisExtras()
        .UseGenericAttributes()
        .Build();

    readonly ConcurrentDictionary<string, (DateTime Stamp, RenderedDoc Doc)> _cache = new();

    public RenderedDoc Render(DocPage page)
    {
        var key = $"{page.Lang}/{page.Slug}";
        if (_cache.TryGetValue(key, out var hit) && hit.Stamp == page.Modified) return hit.Doc;
        var doc = RenderCore(page.Body, page.Lang);
        _cache[key] = (page.Modified, doc);
        return doc;
    }

    RenderedDoc RenderCore(string markdown, string lang)
    {
        var document = Markdown.Parse(markdown, Pipeline);

        // Heading ids: explicit {#id} wins, otherwise a slug of the text; duplicates get -2, -3.
        var used = new HashSet<string>(StringComparer.Ordinal);
        var headings = new List<DocHeading>();
        foreach (var heading in document.Descendants<HeadingBlock>())
        {
            var attrs = heading.GetAttributes();
            var text = InlineText(heading.Inline).Trim();
            var id = attrs.Id ?? Slug(text);
            var unique = id;
            for (var n = 2; !used.Add(unique); n++) unique = $"{id}-{n}";
            attrs.Id = unique;
            if (heading.Level is >= 2 and <= 4) headings.Add(new DocHeading(unique, text, heading.Level - 2));
        }

        // ./color.md#primary → /en/color#primary; ../id/color.md → /id/color (explicit language).
        foreach (var link in document.Descendants<LinkInline>())
        {
            if (link.IsImage || string.IsNullOrEmpty(link.Url)) continue;
            var m = MdLink().Match(link.Url);
            if (!m.Success) continue;
            var target = m.Groups[1].Success ? m.Groups[1].Value.ToLowerInvariant() : lang;
            var slug = m.Groups[2].Value.ToLowerInvariant();
            link.Url = (catalog.Find(target, slug) is { } page ? catalog.UrlFor(page) : catalog.UrlFor(target, slug)) + m.Groups[3].Value;
        }

        var writer = new StringWriter();
        var renderer = new HtmlRenderer(writer);
        Pipeline.Setup(renderer);
        renderer.ObjectRenderers.ReplaceOrAdd<CodeBlockRenderer>(new DocsCodeBlockRenderer(directives, lang));
        renderer.ObjectRenderers.ReplaceOrAdd<HtmlTableRenderer>(new WrappedTableRenderer());
        renderer.ObjectRenderers.ReplaceOrAdd<AlertBlockRenderer>(new CalloutRenderer(lang));

        var intro = new StringBuilder();
        var sections = new List<DocSection>();
        StringBuilder? current = null;
        string? currentId = null;
        foreach (var block in document)
        {
            if (block is HeadingBlock { Level: 2 } h2)
            {
                if (current is not null) sections.Add(new DocSection(currentId!, current.ToString()));
                current = new StringBuilder();
                currentId = h2.GetAttributes().Id;
            }
            var sw = new StringWriter();
            renderer.Writer = sw;
            renderer.Render(block);
            renderer.Writer.Flush();
            (current ?? intro).Append(sw);
        }
        if (current is not null) sections.Add(new DocSection(currentId!, current.ToString()));
        return new RenderedDoc(intro.ToString(), sections, headings);
    }

    static string InlineText(ContainerInline? inline)
    {
        if (inline is null) return "";
        var sb = new StringBuilder();
        foreach (var child in inline)
        {
            switch (child)
            {
                case LiteralInline literal: sb.Append(literal.Content.ToString()); break;
                case CodeInline code: sb.Append(code.Content); break;
                case ContainerInline container: sb.Append(InlineText(container)); break;
            }
        }
        return sb.ToString();
    }

    public static string Slug(string text)
    {
        var lower = text.ToLowerInvariant().Normalize(NormalizationForm.FormD);
        var sb = new StringBuilder();
        foreach (var ch in lower)
        {
            if (char.GetUnicodeCategory(ch) == System.Globalization.UnicodeCategory.NonSpacingMark) continue;
            sb.Append(char.IsLetterOrDigit(ch) ? ch : '-');
        }
        var slug = Dashes().Replace(sb.ToString(), "-").Trim('-');
        return slug.Length == 0 ? "section" : slug;
    }

    [GeneratedRegex(@"^(?:\./)?(?:\.\./([a-z]{2})/)?([A-Za-z0-9-]+)\.md(#[^\s]*)?$")]
    private static partial Regex MdLink();

    [GeneratedRegex("-{2,}")]
    private static partial Regex Dashes();
}

/// <summary>Tables scroll inside their own container on narrow screens; the page never scrolls sideways.</summary>
sealed class WrappedTableRenderer : HtmlTableRenderer
{
    protected override void Write(HtmlRenderer renderer, Table table)
    {
        renderer.Write("<div class=\"docs-table-wrap\">");
        base.Write(renderer, table);
        renderer.WriteLine("</div>");
    }
}

/// <summary>GitHub alerts (> [!NOTE]) → callouts titled in the page language. The word names the kind; colour only supports it.</summary>
sealed class CalloutRenderer(string lang) : HtmlObjectRenderer<AlertBlock>
{
    static readonly Dictionary<string, (string Css, string Icon)> Kinds = new(StringComparer.OrdinalIgnoreCase)
    {
        ["NOTE"] = ("is-note", "info"),
        ["TIP"] = ("is-tip", "check-circle"),
        ["IMPORTANT"] = ("is-important", "alert"),
        ["WARNING"] = ("is-warning", "alert"),
        ["CAUTION"] = ("is-caution", "x-circle"),
    };

    protected override void Write(HtmlRenderer renderer, AlertBlock obj)
    {
        var key = obj.Kind.ToString().ToUpperInvariant();
        var known = Kinds.TryGetValue(key, out var k) ? k : (Css: "is-note", Icon: "info");
        var kind = (known.Css, Title: SiteText.T(lang, $"callout.{key}"), known.Icon);
        renderer.Write($"<div class=\"docs-callout {kind.Css}\" role=\"note\"><p class=\"docs-callout__title\">");
        renderer.Write($"<svg class=\"ds-icon\" aria-hidden=\"true\"><use href=\"#ds-icon-{kind.Icon}\"></use></svg>{kind.Title}</p>");
        renderer.WriteChildren(obj);
        renderer.WriteLine("</div>");
    }
}

/// <summary>Fenced code: live previews, token directives, or highlighted code with a copy button.</summary>
sealed partial class DocsCodeBlockRenderer(Directives directives, string lang) : HtmlObjectRenderer<CodeBlock>
{
    int _count;

    protected override void Write(HtmlRenderer renderer, CodeBlock obj)
    {
        var code = obj.Lines.ToString().TrimEnd('\n');
        var info = (obj as FencedCodeBlock)?.Info?.Trim() ?? "";
        var args = (obj as FencedCodeBlock)?.Arguments?.Trim() ?? "";
        var id = $"code-{++_count}";

        if (info.StartsWith("ds-", StringComparison.Ordinal))
        {
            renderer.Write(directives.Render(info, args, code, lang));
            return;
        }

        if (info == "html" && args.StartsWith("preview", StringComparison.Ordinal))
        {
            var title = Title().Match(args) is { Success: true } t ? t.Groups[1].Value : SiteText.T(lang, "preview");
            string L(string key) => WebUtility.HtmlEncode(SiteText.T(lang, key));
            renderer.Write($"""
                <figure class="docs-preview" data-preview>
                <figcaption class="docs-preview__bar"><span class="docs-preview__title">{WebUtility.HtmlEncode(title)}</span>
                <span class="docs-preview__themes" role="group" aria-label="{L("previewTheme")}">
                <button type="button" data-preview-theme="" aria-pressed="true">{L("follow")}</button><button type="button" data-preview-theme="light" aria-pressed="false">{L("light")}</button><button type="button" data-preview-theme="dark" aria-pressed="false">{L("dark")}</button>
                </span></figcaption>
                <div class="docs-preview__canvas" data-preview-canvas>
                {code}
                </div>
                <details class="docs-preview__code"><summary>{L("viewCode")}</summary>{CodeHtml(code, "html", id, lang)}</details>
                </figure>
                """);
            return;
        }

        renderer.Write(CodeHtml(code, info, id, lang));
    }

    static string CodeHtml(string code, string info, string id, string lang)
    {
        var label = info switch
        {
            "" => SiteText.T(lang, "text"),
            "cshtml" => "Razor (.cshtml)",
            "csharp" or "cs" => "C#",
            "powershell" or "ps1" => "PowerShell",
            "bash" or "sh" => "Terminal",
            "json" => "JSON",
            "css" => "CSS",
            "js" or "javascript" => "JavaScript",
            "ts" or "typescript" => "TypeScript",
            "html" => "HTML",
            "yaml" or "yml" => "YAML",
            "xml" => "XML",
            "dockerfile" => "Dockerfile",
            _ => info,
        };
        return $"""<div class="code-block"><div class="code-block__bar"><span>{WebUtility.HtmlEncode(label)}</span><button type="button" class="code-block__copy" data-ds-copy="#{id}" data-ds-copy-message="{WebUtility.HtmlEncode(SiteText.T(lang, "codeCopied"))}" aria-label="{WebUtility.HtmlEncode(SiteText.T(lang, "copyCode", label))}"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span>{WebUtility.HtmlEncode(SiteText.T(lang, "copy"))}</span></button></div><pre><code id="{id}" class="language-{WebUtility.HtmlEncode(info)}">{CodeHighlighter.Highlight(code, info)}</code></pre></div>""";
    }

    [GeneratedRegex("title=\"([^\"]*)\"")]
    private static partial Regex Title();
}
