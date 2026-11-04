---
title: Container
group: components
category: layout
order: 3
summary: A centred column with a maximum width (sm to xl, prose, full) and responsive side padding.
---

A container limits the width of content and centres it, so lines stay readable and pages look the same on a laptop and a wide monitor. Use it for marketing pages, documents and pages outside the [App shell](./app-shell.md); inside the shell, set the width on `.ds-main` instead. To arrange items inside the container use [Stack and grid](./stack-grid.md).

## Examples

```html preview title="Widths"
<div class="ds-stack">
  <div class="ds-container is-sm"><div class="ds-surface" style="padding: 0.75rem">sm: 40rem</div></div>
  <div class="ds-container is-md"><div class="ds-surface" style="padding: 0.75rem">md: 48rem</div></div>
  <div class="ds-container is-lg"><div class="ds-surface" style="padding: 0.75rem">lg: 64rem</div></div>
  <div class="ds-container is-prose"><div class="ds-surface" style="padding: 0.75rem">prose: 65ch, for long text</div></div>
</div>
```

| Class | Max width | Side padding |
| --- | --- | --- |
| `.is-sm` | 40rem | 16px, 24px from 640px, 32px from 1024px |
| `.is-md` | 48rem | same |
| `.is-lg` | 64rem | same |
| `.is-xl` (default) | 80rem | same |
| `.is-prose` | 65ch | same |
| `.is-full` | none | same |
| `.is-flush` | unchanged | 0 |

## States

A container has no interactive states. Its responsive behaviour is the state that matters.

| State | Trigger | Appearance |
| --- | --- | --- |
| Wide viewport | Wider than the max width | Centred; free space on both sides |
| Narrow viewport | Narrower than the max width | Full width minus the padding |
| 320px and 200% zoom | Smallest width | 16px padding, no horizontal scroll |
| Right-to-left | `dir="rtl"` | Logical padding; same result mirrored |
| Flush | `.is-flush` | No side padding, for full-bleed children |

## Anatomy

- `.ds-container`: the block. Variables `--ds-container-max` and `--ds-container-pad`.

## Usage

- Use `.is-prose` for text and `.is-lg` or `.is-xl` for pages with columns.
- Nest at most one container; nest primitives ([Stack and grid](./stack-grid.md)) instead.
- Use `.is-flush` for a hero or image that must reach the edges, and keep its text in a normal container.
- Do not set a fixed pixel width on text containers; Indonesian text is about 30% longer.

## Accessibility

A container is a plain `div` with no role. Keep reading order equal to visual order. At 200% zoom the padding keeps text off the edge, and reflow (WCAG 1.4.10) holds down to 320px.

## Razor

```cshtml
<ds-container size="lg">
    <h1>Pricing</h1>
</ds-container>
<ds-container size="prose" flush>...</ds-container>
```

Attributes: `size` (`sm`, `md`, `lg`, `xl`, `prose`, `full`), `flush`.

## Tokens

`--ds-size-measure` (65ch), `--ds-space-*` through the padding values, `--ds-container-max`, `--ds-container-pad` (local).

## Native and daisyUI

A plain `div`. It is the counterpart of daisyUI's absence of a container: Tailwind's `container` utility has fixed breakpoints; this one scales by max width and keeps logical padding.
