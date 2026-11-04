---
title: Split button
group: components
category: actions
order: 3
summary: Satu aksi utama dengan pemicu menu untuk beberapa alternatif yang dekat. Dibangun di atas details, berfungsi tanpa JavaScript, lengkap untuk keyboard.
---

Split button memasangkan aksi yang paling sering dipakai dengan menu variasinya: Simpan, dengan Simpan sebagai draft dan Simpan lalu tutup. Segmen kiri menjalankan aksi bawaan dengan satu klik; segmen kanan membuka menu. Pakai [button](./button.md) biasa bila tidak ada alternatif, [dropdown menu](./dropdown-menu.md) bila tidak ada opsi yang menjadi bawaan, dan [button group](./button-group.md) bila setiap opsi harus tetap terlihat.

## Contoh

### Primary

```html preview title="Split button primary"
<div style="min-height:11rem">
  <div class="ds-split-button" role="group" aria-label="Pilihan simpan">
    <button type="button" class="btn btn-primary ds-split-button__action">Simpan</button>
    <details class="ds-split-button__menu" data-ds-menu>
      <summary class="btn btn-primary ds-split-button__toggle" aria-label="Pilihan simpan lainnya">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg>
      </summary>
      <div class="ds-split-button__panel">
        <button type="button" class="ds-split-button__item">Simpan sebagai draft</button>
        <button type="button" class="ds-split-button__item">Simpan lalu tutup</button>
        <button type="button" class="ds-split-button__item">Simpan sebagai templat</button>
      </div>
    </details>
  </div>
</div>
```

### Varian dan ukuran

Kedua segmen menerima varian dan ukuran button apa pun. Keduanya membawa class yang sama.

```html preview title="Secondary, outline, kecil"
<div class="ds-actions is-start" style="align-items:start;min-height:11rem">
  <div class="ds-split-button" role="group" aria-label="Pilihan ekspor">
    <button type="button" class="btn ds-split-button__action">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg>
      Ekspor
    </button>
    <details class="ds-split-button__menu" data-ds-menu>
      <summary class="btn ds-split-button__toggle" aria-label="Format ekspor lainnya"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary>
      <div class="ds-split-button__panel">
        <a class="ds-split-button__item" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg>Excel (.xlsx)</a>
        <a class="ds-split-button__item" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg>PDF</a>
        <a class="ds-split-button__item" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-text"></use></svg>CSV</a>
      </div>
    </details>
  </div>
  <div class="ds-split-button" role="group" aria-label="Pilihan tinjauan">
    <button type="button" class="btn btn-outline btn-sm ds-split-button__action">Setujui</button>
    <details class="ds-split-button__menu" data-ds-menu>
      <summary class="btn btn-outline btn-sm ds-split-button__toggle" aria-label="Pilihan tinjauan lainnya"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary>
      <div class="ds-split-button__panel">
        <button type="button" class="ds-split-button__item">Setujui dengan komentar</button>
        <button type="button" class="ds-split-button__item">Minta perubahan</button>
        <div class="ds-split-button__separator" role="separator"></div>
        <button type="button" class="ds-split-button__item is-danger">Tolak</button>
      </div>
    </details>
  </div>
</div>
```

### Menu terbuka

`open` pada `details` menampilkan panel. Chevron berputar 180 derajat dan pemicu mempertahankan state layer pressed.

```html preview title="Terbuka"
<div style="min-height:11rem">
  <div class="ds-split-button" role="group" aria-label="Pilihan kirim">
    <button type="button" class="btn btn-primary ds-split-button__action">Kirim faktur</button>
    <details class="ds-split-button__menu" data-ds-menu open>
      <summary class="btn btn-primary ds-split-button__toggle" aria-label="Pilihan kirim lainnya"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary>
      <div class="ds-split-button__panel">
        <button type="button" class="ds-split-button__item">Kirim dan tandai lunas</button>
        <button type="button" class="ds-split-button__item">Jadwalkan untuk nanti</button>
        <button type="button" class="ds-split-button__item" aria-disabled="true" title="Tambahkan penerima dahulu">Kirim salinan ke saya</button>
      </div>
    </details>
  </div>
</div>
```

## State

```html preview title="State split button"
<div class="ds-actions is-start" style="align-items:center">
  <div class="ds-split-button" role="group" aria-label="Nonaktif"><button type="button" class="btn ds-split-button__action" disabled>Simpan</button><details class="ds-split-button__menu"><summary class="btn ds-split-button__toggle" aria-label="Lainnya" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary></details></div>
  <div class="ds-split-button" role="group" aria-label="Memuat"><button type="button" class="btn btn-primary ds-split-button__action" aria-busy="true">Menyimpan…</button><details class="ds-split-button__menu"><summary class="btn btn-primary ds-split-button__toggle" aria-label="Lainnya" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary></details></div>
  <div class="ds-split-button" role="group" aria-label="Berhasil"><button type="button" class="btn btn-primary ds-split-button__action is-success">Tersimpan</button><details class="ds-split-button__menu"><summary class="btn btn-primary ds-split-button__toggle" aria-label="Lainnya"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary></details></div>
  <div class="ds-split-button" role="group" aria-label="Hover dan focus"><button type="button" class="btn ds-split-button__action" data-ds-demo="hover">Hover</button><details class="ds-split-button__menu"><summary class="btn ds-split-button__toggle" aria-label="Lainnya" data-ds-demo="focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary></details></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Diam | Tidak ada | Dua segmen berbagi satu tepi; pemisah berwarna turunan dari warna konten memisahkannya |
| Hover | Pointer di atas sebuah segmen | Hanya segmen itu yang menerima state layer |
| Focus-visible | Fokus keyboard | Cincin 2px `--ds-focus` di sekeliling segmen yang difokuskan, tergambar di atas tetangganya |
| Pressed | Pointer ditekan | Segmen yang ditekan memekat dan mengecil ke 0,97 |
| Terbuka | `details[open]` | Chevron berputar 180 derajat, pemicu mempertahankan state layer pressed, panel terlihat |
| Disabled | `disabled` pada aksi, `aria-disabled` pada pemicu | Opasitas 55%; split button yang disabled menonaktifkan kedua segmen |
| aria-disabled | `aria-disabled="true"` | Tampilan sama; tetap bisa difokuskan dan menjelaskan alasan |
| Loading | `aria-busy="true"` pada aksi | Spinner menggantikan ikon, lebar dipertahankan; nonaktifkan pemicu saat sibuk |
| Berhasil | `.is-success` | Hijau tonal dengan ikon centang selama 1,6 sampai 2 detik |
| Item menu | hover, focus, disabled, danger | Layer 6% saat hover, cincin inset 2px saat fokus, opasitas 55% saat disabled, teks merah untuk item destruktif |
| Gerak menu | Buka dan tutup | Panel memudar dan bergeser 5px dari pemicu selama 160ms; keluar 140ms. Reduced motion hanya mempertahankan pemudaran |

## Anatomi

- `.ds-split-button`: wadah, `position: relative`.
- `.ds-split-button__action`: segmen aksi utama, sebuah `.btn`.
- `details.ds-split-button__menu[data-ds-menu]` dengan `summary.ds-split-button__toggle`: segmen pemicu, sebuah `.btn`.
- `.ds-split-button__panel`: panel mengambang di bawah pemicu, rata ke awal kontrol. Tambahkan `is-end` pada `.ds-split-button` untuk rata ke akhir (untuk kontrol di ujung baris) dan `is-up` untuk membuka ke atas.
- `.ds-split-button__item`: button atau link di dalam panel. `is-danger` untuk item destruktif, `.ds-split-button__separator` di antara kelompok.

## Penggunaan

- Jadikan aksi itu yang paling sering dipilih. Menu berisi dua sampai lima variasinya.
- Tulis label menu sebagai kata kerja pendek. Taruh item destruktif paling akhir, setelah pemisah.
- Beri pemicu `aria-label` yang menyebut isi menu ("Pilihan simpan lainnya").
- Jangan masukkan aksi yang tidak berkaitan ke menu. Pakai [dropdown menu](./dropdown-menu.md) untuk itu.
- Jangan membuat menu bersarang di dalam panel.

## Aksesibilitas

- Aksi adalah button biasa. Pemicu adalah `summary` dengan `aria-haspopup="menu"`, dan browser menampilkan state terbuka dari `details`.
- Panel mendapat `role="menu"` dan item `role="menuitem"` saat halaman dimuat. Tanpa JavaScript panel tetap membuka dan menutup sebagai `details` native.
- Membuka dengan keyboard memindahkan fokus ke dalam menu. Escape menutupnya dan mengembalikan fokus ke pemicu. Tab keluar menutupnya.
- Item yang disabled memakai `aria-disabled="true"` agar tetap bisa dibaca; kliknya diabaikan.
- Kontras dan ukuran target mengikuti [button](./button.md): 4,5:1 untuk label, area sentuh 44px di layar sentuh, baris menu 44px di layar sentuh.

| Tombol | Aksi |
| --- | --- |
| Tab | Pindah ke aksi, lalu ke pemicu |
| Enter, Space (pada aksi) | Menjalankan aksi bawaan |
| Enter, Space (pada pemicu) | Membuka menu dan memfokuskan item pertama |
| ArrowDown, ArrowUp (pada pemicu) | Membuka menu dan memfokuskan item pertama atau terakhir |
| ArrowDown, ArrowUp (di menu) | Item berikutnya atau sebelumnya, berputar |
| Home, End | Item pertama atau terakhir |
| Enter, Space (pada item) | Menjalankan item dan menutup menu |
| Escape | Menutup menu dan mengembalikan fokus ke pemicu |
| Tab | Meninggalkan menu dan menutupnya |

## JavaScript

`toggle.js` menangani setiap `details.ds-split-button__menu`.

| Perilaku | Efek |
| --- | --- |
| Tekan di luar | Menutup split menu yang terbuka |
| Aktivasi item | Menutup menu dan mengembalikan fokus ke pemicu; `data-ds-keep-open` pada item menjaganya tetap terbuka |
| `data-ds-menu` | Dibagi dengan modul dropdown menu: satu menu terbuka pada satu waktu |

Item adalah button dan link biasa. Dengarkan event `click`-nya, atau beri atribut `data-ds-*` modul lain (misalnya `data-ds-confirm`).

## Token

`--ds-popover`, `--ds-popover-border`, `--ds-shadow-popover`, `--ds-radius-box`, `--ds-radius-md`, `--ds-z-menu`, `--ds-enter-offset`, `--ds-duration-quick|exit`, `--ds-ease-emphasized|exit`, `--ds-opacity-state-hover|pressed`, `--ds-opacity-disabled`, `--ds-size-target`, ditambah token [button](./button.md).

## Native dan daisyUI

Pemicunya adalah `details` dan `summary` native, sehingga menu berfungsi tanpa JavaScript. Kedua segmen adalah `.btn` dan berbagi state engine button. Panelnya bukan `dropdown` daisyUI; ia diposisikan oleh CSS di bawah pemicu dan dianimasikan dengan `@starting-style` dan `::details-content`, sehingga kedua arah adalah transisi CSS yang bisa diinterupsi.
