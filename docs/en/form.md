---
title: Form
group: components
category: forms
order: 36
summary: Form layout with titled sections, a responsive field grid and a sticky action bar, plus unsaved-changes status, submit-once busy state, summaries and a read-only view mode.
source: TPS .entry-form, .form-footer (app.css L2144–2347)
---

A form here means the whole page or panel that collects and saves data: its sections, the grid the fields sit in, the actions at the end, and how it behaves before, during and after saving. Single fields are documented on [field](./field.md), [input](./input.md) and the other form pages; client and server messages on [validation](./validation.md). For a short form in a dialog, skip sections and use a plain `.ds-form`.

## Examples

### Sections with a title column

`.ds-form-layout` is a size container. When the form is at least 52rem wide, each `.ds-form-section` puts its title and description on the start and the fields on the end; narrower, the title sits above. `.ds-form-grid` has two columns from 36rem of form width; `.is-full` spans a row. Because these are container queries, the same form works in a page, a side sheet and a dialog.

```html preview title="Project settings"
<form class="ds-form-layout" action="#" onsubmit="return false" data-ds-validate>
  <section class="ds-form-section" aria-labelledby="fm-s1">
    <div class="ds-form-section__header">
      <h2 class="ds-form-section__title" id="fm-s1">Project</h2>
      <p class="ds-form-section__description">Shown to everyone with access to PRJ-1024.</p>
    </div>
    <div class="ds-form-section__body">
      <div class="ds-form-grid">
        <div class="ds-field">
          <label for="fm-name">Project name</label>
          <input id="fm-name" name="Name" class="input" value="Harbour office fit-out" required>
        </div>
        <div class="ds-field">
          <label for="fm-code">Project code</label>
          <input id="fm-code" name="Code" class="input" value="PRJ-1024" readonly>
        </div>
        <div class="ds-field is-full">
          <label for="fm-desc">Description <span class="ds-label-note">optional</span></label>
          <textarea id="fm-desc" name="Description" class="textarea" rows="3">Two floors, 640 m², handover planned for March 2027.</textarea>
        </div>
      </div>
    </div>
  </section>
  <section class="ds-form-section" aria-labelledby="fm-s2">
    <div class="ds-form-section__header">
      <h2 class="ds-form-section__title" id="fm-s2">Billing</h2>
      <p class="ds-form-section__description">Used on every invoice for this project.</p>
    </div>
    <div class="ds-form-section__body">
      <div class="ds-form-grid">
        <div class="ds-field">
          <label for="fm-client">Client contact</label>
          <input id="fm-client" name="Contact" class="input" value="Sofia Marquez" autocomplete="name">
        </div>
        <div class="ds-field">
          <label for="fm-email">Billing email</label>
          <input id="fm-email" name="Email" type="email" class="input" value="accounts@harbourworks.example" autocomplete="email">
        </div>
        <div class="ds-field">
          <label for="fm-rate">Day rate (USD)</label>
          <input id="fm-rate" name="Rate" type="number" class="input" value="840" min="0" step="10">
        </div>
        <div class="ds-field">
          <label for="fm-start">Start date</label>
          <div class="ds-date-picker" data-ds-date-picker><input id="fm-start" name="Start" type="date" class="input" value="2026-11-16"></div>
        </div>
      </div>
    </div>
  </section>
</form>
```

### Sticky action bar with unsaved changes

Add `data-ds-guard` to the form: the [leave guard](./native-elements.md) asks before navigating away, and `.ds-form-bar` reports "Unsaved changes" with a dot as soon as a value differs from the loaded one. `.is-dirty-only` keeps the bar out of sight until then and brings it up from the bottom edge. `data-ds-once` makes the form submit once: buttons turn `aria-disabled`, the submitter shows its `data-ds-loading-label`, and the form gets `aria-busy="true"`.

```html preview title="Edit client, bar appears after a change"
<form class="ds-form-layout" action="#" onsubmit="return false" data-ds-guard data-ds-once style="min-height:20rem">
  <section class="ds-form-section is-stacked">
    <div class="ds-form-section__header"><h2 class="ds-form-section__title">Client</h2></div>
    <div class="ds-form-section__body">
      <div class="ds-form-grid">
        <div class="ds-field"><label for="fb-name">Company</label><input id="fb-name" name="Company" class="input" value="Harbourworks Ltd"></div>
        <div class="ds-field"><label for="fb-contact">Contact</label><input id="fb-contact" name="Contact" class="input" value="Daniel Okafor"></div>
      </div>
    </div>
  </section>
  <div class="ds-form-bar is-dirty-only">
    <p class="ds-form-bar__status" data-ds-dirty-status aria-live="polite"></p>
    <div class="ds-form-bar__actions">
      <button type="reset" class="btn btn-ghost">Discard</button>
      <button type="submit" class="btn btn-primary" data-ds-loading-label="Saving…">Save changes</button>
    </div>
  </div>
</form>
```

### Read-only view mode

`data-ds-mode="view"` shows the same form as values: borders, placeholders, hints and pickers disappear, text stays selectable, and every control is read-only or disabled. A button with `data-ds-form-edit` switches to edit and focuses the first field; `data-ds-form-cancel` resets and returns to view. Submit buttons hide in view mode.

```html preview title="Contact, view then edit"
<form class="ds-form-layout" action="#" onsubmit="return false" data-ds-mode="view">
  <section class="ds-form-section is-stacked">
    <div class="ds-form-section__header" style="display:flex;justify-content:space-between;align-items:center">
      <h2 class="ds-form-section__title">Contact</h2>
      <button type="button" class="btn btn-sm" data-ds-form-edit>Edit</button>
    </div>
    <div class="ds-form-section__body">
      <div class="ds-form-grid">
        <div class="ds-field"><label for="fv-name">Name</label><input id="fv-name" name="Name" class="input" value="Ayu Lestari"></div>
        <div class="ds-field"><label for="fv-role">Role</label><select id="fv-role" name="Role" class="select"><option>Project manager</option><option>Site engineer</option></select></div>
        <div class="ds-field"><label for="fv-phone">Phone</label><input id="fv-phone" name="Phone" class="input" type="tel" value="+62 812 5550 1024"></div>
        <div class="ds-field"><label for="fv-since">Member since</label><div class="ds-date-picker" data-ds-date-picker><input id="fv-since" name="Since" type="date" class="input" value="2024-03-04"></div></div>
      </div>
    </div>
  </section>
  <div class="ds-form-actions" style="border:0;padding-inline:0;background:none">
    <span></span>
    <div>
      <button type="button" class="btn btn-ghost" data-ds-form-cancel>Cancel</button>
      <button type="submit" class="btn btn-primary">Save contact</button>
    </div>
  </div>
</form>
```

### Summaries

After a failed submit, an error summary at the top lists every problem as a link to its field (see [validation](./validation.md)). After a save that stays on the page, a success summary says what happened in one sentence.

```html preview title="Error and success"
<div style="display:grid;gap:1rem;max-width:40rem">
  <div class="ds-error-summary" role="alert" tabindex="-1" aria-labelledby="fs-err-title">
    <h2 id="fs-err-title">Fix the highlighted fields</h2>
    <p>2 fields need your attention.</p>
    <ul>
      <li><a href="#fm-name">Project name is required.</a></li>
      <li><a href="#fm-email">Enter an email address like name@example.com.</a></li>
    </ul>
  </div>
  <div class="ds-form-summary is-success" role="status">
    <h2>Changes saved</h2>
    <p>Invoice INV-2026-0418 will use the new billing email from today.</p>
  </div>
  <div class="ds-form-summary is-info" role="status">
    <h2>Read-only</h2>
    <p>This project is archived. Ask Mei Tanaka to reopen it before editing.</p>
  </div>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Pristine | Page loaded | No status text; `.is-dirty-only` bar hidden below the edge |
| Dirty | A value differs from the loaded snapshot (`data-ds-dirty` on the form) | Status "Unsaved changes" with a warning dot; dirty-only bar slides up with the spring (500ms) |
| Leaving while dirty | Link, Back, logout or tab close | Leave dialog from [guard](./native-elements.md), or the browser prompt |
| Invalid submit | `data-ds-validate` finds errors | Submit stops, summary appears and takes focus, inline errors on each field |
| Submitting | `data-ds-once` and a valid submit | `aria-busy="true"`, buttons `aria-disabled`, submitter shows its loading label, progress cursor |
| Back-forward cache | Page restored from history | Busy state cleared, buttons usable again |
| Saved (same page) | Your code after a successful save | `.ds-form-summary.is-success`; call `DS.guard.reset()` |
| View | `data-ds-mode="view"` | Values as text, no chrome, submit hidden, Edit visible |
| Edit | `data-ds-form-edit` clicked | Controls restored, first field focused |
| Disabled section | `fieldset disabled` | See [fieldset](./fieldset.md) |

## Anatomy

- `.ds-form-layout` — size container `ds-form`.
- `.ds-form-section` — `__header` (`__title`, `__description`) and `__body`; `.is-card` puts the body on a surface, `.is-stacked` keeps the title above.
- `.ds-form-grid` — field grid, `.is-3` for three columns, children `.is-full` span.
- `.ds-form-bar` — `__status` (`[data-ds-dirty-status]`) and `__actions`; `.is-dirty-only`, `.is-floating`.
- `.ds-form-summary` — `.is-success`, `.is-info`; `.ds-error-summary` for errors.
- `.ds-form-actions` — the static footer from [field](./field.md), for short forms.

## Usage

- Group 3 to 8 fields per section and give every section a title of at most 4 words; put the reason for the section in the description.
- Use one primary button: Save, named after the object ("Save contact"). Cancel or Discard is a ghost button on the start side.
- Use the sticky bar on forms taller than one screen; short forms end with `.ds-form-actions`.
- Keep the button enabled while fields are invalid; show the errors on submit. A disabled Save explains nothing.
- After saving on the same page, reset the guard (`DS.guard.reset()`) and show a success summary; after a redirect, use a [toast](./toast.md).
- Use view mode for records people mostly read; do not use it to hide fields people are not allowed to edit (render text instead).

## Accessibility

- Sections are `section` elements labelled by their heading; keep heading levels in order (h2 under the page h1).
- The status line is a polite live region; it speaks "Unsaved changes" once, not on every keystroke.
- The sticky bar never covers the focused field: fields keep a `scroll-margin` and the bar is at most one row on desktop.
- In view mode text stays selectable and focusable (read-only), so screen readers read values with their labels.
- Busy state keeps button width and label readable; the progress cursor is a hint, the loading label is the message.

| Key | Action |
| --- | --- |
| Enter in a text field | Submit the form (native) |
| Tab | Through fields, then the action bar |
| Escape in the leave dialog | Stay on the page |

## Razor

```cshtml
<form method="post" class="ds-form-layout" data-ds-validate data-ds-guard data-ds-once>
    <ds-error-summary />
    <ds-form-section title="Billing" description="Used on every invoice for this project." grid>
        <ds-field asp-for="BillingEmail" type="email" />
        <ds-field asp-for="DayRate" type="number" unit="USD" />
    </ds-form-section>
    <ds-form-bar dirty-only>
        <a class="btn btn-ghost" asp-page="Index" data-ds-guard-skip>Cancel</a>
        <button class="btn btn-primary" data-ds-loading-label="Saving…">Save project</button>
    </ds-form-bar>
</form>
```

| Tag helper | Output |
| --- | --- |
| `ds-form-section` | `section.ds-form-section` with header and body; `title`, `description`, `card`, `stacked`, `grid`, `level` |
| `ds-form-bar` | `.ds-form-bar` with the status line and the child actions; `dirty-only`, `floating`, `dirty-text` |
| `ds-error-summary` | Error summary from model state (see [validation](./validation.md)) |

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-guard` | Ask before leaving with unsaved changes ([guard](./native-elements.md)); also drives `data-ds-dirty` and the status line |
| `data-ds-dirty-status` | Element that shows "Unsaved changes" (`data-ds-dirty-text` overrides the text) |
| `data-ds-once` | Submit once, busy state, `data-ds-loading-label` on the submitter |
| `data-ds-validate` | Client validation and summary ([validation](./validation.md)) |
| `data-ds-mode="view|edit"` | Read-only view or edit |
| `data-ds-form-edit` / `data-ds-form-cancel` | Switch to edit / reset and return to view |
| `data-ds-form-view-only`, `data-ds-form-edit-only`, `data-ds-form-keep` | Show only in view / only in edit / keep a submit visible in view |

Events: `ds:form:dirty` (`detail.dirty`), `ds:form:mode` (`detail.mode`). API: `DS.formMode(form, "edit")`, `DS.guard.reset()`, `DS.guard.allow()`.

## Tokens

`--ds-space-8`, `--ds-space-field-group`, `--ds-space-panel`, `--ds-space-card-x`, `--ds-space-card-y`, `--color-base-300`, `--ds-radius-card`, `--ds-radius-box`, `--ds-shadow-xs`, `--ds-shadow-panel`, `--ds-z-sticky`, `--color-warning`, `--ds-error-soft`, `--ds-success-soft`, `--ds-info-soft`, `--ds-duration-spring`, `--ds-ease-spring`, `--ds-duration-exit`, `--ds-ease-exit`, `--ds-type-section-*`, `--ds-type-callout-*`, `--ds-type-footnote-*`.

## Native and daisyUI

A plain `form` with native submission, `reset`, constraint validation and `fieldset disabled`. Layout uses CSS grid and container queries; daisyUI has no form layout. Buttons are daisyUI `btn`; fields are the daisyUI controls refined on the field pages.
