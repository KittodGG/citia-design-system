---
title: Skeleton
group: components
category: feedback
order: 31
summary: Placeholder shapes (text lines, heading, avatar, card, table rows, image) that hold the layout while content loads, with a calm shimmer that stops under reduced motion.
---

Use a skeleton when you know the shape of what is coming and it takes longer than about 300 ms: a list, a card, a profile, a table. It keeps the layout still so the page does not jump when the data arrives. Use a [spinner](./spinner.md) when the shape is unknown or the wait is short, and a [progress](./progress.md) bar when you can say how far along it is. A skeleton is a placeholder, not content: it is hidden from assistive technology and the loading state is announced once on the region.

## Examples

### Text, heading and avatar

`ds-skeleton` with a shape class: `is-text` (12px line), `is-heading`, `is-avatar` (36px circle, `is-lg` 56px), `is-rect`, `is-image`, `is-button`, `is-pill`. Wrap lines in `.ds-skeleton-lines` and the last one is shorter, like real text.

```html preview title="Profile header and paragraph"
<div class="ds-busy" aria-busy="true" style="max-width:26rem">
  <p class="ds-visually-hidden" role="status">Loading profile…</p>
  <div class="ds-skeleton-row" aria-hidden="true">
    <span class="ds-skeleton is-avatar is-lg"></span>
    <div class="ds-skeleton-stack"><span class="ds-skeleton is-heading"></span><span class="ds-skeleton is-text is-w-50"></span></div>
  </div>
  <div class="ds-skeleton-stack ds-skeleton-lines" aria-hidden="true" style="margin-top:1rem">
    <span class="ds-skeleton is-text"></span><span class="ds-skeleton is-text"></span><span class="ds-skeleton is-text"></span>
  </div>
</div>
```

### Card

A card skeleton copies the card's padding, border and rhythm, so the swap is invisible. Images keep their ratio with `is-image`.

```html preview title="Card"
<div class="ds-skeleton-card" aria-hidden="true" style="max-width:20rem">
  <span class="ds-skeleton is-image"></span>
  <span class="ds-skeleton is-heading"></span>
  <div class="ds-skeleton-stack ds-skeleton-lines"><span class="ds-skeleton is-text"></span><span class="ds-skeleton is-text"></span></div>
  <div class="ds-skeleton-row"><span class="ds-skeleton is-pill"></span><span class="ds-skeleton is-button"></span></div>
</div>
```

### Table rows

`.ds-skeleton-table` draws header and body rows on a grid. Set `--ds-skeleton-cols` to the real column widths.

```html preview title="Table rows"
<div class="ds-skeleton-table" aria-hidden="true" style="--ds-skeleton-cols: 2fr 1fr 1fr 1fr">
  <div class="ds-skeleton-row"><span class="ds-skeleton is-text is-w-50"></span><span class="ds-skeleton is-text is-w-75"></span><span class="ds-skeleton is-text is-w-75"></span><span class="ds-skeleton is-text is-w-50"></span></div>
  <div class="ds-skeleton-row"><span class="ds-skeleton is-text"></span><span class="ds-skeleton is-text is-w-50"></span><span class="ds-skeleton is-pill"></span><span class="ds-skeleton is-text is-w-75"></span></div>
  <div class="ds-skeleton-row"><span class="ds-skeleton is-text is-w-75"></span><span class="ds-skeleton is-text is-w-75"></span><span class="ds-skeleton is-pill"></span><span class="ds-skeleton is-text is-w-50"></span></div>
  <div class="ds-skeleton-row"><span class="ds-skeleton is-text"></span><span class="ds-skeleton is-text is-w-50"></span><span class="ds-skeleton is-pill"></span><span class="ds-skeleton is-text is-w-75"></span></div>
</div>
```

### Delayed

Add `is-delayed` to show the skeleton only after 300 ms (override with `--ds-delay`). A response that arrives sooner never shows it. The skeleton still occupies its space while hidden, so nothing moves.

```html preview title="Appears after 300 ms"
<div class="ds-skeleton-stack ds-skeleton-lines" aria-hidden="true" style="max-width:20rem">
  <span class="ds-skeleton is-text is-delayed"></span><span class="ds-skeleton is-text is-delayed"></span><span class="ds-skeleton is-text is-delayed"></span>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Loading | Content pending, container `aria-busy="true"` | Shapes tinted 8% of `base-content`, a highlight sweeps left to right every `--ds-duration-shimmer` (1.6s, linear, infinite) |
| Delayed | `is-delayed` | Invisible for 300 ms, then fades in over 160ms |
| Loaded | Content arrives | Remove the skeleton and set `aria-busy="false"`; fade the content in with opacity only (150ms or less) |
| Error | Request fails | Replace the skeleton with the error message or an [alert](./alert.md); never leave it shimmering |
| Empty | Request returns no items | Replace the skeleton with an [empty state](./empty-state.md) |
| Reduced motion | `prefers-reduced-motion: reduce` | No shimmer: a static tint; the 300 ms delay and the fade stay |
| Forced colours | `forced-colors: active` | Shapes get a 1px `CanvasText` outline |
| Dark | `data-theme="dark"` | Tint and highlight use the light `base-content` at the same percentages |
| RTL | `dir="rtl"` | The sweep runs right to left |
| Interaction | Not applicable | Shapes are not focusable and not clickable |

## Anatomy

- `.ds-skeleton`: any shape. Modifiers: `is-text`, `is-heading`, `is-avatar` (+ `is-lg`), `is-rect`, `is-image`, `is-button`, `is-pill`, `is-w-25|50|75`, `is-delayed`.
- `.ds-skeleton-stack`: vertical stack; `.ds-skeleton-lines` shortens the last text line.
- `.ds-skeleton-row`: horizontal row (avatar plus lines, table row).
- `.ds-skeleton-card`: card-shaped container with padding and border.
- `.ds-skeleton-table`: grid rows with `--ds-skeleton-cols`.
- `.ds-busy`: a region that may carry `aria-busy`; its `.ds-loading-overlay` child shows a spinner after 300 ms.

## Usage

- Match the real layout: same number of lines (3 to 5), same avatar size, same card padding, same row height. Mismatched skeletons cause a visible jump.
- Show at most 6 repeated rows; 4 is usually enough. Do not fake 50 rows.
- Use skeletons only for the first load of a region. For a refresh, keep the old content and show a thin [progress](./progress.md) bar or dim it.
- Do not use a skeleton for something that loads in under 300 ms, or for content that may never have a shape (error, empty).
- Do not animate more than one region at a time on a small screen; shimmer everywhere is noise.
- Do not put text inside a skeleton shape.

## Accessibility

- Skeleton shapes are decoration: put `aria-hidden="true"` on them (or on their wrapper).
- Announce the state once: `aria-busy="true"` on the region that is loading, and a visually hidden `role="status"` message ("Loading profile…") that is added with the skeleton. When content arrives, set `aria-busy="false"`; screen readers read the new content. Do not leave the status message behind.
- Do not move focus into a skeleton. If the focused element is replaced by loaded content, restore focus to the same logical element.
- The shimmer is one of the few allowed infinite animations. It is slow (1.6s), low contrast (8%) and stops under reduced motion, which satisfies WCAG 2.3.3 and 2.2.2 for a looping decorative effect.
- Contrast: skeleton shapes are not text and need no contrast ratio; they must still be visible against the surface (8% tint, 1px outline in forced colours).

## Razor

```cshtml
<div class="ds-busy" aria-busy="true">
    <p class="ds-visually-hidden" role="status">@DsText.T("media.loading")</p>
    <div class="ds-skeleton-row">
        <ds-skeleton shape="Avatar" />
        <div class="ds-skeleton-stack"><ds-skeleton shape="Heading" /><ds-skeleton lines="2" /></div>
    </div>
</div>
```

| Attribute | Effect |
| --- | --- |
| `shape` | `Text` (default), `Heading`, `Avatar`, `Rect`, `Image`, `Button`, `Pill` |
| `lines` | With `Text`: renders a paragraph of 2 to 12 lines, the last one shorter |
| `delayed` | Show after 300 ms |

The tag helper writes `aria-hidden="true"` for you.

## Tokens

`--ds-duration-shimmer`, `--ds-delay` (default 300ms), `--ds-duration-quick`, `--color-base-content` (tint 8%), `--color-base-300`, `--color-base-100`, `--ds-radius-md`, `--ds-radius-full`, `--ds-radius-box`, `--ds-radius-card`, `--ds-size-avatar`, `--ds-size-target-compact`, `--ds-space-card-x`, `--ds-space-card-y`.

## Native and daisyUI

Skeletons are plain `span` and `div` elements with `aria-hidden`. daisyUI's `skeleton` class is similar; use `.ds-skeleton` for the shimmer token, the reduced-motion behaviour and the shape modifiers. `aria-busy` is the native ARIA attribute for a region that is updating. Other component families (card, stat, avatar) use a smaller piece called `.ds-bone` with the same look and the same shimmer; `.ds-skeleton` is the documented class for your own layouts.
