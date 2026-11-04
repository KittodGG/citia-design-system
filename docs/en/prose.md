---
title: Prose
group: reference
order: 3
summary: Long-form content from Markdown, a CMS or a rich-text editor in the type roles, with a 65ch measure and vertical rhythm, in one class.
---

`.ds-prose` turns unclassed HTML (Markdown output, CMS pages, help articles, release notes, terms of service) into readable long-form text: a 65ch measure, 1.7 line height, a 1.25em rhythm between blocks, headings in the type roles, underlined links and bullets on lists. Use it for content you do not control element by element. Do not use it for application screens: forms, tables and cards bring their own spacing (see [native elements](./native-elements.md) for unclassed elements outside prose). [Bahasa Indonesia](../id/prose.md).

## Examples

### Article

```html preview title="Help article in .ds-prose"
<article class="ds-prose">
  <p class="ds-prose__lead">Close the month faster by approving invoices in batches and matching payments as they arrive.</p>
  <h2>Before you start</h2>
  <p>You need the <strong>Finance approver</strong> role. Ask <a href="#prose-roles">your workspace admin</a> if the Approve button is missing. Batches hold up to 50 invoices; larger runs split automatically.</p>
  <ul>
    <li>Invoices must be in the <em>Ready</em> state.</li>
    <li>Each invoice needs a cost centre, for example <code>CC-2040</code>.
      <ul>
        <li>Shared costs use <code>CC-9000</code>.</li>
      </ul>
    </li>
    <li>Credit notes are approved separately.</li>
  </ul>
  <h2>Approve a batch</h2>
  <ol>
    <li>Open <strong>Invoices</strong> and filter by <mark>Ready</mark>.</li>
    <li>Select the invoices, then press <kbd>Ctrl</kbd> + <kbd>Enter</kbd>.</li>
    <li>Check the total and confirm.</li>
  </ol>
  <blockquote>
    <p>Batches cut our close from nine days to four. Approvers review totals, not single lines.</p>
  </blockquote>
  <h3>Totals by cost centre</h3>
  <table>
    <thead><tr><th scope="col">Cost centre</th><th scope="col">Invoices</th><th scope="col" data-type="number">Amount (Rp)</th></tr></thead>
    <tbody>
      <tr><td>CC-2040 Operations</td><td>18</td><td data-type="number">142.500.000</td></tr>
      <tr><td>CC-3110 Marketing</td><td>7</td><td data-type="number">38.900.000</td></tr>
    </tbody>
  </table>
  <h3>Export for the ledger</h3>
  <pre><code>GET /api/batches/B-2026-11-04/export?format=csv</code></pre>
  <details>
    <summary>What happens to rejected invoices?</summary>
    <p>They return to Draft with your comment. The owner, for example Daniel Okafor, gets an email.</p>
  </details>
  <hr>
  <h4>Related</h4>
  <p>Read <a href="#prose-payments">matching payments</a> and <a href="#prose-close">closing the month</a>.</p>
</article>
```

### Sizes and width

`.is-sm` for side panels and help drawers (14px), `.is-lg` for reading pages (18px), `.is-full` to drop the 65ch measure inside a narrow column. Spacing is in `em`, so everything scales together.

```html preview title="is-sm and is-lg"
<div style="display:grid;gap:2rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))">
  <div class="ds-prose is-sm">
    <h3>Payment terms</h3>
    <p>Net 30 means the client pays within 30 days of the invoice date. Late payments add 1.5% per month.</p>
  </div>
  <div class="ds-prose is-lg">
    <h3>Payment terms</h3>
    <p>Net 30 means the client pays within 30 days of the invoice date.</p>
  </div>
</div>
```

### Components inside prose

Classed components keep their own look: prose rules use element selectors (specificity 0,0,1). Wrap a block in `.ds-not-prose` to switch prose off inside it entirely.

```html preview title="A component inside prose"
<article class="ds-prose">
  <p>Invoices above Rp 50.000.000 need a second approver.</p>
  <div class="ds-not-prose" style="display:flex;gap:0.5rem">
    <button class="btn btn-primary" type="button">Request approval</button>
    <button class="btn" type="button">Cancel</button>
  </div>
  <p>Sofia Marquez approves; Daniel Okafor is the backup.</p>
</article>
```

## States

| Element | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Link | rest | none | Link colour, 1px underline at 55% |
| Link | hover | `:hover` (hover devices) | Underline full strength, 2px |
| Link | pressed | `:active` | Colour deepens towards the text colour |
| Link | focus-visible | `:focus-visible` | 2px `--ds-focus` ring, 2px offset |
| Link | visited | `:visited` | Link colour mixed 38% towards the text colour |
| Heading | target | `:target`, anchor jump | Lands below sticky bars (`--ds-sticky-top` + 24px) |
| Details | open | `[open]` | Chevron turns 180°, content grows (see [native elements](./native-elements.md)) |
| Task list item | checked | `input[type=checkbox]:checked` | Native checkbox look, no bullet |
| Print | printed | `@media print` | External links print their URL after the text |

## Anatomy

- `.ds-prose`: the container (measure, size, rhythm).
- `.ds-prose__lead`: optional lead paragraph, 19px, subtle.
- `.ds-not-prose`: escape hatch for embedded components.
- Modifiers: `.is-sm`, `.is-lg`, `.is-full`.

## Usage

- Use one `.ds-prose` per article; do not nest it.
- Start sections with `h2`; the page title (`h1`) usually lives outside the prose block in the page header.
- Keep paragraphs under about 5 lines at 65ch; split long procedures into an ordered list.
- Do not add margins to elements inside prose; the rhythm is 1.25em between blocks, 2em above `h2` and `h3`.
- Do not put forms or data tables inside prose. Wrap embedded UI in `.ds-not-prose`.
- Wide tables: wrap them in a scroll container (`.ds-scroll-area` or `overflow-x: auto`); prose tables are full width and wrap long cells.

## Accessibility

- 65ch measure and 1.7 line height keep lines readable (WCAG 1.4.8); text reflows at 320px and at 200% zoom.
- Links are always underlined, so colour is not the only cue; visited links stay distinguishable.
- Headings keep their levels: prose restyles size, never order. Do not skip levels.
- Headings scroll clear of sticky bars when the page sets `--ds-sticky-top`.

## Tokens

`--ds-size-measure`, `--ds-type-body-size`, `--ds-type-callout-size`, `--ds-type-title-1|3-*`, `--ds-type-headline-*`, `--ds-type-section-*`, `--ds-type-label-*`, `--ds-type-footnote-*`, `--ds-link`, `--ds-focus`, `--ds-subtle`, `--color-base-300`, `--ds-border-accent`, `--ds-border-hairline`, `--ds-radius-box`, `--ds-radius-xs`, `--ds-duration-fast`, `--ds-ease-standard`, `--ds-sticky-top`.

## Native and daisyUI

Prose builds on the [native element](./native-elements.md) styles (code, `kbd`, `mark`, tables, `details`, `blockquote`) and adds rhythm, measure, bullets for every list and link states including `:visited`. Rules sit in `@scope (.ds-prose) to (.ds-not-prose)` inside `@layer components`. daisyUI's `.prose` only sets colour variables for the Tailwind typography plugin, which the DS does not ship; use `.ds-prose` instead. Markdig output (task lists, footnotes, heading anchors) is covered.
