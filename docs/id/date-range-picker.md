---
title: Date range picker
group: components
category: forms
order: 32
summary: Tanggal mulai dan selesai dalam satu field, dengan kalender dua bulan, pratinjau saat hover, dan pilihan cepat dwibahasa. Mengirim dua nilai yyyy-MM-dd.
source: TPS site.js enhanceRange
---

Date range picker mengumpulkan tanggal mulai dan tanggal selesai: periode laporan, masa menginap, masa kontrak. Keduanya tampil dalam satu field, membuka dua bulan berdampingan dengan pilihan cepat seperti "7 hari terakhir", dan menampilkan pratinjau pita saat pointer mencari tanggal selesai. Form mengirim dua nilai ISO dengan nama masing-masing. Untuk satu tanggal, gunakan [date picker](./date-picker.md).

Server merender `fieldset` dengan dua field `input type="date"` native, masing-masing dengan labelnya. Markup itu adalah cadangan tanpa JavaScript. ds.js menggabungkannya menjadi satu field, mempertahankan kedua input sebagai nilai ISO tersembunyi, dan memindahkan petunjuk serta pesan error keduanya ke bawah field gabungan.

## Contoh

### Periode laporan dengan pilihan cepat

```html preview title="Periode laporan"
<fieldset class="ds-fieldset" data-ds-date-range style="max-width:24rem">
  <legend>Periode laporan</legend>
  <div class="ds-date-range__fields">
    <div class="ds-field">
      <label for="dr-from">Tanggal mulai</label>
      <input id="dr-from" name="From" type="date" class="input" value="2026-10-01">
    </div>
    <div class="ds-field">
      <label for="dr-to">Tanggal selesai</label>
      <input id="dr-to" name="To" type="date" class="input" value="2026-10-31">
    </div>
  </div>
</fieldset>
```

### Pemesanan tanpa pilihan cepat, dengan batas

`data-ds-presets="none"` menghapus daftar pilihan cepat. `min` dan `max` pada salah satu input membatasi kedua ujung; kalender menonaktifkan hari di luarnya.

```html preview title="Menginap, mulai hari ini"
<fieldset class="ds-fieldset" data-ds-date-range data-ds-presets="none" style="max-width:24rem">
  <legend>Menginap</legend>
  <div class="ds-date-range__fields">
    <div class="ds-field">
      <label for="dr-in">Check-in</label>
      <input id="dr-in" name="CheckIn" type="date" class="input" min="2026-11-02" max="2027-06-30">
    </div>
    <div class="ds-field">
      <label for="dr-out">Check-out</label>
      <input id="dr-out" name="CheckOut" type="date" class="input" min="2026-11-02" max="2027-06-30">
    </div>
  </div>
  <p class="ds-hint">Maksimal 30 malam per pemesanan.</p>
</fieldset>
```

### Filter bar yang langsung mengirim

Dengan `data-ds-autosubmit`, form terkirim begitu kedua tanggal terisi, lewat pilihan cepat atau klik kedua. Pakai di filter bar, bukan di form entri data.

```html preview title="Filter dengan pilihan cepat tertentu"
<form class="ds-form" action="#" onsubmit="return false">
  <fieldset class="ds-fieldset" data-ds-date-range data-ds-autosubmit data-ds-presets="today,yesterday,last7,thisWeek,thisMonth,lastMonth" style="max-width:24rem">
    <legend class="ds-visually-hidden">Tanggal faktur</legend>
    <div class="ds-date-range__fields">
      <div class="ds-field"><label for="dr-f1">Dari</label><input id="dr-f1" name="IssuedFrom" type="date" class="input input-sm"></div>
      <div class="ds-field"><label for="dr-f2">Sampai</label><input id="dr-f2" name="IssuedTo" type="date" class="input input-sm"></div>
    </div>
  </fieldset>
</form>
```

## State

```html preview title="State"
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(19rem,1fr));gap:1.5rem">
  <fieldset class="ds-fieldset" data-ds-date-range>
    <legend>Kosong</legend>
    <div class="ds-date-range__fields">
      <div class="ds-field"><label for="drs-a1">Tanggal mulai</label><input id="drs-a1" type="date" class="input"></div>
      <div class="ds-field"><label for="drs-a2">Tanggal selesai</label><input id="drs-a2" type="date" class="input"></div>
    </div>
  </fieldset>
  <fieldset class="ds-fieldset" data-ds-date-range>
    <legend>Urutan tidak valid</legend>
    <div class="ds-date-range__fields">
      <div class="ds-field"><label for="drs-b1">Tanggal mulai</label><input id="drs-b1" type="date" class="input" value="2026-11-20"></div>
      <div class="ds-field"><label for="drs-b2">Tanggal selesai</label><input id="drs-b2" type="date" class="input" value="2026-11-20" aria-invalid="true" aria-describedby="drs-b2-error"><p class="ds-field-error" id="drs-b2-error">Tanggal selesai harus sama dengan atau sesudah tanggal mulai.</p></div>
    </div>
  </fieldset>
  <fieldset class="ds-fieldset" data-ds-date-range>
    <legend>Nonaktif</legend>
    <div class="ds-date-range__fields">
      <div class="ds-field"><label for="drs-c1">Tanggal mulai</label><input id="drs-c1" type="date" class="input" value="2026-09-01" disabled></div>
      <div class="ds-field"><label for="drs-c2">Tanggal selesai</label><input id="drs-c2" type="date" class="input" value="2026-09-30" disabled></div>
    </div>
  </fieldset>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Kosong | Tanpa tanggal | Dua petunjuk format dipisah en dash |
| Terisi | Kedua tanggal ada | Kedua tanggal dalam format numerik; tombol hapus; footer menampilkan rentang dan lamanya ("1 – 31 Okt 2026 · 31 hari") |
| Terbuka | Pemicu atau Alt + Arrow down | Pilihan cepat di sisi awal, dua bulan di sisi akhir (satu bulan dan baris pilihan cepat yang bisa digulir di bawah 640px) |
| Memilih tanggal selesai | Setelah klik pertama | Footer berbunyi "Sekarang pilih tanggal selesai."; pita mengikuti pointer dengan warna lebih terang dan ujung berkontur |
| Pilihan cepat aktif | Nilai sama dengan pilihan cepat | Pilihan cepat dengan warna seleksi dan tanda centang |
| Pilihan cepat tidak tersedia | Pilihan cepat jatuh di luar `min`/`max` | Pilihan cepat nonaktif dengan `--ds-opacity-disabled` |
| Tidak valid | Tanggal tak terbaca, di luar batas, selesai sebelum mulai, error server | Border error pada field, pesan di bawahnya |
| Nonaktif / hanya baca | Pada salah satu input native | Field nonaktif atau abu-abu, pemicu nonaktif |
| Tanpa JavaScript | ds.js atau Cally tidak ada | Dua field tanggal native dengan labelnya |

## Anatomi

- `fieldset[data-ds-date-range]` dengan `legend` — pengelompokan dan nama.
- `.ds-date-range__fields` — dua field native; disembunyikan setelah peningkatan.
- `.ds-date-range__control.input` — field gabungan: dua `.ds-date-range__input`, satu `.ds-date-range__dash`, `.ds-picker-clear`, `.ds-picker-trigger`.
- `.ds-picker-popover` — daftar `.ds-picker-presets`, `.ds-calendar` dengan `calendar-range` dan `.ds-calendar__months`, `.ds-picker-footer` dengan `.ds-picker-footer__note` yang live dan tombol Kosongkan.

## Penggunaan

- Tawarkan pilihan cepat yang sesuai tugas: laporan melihat ke belakang (7 hari terakhir, Bulan ini), pemesanan melihat ke depan (7 hari ke depan). Batasi daftar maksimal 6 item.
- Pakai `data-ds-autosubmit` hanya di filter bar; form entri data tetap memakai tombol Simpan yang eksplisit.
- Validasi urutan dan panjang maksimum di server juga; pesan di klien hanya kemudahan.
- Beri nama grup dengan `legend` ("Periode laporan"); kedua input tetap memakai label masing-masing untuk pembaca layar.
- Jangan pakai dua date picker terpisah untuk satu rentang: orang kehilangan gambaran keseluruhan rentangnya.

## Aksesibilitas

| Tombol | Aksi |
| --- | --- |
| Ketik di salah satu input | Memasukkan tanggal itu; dibaca saat Enter atau saat meninggalkan input |
| Alt + Arrow down | Membuka popover |
| Tab | Pilihan cepat, lalu header kalender dan grid hari, lalu Kosongkan |
| Enter / Space pada pilihan cepat | Menerapkannya dan menutup |
| Enter / Space pada hari | Penekanan pertama menetapkan tanggal mulai, yang kedua tanggal selesai; lalu popover menutup |
| Escape | Menutup tanpa perubahan |

- Tiap input ketikan diberi nama oleh labelnya sendiri ("Tanggal mulai", "Tanggal selesai"); pemicunya bernama "Pilih rentang tanggal"; dialog memakai legend ("Pilih Periode laporan").
- Catatan footer adalah live region polite: mengumumkan "Sekarang pilih tanggal selesai." setelah pilihan pertama dan rentang terpilih setelah pilihan kedua.
- Pilihan cepat memakai `aria-pressed` dan menampilkan tanda centang, sehingga yang aktif tidak ditandai hanya dengan warna.

## Razor

```cshtml
<ds-date-range-picker start-for="From" end-for="To" legend="Periode laporan"
                      presets="last7,last30,thisMonth,lastMonth" max="2026-12-31" />
```

Merender `fieldset`, legend, dua blok `ds-field` dengan label (display name dari model, jika tidak ada "Tanggal mulai" dan "Tanggal selesai"), input native dengan nilai model dan `data-val-*`, serta pesan validasi. Opsi: `start-name`/`end-name` dan `start-value`/`end-value` tanpa model, `hint`, `min`, `max`, `presets`, `autosubmit`, `time-zone`, `required`, `disabled`.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-date-range` | Pada container dengan tepat dua `input type="date"`: meningkatkannya |
| `data-ds-presets` | Key dipisah koma: `today`, `yesterday`, `last7`, `last30`, `next7`, `thisWeek`, `thisMonth`, `lastMonth`, `thisYear`; `none` menyembunyikan daftar. Bawaan `today,last7,last30,thisMonth,lastMonth,thisYear` |
| `data-ds-autosubmit` | Pada container atau form: mengirim saat rentang lengkap dipilih |
| `data-ds-disabled-dates`, `data-ds-disable-weekends`, `data-ds-time-zone` | Seperti pada [calendar](./calendar.md) |

```js
document.addEventListener("ds:daterange:change", (event) => {
  const { start, end } = event.detail; // "2026-10-01", "2026-10-31"
});
DS.picker.set("#dr-from", "2026-11-01", "2026-11-30");
```

Minggu dimulai pada hari pertama menurut locale. Rentang bersifat inklusif: "7 hari terakhir" adalah hari ini dan 6 hari sebelumnya.

## Token

Sama seperti [date picker](./date-picker.md) dan [calendar](./calendar.md), ditambah `--ds-radius-md` dan `--ds-radius-full` untuk pilihan cepat serta `--color-base-300` untuk pembatas pilihan cepat.

## Native dan daisyUI

Dua `input type="date"` native tetap menjadi field yang dikirim sekaligus cadangan. Field gabungan adalah `.input` daisyUI yang dipakai sebagai pembungkus. Kalender adalah `calendar-range` dari Cally dengan `.cally` daisyUI, dihaluskan seperti dijelaskan di halaman [calendar](./calendar.md).
