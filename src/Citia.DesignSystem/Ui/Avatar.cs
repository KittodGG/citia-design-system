namespace Citia.DesignSystem.Ui;

/// <summary>Initials avatar: up to two letters on one of eight colours picked by a stable hash (origin: TPS Helpers/PortalUi.cs).</summary>
public static class Avatar
{
    /// <summary>"PT Akr Corporindo" → "PA"; "AKR1" → "AK"; empty → "?".</summary>
    public static string Initials(string? text)
    {
        var words = (text ?? "").Split([' ', '.', '-', '_', '@'], StringSplitOptions.RemoveEmptyEntries)
            .Where(w => char.IsLetterOrDigit(w[0])).ToArray();
        if (words.Length == 0) return "?";
        if (words.Length == 1) return words[0].Length >= 2 ? words[0][..2].ToUpperInvariant() : words[0].ToUpperInvariant();
        return string.Concat(words[0][0], words[1][0]).ToUpperInvariant();
    }

    /// <summary>Colour class c0–c7: sum of the character codes modulo 8, so a name always gets the same colour.</summary>
    public static string ColorClass(string? text) => "c" + (text ?? "").Sum(c => c) % 8;
}
