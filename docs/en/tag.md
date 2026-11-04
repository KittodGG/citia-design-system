---
title: Tag
group: components
category: data-display
order: 4
summary: A small uppercase label for a category, plan or attribute, tonal or outline, with an icon, in three sizes, optionally removable.
source: TPS app.css .pt-tag L3648–3650
---

A tag classifies: "Trial", "Finance", "PRJ-1024". It does not describe progress (use [status](./status.md)), count things (use a [badge](./badge.md)) or take part in a selection (use a [chip](./chip.md)). A removable tag is a display element with a button; when people add and remove values from a field, use an input chip or the tags input.

## Examples

```html preview title="Tonal tones"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <span class="ds-tag is-neutral">Finance</span>
  <span class="ds-tag is-primary">Pro plan</span>
  <span class="ds-tag is-info">Trial</span>
  <span class="ds-tag is-success">Verified</span>
  <span class="ds-tag is-warning">Beta</span>
  <span class="ds-tag is-error">Deprecated</span>
  <span class="ds-tag is-self">You</span>
</div>
```

```html preview title="Outline, sizes and sentence case"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <span class="ds-tag is-neutral is-outline">Internal</span>
  <span class="ds-tag is-info is-outline">Trial</span>
  <span class="ds-tag is-error is-outline">Blocked</span>
  <span class="ds-tag is-neutral is-sm">Small</span>
  <span class="ds-tag is-neutral">Medium</span>
  <span class="ds-tag is-neutral is-lg">Large</span>
  <span class="ds-tag is-neutral is-sentence">Needs approval</span>
</div>
```

```html preview title="With icon and removable"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <span class="ds-tag is-success"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg> Verified</span>
  <span class="ds-tag is-info"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-clock"></use></svg> Due 14 Nov</span>
  <span class="ds-tag is-neutral">Finance <button type="button" class="ds-tag__remove" aria-label="Remove Finance"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></span>
  <span class="ds-tag is-primary is-outline">PRJ-1024 <button type="button" class="ds-tag__remove" aria-label="Remove PRJ-1024"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></span>
</div>
```

## States

```html preview title="Link, disabled and long text"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <a class="ds-tag is-info" href="#finance">Finance</a>
  <button type="button" class="ds-tag is-neutral">Filter by Ops</button>
  <button type="button" class="ds-tag is-neutral" disabled>Archived</button>
  <span class="ds-tag is-neutral" style="max-inline-size:9rem"><span class="ds-tag__label">Quarterly audit preparation</span></span>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | 8 to 11% tone tint, tone text, uppercase with 0.06em tracking |
| Outline | `.is-outline` | Transparent fill, 38% tone hairline |
| Hover | Pointer over a link or button tag | Tint rises to 16% |
| Focus-visible | Keyboard focus on a link, button or the remove button | 2px `--ds-focus` ring |
| Pressed | `:active` on the remove button | 22% layer on the button |
| Disabled | `disabled` or `aria-disabled="true"` | `--ds-opacity-disabled`, `cursor: not-allowed` |
| Overflow | Long text | `.ds-tag__label` truncates with an ellipsis; set `title` |
| Removing | Your handler removes the element | Remove it and move focus to the next tag or the container |

## Anatomy

- `.ds-tag` with `is-neutral|primary|info|success|warning|error`, `is-outline`, `is-sm|lg`, `is-sentence`, `is-self`.
- Optional `.ds-icon` (12px) at the start, `.ds-tag__label`, `.ds-tag__remove` button (18px, 24px hit area, 44px on touch).

## Usage

- Keep text to 1 to 2 words, 24 characters at most. The uppercase style gets loud with longer text; use `is-sentence` for longer labels.
- Do not rely on tone to categorise. The word is the category; colour is optional.
- Show at most 3 tags in a table row, then a `+N` tag.
- A removable tag needs an accessible remove name ("Remove Finance") and an app handler; the DS only draws it.
- Use `is-self` only for the signed-in user.

## Accessibility

- Tag text is plain text. Contrast is at least 4.5:1 on the tint (tone text tokens).
- The remove button is a real `button` with an `aria-label` that includes the tag text.
- Tags that are links or buttons have 24px height at minimum and 44px hit area on coarse pointers for the remove control.

| Key | Action |
| --- | --- |
| Tab | Moves to a link tag, a button tag or a remove button |
| Enter, Space | Activates a button tag or the remove button (Enter for a link) |

## Razor

`ds-tag` and `ds-pill` live in `DsTagHelpers.cs`:

```cshtml
<ds-tag tone="Info">Trial</ds-tag>
<ds-tag tone="Success"><ds-icon name="check" />Verified</ds-tag>
```

Outline, size and removable variants are written with the classes above until `ds-tag` gains `outline` and `size` attributes.

## Tokens

`--ds-tone`, `--ds-tone-text`, `--ds-radius-md`, `--ds-radius-full`, `--ds-focus`, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-ease-standard`.

## Native and daisyUI

Plain `span`, `a` or `button`. It replaces daisyUI `badge` for labels; daisyUI `badge` stays for existing markup. Related: [chip](./chip.md) for selectable and removable chips in a field.
