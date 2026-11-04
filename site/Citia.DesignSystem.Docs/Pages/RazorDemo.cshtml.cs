using Citia.DesignSystem.Docs.Docs;
using Citia.DesignSystem.Ui;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Citia.DesignSystem.Docs.Pages;

/// <summary>Live example: an in-memory project list sorted, searched and paged with the DS helpers, as a real app would.</summary>
public sealed class RazorDemoModel : PageModel
{
    public sealed record ProjectRow(int Id, string Code, string Name, string Owner, decimal? Budget, bool Active, DateTime UpdatedUtc);

    static readonly string[] Sortable = ["code", "name", "budget"];

    static readonly ProjectRow[] Data =
    [
        new(1, "PRJ-1024", "Warehouse expansion", "Ayu Lestari", 1574782m, true, new DateTime(2026, 10, 30, 7, 30, 0, DateTimeKind.Utc)),
        new(2, "PRJ-1031", "Customer portal", "Daniel Okafor", 992.5m, true, new DateTime(2026, 10, 29, 2, 5, 0, DateTimeKind.Utc)),
        new(3, "PRJ-0987", "Fleet telemetry", "Mei Tanaka", 20450m, false, new DateTime(2026, 10, 21, 9, 0, 0, DateTimeKind.Utc)),
        new(4, "PRJ-1040", "Invoice automation", "Rizky Pratama", null, true, new DateTime(2026, 10, 18, 4, 45, 0, DateTimeKind.Utc)),
        new(5, "PRJ-1002", "Quality audit 2026", "Sofia Marquez", 8200m, true, new DateTime(2026, 10, 12, 1, 15, 0, DateTimeKind.Utc)),
        new(6, "PRJ-1046", "Data platform migration", "Hannah Becker", 6400.25m, true, new DateTime(2026, 10, 2, 8, 0, 0, DateTimeKind.Utc)),
    ];

    public string Lang { get; private set; } = "en";
    public ListPage<ProjectRow> Rows { get; private set; } = default!;

    public string T(string key) => DemoText.T(Lang, key);

    public void OnGet(string lang, string? q, string? sort, string? direction, int page = 1, int? size = null)
    {
        Lang = lang.ToLowerInvariant();
        var order = ListSort.Parse(sort, direction, Sortable, defaultKey: "code");
        var pageSize = PageSizes.Normalize(size, fallback: 10);
        IEnumerable<ProjectRow> rows = Data;
        if (!string.IsNullOrWhiteSpace(q))
            rows = rows.Where(r => r.Code.Contains(q, StringComparison.OrdinalIgnoreCase) || r.Name.Contains(q, StringComparison.OrdinalIgnoreCase));
        // Empty values last, id as the tie-breaker (DS sorting rule).
        rows = order.Key switch
        {
            "name" => order.Descending ? rows.OrderByDescending(r => r.Name) : rows.OrderBy(r => r.Name),
            "budget" => order.Descending ? rows.OrderBy(r => r.Budget is null).ThenByDescending(r => r.Budget) : rows.OrderBy(r => r.Budget is null).ThenBy(r => r.Budget),
            _ => order.Descending ? rows.OrderByDescending(r => r.Code) : rows.OrderBy(r => r.Code),
        };
        var list = rows.ToList();
        page = Math.Clamp(page, 1, Math.Max(1, (int)Math.Ceiling(list.Count / (double)pageSize)));
        Rows = new ListPage<ProjectRow>(list.Skip((page - 1) * pageSize).Take(pageSize).ToList(), q, page, pageSize, list.Count, order);
    }
}

/// <summary>Strings of the demo page only.</summary>
static class DemoText
{
    static readonly Dictionary<string, Dictionary<string, string>> Text = new()
    {
        ["en"] = new()
        {
            ["title"] = "Razor demo",
            ["lede"] = "This page is rendered on the server by ASP.NET Core with Citia.DesignSystem as is. Source:",
            ["icons"] = "Icons and status",
            ["table"] = "Table, sorting, paging",
            ["empty"] = "Empty state",
            ["nav"] = "Sidebar navigation",
            ["format"] = "Number and date formatting",
            ["search"] = "Search code or name",
            ["searchLabel"] = "Search projects",
            ["go"] = "Search",
            ["code"] = "Code", ["name"] = "Name", ["budget"] = "Budget", ["status"] = "Status",
            ["updated"] = "Updated",
            ["active"] = "Active", ["inactive"] = "Inactive",
            ["noun"] = "projects",
            ["sortHint"] = "Select a column title: ListSort.Parse accepts only keys from a fixed list, and QueryUrl.With keeps the search and the page size.",
            ["emptyTitle"] = "No projects yet",
            ["emptyAction"] = "New project",
            ["emptyText"] = "Projects you create appear here with their owner and budget.",
            ["call"] = "Call", ["result"] = "Result",
            ["approved"] = "Approved", ["pending"] = "Pending review", ["rejected"] = "Rejected", ["scheduled"] = "Scheduled", ["live"] = "Live",
            ["trial"] = "Trial", ["general"] = "General",
            ["overview"] = "Overview", ["work"] = "Work", ["projects"] = "Projects", ["tasks"] = "Tasks",
            ["admin"] = "Administration", ["users"] = "Users", ["settings"] = "Integrations",
        },
        ["id"] = new()
        {
            ["title"] = "Contoh Razor",
            ["lede"] = "Halaman ini dirender server oleh ASP.NET Core memakai Citia.DesignSystem apa adanya. Kode sumber:",
            ["icons"] = "Ikon dan status",
            ["table"] = "Tabel, urutan, paging",
            ["empty"] = "Empty state",
            ["nav"] = "Navigasi sidebar",
            ["format"] = "Format angka dan waktu",
            ["search"] = "Cari kode atau nama",
            ["searchLabel"] = "Cari proyek",
            ["go"] = "Cari",
            ["code"] = "Kode", ["name"] = "Nama", ["budget"] = "Anggaran", ["status"] = "Status",
            ["updated"] = "Diperbarui",
            ["active"] = "Aktif", ["inactive"] = "Nonaktif",
            ["noun"] = "proyek",
            ["sortHint"] = "Pilih judul kolom: ListSort.Parse hanya menerima kunci dari daftar tetap, lalu QueryUrl.With mempertahankan pencarian dan ukuran halaman.",
            ["emptyTitle"] = "Belum ada proyek",
            ["emptyAction"] = "Proyek baru",
            ["emptyText"] = "Proyek yang Anda buat tampil di sini beserta pemilik dan anggarannya.",
            ["call"] = "Panggilan", ["result"] = "Hasil",
            ["approved"] = "Disetujui", ["pending"] = "Menunggu tinjauan", ["rejected"] = "Ditolak", ["scheduled"] = "Terjadwal", ["live"] = "Tayang",
            ["trial"] = "Uji coba", ["general"] = "Umum",
            ["overview"] = "Ringkasan", ["work"] = "Pekerjaan", ["projects"] = "Proyek", ["tasks"] = "Tugas",
            ["admin"] = "Administrasi", ["users"] = "Pengguna", ["settings"] = "Integrasi",
        },
    };

    public static string T(string lang, string key) =>
        Text.TryGetValue(lang, out var table) && table.TryGetValue(key, out var v) ? v : Text["en"].GetValueOrDefault(key, key);
}
