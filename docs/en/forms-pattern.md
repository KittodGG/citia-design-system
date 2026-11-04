---
title: Forms pattern
group: patterns
order: 2
summary: How a form is laid out, validated and saved: field layout, required and optional fields, validation timing, multi-step forms, save and cancel, and the unsaved-changes guard.
---

A form turns a task into fields. This page fixes the decisions that every form shares, so that two forms in one product behave the same. Field components are in [Field](./field.md), [Input](./input.md) and [Form](./form.md); error messages are covered in [Validation](./validation.md) and [Writing](./writing.md).

## Layout

- One column by default. Use `.ds-field-grid` (two columns) only for short, related fields such as first and last name, and let it collapse to one column under 640px.
- Labels sit above the field, always visible. A placeholder is an example, never the label.
- Group related fields in a `<fieldset>` with a `<legend>`. Put rarely used fields in `.ds-optional-group`, collapsed by default.
- Width follows the content: a postal code is narrow, a description is wide. Never stretch a 4-digit field to 640px.
- Help text goes below the label or field (`.ds-hint`), linked with `aria-describedby`.

```html preview title="Fields in one column with a hint"
<div class="ds-form" style="max-inline-size:28rem">
  <fieldset class="ds-fieldset">
    <legend>Billing contact</legend>
    <div class="ds-field">
      <label for="fp-name">Full name</label>
      <input id="fp-name" class="input" value="Daniel Okafor" autocomplete="name" required>
    </div>
    <div class="ds-field">
      <label for="fp-email">Email</label>
      <input id="fp-email" type="email" class="input" value="daniel.okafor@example.com" autocomplete="email" aria-describedby="fp-email-hint" required>
      <p id="fp-email-hint" class="ds-hint">Invoices are sent to this address.</p>
    </div>
    <div class="ds-field">
      <label for="fp-phone">Phone <small class="ds-label-note">optional</small></label>
      <input id="fp-phone" type="tel" class="input" autocomplete="tel">
    </div>
  </fieldset>
</div>
```

## Required and optional

Most fields in a good form are required, so mark the exception. Add the word "optional" to the label of optional fields and mark nothing on required ones. If a form is mostly optional, say so once in the intro ("All fields are optional") and mark the required fields with "required". Set the `required` attribute on required fields; do not rely on an asterisk, which a screen reader announces poorly.

## Validation timing

| Moment | Rule |
| --- | --- |
| While typing | Do not show errors before the first blur. Exception: password strength and character counters, which help while typing |
| On blur | Validate the field and show the message below it. Use `:user-invalid` so untouched fields stay quiet |
| After the first error | Re-validate on every input so the error clears the moment the value is fixed |
| On submit | Validate everything on the client, then on the server. Show an error summary at the top and move focus to it |
| Async checks | Start after 300ms of silence, show a spinner in the field and keep the width; confirm with success only when the check is useful (a free username) |

The server is the source of truth: every client rule is repeated on the server, and a server error is shown in the same place as a client error. See [Validation](./validation.md).

```html preview title="Invalid, valid and loading fields"
<div class="ds-form" style="max-inline-size:28rem">
  <div class="ds-field">
    <label for="fp-v1">Invoice number</label>
    <input id="fp-v1" class="input" value="INV-26-418" aria-invalid="true" aria-describedby="fp-v1-err">
    <p id="fp-v1-err" class="ds-field-error">Use the format INV-2026-0418 (INV, the year, a 4-digit number).</p>
  </div>
  <div class="ds-field">
    <label for="fp-v2">Invoice number</label>
    <input id="fp-v2" class="input" value="INV-2026-0418" data-state="success">
  </div>
</div>
```

### Error summary

After a failed submit, show `.ds-error-summary` as the first block of the form with `role="alert"` and `tabindex="-1"`, and focus it. The heading says what failed ("The invoice was not saved"), then the count ("Fix 2 fields below"), then one link per error that jumps to the field. Each link text is the same message as under the field.

## Save and cancel

- The footer (`.ds-form-actions`) holds Cancel on the start side and the actions on the end side. The primary button is the only filled button and is named for the result: "Create project", "Save changes", "Send invoice". Never "Submit" or "OK".
- A secondary action that keeps the user in the flow ("Save and add another") is a plain button next to it.
- On submit, disable the button against double posts with `data-ds-once`, keep its width and show a spinner; `data-ds-loading-label` sets the busy text ("Saving…").
- After a successful save, redirect (Post/Redirect/Get) and show a [Toast](./toast.md) that names the result ("Project saved"). On failure stay on the page, keep the typed values and show the summary.
- Cancel returns to the page the user came from through a local `returnUrl`.

```cshtml
<form method="post" data-ds-guard data-ds-once>
    <div class="ds-form-actions">
        <a class="btn" href="@Model.ReturnUrl" data-ds-guard-skip>Cancel</a>
        <div><button class="btn btn-primary" data-ds-loading-label="Saving…">Save changes</button></div>
    </div>
</form>
```

## Unsaved changes

Add `data-ds-guard` to a form that holds more than a minute of work. When the user changes a field and then tries to leave through a link, the browser back button or sign-out, the Leave dialog (`_DsLeaveDialog`) asks. The dialog offers "Stay on page" first and "Leave" second, because staying is the safe choice.

- Links that must not ask (Cancel, the submit itself) carry `data-ds-guard-skip`.
- Set `data-ds-guard-dirty` on the form to mark it dirty from script, for example after a rich-text edit.
- Do not guard search forms, filters or one-field settings.

## Multi-step forms

Use steps only when a form has more than about 8 fields in clearly different groups, or when a later step depends on an earlier one. Otherwise use one page with fieldsets.

- Show the [Stepper](./stepper.md) above the form with the step names, not numbers alone.
- Validate each step before moving on; Back never discards the typed values.
- Keep the primary button on the end side: "Next" on steps 1 to n-1, a named result ("Create account") on the last step.
- Add a review step for forms that cannot be undone, listing every answer with a link back to edit it.
- Save a draft on the server if completing takes longer than a few minutes, and say so ("Draft saved 14:32").

## Usage

- Do ask for the minimum; every field costs completion.
- Do use the right `type`, `inputmode` and `autocomplete` so mobile keyboards and autofill work.
- Do keep the typed values after a server error.
- Do not clear a form on error, disable the submit button before the first attempt, or validate on every keystroke before the first blur.
- Do not put two primary buttons in one footer.
- Do not use a toast for validation errors; they belong next to the fields.
