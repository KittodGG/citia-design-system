---
title: Coverage
group: reference
order: 3
summary: Matrix mapping every shadcn/ui, Material 3, Tailwind UI application and daisyUI 5 component to its Citia DS page, or to native, pattern or not planned.
---

Which component of the four reference libraries maps to which DS page. "Native" means the HTML element is enough and [Native elements](./native-elements.md) styles it; "pattern" means a composition documented under Patterns; "not planned" has a reason.

## How to read this page

Every row names the library component and the DS page that covers it. A component can map to a page that holds several variants (for example `sheet` covers drawer, bottom sheet and side sheet).

## shadcn/ui

| Component | DS slug | Note |
| --- | --- | --- |
| Accordion | [accordion](./accordion.md) |  |
| Alert | [alert](./alert.md) |  |
| Alert Dialog | [alert-dialog](./alert-dialog.md) |  |
| Aspect Ratio | [aspect-ratio](./aspect-ratio.md) |  |
| Avatar | [avatar](./avatar.md) |  |
| Badge | [badge](./badge.md) |  |
| Breadcrumb | [breadcrumb](./breadcrumb.md) |  |
| Button | [button](./button.md) |  |
| Button Group | [button-group](./button-group.md) |  |
| Calendar | [calendar](./calendar.md) |  |
| Card | [card](./card.md) |  |
| Carousel | [carousel](./carousel.md) |  |
| Chart | [chart](./chart.md) |  |
| Checkbox | [checkbox](./checkbox.md) |  |
| Collapsible | [collapsible](./collapsible.md) |  |
| Combobox | [combobox](./combobox.md) |  |
| Command | [command](./command.md) |  |
| Context Menu | [context-menu](./context-menu.md) |  |
| Data Table | [data-table](./data-table.md) |  |
| Date Picker | [date-picker](./date-picker.md) |  |
| Dialog | [dialog](./dialog.md) |  |
| Drawer | [sheet](./sheet.md) | Bottom and side panels are variants of the sheet |
| Dropdown Menu | [dropdown-menu](./dropdown-menu.md) |  |
| Empty | [empty-state](./empty-state.md) |  |
| Field | [field](./field.md) |  |
| Form | [form](./form.md) |  |
| Hover Card | [hover-card](./hover-card.md) |  |
| Input | [input](./input.md) |  |
| Input Group | [input-group](./input-group.md) |  |
| Input OTP | [otp-input](./otp-input.md) |  |
| Item | [list](./list.md) | List items with media, title and actions |
| Kbd | [kbd](./kbd.md) |  |
| Label | [field](./field.md) | Label is part of the field |
| Menubar | [menubar](./menubar.md) |  |
| Native Select | [select](./select.md) |  |
| Navigation Menu | [navigation-menu](./navigation-menu.md) |  |
| Pagination | [pagination](./pagination.md) |  |
| Popover | [popover](./popover.md) |  |
| Progress | [progress](./progress.md) |  |
| Radio Group | [radio-group](./radio-group.md) |  |
| Resizable | [resizable](./resizable.md) |  |
| Scroll Area | [scroll-area](./scroll-area.md) |  |
| Select | [select](./select.md) | Native select, or combobox for search |
| Separator | [separator](./separator.md) |  |
| Sheet | [sheet](./sheet.md) |  |
| Sidebar | [sidebar](./sidebar.md) |  |
| Skeleton | [skeleton](./skeleton.md) |  |
| Slider | [slider](./slider.md) |  |
| Sonner | [toast](./toast.md) | Toast covers it |
| Spinner | [spinner](./spinner.md) |  |
| Switch | [switch](./switch.md) |  |
| Table | [table](./table.md) |  |
| Tabs | [tabs](./tabs.md) |  |
| Textarea | [textarea](./textarea.md) |  |
| Toast | [toast](./toast.md) |  |
| Toggle | [toggle](./toggle.md) |  |
| Toggle Group | [toggle-group](./toggle-group.md) |  |
| Tooltip | [tooltip](./tooltip.md) |  |
| Typography | [typography](./typography.md) | Foundation page and `.ds-prose` ([Prose](./prose.md)) |

## Material 3

| Component | DS slug | Note |
| --- | --- | --- |
| Badges | [badge](./badge.md) |  |
| Bottom app bar | [bottom-navigation](./bottom-navigation.md) | Bottom navigation and toolbar |
| Bottom sheets | [sheet](./sheet.md) |  |
| Buttons: common, tonal, outlined, text | [button](./button.md) |  |
| Extended FAB, FAB | [fab](./fab.md) |  |
| Icon buttons | [icon-button](./icon-button.md) |  |
| Segmented buttons | [segmented-control](./segmented-control.md) |  |
| Split button | [split-button](./split-button.md) |  |
| Button groups | [button-group](./button-group.md) |  |
| Cards | [card](./card.md) |  |
| Carousel | [carousel](./carousel.md) |  |
| Checkbox | [checkbox](./checkbox.md) |  |
| Chips: assist, filter, input, suggestion | [chip](./chip.md) |  |
| Date pickers | [date-picker](./date-picker.md) | Range in `date-range-picker` |
| Dialogs | [dialog](./dialog.md) |  |
| Divider | [separator](./separator.md) |  |
| Lists | [list](./list.md) |  |
| Menus | [dropdown-menu](./dropdown-menu.md) |  |
| Navigation bar | [bottom-navigation](./bottom-navigation.md) |  |
| Navigation drawer | [sidebar](./sidebar.md) |  |
| Navigation rail | [sidebar](./sidebar.md) | Collapsed rail mode of the sidebar |
| Progress indicators | [progress](./progress.md) | Circular in `spinner` |
| Radio button | [radio-group](./radio-group.md) |  |
| Search | [search-input](./search-input.md) | Command palette in `command` |
| Side sheets | [sheet](./sheet.md) |  |
| Sliders | [slider](./slider.md) |  |
| Snackbar | [toast](./toast.md) |  |
| Switch | [switch](./switch.md) |  |
| Tabs | [tabs](./tabs.md) |  |
| Text fields | [input](./input.md) |  |
| Time pickers | [time-picker](./time-picker.md) |  |
| Tooltips | [tooltip](./tooltip.md) |  |
| Top app bar | [navbar](./navbar.md) | `navbar` and `page-header` |
| Toolbars | [toolbar](./toolbar.md) |  |
| Loading indicator | [spinner](./spinner.md) |  |

## Tailwind UI application UI

| Component | DS slug | Note |
| --- | --- | --- |
| Application shells: stacked, sidebar, multi-column | [app-shell](./app-shell.md) |  |
| Headings: page, card, section | [page-header](./page-header.md) | Card and section headings in `card` |
| Data display: calendars | [calendar](./calendar.md) |  |
| Data display: description lists | [description-list](./description-list.md) |  |
| Data display: stats | [stat](./stat.md) |  |
| Lists: stacked lists | [list](./list.md) |  |
| Lists: tables | [table](./table.md) | Interactive in `data-table` |
| Lists: grid lists | [stack-grid](./stack-grid.md) |  |
| Lists: feeds | [timeline](./timeline.md) | Activity feed `.ds-feed` |
| Forms: form layouts | [form](./form.md) |  |
| Forms: input groups | [input-group](./input-group.md) |  |
| Forms: select menus | [select](./select.md) |  |
| Forms: sign-in and registration | [auth-layout](./auth-layout.md) | See [Page patterns](./page-patterns.md) |
| Forms: textareas | [textarea](./textarea.md) |  |
| Forms: radio groups | [radio-group](./radio-group.md) |  |
| Forms: checkboxes | [checkbox](./checkbox.md) |  |
| Forms: toggles | [switch](./switch.md) |  |
| Forms: action panels | [card](./card.md) | Card with an action |
| Forms: comboboxes | [combobox](./combobox.md) |  |
| Feedback: alerts | [alert](./alert.md) |  |
| Feedback: empty states | [empty-state](./empty-state.md) |  |
| Navigation: navbars | [navbar](./navbar.md) |  |
| Navigation: pagination | [pagination](./pagination.md) |  |
| Navigation: tabs | [tabs](./tabs.md) |  |
| Navigation: vertical navigation | [sidebar](./sidebar.md) |  |
| Navigation: sidebar navigation | [sidebar](./sidebar.md) |  |
| Navigation: breadcrumbs | [breadcrumb](./breadcrumb.md) |  |
| Navigation: progress bars | [stepper](./stepper.md) | Step progress; value bars in `progress` |
| Navigation: command palettes | [command](./command.md) |  |
| Overlays: modal dialogs | [dialog](./dialog.md) |  |
| Overlays: drawers | [sheet](./sheet.md) |  |
| Overlays: notifications | [toast](./toast.md) | Persistent in `notification-center` |
| Elements: avatars | [avatar](./avatar.md) |  |
| Elements: badges | [badge](./badge.md) |  |
| Elements: dropdowns | [dropdown-menu](./dropdown-menu.md) |  |
| Elements: buttons | [button](./button.md) |  |
| Elements: button groups | [button-group](./button-group.md) |  |
| Layout: containers | [container](./container.md) |  |
| Layout: cards | [card](./card.md) |  |
| Layout: list containers | [list](./list.md) |  |
| Layout: media objects | [list](./list.md) | List item with media |
| Layout: dividers | [separator](./separator.md) |  |
| Page examples: home, detail and settings screens | pattern | [Page patterns](./page-patterns.md) |

## daisyUI 5

| Component | DS slug | Note |
| --- | --- | --- |
| Accordion | [accordion](./accordion.md) |  |
| Alert | [alert](./alert.md) |  |
| Avatar | [avatar](./avatar.md) |  |
| Badge | [badge](./badge.md) |  |
| Breadcrumbs | [breadcrumb](./breadcrumb.md) |  |
| Button | [button](./button.md) |  |
| Calendar | [calendar](./calendar.md) |  |
| Card | [card](./card.md) |  |
| Carousel | [carousel](./carousel.md) |  |
| Chat bubble | not planned | Chat is a product feature; the feed and card cover message lists |
| Checkbox | [checkbox](./checkbox.md) |  |
| Collapse | [collapsible](./collapsible.md) |  |
| Countdown | not planned | A live ticking number is decoration; use text with `<time>` |
| Diff | not planned | A visual compare slider is a niche media widget |
| Dock | [bottom-navigation](./bottom-navigation.md) |  |
| Divider | [separator](./separator.md) |  |
| Drawer | [sheet](./sheet.md) | Navigation drawer is `sidebar` |
| Dropdown | [dropdown-menu](./dropdown-menu.md) |  |
| Fab | [fab](./fab.md) |  |
| Fieldset | [fieldset](./fieldset.md) |  |
| File input | [file-upload](./file-upload.md) |  |
| Filter | [toggle-group](./toggle-group.md) | Filter chips in `chip` |
| Footer | [footer](./footer.md) |  |
| Hero | not planned | Marketing section; the auth hero is in `auth-layout` |
| Hover 3D, Hover gallery | not planned | Decorative motion; against the restraint rule |
| Indicator | [indicator](./indicator.md) |  |
| Input | [input](./input.md) |  |
| Join | [button-group](./button-group.md) | Joined inputs in `input-group` |
| Kbd | [kbd](./kbd.md) |  |
| Label | [field](./field.md) |  |
| Link | [link](./link.md) |  |
| List | [list](./list.md) |  |
| Loading | [spinner](./spinner.md) |  |
| Mask | not planned | Use CSS `clip-path` or `border-radius` in the application |
| Menu | [dropdown-menu](./dropdown-menu.md) | Sidebar menu in `sidebar` |
| Mockup (browser, code, phone, window) | [code-block](./code-block.md) | Only code; device mockups are marketing |
| Modal | [dialog](./dialog.md) |  |
| Navbar | [navbar](./navbar.md) |  |
| Pagination | [pagination](./pagination.md) |  |
| Progress | [progress](./progress.md) |  |
| Radial progress | [progress](./progress.md) | Circular variant |
| Radio | [radio-group](./radio-group.md) |  |
| Range | [slider](./slider.md) |  |
| Rating | [rating](./rating.md) |  |
| Select | [select](./select.md) |  |
| Skeleton | [skeleton](./skeleton.md) |  |
| Stack | [stack-grid](./stack-grid.md) |  |
| Stat | [stat](./stat.md) |  |
| Status | [status](./status.md) |  |
| Steps | [stepper](./stepper.md) |  |
| Swap | [toggle](./toggle.md) | Icon swap on a toggle |
| Tabs | [tabs](./tabs.md) |  |
| Table | [table](./table.md) |  |
| Textarea | [textarea](./textarea.md) |  |
| Text rotate | not planned | Cycling text is decoration |
| Timeline | [timeline](./timeline.md) |  |
| Toast | [toast](./toast.md) |  |
| Toggle | [switch](./switch.md) |  |
| Tooltip | [tooltip](./tooltip.md) |  |
| Validator | [validation](./validation.md) |  |
| Theme controller | [theme-switcher](./theme-switcher.md) |  |

## Native and pattern coverage

These needs are met without a dedicated component:

- Headings, paragraphs, lists, links and code: [Native elements](./native-elements.md) and [Prose](./prose.md).
- Native `<dialog>`, `<details>`, `<progress>`, `<meter>` and `<input type="range|date|color">` are styled in place; the DS adds enhancements only where native behaviour is not enough.
- Multi-step forms, approvals, jobs, undo: [Workflows](./workflows.md). Search, filter, sort, bulk actions: [Data pattern](./data-pattern.md).
- Page compositions: [Page patterns](./page-patterns.md).

## Not planned

Items marked "not planned" are decorative, marketing-only or product-specific. They conflict with the calm, restrained rules in [Principles](./principles.md) or belong to the application, not to a design system.
