---
title: Dialog
group: components
category: overlays
order: 1
summary: A modal window for one focused task, such as a short form or a decision, on a native dialog element with focus trapping and a calm scale-in.
source: TPS app.css L555–561, L3103–3106, L3347–3350
---

A dialog interrupts the page for one task the user must finish or cancel before going on: a short form, a choice, a
preview. It is built on the native `<dialog>` element opened with `showModal()`, so the browser handles the top layer,
the focus trap and Escape; the design system adds the box, the parts, the motion and the behaviours around it. Use an
[Alert dialog](./alert-dialog.md) to confirm a consequential action, a [Sheet](./sheet.md) for longer side tasks
(filters, details) that keep the page in view, and a [Popover](./popover.md) for small non-blocking content next to its
trigger.

## Examples

### Form dialog

The body scrolls, the header and the footer stay. The first field gets the focus when the dialog opens.

```html preview title="Invite a teammate"
<button type="button" class="btn btn-primary" data-ds-dialog-open="dlg-invite">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user-plus"></use></svg>
  Invite teammate
</button>

<dialog id="dlg-invite" class="modal" aria-labelledby="dlg-invite-title" aria-describedby="dlg-invite-desc">
  <form class="modal-box ds-dialog is-md" method="post" action="/team/invite">
    <div class="ds-dialog__header">
      <div class="ds-dialog__heading">
        <h2 id="dlg-invite-title" class="ds-dialog__title">Invite a teammate</h2>
        <p id="dlg-invite-desc" class="ds-dialog__description">They get an email with a link that expires in 7 days.</p>
      </div>
      <button type="button" class="ds-dialog__close" data-ds-dialog-close aria-label="Close">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
      </button>
    </div>
    <div class="ds-dialog__body">
      <div style="display: grid; gap: 1rem">
        <label class="ds-field">
          <span class="ds-label">Email address</span>
          <input class="input w-full" type="email" name="email" placeholder="name@company.com" required>
        </label>
        <label class="ds-field">
          <span class="ds-label">Role</span>
          <select class="select w-full" name="role">
            <option>Viewer</option>
            <option selected>Editor</option>
            <option>Admin</option>
          </select>
        </label>
      </div>
    </div>
    <div class="ds-dialog__footer">
      <button type="button" class="btn" data-ds-dialog-close>Cancel</button>
      <button type="submit" class="btn btn-primary">Send invite</button>
    </div>
  </form>
</dialog>
```

### Sizes

| Class | Width | Use for |
| --- | --- | --- |
| `ds-dialog is-sm` | 26rem | Alert dialogs, one question |
| `ds-dialog` | 34rem | One or two fields |
| `ds-dialog is-md` | 42rem | Short forms |
| `ds-dialog is-lg` | 54rem | Long content, tables, previews |
| `is-full-mobile` (with any size) | full screen below 640px | Forms with many fields on phones |

```html preview title="Small, large and full screen on phones"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-dialog-open="dlg-sm">Small</button>
  <button type="button" class="btn" data-ds-dialog-open="dlg-lg">Large with long content</button>
  <button type="button" class="btn" data-ds-dialog-open="dlg-full">Full screen on phones</button>
</div>

<dialog id="dlg-sm" class="modal" aria-labelledby="dlg-sm-title" data-ds-dismissible>
  <div class="modal-box ds-dialog is-sm">
    <h2 id="dlg-sm-title" class="ds-dialog-title">Rename project</h2>
    <p class="ds-dialog-desc">PRJ-1024 keeps its code; only the name changes.</p>
    <div class="ds-dialog-body">
      <input class="input w-full" value="Warehouse relocation" aria-label="Project name">
    </div>
    <div class="modal-action">
      <button type="button" class="btn" data-ds-dialog-close>Cancel</button>
      <button type="button" class="btn btn-primary" data-ds-dialog-close="save">Rename</button>
    </div>
  </div>
</dialog>

<dialog id="dlg-lg" class="modal" aria-labelledby="dlg-lg-title" data-ds-dismissible>
  <div class="modal-box ds-dialog is-lg">
    <div class="ds-dialog__header">
      <div class="ds-dialog__heading">
        <h2 id="dlg-lg-title" class="ds-dialog__title">Terms of service, version 4</h2>
        <p class="ds-dialog__description">Effective 1 March 2026. Scroll to read all 6 sections.</p>
      </div>
      <button type="button" class="ds-dialog__close" data-ds-dialog-close aria-label="Close">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
      </button>
    </div>
    <div class="ds-dialog__body">
      <h3>1. Accounts</h3>
      <p>Each person uses their own account. Shared logins are not allowed because every change is recorded under the name of the person who made it.</p>
      <h3>2. Data you add</h3>
      <p>You own the projects, invoices and files you upload. We process them only to run the service and keep backups for 30 days.</p>
      <h3>3. Availability</h3>
      <p>We aim for 99.9% monthly availability. Planned maintenance is announced 48 hours ahead and happens between 01:00 and 04:00 WIB.</p>
      <h3>4. Billing</h3>
      <p>Invoices such as INV-2026-0418 are issued on the first working day of the month and are due within 14 days.</p>
      <h3>5. Ending the agreement</h3>
      <p>You can export all data as CSV or Excel at any time. After cancellation the workspace stays readable for 30 days.</p>
      <h3>6. Changes</h3>
      <p>We announce changes to these terms 30 days before they apply, by email and in the notification centre.</p>
    </div>
    <div class="ds-dialog__footer">
      <span class="ds-dialog__aside">Last updated 12 February 2026</span>
      <button type="button" class="btn" data-ds-dialog-close>Not now</button>
      <button type="button" class="btn btn-primary" data-ds-dialog-close="accept">Accept terms</button>
    </div>
  </div>
</dialog>

<dialog id="dlg-full" class="modal" aria-labelledby="dlg-full-title">
  <div class="modal-box ds-dialog is-md is-full-mobile">
    <div class="ds-dialog__header">
      <div class="ds-dialog__heading">
        <h2 id="dlg-full-title" class="ds-dialog__title">New expense</h2>
      </div>
      <button type="button" class="ds-dialog__close" data-ds-dialog-close aria-label="Close">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
      </button>
    </div>
    <div class="ds-dialog__body">
      <div style="display: grid; gap: 1rem">
        <label class="ds-field"><span class="ds-label">Description</span><input class="input w-full" value="Site visit, Surabaya"></label>
        <label class="ds-field"><span class="ds-label">Amount (IDR)</span><input class="input w-full" inputmode="decimal" value="1.250.000"></label>
        <label class="ds-field"><span class="ds-label">Project</span><input class="input w-full" value="PRJ-1024"></label>
      </div>
    </div>
    <div class="ds-dialog__footer">
      <button type="button" class="btn" data-ds-dialog-close>Cancel</button>
      <button type="button" class="btn btn-primary" data-ds-dialog-close="save">Save expense</button>
    </div>
  </div>
</dialog>
```

### Native markup without daisyUI

The `<dialog>` itself can be the box. The scrim is the native `::backdrop`.

```html preview title="Native dialog element"
<button type="button" class="btn" data-ds-dialog-open="dlg-native">Show shortcuts</button>

<dialog id="dlg-native" class="ds-dialog is-sm" aria-labelledby="dlg-native-title" data-ds-dismissible>
  <div class="ds-dialog__header">
    <div class="ds-dialog__heading">
      <h2 id="dlg-native-title" class="ds-dialog__title">Keyboard shortcuts</h2>
    </div>
    <button type="button" class="ds-dialog__close" data-ds-dialog-close aria-label="Close">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
    </button>
  </div>
  <div class="ds-dialog__body">
    <ul style="display: grid; gap: 0.75rem; margin: 0; padding: 0; list-style: none">
      <li style="display: flex; justify-content: space-between; gap: 1rem"><span>Search</span><span><kbd class="ds-kbd">Ctrl</kbd> <kbd class="ds-kbd">K</kbd></span></li>
      <li style="display: flex; justify-content: space-between; gap: 1rem"><span>New invoice</span><kbd class="ds-kbd">N</kbd></li>
      <li style="display: flex; justify-content: space-between; gap: 1rem"><span>Save</span><span><kbd class="ds-kbd">Ctrl</kbd> <kbd class="ds-kbd">S</kbd></span></li>
    </ul>
  </div>
</dialog>
```

### Nested dialog

A dialog may open a second one for a sub-task (for example "create a new client" from inside an invoice form). The second
scrim is lighter and the first box recedes to 98%; Escape closes the top dialog only. Keep it to two levels.

```html preview title="Dialog opened from a dialog"
<button type="button" class="btn" data-ds-dialog-open="dlg-invoice">New invoice</button>

<dialog id="dlg-invoice" class="modal" aria-labelledby="dlg-invoice-title">
  <div class="modal-box ds-dialog is-md">
    <div class="ds-dialog__header">
      <div class="ds-dialog__heading">
        <h2 id="dlg-invoice-title" class="ds-dialog__title">New invoice</h2>
        <p class="ds-dialog__description">INV-2026-0419 · draft</p>
      </div>
      <button type="button" class="ds-dialog__close" data-ds-dialog-close aria-label="Close">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
      </button>
    </div>
    <div class="ds-dialog__body">
      <label class="ds-field">
        <span class="ds-label">Client</span>
        <span style="display: flex; gap: 0.5rem">
          <select class="select w-full"><option>PT Sinar Mandiri</option><option>Okafor Logistics</option></select>
          <button type="button" class="btn" data-ds-dialog-open="dlg-client">New client</button>
        </span>
      </label>
    </div>
    <div class="ds-dialog__footer">
      <button type="button" class="btn" data-ds-dialog-close>Cancel</button>
      <button type="button" class="btn btn-primary" data-ds-dialog-close="save">Create draft</button>
    </div>
  </div>
</dialog>

<dialog id="dlg-client" class="modal" aria-labelledby="dlg-client-title">
  <div class="modal-box ds-dialog is-sm">
    <div class="ds-dialog__header">
      <div class="ds-dialog__heading">
        <h2 id="dlg-client-title" class="ds-dialog__title">New client</h2>
      </div>
      <button type="button" class="ds-dialog__close" data-ds-dialog-close aria-label="Close">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
      </button>
    </div>
    <div class="ds-dialog__body">
      <label class="ds-field"><span class="ds-label">Company name</span><input class="input w-full" placeholder="e.g. Tanaka Studio"></label>
    </div>
    <div class="ds-dialog__footer">
      <button type="button" class="btn" data-ds-dialog-close>Cancel</button>
      <button type="button" class="btn btn-primary" data-ds-dialog-close="save">Add client</button>
    </div>
  </div>
</dialog>
```

## States

Frozen states, shown without the scrim. The scroll-edge hairline appears only while content is hidden under the header
or the footer.

```html preview title="Rest, scrolled, busy"
<div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr)); align-items: start">
  <div class="ds-dialog" style="width: auto; max-width: none" role="group" aria-label="Rest">
    <h2 class="ds-dialog-title">Archive PRJ-1024?</h2>
    <p class="ds-dialog-desc">Archived projects stay searchable.</p>
    <div class="modal-action"><button type="button" class="btn">Cancel</button><button type="button" class="btn btn-primary">Archive</button></div>
  </div>
  <div class="ds-dialog" style="width: auto; max-width: none; height: 15rem" role="group" aria-label="Scrolled">
    <div class="ds-dialog__header"><div class="ds-dialog__heading"><h2 class="ds-dialog__title">Activity</h2></div></div>
    <div class="ds-dialog__body" data-ds-scrolled data-ds-more>
      <p>Mei Tanaka approved INV-2026-0418.</p><p>Daniel Okafor added 3 files.</p><p>Sofia Marquez changed the due date.</p>
    </div>
    <div class="ds-dialog__footer"><button type="button" class="btn">Close</button></div>
  </div>
  <div class="ds-dialog" style="width: auto; max-width: none" aria-busy="true" role="group" aria-label="Busy">
    <div class="ds-dialog__header"><div class="ds-dialog__heading"><h2 class="ds-dialog__title">Send invite</h2></div>
      <button type="button" class="ds-dialog__close" disabled aria-label="Close"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></div>
    <div class="ds-dialog__body"><input class="input w-full" value="ayu.lestari@company.com" aria-label="Email"></div>
    <div class="ds-dialog__footer"><button type="button" class="btn">Cancel</button><button type="button" class="btn btn-primary" aria-busy="true" aria-disabled="true"><span class="ds-spinner" aria-hidden="true"></span>Sending</button></div>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Closed | default | Not rendered (`display: none`), not in the accessibility tree |
| Opening | `showModal()` | Scrim fades in; box goes from opacity 0 and scale 0.97 to 1 in 180ms, emphasized easing, from the centre |
| Open | `[open]` | Box on `--color-base-100`, 1px hairline, `--ds-shadow-overlay`, radius 16px; page behind is inert |
| Closing | `close()`, Escape, Close, scrim press when dismissible | Same path back, 140ms, exit easing |
| Body scrolled | `.ds-dialog__body[data-ds-scrolled]` | Hairline under the header |
| More below | `.ds-dialog__body[data-ds-more]` | Hairline above the footer |
| Nested | `[data-ds-nested]` on the upper dialog | Half-strength scrim; the lower box (`[data-ds-covered]`) recedes to scale 0.98 |
| Busy | `aria-busy="true"` on the dialog | Body at 70% opacity and not interactive, Close disabled, Escape and scrim blocked; spinner on the submit button after 300ms |
| Close button hover / pressed | `:hover`, `:active` | State layer 6% / 10%, pressed scale 0.97 |
| Close button focus | `:focus-visible` | 2px `--ds-focus` ring, 2px offset |
| Reduced motion | `prefers-reduced-motion: reduce` | No scale; opacity cross-fade only |
| Full screen | `.is-full-mobile` below 640px | Box fills the viewport, no radius or border |

## Anatomy

- `dialog.modal` (daisyUI) or `dialog.ds-dialog` (native): the layer, scrim and focus trap.
- `.modal-box.ds-dialog`: the box. Sizes `is-sm`, `is-md`, `is-lg`; `is-full-mobile`; `is-raised` for a dialog over a form.
- `.ds-dialog__header` with `.ds-dialog__heading` (`.ds-dialog__title`, `.ds-dialog__description`) and `.ds-dialog__close`.
- `.ds-dialog__body`: scrolls; header and footer stay in place.
- `.ds-dialog__footer`: actions, primary right-most; `.ds-dialog__aside` for a note on the start side.
- Version 1 parts keep working: `.ds-dialog-head`, `.ds-dialog-title`, `.ds-dialog-desc`, `.ds-dialog-body`, `.ds-dialog-foot`, `.ds-dialog-close`, `.modal-action`.

## Usage

- Use a dialog only for a task that must be finished or cancelled before the user goes on. Show information that needs no decision in a [Toast](./toast.md) or an [Alert](./alert.md).
- Keep the title to one line that names the task with a verb: "Invite a teammate", not "Invitation".
- Put one primary action in the footer, right-most, with a verb that matches the title ("Send invite"). Cancel sits to its left; on phones the actions stack with the primary on top.
- Keep forms in a dialog to 5 fields or fewer; longer forms belong on a page or in a [Sheet](./sheet.md).
- Add `data-ds-dismissible` only when closing loses nothing (previews, read-only content). A form dialog closes with Cancel, Close or Escape, never with a stray click on the scrim.
- Nest at most one dialog. Do not open a dialog from an alert dialog.
- Do not open a dialog on page load unless the page returns from a POST with errors in that dialog (`data-ds-open-on-load`).

## Accessibility

- The `<dialog>` has `aria-labelledby` pointing at the title and, when there is one, `aria-describedby` pointing at the description.
- `showModal()` makes the rest of the page inert, so focus and the virtual cursor stay inside.
- Initial focus: `[data-ds-initial-focus]` or `[autofocus]`, else the first field in the body, else the Close button. Focus returns to the element that opened the dialog, without scrolling the page.
- A long body without focusable content gets `tabindex="0"` so it can be scrolled with the keyboard.
- The close button has an accessible name ("Close") and a 44px target on touch screens.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Move between the controls inside the dialog (focus stays inside) |
| Escape | Close the top dialog (not while busy) |
| Enter | Submit the form when focus is in a field |
| Space / Enter on a button | Activate it |

Motion: 180ms in, 140ms out, scale 0.97 to 1 only; with reduced motion only opacity changes. Contrast: title and body use
`--color-base-content`, description `--ds-subtle` (at least 4.5:1 on `--color-base-100` in both themes).

## Razor

```cshtml
<button type="button" class="btn btn-primary" data-ds-dialog-open="invite">Invite teammate</button>

<ds-dialog id="invite" title="Invite a teammate" description="They get an email with a link that expires in 7 days." size="md">
    <form id="invite-form" method="post" asp-page-handler="Invite">
        <label class="ds-field"><span class="ds-label">Email address</span>
            <input class="input w-full" asp-for="Invite.Email" /></label>
    </form>
    <ds-dialog-footer>
        <button type="button" class="btn" data-ds-dialog-close>Cancel</button>
        <button type="submit" form="invite-form" class="btn btn-primary">Send invite</button>
    </ds-dialog-footer>
</ds-dialog>
```

| Attribute | Effect |
| --- | --- |
| `id` | Dialog id, also used for `-title` and `-description` ids |
| `title`, `description` | Header text (encoded) |
| `size` | `sm`, `md`, `lg` (default 34rem) |
| `full-mobile` | Full screen below 640px |
| `dismissible` | Scrim press closes |
| `alert` | `role="alertdialog"`, no Close button |
| `closable="false"` | Hide the Close button |
| `icon`, `icon-tone` | Leading icon (`danger`, `warning`, `primary`) |
| `open-on-load` | Open when the page loads (after a POST with validation errors) |

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-dialog-open="id"` | Opens the dialog with that id; the element becomes the focus return target |
| `data-ds-dialog-close="value"` | Closes the nearest dialog; the value becomes `dialog.returnValue` |
| `data-ds-initial-focus`, `autofocus` | Element focused on open |
| `data-ds-dismissible` | A press that starts and ends on the scrim closes the dialog |
| `data-ds-open-on-load` | Opens once when the page loads |
| `form[data-ds-busy="false"]` | Submitting this form does not mark the dialog busy |

```js
const dialog = DS.dialog.open("invite", document.querySelector("#invite-button"));
DS.dialog.busy(dialog, true, dialog.querySelector("[type=submit]")); // while a fetch runs
await saveInvite();
DS.dialog.busy(dialog, false);
DS.dialog.close(dialog, "sent");

document.addEventListener("ds:dialog:close", (event) => {
  if (event.detail.value === "sent") DS.toast({ tone: "success", title: "Invite sent" });
});
```

Events: `ds:dialog:open` and `ds:dialog:close` (`detail.value` is the return value), both bubbling from the `<dialog>`.
Submitting a regular form inside an open dialog sets `aria-busy="true"` until the next page loads.

## Tokens

`--ds-scrim`, `--ds-size-dialog-sm`, `--ds-size-dialog-lg`, `--ds-radius-2xl`, `--ds-shadow-overlay`, `--color-base-100`,
`--color-base-300`, `--ds-subtle`, `--ds-focus`, `--ds-duration-base`, `--ds-duration-exit`, `--ds-ease-emphasized`,
`--ds-ease-exit`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-press-scale`,
`--ds-type-headline-*`, `--ds-type-callout-*`, `--ds-space-*`, `--ds-size-target`, `--ds-size-target-compact`.

## Native and daisyUI

- Built on `<dialog>` + `showModal()`. Without JavaScript, a `<form method="dialog">` button still closes it, and the browser still traps focus and handles Escape.
- daisyUI `.modal` / `.modal-box` keep working: the DS replaces the daisyUI scrim colour with `--ds-scrim`, the 300ms transitions with the motion tokens, the 32rem box with the DS sizes, and adds the hairline, radius and shadow.
- daisyUI's `.modal-backdrop` form and `.modal-open` / `:target` variants also get the DS motion.
- `.modal-action` stacks full width below 640px.
