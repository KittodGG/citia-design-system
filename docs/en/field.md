---
title: Field
group: components
category: forms
order: 1
summary: The wrapper of every form control - label, hint, error, counter and help in one column, with the ids that tie them together.
source: TPS app.css L1696-1975 (.master-field)
---

A field is one control with everything a person needs to fill it in: a label above, an optional hint, an error that explains the fix, a character counter and a help button. Use it around every [input](./input.md), [textarea](./textarea.md), [select](./select.md) and [number input](./number-input.md). Group related fields with a [fieldset](./fieldset.md).

## Examples

### Label, hint and error

The label sits above the control with 8px between them; fields are 24px apart. The hint is for format and limits, never for what the label already says.

```html preview title="Hint and error"
<div class="ds-form" style="max-width:26rem">
  <div class="ds-field">
    <label for="fld-project">Project code</label>
    <input id="fld-project" class="input" value="PRJ-1024" aria-describedby="fld-project-hint fld-project-error">
    <p class="ds-hint" id="fld-project-hint">Three capital letters, a dash and four digits.</p>
    <p class="ds-field-error" id="fld-project-error" aria-live="polite"></p>
  </div>
  <div class="ds-field">
    <label for="fld-invoice">Invoice number</label>
    <input id="fld-invoice" class="input" value="INV-2026-04" aria-invalid="true" aria-describedby="fld-invoice-hint fld-invoice-error">
    <p class="ds-hint" id="fld-invoice-hint">Format INV-2026-0418.</p>
    <p class="ds-field-error" id="fld-invoice-error" aria-live="polite">Invoice number needs four digits at the end.</p>
  </div>
</div>
```

### Optional and required markers

Mark the minority. When most fields are required, add `ds-label-note` "optional" to the few that are not. When most are optional, add an asterisk (`ds-required`) to the required ones and say so above the form.

```html preview title="Marking the minority"
<div class="ds-form" style="max-width:26rem">
  <div class="ds-field">
    <label for="fld-name">Full name</label>
    <input id="fld-name" class="input" value="Ayu Lestari" required>
  </div>
  <div class="ds-field">
    <label for="fld-company">Company <span class="ds-label-note">optional</span></label>
    <input id="fld-company" class="input" autocomplete="organization">
  </div>
  <div class="ds-field">
    <label for="fld-ref">Reference <span class="ds-required" aria-hidden="true">*</span></label>
    <input id="fld-ref" class="input" required aria-required="true">
  </div>
</div>
```

### Counter and inline help

`ds-field__meta` puts the hint or error on the start and the counter on the end. The help button opens a longer explanation under the label; it works on touch and with the keyboard, unlike a hover tooltip.

```html preview title="Counter and help"
<div class="ds-form" style="max-width:26rem">
  <div class="ds-field">
    <div class="ds-field__label-row">
      <label for="fld-note">Note to the approver</label>
      <button type="button" class="ds-field__help" data-ds-field-help aria-expanded="false" aria-controls="fld-note-help" aria-label="More information">
        <svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-help-circle"></use></svg>
      </button>
    </div>
    <div class="ds-field__help-text" id="fld-note-help"><p>The approver sees this note next to the amount. It is not printed on the invoice.</p></div>
    <textarea id="fld-note" class="textarea" rows="3" maxlength="120" data-ds-counter aria-describedby="fld-note-hint">Payment moved to the second quarter budget.</textarea>
    <div class="ds-field__meta">
      <p class="ds-hint" id="fld-note-hint">Plain text, one or two sentences.</p>
      <span class="ds-counter">0 / 120</span>
    </div>
  </div>
</div>
```

### Horizontal layout

Use `is-horizontal` in settings pages where a column of labels reads faster than stacked fields. It collapses to the stacked layout at 640px.

```html preview title="Horizontal field"
<div class="ds-form">
  <div class="ds-field is-horizontal">
    <label for="fld-h-email">Billing email</label>
    <input id="fld-h-email" type="email" class="input" value="finance@example.com" aria-describedby="fld-h-email-hint">
    <p class="ds-hint" id="fld-h-email-hint">Invoices are sent to this address.</p>
  </div>
  <div class="ds-field is-horizontal">
    <label for="fld-h-lang">Language</label>
    <select id="fld-h-lang" class="select"><option>English</option><option>Bahasa Indonesia</option></select>
  </div>
</div>
```

## States

```html preview title="Field states"
<div class="ds-field-grid">
  <div class="ds-field"><label for="fs-rest">Rest</label><input id="fs-rest" class="input" placeholder="Placeholder"></div>
  <div class="ds-field"><label for="fs-filled">Filled</label><input id="fs-filled" class="input" value="Daniel Okafor"></div>
  <div class="ds-field"><label for="fs-dis">Disabled</label><input id="fs-dis" class="input" value="PRJ-1024" disabled></div>
  <div class="ds-field"><label for="fs-ro">Read-only <span class="ds-label-note">locked</span></label><input id="fs-ro" class="input" value="Jakarta office" readonly></div>
  <div class="ds-field"><label for="fs-inv">Invalid</label><input id="fs-inv" class="input" value="12" aria-invalid="true" aria-describedby="fs-inv-e"><p class="ds-field-error" id="fs-inv-e">Enter at least 3 characters.</p></div>
  <div class="ds-field"><label for="fs-ok">Valid</label><input id="fs-ok" class="input" value="PRJ-2048" data-state="success" aria-describedby="fs-ok-s"><p class="ds-field-success" id="fs-ok-s">Code is available.</p></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | Label 15px/600, control with 1px `--ds-control-border` (3:1) |
| Hover | Pointer over the control | Border one step darker |
| Focus | Keyboard or click in the control | 2px `--ds-focus` ring with 2px offset and a focus-coloured border |
| Filled | Control has a value | Text in `--color-base-content` |
| Placeholder | Empty control with `placeholder` | `--ds-subtle` text (at least 4.5:1) |
| Disabled | `disabled` | `--ds-opacity-disabled`, `not-allowed` cursor, `base-200` fill |
| Read-only | `readonly` | `base-200` fill, hairline border, full-contrast text, selectable |
| Invalid | `aria-invalid="true"`, `input-validation-error`, `:user-invalid` | Error border, error icon and message in `--ds-error-text` below the control |
| Success | `data-state="success"` | Success border; use only after an async check |
| Loading | `aria-busy="true"` on the wrapper | Spinner after 300ms, width unchanged |
| Help open | `aria-expanded="true"` on the help button | Tonal fill on the button, help text grows in 160ms |

## Anatomy

- `.ds-field`: vertical stack, 8px gap. Modifiers `is-horizontal`, `is-wide` (spans the grid).
- `label` or `.ds-field__label-row` with the label and `.ds-field__help`.
- `.ds-label-note` (optional or locked) and `.ds-required` (asterisk).
- `.ds-field__help-text`: the opened help, `data-state="open|closed"`.
- The control (see the other pages in this category).
- `.ds-hint`, `.ds-field-error` (icon drawn by CSS), `.ds-field-success`.
- `.ds-field__meta` with `.ds-counter` (`data-state="ok|warn|limit|over"`).
- `.ds-field-grid`: two columns, one column at 640px and below.

## Usage

- Put the label above the control. A placeholder never replaces a label.
- Write hints only when the format is not obvious, at most 60 characters. Units belong in the label: "Weight (kg)".
- Error text says what to do: "Enter at least 3 characters." Not "Invalid input".
- Keep 24px between fields and 8px inside one. Do not shrink the gap to fit more on screen.
- Mark the minority: optional when most fields are required, an asterisk when most are optional.
- Use the help button for text longer than one sentence. Keep one sentence in the hint.
- Do not disable a field to explain a rule; use read-only with a hint, or `aria-disabled` with the reason as text.

## Accessibility

- `label[for]` matches the control id; the control `aria-describedby` lists the hint id, then the error id.
- The error element is always in the DOM with `aria-live="polite"`, so a message added after blur is announced once.
- `required` on the control conveys the required state; the asterisk is `aria-hidden`.
- The help button has an accessible name (default "More information"), `aria-expanded` and `aria-controls`.
- The counter is hidden from assistive technology; a separate polite live region speaks the remaining count near the limit.
- Targets: the help button is 24px with a 44px hit area. Text contrast: label 15:1, hint 4.5:1 or more, error 4.5:1 or more in both themes.
- Motion: the error fades in with 5px of movement (150ms); under reduced motion only the fade remains.

| Key | Action |
| --- | --- |
| Tab | Moves between the label help button and the control |
| Enter, Space | On the help button: toggles the help text |
| Escape | On the help button: closes the help text |

## Razor

`<ds-field>` wraps ASP.NET Core `asp-for` and `asp-validation-for`: it renders the label, the control, the hint, the error and the counter with ids and `aria-describedby` wired.

```cshtml
<ds-field asp-for="Code" label="Project code" hint="Three capital letters, a dash and four digits." maxlength="8" counter />
<ds-field asp-for="Email" type="email" icon="mail" clearable hint="Invoices are sent here." />
<ds-field asp-for="Notes" type="textarea" rows="4" autogrow counter maxlength="500" />
<ds-field asp-for="Country" type="select" asp-items="Model.Countries" placeholder="Choose a country" />
<ds-field asp-for="Quantity" type="number" min="1" max="99" step="1" unit="pcs" />
<ds-field name="q" type="search" shortcut="/" recent="5" label="Search" />
```

| Attribute | Effect |
| --- | --- |
| `asp-for`, `asp-items` | Model binding, validation attributes, error from ModelState |
| `label`, `hint`, `help`, `placeholder` | Texts; the label defaults to the display name |
| `type` | text, email, tel, url, search, password, number, textarea, select |
| `icon`, `prefix`, `suffix`, `unit`, `clearable`, `loading`, `size` | Input parts (see [Input](./input.md)) |
| `success`, `success-text`, `error` | Success state, and an explicit error when there is no model |
| `counter`, `maxlength` | Character counter |
| `horizontal`, `wide` | Layout |
| `required`, `marker` | `optional` (default), `required` or `none` |

Child content replaces the generated control, so a combobox or a date picker can sit in the same field. Its ids are `{id}-hint` and `{id}-error`.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-field-help` | On the help button: toggles the panel named by `aria-controls` |
| `data-ds-counter` | See [Textarea](./textarea.md) |

Events: none. Help state is `aria-expanded` on the button and `data-state` on the panel.

## Tokens

`--ds-space-field-stack`, `--ds-space-field-group`, `--ds-type-label-*`, `--ds-type-footnote-*`, `--ds-subtle`, `--ds-error-text`, `--ds-warning-text`, `--color-success`, `--ds-control-border`, `--ds-focus`, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-duration-quick`, `--ds-ease-emphasized`.

## Native and daisyUI

Builds on `label`, `.input`, `.select` and `.textarea`. The DS gives all three one state set (hover, focus ring, invalid, success, disabled, read-only, autofill), a 44px minimum height and an icon on every error. daisyUI's inset depth shadow and 20rem maximum width are removed inside `.ds-field`.
