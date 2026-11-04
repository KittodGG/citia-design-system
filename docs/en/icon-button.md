---
title: Icon button
group: components
category: actions
order: 4
summary: A square or round button that shows only an icon. Four styles, five sizes, a badge slot, a tooltip and an accessible name.
source: TPS app.css .ds-icon-btn, .ds-chrome-btn
---

An icon button replaces the label with a glyph when the meaning is well known and space is short: close, copy, refresh, more. It always has an accessible name and a tooltip. Use a [button](./button.md) with text when the action is new to the user, a [toggle](./toggle.md) when the icon button switches on and off, and a [floating action button](./fab.md) for the one main action of a screen.

## Examples

### Styles

Standard is a plain glyph. Filled, tonal and outlined add emphasis in that order.

```html preview title="Standard, filled, tonal, outlined"
<div class="ds-actions is-start">
  <button type="button" class="ds-icon-button" aria-label="Edit invoice" title="Edit invoice"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg></button>
  <button type="button" class="ds-icon-button is-filled" aria-label="Add a line item" title="Add a line item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-icon-button is-tonal" aria-label="Share" title="Share"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-share"></use></svg></button>
  <button type="button" class="ds-icon-button is-outlined" aria-label="Download PDF" title="Download PDF"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg></button>
  <button type="button" class="ds-icon-button is-tonal is-danger" aria-label="Delete draft" title="Delete draft"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg></button>
</div>
```

### Sizes and shape

`is-xs` 28px, `is-sm` 32px, medium 40px, `is-lg` 48px, `is-xl` 56px. `is-round` makes a circle. On touch screens every size has a 44px hit area.

```html preview title="Sizes, square and round"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-icon-button is-outlined is-xs" aria-label="Refresh"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
  <button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Refresh"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
  <button type="button" class="ds-icon-button is-outlined" aria-label="Refresh"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
  <button type="button" class="ds-icon-button is-outlined is-lg" aria-label="Refresh"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
  <button type="button" class="ds-icon-button is-outlined is-xl" aria-label="Refresh"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
  <button type="button" class="ds-icon-button is-filled is-round" aria-label="Play"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-play"></use></svg></button>
  <button type="button" class="ds-icon-button is-tonal is-round is-lg" aria-label="Pause"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pause"></use></svg></button>
</div>
```

### Badge

A count or a dot sits on the top corner. The accessible name carries the number, because the badge itself is `aria-hidden`.

```html preview title="Badge and dot"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-icon-button is-outlined" aria-label="Notifications, 3 unread" title="Notifications">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"></use></svg>
    <span class="ds-icon-button__badge" aria-hidden="true">3</span>
  </button>
  <button type="button" class="ds-icon-button is-outlined" aria-label="Messages, new" title="Messages">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-mail"></use></svg>
    <span class="ds-icon-button__badge is-dot" aria-hidden="true"></span>
  </button>
  <button type="button" class="ds-icon-button is-outlined" aria-label="Alerts, 12 need attention" title="Alerts">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg>
    <span class="ds-icon-button__badge is-error" aria-hidden="true">12</span>
  </button>
</div>
```

### Toggleable

`aria-pressed` turns it into a toggle. The selected style is a tonal fill and a 2px edge. Provide a pressed glyph when it helps.

```html preview title="Pressed"
<div class="ds-actions is-start">
  <button type="button" class="ds-icon-button is-outlined" data-ds-toggle aria-pressed="false" aria-label="Bookmark" title="Bookmark">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg>
  </button>
  <button type="button" class="ds-icon-button is-outlined" data-ds-toggle aria-pressed="true" aria-label="Star" title="Star">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-star"></use></svg>
  </button>
</div>
```

### Version 1 controls

`.ds-icon-btn` (36px, quiet teal, for dense tables) and `.ds-chrome-btn` (44px, no border, for top bars and dialogs) keep working and now share the same states.

```html preview title=".ds-icon-btn and .ds-chrome-btn"
<div class="ds-actions is-start" style="align-items:center">
  <a class="ds-icon-btn" href="#" aria-label="Edit project PRJ-1024" title="Edit project PRJ-1024"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg></a>
  <button type="button" class="ds-icon-btn is-danger" aria-label="Delete project PRJ-1024" title="Delete project PRJ-1024"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg></button>
  <button type="button" class="ds-chrome-btn" aria-label="Go back" data-ds-back="/"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-arrow-left"></use></svg></button>
  <button type="button" class="ds-chrome-btn" aria-label="Toggle theme" data-ds-theme-toggle><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-moon"></use></svg></button>
</div>
```

## States

```html preview title="Icon button states"
<div style="overflow-x:auto"><table style="border-collapse:separate;border-spacing:.25rem .5rem;font-size:.8125rem"><thead><tr><th></th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Rest</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Hover</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Focus</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Pressed</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Selected</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Disabled</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">aria-disabled</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Loading</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Success</th></tr></thead><tbody>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Standard</th><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Bookmark"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Bookmark" data-ds-demo="hover"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Bookmark" data-ds-demo="focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Bookmark" data-ds-demo="pressed"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Bookmark" aria-pressed="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Bookmark" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Bookmark" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Bookmark" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-success is-sm" aria-label="Bookmark"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Filled</th><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Bookmark"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Bookmark" data-ds-demo="hover"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Bookmark" data-ds-demo="focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Bookmark" data-ds-demo="pressed"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Bookmark" aria-pressed="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Bookmark" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Bookmark" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Bookmark" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-success is-sm" aria-label="Bookmark"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Tonal</th><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Bookmark"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Bookmark" data-ds-demo="hover"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Bookmark" data-ds-demo="focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Bookmark" data-ds-demo="pressed"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Bookmark" aria-pressed="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Bookmark" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Bookmark" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Bookmark" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-success is-sm" aria-label="Bookmark"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Outlined</th><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Bookmark"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Bookmark" data-ds-demo="hover"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Bookmark" data-ds-demo="focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Bookmark" data-ds-demo="pressed"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Bookmark" aria-pressed="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Bookmark" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Bookmark" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Bookmark" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-success is-sm" aria-label="Bookmark"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Danger</th><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Bookmark"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Bookmark" data-ds-demo="hover"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Bookmark" data-ds-demo="focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Bookmark" data-ds-demo="pressed"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Bookmark" aria-pressed="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Bookmark" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Bookmark" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Bookmark" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-success is-sm" aria-label="Bookmark"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td></tr>
</tbody></table></div>
```

```html preview title="Version 1 and chrome states"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-icon-btn" aria-label="Edit"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg></button>
  <button type="button" class="ds-icon-btn" aria-label="Edit" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg></button>
  <button type="button" class="ds-icon-btn" aria-label="Refreshing" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
  <button type="button" class="ds-chrome-btn" aria-label="Menu" aria-expanded="true"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-menu"></use></svg></button>
  <button type="button" class="ds-chrome-btn" aria-label="Menu" disabled><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-menu"></use></svg></button>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | None | Standard: glyph only. Filled: teal fill. Tonal: 12% tint. Outlined: 1px edge |
| Hover | Pointer over, on devices that hover | State layer 6% (10% on filled); 150ms |
| Focus-visible | Keyboard focus | 2px `--ds-focus` ring, 2px offset |
| Pressed | Pointer down | Layer 10% (16% on filled), scale 0.97 over 120ms |
| Selected | `aria-pressed="true"` | Tonal fill, tone colour, 2px edge |
| Disabled | `disabled` | 55% opacity, `not-allowed`, no hover or press |
| aria-disabled | `aria-disabled="true"` | Same look, focusable, reason in `title` and a description |
| Loading | `aria-busy="true"` | Spinner replaces the glyph in the same box; clicks blocked |
| Success | `.is-success`, `.is-copied` | Tonal green with a check glyph for 1.6 to 2 seconds; `data-ds-copy` applies it |
| Danger | `.is-danger` | Error text colour in every state |
| Reduced motion | `prefers-reduced-motion` | No press scale; spinner becomes a dotted ring |

## Anatomy

- `.ds-icon-button`: the control (`button`, `a`, `summary`), a square box.
- Style: none (standard), `is-filled`, `is-tonal`, `is-outlined`. Tone: `is-danger`, or `btn-success`, `btn-warning`, `btn-info`.
- Size: `is-xs`, `is-sm`, medium, `is-lg`, `is-xl`. Shape: `is-round`.
- `.ds-icon`: the glyph (14px, 16px, 18px, 20px, 24px by size).
- `.ds-icon-button__badge`: count or dot, `is-dot`, `is-error`. Always `aria-hidden`.
- Version 1: `.ds-icon-btn` (36px), `.ds-chrome-btn` (44px).

## Usage

- Use a glyph people know: close, copy, search, refresh, more, delete. For anything else write a label.
- Give every icon button an `aria-label` that names the action and the object ("Delete invoice INV-2026-0418"), and the same text in `title`.
- Keep targets 24px or larger on desktop. Prefer `is-sm` or medium; use `is-xs` only in dense toolbars.
- Put a count in the badge only when it is under 100; show `99+` above that.
- Do not use an icon button for the single most important action on a page; use a labelled [button](./button.md) or a [FAB](./fab.md).
- Do not rely on colour for meaning: a red icon button still needs the right glyph and name.

## Accessibility

- The accessible name comes from `aria-label`. `title` supplies the tooltip for pointer users but is not a name on its own.
- A badge is decorative. Put its number in the name ("Notifications, 3 unread") so screen readers hear it.
- A toggling icon button uses `aria-pressed` and keeps the same name in both states ("Bookmark", not "Remove bookmark").
- Touch targets are 44px on `(pointer: coarse)`; compact sizes extend the hit area with a pseudo-element.
- Contrast: glyph 3:1 against its background in every state, in light and dark. The outlined edge is 3:1.

| Key | Action |
| --- | --- |
| Tab, Shift+Tab | Move focus |
| Enter, Space | Activate (anchors: Enter only) |

## Razor

```cshtml
<ds-icon-button icon="pencil" label="Edit invoice INV-2026-0418" variant="outlined" size="sm" />
<ds-icon-button icon="bell" label="Notifications" badge="3" variant="outlined" />
<ds-icon-button icon="trash" label="Delete draft" variant="tonal" tone="danger" />
<ds-icon-button icon="refresh" label="Refresh" loading="true" />
<ds-icon-button icon="share" label="Share" disabled-reason="Publish the project first" />
```

| Attribute | Effect |
| --- | --- |
| `icon`, `label` | Icon name and accessible name. `label` is also the tooltip |
| `variant` | `standard` (default), `filled`, `tonal`, `outlined` |
| `tone` | `danger`, `success`, `warning`, `info`, `neutral`, `accent` |
| `size` | `xs`, `sm`, `md` (default), `lg`, `xl` |
| `round` | Circle |
| `badge`, `badge-dot` | Count or dot; the count is added to the accessible name |
| `pressed` | `aria-pressed` |
| `loading`, `disabled`, `disabled-reason`, `href` | As on [button](./button.md) |

## JavaScript

Icon buttons share the [button](./button.md) API: `DS.button.loading(el, on)` and `DS.button.success(el)`. With `data-ds-toggle` the control flips `aria-pressed` and fires `ds:toggle:change`. `data-ds-copy` and `data-ds-copy-text` copy text and show the success state.

## Tokens

`--ds-size-target`, `--ds-size-target-compact`, `--ds-radius-md|lg|full`, `--color-base-content`, `--ds-quiet`, `--ds-error-text`, `--ds-control-border`, `--color-primary`, `--ds-opacity-state-*`, `--ds-opacity-disabled`, `--ds-press-scale`, `--ds-type-micro-size|weight`.

## Native and daisyUI

`.ds-icon-button` is a `button` (or `a`) that uses the same state engine as `.btn`, so it accepts the same variant and tone classes. daisyUI's `btn btn-ghost btn-square` still works; the DS component adds the filled, tonal and outlined styles, round shape, badge slot and sizes.
