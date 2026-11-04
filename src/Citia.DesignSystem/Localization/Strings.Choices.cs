namespace Citia.DesignSystem.Localization;

/// <summary>Strings for the choice tag helpers (checkbox, switch, radio group, slider, rating, OTP, tags input).</summary>
static class ChoiceStrings
{
    [System.Runtime.CompilerServices.ModuleInitializer]
    internal static void Register()
    {
        DsText.Add("en", new Dictionary<string, string>
        {
            ["rating.star"] = "1 star",
            ["rating.stars"] = "{0} stars",
            ["rating.value"] = "Rated {0} out of {1}",
            ["rating.count"] = "{0} reviews",
            ["rating.countOne"] = "1 review",
            ["slider.minOf"] = "{0}, minimum",
            ["slider.maxOf"] = "{0}, maximum",
            ["slider.range"] = "{0} to {1}",
            ["otp.label"] = "Verification code",
            ["otp.hint"] = "Enter the {0}-character code.",
        });
        DsText.Add("id", new Dictionary<string, string>
        {
            ["rating.star"] = "1 bintang",
            ["rating.stars"] = "{0} bintang",
            ["rating.value"] = "Rating {0} dari {1}",
            ["rating.count"] = "{0} ulasan",
            ["rating.countOne"] = "1 ulasan",
            ["slider.minOf"] = "{0}, minimum",
            ["slider.maxOf"] = "{0}, maksimum",
            ["slider.range"] = "{0} sampai {1}",
            ["otp.label"] = "Kode verifikasi",
            ["otp.hint"] = "Masukkan kode {0} karakter.",
        });
    }
}
