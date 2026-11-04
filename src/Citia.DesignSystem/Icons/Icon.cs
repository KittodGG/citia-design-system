using System.Net;
using System.Text;
using Microsoft.AspNetCore.Html;

namespace Citia.DesignSystem.Icons;

/// <summary>
/// Inline SVG icon set (24 px grid, 2 px stroke, currentColor, round caps), generated from wwwroot/icons/icons.json (see NOTICE.md).
/// Decorative by default (aria-hidden). Pass a label only when the icon is the sole content of a control
/// that has no other accessible name; normally the control carries aria-label or visible text.
/// Razor: <c>@Icon.Svg("ship")</c> or the tag helper <c>&lt;ds-icon name="ship" /&gt;</c>.
/// </summary>
public static class Icon
{
    /// <summary>Renders one icon. Unknown names throw, so a typo fails in development instead of rendering nothing.</summary>
    public static IHtmlContent Svg(string name, string css = "ds-icon", string? label = null)
    {
        if (!IconSet.Paths.TryGetValue(name, out var body))
            throw new ArgumentException($"Unknown icon '{name}'. See Icon.Names.", nameof(name));
        var a11y = label is null ? "aria-hidden=\"true\"" : $"role=\"img\" aria-label=\"{WebUtility.HtmlEncode(label)}\"";
        return new HtmlString(
            "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" " +
            $"stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"{WebUtility.HtmlEncode(css)}\" {a11y} focusable=\"false\">{body}</svg>");
    }

    /// <summary>
    /// The whole set as a hidden SVG sprite (&lt;symbol id="ds-icon-NAME"&gt;). Render once per page (partial _DsIconSprite),
    /// then reference icons with &lt;svg class="ds-icon"&gt;&lt;use href="#ds-icon-NAME"/&gt;&lt;/svg&gt;.
    /// </summary>
    public static IHtmlContent Sprite()
    {
        var sb = new StringBuilder("<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" style=\"position:absolute;width:0;height:0;overflow:hidden\">");
        foreach (var (name, body) in IconSet.Paths)
            sb.Append($"<symbol id=\"ds-icon-{name}\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">{body}</symbol>");
        return new HtmlString(sb.Append("</svg>").ToString());
    }

    /// <summary>All icon names, in source order.</summary>
    public static IEnumerable<string> Names => IconSet.Paths.Keys;

    public static bool Exists(string name) => IconSet.Paths.ContainsKey(name);
}
