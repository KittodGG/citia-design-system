---
title: Card
group: components
category: data-display
order: 6
summary: Wadah hairline untuk satu subjek, dengan header, media, aksi, dan footer; varian interaktif, dapat dipilih, horizontal, memuat, dan kosong.
source: TPS app.css .pt-card L3461–3468, .master-surface L1448
---

Card mengelompokkan isi dan aksi satu subjek: proyek, faktur, orang. Pakai satu subjek per card dan jangan menumpuk card; pisahkan bagian di dalam card dengan `.ds-section`. Untuk kotak polos tanpa struktur pakai `.ds-surface`; untuk data tabel pakai [table](./table.md); untuk satu angka pakai [stat](./stat.md).

## Contoh

```html preview title="Header, aksi, isi, dan footer"
<article class="ds-card" style="max-inline-size:28rem">
  <header class="ds-card__header">
    <div>
      <span class="ds-card__eyebrow">PRJ-1024</span>
      <h3 class="ds-card__title">Redesain situs web</h3>
      <p class="ds-card__description">Diperbarui 2 Nov 2026, 14.30</p>
    </div>
    <div class="ds-card__actions"><button type="button" class="btn btn-ghost btn-sm"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg> Ubah</button></div>
  </header>
  <div class="ds-card__body"><p>Anggaran terpakai: <strong>Rp84.500.000</strong> dari Rp120.000.000. Tonggak berikutnya 14 Nov 2026.</p></div>
  <footer class="ds-card__footer is-between"><span class="ds-pill is-info">Berjalan</span><span class="ds-text-subtle">Penanggung jawab: Ayu Lestari</span></footer>
</article>
```

```html preview title="Card interaktif (satu link)"
<div class="ds-grid-2">
  <article class="ds-card is-interactive">
    <div class="ds-card__body">
      <span class="ds-card__eyebrow">INV-2026-0418</span>
      <h3 class="ds-card__title"><a class="ds-card__link" href="#faktur-418">Faktur untuk Mei Tanaka</a></h3>
      <p class="ds-card__description">Rp12.400.000, jatuh tempo 20 Nov 2026</p>
    </div>
    <footer class="ds-card__footer"><span class="ds-pill is-warning">Jatuh tempo 18 hari lagi</span></footer>
  </article>
  <article class="ds-card is-interactive">
    <div class="ds-card__body">
      <span class="ds-card__eyebrow">INV-2026-0419</span>
      <h3 class="ds-card__title"><a class="ds-card__link" href="#faktur-419">Faktur untuk Daniel Okafor</a></h3>
      <p class="ds-card__description">Rp3.150.000, dibayar 2 Nov 2026</p>
    </div>
    <footer class="ds-card__footer"><span class="ds-pill is-success">Lunas</span></footer>
  </article>
</div>
```

```html preview title="Card yang dapat dipilih (radio)"
<div class="ds-grid-3" role="radiogroup" aria-label="Paket">
  <label class="ds-card is-selectable"><input type="radio" name="paket" value="starter" class="radio radio-sm ds-card__input">
    <div class="ds-card__body"><span class="ds-card__eyebrow">Starter</span><h3 class="ds-card__title">Rp0</h3><p class="ds-card__description">Hingga 3 proyek</p></div></label>
  <label class="ds-card is-selectable"><input type="radio" name="paket" value="team" class="radio radio-sm ds-card__input" checked>
    <div class="ds-card__body"><span class="ds-card__eyebrow">Team</span><h3 class="ds-card__title">Rp150.000</h3><p class="ds-card__description">Proyek tak terbatas, 10 anggota</p></div></label>
  <label class="ds-card is-selectable"><input type="radio" name="paket" value="business" class="radio radio-sm ds-card__input" disabled>
    <div class="ds-card__body"><span class="ds-card__eyebrow">Business</span><h3 class="ds-card__title">Rp450.000</h3><p class="ds-card__description">Tidak tersedia di wilayah Anda</p></div></label>
</div>
```

```html preview title="Dengan media dan tata letak horizontal"
<div class="ds-grid-2">
  <article class="ds-card">
    <div class="ds-card__media"><svg viewBox="0 0 16 9" role="img" aria-label="Gambar placeholder"><rect width="16" height="9" fill="currentColor" opacity=".08"/></svg></div>
    <div class="ds-card__body"><h3 class="ds-card__title">Renovasi kantor</h3><p class="ds-card__description">Tahap 2 dimulai 18 Nov 2026.</p></div>
  </article>
  <article class="ds-card is-horizontal">
    <div class="ds-card__media"><svg viewBox="0 0 16 9" role="img" aria-label="Gambar placeholder"><rect width="16" height="9" fill="currentColor" opacity=".08"/></svg></div>
    <div class="ds-card__content">
      <div class="ds-card__body"><h3 class="ds-card__title">Sofia Marquez</h3><p class="ds-card__description">Kepala keuangan, Jakarta</p></div>
      <footer class="ds-card__footer is-end"><button type="button" class="btn btn-sm">Kirim pesan</button></footer>
    </div>
  </article>
</div>
```

```html preview title="Memuat dan kosong"
<div class="ds-grid-2">
  <article class="ds-card" aria-busy="true">
    <span class="ds-visually-hidden" role="status">Memuat</span>
    <div class="ds-card__body" aria-hidden="true"><span class="ds-bone is-title"></span><span class="ds-bone"></span><span class="ds-bone is-short"></span></div>
  </article>
  <article class="ds-card is-dashed">
    <div class="ds-card__empty">
      <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
      <strong>Belum ada proyek</strong>
      <span>Proyek yang Anda buat tampil di sini.</span>
      <button type="button" class="btn btn-primary btn-sm">Proyek baru</button>
    </div>
  </article>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Hairline 1px `--color-base-300`, base-100, radius `--ds-radius-card`, tanpa bayangan |
| Hover (interaktif) | Pointer, `(hover: hover)` | Terangkat `--ds-lift` (-2px), border ke arah primary, `--ds-shadow-lift` |
| Focus-visible | Keyboard pada link card atau input yang dapat dipilih | Cincin `--ds-focus` 2px mengelilingi seluruh card |
| Pressed | `:active` pada card interaktif | Angkatan berakhir, lapisan state 3% |
| Terpilih | `:checked` pada `.ds-card__input` | Border primary dan cincin dalam, isi primary 6%, kontrol native tercentang |
| Disabled | Input `disabled` atau `aria-disabled="true"` | `--ds-opacity-disabled`, `cursor: not-allowed`, tanpa angkatan |
| Tidak valid | `:user-invalid` pada card terpilih yang wajib | Border error |
| Memuat | `aria-busy="true"` | Bone dengan shimmer, interaksi diblokir, "Memuat" tersembunyi |
| Kosong | `.ds-card__empty` | Ikon di tengah, judul, satu kalimat, paling banyak satu aksi |
| Reduced motion | `prefers-reduced-motion` | Tanpa angkatan, tanpa shimmer |

UI data yang padat tidak terangkat: hanya card `is-interactive` yang terangkat.

## Anatomi

- `.ds-card` dengan `is-tonal`, `is-elevated`, `is-dashed`, `is-compact`, `is-danger`, `is-interactive`, `is-selectable`, `is-horizontal`.
- `.ds-card__media` (`is-square`, `is-wide`), `.ds-card__header` (`__eyebrow`, `__title`, `__description`, `__actions`), `.ds-card__body` (`is-flush`, `is-roomy`), `.ds-card__footer` (`is-end`, `is-between`), `.ds-card__link`, `.ds-card__input`, `.ds-card__empty`, `.ds-card__content` (horizontal).
- Nama versi 1 `.ds-card-head`, `.ds-card-body`, `.ds-card-foot` tetap berfungsi.

## Penggunaan

- Pakai satu link per card interaktif: judulnya. Jangan menaruh link atau button lain di atas sampul; button di `__actions` dan footer berada di atasnya dan tetap berfungsi.
- Pakai paling banyak 1 aksi utama per card; taruh aksi sekunder di menu.
- Jaga media pada 16:9, 1:1, atau 21:9; selalu beri teks `alt` untuk gambar konten, `alt=""` untuk dekorasi.
- Pakai `is-selectable` untuk memilih satu atau beberapa item di formulir; checkbox atau radio native tetap terlihat.
- Jangan menumpuk card, dan jangan pakai lebih dari 3 kolom card sebelum 1440px.

## Aksesibilitas

- Card interaktif adalah `article` dengan satu `a` (diperluas dengan `::after`); nama aksesibelnya adalah teks link, jadi tulis lengkap.
- Card yang dapat dipilih adalah `label` yang membungkus input native: nama, peran, dan state berasal dari input. Kelompokkan radio dalam `role="radiogroup"` dengan `aria-label`.
- Heading: pakai `h2` sampai `h4` untuk judul agar kerangka halaman tetap benar (`level` pada tag helper).
- Kontras: border hairline bersifat dekoratif; state terpilih juga memakai kontrol yang tercentang.

| Tombol | Aksi |
| --- | --- |
| Tab | Pindah ke link card atau inputnya, lalu ke button di aksi dan footer |
| Enter | Mengikuti link card |
| Space | Mengalihkan card yang dapat dipilih; tombol panah berpindah antar card radio |

## Razor

```cshtml
<ds-card title="Redesain situs web" eyebrow="PRJ-1024" description="Diperbarui 2 Nov 2026" href="/projects/1024">
    Anggaran terpakai: Rp84.500.000 dari Rp120.000.000.
    <ds-card-actions><button type="button" class="btn btn-ghost btn-sm">Ubah</button></ds-card-actions>
    <ds-card-footer><ds-pill tone="Info">Berjalan</ds-pill></ds-card-footer>
</ds-card>

<ds-card title="Team" selectable input-type="radio" name="paket" value="team" checked>Proyek tak terbatas</ds-card>
<ds-card loading />
```

## Token

`--color-base-100`, `--color-base-300`, `--ds-radius-card`, `--ds-space-card-x|y`, `--ds-type-card-title-*`, `--ds-lift`, `--ds-shadow-lift`, `--ds-shadow-menu`, `--ds-opacity-disabled`, `--ds-duration-base|fast`, `--ds-focus`.

## Native dan daisyUI

Dibangun di atas `article`, `header`, `footer`, `label`. Ia menggantikan daisyUI `card`, `card-body`, dan `card-actions` (tetap tampil, tanpa state ini). `.ds-bone` adalah potongan skeleton yang dipakai di dalam card dan stat.
