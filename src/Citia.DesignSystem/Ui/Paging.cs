using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Primitives;

namespace Citia.DesignSystem.Ui;

/// <summary>
/// Sort state of a list. The key always comes from a fixed allowlist per table (never from the request as SQL), so a column name in
/// the URL cannot reach the query. Unknown keys fall back to the default order.
/// </summary>
public sealed record ListSort(string Key, bool Descending, bool Chosen)
{
    public string Direction => Descending ? "desc" : "asc";

    public static ListSort Parse(string? sort, string? direction, IReadOnlyCollection<string> allowed, string defaultKey, bool defaultDescending = false)
    {
        if (string.IsNullOrWhiteSpace(sort) || !allowed.Contains(sort, StringComparer.OrdinalIgnoreCase))
            return new ListSort(defaultKey, defaultDescending, false);
        var key = allowed.First(a => string.Equals(a, sort, StringComparison.OrdinalIgnoreCase));
        return new ListSort(key, string.Equals(direction, "desc", StringComparison.OrdinalIgnoreCase), true);
    }
}

/// <summary>Page sizes offered in lists. Default 10.</summary>
public static class PageSizes
{
    public static readonly IReadOnlyList<int> All = [10, 20, 50, 100];

    public static int Normalize(int? size, int fallback = 10) => size is int s && All.Contains(s) ? s : fallback;
}

/// <summary>A filtered, sorted, paged slice of rows. Page numbers start at 1.</summary>
public sealed record ListPage<T>(IReadOnlyList<T> Rows, string? Query, int Page, int PageSize, int Total, ListSort Sort)
{
    public int PageCount => Math.Max(1, (int)Math.Ceiling(Total / (double)Math.Max(1, PageSize)));
    public int From => Total == 0 ? 0 : (Page - 1) * PageSize + 1;
    public int To => Math.Min(Total, Page * PageSize);
    public PagerModel Pager(string? noun = null) => new(Page, PageCount, Total, From, To, noun);
}

/// <summary>Model of the partial _DsPager: range text left, previous / page / next right.</summary>
public sealed record PagerModel(int Page, int PageCount, int Total, int From, int To, string? Noun = null);

/// <summary>Model of the partial _DsSortHeader (one sortable column header).</summary>
public sealed record SortHeaderModel(string Label, string Key, ListSort Current, bool Numeric = false, string? Class = null)
{
    public bool Active => Current.Chosen && string.Equals(Current.Key, Key, StringComparison.OrdinalIgnoreCase);

    /// <summary>First click ascending, second click on the same column descending.</summary>
    public string NextDirection => Active && !Current.Descending ? "desc" : "asc";

    public string? AriaSort => Active ? (Current.Descending ? "descending" : "ascending") : null;
}

/// <summary>Builds same-page URLs that keep the current query (search, filters, size) and change a few keys.</summary>
public static class QueryUrl
{
    public static string With(HttpRequest request, params (string Key, string? Value)[] changes)
    {
        var query = request.Query.ToDictionary(p => p.Key, p => p.Value, StringComparer.OrdinalIgnoreCase);
        foreach (var (key, value) in changes)
        {
            if (string.IsNullOrEmpty(value)) query.Remove(key);
            else query[key] = new StringValues(value);
        }
        var path = $"{request.PathBase}{request.Path}";
        return query.Count == 0 ? path : QueryHelpers.AddQueryString(path, query);
    }
}
