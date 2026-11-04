---
title: Color picker
group: components
category: forms
order: 34
summary: Swatch yang membuka dialog warna sistem, field hex tervalidasi, swatch preset, eyedropper layar bila tersedia, dan catatan kontras opsional.
---

Color picker menetapkan satu warna: label proyek, warna merek untuk faktur, kategori kalender. Komponen ini membungkus `input type="color"` native, yang membuka dialog warna sistem operasi, lalu menambahkan hal yang tidak ada di dialog itu: field hex yang bisa ditempeli nilai, swatch preset untuk warna yang sudah dipakai produk Anda, eyedropper browser (EyeDropper API) bila tersedia, dan catatan kontras opsional. Form mengirim `#rrggbb`. Untuk memilih di antara beberapa opsi bernama yang kebetulan berwarna, pakai [radio group](./radio-group.md).

## Contoh

### Field hex dan preset

```html preview title="Warna label proyek"
<div class="ds-field" style="max-width:24rem">
  <label for="cp-label">Warna label</label>
  <div class="ds-color-picker" data-ds-color-picker data-ds-swatches="Teal #0f766e, Indigo #4338ca, Plum #86198f, Rose #be123c, Amber #b45309, Olive #4d7c0f, Slate #475569">
    <input id="cp-label" name="LabelColor" type="color" value="#4338ca" aria-describedby="cp-label-hint">
  </div>
  <p class="ds-hint" id="cp-label-hint">Tampil di kartu PRJ-1024 dan di laporan.</p>
</div>
```

### Catatan kontras

`data-ds-contrast-against` melaporkan rasio kontras WCAG warna terhadap latar, atau terhadap putih dan hitam dengan `auto` (yang lebih baik yang ditampilkan). Pakai bila warna membawa teks, seperti chip label.

```html preview title="Warna merek dengan kontras terhadap putih"
<div class="ds-field" style="max-width:24rem">
  <label for="cp-brand">Aksen faktur</label>
  <div class="ds-color-picker" data-ds-color-picker data-ds-contrast-against="#ffffff">
    <input id="cp-brand" name="InvoiceAccent" type="color" value="#0f766e">
  </div>
</div>
```

### Polos

Tanpa preset, picker hanya berisi swatch, field hex, dan eyedropper.

```html preview title="Polos"
<div class="ds-field" style="max-width:24rem">
  <label for="cp-plain">Warna kalender</label>
  <div class="ds-color-picker" data-ds-color-picker>
    <input id="cp-plain" name="CalendarColor" type="color" value="#b45309">
  </div>
</div>
```

## State

```html preview title="State"
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(17rem,1fr));gap:1.5rem">
  <div class="ds-field">
    <label for="cps-invalid">Hex tidak valid</label>
    <div class="ds-color-picker" data-ds-color-picker data-ds-contrast-against="auto"><input id="cps-invalid" type="color" value="#facc15" aria-invalid="true" aria-describedby="cps-invalid-error"></div>
    <p class="ds-field-error" id="cps-invalid-error">Tulis warna hex seperti #0F766E.</p>
  </div>
  <div class="ds-field">
    <label for="cps-low">Kontras rendah</label>
    <div class="ds-color-picker" data-ds-color-picker data-ds-contrast-against="#ffffff"><input id="cps-low" type="color" value="#f59e0b"></div>
  </div>
  <div class="ds-field">
    <label for="cps-dis">Nonaktif</label>
    <div class="ds-color-picker" data-ds-color-picker data-ds-swatches="#0f766e, #4338ca, #be123c"><input id="cps-dis" type="color" value="#0f766e" disabled></div>
  </div>
  <div class="ds-field">
    <label for="cps-native">Tanpa JavaScript (native)</label>
    <input id="cps-native" type="color" value="#0f766e">
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | — | Swatch bulat 44px dengan tepi dalam tipis, hex dalam huruf kapital monospace |
| Hover | Pointer di atas swatch atau preset | Tepi swatch menggelap; ukuran preset tidak berubah |
| Pressed | Pointer ditekan pada preset | `scale(var(--ds-press-scale))` |
| Focus-visible | Keyboard pada swatch, hex, preset, atau eyedropper | Ring `--ds-focus` 2px; preset mempertahankan offset 5px agar ring tidak menyentuh ring pilihan |
| Selected preset | Nilai sama dengan preset (`aria-checked="true"`) | Ring kedua yang dipisahkan oleh permukaan: bentuk, bukan hanya warna |
| Invalid | Hex yang bukan 3 atau 6 digit hex, `aria-invalid`, galat server | Border galat pada kotak hex dan sebuah pesan; nilai yang dikirim tetap warna valid terakhir |
| Contrast | `data-ds-contrast-against` | "Kontras dengan putih: 5,5:1, lolos AA" dengan sebuah titik; di bawah 3:1 catatan berubah menjadi teks galat |
| Disabled | `disabled` | Swatch, hex, preset, dan eyedropper pada `--ds-opacity-disabled` |
| No eyedropper | Browser tanpa EyeDropper, atau `data-ds-no-eyedropper` | Tombol tidak dirender |
| No JavaScript | ds.js tidak ada | Input warna native |

## Anatomi

- `.ds-color-picker`: pembungkus dengan `data-ds-color-picker`; menetapkan `--ds-swatch`.
- `.ds-color-picker__row`: `.ds-color-picker__swatch` (memuat input native, transparan dan berukuran penuh), `.ds-color-picker__hex.input` dengan `.ds-color-picker__hash` dan `.ds-color-picker__hex-input`, `.ds-color-picker__dropper`.
- `.ds-color-picker__swatches`: `role="radiogroup"` berisi `.ds-color-picker__preset` (`role="radio"`).
- `.ds-color-picker__contrast`: catatan kontras langsung.

## Penggunaan

- Sediakan 5 sampai 10 preset dari palet produk Anda, dengan nama ("Teal", bukan "#0F766E") agar pembaca layar mengucapkan sesuatu yang bermakna.
- Tampilkan catatan kontras setiap kali warna akan membawa teks, dan uji terhadap latar yang sebenarnya.
- Simpan dan kirim `#rrggbb` dalam huruf kecil; terima `#RGB` dan nilai tempelan dengan atau tanpa `#`.
- Jangan memakai warna saja untuk mengenali item yang dipilih dengan cara ini; pasangkan warna dengan nama di UI.

## Aksesibilitas

| Tombol | Aksi |
| --- | --- |
| Tab | Swatch (membuka dialog sistem dengan Enter atau Space), field hex, eyedropper, lalu preset terpilih |
| Arrow keys pada preset | Memindahkan dan memilih preset sebelumnya / berikutnya (roving focus, satu tab stop) |
| Space pada preset | Memilihnya |
| Mengetik atau menempel di field hex | Swatch mengikuti begitu 3 atau 6 digit valid; pesan muncul saat meninggalkan field |

- Label field menamai input hex (input itu mengambil `id`); swatch bernama "Buka pemilih warna"; eyedropper bernama "Ambil warna dari layar".
- Catatan kontras adalah live region polite dan menyebutkan tingkatnya dengan kata-kata.

## Razor

```cshtml
<ds-field asp-for="LabelColor" hint="Tampil di kartu proyek dan di laporan.">
    <ds-color-picker asp-for="LabelColor" swatches="Teal #0f766e, Indigo #4338ca, Rose #be123c" contrast-against="auto" />
</ds-field>
```

Opsi: `name`, `value`, `swatches`, `contrast-against` (hex atau `auto`), `no-eyedropper`, `disabled`. Nilai model bertipe string ditulis dalam huruf kecil.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-color-picker` | Pada pembungkus `input type="color"`: aktifkan peningkatan |
| `data-ds-swatches` | "Nama #hex, Nama #hex"; nama bersifat opsional |
| `data-ds-contrast-against` | Warna hex atau `auto` |
| `data-ds-no-eyedropper` | Jangan pernah tampilkan eyedropper |

```js
document.addEventListener("ds:colorpicker:change", (event) => console.log(event.detail.value)); // "#4338ca"
DS.picker.set("#cp-label", "#be123c");
```

## Token

`--ds-size-target`, `--ds-radius-lg`, `--ds-radius-full`, `--ds-font-mono`, `--ds-press-scale`, `--ds-focus`, `--ds-subtle`, `--ds-muted`, `--ds-success-text`, `--ds-error-text`, `--color-warning`, `--ds-opacity-disabled`. Variabel lokal `--ds-swatch` menyimpan warna saat ini.

## Native dan daisyUI

Dibangun di atas `input type="color"`, yang mempertahankan nama, nilai yang dikirim, dan dialog sistem; design system menyembunyikan chrome-nya sendiri dan membiarkan swatch menampilkan warna. Kotak hex adalah `.input` milik daisyUI sebagai pembungkus; eyedropper memakai `btn btn-ghost btn-square`. daisyUI tidak punya color picker.
