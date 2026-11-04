---
title: Cakupan
group: reference
order: 3
summary: Matriks yang memetakan komponen shadcn/ui, Material 3, Tailwind UI application, dan daisyUI 5 ke halaman Citia DS, atau ke native, pattern, not planned.
---

Komponen mana dari empat pustaka acuan yang dipetakan ke halaman DS mana. "Native" berarti elemen HTML sudah cukup dan [Native elements](./native-elements.md) menatanya; "pattern" berarti komposisi yang didokumentasikan di Pola; "not planned" disertai alasan.

## Cara membaca halaman ini

Setiap baris menyebut komponen pustaka dan halaman DS yang mencakupnya. Satu komponen bisa dipetakan ke halaman yang memuat beberapa varian (misalnya `sheet` mencakup drawer, bottom sheet, dan side sheet).

## shadcn/ui

| Komponen | Slug DS | Catatan |
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
| Drawer | [sheet](./sheet.md) | Panel bawah dan samping adalah varian sheet |
| Dropdown Menu | [dropdown-menu](./dropdown-menu.md) |  |
| Empty | [empty-state](./empty-state.md) |  |
| Field | [field](./field.md) |  |
| Form | [form](./form.md) |  |
| Hover Card | [hover-card](./hover-card.md) |  |
| Input | [input](./input.md) |  |
| Input Group | [input-group](./input-group.md) |  |
| Input OTP | [otp-input](./otp-input.md) |  |
| Item | [list](./list.md) | Item daftar dengan media, judul, dan aksi |
| Kbd | [kbd](./kbd.md) |  |
| Label | [field](./field.md) | Label adalah bagian dari field |
| Menubar | [menubar](./menubar.md) |  |
| Native Select | [select](./select.md) |  |
| Navigation Menu | [navigation-menu](./navigation-menu.md) |  |
| Pagination | [pagination](./pagination.md) |  |
| Popover | [popover](./popover.md) |  |
| Progress | [progress](./progress.md) |  |
| Radio Group | [radio-group](./radio-group.md) |  |
| Resizable | [resizable](./resizable.md) |  |
| Scroll Area | [scroll-area](./scroll-area.md) |  |
| Select | [select](./select.md) | Select bawaan, atau combobox untuk pencarian |
| Separator | [separator](./separator.md) |  |
| Sheet | [sheet](./sheet.md) |  |
| Sidebar | [sidebar](./sidebar.md) |  |
| Skeleton | [skeleton](./skeleton.md) |  |
| Slider | [slider](./slider.md) |  |
| Sonner | [toast](./toast.md) | Toast mencakupnya |
| Spinner | [spinner](./spinner.md) |  |
| Switch | [switch](./switch.md) |  |
| Table | [table](./table.md) |  |
| Tabs | [tabs](./tabs.md) |  |
| Textarea | [textarea](./textarea.md) |  |
| Toast | [toast](./toast.md) |  |
| Toggle | [toggle](./toggle.md) |  |
| Toggle Group | [toggle-group](./toggle-group.md) |  |
| Tooltip | [tooltip](./tooltip.md) |  |
| Typography | [typography](./typography.md) | Halaman fondasi dan `.ds-prose` ([Prose](./prose.md)) |

## Material 3

| Komponen | Slug DS | Catatan |
| --- | --- | --- |
| Badges | [badge](./badge.md) |  |
| Bottom app bar | [bottom-navigation](./bottom-navigation.md) | Navigasi bawah dan toolbar |
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
| Date pickers | [date-picker](./date-picker.md) | Rentang di `date-range-picker` |
| Dialogs | [dialog](./dialog.md) |  |
| Divider | [separator](./separator.md) |  |
| Lists | [list](./list.md) |  |
| Menus | [dropdown-menu](./dropdown-menu.md) |  |
| Navigation bar | [bottom-navigation](./bottom-navigation.md) |  |
| Navigation drawer | [sidebar](./sidebar.md) |  |
| Navigation rail | [sidebar](./sidebar.md) | Mode rail ringkas pada sidebar |
| Progress indicators | [progress](./progress.md) | Lingkaran di `spinner` |
| Radio button | [radio-group](./radio-group.md) |  |
| Search | [search-input](./search-input.md) | Palet perintah di `command` |
| Side sheets | [sheet](./sheet.md) |  |
| Sliders | [slider](./slider.md) |  |
| Snackbar | [toast](./toast.md) |  |
| Switch | [switch](./switch.md) |  |
| Tabs | [tabs](./tabs.md) |  |
| Text fields | [input](./input.md) |  |
| Time pickers | [time-picker](./time-picker.md) |  |
| Tooltips | [tooltip](./tooltip.md) |  |
| Top app bar | [navbar](./navbar.md) | `navbar` dan `page-header` |
| Toolbars | [toolbar](./toolbar.md) |  |
| Loading indicator | [spinner](./spinner.md) |  |

## Tailwind UI application UI

| Komponen | Slug DS | Catatan |
| --- | --- | --- |
| Application shells: stacked, sidebar, multi-column | [app-shell](./app-shell.md) |  |
| Headings: page, card, section | [page-header](./page-header.md) | Judul kartu dan bagian di `card` |
| Data display: calendars | [calendar](./calendar.md) |  |
| Data display: description lists | [description-list](./description-list.md) |  |
| Data display: stats | [stat](./stat.md) |  |
| Lists: stacked lists | [list](./list.md) |  |
| Lists: tables | [table](./table.md) | Interaktif di `data-table` |
| Lists: grid lists | [stack-grid](./stack-grid.md) |  |
| Lists: feeds | [timeline](./timeline.md) | Feed aktivitas `.ds-feed` |
| Forms: form layouts | [form](./form.md) |  |
| Forms: input groups | [input-group](./input-group.md) |  |
| Forms: select menus | [select](./select.md) |  |
| Forms: sign-in and registration | [auth-layout](./auth-layout.md) | Lihat [Pola halaman](./page-patterns.md) |
| Forms: textareas | [textarea](./textarea.md) |  |
| Forms: radio groups | [radio-group](./radio-group.md) |  |
| Forms: checkboxes | [checkbox](./checkbox.md) |  |
| Forms: toggles | [switch](./switch.md) |  |
| Forms: action panels | [card](./card.md) | Kartu dengan aksi |
| Forms: comboboxes | [combobox](./combobox.md) |  |
| Feedback: alerts | [alert](./alert.md) |  |
| Feedback: empty states | [empty-state](./empty-state.md) |  |
| Navigation: navbars | [navbar](./navbar.md) |  |
| Navigation: pagination | [pagination](./pagination.md) |  |
| Navigation: tabs | [tabs](./tabs.md) |  |
| Navigation: vertical navigation | [sidebar](./sidebar.md) |  |
| Navigation: sidebar navigation | [sidebar](./sidebar.md) |  |
| Navigation: breadcrumbs | [breadcrumb](./breadcrumb.md) |  |
| Navigation: progress bars | [stepper](./stepper.md) | Progres langkah; bar nilai di `progress` |
| Navigation: command palettes | [command](./command.md) |  |
| Overlays: modal dialogs | [dialog](./dialog.md) |  |
| Overlays: drawers | [sheet](./sheet.md) |  |
| Overlays: notifications | [toast](./toast.md) | Yang menetap di `notification-center` |
| Elements: avatars | [avatar](./avatar.md) |  |
| Elements: badges | [badge](./badge.md) |  |
| Elements: dropdowns | [dropdown-menu](./dropdown-menu.md) |  |
| Elements: buttons | [button](./button.md) |  |
| Elements: button groups | [button-group](./button-group.md) |  |
| Layout: containers | [container](./container.md) |  |
| Layout: cards | [card](./card.md) |  |
| Layout: list containers | [list](./list.md) |  |
| Layout: media objects | [list](./list.md) | Item daftar dengan media |
| Layout: dividers | [separator](./separator.md) |  |
| Page examples: home, detail and settings screens | pattern | [Pola halaman](./page-patterns.md) |

## daisyUI 5

| Komponen | Slug DS | Catatan |
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
| Chat bubble | not planned | Obrolan adalah fitur produk; feed dan kartu sudah mencakup daftar pesan |
| Checkbox | [checkbox](./checkbox.md) |  |
| Collapse | [collapsible](./collapsible.md) |  |
| Countdown | not planned | Angka berdetak adalah dekorasi; pakai teks dengan `<time>` |
| Diff | not planned | Slider perbandingan visual adalah widget media khusus |
| Dock | [bottom-navigation](./bottom-navigation.md) |  |
| Divider | [separator](./separator.md) |  |
| Drawer | [sheet](./sheet.md) | Drawer navigasi adalah `sidebar` |
| Dropdown | [dropdown-menu](./dropdown-menu.md) |  |
| Fab | [fab](./fab.md) |  |
| Fieldset | [fieldset](./fieldset.md) |  |
| File input | [file-upload](./file-upload.md) |  |
| Filter | [toggle-group](./toggle-group.md) | Chip filter di `chip` |
| Footer | [footer](./footer.md) |  |
| Hero | not planned | Bagian pemasaran; hero login ada di `auth-layout` |
| Hover 3D, Hover gallery | not planned | Gerak dekoratif; melanggar aturan kesederhanaan |
| Indicator | [indicator](./indicator.md) |  |
| Input | [input](./input.md) |  |
| Join | [button-group](./button-group.md) | Input tergabung di `input-group` |
| Kbd | [kbd](./kbd.md) |  |
| Label | [field](./field.md) |  |
| Link | [link](./link.md) |  |
| List | [list](./list.md) |  |
| Loading | [spinner](./spinner.md) |  |
| Mask | not planned | Pakai CSS `clip-path` atau `border-radius` di aplikasi |
| Menu | [dropdown-menu](./dropdown-menu.md) | Menu sidebar di `sidebar` |
| Mockup (browser, code, phone, window) | [code-block](./code-block.md) | Hanya kode; mockup perangkat adalah pemasaran |
| Modal | [dialog](./dialog.md) |  |
| Navbar | [navbar](./navbar.md) |  |
| Pagination | [pagination](./pagination.md) |  |
| Progress | [progress](./progress.md) |  |
| Radial progress | [progress](./progress.md) | Varian melingkar |
| Radio | [radio-group](./radio-group.md) |  |
| Range | [slider](./slider.md) |  |
| Rating | [rating](./rating.md) |  |
| Select | [select](./select.md) |  |
| Skeleton | [skeleton](./skeleton.md) |  |
| Stack | [stack-grid](./stack-grid.md) |  |
| Stat | [stat](./stat.md) |  |
| Status | [status](./status.md) |  |
| Steps | [stepper](./stepper.md) |  |
| Swap | [toggle](./toggle.md) | Pertukaran ikon pada toggle |
| Tabs | [tabs](./tabs.md) |  |
| Table | [table](./table.md) |  |
| Textarea | [textarea](./textarea.md) |  |
| Text rotate | not planned | Teks bergilir adalah dekorasi |
| Timeline | [timeline](./timeline.md) |  |
| Toast | [toast](./toast.md) |  |
| Toggle | [switch](./switch.md) |  |
| Tooltip | [tooltip](./tooltip.md) |  |
| Validator | [validation](./validation.md) |  |
| Theme controller | [theme-switcher](./theme-switcher.md) |  |

## Cakupan native dan pola

Kebutuhan ini terpenuhi tanpa komponen khusus:

- Judul, paragraf, daftar, tautan, dan kode: [Native elements](./native-elements.md) dan [Prose](./prose.md).
- `<dialog>`, `<details>`, `<progress>`, `<meter>`, dan `<input type="range|date|color">` bawaan ditata di tempat; DS menambah peningkatan hanya bila perilaku bawaan tidak cukup.
- Form multi-langkah, persetujuan, pekerjaan, batalkan: [Alur kerja](./workflows.md). Cari, filter, urut, aksi massal: [Pola data](./data-pattern.md).
- Komposisi halaman: [Pola halaman](./page-patterns.md).

## Not planned

Item bertanda "not planned" bersifat dekoratif, khusus pemasaran, atau khusus produk. Item itu bertentangan dengan aturan tenang dan sederhana di [Prinsip](./principles.md) atau menjadi urusan aplikasi, bukan sistem desain.
