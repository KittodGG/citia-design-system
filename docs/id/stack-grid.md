---
title: Stack and grid
group: components
category: layout
order: 5
summary: Primitif tata letak dengan token jarak: stack (vertikal), cluster (baris membungkus), grid (kolom auto-fit), split (samping dan utama), dan center.
---

Kelima primitif ini menata elemen tanpa CSS khusus. Pilih menurut bentuk yang diinginkan: kolom (`.ds-stack`), baris yang membungkus (`.ds-cluster`), kolom sama lebar yang menyesuaikan ruang (`.ds-grid`), sisi tetap di samping utama yang lentur (`.ds-split`), ukuran baca di tengah (`.ds-center`). Primitif hanya mengatur tata letak dan jarak, tidak pernah warna. Untuk lebar halaman pakai [Container](./container.md).

## Examples

### Stack dan cluster

```html preview title="Stack dengan cluster aksi"
<div class="ds-stack is-gap-md">
  <div class="ds-stack is-gap-xs"><strong>Renovasi Harbour Street</strong><span>PRJ-1024, tenggat 30 Nov 2026</span></div>
  <div class="ds-cluster is-gap-sm">
    <span class="badge badge-success badge-soft">Aktif</span><span class="badge badge-soft">12 tugas</span><span class="badge badge-soft">Daniel Okafor</span>
  </div>
  <div class="ds-cluster is-end"><button type="button" class="btn btn-outline">Arsipkan</button><button type="button" class="btn btn-primary">Buka</button></div>
</div>
```

### Grid

`--ds-grid-min` menentukan kolom tersempit (bawaan 16rem); kolom mengisi baris dan membungkus. `is-cols-2|3|4` memberi jumlah kolom tetap yang turun menjadi 2 dan 1 di layar sempit.

```html preview title="Grid auto-fit"
<div class="ds-grid is-min-sm is-gap-md">
  <div class="ds-surface" style="padding: 1rem">INV-2026-0418<br>1.240,00</div>
  <div class="ds-surface" style="padding: 1rem">INV-2026-0419<br>380,50</div>
  <div class="ds-surface" style="padding: 1rem">INV-2026-0420<br>2.905,00</div>
  <div class="ds-surface" style="padding: 1rem">INV-2026-0421<br>96,00</div>
</div>
```

### Split dan center

Kolom samping menjaga `--ds-split-side` (16rem) dan kolom utama mengambil sisanya. Bila kolom utama akan turun di bawah 50%, keduanya bertumpuk.

```html preview title="Split"
<div class="ds-split is-gap-lg">
  <aside class="ds-surface" style="padding: 1rem">Filter: status, penanggung jawab, tanggal</aside>
  <div class="ds-stack"><div class="ds-surface" style="padding: 1rem">Mei Tanaka, 4 tugas terbuka</div><div class="ds-surface" style="padding: 1rem">Sofia Marquez, 2 tugas terbuka</div></div>
</div>
<div class="ds-center is-text" style="margin-top: 1.5rem"><p>Tidak ada faktur yang cocok dengan filter ini.</p></div>
```

## Gap tokens

Tambahkan `.is-gap-*` pada stack, cluster, grid, atau split. Bawaannya `md`.

| Class | Token | Nilai |
| --- | --- | --- |
| `.is-gap-0` | tidak ada | 0 |
| `.is-gap-xs` | `--ds-space-1` | 4px |
| `.is-gap-sm` | `--ds-space-2` | 8px |
| `.is-gap-md` | `--ds-space-4` | 16px |
| `.is-gap-lg` | `--ds-space-6` | 24px |
| `.is-gap-xl` | `--ds-space-8` | 32px |
| `.is-gap-2xl` | `--ds-space-12` | 48px |

## States

Primitif tidak punya state interaktif. State-nya menyangkut ruang.

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Lebar | Ruang longgar | Kolom grid tumbuh ke `1fr`; cluster tetap satu baris |
| Sempit | Di bawah lebar kolom minimum | Grid menjadi satu kolom; cluster membungkus; split bertumpuk |
| Sel kosong | Item lebih sedikit dari kolom | `auto-fit` meregangkan item; `auto-fill` mempertahankan track kosong |
| Konten panjang | Teks lebih panjang dari kolom | `min-width: 0` pada anak membuat teks membungkus, bukan meluap |
| Kanan-ke-kiri | `dir="rtl"` | Urutan dicerminkan; `.is-reverse` pada split menukar sisi |
| Cetak | `@media print` | Tata letak sama; tanpa tinggi tetap |

## Anatomy

- `.ds-stack` modifier `.is-center`, `.is-end`, `.is-stretch`.
- `.ds-cluster` modifier `.is-start`, `.is-baseline`, `.is-end`, `.is-center`, `.is-between`, `.is-nowrap`.
- `.ds-grid` modifier `.is-min-xs|sm|md|lg|xl` (10, 13, 16, 22, 30rem), `.is-fill`, `.is-stretch`, `.is-cols-2|3|4`; anak `.is-span-2`, `.is-span-full`.
- `.ds-split` modifier `.is-reverse`, `.is-side-sm|md|lg` (12, 16, 22rem). Anak pertama adalah sisinya.
- `.ds-center` modifier `.is-text`, `.is-intrinsic`, `.is-both`; variabel `--ds-center-max`.

## Usage

- Pakai gap, bukan margin pada anak, agar menghapus item tidak meninggalkan ruang sisa.
- Pakai `.ds-grid` untuk card berbobot sama dan `.ds-split` untuk daftar di samping detail.
- Batasi sarang tiga tingkat; lebih dari itu, buat komponen bernama.
- Jangan memakainya untuk tabel data (lihat [Table](./table.md)) atau tata letak form (lihat [Form](./form.md)).

## Accessibility

Primitif adalah elemen generik dan tidak menambah role. Urutan DOM adalah urutan baca: jangan memakai `.is-reverse` atau `order` untuk mengubah urutan makna. Target di dalamnya tetap minimal 24px dan 44px pada layar sentuh; gap 8px atau lebih menjaga target berdekatan tetap terpisah.

## Tokens

`--ds-space-1`, `-2`, `-4`, `-6`, `-8`, `-12`, `--ds-gap`, `--ds-grid-min`, `--ds-split-side`, `--ds-center-max`, `--ds-size-measure`.

## Native and daisyUI

Flexbox dan CSS grid biasa dengan properti `gap`. Mereka berdampingan dengan utility `flex`, `grid`, dan `gap-*` Tailwind yang tetap bisa dipakai; primitif menambah skala token dan perilaku membungkus. Class versi 1 `.ds-grid-2` dan `.ds-grid-3` tidak berubah.
