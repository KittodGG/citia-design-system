namespace Citia.DesignSystem.Localization;

/// <summary>Strings of the date, time, color, file upload and form tag helpers (batch A4). Keys start with <c>forms.</c>.</summary>
static class FormsStrings
{
    [System.Runtime.CompilerServices.ModuleInitializer]
    internal static void Register()
    {
        DsText.Add("en", new Dictionary<string, string>
        {
            ["forms.summary.title"] = "Fix the highlighted fields",
            ["forms.summary.one"] = "1 field needs your attention.",
            ["forms.summary.many"] = "{0} fields need your attention.",
            ["forms.range.legend"] = "Period",
            ["forms.range.start"] = "Start date",
            ["forms.range.end"] = "End date",
            ["forms.upload.browse"] = "Choose files",
            ["forms.upload.browseOne"] = "Choose a file",
            ["forms.upload.drag"] = " or drag them here",
            ["forms.upload.dragOne"] = " or drag it here",
            ["forms.upload.hint"] = "{0}, up to {1} each",
            ["forms.upload.hintOne"] = "{0}, up to {1}",
            ["forms.upload.hintSize"] = "Up to {0} each",
            ["forms.upload.hintSizeOne"] = "Up to {0}",
            ["forms.upload.list"] = "Selected files",
            ["forms.upload.images"] = "images",
            ["forms.avatar.change"] = "Change photo",
            ["forms.avatar.choose"] = "Upload photo",
            ["forms.avatar.remove"] = "Remove",
            ["forms.avatar.title"] = "Photo",
            ["forms.avatar.hint"] = "JPG, PNG or WebP, square, up to {0}.",
            ["forms.bar.unsaved"] = "Unsaved changes",
        });
        DsText.Add("id", new Dictionary<string, string>
        {
            ["forms.summary.title"] = "Perbaiki isian yang ditandai",
            ["forms.summary.one"] = "1 isian perlu diperbaiki.",
            ["forms.summary.many"] = "{0} isian perlu diperbaiki.",
            ["forms.range.legend"] = "Periode",
            ["forms.range.start"] = "Tanggal mulai",
            ["forms.range.end"] = "Tanggal selesai",
            ["forms.upload.browse"] = "Pilih file",
            ["forms.upload.browseOne"] = "Pilih file",
            ["forms.upload.drag"] = " atau seret ke sini",
            ["forms.upload.dragOne"] = " atau seret ke sini",
            ["forms.upload.hint"] = "{0}, maksimal {1} per file",
            ["forms.upload.hintOne"] = "{0}, maksimal {1}",
            ["forms.upload.hintSize"] = "Maksimal {0} per file",
            ["forms.upload.hintSizeOne"] = "Maksimal {0}",
            ["forms.upload.list"] = "File terpilih",
            ["forms.upload.images"] = "gambar",
            ["forms.avatar.change"] = "Ganti foto",
            ["forms.avatar.choose"] = "Unggah foto",
            ["forms.avatar.remove"] = "Hapus",
            ["forms.avatar.title"] = "Foto",
            ["forms.avatar.hint"] = "JPG, PNG, atau WebP, persegi, maksimal {0}.",
            ["forms.bar.unsaved"] = "Ada perubahan yang belum disimpan",
        });
    }
}
