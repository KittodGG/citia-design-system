---
title: Tipografi
group: Fondasi
order: 3
summary: Manrope variable yang di-host sendiri, 17 peran tipografi (ukuran, leading, bobot, tracking), aturan angka tabular, identitas, dan lebar baca.
source: TPS DESIGN.md bagian Tipografi; Styles/app.css (@font-face, .master-heading, .pt-kpi-value)
---

DS memakai satu keluarga huruf, Manrope, dan membedakan hierarki lewat ukuran, bobot, dan leading sekaligus. Peran tipografi adalah token: setiap peran punya ukuran, leading, bobot, dan tracking sendiri, dan tersedia sebagai variabel CSS maupun utilitas Tailwind.

## Manrope {#manrope}

- Manrope variable, sumbu bobot 200–800. DS memakai 400–800.
- Di-host sendiri di `/_content/Citia.DesignSystem/fonts/manrope/`, dua subset: `latin` dan `latin-ext`. Lisensi SIL OFL 1.1 (`OFL.txt` ada di folder yang sama).
- Tanpa CDN. Font tidak diminta dari server pihak ketiga, jadi aplikasi tetap jalan di jaringan terminal yang terbatas.
- `font-display: swap`, subset `latin` di-preload di `_DsHead`, sehingga teks tampil dengan fallback selama font dimuat.
- Aplikasi yang menyalin font ke `wwwroot/fonts/manrope` memakai `fonts.root.css`.

```html
<link rel="preload" href="~/_content/Citia.DesignSystem/fonts/manrope/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />
```

Fallback: `"Manrope", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`. Monospace (`--ds-font-mono`) hanya untuk XML, kode literal, dan kunci rahasia.

```ds-tokens
font
```

## Peran tipografi {#peran}

Tujuh belas peran, dari `display` sampai `micro`. Contoh di bawah dirender dengan variabel aslinya.

```ds-type-scale
```

### Peran, variabel, utilitas {#tabel-peran}

Setiap peran punya empat variabel: `--ds-type-<peran>-size`, `-leading`, `-weight`, `-tracking`. Utilitas Tailwind `text-<peran>` memasang keempatnya sekaligus.

| Peran | Utilitas | Ukuran / leading / bobot / tracking | Asal TPS |
| --- | --- | --- | --- |
| `display` | `text-display` | clamp(2rem, 3vw, 3rem) / 1.1 / 750 / -0.04em | `.auth-hero-title` |
| `title-1` | `text-title-1` | clamp(1.75rem, 2.5vw, 2.25rem) / 1.15 / 650 / -0.035em | `.master-heading h1` |
| `title-2` | `text-title-2` | clamp(1.375rem, 2vw, 1.75rem) / 1.2 / 750 / -0.03em | `.pt-header h1` |
| `title-3` | `text-title-3` | clamp(1.25rem, 1.6vw, 1.625rem) / 1.25 / 750 / -0.03em | `.topbar-title` |
| `title-auth` | `text-title-auth` | 1.75rem / 1.2 / 650 / -0.02em | `.auth-title` |
| `headline` | `text-headline` | 1.25rem / 1.3 / 650 / -0.01em | `.qa-title`, `.master-empty h2` |
| `section` | `text-section` | 1.0625rem / 1.4 / 650 / 0 | `.master-fieldset legend` |
| `card-title` | `text-card-title` | 0.9375rem / 1.4 / 700 / 0 | `.pt-card-head h2` |
| `body` | `text-body` | 1rem / 1.5 / 400 / 0 | Teks isi dan semua input |
| `label` | `text-label` | 0.9375rem / 1.5 / 600 / 0 | `.master-field > label` |
| `callout` | `text-callout` | 0.875rem / 1.5 / 400 / 0 | Isi tabel, item navigasi, tombol |
| `footnote` | `text-footnote` | 0.8125rem / 1.5 / 400 / 0 | `.master-help`, header tabel data |
| `caption` | `text-caption` | 0.75rem / 1.4 / 400 / 0 | `.pt-kpi-sub` |
| `eyebrow` | `text-eyebrow` | 0.6875rem / 1rem / 700 / 0.08em, kapital | `.sb-group-toggle`, `.pt-eyebrow` |
| `table-head` | `text-table-head` | 0.6875rem / 1rem / 700 / 0.06em, kapital | `.pt-table th` |
| `micro` | `text-micro` | 0.625rem / 1 / 800 / 0 | `.notif-badge` |
| `metric` | `text-metric` | 1.75rem / 1.1 / 750 / -0.03em, tabular | `.pt-kpi-value` |

Tailwind `text-title-1` memasang `font-size`, `line-height`, `letter-spacing`, dan `font-weight` dalam satu kelas. Untuk CSS biasa, pakai variabelnya:

```css
.app-page-title {
  font-size: var(--ds-type-title-1-size);
  line-height: var(--ds-type-title-1-leading);
  font-weight: var(--ds-type-title-1-weight);
  letter-spacing: var(--ds-type-title-1-tracking);
  text-wrap: balance;
}
```

## Aturan {#aturan}

### Tracking

- Tracking negatif hanya untuk teks besar: `display` -0.04em turun ke `headline` -0.01em. Dari `section` ke bawah tracking 0.
- Teks isi selalu 0. Jangan memberi tracking positif pada teks isi.
- Pengecualian: `eyebrow` (0.08em) dan `table-head` (0.06em), karena keduanya kapital kecil. Kapital tanpa tracking terbaca rapat.

### Leading

- Judul besar lebih rapat: `display` 1.1, `title-1` 1.15, `title-2` 1.2.
- Teks isi 1.5. Caption 1.4. Eyebrow dan micro memakai leading tetap supaya tinggi barisnya sama.

### Hierarki

Bangun hierarki dari bobot, ukuran, dan leading bersama-sama. Jangan hanya menebalkan teks, dan jangan hanya membesarkannya.

- Judul halaman: ukuran besar, bobot 650, tracking ketat.
- Label field: ukuran 15 px, bobot 600, di atas input.
- Bantuan field: 13 px, bobot 400, warna `--ds-subtle`.

### Input di ponsel

Semua input 16 px. Di bawah 16 px, Safari iOS memperbesar halaman saat field difokuskan.

### Judul dan paragraf

- `text-wrap: balance` pada judul agar baris tidak menyisakan satu kata.
- Lebar baca paragraf `65ch` (`--ds-size-measure`, kelas `.ds-measure`). Jangan membiarkan paragraf melebar sepanjang layar.

## Angka dan identitas {#angka}

### Angka tabular

`font-variant-numeric: tabular-nums` aktif otomatis di `<table>`, `.ds-num`, dan `.tabular`. Pakai untuk tabel, KPI, hitungan, paging, dan identifier, agar digit sejajar:

```html preview title="Angka sejajar"
<table class="table">
  <thead><tr><th>Tangki</th><th style="text-align:right">Isi</th></tr></thead>
  <tbody>
    <tr><td>T-01</td><td style="text-align:right">1574782 TNE</td></tr>
    <tr><td>T-02</td><td style="text-align:right">992.5 TNE</td></tr>
    <tr><td>T-03</td><td style="text-align:right">11111 TNE</td></tr>
  </tbody>
</table>
```

Kuantitas ditulis dengan titik desimal, tanpa pemisah ribuan, satuan terpisah: `1574782 TNE`, `992.5 TNE`. Di Razor pakai `Fmt.Qty`.

### Identitas

Identitas bisnis (No BL, NPWP, kode tangki, REF) memakai Manrope dengan angka tabular, lewat kelas `.ds-id` atau `.code`. Monospace hanya untuk XML, kode literal, dan kunci rahasia (`pre.code`).

```html preview title="Identitas dan kode"
<p>No BL <span class="ds-id">BL-2026-00841</span> untuk tangki <span class="ds-id">T-01</span>, kapal MT Sinar Jaya.</p>
<pre class="code">&lt;NO_BL&gt;BL-2026-00841&lt;/NO_BL&gt;</pre>
```

> [!NOTE]
> `.ds-id` mereset `letter-spacing` ke 0. Identitas tidak ikut tracking peran sekitarnya.

## Razor {#razor}

```cshtml
<h1 class="text-title-1 text-balance">Dokumen Pemasukan</h1>
<p class="text-footnote text-subtle ds-measure">Cari berdasarkan No BL atau nama kapal.</p>

<p class="text-metric ds-num">@Fmt.Qty(1574782m) <span class="text-caption text-muted">TNE</span></p>
<p class="text-callout">No BL <span class="ds-id">@Model.BlNumber</span></p>
```

**Token.** `--ds-font-sans`, `--ds-font-mono`, `--ds-weight-*`, `--ds-type-<peran>-size/-leading/-weight/-tracking`, `--ds-size-measure`.

**Asal TPS.** `DESIGN.md` bagian Tipografi; `@font-face` dan skala di `Styles/app.css`.
