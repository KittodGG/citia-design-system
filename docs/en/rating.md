---
title: Rating
group: components
category: forms
order: 24
summary: Star rating built on radio buttons, with hover preview, optional clearing and a read-only display that shows fractional averages such as 4.3.
---

A rating collects a score on a short scale, usually 1 to 5 stars, or shows an average score. Use the input for quick, subjective feedback (a support conversation, a delivery). Use the read-only display for averages next to a product, supplier or document. For precise numeric scores, use a [Slider](./slider.md) or a [Number input](./number-input.md); for "how likely" questions with labelled points, use a [Radio group](./radio-group.md).

## Examples

### Input

Each star is a `label.ds-rating__star` around a radio with a visually hidden name ("3 stars"). The radios share one `name` and post the chosen number. Pointing at a star previews the score; the committed score stays primary.

```html preview title="Rating input"
<fieldset class="ds-rating">
  <legend>How was the onboarding session with Mei Tanaka?</legend>
  <div class="ds-rating__row">
    <div class="ds-rating__stars">
      <label class="ds-rating__star"><input type="radio" name="SessionScore" value="1"><span class="ds-visually-hidden">1 star</span></label>
      <label class="ds-rating__star"><input type="radio" name="SessionScore" value="2"><span class="ds-visually-hidden">2 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="SessionScore" value="3"><span class="ds-visually-hidden">3 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="SessionScore" value="4" checked><span class="ds-visually-hidden">4 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="SessionScore" value="5"><span class="ds-visually-hidden">5 stars</span></label>
    </div>
    <span class="ds-rating__value" aria-hidden="true">4</span>
  </div>
</fieldset>
```

### Clearable

`data-ds-rating-clearable` adds a Clear button (shown only when a score is set) and clears the score when the chosen star is clicked again. A cleared rating posts nothing; bind it to `int?`.

```html preview title="Clearable"
<fieldset class="ds-rating" data-ds-rating-clearable>
  <legend>Rate supplier PRJ-1024</legend>
  <div class="ds-rating__row">
    <div class="ds-rating__stars">
      <label class="ds-rating__star"><input type="radio" name="SupplierScore" value="1"><span class="ds-visually-hidden">1 star</span></label>
      <label class="ds-rating__star"><input type="radio" name="SupplierScore" value="2"><span class="ds-visually-hidden">2 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="SupplierScore" value="3" checked><span class="ds-visually-hidden">3 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="SupplierScore" value="4"><span class="ds-visually-hidden">4 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="SupplierScore" value="5"><span class="ds-visually-hidden">5 stars</span></label>
    </div>
  </div>
</fieldset>
```

### Read-only display with a fractional value

`span.ds-rating-display` fills the stars to the exact value (4.3 of 5 fills 86%). `data-ds-rating-value` drives the fill with CSS `attr()` where supported and with ds.js elsewhere. Put the number and the count next to it in `.ds-rating-summary`.

```html preview title="Average rating"
<div class="grid gap-3">
  <span class="ds-rating-summary">
    <span class="ds-rating-display" data-ds-rating-value="4.3" role="img" aria-label="Rated 4.3 out of 5"></span>
    <strong aria-hidden="true">4.3</strong><span>128 reviews</span>
  </span>
  <span class="ds-rating-summary">
    <span class="ds-rating-display" data-ds-rating-value="3.65" role="img" aria-label="Rated 3.7 out of 5"></span>
    <strong aria-hidden="true">3.7</strong><span>41 reviews</span>
  </span>
  <span class="ds-rating-summary">
    <span class="ds-rating-display is-sm" data-ds-rating-value="5" role="img" aria-label="Rated 5 out of 5"></span>
    <strong aria-hidden="true">5.0</strong><span>1 review</span>
  </span>
</div>
```

### Sizes

```html preview title="Sizes"
<div class="flex flex-wrap items-center gap-8">
  <span class="ds-rating-display is-sm" data-ds-rating-value="4" role="img" aria-label="Rated 4 out of 5"></span>
  <span class="ds-rating-display" data-ds-rating-value="4" role="img" aria-label="Rated 4 out of 5"></span>
  <span class="ds-rating-display is-lg" data-ds-rating-value="4" role="img" aria-label="Rated 4 out of 5"></span>
</div>
```

The input takes the same modifiers on `.ds-rating`: `is-sm` (16px stars), default 24px, `is-lg` (32px).

## States

```html preview title="Rating states"
<div class="grid gap-6 sm:grid-cols-2">
  <fieldset class="ds-rating">
    <legend>No score yet</legend>
    <div class="ds-rating__stars">
      <label class="ds-rating__star"><input type="radio" name="st-r1" value="1"><span class="ds-visually-hidden">1 star</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r1" value="2"><span class="ds-visually-hidden">2 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r1" value="3"><span class="ds-visually-hidden">3 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r1" value="4"><span class="ds-visually-hidden">4 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r1" value="5"><span class="ds-visually-hidden">5 stars</span></label>
    </div>
  </fieldset>
  <fieldset class="ds-rating" disabled>
    <legend>Disabled (score 2)</legend>
    <div class="ds-rating__stars">
      <label class="ds-rating__star"><input type="radio" name="st-r2" value="1"><span class="ds-visually-hidden">1 star</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r2" value="2" checked><span class="ds-visually-hidden">2 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r2" value="3"><span class="ds-visually-hidden">3 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r2" value="4"><span class="ds-visually-hidden">4 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r2" value="5"><span class="ds-visually-hidden">5 stars</span></label>
    </div>
  </fieldset>
  <fieldset class="ds-rating" aria-invalid="true" aria-describedby="st-r3-err">
    <legend>Invalid (required)</legend>
    <div class="ds-rating__stars">
      <label class="ds-rating__star"><input type="radio" name="st-r3" value="1" required><span class="ds-visually-hidden">1 star</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r3" value="2" required><span class="ds-visually-hidden">2 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r3" value="3" required><span class="ds-visually-hidden">3 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r3" value="4" required><span class="ds-visually-hidden">4 stars</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r3" value="5" required><span class="ds-visually-hidden">5 stars</span></label>
    </div>
    <p id="st-r3-err" class="ds-field-error">Choose a score from 1 to 5.</p>
  </fieldset>
  <div>
    <p class="ds-label">Read-only, 2.5</p>
    <span class="ds-rating-display" data-ds-rating-value="2.5" role="img" aria-label="Rated 2.5 out of 5"></span>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Empty | no radio checked | all stars in the neutral off colour (20% of the text colour) |
| Hover preview | pointer over star n (`@media (hover: hover)`) | stars 1 to n in a 60% primary tint, star n grows to 108% |
| Pressed | pointer down on a star | star shrinks to 92% (120ms) |
| Selected | radio n `:checked` | stars 1 to n primary |
| Focus-visible | keyboard focus on a radio | 2px ring `--ds-focus` around the focused star |
| Cleared | Clear button or clicking the chosen star again | all stars off, "Rating cleared." announced |
| Invalid | `aria-invalid="true"` on the fieldset | off stars tinted with error, message below |
| Disabled | `disabled` on the fieldset or radios | `--ds-opacity-disabled`, `cursor: not-allowed`, no preview |
| Read-only | `.ds-rating-display` | fill to the exact fraction, no interaction |

## Anatomy

- `fieldset.ds-rating` — group with `legend`; ds.js enhances every `.ds-rating` (value text, change event); `data-ds-rating-clearable` adds clearing.
- `.ds-rating__row` — stars plus optional `.ds-rating__value` and `.ds-rating__clear` (generated).
- `.ds-rating__stars` — the stars in order 1 to n.
- `label.ds-rating__star` — one star (drawn by `::before` with a star mask) containing the transparent radio and its hidden name.
- `.ds-rating-display` — read-only stars; `.ds-rating-summary` places number and count beside it.

## Usage

- Use 5 stars. Use 3 or 10 only when the scale is defined in the label.
- Ask one question per rating and say what is rated ("the onboarding session", not "this").
- Show averages with one decimal and the number of ratings ("4.3, 128 reviews"); an average from fewer than 3 ratings misleads.
- Do not use stars for agreement scales or severity; use a labelled [Radio group](./radio-group.md).
- Do not colour stars by score (red for 1, green for 5).

## Accessibility

- Native radios in a `fieldset`: one Tab stop, arrow keys change the score, the legend names the group and each star has a hidden name ("4 stars").
- The radios are transparent and cover the star, so pointer and keyboard target the same element; each star is at least 24×24px.
- The display is `role="img"` with an `aria-label` ("Rated 4.3 out of 5"); the visible number next to it is `aria-hidden` to avoid reading it twice.
- Stars are not colour alone: the count of filled stars is the information, and the number is printed next to the display.
- Forced colours: filled stars use `Highlight`, empty stars `GrayText`.

| Key | Action |
| --- | --- |
| Tab | Move into the rating (to the chosen star, or the first) and out of it |
| Arrow Right / Arrow Up | Next star (higher score) |
| Arrow Left / Arrow Down | Previous star (lower score) |
| Space | Choose the focused star when none is chosen |

## Razor

```cshtml
<ds-rating asp-for="SessionScore" label="How was the onboarding session?" show-value />
<ds-rating asp-for="SupplierScore" label="Rate the supplier" clearable size="lg" />

<ds-rating-display value="@Model.Average" count="@Model.ReviewCount" />
<ds-rating-display value="4.3" show-value="false" size="sm" />
```

`<ds-rating>` writes the fieldset, legend, radios with localized names and the model error. `<ds-rating-display>` writes the stars with the fill set inline, the localized label, the number (current culture, one decimal) and the count.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `.ds-rating` | Every one is enhanced: updates `.ds-rating__value`; fires `ds:rating:change` `{ value }` (`null` when cleared) |
| `data-ds-rating-clearable` | Adds the Clear button; clicking the chosen star again clears it |
| `.ds-rating-display[data-ds-rating-value]` | Sets the fill (`--ds-rating-value`, `--ds-rating-max`) and an `aria-label` when missing |
| `data-ds-rating-max` | Scale of the display (default 5) |

## Tokens

`--color-primary`, `--color-base-content`, `--color-base-100`, `--color-error`, `--ds-focus`, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-duration-instant`, `--ds-radius-sm`. Component variables: `--ds-rating-size`, `--ds-rating-on`, `--ds-rating-preview`, `--ds-rating-off`; set `--ds-rating-on: var(--color-warning)` on a container for amber stars.

## Native and daisyUI

daisyUI `.rating` masks the radio inputs themselves, which also clips the focus ring and offers no hover preview. The DS builds its own `.ds-rating` on radios inside labels so the ring stays visible, adds the preview, clearing and a fractional display. daisyUI `.rating` with `.mask-star-2` still works if you use it directly.
