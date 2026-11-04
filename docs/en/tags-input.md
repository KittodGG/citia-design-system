---
title: Tags input
group: components
category: forms
order: 27
summary: A field that turns typed or pasted text into removable chips, with duplicate feedback, a maximum, per-tag validation and a normal form value.
---

A tags input collects a short list of free-text values: labels, keywords, email addresses to invite. People type a value and press Enter or comma; it becomes a chip. When the values must come from a known list, use a [Multi-select](./multi-select.md). For one free-text value, use an [Input](./input.md).

## Examples

### Basic

Put `data-ds-tags` on a text input. Without JavaScript it is a comma-separated text field. With ds.js the same input becomes hidden and keeps the comma-separated value, so the post is unchanged (`Labels=design,urgent`).

```html preview title="Tags input"
<div class="ds-field" style="max-width: 30rem">
  <label for="tg-labels">Labels</label>
  <input id="tg-labels" name="Labels" class="input" value="finance, q3 close" data-ds-tags placeholder="Add a label" aria-describedby="tg-labels-hint">
  <p id="tg-labels-hint" class="ds-hint">Press Enter or comma after each label.</p>
</div>
```

### Maximum and length

`data-ds-tags-max` caps the number of tags and shows a counter; `data-ds-tags-maxlength` trims each tag.

```html preview title="Max 5 tags"
<div class="ds-field" style="max-width: 30rem">
  <label for="tg-keywords">Search keywords</label>
  <input id="tg-keywords" name="Keywords" class="input" value="invoice,overdue,PRJ-1024" data-ds-tags data-ds-tags-max="5" data-ds-tags-maxlength="24" placeholder="Add a keyword">
</div>
```

### Validation per tag

`data-ds-tags-pattern` is a regular expression each tag must match (whole value). Invalid tags stay as error chips so they can be removed or retyped, and the field reports "2 entries are not valid." on submit.

```html preview title="Email addresses"
<div class="ds-field" style="max-width: 30rem">
  <label for="tg-invite">Invite by email</label>
  <input id="tg-invite" name="Invitees" class="input" value="ayu.lestari@example.com, daniel.okafor@example" data-ds-tags data-ds-tags-pattern="[^@\s]+@[^@\s]+\.[^@\s]+" placeholder="name@company.com" aria-describedby="tg-invite-hint">
  <p id="tg-invite-hint" class="ds-hint">Paste a list separated by commas, semicolons or new lines.</p>
</div>
```

### One value per tag

`data-ds-tags-mode="multiple"` posts each tag as its own value under the same name (`Tags=a&Tags=b`), which binds to `List<string>`.

```html preview title="Multiple values"
<div class="ds-field" style="max-width: 30rem">
  <label for="tg-multi">Tags</label>
  <input id="tg-multi" name="Tags" class="input" value="onboarding,remote" data-ds-tags data-ds-tags-mode="multiple">
</div>
```

## States

```html preview title="Tags input states"
<div class="grid gap-4 sm:grid-cols-2">
  <div class="ds-field"><label for="tg-st-1">Empty</label><input id="tg-st-1" class="input" data-ds-tags placeholder="Add a label"></div>
  <div class="ds-field"><label for="tg-st-2">Limit reached</label><input id="tg-st-2" class="input" value="north,south" data-ds-tags data-ds-tags-max="2"></div>
  <div class="ds-field"><label for="tg-st-3">Invalid</label><input id="tg-st-3" class="input" value="ok@example.com,not-an-email" data-ds-tags data-ds-tags-pattern="[^@\s]+@[^@\s]+\.[^@\s]+" aria-invalid="true" aria-describedby="tg-st-3-err"><p id="tg-st-3-err" class="ds-field-error">Remove or correct not-an-email.</p></div>
  <div class="ds-field"><label for="tg-st-4">Disabled</label><input id="tg-st-4" class="input" value="archived,2025" data-ds-tags disabled></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Empty | no tags | placeholder in `--ds-subtle` |
| Focus | focus in the entry | field focus ring (from [Input](./input.md)) |
| Typing | text in the entry | text only; nothing is added until Enter, comma, Tab, paste or blur |
| Added | Enter, comma, Tab, blur | chip fades and scales in from 96% (160ms); "{label} added." announced |
| Duplicate | the value already exists (case-insensitive) | existing chip flashes a primary tint for 1.6s; "{label} is already in the list." |
| Limit reached | `data-ds-tags-max` | counter in full text colour, further values refused with "You can add up to 5." |
| Invalid tag | value fails `data-ds-tags-pattern` | chip in `--ds-error-soft` with error border and text; field invalid until fixed |
| Chip focus | Arrow Left from the entry | focus ring on the chip's × button |
| Removed | × button, Backspace, Delete | chip disappears, "{label} removed." announced |
| Invalid field | `aria-invalid="true"` | error border, message below |
| Disabled | `disabled` | field dimmed, chips without remove action |

## Anatomy

- `.ds-tags-input` — wrapper (generated).
- `.ds-tags-input__field.input` — field around chips and entry.
- `.ds-tags-input__tokens` — list of `.ds-token` chips.
- `.ds-tags-input__input` — text entry; takes the original `id`, so the label still points at it.
- `input[type=hidden][data-ds-tags]` — the original input (id `{id}-value`), holding the joined value.
- `.ds-tags-input__meta` / `.ds-tags-input__count` — counter when a maximum is set.

## Usage

- Say how to add a tag in the hint ("Press Enter or comma after each label.").
- Keep tags short (under 24 characters) and set `data-ds-tags-maxlength` to enforce it.
- Accept paste of whole lists; people often copy from spreadsheets or email.
- Normalise on the server too (trim, case): the client prevents obvious duplicates, not all.
- Do not use for values that must exist in a list (people, projects); use a [Multi-select](./multi-select.md).

## Accessibility

- The entry is a normal text input with the field's label, hint and error. Chips are a list; each remove button is named "Remove {label}".
- Remove buttons are not Tab stops; Arrow Left at the start of the entry moves to them, so a field with 20 tags is still one Tab stop.
- A polite live region announces added, removed, duplicate, maximum and invalid values.
- Invalid chips use border, fill and text colour; the error message names the problem in words.

| Key | Action |
| --- | --- |
| Enter or , (comma) | Add the typed text as a tag (Enter with an empty entry submits the form) |
| Tab | Add the typed text, then move on |
| Backspace | With an empty entry: remove the last tag |
| Arrow Left | At the start of the entry: focus the last tag's remove button |
| Arrow Left / Right on a tag | Move between tags; past the last, back to the entry |
| Backspace / Delete / Enter on a tag | Remove that tag |
| Escape or End on a tag | Back to the entry |
| Ctrl/Cmd + V | Paste; text is split on commas, semicolons, tabs and new lines |

## Razor

```cshtml
<div class="ds-field">
    <label asp-for="Labels">Labels</label>
    <ds-tags-input asp-for="Labels" max="8" max-length="24" placeholder="Add a label" />
</div>

<ds-tags-input asp-for="Invitees" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" />
```

A `string` property posts one comma-separated value; a collection (`List<string>`, `string[]`) switches to one value per tag. Other attributes: `separator`, `required`, `disabled`, `size="sm"`. Model errors add `aria-invalid` and a message.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `input[data-ds-tags]` | Enhances the input |
| `data-ds-tags-separator` | Separator for the posted value and typing (default `,`) |
| `data-ds-tags-mode="multiple"` | One hidden input per tag under the same name |
| `data-ds-tags-max` | Maximum number of tags (shows a counter) |
| `data-ds-tags-maxlength` | Maximum characters per tag |
| `data-ds-tags-pattern` | Regular expression each tag must match |
| `data-ds-tags-commit="false"` | Do not add the typed text on blur |

API: `DS.tagsInput(input)` returns `{ add(text), remove(tag), clear(), get() }`. Events on the original input: `input`, `change` and `ds:tags:change` `{ tags }`. Form reset restores the initial tags.

## Tokens

Field: as [Input](./input.md). Chips: `--color-base-200`, `--color-base-300`, `--ds-radius-md`, `--ds-radius-sm`, `--ds-type-footnote-size`, `--ds-subtle`, `--ds-error-soft`, `--ds-error-text`, `--color-primary`, `--ds-opacity-state-drag` (duplicate flash), `--ds-duration-quick`, `--ds-ease-emphasized`.

## Native and daisyUI

Builds on a text `<input>`, so it works without JavaScript as comma-separated text. The field is daisyUI `.input` used as a container; chips are the DS `.ds-token`, shared with [Multi-select](./multi-select.md).
