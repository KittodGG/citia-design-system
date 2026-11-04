---
title: Accordion
group: components
category: layout
order: 8
summary: Tumpukan judul yang masing-masing membuka sebuah panel, dibangun di atas details, dengan pembukaan eksklusif (single) atau mandiri (multiple), reveal beranimasi dan item nonaktif.
source: TPS .payload-details L3502–3504, .bc-guide-entry
---

Accordion menyembunyikan konten sekunder di balik judul agar halaman tetap pendek: pertanyaan yang sering diajukan, grup pengaturan, topik bantuan panjang. Ia bekerja tanpa JavaScript karena setiap item adalah `details` native. Pakai bila orang biasanya butuh satu atau dua panel, bukan semuanya. Untuk satu disclosure pakai [collapsible](./collapsible.md). Untuk berpindah antar tampilan setara pakai [tabs](./tabs.md). Bila orang butuh semuanya, tampilkan semuanya.

## Contoh

Multiple. Sejumlah item boleh terbuka. Ini bawaannya.

```html preview title="Multiple"
<div class="ds-accordion" style="max-width:40rem">
  <details class="ds-accordion__item" open>
    <summary class="ds-accordion__trigger">Kapan faktur jatuh tempo?</summary>
    <div class="ds-accordion__panel"><p>Faktur jatuh tempo 30 hari setelah dikirim, misalnya INV-2026-0418 yang dikirim 2 Nov 2026 jatuh tempo 2 Des 2026. Anda bisa mengubah tenggatnya untuk setiap klien.</p></div>
  </details>
  <details class="ds-accordion__item">
    <summary class="ds-accordion__trigger">Bisakah saya mengubah faktur setelah dikirim?</summary>
    <div class="ds-accordion__panel"><p>Tidak setelah klien membukanya. Terbitkan nota kredit dan faktur baru; keduanya tetap tertaut ke proyek.</p></div>
  </details>
  <details class="ds-accordion__item">
    <summary class="ds-accordion__trigger">Siapa yang bisa melihat faktur saya?</summary>
    <div class="ds-accordion__panel"><p>Admin workspace dan orang yang Anda ajak berbagi proyek. Ayu Lestari dapat menambah atau mencabut akses.</p></div>
  </details>
</div>
```

Single. Membuka satu item menutup yang lain. Item berbagi `name`, yaitu accordion eksklusif native; `data-ds-accordion="single"` juga mencakup browser yang belum mendukungnya.

```html preview title="Single, dengan petunjuk"
<div class="ds-accordion" data-ds-accordion="single" style="max-width:40rem">
  <details class="ds-accordion__item" name="plan" open>
    <summary class="ds-accordion__trigger"><span class="ds-accordion__label"><span>Starter</span><span class="ds-accordion__hint">Untuk satu orang</span></span><span class="ds-accordion__meta">Gratis</span></summary>
    <div class="ds-accordion__panel"><p>3 proyek, 1 GB file dan dukungan email.</p></div>
  </details>
  <details class="ds-accordion__item" name="plan">
    <summary class="ds-accordion__trigger"><span class="ds-accordion__label"><span>Team</span><span class="ds-accordion__hint">Sampai 20 orang</span></span><span class="ds-accordion__meta">12,00 / bulan</span></summary>
    <div class="ds-accordion__panel"><p>Proyek tanpa batas, 50 GB file dan persetujuan.</p></div>
  </details>
  <details class="ds-accordion__item" name="plan">
    <summary class="ds-accordion__trigger"><span class="ds-accordion__label"><span>Business</span><span class="ds-accordion__hint">Single sign-on dan log audit</span></span><span class="ds-accordion__meta">38,00 / bulan</span></summary>
    <div class="ds-accordion__panel"><p>Semua yang ada di Team, 1 TB file dan kontak khusus.</p></div>
  </details>
</div>
```

Varian card dan separated, dengan item nonaktif. Item nonaktif tetap bisa difokus dan tidak bisa dibuka; jelaskan sebabnya di teksnya atau dengan tooltip.

```html preview title="Card dan separated"
<div style="display:grid;gap:1.5rem;max-width:40rem">
  <div class="ds-accordion is-card">
    <details class="ds-accordion__item" open>
      <summary class="ds-accordion__trigger">Notifikasi</summary>
      <div class="ds-accordion__panel"><p>Pilih komentar dan persetujuan mana yang mengirim email.</p></div>
    </details>
    <details class="ds-accordion__item">
      <summary class="ds-accordion__trigger">Bahasa dan wilayah</summary>
      <div class="ds-accordion__panel"><p>Bahasa Inggris atau Bahasa Indonesia, dengan format tanggal dan angka wilayah Anda.</p></div>
    </details>
    <details class="ds-accordion__item" aria-disabled="true">
      <summary class="ds-accordion__trigger" aria-disabled="true"><span class="ds-accordion__label"><span>Single sign-on</span><span class="ds-accordion__hint">Tersedia di paket Business</span></span></summary>
      <div class="ds-accordion__panel"><p>Tidak tersedia.</p></div>
    </details>
  </div>
  <div class="ds-accordion is-separated">
    <details class="ds-accordion__item"><summary class="ds-accordion__trigger">Detail penagihan</summary><div class="ds-accordion__panel"><p>Nama perusahaan, NPWP dan alamat faktur.</p></div></details>
    <details class="ds-accordion__item"><summary class="ds-accordion__trigger">Metode pembayaran</summary><div class="ds-accordion__panel"><p>Kartu dan transfer bank.</p></div></details>
  </div>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Tertutup | Tanpa `open` | Chevron ke bawah; panel tidak dirender |
| Terbuka | `open` | Chevron berputar 180° dan berwarna primary; teks judul berwarna penuh |
| Hover | Pointer di atas judul, pada perangkat yang mendukung hover | State layer 6% |
| Pressed | Pointer turun | State layer 10% |
| Focus-visible | Fokus keyboard | Ring `--ds-focus` 2px di dalam judul |
| Membuka | Toggle | Panel tumbuh selama 240ms dan isinya memudar masuk (reduced motion: seketika) |
| Menutup | Toggle | Panel menyusut selama 140ms |
| Nonaktif | `aria-disabled="true"` pada item | Opasitas 55%, `not-allowed`, tetap bisa difokus, tidak berganti |
| Eksklusif | `name` bersama atau `data-ds-accordion="single"` | Membuka satu menutup yang lain |
| Target hash | `#id` di dalam item tertutup | Item terbuka saat dimuat atau saat navigasi |

Animasi tinggi memakai `::details-content` dan `interpolate-size`. Browser tanpa keduanya membuka dan menutup seketika; selebihnya tidak berubah.

## Anatomi

- `.ds-accordion`: grup. `is-card` (satu grup berborder) dan `is-separated` (kartu per item); bawaannya rata dengan garis tipis.
- `details.ds-accordion__item`: satu item. `name` menjadikannya bagian dari grup eksklusif.
- `summary.ds-accordion__trigger`: judul dan chevron (digambar dengan CSS).
- `.ds-accordion__label`, `.ds-accordion__hint`, `.ds-accordion__meta`, `.ds-accordion__icon`: bagian opsional dari judul.
- `.ds-accordion__panel`: konten.
- `.ds-disclosure` dan `.ds-disclosure-list` versi 1 tetap berfungsi dan berbagi gerak serta chevron yang sama.

## Penggunaan

- Tulis judul yang menyebut isinya, sebagai pertanyaan atau kata benda: "Siapa yang bisa melihat faktur saya?", "Notifikasi". Jaga di bawah 60 karakter.
- Buka item pertama hanya bila kebanyakan orang membutuhkannya. Jangan buka satu pun bila judulnya sudah cukup.
- Pakai single untuk pilihan yang saling meniadakan atau panel panjang. Pakai multiple untuk topik yang mandiri.
- Jaga panel di bawah sekitar 120 kata. Konten yang lebih panjang pantas punya halaman sendiri.
- Tambahkan "Buka semua" dan "Tutup semua" bila accordion multiple punya 6 item atau lebih (`data-ds-accordion-all`).
- Jangan menyarangkan accordion lebih dari satu tingkat.
- Jangan sembunyikan field form wajib di panel tertutup: galat validasi tak terlihat. Buka panel yang memuat galat.
- Jangan menonaktifkan item tanpa menyebut sebabnya.

## Aksesibilitas

- Pola: WAI-ARIA accordion, memakai `details` dan `summary` native. Summary adalah tombolnya, diumumkan browser dengan state terbuka atau tertutup. Panel tidak butuh role tambahan.
- Keyboard: Enter atau Space mengganti. Panah Atas, Panah Bawah, Home dan End berpindah antar judul (opsional dalam pola, disediakan skrip).
- Item nonaktif memakai `aria-disabled="true"` pada item dan summary-nya, sehingga tetap bisa dibaca dan difokus.
- Kontras: judul 4,5:1 atau lebih, chevron 3:1 atau lebih, di kedua tema. Target judul minimal setinggi 44px.
- Gerak: chevron berputar 160ms dan panel beranimasi 240ms; reduced motion menghapus gerak dan mempertahankan pudar 120ms.
- Find in page membuka item tertutup yang memuat hasil pencarian.

| Tombol | Aksi |
| --- | --- |
| Enter, Space | Mengganti item yang difokus |
| Panah Bawah | Fokus ke judul berikutnya |
| Panah Atas | Fokus ke judul sebelumnya |
| Home, End | Fokus ke judul pertama atau terakhir |
| Tab | Berpindah melalui judul dan kontrol di panel terbuka |

## Razor

```cshtml
<ds-accordion single>
    <ds-accordion-item title="Starter" hint="Untuk satu orang" meta="Gratis" open>3 proyek, 1 GB file.</ds-accordion-item>
    <ds-accordion-item title="Team" hint="Sampai 20 orang" meta="12,00 / bulan">Proyek tanpa batas dan persetujuan.</ds-accordion-item>
    <ds-accordion-item title="Business" disabled hint="Tersedia atas permintaan">Single sign-on.</ds-accordion-item>
</ds-accordion>
```

| Atribut | Efek |
| --- | --- |
| `ds-accordion single` | Eksklusif: item mendapat satu `name` bersama |
| `name` | Pakai nama grup tetap alih-alih yang dihasilkan |
| `card`, `separated` | Varian |
| `ds-accordion-item title`, `hint`, `meta`, `icon` | Bagian judul |
| `open`, `disabled` | State item |

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-accordion="single"` | Skrip memberi item tanpa `name` satu `name` bersama, menutup item terbuka berlebih saat dimuat, dan menegakkan eksklusivitas di browser yang belum mendukungnya |
| `data-ds-accordion-all="open\|close"` | Pada tombol dengan `aria-controls="<id accordion>"`: membuka atau menutup setiap item yang aktif |

`DS.accordion.openAll(element)` dan `DS.accordion.closeAll(element)`. Event `ds:accordion:toggle` (`detail.open`) naik dari item.

## Token

`--color-base-300`, `--color-base-100`, `--ds-subtle`, `--ds-quiet`, `--ds-radius-box`, `--ds-radius-lg`, `--ds-size-target`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-disabled`, `--ds-duration-layout`, `--ds-duration-exit`, `--ds-duration-quick`, `--ds-ease-emphasized`, `--ds-focus`.

## Native dan daisyUI

Setiap item adalah `details` native dengan `summary`. Perilaku eksklusifnya adalah atribut `name` native. DS tidak memakai `collapse` milik daisyUI (butuh checkbox tersembunyi dan tidak bisa eksklusif tanpa JavaScript).
