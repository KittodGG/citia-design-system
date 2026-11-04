---
title: Checkbox
group: components
category: forms
order: 20
summary: Kontrol persegi untuk pilihan aktif/nonaktif yang berlaku saat form dikirim, untuk memilih beberapa opsi, dan untuk induk pilih semua dengan state campuran.
source: TPS app.css L1890–1975 (.ds-check-row, .ds-choice)
---

Checkbox menyalakan atau mematikan satu opsi, dan pilihannya berlaku saat form dikirim. Gunakan grup checkbox bila orang boleh memilih beberapa opsi. Untuk pengaturan yang berlaku seketika, gunakan [Switch](./switch.md). Untuk tepat satu opsi dari daftar, gunakan [Radio group](./radio-group.md). Bila opsi lebih dari 7, gunakan [Multi-select](./multi-select.md).

## Contoh

### Dengan label dan deskripsi

Bungkus kontrol dan teksnya dalam `label.ds-check-row`. Seluruh baris menjadi area klik (tinggi 44px), judul memakai `strong` dan deskripsi memakai `small`.

```html preview title="Baris checkbox"
<div class="ds-choice-group__items">
  <label class="ds-check-row">
    <input type="checkbox" class="checkbox" name="Notify" value="true" checked aria-describedby="cb-notify-desc">
    <span><strong>Kirim email saat faktur dibayar</strong><small id="cb-notify-desc">Satu pesan per pembayaran, dikirim ke ayu.lestari@example.com.</small></span>
  </label>
  <label class="ds-check-row">
    <input type="checkbox" class="checkbox" name="Digest" value="true">
    <span><strong>Ringkasan mingguan</strong></span>
  </label>
</div>
```

### Grup dengan induk pilih semua

`data-ds-check-all` pada induk menerima selector CSS (atau memakai id di `aria-controls`). Induk menampilkan state campuran selama hanya sebagian anak yang dicentang, dan mencentang atau mengosongkan semuanya.

```html preview title="Pilih semua"
<fieldset class="ds-checkbox-group">
  <legend>Kolom ekspor</legend>
  <label class="ds-check-row">
    <input type="checkbox" class="checkbox" data-ds-check-all="[name=Columns]" aria-controls="cb-col-1 cb-col-2 cb-col-3">
    <span><strong>Semua kolom</strong></span>
  </label>
  <div class="ds-choice-group__items" style="padding-inline-start: 2rem">
    <label class="ds-check-row"><input id="cb-col-1" type="checkbox" class="checkbox" name="Columns" value="invoice" checked><span>Nomor faktur</span></label>
    <label class="ds-check-row"><input id="cb-col-2" type="checkbox" class="checkbox" name="Columns" value="customer" checked><span>Pelanggan</span></label>
    <label class="ds-check-row"><input id="cb-col-3" type="checkbox" class="checkbox" name="Columns" value="amount"><span>Jumlah</span></label>
  </div>
</fieldset>
```

### Grup horizontal

```html preview title="Horizontal"
<fieldset class="ds-checkbox-group is-horizontal">
  <legend>Hari kerja</legend>
  <div class="ds-choice-group__items">
    <label class="ds-check-row"><input type="checkbox" class="checkbox" name="Days" value="mon" checked><span>Senin</span></label>
    <label class="ds-check-row"><input type="checkbox" class="checkbox" name="Days" value="tue" checked><span>Selasa</span></label>
    <label class="ds-check-row"><input type="checkbox" class="checkbox" name="Days" value="wed" checked><span>Rabu</span></label>
    <label class="ds-check-row"><input type="checkbox" class="checkbox" name="Days" value="thu"><span>Kamis</span></label>
    <label class="ds-check-row"><input type="checkbox" class="checkbox" name="Days" value="fri"><span>Jumat</span></label>
  </div>
</fieldset>
```

### Checkbox kartu

`label.ds-choice` menjadikan seluruh kartu sebagai label. Pakai kartu bila tiap opsi butuh satu kalimat penjelasan dan jumlah opsi 2 sampai 6. Tambahkan `.is-end` untuk menaruh kontrol di ujung.

```html preview title="Checkbox kartu"
<div class="ds-choice-grid is-2">
  <label class="ds-choice">
    <input type="checkbox" class="checkbox" name="Modules" value="billing" checked>
    <span><strong>Penagihan</strong><small>Faktur, pembayaran, dan nota kredit untuk PRJ-1024.</small></span>
  </label>
  <label class="ds-choice">
    <input type="checkbox" class="checkbox" name="Modules" value="reports">
    <span><strong>Laporan</strong><small>Laporan pendapatan bulanan dan umur piutang, diekspor sebagai PDF atau Excel.</small></span>
  </label>
</div>
```

### Ukuran

```html preview title="Ukuran"
<div class="flex flex-wrap items-center gap-6">
  <label class="ds-check-row"><input type="checkbox" class="checkbox is-sm" checked><span>Kecil, 16px</span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" checked><span>Bawaan, 20px</span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox is-lg" checked><span>Besar, 24px</span></label>
</div>
```

## State

```html preview title="State checkbox"
<div class="grid gap-x-8 sm:grid-cols-2">
  <label class="ds-check-row"><input type="checkbox" class="checkbox"><span>Tidak dicentang</span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" checked><span>Dicentang</span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" data-ds-indeterminate><span>Indeterminate (campuran)</span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" aria-invalid="true" aria-describedby="cb-terms-error"><span><strong>Saya menyetujui syarat layanan</strong><small id="cb-terms-error" class="ds-field-error">Setujui syarat untuk melanjutkan.</small></span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" disabled><span>Nonaktif</span></label>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" disabled checked><span>Nonaktif, dicentang</span></label>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak dicentang | Kotak 20px, border 1px `--ds-control-border` (minimal 3:1), permukaan `--color-base-100` |
| Hover | pointer di atas kotak atau barisnya (`@media (hover: hover)`) | border satu tingkat lebih gelap, isi state-layer `--ds-opacity-state-hover` |
| Pressed | pointer ditekan | isi `--ds-opacity-state-pressed` |
| Focus-visible | fokus keyboard | ring 2px `--ds-focus`, offset 2px |
| Checked | `:checked` | isi primary, glif centang tergambar dari sisi awal (180ms) |
| Indeterminate | `:indeterminate` (diatur oleh `data-ds-indeterminate` atau check-all) | isi primary, glif minus |
| Checked hover | pointer di atas kotak yang dicentang | isi dicampur 14% ke arah `--color-base-content` |
| Invalid | `:user-invalid`, `aria-invalid="true"`, atau grup dengan `aria-invalid="true"` | border galat, pesan di bawah dihubungkan oleh `aria-describedby` |
| Disabled | `:disabled` | `--ds-opacity-disabled`, `cursor: not-allowed`, teks baris diredupkan, tanpa hover |
| Card selected | `.ds-choice:has(:checked)` | border primary ditambah ring dalam 1px, rona primary 6% |

## Anatomi

- `input.checkbox`: kontrol native (`.checkbox` daisyUI, disempurnakan).
- `label.ds-check-row`: baris berisi kontrol, judul `strong`, dan deskripsi `small`; `.is-end` menaruh kontrol di akhir.
- `label.ds-choice`: kartu yang dapat dipilih; `.ds-choice__body`, `.ds-choice__icon` opsional.
- `fieldset.ds-checkbox-group`: grup dengan `legend`; `.ds-choice-group__items` memuat baris; `.is-horizontal` menyusunnya dalam satu baris.
- `.ds-choice-grid` (`.is-2`, `.is-3`): grid kartu.

## Penggunaan

- Tulis label sebagai pernyataan positif ("Kirim email saat faktur dibayar"), bukan negatif ("Jangan kirim email").
- Batasi grup maksimal 7 opsi; lebih dari itu, gunakan [Multi-select](./multi-select.md) dengan pencarian.
- Susun opsi secara vertikal; pakai `.is-horizontal` hanya untuk 2 sampai 5 label pendek (satu atau dua kata).
- Jangan pakai checkbox untuk aksi yang berlaku seketika; gunakan [Switch](./switch.md).
- Jangan mencentang kotak persetujuan (syarat, pemasaran) sebelumnya.
- Tampilkan state campuran hanya pada induk yang mengendalikan anak. Jangan pernah mengirim "mixed" sebagai nilai.

## Aksesibilitas

- Selalu `<input type="checkbox">` native dengan `<label>` yang terlihat. Grup memakai `fieldset` dan `legend`, sehingga nama grup dibacakan sebelum tiap opsi.
- Deskripsi dihubungkan dengan `aria-describedby`; galat juga, dengan `aria-invalid="true"` pada kontrol (atau pada `fieldset` untuk aturan grup seperti "pilih minimal satu").
- State campuran berasal dari properti `indeterminate`, yang diumumkan teknologi bantu sebagai "mixed". Properti ini tidak dapat diatur di HTML, jadi ds.js mengaturnya dari `data-ds-indeterminate`.
- Glif centang adalah mask berwarna `--color-primary-content` di atas `--color-primary` (minimal 4,5:1 di kedua tema). State tidak pernah hanya warna: glif berubah bentuk.
- Forced colours: kotak memakai `Canvas`/`CanvasText`, state checked memakai `Highlight` dengan glif `HighlightText`.
- Gerak: centang tergambar dengan `clip-path` selama 180ms; dengan reduced motion, centang muncul seketika.

| Tombol | Aksi |
| --- | --- |
| Tab / Shift+Tab | Pindah ke checkbox berikutnya atau sebelumnya |
| Space | Mengganti state checkbox yang fokus (induk campuran menjadi dicentang) |

## Razor

```cshtml
<ds-checkbox asp-for="AcceptTerms" label="Saya menyetujui syarat layanan" required />
<ds-checkbox asp-for="EmailOnPayment" label="Kirim email saat faktur dibayar"
             description="Satu pesan per pembayaran." />
<ds-checkbox name="Modules" value="billing" card label="Penagihan" description="Faktur dan pembayaran." />

<ds-checkbox-group asp-for="Columns" label="Kolom ekspor" asp-items="Model.ColumnOptions" />
<ds-checkbox-group asp-for="Days" label="Hari kerja" horizontal items="Model.Days" />
```

Model `bool` mengirim `true` atau `false` (input `false` tersembunyi mengikuti kotak, seperti helper checkbox bawaan). Model koleksi (`List<string>`, `int[]`) mengikat setiap nilai yang dicentang. `items` menerima `ChoiceItem(Value, Label, Description, Disabled)`. Atribut `data-*` dan `aria-*` yang ditulis pada `<ds-checkbox>` dipindahkan ke input. Galat model menambahkan `aria-invalid` dan pesan `.ds-field-error`.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-indeterminate` | Mengatur `indeterminate = true` saat dimuat (`="false"` membiarkannya mati) |
| `data-ds-check-all="selector"` | Kotak induk: mencentang atau mengosongkan setiap checkbox yang cocok dan menampilkan state campuran selama sebagian dicentang; tanpa nilai, memakai id di `aria-controls` |

Anak memicu `change` saat induk mengubahnya, sehingga skrip lain tetap sinkron.

## Token

`--color-primary`, `--color-primary-content`, `--ds-control-border`, `--color-base-100`, `--color-base-200`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-state-selected`, `--ds-opacity-disabled`, `--ds-focus`, `--ds-border-focus`, `--color-error`, `--ds-radius-sm`, `--ds-duration-base`, `--ds-ease-out`, `--ds-size-target`.

## Native dan daisyUI

Dibangun di atas `<input type="checkbox">` dengan `.checkbox` daisyUI. DS mengganti tanda centang clip-path yang diputar milik daisyUI dengan centang bermask yang tergambar, menetapkan ukuran bawaan 20px (16px `is-sm`, 24px `is-lg`; `checkbox-sm`/`-lg` daisyUI juga berfungsi), memakai primary untuk state checked dan campuran secara bawaan, border 3:1, focus ring DS, dan opasitas disabled DS. Class tone daisyUI (`checkbox-success`, `checkbox-error`, …) tetap mengubah isi.
