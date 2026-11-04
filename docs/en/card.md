---
title: Card
group: components
category: data-display
order: 6
summary: A hairline container for one subject, with header, media, actions and footer; interactive, selectable, horizontal, loading and empty variants.
source: TPS app.css .pt-card L3461–3468, .master-surface L1448
---

A card groups the content and actions of one subject: a project, an invoice, a person. Keep one subject per card and do not nest cards; split sections inside a card with `.ds-section`. For a plain box without structure use `.ds-surface`; for tabular data use a [table](./table.md); for one number use a [stat](./stat.md).

## Examples

```html preview title="Header, actions, body and footer"
<article class="ds-card" style="max-inline-size:28rem">
  <header class="ds-card__header">
    <div>
      <span class="ds-card__eyebrow">PRJ-1024</span>
      <h3 class="ds-card__title">Website redesign</h3>
      <p class="ds-card__description">Updated 2 Nov 2026, 14:30</p>
    </div>
    <div class="ds-card__actions"><button type="button" class="btn btn-ghost btn-sm"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg> Edit</button></div>
  </header>
  <div class="ds-card__body"><p>Budget used: <strong>IDR 84,500,000</strong> of IDR 120,000,000. Next milestone on 14 Nov 2026.</p></div>
  <footer class="ds-card__footer is-between"><span class="ds-pill is-info">In progress</span><span class="ds-text-subtle">Owner: Ayu Lestari</span></footer>
</article>
```

```html preview title="Interactive card (one link)"
<div class="ds-grid-2">
  <article class="ds-card is-interactive">
    <div class="ds-card__body">
      <span class="ds-card__eyebrow">INV-2026-0418</span>
      <h3 class="ds-card__title"><a class="ds-card__link" href="#invoice-418">Invoice for Mei Tanaka</a></h3>
      <p class="ds-card__description">IDR 12,400,000, due 20 Nov 2026</p>
    </div>
    <footer class="ds-card__footer"><span class="ds-pill is-warning">Due in 18 days</span></footer>
  </article>
  <article class="ds-card is-interactive">
    <div class="ds-card__body">
      <span class="ds-card__eyebrow">INV-2026-0419</span>
      <h3 class="ds-card__title"><a class="ds-card__link" href="#invoice-419">Invoice for Daniel Okafor</a></h3>
      <p class="ds-card__description">IDR 3,150,000, paid 2 Nov 2026</p>
    </div>
    <footer class="ds-card__footer"><span class="ds-pill is-success">Paid</span></footer>
  </article>
</div>
```

```html preview title="Selectable cards (radio)"
<div class="ds-grid-3" role="radiogroup" aria-label="Plan">
  <label class="ds-card is-selectable"><input type="radio" name="plan" value="starter" class="radio radio-sm ds-card__input">
    <div class="ds-card__body"><span class="ds-card__eyebrow">Starter</span><h3 class="ds-card__title">IDR 0</h3><p class="ds-card__description">Up to 3 projects</p></div></label>
  <label class="ds-card is-selectable"><input type="radio" name="plan" value="team" class="radio radio-sm ds-card__input" checked>
    <div class="ds-card__body"><span class="ds-card__eyebrow">Team</span><h3 class="ds-card__title">IDR 150,000</h3><p class="ds-card__description">Unlimited projects, 10 members</p></div></label>
  <label class="ds-card is-selectable"><input type="radio" name="plan" value="business" class="radio radio-sm ds-card__input" disabled>
    <div class="ds-card__body"><span class="ds-card__eyebrow">Business</span><h3 class="ds-card__title">IDR 450,000</h3><p class="ds-card__description">Unavailable in your region</p></div></label>
</div>
```

```html preview title="With media and horizontal layout"
<div class="ds-grid-2">
  <article class="ds-card">
    <div class="ds-card__media"><svg viewBox="0 0 16 9" role="img" aria-label="Placeholder image"><rect width="16" height="9" fill="currentColor" opacity=".08"/></svg></div>
    <div class="ds-card__body"><h3 class="ds-card__title">Office renovation</h3><p class="ds-card__description">Phase 2 starts on 18 Nov 2026.</p></div>
  </article>
  <article class="ds-card is-horizontal">
    <div class="ds-card__media"><svg viewBox="0 0 16 9" role="img" aria-label="Placeholder image"><rect width="16" height="9" fill="currentColor" opacity=".08"/></svg></div>
    <div class="ds-card__content">
      <div class="ds-card__body"><h3 class="ds-card__title">Sofia Marquez</h3><p class="ds-card__description">Finance lead, Jakarta</p></div>
      <footer class="ds-card__footer is-end"><button type="button" class="btn btn-sm">Message</button></footer>
    </div>
  </article>
</div>
```

```html preview title="Loading and empty"
<div class="ds-grid-2">
  <article class="ds-card" aria-busy="true">
    <span class="ds-visually-hidden" role="status">Loading</span>
    <div class="ds-card__body" aria-hidden="true"><span class="ds-bone is-title"></span><span class="ds-bone"></span><span class="ds-bone is-short"></span></div>
  </article>
  <article class="ds-card is-dashed">
    <div class="ds-card__empty">
      <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
      <strong>No projects yet</strong>
      <span>Projects you create appear here.</span>
      <button type="button" class="btn btn-primary btn-sm">New project</button>
    </div>
  </article>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | 1px `--color-base-300` hairline, base-100, radius `--ds-radius-card`, no shadow |
| Hover (interactive) | Pointer, `(hover: hover)` | Lifts by `--ds-lift` (-2px), border toward primary, `--ds-shadow-lift` |
| Focus-visible | Keyboard on the card link or selectable input | 2px `--ds-focus` ring around the whole card |
| Pressed | `:active` on an interactive card | Lift ends, 3% state layer |
| Selected | `:checked` on `.ds-card__input` | Primary border and inset ring, 6% primary fill, native checked control |
| Disabled | `disabled` input or `aria-disabled="true"` | `--ds-opacity-disabled`, `cursor: not-allowed`, no lift |
| Invalid | `:user-invalid` on a required selectable card | Error border |
| Loading | `aria-busy="true"` | Bones with shimmer, interaction blocked, hidden "Loading" |
| Empty | `.ds-card__empty` | Centred icon, title, one sentence, at most one action |
| Reduced motion | `prefers-reduced-motion` | No lift, no shimmer |

Dense data UI does not lift: only `is-interactive` cards do.

## Anatomy

- `.ds-card` with `is-tonal`, `is-elevated`, `is-dashed`, `is-compact`, `is-danger`, `is-interactive`, `is-selectable`, `is-horizontal`.
- `.ds-card__media` (`is-square`, `is-wide`), `.ds-card__header` (`__eyebrow`, `__title`, `__description`, `__actions`), `.ds-card__body` (`is-flush`, `is-roomy`), `.ds-card__footer` (`is-end`, `is-between`), `.ds-card__link`, `.ds-card__input`, `.ds-card__empty`, `.ds-card__content` (horizontal).
- Version 1 names `.ds-card-head`, `.ds-card-body`, `.ds-card-foot` still work.

## Usage

- Use one link per interactive card: the title. Do not put another link or button over the cover; buttons in `__actions` and the footer sit above it and still work.
- Use at most 1 primary action per card; put secondary actions in a menu.
- Keep media at 16:9, 1:1 or 21:9; always give `alt` text for content images, `alt=""` for decoration.
- Use `is-selectable` for choosing one or more items in a form; the native checkbox or radio stays visible.
- Do not nest cards, and do not use more than 3 columns of cards before 1440px.

## Accessibility

- An interactive card is an `article` with one `a` (stretched with `::after`); the accessible name is the link text, so write it in full.
- A selectable card is a `label` around a native input: name, role and state come from the input. Group radios in `role="radiogroup"` with `aria-label`.
- Headings: use `h2` to `h4` for the title so the page outline stays correct (`level` on the tag helper).
- Contrast: hairline borders are decorative; the selection state also uses a checked control.

| Key | Action |
| --- | --- |
| Tab | Moves to the card link or its input, then to buttons in actions and footer |
| Enter | Follows the card link |
| Space | Toggles a selectable card; arrow keys move between radio cards |

## Razor

```cshtml
<ds-card title="Website redesign" eyebrow="PRJ-1024" description="Updated 2 Nov 2026" href="/projects/1024">
    Budget used: IDR 84,500,000 of IDR 120,000,000.
    <ds-card-actions><button type="button" class="btn btn-ghost btn-sm">Edit</button></ds-card-actions>
    <ds-card-footer><ds-pill tone="Info">In progress</ds-pill></ds-card-footer>
</ds-card>

<ds-card title="Team" selectable input-type="radio" name="plan" value="team" checked>Unlimited projects</ds-card>
<ds-card loading />
```

## Tokens

`--color-base-100`, `--color-base-300`, `--ds-radius-card`, `--ds-space-card-x|y`, `--ds-type-card-title-*`, `--ds-lift`, `--ds-shadow-lift`, `--ds-shadow-menu`, `--ds-opacity-disabled`, `--ds-duration-base|fast`, `--ds-focus`.

## Native and daisyUI

Builds on `article`, `header`, `footer`, `label`. It replaces daisyUI `card`, `card-body` and `card-actions` (they still render, without these states). `.ds-bone` is the skeleton piece used inside cards and stats.
