---
title: Resizable
group: components
category: layout
order: 7
summary: Panel yang dipisahkan handle yang bisa diseret dan dioperasikan keyboard, dengan ukuran minimum dan maksimum, ciut saat klik ganda, dan ukuran yang bisa disimpan.
---

Grup resizable membiarkan orang menentukan seberapa luas tiap panel: daftar berkas di samping pratinjau, editor kode di atas konsol. Pakai bila pembagian yang tepat bergantung pada tugas. Bila pembagian tetap, pakai [Split layout](./stack-grid.md); untuk panel yang terbuka di atas halaman pakai [Sheet](./sheet.md).

## Examples

### Split horizontal

Seret handle, fokuskan lalu tekan tombol panah, atau klik ganda untuk menciutkan panel kiri.

```html preview title="Dua panel"
<div class="ds-resizable" data-ds-resizable style="--ds-resizable-height: 14rem">
  <div class="ds-resizable__panel" style="--ds-panel-size: 30" data-min="20" data-max="60" data-collapsible>
    <ul class="ds-stack is-gap-xs" style="padding: 0.75rem; list-style: none; margin: 0"><li>Faktur</li><li>Proyek</li><li>Anggota</li></ul>
  </div>
  <div class="ds-resizable__handle" role="separator" tabindex="0" aria-label="Ubah ukuran daftar"></div>
  <div class="ds-resizable__panel" style="--ds-panel-size: 70"><div style="padding: 0.75rem">INV-2026-0418, terbit 2 Nov 2026 untuk Northwind, 1.240,00 jatuh tempo 30 Nov 2026.</div></div>
</div>
```

### Tiga panel, vertikal bersarang

```html preview title="Tata letak editor"
<div class="ds-resizable" data-ds-resizable data-ds-resizable-id="docs-editor-id" style="--ds-resizable-height: 18rem">
  <div class="ds-resizable__panel" style="--ds-panel-size: 20" data-min="15" data-collapsible><div style="padding: 0.75rem">Berkas</div></div>
  <div class="ds-resizable__handle" role="separator" tabindex="0" aria-label="Ubah ukuran berkas"></div>
  <div class="ds-resizable__panel" style="--ds-panel-size: 80">
    <div class="ds-resizable is-vertical is-bare" data-ds-resizable style="--ds-resizable-height: 100%">
      <div class="ds-resizable__panel" style="--ds-panel-size: 65" data-min="30"><div style="padding: 0.75rem">Editor</div></div>
      <div class="ds-resizable__handle" role="separator" tabindex="0" aria-label="Ubah ukuran konsol"></div>
      <div class="ds-resizable__panel" style="--ds-panel-size: 35" data-min="15" data-collapsible><div style="padding: 0.75rem">Konsol</div></div>
    </div>
  </div>
</div>
```

## States

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak ada | Garis tipis 1px `--color-base-300` |
| Hover | Pointer di atas handle (perangkat hover) | Garis bernuansa primary; grip 4×32px muncul |
| Focus-visible | Fokus keyboard | Garis dan grip berwarna `--ds-focus` |
| Dragging | `data-dragging` pada handle dan grup | Garis dan grip primary; seleksi teks mati; panel mengikuti pointer tanpa easing |
| Di minimum atau maksimum | Ukuran mencapai `data-min` atau `data-max` | Berhenti; `aria-valuenow` sama dengan `aria-valuemin` atau `aria-valuemax` |
| Diciutkan | Klik ganda atau Enter pada panel collapsible | Panel mengecil ke 0 dalam 500ms (spring, tanpa overshoot); `aria-expanded="false"` pada handle |
| Dipulihkan | Klik ganda atau Enter lagi | Kembali ke ukuran sebelumnya |
| Disabled | `aria-disabled="true"` | Opacity 0,55, `not-allowed`, tanpa respons pointer atau tombol |
| Vertikal | `.is-vertical` | Panel bertumpuk; handle horizontal dengan `row-resize` |
| Sentuh | `(pointer: coarse)` | Area sentuh selebar 44px |

## Anatomy

- `.ds-resizable[data-ds-resizable]`: grupnya. `.is-vertical`, `.is-bare` (tanpa bingkai). Tinggi dari `--ds-resizable-height`.
- `.ds-resizable__panel`: panel. Ukuran dalam persen sebagai `--ds-panel-size`; `data-min`, `data-max` (persen, bawaan 10 dan 100), `data-collapsible`.
- `.ds-resizable__handle`: `role="separator"` di antara dua panel, bisa difokus.

## Usage

- Tetapkan batas wajar: `data-min` 15 sampai 25 mencegah panel menjadi tak terpakai; izinkan ciut hanya untuk panel sekunder.
- Pertahankan 2 atau 3 panel per sumbu. Untuk lebih, pakai grup bersarang.
- Beri nama handle sesuai yang diubah ukurannya ("Ubah ukuran berkas").
- Simpan ukuran dengan `data-ds-resizable-id` bila tata letak adalah ruang kerja yang dikunjungi kembali.
- Jangan memakai grup resizable pada tata letak selebar ponsel; tumpuk panel atau pakai [Sheet](./sheet.md).

## Accessibility

- Handle adalah window splitter: `role="separator"`, `tabindex="0"`, `aria-orientation` (vertical untuk panel berdampingan), `aria-valuenow`, `aria-valuemin`, `aria-valuemax` (persen panel pertama) dan `aria-controls` yang menunjuk panel itu. `aria-valuetext` terbaca "30%" atau "diciutkan".
- Handle collapsible menampilkan `aria-expanded`.
- Pointer capture menjaga seretan tetap bekerja saat pointer keluar dari handle; Escape tidak diperlukan karena seretan berakhir saat dilepas.
- Reduced motion: ciut dan pulih langsung ke ukuran baru tanpa easing.
- Forced colours: handle memakai `CanvasText` dan `Highlight`.

| Tombol | Aksi |
| --- | --- |
| Tab | Memfokuskan handle |
| Kanan, Kiri (berdampingan); Bawah, Atas (bertumpuk) | Memperbesar, memperkecil panel pertama 5% (10% dengan Shift); dicerminkan pada kanan-ke-kiri |
| Home | Ukuran terkecil panel pertama |
| End | Ukuran terbesar |
| Enter | Menciutkan atau memulihkan panel collapsible |

## Razor

```cshtml
<ds-resizable persist="workspace" height="20rem">
    <ds-resizable-panel size="30" min="20" max="60" collapsible>...</ds-resizable-panel>
    <ds-resizable-handle label="Ubah ukuran daftar" />
    <ds-resizable-panel size="70">...</ds-resizable-panel>
</ds-resizable>
```

Atribut: `ds-resizable` menerima `orientation` (`horizontal`, `vertical`), `persist`, `height`, `step`, `bare`; `ds-resizable-panel` menerima `size`, `min`, `max`, `collapsible`; `ds-resizable-handle` menerima `label`.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-resizable` | Menjadikan grup resizable |
| `data-ds-resizable-id="name"` | Menyimpan ukuran di `localStorage` (`<prefix>-resizable-name`) |
| `data-step="5"` | Langkah keyboard dalam persen |
| `data-min`, `data-max`, `data-collapsible` | Pada panel: batas dan ciut |

API: `DS.resizable.setSizes(element, [30, 70])`. Event: `ds:resizable:resize` (`detail.sizes`) dan `ds:resizable:collapse` (`detail.index`, `detail.collapsed`). String: `resizable.handle`, `resizable.size`, `resizable.collapsed`.

## Tokens

`--color-base-300`, `--color-primary`, `--ds-focus`, `--ds-radius-box`, `--ds-duration-spring`, `--ds-ease-spring`, `--ds-duration-fast`, `--ds-opacity-disabled`.

## Native and daisyUI

Dibangun di atas flexbox (`flex-grow` membawa persentase), event pointer dengan pointer capture, dan role ARIA separator. daisyUI tidak punya padanan.
