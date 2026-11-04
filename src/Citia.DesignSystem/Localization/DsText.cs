using System.Collections.Concurrent;
using System.Globalization;
using System.Runtime.CompilerServices;

namespace Citia.DesignSystem.Localization;

/// <summary>
/// UI strings of the design system (partials, tag helpers, formatters). The language follows
/// <see cref="CultureInfo.CurrentUICulture"/> (set it with ASP.NET Core request localization); English is the fallback.
/// English and Indonesian ship with the library; add another language with <see cref="Add"/> at startup:
/// <code>DsText.Add("ms", new Dictionary&lt;string, string&gt; { ["pager.next"] = "Seterusnya" });</code>
/// Each feature registers its own strings in a <c>Strings.*.cs</c> file through a module initializer.
/// </summary>
public static class DsText
{
    static readonly ConcurrentDictionary<string, ConcurrentDictionary<string, string>> Tables = new(StringComparer.OrdinalIgnoreCase);

    /// <summary>Add or replace strings for a language (two-letter ISO code).</summary>
    public static void Add(string language, IEnumerable<KeyValuePair<string, string>> entries)
    {
        var table = Tables.GetOrAdd(language, _ => new ConcurrentDictionary<string, string>(StringComparer.Ordinal));
        foreach (var (key, value) in entries) table[key] = value;
    }

    /// <summary>Two-letter language of the current request, or "en" when no strings exist for it.</summary>
    public static string Language
    {
        get
        {
            var lang = CultureInfo.CurrentUICulture.TwoLetterISOLanguageName;
            return Tables.ContainsKey(lang) ? lang : "en";
        }
    }

    /// <summary>Translated string; positional placeholders {0}, {1} use the current culture. Missing keys fall back to English, then to the key.</summary>
    public static string T(string key, params object?[] args)
    {
        var template = (Tables.TryGetValue(Language, out var table) && table.TryGetValue(key, out var value)) ? value
            : (Tables.TryGetValue("en", out var en) && en.TryGetValue(key, out var fallback)) ? fallback
            : key;
        return args.Length == 0 ? template : string.Format(CultureInfo.CurrentCulture, template, args);
    }
}

static class CoreStrings
{
    [ModuleInitializer]
    internal static void Register()
    {
        DsText.Add("en", new Dictionary<string, string>
        {
            ["skip"] = "Skip to content",
            ["nav.label"] = "Main navigation",
            ["pager.label"] = "Pagination",
            ["pager.previous"] = "Previous",
            ["pager.next"] = "Next",
            ["pager.page"] = "Page {0} of {1}",
            ["range.text"] = "{0}–{1} of {2} {3}",
            ["range.empty"] = "0 {0}",
            ["noun.items"] = "items",
            ["sort.asc"] = "Sort ascending",
            ["sort.desc"] = "Sort descending",
            ["pageSize.show"] = "Show",
            ["pageSize.perPage"] = "per page",
            ["pageSize.label"] = "Rows per page",
            ["toast.close"] = "Close notification",
            ["confirm.title"] = "Continue?",
            ["confirm.cancel"] = "Cancel",
            ["confirm.accept"] = "Delete",
            ["leave.title"] = "Unsaved changes",
            ["leave.text"] = "Leave without saving? What you entered on this page will be lost.",
            ["leave.stay"] = "Stay on page",
            ["leave.go"] = "Leave",
            ["empty.dash"] = "–",
        });
        DsText.Add("id", new Dictionary<string, string>
        {
            ["skip"] = "Lewati ke konten",
            ["nav.label"] = "Navigasi utama",
            ["pager.label"] = "Halaman daftar",
            ["pager.previous"] = "Sebelumnya",
            ["pager.next"] = "Berikutnya",
            ["pager.page"] = "Halaman {0} / {1}",
            ["range.text"] = "{0}–{1} dari {2} {3}",
            ["range.empty"] = "0 {0}",
            ["noun.items"] = "data",
            ["sort.asc"] = "Urutkan naik",
            ["sort.desc"] = "Urutkan turun",
            ["pageSize.show"] = "Tampilkan",
            ["pageSize.perPage"] = "data per halaman",
            ["pageSize.label"] = "Data per halaman",
            ["toast.close"] = "Tutup notifikasi",
            ["confirm.title"] = "Lanjutkan?",
            ["confirm.cancel"] = "Batal",
            ["confirm.accept"] = "Hapus",
            ["leave.title"] = "Perubahan belum disimpan",
            ["leave.text"] = "Keluar tanpa menyimpan? Isian di halaman ini akan hilang.",
            ["leave.stay"] = "Tetap di halaman",
            ["leave.go"] = "Keluar",
            ["empty.dash"] = "–",
        });
    }
}
