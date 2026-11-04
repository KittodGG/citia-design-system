---
title: Collapsible
group: components
category: layout
order: 9
summary: Satu disclosure yang menampilkan atau menyembunyikan sebuah area, sebagai elemen details native atau tombol dengan aria-expanded, serta tampilkan lebih banyak dan lebih sedikit untuk teks panjang.
---

Collapsible menyembunyikan satu area di balik satu kontrol: detail teknis, sisa daftar panjang, opsi lanjutan. Untuk tumpukan judul yang berkaitan pakai [accordion](./accordion.md). Untuk menu atau panel mengambang pakai [popover](./popover.md). Jangan sembunyikan konten yang dibutuhkan orang untuk menyelesaikan tugas.

## Contoh

`details` native. Bekerja tanpa JavaScript dan menjadi pilihan pertama.

```html preview title="details"
<details class="ds-collapsible" style="max-width:36rem">
  <summary>Tampilkan detail teknis</summary>
  <div class="ds-collapsible__content">
    <p>Permintaan 7F3A-2026-1102 sampai di server pukul 14.05.12 dan dijawab dengan status 503 setelah 3 percobaan.</p>
  </div>
</details>
```

Tombol dengan `aria-expanded`. Pakai bila kontrol tidak berada di atas area, bila labelnya berubah, atau bila kode lain membutuhkan state-nya. Area mengikuti tombol dan diawali `hidden`.

```html preview title="Tombol dan area"
<div class="ds-collapsible" data-ds-collapsible style="max-width:36rem">
  <ul style="margin:0;padding-inline-start:1.25rem">
    <li>Ayu Lestari, ketua proyek</li>
    <li>Daniel Okafor, keuangan</li>
  </ul>
  <button type="button" class="ds-collapsible__trigger" aria-expanded="false" aria-controls="col-team">Tampilkan 2 orang lagi</button>
  <div class="ds-collapsible__content" id="col-team" hidden>
    <ul style="margin:0;padding-inline-start:1.25rem">
      <li>Mei Tanaka, desain</li>
      <li>Sofia Marquez, operasional</li>
    </ul>
  </div>
</div>
```

Tampilkan lebih banyak dan lebih sedikit. Teks dipotong sampai `--ds-clamp-lines` (3 secara bawaan) dengan pudar; tombol muncul hanya bila teks lebih panjang, dan labelnya mengikuti `aria-expanded`.

```html preview title="Lebih banyak, lebih sedikit"
<div class="ds-collapsible is-clamp" data-ds-collapsible style="max-width:36rem;--ds-clamp-lines:3">
  <p class="ds-collapsible__clamp">Rekonsiliasi Q3 mencakup 1.284 faktur dari 14 klien. Dari jumlah itu, 1.201 dibayar tepat waktu, 61 dibayar dalam 14 hari setelah jatuh tempo dan 22 masih terbuka. Item terbuka berjumlah 48.310,00 dan terkonsentrasi pada dua klien, yang keduanya sudah menyepakati rencana pembayaran yang berakhir 15 Des 2026. Nota kredit yang diterbitkan selama kuartal berjumlah 6.120,00 dan sudah dikurangkan dari angka di atas.</p>
  <button type="button" class="ds-collapsible__trigger" aria-expanded="false" hidden>Tampilkan lebih banyak</button>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Tertutup | `aria-expanded="false"` atau tanpa `open` | Chevron ke bawah; area tersembunyi |
| Terbuka | `aria-expanded="true"` atau `open` | Chevron berputar 180°; area terlihat |
| Hover | Pointer di atas kontrol | State layer warna tautan 6% |
| Pressed | Pointer turun | State layer 10%, skala 0,97 |
| Focus-visible | Fokus keyboard | Ring `--ds-focus` 2px, offset 2px |
| Membuka | Toggle | Area tumbuh selama 240ms (baris grid 0fr ke 1fr, atau tinggi) dan memudar masuk |
| Menutup | Toggle | Menyusut selama 140ms, lalu `hidden` diatur |
| Nonaktif | `disabled` atau `aria-disabled="true"` | Opasitas 55%, `not-allowed` |
| Sibuk | `aria-busy="true"` pada kontrol | Kursor `progress`; pakai bila konten dimuat saat dibuka pertama kali |
| Terpotong | `.is-clamp`, teks lebih panjang dari baris yang diatur | Pudar pada 1,5 baris terakhir; kontrol menampilkan "Tampilkan lebih banyak" |
| Teks pendek | Teks muat | Kontrol tetap tersembunyi |

## Anatomi

- `.ds-collapsible`: pembungkus (`details` atau `div[data-ds-collapsible]`).
- `.ds-collapsible__trigger`: tombol (atau `summary` pada bentuk `details`) dengan chevron yang berputar.
- `.ds-collapsible__content`: area; `.ds-collapsible__inner` ditambahkan skrip di sekeliling anaknya.
- `.ds-collapsible__clamp`: teks terpotong pada varian tampilkan lebih banyak; `.is-clamp` pada pembungkus.

## Penggunaan

- Namai kontrol sesuai isi dan ukurannya: "Tampilkan detail teknis", "Tampilkan 2 orang lagi". Untuk teks pakai "Tampilkan lebih banyak" dan "Tampilkan lebih sedikit".
- Jangan ubah posisi kontrol saat terbuka. Letakkan di atas area, atau di akhir teks yang dipotong.
- Pakai 3 baris untuk ringkasan dan 5 untuk deskripsi. Jangan memotong teks yang hanya satu atau dua baris lebih panjang dari batasnya.
- Jangan taruh instruksi penting, galat atau field wajib di area yang tertutup.
- Jangan pakai collapsible untuk menu panjang; pakai menu atau [popover](./popover.md).

## Aksesibilitas

- Bentuk tombol mengikuti pola WAI-ARIA disclosure: tombol dengan `aria-expanded` dan `aria-controls` yang menunjuk area. Area `hidden` saat tertutup, sehingga keluar dari urutan tab dan pohon aksesibilitas.
- Bentuk `details` tidak butuh ARIA; browser mengekspos state terbuka dari `summary`.
- Teks yang dipotong tetap utuh di DOM, sehingga pembaca layar membacanya seluruhnya; tombol mengumumkan "Tampilkan lebih banyak, tertutup".
- Target: tinggi minimal 36px (44px pada pointer kasar).
- Gerak: membuka 240ms dan menutup 140ms hanya dengan baris grid, tinggi dan opacity; reduced motion membuatnya seketika.

| Tombol | Aksi |
| --- | --- |
| Enter, Space | Mengganti area |
| Tab | Berpindah ke konten setelah terbuka |

## Razor

```cshtml
<ds-collapsible title="Tampilkan detail teknis">
    Permintaan 7F3A-2026-1102 dijawab dengan status 503 setelah 3 percobaan.
</ds-collapsible>
```

`ds-collapsible` merender bentuk `details`; tambahkan `open` agar mulai terbuka. Untuk bentuk tombol dan tampilkan lebih banyak, tulis markup di atas.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-collapsible` | Pada pembungkus bentuk tombol atau tampilkan lebih banyak: skrip menyambungkan tombolnya |
| `aria-expanded` pada `.ds-collapsible__trigger` | State awal; skrip menjaganya sinkron dan mengatur `aria-controls` bila belum ada |
| `.is-clamp` dan `--ds-clamp-lines` | Tampilkan lebih banyak: jumlah baris |
| `data-ds-label-collapsed`, `data-ds-label-expanded` | Label tampilkan lebih banyak (bawaan "Tampilkan lebih banyak" dan "Tampilkan lebih sedikit" sesuai bahasa) |

Event `ds:collapsible:toggle` naik dengan `detail.open`, untuk bentuk tombol maupun `details`.

## Token

`--ds-link`, `--ds-radius-lg`, `--ds-size-target`, `--ds-size-target-compact`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-disabled`, `--ds-duration-layout`, `--ds-duration-exit`, `--ds-duration-quick`, `--ds-ease-emphasized`, `--ds-focus`.

## Native dan daisyUI

Bentuk `details` adalah elemen native dengan animasi yang sama seperti [accordion](./accordion.md). Bentuk tombol memakai `grid-template-rows` untuk tingginya, bukan `collapse` milik daisyUI.
