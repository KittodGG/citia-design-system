---
title: Chip
group: components
category: data-display
order: 5
summary: Compact interactive element for filtering, entering values, suggesting actions or shortcuts, with chip sets that move focus with the arrow keys.
source: TPS app.css .pt-chip L3515–3524
---

A chip is a small control. Four kinds: **filter** (toggles on and off), **input** (a value the user entered, removable), **assist** (starts an action or shows context) and **suggestion** (offers a value to try). A chip is interactive; for a passive label use a [tag](./tag.md), for a single state use [status](./status.md). For a mutually exclusive choice among 2 to 5 options, a segmented control is clearer.

## Examples

```html preview title="Filter chips with count (multiple)"
<div class="ds-chips" role="group" aria-label="Invoice filters" data-ds-chips>
  <button type="button" class="ds-chip" aria-pressed="true" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">All</span><span class="ds-chip__count">128</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Overdue</span><span class="ds-chip__count">12</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Paid</span><span class="ds-chip__count">96</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Draft</span><span class="ds-chip__count">20</span></button>
</div>
```

```html preview title="Single choice"
<div class="ds-chips" role="group" aria-label="Period" data-ds-chips="single">
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">7 days</span></button>
  <button type="button" class="ds-chip" aria-pressed="true" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">30 days</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Quarter</span></button>
</div>
```

```html preview title="Input chips (Backspace or Delete removes)"
<div class="ds-chips" role="group" aria-label="Recipients" data-ds-chips>
  <span class="ds-chip is-input" tabindex="0"><span class="ds-chip__label">ayu.lestari@example.com</span><button type="button" class="ds-chip__remove" tabindex="-1" data-ds-chip-remove aria-label="Remove ayu.lestari@example.com"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></span>
  <span class="ds-chip is-input" tabindex="-1"><span class="ds-chip__label">daniel@example.com</span><button type="button" class="ds-chip__remove" tabindex="-1" data-ds-chip-remove aria-label="Remove daniel@example.com"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></span>
  <span class="ds-chip is-input is-error" tabindex="-1"><span class="ds-chip__label">mei.tanaka@</span><button type="button" class="ds-chip__remove" tabindex="-1" data-ds-chip-remove aria-label="Remove mei.tanaka@"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></span>
</div>
```

```html preview title="Assist and suggestion chips"
<div class="ds-chips" role="group" aria-label="Quick actions" data-ds-chips>
  <button type="button" class="ds-chip is-assist"><svg class="ds-icon ds-chip__icon" aria-hidden="true"><use href="#ds-icon-calendar"></use></svg><span class="ds-chip__label">Add to calendar</span></button>
  <a class="ds-chip is-assist" href="#map"><svg class="ds-icon ds-chip__icon" aria-hidden="true"><use href="#ds-icon-map-pin"></use></svg><span class="ds-chip__label">Directions</span></a>
  <button type="button" class="ds-chip is-suggestion"><svg class="ds-icon ds-chip__icon" aria-hidden="true"><use href="#ds-icon-sparkles"></use></svg><span class="ds-chip__label">Invoices due this week</span></button>
  <button type="button" class="ds-chip is-suggestion"><span class="ds-chip__label">Unpaid over 30 days</span></button>
</div>
```

```html preview title="Overflow: +N more"
<div class="ds-chips" role="group" aria-label="Departments" data-ds-chips data-ds-chips-max="3">
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Finance</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Operations</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Legal</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Procurement</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">People and culture</span></button>
</div>
```

## States

```html preview title="Disabled, aria-disabled, selected, error, sizes"
<div class="ds-chips">
  <button type="button" class="ds-chip" disabled>Disabled</button>
  <button type="button" class="ds-chip" aria-disabled="true" title="Available on the Pro plan">aria-disabled</button>
  <button type="button" class="ds-chip" aria-pressed="true"><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span>Selected</button>
  <span class="ds-chip is-input is-error">Invalid value</span>
  <button type="button" class="ds-chip is-sm">Small</button>
  <button type="button" class="ds-chip is-lg">Large</button>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | `--ds-control-border` outline, base-100 fill |
| Hover | Pointer | 6% state layer (`--ds-opacity-state-hover`) |
| Focus-visible | Keyboard | 2px `--ds-focus` ring, 2px offset |
| Pressed | `:active` | 10% layer and scale `--ds-press-scale` on pointer-down |
| Selected | `aria-pressed="true"`, `aria-current`, `aria-selected` | 12% primary fill, primary border and text, check glyph slides in (160 ms) |
| Disabled | `disabled` | `--ds-opacity-disabled`, no hover or press |
| aria-disabled | `aria-disabled="true"` | Same look, stays focusable; explain why in `title` or helper text |
| Error | `.is-error` | Error border, 8% error fill, error text |
| Overflow | Long label | Truncates at the container width; full text in `title` |
| Reduced motion | `prefers-reduced-motion` | No press scale, no slide; the glyph cross-fades |

## Anatomy

- `.ds-chips` set (`is-nowrap` scrolls in one row); `.ds-chip` with `is-assist|suggestion|input`, `is-error`, `is-sm|lg`, `is-more`.
- `.ds-chip__check` (filter glyph), `.ds-chip__icon`, `.ds-chip__label`, `.ds-chip__count`, `.ds-chip__remove`.

## Usage

- Keep filter chips to 3 to 8 per set; beyond 5 use `data-ds-chips-max`.
- Label 1 to 3 words. Put the count in `.ds-chip__count`, not in the label.
- A filter chip must change something visible (a list). If it navigates, use a link with `aria-current`.
- Use input chips for values the user typed or picked, each removable; show validation with `is-error` and a message nearby.
- Do not put a chip inside a chip or use chips as primary actions; use a [button](./button.md).

## Accessibility

- Filter chips are `button` with `aria-pressed`; selected state is the check glyph plus fill, never colour alone.
- Group chips in `role="group"` with `aria-label`. Roving tabindex: one Tab stop per set.
- Input chips are focusable (`tabindex`) and removable with Backspace or Delete; the remove button is also a `button` with a name ("Remove ayu.lestari@example.com"), not in the Tab order.
- Removal is announced politely ("ayu.lestari@example.com removed") and focus moves to the next chip.
- Height is 32px (24px small) on fine pointers and 44px on coarse pointers.

| Key | Action |
| --- | --- |
| Tab | Moves into and out of the chip set (one stop) |
| Arrow right, left | Next, previous chip (reversed in RTL) |
| Home, End | First, last chip |
| Space, Enter | Toggles a filter chip; activates an assist or suggestion chip |
| Backspace, Delete | Removes the focused input chip |

## Razor

```cshtml
<ds-chip-set label="Invoice filters" mode="multiple" max="6">
    <ds-chip pressed count="128">All</ds-chip>
    <ds-chip count="12">Overdue</ds-chip>
    <ds-chip variant="Assist" icon="calendar">Add to calendar</ds-chip>
    <ds-chip variant="Suggestion" href="/invoices?due=week">Due this week</ds-chip>
    <ds-chip variant="Input" error>mei.tanaka@</ds-chip>
</ds-chip-set>
```

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-chips` | Chip set: roving focus; `single` makes pressed chips exclusive |
| `data-ds-chips-max` | Collapses chips beyond N behind a "+N more" chip (`aria-expanded`) |
| `data-ds-chip-toggle` | Click flips `aria-pressed` |
| `data-ds-chip-remove` | Button removes its chip |

Events: `ds:chip:toggle` (`detail.pressed`), `ds:chip:remove` (cancelable; `detail.label`), `ds:chips:expand`. API: `DS.chips.remove(chip)`. For server work (filtering a list) listen to `ds:chip:toggle` or make the chip a link.

## Tokens

`--ds-control-border`, `--color-primary`, `--ds-quiet`, `--ds-opacity-state-hover|pressed`, `--ds-press-scale`, `--ds-size-target`, `--ds-duration-instant|fast|quick`, `--ds-ease-emphasized`, `--ds-focus`.

## Native and daisyUI

Uses `button`, `a` or `span`. daisyUI has no chip; `.btn` and `.badge` are the nearest. Version 1 classes `.ds-chip-count`, `aria-current` selection still work.
