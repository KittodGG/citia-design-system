namespace Citia.DesignSystem.Localization;

static class LayoutStrings
{
    [System.Runtime.CompilerServices.ModuleInitializer]
    internal static void Register()
    {
        DsText.Add("en", new Dictionary<string, string>
        {
            ["layout.skip"] = "Skip to main content",
            ["layout.openNav"] = "Open navigation",
            ["layout.closeNav"] = "Close navigation",
            ["layout.collapseSidebar"] = "Collapse sidebar",
            ["layout.expandSidebar"] = "Expand sidebar",
            ["toolbar.label"] = "Toolbar",
            ["toolbar.more"] = "More actions",
            ["resizable.handle"] = "Resize panels",
        });
        DsText.Add("id", new Dictionary<string, string>
        {
            ["layout.skip"] = "Lewati ke konten utama",
            ["layout.openNav"] = "Buka navigasi",
            ["layout.closeNav"] = "Tutup navigasi",
            ["layout.collapseSidebar"] = "Ringkas sidebar",
            ["layout.expandSidebar"] = "Perluas sidebar",
            ["toolbar.label"] = "Bilah alat",
            ["toolbar.more"] = "Aksi lainnya",
            ["resizable.handle"] = "Ubah ukuran panel",
        });
    }
}
