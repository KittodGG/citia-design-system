---
title: Toggle group
group: components
category: actions
order: 7
summary: A set of toggles where one (single) or several (multiple) can be on. Roving focus, arrow keys, radiogroup or toolbar semantics, form value.
---

A toggle group is a row of [toggles](./toggle.md) that belong together: a view switcher (list, grid), a text-format bar (bold, italic, underline), a filter of statuses. In single mode exactly one item is on, like a radio group. In multiple mode any number are on. For choosing between page sections use [tabs](./tabs.md), for a switcher that animates an indicator use a [segmented control](./segmented-control.md), and for plain actions use a [button group](./button-group.md).

## Examples

### Single

One item is always on. Arrow keys move and select, Tab enters on the selected item.

```html preview title="Single, radiogroup"
<div class="ds-toggle-group" data-ds-toggle-group="single" role="radiogroup" aria-label="Report period">
  <button type="button" class="ds-toggle" role="radio" aria-checked="false" data-value="week">Week</button>
  <button type="button" class="ds-toggle" role="radio" aria-checked="true" data-value="month">Month</button>
  <button type="button" class="ds-toggle" role="radio" aria-checked="false" data-value="quarter">Quarter</button>
  <button type="button" class="ds-toggle" role="radio" aria-checked="false" data-value="year">Year</button>
</div>
```

### With icons

Icon-only items need `aria-label`.

```html preview title="View switcher"
<div class="ds-toggle-group" data-ds-toggle-group="single" role="radiogroup" aria-label="View">
  <button type="button" class="ds-toggle is-icon" role="radio" aria-checked="true" data-value="list" aria-label="List view" title="List view"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-list"></use></svg></button>
  <button type="button" class="ds-toggle is-icon" role="radio" aria-checked="false" data-value="grid" aria-label="Grid view" title="Grid view"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-layout-grid"></use></svg></button>
  <button type="button" class="ds-toggle is-icon" role="radio" aria-checked="false" data-value="board" aria-label="Board view" title="Board view"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-kanban"></use></svg></button>
</div>
```

### Multiple

Any number can be on. The group is a `toolbar`: arrow keys move focus, Space toggles.

```html preview title="Multiple, toolbar"
<div class="ds-toggle-group" data-ds-toggle-group="multiple" role="toolbar" aria-label="Text formatting">
  <button type="button" class="ds-toggle is-icon" aria-pressed="true" aria-label="Bold" title="Bold"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bold"></use></svg></button>
  <button type="button" class="ds-toggle is-icon" aria-pressed="false" aria-label="Italic" title="Italic"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-italic"></use></svg></button>
  <button type="button" class="ds-toggle is-icon" aria-pressed="true" aria-label="Underline" title="Underline"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-underline"></use></svg></button>
</div>
```

### Deselectable single

`data-ds-deselectable` lets the user clear the choice. Items use `aria-pressed` and the group is a plain `group`.

```html preview title="Single, can be cleared"
<div class="ds-toggle-group" data-ds-toggle-group="single" data-ds-deselectable role="group" aria-label="Status filter">
  <button type="button" class="ds-toggle" aria-pressed="false" data-value="draft">Draft</button>
  <button type="button" class="ds-toggle" aria-pressed="true" data-value="sent">Sent</button>
  <button type="button" class="ds-toggle" aria-pressed="false" data-value="paid">Paid</button>
</div>
```

### Spaced, vertical, sizes

`is-spaced` separates the items, `is-vertical` stacks them. Set the size on each item.

```html preview title="Spaced, vertical, small"
<div class="ds-actions is-start" style="align-items:start;gap:2rem">
  <div class="ds-toggle-group is-spaced" data-ds-toggle-group="multiple" role="toolbar" aria-label="Show columns">
    <button type="button" class="ds-toggle is-outlined" aria-pressed="true">Client</button>
    <button type="button" class="ds-toggle is-outlined" aria-pressed="true">Amount</button>
    <button type="button" class="ds-toggle is-outlined" aria-pressed="false">Due date</button>
  </div>
  <div class="ds-toggle-group is-vertical" data-ds-toggle-group="single" role="radiogroup" aria-label="Sort by" aria-orientation="vertical">
    <button type="button" class="ds-toggle is-sm" role="radio" aria-checked="true" data-value="date">Date</button>
    <button type="button" class="ds-toggle is-sm" role="radio" aria-checked="false" data-value="amount">Amount</button>
    <button type="button" class="ds-toggle is-sm" role="radio" aria-checked="false" data-value="client">Client</button>
  </div>
</div>
```

### Form value

`data-ds-name` posts the selection as hidden inputs placed after the group: one input for single, one per selected item for multiple. ASP.NET binds multiple values to a `List<string>`.

```html preview title="Posts view=month"
<form method="get" class="ds-actions is-start" style="align-items:center">
  <div class="ds-toggle-group" data-ds-toggle-group="single" data-ds-name="period" role="radiogroup" aria-label="Period">
    <button type="button" class="ds-toggle" role="radio" aria-checked="false" data-value="week">Week</button>
    <button type="button" class="ds-toggle" role="radio" aria-checked="true" data-value="month">Month</button>
  </div>
  <button type="submit" class="btn btn-sm">Apply</button>
</form>
```

## States

```html preview title="Group item states"
<div style="display:grid;gap:.75rem;justify-items:start">
  <div class="ds-toggle-group" data-ds-toggle-group="multiple" data-ds-roving="false" role="group" aria-label="Pointer and keyboard states">
    <button type="button" class="ds-toggle" aria-pressed="false">Rest</button>
    <button type="button" class="ds-toggle" aria-pressed="false" data-ds-demo="hover">Hover</button>
    <button type="button" class="ds-toggle" aria-pressed="false" data-ds-demo="focus">Focus</button>
    <button type="button" class="ds-toggle" aria-pressed="false" data-ds-demo="pressed">Pressed</button>
    <button type="button" class="ds-toggle" aria-pressed="true">On</button>
  </div>
  <div class="ds-toggle-group" data-ds-toggle-group="multiple" data-ds-roving="false" role="group" aria-label="Availability and activity">
    <button type="button" class="ds-toggle" aria-pressed="true">On</button>
    <button type="button" class="ds-toggle" aria-pressed="false" disabled>Disabled</button>
    <button type="button" class="ds-toggle" aria-pressed="false" aria-disabled="true" title="Needs the Pro plan">aria-disabled</button>
    <button type="button" class="ds-toggle" aria-pressed="false" aria-busy="true">Loading</button>
  </div>
  <div class="ds-toggle-group" data-ds-toggle-group="single" role="radiogroup" aria-label="Filled tone">
    <button type="button" class="ds-toggle is-filled" role="radio" aria-checked="true" data-value="a">Filled on</button>
    <button type="button" class="ds-toggle is-filled" role="radio" aria-checked="false" data-value="b">Filled off</button>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest (off) | `aria-pressed="false"` or `aria-checked="false"` | Outlined item sharing edges with its neighbours |
| Hover | Pointer over an item | State layer 6%; the item is raised above its neighbours |
| Focus-visible | Keyboard focus | 2px `--ds-focus` ring above all items; the roving stop is the only tab stop |
| Pressed | Pointer down | Layer 10%, scale 0.97 over 120ms |
| On | `aria-pressed="true"` or `aria-checked="true"` | 12% primary tint, primary text, 2px edge |
| Disabled | `disabled` | 55% opacity; skipped by arrow keys |
| aria-disabled | `aria-disabled="true"` | Same look; click ignored; skipped by arrow keys. In `data-ds-roving="false"` groups it is a tab stop, so its reason can be read |
| Loading | `aria-busy="true"` | Spinner on that item; its click is ignored |
| Group, vertical | `is-vertical`, `aria-orientation="vertical"` | Items stack; Up and Down arrows navigate |
| RTL | `dir="rtl"` | Order and radii mirror; Left and Right arrows swap |
| Reduced motion | `prefers-reduced-motion` | No press scale |

## Anatomy

- `.ds-toggle-group`: container. Modifiers `is-spaced`, `is-vertical`.
- `data-ds-toggle-group="single|multiple"`: mode. `data-ds-deselectable`, `data-ds-name`, `data-ds-roving="false"`.
- Items: `.ds-toggle` (or `[data-ds-toggle-item]`) with `data-value`; `role="radio"` and `aria-checked` in a radio group, `aria-pressed` elsewhere.
- Hidden inputs `input[data-ds-toggle-input]` after the group when `data-ds-name` is set.

## Usage

- Use two to six items. For more, use a [select](./select.md) or [combobox](./combobox.md).
- Choose single when exactly one item must be on, multiple when any combination is valid, deselectable single when "none" is a valid choice.
- Keep every label under about 16 characters, or use icon-only items with a title.
- Always set an `aria-label` on the group.
- Do not use a toggle group to switch content panels; use [tabs](./tabs.md). Do not mix text and icon-only items in one group.

## Accessibility

- Single mode follows the radio group pattern: `role="radiogroup"`, items `role="radio"` with `aria-checked`, the selected item (or the first, if none) is the only tab stop, arrow keys move focus and select.
- Multiple mode follows the toolbar pattern: `role="toolbar"`, items `aria-pressed`, one tab stop, arrow keys move focus only.
- Deselectable single and `data-ds-roving="false"` groups render `role="group"` with every item in the tab order.
- Disabled and `aria-disabled` items are skipped by arrow keys.
- Name the group with `aria-label` or `aria-labelledby`. Icon-only items need an `aria-label`.
- Contrast and targets follow the [toggle](./toggle.md): 4.5:1 for labels, 3:1 for edges, 44px hit area on touch screens.

| Key | Action |
| --- | --- |
| Tab, Shift+Tab | Enter or leave the group (one stop) |
| ArrowRight, ArrowDown | Next item; in single mode also selects it. Wraps |
| ArrowLeft, ArrowUp | Previous item; in single mode also selects it. Wraps |
| Home, End | First or last enabled item |
| Space, Enter | Toggle the focused item (multiple, deselectable) or select it (single) |

In a vertical group only Up and Down move focus in multiple mode; in right-to-left pages Left and Right swap.

## Razor

```cshtml
<ds-toggle-group type="single" label="Report period" name="period" value="@Model.Period" size="sm">
    <ds-toggle-item value="week">Week</ds-toggle-item>
    <ds-toggle-item value="month">Month</ds-toggle-item>
    <ds-toggle-item value="quarter">Quarter</ds-toggle-item>
</ds-toggle-group>

<ds-toggle-group type="multiple" label="Text formatting" value="bold,underline">
    <ds-toggle-item value="bold" icon="bold" label="Bold" />
    <ds-toggle-item value="italic" icon="italic" label="Italic" />
    <ds-toggle-item value="underline" icon="underline" label="Underline" />
</ds-toggle-group>
```

| Attribute (group) | Effect |
| --- | --- |
| `type` | `single` (default) or `multiple` |
| `label` | Accessible name of the group (required) |
| `name`, `value` | Form field name and selected value (comma-separated for multiple); renders hidden inputs |
| `size`, `variant` | Item size; `outlined` (default), `tonal`, `filled` |
| `spaced`, `vertical`, `deselectable` | Layout and clearing |

Items take `value`, `icon`, `label` (icon-only name), `selected`, `disabled`, `disabled-reason`.

## JavaScript

| Attribute or API | Effect |
| --- | --- |
| `[data-ds-toggle-group]` | Sets roles, roving tabindex and hidden inputs on load; handles click and keys |
| `data-ds-roving="false"` | Leaves every item in the tab order and uses `role="group"` |
| `data-ds-deselectable` | Single mode where the selected item can be cleared |
| `data-ds-name` | Field name for the hidden inputs |
| `DS.toggle.group.get(group)` | Returns `{ value, values }` |
| `DS.toggle.group.set(group, valueOrValues)` | Sets the selection and fires the event |

Event `ds:toggle:change` bubbles from the group with `detail.value`, `detail.values` and `detail.item`.

```js
document.querySelector("#period").addEventListener("ds:toggle:change", (event) => {
  loadReport(event.detail.value);
});
```

## Tokens

The [toggle](./toggle.md) tokens, plus `--ds-border-hairline`, `--ds-control-border`, `--ds-radius-md|lg|box` and `--ds-space-2` (spaced gap).

## Native and daisyUI

The group is a `div` with ARIA roles over native `button` elements, so it works as a form control only through the hidden inputs. daisyUI `join` and `filter` provide similar layouts; the DS group adds the radio and toolbar semantics, roving focus and the form value.
