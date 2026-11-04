---
title: Image
group: components
category: data-display
order: 20
summary: Responsive images with radius, object-fit, captions, a loading placeholder, an error fallback and optional zoom in a lightbox dialog.
---

Use an image for content that carries information or atmosphere: a photo, a product shot, a diagram, an illustration. For a person or an organisation use an [avatar](./avatar.md); to reserve a box before the file arrives use [aspect ratio](./aspect-ratio.md); to show several images in a row use a [carousel](./carousel.md). The markup is a native `<img>`. The optional frame adds a placeholder while the file loads and a fallback when it fails. Nothing in it needs JavaScript to be visible.

## Examples

### Radius

The default radius is `--ds-radius-box` (10px). Use `is-radius-none` for edge-to-edge images, `is-radius-sm`, `is-radius-lg`, `is-radius-xl`, and `is-radius-full` with a square ratio for a round crop.

```html preview title="Radius variants"
<div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start">
  <div style="width:9rem"><img class="ds-image is-radius-none" src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Hills under a pale sun" width="160" height="90" loading="lazy" decoding="async"></div>
  <div style="width:9rem"><img class="ds-image is-radius-sm" src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dbe4f3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f6e3b8'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234a6fb0'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%2334528a'%2F%3E%3C%2Fsvg%3E" alt="Blue hills at midday" width="160" height="90" loading="lazy" decoding="async"></div>
  <div style="width:9rem"><img class="ds-image" src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23efe3d0'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23fbf1d3'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%23b9845a'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%238a5d3b'%2F%3E%3C%2Fsvg%3E" alt="Sandy hills at dusk" width="160" height="90" loading="lazy" decoding="async"></div>
  <div style="width:9rem"><img class="ds-image is-radius-xl" src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dcebd9'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f4ead0'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234f8a5b'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%23356b43'%2F%3E%3C%2Fsvg%3E" alt="Green hills after rain" width="160" height="90" loading="lazy" decoding="async"></div>
  <div style="width:5.625rem"><div class="ds-aspect is-square is-radius-full"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23e2e4ea'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f3e6cf'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%235b6478'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%233f4757'%2F%3E%3C%2Fsvg%3E" alt="Slate hills in fog"></div></div>
</div>
```

### Object fit

`is-cover` (default) fills the box and crops, `is-contain` shows the whole image with bars, `is-fill` stretches, `is-scale-down` never enlarges. Set `--ds-position` to move the focus point (`style="--ds-position: 30% 50%"`).

```html preview title="Cover, contain and fill in a 4:3 box"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr))">
  <figure class="ds-figure"><div class="ds-aspect is-4-3"><div class="ds-image-frame is-cover"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Hills, cropped to fill"></div></div><figcaption>cover</figcaption></figure>
  <figure class="ds-figure"><div class="ds-aspect is-4-3"><div class="ds-image-frame is-contain"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dbe4f3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f6e3b8'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234a6fb0'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%2334528a'%2F%3E%3C%2Fsvg%3E" alt="Hills, shown whole"></div></div><figcaption>contain</figcaption></figure>
  <figure class="ds-figure"><div class="ds-aspect is-4-3"><div class="ds-image-frame is-fill"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23efe3d0'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23fbf1d3'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%23b9845a'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%238a5d3b'%2F%3E%3C%2Fsvg%3E" alt="Hills, stretched"></div></div><figcaption>fill</figcaption></figure>
</div>
```

### Figure with caption

A `<figure class="ds-figure">` pairs the image with a `<figcaption>`. The caption is visible text, 12px, `--ds-subtle`; keep `alt` for what the image shows and the caption for what it means.

```html preview title="Figure and caption"
<figure class="ds-figure" style="max-width:26rem">
  <div class="ds-aspect is-16-9"><div class="ds-image-frame"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Hills under a pale sun, the site seen from the north" width="160" height="90" loading="lazy" decoding="async"></div></div>
  <figcaption>North view of the site, 28 October 2026. Photo: Mei Tanaka.</figcaption>
</figure>
```

### Zoom

Wrap the image in a link to the large file and add `data-ds-zoom`. Without JavaScript it opens the file; with it, a lightbox `<dialog>` opens (Esc, the close button or a click outside closes it, and focus returns to the link).

```html preview title="Zoom in a lightbox"
<figure class="ds-figure" style="max-width:20rem">
  <a class="ds-image-zoom" href="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dbe4f3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f6e3b8'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234a6fb0'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%2334528a'%2F%3E%3C%2Fsvg%3E" data-ds-zoom>
    <div class="ds-aspect is-16-9"><div class="ds-image-frame"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dbe4f3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f6e3b8'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234a6fb0'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%2334528a'%2F%3E%3C%2Fsvg%3E" alt="Blue hills at midday. Opens the enlarged image."></div></div>
  </a>
  <figcaption>Select the image to enlarge it.</figcaption>
</figure>
```

## States

The frame shows the loading and error states. JavaScript sets `data-state` (`loading`, `loaded`, `error`); the previews below freeze each state with `data-ds-ready` so the script leaves them alone.

```html preview title="Loading, blur placeholder and error"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr))">
  <figure class="ds-figure"><div class="ds-aspect is-16-9"><div class="ds-image-frame" data-state="loading" data-ds-ready><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Hills"></div></div><figcaption>Loading, shimmer</figcaption></figure>
  <figure class="ds-figure"><div class="ds-aspect is-16-9"><div class="ds-image-frame" data-placeholder="blur" data-state="loading" data-ds-ready style="--ds-blur:url(data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2016%209'%3E%3Crect%20width%3D'16'%20height%3D'9'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'12'%20cy%3D'3'%20r%3D'1.5'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%209V6l4-3%204%203%203-2%205%205z'%20fill%3D'%232f7f86'%2F%3E%3C%2Fsvg%3E)"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Hills"></div></div><figcaption>Loading, blur preview</figcaption></figure>
  <figure class="ds-figure"><div class="ds-aspect is-16-9"><div class="ds-image-frame" data-state="error" data-ds-ready><img src="/missing.jpg" alt="Site office, north entrance"><div class="ds-image-frame__fallback"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-image"></use></svg><span>Site office, north entrance</span></div></div></div><figcaption>Error, fallback with the alt text</figcaption></figure>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest, loaded | File decoded | Image fully opaque, frame background hidden behind it |
| Loading | `data-state="loading"` (set while `img.complete` is false) | Image at opacity 0, shimmer (`--ds-duration-shimmer`) or blurred preview behind it |
| Loaded | `load` event | Image fades in over `--ds-duration-quick` (160ms); the blur preview fades out |
| Error | `error` event, or a decoded image with no pixels | Image hidden, icon plus the `alt` text (or "Image unavailable") at the same size; `ds:image:error` fires |
| Hover (zoom) | Pointer over `.ds-image-zoom` | 6% tint over the image, cursor `zoom-in` |
| Focus-visible (zoom) | Tab to the link | 2px ring `--ds-focus`, same tint |
| Pressed (zoom) | Pointer down | Lightbox opens on click; the link itself does not scale |
| Reduced motion | `prefers-reduced-motion: reduce` | No shimmer; the fade is a 150ms or shorter cross-fade; the lightbox does not scale |
| More contrast / forced colours | Media features | Placeholder and fallback keep a visible edge; the link focus ring uses system colours |

## Anatomy

- `img.ds-image`: a bare image with radius, `max-width: 100%`, a `--color-base-200` background while loading.
- `.ds-image-frame`: wrapper that owns the placeholder and the fallback (`is-cover`, `is-contain`, `is-fill`, `is-none`, `is-scale-down`, `is-radius-*`).
- `.ds-image-frame__fallback`: icon and alt text shown on error.
- `figure.ds-figure` and `figcaption`: image with its caption.
- `a.ds-image-zoom[data-ds-zoom]`: link that opens the lightbox.
- `dialog.ds-lightbox`: created by the script on first use: `.ds-lightbox__figure`, `.ds-lightbox__close`.

## Usage

- Always write `alt`. Describe what the image shows in one sentence under 125 characters. For a purely decorative image use `alt=""`.
- Set `width` and `height` (or an aspect ratio) on every image so the page does not shift when the file arrives (CLS under 0.1).
- Below the fold: `loading="lazy" decoding="async"`. The first image above the fold (the likely LCP element): no `loading`, plus `fetchpriority="high"`. Never lazy-load it.
- Serve `srcset` and `sizes` so a 390px screen does not download a 2000px file; use AVIF or WebP with a JPEG fallback.
- Use `is-cover` for photos in cards, `is-contain` for logos and diagrams that must not be cropped.
- Keep text out of images. If a screenshot contains text, put the same text in the caption or `alt`.
- Do not enlarge an image that has no larger version; leave off `data-ds-zoom`.
- Do not use a caption to repeat the alt text.

## Accessibility

- A meaningful image has `alt`. If the zoom link wraps it, the alt is the link name: write it so it reads well as a link ("Blue hills at midday. Opens the enlarged image.") or add `aria-label` to the link.
- In the error state the image is hidden and the fallback text is visible, so the information that `alt` carried is still on screen.
- The lightbox is a native modal `<dialog>` with an `aria-label` taken from the caption or `alt`. Focus moves to the close button, the page behind is inert, Esc closes, focus returns to the link.
- Hover tint and focus ring use the state layer and `--ds-focus`; the ring is never removed.
- Do not rely on colour inside the image alone (charts as images need a text alternative: use [chart](./chart.md)).
- Motion is a 160ms fade and a 2% scale on the lightbox; both stop under reduced motion.

| Key | Action |
| --- | --- |
| Tab | Moves to the zoom link, then (in the lightbox) to the close button |
| Enter | Opens the lightbox from the link |
| Esc | Closes the lightbox and returns focus to the link |

## Razor

```cshtml
<ds-image src="/img/site-north.jpg" alt="Site office, north entrance" width="1200" height="800"
          ratio="3/2" caption="North entrance, 28 October 2026" zoom zoom-src="/img/site-north-2400.jpg" />

<ds-image src="/img/hero.jpg" alt="Project overview" width="1600" height="900" priority
          placeholder="blur" blur="@Model.HeroBlurDataUri" />
```

| Attribute | Effect |
| --- | --- |
| `src`, `alt`, `width`, `height`, `srcset`, `sizes` | Passed to the `<img>`; `alt` is required |
| `ratio` | Wraps in `.ds-aspect` (`1/1`, `4/3`, `3/2`, `16/9`, `21/9`, `3/4`, `9/16`) |
| `radius` | `none`, `sm`, `lg`, `xl`, `full` |
| `fit` | `cover`, `contain`, `fill`, `none`, `scale-down` |
| `caption` | Renders a `<figure>` with a `<figcaption>` |
| `zoom`, `zoom-src` | Adds the zoom link to `zoom-src` (default `src`) |
| `priority` | `fetchpriority="high"`, no lazy loading |
| `placeholder="blur"`, `blur` | Blurred preview from a small data URI |

## JavaScript

| Attribute | Effect |
| --- | --- |
| `.ds-image-frame` | The script sets `data-state` and builds the error fallback |
| `data-placeholder="blur"` + `data-ds-blur` | Blurred preview URL (`data:image/…`, `https:` or a path) |
| `data-ds-zoom` | On a link or button: open the lightbox. Source from `data-ds-zoom-src`, then `href`, then the inner image |
| `data-ds-caption` | Lightbox caption; default is the `<figcaption>` or `alt` |

API: `DS.image.zoom(element)`. Events (bubble): `ds:image:load`, `ds:image:error`.

## Tokens

`--ds-radius-box`, `--ds-radius-sm`, `--ds-radius-card`, `--ds-radius-2xl`, `--ds-radius-full`, `--color-base-200` (placeholder), `--ds-subtle` (caption, fallback), `--ds-focus`, `--ds-opacity-state-hover`, `--ds-duration-quick`, `--ds-duration-shimmer`, `--ds-duration-base`, `--ds-ease-emphasized`, `--ds-shadow-panel`, `--ds-size-measure`.

## Native and daisyUI

The component is the native `<img>` (and `<figure>`, `<dialog>`); the DS adds classes only. daisyUI's `avatar` and `mask` classes stay available; they are not used here. `loading`, `decoding`, `fetchpriority`, `srcset` and `sizes` are the platform's own.
