---
title: Toolbar
group: components
category: layout
order: 4
summary: An ARIA toolbar of grouped controls with one tab stop, arrow-key navigation, separators and an overflow menu for items that do not fit.
source: TPS app.css L240–246 (.page-toolbar)
---

A toolbar gathers the frequent actions of one area (an editor, a table, a canvas) into a single row. Use it when there are 4 or more related controls. For one or two actions use buttons in the [Page header](./page-header.md); for mutually exclusive choices use a [Segmented control](./segmented-control.md).

> [!NOTE]
> The version 1 `.ds-toolbar` (text on the start side, actions on the end side) still works when the element has no `role="toolbar"`.

## Examples

### Groups and separators

```html preview title="Formatting toolbar"
<div class="ds-toolbar" role="toolbar" aria-label="Text formatting">
  <div class="ds-toolbar__group" role="group" aria-label="Style">
    <button type="button" class="ds-toolbar__item" aria-pressed="true" aria-label="Bold"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bold"/></svg></button>
    <button type="button" class="ds-toolbar__item" aria-pressed="false" aria-label="Italic"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-italic"/></svg></button>
    <button type="button" class="ds-toolbar__item" aria-pressed="false" aria-label="Underline"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-underline"/></svg></button>
  </div>
  <div class="ds-toolbar__separator" role="separator"></div>
  <div class="ds-toolbar__group" role="group" aria-label="Lists">
    <button type="button" class="ds-toolbar__item" aria-label="Bulleted list"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-list"/></svg></button>
    <button type="button" class="ds-toolbar__item" aria-label="Numbered list"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-list-ordered"/></svg></button>
  </div>
  <div class="ds-toolbar__spacer"></div>
  <button type="button" class="ds-toolbar__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-save"/></svg>Save</button>
</div>
```

### Overflow menu

Add `data-ds-toolbar-overflow`. Items that do not fit move, in order, into a "More actions" menu and come back when there is room. Resize the window to see it.

```html preview title="Toolbar with overflow"
<div style="max-width: 24rem; resize: horizontal; overflow: hidden; padding-bottom: 0.25rem">
  <div class="ds-toolbar" role="toolbar" aria-label="Table actions" data-ds-toolbar-overflow>
    <button type="button" class="ds-toolbar__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"/></svg>New</button>
    <button type="button" class="ds-toolbar__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-filter"/></svg>Filter</button>
    <button type="button" class="ds-toolbar__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"/></svg>Export</button>
    <button type="button" class="ds-toolbar__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-printer"/></svg>Print</button>
    <button type="button" class="ds-toolbar__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-archive"/></svg>Archive</button>
  </div>
</div>
```

### Vertical and flat

```html preview title="Vertical toolbar"
<div class="ds-toolbar is-vertical" role="toolbar" aria-orientation="vertical" aria-label="Canvas tools">
  <button type="button" class="ds-toolbar__item" aria-pressed="true" aria-label="Move"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-move"/></svg></button>
  <button type="button" class="ds-toolbar__item" aria-pressed="false" aria-label="Zoom in"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-zoom-in"/></svg></button>
  <div class="ds-toolbar__separator" role="separator"></div>
  <button type="button" class="ds-toolbar__item" aria-label="Undo"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-undo"/></svg></button>
  <button type="button" class="ds-toolbar__item" aria-label="Redo" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-redo"/></svg></button>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | none | Transparent item on the toolbar surface |
| Hover | Pointer over an item (hover devices) | State layer 6% |
| Pressed | Pointer down | State layer 10%, scale 0.97 |
| Focus-visible | Keyboard focus on the one tab stop | 2px ring `--ds-focus`, 2px offset |
| On (toggle) | `aria-pressed="true"`, `aria-checked="true"` | Primary tonal fill and primary text |
| Disabled | `disabled` | Opacity 0.55, `not-allowed`, skipped by arrow keys |
| aria-disabled | `aria-disabled="true"` | Same look, stays reachable so a tooltip can explain why |
| Busy | `aria-busy="true"` on an item | Pointer events blocked; show a spinner before the label |
| Overflow | Items do not fit | Trailing items move into the More actions menu |
| Menu open | `:popover-open` | Panel fades in with a 5px move from the button, 160ms; leaves in 140ms |

## Anatomy

- `.ds-toolbar[role="toolbar"]`: the row. Modifiers `.is-vertical`, `.is-flat` (no frame).
- `.ds-toolbar__group[role="group"]`: related items; give it `aria-label`.
- `.ds-toolbar__item`: button, toggle or link. Icon-only items need `aria-label`.
- `.ds-toolbar__separator`, `.ds-toolbar__spacer`, `.ds-toolbar__title`.
- `.ds-toolbar__overflow-menu`, `.ds-toolbar__overflow` (popover): created by script.

## Usage

- Put 4 to 12 items in one toolbar; group by task with a separator between groups (2 to 5 items per group).
- Order from most to least frequent; keep destructive actions apart and last.
- Icon-only items for universally known actions; add a text label for anything else.
- Do not mix unrelated actions of different areas in one toolbar.
- Do not hide the only way to do something in the overflow menu; also offer it elsewhere on touch screens.

## Accessibility

- `role="toolbar"` with `aria-label` (and `aria-orientation="vertical"` when stacked). Groups use `role="group"`; separators `role="separator"`.
- One tab stop: the last focused item keeps `tabindex="0"`, the others `-1` (roving tabindex). Tab leaves the toolbar.
- Toggle buttons use `aria-pressed`; items in the overflow menu keep their state and handlers because the same elements move.
- Targets are 36px with a 44px hit area on touch; contrast of icons is 3:1 and text 4.5:1.
- Reduced motion: the menu cross-fades, no movement; press scale is removed.

| Key | Action |
| --- | --- |
| Tab | Enter or leave the toolbar (one stop) |
| Right, Left | Next, previous item (swapped in right-to-left languages); vertical toolbars use Down, Up |
| Home, End | First, last item |
| Enter, Space | Activate the item |
| Down, Up (in the overflow menu) | Next, previous entry |
| Escape | Close the overflow menu and return to its button |

## Razor

```cshtml
<ds-toolbar label="Table actions" overflow>
    <ds-toolbar-group label="Rows">
        <button type="button" class="ds-toolbar__item">New</button>
        <button type="button" class="ds-toolbar__item">Archive</button>
    </ds-toolbar-group>
    <ds-toolbar-separator />
    <ds-toolbar-spacer />
    <button type="button" class="ds-toolbar__item">Export</button>
</ds-toolbar>
```

Attributes: `label` (default "Toolbar"), `overflow`, `vertical`, `flat`.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `role="toolbar"` | Roving focus and arrow keys |
| `data-ds-toolbar-overflow` | Moves items that do not fit into a "More actions" menu (watches the width with `ResizeObserver`) |

Call `DS.init(root)` after inserting a toolbar. Strings: `toolbar.more`.

## Tokens

`--ds-size-target-compact`, `--ds-radius-lg`, `--ds-radius-box`, `--ds-opacity-state-*`, `--ds-press-scale`, `--ds-focus`, `--ds-shadow-popover`, `--ds-enter-offset`, `--ds-duration-fast|instant|quick|exit`.

## Native and daisyUI

Built on `button` and the native popover API. It does not use daisyUI `join` or `btn`; items are flat so a row of them reads as one control.
