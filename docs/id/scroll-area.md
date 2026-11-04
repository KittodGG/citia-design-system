---
title: Scroll area
group: components
category: layout
order: 6
summary: Wilayah gulir dengan scrollbar tipis bergaya dan bayangan atau pudar di tepi yang menunjukkan masih ada konten, vertikal, horizontal, atau keduanya.
---

Scroll area menampung konten yang lebih tinggi atau lebih lebar dari ruangnya dan memberi tahu pembaca bahwa masih ada lanjutan. Pakai untuk daftar, log, kode, dan strip lebar di dalam panel berukuran tetap. Untuk seluruh halaman biarkan window yang menggulir; untuk data tabel pakai [Table](./table.md) yang punya header sticky sendiri.

## Examples

### Vertikal

Bayangan tepi hanya muncul di sisi yang masih punya konten: gulir daftar untuk melihat bayangan atas masuk saat bayangan bawah hilang.

```html preview title="Scroll area vertikal"
<div class="ds-scroll-area" style="--ds-scroll-max-height: 14rem; border: 1px solid var(--color-base-300); border-radius: var(--ds-radius-box)">
  <div class="ds-scroll-area__viewport" tabindex="0" role="region" aria-label="Aktivitas terbaru">
    <ul class="ds-stack is-gap-0" style="padding: 0.5rem 1rem; list-style: none; margin: 0">
      <li style="padding: 0.5rem 0">Ayu Lestari menyetujui INV-2026-0418</li>
      <li style="padding: 0.5rem 0">Daniel Okafor membuka PRJ-1024</li>
      <li style="padding: 0.5rem 0">Mei Tanaka mengunggah 3 berkas</li>
      <li style="padding: 0.5rem 0">Sofia Marquez mengomentari INV-2026-0419</li>
      <li style="padding: 0.5rem 0">Ayu Lestari mengubah tenggat menjadi 30 Nov 2026</li>
      <li style="padding: 0.5rem 0">Daniel Okafor mengarsipkan PRJ-0987</li>
      <li style="padding: 0.5rem 0">Mei Tanaka mengundang 2 anggota</li>
      <li style="padding: 0.5rem 0">Sofia Marquez mengekspor laporan Q3</li>
    </ul>
  </div>
</div>
```

### Horizontal dan fade

`.is-horizontal` menggulir ke samping. `.is-fade` mengganti bayangan dengan mask lembut bila animasi berbasis gulir tersedia (bayangan tetap menjadi cadangan tanpa itu).

```html preview title="Scroll area horizontal"
<div class="ds-scroll-area is-horizontal">
  <div class="ds-scroll-area__viewport" tabindex="0" role="region" aria-label="Total per kuartal">
    <div class="ds-cluster is-nowrap is-gap-md" style="padding: 0.75rem 0.5rem">
      <div class="ds-surface" style="padding: 1rem; flex: none; width: 11rem">Q1 2026<br>48.200,00</div>
      <div class="ds-surface" style="padding: 1rem; flex: none; width: 11rem">Q2 2026<br>52.640,00</div>
      <div class="ds-surface" style="padding: 1rem; flex: none; width: 11rem">Q3 2026<br>61.075,50</div>
      <div class="ds-surface" style="padding: 1rem; flex: none; width: 11rem">Q4 2026<br>37.990,00</div>
      <div class="ds-surface" style="padding: 1rem; flex: none; width: 11rem">Q1 2027<br>0,00</div>
    </div>
  </div>
</div>
```

## States

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Di awal | Digulir ke atas atau awal | Bayangan hanya di sisi akhir |
| Di tengah | Digulir sebagian | Bayangan di kedua sisi |
| Di akhir | Digulir ke bawah atau akhir | Bayangan hanya di sisi awal |
| Muat | Konten lebih kecil dari area | Tanpa bayangan, tanpa scrollbar |
| Hover | Pointer di atas area (perangkat hover) | Thumb scrollbar menggelap dari 30% ke 48% |
| Focus-visible | Fokus keyboard pada viewport | Ring 2px `--ds-focus`, offset 2px |
| Menyeret thumb | Pointer ditekan pada thumb | Bawaan browser, thumb tetap terlihat |
| Scrollbar tersembunyi | `.is-hidden-scrollbar` | Scrollbar tidak digambar; gulir dan bayangan tetap bekerja |
| Dua sumbu | `.is-both` | Dua scrollbar; bayangan mati |

## Anatomy

- `.ds-scroll-area`: pembungkus. Variabel `--ds-scroll-bg` (permukaan di belakangnya) dan `--ds-scroll-shadow`.
- `.ds-scroll-area__viewport`: elemen yang menggulir. Atur tinggi dengan `--ds-scroll-max-height` atau tinggi tetap.
- Modifier: `.is-horizontal`, `.is-both`, `.is-fade`, `.is-plain` (tanpa efek tepi), `.is-hidden-scrollbar`.

## Usage

- Setel `--ds-scroll-bg` ke warna di belakang area bila bukan permukaan halaman (misalnya card), agar bayangan tepi menyatu.
- Beri area tinggi atau `max-height`; tanpa batas ia tidak menggulir.
- Tampilkan lebih dari satu item melewati tepi agar orang melihat bahwa ada lanjutan (bayangan membantu).
- Jangan menyarangkan scroll area pada arah yang sama; rantai gulir ditahan dengan `overscroll-behavior: contain`.

## Accessibility

- Wilayah yang bisa digulir harus terjangkau keyboard: beri viewport `tabindex="0"`, `role="region"`, dan nama aksesibel. Tombol panah, Page Up dan Down, Home dan End lalu menggulirnya.
- Bayangan adalah dekorasi; posisi gulir juga ditampilkan oleh scrollbar native.
- Scrollbar menjaga lebar sentuh minimal 10px; kontras thumb 3:1 terhadap track.
- Reduced motion: tidak ada yang beranimasi kecuali pudar berbasis gulir, yang mengikuti posisi gulir dan tidak berbasis waktu.

| Tombol | Aksi |
| --- | --- |
| Tab | Memindahkan fokus ke viewport |
| Atas, Bawah, Kiri, Kanan | Gulir satu baris |
| Page Up, Page Down | Gulir satu halaman |
| Home, End | Lompat ke awal, akhir |

## Tokens

`--color-base-100`, `--color-base-content` (dicampur ke bayangan), `--ds-radius-full`, `--ds-focus`, `--ds-border-focus`, `--ds-duration-base`.

## Native and daisyUI

Dibangun di atas `overflow: auto`, `scrollbar-width: thin`, `scrollbar-color`, dan lapisan background-attachment, sehingga bekerja tanpa JavaScript. daisyUI tidak punya scroll area; utility `overflow-*` Tailwind tetap berlaku.
