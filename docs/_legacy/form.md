---
title: Form dan field
group: Komponen
order: 2
summary: Anatomi field, input, pilihan, password, validasi, ringkasan galat, footer form, dan kotak rahasia sekali tampil dengan jarak 24 px antarkelompok.
source: TPS Styles/app.css L1696–1975, L2144–2347; DESIGN.md bagian Master data operasional dan Teks dan petunjuk
---

Label selalu di atas field. Galat tampil di bawah field dan diringkas di atas form. Petunjuk hanya ditulis bila format tidak bisa ditebak.

Daftar dengan lebih dari 4 pilihan atau bersumber dari data master memakai combobox, lihat [Combobox dan tanggal](combobox-dan-tanggal.md).

## Anatomi field {#field}

Satu `.ds-field` = label, kontrol, petunjuk (`.ds-hint`), dan pesan galat (`.ds-field-error`) dalam satu kolom. Elemen kosong disembunyikan (`:empty`), jadi markup boleh selalu menyertakan keduanya.

```html preview title="Form master Tangki"
<form class="ds-form" novalidate>
  <fieldset class="ds-fieldset">
    <legend>Identitas tangki</legend>
    <p class="ds-fieldset-help">Kolom wajib diisi kecuali yang bertanda opsional.</p>
    <div class="ds-field-grid">
      <div class="ds-field">
        <label for="form-tangki-kode">Kode tangki</label>
        <input id="form-tangki-kode" class="input" value="T-01" aria-describedby="form-tangki-kode-hint form-tangki-kode-error">
        <p id="form-tangki-kode-hint" class="ds-hint">Huruf kapital, contoh T-01.</p>
        <p id="form-tangki-kode-error" class="ds-field-error"></p>
      </div>
      <div class="ds-field">
        <label for="form-tangki-kapasitas">Kapasitas (TNE)</label>
        <input id="form-tangki-kapasitas" class="input" inputmode="decimal" value="5000">
      </div>
      <div class="ds-field">
        <label for="form-tangki-produk">Produk</label>
        <select id="form-tangki-produk" class="select">
          <option>Solar</option><option>Pertalite</option><option>Avtur</option>
        </select>
      </div>
      <div class="ds-field">
        <label for="form-tangki-gudang">Gudang <span class="ds-label-note">terkunci</span></label>
        <input id="form-tangki-gudang" class="input" value="Gudang Ciwandan" readonly>
      </div>
      <div class="ds-field is-wide">
        <label for="form-tangki-catatan">Catatan <span class="ds-label-note">opsional</span></label>
        <textarea id="form-tangki-catatan" class="textarea" rows="2"></textarea>
      </div>
    </div>
  </fieldset>
</form>
```

### Kelas

| Kelas | Pakai untuk |
| --- | --- |
| `.ds-form` | Kolom grid; jarak antarkelompok 24 px (`--ds-space-field-group`) |
| `.ds-fieldset` + `legend` | Kelompok field berjudul; `legend` memakai skala judul seksi |
| `.ds-fieldset-help` | Satu kalimat 14 px di bawah `legend` |
| `.ds-field-grid` | Dua kolom; satu kolom di ≤ 640 px |
| `.ds-field` | Satu field; `.is-wide` melebar penuh di dalam grid |
| `.ds-label-note` | Kata kecil sesudah label: "opsional", "terkunci" |
| `.ds-hint` / `.ds-field-error` | Petunjuk 13 px / galat 14 px berwarna `--ds-error-text` |
| `.ds-readonly-value` | Nilai tampilan saja dalam kotak berbentuk field, tanpa input palsu |

### Jarak dan tipografi

- 24 px antarkelompok field, 8 px antara label, kontrol, dan petunjuk.
- Label 15 px / 600. Petunjuk 13 px. Teks input 16 px.
- Tulis petunjuk hanya bila format tidak bisa ditebak, maksimal 60 karakter. Kolom Excel tidak dikutip.
- Satuan masuk ke label: "Kapasitas (TNE)", bukan petunjuk.

## Input, select, textarea

`.input`, `.select`, dan `.textarea` dari daisyUI, dengan penyesuaian DS:

- Border `--ds-control-border` (≥ 3:1 terhadap latar). Border galat memakai `--color-error`.
- Tinggi minimum 44 px; 48 px di dalam `.ds-field` (`--ds-size-control-lg`).
- Teks 16 px di ponsel (≤ 640 px), termasuk `input-sm` dan `select-sm`, agar iOS tidak memperbesar halaman saat fokus.
- `readonly` dan `select:disabled` di dalam `.ds-field` tetap terbaca penuh (tanpa opasitas) di atas latar `base-200`.

### State dan perilaku

| State | Yang berubah |
| --- | --- |
| Galat | `aria-invalid="true"`, `.is-invalid`, atau `.input-validation-error` mewarnai border merah |
| Readonly | Latar `base-200`, teks penuh. Beri `.ds-label-note` "terkunci" di label |
| Fokus | Cincin 2 px `--ds-focus` |

## Pilihan

Checkbox, radio, dan toggle memakai kelas daisyUI. Label yang membungkus checkbox atau radio memiliki tinggi minimum 44 px.

```html preview title="Baris pilihan dan kartu pilihan"
<div class="ds-form">
  <label class="ds-check-row">
    <input type="checkbox" class="checkbox" checked>
    <span><strong>Aktif</strong><small>Tangki nonaktif tidak muncul di form pemasukan.</small></span>
  </label>
  <div class="ds-choice-grid is-2" role="radiogroup" aria-label="Jenis tangki">
    <label class="ds-choice">
      <input type="radio" name="form-jenis" class="radio" checked>
      <span><strong>Timbun</strong><small>Penyimpanan jangka panjang.</small></span>
    </label>
    <label class="ds-choice">
      <input type="radio" name="form-jenis" class="radio">
      <span><strong>Transit</strong><small>Perpindahan antar tangki.</small></span>
    </label>
  </div>
</div>
```

`.ds-check-row` untuk satu opsi berjudul dan berpenjelasan. `.ds-choice` untuk pilihan yang seluruh kartunya adalah label; kartu terpilih ditandai `:has(:checked)` (border dan tint teal 6%) dan fokus keyboard `:has(:focus-visible)`. `.ds-choice-grid.is-2` menjadi satu kolom di ≤ 640 px.

## Pencarian

`.ds-search` membungkus ikon dan input. Ikon bersifat dekoratif (`aria-hidden`); nama aksesibel datang dari `aria-label` atau label tersembunyi.

```html preview title="Kolom cari"
<div class="ds-search">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
  <input type="search" class="input" placeholder="Cari kode atau pelanggan" aria-label="Cari tangki">
</div>
```

## Password

`.ds-password` menaruh tombol 44 px di dalam sisi kanan field. Tombol memakai `data-ds-password-toggle`, `aria-controls` ke id input, dan `aria-pressed`. Dua ikon bertanda `data-ds-password-icon="hidden"` (terlihat saat tersembunyi) dan `"shown"`.

```html preview title="Password dengan tombol lihat"
<div class="ds-field">
  <label for="form-pwd">Password</label>
  <div class="ds-password">
    <input id="form-pwd" type="password" class="input" autocomplete="current-password">
    <button type="button" class="ds-password-toggle" data-ds-password-toggle aria-controls="form-pwd" aria-pressed="false" aria-label="Tampilkan password">
      <svg class="ds-icon" data-ds-password-icon="hidden" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>
      <svg class="ds-icon" data-ds-password-icon="shown" aria-hidden="true" hidden><use href="#ds-icon-eye-off"></use></svg>
    </button>
  </div>
</div>
```

### State dan perilaku

Klik mengganti `type` antara `password` dan `text` dan memperbarui `aria-pressed`. Saat form dikirim, kolom yang sedang `text` dikembalikan ke `password` agar nilainya tidak tampak bila browser memulihkan halaman.

## Validasi

Aturan perilaku (diterapkan di aplikasi; ds.js v1 tidak menyertakan skrip validasi):

1. Tandai kolom `aria-invalid="true"` dan isi `.ds-field-error` saat gagal.
2. `aria-describedby` menunjuk id petunjuk dan id galat, dalam urutan itu.
3. Validasi saat `blur`, lalu validasi ulang di setiap `input` selama kolom masih tidak valid. Hapus `aria-invalid` dan kosongkan galat begitu valid.
4. Server tetap memvalidasi ulang; pesan server memakai kalimat yang sama.

```html preview title="Kolom bergalat"
<div class="ds-field">
  <label for="form-npwp">NPWP</label>
  <input id="form-npwp" class="input" value="01.234.567" aria-invalid="true" aria-describedby="form-npwp-hint form-npwp-error">
  <p id="form-npwp-hint" class="ds-hint">15 atau 16 digit, titik dan strip boleh.</p>
  <p id="form-npwp-error" class="ds-field-error">Periksa format NPWP. Ikuti petunjuk di bawah kolom.</p>
</div>
```

### Pesan

| Kasus | Pesan |
| --- | --- |
| Kosong | `{Label} wajib diisi.` → "Kode tangki wajib diisi." |
| Format salah | `Periksa format {label}. Ikuti petunjuk di bawah kolom.` |

Pesan menyebut kolomnya, singkat, tanpa nama layanan atau istilah XML. Jangan memakai warna merah saja: kata galat selalu tertulis.

### Razor

`asp-validation-for` menghasilkan `<span class="field-validation-error">`. Tambahkan `class="ds-field-error"`; tag helper menggabungkan kelasnya, dan `.ds-field-error` memberi gaya serta menyembunyikan span kosong. Kelas `input-validation-error` dari `asp-for` sudah diberi border merah oleh DS.

```cshtml
<div class="ds-field">
    <label asp-for="Code"></label>
    <input asp-for="Code" class="input"
           aria-describedby="Code-hint Code-error"
           aria-invalid="@(ViewData.ModelState["Code"]?.Errors.Count > 0 ? "true" : null)" />
    <p id="Code-hint" class="ds-hint">Huruf kapital, contoh T-01.</p>
    <span id="Code-error" asp-validation-for="Code" class="ds-field-error"></span>
</div>
```

## Ringkasan galat

Setelah submit gagal, tampilkan `.ds-error-summary` di atas form, beri `role="alert"` dan `tabindex="-1"`, lalu pindahkan fokus ke sana. Setiap butir menaut ke id field.

```html preview title="Ringkasan galat"
<div class="ds-error-summary" role="alert" tabindex="-1">
  <h2>Form belum bisa disimpan</h2>
  <p>Perbaiki 2 isian berikut.</p>
  <ul>
    <li><a href="#form-ringkasan-kode">Kode tangki wajib diisi.</a></li>
    <li><a href="#form-ringkasan-kapasitas">Periksa format kapasitas. Ikuti petunjuk di bawah kolom.</a></li>
  </ul>
</div>
```

## Informasi opsional

Isian tambahan dilipat di bawah isian wajib dengan `details.ds-optional-group`. `summary` setinggi 44 px; `<small>` di dalamnya rata kanan.

```html preview title="Grup opsional"
<details class="ds-optional-group">
  <summary>Informasi tambahan <small>opsional</small></summary>
  <div class="ds-field-grid">
    <div class="ds-field">
      <label for="form-pel-email">Email</label>
      <input id="form-pel-email" type="email" class="input" autocomplete="off">
    </div>
    <div class="ds-field">
      <label for="form-pel-telp">Telepon</label>
      <input id="form-pel-telp" type="tel" class="input" autocomplete="off">
    </div>
  </div>
</details>
```

## Footer form

`.ds-form-actions` berisi tautan Batal di kiri dan satu `div` aksi di kanan. Urutan: **Batal** · simpan · **utama**. Di ≤ 640 px `div` aksi menjadi `column-reverse`, aksi utama di atas. `.is-sticky` menempelkannya di dasar viewport untuk form panjang.

```html preview title="Footer form"
<div class="ds-form-actions">
  <a class="btn" href="#" data-ds-guard-skip>Batal</a>
  <div>
    <button type="submit" class="btn" data-ds-loading-label="Menyimpan…">Simpan &amp; tambah lagi</button>
    <button type="submit" class="btn btn-primary" data-ds-loading-label="Menyimpan…">Simpan pelanggan</button>
  </div>
</div>
```

Tombol dan status sibuk: lihat [Tombol](tombol.md).

## Rahasia sekali tampil

Kunci authenticator, tautan undangan, dan kode pemulihan hanya ditampilkan sekali. Nilai dipilih sekali klik (`user-select: all`), berfont monospace, dan disertai tombol salin.

```html preview title="Kunci dan kode pemulihan"
<div class="ds-secret">
  <p class="ds-secret-label" id="form-secret-label">Kunci authenticator</p>
  <p class="ds-secret-value" aria-labelledby="form-secret-label">JBSW Y3DP EHPK 3PXP</p>
  <button type="button" class="btn btn-sm" data-ds-copy-text="JBSWY3DPEHPK3PXP" data-ds-copy-message="Kunci disalin">Salin kunci</button>
</div>
<ul class="ds-codes" aria-label="Kode pemulihan">
  <li>7K2M-9QX4</li><li>B83N-1ZPL</li><li>4TVD-8RJC</li><li>X6HW-2MAE</li>
</ul>
```

> [!WARNING]
> Beri tahu pengguna bahwa nilai ini tidak akan tampil lagi. Jangan menyimpannya di log atau TempData jangka panjang.

## Jangan

- Jangan menaruh label di dalam field sebagai placeholder.
- Jangan menulis petunjuk untuk field yang formatnya jelas ("Isi nama pelanggan").
- Jangan mengosongkan seluruh form saat submit gagal; pertahankan isian pengguna.
- Jangan menonaktifkan tombol simpan sebagai pengganti pesan galat.
