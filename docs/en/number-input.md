---
title: Number input
group: components
category: forms
order: 5
summary: Numeric field with stepper buttons, press-and-hold repeat, min and max clamping, units and optional locale formatting.
---

Use the number input for quantities and amounts that people nudge or type: seats, items, percentages, weights. For a value on a range with no exact typing use a slider; for identifiers made of digits (phone, postal code, card) use a plain [input](./input.md) with `inputmode="numeric"`, because they are not numbers to increment.

## Examples

### Stepper

The field is a text input with `role="spinbutton"`, so typing, pasting and locale separators work. `data-ds-min`, `data-ds-max` and `data-ds-step` drive stepping. Hold a button: the first step is immediate, repeat starts after 420ms and speeds up from 150ms to 35ms between steps.

```html preview title="Stepper with limits"
<div class="ds-form" style="max-width:20rem">
  <div class="ds-field">
    <label for="num-1">Seats</label>
    <div class="ds-input ds-number">
      <button type="button" class="ds-number__step" data-ds-step="-1" tabindex="-1" aria-controls="num-1" aria-label="Decrease"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-minus"></use></svg></button>
      <input id="num-1" class="ds-input__control" value="5" inputmode="numeric" data-ds-min="1" data-ds-max="20" data-ds-step="1">
      <button type="button" class="ds-number__step" data-ds-step="1" tabindex="-1" aria-controls="num-1" aria-label="Increase"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
    </div>
    <p class="ds-hint">Between 1 and 20.</p>
  </div>
</div>
```

### Units, decimals and trailing steppers

A unit suffix is read with the value ("2.5 kg"). `is-trailing` moves both buttons to the end for dense forms. `data-ds-fixed` keeps trailing zeros.

```html preview title="Unit and trailing buttons"
<div class="ds-form" style="max-width:20rem">
  <div class="ds-field">
    <label for="num-2">Weight</label>
    <div class="ds-input ds-number is-trailing">
      <input id="num-2" class="ds-input__control" value="2.5" inputmode="decimal" data-ds-min="0" data-ds-max="100" data-ds-step="0.5" data-ds-fixed>
      <span class="ds-input__affix is-end">kg</span>
      <button type="button" class="ds-number__step" data-ds-step="-1" tabindex="-1" aria-controls="num-2" aria-label="Decrease"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-minus"></use></svg></button>
      <button type="button" class="ds-number__step" data-ds-step="1" tabindex="-1" aria-controls="num-2" aria-label="Increase"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
    </div>
  </div>
</div>
```

### Locale display

`data-ds-locale` on the wrapper formats the visible value with the page language (or the value you give) and parses what people type with the same separators: "1.250,5" in Indonesian, "1,250.5" in English. The field posts the plain number through a hidden twin input that takes over `name`.

```html preview title="Locale formatting"
<div class="ds-form" style="max-width:20rem">
  <div class="ds-field">
    <label for="num-3">Budget (IDR)</label>
    <div class="ds-input ds-number is-trailing" data-ds-locale>
      <input id="num-3" name="budget" class="ds-input__control" value="1250000" inputmode="decimal" data-ds-min="0" data-ds-step="50000" data-ds-big-step="500000">
      <button type="button" class="ds-number__step" data-ds-step="-1" tabindex="-1" aria-controls="num-3" aria-label="Decrease"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-minus"></use></svg></button>
      <button type="button" class="ds-number__step" data-ds-step="1" tabindex="-1" aria-controls="num-3" aria-label="Increase"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
    </div>
  </div>
</div>
```

## States

```html preview title="Number states"
<div class="ds-field-grid">
  <div class="ds-field"><label for="ns-1">At minimum</label><div class="ds-input ds-number"><button type="button" class="ds-number__step" data-ds-step="-1" tabindex="-1" aria-controls="ns-1" aria-label="Decrease"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-minus"></use></svg></button><input id="ns-1" class="ds-input__control" value="1" data-ds-min="1" data-ds-max="9"><button type="button" class="ds-number__step" data-ds-step="1" tabindex="-1" aria-controls="ns-1" aria-label="Increase"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button></div></div>
  <div class="ds-field"><label for="ns-2">Disabled</label><div class="ds-input ds-number"><button type="button" class="ds-number__step" data-ds-step="-1" tabindex="-1" aria-controls="ns-2" aria-label="Decrease"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-minus"></use></svg></button><input id="ns-2" class="ds-input__control" value="4" disabled><button type="button" class="ds-number__step" data-ds-step="1" tabindex="-1" aria-controls="ns-2" aria-label="Increase"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button></div></div>
  <div class="ds-field"><label for="ns-3">Read-only</label><div class="ds-input ds-number"><input id="ns-3" class="ds-input__control" value="12" readonly></div></div>
  <div class="ds-field"><label for="ns-4">Invalid</label><div class="ds-input ds-number"><input id="ns-4" class="ds-input__control" value="0" aria-invalid="true" aria-describedby="ns-4-e"></div><p class="ds-field-error" id="ns-4-e">Enter a quantity of at least 1.</p></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest, hover, focus | As [input](./input.md) | Buttons get a 6% state layer on hover |
| Pressed | Pointer down on a button | 10% state layer, step fires at once |
| Holding | Pointer held 420ms | Repeats, interval 150ms down to 35ms |
| At limit | Value at `data-ds-min` or `-max` | That button is `aria-disabled` (55% opacity, `not-allowed`) |
| Filled, placeholder | Value present or empty | Centred tabular figures |
| Disabled, read-only | `disabled`, `readonly` | Buttons inert and dimmed |
| Invalid | `aria-invalid="true"` | Error border and icon |
| Typed out of range | Blur | Value clamps to the limit and `change` fires |
| Not a number | Blur | Reverts to the last valid value |

## Anatomy

- `.ds-input.ds-number`: wrapper (modifier `is-trailing`; attribute `data-ds-locale`).
- `.ds-number__step[data-ds-step="-1|1"]`: stepper buttons (44px square).
- `.ds-input__control`: text input with `role="spinbutton"`.
- `.ds-input__affix.is-end`: unit.

## Usage

- Set `min`, `max` and `step` to real limits; a stepper without limits can reach nonsense in seconds of holding.
- Keep the unit as an affix, not in the label alone, so it stays next to the figure.
- Use `data-ds-big-step` for Page Up and Page Down when the useful range is wide.
- Do not use the stepper for values longer than about 6 digits; type them instead.
- Mouse wheel never changes the value (the field is text, so scrolling a page over it is safe).

## Accessibility

Follows the WAI-ARIA spinbutton pattern.

- `role="spinbutton"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and `aria-valuetext` ("2.5 kg" when a unit exists).
- The buttons have names ("Decrease", "Increase"), `aria-controls`, and are not in the tab order; the field does the same with arrow keys.
- Pointer clicks step once on pointer-down; keyboard or screen-reader activation of a button steps once on click.
- Limits are announced by `aria-valuemin/max`; a disabled button is `aria-disabled`, not removed.
- Targets 44px. Reduced motion: only state-layer colour changes.

| Key | Action |
| --- | --- |
| Arrow Up / Arrow Down | Increase / decrease by one step |
| Page Up / Page Down | Increase / decrease by the big step (10 steps by default) |
| Home / End | Set to the minimum / maximum, when defined |
| Enter | Commits the typed value (and submits the form, native) |
| Typing | Digits, the decimal separator and a leading minus |

## Razor

```cshtml
<ds-field asp-for="Seats" type="number" min="1" max="20" step="1" />
<ds-field asp-for="Weight" type="number" min="0" max="100" step="0.5" unit="kg" trailing />
<ds-field asp-for="Budget" type="number" step="50000" locale />
```

The field is rendered as `type="text"` with `inputmode` and the `data-ds-*` limits; ASP.NET `data-val-*` attributes still apply.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-min`, `data-ds-max` | Limits (clamped on blur and while stepping) |
| `data-ds-step`, `data-ds-big-step` | Step (default 1) and Page Up/Down step (default 10 steps) |
| `data-ds-decimals` | Decimal places; defaults to the places in the step |
| `data-ds-fixed` | Keep trailing zeros |
| `data-ds-snap` | Round to the step grid starting at the minimum |
| `data-ds-locale` (on the wrapper) | Format and parse with the page or given language |

API: `DS.inputs.step(input, 1)`, `DS.inputs.setNumber(input, 12)`. Event: `ds:number:change` (`detail.value`, `detail.text`); standard `input` and `change` also fire.

## Tokens

`--ds-input-h` (from `--ds-size-target`), `--color-base-300` for the button dividers, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-control-border`.

## Native and daisyUI

Replaces `input[type=number]` on purpose: native spinners ignore locale, cannot show units, and change on mouse wheel. Without JavaScript the field is still a text input with the right `inputmode`; the server must validate.
