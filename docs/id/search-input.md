---
title: Search input
group: components
category: forms
order: 7
summary: Field pencarian dengan ikon awal, tombol hapus, petunjuk pintasan, state memuat, Enter untuk kirim, dan pencarian terbaru opsional.
source: TPS app.css .ds-search
---

Gunakan search input untuk menyaring daftar di halaman atau memulai pencarian situs. Untuk memilih dari daftar yang diketahui pakai [combobox](./combobox.md); untuk perintah dan navigasi pakai [command](./command.md).

## Contoh

### Pencarian dengan petunjuk pintasan

`data-ds-shortcut="/"` memfokuskan field saat `/` ditekan di luar field teks mana pun. Petunjuk `kbd` memudar saat field fokus atau berisi, dan disembunyikan di perangkat sentuh. Pakai `mod+k` untuk Ctrl atau Command + K.

```html preview title="Pencarian dengan pintasan"
<form role="search" style="max-width:26rem" onsubmit="return false">
  <div class="ds-input ds-search">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
    <input type="search" name="q" class="ds-input__control" placeholder="Cari proyek" aria-label="Cari proyek" data-ds-shortcut="/" enterkeyhint="search" autocomplete="off">
    <button type="button" class="ds-input__clear" tabindex="-1" aria-label="Hapus isi"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
    <kbd class="ds-kbd ds-search__kbd" aria-hidden="true">/</kbd>
  </div>
</form>
```

### Memuat

Beri `aria-busy="true"` pada pembungkus selama hasil dimuat. Spinner tampil setelah 300ms dan tidak menggantikan apa pun: tombol hapus tetap di slotnya.

```html preview title="Memuat hasil"
<div class="ds-input ds-search" aria-busy="true" style="max-width:26rem">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
  <input type="search" class="ds-input__control" value="faktur" aria-label="Cari faktur">
</div>
```

### Pencarian terbaru

Tambahkan `data-ds-recent="5"` dan slot `.ds-search__recent` di dalam `.ds-search-box`. Pencarian disimpan di browser saat Enter atau submit, ditampilkan saat fokus, disaring saat mengetik, dan dihapus satu per satu dengan Delete atau sekaligus. Field menjadi combobox dengan listbox; ini riwayat biasa, bukan saran dari server.

```html preview title="Pencarian terbaru"
<div class="ds-search-box" style="max-width:26rem">
  <div class="ds-input ds-search">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
    <input type="search" name="q" id="se-recent" class="ds-input__control" placeholder="Cari faktur" aria-label="Cari faktur" data-ds-recent="5" data-ds-recent-key="docs-invoices" data-ds-no-submit autocomplete="off">
    <button type="button" class="ds-input__clear" tabindex="-1" aria-label="Hapus isi"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
  <div class="ds-search__recent" data-state="closed"></div>
</div>
<p class="ds-hint">Ketik kata kunci dan tekan Enter, lalu fokuskan field lagi.</p>
```

## State

```html preview title="State pencarian"
<div class="ds-field-grid">
  <div class="ds-field"><label for="ss-1">Kosong</label><div class="ds-input ds-search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input id="ss-1" type="search" class="ds-input__control" placeholder="Cari"></div></div>
  <div class="ds-field"><label for="ss-2">Berisi teks</label><div class="ds-input ds-search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input id="ss-2" type="search" class="ds-input__control" value="INV-2026"><button type="button" class="ds-input__clear" tabindex="-1" aria-label="Hapus isi"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></div></div>
  <div class="ds-field"><label for="ss-3">Nonaktif</label><div class="ds-input ds-search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input id="ss-3" type="search" class="ds-input__control" placeholder="Cari" disabled></div></div>
  <div class="ds-field"><label for="ss-4">Hanya baca</label><div class="ds-input ds-search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input id="ss-4" type="search" class="ds-input__control" value="PRJ-1024" readonly></div></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest, hover, focus | Seperti [input](./input.md) | Ikon menjadi `--ds-quiet` saat fokus |
| Placeholder | Kosong | `--ds-subtle`; petunjuk pintasan terlihat |
| Filled | Ada teks | Tombol hapus terlihat, petunjuk tersembunyi |
| Loading | `aria-busy="true"` | Spinner setelah 300ms |
| Disabled, read-only | Atribut | Redup, atau `base-200` tanpa tombol hapus |
| Recent open | Fokus pada field kosong yang punya riwayat | Panel masuk dalam 160ms dengan geser 5px |
| Opsi recent aktif | Tombol panah | Isian tonal dan garis tipis di dalam |
| Tanpa riwayat | Tidak ada yang tersimpan | Panel tetap tertutup |

## Anatomi

- `.ds-input.ds-search`: pembungkus, `svg.ds-icon` awal, `input[type=search].ds-input__control`.
- `.ds-input__clear`: tombol hapus.
- `.ds-kbd.ds-search__kbd`: petunjuk pintasan.
- `.ds-search-box`: induk penempatan opsional untuk panel recent `.ds-search__recent` (`.ds-search__recent-list`, `-item`, `-title`, `-clear`).
- `.ds-search` versi 1 dengan ikon absolut tetap bekerja.

## Penggunaan

- Beri field nama aksesibel (`aria-label` atau label terlihat); ikon bukan label.
- Bungkus pencarian situs dengan `role="search"`. Untuk menyaring daftar, saring setelah jeda singkat (250 sampai 300ms) dan biarkan daftar tetap terlihat.
- Kirim dengan Enter. Jangan mencari di setiap ketukan untuk kueri lambat; tampilkan state memuat bila demikian.
- Jangan pakai `/` sebagai pintasan bila halaman punya handler lain untuk `/`. Satu halaman punya satu pintasan pencarian.
- Simpan maksimal 5 pencarian terbaru dan jangan simpan teks dari field sensitif.

## Aksesibilitas

- `type="search"` native, sehingga teknologi bantu mengumumkan "search". Tombol batal browser disembunyikan; tombol hapus DS menggantikannya.
- Escape menghapus teks (dan tetap di field); Escape kedua tidak melakukan apa-apa.
- Dengan pencarian terbaru field memakai pola combobox: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`, `aria-activedescendant`.
- Petunjuk pintasan `aria-hidden`; beri tahu pintasan di tempat lain (bantuan atau tooltip) karena sebagian besar pengguna teknologi bantu tidak melihatnya.
- Tombol hapus 28px dengan area sentuh 44px dan di luar urutan tab.

| Tombol | Aksi |
| --- | --- |
| `/` atau pintasan yang diatur | Memfokuskan dan menyeleksi field (bukan di dalam field lain) |
| Enter | Mengirim; menyimpan kata kunci ke pencarian terbaru |
| Escape | Menutup daftar terbaru; bila tidak, menghapus teks |
| Panah Bawah / Panah Atas | Membuka daftar terbaru, lalu memindahkan opsi aktif |
| Delete | Menghapus pencarian terbaru yang aktif |
| Tab | Ke tombol hapus riwayat saat daftar terbuka, lalu keluar |

## Razor

```cshtml
<ds-field name="q" type="search" label="Cari" shortcut="/" recent="5" />
```

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-shortcut` | Pintasan global: `"/"`, `"mod+k"` |
| `data-ds-recent` | Jumlah maksimal pencarian tersimpan; mengaktifkan daftar terbaru |
| `data-ds-recent-key` | Akhiran kunci penyimpanan (bawaan nama atau id field) |
| `data-ds-no-submit` | Jangan memanggil `form.requestSubmit()` saat pencarian terbaru dipilih |

Event: `ds:search:submit` (`detail.value`), `ds:search:clear`. Pencarian terbaru disimpan di `localStorage` dengan kunci `ds-recent-<key>`.

## Token

`--ds-subtle`, `--ds-quiet`, `--ds-popover`, `--ds-popover-border`, `--ds-shadow-menu`, `--ds-z-combobox`, `--ds-duration-quick`, `--ds-duration-exit`, `--ds-ease-emphasized`.

## Native dan daisyUI

Dibangun di atas `input[type=search]`. DS menyembunyikan tombol batal browser, menambah ikon, tombol hapus, pintasan, dan riwayat, serta menyamakan ukuran dengan [input](./input.md).
