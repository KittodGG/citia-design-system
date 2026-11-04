---
title: Timeline
group: components
category: data-display
order: 13
summary: A vertical sequence of events with an icon and tone per event, a time, optional day groups, a compact form and pending steps.
source: TPS app.css .ds-feed (dataviz.css), Tailwind UI feeds, Material 3 timelines
---

A timeline lists what happened, newest or oldest first, along a thin line. Each event has a marker, a title, an optional sentence and a time. Use it for an audit trail, a record history or a delivery log. Use a [stepper](./stepper.md) for steps the user moves through, a [list](./list.md) when order in time does not matter, and the activity feed in a dashboard card for a short live stream.

## Examples

```html preview title="Events with icon and tone"
<ol class="ds-timeline" aria-label="History of INV-2026-0418">
  <li class="ds-timeline__item is-success" aria-current="true">
    <span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check-circle"></use></svg></span>
    <div class="ds-timeline__body">
      <div class="ds-timeline__head"><p class="ds-timeline__title">Payment received</p><time class="ds-timeline__time" datetime="2026-11-03T09:42">3 Nov, 09:42</time></div>
      <p class="ds-timeline__text">Kintara Studio paid 4,280.00 USD by bank transfer.</p>
    </div>
  </li>
  <li class="ds-timeline__item is-info">
    <span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-mail"></use></svg></span>
    <div class="ds-timeline__body">
      <div class="ds-timeline__head"><p class="ds-timeline__title">Reminder sent to Ayu Lestari</p><time class="ds-timeline__time" datetime="2026-11-01T08:00">1 Nov, 08:00</time></div>
    </div>
  </li>
  <li class="ds-timeline__item is-warning">
    <span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg></span>
    <div class="ds-timeline__body">
      <div class="ds-timeline__head"><p class="ds-timeline__title">Total differs from the purchase order</p><time class="ds-timeline__time" datetime="2026-10-29T16:20">29 Oct, 16:20</time></div>
      <p class="ds-timeline__text">Invoice 4,280.00 USD, purchase order 4,240.00 USD. Daniel Okafor accepted the difference.</p>
    </div>
  </li>
  <li class="ds-timeline__item is-primary">
    <span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-plus"></use></svg></span>
    <div class="ds-timeline__body">
      <div class="ds-timeline__head"><p class="ds-timeline__title">Invoice created by <a href="#">Mei Tanaka</a></p><time class="ds-timeline__time" datetime="2026-10-28T10:05">28 Oct, 10:05</time></div>
    </div>
  </li>
</ol>
```

```html preview title="Grouped by day"
<ol class="ds-timeline" aria-label="Project activity">
  <li class="ds-timeline__group">
    <h3 class="ds-timeline__day">Today</h3>
    <ol class="ds-timeline__list">
      <li class="ds-timeline__item is-primary"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Sofia Marquez edited the scope</p><time class="ds-timeline__time" datetime="2026-11-02T14:10">14:10</time></div></div></li>
      <li class="ds-timeline__item is-success"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Milestone 2 approved</p><time class="ds-timeline__time" datetime="2026-11-02T09:30">09:30</time></div><p class="ds-timeline__text">Approved by Daniel Okafor.</p></div></li>
    </ol>
  </li>
  <li class="ds-timeline__group">
    <h3 class="ds-timeline__day">Yesterday</h3>
    <ol class="ds-timeline__list">
      <li class="ds-timeline__item is-neutral"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-users"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Hana Kim joined the project</p><time class="ds-timeline__time" datetime="2026-11-01T11:00">11:00</time></div></div></li>
    </ol>
  </li>
</ol>
```

```html preview title="Compact, with a pending step"
<ol class="ds-timeline is-compact" aria-label="Delivery of order 8841">
  <li class="ds-timeline__item is-success"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Order placed</p><time class="ds-timeline__time">Mon 08:12</time></div></div></li>
  <li class="ds-timeline__item is-success"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Packed</p><time class="ds-timeline__time">Mon 15:40</time></div></div></li>
  <li class="ds-timeline__item is-primary" aria-current="true"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-truck"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Out for delivery</p><time class="ds-timeline__time">Tue 07:55</time></div></div></li>
  <li class="ds-timeline__item is-pending"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-package"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Delivered</p><time class="ds-timeline__time">Expected Tue</time></div></div></li>
</ol>
```

## States

```html preview title="Loading, load more and empty"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));max-width:48rem">
  <div aria-busy="true">
    <ol class="ds-timeline" aria-label="Loading history">
      <li class="ds-timeline__item is-skeleton"><span class="ds-timeline__marker"></span><div class="ds-timeline__body"><span class="ds-cell-skeleton" style="--ds-skeleton-w:60%"></span><span class="ds-cell-skeleton" style="--ds-skeleton-w:85%;margin-top:.5rem"></span></div></li>
      <li class="ds-timeline__item is-skeleton"><span class="ds-timeline__marker"></span><div class="ds-timeline__body"><span class="ds-cell-skeleton" style="--ds-skeleton-w:45%"></span><span class="ds-cell-skeleton" style="--ds-skeleton-w:70%;margin-top:.5rem"></span></div></li>
    </ol>
  </div>
  <div>
    <ol class="ds-timeline" aria-label="History"><li class="ds-timeline__item is-neutral"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-clock"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Draft saved</p><time class="ds-timeline__time">12:04</time></div></div></li></ol>
    <button type="button" class="btn btn-ghost btn-sm ds-timeline__more">Show 12 earlier events</button>
  </div>
  <p class="ds-list__empty">No activity yet. Events appear here as people work on this record.</p>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | Hairline connector, tonal round marker with an icon, title 650 weight, time and text in `--ds-subtle` |
| Tones | `is-primary`, `is-info`, `is-success`, `is-warning`, `is-error` (neutral by default) | Tinted marker fill and border, tone-coloured icon (text-safe shades, 3:1 or more) |
| Current | `aria-current="true"` on the item | Ring around the marker and a 750 weight title |
| Pending | `.is-pending` | Dashed marker, dashed connector, quiet text |
| Link in the title | `a` inside `.ds-timeline__title` | Underlined; hover and focus-visible as links |
| Loading | `.is-skeleton` items in `aria-busy="true"` | Grey marker and bars; the line stays |
| Empty | No events | One sentence; no empty line |
| Long text | Title or text longer than the line | Wraps; time moves under the title on a narrow column |
| Compact | `.is-compact` | 18px marker with a dot instead of an icon, 10px gap, smaller spacing |
| Load more | A `btn-ghost` `.ds-timeline__more` | Aligned with the text column |

## Anatomy

- `.ds-timeline` (`ol`) with `is-compact`; `.ds-timeline__group` with `.ds-timeline__day` (`h3`) and `.ds-timeline__list` (`ol`) for day groups.
- `.ds-timeline__item` with a tone (`is-primary|info|success|warning|error`), `is-pending`, `is-skeleton`.
- `.ds-timeline__marker` (icon), `.ds-timeline__body`, `.ds-timeline__head`, `.ds-timeline__title`, `.ds-timeline__time`, `.ds-timeline__text`, `.ds-timeline__extra`, `.ds-timeline__more`.

## Usage

- Use an `ol` and keep one order: newest first for history, oldest first for a process. Say which in the `aria-label` or the heading.
- Write titles as past-tense facts with a name: "Payment received", "Mei Tanaka approved the budget".
- Always use a `time` element with `datetime`. Show relative times ("2 h ago") only within the last day and give the full date in `title`.
- Group by day once there are more than 8 events or the span is longer than a day. Day headings use the viewer's date format (`Fmt.Date`).
- Use a tone only when it carries meaning (success, warning, error); everything else stays neutral or primary. Never rely on tone alone: the title says what happened.
- Do not use a timeline for more than about 50 events at once. Load more on demand.
- Do not animate the line or the markers; the timeline is read, not watched.

## Accessibility

- An `ol` announces the number of items; give it an `aria-label` that names the subject.
- Marker icons are decorative (`aria-hidden="true"`); the state is in the title text. Pending steps say "Expected" or "Pending" in the time text.
- `aria-current="true"` marks the latest or the current step; it also adds the ring and a heavier title, so it is not colour alone.
- Tone inks meet 4.5:1 (text) and 3:1 (icons and marker borders) on their tinted fill in both themes. In forced colours the markers keep their borders.
- The component has no animation, so reduced motion changes nothing.

| Key | Action |
| --- | --- |
| Tab | Moves through links and buttons inside events (the list itself is not a tab stop) |

## Razor

Timelines are markup; render the events from your model.

```cshtml
<ol class="ds-timeline" aria-label="@Model.Title">
  @foreach (var e in Model.Events)
  {
    <li class="ds-timeline__item @e.Tone.Css()">
      <span class="ds-timeline__marker">@Icon.Svg(e.Tone.IconName())</span>
      <div class="ds-timeline__body">
        <div class="ds-timeline__head">
          <p class="ds-timeline__title">@e.Title</p>
          <time class="ds-timeline__time" datetime="@e.At.ToString("O")">@Fmt.DateTime(e.At)</time>
        </div>
        @if (e.Text is not null) { <p class="ds-timeline__text">@e.Text</p> }
      </div>
    </li>
  }
</ol>
```

`Tone.Css()` returns `is-success` and so on; `Tone.IconName()` returns a matching icon.

## JavaScript

None. The timeline is static HTML and CSS.

## Tokens

`--ds-timeline-marker` (1.75rem, or 1.125rem when compact), `--ds-timeline-gap`, `--color-primary`, `--color-info`, `--color-success`, `--color-warning`, `--color-error`, `--ds-primary-soft`, `--ds-info-soft`, `--ds-success-soft`, `--ds-warning-soft`, `--ds-error-soft`, `--ds-neutral-soft`, `--ds-primary-text`, `--ds-info-text`, `--ds-success-text`, `--ds-warning-text`, `--ds-error-text`, `--ds-subtle`, `--color-base-300`, `--ds-radius-full`, `--ds-type-callout-size`.

## Native and daisyUI

Builds on `ol`, `li`, `time` and `h3`. daisyUI `timeline` is not used; it is horizontal-first and has no tones, day groups or pending state. The older `.ds-feed` stays available in the dashboard styles for short live feeds.
