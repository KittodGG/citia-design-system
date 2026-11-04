---
title: Banner
group: components
category: feedback
order: 2
summary: A page or app level message that stays until it is dismissed, remembers the dismissal, can stick to the top and can show system status.
source: TPS app.css .access-banner L2664–2703, .notif-critical L3702–3707
---

A banner speaks for the whole page or the whole app: a planned maintenance window, an expiring trial, a service that is degraded. It sits above the content, stays until the person dismisses it (or the condition ends) and, when it has a `key`, does not come back after it was dismissed. For a message about one section use an [alert](./alert.md). For a short confirmation use a [toast](./toast.md).

## Examples

The default banner is a rounded box above the page content. Tones follow the [alert](./alert.md) tones.

```html preview title="Tones"
<div style="display:grid;gap:.75rem">
  <div class="ds-banner is-info" role="status" style="margin:0">
    <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-megaphone"></use></svg>
    <div class="ds-banner__body"><strong class="ds-banner__title">Version 2.4 is live.</strong> Keyboard shortcuts now work in every table. <a href="#">What changed</a></div>
  </div>
  <div class="ds-banner is-warning" role="status" style="margin:0">
    <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-clock"></use></svg>
    <div class="ds-banner__body"><strong class="ds-banner__title">Your trial ends on 30 Nov 2026 at 23:59.</strong> 12 days left. Pick a plan to keep editing.</div>
    <div class="ds-banner__actions"><a class="btn btn-sm btn-primary" href="#">Choose a plan</a></div>
  </div>
  <div class="ds-banner is-error" role="alert" style="margin:0">
    <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>
    <div class="ds-banner__body"><strong class="ds-banner__title">Payments are unavailable.</strong> Invoices are held as drafts until the service returns.</div>
  </div>
  <div class="ds-banner is-success" role="status" style="margin:0">
    <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-check-circle"></use></svg>
    <div class="ds-banner__body"><strong class="ds-banner__title">Migration complete.</strong> All 1,284 records were moved to the new workspace.</div>
  </div>
</div>
```

Dismissible. A banner with `data-ds-banner="key"` stores the dismissal in the browser, so it stays gone on the next visit. The demo below uses `data-ds-banner-remember="none"` so it can be reloaded.

```html preview title="Dismissible, remembered"
<div class="ds-banner is-info" role="status" data-ds-banner="planned-maintenance-2026-11" data-ds-banner-remember="none" style="margin:0">
  <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-megaphone"></use></svg>
  <div class="ds-banner__body"><strong class="ds-banner__title">Planned maintenance on 2 Nov 2026, 22:00 to 23:30.</strong> Saving is paused for 90 minutes.</div>
  <div class="ds-banner__actions"><a class="btn btn-sm" href="#">Details</a></div>
  <button type="button" class="ds-banner__close" data-ds-banner-close aria-label="Dismiss banner"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
</div>
```

System status. A labelled dot replaces the icon; the dot pulses only while the problem is open.

```html preview title="System status"
<div style="display:grid;gap:.75rem">
  <div class="ds-banner is-system is-warning" role="status" style="margin:0">
    <span class="ds-banner__status"><span class="ds-banner__dot" aria-hidden="true"></span>Degraded performance</span>
    <div class="ds-banner__body">Exports are slower than usual. Updated 14:05.</div>
    <div class="ds-banner__actions"><a href="#">Status page</a></div>
  </div>
  <div class="ds-banner is-system is-success" role="status" style="margin:0">
    <span class="ds-banner__status"><span class="ds-banner__dot" aria-hidden="true"></span>All systems operational</span>
    <div class="ds-banner__body">Last checked 14:05.</div>
  </div>
</div>
```

Edge to edge and sticky. `is-bar` removes the radius and the side borders; `is-sticky` keeps the bar at the top of the scrolling page (offset with `--ds-banner-top` when a header sits above it).

```html preview title="Bar, critical"
<div style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box);overflow:hidden">
  <div class="ds-banner is-bar is-error is-critical" role="alert">
    <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-megaphone"></use></svg>
    <div class="ds-banner__body"><strong class="ds-banner__title">Service interruption.</strong> Sign-in is failing for some people. We are working on it.</div>
  </div>
  <div style="padding:1rem">Page content starts here.</div>
</div>
```

## States

```html preview title="Hover, focus and pressed live on the controls"
<div class="ds-banner is-warning" role="status" style="margin:0">
  <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg>
  <div class="ds-banner__body"><strong class="ds-banner__title">2 invoices are overdue.</strong> INV-2026-0418 and INV-2026-0421.</div>
  <div class="ds-banner__actions"><button type="button" class="btn btn-sm">Review</button><button type="button" class="btn btn-sm" aria-disabled="true">Send reminders</button></div>
  <button type="button" class="ds-banner__close" aria-label="Dismiss banner"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Rendered | Tonal fill at 8%, 1px border at 30%, tone icon, text at full contrast |
| Hover | Pointer over an action or the close button | State layer at 6% on the control |
| Focus-visible | Keyboard focus | 2px `--ds-focus` ring, 2px offset; a sticky banner never covers the ring of the control below it because the page scrolls under it with `scroll-padding-top` |
| Pressed | Pointer down | State layer at 10%, scale 0.97 |
| Dismissed | Close button | Fades over 140ms, the space closes over 240ms, then `hidden`; remembered when `data-ds-banner` is set |
| Remembered | Storage holds the key | The banner is hidden when the page loads |
| Critical | `is-critical` | The icon blinks every 1.6s; static under reduced motion |
| System, open | `is-system` with a non-success tone | The dot pulses every 2s; static under reduced motion |
| Sticky | `is-sticky` | Stays at the top of the viewport above content |

## Anatomy

- `.ds-banner`: the container. Tones `is-info` (default), `is-success`, `is-warning`, `is-error`, `is-neutral`. Modifiers `is-bar`, `is-sticky`, `is-critical`, `is-system`.
- `.ds-banner__icon`: the tone icon (20px).
- `.ds-banner__body`: the message; `.ds-banner__title` is the bold first sentence.
- `.ds-banner__actions`: one or two buttons or links.
- `.ds-banner__close`: the dismiss button.
- `.ds-banner__status` and `.ds-banner__dot`: the status label and dot of the system variant.

## Usage

- Show at most one banner at a time. When several conditions apply, write one sentence that covers them or show the most urgent.
- State the fact, the time and the consequence: "Planned maintenance on 2 Nov, 22:00 to 23:30. Saving is paused."
- Give a banner about a planned event a `key` that includes the date (`planned-maintenance-2026-11`), so the next event is shown again.
- Do not use `is-critical` for anything but a live incident. It is the only banner that blinks.
- Do not make a banner the only place a blocking error appears; put the error on the screen it affects.
- Banners should not shift the page after load. Render them on the server; the script only hides a banner that was already dismissed, so a remembered banner can flash once. For a banner that must not flash, also write the dismissal to a cookie and skip rendering it on the server.

## Accessibility

- Use `role="status"` for ordinary banners and `role="alert"` only for critical ones.
- The dot and the icon are decorative; the words carry the status.
- The dismiss button is named ("Dismiss banner"). When the banner leaves with focus inside it, focus moves to the next focusable element.
- A sticky banner can cover the control that has focus. Set `scroll-padding-top` on the page to the banner height so focused controls scroll into view below it.

| Key | Action |
| --- | --- |
| Tab | Moves to the next action or the close button |
| Enter, Space | Activates the focused control |

Contrast is 4.5:1 for text and 3:1 for the icon and border in both themes. `prefers-reduced-motion: reduce` stops the blink and the pulse and closes the banner at once.

## Razor

```cshtml
<ds-banner tone="Warning" title="Planned maintenance on 2 Nov, 22:00 to 23:30."
           key="planned-maintenance-2026-11" dismissible sticky>
    Saving is paused for 90 minutes.
    <ds-banner-actions><a class="btn btn-sm" href="/status">Details</a></ds-banner-actions>
</ds-banner>

<ds-banner tone="Warning" system status-label="Degraded performance">Exports are slower than usual.</ds-banner>
```

| Attribute | Effect |
| --- | --- |
| `tone` | `Info` (default), `Success`, `Warning`, `Error`, `Neutral` |
| `title` | The bold first sentence |
| `key` | Remembers the dismissal under this id |
| `remember` | `local` (default), `session` or `none` |
| `days` | Show again after this many days |
| `dismissible`, `sticky`, `bar`, `critical` | Flags |
| `system`, `status-label` | System status variant and its label |
| `icon` | Icon name instead of the tone icon |

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-banner="key"` | The banner is hidden on load when the key was dismissed |
| `data-ds-banner-remember="local\|session\|none"` | Where the dismissal is stored |
| `data-ds-banner-days="7"` | The dismissal expires after 7 days |
| `data-ds-banner-close` | On a button inside the banner: dismiss |

`DS.banner.dismiss(elementOrKey)` and `DS.banner.reset(key)` (show it again). Events `ds:banner:dismiss` (bubbles, cancelable, `detail.id`). The storage key is `ds-banner-<key>` (the prefix follows `data-ds-storage`).

## Tokens

`--color-info`, `--color-success`, `--color-warning`, `--color-error`, `--color-base-100`, `--color-base-300`, `--ds-radius-box`, `--ds-z-sticky`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-focus`, `--ds-duration-exit`, `--ds-duration-layout`.

## Native and daisyUI

The banner is plain HTML with no daisyUI base. Its actions are daisyUI `btn btn-sm` buttons. The version 1 markup (`.ds-banner` with an `svg` and a `p`) still renders.
