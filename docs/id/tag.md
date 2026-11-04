---
title: Tag
group: components
category: data-display
order: 4
summary: Label kecil huruf kapital untuk kategori, paket, atau atribut, tonal atau outline, dengan ikon, tiga ukuran, dan bisa dihapus.
source: TPS app.css .pt-tag L3648–3650
---

Tag mengklasifikasi: "Trial", "Keuangan", "PRJ-1024". Ia tidak menggambarkan kemajuan (pakai [status](./status.md)), tidak menghitung (pakai [badge](./badge.md)), dan tidak ikut dalam pilihan (pakai [chip](./chip.md)). Tag yang bisa dihapus adalah elemen tampilan dengan tombol; bila orang menambah dan menghapus nilai di sebuah field, pakai input chip atau tags input.

## Contoh

```html preview title="Tone tonal"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <span class="ds-tag is-neutral">Keuangan</span>
  <span class="ds-tag is-primary">Paket Pro</span>
  <span class="ds-tag is-info">Trial</span>
  <span class="ds-tag is-success">Terverifikasi</span>
  <span class="ds-tag is-warning">Beta</span>
  <span class="ds-tag is-error">Usang</span>
  <span class="ds-tag is-self">Anda</span>
</div>
```

```html preview title="Outline, ukuran, dan huruf kalimat"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <span class="ds-tag is-neutral is-outline">Internal</span>
  <span class="ds-tag is-info is-outline">Trial</span>
  <span class="ds-tag is-error is-outline">Terblokir</span>
  <span class="ds-tag is-neutral is-sm">Kecil</span>
  <span class="ds-tag is-neutral">Sedang</span>
  <span class="ds-tag is-neutral is-lg">Besar</span>
  <span class="ds-tag is-neutral is-sentence">Perlu persetujuan</span>
</div>
```

```html preview title="Dengan ikon dan bisa dihapus"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <span class="ds-tag is-success"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg> Terverifikasi</span>
  <span class="ds-tag is-info"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-clock"></use></svg> Tenggat 14 Nov</span>
  <span class="ds-tag is-neutral">Keuangan <button type="button" class="ds-tag__remove" aria-label="Hapus Keuangan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></span>
  <span class="ds-tag is-primary is-outline">PRJ-1024 <button type="button" class="ds-tag__remove" aria-label="Hapus PRJ-1024"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></span>
</div>
```

## State

```html preview title="Link, nonaktif, dan teks panjang"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <a class="ds-tag is-info" href="#keuangan">Keuangan</a>
  <button type="button" class="ds-tag is-neutral">Filter Ops</button>
  <button type="button" class="ds-tag is-neutral" disabled>Arsip</button>
  <span class="ds-tag is-neutral" style="max-inline-size:9rem"><span class="ds-tag__label">Persiapan audit kuartalan</span></span>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Tint tone 8 sampai 11%, teks tone, huruf kapital dengan tracking 0,06em |
| Outline | `.is-outline` | Isi transparan, garis tone 38% |
| Hover | Pointer di atas tag link atau button | Tint naik ke 16% |
| Focus-visible | Fokus keyboard pada link, button, atau tombol hapus | Cincin `--ds-focus` 2px |
| Pressed | `:active` pada tombol hapus | Lapisan 22% pada tombol |
| Disabled | `disabled` atau `aria-disabled="true"` | `--ds-opacity-disabled`, `cursor: not-allowed` |
| Overflow | Teks panjang | `.ds-tag__label` dipotong dengan elipsis; isi `title` |
| Menghapus | Handler Anda menghapus elemen | Hapus elemen dan pindahkan fokus ke tag berikutnya atau kontainer |

## Anatomi

- `.ds-tag` dengan `is-neutral|primary|info|success|warning|error`, `is-outline`, `is-sm|lg`, `is-sentence`, `is-self`.
- `.ds-icon` opsional (12px) di awal, `.ds-tag__label`, tombol `.ds-tag__remove` (18px, area sentuh 24px, 44px di layar sentuh).

## Penggunaan

- Jaga teks 1 sampai 2 kata, paling banyak 24 karakter. Gaya huruf kapital terasa keras pada teks panjang; pakai `is-sentence` untuk label yang lebih panjang.
- Jangan mengandalkan tone untuk mengategorikan. Kata adalah kategorinya; warna opsional.
- Tampilkan paling banyak 3 tag per baris tabel, lalu tag `+N`.
- Tag yang bisa dihapus memerlukan nama aksesibel untuk hapus ("Hapus Keuangan") dan handler aplikasi; DS hanya menggambarnya.
- Pakai `is-self` hanya untuk pengguna yang sedang masuk.

## Aksesibilitas

- Teks tag adalah teks biasa. Kontras minimal 4,5:1 pada tint (token teks tone).
- Tombol hapus adalah `button` asli dengan `aria-label` yang memuat teks tag.
- Tag yang berupa link atau button setinggi minimal 24px dan tombol hapus punya area sentuh 44px pada pointer kasar.

| Tombol | Aksi |
| --- | --- |
| Tab | Pindah ke tag link, tag button, atau tombol hapus |
| Enter, Space | Mengaktifkan tag button atau tombol hapus (Enter untuk link) |

## Razor

`ds-tag` dan `ds-pill` ada di `DsTagHelpers.cs`:

```cshtml
<ds-tag tone="Info">Trial</ds-tag>
<ds-tag tone="Success"><ds-icon name="check" />Terverifikasi</ds-tag>
```

Varian outline, ukuran, dan bisa dihapus ditulis dengan class di atas sampai `ds-tag` mendapat atribut `outline` dan `size`.

## Token

`--ds-tone`, `--ds-tone-text`, `--ds-radius-md`, `--ds-radius-full`, `--ds-focus`, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-ease-standard`.

## Native dan daisyUI

`span`, `a`, atau `button` biasa. Ia menggantikan daisyUI `badge` untuk label; daisyUI `badge` tetap ada untuk markup lama. Terkait: [chip](./chip.md) untuk chip yang bisa dipilih dan dihapus di dalam field.
