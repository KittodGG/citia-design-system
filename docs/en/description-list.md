---
title: Description list
group: components
category: data-display
order: 8
summary: Label and value pairs in a vertical, horizontal or grid layout, with row actions, copy buttons and a dash for empty values.
source: TPS app.css .pt-dl L3644–3646, .master-detail dl L1911–1949
---

A description list shows the properties of one record: customer, invoice, project. It is a real `dl` with `dt` and `dd`, so assistive technology reads pairs. For a comparison across many records use a [table](./table.md); for a short summary of a confirmation dialog use `.ds-kv`.

## Examples

```html preview title="Grid (default) and vertical"
<div class="ds-grid-2">
  <dl class="ds-dl">
    <div class="ds-dl__row"><dt>Customer</dt><dd>Mei Tanaka</dd></div>
    <div class="ds-dl__row"><dt>Invoice</dt><dd>INV-2026-0418</dd></div>
    <div class="ds-dl__row"><dt>Amount</dt><dd>IDR 12,400,000</dd></div>
    <div class="ds-dl__row"><dt>Due date</dt><dd>20 Nov 2026</dd></div>
  </dl>
  <dl class="ds-dl is-vertical">
    <div class="ds-dl__row"><dt>Project</dt><dd>PRJ-1024 Website redesign</dd></div>
    <div class="ds-dl__row"><dt>Owner</dt><dd>Ayu Lestari</dd></div>
    <div class="ds-dl__row"><dt>Notes</dt><dd></dd></div>
  </dl>
</div>
```

```html preview title="Horizontal with actions and copy"
<dl class="ds-dl is-horizontal is-boxed">
  <div class="ds-dl__row"><dt>Full name</dt><dd>Daniel Okafor</dd><span class="ds-dl__actions"><button type="button" class="btn btn-ghost btn-xs">Edit</button></span></div>
  <div class="ds-dl__row"><dt>Email</dt><dd id="dl-mail">daniel.okafor@example.com</dd><span class="ds-dl__actions"><button type="button" class="btn btn-ghost btn-xs" data-ds-copy="#dl-mail" data-ds-copy-message="Email copied" aria-label="Copy email"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg></button></span></div>
  <div class="ds-dl__row"><dt>Role</dt><dd><span class="ds-status is-success has-dot">Administrator</span></dd></div>
  <div class="ds-dl__row"><dt>Phone</dt><dd class="ds-dl__empty"><span aria-hidden="true">&mdash;</span><span class="ds-visually-hidden">Not provided</span></dd><span class="ds-dl__actions"><button type="button" class="btn btn-ghost btn-xs">Add</button></span></div>
</dl>
```

```html preview title="Cells grid"
<dl class="ds-dl is-grid is-cells">
  <div class="ds-dl__row"><dt>Region</dt><dd>Jakarta</dd></div>
  <div class="ds-dl__row"><dt>Currency</dt><dd>IDR</dd></div>
  <div class="ds-dl__row"><dt>Payment terms</dt><dd>Net 30</dd></div>
  <div class="ds-dl__row"><dt>Tax ID</dt><dd>01.234.567.8-901.000</dd></div>
  <div class="ds-dl__row"><dt>Billing contact</dt><dd>Sofia Marquez</dd></div>
  <div class="ds-dl__row"><dt>Last invoice</dt><dd>2 Nov 2026</dd></div>
</dl>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Default | `dt` in `--ds-subtle` (13px), `dd` in 15px medium weight, hairline between horizontal rows |
| Empty value | Empty `dd`, or `.ds-dl__empty` | Dash in `--ds-subtle`; screen readers hear "Not provided" from the hidden text |
| Long value | Long text, long codes | `overflow-wrap: anywhere`; the row grows |
| Copy | `data-ds-copy` button | Transient success message for 1.6 to 2 s |
| Row action hover, focus | Pointer, keyboard on a row button | The button's own states; rows have none |
| Narrow container | Under 640px | Horizontal rows stack: label above value, action beside the value |
| Loading | Content not ready | Use `.ds-bone` in `dd`; set `aria-busy="true"` on the list |

## Anatomy

- `dl.ds-dl` with `is-vertical`, `is-horizontal`, `is-grid` (`is-cells`), `is-boxed`, `is-detail`.
- `.ds-dl__row` (a `div` wrapping `dt` and `dd`, allowed in `dl`), `dt`, `dd`, `.ds-dl__actions`, `.ds-dl__empty`.
- Label column width: `--ds-dl-label` (default 14rem) on `is-horizontal`.
- `.ds-config-grid` and `.ds-kv` remain for configuration tiles and dialogs.

## Usage

- Order pairs by how people read the record: identity first, money and dates next, notes last.
- Keep labels to 1 to 3 words, no colon. Show a dash for missing values rather than hiding the row.
- Use horizontal on pages 640px or wider and when values are long text; use grid for short values.
- Put at most one action per row, at the end of the row. Prefer "Edit" for the section in the card header.
- Do not use a description list for navigation or for form fields.

## Accessibility

- `dl`, `dt` and `dd` expose pair semantics; keep every `dd` after its `dt`.
- A copy button needs an accessible name that says what it copies ("Copy email").
- A dash alone is read as "em dash" or skipped; pair it with hidden "Not provided".

## Razor

No tag helper; write the markup. Pass values through `Fmt.Date`, `Fmt.Decimal` and `Html.Encode`:

```cshtml
<dl class="ds-dl is-horizontal">
    <div class="ds-dl__row"><dt>@T["Customer"]</dt><dd>@Model.CustomerName</dd></div>
    <div class="ds-dl__row"><dt>@T["Due date"]</dt><dd>@Fmt.Date(Model.DueDate)</dd></div>
</dl>
```

## Tokens

`--ds-subtle`, `--color-base-300`, `--ds-radius-card`, `--ds-space-card-x`, `--ds-dl-label` (set it on the list).

## Native and daisyUI

Uses the native `dl`, `dt`, `dd`. daisyUI has no description list; `.list-row` is a different pattern. The version 1 `.ds-dl` (auto columns) is the default layout here.
