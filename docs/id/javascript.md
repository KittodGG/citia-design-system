---
title: JavaScript
group: reference
order: 1
summary: Referensi ds.js: pemuatan, modul, API DS, setiap atribut data-ds dan event ds:* per modul, i18n, dan pembaruan parsial dengan DS.init(root).
---

`ds.js` adalah satu modul ES tanpa dependensi. Setiap perilaku bersifat opt-in lewat atribut `data-ds-*` pada HTML yang dirender server, dan HTML tetap berfungsi (atau kembali ke perilaku bawaan browser) tanpanya. Ia berjalan sama di Razor, MVC, halaman htmx, dan aplikasi satu halaman.

## Pemuatan

Partial `_DsScripts` memuat `ds.js` sebagai modul dan menginisialisasi saat `DOMContentLoaded`.

```cshtml
<partial name="_DsHead" />      @* di <head>: tema sebelum paint pertama, stylesheet *@
<partial name="_DsScripts" />   @* sebelum </body> *@
```

Tanpa partial:

```html
<script type="module" src="/_content/Citia.DesignSystem/js/ds.js"></script>
```

Tambahkan `data-ds-manual` pada `<html>` untuk menghentikan start otomatis dan panggil `DS.init()` sendiri, misalnya setelah bootstrap Anda:

```html
<html data-ds-manual>
<script type="module">
  import DS from "/_content/Citia.DesignSystem/js/ds.js";
  DS.configure({ storage: "app", toastTimeout: 8000 });
  DS.init();
</script>
```

## Modul

Setiap modul mengekspor `wire()` (listener dokumen, sekali per halaman), `init(root)` (per elemen, idempoten), dan opsional `api`, objek yang digabungkan ke `window.DS`. Modul `shell` tidak punya `api`.

| Modul | Fungsi | Status |
| --- | --- | --- |
| `theme` | Mode terang, gelap, dan sistem, `theme-color` | ready |
| `shell` | Sidebar, drawer, grup navigasi, tautan kembali, overflow toolbar | ready |
| `toast` | Toast, penutupan alert dan banner, lonceng notifikasi | ready |
| `guard` | Guard perubahan belum disimpan | ready |
| `dialog` | Dialog dan konfirmasi | ready |
| `forms` | Kirim sekali, kirim otomatis, salin, kunci export, tombol password, keadaan sibuk | ready |
| `table` | Data table: filter, kepadatan, kolom, kolom tersemat, baris pohon, blok kode | ready |
| `combobox` | Combobox, multi-select, dan opsi tambah | ready |
| `inputs` | Angka, pencarian, kekuatan password, penghitung, auto-grow | ready |
| `choices` | Pilih semua, switch, slider, rating, OTP, tag | ready |
| `chips` | Chip, badge, dan avatar cadangan | ready |
| `carousel` | Carousel, keadaan gambar, dan zoom | ready |
| `tabs` | Tab, segmented control, navigasi bawah | ready |
| `navigation-menu` | Navbar, menu navigasi, popdown, ingat bahasa | ready |
| `resizable` | Panel yang bisa diubah ukurannya | ready |
| `toggle` | Tombol toggle dan grup, keadaan sibuk dan berhasil pada tombol, sembunyikan FAB, menu split button | ready |
| `accordion` | Accordion dan collapsible | ready |
| `datepicker` | Pemilih tanggal, rentang, waktu, dan warna, kalender | ready |
| `upload` | Unggah berkas dengan seret, tempel, dan progres | ready |
| `validation` | Validasi, ringkasan galat, keadaan kotor, mode lihat dan ubah | ready |
| `tooltip` | Tooltip | ready |
| `popover` | Popover dan hover card | ready |
| `menu` | Dropdown menu, menubar, dan submenu | ready |
| `context-menu` | Context menu | ready |
| `command` | Palet perintah | ready |
| `sheet` | Sheet dan drawer dengan drag dan titik snap | ready |
| `tree-view` | Tree view dengan pemuatan malas | ready |
| `selection` | Pilihan baris, bar massal, dan listbox | ready |

## API global

`window.DS` (dan default export `ds.js`) berisi anggota inti di bawah ini ditambah `api` setiap modul, yang dijelaskan di bagian setelah ini. `ds.js` juga mengekspor `configure`, `addMessages`, `t`, `locale`, `init`, `theme`, `toast`, `confirm`, `guard`, `addComboboxOption`, dan `copyText` dengan nama.

| Anggota | Keterangan |
| --- | --- |
| `DS.init(root = document)` | Memasang listener dokumen sekali, lalu setiap widget di dalam `root`. Aman dipanggil ulang setelah menyisipkan markup |
| `DS.configure(options)` | Menggabungkan `options` ke `DS.config`. Panggil sebelum `init()` |
| `DS.addMessages({ en: {…}, id: {…} })` | Mendaftarkan string UI per bahasa; panggilan berikutnya digabungkan dengan yang sebelumnya |
| `DS.t(key, vars)` | Menerjemahkan `key` dan mengganti `{placeholder}` dengan `vars`; mengembalikan key itu bila tidak ada bahasa yang memilikinya |
| `DS.locale()` | Bahasa aktif: `config.locale`, bila kosong `<html lang>`, dua huruf; `"en"` bila bahasa itu tidak punya string |
| `DS.config` | Objek konfigurasi yang berlaku, di bawah |

| Opsi | Bawaan | Efek |
| --- | --- | --- |
| `light` | `"light"` | Nama tema daisyUI untuk terang. Dimulai dari `data-ds-light` pada `<html>` |
| `dark` | `"dark"` | Nama tema daisyUI untuk gelap. Dimulai dari `data-ds-dark` pada `<html>` |
| `storage` | `"ds"` | Awalan kunci penyimpanan. Dimulai dari `data-ds-storage` pada `<html>` |
| `locale` | `null` | Penimpa bahasa; `null` mengikuti `<html lang>` |
| `toastTimeout` | `6000` | Milidetik sebelum toast menutup; toast lebih dari 80 karakter mendapat tambahan 2000 ms, maksimal 8000 ms |
| `exportLock` | `15000` | Milidetik tautan export tetap terkunci |

```js
const saved = DS.toast({ tone: "success", title: "Proyek tersimpan", text: "PRJ-1024 siap dipakai." });

if (await DS.confirm({ title: "Hapus PRJ-1024?", text: "Tindakan ini tidak bisa dibatalkan.", label: "Hapus proyek" })) {
  DS.guard.allow();
  form.submit();
}
```

## Event

Event adalah `CustomEvent` bernama `ds:<komponen>:<event>`. Event menggelembung dan membawa data di `event.detail`. Event yang ditandai cancelable menghentikan aksinya bila Anda memanggil `event.preventDefault()`. `ds:themechange` dikirim pada `document`; setiap event lain dikirim pada elemen yang disebut di tabelnya.

```js
document.addEventListener("ds:themechange", (e) => console.log(e.detail.theme));
```

## Tema dan kerangka

### Theme

Komponen: [Theme switcher](./theme-switcher.md). Lihat juga [Theming](./theming.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.theme.get()` | Nama tema aktif (`html[data-theme]`) |
| `DS.theme.getMode()` | Pilihan tersimpan: `"light"`, `"dark"`, atau `"system"` |
| `DS.theme.isDark()` | `true` bila tema aktif adalah tema gelap |
| `DS.theme.set(mode, { animate = true })` | Mengatur `"light"`, `"dark"`, atau `"system"`, menyimpannya, dan melakukan cross-fade kecuali gerak dikurangi |
| `DS.theme.toggle()` | Berganti antara terang dan gelap |

| Atribut | Efek |
| --- | --- |
| `data-ds-theme-toggle` | Tombol yang berganti antara terang dan gelap; label dan title-nya mengikuti tema |
| `data-ds-theme-set="light\|dark\|system"` | Tombol yang mengatur satu mode; yang aktif mendapat `aria-pressed` |
| `data-ds-theme-icon="light\|dark"` | Ikon anak dari toggle; hanya yang cocok dengan tema aktif yang ditampilkan |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:themechange` | `{ mode, theme }` | Setelah tema diterapkan, termasuk perubahan dari tab lain |

### Shell

Komponen: [App shell](./app-shell.md), [Sidebar](./sidebar.md), [Toolbar](./toolbar.md), [Page header](./page-header.md).

Tidak ada API.

| Atribut | Efek |
| --- | --- |
| `data-ds-sidebar-collapse` | Tombol yang melipat sidebar menjadi rail di desktop |
| `data-ds-sidebar-collapsed` | Pada `<html>`: keadaan rail, ditulis oleh skrip dan dipulihkan sebelum paint pertama |
| `data-ds-nav-toggle` | Tombol yang membuka dan menutup drawer sidebar di bawah 1024px |
| `data-ds-nav-close` | Kontrol yang menutup drawer |
| `data-ds-nav-group="key"` | Tombol dengan `aria-controls` yang membuka grup navigasi; keadaan buka diingat per key |
| `data-ds-nav-active="true"` | Pada tombol grup: grup memuat halaman saat ini dan tetap terbuka |
| `data-ds-nav-scroll` | Daftar navigasi yang posisi scroll-nya dipertahankan selama sesi |
| `data-ds-back="/fallback"` | Kontrol yang kembali bila halaman sebelumnya satu origin, bila tidak menuju URL cadangan (bawaan `/`) |
| `data-ds-toolbar-overflow` | Pada `.ds-toolbar[role="toolbar"]`: item yang tidak muat pindah ke menu "lainnya" |
| `data-ds-menu` | Pada menu `<details>`: menutup saat ditekan di luar atau Escape, dan hanya satu yang tetap terbuka |
| `data-ds-edge="top\|scrolled"` | Pada `.ds-topbar`: ditulis oleh skrip dari posisi scroll |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:sidebar:toggle` | `{ collapsed }` | Sidebar dilipat atau dibentangkan; dikirim pada `.ds-shell` |
| `ds:drawer:toggle` | `{ open }` | Drawer membuka atau menutup; dikirim pada `.ds-shell` |

## Aksi dan formulir

### Toggle dan tombol

Komponen: [Button](./button.md), [FAB](./fab.md), [Split button](./split-button.md), [Toggle](./toggle.md), [Toggle group](./toggle-group.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.button.loading(el, on = true, { label, delay = 300 })` | Keadaan sibuk. Input langsung diblokir; spinner dan `aria-busy` menyusul setelah `delay` ms, sehingga aksi cepat tidak berkedip. `label` menggantikan teks selama itu |
| `DS.button.success(el, { label, duration = 1800 })` | Mengakhiri keadaan sibuk dan menampilkan kilatan berhasil selama 1,6 sampai 2 detik |
| `DS.toggle.set(el, pressed)` | Mengatur tombol toggle; tanpa `pressed` ia membalik |
| `DS.toggle.group.get(group)` | Mengembalikan `{ value, values }` item terpilih; `value` adalah yang pertama atau `null` |
| `DS.toggle.group.set(group, value)` | Memilih item yang nilainya cocok, atau item dalam array untuk grup `multiple` |

| Atribut | Efek |
| --- | --- |
| `data-ds-toggle` | Pada tombol: membalik `aria-pressed` saat diklik |
| `data-ds-toggle-group="single\|multiple"` | Grup item `.ds-toggle` dengan roving focus |
| `data-ds-toggle-item` | Menandai item yang bukan `.ds-toggle` |
| `data-ds-name="field"` | Pada grup: input tersembunyi mengirim nilai terpilih dengan nama ini |
| `data-ds-deselectable` | Pada grup `single`: menekan item terpilih membatalkannya |
| `data-ds-roving="false"` | Mematikan roving focus; setiap item menjadi tab stop |
| `data-ds-fab-hide` | Pada `.ds-fab`: tersembunyi saat scroll ke bawah, muncul saat scroll ke atas |
| `data-ds-keep-open` | Pada item split button: menu tetap terbuka setelah aksi |

Nilai item berasal dari `data-value`, lalu `value`, lalu teks item.

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:toggle:change` | `{ pressed }` pada tombol; `{ value, values, item }` pada grup | Item toggle atau grup berubah. `DS.toggle.group.set` mengirim `{ value, values }` tanpa `item` |
| `ds:button:loading` | `{ loading }` | `DS.button.loading` mulai atau selesai |
| `ds:button:success` | tidak ada | `DS.button.success` berjalan |

### Forms

Komponen: [Form](./form.md), [Field](./field.md), [Password input](./password-input.md), [Select](./select.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.copyText(text, returnFocusTo)` | Menyalin ke papan klip dengan cadangan textarea; resolve `true` bila tersalin |
| `DS.setBusy(el, label)` | Keadaan sibuk: `aria-busy`, lebar tetap, penukaran label opsional, spinner setelah 300 ms |
| `DS.clearBusy(el)` | Mengembalikan kontrol ke keadaan diam: label, lebar, spinner |

| Atribut | Efek |
| --- | --- |
| `data-ds-export="Excel"` | Pada tautan: menguncinya selama `exportLock` ms saat berkas diunduh; nilainya menyebut format dalam pesan |
| `data-ds-copy="selector"` | Menyalin teks elemen yang cocok dengan selector |
| `data-ds-copy-text="text"` | Menyalin teks ini sebagai gantinya |
| `data-ds-copy-message` | Pesan toast berhasil setelah menyalin |
| `data-ds-password-toggle` | Tombol dengan `aria-controls` yang menampilkan atau menyembunyikan password |
| `data-ds-password-icon="hidden\|shown"` | Ikon di dalam toggle, ditampilkan untuk keadaan itu |
| `data-ds-autosubmit` | Pada `select`: mengirim formulirnya saat nilai berubah |
| `data-ds-once` | Pada formulir: mengirim sekali, lalu mengabaikan pengiriman berikutnya |
| `data-ds-loading-label` | Pada tombol kirim: teks yang tampil selama formulir dikirim |
| `data-ds-save-status` | Live region di dalam formulir `data-ds-once` yang melaporkan penyimpanan |

Tidak ada event. Penyalinan dilaporkan lewat toast dan kontrol sibuk lewat `aria-busy`.

### Inputs

Komponen: [Input](./input.md), [Search input](./search-input.md), [Number input](./number-input.md), [Password input](./password-input.md), [Textarea](./textarea.md), [Field](./field.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.inputs.refresh(root = document)` | Memasang ulang input di dalam `root` |
| `DS.inputs.clear(el)` | Mengosongkan input dari `.ds-input` dan memberinya fokus |
| `DS.inputs.step(el, direction = 1)` | Menaikkan (`1`) atau menurunkan (`-1`) input angka sebesar satu `step`; mengembalikan `true` bila nilai berubah |
| `DS.inputs.setNumber(el, value)` | Menulis angka, dibatasi dan dibulatkan menurut aturan input; mengembalikan nilai yang ditulis |
| `DS.inputs.passwordScore(value)` | Kekuatan password dari 0 sampai 4 |
| `DS.inputs.locale()` | Bahasa aktif, sama dengan `DS.locale()` |

| Atribut | Efek |
| --- | --- |
| `data-ds-min`, `data-ds-max` | Rentang input angka; `data-ds-max` juga menjadi batas lunak penghitung |
| `data-ds-step` | Langkah input angka; pada tombol stepper, tandanya menentukan arah |
| `data-ds-big-step` | Langkah Page Up dan Page Down (bawaan sepuluh langkah) |
| `data-ds-decimals` | Jumlah desimal yang ditampilkan (bawaan dari langkah dan nilai minimum) |
| `data-ds-fixed` | Selalu menampilkan jumlah desimal tetap |
| `data-ds-snap` | Nilai menempel ke langkah dihitung dari nilai minimum |
| `data-ds-nowheel` | Input angka bawaan kehilangan fokus saat roda mouse, sehingga halaman bergulir dan nilai tidak berubah |
| `data-ds-locale` | Pada `.ds-number`: memformat dan mem-parse dengan bahasa itu (kosong berarti bahasa halaman) |
| `data-ds-counter` | Penghitung karakter. Nilai berawalan `#` menyebut elemen penghitung; bila tidak, `.ds-counter` milik field dipakai |
| `data-ds-autogrow` | Textarea tumbuh mengikuti isinya |
| `data-ds-strength` | Input password yang menggerakkan meter `.ds-strength` pada field-nya |
| `data-ds-capslock` | Menampilkan peringatan Caps Lock pada field password |
| `data-ds-recent="5"` | Mengingat pencarian terbaru; nilainya adalah jumlah maksimum (bawaan 5) |
| `data-ds-recent-key` | Nama penyimpanan daftar terbaru (bawaan nama atau id field) |
| `data-ds-no-submit` | Input pencarian yang tidak mengirim formulirnya saat Enter |
| `data-ds-shortcut="mod+k"` | Pada input pencarian atau pembungkusnya: pintasan yang memberinya fokus |
| `data-ds-field-help` | Tombol yang membuka dan menutup teks bantuan field |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:input:clear` | `{ control }` | Tombol hapus ditekan; dikirim pada `.ds-input` |
| `ds:search:clear` | `{ control }` | Sama, pada `.ds-search` |
| `ds:search:submit` | `{ value }` | Enter pada input pencarian |
| `ds:number:change` | `{ value, text }` | Input angka berubah lewat ketikan, stepper, atau API |
| `ds:password:capslock` | `{ on }` | Caps Lock menyala atau mati saat field `data-ds-capslock` berfokus |

### Choices

Komponen: [Checkbox](./checkbox.md), [Switch](./switch.md), [Slider](./slider.md), [Rating](./rating.md), [OTP input](./otp-input.md), [Tags input](./tags-input.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.switchBusy(input, promise)` | Menandai switch sibuk selama `promise` berjalan. Resolve dengan hasilnya; bila ditolak, switch kembali ke keadaan sebelumnya dan promise ditolak |
| `DS.otp(element)` | Kontrol input OTP, atau `null`: `setState("error" \| "success" \| "busy" \| "")`, `clear()`, `focus()`, dan `value` |
| `DS.tagsInput(element)` | Kontrol input tag, atau `null`: `add(text)` (mengembalikan jumlah yang ditambahkan), `remove(tag)`, `clear()`, `get()` |

| Atribut | Efek |
| --- | --- |
| `data-ds-check-all="selector"` | Pada checkbox: memilih setiap checkbox yang cocok; tanpa nilai ia memakai id dari `aria-controls` |
| `data-ds-indeterminate` | Checkbox mulai dalam keadaan campuran; `="false"` mematikannya |
| `data-ds-switch-action="/url"` | Switch yang mengirim perubahannya ke URL dan dikembalikan bila gagal |
| `data-ds-switch-method` | Metode HTTP permintaan itu (bawaan `POST`) |
| `data-ds-slider-bubble="false"` | Menyembunyikan gelembung nilai slider |
| `data-ds-slider-format="{value} %"` | Templat format output slider |
| `data-ds-slider-page` | Langkah Page Up dan Page Down (bawaan 10% dari rentang) |
| `data-ds-rating-clearable` | Rating terpilih bisa dihapus |
| `data-ds-rating-value`, `data-ds-rating-max` | Pada `.ds-rating-display`: nilai dan jumlah bintang (bawaan 5) |
| `data-ds-otp` | Pada `.ds-otp`: membangun sel kode |
| `data-ds-otp-length` | Jumlah sel (bawaan `maxlength` input, bila tidak ada 6) |
| `data-ds-otp-type="alphanumeric"` | Menerima huruf dan angka; bila tidak, hanya angka |
| `data-ds-otp-group` | Ukuran kelompok visual, misalnya `3` |
| `data-ds-otp-autosubmit` | Mengirim formulir saat kode lengkap |
| `data-ds-tags` | Pada input: mengubahnya menjadi input tag |
| `data-ds-tags-mode="multiple"` | Mengirim satu nilai per tag dengan nama field, bukan satu nilai gabungan |
| `data-ds-tags-max` | Jumlah tag maksimum |
| `data-ds-tags-maxlength` | Panjang maksimum satu tag |
| `data-ds-tags-pattern` | Ekspresi reguler yang harus dipenuhi setiap tag |
| `data-ds-tags-separator` | Pemisah nilai gabungan (bawaan `,`) |
| `data-ds-tags-commit="false"` | Teks yang diketik tidak ditambahkan saat blur |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:switch:change` | `{ checked, result }` | Penyimpanan switch berhasil |
| `ds:switch:error` | `{ checked, error }` | Penyimpanan switch gagal dan switch dikembalikan |
| `ds:rating:change` | `{ value }` | Rating berubah; `value` bernilai `null` saat dihapus |
| `ds:otp:complete` | `{ value }` | Setiap sel terisi |
| `ds:tags:change` | `{ tags }` | Tag ditambah atau dihapus |

### Combobox

Komponen: [Combobox](./combobox.md), [Multi-select](./multi-select.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.addComboboxOption(source, { value, label, hint })` | Menambahkan opsi ke `select` atau `input[list]` sumber dan memilihnya |

| Atribut | Efek |
| --- | --- |
| `data-ds-combobox` | Pada `select`, atau `input` dengan `list` atau sumber: menjadikannya combobox |
| `data-ds-combobox-label` | Kata benda yang diucapkan untuk field (bawaan teks label) |
| `data-ds-combobox-add="Target"` | Menambahkan opsi "Tambah term ke Target" yang memicu event tambah |
| `data-ds-combobox-create` | Menambahkan term yang diketik sebagai opsi baru |
| `data-ds-combobox-source="/api/people?q={q}"` | Mengambil opsi sebagai JSON: array atau `{ items }` berisi `{ value, label, hint, group, disabled }` |
| `data-ds-combobox-param` | Parameter query bila URL tidak memuat `{q}` (bawaan `q`) |
| `data-ds-combobox-min` | Jumlah karakter yang diketik sebelum mengambil (bawaan 1) |
| `data-ds-combobox-clearable` | Menambahkan tombol hapus |
| `data-ds-multiselect` | Pada `select[multiple]`: menampilkan pilihan sebagai chip |
| `data-ds-multiselect-max` | Jumlah pilihan maksimum |
| `data-ds-multiselect-visible` | Chip yang tampil saat field tidak berfokus |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:combobox:change` | `{ value, label }` | Satu pilihan dibuat |
| `ds:multiselect:change` | `{ values }` | Pilihan pada multi-select berubah |
| `ds:combobox:add`, `ds:combobox-add` | `{ term, label, input }` | Opsi tambah dipilih; kedua nama dikirim |
| `ds:combobox:create` | `{ term, input }` | Term yang diketik dibuat menjadi opsi |

### Pickers

Komponen: [Date picker](./date-picker.md), [Date range picker](./date-range-picker.md), [Time picker](./time-picker.md), [Calendar](./calendar.md), [Color picker](./color-picker.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.picker.open(el)` | Membuka picker tanggal atau rentang. `el` adalah elemen atau selector di dalam picker |
| `DS.picker.close(el)` | Menutupnya. Picker waktu dan warna tidak punya popup untuk dibuka atau ditutup |
| `DS.picker.set(el, ...values)` | Mengatur nilai: `"2026-05-14"`, rentang `"2026-05-01", "2026-05-31"`, waktu `"14:30"`, atau warna `"#0f766e"` |
| `DS.picker.parseDate(text, lang)` | Mem-parse teks ketikan menurut urutan tanggal `lang` (bawaan bahasa halaman); mengembalikan `yyyy-MM-dd`, `""` untuk teks kosong, atau `null` bila tidak valid |

| Atribut | Efek |
| --- | --- |
| `data-ds-date-picker` | Membungkus `input[type=date]` |
| `data-ds-date-range` | Membungkus dua `input[type=date]` |
| `data-ds-time-picker` | Membungkus `input[type=time]` |
| `data-ds-color-picker` | Membungkus `input[type=color]` |
| `data-ds-calendar` | Menandai kalender (elemen Cally) |
| `data-ds-disabled-dates` | Tanggal ISO, dipisah spasi atau koma, yang tidak bisa dipilih |
| `data-ds-disable-weekends` | Akhir pekan tidak bisa dipilih |
| `data-ds-presets` | Preset rentang, dipisah koma: `today`, `last7`, `last30`, `thisMonth`, `lastMonth`, `thisYear`; `none` menyembunyikannya |
| `data-ds-autosubmit` | Pada rentang atau formulirnya: mengirim saat kedua tanggal terisi |
| `data-ds-time-zone="Asia/Jakarta"` | Zona IANA yang menentukan "hari ini" |
| `data-ds-hour-cycle="12\|24"` | Memaksa siklus jam pada time picker |
| `data-ds-seconds` | Time picker menampilkan detik |
| `data-ds-swatches="Teal #0f766e, Indigo #4338ca"` | Preset warna; namanya opsional |
| `data-ds-contrast-against` | Warna pembanding untuk menampilkan rasio kontras |
| `data-ds-no-eyedropper` | Menyembunyikan tombol eyedropper |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:datepicker:change` | `{ value, input }` | Tanggal dipilih; `value` berformat ISO |
| `ds:daterange:change` | `{ start, end }` | Rentang berubah |
| `ds:timepicker:change` | `{ value }` | Waktu berubah; `value` berformat `HH:mm` |
| `ds:colorpicker:change` | `{ value }` | Warna berubah; `value` berformat `#rrggbb` |

### Upload

Komponen: [File upload](./file-upload.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.upload.files(el)` | Objek `File` yang saat ini terdaftar, valid maupun tidak. `el` adalah elemen atau selector di dalam `[data-ds-upload]` |
| `DS.upload.add(el, files)` | Menambahkan berkas seolah dijatuhkan |
| `DS.upload.clear(el)` | Menghapus semua berkas |
| `DS.upload.formatSize(bytes, lang)` | Memformat ukuran seperti `1,5 MB` untuk tag bahasa |

| Atribut | Efek |
| --- | --- |
| `data-ds-upload` | Membungkus `.ds-dropzone` dengan `input[type=file]`; `="avatar"` memilih varian avatar |
| `data-ds-upload-max-size="10 MB"` | Ukuran berkas terbesar |
| `data-ds-upload-max-files` | Jumlah berkas terbanyak (bawaan 1, atau tanpa batas dengan `multiple`) |
| `data-ds-upload-url` | Mengunggah setiap berkas langsung ke URL ini dengan progres |
| `data-ds-upload-param` | Nama field form untuk berkas pada permintaan itu (bawaan `file`) |
| `data-ds-upload-field` | Nama input tersembunyi yang membawa id yang dikembalikan (bawaan `<name>Ids`) |
| `data-ds-upload-paste="page"` | Menerima berkas yang ditempel di mana saja pada halaman |
| `data-ds-upload-remove` | Avatar: tombol hapus |
| `data-ds-upload-removed` | Avatar: input tersembunyi yang diatur ke `true` atau `false` |
| `data-ds-upload-status` | Live region untuk pesan (dibuat bila tidak ada) |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:upload:add` | `{ files }` | Berkas ditambahkan, valid atau tidak |
| `ds:upload:remove` | `{ file }`; `{}` untuk avatar | Berkas dihapus |
| `ds:upload:done` | `{ file, response }` | Berkas selesai diunggah; `response` adalah isi yang sudah di-parse |
| `ds:upload:error` | `{ file, status, response }` | Unggahan gagal |

### Validation

Komponen: [Validation](./validation.md), [Form](./form.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.validation.form(form, { focus = true })` | Memvalidasi setiap field. Mengembalikan `true` bila valid; bila tidak, menampilkan pesan dan ringkasan lalu memfokuskan masalah pertama |
| `DS.validation.field(el)` | Memvalidasi satu kontrol dan menampilkan atau menghapus pesannya; mengembalikan `true` bila valid |
| `DS.validation.setError(el, message)` | Menampilkan pesan pada kontrol, misalnya dari server |
| `DS.validation.clearError(el)` | Menghapus pesan pada kontrol |
| `DS.formMode(form, mode)` | Mengatur `"view"` atau `"edit"` pada formulir |

| Atribut | Efek |
| --- | --- |
| `data-ds-validate` | Pada formulir (atau kontainer): memvalidasi saat blur, memvalidasi ulang saat input setelah galat pertama, dan menampilkan ringkasan saat kirim |
| `data-ds-validate-success` | Pada field: menampilkan keadaan berhasil bila valid |
| `data-ds-msg-<rule>` | Pada kontrol: pesan khusus untuk `required`, `type`, `minlength`, `maxlength`, `min`, `max`, `step`, atau `pattern` |
| `data-ds-error-summary` | Kontainer ringkasan; nilainya adalah id formulir bila ia berada di luar formulir |
| `data-ds-autofocus` | Pada ringkasan hasil render server: memfokuskannya sekali setelah pengiriman gagal |
| `data-ds-dirty-status` | Di dalam formulir yang dijaga: live region yang mengumumkan perubahan belum disimpan |
| `data-ds-dirty-text` | Teks pengumuman itu |
| `data-ds-mode="view\|edit"` | Pada formulir: mode lihat mengunci field |
| `data-ds-form-edit` | Tombol yang beralih ke mode ubah; nilainya adalah id formulir bila ia berada di luar formulir |
| `data-ds-form-cancel` | Tombol yang keluar dari mode ubah |
| `data-ds-form-view-only` | Tampil hanya pada mode lihat |
| `data-ds-form-edit-only` | Tampil hanya pada mode ubah |
| `data-ds-form-keep` | Tombol kirim yang tetap tampil pada mode lihat |

Keluaran ASP.NET Core (`input-validation-error`, `field-validation-error`, `validation-summary-errors`, `data-val-*`) dipasang di setiap halaman.

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:validation:result` | `{ valid, invalid }` | Formulir divalidasi; `invalid` mendaftar kontrolnya |
| `ds:form:dirty` | `{ dirty }` | Formulir yang dijaga menjadi kotor atau bersih |
| `ds:form:mode` | `{ mode }` | Mode formulir berubah |

### Guard perubahan belum disimpan

Komponen: [Form](./form.md), [Forms pattern](./forms-pattern.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.guard.register(form)` | Menjaga formulir yang ditambahkan kemudian |
| `DS.guard.isDirty()` | `true` bila formulir yang dijaga berbeda dari snapshot-nya dan meninggalkan halaman belum diizinkan |
| `DS.guard.allow()` | Meninggalkan halaman tanpa bertanya, misalnya setelah penyimpanan berhasil |
| `DS.guard.reset()` | Mengambil snapshot baru setelah penyimpanan tanpa navigasi |

| Atribut | Efek |
| --- | --- |
| `data-ds-guard` | Pada formulir: menjaganya dari meninggalkan halaman dengan perubahan belum disimpan |
| `data-ds-guard-dirty` | Pada formulir: menandainya kotor dari markup atau skrip |
| `data-ds-guard-skip` | Pada tautan: meninggalkan halaman tanpa bertanya |
| `data-ds-logout` | Pada formulir keluar: bertanya dulu bila halaman kotor |
| `data-ds-guard-status` | Di dalam formulir yang dijaga: live region yang mengumumkan "Perubahan belum disimpan" |
| `data-ds-leave-stay`, `data-ds-leave-go` | Tombol dialog `#ds-leave`: tetap tinggal atau pergi |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:guard:change` | `{ dirty }` | Formulir yang dijaga menjadi kotor atau bersih |

## Tampilan data

### Data table

Komponen: [Data table](./data-table.md), [Table](./table.md), [Code block](./code-block.md), [Kbd](./kbd.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.dataTable.setTree(button, open)` | Membuka atau menutup baris pohon atau baris detail dari sebuah tombol toggle |
| `DS.dataTable.setDensity(root, "compact" \| "comfortable", remember = true)` | Mengatur kepadatan `.ds-data-table`; `remember = false` melewati penyimpanannya |
| `DS.dataTable.applyFilter(root)` | Menjalankan ulang filter pencarian dan chip |
| `DS.dataTable.setColumn(root, name, visible)` | Menampilkan atau menyembunyikan kolom menurut key `data-col` |

| Atribut | Efek |
| --- | --- |
| `data-ds-table` | Pada `.ds-data-table`: pencarian, filter, kepadatan, dan kolom di sisi klien |
| `data-ds-table-search` | Input pencarian; menyaring baris menurut teks |
| `data-ds-table-count` | Elemen yang menampilkan jumlah baris yang terlihat |
| `data-ds-table-empty` | Baris yang tampil bila tidak ada yang cocok |
| `data-ds-filter-group="key"` | Grup chip; baris membawa `data-filter-<key>="value"` |
| `data-ds-filter-value` | Satu chip dalam grup filter; nilai kosong berarti semua |
| `data-ds-density-set="compact\|comfortable"` | Tombol kepadatan |
| `data-ds-column="key"` | Checkbox yang menampilkan atau menyembunyikan sel dengan `data-col="key"` |
| `data-ds-columns-reset` | Menampilkan kembali semua kolom |
| `data-ds-persist` | Mengingat kepadatan dan kolom; butuh `id` pada tabel |
| `data-ds-pin="N"` | Pada `table`: menyematkan N kolom pertama |
| `data-ds-pin-primary="i"` | Indeks kolom identitas, tetap tersemat saat ruang sempit |
| `data-ds-pin-end` | Pada `th`: menyematkan kolom itu di ujung |
| `data-ds-scroll-hint` | Elemen sebelum scroller; tampil saat tabel bergulir ke samping |
| `data-ds-tree-toggle` | Tombol dengan `aria-controls` yang membuka isi pohon atau detail |
| `data-ds-tree-all="open\|close"` | Tombol yang membuka atau menutup setiap toggle pohon di dalam elemen pada `aria-controls` (bawaan seluruh halaman) |
| `data-ds-label-expand`, `data-ds-label-collapse` | Nama aksesibel toggle pohon |
| `data-ds-code-copy` | Menyalin blok kode, melewati baris diff yang dihapus |
| `data-ds-code-wrap` | Mengganti pembungkusan baris |
| `data-ds-code-collapsible="14"` | Pada `figure.ds-code`: melipat blok yang lebih tinggi dari sekian rem (bawaan 14) |
| `data-ds-code-expand` | Tombol yang membentangkan blok yang terlipat |
| `data-ds-code-expand-label` | Elemen di dalamnya yang menerima teks "Tampilkan n baris" |
| `data-ds-kbd-mac="⌘"` | Teks `kbd` yang dipakai di platform Apple |
| `data-ds-kbd-mac-label` | Nama yang diucapkan untuk teks itu |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:table:filter` | `{ shown, total, query }` | Filter berjalan |
| `ds:table:density` | `{ density }` | Kepadatan berubah |
| `ds:table:columns` | `{ hidden }` | Visibilitas kolom berubah; `hidden` mendaftar key-nya |
| `ds:table:toggle` | `{ expanded, body }` | Baris pohon atau detail membuka atau menutup |
| `ds:tableupdate` | tidak ada | Didengarkan, tidak dikirim: kirim pada `.ds-table-scroll` untuk mengukur ulang kolom tersemat |

### Selection

Komponen: [Data table](./data-table.md), [List](./list.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.selection.clear(root)` | Menghapus pilihan baris |
| `DS.selection.selectAll(root, state = true)` | Memilih atau membatalkan setiap baris yang aktif |
| `DS.selection.values(root)` | Nilai baris terpilih |
| `DS.selection.count(root)` | Jumlah baris terpilih |

| Atribut | Efek |
| --- | --- |
| `data-ds-select` | Akar tabel yang bisa dipilih, biasanya `.ds-data-table` |
| `data-ds-select-click` | Mengklik ruang kosong pada baris mengganti pilihan baris |
| `data-ds-select-all` | Checkbox header |
| `data-ds-select-row` | Checkbox baris; nilainya adalah id rekaman |
| `data-ds-bulk` | Bar aksi massal; mendapat `data-open` selama ada baris terpilih |
| `data-ds-select-count` | Teks hitungan; beri `role="status"` |
| `data-ds-select-clear` | Tombol hapus pilihan |
| `data-ds-select-everything` | Tombol "Pilih semua N", tampil saat satu halaman terpilih penuh |
| `data-ds-all-pages` | Diatur pada akar oleh skrip setelah tombol itu |
| `data-ds-listbox` | Pada `role="listbox"`: daftar yang bisa dipilih |
| `data-ds-listbox-follow` | Pilihan mengikuti fokus |
| `data-ds-name="field"` | Input tersembunyi untuk nilai terpilih |

Total seluruh halaman berasal dari `data-total` pada akar.

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:selection:change` | `{ count, total, values, rows }` | Pilihan berubah |
| `ds:selection:selectall` | `{ total }` | "Pilih semua N" ditekan |
| `ds:listbox:change` | `{ values, items }` | Pilihan listbox berubah |

### Tree view

Komponen: [Tree view](./tree-view.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.tree.load(item, nodes)` | Memberi item malas anak-anaknya: `DocumentFragment`, elemen, atau array `li[role=treeitem]` |
| `DS.tree.fail(item)` | Melaporkan pemuatan yang gagal; item tetap tertutup dan menampilkan "Coba lagi" |
| `DS.tree.setExpanded(item, open, { announce = true })` | Membuka atau menutup item, memuatnya bila perlu |
| `DS.tree.expandAll(tree)` | Membuka setiap item yang sudah dimuat |
| `DS.tree.collapseAll(tree)` | Menutup setiap item |

| Atribut | Efek |
| --- | --- |
| `data-ds-tree` | Pada `ul.ds-tree[role=tree]` |
| `data-ds-tree-select="single\|multiple\|none"` | Mode pilihan (bawaan `single`) |
| `data-ds-tree-checkable` | Checkbox tiga keadaan |
| `data-ds-name="field"` | Input tersembunyi untuk nilai yang dipilih atau dicentang |
| `data-ds-tree-src` | Pada item: URL atau `#template-id` berisi anak-anaknya, dimuat saat pertama dibuka |
| `data-ds-tree-delay` | Milidetik latensi simulasi sebelum pemuatan |
| `data-ds-icon`, `data-ds-icon-open` | Pada `.ds-tree__icon`: nama ikon untuk keadaan tertutup dan terbuka |
| `data-ds-loaded` | Diatur pada item setelah anak-anaknya dimuat |
| `data-ds-retry` | Diatur pada label "Coba lagi" item yang gagal |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:tree:toggle` | `{ item, expanded }` | Item membuka atau menutup |
| `ds:tree:select` | `{ item, items, values }` | Pilihan berubah |
| `ds:tree:check` | `{ item, checked, values }` | Checkbox berubah; `checked` bernilai `"true"`, `"false"`, atau `"mixed"` |
| `ds:tree:activate` | `{ item }` | Enter, atau klik pada baris atau tautan |
| `ds:tree:load` | `{ item, src, load, fail }` | Sebelum pemuatan malas. Cancelable: cegah untuk memuat anak sendiri dengan `load(nodes)` atau `fail()` |
| `ds:tree:loaded` | `{ item, count }` | Anak-anak sudah di tempatnya |
| `ds:tree:error` | `{ item }` | Pemuatan gagal |

### Chip dan badge

Komponen: [Chip](./chip.md), [Badge](./badge.md), [Avatar](./avatar.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.badge.set(el, count)` | Mengatur badge hitungan; menyembunyikannya pada 0 dan menampilkan `<max>+` di atas batas maksimum |
| `DS.chips.remove(chip)` | Menghapus chip dan memindahkan fokus ke tetangganya; mengembalikan `false` bila `ds:chip:remove` dibatalkan |

| Atribut | Efek |
| --- | --- |
| `data-ds-chips` | Kumpulan chip dengan roving focus; `="single"` membuat chip yang ditekan saling eksklusif |
| `data-ds-chips-max="5"` | Melipat chip di atas jumlah itu di balik chip "+N lainnya" |
| `data-ds-chips-more` | Diatur pada chip "+N lainnya" oleh skrip |
| `data-ds-chip-toggle` | Chip filter: klik membalik `aria-pressed` |
| `data-ds-chip-remove` | Tombol hapus pada chip input |
| `data-ds-badge` | Badge hitungan; hitungannya adalah `data-count` |
| `data-ds-badge-max` | Hitungan terbesar yang ditampilkan (bawaan 99) |
| `data-ds-badge-zero="show"` | Menampilkan badge pada 0 |
| `data-ds-badge-label` | Kata benda untuk hitungan yang diucapkan, misalnya `unread` |
| `data-ds-badge-live` | Mengumumkan perubahan hitungan secara polite |
| `data-ds-badge-text` | Diatur pada hitungan yang terlihat oleh skrip |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:chip:toggle` | `{ pressed }` | Chip filter ditekan |
| `ds:chip:remove` | `{ label, chip }` | Chip akan dihapus. Cancelable |
| `ds:chips:expand` | `{ expanded }` | Chip "+N lainnya" ditekan |

### Carousel dan gambar

Komponen: [Carousel](./carousel.md), [Image](./image.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.carousel.next(el)`, `DS.carousel.prev(el)` | Bergerak satu perhentian. `el` adalah carousel atau selector |
| `DS.carousel.goTo(el, index)` | Menuju slide menurut indeks |
| `DS.carousel.play(el)`, `DS.carousel.pause(el)` | Memulai atau menghentikan autoplay |
| `DS.image.zoom(el)` | Membuka lightbox untuk pemicu zoom; mengembalikan `false` bila tidak punya sumber |

| Atribut | Efek |
| --- | --- |
| `data-ds-carousel` | Carousel di atas CSS scroll snap |
| `data-ds-loop` | Berputar dari slide terakhir ke pertama |
| `data-ds-autoplay="5000"` | Interval autoplay dalam ms; mati secara bawaan dan tidak pernah berjalan saat gerak dikurangi |
| `data-ds-indicators="dots\|thumbs\|count\|none"` | Gaya indikator (bawaan `dots`) |
| `data-ds-thumb` | Pada slide: sumber thumbnail untuk `thumbs` |
| `data-ds-zoom` | Membuka gambar di lightbox saat diklik |
| `data-ds-zoom-src` | Sumber gambar besar (bawaan `href`, bila tidak ada gambarnya sendiri) |
| `data-ds-caption` | Keterangan lightbox (bawaan `figcaption` atau `alt`) |
| `data-ds-blur` | Pada `.ds-image-frame[data-placeholder="blur"]`: URL placeholder buram |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:carousel:change` | `{ index, slide, count, slides }` | Perhentian saat ini berubah |
| `ds:image:load` | tidak ada | Gambar dalam `.ds-image-frame` selesai dimuat |
| `ds:image:error` | tidak ada | Gambar gagal dimuat |

## Navigasi

### Tabs

Komponen: [Tabs](./tabs.md), [Segmented control](./segmented-control.md), [Bottom navigation](./bottom-navigation.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.tabs.select(root, which)` | Memilih tab menurut indeks, menurut id atau slug `data-ds-tab`, atau menurut elemen. `root` adalah elemen tab atau selector |
| `DS.tabs.refresh(root)` | Mengukur ulang indikator dan overflow; juga berlaku untuk segmented control dan navigasi bawah |

| Atribut | Efek |
| --- | --- |
| `data-ds-tabs` | Tab dengan tablist ARIA |
| `data-ds-activation="manual"` | Tombol panah memindahkan fokus; Enter atau Space memilih |
| `data-ds-tabs-hash` | Menyimpan tab terpilih di hash URL |
| `data-ds-tab` | Pada tab: slug untuk hash dan untuk `DS.tabs.select` |
| `data-ds-segmented` | Segmented control; `="off"` melewati thumb geser |
| `data-ds-bottom-nav` | Navigasi bawah dengan indikator geser |
| `data-ds-hide-on-scroll` | Pada navigasi bawah atau navbar: tersembunyi saat scroll ke bawah |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:tabs:change` | `{ tab, panel, index, previous }` | Tab terpilih berubah |
| `ds:segmented:change` | `{ value, item }` | Pilihan segmented berubah |
| `ds:bottomnav:change` | `{ item }` | Item navigasi bawah dipilih |

### Menu navigasi

Komponen: [Navbar](./navbar.md), [Navigation menu](./navigation-menu.md), [Language switcher](./language-switcher.md), [Breadcrumb](./breadcrumb.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.navbar.close(bar)` | Menutup menu mobile navbar; `bar` adalah elemen atau selector |
| `DS.language.current()` | Bahasa halaman, dua huruf |
| `DS.language.remembered()` | Bahasa yang diingat di perangkat ini, atau `null` |

| Atribut | Efek |
| --- | --- |
| `data-ds-navbar` | Navbar: tepi scroll, menu mobile |
| `data-ds-navbar-toggle` | Tombol yang membuka dan menutup menu mobile |
| `data-ds-nav-menu` | Navigasi disclosure dengan panel dropdown dan mega |
| `data-ds-popdown` | Pada `<details>`: menutup saat ditekan di luar, fokus keluar, Escape, dan klik tautan |
| `data-ds-language-remember` | Membungkus tautan bahasa dengan `hreflang`: mengingat pilihan di cookie dan `localStorage`; `="storage"` melewati cookie |
| `data-ds-language-cookie` | Nama cookie (bawaan `.AspNetCore.Culture`) |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:navbar:toggle` | `{ open }` | Menu mobile membuka atau menutup |
| `ds:navmenu:open` | `{ trigger, panel }` | Panel navigasi membuka |
| `ds:navmenu:close` | `{ trigger, panel }` | Panel navigasi menutup |
| `ds:language:change` | `{ language }` | Tautan bahasa ditekan; dikirim pada elemen `data-ds-language-remember` |

## Umpan balik dan overlay

### Toast, alert, dan banner

Komponen: [Toast](./toast.md), [Alert](./alert.md), [Banner](./banner.md), [Notification center](./notification-center.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.toast(options)` | Menampilkan toast dan mengembalikan handle `{ id, close(), dismiss(), update(options) }`. Tone: `success`, `info`, `warning`, `error`, `loading` |
| `DS.toast.promise(promise, { loading, success, error })` | Menampilkan toast loading lalu mengubahnya menjadi berhasil atau galat. `promise` boleh berupa fungsi; setiap pesan berupa string, objek opsi, atau fungsi dari hasil atau alasan |
| `DS.toast.success(title, options)` | Sama untuk `error`, `info`, `warning`, dan `loading` |
| `DS.toast.dismiss(id)` | Menutup toast dengan id itu, atau semua toast tanpa id |
| `DS.alert.dismiss(alert)` | Menghapus elemen alert |
| `DS.banner.dismiss(banner)` | Menyembunyikan banner (elemen atau id) dan mengingatnya |
| `DS.banner.reset(id)` | Melupakan penutupan dan menampilkan banner lagi |
| `DS.notif.setUnread(notif, count)` | Mengatur jumlah belum dibaca pada `.ds-notif` |
| `DS.notif.markAllRead(notif)` | Menandai semua item sudah dibaca dan mengatur jumlah menjadi 0 |

| Opsi | Bawaan | Efek |
| --- | --- | --- |
| `tone` | `"info"` | Warna, ikon, dan role (`alert` untuk `error`, selain itu `status`) |
| `title`, `text` | kosong | Isi; diatur dengan `textContent` |
| `timeout` | `config.toastTimeout` | Milidetik; `0` atau `Infinity` mempertahankannya. Galat, `loading`, dan toast dengan aksi tetap tampil kecuali angka diberikan |
| `stack` | `true` | `false` menggantikan toast yang sedang tampil |
| `id` | dibuat otomatis | Toast dengan id yang sama diperbarui, bukan digandakan |
| `position` | `"bottom-end"` | `bottom-start`, `bottom-center`, `bottom-end`, `top-start`, `top-center`, atau `top-end` |
| `action` | tidak ada | `{ label, href, onClick(handle, event), keepOpen }`; toast tetap tampil sampai aksinya dipakai |
| `closeButton` | `true` | `false` menyembunyikan tombol tutup |

| Atribut | Efek |
| --- | --- |
| `data-ds-toast-show="tone"` | Menampilkan toast saat diklik |
| `data-ds-toast-title`, `data-ds-toast-text` | Isi toast itu |
| `data-ds-toast-action="Urungkan"` | Menambahkan aksi dengan label itu |
| `data-ds-toast-id`, `data-ds-toast-position`, `data-ds-toast-timeout` | Sama dengan opsi `id`, `position`, dan `timeout` |
| `data-ds-toast-resolve="success\|error"` | Bersama `loading`: beralih ke tone itu setelah jeda |
| `data-ds-toast-resolve-title`, `data-ds-toast-resolve-text` | Isi setelah beralih |
| `data-ds-toast-resolve-after` | Jeda dalam ms (bawaan 1800) |
| `data-ds-toast-region` | Kontainer toast; nilainya menentukan posisinya. Satu dibuat bila tidak ada |
| `data-ds-toast="tone"` | Toast hasil render server di dalam region |
| `data-ds-toast-close` | Tombol tutup toast |
| `data-ds-alert-close` | Tombol tutup `.ds-alert` |
| `data-ds-banner="id"` | Banner yang penutupannya diingat dengan id itu |
| `data-ds-banner-remember="session\|none"` | Ingat hanya selama sesi, atau tidak sama sekali (bawaan `localStorage`) |
| `data-ds-banner-days` | Lupakan penutupan setelah sekian hari |
| `data-ds-banner-close` | Tombol tutup `.ds-banner` |
| `data-ds-notif-read-all` | Tombol yang menandai semua notifikasi sudah dibaca |
| `data-ds-notif-unread` | Titik belum dibaca pada item notifikasi; tersembunyi saat sudah dibaca |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:toast:close` | `{ id }` | Toast mulai keluar |
| `ds:toast:action` | `{ id, trigger }` | Aksinya dipakai; `trigger` adalah elemen `data-ds-toast-show`, bila ada |
| `ds:alert:dismiss` | tidak ada | Alert ditutup. Cancelable |
| `ds:banner:dismiss` | `{ id }` | Banner ditutup. Cancelable |
| `ds:notif:read-all` | tidak ada | `markAllRead` berjalan |

### Dialog

Komponen: [Dialog](./dialog.md), [Alert dialog](./alert-dialog.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.dialog.open(dialog, opener)` | Membuka `<dialog>` modal (elemen atau id), menyimpan pembuka untuk mengembalikan fokus, dan mengembalikan dialog |
| `DS.dialog.close(dialog, value = "")` | Menutupnya; `value` menjadi `returnValue`. Diabaikan saat dialog sibuk |
| `DS.dialog.busy(dialog, on = true, button)` | Keadaan sibuk: memblokir Escape, scrim, dan Tutup, serta menampilkan spinner pada `button` setelah 300 ms |
| `DS.confirm(options, opener)` | Bertanya sebelum aksi yang berdampak; resolve `true` bila diterima. `DS.dialog.confirm` adalah fungsi yang sama |

Opsi `DS.confirm`:

| Opsi | Bawaan | Efek |
| --- | --- | --- |
| `title`, `text` | "Lanjutkan?", kosong | Judul dan deskripsi |
| `label` | "Hapus" | Teks tombol terima |
| `tone` | `"danger"` | Tombol terima `"danger"` atau `"primary"` |
| `focus` | `"cancel"` | `"accept"` menaruh fokus awal pada tombol terima |
| `action` | tidak ada | Fungsi async yang dijalankan saat dialog sibuk; penolakan membuat dialog tetap terbuka dengan pesan galat |

| Atribut | Efek |
| --- | --- |
| `data-ds-dialog-open="id"` | Membuka `<dialog>` dengan id itu |
| `data-ds-dialog-close="value"` | Menutup dialog dan mengatur nilai kembaliannya |
| `data-ds-initial-focus` | Elemen yang menerima fokus saat dialog terbuka |
| `data-ds-dismissible` | Menekan scrim menutup dialog; `="false"` mematikannya. Sheet dan palet perintah dismissible secara bawaan |
| `data-ds-dialog-box` | Elemen yang tepinya dianggap kotak dialog untuk tekanan pada scrim |
| `data-ds-open-on-load` | Pada dialog: dibuka kembali setelah round trip ke server |
| `data-ds-busy="false"` | Pada formulir dalam dialog: mengirim tidak menandai dialog sibuk |
| `data-ds-confirm="Judul"` | Bertanya sebelum klik atau kirim dilanjutkan |
| `data-ds-confirm-text`, `data-ds-confirm-label` | Deskripsi dan teks terima pertanyaan itu |
| `data-ds-confirm-tone="danger\|primary"` | Tone tombol terima |
| `data-ds-confirm-focus="accept"` | Fokus awal pada tombol terima |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:dialog:open` | tidak ada | Dialog dibuka lewat `DS.dialog.open`, pemicu `data-ds-dialog-open`, atau `data-ds-open-on-load` |
| `ds:dialog:close` | `{ value }` | Dialog apa pun menutup; `value` adalah nilai kembaliannya |
| `ds:confirmed` | tidak ada | Kontrol `data-ds-confirm` yang bukan tautan dan tidak berada dalam formulir dikonfirmasi; dikirim pada kontrol itu |

### Sheet

Komponen: [Sheet](./sheet.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.sheet.open(sheet, opener, { snap, modal = true })` | Membuka `dialog.ds-sheet` pada indeks snap; `modal: false` membukanya non-modal, tanpa focus trap |
| `DS.sheet.close(sheet)` | Menutupnya |
| `DS.sheet.snap(sheet, index)` | Memindahkan sheet yang terbuka ke titik snap |

| Atribut | Efek |
| --- | --- |
| `data-ds-sheet-open="id"` | Membuka sheet dengan id itu |
| `data-ds-sheet-close` | Menutup sheet yang memuatnya |
| `data-ds-sheet-snap="45%,100%"` | Pecahan yang terlihat, dari yang terkecil; yang pertama adalah posisi saat dibuka |
| `data-ds-sheet-initial` | Indeks snap saat dibuka |
| `data-ds-sheet-drag` | Elemen yang berfungsi sebagai pegangan seret |
| `data-ds-no-drag` | Elemen yang tidak pernah memulai seretan |
| `data-ds-dismissible="false"` | Menekan scrim tidak menutup sheet |
| `data-ds-modeless` | Diatur selama sheet terbuka tanpa `modal` |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:sheet:open` | tidak ada | Sheet membuka |
| `ds:sheet:close` | tidak ada | Sheet menutup |
| `ds:sheet:snap` | `{ index }` | Sheet berhenti di titik snap |

### Popover dan hover card

Komponen: [Popover](./popover.md), [Hover card](./hover-card.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.popover.open(popover, anchor, { side, align, focus = true })` | Membuka `[popover]` (elemen atau id) di samping pemicunya atau `anchor` |
| `DS.popover.close(popover)` | Menutupnya |
| `DS.popover.toggle(popover, anchor)` | Membuka atau menutupnya |
| `DS.popover.place(floating, anchor, { side, align, gap, inset })` | Menempatkan elemen fixed di samping jangkar, membaliknya agar muat, dan mengembalikan sisi yang dipakai |
| `DS.hoverCard.open(id)` | Membuka hover card milik pemicu dengan id itu |
| `DS.hoverCard.close(id)` | Menutupnya |

| Atribut | Efek |
| --- | --- |
| `data-ds-popover` | Menandai `[popover]` yang tidak punya class `.ds-popover` |
| `data-ds-side` | Pada popover: `bottom`, `top`, `left`, atau `right` |
| `data-ds-align` | `start`, `center`, atau `end` |
| `data-ds-gap` | Jarak ke pemicu dalam px (bawaan 6) |
| `data-ds-hover-card="id"` | Pada tautan: membuka hover card dengan id itu |
| `data-ds-open-delay` | Jeda hover sebelum membuka (bawaan 500 ms) |
| `data-ds-close-delay` | Jeda sebelum menutup (bawaan 300 ms) |
| `data-ds-initial-focus` | Elemen yang mendapat fokus saat popover terbuka |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:popover:open` | tidak ada | Popover atau hover card membuka |
| `ds:popover:close` | tidak ada | Popover atau hover card menutup |

### Tooltip

Komponen: [Tooltip](./tooltip.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.tooltip.show(el)` | Menampilkan tooltip milik pemicu seketika |
| `DS.tooltip.hide()` | Menyembunyikan tooltip yang terbuka |

| Atribut | Efek |
| --- | --- |
| `data-ds-tooltip="text"` | Teks tooltip; pemicu mendapat `aria-describedby` |
| `data-ds-tooltip-title` | Tooltip kaya: judul di atas teks |
| `data-ds-tooltip-kbd="Ctrl K"` | Pintasan yang tampil setelah teks |
| `data-ds-tooltip-placement="top"` | `top`, `bottom`, `left`, atau `right`, dengan `-start` atau `-end` (bawaan `top`) |
| `data-ds-tooltip-delay="500"` | Jeda hover dalam ms; `0` berarti seketika |
| `data-ds-tooltip-overflow` | Menampilkan teks elemen itu sendiri, hanya bila terpotong |
| `data-ds-tooltip-named` | Diatur saat tooltip juga menjadi nama aksesibel kontrol yang hanya berisi ikon |

Tidak ada event.

### Menu

Komponen: [Dropdown menu](./dropdown-menu.md), [Menubar](./menubar.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.menu.open(menu, anchor, options)` | Membuka menu (elemen atau id) di samping `anchor` (bawaan pemicunya). Opsi: `focus` (`"first"`, `"last"`, `"menu"`, atau `null`), `side`, `align`, `gap`, `trigger`, `context`. Mengembalikan menu atau `null` |
| `DS.menu.close(menu)` | Menutup menu beserta submenunya dan mengembalikan fokus |
| `DS.menu.closeAll()` | Menutup setiap menu yang terbuka |

| Atribut | Efek |
| --- | --- |
| `data-ds-menu-open="id"` | Pemicu yang membuka menu dengan id itu, seperti `popovertarget` |
| `data-ds-submenu="id"` | Pada item dengan `aria-haspopup="menu"`: submenu-nya, bila `aria-controls` tidak ada |
| `data-ds-close="true\|false"` | Pada item: menutup atau mempertahankan menu setelah dipilih. Item checkbox dan radio mempertahankannya secara bawaan |
| `data-ds-floating` | Diatur pada menu atau popover selama ditempatkan di samping jangkarnya |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:menu:open` | tidak ada | Menu membuka; dikirim pada menu |
| `ds:menu:close` | tidak ada | Menu menutup |
| `ds:menu:select` | `{ value, checked, context }` | Item diaktifkan; dikirim pada item. Cancelable: cegah untuk menjaga menu tetap terbuka |

`value` berasal dari `data-value`, bila tidak ada dari teks item. `checked` diatur untuk item checkbox dan radio. `context` adalah elemen yang ditekan pada [context menu](./context-menu.md), bila bukan itu `null`.

### Context menu

Komponen: [Context menu](./context-menu.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.contextMenu.open(region, x, y)` | Membuka menu sebuah region (elemen atau nilai `data-ds-context-menu`) pada koordinat viewport; tanpa `x` ia terbuka di elemen yang berfokus |

| Atribut | Efek |
| --- | --- |
| `data-ds-context-menu="menu-id"` | Region yang membuka menu itu lewat klik kanan, Shift+F10, tombol ContextMenu, atau tekan lama 500 ms |
| `data-ds-context-item` | Elemen di dalam region yang dilaporkan sebagai `context` saat dipilih |
| `data-ds-context-native="shift"` | Shift+klik kanan menampilkan menu browser |
| `data-ds-pressing` | Diatur pada region selama tekan lama |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:context-menu:open` | `{ context }` | Menu membuka; dikirim pada region. `context` adalah item atau region |

### Palet perintah

Komponen: [Command](./command.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.command.open(id)` | Membuka dialog palet (yang pertama bila tanpa `id`) |
| `DS.command.close(id)` | Menutupnya |
| `DS.command.filter(command, query)` | Mengatur query dan menyaring; mengembalikan jumlah item yang terlihat |
| `DS.command.setItems(command, items)` | Mengganti hasil yang disediakan skrip. Item: `{ label, description, href, value, icon, shortcut, group, disabled }` |
| `DS.command.setLoading(command, on = true)` | Keadaan sibuk; baris pemuatan muncul setelah 300 ms |

`command` adalah `.ds-command`, dialog palet, atau id-nya.

| Atribut | Efek |
| --- | --- |
| `data-ds-command` | Pada `<dialog>`: palet perintah |
| `data-ds-command-shortcut="mod+k"` | Membukanya dari keyboard: `mod+k` (Cmd di Apple, Ctrl di tempat lain) atau satu tombol seperti `/` |
| `data-ds-command-open="id"` | Tombol yang membuka palet itu |
| `data-ds-command-hint` | Elemen yang teksnya menjadi pintasan untuk platform ini; nilainya adalah id palet |
| `data-ds-command-source="/search?q={query}"` | Pada `.ds-command`: mengambil hasil sebagai JSON |
| `data-ds-command-min` | Jumlah karakter yang diketik sebelum mengambil (bawaan 1) |
| `data-ds-command-always` | Pada item: tidak pernah tersaring |
| `data-ds-keep-open` | Pada item: palet tetap terbuka setelah aksi |
| `data-ds-command-query` | Di dalam pesan kosong: diganti dengan query |
| `data-ds-command-message` | Di dalam pesan kosong: diganti dengan teks galat bila pengambilan gagal |
| `data-ds-command-remote`, `data-ds-command-remote-group` | Diatur pada item hasil pengambilan dan grupnya |

Item juga bisa membawa `data-value` dan `data-keywords` (kata pencocok tambahan).

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:command:query` | `{ query }` | Pengguna mengetik; dikirim pada `.ds-command` |
| `ds:command:select` | `{ value, item, query }` | Item dipilih; dikirim pada item. Cancelable |

## Disclosure dan tata letak

### Accordion dan collapsible

Komponen: [Accordion](./accordion.md), [Collapsible](./collapsible.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.accordion.openAll(accordion)` | Membuka setiap item yang tidak dinonaktifkan |
| `DS.accordion.closeAll(accordion)` | Menutup setiap item |

| Atribut | Efek |
| --- | --- |
| `data-ds-accordion="single"` | Hanya satu item terbuka pada satu waktu |
| `data-ds-accordion-name` | Nama bersama untuk grup eksklusif (bawaan dibuat otomatis) |
| `data-ds-accordion-all="open\|close"` | Tombol dengan `aria-controls` yang membuka atau menutup setiap item |
| `data-ds-collapsible` | Bentuk tombol dari collapsible, atau tampilkan lebih banyak dan lebih sedikit |
| `data-ds-label-expanded`, `data-ds-label-collapsed` | Teks pemicu collapsible pada tiap keadaan |

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:accordion:toggle` | `{ open }` | Item membuka atau menutup |
| `ds:collapsible:toggle` | `{ open }` | Collapsible membuka atau menutup |

### Panel resizable

Komponen: [Resizable](./resizable.md).

| Fungsi | Keterangan |
| --- | --- |
| `DS.resizable.setSizes(element, sizes)` | Mengatur ukuran panel dalam persen, satu per panel |

| Atribut | Efek |
| --- | --- |
| `data-ds-resizable` | Pada `.ds-resizable`: panel dengan pemisah yang bisa dioperasikan keyboard |
| `data-ds-resizable-id` | Mengingat ukuran dengan id itu |

Panel juga membaca `data-min`, `data-max`, dan `data-collapsible`; grup membaca `data-step` (langkah keyboard, bawaan 5).

| Event | Detail | Kapan |
| --- | --- | --- |
| `ds:resizable:resize` | `{ sizes }` | Ukuran berubah |
| `ds:resizable:collapse` | `{ index, collapsed }` | Panel melipat atau membentang |

## Penanda keadaan

Skrip menulis atribut ini untuk CSS dan pengujian. Jangan mengaturnya manual: `data-ds-ready`, `data-ds-submitted`, `data-ds-dirty`, `data-ds-dragging`, `data-ds-moving`, `data-ds-settle`, `data-ds-busy-source`, `data-ds-pending`, `data-ds-hidden`, `data-ds-nested`, `data-ds-covered`, `data-ds-scrolled`, `data-ds-more`, `data-ds-view-lock`, `data-ds-live`, `data-ds-busy-spinner`, `data-ds-date-text`, `data-ds-tags-value`, `data-ds-toggle-input`, serta `data-ds-mode` dan `data-ds-scheme` pada `<html>`. Dialog konfirmasi bawaan (`#ds-confirm`) memakai `data-ds-confirm-title`, `data-ds-confirm-text`, `data-ds-confirm-accept`, `data-ds-confirm-cancel`, dan `data-ds-confirm-error` secara internal.

## Internasionalisasi

String UI (label, pesan live region, hitungan) mengikuti `<html lang>`. Bahasa Inggris dan Indonesia sudah tersedia. Tambah atau timpa string, atau bahasa, dengan `addMessages`; key berbentuk `<modul>.<key>` dan menerima `{placeholder}`.

```js
DS.addMessages({
  en: { "toast.close": "Dismiss" },
  ms: { "toast.close": "Tutup pemberitahuan" },
});
DS.configure({ locale: "ms" });   // bila tidak, bahasa mengikuti <html lang>
```

Key yang hilang kembali ke bahasa Inggris, lalu ke key itu sendiri. Teks dari server berasal dari `DsText` di C# (lihat [API Razor dan C#](./razor-api.md) dan [Lokalisasi](./localization.md)); keduanya membaca bahasa halaman yang sama.

## Pembaruan parsial, htmx, dan SPA

Listener tingkat dokumen dipasang sekali. Widget per elemen butuh `DS.init(root)` setelah Anda menyisipkan markup; ia idempoten, jadi menjalankannya ulang pada subpohon tidak menggandakan widget.

```js
// htmx
document.body.addEventListener("htmx:afterSettle", (e) => DS.init(e.target));

// fetch lalu ganti
panel.innerHTML = await (await fetch(url)).text();
DS.init(panel);
```

Pada aplikasi satu halaman panggil `DS.init(container)` di hook mount komponen yang merender markup DS. Dengan `data-ds-manual` pada `<html>`, tidak ada yang berjalan sampai Anda memanggil `DS.init()` sekali untuk halaman.

## Kunci penyimpanan

Keadaan disimpan dengan nama `<storage>-<nama>` (awalan bawaan `ds`). Di `localStorage`: `ds-theme`, `ds-sidebar-collapsed`, `ds-nav-groups`, `ds-language`, `ds-banner-<id>`, `ds-recent-<key>`, `ds-resizable-<id>`, serta `ds-table-<id>-density` dan `ds-table-<id>-columns` untuk tabel dengan `data-ds-persist`. Di `sessionStorage`: `ds-nav-scroll`, dan `ds-banner-<id>` untuk banner yang mengingat per sesi. Awalan berasal dari `data-ds-storage` pada `<html>` (diatur oleh `HeadOptions.Storage`) atau `DS.configure({ storage })`.

## Waktu dan gerak

Nilai bawaan ada di `DS.config`: `toastTimeout` 6000 ms, `exportLock` 15000 ms. Gerak lewat JavaScript memeriksa `prefers-reduced-motion` dan memakai token durasi dan easing yang sama dengan CSS.
