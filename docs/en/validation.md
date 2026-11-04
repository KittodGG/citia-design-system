---
title: Validation
group: components
category: forms
order: 37
summary: Inline messages on blur, live re-checks after the first error, an error summary that links to fields, and ASP.NET Core validation output styled and wired the same way.
source: TPS validation rules (forms), DESIGN.md "Teks dan petunjuk"
---

Validation tells people what to fix, where, and how, at the moment they can act on it. The design system shows the message under the field with an icon, links it to the field with `aria-describedby`, marks the field `aria-invalid`, and on submit lists every problem in a summary at the top with links that move focus to the field. Messages come from the HTML constraints (`required`, `type`, `min`, `pattern`), from ASP.NET Core's `data-val-*` attributes, or from your server, and all three look the same. The field anatomy is on [field](./field.md); the form-level behaviour on [form](./form.md).

## Examples

### Validate on blur, re-check while typing

Add `data-ds-validate` to the form. A field is checked when the person leaves it after typing; once it shows an error, every keystroke re-checks it and the message disappears as soon as the value is valid. Tabbing through empty fields shows nothing. Submit checks everything.

```html preview title="New contact"
<form class="ds-form" action="#" data-ds-validate onsubmit="return false" style="max-width:28rem">
  <div class="ds-field">
    <label for="vl-name">Full name</label>
    <input id="vl-name" name="Name" class="input" required autocomplete="name" aria-describedby="vl-name-error">
    <p class="ds-field-error" id="vl-name-error"></p>
  </div>
  <div class="ds-field">
    <label for="vl-email">Work email</label>
    <input id="vl-email" name="Email" type="email" class="input" required autocomplete="email" aria-describedby="vl-email-hint vl-email-error">
    <p class="ds-hint" id="vl-email-hint">Invoices for PRJ-1024 go to this address.</p>
    <p class="ds-field-error" id="vl-email-error"></p>
  </div>
  <div class="ds-field">
    <label for="vl-code">Project code</label>
    <input id="vl-code" name="Code" class="input" required pattern="PRJ-[0-9]{4}" data-ds-msg-pattern="Use PRJ- and four digits, for example PRJ-1024." aria-describedby="vl-code-hint">
    <p class="ds-hint" id="vl-code-hint">PRJ- and four digits.</p>
  </div>
  <div class="ds-field">
    <label for="vl-hours">Hours this week</label>
    <input id="vl-hours" name="Hours" type="number" class="input" min="0" max="60" step="0.5" value="72">
  </div>
  <fieldset class="ds-fieldset">
    <legend>Contract type</legend>
    <label class="ds-check-row"><input type="radio" class="radio" name="Contract" value="fixed" required><span>Fixed price</span></label>
    <label class="ds-check-row"><input type="radio" class="radio" name="Contract" value="time"><span>Time and materials</span></label>
  </fieldset>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" name="Terms" required><span>I have read the data processing terms</span></label>
  <div><button type="submit" class="btn btn-primary">Add contact</button></div>
</form>
```

### ASP.NET Core output

What the built-in tag helpers render after a failed post: `input-validation-error` on the input, `field-validation-error` on the span from `asp-validation-for`, and `validation-summary-errors` from `asp-validation-summary`. The design system styles them like its own classes, adds `aria-invalid`, links each span with `aria-describedby`, turns summary lines into links when a field shows the same message, and focuses the summary in forms with `data-ds-validate`.

```html preview title="Server-rendered errors"
<form class="ds-form" action="#" onsubmit="return false" style="max-width:28rem">
  <div class="validation-summary-errors" data-valmsg-summary="true"><ul><li>The Invoice number field is required.</li><li>Amount must be between 1 and 1000000.</li></ul></div>
  <div class="ds-field">
    <label for="InvoiceNumber">Invoice number</label>
    <input class="input input-validation-error" type="text" data-val="true" data-val-required="The Invoice number field is required." id="InvoiceNumber" name="InvoiceNumber" value="">
    <span class="field-validation-error" data-valmsg-for="InvoiceNumber" data-valmsg-replace="true">The Invoice number field is required.</span>
  </div>
  <div class="ds-field">
    <label for="Amount">Amount (USD)</label>
    <input class="input input-validation-error" type="text" data-val="true" data-val-range="Amount must be between 1 and 1000000." data-val-range-min="1" data-val-range-max="1000000" id="Amount" name="Amount" value="0">
    <span class="field-validation-error" data-valmsg-for="Amount" data-valmsg-replace="true">Amount must be between 1 and 1000000.</span>
  </div>
  <div class="ds-field">
    <label for="Reference">Client reference <span class="ds-label-note">optional</span></label>
    <input class="input valid" type="text" id="Reference" name="Reference" value="PO-77812">
    <span class="field-validation-valid" data-valmsg-for="Reference" data-valmsg-replace="true"></span>
  </div>
</form>
```

### Success for asynchronous checks

Show success only when it carries information, such as an availability check against the server. `data-ds-validate-success` on the field shows it after a valid re-check.

```html preview title="Username available"
<div class="ds-field" data-ds-validate-success data-state="success" style="max-width:28rem">
  <label for="vl-user">Workspace address</label>
  <input id="vl-user" class="input" value="harbourworks" data-state="success" aria-describedby="vl-user-ok">
  <p class="ds-field-success" id="vl-user-ok">harbourworks.example.app is available.</p>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Untouched | Nothing typed yet | No message, even if required and empty |
| Invalid | Blur after typing, submit, server error | `aria-invalid="true"`, error border, icon and message in `--ds-error-text` under the field, message fades in from 5px above |
| Fixing | Typing in an invalid field | Re-checked on every input; message and border go as soon as the value is valid |
| Valid | After a re-check | Back to rest; no green unless `data-ds-validate-success` |
| Success | `data-ds-validate-success` and valid | `data-state="success"`: success border and message |
| Group invalid | Required radio group empty | `aria-invalid` on the radios and the fieldset; legend and message in `--ds-error-text`, message under the group |
| Summary | Submit with errors | `.ds-error-summary` at the top, `role="alert"`, focused; one link per field |
| Summary updating | Fields fixed after submit | Lines disappear as fields become valid; the summary hides at zero |
| Server summary | `.validation-summary-errors` | Same look; lines become links when they match a field message |
| Valid server span | `.field-validation-valid` | Hidden |

## Anatomy

- `form[data-ds-validate]` — opt-in; ds.js sets `novalidate` so the browser's bubbles do not compete.
- `.ds-field-error` (or `span.field-validation-error[data-valmsg-for]`) — the message; created when missing.
- `.ds-error-summary[data-ds-error-summary]` — the summary; created as the first child of the form when missing. Contains `h2`, a count sentence and `ul > li > a`.
- `.ds-field-success` — optional success message (from [field](./field.md)).

## Usage

- Write messages that say how to fix it: "Enter an email address like name@example.com.", not "Invalid input." Start with the field name when it is about presence ("Full name is required.").
- Keep server and client messages identical: in ASP.NET Core put the message in the attribute (`[Required(ErrorMessage = "…")]`); the client reads it from `data-val-required`.
- Validate on blur and on submit, never on the first keystroke. Never disable the submit button instead of showing errors.
- Keep what people typed after a failed submit. Re-render the form with the posted values.
- Use `data-ds-msg-<rule>` for a better message on one control: `data-ds-msg-required`, `-type`, `-pattern`, `-min`, `-max`, `-minlength`, `-maxlength`, `-step`.
- Use `formnovalidate` on a "Save draft" button that must skip validation.

## Accessibility

- Each message is linked through `aria-describedby` after the hint, so screen readers read label, value, hint, then error.
- Inline messages are not live regions: they would interrupt typing. The summary is a `role="alert"` and receives focus after submit, so it is read once.
- Summary links move focus to the field and scroll so its label is visible; closed `details` around the field are opened.
- Errors use an icon, text and a border, never colour alone; error text meets 4.5:1 in both themes.

| Key | Action |
| --- | --- |
| Tab out of a field | Check it (when something was typed) |
| Enter on submit | Check all fields; on errors focus the summary |
| Tab in the summary | Move between the links |
| Enter on a summary link | Focus the field |

## Razor

```cshtml
<form method="post" class="ds-form" data-ds-validate>
    <ds-error-summary />
    <ds-field asp-for="InvoiceNumber" />
    <ds-field asp-for="Amount" type="number" unit="USD" />
    <button class="btn btn-primary">Save invoice</button>
</form>
```

`ds-error-summary` renders the model state errors as the same summary the client builds, with links to `#{field id}` and `data-ds-autofocus`, so focus lands on it after a failed post. When the model is valid it renders an empty, hidden container that the client fills. `ds-field` (from [field](./field.md)) renders `aria-invalid` and the error with the model state message. The built-in `asp-validation-for` and `asp-validation-summary` also work; their classes are styled.

```csharp
public sealed class InvoiceInput
{
    [Display(Name = "Invoice number")]
    [Required(ErrorMessage = "Invoice number is required.")]
    [RegularExpression(@"INV-\d{4}-\d{4}", ErrorMessage = "Use INV-, the year and four digits, for example INV-2026-0418.")]
    public string? InvoiceNumber { get; set; }
}
```

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-validate` | On a form: validate on blur, re-check on input, summary on submit |
| `data-ds-error-summary` | Where the summary goes (inside the form, or `="formId"` outside it) |
| `data-ds-autofocus` | On a server summary: focus it on load |
| `data-ds-validate-success` | On a field: show the success state when valid |
| `data-ds-msg-<rule>` | Custom message for one rule on one control |
| `data-val-*` | ASP.NET Core rules; used as rules and messages when jQuery Validation is not loaded |
| `formnovalidate` | On a submit button: skip validation |

```js
const form = document.querySelector("#invoice-form");
if (!DS.validation.form(form)) return;           // check everything, show messages
DS.validation.setError(form.elements.Email, "This email is already used by Mei Tanaka.");
DS.validation.clearError(form.elements.Email);
form.addEventListener("ds:validation:result", (e) => console.log(e.detail.valid, e.detail.invalid));
```

If jQuery Validation with the unobtrusive adapter is on the page, it keeps control of those forms: ds.js does not validate them, but its styles still apply to `input-validation-error`, `field-validation-error`, `validation-summary-errors` and jQuery's `aria-invalid`.

## Tokens

`--ds-error-text`, `--color-error`, `--ds-error-soft`, `--ds-success-text`, `--ds-focus`, `--ds-radius-box`, `--ds-radius-xs`, `--ds-space-*`, `--ds-type-callout-*`, `--ds-type-footnote-*`, `--ds-duration-enter`, `--ds-ease-emphasized`, `--ds-enter-offset`, `--ds-duration-fast`.

## Native and daisyUI

Uses the browser's Constraint Validation API (`validity`, `setCustomValidity`) for the rules and replaces its bubbles with inline messages. Without JavaScript the browser bubbles remain, because `novalidate` is only set by ds.js. ASP.NET Core's `input-validation-error`, `field-validation-error`, `field-validation-valid`, `validation-summary-errors` and `validation-summary-valid` are styled here. daisyUI's `validator` class is not needed.
