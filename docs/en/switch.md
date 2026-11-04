---
title: Switch
group: components
category: forms
order: 22
summary: An on/off control for settings that apply at once, with a thumb that travels on a spring, optional icons, sizes and a busy state for async saves.
---

A switch turns a setting on or off with immediate effect, like a light switch. Use it in settings pages and lists of preferences. When the choice only applies after a form is submitted, use a [Checkbox](./checkbox.md). When the choice is between two named options that are not on/off ("Grid" and "List"), use a [Segmented control](./segmented-control.md).

## Examples

### With a label and a description

The switch is a native checkbox with `role="switch"` and daisyUI `.toggle`. Wrap it in `label.ds-check-row` like a checkbox.

```html preview title="Switch rows"
<div class="ds-choice-group__items">
  <label class="ds-check-row">
    <input type="checkbox" role="switch" class="toggle" name="TwoFactor" value="true" checked aria-describedby="sw-2fa">
    <span><strong>Two-step verification</strong><small id="sw-2fa">Ask for a 6-digit code from the authenticator app at every sign-in.</small></span>
  </label>
  <label class="ds-check-row">
    <input type="checkbox" role="switch" class="toggle" name="Digest" value="true">
    <span><strong>Weekly activity summary</strong></span>
  </label>
</div>
```

### Label first, switch at the end

Settings lists read best with the label at the start and the switch aligned at the end. Add `.is-end` to the row.

```html preview title="Settings list"
<div class="ds-choice-group__items" style="max-width: 32rem">
  <label class="ds-check-row is-end">
    <input type="checkbox" role="switch" class="toggle" name="Alerts.Payments" checked>
    <span><strong>Payment received</strong><small>When a customer pays an invoice.</small></span>
  </label>
  <label class="ds-check-row is-end">
    <input type="checkbox" role="switch" class="toggle" name="Alerts.Overdue" checked>
    <span><strong>Invoice overdue</strong><small>The day after the due date, then every 7 days.</small></span>
  </label>
  <label class="ds-check-row is-end">
    <input type="checkbox" role="switch" class="toggle" name="Alerts.Comments">
    <span><strong>New comment</strong><small>When someone mentions you on PRJ-1024.</small></span>
  </label>
</div>
```

### Icons in the thumb

`.is-icons` draws a check when on and a cross when off. It adds a second cue besides position and colour; use it where the switch stands alone.

```html preview title="With icons"
<label class="ds-check-row">
  <input type="checkbox" role="switch" class="toggle is-icons" name="Public" checked>
  <span>Project visible to the whole workspace</span>
</label>
```

### Sizes

```html preview title="Sizes"
<div class="flex flex-wrap items-center gap-8">
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle is-sm" checked><span>Small, 32×20</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" checked><span>Default, 40×24</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle is-lg" checked><span>Large, 48×28</span></label>
</div>
```

### Async save

`data-ds-switch-action="url"` posts the new value as soon as it changes (form-encoded `name=true|false`, with the antiforgery token when the page has one). While the request runs the switch is busy: `aria-busy="true"`, input blocked, a spinner appears in the thumb after 300ms. If the request fails, the switch returns to its previous state and a toast explains it.

```html preview title="Saves on change"
<label class="ds-check-row is-end" style="max-width: 32rem">
  <input type="checkbox" role="switch" class="toggle" name="Maintenance" data-ds-switch-action="/__demo/does-not-exist">
  <span><strong>Maintenance mode</strong><small>Shows a notice to every signed-in user. This demo request fails, so the switch turns back off.</small></span>
</label>
```

## States

```html preview title="Switch states"
<div class="grid gap-x-8 sm:grid-cols-2">
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle"><span>Off</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" checked><span>On</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" aria-busy="true"><span>Busy (off, saving)</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" aria-busy="true" checked><span>Busy (on, saving)</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" disabled><span>Disabled, off</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" disabled checked><span>Disabled, on</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" aria-invalid="true" aria-describedby="sw-err"><span><strong>Share data with the auditor</strong><small id="sw-err" class="ds-field-error">Turn this on to submit the audit request.</small></span></label>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Off | unchecked | 40×24 track with an 8% neutral fill and a 1px `--ds-control-border`, grey thumb at the start |
| On | `:checked` (announced as "on") | primary track, `--color-primary-content` thumb at the end |
| Hover | pointer over the switch or its row | track one step deeper |
| Pressed | pointer down | thumb stretches to 114% along its travel (120ms) |
| Travel | state change | thumb moves with `--ds-ease-spring` over `--ds-duration-spring`; interruptible |
| Focus-visible | keyboard focus | 2px ring `--ds-focus`, 2px offset |
| Busy | `aria-busy="true"` | spinner in the thumb after 300ms, clicks and Space ignored, width unchanged |
| Invalid | `aria-invalid="true"` or `:user-invalid` | error border on the track, message below |
| Disabled | `:disabled` | `--ds-opacity-disabled`, `cursor: not-allowed` |

## Anatomy

- `input.toggle[role="switch"]` — the native checkbox; the track is the element, the thumb is `::before`, the icon or spinner is `::after`.
- `label.ds-check-row` — row with label and description; `.is-end` puts the switch at the end.
- Modifiers: `.is-sm`, `.is-lg`, `.is-icons`.

## Usage

- Label the setting, not the action: "Two-step verification", not "Turn on two-step verification".
- Apply the change at once. Do not put switches in a form that needs a Save button; use checkboxes there.
- Do not add "On"/"Off" text next to the switch; the state is announced and shown by position.
- Confirm only destructive changes (for example "Delete data after 30 days") with an [Alert dialog](./alert-dialog.md).
- Keep busy saves under 2 s; above that, show progress elsewhere.

## Accessibility

- `role="switch"` on a native checkbox: screen readers announce "switch, on/off"; the form still posts like a checkbox.
- The visible label is the accessible name. Never rely on the position or colour of the thumb alone; `.is-icons` adds a shape cue.
- While busy, `aria-busy="true"` is announced and activation is blocked. On failure, the toast message is announced by the live region.
- Track and thumb boundaries meet 3:1 in both themes; the off track has a 3:1 border.
- Motion: the thumb travels on the critically damped spring (no overshoot). With reduced motion it jumps and only colours cross-fade.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Move focus to or from the switch |
| Space | Toggle on and off (ignored while busy) |

## Razor

```cshtml
<ds-switch asp-for="TwoFactor" label="Two-step verification"
           description="Ask for a 6-digit code at every sign-in." />
<ds-switch asp-for="Alerts.Overdue" label="Invoice overdue" label-position="start" />
<ds-switch asp-for="Maintenance" label="Maintenance mode" action="/settings/maintenance" icons size="lg" />
```

A `bool` model posts `true`/`false` (with a hidden `false` input). `action` adds `data-ds-switch-action`; `method` changes the HTTP method (default `POST`).

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-switch-action="url"` | On change, sends `name=true|false` (FormData) and the antiforgery token; busy while pending; reverts and shows an error toast on failure |
| `data-ds-switch-method` | HTTP method for the request (default `POST`) |
| `aria-busy="true"` | Blocks clicks and Space; shows the spinner |

API: `DS.switchBusy(input, promise)` marks the switch busy until the promise settles and reverts it if the promise rejects. Events (bubble): `ds:switch:change` `{ checked, result }`, `ds:switch:error` `{ checked, error }`.

```js
document.querySelector("#Notifications").addEventListener("change", (event) => {
  DS.switchBusy(event.target, fetch("/api/profile/notifications", { method: "PUT", body: String(event.target.checked) }));
});
```

## Tokens

`--color-primary`, `--color-primary-content`, `--ds-control-border`, `--color-base-content`, `--color-base-100`, `--ds-shadow-xs`, `--ds-duration-spring`, `--ds-ease-spring`, `--ds-duration-instant`, `--ds-duration-fast`, `--ds-opacity-disabled`, `--ds-focus`, `--color-error`, `--ds-radius-full`.

## Native and daisyUI

Builds on `<input type="checkbox" role="switch">` with daisyUI `.toggle`. The DS keeps the class but replaces daisyUI's grid-column thumb (which animates layout) with a translated thumb on the spring token, sets 40×24 by default (`is-sm` 32×20, `is-lg` 48×28; `toggle-sm`/`-lg` also work), adds the press stretch, icons, busy spinner, a 3:1 off border and the DS focus ring. The daisyUI pattern `label.toggle > input + svg` is not changed.
