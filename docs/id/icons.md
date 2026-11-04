---
title: Ikon
group: foundations
order: 6
summary: Set ikon SVG inline di grid 24px dengan satu stroke 2px, ukuran, pemakaian yang aksesibel, dan cara menambah ikon.
source: docs/_legacy/ikon.md
---

Set ini berisi ikon outline di grid 24px: stroke 2px, ujung dan sambungan bulat, `stroke="currentColor"`, sehingga ikon mengikuti warna teks di sekitarnya. Geometrinya mengikuti Lucide. Sumbernya `wwwroot/icons/icons.json`; generator mengubahnya menjadi sprite dan tabel C#. Ikon menemani kata dan tidak menggantikannya: tombol utama tetap berlabel.

Set ini juga menyimpan ikon domain untuk aplikasi logistik (`tank`, `ship`, `port`, `warehouse`, `truck`). Ikon-ikon itu entri biasa dan tetap tersedia untuk produk mana pun.

## Semua ikon

Pilih sebuah ikon untuk menyalin namanya. Grid dirender langsung dari `Icon.Names`.

```ds-icons
```

## Ukuran

| Class | Ukuran | Pakai untuk |
| --- | --- | --- |
| `ds-icon` | 16px (`--ds-size-icon-sm`) | Di dalam tombol dan teks |
| `ds-icon is-xs` | 12px | Penanda kecil, chevron di badge |
| `ds-icon is-md` | 18px (`--ds-size-icon-md`) | Navigasi sidebar |
| `ds-icon is-lg` | 20px (`--ds-size-icon-lg`) | Kontrol toolbar, empty state |
| `ds-icon is-xl` | 32px (`--ds-size-icon-xl`) | Dropzone, avatar akun |

```html preview title="Ukuran ikon"
<div class="ds-actions is-start">
  <svg class="ds-icon is-xs" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
  <svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
  <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
  <svg class="ds-icon is-xl" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
</div>
```

## Pemakaian

- Pakai satu ketebalan stroke. Jangan mencampur set ini dengan ikon berbobot atau bergaya lain.
- Pasangkan ikon dengan kata: "Unduh faktur" dengan `download`. Kontrol hanya-ikon untuk aksi yang sering dan dikenal luas (tutup, lainnya, cari).
- Satu ikon untuk satu arti. Dua item sidebar tidak berbagi ikon.
- Jangan menulis warna di dalam ikon. Atur `color` pada elemen induk.
- `star-filled` satu-satunya ikon berisi; ia menandai favorit aktif, dengan `star` sebagai keadaan tidak aktif.

## Aksesibilitas

- Ikon dekoratif memakai `aria-hidden="true"` dan `focusable="false"` (bawaan).
- Kontrol yang hanya berisi ikon wajib punya nama: `aria-label` pada `<button>` atau `<a>`.
- Beri ikon `label` (`role="img"`) hanya bila ia berdiri sendiri dan tidak ada elemen yang menamainya. Jangan memberi label pada ikon di samping teks.
- Jangan biarkan ikon menjadi satu-satunya pembawa arti: tulis status dengan kata.
- Tombol ikon menjaga area sentuh 44px pada pointer kasar.

## Razor

```cshtml
@using Citia.DesignSystem.Icons

<ds-icon name="folder" size="lg" />
<button type="button" class="btn btn-ghost btn-square" aria-label="Hapus INV-2026-0418">@Icon.Svg("trash")</button>
@Icon.Svg("alert-triangle", "ds-icon is-lg", label: "Peringatan")
```

`Icon.Svg(name, class)` melempar `ArgumentException` untuk nama yang tidak dikenal, sehingga salah ketik gagal saat pengembangan. Pakai `Icon.Exists(name)` untuk memeriksa dan `Icon.Names` untuk mendaftar. `<ds-icon name size>` menerima `xs`, `md`, `lg`, `xl`; tanpa `size` ikon berukuran 16px. Untuk HTML statis, render `<partial name="_DsIconSprite" />` sekali, lalu rujuk dengan `<svg class="ds-icon"><use href="#ds-icon-NAMA"></use></svg>`.

## JavaScript

`icon(name, className)` dari `core.js` mengembalikan string SVG inline, dekoratif secara bawaan. Nama yang tidak dikenal menghasilkan `<svg>` kosong.

```js
import { icon } from "/_content/Citia.DesignSystem/js/core.js";
button.insertAdjacentHTML("afterbegin", icon("plus"));
```

## Menambah ikon

1. Tambahkan entri di `src/Citia.DesignSystem/wwwroot/icons/icons.json`: nama huruf kecil dengan tanda hubung dan isi `<svg>` (tanpa tag pembungkus) di grid 24px, padding 2px dari tepi, tanpa warna.
2. Jalankan `dotnet run tools/tokens.cs` dari root repositori. Perintah ini menghasilkan ulang `Icons/IconSet.g.cs` dan `wwwroot/icons/sprite.svg`, lalu mencetak jumlah ikon.
3. Bila path berasal dari Lucide atau sumber lain, simpan teks lisensinya di bagian ikon pada `NOTICE.md`.

> [!NOTE]
> Versi 1 halaman ini ada di `docs/_legacy/ikon.md` (bahasa Indonesia).
