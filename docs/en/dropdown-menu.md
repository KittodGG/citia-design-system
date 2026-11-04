---
title: Dropdown menu
group: components
category: overlays
order: 6
summary: A list of actions or options opened from a button, with icons, shortcuts, checkbox and radio items, submenus, typeahead and full keyboard support.
source: TPS app.css .master-menu-content (L1616–1650)
---

A dropdown menu collects actions that do not deserve their own button: row actions in a table, an overflow "More"
button, a user menu, view options. It follows the WAI-ARIA menu button pattern: the menu opens from its trigger, the
highlight follows the arrow keys and the pointer, letters jump to matching items, and Escape returns to the trigger.
Use a [Select](./select.md) or [Combobox](./combobox.md) to pick a value in a form, [Tabs](./tabs.md) or a
[Segmented control](./segmented-control.md) to switch views, a [Context menu](./context-menu.md) for the same items on
right click, and a [Command](./command.md) palette for app-wide search and actions.

## Examples

### Actions with icons and shortcuts

```html preview title="Row actions"
<button type="button" class="btn btn-ghost" aria-haspopup="menu" popovertarget="menu-row" aria-label="Actions for INV-2026-0418">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg>
</button>

<div id="menu-row" popover class="ds-menu" role="menu" aria-label="Actions for INV-2026-0418" data-ds-align="end">
  <button type="button" role="menuitem" class="ds-menu__item">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>
    <span class="ds-menu__text">View invoice</span>
    <kbd class="ds-menu__shortcut">Enter</kbd>
  </button>
  <button type="button" role="menuitem" class="ds-menu__item">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg>
    <span class="ds-menu__text">Edit</span>
    <kbd class="ds-menu__shortcut">E</kbd>
  </button>
  <button type="button" role="menuitem" class="ds-menu__item">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg>
    <span class="ds-menu__text">Duplicate</span>
    <kbd class="ds-menu__shortcut">Ctrl D</kbd>
  </button>
  <button type="button" role="menuitem" class="ds-menu__item">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg>
    <span class="ds-menu__text">Download PDF</span>
  </button>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitem" class="ds-menu__item" aria-disabled="true">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>
    <span class="ds-menu__text">Send reminder<span class="ds-menu__description">Available 3 days after the due date</span></span>
  </button>
  <button type="button" role="menuitem" class="ds-menu__item is-danger"
          data-ds-confirm="Delete INV-2026-0418?" data-ds-confirm-text="The draft and its 4 line items are removed." data-ds-confirm-label="Delete invoice">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>
    <span class="ds-menu__text">Delete</span>
    <kbd class="ds-menu__shortcut">Del</kbd>
  </button>
</div>
```

### Checkbox and radio items, labels

Checkbox and radio items keep the menu open, so several options can be set in one visit.

```html preview title="View options"
<button type="button" class="btn" aria-haspopup="menu" popovertarget="menu-view">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-sliders"></use></svg>
  View
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg>
</button>

<div id="menu-view" popover class="ds-menu" role="menu" aria-label="View options">
  <div role="group" aria-labelledby="menu-view-columns">
    <div id="menu-view-columns" class="ds-menu__label" role="presentation">Columns</div>
    <button type="button" role="menuitemcheckbox" aria-checked="true" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Client</span></button>
    <button type="button" role="menuitemcheckbox" aria-checked="true" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Amount</span></button>
    <button type="button" role="menuitemcheckbox" aria-checked="false" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Due date</span></button>
  </div>
  <div role="separator" class="ds-menu__separator"></div>
  <div role="group" aria-labelledby="menu-view-sort">
    <div id="menu-view-sort" class="ds-menu__label" role="presentation">Sort by</div>
    <button type="button" role="menuitemradio" aria-checked="true" class="ds-menu__item" data-value="newest"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">Newest first</span></button>
    <button type="button" role="menuitemradio" aria-checked="false" class="ds-menu__item" data-value="oldest"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">Oldest first</span></button>
    <button type="button" role="menuitemradio" aria-checked="false" class="ds-menu__item" data-value="amount"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">Highest amount</span></button>
  </div>
</div>
```

### Submenu

A submenu opens to the inline end on hover (after 100ms), on click, or with ArrowRight. Moving the pointer diagonally
towards it keeps it open.

```html preview title="Move to a project"
<button type="button" class="btn" aria-haspopup="menu" popovertarget="menu-file">
  File actions
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg>
</button>

<div id="menu-file" popover class="ds-menu" role="menu" aria-label="File actions">
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg><span class="ds-menu__text">Rename</span><kbd class="ds-menu__shortcut">F2</kbd></button>
  <div class="ds-menu__sub" role="none">
    <button type="button" role="menuitem" class="ds-menu__item" aria-haspopup="menu" aria-expanded="false" aria-controls="menu-file-move">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
      <span class="ds-menu__text">Move to</span>
      <svg class="ds-menu__chevron" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg>
    </button>
    <div id="menu-file-move" popover class="ds-menu" role="menu" aria-label="Move to">
      <button type="button" role="menuitem" class="ds-menu__item"><span class="ds-menu__text">PRJ-1024 · Warehouse relocation</span></button>
      <button type="button" role="menuitem" class="ds-menu__item"><span class="ds-menu__text">PRJ-1031 · Brand refresh</span></button>
      <button type="button" role="menuitem" class="ds-menu__item"><span class="ds-menu__text">PRJ-1040 · Annual audit 2026</span></button>
      <div role="separator" class="ds-menu__separator"></div>
      <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg><span class="ds-menu__text">New project</span></button>
    </div>
  </div>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-share"></use></svg><span class="ds-menu__text">Share</span></button>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Move to bin</span></button>
</div>
```

### User menu with links

Items can be links. A note at the end explains what is not in the menu.

```html preview title="Account"
<button type="button" class="btn btn-ghost" aria-haspopup="menu" popovertarget="menu-account">
  <span class="ds-avatar is-sm" aria-hidden="true">AL</span>
  Ayu Lestari
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg>
</button>

<div id="menu-account" popover class="ds-menu" role="menu" aria-label="Account" data-ds-align="end">
  <div class="ds-menu__label" role="presentation">ayu.lestari@company.com</div>
  <a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user"></use></svg><span class="ds-menu__text">Profile</span></a>
  <a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-settings"></use></svg><span class="ds-menu__text">Settings</span><kbd class="ds-menu__shortcut">Ctrl ,</kbd></a>
  <a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-credit-card"></use></svg><span class="ds-menu__text">Billing</span><span class="ds-menu__meta">Pro plan</span></a>
  <div role="separator" class="ds-menu__separator"></div>
  <a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-logout"></use></svg><span class="ds-menu__text">Sign out</span></a>
</div>
```

### Version 1 panel

`.ds-menu-panel` inside `<details data-ds-menu>` still works and opens without JavaScript. It has no roving focus; use
`.ds-menu` for new menus.

```html preview title="Details menu (v1)"
<details class="ds-disclosure-menu" data-ds-menu>
  <summary class="btn btn-ghost">Options <svg class="ds-icon ds-disclosure-menu__chevron" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary>
  <div class="ds-menu-panel">
    <a href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>View details</a>
    <a href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg>Edit</a>
    <p>Sent invoices cannot be deleted.</p>
  </div>
</details>
```

## States

Frozen states in a static menu (`.is-static`). In a live menu, highlight follows focus.

```html preview title="Item states"
<div class="ds-menu is-static" role="menu" aria-label="Item states">
  <div role="menuitem" class="ds-menu__item" tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">Rest</span></div>
  <div role="menuitem" class="ds-menu__item" data-highlighted tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg><span class="ds-menu__text">Highlighted</span><kbd class="ds-menu__shortcut">E</kbd></div>
  <div role="menuitem" class="ds-menu__item" aria-expanded="true" aria-haspopup="menu" tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"></use></svg><span class="ds-menu__text">Submenu open</span><svg class="ds-menu__chevron" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></div>
  <div role="menuitemcheckbox" aria-checked="true" class="ds-menu__item" tabindex="-1"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Checked</span></div>
  <div role="menuitemcheckbox" aria-checked="mixed" class="ds-menu__item" tabindex="-1"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">Mixed</span></div>
  <div role="menuitemradio" aria-checked="true" class="ds-menu__item" tabindex="-1"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">Selected radio</span></div>
  <div role="menuitem" class="ds-menu__item" aria-disabled="true" tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg><span class="ds-menu__text">Disabled<span class="ds-menu__description">Explains why</span></span></div>
  <div role="menuitem" class="ds-menu__item is-danger" tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Destructive</span></div>
  <div role="menuitem" class="ds-menu__item is-danger" data-highlighted tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Destructive, highlighted</span></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Closed | default | Trigger `aria-expanded="false"`, chevron down |
| Opening | click, Enter, Space, ArrowDown, ArrowUp | Grows from the trigger side, opacity + scale 0.96 → 1, 160ms emphasized; trigger `aria-expanded="true"`, chevron turns 180° |
| Item rest | default | Transparent, 36px high (44px on touch) |
| Highlighted | pointer over the item, arrow keys (`:focus`) | State layer 7% of `--color-base-content` |
| Keyboard focus | `:focus-visible` | Plus a 2px inset `--ds-focus` ring |
| Pressed | `:active` | State layer 10% |
| Checked | `aria-checked="true"` | Check or dot in the indicator column in `--ds-primary-text`, label weight 600 |
| Mixed | `aria-checked="mixed"` | Dash in the indicator column |
| Submenu open | `aria-expanded="true"` on the item | Keeps the highlight while the pointer is in the submenu |
| Disabled | `aria-disabled="true"` | 55% opacity, `not-allowed` cursor, still focusable so it can explain itself |
| Destructive | `.is-danger` | `--ds-error-text`; highlight is a 10% error tint |
| Empty / loading | `.ds-menu__empty`, `aria-busy="true"` | Centred note, spinner before the text |
| Closing | Escape, outside press, selection, Tab | Back into the trigger, 140ms exit easing |
| Reduced motion | media query | Opacity only; indicator does not scale |

## Anatomy

- Trigger: a `<button>` with `aria-haspopup="menu"` and `popovertarget`.
- `[popover].ds-menu[role=menu]`: the panel. Items sit on a 3-column subgrid: indicator or icon, text, shortcut or chevron.
- `.ds-menu__item` with `role="menuitem"`, `"menuitemcheckbox"` or `"menuitemradio"`.
- Item parts: `.ds-icon`, `.ds-menu__indicator`, `.ds-menu__text` (with `.ds-menu__description`), `.ds-menu__shortcut`, `.ds-menu__meta`, `.ds-menu__chevron`.
- `.ds-menu__label`, `[role=group]` / `.ds-menu__group`, `[role=separator]` / `.ds-menu__separator`, `.ds-menu__note`, `.ds-menu__empty`.
- `.ds-menu__sub[role=none]`: wraps a submenu item and its nested `.ds-menu` (the submenu must be inside the parent menu).

## Usage

- Keep menus to 3–10 items; group with separators after every 3–5 items. More than 15 items need search: use a [Command](./command.md) or [Combobox](./combobox.md).
- Start labels with a verb ("Download PDF") and keep them to 1–3 words; put detail in `.ds-menu__description`.
- Put destructive items last, after a separator, and confirm them with an [Alert dialog](./alert-dialog.md).
- Keep disabled items visible when their absence would confuse, and say why in the description.
- Show shortcuts only when they really work on the page.
- One level of submenu at most; never put the only copy of a frequent action in a submenu.
- Give icon-only triggers an `aria-label` that names the object: "Actions for INV-2026-0418".

## Accessibility

- Trigger: `aria-haspopup="menu"`, `aria-expanded`, `aria-controls` (added by script). Menu: `role="menu"` with a name (`aria-label` or `aria-labelledby`).
- Items are not in the Tab order (`tabindex="-1"`); focus moves inside with the arrow keys and returns to the trigger on close.
- Checkbox and radio items expose `aria-checked`; groups have a name from their visible label.
- Disabled items stay focusable with `aria-disabled="true"` so screen readers can read why.

| Key | Action |
| --- | --- |
| Enter / Space / ArrowDown on the trigger | Open, highlight the first item |
| ArrowUp on the trigger | Open, highlight the last item |
| ArrowDown / ArrowUp | Next / previous item (wraps around) |
| Home / End | First / last item |
| A–Z | Jump to the next item starting with the typed letters |
| Enter / Space | Activate the item (checkbox and radio items toggle and stay open) |
| ArrowRight (ArrowLeft in RTL) | Open the submenu and highlight its first item |
| ArrowLeft (ArrowRight in RTL) | Close the submenu, back to its item |
| Escape | Close one level and return focus |
| Tab | Close the menu and move on |

## Razor

```cshtml
<button type="button" class="btn btn-ghost" aria-haspopup="menu" popovertarget="row-@invoice.Id"
        aria-label="@($"Actions for {invoice.Number}")"><ds-icon name="more" /></button>

<ds-menu id="row-@invoice.Id" label="@($"Actions for {invoice.Number}")" align="end">
    <ds-menu-item icon="eye" href="@Url.Page("./Details", new { invoice.Id })">View invoice</ds-menu-item>
    <ds-menu-item icon="pencil" shortcut="E">Edit</ds-menu-item>
    <ds-menu-sub>
        <ds-menu-item icon="folder" submenu="move-@invoice.Id">Move to</ds-menu-item>
        <ds-menu id="move-@invoice.Id" label="Move to">
            @foreach (var p in Model.Projects) { <ds-menu-item value="@p.Code">@p.Code · @p.Name</ds-menu-item> }
        </ds-menu>
    </ds-menu-sub>
    <ds-menu-group label="Sort by">
        <ds-menu-item type="radio" checked value="newest">Newest first</ds-menu-item>
        <ds-menu-item type="radio" value="amount">Highest amount</ds-menu-item>
    </ds-menu-group>
    <ds-menu-separator />
    <ds-menu-item icon="send" disabled description="Available 3 days after the due date">Send reminder</ds-menu-item>
    <ds-menu-item icon="trash" danger>Delete</ds-menu-item>
</ds-menu>
```

`ds-menu-item` attributes: `icon`, `shortcut`, `description`, `href`, `value`, `type` (`item`, `checkbox`, `radio`),
`checked`, `disabled`, `danger`, `submenu`. `ds-menu`: `id`, `label`, `side`, `align`, `size`.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `popovertarget="id"` / `data-ds-menu-open="id"` on the trigger | Opens the menu next to the trigger |
| `data-ds-side`, `data-ds-align` on the menu | Preferred placement (`bottom` + `start` by default) |
| `data-value` on an item | Value in `ds:menu:select` |
| `data-ds-close="false"` / `"true"` | Keep the menu open after this item / close after a checkbox or radio item |
| `aria-controls` + `aria-haspopup="menu"` on an item | Submenu |

```js
document.addEventListener("ds:menu:select", (event) => {
  const { value, checked, context } = event.detail;
  if (event.target.closest("#menu-view")) table.sort(value);
});

DS.menu.open("menu-row");   // next to its trigger, first item highlighted
DS.menu.close("menu-row");
DS.menu.closeAll();
```

Events: `ds:menu:open`, `ds:menu:close` (on the menu), `ds:menu:select` (on the item; cancel it to keep the menu open).

## Tokens

`--ds-popover`, `--color-base-300`, `--ds-shadow-popover`, `--ds-radius-lg`, `--ds-radius-md`, `--ds-z-menu`,
`--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-disabled`, `--ds-error-text`, `--color-error`,
`--ds-primary-text`, `--ds-focus`, `--ds-subtle`, `--ds-muted`, `--ds-size-target`, `--ds-size-target-compact`,
`--ds-type-eyebrow-*`, `--ds-duration-quick`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`.
Script variables: `--ds-origin`, `--ds-trigger-width` (the menu is at least as wide as its trigger).

## Native and daisyUI

- HTML Popover API: without JavaScript the trigger still opens the menu (centred) and items still work; light dismiss and Escape are native.
- `<details data-ds-menu>` with `.ds-menu-panel` (version 1) keeps its behaviour from the shell script: outside press and Escape close it, one open at a time.
- daisyUI `.dropdown` and `.menu` remain available; `.ds-menu` adds the ARIA menu pattern, placement and the state design. daisyUI `.menu` is a navigation list, not an ARIA menu; use it for sidebars, not for action menus.
