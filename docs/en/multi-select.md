---
title: Multi-select
group: components
category: forms
order: 26
summary: A combobox for choosing several options from a list, with chips in the field, checkmarks in the list, select all, a maximum and a "+N more" overflow.
---

A multi-select picks several values from a known list: people to notify, labels, regions. It is a [Combobox](./combobox.md) whose choices appear as chips in the field. With 7 or fewer options, show a [Checkbox](./checkbox.md) group instead; every option stays visible and needs one click. When people type their own values with no list, use a [Tags input](./tags-input.md).

## Examples

### Basic

Add `data-ds-multiselect` to a `<select multiple>`. The select stays in the form and posts every chosen value under one name, so a `List<string>` or `int[]` model binds as usual.

```html preview title="Multi-select"
<div class="ds-field" style="max-width: 30rem">
  <label for="ms-notify">Notify</label>
  <select id="ms-notify" name="NotifyIds" multiple data-ds-multiselect data-ds-combobox-label="person" placeholder="Choose people" aria-describedby="ms-notify-hint">
    <option value="u1" data-hint="Finance" selected>Ayu Lestari</option>
    <option value="u2" data-hint="Engineering" selected>Daniel Okafor</option>
    <option value="u3" data-hint="Engineering">Mei Tanaka</option>
    <option value="u4" data-hint="Legal">Sofia Marquez</option>
    <option value="u5" data-hint="Operations">Rahul Iyer</option>
    <option value="u6" data-hint="Operations">Grace Mensah</option>
    <option value="u7" data-hint="Finance">Lukas Weber</option>
  </select>
  <p id="ms-notify-hint" class="ds-hint">They receive an email when the invoice is approved.</p>
</div>
```

### Maximum and overflow

`data-ds-multiselect-max` limits the choices; other options become unavailable when the limit is reached and the limit is announced. `data-ds-multiselect-visible` shows that many chips while the field is not focused and folds the rest into "+N more".

```html preview title="Max 3, show 2"
<div class="ds-field" style="max-width: 30rem">
  <label for="ms-regions">Sales regions</label>
  <select id="ms-regions" name="Regions" multiple data-ds-multiselect data-ds-combobox-label="region" data-ds-multiselect-max="3" data-ds-multiselect-visible="2" aria-describedby="ms-regions-hint">
    <optgroup label="Asia Pacific">
      <option value="id" selected>Indonesia</option>
      <option value="jp" selected>Japan</option>
      <option value="au">Australia</option>
    </optgroup>
    <optgroup label="Europe, Middle East and Africa">
      <option value="es" selected>Spain</option>
      <option value="ng">Nigeria</option>
      <option value="de">Germany</option>
    </optgroup>
  </select>
  <p id="ms-regions-hint" class="ds-hint">Choose up to 3.</p>
</div>
```

### Create values

`data-ds-combobox-create` lets people add a value that is not in the list; it becomes a selected `<option>`.

```html preview title="With create"
<div class="ds-field" style="max-width: 30rem">
  <label for="ms-skills">Skills</label>
  <select id="ms-skills" name="Skills" multiple data-ds-multiselect data-ds-combobox-label="skill" data-ds-combobox-create placeholder="Search or create">
    <option selected>Accounting</option>
    <option>Contract law</option>
    <option>Data analysis</option>
    <option>Project management</option>
  </select>
</div>
```

Remote options work as in the combobox: `data-ds-combobox-source="/api/people?q={q}"`.

## States

```html preview title="Field states"
<div class="grid gap-4 sm:grid-cols-2">
  <div class="ds-field"><label for="ms-st-1">Empty</label><select id="ms-st-1" multiple data-ds-multiselect placeholder="Choose labels"><option>Urgent</option><option>Billing</option></select></div>
  <div class="ds-field"><label for="ms-st-2">Disabled</label><select id="ms-st-2" multiple data-ds-multiselect disabled><option selected>Urgent</option><option selected>Billing</option></select></div>
  <div class="ds-field"><label for="ms-st-3">Invalid</label><select id="ms-st-3" multiple data-ds-multiselect aria-invalid="true" aria-describedby="ms-st-3-err" placeholder="Choose reviewers"><option>Ayu Lestari</option><option>Mei Tanaka</option></select><p id="ms-st-3-err" class="ds-field-error">Choose at least one reviewer.</p></div>
  <div class="ds-field"><label for="ms-st-4">Long labels</label><select id="ms-st-4" multiple data-ds-multiselect><option selected>Quarterly revenue reconciliation for subsidiaries</option><option selected>Audit</option></select></div>
</div>
```

```html preview title="List states (frozen)"
<div style="max-width: 30rem; min-height: 19rem">
<div class="ds-multi-select ds-combobox" data-open data-filled>
  <div class="input ds-multi-select__field">
    <ul class="ds-multi-select__tokens" role="list">
      <li class="ds-token"><span class="ds-token__label">Ayu Lestari</span><button type="button" class="ds-token__remove" tabindex="-1" aria-label="Remove Ayu Lestari"></button></li>
      <li class="ds-token"><span class="ds-token__label">Mei Tanaka</span><button type="button" class="ds-token__remove" tabindex="-1" aria-label="Remove Mei Tanaka"></button></li>
    </ul>
    <input class="ds-multi-select__input" role="combobox" aria-expanded="true" aria-controls="ms-frozen" aria-label="Reviewers">
  </div>
  <div class="ds-combobox__buttons"><button type="button" class="ds-combobox__clear" aria-label="Clear reviewers"></button><button type="button" class="ds-combobox__toggle" tabindex="-1" aria-label="Show reviewer options"></button></div>
  <div class="ds-combobox-popup">
    <div class="ds-combobox-actions"><button type="button" tabindex="-1">Select all</button><button type="button" tabindex="-1">Clear</button></div>
    <ul class="ds-combobox-list" role="listbox" id="ms-frozen" aria-multiselectable="true" aria-label="Reviewer options">
      <li class="ds-combobox-option" role="option" aria-selected="true"><span class="ds-combobox-option__text">Ayu Lestari<small>Selected</small></span></li>
      <li class="ds-combobox-option" role="option" aria-selected="false" data-active><span class="ds-combobox-option__text">Daniel Okafor<small>Highlighted</small></span></li>
      <li class="ds-combobox-option" role="option" aria-selected="true"><span class="ds-combobox-option__text">Mei Tanaka</span></li>
      <li class="ds-combobox-option" role="option" aria-selected="false" aria-disabled="true"><span class="ds-combobox-option__text">Sofia Marquez<small>Unavailable at the maximum</small></span></li>
    </ul>
  </div>
</div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Empty | nothing selected | placeholder in `--ds-subtle` |
| Filled | one or more selected | chips in the field, placeholder hidden, clear-all button visible |
| Focus | focus in the text input | field focus ring (from [Input](./input.md)); all chips shown |
| Open | click, typing, Arrow Down | popup with Select all / Clear and a checkbox square per option |
| Option selected | Enter or click | square fills with primary and the check draws in (180ms); list stays open |
| Highlighted | arrow keys or pointer | `--ds-primary-soft` tonal fill |
| Maximum reached | `data-ds-multiselect-max` | unselected options `aria-disabled`, "You can choose up to 3." announced |
| Overflow | more chips than `data-ds-multiselect-visible`, field not focused | first chips plus a dashed "+N more" chip |
| Chip remove hover / focus | pointer or arrow keys on a chip | state layer on the × button; focus ring on the button, chip border in `--ds-focus` |
| Invalid | `aria-invalid="true"`, or required and empty on submit | error border, message below |
| Disabled | `disabled` on the select | field dimmed, chips without remove action, no popup |
| Loading, empty, error | async source | as in [Combobox](./combobox.md) |

## Anatomy

- `.ds-multi-select.ds-combobox` — wrapper (generated).
- `.ds-multi-select__field.input` — field that wraps chips and the text input.
- `.ds-multi-select__tokens` — list of `.ds-token` chips (`.ds-token__label`, `.ds-token__remove`, `.ds-token.is-more`).
- `.ds-multi-select__input[role="combobox"]` — text input.
- `.ds-combobox__buttons` — clear all and chevron.
- `.ds-combobox-popup` — `.ds-combobox-actions` and `.ds-combobox-list[aria-multiselectable="true"]`.
- `select[multiple][hidden]` — posts the values.

## Usage

- Use for 8 or more options; for fewer, a checkbox group is clearer.
- Order chips in the order of the list, not the order of selection, so the field reads predictably.
- Set a maximum only when the domain needs one, and say it in the hint ("Choose up to 3.").
- Use `data-ds-multiselect-visible` in dense forms and filters; keep it at 2 to 4.
- Do not use for a single value; use a [Combobox](./combobox.md).

## Accessibility

- The text input is an ARIA 1.2 combobox controlling a `listbox` with `aria-multiselectable="true"`; each option has `aria-selected` true or false. The highlight uses `aria-activedescendant`, so focus stays in the input.
- Every change is announced: "Mei Tanaka selected, 3 selected in total.", "… removed …", "Selection cleared.".
- Chips are a list; their remove buttons are out of the Tab order and reached with Arrow Left from the start of the input, so a long selection does not add Tab stops. Each button is named "Remove {label}".
- The checkbox square shows selection with fill and a check, not colour alone. Chips and buttons have a 24px minimum target.

| Key | Action |
| --- | --- |
| Arrow Down / Arrow Up | Open, then move the highlight (skips unavailable options) |
| Enter | Select or deselect the highlighted option; the list stays open |
| Ctrl/Cmd + A | With an empty input and the list open: select all shown options (up to the maximum) |
| Backspace | With an empty input: remove the last chip |
| Arrow Left | At the start of the input: move to the last chip's remove button |
| Arrow Left / Right on a chip | Move between chips; past the last chip, back to the input |
| Backspace / Delete / Enter on a chip | Remove that chip |
| Escape | Close the list; when closed, clear the typed text |
| Tab | Close the list and move on |

## Razor

Use the built-in select helper with a collection property:

```cshtml
<select asp-for="NotifyIds" asp-items="Model.People" multiple
        data-ds-multiselect data-ds-combobox-label="person"
        data-ds-multiselect-max="5" placeholder="Choose people"></select>
```

ASP.NET Core adds `multiple` automatically for collection properties and marks the selected options from the model.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `select[multiple][data-ds-multiselect]` | Enhances the select |
| `data-ds-multiselect-max` | Maximum number of choices |
| `data-ds-multiselect-visible` | Chips shown while the field is not focused; the rest fold into "+N more" |
| `placeholder` | Shown while nothing is selected |
| All `data-ds-combobox-*` options | Label, create, async source, min characters (see [Combobox](./combobox.md)) |

Events on the select: native `input` and `change`, and `ds:multiselect:change` `{ values }`. `DS.addComboboxOption(select, { value, label })` adds and selects an option. `select._dsCombobox.refresh()` re-reads the options and chips after you change them.

## Tokens

Field: as [Input](./input.md). Chips: `--color-base-200`, `--color-base-300`, `--ds-radius-md`, `--ds-type-footnote-size`, `--ds-opacity-state-pressed`, `--ds-press-scale`, `--ds-focus`, `--ds-error-soft`. List: as [Combobox](./combobox.md), plus `--color-primary`, `--color-primary-content`, `--ds-control-border` and `--ds-radius-xs` for the checkbox square.

## Native and daisyUI

Builds on `<select multiple>`, which works without JavaScript (Ctrl/Cmd-click to choose several). The field is daisyUI `.input` used as a container (`height: auto`, wrapping). Chips are the DS `.ds-token`, shared with the [Tags input](./tags-input.md); they are not daisyUI badges.
