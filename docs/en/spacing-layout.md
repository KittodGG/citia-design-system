---
title: Spacing and layout
group: foundations
order: 4
summary: The 4px spacing scale, semantic gaps, grids, breakpoints, comfortable and compact density, touch targets and safe areas.
---

Spacing follows a 4px base with an 8px rhythm between blocks. Every value is a token: use `--ds-space-*` and never write a new pixel value. Small steps (2px, 4px) are for optical alignment inside a component; gaps between blocks use multiples of 8px.

## Spacing scale

```ds-spacing
```

The 2px and 4px steps (`--ds-space-0-5`, `--ds-space-1`) keep icons and inline text aligned. Steps `--ds-space-2` (8px), `-4` (16px), `-6` (24px), `-8` (32px) and `-12` (48px) build the gaps between parts.

### Semantic gaps

Semantic tokens name the purpose of a gap. Reach for these before the raw scale.

| Token | Value | Use for |
| --- | --- | --- |
| `--ds-space-field-stack` | 8px | Label, control and helper text inside one field |
| `--ds-space-field-group` | 24px | Between groups of fields in a form |
| `--ds-space-section` | 32px | Between large sections of a page |
| `--ds-space-card-y` × `--ds-space-card-x` | 16 × 18px | Card padding |
| `--ds-space-panel` | 32px | Panel and large dialog padding |
| `--ds-space-toolbar-gap` | 16px rows × 24px columns | Gaps in a toolbar |

```ds-tokens
space
```

## Sizes

```ds-tokens
size
```

- Sidebar 16rem, collapsed rail 4.75rem, top bar 4.75rem.
- Dialogs 34rem (small) and 54rem (large). Below 640px a dialog fills the screen.
- Reading measure `65ch` (`--ds-size-measure`).
- Scrolling tables are capped at `min(68dvh, 44rem)` so sticky headers stay visible.

## Grids

Layouts use CSS grid with `minmax(min(100%, X), 1fr)`, so a column is never wider than its container, even at 320px.

| Class | Behaviour |
| --- | --- |
| `.ds-kpis` | `auto-fill`, columns of at least 13.5rem |
| `.ds-grid-2` | `auto-fit`, columns of at least 28rem; one column when narrow |
| `.ds-grid-3` | `auto-fit`, columns of at least 20rem |
| `.ds-field-grid` | Two columns, one column at 640px and below |

```html preview title="Stat cards in an auto-fill grid"
<div class="ds-kpis">
  <div class="ds-kpi"><span class="ds-text-subtle">Open invoices</span><span class="ds-num" style="font-size:var(--ds-type-metric-size);font-weight:var(--ds-type-metric-weight)">42</span></div>
  <div class="ds-kpi"><span class="ds-text-subtle">Outstanding</span><span class="ds-num" style="font-size:var(--ds-type-metric-size);font-weight:var(--ds-type-metric-weight)">18,420.00</span></div>
  <div class="ds-kpi"><span class="ds-text-subtle">Active projects</span><span class="ds-num" style="font-size:var(--ds-type-metric-size);font-weight:var(--ds-type-metric-weight)">7</span></div>
</div>
```

Prefer container queries when a component must adapt to the space it receives rather than to the viewport.

## Breakpoints

```ds-tokens
breakpoint
```

| Width | What changes |
| --- | --- |
| 640px | Tables become labelled cards, inputs stay at 16px, page headers and dialog footers stack |
| 1024px | The sidebar is fixed on the left (a drawer below), the collapse button appears, `.ds-main` padding grows to 32px |
| 1180px | The toolbar stacks: text first, actions below and right-aligned |

Check 320px, 390px, 768px and 1280px in both languages. Do not add a breakpoint when 640, 1024 or 1180 is enough; record a component-specific breakpoint on that component's page.

## Density

- **Comfortable** is the default: controls are 44px tall on touch and spacing follows the scale above.
- **Compact** is for dense desktop tables and toolbars. Wrap the region in `.ds-dense`: small buttons and chips drop to `--ds-size-target-compact` (36px) and keep a hit area of at least 24×24px. Do not use it on touch devices or for the only way to do something.

```html preview title="Comfortable and compact"
<div style="display:flex;flex-wrap:wrap;align-items:center;gap:1.5rem">
  <div style="display:flex;gap:.5rem"><button class="btn btn-sm">Comfortable</button><button class="btn btn-sm btn-primary">Save</button></div>
  <div class="ds-dense" style="display:flex;gap:.5rem"><button class="btn btn-sm">Compact</button><button class="btn btn-sm btn-primary">Save</button></div>
</div>
```

## Touch targets

- At least 24×24px everywhere (WCAG 2.5.8) and 44×44px (`--ds-size-target`) on `(pointer: coarse)`.
- Compact sizes keep the hit area with padding or a pseudo-element, not by shrinking the target.
- Leave 8px between adjacent targets so a thumb hits only one.

## Safe areas

On devices with notches and rounded corners, add `viewport-fit=cover` to the viewport meta tag and pad fixed edges with the environment insets:

```css
.bottom-bar {
  padding-block-end: max(var(--ds-space-3), env(safe-area-inset-bottom));
  padding-inline: max(var(--ds-space-4), env(safe-area-inset-left), env(safe-area-inset-right));
}
```

Apply this to fixed bars, bottom navigation and sheets. Never place a primary action inside the inset.

## Usage

- Use logical properties (`margin-inline-start`, `padding-block`, `inset-inline-end`) so `dir="rtl"` works without edits.
- Group related items closer than unrelated ones: 8px inside a field, 24px between fields, 32px between sections.
- Do not nest cards more than one level; use a hairline instead of a second box.
- Use `gap` between siblings instead of margins on each child.

## Tokens

`--ds-space-*`, `--ds-size-*`, `--ds-breakpoint-*`, `--ds-size-target`, `--ds-size-target-compact`, `--ds-size-measure`.
