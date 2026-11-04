---
title: Stepper
group: components
category: feedback
order: 7
summary: A list of steps in a process, vertical or horizontal, with complete, current, upcoming, error, optional and disabled steps, links or status only, and a compact "Step 2 of 5" on narrow screens.
source: TPS app.css .bc-verification L52–57
---

A stepper shows where a person is in a process with a fixed order: onboarding, checkout, a multi-page form, an import. It answers "how many steps, which one now, what is done". It is not navigation between sections (use [tabs](./tabs.md)) and not a measure of a task's progress in percent (use a progress bar). Keep it to 3 to 7 steps; beyond that, group the steps.

## Examples

Vertical, status only. The connector between the markers turns primary once a step is complete.

```html preview title="Vertical"
<div class="ds-stepper" style="max-width:26rem">
  <ol class="ds-steps" aria-label="Project setup">
    <li class="ds-step is-complete"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Completed: </span>Create the project</span><span class="ds-step__desc">PRJ-1024, created 28 Oct 2026</span></div></li>
    <li class="ds-step is-complete"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Completed: </span>Invite the team</span><span class="ds-step__desc">4 people joined</span></div></li>
    <li class="ds-step" aria-current="step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Set the budget</span><span class="ds-step__desc">Add a total and a currency</span></div></li>
    <li class="ds-step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Review and start</span></div></li>
  </ol>
</div>
```

Horizontal, with links. Completed steps are links, so a person can go back. The current and upcoming steps are not links.

```html preview title="Horizontal, clickable"
<div class="ds-stepper">
  <p class="ds-stepper__compact" aria-hidden="true">Step 3 of 4: <span>Payment</span></p>
  <ol class="ds-steps is-horizontal" aria-label="Checkout">
    <li class="ds-step is-complete"><a class="ds-step__link" href="#"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Completed: </span>Cart</span><span class="ds-step__desc">3 items</span></a></li>
    <li class="ds-step is-complete"><a class="ds-step__link" href="#"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Completed: </span>Delivery</span><span class="ds-step__desc">Jakarta office</span></a></li>
    <li class="ds-step" aria-current="step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Payment</span><span class="ds-step__desc">Card or transfer</span></div></li>
    <li class="ds-step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Confirmation</span></div></li>
  </ol>
</div>
```

Error, optional and disabled steps.

```html preview title="Error, optional, disabled"
<div class="ds-stepper">
  <ol class="ds-steps is-horizontal" aria-label="Import data">
    <li class="ds-step is-complete"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Completed: </span>Upload file</span></div></li>
    <li class="ds-step is-error" aria-current="step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Needs attention: </span>Map columns</span><span class="ds-step__desc">2 columns have no match</span></div></li>
    <li class="ds-step is-optional"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Clean up<span class="ds-step__tag">Optional</span></span></div></li>
    <li class="ds-step is-disabled" aria-disabled="true"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Unavailable: </span>Import</span><span class="ds-step__desc">Finish mapping first</span></div></li>
  </ol>
</div>
```

Narrow screens. When the container is narrower than 26rem the labels collapse into the markers and a "Step 2 of 4" line appears. The demo is 20rem wide.

```html preview title="Compact (narrow container)"
<div class="ds-stepper" style="max-width:20rem">
  <p class="ds-stepper__compact" aria-hidden="true">Step 2 of 4: <span>Delivery</span></p>
  <ol class="ds-steps is-horizontal" aria-label="Checkout">
    <li class="ds-step is-complete"><a class="ds-step__link" href="#"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Completed: </span>Cart</span></a></li>
    <li class="ds-step" aria-current="step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Delivery</span></div></li>
    <li class="ds-step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Payment</span></div></li>
    <li class="ds-step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Confirmation</span></div></li>
  </ol>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Upcoming | Default | Hollow 28px marker with its number, text in the normal colour |
| Current | `aria-current="step"` | Primary border, a 22% ring and a tinted fill; label in weight 700 |
| Complete | `is-complete` | Filled primary marker with a check glyph; the connector after it is primary; hidden "Completed: " for screen readers |
| Error | `is-error` | Error-coloured border and an exclamation glyph; the description is in the error colour; hidden "Needs attention: " |
| Optional | `is-optional` | Dashed marker and an "Optional" tag next to the label |
| Disabled | `is-disabled` or `aria-disabled="true"` | 55% opacity, `not-allowed`, not a link |
| Link hover | Pointer over a link step | Label underlined; the marker border turns primary (not on complete steps) |
| Link pressed | Pointer down | The marker scales to 0.97 |
| Focus-visible | Keyboard focus on a link | 2px ring around the whole step |
| Compact | Container under 26rem | Labels are visually hidden, the "Step n of m" line shows |

Colours are never the only cue: complete has a check, error has an exclamation mark, optional has a dashed marker and a word, current has a ring and weight, and each state also has hidden text for screen readers.

## Anatomy

- `.ds-stepper`: the optional wrapper that is the container for the compact layout, and `.ds-stepper__compact` the "Step 2 of 5" line.
- `ol.ds-steps`: the list. `is-horizontal` lays steps in a row; `is-centered` centres their labels.
- `li.ds-step`: one step with `is-complete`, `is-error`, `is-optional`, `is-disabled` and `aria-current="step"`.
- `.ds-step__link`: `a` for a clickable step, `div` for status only.
- `.ds-step__marker`, `.ds-step__label`, `.ds-step__desc`, `.ds-step__tag`.
- The version 1 markup (`ol.ds-steps > li` with `is-success`, `is-error`, `is-warning`) still renders as numbered circles.

## Usage

- Name steps with a noun or a short verb phrase of at most 24 characters: "Payment", "Map columns".
- Link completed steps so people can go back; do not link upcoming steps, because skipping ahead breaks the process. If steps can be done in any order, use a [checklist](./list.md) instead.
- Add a one-line description only when the label is not enough, and only on the steps that need it.
- Show the compact form below 26rem. Do not hide the current step's name: it is in the "Step 2 of 4" line.
- Mark a step as error when the person has to return to it, and say what is wrong in its description.
- Do not use a stepper for navigation between independent pages.
- Do not exceed 7 steps.

## Accessibility

- The list is an `ol` with an `aria-label` that names the process. The current step has `aria-current="step"`.
- State words are in hidden text before the label ("Completed: Cart"), so the state does not depend on the glyph.
- A link step is a real link. A step that cannot be visited is not a link and, when disabled, has `aria-disabled="true"`.
- The compact line is `aria-hidden="true"` because the list already carries the same information.
- Contrast: marker border 3:1 or more, label 4.5:1, in both themes. Forced colours: the complete and current markers use `Highlight`.
- Motion: marker colours change over 160ms; nothing travels.

| Key | Action |
| --- | --- |
| Tab | Moves to the next link step |
| Enter | Follows the link |

## Razor

```cshtml
<ds-stepper current="3" orientation="Horizontal" label="Checkout">
    <ds-step title="Cart" href="/checkout/cart" description="3 items" />
    <ds-step title="Delivery" href="/checkout/delivery" />
    <ds-step title="Payment" description="Card or transfer" />
    <ds-step title="Clean up" optional />
    <ds-step title="Confirmation" disabled />
</ds-stepper>
```

| Attribute | Effect |
| --- | --- |
| `ds-stepper current` | 1-based current step; earlier steps are complete, later ones upcoming |
| `orientation` | `Vertical` (default) or `Horizontal` |
| `centered` | Centre the labels (horizontal) |
| `label` | The accessible name of the list |
| `ds-step title`, `description` | Label and one-line description |
| `href` | Makes the step a link |
| `state` | `Auto` (default), `Complete`, `Current`, `Upcoming`, `Error` |
| `optional`, `disabled` | Flags |

The horizontal layout renders the "Step 3 of 5: Payment" line for narrow containers.

## JavaScript

None. The stepper is HTML and CSS; the container query switches the compact layout. Update the steps on the server for each page of the process.

## Tokens

`--color-primary`, `--color-primary-content`, `--ds-control-border`, `--ds-error-text`, `--color-base-100`, `--color-base-300`, `--ds-subtle`, `--ds-border-emphasis`, `--ds-opacity-state-selected`, `--ds-opacity-disabled`, `--ds-duration-quick`, `--ds-focus`.

## Native and daisyUI

The stepper is an ordered list. It does not use daisyUI's `steps`: those draw connectors with pseudo-elements that cannot hold links, descriptions or the error and optional states.
