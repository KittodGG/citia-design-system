---
title: Textarea
group: components
category: forms
order: 4
summary: Teks beberapa baris dengan auto-grow, aturan ubah ukuran, dan penghitung karakter yang mengumumkan batas secara polite.
source: TPS app.css L1696-1975
---

Textarea menampung teks bebas lebih dari satu baris: catatan, deskripsi, pesan. Gunakan [input](./input.md) untuk satu baris. Jangan dipakai untuk teks berformat.

## Contoh

### Bawaan dan auto-grow

Textarea bawaan dapat diubah ukurannya secara vertikal. Auto-grow (`data-ds-autogrow`) mengikuti teks dengan `field-sizing: content`, hingga 20rem, dan memakai skrip cadangan di browser yang belum mendukungnya.

```html preview title="Tetap dan auto-grow"
<div class="ds-form" style="max-width:30rem">
  <div class="ds-field">
    <label for="ta-1">Deskripsi</label>
    <textarea id="ta-1" class="textarea" rows="3" placeholder="Apa yang berubah di rilis ini?"></textarea>
  </div>
  <div class="ds-field">
    <label for="ta-2">Catatan rapat</label>
    <textarea id="ta-2" class="textarea" data-ds-autogrow>Anggaran PRJ-1024 disetujui.
Daniel memastikan syarat vendor paling lambat Jumat.
Mei menjadwalkan tinjauan.</textarea>
  </div>
</div>
```

### Penghitung

Dengan `maxlength`, penghitung berwarna ambar saat sisa 10%, merah saat batas. Setelah mengetik berhenti 800ms, region live polite menyebut sisa karakter. Di atas batas lunak (`data-ds-max`, tanpa `maxlength`) penghitung menunjukkan "melebihi".

```html preview title="Penghitung dengan batas"
<div class="ds-form" style="max-width:30rem">
  <div class="ds-field">
    <label for="ta-3">Pesan untuk pelanggan</label>
    <textarea id="ta-3" class="textarea" rows="3" maxlength="140" data-ds-counter aria-describedby="ta-3-h">Faktur INV-2026-0418 dikirim pada 4 Maret. Pembayaran jatuh tempo dalam 14 hari.</textarea>
    <div class="ds-field__meta"><p class="ds-hint" id="ta-3-h">Tampil di isi email.</p><span class="ds-counter">0 / 140</span></div>
  </div>
  <div class="ds-field">
    <label for="ta-4">Ringkasan</label>
    <textarea id="ta-4" class="textarea" rows="2" data-ds-max="40" data-ds-counter>Ringkasan ini sengaja lebih panjang dari empat puluh karakter.</textarea>
    <div class="ds-field__meta"><p class="ds-hint">Batas lunak: Anda tetap bisa mengetik.</p><span class="ds-counter">0 / 40</span></div>
  </div>
</div>
```

## State

```html preview title="State textarea"
<div class="ds-field-grid">
  <div class="ds-field"><label for="tas-1">Placeholder</label><textarea id="tas-1" class="textarea" rows="2" placeholder="Tambah catatan"></textarea></div>
  <div class="ds-field"><label for="tas-2">Terisi</label><textarea id="tas-2" class="textarea" rows="2">Disetujui oleh Sofia Marquez.</textarea></div>
  <div class="ds-field"><label for="tas-3">Nonaktif</label><textarea id="tas-3" class="textarea" rows="2" disabled>Proyek ditutup</textarea></div>
  <div class="ds-field"><label for="tas-4">Hanya baca</label><textarea id="tas-4" class="textarea" rows="2" readonly>Diimpor dari PRJ-1024.</textarea></div>
  <div class="ds-field"><label for="tas-5">Tidak valid</label><textarea id="tas-5" class="textarea" rows="2" aria-invalid="true" aria-describedby="tas-5-e"></textarea><p class="ds-field-error" id="tas-5-e">Jelaskan alasannya minimal 10 karakter.</p></div>
  <div class="ds-field"><label for="tas-6">Valid</label><textarea id="tas-6" class="textarea" rows="2" data-state="success">Sudah sesuai.</textarea></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest, hover | Bawaan, pointer di atas | Logika border sama dengan [input](./input.md) |
| Focus | `:focus` | Ring 2px, offset 2px |
| Filled, placeholder | Ada nilai atau kosong | Teks isi; placeholder `--ds-subtle` |
| Disabled | `disabled` | Opasitas 55%, `base-200`, `not-allowed` |
| Read-only | `readonly` | `base-200`, border tipis, dapat diseleksi |
| Invalid | `aria-invalid`, `:user-invalid` | Border galat; pesan di bawah |
| Success | `data-state="success"` | Border sukses |
| Penghitung warn, limit, over | `data-state` pada `.ds-counter` | Teks ambar, teks merah, teks merah dengan selisih lebih |
| Autofill | `:autofill` | Permukaan tema tetap |

## Anatomi

- `textarea.textarea`: kontrol native; `rows` menentukan minimum (3 baris saat auto-grow; ubah dengan `--ds-rows`).
- `.is-autogrow` atau `[data-ds-autogrow]`: tumbuh sesuai isi, gagang ubah ukuran dihilangkan.
- `.is-fixed`, `.is-resize-x`, `.is-resize-both`: aturan ubah ukuran (bawaan hanya vertikal).
- `.ds-counter` di `.ds-field__meta`; saudara `role="status"` tersembunyi ditambahkan oleh skrip.

## Penggunaan

- Ubah ukuran hanya vertikal. Ubah ukuran horizontal merusak kolom; pakai `is-resize-both` hanya di alat berkanvas bebas.
- Pakai auto-grow di form dengan footer lengket; batasi tinggi (`--ds-textarea-max`, bawaan 20rem) agar footer tetap terjangkau.
- Pakai `maxlength` untuk batas keras (SMS, kolom basis data). Pakai `data-ds-max` untuk anjuran.
- Tampilkan penghitung hanya bila batas penting; penghitung di setiap field hanya menambah bising.
- Jangan memangkas spasi saat orang mengetik. Pangkas di server.

## Aksesibilitas

- Teks penghitung `aria-hidden`; region live polite mengumumkan "Sisa 14 karakter" setelah pengetikan berhenti, ketika sisa 10% atau kurang (minimum 10), dan "Batas karakter tercapai" pada batas.
- Pengumuman ditunda 800ms agar pembaca layar tidak terpotong di setiap ketukan.
- Gagang ubah ukuran bersifat native; auto-grow menghilangkan kebutuhan mengubah ukuran.
- Reduced motion: tidak ada animasi tinggi di kedua mode.

| Tombol | Aksi |
| --- | --- |
| Tab | Keluar dari field (Tab bukan karakter) |
| Enter | Baris baru |
| Ctrl + Enter | Ditentukan aplikasi; tambahkan handler sendiri bila form dikirim dengannya |

## Razor

```cshtml
<ds-field asp-for="Notes" type="textarea" rows="4" autogrow counter maxlength="500" hint="Teks biasa." />
```

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-autogrow` | Skrip cadangan di browser tanpa `field-sizing` |
| `data-ds-counter` | Mengaktifkan penghitung; nilai opsional berupa selector (`#id`), bawaannya `.ds-counter` di field |
| `data-ds-max` | Batas lunak bila tidak ada `maxlength` |

Teks penghitung memakai `DS.t("inputs.count")`. Event: `input`, `change` standar.

## Token

`--ds-subtle`, `--ds-warning-text`, `--ds-error-text`, `--ds-control-border`, `--ds-focus`, `--ds-type-footnote-*`, `--ds-duration-fast`.

## Native dan daisyUI

Dibangun di atas `textarea.textarea`. DS menetapkan line height 1,5, menambah auto-grow `field-sizing: content`, satu aturan ubah ukuran, dan state bersama; tinggi minimum 5rem milik daisyUI diganti minimum berbasis baris untuk auto-grow.
