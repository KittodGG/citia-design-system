---
title: Chip
group: components
category: data-display
order: 5
summary: Elemen interaktif ringkas untuk memfilter, memasukkan nilai, menyarankan aksi atau pintasan, dengan chip set yang memindahkan fokus lewat tombol panah.
source: TPS app.css .pt-chip L3515–3524
---

Chip adalah kontrol kecil. Empat jenis: **filter** (menyala dan mati), **input** (nilai yang dimasukkan pengguna, bisa dihapus), **assist** (memulai aksi atau menampilkan konteks), dan **suggestion** (menawarkan nilai untuk dicoba). Chip bersifat interaktif; untuk label pasif pakai [tag](./tag.md), untuk satu keadaan pakai [status](./status.md). Untuk pilihan eksklusif di antara 2 sampai 5 opsi, segmented control lebih jelas.

## Contoh

```html preview title="Chip filter dengan hitungan (banyak)"
<div class="ds-chips" role="group" aria-label="Filter faktur" data-ds-chips>
  <button type="button" class="ds-chip" aria-pressed="true" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Semua</span><span class="ds-chip__count">128</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Jatuh tempo</span><span class="ds-chip__count">12</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Lunas</span><span class="ds-chip__count">96</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Draf</span><span class="ds-chip__count">20</span></button>
</div>
```

```html preview title="Pilihan tunggal"
<div class="ds-chips" role="group" aria-label="Periode" data-ds-chips="single">
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">7 hari</span></button>
  <button type="button" class="ds-chip" aria-pressed="true" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">30 hari</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Kuartal</span></button>
</div>
```

```html preview title="Chip input (Backspace atau Delete menghapus)"
<div class="ds-chips" role="group" aria-label="Penerima" data-ds-chips>
  <span class="ds-chip is-input" tabindex="0"><span class="ds-chip__label">ayu.lestari@example.com</span><button type="button" class="ds-chip__remove" tabindex="-1" data-ds-chip-remove aria-label="Hapus ayu.lestari@example.com"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></span>
  <span class="ds-chip is-input" tabindex="-1"><span class="ds-chip__label">daniel@example.com</span><button type="button" class="ds-chip__remove" tabindex="-1" data-ds-chip-remove aria-label="Hapus daniel@example.com"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></span>
  <span class="ds-chip is-input is-error" tabindex="-1"><span class="ds-chip__label">mei.tanaka@</span><button type="button" class="ds-chip__remove" tabindex="-1" data-ds-chip-remove aria-label="Hapus mei.tanaka@"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></span>
</div>
```

```html preview title="Chip assist dan suggestion"
<div class="ds-chips" role="group" aria-label="Aksi cepat" data-ds-chips>
  <button type="button" class="ds-chip is-assist"><svg class="ds-icon ds-chip__icon" aria-hidden="true"><use href="#ds-icon-calendar"></use></svg><span class="ds-chip__label">Tambah ke kalender</span></button>
  <a class="ds-chip is-assist" href="#peta"><svg class="ds-icon ds-chip__icon" aria-hidden="true"><use href="#ds-icon-map-pin"></use></svg><span class="ds-chip__label">Petunjuk arah</span></a>
  <button type="button" class="ds-chip is-suggestion"><svg class="ds-icon ds-chip__icon" aria-hidden="true"><use href="#ds-icon-sparkles"></use></svg><span class="ds-chip__label">Faktur jatuh tempo minggu ini</span></button>
  <button type="button" class="ds-chip is-suggestion"><span class="ds-chip__label">Belum dibayar lebih dari 30 hari</span></button>
</div>
```

```html preview title="Overflow: +N lagi"
<div class="ds-chips" role="group" aria-label="Departemen" data-ds-chips data-ds-chips-max="3">
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Keuangan</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Operasional</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Hukum</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">Pengadaan</span></button>
  <button type="button" class="ds-chip" aria-pressed="false" data-ds-chip-toggle><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><span class="ds-chip__label">SDM dan budaya</span></button>
</div>
```

## State

```html preview title="Nonaktif, aria-disabled, terpilih, error, ukuran"
<div class="ds-chips">
  <button type="button" class="ds-chip" disabled>Nonaktif</button>
  <button type="button" class="ds-chip" aria-disabled="true" title="Tersedia di paket Pro">aria-disabled</button>
  <button type="button" class="ds-chip" aria-pressed="true"><span class="ds-chip__check"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span>Terpilih</button>
  <span class="ds-chip is-input is-error">Nilai tidak valid</span>
  <button type="button" class="ds-chip is-sm">Kecil</button>
  <button type="button" class="ds-chip is-lg">Besar</button>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Garis `--ds-control-border`, isi base-100 |
| Hover | Pointer | Lapisan state 6% (`--ds-opacity-state-hover`) |
| Focus-visible | Keyboard | Cincin `--ds-focus` 2px, offset 2px |
| Pressed | `:active` | Lapisan 10% dan skala `--ds-press-scale` saat pointer turun |
| Terpilih | `aria-pressed="true"`, `aria-current`, `aria-selected` | Isi primary 12%, garis dan teks primary, glyph centang masuk (160 ms) |
| Disabled | `disabled` | `--ds-opacity-disabled`, tanpa hover atau press |
| aria-disabled | `aria-disabled="true"` | Tampilan sama, tetap bisa difokus; jelaskan alasannya di `title` atau teks bantuan |
| Error | `.is-error` | Garis error, isi error 8%, teks error |
| Overflow | Label panjang | Dipotong pada lebar kontainer; teks penuh di `title` |
| Reduced motion | `prefers-reduced-motion` | Tanpa skala tekan dan geser; glyph cross-fade |

## Anatomi

- Set `.ds-chips` (`is-nowrap` menggulir satu baris); `.ds-chip` dengan `is-assist|suggestion|input`, `is-error`, `is-sm|lg`, `is-more`.
- `.ds-chip__check` (glyph filter), `.ds-chip__icon`, `.ds-chip__label`, `.ds-chip__count`, `.ds-chip__remove`.

## Penggunaan

- Jaga chip filter 3 sampai 8 per set; di atas 5 pakai `data-ds-chips-max`.
- Label 1 sampai 3 kata. Taruh hitungan di `.ds-chip__count`, bukan di label.
- Chip filter harus mengubah sesuatu yang terlihat (daftar). Bila berpindah halaman, pakai link dengan `aria-current`.
- Pakai chip input untuk nilai yang diketik atau dipilih pengguna, masing-masing bisa dihapus; tampilkan validasi dengan `is-error` dan pesan di dekatnya.
- Jangan menaruh chip di dalam chip atau memakai chip sebagai aksi utama; pakai [button](./button.md).

## Aksesibilitas

- Chip filter adalah `button` dengan `aria-pressed`; keadaan terpilih adalah glyph centang plus isi, tidak pernah warna saja.
- Kelompokkan chip dalam `role="group"` dengan `aria-label`. Roving tabindex: satu perhentian Tab per set.
- Chip input bisa difokus (`tabindex`) dan dihapus dengan Backspace atau Delete; tombol hapus juga `button` bernama ("Hapus ayu.lestari@example.com"), tidak masuk urutan Tab.
- Penghapusan diumumkan secara sopan ("ayu.lestari@example.com dihapus") dan fokus pindah ke chip berikutnya.
- Tinggi 32px (24px kecil) pada pointer halus dan 44px pada pointer kasar.

| Tombol | Aksi |
| --- | --- |
| Tab | Masuk dan keluar dari chip set (satu perhentian) |
| Panah kanan, kiri | Chip berikutnya, sebelumnya (terbalik di RTL) |
| Home, End | Chip pertama, terakhir |
| Space, Enter | Mengalihkan chip filter; mengaktifkan chip assist atau suggestion |
| Backspace, Delete | Menghapus chip input yang difokus |

## Razor

```cshtml
<ds-chip-set label="Filter faktur" mode="multiple" max="6">
    <ds-chip pressed count="128">Semua</ds-chip>
    <ds-chip count="12">Jatuh tempo</ds-chip>
    <ds-chip variant="Assist" icon="calendar">Tambah ke kalender</ds-chip>
    <ds-chip variant="Suggestion" href="/invoices?due=week">Jatuh tempo minggu ini</ds-chip>
    <ds-chip variant="Input" error>mei.tanaka@</ds-chip>
</ds-chip-set>
```

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-chips` | Chip set: roving focus; `single` membuat chip yang ditekan saling eksklusif |
| `data-ds-chips-max` | Melipat chip setelah N di balik chip "+N lagi" (`aria-expanded`) |
| `data-ds-chip-toggle` | Klik membalik `aria-pressed` |
| `data-ds-chip-remove` | Tombol menghapus chip-nya |

Event: `ds:chip:toggle` (`detail.pressed`), `ds:chip:remove` (bisa dibatalkan; `detail.label`), `ds:chips:expand`. API: `DS.chips.remove(chip)`. Untuk pekerjaan server (memfilter daftar) dengarkan `ds:chip:toggle` atau jadikan chip sebuah link.

## Token

`--ds-control-border`, `--color-primary`, `--ds-quiet`, `--ds-opacity-state-hover|pressed`, `--ds-press-scale`, `--ds-size-target`, `--ds-duration-instant|fast|quick`, `--ds-ease-emphasized`, `--ds-focus`.

## Native dan daisyUI

Memakai `button`, `a`, atau `span`. daisyUI tidak punya chip; `.btn` dan `.badge` yang terdekat. Class versi 1 `.ds-chip-count` dan pilihan lewat `aria-current` tetap berfungsi.
