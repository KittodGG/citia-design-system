---
title: Slider
group: components
category: forms
order: 23
summary: A native range input styled the same in every engine, with live output, a value bubble while dragging, marks with labels, two-thumb ranges and a vertical option.
---

A slider picks a value, or a range of values, from a continuous or stepped scale where the approximate position matters more than the exact number (volume, a price range, a percentage). When people know the exact number, use a [Number input](./number-input.md); offer both together for precise ranges. For fewer than 5 discrete options, use a [Radio group](./radio-group.md) or a [Segmented control](./segmented-control.md).

## Examples

### With label and live value

`.ds-slider` holds a head (label and `output`) and a control. ds.js paints the fill, updates the `output` and shows a bubble above the thumb while dragging or using arrow keys. `data-ds-slider-format` formats the shown value (`{value}` is replaced, numbers use the page language).

```html preview title="Slider with output"
<div class="ds-slider" data-ds-slider-format="{value}%" style="max-width: 28rem">
  <div class="ds-slider__head">
    <label for="sl-discount">Discount</label>
    <output for="sl-discount" aria-hidden="true">15%</output>
  </div>
  <div class="ds-slider__control">
    <input id="sl-discount" type="range" class="range" name="Discount" min="0" max="50" step="5" value="15">
  </div>
</div>
```

### Marks with labels

Add a `<datalist>` and point the input's `list` at it. Each `option` becomes a tick; its `label` is shown under the track. Marks inside the selected range use full text colour.

```html preview title="Marks"
<div class="ds-slider" style="max-width: 28rem">
  <div class="ds-slider__head">
    <label for="sl-priority">Response target</label>
    <output for="sl-priority" aria-hidden="true">24</output>
  </div>
  <div class="ds-slider__control">
    <input id="sl-priority" type="range" class="range" name="ResponseHours" min="0" max="72" step="4" value="24" list="sl-priority-marks" aria-valuetext="24 hours">
  </div>
  <datalist id="sl-priority-marks">
    <option value="0" label="Now"></option>
    <option value="24" label="1 day"></option>
    <option value="48" label="2 days"></option>
    <option value="72" label="3 days"></option>
  </datalist>
</div>
```

### Range with two thumbs

Put two range inputs in `.ds-slider__control.is-range`. Each posts its own value (`MinPrice`, `MaxPrice`), keeps the native slider keyboard and gets an `aria-label`. ds.js keeps the lower thumb at or below the upper one and paints the fill between them.

```html preview title="Price range"
<div class="ds-slider" data-ds-slider-format="Rp {value}k" style="max-width: 28rem">
  <div class="ds-slider__head">
    <span class="ds-label" id="sl-price-label">Price per unit</span>
    <output for="sl-price-min sl-price-max" aria-hidden="true">Rp 200k to Rp 750k</output>
  </div>
  <div class="ds-slider__control is-range">
    <input id="sl-price-min" type="range" class="range" name="MinPrice" min="0" max="1000" step="50" value="200" aria-label="Price per unit, minimum">
    <input id="sl-price-max" type="range" class="range" name="MaxPrice" min="0" max="1000" step="50" value="750" aria-label="Price per unit, maximum">
  </div>
  <div class="ds-slider__hint"><span>Rp 0</span><span>Rp 1.000k</span></div>
</div>
```

### Sizes

```html preview title="Sizes"
<div class="grid gap-6" style="max-width: 28rem">
  <div class="ds-slider"><div class="ds-slider__control"><input type="range" class="range is-sm" value="30" aria-label="Small slider"></div></div>
  <div class="ds-slider"><div class="ds-slider__control"><input type="range" class="range" value="50" aria-label="Default slider"></div></div>
  <div class="ds-slider"><div class="ds-slider__control"><input type="range" class="range is-lg" value="70" aria-label="Large slider"></div></div>
</div>
```

### Vertical

`.is-vertical` turns the input with `writing-mode`; Arrow Up increases the value. Supported in current Chromium, Firefox and Safari.

```html preview title="Vertical"
<div class="ds-slider is-vertical">
  <div class="ds-slider__control">
    <input type="range" class="range" min="0" max="100" value="60" aria-label="Output level">
  </div>
</div>
```

## States

```html preview title="Slider states"
<div class="grid gap-6 sm:grid-cols-2">
  <div class="ds-slider"><div class="ds-slider__head"><label for="sl-st-1">Rest</label><output>40</output></div><div class="ds-slider__control"><input id="sl-st-1" type="range" class="range" value="40"></div></div>
  <div class="ds-slider"><div class="ds-slider__head"><label for="sl-st-2">Disabled</label><output>65</output></div><div class="ds-slider__control"><input id="sl-st-2" type="range" class="range" value="65" disabled></div></div>
  <div class="ds-slider"><div class="ds-slider__head"><label for="sl-st-3">Invalid</label><output>90</output></div><div class="ds-slider__control"><input id="sl-st-3" type="range" class="range" value="90" aria-invalid="true" aria-describedby="sl-st-3-err"></div><p id="sl-st-3-err" class="ds-field-error">The budget for PRJ-1024 allows at most 80%.</p></div>
  <div class="ds-slider"><div class="ds-slider__head"><label for="sl-st-4">Minimum and maximum</label><output>0</output></div><div class="ds-slider__control"><input id="sl-st-4" type="range" class="range" value="0"></div></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | — | 6px track (16% neutral), primary fill to the thumb centre, 20px thumb with a 2px primary border |
| Hover | pointer over the slider | 6px halo around the thumb at `--ds-opacity-state-selected` |
| Dragging | pointer down on a thumb | 8px halo at `--ds-opacity-state-drag`; value bubble rises 5px and fades in (160ms) |
| Focus-visible | keyboard focus | 2px ring `--ds-focus` around the thumb with a 2px surface gap; bubble shown while keys are used |
| Value change | input | fill and output follow the thumb immediately (no easing on direct manipulation) |
| Invalid | `aria-invalid="true"` or `:user-invalid` | fill and thumb border turn error, message below |
| Disabled | `:disabled` | grey fill and thumb, `--ds-opacity-disabled`, head and marks dimmed, `cursor: not-allowed` |
| At limits | value equals `min` or `max` | thumb sits flush with the track end; no extra styling |

## Anatomy

- `.ds-slider` — wrapper; options as `data-ds-slider-*`.
- `.ds-slider__head` — `label` (or `.ds-label` for a range) and `output` / `.ds-slider__output`.
- `.ds-slider__control` — the input(s); `.is-range` for two (ds.js adds it when missing).
- `input.range` — native range input (daisyUI `.range`, refined).
- `.ds-slider__bubble` — value bubble (generated).
- `.ds-slider__marks` / `.ds-slider__mark` — ticks and labels (generated from `datalist`).
- `.ds-slider__hint` — static minimum and maximum labels.

## Usage

- Always show the current value (output or bubble); a position alone is not a value.
- Use a step that matches the decision: 5% for discounts, 50k for prices. Keep the scale under about 100 steps for touch.
- Label the ends when they are not obvious (`.ds-slider__hint` or marks).
- Pair with a number input when an exact value is needed.
- Do not use a slider for values that need precision to the unit (amounts of money on an invoice, quantities).
- Do not apply expensive changes on every `input` event; listen to `change` (fired on release) for saving.

## Accessibility

- Native `input type="range"` gives the slider role, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and full keyboard support. Every thumb needs a label: `<label for>` for one thumb, `aria-label` per thumb for two.
- Set `aria-valuetext` when the number needs a unit or words ("24 hours"); with `data-ds-slider-format`, ds.js keeps it up to date.
- The `output` is `aria-hidden` because the slider already announces its value; it is for sighted users.
- Hit area: the input is 28px tall, 44px on coarse pointers; the thumb is 20px.
- The fill uses primary on a neutral track; the thumb has a 2px border and a shadow, so its position is visible without colour.

| Key | Action |
| --- | --- |
| Arrow Right / Arrow Up | Increase by one step |
| Arrow Left / Arrow Down | Decrease by one step |
| Page Up / Page Down | Increase or decrease by 10% of the range (snapped to the step; `data-ds-slider-page` overrides) |
| Home / End | Go to the minimum or maximum |
| Tab | Move between the two thumbs of a range |

## Razor

```cshtml
<ds-slider asp-for="Discount" label="Discount" min="0" max="50" step="5" format="{value}%" />
<ds-slider asp-for="ResponseHours" label="Response target" max="72" step="4"
           marks="0:Now,24:1 day,48:2 days,72:3 days" />
<ds-slider asp-for="MinPrice" asp-for-end="MaxPrice" label="Price per unit" max="1000" step="50"
           format="Rp {value}k" />
```

Attributes: `min`, `max`, `step`, `value`, `value-end`, `name-end`, `label`, `format`, `marks` (`value` or `value:label`, comma separated), `output="false"`, `bubble="false"`, `size="sm|lg"`, `vertical`, `disabled`. The helper writes the initial fill, so the slider looks right before ds.js loads.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `.ds-slider` | Enables output, bubble, marks and two-thumb behaviour for the inputs inside |
| `data-ds-slider-format="{value} unit"` | Format of the output, bubble and `aria-valuetext` |
| `data-ds-slider-bubble="false"` | No value bubble |
| `data-ds-slider-page="n"` | Page Up/Down step |
| `input[list]` + `datalist` | Marks with labels |

Every `input[type=range]` on the page gets the fill (`--ds-range-p`), with or without `.ds-slider`. Events are the native `input` (while moving) and `change` (on release).

## Tokens

`--color-primary`, `--color-base-content`, `--color-base-100`, `--ds-control-border`, `--ds-shadow-xs`, `--ds-opacity-state-selected`, `--ds-opacity-state-drag`, `--ds-opacity-disabled`, `--ds-focus`, `--color-error`, `--ds-radius-full`, `--ds-radius-md`, `--ds-duration-quick`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-enter-offset`. Component variables: `--ds-range-thumb`, `--ds-range-track`, `--ds-range-color`, `--ds-range-rest`.

## Native and daisyUI

Builds on `<input type="range">` with daisyUI `.range`. daisyUI paints the fill with a very large thumb shadow inside `overflow: hidden`, which clips halos and focus rings. The DS removes that and paints the fill with a hard-stop background on the WebKit track (driven by `--ds-range-p`) and `::-moz-range-progress` in Firefox, so the thumb can carry a hover halo, a press halo and the focus ring. Without JavaScript, Chromium shows the track without fill until the first move; Firefox shows the fill natively.
