---
title: Date picker
group: components
category: forms
order: 31
summary: Field tanggal yang bisa diketik, dengan popover kalender, petunjuk format, aksi kosongkan dan hari ini. Mengirim yyyy-MM-dd dan kembali ke input native.
source: TPS site.js enhanceDate; app.css L1244–1273
---

Date picker adalah field teks untuk satu tanggal ditambah tombol yang membuka [calendar](./calendar.md) dalam popover. Orang yang hafal tanggalnya mengetik ("14/05/2026", "14 Mei 2026", "14052026"); orang yang perlu melihat bulan memilihnya. Form selalu mengirim tanggal ISO (`2026-05-14`), apa pun bahasa yang tampil di halaman. Untuk tanggal mulai dan selesai, gunakan [date range picker](./date-range-picker.md); untuk jam, gunakan [time picker](./time-picker.md).

Server merender `input type="date"` native. ds.js mempertahankannya sebagai field ISO tersembunyi lalu menambahkan field ketik, pemicu, dan popover. Tanpa JavaScript, atau di browser tanpa dukungan popover, input tanggal native tetap tampil dan tetap mengirim `yyyy-MM-dd`.

## Contoh

### Bawaan

Placeholder adalah petunjuk format sesuai bahasa halaman (`mm/dd/yyyy` untuk `en`, `dd/mm/yyyy` untuk `en-GB`, `hh/bb/tttt` untuk bahasa Indonesia). Pilih tombol kalender atau tekan Alt + Arrow down di dalam field.

```html preview title="Tenggat"
<div class="ds-field" style="max-width:20rem">
  <label for="dp-due">Tenggat</label>
  <div class="ds-date-picker" data-ds-date-picker>
    <input id="dp-due" name="DueDate" type="date" class="input" value="2026-11-30" aria-describedby="dp-due-hint dp-due-error">
  </div>
  <p class="ds-hint" id="dp-due-hint">Klien melihat tanggal ini pada faktur INV-2026-0418.</p>
  <p class="ds-field-error" id="dp-due-error"></p>
</div>
```

### Batas dan hari yang tidak tersedia

`min` dan `max` berasal dari input native. Hari di luar batas dinonaktifkan di kalender, dan tanggal ketikan di luar batas mendapat pesan yang menyebut batasnya. Akhir pekan dan tanggal tertentu dapat dibuat tidak tersedia.

```html preview title="Tanggal pengiriman, hanya hari kerja"
<div class="ds-field" style="max-width:20rem">
  <label for="dp-delivery">Tanggal pengiriman</label>
  <div class="ds-date-picker" data-ds-date-picker data-ds-disable-weekends data-ds-disabled-dates="2026-12-24 2026-12-25">
    <input id="dp-delivery" name="DeliveryDate" type="date" class="input" min="2026-11-03" max="2027-01-31" required aria-describedby="dp-delivery-hint dp-delivery-error">
  </div>
  <p class="ds-hint" id="dp-delivery-hint">Senin sampai Jumat, mulai 3 Nov 2026.</p>
  <p class="ds-field-error" id="dp-delivery-error"></p>
</div>
```

### Ukuran

Class ukuran pada input native diteruskan ke kotak field.

```html preview title="Kecil, sedang, besar"
<div style="display:grid;gap:1rem;max-width:20rem">
  <div class="ds-date-picker" data-ds-date-picker><input type="date" class="input input-sm" aria-label="Tanggal mulai, kecil" value="2026-11-02"></div>
  <div class="ds-date-picker" data-ds-date-picker><input type="date" class="input" aria-label="Tanggal mulai, sedang" value="2026-11-02"></div>
  <div class="ds-date-picker" data-ds-date-picker><input type="date" class="input input-lg" aria-label="Tanggal mulai, besar" value="2026-11-02"></div>
</div>
```

### Tanggal lahir

Untuk tanggal yang jauh di masa lalu, buka kalender lalu pilih judulnya untuk melompat per tahun dan bulan, atau ketik tanggalnya.

```html preview title="Tanggal lahir"
<div class="ds-field" style="max-width:20rem">
  <label for="dp-birth">Tanggal lahir</label>
  <div class="ds-date-picker" data-ds-date-picker>
    <input id="dp-birth" name="BirthDate" type="date" class="input" min="1920-01-01" max="2010-12-31" value="1991-07-23">
  </div>
</div>
```

## State

```html preview title="State"
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(15rem,1fr));gap:1.5rem">
  <div class="ds-field">
    <label for="dps-empty">Kosong</label>
    <div class="ds-date-picker" data-ds-date-picker><input id="dps-empty" type="date" class="input"></div>
  </div>
  <div class="ds-field">
    <label for="dps-filled">Terisi</label>
    <div class="ds-date-picker" data-ds-date-picker><input id="dps-filled" type="date" class="input" value="2026-11-12"></div>
  </div>
  <div class="ds-field">
    <label for="dps-invalid">Tidak valid</label>
    <div class="ds-date-picker" data-ds-date-picker><input id="dps-invalid" type="date" class="input" aria-invalid="true" aria-describedby="dps-invalid-error"></div>
    <p class="ds-field-error" id="dps-invalid-error">Tulis tanggal dengan format hh/bb/tttt.</p>
  </div>
  <div class="ds-field">
    <label for="dps-readonly">Hanya baca</label>
    <div class="ds-date-picker" data-ds-date-picker><input id="dps-readonly" type="date" class="input" value="2026-10-01" readonly></div>
  </div>
  <div class="ds-field">
    <label for="dps-disabled">Nonaktif</label>
    <div class="ds-date-picker" data-ds-date-picker><input id="dps-disabled" type="date" class="input" value="2026-10-01" disabled></div>
  </div>
  <div class="ds-field">
    <label for="dps-native">Tanpa JavaScript (native)</label>
    <input id="dps-native" type="date" class="input" value="2026-11-12">
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Kosong | Tanpa nilai | Petunjuk format sebagai placeholder dengan `--ds-subtle`; tanpa tombol hapus |
| Hover | Pointer di atas field atau pemicu | Border field seperti [input](./input.md); pemicu mendapat state layer hover |
| Focus | Mengetik di field | Focus ring pada kotak input (`:focus-within`) |
| Terisi | Ada nilai | Tanggal dalam format numerik bahasa halaman, angka tabular; tombol hapus (x) muncul |
| Terbuka | Popover tampil | Pemicu `aria-expanded="true"`, isian primary tonal; popover masuk dalam 220ms, 5px dari field, skala 0,98 |
| Menutup | Escape, klik di luar, Tab keluar, memilih tanggal | Popover keluar dalam 140ms dengan easing keluar; fokus kembali ke pemicu |
| Tidak valid | Teks tak terbaca, tanggal di luar `min`/`max`, tanggal tidak tersedia, `aria-invalid`, error server | Border error, pesan dengan ikon di bawahnya, terhubung lewat `aria-describedby` |
| Hanya baca | `readonly` pada input native | Permukaan abu-abu, nilai bisa diseleksi, pemicu nonaktif |
| Nonaktif | `disabled` pada input native | `--ds-opacity-disabled`, tanpa pemicu, tidak dikirim |
| Ponsel | Viewport di bawah 640px | Popover menjadi bottom sheet dengan scrim, naik selama 500ms |
| Tanpa JavaScript | ds.js atau Cally tidak ada | Input tanggal native, tetap mengirim `yyyy-MM-dd` |

## Anatomi

- `.ds-date-picker` — pembungkus dengan `data-ds-date-picker`; memuat input native (nilai ISO tersembunyi setelah peningkatan).
- `.ds-date-picker__control.input` — kotak field.
- `.ds-date-picker__input` — teks yang diketik; mengambil `id`, ARIA, dan atribut validasi dari input native.
- `.ds-picker-clear` — tombol hapus, hanya bila ada nilai.
- `.ds-picker-trigger` — tombol kalender (`aria-haspopup="dialog"`, `aria-expanded`).
- `.ds-picker-popover` — popover (`role="dialog"`) berisi `.ds-calendar` dan `.ds-picker-footer` (Kosongkan, Hari ini).

## Penggunaan

- Biarkan orang mengetik. Jangan menjadikan field read-only demi memaksa pemakaian kalender.
- Pakai format numerik bahasa halaman di dalam field dan format menengah di pesan ("12 Nov 2026"). Jangan menambah petunjuk yang mengulang placeholder.
- Tetapkan `min`, `max`, dan tanggal yang tidak tersedia di markup agar kalender menonaktifkannya sebelum ada yang memilih hari yang salah.
- Kirim tanggal ISO dan parse di server dengan `DateOnly`. Jangan pernah mengirim teks yang ditampilkan.
- Cantumkan zona waktu di label bila penting ("Tanggal penjemputan (WIB)") dan berikan `data-ds-time-zone` agar Hari ini mengikutinya.
- Untuk tanggal dan jam, pakai date picker dan [time picker](./time-picker.md) berdampingan lalu gabungkan di server.
- Jangan pakai date picker untuk bulan atau tahun saja; pakai [select](./select.md).

## Aksesibilitas

Pola ini mengikuti "date picker dialog" WAI-ARIA: field teks berlabel, tombol terpisah yang membuka dialog non-modal berisi grid tanggal, dan fokus kembali ke tombol saat ditutup.

| Tombol | Aksi |
| --- | --- |
| Ketik | Memasukkan tanggal; dibaca saat Enter atau saat meninggalkan field |
| Alt + Arrow down | Membuka kalender (Arrow down juga membukanya bila field kosong) |
| Enter di field | Membaca tanggal yang diketik (form tetap terkirim) |
| Tombol panah, Page Up / Down, Home / End | Berpindah di kalender (lihat [Calendar](./calendar.md)) |
| Enter / Space pada hari | Memilihnya, menutup, mengembalikan fokus ke pemicu |
| Escape | Menutup tanpa mengubah nilai |
| Tab | Berpindah di dalam popover; Tab keluar dari popover menutupnya |

- Pemicu bernama "Pilih tanggal"; dialog bernama "Pilih" ditambah label field.
- Tanggal ketikan menerima urutan sesuai bahasa dengan pemisah apa pun (`/`, `.`, `-`, spasi), tanpa pemisah (`14052026`), ISO (`2026-05-14`), dan nama bulan dalam bahasa halaman atau bahasa Inggris (`14 Mei 2026`, `May 14 2026`).
- Pesan error menyebut format atau batas yang diharapkan: "Tulis tanggal dengan format hh/bb/tttt.", "Pilih tanggal 3 Nov 2026 atau sesudahnya."
- Pemicu punya area sentuh 44px di layar sentuh. Popover keluar lebih cepat daripada masuk; dengan reduced motion hanya opacity yang berubah.

## Razor

```cshtml
<ds-field asp-for="DueDate" hint="Klien melihat tanggal ini pada faktur.">
    <ds-date-picker asp-for="DueDate" min="2026-01-01" />
</ds-field>

<ds-date-picker asp-for="DeliveryDate" disable-weekends disabled-dates="2026-12-24 2026-12-25" time-zone="Asia/Jakarta" />
```

`ds-date-picker` merender pembungkus dan `input type="date"` native lewat generator MVC, sehingga `name`, `id`, `data-val-*`, nilai yang dicoba, dan `input-validation-error` berasal dari model. `DateOnly`, `DateTime`, dan `DateTimeOffset` ditulis sebagai `yyyy-MM-dd`. Tag helper menghubungkan `aria-describedby` ke `{id}-hint {id}-error`, id yang dirender [field](./field.md). `class` tetap di pembungkus; atribut lain diteruskan ke input.

| Atribut | Fungsi |
| --- | --- |
| `asp-for` atau `name` + `value` | Properti model atau nama biasa |
| `min`, `max` | Batas ISO |
| `disabled-dates`, `disable-weekends` | Hari yang tidak tersedia |
| `time-zone` | Zona IANA untuk Hari ini |
| `size` | `sm` atau `lg` |
| `placeholder`, `required`, `disabled`, `readonly` | Seperti pada input |

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-date-picker` | Pada pembungkus di sekitar `input type="date"` (atau pada input): meningkatkannya |
| `data-ds-disabled-dates` | Tanggal ISO yang tidak tersedia, dipisah spasi atau koma |
| `data-ds-disable-weekends` | Sabtu dan Minggu tidak tersedia |
| `data-ds-time-zone` | Zona IANA yang dipakai untuk Hari ini |
| `min`, `max`, `required`, `readonly`, `disabled` | Dibaca dari input native |

```js
document.addEventListener("ds:datepicker:change", (event) => {
  console.log(event.detail.value); // "2026-11-30" atau ""
});
DS.picker.set("#dp-due", "2026-12-15"); // atur dan umumkan perubahan
DS.picker.open("#dp-due");
DS.picker.parseDate("14 Mei 2026", "id"); // "2026-05-14"
```

Input ISO tersembunyi juga memicu `input` dan `change`, sehingga [form guard](./form.md) dan listener Anda melihat setiap perubahan.

## Token

`--ds-popover`, `--ds-popover-border`, `--ds-shadow-popover`, `--ds-radius-box`, `--ds-radius-card`, `--ds-scrim`, `--ds-duration-enter`, `--ds-duration-exit`, `--ds-duration-spring`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-ease-spring`, `--ds-enter-offset`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-state-selected`, `--ds-opacity-disabled`, `--ds-size-target`, `--ds-focus`, `--color-error`, ditambah token [calendar](./calendar.md).

## Native dan daisyUI

Berawal dari `input type="date"`, yang tetap menjadi cadangan tanpa JavaScript sekaligus field yang dikirim. Kotak field adalah `.input` daisyUI yang dipakai sebagai pembungkus, sehingga ukuran (`input-sm`, `input-lg`) dan state field bersama dari [input](./input.md) berlaku. Popover adalah `[popover]` native dengan `popovertarget`, yang memberi light dismiss dan Escape tanpa kode tambahan; ds.js memosisikannya dengan `placeFloating` dan mengubahnya menjadi bottom sheet di bawah 640px.
