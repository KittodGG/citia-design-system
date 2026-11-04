---
title: Number input
group: components
category: forms
order: 5
summary: Field angka dengan tombol stepper, pengulangan saat ditekan lama, pembatasan min dan max, satuan, dan format lokal opsional.
---

Gunakan number input untuk jumlah dan nominal yang digeser atau diketik: kursi, item, persen, berat. Untuk nilai pada rentang tanpa pengetikan tepat pakai slider; untuk pengenal berupa angka (telepon, kode pos, kartu) pakai [input](./input.md) biasa dengan `inputmode="numeric"`, karena bukan angka yang dinaik-turunkan.

## Contoh

### Stepper

Field adalah input teks dengan `role="spinbutton"`, sehingga mengetik, menempel, dan pemisah lokal tetap bekerja. `data-ds-min`, `data-ds-max`, dan `data-ds-step` mengatur langkah. Tahan tombol: langkah pertama langsung, pengulangan mulai setelah 420ms dan mempercepat dari 150ms ke 35ms antarlangkah.

```html preview title="Stepper dengan batas"
<div class="ds-form" style="max-width:20rem">
  <div class="ds-field">
    <label for="num-1">Kursi</label>
    <div class="ds-input ds-number">
      <button type="button" class="ds-number__step" data-ds-step="-1" tabindex="-1" aria-controls="num-1" aria-label="Kurangi"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-minus"></use></svg></button>
      <input id="num-1" class="ds-input__control" value="5" inputmode="numeric" data-ds-min="1" data-ds-max="20" data-ds-step="1">
      <button type="button" class="ds-number__step" data-ds-step="1" tabindex="-1" aria-controls="num-1" aria-label="Tambah"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
    </div>
    <p class="ds-hint">Antara 1 dan 20.</p>
  </div>
</div>
```

### Satuan, desimal, dan stepper di akhir

Akhiran satuan dibacakan bersama nilai ("2,5 kg"). `is-trailing` memindahkan kedua tombol ke ujung untuk form padat. `data-ds-fixed` mempertahankan nol di belakang.

```html preview title="Satuan dan tombol di akhir"
<div class="ds-form" style="max-width:20rem">
  <div class="ds-field">
    <label for="num-2">Berat</label>
    <div class="ds-input ds-number is-trailing">
      <input id="num-2" class="ds-input__control" value="2.5" inputmode="decimal" data-ds-min="0" data-ds-max="100" data-ds-step="0.5" data-ds-fixed>
      <span class="ds-input__affix is-end">kg</span>
      <button type="button" class="ds-number__step" data-ds-step="-1" tabindex="-1" aria-controls="num-2" aria-label="Kurangi"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-minus"></use></svg></button>
      <button type="button" class="ds-number__step" data-ds-step="1" tabindex="-1" aria-controls="num-2" aria-label="Tambah"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
    </div>
  </div>
</div>
```

### Tampilan lokal

`data-ds-locale` pada pembungkus memformat nilai yang terlihat dengan bahasa halaman (atau bahasa yang Anda beri) dan membaca ketikan dengan pemisah yang sama: "1.250,5" dalam bahasa Indonesia, "1,250.5" dalam bahasa Inggris. Field mengirim angka polos lewat input tersembunyi yang mengambil alih `name`.

```html preview title="Format lokal"
<div class="ds-form" style="max-width:20rem">
  <div class="ds-field">
    <label for="num-3">Anggaran (IDR)</label>
    <div class="ds-input ds-number is-trailing" data-ds-locale>
      <input id="num-3" name="budget" class="ds-input__control" value="1250000" inputmode="decimal" data-ds-min="0" data-ds-step="50000" data-ds-big-step="500000">
      <button type="button" class="ds-number__step" data-ds-step="-1" tabindex="-1" aria-controls="num-3" aria-label="Kurangi"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-minus"></use></svg></button>
      <button type="button" class="ds-number__step" data-ds-step="1" tabindex="-1" aria-controls="num-3" aria-label="Tambah"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
    </div>
  </div>
</div>
```

## State

```html preview title="State angka"
<div class="ds-field-grid">
  <div class="ds-field"><label for="ns-1">Di minimum</label><div class="ds-input ds-number"><button type="button" class="ds-number__step" data-ds-step="-1" tabindex="-1" aria-controls="ns-1" aria-label="Kurangi"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-minus"></use></svg></button><input id="ns-1" class="ds-input__control" value="1" data-ds-min="1" data-ds-max="9"><button type="button" class="ds-number__step" data-ds-step="1" tabindex="-1" aria-controls="ns-1" aria-label="Tambah"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button></div></div>
  <div class="ds-field"><label for="ns-2">Nonaktif</label><div class="ds-input ds-number"><button type="button" class="ds-number__step" data-ds-step="-1" tabindex="-1" aria-controls="ns-2" aria-label="Kurangi"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-minus"></use></svg></button><input id="ns-2" class="ds-input__control" value="4" disabled><button type="button" class="ds-number__step" data-ds-step="1" tabindex="-1" aria-controls="ns-2" aria-label="Tambah"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button></div></div>
  <div class="ds-field"><label for="ns-3">Hanya baca</label><div class="ds-input ds-number"><input id="ns-3" class="ds-input__control" value="12" readonly></div></div>
  <div class="ds-field"><label for="ns-4">Tidak valid</label><div class="ds-input ds-number"><input id="ns-4" class="ds-input__control" value="0" aria-invalid="true" aria-describedby="ns-4-e"></div><p class="ds-field-error" id="ns-4-e">Isi jumlah minimal 1.</p></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest, hover, focus | Seperti [input](./input.md) | Tombol mendapat lapisan state 6% saat hover |
| Pressed | Pointer turun di tombol | Lapisan state 10%, langkah langsung berjalan |
| Holding | Pointer ditahan 420ms | Berulang, interval 150ms turun ke 35ms |
| At limit | Nilai di `data-ds-min` atau `-max` | Tombol itu `aria-disabled` (opasitas 55%, `not-allowed`) |
| Filled, placeholder | Ada nilai atau kosong | Angka tabular rata tengah |
| Disabled, read-only | `disabled`, `readonly` | Tombol tidak aktif dan redup |
| Invalid | `aria-invalid="true"` | Border dan ikon galat |
| Di luar rentang | Blur | Nilai dijepit ke batas dan `change` dipicu |
| Bukan angka | Blur | Kembali ke nilai valid terakhir |

## Anatomi

- `.ds-input.ds-number`: pembungkus (modifier `is-trailing`; atribut `data-ds-locale`).
- `.ds-number__step[data-ds-step="-1|1"]`: tombol stepper (persegi 44px).
- `.ds-input__control`: input teks dengan `role="spinbutton"`.
- `.ds-input__affix.is-end`: satuan.

## Penggunaan

- Isi `min`, `max`, dan `step` dengan batas nyata; stepper tanpa batas bisa mencapai nilai tidak masuk akal dalam hitungan detik saat ditahan.
- Simpan satuan sebagai afiks, tidak hanya di label, agar tetap di samping angka.
- Pakai `data-ds-big-step` untuk Page Up dan Page Down bila rentang berguna lebar.
- Jangan pakai stepper untuk nilai lebih dari sekitar 6 digit; ketik saja.
- Roda mouse tidak pernah mengubah nilai (field berupa teks, jadi menggulir halaman di atasnya aman).

## Aksesibilitas

Mengikuti pola spinbutton WAI-ARIA.

- `role="spinbutton"` dengan `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, dan `aria-valuetext` ("2,5 kg" bila ada satuan).
- Tombol bernama ("Kurangi", "Tambah"), punya `aria-controls`, dan tidak masuk urutan tab; field melakukan hal yang sama dengan tombol panah.
- Klik pointer melangkah sekali saat pointer turun; aktivasi tombol lewat keyboard atau pembaca layar melangkah sekali saat klik.
- Batas diumumkan oleh `aria-valuemin/max`; tombol nonaktif adalah `aria-disabled`, tidak dihapus.
- Target 44px. Reduced motion: hanya perubahan warna lapisan state.

| Tombol | Aksi |
| --- | --- |
| Panah Atas / Panah Bawah | Menambah / mengurangi satu langkah |
| Page Up / Page Down | Menambah / mengurangi satu langkah besar (bawaan 10 langkah) |
| Home / End | Mengatur ke minimum / maksimum bila ditentukan |
| Enter | Menetapkan nilai yang diketik (dan mengirim form, native) |
| Mengetik | Angka, pemisah desimal, dan minus di depan |

## Razor

```cshtml
<ds-field asp-for="Seats" type="number" min="1" max="20" step="1" />
<ds-field asp-for="Weight" type="number" min="0" max="100" step="0.5" unit="kg" trailing />
<ds-field asp-for="Budget" type="number" step="50000" locale />
```

Field dirender sebagai `type="text"` dengan `inputmode` dan batas `data-ds-*`; atribut `data-val-*` ASP.NET tetap berlaku.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-min`, `data-ds-max` | Batas (dijepit saat blur dan saat melangkah) |
| `data-ds-step`, `data-ds-big-step` | Langkah (bawaan 1) dan langkah Page Up/Down (bawaan 10 langkah) |
| `data-ds-decimals` | Jumlah desimal; bawaannya sesuai langkah |
| `data-ds-fixed` | Pertahankan nol di belakang |
| `data-ds-snap` | Bulatkan ke kisi langkah mulai dari minimum |
| `data-ds-locale` (pada pembungkus) | Format dan baca dengan bahasa halaman atau yang diberikan |

API: `DS.inputs.step(input, 1)`, `DS.inputs.setNumber(input, 12)`. Event: `ds:number:change` (`detail.value`, `detail.text`); `input` dan `change` standar juga dipicu.

## Token

`--ds-input-h` (dari `--ds-size-target`), `--color-base-300` untuk pembatas tombol, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-control-border`.

## Native dan daisyUI

Sengaja menggantikan `input[type=number]`: spinner native mengabaikan lokal, tidak bisa menampilkan satuan, dan berubah oleh roda mouse. Tanpa JavaScript field tetap input teks dengan `inputmode` yang benar; server harus memvalidasi.
