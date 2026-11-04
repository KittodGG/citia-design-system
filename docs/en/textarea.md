---
title: Textarea
group: components
category: forms
order: 4
summary: Multi-line text with auto-grow, controlled resizing and a character counter that announces the limit politely.
source: TPS app.css L1696-1975
---

The textarea collects free text of more than one line: a note, a description, a message. Use [input](./input.md) for one line. Do not use it for rich formatting.

## Examples

### Default and auto-grow

The default textarea resizes vertically. Auto-grow (`data-ds-autogrow`) follows the text with `field-sizing: content`, up to 20rem, and falls back to a script in browsers without it.

```html preview title="Fixed and auto-grow"
<div class="ds-form" style="max-width:30rem">
  <div class="ds-field">
    <label for="ta-1">Description</label>
    <textarea id="ta-1" class="textarea" rows="3" placeholder="What changed in this release?"></textarea>
  </div>
  <div class="ds-field">
    <label for="ta-2">Meeting notes</label>
    <textarea id="ta-2" class="textarea" data-ds-autogrow>Budget approved for PRJ-1024.
Daniel to confirm vendor terms by Friday.
Mei to schedule the review.</textarea>
  </div>
</div>
```

### Counter

With `maxlength` the counter turns amber at 10% remaining, red at the limit. After typing stops for 800ms a polite live region says how many characters remain. Past a soft limit (`data-ds-max`, no `maxlength`) the counter reads "over".

```html preview title="Counter with limit"
<div class="ds-form" style="max-width:30rem">
  <div class="ds-field">
    <label for="ta-3">Message to the customer</label>
    <textarea id="ta-3" class="textarea" rows="3" maxlength="140" data-ds-counter aria-describedby="ta-3-h">Your invoice INV-2026-0418 was sent on 4 March. Payment is due within 14 days.</textarea>
    <div class="ds-field__meta"><p class="ds-hint" id="ta-3-h">Shown in the email body.</p><span class="ds-counter">0 / 140</span></div>
  </div>
  <div class="ds-field">
    <label for="ta-4">Summary</label>
    <textarea id="ta-4" class="textarea" rows="2" data-ds-max="40" data-ds-counter>This summary is deliberately longer than forty characters.</textarea>
    <div class="ds-field__meta"><p class="ds-hint">Soft limit: you can keep typing.</p><span class="ds-counter">0 / 40</span></div>
  </div>
</div>
```

## States

```html preview title="Textarea states"
<div class="ds-field-grid">
  <div class="ds-field"><label for="tas-1">Placeholder</label><textarea id="tas-1" class="textarea" rows="2" placeholder="Add a note"></textarea></div>
  <div class="ds-field"><label for="tas-2">Filled</label><textarea id="tas-2" class="textarea" rows="2">Approved by Sofia Marquez.</textarea></div>
  <div class="ds-field"><label for="tas-3">Disabled</label><textarea id="tas-3" class="textarea" rows="2" disabled>Closed project</textarea></div>
  <div class="ds-field"><label for="tas-4">Read-only</label><textarea id="tas-4" class="textarea" rows="2" readonly>Imported from PRJ-1024.</textarea></div>
  <div class="ds-field"><label for="tas-5">Invalid</label><textarea id="tas-5" class="textarea" rows="2" aria-invalid="true" aria-describedby="tas-5-e"></textarea><p class="ds-field-error" id="tas-5-e">Describe the reason in at least 10 characters.</p></div>
  <div class="ds-field"><label for="tas-6">Valid</label><textarea id="tas-6" class="textarea" rows="2" data-state="success">Looks good.</textarea></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest, hover | Default, pointer over | Same border logic as [input](./input.md) |
| Focus | `:focus` | 2px ring, 2px offset |
| Filled, placeholder | Value present or empty | Body text; placeholder in `--ds-subtle` |
| Disabled | `disabled` | 55% opacity, `base-200`, `not-allowed` |
| Read-only | `readonly` | `base-200`, hairline border, selectable |
| Invalid | `aria-invalid`, `:user-invalid` | Error border; message below |
| Success | `data-state="success"` | Success border |
| Counter warn, limit, over | `data-state` on `.ds-counter` | Amber text, red text, red text with the count over |
| Autofill | `:autofill` | Theme surface kept |

## Anatomy

- `textarea.textarea`: native control; `rows` sets the minimum (3 lines when auto-growing; override with `--ds-rows`).
- `.is-autogrow` or `[data-ds-autogrow]`: grows with content, resize handle removed.
- `.is-fixed`, `.is-resize-x`, `.is-resize-both`: resize rules (default is vertical only).
- `.ds-counter` in `.ds-field__meta`; a visually hidden `role="status"` sibling is added by the script.

## Usage

- Resize vertically only. Horizontal resize breaks the column; use `is-resize-both` only in tools with a free canvas.
- Auto-grow inside forms with a footer that sticks; cap the height (`--ds-textarea-max`, default 20rem) so the footer stays reachable.
- Use `maxlength` for hard limits (SMS, a database column). Use `data-ds-max` for a recommendation.
- Show the counter only when the limit matters; a counter on every field is noise.
- Do not trim whitespace while the person types. Trim on the server.

## Accessibility

- The counter text is `aria-hidden`; the polite live region announces "14 characters remaining" after typing pauses, once the remaining count is at or below 10% (minimum 10), and "Character limit reached" at the limit.
- Announcements are debounced 800ms so a screen reader is not interrupted on every key.
- Resize handle is native and keyboard-independent; auto-grow removes the need to resize.
- Reduced motion: no height animation in either mode.

| Key | Action |
| --- | --- |
| Tab | Leaves the field (Tab is not a character) |
| Enter | New line |
| Ctrl + Enter | Application defined; add your own handler if the form submits on it |

## Razor

```cshtml
<ds-field asp-for="Notes" type="textarea" rows="4" autogrow counter maxlength="500" hint="Plain text." />
```

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-autogrow` | Script fallback where `field-sizing` is not supported |
| `data-ds-counter` | Enables the counter; optional value is a selector (`#id`), default is the `.ds-counter` in the field |
| `data-ds-max` | Soft limit when there is no `maxlength` |

Counter text uses `DS.t("inputs.count")`. Events: standard `input`, `change`.

## Tokens

`--ds-subtle`, `--ds-warning-text`, `--ds-error-text`, `--ds-control-border`, `--ds-focus`, `--ds-type-footnote-*`, `--ds-duration-fast`.

## Native and daisyUI

Builds on `textarea.textarea`. The DS fixes line height at 1.5, adds `field-sizing: content` auto-grow, one resize rule and shared states; daisyUI's 5rem minimum height is replaced by a line-based minimum for auto-grow.
