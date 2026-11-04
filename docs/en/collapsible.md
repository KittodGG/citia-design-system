---
title: Collapsible
group: components
category: layout
order: 9
summary: One disclosure that shows or hides a region, as a native details element or a button with aria-expanded, plus show more and show less for long text.
---

A collapsible hides one region behind one control: technical details, the rest of a long list, advanced options. For a stack of related headings use an [accordion](./accordion.md). For a menu or a floating panel use a [popover](./popover.md). Do not hide content people need to finish the task.

## Examples

Native `details`. It works without JavaScript and is the first choice.

```html preview title="details"
<details class="ds-collapsible" style="max-width:36rem">
  <summary>Show technical details</summary>
  <div class="ds-collapsible__content">
    <p>Request 7F3A-2026-1102 reached the server at 14:05:12 and was answered with status 503 after 3 attempts.</p>
  </div>
</details>
```

Button with `aria-expanded`. Use it when the control is not at the top of the region, when the label changes, or when other code needs the state. The region follows the button and starts `hidden`.

```html preview title="Button and region"
<div class="ds-collapsible" data-ds-collapsible style="max-width:36rem">
  <ul style="margin:0;padding-inline-start:1.25rem">
    <li>Ayu Lestari, project lead</li>
    <li>Daniel Okafor, finance</li>
  </ul>
  <button type="button" class="ds-collapsible__trigger" aria-expanded="false" aria-controls="col-team">Show 2 more people</button>
  <div class="ds-collapsible__content" id="col-team" hidden>
    <ul style="margin:0;padding-inline-start:1.25rem">
      <li>Mei Tanaka, design</li>
      <li>Sofia Marquez, operations</li>
    </ul>
  </div>
</div>
```

Show more and show less. The text is clamped to `--ds-clamp-lines` (3 by default) with a fade; the button appears only when the text is longer, and its label follows `aria-expanded`.

```html preview title="Show more, show less"
<div class="ds-collapsible is-clamp" data-ds-collapsible style="max-width:36rem;--ds-clamp-lines:3">
  <p class="ds-collapsible__clamp">The Q3 reconciliation covers 1,284 invoices across 14 clients. Of these, 1,201 were paid on time, 61 were paid within 14 days of the due date and 22 are still open. The open items total 48,310.00 and are concentrated in two clients, both of which have agreed a payment plan that ends on 15 Dec 2026. Credit notes issued during the quarter total 6,120.00 and are already deducted from the figures above.</p>
  <button type="button" class="ds-collapsible__trigger" aria-expanded="false" hidden>Show more</button>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Collapsed | `aria-expanded="false"` or no `open` | Chevron down; the region is hidden |
| Expanded | `aria-expanded="true"` or `open` | Chevron rotated 180°; the region visible |
| Hover | Pointer over the control | Link-colour state layer at 6% |
| Pressed | Pointer down | State layer at 10%, scale 0.97 |
| Focus-visible | Keyboard focus | 2px `--ds-focus` ring, 2px offset |
| Opening | Toggle | The region grows over 240ms (grid row 0fr to 1fr, or height) and fades in |
| Closing | Toggle | Shrinks over 140ms, then `hidden` is set |
| Disabled | `disabled` or `aria-disabled="true"` | 55% opacity, `not-allowed` |
| Busy | `aria-busy="true"` on the control | `progress` cursor; use when the content loads on first open |
| Clamped | `.is-clamp`, text longer than the lines | A fade over the last 1.5 lines; the control shows "Show more" |
| Short text | Text fits | The control stays hidden |

## Anatomy

- `.ds-collapsible`: the wrapper (`details` or `div[data-ds-collapsible]`).
- `.ds-collapsible__trigger`: the button (or the `summary` of the `details` form) with a rotating chevron.
- `.ds-collapsible__content`: the region; `.ds-collapsible__inner` is added around its children by the script.
- `.ds-collapsible__clamp`: the clamped text of the show more variant; `.is-clamp` on the wrapper.

## Usage

- Name the control for what it reveals and its size: "Show technical details", "Show 2 more people". For text use "Show more" and "Show less".
- Do not change the control's position when it opens. Keep it above the region, or at the end of the clamped text.
- Use 3 lines for a summary and 5 for a description. Do not clamp text that is only one or two lines longer than the limit.
- Do not put essential instructions, errors or required fields in a collapsed region.
- Do not use a collapsible for a long menu; use a menu or a [popover](./popover.md).

## Accessibility

- The button form follows the WAI-ARIA disclosure pattern: a button with `aria-expanded` and `aria-controls` that points at the region. The region is `hidden` while closed, so it is out of the tab order and the accessibility tree.
- The `details` form needs no ARIA; the browser exposes the expanded state of the `summary`.
- The clamped text stays in the DOM in full, so screen readers read all of it; the button announces "Show more, collapsed".
- Target: at least 36px high (44px on coarse pointers).
- Motion: opens in 240ms and closes in 140ms using only grid rows, height and opacity; reduced motion makes it instant.

| Key | Action |
| --- | --- |
| Enter, Space | Toggle the region |
| Tab | Moves to the content once it is open |

## Razor

```cshtml
<ds-collapsible title="Show technical details">
    Request 7F3A-2026-1102 was answered with status 503 after 3 attempts.
</ds-collapsible>
```

`ds-collapsible` renders the `details` form; add `open` to start expanded. For the button form and for show more, write the markup above.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-collapsible` | On the wrapper of the button form or of show more: the script wires the button |
| `aria-expanded` on `.ds-collapsible__trigger` | Initial state; the script keeps it in sync and sets `aria-controls` when missing |
| `.is-clamp` and `--ds-clamp-lines` | Show more: the number of lines |
| `data-ds-label-collapsed`, `data-ds-label-expanded` | Show more labels (defaults are the localised "Show more" and "Show less") |

The event `ds:collapsible:toggle` bubbles with `detail.open`, for the button form and for `details`.

## Tokens

`--ds-link`, `--ds-radius-lg`, `--ds-size-target`, `--ds-size-target-compact`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-disabled`, `--ds-duration-layout`, `--ds-duration-exit`, `--ds-duration-quick`, `--ds-ease-emphasized`, `--ds-focus`.

## Native and daisyUI

The `details` form is the native element with the same animation as the [accordion](./accordion.md). The button form uses `grid-template-rows` for the height, not daisyUI's `collapse`.
