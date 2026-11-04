---
title: Calendar
group: components
category: forms
order: 30
summary: Kisi bulan inline berbasis web component Cally, dengan lompat bulan dan tahun, rentang, tanggal tidak tersedia, dan nama sesuai bahasa halaman.
source: TPS app.css L315–323, L1244–1273; site.js calendar
---

Calendar menampilkan satu bulan atau lebih sebagai kisi hari dan memungkinkan orang memilih tanggal atau rentang dengan pointer atau keyboard. Pakai secara inline bila kalender adalah kontennya: ketersediaan pemesanan, sidebar jadwal, slot pengiriman. Untuk mengisi field form, pakai [date picker](./date-picker.md) atau [date range picker](./date-range-picker.md): keduanya menaruh kalender yang sama di dalam popover di samping field yang juga bisa diketik.

Kisinya adalah web component [Cally](https://wicky.nillia.ms/cally/) (MIT, disertakan di `lib/cally/`), diberi gaya lewat shadow part dengan class `.cally` milik daisyUI dan disempurnakan oleh design system. ds.js menambahkan bagian yang tidak disediakan Cally: nama hari dan bulan dalam bahasa halaman, hari pertama dalam seminggu sesuai locale, label navigasi yang dilokalkan, tampilan lompat bulan dan tahun, hari ini pada zona waktu pilihan, dan tanggal tidak tersedia.

## Contoh

### Satu tanggal

Hari ini ditandai ring teal tipis dan angka tebal; hari terpilih adalah satu-satunya isian penuh. Nama hari dan bulan berasal dari `Intl` dalam bahasa halaman.

```html preview title="Satu tanggal"
<div class="ds-calendar is-card">
  <calendar-date class="cally" value="2026-11-12">
    <calendar-month></calendar-month>
  </calendar-date>
</div>
```

### Lompat bulan dan tahun

Pilih judul (misalnya "November 2026") untuk membuka tampilan lompat: daftar tahun dan kisi bulan 3 × 4. Ini cara tercepat untuk mencapai tanggal lahir atau faktur lama. Escape kembali ke tampilan hari.

```html preview title="Lompat ke bulan (pilih judul)"
<div class="ds-calendar is-card">
  <calendar-date class="cally" value="1994-03-18" min="1930-01-01" max="2026-12-31">
    <calendar-month></calendar-month>
  </calendar-date>
</div>
```

### Rentang dua bulan

`calendar-range` memilih tanggal mulai dan selesai. Setelah klik pertama, pita mengikuti pointer sebagai pratinjau yang lebih terang sampai klik kedua. Taruh dua elemen `calendar-month` (yang kedua dengan `offset="1"`) di dalam baris `.ds-calendar__months`.

```html preview title="Rentang, dua bulan"
<div class="ds-calendar is-card">
  <calendar-range class="cally" months="2" value="2026-11-24/2026-12-05">
    <div class="ds-calendar__months">
      <calendar-month></calendar-month>
      <calendar-month offset="1"></calendar-month>
    </div>
  </calendar-range>
</div>
```

### Tanggal tidak tersedia dan batas

`min` dan `max` memudarkan hari di luar jendela dan menghentikan pemindahan halaman melewatinya. `data-ds-disabled-dates` dan `data-ds-disable-weekends` menandai hari tertentu sebagai tidak tersedia: hari itu dicoret, bukan hanya dipudarkan, sehingga bedanya tidak bergantung pada warna.

```html preview title="Batas, akhir pekan dan hari libur tidak tersedia"
<div class="ds-calendar is-card" data-ds-calendar data-ds-disable-weekends data-ds-disabled-dates="2026-12-24 2026-12-25 2026-12-31">
  <calendar-date class="cally" value="2026-12-14" min="2026-12-03" max="2026-12-30" show-outside-days>
    <calendar-month></calendar-month>
  </calendar-date>
</div>
```

## State

```html preview title="State hari"
<div style="display:flex;flex-wrap:wrap;gap:1.5rem;align-items:flex-start">
  <div class="ds-calendar is-card" data-ds-calendar data-ds-disabled-dates="2026-11-20">
    <calendar-date class="cally" value="2026-11-12" min="2026-11-04" show-outside-days>
      <calendar-month></calendar-month>
    </calendar-date>
  </div>
  <div class="ds-calendar is-card">
    <calendar-range class="cally" value="2026-11-09/2026-11-18">
      <calendar-month></calendar-month>
    </calendar-range>
  </div>
  <div class="ds-calendar is-card" aria-disabled="true">
    <calendar-date class="cally" value="2026-11-12">
      <calendar-month></calendar-month>
    </calendar-date>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Hari pada bulan yang ditampilkan | Teks dasar, tanpa isian, target bulat 40px (44px di layar sentuh) |
| Hover | Pointer di atas hari (hanya perangkat hover) | State layer `--ds-opacity-state-hover` dari warna teks |
| Pressed | Pointer ditekan | State layer `--ds-opacity-state-pressed` |
| Focus-visible | Keyboard pada hari atau tombol header | Ring `--ds-focus` 2px, offset 2px; tidak pernah isian, agar fokus tidak tertukar dengan pilihan |
| Today | `aria-current="date"`, part `today` | Angka teal tebal dan ring teal 1px |
| Selected | `aria-pressed="true"`, part `selected` | `--color-primary` penuh, teks `--color-primary-content`, semibold |
| Range start dan end | part `range-start`, `range-end` | Ujung penuh, rata di sisi dalam |
| Range middle | part `range-inner` | Pita tonal menyambung, `--ds-opacity-state-selected` dari primary |
| Range preview | setelah klik pertama (`data-state="tentative"`) | Pita lebih terang, ujung berkontur yang mengikuti pointer |
| Outside day | `show-outside-days`, part `outside` | Teks `--ds-quiet`, tidak bisa dipilih sebagai bagian bulan |
| Unavailable | `data-ds-disabled-dates`, akhir pekan, part `disallowed` | `--ds-quiet`, dicoret, `aria-disabled="true"` |
| Out of range | sebelum `min` atau sesudah `max` | Tombol nonaktif pada `--ds-opacity-disabled`; pemindahan halaman berhenti di batas |
| Disabled calendar | `.ds-calendar[aria-disabled="true"]` | Seluruh kisi pada `--ds-opacity-disabled`, tanpa pointer event |
| Jump view open | judul `aria-expanded="true"` | Hari tersembunyi, pilihan tahun dan kisi bulan muncul perlahan dari 5px di atas |

## Anatomi

- `.ds-calendar`: pembungkus; `.is-card` menambahkan permukaan dengan garis tipis. Menampung tampilan lompat.
- `calendar-date.cally` atau `calendar-range.cally`: elemen Cally.
- `.ds-calendar__title`: tombol bulan dan tahun yang ditempatkan ds.js di slot `heading` Cally.
- `calendar-month`: satu kisi bulan; tambahkan `offset="1"` untuk bulan berikutnya.
- `.ds-calendar__months`: baris bulan untuk rentang.
- `.ds-calendar__jump`: pilihan tahun (`.ds-calendar__year`) dan kisi bulan (`.ds-calendar__month-grid`).

## Penggunaan

- Pakai calendar secara inline hanya bila tanggal adalah kontennya. Di form, pakai [date picker](./date-picker.md).
- Tampilkan dua bulan untuk rentang yang sering melewati akhir bulan (menginap, periode tagihan); satu bulan di layar di bawah 640px.
- Setel `min` dan `max` bila domainnya punya batas (tidak ada pengiriman sebelum besok, tidak ada tanggal lahir di masa depan). Hari yang dinonaktifkan lebih baik daripada galat sesudahnya.
- Pakai `data-ds-disabled-dates` untuk celah nyata (hari libur nasional, hari yang sudah penuh), bukan untuk menyembunyikan data yang belum dimuat.
- Jangan mewarnai hari menurut makna (akhir pekan merah, hari kosong hijau) tanpa isyarat kedua; hari tidak tersedia yang dicoret adalah satu-satunya tanda bawaan.
- Jangan menumpuk lebih dari dua bulan dalam satu halaman. Untuk tampilan setahun, pakai [table](./table.md).

## Aksesibilitas

Cally merender setiap bulan sebagai `table` dengan heading mirip caption, header hari dengan nama lengkap untuk pembaca layar, dan `button` hari dengan label tanggal lengkap ("12 November 2026"). Hari ini memiliki `aria-current="date"`, pilihan memiliki `aria-pressed`. Bulan yang terlihat diumumkan lewat live region polite saat berubah. Ini mengikuti pola kisi date picker WAI-ARIA.

| Tombol | Aksi |
| --- | --- |
| Arrow left / right | Hari sebelumnya / berikutnya |
| Arrow up / down | Hari yang sama pada minggu sebelumnya / berikutnya |
| Page Up / Page Down | Hari yang sama pada bulan sebelumnya / berikutnya |
| Shift + Page Up / Page Down | Hari yang sama pada tahun sebelumnya / berikutnya |
| Home / End | Hari pertama / terakhir dalam minggu |
| Enter / Space | Memilih hari yang difokuskan (pada rentang: mulai, lalu selesai) |
| Tab | Berpindah antara bulan sebelumnya, judul, bulan berikutnya, dan kisi hari |
| Enter pada judul | Membuka tampilan lompat bulan dan tahun |
| Arrow keys di tampilan lompat | Berpindah antarbulan (3 per baris) |
| Escape di tampilan lompat | Menutupnya dan kembali ke judul |

- Kisi hari hanya punya satu tab stop; hanya hari yang difokuskan yang bisa dijangkau dengan Tab.
- Target hari 40px dengan pointer dan 44px di layar sentuh (`--ds-size-target`).
- Pilihan memakai isian, hari ini memakai ring dan ketebalan, hari tidak tersedia memakai coretan: tidak ada state yang bergantung pada warna saja. Dalam mode forced-colours pilihan memakai `Highlight`.
- Gerak: hanya warna yang berubah pada hari; tampilan lompat muncul perlahan selama 220ms dari 5px di atas. Reduced motion mempertahankan fade dan membuang gerakannya.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-calendar` | Pada `.ds-calendar` atau elemen Cally: aktifkan peningkatan (setiap `.ds-calendar > .cally` juga ditingkatkan) |
| `locale` | Atribut Cally; bawaan: `lang` terdekat (misalnya `id`, `en-GB`) |
| `first-day-of-week` | Atribut Cally, 0 = Minggu; bawaan: dari locale (`Intl.Locale.getWeekInfo`) |
| `format-weekday` | `short` (bawaan di sini) atau `narrow` |
| `min`, `max`, `value`, `months` | Atribut Cally, tanggal ISO; `value` untuk rentang berbentuk `start/end` |
| `show-outside-days` | Atribut Cally: tampilkan hari dari bulan di sebelahnya |
| `data-ds-disabled-dates` | Tanggal ISO dipisah spasi atau koma yang tidak bisa dipilih |
| `data-ds-disable-weekends` | Sabtu dan Minggu tidak bisa dipilih |
| `data-ds-time-zone` | Zona IANA untuk hari ini (`Asia/Jakarta`); bawaan: perangkat |

Event berasal dari Cally pada elemen: `change` (`value` baru), `focusday`, dan untuk rentang `rangestart` dan `rangeend`. Bila `cally.js` tidak ada di halaman, ds.js memuatnya dari `/_content/Citia.DesignSystem/lib/cally/cally.js` saat calendar atau date picker pertama kali muncul.

```js
document.querySelector("#delivery-calendar").addEventListener("change", (event) => {
  console.log(event.target.value); // "2026-11-12"
});
```

## Token

`--color-primary`, `--color-primary-content`, `--color-base-content`, `--ds-subtle`, `--ds-muted`, `--ds-quiet`, `--ds-focus`, `--ds-border-focus`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-state-selected`, `--ds-opacity-disabled`, `--ds-radius-full`, `--ds-radius-card`, `--ds-size-target`, `--ds-type-callout-*`, `--ds-type-footnote-*`, `--ds-type-caption-*`, `--ds-duration-fast`, `--ds-duration-enter`, `--ds-ease-emphasized`, `--ds-enter-offset`. Variabel lokal `--ds-calendar-day` (2,5rem, `--ds-size-target` pada coarse pointer) menentukan ukuran hari.

## Native dan daisyUI

Dibangun di atas web component Cally dengan class `.cally` milik daisyUI 5. Design system mengubah tampilan daisyUI: hari ini berupa ring, bukan hari primary penuh (isian dicadangkan untuk pilihan), pilihan berwarna primary, bukan base-content, rentang berupa satu pita tonal, hari berupa target bulat 40/44px, nama hari memakai bentuk pendek, dan hover serta fokus mengikuti matriks state. Tidak ada kisi kalender HTML native; `input type="date"` tetap menjadi fallback tanpa JavaScript untuk [date picker](./date-picker.md).
