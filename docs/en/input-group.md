---
title: Input group
group: components
category: forms
order: 3
summary: Attach text, a button or a select to an input so the pieces read as one control - protocol, domain, currency, unit, submit.
---

An input group joins an input to fixed context: `https://`, `.com`, `USD`, a unit select or an action button. Use it when the addon is part of the value. If the addon only decorates the field, use an icon or affix inside [input](./input.md). For a quantity with plus and minus, use [number input](./number-input.md).

## Examples

### Text addons

```html preview title="Text addons"
<div class="ds-form" style="max-width:30rem">
  <div class="ds-field">
    <label for="ig-site">Website</label>
    <div class="ds-input-group">
      <span class="ds-input-group__addon">https://</span>
      <div class="ds-input"><input id="ig-site" class="ds-input__control" value="citia-engineering"></div>
      <span class="ds-input-group__addon">.com</span>
    </div>
  </div>
  <div class="ds-field">
    <label for="ig-amount">Amount</label>
    <div class="ds-input-group">
      <span class="ds-input-group__addon">USD</span>
      <div class="ds-input"><input id="ig-amount" class="ds-input__control" inputmode="decimal" value="12,480.00"></div>
    </div>
  </div>
</div>
```

### Button and select addons

A button addon runs one action on the value (copy, apply, send). A select addon changes how the value is read (currency, unit, country code).

```html preview title="Button and select"
<div class="ds-form" style="max-width:30rem">
  <div class="ds-field">
    <label for="ig-code">Discount code</label>
    <div class="ds-input-group">
      <div class="ds-input"><input id="ig-code" class="ds-input__control" value="SPRING-2026"></div>
      <button type="button" class="btn btn-primary">Apply</button>
    </div>
  </div>
  <div class="ds-field">
    <label for="ig-phone">Phone</label>
    <div class="ds-input-group">
      <select class="select" aria-label="Country code"><option>+62</option><option>+81</option><option>+1</option></select>
      <div class="ds-input"><input id="ig-phone" type="tel" class="ds-input__control" value="812 5550 1987" autocomplete="tel-national"></div>
    </div>
  </div>
</div>
```

### Sizes and separate variant

`is-sm` and `is-lg` size every part together. `is-separate` keeps the pieces in one row with an 8px gap instead of a shared edge.

```html preview title="Sizes"
<div class="ds-form" style="max-width:30rem">
  <div class="ds-input-group is-sm"><span class="ds-input-group__addon">kg</span><div class="ds-input"><input class="ds-input__control" aria-label="Weight" value="18.5"></div></div>
  <div class="ds-input-group is-lg"><div class="ds-input"><input class="ds-input__control" aria-label="Invoice" value="INV-2026-0418"></div><button type="button" class="btn">Copy</button></div>
  <div class="ds-input-group is-separate"><div class="ds-input"><input class="ds-input__control" aria-label="Start" value="PRJ-1024"></div><button type="button" class="btn">Search</button></div>
</div>
```

## States

```html preview title="Group states"
<div class="ds-form" style="max-width:30rem">
  <div class="ds-input-group"><span class="ds-input-group__addon">USD</span><div class="ds-input"><input class="ds-input__control" aria-label="Disabled" value="480.00" disabled></div></div>
  <div class="ds-input-group"><span class="ds-input-group__addon">USD</span><div class="ds-input"><input class="ds-input__control" aria-label="Invalid" value="-5" aria-invalid="true"></div></div>
  <div class="ds-input-group"><span class="ds-input-group__addon">USD</span><div class="ds-input" data-state="success"><input class="ds-input__control" aria-label="Valid" value="120.00"></div></div>
  <div class="ds-input-group"><div class="ds-input" aria-busy="true"><input class="ds-input__control" aria-label="Loading" value="SPRING-2026"></div><button type="button" class="btn" aria-disabled="true">Apply</button></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | Shared 1px edges (no double border), outer corners rounded |
| Hover | Pointer over the input or button | Each part keeps its own hover |
| Focus | `:focus-visible` in a part | That part rises above its neighbours and draws the 2px ring |
| Disabled | `disabled` on the input | Addon text dims with the input |
| Invalid | `aria-invalid` on the input | Addons take the error border |
| Loading | `aria-busy` on the `.ds-input` | Spinner in the input; the button is `aria-disabled` while the check runs |

## Anatomy

- `.ds-input-group`: flex row, parts share edges (`margin-inline-start: -1px`).
- `.ds-input-group__addon`: static text or icon, `base-200` fill, `--ds-subtle` text.
- `.ds-input`, `input.input`, `.select`, `.btn`: the interactive parts, in any order.
- Modifiers: `is-sm`, `is-lg`, `is-separate`, `is-wrap` (stacks below 480px).

## Usage

- Keep one input per group. Put two inputs side by side in a [field grid](./field.md) instead.
- Name the whole group with the field label; give an addon select its own `aria-label`.
- Use a text addon only for values that never change (`https://`). Let people type a full URL when they might paste one.
- At most one button per group, on the end, and it must say what it does ("Apply", not an icon alone).
- Do not nest groups. Do not mix sizes inside one group.

## Accessibility

- Addon text is real text, so it is read in order: "https://, Website, edit text".
- Give a text addon `aria-hidden="true"` when the label already says the same thing.
- A select addon needs `aria-label`; a button addon needs a text label or `aria-label`.
- Targets are 44px high; on touch the small size grows to 44px.
- Focus ring is drawn on the focused part and lifted by `z-index: 1`; forced colours use `Highlight`.

| Key | Action |
| --- | --- |
| Tab | Moves through the parts in DOM order |
| Enter | In the input: submits the form or triggers the default button |

## Razor

`<ds-field>` renders one `ds-input` with `prefix` and `suffix` inside the border. For a true joined group write the markup above; the field id wiring stays the same.

```cshtml
<ds-field asp-for="Website" label="Website" prefix="https://" suffix=".com" />
```

## Tokens

`--ds-control-border`, `--color-base-200`, `--ds-subtle`, `--radius-field`, `--ds-size-target`, `--ds-size-target-compact`, `--ds-opacity-disabled`, `--color-error`.

## Native and daisyUI

Replaces daisyUI `join`. Uses `.btn`, `.select` and `.input` as parts; the DS removes the joined radii and doubled borders and sets one height for all parts with `--ds-group-h`.
