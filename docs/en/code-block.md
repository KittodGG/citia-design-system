---
title: Code block
group: components
category: data-display
order: 16
summary: Code in a framed block with a language label, copy button, optional line numbers, highlighted and diff lines, wrap toggle and a collapsed height, plus inline code.
source: TPS app.css .ds-code-block and .ds-code-line (code.css), _XmlPreview
---

A code block shows code, a command, a payload or a configuration file that people read and copy. The block scrolls on its own, keeps whitespace, and copies the exact text. Use inline code for a short name inside a sentence, and an [alert](./alert.md) or a [description list](./description-list.md) for values that are not code. A block is read-only; for editing use a textarea with `font-family: var(--ds-font-mono)`.

## Examples

```html preview title="Language, title and copy button"
<figure class="ds-code">
  <div class="ds-code__bar">
    <span class="ds-code__lang">C#</span>
    <span class="ds-code__title">Program.cs</span>
    <div class="ds-code__actions">
      <button type="button" class="ds-code__btn ds-code__copy" data-ds-code-copy>
        <svg class="ds-icon is-rest-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><svg class="ds-icon is-copied-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg><svg class="ds-icon is-failed-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
        <span class="ds-code__label-rest">Copy</span><span class="ds-code__label-copied">Copied</span><span class="ds-code__label-failed">Copy failed</span>
      </button>
    </div>
  </div>
  <pre class="ds-code-block" id="demo-code-1" tabindex="0"><code>var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages();

var app = builder.Build();
app.UseStaticFiles();
app.MapRazorPages();
app.Run();</code></pre>
</figure>
```

```html preview title="Line numbers and highlighted lines"
<figure class="ds-code">
  <div class="ds-code__bar"><span class="ds-code__lang">JSON</span><span class="ds-code__title">appsettings.json</span>
    <div class="ds-code__actions"><button type="button" class="ds-code__btn ds-code__copy" data-ds-code-copy><svg class="ds-icon is-rest-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><svg class="ds-icon is-copied-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg><svg class="ds-icon is-failed-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg><span class="ds-code__label-rest">Copy</span><span class="ds-code__label-copied">Copied</span><span class="ds-code__label-failed">Copy failed</span></button></div>
  </div>
  <pre class="ds-code-block has-line-numbers" tabindex="0"><code><span class="ds-code-line">{</span>
<span class="ds-code-line">  "Localization": {</span>
<span class="ds-code-line" data-highlight>    "DefaultCulture": "en",</span>
<span class="ds-code-line" data-highlight>    "SupportedCultures": [ "en", "id" ]</span>
<span class="ds-code-line">  },</span>
<span class="ds-code-line">  "AllowedHosts": "*"</span>
<span class="ds-code-line">}</span></code></pre>
</figure>
```

```html preview title="Diff lines"
<figure class="ds-code">
  <div class="ds-code__bar"><span class="ds-code__lang">Diff</span><span class="ds-code__title">Pages/Invoices/Index.cshtml</span>
    <div class="ds-code__actions"><button type="button" class="ds-code__btn ds-code__copy" data-ds-code-copy><svg class="ds-icon is-rest-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><svg class="ds-icon is-copied-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg><svg class="ds-icon is-failed-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg><span class="ds-code__label-rest">Copy</span><span class="ds-code__label-copied">Copied</span><span class="ds-code__label-failed">Copy failed</span></button></div>
  </div>
  <pre class="ds-code-block" tabindex="0"><code><span class="ds-code-line">&lt;table class="ds-table"&gt;</span>
<span class="ds-code-line" data-change="removed">  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Invoice&lt;/th&gt;&lt;th&gt;Amount&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;</span>
<span class="ds-code-line" data-change="added">  &lt;thead&gt;&lt;tr&gt;&lt;th scope="col"&gt;Invoice&lt;/th&gt;&lt;th scope="col" class="ds-num"&gt;Amount&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;</span>
<span class="ds-code-line">&lt;/table&gt;</span></code></pre>
</figure>
```

Copy leaves out the removed lines, so the copied text is the "after" version.

```html preview title="Wrap toggle and collapsed height"
<figure class="ds-code" data-ds-code-collapsible="9">
  <div class="ds-code__bar"><span class="ds-code__lang">Shell</span><span class="ds-code__title">deploy.sh</span>
    <div class="ds-code__actions">
      <button type="button" class="ds-code__btn" data-ds-code-wrap aria-pressed="false"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-align-left"></use></svg>Wrap lines</button>
      <button type="button" class="ds-code__btn ds-code__copy" data-ds-code-copy><svg class="ds-icon is-rest-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><svg class="ds-icon is-copied-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg><svg class="ds-icon is-failed-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg><span class="ds-code__label-rest">Copy</span><span class="ds-code__label-copied">Copied</span><span class="ds-code__label-failed">Copy failed</span></button>
    </div>
  </div>
  <pre class="ds-code-block has-line-numbers" id="demo-code-4" tabindex="0"><code><span class="ds-code-line"><span class="ds-syntax-comment"># Build and publish the site</span></span>
<span class="ds-code-line">dotnet publish site/Citia.DesignSystem.Docs -c Release -o ./out --no-self-contained -p:UseAppHost=false</span>
<span class="ds-code-line"></span>
<span class="ds-code-line"><span class="ds-syntax-comment"># Copy to the server</span></span>
<span class="ds-code-line">scp -r ./out/* deploy@docs.kintara.example:/var/www/citia-docs/</span>
<span class="ds-code-line"></span>
<span class="ds-code-line"><span class="ds-syntax-comment"># Restart and check</span></span>
<span class="ds-code-line">ssh deploy@docs.kintara.example "sudo systemctl restart citia-docs"</span>
<span class="ds-code-line">curl -s -o /dev/null -w "%{http_code}\n" https://docs.kintara.example/en/introduction</span>
<span class="ds-code-line"></span>
<span class="ds-code-line"><span class="ds-syntax-comment"># Roll back if the status is not 200</span></span>
<span class="ds-code-line">ssh deploy@docs.kintara.example "sudo systemctl stop citia-docs &amp;&amp; ./rollback.sh"</span></code></pre>
  <div class="ds-code__foot" hidden>
    <button type="button" class="ds-code__btn" data-ds-code-expand aria-expanded="false" aria-controls="demo-code-4"><span data-ds-code-expand-label>Show all lines</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></button>
  </div>
</figure>
```

```html preview title="Bare block, syntax colours and inline code"
<div style="display:grid;gap:1rem;max-width:40rem">
  <pre class="ds-code-block" tabindex="0"><code><span class="ds-syntax-tag">&lt;ds-kbd</span> <span class="ds-syntax-attr">keys</span>=<span class="ds-syntax-string">"Mod+K"</span> <span class="ds-syntax-tag">/&gt;</span>
<span class="ds-syntax-comment">&lt;!-- ⌘ K on Apple, Ctrl K elsewhere --&gt;</span></code></pre>
  <p>Set the culture with <code class="ds-code-inline">DsText.Language</code> or send <code class="ds-code-inline">Accept-Language: id</code>; the default is <code class="ds-code-inline">en</code>.</p>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | `--color-base-200` surface, 1px border, mono 13px, line height 1.65 |
| Copy hover, pressed | Pointer over, `:active` | Ghost button gains the hover or pressed state layer; pressed scales to `--ds-press-scale` |
| Copy focus-visible | Keyboard | 2px `--ds-focus` ring |
| Copied | `data-state="copied"` for 1.8s after a successful copy | Check glyph and "Copied" in success colour; "Code copied to the clipboard" is announced |
| Copy failed | `data-state="failed"` for 2.4s | Cross glyph and "Copy failed" in error colour; the status line says to select the code and press Ctrl+C |
| Copy disabled | `disabled` or `aria-disabled="true"` | `--ds-opacity-disabled`, no pointer events |
| Wrap on | `aria-pressed="true"` on the wrap toggle, `.is-wrapped` on the figure | Long lines wrap with a hanging indent under line numbers |
| Highlighted line | `data-highlight` | Primary tint and a 3px primary edge |
| Added, removed line | `data-change="added/removed"` | Success or error tint, a 3px edge, and a `+` or `−` sign when there are no line numbers |
| Collapsed | `data-collapsed="true"` | Block clipped to its collapsed height with a "Show all N lines" bar |
| Expanded | `data-collapsed="false"` | Block grows over 240ms (to a 48rem scroll limit), button says "Show less" |
| Focus | The `pre` has `tabindex="0"` | 2px ring inside the block so keyboard users can scroll it |
| Empty | No code | Do not render the block |

## Anatomy

- `figure.ds-code` with `is-wrapped`, `data-ds-code-collapsible="<rem>"`, `data-collapsed`.
- `.ds-code__bar` with `.ds-code__lang`, `.ds-code__title`, `.ds-code__actions`; buttons `.ds-code__btn`, `.ds-code__copy` (with `.is-rest-icon`, `.is-copied-icon`, `.is-failed-icon` and the three `.ds-code__label-*` spans).
- `pre.ds-code-block` (with `has-line-numbers`) containing `code` and `span.ds-code-line` per line.
- `.ds-code__foot` with the expand button; `.ds-code__status` (added by script, hidden live region).
- Syntax spans `.ds-syntax-tag|attr|string|keyword|number|comment|prop|var`. Inline code is `.ds-code-inline`.

## Usage

- Name the language in the bar and the file in the title when the code belongs to a file.
- Keep lines under 100 characters or offer the wrap toggle; prefer 8 to 30 lines per block and collapse anything longer than 14rem.
- Put one command per line and no leading `$` so copied text runs as is. Put output in a separate block without a copy button.
- Highlight 1 to 3 lines that matter. Use diff lines for before and after, with the removed line first.
- Use `.ds-code-inline` for names inside sentences; do not link inside a code block.
- Do not show secrets, tokens or real customer data in examples.
- Do not rely on colour for syntax meaning only; comments are italic and diff lines carry signs and edges.

## Accessibility

- The block is a `figure`; the bar text names it. The `pre` is focusable so keyboard users can scroll long or wide code.
- Buttons have visible text (Copy, Wrap lines, Show all N lines); the expand button carries `aria-expanded` and `aria-controls`.
- Copy results are announced in a hidden `role="status"` region, not by a toast, so the page stays quiet.
- Syntax colours use the DS tokens and keep 4.5:1 on the block surface in both themes. Highlight and diff lines also have a 3px edge; forced colours use `Highlight`.
- Line numbers come from CSS counters, so they are not selected or copied and are not read by screen readers.
- Buttons are 32px high (44px with a coarse pointer). Reduced motion removes the expand animation and the check pop.

| Key | Action |
| --- | --- |
| Tab | Moves to the buttons, then to the code (to scroll it) |
| Arrow keys, Page Up, Page Down | Scroll the focused code |
| Enter, Space | Activates the focused button |

## Razor

```cshtml
<ds-code-block language="csharp" title="Program.cs" line-numbers highlight="2,4-5" wrap-toggle collapsible="14"
               code="@Model.Snippet" />

<ds-code-block language="bash">
dotnet add package Citia.DesignSystem
</ds-code-block>
```

Use `code` for dynamic text. Child content is taken literally as written in the view (dedented, encoded once), so use it for static snippets without `@` expressions. Attributes: `language`, `title`, `code`, `line-numbers`, `highlight` (`2,4-6`), `diff` (also implied by `language="diff"`: lines starting with `+` or `-` become added and removed, and the first character is dropped), `wrap` (start wrapped), `wrap-toggle`, `collapsible` (rem), `no-copy`, `pre-id`. The tag helper does not colour syntax.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `[data-ds-code-copy]` | Copies the text of the figure's `pre`, without removed diff lines and `.ds-code-skip` elements, and sets `data-state` to `copied` or `failed` |
| `[data-ds-code-wrap]` | Toggles `.is-wrapped` on the figure and `aria-pressed` on the button |
| `figure[data-ds-code-collapsible="14"]` | Measures at load; if the code is taller than the limit sets `data-collapsed` and reveals the foot |
| `[data-ds-code-expand]`, `[data-ds-code-expand-label]` | Expand and collapse button and its label |

The older `[data-ds-copy="#selector"]` button from `forms.js` still works and toasts; the code block uses `data-ds-code-copy` so it can show the copied and failed states in place. Without script the block shows all its code and the buttons do nothing, so omit the bar's buttons when you render the block without the DS script.

## Tokens

`--ds-font-mono`, `--color-base-200`, `--color-base-300`, `--ds-radius-box`, `--ds-radius-md`, `--ds-syntax-tag`, `--ds-syntax-attr`, `--ds-success-text`, `--ds-quiet`, `--ds-link`, `--ds-warning-text`, `--color-primary`, `--color-success`, `--color-error`, `--ds-code-collapsed`, `--ds-code-gutter`, `--ds-duration-layout`, `--ds-duration-quick`, `--ds-press-scale`.

## Native and daisyUI

Builds on `figure`, `pre` and `code`. daisyUI `mockup-code` is not used; it fakes a terminal with prompt prefixes and has no copy states, line numbers or diff lines.
