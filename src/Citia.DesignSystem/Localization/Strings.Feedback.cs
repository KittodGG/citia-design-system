namespace Citia.DesignSystem.Localization;

static class FeedbackStrings
{
    [System.Runtime.CompilerServices.ModuleInitializer]
    internal static void Register()
    {
        DsText.Add("en", new Dictionary<string, string>
        {
            ["toast.close"] = "Close notification",
            ["toast.region"] = "Notifications (Alt+T)",
            ["alert.dismiss"] = "Dismiss",
            ["banner.dismiss"] = "Dismiss banner",
            ["notif.label"] = "Notifications: {0} unread",
            ["notif.none"] = "Notifications",
            ["notif.markAllRead"] = "Mark all as read",
            ["notif.empty"] = "No notifications",
            ["notif.unread"] = "Unread: ",
            ["collapsible.more"] = "Show more",
            ["collapsible.less"] = "Show less",
            ["stepper.label"] = "Progress",
            ["stepper.step"] = "Step {0} of {1}",
            ["stepper.complete"] = "Completed: ",
            ["stepper.error"] = "Needs attention: ",
            ["stepper.disabled"] = "Unavailable: ",
            ["stepper.optional"] = "Optional",
        });
        DsText.Add("id", new Dictionary<string, string>
        {
            ["toast.close"] = "Tutup notifikasi",
            ["toast.region"] = "Notifikasi (Alt+T)",
            ["alert.dismiss"] = "Tutup",
            ["banner.dismiss"] = "Tutup banner",
            ["notif.label"] = "Notifikasi: {0} belum dibaca",
            ["notif.none"] = "Notifikasi",
            ["notif.markAllRead"] = "Tandai semua dibaca",
            ["notif.empty"] = "Belum ada notifikasi",
            ["notif.unread"] = "Belum dibaca: ",
            ["collapsible.more"] = "Tampilkan lebih banyak",
            ["collapsible.less"] = "Tampilkan lebih sedikit",
            ["stepper.label"] = "Progres",
            ["stepper.step"] = "Langkah {0} dari {1}",
            ["stepper.complete"] = "Selesai: ",
            ["stepper.error"] = "Perlu diperiksa: ",
            ["stepper.disabled"] = "Tidak tersedia: ",
            ["stepper.optional"] = "Opsional",
        });
    }
}
