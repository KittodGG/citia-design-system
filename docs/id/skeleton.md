---
title: Skeleton
group: components
category: feedback
order: 31
summary: Bentuk placeholder (baris teks, judul, avatar, kartu, baris tabel, gambar) yang menahan tata letak saat konten dimuat, dengan kilau tenang yang berhenti saat reduced motion.
---

Pakai skeleton saat bentuk konten yang akan datang diketahui dan memerlukan waktu lebih dari sekitar 300 ms: daftar, kartu, profil, tabel. Ia menjaga tata letak tetap diam sehingga halaman tidak melompat saat data tiba. Pakai [spinner](./spinner.md) saat bentuknya tidak diketahui atau penantiannya singkat, dan bar [progress](./progress.md) saat Anda bisa menyebut sudah sejauh mana. Skeleton adalah placeholder, bukan konten: ia disembunyikan dari teknologi bantu dan state loading diumumkan sekali pada region.

## Contoh

### Text, heading and avatar

`ds-skeleton` dengan class bentuk: `is-text` (baris 12px), `is-heading`, `is-avatar` (lingkaran 36px, `is-lg` 56px), `is-rect`, `is-image`, `is-button`, `is-pill`. Bungkus baris dalam `.ds-skeleton-lines` dan baris terakhir lebih pendek, seperti teks sungguhan.

```html preview title="Kepala profil dan paragraf"
<div class="ds-busy" aria-busy="true" style="max-width:26rem">
  <p class="ds-visually-hidden" role="status">Memuat profil…</p>
  <div class="ds-skeleton-row" aria-hidden="true">
    <span class="ds-skeleton is-avatar is-lg"></span>
    <div class="ds-skeleton-stack"><span class="ds-skeleton is-heading"></span><span class="ds-skeleton is-text is-w-50"></span></div>
  </div>
  <div class="ds-skeleton-stack ds-skeleton-lines" aria-hidden="true" style="margin-top:1rem">
    <span class="ds-skeleton is-text"></span><span class="ds-skeleton is-text"></span><span class="ds-skeleton is-text"></span>
  </div>
</div>
```

### Card

Skeleton kartu menyalin padding, border, dan ritme kartu, sehingga pergantiannya tak terlihat. Gambar mempertahankan rasionya dengan `is-image`.

```html preview title="Kartu"
<div class="ds-skeleton-card" aria-hidden="true" style="max-width:20rem">
  <span class="ds-skeleton is-image"></span>
  <span class="ds-skeleton is-heading"></span>
  <div class="ds-skeleton-stack ds-skeleton-lines"><span class="ds-skeleton is-text"></span><span class="ds-skeleton is-text"></span></div>
  <div class="ds-skeleton-row"><span class="ds-skeleton is-pill"></span><span class="ds-skeleton is-button"></span></div>
</div>
```

### Table rows

`.ds-skeleton-table` menggambar baris kepala dan isi pada grid. Atur `--ds-skeleton-cols` sesuai lebar kolom sebenarnya.

```html preview title="Baris tabel"
<div class="ds-skeleton-table" aria-hidden="true" style="--ds-skeleton-cols: 2fr 1fr 1fr 1fr">
  <div class="ds-skeleton-row"><span class="ds-skeleton is-text is-w-50"></span><span class="ds-skeleton is-text is-w-75"></span><span class="ds-skeleton is-text is-w-75"></span><span class="ds-skeleton is-text is-w-50"></span></div>
  <div class="ds-skeleton-row"><span class="ds-skeleton is-text"></span><span class="ds-skeleton is-text is-w-50"></span><span class="ds-skeleton is-pill"></span><span class="ds-skeleton is-text is-w-75"></span></div>
  <div class="ds-skeleton-row"><span class="ds-skeleton is-text is-w-75"></span><span class="ds-skeleton is-text is-w-75"></span><span class="ds-skeleton is-pill"></span><span class="ds-skeleton is-text is-w-50"></span></div>
  <div class="ds-skeleton-row"><span class="ds-skeleton is-text"></span><span class="ds-skeleton is-text is-w-50"></span><span class="ds-skeleton is-pill"></span><span class="ds-skeleton is-text is-w-75"></span></div>
</div>
```

### Delayed

Tambahkan `is-delayed` agar skeleton baru tampil setelah 300 ms (timpa dengan `--ds-delay`). Respons yang tiba lebih cepat tidak pernah menampilkannya. Skeleton tetap menempati ruangnya saat tersembunyi, jadi tidak ada yang bergeser.

```html preview title="Muncul setelah 300 ms"
<div class="ds-skeleton-stack ds-skeleton-lines" aria-hidden="true" style="max-width:20rem">
  <span class="ds-skeleton is-text is-delayed"></span><span class="ds-skeleton is-text is-delayed"></span><span class="ds-skeleton is-text is-delayed"></span>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Loading | Konten tertunda, wadah `aria-busy="true"` | Bentuk bertint 8% `base-content`, sorotan menyapu kiri ke kanan tiap `--ds-duration-shimmer` (1,6 dtk, linear, tak berujung) |
| Delayed | `is-delayed` | Tak terlihat selama 300 ms, lalu memudar masuk dalam 160ms |
| Loaded | Konten tiba | Hapus skeleton dan atur `aria-busy="false"`; munculkan konten dengan opasitas saja (150ms atau kurang) |
| Error | Permintaan gagal | Ganti skeleton dengan pesan galat atau [alert](./alert.md); jangan biarkan terus berkilau |
| Kosong | Permintaan tidak mengembalikan item | Ganti skeleton dengan [empty state](./empty-state.md) |
| Reduced motion | `prefers-reduced-motion: reduce` | Tanpa kilau: tint statis; jeda 300 ms dan pudar tetap |
| Forced colours | `forced-colors: active` | Bentuk mendapat garis tepi `CanvasText` 1px |
| Dark | `data-theme="dark"` | Tint dan sorotan memakai `base-content` yang terang dengan persentase sama |
| RTL | `dir="rtl"` | Sapuan berjalan kanan ke kiri |
| Interaksi | Tidak berlaku | Bentuk tidak bisa difokus dan tidak bisa diklik |

## Anatomi

- `.ds-skeleton`: bentuk apa pun. Modifier: `is-text`, `is-heading`, `is-avatar` (+ `is-lg`), `is-rect`, `is-image`, `is-button`, `is-pill`, `is-w-25|50|75`, `is-delayed`.
- `.ds-skeleton-stack`: tumpukan vertikal; `.ds-skeleton-lines` memperpendek baris teks terakhir.
- `.ds-skeleton-row`: baris horizontal (avatar plus baris teks, baris tabel).
- `.ds-skeleton-card`: wadah berbentuk kartu dengan padding dan border.
- `.ds-skeleton-table`: baris grid dengan `--ds-skeleton-cols`.
- `.ds-busy`: region yang dapat membawa `aria-busy`; anak `.ds-loading-overlay`-nya menampilkan spinner setelah 300 ms.

## Penggunaan

- Cocokkan tata letak aslinya: jumlah baris sama (3 sampai 5), ukuran avatar sama, padding kartu sama, tinggi baris sama. Skeleton yang tidak cocok menimbulkan lompatan yang terlihat.
- Tampilkan paling banyak 6 baris berulang; 4 biasanya cukup. Jangan memalsukan 50 baris.
- Pakai skeleton hanya untuk pemuatan pertama sebuah region. Untuk penyegaran, pertahankan konten lama dan tampilkan bar [progress](./progress.md) tipis atau redupkan.
- Jangan pakai skeleton untuk sesuatu yang termuat di bawah 300 ms, atau untuk konten yang mungkin tak pernah berbentuk (galat, kosong).
- Jangan menganimasikan lebih dari satu region sekaligus di layar kecil; kilau di mana-mana hanya menjadi noise.
- Jangan menaruh teks di dalam bentuk skeleton.

## Aksesibilitas

- Bentuk skeleton adalah hiasan: beri `aria-hidden="true"` pada bentuk (atau pembungkusnya).
- Umumkan state sekali: `aria-busy="true"` pada region yang dimuat, dan pesan `role="status"` yang tersembunyi secara visual ("Memuat profil…") yang ditambahkan bersama skeleton. Saat konten tiba, atur `aria-busy="false"`; pembaca layar membaca konten baru. Jangan tinggalkan pesan status.
- Jangan memindahkan fokus ke dalam skeleton. Jika elemen yang difokus diganti konten yang termuat, kembalikan fokus ke elemen logis yang sama.
- Kilau adalah salah satu animasi tak berujung yang diizinkan. Ia lambat (1,6 dtk), berkontras rendah (8%), dan berhenti saat reduced motion, yang memenuhi WCAG 2.3.3 dan 2.2.2 untuk efek hiasan yang berulang.
- Kontras: bentuk skeleton bukan teks dan tidak butuh rasio kontras; tetapi harus terlihat di atas permukaan (tint 8%, garis tepi 1px pada forced colours).

## Razor

```cshtml
<div class="ds-busy" aria-busy="true">
    <p class="ds-visually-hidden" role="status">@DsText.T("media.loading")</p>
    <div class="ds-skeleton-row">
        <ds-skeleton shape="Avatar" />
        <div class="ds-skeleton-stack"><ds-skeleton shape="Heading" /><ds-skeleton lines="2" /></div>
    </div>
</div>
```

| Atribut | Efek |
| --- | --- |
| `shape` | `Text` (bawaan), `Heading`, `Avatar`, `Rect`, `Image`, `Button`, `Pill` |
| `lines` | Dengan `Text`: merender paragraf 2 sampai 12 baris, baris terakhir lebih pendek |
| `delayed` | Tampil setelah 300 ms |

Tag helper menulis `aria-hidden="true"` untuk Anda.

## Token

`--ds-duration-shimmer`, `--ds-delay` (bawaan 300ms), `--ds-duration-quick`, `--color-base-content` (tint 8%), `--color-base-300`, `--color-base-100`, `--ds-radius-md`, `--ds-radius-full`, `--ds-radius-box`, `--ds-radius-card`, `--ds-size-avatar`, `--ds-size-target-compact`, `--ds-space-card-x`, `--ds-space-card-y`.

## Native dan daisyUI

Skeleton adalah elemen `span` dan `div` biasa dengan `aria-hidden`. Class `skeleton` daisyUI serupa; pakai `.ds-skeleton` untuk token kilau, perilaku reduced motion, dan modifier bentuk. `aria-busy` adalah atribut ARIA native untuk region yang sedang diperbarui. Keluarga komponen lain (card, stat, avatar) memakai potongan yang lebih kecil bernama `.ds-bone` dengan tampilan dan kilau yang sama; `.ds-skeleton` adalah class yang didokumentasikan untuk tata letak Anda sendiri.
