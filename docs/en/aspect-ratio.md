---
title: Aspect ratio
group: components
category: data-display
order: 21
summary: A box with a fixed width-to-height ratio (1:1, 4:3, 16:9, 21:9) that reserves space for images, video, maps and embeds before they load.
---

Use aspect ratio to reserve the space of media that arrives late: an image, a video, a map, an embedded document. The box keeps its shape at every width, so the page does not shift. For the image itself, with a placeholder and an error fallback, see [image](./image.md); for a set of boxes in a row, see [carousel](./carousel.md). It is one CSS property (`aspect-ratio`) with a class per common ratio.

## Examples

### Ratios

`is-square` (1:1), `is-4-3`, `is-3-2`, `is-16-9` (default), `is-21-9`, and the portrait ratios `is-3-4` and `is-9-16`. The box is as wide as its container; set the width on a wrapper.

```html preview title="Ratios"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(8rem,1fr));align-items:end">
  <div class="ds-aspect is-square"><div class="ds-aspect__fill">1:1</div></div>
  <div class="ds-aspect is-4-3"><div class="ds-aspect__fill">4:3</div></div>
  <div class="ds-aspect is-16-9"><div class="ds-aspect__fill">16:9</div></div>
  <div class="ds-aspect is-21-9"><div class="ds-aspect__fill">21:9</div></div>
</div>
```

### With media

A direct child that is an `img`, `video`, `iframe`, `canvas`, `svg`, `picture`, `.ds-image-frame` or `.ds-aspect__fill` fills the box. Images and video use `object-fit: cover` unless `--ds-fit` says otherwise.

```html preview title="Image and embed in a box"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))">
  <div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Hills under a pale sun" loading="lazy" decoding="async"></div>
  <div class="ds-aspect is-16-9"><iframe title="Map placeholder" src="about:blank" loading="lazy"></iframe></div>
</div>
```

### Custom ratio

Set `--ds-ratio` for any other shape: `style="--ds-ratio: 5 / 2"`. Use `is-flat` to remove the radius and the background when the box sits flush in a card.

```html preview title="Custom ratio and flat"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))">
  <div class="ds-aspect" style="--ds-ratio: 5 / 2"><div class="ds-aspect__fill">5:2</div></div>
  <div class="ds-aspect is-3-2 is-flat" style="outline:1px dashed var(--color-base-300)"><div class="ds-aspect__fill">flat</div></div>
</div>
```

## States

The box is not interactive and has one resting look. What changes is its content, so the table lists what to expect.

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Always | Fixed ratio, `--color-base-200` background, `--ds-radius-box` |
| Empty | No child | Background only; add `.ds-aspect__fill` with a short text to say what will appear |
| Loading | Media not yet loaded | The box already holds its size; the child may show a [skeleton](./skeleton.md) or the image placeholder |
| Overflow | Child larger than the box | Clipped (`overflow: hidden`); fit comes from `--ds-fit` and `--ds-position` |
| Dark | `data-theme="dark"` | Background is the dark `--color-base-200` |
| Print | `@media print` | Same ratio; background prints only if the browser prints backgrounds |
| RTL | `dir="rtl"` | No change; the ratio is symmetric |

## Anatomy

- `.ds-aspect`: the box (`position: relative; overflow: hidden; aspect-ratio: var(--ds-ratio)`).
- `.is-square`, `.is-4-3`, `.is-3-2`, `.is-16-9`, `.is-21-9`, `.is-3-4`, `.is-9-16`: ratios.
- `.is-flat`, `.is-radius-none|sm|lg|xl|full`: corner and background variants.
- `.ds-aspect__fill`: centered placeholder content.
- Child media: positioned to fill, `object-fit: var(--ds-fit, cover)`, `object-position: var(--ds-position, center)`.

## Usage

- Reserve the ratio of the real media. A 1200 × 800 photo is `is-3-2`; a video recorded at 1920 × 1080 is `is-16-9`.
- Use `is-16-9` for video and maps, `is-4-3` and `is-3-2` for photos, `is-square` for thumbnails and avatars of groups, `is-21-9` for banners above 768px.
- Give the box a width through its container (a grid cell, `max-width: 26rem`), never a fixed pixel height.
- Use a taller ratio on phones by setting `--ds-ratio` in a media query; a 21:9 banner is only 167px tall at 390px.
- Do not put text that must stay readable inside a box whose child crops (`is-cover`); use `is-contain`.
- Do not nest one aspect box inside another.

## Accessibility

- The box has no role. Put the accessible name on the child: `alt` on an image, `title` on an `iframe`, a `<track>` and controls on a video.
- A box that only reserves space for decorative media is invisible to assistive technology; do not add `role` or `aria-label` to it.
- Cropping can remove information. For photos with important edges (a sign, a label), use `is-contain` or move the focus point with `--ds-position`.
- No motion and no interaction: nothing to announce and nothing to focus.

## Razor

```cshtml
<ds-aspect-ratio ratio="16/9">
    <iframe src="@Model.MapUrl" title="Office location map" loading="lazy"></iframe>
</ds-aspect-ratio>
```

| Attribute | Effect |
| --- | --- |
| `ratio` | `1/1` (or `square`), `4/3`, `3/2`, `16/9` (default), `21/9`, `3/4`, `9/16` |
| `flat` | Removes radius and background |

## Tokens

`--ds-ratio` (set per box), `--ds-fit`, `--ds-position`, `--color-base-200`, `--ds-radius-box`, `--ds-radius-sm`, `--ds-radius-card`, `--ds-radius-2xl`, `--ds-radius-full`, `--ds-subtle`, `--ds-type-callout-size`.

## Native and daisyUI

It is the native CSS `aspect-ratio` property, supported in every current browser, so no padding hack is needed. daisyUI's `aspect-*` utilities from Tailwind (`aspect-video`, `aspect-square`) produce the same box; `.ds-aspect` adds the background, radius, clipping and child fitting.
