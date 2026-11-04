namespace Citia.DesignSystem.Localization;

static class DisplayStrings
{
    [System.Runtime.CompilerServices.ModuleInitializer]
    internal static void Register()
    {
        DsText.Add("en", new Dictionary<string, string>
        {
            ["avatar.more"] = "{0} more: {1}",
            ["avatar.presence.online"] = "online",
            ["avatar.presence.away"] = "away",
            ["avatar.presence.busy"] = "busy",
            ["avatar.presence.offline"] = "offline",
            ["badge.count"] = "{0} items",
            ["badge.one"] = "1 item",
            ["badge.overflow"] = "More than {0} items",
            ["chip.remove"] = "Remove {0}",
            ["stat.up"] = "Up {0}",
            ["stat.down"] = "Down {0}",
            ["stat.flat"] = "No change",
            ["dl.empty"] = "Not provided",
            ["card.loading"] = "Loading",
        });
        DsText.Add("id", new Dictionary<string, string>
        {
            ["avatar.more"] = "{0} lagi: {1}",
            ["avatar.presence.online"] = "daring",
            ["avatar.presence.away"] = "tidak di tempat",
            ["avatar.presence.busy"] = "sibuk",
            ["avatar.presence.offline"] = "luring",
            ["badge.count"] = "{0} item",
            ["badge.one"] = "1 item",
            ["badge.overflow"] = "Lebih dari {0} item",
            ["chip.remove"] = "Hapus {0}",
            ["stat.up"] = "Naik {0}",
            ["stat.down"] = "Turun {0}",
            ["stat.flat"] = "Tidak berubah",
            ["dl.empty"] = "Belum diisi",
            ["card.loading"] = "Memuat",
        });
    }
}
