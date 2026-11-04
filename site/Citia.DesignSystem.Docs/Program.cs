using System.Globalization;
using Citia.DesignSystem.Docs.Docs;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<DocsOptions>(builder.Configuration.GetSection("Docs"));
builder.Services.PostConfigure<DocsOptions>(o => o.Normalize());
builder.Services.AddSingleton<DocsCatalog>();
builder.Services.AddSingleton<TokenStore>();
builder.Services.AddSingleton<Directives>();
builder.Services.AddSingleton<MarkdownRenderer>();
builder.Services.AddRouting(o => o.ConstraintMap["docslang"] = typeof(DocsLanguageConstraint));
builder.Services.AddRazorPages();

// Behind nginx (and Cloudflare): take the original scheme and client address from the loopback proxy,
// so absolute URLs (the NuGet feed's service index) say https.
builder.Services.Configure<ForwardedHeadersOptions>(o => o.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto);

// NuGet feed for Citia.DesignSystem (read-only; tools/release.ps1 copies packages into this folder over SSH).
var packagesPath = Path.GetFullPath(builder.Configuration["NuGet:PackagesPath"] ?? "packages", builder.Environment.ContentRootPath);
builder.Services.AddSingleton(sp => new NuGetFeed(packagesPath, builder.Configuration["NuGet:PublicUrl"], sp.GetRequiredService<ILogger<NuGetFeed>>()));

var app = builder.Build();
var docs = app.Services.GetRequiredService<IOptions<DocsOptions>>().Value;

app.UseForwardedHeaders();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

// Same hardening headers as TPS Integration: no framing, no MIME sniffing.
app.Use(async (context, next) =>
{
    context.Response.Headers.XFrameOptions = "DENY";
    context.Response.Headers.XContentTypeOptions = "nosniff";
    context.Response.Headers["Content-Security-Policy"] = "frame-ancestors 'none'";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    await next();
});

// The page language drives DsText (Razor partials) and Fmt (dates): /en/... → en, /id/... → id.
app.Use(async (context, next) =>
{
    var first = context.Request.Path.Value?.Split('/', StringSplitOptions.RemoveEmptyEntries).FirstOrDefault();
    var lang = first is not null && docs.Languages.Contains(first, StringComparer.OrdinalIgnoreCase) ? first.ToLowerInvariant() : docs.DefaultLanguage;
    var culture = CultureInfo.GetCultureInfo(lang);
    CultureInfo.CurrentCulture = culture;
    CultureInfo.CurrentUICulture = culture;
    context.Items["docs.lang"] = lang;
    await next();
});

app.UseStatusCodePagesWithReExecute("/404");

// Development: serve files straight from wwwroot as well, so CSS/JS written while the site runs appear without a rebuild.
if (app.Environment.IsDevelopment()) app.UseStaticFiles();

app.UseRouting();
app.MapStaticAssets();
app.MapRazorPages().WithStaticAssets();

// One-line install: irm https://design.citia-engineering.com/install.ps1 | iex  (tools/install-citia-ds.ps1, copied at build).
var installer = Path.Combine(AppContext.BaseDirectory, "install", "install-citia-ds.ps1");
app.MapGet("/install.ps1", (HttpContext http) =>
{
    http.Response.Headers.CacheControl = "no-cache";
    return File.Exists(installer) ? Results.File(installer, "text/plain; charset=utf-8") : Results.NotFound();
});

// 2.0.2 had a separate offline page; it is now a section of Installation.
app.MapGet("/{lang:docslang}/offline-install", (string lang) => Results.Redirect($"/{lang}/installation#offline", permanent: true));

var feed = app.Services.GetRequiredService<NuGetFeed>();
feed.Map(app);
app.Logger.LogInformation("NuGet feed: {Folder} ({Count} packages)", feed.Folder, feed.Packages().Count);

// "/" → the reader's language: saved choice (cookie), then Accept-Language, then the default.
app.MapGet("/", (HttpContext context) =>
{
    var saved = context.Request.Cookies[$"{docs.Storage}-lang"];
    var lang = docs.Languages.FirstOrDefault(l => string.Equals(l, saved, StringComparison.OrdinalIgnoreCase))
        ?? context.Request.GetTypedHeaders().AcceptLanguage
            .OrderByDescending(h => h.Quality ?? 1)
            .Select(h => h.Value.Value?.Split('-')[0])
            .FirstOrDefault(l => l is not null && docs.Languages.Contains(l, StringComparer.OrdinalIgnoreCase))
        ?? docs.DefaultLanguage;
    return Results.Redirect($"/{lang.ToLowerInvariant()}/");
});

// Search index per language for the command palette: page titles, groups and headings.
app.MapGet("/{lang:docslang}/search-index.json", (string lang, DocsCatalog catalog, MarkdownRenderer renderer) =>
    Results.Json(catalog.Pages(lang).Select(p => new
    {
        slug = catalog.UrlFor(p),
        title = p.Title,
        group = SiteText.T(lang, p.Category is null ? $"group.{p.Group}" : $"category.{p.Category}"),
        summary = p.Summary,
        headings = renderer.Render(p).Headings.Select(h => new { id = h.Id, text = h.Text, level = h.Level }),
    })));

// Version 1 addresses had no language prefix: send them to the default language (old Indonesian slugs map to the new names).
app.MapGet("/{slug:regex(^[a-z0-9-]+$)}", (string slug, DocsCatalog catalog) =>
{
    var target = LegacySlugs.Map.GetValueOrDefault(slug, slug);
    var lang = LegacySlugs.Map.ContainsKey(slug) ? "id" : docs.DefaultLanguage;
    return catalog.Find(lang, target) is { } page ? Results.Redirect(catalog.UrlFor(page), permanent: true) : Results.NotFound();
}).WithOrder(1000); // after the Razor pages: "/en/" must reach the documentation page, not this fallback

app.Run();

/// <summary>Route constraint: the first path segment is one of the configured documentation languages.</summary>
sealed class DocsLanguageConstraint(IOptions<DocsOptions> options) : IRouteConstraint
{
    public bool Match(HttpContext? httpContext, IRouter? route, string routeKey, RouteValueDictionary values, RouteDirection routeDirection) =>
        values.TryGetValue(routeKey, out var value) && value is string lang && options.Value.Languages.Contains(lang, StringComparer.OrdinalIgnoreCase);
}

/// <summary>Version 1 (Indonesian-only) slugs → version 2 slugs.</summary>
static class LegacySlugs
{
    public static readonly Dictionary<string, string> Map = new(StringComparer.OrdinalIgnoreCase)
    {
        ["aksesibilitas"] = "accessibility",
        ["alur-kerja"] = "workflows",
        ["bentuk-dan-elevasi"] = "shape-elevation",
        ["catatan-perubahan"] = "changelog",
        ["combobox-dan-tanggal"] = "combobox",
        ["dialog-dan-menu"] = "dialog",
        ["form"] = "form",
        ["ikon"] = "icons",
        ["instalasi"] = "installation",
        ["kartu-dan-data"] = "card",
        ["konten"] = "writing",
        ["motion"] = "motion",
        ["navigasi"] = "sidebar",
        ["notifikasi"] = "toast",
        ["pengantar"] = "introduction",
        ["perilaku-js"] = "javascript",
        ["persyaratan"] = "requirements",
        ["peta-asal-tps"] = "migration-v1",
        ["pola-halaman"] = "page-patterns",
        ["prinsip"] = "principles",
        ["razor-api"] = "razor-api",
        ["ruang-dan-tata-letak"] = "spacing-layout",
        ["status"] = "status",
        ["tabel"] = "data-table",
        ["tema"] = "theming",
        ["tipografi"] = "typography",
        ["token-referensi"] = "tokens",
        ["tombol"] = "button",
        ["umpan-balik"] = "alert",
        ["warna"] = "color",
        ["contoh-razor"] = "razor-demo",
    };
}
