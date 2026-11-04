---
title: Indicator
group: components
category: data-display
order: 9
summary: Pins a badge or dot to any corner of any element, with logical placement for RTL and a fade and scale when it appears.
---

An indicator is a wrapper that places a small item (a [badge](./badge.md), a dot, an icon) on a corner of another element: an icon button, an [avatar](./avatar.md), a card. It only positions; the item carries the meaning, and the host's accessible name must say it too. It matches daisyUI's `indicator`.

## Examples

```html preview title="Corners"
<div style="display:flex;gap:2rem;align-items:center;flex-wrap:wrap">
  <span class="ds-indicator"><span class="ds-avatar c4 is-lg" role="img" aria-label="Top end"><span aria-hidden="true">TE</span></span><span class="ds-badge is-error is-dot ds-indicator__item"><span class="ds-visually-hidden">New</span></span></span>
  <span class="ds-indicator"><span class="ds-avatar c4 is-lg" role="img" aria-label="Top start"><span aria-hidden="true">TS</span></span><span class="ds-badge is-error is-dot ds-indicator__item is-start"><span class="ds-visually-hidden">New</span></span></span>
  <span class="ds-indicator"><span class="ds-avatar c4 is-lg" role="img" aria-label="Bottom end"><span aria-hidden="true">BE</span></span><span class="ds-badge is-success is-dot ds-indicator__item is-bottom"><span class="ds-visually-hidden">Online</span></span></span>
  <span class="ds-indicator"><span class="ds-avatar c4 is-lg" role="img" aria-label="Bottom start"><span aria-hidden="true">BS</span></span><span class="ds-badge is-success is-dot ds-indicator__item is-bottom is-start"><span class="ds-visually-hidden">Online</span></span></span>
  <span class="ds-indicator"><span class="ds-avatar c4 is-lg" role="img" aria-label="Middle end"><span aria-hidden="true">ME</span></span><span class="ds-badge is-info is-dot ds-indicator__item is-middle"><span class="ds-visually-hidden">Info</span></span></span>
  <span class="ds-indicator"><span class="ds-avatar c4 is-lg" role="img" aria-label="Top center"><span aria-hidden="true">TC</span></span><span class="ds-badge is-warning is-dot ds-indicator__item is-center"><span class="ds-visually-hidden">Warning</span></span></span>
</div>
```

```html preview title="Count on a button, dot on a round avatar"
<div style="display:flex;gap:2rem;align-items:center;flex-wrap:wrap">
  <span class="ds-indicator">
    <button type="button" class="btn btn-ghost btn-square" aria-label="Messages, 12 unread"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-message-square"></use></svg></button>
    <span class="ds-badge is-error is-sm ds-indicator__item" data-ds-badge data-count="12" data-ds-badge-label="unread"></span>
  </span>
  <span class="ds-indicator is-round">
    <span class="ds-avatar c5 is-round is-xl" role="img" aria-label="Mei Tanaka, online"><span aria-hidden="true">MT</span></span>
    <span class="ds-badge is-dot ds-indicator__item is-bottom is-success"></span>
  </span>
  <span class="ds-indicator">
    <article class="ds-card" style="padding:1rem 2rem"><strong>Draft report</strong></article>
    <span class="ds-tag is-warning ds-indicator__item">Draft</span>
  </span>
</div>
```

```html preview title="Show and hide"
<div style="display:flex;gap:1rem;align-items:center">
  <span class="ds-indicator">
    <button type="button" class="btn btn-ghost btn-square" aria-label="Notifications"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"></use></svg></button>
    <span id="ind-dot" class="ds-badge is-error is-dot ds-indicator__item"><span class="ds-visually-hidden">New notifications</span></span>
  </span>
  <button type="button" class="btn btn-sm" onclick="const d=document.getElementById('ind-dot');d.hidden=!d.hidden">Toggle dot</button>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Item present | Item sits on the corner, centred on the corner point, 2px ring in `--color-base-100` |
| Appear | `hidden` removed | Opacity and scale 0.6 to 1 over 150 to 160 ms (`@starting-style`) |
| Leave | `hidden` set | Fades and shrinks, then `display: none` (`allow-discrete`) |
| Round host | `.ds-indicator.is-round` | Item pulled 14% inward so it overlaps the arc |
| RTL | `dir="rtl"` | Start and end swap automatically |
| Reduced motion | `prefers-reduced-motion` | Opacity cross-fade only, no scale |

The indicator has no hover, pressed or disabled state: those belong to the host.

## Anatomy

- `.ds-indicator` (inline-flex wrapper, `position: relative`; `is-round` for circular hosts).
- `.ds-indicator__item` with placement `is-start`, `is-center`, `is-middle`, `is-bottom` (default: top and end). Combine, for example `is-bottom is-start`.
- daisyUI `indicator`, `indicator-item` and the `indicator-*` placements still work.

## Usage

- Put one item per corner. Two items on the same corner overlap.
- Keep items small: a dot (8px), a count of 1 to 2 digits, or a short tag.
- Do not place the indicator on text. Wrap an icon, avatar, thumbnail or card.
- Name the meaning on the host (`aria-label="Messages, 12 unread"`) or give the item hidden text.

## Accessibility

- The item is presentation. Provide the same information as text on the host or inside the item (`.ds-visually-hidden`).
- A dot must never be the only signal of an error. Pair it with text elsewhere.
- Positioning does not change reading order; keep the item after the host in the DOM.

## Razor

No tag helper; compose with the others:

```cshtml
<span class="ds-indicator">
    <button type="button" class="btn btn-ghost btn-square" aria-label="@T["Messages, {0} unread", Model.Unread]">
        <ds-icon name="message-square" />
    </button>
    <ds-badge class="ds-indicator__item" count="@Model.Unread" size="sm" tone="Error" />
</span>
```

## Tokens

`--color-base-100` (ring), `--ds-duration-fast`, `--ds-duration-quick`, `--ds-ease-standard`, `--ds-ease-emphasized`.

## Native and daisyUI

A `span` wrapper using logical offsets (`inset-inline-end`) and the `translate` property with a direction variable. It is compatible with daisyUI `indicator` and adds the ring, the enter and leave transition and RTL handling.
