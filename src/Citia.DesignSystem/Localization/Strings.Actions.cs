namespace Citia.DesignSystem.Localization;

static class ActionsStrings
{
    [System.Runtime.CompilerServices.ModuleInitializer]
    internal static void Register()
    {
        DsText.Add("en", new Dictionary<string, string>
        {
            ["actions.newTab"] = "(opens in a new tab)",
            ["actions.more"] = "More options",
            ["actions.loading"] = "Loading…",
            ["actions.done"] = "Done",
            ["actions.unavailable"] = "Not available",
        });
        DsText.Add("id", new Dictionary<string, string>
        {
            ["actions.newTab"] = "(dibuka di tab baru)",
            ["actions.more"] = "Pilihan lainnya",
            ["actions.loading"] = "Memuat…",
            ["actions.done"] = "Selesai",
            ["actions.unavailable"] = "Tidak tersedia",
        });
    }
}
