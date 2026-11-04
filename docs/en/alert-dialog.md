---
title: Alert dialog
group: components
category: overlays
order: 2
summary: A modal question before a consequential action, with the safe choice focused first and the consequence stated in one sentence.
source: TPS Views/Shared/_ConfirmDialog.cshtml, _LeaveDialog.cshtml
---

An alert dialog asks one question before something that is hard or impossible to undo: deleting, sending, leaving with
unsaved changes. It is a [Dialog](./dialog.md) with `role="alertdialog"`, a short title that names the object, one
sentence about the consequence, and two buttons. The safe action (Cancel, Stay) gets the focus, so pressing Enter by
reflex never destroys anything. Most apps need no markup per button: put `data-ds-confirm` on the trigger and the shared
dialog does the rest. For a reversible action, skip the question and offer Undo in a [Toast](./toast.md) instead.

## Examples

### Confirm from an attribute

The trigger keeps working without JavaScript (the form submits straight away); with JavaScript it asks first. After
"Delete" the form submits with the same button, so the server sees the same request.

```html preview title="Destructive and primary confirmations"
<div class="ds-actions is-start">
  <form method="post" action="/projects/1024/delete">
    <button type="submit" class="btn btn-ghost is-danger"
            data-ds-confirm="Delete project PRJ-1024?"
            data-ds-confirm-text="Its 38 tasks and 12 files are deleted with it. This cannot be undone."
            data-ds-confirm-label="Delete project">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>
      Delete project
    </button>
  </form>
  <button type="button" class="btn btn-primary"
          data-ds-confirm="Send INV-2026-0418 to Daniel Okafor?"
          data-ds-confirm-text="The client receives the PDF by email. Sent invoices can only be corrected with a credit note."
          data-ds-confirm-label="Send invoice"
          data-ds-confirm-tone="primary">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>
    Send invoice
  </button>
</div>
```

### Written markup with an icon

When the dialog needs more than a title and a sentence (a list of what is affected, a typed confirmation), write it as a
dialog with `role="alertdialog"`. The icon repeats the tone; the title still says everything.

```html preview title="Revoke access"
<button type="button" class="btn" data-ds-dialog-open="alert-revoke">Revoke access</button>

<dialog id="alert-revoke" class="modal" role="alertdialog" aria-labelledby="alert-revoke-title" aria-describedby="alert-revoke-desc">
  <div class="modal-box ds-dialog is-sm">
    <div class="ds-dialog__header">
      <div class="ds-dialog__heading">
        <span class="ds-dialog__icon is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert-triangle"></use></svg></span>
        <h2 id="alert-revoke-title" class="ds-dialog__title">Revoke access for Mei Tanaka?</h2>
        <p id="alert-revoke-desc" class="ds-dialog__description">She is signed out on all devices within a minute and loses access to 4 projects.</p>
      </div>
    </div>
    <div class="ds-dialog__footer">
      <button type="button" class="btn" data-ds-dialog-close="cancel">Cancel</button>
      <button type="button" class="btn btn-error" data-ds-dialog-close="revoke">Revoke access</button>
    </div>
  </div>
</dialog>
```

### Confirm with an async action

`DS.confirm({ action })` keeps the dialog open while the request runs: the button shows a spinner after 300ms, Escape
and Cancel are blocked, and a failure stays in the dialog as an announced error instead of closing it.

```html preview title="Archive with a server call"
<button type="button" class="btn" id="archive-demo">Archive workspace</button>
<script type="module">
  document.getElementById("archive-demo").addEventListener("click", async (event) => {
    let attempts = 0;
    const ok = await DS.confirm({
      title: "Archive the Jakarta office workspace?",
      text: "Members keep read access. You can restore it within 30 days.",
      label: "Archive",
      tone: "primary",
      action: () => new Promise((resolve, reject) => setTimeout(() => (++attempts === 1 ? reject(new Error("The server did not answer. Try again.")) : resolve()), 1200)),
    }, event.currentTarget);
    if (ok) DS.toast({ tone: "success", title: "Workspace archived" });
  });
</script>
```

The first attempt in this example fails on purpose, to show the error state; the second succeeds.

## States

```html preview title="Rest, error, busy"
<div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr)); align-items: start">
  <div class="ds-dialog" style="width: auto; max-width: none" role="group" aria-label="Rest">
    <h2 class="ds-dialog-title">Delete 3 invoices?</h2>
    <p class="ds-dialog-desc">Drafts INV-2026-0420 to 0422 are removed.</p>
    <div class="modal-action"><button type="button" class="btn">Cancel</button><button type="button" class="btn btn-error">Delete</button></div>
  </div>
  <div class="ds-dialog" style="width: auto; max-width: none" role="group" aria-label="Error">
    <h2 class="ds-dialog-title">Archive the workspace?</h2>
    <p class="ds-dialog-desc">Members keep read access.</p>
    <p class="ds-dialog__error" role="presentation">The server did not answer. Try again.</p>
    <div class="modal-action"><button type="button" class="btn">Cancel</button><button type="button" class="btn btn-primary">Archive</button></div>
  </div>
  <div class="ds-dialog" style="width: auto; max-width: none" aria-busy="true" role="group" aria-label="Busy">
    <h2 class="ds-dialog-title">Archive the workspace?</h2>
    <p class="ds-dialog-desc">Members keep read access.</p>
    <div class="modal-action"><button type="button" class="btn">Cancel</button><button type="button" class="btn btn-primary" aria-busy="true" aria-disabled="true"><span class="ds-spinner" aria-hidden="true"></span>Archive</button></div>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Open, destructive | `data-ds-confirm`, tone `danger` (default) | Red action (`btn-error`), Cancel focused |
| Open, primary | `data-ds-confirm-tone="primary"` | Teal action, Cancel still focused unless `data-ds-confirm-focus="accept"` |
| Busy | `action` running | `aria-busy="true"`; spinner on the action after 300ms; label and width unchanged; Escape, Cancel and the scrim do nothing |
| Error | `action` rejected | `.ds-dialog__error` with `role="alert"` above the actions in `--ds-error-text`; focus back on the action |
| Accepted | action button | Dialog closes along its entry path (140ms); the promise resolves `true`; a form trigger submits |
| Cancelled | Cancel, Escape | Promise resolves `false`; focus returns to the trigger |
| Reduced motion | media query | Opacity only |

## Anatomy

- `dialog#ds-confirm.modal[role=alertdialog]`: the shared dialog, from the `_DsConfirmDialog` partial or created by script.
- `[data-ds-confirm-title]`, `[data-ds-confirm-text]`: title and consequence.
- `[data-ds-confirm-cancel]`, `[data-ds-confirm-accept]`: the two actions.
- `.ds-dialog__error[data-ds-confirm-error]`: error line, added by script when missing.
- Optional `.ds-dialog__icon` with `is-danger`, `is-warning` or `is-primary` in written markup.
- `#ds-leave`: the unsaved-changes dialog (`_DsLeaveDialog`), same anatomy with Stay and Leave.

## Usage

- Ask only before actions that cannot be undone or that reach other people. Asking before every save trains people to click through.
- Name the object in the title as a question: "Delete project PRJ-1024?", not "Are you sure?".
- State the consequence in one sentence with numbers when you have them: "Its 38 tasks and 12 files are deleted with it."
- Use the same verb on the action as on the trigger: trigger "Delete project", action "Delete project". Never "Yes" and "No".
- Keep Cancel as the initial focus for destructive actions. Use `data-ds-confirm-focus="accept"` only for safe, frequent confirmations.
- Do not add a close button: the two actions and Escape are the only ways out.
- Do not nest an alert dialog inside another alert dialog.

## Accessibility

- `role="alertdialog"` makes screen readers announce the title and the description (`aria-describedby`) as soon as the dialog opens.
- Focus goes to Cancel (or Stay); it returns to the trigger after closing.
- The error line uses `role="alert"`, so it is read out when it appears.
- Colour is never the only signal: the action label states the effect.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Move between Cancel and the action |
| Enter / Space | Activate the focused button |
| Escape | Cancel (not while the action runs) |

## Razor

```cshtml
@* Once per layout, before </body>. *@
<partial name="_DsConfirmDialog" />
<partial name="_DsLeaveDialog" />

<form method="post" asp-page-handler="Delete" asp-route-id="@Model.Project.Id">
    <button type="submit" class="btn btn-ghost is-danger"
            data-ds-confirm="@($"Delete project {Model.Project.Code}?")"
            data-ds-confirm-text="Its tasks and files are deleted with it. This cannot be undone."
            data-ds-confirm-label="Delete project">Delete project</button>
</form>

@* Written alert dialog with the tag helper. *@
<ds-dialog id="revoke" alert size="sm" icon="alert-triangle" icon-tone="danger"
           title="Revoke access for Mei Tanaka?" description="She is signed out on all devices within a minute.">
    <ds-dialog-footer>
        <button type="button" class="btn" data-ds-dialog-close="cancel">Cancel</button>
        <button type="submit" form="revoke-form" class="btn btn-error">Revoke access</button>
    </ds-dialog-footer>
</ds-dialog>
```

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-confirm="Title"` | Asks before the click goes through (forms submit with the same submitter, links navigate) |
| `data-ds-confirm-text` | The consequence sentence |
| `data-ds-confirm-label` | Action label (default "Delete" / "Hapus") |
| `data-ds-confirm-tone` | `danger` (default) or `primary` |
| `data-ds-confirm-focus="accept"` | Focus the action instead of Cancel |

```js
const ok = await DS.confirm({
  title: "Remove Sofia Marquez from PRJ-1024?",
  text: "Her tasks stay assigned until you reassign them.",
  label: "Remove",
  tone: "danger",                 // or "primary"
  focus: "cancel",                // or "accept"
  action: () => api.removeMember(1024, "sofia"), // optional; reject to show an error and stay open
});
```

Events: `ds:confirmed` on a trigger that is neither in a form nor a link; `ds:dialog:open` and `ds:dialog:close` on the dialog.

## Tokens

`--ds-scrim`, `--ds-radius-2xl`, `--ds-shadow-overlay`, `--ds-error-text`, `--ds-warning-text`, `--color-error`,
`--color-warning`, `--color-primary`, `--ds-subtle`, `--ds-duration-base`, `--ds-duration-exit`, `--ds-ease-emphasized`,
`--ds-ease-exit`, `--ds-type-headline-*`, `--ds-type-footnote-size`.

## Native and daisyUI

- A native `<dialog>` with `showModal()` and daisyUI `.modal` / `.modal-box`; see [Dialog](./dialog.md) for what the DS changes.
- `window.confirm()` is the fallback only for the unsaved-changes guard when `#ds-leave` is missing; everything else uses the styled dialog.
- The action buttons are daisyUI `btn btn-error` and `btn btn-primary`; Cancel is a plain `btn`.
