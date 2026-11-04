---
title: Fieldset
group: components
category: forms
order: 9
summary: Kelompok kontrol berjudul dengan bantuan grup, galat grup, dan state nonaktif yang menurun ke setiap kontrol di dalamnya.
source: TPS app.css .master-fieldset
---

Fieldset mengelompokkan kontrol yang bersama-sama menjawab satu pertanyaan: alamat, pilihan pengiriman, rentang tanggal. Legend-nya memberi nama grup bagi teknologi bantu. Gunakan [field](./field.md) untuk satu kontrol. Untuk satu form utuh gunakan [form](./form.md).

## Contoh

### Legend dan bantuan

```html preview title="Grup alamat"
<fieldset class="ds-fieldset">
  <legend>Alamat pengiriman</legend>
  <p class="ds-fieldset-help">Dipakai untuk faktur dan kurir.</p>
  <div class="ds-field-grid">
    <div class="ds-field is-wide"><label for="fs-street">Jalan</label><input id="fs-street" class="input" value="Jl. Sudirman 45" autocomplete="address-line1"></div>
    <div class="ds-field"><label for="fs-city">Kota</label><input id="fs-city" class="input" value="Jakarta" autocomplete="address-level2"></div>
    <div class="ds-field"><label for="fs-zip">Kode pos</label><input id="fs-zip" class="input" value="10220" inputmode="numeric" autocomplete="postal-code"></div>
  </div>
</fieldset>
```

### Galat grup

Bila masalahnya milik grup (tidak ada yang dipilih, tanggal akhir sebelum tanggal awal), taruh galat di bawah legend dan arahkan `aria-describedby` ke sana. Tandai fieldset `aria-invalid="true"` agar legend berwarna galat.

```html preview title="Galat grup"
<fieldset class="ds-fieldset" aria-invalid="true" aria-describedby="fsg-e">
  <legend>Beri tahu saya lewat</legend>
  <p class="ds-field-error" id="fsg-e">Pilih setidaknya satu cara pemberitahuan.</p>
  <div class="ds-form" style="margin-top:.75rem">
    <label class="ds-check-row"><input type="checkbox" class="checkbox"><span><strong>Email</strong></span></label>
    <label class="ds-check-row"><input type="checkbox" class="checkbox"><span><strong>SMS</strong></span></label>
  </div>
</fieldset>
```

### Berbingkai dan nonaktif

`is-boxed` menggambar bingkai tipis untuk grup di form panjang. `disabled` pada fieldset menonaktifkan setiap kontrol di dalamnya secara native dan meredupkan grup; legend tetap terbaca.

```html preview title="Berbingkai dan nonaktif"
<div class="ds-form" style="max-width:30rem">
  <fieldset class="ds-fieldset is-boxed">
    <legend>Kontak penagihan</legend>
    <div class="ds-field"><label for="fb-1">Nama</label><input id="fb-1" class="input" value="Ayu Lestari"></div>
  </fieldset>
  <fieldset class="ds-fieldset is-boxed" disabled>
    <legend>Persetujuan (terkunci setelah diajukan)</legend>
    <div class="ds-field"><label for="fb-2">Pemberi persetujuan</label><input id="fb-2" class="input" value="Daniel Okafor"></div>
    <label class="ds-check-row"><input type="checkbox" class="checkbox" checked><span><strong>Disetujui</strong></span></label>
  </fieldset>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Legend 17px/650, bantuan 14px `--ds-subtle`, tanpa bingkai |
| Boxed | `is-boxed` | Bingkai 1px `--color-base-300`, radius 8px, padding 20px |
| Invalid | `aria-invalid="true"` | Legend berwarna `--ds-error-text`; galat grup dengan ikon di bawah legend |
| Disabled | `disabled` | Isi opasitas 55%, kursor `not-allowed`, kontrol tidak aktif dan dilewati Tab |
| Focus | Kontrol di dalam | Kontrol menampilkan ringnya sendiri; grup tanpa ring |
| Hover, pressed | Tidak ada | Fieldset tidak interaktif |
| Loading | `aria-busy` pada form induk | Form memblokir pengiriman; grup tampak tidak berubah |

## Anatomi

- `fieldset.ds-fieldset` (modifier `is-boxed`).
- `legend`: nama grup (anak pertama).
- `.ds-fieldset-help`: satu kalimat di bawah legend.
- `.ds-field-error`: galat grup.
- `.ds-field-grid` atau `.ds-form`: tata letak kontrol.

## Penggunaan

- Pakai fieldset untuk grup radio, grup checkbox, blok alamat, dan rentang. Jangan dipakai untuk menggambar kotak di sekitar field yang tidak berkaitan.
- Jaga legend di bawah 40 karakter berupa kata benda atau pertanyaan ("Alamat pengiriman"), bukan "Detail".
- Jaga bantuan grup satu kalimat; petunjuk per field ditaruh di field.
- Pakai `disabled` pada fieldset, bukan menonaktifkan kontrol satu per satu.
- Jangan menumpuk fieldset lebih dari satu tingkat.

## Aksesibilitas

- `fieldset` dan `legend` diumumkan sebagai grup: "Alamat pengiriman, group". Grup radio dan checkbox membutuhkannya.
- `aria-describedby` pada fieldset memuat id bantuan, lalu id galat, sehingga deskripsi grup dibacakan saat fokus masuk.
- Galat grup memakai `aria-live="polite"`.
- Fieldset nonaktif mengeluarkan kontrolnya dari urutan tab dan dari pengiriman; bila orang perlu membaca dan menyalin nilai, pakai field `readonly`.
- Reduced motion: tidak ada animasi di sini.

| Tombol | Aksi |
| --- | --- |
| Tab | Berpindah antarkontrol di dalam; fieldset nonaktif dilewati |

## Razor

```cshtml
<ds-fieldset legend="Beri tahu saya lewat" help="Pilih setidaknya satu." error="@ViewData["NotifyError"]?.ToString()" boxed>
    <ds-field asp-for="Email" label="Email" />
</ds-fieldset>
<ds-fieldset legend="Persetujuan" disabled>...</ds-fieldset>
```

## Token

`--ds-type-section-*`, `--ds-subtle`, `--ds-error-text`, `--color-base-300`, `--ds-radius-lg`, `--ds-opacity-disabled`, `--ds-space-field-group`.

## Native dan daisyUI

Dibangun di atas `fieldset` dan `legend`. DS mengatur ulang model padding `.fieldset` daisyUI, memakai peran tipe section untuk legend, dan menambah galat grup, boxed, serta perlakuan disabled.
