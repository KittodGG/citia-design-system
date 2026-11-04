using System.Net;
using System.Text;
using System.Text.Json;
using Citia.DesignSystem.Icons;

namespace Citia.DesignSystem.Docs.Docs;

/// <summary>
/// Reads the generated token files shipped by the RCL (/_content/Citia.DesignSystem/tokens/*.json) through the web root file
/// provider, so development (static web assets) and published output (wwwroot/_content) behave the same.
/// </summary>
public sealed class TokenStore(IWebHostEnvironment env)
{
    JsonDocument? _tokens;
    JsonDocument? _contrast;

    public JsonElement Tokens => (_tokens ??= Load("tokens.json")).RootElement;
    public JsonElement Contrast => (_contrast ??= Load("contrast.json")).RootElement;

    JsonDocument Load(string name)
    {
        var file = env.WebRootFileProvider.GetFileInfo($"_content/Citia.DesignSystem/tokens/{name}");
        if (!file.Exists) throw new FileNotFoundException($"Token file not found: {name}. Run: dotnet run tools/tokens.cs");
        using var stream = file.CreateReadStream();
        return JsonDocument.Parse(stream);
    }
}

/// <summary>
/// ```ds-* fences in the Markdown: visual references generated from the live tokens. Swatches paint each half with
/// data-theme="…", so the colour shown is the real CSS variable of that theme, not a copied hex value.
/// </summary>
public sealed class Directives(TokenStore store)
{
    static string E(string? s) => WebUtility.HtmlEncode(s ?? "");

    string _lang = "en";

    string L(string key, params object?[] args) => E(SiteText.T(_lang, key, args));

    /// <summary>Descriptions are {"en": "...", "id": "..."}; older files used a plain string.</summary>
    string Text(JsonElement node) => node.ValueKind switch
    {
        JsonValueKind.String => node.GetString() ?? "",
        JsonValueKind.Object => node.TryGetProperty(_lang, out var v) && v.GetString() is { Length: > 0 } text ? text
            : node.TryGetProperty("en", out var en) ? en.GetString() ?? "" : "",
        _ => "",
    };

    string Text(JsonElement parent, string property) => parent.TryGetProperty(property, out var v) ? Text(v) : "";

    public string Render(string name, string args, string body, string lang = "en")
    {
        lock (this)
        {
            _lang = lang;
            return name switch
            {
                "ds-swatches" => Swatches(args),
                "ds-palette" => Palette(),
                "ds-contrast" => Contrast(),
                "ds-type-scale" => TypeScale(),
                "ds-spacing" => Spacing(),
                "ds-radius" => Radius(),
                "ds-shadows" => Shadows(),
                "ds-motion" => Motion(),
                "ds-icons" => Icons(),
                "ds-tokens" => StaticTable(args.Length > 0 ? args : body.Trim()),
                _ => $"<p class=\"docs-callout is-warning\">{L("directive.unknown")}: <code>{E(name)}</code></p>",
            };
        }
    }

    (string Light, string Dark, JsonElement LightTheme, JsonElement DarkTheme) Themes()
    {
        var t = store.Tokens;
        var light = t.GetProperty("defaultTheme").GetString()!;
        var dark = t.GetProperty("darkTheme").GetString() ?? light;
        var themes = t.GetProperty("themes");
        return (light, dark, themes.GetProperty(light), themes.GetProperty(dark));
    }

    string Swatches(string args)
    {
        var (light, dark, lt, dt) = Themes();
        var groups = args switch { "ext" => new[] { "ext" }, "core" or "" => ["color"], _ => ["color", "ext"] };
        var sb = new StringBuilder("<div class=\"docs-swatches\">");
        foreach (var group in groups)
        {
            foreach (var prop in lt.GetProperty(group).EnumerateObject())
            {
                var name = prop.Name;
                var lv = prop.Value.GetString();
                var dv = dt.GetProperty(group).TryGetProperty(name, out var d) ? d.GetString() : "";
                var desc = Text(lt.GetProperty("descriptions"), name);
                sb.Append($"""
                    <figure class="docs-swatch"><div class="docs-swatch__chips" aria-hidden="true">
                    <span data-theme="{E(light)}" style="background:var({E(name)})"></span><span data-theme="{E(dark)}" style="background:var({E(name)})"></span>
                    </div><figcaption><code>{E(name)}</code><span class="docs-swatch__values"><span title="{L("light")}">{E(Short(lv))}</span><span title="{L("dark")}">{E(Short(dv))}</span></span>
                    {(string.IsNullOrEmpty(desc) ? "" : $"<span class=\"docs-swatch__desc\">{E(desc)}</span>")}</figcaption></figure>
                    """);
            }
        }
        return sb.Append("</div>").ToString();
    }

    string Short(string? value) => value is null ? "" : value.StartsWith("color-mix", StringComparison.Ordinal) ? SiteText.T(_lang, "mix") : value.StartsWith("var(", StringComparison.Ordinal) ? value[4..^1] : value;

    string Palette()
    {
        var sb = new StringBuilder("<div class=\"docs-palette\">");
        string? family = null;
        foreach (var p in store.Tokens.GetProperty("palette").EnumerateObject())
        {
            var fam = p.Name.Split('-')[0];
            if (fam != family)
            {
                if (family is not null) sb.Append("</div></section>");
                sb.Append($"<section class=\"docs-palette__family\"><h4 class=\"docs-palette__name\">{E(fam)}</h4><div class=\"docs-palette__row\">");
                family = fam;
            }
            var value = p.Value.GetProperty("value").GetString();
            var desc = Text(p.Value, "description");
            sb.Append($"<figure class=\"docs-chip\" title=\"{E(desc)}\"><span style=\"background:{E(value)}\"></span><figcaption><code>{E(p.Name.Replace('-', '.'))}</code><span>{E(value)}</span></figcaption></figure>");
        }
        if (family is not null) sb.Append("</div></section>");
        return sb.Append("</div>").ToString();
    }

    string Contrast()
    {
        var sb = new StringBuilder($"<div class=\"docs-table-wrap\"><table class=\"docs-contrast\"><thead><tr><th scope=\"col\">{L("col.theme")}</th><th scope=\"col\">{L("col.pair")}</th><th scope=\"col\">{L("col.sample")}</th><th scope=\"col\" class=\"ds-num\">{L("col.ratio")}</th><th scope=\"col\" class=\"ds-num\">{L("col.minimum")}</th><th scope=\"col\">{L("col.result")}</th></tr></thead><tbody>");
        foreach (var r in store.Contrast.GetProperty("results").EnumerateArray())
        {
            var pass = r.GetProperty("pass").GetBoolean();
            var info = r.GetProperty("informational").GetBoolean();
            var pill = pass ? $"<span class=\"ds-pill is-success\">{L("pass")}</span>" : info ? $"<span class=\"ds-pill is-warning\">{L("info")}</span>" : $"<span class=\"ds-pill is-error\">{L("fail")}</span>";
            var fg = r.GetProperty("fg").GetString();
            var bg = r.GetProperty("bg").GetString();
            sb.Append($"<tr><td><code>{E(r.GetProperty("theme").GetString())}</code></td><td><strong>{E(r.GetProperty("id").GetString())}</strong><br><span class=\"ds-text-subtle\">{E(Text(r, "role"))}</span></td>");
            sb.Append($"<td><span class=\"docs-contrast__sample\" style=\"color:{E(fg)};background:{E(bg)}\">Aa 12</span><br><span class=\"docs-mono\">{E(fg)} / {E(bg)}</span></td>");
            sb.Append($"<td class=\"ds-num\">{r.GetProperty("ratio").GetDouble():0.00}:1</td><td class=\"ds-num\">{r.GetProperty("min").GetDouble():0.#}:1</td><td>{pill}</td></tr>");
        }
        return sb.Append("</tbody></table></div>").ToString();
    }

    string TypeScale()
    {
        var sb = new StringBuilder("<div class=\"docs-type-scale\">");
        foreach (var role in store.Tokens.GetProperty("type").EnumerateObject())
        {
            var r = role.Value;
            string Get(string k) => r.TryGetProperty(k, out var v) ? (v.ValueKind == JsonValueKind.Object ? Text(v) : v.ToString()) : "";
            var transform = Get("transform");
            var sample = role.Name switch
            {
                "micro" => "12",
                "metric" => "1574782",
                "eyebrow" or "table-head" => SiteText.T(_lang, "type.sampleShort"),
                _ => SiteText.T(_lang, "type.sample"),
            };
            sb.Append($"""
                <div class="docs-type-row"><p class="docs-type-row__sample" style="font-size:var(--ds-type-{E(role.Name)}-size);line-height:var(--ds-type-{E(role.Name)}-leading);font-weight:var(--ds-type-{E(role.Name)}-weight);letter-spacing:var(--ds-type-{E(role.Name)}-tracking){(transform.Length > 0 ? $";text-transform:{E(transform)}" : "")}{(Get("numeric").Length > 0 ? ";font-variant-numeric:tabular-nums" : "")}">{E(sample)}</p>
                <dl class="docs-type-row__meta"><div><dt>{L("type.role")}</dt><dd><code>{E(role.Name)}</code></dd></div><div><dt>{L("type.size")}</dt><dd>{E(Get("size"))}</dd></div><div><dt>{L("type.leading")}</dt><dd>{E(Get("leading"))}</dd></div><div><dt>{L("type.weight")}</dt><dd>{E(Get("weight"))}</dd></div><div><dt>{L("type.tracking")}</dt><dd>{E(Get("tracking"))}</dd></div></dl>
                <p class="docs-type-row__use">{E(Get("use"))}</p></div>
                """);
        }
        return sb.Append("</div>").ToString();
    }

    IEnumerable<JsonElement> Static(string group) =>
        store.Tokens.GetProperty("static").EnumerateArray().Where(s => s.GetProperty("group").GetString() == group);

    string Spacing()
    {
        var sb = new StringBuilder("<div class=\"docs-scale\">");
        foreach (var s in Static("space"))
        {
            var name = s.GetProperty("name").GetString()!;
            var value = s.GetProperty("value").GetString()!;
            var bar = value.Contains(' ') ? "" : $"<span class=\"docs-scale__bar\" style=\"width:var({E(name)})\"></span>";
            sb.Append($"<div class=\"docs-scale__row\"><code>{E(name)}</code><span class=\"docs-mono\">{E(value)}</span>{bar}<span class=\"docs-scale__desc\">{E(Text(s, "description"))}</span></div>");
        }
        return sb.Append("</div>").ToString();
    }

    string Radius()
    {
        var sb = new StringBuilder("<div class=\"docs-tiles\">");
        foreach (var s in Static("radius"))
        {
            var name = s.GetProperty("name").GetString()!;
            sb.Append($"<figure class=\"docs-tile\"><span class=\"docs-tile__shape\" style=\"border-radius:var({E(name)})\"></span><figcaption><code>{E(name)}</code><span>{E(s.GetProperty("value").GetString())}</span><small>{E(Text(s, "description"))}</small></figcaption></figure>");
        }
        return sb.Append("</div>").ToString();
    }

    string Shadows()
    {
        var (_, _, lt, _) = Themes();
        var names = Static("shadow").Select(s => (s.GetProperty("name").GetString()!, Text(s, "description")))
            .Concat(lt.GetProperty("shadow").EnumerateObject().Select(p => (p.Name, Text(lt.GetProperty("descriptions"), p.Name))))
            .Where(n => !n.Item1.EndsWith("-none", StringComparison.Ordinal));
        var sb = new StringBuilder("<div class=\"docs-tiles is-shadows\">");
        foreach (var (name, desc) in names)
            sb.Append($"<figure class=\"docs-tile\"><span class=\"docs-tile__shape is-raised\" style=\"box-shadow:var({E(name)})\"></span><figcaption><code>{E(name)}</code><small>{E(desc)}</small></figcaption></figure>");
        return sb.Append("</div>").ToString();
    }

    string Motion()
    {
        var sb = new StringBuilder("<div class=\"docs-motion\" data-motion-demo>");
        var easings = Static("motion").Where(s => s.GetProperty("name").GetString()!.Contains("-ease-")).ToList();
        foreach (var s in Static("motion").Where(s => s.GetProperty("name").GetString()!.Contains("-duration-")))
        {
            var name = s.GetProperty("name").GetString()!;
            sb.Append($"<button type=\"button\" class=\"docs-motion__row\" style=\"--demo-duration:var({E(name)});--demo-ease:var(--ds-ease-emphasized)\" aria-label=\"{L("play", name)}\"><code>{E(name)}</code><span class=\"docs-mono\">{E(s.GetProperty("value").GetString())}</span><span class=\"docs-motion__track\"><span class=\"docs-motion__dot\"></span></span><span class=\"docs-scale__desc\">{E(Text(s, "description"))}</span></button>");
        }
        sb.Append("</div><div class=\"docs-motion is-easing\" data-motion-demo>");
        foreach (var s in easings)
        {
            var name = s.GetProperty("name").GetString()!;
            sb.Append($"<button type=\"button\" class=\"docs-motion__row\" style=\"--demo-duration:600ms;--demo-ease:var({E(name)})\" aria-label=\"{L("play", name)}\"><code>{E(name)}</code><span class=\"docs-mono\">{E(s.GetProperty("value").GetString())}</span><span class=\"docs-motion__track\"><span class=\"docs-motion__dot\"></span></span><span class=\"docs-scale__desc\">{E(Text(s, "description"))}</span></button>");
        }
        return sb.Append("</div>").ToString();
    }

    string Icons()
    {
        var sb = new StringBuilder("<div class=\"docs-icons\">");
        foreach (var name in Icon.Names)
            sb.Append($"<button type=\"button\" class=\"docs-icons__cell\" data-ds-copy=\"\" data-ds-copy-text=\"{E(name)}\" data-ds-copy-message=\"{L("iconCopied", name)}\" aria-label=\"{L("copyIcon", name)}\"><svg class=\"ds-icon is-lg\" aria-hidden=\"true\"><use href=\"#ds-icon-{E(name)}\"></use></svg><span>{E(name)}</span></button>");
        return sb.Append("</div>").ToString();
    }

    string StaticTable(string group)
    {
        var sb = new StringBuilder($"<div class=\"docs-table-wrap\"><table><thead><tr><th scope=\"col\">{L("col.variable")}</th><th scope=\"col\">{L("col.value")}</th><th scope=\"col\">{L("col.notes")}</th></tr></thead><tbody>");
        foreach (var s in Static(group))
            sb.Append($"<tr><td><code>{E(s.GetProperty("name").GetString())}</code></td><td><code>{E(s.GetProperty("value").GetString())}</code></td><td>{E(Text(s, "description"))}</td></tr>");
        return sb.Append("</tbody></table></div>").ToString();
    }
}
