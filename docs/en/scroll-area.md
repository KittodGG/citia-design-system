---
title: Scroll area
group: components
category: layout
order: 6
summary: A scrolling region with thin styled scrollbars and edge shadows or fades that show where more content is, vertical, horizontal or both.
---

A scroll area holds content that is taller or wider than its space and tells the reader there is more. Use it for lists, logs, code and wide strips inside a fixed-size panel. For whole pages let the window scroll; for tabular data use [Table](./table.md), which has its own sticky headers.

## Examples

### Vertical

Edge shadows appear only on the side that has more content: scroll the list to see the top shadow come in as the bottom one leaves.

```html preview title="Vertical scroll area"
<div class="ds-scroll-area" style="--ds-scroll-max-height: 14rem; border: 1px solid var(--color-base-300); border-radius: var(--ds-radius-box)">
  <div class="ds-scroll-area__viewport" tabindex="0" role="region" aria-label="Recent activity">
    <ul class="ds-stack is-gap-0" style="padding: 0.5rem 1rem; list-style: none; margin: 0">
      <li style="padding: 0.5rem 0">Ayu Lestari approved INV-2026-0418</li>
      <li style="padding: 0.5rem 0">Daniel Okafor opened PRJ-1024</li>
      <li style="padding: 0.5rem 0">Mei Tanaka uploaded 3 files</li>
      <li style="padding: 0.5rem 0">Sofia Marquez commented on INV-2026-0419</li>
      <li style="padding: 0.5rem 0">Ayu Lestari changed the due date to 30 Nov 2026</li>
      <li style="padding: 0.5rem 0">Daniel Okafor archived PRJ-0987</li>
      <li style="padding: 0.5rem 0">Mei Tanaka invited 2 members</li>
      <li style="padding: 0.5rem 0">Sofia Marquez exported the Q3 report</li>
    </ul>
  </div>
</div>
```

### Horizontal and fade

`.is-horizontal` scrolls sideways. `.is-fade` replaces the shadow with a soft mask where scroll-driven animations exist (the shadow stays as the fallback without it).

```html preview title="Horizontal scroll area"
<div class="ds-scroll-area is-horizontal">
  <div class="ds-scroll-area__viewport" tabindex="0" role="region" aria-label="Quarterly totals">
    <div class="ds-cluster is-nowrap is-gap-md" style="padding: 0.75rem 0.5rem">
      <div class="ds-surface" style="padding: 1rem; flex: none; width: 11rem">Q1 2026<br>48,200.00</div>
      <div class="ds-surface" style="padding: 1rem; flex: none; width: 11rem">Q2 2026<br>52,640.00</div>
      <div class="ds-surface" style="padding: 1rem; flex: none; width: 11rem">Q3 2026<br>61,075.50</div>
      <div class="ds-surface" style="padding: 1rem; flex: none; width: 11rem">Q4 2026<br>37,990.00</div>
      <div class="ds-surface" style="padding: 1rem; flex: none; width: 11rem">Q1 2027<br>0.00</div>
    </div>
  </div>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| At start | Scrolled to the top or start | Shadow on the end side only |
| In the middle | Scrolled partway | Shadows on both sides |
| At end | Scrolled to the bottom or end | Shadow on the start side only |
| Fits | Content smaller than the area | No shadow, no scrollbar |
| Hover | Pointer over the area (hover devices) | Scrollbar thumb darkens from 30% to 48% |
| Focus-visible | Keyboard focus on the viewport | 2px ring `--ds-focus`, 2px offset |
| Dragging the thumb | Pointer down on the thumb | Browser default, thumb stays visible |
| Hidden scrollbar | `.is-hidden-scrollbar` | Scrollbar not drawn; scrolling and shadows still work |
| Both axes | `.is-both` | Both scrollbars; shadows off |

## Anatomy

- `.ds-scroll-area`: wrapper. Variables `--ds-scroll-bg` (the surface behind it) and `--ds-scroll-shadow`.
- `.ds-scroll-area__viewport`: the scrolling element. Set the height with `--ds-scroll-max-height` or a fixed height.
- Modifiers: `.is-horizontal`, `.is-both`, `.is-fade`, `.is-plain` (no edge effect), `.is-hidden-scrollbar`.

## Usage

- Set `--ds-scroll-bg` to the colour behind the area when it is not the page surface (for example a card), so the edge shadows blend in.
- Give the area a height or `max-height`; without a limit it does not scroll.
- Show more than one item past the edge so people can see it continues (the shadow helps).
- Do not nest scroll areas in the same direction; scroll chaining is contained with `overscroll-behavior: contain`.

## Accessibility

- A scrollable region must be reachable by keyboard: give the viewport `tabindex="0"`, `role="region"` and an accessible name. Arrow keys, Page Up and Down, Home and End then scroll it.
- The shadows are decoration; the scroll position is also exposed by the native scrollbar.
- Scrollbars keep at least 10px of hit width; thumb contrast is 3:1 against the track.
- Reduced motion: nothing animates except the scroll-driven fade, which follows the scroll position and is not time-based.

| Key | Action |
| --- | --- |
| Tab | Moves focus to the viewport |
| Up, Down, Left, Right | Scroll by a line |
| Page Up, Page Down | Scroll by a page |
| Home, End | Jump to start, end |

## Tokens

`--color-base-100`, `--color-base-content` (mixed into the shadow), `--ds-radius-full`, `--ds-focus`, `--ds-border-focus`, `--ds-duration-base`.

## Native and daisyUI

Built on `overflow: auto`, `scrollbar-width: thin`, `scrollbar-color` and background-attachment layers, so it works without JavaScript. daisyUI has no scroll area; Tailwind's `overflow-*` utilities still apply.
