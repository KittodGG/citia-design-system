---
title: Spinner
group: components
category: feedback
order: 32
summary: A small rotating ring for short waits of unknown length, with sizes, tones, a visible label, a 300 ms appearance delay and a busy-region overlay.
source: TPS app.css ds-spin, .ds-spinner
---

Use a spinner for a wait that is short or has no known length and no known shape: a button that is saving, a panel that is refreshing, a search that is running. If you know the shape of the result use a [skeleton](./skeleton.md); if you can say how far along the task is use [progress](./progress.md). A spinner is never alone: it comes with a visible label, because it stops moving (and is hidden) under reduced motion.

## Examples

### Sizes

`is-xs` (0.75em), `is-sm` (0.875em), default (1em, follows the text), `is-lg` (24px) and `is-xl` (40px). The ring takes the text colour. Stroke is 2px, 3px from `is-xl`.

```html preview title="Sizes"
<div style="display:flex;align-items:center;gap:1.25rem">
  <span class="ds-spinner is-xs" aria-hidden="true"></span>
  <span class="ds-spinner is-sm" aria-hidden="true"></span>
  <span class="ds-spinner" aria-hidden="true"></span>
  <span class="ds-spinner is-lg" aria-hidden="true"></span>
  <span class="ds-spinner is-xl" aria-hidden="true"></span>
</div>
```

### Tones

Tones follow the shared carrier: neutral (the text colour, default), `is-primary`, `is-success`, `is-warning`, `is-error`, `is-info`. Tone is rarely needed; use it when the ring sits on a coloured surface.

```html preview title="Tones"
<div style="display:flex;align-items:center;gap:1.25rem">
  <span class="ds-spinner is-lg" aria-hidden="true"></span>
  <span class="ds-spinner is-lg is-primary" aria-hidden="true"></span>
  <span class="ds-spinner is-lg is-success" aria-hidden="true"></span>
  <span class="ds-spinner is-lg is-warning" aria-hidden="true"></span>
  <span class="ds-spinner is-lg is-error" aria-hidden="true"></span>
  <span class="ds-spinner is-lg is-info" aria-hidden="true"></span>
</div>
```

### With a label

`.ds-loading` pairs the ring with a label inside `role="status"`. The label is the state when the ring is hidden by reduced motion. `is-block` centers it in its container with generous padding.

```html preview title="Inline and block"
<div style="display:grid;gap:1.5rem">
  <span class="ds-loading" role="status"><span class="ds-spinner" aria-hidden="true"></span><span class="ds-loading__label">Loading invoices…</span></span>
  <div style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box)">
    <div class="ds-loading is-block" role="status"><span class="ds-spinner is-lg is-primary" aria-hidden="true"></span><span class="ds-loading__label">Preparing your report. This can take up to a minute.</span></div>
  </div>
</div>
```

### In a button

A busy button keeps its width, shows the ring before the label and blocks interaction. The label can change ("Saving…") but must stay readable. See [button](./button.md) for the full pattern.

```html preview title="Busy button"
<div style="display:flex;gap:.75rem;flex-wrap:wrap">
  <button type="button" class="btn btn-primary" aria-busy="true" aria-disabled="true"><span class="ds-spinner is-sm" aria-hidden="true"></span> Saving…</button>
  <button type="button" class="btn" aria-busy="true" aria-disabled="true"><span class="ds-spinner is-sm" aria-hidden="true"></span> Exporting</button>
</div>
```

### Delayed

`ds-delayed` hides the element for 300 ms, then fades it in over 160ms. Waits shorter than that show nothing, which feels faster than a flash of ring. Override with `--ds-delay`.

```html preview title="Appears after 300 ms"
<span class="ds-loading ds-delayed" role="status"><span class="ds-spinner" aria-hidden="true"></span><span class="ds-loading__label">Searching…</span></span>
```

### Busy region

Mark a region `aria-busy="true"` on a `.ds-busy` parent and add a `.ds-loading-overlay`. The overlay appears after 300 ms, dims the content to 72% surface and blocks clicks while the region is busy; it disappears when you remove `aria-busy`.

```html preview title="Overlay on a busy region"
<div class="ds-busy" aria-busy="true" style="padding:1rem;min-height:9rem;border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box)">
  <p style="margin:0 0 .5rem"><strong>Invoices</strong></p>
  <p style="margin:0">INV-2026-0418 · Daniel Okafor · 4,250.00</p>
  <p style="margin:0">INV-2026-0419 · Sofia Marquez · 1,180.50</p>
  <div class="ds-loading-overlay"><span class="ds-loading" role="status"><span class="ds-spinner is-lg is-primary" aria-hidden="true"></span><span class="ds-loading__label">Refreshing…</span></span></div>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Spinning | Always while mounted | Ring turns once every 0.7s, linear, infinite (`ds-spin`) |
| Delayed | `ds-delayed` or a busy overlay | Invisible for 300 ms, then a 160ms fade-in |
| Labelled | `.ds-loading` | Ring plus label, `--ds-subtle`, 14px |
| Busy button | `aria-busy="true"` on a button | Ring before the label, width unchanged, no hover or press response |
| Busy region | `.ds-busy[aria-busy="true"]` | Overlay at 72% surface, interaction blocked |
| Done | `aria-busy` removed, spinner removed | Content shows; announce the result if it is not obvious |
| Reduced motion | `prefers-reduced-motion: reduce` | Ring hidden (a half-frozen ring looks broken); the text label remains and carries the state |
| Forced colours | `forced-colors: active` | Ring uses `currentColor` (`CanvasText`) |
| Dark | `data-theme="dark"` | Ring follows the text colour; track 22% |
| Disabled / focus / hover | Not applicable | A spinner is output and never interactive |

## Anatomy

- `.ds-spinner`: the ring (`is-xs`, `is-sm`, `is-lg`, `is-xl`, tones). `aria-hidden="true"`.
- `.ds-loading`: ring plus label in `role="status"` (`is-block` to center). `.ds-loading__label` is the text.
- `.ds-delayed`: utility, 300 ms delay then fade-in.
- `.ds-busy` and `.ds-loading-overlay`: a region and its scrim, active while `aria-busy="true"`.

## Usage

- Always write the label ("Saving…", "Searching…"). End it with an ellipsis; say what is happening, not "Please wait".
- Use it for waits of about 1 to 10 seconds. Above 10 seconds, show [progress](./progress.md) or a message with an estimate.
- Use the 300 ms delay for everything that may finish quickly.
- One spinner per region. Do not put one in every row of a list; use a [skeleton](./skeleton.md) or a single overlay.
- In a button use `is-sm` (0.875em) and keep the button the same width.
- For a full-page wait use `is-block` with `is-lg` or `is-xl`, never a full-screen overlay for longer than 2 seconds.
- Do not use it as decoration or for a state that does not change.

## Accessibility

- The ring is `aria-hidden="true"`; the name is the label. Wrap both in `role="status"` (polite live region) so the message is announced once when it appears.
- On a busy region set `aria-busy="true"`, then remove it when done. A busy button also gets `aria-busy` and stays in the tab order with `aria-disabled="true"`, so focus is not lost.
- Reduced motion: the global rule hides `.ds-spinner`, so a label is required. This is why a bare ring is never a valid loading state.
- The ring has 3:1 contrast against the surface (it uses the text colour); the label is 4.5:1.
- The spinner is not interactive: no focus, no keys.
- Do not announce changes of the label more often than every few seconds.

## Razor

```cshtml
<ds-spinner label="Saving…" />
<ds-spinner label="Preparing your report" size="lg" tone="Primary" block />
<ds-spinner label="Searching…" delayed />
<ds-spinner label="Loading" quiet-label size="sm" />   @* label hidden visually; use next to other visible text *@
```

| Attribute | Effect |
| --- | --- |
| `label` | Visible text (default "Loading…", translated) |
| `size` | `xs`, `sm`, `lg`, `xl` |
| `tone` | `Neutral` (default), `Primary`, `Success`, `Warning`, `Error`, `Info` |
| `block` | Center in the container with padding |
| `delayed` | 300 ms delay then fade |
| `quiet-label` | Label stays for assistive technology only |

## Tokens

`--ds-spinner-size`, `--ds-tone`, `--ds-subtle`, `--ds-delay` (300ms), `--ds-duration-quick`, `--ds-ease-standard`, `--color-base-100` (overlay), `--ds-z-sticky`, `--ds-type-callout-size`, `--ds-space-2`, `--ds-space-3`, `--ds-space-8`.

## Native and daisyUI

The ring is a bordered `span` rotated with a keyframe; the base rule (`.ds-spinner`, 1em, 0.7s) lives in `button.css` and `media.css` adds sizes, tones and the track. daisyUI's `loading` class draws a different animation; the DS ring replaces it. `role="status"` and `aria-busy` are the native ARIA mechanisms for announcing progress to assistive technology.
