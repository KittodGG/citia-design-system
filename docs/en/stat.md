---
title: Stat
group: components
category: data-display
order: 7
summary: A key figure with label, value, unit, direction of change with hidden text, comparison, sparkline slot and loading state. Also available as .ds-kpi.
source: TPS app.css .pt-kpi* L3424–3458
---

A stat puts one number first and its meaning in one muted line: "Open invoices 128, up 12% from last month". Use it for the 3 to 6 figures at the top of a page. For a series over time use a chart; for many figures use a [table](./table.md). `.ds-stat*` is the universal name; `.ds-kpi*` from version 1 renders the same.

## Examples

```html preview title="Value, unit and delta"
<div class="ds-stats">
  <div class="ds-stat is-primary">
    <div class="ds-stat__top"><span class="ds-stat__label">Open invoices</span><span class="ds-stat__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file"></use></svg></span></div>
    <div class="ds-stat__value">128</div>
    <div class="ds-stat__foot"><span class="ds-stat__delta is-success"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-up"></use></svg><span aria-hidden="true">12%</span><span class="ds-visually-hidden">Up 12% from last month</span></span><span aria-hidden="true">from last month</span></div>
  </div>
  <div class="ds-stat is-primary">
    <div class="ds-stat__top"><span class="ds-stat__label">Average payment time</span></div>
    <div class="ds-stat__value">14<span class="ds-stat__unit">days</span></div>
    <div class="ds-stat__foot"><span class="ds-stat__delta is-success"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-down"></use></svg><span aria-hidden="true">3 days</span><span class="ds-visually-hidden">Down 3 days from last month, faster</span></span><span aria-hidden="true">from last month</span></div>
  </div>
  <div class="ds-stat is-error">
    <div class="ds-stat__top"><span class="ds-stat__label">Overdue amount</span></div>
    <div class="ds-stat__value">IDR 84.5M</div>
    <div class="ds-stat__foot"><span class="ds-stat__delta is-error"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-up"></use></svg><span aria-hidden="true">8%</span><span class="ds-visually-hidden">Up 8% from last month, worse</span></span><span aria-hidden="true">from last month</span></div>
  </div>
  <div class="ds-stat">
    <div class="ds-stat__top"><span class="ds-stat__label">Active projects</span></div>
    <div class="ds-stat__value">36</div>
    <div class="ds-stat__foot"><span class="ds-stat__delta is-neutral"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-minus"></use></svg><span aria-hidden="true">0%</span><span class="ds-visually-hidden">No change from last month</span></span><span aria-hidden="true">from last month</span></div>
  </div>
</div>
```

```html preview title="Sparkline slot and comparison"
<div class="ds-stats">
  <div class="ds-stat is-success has-bar">
    <div class="ds-stat__top"><span class="ds-stat__label">Collected this month</span></div>
    <div class="ds-stat__value">IDR 312M</div>
    <div class="ds-stat__compare"><span>Last month 278M</span><span>Target 350M</span></div>
    <svg class="ds-stat__spark" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,26 15,22 30,24 45,16 60,18 75,10 90,12 105,6 120,4"/></svg>
  </div>
  <div class="ds-stat is-info">
    <div class="ds-stat__top"><span class="ds-stat__label">New customers</span></div>
    <div class="ds-stat__value">57</div>
    <div class="ds-stat__sub">Sofia Marquez closed 9 of them</div>
    <svg class="ds-stat__spark" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,20 15,24 30,14 45,18 60,12 75,20 90,8 105,14 120,10"/></svg>
  </div>
</div>
```

```html preview title="Divided, linked and loading"
<div class="ds-stats is-divided">
  <a class="ds-stat" href="#open"><div class="ds-stat__top"><span class="ds-stat__label">Open</span></div><div class="ds-stat__value">128</div><div class="ds-stat__sub">View all open invoices</div></a>
  <div class="ds-stat"><div class="ds-stat__top"><span class="ds-stat__label">Paid</span></div><div class="ds-stat__value">96</div><div class="ds-stat__sub">Since 1 Nov 2026</div></div>
  <div class="ds-stat" aria-busy="true"><span class="ds-visually-hidden" role="status">Loading</span><span class="ds-bone is-short"></span><span class="ds-bone is-value"></span><span class="ds-bone is-short"></span></div>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | Hairline card, label in `--ds-subtle`, value in metric type with tabular numbers |
| Hover (link) | Pointer over `a.ds-stat` | Lifts by `--ds-lift`, border toward the tone, `--ds-shadow-lift` |
| Focus-visible | Keyboard on a link stat | 2px `--ds-focus` ring, 2px offset |
| Pressed | `:active` | Lift ends |
| Loading | `aria-busy="true"` | Bones with shimmer; width and height hold, no layout shift |
| Delta up, down, flat | Arrow icon `arrow-up`, `arrow-down`, `minus` | Direction is the icon; sentiment is the tone (`is-success`, `is-error`, `is-neutral`) |
| Empty value | No data | Show an en dash in the value and "No data yet" in the sub line |
| Reduced motion | `prefers-reduced-motion` | No lift, no shimmer |

Up is not always good (overdue amount) and down is not always bad (payment time); set the tone for the meaning, the icon for the direction.

## Anatomy

- `.ds-stat` with tone `is-primary|success|warning|error|info`, `has-bar` (left tone bar); `.ds-stats` grid (`is-divided`).
- `__top`, `__label`, `__icon`, `__value`, `__unit`, `__sub`, `__foot`, `__delta` (`is-success|error|neutral`), `__compare`, `__spark`.
- Version 1 aliases: `.ds-kpis`, `.ds-kpi`, `.ds-kpi-top|label|icon|value|sub`, `.ds-kpi-value small` (unit). They keep the tone bar.

## Usage

- Show 3 to 6 stats in a row, label 1 to 3 words, value at most 8 characters (use `M` and `K`, put the full amount in `title`).
- Always give a delta a period ("from last month"); a bare "12%" has no meaning.
- Format with `Fmt.Decimal` or `Fmt.Number`, never in the view with string concatenation.
- Use `ds-stat__spark` for a trend of at most 30 points; it is decoration, the delta carries the facts.
- Do not colour the value; colour only the delta and the optional bar.

## Accessibility

- The delta has visible short text (`aria-hidden`) and a complete hidden sentence: "Up 12% from last month". Do not make colour or the arrow the only carrier.
- The sparkline is `aria-hidden`; provide the same data in a table or text if it matters.
- Loading uses a hidden `role="status"` "Loading" and `aria-busy`.
- A link stat has one link; the accessible name is its text content, so label and value both read.

| Key | Action |
| --- | --- |
| Tab | Moves to a link stat |
| Enter | Follows the link |

## Razor

```cshtml
<ds-stat label="Open invoices" value="128" icon="file"
         delta="12%" trend="Up" delta-text="Up 12% from last month" compare="from last month" />
<ds-stat label="Average payment time" value="14" unit="days"
         delta="3 days" trend="Down" delta-tone="Success" compare="from last month" />
<ds-stat label="Collected" value="IDR 312M" tone="Success" bar>
    <svg viewBox="0 0 120 32" preserveAspectRatio="none"><polyline points="0,26 60,18 120,4" /></svg>
</ds-stat>
<ds-stat label="Open invoices" value="" loading />
```

## Tokens

`--ds-tone`, `--ds-tone-text`, `--ds-type-metric-*`, `--ds-type-caption-*`, `--ds-border-tone-bar`, `--ds-radius-card`, `--ds-lift`, `--ds-shadow-lift`, `--color-base-300`, `--ds-subtle`.

## Native and daisyUI

Uses `div` or `a`. It replaces daisyUI `stats`, `stat-title`, `stat-value` and `stat-desc`; those still render, without delta, loading or tone. `.ds-bone` is shared with the card skeleton.
