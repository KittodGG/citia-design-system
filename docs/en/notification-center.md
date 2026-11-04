---
title: Notification center
group: components
category: feedback
order: 5
summary: A bell with an unread count and a panel of notifications grouped by day, with unread and read items, mark all read, and loading, empty and error states.
source: TPS app.css L3662–3718, NotificationBell view component
---

The notification center holds what happened while the person was away or busy elsewhere: comments, approvals, billing reminders, system notices. The bell shows how many are unread; the panel lists them; a full inbox page (the notification card) lets people read them in full. For a result of something the person just did use a [toast](./toast.md). For a condition that affects the whole page use a [banner](./banner.md).

The design system supplies markup and styles. Fetching and polling belong to the application: render the list on the server, and do not rebuild it while the panel is open, so nothing moves under the pointer.

## Examples

The bell is a `details` with a `summary` trigger. The badge shows the exact count up to 99, then `99+`, and is hidden at 0.

```html preview title="Bell and badge"
<div class="ds-actions is-start">
  <details class="ds-notif">
    <summary class="ds-notif-trigger" aria-label="Notifications: 3 unread"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><span class="ds-notif-count">3</span></summary>
  </details>
  <details class="ds-notif">
    <summary class="ds-notif-trigger" aria-label="Notifications: 120 unread"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><span class="ds-notif-count">99+</span></summary>
  </details>
  <details class="ds-notif">
    <summary class="ds-notif-trigger" aria-label="Notifications"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><span class="ds-notif-count" hidden>0</span></summary>
  </details>
</div>
```

The panel, grouped by day, with unread and read items. "Mark all as read" works on the client with `data-ds-notif-read-all` (inside a form it also posts to the server).

```html preview title="Panel grouped by day"
<div style="min-height:36rem;display:flex;justify-content:flex-end">
  <details class="ds-notif" open>
    <summary class="ds-notif-trigger" aria-label="Notifications: 3 unread"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><span class="ds-notif-count">3</span></summary>
    <div class="ds-notif-panel">
      <div class="ds-notif-head">
        <h2 style="font-size:.9375rem;font-weight:700">Notifications</h2>
        <button type="button" class="btn btn-ghost btn-xs" data-ds-notif-read-all>Mark all as read</button>
      </div>
      <div class="ds-notif-list">
        <section aria-labelledby="nc-today">
          <h3 class="ds-notif-day" id="nc-today">Today</h3>
          <ul class="ds-notif-group">
            <li><a class="ds-notif-item is-info" href="#"><span class="ds-notif-dot" aria-hidden="true"></span><span>
              <span class="ds-notif-title"><span class="ds-visually-hidden" data-ds-notif-unread>Unread: </span>Mei Tanaka commented on PRJ-1024</span>
              <span class="ds-notif-text">"The revised scope looks right. Can Daniel confirm the budget before Friday?"</span>
              <span class="ds-notif-time"><time datetime="2026-11-02T14:05">14:05</time> · Comments</span></span></a></li>
            <li><a class="ds-notif-item is-warning" href="#"><span class="ds-notif-dot" aria-hidden="true"></span><span>
              <span class="ds-notif-title"><span class="ds-visually-hidden" data-ds-notif-unread>Unread: </span>Invoice INV-2026-0418 is due in 3 days</span>
              <span class="ds-notif-text">Amount 12,450.00. Send a reminder to the client.</span>
              <span class="ds-notif-time"><time datetime="2026-11-02T09:00">09:00</time> · Billing</span></span></a></li>
          </ul>
        </section>
        <section aria-labelledby="nc-yesterday">
          <h3 class="ds-notif-day" id="nc-yesterday">Yesterday</h3>
          <ul class="ds-notif-group">
            <li><a class="ds-notif-item is-error" href="#"><span class="ds-notif-dot" aria-hidden="true"></span><span>
              <span class="ds-notif-title"><span class="ds-visually-hidden" data-ds-notif-unread>Unread: </span>Import failed: row 14 has no invoice number</span>
              <span class="ds-notif-time"><time datetime="2026-11-01T17:30">17:30</time> · Imports</span></span></a></li>
            <li><a class="ds-notif-item is-success is-read" href="#"><span class="ds-notif-dot" aria-hidden="true"></span><span>
              <span class="ds-notif-title">Sofia Marquez approved the Q3 budget</span>
              <span class="ds-notif-time"><time datetime="2026-11-01T11:12">11:12</time> · Approvals</span></span></a></li>
          </ul>
        </section>
        <section aria-labelledby="nc-older">
          <h3 class="ds-notif-day" id="nc-older">Earlier</h3>
          <ul class="ds-notif-group">
            <li><a class="ds-notif-item is-info is-read" href="#"><span class="ds-notif-dot" aria-hidden="true"></span><span>
              <span class="ds-notif-title">Version 2.4 is live</span>
              <span class="ds-notif-text">Keyboard shortcuts now work in every table.</span>
              <span class="ds-notif-time"><time datetime="2026-10-28T10:00">28 Oct 2026</time> · Product</span></span></a></li>
          </ul>
        </section>
      </div>
      <a class="ds-notif-all" href="#">View all notifications</a>
    </div>
  </details>
</div>
```

Loading, empty and error. The list is `aria-busy` while it loads; an empty list says what will appear; an error offers a retry.

```html preview title="Loading, empty, error"
<div style="display:grid;gap:1rem">
  <div style="min-height:15rem;display:flex;justify-content:flex-end">
    <details class="ds-notif" open><summary class="ds-notif-trigger" aria-label="Notifications"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg></summary>
      <div class="ds-notif-panel">
        <div class="ds-notif-head"><h2 style="font-size:.9375rem;font-weight:700">Notifications</h2></div>
        <div class="ds-notif-list" aria-busy="true">
          <span class="ds-visually-hidden" role="status">Loading notifications</span>
          <div class="ds-notif-skeleton" aria-hidden="true"><span></span></div>
          <div class="ds-notif-skeleton" aria-hidden="true"><span></span></div>
          <div class="ds-notif-skeleton" aria-hidden="true"><span></span></div>
        </div>
      </div></details>
  </div>
  <div style="min-height:15rem;display:flex;justify-content:flex-end">
    <details class="ds-notif" open><summary class="ds-notif-trigger" aria-label="Notifications"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg></summary>
      <div class="ds-notif-panel">
        <div class="ds-notif-head"><h2 style="font-size:.9375rem;font-weight:700">Notifications</h2></div>
        <div class="ds-notif-empty"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><strong>You are all caught up</strong><span>New comments, approvals and reminders appear here.</span></div>
      </div></details>
  </div>
  <div style="min-height:15rem;display:flex;justify-content:flex-end">
    <details class="ds-notif" open><summary class="ds-notif-trigger" aria-label="Notifications"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg></summary>
      <div class="ds-notif-panel">
        <div class="ds-notif-head"><h2 style="font-size:.9375rem;font-weight:700">Notifications</h2></div>
        <div class="ds-notif-error" role="alert"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg><strong>Could not load notifications</strong><span>Check your connection and try again.</span><button type="button" class="btn btn-sm">Try again</button></div>
      </div></details>
  </div>
</div>
```

The full inbox page uses the notification card. The card opened from the bell is highlighted with `:target`.

```html preview title="Inbox card"
<div style="display:grid;gap:.75rem;max-width:44rem">
  <article class="ds-notif-card is-warning" id="n-418">
    <span class="ds-notif-card-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg></span>
    <div style="flex:1;min-width:12rem">
      <h3 style="font-size:.9375rem;font-weight:700">Invoice INV-2026-0418 is due in 3 days</h3>
      <p style="color:var(--ds-subtle);font-size:.875rem">Amount 12,450.00. Send a reminder to the client or mark the invoice as paid.</p>
      <p style="color:var(--ds-subtle);font-size:.75rem;margin-top:.25rem"><time datetime="2026-11-02T09:00">2 Nov 2026, 09:00</time> · Billing</p>
    </div>
  </article>
  <article class="ds-notif-card is-info is-read">
    <span class="ds-notif-card-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg></span>
    <div style="flex:1;min-width:12rem">
      <h3 style="font-size:.9375rem;font-weight:600">Version 2.4 is live</h3>
      <p style="color:var(--ds-subtle);font-size:.875rem">Keyboard shortcuts now work in every table.</p>
    </div>
  </article>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Bell rest | Closed | 44px target, icon in the text colour, no badge when 0 |
| Bell hover | Pointer over | Primary state layer at 6%, icon in the primary text colour |
| Bell open | `details[open]` | Primary state layer at 12% |
| Bell pressed | Pointer down | State layer at 10%, scale 0.97 |
| Bell focus-visible | Keyboard focus | 2px `--ds-focus` ring |
| Badge | Unread above 0 | Filled error colour with a 2px ring in the surface colour; tabular digits; `99+` above 99 |
| Unread item | No `is-read` | Filled tone dot with a halo, title in weight 700, a hidden "Unread:" prefix for screen readers |
| Read item | `is-read` | Ring dot, title in weight 600, text in the subtle colour (still 4.5:1) |
| Item hover, pressed, focus | On a link item | Surface `base-200`, then 10% layer, then an inset 2px focus ring |
| Day heading | `.ds-notif-day` | Sticks to the top of the scrolling list while its group scrolls |
| Loading | `aria-busy="true"` | Three skeleton rows; shimmer is static under reduced motion |
| Empty | `.ds-notif-empty` | A bell, a sentence that says what will appear |
| Error | `.ds-notif-error` | Error icon, a sentence and a retry button |
| Mark all read | `data-ds-notif-read-all` | Every item becomes read, the badge hides, the bell name updates |
| Opening | `details[open]` | Fades in with a 5px move down over 160ms, from the bell |

## Anatomy

- `details.ds-notif` with `summary.ds-notif-trigger` (the bell) and `.ds-notif-count` (the badge).
- `.ds-notif-panel`: `.ds-notif-head` (title and "Mark all as read"), `.ds-notif-list` (scrolls after 32rem or the viewport), `.ds-notif-day` and `.ds-notif-group`, `.ds-notif-item` parts (`.ds-notif-dot`, `.ds-notif-title`, `.ds-notif-text`, `.ds-notif-time`), `.ds-notif-all`.
- States: `.ds-notif-skeleton`, `.ds-notif-empty`, `.ds-notif-error`.
- Inbox: `.ds-notif-card`, `.ds-notif-card-icon`. Tones on items and cards: `is-info`, `is-success`, `is-warning`, `is-error`, `is-neutral`.

## Usage

- Order newest first and group by calendar day: Today, Yesterday, then a date. Show the time in the person's time zone.
- Title: what happened in one line. Text: at most 3 lines (the rest is clamped; the inbox shows it in full).
- Keep 20 to 30 items in the panel and link to the full inbox with "View all notifications".
- Count only items the person has not seen. Clear the count when "Mark all as read" is used or when the inbox page is opened.
- Update the badge and the list only when the panel is closed, or ask first ("2 new notifications").
- Do not show a toast for every new notification; reserve toasts for the person's own actions and for one-off urgent items.
- Do not rely on the dot colour: unread is also bold and announced.

## Accessibility

- The `summary` is the control: give it an `aria-label` with the real count ("Notifications: 3 unread"). The badge text is not read separately because the label replaces the name.
- Every unread item starts with a visually hidden "Unread: " so the state is spoken. Read items have no prefix.
- Each day group is a `section` labelled by its `h3`. Use `time` with `datetime` for the times.
- The loading list is `aria-busy` with a `role="status"` text; the error block is `role="alert"`.
- The panel closes on outside press and on Escape, returning focus to the bell (the `data-ds-menu` behaviour from the shell script).

| Key | Action |
| --- | --- |
| Enter, Space | Opens or closes the panel from the bell |
| Tab, Shift+Tab | Moves through "Mark all as read", the items and "View all notifications" |
| Escape | Closes the panel and returns focus to the bell |

## Razor

There is no tag helper; the markup is a partial of your application. Keep the structure:

```cshtml
<details class="ds-notif" data-ds-menu>
    <summary class="ds-notif-trigger" aria-label="@(unread > 0 ? DsText.T("notif.label", unread) : DsText.T("notif.none"))">
        <ds-icon name="bell" size="lg" />
        <span class="ds-notif-count" hidden="@(unread == 0)">@(unread > 99 ? "99+" : unread.ToString())</span>
    </summary>
    <div class="ds-notif-panel">
        <div class="ds-notif-head">
            <h2>@DsText.T("notif.markAllRead")</h2>
            <form method="post" asp-action="MarkAllRead"><button class="btn btn-ghost btn-xs" data-ds-notif-read-all>@DsText.T("notif.markAllRead")</button></form>
        </div>
        @* groups and items *@
    </div>
</details>
```

The strings `notif.label`, `notif.none`, `notif.markAllRead`, `notif.empty` and `notif.unread` are registered in English and Indonesian.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-notif-read-all` | On a button inside `.ds-notif`: marks every item read, hides the badge and updates the bell name. In a form, the form still submits |
| `data-ds-notif-unread` | On the hidden "Unread:" text of an item: hidden when the item becomes read |

`DS.notif.setUnread(notifElement, count)` updates the badge and the name; `DS.notif.markAllRead(notifElement)`. Event `ds:notif:read-all`.

## Tokens

`--ds-size-panel`, `--ds-z-notification`, `--ds-shadow-overlay`, `--ds-radius-box`, `--color-error`, `--ds-error-text`, `--ds-subtle`, `--ds-opacity-state-hover`, `--ds-opacity-state-selected`, `--ds-opacity-state-pressed`, `--ds-duration-quick`, `--ds-ease-emphasized`, `--ds-focus`, `--ds-duration-shimmer`.

## Native and daisyUI

The bell and panel are a native `details`. daisyUI is not used. The shell script closes open `details[data-ds-menu]` on outside press and on Escape; the demos above omit `data-ds-menu` so they stay open.
