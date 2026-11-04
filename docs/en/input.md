---
title: Input
group: components
category: forms
order: 2
summary: Single-line text field with sizes, leading and trailing icons, a clear button, a loading indicator and every validation state.
source: TPS app.css L1696-1975
---

The input takes one line of text: a name, an email address, a code. Use [textarea](./textarea.md) for several lines, [number input](./number-input.md) for quantities, [password input](./password-input.md) for secrets, [search input](./search-input.md) for filtering and [select](./select.md) or [combobox](./combobox.md) when the answer comes from a list. Always place it in a [field](./field.md).

## Examples

### Sizes

Three sizes: small 36px, medium 44px (default) and large 52px. On touch screens small grows to 44px. Text is 16px on phones so iOS does not zoom.

```html preview title="Small, medium, large"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-input is-sm"><input class="ds-input__control" aria-label="Small" placeholder="Small, 36px"></div>
  <div class="ds-input"><input class="ds-input__control" aria-label="Medium" placeholder="Medium, 44px"></div>
  <div class="ds-input is-lg"><input class="ds-input__control" aria-label="Large" placeholder="Large, 52px"></div>
</div>
```

### Icons, clear button and affixes

A leading icon names the kind of value. The clear button appears once there is text, keeps its slot so nothing shifts, and is not in the tab order (Escape clears from the keyboard). Text affixes sit inside the field.

```html preview title="Leading icon, clear, affix"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-field">
    <label for="in-mail">Email address</label>
    <div class="ds-input">
      <svg class="ds-icon ds-input__icon" aria-hidden="true"><use href="#ds-icon-mail"></use></svg>
      <input id="in-mail" type="email" class="ds-input__control" value="ayu.lestari@example.com" autocomplete="email">
      <button type="button" class="ds-input__clear" tabindex="-1" aria-label="Clear"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
    </div>
  </div>
  <div class="ds-field">
    <label for="in-site">Website</label>
    <div class="ds-input">
      <span class="ds-input__affix">https://</span>
      <input id="in-site" class="ds-input__control" value="citia-engineering.com" inputmode="url">
    </div>
  </div>
</div>
```

### Loading and success

For an async check (is the code taken?) set `aria-busy="true"` on the wrapper. The spinner appears after 300ms and the field keeps its width. When the check passes set `data-state="success"`.

```html preview title="Async check"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-field">
    <label for="in-busy">Project code</label>
    <div class="ds-input" aria-busy="true"><input id="in-busy" class="ds-input__control" value="PRJ-1024"></div>
    <p class="ds-hint">Checking availability</p>
  </div>
  <div class="ds-field">
    <label for="in-ok">Project code</label>
    <div class="ds-input" data-state="success"><input id="in-ok" class="ds-input__control" value="PRJ-2048"></div>
    <p class="ds-field-success">Code is available.</p>
  </div>
</div>
```

## States

```html preview title="All input states"
<div class="ds-field-grid">
  <div class="ds-field"><label for="is-1">Placeholder</label><div class="ds-input"><input id="is-1" class="ds-input__control" placeholder="Search by name"></div></div>
  <div class="ds-field"><label for="is-2">Filled</label><div class="ds-input"><input id="is-2" class="ds-input__control" value="Mei Tanaka"></div></div>
  <div class="ds-field"><label for="is-3">Disabled</label><div class="ds-input"><input id="is-3" class="ds-input__control" value="Sofia Marquez" disabled></div></div>
  <div class="ds-field"><label for="is-4">Read-only</label><div class="ds-input"><input id="is-4" class="ds-input__control" value="PRJ-1024" readonly></div></div>
  <div class="ds-field"><label for="is-5">Invalid</label><div class="ds-input"><input id="is-5" class="ds-input__control" value="abc" aria-invalid="true" aria-describedby="is-5-e"></div><p class="ds-field-error" id="is-5-e">Enter a valid project code.</p></div>
  <div class="ds-field"><label for="is-6">Success</label><div class="ds-input" data-state="success"><input id="is-6" class="ds-input__control" value="PRJ-2048"></div></div>
  <div class="ds-field"><label for="is-7">Loading</label><div class="ds-input" aria-busy="true"><input id="is-7" class="ds-input__control" value="PRJ-3071"></div></div>
  <div class="ds-field"><label for="is-8">Bare daisyUI input</label><input id="is-8" class="input" value="Same states, no wrapper"></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | 1px `--ds-control-border` (3:1), `base-100` fill |
| Hover | Pointer over | Border 40% darker; not on touch |
| Focus | `:focus-visible` on the control | 2px focus ring, 2px offset, focus-coloured border; the wrapper draws it |
| Filled | Value present | Clear button visible |
| Placeholder | `:placeholder-shown` | `--ds-subtle` text, 4.5:1 or more |
| Disabled | `disabled` on the control | 55% opacity, `base-200`, `not-allowed` |
| Read-only | `readonly` | `base-200`, hairline border, full-contrast text, no clear button |
| Invalid | `aria-invalid`, `input-validation-error`, `:user-invalid` | Error border and a trailing error icon |
| Success | `data-state="success"` on the wrapper | Success border and check icon |
| Loading | `aria-busy="true"` on the wrapper | Spinner after 300ms, `progress` cursor |
| Autofill | `:autofill` | Keeps the theme surface and text colour |

## Anatomy

- `.ds-input`: the field-shaped wrapper (border, radius, fill, focus ring). Modifiers `is-sm`, `is-lg`.
- `.ds-input__control`: the native `input`, borderless.
- `.ds-icon.ds-input__icon`: leading icon; add `is-end` to trail it.
- `.ds-input__affix`: text prefix; add `is-end` for a suffix or unit.
- `.ds-input__clear`, `.ds-input__action`: 28px round buttons with a 44px hit area.
- The status slot (spinner, check, alert) is drawn by `::after`; no markup.

## Usage

- Pick the `type` and `inputmode` that match the data (`email`, `tel`, `url`, `inputmode="numeric"`); set `autocomplete` from the HTML list.
- Use a clear button on search and filter fields, not on short required fields where an accidental clear costs data.
- Do not put the label inside the field. Placeholder text shows an example, not an instruction, and is not read as a label.
- Use `readonly` for values people copy, `disabled` for values that do not apply. Disabled values are not submitted.
- Show success only after an async check; do not mark every valid field green.
- Validate on blur, then on every input after the first error.

## Accessibility

- The control is a native `input` with a `label[for]`; icons are `aria-hidden`.
- The clear button has an accessible name and `tabindex="-1"` because Escape already clears from the keyboard; touch and screen-reader users reach it by pointer.
- The invalid state is conveyed by `aria-invalid` and a text message, never by colour or the icon alone.
- Busy state: set `aria-busy` on the wrapper and announce the result in the hint (polite).
- Contrast: border 3:1 or more, text 4.5:1 or more, in light and dark. Forced colours: the ring uses `Highlight`.

| Key | Action |
| --- | --- |
| Tab | Moves focus into and out of the field |
| Escape | Clears the field when it has a clear button and a value |
| Enter | Submits the form (native) |

## Razor

```cshtml
<ds-field asp-for="Email" type="email" icon="mail" clearable hint="Invoices are sent here." />
<ds-field asp-for="Website" prefix="https://" />
<ds-field asp-for="ProjectCode" loading size="lg" />
```

`input-validation-error` from `asp-for` is styled like `aria-invalid`. See [Field](./field.md#razor) for every attribute.

## JavaScript

| Attribute or class | Effect |
| --- | --- |
| `.ds-input` | Gets `data-ds-ready` and `data-empty` so the clear button knows when to show |
| `.ds-input__clear` | Clears the control, fires `input` and `change`, focuses the control |

API: `DS.inputs.refresh(root)`, `DS.inputs.clear(el)`. Event: `ds:input:clear` (bubbles, `detail.control`). Programmatic value changes do not fire `input`; call `DS.inputs.refresh(root)` afterwards.

## Tokens

`--ds-control-border`, `--ds-focus`, `--ds-subtle`, `--ds-quiet`, `--ds-error-text`, `--color-error`, `--color-success`, `--color-base-100/200/300`, `--radius-field`, `--ds-size-target`, `--ds-size-target-compact`, `--ds-opacity-disabled`, `--ds-duration-fast`.

## Native and daisyUI

Bare `input.input` keeps working and shares the same states; use the `.ds-input` wrapper when you need icons, affixes, a clear button or the status slot. The wrapper does not use daisyUI's `label.input` pattern, so `width: clamp(…)`, depth shadows and the inner-input outline reset do not apply.
