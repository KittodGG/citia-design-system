---
title: Toolbar
group: components
category: layout
order: 4
summary: Toolbar ARIA berisi kontrol berkelompok dengan satu tab stop, navigasi tombol panah, pemisah, dan menu overflow untuk item yang tidak muat.
source: TPS app.css L240–246 (.page-toolbar)
---

Toolbar mengumpulkan aksi yang sering dipakai pada satu area (editor, tabel, kanvas) dalam satu baris. Pakai bila ada 4 kontrol terkait atau lebih. Untuk satu atau dua aksi pakai tombol di [Page header](./page-header.md); untuk pilihan yang saling eksklusif pakai [Segmented control](./segmented-control.md).

> [!NOTE]
> `.ds-toolbar` versi 1 (teks di sisi awal, aksi di sisi akhir) tetap berfungsi bila elemen tidak punya `role="toolbar"`.

## Examples

### Grup dan pemisah

```html preview title="Toolbar pemformatan"
<div class="ds-toolbar" role="toolbar" aria-label="Pemformatan teks">
  <div class="ds-toolbar__group" role="group" aria-label="Gaya">
    <button type="button" class="ds-toolbar__item" aria-pressed="true" aria-label="Tebal"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bold"/></svg></button>
    <button type="button" class="ds-toolbar__item" aria-pressed="false" aria-label="Miring"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-italic"/></svg></button>
    <button type="button" class="ds-toolbar__item" aria-pressed="false" aria-label="Garis bawah"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-underline"/></svg></button>
  </div>
  <div class="ds-toolbar__separator" role="separator"></div>
  <div class="ds-toolbar__group" role="group" aria-label="Daftar">
    <button type="button" class="ds-toolbar__item" aria-label="Daftar berpoin"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-list"/></svg></button>
    <button type="button" class="ds-toolbar__item" aria-label="Daftar bernomor"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-list-ordered"/></svg></button>
  </div>
  <div class="ds-toolbar__spacer"></div>
  <button type="button" class="ds-toolbar__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-save"/></svg>Simpan</button>
</div>
```

### Menu overflow

Tambahkan `data-ds-toolbar-overflow`. Item yang tidak muat pindah, berurutan, ke menu "Aksi lainnya" dan kembali saat ada ruang. Ubah ukuran jendela untuk melihatnya.

```html preview title="Toolbar dengan overflow"
<div style="max-width: 24rem; resize: horizontal; overflow: hidden; padding-bottom: 0.25rem">
  <div class="ds-toolbar" role="toolbar" aria-label="Aksi tabel" data-ds-toolbar-overflow>
    <button type="button" class="ds-toolbar__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"/></svg>Baru</button>
    <button type="button" class="ds-toolbar__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-filter"/></svg>Filter</button>
    <button type="button" class="ds-toolbar__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"/></svg>Ekspor</button>
    <button type="button" class="ds-toolbar__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-printer"/></svg>Cetak</button>
    <button type="button" class="ds-toolbar__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-archive"/></svg>Arsipkan</button>
  </div>
</div>
```

### Vertikal dan flat

```html preview title="Toolbar vertikal"
<div class="ds-toolbar is-vertical" role="toolbar" aria-orientation="vertical" aria-label="Alat kanvas">
  <button type="button" class="ds-toolbar__item" aria-pressed="true" aria-label="Pindah"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-move"/></svg></button>
  <button type="button" class="ds-toolbar__item" aria-pressed="false" aria-label="Perbesar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-zoom-in"/></svg></button>
  <div class="ds-toolbar__separator" role="separator"></div>
  <button type="button" class="ds-toolbar__item" aria-label="Urungkan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-undo"/></svg></button>
  <button type="button" class="ds-toolbar__item" aria-label="Ulangi" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-redo"/></svg></button>
</div>
```

## States

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak ada | Item transparan di permukaan toolbar |
| Hover | Pointer di atas item (perangkat hover) | State layer 6% |
| Pressed | Pointer ditekan | State layer 10%, skala 0,97 |
| Focus-visible | Fokus keyboard pada satu tab stop | Ring 2px `--ds-focus`, offset 2px |
| On (toggle) | `aria-pressed="true"`, `aria-checked="true"` | Isian primary tonal dan teks primary |
| Disabled | `disabled` | Opacity 0,55, `not-allowed`, dilewati tombol panah |
| aria-disabled | `aria-disabled="true"` | Tampilan sama, tetap terjangkau agar tooltip bisa menjelaskan alasannya |
| Busy | `aria-busy="true"` pada item | Event pointer diblokir; tampilkan spinner sebelum label |
| Overflow | Item tidak muat | Item di ujung pindah ke menu Aksi lainnya |
| Menu terbuka | `:popover-open` | Panel memudar masuk dengan gerak 5px dari tombol, 160ms; keluar dalam 140ms |

## Anatomy

- `.ds-toolbar[role="toolbar"]`: barisnya. Modifier `.is-vertical`, `.is-flat` (tanpa bingkai).
- `.ds-toolbar__group[role="group"]`: item terkait; beri `aria-label`.
- `.ds-toolbar__item`: tombol, toggle, atau tautan. Item hanya-ikon butuh `aria-label`.
- `.ds-toolbar__separator`, `.ds-toolbar__spacer`, `.ds-toolbar__title`.
- `.ds-toolbar__overflow-menu`, `.ds-toolbar__overflow` (popover): dibuat oleh script.

## Usage

- Taruh 4 sampai 12 item dalam satu toolbar; kelompokkan menurut tugas dengan pemisah antar grup (2 sampai 5 item per grup).
- Urutkan dari yang paling sering ke paling jarang; pisahkan aksi destruktif dan letakkan paling akhir.
- Item hanya-ikon untuk aksi yang dikenal luas; tambahkan label teks untuk selebihnya.
- Jangan mencampur aksi tak terkait dari area berbeda dalam satu toolbar.
- Jangan menyembunyikan satu-satunya cara melakukan sesuatu di menu overflow; sediakan juga di tempat lain untuk layar sentuh.

## Accessibility

- `role="toolbar"` dengan `aria-label` (dan `aria-orientation="vertical"` bila bertumpuk). Grup memakai `role="group"`; pemisah `role="separator"`.
- Satu tab stop: item yang terakhir difokus memegang `tabindex="0"`, lainnya `-1` (roving tabindex). Tab meninggalkan toolbar.
- Tombol toggle memakai `aria-pressed`; item di menu overflow menjaga status dan handler-nya karena elemen yang sama berpindah.
- Target 36px dengan area sentuh 44px; kontras ikon 3:1 dan teks 4,5:1.
- Reduced motion: menu cross-fade tanpa gerak; skala tekan dihapus.

| Tombol | Aksi |
| --- | --- |
| Tab | Masuk atau keluar toolbar (satu perhentian) |
| Kanan, Kiri | Item berikut, sebelumnya (dibalik pada bahasa kanan-ke-kiri); toolbar vertikal memakai Bawah, Atas |
| Home, End | Item pertama, terakhir |
| Enter, Space | Mengaktifkan item |
| Bawah, Atas (di menu overflow) | Entri berikut, sebelumnya |
| Escape | Menutup menu overflow dan kembali ke tombolnya |

## Razor

```cshtml
<ds-toolbar label="Aksi tabel" overflow>
    <ds-toolbar-group label="Baris">
        <button type="button" class="ds-toolbar__item">Baru</button>
        <button type="button" class="ds-toolbar__item">Arsipkan</button>
    </ds-toolbar-group>
    <ds-toolbar-separator />
    <ds-toolbar-spacer />
    <button type="button" class="ds-toolbar__item">Ekspor</button>
</ds-toolbar>
```

Atribut: `label` (bawaan "Bilah alat"), `overflow`, `vertical`, `flat`.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `role="toolbar"` | Roving focus dan tombol panah |
| `data-ds-toolbar-overflow` | Memindahkan item yang tidak muat ke menu "Aksi lainnya" (memantau lebar dengan `ResizeObserver`) |

Panggil `DS.init(root)` setelah menyisipkan toolbar. String: `toolbar.more`.

## Tokens

`--ds-size-target-compact`, `--ds-radius-lg`, `--ds-radius-box`, `--ds-opacity-state-*`, `--ds-press-scale`, `--ds-focus`, `--ds-shadow-popover`, `--ds-enter-offset`, `--ds-duration-fast|instant|quick|exit`.

## Native and daisyUI

Dibangun di atas `button` dan API popover native. Tidak memakai daisyUI `join` atau `btn`; item dibuat datar agar satu baris terbaca sebagai satu kontrol.
