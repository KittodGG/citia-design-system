---
title: Separator
group: components
category: layout
order: 30
summary: Garis tipis yang memisahkan konten, horizontal atau vertikal, inset atau selebar penuh, dengan label opsional seperti "atau", semantik maupun murni hiasan.
---

Pakai separator untuk menandai pergantian topik atau mengelompokkan item terkait: antar bagian kartu, antar kelompok pengaturan, antar klaster toolbar, antara "masuk" dan "lanjutkan dengan". Utamakan jarak lebih dulu: ruang kosong 24 sampai 32px sering memisahkan konten lebih baik daripada garis. Pakai [card](./card.md) atau `<fieldset>` ([fieldset](./fieldset.md)) bila kelompok itu perlu nama.

## Contoh

### Horizontal

`<hr class="ds-separator">` menggambar garis 1px dengan `--color-base-300` dan membawa role implisit `separator`. Margin bawaan 16px di atas dan bawah; `is-flush` menghapusnya. `is-strong` memakai `--ds-control-border`, `is-dashed` menggambar garis putus-putus.

```html preview title="Varian horizontal"
<div style="max-width:26rem">
  <p style="margin:0">Alamat penagihan</p>
  <hr class="ds-separator">
  <p style="margin:0">Metode pembayaran</p>
  <hr class="ds-separator is-strong">
  <p style="margin:0">Notifikasi</p>
  <hr class="ds-separator is-dashed">
  <p style="margin:0">Zona berbahaya</p>
</div>
```

### Inset

`is-inset` memulai garis 16px ke dalam (ubah dengan `--ds-separator-inset`) agar sejajar dengan teks baris daftar dan bukan dengan ikonnya. `is-inset-both` menggeser kedua ujung.

```html preview title="Inset dalam daftar"
<ul style="list-style:none;margin:0;padding:0;max-width:22rem">
  <li style="padding:.5rem 1rem">Ayu Lestari</li>
  <li role="presentation"><hr class="ds-separator is-inset is-flush"></li>
  <li style="padding:.5rem 1rem">Daniel Okafor</li>
  <li role="presentation"><hr class="ds-separator is-inset is-flush"></li>
  <li style="padding:.5rem 1rem">Mei Tanaka</li>
</ul>
```

### Vertical

Separator vertikal meregang setinggi baris flex atau grid-nya. Pakai antar kelompok toolbar atau metadata sebaris. Tambahkan `aria-orientation="vertical"` bila ia semantik.

```html preview title="Vertikal dalam toolbar"
<div style="display:flex;align-items:center;gap:.25rem;min-height:2rem">
  <button type="button" class="btn btn-ghost btn-sm">Tebal</button>
  <button type="button" class="btn btn-ghost btn-sm">Miring</button>
  <div class="ds-separator is-vertical" role="separator" aria-orientation="vertical"></div>
  <button type="button" class="btn btn-ghost btn-sm">Tautan</button>
  <button type="button" class="btn btn-ghost btn-sm">Kutipan</button>
</div>
```

### With a label

Label memutus garis: `<div class="ds-separator has-label">atau</div>`. Garisnya adalah pseudo-element, sehingga teks tetap dalam urutan baca dan dibacakan. `is-start` dan `is-end` menarik label ke satu sisi (judul bagian seperti "Hari ini").

```html preview title="Separator berlabel"
<div style="max-width:24rem">
  <button type="button" class="btn btn-primary" style="width:100%">Masuk</button>
  <div class="ds-separator has-label">atau</div>
  <button type="button" class="btn" style="width:100%">Lanjutkan dengan passkey</button>
  <div class="ds-separator has-label is-start">Hari ini</div>
  <p style="margin:0">Faktur INV-2026-0418 telah dibayar.</p>
  <div class="ds-separator has-label is-end is-strong">Kemarin</div>
  <p style="margin:0">Proyek PRJ-1024 diarsipkan.</p>
</div>
```

### Decorative and semantic

Separator semantik terbuka bagi teknologi bantu (`<hr>` atau `role="separator"`). Yang dekoratif tidak (`role="none"` atau `aria-hidden="true"`). Pilih berdasarkan apakah pemisahan itu mengubah cara konten dibaca.

```html preview title="Dekoratif dan semantik"
<div style="max-width:26rem">
  <p style="margin:0">Semantik: pembaca layar mengumumkan "separator" di antara dua topik.</p>
  <hr class="ds-separator">
  <p style="margin:0">Dekoratif: garis tambahan antara dua kartu yang sudah dipisahkan judul.</p>
  <div class="ds-separator" role="none"></div>
  <p style="margin:0">Selesai.</p>
</div>
```

## State

Separator bersifat statis. Tabel mendaftar varian dan lingkungan agar tidak ada yang tersirat.

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | 1px, `--color-base-300`, margin 16px di atas dan bawah |
| Strong | `is-strong` | `--ds-control-border` (3:1 terhadap permukaan) |
| Dashed | `is-dashed` | Putus-putus 1px |
| Inset | `is-inset`, `is-inset-both` | Dimulai 16px dari tepi (`--ds-separator-inset`) |
| Vertical | `is-vertical` | Lebar 1px, setinggi baris, margin samping 12px |
| Berlabel | `has-label` | Teks `--ds-subtle`, 12px, tebal 600, garis di kedua sisi (`is-start`/`is-end`: garis 24px di satu sisi) |
| Interaksi | Tidak berlaku | Tidak pernah bisa difokus, tanpa hover atau tekan |
| Dark | `data-theme="dark"` | Garis adalah `--color-base-300` gelap |
| Kontras lebih | `prefers-contrast: more` | `--color-base-300` menjadi campuran 45% warna teks |
| Forced colours | `forced-colors: active` | Garis memakai `CanvasText` (border, bukan latar, sehingga tetap terlihat) |
| RTL | `dir="rtl"` | Inset dan sisi awal berlabel mengikuti arah tulisan |
| Cetak | `@media print` | Tercetak sebagai garis |

## Anatomi

- `.ds-separator`: garisnya, pada `<hr>` atau `div`.
- `.is-strong`, `.is-dashed`, `.is-flush`, `.is-inset`, `.is-inset-both`, `.is-vertical`: varian.
- `.has-label` (+ `.is-start`, `.is-end`): baris flex dengan garis di tiap sisi teks.

## Penggunaan

- Pakai satu tingkat separator. Jika butuh hierarki, pakai judul dan jarak, bukan tiga jenis garis.
- Jangan menaruh separator di antara setiap baris daftar sekaligus memberi baris border; pilih salah satu.
- Pakai `is-inset` pada daftar dengan ikon atau avatar di depan; pakai lebar penuh pada kartu dan menu.
- Batasi label satu atau dua kata ("atau", "Hari ini", "Opsional"). Teks yang lebih panjang adalah judul.
- Jangan pakai separator sebagai pengganti margin; sisakan `is-flush` untuk kasus ketika wadah mengatur jaraknya.
- Jangan pakai separator vertikal di dalam teks yang membungkus; ia akan meregang setinggi baris tertinggi.

## Aksesibilitas

- `<hr>` punya role implisit `separator`; `div` butuh `role="separator"` (tambahkan `aria-orientation="vertical"` untuk yang vertikal). Horizontal adalah orientasi bawaan.
- Garis dekoratif memakai `role="none"` (atau `aria-hidden="true"`, atau border CSS pada elemen di dekatnya) agar pembaca layar tidak mengumumkan "separator" untuk setiap garis visual.
- Separator berlabel adalah teks biasa di antara dua garis. Ia bukan `role="separator"` karena anak separator bersifat presentasional dan kata itu akan hilang.
- Separator tidak bisa difokus dan tidak butuh tombol.
- Garis mencapai 1,2 sampai 1,5:1 terhadap permukaan secara sengaja: ia hiasan, bukan batas kontrol. Pakai `is-strong` (3:1) bila garis adalah satu-satunya penanda batas.

## Razor

```cshtml
<ds-separator />
<ds-separator inset />
<ds-separator decorative />
<ds-separator label="atau" />
<ds-separator label="Hari ini" align="Start" strong />
<ds-separator vertical />
```

| Atribut | Efek |
| --- | --- |
| `label` | Teks di antara dua garis (`div.ds-separator.has-label`) |
| `align` | `Start` atau `End` dengan label |
| `vertical` | Garis vertikal sebaris; `role="separator"` dengan `aria-orientation="vertical"` |
| `decorative` | `role="none"` sebagai ganti `<hr>` |
| `inset`, `strong`, `dashed`, `flush` | Varian |

## Token

`--color-base-300`, `--ds-control-border`, `--ds-subtle`, `--ds-separator-inset` (bawaan `--ds-space-4`), `--ds-space-3`, `--ds-space-4`, `--ds-space-6`, `--ds-type-caption-size`, `--ds-type-caption-leading`, `--ds-weight-semibold`.

## Native dan daisyUI

Ini adalah `<hr>` native (atau `div` dengan `role="separator"`) dengan gaya bawaannya direset. Class `divider` daisyUI juga menggambar garis berlabel; `.ds-separator` memakai border agar garis tetap terlihat pada forced colours, menjaga label dalam urutan baca, dan mengikuti token DS.
