using Citia.DesignSystem.Docs.Docs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Citia.DesignSystem.Docs.Pages;

public sealed class DocModel(DocsCatalog catalog, MarkdownRenderer renderer) : PageModel
{
    public string Lang { get; private set; } = "en";
    public DocPage Current { get; private set; } = default!;
    public RenderedDoc Doc { get; private set; } = default!;
    public DocPage? Previous { get; private set; }
    public DocPage? Next { get; private set; }

    public string Href(DocPage page) => catalog.UrlFor(page);

    public string T(string key, params object?[] args) => SiteText.T(Lang, key, args);

    /// <summary>Eyebrow above the title and in the pager: the component category when there is one, otherwise the group.</summary>
    public string Section(DocPage page) => T(page.Category is null ? $"group.{page.Group}" : $"category.{page.Category}");

    public IActionResult OnGet(string lang, string? slug)
    {
        Lang = lang.ToLowerInvariant();
        if (lang != Lang) return RedirectPermanent($"/{Lang}/{slug}");
        // The home page lives at "/{lang}/" only, so it has one address.
        if (!string.IsNullOrEmpty(slug) && string.Equals(slug, catalog.Options.HomeSlug, StringComparison.OrdinalIgnoreCase))
            return RedirectPermanent($"/{Lang}/");
        var page = catalog.Find(Lang, slug);
        if (page is null) return NotFound();
        if (page.Href is not null) return Redirect(page.Href);
        Current = page;
        Doc = renderer.Render(page);
        (Previous, Next) = catalog.Neighbours(page);
        return Page();
    }
}
