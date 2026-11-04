---
title: Password input
group: components
category: forms
order: 6
summary: Password field with a show and hide toggle, a Caps Lock warning, an optional strength meter and correct autocomplete.
source: TPS app.css .ds-password
---

Use the password input for secrets typed on a keyboard. For one-time codes use [OTP input](./otp-input.md); for any other text use [input](./input.md).

## Examples

### Show and hide

The toggle reuses `data-ds-password-toggle`. It switches the field between `password` and `text`, sets `aria-pressed`, and the form resets the field to `password` on submit.

```html preview title="Sign in"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-field">
    <label for="pw-1">Password</label>
    <div class="ds-input ds-password">
      <input id="pw-1" type="password" class="ds-input__control" value="correct-horse" autocomplete="current-password" autocapitalize="off" spellcheck="false" data-ds-capslock aria-describedby="pw-1-caps">
      <button type="button" class="ds-password-toggle" data-ds-password-toggle aria-controls="pw-1" aria-pressed="false" aria-label="Show password">
        <svg class="ds-icon" data-ds-password-icon="hidden" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>
        <svg class="ds-icon" data-ds-password-icon="shown" aria-hidden="true" hidden><use href="#ds-icon-eye-off"></use></svg>
      </button>
    </div>
    <p class="ds-password__caps" id="pw-1-caps" role="status" aria-live="polite"></p>
  </div>
</div>
```

Press Caps Lock while the field has focus: "Caps Lock is on" appears under it and clears on blur.

### New password with strength

Use `autocomplete="new-password"` on sign-up and change forms so password managers offer a generated one. The meter is advice, not a rule: enforce your policy on the server and say it in the hint.

```html preview title="Create password"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-field">
    <label for="pw-2">New password</label>
    <div class="ds-input ds-password">
      <input id="pw-2" type="password" class="ds-input__control" value="Lestari-2026!" autocomplete="new-password" autocapitalize="off" spellcheck="false" data-ds-strength data-ds-capslock aria-describedby="pw-2-h pw-2-caps">
      <button type="button" class="ds-password-toggle" data-ds-password-toggle aria-controls="pw-2" aria-pressed="false" aria-label="Show password">
        <svg class="ds-icon" data-ds-password-icon="hidden" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>
        <svg class="ds-icon" data-ds-password-icon="shown" aria-hidden="true" hidden><use href="#ds-icon-eye-off"></use></svg>
      </button>
    </div>
    <div class="ds-strength" data-level="0"><div class="ds-strength__bars" aria-hidden="true"><i></i><i></i><i></i><i></i></div><span class="ds-strength__label"></span></div>
    <p class="ds-password__caps" id="pw-2-caps" role="status" aria-live="polite"></p>
    <p class="ds-hint" id="pw-2-h">At least 12 characters. A phrase of several words works well.</p>
  </div>
</div>
```

## States

```html preview title="Password states"
<div class="ds-field-grid">
  <div class="ds-field"><label for="ps-1">Empty</label><div class="ds-input ds-password"><input id="ps-1" type="password" class="ds-input__control" autocomplete="current-password"></div></div>
  <div class="ds-field"><label for="ps-2">Disabled</label><div class="ds-input ds-password"><input id="ps-2" type="password" class="ds-input__control" value="secret" disabled></div></div>
  <div class="ds-field"><label for="ps-3">Invalid</label><div class="ds-input ds-password"><input id="ps-3" type="password" class="ds-input__control" value="abc" aria-invalid="true" aria-describedby="ps-3-e"></div><p class="ds-field-error" id="ps-3-e">Password must be at least 12 characters.</p></div>
  <div class="ds-field"><label for="ps-4">Shown</label><div class="ds-input ds-password"><input id="ps-4" type="text" class="ds-input__control" value="Okafor-2026-Bridge"><button type="button" class="ds-password-toggle" aria-pressed="true" aria-label="Show password"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye-off"></use></svg></button></div></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest, hover, focus | As [input](./input.md) | Toggle icon in `--ds-subtle`, darker on hover |
| Pressed (shown) | `aria-pressed="true"` | Toggle icon at full contrast, field is plain text |
| Caps Lock on | Key event reports it | Warning text with icon under the field, polite |
| Strength 1 to 4 | Typing | Bars fill: error, warning, primary, success; label after 300ms |
| Disabled | `disabled` | 55% opacity |
| Invalid | `aria-invalid` | Error border and message |
| Autofill | Browser fills | Theme surface kept |

## Anatomy

- `.ds-input.ds-password` with `.ds-input__control`.
- `.ds-password-toggle[data-ds-password-toggle]`: 28px button, 44px hit area; two icons switched by `data-ds-password-icon`.
- `.ds-password__caps`: live region for the Caps Lock warning.
- `.ds-strength`: `data-level` 0-4, `.ds-strength__bars > i` x4, `.ds-strength__label`.
- Version 1 markup (`.ds-password > input.input`, toggle absolutely positioned) still works.

## Usage

- Set `autocomplete` on every password field: `current-password` to sign in, `new-password` to create or change. Never `off`.
- Always allow paste. Never block the password manager.
- Turn off `autocapitalize`, `autocorrect` and `spellcheck`.
- Do not use the meter alone to accept or reject. State the rule: "At least 12 characters."
- With a show toggle, a "Confirm password" field adds friction without catching more mistakes; leave it out.
- Do not log, persist or send the strength score.

## Accessibility

- Toggle: `aria-pressed` with a name that stays "Show password"; the state is the pressed state, not a renamed button.
- The Caps Lock message is a polite live region that is empty until needed.
- The strength label is a polite live region updated 300ms after typing stops; the bars are `aria-hidden` and the level never relies on colour (the label says it).
- Passwords are never put in `title`, `aria-label` or the URL. The field returns to `type="password"` on submit.
- Focus order: field, then toggle.

| Key | Action |
| --- | --- |
| Tab | Field, then the toggle button |
| Enter, Space | On the toggle: shows or hides |
| Enter | In the field: submits the form |

## Razor

```cshtml
<ds-field asp-for="Password" type="password" label="Password" />
<ds-field asp-for="NewPassword" type="password" autocomplete="new-password" strength hint="At least 12 characters." />
```

Options: `show-toggle` (default true), `caps-warning` (default true), `strength`.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-password-toggle` (`forms.js`) | Toggle between `password` and `text` |
| `data-ds-capslock` | Show the Caps Lock message in the field's `.ds-password__caps` |
| `data-ds-strength` | Drive the `.ds-strength` meter of the field |

API: `DS.inputs.passwordScore(value)` returns 0 to 4. Event: `ds:password:capslock` (`detail.on`). The score checks length, character classes, repeats and a short list of common words; it is a hint, not a security control.

## Tokens

`--ds-subtle`, `--ds-warning-text`, `--ds-error-text`, `--ds-quiet`, `--color-error`, `--color-warning`, `--color-primary`, `--color-success`, `--color-base-300`, `--ds-duration-base`.

## Native and daisyUI

Builds on `input[type=password]`. The toggle is the DS version of daisyUI's `swap`; the Caps Lock and strength parts have no native equivalent.
