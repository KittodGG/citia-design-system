---
title: Fieldset
group: components
category: forms
order: 9
summary: A titled group of related controls with group help, a group error and a disabled state that cascades to every control inside.
source: TPS app.css .master-fieldset
---

A fieldset groups controls that answer one question together: an address, a delivery choice, a date range. Its legend names the group for assistive technology. Use [field](./field.md) for a single control. For a whole form use [form](./form.md).

## Examples

### Legend and help

```html preview title="Address group"
<fieldset class="ds-fieldset">
  <legend>Delivery address</legend>
  <p class="ds-fieldset-help">Used for the invoice and the courier.</p>
  <div class="ds-field-grid">
    <div class="ds-field is-wide"><label for="fs-street">Street</label><input id="fs-street" class="input" value="Jl. Sudirman 45" autocomplete="address-line1"></div>
    <div class="ds-field"><label for="fs-city">City</label><input id="fs-city" class="input" value="Jakarta" autocomplete="address-level2"></div>
    <div class="ds-field"><label for="fs-zip">Postal code</label><input id="fs-zip" class="input" value="10220" inputmode="numeric" autocomplete="postal-code"></div>
  </div>
</fieldset>
```

### Group error

When the problem belongs to the group (nothing selected, the end date before the start), put the error under the legend and point `aria-describedby` at it. Mark the fieldset `aria-invalid="true"` so the legend turns to the error colour.

```html preview title="Group error"
<fieldset class="ds-fieldset" aria-invalid="true" aria-describedby="fsg-e">
  <legend>Notify me by</legend>
  <p class="ds-field-error" id="fsg-e">Choose at least one way to be notified.</p>
  <div class="ds-form" style="margin-top:.75rem">
    <label class="ds-check-row"><input type="checkbox" class="checkbox"><span><strong>Email</strong></span></label>
    <label class="ds-check-row"><input type="checkbox" class="checkbox"><span><strong>SMS</strong></span></label>
  </div>
</fieldset>
```

### Boxed and disabled

`is-boxed` draws a hairline frame for groups inside long forms. `disabled` on the fieldset disables every control inside natively and dims the group; the legend stays readable.

```html preview title="Boxed and disabled"
<div class="ds-form" style="max-width:30rem">
  <fieldset class="ds-fieldset is-boxed">
    <legend>Billing contact</legend>
    <div class="ds-field"><label for="fb-1">Name</label><input id="fb-1" class="input" value="Ayu Lestari"></div>
  </fieldset>
  <fieldset class="ds-fieldset is-boxed" disabled>
    <legend>Approval (locked after submission)</legend>
    <div class="ds-field"><label for="fb-2">Approver</label><input id="fb-2" class="input" value="Daniel Okafor"></div>
    <label class="ds-check-row"><input type="checkbox" class="checkbox" checked><span><strong>Approved</strong></span></label>
  </fieldset>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | Legend 17px/650, help 14px in `--ds-subtle`, no frame |
| Boxed | `is-boxed` | 1px `--color-base-300` frame, 8px radius, 20px padding |
| Invalid | `aria-invalid="true"` | Legend in `--ds-error-text`; group error with icon below the legend |
| Disabled | `disabled` | Content at 55% opacity, `not-allowed` cursor, controls inert and skipped by Tab |
| Focus | A control inside | The control shows its own ring; the group has no ring |
| Hover, pressed | None | A fieldset is not interactive |
| Loading | Parent form `aria-busy` | The form blocks submission; the group looks unchanged |

## Anatomy

- `fieldset.ds-fieldset` (modifiers `is-boxed`).
- `legend`: the group name (first child).
- `.ds-fieldset-help`: one sentence under the legend.
- `.ds-field-error`: the group error.
- `.ds-field-grid` or `.ds-form`: the layout of the controls.

## Usage

- Use a fieldset for radio groups, checkbox groups, address blocks and ranges. Do not use it to draw a box around unrelated fields.
- Keep the legend under 40 characters and a noun or question ("Delivery address"), never "Details".
- Keep the group help to one sentence; per-field hints go in the fields.
- Use `disabled` on the fieldset instead of disabling controls one by one.
- Do not nest fieldsets deeper than one level.

## Accessibility

- `fieldset` and `legend` are announced as a group: "Delivery address, group". Radio and checkbox groups need one.
- `aria-describedby` on the fieldset lists the help id, then the error id, so the group description is read when focus enters it.
- Group errors use `aria-live="polite"`.
- A disabled fieldset removes its controls from the tab order and from submission; if people need to read and copy values, use `readonly` fields instead.
- Reduced motion: no animation here.

| Key | Action |
| --- | --- |
| Tab | Moves through the controls inside; a disabled fieldset is skipped |

## Razor

```cshtml
<ds-fieldset legend="Notify me by" help="Choose at least one." error="@ViewData["NotifyError"]?.ToString()" boxed>
    <ds-field asp-for="Email" label="Email" />
</ds-fieldset>
<ds-fieldset legend="Approval" disabled>...</ds-fieldset>
```

## Tokens

`--ds-type-section-*`, `--ds-subtle`, `--ds-error-text`, `--color-base-300`, `--ds-radius-lg`, `--ds-opacity-disabled`, `--ds-space-field-group`.

## Native and daisyUI

Builds on `fieldset` and `legend`. The DS resets daisyUI's `.fieldset` padding model, uses the section type role for the legend and adds the group error, boxed and disabled treatments.
