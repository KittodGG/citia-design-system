---
title: Shape and elevation
group: foundations
order: 5
summary: Radius tokens, 1px hairlines, shadow levels, the z-index layers, and when translucent materials are allowed.
---

Depth comes from surface tone and a 1px hairline, not from heavy shadows or gradients. Shadows appear only on layers that float above content, and they stay very soft.

## Radius

```ds-radius
```

| Token | Value | Used by |
| --- | --- | --- |
| `--ds-radius-xs`, `--ds-radius-sm` | 2px, 4px | Inline code, small markers |
| `--ds-radius-md`, `--radius-field` | 6px | Buttons, inputs, selects, tabs |
| `--ds-radius-box`, `--radius-box` | 10px | Menus, alerts, toasts, popovers |
| `--ds-radius-card` | 14px | Cards, panels, dialogs |
| `--ds-radius-full` | 999px | Pills, avatars, status dots |

A child inside a container has a smaller radius than the container, so the corners look concentric. Pick the nearest token; do not write a new radius.

## Borders

```ds-tokens
border
```

| Token | Value | Use for |
| --- | --- | --- |
| `--ds-border-hairline` | 1px | Cards, inputs, row dividers |
| `--ds-border-emphasis` | 1.5px | Dashed drop zones |
| `--ds-border-focus` | 2px | Focus ring |
| `--ds-border-accent` | 3px | Active item marker |
| `--ds-border-rail`, `--ds-border-tone-bar` | 4px | Tone bars on alerts and toasts |

Use hairlines in `--color-base-300` for structure and `--ds-control-border` for the edge of a control (3:1 against its surface). A thick line carries meaning (status, relation); never use it as decoration.

## Surfaces

- Content sits on `--color-base-100` over a `--color-base-200` canvas, with a 1px `--color-base-300` border.
- No gradients and no glow. daisyUI runs with `--depth: 0` and `--noise: 0`.
- In dark mode, elevation comes from a lighter surface, not a heavier shadow.

## Shadows

```ds-shadows
```

| Level | Token | Used by |
| --- | --- | --- |
| 0 | `--ds-shadow-none` | Cards, tables, forms: border only |
| 1 | `--ds-shadow-xs` | Selected tab, resting raised control |
| 2 | `--ds-shadow-menu` | Inline menu panels |
| 3 | `--ds-shadow-panel` | Floating panels: popovers, combobox, calendar, dragged items |
| 4 | `--ds-shadow-overlay` | Dialogs, notification panels, command palette |
| lift | `--ds-shadow-lift` | Clickable card on hover, rises by `--ds-lift` (-2px) |
| pinned | `--ds-shadow-pinned-start`, `-end` | Edge of sticky table columns while scrolled |

Use only these tokens. A floating layer combines a solid surface, a neutral 1px border (`--ds-popover-border`) and one shadow level.

```html preview title="Hairline and shadow levels"
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,11rem),1fr));gap:1.25rem;padding:.5rem">
  <div style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-card);background:var(--color-base-100);padding:1rem"><strong>Level 0</strong><br><span class="ds-text-subtle">Border only</span></div>
  <div style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-card);background:var(--color-base-100);padding:1rem;box-shadow:var(--ds-shadow-menu)"><strong>Level 2</strong><br><span class="ds-text-subtle">Menu panel</span></div>
  <div style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-card);background:var(--color-base-100);padding:1rem;box-shadow:var(--ds-shadow-panel)"><strong>Level 3</strong><br><span class="ds-text-subtle">Floating panel</span></div>
</div>
```

## Layering and z-index

```ds-tokens
z
```

From the bottom: pinned table columns (2–3), table headers (5–7), sticky elements (10), menus (20), combobox (30), popovers (40), notifications (45), modals (999), tooltips and skip links (1000).

> [!IMPORTANT]
> Use named layers (`var(--ds-z-popover)`), never a number. A new layer goes into `tokens.json`, not into component CSS. Prefer the top layer (`<dialog>`, `[popover]`), which stacks without z-index.

### Scrim

`--ds-scrim` (`rgb(8 18 28 / .4)`) is for modal dialogs that block the page. Popovers and non-modal drawers have no scrim. Under `prefers-reduced-transparency` the scrim rises to 70%.

## Translucent materials

Translucency is allowed only for chrome that overlaps scrolling content: a sticky top bar, bottom navigation and floating layers. It is not a style for cards or panels.

- Mix a surface token with transparency, for example `color-mix(in oklab, var(--color-base-100) 85%, transparent)`, and add `backdrop-filter: blur(12px)`. Never use a raw colour.
- Keep text at 4.5:1 against the worst content that can scroll beneath.
- Provide an opaque fallback: `@media (prefers-reduced-transparency: reduce)` and browsers without `backdrop-filter` get `--color-base-100`. The DS already does this for popovers, menus, combobox and toasts.
- Never stack two translucent layers.

## Focus ring

A 2px ring in `--ds-focus` with a 2px offset on `:focus-visible`. Components flush with their edges (table scroll area, navigation items, combobox options) use -2px so `overflow` cannot clip the ring. See [States](./states.md).

## Tokens

`--ds-radius-*`, `--ds-border-*`, `--ds-shadow-*`, `--ds-z-*`, `--ds-scrim`, `--ds-popover`, `--ds-popover-border`, `--ds-lift`.
