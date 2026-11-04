---
title: Stat
group: components
category: data-display
order: 7
summary: Angka kunci dengan label, nilai, satuan, arah perubahan dengan teks tersembunyi, pembanding, slot sparkline, dan state memuat. Juga tersedia sebagai .ds-kpi.
source: TPS app.css .pt-kpi* L3424–3458
---

Stat menaruh satu angka di depan dan artinya dalam satu baris redup: "Faktur terbuka 128, naik 12% dari bulan lalu". Pakai untuk 3 sampai 6 angka di bagian atas halaman. Untuk deret waktu pakai grafik; untuk banyak angka pakai [table](./table.md). `.ds-stat*` adalah nama universal; `.ds-kpi*` dari versi 1 tampil sama.

## Contoh

```html preview title="Nilai, satuan, dan delta"
<div class="ds-stats">
  <div class="ds-stat is-primary">
    <div class="ds-stat__top"><span class="ds-stat__label">Faktur terbuka</span><span class="ds-stat__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file"></use></svg></span></div>
    <div class="ds-stat__value">128</div>
    <div class="ds-stat__foot"><span class="ds-stat__delta is-success"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-up"></use></svg><span aria-hidden="true">12%</span><span class="ds-visually-hidden">Naik 12% dari bulan lalu</span></span><span aria-hidden="true">dari bulan lalu</span></div>
  </div>
  <div class="ds-stat is-primary">
    <div class="ds-stat__top"><span class="ds-stat__label">Rata-rata waktu bayar</span></div>
    <div class="ds-stat__value">14<span class="ds-stat__unit">hari</span></div>
    <div class="ds-stat__foot"><span class="ds-stat__delta is-success"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-down"></use></svg><span aria-hidden="true">3 hari</span><span class="ds-visually-hidden">Turun 3 hari dari bulan lalu, lebih cepat</span></span><span aria-hidden="true">dari bulan lalu</span></div>
  </div>
  <div class="ds-stat is-error">
    <div class="ds-stat__top"><span class="ds-stat__label">Jumlah jatuh tempo</span></div>
    <div class="ds-stat__value">Rp84,5 jt</div>
    <div class="ds-stat__foot"><span class="ds-stat__delta is-error"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-up"></use></svg><span aria-hidden="true">8%</span><span class="ds-visually-hidden">Naik 8% dari bulan lalu, memburuk</span></span><span aria-hidden="true">dari bulan lalu</span></div>
  </div>
  <div class="ds-stat">
    <div class="ds-stat__top"><span class="ds-stat__label">Proyek aktif</span></div>
    <div class="ds-stat__value">36</div>
    <div class="ds-stat__foot"><span class="ds-stat__delta is-neutral"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-minus"></use></svg><span aria-hidden="true">0%</span><span class="ds-visually-hidden">Tidak berubah dari bulan lalu</span></span><span aria-hidden="true">dari bulan lalu</span></div>
  </div>
</div>
```

```html preview title="Slot sparkline dan pembanding"
<div class="ds-stats">
  <div class="ds-stat is-success has-bar">
    <div class="ds-stat__top"><span class="ds-stat__label">Terkumpul bulan ini</span></div>
    <div class="ds-stat__value">Rp312 jt</div>
    <div class="ds-stat__compare"><span>Bulan lalu 278 jt</span><span>Target 350 jt</span></div>
    <svg class="ds-stat__spark" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,26 15,22 30,24 45,16 60,18 75,10 90,12 105,6 120,4"/></svg>
  </div>
  <div class="ds-stat is-info">
    <div class="ds-stat__top"><span class="ds-stat__label">Pelanggan baru</span></div>
    <div class="ds-stat__value">57</div>
    <div class="ds-stat__sub">Sofia Marquez menutup 9 di antaranya</div>
    <svg class="ds-stat__spark" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,20 15,24 30,14 45,18 60,12 75,20 90,8 105,14 120,10"/></svg>
  </div>
</div>
```

```html preview title="Terbagi, berupa link, dan memuat"
<div class="ds-stats is-divided">
  <a class="ds-stat" href="#terbuka"><div class="ds-stat__top"><span class="ds-stat__label">Terbuka</span></div><div class="ds-stat__value">128</div><div class="ds-stat__sub">Lihat semua faktur terbuka</div></a>
  <div class="ds-stat"><div class="ds-stat__top"><span class="ds-stat__label">Lunas</span></div><div class="ds-stat__value">96</div><div class="ds-stat__sub">Sejak 1 Nov 2026</div></div>
  <div class="ds-stat" aria-busy="true"><span class="ds-visually-hidden" role="status">Memuat</span><span class="ds-bone is-short"></span><span class="ds-bone is-value"></span><span class="ds-bone is-short"></span></div>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Card hairline, label `--ds-subtle`, nilai bertipe metrik dengan angka tabular |
| Hover (link) | Pointer di atas `a.ds-stat` | Terangkat `--ds-lift`, border ke arah tone, `--ds-shadow-lift` |
| Focus-visible | Keyboard pada stat link | Cincin `--ds-focus` 2px, offset 2px |
| Pressed | `:active` | Angkatan berakhir |
| Memuat | `aria-busy="true"` | Bone dengan shimmer; lebar dan tinggi tetap, tanpa pergeseran tata letak |
| Delta naik, turun, datar | Ikon `arrow-up`, `arrow-down`, `minus` | Arah adalah ikon; sentimen adalah tone (`is-success`, `is-error`, `is-neutral`) |
| Nilai kosong | Tidak ada data | Tampilkan tanda hubung panjang pada nilai dan "Belum ada data" di baris sub |
| Reduced motion | `prefers-reduced-motion` | Tanpa angkatan, tanpa shimmer |

Naik tidak selalu baik (jumlah jatuh tempo) dan turun tidak selalu buruk (waktu bayar); atur tone untuk makna, ikon untuk arah.

## Anatomi

- `.ds-stat` dengan tone `is-primary|success|warning|error|info`, `has-bar` (bar tone di kiri); grid `.ds-stats` (`is-divided`).
- `__top`, `__label`, `__icon`, `__value`, `__unit`, `__sub`, `__foot`, `__delta` (`is-success|error|neutral`), `__compare`, `__spark`.
- Alias versi 1: `.ds-kpis`, `.ds-kpi`, `.ds-kpi-top|label|icon|value|sub`, `.ds-kpi-value small` (satuan). Bar tone tetap ada.

## Penggunaan

- Tampilkan 3 sampai 6 stat per baris, label 1 sampai 3 kata, nilai paling banyak 8 karakter (pakai `jt` dan `rb`, taruh jumlah penuh di `title`).
- Selalu beri delta sebuah periode ("dari bulan lalu"); "12%" saja tidak bermakna.
- Format dengan `Fmt.Decimal` atau `Fmt.Number`, jangan di view dengan penggabungan string.
- Pakai `ds-stat__spark` untuk tren paling banyak 30 titik; ia dekorasi, delta yang membawa fakta.
- Jangan mewarnai nilai; warnai hanya delta dan bar opsional.

## Aksesibilitas

- Delta memiliki teks pendek yang terlihat (`aria-hidden`) dan kalimat lengkap tersembunyi: "Naik 12% dari bulan lalu". Jangan jadikan warna atau panah satu-satunya pembawa.
- Sparkline `aria-hidden`; sediakan data yang sama dalam tabel atau teks bila penting.
- Memuat memakai `role="status"` "Memuat" tersembunyi dan `aria-busy`.
- Stat link punya satu link; nama aksesibelnya adalah isi teksnya, sehingga label dan nilai terbaca.

| Tombol | Aksi |
| --- | --- |
| Tab | Pindah ke stat link |
| Enter | Mengikuti link |

## Razor

```cshtml
<ds-stat label="Faktur terbuka" value="128" icon="file"
         delta="12%" trend="Up" delta-text="Naik 12% dari bulan lalu" compare="dari bulan lalu" />
<ds-stat label="Rata-rata waktu bayar" value="14" unit="hari"
         delta="3 hari" trend="Down" delta-tone="Success" compare="dari bulan lalu" />
<ds-stat label="Terkumpul" value="Rp312 jt" tone="Success" bar>
    <svg viewBox="0 0 120 32" preserveAspectRatio="none"><polyline points="0,26 60,18 120,4" /></svg>
</ds-stat>
<ds-stat label="Faktur terbuka" value="" loading />
```

## Token

`--ds-tone`, `--ds-tone-text`, `--ds-type-metric-*`, `--ds-type-caption-*`, `--ds-border-tone-bar`, `--ds-radius-card`, `--ds-lift`, `--ds-shadow-lift`, `--color-base-300`, `--ds-subtle`.

## Native dan daisyUI

Memakai `div` atau `a`. Ia menggantikan daisyUI `stats`, `stat-title`, `stat-value`, dan `stat-desc`; semuanya tetap tampil, tanpa delta, memuat, atau tone. `.ds-bone` dipakai bersama skeleton card.
