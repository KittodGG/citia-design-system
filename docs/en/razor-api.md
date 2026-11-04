---
title: Razor and C# API
group: reference
order: 2
summary: Every tag helper with its attributes, the partial views and the C# helpers: Icon, Tone, Fmt, Wib, paging, NavModel, HeadOptions, toast, DsText.
---

The real rendering of these APIs is on the [Razor demo](./razor-demo.md) page. Namespaces: `Citia.DesignSystem.Icons`, `Citia.DesignSystem.Ui`, `Citia.DesignSystem.Formatting`, `Citia.DesignSystem.Localization` and `Citia.DesignSystem.TagHelpers`. Register them once in the application's `_ViewImports.cshtml` (see [Installation](./installation.md)):

```cshtml
@using Citia.DesignSystem.Icons
@using Citia.DesignSystem.Ui
@using Citia.DesignSystem.Formatting
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Citia.DesignSystem
```

## Tag helpers

There are 99 tag helpers. Element names are `ds-<component>`, attributes are kebab-case, and text is always encoded. Every element is listed once, grouped like the component pages; the first column links the page of the component.

How to read the attribute columns:

- An attribute is a `string` unless a type is given in parentheses, for example (`int`, `3`) or (`Tone`, `Info`). A bare default is a `string` default, for example (`secondary`).
- `Flags:` lists `bool` attributes that are off by default. Write the name alone to turn one on (`dismissible`). Attributes whose default is on, such as `show-toggle`, are listed with their type, and you write `name="false"` to turn them off.
- `Tone` attributes take the `Tone` enum (`Neutral`, `Primary`, `Info`, `Success`, `Warning`, `Error`). The `tone` of `ds-button`, `ds-icon-button` and `ds-link` is a string instead.
- `(required)` marks an attribute the output needs. The tag helper does not validate it; only an unknown `ds-icon` `name` throws.
- `asp-for` takes a model expression (`ModelExpression`) and supplies name, id, value and validation state.
- Attributes that are not listed (`data-*`, `aria-*`, `id`, `class`, `style`) stay on the output element. Exceptions are noted under the tables.
- "Child of" means the element is only valid inside that parent. `ds-tabs` and `ds-breadcrumb` also accept only their own item as a child.

### Actions

| Element | Attributes | Renders |
| --- | --- | --- |
| [`<ds-button>`](./button.md) | `variant` (`secondary`), `tone`, `size` (`md`), `icon`, `icon-end`, `loading-label`, `disabled-reason`, `href`, `type` (`button`), `pressed` (`bool?`). Flags: `icon-only`, `loading`, `full-width`, `selected`, `disabled`, `external` | `button.btn`; `a.btn` when `href` is set |
| [`<ds-icon-button />`](./icon-button.md) | `icon`, `label` (required), `variant` (`standard`), `tone`, `size` (`md`), `badge`, `disabled-reason`, `href`, `type` (`button`), `pressed` (`bool?`). Flags: `round`, `badge-dot`, `loading`, `disabled` | `button.ds-icon-button`; `a` when `href` is set |
| [`<ds-toggle>`](./toggle.md) | `icon`, `label`, `variant` (`ghost`), `size` (`md`), `disabled-reason`. Flags: `pressed`, `disabled`, `loading` | `button.ds-toggle` with `aria-pressed` |
| [`<ds-toggle-group>`](./toggle-group.md) | `type` (`single`), `label` (required), `name`, `value`, `size` (`md`), `variant` (`outlined`). Flags: `spaced`, `vertical`, `deselectable` | `div.ds-toggle-group` |
| [`<ds-toggle-item>`](./toggle-group.md) | `value`, `icon`, `label`, `disabled-reason`. Flags: `selected`, `disabled`. Child of `ds-toggle-group` | `button.ds-toggle` inside the group |
| [`<ds-fab>`](./fab.md) | `icon` (`plus`), `label`, `size` (`md`), `variant` (`primary`), `disabled-reason`, `href`. Flags: `floating`, `start`, `hide-on-scroll`, `loading`, `disabled` | `button.ds-fab`; `a` when `href` is set |
| [`<ds-link>`](./link.md) | `href`, `tone`. Flags: `standalone`, `external`, `current`, `disabled`, `prose` | `a.ds-link` |

```cshtml
<ds-button variant="primary" icon="send" loading-label="Sending…" type="submit">Send invoice</ds-button>
<ds-icon-button icon="trash" label="Delete invoice INV-2026-0418" variant="tonal" />
<ds-toggle-group type="single" label="View" name="view" value="list">
    <ds-toggle-item value="list" icon="list">List</ds-toggle-item>
    <ds-toggle-item value="grid" icon="layout-grid">Grid</ds-toggle-item>
</ds-toggle-group>
```

### Forms

| Element | Attributes | Renders |
| --- | --- | --- |
| [`<ds-field>`](./field.md) | `asp-for`, `asp-items` (`IEnumerable<SelectListItem>`), `name`, `id`, `value`, `label`, `hint`, `help`, `placeholder`, `type` (`text`), `icon`, `prefix`, `suffix`, `unit`, `size`, `success-text`, `error`, `marker` (`optional`), `autocomplete`, `inputmode`, `shortcut`, `maxlength` (`int?`), `rows` (`int`, `3`), `min`, `max`, `step` (`double?`), `recent` (`int?`), `show-toggle` (`bool`, `true`), `caps-warning` (`bool`, `true`), `stepper` (`bool`, `true`). Flags: `clearable`, `loading`, `success`, `counter`, `horizontal`, `wide`, `readonly`, `disabled`, `required`, `autogrow`, `strength`, `trailing`, `locale` | `div.ds-field` with label, control, hint, help, counter and error |
| [`<ds-fieldset>`](./fieldset.md) | `legend`, `help`, `error`, `id`. Flags: `disabled`, `boxed` | `fieldset.ds-fieldset` |
| [`<ds-checkbox>`](./checkbox.md) | `asp-for`, `name`, `id`, `label`, `description`, `value` (`true`), `checked` (`bool?`), `size`. Flags: `indeterminate`, `card`, `end`, `disabled`, `required` | `label.ds-check-row` (`.ds-choice` with `card`) around `input.checkbox` |
| [`<ds-checkbox-group />`](./checkbox.md) | Same as `ds-radio-group` | `fieldset.ds-checkbox-group` |
| [`<ds-switch>`](./switch.md) | Everything of `ds-checkbox`, plus `label-position`, `action`, `method`. Flag: `icons` | `label.ds-check-row` around `input.toggle[role=switch]`; `action` and `method` post the change |
| [`<ds-radio-group />`](./radio-group.md) | `asp-for`, `name`, `id`, `label`, `description`, `asp-items` (`IEnumerable<SelectListItem>`), `items` (`IEnumerable<ChoiceItem>`), `value`, `columns` (`int`, `0`), `size`. Flags: `horizontal`, `card`, `disabled`, `required` | `fieldset.ds-radio-group` |
| [`<ds-slider />`](./slider.md) | `asp-for`, `asp-for-end`, `name`, `name-end`, `id`, `min` (`decimal`, `0`), `max` (`decimal`, `100`), `step` (`decimal`, `1`), `value` (`decimal?`), `value-end` (`decimal?`), `label`, `format`, `marks`, `output` (`bool`, `true`), `bubble` (`bool`, `true`), `size`. Flags: `vertical`, `disabled`, `required` | `div.ds-slider`; `asp-for-end` or `name-end` makes it a range |
| [`<ds-rating />`](./rating.md) | `asp-for`, `name`, `id`, `label`, `max` (`int`, `5`), `value` (`int?`), `size`. Flags: `clearable`, `show-value`, `disabled`, `required` | `fieldset.ds-rating` |
| [`<ds-rating-display />`](./rating.md) | `value` (`double`), `max` (`int`, `5`), `count` (`int?`), `show-value` (`bool`, `true`), `size` | `span.ds-rating-summary`, read-only, fractional |
| [`<ds-otp />`](./otp-input.md) | `asp-for`, `name`, `id`, `length` (`int`, `6`), `label`, `hint`, `group` (`int`, `0`), `size`, `value`. Flags: `alphanumeric`, `autosubmit`, `disabled`, `required` | `div.ds-otp` |
| [`<ds-tags-input />`](./tags-input.md) | `asp-for`, `name`, `id`, `max` (`int`, `0`), `max-length` (`int`, `0`), `pattern`, `placeholder`, `separator` (`,`), `value`, `size`. Flags: `disabled`, `required` | `input.input[data-ds-tags]`; ds.js builds the chips |
| [`<ds-date-picker />`](./date-picker.md) | `asp-for`, `name`, `id`, `value`, `min`, `max`, `disabled-dates`, `time-zone`, `size`, `placeholder`. Flags: `disable-weekends`, `required`, `disabled`, `readonly` | `div.ds-date-picker` around `input[type=date]` |
| [`<ds-date-range-picker />`](./date-range-picker.md) | `start-for`, `end-for`, `start-name`, `end-name`, `start-value`, `end-value`, `legend`, `hint`, `min`, `max`, `presets`, `time-zone`. Flags: `autosubmit`, `required`, `disabled` | `fieldset.ds-fieldset.ds-date-range` with two date inputs |
| [`<ds-time-picker />`](./time-picker.md) | `asp-for`, `name`, `id`, `value`, `min`, `max`, `step` (`int?`, seconds), `hour-cycle`, `size`. Flags: `seconds`, `required`, `disabled`, `readonly` | `div.ds-time-picker` around `input[type=time]` |
| [`<ds-color-picker />`](./color-picker.md) | `asp-for`, `name`, `id`, `value`, `swatches`, `contrast-against`. Flags: `no-eyedropper`, `disabled` | `div.ds-color-picker` around `input[type=color]` |
| [`<ds-file-upload />`](./file-upload.md) | `asp-for`, `name`, `id`, `accept`, `max-size`, `max-files` (`int?`), `upload-url`, `upload-field`, `upload-param`, `title`, `hint`, `icon` (`cloud-upload`). Flags: `multiple`, `paste-page`, `compact`, `required`, `disabled` | `div.ds-file-upload` with `label.ds-dropzone` |
| [`<ds-avatar-upload />`](./file-upload.md) | `asp-for`, `name`, `id`, `src`, `initials`, `title`, `hint`, `accept` (`image/jpeg,image/png,image/webp`), `max-size` (`2 MB`), `remove-name`. Flags: `large`, `disabled` | `div.ds-avatar-upload` |
| [`<ds-error-summary />`](./validation.md) | `title`. Flag: `exclude-model-errors` | `div.ds-error-summary`, hidden while the model is valid |
| [`<ds-form-section>`](./form.md) | `title` (required), `description`, `level` (`int`, `2`, heading 2 to 4). Flags: `card`, `stacked`, `grid` | `section.ds-form-section` |
| [`<ds-form-bar>`](./form.md) | `dirty-text`. Flags: `dirty-only`, `floating` | `div.ds-form-bar`; the child content is the action area |

Pass-through rules. `ds-field` sends attributes it does not list (`pattern`, `data-*`) to the control and `class` to the wrapper; child content replaces the generated control. The choice tag helpers move `data-*` and `aria-*` to the input. The date, time, color and upload tag helpers send other attributes to the input and keep `class` on the wrapper. `ds-checkbox` and `ds-switch` use the child content as the label when `label` is empty. Without `asp-for`, give `name` (and `value`).

```cshtml
<ds-field asp-for="Name" label="Project name" hint="Shown in lists and invoices." />
<ds-field asp-for="Budget" type="number" label="Budget" prefix="$" step="0.01" />
<ds-field asp-for="Owner" type="select" asp-items="Model.Owners" label="Owner" />
<ds-checkbox asp-for="AcceptTerms" label="I accept the terms" />
<ds-radio-group asp-for="Plan" asp-items="Model.Plans" label="Plan" card columns="2" />
<ds-slider asp-for="Volume" label="Volume" min="0" max="100" step="5" format="{value}%" />
<ds-date-range-picker start-for="From" end-for="To" legend="Billing period" presets="last7,last30,thisMonth" />
```

### Data display

| Element | Attributes | Renders |
| --- | --- | --- |
| [`<ds-avatar />`](./avatar.md) | `name`, `src`, `icon`, `size`, `shape` (`square`), `presence`, `label` | `span.ds-avatar` with a stable color class |
| [`<ds-avatar-group />`](./avatar.md) | `names` (`IEnumerable<string>`), `max` (`int`, `4`), `size`, `shape` (`circle`), `label` | `div.ds-avatar-group` with a "+N" avatar |
| [`<ds-badge />`](./badge.md) | `count` (`int`, `0`), `max` (`int`, `99`), `tone` (`Tone`, `Primary`), `size`, `label`. Flags: `dot`, `show-zero`, `soft`, `outline`, `live` | `span.ds-badge`; hidden at 0 unless `show-zero` |
| [`<ds-status>`](./status.md) | `tone` (`Tone`, `Neutral`), `size`. Flags: `live`, `outline`, `no-dot` | `span.ds-status` |
| [`<ds-pill>`](./status.md) | `tone` (`Tone`, `Neutral`), `size`. Flags: `live`, `outline`, `plain` | `span.ds-pill` |
| [`<ds-tag>`](./tag.md) | `tone` (`Tone`, `Neutral`), `size`, `icon`. Flags: `outline`, `removable` | `span.ds-tag`; `removable` adds a remove button, the application handles the click |
| [`<ds-chip>`](./chip.md) | `variant` (`ChipVariant`, `Filter`; also `Input`, `Assist`, `Suggestion`), `icon`, `count` (`int?`), `href`, `size`, `remove-label`. Flags: `pressed`, `disabled`, `error` | `button.ds-chip`; `a` for `Assist` and `Suggestion` with `href`; `span` for `Input` |
| [`<ds-chip-set>`](./chip.md) | `label`, `mode` (`multiple`; `single` makes pressed chips exclusive), `max` (`int?`). Flag: `nowrap` | `div.ds-chips[role=group]` |
| [`<ds-card>`](./card.md) | `title`, `eyebrow`, `description`, `href`, `image`, `image-alt` (empty), `input-type` (`checkbox`), `name`, `value`, `level` (`int`, `3`). Flags: `horizontal`, `selectable`, `checked`, `disabled`, `loading`, `danger` | `article.ds-card`; `label.ds-card` when `selectable` |
| [`<ds-card-actions>`](./card.md) | none. Child of `ds-card` | `div.ds-card__actions` in the card header |
| [`<ds-card-footer>`](./card.md) | none. Child of `ds-card` | `footer.ds-card__footer` |
| [`<ds-stat>`](./stat.md) | `label` (required), `value` (required), `unit`, `delta`, `trend` (`Trend`, `None`; also `Up`, `Down`, `Flat`), `delta-tone` (`Tone?`), `delta-text`, `compare`, `sub`, `icon`, `href`, `tone` (`Tone`, `Primary`). Flags: `loading`, `bar` | `div.ds-stat`; `a` with `href`; child content is the sparkline slot |
| [`<ds-data-table-toolbar>`](./data-table.md) | `action`, `search-name` (`q`), `search-value`, `search-label`, `search-placeholder`, `density-value` (`comfortable`), `export-href`, `export-label`, `export-kind` (`Excel`), `reset-href`, `hidden-columns`, `keep` (`sort,direction,size`), `column-*` (`column-status="Status"` gives key `status`, label `Status`). Flags: `client`, `density` | `form.ds-table-toolbar` (GET); `div` with `client` |
| [`<ds-kbd>`](./kbd.md) | `keys`, `size`. Flag: `ghost` | `kbd.ds-kbd`; `span.ds-kbd-group` for a combination |
| [`<ds-code-block>`](./code-block.md) | `language`, `title`, `code`, `highlight`, `collapsible` (`double?`, rem), `pre-id`. Flags: `line-numbers`, `diff`, `wrap`, `wrap-toggle`, `no-copy` | `figure.ds-code` with `pre.ds-code-block` |
| [`<ds-image />`](./image.md) | `src`, `alt`, `width` (`int?`), `height` (`int?`), `srcset`, `sizes`, `ratio`, `radius`, `fit`, `caption`, `zoom-src`, `placeholder`, `blur`. Flags: `zoom`, `priority` | `figure.ds-figure` |
| [`<ds-aspect-ratio>`](./aspect-ratio.md) | `ratio` (`16/9`). Flag: `flat` | `div.ds-aspect` |
| [`<ds-carousel>`](./carousel.md) | `label`, `per-view` (`int`, `1`), `autoplay` (`int`, `0`, milliseconds), `indicators` (`CarouselIndicators`, `Dots`; also `Thumbs`, `Count`, `None`). Flag: `loop` | `section.ds-carousel` |
| [`<ds-slide>`](./carousel.md) | none. Child of `ds-carousel` | `div.ds-carousel__slide` |
| [`<ds-sparkline />`](./chart.md) | `values` (`IEnumerable<double>`), `label`, `tone` (`Tone`, `Primary`). Flags: `area`, `large` | `svg.ds-sparkline[role=img]` |

```cshtml
<ds-avatar name="Ayu Lestari" size="md" shape="circle" presence="online" />
<ds-status tone="Warning">Awaiting approval</ds-status>
<ds-chip variant="Filter" pressed count="12">Overdue</ds-chip>
<ds-stat label="Open projects" value="24" delta="+3" trend="Up" icon="briefcase" />
<ds-card title="Website redesign" eyebrow="PRJ-1024" href="/projects/1024">
    Updated 2 Nov 2026.
    <ds-card-footer><ds-status tone="Success">Active</ds-status></ds-card-footer>
</ds-card>
<ds-sparkline values="@(new double[] { 12, 14, 13, 18, 21 })" label="Orders, last 5 days: from 12 to 21" />
```

### Feedback

| Element | Attributes | Renders |
| --- | --- | --- |
| [`<ds-alert>`](./alert.md) | `tone` (`Tone`, `Info`), `title`, `icon`, `role`, `dismiss-label`. Flags: `dismissible`, `compact` | `div.ds-alert`; `role="alert"` for `Error`, `status` otherwise |
| [`<ds-alert-actions>`](./alert.md) | none. Child of `ds-alert` | Action area of the alert |
| [`<ds-banner>`](./banner.md) | `tone` (`Tone`, `Info`), `title`, `icon`, `status-label`, `key`, `remember` (`local`; also `session`, `none`), `days` (`int?`), `dismiss-label`. Flags: `dismissible`, `sticky`, `bar`, `critical`, `system` | `div.ds-banner`; `key` keeps the dismissal |
| [`<ds-banner-actions>`](./banner.md) | none. Child of `ds-banner` | Action area of the banner |
| [`ds-tooltip="…"`](./tooltip.md) (attribute on any element) | `ds-tooltip` (text), `ds-tooltip-title`, `ds-tooltip-placement`, `ds-tooltip-kbd`, `ds-tooltip-delay` (`int?`, ms) | Adds `data-ds-tooltip` and the related `data-ds-tooltip-*` attributes |
| [`<ds-tooltip>`](./tooltip.md) | `text` (required), `title`, `placement`, `kbd` | `span.ds-tooltip-wrap`, a focusable wrapper that carries the tooltip of a disabled control |
| [`<ds-empty>`](./empty-state.md) | `icon` (`info`), `title` (required), `action-label`, `action-href`, `action-icon` (`plus`), `variant` (`first-use`, `no-results`, `error`, `permission`, `compact`), `secondary-label`, `secondary-href`, `level` (`int`, `2`, clamped to 2 to 4). Flag: `boxed` | `div.ds-empty`; the child content is the explaining sentence |
| [`<ds-progress />`](./progress.md) | `value` (`double?`; empty is indeterminate), `max` (`double`, `100`), `buffer` (`double?`), `label`, `value-text`, `tone` (`Tone`, `Primary`), `size`, `steps` (`int`, `0`). Flags: `show-value`, `visible-label`, `circular` | `.ds-progress[role=progressbar]`, `.ds-progress-circle` with `circular`, `.ds-progress-steps` with `steps`; wrapped in `div.ds-meter` when a label or value is shown |
| [`<ds-skeleton />`](./skeleton.md) | `shape` (`Text`; also `Heading`, `Avatar`, `Rect`, `Image`, `Button`, `Pill`), `lines` (`int`, `1`). Flag: `delayed` | `span.ds-skeleton`; `div.ds-skeleton-stack` when `lines` is above 1 |
| [`<ds-spinner />`](./spinner.md) | `label`, `size`, `tone` (`Tone`, `Neutral`). Flags: `block`, `quiet-label`, `delayed` | `span.ds-loading[role=status]` |
| [`<ds-stepper>`](./stepper.md) | `current` (`int`, `0`, 1-based), `orientation` (`StepperOrientation`, `Vertical`; also `Horizontal`), `label`. Flag: `centered` | `div.ds-stepper` |
| [`<ds-step>`](./stepper.md) | `title` (required), `description`, `href`, `state` (`StepState`, `Auto`; also `Complete`, `Current`, `Upcoming`, `Error`). Flags: `optional`, `disabled`. Child of `ds-stepper` | One step; a link when `href` is set |

```cshtml
<ds-alert tone="Warning" title="Storage almost full" dismissible>
    You have used 92% of 50 GB.
    <ds-alert-actions><a class="btn btn-sm" href="/billing">Upgrade</a></ds-alert-actions>
</ds-alert>
<button class="btn" ds-tooltip="Delete" ds-tooltip-placement="bottom">Delete</button>
<ds-progress value="62" label="Import" show-value tone="Success" />
<ds-empty icon="receipt" title="No invoices yet" action-label="Create invoice" action-href="/Invoices/Create" boxed>
    Invoices you create appear here.
</ds-empty>
```

### Overlays

| Element | Attributes | Renders |
| --- | --- | --- |
| [`<ds-dialog>`](./dialog.md) | `id`, `title`, `description`, `size`, `icon`, `icon-tone`, `close-label`, `closable` (`bool?`). Flags: `dismissible`, `full-mobile`, `alert`, `open-on-load` | `dialog.modal`; `alert` gives `role="alertdialog"` (see [Alert dialog](./alert-dialog.md)) |
| [`<ds-dialog-footer>`](./dialog.md) | none. Child of `ds-dialog` | Actions after the body, primary action last |
| [`<ds-sheet>`](./sheet.md) | `id`, `side` (`end`; also `start`, `top`, `bottom`), `size`, `title`, `description`, `snap`, `close-label`, `handle` (`bool?`), `dismissible` (`bool`, `true`) | `dialog.ds-sheet.is-<side>` |
| [`<ds-sheet-footer>`](./sheet.md) | none. Child of `ds-sheet` | Actions pinned under the body |
| [`<ds-popover>`](./popover.md) | `id`, `title`, `description`, `side` (`bottom`), `align` (`start`), `size`, `label`. Flags: `arrow`, `closable` | `div.ds-popover[popover]` |
| [`<ds-hover-card>`](./hover-card.md) | `id`, `side` (`bottom`), `align` (`center`). Flag: `arrow` | `div.ds-hover-card` |
| [`<ds-menu>`](./dropdown-menu.md) | `id`, `label`, `side`, `align`, `size` | `div.ds-menu[popover][role=menu]` |
| [`<ds-menu-item>`](./dropdown-menu.md) | `type` (`item`; also `checkbox`, `radio`), `icon`, `shortcut`, `description`, `href`, `value`, `submenu`. Flags: `checked`, `disabled`, `danger` | `button.ds-menu__item`; `a` with `href` |
| [`<ds-menu-sub>`](./dropdown-menu.md) | none | `div.ds-menu__sub` around a submenu item and its nested `ds-menu` |
| [`<ds-menu-group>`](./dropdown-menu.md) | `label` | `div.ds-menu__group[role=group]` |
| [`<ds-menu-label>`](./dropdown-menu.md) | none | `div.ds-menu__label`, not focusable |
| [`<ds-menu-separator />`](./dropdown-menu.md) | none | `div.ds-menu__separator` |
| [`<ds-command>`](./command.md) | `id`, `placeholder`, `label`, `shortcut`, `source`, `min-length` (`int?`), `hints` (`bool?`). Flag: `palette` | `dialog.ds-command-dialog` with `palette`; `div.ds-command.is-inline` otherwise |
| [`<ds-command-group>`](./command.md) | `label` | `div.ds-command__group` |
| [`<ds-command-item>`](./command.md) | `icon`, `description`, `shortcut`, `href`, `value`, `keywords`. Flags: `disabled`, `danger` | `div.ds-command__item[role=option]`; `a` with `href` |

Overlays that take an `id` generate a unique one when it is empty. Set `id` when a trigger has to target the element (`data-ds-dialog-open`, `popovertarget`, `data-ds-sheet-open`).

```cshtml
<button class="btn" data-ds-dialog-open="invite">Invite</button>
<ds-dialog id="invite" title="Invite a teammate" size="md" dismissible>
    <ds-field name="email" type="email" label="Email" />
    <ds-dialog-footer>
        <button class="btn" data-ds-dialog-close>Cancel</button>
        <button class="btn btn-primary">Send invite</button>
    </ds-dialog-footer>
</ds-dialog>
<ds-menu id="row-menu" label="Actions for INV-2026-0418" align="end">
    <ds-menu-item icon="pencil" shortcut="E">Edit</ds-menu-item>
    <ds-menu-separator />
    <ds-menu-item icon="trash" danger>Delete</ds-menu-item>
</ds-menu>
```

### Navigation

| Element | Attributes | Renders |
| --- | --- | --- |
| [`<ds-tabs>`](./tabs.md) | `label`, `variant` (`underline`; also `pill`, `boxed`), `size` (`md`), `selected`. Flags: `vertical`, `manual`, `full`, `hash`. Accepts only `ds-tab` as child | `div.ds-tabs[data-ds-tabs]`; `nav` when the tabs are links |
| [`<ds-tab>`](./tabs.md) | `id`, `label`, `icon`, `count`, `href`. Flags: `current`, `disabled`. Child of `ds-tabs` | One tab; the child content is the panel, a tab with `href` has no panel |
| [`<ds-breadcrumb>`](./breadcrumb.md) | `label`, `separator` (`slash`; also `chevron`), `collapse` (`bool`, `true`). Accepts only `ds-breadcrumb-item` as child | `nav.ds-breadcrumb` |
| [`<ds-breadcrumb-item>`](./breadcrumb.md) | `href`, `icon`. Child of `ds-breadcrumb` | One level; without `href` it is the current page |
| [`<ds-pagination>`](./pagination.md) | `page` (`int`, `1`), `page-count` (`int`, `1`), `href-template`, `siblings` (`int`, `1`), `boundaries` (`int`, `1`), `size`, `label`. Flags: `edges`, `simple`, `outline` | `nav.ds-pagination`; nothing when `page-count` is 1 or less |
| [`<ds-theme-switcher />`](./theme-switcher.md) | `variant` (`segmented`; also `labels`, `toggle`), `size`, `label` | `div.ds-segmented.ds-theme-switcher`; `button.ds-theme-toggle` for `toggle` |
| [`<ds-language-switcher />`](./language-switcher.md) | `languages` (`en,id`), `current`, `href-template`, `action`, `return-url`, `variant` (`segmented`; also `code`, `menu`), `label`. Flag: `remember` | `nav.ds-language-switcher`; `form` with `action`; `details` for `menu` |

```cshtml
<ds-tabs label="Project sections">
    <ds-tab id="overview" label="Overview" icon="home">Overview panel.</ds-tab>
    <ds-tab id="files" label="Files" count="12">Files panel.</ds-tab>
</ds-tabs>
<ds-breadcrumb>
    <ds-breadcrumb-item href="/" icon="home">Home</ds-breadcrumb-item>
    <ds-breadcrumb-item href="/projects">Projects</ds-breadcrumb-item>
    <ds-breadcrumb-item>PRJ-1024</ds-breadcrumb-item>
</ds-breadcrumb>
<ds-pagination page="3" page-count="12" />
<ds-language-switcher languages="en,id" current="@lang" href-template="/{0}/pricing" />
```

### Layout

| Element | Attributes | Renders |
| --- | --- | --- |
| [`<ds-container>`](./container.md) | `size` (`sm`, `md`, `lg`, `xl`, `prose`, `full`). Flag: `flush` | `div.ds-container` |
| [`<ds-page-header>`](./page-header.md) | `title`, `description`, `heading-level` (`int`, `1`). Flags: `sticky`, `compact` | `header.ds-page-header` |
| [`<ds-page-header-breadcrumb>`](./page-header.md) | none. Child of `ds-page-header` | Moves its content to the breadcrumb slot |
| [`<ds-page-header-meta>`](./page-header.md) | none. Child of `ds-page-header` | Moves its content to the meta slot |
| [`<ds-page-header-actions>`](./page-header.md) | none. Child of `ds-page-header` | Moves its content to the actions slot; the primary action goes last |
| [`<ds-page-header-tabs>`](./page-header.md) | none. Child of `ds-page-header` | Moves its content to the tabs slot |
| [`<ds-toolbar>`](./toolbar.md) | `label`. Flags: `overflow`, `vertical`, `flat` | `div.ds-toolbar[role=toolbar]` |
| [`<ds-toolbar-group>`](./toolbar.md) | `label`. Child of `ds-toolbar` | `div.ds-toolbar__group[role=group]` |
| [`<ds-toolbar-separator />`](./toolbar.md) | none | `div.ds-toolbar__separator` |
| [`<ds-toolbar-spacer />`](./toolbar.md) | none | `div.ds-toolbar__spacer` |
| [`<ds-resizable>`](./resizable.md) | `orientation` (`horizontal`; also `vertical`), `persist`, `height`, `step` (`int?`). Flag: `bare` | `div.ds-resizable` |
| [`<ds-resizable-panel>`](./resizable.md) | `size` (`double?`), `min` (`double?`), `max` (`double?`). Flag: `collapsible`. Child of `ds-resizable` | `div.ds-resizable__panel`; sizes are percentages |
| [`<ds-resizable-handle />`](./resizable.md) | `label`. Child of `ds-resizable` | `div.ds-resizable__handle[role=separator]` |
| [`<ds-separator>`](./separator.md) | `label`, `align` (`start` or `end`, with a label). Flags: `vertical`, `decorative`, `inset`, `strong`, `dashed`, `flush` | `hr.ds-separator`; `div` with a label, `vertical` or `decorative` |
| [`<ds-accordion>`](./accordion.md) | `name`. Flags: `single`, `card`, `separated` | `div.ds-accordion` |
| [`<ds-accordion-item>`](./accordion.md) | `title` (required), `hint`, `meta`, `icon`. Flags: `open`, `disabled`. Child of `ds-accordion` | `details.ds-accordion__item` |
| [`<ds-collapsible>`](./collapsible.md) | `title` (required). Flag: `open` | `details.ds-collapsible` |

```cshtml
<ds-container size="lg">
    <ds-page-header title="Invoices" description="Sent, paid and overdue." sticky>
        <ds-page-header-actions>
            <ds-button variant="primary" icon="plus" href="/Invoices/Create">New invoice</ds-button>
        </ds-page-header-actions>
    </ds-page-header>
    <ds-accordion single>
        <ds-accordion-item title="Billing" open>Billing details.</ds-accordion-item>
        <ds-accordion-item title="Shipping">Shipping details.</ds-accordion-item>
    </ds-accordion>
</ds-container>
```

### General

| Element | Attributes | Renders |
| --- | --- | --- |
| [`<ds-icon />`](./icons.md) | `name` (required), `size` (`xs` to `xl`), `label` | Inline `svg.ds-icon`, `aria-hidden` unless `label` is set; other attributes, including `class`, go to the `<svg>`. An unknown `name` throws `ArgumentException` |

```cshtml
<ds-icon name="briefcase" size="lg" />
<ds-icon name="alert" label="Warning" />
```

## Partial views

Render `_DsHead` inside `<head>`, `_DsIconSprite` right after `<body>`, and `_DsScripts`, `_DsToast`, `_DsConfirmDialog` and `_DsLeaveDialog` once per layout. Put `_DsSortHeader`, `_DsPager` and `_DsPageSize` where the table header, the pager and the filter form are.

| Partial | Model | Renders |
| --- | --- | --- |
| `_DsHead` | `HeadOptions?` | `color-scheme` and `theme-color` meta, font preload, the theme script before first paint, the stylesheet |
| `_DsScripts` | none | `ds.js` as a module (auto-init) |
| `_DsIconSprite` | none | SVG sprite of all icons for `<use href="#ds-icon-…">` |
| `_DsToast` | none | `div.ds-toast-region` and the toast queued in `TempData` |
| `_DsConfirmDialog` | none | `dialog#ds-confirm` for `data-ds-confirm` and `DS.confirm()` |
| `_DsLeaveDialog` | none | `dialog#ds-leave` for `form[data-ds-guard]` |
| `_DsPager` | `PagerModel` | `footer.ds-pager`: range text and Previous, Page n of N, Next |
| `_DsSortHeader` | `SortHeaderModel` | `<th>` with a sort link (`a.ds-sort`) and `aria-sort` |
| `_DsPageSize` | `int` | `label.ds-page-size` with a rows per page select (10, 20, 50, 100), submits on change |
| `_DsSidebarNav` | `NavModel` | `nav.ds-sidebar-nav`, two-level sidebar navigation |

The model records are described below: `HeadOptions` under Head, `PagerModel` and `SortHeaderModel` under Lists and paging, and `NavModel` with `NavGroup` and `NavItem` under Navigation.

```cshtml
<partial name="_DsHead" model='new HeadOptions(Stylesheet: "~/css/app.css", Storage: "app")' />
<partial name="_DsSortHeader" model='new SortHeaderModel("Budget", "budget", Model.Rows.Sort, Numeric: true)' />
<partial name="_DsPager" model='Model.Rows.Pager("projects")' />
<partial name="_DsSidebarNav" model="Model.Nav" />
```

## Icons: `Icon`

| Member | Description |
| --- | --- |
| `IHtmlContent Svg(string name, string css = "ds-icon", string? label = null)` | One icon; an unknown name throws `ArgumentException` |
| `IHtmlContent Sprite()` | The whole set as `<symbol id="ds-icon-…">` |
| `IEnumerable<string> Names` | All icon names |
| `bool Exists(string name)` | Name check |

## Tone: `Tone`

`enum Tone { Neutral, Primary, Info, Success, Warning, Error }` with extensions:

| Method | Example |
| --- | --- |
| `Css()` | `Tone.Success.Css()` returns `is-success` |
| `ToastName()` | `Tone.Primary.ToastName()` returns `info` |
| `IconName()` | `Tone.Error.IconName()` returns `x-circle` |

Map domain statuses to tones in one `switch` in your application:

```csharp
public static (string Label, Tone Tone) Status(InvoiceStatus s) => s switch
{
    InvoiceStatus.Draft => ("Draft", Tone.Neutral),
    InvoiceStatus.Sent => ("Awaiting payment", Tone.Warning),
    InvoiceStatus.Paid => ("Paid", Tone.Success),
    InvoiceStatus.Overdue => ("Overdue", Tone.Error),
    _ => ("Unknown", Tone.Neutral),
};
```

## Toast: `ToastMessage`, `ToastExtensions`

| Member | Description |
| --- | --- |
| `record ToastMessage(Tone Tone, string Title, string? Text = null)` | Toast content |
| `controller.Toast(Tone, title, text?)` | From an MVC controller |
| `pageModel.Toast(Tone, title, text?)` | From a Razor Page |
| `tempData.SetToast(message)`, `TakeToast()` | Direct access; key `ds.toast` |

```csharp
[HttpPost, ValidateAntiForgeryToken]
public async Task<IActionResult> Save(ProjectForm form)
{
    if (!ModelState.IsValid) return View("Form", form);
    await _projects.SaveAsync(form);
    this.Toast(Tone.Success, "Project saved", $"{form.Code} is ready.");
    return RedirectToAction(nameof(Index));
}
```

## Lists and paging

| Type | Members |
| --- | --- |
| `record ListSort(string Key, bool Descending, bool Chosen)` | `Direction`; `static Parse(sort, direction, allowed, defaultKey, defaultDescending = false)` rejects keys outside the allowlist |
| `static class PageSizes` | `All` is 10, 20, 50, 100; `Normalize(int? size, int fallback = 10)` |
| `record ListPage<T>(Rows, Query, Page, PageSize, Total, Sort)` | `PageCount`, `From`, `To`, `Pager(string? noun = null)` |
| `record PagerModel(Page, PageCount, Total, From, To, Noun = null)` | Model of `_DsPager` |
| `record SortHeaderModel(Label, Key, Current, Numeric = false, Class = null)` | `Active`, `NextDirection`, `AriaSort` |
| `static class QueryUrl` | `With(request, ("page", "2"), ("sort", null))` keeps other query keys; a null value removes the key |

```csharp
static readonly string[] Sortable = ["code", "name", "budget"];

public async Task OnGetAsync(string? q, string? sort, string? direction, int page = 1, int? size = null)
{
    var order = ListSort.Parse(sort, direction, Sortable, defaultKey: "code");
    var pageSize = PageSizes.Normalize(size);
    var (rows, total) = await _projects.SearchAsync(q, order, page, pageSize);
    Rows = new ListPage<ProjectRow>(rows, q, page, pageSize, total, order);
}
```

## Navigation: `NavModel`

| Type | Description |
| --- | --- |
| `record NavItem(Label, Href, Icon, Active = false, Badge = null, BadgeTone = null, Disabled = false)` | Sidebar link; `Badge` is a short count or word, `BadgeTone` is `primary` or `error`, `Disabled` renders `aria-disabled` without a link target |
| `record NavGroup(Key, Label, Items, DefaultOpen = true)` | Group; `HasActive` forces it open; `Key` stores the open state |
| `record NavModel(Top, Groups, Bottom = null, Label = null)` | Model of `_DsSidebarNav`: ungrouped items, groups, then trailing items; `Label` defaults to the localized "Main navigation" |
| `NavActive.Matches(HttpContext, href, exact = false)` | True when the path equals or sits below `href` |

## Avatar: `Avatar`

| Member | Example |
| --- | --- |
| `Avatar.Initials(text)` | `"Ayu Lestari"` gives `AL`; `"ACME1"` gives `AC`; empty gives `?` |
| `Avatar.ColorClass(text)` | `c0` to `c7`, character-code sum modulo 8, stable per name |

```cshtml
<span class="ds-avatar @Avatar.ColorClass(user.Name)">@Avatar.Initials(user.Name)</span>
```

## Formatting: `Fmt`, `Wib`

Human numbers and dates follow `CultureInfo.CurrentCulture`; machine numbers are culture-invariant. Blanks are an en dash.

| Method | Result |
| --- | --- |
| `Fmt.Number(20.0400m)` | `20.04` (dot decimal, no grouping, at most 4 decimals), for files and URLs |
| `Fmt.Decimal(1574782.5m)` | en `1,574,782.5`, id `1.574.782,5` |
| `Fmt.Qty(1574782m, "kg")` | `1574782 kg`; `null` gives `–` |
| `Fmt.Diff(-746m)` | `-746`; zero gives `0`, never `-0` |
| `Fmt.Percent(-0.00075m)` | `-0.075%` |
| `Fmt.TryParseNumber("20.040", out v)` | `true`, `20.04`; `"1,574,782"` gives `false` |
| `Fmt.Date(new DateOnly(2026, 1, 25))` | `25 Jan 2026` (id months: Jan Feb Mar Apr Mei Jun Jul Agu Sep Okt Nov Des) |
| `Fmt.DateTime(dt)` | en `01 Nov 2026 14:30`, id `01 Nov 2026 14.30` |
| `Fmt.DateTimeSeconds(dt)` | with seconds |
| `Fmt.InZone(utc, zone, "WIB")` | A UTC instant in a time zone with a label: `01 Nov 2026 21:30 WIB` |
| `Fmt.Range(1, 20, 57, "projects")` | en `1–20 of 57 projects`, id `1–20 dari 57 projects` (the noun is yours) |
| `Fmt.Text(null)` | `–` |
| `Wib.Format(utc)` | `01 Nov 2026 21:30 WIB` (UTC+7, no daylight saving); also `Wib.Now`, `Today`, `FromUtc`, `ToUtc` |

## Head: `HeadOptions`

`record HeadOptions(string? Stylesheet = null, string Light = "light", string Dark = "dark", string Storage = "ds", bool PreloadFont = true)`

- `Stylesheet` empty uses `~/_content/Citia.DesignSystem/css/ds.css`.
- `Storage` is the prefix of the `localStorage` keys; it must match `DS.configure({ storage })` when set from JavaScript.
- Pass `Light: "tps", Dark: "tps-dark"` only if your own stylesheet defines the version 1 names; the aliases make this unnecessary otherwise.

## Strings: `DsText`

UI strings of partials, tag helpers and formatters. The language follows `CultureInfo.CurrentUICulture` (use ASP.NET Core request localization); English is the fallback.

| Member | Description |
| --- | --- |
| `DsText.T(string key, params object?[] args)` | Translated string; `{0}` placeholders use the current culture; missing keys fall back to English, then to the key |
| `DsText.Add(string language, IEnumerable<KeyValuePair<string,string>> entries)` | Adds or replaces strings, or adds a whole language |
| `DsText.Language` | Two-letter language of the request, or `en` |

```csharp
// Program.cs
DsText.Add("id", new Dictionary<string, string> { ["pager.next"] = "Lanjut" });
DsText.Add("ms", new Dictionary<string, string> { ["pager.next"] = "Seterusnya" });

builder.Services.Configure<RequestLocalizationOptions>(o =>
{
    o.SetDefaultCulture("en");
    o.AddSupportedCultures("en", "id").AddSupportedUICultures("en", "id");
});
app.UseRequestLocalization();
```
