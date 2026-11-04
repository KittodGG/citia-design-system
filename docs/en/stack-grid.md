---
title: Stack and grid
group: components
category: layout
order: 5
summary: Layout primitives with gap tokens: stack (vertical), cluster (wrapping row), grid (auto-fit columns), split (side and main) and center.
---

These five primitives place things without custom CSS. Pick by the shape you want: a column (`.ds-stack`), a wrapping row (`.ds-cluster`), equal columns that fit the space (`.ds-grid`), a fixed side beside a flexible main (`.ds-split`), a centred measure (`.ds-center`). They set only layout and gap, never colour. For page width use [Container](./container.md).

## Examples

### Stack and cluster

```html preview title="Stack with a cluster of actions"
<div class="ds-stack is-gap-md">
  <div class="ds-stack is-gap-xs"><strong>Harbour Street renovation</strong><span>PRJ-1024, due 30 Nov 2026</span></div>
  <div class="ds-cluster is-gap-sm">
    <span class="badge badge-success badge-soft">Active</span><span class="badge badge-soft">12 tasks</span><span class="badge badge-soft">Daniel Okafor</span>
  </div>
  <div class="ds-cluster is-end"><button type="button" class="btn btn-outline">Archive</button><button type="button" class="btn btn-primary">Open</button></div>
</div>
```

### Grid

`--ds-grid-min` sets the narrowest column (16rem by default); columns fill the row and wrap. `is-cols-2|3|4` give fixed counts that drop to 2 and 1 on narrow screens.

```html preview title="Auto-fit grid"
<div class="ds-grid is-min-sm is-gap-md">
  <div class="ds-surface" style="padding: 1rem">INV-2026-0418<br>1,240.00</div>
  <div class="ds-surface" style="padding: 1rem">INV-2026-0419<br>380.50</div>
  <div class="ds-surface" style="padding: 1rem">INV-2026-0420<br>2,905.00</div>
  <div class="ds-surface" style="padding: 1rem">INV-2026-0421<br>96.00</div>
</div>
```

### Split and center

The side column keeps `--ds-split-side` (16rem) and the main column takes the rest. When the main column would drop under 50%, they stack.

```html preview title="Split"
<div class="ds-split is-gap-lg">
  <aside class="ds-surface" style="padding: 1rem">Filters: status, owner, date</aside>
  <div class="ds-stack"><div class="ds-surface" style="padding: 1rem">Mei Tanaka, 4 open tasks</div><div class="ds-surface" style="padding: 1rem">Sofia Marquez, 2 open tasks</div></div>
</div>
<div class="ds-center is-text" style="margin-top: 1.5rem"><p>No invoices match this filter.</p></div>
```

## Gap tokens

Add `.is-gap-*` to stack, cluster, grid or split. The default is `md`.

| Class | Token | Value |
| --- | --- | --- |
| `.is-gap-0` | none | 0 |
| `.is-gap-xs` | `--ds-space-1` | 4px |
| `.is-gap-sm` | `--ds-space-2` | 8px |
| `.is-gap-md` | `--ds-space-4` | 16px |
| `.is-gap-lg` | `--ds-space-6` | 24px |
| `.is-gap-xl` | `--ds-space-8` | 32px |
| `.is-gap-2xl` | `--ds-space-12` | 48px |

## States

Primitives have no interactive states. Their states are about space.

| State | Trigger | Appearance |
| --- | --- | --- |
| Wide | Plenty of room | Grid columns grow to `1fr`; cluster stays on one row |
| Narrow | Under the minimum column width | Grid collapses to one column; cluster wraps; split stacks |
| Empty cell | Fewer items than columns | `auto-fit` stretches the items; `auto-fill` keeps empty tracks |
| Long content | Text longer than a column | `min-width: 0` on children lets text wrap instead of overflowing |
| Right-to-left | `dir="rtl"` | Order mirrors; `.is-reverse` on a split swaps sides |
| Print | `@media print` | Same layout; no fixed heights |

## Anatomy

- `.ds-stack` modifiers `.is-center`, `.is-end`, `.is-stretch`.
- `.ds-cluster` modifiers `.is-start`, `.is-baseline`, `.is-end`, `.is-center`, `.is-between`, `.is-nowrap`.
- `.ds-grid` modifiers `.is-min-xs|sm|md|lg|xl` (10, 13, 16, 22, 30rem), `.is-fill`, `.is-stretch`, `.is-cols-2|3|4`; children `.is-span-2`, `.is-span-full`.
- `.ds-split` modifiers `.is-reverse`, `.is-side-sm|md|lg` (12, 16, 22rem). The first child is the side.
- `.ds-center` modifiers `.is-text`, `.is-intrinsic`, `.is-both`; variable `--ds-center-max`.

## Usage

- Use gaps instead of margins on children, so removing an item leaves no stray space.
- Use `.ds-grid` for cards of equal weight and `.ds-split` for a list beside a detail.
- Keep nesting to three levels; beyond that, name a component.
- Do not use these for a data table (see [Table](./table.md)) or a form layout (see [Form](./form.md)).

## Accessibility

Primitives are generic elements and add no roles. DOM order is the reading order: do not use `.is-reverse` or `order` to change the sequence of meaning. Targets inside keep 24px minimum and 44px on touch; gaps of 8px or more keep adjacent targets apart.

## Tokens

`--ds-space-1`, `-2`, `-4`, `-6`, `-8`, `-12`, `--ds-gap`, `--ds-grid-min`, `--ds-split-side`, `--ds-center-max`, `--ds-size-measure`.

## Native and daisyUI

Plain flexbox and CSS grid with the `gap` property. They sit beside Tailwind's `flex`, `grid` and `gap-*` utilities, which you can still use; the primitives add the token scale and the wrapping behaviour. The version 1 `.ds-grid-2` and `.ds-grid-3` classes are unchanged.
