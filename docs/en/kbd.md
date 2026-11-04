---
title: Kbd
group: components
category: data-display
order: 15
summary: Keyboard keys and shortcuts as small key caps, in single keys, combinations like Ctrl + K and sequences, in three sizes, with Apple symbols swapped in by script.
source: TPS app.css .ds-kbd (base.css), Tailwind UI and shadcn/ui kbd
---

`kbd` shows a key or a shortcut: in help text, menu items, tooltips, command palette rows and button hints. It tells people what to press; it does not trigger anything. Use [tooltip](./tooltip.md) text for a short hint on one control, and a help page with a keyboard table for the full list.

## Examples

```html preview title="Single keys and combinations"
<div style="display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap">
  <kbd class="ds-kbd">Esc</kbd>
  <kbd class="ds-kbd">Enter</kbd>
  <span class="ds-kbd-group"><kbd class="ds-kbd" data-ds-kbd-mac="⌘" data-ds-kbd-mac-label="Command">Ctrl</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd">K</kbd></span>
  <span class="ds-kbd-group"><kbd class="ds-kbd" data-ds-kbd-mac="⌘" data-ds-kbd-mac-label="Command">Ctrl</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd" data-ds-kbd-mac="⇧" data-ds-kbd-mac-label="Shift">Shift</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd">P</kbd></span>
  <span class="ds-kbd-group"><kbd class="ds-kbd" aria-label="Up arrow">↑</kbd><kbd class="ds-kbd" aria-label="Down arrow">↓</kbd></span>
</div>
```

```html preview title="Sizes"
<div style="display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap">
  <span class="ds-kbd-group"><kbd class="ds-kbd is-sm">Ctrl</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd is-sm">S</kbd></span>
  <span class="ds-kbd-group"><kbd class="ds-kbd">Ctrl</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd">S</kbd></span>
  <span class="ds-kbd-group"><kbd class="ds-kbd is-lg">Ctrl</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd is-lg">S</kbd></span>
</div>
```

```html preview title="In context: sentence, buttons, menu and sequence"
<div style="display:grid;gap:1rem;max-width:34rem">
  <p>Press <span class="ds-kbd-group"><kbd class="ds-kbd is-sm" data-ds-kbd-mac="⌘" data-ds-kbd-mac-label="Command">Ctrl</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd is-sm">K</kbd></span> to open the command palette, or <kbd class="ds-kbd is-sm">Esc</kbd> to close it.</p>
  <div style="display:flex;gap:.75rem;flex-wrap:wrap;align-items:center">
    <button type="button" class="btn btn-primary btn-sm">Save <kbd class="ds-kbd is-sm" data-ds-kbd-mac="⌘" data-ds-kbd-mac-label="Command">Ctrl</kbd></button>
    <button type="button" class="btn btn-ghost btn-sm">Search <span class="ds-kbd-group"><kbd class="ds-kbd is-sm" data-ds-kbd-mac="⌘" data-ds-kbd-mac-label="Command">Ctrl</kbd><kbd class="ds-kbd is-sm">K</kbd></span></button>
  </div>
  <div class="ds-menu-panel" style="position:static;width:auto;max-width:18rem">
    <button type="button" style="justify-content:space-between"><span>New invoice</span><kbd class="ds-kbd is-sm is-ghost">N</kbd></button>
    <button type="button" style="justify-content:space-between"><span>Go to projects</span><span class="ds-kbd-group is-sequence"><kbd class="ds-kbd is-sm is-ghost">G</kbd><span class="ds-kbd-sep">then</span><kbd class="ds-kbd is-sm is-ghost">P</kbd></span></button>
  </div>
</div>
```

## States

`kbd` is not interactive, so it has no hover, pressed or focus state. These are the variants that matter.

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | 24px key cap, hairline border with a thicker bottom edge, mono 12px, surface fill |
| Small, large | `is-sm`, `is-lg` | 20px with 11px text, or 32px with 14px text |
| Quiet | `is-ghost`, or inside `.btn` and `.ds-menu-panel` items | No border, 8% content tint, subtle text |
| On a primary button | Inside `.btn-primary` | 18% tint of the button text colour |
| Apple platform | `data-ds-kbd-mac` and a Mac, iPhone or iPad | Text becomes ⌘, ⇧, ⌥ or ⌃; `aria-label` becomes the key name |
| Combination | `.ds-kbd-group` with `.ds-kbd-sep` | Keys 4px apart with a readable plus between them |
| Sequence | `.ds-kbd-group.is-sequence` | The separator is a word ("then") in the body font |
| Forced colours | `forced-colors: active` | Border in `ButtonText` |
| Print | Always | Printed like any text; no change |

## Anatomy

- `kbd.ds-kbd` the key cap, with `is-sm`, `is-lg`, `is-ghost`.
- `.ds-kbd-group` wraps a combination or sequence; `.ds-kbd-sep` the plus or word between keys; `.is-sequence` for "press, then press".

## Usage

- Write key names as the keyboard prints them: `Ctrl`, `Shift`, `Alt`, `Enter`, `Esc`, `Tab`. Use `↑ ↓ ← →` for arrows and give them an `aria-label`.
- Write combinations with `+` between keys, one `kbd` per key. Never put `Ctrl+K` inside one `kbd`.
- Show the platform's modifier: add `data-ds-kbd-mac="⌘"` to `Ctrl` so Apple users see ⌘ and everyone else sees Ctrl.
- Use `is-sm` inside buttons, menus and tooltips (20px) and the default size in running text.
- Do not use more than 3 keys in a shortcut; do not show a shortcut that has no effect on the current page.
- Do not style a `kbd` as a button. If people can click it, use a [button](./button.md).

## Accessibility

- `kbd` is the semantic element for keyboard input; screen readers read the text. Word keys need nothing more.
- Symbol keys (↑, ⌘) need a spoken name in `aria-label`. The Apple swap sets it from `data-ds-kbd-mac-label`.
- The plus between keys is real text, so "Ctrl plus K" is read as written.
- Contrast: text 4.5:1 on the cap fill and 3:1 for the border, in both themes.
- Shortcuts shown must also be reachable some other way (a menu item or a button): a shortcut is never the only path.
- No motion.

| Key | Action |
| --- | --- |
| None | `kbd` is display only; it is not focusable |

## Razor

```cshtml
<ds-kbd keys="Mod+K" />
<ds-kbd keys="Mod+Shift+P" size="sm" />
<ds-kbd keys="Esc" ghost />
<p>Press <ds-kbd keys="Up" /> and <ds-kbd keys="Down" /> to move.</p>
```

`keys` splits on `+`. Tokens: `Mod` (Ctrl, ⌘ on Apple), `Ctrl`, `Cmd`, `Alt`, `Shift`, `Enter`, `Esc`, `Tab`, `Backspace`, `Delete`, `Space`, `Up`, `Down`, `Left`, `Right`, `Home`, `End`, `PageUp`, `PageDown`, `F1` to `F12`, or any single character. A single key renders one `kbd`; several render a `.ds-kbd-group`. `size` is `sm` or `lg`, `ghost` selects the quiet style. When `keys` is empty the tag's content is used.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `[data-ds-kbd-mac="⌘"]` | On Mac, iPhone and iPad the element's text becomes this symbol; the original is kept in `data-ds-kbd-original` |
| `[data-ds-kbd-mac-label="Command"]` | Spoken name set as `aria-label` when the swap happens |

The detection reads `navigator.userAgentData.platform`, then `navigator.platform`. Without script the plain text (`Ctrl`) stays, which is correct for most keyboards.

## Tokens

`--ds-kbd-size` (local), `--color-base-100`, `--color-base-300`, `--color-base-content`, `--ds-font-mono`, `--ds-subtle`, `--ds-radius-sm`, `--ds-radius-md`.

## Native and daisyUI

Builds on the native `kbd` element. daisyUI `kbd` still renders; the `ds-kbd` classes give the DS the same key cap with a thicker bottom edge, sizes, groups and the quiet style.
