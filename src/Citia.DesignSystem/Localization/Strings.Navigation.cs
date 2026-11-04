namespace Citia.DesignSystem.Localization;

/// <summary>Strings of the navigation family: tabs, breadcrumb, pagination, theme switcher, language switcher.</summary>
static class NavigationStrings
{
    [System.Runtime.CompilerServices.ModuleInitializer]
    internal static void Register()
    {
        DsText.Add("en", new Dictionary<string, string>
        {
            ["breadcrumb.label"] = "Breadcrumb",
            ["breadcrumb.more"] = "Show hidden levels",
            ["pagination.label"] = "Pagination",
            ["pagination.previous"] = "Previous",
            ["pagination.next"] = "Next",
            ["pagination.first"] = "First page",
            ["pagination.last"] = "Last page",
            ["pagination.goto"] = "Go to page {0}",
            ["pagination.current"] = "Page {0}",
            ["pagination.ellipsis"] = "More pages",
            ["pagination.summary"] = "Page {0} of {1}",
            ["theme.label"] = "Theme",
            ["theme.light"] = "Light",
            ["theme.dark"] = "Dark",
            ["theme.system"] = "System",
            ["theme.toLight"] = "Switch to light theme",
            ["theme.toDark"] = "Switch to dark theme",
            ["language.label"] = "Language",
            ["language.name.en"] = "English",
            ["language.name.id"] = "Bahasa Indonesia",
            ["navbar.open"] = "Open menu",
            ["navbar.close"] = "Close menu",
            ["tabs.scrollStart"] = "Show earlier tabs",
            ["tabs.scrollEnd"] = "Show later tabs",
        });
        DsText.Add("id", new Dictionary<string, string>
        {
            ["breadcrumb.label"] = "Jejak halaman",
            ["breadcrumb.more"] = "Tampilkan tingkat tersembunyi",
            ["pagination.label"] = "Penomoran halaman",
            ["pagination.previous"] = "Sebelumnya",
            ["pagination.next"] = "Berikutnya",
            ["pagination.first"] = "Halaman pertama",
            ["pagination.last"] = "Halaman terakhir",
            ["pagination.goto"] = "Ke halaman {0}",
            ["pagination.current"] = "Halaman {0}",
            ["pagination.ellipsis"] = "Halaman lainnya",
            ["pagination.summary"] = "Halaman {0} dari {1}",
            ["theme.label"] = "Tema",
            ["theme.light"] = "Terang",
            ["theme.dark"] = "Gelap",
            ["theme.system"] = "Sistem",
            ["theme.toLight"] = "Aktifkan tema terang",
            ["theme.toDark"] = "Aktifkan tema gelap",
            ["language.label"] = "Bahasa",
            ["language.name.en"] = "English",
            ["language.name.id"] = "Bahasa Indonesia",
            ["navbar.open"] = "Buka menu",
            ["navbar.close"] = "Tutup menu",
            ["tabs.scrollStart"] = "Tampilkan tab sebelumnya",
            ["tabs.scrollEnd"] = "Tampilkan tab berikutnya",
        });
    }
}
