---
title: Sheet
group: components
category: overlays
order: 3
summary: A panel that slides in from an edge for a side task, with a spring that follows the finger, snap points and drag to dismiss.
---

A sheet is a modal panel attached to one edge of the screen. It suits tasks that relate to the page behind it and need
more room than a [Dialog](./dialog.md): filters, a record's details, a long form, a shopping cart, or, on phones, a
list of actions from the bottom edge. The page stays visible at the edge, which keeps the context. Sheets slide in with
the critically damped spring and leave the same way; a bottom sheet can be dragged between snap points or flicked away.
For a menu of a few actions on desktop use a [Dropdown menu](./dropdown-menu.md); for the app's main navigation on
phones use the [Sidebar](./sidebar.md) drawer.

## Examples

### Side sheet

Opens from the inline end (right in left-to-right languages). The body scrolls; the footer holds the actions.

```html preview title="Filters from the end edge"
<button type="button" class="btn" data-ds-sheet-open="sheet-filters">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-filter"></use></svg>
  Filters
</button>

<dialog id="sheet-filters" class="ds-sheet is-end" aria-labelledby="sheet-filters-title">
  <div class="ds-sheet__header">
    <div class="ds-sheet__heading">
      <h2 id="sheet-filters-title" class="ds-sheet__title">Filter invoices</h2>
      <p class="ds-sheet__description">1,284 invoices match.</p>
    </div>
    <button type="button" class="ds-sheet__close" data-ds-sheet-close aria-label="Close">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
    </button>
  </div>
  <div class="ds-sheet__body">
    <div style="display: grid; gap: 1.25rem">
      <label class="ds-field"><span class="ds-label">Client</span>
        <select class="select w-full"><option>All clients</option><option>PT Sinar Mandiri</option><option>Okafor Logistics</option><option>Tanaka Studio</option></select></label>
      <label class="ds-field"><span class="ds-label">Status</span>
        <select class="select w-full"><option>Any status</option><option>Draft</option><option>Sent</option><option>Paid</option><option>Overdue</option></select></label>
      <label class="ds-field"><span class="ds-label">Issued from</span><input class="input w-full" type="date" value="2026-01-01"></label>
      <label class="ds-field"><span class="ds-label">Issued to</span><input class="input w-full" type="date" value="2026-03-31"></label>
      <label class="ds-field"><span class="ds-label">Minimum amount (IDR)</span><input class="input w-full" inputmode="decimal" placeholder="0"></label>
    </div>
  </div>
  <div class="ds-sheet__footer">
    <button type="button" class="btn btn-ghost">Reset</button>
    <button type="button" class="btn btn-primary" data-ds-sheet-close>Show 1,284 invoices</button>
  </div>
</dialog>
```

### Sides and sizes

```html preview title="Start, top and large"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-sheet-open="sheet-start">From the start</button>
  <button type="button" class="btn" data-ds-sheet-open="sheet-top">From the top</button>
  <button type="button" class="btn" data-ds-sheet-open="sheet-large">Large, from the end</button>
</div>

<dialog id="sheet-start" class="ds-sheet is-start is-sm" aria-labelledby="sheet-start-title">
  <div class="ds-sheet__header">
    <div class="ds-sheet__heading"><h2 id="sheet-start-title" class="ds-sheet__title">Workspaces</h2></div>
    <button type="button" class="ds-sheet__close" data-ds-sheet-close aria-label="Close"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
  <div class="ds-sheet__body">
    <ul style="display: grid; gap: 0.75rem; margin: 0; padding: 0; list-style: none">
      <li>Jakarta office</li><li>Surabaya warehouse</li><li>Tokyo studio</li><li>Lagos branch</li>
    </ul>
  </div>
</dialog>

<dialog id="sheet-top" class="ds-sheet is-top" aria-labelledby="sheet-top-title">
  <div class="ds-sheet__header">
    <div class="ds-sheet__heading">
      <h2 id="sheet-top-title" class="ds-sheet__title">Maintenance on Sunday, 01:00–03:00 WIB</h2>
      <p class="ds-sheet__description">Exports and invoice sending pause during the window. Drafts are saved.</p>
    </div>
    <button type="button" class="ds-sheet__close" data-ds-sheet-close aria-label="Close"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
  <button type="button" class="ds-sheet__handle" aria-label="Close the panel"></button>
</dialog>

<dialog id="sheet-large" class="ds-sheet is-end is-lg" aria-labelledby="sheet-large-title">
  <div class="ds-sheet__header">
    <div class="ds-sheet__heading">
      <h2 id="sheet-large-title" class="ds-sheet__title">PRJ-1024 · Warehouse relocation</h2>
      <p class="ds-sheet__description">Owner Ayu Lestari · due 30 April 2026</p>
    </div>
    <button type="button" class="ds-sheet__close" data-ds-sheet-close aria-label="Close"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
  <div class="ds-sheet__body">
    <p>Move stock from the Cakung warehouse to the new site in Cikarang in three waves. Each wave closes when the count matches the system within 0.5%.</p>
    <p>Budget IDR 480.000.000, of which 62% is spent. Next milestone: wave 2 count on 14 April.</p>
  </div>
  <div class="ds-sheet__footer">
    <button type="button" class="btn" data-ds-sheet-close>Close</button>
    <button type="button" class="btn btn-primary">Open project</button>
  </div>
</dialog>
```

| Class | Size |
| --- | --- |
| `is-sm` | 20rem wide (top and bottom: 30rem max width) |
| default | 24rem (`--ds-size-panel`); top and bottom: 40rem |
| `is-lg` | 32rem; top and bottom: 52rem |
| `is-xl` | 42rem |
| `is-full` | Whole screen width |

On phones side sheets leave a 3rem strip of the page visible, so there is always context and a place to tap away.

### Bottom sheet with snap points

Drag the handle or the header. Let go above the middle and it settles on the nearest snap point; flick down and it
closes. The scrim follows the finger. With a keyboard, the handle is a button: Enter steps through the snap points and
ArrowUp / ArrowDown grow or shrink the sheet.

```html preview title="Bottom sheet, 45% and 100%"
<button type="button" class="btn" data-ds-sheet-open="sheet-share">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-share"></use></svg>
  Share report
</button>

<dialog id="sheet-share" class="ds-sheet is-bottom" data-ds-sheet-snap="45%,100%" aria-labelledby="sheet-share-title">
  <button type="button" class="ds-sheet__handle" aria-label="Resize or close the panel"></button>
  <div class="ds-sheet__header">
    <div class="ds-sheet__heading">
      <h2 id="sheet-share-title" class="ds-sheet__title">Share Q1 revenue report</h2>
      <p class="ds-sheet__description">Anyone with access to the Finance workspace can open it.</p>
    </div>
    <button type="button" class="ds-sheet__close" data-ds-sheet-close aria-label="Close"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
  <div class="ds-sheet__body">
    <div style="display: grid; gap: 0.75rem">
      <button type="button" class="btn btn-ghost" style="justify-content: flex-start"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-link"></use></svg>Copy link</button>
      <button type="button" class="btn btn-ghost" style="justify-content: flex-start"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-mail"></use></svg>Send by email</button>
      <button type="button" class="btn btn-ghost" style="justify-content: flex-start"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg>Download PDF (1.4 MB)</button>
      <button type="button" class="btn btn-ghost" style="justify-content: flex-start"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg>Download Excel</button>
      <p>People with access: Ayu Lestari, Daniel Okafor, Mei Tanaka, Sofia Marquez and 8 others.</p>
    </div>
  </div>
</dialog>
```

## States

```html preview title="Rest, scrolled header, busy footer"
<div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); align-items: start">
  <div class="ds-sheet is-static" style="height: 14rem" role="group" aria-label="Rest">
    <div class="ds-sheet__header"><div class="ds-sheet__heading"><h2 class="ds-sheet__title">Details</h2></div></div>
    <div class="ds-sheet__body"><p>INV-2026-0418 · IDR 12.400.000</p></div>
  </div>
  <div class="ds-sheet is-static" style="height: 14rem" role="group" aria-label="Scrolled">
    <div class="ds-sheet__header"><div class="ds-sheet__heading"><h2 class="ds-sheet__title">Activity</h2></div></div>
    <div class="ds-sheet__body" data-ds-scrolled><p>Daniel Okafor sent INV-2026-0418.</p></div>
  </div>
  <div class="ds-sheet is-static" style="height: 14rem" aria-busy="true" role="group" aria-label="Busy">
    <div class="ds-sheet__header"><div class="ds-sheet__heading"><h2 class="ds-sheet__title">Edit client</h2></div></div>
    <div class="ds-sheet__body"><input class="input w-full" value="Tanaka Studio" aria-label="Name"></div>
    <div class="ds-sheet__footer"><button type="button" class="btn btn-primary" aria-busy="true" aria-disabled="true"><span class="ds-spinner" aria-hidden="true"></span>Saving</button></div>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Closed | default | Off-screen beyond its edge, `display: none` |
| Opening | `DS.sheet.open()`, `data-ds-sheet-open` | Slides from its edge with `--ds-ease-spring` over 500ms; scrim fades in over 220ms |
| Open | `[open]` | Hairline on the inner edge, `--ds-shadow-overlay`; page behind inert |
| Dragging | finger or pointer on the handle/header (`[data-ds-dragging]`) | Follows 1:1; past fully open it rubber-bands (resistance grows with distance); scrim fades with the distance |
| Settling | release | Nearest snap point after projecting the throw; critically damped spring, or the bounce spring after a flick faster than 0.5px/ms between snap points |
| Dismissed by drag | release projected past the edge | Leaves from where it is, 140ms after a flick or 240ms otherwise |
| Closing | Close, Escape, scrim press | Back to its edge, 240ms, exit easing |
| Body scrolled | `.ds-sheet__body[data-ds-scrolled]` | Hairline under the header |
| Busy | `aria-busy="true"` | Body at 70% and not interactive; drag and scrim dismissal blocked |
| Handle hover / focus | `:hover`, `:focus-visible` | Grabber darkens; focus ring around the grabber |
| Reduced motion | media query | No slide: opacity fade 150ms; dragging still works |

## Anatomy

- `dialog.ds-sheet` with a side (`is-start`, `is-end`, `is-top`, `is-bottom`) and a size.
- `.ds-sheet__handle`: grabber button (bottom and top sheets); drag region and keyboard control.
- `.ds-sheet__header` → `.ds-sheet__heading` (`.ds-sheet__title`, `.ds-sheet__description`) and `.ds-sheet__close`.
- `.ds-sheet__body`: scrolls.
- `.ds-sheet__footer`: actions, always visible.

## Usage

- Use a side sheet for content that belongs to the page (filters, details of a row, a related form). Use a page for a task that stands alone.
- Open side sheets from the end edge; reserve the start edge for navigation.
- Use bottom sheets on phones for action lists and quick forms; on desktop prefer a menu or a side sheet.
- Add snap points only when the half-height state is useful by itself (a short list with a "show more"). Two snap points at most.
- Keep the primary action in the footer, not at the end of a long body.
- Sheets are dismissible by a press on the scrim; add `data-ds-dismissible="false"` when the sheet holds unsaved input.

## Accessibility

- A sheet is a modal dialog: `aria-labelledby` on the title, focus trapped inside, page behind inert, focus returned on close.
- Initial focus goes to the first field in the body, else the close button.
- Dragging is never the only way: the close button, Escape and the handle button do the same.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Move within the sheet |
| Escape | Close |
| Enter / Space on the handle | Next snap point; closes a sheet without snap points |
| ArrowUp / ArrowDown on the handle | Grow / shrink a bottom sheet (ArrowDown at the smallest closes it) |

Motion: the slide uses the critically damped spring (no overshoot); the bounce spring is used only after a flick, and
never past fully open, so no gap shows at the edge.

## Razor

```cshtml
<button type="button" class="btn" data-ds-sheet-open="filters">Filters</button>

<ds-sheet id="filters" side="end" title="Filter invoices" description="@($"{Model.Count:N0} invoices match.")">
    <form id="filter-form" method="get">…</form>
    <ds-sheet-footer>
        <a asp-page="./Index" class="btn btn-ghost">Reset</a>
        <button type="submit" form="filter-form" class="btn btn-primary">Show results</button>
    </ds-sheet-footer>
</ds-sheet>

<ds-sheet id="share" side="bottom" snap="45%,100%" title="Share report">…</ds-sheet>
```

| Attribute | Effect |
| --- | --- |
| `side` | `start`, `end` (default), `top`, `bottom` |
| `size` | `sm`, `lg`, `xl`, `full` |
| `title`, `description` | Header text |
| `snap` | Snap points as visible fractions, smallest first |
| `handle` | Show or hide the grabber (default: top and bottom sheets) |
| `dismissible="false"` | Scrim press does not close |

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-sheet-open="id"` | Opens the sheet |
| `data-ds-sheet-close` | Closes the nearest sheet |
| `data-ds-sheet-snap="45%,100%"` | Snap points |
| `data-ds-sheet-initial="1"` | Index of the snap point to open at |
| `data-ds-sheet-drag` | Extra drag region inside the sheet |
| `data-ds-no-drag` | Never starts a drag from this element |
| `data-ds-dismissible="false"` | Keep open on scrim press |

```js
DS.sheet.open("share", button, { snap: 1 });   // open at the second snap point
DS.sheet.snap("share", 0);
DS.sheet.close("share");
DS.sheet.open("inspector", null, { modal: false }); // no scrim, page stays usable

document.addEventListener("ds:sheet:snap", (e) => console.log(e.detail.index));
```

Events: `ds:sheet:open`, `ds:sheet:close`, `ds:sheet:snap` (`detail.index`), plus `ds:dialog:open` / `ds:dialog:close`.

## Tokens

`--ds-size-panel`, `--ds-scrim`, `--ds-shadow-overlay`, `--ds-radius-2xl`, `--ds-z-modal`, `--ds-duration-spring`,
`--ds-ease-spring`, `--ds-duration-spring-bounce`, `--ds-ease-spring-bounce`, `--ds-duration-layout`, `--ds-ease-exit`,
`--ds-duration-exit`, `--ds-duration-enter`, `--ds-type-section-*`, `--ds-space-*`. Script variables:
`--ds-sheet-dx`, `--ds-sheet-dy` (offset in px), `--ds-sheet-scrim` (0–1).

## Native and daisyUI

- Built on a native modal `<dialog>`: top layer, focus trap and Escape without script. Without JavaScript, open it with a `<button commandfor="id" command="show-modal">` where supported.
- daisyUI `.drawer` remains available for the app layout; `.ds-sheet` is the overlay version. daisyUI `.modal-bottom` / `.modal-start` / `.modal-end` boxes also get the DS motion but no drag.
