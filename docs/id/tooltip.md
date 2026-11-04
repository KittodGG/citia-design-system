---
title: Tooltip
group: components
category: feedback
order: 4
summary: Label atau petunjuk singkat yang muncul setelah hover 500ms atau saat fokus keyboard, pada elemen apa pun yang bisa difokus, polos atau kaya, tidak pernah interaktif.
---

Tooltip menamai tombol ikon, menampilkan pintasan keyboard atau menjelaskan nilai yang terpotong. Tooltip tidak membawa informasi penting maupun kontrol: apa pun isinya harus tersedia juga lewat cara lain. Untuk konten dengan tautan atau tombol pakai [popover](./popover.md). Untuk pratinjau halaman tertaut pakai [hover card](./hover-card.md).

## Contoh

Arahkan kursor ke tombol (atau fokus dengan Tab). Tooltip pertama menunggu 500ms; pindah ke tombol berikutnya langsung menampilkan tooltipnya.

```html preview title="Polos"
<div class="ds-actions is-start">
  <button type="button" class="btn btn-square" data-ds-tooltip="Tambah komentar" data-ds-tooltip-kbd="C">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>
  </button>
  <button type="button" class="btn btn-square" data-ds-tooltip="Segarkan data" data-ds-tooltip-kbd="R">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg>
  </button>
  <button type="button" class="btn btn-square" data-ds-tooltip="Hapus faktur INV-2026-0418">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>
  </button>
  <button type="button" class="btn" data-ds-tooltip="Disimpan 14.05 oleh Ayu Lestari">Terakhir disimpan</button>
</div>
```

Penempatan. Bawaannya di atas elemen. Tooltip berbalik ke sisi seberang bila akan keluar dari layar.

```html preview title="Penempatan"
<div class="ds-actions is-start" style="padding:2.5rem 4rem">
  <button type="button" class="btn" data-ds-tooltip="Atas" data-ds-tooltip-placement="top">Atas</button>
  <button type="button" class="btn" data-ds-tooltip="Bawah" data-ds-tooltip-placement="bottom">Bawah</button>
  <button type="button" class="btn" data-ds-tooltip="Kiri" data-ds-tooltip-placement="left">Kiri</button>
  <button type="button" class="btn" data-ds-tooltip="Kanan" data-ds-tooltip-placement="right">Kanan</button>
  <button type="button" class="btn" data-ds-tooltip="Rata awal" data-ds-tooltip-placement="bottom-start">Bawah awal</button>
</div>
```

Kaya. Judul dan satu kalimat di permukaan terang. Tetap tidak interaktif.

```html preview title="Kaya"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-tooltip-title="Arsipkan proyek" data-ds-tooltip="Menyembunyikan PRJ-1024 dari daftar. File dan komentar disimpan 12 bulan." data-ds-tooltip-kbd="Shift A">Arsipkan</button>
  <button type="button" class="btn" data-ds-tooltip-title="Perlu persetujuan" data-ds-tooltip="Daniel Okafor harus menyetujui faktur di atas 5.000,00.">Mengapa terkunci?</button>
</div>
```

Kontrol nonaktif. Tombol `disabled` tidak menerima event pointer atau fokus, jadi bungkus dengan elemen yang bisa difokus dan membawa tooltip (atau pakai `aria-disabled="true"` yang tetap bisa difokus). Teks yang terpotong menampilkan nilai lengkapnya dengan `data-ds-tooltip-overflow`.

```html preview title="Nonaktif dan terpotong"
<div class="ds-actions is-start">
  <span class="ds-tooltip-wrap" tabindex="0" data-ds-tooltip="Butuh peran Admin untuk menghapus faktur">
    <button type="button" class="btn" disabled>Hapus faktur</button>
  </span>
  <button type="button" class="btn" aria-disabled="true" data-ds-tooltip="Tambahkan klien dulu">Buat faktur</button>
  <span data-ds-tooltip-overflow style="display:inline-block;max-width:11rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Rekonsiliasi pendapatan dan beban triwulanan untuk kantor Surabaya</span>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Tersembunyi | Bawaan | Tidak dirender |
| Tertunda | Pointer di atas pemicu | Tidak ada selama 500ms, lalu tooltip muncul |
| Hangat | Tooltip lain terbuka dalam 400ms terakhir | Muncul seketika, tanpa gerak |
| Masuk | Tampil | Opacity 0 ke 1 dan bergeser 5px dari pemicu selama 160ms |
| Fokus | Fokus keyboard (`:focus-visible`) | Muncul seketika |
| Dapat di-hover | Pointer berpindah ke tooltip | Tetap terbuka (WCAG 1.4.13) |
| Ditutup | Escape, blur, scroll, resize, klik pada pemicu, pointer pergi | Menutup dalam 140ms |
| Kaya | `data-ds-tooltip-title` | Permukaan terang dengan border tipis, judul dan teks |
| Pemicu nonaktif | Dibungkus `.ds-tooltip-wrap`, atau `aria-disabled="true"` | Pembungkus atau kontrol bisa difokus dan menampilkan tooltip |
| Sentuh | Pointer sentuh | Tidak ada tooltip hover; fokus keyboard tetap bekerja |

## Anatomi

- Pemicu: elemen apa pun dengan `data-ds-tooltip`, `data-ds-tooltip-title` atau `data-ds-tooltip-overflow`.
- `.ds-tooltip`: lapisan, dibuat skrip dengan `role="tooltip"` dan `popover="manual"` agar berada di atas dialog. `is-rich` untuk varian kaya.
- `.ds-tooltip__title`, `.ds-tooltip__text`, `.ds-tooltip__kbd`: bagian-bagiannya.
- `.ds-tooltip-wrap`: pembungkus yang bisa difokus untuk kontrol nonaktif.

## Penggunaan

- Tooltip polos di bawah 80 karakter, satu atau dua baris. Tooltip kaya punya judul sampai 30 karakter dan teks sampai 120.
- Pakai tooltip untuk menamai tombol yang hanya berisi ikon. Skrip menyalin teksnya ke `aria-label` bila kontrol belum punya nama, sehingga nama tersedia bagi teknologi bantu.
- Tampilkan pintasan dengan `data-ds-tooltip-kbd`, bukan di dalam kalimat.
- Jangan taruh tautan, tombol atau field di tooltip. Pakai [popover](./popover.md).
- Jangan mengandalkan tooltip di perangkat sentuh. Taruh informasi di layar atau di balik kontrol yang terlihat.
- Jangan beri tooltip pada teks yang sudah terlihat penuh.
- Jelaskan mengapa kontrol tidak tersedia, di tooltip pembungkusnya atau kontrol `aria-disabled`: "Tambahkan klien dulu".

## Aksesibilitas

- Pola: WAI-ARIA tooltip. Tooltip punya `role="tooltip"` dan pemicu menunjuknya dengan `aria-describedby`. Kontrol tanpa nama aksesibel menerima `aria-label` dari teks tooltip (dan tanpa `aria-describedby`, agar tidak terbaca dua kali).
- Tooltip tampil saat fokus keyboard tanpa jeda. Elemen yang tidak bisa difokus secara bawaan mendapat `tabindex="0"` agar pengguna keyboard dapat menjangkau tooltipnya.
- WCAG 1.4.13: dapat ditutup (Escape menutupnya tanpa memindahkan fokus), dapat di-hover (pointer boleh masuk) dan persisten (bertahan sampai pointer atau fokus pergi, atau Escape).
- Tooltip polos adalah permukaan terbalik (latar neutral, teks neutral-content) sehingga minimal 7:1 di kedua tema. Tooltip kaya memakai permukaan dan teks normal.
- Reduced motion: tooltip hanya memudar selama 120ms.

| Tombol | Aksi |
| --- | --- |
| Tab, Shift+Tab | Fokus menampilkan tooltip elemen yang difokus; meninggalkannya menyembunyikan |
| Escape | Menutup tooltip yang terbuka dan tidak menutup dialog di belakangnya |

## Razor

```cshtml
<button type="button" class="btn btn-square" ds-tooltip="Hapus faktur" ds-tooltip-kbd="Del" ds-tooltip-placement="bottom">
    <ds-icon name="trash" />
</button>

<ds-tooltip text="Butuh peran Admin">
    <button type="button" class="btn" disabled>Hapus faktur</button>
</ds-tooltip>
```

| Atribut | Efek |
| --- | --- |
| `ds-tooltip` | Teksnya; elemen apa pun |
| `ds-tooltip-title` | Menjadikannya kaya |
| `ds-tooltip-placement` | `top`, `bottom`, `left`, `right`, dengan `-start` atau `-end` |
| `ds-tooltip-kbd` | Pintasan setelah teks |
| `ds-tooltip-delay` | Jeda hover dalam ms |

Elemen `<ds-tooltip text="…">` merender `span.ds-tooltip-wrap` yang bisa difokus untuk kontrol nonaktif.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-tooltip="teks"` | Tooltip polos |
| `data-ds-tooltip-title="Judul"` | Tooltip kaya (dengan `data-ds-tooltip` sebagai teks) |
| `data-ds-tooltip-kbd="Ctrl K"` | Pintasan |
| `data-ds-tooltip-placement` | `top` (bawaan), `bottom`, `left`, `right`, opsional `-start` atau `-end` |
| `data-ds-tooltip-delay="0"` | Jeda hover dalam ms (bawaan 500) |
| `data-ds-tooltip-overflow` | Menampilkan teks elemen hanya bila terpotong |

`DS.tooltip.show(element)` dan `DS.tooltip.hide()` untuk kode. Isi dibaca saat tooltip dibuka, jadi mengubah atribut memperbaruinya.

## Token

`--color-neutral`, `--color-neutral-content`, `--color-base-100`, `--color-base-300`, `--ds-radius-lg`, `--ds-shadow-menu`, `--ds-z-tooltip`, `--ds-enter-offset`, `--ds-duration-quick`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-focus`.

## Native dan daisyUI

Tooltip adalah elemen `popover="manual"` native yang ditempatkan dengan `placeFloating`, bukan `.tooltip` daisyUI yang hanya CSS, yang tidak bisa berbalik, tidak bisa ditutup dengan Escape dan tidak muncul saat fokus keyboard. Browser tanpa Popover API mendapat elemen fixed dengan kelas yang sama.
