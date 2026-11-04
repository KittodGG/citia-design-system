---
title: Status
group: components
category: data-display
order: 3
summary: Pill and record status with a dot and a word in five tones, outline, live pulse and three sizes. The word carries the meaning, colour only supports it.
source: TPS app.css .pt-pill L3561–3577, .master-status L1560–1577, .portal-badge L3376–3414
---

Status tells people what state something is in. The word on screen carries the meaning; the dot and tint only support it (WCAG 1.4.1). Use `ds-pill` for workflow state that changes over time (Pending, Shipped) and `ds-status` for the state of a record (Active, Locked). For categories and plans use a [tag](./tag.md); for counts use a [badge](./badge.md).

## Examples

```html preview title="Pill tones"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <span class="ds-pill is-neutral">Draft</span>
  <span class="ds-pill is-info">In review</span>
  <span class="ds-pill is-success">Paid</span>
  <span class="ds-pill is-warning">Overdue</span>
  <span class="ds-pill is-error">Rejected</span>
  <span class="ds-pill is-primary">Selected</span>
</div>
```

```html preview title="Outline, plain, live and sizes"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <span class="ds-pill is-info is-outline">Scheduled 12 Nov 2026</span>
  <span class="ds-pill is-neutral is-outline">Cancelled</span>
  <span class="ds-pill is-neutral is-plain">Not sent</span>
  <span class="ds-pill is-success is-live">Live</span>
  <span class="ds-pill is-warning is-sm">Small</span>
  <span class="ds-pill is-warning">Medium</span>
  <span class="ds-pill is-warning is-lg">Large</span>
</div>
```

```html preview title="Record status"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <span class="ds-status is-success has-dot">Active</span>
  <span class="ds-status is-neutral has-dot">Inactive</span>
  <span class="ds-status is-warning has-dot">Locked after 5 attempts</span>
  <span class="ds-status is-error has-dot">Suspended</span>
  <span class="ds-status is-info has-dot is-outline">Provisioning</span>
  <span class="ds-status is-success has-dot is-live">Syncing</span>
  <span class="ds-status is-success is-sm">Small</span>
  <span class="ds-status is-success is-lg">Large</span>
</div>
```

```html preview title="Live dot and live badge"
<div style="display:flex;gap:1.25rem;flex-wrap:wrap;align-items:center">
  <span style="display:inline-flex;gap:.5rem;align-items:center"><span class="ds-live-dot" aria-hidden="true"></span> Receiving data</span>
  <span style="display:inline-flex;gap:.5rem;align-items:center"><span class="ds-live-dot is-lg is-warning" aria-hidden="true"></span> Reconnecting</span>
  <span class="ds-live-badge"><span class="ds-live-dot" aria-hidden="true"></span> Live</span>
</div>
```

## States

```html preview title="Pill as a filter link, and disabled"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <a class="ds-pill is-success" href="#paid">Paid</a>
  <button type="button" class="ds-pill is-warning">Overdue</button>
  <button type="button" class="ds-pill is-error" disabled>Rejected</button>
  <span class="ds-pill is-info" style="max-inline-size:9rem"><span class="ds-pill__label" style="overflow:hidden;text-overflow:ellipsis">Waiting for bank confirmation</span></span>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | 10% tone tint, 25% tone hairline, tone text, dot |
| Hover | Pointer over a link or button pill | Tint rises to 16% |
| Focus-visible | Keyboard focus on a link or button pill | 2px `--ds-focus` ring, 2px offset |
| Pressed | `:active` | Tint rises to 18% |
| Disabled | `disabled` or `aria-disabled="true"` | `--ds-opacity-disabled`, `cursor: not-allowed` |
| Live | `.is-live` | Dot blinks every 1.2 s; `.ds-live-dot` also pings every 1.6 s |
| Reduced motion | `prefers-reduced-motion` | Dots stay still; the word keeps the meaning |
| Overflow | Long text in a narrow cell | `.ds-pill__label` truncates with an ellipsis; put the full text in `title` |
| Forced colours | `forced-colors: active` | System-colour border and dot |

A plain pill or status is not interactive. Only add a link or button when it filters or opens details.

## Anatomy

- `.ds-pill`: dot (`::before`) and word. Modifiers: `is-success|warning|error|info|primary|neutral`, `is-outline`, `is-plain`, `is-live`, `is-sm|lg`, `is-truncate`.
- `.ds-status`: squared tonal label. Modifiers: the same tones, `has-dot`, `is-outline`, `is-live`, `is-sm|lg`. Version 1 `is-active`, `is-inactive`, `is-locked`, `is-provisioning` still work.
- `.ds-live-dot` with `is-sm|lg`; `.ds-live-badge`; `.ds-usage` caption under a status.

## Usage

- Write the state as a word (Paid, Overdue), 1 to 3 words. Put reasons in the detail page.
- Use one mapping from enum to `(label, tone)` in one place and reuse it in lists, details and filters.
- Use at most 5 tones; warning means "check this", error means "failed or rejected".
- Use `is-live` only for something happening now, and keep the word ("Live").
- Do not use a status as a button label or to show a count.

## Accessibility

- The visible word is the status. Do not add `aria-label` that repeats it differently.
- Text colours are AA-safe tone tokens (`--ds-tone-text`): 4.5:1 or more on the tint in light and dark.
- A pure dot without text needs a hidden label.
- `.ds-live-dot` is decorative (`aria-hidden="true"`); say "Live" in text. Announce changes in a live region of your own if they matter.
- Motion: only the live dot loops, and it stops under `prefers-reduced-motion`.

## Razor

```cshtml
@{
    var (label, tone) = Model.Status switch
    {
        InvoiceStatus.Paid => ("Paid", Tone.Success),
        InvoiceStatus.Overdue => ("Overdue", Tone.Warning),
        InvoiceStatus.Rejected => ("Rejected", Tone.Error),
        _ => ("Draft", Tone.Neutral),
    };
}
<ds-pill tone="@tone">@label</ds-pill>
<ds-pill tone="Success" live>Live</ds-pill>
<ds-status tone="Success">Active</ds-status>
<ds-status tone="Warning" outline size="sm">Locked</ds-status>
```

## Tokens

`--ds-tone`, `--ds-tone-text`, `--ds-tone-content`, `--color-success|warning|error|info`, `--ds-link`, `--ds-quiet`, `--ds-radius-full`, `--ds-radius-sm`, `--ds-opacity-disabled`, `--ds-focus`.

## Native and daisyUI

Plain `span`. It replaces daisyUI `badge-soft` for state. The tone classes (`is-success`…) are shared with tag, badge, stat, alert and progress through `--ds-tone`.
