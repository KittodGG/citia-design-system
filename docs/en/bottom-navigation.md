---
title: Bottom navigation
group: components
category: navigation
order: 2
summary: Primary navigation for phones: 3 to 5 destinations with icon and label, a tonal pill that slides to the active one, badges, safe-area padding and optional hide on scroll.
---

Bottom navigation puts the 3 to 5 most important destinations of an app within thumb reach on compact screens. Each destination has an icon and a label; the active one gets a tonal pill behind its icon that slides to the next destination. Use it for flat, top-level destinations that users switch between often (Home, Projects, Inbox, Account). For more destinations use a [Sidebar](./app-shell.md); for views of one object use [Tabs](./tabs.md); on desktop use a [Navbar](./navbar.md).

The bar is fixed to the bottom edge, translucent with a top hairline, and pads itself with `env(safe-area-inset-bottom)` so it clears the home indicator.

## Examples

### Four destinations with a badge

The demo uses `is-static` so it sits inside the preview. In an app drop that class: the bar is `position: fixed`. Click the buttons: the pill slides and the state changes.

```html preview title="Bottom navigation (buttons)"
<nav class="ds-bottom-nav is-static" aria-label="Primary" data-ds-bottom-nav style="max-width:26rem;margin-inline:auto;border:1px solid var(--color-base-300);border-radius:1rem">
  <button type="button" class="ds-bottom-nav__item" aria-current="page">
    <span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-home"/></svg></span>
    <span class="ds-bottom-nav__label">Home</span>
  </button>
  <button type="button" class="ds-bottom-nav__item">
    <span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"/></svg></span>
    <span class="ds-bottom-nav__label">Projects</span>
  </button>
  <button type="button" class="ds-bottom-nav__item">
    <span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-inbox"/></svg><span class="ds-bottom-nav__badge" aria-hidden="true">3</span></span>
    <span class="ds-bottom-nav__label">Inbox<span class="ds-visually-hidden">, 3 unread</span></span>
  </button>
  <button type="button" class="ds-bottom-nav__item">
    <span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user"/></svg></span>
    <span class="ds-bottom-nav__label">Account</span>
  </button>
</nav>
```

### Links and states

For a server-rendered app the items are links and the server sets `aria-current="page"`. The page reloads, so the pill does not travel; it is simply placed. Below: rest, current, a dot badge, a count badge and a disabled item.

```html preview title="Links, dot badge, disabled item"
<nav class="ds-bottom-nav is-static" aria-label="Primary (links)" data-ds-bottom-nav style="max-width:30rem;margin-inline:auto;border:1px solid var(--color-base-300);border-radius:1rem">
  <a class="ds-bottom-nav__item" href="#"><span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-home"/></svg></span><span class="ds-bottom-nav__label">Home</span></a>
  <a class="ds-bottom-nav__item" href="#" aria-current="page"><span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"/></svg><span class="ds-bottom-nav__badge is-dot" aria-hidden="true"></span></span><span class="ds-bottom-nav__label">Invoices<span class="ds-visually-hidden">, new activity</span></span></a>
  <a class="ds-bottom-nav__item" href="#"><span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"/></svg><span class="ds-bottom-nav__badge" aria-hidden="true">12</span></span><span class="ds-bottom-nav__label">Alerts<span class="ds-visually-hidden">, 12 unread</span></span></a>
  <a class="ds-bottom-nav__item" aria-disabled="true" title="Available after verification"><span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-wallet"/></svg></span><span class="ds-bottom-nav__label">Wallet</span></a>
</nav>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | none | `--ds-subtle` icon and label |
| Hover | pointer over an item (devices with hover) | text becomes `--color-base-content`, 6% tint behind the icon |
| Pressed | pointer down | 10% tint behind the icon (no scale) |
| Focus-visible | keyboard focus | 2px `--ds-focus` ring inside the item |
| Current | `aria-current="page"` | `--ds-quiet` icon, label in bold, tonal pill (`--ds-primary-soft`) that slides between items |
| Badge | `.ds-bottom-nav__badge` | error-coloured count or dot at the icon's top corner, with a 2px surface ring |
| Disabled | `aria-disabled="true"` | 55% opacity, `not-allowed` cursor |
| Hidden on scroll | `data-hidden` | bar slides down by its own height; never while an item has focus |
| Without JavaScript | `data-ds-ready` not set | the current item draws its own pill |

## Anatomy

- `nav.ds-bottom-nav` root. Modifiers: `is-static` (not fixed), `is-compact-only` (hidden from 768px).
- `.ds-bottom-nav__item` a `<a>` or `<button>`; one per destination.
- `.ds-bottom-nav__icon` the 4rem by 2rem pill area with the icon (24px grid, drawn at 22px); the badge sits inside it.
- `.ds-bottom-nav__label` the label, always visible, one line, truncated with an ellipsis.
- `.ds-bottom-nav__badge` count or dot (`is-dot`).
- `.ds-bottom-nav__indicator` the sliding pill, created by `tabs.js`.
- `.ds-bottom-nav-spacer` an empty block the height of the bar, for the end of the page.

## Usage

- Use 3 to 5 items. Two is a toggle (use a [Segmented control](./segmented-control.md)), six or more do not fit a 320px screen.
- Always show icon and label together. Icon-only bars are ambiguous.
- Keep the same items in the same order on every screen of the app.
- Labels: one word, 10 characters at most. Longer labels are truncated with an ellipsis, so check the Indonesian text too.
- Badges: show a count up to 99 (`99+` beyond); use a dot when the number does not matter.
- The page needs bottom padding equal to the bar: add `<div class="ds-bottom-nav-spacer"></div>` at the end of the content.
- Do not hide destinations in the bar behind a "More" item when a sidebar fits the task better.

## Accessibility

- The bar is a `<nav>` with an accessible name. Items are links or buttons with visible text, so no extra label is needed.
- Badges are decorative (`aria-hidden`); put the meaning in visually hidden text inside the label ("Inbox, 3 unread").
- Mark the current item with `aria-current="page"`. Button items are updated by the script on click; link items by the server.
- Hit area is 64px high and each item at least 64px wide on a 320px screen; at 5 items the width of each is a fifth of the screen.
- Contrast: the label is 4.5:1 or better in both themes; the active state uses weight, colour and the pill together.
- Safe area: `padding-block-end: env(safe-area-inset-bottom)` and left/right insets in landscape.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Moves between items |
| Enter / Space | Activates the item |

Motion: the pill travels on `--ds-ease-spring` over `--ds-duration-spring` with no overshoot and starts from where it is if interrupted. Hide on scroll is a 220ms transform. Under reduced motion the pill jumps and the bar does not slide.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-bottom-nav` | Creates the sliding pill; button items set `aria-current` on click |
| `data-ds-hide-on-scroll` | Hide on scroll down (after the bar's own height times 1.5), show on scroll up |

Event: `ds:bottomnav:change` with `detail.item` when a button item is chosen.

## Tokens

`--color-base-100`, `--color-base-300`, `--color-error`, `--color-error-content`, `--ds-subtle`, `--ds-quiet`, `--ds-z-sticky`, `--ds-radius-full`, `--ds-radius-lg`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-primary-soft`, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-duration-enter`, `--ds-duration-spring`, `--ds-ease-emphasized`, `--ds-ease-spring`.

## Native and daisyUI

Plain `<nav>` with links or buttons. It replaces daisyUI's `dock`; do not combine them. Add `viewport-fit=cover` to the viewport meta tag so the safe-area insets have values on notched devices.
