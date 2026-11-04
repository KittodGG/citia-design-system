---
title: Color picker
group: components
category: forms
order: 34
summary: A swatch that opens the system color dialog, a validated hex field, preset swatches, the screen eyedropper where available and an optional contrast note.
---

A color picker sets one color: a project label, a brand color for invoices, a calendar category. It wraps the native `input type="color"`, which opens the operating system's color dialog, and adds what that dialog lacks: a hex field people can paste into, preset swatches for the colors your product already uses, the browser eyedropper (EyeDropper API) where it exists, and an optional contrast note. The form posts `#rrggbb`. For choosing among a few named options that happen to have colors, use a [radio group](./radio-group.md) instead.

## Examples

### Hex field and presets

```html preview title="Project label color"
<div class="ds-field" style="max-width:24rem">
  <label for="cp-label">Label color</label>
  <div class="ds-color-picker" data-ds-color-picker data-ds-swatches="Teal #0f766e, Indigo #4338ca, Plum #86198f, Rose #be123c, Amber #b45309, Olive #4d7c0f, Slate #475569">
    <input id="cp-label" name="LabelColor" type="color" value="#4338ca" aria-describedby="cp-label-hint">
  </div>
  <p class="ds-hint" id="cp-label-hint">Shown on the PRJ-1024 card and in reports.</p>
</div>
```

### Contrast note

`data-ds-contrast-against` reports the WCAG contrast ratio of the color against a background, or against white and black with `auto` (the better one is shown). Use it when the color carries text, such as a label chip.

```html preview title="Brand color with contrast against white"
<div class="ds-field" style="max-width:24rem">
  <label for="cp-brand">Invoice accent</label>
  <div class="ds-color-picker" data-ds-color-picker data-ds-contrast-against="#ffffff">
    <input id="cp-brand" name="InvoiceAccent" type="color" value="#0f766e">
  </div>
</div>
```

### Plain

Without presets the picker is a swatch, the hex field and the eyedropper.

```html preview title="Plain"
<div class="ds-field" style="max-width:24rem">
  <label for="cp-plain">Calendar color</label>
  <div class="ds-color-picker" data-ds-color-picker>
    <input id="cp-plain" name="CalendarColor" type="color" value="#b45309">
  </div>
</div>
```

## States

```html preview title="States"
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(17rem,1fr));gap:1.5rem">
  <div class="ds-field">
    <label for="cps-invalid">Invalid hex</label>
    <div class="ds-color-picker" data-ds-color-picker data-ds-contrast-against="auto"><input id="cps-invalid" type="color" value="#facc15" aria-invalid="true" aria-describedby="cps-invalid-error"></div>
    <p class="ds-field-error" id="cps-invalid-error">Enter a hex color such as #0F766E.</p>
  </div>
  <div class="ds-field">
    <label for="cps-low">Low contrast</label>
    <div class="ds-color-picker" data-ds-color-picker data-ds-contrast-against="#ffffff"><input id="cps-low" type="color" value="#f59e0b"></div>
  </div>
  <div class="ds-field">
    <label for="cps-dis">Disabled</label>
    <div class="ds-color-picker" data-ds-color-picker data-ds-swatches="#0f766e, #4338ca, #be123c"><input id="cps-dis" type="color" value="#0f766e" disabled></div>
  </div>
  <div class="ds-field">
    <label for="cps-native">No JavaScript (native)</label>
    <input id="cps-native" type="color" value="#0f766e">
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | — | 44px rounded swatch with a hairline inner edge, hex in monospace capitals |
| Hover | Pointer over swatch or preset | Swatch edge darkens; preset unchanged in size |
| Pressed | Pointer down on a preset | `scale(var(--ds-press-scale))` |
| Focus-visible | Keyboard on swatch, hex, preset or eyedropper | 2px `--ds-focus` ring; presets keep 5px offset so the ring does not touch the selection ring |
| Selected preset | Value equals the preset (`aria-checked="true"`) | A second ring separated by the surface: shape, not colour alone |
| Invalid | Hex that is not 3 or 6 hex digits, `aria-invalid`, server error | Error border on the hex box and a message; the posted value keeps the last valid color |
| Contrast | `data-ds-contrast-against` | "Contrast with white: 5.5:1, passes AA" with a dot; below 3:1 the note turns to error text |
| Disabled | `disabled` | Swatch, hex, presets and eyedropper at `--ds-opacity-disabled` |
| No eyedropper | Browser without EyeDropper, or `data-ds-no-eyedropper` | Button not rendered |
| No JavaScript | ds.js missing | The native color input |

## Anatomy

- `.ds-color-picker` — wrapper with `data-ds-color-picker`; sets `--ds-swatch`.
- `.ds-color-picker__row` — `.ds-color-picker__swatch` (holds the native input, transparent and full size), `.ds-color-picker__hex.input` with `.ds-color-picker__hash` and `.ds-color-picker__hex-input`, `.ds-color-picker__dropper`.
- `.ds-color-picker__swatches` — `role="radiogroup"` of `.ds-color-picker__preset` (`role="radio"`).
- `.ds-color-picker__contrast` — the live contrast note.

## Usage

- Offer 5 to 10 presets taken from your product's palette, with names ("Teal", not "#0F766E") so screen readers say something meaningful.
- Show the contrast note whenever the color will carry text, and test against the real background.
- Store and post `#rrggbb` in lower case; accept `#RGB` and pasted values with or without `#`.
- Do not use color alone to identify items picked this way; pair the color with a name in the UI.

## Accessibility

| Key | Action |
| --- | --- |
| Tab | Swatch (opens the system dialog with Enter or Space), hex field, eyedropper, then the selected preset |
| Arrow keys in presets | Move and select the previous / next preset (roving focus, one tab stop) |
| Space on a preset | Select it |
| Type or paste in the hex field | The swatch follows once 3 or 6 digits are valid; the message appears on leaving the field |

- The field label names the hex input (it takes the `id`); the swatch is "Open the color picker"; the eyedropper "Pick a color from the screen".
- The contrast note is a polite live region and states the level in words.

## Razor

```cshtml
<ds-field asp-for="LabelColor" hint="Shown on the project card and in reports.">
    <ds-color-picker asp-for="LabelColor" swatches="Teal #0f766e, Indigo #4338ca, Rose #be123c" contrast-against="auto" />
</ds-field>
```

Options: `name`, `value`, `swatches`, `contrast-against` (hex or `auto`), `no-eyedropper`, `disabled`. A string model value is written in lower case.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-color-picker` | On a wrapper around `input type="color"`: enhance it |
| `data-ds-swatches` | "Name #hex, Name #hex"; the name is optional |
| `data-ds-contrast-against` | A hex color or `auto` |
| `data-ds-no-eyedropper` | Never show the eyedropper |

```js
document.addEventListener("ds:colorpicker:change", (event) => console.log(event.detail.value)); // "#4338ca"
DS.picker.set("#cp-label", "#be123c");
```

## Tokens

`--ds-size-target`, `--ds-radius-lg`, `--ds-radius-full`, `--ds-font-mono`, `--ds-press-scale`, `--ds-focus`, `--ds-subtle`, `--ds-muted`, `--ds-success-text`, `--ds-error-text`, `--color-warning`, `--ds-opacity-disabled`. The local `--ds-swatch` holds the current color.

## Native and daisyUI

Built on `input type="color"`, which keeps the name, the posted value and the system dialog; the design system hides its own chrome and lets the swatch show the color. The hex box is daisyUI's `.input` as a wrapper; the eyedropper uses `btn btn-ghost btn-square`. daisyUI has no color picker.
