---
title: Radio group
group: components
category: forms
order: 21
summary: A set of round controls for choosing exactly one option from 2 to 7, as rows or as selectable cards, with native arrow-key behaviour.
source: TPS app.css L1890–1975 (.ds-choice, .ds-choice-grid)
---

A radio group lets people choose exactly one option and shows every option at once. Use it for 2 to 7 options when comparing them matters. For more options, or when space is tight, use a [Select](./select.md) or a [Combobox](./combobox.md). For a single on/off choice, use a [Checkbox](./checkbox.md) or a [Switch](./switch.md). For switching views in place, use a [Segmented control](./segmented-control.md).

## Examples

### Vertical (default)

```html preview title="Vertical radio group"
<fieldset class="ds-radio-group">
  <legend>Billing cycle</legend>
  <div class="ds-choice-group__items">
    <label class="ds-check-row"><input type="radio" class="radio" name="Cycle" value="monthly" checked><span>Monthly</span></label>
    <label class="ds-check-row"><input type="radio" class="radio" name="Cycle" value="quarterly"><span>Quarterly</span></label>
    <label class="ds-check-row"><input type="radio" class="radio" name="Cycle" value="yearly"><span>Yearly</span></label>
  </div>
</fieldset>
```

### With descriptions

```html preview title="Options with descriptions"
<fieldset class="ds-radio-group" aria-describedby="rg-ship-hint">
  <legend>Delivery</legend>
  <p id="rg-ship-hint" class="ds-hint">Prices include tax.</p>
  <div class="ds-choice-group__items">
    <label class="ds-check-row">
      <input type="radio" class="radio" name="Delivery" value="standard" checked aria-describedby="rg-ship-1">
      <span><strong>Standard</strong><small id="rg-ship-1">3 to 5 working days. Free above Rp 500.000.</small></span>
    </label>
    <label class="ds-check-row">
      <input type="radio" class="radio" name="Delivery" value="express" aria-describedby="rg-ship-2">
      <span><strong>Express</strong><small id="rg-ship-2">Next working day. Rp 45.000.</small></span>
    </label>
    <label class="ds-check-row">
      <input type="radio" class="radio" name="Delivery" value="pickup" disabled aria-describedby="rg-ship-3">
      <span><strong>Pick up at the office</strong><small id="rg-ship-3">Not available for orders above 20 kg.</small></span>
    </label>
  </div>
</fieldset>
```

### Horizontal

Use `.is-horizontal` for 2 to 4 short labels. Rows wrap on narrow screens.

```html preview title="Horizontal radio group"
<fieldset class="ds-radio-group is-horizontal">
  <legend>Report format</legend>
  <div class="ds-choice-group__items">
    <label class="ds-check-row"><input type="radio" class="radio" name="Format" value="pdf" checked><span>PDF</span></label>
    <label class="ds-check-row"><input type="radio" class="radio" name="Format" value="xlsx"><span>Excel</span></label>
    <label class="ds-check-row"><input type="radio" class="radio" name="Format" value="csv"><span>CSV</span></label>
  </div>
</fieldset>
```

### Card radios

Cards suit plan or role choices where each option needs a sentence. Put `role="radiogroup"` on the grid only when there is no `fieldset`; prefer the fieldset.

```html preview title="Card radios"
<fieldset class="ds-radio-group">
  <legend>Plan</legend>
  <div class="ds-choice-grid is-3">
    <label class="ds-choice">
      <input type="radio" class="radio" name="Plan" value="starter">
      <span><strong>Starter</strong><small>Up to 3 users. Rp 150.000 per month.</small></span>
    </label>
    <label class="ds-choice">
      <input type="radio" class="radio" name="Plan" value="team" checked>
      <span><strong>Team</strong><small>Up to 25 users, shared projects. Rp 900.000 per month.</small></span>
    </label>
    <label class="ds-choice">
      <input type="radio" class="radio" name="Plan" value="enterprise">
      <span><strong>Enterprise</strong><small>Unlimited users, SSO and audit log. Priced per contract.</small></span>
    </label>
  </div>
</fieldset>
```

### Card with icon, control at the end

```html preview title="Cards with icon"
<fieldset class="ds-radio-group">
  <legend>Payment method</legend>
  <div class="ds-choice-grid is-2">
    <label class="ds-choice is-end">
      <input type="radio" class="radio" name="Pay" value="transfer" checked>
      <span class="flex gap-3"><span class="ds-choice__icon"><svg class="ds-icon"><use href="#ds-icon-building"></use></svg></span><span><strong>Bank transfer</strong><small>Confirmed within 1 working day.</small></span></span>
    </label>
    <label class="ds-choice is-end">
      <input type="radio" class="radio" name="Pay" value="card">
      <span class="flex gap-3"><span class="ds-choice__icon"><svg class="ds-icon"><use href="#ds-icon-credit-card"></use></svg></span><span><strong>Credit card</strong><small>Charged immediately. Visa and Mastercard.</small></span></span>
    </label>
  </div>
</fieldset>
```

## States

```html preview title="Radio states"
<div class="grid gap-6 sm:grid-cols-2">
  <fieldset class="ds-radio-group">
    <legend>Rest, selected, disabled</legend>
    <div class="ds-choice-group__items">
      <label class="ds-check-row"><input type="radio" class="radio" name="st-a" value="1"><span>Unselected</span></label>
      <label class="ds-check-row"><input type="radio" class="radio" name="st-a" value="2" checked><span>Selected</span></label>
      <label class="ds-check-row"><input type="radio" class="radio" name="st-b" value="3" disabled><span>Disabled</span></label>
      <label class="ds-check-row"><input type="radio" class="radio" name="st-c" value="4" disabled checked><span>Disabled, selected</span></label>
    </div>
  </fieldset>
  <fieldset class="ds-radio-group" aria-invalid="true" aria-describedby="rg-err">
    <legend>Invalid group</legend>
    <div class="ds-choice-group__items">
      <label class="ds-check-row"><input type="radio" class="radio" name="st-d" value="1" required><span>Ayu Lestari</span></label>
      <label class="ds-check-row"><input type="radio" class="radio" name="st-d" value="2" required><span>Daniel Okafor</span></label>
    </div>
    <p id="rg-err" class="ds-field-error">Choose who approves the request.</p>
  </fieldset>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | not selected | 20px circle, 1px `--ds-control-border`, surface `--color-base-100` |
| Hover | pointer over the circle or its row | darker border, faint dot preview at 18% |
| Pressed | pointer down | state-layer fill `--ds-opacity-state-pressed` |
| Focus-visible | keyboard focus | 2px ring `--ds-focus`, 2px offset |
| Selected | `:checked` | primary border, 10px primary dot that scales in (180ms, emphasized easing) |
| Invalid | `fieldset[aria-invalid="true"]` or `:user-invalid` | error borders on every circle or card, message under the group |
| Disabled | `:disabled` on one option or the fieldset | `--ds-opacity-disabled`, `cursor: not-allowed`, no hover |
| Card selected | `.ds-choice:has(:checked)` | primary border plus inset ring, 6% primary tint |

## Anatomy

- `fieldset.ds-radio-group` — the group; `legend` names it; `.is-horizontal` wraps options in a row.
- `.ds-choice-group__items` — the list of rows.
- `label.ds-check-row` — one option: `input.radio`, `strong` label, `small` description.
- `.ds-choice-grid` + `label.ds-choice` — card layout (`.is-2`, `.is-3`, `.is-horizontal` for auto-fit); `.ds-choice__icon`, `.ds-choice__body`.

## Usage

- Order options logically (smallest to largest, most common first); never alphabetically when there is a natural order.
- Pre-select the safest or most common option unless the choice must be deliberate (consent, legal).
- Keep labels short (1 to 5 words) and put details in the description.
- Use cards for 2 to 6 options with a sentence each; use rows for short labels.
- Do not use radios for on/off; a single radio can never be cleared.
- Do not trigger navigation or saving on change; radios commit on submit.

## Accessibility

- All radios in a group share one `name`; the browser makes them a single Tab stop with arrow-key movement. Keep the native inputs, do not rebuild them with ARIA.
- `fieldset` + `legend` name the group. Put help and errors on the fieldset with `aria-describedby`, and `aria-invalid="true"` when the group fails validation.
- A disabled option is skipped by arrow keys. Explain why in its description.
- The dot is 10px on a 20px circle; the selected state also changes the border colour, so it is not colour alone.

| Key | Action |
| --- | --- |
| Tab | Move into the group (to the checked option, or the first) and out of it |
| Arrow Down / Arrow Right | Select the next option (wraps) |
| Arrow Up / Arrow Left | Select the previous option (wraps) |
| Space | Select the focused option when none is selected |

## Razor

```cshtml
<ds-radio-group asp-for="Cycle" label="Billing cycle" asp-items="Model.Cycles" />

<ds-radio-group asp-for="Plan" label="Plan" card columns="3" items="Model.Plans" />
@* Model.Plans: IEnumerable<ChoiceItem>, e.g. new ChoiceItem("team", "Team", "Up to 25 users.") *@

<ds-radio-group asp-for="Format" label="Report format" horizontal required
                items="new[] { new ChoiceItem("pdf", "PDF"), new ChoiceItem("xlsx", "Excel") }" />
```

The helper renders the fieldset, legend, options and the model error. The checked option comes from the model, `value`, or `SelectListItem.Selected`.

## JavaScript

None. Radio groups are native; selection, arrow keys and form posting work without ds.js.

## Tokens

`--color-primary`, `--ds-control-border`, `--color-base-100`, `--color-base-200`, `--color-base-300`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-state-selected`, `--ds-opacity-disabled`, `--ds-focus`, `--color-error`, `--ds-radius-lg` (cards), `--ds-duration-base`, `--ds-ease-emphasized`, `--ds-space-3`, `--ds-space-6`.

## Native and daisyUI

Builds on `<input type="radio">` with daisyUI `.radio`. The DS sets a 20px default (`is-sm` 16px, `is-lg` 24px), primary as the default colour, a scaling dot instead of daisyUI's inset shadow, a 3:1 border, the DS focus ring and the hover preview dot. daisyUI tone classes (`radio-success`, …) still change the colour.
