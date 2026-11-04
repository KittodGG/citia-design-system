namespace Citia.DesignSystem.Localization;

static class MediaStrings
{
    [System.Runtime.CompilerServices.ModuleInitializer]
    internal static void Register()
    {
        DsText.Add("en", new Dictionary<string, string>
        {
            ["media.loading"] = "Loading…",
            ["media.progress"] = "Progress",
            ["media.progress.step"] = "{0} of {1} steps complete",
            ["media.trend"] = "Trend",
            ["media.carousel"] = "Carousel",
            ["media.image.unavailable"] = "Image unavailable",
            ["media.chart.loading"] = "Loading chart…",
            ["media.chart.empty"] = "No data to chart yet",
            ["media.chart.error"] = "The chart could not be loaded",
            ["media.chart.table"] = "View data as a table",
            ["media.chart.retry"] = "Try again",
        });
        DsText.Add("id", new Dictionary<string, string>
        {
            ["media.loading"] = "Memuat…",
            ["media.progress"] = "Kemajuan",
            ["media.progress.step"] = "{0} dari {1} langkah selesai",
            ["media.trend"] = "Tren",
            ["media.carousel"] = "Carousel",
            ["media.image.unavailable"] = "Gambar tidak tersedia",
            ["media.chart.loading"] = "Memuat grafik…",
            ["media.chart.empty"] = "Belum ada data untuk grafik",
            ["media.chart.error"] = "Grafik tidak dapat dimuat",
            ["media.chart.table"] = "Lihat data sebagai tabel",
            ["media.chart.retry"] = "Coba lagi",
        });
    }
}
