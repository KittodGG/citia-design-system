---
title: Time picker
group: components
category: forms
order: 33
summary: Segmen jam, menit, dan detik opsional dengan langkah tombol panah, 12 atau 24 jam sesuai bahasa halaman, dan cadangan native yang mengirim HH:mm.
---

Time picker mengumpulkan jam dalam sehari: awal rapat, slot penjemputan, jam buka. Field menampilkan satu segmen per satuan (jam, menit, opsional detik, dan AM/PM bila bahasanya memakai jam 12). Orang mengetik angka dan fokus berpindah sendiri, atau menaikkan dan menurunkan segmen dengan tombol panah. Form mengirim `HH:mm` (24 jam) di semua bahasa. Untuk tanggal, gunakan [date picker](./date-picker.md); untuk durasi ("2 jam 30 menit"), gunakan [number input](./number-input.md) dengan satuan.

Server merender `input type="time"` native; tanpa JavaScript input itu tetap tampil dan mengirim nilai yang sama.

## Contoh

### 24 jam dan 12 jam

Jam mengikuti bahasa halaman: `id` dan `en-GB` memakai 24 jam, `en` (Amerika Serikat) memakai AM/PM. `data-ds-hour-cycle` menimpanya. Pemisah juga mengikuti bahasa (`14.30` dalam bahasa Indonesia).

```html preview title="Awal rapat"
<div style="display:flex;flex-wrap:wrap;gap:1.5rem">
  <div class="ds-field" style="width:12rem">
    <label for="tp-start">Jam mulai</label>
    <div class="ds-time-picker" data-ds-time-picker data-ds-hour-cycle="24">
      <input id="tp-start" name="StartTime" type="time" class="input" value="14:30">
    </div>
  </div>
  <div class="ds-field" style="width:12rem">
    <label for="tp-start12">Jam mulai (12 jam)</label>
    <div class="ds-time-picker" data-ds-time-picker data-ds-hour-cycle="12">
      <input id="tp-start12" name="StartTime12" type="time" class="input" value="14:30">
    </div>
  </div>
</div>
```

### Langkah dan batas

`step` dalam detik, seperti pada input native: `900` menaikkan menit per 15. `min` dan `max` menetapkan jam operasional; jam di luarnya mendapat pesan.

```html preview title="Slot penjemputan, tiap 15 menit, 08:00–17:00"
<div class="ds-field" style="width:12rem">
  <label for="tp-pickup">Jam penjemputan</label>
  <div class="ds-time-picker" data-ds-time-picker data-ds-hour-cycle="24">
    <input id="tp-pickup" name="PickupTime" type="time" class="input" step="900" min="08:00" max="17:00" aria-describedby="tp-pickup-hint">
  </div>
  <p class="ds-hint" id="tp-pickup-hint">Tiap 15 menit antara 08:00 dan 17:00.</p>
</div>
```

### Dengan detik

`step` di bawah 60, nilai yang memuat detik, atau `data-ds-seconds` menambahkan segmen detik; nilai dikirim sebagai `HH:mm:ss`.

```html preview title="Stempel waktu log"
<div class="ds-field" style="width:12rem">
  <label for="tp-log">Jam kejadian</label>
  <div class="ds-time-picker" data-ds-time-picker data-ds-hour-cycle="24">
    <input id="tp-log" name="EventTime" type="time" class="input" step="1" value="09:41:07">
  </div>
</div>
```

## State

```html preview title="State"
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(12rem,1fr));gap:1.5rem">
  <div class="ds-field"><label for="tps-empty">Kosong</label><div class="ds-time-picker" data-ds-time-picker><input id="tps-empty" type="time" class="input"></div></div>
  <div class="ds-field"><label for="tps-filled">Terisi</label><div class="ds-time-picker" data-ds-time-picker><input id="tps-filled" type="time" class="input" value="08:15"></div></div>
  <div class="ds-field"><label for="tps-invalid">Tidak valid</label><div class="ds-time-picker" data-ds-time-picker><input id="tps-invalid" type="time" class="input" value="19:00" aria-invalid="true" aria-describedby="tps-invalid-error"></div><p class="ds-field-error" id="tps-invalid-error">Pilih waktu 17:00 atau sebelumnya.</p></div>
  <div class="ds-field"><label for="tps-ro">Hanya baca</label><div class="ds-time-picker" data-ds-time-picker><input id="tps-ro" type="time" class="input" value="12:00" readonly></div></div>
  <div class="ds-field"><label for="tps-dis">Nonaktif</label><div class="ds-time-picker" data-ds-time-picker><input id="tps-dis" type="time" class="input" value="12:00" disabled></div></div>
  <div class="ds-field"><label for="tps-sm">Kecil</label><div class="ds-time-picker" data-ds-time-picker><input id="tps-sm" type="time" class="input input-sm" value="07:45"></div></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Kosong | Tanpa nilai | Tiap segmen menampilkan `––` dengan `--ds-subtle` |
| Focus | Sebuah segmen difokus | Kotak menampilkan focus ring field; segmen mendapat isian primary tonal (tanpa caret) |
| Terisi | Semua segmen terisi | Angka tabular dua digit, pemisah sesuai bahasa |
| Terisi sebagian | Sebagian segmen kosong | Nilai tidak dikirim; saat meninggalkan field: "Isi jam dan menit." |
| Tidak valid | Di luar `min`/`max`, terisi sebagian, `aria-invalid`, error server | Border error, pesan di bawahnya |
| Hanya baca | `readonly` | Permukaan abu-abu, segmen tidak berubah |
| Nonaktif | `disabled` | `--ds-opacity-disabled`, tidak bisa difokus, tidak dikirim |
| Tanpa JavaScript | ds.js tidak ada | Input waktu native |

## Anatomi

- `.ds-time-picker` — pembungkus dengan `data-ds-time-picker`; memuat input native (tersembunyi setelah peningkatan).
- `.ds-time-picker__control.input` — kotak field, `role="group"` yang diberi nama oleh label.
- `.ds-time-picker__segments` — segmen-segmennya: `.ds-time-picker__segment` (`role="spinbutton"`), `.is-period` untuk AM/PM, `.ds-time-picker__sep`.
- `.ds-picker-trigger` — ikon jam dekoratif.

## Penggunaan

- Pakai langkah 15 atau 30 menit untuk janji temu; orang jarang membutuhkan menit satuan.
- Cantumkan zona waktu di label bila orang bekerja lintas zona ("Jam penjemputan (WIB)").
- Jadikan server sebagai sumber kebenaran untuk jam operasional; `min`/`max` hanya kemudahan.
- Jangan pakai time picker untuk durasi atau untuk daftar slot tetap; untuk 4 sampai 12 slot tetap, [radio group](./radio-group.md) atau [segmented control](./segmented-control.md) lebih cepat.

## Aksesibilitas

Setiap segmen adalah `input` dengan `role="spinbutton"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, dan `aria-valuetext` ("Kosong" bila belum diisi), bernama "Jam", "Menit", "Detik", atau "AM atau PM". Grup membawa label field. `for` pada label menunjuk ke segmen jam, sehingga klik pada label dimulai dari sana. Segmen memakai `inputmode="numeric"`, sehingga ponsel menampilkan keypad angka.

| Tombol | Aksi |
| --- | --- |
| Angka | Mengisi segmen; setelah dua digit, atau satu digit yang tidak bisa mengawali pasangan valid (3–9 untuk jam), fokus pindah ke segmen berikutnya |
| Arrow up / down | Nilai berikutnya / sebelumnya menurut langkah, berputar (23 → 00) |
| Page Up / Page Down | Jam per 3, menit dan detik per 2 langkah |
| Home / End | Nilai terendah / tertinggi |
| Arrow left / right | Segmen sebelumnya / berikutnya |
| `:` `.` atau spasi | Segmen berikutnya |
| Backspace / Delete | Mengosongkan segmen |
| A / P | AM / PM pada segmen periode |

## Razor

```cshtml
<ds-field asp-for="PickupTime" hint="Tiap 15 menit antara 08:00 dan 17:00.">
    <ds-time-picker asp-for="PickupTime" step="900" min="08:00" max="17:00" />
</ds-field>
```

Nilai model `TimeOnly`, `TimeSpan`, dan `DateTime` ditulis sebagai `HH:mm` (dengan `seconds`, `HH:mm:ss`). Opsi: `name`, `value`, `min`, `max`, `step` (detik), `seconds`, `hour-cycle` (`12` atau `24`), `size`, `required`, `disabled`, `readonly`.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-time-picker` | Pada pembungkus di sekitar `input type="time"` (atau pada input): meningkatkannya |
| `data-ds-hour-cycle` | `12` atau `24`; bawaannya dari `Intl` untuk bahasa halaman |
| `data-ds-seconds` | Selalu tampilkan detik |
| `step`, `min`, `max`, `required`, `readonly`, `disabled` | Dibaca dari input native |

```js
document.addEventListener("ds:timepicker:change", (event) => console.log(event.detail.value)); // "14:30" atau ""
DS.picker.set("#tp-start", "09:00");
```

## Token

`--ds-opacity-state-selected` (fokus segmen), `--ds-subtle` (placeholder dan pemisah), `--ds-radius-sm`, `--ds-duration-fast`, `--ds-ease-standard`, `--ds-opacity-disabled`, ditambah token [input](./input.md).

## Native dan daisyUI

Berawal dari `input type="time"`, yang tampilan dan perilaku 12/24 jamnya bergantung pada browser dan sistem operasi, bukan bahasa halaman. Field yang ditingkatkan memakai `.input` daisyUI sebagai pembungkus, sehingga ukuran dan state field sama dengan input lain.
