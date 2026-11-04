---
title: Prose
group: reference
order: 3
summary: Konten panjang dari Markdown, CMS, atau editor rich text dalam peran tipografi, dengan lebar baca 65ch dan ritme vertikal, cukup dengan satu class.
---

`.ds-prose` mengubah HTML tanpa class (keluaran Markdown, halaman CMS, artikel bantuan, catatan rilis, syarat layanan) menjadi teks panjang yang nyaman dibaca: lebar baca 65ch, tinggi baris 1,7, ritme 1,25em antarblok, heading dalam peran tipografi, tautan bergaris bawah, dan penanda pada daftar. Gunakan untuk konten yang tidak Anda kendalikan elemen per elemen. Jangan gunakan untuk layar aplikasi: form, tabel, dan card membawa jaraknya sendiri (lihat [elemen native](./native-elements.md) untuk elemen tanpa class di luar prose). [English](../en/prose.md).

## Contoh

### Artikel

```html preview title="Artikel bantuan dalam .ds-prose"
<article class="ds-prose">
  <p class="ds-prose__lead">Tutup buku lebih cepat dengan menyetujui invoice per batch dan mencocokkan pembayaran begitu masuk.</p>
  <h2>Sebelum memulai</h2>
  <p>Anda membutuhkan peran <strong>Penyetuju keuangan</strong>. Minta kepada <a href="#prose-roles">admin ruang kerja</a> bila tombol Setujui tidak muncul. Satu batch memuat hingga 50 invoice; jumlah yang lebih besar dipecah otomatis.</p>
  <ul>
    <li>Invoice harus berstatus <em>Siap</em>.</li>
    <li>Setiap invoice membutuhkan pusat biaya, misalnya <code>CC-2040</code>.
      <ul>
        <li>Biaya bersama memakai <code>CC-9000</code>.</li>
      </ul>
    </li>
    <li>Nota kredit disetujui terpisah.</li>
  </ul>
  <h2>Menyetujui batch</h2>
  <ol>
    <li>Buka <strong>Invoice</strong> dan saring dengan <mark>Siap</mark>.</li>
    <li>Pilih invoice, lalu tekan <kbd>Ctrl</kbd> + <kbd>Enter</kbd>.</li>
    <li>Periksa totalnya dan konfirmasi.</li>
  </ol>
  <blockquote>
    <p>Batch memangkas proses tutup buku kami dari sembilan hari menjadi empat. Penyetuju memeriksa total, bukan baris satu per satu.</p>
  </blockquote>
  <h3>Total per pusat biaya</h3>
  <table>
    <thead><tr><th scope="col">Pusat biaya</th><th scope="col">Invoice</th><th scope="col" data-type="number">Jumlah (Rp)</th></tr></thead>
    <tbody>
      <tr><td>CC-2040 Operasional</td><td>18</td><td data-type="number">142.500.000</td></tr>
      <tr><td>CC-3110 Pemasaran</td><td>7</td><td data-type="number">38.900.000</td></tr>
    </tbody>
  </table>
  <h3>Ekspor untuk buku besar</h3>
  <pre><code>GET /api/batches/B-2026-11-04/export?format=csv</code></pre>
  <details>
    <summary>Apa yang terjadi pada invoice yang ditolak?</summary>
    <p>Invoice kembali ke Draf dengan komentar Anda. Pemiliknya, misalnya Daniel Okafor, menerima email.</p>
  </details>
  <hr>
  <h4>Terkait</h4>
  <p>Baca <a href="#prose-payments">mencocokkan pembayaran</a> dan <a href="#prose-close">menutup buku bulanan</a>.</p>
</article>
```

### Ukuran dan lebar

`.is-sm` untuk panel samping dan drawer bantuan (14px), `.is-lg` untuk halaman baca (18px), `.is-full` untuk melepas batas 65ch di dalam kolom sempit. Jarak memakai `em`, sehingga semuanya berskala bersama.

```html preview title="is-sm dan is-lg"
<div style="display:grid;gap:2rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))">
  <div class="ds-prose is-sm">
    <h3>Termin pembayaran</h3>
    <p>Net 30 berarti klien membayar dalam 30 hari sejak tanggal invoice. Keterlambatan dikenai 1,5% per bulan.</p>
  </div>
  <div class="ds-prose is-lg">
    <h3>Termin pembayaran</h3>
    <p>Net 30 berarti klien membayar dalam 30 hari sejak tanggal invoice.</p>
  </div>
</div>
```

### Komponen di dalam prose

Komponen yang memakai class tetap dengan tampilannya sendiri: aturan prose memakai selector elemen (spesifisitas 0,0,1). Bungkus blok dengan `.ds-not-prose` untuk mematikan prose sepenuhnya di dalamnya.

```html preview title="Komponen di dalam prose"
<article class="ds-prose">
  <p>Invoice di atas Rp 50.000.000 membutuhkan penyetuju kedua.</p>
  <div class="ds-not-prose" style="display:flex;gap:0.5rem">
    <button class="btn btn-primary" type="button">Minta persetujuan</button>
    <button class="btn" type="button">Batal</button>
  </div>
  <p>Sofia Marquez menyetujui; Daniel Okafor menjadi cadangan.</p>
</article>
```

## State

| Elemen | State | Pemicu | Tampilan |
| --- | --- | --- | --- |
| Tautan | rest | tidak ada | Warna tautan, garis bawah 1px 55% |
| Tautan | hover | `:hover` (perangkat hover) | Garis bawah penuh, 2px |
| Tautan | pressed | `:active` | Warna menggelap ke arah warna teks |
| Tautan | focus-visible | `:focus-visible` | Ring `--ds-focus` 2px, offset 2px |
| Tautan | sudah dikunjungi | `:visited` | Warna tautan dicampur 38% ke arah warna teks |
| Heading | target | `:target`, lompatan anchor | Berhenti di bawah bar sticky (`--ds-sticky-top` + 24px) |
| Details | terbuka | `[open]` | Chevron berputar 180°, isi tumbuh (lihat [elemen native](./native-elements.md)) |
| Item daftar tugas | dicentang | `input[type=checkbox]:checked` | Tampilan checkbox native, tanpa penanda daftar |
| Cetak | dicetak | `@media print` | Tautan eksternal mencetak URL-nya setelah teks |

## Anatomi

- `.ds-prose`: wadah (lebar baca, ukuran, ritme).
- `.ds-prose__lead`: paragraf pembuka opsional, 19px, redup.
- `.ds-not-prose`: jalan keluar untuk komponen yang disematkan.
- Modifier: `.is-sm`, `.is-lg`, `.is-full`.

## Penggunaan

- Gunakan satu `.ds-prose` per artikel; jangan disarangkan.
- Mulai bagian dengan `h2`; judul halaman (`h1`) biasanya berada di luar blok prose, di page header.
- Jaga paragraf di bawah sekitar 5 baris pada 65ch; pecah prosedur panjang menjadi daftar berurut.
- Jangan menambah margin pada elemen di dalam prose; ritmenya 1,25em antarblok, 2em di atas `h2` dan `h3`.
- Jangan menaruh form atau data table di dalam prose. Bungkus UI yang disematkan dengan `.ds-not-prose`.
- Tabel lebar: bungkus dengan wadah gulir (`.ds-scroll-area` atau `overflow-x: auto`); tabel prose selebar penuh dan membungkus sel yang panjang.

## Aksesibilitas

- Lebar baca 65ch dan tinggi baris 1,7 menjaga baris tetap terbaca (WCAG 1.4.8); teks mengalir ulang pada 320px dan zoom 200%.
- Tautan selalu bergaris bawah, sehingga warna bukan satu-satunya penanda; tautan yang sudah dikunjungi tetap bisa dibedakan.
- Heading mempertahankan levelnya: prose hanya mengubah ukuran, tidak pernah urutan. Jangan melompati level.
- Heading berhenti di bawah bar sticky bila halaman mengatur `--ds-sticky-top`.

## Token

`--ds-size-measure`, `--ds-type-body-size`, `--ds-type-callout-size`, `--ds-type-title-1|3-*`, `--ds-type-headline-*`, `--ds-type-section-*`, `--ds-type-label-*`, `--ds-type-footnote-*`, `--ds-link`, `--ds-focus`, `--ds-subtle`, `--color-base-300`, `--ds-border-accent`, `--ds-border-hairline`, `--ds-radius-box`, `--ds-radius-xs`, `--ds-duration-fast`, `--ds-ease-standard`, `--ds-sticky-top`.

## Native dan daisyUI

Prose dibangun di atas gaya [elemen native](./native-elements.md) (kode, `kbd`, `mark`, tabel, `details`, `blockquote`) dan menambahkan ritme, lebar baca, penanda untuk setiap daftar, serta state tautan termasuk `:visited`. Aturannya berada di `@scope (.ds-prose) to (.ds-not-prose)` di dalam `@layer components`. `.prose` milik daisyUI hanya mengatur variabel warna untuk plugin typography Tailwind, yang tidak disertakan DS; gunakan `.ds-prose`. Keluaran Markdig (daftar tugas, catatan kaki, anchor heading) sudah tercakup.
