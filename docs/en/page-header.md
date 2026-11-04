---
title: Page header
group: components
category: layout
order: 2
summary: Title, description, breadcrumb, meta, actions and tabs at the top of a page, with an optional sticky variant that compacts on scroll.
source: TPS app.css L1405–1424 (.master-heading), L3416–3422
---

The page header names the page and holds its primary action. Every page has one, and one `<h1>`. For a title inside a card or dialog use that component's own header; for the bar above all pages use the top bar of the [App shell](./app-shell.md).

## Examples

### Title, description and actions

The primary action is the last (right-most) button. On narrow screens the actions wrap below the text and keep the order.

```html preview title="Header with actions"
<header class="ds-page-header">
  <div class="ds-page-header__text">
    <h1 class="ds-page-title">Invoices</h1>
    <p class="ds-page-desc">Issued, paid and overdue invoices for the current quarter.</p>
  </div>
  <div class="ds-page-header__actions">
    <button type="button" class="btn btn-outline">Export</button>
    <button type="button" class="btn btn-primary">New invoice</button>
  </div>
</header>
```

### Breadcrumb, meta and tabs

```html preview title="Full header"
<header class="ds-page-header">
  <nav class="ds-page-header__breadcrumb" aria-label="Breadcrumb">
    <a href="#">Projects</a> / <span aria-current="page">PRJ-1024</span>
  </nav>
  <div class="ds-page-header__text">
    <h1 class="ds-page-title">Harbour Street renovation</h1>
    <div class="ds-page-header__meta"><span>PRJ-1024</span><span>Owner: Daniel Okafor</span><span>Due 30 Nov 2026</span><span class="badge badge-success badge-soft">Active</span></div>
  </div>
  <div class="ds-page-header__actions"><button type="button" class="btn btn-primary">Edit project</button></div>
  <div class="ds-page-header__tabs">
    <div class="tabs tabs-border" role="tablist" aria-label="Project sections">
      <a class="tab tab-active" role="tab" aria-selected="true" href="#">Overview</a><a class="tab" role="tab" href="#">Tasks</a><a class="tab" role="tab" href="#">Files</a>
    </div>
  </div>
</header>
```

### Sticky and compact

`.is-sticky` makes the header stick under the top bar with a translucent surface. Once stuck, the title steps down one size, the description, meta and breadcrumb fold away, and a hairline fades in. Scroll the box below.

```html preview title="Sticky header (scroll the box)"
<div style="height: 16rem; overflow: auto; position: relative">
  <header class="ds-page-header is-sticky" style="--ds-main-pad-x: 0px; top: 0">
    <div class="ds-page-header__text"><h1 class="ds-page-title">Team members</h1><p class="ds-page-desc">Invite people and manage their roles.</p></div>
    <div class="ds-page-header__actions"><button type="button" class="btn btn-primary">Invite</button></div>
  </header>
  <p style="min-height: 30rem">Mei Tanaka, Sofia Marquez and 22 other members.</p>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Default | none | Title 1 size, description and meta visible |
| Compact | `.is-compact` | Title 2 size, for secondary pages and portals |
| Stuck | `data-stuck` (set by script on `.is-sticky`) | Title 3 size, description and meta hidden, hairline visible, translucent surface |
| Loading | Skeleton blocks in place of text | Keep the title height so the page does not jump |
| Long title | Title wider than the row | Wraps (`text-wrap: balance`); never truncated |
| Narrow screen | Under 640px | Actions go below the text, left-aligned |
| Action states | Buttons inside | See [Button](./button.md) |

## Anatomy

- `.ds-page-header`: flex row that wraps.
- `.ds-page-header__breadcrumb`: first row; holds a [Breadcrumb](./breadcrumb.md).
- `.ds-page-header__text` with `.ds-page-title` (`h1`), `.ds-page-desc` and `.ds-page-header__meta`.
- `.ds-page-header__actions`: end side; primary action last.
- `.ds-page-header__tabs`: last row; holds [Tabs](./tabs.md).

## Usage

- One `<h1>` per page. Make the title a noun phrase of 1 to 5 words.
- At most one primary button; secondary actions come before it.
- Keep the description to one sentence of 120 characters or fewer.
- Use meta for 2 to 4 facts (code, owner, date, status), not for navigation.
- Use sticky only on long pages (more than two screens) and when the primary action must stay reachable.
- Do not put a card behind the header; it sits on the page surface.

## Accessibility

- The title is a real heading (`h1`; set `heading-level` on the tag helper for other levels).
- The breadcrumb is a `nav` with an accessible name and `aria-current="page"` on the last item.
- The sticky bar never covers focus: focused elements below it scroll clear by the header height (`scroll-margin`) in your page CSS if needed.
- The compact change affects text size only; nothing moves except the fade.
- Contrast: description 4.5:1 (`--ds-subtle`); the hairline is 3:1 or visible in forced colours.

## Razor

```cshtml
<ds-page-header title="Invoices" description="Issued, paid and overdue invoices." sticky>
    <ds-page-header-breadcrumb><nav aria-label="Breadcrumb"><a href="/projects">Projects</a> / <span aria-current="page">PRJ-1024</span></nav></ds-page-header-breadcrumb>
    <ds-page-header-meta><span>Q4 2026</span><span>128 invoices</span></ds-page-header-meta>
    <ds-page-header-actions>
        <button type="button" class="btn btn-outline">Export</button>
        <button type="button" class="btn btn-primary">New invoice</button>
    </ds-page-header-actions>
    <ds-page-header-tabs>...</ds-page-header-tabs>
</ds-page-header>
```

Attributes: `title`, `description`, `sticky`, `compact`, `heading-level` (default 1).

## JavaScript

| Attribute | Effect |
| --- | --- |
| `.is-sticky` | Script sets `data-stuck` when the header reaches the top bar and the page has scrolled |

Works with the window or with the scrolling area of an embedded shell. No API.

## Tokens

`--ds-type-title-1|2|3-*`, `--ds-size-measure`, `--ds-topbar-h` (local, 3.5rem), `--ds-main-pad-x`, `--color-base-100`, `--color-base-300`, `--ds-subtle`, `--ds-duration-base`.

## Native and daisyUI

Built on `header`, `h1`, `p` and `nav`. Buttons, tabs and badges are daisyUI classes. Version 1 markup (`header > div` plus an actions group) keeps working.
