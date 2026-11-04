---
title: Warna
group: foundations
order: 2
summary: Peran warna semantik, warna status dengan kata dan ikon, state layer, aturan mode gelap, palet primitif, dan hasil kontras langsung untuk 72 pasangan.
---

Warna bekerja dalam tiga lapis: **primitif** (nilai hex mentah), **peran semantik** (`primary`, `base-100`, `error`), dan **ekstensi Citia** (`--ds-link`, `--ds-focus`). Komponen hanya memakai dua lapis terakhir. Setiap peran punya nilai di tema terang dan gelap, dan swatch di bawah dirender langsung dari `tokens.json`, jadi selalu mutakhir.

Sumbernya `tokens/tokens.json`. Jangan mengedit `Styles/generated/tokens.css` dengan tangan; jalankan `dotnet run tools/tokens.cs`.

## Peran semantik {#peran}

Peran bawaan daisyUI 5. Tiap swatch menampilkan terang di kiri dan gelap di kanan. Pakai sebagai `var(--color-primary)` atau utilitas Tailwind (`bg-primary`, `text-base-content`).

```ds-swatches core
```

| Peran | Dipakai untuk |
| --- | --- |
| `base-100` | Permukaan: kartu, tabel, input, menu. |
| `base-200` | Latar halaman, header tabel, isian tenang. |
| `base-300` | Border tipis dan pemisah (1px). |
| `base-content` | Teks isi dan ikon di atas permukaan dasar. |
| `primary`, `primary-content` | Satu aksi utama, seleksi, fokus; teks di atasnya. |
| `secondary`, `accent` | Permukaan sidebar dan penanda aktif. Bukan focus ring. |
| `info`, `success`, `warning`, `error` | Isian dan border status (lihat di bawah). |

Permukaan netral dan hangat. Teal muncul pada aksi utama, item navigasi saat ini, seleksi, dan focus ring, dan secara bawaan tidak di tempat lain.

## Ekstensi Citia {#ekstensi}

Peran yang tidak ada di daisyUI. Nama CSS-nya `--ds-<nama>`; Tailwind membaca `--color-<nama>` (`text-link`, `bg-popover`, `border-control`).

```ds-swatches ext
```

| Token | Dipakai untuk |
| --- | --- |
| `--ds-subtle` | Teks sekunder: bantuan, keterangan, metadata (8.7:1 di terang). |
| `--ds-muted` | Teks tersier yang tetap lolos AA (6.04:1). Jangan untuk informasi penting. |
| `--ds-control-border` | Border input, select, tombol sekunder. Minimal 3:1 terhadap permukaan (3.37:1 terang, 4.44:1 gelap). |
| `--ds-link` | Tautan di teks dan tabel. Selalu bergaris bawah atau ditandai lain. |
| `--ds-error-text`, `--ds-warning-text` | Teks di atas tint galat atau peringatan; warna dasarnya terlalu terang untuk teks kecil di tema terang. |
| `--ds-focus` | Focus ring 2px. Satu-satunya warna fokus. |
| `--ds-popover`, `--ds-popover-border`, `--ds-popover-hover` | Lapisan melayang: solid, bukan transparan. |
| `--ds-scrim` | Latar belakang modal. |

> [!IMPORTANT]
> Biru untuk tautan. Teal untuk aksi utama, seleksi, dan fokus. Jangan pakai warna tautan pada tombol atau status.

## Warna status {#status}

Status memakai empat rona dengan arti tetap. Isian tonal (pucat) mengisi area; warna jenuh hanya muncul sebagai border 1px, ikon, atau titik. Status selalu disertai kata, dan bentuk ikon berbeda per nada, sehingga tetap terbaca bagi buta warna dan dalam skala abu-abu.

| Nada | Arti | Ikon | Contoh kata |
| --- | --- | --- | --- |
| `info` | Kabar netral, sedang berjalan | `info` | Terjadwal |
| `success` | Selesai, sehat | `check-circle` | Lunas |
| `warning` | Perlu perhatian, belum gagal | `alert-triangle` | Menunggu pembayaran |
| `error` | Gagal atau destruktif | `x-circle` | Terlambat |

```html preview title="Status dengan kata dan ikon"
<div class="flex flex-wrap gap-3">
  <span class="ds-pill is-info">Terjadwal</span>
  <span class="ds-pill is-success">Lunas</span>
  <span class="ds-pill is-warning">Menunggu pembayaran</span>
  <span class="ds-pill is-error">Terlambat</span>
  <span class="ds-pill is-neutral">Draf</span>
</div>
```

Aturan:

- Tulis status sebagai kata. Warna dan titik hanya mendukung.
- Teks di atas tint memakai `base-content` atau peran `-text`, bukan warna dasar status di tema terang.
- Jangan menandai galat hanya dengan merah: tambahkan pesan di dekat field, dihubungkan dengan `aria-describedby`.
- Jangan mengubah arti demi merek. Merek boleh menyesuaikan nada, bukan arti.

## State layer {#state-layer}

Hover, tekan, seleksi, dan drag diungkapkan sebagai lapisan translusen warna konten di atas permukaan, bukan warna baru. Token:

| Token | Nilai | Dipakai untuk |
| --- | --- | --- |
| `--ds-opacity-state-hover` | 0.06 | Hover pada baris, tombol ghost, item menu |
| `--ds-opacity-state-pressed` | 0.10 | Saat pointer ditekan |
| `--ds-opacity-state-selected` | 0.12 | Baris terpilih, item saat ini, opsi terpilih (dengan warna primer) |
| `--ds-opacity-state-drag` | 0.16 | Target drop dan item yang diseret |

```css
.app-row:hover {
  background: color-mix(in oklab, var(--color-base-content) calc(var(--ds-opacity-state-hover) * 100%), var(--color-base-100));
}
.app-row[aria-selected="true"] {
  background: color-mix(in oklab, var(--color-primary) calc(var(--ds-opacity-state-selected) * 100%), var(--color-base-100));
}
```

Karena lapisan dicampur dari token, ia menyesuaikan tema apa pun tanpa hex baru. Tint dijaga 16% atau kurang agar teks di atasnya tetap 4.5:1.

## Resep tint dan border {#resep}

| Tujuan | Rentang | Contoh |
| --- | --- | --- |
| Isian lembut di permukaan | 6 sampai 12% | `color-mix(in oklab, var(--color-error) 10%, var(--color-base-100))` |
| Isian lembut tanpa dasar | 4 sampai 16% | `color-mix(in oklab, var(--color-primary) 10%, transparent)` |
| Border nada | 22 sampai 45% | `color-mix(in oklab, var(--color-info) 35%, var(--color-base-300))` |
| Seleksi teks | 24% | `color-mix(in oklab, var(--color-primary) 24%, transparent)` |

## Mode gelap {#gelap}

Tema gelap dirancang, bukan dibalik.

- Permukaan berwarna hitam kebiruan (`base-100` `#151c25`, halaman `#0e141b`), bukan hitam murni, supaya bayangan dan garis tipis tetap terbaca.
- `primary` menjadi `#00a4b2` dengan teks gelap `#0e141b`; terang memakai `#00838f` dengan putih.
- `--ds-focus` menjadi aqua `#00d4df` (9.38:1) karena warna fokus tema terang terlalu gelap di halaman gelap.
- `--ds-link` pindah ke biru `info` `#7aa2f7` (6.81:1).
- Warna status lebih terang (`success` `#34d399`, `error` `#f87171`) dan peran `-text`-nya sama dengan warna dasar, yang sudah lolos 4.5:1.
- Popover diangkat dengan sedikit putih (`color-mix` dengan 6% putih) agar lapisan terpisah dari halaman tanpa bergantung pada bayangan; bayangan lebih pekat (`.36`) karena halamannya sudah gelap.
- Hindari teks putih murni (`base-content` adalah `#e6edf3`) dan area jenuh yang besar, yang menyilaukan di gelap.

Pilih tema di markup dengan `data-theme="light"` atau `"dark"`; lihat [Tema](./theming.md).

## Palet primitif {#palet}

Nilai mentah di balik peran. Arahkan kursor ke chip untuk melihat catatannya.

```ds-palette
```

> [!WARNING]
> Komponen tidak pernah memakai primitif. Tulis `var(--color-primary)`, bukan `#00838f` atau `teal.600`. Saat tema berubah, hanya peran semantik yang dipetakan ulang; komponen yang memakai primitif akan tertinggal.

## Hasil kontras {#kontras}

`dotnet run tools/tokens.cs` menghitung rasio WCAG 2.2 untuk 72 pasangan di kedua tema dan menulis `wwwroot/tokens/contrast.json`. Pasangan wajib di bawah 4.5:1 (teks) atau 3:1 (batas, focus ring, ikon) menggagalkan build. Pasangan berlabel informasional tidak menentukan hasil.

```ds-contrast
```

## Lakukan dan jangan {#pemakaian}

- Lakukan: pakai peran lewat variabel: `color: var(--ds-subtle)`, `border-color: var(--ds-control-border)`.
- Lakukan: pasangkan setiap warna status dengan kata dan ikon.
- Lakukan: jaga satu `btn-primary` per area; teal menandainya.
- Lakukan: periksa pasangan teks-di-atas-warna yang baru dan tambahkan ke `tools/tokens.cs`.
- Jangan: pakai hex, primitif, atau kelas palet Tailwind (`bg-red-500`) di komponen.
- Jangan: memberi tint di atas 16% di belakang teks, atau memakai gradien, glow, dan blok jenuh yang besar.
- Jangan: memakai warna saja untuk state: baris terpilih juga mendapat centang, bilah, atau perubahan bobot.
- Jangan: memakai biru untuk tombol atau teal untuk tautan.

```css
.app-ref { color: var(--ds-link); text-decoration: underline; }
.app-hint { color: var(--ds-subtle); }
.app-field { border: 1px solid var(--ds-control-border); background: var(--color-base-100); }
```

```cshtml
<a asp-page="Details" asp-route-id="@Model.Id" class="text-link underline underline-offset-2">INV-2026-0418</a>
<p class="text-subtle">Format INV-TTTT-NNNN</p>
<input class="input border-control" />
```

Utilitas itu berasal dari `generated/tailwind-theme.css` dan di-resolve per elemen, sehingga `data-theme` bersarang tetap memakai warnanya sendiri.
