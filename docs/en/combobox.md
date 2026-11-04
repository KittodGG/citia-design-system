---
title: Combobox
group: components
category: forms
order: 25
summary: A text field with a filtered list of options (ARIA 1.2), built on a real select or input; groups, async search, create option, clear button and every list state.
source: TPS wwwroot/js/combobox.js; app.css L3147–3241 (.cb-*)
---

A combobox lets people type to filter a list and pick one option. Use it when the list comes from data that keeps growing (customers, projects, people) or has more than 7 options. Keep a plain [Select](./select.md) for short fixed lists (status, size, page size). For several values, use a [Multi-select](./multi-select.md); for free keywords with no list, use a [Tags input](./tags-input.md); for commands and navigation, use [Command](./command.md).

## Examples

### From a select

Add `data-ds-combobox` to a `<select>`. ds.js puts a text input with `role="combobox"` in front of it; the select stays in the form (hidden) and posts the value, so `asp-for` and model binding work unchanged. `option[data-hint]` adds a second line.

```html preview title="Combobox from a select"
<div class="ds-field" style="max-width: 24rem">
  <label for="cb-customer">Customer</label>
  <select id="cb-customer" name="CustomerId" class="select" data-ds-combobox data-ds-combobox-label="customer" aria-describedby="cb-customer-hint">
    <option value="">Choose a customer</option>
    <option value="17" data-hint="Jakarta · 14 open invoices">Lestari Design Studio</option>
    <option value="23" data-hint="Lagos · 2 open invoices">Okafor Engineering Ltd</option>
    <option value="31" data-hint="Osaka">Tanaka Foods</option>
    <option value="38" data-hint="Madrid · 5 open invoices" selected>Marquez Arquitectura</option>
    <option value="42">Nusantara Logistics</option>
    <option value="47">Harbour Point Clinic</option>
    <option value="52">Blue Pine Software</option>
    <option value="58">Kaori Textiles</option>
  </select>
  <p id="cb-customer-hint" class="ds-hint">Type a name or a city.</p>
</div>
```

### Grouped options

`<optgroup label>` becomes a group heading in the list (`role="group"` with the heading as its name).

```html preview title="Grouped"
<div class="ds-field" style="max-width: 24rem">
  <label for="cb-owner">Owner</label>
  <select id="cb-owner" name="OwnerId" class="select" data-ds-combobox data-ds-combobox-label="owner" data-ds-combobox-clearable>
    <option value="">Unassigned</option>
    <optgroup label="Finance">
      <option value="u1" data-hint="Finance lead">Ayu Lestari</option>
      <option value="u2">Sofia Marquez</option>
    </optgroup>
    <optgroup label="Engineering">
      <option value="u3" data-hint="On leave until 12 May" disabled>Daniel Okafor</option>
      <option value="u4">Mei Tanaka</option>
      <option value="u5">Rahul Iyer</option>
    </optgroup>
  </select>
</div>
```

### Create an option

`data-ds-combobox-create` offers `Create "term"` when the typed text matches no option. Choosing it adds an `<option>` with the term as value and label, selects it and fires `ds:combobox:create`. Use it for lightweight records the server can create from a name. `data-ds-combobox-clearable` adds the clear button.

```html preview title="Create and clear"
<div class="ds-field" style="max-width: 24rem">
  <label for="cb-category">Expense category</label>
  <select id="cb-category" name="Category" class="select" data-ds-combobox data-ds-combobox-label="category" data-ds-combobox-create data-ds-combobox-clearable>
    <option value="">Choose or create</option>
    <option>Travel</option>
    <option>Software subscriptions</option>
    <option>Office supplies</option>
    <option>Training</option>
  </select>
</div>
```

### Add through a dialog

`data-ds-combobox-add="Target"` offers `Add "term" to Target` and fires `ds:combobox-add` (and `ds:combobox:add`) with `{ term, label, input }`. The app opens a quick-add dialog, saves, then calls `DS.addComboboxOption`. Show this only to people allowed to create the record.

```html preview title="Add to a list"
<div class="ds-field" style="max-width: 24rem">
  <label for="cb-project">Project</label>
  <select id="cb-project" name="ProjectId" class="select" data-ds-combobox data-ds-combobox-label="project" data-ds-combobox-add="Projects">
    <option value="">Choose a project</option>
    <option value="1024" data-hint="Ayu Lestari">PRJ-1024 Website relaunch</option>
    <option value="1031" data-hint="Daniel Okafor">PRJ-1031 Warehouse sensors</option>
    <option value="1040" data-hint="Mei Tanaka">PRJ-1040 Annual audit</option>
  </select>
</div>
```

```js
document.addEventListener("ds:combobox:add", async (event) => {
  const { term, input } = event.detail;
  const saved = await openQuickAdd(term); // your dialog: returns { id, name, owner }
  if (saved) DS.addComboboxOption(event.target, { value: saved.id, label: saved.name, hint: saved.owner });
  input.focus();
});
```

### Free text with suggestions

On `input[list]`, the text itself is the value; suggestions come from the `datalist` (`option[value][data-label][data-hint]`).

```html preview title="Free text"
<div class="ds-field" style="max-width: 24rem">
  <label for="cb-city">City</label>
  <input id="cb-city" name="City" class="input" list="cb-city-list" data-ds-combobox data-ds-combobox-label="city">
  <datalist id="cb-city-list">
    <option value="Jakarta" data-hint="Indonesia"></option>
    <option value="Lagos" data-hint="Nigeria"></option>
    <option value="Osaka" data-hint="Japan"></option>
    <option value="Madrid" data-hint="Spain"></option>
  </datalist>
</div>
```

### Async source

`data-ds-combobox-source` fetches options as the person types (250ms debounce, stale requests aborted). `{q}` in the URL is replaced with the encoded text; without it, `?q=` is appended (`data-ds-combobox-param` renames it). The response is a JSON array, or `{ "items": [...] }`, of `{ value, label, hint?, group?, disabled? }`. `data-ds-combobox-min` sets how many characters start a search (default 1). On a select, the chosen remote item is added as an `<option>` so it posts.

```html
<select id="AssigneeId" name="AssigneeId" class="select"
        data-ds-combobox data-ds-combobox-label="person"
        data-ds-combobox-source="/api/people/search?term={q}" data-ds-combobox-min="2">
  <option value="">Search people</option>
  <option value="u4" selected>Mei Tanaka</option>   <!-- current value, rendered by the server -->
</select>
```

## States

The field states come from the input. The list below is a frozen copy of the popup (no ds.js) so every list state is visible at once.

```html preview title="Field states"
<div class="grid gap-4 sm:grid-cols-2">
  <div class="ds-field"><label for="cb-st-1">Disabled</label><select id="cb-st-1" class="select" data-ds-combobox disabled><option>Marquez Arquitectura</option></select></div>
  <div class="ds-field"><label for="cb-st-2">Invalid</label><select id="cb-st-2" class="select" data-ds-combobox aria-invalid="true" aria-describedby="cb-st-2-err"><option value="">Choose a customer</option><option value="1">Tanaka Foods</option></select><p id="cb-st-2-err" class="ds-field-error">Choose a customer from the list.</p></div>
</div>
```

```html preview title="List states (frozen)"
<div class="grid gap-6 sm:grid-cols-2" style="min-height: 25rem">
  <div class="ds-combobox" data-open data-filled>
    <input class="input" role="combobox" aria-expanded="true" aria-controls="cb-frozen-1" value="ta" aria-label="Customer">
    <div class="ds-combobox__buttons"><button type="button" class="ds-combobox__toggle" tabindex="-1" aria-label="Show customer options"></button></div>
    <div class="ds-combobox-popup">
      <ul class="ds-combobox-list" role="listbox" id="cb-frozen-1" aria-label="Customer options">
        <li class="ds-combobox-group" role="presentation">
          <div class="ds-combobox-group-label">Active</div>
          <ul role="group">
            <li class="ds-combobox-option" role="option" aria-selected="false"><span class="ds-combobox-option__text"><mark class="ds-combobox-match">Ta</mark>naka Foods<small>Osaka</small></span></li>
            <li class="ds-combobox-option" role="option" aria-selected="true" data-active><span class="ds-combobox-option__text">Harbour Point Clinic <small>Highlighted (keyboard or pointer)</small></span></li>
            <li class="ds-combobox-option" role="option" aria-selected="false" data-current><span class="ds-combobox-option__text">Marquez Arquitectura<small>Current value</small></span></li>
          </ul>
        </li>
        <li class="ds-combobox-group" role="presentation">
          <div class="ds-combobox-group-label">Archived</div>
          <ul role="group">
            <li class="ds-combobox-option" role="option" aria-selected="false" aria-disabled="true"><span class="ds-combobox-option__text">Kaori Textiles<small>Disabled</small></span></li>
          </ul>
        </li>
        <li class="ds-combobox-option ds-combobox-create" role="option" aria-selected="false"><span class="ds-combobox-option__text">Create "ta"</span></li>
      </ul>
    </div>
  </div>
  <div class="grid content-start gap-3">
    <div class="ds-combobox-popup" style="position: static"><p class="ds-combobox-empty" data-state="loading"><span class="ds-spinner" aria-hidden="true"></span>Loading…</p></div>
    <div class="ds-combobox-popup" style="position: static"><p class="ds-combobox-empty">No customer matches "zz".</p></div>
    <div class="ds-combobox-popup" style="position: static"><p class="ds-combobox-empty">Type at least 2 characters to search.</p></div>
    <div class="ds-combobox-popup" style="position: static"><p class="ds-combobox-empty" data-state="error">Options could not be loaded. Type again to retry.</p></div>
    <div class="ds-combobox-popup" style="position: static"><p class="ds-combobox-empty">No options available.</p></div>
  </div>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | — | input with chevron button at the end |
| Hover / focus | pointer, focus | input states from [Input](./input.md); chevron button state layer on hover |
| Open | click, typing, Arrow Down, Alt+Arrow Down | popup fades in and moves 5px from the field (160ms), chevron turns 180°; flips above when there is no room below |
| Closed | Escape, Tab, choosing, pointer outside | popup fades out faster (140ms, exit easing) |
| Filled | a value is chosen | clear button appears (`data-ds-combobox-clearable`) |
| Highlighted option | Arrow keys or pointer (`data-active`, `aria-activedescendant`) | `--ds-primary-soft` tonal fill |
| Current value | `data-current` | semibold label and a check at the end |
| Match | typed text | matching part of the label in semibold |
| Disabled option | `option[disabled]` | `--ds-opacity-disabled`, skipped by arrow keys |
| Group | `optgroup` | small heading, hairline between groups |
| Create / add | no exact match and `data-ds-combobox-create` / `-add` | last row with a plus, quiet primary text |
| Loading | async request running | spinner (after 300ms) and "Loading…"; announced |
| No results / empty / too short / error | — | one sentence in the popup; error in `--ds-error-text`; announced |
| Invalid | typed text matches no option on blur, `aria-invalid="true"` | error border; message `Choose {label} from the list.` |
| Disabled | `disabled` on the select or input | disabled input, buttons disabled, no popup |

## Anatomy

- `.ds-combobox` — wrapper (generated); `[data-open]`, `[data-filled]`, `.is-clearable`.
- `input[role="combobox"]` — the text field (`.input`).
- `select[hidden]` — the original select, still posting the value; its id becomes `{id}-value`.
- `.ds-combobox__buttons` — `.ds-combobox__clear` and `.ds-combobox__toggle`.
- `.ds-combobox-popup` — floating panel; `[data-side="top"]` when flipped.
- `.ds-combobox-list[role="listbox"]` — options; `.ds-combobox-group` + `.ds-combobox-group-label` for groups.
- `.ds-combobox-option[role="option"]` — `.ds-combobox-option__text` with `small` hint; `.ds-combobox-create`, `.ds-combobox-add`.
- `.ds-combobox-empty` — empty, loading, error and hint messages.

## Usage

- Use a noun in `data-ds-combobox-label` ("customer"); it appears in messages ("No customer matches …").
- Put the most useful second line in `data-hint` (city, owner, code), not an ID the person cannot read.
- Keep the list at 50 shown options; the rest is reachable by typing (a hint says so).
- Use `data-ds-combobox-min="2"` or more for remote sources with thousands of rows.
- Do not use a combobox for 5 or fewer fixed options; a [Radio group](./radio-group.md) or [Select](./select.md) is faster.
- Do not auto-submit on choice.

## Accessibility

- ARIA 1.2 combobox: the input has `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls` and `aria-activedescendant`; focus never leaves the input. Options are `role="option"` in a `role="listbox"` named "{label} options".
- The chevron button has a name ("Show customer options") but is out of the Tab order (APG pattern); the clear button is in the Tab order.
- A polite live region announces result counts, "Loading…", errors and the chosen option.
- The label stays linked: the input takes the select's `id`, `aria-describedby`, `aria-invalid`, `required` and `placeholder`.
- Options are 36px tall (44px on touch). Highlight is a tonal fill, the current value adds a check and weight, so neither depends on colour alone.

| Key | Action |
| --- | --- |
| Arrow Down / Arrow Up | Open the list, then move the highlight (wraps, skips disabled options) |
| Alt + Arrow Down | Open the list without moving the highlight |
| Home / End | First or last option (before typing) |
| Enter | Choose the highlighted option; while typing in a select combobox, the first match is highlighted |
| Escape | Close the list; when closed, restore the text of the chosen value |
| Tab | Close the list and move on |
| Typing | Filter by label, value and hint (case and space insensitive) |

## Razor

No new tag helper: use the built-in select helper and add the attributes.

```cshtml
<select asp-for="CustomerId" asp-items="Model.Customers" class="select"
        data-ds-combobox data-ds-combobox-label="customer" data-ds-combobox-clearable>
    <option value="">Choose a customer</option>
</select>
```

`SelectListGroup` on the items renders `optgroup`, which becomes the group heading.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-combobox` | Enhances `select` (choice) or `input` (free text) |
| `data-ds-combobox-label` | Noun for messages and the list name |
| `data-ds-combobox-clearable` | Clear button when filled |
| `data-ds-combobox-create` | `Create "term"` option; fires `ds:combobox:create` `{ term, input }` |
| `data-ds-combobox-add="Target"` | `Add "term" to Target`; fires `ds:combobox-add` and `ds:combobox:add` `{ term, label, input }` |
| `data-ds-combobox-source="url"` | Remote options; `{q}` placeholder or `?q=` |
| `data-ds-combobox-param`, `data-ds-combobox-min` | Query parameter name, minimum characters |
| `option[data-hint]`, `optgroup`, `option[disabled]` | Hint line, groups, disabled options |

API: `DS.addComboboxOption(source, { value, label, hint })` adds (if missing) and selects an option. `source._dsCombobox` exposes `open()`, `close()`, `clear()` and `refresh()` (after changing the options). Events: native `input` and `change` on the source, and `ds:combobox:change` `{ value, label }`.

## Tokens

`--ds-popover`, `--ds-popover-border`, `--ds-shadow-popover`, `--ds-z-combobox`, `--ds-radius-lg`, `--ds-radius-md`, `--color-primary`, `--ds-opacity-state-selected`, `--ds-opacity-state-hover`, `--ds-quiet`, `--ds-subtle`, `--ds-error-text`, `--ds-duration-quick`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-enter-offset`, `--ds-size-target-compact`, `--ds-size-target`, `--ds-type-eyebrow-*`.

## Native and daisyUI

Builds on a real `<select>` or `<input list>`; without JavaScript the native control works and posts the same value. The visible field is daisyUI `.input` (the `select` class becomes `input`, sizes carry over). The DS adds the popup, which is not a daisyUI component; it shares the floating-layer recipe with [Popover](./popover.md). Native `<datalist>` UI is replaced because it cannot be styled, grouped or announced consistently.
