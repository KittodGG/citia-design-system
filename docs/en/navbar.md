---
title: Navbar
group: components
category: navigation
order: 1
summary: A translucent top app bar for apps without a sidebar: brand, links, search slot, actions and a mobile menu. Gets a hairline only after the page scrolls under it.
---

The navbar is the top bar of an app or site that has up to about 6 destinations. It holds the brand, the primary links, an optional search field and account actions, and folds the links into a menu in a narrow bar. For apps with many destinations use the [App shell](./app-shell.md) and its sidebar; for destinations with dropdown or mega panels place a [Navigation menu](./navigation-menu.md) inside the navbar; for phone-only primary navigation use [Bottom navigation](./bottom-navigation.md).

The bar is opaque at the top of the page. When content scrolls under it, it becomes a blurred translucent material (78% of `--color-base-100`) and a 1px hairline fades in: the scroll-edge effect. The bar sticks to the top of its scroll container.

## Examples

### Sticky bar with scroll edge

Scroll the area below: the hairline and blur appear after 2px of scroll. The `search` slot hides and the links fold into the menu button when the bar is narrower than 40rem (640px). The rule follows the width of the bar, not of the window, so it also applies in a narrow column.

```html preview title="Navbar with search and actions"
<div style="height:22rem;overflow:auto;border:1px solid var(--color-base-300);border-radius:0.75rem;background:var(--color-base-200)">
  <header class="ds-navbar" data-ds-navbar>
    <div class="ds-navbar__inner">
      <a class="ds-navbar__brand" href="#"><span class="ds-navbar__mark" aria-hidden="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-layers"/></svg></span>Northwind</a>
      <nav class="ds-navbar__nav" id="navbar-demo-menu" aria-label="Primary">
        <a class="ds-navbar__link" href="#" aria-current="page">Overview</a>
        <a class="ds-navbar__link" href="#">Projects</a>
        <a class="ds-navbar__link" href="#">Invoices</a>
      </nav>
      <div class="ds-navbar__search">
        <label class="input input-sm" style="width:100%"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"/></svg><input type="search" placeholder="Search projects" aria-label="Search projects"></label>
      </div>
      <div class="ds-navbar__actions">
        <button type="button" class="ds-theme-toggle" data-ds-theme-toggle aria-label="Switch to dark theme"><svg class="ds-icon ds-theme-toggle__light" aria-hidden="true"><use href="#ds-icon-sun"/></svg><svg class="ds-icon ds-theme-toggle__dark" aria-hidden="true"><use href="#ds-icon-moon"/></svg></button>
        <button type="button" class="btn btn-ghost btn-square btn-sm" aria-label="Notifications, 3 unread"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"/></svg></button>
      </div>
      <button type="button" class="ds-navbar__toggle" data-ds-navbar-toggle aria-controls="navbar-demo-menu" aria-expanded="false" aria-label="Open menu">
        <svg class="ds-icon is-open" aria-hidden="true"><use href="#ds-icon-menu"/></svg><svg class="ds-icon is-close" aria-hidden="true"><use href="#ds-icon-x"/></svg>
      </button>
    </div>
  </header>
  <div style="padding:1.5rem">
    <p>INV-2026-0418 · Ayu Lestari · 4,250.00</p>
    <p style="margin-top:6rem">INV-2026-0419 · Daniel Okafor · 1,180.50</p>
    <p style="margin-top:6rem">INV-2026-0420 · Mei Tanaka · 9,730.00</p>
    <p style="margin-top:6rem">INV-2026-0421 · Sofia Marquez · 612.25</p>
    <p style="margin-top:6rem">End of list.</p>
  </div>
</div>
```

### Variants

`is-bordered` keeps the hairline at all times. `is-solid` never turns translucent. `is-contained` limits the content to 80rem. `is-static` removes stickiness. `data-ds-hide-on-scroll` slides the bar away when scrolling down and brings it back when scrolling up.

```html preview title="Bordered, solid, contained"
<header class="ds-navbar is-static is-bordered is-solid is-contained" data-ds-navbar>
  <div class="ds-navbar__inner">
    <a class="ds-navbar__brand" href="#"><span class="ds-navbar__mark" aria-hidden="true">N</span>Northwind</a>
    <nav class="ds-navbar__nav" aria-label="Primary (variant)">
      <a class="ds-navbar__link" href="#">Overview</a>
      <a class="ds-navbar__link" href="#" aria-current="page">Projects</a>
    </nav>
    <div class="ds-navbar__actions"><a class="btn btn-primary btn-sm" href="#">New project</a></div>
  </div>
</header>
```

## States

```html preview title="Link states"
<header class="ds-navbar is-static is-bordered" data-ds-navbar>
  <div class="ds-navbar__inner">
    <nav class="ds-navbar__nav" style="margin:0" aria-label="States">
      <a class="ds-navbar__link" href="#">Rest</a>
      <a class="ds-navbar__link" href="#" aria-current="page">Current</a>
      <a class="ds-navbar__link" href="#" aria-disabled="true" title="Requires an upgrade">Disabled</a>
    </nav>
    <div class="ds-navbar__actions">
      <button type="button" class="ds-navbar__toggle" style="display:inline-grid" aria-expanded="true" aria-label="Close menu"><svg class="ds-icon is-open" aria-hidden="true"><use href="#ds-icon-menu"/></svg><svg class="ds-icon is-close" aria-hidden="true"><use href="#ds-icon-x"/></svg></button>
    </div>
  </div>
</header>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Top of page | scroll position under 3px | opaque `--color-base-100`, no hairline |
| Scrolled | content under the bar (`data-scrolled`) | 78% surface with 16px blur, hairline fades in over 180ms |
| Link rest | none | `--ds-subtle` text |
| Link hover | pointer over a link | `--color-base-content` text, 6% tint |
| Link pressed | pointer down | 10% tint |
| Link focus-visible | keyboard focus | 2px `--ds-focus` ring |
| Link current | `aria-current="page"` | tonal primary fill (`--ds-primary-soft`), `--ds-quiet` text |
| Link disabled | `aria-disabled="true"` | 55% opacity, `not-allowed` cursor, explained by `title` |
| Menu closed / open | `aria-expanded` on the toggle (bar under 40rem) | links hidden / shown in a panel under the bar; the icon turns from menu to close |
| Hidden on scroll | `data-hidden` (with `data-ds-hide-on-scroll`) | bar slides up by its height; never while it holds focus or its menu is open |
| Reduced transparency | `prefers-reduced-transparency` | opaque surface, no blur |

## Anatomy

- `header.ds-navbar` root and `data-ds-navbar` hook. Modifiers: `is-static`, `is-bordered`, `is-solid`, `is-contained`.
- `.ds-navbar__inner` the row (3.5rem high).
- `.ds-navbar__brand` and `.ds-navbar__mark` the brand link and its 2rem mark.
- `.ds-navbar__nav` the primary links; `.ds-navbar__link` one link.
- `.ds-navbar__search` slot for a search field (at least 8rem wide); `is-mobile` keeps it on a second row when the bar is narrow.
- `.ds-navbar__actions` buttons and menus at the inline-end.
- `.ds-navbar__toggle` the menu button, visible when the bar is narrower than 40rem.

## Usage

- Use at most 6 links. More than that belongs in a [Navigation menu](./navigation-menu.md) or a sidebar.
- Put one primary button at most in the actions, at the inline-end.
- Mark the current section with `aria-current="page"` on the link; match by path prefix on the server.
- Keep the brand link pointing at the home page and name it (`Northwind`), not "Home".
- Search: use the `.ds-navbar__search` slot on wide screens and an icon button in the actions on narrow ones, or add `is-mobile` to keep a full-width field on its own row.
- Do not stack a navbar on top of a sidebar app shell; use the shell's top bar.
- Reserve `data-ds-hide-on-scroll` for content-heavy reading pages; keep the bar visible in tools.

## Accessibility

- The links sit in a `<nav>` with an accessible name (`aria-label="Primary"`). If the page has two navs, give each a distinct label.
- The menu button has `aria-expanded` and `aria-controls` pointing to the nav, and its label switches between "Open menu" and "Close menu" (localised).
- The mobile menu is a disclosure, not a `role="menu"`: the links stay normal links in tab order.
- Text on the translucent bar keeps 4.5:1 because the blurred surface is mixed from `--color-base-100` at 78%; under reduced transparency it is opaque.
- Hit areas: 40px links, 44px on touch screens. The focus ring is never clipped by the bar.
- A skip link before the bar lets keyboard users jump to the main content.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Moves through brand, links, search, actions, menu button |
| Enter / Space | Activates a link or the menu button |
| Escape | Closes the open mobile menu and returns focus to the menu button |

Motion: the hairline and background cross-fade in 180ms; the mobile panel enters with opacity and a 5px move over 220ms and leaves in 140ms; hide-on-scroll is a 220ms transform. Under reduced motion the transforms are removed and only opacity changes remain.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-navbar` | On the bar: scroll-edge state, mobile menu, Escape and outside click to close |
| `data-ds-navbar-toggle` | On the menu button |
| `data-ds-hide-on-scroll` | Hide on scroll down, show on scroll up |

The bar listens to the nearest scrolling ancestor, or the window. Events: `ds:navbar:toggle` with `detail.open`. API: `DS.navbar.close(bar)`.

Without JavaScript the toggle is hidden and the links stay in a scrolling row under the brand in a narrow bar.

## Tokens

`--color-base-100`, `--color-base-300`, `--color-primary`, `--color-primary-content`, `--ds-subtle`, `--ds-quiet`, `--ds-z-sticky`, `--ds-radius-lg`, `--ds-radius-xl`, `--ds-shadow-menu`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-primary-soft`, `--ds-duration-base`, `--ds-duration-enter`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-enter-offset`.

## Native and daisyUI

A `<header>` with a `<nav>` and ordinary links and buttons. It replaces daisyUI's `navbar`: do not combine both. Search fields inside the slot use the daisyUI `input` (see [Search input](./search-input.md)); buttons use `btn`. The 80rem limit of `is-contained` follows the container width of the layout.
