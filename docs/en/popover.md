---
title: Popover
group: components
category: overlays
order: 4
summary: A small non-modal panel anchored to its trigger, on the HTML Popover API, with light dismiss, flipping placement and an optional arrow.
source: TPS app.css .tps-popover (L3182)
---

A popover shows a few controls or a short explanation next to the element that opened it, without blocking the page: a
date shortcut, a share link, a quick edit of one value, help for a field. It sits on the top layer through the HTML
Popover API, so it is never clipped by a scrolling table or card, and it closes when the user presses outside or presses
Escape. Use a [Tooltip](./tooltip.md) for a one-line label that needs no interaction, a [Hover card](./hover-card.md) for
a preview of a linked item, a [Dropdown menu](./dropdown-menu.md) for a list of actions, and a [Dialog](./dialog.md)
when the task must be finished before going on.

## Examples

### With a form

Focus moves into the popover when it opens and back to the trigger when it closes.

```html preview title="Quick edit"
<button type="button" class="btn" popovertarget="pop-budget">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg>
  Edit budget
</button>

<div id="pop-budget" popover class="ds-popover" role="dialog" aria-labelledby="pop-budget-title" data-ds-side="bottom" data-ds-align="start">
  <div class="ds-popover__header">
    <div>
      <h2 id="pop-budget-title" class="ds-popover__title">Budget for PRJ-1024</h2>
      <p class="ds-popover__description">Spent so far: IDR 297.600.000</p>
    </div>
  </div>
  <div class="ds-popover__body">
    <label class="ds-field"><span class="ds-label">Budget (IDR)</span>
      <input class="input w-full" inputmode="decimal" value="480.000.000" data-ds-initial-focus></label>
  </div>
  <div class="ds-popover__footer">
    <button type="button" class="btn btn-sm" popovertarget="pop-budget" popovertargetaction="hide">Cancel</button>
    <button type="button" class="btn btn-sm btn-primary" popovertarget="pop-budget" popovertargetaction="hide">Save</button>
  </div>
</div>
```

### Placement and arrow

`data-ds-side` (`bottom`, `top`, `right`, `left`) and `data-ds-align` (`start`, `center`, `end`) set the preferred
position. When there is no room the popover flips to the opposite side. `.is-arrow` adds a pointer to the trigger.

```html preview title="Sides with an arrow"
<div class="ds-actions" style="justify-content: center; padding-block: 3rem">
  <button type="button" class="btn" popovertarget="pop-top">Top</button>
  <button type="button" class="btn" popovertarget="pop-right">Right</button>
  <button type="button" class="btn" popovertarget="pop-bottom">Bottom</button>
  <button type="button" class="btn" popovertarget="pop-left">Left</button>
</div>
<div id="pop-top" popover class="ds-popover is-arrow is-sm" data-ds-side="top" data-ds-align="center" role="dialog" aria-label="Payment terms">Invoices are due within 14 days of the issue date.</div>
<div id="pop-right" popover class="ds-popover is-arrow is-sm" data-ds-side="right" data-ds-align="center" role="dialog" aria-label="Exchange rate">Rates update every day at 09:00 WIB from Bank Indonesia.</div>
<div id="pop-bottom" popover class="ds-popover is-arrow is-sm" data-ds-side="bottom" data-ds-align="center" role="dialog" aria-label="Approvals">Two approvals are needed above IDR 50.000.000.</div>
<div id="pop-left" popover class="ds-popover is-arrow is-sm" data-ds-side="left" data-ds-align="center" role="dialog" aria-label="Retention">Deleted files stay in the bin for 30 days.</div>
```

### Sizes

| Class | Width | Use for |
| --- | --- | --- |
| `ds-popover is-sm` | 15rem | A sentence or two |
| `ds-popover` | 20rem | A small form, a list of up to 6 items |
| `ds-popover is-lg` | 28rem | Two columns, a mini calendar, a share panel |
| `ds-popover is-auto` | fits content | Swatches, toolbars |

```html preview title="Large popover with a list"
<button type="button" class="btn" popovertarget="pop-members" aria-label="Members of PRJ-1024">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-users"></use></svg>
  4 members
</button>
<div id="pop-members" popover class="ds-popover is-lg" role="dialog" aria-labelledby="pop-members-title" data-ds-align="start">
  <div class="ds-popover__header">
    <h2 id="pop-members-title" class="ds-popover__title">Members of PRJ-1024</h2>
    <button type="button" class="ds-popover__close" popovertarget="pop-members" popovertargetaction="hide" aria-label="Close">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
    </button>
  </div>
  <ul class="ds-popover__body" style="margin: 0; padding: 0; list-style: none">
    <li style="display: flex; justify-content: space-between; gap: 1rem"><span>Ayu Lestari</span><span class="ds-popover__description">Owner</span></li>
    <li style="display: flex; justify-content: space-between; gap: 1rem"><span>Daniel Okafor</span><span class="ds-popover__description">Editor</span></li>
    <li style="display: flex; justify-content: space-between; gap: 1rem"><span>Mei Tanaka</span><span class="ds-popover__description">Editor</span></li>
    <li style="display: flex; justify-content: space-between; gap: 1rem"><span>Sofia Marquez</span><span class="ds-popover__description">Viewer</span></li>
  </ul>
  <div class="ds-popover__footer"><a class="btn btn-sm btn-ghost" href="#">Manage access</a></div>
</div>
```

## States

```html preview title="Panel, with arrow, focused"
<div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: flex-start">
  <div class="ds-popover" style="padding: 1rem; width: 15rem" role="group" aria-label="Panel">
    <p class="ds-popover__title">Sync</p>
    <p class="ds-popover__description">Last synced 2 minutes ago.</p>
  </div>
  <div class="ds-popover" style="padding: 1rem; width: 15rem; outline: 2px solid var(--ds-focus); outline-offset: 2px" role="group" aria-label="Focused">
    <p class="ds-popover__title">Focused panel</p>
    <p class="ds-popover__description">Keyboard focus on the panel itself.</p>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Closed | default | `display: none`; trigger `aria-expanded="false"` |
| Opening | trigger click, `DS.popover.open()` | Placed next to the trigger, then opacity 0 → 1 and scale 0.96 → 1 from the trigger side (`--ds-origin`), 160ms emphasized |
| Open | `:popover-open` | `--ds-popover` surface, hairline, radius 12px, `--ds-shadow-popover`; trigger `aria-expanded="true"` |
| Flipped | not enough room on the preferred side | `data-side` changes; the origin and the arrow follow |
| Following | page or container scrolls | Re-placed every frame while open |
| Closing | outside press, Escape, trigger again, `popovertargetaction="hide"` | Back towards the trigger, 140ms, exit easing; focus returns to the trigger |
| Focus | `:focus-visible` on the panel | 2px `--ds-focus` ring |
| Reduced motion | media query | Opacity only |

## Anatomy

- `[popover].ds-popover`: the panel (`role="dialog"` when it contains controls). Modifiers `is-sm`, `is-lg`, `is-auto`, `is-arrow`.
- `.ds-popover__header` with `.ds-popover__title`, `.ds-popover__description`, `.ds-popover__close`.
- `.ds-popover__body` (`is-scroll` to cap the height at 24rem).
- `.ds-popover__footer`: actions on a hairline.
- The trigger: any button with `popovertarget`.

## Usage

- Keep a popover small: one question, one value or up to 6 items. More content belongs in a [Sheet](./sheet.md) or a [Dialog](./dialog.md).
- Open popovers on click or tap only. For hover previews use a [Hover card](./hover-card.md).
- Do not put the only way to finish a task in a popover; light dismiss can close it at any moment.
- Use the arrow when several triggers sit close together and it must be clear which one opened the panel.
- Do not open a popover from inside another popover; use a menu with a submenu or a dialog.

## Accessibility

- The trigger is a `<button>` with `popovertarget`; the browser exposes the expanded state and the relation. The script also sets `aria-expanded` and `aria-controls`.
- A popover with controls has `role="dialog"` and a name (`aria-labelledby` or `aria-label`). A popover with only text can omit the role.
- On open, focus goes to `[data-ds-initial-focus]` / `[autofocus]`, else to the panel itself; Tab continues into its controls. On close, focus returns to the trigger unless the user already moved it elsewhere.

| Key | Action |
| --- | --- |
| Enter / Space on the trigger | Open or close |
| Tab / Shift+Tab | Move through the controls inside |
| Escape | Close and return focus to the trigger |

## Razor

```cshtml
<button type="button" class="btn" popovertarget="budget">Edit budget</button>

<ds-popover id="budget" title="Budget for PRJ-1024" description="Spent so far: IDR 297.600.000" side="bottom" align="start" closable>
    <label class="ds-field"><span class="ds-label">Budget (IDR)</span>
        <input class="input w-full" asp-for="Budget" data-ds-initial-focus /></label>
</ds-popover>
```

| Attribute | Effect |
| --- | --- |
| `id` | Popover id for `popovertarget` |
| `title`, `description` | Header (adds `aria-labelledby`) |
| `label` | Accessible name when there is no title |
| `side`, `align` | Preferred placement |
| `size` | `sm`, `lg`, `auto` |
| `arrow` | Pointer to the trigger |
| `closable` | Close button in the header |

## JavaScript

| Attribute | Effect |
| --- | --- |
| `popovertarget="id"` | Opens the popover next to this trigger (the script places it before the first frame) |
| `popovertargetaction="hide"` | Closes it (Cancel, Done) |
| `data-ds-side`, `data-ds-align` | Preferred placement on the popover |
| `data-ds-gap="8"` | Distance from the trigger in px (default 6) |
| `data-ds-initial-focus` | Element focused on open |
| `[popover][data-ds-popover]` | Opts a custom panel into placement and motion |

```js
DS.popover.open("budget", document.querySelector("#edit-budget"), { side: "top" });
DS.popover.close("budget");
DS.popover.toggle("budget");
DS.popover.place(myPanel, anchorElementOrRect, { side: "bottom", align: "end" }); // placement only

document.addEventListener("ds:popover:close", (e) => console.log(e.target.id));
```

Events: `ds:popover:open`, `ds:popover:close` (bubble from the popover).

## Tokens

`--ds-popover`, `--color-base-300`, `--ds-shadow-popover`, `--ds-radius-xl`, `--ds-z-popover`, `--ds-duration-quick`,
`--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-type-card-title-*`, `--ds-type-callout-*`,
`--ds-type-footnote-size`, `--ds-focus`. Script variables: `--ds-origin`, `--ds-arrow-x`, `--ds-arrow-y`.

## Native and daisyUI

- HTML Popover API (`popover`, `popovertarget`, `:popover-open`): top layer, light dismiss and Escape are native. Without JavaScript the browser still opens and closes the popover, centred in the viewport.
- The DS uses `@starting-style` and `transition-behavior: allow-discrete` so enter and exit animate in CSS and stay interruptible.
- daisyUI `.dropdown` with `[popover]` still works; prefer `.ds-popover` for placement next to the trigger. `.ds-popover` without `[popover]` is a plain floating surface for custom layers.
