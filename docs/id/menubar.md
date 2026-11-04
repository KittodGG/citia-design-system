---
title: Menubar
group: components
category: overlays
order: 8
summary: Bilah horizontal berisi menu seperti di aplikasi desktop, dengan satu Tab stop, perpindahan antarmenu dengan tombol panah, dan menu yang mengikuti pointer.
---

Menubar adalah deretan tombol menu (Berkas, Ubah, Tampilan) yang berperilaku seperti menu bar aplikasi desktop. Komponen ini cocok untuk editor dan alat dengan banyak perintah: editor dokumen, report builder, atau konsol admin. Bilah ini adalah satu Tab stop; ArrowLeft dan ArrowRight berpindah antarmenu, dan setelah satu menu terbuka, menggerakkan pointer atau tombol panah ke menu berikutnya akan membuka menu tersebut. Setiap menu adalah [Dropdown menu](./dropdown-menu.md). Untuk berpindah antarhalaman gunakan [Navbar](./navbar.md) atau [Navigation menu](./navigation-menu.md); untuk sedikit aksi gunakan [Toolbar](./toolbar.md).

## Contoh

```html preview title="Editor laporan"
<div role="menubar" class="ds-menubar" aria-label="Editor laporan">
  <button type="button" role="menuitem" class="ds-menubar__item" aria-haspopup="menu" popovertarget="mb-file">Berkas</button>
  <button type="button" role="menuitem" class="ds-menubar__item" aria-haspopup="menu" popovertarget="mb-edit">Ubah</button>
  <button type="button" role="menuitem" class="ds-menubar__item" aria-haspopup="menu" popovertarget="mb-view">Tampilan</button>
  <button type="button" role="menuitem" class="ds-menubar__item" aria-haspopup="menu" popovertarget="mb-help">Bantuan</button>
</div>

<div id="mb-file" popover class="ds-menu" role="menu" aria-label="Berkas">
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-plus"></use></svg><span class="ds-menu__text">Laporan baru</span><kbd class="ds-menu__shortcut">Ctrl N</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder-open"></use></svg><span class="ds-menu__text">Buka</span><kbd class="ds-menu__shortcut">Ctrl O</kbd></button>
  <div class="ds-menu__sub" role="none">
    <button type="button" role="menuitem" class="ds-menu__item" aria-haspopup="menu" aria-controls="mb-file-recent"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-history"></use></svg><span class="ds-menu__text">Buka terbaru</span><svg class="ds-menu__chevron" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></button>
    <div id="mb-file-recent" popover class="ds-menu" role="menu" aria-label="Buka terbaru">
      <button type="button" role="menuitem" class="ds-menu__item"><span class="ds-menu__text">Pendapatan Q1 per klien</span></button>
      <button type="button" role="menuitem" class="ds-menu__item"><span class="ds-menu__text">Faktur jatuh tempo, Maret 2026</span></button>
      <button type="button" role="menuitem" class="ds-menu__item"><span class="ds-menu__text">Jam kerja per proyek</span></button>
    </div>
  </div>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-save"></use></svg><span class="ds-menu__text">Simpan</span><kbd class="ds-menu__shortcut">Ctrl S</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg><span class="ds-menu__text">Ekspor ke Excel</span></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-printer"></use></svg><span class="ds-menu__text">Cetak</span><kbd class="ds-menu__shortcut">Ctrl P</kbd></button>
</div>

<div id="mb-edit" popover class="ds-menu" role="menu" aria-label="Ubah">
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-undo"></use></svg><span class="ds-menu__text">Urungkan</span><kbd class="ds-menu__shortcut">Ctrl Z</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-redo"></use></svg><span class="ds-menu__text">Ulangi</span><kbd class="ds-menu__shortcut">Ctrl Y</kbd></button>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplikat grafik</span><kbd class="ds-menu__shortcut">Ctrl D</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Hapus grafik</span><kbd class="ds-menu__shortcut">Del</kbd></button>
</div>

<div id="mb-view" popover class="ds-menu" role="menu" aria-label="Tampilan">
  <button type="button" role="menuitemcheckbox" aria-checked="true" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Tampilkan grid</span></button>
  <button type="button" role="menuitemcheckbox" aria-checked="false" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Tampilkan label data</span></button>
  <div role="separator" class="ds-menu__separator"></div>
  <div role="group" aria-labelledby="mb-view-zoom">
    <div id="mb-view-zoom" class="ds-menu__label" role="presentation">Zoom</div>
    <button type="button" role="menuitemradio" aria-checked="false" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">75%</span></button>
    <button type="button" role="menuitemradio" aria-checked="true" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">100%</span></button>
    <button type="button" role="menuitemradio" aria-checked="false" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">Sesuaikan lebar</span></button>
  </div>
</div>

<div id="mb-help" popover class="ds-menu" role="menu" aria-label="Bantuan">
  <a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-help-circle"></use></svg><span class="ds-menu__text">Panduan report builder</span></a>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-keyboard"></use></svg><span class="ds-menu__text">Pintasan keyboard</span><kbd class="ds-menu__shortcut">?</kbd></button>
</div>
```

## State

```html preview title="State item bilah"
<div role="menubar" class="ds-menubar" aria-label="State">
  <span role="menuitem" class="ds-menubar__item" tabindex="-1">Diam</span>
  <span role="menuitem" class="ds-menubar__item" tabindex="-1" aria-expanded="true">Terbuka</span>
  <span role="menuitem" class="ds-menubar__item" tabindex="-1" aria-disabled="true">Nonaktif</span>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Diam | default | Transparan, bobot medium, tinggi 36px (44px di layar sentuh) |
| Hover | `:hover` | State layer 6% |
| Ditekan / terbuka | `:active`, `aria-expanded="true"` | State layer 10% selama menunya terbuka |
| Fokus | `:focus-visible` | Ring `--ds-focus` inset 2px |
| Nonaktif | `aria-disabled="true"` | Opasitas 55%, dilewati tombol panah |
| Berpindah | pointer atau ArrowLeft/Right saat menu terbuka | Menu yang terbuka menutup (140ms) dan menu berikutnya terbuka (160ms) |
| State menu | — | Lihat [Dropdown menu](./dropdown-menu.md#state) |

## Anatomi

- `[role=menubar].ds-menubar`: bilah, dengan nama aksesibel.
- `.ds-menubar__item[role=menuitem][aria-haspopup=menu]`: satu per menu, mengarah ke menunya dengan `popovertarget`.
- `[popover].ds-menu[role=menu]`: setiap menu, dengan anatomi dropdown menu.

## Penggunaan

- Gunakan menubar hanya bila ada lebih dari sekitar 15 perintah yang perlu diatur; selain itu, toolbar dengan menu "Lainnya" lebih sederhana.
- Batasi bilah pada 3–7 menu dengan nama satu kata, dalam urutan konvensional: Berkas, Ubah, Tampilan, Sisipkan, Format, Alat, Bantuan.
- Tampilkan pintasan keyboard di dalam menu dan pastikan pintasan itu berfungsi di halaman.
- Jangan letakkan tautan navigasi di menubar; komponen ini untuk perintah.

## Aksesibilitas

- Bilah adalah satu Tab stop (`tabindex` roving); item yang terakhir fokus diingat.
- Setiap item memiliki `aria-haspopup="menu"` dan `aria-expanded`; setiap menu memiliki nama.

| Tombol | Aksi |
| --- | --- |
| Tab | Masuk dan keluar dari bilah |
| ArrowRight / ArrowLeft (bilah) | Item berikutnya / sebelumnya (berputar); membukanya jika sebuah menu sedang terbuka |
| Home / End (bilah) | Item pertama / terakhir |
| Enter / Space / ArrowDown (bilah) | Membuka menu, item pertama di-highlight |
| ArrowUp (bilah) | Membuka menu, item terakhir di-highlight |
| ArrowRight / ArrowLeft (menu) | Membuka submenu / menutupnya; pada item biasa, pindah ke menu berikutnya / sebelumnya |
| Escape (menu) | Menutup dan mengembalikan fokus ke item bilah |

## Razor

```cshtml
<div role="menubar" class="ds-menubar" aria-label="Editor laporan">
    <button type="button" role="menuitem" class="ds-menubar__item" aria-haspopup="menu" popovertarget="mb-file">Berkas</button>
    <button type="button" role="menuitem" class="ds-menubar__item" aria-haspopup="menu" popovertarget="mb-edit">Ubah</button>
</div>

<ds-menu id="mb-file" label="Berkas">
    <ds-menu-item icon="file-plus" shortcut="Ctrl N">Laporan baru</ds-menu-item>
    <ds-menu-item icon="save" shortcut="Ctrl S">Simpan</ds-menu-item>
</ds-menu>
<ds-menu id="mb-edit" label="Ubah">
    <ds-menu-item icon="undo" shortcut="Ctrl Z">Urungkan</ds-menu-item>
</ds-menu>
```

## JavaScript

Tidak ada atribut tambahan: `role="menubar"` mengaktifkan roving focus dan perpindahan menu. Menu memicu event dropdown menu
(`ds:menu:open`, `ds:menu:select`, `ds:menu:close`); `DS.menu.open(id)` dan `DS.menu.closeAll()` juga berfungsi di sini.

## Token

`--color-base-100`, `--color-base-300`, `--ds-radius-lg`, `--ds-radius-md`, `--ds-opacity-state-hover`,
`--ds-opacity-state-pressed`, `--ds-opacity-disabled`, `--ds-focus`, `--ds-size-target`, `--ds-size-target-compact`,
`--ds-type-callout-size`, `--ds-weight-medium`, dan token [Dropdown menu](./dropdown-menu.md#token).

## Native dan daisyUI

- Dibangun dari button dan popover HTML; tanpa JavaScript setiap item bilah tetap membuka menunya.
- `.menu-horizontal` daisyUI adalah daftar navigasi, bukan menubar ARIA; gunakan untuk tautan, dan `.ds-menubar` untuk perintah.
