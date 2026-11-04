---
title: Page header
group: components
category: layout
order: 2
summary: Judul, deskripsi, breadcrumb, meta, aksi, dan tab di bagian atas halaman, dengan varian sticky opsional yang memadat saat digulir.
source: TPS app.css L1405–1424 (.master-heading), L3416–3422
---

Page header menamai halaman dan memuat aksi utamanya. Setiap halaman punya satu, dengan satu `<h1>`. Untuk judul di dalam card atau dialog pakai header komponen itu sendiri; untuk bar di atas semua halaman pakai top bar pada [App shell](./app-shell.md).

## Examples

### Judul, deskripsi, dan aksi

Aksi utama adalah tombol terakhir (paling kanan). Di layar sempit aksi turun di bawah teks dan urutannya tetap.

```html preview title="Header dengan aksi"
<header class="ds-page-header">
  <div class="ds-page-header__text">
    <h1 class="ds-page-title">Faktur</h1>
    <p class="ds-page-desc">Faktur terbit, lunas, dan terlambat untuk kuartal berjalan.</p>
  </div>
  <div class="ds-page-header__actions">
    <button type="button" class="btn btn-outline">Ekspor</button>
    <button type="button" class="btn btn-primary">Faktur baru</button>
  </div>
</header>
```

### Breadcrumb, meta, dan tab

```html preview title="Header lengkap"
<header class="ds-page-header">
  <nav class="ds-page-header__breadcrumb" aria-label="Breadcrumb">
    <a href="#">Proyek</a> / <span aria-current="page">PRJ-1024</span>
  </nav>
  <div class="ds-page-header__text">
    <h1 class="ds-page-title">Renovasi Harbour Street</h1>
    <div class="ds-page-header__meta"><span>PRJ-1024</span><span>Penanggung jawab: Daniel Okafor</span><span>Tenggat 30 Nov 2026</span><span class="badge badge-success badge-soft">Aktif</span></div>
  </div>
  <div class="ds-page-header__actions"><button type="button" class="btn btn-primary">Ubah proyek</button></div>
  <div class="ds-page-header__tabs">
    <div class="tabs tabs-border" role="tablist" aria-label="Bagian proyek">
      <a class="tab tab-active" role="tab" aria-selected="true" href="#">Ringkasan</a><a class="tab" role="tab" href="#">Tugas</a><a class="tab" role="tab" href="#">Berkas</a>
    </div>
  </div>
</header>
```

### Sticky dan compact

`.is-sticky` membuat header menempel di bawah top bar dengan permukaan tembus pandang. Setelah menempel, judul turun satu ukuran, deskripsi, meta, dan breadcrumb terlipat, dan garis tipis muncul. Gulir kotak di bawah.

```html preview title="Header sticky (gulir kotak)"
<div style="height: 16rem; overflow: auto; position: relative">
  <header class="ds-page-header is-sticky" style="--ds-main-pad-x: 0px; top: 0">
    <div class="ds-page-header__text"><h1 class="ds-page-title">Anggota tim</h1><p class="ds-page-desc">Undang orang dan kelola peran mereka.</p></div>
    <div class="ds-page-header__actions"><button type="button" class="btn btn-primary">Undang</button></div>
  </header>
  <p style="min-height: 30rem">Mei Tanaka, Sofia Marquez, dan 22 anggota lain.</p>
</div>
```

## States

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Default | tidak ada | Judul ukuran 1, deskripsi dan meta terlihat |
| Compact | `.is-compact` | Judul ukuran 2, untuk halaman sekunder dan portal |
| Stuck | `data-stuck` (dipasang script pada `.is-sticky`) | Judul ukuran 3, deskripsi dan meta disembunyikan, garis tipis terlihat, permukaan tembus pandang |
| Loading | Blok skeleton sebagai pengganti teks | Pertahankan tinggi judul agar halaman tidak melompat |
| Judul panjang | Judul lebih lebar dari baris | Membungkus (`text-wrap: balance`); tidak pernah dipotong |
| Layar sempit | Di bawah 640px | Aksi turun di bawah teks, rata kiri |
| State aksi | Tombol di dalamnya | Lihat [Button](./button.md) |

## Anatomy

- `.ds-page-header`: baris flex yang membungkus.
- `.ds-page-header__breadcrumb`: baris pertama; memuat [Breadcrumb](./breadcrumb.md).
- `.ds-page-header__text` dengan `.ds-page-title` (`h1`), `.ds-page-desc`, dan `.ds-page-header__meta`.
- `.ds-page-header__actions`: sisi akhir; aksi utama paling akhir.
- `.ds-page-header__tabs`: baris terakhir; memuat [Tabs](./tabs.md).

## Usage

- Satu `<h1>` per halaman. Jadikan judul frasa nomina 1 sampai 5 kata.
- Maksimal satu tombol primary; aksi sekunder diletakkan sebelumnya.
- Batasi deskripsi satu kalimat, 120 karakter atau kurang.
- Pakai meta untuk 2 sampai 4 fakta (kode, penanggung jawab, tanggal, status), bukan untuk navigasi.
- Pakai sticky hanya pada halaman panjang (lebih dari dua layar) dan saat aksi utama harus tetap terjangkau.
- Jangan menaruh card di belakang header; header berada di permukaan halaman.

## Accessibility

- Judul adalah heading sungguhan (`h1`; atur `heading-level` pada tag helper untuk level lain).
- Breadcrumb adalah `nav` dengan nama aksesibel dan `aria-current="page"` pada item terakhir.
- Bar sticky tidak boleh menutupi fokus: beri `scroll-margin` sebesar tinggi header pada CSS halaman bila perlu.
- Perubahan compact hanya memengaruhi ukuran teks; tidak ada yang bergerak kecuali pudar.
- Kontras: deskripsi 4,5:1 (`--ds-subtle`); garis tipis 3:1 atau terlihat di forced colours.

## Razor

```cshtml
<ds-page-header title="Faktur" description="Faktur terbit, lunas, dan terlambat." sticky>
    <ds-page-header-breadcrumb><nav aria-label="Breadcrumb"><a href="/projects">Proyek</a> / <span aria-current="page">PRJ-1024</span></nav></ds-page-header-breadcrumb>
    <ds-page-header-meta><span>Q4 2026</span><span>128 faktur</span></ds-page-header-meta>
    <ds-page-header-actions>
        <button type="button" class="btn btn-outline">Ekspor</button>
        <button type="button" class="btn btn-primary">Faktur baru</button>
    </ds-page-header-actions>
    <ds-page-header-tabs>...</ds-page-header-tabs>
</ds-page-header>
```

Atribut: `title`, `description`, `sticky`, `compact`, `heading-level` (bawaan 1).

## JavaScript

| Atribut | Efek |
| --- | --- |
| `.is-sticky` | Script memasang `data-stuck` saat header mencapai top bar dan halaman sudah tergulir |

Bekerja dengan window atau area gulir pada shell tertanam. Tanpa API.

## Tokens

`--ds-type-title-1|2|3-*`, `--ds-size-measure`, `--ds-topbar-h` (lokal, 3,5rem), `--ds-main-pad-x`, `--color-base-100`, `--color-base-300`, `--ds-subtle`, `--ds-duration-base`.

## Native and daisyUI

Dibangun di atas `header`, `h1`, `p`, dan `nav`. Tombol, tab, dan badge adalah class daisyUI. Markup versi 1 (`header > div` ditambah grup aksi) tetap berfungsi.
