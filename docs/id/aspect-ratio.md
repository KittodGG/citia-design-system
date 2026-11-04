---
title: Aspect ratio
group: components
category: data-display
order: 21
summary: Kotak dengan rasio lebar-tinggi tetap (1:1, 4:3, 16:9, 21:9) yang memesan ruang untuk gambar, video, peta, dan embed sebelum dimuat.
---

Pakai aspect ratio untuk memesan ruang media yang datang terlambat: gambar, video, peta, dokumen tersemat. Kotak mempertahankan bentuknya di setiap lebar, sehingga halaman tidak bergeser. Untuk gambarnya sendiri, dengan placeholder dan fallback galat, lihat [image](./image.md); untuk sederet kotak, lihat [carousel](./carousel.md). Ini satu properti CSS (`aspect-ratio`) dengan satu class untuk tiap rasio umum.

## Contoh

### Ratios

`is-square` (1:1), `is-4-3`, `is-3-2`, `is-16-9` (bawaan), `is-21-9`, serta rasio potret `is-3-4` dan `is-9-16`. Kotak selebar wadahnya; atur lebar pada pembungkus.

```html preview title="Rasio"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(8rem,1fr));align-items:end">
  <div class="ds-aspect is-square"><div class="ds-aspect__fill">1:1</div></div>
  <div class="ds-aspect is-4-3"><div class="ds-aspect__fill">4:3</div></div>
  <div class="ds-aspect is-16-9"><div class="ds-aspect__fill">16:9</div></div>
  <div class="ds-aspect is-21-9"><div class="ds-aspect__fill">21:9</div></div>
</div>
```

### With media

Anak langsung berupa `img`, `video`, `iframe`, `canvas`, `svg`, `picture`, `.ds-image-frame`, atau `.ds-aspect__fill` memenuhi kotak. Gambar dan video memakai `object-fit: cover` kecuali `--ds-fit` menyatakan lain.

```html preview title="Gambar dan embed dalam kotak"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))">
  <div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan di bawah matahari pucat" loading="lazy" decoding="async"></div>
  <div class="ds-aspect is-16-9"><iframe title="Placeholder peta" src="about:blank" loading="lazy"></iframe></div>
</div>
```

### Custom ratio

Atur `--ds-ratio` untuk bentuk lain: `style="--ds-ratio: 5 / 2"`. Pakai `is-flat` untuk menghapus radius dan latar saat kotak menempel rata di dalam kartu.

```html preview title="Rasio kustom dan flat"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))">
  <div class="ds-aspect" style="--ds-ratio: 5 / 2"><div class="ds-aspect__fill">5:2</div></div>
  <div class="ds-aspect is-3-2 is-flat" style="outline:1px dashed var(--color-base-300)"><div class="ds-aspect__fill">flat</div></div>
</div>
```

## State

Kotak tidak interaktif dan hanya punya satu tampilan diam. Yang berubah adalah isinya, jadi tabel mendaftar apa yang diharapkan.

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Selalu | Rasio tetap, latar `--color-base-200`, `--ds-radius-box` |
| Kosong | Tanpa anak | Hanya latar; tambahkan `.ds-aspect__fill` berisi teks pendek tentang apa yang akan muncul |
| Loading | Media belum dimuat | Kotak sudah memegang ukurannya; anak dapat menampilkan [skeleton](./skeleton.md) atau placeholder gambar |
| Overflow | Anak lebih besar dari kotak | Dipotong (`overflow: hidden`); kecocokan diatur oleh `--ds-fit` dan `--ds-position` |
| Dark | `data-theme="dark"` | Latar adalah `--color-base-200` gelap |
| Cetak | `@media print` | Rasio sama; latar tercetak hanya bila browser mencetak latar |
| RTL | `dir="rtl"` | Tidak berubah; rasionya simetris |

## Anatomi

- `.ds-aspect`: kotaknya (`position: relative; overflow: hidden; aspect-ratio: var(--ds-ratio)`).
- `.is-square`, `.is-4-3`, `.is-3-2`, `.is-16-9`, `.is-21-9`, `.is-3-4`, `.is-9-16`: rasio.
- `.is-flat`, `.is-radius-none|sm|lg|xl|full`: varian sudut dan latar.
- `.ds-aspect__fill`: konten placeholder di tengah.
- Media anak: diposisikan memenuhi kotak, `object-fit: var(--ds-fit, cover)`, `object-position: var(--ds-position, center)`.

## Penggunaan

- Pesan rasio media yang sebenarnya. Foto 1200 × 800 adalah `is-3-2`; video 1920 × 1080 adalah `is-16-9`.
- Pakai `is-16-9` untuk video dan peta, `is-4-3` dan `is-3-2` untuk foto, `is-square` untuk thumbnail dan avatar grup, `is-21-9` untuk banner di atas 768px.
- Beri kotak lebar lewat wadahnya (sel grid, `max-width: 26rem`), jangan pernah tinggi piksel tetap.
- Pakai rasio yang lebih tinggi di ponsel dengan mengatur `--ds-ratio` dalam media query; banner 21:9 hanya setinggi 167px pada 390px.
- Jangan menaruh teks yang harus tetap terbaca di dalam kotak yang anaknya terpotong (`is-cover`); pakai `is-contain`.
- Jangan menumpuk satu kotak aspect di dalam kotak lainnya.

## Aksesibilitas

- Kotak tidak punya role. Taruh nama aksesibel pada anaknya: `alt` pada gambar, `title` pada `iframe`, `<track>` dan kontrol pada video.
- Kotak yang hanya memesan ruang untuk media hiasan tak terlihat oleh teknologi bantu; jangan tambahkan `role` atau `aria-label`.
- Pemotongan dapat menghilangkan informasi. Untuk foto dengan tepi penting (papan nama, label), pakai `is-contain` atau geser titik fokus dengan `--ds-position`.
- Tanpa gerak dan tanpa interaksi: tidak ada yang diumumkan dan tidak ada yang difokus.

## Razor

```cshtml
<ds-aspect-ratio ratio="16/9">
    <iframe src="@Model.MapUrl" title="Peta lokasi kantor" loading="lazy"></iframe>
</ds-aspect-ratio>
```

| Atribut | Efek |
| --- | --- |
| `ratio` | `1/1` (atau `square`), `4/3`, `3/2`, `16/9` (bawaan), `21/9`, `3/4`, `9/16` |
| `flat` | Menghapus radius dan latar |

## Token

`--ds-ratio` (diatur per kotak), `--ds-fit`, `--ds-position`, `--color-base-200`, `--ds-radius-box`, `--ds-radius-sm`, `--ds-radius-card`, `--ds-radius-2xl`, `--ds-radius-full`, `--ds-subtle`, `--ds-type-callout-size`.

## Native dan daisyUI

Ini properti CSS `aspect-ratio` native, didukung semua browser terkini, sehingga trik padding tidak diperlukan. Utilitas `aspect-*` Tailwind (`aspect-video`, `aspect-square`) menghasilkan kotak yang sama; `.ds-aspect` menambah latar, radius, pemotongan, dan penyesuaian anak.
