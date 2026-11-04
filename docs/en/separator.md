---
title: Separator
group: components
category: layout
order: 30
summary: A hairline that divides content, horizontal or vertical, inset or full width, with an optional label such as "or", either semantic or purely decorative.
---

Use a separator to mark a change of topic or group related items: between sections of a card, between settings groups, between toolbar clusters, between "sign in" and "continue with". Prefer spacing first: whitespace of 24 to 32px often divides content better than a line. Use a [card](./card.md) or a `<fieldset>` ([fieldset](./fieldset.md)) when the group needs a name.

## Examples

### Horizontal

`<hr class="ds-separator">` draws a 1px line in `--color-base-300` and carries the implicit `separator` role. The default margin is 16px above and below; `is-flush` removes it. `is-strong` uses `--ds-control-border`, `is-dashed` draws a dashed line.

```html preview title="Horizontal variants"
<div style="max-width:26rem">
  <p style="margin:0">Billing address</p>
  <hr class="ds-separator">
  <p style="margin:0">Payment method</p>
  <hr class="ds-separator is-strong">
  <p style="margin:0">Notifications</p>
  <hr class="ds-separator is-dashed">
  <p style="margin:0">Danger zone</p>
</div>
```

### Inset

`is-inset` starts the line 16px in (change it with `--ds-separator-inset`) so it aligns with the text of a list row and not with its icon. `is-inset-both` insets both ends.

```html preview title="Inset in a list"
<ul style="list-style:none;margin:0;padding:0;max-width:22rem">
  <li style="padding:.5rem 1rem">Ayu Lestari</li>
  <li role="presentation"><hr class="ds-separator is-inset is-flush"></li>
  <li style="padding:.5rem 1rem">Daniel Okafor</li>
  <li role="presentation"><hr class="ds-separator is-inset is-flush"></li>
  <li style="padding:.5rem 1rem">Mei Tanaka</li>
</ul>
```

### Vertical

A vertical separator stretches to the height of its flex or grid row. Use it between toolbar groups or inline metadata. Add `aria-orientation="vertical"` when it is semantic.

```html preview title="Vertical in a toolbar"
<div style="display:flex;align-items:center;gap:.25rem;min-height:2rem">
  <button type="button" class="btn btn-ghost btn-sm">Bold</button>
  <button type="button" class="btn btn-ghost btn-sm">Italic</button>
  <div class="ds-separator is-vertical" role="separator" aria-orientation="vertical"></div>
  <button type="button" class="btn btn-ghost btn-sm">Link</button>
  <button type="button" class="btn btn-ghost btn-sm">Quote</button>
</div>
```

### With a label

A label breaks the line: `<div class="ds-separator has-label">or</div>`. The lines are pseudo-elements, so the text stays in the reading order and is read. `is-start` and `is-end` pull the label to one side (a section heading such as "Today").

```html preview title="Labelled separators"
<div style="max-width:24rem">
  <button type="button" class="btn btn-primary" style="width:100%">Sign in</button>
  <div class="ds-separator has-label">or</div>
  <button type="button" class="btn" style="width:100%">Continue with a passkey</button>
  <div class="ds-separator has-label is-start">Today</div>
  <p style="margin:0">Invoice INV-2026-0418 was paid.</p>
  <div class="ds-separator has-label is-end is-strong">Yesterday</div>
  <p style="margin:0">Project PRJ-1024 was archived.</p>
</div>
```

### Decorative and semantic

A semantic separator is exposed to assistive technology (`<hr>` or `role="separator"`). A decorative one is not (`role="none"` or `aria-hidden="true"`). Choose by whether the division changes how the content is read.

```html preview title="Decorative and semantic"
<div style="max-width:26rem">
  <p style="margin:0">Semantic: screen readers announce "separator" between two topics.</p>
  <hr class="ds-separator">
  <p style="margin:0">Decorative: extra rule between two cards, already divided by headings.</p>
  <div class="ds-separator" role="none"></div>
  <p style="margin:0">End.</p>
</div>
```

## States

A separator is static. The table lists the variants and environments so nothing is left implicit.

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | 1px, `--color-base-300`, 16px margin above and below |
| Strong | `is-strong` | `--ds-control-border` (3:1 against the surface) |
| Dashed | `is-dashed` | Dashed 1px |
| Inset | `is-inset`, `is-inset-both` | Starts 16px from the edge (`--ds-separator-inset`) |
| Vertical | `is-vertical` | 1px wide, full row height, 12px side margins |
| Labelled | `has-label` | Text in `--ds-subtle`, 12px, weight 600, line on both sides (`is-start`/`is-end`: a 24px line on one side) |
| Interaction | Not applicable | Never focusable, no hover or press |
| Dark | `data-theme="dark"` | Line is the dark `--color-base-300` |
| More contrast | `prefers-contrast: more` | `--color-base-300` becomes a 45% mix of the text colour |
| Forced colours | `forced-colors: active` | Lines use `CanvasText` (borders, not backgrounds, so they survive) |
| RTL | `dir="rtl"` | Inset and the labelled start side follow the writing direction |
| Print | `@media print` | Printed as a rule |

## Anatomy

- `.ds-separator`: the line, on an `<hr>` or a `div`.
- `.is-strong`, `.is-dashed`, `.is-flush`, `.is-inset`, `.is-inset-both`, `.is-vertical`: variants.
- `.has-label` (+ `.is-start`, `.is-end`): flex row with a line on each side of the text.

## Usage

- Use one level of separator. If you need a hierarchy, use headings and spacing, not three kinds of line.
- Do not put a separator between every list row and also give the rows borders; pick one.
- Use `is-inset` in lists with leading icons or avatars; use the full width in cards and menus.
- Keep labels to one or two words ("or", "Today", "Optional"). Longer text is a heading.
- Do not use a separator as a replacement for margin; leave `is-flush` for cases where the container sets the gap.
- Do not use a vertical separator inside text that wraps; it will stretch to the tallest line.

## Accessibility

- `<hr>` has the implicit role `separator`; a `div` needs `role="separator"` (add `aria-orientation="vertical"` for vertical ones). Horizontal is the default orientation.
- Decorative lines use `role="none"` (or `aria-hidden="true"`, or a CSS border on the neighbouring element) so screen readers do not announce a "separator" for every visual rule.
- A labelled separator is plain text between two lines. It is not `role="separator"` because a separator's children are presentational and the word would be lost.
- Separators are not focusable and need no keys.
- The lines reach 1.2 to 1.5:1 against the surface by design: they are decoration, not boundaries of a control. Use `is-strong` (3:1) when the line is the only thing that marks a boundary.

## Razor

```cshtml
<ds-separator />
<ds-separator inset />
<ds-separator decorative />
<ds-separator label="or" />
<ds-separator label="Today" align="Start" strong />
<ds-separator vertical />
```

| Attribute | Effect |
| --- | --- |
| `label` | Text between two lines (`div.ds-separator.has-label`) |
| `align` | `Start` or `End` with a label |
| `vertical` | Inline vertical rule; `role="separator"` with `aria-orientation="vertical"` |
| `decorative` | `role="none"` instead of `<hr>` |
| `inset`, `strong`, `dashed`, `flush` | Variants |

## Tokens

`--color-base-300`, `--ds-control-border`, `--ds-subtle`, `--ds-separator-inset` (default `--ds-space-4`), `--ds-space-3`, `--ds-space-4`, `--ds-space-6`, `--ds-type-caption-size`, `--ds-type-caption-leading`, `--ds-weight-semibold`.

## Native and daisyUI

It is the native `<hr>` (or a `div` with `role="separator"`) with its default styling reset. daisyUI's `divider` class draws a labelled line too; `.ds-separator` uses borders so the line survives forced colours, keeps the label in the reading order, and follows the DS tokens.
