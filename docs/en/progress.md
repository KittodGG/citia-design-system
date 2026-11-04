---
title: Progress
group: components
category: feedback
order: 30
summary: Linear and circular progress indicators (determinate, indeterminate, buffer), segmented steps, tones, sizes, and the meter for a value inside a known range.
source: TPS app.css L3584–3634
---

Use progress to show how far a task has come: an upload, an import, a multi-step setup. Use the determinate form when you know the fraction, the indeterminate form when you do not, and show the number as text beside it. For a quantity inside a known range that is not a task (disk used, a score) use the meter form. For a wait with no end in sight and no layout to fill use a [spinner](./spinner.md); for content that is about to appear use a [skeleton](./skeleton.md); for numbered stages use a [stepper](./stepper.md).

## Examples

### Linear

The bar slides with `--ds-value` (0 to 100). The label and the value sit above it in a `.ds-meter` row; the value is text, so the bar never has to carry the number alone.

```html preview title="Determinate, with label and value"
<div style="display:grid;gap:1.25rem;max-width:26rem">
  <div class="ds-meter">
    <div class="ds-meter-row"><span id="pg-import">Importing contacts</span><span>62%</span></div>
    <div class="ds-progress" role="progressbar" aria-labelledby="pg-import" aria-valuemin="0" aria-valuemax="100" aria-valuenow="62" aria-valuetext="62%" style="--ds-value:62"><span class="ds-progress__bar"></span></div>
  </div>
  <div class="ds-meter">
    <div class="ds-meter-row"><span id="pg-upload">Uploading INV-2026-0418.pdf</span><span>3.2 of 4.0 MB</span></div>
    <div class="ds-progress is-success" role="progressbar" aria-labelledby="pg-upload" aria-valuemin="0" aria-valuemax="4" aria-valuenow="3.2" aria-valuetext="3.2 of 4.0 MB" style="--ds-value:80"><span class="ds-progress__bar"></span></div>
  </div>
</div>
```

### Sizes and tones

Heights are 4px (`is-sm`), 6px (default) and 10px (`is-lg`). Tones follow the shared tone carrier: `is-success`, `is-warning`, `is-error`, `is-info`, `is-primary`, `is-neutral`. The tone supports the words ("Failed at 41%"), it does not replace them.

```html preview title="Sizes and tones"
<div style="display:grid;gap:1rem;max-width:26rem">
  <div class="ds-progress is-sm" role="progressbar" aria-label="Small" aria-valuemin="0" aria-valuemax="100" aria-valuenow="30" style="--ds-value:30"><span class="ds-progress__bar"></span></div>
  <div class="ds-progress" role="progressbar" aria-label="Default" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" style="--ds-value:50"><span class="ds-progress__bar"></span></div>
  <div class="ds-progress is-lg" role="progressbar" aria-label="Large" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70" style="--ds-value:70"><span class="ds-progress__bar"></span></div>
  <div class="ds-progress is-success" role="progressbar" aria-label="Success" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" style="--ds-value:100"><span class="ds-progress__bar"></span></div>
  <div class="ds-progress is-warning" role="progressbar" aria-label="Warning" aria-valuemin="0" aria-valuemax="100" aria-valuenow="85" style="--ds-value:85"><span class="ds-progress__bar"></span></div>
  <div class="ds-progress is-error" role="progressbar" aria-label="Error" aria-valuemin="0" aria-valuemax="100" aria-valuenow="41" style="--ds-value:41"><span class="ds-progress__bar"></span></div>
</div>
```

### Indeterminate and buffer

Without `aria-valuenow` a bar is indeterminate: a segment travels along the track (`--ds-duration-shimmer`). A buffer layer (`.ds-progress__buffer`, `--ds-buffer`) shows what is ready ahead of what is done, for streaming and chunked uploads.

```html preview title="Indeterminate and buffer"
<div style="display:grid;gap:1.25rem;max-width:26rem">
  <div class="ds-meter">
    <div class="ds-meter-row"><span id="pg-wait">Preparing the report</span><span>Working…</span></div>
    <div class="ds-progress is-indeterminate" role="progressbar" aria-labelledby="pg-wait" aria-valuetext="Working…"><span class="ds-progress__bar"></span></div>
  </div>
  <div class="ds-meter">
    <div class="ds-meter-row"><span id="pg-buffer">Streaming recording</span><span>35% played, 70% loaded</span></div>
    <div class="ds-progress" role="progressbar" aria-labelledby="pg-buffer" aria-valuemin="0" aria-valuemax="100" aria-valuenow="35" aria-valuetext="35% played, 70% loaded" style="--ds-value:35;--ds-buffer:70"><span class="ds-progress__buffer"></span><span class="ds-progress__bar"></span></div>
  </div>
</div>
```

### Circular

Use the ring where a bar does not fit: a card corner, a button, a toolbar. `is-sm` (20px) has no label, the default is 48px, `is-lg` 80px and `is-xl` 112px. The indeterminate ring turns once every 1.4s.

```html preview title="Circular, determinate and indeterminate"
<div style="display:flex;flex-wrap:wrap;align-items:center;gap:1.5rem">
  <div class="ds-progress-circle is-sm" role="progressbar" aria-label="Sync" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40" style="--ds-value:40"><svg viewBox="0 0 36 36" aria-hidden="true" focusable="false"><circle class="ds-progress-circle__track" cx="18" cy="18" r="15.9155" pathLength="100"/><circle class="ds-progress-circle__bar" cx="18" cy="18" r="15.9155" pathLength="100"/></svg></div>
  <div class="ds-progress-circle" role="progressbar" aria-label="Upload" aria-valuemin="0" aria-valuemax="100" aria-valuenow="72" style="--ds-value:72"><svg viewBox="0 0 36 36" aria-hidden="true" focusable="false"><circle class="ds-progress-circle__track" cx="18" cy="18" r="15.9155" pathLength="100"/><circle class="ds-progress-circle__bar" cx="18" cy="18" r="15.9155" pathLength="100"/></svg><span class="ds-progress-circle__label">72%</span></div>
  <div class="ds-progress-circle is-lg is-success" role="progressbar" aria-label="Storage plan used" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" style="--ds-value:100"><svg viewBox="0 0 36 36" aria-hidden="true" focusable="false"><circle class="ds-progress-circle__track" cx="18" cy="18" r="15.9155" pathLength="100"/><circle class="ds-progress-circle__bar" cx="18" cy="18" r="15.9155" pathLength="100"/></svg><span class="ds-progress-circle__label">100%</span></div>
  <div class="ds-progress-circle is-lg is-indeterminate" role="progressbar" aria-label="Loading" aria-valuetext="Working…"><svg viewBox="0 0 36 36" aria-hidden="true" focusable="false"><circle class="ds-progress-circle__track" cx="18" cy="18" r="15.9155" pathLength="100"/><circle class="ds-progress-circle__bar" cx="18" cy="18" r="15.9155" pathLength="100"/></svg></div>
</div>
```

### Segmented steps

One cell per step; finished cells are filled, the current one is half tone. Use it for a short fixed sequence (setup, onboarding) with the step name written beside it.

```html preview title="Segmented, 3 of 5 complete"
<div style="max-width:26rem">
  <div class="ds-meter-row" style="margin-bottom:.375rem"><span id="pg-steps">Account setup</span><span>3 of 5 steps complete</span></div>
  <div class="ds-progress-steps" role="progressbar" aria-labelledby="pg-steps" aria-valuemin="0" aria-valuemax="5" aria-valuenow="3" aria-valuetext="3 of 5 steps complete"><span class="is-done"></span><span class="is-done"></span><span class="is-done"></span><span aria-current="step"></span><span></span></div>
</div>
```

### Meter

A meter shows a measurement in a known range, such as storage used. Use `role="meter"` on the same bar. Pick the tone from thresholds and say what the number means in the row or help text.

```html preview title="Meter with thresholds"
<div style="display:grid;gap:1.25rem;max-width:26rem">
  <div class="ds-meter">
    <div class="ds-meter-row"><span id="mt-a">Storage used</span><span>38 of 100 GB</span></div>
    <div class="ds-progress" role="meter" aria-labelledby="mt-a" aria-valuemin="0" aria-valuemax="100" aria-valuenow="38" aria-valuetext="38 of 100 GB" style="--ds-value:38"><span class="ds-progress__bar"></span></div>
  </div>
  <div class="ds-meter">
    <div class="ds-meter-row"><span id="mt-b">Seats in use</span><span>47 of 50</span></div>
    <div class="ds-progress is-warning" role="meter" aria-labelledby="mt-b" aria-valuemin="0" aria-valuemax="50" aria-valuenow="47" aria-valuetext="47 of 50 seats" style="--ds-value:94"><span class="ds-progress__bar"></span></div>
    <p class="ds-meter-help">Nearly full: add seats before the next invoice run.</p>
  </div>
</div>
```

### Outcome bar and share bar

Version 1 bars stay: `.ds-activity-bar` stacks outcomes that add up to 100%, `.ds-share` is a 4px line under a figure. Both are decorative and `aria-hidden`; the numbers next to them are text.

```html preview title="Activity bar and share"
<div style="display:grid;gap:1rem;max-width:26rem">
  <div class="ds-meter">
    <div class="ds-meter-row"><span>Payments this week</span><span>34 paid · 3 pending · 2 failed</span></div>
    <div class="ds-activity-bar" aria-hidden="true"><span class="is-success" style="width:87%"></span><span class="is-warning" style="width:8%"></span><span class="is-error" style="width:5%"></span></div>
  </div>
  <div><p style="margin:0 0 .375rem">Budget left: 42%</p><span class="ds-share" aria-hidden="true"><span style="width:42%"></span></span></div>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Determinate | `aria-valuenow` and `--ds-value` | Bar slides to the value; a change springs over `--ds-duration-spring` (500ms) from where it is |
| Indeterminate | No `aria-valuenow`, class `is-indeterminate` | A 40% segment travels every `--ds-duration-shimmer` (1.6s); ring turns once every 1.4s |
| Buffer | `--ds-buffer` and `.ds-progress__buffer` | Lighter layer (26% tone) behind the bar |
| Complete | Value reaches the maximum | Full bar; change the tone to `is-success` and the label to "Done" |
| Error | Task fails | Tone `is-error`, bar stays at the last value, label says what failed |
| Updating text | Value text changes | Row text updates; the bar animates; nothing else |
| Disabled / read-only | Not applicable | Progress is output, not input: it is never focusable |
| Reduced motion | `prefers-reduced-motion: reduce` | Value changes jump (colour only); indeterminate bars become a static 45% fill and rings a static 40% ring; the text label carries "Working…" |
| Forced colours | `forced-colors: active` | Track outlined in `CanvasText`, fill `Highlight`, buffer `GrayText` |
| Dark | `data-theme="dark"` | Track is `base-content` 9%, fill the lighter primary |
| RTL | `dir="rtl"` | Bars fill from the right; indeterminate travels right to left |

## Anatomy

- `.ds-progress`: track (`is-sm`, `is-lg`, tones, `is-indeterminate`); `role="progressbar"` or `role="meter"`.
- `.ds-progress__bar`, `.ds-progress__buffer`: fills, positioned by `--ds-value` and `--ds-buffer`.
- `.ds-progress-steps`: segmented bar; children `.is-done`, `[aria-current="step"]`.
- `.ds-progress-circle` with `svg`, `.ds-progress-circle__track`, `.ds-progress-circle__bar`, `.ds-progress-circle__label` (`is-sm`, `is-lg`, `is-xl`).
- `.ds-meter`, `.ds-meter-row`, `.ds-meter-help`: label and value row above, help text below.
- `.ds-activity-bar`, `.ds-share`: version 1 proportion bars.

## Usage

- Write the value as text: "62%", "3.2 of 4.0 MB". Right-align it in the row (tabular numbers).
- Show progress for waits longer than 1 second; below that show nothing. Show an indeterminate bar only when you cannot estimate; switch to determinate as soon as you can.
- Never let the value go backwards unless the task restarts; say so ("Retrying, 0%").
- Keep one progress bar per task. Do not stack several to show one process.
- Use `is-success` only when the task is done; do not paint the bar green while it runs.
- Put the label above the bar, not inside it; bars are 4 to 10px tall and cannot hold text.
- Use the circular form at 20px or 48px or larger; 24 to 36px rings are hard to read.
- For a button that is busy, use the [spinner](./spinner.md) inside the button, not a progress bar.

## Accessibility

- `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and a name (`aria-labelledby` pointing at the visible label, or `aria-label`). Add `aria-valuetext` when the number alone is unclear ("3.2 of 4.0 MB").
- Indeterminate: omit `aria-valuenow`; keep the name. Add `aria-valuetext="Working…"` if you want it read.
- Use `role="meter"` for a measurement, not for task progress.
- Do not announce every percent: screen readers read the value when the user reaches the bar. For long tasks add one polite `role="status"` message at milestones ("Import 50% complete"), at most one every 10 seconds, and one at the end.
- The fill is at least 3:1 against the track in both themes (non-text contrast). Tone is supported by the label text.
- Decorative bars (`.ds-activity-bar`, `.ds-share`) are `aria-hidden="true"`.
- Motion: the bar moves by `transform` only, the indeterminate loop is one of the allowed infinite animations, and it stops under reduced motion.
- Progress is not interactive: no focus, no keys.

## Razor

```cshtml
<ds-progress value="62" label="Importing contacts" visible-label show-value />
<ds-progress value="3" steps="5" label="Account setup" tone="Primary" />
<ds-progress label="Preparing the report" />                      @* indeterminate *@
<ds-progress value="35" buffer="70" label="Streaming recording" />
<ds-progress value="72" circular show-value size="lg" label="Upload" />
```

| Attribute | Effect |
| --- | --- |
| `value`, `max` | Current value and maximum (default 100). No `value` = indeterminate |
| `label` | Accessible name (default "Progress", translated); `visible-label` also prints it |
| `show-value` | Prints the percentage on the right (inside the ring when `circular`) |
| `value-text` | `aria-valuetext` instead of the percentage |
| `buffer` | Buffer layer value |
| `steps` | Segmented bar; `value` is the number of completed steps |
| `circular` | Ring; `size` is `sm`, `lg`, `xl` |
| `tone` | `Primary` (default), `Success`, `Warning`, `Error`, `Info`, `Neutral` |
| `size` | `sm`, `lg` for the bar |

## Tokens

`--ds-value`, `--ds-buffer`, `--ds-tone`, `--color-primary`, `--color-base-content` (track 9%), `--ds-radius-full`, `--ds-duration-spring`, `--ds-ease-spring`, `--ds-duration-shimmer`, `--ds-duration-fast`, `--ds-subtle`, `--ds-type-caption-size`, `--ds-weight-bold`.

## Native and daisyUI

The DS bar is a `div` with `role="progressbar"` because tones, a buffer layer, a label and a sliding transform need markup the native `<progress>` pseudo-elements cannot style the same way in every browser. daisyUI's `progress` class on a native `<progress>` and `radial-progress` still work if you prefer them; the DS styles do not touch them. Version 1 markup (`<span style="width:N%">` inside `.ds-progress`) still renders.
