using Microsoft.AspNetCore.Http;

namespace Citia.DesignSystem.Ui;

/// <summary>Sidebar link. Every item has its own icon and keeps aria-label/title so the collapsed icon rail still names it.</summary>
/// <remarks>Badge is a short count or word (BadgeTone: "primary" or "error"); Disabled renders aria-disabled without a link target.</remarks>
public sealed record NavItem(string Label, string Href, string Icon, bool Active = false, string? Badge = null, string? BadgeTone = null, bool Disabled = false);

/// <summary>Sidebar group: a button with a chevron (aria-expanded) above a list of links. Key persists the open state.</summary>
public sealed record NavGroup(string Key, string Label, IReadOnlyList<NavItem> Items, bool DefaultOpen = true)
{
    public bool HasActive => Items.Any(i => i.Active);
}

/// <summary>Whole sidebar: ungrouped items on top, then groups, then trailing items (e.g. access status).</summary>
public sealed record NavModel(IReadOnlyList<NavItem> Top, IReadOnlyList<NavGroup> Groups, IReadOnlyList<NavItem>? Bottom = null, string? Label = null);

public static class NavActive
{
    /// <summary>True when the request path equals <paramref name="href"/> or sits below it (prefix match on a segment boundary).</summary>
    public static bool Matches(HttpContext context, string href, bool exact = false)
    {
        var path = (context.Request.PathBase + context.Request.Path).Value?.TrimEnd('/') ?? "";
        var target = href.Split('?', '#')[0].TrimEnd('/');
        if (string.IsNullOrEmpty(target)) return string.IsNullOrEmpty(path);
        if (string.Equals(path, target, StringComparison.OrdinalIgnoreCase)) return true;
        return !exact && path.StartsWith(target + "/", StringComparison.OrdinalIgnoreCase);
    }
}
