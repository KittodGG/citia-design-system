namespace Citia.DesignSystem.Localization;

/// <summary>Strings for dialogs, sheets, popovers, menus and the command palette (tag helpers and partials).</summary>
static class OverlaysStrings
{
    [System.Runtime.CompilerServices.ModuleInitializer]
    internal static void Register()
    {
        DsText.Add("en", new Dictionary<string, string>
        {
            ["dialog.close"] = "Close",
            ["dialog.cancel"] = "Cancel",
            ["sheet.close"] = "Close",
            ["sheet.handle"] = "Resize or close the panel",
            ["sheet.handleClose"] = "Close the panel",
            ["popover.close"] = "Close",
            ["menu.more"] = "More actions",
            ["command.label"] = "Command palette",
            ["command.placeholder"] = "Type a command or search",
            ["command.results"] = "Results",
            ["command.noResults"] = "No results",
            ["command.noResultsFor"] = "No results for",
            ["command.noResultsHint"] = "Check the spelling or search for a shorter word.",
            ["command.loading"] = "Searching",
            ["command.navigate"] = "to move",
            ["command.select"] = "to open",
            ["command.close"] = "to close",
        });
        DsText.Add("id", new Dictionary<string, string>
        {
            ["dialog.close"] = "Tutup",
            ["dialog.cancel"] = "Batal",
            ["sheet.close"] = "Tutup",
            ["sheet.handle"] = "Ubah ukuran atau tutup panel",
            ["sheet.handleClose"] = "Tutup panel",
            ["popover.close"] = "Tutup",
            ["menu.more"] = "Aksi lainnya",
            ["command.label"] = "Palet perintah",
            ["command.placeholder"] = "Ketik perintah atau cari",
            ["command.results"] = "Hasil",
            ["command.noResults"] = "Tidak ada hasil",
            ["command.noResultsFor"] = "Tidak ada hasil untuk",
            ["command.noResultsHint"] = "Periksa ejaan atau cari dengan kata yang lebih pendek.",
            ["command.loading"] = "Mencari",
            ["command.navigate"] = "untuk berpindah",
            ["command.select"] = "untuk membuka",
            ["command.close"] = "untuk menutup",
        });
    }
}
