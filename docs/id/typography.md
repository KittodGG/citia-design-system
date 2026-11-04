---
title: Tipografi
group: foundations
order: 3
summary: Satu huruf, 17 peran tipografi, angka tabular untuk data, lebar baca 50–75 karakter, dan aturan teks yang memanjang dalam bahasa Indonesia atau terbungkus di layar kecil.
---

Citia DS memakai satu keluarga huruf, Manrope, dan membangun hierarki dari ukuran, bobot, tracking, dan leading sebagai satu set. Setiap peran adalah empat token (`--ds-type-<peran>-size`, `-leading`, `-weight`, `-tracking`), sehingga judul tidak pernah mendapat ukuran tanpa jarak yang cocok. Pakai peran, bukan ukuran font mentah.

## Font

- Manrope variable font, sumbu bobot 200–800. DS memakai 400–800.
- Di-host sendiri di `/_content/Citia.DesignSystem/fonts/manrope/` dalam dua subset, `latin` dan `latin-ext`. Lisensi SIL OFL 1.1 (`OFL.txt` ada di folder yang sama).
- Tanpa permintaan ke CDN. Aplikasi tetap jalan di jaringan terbatas dan pihak ketiga tidak bisa memblokir font.
- `font-display: swap`. Subset `latin` di-preload oleh `_DsHead`, jadi teks tampil dengan fallback selama font dimuat.
- `font-optical-sizing: auto` aktif, sehingga bentuk huruf menyesuaikan ukuran tampil.

Fallback: `"Manrope", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`. Token monospace `--ds-font-mono` hanya untuk kode, markup literal, dan kunci rahasia.

```ds-tokens
font
```

## Peran tipografi

Tujuh belas peran, dari `display` sampai `micro`. Contoh di bawah dirender dengan variabel aslinya.

```ds-type-scale
```

| Peran | Ukuran / leading / bobot / tracking | Dipakai untuk |
| --- | --- | --- |
| `display` | clamp(2rem, 3vw, 3rem) / 1.1 / 750 / -0.04em | Hero landing dan halaman masuk |
| `title-1` | clamp(1.75rem, 2.5vw, 2.25rem) / 1.15 / 650 / -0.035em | Judul halaman |
| `title-2` | clamp(1.375rem, 2vw, 1.75rem) / 1.2 / 750 / -0.03em | Judul bagian halaman, header padat |
| `title-3` | clamp(1.25rem, 1.6vw, 1.625rem) / 1.25 / 750 / -0.03em | Judul top bar |
| `title-auth` | 1.75rem / 1.2 / 650 / -0.02em | Form masuk dan akun |
| `headline` | 1.25rem / 1.3 / 650 / -0.01em | Judul dialog dan empty state |
| `section` | 1.0625rem / 1.4 / 650 / 0 | Legend fieldset, judul bagian |
| `card-title` | 0.9375rem / 1.4 / 700 / 0 | Header kartu |
| `body` | 1rem / 1.5 / 400 / 0 | Teks isi dan semua input |
| `label` | 0.9375rem / 1.5 / 600 / 0 | Label field |
| `callout` | 0.875rem / 1.5 / 400 / 0 | Sel tabel, item navigasi, tombol |
| `footnote` | 0.8125rem / 1.5 / 400 / 0 | Teks bantuan |
| `caption` | 0.75rem / 1.4 / 400 / 0 | Metadata, baris sekunder |
| `eyebrow` | 0.6875rem / 1rem / 700 / 0.08em, kapital | Label grup di atas judul |
| `table-head` | 0.6875rem / 1rem / 700 / 0.06em, kapital | Header kolom tabel |
| `micro` | 0.625rem / 1 / 800 / 0 | Hanya lencana hitungan |
| `metric` | 1.75rem / 1.1 / 750 / -0.03em, tabular | Angka besar di kartu statistik |

Di CSS, pasang peran lewat empat variabelnya:

```css
.page-title {
  font-size: var(--ds-type-title-1-size);
  line-height: var(--ds-type-title-1-leading);
  font-weight: var(--ds-type-title-1-weight);
  letter-spacing: var(--ds-type-title-1-tracking);
  text-wrap: balance;
}
```

Dengan tema Tailwind, kelas `text-title-1` memasang keempatnya sekaligus.

## Bobot, tracking, dan leading

Bobot berjalan dari `--ds-weight-regular` (400) sampai `--ds-weight-extrabold` (800). Teks isi 400, label 600, judul 650–750. Bangun hierarki dari bobot, ukuran, dan leading bersama; menebalkan teks tanpa mengubah yang lain membuat halaman datar.

- **Tracking.** Negatif hanya untuk teks besar: `display` -0.04em, turun ke `headline` -0.01em. Dari `section` ke bawah 0. Teks isi selalu 0. Peran kapital (`eyebrow`, `table-head`) memakai tracking positif (0.06–0.08em), karena huruf kapital tanpa tracking terbaca rapat.
- **Leading.** Judul besar rapat (1.1 untuk `display`, 1.15 untuk `title-1`, 1.2 untuk `title-2`). Teks isi 1.5, caption 1.4. Peran satu baris (`eyebrow`, `micro`) memakai leading tetap agar tinggi baris sama.
- **Input.** Semua input 16px. Di bawah 16px, Safari iOS memperbesar halaman saat field difokuskan.

## Angka

`font-variant-numeric: tabular-nums` aktif pada `<table>`, `.ds-num`, dan `.tabular`. Pakai angka tabular di mana digit harus sejajar atau berubah seiring waktu: tabel, statistik, hitungan, paging, timer, dan identifier. Pakai angka proporsional di teks mengalir.

```html preview title="Angka tabular di tabel"
<table class="table">
  <thead><tr><th>Faktur</th><th>Klien</th><th style="text-align:end">Jumlah</th></tr></thead>
  <tbody>
    <tr><td><span class="ds-id">INV-2026-0418</span></td><td>Ayu Lestari</td><td style="text-align:end">1.248,50</td></tr>
    <tr><td><span class="ds-id">INV-2026-0419</span></td><td>Daniel Okafor</td><td style="text-align:end">98,00</td></tr>
    <tr><td><span class="ds-id">INV-2026-0420</span></td><td>Mei Tanaka</td><td style="text-align:end">15.011,75</td></tr>
  </tbody>
</table>
```

Identitas bisnis (`PRJ-1024`, `INV-2026-0418`) memakai Manrope dengan angka tabular lewat `.ds-id`, yang juga mereset `letter-spacing` ke 0. Monospace hanya untuk kode literal (`pre.code`). Ratakan kolom angka ke kanan dan taruh satuan di sel terpisah atau di header.

## Lebar baca

Jaga teks mengalir antara 50 dan 75 karakter per baris. `--ds-size-measure` bernilai `65ch`, dipasang oleh `.ds-measure`. Jangan biarkan paragraf melebar sepanjang layar.

```html preview title="Lebar baca dan judul seimbang"
<div class="ds-measure">
  <h3 style="font-size:var(--ds-type-title-2-size);line-height:var(--ds-type-title-2-leading);font-weight:var(--ds-type-title-2-weight);letter-spacing:var(--ds-type-title-2-tracking);text-wrap:balance;margin:0 0 .5rem">Faktur direkonsiliasi setiap malam pukul 02.00</h3>
  <p style="text-wrap:pretty;margin:0">Proses malam membandingkan setiap faktur dengan catatan pembayarannya dan menandai selisih di atas 0,5%. Item yang ditandai muncul di antrean tinjauan keesokan paginya, dikelompokkan per proyek, sehingga tim keuangan bisa menyelesaikannya sekaligus.</p>
</div>
```

Tambahkan `text-wrap: balance` pada judul (maksimal dua sampai tiga baris) agar baris terakhir tidak berisi satu kata, dan `text-wrap: pretty` pada paragraf panjang.

## Inggris dan Indonesia

String bahasa Indonesia biasanya 20–40% lebih panjang daripada bahasa Inggris ("Save changes" menjadi "Simpan perubahan", "Rows per page" menjadi "Baris per halaman"). Rancang untuk pertumbuhan 40%:

- Tanpa lebar tetap pada wadah teks; pakai `min-width`, `max-width`, `flex`, dan `grid` dengan `minmax()`.
- Tombol melebar dan tetap satu baris bila muat. Label lebih dari sekitar 28 karakter sebaiknya pindah ke tooltip atau baris bantuan.
- Uji setiap layar dalam kedua bahasa sebelum rilis. Jangan menilai tata letak dari bahasa Inggris saja.
- Jangan menyingkat agar muat. Persingkat kalimatnya.

## Pemotongan dan pembungkusan

- **Bungkus secara default.** Judul, deskripsi, label, dan sel tabel berisi kalimat dibungkus ke sebanyak baris yang dibutuhkan.
- **Potong hanya teks identitas** (nama file, email, item breadcrumb, tag), dan hanya bila lebar terbatas. Pakai `text-overflow: ellipsis` pada satu baris dan taruh teks penuh di `title` atau nama aksesibel.
- **Batasi deskripsi** dengan `.ds-clamp-2` (dua baris) di kartu dan daftar. Jangan membatasi satu-satunya salinan teks yang harus dibaca pengguna, seperti galat.
- **String panjang tanpa spasi** (URL, ID) memakai `overflow-wrap: anywhere` agar tidak melebarkan tata letak melebihi 320px.
- **Tanpa `text-align: justify`.** Ratakan teks ke awal di kedua bahasa.

## Panduan

- Pilih peran sesuai maknanya, bukan ukuran yang diinginkan. Bila tidak ada peran yang cocok, minta token baru, bukan ukuran sekali pakai.
- Satu `title-1` per halaman. Jangan melompati level judul: `h1`, `h2`, `h3` berurutan, apa pun tampilannya.
- Pakai `--ds-subtle` untuk teks sekunder dan `--ds-muted` untuk teks tersier. Jangan menurunkan opasitas untuk meredupkan teks; kontras harus tetap terukur (4.5:1).
- Teks isi minimal 16px, dengan 12px (`caption`) sebagai batas bawah.

## Token

`--ds-font-sans`, `--ds-font-mono`, `--ds-weight-*`, `--ds-type-<peran>-size`, `-leading`, `-weight`, `-tracking`, `--ds-size-measure`.
