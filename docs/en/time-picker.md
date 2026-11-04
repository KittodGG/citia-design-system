---
title: Time picker
group: components
category: forms
order: 33
summary: Hour, minute and optional second segments with arrow-key stepping, 12 or 24 hours from the page language, and a native fallback that posts HH:mm.
---

A time picker collects a time of day: a meeting start, a pickup slot, an opening hour. It shows one segment per unit (hour, minute, optionally second, and AM/PM where the language uses a 12-hour clock). People type digits and the focus moves on by itself, or they step a segment with the arrow keys. The form posts `HH:mm` (24-hour) in every language. For a date, use the [date picker](./date-picker.md); for a duration ("2 h 30 min"), use a [number input](./number-input.md) with a unit.

The server renders a native `input type="time"`; without JavaScript it stays and posts the same value.

## Examples

### 24-hour and 12-hour

The clock follows the page language: `id` and `en-GB` use 24 hours, `en` (United States) uses AM/PM. `data-ds-hour-cycle` overrides it. The separator also follows the language (`14.30` in Indonesian).

```html preview title="Meeting start"
<div style="display:flex;flex-wrap:wrap;gap:1.5rem">
  <div class="ds-field" style="width:12rem">
    <label for="tp-start">Start time</label>
    <div class="ds-time-picker" data-ds-time-picker data-ds-hour-cycle="24">
      <input id="tp-start" name="StartTime" type="time" class="input" value="14:30">
    </div>
  </div>
  <div class="ds-field" style="width:12rem">
    <label for="tp-start12">Start time (12-hour)</label>
    <div class="ds-time-picker" data-ds-time-picker data-ds-hour-cycle="12">
      <input id="tp-start12" name="StartTime12" type="time" class="input" value="14:30">
    </div>
  </div>
</div>
```

### Step and limits

`step` is in seconds, as on the native input: `900` steps minutes by 15. `min` and `max` set opening hours; a time outside them gets a message.

```html preview title="Pickup slot, every 15 minutes, 08:00–17:00"
<div class="ds-field" style="width:12rem">
  <label for="tp-pickup">Pickup time</label>
  <div class="ds-time-picker" data-ds-time-picker data-ds-hour-cycle="24">
    <input id="tp-pickup" name="PickupTime" type="time" class="input" step="900" min="08:00" max="17:00" aria-describedby="tp-pickup-hint">
  </div>
  <p class="ds-hint" id="tp-pickup-hint">Every 15 minutes between 08:00 and 17:00.</p>
</div>
```

### With seconds

A `step` under 60, a value with seconds or `data-ds-seconds` adds the seconds segment; the value posts as `HH:mm:ss`.

```html preview title="Log timestamp"
<div class="ds-field" style="width:12rem">
  <label for="tp-log">Event time</label>
  <div class="ds-time-picker" data-ds-time-picker data-ds-hour-cycle="24">
    <input id="tp-log" name="EventTime" type="time" class="input" step="1" value="09:41:07">
  </div>
</div>
```

## States

```html preview title="States"
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(12rem,1fr));gap:1.5rem">
  <div class="ds-field"><label for="tps-empty">Empty</label><div class="ds-time-picker" data-ds-time-picker><input id="tps-empty" type="time" class="input"></div></div>
  <div class="ds-field"><label for="tps-filled">Filled</label><div class="ds-time-picker" data-ds-time-picker><input id="tps-filled" type="time" class="input" value="08:15"></div></div>
  <div class="ds-field"><label for="tps-invalid">Invalid</label><div class="ds-time-picker" data-ds-time-picker><input id="tps-invalid" type="time" class="input" value="19:00" aria-invalid="true" aria-describedby="tps-invalid-error"></div><p class="ds-field-error" id="tps-invalid-error">Choose a time at or before 17:00.</p></div>
  <div class="ds-field"><label for="tps-ro">Read-only</label><div class="ds-time-picker" data-ds-time-picker><input id="tps-ro" type="time" class="input" value="12:00" readonly></div></div>
  <div class="ds-field"><label for="tps-dis">Disabled</label><div class="ds-time-picker" data-ds-time-picker><input id="tps-dis" type="time" class="input" value="12:00" disabled></div></div>
  <div class="ds-field"><label for="tps-sm">Small</label><div class="ds-time-picker" data-ds-time-picker><input id="tps-sm" type="time" class="input input-sm" value="07:45"></div></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Empty | No value | Each segment shows `––` in `--ds-subtle` |
| Focus | A segment has focus | The box shows the field focus ring; the segment gets a tonal primary fill (no caret) |
| Filled | All segments set | Two-digit tabular figures, separator from the language |
| Partly filled | Some segments empty | Value not posted; on leaving: "Enter both hours and minutes." |
| Invalid | Outside `min`/`max`, partly filled, `aria-invalid`, server error | Error border, message below |
| Read-only | `readonly` | Grey surface, segments do not change |
| Disabled | `disabled` | `--ds-opacity-disabled`, not focusable, not posted |
| No JavaScript | ds.js missing | The native time input |

## Anatomy

- `.ds-time-picker` — wrapper with `data-ds-time-picker`; holds the native input (hidden after enhancement).
- `.ds-time-picker__control.input` — the field box, `role="group"` named by the label.
- `.ds-time-picker__segments` — the segments: `.ds-time-picker__segment` (`role="spinbutton"`), `.is-period` for AM/PM, `.ds-time-picker__sep`.
- `.ds-picker-trigger` — a decorative clock icon.

## Usage

- Use 15- or 30-minute steps for appointments; people rarely need single minutes.
- State the time zone in the label when people work across zones ("Pickup time (WIB)").
- Keep the server as the source of truth for opening hours; `min`/`max` are a convenience.
- Do not use a time picker for durations or for a list of fixed slots; for 4 to 12 fixed slots a [radio group](./radio-group.md) or [segmented control](./segmented-control.md) is faster.

## Accessibility

Each segment is an `input` with `role="spinbutton"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and `aria-valuetext` ("Empty" when not set), named "Hour", "Minute", "Second" or "AM or PM". The group carries the field label. The label's `for` points at the hour segment, so a click on the label starts there. Segments use `inputmode="numeric"`, so phones show the number pad.

| Key | Action |
| --- | --- |
| Digits | Fill the segment; after two digits, or one that cannot start a valid pair (3–9 for hours), focus moves to the next |
| Arrow up / down | Next / previous value by the step, wrapping (23 → 00) |
| Page Up / Page Down | Hours by 3, minutes and seconds by 2 steps |
| Home / End | Lowest / highest value |
| Arrow left / right | Previous / next segment |
| `:` `.` or space | Next segment |
| Backspace / Delete | Empty the segment |
| A / P | AM / PM in the period segment |

## Razor

```cshtml
<ds-field asp-for="PickupTime" hint="Every 15 minutes between 08:00 and 17:00.">
    <ds-time-picker asp-for="PickupTime" step="900" min="08:00" max="17:00" />
</ds-field>
```

`TimeOnly`, `TimeSpan` and `DateTime` model values are written as `HH:mm` (with `seconds`, `HH:mm:ss`). Options: `name`, `value`, `min`, `max`, `step` (seconds), `seconds`, `hour-cycle` (`12` or `24`), `size`, `required`, `disabled`, `readonly`.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-time-picker` | On a wrapper around `input type="time"` (or the input): enhance it |
| `data-ds-hour-cycle` | `12` or `24`; default from `Intl` for the page language |
| `data-ds-seconds` | Always show seconds |
| `step`, `min`, `max`, `required`, `readonly`, `disabled` | Read from the native input |

```js
document.addEventListener("ds:timepicker:change", (event) => console.log(event.detail.value)); // "14:30" or ""
DS.picker.set("#tp-start", "09:00");
```

## Tokens

`--ds-opacity-state-selected` (segment focus), `--ds-subtle` (placeholder and separator), `--ds-radius-sm`, `--ds-duration-fast`, `--ds-ease-standard`, `--ds-opacity-disabled`, plus the [input](./input.md) tokens.

## Native and daisyUI

Starts from `input type="time"`, whose look and 12/24-hour behaviour depend on the browser and operating system rather than the page language. The enhanced field uses daisyUI's `.input` as a wrapper, so sizes and field states match the other inputs.
