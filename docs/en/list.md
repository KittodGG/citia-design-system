---
title: List
group: components
category: data-display
order: 10
summary: Rows of people, files, projects or events with a leading avatar or icon, title, supporting text, meta and a trailing action. Plain, interactive and selectable.
source: TPS app.css .ds-feed and .pt-card lists, Material 3 lists, Tailwind UI stacked lists
---

A list shows a short series of records as rows: one title, optional supporting text, a time or amount, and one action. Use it for people, projects, files, recent activity and settings rows. Use a [table](./table.md) when rows share several columns that people compare, a [tree view](./tree-view.md) for nested data, and a [timeline](./timeline.md) when order in time is the point.

## Examples

```html preview title="Simple list with avatar, meta and action"
<div class="ds-card" style="max-width:36rem">
  <ul class="ds-list">
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-avatar c0 is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title">Ayu Lestari</p>
        <p class="ds-list__text">Product designer, Jakarta</p>
      </div>
      <span class="ds-list__meta">Active now</span>
      <span class="ds-list__trail"><button type="button" class="ds-icon-btn" aria-label="Actions for Ayu Lestari"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button></span>
    </li>
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-avatar c1 is-round" role="img" aria-label="Daniel Okafor"><span aria-hidden="true">DO</span></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title">Daniel Okafor</p>
        <p class="ds-list__text">Backend engineer, Lagos</p>
      </div>
      <span class="ds-list__meta">2 h ago</span>
      <span class="ds-list__trail"><button type="button" class="ds-icon-btn" aria-label="Actions for Daniel Okafor"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button></span>
    </li>
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-avatar c5 is-round" role="img" aria-label="Mei Tanaka"><span aria-hidden="true">MT</span></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title">Mei Tanaka</p>
        <p class="ds-list__text">Finance lead, Osaka</p>
      </div>
      <span class="ds-list__meta">Yesterday</span>
      <span class="ds-list__trail"><button type="button" class="ds-icon-btn" aria-label="Actions for Mei Tanaka"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button></span>
    </li>
  </ul>
</div>
```

```html preview title="Icon lead, amount and pill"
<div class="ds-card" style="max-width:36rem">
  <ul class="ds-list">
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-list__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"></use></svg></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title">INV-2026-0418</p>
        <p class="ds-list__text">Kintara Studio, due 14 Nov 2026</p>
      </div>
      <span class="ds-list__meta"><span class="ds-num" style="display:block;color:var(--color-base-content);font-weight:650">USD 4,280.00</span><span class="ds-pill is-success">Paid</span></span>
    </li>
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-list__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"></use></svg></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title">INV-2026-0419</p>
        <p class="ds-list__text">Marquez Logistics, due 21 Nov 2026</p>
      </div>
      <span class="ds-list__meta"><span class="ds-num" style="display:block;color:var(--color-base-content);font-weight:650">EUR 1,150.50</span><span class="ds-pill is-warning">Due soon</span></span>
    </li>
  </ul>
</div>
```

```html preview title="Interactive rows (links)"
<div class="ds-card" style="max-width:36rem">
  <ul class="ds-list">
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-list__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"></use></svg></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title"><a class="ds-list__link" href="#">PRJ-1024 Website relaunch</a></p>
        <p class="ds-list__text">12 tasks open, owner Ayu Lestari</p>
      </div>
      <span class="ds-list__trail"><svg class="ds-icon ds-list__chevron" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></span>
    </li>
    <li class="ds-list__item" aria-current="page">
      <span class="ds-list__lead"><span class="ds-list__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"></use></svg></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title"><a class="ds-list__link" href="#" aria-current="page">PRJ-1031 Mobile app</a></p>
        <p class="ds-list__text">4 tasks open, owner Daniel Okafor</p>
      </div>
      <span class="ds-list__trail"><svg class="ds-icon ds-list__chevron" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></span>
    </li>
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-list__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"></use></svg></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title"><a class="ds-list__link" href="#">PRJ-1040 Annual report</a></p>
        <p class="ds-list__text">Draft, owner Mei Tanaka</p>
      </div>
      <span class="ds-list__trail"><button type="button" class="ds-icon-btn" aria-label="Archive PRJ-1040"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-archive"></use></svg></button><svg class="ds-icon ds-list__chevron" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></span>
    </li>
  </ul>
</div>
```

The link stretches over the whole row (`.ds-list__link::after`), while buttons in `.ds-list__trail` stay clickable. A row that is only a link or button can also be the item itself: `<a class="ds-list__item" href="…">`.

```html preview title="Selectable list: single choice (listbox)"
<div class="ds-card" style="max-width:30rem">
  <ul class="ds-list" role="listbox" aria-label="Billing contact" data-ds-listbox data-ds-name="contact">
    <li class="ds-list__item" role="option" data-value="ayu" aria-selected="true">
      <span class="ds-list__lead"><span class="ds-avatar c0 is-round" aria-hidden="true">AL</span></span>
      <div class="ds-list__body"><p class="ds-list__title">Ayu Lestari</p><p class="ds-list__text">ayu@kintara.example</p></div>
      <span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span>
    </li>
    <li class="ds-list__item" role="option" data-value="daniel" aria-selected="false">
      <span class="ds-list__lead"><span class="ds-avatar c1 is-round" aria-hidden="true">DO</span></span>
      <div class="ds-list__body"><p class="ds-list__title">Daniel Okafor</p><p class="ds-list__text">daniel@okafor.example</p></div>
      <span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span>
    </li>
    <li class="ds-list__item" role="option" data-value="mei" aria-selected="false" aria-disabled="true">
      <span class="ds-list__lead"><span class="ds-avatar c5 is-round" aria-hidden="true">MT</span></span>
      <div class="ds-list__body"><p class="ds-list__title">Mei Tanaka</p><p class="ds-list__text">On leave until 3 Dec</p></div>
      <span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span>
    </li>
    <li class="ds-list__item" role="option" data-value="sofia" aria-selected="false">
      <span class="ds-list__lead"><span class="ds-avatar c3 is-round" aria-hidden="true">SM</span></span>
      <div class="ds-list__body"><p class="ds-list__title">Sofia Marquez</p><p class="ds-list__text">sofia@marquez.example</p></div>
      <span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span>
    </li>
  </ul>
</div>
```

```html preview title="Selectable list: several choices (listbox and checkboxes)"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));max-width:44rem">
  <div class="ds-card">
    <ul class="ds-list is-dense" role="listbox" aria-label="Notify" aria-multiselectable="true" data-ds-listbox>
      <li class="ds-list__item" role="option" data-value="mail" aria-selected="true"><div class="ds-list__body"><p class="ds-list__title">Email</p></div><span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span></li>
      <li class="ds-list__item" role="option" data-value="push" aria-selected="true"><div class="ds-list__body"><p class="ds-list__title">Push</p></div><span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span></li>
      <li class="ds-list__item" role="option" data-value="sms" aria-selected="false"><div class="ds-list__body"><p class="ds-list__title">SMS</p></div><span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span></li>
    </ul>
  </div>
  <div class="ds-card">
    <ul class="ds-list is-dense" aria-label="Weekly digest on">
      <li><label class="ds-list__item"><span class="ds-list__lead"><input type="checkbox" class="checkbox checkbox-sm" checked></span><div class="ds-list__body"><p class="ds-list__title">Monday</p></div></label></li>
      <li><label class="ds-list__item"><span class="ds-list__lead"><input type="checkbox" class="checkbox checkbox-sm"></span><div class="ds-list__body"><p class="ds-list__title">Wednesday</p></div></label></li>
      <li><label class="ds-list__item"><span class="ds-list__lead"><input type="checkbox" class="checkbox checkbox-sm" disabled></span><div class="ds-list__body"><p class="ds-list__title">Friday</p></div></label></li>
    </ul>
  </div>
</div>
```

```html preview title="Dense, boxed, plain and with a heading"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));max-width:44rem">
  <ul class="ds-list is-dense is-boxed">
    <li class="ds-list__heading" role="presentation">Shared files</li>
    <li class="ds-list__item"><span class="ds-list__lead"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg></span><div class="ds-list__body"><p class="ds-list__title">Proposal v3.pdf</p></div><span class="ds-list__meta">2.4 MB</span></li>
    <li class="ds-list__item"><span class="ds-list__lead"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg></span><div class="ds-list__body"><p class="ds-list__title">Budget 2027.xlsx</p></div><span class="ds-list__meta">310 KB</span></li>
  </ul>
  <ul class="ds-list is-plain">
    <li class="ds-list__item"><div class="ds-list__body"><p class="ds-list__title">Sync every 15 minutes</p><p class="ds-list__text">Pulls new records from the accounting system.</p></div></li>
    <li class="ds-list__item"><div class="ds-list__body"><p class="ds-list__title">Keep deleted records for 30 days</p><p class="ds-list__text">Restore them from the archive.</p></div></li>
  </ul>
</div>
```

## States

```html preview title="Selected, current, disabled, loading and empty"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));max-width:56rem">
  <ul class="ds-list is-boxed" aria-label="Item states">
    <li class="ds-list__item is-selected"><div class="ds-list__body"><p class="ds-list__title">Selected row</p><p class="ds-list__text">Tonal fill, 3px edge, accent title</p></div></li>
    <li class="ds-list__item" aria-current="true"><div class="ds-list__body"><p class="ds-list__title">Current row</p><p class="ds-list__text">aria-current marks where you are</p></div></li>
    <li class="ds-list__item" aria-disabled="true"><div class="ds-list__body"><p class="ds-list__title">Disabled row</p><p class="ds-list__text">Archived, read only</p></div></li>
  </ul>
  <ul class="ds-list is-boxed" aria-busy="true" aria-label="Loading">
    <li class="ds-list__item is-skeleton"><span class="ds-list__lead"><span class="ds-cell-skeleton is-avatar"></span></span><div class="ds-list__body"><span class="ds-cell-skeleton" style="--ds-skeleton-w:45%"></span><span class="ds-cell-skeleton" style="--ds-skeleton-w:70%;margin-top:.5rem"></span></div></li>
    <li class="ds-list__item is-skeleton"><span class="ds-list__lead"><span class="ds-cell-skeleton is-avatar"></span></span><div class="ds-list__body"><span class="ds-cell-skeleton" style="--ds-skeleton-w:55%"></span><span class="ds-cell-skeleton" style="--ds-skeleton-w:35%;margin-top:.5rem"></span></div></li>
  </ul>
  <div class="ds-card"><p class="ds-list__empty">No members yet. Invite a teammate to start.</p></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | Transparent row, hairline divider at 70% of `--color-base-300` |
| Hover | Pointer over an interactive row | Content colour at `--ds-opacity-state-hover`; the chevron moves 2px |
| Pressed | `:active` | State layer at `--ds-opacity-state-pressed` |
| Focus-visible | Keyboard focus on the row or its link | 2px `--ds-focus` ring inside the row |
| Selected | `aria-selected="true"`, `.is-selected` or a checked box | Primary tint at `--ds-opacity-state-selected`, 3px primary edge, accent title; options also show a check |
| Current | `aria-current` | Same as selected |
| Disabled | `aria-disabled="true"` or a disabled input | `--ds-opacity-disabled`, `cursor: not-allowed`, no hover |
| Loading | `.is-skeleton` rows in `aria-busy="true"` | Skeleton bars; the list keeps its row height |
| Empty | No items | `.ds-list__empty` text and, when there is an action, an [empty state](./empty-state.md) |
| Long text | Title or text longer than the row | Wraps; `.is-clamp` on the text limits it to 2 lines |

## Anatomy

- `.ds-list` (`ul`, or `div` with `role="list"`) with `is-dense`, `is-boxed`, `is-plain`.
- `.ds-list__item` row (`li`, `a`, `button` or `label`); `is-selected`, `is-centered`, `is-skeleton`.
- `.ds-list__lead` avatar, `.ds-list__icon` (tonal square), `.ds-list__thumb` (image) or a checkbox.
- `.ds-list__body` with `.ds-list__title` and `.ds-list__text`.
- `.ds-list__meta` time or amount, `.ds-list__trail` actions, `.ds-list__chevron`, `.ds-list__tick` (option check).
- `.ds-list__link` stretched link, `.ds-list__heading` group heading, `.ds-list__empty` empty text.
- `.ds-list-container` makes the meta fall under the text when the list is narrower than 22rem.

## Usage

- Keep the title to one line of meaning (a name, a code) and the supporting text to one or two lines.
- Show one trailing action per row. Put more in a menu behind a `more` icon button.
- Use 44px rows (the default) for touch; `is-dense` is 36px and belongs on desktop tools.
- Do not use colour alone to mark the selected row: the edge, the bolder title and the check stay in forced-colours mode.
- Do not nest interactive elements inside a link row. Use the stretched `.ds-list__link` pattern when the row also needs buttons.
- Prefer a [table](./table.md) over a list once rows have 3 or more comparable values.

## Accessibility

- A plain list is a `ul`; a decorative divider needs no role. Selectable lists use `role="listbox"` with `role="option"` rows, an `aria-label` and `aria-selected`; `aria-multiselectable="true"` for several.
- Checkbox lists use real `input type="checkbox"` inside the row `label`, so the whole row toggles and the state is native.
- Icon-only buttons in the trail need `aria-label` that names the record.
- Rows are at least 44px high with coarse pointers and 36px otherwise (24px minimum target is always met).
- Text keeps 4.5:1 on hover, selected and disabled tints.

| Key | Action |
| --- | --- |
| Tab | Moves to the next link, button or checkbox (a listbox is one tab stop) |
| Arrow Up, Arrow Down | Listbox: moves focus between options |
| Home, End | Listbox: first and last option |
| Space, Enter | Listbox: selects (toggles in a multiple list) |
| Shift+Arrow, Shift+click | Multiple listbox: extends the selection |
| Ctrl+A or Cmd+A | Multiple listbox: selects all |
| Letters | Listbox: jumps to the option that starts with what you type |

## Razor

Lists are plain markup; there is no tag helper. Render rows from your model:

```cshtml
<ul class="ds-list">
  @foreach (var person in Model.People)
  {
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-avatar @Avatar.ColorClass(person.Name) is-round" aria-hidden="true">@Avatar.Initials(person.Name)</span></span>
      <div class="ds-list__body">
        <p class="ds-list__title">@person.Name</p>
        <p class="ds-list__text">@person.Role</p>
      </div>
      <span class="ds-list__meta">@Fmt.Date(person.LastSeen)</span>
    </li>
  }
</ul>
```

## JavaScript

Only listboxes need script (`selection.js`).

| Attribute | Effect |
| --- | --- |
| `data-ds-listbox` | Wires roving focus, selection and type-ahead on a `role="listbox"` element |
| `data-ds-name="field"` | Keeps hidden inputs for the selected `data-value` values so the list posts with a form |
| `data-ds-listbox-follow` | Single list: selection follows focus |
| `data-value` | Value of an option (falls back to its text) |

Event `ds:listbox:change` bubbles from the list with `detail: { values, items }`.

## Tokens

`--ds-list-pad-y`, `--ds-list-pad-x` (set by `is-dense`), `--ds-size-target`, `--ds-radius-box`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-state-selected`, `--ds-opacity-disabled`, `--ds-border-accent`, `--ds-focus`, `--ds-subtle`.

## Native and daisyUI

Builds on `ul`, `li`, `a`, `button` and `label`. daisyUI `list` and `list-row` are not used; the DS rows add the same lead, body and trail areas plus the interactive, selected and listbox states.
