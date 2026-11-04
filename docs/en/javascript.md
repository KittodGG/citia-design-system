---
title: JavaScript
group: reference
order: 1
summary: Reference for ds.js: loading, modules, the DS API, every data-ds attribute and ds:* event by module, i18n, and partial updates with DS.init(root).
---

`ds.js` is one ES module with no dependencies. Every behaviour is opt-in through `data-ds-*` attributes on server-rendered HTML, and the HTML works (or falls back to native behaviour) without it. It runs the same in Razor, MVC, htmx pages and single-page apps.

## Loading

The `_DsScripts` partial loads `ds.js` as a module and initialises on `DOMContentLoaded`.

```cshtml
<partial name="_DsHead" />      @* in <head>: theme before first paint, stylesheet *@
<partial name="_DsScripts" />   @* before </body> *@
```

Without the partial:

```html
<script type="module" src="/_content/Citia.DesignSystem/js/ds.js"></script>
```

Add `data-ds-manual` to `<html>` to stop the automatic start and call `DS.init()` yourself, for example after your own bootstrap:

```html
<html data-ds-manual>
<script type="module">
  import DS from "/_content/Citia.DesignSystem/js/ds.js";
  DS.configure({ storage: "app", toastTimeout: 8000 });
  DS.init();
</script>
```

## Modules

Each module exports `wire()` (document listeners, once per page), `init(root)` (per element, idempotent) and optionally `api`, an object merged into `window.DS`. The `shell` module has no `api`.

| Module | Purpose | Status |
| --- | --- | --- |
| `theme` | Light, dark and system modes, `theme-color` | ready |
| `shell` | Sidebar, drawer, navigation groups, back links, toolbar overflow | ready |
| `toast` | Toasts, alert and banner dismissal, notification bell | ready |
| `guard` | Unsaved-changes guard | ready |
| `dialog` | Dialog and confirmation | ready |
| `forms` | Submit once, auto-submit, copy, export lock, password toggle, busy state | ready |
| `table` | Data table: filter, density, columns, pinned columns, tree rows, code blocks | ready |
| `combobox` | Combobox, multi-select and add-option | ready |
| `inputs` | Number, search, password strength, counter, auto-grow | ready |
| `choices` | Check-all, switch, slider, rating, OTP, tags | ready |
| `chips` | Chips, badges and avatar fallback | ready |
| `carousel` | Carousel, image states and zoom | ready |
| `tabs` | Tabs, segmented control, bottom navigation | ready |
| `navigation-menu` | Navbar, navigation menu, popdowns, language remember | ready |
| `resizable` | Resizable panels | ready |
| `toggle` | Toggle buttons and groups, busy and success states of buttons, FAB hide, split-button menu | ready |
| `accordion` | Accordion and collapsible | ready |
| `datepicker` | Date, range, time and colour pickers, calendar | ready |
| `upload` | File upload with drop, paste and progress | ready |
| `validation` | Validation, error summary, dirty state, view and edit mode | ready |
| `tooltip` | Tooltips | ready |
| `popover` | Popover and hover card | ready |
| `menu` | Dropdown menu, menubar and submenus | ready |
| `context-menu` | Context menu | ready |
| `command` | Command palette | ready |
| `sheet` | Sheets and drawers with drag and snap points | ready |
| `tree-view` | Tree view with lazy loading | ready |
| `selection` | Row selection, bulk bar and listbox | ready |

## Global API

`window.DS` (and the default export of `ds.js`) holds the core members below plus the `api` of every module, described in the sections after this one. `ds.js` also exports `configure`, `addMessages`, `t`, `locale`, `init`, `theme`, `toast`, `confirm`, `guard`, `addComboboxOption` and `copyText` by name.

| Member | Description |
| --- | --- |
| `DS.init(root = document)` | Wires document listeners once, then every widget inside `root`. Safe to call again after inserting markup |
| `DS.configure(options)` | Merges `options` into `DS.config`. Call it before `init()` |
| `DS.addMessages({ en: {…}, id: {…} })` | Registers UI strings per language; later calls merge into earlier ones |
| `DS.t(key, vars)` | Translates `key` and replaces `{placeholders}` with `vars`; returns the key when no language has it |
| `DS.locale()` | Active language: `config.locale`, else `<html lang>`, two letters; `"en"` when that language has no strings |
| `DS.config` | The live configuration object, below |

| Option | Default | Effect |
| --- | --- | --- |
| `light` | `"light"` | daisyUI theme name used for light. Starts from `data-ds-light` on `<html>` |
| `dark` | `"dark"` | daisyUI theme name used for dark. Starts from `data-ds-dark` on `<html>` |
| `storage` | `"ds"` | Prefix of storage keys. Starts from `data-ds-storage` on `<html>` |
| `locale` | `null` | Language override; `null` follows `<html lang>` |
| `toastTimeout` | `6000` | Milliseconds before a toast closes; a toast of more than 80 characters gets 2000 ms more, up to 8000 ms |
| `exportLock` | `15000` | Milliseconds an export link stays locked |

```js
const saved = DS.toast({ tone: "success", title: "Project saved", text: "PRJ-1024 is ready." });

if (await DS.confirm({ title: "Delete PRJ-1024?", text: "This cannot be undone.", label: "Delete project" })) {
  DS.guard.allow();
  form.submit();
}
```

## Events

Events are `CustomEvent`s named `ds:<component>:<event>`. They bubble and carry data in `event.detail`. Events marked cancelable stop the action when you call `event.preventDefault()`. `ds:themechange` is dispatched on `document`; every other event is dispatched on the element named in its table.

```js
document.addEventListener("ds:themechange", (e) => console.log(e.detail.theme));
```

## Theme and shell

### Theme

Components: [Theme switcher](./theme-switcher.md). See also [Theming](./theming.md).

| Function | Description |
| --- | --- |
| `DS.theme.get()` | Name of the active theme (`html[data-theme]`) |
| `DS.theme.getMode()` | The saved choice: `"light"`, `"dark"` or `"system"` |
| `DS.theme.isDark()` | `true` when the active theme is the dark one |
| `DS.theme.set(mode, { animate = true })` | Sets `"light"`, `"dark"` or `"system"`, saves it, and cross-fades unless motion is reduced |
| `DS.theme.toggle()` | Switches between light and dark |

| Attribute | Effect |
| --- | --- |
| `data-ds-theme-toggle` | Button that switches between light and dark; its label and title follow the theme |
| `data-ds-theme-set="light\|dark\|system"` | Button that sets one mode; the active one gets `aria-pressed` |
| `data-ds-theme-icon="light\|dark"` | Child icon of a toggle; only the one matching the active theme is shown |

| Event | Detail | When |
| --- | --- | --- |
| `ds:themechange` | `{ mode, theme }` | After the theme is applied, including changes from another tab |

### Shell

Components: [App shell](./app-shell.md), [Sidebar](./sidebar.md), [Toolbar](./toolbar.md), [Page header](./page-header.md).

No API.

| Attribute | Effect |
| --- | --- |
| `data-ds-sidebar-collapse` | Button that collapses the sidebar to a rail on desktop |
| `data-ds-sidebar-collapsed` | On `<html>`: the rail state, written by the script and restored before first paint |
| `data-ds-nav-toggle` | Button that opens and closes the sidebar drawer under 1024px |
| `data-ds-nav-close` | Control that closes the drawer |
| `data-ds-nav-group="key"` | Button with `aria-controls` that discloses a navigation group; the open state is remembered per key |
| `data-ds-nav-active="true"` | On a group button: the group holds the current page and stays open |
| `data-ds-nav-scroll` | Navigation list whose scroll position is kept for the session |
| `data-ds-back="/fallback"` | Control that goes back when the previous page is on the same origin, else to the fallback URL (default `/`) |
| `data-ds-toolbar-overflow` | On a `.ds-toolbar[role="toolbar"]`: items that do not fit move to a "more" menu |
| `data-ds-menu` | On a `<details>` menu: closes on an outside press or Escape, and only one stays open |
| `data-ds-edge="top\|scrolled"` | On `.ds-topbar`: written by the script from the scroll position |

| Event | Detail | When |
| --- | --- | --- |
| `ds:sidebar:toggle` | `{ collapsed }` | The sidebar is collapsed or expanded; dispatched on `.ds-shell` |
| `ds:drawer:toggle` | `{ open }` | The drawer opens or closes; dispatched on `.ds-shell` |

## Actions and forms

### Toggle and buttons

Components: [Button](./button.md), [FAB](./fab.md), [Split button](./split-button.md), [Toggle](./toggle.md), [Toggle group](./toggle-group.md).

| Function | Description |
| --- | --- |
| `DS.button.loading(el, on = true, { label, delay = 300 })` | Busy state. Input is blocked at once; the spinner and `aria-busy` follow after `delay` ms, so fast actions never flash. `label` replaces the text meanwhile |
| `DS.button.success(el, { label, duration = 1800 })` | Ends the busy state and shows a success flash for 1.6 to 2 s |
| `DS.toggle.set(el, pressed)` | Sets a toggle button; without `pressed` it flips |
| `DS.toggle.group.get(group)` | Returns `{ value, values }` of the selected items; `value` is the first or `null` |
| `DS.toggle.group.set(group, value)` | Selects the item whose value matches, or the items in an array for `multiple` groups |

| Attribute | Effect |
| --- | --- |
| `data-ds-toggle` | On a button: flips `aria-pressed` on click |
| `data-ds-toggle-group="single\|multiple"` | Group of `.ds-toggle` items with roving focus |
| `data-ds-toggle-item` | Marks an item that is not a `.ds-toggle` |
| `data-ds-name="field"` | On a group: hidden inputs post the selected values under this name |
| `data-ds-deselectable` | In a `single` group: pressing the selected item clears it |
| `data-ds-roving="false"` | Turns off roving focus; every item is a tab stop |
| `data-ds-fab-hide` | On `.ds-fab`: hides while scrolling down, shows when scrolling up |
| `data-ds-keep-open` | On a split-button item: the menu stays open after the action |

Item values come from `data-value`, then `value`, then the item text.

| Event | Detail | When |
| --- | --- | --- |
| `ds:toggle:change` | `{ pressed }` on a button; `{ value, values, item }` on a group | A toggle or group item changes. `DS.toggle.group.set` sends `{ value, values }` without `item` |
| `ds:button:loading` | `{ loading }` | `DS.button.loading` starts or ends |
| `ds:button:success` | none | `DS.button.success` runs |

### Forms

Components: [Form](./form.md), [Field](./field.md), [Password input](./password-input.md), [Select](./select.md).

| Function | Description |
| --- | --- |
| `DS.copyText(text, returnFocusTo)` | Copies to the clipboard with a textarea fallback; resolves `true` when copied |
| `DS.setBusy(el, label)` | Busy state: `aria-busy`, fixed width, optional label swap, spinner after 300 ms |
| `DS.clearBusy(el)` | Returns the control to rest: label, width, spinner |

| Attribute | Effect |
| --- | --- |
| `data-ds-export="Excel"` | On a link: locks it for `exportLock` ms while the file downloads; the value names the format in the message |
| `data-ds-copy="selector"` | Copies the text of the element that matches the selector |
| `data-ds-copy-text="text"` | Copies this text instead |
| `data-ds-copy-message` | Message of the success toast after copying |
| `data-ds-password-toggle` | Button with `aria-controls` that shows or hides a password |
| `data-ds-password-icon="hidden\|shown"` | Icon inside the toggle, shown for that state |
| `data-ds-autosubmit` | On a `select`: submits its form when the value changes |
| `data-ds-once` | On a form: submits once, then ignores further submits |
| `data-ds-loading-label` | On a submit button: text shown while the form submits |
| `data-ds-save-status` | Live region inside a `data-ds-once` form that reports saving |

No events. A copy reports through a toast and a busy control through `aria-busy`.

### Inputs

Components: [Input](./input.md), [Search input](./search-input.md), [Number input](./number-input.md), [Password input](./password-input.md), [Textarea](./textarea.md), [Field](./field.md).

| Function | Description |
| --- | --- |
| `DS.inputs.refresh(root = document)` | Wires inputs inside `root` again |
| `DS.inputs.clear(el)` | Empties the input of a `.ds-input` and focuses it |
| `DS.inputs.step(el, direction = 1)` | Steps a number input by one `step` up (`1`) or down (`-1`); returns `true` when the value changed |
| `DS.inputs.setNumber(el, value)` | Writes a number, clamped and rounded by the input rules; returns the written value |
| `DS.inputs.passwordScore(value)` | Strength of a password from 0 to 4 |
| `DS.inputs.locale()` | Active language, same as `DS.locale()` |

| Attribute | Effect |
| --- | --- |
| `data-ds-min`, `data-ds-max` | Range of a number input; `data-ds-max` is also the soft limit of a counter |
| `data-ds-step` | Step of a number input; on a stepper button, its sign sets the direction |
| `data-ds-big-step` | Step of Page Up and Page Down (default ten steps) |
| `data-ds-decimals` | Decimals shown (default from the step and minimum) |
| `data-ds-fixed` | Always shows the fixed number of decimals |
| `data-ds-snap` | Values snap to the step from the minimum |
| `data-ds-nowheel` | A native number input loses focus on the mouse wheel, so the page scrolls instead of changing the value |
| `data-ds-locale` | On `.ds-number`: formats and parses with that language (empty means the page language) |
| `data-ds-counter` | Character counter. A value starting with `#` names the counter element; otherwise the `.ds-counter` of the field is used |
| `data-ds-autogrow` | Textarea grows with its content |
| `data-ds-strength` | Password input that drives the `.ds-strength` meter of its field |
| `data-ds-capslock` | Shows a Caps Lock warning on a password field |
| `data-ds-recent="5"` | Remembers recent searches; the value is the maximum count (default 5) |
| `data-ds-recent-key` | Storage name of the recent list (default the field name or id) |
| `data-ds-no-submit` | Search input that does not submit its form on Enter |
| `data-ds-shortcut="mod+k"` | On a search input or its wrapper: the shortcut that focuses it |
| `data-ds-field-help` | Button that toggles the help text of a field |

| Event | Detail | When |
| --- | --- | --- |
| `ds:input:clear` | `{ control }` | The clear button is pressed; dispatched on the `.ds-input` |
| `ds:search:clear` | `{ control }` | The same, on a `.ds-search` |
| `ds:search:submit` | `{ value }` | Enter in a search input |
| `ds:number:change` | `{ value, text }` | A number input changes through typing, the stepper or the API |
| `ds:password:capslock` | `{ on }` | Caps Lock turns on or off while a `data-ds-capslock` field is focused |

### Choices

Components: [Checkbox](./checkbox.md), [Switch](./switch.md), [Slider](./slider.md), [Rating](./rating.md), [OTP input](./otp-input.md), [Tags input](./tags-input.md).

| Function | Description |
| --- | --- |
| `DS.switchBusy(input, promise)` | Marks a switch busy while `promise` runs. Resolves with the result; on rejection the switch returns to its previous state and the promise rejects |
| `DS.otp(element)` | Control of an OTP input, or `null`: `setState("error" \| "success" \| "busy" \| "")`, `clear()`, `focus()` and `value` |
| `DS.tagsInput(element)` | Control of a tags input, or `null`: `add(text)` (returns the count added), `remove(tag)`, `clear()`, `get()` |

| Attribute | Effect |
| --- | --- |
| `data-ds-check-all="selector"` | On a checkbox: selects every checkbox that matches; without a value it uses `aria-controls` ids |
| `data-ds-indeterminate` | Checkbox starts in the mixed state; `="false"` turns it off |
| `data-ds-switch-action="/url"` | Switch that posts its change to the URL and reverts on error |
| `data-ds-switch-method` | HTTP method of that request (default `POST`) |
| `data-ds-slider-bubble="false"` | Hides the value bubble of a slider |
| `data-ds-slider-format="{value} %"` | Format template of the slider output |
| `data-ds-slider-page` | Step of Page Up and Page Down (default 10% of the range) |
| `data-ds-rating-clearable` | A selected rating can be cleared |
| `data-ds-rating-value`, `data-ds-rating-max` | On `.ds-rating-display`: the value and the number of stars (default 5) |
| `data-ds-otp` | On `.ds-otp`: builds the code cells |
| `data-ds-otp-length` | Number of cells (default the input `maxlength`, else 6) |
| `data-ds-otp-type="alphanumeric"` | Accepts letters and digits; otherwise digits only |
| `data-ds-otp-group` | Visual group size, for example `3` |
| `data-ds-otp-autosubmit` | Submits the form when the code is complete |
| `data-ds-tags` | On an input: turns it into a tags input |
| `data-ds-tags-mode="multiple"` | Posts one value per tag under the field name instead of one joined value |
| `data-ds-tags-max` | Maximum number of tags |
| `data-ds-tags-maxlength` | Maximum length of a tag |
| `data-ds-tags-pattern` | Regular expression every tag must match |
| `data-ds-tags-separator` | Separator of the joined value (default `,`) |
| `data-ds-tags-commit="false"` | Typed text is not added on blur |

| Event | Detail | When |
| --- | --- | --- |
| `ds:switch:change` | `{ checked, result }` | A switch save succeeds |
| `ds:switch:error` | `{ checked, error }` | A switch save fails and the switch reverts |
| `ds:rating:change` | `{ value }` | A rating changes; `value` is `null` when cleared |
| `ds:otp:complete` | `{ value }` | Every cell is filled |
| `ds:tags:change` | `{ tags }` | A tag is added or removed |

### Combobox

Components: [Combobox](./combobox.md), [Multi-select](./multi-select.md).

| Function | Description |
| --- | --- |
| `DS.addComboboxOption(source, { value, label, hint })` | Adds an option to the source `select` or `input[list]` and selects it |

| Attribute | Effect |
| --- | --- |
| `data-ds-combobox` | On a `select`, or an `input` with `list` or a source: enhances it as a combobox |
| `data-ds-combobox-label` | Spoken noun for the field (default the label text) |
| `data-ds-combobox-add="Target"` | Adds an "Add term to Target" option that fires the add events |
| `data-ds-combobox-create` | Adds the typed term as a new option |
| `data-ds-combobox-source="/api/people?q={q}"` | Fetches options as JSON: an array or `{ items }` of `{ value, label, hint, group, disabled }` |
| `data-ds-combobox-param` | Query parameter when the URL has no `{q}` (default `q`) |
| `data-ds-combobox-min` | Characters typed before fetching (default 1) |
| `data-ds-combobox-clearable` | Adds a clear button |
| `data-ds-multiselect` | On a `select[multiple]`: shows the choices as chips |
| `data-ds-multiselect-max` | Maximum number of choices |
| `data-ds-multiselect-visible` | Chips shown while the field is not focused |

| Event | Detail | When |
| --- | --- | --- |
| `ds:combobox:change` | `{ value, label }` | A single choice is made |
| `ds:multiselect:change` | `{ values }` | The choices of a multi-select change |
| `ds:combobox:add`, `ds:combobox-add` | `{ term, label, input }` | The add option is chosen; both names are dispatched |
| `ds:combobox:create` | `{ term, input }` | The typed term is created as an option |

### Pickers

Components: [Date picker](./date-picker.md), [Date range picker](./date-range-picker.md), [Time picker](./time-picker.md), [Calendar](./calendar.md), [Color picker](./color-picker.md).

| Function | Description |
| --- | --- |
| `DS.picker.open(el)` | Opens a date or range picker. `el` is an element or selector inside the picker |
| `DS.picker.close(el)` | Closes it. Time and colour pickers have no popup to open or close |
| `DS.picker.set(el, ...values)` | Sets a value: `"2026-05-14"`, a range `"2026-05-01", "2026-05-31"`, a time `"14:30"` or a colour `"#0f766e"` |
| `DS.picker.parseDate(text, lang)` | Parses typed text in the date order of `lang` (default the page language); returns `yyyy-MM-dd`, `""` for empty text, or `null` when invalid |

| Attribute | Effect |
| --- | --- |
| `data-ds-date-picker` | Wraps an `input[type=date]` |
| `data-ds-date-range` | Wraps two `input[type=date]` |
| `data-ds-time-picker` | Wraps an `input[type=time]` |
| `data-ds-color-picker` | Wraps an `input[type=color]` |
| `data-ds-calendar` | Marks a calendar (Cally element) |
| `data-ds-disabled-dates` | ISO dates, separated by spaces or commas, that cannot be picked |
| `data-ds-disable-weekends` | Weekends cannot be picked |
| `data-ds-presets` | Range presets, comma separated: `today`, `last7`, `last30`, `thisMonth`, `lastMonth`, `thisYear`; `none` hides them |
| `data-ds-autosubmit` | On a range or its form: submits when both dates are set |
| `data-ds-time-zone="Asia/Jakarta"` | IANA zone that decides "today" |
| `data-ds-hour-cycle="12\|24"` | Forces the hour cycle of a time picker |
| `data-ds-seconds` | Time picker shows seconds |
| `data-ds-swatches="Teal #0f766e, Indigo #4338ca"` | Colour presets; the name is optional |
| `data-ds-contrast-against` | Colour to show the contrast ratio against |
| `data-ds-no-eyedropper` | Hides the eyedropper button |

| Event | Detail | When |
| --- | --- | --- |
| `ds:datepicker:change` | `{ value, input }` | A date is chosen; `value` is ISO |
| `ds:daterange:change` | `{ start, end }` | The range changes |
| `ds:timepicker:change` | `{ value }` | The time changes; `value` is `HH:mm` |
| `ds:colorpicker:change` | `{ value }` | The colour changes; `value` is `#rrggbb` |

### Upload

Components: [File upload](./file-upload.md).

| Function | Description |
| --- | --- |
| `DS.upload.files(el)` | `File` objects currently listed, valid and invalid. `el` is an element or selector inside `[data-ds-upload]` |
| `DS.upload.add(el, files)` | Adds files as if dropped |
| `DS.upload.clear(el)` | Removes every file |
| `DS.upload.formatSize(bytes, lang)` | Formats a size such as `1.5 MB` for the language tag |

| Attribute | Effect |
| --- | --- |
| `data-ds-upload` | Around a `.ds-dropzone` with `input[type=file]`; `="avatar"` selects the avatar variant |
| `data-ds-upload-max-size="10 MB"` | Largest file size |
| `data-ds-upload-max-files` | Largest number of files (default 1, or unlimited with `multiple`) |
| `data-ds-upload-url` | Uploads each file at once to this URL with progress |
| `data-ds-upload-param` | Form field name of the file in that request (default `file`) |
| `data-ds-upload-field` | Name of the hidden inputs that carry the returned ids (default `<name>Ids`) |
| `data-ds-upload-paste="page"` | Accepts pasted files anywhere on the page |
| `data-ds-upload-remove` | Avatar: the remove button |
| `data-ds-upload-removed` | Avatar: hidden input set to `true` or `false` |
| `data-ds-upload-status` | Live region for messages (one is created when missing) |

| Event | Detail | When |
| --- | --- | --- |
| `ds:upload:add` | `{ files }` | Files are added, valid or not |
| `ds:upload:remove` | `{ file }`; `{}` for an avatar | A file is removed |
| `ds:upload:done` | `{ file, response }` | A file uploaded; `response` is the parsed body |
| `ds:upload:error` | `{ file, status, response }` | An upload failed |

### Validation

Components: [Validation](./validation.md), [Form](./form.md).

| Function | Description |
| --- | --- |
| `DS.validation.form(form, { focus = true })` | Validates every field. Returns `true` when valid; otherwise shows the messages and the summary and focuses the first problem |
| `DS.validation.field(el)` | Validates one control and shows or clears its message; returns `true` when valid |
| `DS.validation.setError(el, message)` | Shows a message on a control, for example from the server |
| `DS.validation.clearError(el)` | Clears the message of a control |
| `DS.formMode(form, mode)` | Sets `"view"` or `"edit"` on a form |

| Attribute | Effect |
| --- | --- |
| `data-ds-validate` | On a form (or a container): validates on blur, re-validates on input after the first error, and shows a summary on submit |
| `data-ds-validate-success` | On a field: shows the success state when valid |
| `data-ds-msg-<rule>` | On a control: custom message for `required`, `type`, `minlength`, `maxlength`, `min`, `max`, `step` or `pattern` |
| `data-ds-error-summary` | Summary container; its value is the form id when it sits outside the form |
| `data-ds-autofocus` | On a server-rendered summary: focus it once after a failed post |
| `data-ds-dirty-status` | Inside a guarded form: live region that announces unsaved changes |
| `data-ds-dirty-text` | Text of that announcement |
| `data-ds-mode="view\|edit"` | On a form: view mode locks the fields |
| `data-ds-form-edit` | Button that switches to edit mode; its value is the form id when it sits outside the form |
| `data-ds-form-cancel` | Button that leaves edit mode |
| `data-ds-form-view-only` | Shown only in view mode |
| `data-ds-form-edit-only` | Shown only in edit mode |
| `data-ds-form-keep` | Submit button that stays visible in view mode |

The ASP.NET Core output (`input-validation-error`, `field-validation-error`, `validation-summary-errors`, `data-val-*`) is wired on every page.

| Event | Detail | When |
| --- | --- | --- |
| `ds:validation:result` | `{ valid, invalid }` | A form was validated; `invalid` lists the controls |
| `ds:form:dirty` | `{ dirty }` | A guarded form becomes dirty or clean |
| `ds:form:mode` | `{ mode }` | The form mode changes |

### Unsaved-changes guard

Components: [Form](./form.md), [Forms pattern](./forms-pattern.md).

| Function | Description |
| --- | --- |
| `DS.guard.register(form)` | Guards a form that was added later |
| `DS.guard.isDirty()` | `true` when a guarded form differs from its snapshot and leaving is not allowed |
| `DS.guard.allow()` | Leaves without asking, for example after a successful save |
| `DS.guard.reset()` | Takes fresh snapshots after a save without navigation |

| Attribute | Effect |
| --- | --- |
| `data-ds-guard` | On a form: guards it against leaving with unsaved changes |
| `data-ds-guard-dirty` | On a form: marks it dirty from markup or script |
| `data-ds-guard-skip` | On a link: leaves without asking |
| `data-ds-logout` | On a sign-out form: asks first when the page is dirty |
| `data-ds-guard-status` | Inside a guarded form: live region that announces "Unsaved changes" |
| `data-ds-leave-stay`, `data-ds-leave-go` | Buttons of the `#ds-leave` dialog: stay or leave |

| Event | Detail | When |
| --- | --- | --- |
| `ds:guard:change` | `{ dirty }` | A guarded form becomes dirty or clean |

## Data display

### Data table

Components: [Data table](./data-table.md), [Table](./table.md), [Code block](./code-block.md), [Kbd](./kbd.md).

| Function | Description |
| --- | --- |
| `DS.dataTable.setTree(button, open)` | Opens or closes the tree or detail rows of a toggle button |
| `DS.dataTable.setDensity(root, "compact" \| "comfortable", remember = true)` | Sets the density of a `.ds-data-table`; `remember = false` skips saving it |
| `DS.dataTable.applyFilter(root)` | Runs the search and chip filters again |
| `DS.dataTable.setColumn(root, name, visible)` | Shows or hides a column by its `data-col` key |

| Attribute | Effect |
| --- | --- |
| `data-ds-table` | On `.ds-data-table`: client-side search, filters, density and columns |
| `data-ds-table-search` | Search input; filters rows by text |
| `data-ds-table-count` | Element that shows how many rows are visible |
| `data-ds-table-empty` | Row shown when nothing matches |
| `data-ds-filter-group="key"` | Group of chips; rows carry `data-filter-<key>="value"` |
| `data-ds-filter-value` | A chip of a filter group; an empty value means all |
| `data-ds-density-set="compact\|comfortable"` | Density button |
| `data-ds-column="key"` | Checkbox that shows or hides the cells with `data-col="key"` |
| `data-ds-columns-reset` | Shows every column again |
| `data-ds-persist` | Remembers density and columns; needs an `id` on the table |
| `data-ds-pin="N"` | On a `table`: pins the first N columns |
| `data-ds-pin-primary="i"` | Index of the identity column, kept pinned when space is short |
| `data-ds-pin-end` | On a `th`: pins that column at the end |
| `data-ds-scroll-hint` | Element before the scroller; shown when the table scrolls sideways |
| `data-ds-tree-toggle` | Button with `aria-controls` that opens a tree or detail body |
| `data-ds-tree-all="open\|close"` | Button that opens or closes every tree toggle inside the element in `aria-controls` (default the whole page) |
| `data-ds-label-expand`, `data-ds-label-collapse` | Accessible names of a tree toggle |
| `data-ds-code-copy` | Copies a code block, skipping removed diff lines |
| `data-ds-code-wrap` | Toggles line wrapping |
| `data-ds-code-collapsible="14"` | On `figure.ds-code`: collapses a block taller than that many rem (default 14) |
| `data-ds-code-expand` | Button that expands a collapsed block |
| `data-ds-code-expand-label` | Element inside it that gets the "Show n lines" text |
| `data-ds-kbd-mac="⌘"` | `kbd` text used on Apple platforms |
| `data-ds-kbd-mac-label` | Spoken name for that text |

| Event | Detail | When |
| --- | --- | --- |
| `ds:table:filter` | `{ shown, total, query }` | A filter runs |
| `ds:table:density` | `{ density }` | The density changes |
| `ds:table:columns` | `{ hidden }` | Column visibility changes; `hidden` lists the keys |
| `ds:table:toggle` | `{ expanded, body }` | A tree or detail row opens or closes |
| `ds:tableupdate` | none | Listened to, not sent: dispatch it on `.ds-table-scroll` to re-measure pinned columns |

### Selection

Components: [Data table](./data-table.md), [List](./list.md).

| Function | Description |
| --- | --- |
| `DS.selection.clear(root)` | Clears the selected rows |
| `DS.selection.selectAll(root, state = true)` | Selects or clears every enabled row |
| `DS.selection.values(root)` | Values of the selected rows |
| `DS.selection.count(root)` | Number of selected rows |

| Attribute | Effect |
| --- | --- |
| `data-ds-select` | Root of a selectable table, usually `.ds-data-table` |
| `data-ds-select-click` | Clicking empty row space toggles the row |
| `data-ds-select-all` | Header checkbox |
| `data-ds-select-row` | Row checkbox; its value is the record id |
| `data-ds-bulk` | Bulk action bar; gets `data-open` while rows are selected |
| `data-ds-select-count` | Count text; give it `role="status"` |
| `data-ds-select-clear` | Clear button |
| `data-ds-select-everything` | "Select all N" button, shown when a page is fully selected |
| `data-ds-all-pages` | Set on the root by the script after that button |
| `data-ds-listbox` | On a `role="listbox"`: selectable list |
| `data-ds-listbox-follow` | Selection follows focus |
| `data-ds-name="field"` | Hidden inputs of the selected values |

The total of all pages comes from `data-total` on the root.

| Event | Detail | When |
| --- | --- | --- |
| `ds:selection:change` | `{ count, total, values, rows }` | The selection changes |
| `ds:selection:selectall` | `{ total }` | "Select all N" is pressed |
| `ds:listbox:change` | `{ values, items }` | The selection of a listbox changes |

### Tree view

Components: [Tree view](./tree-view.md).

| Function | Description |
| --- | --- |
| `DS.tree.load(item, nodes)` | Gives a lazy item its children: a `DocumentFragment`, an element, or an array of `li[role=treeitem]` |
| `DS.tree.fail(item)` | Reports a failed load; the item stays closed and shows "Retry" |
| `DS.tree.setExpanded(item, open, { announce = true })` | Opens or closes an item, loading it when needed |
| `DS.tree.expandAll(tree)` | Opens every loaded item |
| `DS.tree.collapseAll(tree)` | Closes every item |

| Attribute | Effect |
| --- | --- |
| `data-ds-tree` | On `ul.ds-tree[role=tree]` |
| `data-ds-tree-select="single\|multiple\|none"` | Selection mode (default `single`) |
| `data-ds-tree-checkable` | Tri-state checkboxes |
| `data-ds-name="field"` | Hidden inputs of the selected or checked values |
| `data-ds-tree-src` | On an item: URL or `#template-id` with its children, loaded on first open |
| `data-ds-tree-delay` | Milliseconds of simulated latency before a load |
| `data-ds-icon`, `data-ds-icon-open` | On `.ds-tree__icon`: icon names for closed and open |
| `data-ds-loaded` | Set on an item after its children loaded |
| `data-ds-retry` | Set on the "Retry" label of a failed item |

| Event | Detail | When |
| --- | --- | --- |
| `ds:tree:toggle` | `{ item, expanded }` | An item opens or closes |
| `ds:tree:select` | `{ item, items, values }` | The selection changes |
| `ds:tree:check` | `{ item, checked, values }` | A checkbox changes; `checked` is `"true"`, `"false"` or `"mixed"` |
| `ds:tree:activate` | `{ item }` | Enter, or a click on a row or link |
| `ds:tree:load` | `{ item, src, load, fail }` | Before a lazy load. Cancelable: prevent it to load children yourself with `load(nodes)` or `fail()` |
| `ds:tree:loaded` | `{ item, count }` | Children are in place |
| `ds:tree:error` | `{ item }` | A load failed |

### Chips and badges

Components: [Chip](./chip.md), [Badge](./badge.md), [Avatar](./avatar.md).

| Function | Description |
| --- | --- |
| `DS.badge.set(el, count)` | Sets a count badge; hides it at 0 and shows `<max>+` above the maximum |
| `DS.chips.remove(chip)` | Removes a chip and moves focus to its neighbour; returns `false` when `ds:chip:remove` was cancelled |

| Attribute | Effect |
| --- | --- |
| `data-ds-chips` | Chip set with roving focus; `="single"` makes pressed chips exclusive |
| `data-ds-chips-max="5"` | Collapses chips beyond that number behind a "+N more" chip |
| `data-ds-chips-more` | Set on the "+N more" chip by the script |
| `data-ds-chip-toggle` | Filter chip: a click flips `aria-pressed` |
| `data-ds-chip-remove` | Remove button of an input chip |
| `data-ds-badge` | Count badge; the count is `data-count` |
| `data-ds-badge-max` | Largest count shown (default 99) |
| `data-ds-badge-zero="show"` | Shows the badge at 0 |
| `data-ds-badge-label` | Noun for the spoken count, such as `unread` |
| `data-ds-badge-live` | Announces count changes politely |
| `data-ds-badge-text` | Set on the visible count by the script |

| Event | Detail | When |
| --- | --- | --- |
| `ds:chip:toggle` | `{ pressed }` | A filter chip is pressed |
| `ds:chip:remove` | `{ label, chip }` | A chip is about to go. Cancelable |
| `ds:chips:expand` | `{ expanded }` | The "+N more" chip is pressed |

### Carousel and image

Components: [Carousel](./carousel.md), [Image](./image.md).

| Function | Description |
| --- | --- |
| `DS.carousel.next(el)`, `DS.carousel.prev(el)` | Moves one stop. `el` is the carousel or a selector |
| `DS.carousel.goTo(el, index)` | Goes to a slide by index |
| `DS.carousel.play(el)`, `DS.carousel.pause(el)` | Starts or stops autoplay |
| `DS.image.zoom(el)` | Opens the lightbox for a zoom trigger; returns `false` when it has no source |

| Attribute | Effect |
| --- | --- |
| `data-ds-carousel` | Carousel on CSS scroll snap |
| `data-ds-loop` | Wraps from the last slide to the first |
| `data-ds-autoplay="5000"` | Autoplay interval in ms; off by default and never under reduced motion |
| `data-ds-indicators="dots\|thumbs\|count\|none"` | Indicator style (default `dots`) |
| `data-ds-thumb` | On a slide: thumbnail source for `thumbs` |
| `data-ds-zoom` | Opens the image in a lightbox on click |
| `data-ds-zoom-src` | Source of the large image (default the `href`, else the image) |
| `data-ds-caption` | Lightbox caption (default the `figcaption` or the `alt`) |
| `data-ds-blur` | On `.ds-image-frame[data-placeholder="blur"]`: URL of the blurred placeholder |

| Event | Detail | When |
| --- | --- | --- |
| `ds:carousel:change` | `{ index, slide, count, slides }` | The current stop changes |
| `ds:image:load` | none | An image in a `.ds-image-frame` loaded |
| `ds:image:error` | none | It failed to load |

## Navigation

### Tabs

Components: [Tabs](./tabs.md), [Segmented control](./segmented-control.md), [Bottom navigation](./bottom-navigation.md).

| Function | Description |
| --- | --- |
| `DS.tabs.select(root, which)` | Selects a tab by index, by id or `data-ds-tab` slug, or by element. `root` is the tabs element or a selector |
| `DS.tabs.refresh(root)` | Measures the indicator and overflow again; also works on a segmented control and bottom navigation |

| Attribute | Effect |
| --- | --- |
| `data-ds-tabs` | Tabs with an ARIA tablist |
| `data-ds-activation="manual"` | Arrow keys move focus; Enter or Space selects |
| `data-ds-tabs-hash` | Keeps the selected tab in the URL hash |
| `data-ds-tab` | On a tab: slug for the hash and for `DS.tabs.select` |
| `data-ds-segmented` | Segmented control; `="off"` skips the sliding thumb |
| `data-ds-bottom-nav` | Bottom navigation with a sliding indicator |
| `data-ds-hide-on-scroll` | On bottom navigation or a navbar: hides while scrolling down |

| Event | Detail | When |
| --- | --- | --- |
| `ds:tabs:change` | `{ tab, panel, index, previous }` | The selected tab changes |
| `ds:segmented:change` | `{ value, item }` | The segmented choice changes |
| `ds:bottomnav:change` | `{ item }` | A bottom navigation item is chosen |

### Navigation menu

Components: [Navbar](./navbar.md), [Navigation menu](./navigation-menu.md), [Language switcher](./language-switcher.md), [Breadcrumb](./breadcrumb.md).

| Function | Description |
| --- | --- |
| `DS.navbar.close(bar)` | Closes the mobile menu of a navbar; `bar` is an element or selector |
| `DS.language.current()` | Language of the page, two letters |
| `DS.language.remembered()` | Language remembered on this device, or `null` |

| Attribute | Effect |
| --- | --- |
| `data-ds-navbar` | Navbar: scroll edge, mobile menu |
| `data-ds-navbar-toggle` | Button that opens and closes the mobile menu |
| `data-ds-nav-menu` | Disclosure navigation with dropdown and mega panels |
| `data-ds-popdown` | On a `<details>`: closes on outside press, focus out, Escape and link click |
| `data-ds-language-remember` | Around language links with `hreflang`: remembers the choice in a cookie and `localStorage`; `="storage"` skips the cookie |
| `data-ds-language-cookie` | Cookie name (default `.AspNetCore.Culture`) |

| Event | Detail | When |
| --- | --- | --- |
| `ds:navbar:toggle` | `{ open }` | The mobile menu opens or closes |
| `ds:navmenu:open` | `{ trigger, panel }` | A navigation panel opens |
| `ds:navmenu:close` | `{ trigger, panel }` | A navigation panel closes |
| `ds:language:change` | `{ language }` | A language link is pressed; dispatched on the `data-ds-language-remember` element |

## Feedback and overlays

### Toast, alert and banner

Components: [Toast](./toast.md), [Alert](./alert.md), [Banner](./banner.md), [Notification center](./notification-center.md).

| Function | Description |
| --- | --- |
| `DS.toast(options)` | Shows a toast and returns a handle `{ id, close(), dismiss(), update(options) }`. Tones: `success`, `info`, `warning`, `error`, `loading` |
| `DS.toast.promise(promise, { loading, success, error })` | Shows a loading toast and turns it into success or error. `promise` may be a function; each message is a string, an options object, or a function of the result or reason |
| `DS.toast.success(title, options)` | Same for `error`, `info`, `warning` and `loading` |
| `DS.toast.dismiss(id)` | Closes the toast with that id, or every toast without an id |
| `DS.alert.dismiss(alert)` | Removes an alert element |
| `DS.banner.dismiss(banner)` | Hides a banner (element or id) and remembers it |
| `DS.banner.reset(id)` | Forgets the dismissal and shows the banner again |
| `DS.notif.setUnread(notif, count)` | Sets the unread count of a `.ds-notif` |
| `DS.notif.markAllRead(notif)` | Marks every item read and sets the count to 0 |

| Option | Default | Effect |
| --- | --- | --- |
| `tone` | `"info"` | Colour, icon and role (`alert` for `error`, else `status`) |
| `title`, `text` | empty | Content; set with `textContent` |
| `timeout` | `config.toastTimeout` | Milliseconds; `0` or `Infinity` keeps it. Errors, `loading` and toasts with an action stay unless a number is given |
| `stack` | `true` | `false` replaces the toasts on screen |
| `id` | generated | A toast with the same id is updated instead of duplicated |
| `position` | `"bottom-end"` | `bottom-start`, `bottom-center`, `bottom-end`, `top-start`, `top-center` or `top-end` |
| `action` | none | `{ label, href, onClick(handle, event), keepOpen }`; the toast stays until the action is used |
| `closeButton` | `true` | `false` hides the close button |

| Attribute | Effect |
| --- | --- |
| `data-ds-toast-show="tone"` | Shows a toast on click |
| `data-ds-toast-title`, `data-ds-toast-text` | Content of that toast |
| `data-ds-toast-action="Undo"` | Adds an action with that label |
| `data-ds-toast-id`, `data-ds-toast-position`, `data-ds-toast-timeout` | Same as the `id`, `position` and `timeout` options |
| `data-ds-toast-resolve="success\|error"` | With `loading`: switches to that tone after a delay |
| `data-ds-toast-resolve-title`, `data-ds-toast-resolve-text` | Content after the switch |
| `data-ds-toast-resolve-after` | Delay in ms (default 1800) |
| `data-ds-toast-region` | Container of toasts; the value sets its position. One is created when missing |
| `data-ds-toast="tone"` | A server-rendered toast inside a region |
| `data-ds-toast-close` | Close button of a toast |
| `data-ds-alert-close` | Close button of a `.ds-alert` |
| `data-ds-banner="id"` | A banner whose dismissal is remembered under that id |
| `data-ds-banner-remember="session\|none"` | Remember for the session only, or not at all (default `localStorage`) |
| `data-ds-banner-days` | Forget the dismissal after that many days |
| `data-ds-banner-close` | Close button of a `.ds-banner` |
| `data-ds-notif-read-all` | Button that marks every notification read |
| `data-ds-notif-unread` | Unread dot of a notification item; hidden when read |

| Event | Detail | When |
| --- | --- | --- |
| `ds:toast:close` | `{ id }` | A toast starts to leave |
| `ds:toast:action` | `{ id, trigger }` | Its action is used; `trigger` is the `data-ds-toast-show` element, if any |
| `ds:alert:dismiss` | none | An alert is dismissed. Cancelable |
| `ds:banner:dismiss` | `{ id }` | A banner is dismissed. Cancelable |
| `ds:notif:read-all` | none | `markAllRead` runs |

### Dialog

Components: [Dialog](./dialog.md), [Alert dialog](./alert-dialog.md).

| Function | Description |
| --- | --- |
| `DS.dialog.open(dialog, opener)` | Opens a modal `<dialog>` (element or id), keeps the opener for focus return, and returns the dialog |
| `DS.dialog.close(dialog, value = "")` | Closes it; `value` becomes `returnValue`. Ignored while the dialog is busy |
| `DS.dialog.busy(dialog, on = true, button)` | Busy state: blocks Escape, the scrim and Close, and shows a spinner on `button` after 300 ms |
| `DS.confirm(options, opener)` | Asks before a consequential action; resolves `true` when accepted. `DS.dialog.confirm` is the same function |

`DS.confirm` options:

| Option | Default | Effect |
| --- | --- | --- |
| `title`, `text` | "Continue?", empty | Heading and description |
| `label` | "Delete" | Accept button text |
| `tone` | `"danger"` | `"danger"` or `"primary"` accept button |
| `focus` | `"cancel"` | `"accept"` puts initial focus on the accept button |
| `action` | none | Async function run while the dialog is busy; a rejection keeps the dialog open with the error message |

| Attribute | Effect |
| --- | --- |
| `data-ds-dialog-open="id"` | Opens the `<dialog>` with that id |
| `data-ds-dialog-close="value"` | Closes the dialog and sets its return value |
| `data-ds-initial-focus` | Element that receives focus when a dialog opens |
| `data-ds-dismissible` | A scrim press closes the dialog; `="false"` turns it off. Sheets and command palettes are dismissible by default |
| `data-ds-dialog-box` | Element whose edge counts as the dialog box for a scrim press |
| `data-ds-open-on-load` | On a dialog: reopens after a server round trip |
| `data-ds-busy="false"` | On a form in a dialog: submitting does not mark the dialog busy |
| `data-ds-confirm="Title"` | Asks before the click or submit proceeds |
| `data-ds-confirm-text`, `data-ds-confirm-label` | Description and accept text of that question |
| `data-ds-confirm-tone="danger\|primary"` | Accept button tone |
| `data-ds-confirm-focus="accept"` | Initial focus on the accept button |

| Event | Detail | When |
| --- | --- | --- |
| `ds:dialog:open` | none | A dialog opens through `DS.dialog.open`, a `data-ds-dialog-open` trigger or `data-ds-open-on-load` |
| `ds:dialog:close` | `{ value }` | Any dialog closes; `value` is its return value |
| `ds:confirmed` | none | A `data-ds-confirm` control that is neither a link nor in a form is confirmed; dispatched on it |

### Sheet

Components: [Sheet](./sheet.md).

| Function | Description |
| --- | --- |
| `DS.sheet.open(sheet, opener, { snap, modal = true })` | Opens a `dialog.ds-sheet` at a snap index; `modal: false` opens it non-modally, without a focus trap |
| `DS.sheet.close(sheet)` | Closes it |
| `DS.sheet.snap(sheet, index)` | Moves an open sheet to a snap point |

| Attribute | Effect |
| --- | --- |
| `data-ds-sheet-open="id"` | Opens the sheet with that id |
| `data-ds-sheet-close` | Closes the sheet that contains it |
| `data-ds-sheet-snap="45%,100%"` | Visible fractions, smallest first; the first is where it opens |
| `data-ds-sheet-initial` | Snap index to open at |
| `data-ds-sheet-drag` | Element that works as a drag handle |
| `data-ds-no-drag` | Element that never starts a drag |
| `data-ds-dismissible="false"` | A scrim press does not close the sheet |
| `data-ds-modeless` | Set while the sheet is open without `modal` |

| Event | Detail | When |
| --- | --- | --- |
| `ds:sheet:open` | none | The sheet opens |
| `ds:sheet:close` | none | The sheet closes |
| `ds:sheet:snap` | `{ index }` | It settles on a snap point |

### Popover and hover card

Components: [Popover](./popover.md), [Hover card](./hover-card.md).

| Function | Description |
| --- | --- |
| `DS.popover.open(popover, anchor, { side, align, focus = true })` | Opens a `[popover]` (element or id) next to its trigger or `anchor` |
| `DS.popover.close(popover)` | Closes it |
| `DS.popover.toggle(popover, anchor)` | Opens or closes it |
| `DS.popover.place(floating, anchor, { side, align, gap, inset })` | Places a fixed element next to an anchor, flips to fit, and returns the side used |
| `DS.hoverCard.open(id)` | Opens the hover card of the trigger with that id |
| `DS.hoverCard.close(id)` | Closes it |

| Attribute | Effect |
| --- | --- |
| `data-ds-popover` | Marks a `[popover]` that has no `.ds-popover` class |
| `data-ds-side` | On a popover: `bottom`, `top`, `left` or `right` |
| `data-ds-align` | `start`, `center` or `end` |
| `data-ds-gap` | Distance to the trigger in px (default 6) |
| `data-ds-hover-card="id"` | On a link: opens the hover card with that id |
| `data-ds-open-delay` | Hover delay before opening (default 500 ms) |
| `data-ds-close-delay` | Delay before closing (default 300 ms) |
| `data-ds-initial-focus` | Element that gets focus when a popover opens |

| Event | Detail | When |
| --- | --- | --- |
| `ds:popover:open` | none | A popover or hover card opens |
| `ds:popover:close` | none | It closes |

### Tooltip

Components: [Tooltip](./tooltip.md).

| Function | Description |
| --- | --- |
| `DS.tooltip.show(el)` | Shows the tooltip of a trigger at once |
| `DS.tooltip.hide()` | Hides the open tooltip |

| Attribute | Effect |
| --- | --- |
| `data-ds-tooltip="text"` | Tooltip text; the trigger gets `aria-describedby` |
| `data-ds-tooltip-title` | Rich tooltip: a title above the text |
| `data-ds-tooltip-kbd="Ctrl K"` | Shortcut shown after the text |
| `data-ds-tooltip-placement="top"` | `top`, `bottom`, `left` or `right`, with `-start` or `-end` (default `top`) |
| `data-ds-tooltip-delay="500"` | Hover delay in ms; `0` is immediate |
| `data-ds-tooltip-overflow` | Shows the element's own text, only when it is truncated |
| `data-ds-tooltip-named` | Set when the tooltip also serves as the accessible name of an icon-only control |

No events.

### Menu

Components: [Dropdown menu](./dropdown-menu.md), [Menubar](./menubar.md).

| Function | Description |
| --- | --- |
| `DS.menu.open(menu, anchor, options)` | Opens a menu (element or id) next to `anchor` (default its trigger). Options: `focus` (`"first"`, `"last"`, `"menu"` or `null`), `side`, `align`, `gap`, `trigger`, `context`. Returns the menu or `null` |
| `DS.menu.close(menu)` | Closes a menu and its submenus and returns focus |
| `DS.menu.closeAll()` | Closes every open menu |

| Attribute | Effect |
| --- | --- |
| `data-ds-menu-open="id"` | Trigger that opens the menu with that id, as `popovertarget` does |
| `data-ds-submenu="id"` | On an item with `aria-haspopup="menu"`: the submenu, when `aria-controls` is missing |
| `data-ds-close="true\|false"` | On an item: closes or keeps the menu after selection. Checkbox and radio items keep it by default |
| `data-ds-floating` | Set on a menu or popover while it is placed next to its anchor |

| Event | Detail | When |
| --- | --- | --- |
| `ds:menu:open` | none | A menu opens; dispatched on the menu |
| `ds:menu:close` | none | A menu closes |
| `ds:menu:select` | `{ value, checked, context }` | An item is activated; dispatched on the item. Cancelable: prevent it to keep the menu open |

`value` comes from `data-value`, else the item text. `checked` is set for checkbox and radio items. `context` is the pressed element of a [context menu](./context-menu.md), else `null`.

### Context menu

Components: [Context menu](./context-menu.md).

| Function | Description |
| --- | --- |
| `DS.contextMenu.open(region, x, y)` | Opens the menu of a region (element or `data-ds-context-menu` value) at viewport coordinates; without `x` it opens at the focused element |

| Attribute | Effect |
| --- | --- |
| `data-ds-context-menu="menu-id"` | Region that opens that menu by right click, Shift+F10, the ContextMenu key or a 500 ms long press |
| `data-ds-context-item` | Element inside the region that is reported as `context` on selection |
| `data-ds-context-native="shift"` | Shift+right click shows the browser menu |
| `data-ds-pressing` | Set on the region during a long press |

| Event | Detail | When |
| --- | --- | --- |
| `ds:context-menu:open` | `{ context }` | The menu opens; dispatched on the region. `context` is the item or the region |

### Command palette

Components: [Command](./command.md).

| Function | Description |
| --- | --- |
| `DS.command.open(id)` | Opens a palette dialog (the first one without `id`) |
| `DS.command.close(id)` | Closes it |
| `DS.command.filter(command, query)` | Sets the query and filters; returns the number of visible items |
| `DS.command.setItems(command, items)` | Replaces the script-provided results. Items: `{ label, description, href, value, icon, shortcut, group, disabled }` |
| `DS.command.setLoading(command, on = true)` | Busy state; the loading row appears after 300 ms |

`command` is a `.ds-command`, a palette dialog, or its id.

| Attribute | Effect |
| --- | --- |
| `data-ds-command` | On the `<dialog>`: a command palette |
| `data-ds-command-shortcut="mod+k"` | Opens it from the keyboard: `mod+k` (Cmd on Apple, Ctrl elsewhere) or a single key such as `/` |
| `data-ds-command-open="id"` | Button that opens that palette |
| `data-ds-command-hint` | Element whose text becomes the shortcut for this platform; the value is the palette id |
| `data-ds-command-source="/search?q={query}"` | On `.ds-command`: fetches results as JSON |
| `data-ds-command-min` | Characters typed before fetching (default 1) |
| `data-ds-command-always` | On an item: never filtered out |
| `data-ds-keep-open` | On an item: the palette stays open after the action |
| `data-ds-command-query` | Inside the empty message: replaced by the query |
| `data-ds-command-message` | Inside the empty message: replaced by the error text when a fetch fails |
| `data-ds-command-remote`, `data-ds-command-remote-group` | Set on fetched items and their groups |

Items can also carry `data-value` and `data-keywords` (extra match terms).

| Event | Detail | When |
| --- | --- | --- |
| `ds:command:query` | `{ query }` | The user types; dispatched on `.ds-command` |
| `ds:command:select` | `{ value, item, query }` | An item is chosen; dispatched on the item. Cancelable |

## Disclosure and layout

### Accordion and collapsible

Components: [Accordion](./accordion.md), [Collapsible](./collapsible.md).

| Function | Description |
| --- | --- |
| `DS.accordion.openAll(accordion)` | Opens every item that is not disabled |
| `DS.accordion.closeAll(accordion)` | Closes every item |

| Attribute | Effect |
| --- | --- |
| `data-ds-accordion="single"` | Only one item open at a time |
| `data-ds-accordion-name` | Shared name for the exclusive group (default generated) |
| `data-ds-accordion-all="open\|close"` | Button with `aria-controls` that opens or closes every item |
| `data-ds-collapsible` | Button form of a collapsible, or show more and less |
| `data-ds-label-expanded`, `data-ds-label-collapsed` | Trigger text of a collapsible in each state |

| Event | Detail | When |
| --- | --- | --- |
| `ds:accordion:toggle` | `{ open }` | An item opens or closes |
| `ds:collapsible:toggle` | `{ open }` | A collapsible opens or closes |

### Resizable panels

Components: [Resizable](./resizable.md).

| Function | Description |
| --- | --- |
| `DS.resizable.setSizes(element, sizes)` | Sets the panel sizes in percent, one per panel |

| Attribute | Effect |
| --- | --- |
| `data-ds-resizable` | On `.ds-resizable`: panels with keyboard-operable separators |
| `data-ds-resizable-id` | Remembers the sizes under that id |

Panels also read `data-min`, `data-max` and `data-collapsible`; the group reads `data-step` (keyboard step, default 5).

| Event | Detail | When |
| --- | --- | --- |
| `ds:resizable:resize` | `{ sizes }` | The sizes change |
| `ds:resizable:collapse` | `{ index, collapsed }` | A panel collapses or expands |

## State markers

The scripts write these attributes for CSS and for tests. Do not set them by hand: `data-ds-ready`, `data-ds-submitted`, `data-ds-dirty`, `data-ds-dragging`, `data-ds-moving`, `data-ds-settle`, `data-ds-busy-source`, `data-ds-pending`, `data-ds-hidden`, `data-ds-nested`, `data-ds-covered`, `data-ds-scrolled`, `data-ds-more`, `data-ds-view-lock`, `data-ds-live`, `data-ds-busy-spinner`, `data-ds-date-text`, `data-ds-tags-value`, `data-ds-toggle-input`, `data-ds-mode` and `data-ds-scheme` on `<html>`. The generated confirmation dialog (`#ds-confirm`) uses `data-ds-confirm-title`, `data-ds-confirm-text`, `data-ds-confirm-accept`, `data-ds-confirm-cancel` and `data-ds-confirm-error` internally.

## Internationalisation

UI strings (labels, live-region messages, counts) follow `<html lang>`. English and Indonesian are built in. Add or override strings, or a language, with `addMessages`; keys are `<module>.<key>` and accept `{placeholders}`.

```js
DS.addMessages({
  en: { "toast.close": "Dismiss" },
  ms: { "toast.close": "Tutup pemberitahuan" },
});
DS.configure({ locale: "ms" });   // otherwise the language comes from <html lang>
```

A missing key falls back to English, then to the key itself. Server-rendered text comes from `DsText` in C# (see [Razor and C# API](./razor-api.md) and [Localization](./localization.md)); both read the same language of the page.

## Partial updates, htmx and SPAs

Document-level listeners are wired once. Per-element widgets need `DS.init(root)` after you insert markup; it is idempotent, so re-running on a subtree never doubles a widget.

```js
// htmx
document.body.addEventListener("htmx:afterSettle", (e) => DS.init(e.target));

// fetch and replace
panel.innerHTML = await (await fetch(url)).text();
DS.init(panel);
```

In a single-page app call `DS.init(container)` in the mount hook of the component that renders DS markup. With `data-ds-manual` on `<html>`, nothing starts until you call `DS.init()` once for the page.

## Storage keys

State is stored under `<storage>-<name>` (default prefix `ds`). In `localStorage`: `ds-theme`, `ds-sidebar-collapsed`, `ds-nav-groups`, `ds-language`, `ds-banner-<id>`, `ds-recent-<key>`, `ds-resizable-<id>`, and `ds-table-<id>-density` and `ds-table-<id>-columns` for tables with `data-ds-persist`. In `sessionStorage`: `ds-nav-scroll`, and `ds-banner-<id>` for banners that remember per session. The prefix is `data-ds-storage` on `<html>` (set by `HeadOptions.Storage`) or `DS.configure({ storage })`.

## Timing and motion

Defaults live in `DS.config`: `toastTimeout` 6000 ms, `exportLock` 15000 ms. JavaScript motion checks `prefers-reduced-motion` and uses the same duration and easing tokens as CSS.
