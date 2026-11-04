---
title: Badge
group: components
category: data-display
order: 2
summary: A small count or dot that signals new or unread items, capped at 99+, in six tones, pinned to buttons and avatars with the indicator.
source: TPS app.css badge colours L256–257, L3068–3071
---

A badge says that something needs attention and, with a count, how much. It is not a status (use [status](./status.md) for "Active" or "Failed") and not a label (use [tag](./tag.md)). Pin it to a corner of a button or an [avatar](./avatar.md) with the [indicator](./indicator.md).

## Examples

```html preview title="Count, cap and tones"
<div style="display:flex;gap:.75rem;align-items:center;flex-wrap:wrap">
  <span class="ds-badge" data-ds-badge data-count="3"></span>
  <span class="ds-badge" data-ds-badge data-count="42"></span>
  <span class="ds-badge" data-ds-badge data-count="128"></span>
  <span class="ds-badge is-info" data-ds-badge data-count="5"></span>
  <span class="ds-badge is-success" data-ds-badge data-count="12"></span>
  <span class="ds-badge is-warning" data-ds-badge data-count="7"></span>
  <span class="ds-badge is-error" data-ds-badge data-count="9"></span>
  <span class="ds-badge is-neutral" data-ds-badge data-count="2"></span>
</div>
```

```html preview title="Soft, outline, sizes and dot"
<div style="display:flex;gap:.75rem;align-items:center;flex-wrap:wrap">
  <span class="ds-badge is-soft" data-ds-badge data-count="14"></span>
  <span class="ds-badge is-outline is-error" data-ds-badge data-count="3"></span>
  <span class="ds-badge is-sm" data-ds-badge data-count="8"></span>
  <span class="ds-badge is-lg" data-ds-badge data-count="21"></span>
  <span class="ds-badge is-dot is-sm"><span class="ds-visually-hidden">New</span></span>
  <span class="ds-badge is-dot is-success"><span class="ds-visually-hidden">Online</span></span>
  <span class="ds-badge is-dot is-lg is-error"><span class="ds-visually-hidden">Needs action</span></span>
</div>
```

```html preview title="On an icon button and an avatar"
<div style="display:flex;gap:2rem;align-items:center;flex-wrap:wrap">
  <span class="ds-indicator">
    <button type="button" class="btn btn-ghost btn-square" aria-label="Notifications, 4 unread"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"></use></svg></button>
    <span class="ds-badge ds-indicator__item is-error is-sm" data-ds-badge data-count="4" data-ds-badge-label="unread"></span>
  </span>
  <span class="ds-indicator is-round">
    <span class="ds-avatar c1 is-round is-lg" role="img" aria-label="Daniel Okafor"><span aria-hidden="true">DO</span></span>
    <span class="ds-badge is-dot ds-indicator__item is-bottom is-success"><span class="ds-visually-hidden">Online</span></span>
  </span>
</div>
```

```html preview title="Live update"
<div style="display:flex;gap:1rem;align-items:center">
  <span class="ds-indicator">
    <button type="button" class="btn btn-ghost btn-square" aria-label="Inbox"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-mail"></use></svg></button>
    <span id="demo-badge" class="ds-badge ds-indicator__item is-error is-sm" data-ds-badge data-count="98" data-ds-badge-live></span>
  </span>
  <button type="button" class="btn btn-sm" onclick="const b=document.getElementById('demo-badge');DS.badge.set(b,Number(b.dataset.count)+1)">Receive message</button>
  <button type="button" class="btn btn-sm btn-ghost" onclick="DS.badge.set(document.getElementById('demo-badge'),0)">Mark all read</button>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Count above 0 | Solid tone fill, white text, tabular numbers |
| Capped | Count above `data-ds-badge-max` (default 99) | Text `99+`; hidden text says "More than 99 items" |
| Zero | Count is 0 | Hidden (`hidden`); `data-ds-badge-zero="show"` keeps it |
| Updated | `DS.badge.set` with a new value | One 120 ms scale pop from 0.8 to 1; none under reduced motion |
| Dot | `.is-dot` | 8px circle, no text; meaning goes in the host's accessible name |
| Appear and leave | `hidden` toggled on an indicator item | Opacity and scale 0.6 to 1 over 150 to 160 ms |
| Hover, pressed, disabled | Not applicable | A badge is not interactive; the host button carries these states |

## Anatomy

- `.ds-badge` with `is-primary|info|success|warning|error|neutral`, `is-soft`, `is-outline`, `is-sm|lg`, `is-dot`.
- Generated children: `[data-ds-badge-text]` (visible, `aria-hidden`) and `.ds-visually-hidden` (full sentence).

## Usage

- Cap at 99 and show `99+`. Do not show 4-digit counts.
- Hide at 0; an empty badge reads as a bug.
- Use one tone per area. Error for items that block work, primary for general unread.
- A dot means "something changed", a number means "this many". Do not mix both on one host.
- Never put a badge on text links; use a [tag](./tag.md) or [status](./status.md).

## Accessibility

- The host carries the meaning: `aria-label="Notifications, 4 unread"`. The badge text is `aria-hidden` and a hidden sentence is added.
- Live announcements are opt-in (`data-ds-badge-live` creates `role="status"`). Use it for a single visible badge, never for a list of badges.
- Solid fills use `-content` colours: at least 4.5:1 in both themes.
- Dots must have hidden text or a host label; colour alone is not a message.

## Razor

```cshtml
<ds-badge count="@Model.Unread" max="99" label="unread" tone="Error" size="sm" live />
<ds-badge dot tone="Success" label="Online" />
```

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-badge` | Enhances a badge: builds the visible and hidden text |
| `data-count` | Current value |
| `data-ds-badge-max` | Cap, default 99 |
| `data-ds-badge-label` | Noun for the hidden sentence ("unread") |
| `data-ds-badge-live` | Announce changes politely |
| `data-ds-badge-zero="show"` | Keep the badge at 0 |

`DS.badge.set(element, count)` updates it. Events: none.

## Tokens

`--color-primary`, `--color-info`, `--color-success`, `--color-warning`, `--color-error` and their `-content`, `--ds-tone`, `--ds-tone-text`, `--ds-radius-full`, `--ds-duration-quick`, `--ds-duration-enter`, `--ds-ease-emphasized`.

## Native and daisyUI

`.ds-badge` is a `span`. daisyUI `badge` still works and keeps its soft-tone text fix; use `.ds-badge` for counts and dots because it adds the cap, live update and indicator placement.
