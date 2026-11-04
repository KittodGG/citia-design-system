namespace Citia.DesignSystem.Localization;

static class FieldsStrings
{
    [System.Runtime.CompilerServices.ModuleInitializer]
    internal static void Register()
    {
        DsText.Add("en", new Dictionary<string, string>
        {
            ["fields.optional"] = "optional",
            ["fields.required"] = "required",
            ["fields.help"] = "More information",
            ["fields.clear"] = "Clear",
            ["fields.showPassword"] = "Show password",
            ["fields.search"] = "Search",
            ["fields.increase"] = "Increase",
            ["fields.decrease"] = "Decrease",
            ["fields.count"] = "{0} / {1}",
            ["fields.strength"] = "Password strength",
        });
        DsText.Add("id", new Dictionary<string, string>
        {
            ["fields.optional"] = "opsional",
            ["fields.required"] = "wajib",
            ["fields.help"] = "Informasi lebih lanjut",
            ["fields.clear"] = "Hapus isi",
            ["fields.showPassword"] = "Tampilkan kata sandi",
            ["fields.search"] = "Cari",
            ["fields.increase"] = "Tambah",
            ["fields.decrease"] = "Kurangi",
            ["fields.count"] = "{0} / {1}",
            ["fields.strength"] = "Kekuatan kata sandi",
        });
    }
}
