---
title: Search input
group: components
category: forms
order: 7
summary: Search field with a leading icon, clear button, shortcut hint, loading state, Enter to submit and optional recent searches.
source: TPS app.css .ds-search
---

Use the search input to filter a list on the page or to start a site search. For choosing from a known list use [combobox](./combobox.md); for commands and navigation use [command](./command.md).

## Examples

### Search with shortcut hint

`data-ds-shortcut="/"` focuses the field when `/` is pressed outside any text field. The `kbd` hint fades when the field has focus or text, and is hidden on touch devices. Use `mod+k` for Ctrl or Command + K.

```html preview title="Search with shortcut"
<form role="search" style="max-width:26rem" onsubmit="return false">
  <div class="ds-input ds-search">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
    <input type="search" name="q" class="ds-input__control" placeholder="Search projects" aria-label="Search projects" data-ds-shortcut="/" enterkeyhint="search" autocomplete="off">
    <button type="button" class="ds-input__clear" tabindex="-1" aria-label="Clear"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
    <kbd class="ds-kbd ds-search__kbd" aria-hidden="true">/</kbd>
  </div>
</form>
```

### Loading

Set `aria-busy="true"` on the wrapper while results load. The spinner shows after 300ms and replaces nothing: the clear button keeps its slot.

```html preview title="Loading results"
<div class="ds-input ds-search" aria-busy="true" style="max-width:26rem">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
  <input type="search" class="ds-input__control" value="invoice" aria-label="Search invoices">
</div>
```

### Recent searches

Add `data-ds-recent="5"` and a `.ds-search__recent` slot inside a `.ds-search-box`. Searches are saved in the browser on Enter or submit, listed on focus, filtered while typing, and removed one by one with Delete or all at once. The field becomes a combobox with a listbox; it is plain history, not suggestions from the server.

```html preview title="Recent searches"
<div class="ds-search-box" style="max-width:26rem">
  <div class="ds-input ds-search">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
    <input type="search" name="q" id="se-recent" class="ds-input__control" placeholder="Search invoices" aria-label="Search invoices" data-ds-recent="5" data-ds-recent-key="docs-invoices" data-ds-no-submit autocomplete="off">
    <button type="button" class="ds-input__clear" tabindex="-1" aria-label="Clear"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
  <div class="ds-search__recent" data-state="closed"></div>
</div>
<p class="ds-hint">Type a term and press Enter, then focus the field again.</p>
```

## States

```html preview title="Search states"
<div class="ds-field-grid">
  <div class="ds-field"><label for="ss-1">Empty</label><div class="ds-input ds-search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input id="ss-1" type="search" class="ds-input__control" placeholder="Search"></div></div>
  <div class="ds-field"><label for="ss-2">With text</label><div class="ds-input ds-search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input id="ss-2" type="search" class="ds-input__control" value="INV-2026"><button type="button" class="ds-input__clear" tabindex="-1" aria-label="Clear"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></div></div>
  <div class="ds-field"><label for="ss-3">Disabled</label><div class="ds-input ds-search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input id="ss-3" type="search" class="ds-input__control" placeholder="Search" disabled></div></div>
  <div class="ds-field"><label for="ss-4">Read-only</label><div class="ds-input ds-search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input id="ss-4" type="search" class="ds-input__control" value="PRJ-1024" readonly></div></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest, hover, focus | As [input](./input.md) | Icon turns to `--ds-quiet` on focus |
| Placeholder | Empty | `--ds-subtle`; shortcut hint visible |
| Filled | Text present | Clear button visible, hint hidden |
| Loading | `aria-busy="true"` | Spinner after 300ms |
| Disabled, read-only | Attributes | Dimmed, or `base-200` with no clear button |
| Recent open | Focus on empty field with history | Panel enters in 160ms with 5px of movement |
| Recent active option | Arrow keys | Tonal fill and an inset hairline |
| No history | Nothing saved | Panel stays closed |

## Anatomy

- `.ds-input.ds-search`: wrapper, leading `svg.ds-icon`, `input[type=search].ds-input__control`.
- `.ds-input__clear`: clear button.
- `.ds-kbd.ds-search__kbd`: shortcut hint.
- `.ds-search-box`: optional positioning parent for the recent panel `.ds-search__recent` (`.ds-search__recent-list`, `-item`, `-title`, `-clear`).
- Version 1 `.ds-search` with an absolute icon still works.

## Usage

- Give the field an accessible name (`aria-label` or a visible label); the icon is not a label.
- Wrap a site-wide search in `role="search"`. For list filtering, filter after a short pause (250 to 300ms) and keep the list visible.
- Submit on Enter. Do not search on every keystroke for slow queries; show the loading state when it does.
- Do not use `/` as a shortcut if your page has another handler for it. A page can have one search shortcut.
- Keep recent searches to 5 and never save text from sensitive fields.

## Accessibility

- Native `type="search"`, so assistive technology announces "search". The browser cancel button is hidden; the DS clear button replaces it.
- Escape clears the text (and stays in the field); a second Escape leaves it alone.
- With recent searches the field uses the combobox pattern: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`, `aria-activedescendant`.
- The shortcut hint is `aria-hidden`; tell people the shortcut elsewhere (help or tooltip) because most assistive technology users will not see it.
- Clear button is 28px with a 44px hit area and is out of the tab order.

| Key | Action |
| --- | --- |
| `/` or the configured shortcut | Focuses and selects the field (not inside another field) |
| Enter | Submits; saves the term to recent searches |
| Escape | Closes the recent list; otherwise clears the text |
| Arrow Down / Arrow Up | Opens the recent list, then moves the active option |
| Delete | Removes the active recent search |
| Tab | Moves to the clear-history button while the list is open, then away |

## Razor

```cshtml
<ds-field name="q" type="search" label="Search" shortcut="/" recent="5" />
```

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-shortcut` | Global shortcut: `"/"`, `"mod+k"` |
| `data-ds-recent` | Max saved searches; enables the recent list |
| `data-ds-recent-key` | Storage key suffix (default the field name or id) |
| `data-ds-no-submit` | Do not call `form.requestSubmit()` when a recent search is chosen |

Events: `ds:search:submit` (`detail.value`), `ds:search:clear`. Recent searches live in `localStorage` under `ds-recent-<key>`.

## Tokens

`--ds-subtle`, `--ds-quiet`, `--ds-popover`, `--ds-popover-border`, `--ds-shadow-menu`, `--ds-z-combobox`, `--ds-duration-quick`, `--ds-duration-exit`, `--ds-ease-emphasized`.

## Native and daisyUI

Builds on `input[type=search]`. The DS hides the browser cancel button, adds the icon, clear button, shortcut and history, and aligns the sizes with [input](./input.md).
