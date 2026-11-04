using System.Globalization;
using Citia.DesignSystem.Localization;

namespace Citia.DesignSystem.Formatting;

/// <summary>
/// Display formats. Machine-style numbers (<see cref="Number"/>, <see cref="Qty(decimal?)"/>) are culture-invariant: dot decimal, no
/// grouping, identical on screen, in exports and in XML. Human-style numbers (<see cref="Decimal"/>) and dates follow
/// <see cref="CultureInfo.CurrentCulture"/> (en: 1,574,782.5 · 25 Jan 2026 2:30 PM style; id: 1.574.782,5 · 25 Jan 2026 14.30).
/// Blanks are an en dash.
/// </summary>
public static class Fmt
{
    public static readonly CultureInfo Id = CultureInfo.GetCultureInfo("id-ID");
    static CultureInfo C => CultureInfo.CurrentCulture;
    public const string Dash = "–";

    /// <summary>Invariant number, at most 4 decimals, no grouping: 20.0400 → "20.04". Null → "".</summary>
    public static string Number(decimal? value) => value?.ToString("0.####", CultureInfo.InvariantCulture) ?? "";

    /// <summary>Quantity for display: like <see cref="Number"/>, en dash when null.</summary>
    public static string Qty(decimal? value) => value is null ? Dash : Number(value);

    /// <summary>Quantity with its unit: "1574782 TNE".</summary>
    public static string Qty(decimal? value, string? unit) => value is null ? Dash : string.IsNullOrWhiteSpace(unit) ? Number(value) : $"{Number(value)} {unit}";

    /// <summary>Human-readable number in the current culture with grouping: en 1,574,782.5 · id 1.574.782,5.</summary>
    public static string Decimal(decimal? value, int maxDecimals = 2) =>
        value?.ToString("#,0." + new string('#', Math.Max(0, maxDecimals)), C) ?? Dash;

    /// <summary>Signed difference, rounded to 4 decimals, never "-0": "+45220", "-746", "0".</summary>
    public static string Diff(decimal? value) =>
        value is null ? Dash : Math.Round(value.Value, 4).ToString("+0.####;-0.####;0", CultureInfo.InvariantCulture);

    /// <summary>Ratio as a percentage with a dot decimal: -0.00075 → "-0.075%".</summary>
    public static string Percent(decimal? ratio, int decimals = 3) =>
        ratio is null ? Dash : Math.Round(ratio.Value * 100, decimals).ToString("0." + new string('#', decimals), CultureInfo.InvariantCulture) + "%";

    /// <summary>Parses user input with a dot decimal and no grouping ("20.040" → 20.04; "1,574,782" → false).</summary>
    public static bool TryParseNumber(string? text, out decimal value) =>
        decimal.TryParse(text?.Trim(), NumberStyles.AllowLeadingSign | NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out value);

    /// <summary>"25 Jan 2026" with month names of the current culture (id: Jan Feb Mar Apr Mei Jun Jul Agu Sep Okt Nov Des).</summary>
    public static string Date(DateOnly? date) => date?.ToString("dd MMM yyyy", C) ?? Dash;

    public static string Date(DateTime? date) => date?.ToString("dd MMM yyyy", C) ?? Dash;

    /// <summary>"01 Nov 2026 14:30" (en) / "01 Nov 2026 14.30" (id): 24-hour clock, the culture's time separator.</summary>
    public static string DateTime(DateTime? value) => value?.ToString("dd MMM yyyy HH:mm", C) ?? Dash;

    /// <summary>"25 Jan 2026 14:30:05" (en) / "25 Jan 2026 14.30.05" (id).</summary>
    public static string DateTimeSeconds(DateTime? value) => value?.ToString("dd MMM yyyy HH:mm:ss", C) ?? Dash;

    /// <summary>A UTC instant shown in a time zone with an optional label: InZone(utc, zone, "WIB") → "01 Nov 2026 21:30 WIB".</summary>
    public static string InZone(DateTime? utc, TimeZoneInfo zone, string? label = null, bool seconds = false)
    {
        if (utc is null) return Dash;
        var local = TimeZoneInfo.ConvertTimeFromUtc(System.DateTime.SpecifyKind(utc.Value, DateTimeKind.Utc), zone);
        var text = seconds ? DateTimeSeconds(local) : DateTime(local);
        return string.IsNullOrEmpty(label) ? text : $"{text} {label}";
    }

    /// <summary>Blank text as an en dash.</summary>
    public static string Text(string? value) => string.IsNullOrWhiteSpace(value) ? Dash : value;

    /// <summary>Range line of a pager: "1–20 of 57 items" (en) / "1–20 dari 57 data" (id). Noun defaults to the localized "items".</summary>
    public static string Range(int from, int to, int total, string? noun = null)
    {
        noun ??= DsText.T("noun.items");
        return total == 0 ? DsText.T("range.empty", noun) : DsText.T("range.text", from, to, total, noun);
    }
}

/// <summary>Western Indonesia Time (UTC+7, no daylight saving) convenience helper. For other zones use <see cref="Fmt.InZone"/>.</summary>
public static class Wib
{
    public static readonly TimeSpan Offset = TimeSpan.FromHours(7);

    public static DateTime FromUtc(DateTime utc) => DateTime.SpecifyKind(utc, DateTimeKind.Utc).Add(Offset);

    public static DateTime ToUtc(DateTime wib) => DateTime.SpecifyKind(wib - Offset, DateTimeKind.Utc);

    public static DateTime Now => FromUtc(System.DateTime.UtcNow);

    public static DateOnly Today => DateOnly.FromDateTime(Now);

    /// <summary>"01 Nov 2026 14.30 WIB" from a UTC value.</summary>
    public static string Format(DateTime? utc, bool seconds = false) =>
        utc is null ? Fmt.Dash : $"{(seconds ? Fmt.DateTimeSeconds(FromUtc(utc.Value)) : Fmt.DateTime(FromUtc(utc.Value)))} WIB";
}
