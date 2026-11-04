---
title: App shell
group: components
category: layout
order: 1
summary: The frame of an application: sidebar, translucent top bar and main area, with an icon rail on desktop and a drawer on mobile.
source: TPS _Layout, _PlatformLayout, app.css L444–553, L2854–3042
---

The app shell holds every signed-in page: a sidebar for navigation, a sticky top bar for context and account actions, and one `<main>` for the page. Use it for products with more than five destinations. For a handful of destinations a [Navbar](./navbar.md) is lighter, and for sign-in pages use [Auth layout](./auth-layout.md).

Desktop (1024px and wider): the sidebar is a 16rem column that collapses to a 4.75rem icon rail. Below 1024px it is a drawer that slides in from its edge over a scrim and slides back the same way.

## Examples

### Full shell

Sidebar with a collapse control, grouped navigation, a top bar and a page. Scroll the page area: the top bar gains a hairline once content passes under it.

```html preview title="Sidebar, top bar and main"
<div class="ds-shell is-embedded">
  <a class="ds-skip-link" href="#shell-main-1">Skip to main content</a>
  <aside class="ds-sidebar" aria-label="Application">
    <div class="ds-sidebar-head">
      <a class="ds-brand" href="#"><span class="ds-brand-mark" aria-hidden="true">C</span><span class="ds-brand-name">Citia</span></a>
      <button type="button" class="ds-sidebar-collapse" data-ds-sidebar-collapse aria-expanded="true" aria-label="Collapse sidebar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-left"/></svg></button>
    </div>
    <nav class="ds-sidebar-nav" aria-label="Main navigation">
      <ul class="ds-nav-list">
        <li><a class="ds-nav-link" href="#" aria-current="page" aria-label="Overview"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-dashboard"/></svg><span>Overview</span></a></li>
        <li><a class="ds-nav-link" href="#" aria-label="Inbox"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-inbox"/></svg><span>Inbox</span><span class="ds-nav-badge is-primary">12</span></a></li>
        <li>
          <button type="button" class="ds-nav-group-toggle" aria-expanded="true" aria-controls="shell1-work" data-ds-nav-group="shell1-work"><span>Work</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"/></svg></button>
          <div id="shell1-work" class="ds-nav-panel" data-open><ul class="ds-nav-sub">
            <li><a class="ds-nav-link" href="#" aria-label="Projects"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"/></svg><span>Projects</span></a></li>
            <li><a class="ds-nav-link" href="#" aria-label="Invoices"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"/></svg><span>Invoices</span></a></li>
          </ul></div>
        </li>
        <li><a class="ds-nav-link" href="#" aria-label="Settings"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-settings"/></svg><span>Settings</span></a></li>
      </ul>
    </nav>
  </aside>
  <button type="button" class="ds-shell-scrim" data-ds-nav-close aria-label="Close navigation"></button>
  <div class="ds-shell-main">
    <header class="ds-topbar">
      <button type="button" class="btn btn-ghost btn-square ds-nav-toggle" data-ds-nav-toggle aria-expanded="false" aria-label="Open navigation"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-menu"/></svg></button>
      <div class="ds-topbar-heading"><div class="ds-topbar-context">Northwind workspace</div><div class="ds-topbar-title">Overview</div></div>
      <div class="ds-topbar-actions"><button type="button" class="btn btn-ghost btn-square" aria-label="Notifications"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"/></svg></button></div>
    </header>
    <main class="ds-main" id="shell-main-1" tabindex="-1">
      <div class="ds-page">
        <header class="ds-page-header"><div><h1 class="ds-page-title">Overview</h1><p class="ds-page-desc">Open projects, unpaid invoices and recent activity.</p></div></header>
        <p>12 projects are open. INV-2026-0418 is due on 14 Nov 2026.</p>
        <p style="min-height: 18rem">Scroll here to see the top bar edge appear.</p>
      </div>
    </main>
  </div>
</div>
```

### Icon rail

Set `data-collapsed="true"` on an embedded shell, or the user's choice on `<html data-ds-sidebar-collapsed="true">` in a real app. Labels fade, badges become dots and each item shows a tooltip on hover and keyboard focus.

```html preview title="Collapsed rail"
<div class="ds-shell is-embedded" data-collapsed="true" style="--ds-shell-height: 20rem">
  <aside class="ds-sidebar" aria-label="Application">
    <div class="ds-sidebar-head">
      <a class="ds-brand" href="#"><span class="ds-brand-mark" aria-hidden="true">C</span><span class="ds-brand-name">Citia</span></a>
      <button type="button" class="ds-sidebar-collapse" data-ds-sidebar-collapse aria-expanded="false" aria-label="Expand sidebar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-left"/></svg></button>
    </div>
    <nav class="ds-sidebar-nav" aria-label="Main navigation">
      <ul class="ds-nav-list">
        <li><a class="ds-nav-link" href="#" aria-current="page" aria-label="Overview"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-dashboard"/></svg><span>Overview</span></a></li>
        <li><a class="ds-nav-link" href="#" aria-label="Inbox, 12 unread"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-inbox"/></svg><span>Inbox</span><span class="ds-nav-badge is-primary">12</span></a></li>
        <li><a class="ds-nav-link" href="#" aria-label="Projects"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"/></svg><span>Projects</span></a></li>
      </ul>
    </nav>
  </aside>
  <div class="ds-shell-main"><main class="ds-main"><div class="ds-page"><h2 class="ds-page-title">Overview</h2></div></main></div>
</div>
```

### Content width

Add `is-sm`, `is-md`, `is-lg`, `is-xl`, `is-prose` or `is-full` (default) to `.ds-main`. The page is centred inside the limit.

| Class | Max width | Use for |
| --- | --- | --- |
| `.is-sm` | 40rem | Settings forms, wizards |
| `.is-md` | 48rem | Detail pages with one column |
| `.is-lg` | 64rem | Mixed pages |
| `.is-xl` | 80rem | Dashboards |
| `.is-prose` | 65ch | Long reading |
| `.is-full` | none | Tables, boards |

## States

```html preview title="Sidebar item states"
<div class="ds-sidebar" style="position: static; transform: none; visibility: visible; width: 16rem; height: auto; padding: 0.75rem">
  <ul class="ds-nav-list">
    <li><a class="ds-nav-link" href="#" aria-label="Rest"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"/></svg><span>Rest</span></a></li>
    <li><a class="ds-nav-link" href="#" aria-current="page" aria-label="Current"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"/></svg><span>Current page</span></a></li>
    <li><a class="ds-nav-link" href="#" aria-label="With badge"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-inbox"/></svg><span>With badge</span><span class="ds-nav-badge is-error">3</span></a></li>
    <li><a class="ds-nav-link is-disabled" aria-disabled="true" aria-label="Disabled"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-lock"/></svg><span>Disabled</span></a></li>
  </ul>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | none | Text and icon on the sidebar surface |
| Hover | Pointer over the item (hover devices) | State layer 6% of the text colour; the row does not move |
| Pressed | Pointer down | State layer 10% |
| Focus-visible | Keyboard focus | 2px ring `--ds-focus`, 2px offset |
| Current | `aria-current="page"` | Tonal primary fill, primary text, weight 650 and a 3px indicator bar |
| Disabled | `aria-disabled="true"` | Opacity 0.55, `not-allowed` cursor, no hover |
| Drawer open | `data-nav-open` on `.ds-shell` | Sidebar at translate 0, scrim at full opacity, main area `inert` |
| Rail | `data-ds-sidebar-collapsed` or `data-collapsed` | Icons only, tooltip on hover and focus, badge as dot |
| Scrolled | Page scrolled past 1px | Top bar hairline fades in over 180ms |

## Anatomy

- `.ds-shell`: grid of sidebar and main. `.is-embedded` keeps it inside a box (cards, previews).
- `.ds-sidebar`: the navigation column; see [Sidebar](./sidebar.md). `.is-brand` uses the deep teal surface.
- `.ds-shell-scrim`: button behind the open drawer; closes it.
- `.ds-shell-main`: column with the top bar, `main` and an optional [Footer](./footer.md).
- `.ds-topbar` with `.ds-topbar-heading` (`-context`, `-title`), `.ds-topbar-search`, `.ds-topbar-actions`, `.ds-nav-toggle`.
- `.ds-main` and `.ds-page`: content area and its vertical stack (24px gap).
- `.ds-skip-link`: first element in the shell; visible on focus.

## Usage

- Put one `<main>` per page and give it `id` and `tabindex="-1"` so the skip link lands on it.
- Keep the top bar to context, search and 3 or fewer actions. Page titles and the primary action belong in the [Page header](./page-header.md).
- Remember the rail state in `localStorage`; the head script sets `data-ds-sidebar-collapsed` before first paint, so the shell never flashes expanded.
- Do not put a second scrolling container beside the page; the window scrolls.
- Do not animate the sidebar with a custom transition. The grid column and the drawer use the layout tokens and can be interrupted mid-way.

## Accessibility

- Landmarks: `<aside aria-label>` (complementary), `<nav aria-label>`, `<header>` for the top bar, `<main>`.
- While the drawer is open on mobile, the sidebar gets `role="dialog"` and `aria-modal="true"`, `main` is `inert`, Tab cycles inside the sidebar, focus moves to the first link and returns to the menu button on close.
- The collapse button toggles `aria-expanded` and its label ("Collapse sidebar" or "Expand sidebar").
- Every nav link keeps `aria-label`, so the rail still names each item.
- Targets are 44px; contrast of text and the current indicator is at least 4.5:1 and 3:1 in both themes.
- Reduced motion: the drawer and scrim cross-fade without movement; the rail changes without animation.

| Key | Action |
| --- | --- |
| Tab | Moves through the sidebar, then the top bar and page |
| Enter, Space | Activates a link, group or the collapse button |
| Escape | Closes the open drawer or menu and returns focus to the trigger |

## Razor

Use the partial for the navigation and write the frame as markup:

```cshtml
<body>
    <partial name="_DsIconSprite" />
    <div class="ds-shell">
        <a class="ds-skip-link" href="#main">@DsText.T("layout.skip")</a>
        <aside class="ds-sidebar" aria-label="Application">
            <div class="ds-sidebar-head">...</div>
            <partial name="_DsSidebarNav" model="Model.Nav" />
        </aside>
        <button type="button" class="ds-shell-scrim" data-ds-nav-close aria-label="@DsText.T("layout.closeNav")"></button>
        <div class="ds-shell-main">
            <header class="ds-topbar">...</header>
            <main id="main" class="ds-main is-xl" tabindex="-1">@RenderBody()</main>
        </div>
    </div>
</body>
```

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-sidebar-collapse` | Button that toggles the rail; stores the choice under `<prefix>-sidebar-collapsed` |
| `data-ds-nav-toggle` | Opens the drawer (mobile) |
| `data-ds-nav-close` | Closes the drawer (scrim, close button) |
| `data-ds-nav-group` | Group toggle; see [Sidebar](./sidebar.md) |
| `data-ds-back="/fallback"` | Back button: history back when the referrer is the same site, else the fallback URL |

API: `DS.init(root)` after inserting markup. Events: `ds:sidebar:toggle` (`detail.collapsed`) and `ds:drawer:toggle` (`detail.open`).

## Tokens

`--ds-size-sidebar` (16rem), `--ds-size-sidebar-rail` (4.75rem), `--ds-duration-layout` (240ms), `--ds-duration-spring` (500ms), `--ds-ease-spring`, `--ds-scrim`, `--ds-shadow-overlay`, `--ds-z-sticky`, `--ds-z-modal`, `--ds-opacity-state-*`, `--color-base-100`, `--color-base-200`, `--color-primary`.

## Native and daisyUI

Built on `aside`, `nav`, `header`, `main` and CSS grid. Buttons in the top bar are daisyUI `btn btn-ghost`. The DS replaces the solid teal sidebar of version 1 with a neutral surface; add `.is-brand` to get it back.
