namespace Citia.DesignSystem.Ui;

/// <summary>
/// Semantic tone shared by pill, tag, KPI, note, banner, toast, feed and progress. The word on screen carries the meaning;
/// the tone only supports it (WCAG 1.4.1).
/// </summary>
public enum Tone
{
    Neutral,
    Primary,
    Info,
    Success,
    Warning,
    Error,
}

public static class ToneExtensions
{
    /// <summary>CSS modifier class: <c>is-success</c>, <c>is-warning</c>, ...</summary>
    public static string Css(this Tone tone) => tone switch
    {
        Tone.Primary => "is-primary",
        Tone.Info => "is-info",
        Tone.Success => "is-success",
        Tone.Warning => "is-warning",
        Tone.Error => "is-error",
        _ => "is-neutral",
    };

    /// <summary>Toast/alert tone name used by ds.js (success, info, warning, error). Neutral and Primary map to info.</summary>
    public static string ToastName(this Tone tone) => tone switch
    {
        Tone.Success => "success",
        Tone.Warning => "warning",
        Tone.Error => "error",
        _ => "info",
    };

    /// <summary>Icon that matches the tone in toasts, notes and banners.</summary>
    public static string IconName(this Tone tone) => tone switch
    {
        Tone.Success => "check-circle",
        Tone.Warning => "alert",
        Tone.Error => "x-circle",
        _ => "info",
    };
}
