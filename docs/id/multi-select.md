---
title: Multi-select
group: components
category: forms
order: 26
summary: Combobox untuk memilih beberapa opsi dari daftar, dengan chip di field, tanda centang di daftar, pilih semua, batas maksimum, dan luapan "+N lagi".
---

Multi-select memilih beberapa nilai dari daftar yang sudah diketahui: orang yang diberi tahu, label, wilayah. Komponen ini adalah [Combobox](./combobox.md) yang pilihannya tampil sebagai chip di dalam field. Untuk 7 opsi atau kurang, tampilkan grup [Checkbox](./checkbox.md); semua opsi tetap terlihat dan cukup satu klik. Bila orang mengetik nilainya sendiri tanpa daftar, pakai [Tags input](./tags-input.md).

## Contoh

### Dasar

Tambahkan `data-ds-multiselect` pada `<select multiple>`. Select tetap berada di form dan mengirim setiap nilai terpilih dengan satu nama, sehingga model `List<string>` atau `int[]` terikat seperti biasa.

```html preview title="Multi-select"
<div class="ds-field" style="max-width: 30rem">
  <label for="ms-notify">Beri tahu</label>
  <select id="ms-notify" name="NotifyIds" multiple data-ds-multiselect data-ds-combobox-label="orang" placeholder="Pilih orang" aria-describedby="ms-notify-hint">
    <option value="u1" data-hint="Keuangan" selected>Ayu Lestari</option>
    <option value="u2" data-hint="Teknik" selected>Daniel Okafor</option>
    <option value="u3" data-hint="Teknik">Mei Tanaka</option>
    <option value="u4" data-hint="Hukum">Sofia Marquez</option>
    <option value="u5" data-hint="Operasional">Rahul Iyer</option>
    <option value="u6" data-hint="Operasional">Grace Mensah</option>
    <option value="u7" data-hint="Keuangan">Lukas Weber</option>
  </select>
  <p id="ms-notify-hint" class="ds-hint">Mereka menerima email saat faktur disetujui.</p>
</div>
```

### Maksimum dan luapan

`data-ds-multiselect-max` membatasi jumlah pilihan; opsi lain menjadi tidak tersedia saat batas tercapai dan batasnya diumumkan. `data-ds-multiselect-visible` menampilkan sejumlah chip tersebut selama field tidak difokuskan dan melipat sisanya menjadi "+N lagi".

```html preview title="Maksimum 3, tampil 2"
<div class="ds-field" style="max-width: 30rem">
  <label for="ms-regions">Wilayah penjualan</label>
  <select id="ms-regions" name="Regions" multiple data-ds-multiselect data-ds-combobox-label="wilayah" data-ds-multiselect-max="3" data-ds-multiselect-visible="2" aria-describedby="ms-regions-hint">
    <optgroup label="Asia Pasifik">
      <option value="id" selected>Indonesia</option>
      <option value="jp" selected>Jepang</option>
      <option value="au">Australia</option>
    </optgroup>
    <optgroup label="Eropa, Timur Tengah, dan Afrika">
      <option value="es" selected>Spanyol</option>
      <option value="ng">Nigeria</option>
      <option value="de">Jerman</option>
    </optgroup>
  </select>
  <p id="ms-regions-hint" class="ds-hint">Pilih paling banyak 3.</p>
</div>
```

### Membuat nilai

`data-ds-combobox-create` memungkinkan orang menambahkan nilai yang belum ada di daftar; nilai itu menjadi `<option>` terpilih.

```html preview title="Dengan create"
<div class="ds-field" style="max-width: 30rem">
  <label for="ms-skills">Keahlian</label>
  <select id="ms-skills" name="Skills" multiple data-ds-multiselect data-ds-combobox-label="keahlian" data-ds-combobox-create placeholder="Cari atau buat">
    <option selected>Akuntansi</option>
    <option>Hukum kontrak</option>
    <option>Analisis data</option>
    <option>Manajemen proyek</option>
  </select>
</div>
```

Opsi jarak jauh bekerja seperti di combobox: `data-ds-combobox-source="/api/people?q={q}"`.

## State

```html preview title="State field"
<div class="grid gap-4 sm:grid-cols-2">
  <div class="ds-field"><label for="ms-st-1">Kosong</label><select id="ms-st-1" multiple data-ds-multiselect placeholder="Pilih label"><option>Mendesak</option><option>Penagihan</option></select></div>
  <div class="ds-field"><label for="ms-st-2">Nonaktif</label><select id="ms-st-2" multiple data-ds-multiselect disabled><option selected>Mendesak</option><option selected>Penagihan</option></select></div>
  <div class="ds-field"><label for="ms-st-3">Tidak valid</label><select id="ms-st-3" multiple data-ds-multiselect aria-invalid="true" aria-describedby="ms-st-3-err" placeholder="Pilih peninjau"><option>Ayu Lestari</option><option>Mei Tanaka</option></select><p id="ms-st-3-err" class="ds-field-error">Pilih minimal satu peninjau.</p></div>
  <div class="ds-field"><label for="ms-st-4">Label panjang</label><select id="ms-st-4" multiple data-ds-multiselect><option selected>Rekonsiliasi pendapatan kuartalan untuk anak perusahaan</option><option selected>Audit</option></select></div>
</div>
```

```html preview title="State daftar (dibekukan)"
<div style="max-width: 30rem; min-height: 19rem">
<div class="ds-multi-select ds-combobox" data-open data-filled>
  <div class="input ds-multi-select__field">
    <ul class="ds-multi-select__tokens" role="list">
      <li class="ds-token"><span class="ds-token__label">Ayu Lestari</span><button type="button" class="ds-token__remove" tabindex="-1" aria-label="Hapus Ayu Lestari"></button></li>
      <li class="ds-token"><span class="ds-token__label">Mei Tanaka</span><button type="button" class="ds-token__remove" tabindex="-1" aria-label="Hapus Mei Tanaka"></button></li>
    </ul>
    <input class="ds-multi-select__input" role="combobox" aria-expanded="true" aria-controls="ms-frozen" aria-label="Peninjau">
  </div>
  <div class="ds-combobox__buttons"><button type="button" class="ds-combobox__clear" aria-label="Kosongkan peninjau"></button><button type="button" class="ds-combobox__toggle" tabindex="-1" aria-label="Tampilkan pilihan peninjau"></button></div>
  <div class="ds-combobox-popup">
    <div class="ds-combobox-actions"><button type="button" tabindex="-1">Pilih semua</button><button type="button" tabindex="-1">Kosongkan</button></div>
    <ul class="ds-combobox-list" role="listbox" id="ms-frozen" aria-multiselectable="true" aria-label="Pilihan peninjau">
      <li class="ds-combobox-option" role="option" aria-selected="true"><span class="ds-combobox-option__text">Ayu Lestari<small>Terpilih</small></span></li>
      <li class="ds-combobox-option" role="option" aria-selected="false" data-active><span class="ds-combobox-option__text">Daniel Okafor<small>Disorot</small></span></li>
      <li class="ds-combobox-option" role="option" aria-selected="true"><span class="ds-combobox-option__text">Mei Tanaka</span></li>
      <li class="ds-combobox-option" role="option" aria-selected="false" aria-disabled="true"><span class="ds-combobox-option__text">Sofia Marquez<small>Tidak tersedia saat batas maksimum</small></span></li>
    </ul>
  </div>
</div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Empty | tidak ada yang dipilih | placeholder dengan `--ds-subtle` |
| Filled | satu atau lebih dipilih | chip di field, placeholder tersembunyi, tombol kosongkan semua terlihat |
| Focus | fokus di input teks | focus ring field (dari [Input](./input.md)); semua chip tampil |
| Open | klik, mengetik, Arrow Down | popup dengan Pilih semua / Kosongkan dan kotak centang pada setiap opsi |
| Option selected | Enter atau klik | kotak terisi warna primary dan tanda centang tergambar (180ms); daftar tetap terbuka |
| Highlighted | tombol panah atau pointer | isian tonal `--ds-primary-soft` |
| Maximum reached | `data-ds-multiselect-max` | opsi yang belum dipilih `aria-disabled`, "Anda dapat memilih paling banyak 3." diumumkan |
| Overflow | chip lebih banyak dari `data-ds-multiselect-visible`, field tidak difokuskan | chip pertama ditambah chip putus-putus "+N lagi" |
| Chip remove hover / focus | pointer atau tombol panah pada chip | state layer pada tombol ×; focus ring pada tombol, border chip `--ds-focus` |
| Invalid | `aria-invalid="true"`, atau wajib diisi dan kosong saat kirim | border galat, pesan di bawah |
| Disabled | `disabled` pada select | field diredupkan, chip tanpa aksi hapus, tanpa popup |
| Loading, empty, error | sumber async | seperti di [Combobox](./combobox.md) |

## Anatomi

- `.ds-multi-select.ds-combobox`: pembungkus (dibuat otomatis).
- `.ds-multi-select__field.input`: field yang membungkus chip dan input teks.
- `.ds-multi-select__tokens`: daftar chip `.ds-token` (`.ds-token__label`, `.ds-token__remove`, `.ds-token.is-more`).
- `.ds-multi-select__input[role="combobox"]`: input teks.
- `.ds-combobox__buttons`: kosongkan semua dan chevron.
- `.ds-combobox-popup`: `.ds-combobox-actions` dan `.ds-combobox-list[aria-multiselectable="true"]`.
- `select[multiple][hidden]`: mengirim nilai.

## Penggunaan

- Pakai untuk 8 opsi atau lebih; untuk yang lebih sedikit, grup checkbox lebih jelas.
- Urutkan chip sesuai urutan daftar, bukan urutan pemilihan, agar field mudah dibaca.
- Tetapkan maksimum hanya bila domainnya membutuhkan, dan sebutkan di petunjuk ("Pilih paling banyak 3.").
- Pakai `data-ds-multiselect-visible` pada form dan filter yang padat; jaga di angka 2 sampai 4.
- Jangan pakai untuk satu nilai; gunakan [Combobox](./combobox.md).

## Aksesibilitas

- Input teks adalah combobox ARIA 1.2 yang mengendalikan `listbox` dengan `aria-multiselectable="true"`; setiap opsi punya `aria-selected` true atau false. Sorotan memakai `aria-activedescendant`, sehingga fokus tetap di input.
- Setiap perubahan diumumkan: "Mei Tanaka dipilih, total 3 dipilih.", "… dihapus, total … dipilih.", "Pilihan dikosongkan.".
- Chip berupa daftar; tombol hapusnya berada di luar urutan Tab dan dijangkau dengan Arrow Left dari awal input, sehingga pilihan yang panjang tidak menambah perhentian Tab. Setiap tombol bernama "Hapus {label}".
- Kotak centang menunjukkan pilihan lewat isian dan tanda centang, tidak hanya warna. Chip dan tombol punya target minimum 24px.

| Tombol | Aksi |
| --- | --- |
| Arrow Down / Arrow Up | Membuka, lalu memindahkan sorotan (melewati opsi yang tidak tersedia) |
| Enter | Memilih atau membatalkan pilihan opsi yang disorot; daftar tetap terbuka |
| Ctrl/Cmd + A | Saat input kosong dan daftar terbuka: memilih semua opsi yang tampil (sampai batas maksimum) |
| Backspace | Saat input kosong: menghapus chip terakhir |
| Arrow Left | Di awal input: pindah ke tombol hapus chip terakhir |
| Arrow Left / Right pada chip | Berpindah antar chip; setelah chip terakhir, kembali ke input |
| Backspace / Delete / Enter pada chip | Menghapus chip itu |
| Escape | Menutup daftar; saat tertutup, menghapus teks yang diketik |
| Tab | Menutup daftar dan lanjut |

## Razor

Pakai helper select bawaan dengan properti koleksi:

```cshtml
<select asp-for="NotifyIds" asp-items="Model.People" multiple
        data-ds-multiselect data-ds-combobox-label="orang"
        data-ds-multiselect-max="5" placeholder="Pilih orang"></select>
```

ASP.NET Core menambahkan `multiple` otomatis untuk properti koleksi dan menandai opsi terpilih dari model.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `select[multiple][data-ds-multiselect]` | Menyempurnakan select |
| `data-ds-multiselect-max` | Jumlah maksimum pilihan |
| `data-ds-multiselect-visible` | Chip yang tampil selama field tidak difokuskan; sisanya dilipat menjadi "+N lagi" |
| `placeholder` | Tampil selama belum ada yang dipilih |
| Semua opsi `data-ds-combobox-*` | Label, create, sumber async, minimal karakter (lihat [Combobox](./combobox.md)) |

Event pada select: `input` dan `change` native, serta `ds:multiselect:change` `{ values }`. `DS.addComboboxOption(select, { value, label })` menambah dan memilih sebuah opsi. `select._dsCombobox.refresh()` membaca ulang opsi dan chip setelah Anda mengubahnya.

## Token

Field: seperti [Input](./input.md). Chip: `--color-base-200`, `--color-base-300`, `--ds-radius-md`, `--ds-type-footnote-size`, `--ds-opacity-state-pressed`, `--ds-press-scale`, `--ds-focus`, `--ds-error-soft`. Daftar: seperti [Combobox](./combobox.md), ditambah `--color-primary`, `--color-primary-content`, `--ds-control-border`, dan `--ds-radius-xs` untuk kotak centang.

## Native dan daisyUI

Dibangun di atas `<select multiple>`, yang bekerja tanpa JavaScript (Ctrl/Cmd-klik untuk memilih beberapa). Field adalah `.input` daisyUI yang dipakai sebagai kontainer (`height: auto`, membungkus). Chip adalah `.ds-token` milik DS, dipakai bersama dengan [Tags input](./tags-input.md); bukan badge daisyUI.
