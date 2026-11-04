---
title: Aksesibilitas
group: Fondasi
order: 8
summary: Target WCAG 2.2 AA sebagai daftar aturan konkret, masing-masing dengan class atau atribut DS yang mengimplementasikannya, plus rutinitas pengujian.
source: TPS DESIGN.md; accessibility.css; wwwroot/js/ds.js
---

Target DS adalah WCAG 2.2 level AA. Aturan di bawah berupa daftar periksa; setiap butir menyebut class atau atribut yang menerapkannya. Aplikasi operator dipakai dengan keyboard, layar sentuh, dan pembaca layar, jadi ketiganya diuji.

## Kontras {#kontras}

- Teks isi 4.5:1, teks besar (≥ 24 px atau ≥ 18.66 px tebal) 3:1, komponen UI dan batas kontrol 3:1.
- Pakai token yang sudah lolos: `--ds-subtle`, `--ds-muted`, `--ds-control-border` (3.37:1 di tema terang), `--ds-quiet`, `--ds-error-text`, `--ds-warning-text`.
- Tombol utama teal terisi dengan teks putih bernilai 4.52:1; tombol Excel 6.17:1, PDF 7.08:1.
- Daftar pasangan warna dan rasionya ada di [Warna](./warna.md). Laporan kontras dibuat dari `tokens/tokens.json` dan dicek tiap perubahan token.

## Fokus {#fokus}

- Setiap kontrol punya cincin fokus 2 px `--ds-focus`, offset 2 px (`:focus-visible`). Di komponen yang rata dengan tepinya offset -2 px.
- Urutan fokus mengikuti urutan baca. Jangan memakai `tabindex` positif.
- Saat mengembalikan fokus (menutup dialog atau menu), panggil `focus({ preventScroll: true })` agar halaman tidak melompat. `ds.js` melakukannya lewat `focusQuietly`.
- Fokus awal dialog: tombol **Batal** untuk aksi yang tidak bisa dibatalkan, field pertama untuk form.
- Skip link `.ds-skip-link` "Lewati ke konten" menjadi elemen fokus pertama dan menuju `#main` (`.ds-main`, `tabindex="-1"`).

```cshtml
<a class="ds-skip-link btn btn-primary" href="#main">Lewati ke konten</a>
...
<main id="main" class="ds-main" tabindex="-1">...</main>
```

## Keyboard {#keyboard}

- Semua fungsi bisa dijangkau dan dijalankan dengan keyboard. Tidak ada aksi yang hanya muncul saat hover.
- Combobox (`select[data-ds-combobox]`): Panah atas/bawah membuka daftar dan memindah sorotan (melingkar), Alt+Panah hanya membuka, Enter memilih, Escape menutup atau mengembalikan label terpilih, Tab menutup tanpa memilih.
- Escape menutup menu, popover, drawer, dan dialog. Bila ada dialog terbuka, dialog yang menangani Escape-nya sendiri.
- Drawer sidebar menjebak Tab di dalamnya di bawah 1024 px dan mengembalikan fokus ke tombol menu saat ditutup.
- Tombol dan tautan memakai elemen asli (`<button>`, `<a href>`), bukan `<div>` dengan handler klik.

## Target sentuh {#target}

- Semua tombol dan kontrol minimal 44 px (`--ds-size-target`), termasuk `btn-sm` dan `btn-xs`.
- Pengecualian: `.ds-icon-btn` (36 px) dan `.ds-dense` pada tabel desktop yang padat. Di layar sentuh pakai `btn btn-ghost btn-square`.
- Beri jarak antarkontrol agar target tidak saling menempel (WCAG 2.5.8).

## Nama dan peran {#nama}

| Kebutuhan | Implementasi |
| --- | --- |
| Tombol hanya ikon | `aria-label="Ubah tangki T-01"`; ikon `aria-hidden="true"` |
| Tautan navigasi di rail (hanya ikon) | `aria-label` dan `title` tetap ada |
| Halaman aktif di navigasi | `aria-current="page"`; item pada tampilan bersegmen `aria-current="true"` |
| Posisi di tanggal atau langkah | `aria-current="location"` / `step` |
| Pemicu yang membuka isi | `aria-expanded` pada tombol (grup navigasi, menu, panel) |
| Kolom tabel yang bisa diurutkan | `aria-sort="ascending"` / `"descending"` pada `th` aktif |
| Tabel yang bisa digulir | `role="region"` + `aria-label="Daftar dokumen pemasukan"` + `tabindex="0"` |
| Toast, status simpan | `role="status"` (sopan) atau `role="alert"` (galat) |
| Hitungan hasil combobox | Region `role="status"`: "5 hasil" |

```html preview title="Area scroll tabel yang bisa difokus"
<div class="ds-table-scroll" role="region" aria-label="Rekap per BL" tabindex="0">
  <table class="ds-table">
    <thead><tr><th aria-sort="ascending">No BL</th><th>Kapal</th><th>Qty</th></tr></thead>
    <tbody><tr><td>BL-2026-00841</td><td>MT Sinar Jaya</td><td>992.5 TNE</td></tr></tbody>
  </table>
</div>
```

## Status sebagai teks {#status}

Warna tidak pernah menjadi satu-satunya penanda (WCAG 1.4.1). `<ds-pill>` selalu berisi kata ("Terkirim", "Ditolak"); titik berwarna hanya pelengkap. Kolom kuantitas negatif diberi tanda dan kata, bukan hanya merah. Di mode warna paksa, titik status berganti ke `CanvasText` sehingga kata tetap menjadi penanda.

## Form {#form}

- Label di atas field, terhubung lewat `for`/`id`. Placeholder bukan pengganti label.
- Bantuan dan galat dihubungkan: `aria-describedby="bl-hint bl-error"`.
- Field yang salah: `aria-invalid="true"` dan pesan berupa teks di bawah field.
- Ringkasan galat `.ds-error-summary` di atas form menerima fokus saat submit gagal, berisi tautan ke tiap field yang salah.
- Tandai kolom wajib dengan kata ("wajib"), bukan hanya tanda bintang.
- Jangan menonaktifkan tombol kirim tanpa penjelasan; biarkan aktif dan tampilkan galat.

```html preview title="Field dengan bantuan dan galat"
<div class="ds-field">
  <label for="a11y-bl">No BL</label>
  <input id="a11y-bl" class="input" value="BL-2026-0084" aria-invalid="true" aria-describedby="a11y-bl-hint a11y-bl-error" />
  <p id="a11y-bl-hint" class="ds-hint">Format BL-TAHUN-NOMOR.</p>
  <p id="a11y-bl-error" class="ds-field-error">No BL harus 5 digit di belakang tahun.</p>
</div>
```

## Preferensi pengguna {#preferensi}

`accessibility.css` dimuat tanpa lapisan dan paling akhir, sehingga menimpa gaya komponen.

| Preferensi | Efek |
| --- | --- |
| `prefers-reduced-motion: reduce` | Animasi dan transisi 0.01 ms, tanpa transform, indikator berulang disembunyikan, kata status tetap. Lihat [Motion](./motion.md) |
| `prefers-reduced-transparency: reduce` | Popover, combobox, menu, dan toast menjadi opak; blur dilepas; scrim 70% |
| `prefers-contrast: more` | `--ds-subtle` menjadi warna isi penuh; `--ds-control-border` dan `--color-base-300` lebih pekat |
| `forced-colors: active` | Fokus `2px solid CanvasText`; titik status memakai `CanvasText` |
| `prefers-color-scheme` | Tema mengikuti sistem sampai pengguna memilih lewat `data-ds-theme-toggle` |

## Bahasa {#bahasa}

Set `<html lang="id">`. Potongan berbahasa lain diberi `lang` sendiri (misalnya `lang="en"` pada istilah XML). Tanggal `25 Jan 2026`, jam `14.30 WIB`, kuantitas dengan titik desimal (`992.5 TNE`).

## Waktu {#waktu}

- Toast otomatis tertutup, tetapi berhenti menghitung saat kursor di atasnya atau saat ia menerima fokus (`pointerenter`, `focusin`), dan lanjut saat keduanya lepas (WCAG 2.2.1).
- Toast galat tidak menutup sendiri; pengguna menutupnya.
- Tombol export dikunci 15 detik dengan `aria-disabled="true"`, bukan `disabled`, agar tetap terbaca oleh pembaca layar.

## Rutinitas pengujian {#pengujian}

Jalankan sebelum setiap rilis halaman baru.

1. **Hanya keyboard.** Cabut mouse. Tekan Tab melalui halaman, buka tiap menu, dialog, dan combobox, tutup dengan Escape. Cincin fokus selalu terlihat dan urutannya masuk akal.
2. **Pembaca layar.** NVDA dengan Edge atau Chrome di Windows, VoiceOver di macOS atau iOS Safari. Cek nama tombol ikon, status toast, galat form, dan area scroll tabel.
3. **Zoom 200% dan lebar 320 px.** Tidak ada scroll horizontal pada halaman (tabel boleh di dalam areanya), tidak ada teks terpotong.
4. **Dua tema.** Ulangi 1 sampai 3 di tema terang dan gelap.
5. **Preferensi.** Aktifkan reduced motion dan kontras tinggi di sistem operasi; pastikan status tetap terbaca sebagai kata.
6. **Laporan kontras.** Jalankan pemeriksaan token dan pastikan tidak ada pasangan di bawah ambang.
