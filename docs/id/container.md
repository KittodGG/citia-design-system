---
title: Container
group: components
category: layout
order: 3
summary: Kolom di tengah dengan lebar maksimum (sm sampai xl, prose, full) dan padding samping yang responsif.
---

Container membatasi lebar konten dan menempatkannya di tengah, sehingga baris tetap nyaman dibaca dan halaman tampak sama di laptop maupun monitor lebar. Pakai untuk halaman pemasaran, dokumen, dan halaman di luar [App shell](./app-shell.md); di dalam shell, atur lebar pada `.ds-main`. Untuk menata item di dalam container pakai [Stack and grid](./stack-grid.md).

## Examples

```html preview title="Lebar"
<div class="ds-stack">
  <div class="ds-container is-sm"><div class="ds-surface" style="padding: 0.75rem">sm: 40rem</div></div>
  <div class="ds-container is-md"><div class="ds-surface" style="padding: 0.75rem">md: 48rem</div></div>
  <div class="ds-container is-lg"><div class="ds-surface" style="padding: 0.75rem">lg: 64rem</div></div>
  <div class="ds-container is-prose"><div class="ds-surface" style="padding: 0.75rem">prose: 65ch, untuk teks panjang</div></div>
</div>
```

| Class | Lebar maksimum | Padding samping |
| --- | --- | --- |
| `.is-sm` | 40rem | 16px, 24px mulai 640px, 32px mulai 1024px |
| `.is-md` | 48rem | sama |
| `.is-lg` | 64rem | sama |
| `.is-xl` (bawaan) | 80rem | sama |
| `.is-prose` | 65ch | sama |
| `.is-full` | tanpa batas | sama |
| `.is-flush` | tidak berubah | 0 |

## States

Container tidak punya state interaktif. Perilaku responsifnya adalah state yang penting.

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Viewport lebar | Lebih lebar dari lebar maksimum | Di tengah; ruang kosong di kedua sisi |
| Viewport sempit | Lebih sempit dari lebar maksimum | Lebar penuh dikurangi padding |
| 320px dan zoom 200% | Lebar terkecil | Padding 16px, tanpa gulir horizontal |
| Kanan-ke-kiri | `dir="rtl"` | Padding logis; hasil sama dalam cermin |
| Flush | `.is-flush` | Tanpa padding samping, untuk anak yang harus mencapai tepi |

## Anatomy

- `.ds-container`: bloknya. Variabel `--ds-container-max` dan `--ds-container-pad`.

## Usage

- Pakai `.is-prose` untuk teks dan `.is-lg` atau `.is-xl` untuk halaman berkolom.
- Sarangkan paling banyak satu container; sarangkan primitif ([Stack and grid](./stack-grid.md)) saja.
- Pakai `.is-flush` untuk hero atau gambar yang harus mencapai tepi, dan taruh teksnya di container biasa.
- Jangan memberi lebar piksel tetap pada wadah teks; teks Indonesia sekitar 30% lebih panjang.

## Accessibility

Container adalah `div` biasa tanpa role. Jaga urutan baca sama dengan urutan visual. Pada zoom 200% padding menjaga teks dari tepi, dan reflow (WCAG 1.4.10) bertahan hingga 320px.

## Razor

```cshtml
<ds-container size="lg">
    <h1>Harga</h1>
</ds-container>
<ds-container size="prose" flush>...</ds-container>
```

Atribut: `size` (`sm`, `md`, `lg`, `xl`, `prose`, `full`), `flush`.

## Tokens

`--ds-size-measure` (65ch), `--ds-space-*` lewat nilai padding, `--ds-container-max`, `--ds-container-pad` (lokal).

## Native and daisyUI

`div` biasa. Utility `container` Tailwind memakai breakpoint tetap; container ini berskala menurut lebar maksimum dan memakai padding logis.
