---
title: API Razor dan C#
group: reference
order: 2
summary: Semua tag helper beserta atributnya, partial view, dan helper C#: Icon, Tone, Fmt, Wib, paging, NavModel, HeadOptions, toast, DsText.
---

Hasil render nyata API ini ada di halaman [Contoh Razor](./razor-demo.md). Namespace: `Citia.DesignSystem.Icons`, `Citia.DesignSystem.Ui`, `Citia.DesignSystem.Formatting`, `Citia.DesignSystem.Localization`, dan `Citia.DesignSystem.TagHelpers`. Daftarkan sekali di `_ViewImports.cshtml` aplikasi (lihat [Instalasi](./installation.md)):

```cshtml
@using Citia.DesignSystem.Icons
@using Citia.DesignSystem.Ui
@using Citia.DesignSystem.Formatting
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Citia.DesignSystem
```

## Tag helper

Ada 99 tag helper. Nama elemen berbentuk `ds-<komponen>`, atribut memakai kebab-case, dan teks selalu di-encode. Setiap elemen dicantumkan satu kali, dikelompokkan seperti halaman komponen; kolom pertama menaut ke halaman komponennya.

Cara membaca kolom atribut:

- Atribut bertipe `string` kecuali tipenya ditulis dalam tanda kurung, misalnya (`int`, `3`) atau (`Tone`, `Info`). Nilai bawaan tanpa tipe adalah nilai bawaan `string`, misalnya (`secondary`).
- `Flag:` memuat atribut `bool` yang mati secara bawaan. Tulis namanya saja untuk menyalakan (`dismissible`). Atribut yang nilai bawaannya menyala, seperti `show-toggle`, ditulis dengan tipenya, dan Anda menulis `name="false"` untuk mematikannya.
- Atribut `Tone` menerima enum `Tone` (`Neutral`, `Primary`, `Info`, `Success`, `Warning`, `Error`). Atribut `tone` pada `ds-button`, `ds-icon-button`, dan `ds-link` bertipe string.
- `(wajib)` menandai atribut yang dibutuhkan output. Tag helper tidak memvalidasinya; hanya `name` pada `ds-icon` yang melempar galat bila ikonnya tidak dikenal.
- `asp-for` menerima model expression (`ModelExpression`) dan menyediakan name, id, value, dan status validasi.
- Atribut yang tidak tercantum (`data-*`, `aria-*`, `id`, `class`, `style`) tetap berada pada elemen output. Pengecualian dicatat di bawah tabel.
- "Anak dari" berarti elemen hanya valid di dalam induk itu. `ds-tabs` dan `ds-breadcrumb` juga hanya menerima itemnya sendiri sebagai anak.

### Aksi

| Elemen | Atribut | Hasil |
| --- | --- | --- |
| [`<ds-button>`](./button.md) | `variant` (`secondary`), `tone`, `size` (`md`), `icon`, `icon-end`, `loading-label`, `disabled-reason`, `href`, `type` (`button`), `pressed` (`bool?`). Flag: `icon-only`, `loading`, `full-width`, `selected`, `disabled`, `external` | `button.btn`; `a.btn` bila `href` diisi |
| [`<ds-icon-button />`](./icon-button.md) | `icon`, `label` (wajib), `variant` (`standard`), `tone`, `size` (`md`), `badge`, `disabled-reason`, `href`, `type` (`button`), `pressed` (`bool?`). Flag: `round`, `badge-dot`, `loading`, `disabled` | `button.ds-icon-button`; `a` bila `href` diisi |
| [`<ds-toggle>`](./toggle.md) | `icon`, `label`, `variant` (`ghost`), `size` (`md`), `disabled-reason`. Flag: `pressed`, `disabled`, `loading` | `button.ds-toggle` dengan `aria-pressed` |
| [`<ds-toggle-group>`](./toggle-group.md) | `type` (`single`), `label` (wajib), `name`, `value`, `size` (`md`), `variant` (`outlined`). Flag: `spaced`, `vertical`, `deselectable` | `div.ds-toggle-group` |
| [`<ds-toggle-item>`](./toggle-group.md) | `value`, `icon`, `label`, `disabled-reason`. Flag: `selected`, `disabled`. Anak dari `ds-toggle-group` | `button.ds-toggle` di dalam grup |
| [`<ds-fab>`](./fab.md) | `icon` (`plus`), `label`, `size` (`md`), `variant` (`primary`), `disabled-reason`, `href`. Flag: `floating`, `start`, `hide-on-scroll`, `loading`, `disabled` | `button.ds-fab`; `a` bila `href` diisi |
| [`<ds-link>`](./link.md) | `href`, `tone`. Flag: `standalone`, `external`, `current`, `disabled`, `prose` | `a.ds-link` |

```cshtml
<ds-button variant="primary" icon="send" loading-label="Mengirim…" type="submit">Kirim faktur</ds-button>
<ds-icon-button icon="trash" label="Hapus faktur INV-2026-0418" variant="tonal" />
<ds-toggle-group type="single" label="Tampilan" name="view" value="list">
    <ds-toggle-item value="list" icon="list">Daftar</ds-toggle-item>
    <ds-toggle-item value="grid" icon="layout-grid">Kisi</ds-toggle-item>
</ds-toggle-group>
```

### Form

| Elemen | Atribut | Hasil |
| --- | --- | --- |
| [`<ds-field>`](./field.md) | `asp-for`, `asp-items` (`IEnumerable<SelectListItem>`), `name`, `id`, `value`, `label`, `hint`, `help`, `placeholder`, `type` (`text`), `icon`, `prefix`, `suffix`, `unit`, `size`, `success-text`, `error`, `marker` (`optional`), `autocomplete`, `inputmode`, `shortcut`, `maxlength` (`int?`), `rows` (`int`, `3`), `min`, `max`, `step` (`double?`), `recent` (`int?`), `show-toggle` (`bool`, `true`), `caps-warning` (`bool`, `true`), `stepper` (`bool`, `true`). Flag: `clearable`, `loading`, `success`, `counter`, `horizontal`, `wide`, `readonly`, `disabled`, `required`, `autogrow`, `strength`, `trailing`, `locale` | `div.ds-field` berisi label, kontrol, hint, help, counter, dan galat |
| [`<ds-fieldset>`](./fieldset.md) | `legend`, `help`, `error`, `id`. Flag: `disabled`, `boxed` | `fieldset.ds-fieldset` |
| [`<ds-checkbox>`](./checkbox.md) | `asp-for`, `name`, `id`, `label`, `description`, `value` (`true`), `checked` (`bool?`), `size`. Flag: `indeterminate`, `card`, `end`, `disabled`, `required` | `label.ds-check-row` (`.ds-choice` dengan `card`) di sekitar `input.checkbox` |
| [`<ds-checkbox-group />`](./checkbox.md) | Sama dengan `ds-radio-group` | `fieldset.ds-checkbox-group` |
| [`<ds-switch>`](./switch.md) | Semua atribut `ds-checkbox`, ditambah `label-position`, `action`, `method`. Flag: `icons` | `label.ds-check-row` di sekitar `input.toggle[role=switch]`; `action` dan `method` mengirim perubahan |
| [`<ds-radio-group />`](./radio-group.md) | `asp-for`, `name`, `id`, `label`, `description`, `asp-items` (`IEnumerable<SelectListItem>`), `items` (`IEnumerable<ChoiceItem>`), `value`, `columns` (`int`, `0`), `size`. Flag: `horizontal`, `card`, `disabled`, `required` | `fieldset.ds-radio-group` |
| [`<ds-slider />`](./slider.md) | `asp-for`, `asp-for-end`, `name`, `name-end`, `id`, `min` (`decimal`, `0`), `max` (`decimal`, `100`), `step` (`decimal`, `1`), `value` (`decimal?`), `value-end` (`decimal?`), `label`, `format`, `marks`, `output` (`bool`, `true`), `bubble` (`bool`, `true`), `size`. Flag: `vertical`, `disabled`, `required` | `div.ds-slider`; `asp-for-end` atau `name-end` menjadikannya range |
| [`<ds-rating />`](./rating.md) | `asp-for`, `name`, `id`, `label`, `max` (`int`, `5`), `value` (`int?`), `size`. Flag: `clearable`, `show-value`, `disabled`, `required` | `fieldset.ds-rating` |
| [`<ds-rating-display />`](./rating.md) | `value` (`double`), `max` (`int`, `5`), `count` (`int?`), `show-value` (`bool`, `true`), `size` | `span.ds-rating-summary`, hanya baca, nilai pecahan |
| [`<ds-otp />`](./otp-input.md) | `asp-for`, `name`, `id`, `length` (`int`, `6`), `label`, `hint`, `group` (`int`, `0`), `size`, `value`. Flag: `alphanumeric`, `autosubmit`, `disabled`, `required` | `div.ds-otp` |
| [`<ds-tags-input />`](./tags-input.md) | `asp-for`, `name`, `id`, `max` (`int`, `0`), `max-length` (`int`, `0`), `pattern`, `placeholder`, `separator` (`,`), `value`, `size`. Flag: `disabled`, `required` | `input.input[data-ds-tags]`; ds.js membangun chip |
| [`<ds-date-picker />`](./date-picker.md) | `asp-for`, `name`, `id`, `value`, `min`, `max`, `disabled-dates`, `time-zone`, `size`, `placeholder`. Flag: `disable-weekends`, `required`, `disabled`, `readonly` | `div.ds-date-picker` di sekitar `input[type=date]` |
| [`<ds-date-range-picker />`](./date-range-picker.md) | `start-for`, `end-for`, `start-name`, `end-name`, `start-value`, `end-value`, `legend`, `hint`, `min`, `max`, `presets`, `time-zone`. Flag: `autosubmit`, `required`, `disabled` | `fieldset.ds-fieldset.ds-date-range` dengan dua input tanggal |
| [`<ds-time-picker />`](./time-picker.md) | `asp-for`, `name`, `id`, `value`, `min`, `max`, `step` (`int?`, detik), `hour-cycle`, `size`. Flag: `seconds`, `required`, `disabled`, `readonly` | `div.ds-time-picker` di sekitar `input[type=time]` |
| [`<ds-color-picker />`](./color-picker.md) | `asp-for`, `name`, `id`, `value`, `swatches`, `contrast-against`. Flag: `no-eyedropper`, `disabled` | `div.ds-color-picker` di sekitar `input[type=color]` |
| [`<ds-file-upload />`](./file-upload.md) | `asp-for`, `name`, `id`, `accept`, `max-size`, `max-files` (`int?`), `upload-url`, `upload-field`, `upload-param`, `title`, `hint`, `icon` (`cloud-upload`). Flag: `multiple`, `paste-page`, `compact`, `required`, `disabled` | `div.ds-file-upload` dengan `label.ds-dropzone` |
| [`<ds-avatar-upload />`](./file-upload.md) | `asp-for`, `name`, `id`, `src`, `initials`, `title`, `hint`, `accept` (`image/jpeg,image/png,image/webp`), `max-size` (`2 MB`), `remove-name`. Flag: `large`, `disabled` | `div.ds-avatar-upload` |
| [`<ds-error-summary />`](./validation.md) | `title`. Flag: `exclude-model-errors` | `div.ds-error-summary`, tersembunyi selama model valid |
| [`<ds-form-section>`](./form.md) | `title` (wajib), `description`, `level` (`int`, `2`, heading 2 sampai 4). Flag: `card`, `stacked`, `grid` | `section.ds-form-section` |
| [`<ds-form-bar>`](./form.md) | `dirty-text`. Flag: `dirty-only`, `floating` | `div.ds-form-bar`; isi elemen menjadi area aksi |

Aturan penerusan atribut. `ds-field` meneruskan atribut yang tidak tercantum (`pattern`, `data-*`) ke kontrol dan `class` ke pembungkus; isi elemen menggantikan kontrol yang dibuat otomatis. Tag helper pilihan memindahkan `data-*` dan `aria-*` ke input. Tag helper tanggal, waktu, warna, dan unggah meneruskan atribut lain ke input dan membiarkan `class` pada pembungkus. `ds-checkbox` dan `ds-switch` memakai isi elemen sebagai label bila `label` kosong. Tanpa `asp-for`, isi `name` (dan `value`).

```cshtml
<ds-field asp-for="Name" label="Nama proyek" hint="Tampil di daftar dan faktur." />
<ds-field asp-for="Budget" type="number" label="Anggaran" prefix="Rp" step="0.01" />
<ds-field asp-for="Owner" type="select" asp-items="Model.Owners" label="Penanggung jawab" />
<ds-checkbox asp-for="AcceptTerms" label="Saya menyetujui ketentuan" />
<ds-radio-group asp-for="Plan" asp-items="Model.Plans" label="Paket" card columns="2" />
<ds-slider asp-for="Volume" label="Volume" min="0" max="100" step="5" format="{value}%" />
<ds-date-range-picker start-for="From" end-for="To" legend="Periode tagihan" presets="last7,last30,thisMonth" />
```

### Tampilan data

| Elemen | Atribut | Hasil |
| --- | --- | --- |
| [`<ds-avatar />`](./avatar.md) | `name`, `src`, `icon`, `size`, `shape` (`square`), `presence`, `label` | `span.ds-avatar` dengan class warna yang stabil |
| [`<ds-avatar-group />`](./avatar.md) | `names` (`IEnumerable<string>`), `max` (`int`, `4`), `size`, `shape` (`circle`), `label` | `div.ds-avatar-group` dengan avatar "+N" |
| [`<ds-badge />`](./badge.md) | `count` (`int`, `0`), `max` (`int`, `99`), `tone` (`Tone`, `Primary`), `size`, `label`. Flag: `dot`, `show-zero`, `soft`, `outline`, `live` | `span.ds-badge`; tersembunyi pada 0 kecuali `show-zero` |
| [`<ds-status>`](./status.md) | `tone` (`Tone`, `Neutral`), `size`. Flag: `live`, `outline`, `no-dot` | `span.ds-status` |
| [`<ds-pill>`](./status.md) | `tone` (`Tone`, `Neutral`), `size`. Flag: `live`, `outline`, `plain` | `span.ds-pill` |
| [`<ds-tag>`](./tag.md) | `tone` (`Tone`, `Neutral`), `size`, `icon`. Flag: `outline`, `removable` | `span.ds-tag`; `removable` menambah tombol hapus, aplikasi yang menangani kliknya |
| [`<ds-chip>`](./chip.md) | `variant` (`ChipVariant`, `Filter`; juga `Input`, `Assist`, `Suggestion`), `icon`, `count` (`int?`), `href`, `size`, `remove-label`. Flag: `pressed`, `disabled`, `error` | `button.ds-chip`; `a` untuk `Assist` dan `Suggestion` dengan `href`; `span` untuk `Input` |
| [`<ds-chip-set>`](./chip.md) | `label`, `mode` (`multiple`; `single` membuat chip yang ditekan saling eksklusif), `max` (`int?`). Flag: `nowrap` | `div.ds-chips[role=group]` |
| [`<ds-card>`](./card.md) | `title`, `eyebrow`, `description`, `href`, `image`, `image-alt` (kosong), `input-type` (`checkbox`), `name`, `value`, `level` (`int`, `3`). Flag: `horizontal`, `selectable`, `checked`, `disabled`, `loading`, `danger` | `article.ds-card`; `label.ds-card` bila `selectable` |
| [`<ds-card-actions>`](./card.md) | tidak ada. Anak dari `ds-card` | `div.ds-card__actions` di header kartu |
| [`<ds-card-footer>`](./card.md) | tidak ada. Anak dari `ds-card` | `footer.ds-card__footer` |
| [`<ds-stat>`](./stat.md) | `label` (wajib), `value` (wajib), `unit`, `delta`, `trend` (`Trend`, `None`; juga `Up`, `Down`, `Flat`), `delta-tone` (`Tone?`), `delta-text`, `compare`, `sub`, `icon`, `href`, `tone` (`Tone`, `Primary`). Flag: `loading`, `bar` | `div.ds-stat`; `a` dengan `href`; isi elemen adalah slot sparkline |
| [`<ds-data-table-toolbar>`](./data-table.md) | `action`, `search-name` (`q`), `search-value`, `search-label`, `search-placeholder`, `density-value` (`comfortable`), `export-href`, `export-label`, `export-kind` (`Excel`), `reset-href`, `hidden-columns`, `keep` (`sort,direction,size`), `column-*` (`column-status="Status"` menghasilkan key `status`, label `Status`). Flag: `client`, `density` | `form.ds-table-toolbar` (GET); `div` dengan `client` |
| [`<ds-kbd>`](./kbd.md) | `keys`, `size`. Flag: `ghost` | `kbd.ds-kbd`; `span.ds-kbd-group` untuk kombinasi |
| [`<ds-code-block>`](./code-block.md) | `language`, `title`, `code`, `highlight`, `collapsible` (`double?`, rem), `pre-id`. Flag: `line-numbers`, `diff`, `wrap`, `wrap-toggle`, `no-copy` | `figure.ds-code` dengan `pre.ds-code-block` |
| [`<ds-image />`](./image.md) | `src`, `alt`, `width` (`int?`), `height` (`int?`), `srcset`, `sizes`, `ratio`, `radius`, `fit`, `caption`, `zoom-src`, `placeholder`, `blur`. Flag: `zoom`, `priority` | `figure.ds-figure` |
| [`<ds-aspect-ratio>`](./aspect-ratio.md) | `ratio` (`16/9`). Flag: `flat` | `div.ds-aspect` |
| [`<ds-carousel>`](./carousel.md) | `label`, `per-view` (`int`, `1`), `autoplay` (`int`, `0`, milidetik), `indicators` (`CarouselIndicators`, `Dots`; juga `Thumbs`, `Count`, `None`). Flag: `loop` | `section.ds-carousel` |
| [`<ds-slide>`](./carousel.md) | tidak ada. Anak dari `ds-carousel` | `div.ds-carousel__slide` |
| [`<ds-sparkline />`](./chart.md) | `values` (`IEnumerable<double>`), `label`, `tone` (`Tone`, `Primary`). Flag: `area`, `large` | `svg.ds-sparkline[role=img]` |

```cshtml
<ds-avatar name="Ayu Lestari" size="md" shape="circle" presence="online" />
<ds-status tone="Warning">Menunggu persetujuan</ds-status>
<ds-chip variant="Filter" pressed count="12">Terlambat</ds-chip>
<ds-stat label="Proyek berjalan" value="24" delta="+3" trend="Up" icon="briefcase" />
<ds-card title="Redesain situs web" eyebrow="PRJ-1024" href="/projects/1024">
    Diperbarui 2 Nov 2026.
    <ds-card-footer><ds-status tone="Success">Aktif</ds-status></ds-card-footer>
</ds-card>
<ds-sparkline values="@(new double[] { 12, 14, 13, 18, 21 })" label="Pesanan, 5 hari terakhir: dari 12 ke 21" />
```

### Umpan balik

| Elemen | Atribut | Hasil |
| --- | --- | --- |
| [`<ds-alert>`](./alert.md) | `tone` (`Tone`, `Info`), `title`, `icon`, `role`, `dismiss-label`. Flag: `dismissible`, `compact` | `div.ds-alert`; `role="alert"` untuk `Error`, selain itu `status` |
| [`<ds-alert-actions>`](./alert.md) | tidak ada. Anak dari `ds-alert` | Area aksi alert |
| [`<ds-banner>`](./banner.md) | `tone` (`Tone`, `Info`), `title`, `icon`, `status-label`, `key`, `remember` (`local`; juga `session`, `none`), `days` (`int?`), `dismiss-label`. Flag: `dismissible`, `sticky`, `bar`, `critical`, `system` | `div.ds-banner`; `key` menyimpan penutupan |
| [`<ds-banner-actions>`](./banner.md) | tidak ada. Anak dari `ds-banner` | Area aksi banner |
| [`ds-tooltip="…"`](./tooltip.md) (atribut pada elemen apa pun) | `ds-tooltip` (teks), `ds-tooltip-title`, `ds-tooltip-placement`, `ds-tooltip-kbd`, `ds-tooltip-delay` (`int?`, ms) | Menambahkan `data-ds-tooltip` dan atribut `data-ds-tooltip-*` terkait |
| [`<ds-tooltip>`](./tooltip.md) | `text` (wajib), `title`, `placement`, `kbd` | `span.ds-tooltip-wrap`, pembungkus yang dapat difokus untuk membawa tooltip kontrol yang disabled |
| [`<ds-empty>`](./empty-state.md) | `icon` (`info`), `title` (wajib), `action-label`, `action-href`, `action-icon` (`plus`), `variant` (`first-use`, `no-results`, `error`, `permission`, `compact`), `secondary-label`, `secondary-href`, `level` (`int`, `2`, dibatasi 2 sampai 4). Flag: `boxed` | `div.ds-empty`; isi elemen menjadi kalimat penjelas |
| [`<ds-progress />`](./progress.md) | `value` (`double?`; kosong berarti indeterminate), `max` (`double`, `100`), `buffer` (`double?`), `label`, `value-text`, `tone` (`Tone`, `Primary`), `size`, `steps` (`int`, `0`). Flag: `show-value`, `visible-label`, `circular` | `.ds-progress[role=progressbar]`, `.ds-progress-circle` dengan `circular`, `.ds-progress-steps` dengan `steps`; dibungkus `div.ds-meter` bila label atau nilai ditampilkan |
| [`<ds-skeleton />`](./skeleton.md) | `shape` (`Text`; juga `Heading`, `Avatar`, `Rect`, `Image`, `Button`, `Pill`), `lines` (`int`, `1`). Flag: `delayed` | `span.ds-skeleton`; `div.ds-skeleton-stack` bila `lines` lebih dari 1 |
| [`<ds-spinner />`](./spinner.md) | `label`, `size`, `tone` (`Tone`, `Neutral`). Flag: `block`, `quiet-label`, `delayed` | `span.ds-loading[role=status]` |
| [`<ds-stepper>`](./stepper.md) | `current` (`int`, `0`, mulai dari 1), `orientation` (`StepperOrientation`, `Vertical`; juga `Horizontal`), `label`. Flag: `centered` | `div.ds-stepper` |
| [`<ds-step>`](./stepper.md) | `title` (wajib), `description`, `href`, `state` (`StepState`, `Auto`; juga `Complete`, `Current`, `Upcoming`, `Error`). Flag: `optional`, `disabled`. Anak dari `ds-stepper` | Satu langkah; tautan bila `href` diisi |

```cshtml
<ds-alert tone="Warning" title="Penyimpanan hampir penuh" dismissible>
    Anda sudah memakai 92% dari 50 GB.
    <ds-alert-actions><a class="btn btn-sm" href="/billing">Tingkatkan</a></ds-alert-actions>
</ds-alert>
<button class="btn" ds-tooltip="Hapus" ds-tooltip-placement="bottom">Hapus</button>
<ds-progress value="62" label="Impor" show-value tone="Success" />
<ds-empty icon="receipt" title="Belum ada faktur" action-label="Buat faktur" action-href="/Invoices/Create" boxed>
    Faktur yang Anda buat tampil di sini.
</ds-empty>
```

### Overlay

| Elemen | Atribut | Hasil |
| --- | --- | --- |
| [`<ds-dialog>`](./dialog.md) | `id`, `title`, `description`, `size`, `icon`, `icon-tone`, `close-label`, `closable` (`bool?`). Flag: `dismissible`, `full-mobile`, `alert`, `open-on-load` | `dialog.modal`; `alert` menghasilkan `role="alertdialog"` (lihat [Alert dialog](./alert-dialog.md)) |
| [`<ds-dialog-footer>`](./dialog.md) | tidak ada. Anak dari `ds-dialog` | Aksi setelah isi, aksi utama paling akhir |
| [`<ds-sheet>`](./sheet.md) | `id`, `side` (`end`; juga `start`, `top`, `bottom`), `size`, `title`, `description`, `snap`, `close-label`, `handle` (`bool?`), `dismissible` (`bool`, `true`) | `dialog.ds-sheet.is-<side>` |
| [`<ds-sheet-footer>`](./sheet.md) | tidak ada. Anak dari `ds-sheet` | Aksi yang disematkan di bawah isi |
| [`<ds-popover>`](./popover.md) | `id`, `title`, `description`, `side` (`bottom`), `align` (`start`), `size`, `label`. Flag: `arrow`, `closable` | `div.ds-popover[popover]` |
| [`<ds-hover-card>`](./hover-card.md) | `id`, `side` (`bottom`), `align` (`center`). Flag: `arrow` | `div.ds-hover-card` |
| [`<ds-menu>`](./dropdown-menu.md) | `id`, `label`, `side`, `align`, `size` | `div.ds-menu[popover][role=menu]` |
| [`<ds-menu-item>`](./dropdown-menu.md) | `type` (`item`; juga `checkbox`, `radio`), `icon`, `shortcut`, `description`, `href`, `value`, `submenu`. Flag: `checked`, `disabled`, `danger` | `button.ds-menu__item`; `a` dengan `href` |
| [`<ds-menu-sub>`](./dropdown-menu.md) | tidak ada | `div.ds-menu__sub` di sekitar item submenu dan `ds-menu` bersarangnya |
| [`<ds-menu-group>`](./dropdown-menu.md) | `label` | `div.ds-menu__group[role=group]` |
| [`<ds-menu-label>`](./dropdown-menu.md) | tidak ada | `div.ds-menu__label`, tidak dapat difokus |
| [`<ds-menu-separator />`](./dropdown-menu.md) | tidak ada | `div.ds-menu__separator` |
| [`<ds-command>`](./command.md) | `id`, `placeholder`, `label`, `shortcut`, `source`, `min-length` (`int?`), `hints` (`bool?`). Flag: `palette` | `dialog.ds-command-dialog` dengan `palette`; selain itu `div.ds-command.is-inline` |
| [`<ds-command-group>`](./command.md) | `label` | `div.ds-command__group` |
| [`<ds-command-item>`](./command.md) | `icon`, `description`, `shortcut`, `href`, `value`, `keywords`. Flag: `disabled`, `danger` | `div.ds-command__item[role=option]`; `a` dengan `href` |

Overlay yang menerima `id` membuat id unik sendiri bila `id` kosong. Isi `id` bila pemicu harus menunjuk elemennya (`data-ds-dialog-open`, `popovertarget`, `data-ds-sheet-open`).

```cshtml
<button class="btn" data-ds-dialog-open="invite">Undang</button>
<ds-dialog id="invite" title="Undang anggota tim" size="md" dismissible>
    <ds-field name="email" type="email" label="Email" />
    <ds-dialog-footer>
        <button class="btn" data-ds-dialog-close>Batal</button>
        <button class="btn btn-primary">Kirim undangan</button>
    </ds-dialog-footer>
</ds-dialog>
<ds-menu id="row-menu" label="Aksi untuk INV-2026-0418" align="end">
    <ds-menu-item icon="pencil" shortcut="E">Ubah</ds-menu-item>
    <ds-menu-separator />
    <ds-menu-item icon="trash" danger>Hapus</ds-menu-item>
</ds-menu>
```

### Navigasi

| Elemen | Atribut | Hasil |
| --- | --- | --- |
| [`<ds-tabs>`](./tabs.md) | `label`, `variant` (`underline`; juga `pill`, `boxed`), `size` (`md`), `selected`. Flag: `vertical`, `manual`, `full`, `hash`. Hanya menerima `ds-tab` sebagai anak | `div.ds-tabs[data-ds-tabs]`; `nav` bila tab berupa tautan |
| [`<ds-tab>`](./tabs.md) | `id`, `label`, `icon`, `count`, `href`. Flag: `current`, `disabled`. Anak dari `ds-tabs` | Satu tab; isi elemen adalah panelnya, tab dengan `href` tidak punya panel |
| [`<ds-breadcrumb>`](./breadcrumb.md) | `label`, `separator` (`slash`; juga `chevron`), `collapse` (`bool`, `true`). Hanya menerima `ds-breadcrumb-item` sebagai anak | `nav.ds-breadcrumb` |
| [`<ds-breadcrumb-item>`](./breadcrumb.md) | `href`, `icon`. Anak dari `ds-breadcrumb` | Satu tingkat; tanpa `href` berarti halaman saat ini |
| [`<ds-pagination>`](./pagination.md) | `page` (`int`, `1`), `page-count` (`int`, `1`), `href-template`, `siblings` (`int`, `1`), `boundaries` (`int`, `1`), `size`, `label`. Flag: `edges`, `simple`, `outline` | `nav.ds-pagination`; tidak menampilkan apa pun bila `page-count` 1 atau kurang |
| [`<ds-theme-switcher />`](./theme-switcher.md) | `variant` (`segmented`; juga `labels`, `toggle`), `size`, `label` | `div.ds-segmented.ds-theme-switcher`; `button.ds-theme-toggle` untuk `toggle` |
| [`<ds-language-switcher />`](./language-switcher.md) | `languages` (`en,id`), `current`, `href-template`, `action`, `return-url`, `variant` (`segmented`; juga `code`, `menu`), `label`. Flag: `remember` | `nav.ds-language-switcher`; `form` dengan `action`; `details` untuk `menu` |

```cshtml
<ds-tabs label="Bagian proyek">
    <ds-tab id="overview" label="Ringkasan" icon="home">Panel ringkasan.</ds-tab>
    <ds-tab id="files" label="Berkas" count="12">Panel berkas.</ds-tab>
</ds-tabs>
<ds-breadcrumb>
    <ds-breadcrumb-item href="/" icon="home">Beranda</ds-breadcrumb-item>
    <ds-breadcrumb-item href="/projects">Proyek</ds-breadcrumb-item>
    <ds-breadcrumb-item>PRJ-1024</ds-breadcrumb-item>
</ds-breadcrumb>
<ds-pagination page="3" page-count="12" />
<ds-language-switcher languages="en,id" current="@lang" href-template="/{0}/pricing" />
```

### Tata letak

| Elemen | Atribut | Hasil |
| --- | --- | --- |
| [`<ds-container>`](./container.md) | `size` (`sm`, `md`, `lg`, `xl`, `prose`, `full`). Flag: `flush` | `div.ds-container` |
| [`<ds-page-header>`](./page-header.md) | `title`, `description`, `heading-level` (`int`, `1`). Flag: `sticky`, `compact` | `header.ds-page-header` |
| [`<ds-page-header-breadcrumb>`](./page-header.md) | tidak ada. Anak dari `ds-page-header` | Memindahkan isinya ke slot breadcrumb |
| [`<ds-page-header-meta>`](./page-header.md) | tidak ada. Anak dari `ds-page-header` | Memindahkan isinya ke slot meta |
| [`<ds-page-header-actions>`](./page-header.md) | tidak ada. Anak dari `ds-page-header` | Memindahkan isinya ke slot aksi; aksi utama paling akhir |
| [`<ds-page-header-tabs>`](./page-header.md) | tidak ada. Anak dari `ds-page-header` | Memindahkan isinya ke slot tab |
| [`<ds-toolbar>`](./toolbar.md) | `label`. Flag: `overflow`, `vertical`, `flat` | `div.ds-toolbar[role=toolbar]` |
| [`<ds-toolbar-group>`](./toolbar.md) | `label`. Anak dari `ds-toolbar` | `div.ds-toolbar__group[role=group]` |
| [`<ds-toolbar-separator />`](./toolbar.md) | tidak ada | `div.ds-toolbar__separator` |
| [`<ds-toolbar-spacer />`](./toolbar.md) | tidak ada | `div.ds-toolbar__spacer` |
| [`<ds-resizable>`](./resizable.md) | `orientation` (`horizontal`; juga `vertical`), `persist`, `height`, `step` (`int?`). Flag: `bare` | `div.ds-resizable` |
| [`<ds-resizable-panel>`](./resizable.md) | `size` (`double?`), `min` (`double?`), `max` (`double?`). Flag: `collapsible`. Anak dari `ds-resizable` | `div.ds-resizable__panel`; ukuran berupa persentase |
| [`<ds-resizable-handle />`](./resizable.md) | `label`. Anak dari `ds-resizable` | `div.ds-resizable__handle[role=separator]` |
| [`<ds-separator>`](./separator.md) | `label`, `align` (`start` atau `end`, dengan label). Flag: `vertical`, `decorative`, `inset`, `strong`, `dashed`, `flush` | `hr.ds-separator`; `div` bila ada label, `vertical`, atau `decorative` |
| [`<ds-accordion>`](./accordion.md) | `name`. Flag: `single`, `card`, `separated` | `div.ds-accordion` |
| [`<ds-accordion-item>`](./accordion.md) | `title` (wajib), `hint`, `meta`, `icon`. Flag: `open`, `disabled`. Anak dari `ds-accordion` | `details.ds-accordion__item` |
| [`<ds-collapsible>`](./collapsible.md) | `title` (wajib). Flag: `open` | `details.ds-collapsible` |

```cshtml
<ds-container size="lg">
    <ds-page-header title="Faktur" description="Terkirim, lunas, dan terlambat." sticky>
        <ds-page-header-actions>
            <ds-button variant="primary" icon="plus" href="/Invoices/Create">Faktur baru</ds-button>
        </ds-page-header-actions>
    </ds-page-header>
    <ds-accordion single>
        <ds-accordion-item title="Penagihan" open>Rincian penagihan.</ds-accordion-item>
        <ds-accordion-item title="Pengiriman">Rincian pengiriman.</ds-accordion-item>
    </ds-accordion>
</ds-container>
```

### Umum

| Elemen | Atribut | Hasil |
| --- | --- | --- |
| [`<ds-icon />`](./icons.md) | `name` (wajib), `size` (`xs` sampai `xl`), `label` | `svg.ds-icon` inline, `aria-hidden` kecuali `label` diisi; atribut lain, termasuk `class`, diteruskan ke `<svg>`. `name` yang tidak dikenal melempar `ArgumentException` |

```cshtml
<ds-icon name="briefcase" size="lg" />
<ds-icon name="alert" label="Peringatan" />
```

## Partial view

Render `_DsHead` di dalam `<head>`, `_DsIconSprite` tepat setelah `<body>`, serta `_DsScripts`, `_DsToast`, `_DsConfirmDialog`, dan `_DsLeaveDialog` satu kali per layout. Letakkan `_DsSortHeader`, `_DsPager`, dan `_DsPageSize` di tempat header tabel, pager, dan form filter berada.

| Partial | Model | Hasil |
| --- | --- | --- |
| `_DsHead` | `HeadOptions?` | Meta `color-scheme` dan `theme-color`, preload font, skrip tema sebelum paint pertama, stylesheet |
| `_DsScripts` | tidak ada | `ds.js` sebagai modul (auto-init) |
| `_DsIconSprite` | tidak ada | Sprite SVG semua ikon untuk `<use href="#ds-icon-…">` |
| `_DsToast` | tidak ada | `div.ds-toast-region` dan toast yang diantrekan di `TempData` |
| `_DsConfirmDialog` | tidak ada | `dialog#ds-confirm` untuk `data-ds-confirm` dan `DS.confirm()` |
| `_DsLeaveDialog` | tidak ada | `dialog#ds-leave` untuk `form[data-ds-guard]` |
| `_DsPager` | `PagerModel` | `footer.ds-pager`: teks rentang dan Sebelumnya, Halaman n / N, Berikutnya |
| `_DsSortHeader` | `SortHeaderModel` | `<th>` dengan tautan urut (`a.ds-sort`) dan `aria-sort` |
| `_DsPageSize` | `int` | `label.ds-page-size` dengan pilihan data per halaman (10, 20, 50, 100), dikirim saat berubah |
| `_DsSidebarNav` | `NavModel` | `nav.ds-sidebar-nav`, navigasi sidebar dua tingkat |

Record model dijelaskan di bawah: `HeadOptions` pada Kepala halaman, `PagerModel` dan `SortHeaderModel` pada Daftar dan paging, serta `NavModel` dengan `NavGroup` dan `NavItem` pada Navigasi.

```cshtml
<partial name="_DsHead" model='new HeadOptions(Stylesheet: "~/css/app.css", Storage: "app")' />
<partial name="_DsSortHeader" model='new SortHeaderModel("Anggaran", "budget", Model.Rows.Sort, Numeric: true)' />
<partial name="_DsPager" model='Model.Rows.Pager("proyek")' />
<partial name="_DsSidebarNav" model="Model.Nav" />
```

## Ikon: `Icon`

| Anggota | Keterangan |
| --- | --- |
| `IHtmlContent Svg(string name, string css = "ds-icon", string? label = null)` | Satu ikon; nama tak dikenal melempar `ArgumentException` |
| `IHtmlContent Sprite()` | Seluruh set sebagai `<symbol id="ds-icon-…">` |
| `IEnumerable<string> Names` | Semua nama ikon |
| `bool Exists(string name)` | Cek nama |

## Nada: `Tone`

`enum Tone { Neutral, Primary, Info, Success, Warning, Error }` dengan ekstensi:

| Metode | Contoh |
| --- | --- |
| `Css()` | `Tone.Success.Css()` menghasilkan `is-success` |
| `ToastName()` | `Tone.Primary.ToastName()` menghasilkan `info` |
| `IconName()` | `Tone.Error.IconName()` menghasilkan `x-circle` |

Petakan status domain ke nada dalam satu `switch` di aplikasi Anda:

```csharp
public static (string Label, Tone Tone) Status(InvoiceStatus s) => s switch
{
    InvoiceStatus.Draft => ("Draf", Tone.Neutral),
    InvoiceStatus.Sent => ("Menunggu pembayaran", Tone.Warning),
    InvoiceStatus.Paid => ("Lunas", Tone.Success),
    InvoiceStatus.Overdue => ("Lewat tempo", Tone.Error),
    _ => ("Tidak diketahui", Tone.Neutral),
};
```

## Toast: `ToastMessage`, `ToastExtensions`

| Anggota | Keterangan |
| --- | --- |
| `record ToastMessage(Tone Tone, string Title, string? Text = null)` | Isi toast |
| `controller.Toast(Tone, title, text?)` | Dari MVC controller |
| `pageModel.Toast(Tone, title, text?)` | Dari Razor Page |
| `tempData.SetToast(message)`, `TakeToast()` | Akses langsung; kunci `ds.toast` |

```csharp
[HttpPost, ValidateAntiForgeryToken]
public async Task<IActionResult> Save(ProjectForm form)
{
    if (!ModelState.IsValid) return View("Form", form);
    await _projects.SaveAsync(form);
    this.Toast(Tone.Success, "Proyek tersimpan", $"{form.Code} siap dipakai.");
    return RedirectToAction(nameof(Index));
}
```

## Daftar dan paging

| Tipe | Anggota |
| --- | --- |
| `record ListSort(string Key, bool Descending, bool Chosen)` | `Direction`; `static Parse(sort, direction, allowed, defaultKey, defaultDescending = false)` menolak kunci di luar daftar putih |
| `static class PageSizes` | `All` adalah 10, 20, 50, 100; `Normalize(int? size, int fallback = 10)` |
| `record ListPage<T>(Rows, Query, Page, PageSize, Total, Sort)` | `PageCount`, `From`, `To`, `Pager(string? noun = null)` |
| `record PagerModel(Page, PageCount, Total, From, To, Noun = null)` | Model `_DsPager` |
| `record SortHeaderModel(Label, Key, Current, Numeric = false, Class = null)` | `Active`, `NextDirection`, `AriaSort` |
| `static class QueryUrl` | `With(request, ("page", "2"), ("sort", null))` mempertahankan kunci query lain; nilai null menghapus kunci |

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

## Navigasi: `NavModel`

| Tipe | Keterangan |
| --- | --- |
| `record NavItem(Label, Href, Icon, Active = false, Badge = null, BadgeTone = null, Disabled = false)` | Tautan sidebar; `Badge` adalah angka atau kata pendek, `BadgeTone` adalah `primary` atau `error`, `Disabled` menghasilkan `aria-disabled` tanpa tujuan tautan |
| `record NavGroup(Key, Label, Items, DefaultOpen = true)` | Grup; `HasActive` memaksanya terbuka; `Key` menyimpan status buka |
| `record NavModel(Top, Groups, Bottom = null, Label = null)` | Model `_DsSidebarNav`: item tanpa grup, grup, lalu item penutup; `Label` bawaan adalah "Navigasi utama" yang dilokalkan |
| `NavActive.Matches(HttpContext, href, exact = false)` | True bila path sama dengan atau di bawah `href` |

## Avatar: `Avatar`

| Anggota | Contoh |
| --- | --- |
| `Avatar.Initials(text)` | `"Ayu Lestari"` menghasilkan `AL`; `"ACME1"` menghasilkan `AC`; kosong menghasilkan `?` |
| `Avatar.ColorClass(text)` | `c0` sampai `c7`, jumlah kode karakter modulo 8, stabil per nama |

```cshtml
<span class="ds-avatar @Avatar.ColorClass(user.Name)">@Avatar.Initials(user.Name)</span>
```

## Format: `Fmt`, `Wib`

Angka dan tanggal untuk manusia mengikuti `CultureInfo.CurrentCulture`; angka mesin tidak bergantung culture. Nilai kosong ditampilkan sebagai en dash.

| Metode | Hasil |
| --- | --- |
| `Fmt.Number(20.0400m)` | `20.04` (titik desimal, tanpa pemisah ribuan, maksimal 4 desimal), untuk berkas dan URL |
| `Fmt.Decimal(1574782.5m)` | en `1,574,782.5`, id `1.574.782,5` |
| `Fmt.Qty(1574782m, "kg")` | `1574782 kg`; `null` menghasilkan `–` |
| `Fmt.Diff(-746m)` | `-746`; nol menghasilkan `0`, tidak pernah `-0` |
| `Fmt.Percent(-0.00075m)` | `-0.075%` |
| `Fmt.TryParseNumber("20.040", out v)` | `true`, `20.04`; `"1,574,782"` menghasilkan `false` |
| `Fmt.Date(new DateOnly(2026, 1, 25))` | `25 Jan 2026` (bulan id: Jan Feb Mar Apr Mei Jun Jul Agu Sep Okt Nov Des) |
| `Fmt.DateTime(dt)` | en `01 Nov 2026 14:30`, id `01 Nov 2026 14.30` |
| `Fmt.DateTimeSeconds(dt)` | dengan detik |
| `Fmt.InZone(utc, zone, "WIB")` | Waktu UTC di suatu zona dengan label: `01 Nov 2026 21:30 WIB` |
| `Fmt.Range(1, 20, 57, "proyek")` | en `1–20 of 57 proyek`, id `1–20 dari 57 proyek` (kata bendanya dari Anda) |
| `Fmt.Text(null)` | `–` |
| `Wib.Format(utc)` | `01 Nov 2026 21:30 WIB` (UTC+7, tanpa DST); juga `Wib.Now`, `Today`, `FromUtc`, `ToUtc` |

## Kepala halaman: `HeadOptions`

`record HeadOptions(string? Stylesheet = null, string Light = "light", string Dark = "dark", string Storage = "ds", bool PreloadFont = true)`

- `Stylesheet` kosong memakai `~/_content/Citia.DesignSystem/css/ds.css`.
- `Storage` adalah awalan kunci `localStorage`; harus sama dengan `DS.configure({ storage })` bila diatur lewat JavaScript.
- Berikan `Light: "tps", Dark: "tps-dark"` hanya bila stylesheet Anda sendiri mendefinisikan nama versi 1; selebihnya alias membuatnya tidak perlu.

## String: `DsText`

String UI untuk partial, tag helper, dan formatter. Bahasa mengikuti `CultureInfo.CurrentUICulture` (pakai request localization ASP.NET Core); bahasa Inggris sebagai cadangan.

| Anggota | Keterangan |
| --- | --- |
| `DsText.T(string key, params object?[] args)` | String terjemahan; placeholder `{0}` memakai culture saat ini; key yang hilang kembali ke bahasa Inggris, lalu ke key |
| `DsText.Add(string language, IEnumerable<KeyValuePair<string,string>> entries)` | Menambah atau menimpa string, atau menambah bahasa utuh |
| `DsText.Language` | Bahasa dua huruf pada request, atau `en` |

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
