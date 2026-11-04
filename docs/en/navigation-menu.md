---
title: Navigation menu
group: components
category: navigation
order: 4
summary: Site navigation with dropdown and mega panels. Opens on click or hover intent, a sliding highlight follows the pointer, full keyboard support, stacks in narrow containers.
---

A navigation menu is a horizontal list of top-level destinations where some entries open a panel of related links: a dropdown with 4 to 8 links, or a mega panel with grouped columns and a featured block. Use it for marketing sites, documentation and product sites with deep structure. For an app with up to 6 flat links use a [Navbar](./navbar.md); for a list of actions use a [Dropdown menu](./dropdown-menu.md) (it is a command menu, not navigation).

It follows the WAI-ARIA **disclosure navigation** pattern: panel triggers are buttons with `aria-expanded`, and the panels contain ordinary links. It is not an ARIA `menu`, so screen readers keep treating the links as links.

## Examples

### Dropdown and mega panels

Hover a trigger (mouse): the panel opens after a short delay and a highlight slides between triggers. Moving to a neighbouring trigger switches panels at once, and the new panel enters from the side you moved toward. Click pins a panel open; Escape closes it.

```html preview title="Navigation menu"
<nav class="ds-nav-menu" aria-label="Site" data-ds-nav-menu style="min-height:22rem">
  <ul class="ds-nav-menu__list">
    <li class="ds-nav-menu__item">
      <button type="button" class="ds-nav-menu__trigger" id="nm-prod-btn" aria-expanded="false" aria-controls="nm-prod">Products<svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"/></svg></button>
      <div class="ds-nav-menu__panel is-wide" id="nm-prod" hidden>
        <div class="ds-nav-menu__grid" style="grid-template-columns:1.1fr 1fr 1fr">
          <a class="ds-nav-menu__feature" href="#"><strong>Invoicing 3.0</strong><span class="ds-nav-menu__desc">Recurring invoices, tax rules for 14 countries and bank matching.</span></a>
          <ul class="ds-nav-menu__group">
            <li class="ds-nav-menu__heading">Billing</li>
            <li><a class="ds-nav-menu__entry" href="#"><span class="ds-nav-menu__title">Invoices</span><span class="ds-nav-menu__desc">Issue and track payments</span></a></li>
            <li><a class="ds-nav-menu__entry" href="#"><span class="ds-nav-menu__title">Quotes</span><span class="ds-nav-menu__desc">Send, sign, convert</span></a></li>
          </ul>
          <ul class="ds-nav-menu__group">
            <li class="ds-nav-menu__heading">Operations</li>
            <li><a class="ds-nav-menu__entry" href="#"><span class="ds-nav-menu__title">Projects</span><span class="ds-nav-menu__desc">Plan and budget work</span></a></li>
            <li><a class="ds-nav-menu__entry" href="#" aria-current="page"><span class="ds-nav-menu__title">Reports</span><span class="ds-nav-menu__desc">Dashboards and exports</span></a></li>
          </ul>
        </div>
      </div>
    </li>
    <li class="ds-nav-menu__item">
      <button type="button" class="ds-nav-menu__trigger" id="nm-res-btn" aria-expanded="false" aria-controls="nm-res">Resources<svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"/></svg></button>
      <div class="ds-nav-menu__panel" id="nm-res" hidden>
        <ul class="ds-nav-menu__group">
          <li><a class="ds-nav-menu__entry" href="#"><span class="ds-nav-menu__title">Documentation</span><span class="ds-nav-menu__desc">Guides and API reference</span></a></li>
          <li><a class="ds-nav-menu__entry" href="#"><span class="ds-nav-menu__title">Changelog</span><span class="ds-nav-menu__desc">What shipped this month</span></a></li>
          <li><a class="ds-nav-menu__entry" href="#"><span class="ds-nav-menu__title">Status</span><span class="ds-nav-menu__desc">Uptime and incidents</span></a></li>
        </ul>
      </div>
    </li>
    <li class="ds-nav-menu__item"><a class="ds-nav-menu__trigger" href="#" aria-current="page">Pricing</a></li>
    <li class="ds-nav-menu__item"><a class="ds-nav-menu__trigger" href="#">Customers</a></li>
    <li class="ds-nav-menu__item"><a class="ds-nav-menu__trigger" href="#" aria-disabled="true" title="Coming soon">Partners</a></li>
  </ul>
</nav>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | none | `--ds-subtle` label |
| Hover | mouse over a trigger | label turns `--color-base-content`; the highlight (6% tint) slides to it |
| Pressed | pointer down | 10% tint |
| Focus-visible | keyboard focus | 2px `--ds-focus` ring; the highlight follows keyboard focus too |
| Expanded | `aria-expanded="true"` | chevron rotates 180°, panel open, highlight stays on the trigger |
| Current | `aria-current="page"` (link, trigger or panel entry) | full-contrast label with a 2px primary mark under it; entries get a tonal fill and a teal title |
| Disabled | `aria-disabled="true"` | 55% opacity, `not-allowed` cursor |
| Panel enter | opening | opacity and a 5px move down over 220ms; sideways 24px when switching from a neighbour |
| Panel exit | closing | opacity over 140ms |
| Narrow (under 40rem) | width of the menu's container | triggers stack, panels open inline under their trigger, no highlight |
| Without JavaScript | `data-ds-ready` not set | triggers keep their hover tint; panels need the script to open |

## Anatomy

- `nav.ds-nav-menu[data-ds-nav-menu]` root with an accessible name.
- `.ds-nav-menu__list` and `.ds-nav-menu__item` the top-level list.
- `.ds-nav-menu__trigger` a `<button aria-expanded aria-controls>` for a panel, or an `<a>` for a plain destination.
- `.ds-nav-menu__panel` the floating panel (`hidden` when closed; `is-wide` for 40rem).
- `.ds-nav-menu__grid` columns, `.ds-nav-menu__group` a list with `.ds-nav-menu__heading`.
- `.ds-nav-menu__entry` a link with `.ds-nav-menu__title` and `.ds-nav-menu__desc`.
- `.ds-nav-menu__feature` a highlighted block.
- `.ds-nav-menu__indicator` the sliding highlight, created by the script.

## Usage

- Use 3 to 7 top-level items and at most 8 links per dropdown. Mega panels hold up to 3 groups of 4 links.
- Give every entry a title of 1 to 3 words and, if it helps, one short description of 8 words or fewer.
- Top-level labels name the area ("Products"), not the action.
- Do not nest panels inside panels. Do not put form controls inside a panel.
- The top-level trigger of a panel is not a link. If the area has an overview page, put it as the first entry.
- Provide the same links in the footer or on the overview pages for people who cannot use a hover panel.
- Do not use a navigation menu for commands (Delete, Export): use a [Dropdown menu](./dropdown-menu.md).

## Accessibility

- Triggers are buttons with `aria-expanded` and `aria-controls`. The panel is a plain container of links; focus stays on the trigger when it opens through Enter or Space.
- Hover intent applies to mouse pointers only (not touch or pen): 90ms to open, 250ms to close, no delay when switching from an open neighbour. The panel has an invisible bridge over the gap so the pointer can travel to it.
- A panel opened by hover closes when the pointer leaves; clicking its trigger pins it open. Panels opened by click or keyboard stay open until Escape, outside click or focus leaving.
- Focus leaving the menu closes it. Escape closes the open panel and returns focus to its trigger.
- Panels keep their position inside the viewport (shifted by up to the overflow, 8px margin) and flip with the writing direction.
- Contrast: 4.5:1 for labels, descriptions use `--ds-subtle`; current is marked by the underline mark and the tint, not colour alone.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Moves through triggers and, when a panel is open, into its links |
| Enter / Space | Opens or closes the panel of a trigger (focus stays on it) |
| Arrow Down | On a trigger: opens its panel and focuses the first link. In a panel: next link |
| Arrow Up | In a panel: previous link; from the first link, back to the trigger |
| Arrow Right / Left | On a trigger or in a panel: next or previous top-level item (swapped in right-to-left pages); opens its panel if it has one |
| Home / End | On a trigger: first or last top-level item. In a panel: first or last link |
| Escape | Closes the panel and returns focus to its trigger |

Motion: panel enter is 220ms on `--ds-ease-emphasized`, exit 140ms; the highlight travels on `--ds-ease-spring`. Under reduced motion the panels fade only and the highlight jumps.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-nav-menu` | On the `<nav>`: wires triggers, panels, hover intent, keyboard and the highlight |

Events (bubble from the root): `ds:navmenu:open` and `ds:navmenu:close`, both with `detail.trigger` and `detail.panel`. Call `DS.init(root)` after inserting a menu.

## Tokens

`--ds-popover`, `--color-base-300`, `--color-base-100`, `--color-base-200`, `--color-base-content`, `--color-primary`, `--ds-subtle`, `--ds-quiet`, `--ds-shadow-panel`, `--ds-radius-card`, `--ds-radius-lg`, `--ds-z-menu`, `--ds-enter-offset`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-primary-soft`, `--ds-duration-enter`, `--ds-duration-exit`, `--ds-duration-spring`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-ease-spring`, `--ds-type-eyebrow-*`.

## Native and daisyUI

Built from `<nav>`, lists, buttons and links; no daisyUI `menu` or `dropdown` classes, because those are for command lists and CSS-only focus dropdowns. Place the menu inside a [Navbar](./navbar.md) in place of `.ds-navbar__nav` when the site needs panels; inside the narrow navbar menu it stacks as an accordion.
