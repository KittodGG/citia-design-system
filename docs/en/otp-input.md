---
title: OTP input
group: components
category: forms
order: 28
summary: A one-time code field shown as 4 to 8 cells, with auto-advance, paste and SMS autofill, error, success and busy states, posting one value.
---

An OTP input collects a short one-time code sent by SMS, email or an authenticator app. It shows one cell per character so people can check the code against the message. For codes longer than 8 characters or with a mixed format (recovery codes), use a single [Input](./input.md) with `autocomplete="one-time-code"`.

## Examples

### Six digits

Write one text input inside `.ds-otp[data-ds-otp]`. Without JavaScript it is a normal input with `autocomplete="one-time-code"` and `inputmode="numeric"`. ds.js shows the cells and keeps the original input (now hidden) as the single posted value (`Code=482913`).

```html preview title="Six-digit code"
<div class="ds-otp" data-ds-otp data-ds-otp-length="6">
  <label for="otp-signin" class="ds-label">Verification code</label>
  <input id="otp-signin" name="Code" class="input ds-otp__value" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required aria-describedby="otp-signin-hint">
  <p id="otp-signin-hint" class="ds-hint">We sent a 6-digit code to +62 812 ••• 4471. It expires in 10 minutes.</p>
</div>
```

### Four digits, grouped six

`data-ds-otp-length` sets the number of cells. `data-ds-otp-group="3"` adds a separator every 3 cells, matching how the code is printed in the message.

```html preview title="Lengths and grouping"
<div class="grid gap-6">
  <div class="ds-otp" data-ds-otp data-ds-otp-length="4">
    <label for="otp-pin" class="ds-label">Card PIN confirmation</label>
    <input id="otp-pin" name="Pin" class="input ds-otp__value" inputmode="numeric" autocomplete="one-time-code" maxlength="4">
  </div>
  <div class="ds-otp" data-ds-otp data-ds-otp-length="6" data-ds-otp-group="3">
    <label for="otp-grouped" class="ds-label">Email code</label>
    <input id="otp-grouped" name="EmailCode" class="input ds-otp__value" inputmode="numeric" autocomplete="one-time-code" maxlength="6">
  </div>
</div>
```

### Letters and digits

`data-ds-otp-type="alphanumeric"` accepts A–Z and 0–9 (shown upper case) and uses the text keyboard.

```html preview title="Alphanumeric"
<div class="ds-otp" data-ds-otp data-ds-otp-length="6" data-ds-otp-type="alphanumeric">
  <label for="otp-alpha" class="ds-label">Device pairing code</label>
  <input id="otp-alpha" name="PairingCode" class="input ds-otp__value" autocomplete="one-time-code" maxlength="6">
</div>
```

### Verify on completion

Listen for `ds:otp:complete`, set the busy state while the server checks, then success or error. `data-ds-otp-autosubmit` submits the form instead.

```html preview title="Verification flow"
<div class="ds-otp" data-ds-otp data-ds-otp-length="6" id="otp-demo">
  <label for="otp-verify" class="ds-label">Code from the authenticator app</label>
  <input id="otp-verify" name="TotpCode" class="input ds-otp__value" inputmode="numeric" autocomplete="one-time-code" maxlength="6" aria-describedby="otp-verify-hint">
  <p id="otp-verify-hint" class="ds-hint">This demo accepts 123456; any other code shows the error state.</p>
</div>
<script type="module">
  const host = document.getElementById("otp-demo");
  host.addEventListener("ds:otp:complete", (event) => {
    const otp = window.DS.otp(host);
    otp.setState("busy");
    setTimeout(() => otp.setState(event.detail.value === "123456" ? "success" : "error"), 900);
  });
</script>
```

## States

```html preview title="OTP states"
<div class="grid gap-6">
  <div class="ds-otp" data-ds-otp data-ds-otp-length="6"><label for="otp-st-1" class="ds-label">Partly filled</label><input id="otp-st-1" class="input ds-otp__value" value="482" inputmode="numeric" autocomplete="one-time-code"></div>
  <div class="ds-otp" data-ds-otp data-ds-otp-length="6" data-state="error"><label for="otp-st-2" class="ds-label">Error</label><input id="otp-st-2" class="input ds-otp__value" value="482913" aria-invalid="true" aria-describedby="otp-st-2-err" inputmode="numeric" autocomplete="one-time-code"><p id="otp-st-2-err" class="ds-field-error">That code is not valid. Check the latest message and try again.</p></div>
  <div class="ds-otp" data-ds-otp data-ds-otp-length="6" data-state="success"><label for="otp-st-3" class="ds-label">Verified</label><input id="otp-st-3" class="input ds-otp__value" value="551208" readonly inputmode="numeric" autocomplete="one-time-code"></div>
  <div class="ds-otp" data-ds-otp data-ds-otp-length="6" aria-busy="true"><label for="otp-st-4" class="ds-label">Checking</label><input id="otp-st-4" class="input ds-otp__value" value="551208" readonly inputmode="numeric" autocomplete="one-time-code"></div>
  <div class="ds-otp" data-ds-otp data-ds-otp-length="6"><label for="otp-st-5" class="ds-label">Disabled</label><input id="otp-st-5" class="input ds-otp__value" disabled inputmode="numeric" autocomplete="one-time-code"></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Empty | no characters | cells with the field border; no placeholder |
| Focus | a cell has focus | field focus ring on that cell, primary caret, content selected so typing replaces it |
| Filled cell | a character entered (`data-filled`) | border one step darker, 20px semibold tabular figure |
| Complete | every cell filled | "Code entered." announced, `ds:otp:complete` fired |
| Busy | `aria-busy="true"` (`setState("busy")`) | cells read-only, spinner after the cells after 300ms |
| Error | `data-state="error"`, `aria-invalid="true"` | error border on every cell, message below; editing clears the state |
| Success | `data-state="success"` | success border and a check after the cells; cells read-only |
| Incomplete on submit | required or partly filled | browser message "Enter all 6 characters." on the first cell |
| Disabled | `disabled` | cells dimmed on `--color-base-200`, `cursor: not-allowed` |

## Anatomy

- `.ds-otp[data-ds-otp]` — wrapper with the label, hint and error.
- `input.ds-otp__value` — the original input; posts the code (hidden once enhanced, id becomes `{id}-value`).
- `.ds-otp__cells[role="group"]` — the cells, named by the label.
- `input.ds-otp__cell.input` — one cell, named "Character 2 of 6"; the first cell takes the original `id` and `autocomplete="one-time-code"`.
- `.ds-otp__sep` — group separator.
- `.ds-otp__status` — check (success) or spinner (busy).

## Usage

- Say where the code was sent and how long it lasts ("sent to +62 812 ••• 4471, expires in 10 minutes").
- Offer "Resend code" after 30 to 60 seconds, as a link button below the field.
- Verify automatically on completion only when the check is fast; otherwise wait for a Verify button.
- After an error, keep the digits so people can compare, and let them edit; do not clear the field.
- Do not use for passwords or PINs that must stay hidden; cells show the characters.

## Accessibility

- The cells are a `group` named by the visible label; each cell is named "Character n of 6". The hint and error are linked with `aria-describedby`.
- SMS and password-manager autofill work: the first cell has `autocomplete="one-time-code"` and a full code typed or inserted into one cell is spread over all cells.
- Paste anywhere fills from that cell (or from the first when the pasted code is complete); spaces and dashes are ignored.
- Live region: "Code entered." on completion; busy is exposed with `aria-busy`.
- Each cell is 44×52px (40×48px below 380px wide).

| Key | Action |
| --- | --- |
| 0–9 (A–Z when alphanumeric) | Fill the cell and move to the next |
| Backspace | Clear the cell; on an empty cell, clear the previous one and move back |
| Delete | Clear the cell and stay |
| Arrow Left / Arrow Right | Move between cells |
| Home / End | First or last cell |
| Ctrl/Cmd + V | Paste and distribute the code |
| Tab | Move to the next cell (each cell is a Tab stop) |

## Razor

```cshtml
<ds-otp asp-for="Code" length="6" required
        hint="We sent a 6-digit code to +62 812 ••• 4471." />
<ds-otp asp-for="PairingCode" label="Device pairing code" length="6" alphanumeric group="3" autosubmit />
```

The helper writes the wrapper, label (default "Verification code"), the input with `inputmode`, `autocomplete`, `maxlength` and `pattern`, the hint (default "Enter the 6-character code.") and the model error, which also sets the error state.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `.ds-otp[data-ds-otp]` | Enhances the input inside |
| `data-ds-otp-length` | Number of cells (default: the input's `maxlength`, else 6) |
| `data-ds-otp-type="alphanumeric"` | Accept letters and digits |
| `data-ds-otp-group="3"` | Separator every n cells |
| `data-ds-otp-autosubmit` | Submit the form when complete |
| `data-state="error"` / `"success"`, `aria-busy="true"` | Initial state |

API: `DS.otp(element)` returns `{ setState("error" | "success" | "busy" | ""), clear(), focus(), value }`. Events: `ds:otp:complete` `{ value }` on the wrapper; `input` and `change` on the original input.

## Tokens

Cells: as [Input](./input.md), plus `--ds-type-title-3-size`, `--ds-weight-semibold`, `--color-primary` (caret), `--color-error`, `--color-success`, `--ds-control-border` (separator), `--ds-opacity-disabled`, `--ds-space-2`.

## Native and daisyUI

Builds on one `<input>` with `autocomplete="one-time-code"`, the most robust form without JavaScript and the one the SMS autofill of iOS and Android expects. Each cell is a daisyUI `.input` sized to 44×52px and centred; daisyUI has no OTP component.
