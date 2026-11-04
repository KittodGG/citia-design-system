---
title: Sidebar
group: components
category: navigation
order: 6
summary: Primary navigation column with groups, badges, a search slot, a workspace switcher and an account menu; expands, collapses to a rail or becomes a drawer.
source: TPS app.css L2854–3042, _DsSidebarNav
---

The sidebar lists the destinations of an application in two levels: groups (buttons with a chevron) and items (links with an icon). It lives inside the [App shell](./app-shell.md). For a horizontal list of 3 to 5 destinations use the [Navbar](./navbar.md); on phones consider [Bottom navigation](./bottom-navigation.md).

## Examples

### Groups, search and workspace

Groups open and close in 200ms and can be interrupted mid-way. The search slot and the workspace switcher sit above the list; the account menu sits below it.

```html preview title="Full sidebar"
<div class="ds-shell is-embedded" style="--ds-shell-height: 34rem">
  <aside class="ds-sidebar" aria-label="Application">
    <div class="ds-sidebar-head">
      <a class="ds-brand" href="#"><span class="ds-brand-mark" aria-hidden="true">C</span><span class="ds-brand-name">Citia</span></a>
      <button type="button" class="ds-sidebar-collapse" data-ds-sidebar-collapse aria-expanded="true" aria-label="Collapse sidebar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-left"/></svg></button>
    </div>
    <div class="ds-sidebar-slot">
      <button type="button" class="ds-sidebar-switcher" aria-haspopup="true" aria-label="Switch workspace, Northwind">
        <span class="ds-brand-mark" aria-hidden="true">N</span>
        <span class="ds-sidebar-switcher__text"><span>Northwind</span><span>Team plan</span></span>
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-up-down"/></svg>
      </button>
    </div>
    <div class="ds-sidebar-slot">
      <button type="button" class="ds-sidebar-search" aria-label="Search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"/></svg><span>Search</span><kbd class="ds-kbd">Ctrl K</kbd></button>
    </div>
    <nav class="ds-sidebar-nav" aria-label="Main navigation">
      <ul class="ds-nav-list">
        <li><a class="ds-nav-link" href="#" aria-current="page" aria-label="Overview"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-dashboard"/></svg><span>Overview</span></a></li>
        <li><a class="ds-nav-link" href="#" aria-label="Inbox"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-inbox"/></svg><span>Inbox</span><span class="ds-nav-badge is-primary">12</span></a></li>
        <li>
          <button type="button" class="ds-nav-group-toggle" aria-expanded="true" aria-controls="sb1-work" data-ds-nav-group="sb1-work"><span>Work</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"/></svg></button>
          <div id="sb1-work" class="ds-nav-panel" data-open><ul class="ds-nav-sub">
            <li><a class="ds-nav-link" href="#" aria-label="Projects"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"/></svg><span>Projects</span><span class="ds-nav-badge">24</span></a></li>
            <li><a class="ds-nav-link" href="#" aria-label="Invoices"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"/></svg><span>Invoices</span><span class="ds-nav-badge is-error">3</span></a></li>
            <li><a class="ds-nav-link is-disabled" aria-disabled="true" aria-label="Reports, available on the Business plan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bar-chart"/></svg><span>Reports</span></a></li>
          </ul></div>
        </li>
        <li>
          <button type="button" class="ds-nav-group-toggle" aria-expanded="false" aria-controls="sb1-admin" data-ds-nav-group="sb1-admin"><span>Administration</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"/></svg></button>
          <div id="sb1-admin" class="ds-nav-panel"><ul class="ds-nav-sub">
            <li><a class="ds-nav-link" href="#" aria-label="Members"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-users"/></svg><span>Members</span></a></li>
            <li><a class="ds-nav-link" href="#" aria-label="Billing"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-credit-card"/></svg><span>Billing</span></a></li>
          </ul></div>
        </li>
      </ul>
    </nav>
    <div class="ds-sidebar-footer">
      <details class="ds-sidebar-account" data-ds-menu>
        <summary aria-label="Account menu"><span class="ds-account-avatar" aria-hidden="true">AL</span><span class="ds-account-text"><span>Ayu Lestari</span><span>ayu@northwind.example</span></span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-up-down"/></svg></summary>
        <ul class="ds-account-panel">
          <li><a href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user"/></svg>Profile</a></li>
          <li><a href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-settings"/></svg>Preferences</a></li>
          <li><button type="button"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-logout"/></svg>Sign out</button></li>
        </ul>
      </details>
    </div>
  </aside>
  <div class="ds-shell-main"><main class="ds-main"><div class="ds-page"><h2 class="ds-page-title">Overview</h2></div></main></div>
</div>
```

### Brand surface

`.is-brand` fills the sidebar with the deep teal. Use it when the product identity needs a strong edge; the neutral surface is the default.

```html preview title="Brand variant"
<div class="ds-sidebar is-brand" style="position: static; transform: none; visibility: visible; width: 16rem; height: auto; padding: 0.75rem">
  <ul class="ds-nav-list">
    <li><a class="ds-nav-link" href="#" aria-current="page" aria-label="Overview"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-dashboard"/></svg><span>Overview</span></a></li>
    <li><a class="ds-nav-link" href="#" aria-label="Inbox"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-inbox"/></svg><span>Inbox</span><span class="ds-nav-badge">12</span></a></li>
    <li><a class="ds-nav-link is-disabled" aria-disabled="true" aria-label="Reports"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bar-chart"/></svg><span>Reports</span></a></li>
  </ul>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | none | Text `--color-base-content`, icon in the muted tier |
| Hover | Pointer over an item or group (hover devices) | State layer 6%; the row never moves |
| Pressed | Pointer down | State layer 10% |
| Focus-visible | Keyboard focus | 2px ring `--ds-focus`, 2px offset |
| Current | `aria-current="page"` | Primary tonal fill, primary text, weight 650, 3px indicator bar |
| Disabled | `.is-disabled` with `aria-disabled="true"`, no `href` | Opacity 0.55, `not-allowed` cursor; explain why in `aria-label` or a tooltip |
| Group expanded or collapsed | `aria-expanded` on the group button | Chevron turns 180°; panel grows from 0fr to 1fr in 200ms |
| Badge | `.ds-nav-badge`, `.is-primary`, `.is-error`, `.is-dot` | Tabular numbers; in the rail a dot over the icon |
| Account menu open | `details[open]` | Panel opens upward (beside the rail when collapsed) |
| Rail | `data-ds-sidebar-collapsed` | Icons only; tooltip after 350ms on hover, at once on keyboard focus |
| Long label | Label wider than the item | Truncated with an ellipsis; the tooltip shows the full text |
| Scrollable list | More items than fit | Soft fade at the top and bottom edge, thin scrollbar |

## Anatomy

- `.ds-sidebar-head`: `.ds-brand` (`-mark`, `-name`) and `.ds-sidebar-collapse`.
- `.ds-sidebar-slot`: container for `.ds-sidebar-switcher` (workspace) or `.ds-sidebar-search`.
- `.ds-sidebar-nav`: the only scrolling part. Inside: `.ds-nav-list`, `.ds-nav-group-toggle`, `.ds-nav-panel` with `.ds-nav-sub`, `.ds-nav-link`, `.ds-nav-badge`.
- `.ds-sidebar-footer` with `.ds-sidebar-account` (`details`), `.ds-account-avatar`, `.ds-account-text`, `.ds-account-panel`.
- `.ds-sidebar-mode`: a free row for a theme or language switcher.

## Usage

- Two levels at most. Groups have 2 to 7 items; with more, split the group.
- Give every item an icon from the same set and keep labels to 1 to 3 words.
- Keep the account menu to 3 to 5 entries; put Sign out last.
- Use one badge style per sidebar: counts for things to do, a dot for "something new".
- Do not nest a group inside a group and do not use a group header as a link.
- Keep disabled items focusable with `aria-disabled` only when you can say why they are unavailable.

## Accessibility

- `nav` with an accessible name (default "Main navigation" or "Navigasi utama"). The current page uses `aria-current="page"`.
- A group is a disclosure: a `button` with `aria-expanded` and `aria-controls`; the closed panel is `inert` and `visibility: hidden`, so it leaves the tab order.
- Rail tooltips are `role="tooltip"`, appear on keyboard focus, and Escape hides them. Names come from `aria-label`, not from the tooltip.
- The open group state is remembered per group (`<prefix>-nav-groups`); the group that holds the current page is always open.
- The scroll position of the list is restored after navigation (`sessionStorage`).
- Targets are 44px; badges and current text keep 4.5:1.
- Reduced motion: groups open and close without movement (a 0.01ms transition); the fade of labels stays.

| Key | Action |
| --- | --- |
| Tab, Shift+Tab | Move between groups and items |
| Enter, Space | Open a link, toggle a group, open the menu |
| Escape | Close the account menu or the drawer, hide a tooltip |

## Razor

```cshtml
@{
    var nav = new NavModel(
        Top: [new NavItem("Overview", "/", "dashboard", Active: true)],
        Groups: [new NavGroup("work", "Work", [
            new NavItem("Projects", "/projects", "folder", Badge: "24"),
            new NavItem("Invoices", "/invoices", "receipt", Badge: "3", BadgeTone: "error"),
            new NavItem("Reports", "/reports", "bar-chart", Disabled: true)])]);
}
<partial name="_DsSidebarNav" model="nav" />
```

`NavItem` takes `Badge`, `BadgeTone` (`primary` or `error`) and `Disabled`. `NavActive.Matches(HttpContext, href)` decides `Active`.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-nav-group="key"` | Group button; the key stores its open state. `data-ds-nav-active="true"` forces it open |
| `data-ds-nav-scroll` | Remembers the scroll position of the list |
| `data-ds-sidebar-collapse` | Toggles the icon rail |

Group markup is `button[aria-controls]` plus `.ds-nav-panel` (the panel opens through CSS). Older markup with `ul.ds-nav-sub[hidden]` still works without animation.

## Tokens

`--ds-size-sidebar`, `--ds-size-sidebar-rail`, `--ds-size-target`, `--ds-opacity-state-hover|pressed|selected|disabled`, `--ds-focus`, `--ds-quiet`, `--ds-subtle`, `--ds-radius-lg`, `--ds-duration-fast`, `--ds-duration-layout`, `--ds-ease-emphasized`, `--ds-z-tooltip`.

## Native and daisyUI

Built on `nav`, `ul`, `a`, `button` and `details`. It does not use daisyUI `menu`: the sidebar needs two control types, a rail mode and persistent groups. The inner variables (`--ds-sidebar-bg`, `-fg`, `-hover`, `-current-bg`) can be overridden on `.ds-sidebar`.
