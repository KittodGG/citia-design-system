---
title: Aksesibilitas
group: foundations
order: 9
summary: WCAG 2.2 AA sebagai daftar periksa konkret dengan nomor success criterion, fitur DS yang menerapkannya, dan rutinitas pengujian.
---

Targetnya WCAG 2.2 level AA. Daftar periksa di bawah menyebut success criterion (SC), aturan dalam angka, dan fitur DS yang menerapkannya. Komponen mewarisi sebagian besar; sisanya menjadi tugas halaman yang memakainya.

## Kontras

| SC | Aturan | Di DS |
| --- | --- | --- |
| 1.4.3 | Teks 4.5:1, teks besar (24px, atau 18.66px tebal) 3:1 | `--ds-subtle`, `--ds-muted`, `--ds-quiet`, dan token `--ds-*-text` disetel per tema |
| 1.4.11 | Batas UI, ikon, cincin fokus 3:1 | `--ds-control-border`, `--ds-focus` |
| 1.4.1 | Warna bukan satu-satunya petunjuk | Pill status membawa kata; item terpilih membawa glyph atau bobot |

Pasangan warna dan rasionya ada di [halaman warna](./color.md). Laporannya dibuat dari `tokens/tokens.json` dan dicek di setiap perubahan token.

## Keyboard dan fokus

| SC | Aturan | Di DS |
| --- | --- | --- |
| 2.1.1 | Semuanya bisa dipakai dengan keyboard | `<button>`, `<a href>`, `<dialog>` native; tanpa aksi yang hanya muncul saat hover |
| 2.1.2 | Tanpa jebakan keyboard | Escape menutup menu, popover, sheet, dan dialog |
| 2.4.1 | Lewati blok berulang | `.ds-skip-link` adalah elemen fokus pertama dan menuju `#main` |
| 2.4.3 | Urutan fokus mengikuti urutan baca | Tanpa `tabindex` positif |
| 2.4.7 | Fokus terlihat | Cincin `--ds-focus` 2px, offset 2px (`:focus-visible`) |
| 2.4.11 | Fokus tidak tertutup | Bar sticky memakai `scroll-padding`; cincin tidak pernah dihapus |
| 3.2.1 | Tanpa perubahan konteks saat fokus | Menu terbuka saat diaktifkan, bukan saat fokus |

Kembalikan fokus ke pemicu saat lapisan ditutup, tanpa menggulir (`focus({ preventScroll: true })`, dibungkus sebagai `focusQuietly` di `core.js`). Fokus awal di dialog menuju Batal untuk aksi yang tidak bisa dibatalkan dan ke field pertama untuk form.

```cshtml
<a class="ds-skip-link btn btn-primary" href="#main">Lewati ke konten</a>
<main id="main" class="ds-main" tabindex="-1">…</main>
```

## Target

| SC | Aturan | Di DS |
| --- | --- | --- |
| 2.5.8 | Minimal 24×24px | Setiap kontrol; kepadatan ringkas menjaga area tekan 24px |
| 2.5.5 (AAA, diikuti) | 44×44px di layar sentuh | `--ds-size-target` pada `(pointer: coarse)` |
| 2.5.7 | Menyeret punya alternatif pointer | Item yang bisa diurutkan dan diubah ukurannya punya tombol atau tombol panah |

## Nama, peran, nilai

| SC | Kebutuhan | Implementasi |
| --- | --- | --- |
| 4.1.2 | Tombol hanya ikon | `aria-label="Ubah proyek PRJ-1024"`, ikon `aria-hidden="true"` |
| 4.1.2 | Halaman saat ini | `aria-current="page"` (`location`, `step`, dan `true` bila cocok) |
| 4.1.2 | Disclosure | `aria-expanded` pada pemicu |
| 1.3.1 | Kolom yang bisa diurutkan | `aria-sort="ascending"` pada `th` aktif |
| 1.3.1 | Tabel yang bisa digulir | `role="region"`, `aria-label`, dan `tabindex="0"` pada pembungkus |
| 4.1.3 | Pesan status | `role="status"` (sopan), `role="alert"` (galat) |
| 2.5.3 | Label dalam nama | Nama aksesibel memuat teks yang terlihat |

### Live region

Umumkan hasil tanpa memindahkan fokus: konfirmasi simpan, jumlah hasil, toast. Pakai `role="status"` untuk pembaruan sopan dan `role="alert"` untuk galat yang perlu perhatian sekarang. Region harus sudah ada di DOM sebelum teksnya berubah. Pesan singkat ("5 hasil", "Faktur tersimpan"). Jangan mengumumkan pada setiap ketikan.

## Form

| SC | Aturan | Di DS |
| --- | --- | --- |
| 1.3.1, 3.3.2 | Label terlihat, dihubungkan `for` dan `id` | `.ds-field`; placeholder bukan label |
| 3.3.1 | Galat dinyatakan dalam teks | `aria-invalid="true"`, pesan di bawah field |
| 3.3.3 | Saran dalam galat | "Masukkan tanggal seperti 2026-03-14", bukan "Tidak valid" |
| 1.3.5 | Tujuan input | `autocomplete` pada field nama, email, alamat |
| 3.3.7 | Entri berulang | Jangan meminta yang sudah diberikan pengguna di alur yang sama |
| 3.3.8 | Autentikasi aksesibel | Izinkan tempel dan pengelola kata sandi; tanpa tes kognitif |

Taruh ringkasan galat (`.ds-error-summary`) di atas form saat submit gagal, pindahkan fokus ke sana, dan tautkan tiap entri ke fieldnya. Tandai field wajib dengan kata "wajib", bukan hanya tanda bintang. Jangan menonaktifkan tombol kirim tanpa penjelasan; biarkan aktif dan tampilkan galat.

```html preview title="Field dengan bantuan dan galat"
<div class="ds-field" style="max-width:26rem">
  <label for="a11y-code">Kode proyek</label>
  <input id="a11y-code" class="input" value="PRJ-10" aria-invalid="true" aria-describedby="a11y-code-h a11y-code-e" />
  <p id="a11y-code-h" class="ds-hint">Format PRJ- diikuti empat digit.</p>
  <p id="a11y-code-e" class="ds-field-error">Tambahkan dua digit lagi, misalnya PRJ-1024.</p>
</div>
```

## Gerak dan waktu

| SC | Aturan | Di DS |
| --- | --- | --- |
| 2.3.3 | Gerak karena interaksi bisa dimatikan | `prefers-reduced-motion` di `accessibility.css`; lihat [Motion](./motion.md) |
| 2.2.2 | Konten bergerak bisa dijeda | Loop dibatasi pada spinner, skeleton, live dot; semuanya berhenti di bawah reduced motion |
| 2.3.1 | Tanpa kedipan | Tidak ada yang berkedip lebih dari 3 kali per detik |
| 2.2.1 | Waktu bisa diatur | Toast berhenti saat hover dan fokus; toast galat tidak menutup sendiri |

## Reflow dan zoom

| SC | Aturan | Di DS |
| --- | --- | --- |
| 1.4.4 | Teks diperbesar sampai 200% | Ukuran dalam `rem`; tidak ada yang terpotong |
| 1.4.10 | Reflow di 320px, tanpa scroll dua arah | Grid `minmax(min(100%, X), 1fr)`; tabel menggulir di region sendiri |
| 1.4.12 | Penimpaan jarak teks | Wadah tidak memakai tinggi tetap untuk teks |
| 1.4.13 | Konten hover dan fokus | Tooltip bisa ditutup (Escape), bisa di-hover, dan menetap |

## Preferensi pengguna

| Preferensi | Efek |
| --- | --- |
| `prefers-reduced-motion` | Transform dan loop mati, kata status tetap |
| `prefers-reduced-transparency` | Lapisan melayang opak, scrim 70% |
| `prefers-contrast: more` | Tingkat teks dan border lebih gelap |
| `forced-colors: active` | Fokus `2px solid CanvasText`; titik status memakai `CanvasText` |
| `prefers-color-scheme` | Tema mengikuti sistem sampai pengguna memilih |

## Bahasa

Set `<html lang="id">` atau `lang="en"` dari culture request. Beri `lang` sendiri pada bagian berbahasa lain. Tanggal dan angka mengikuti culture; lihat [Lokalisasi](./localization.md).

## Rutinitas pengujian

Jalankan sebelum setiap halaman dirilis.

1. **Hanya keyboard.** Cabut mouse. Tekan Tab melalui halaman, buka setiap menu, dialog, dan combobox, tutup dengan Escape. Cincin selalu terlihat dan urutannya masuk akal.
2. **Otomatis.** Jalankan axe DevTools atau Lighthouse accessibility pada setiap state (dialog terbuka, form galat), bukan hanya muatan pertama. Nol pelanggaran; otomatisasi hanya menemukan sekitar sepertiga masalah.
3. **Zoom 200% dan 320px.** Tanpa scroll horizontal halaman, tanpa teks atau kontrol terpotong.
4. **Pembaca layar.** NVDA dengan Edge atau Chrome di Windows, VoiceOver di macOS dan Safari iOS. Cek nama tombol ikon, pengumuman toast, galat field, dan region tabel.
5. **Tema dan preferensi.** Ulangi 1–3 di tema terang dan gelap, lalu dengan reduced motion, more contrast, dan forced colours.
6. **Kedua bahasa.** Jalankan dalam bahasa Inggris dan Indonesia; string Indonesia lebih panjang.

## Panduan

- Pakai elemen native lebih dulu: `<button>`, `<a href>`, `<input>`, `<details>`, `<dialog>`.
- Jangan memasang `role="button"` pada `div`.
- Jangan memakai `aria-label` untuk mengulang teks yang terlihat; ia hanya menambah konteks bila teks tidak cukup.
- Jangan memakai `title` sebagai satu-satunya nama atau deskripsi.
- Jangan mengandalkan warna, posisi, atau bentuk saja untuk membedakan state.
