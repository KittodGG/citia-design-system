---
title: Image
group: components
category: data-display
order: 20
summary: Gambar responsif dengan radius, object-fit, keterangan, placeholder saat memuat, fallback saat galat, dan zoom opsional dalam dialog lightbox.
---

Pakai gambar untuk konten yang membawa informasi atau suasana: foto, foto produk, diagram, ilustrasi. Untuk orang atau organisasi pakai [avatar](./avatar.md); untuk memesan kotak sebelum file tiba pakai [aspect ratio](./aspect-ratio.md); untuk menampilkan beberapa gambar berjajar pakai [carousel](./carousel.md). Markup-nya adalah `<img>` native. Frame opsional menambah placeholder saat file dimuat dan fallback saat gagal. Tidak ada bagian yang butuh JavaScript agar gambar terlihat.

## Contoh

### Radius

Radius bawaan adalah `--ds-radius-box` (10px). Pakai `is-radius-none` untuk gambar sampai tepi, `is-radius-sm`, `is-radius-lg`, `is-radius-xl`, dan `is-radius-full` dengan rasio persegi untuk potongan bulat.

```html preview title="Varian radius"
<div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start">
  <div style="width:9rem"><img class="ds-image is-radius-none" src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan di bawah matahari pucat" width="160" height="90" loading="lazy" decoding="async"></div>
  <div style="width:9rem"><img class="ds-image is-radius-sm" src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dbe4f3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f6e3b8'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234a6fb0'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%2334528a'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan biru di tengah hari" width="160" height="90" loading="lazy" decoding="async"></div>
  <div style="width:9rem"><img class="ds-image" src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23efe3d0'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23fbf1d3'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%23b9845a'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%238a5d3b'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan berpasir saat senja" width="160" height="90" loading="lazy" decoding="async"></div>
  <div style="width:9rem"><img class="ds-image is-radius-xl" src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dcebd9'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f4ead0'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234f8a5b'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%23356b43'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan hijau setelah hujan" width="160" height="90" loading="lazy" decoding="async"></div>
  <div style="width:5.625rem"><div class="ds-aspect is-square is-radius-full"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23e2e4ea'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f3e6cf'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%235b6478'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%233f4757'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan abu-abu dalam kabut"></div></div>
</div>
```

### Object fit

`is-cover` (bawaan) memenuhi kotak dan memotong, `is-contain` menampilkan seluruh gambar dengan bidang kosong, `is-fill` meregangkan, `is-scale-down` tidak pernah memperbesar. Atur `--ds-position` untuk menggeser titik fokus (`style="--ds-position: 30% 50%"`).

```html preview title="Cover, contain, dan fill dalam kotak 4:3"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr))">
  <figure class="ds-figure"><div class="ds-aspect is-4-3"><div class="ds-image-frame is-cover"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan, dipotong memenuhi kotak"></div></div><figcaption>cover</figcaption></figure>
  <figure class="ds-figure"><div class="ds-aspect is-4-3"><div class="ds-image-frame is-contain"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dbe4f3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f6e3b8'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234a6fb0'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%2334528a'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan, tampil utuh"></div></div><figcaption>contain</figcaption></figure>
  <figure class="ds-figure"><div class="ds-aspect is-4-3"><div class="ds-image-frame is-fill"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23efe3d0'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23fbf1d3'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%23b9845a'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%238a5d3b'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan, diregangkan"></div></div><figcaption>fill</figcaption></figure>
</div>
```

### Figure with caption

`<figure class="ds-figure">` memasangkan gambar dengan `<figcaption>`. Keterangan adalah teks yang terlihat, 12px, `--ds-subtle`; simpan `alt` untuk apa yang tampak pada gambar dan keterangan untuk maknanya.

```html preview title="Figure dan keterangan"
<figure class="ds-figure" style="max-width:26rem">
  <div class="ds-aspect is-16-9"><div class="ds-image-frame"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan di bawah matahari pucat, lokasi dilihat dari utara" width="160" height="90" loading="lazy" decoding="async"></div></div>
  <figcaption>Tampak utara lokasi, 28 Oktober 2026. Foto: Mei Tanaka.</figcaption>
</figure>
```

### Zoom

Bungkus gambar dengan tautan ke file besar dan tambahkan `data-ds-zoom`. Tanpa JavaScript tautan membuka file; dengan JavaScript, `<dialog>` lightbox terbuka (Esc, tombol tutup, atau klik di luar menutupnya, dan fokus kembali ke tautan).

```html preview title="Zoom dalam lightbox"
<figure class="ds-figure" style="max-width:20rem">
  <a class="ds-image-zoom" href="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dbe4f3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f6e3b8'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234a6fb0'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%2334528a'%2F%3E%3C%2Fsvg%3E" data-ds-zoom>
    <div class="ds-aspect is-16-9"><div class="ds-image-frame"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dbe4f3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f6e3b8'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234a6fb0'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%2334528a'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan biru di tengah hari. Membuka gambar yang diperbesar."></div></div>
  </a>
  <figcaption>Pilih gambar untuk memperbesarnya.</figcaption>
</figure>
```

## State

Frame menampilkan state loading dan galat. JavaScript mengatur `data-state` (`loading`, `loaded`, `error`); pratinjau di bawah membekukan tiap state dengan `data-ds-ready` agar skrip tidak menyentuhnya.

```html preview title="Loading, placeholder blur, dan galat"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr))">
  <figure class="ds-figure"><div class="ds-aspect is-16-9"><div class="ds-image-frame" data-state="loading" data-ds-ready><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan"></div></div><figcaption>Memuat, kilau</figcaption></figure>
  <figure class="ds-figure"><div class="ds-aspect is-16-9"><div class="ds-image-frame" data-placeholder="blur" data-state="loading" data-ds-ready style="--ds-blur:url(data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2016%209'%3E%3Crect%20width%3D'16'%20height%3D'9'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'12'%20cy%3D'3'%20r%3D'1.5'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%209V6l4-3%204%203%203-2%205%205z'%20fill%3D'%232f7f86'%2F%3E%3C%2Fsvg%3E)"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan"></div></div><figcaption>Memuat, pratinjau blur</figcaption></figure>
  <figure class="ds-figure"><div class="ds-aspect is-16-9"><div class="ds-image-frame" data-state="error" data-ds-ready><img src="/missing.jpg" alt="Kantor lokasi, pintu masuk utara"><div class="ds-image-frame__fallback"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-image"></use></svg><span>Kantor lokasi, pintu masuk utara</span></div></div></div><figcaption>Galat, fallback berisi teks alt</figcaption></figure>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest, termuat | File sudah didekode | Gambar sepenuhnya buram, latar frame tersembunyi di belakangnya |
| Loading | `data-state="loading"` (diatur selama `img.complete` false) | Gambar beropasitas 0, kilau (`--ds-duration-shimmer`) atau pratinjau blur di belakangnya |
| Loaded | Event `load` | Gambar memudar masuk selama `--ds-duration-quick` (160ms); pratinjau blur memudar keluar |
| Error | Event `error`, atau gambar terdekode tanpa piksel | Gambar disembunyikan, ikon beserta teks `alt` (atau "Gambar tidak tersedia") pada ukuran yang sama; `ds:image:error` dipicu |
| Hover (zoom) | Kursor di atas `.ds-image-zoom` | Tint 6% di atas gambar, kursor `zoom-in` |
| Focus-visible (zoom) | Tab ke tautan | Ring 2px `--ds-focus`, tint yang sama |
| Pressed (zoom) | Pointer down | Lightbox terbuka saat klik; tautannya sendiri tidak mengecil |
| Reduced motion | `prefers-reduced-motion: reduce` | Tanpa kilau; pudar menjadi cross-fade 150ms atau kurang; lightbox tidak berskala |
| Kontras lebih / forced colours | Media feature | Placeholder dan fallback tetap punya tepi yang terlihat; ring fokus tautan memakai warna sistem |

## Anatomi

- `img.ds-image`: gambar polos dengan radius, `max-width: 100%`, latar `--color-base-200` saat memuat.
- `.ds-image-frame`: pembungkus yang memegang placeholder dan fallback (`is-cover`, `is-contain`, `is-fill`, `is-none`, `is-scale-down`, `is-radius-*`).
- `.ds-image-frame__fallback`: ikon dan teks alt yang tampil saat galat.
- `figure.ds-figure` dan `figcaption`: gambar dengan keterangannya.
- `a.ds-image-zoom[data-ds-zoom]`: tautan yang membuka lightbox.
- `dialog.ds-lightbox`: dibuat skrip saat pertama dipakai: `.ds-lightbox__figure`, `.ds-lightbox__close`.

## Penggunaan

- Selalu tulis `alt`. Jelaskan apa yang tampak pada gambar dalam satu kalimat di bawah 125 karakter. Untuk gambar yang murni hiasan pakai `alt=""`.
- Atur `width` dan `height` (atau rasio) pada setiap gambar agar halaman tidak bergeser saat file tiba (CLS di bawah 0,1).
- Di bawah lipatan: `loading="lazy" decoding="async"`. Gambar pertama di atas lipatan (kandidat LCP): tanpa `loading`, ditambah `fetchpriority="high"`. Jangan pernah lazy-load gambar itu.
- Sajikan `srcset` dan `sizes` agar layar 390px tidak mengunduh file 2000px; pakai AVIF atau WebP dengan cadangan JPEG.
- Pakai `is-cover` untuk foto dalam kartu, `is-contain` untuk logo dan diagram yang tidak boleh terpotong.
- Jangan taruh teks di dalam gambar. Jika tangkapan layar berisi teks, taruh teks yang sama di keterangan atau `alt`.
- Jangan memperbesar gambar yang tidak punya versi lebih besar; jangan pasang `data-ds-zoom`.
- Jangan memakai keterangan untuk mengulang teks alt.

## Aksesibilitas

- Gambar bermakna punya `alt`. Jika tautan zoom membungkusnya, alt menjadi nama tautan: tulis agar enak dibaca sebagai tautan ("Perbukitan biru di tengah hari. Membuka gambar yang diperbesar.") atau tambahkan `aria-label` pada tautan.
- Pada state galat gambar disembunyikan dan teks fallback terlihat, sehingga informasi yang dibawa `alt` tetap ada di layar.
- Lightbox adalah `<dialog>` modal native dengan `aria-label` dari keterangan atau `alt`. Fokus pindah ke tombol tutup, halaman di belakang inert, Esc menutup, fokus kembali ke tautan.
- Tint hover dan ring fokus memakai state layer dan `--ds-focus`; ring tidak pernah dihapus.
- Jangan mengandalkan warna di dalam gambar saja (grafik sebagai gambar butuh alternatif teks: pakai [chart](./chart.md)).
- Geraknya pudar 160ms dan skala 2% pada lightbox; keduanya berhenti saat reduced motion.

| Tombol | Aksi |
| --- | --- |
| Tab | Pindah ke tautan zoom, lalu (di lightbox) ke tombol tutup |
| Enter | Membuka lightbox dari tautan |
| Esc | Menutup lightbox dan mengembalikan fokus ke tautan |

## Razor

```cshtml
<ds-image src="/img/site-north.jpg" alt="Kantor lokasi, pintu masuk utara" width="1200" height="800"
          ratio="3/2" caption="Pintu masuk utara, 28 Oktober 2026" zoom zoom-src="/img/site-north-2400.jpg" />

<ds-image src="/img/hero.jpg" alt="Ikhtisar proyek" width="1600" height="900" priority
          placeholder="blur" blur="@Model.HeroBlurDataUri" />
```

| Atribut | Efek |
| --- | --- |
| `src`, `alt`, `width`, `height`, `srcset`, `sizes` | Diteruskan ke `<img>`; `alt` wajib |
| `ratio` | Dibungkus `.ds-aspect` (`1/1`, `4/3`, `3/2`, `16/9`, `21/9`, `3/4`, `9/16`) |
| `radius` | `none`, `sm`, `lg`, `xl`, `full` |
| `fit` | `cover`, `contain`, `fill`, `none`, `scale-down` |
| `caption` | Merender `<figure>` dengan `<figcaption>` |
| `zoom`, `zoom-src` | Menambah tautan zoom ke `zoom-src` (bawaan `src`) |
| `priority` | `fetchpriority="high"`, tanpa lazy loading |
| `placeholder="blur"`, `blur` | Pratinjau blur dari data URI kecil |

## JavaScript

| Atribut | Efek |
| --- | --- |
| `.ds-image-frame` | Skrip mengatur `data-state` dan membuat fallback galat |
| `data-placeholder="blur"` + `data-ds-blur` | URL pratinjau blur (`data:image/…`, `https:`, atau path) |
| `data-ds-zoom` | Pada tautan atau tombol: membuka lightbox. Sumber dari `data-ds-zoom-src`, lalu `href`, lalu gambar di dalamnya |
| `data-ds-caption` | Keterangan lightbox; bawaannya `<figcaption>` atau `alt` |

API: `DS.image.zoom(element)`. Event (bubble): `ds:image:load`, `ds:image:error`.

## Token

`--ds-radius-box`, `--ds-radius-sm`, `--ds-radius-card`, `--ds-radius-2xl`, `--ds-radius-full`, `--color-base-200` (placeholder), `--ds-subtle` (keterangan, fallback), `--ds-focus`, `--ds-opacity-state-hover`, `--ds-duration-quick`, `--ds-duration-shimmer`, `--ds-duration-base`, `--ds-ease-emphasized`, `--ds-shadow-panel`, `--ds-size-measure`.

## Native dan daisyUI

Komponennya adalah `<img>` native (serta `<figure>` dan `<dialog>`); DS hanya menambah class. Class `avatar` dan `mask` daisyUI tetap tersedia; tidak dipakai di sini. `loading`, `decoding`, `fetchpriority`, `srcset`, dan `sizes` adalah milik platform.
