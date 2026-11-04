---
title: Date picker
group: components
category: forms
order: 31
summary: A date field people can type into, with a calendar popover, format hint, clear and today actions. Posts yyyy-MM-dd and falls back to the native input.
source: TPS site.js enhanceDate; app.css L1244–1273
---

A date picker is a text field for one date plus a button that opens a [calendar](./calendar.md) in a popover. People who know the date type it ("14/05/2026", "14 May 2026", "14052026"); people who need to look at the month pick it. The form always posts an ISO date (`2026-05-14`), whatever the page language shows. For a start and an end date, use the [date range picker](./date-range-picker.md); for a time of day, the [time picker](./time-picker.md).

The server renders a native `input type="date"`. ds.js keeps it as the hidden ISO field and adds the typed field, the trigger and the popover. Without JavaScript, or in a browser without popover support, the native date input stays and still posts `yyyy-MM-dd`.

## Examples

### Default

The placeholder is the format hint of the page language (`mm/dd/yyyy` for `en`, `dd/mm/yyyy` for `en-GB`, `hh/bb/tttt` for Indonesian). Select the calendar button or press Alt + Arrow down in the field.

```html preview title="Due date"
<div class="ds-field" style="max-width:20rem">
  <label for="dp-due">Due date</label>
  <div class="ds-date-picker" data-ds-date-picker>
    <input id="dp-due" name="DueDate" type="date" class="input" value="2026-11-30" aria-describedby="dp-due-hint dp-due-error">
  </div>
  <p class="ds-hint" id="dp-due-hint">The client sees this date on invoice INV-2026-0418.</p>
  <p class="ds-field-error" id="dp-due-error"></p>
</div>
```

### Limits and unavailable days

`min` and `max` come from the native input. Days outside them are disabled in the calendar, and a typed date outside them gets a message that names the limit. Weekends and listed dates can be made unavailable.

```html preview title="Delivery date, working days only"
<div class="ds-field" style="max-width:20rem">
  <label for="dp-delivery">Delivery date</label>
  <div class="ds-date-picker" data-ds-date-picker data-ds-disable-weekends data-ds-disabled-dates="2026-12-24 2026-12-25">
    <input id="dp-delivery" name="DeliveryDate" type="date" class="input" min="2026-11-03" max="2027-01-31" required aria-describedby="dp-delivery-hint dp-delivery-error">
  </div>
  <p class="ds-hint" id="dp-delivery-hint">Monday to Friday, from 3 Nov 2026.</p>
  <p class="ds-field-error" id="dp-delivery-error"></p>
</div>
```

### Sizes

The size class of the native input carries over to the field box.

```html preview title="Small, medium, large"
<div style="display:grid;gap:1rem;max-width:20rem">
  <div class="ds-date-picker" data-ds-date-picker><input type="date" class="input input-sm" aria-label="Start date, small" value="2026-11-02"></div>
  <div class="ds-date-picker" data-ds-date-picker><input type="date" class="input" aria-label="Start date, medium" value="2026-11-02"></div>
  <div class="ds-date-picker" data-ds-date-picker><input type="date" class="input input-lg" aria-label="Start date, large" value="2026-11-02"></div>
</div>
```

### Date of birth

For dates far in the past, open the calendar and select the title to jump by year and month, or type the date.

```html preview title="Date of birth"
<div class="ds-field" style="max-width:20rem">
  <label for="dp-birth">Date of birth</label>
  <div class="ds-date-picker" data-ds-date-picker>
    <input id="dp-birth" name="BirthDate" type="date" class="input" min="1920-01-01" max="2010-12-31" value="1991-07-23">
  </div>
</div>
```

## States

```html preview title="States"
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(15rem,1fr));gap:1.5rem">
  <div class="ds-field">
    <label for="dps-empty">Empty</label>
    <div class="ds-date-picker" data-ds-date-picker><input id="dps-empty" type="date" class="input"></div>
  </div>
  <div class="ds-field">
    <label for="dps-filled">Filled</label>
    <div class="ds-date-picker" data-ds-date-picker><input id="dps-filled" type="date" class="input" value="2026-11-12"></div>
  </div>
  <div class="ds-field">
    <label for="dps-invalid">Invalid</label>
    <div class="ds-date-picker" data-ds-date-picker><input id="dps-invalid" type="date" class="input" aria-invalid="true" aria-describedby="dps-invalid-error"></div>
    <p class="ds-field-error" id="dps-invalid-error">Enter a date as mm/dd/yyyy.</p>
  </div>
  <div class="ds-field">
    <label for="dps-readonly">Read-only</label>
    <div class="ds-date-picker" data-ds-date-picker><input id="dps-readonly" type="date" class="input" value="2026-10-01" readonly></div>
  </div>
  <div class="ds-field">
    <label for="dps-disabled">Disabled</label>
    <div class="ds-date-picker" data-ds-date-picker><input id="dps-disabled" type="date" class="input" value="2026-10-01" disabled></div>
  </div>
  <div class="ds-field">
    <label for="dps-native">No JavaScript (native)</label>
    <input id="dps-native" type="date" class="input" value="2026-11-12">
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Empty | No value | Format hint as placeholder in `--ds-subtle`; no clear button |
| Hover | Pointer over the field or the trigger | Field border as [input](./input.md); trigger gets the hover state layer |
| Focus | Typing in the field | Field focus ring of the input box (`:focus-within`) |
| Filled | A value | Date in the numeric format of the language, tabular figures; clear button (x) appears |
| Open | Popover shown | Trigger `aria-expanded="true"`, tonal primary fill; popover enters in 220ms, 5px from the field, scale 0.98 |
| Closing | Escape, outside click, Tab out, a pick | Popover exits in 140ms with the exit easing; focus returns to the trigger |
| Invalid | Unreadable text, date outside `min`/`max`, unavailable date, `aria-invalid`, server error | Error border, message with icon below, linked by `aria-describedby` |
| Read-only | `readonly` on the native input | Grey surface, value selectable, trigger disabled |
| Disabled | `disabled` on the native input | `--ds-opacity-disabled`, no trigger, not posted |
| Phone | Viewport under 640px | Popover becomes a bottom sheet with a scrim, sliding up over 500ms |
| No JavaScript | ds.js or Cally missing | The native date input, still posting `yyyy-MM-dd` |

## Anatomy

- `.ds-date-picker` — wrapper with `data-ds-date-picker`; holds the native input (hidden ISO value after enhancement).
- `.ds-date-picker__control.input` — the field box.
- `.ds-date-picker__input` — the typed text; takes the native input's `id`, ARIA and validation attributes.
- `.ds-picker-clear` — clear button, only with a value.
- `.ds-picker-trigger` — calendar button (`aria-haspopup="dialog"`, `aria-expanded`).
- `.ds-picker-popover` — the popover (`role="dialog"`) with a `.ds-calendar` and a `.ds-picker-footer` (Clear, Today).

## Usage

- Let people type. Never make the field read-only to force the calendar.
- Use the language's numeric format in the field and a medium format in messages ("12 Nov 2026"). Do not add a hint that repeats the placeholder.
- Set `min`, `max` and unavailable dates in the markup so the calendar can disable them before anyone picks a wrong day.
- Post ISO dates and parse them on the server with `DateOnly`. Never post the displayed text.
- Show the time zone in the label when it matters ("Pickup date (WIB)") and pass `data-ds-time-zone` so Today follows it.
- For a date and a time, use a date picker and a [time picker](./time-picker.md) side by side and combine them on the server.
- Do not use a date picker for a month or a year alone; use a [select](./select.md).

## Accessibility

The pattern follows the WAI-ARIA "date picker dialog": a labelled text field, a separate button that opens a non-modal dialog containing the date grid, and focus returning to the button on close.

| Key | Action |
| --- | --- |
| Type | Enter the date; it is read on Enter or when leaving the field |
| Alt + Arrow down | Open the calendar (Arrow down also opens it when the field is empty) |
| Enter in the field | Read the typed date (the form still submits) |
| Arrow keys, Page Up / Down, Home / End | Move in the calendar (see [Calendar](./calendar.md)) |
| Enter / Space on a day | Choose it, close, return focus to the trigger |
| Escape | Close without changing the value |
| Tab | Move through the popover; tabbing out of it closes it |

- The trigger is named "Choose date"; the dialog is named "Choose" plus the field label.
- Typed dates accept the language order with any separator (`/`, `.`, `-`, space), no separator (`14052026`), ISO (`2026-05-14`) and month names in the page language or English (`14 Mei 2026`, `May 14 2026`).
- Error messages name the expected format or the limit: "Enter a date as dd/mm/yyyy.", "Choose a date on or after 3 Nov 2026."
- The trigger has a 44px hit area on touch screens. The popover exits faster than it enters; with reduced motion only the opacity changes.

## Razor

```cshtml
<ds-field asp-for="DueDate" hint="The client sees this date on the invoice.">
    <ds-date-picker asp-for="DueDate" min="2026-01-01" />
</ds-field>

<ds-date-picker asp-for="DeliveryDate" disable-weekends disabled-dates="2026-12-24 2026-12-25" time-zone="Asia/Jakarta" />
```

`ds-date-picker` renders the wrapper and the native `input type="date"` through the MVC generator, so `name`, `id`, `data-val-*`, the attempted value and `input-validation-error` come from the model. `DateOnly`, `DateTime` and `DateTimeOffset` are written as `yyyy-MM-dd`. It links `aria-describedby` to `{id}-hint {id}-error`, the ids that [field](./field.md) renders. `class` stays on the wrapper; other attributes go to the input.

| Attribute | Purpose |
| --- | --- |
| `asp-for` or `name` + `value` | Model property or plain name |
| `min`, `max` | ISO limits |
| `disabled-dates`, `disable-weekends` | Unavailable days |
| `time-zone` | IANA zone for Today |
| `size` | `sm` or `lg` |
| `placeholder`, `required`, `disabled`, `readonly` | As on the input |

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-date-picker` | On a wrapper around `input type="date"` (or on the input): enhance it |
| `data-ds-disabled-dates` | Unavailable ISO dates, separated by spaces or commas |
| `data-ds-disable-weekends` | Saturday and Sunday unavailable |
| `data-ds-time-zone` | IANA zone used for Today |
| `min`, `max`, `required`, `readonly`, `disabled` | Read from the native input |

```js
document.addEventListener("ds:datepicker:change", (event) => {
  console.log(event.detail.value); // "2026-11-30" or ""
});
DS.picker.set("#dp-due", "2026-12-15"); // set and announce a change
DS.picker.open("#dp-due");
DS.picker.parseDate("14 Mei 2026", "id"); // "2026-05-14"
```

The hidden ISO input also fires `input` and `change`, so the [form guard](./form.md) and your own listeners see every change.

## Tokens

`--ds-popover`, `--ds-popover-border`, `--ds-shadow-popover`, `--ds-radius-box`, `--ds-radius-card`, `--ds-scrim`, `--ds-duration-enter`, `--ds-duration-exit`, `--ds-duration-spring`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-ease-spring`, `--ds-enter-offset`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-state-selected`, `--ds-opacity-disabled`, `--ds-size-target`, `--ds-focus`, `--color-error`, plus the [calendar](./calendar.md) tokens.

## Native and daisyUI

Starts from `input type="date"`, which stays the no-JavaScript fallback and the posted field. The field box is daisyUI's `.input` used as a wrapper, so sizes (`input-sm`, `input-lg`) and the shared field states of [input](./input.md) apply. The popover is a native `[popover]` with `popovertarget`, which gives light dismiss and Escape for free; ds.js positions it with `placeFloating` and turns it into a bottom sheet under 640px.
