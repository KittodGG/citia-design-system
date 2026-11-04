---
title: Rating
group: components
category: forms
order: 24
summary: Rating bintang berbasis radio dengan pratinjau hover, opsi menghapus, dan tampilan baca-saja untuk rata-rata pecahan seperti 4,3.
---

Rating mengumpulkan skor pada skala pendek, biasanya 1 sampai 5 bintang, atau menampilkan skor rata-rata. Gunakan input untuk umpan balik cepat yang subjektif (percakapan dukungan, pengiriman). Gunakan tampilan baca-saja untuk rata-rata di samping produk, pemasok, atau dokumen. Untuk skor numerik yang presisi, gunakan [slider](./slider.md) atau [number input](./number-input.md); untuk pertanyaan "seberapa mungkin" dengan titik berlabel, gunakan [radio group](./radio-group.md).

## Contoh

### Input

Setiap bintang adalah `label.ds-rating__star` yang membungkus radio dengan nama tersembunyi secara visual ("3 bintang"). Radio berbagi satu `name` dan mengirim angka yang dipilih. Mengarahkan pointer ke bintang menampilkan pratinjau skor; skor yang tersimpan tetap berwarna primary.

```html preview title="Input rating"
<fieldset class="ds-rating">
  <legend>Bagaimana sesi orientasi bersama Mei Tanaka?</legend>
  <div class="ds-rating__row">
    <div class="ds-rating__stars">
      <label class="ds-rating__star"><input type="radio" name="SessionScore" value="1"><span class="ds-visually-hidden">1 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="SessionScore" value="2"><span class="ds-visually-hidden">2 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="SessionScore" value="3"><span class="ds-visually-hidden">3 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="SessionScore" value="4" checked><span class="ds-visually-hidden">4 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="SessionScore" value="5"><span class="ds-visually-hidden">5 bintang</span></label>
    </div>
    <span class="ds-rating__value" aria-hidden="true">4</span>
  </div>
</fieldset>
```

### Dapat dihapus

`data-ds-rating-clearable` menambahkan tombol Hapus (tampil hanya saat skor terisi) dan menghapus skor ketika bintang yang dipilih diklik lagi. Rating yang dihapus tidak mengirim apa pun; ikat ke `int?`.

```html preview title="Dapat dihapus"
<fieldset class="ds-rating" data-ds-rating-clearable>
  <legend>Beri rating pemasok PRJ-1024</legend>
  <div class="ds-rating__row">
    <div class="ds-rating__stars">
      <label class="ds-rating__star"><input type="radio" name="SupplierScore" value="1"><span class="ds-visually-hidden">1 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="SupplierScore" value="2"><span class="ds-visually-hidden">2 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="SupplierScore" value="3" checked><span class="ds-visually-hidden">3 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="SupplierScore" value="4"><span class="ds-visually-hidden">4 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="SupplierScore" value="5"><span class="ds-visually-hidden">5 bintang</span></label>
    </div>
  </div>
</fieldset>
```

### Tampilan baca-saja dengan nilai pecahan

`span.ds-rating-display` mengisi bintang sesuai nilai tepat (4,3 dari 5 mengisi 86%). `data-ds-rating-value` menggerakkan fill lewat CSS `attr()` di tempat yang mendukung dan lewat ds.js di tempat lain. Taruh angka dan jumlah ulasan di sampingnya dalam `.ds-rating-summary`.

```html preview title="Rating rata-rata"
<div class="grid gap-3">
  <span class="ds-rating-summary">
    <span class="ds-rating-display" data-ds-rating-value="4.3" role="img" aria-label="Rating 4,3 dari 5"></span>
    <strong aria-hidden="true">4,3</strong><span>128 ulasan</span>
  </span>
  <span class="ds-rating-summary">
    <span class="ds-rating-display" data-ds-rating-value="3.65" role="img" aria-label="Rating 3,7 dari 5"></span>
    <strong aria-hidden="true">3,7</strong><span>41 ulasan</span>
  </span>
  <span class="ds-rating-summary">
    <span class="ds-rating-display is-sm" data-ds-rating-value="5" role="img" aria-label="Rating 5 dari 5"></span>
    <strong aria-hidden="true">5,0</strong><span>1 ulasan</span>
  </span>
</div>
```

### Ukuran

```html preview title="Ukuran"
<div class="flex flex-wrap items-center gap-8">
  <span class="ds-rating-display is-sm" data-ds-rating-value="4" role="img" aria-label="Rating 4 dari 5"></span>
  <span class="ds-rating-display" data-ds-rating-value="4" role="img" aria-label="Rating 4 dari 5"></span>
  <span class="ds-rating-display is-lg" data-ds-rating-value="4" role="img" aria-label="Rating 4 dari 5"></span>
</div>
```

Input memakai modifier yang sama pada `.ds-rating`: `is-sm` (bintang 16px), bawaan 24px, `is-lg` (32px).

## State

```html preview title="State rating"
<div class="grid gap-6 sm:grid-cols-2">
  <fieldset class="ds-rating">
    <legend>Belum ada skor</legend>
    <div class="ds-rating__stars">
      <label class="ds-rating__star"><input type="radio" name="st-r1" value="1"><span class="ds-visually-hidden">1 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r1" value="2"><span class="ds-visually-hidden">2 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r1" value="3"><span class="ds-visually-hidden">3 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r1" value="4"><span class="ds-visually-hidden">4 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r1" value="5"><span class="ds-visually-hidden">5 bintang</span></label>
    </div>
  </fieldset>
  <fieldset class="ds-rating" disabled>
    <legend>Nonaktif (skor 2)</legend>
    <div class="ds-rating__stars">
      <label class="ds-rating__star"><input type="radio" name="st-r2" value="1"><span class="ds-visually-hidden">1 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r2" value="2" checked><span class="ds-visually-hidden">2 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r2" value="3"><span class="ds-visually-hidden">3 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r2" value="4"><span class="ds-visually-hidden">4 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r2" value="5"><span class="ds-visually-hidden">5 bintang</span></label>
    </div>
  </fieldset>
  <fieldset class="ds-rating" aria-invalid="true" aria-describedby="st-r3-err">
    <legend>Tidak valid (wajib)</legend>
    <div class="ds-rating__stars">
      <label class="ds-rating__star"><input type="radio" name="st-r3" value="1" required><span class="ds-visually-hidden">1 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r3" value="2" required><span class="ds-visually-hidden">2 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r3" value="3" required><span class="ds-visually-hidden">3 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r3" value="4" required><span class="ds-visually-hidden">4 bintang</span></label>
      <label class="ds-rating__star"><input type="radio" name="st-r3" value="5" required><span class="ds-visually-hidden">5 bintang</span></label>
    </div>
    <p id="st-r3-err" class="ds-field-error">Pilih skor dari 1 sampai 5.</p>
  </fieldset>
  <div>
    <p class="ds-label">Baca-saja, 2,5</p>
    <span class="ds-rating-display" data-ds-rating-value="2.5" role="img" aria-label="Rating 2,5 dari 5"></span>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Empty | tidak ada radio terpilih | Semua bintang berwarna netral mati (20% warna teks) |
| Hover preview | pointer di atas bintang n (`@media (hover: hover)`) | Bintang 1 sampai n dengan tint primary 60%, bintang n membesar menjadi 108% |
| Pressed | pointer ditekan pada bintang | Bintang mengecil menjadi 92% (120ms) |
| Selected | radio n `:checked` | Bintang 1 sampai n berwarna primary |
| Focus-visible | fokus keyboard pada radio | Ring 2px `--ds-focus` di sekitar bintang yang fokus |
| Cleared | tombol Hapus atau klik ulang bintang yang dipilih | Semua bintang mati, "Rating dihapus." diumumkan |
| Invalid | `aria-invalid="true"` pada fieldset | Bintang mati diberi tint galat, pesan di bawah |
| Disabled | `disabled` pada fieldset atau radio | `--ds-opacity-disabled`, `cursor: not-allowed`, tanpa pratinjau |
| Read-only | `.ds-rating-display` | Fill sampai pecahan tepat, tanpa interaksi |

## Anatomi

- `fieldset.ds-rating`: grup dengan `legend`; ds.js meningkatkan setiap `.ds-rating` (teks nilai, event perubahan); `data-ds-rating-clearable` menambahkan penghapusan.
- `.ds-rating__row`: bintang ditambah `.ds-rating__value` dan `.ds-rating__clear` opsional (dibuat otomatis).
- `.ds-rating__stars`: bintang berurutan 1 sampai n.
- `label.ds-rating__star`: satu bintang (digambar oleh `::before` dengan mask bintang) yang memuat radio transparan dan namanya yang tersembunyi.
- `.ds-rating-display`: bintang baca-saja; `.ds-rating-summary` menempatkan angka dan jumlah di sampingnya.

## Penggunaan

- Pakai 5 bintang. Pakai 3 atau 10 hanya bila skalanya dijelaskan di label.
- Ajukan satu pertanyaan per rating dan sebutkan apa yang dinilai ("sesi orientasi", bukan "ini").
- Tampilkan rata-rata dengan satu desimal dan jumlah penilaian ("4,3, 128 ulasan"); rata-rata dari kurang dari 3 penilaian menyesatkan.
- Jangan pakai bintang untuk skala persetujuan atau tingkat keparahan; pakai [radio group](./radio-group.md) berlabel.
- Jangan mewarnai bintang menurut skor (merah untuk 1, hijau untuk 5).

## Aksesibilitas

- Radio native di dalam `fieldset`: satu perhentian Tab, tombol panah mengubah skor, legend menamai grup, dan setiap bintang punya nama tersembunyi ("4 bintang").
- Radio transparan dan menutupi bintang, sehingga pointer dan keyboard menuju elemen yang sama; setiap bintang minimal 24×24px.
- Tampilan memakai `role="img"` dengan `aria-label` ("Rating 4,3 dari 5"); angka yang terlihat di sampingnya `aria-hidden` agar tidak dibacakan dua kali.
- Bintang tidak hanya mengandalkan warna: jumlah bintang terisi adalah informasinya, dan angka dicetak di samping tampilan.
- Forced colours: bintang terisi memakai `Highlight`, bintang kosong `GrayText`.

| Tombol | Aksi |
| --- | --- |
| Tab | Masuk ke rating (ke bintang terpilih, atau yang pertama) dan keluar darinya |
| Arrow Right / Arrow Up | Bintang berikutnya (skor lebih tinggi) |
| Arrow Left / Arrow Down | Bintang sebelumnya (skor lebih rendah) |
| Space | Memilih bintang yang fokus bila belum ada yang dipilih |

## Razor

```cshtml
<ds-rating asp-for="SessionScore" label="Bagaimana sesi orientasinya?" show-value />
<ds-rating asp-for="SupplierScore" label="Beri rating pemasok" clearable size="lg" />

<ds-rating-display value="@Model.Average" count="@Model.ReviewCount" />
<ds-rating-display value="4.3" show-value="false" size="sm" />
```

`<ds-rating>` menulis fieldset, legend, radio dengan nama yang dilokalkan, dan galat model. `<ds-rating-display>` menulis bintang dengan fill yang diatur inline, label yang dilokalkan, angka (culture saat ini, satu desimal), dan jumlahnya.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `.ds-rating` | Semuanya ditingkatkan: memperbarui `.ds-rating__value`; memicu `ds:rating:change` `{ value }` (`null` saat dihapus) |
| `data-ds-rating-clearable` | Menambahkan tombol Hapus; klik ulang bintang yang dipilih menghapusnya |
| `.ds-rating-display[data-ds-rating-value]` | Mengatur fill (`--ds-rating-value`, `--ds-rating-max`) dan `aria-label` bila belum ada |
| `data-ds-rating-max` | Skala tampilan (bawaan 5) |

## Token

`--color-primary`, `--color-base-content`, `--color-base-100`, `--color-error`, `--ds-focus`, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-duration-instant`, `--ds-radius-sm`. Variabel komponen: `--ds-rating-size`, `--ds-rating-on`, `--ds-rating-preview`, `--ds-rating-off`; atur `--ds-rating-on: var(--color-warning)` pada container untuk bintang amber.

## Native dan daisyUI

daisyUI `.rating` memberi mask pada input radio itu sendiri, yang juga memotong focus ring dan tidak punya pratinjau hover. DS membangun `.ds-rating` sendiri di atas radio di dalam label agar ring tetap terlihat, lalu menambahkan pratinjau, penghapusan, dan tampilan pecahan. daisyUI `.rating` dengan `.mask-star-2` tetap berfungsi bila dipakai langsung.
