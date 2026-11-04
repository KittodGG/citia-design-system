---
title: Warna
group: Fondasi
order: 2
summary: Peran warna semantik daisyUI, ekstensi Citia, palet primitif, resep color-mix, aturan tema gelap, dan hasil uji kontras WCAG untuk 72 pasangan.
source: TPS Styles/app.css (tema tps dan tps-dark); DESIGN.md bagian Tabel dan tautan, Tombol
---

Warna di DS bekerja dalam tiga lapis: primitif (nilai hex mentah), semantik (peran seperti `primary` dan `base-100`), dan ekstensi Citia (peran di luar daisyUI seperti `--ds-link`). Komponen hanya memakai dua lapis terakhir. Setiap token punya nilai di tema terang `tps` dan tema gelap `tps-dark`.

Sumber tunggal ada di `tokens/tokens.json`. Jangan mengubah `generated/tokens.css` dengan tangan; jalankan `dotnet run tools/tokens.cs`.

## Peran semantik {#semantik}

Peran bawaan daisyUI 5. Tiap kotak menampilkan nilai terang di kiri dan gelap di kanan. Dipakai lewat `var(--color-primary)` atau utilitas Tailwind `bg-primary`, `text-base-content`.

```ds-swatches core
```

- `base-100` untuk permukaan (kartu, tabel, input), `base-200` untuk latar halaman dan header tabel, `base-300` untuk border dan pemisah.
- `primary` adalah warna aksi utama dan navigasi aktif. `-content` adalah warna teks di atasnya.
- `secondary` dipakai sidebar aplikasi. `accent` dipakai untuk penanda rail aktif dan grafik besar, bukan cincin fokus.
- `info`, `success`, `warning`, `error` untuk status terisi (badge, alert). Teks di atas tint memakai varian `-text` di bawah.

## Ekstensi Citia {#ekstensi}

Peran yang tidak ada di daisyUI. Keluarannya `--ds-<nama>`; Tailwind membaca versi `--color-<nama>` (`text-link`, `bg-popover`, `border-control`).

```ds-swatches ext
```

| Token | Utilitas | Pakai untuk |
| --- | --- | --- |
| `--ds-link` | `text-link` | Hanya tautan identitas (No BL, REF) lewat `.ds-link-ref`. Selalu bergaris bawah. |
| `--ds-quiet` | `text-quiet` | Teks teal tenang: tombol ghost, eyebrow, ikon empty state. |
| `--ds-error-text`, `--ds-warning-text` | `text-error-text`, `text-warning-text` | Teks di atas tint merah atau oranye. Warna dasar terlalu terang untuk teks kecil di tema terang. |
| `--ds-subtle` | `text-subtle` | Teks sekunder: bantuan field, keterangan, label meta (8.7:1). |
| `--ds-muted` | `text-muted` | Teks tersier yang tetap lolos AA (6.04:1). Jangan untuk informasi penting. |
| `--ds-control-border` | `border-control` | Border input, select, tombol sekunder. Minimal 3:1 terhadap permukaan (3.37:1). |
| `--ds-popover`, `--ds-popover-border`, `--ds-popover-hover` | `bg-popover`, `border-popover-border`, `bg-popover-hover` | Trio lapisan melayang: dropdown, kalender, combobox. Solid, bukan transparan. |
| `--ds-focus` | `ring-focus`, `outline-focus` | Cincin fokus 2 px, satu-satunya warna fokus. |
| `--ds-scrim` | `bg-scrim` | Latar belakang modal (`::backdrop`). |
| `--ds-excel`, `--ds-excel-hover` | `bg-excel` | Import, download, export `.xlsx`. |
| `--ds-pdf`, `--ds-pdf-hover` | `bg-pdf` | Export `.pdf`. |
| `--ds-syntax-tag`, `--ds-syntax-attr` | `text-syntax-tag`, `text-syntax-attr` | Pewarnaan tag dan atribut di penampil XML. |

> [!IMPORTANT]
> Biru hanya untuk tautan. Teal untuk merek, aksi utama, dan navigasi aktif. Jangan memakai `--ds-link` untuk tombol atau status.

## Palet primitif {#palet}

Nilai mentah yang menjadi bahan token semantik. Arahkan kursor ke kotak untuk melihat catatannya.

```ds-palette
```

> [!WARNING]
> Komponen tidak pernah memakai primitif. Tulis `var(--color-primary)`, bukan `#00838f` atau `teal.600`. Kalau tema berubah, hanya token semantik yang dipetakan ulang; komponen yang memakai primitif akan tertinggal.

Contoh pemetaan: `primary` terang = `teal.600` (#00838f), `primary` gelap = `teal.500` (#00a4b2). Primitif `teal.500` sendiri bukan warna tombol di tema terang karena teks putih di atasnya hanya 3.0:1.

## Resep color-mix {#resep}

Tint dan border turunan dibuat dengan `color-mix(in oklab, …)` dari token semantik, sehingga otomatis menyesuaikan tema. Jangan membuat hex baru untuk tint.

| Kegunaan | Rentang | Contoh di CSS |
| --- | --- | --- |
| Latar tint (soft) | 4–16% | `color-mix(in oklab, var(--color-primary) 10%, transparent)` |
| Latar tint di atas permukaan | 6–12% | `color-mix(in oklab, var(--color-error) 10%, var(--color-base-200))` |
| Hover tombol sekunder | 6% | `color-mix(in oklab, var(--color-base-content) 6%, var(--color-base-100))` |
| Hover tombol ghost | 14% | `color-mix(in oklab, currentColor 14%, transparent)` |
| Border tone (notice, banner) | 22–45% | `color-mix(in oklab, var(--ds-tone, var(--color-info)) 35%, var(--color-base-300))` |
| Border field bermasalah | 45% | `color-mix(in oklab, var(--color-error) 45%, var(--color-base-300))` |
| Seleksi teks | 24% | `color-mix(in oklab, var(--color-primary) 24%, transparent)` |

Contoh notice nada info:

```css
.app-notice {
  border: 1px solid color-mix(in oklab, var(--ds-tone, var(--color-info)) 35%, var(--color-base-300));
  background: color-mix(in oklab, var(--ds-tone, var(--color-info)) 7%, var(--color-base-100));
}
```

**Aturan.**

- Tint maksimal 16% agar teks di atasnya tetap lolos 4.5:1. Cek pasangannya di [uji kontras](#kontras).
- Teks di atas tint memakai warna `-text` atau `base-content`, bukan warna dasar status di tema terang.
- Border tone mulai dari 22% untuk elemen tenang dan naik ke 45% untuk keadaan yang butuh perhatian (galat, aktif).

## Tema gelap {#gelap}

Tema gelap bukan inversi tema terang. Aturan pemetaannya:

- `primary` menjadi `#00a4b2` dengan teks gelap `#0e141b` (6.13:1). Di tema terang `primary` adalah `#00838f` dengan teks putih.
- `accent` menjadi aqua `#00d4df`. `--ds-focus` memakai warna yang sama.
- Tautan `--ds-link` beralih ke `info` (`#7aa2f7`, 6.81:1 pada `base-100`), karena biru tema terang terlalu gelap.
- `--ds-error-text` dan `--ds-warning-text` memakai warna dasar `error` dan `warning`, yang di tema gelap sudah terang dan lolos 4.5:1.
- `--ds-quiet` sama dengan `primary`.
- Popover diberi sedikit putih (`color-mix(in oklab, var(--color-base-100) 94%, #ffffff)`) supaya terpisah dari latar tanpa mengandalkan bayangan.
- Bayangan lebih pekat (`rgb(0 0 0 / .36)`) karena latar sudah gelap.

Pilihan tema tersimpan di `localStorage` kunci `ds-theme` dan dipasang sebelum stylesheet dimuat. Tanpa pilihan, `prefers-color-scheme` yang menentukan.

## Uji kontras {#kontras}

`dotnet run tools/tokens.cs` menghitung rasio kontras WCAG untuk 72 pasangan warna di kedua tema dan menulis hasilnya ke `wwwroot/tokens/contrast.json`. Build gagal bila pasangan yang wajib berada di bawah 4.5:1 (teks) atau 3:1 (non-teks: border kontrol, cincin fokus, tepi aktif). Pasangan berlabel Info tidak ikut menentukan lolos atau gagal.

```ds-contrast
```

Tambahkan pasangan baru di `tools/tokens.cs` setiap kali sebuah komponen menaruh teks di atas warna baru.

### Cincin fokus: penyimpangan dari TPS {#fokus}

TPS memakai `accent` `#00a4b2` untuk cincin fokus. Di atas `#f9f9f6` rasionya hanya 2.86:1, di bawah ambang 3:1 untuk non-teks (WCAG 1.4.11). DS mengganti ke `--ds-focus`:

| Tema | TPS | DS `--ds-focus` | Rasio di `base-100` |
| --- | --- | --- | --- |
| Terang | `#00a4b2` (2.86:1, gagal) | `#00838f` = `primary` | 4.29:1 |
| Gelap | `#00d4df` | `#00d4df` = aqua | 9.38:1 |

Ini penyimpangan yang disengaja. Pasangan TPS lama tetap tercatat di `contrast.json` sebagai Info.

### Warna data dan identitas {#data}

- Status memakai token status terisi (`success`, `warning`, `error`, `info`), selalu dengan kata. Warna tidak berdiri sendiri.
- Avatar identitas memakai delapan warna `c0` sampai `c7` dengan teks putih. Semuanya lolos 4.52:1 atau lebih tinggi: `c0` 4.52, `c6` 4.99, `c3` 5.18, `c7` 5.36, `c4` 5.48, `c2` 5.70, `c5` 6.04, `c1` 6.12.
- Cairan tangki di ilustrasi memakai `teal.500` dengan `liquid-top` yang lebih terang; angka tetap ditulis di samping grafik.

## Pemakaian {#pemakaian}

### CSS

```css
.app-ref {
  color: var(--ds-link);
  text-decoration: underline;
}

.app-hint {
  color: var(--ds-subtle);
}

.app-field {
  border: 1px solid var(--ds-control-border);
  background: var(--color-base-100);
}
```

### Tailwind

```cshtml
<a asp-page="/Submissions/Bl" asp-route-id="@Model.Id" class="text-link underline underline-offset-2">BL-2026-00841</a>
<p class="text-subtle text-footnote">Format: 0001 - 0000 - 0000</p>
<p class="text-muted text-caption">Diperbarui 25 Jan 2026, 14.30 WIB</p>
<input class="input border-control" />
<div class="bg-popover border border-popover-border shadow-popover rounded-lg">…</div>
```

Utilitas `text-link`, `text-subtle`, `text-muted`, `bg-popover`, `border-control` datang dari `generated/tailwind-theme.css`, dan nilainya di-resolve per elemen sehingga `data-theme` bersarang tetap benar.

> [!TIP]
> Untuk tautan identitas, pakai kelas `.ds-link-ref` agar garis bawah, cincin fokus biru, dan ketebalan hover ikut. `text-link` saja hanya mengubah warna.
