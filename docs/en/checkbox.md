---
title: Checkbox
group: components
category: forms
order: 20
summary: A square control for an on/off choice that takes effect on submit, for picking several options, and for a select-all parent in mixed state.
source: TPS app.css L1890–1975 (.ds-check-row, .ds-choice)
---

A checkbox turns one option on or off, and the choice takes effect when the form is submitted. Use a group of checkboxes when people can pick several options. For a setting that applies at once, use a [Switch](./switch.md). For exactly one option out of a list, use a [Radio group](./radio-group.md). With more than 7 options, use a [Multi-select](./multi-select.md).

## Examples

### With a label and a description

Wrap the control and its text in `label.ds-check-row`. The whole row is the hit area (44px tall), the title is `strong` and the description is `small`.

```html preview title="Checkbox rows"
<div class="ds-choice-group__items">
  <label class="ds-check-row">
    <input type="checkbox" class="checkbox" name="Notify" value="true" checked aria-describedby="cb-notify-desc">
    <span><strong>Email me when an invoice is paid</strong><small id="cb-notify-desc">One message per payment, sent to ayu.lestari@example.com.</small></span>
  </label>
  <label class="ds-check-row">
    <input type="checkbox" class="checkbox" name="Digest" value="true">
    <span><strong>Weekly summary</strong></span>
  </label>
</div>
```

### Group with a select-all parent

`data-ds-check-all` on the parent takes a CSS selector (or uses the ids in `aria-controls`). The parent shows the mixed state while only some children are checked, and checks or clears all of them.

```html preview title="Select all"
<fieldset class="ds-checkbox-group">
  <legend>Export columns</legend>
  <label class="ds-check-row">
    <input type="checkbox" class="checkbox" data-ds-check-all="[name=Columns]" aria-controls="cb-col-1 cb-col-2 cb-col-3">
    <span><strong>All columns</strong></span>
  </label>
  <div class="ds-choice-group__items" style="padding-inline-start: 2rem">
    <label class="ds-check-row"><input id="cb-col-1" type="checkbox" class="checkbox" name="Columns" value="invoice" checked><span>Invoice number</span></label>
    <label class="ds-check-row"><input id="cb-col-2" type="checkbox" class="checkbox" name="Columns" value="customer" checked><span>Customer</span></label>
    <label class="ds-check-row"><input id="cb-col-3" type="checkbox" class="checkbox" name="Columns" value="amount"><span>Amount</span></label>
  </div>
</fieldset>
```

### Horizontal group

```html preview title="Horizontal"
<fieldset class="ds-checkbox-group is-horizontal">
  <legend>Working days</legend>
  <div class="ds-choice-group__items">
    <label class="ds-check-row"><input type="checkbox" class="checkbox" name="Days" value="mon" checked><span>Monday</span></label>
    <label class="ds-check-row"><input type="checkbox" class="checkbox" name="Days" value="tue" checked><span>Tuesday</span></label>
    <label class="ds-check-row"><input type="checkbox" class="checkbox" name="Days" value="wed" checked><span>Wednesday</span></label>
    <label class="ds-check-row"><input type="checkbox" class="checkbox" name="Days" value="thu"><span>Thursday</span></label>
    <label class="ds-check-row"><input type="checkbox" class="checkbox" name="Days" value="fri"><span>Friday</span></label>
  </div>
</fieldset>
```

### Card checkboxes

`label.ds-choice` makes the whole card the label. Use cards when each option needs a sentence of explanation and there are 2 to 6 options. Add `.is-end` to put the control at the end.

```html preview title="Card checkboxes"
<div class="ds-choice-grid is-2">
  <label class="ds-choice">
    <input type="checkbox" class="checkbox" name="Modules" value="billing" checked>
    <span><strong>Billing</strong><small>Invoices, payments and credit notes for PRJ-1024.</small></span>
  </label>
  <label class="ds-choice">
    <input type="checkbox" class="checkbox" name="Modules" value="reports">
    <span><strong>Reports</strong><small>Monthly revenue and ageing reports, exported as PDF or Excel.</small></span>
  </label>
</div>
```

### Sizes

```html preview title="Sizes"
<div class="flex flex-wrap items-center gap-6">
  <label class="ds-check-row"><input type="checkbox" class="checkbox is-sm" checked><span>Small, 16px</span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" checked><span>Default, 20px</span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox is-lg" checked><span>Large, 24px</span></label>
</div>
```

## States

```html preview title="Checkbox states"
<div class="grid gap-x-8 sm:grid-cols-2">
  <label class="ds-check-row"><input type="checkbox" class="checkbox"><span>Unchecked</span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" checked><span>Checked</span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" data-ds-indeterminate><span>Indeterminate (mixed)</span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" aria-invalid="true" aria-describedby="cb-terms-error"><span><strong>I accept the terms of service</strong><small id="cb-terms-error" class="ds-field-error">Accept the terms to continue.</small></span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" disabled><span>Disabled</span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" disabled checked><span>Disabled, checked</span></label>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | unchecked | 20px square, 1px `--ds-control-border` (3:1 or more), surface `--color-base-100` |
| Hover | pointer over the box or its row (`@media (hover: hover)`) | border one step darker, state-layer fill `--ds-opacity-state-hover` |
| Pressed | pointer down | fill `--ds-opacity-state-pressed` |
| Focus-visible | keyboard focus | 2px ring `--ds-focus`, 2px offset |
| Checked | `:checked` | primary fill, check glyph draws in from the start edge (180ms) |
| Indeterminate | `:indeterminate` (set by `data-ds-indeterminate` or check-all) | primary fill, minus glyph |
| Checked hover | pointer over a checked box | fill mixed 14% toward `--color-base-content` |
| Invalid | `:user-invalid`, `aria-invalid="true"`, or a group with `aria-invalid="true"` | error border, message below linked by `aria-describedby` |
| Disabled | `:disabled` | `--ds-opacity-disabled`, `cursor: not-allowed`, row text dimmed, no hover |
| Card selected | `.ds-choice:has(:checked)` | primary border plus 1px inset ring, 6% primary tint |

## Anatomy

- `input.checkbox` — the native control (daisyUI `.checkbox`, refined).
- `label.ds-check-row` — row with the control, `strong` title and `small` description; `.is-end` puts the control last.
- `label.ds-choice` — selectable card; `.ds-choice__body`, optional `.ds-choice__icon`.
- `fieldset.ds-checkbox-group` — group with `legend`; `.ds-choice-group__items` holds the rows; `.is-horizontal` wraps them in a row.
- `.ds-choice-grid` (`.is-2`, `.is-3`) — grid of cards.

## Usage

- Write labels as positive statements ("Email me when an invoice is paid"), not negatives ("Don't email me").
- Keep a group to 7 options or fewer; above that, use a [Multi-select](./multi-select.md) with search.
- List options vertically; use `.is-horizontal` only for 2 to 5 short labels (one or two words).
- Do not use a checkbox for an action that applies immediately; use a [Switch](./switch.md).
- Do not pre-check consent boxes (terms, marketing).
- Show the mixed state only on a parent that controls children. Never post "mixed" as a value.

## Accessibility

- Always a native `<input type="checkbox">` with a visible `<label>`. Groups use `fieldset` and `legend`, so the group name is read before each option.
- Descriptions are linked with `aria-describedby`; errors too, with `aria-invalid="true"` on the control (or on the `fieldset` for a group rule such as "choose at least one").
- The mixed state comes from the `indeterminate` property, which assistive technology announces as "mixed". It cannot be set in HTML, so ds.js sets it from `data-ds-indeterminate`.
- The check glyph is a mask drawn in `--color-primary-content` on `--color-primary` (4.5:1 or more in both themes). State is never colour alone: the glyph changes shape.
- Forced colours: the box uses `Canvas`/`CanvasText`, checked uses `Highlight` with a `HighlightText` glyph.
- Motion: the check draws in with `clip-path` over 180ms; with reduced motion it appears at once.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Move to the next or previous checkbox |
| Space | Toggle the focused checkbox (a mixed parent becomes checked) |

## Razor

```cshtml
<ds-checkbox asp-for="AcceptTerms" label="I accept the terms of service" required />
<ds-checkbox asp-for="EmailOnPayment" label="Email me when an invoice is paid"
             description="One message per payment." />
<ds-checkbox name="Modules" value="billing" card label="Billing" description="Invoices and payments." />

<ds-checkbox-group asp-for="Columns" label="Export columns" asp-items="Model.ColumnOptions" />
<ds-checkbox-group asp-for="Days" label="Working days" horizontal items="Model.Days" />
```

A `bool` model posts `true` or `false` (a hidden `false` input follows the box, like the built-in checkbox helper). A collection model (`List<string>`, `int[]`) binds every checked value. `items` takes `ChoiceItem(Value, Label, Description, Disabled)`. `data-*` and `aria-*` attributes written on `<ds-checkbox>` move to the input. Model errors add `aria-invalid` and a `.ds-field-error` message.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-indeterminate` | Sets `indeterminate = true` on load (`="false"` leaves it off) |
| `data-ds-check-all="selector"` | Parent box: checks or clears every matching checkbox and shows mixed while some are checked; without a value, uses the ids in `aria-controls` |

Children fire `change` when the parent changes them, so other scripts stay in sync.

## Tokens

`--color-primary`, `--color-primary-content`, `--ds-control-border`, `--color-base-100`, `--color-base-200`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-state-selected`, `--ds-opacity-disabled`, `--ds-focus`, `--ds-border-focus`, `--color-error`, `--ds-radius-sm`, `--ds-duration-base`, `--ds-ease-out`, `--ds-size-target`.

## Native and daisyUI

Builds on `<input type="checkbox">` with daisyUI `.checkbox`. The DS replaces daisyUI's rotated clip-path tick with a masked check that draws in, sets a 20px default (16px `is-sm`, 24px `is-lg`; daisyUI `checkbox-sm`/`-lg` also work), uses primary for checked and mixed by default, a 3:1 border, the DS focus ring and disabled opacity. daisyUI tone classes (`checkbox-success`, `checkbox-error`, …) still change the fill.
