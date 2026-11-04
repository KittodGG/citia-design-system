using System.Text.RegularExpressions;
using Microsoft.Extensions.Options;

namespace Citia.DesignSystem.Docs.Docs;

/// <summary>
/// Site configuration: the "context" of the documentation site. Change these values (appsettings.json, section Docs) and the
/// Markdown files to reuse the same site for another product: name, languages, groups, home page, theme names, storage prefix.
/// </summary>
public sealed class DocsOptions
{
    public string SiteName { get; set; } = "Citia Design System";
    public string ShortName { get; set; } = "Citia DS";
    /// <summary>Shown in the header and footer. Defaults to the referenced Citia.DesignSystem package version, so site and package never drift.</summary>
    public string Version { get; set; } = LibraryVersion();

    static string LibraryVersion()
    {
        var info = typeof(Citia.DesignSystem.Ui.HeadOptions).Assembly
            .GetCustomAttributes(typeof(System.Reflection.AssemblyInformationalVersionAttribute), false)
            .OfType<System.Reflection.AssemblyInformationalVersionAttribute>().FirstOrDefault()?.InformationalVersion;
        return (info ?? typeof(Citia.DesignSystem.Ui.HeadOptions).Assembly.GetName().Version?.ToString(3) ?? "").Split('+')[0];
    }
    public string HomeSlug { get; set; } = "introduction";
    public string? ContentPath { get; set; }
    // Lists start empty: the configuration binder appends to existing items, so defaults are applied in Normalize().
    public List<string> Languages { get; set; } = [];
    public string DefaultLanguage { get; set; } = "en";
    public List<string> Groups { get; set; } = [];
    public List<string> Categories { get; set; } = [];
    public string LightTheme { get; set; } = "light";
    public string DarkTheme { get; set; } = "dark";
    public string Storage { get; set; } = "ds-docs";
    public string Owner { get; set; } = "";

    public void Normalize()
    {
        static List<string> Clean(List<string> list, string[] fallback) =>
            (list.Count == 0 ? fallback : list.Select(x => x.Trim().ToLowerInvariant()).Distinct()).ToList();
        Languages = Clean(Languages, ["en", "id"]);
        Groups = Clean(Groups, ["getting-started", "foundations", "components", "patterns", "content", "reference"]);
        Categories = Clean(Categories, ["actions", "forms", "data-display", "feedback", "overlays", "navigation", "layout"]);
        DefaultLanguage = Languages.Contains(DefaultLanguage.ToLowerInvariant()) ? DefaultLanguage.ToLowerInvariant() : Languages[0];
    }
}

/// <summary>One Markdown page. <see cref="Href"/> (front matter "href") makes the entry a navigation link to another route, e.g. a Razor page.</summary>
public sealed record DocPage(string Lang, string Slug, string Title, string Group, string? Category, int Order, string Summary, string? Source, string Body, string FilePath, DateTime Modified, string? Href = null);

public sealed record NavCategory(string? Category, IReadOnlyList<DocPage> Pages);

public sealed record NavSection(string Group, IReadOnlyList<NavCategory> Categories);

/// <summary>
/// Loads docs/{lang}/*.md (files and folders starting with "_" are private notes), parses the front matter and orders the
/// navigation by group, then category (components), then order and title. Reloads when a file changes.
/// </summary>
public sealed partial class DocsCatalog(IOptions<DocsOptions> options, IWebHostEnvironment env, ILogger<DocsCatalog> logger)
{
    readonly DocsOptions _options = options.Value;
    readonly Lock _gate = new();
    IReadOnlyList<DocPage> _pages = [];
    DateTime _stamp = DateTime.MinValue;
    string? _root;

    public DocsOptions Options => _options;

    public string ContentRoot => _root ??= ResolveRoot();

    public IReadOnlyList<DocPage> All
    {
        get
        {
            var stamp = LatestWrite();
            lock (_gate)
            {
                if (stamp != _stamp)
                {
                    _pages = Load();
                    _stamp = stamp;
                }
                return _pages;
            }
        }
    }

    public bool IsLanguage(string? lang) => lang is not null && _options.Languages.Contains(lang, StringComparer.OrdinalIgnoreCase);

    public IReadOnlyList<DocPage> Pages(string lang) => All.Where(p => p.Lang == lang).ToList();

    public IReadOnlyList<NavSection> Nav(string lang) =>
        Pages(lang).GroupBy(p => p.Group)
            .Select(g => new NavSection(g.Key, g.GroupBy(p => p.Category).Select(c => new NavCategory(c.Key, c.ToList())).ToList()))
            .ToList();

    public DocPage? Find(string lang, string? slug) =>
        All.FirstOrDefault(p => p.Lang == lang && string.Equals(p.Slug, string.IsNullOrEmpty(slug) ? _options.HomeSlug : slug, StringComparison.OrdinalIgnoreCase));

    public (DocPage? Previous, DocPage? Next) Neighbours(DocPage page)
    {
        var list = Pages(page.Lang);
        var index = list.ToList().FindIndex(p => p.Slug == page.Slug);
        return (index > 0 ? list[index - 1] : null, index >= 0 && index < list.Count - 1 ? list[index + 1] : null);
    }

    public string UrlFor(DocPage page) => page.Href ?? UrlFor(page.Lang, page.Slug);

    public string UrlFor(string lang, string slug) =>
        string.Equals(slug, _options.HomeSlug, StringComparison.OrdinalIgnoreCase) ? $"/{lang}/" : $"/{lang}/{slug}";

    /// <summary>The same page in another language, or that language's home page when no translation exists.</summary>
    public string AlternateUrl(string lang, string? slug) =>
        slug is not null && Find(lang, slug) is not null ? UrlFor(lang, slug) : $"/{lang}/";

    string ResolveRoot()
    {
        var candidates = new[]
        {
            _options.ContentPath is null ? null : Path.GetFullPath(Path.Combine(env.ContentRootPath, _options.ContentPath)),
            Path.Combine(env.ContentRootPath, "content", "docs"),
            Path.GetFullPath(Path.Combine(env.ContentRootPath, "..", "..", "docs")),
        };
        var root = candidates.FirstOrDefault(c => c is not null && Directory.Exists(c))
            ?? throw new DirectoryNotFoundException("Docs content not found. Set Docs:ContentPath.");
        logger.LogInformation("Docs content: {Root}", root);
        return root;
    }

    IEnumerable<string> Files() => _options.Languages
        .Select(lang => Path.Combine(ContentRoot, lang))
        .Where(Directory.Exists)
        .SelectMany(dir => Directory.EnumerateFiles(dir, "*.md"));

    DateTime LatestWrite() => Files().Select(File.GetLastWriteTimeUtc).DefaultIfEmpty(DateTime.MinValue).Max()
        .AddTicks(Files().Count()); // a deleted file also changes the stamp

    IReadOnlyList<DocPage> Load()
    {
        var pages = new List<DocPage>();
        foreach (var file in Files())
        {
            var name = Path.GetFileNameWithoutExtension(file);
            if (name.StartsWith('_')) continue;
            var lang = Path.GetFileName(Path.GetDirectoryName(file)!)!.ToLowerInvariant();
            var text = File.ReadAllText(file).Replace("\r\n", "\n");
            var (meta, body) = SplitFrontMatter(text);
            pages.Add(new DocPage(
                lang,
                name.ToLowerInvariant(),
                meta.GetValueOrDefault("title") ?? name,
                meta.GetValueOrDefault("group") ?? _options.Groups.LastOrDefault() ?? "reference",
                meta.GetValueOrDefault("category"),
                int.TryParse(meta.GetValueOrDefault("order"), out var order) ? order : 99,
                meta.GetValueOrDefault("summary") ?? "",
                meta.GetValueOrDefault("source"),
                body,
                file,
                File.GetLastWriteTimeUtc(file),
                meta.GetValueOrDefault("href")?.Replace("{lang}", lang)));
        }
        int Index(List<string> list, string? key) { var i = key is null ? -1 : list.IndexOf(key); return i < 0 ? int.MaxValue : i; }
        return pages
            .OrderBy(p => Index(_options.Languages, p.Lang))
            .ThenBy(p => Index(_options.Groups, p.Group))
            .ThenBy(p => p.Category is null ? -1 : Index(_options.Categories, p.Category))
            .ThenBy(p => p.Order)
            .ThenBy(p => p.Title, StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    static (Dictionary<string, string> Meta, string Body) SplitFrontMatter(string text)
    {
        var meta = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        if (!text.StartsWith("---\n")) return (meta, text);
        var end = text.IndexOf("\n---\n", 4, StringComparison.Ordinal);
        if (end < 0) return (meta, text);
        foreach (var line in text[4..end].Split('\n'))
        {
            var m = FrontMatterLine().Match(line);
            if (m.Success) meta[m.Groups[1].Value] = m.Groups[2].Value.Trim().Trim('"');
        }
        return (meta, text[(end + 5)..]);
    }

    [GeneratedRegex(@"^([A-Za-z][\w-]*):\s*(.*)$")]
    private static partial Regex FrontMatterLine();
}
