using System.IO.Compression;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using Microsoft.AspNetCore.Diagnostics;

namespace Citia.DesignSystem.Docs.Docs;

/// <summary>
/// Read-only NuGet v3 feed for the design system packages, served by the documentation site at /nuget/v3/index.json.
/// Packages are plain *.nupkg files in one folder (NuGet:PackagesPath). Publishing = copying a file there over SSH
/// (tools/release.ps1); the site has no upload endpoint. Resources: PackageBaseAddress (restore), RegistrationsBaseUrl
/// (dotnet list package --outdated, IDE update checks) and SearchQueryService (dotnet package search, IDE browse).
/// </summary>
public sealed class NuGetFeed(string folder, string? publicUrl, ILogger<NuGetFeed> log)
{
    static readonly Regex SafeId = new("^[a-z0-9][a-z0-9._-]{0,99}$", RegexOptions.CultureInvariant);
    static readonly Regex SafeVersion = new("^[0-9][0-9a-z.+-]{0,63}$", RegexOptions.CultureInvariant);

    public string Folder { get; } = folder;
    readonly object gate = new();
    Dictionary<string, (DateTime Stamp, Package Package)> cache = new(StringComparer.Ordinal);

    public sealed record Package(string Id, string Version, string File, string Description, string Authors,
        string? ProjectUrl, string[] Tags, string[] Frameworks, DateTime Published, string Nuspec)
    {
        public string LowerId => Id.ToLowerInvariant();
        public string LowerVersion => Version.ToLowerInvariant();
    }

    /// <summary>All packages in the folder, read from each package's .nuspec (cached by file timestamp).</summary>
    public IReadOnlyList<Package> Packages()
    {
        if (!Directory.Exists(Folder)) return [];
        var files = Directory.GetFiles(Folder, "*.nupkg", SearchOption.TopDirectoryOnly);
        lock (gate)
        {
            var next = new Dictionary<string, (DateTime Stamp, Package Package)>(StringComparer.Ordinal);
            foreach (var file in files)
            {
                var stamp = File.GetLastWriteTimeUtc(file);
                if (cache.TryGetValue(file, out var hit) && hit.Stamp == stamp) { next[file] = hit; continue; }
                try { next[file] = (stamp, Read(file, stamp)); }
                catch (Exception e) { log.LogWarning(e, "Skipping unreadable package {File}", file); }
            }
            cache = next;
            return [.. next.Values.Select(v => v.Package)];
        }
    }

    static Package Read(string file, DateTime stamp)
    {
        using var zip = ZipFile.OpenRead(file);
        var entry = zip.Entries.First(e => !e.FullName.Contains('/') && e.FullName.EndsWith(".nuspec", StringComparison.OrdinalIgnoreCase));
        string xml;
        using (var reader = new StreamReader(entry.Open())) xml = reader.ReadToEnd();
        var meta = XDocument.Parse(xml).Root!.Elements().First(e => e.Name.LocalName == "metadata");
        string? Get(string name) => meta.Elements().FirstOrDefault(e => e.Name.LocalName == name)?.Value.Trim();
        var frameworks = meta.Descendants().Where(e => e.Name.LocalName == "group")
            .Select(g => g.Attribute("targetFramework")?.Value).OfType<string>().Distinct().ToArray();
        var version = Get("version")!;
        return new Package(Get("id")!, version.Split('+')[0], file, Get("description") ?? "", Get("authors") ?? "",
            Get("projectUrl"), (Get("tags") ?? "").Split([' ', ';', ','], StringSplitOptions.RemoveEmptyEntries), frameworks, stamp, xml);
    }

    /// <summary>SemVer 2 order: numeric parts, then a release after its pre-releases, then pre-release labels.</summary>
    public static int Compare(string a, string b)
    {
        static (int[] Nums, string[] Pre) Parse(string v)
        {
            var dash = v.IndexOf('-');
            var core = dash < 0 ? v : v[..dash];
            var pre = dash < 0 ? [] : v[(dash + 1)..].Split('.');
            return (core.Split('.').Select(p => int.TryParse(p, out var n) ? n : 0).Concat([0, 0, 0, 0]).Take(4).ToArray(), pre);
        }
        var (an, ap) = Parse(a);
        var (bn, bp) = Parse(b);
        for (var i = 0; i < 4; i++) if (an[i] != bn[i]) return an[i].CompareTo(bn[i]);
        if (ap.Length == 0 || bp.Length == 0) return bp.Length.CompareTo(ap.Length);
        for (var i = 0; i < Math.Min(ap.Length, bp.Length); i++)
        {
            var ai = int.TryParse(ap[i], out var x); var bi = int.TryParse(bp[i], out var y);
            var c = ai && bi ? x.CompareTo(y) : ai ? -1 : bi ? 1 : string.CompareOrdinal(ap[i], bp[i]);
            if (c != 0) return c;
        }
        return ap.Length.CompareTo(bp.Length);
    }

    public string Base(HttpRequest request) =>
        (string.IsNullOrWhiteSpace(publicUrl) ? $"{request.Scheme}://{request.Host}{request.PathBase}" : publicUrl.TrimEnd('/')) + "/nuget/v3";

    IEnumerable<Package> Versions(string lowerId, bool prerelease = true) =>
        Packages().Where(p => p.LowerId == lowerId && (prerelease || !p.Version.Contains('-')))
            .OrderBy(p => p.Version, Comparer<string>.Create(Compare));

    object CatalogEntry(string b, Package p) => new Dictionary<string, object?>
    {
        ["@id"] = $"{b}/registration/{p.LowerId}/{p.LowerVersion}.json",
        ["@type"] = "PackageDetails",
        ["id"] = p.Id,
        ["version"] = p.Version,
        ["description"] = p.Description,
        ["authors"] = p.Authors,
        ["projectUrl"] = p.ProjectUrl,
        ["tags"] = p.Tags,
        ["listed"] = true,
        ["published"] = p.Published.ToString("O"),
        ["packageContent"] = Nupkg(b, p),
        ["dependencyGroups"] = p.Frameworks.Select(f => new Dictionary<string, object> { ["targetFramework"] = f }).ToArray(),
    };

    static string Nupkg(string b, Package p) => $"{b}/flat/{p.LowerId}/{p.LowerVersion}/{p.LowerId}.{p.LowerVersion}.nupkg";

    public void Map(WebApplication app)
    {
        var group = app.MapGroup("/nuget/v3").AddEndpointFilter(async (ctx, next) =>
        {
            // A NuGet client asks every source for every package it restores: answer misses with a bare 404, not the HTML 404 page.
            if (ctx.HttpContext.Features.Get<IStatusCodePagesFeature>() is { } pages) pages.Enabled = false;
            return await next(ctx);
        });

        group.MapGet("/index.json", (HttpContext http) =>
        {
            var b = Base(http.Request);
            NoCache(http);
            return Results.Json(new
            {
                version = "3.0.0",
                resources = new object[]
                {
                    Resource($"{b}/flat/", "PackageBaseAddress/3.0.0", "Package contents"),
                    Resource($"{b}/registration/", "RegistrationsBaseUrl", "Package metadata"),
                    Resource($"{b}/registration/", "RegistrationsBaseUrl/3.0.0-rc", "Package metadata"),
                    Resource($"{b}/registration/", "RegistrationsBaseUrl/3.4.0", "Package metadata"),
                    Resource($"{b}/registration/", "RegistrationsBaseUrl/3.6.0", "Package metadata (SemVer 2)"),
                    Resource($"{b}/search", "SearchQueryService", "Search"),
                    Resource($"{b}/search", "SearchQueryService/3.0.0-rc", "Search"),
                    Resource($"{b}/search", "SearchQueryService/3.5.0", "Search"),
                    // dotnet package search (SDK 10) looks for this type and reports "no Search service" without it.
                    Resource($"{b}/search", "SearchQueryService/3.0.0-beta", "Search"),
                },
            });
        });

        group.MapGet("/flat/{id}/index.json", (string id, HttpContext http) =>
        {
            if (!SafeId.IsMatch(id)) return Results.NotFound();
            var versions = Versions(id).Select(p => p.LowerVersion).ToArray();
            if (versions.Length == 0) return Results.NotFound();
            NoCache(http);
            return Results.Json(new { versions });
        });

        group.MapGet("/flat/{id}/{version}/{file}", (string id, string version, string file, HttpContext http) =>
        {
            if (!SafeId.IsMatch(id) || !SafeVersion.IsMatch(version)) return Results.NotFound();
            var p = Versions(id).FirstOrDefault(x => x.LowerVersion == version);
            if (p is null) return Results.NotFound();
            if (file == $"{id}.{version}.nupkg")
            {
                // A published version never changes (release.ps1 refuses to overwrite one), so caches may keep it.
                http.Response.Headers.CacheControl = "public, max-age=31536000, immutable";
                return Results.File(p.File, "application/octet-stream", enableRangeProcessing: true);
            }
            if (file == $"{id}.nuspec") { NoCache(http); return Results.Text(p.Nuspec, "application/xml"); }
            return Results.NotFound();
        });

        group.MapGet("/registration/{id}/index.json", (string id, HttpContext http) =>
        {
            if (!SafeId.IsMatch(id)) return Results.NotFound();
            var list = Versions(id).ToList();
            if (list.Count == 0) return Results.NotFound();
            var b = Base(http.Request);
            NoCache(http);
            return Results.Json(new Dictionary<string, object>
            {
                ["@id"] = $"{b}/registration/{id}/index.json",
                ["count"] = 1,
                ["items"] = new object[]
                {
                    new Dictionary<string, object>
                    {
                        ["@id"] = $"{b}/registration/{id}/index.json#page/{list[0].LowerVersion}/{list[^1].LowerVersion}",
                        ["count"] = list.Count,
                        ["lower"] = list[0].Version,
                        ["upper"] = list[^1].Version,
                        ["items"] = list.Select(p => new Dictionary<string, object>
                        {
                            ["@id"] = $"{b}/registration/{id}/{p.LowerVersion}.json",
                            ["catalogEntry"] = CatalogEntry(b, p),
                            ["packageContent"] = Nupkg(b, p),
                        }).ToArray(),
                    },
                },
            });
        });

        group.MapGet("/registration/{id}/{leaf}", (string id, string leaf, HttpContext http) =>
        {
            if (!SafeId.IsMatch(id) || !leaf.EndsWith(".json", StringComparison.Ordinal)) return Results.NotFound();
            var version = leaf[..^5];
            var p = Versions(id).FirstOrDefault(x => x.LowerVersion == version);
            if (p is null) return Results.NotFound();
            var b = Base(http.Request);
            NoCache(http);
            return Results.Json(new Dictionary<string, object>
            {
                ["@id"] = $"{b}/registration/{id}/{p.LowerVersion}.json",
                ["catalogEntry"] = $"{b}/registration/{id}/{p.LowerVersion}.json",
                ["listed"] = true,
                ["packageContent"] = Nupkg(b, p),
                ["published"] = p.Published.ToString("O"),
                ["registration"] = $"{b}/registration/{id}/index.json",
            });
        });

        group.MapGet("/search", (HttpContext http, string? q, int? skip, int? take, bool? prerelease) =>
        {
            var b = Base(http.Request);
            var term = (q ?? "").Trim();
            var hits = Packages().GroupBy(p => p.LowerId)
                .Select(g => g.Where(p => prerelease == true || !p.Version.Contains('-')).OrderBy(p => p.Version, Comparer<string>.Create(Compare)).ToList())
                .Where(list => list.Count > 0)
                .Where(list => term.Length == 0
                    || list[^1].Id.Contains(term, StringComparison.OrdinalIgnoreCase)
                    || list[^1].Description.Contains(term, StringComparison.OrdinalIgnoreCase)
                    || list[^1].Tags.Any(t => t.Contains(term, StringComparison.OrdinalIgnoreCase)))
                .OrderBy(list => list[^1].Id, StringComparer.OrdinalIgnoreCase)
                .ToList();
            NoCache(http);
            return Results.Json(new
            {
                totalHits = hits.Count,
                data = hits.Skip(Math.Max(0, skip ?? 0)).Take(Math.Clamp(take ?? 20, 1, 100)).Select(list =>
                {
                    var latest = list[^1];
                    return new Dictionary<string, object?>
                    {
                        ["@id"] = $"{b}/registration/{latest.LowerId}/index.json",
                        ["@type"] = "Package",
                        ["registration"] = $"{b}/registration/{latest.LowerId}/index.json",
                        ["id"] = latest.Id,
                        ["version"] = latest.Version,
                        ["description"] = latest.Description,
                        ["summary"] = latest.Description,
                        ["title"] = latest.Id,
                        ["authors"] = new[] { latest.Authors },
                        ["owners"] = new[] { latest.Authors },
                        ["tags"] = latest.Tags,
                        ["projectUrl"] = latest.ProjectUrl,
                        ["totalDownloads"] = 0,
                        ["verified"] = false,
                        ["versions"] = list.Select(p => new Dictionary<string, object>
                        {
                            ["version"] = p.Version,
                            ["downloads"] = 0,
                            ["@id"] = $"{b}/registration/{p.LowerId}/{p.LowerVersion}.json",
                        }).ToArray(),
                    };
                }),
            });
        });
    }

    static object Resource(string id, string type, string comment) =>
        new Dictionary<string, string> { ["@id"] = id, ["@type"] = type, ["comment"] = comment };

    static void NoCache(HttpContext http) => http.Response.Headers.CacheControl = "no-cache";
}
