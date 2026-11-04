---
title: Toast
group: components
category: feedback
order: 3
summary: A short message that confirms what just happened, stacks up to three, pauses while read, carries one action and updates from loading to success or error.
source: TPS _Toast partial and app.css toast rules
---

A toast confirms the result of something the person just did ("Draft saved") and gets out of the way. It does not hold information people must read later: put that in an [alert](./alert.md) or a [banner](./banner.md). A toast cannot hold a decision; for one use a [dialog](./dialog.md). A toast with a single recovery action ("Undo") is fine and stays until the person answers it.

## Examples

Click a button. Toasts enter from the edge they live on (bottom end by default), stay 6 seconds (8 seconds for long text) and leave the same way. Errors stay until closed.

```html preview title="Tones"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-toast-show="success" data-ds-toast-title="Draft saved" data-ds-toast-text="Proposal PRJ-1024 was saved at 14:05.">Success</button>
  <button type="button" class="btn" data-ds-toast-show="info" data-ds-toast-title="Preparing your export" data-ds-toast-text="The file downloads when it is ready.">Info</button>
  <button type="button" class="btn" data-ds-toast-show="warning" data-ds-toast-title="Storage is almost full" data-ds-toast-text="92% of 50 GB used.">Warning</button>
  <button type="button" class="btn" data-ds-toast-show="error" data-ds-toast-title="Could not send invoice" data-ds-toast-text="INV-2026-0418 has no recipient. Add an email address and try again.">Error</button>
</div>
```

An action. A toast with an action does not close by itself: the person answers it or closes it. The action fires `ds:toast:action`.

```html preview title="Action (stays until used)"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-toast-show="success" data-ds-toast-id="deleted-1" data-ds-toast-title="3 invoices deleted" data-ds-toast-action="Undo">Delete 3 invoices</button>
</div>
```

Loading, then success or error. The same toast updates in place; the loading state never times out.

```html preview title="Loading → success / error"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-toast-show="loading" data-ds-toast-id="export" data-ds-toast-title="Exporting 1,284 rows" data-ds-toast-resolve="success" data-ds-toast-resolve-title="Export ready" data-ds-toast-resolve-text="Report-2026-Q3.xlsx, 2.4 MB.">Export (succeeds)</button>
  <button type="button" class="btn" data-ds-toast-show="loading" data-ds-toast-id="sync" data-ds-toast-title="Syncing with the accounting system" data-ds-toast-resolve="error" data-ds-toast-resolve-title="Sync failed" data-ds-toast-resolve-text="The server did not answer in time. Try again.">Sync (fails)</button>
</div>
```

Stacking and positions. Click several times: up to 3 toasts are visible, older ones sit behind the newest. Hover or focus the stack to expand it (it also pauses the timers); on a touch screen tap it. Swipe a toast sideways on touch to dismiss it.

```html preview title="Stack and positions"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-toast-show="info" data-ds-toast-title="New comment" data-ds-toast-text="Mei Tanaka replied on PRJ-1024.">Add to the stack</button>
  <button type="button" class="btn" data-ds-toast-show="success" data-ds-toast-position="top-center" data-ds-toast-title="Top center" data-ds-toast-text="Used for page-level results.">Top center</button>
  <button type="button" class="btn" data-ds-toast-show="info" data-ds-toast-position="bottom-start" data-ds-toast-title="Bottom start">Bottom start</button>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Entering | A toast is added | Opacity 0 to 1 and a move from the edge of its region over 350ms |
| Rest | Visible and counting | Tonal fill with the tone icon, title, optional text and actions |
| Stacked | More than one toast | The newest is in front; the ones behind show 10px each, scaled 5% smaller; at most 3 are visible, the rest are hidden |
| Expanded | Hover or focus on the stack, tap on touch | Every toast at full size with an 8px gap; timers are paused |
| Paused | Pointer or focus inside, window blurred, tab hidden, swiping | The countdown stops and continues with the remaining time (at least 1.5 seconds) |
| Loading | `tone: "loading"` | A spinning ring, no timeout, `aria-busy="true"` |
| Success, error | `update()` or `promise` | The tone, icon, title and text change in place; success times out, error stays |
| Hover, pressed | On the action or the close button | State layer at 6% and 10%, scale 0.97 on press |
| Focus-visible | Keyboard focus | 2px `--ds-focus` ring on the toast and on its buttons |
| Dragging | Touch move on the dismiss axis | The toast follows the finger with no transition; the opposite way it resists |
| Leaving | Timeout, close, Escape, swipe | Opacity to 0 over 140ms with a move toward the edge (or the swipe direction) |

Swipe rules: the toast dismisses when the dragged distance plus 120ms of velocity passes 35% of its width (at most 100px). Otherwise it springs back. A fast flick leaves at the speed of the finger (between 140ms and 280ms).

## Anatomy

- `.ds-toast-region`: the fixed live region. `data-position` is one of `bottom-end` (default), `bottom-center`, `bottom-start`, `top-end`, `top-center`, `top-start`. On screens under 640px it is full width.
- `.ds-toast`: one toast, tones `is-info`, `is-success`, `is-warning`, `is-error`, `is-loading`.
- `.ds-toast__icon`, `.ds-toast__body`, `.ds-toast__title`, `.ds-toast__text`: content (the version 1 names `.ds-toast-body`, `.ds-toast-title`, `.ds-toast-text`, `.ds-toast-close` still work).
- `.ds-toast__actions` and `.ds-toast__action`: the action row and button.
- `.ds-toast__close`: the close button.

## Usage

- Keep the title under 50 characters and the text under 2 lines. Say what happened first, then the cause or the next step.
- Show a toast for the result of the person's own action. Do not show a toast for something that happened somewhere else; use the [notification center](./notification-center.md).
- Show an error toast only when the error also appears where the person is working (an [alert](./alert.md) or the field). A toast disappears; an error must not.
- Use one action at most, and only when it undoes or retries what just happened. If the action needs a decision, open a dialog.
- Stack up to 3. When an operation produces many results, show one toast ("12 files uploaded").
- Update a toast instead of adding a new one for the same operation: pass the same `id`.
- Do not put an essential fact only in a toast. Someone who looks away for 6 seconds misses it.

## Accessibility

- The region is `role="region"` with `aria-live="polite"`. Errors use `role="alert"` (announced at once); the other tones use `role="status"` (polite). Loading toasts are `aria-busy`.
- WCAG 2.2.1: the countdown pauses on hover, on focus and when the window loses focus; toasts with an action, loading toasts and errors do not time out.
- Keyboard: `Alt+T` moves focus to the newest toast; `Escape` dismisses the focused toast and returns focus to where it was.
- The close button is 28px with a 44px hit area on touch and has an accessible name. A toast is never the only way to complete a task.
- Contrast: text 4.5:1, icon 3:1 in both themes. Reduced motion: only opacity changes, the stack does not scale or travel, the spinner is static.

| Key | Action |
| --- | --- |
| Alt+T | Focus the newest toast |
| Tab, Shift+Tab | Move between the action and the close button, and to the next toast |
| Enter, Space | Activate the focused button |
| Escape | Dismiss the focused toast |

## Razor

Queue a toast before a redirect and render the region once in the layout.

```csharp
this.Toast(Tone.Success, "Draft saved");
this.Toast(Tone.Error, "Could not send invoice", "INV-2026-0418 has no recipient.");
return RedirectToAction(nameof(Index));
```

```cshtml
<partial name="_DsToast" />
```

The partial renders `<div class="ds-toast-region" data-ds-toast-region data-position="bottom-end">`; change `data-position` to move it.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-toast-show="tone"` | On click, shows a toast. Tones: `success`, `info`, `warning`, `error`, `loading` |
| `data-ds-toast-title`, `data-ds-toast-text` | Title and text |
| `data-ds-toast-action="Undo"` | Adds an action; the toast then stays until used. Listen for `ds:toast:action` |
| `data-ds-toast-id` | Shows the same toast again as an update instead of adding a duplicate |
| `data-ds-toast-position` | The region to use |
| `data-ds-toast-timeout="8000"` | Milliseconds; `0` keeps it open |
| `data-ds-toast-resolve="success\|error"` | With `loading`: switches after `data-ds-toast-resolve-after` (1800ms) to the `-resolve-title` and `-resolve-text` |
| `data-ds-toast`, `data-ds-toast-close`, `data-ds-toast-region` | Server-rendered toast, its close button and the region |

```js
const handle = DS.toast({ tone: "success", title: "3 invoices deleted", action: { label: "Undo", onClick: () => restore() } });
handle.update({ tone: "info", title: "Restored" });
handle.close();

DS.toast.promise(exportReport(), {
  loading: { title: "Exporting 1,284 rows" },
  success: (file) => ({ title: "Export ready", text: file.name }),
  error: (err) => ({ title: "Export failed", text: err.message }),
});

DS.toast.success("Draft saved");   // also error, info, warning, loading
DS.toast.dismiss();                // everything, or DS.toast.dismiss(id)
```

| Option | Default | Meaning |
| --- | --- | --- |
| `tone` | `"info"` | `success`, `info`, `warning`, `error`, `loading` |
| `title`, `text` | | Content, plain text |
| `timeout` | 6000 (8000 for long text) | Milliseconds; `0` or `Infinity` keeps it. Errors, loading and toasts with an action default to staying |
| `stack` | `true` | `false` replaces the toasts showing in that region |
| `id` | | Updates an existing toast with this id |
| `position` | `"bottom-end"` | A region position |
| `action` | | `{ label, onClick, href, keepOpen }` |
| `closeButton` | `true` | `false` hides the close button |

Events (bubble from the toast): `ds:toast:close` with `detail: { id }` and `ds:toast:action` with `detail: { id, trigger }`.

## Tokens

`--ds-z-tooltip`, `--ds-shadow-panel`, `--ds-radius-box`, `--ds-duration-settle`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-size-target`, `--ds-press-scale`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-focus`, and the tone colours.

## Native and daisyUI

The toast is not daisyUI's `.toast`. It is positioned and stacked by `toast.js` with `transform` and `opacity` only. Action buttons are small bordered buttons (`ds-toast__action`), not `btn`, so their contrast follows the tone.
