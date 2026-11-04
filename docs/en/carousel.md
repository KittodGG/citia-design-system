---
title: Carousel
group: components
category: data-display
order: 22
summary: A horizontally scrolling set of slides on CSS scroll snap, with previous and next buttons, indicators, keyboard, mouse drag with momentum and optional autoplay.
---

Use a carousel to show a small set of equal items in one row when space is tight: a photo gallery, featured projects, product shots. Do not hide important content or required steps in it; if every item must be seen, use a list, a grid or a [stepper](./stepper.md). A carousel is a scroll container first: without JavaScript it scrolls and snaps by swipe, wheel and scrollbar. With JavaScript it adds buttons, indicators, keyboard control, mouse drag and the "Slide 2 of 5" announcement.

## Examples

### Gallery

One slide per view, dots, previous and next. Drag with the mouse, swipe on touch, press the arrow keys when focus is inside, or use the buttons.

```html preview title="Gallery with dots"
<section class="ds-carousel" data-ds-carousel aria-label="Site photos" style="max-width:34rem">
  <div class="ds-carousel__viewport"><div class="ds-carousel__track">
    <div class="ds-carousel__slide"><figure class="ds-figure"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Hills under a pale sun" draggable="false"></div><figcaption>North view, 28 October</figcaption></figure></div>
    <div class="ds-carousel__slide"><figure class="ds-figure"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dbe4f3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f6e3b8'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234a6fb0'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%2334528a'%2F%3E%3C%2Fsvg%3E" alt="Blue hills at midday" draggable="false"></div><figcaption>East access road</figcaption></figure></div>
    <div class="ds-carousel__slide"><figure class="ds-figure"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23efe3d0'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23fbf1d3'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%23b9845a'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%238a5d3b'%2F%3E%3C%2Fsvg%3E" alt="Sandy hills at dusk" draggable="false"></div><figcaption>Storage yard at dusk</figcaption></figure></div>
    <div class="ds-carousel__slide"><figure class="ds-figure"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dcebd9'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f4ead0'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234f8a5b'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%23356b43'%2F%3E%3C%2Fsvg%3E" alt="Green hills after rain" draggable="false"></div><figcaption>Planting, week 43</figcaption></figure></div>
    <div class="ds-carousel__slide"><figure class="ds-figure"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23e2e4ea'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f3e6cf'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%235b6478'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%233f4757'%2F%3E%3C%2Fsvg%3E" alt="Slate hills in fog" draggable="false"></div><figcaption>Morning fog, west fence</figcaption></figure></div>
  </div></div>
</section>
```

### Thumbnails

`data-ds-indicators="thumbs"` replaces the dots with a row of thumbnails taken from each slide's first image (or `data-ds-thumb="url"` on the slide). The current one has a 2px primary ring.

```html preview title="Thumbnail indicators"
<section class="ds-carousel" data-ds-carousel data-ds-indicators="thumbs" aria-label="Project gallery" style="max-width:34rem">
  <div class="ds-carousel__viewport"><div class="ds-carousel__track">
    <div class="ds-carousel__slide"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Foundation work, PRJ-1024" draggable="false"></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dbe4f3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f6e3b8'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234a6fb0'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%2334528a'%2F%3E%3C%2Fsvg%3E" alt="Steel frame, PRJ-1024" draggable="false"></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23efe3d0'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23fbf1d3'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%23b9845a'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%238a5d3b'%2F%3E%3C%2Fsvg%3E" alt="Cladding, PRJ-1024" draggable="false"></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dcebd9'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f4ead0'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234f8a5b'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%23356b43'%2F%3E%3C%2Fsvg%3E" alt="Landscaping, PRJ-1024" draggable="false"></div></div>
  </div></div>
</section>
```

### Several slides per view, with loop

Set `--ds-per-view` (1 to 4) on the carousel. Narrow containers show fewer: at most 2 under 40rem and 1 under 24rem, measured on the carousel itself. Next and previous move one page; `data-ds-loop` rewinds from the last page to the first. The count indicator shows `2 / 3`.

```html preview title="Three per view, loop, count"
<section class="ds-carousel" data-ds-carousel data-ds-loop data-ds-indicators="count" aria-label="Featured projects" style="--ds-per-view:3">
  <div class="ds-carousel__viewport"><div class="ds-carousel__track">
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1024</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1031</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1042</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1057</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1063</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1078</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1085</div></div></div>
  </div></div>
</section>
```

### Autoplay

Autoplay is off by default. `data-ds-autoplay="6000"` advances every 6 seconds and adds a pause button. It pauses while the pointer is over the carousel or focus is inside, while the tab or the carousel is out of view, and after the pause button is pressed. It never starts under `prefers-reduced-motion: reduce`, and then the pause button is not shown.

```html preview title="Autoplay with a pause button"
<section class="ds-carousel" data-ds-carousel data-ds-autoplay="6000" aria-label="Announcements" style="max-width:34rem">
  <div class="ds-carousel__viewport"><div class="ds-carousel__track">
    <div class="ds-carousel__slide"><div class="ds-aspect is-21-9"><div class="ds-aspect__fill">Invoices close on 30 October</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-21-9"><div class="ds-aspect__fill">New report layout from 3 November</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-21-9"><div class="ds-aspect__fill">Maintenance window, Sunday 02:00</div></div></div>
  </div></div>
</section>
```

## States

A carousel is a composite control. Each part has its own states; the table covers them. The previews above show the resting, current, disabled-end (previous on the first slide) and focus states live.

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Initial | First slide at the start, previous button `aria-disabled="true"` (not with `data-ds-loop`) |
| Hover (button) | Pointer over a button (`@media (hover: hover)`) | Surface one step deeper (`--ds-popover-hover`) |
| Pressed (button) | Pointer down | `scale(var(--ds-press-scale))`, 120ms, no scale under reduced motion |
| Focus-visible | Keyboard focus on a button, dot, thumbnail or slide content | 2px ring `--ds-focus`, offset 2px (inside the slide for slide content) |
| Disabled end | First or last page without loop | Button at `--ds-opacity-disabled`, `cursor: not-allowed`, stays focusable (`aria-disabled`) |
| Current indicator | `aria-current="true"` on the dot or thumbnail | Dot is primary and 1.5× larger; thumbnail full opacity with a primary ring; count shows `n / total` |
| Hover (indicator) | Pointer over a dot or thumbnail | Dot darkens to `--color-base-content`; thumbnail goes to full opacity |
| Dragging | Mouse down and move more than 4px | Cursor `grabbing`, snap off, the track follows the pointer; clicks on links inside are cancelled |
| Rubber band | Dragging past the first or last slide | Track stretches with resistance (up to the viewport width) and springs back over 500ms |
| Momentum | Release with speed | The landing slide is chosen by projecting the velocity (rate 0.998, at most one page); a spring with a slight overshoot carries it there |
| Offscreen slide | Slide less than 50% visible | `inert`, 60% opacity: not focusable, not read in browse mode |
| Autoplaying / paused | `data-ds-autoplay` | The button shows the pause glyph while playing and the play glyph after it is pressed; hover and focus hold the timer without changing the button |
| Reduced motion | `prefers-reduced-motion: reduce` | No autoplay, no spring or rubber band: moves are instant; dots do not scale and show a ring instead |
| No JavaScript | Script blocked | Scrolls and snaps; no buttons, no indicators |
| RTL | `dir="rtl"` | Slides run right to left; chevrons mirror; ArrowLeft goes to the next slide |
| Forced colours | `forced-colors: active` | Current dot uses `Highlight`, thumbnail outline uses `Highlight` |

## Anatomy

- `section.ds-carousel[data-ds-carousel]`: root with `aria-label` (and `aria-roledescription="carousel"`, added by the script).
- `.ds-carousel__viewport`: the scroll container with `scroll-snap-type: x mandatory`.
- `.ds-carousel__track`: flex row with `gap: var(--ds-carousel-gap)` (default 16px).
- `.ds-carousel__slide`: one item, basis `100% / --ds-per-view`; the script adds `role="group"`, `aria-roledescription="slide"` and "2 of 5".
- Added by the script: `.ds-carousel__nav.is-prev|is-next` (`.ds-media-btn`), `.ds-carousel__footer` with `.ds-carousel__play`, `.ds-carousel__dots` (`.ds-carousel__dot`) or `.ds-carousel__thumbs` (`.ds-carousel__thumb`) or `.ds-carousel__count`, and the visually hidden `.ds-carousel__status` live region.
- `.ds-carousel__caption`: optional caption under a slide's media.

## Usage

- Use 3 to 8 slides. More than that is a list, not a carousel.
- Give every slide equal weight and the same ratio; one slide never depends on another.
- Autoplay only when the content is a promotional extra, never for content people need. If you use it, 6 seconds or more per slide, and keep the pause button.
- Do not put forms, long text or required actions in a slide; a slide that scrolls out of view is easy to miss.
- Write the label of the carousel as a noun phrase ("Site photos"), not "Carousel".
- Prefer dots for up to 8 slides, thumbnails for galleries where the picture itself is the choice, and the count for per-view above 1.
- Keep slide content at a stable height (an aspect ratio) so the carousel does not jump between slides.
- Give each image `draggable="false"` so the browser's image drag does not fight the carousel drag.

## Accessibility

- Pattern: WAI-ARIA APG carousel. The root is a landmark region (`section` with a label) with `aria-roledescription="carousel"`; each slide is `role="group"` with `aria-roledescription="slide"` and a label like "2 of 5".
- A polite live region announces "Slide 2 of 5" (or "Slides 2–4 of 8" with several per view) after a person moves the carousel, after the move settles. It is `aria-live="off"` while autoplay runs, so a rotating carousel never interrupts a screen reader.
- Buttons are real `<button>` elements with names ("Previous slide", "Next slide", "Go to slide 3", "Pause automatic slide show"). Disabled ends use `aria-disabled` so focus is not lost when the last page is reached.
- Dragging is never the only way: the buttons, dots and keys are a single-pointer alternative (WCAG 2.5.1, 2.5.7).
- Autoplay pauses on hover and on focus, has a visible pause button (WCAG 2.2.2) and never starts under reduced motion.
- Slides outside the viewport are `inert`, so tabbing does not land on content you cannot see.
- Targets: buttons are 36px with a 44px hit area; dots are 24px (44px on touch).
- Contrast: button glyphs 4.5:1 on `--ds-popover`; inactive dots use `--ds-control-border` (3:1 against the page).

| Key | Action |
| --- | --- |
| Tab | Moves through previous, next, slide content, pause, indicators |
| Enter / Space | Activates the focused button, dot or thumbnail |
| Arrow Right / Arrow Left | Next / previous page while focus is inside the carousel (mirrored in RTL); inside the indicators they move focus along the row |
| Home / End | First / last page |

## Razor

```cshtml
<ds-carousel label="Site photos" per-view="1" indicators="Thumbs">
    @foreach (var photo in Model.Photos)
    {
        <ds-slide>
            <figure class="ds-figure">
                <div class="ds-aspect is-16-9"><img src="@photo.Url" alt="@photo.Alt" draggable="false" loading="lazy" /></div>
                <figcaption>@photo.Caption</figcaption>
            </figure>
        </ds-slide>
    }
</ds-carousel>
```

| Attribute | Effect |
| --- | --- |
| `label` | `aria-label` of the carousel (default "Carousel", translated) |
| `per-view` | 1 to 4 slides at once (`--ds-per-view`) |
| `loop` | `data-ds-loop`: next from the last page rewinds to the first |
| `autoplay` | Milliseconds per slide; 0 or absent = off |
| `indicators` | `Dots` (default), `Thumbs`, `Count`, `None` |

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-carousel` | Enhance this element |
| `data-ds-loop` | Rewind at the ends (autoplay always rewinds) |
| `data-ds-autoplay="ms"` | Autoplay interval |
| `data-ds-indicators` | `dots` (default), `thumbs`, `count`, `none` |
| `data-ds-thumb` (on a slide) | Thumbnail URL instead of the first image |
| `--ds-per-view` (CSS) | Slides visible at once |
| `--ds-carousel-gap` (CSS) | Space between slides |

API: `DS.carousel.next(el)`, `prev(el)`, `goTo(el, slideIndex)`, `play(el)`, `pause(el)`; `el` is an element or a selector. Event `ds:carousel:change` (bubbles) with `detail: { index, slide, count, slides }`.

Behaviour notes: touch and trackpad use the browser's own scrolling (momentum and edge bounce come from the platform). The mouse gets the drag: pointer capture, a velocity from the last 100ms, a landing slide projected with the iOS deceleration rate (0.998), a rubber band at the ends with resistance up to the viewport width, and a spring from `--ds-duration-spring` (and `--ds-duration-spring-bounce` after a throw). Pressing during a move cancels it and continues from the current position.

## Tokens

`--ds-carousel-gap`, `--ds-per-view`, `--ds-radius-box`, `--ds-popover`, `--ds-popover-hover`, `--color-base-300`, `--ds-shadow-xs`, `--ds-size-target`, `--ds-size-target-compact`, `--ds-control-border`, `--color-primary`, `--ds-focus`, `--ds-press-scale`, `--ds-opacity-disabled`, `--ds-duration-spring`, `--ds-duration-spring-bounce`, `--ds-ease-spring`, `--ds-duration-fast`, `--ds-duration-quick`.

## Native and daisyUI

The base is native CSS scroll snap (`scroll-snap-type`, `scroll-snap-align`, `scroll-snap-stop`), `overscroll-behavior-x` and container queries. daisyUI's `carousel` class is a similar scroll container; the DS carousel replaces it when you need indicators, buttons and accessibility, and does not need it.
