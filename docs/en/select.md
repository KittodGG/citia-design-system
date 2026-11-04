---
title: Select
group: components
category: forms
order: 8
summary: Native select styled to match the other fields, with sizes, optgroups, disabled options, a placeholder option and a multiple listbox.
source: TPS app.css .select
---

Use the native select for 3 to 15 short options when the platform picker is the best experience, especially on phones. For longer or searchable lists use [combobox](./combobox.md); for 2 to 4 visible options use [radio group](./radio-group.md) or [segmented control](./segmented-control.md); for several picks with chips use [multi-select](./multi-select.md).

## Examples

### Sizes, placeholder and groups

An empty-valued first `option` is the placeholder; while it is selected the text uses `--ds-subtle`. Add `required` so it cannot be submitted.

```html preview title="Select with placeholder and optgroups"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-field">
    <label for="sel-1">Department</label>
    <select id="sel-1" class="select" required>
      <option value="">Choose a department</option>
      <optgroup label="Operations">
        <option>Logistics</option>
        <option>Procurement</option>
      </optgroup>
      <optgroup label="Support">
        <option>Finance</option>
        <option disabled>Legal (unavailable)</option>
      </optgroup>
    </select>
  </div>
  <div class="ds-field">
    <label for="sel-2">Small</label>
    <select id="sel-2" class="select select-sm"><option>Weekly</option><option>Monthly</option></select>
  </div>
  <div class="ds-field">
    <label for="sel-3">Large</label>
    <select id="sel-3" class="select select-lg"><option>Bahasa Indonesia</option><option>English</option></select>
  </div>
</div>
```

### Multiple

`multiple` renders a listbox. Selected options get a tonal fill and weight 600, so selection does not depend on colour. Say in the hint how to select several ("Hold Ctrl or Command").

```html preview title="Multiple listbox"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-field">
    <label for="sel-4">Notify</label>
    <select id="sel-4" class="select" multiple size="4" aria-describedby="sel-4-h">
      <option selected>Ayu Lestari</option>
      <option>Daniel Okafor</option>
      <option selected>Mei Tanaka</option>
      <option>Sofia Marquez</option>
    </select>
    <p class="ds-hint" id="sel-4-h">Hold Ctrl or Command to choose several.</p>
  </div>
</div>
```

## States

```html preview title="Select states"
<div class="ds-field-grid">
  <div class="ds-field"><label for="ss1">Placeholder</label><select id="ss1" class="select"><option value="">Choose</option><option>A</option></select></div>
  <div class="ds-field"><label for="ss2">Filled</label><select id="ss2" class="select"><option>Logistics</option></select></div>
  <div class="ds-field"><label for="ss3">Disabled</label><select id="ss3" class="select" disabled><option>Logistics</option></select></div>
  <div class="ds-field"><label for="ss4">Invalid</label><select id="ss4" class="select" aria-invalid="true" aria-describedby="ss4-e"><option value="">Choose</option></select><p class="ds-field-error" id="ss4-e">Choose a department.</p></div>
  <div class="ds-field"><label for="ss5">Valid</label><select id="ss5" class="select" data-state="success"><option>Finance</option></select></div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest, hover | Default, pointer over | As [input](./input.md); chevron in the text colour |
| Focus | `:focus` | 2px ring with 2px offset |
| Open | Picker open | Platform list; options and groups use theme colours |
| Placeholder | Empty-valued option selected | `--ds-subtle` text |
| Filled | Real option selected | Body text |
| Disabled | `disabled` | 55% opacity, `base-200`, `not-allowed` |
| Disabled option | `option[disabled]` | `--ds-subtle` text, not selectable |
| Invalid | `aria-invalid`, `:user-invalid` | Error border; message below |
| Success | `data-state="success"` | Success border |
| Multiple | `multiple` | Listbox with a tonal fill on selected options |

## Anatomy

- `select.select` (daisyUI) with sizes `select-sm`, default, `select-lg`.
- `option`, `optgroup[label]`, `option[disabled]`.
- Inside an [input group](./input-group.md) the select becomes an addon with automatic width.

## Usage

- Sort options in the order people expect (alphabetical, by frequency, by time), not by database id.
- Keep option text to one line. A 40-character option still fits at 320px.
- Do not use a select for yes or no; use a switch or radios.
- Use a visible first option ("Choose a department") instead of preselecting an arbitrary value.
- Group with `optgroup` after 8 options or when categories matter.
- Do not auto-submit a form on change unless the control is clearly a filter (`data-ds-autosubmit`).

## Accessibility

- Native semantics, keyboard and screen-reader behaviour are kept; this is the main reason to prefer it.
- Optgroup labels are read as group names. Disabled options stay in the list and are announced as unavailable.
- Selected options in a multiple listbox are shown by fill and weight, not colour alone.
- Chevron is decoration; targets 44px.

| Key | Action |
| --- | --- |
| Space, Enter, Alt + Arrow Down | Opens the list |
| Arrow Up / Down | Changes the option |
| Home / End | First / last option |
| Type a letter | Jumps to the next matching option |
| Ctrl/Cmd + Click, Shift + Click | Multiple: add or extend the selection |

## Razor

```cshtml
<ds-field asp-for="Department" type="select" asp-items="Model.Departments" placeholder="Choose a department" />
```

## JavaScript

`select[data-ds-autosubmit]` submits the form on change (`forms.js`). Nothing else needs script.

## Tokens

`--ds-control-border`, `--ds-focus`, `--ds-subtle`, `--color-base-100/200`, `--color-primary`, `--radius-field`, `--ds-opacity-disabled`.

## Native and daisyUI

Builds on `select.select`: the DS keeps daisyUI's chevron, adds the shared state set, 44px height, placeholder colour, optgroup and multiple styling, and removes the 20rem maximum width inside `.ds-field`.
