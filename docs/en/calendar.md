---
title: Calendar
group: components
category: forms
order: 30
summary: An inline month grid built on the Cally web component, with month and year jump, ranges, unavailable dates and names from the page language.
source: TPS app.css L315–323, L1244–1273; site.js calendar
---

A calendar shows one or more months as a grid of days and lets people pick a date or a range by pointer or keyboard. Use it inline when the calendar is the content: booking availability, a schedule sidebar, a delivery slot. To fill a form field, use the [date picker](./date-picker.md) or the [date range picker](./date-range-picker.md): they put the same calendar in a popover next to a field people can also type into.

The grid is the [Cally](https://wicky.nillia.ms/cally/) web component (MIT, shipped in `lib/cally/`), styled through its shadow parts with daisyUI's `.cally` class and refined by the design system. ds.js adds the parts Cally leaves open: weekday and month names in the page language, the first day of the week of the locale, localized navigation labels, a month and year jump view, today in a chosen time zone, and unavailable dates.

## Examples

### Single date

Today carries a thin teal ring and bold numerals; the selected day is the one solid fill. Weekday and month names come from `Intl` in the page language.

```html preview title="Single date"
<div class="ds-calendar is-card">
  <calendar-date class="cally" value="2026-11-12">
    <calendar-month></calendar-month>
  </calendar-date>
</div>
```

### Month and year jump

Select the title (for example "November 2026") to open the jump view: a year list and a 3 × 4 month grid. It is the quickest way to reach a date of birth or an old invoice. Escape returns to the days.

```html preview title="Jump to a month (select the title)"
<div class="ds-calendar is-card">
  <calendar-date class="cally" value="1994-03-18" min="1930-01-01" max="2026-12-31">
    <calendar-month></calendar-month>
  </calendar-date>
</div>
```

### Range across two months

`calendar-range` selects a start and an end. After the first click the band follows the pointer as a lighter preview until the second click. Put two `calendar-month` elements (the second with `offset="1"`) in a `.ds-calendar__months` row.

```html preview title="Range, two months"
<div class="ds-calendar is-card">
  <calendar-range class="cally" months="2" value="2026-11-24/2026-12-05">
    <div class="ds-calendar__months">
      <calendar-month></calendar-month>
      <calendar-month offset="1"></calendar-month>
    </div>
  </calendar-range>
</div>
```

### Unavailable dates and limits

`min` and `max` fade the days outside the window and stop paging past it. `data-ds-disabled-dates` and `data-ds-disable-weekends` mark single days as unavailable: they are struck through, not only faded, so the difference does not rely on colour.

```html preview title="Limits, weekends and holidays unavailable"
<div class="ds-calendar is-card" data-ds-calendar data-ds-disable-weekends data-ds-disabled-dates="2026-12-24 2026-12-25 2026-12-31">
  <calendar-date class="cally" value="2026-12-14" min="2026-12-03" max="2026-12-30" show-outside-days>
    <calendar-month></calendar-month>
  </calendar-date>
</div>
```

## States

```html preview title="Day states"
<div style="display:flex;flex-wrap:wrap;gap:1.5rem;align-items:flex-start">
  <div class="ds-calendar is-card" data-ds-calendar data-ds-disabled-dates="2026-11-20">
    <calendar-date class="cally" value="2026-11-12" min="2026-11-04" show-outside-days>
      <calendar-month></calendar-month>
    </calendar-date>
  </div>
  <div class="ds-calendar is-card">
    <calendar-range class="cally" value="2026-11-09/2026-11-18">
      <calendar-month></calendar-month>
    </calendar-range>
  </div>
  <div class="ds-calendar is-card" aria-disabled="true">
    <calendar-date class="cally" value="2026-11-12">
      <calendar-month></calendar-month>
    </calendar-date>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Day in the shown month | Base text, no fill, round 40px target (44px on touch) |
| Hover | Pointer over a day (hover devices only) | State layer `--ds-opacity-state-hover` of the text colour |
| Pressed | Pointer down | State layer `--ds-opacity-state-pressed` |
| Focus-visible | Keyboard on a day or a header button | 2px `--ds-focus` ring, 2px offset; never a fill, so focus is not mistaken for selection |
| Today | `aria-current="date"`, part `today` | Teal numerals in bold and a 1px teal ring |
| Selected | `aria-pressed="true"`, part `selected` | Solid `--color-primary`, `--color-primary-content` text, semibold |
| Range start and end | parts `range-start`, `range-end` | Solid ends, flat on the inner side |
| Range middle | part `range-inner` | Continuous tonal band, `--ds-opacity-state-selected` of primary |
| Range preview | after the first click (`data-state="tentative"`) | Lighter band, outlined end that follows the pointer |
| Outside day | `show-outside-days`, part `outside` | `--ds-quiet` text, not selectable as part of the month |
| Unavailable | `data-ds-disabled-dates`, weekends, part `disallowed` | `--ds-quiet`, struck through, `aria-disabled="true"` |
| Out of range | before `min` or after `max` | Disabled button at `--ds-opacity-disabled`; paging stops at the limit |
| Disabled calendar | `.ds-calendar[aria-disabled="true"]` | Whole grid at `--ds-opacity-disabled`, no pointer events |
| Jump view open | title `aria-expanded="true"` | Days hidden, year select and month grid fade in from 5px above |

## Anatomy

- `.ds-calendar` — wrapper; `.is-card` adds the hairline surface. Holds the jump view.
- `calendar-date.cally` or `calendar-range.cally` — the Cally element.
- `.ds-calendar__title` — the month and year button that ds.js places in Cally's `heading` slot.
- `calendar-month` — one month grid; add `offset="1"` for the next month.
- `.ds-calendar__months` — a row of months for ranges.
- `.ds-calendar__jump` — year select (`.ds-calendar__year`) and month grid (`.ds-calendar__month-grid`).

## Usage

- Use the calendar inline only when the dates are the content. In forms, use the [date picker](./date-picker.md).
- Show two months for ranges that often cross a month end (stays, billing periods); one month on screens under 640px.
- Set `min` and `max` whenever the domain has them (no delivery before tomorrow, no birth date in the future). A disabled day is better than an error after the fact.
- Use `data-ds-disabled-dates` for real gaps (public holidays, fully booked days), not to hide data you have not loaded.
- Do not colour days by meaning (red weekends, green free days) without a second cue; the struck-through unavailable day is the only built-in mark.
- Do not stack more than two months on a page. For a year view, use a [table](./table.md).

## Accessibility

Cally renders each month as a `table` with a caption-like heading, weekday headers with full names for screen readers, and day `button`s with a full date label ("12 November 2026"). Today has `aria-current="date"`, selection `aria-pressed`. The visible month is announced through a polite live region when it changes. This follows the WAI-ARIA date picker grid pattern.

| Key | Action |
| --- | --- |
| Arrow left / right | Previous / next day |
| Arrow up / down | Same day of the previous / next week |
| Page Up / Page Down | Same day of the previous / next month |
| Shift + Page Up / Page Down | Same day of the previous / next year |
| Home / End | First / last day of the week |
| Enter / Space | Select the focused day (in a range: start, then end) |
| Tab | Move between previous month, title, next month and the day grid |
| Enter on the title | Open the month and year jump view |
| Arrow keys in the jump view | Move between months (3 per row) |
| Escape in the jump view | Close it and return to the title |

- The day grid has a single tab stop; only the focused day is tabbable.
- Day targets are 40px with a pointer and 44px on touch screens (`--ds-size-target`).
- Selection uses fill, today uses a ring and weight, unavailable days a strike-through: no state depends on colour alone. In forced-colours mode selection uses `Highlight`.
- Motion: only colour changes on days; the jump view fades in over 220ms from 5px above. Reduced motion keeps the fade and drops the movement.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-calendar` | On `.ds-calendar` or on the Cally element: enhance it (any `.ds-calendar > .cally` is enhanced too) |
| `locale` | Cally attribute; default: the nearest `lang` (for example `id`, `en-GB`) |
| `first-day-of-week` | Cally attribute, 0 = Sunday; default: from the locale (`Intl.Locale.getWeekInfo`) |
| `format-weekday` | `short` (default here) or `narrow` |
| `min`, `max`, `value`, `months` | Cally attributes, ISO dates; `value` of a range is `start/end` |
| `show-outside-days` | Cally attribute: show the neighbouring months' days |
| `data-ds-disabled-dates` | Space- or comma-separated ISO dates that cannot be selected |
| `data-ds-disable-weekends` | Saturday and Sunday cannot be selected |
| `data-ds-time-zone` | IANA zone for today (`Asia/Jakarta`); default: the device |

Events come from Cally on the element: `change` (new `value`), `focusday`, and for ranges `rangestart` and `rangeend`. If `cally.js` is not on the page, ds.js loads it from `/_content/Citia.DesignSystem/lib/cally/cally.js` the first time a calendar or date picker appears.

```js
document.querySelector("#delivery-calendar").addEventListener("change", (event) => {
  console.log(event.target.value); // "2026-11-12"
});
```

## Tokens

`--color-primary`, `--color-primary-content`, `--color-base-content`, `--ds-subtle`, `--ds-muted`, `--ds-quiet`, `--ds-focus`, `--ds-border-focus`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-state-selected`, `--ds-opacity-disabled`, `--ds-radius-full`, `--ds-radius-card`, `--ds-size-target`, `--ds-type-callout-*`, `--ds-type-footnote-*`, `--ds-type-caption-*`, `--ds-duration-fast`, `--ds-duration-enter`, `--ds-ease-emphasized`, `--ds-enter-offset`. The local `--ds-calendar-day` (2.5rem, `--ds-size-target` on coarse pointers) sets the day size.

## Native and daisyUI

Built on the Cally web component with daisyUI 5's `.cally` class. The design system changes daisyUI's look: today is a ring instead of a solid primary day (the fill is reserved for selection), selection is primary instead of base-content, ranges are one tonal band, days are round 40/44px targets, weekday names use the short form, and hover and focus follow the state matrix. There is no native HTML calendar grid; `input type="date"` remains the no-JavaScript fallback of the [date picker](./date-picker.md).
