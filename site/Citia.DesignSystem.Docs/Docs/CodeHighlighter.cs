using System.Net;
using System.Text;
using System.Text.RegularExpressions;

namespace Citia.DesignSystem.Docs.Docs;

/// <summary>
/// Small server-side highlighter: one regex alternation per language, every token HTML-encoded on its own, so the output is
/// always safe text with &lt;span class="tok-*"&gt; wrappers. Colours come from the DS syntax tokens (docs-chrome.css).
/// </summary>
public static partial class CodeHighlighter
{
    static readonly Dictionary<string, Regex> Grammars = new(StringComparer.OrdinalIgnoreCase)
    {
        ["html"] = Markup(),
        ["cshtml"] = Markup(),
        ["xml"] = Markup(),
        ["css"] = Css(),
        ["csharp"] = CSharp(),
        ["cs"] = CSharp(),
        ["js"] = Script(),
        ["javascript"] = Script(),
        ["ts"] = Script(),
        ["typescript"] = Script(),
        ["json"] = Json(),
        ["powershell"] = Shell(),
        ["ps1"] = Shell(),
        ["bash"] = Shell(),
        ["sh"] = Shell(),
        ["yaml"] = Shell(),
        ["dockerfile"] = Shell(),
    };

    static readonly string[] Classes = ["com", "tag", "attr", "str", "key", "num", "razor", "prop", "kw", "var"];

    public static string Highlight(string code, string lang)
    {
        if (!Grammars.TryGetValue(lang, out var grammar)) return WebUtility.HtmlEncode(code);
        var sb = new StringBuilder(code.Length * 2);
        var last = 0;
        foreach (Match m in grammar.Matches(code))
        {
            if (m.Index > last) sb.Append(WebUtility.HtmlEncode(code[last..m.Index]));
            var cls = Classes.FirstOrDefault(c => m.Groups[c].Success);
            if (cls is null) sb.Append(WebUtility.HtmlEncode(m.Value));
            else
            {
                // Tag tokens keep their "<" or "</" outside the coloured span for readability.
                var g = m.Groups[cls];
                if (g.Index > m.Index) sb.Append(WebUtility.HtmlEncode(code[m.Index..g.Index]));
                sb.Append($"<span class=\"tok-{cls}\">{WebUtility.HtmlEncode(g.Value)}</span>");
                var end = g.Index + g.Length;
                if (end < m.Index + m.Length) sb.Append(WebUtility.HtmlEncode(code[end..(m.Index + m.Length)]));
            }
            last = m.Index + m.Length;
        }
        if (last < code.Length) sb.Append(WebUtility.HtmlEncode(code[last..]));
        return sb.ToString();
    }

    [GeneratedRegex(@"(?<com><!--[\s\S]*?-->|@\*[\s\S]*?\*@)|</?(?<tag>[A-Za-z][\w:.-]*)|(?<attr>[A-Za-z_@:][\w:.@-]*)(?==)|(?<str>""[^""\n]*""|'[^'\n]*')|(?<razor>@(?:[A-Za-z_][\w.]*(?:\([^()\n]*\))?|\{|\())")]
    private static partial Regex Markup();

    [GeneratedRegex(@"(?<com>/\*[\s\S]*?\*/)|(?<str>""[^""\n]*""|'[^'\n]*')|(?<kw>@[\w-]+)|(?<var>--[\w-]+)|(?<prop>[a-z-]+)(?=\s*:[^:])|(?<num>-?\b\d+(?:\.\d+)?(?:px|rem|em|ms|s|%|vw|dvh|ch|deg)?\b)")]
    private static partial Regex Css();

    [GeneratedRegex(@"(?<com>//[^\n]*|/\*[\s\S]*?\*/)|(?<str>\$?@?""(?:[^""\\\n]|\\.)*""|'(?:[^'\\\n]|\\.)')|(?<kw>\b(?:using|namespace|public|private|internal|protected|static|readonly|sealed|record|class|struct|enum|interface|new|return|var|if|else|foreach|for|in|switch|case|default|null|true|false|async|await|void|string|int|bool|decimal|double|this|base|override|partial|get|set|init|const|throw|try|catch|is|not|and|or|when|with|params|out|ref|typeof|nameof)\b)|(?<num>\b\d+(?:\.\d+)?[mMdDfF]?\b)")]
    private static partial Regex CSharp();

    [GeneratedRegex(@"(?<com>//[^\n]*|/\*[\s\S]*?\*/)|(?<str>`(?:[^`\\]|\\.)*`|""(?:[^""\\\n]|\\.)*""|'(?:[^'\\\n]|\\.)*')|(?<kw>\b(?:import|export|from|default|const|let|var|function|return|if|else|for|of|in|new|class|extends|async|await|true|false|null|undefined|this|typeof|instanceof)\b)|(?<num>\b\d+(?:\.\d+)?\b)")]
    private static partial Regex Script();

    [GeneratedRegex(@"(?<key>""(?:[^""\\]|\\.)*"")(?=\s*:)|(?<str>""(?:[^""\\]|\\.)*"")|(?<num>-?\b\d+(?:\.\d+)?\b)|(?<kw>\b(?:true|false|null)\b)")]
    private static partial Regex Json();

    [GeneratedRegex(@"(?<com>#[^\n]*)|(?<str>""[^""\n]*""|'[^'\n]*')|(?<var>\$[\w:]+)|(?<kw>(?<=^|\s)--?[a-zA-Z][\w-]*)")]
    private static partial Regex Shell();
}
