---
title: Button
group: components
category: actions
order: 1
summary: Buttons start an action. Eight variants, four sizes, icons, full width, and every state from hover to loading and success.
source: TPS app.css L3044–3106
---

A button starts an action in the current view: save, send, export, delete. Use a [link](./link.md) when the control moves to another page, an [icon button](./icon-button.md) when the label is replaced by a glyph, a [toggle](./toggle.md) when it switches something on and off, and a [split button](./split-button.md) when one action has a few close alternatives.

## Examples

### Variants

One primary button per area. Secondary is the default `.btn`.

```html preview title="Variants"
<div class="ds-actions is-start">
  <button type="button" class="btn btn-primary">Save changes</button>
  <button type="button" class="btn">Cancel</button>
  <button type="button" class="btn btn-outline">Export</button>
  <button type="button" class="btn btn-soft">Add note</button>
  <button type="button" class="btn btn-ghost">Edit</button>
  <button type="button" class="btn btn-link">View history</button>
  <button type="button" class="btn btn-neutral">Publish</button>
</div>
```

| Variant | Class | Use for |
| --- | --- | --- |
| Primary | `btn btn-primary` | The one action the area exists for: Save changes, Send invoice |
| Secondary | `btn` or `btn btn-secondary` | Everything else that is a real action: Cancel, Apply, Save draft |
| Outline | `btn btn-outline` | A secondary action that needs a tone-coloured edge |
| Soft | `btn btn-soft` | Tonal fill for a supporting action next to a primary one |
| Ghost (tertiary) | `btn btn-ghost` or `btn-tertiary` | Row and toolbar actions: Edit, Options |
| Link | `btn btn-link` | An action written as text, aligned like a button |
| Neutral | `btn btn-neutral` | A filled action in ink instead of teal: Publish, Continue |

### Destructive

Filled red confirms a deletion inside a dialog. Quiet variants start the flow from a page or a row.

```html preview title="Destructive, filled and quiet"
<div class="ds-actions is-start">
  <button type="button" class="btn btn-error">Delete invoice</button>
  <button type="button" class="btn btn-soft btn-error">Archive project</button>
  <button type="button" class="btn btn-outline btn-error">Remove member</button>
  <button type="button" class="btn btn-ghost is-danger">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>
    Delete draft
  </button>
</div>
```

The other tones follow the same pattern: `btn-success`, `btn-warning`, `btn-info`, `btn-accent`. Combine a tone with `btn-outline`, `btn-soft`, `btn-ghost` or `btn-link`.

```html preview title="Tones"
<div class="ds-actions is-start">
  <button type="button" class="btn btn-success">Approve</button>
  <button type="button" class="btn btn-warning">Review</button>
  <button type="button" class="btn btn-info">Details</button>
  <button type="button" class="btn btn-soft btn-success">Approved</button>
  <button type="button" class="btn btn-soft btn-warning">Needs review</button>
  <button type="button" class="btn btn-soft btn-info">Draft</button>
</div>
```

### Sizes

Heights are 28, 32, 40 and 48px. On touch screens every size keeps a 44px hit area.

```html preview title="xs, sm, md, lg"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="btn btn-primary btn-xs">Extra small</button>
  <button type="button" class="btn btn-primary btn-sm">Small</button>
  <button type="button" class="btn btn-primary">Medium</button>
  <button type="button" class="btn btn-primary btn-lg">Large</button>
</div>
```

### Icons

A leading icon sits before the label, a trailing icon after it (mark it `is-end`). An icon-only button is square, needs `aria-label`, and is better written as an [icon button](./icon-button.md).

```html preview title="Leading, trailing and icon only"
<div class="ds-actions is-start">
  <button type="button" class="btn btn-primary">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>
    Send invoice
  </button>
  <button type="button" class="btn">
    Next step
    <svg class="ds-icon is-end" aria-hidden="true"><use href="#ds-icon-arrow-right"></use></svg>
  </button>
  <button type="button" class="btn btn-square" aria-label="Copy invoice number">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg>
  </button>
</div>
```

### Full width

`btn-block` fills the row. Use it in forms on narrow screens and in sign-in panels.

```html preview title="Full width"
<div style="max-width:22rem;display:grid;gap:.5rem">
  <button type="button" class="btn btn-primary btn-block">Continue</button>
  <button type="button" class="btn btn-block">Use a different account</button>
</div>
```

### Link styled as a button

Navigation is an `<a>`. Style it with the same classes. It has no `disabled`; use `aria-disabled="true"` and remove the `href` only when the reason is shown.

```html preview title="Anchor button"
<div class="ds-actions is-start">
  <a class="btn btn-primary" href="#">Open project PRJ-1024</a>
  <a class="btn" href="#">All projects</a>
</div>
```

### File-type actions

`btn-excel` and `btn-pdf` use the brand colour of the format, so people recognise a spreadsheet or PDF export before reading the label. Keep them out of the primary slot.

```html preview title="Excel and PDF"
<div class="ds-actions is-start">
  <a class="btn btn-excel btn-sm" href="#" data-ds-export="Excel">
    <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg>
    Export Excel
  </a>
  <a class="btn btn-pdf btn-sm" href="#" data-ds-export="PDF">
    <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg>
    Export PDF
  </a>
  <a class="btn btn-excel btn-sm" href="#">
    <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-file-import"></use></svg>
    Import Excel
  </a>
</div>
```

`a[data-ds-export]` shows an info toast and locks the link for 15 seconds (`aria-disabled="true"`) because the browser does not say when a download ends.

### Action groups

`.ds-actions` aligns actions to the end and wraps when space runs out. `is-start` aligns to the start, `is-between` separates two groups, `is-stack` stacks the buttons on phones with the main action on top. The order is Cancel, then secondary actions, then the primary action last.

```html preview title="Form actions"
<div class="ds-actions">
  <button type="button" class="btn btn-ghost">Cancel</button>
  <button type="button" class="btn">Save draft</button>
  <button type="button" class="btn btn-primary">Send invoice</button>
</div>
```

### Dense tables

Inside `.ds-dense` every size shrinks by one step (xs 24px, sm 28px, md 36px). Touch screens still get a 44px hit area.

```html preview title="Dense"
<div class="ds-dense ds-actions is-start" style="align-items:center">
  <button type="button" class="btn btn-sm">Approve</button>
  <button type="button" class="btn btn-sm btn-ghost">Reject</button>
  <button type="button" class="btn btn-xs btn-ghost">Notes</button>
</div>
```

## States

Frozen previews of hover, focus and pressed use `data-ds-demo` on the control. That attribute exists for documentation only; real controls use `:hover`, `:focus-visible` and `:active`.

### Pointer and keyboard

```html preview title="Pointer and keyboard states"
<div style="overflow-x:auto"><table style="border-collapse:separate;border-spacing:.375rem .5rem;font-size:.8125rem"><thead><tr><th></th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Rest</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Hover</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Focus-visible</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Pressed</th></tr></thead><tbody>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Primary</th><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" data-ds-demo="hover">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" data-ds-demo="focus">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" data-ds-demo="pressed">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Secondary</th><td style="vertical-align:middle"><button type="button" class="btn btn-sm">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-sm" data-ds-demo="hover">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-sm" data-ds-demo="focus">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-sm" data-ds-demo="pressed">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Outline</th><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" data-ds-demo="hover">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" data-ds-demo="focus">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" data-ds-demo="pressed">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Soft</th><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" data-ds-demo="hover">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" data-ds-demo="focus">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" data-ds-demo="pressed">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Ghost</th><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" data-ds-demo="hover">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" data-ds-demo="focus">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" data-ds-demo="pressed">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Link</th><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" data-ds-demo="hover">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" data-ds-demo="focus">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" data-ds-demo="pressed">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Neutral</th><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" data-ds-demo="hover">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" data-ds-demo="focus">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" data-ds-demo="pressed">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Destructive</th><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" data-ds-demo="hover">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" data-ds-demo="focus">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" data-ds-demo="pressed">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Destructive, quiet</th><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" data-ds-demo="hover">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" data-ds-demo="focus">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" data-ds-demo="pressed">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Excel</th><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" data-ds-demo="hover">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" data-ds-demo="focus">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" data-ds-demo="pressed">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">PDF</th><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" data-ds-demo="hover">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" data-ds-demo="focus">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" data-ds-demo="pressed">Save</button></td></tr>
</tbody></table></div>
```

### Selection, availability and activity

Selected is `aria-pressed="true"`. Disabled uses the native attribute. `aria-disabled` keeps focus and explains itself. Loading is `aria-busy="true"`. Success is the transient class `is-success`.

```html preview title="Selection, availability, activity"
<div style="overflow-x:auto"><table style="border-collapse:separate;border-spacing:.375rem .5rem;font-size:.8125rem"><thead><tr><th></th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Selected</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Disabled</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">aria-disabled</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Loading</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Success</th></tr></thead><tbody>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Primary</th><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" aria-pressed="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" disabled>Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" aria-disabled="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" aria-busy="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary is-success btn-sm">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Secondary</th><td style="vertical-align:middle"><button type="button" class="btn btn-sm" aria-pressed="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-sm" disabled>Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-sm" aria-disabled="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-sm" aria-busy="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn is-success btn-sm">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Outline</th><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" aria-pressed="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" disabled>Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" aria-disabled="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" aria-busy="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline is-success btn-sm">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Soft</th><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" aria-pressed="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" disabled>Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" aria-disabled="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" aria-busy="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft is-success btn-sm">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Ghost</th><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" aria-pressed="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" disabled>Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" aria-disabled="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" aria-busy="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-success btn-sm">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Link</th><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" aria-pressed="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" disabled>Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" aria-disabled="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" aria-busy="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link is-success btn-sm">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Neutral</th><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" aria-pressed="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" disabled>Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" aria-disabled="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" aria-busy="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral is-success btn-sm">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Destructive</th><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" aria-pressed="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" disabled>Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" aria-disabled="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" aria-busy="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error is-success btn-sm">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Destructive, quiet</th><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" aria-pressed="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" disabled>Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" aria-disabled="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" aria-busy="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger is-success btn-sm">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Excel</th><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" aria-pressed="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" disabled>Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" aria-disabled="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" aria-busy="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel is-success btn-sm">Save</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">PDF</th><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" aria-pressed="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" disabled>Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" aria-disabled="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" aria-busy="true">Save</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf is-success btn-sm">Save</button></td></tr>
</tbody></table></div>
```

```html preview title="aria-disabled with a reason"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="btn btn-primary" aria-disabled="true" aria-describedby="why-send" title="Add a client first">Send invoice</button>
  <p id="why-send" class="ds-text-subtle">Add a client before you send this invoice.</p>
</div>
```

```html preview title="Loading with a label"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="btn btn-primary" aria-busy="true">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>
    Sending…
  </button>
  <button type="button" class="btn" aria-busy="true">Saving draft…</button>
  <button type="button" class="btn btn-square" aria-busy="true" aria-label="Refreshing">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg>
  </button>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | None | Per variant. Every level is visible at rest; hover and press only deepen it |
| Hover | Pointer over, on devices that hover | State layer: 6% on secondary, outline, soft, ghost; 10% deeper on filled. 150ms |
| Focus-visible | Keyboard or programmatic focus | 2px `--ds-focus` ring, 2px offset. No ring after a mouse click |
| Pressed | Pointer down, Space or Enter held | State layer at 10% (16% on filled) and `scale(0.97)` over 120ms. Applied on pointer-down, not on release |
| Selected | `aria-pressed="true"`, `aria-checked="true"`, `aria-current`, `.is-selected` | 12% tone fill, tone text, 2px edge. A shape cue as well as colour |
| Disabled | `disabled` or `.btn-disabled` | 55% opacity, `cursor: not-allowed`, no hover or press. A native disabled button is not focusable |
| aria-disabled | `aria-disabled="true"` | Same look as disabled. Stays focusable, ignores clicks, explains why through `title` and a description |
| Loading | `aria-busy="true"` | Spinner replaces the leading icon, width does not change, no hover or press, clicks blocked, `cursor: progress` |
| Success | `.is-success` for 1.6 to 2 seconds | Tonal green fill, check glyph in place of the leading icon, then back to rest |
| Reduced motion | `prefers-reduced-motion: reduce` | No press scale, spinner becomes a still dotted ring; colour changes stay |
| Forced colours | `forced-colors: active` | System border colours, `GrayText` when disabled, `Highlight` when selected |

## Anatomy

- `.btn`: the button, any element (`button`, `a`, `summary`, `input type="submit"`).
- Variant class: `btn-primary`, `btn-outline`, `btn-soft`, `btn-ghost` (`btn-tertiary`), `btn-link`, `btn-neutral`, tone classes, `btn-excel`, `btn-pdf`.
- Size class: `btn-xs`, `btn-sm`, none for medium, `btn-lg`, `btn-xl`.
- Shape class: `btn-square`, `btn-circle`, `btn-block`, `btn-wide`.
- `.ds-icon`: leading icon; add `is-end` for a trailing one.
- `.ds-btn__label`: optional wrapper around the text, used by the tag helper and by `DS.button.loading` to swap the label without touching icons.
- State hooks: `aria-pressed`, `aria-disabled`, `aria-busy`, `.is-success`, `.is-selected`.

## Usage

- Use one primary button per area. A second filled button next to it is a neutral or secondary one.
- Write the verb and the object: "Send invoice", "Archive project". Avoid "OK", "Submit", "Yes".
- Put the primary action last (end of the row). Cancel comes before it.
- Show an `aria-disabled` button with a reason (a line of text next to it) instead of hiding the button or disabling it silently.
- Show loading when an action takes longer than 300ms. Faster actions need no spinner; the library waits 300ms before it draws one.
- Keep labels to one line when you can. Labels wrap when space runs out and Indonesian strings run about 40% longer, so never set a fixed width.
- Do not put two primary buttons side by side, do not hide actions until hover, and do not move the button on hover.
- Do not use `btn-excel` or `btn-pdf` for anything that is not a file of that type.
- For a destructive action from a page, open a confirmation dialog first; the confirm button in the dialog is the filled red one.

## Accessibility

- A button needs an accessible name: visible text, or `aria-label` for icon-only buttons. Icons next to text are `aria-hidden="true"`.
- Use `<button>` for actions and `<a href>` for navigation. A link styled as a button keeps link semantics.
- `aria-disabled="true"` keeps the button in the tab order so people can read why it is unavailable. The library blocks its click; add the reason as visible text and `aria-describedby`.
- Loading sets `aria-busy="true"` and announces the label through a polite live region. The label stays in the button.
- Selected state is never colour alone: the fill changes and the edge grows to 2px.
- Contrast: 4.5:1 for labels, 3:1 for edges and icons, in light and dark. Disabled controls are exempt.
- Target size: 44 by 44px on `(pointer: coarse)` for every size; compact sizes keep their look and extend the hit area.

| Key | Action |
| --- | --- |
| Tab, Shift+Tab | Move focus to the next or previous button |
| Enter | Activate a button or a link |
| Space | Activate a button (not a link) |

## Razor

```cshtml
<form method="post" asp-action="Save" data-ds-once>
    <div class="ds-actions">
        <ds-button href="@Url.Action("Index")">Cancel</ds-button>
        <ds-button type="submit" name="command" value="draft" loading-label="Saving…">Save draft</ds-button>
        <ds-button type="submit" variant="primary" icon="send" loading-label="Sending…">Send invoice</ds-button>
    </div>
</form>

<ds-button variant="ghost" tone="danger" icon="trash">Delete draft</ds-button>
<ds-button variant="primary" disabled-reason="Add a client first">Send invoice</ds-button>
<ds-button variant="primary" loading="true" loading-label="Sending…">Send invoice</ds-button>
```

| Attribute | Effect |
| --- | --- |
| `variant` | `primary`, `secondary` (default), `outline`, `soft`, `ghost`, `link`, `neutral`, `destructive`, `success`, `warning`, `info`, `accent`, `excel`, `pdf` |
| `tone` | Colours the quiet variants: `danger`, `success`, `warning`, `info`, `neutral`, `accent` |
| `size` | `xs`, `sm`, `md` (default), `lg`, `xl` |
| `icon`, `icon-end` | Icon name before or after the label |
| `icon-only` | Square button; the content becomes `aria-label` |
| `href`, `external` | Renders an anchor; `external` adds `target="_blank"`, `rel` and hidden "(opens in a new tab)" text |
| `type` | `button` (default), `submit`, `reset` |
| `loading`, `loading-label` | `aria-busy`; the label shown while busy (also `data-ds-loading-label` for submit buttons) |
| `disabled`, `disabled-reason` | Native disabled, or `aria-disabled` with the reason as title and description |
| `pressed`, `selected` | `aria-pressed`, or the selected look |
| `full-width` | `btn-block` |

## JavaScript

| Attribute or API | Effect |
| --- | --- |
| `form[data-ds-once]` | The form rejects a second submit. The pressed submit button shows the busy state after 300ms |
| `button[data-ds-loading-label]` | Text that replaces the label of the pressed submit button |
| `DS.button.loading(el, on, { label, delay })` | Blocks the button at once; sets `aria-busy` and the spinner after `delay` (300ms). Keeps the width |
| `DS.button.success(el, { label, duration })` | Success flash for 1.6 to 2 seconds, then rest |
| `[data-ds-copy]` | Copies text; the button shows the success look for 1.5 seconds |

Events: `ds:button:loading` (`detail.loading`), `ds:button:success`. Clicks on `aria-disabled`, `.btn-disabled` and busy controls are cancelled in the capture phase.

```js
const button = document.querySelector("#send");
DS.button.loading(button, true, { label: "Sending…" });
await fetch("/invoices/INV-2026-0418/send", { method: "POST" });
DS.button.success(button, { label: "Sent" });
```

## Tokens

`--color-primary`, `--color-primary-content`, `--color-base-100`, `--color-base-content`, `--ds-control-border`, `--ds-quiet`, `--ds-link`, `--ds-error-text`, `--ds-warning-text`, `--ds-excel`, `--ds-pdf`, `--ds-focus`, `--ds-border-focus`, `--ds-radius-md|lg|box`, `--ds-size-target`, `--ds-opacity-state-hover|pressed|selected|drag`, `--ds-opacity-disabled`, `--ds-press-scale`, `--ds-duration-instant|fast|tracker`, `--ds-ease-standard|out`, `--ds-type-callout-size`.

## Native and daisyUI

The button builds on daisyUI `.btn`. The DS keeps its class names and replaces the colour, state and size rules:

- Colours come from one state engine, so every variant has the same hover, pressed, selected, disabled and busy behaviour in both themes. Hover applies only on devices that hover.
- `btn-secondary` is the neutral surface button, not a teal fill. `btn-ghost` is borderless text; for a visible teal edge use `btn-outline`.
- Disabled keeps the variant colours at 55% opacity instead of the grey daisyUI fill, and the button stays hoverable so the cursor can say `not-allowed`.
- Sizes are 28, 32, 40, 48 and 56px, with a 44px target on touch screens.
- `.ds-icon-btn`, `.ds-chrome-btn`, `.ds-actions`, `.ds-dense`, `btn-excel` and `btn-pdf` from version 1 keep working.
