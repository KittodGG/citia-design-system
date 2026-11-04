---
title: Date range picker
group: components
category: forms
order: 32
summary: A start and an end date in one field, with a two-month calendar, hover preview and bilingual presets. Posts two yyyy-MM-dd values.
source: TPS site.js enhanceRange
---

A date range picker collects a start date and an end date: a report period, a stay, a contract term. It shows both dates in one field, opens two months side by side with presets such as "Last 7 days", and previews the band while the pointer looks for the end date. The form posts two ISO values under their own names. For a single date, use the [date picker](./date-picker.md).

The server renders a `fieldset` with two native `input type="date"` fields, each with its label. That markup is the no-JavaScript fallback. ds.js joins them into one field, keeps both inputs as hidden ISO values and moves their hints and errors under the joined field.

## Examples

### Report period with presets

```html preview title="Report period"
<fieldset class="ds-fieldset" data-ds-date-range style="max-width:24rem">
  <legend>Report period</legend>
  <div class="ds-date-range__fields">
    <div class="ds-field">
      <label for="dr-from">Start date</label>
      <input id="dr-from" name="From" type="date" class="input" value="2026-10-01">
    </div>
    <div class="ds-field">
      <label for="dr-to">End date</label>
      <input id="dr-to" name="To" type="date" class="input" value="2026-10-31">
    </div>
  </div>
</fieldset>
```

### Booking without presets, with limits

`data-ds-presets="none"` removes the preset list. `min` and `max` on either input limit both ends; the calendar disables the days outside.

```html preview title="Stay, from today"
<fieldset class="ds-fieldset" data-ds-date-range data-ds-presets="none" style="max-width:24rem">
  <legend>Stay</legend>
  <div class="ds-date-range__fields">
    <div class="ds-field">
      <label for="dr-in">Check-in</label>
      <input id="dr-in" name="CheckIn" type="date" class="input" min="2026-11-02" max="2027-06-30">
    </div>
    <div class="ds-field">
      <label for="dr-out">Check-out</label>
      <input id="dr-out" name="CheckOut" type="date" class="input" min="2026-11-02" max="2027-06-30">
    </div>
  </div>
  <p class="ds-hint">Up to 30 nights per booking.</p>
</fieldset>
```

### Filter bar that submits

With `data-ds-autosubmit` the form submits as soon as both dates are set, by a preset or by the second click. Use it in filter bars, not in data-entry forms.

```html preview title="Filter with chosen presets"
<form class="ds-form" action="#" onsubmit="return false">
  <fieldset class="ds-fieldset" data-ds-date-range data-ds-autosubmit data-ds-presets="today,yesterday,last7,thisWeek,thisMonth,lastMonth" style="max-width:24rem">
    <legend class="ds-visually-hidden">Invoice date</legend>
    <div class="ds-date-range__fields">
      <div class="ds-field"><label for="dr-f1">From</label><input id="dr-f1" name="IssuedFrom" type="date" class="input input-sm"></div>
      <div class="ds-field"><label for="dr-f2">To</label><input id="dr-f2" name="IssuedTo" type="date" class="input input-sm"></div>
    </div>
  </fieldset>
</form>
```

## States

```html preview title="States"
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(19rem,1fr));gap:1.5rem">
  <fieldset class="ds-fieldset" data-ds-date-range>
    <legend>Empty</legend>
    <div class="ds-date-range__fields">
      <div class="ds-field"><label for="drs-a1">Start date</label><input id="drs-a1" type="date" class="input"></div>
      <div class="ds-field"><label for="drs-a2">End date</label><input id="drs-a2" type="date" class="input"></div>
    </div>
  </fieldset>
  <fieldset class="ds-fieldset" data-ds-date-range>
    <legend>Invalid order</legend>
    <div class="ds-date-range__fields">
      <div class="ds-field"><label for="drs-b1">Start date</label><input id="drs-b1" type="date" class="input" value="2026-11-20"></div>
      <div class="ds-field"><label for="drs-b2">End date</label><input id="drs-b2" type="date" class="input" value="2026-11-20" aria-invalid="true" aria-describedby="drs-b2-error"><p class="ds-field-error" id="drs-b2-error">The end date must be on or after the start date.</p></div>
    </div>
  </fieldset>
  <fieldset class="ds-fieldset" data-ds-date-range>
    <legend>Disabled</legend>
    <div class="ds-date-range__fields">
      <div class="ds-field"><label for="drs-c1">Start date</label><input id="drs-c1" type="date" class="input" value="2026-09-01" disabled></div>
      <div class="ds-field"><label for="drs-c2">End date</label><input id="drs-c2" type="date" class="input" value="2026-09-30" disabled></div>
    </div>
  </fieldset>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Empty | No dates | Two format hints separated by an en dash |
| Filled | Both dates | Both dates in the numeric format; clear button; footer shows the range and its length ("Oct 1 – 31, 2026 · 31 days") |
| Open | Trigger or Alt + Arrow down | Presets on the start, two months on the end (one month and a scrolling preset row under 640px) |
| Choosing the end | After the first click | Footer says "Now choose the end date."; the band follows the pointer in a lighter tint with an outlined end |
| Preset active | Value equals a preset | Preset in the selection tint with a check |
| Preset unavailable | The preset falls outside `min`/`max` | Preset disabled at `--ds-opacity-disabled` |
| Invalid | Unreadable date, outside the limits, end before start, server error | Error border on the field, message under it |
| Disabled / read-only | On either native input | Field disabled or grey, trigger disabled |
| No JavaScript | ds.js or Cally missing | The two native date fields with their labels |

## Anatomy

- `fieldset[data-ds-date-range]` with a `legend` — group and name.
- `.ds-date-range__fields` — the two native fields; folded away after enhancement.
- `.ds-date-range__control.input` — the joined field: two `.ds-date-range__input`, a `.ds-date-range__dash`, `.ds-picker-clear`, `.ds-picker-trigger`.
- `.ds-picker-popover` — `.ds-picker-presets` list, `.ds-calendar` with `calendar-range` and `.ds-calendar__months`, `.ds-picker-footer` with a live `.ds-picker-footer__note` and Clear.

## Usage

- Offer presets that match the task: reports look back (Last 7 days, This month), bookings look forward (Next 7 days). Keep the list to 6 items or fewer.
- Use `data-ds-autosubmit` only in filter bars; data-entry forms keep an explicit Save.
- Validate the order and the maximum length on the server too; the client message is a courtesy.
- Name the group with a `legend` ("Report period"); the two inputs keep their own labels for screen readers.
- Do not use two separate date pickers for one range: people lose the overview of the span.

## Accessibility

| Key | Action |
| --- | --- |
| Type in either input | Enter that date; read on Enter or when leaving the input |
| Alt + Arrow down | Open the popover |
| Tab | Presets, then the calendar header and the day grid, then Clear |
| Enter / Space on a preset | Apply it and close |
| Enter / Space on a day | First press sets the start, the second the end; then the popover closes |
| Escape | Close without changes |

- Each typed input is named by its own label ("Start date", "End date"); the trigger is "Choose dates"; the dialog uses the legend ("Choose Report period").
- The footer note is a polite live region: it announces "Now choose the end date." after the first pick and the chosen range after the second.
- Presets use `aria-pressed` and show a check, so the active one is not marked by colour only.

## Razor

```cshtml
<ds-date-range-picker start-for="From" end-for="To" legend="Report period"
                      presets="last7,last30,thisMonth,lastMonth" max="2026-12-31" />
```

Renders the `fieldset`, the legend, two `ds-field` blocks with labels (display names from the model, otherwise "Start date" and "End date"), the native inputs with model values and `data-val-*`, and the validation messages. Options: `start-name`/`end-name` and `start-value`/`end-value` without a model, `hint`, `min`, `max`, `presets`, `autosubmit`, `time-zone`, `required`, `disabled`.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-date-range` | On a container with exactly two `input type="date"`: enhance it |
| `data-ds-presets` | Comma-separated keys: `today`, `yesterday`, `last7`, `last30`, `next7`, `thisWeek`, `thisMonth`, `lastMonth`, `thisYear`; `none` hides the list. Default `today,last7,last30,thisMonth,lastMonth,thisYear` |
| `data-ds-autosubmit` | On the container or the form: submit when a full range is chosen |
| `data-ds-disabled-dates`, `data-ds-disable-weekends`, `data-ds-time-zone` | As on the [calendar](./calendar.md) |

```js
document.addEventListener("ds:daterange:change", (event) => {
  const { start, end } = event.detail; // "2026-10-01", "2026-10-31"
});
DS.picker.set("#dr-from", "2026-11-01", "2026-11-30");
```

This week starts on the first day of the locale. Ranges are inclusive: "Last 7 days" is today and the 6 days before it.

## Tokens

As the [date picker](./date-picker.md) and the [calendar](./calendar.md), plus `--ds-radius-md` and `--ds-radius-full` for presets and `--color-base-300` for the preset divider.

## Native and daisyUI

Two native `input type="date"` remain the posted fields and the fallback. The joined field is daisyUI's `.input` as a wrapper. The calendar is Cally's `calendar-range` with daisyUI's `.cally`, refined as described on the [calendar](./calendar.md) page.
