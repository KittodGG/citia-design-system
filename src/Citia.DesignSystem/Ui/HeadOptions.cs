namespace Citia.DesignSystem.Ui;

/// <summary>
/// Model of the partial _DsHead. Stylesheet: the app's own Tailwind build (e.g. "~/css/app.css"), or null for the prebuilt
/// "~/_content/Citia.DesignSystem/css/ds.css". Light/Dark: daisyUI theme names. Storage: localStorage key prefix used by ds.js.
/// </summary>
public sealed record HeadOptions(string? Stylesheet = null, string Light = "light", string Dark = "dark", string Storage = "ds", bool PreloadFont = true);
