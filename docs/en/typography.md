---
title: Typography
group: foundations
order: 3
summary: One typeface, 17 type roles, tabular numerals for data, a 50–75 character measure, and rules for text that grows in Indonesian or wraps on small screens.
---

Citia DS uses a single family, Manrope, and builds hierarchy from size, weight, tracking and leading as one set. Each role is a group of four tokens (`--ds-type-<role>-size`, `-leading`, `-weight`, `-tracking`), so a heading never gets a size without its matching spacing. Use roles instead of raw font sizes.

## Font

- Manrope variable font, weight axis 200–800. The DS uses 400–800.
- Self-hosted under `/_content/Citia.DesignSystem/fonts/manrope/` in two subsets, `latin` and `latin-ext`. Licence: SIL OFL 1.1 (`OFL.txt` sits in the same folder).
- No CDN request. The app keeps working on restricted networks and a third party cannot block the font.
- `font-display: swap`. The `latin` subset is preloaded by `_DsHead`, so text shows in the fallback while the font loads.
- `font-optical-sizing: auto` is on, so the variable font adjusts its shapes to the rendered size.

Fallback stack: `"Manrope", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`. The monospace token `--ds-font-mono` is for code, literal markup and secret keys only.

```ds-tokens
font
```

## Type roles

Seventeen roles, from `display` to `micro`. The specimen below is rendered with the real variables.

```ds-type-scale
```

| Role | Size / leading / weight / tracking | Use for |
| --- | --- | --- |
| `display` | clamp(2rem, 3vw, 3rem) / 1.1 / 750 / -0.04em | Landing and sign-in hero |
| `title-1` | clamp(1.75rem, 2.5vw, 2.25rem) / 1.15 / 650 / -0.035em | Page title |
| `title-2` | clamp(1.375rem, 2vw, 1.75rem) / 1.2 / 750 / -0.03em | Section page title, dense headers |
| `title-3` | clamp(1.25rem, 1.6vw, 1.625rem) / 1.25 / 750 / -0.03em | Top bar title |
| `title-auth` | 1.75rem / 1.2 / 650 / -0.02em | Sign-in and account forms |
| `headline` | 1.25rem / 1.3 / 650 / -0.01em | Dialog and empty-state titles |
| `section` | 1.0625rem / 1.4 / 650 / 0 | Fieldset legends, section headings |
| `card-title` | 0.9375rem / 1.4 / 700 / 0 | Card headers |
| `body` | 1rem / 1.5 / 400 / 0 | Running text and every input |
| `label` | 0.9375rem / 1.5 / 600 / 0 | Field labels |
| `callout` | 0.875rem / 1.5 / 400 / 0 | Table cells, navigation items, buttons |
| `footnote` | 0.8125rem / 1.5 / 400 / 0 | Helper text |
| `caption` | 0.75rem / 1.4 / 400 / 0 | Metadata, secondary lines |
| `eyebrow` | 0.6875rem / 1rem / 700 / 0.08em, uppercase | Group labels above a title |
| `table-head` | 0.6875rem / 1rem / 700 / 0.06em, uppercase | Table column headers |
| `micro` | 0.625rem / 1 / 800 / 0 | Counter badges only |
| `metric` | 1.75rem / 1.1 / 750 / -0.03em, tabular | Large figures in stat cards |

In CSS, apply a role through its four variables:

```css
.page-title {
  font-size: var(--ds-type-title-1-size);
  line-height: var(--ds-type-title-1-leading);
  font-weight: var(--ds-type-title-1-weight);
  letter-spacing: var(--ds-type-title-1-tracking);
  text-wrap: balance;
}
```

With the Tailwind theme, the class `text-title-1` sets all four at once.

## Weights, tracking and leading

Weights run from `--ds-weight-regular` (400) to `--ds-weight-extrabold` (800). Body text is 400, labels 600, headings 650–750. Build hierarchy from weight, size and leading together; making text bolder without changing anything else flattens the page.

- **Tracking.** Negative only for large text: `display` -0.04em, easing to `headline` -0.01em. From `section` down it is 0. Body text is always 0. Uppercase roles (`eyebrow`, `table-head`) get positive tracking (0.06–0.08em), because capitals without it read cramped.
- **Leading.** Large headings are tight (1.1 for `display`, 1.15 for `title-1`, 1.2 for `title-2`). Body is 1.5, captions 1.4. Single-line roles (`eyebrow`, `micro`) use a fixed leading so rows keep the same height.
- **Inputs.** Every input is 16px. Below 16px, iOS Safari zooms the page when the field takes focus.

## Numerals

`font-variant-numeric: tabular-nums` is on for `<table>`, `.ds-num` and `.tabular`. Use tabular figures wherever digits line up or change over time: tables, stats, counters, pagination, timers and identifiers. Use proportional figures in running text.

```html preview title="Tabular numerals in a table"
<table class="table">
  <thead><tr><th>Invoice</th><th>Client</th><th style="text-align:end">Amount</th></tr></thead>
  <tbody>
    <tr><td><span class="ds-id">INV-2026-0418</span></td><td>Ayu Lestari</td><td style="text-align:end">1,248.50</td></tr>
    <tr><td><span class="ds-id">INV-2026-0419</span></td><td>Daniel Okafor</td><td style="text-align:end">98.00</td></tr>
    <tr><td><span class="ds-id">INV-2026-0420</span></td><td>Mei Tanaka</td><td style="text-align:end">15,011.75</td></tr>
  </tbody>
</table>
```

Business identifiers (`PRJ-1024`, `INV-2026-0418`) use Manrope with tabular figures through `.ds-id`, which also resets `letter-spacing` to 0. Monospace is only for literal code (`pre.code`). Right-align numeric columns and keep the unit in a separate cell or in the header.

## Line length

Keep running text between 50 and 75 characters per line. `--ds-size-measure` is `65ch`, applied by `.ds-measure`. Do not let paragraphs stretch across a wide screen.

```html preview title="Measure and balanced headings"
<div class="ds-measure">
  <h3 style="font-size:var(--ds-type-title-2-size);line-height:var(--ds-type-title-2-leading);font-weight:var(--ds-type-title-2-weight);letter-spacing:var(--ds-type-title-2-tracking);text-wrap:balance;margin:0 0 .5rem">Invoices are reconciled every night at 02:00</h3>
  <p style="text-wrap:pretty;margin:0">The nightly run compares each invoice with its payment records and flags differences above 0.5%. Flagged items appear in the review queue the next morning, grouped by project, so the finance team can clear them in one pass.</p>
</div>
```

Add `text-wrap: balance` to headings (two to three lines at most) so the last line never holds a single word, and `text-wrap: pretty` to long paragraphs.

## English and Indonesian

Indonesian strings are usually 20–40% longer than English ones ("Save changes" becomes "Simpan perubahan", "Rows per page" becomes "Baris per halaman"). Design for 40% growth:

- No fixed widths on text containers; use `min-width`, `max-width`, `flex` and `grid` with `minmax()`.
- Buttons grow in width and keep one line when it fits. Labels longer than about 28 characters belong in a tooltip or a helper line.
- Test every screen in both languages before release. Never judge a layout from English alone.
- Do not abbreviate to make text fit. Shorten the wording instead.

## Truncation and wrapping

- **Wrap by default.** Headings, descriptions, labels and table cells that hold prose wrap onto as many lines as they need.
- **Truncate only identity text** (file names, emails, breadcrumb items, tags), and only when the width is constrained. Use `text-overflow: ellipsis` on a single line and put the full text in `title` or the accessible name.
- **Clamp descriptions** with `.ds-clamp-2` (two lines) in cards and lists. Never clamp the only copy of something the user must read, such as an error.
- **Long unbroken strings** (URLs, IDs) take `overflow-wrap: anywhere` so they cannot push the layout wider than 320px.
- **No `text-align: justify`.** Align text to the start in both languages.

## Usage

- Pick the role that matches the meaning, not the size you want. If no role fits, request a new token instead of a one-off size.
- One `title-1` per page. Do not skip heading levels: `h1`, `h2`, `h3` in order, whatever their visual role.
- Use `--ds-subtle` for secondary text and `--ds-muted` for tertiary text. Do not lower opacity to dim text; contrast must stay measurable (4.5:1).
- Keep body text at 16px or above, with 12px (`caption`) as the floor.

## Tokens

`--ds-font-sans`, `--ds-font-mono`, `--ds-weight-*`, `--ds-type-<role>-size`, `-leading`, `-weight`, `-tracking`, `--ds-size-measure`.
