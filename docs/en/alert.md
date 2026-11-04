---
title: Alert
group: components
category: feedback
order: 1
summary: An inline message in a tonal pale fill with an icon, a title, a description and optional actions, in five tones, compact or full, optionally dismissible.
source: TPS app.css .pt-note L3636–3637
---

An alert tells people something about the content next to it: a saved draft, a limit that is close, a failed import. It stays where it was placed until the situation changes or the person dismisses it. For a condition that applies to the whole page use a [banner](./banner.md). For a result that disappears by itself use a [toast](./toast.md). For a decision that blocks work use an alert dialog.

## Examples

Five tones. Every tone has its own icon and its own words, so the meaning never depends on colour.

```html preview title="Tones"
<div style="display:grid;gap:.75rem;max-width:42rem">
  <div class="ds-alert is-info" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg>
    <div class="ds-alert__body">
      <p class="ds-alert__title">Project PRJ-1024 is shared with 4 people</p>
      <div class="ds-alert__text">Ayu Lestari, Daniel Okafor, Mei Tanaka and Sofia Marquez can edit it.</div>
    </div>
  </div>
  <div class="ds-alert is-success" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-check-circle"></use></svg>
    <div class="ds-alert__body">
      <p class="ds-alert__title">Invoice INV-2026-0418 was sent</p>
      <div class="ds-alert__text">The client received it at 09:42 and has 30 days to pay.</div>
    </div>
  </div>
  <div class="ds-alert is-warning" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg>
    <div class="ds-alert__body">
      <p class="ds-alert__title">Storage is 92% full</p>
      <div class="ds-alert__text">Uploads stop at 50 GB. Remove old exports or upgrade the plan.</div>
    </div>
  </div>
  <div class="ds-alert is-error" role="alert">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>
    <div class="ds-alert__body">
      <p class="ds-alert__title">The import failed</p>
      <div class="ds-alert__text">Row 14 has no invoice number. Fix the file and import it again.</div>
    </div>
  </div>
  <div class="ds-alert is-neutral" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg>
    <div class="ds-alert__body">
      <p class="ds-alert__title">Read-only view</p>
      <div class="ds-alert__text">This report was archived on 31 Oct 2026 and can no longer be edited.</div>
    </div>
  </div>
</div>
```

With actions and a dismiss button. Actions are ordinary buttons or links, at most two: the one that fixes the problem first.

```html preview title="Actions and dismiss"
<div class="ds-alert is-warning" role="status" style="max-width:42rem">
  <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg>
  <div class="ds-alert__body">
    <p class="ds-alert__title">Your trial ends in 3 days</p>
    <div class="ds-alert__text">After 5 Nov 2026 the workspace becomes read-only. Pick a plan to keep editing.</div>
    <div class="ds-alert__actions">
      <a class="btn btn-sm btn-primary" href="#">Choose a plan</a>
      <a class="btn btn-sm btn-ghost" href="#">Compare plans</a>
    </div>
  </div>
  <button type="button" class="ds-alert__close" data-ds-alert-close aria-label="Dismiss">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
  </button>
</div>
```

Compact, for a table toolbar or a form section. The title and the text run on one line.

```html preview title="Compact"
<div style="display:grid;gap:.5rem;max-width:42rem">
  <div class="ds-alert is-compact is-info" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg>
    <div class="ds-alert__body"><p class="ds-alert__title">Draft.</p><div class="ds-alert__text">Saved automatically at 14:05.</div></div>
  </div>
  <div class="ds-alert is-compact is-error" role="alert">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>
    <div class="ds-alert__body"><p class="ds-alert__title">Could not save.</p><div class="ds-alert__text">Check your connection and try again.</div></div>
    <button type="button" class="ds-alert__close" data-ds-alert-close aria-label="Dismiss"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
</div>
```

## States

An alert is a static message, so its states belong to its controls and to the dismiss motion. Tone is the variant; every tone below stays legible in light and dark.

```html preview title="Rest, with actions, dismissible, error"
<div style="display:grid;gap:.75rem;max-width:42rem">
  <div class="ds-alert is-success" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-check-circle"></use></svg>
    <div class="ds-alert__body"><p class="ds-alert__title">Backup finished</p></div>
  </div>
  <div class="ds-alert is-info" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg>
    <div class="ds-alert__body">
      <p class="ds-alert__title">Export is ready</p>
      <div class="ds-alert__text">Report-2026-Q3.xlsx, 2.4 MB.</div>
      <div class="ds-alert__actions"><button type="button" class="btn btn-sm">Download</button><button type="button" class="btn btn-sm" aria-disabled="true">Share link</button></div>
    </div>
    <button type="button" class="ds-alert__close" data-ds-alert-close aria-label="Dismiss"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Rendered | Tonal fill at 8% of the tone, 1px border at 30%, tone-coloured icon, text in the normal and subtle text colours |
| Hover | Pointer over the close button or an action | State layer at 6% behind the control; the alert itself does not change |
| Focus-visible | Keyboard focus on a control | 2px `--ds-focus` ring, 2px offset |
| Pressed | Pointer down on the close button or an action | State layer at 10% and scale 0.97 |
| Dismissing | Close button | Fades over 140ms with a 5px move up, then the space closes over 240ms; instant under reduced motion |
| aria-disabled action | `aria-disabled="true"` on a button | 55% opacity, stays focusable |
| Tones | `is-info`, `is-success`, `is-warning`, `is-error`, `is-neutral` | Different icon and different words per tone |
| Compact | `is-compact` | 8px × 12px padding, 16px icon, 13px text |

## Anatomy

- `.ds-alert`: the container, a grid of icon, body and close button. Tone modifiers `is-info` (default), `is-success`, `is-warning`, `is-error`, `is-neutral`.
- `.ds-alert__icon`: the tone icon, 20px (16px compact).
- `.ds-alert__body`: title, text and actions.
- `.ds-alert__title`: the one-line result in weight 650.
- `.ds-alert__text`: the description, in the subtle text colour.
- `.ds-alert__actions`: up to two buttons or links.
- `.ds-alert__close`: the dismiss button, 28px visible and a 44px hit area on touch.
- `.ds-note` is the version 1 name for a simple alert (icon and one paragraph). It still works.

## Usage

- Write the title as the outcome ("The import failed") and the text as the cause and the next step ("Row 14 has no invoice number. Fix the file and import it again.").
- Place an alert next to the thing it is about: above the form it describes, inside the card it concerns.
- Use at most one alert per section. Two alerts in one section mean the message needs rewriting.
- Keep titles to 60 characters and descriptions to 2 sentences.
- Use `is-error` only for a failure the person must act on; use `is-warning` for something that will become a failure.
- Do not use an alert for a result of a click that fades away; that is a [toast](./toast.md).
- Do not use a dismiss button on an error that is still true. Dismiss hides the message, it does not fix the problem.
- Do not rely on tone alone: keep the icon and the words.

## Accessibility

- An error uses `role="alert"` (announced at once). Info, success, warning and neutral use `role="status"` (announced politely). An alert that is already on the page at load should not use `role="alert"` unless it is an error, otherwise screen readers read it before the page content.
- The icon is decorative (`aria-hidden="true"`); the title and text carry the meaning.
- The dismiss button has an accessible name (`aria-label="Dismiss"`). When an alert is dismissed with focus inside it, focus moves to the next focusable element on the page.
- Contrast: text 4.5:1 or more on the tonal fill; the icon and border 3:1 or more, in both themes.
- Motion: the exit is opacity and a 5px move, then the space closes. Under `prefers-reduced-motion: reduce` it closes at once.

| Key | Action |
| --- | --- |
| Tab | Moves to the next action or the close button |
| Enter, Space | Activates the focused action or dismisses the alert |

## Razor

```cshtml
<ds-alert tone="Warning" title="Storage is 92% full" dismissible>
    Uploads stop at 50 GB. Remove old exports or upgrade the plan.
    <ds-alert-actions>
        <a class="btn btn-sm btn-primary" href="/billing">Upgrade</a>
    </ds-alert-actions>
</ds-alert>

<ds-alert tone="Error" compact title="Could not save.">Check your connection and try again.</ds-alert>
```

| Attribute | Effect |
| --- | --- |
| `tone` | `Info` (default), `Success`, `Warning`, `Error`, `Neutral` |
| `title` | The one-line heading |
| `icon` | An icon name instead of the tone icon |
| `dismissible` | Adds the close button |
| `compact` | The compact variant |
| `role` | Overrides `status` / `alert` |
| `dismiss-label` | The close button name (defaults to the localised "Dismiss") |

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-alert-close` | On a button inside an alert: dismisses the alert with the exit motion |

`DS.alert.dismiss(element)` dismisses an alert from code. The `ds:alert:dismiss` event bubbles from the alert and can be cancelled with `preventDefault()` to keep it.

## Tokens

`--color-info`, `--color-success`, `--color-warning`, `--color-error` (the tone), `--color-base-100`, `--color-base-300`, `--ds-subtle`, `--ds-radius-box`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-focus`, `--ds-duration-exit`, `--ds-duration-layout`, `--ds-ease-exit`, `--ds-ease-emphasized`, `--ds-enter-offset`.

## Native and daisyUI

The alert does not use daisyUI's `.alert` (a saturated fill). `.ds-alert` is a separate tonal component so the surface stays pale and the text stays at full contrast. Actions are daisyUI `btn` buttons at `btn-sm`.
