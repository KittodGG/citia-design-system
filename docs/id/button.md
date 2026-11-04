---
title: Button
group: components
category: actions
order: 1
summary: Button memulai sebuah aksi. Delapan varian, empat ukuran, ikon, lebar penuh, dan setiap state dari hover sampai loading dan berhasil.
source: TPS app.css L3044–3106
---

Button memulai aksi di tampilan yang sedang dibuka: simpan, kirim, ekspor, hapus. Pakai [link](./link.md) bila kontrol berpindah ke halaman lain, [icon button](./icon-button.md) bila label diganti ikon, [toggle](./toggle.md) bila kontrol menyalakan dan mematikan sesuatu, dan [split button](./split-button.md) bila satu aksi punya beberapa alternatif yang dekat.

## Contoh

### Varian

Satu button primary per area. Secondary adalah `.btn` bawaan.

```html preview title="Varian"
<div class="ds-actions is-start">
  <button type="button" class="btn btn-primary">Simpan perubahan</button>
  <button type="button" class="btn">Batal</button>
  <button type="button" class="btn btn-outline">Ekspor</button>
  <button type="button" class="btn btn-soft">Tambah catatan</button>
  <button type="button" class="btn btn-ghost">Ubah</button>
  <button type="button" class="btn btn-link">Lihat riwayat</button>
  <button type="button" class="btn btn-neutral">Terbitkan</button>
</div>
```

| Varian | Class | Dipakai untuk |
| --- | --- | --- |
| Primary | `btn btn-primary` | Satu aksi yang menjadi tujuan area itu: Simpan perubahan, Kirim faktur |
| Secondary | `btn` atau `btn btn-secondary` | Aksi nyata lainnya: Batal, Terapkan, Simpan draft |
| Outline | `btn btn-outline` | Aksi sekunder yang perlu tepi berwarna sesuai tone |
| Soft | `btn btn-soft` | Isian tonal untuk aksi pendukung di samping aksi primary |
| Ghost (tersier) | `btn btn-ghost` atau `btn-tertiary` | Aksi baris dan toolbar: Ubah, Pilihan |
| Link | `btn btn-link` | Aksi yang ditulis sebagai teks, rata seperti button |
| Neutral | `btn btn-neutral` | Aksi terisi berwarna tinta, bukan teal: Terbitkan, Lanjutkan |

### Destruktif

Merah terisi mengonfirmasi penghapusan di dalam dialog. Varian tenang memulai alurnya dari halaman atau baris.

```html preview title="Destruktif, terisi dan tenang"
<div class="ds-actions is-start">
  <button type="button" class="btn btn-error">Hapus faktur</button>
  <button type="button" class="btn btn-soft btn-error">Arsipkan proyek</button>
  <button type="button" class="btn btn-outline btn-error">Keluarkan anggota</button>
  <button type="button" class="btn btn-ghost is-danger">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>
    Hapus draft
  </button>
</div>
```

Tone lain mengikuti pola yang sama: `btn-success`, `btn-warning`, `btn-info`, `btn-accent`. Gabungkan tone dengan `btn-outline`, `btn-soft`, `btn-ghost`, atau `btn-link`.

```html preview title="Tone"
<div class="ds-actions is-start">
  <button type="button" class="btn btn-success">Setujui</button>
  <button type="button" class="btn btn-warning">Tinjau</button>
  <button type="button" class="btn btn-info">Detail</button>
  <button type="button" class="btn btn-soft btn-success">Disetujui</button>
  <button type="button" class="btn btn-soft btn-warning">Perlu ditinjau</button>
  <button type="button" class="btn btn-soft btn-info">Draft</button>
</div>
```

### Ukuran

Tinggi 28, 32, 40, dan 48px. Di layar sentuh setiap ukuran tetap punya area sentuh 44px.

```html preview title="xs, sm, md, lg"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="btn btn-primary btn-xs">Sangat kecil</button>
  <button type="button" class="btn btn-primary btn-sm">Kecil</button>
  <button type="button" class="btn btn-primary">Sedang</button>
  <button type="button" class="btn btn-primary btn-lg">Besar</button>
</div>
```

### Ikon

Ikon di depan berada sebelum label, ikon di belakang setelah label (beri `is-end`). Button hanya-ikon berbentuk persegi, wajib `aria-label`, dan lebih baik ditulis sebagai [icon button](./icon-button.md).

```html preview title="Ikon depan, belakang, dan hanya ikon"
<div class="ds-actions is-start">
  <button type="button" class="btn btn-primary">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>
    Kirim faktur
  </button>
  <button type="button" class="btn">
    Langkah berikutnya
    <svg class="ds-icon is-end" aria-hidden="true"><use href="#ds-icon-arrow-right"></use></svg>
  </button>
  <button type="button" class="btn btn-square" aria-label="Salin nomor faktur">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg>
  </button>
</div>
```

### Lebar penuh

`btn-block` memenuhi baris. Pakai di form pada layar sempit dan di panel masuk.

```html preview title="Lebar penuh"
<div style="max-width:22rem;display:grid;gap:.5rem">
  <button type="button" class="btn btn-primary btn-block">Lanjutkan</button>
  <button type="button" class="btn btn-block">Pakai akun lain</button>
</div>
```

### Link bergaya button

Navigasi memakai `<a>`. Beri class yang sama. Link tidak punya `disabled`; pakai `aria-disabled="true"` dan hapus `href` hanya bila alasannya ditampilkan.

```html preview title="Button anchor"
<div class="ds-actions is-start">
  <a class="btn btn-primary" href="#">Buka proyek PRJ-1024</a>
  <a class="btn" href="#">Semua proyek</a>
</div>
```

### Aksi jenis berkas

`btn-excel` dan `btn-pdf` memakai warna khas format berkas, sehingga orang mengenali ekspor spreadsheet atau PDF sebelum membaca label. Jangan taruh di posisi primary.

```html preview title="Excel dan PDF"
<div class="ds-actions is-start">
  <a class="btn btn-excel btn-sm" href="#" data-ds-export="Excel">
    <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg>
    Ekspor Excel
  </a>
  <a class="btn btn-pdf btn-sm" href="#" data-ds-export="PDF">
    <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg>
    Ekspor PDF
  </a>
  <a class="btn btn-excel btn-sm" href="#">
    <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-file-import"></use></svg>
    Impor Excel
  </a>
</div>
```

`a[data-ds-export]` menampilkan toast info dan mengunci link selama 15 detik (`aria-disabled="true"`), karena browser tidak memberi tahu kapan unduhan selesai.

### Kelompok aksi

`.ds-actions` merapikan aksi ke sisi akhir dan membungkus bila ruang habis. `is-start` rata ke awal, `is-between` memisahkan dua kelompok, `is-stack` menumpuk button di ponsel dengan aksi utama di atas. Urutannya Batal, aksi sekunder, lalu aksi primary paling akhir.

```html preview title="Aksi form"
<div class="ds-actions">
  <button type="button" class="btn btn-ghost">Batal</button>
  <button type="button" class="btn">Simpan draft</button>
  <button type="button" class="btn btn-primary">Kirim faktur</button>
</div>
```

### Tabel padat

Di dalam `.ds-dense` setiap ukuran mengecil satu langkah (xs 24px, sm 28px, md 36px). Layar sentuh tetap mendapat area sentuh 44px.

```html preview title="Padat"
<div class="ds-dense ds-actions is-start" style="align-items:center">
  <button type="button" class="btn btn-sm">Setujui</button>
  <button type="button" class="btn btn-sm btn-ghost">Tolak</button>
  <button type="button" class="btn btn-xs btn-ghost">Catatan</button>
</div>
```

## State

Pratinjau beku untuk hover, focus, dan pressed memakai `data-ds-demo` pada kontrol. Atribut itu hanya untuk dokumentasi; kontrol sungguhan memakai `:hover`, `:focus-visible`, dan `:active`.

### Pointer dan keyboard

```html preview title="State pointer dan keyboard"
<div style="overflow-x:auto"><table style="border-collapse:separate;border-spacing:.375rem .5rem;font-size:.8125rem"><thead><tr><th></th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Diam</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Hover</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Focus-visible</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Ditekan</th></tr></thead><tbody>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Utama</th><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" data-ds-demo="hover">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" data-ds-demo="focus">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" data-ds-demo="pressed">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Sekunder</th><td style="vertical-align:middle"><button type="button" class="btn btn-sm">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-sm" data-ds-demo="hover">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-sm" data-ds-demo="focus">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-sm" data-ds-demo="pressed">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Outline</th><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" data-ds-demo="hover">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" data-ds-demo="focus">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" data-ds-demo="pressed">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Soft</th><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" data-ds-demo="hover">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" data-ds-demo="focus">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" data-ds-demo="pressed">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Ghost</th><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" data-ds-demo="hover">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" data-ds-demo="focus">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" data-ds-demo="pressed">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Link</th><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" data-ds-demo="hover">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" data-ds-demo="focus">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" data-ds-demo="pressed">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Netral</th><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" data-ds-demo="hover">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" data-ds-demo="focus">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" data-ds-demo="pressed">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Destruktif</th><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" data-ds-demo="hover">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" data-ds-demo="focus">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" data-ds-demo="pressed">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Destruktif, tenang</th><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" data-ds-demo="hover">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" data-ds-demo="focus">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" data-ds-demo="pressed">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Excel</th><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" data-ds-demo="hover">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" data-ds-demo="focus">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" data-ds-demo="pressed">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">PDF</th><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" data-ds-demo="hover">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" data-ds-demo="focus">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" data-ds-demo="pressed">Simpan</button></td></tr>
</tbody></table></div>
```

### Pilihan, ketersediaan, dan aktivitas

Terpilih adalah `aria-pressed="true"`. Nonaktif memakai atribut native. `aria-disabled` tetap bisa difokuskan dan menjelaskan dirinya. Loading adalah `aria-busy="true"`. Berhasil adalah class sementara `is-success`.

```html preview title="Pilihan, ketersediaan, aktivitas"
<div style="overflow-x:auto"><table style="border-collapse:separate;border-spacing:.375rem .5rem;font-size:.8125rem"><thead><tr><th></th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Terpilih</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Nonaktif</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">aria-disabled</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Memuat</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.25rem">Berhasil</th></tr></thead><tbody>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Utama</th><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" aria-pressed="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" disabled>Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" aria-disabled="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary btn-sm" aria-busy="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-primary is-success btn-sm">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Sekunder</th><td style="vertical-align:middle"><button type="button" class="btn btn-sm" aria-pressed="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-sm" disabled>Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-sm" aria-disabled="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-sm" aria-busy="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn is-success btn-sm">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Outline</th><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" aria-pressed="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" disabled>Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" aria-disabled="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline btn-sm" aria-busy="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-outline is-success btn-sm">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Soft</th><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" aria-pressed="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" disabled>Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" aria-disabled="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft btn-sm" aria-busy="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-soft is-success btn-sm">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Ghost</th><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" aria-pressed="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" disabled>Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" aria-disabled="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost btn-sm" aria-busy="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-success btn-sm">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Link</th><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" aria-pressed="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" disabled>Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" aria-disabled="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link btn-sm" aria-busy="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-link is-success btn-sm">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Netral</th><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" aria-pressed="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" disabled>Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" aria-disabled="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral btn-sm" aria-busy="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-neutral is-success btn-sm">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Destruktif</th><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" aria-pressed="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" disabled>Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" aria-disabled="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error btn-sm" aria-busy="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-error is-success btn-sm">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Destruktif, tenang</th><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" aria-pressed="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" disabled>Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" aria-disabled="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger btn-sm" aria-busy="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-ghost is-danger is-success btn-sm">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Excel</th><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" aria-pressed="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" disabled>Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" aria-disabled="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel btn-sm" aria-busy="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-excel is-success btn-sm">Simpan</button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">PDF</th><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" aria-pressed="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" disabled>Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" aria-disabled="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf btn-sm" aria-busy="true">Simpan</button></td><td style="vertical-align:middle"><button type="button" class="btn btn-pdf is-success btn-sm">Simpan</button></td></tr>
</tbody></table></div>
```

```html preview title="aria-disabled dengan alasan"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="btn btn-primary" aria-disabled="true" aria-describedby="why-send" title="Tambahkan klien dahulu">Kirim faktur</button>
  <p id="why-send" class="ds-text-subtle">Tambahkan klien sebelum mengirim faktur ini.</p>
</div>
```

```html preview title="Loading dengan label"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="btn btn-primary" aria-busy="true">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>
    Mengirim…
  </button>
  <button type="button" class="btn" aria-busy="true">Menyimpan draft…</button>
  <button type="button" class="btn btn-square" aria-busy="true" aria-label="Menyegarkan">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg>
  </button>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Diam | Tidak ada | Sesuai varian. Setiap tingkat terlihat saat diam; hover dan tekan hanya memperdalamnya |
| Hover | Pointer di atas, pada perangkat yang mendukung hover | State layer: 6% pada secondary, outline, soft, ghost; 10% lebih pekat pada yang terisi. 150ms |
| Focus-visible | Fokus keyboard atau lewat program | Cincin 2px `--ds-focus`, offset 2px. Tanpa cincin setelah klik mouse |
| Pressed | Pointer ditekan, Space atau Enter ditahan | State layer 10% (16% pada yang terisi) dan `scale(0.97)` selama 120ms. Terjadi saat pointer ditekan, bukan saat dilepas |
| Selected | `aria-pressed="true"`, `aria-checked="true"`, `aria-current`, `.is-selected` | Isian tone 12%, teks tone, tepi 2px. Petunjuk bentuk selain warna |
| Disabled | `disabled` atau `.btn-disabled` | Opasitas 55%, `cursor: not-allowed`, tanpa hover atau tekan. Button native yang disabled tidak bisa difokuskan |
| aria-disabled | `aria-disabled="true"` | Tampilan sama dengan disabled. Tetap bisa difokuskan, klik diabaikan, alasan dijelaskan lewat `title` dan deskripsi |
| Loading | `aria-busy="true"` | Spinner menggantikan ikon depan, lebar tidak berubah, tanpa hover atau tekan, klik diblokir, `cursor: progress` |
| Berhasil | `.is-success` selama 1,6 sampai 2 detik | Isian hijau tonal, ikon centang menggantikan ikon depan, lalu kembali ke keadaan diam |
| Reduced motion | `prefers-reduced-motion: reduce` | Tanpa skala tekan, spinner menjadi cincin titik-titik yang diam; perubahan warna tetap |
| Forced colours | `forced-colors: active` | Warna border sistem, `GrayText` saat disabled, `Highlight` saat terpilih |

## Anatomi

- `.btn`: button itu sendiri, elemen apa pun (`button`, `a`, `summary`, `input type="submit"`).
- Class varian: `btn-primary`, `btn-outline`, `btn-soft`, `btn-ghost` (`btn-tertiary`), `btn-link`, `btn-neutral`, class tone, `btn-excel`, `btn-pdf`.
- Class ukuran: `btn-xs`, `btn-sm`, tanpa class untuk sedang, `btn-lg`, `btn-xl`.
- Class bentuk: `btn-square`, `btn-circle`, `btn-block`, `btn-wide`.
- `.ds-icon`: ikon depan; tambahkan `is-end` untuk ikon belakang.
- `.ds-btn__label`: pembungkus teks opsional, dipakai tag helper dan `DS.button.loading` untuk mengganti label tanpa menyentuh ikon.
- Pengait state: `aria-pressed`, `aria-disabled`, `aria-busy`, `.is-success`, `.is-selected`.

## Penggunaan

- Pakai satu button primary per area. Button terisi kedua di sebelahnya adalah neutral atau secondary.
- Tulis kata kerja dan objeknya: "Kirim faktur", "Arsipkan proyek". Hindari "OK", "Submit", "Ya".
- Taruh aksi primary paling akhir (ujung baris). Batal berada sebelumnya.
- Tampilkan button `aria-disabled` dengan alasan (satu baris teks di sampingnya), jangan menyembunyikan button atau menonaktifkannya tanpa penjelasan.
- Tampilkan loading bila aksi berlangsung lebih dari 300ms. Aksi yang lebih cepat tidak perlu spinner; library menunggu 300ms sebelum menggambarnya.
- Usahakan label satu baris. Label membungkus saat ruang habis dan string Indonesia sekitar 40% lebih panjang, jadi jangan menetapkan lebar tetap.
- Jangan menaruh dua button primary berdampingan, jangan menyembunyikan aksi sampai hover, dan jangan menggeser button saat hover.
- Jangan pakai `btn-excel` atau `btn-pdf` untuk hal yang bukan berkas jenis itu.
- Untuk aksi destruktif dari halaman, buka dialog konfirmasi dahulu; button konfirmasi di dalam dialog yang berwarna merah terisi.

## Aksesibilitas

- Button butuh nama yang bisa diakses: teks terlihat, atau `aria-label` untuk button hanya-ikon. Ikon di samping teks diberi `aria-hidden="true"`.
- Pakai `<button>` untuk aksi dan `<a href>` untuk navigasi. Link bergaya button tetap berarti link.
- `aria-disabled="true"` menjaga button tetap di urutan tab agar orang bisa membaca mengapa tidak tersedia. Library memblokir kliknya; tambahkan alasan sebagai teks terlihat dan `aria-describedby`.
- Loading mengatur `aria-busy="true"` dan mengumumkan label lewat live region polite. Label tetap ada di dalam button.
- State terpilih tidak pernah hanya warna: isian berubah dan tepi menebal menjadi 2px.
- Kontras: 4,5:1 untuk label, 3:1 untuk tepi dan ikon, di tema terang dan gelap. Kontrol disabled dikecualikan.
- Ukuran target: 44 kali 44px pada `(pointer: coarse)` untuk semua ukuran; ukuran kompak mempertahankan tampilannya dan memperluas area sentuh.

| Tombol | Aksi |
| --- | --- |
| Tab, Shift+Tab | Memindahkan fokus ke button berikutnya atau sebelumnya |
| Enter | Mengaktifkan button atau link |
| Space | Mengaktifkan button (bukan link) |

## Razor

```cshtml
<form method="post" asp-action="Save" data-ds-once>
    <div class="ds-actions">
        <ds-button href="@Url.Action("Index")">Batal</ds-button>
        <ds-button type="submit" name="command" value="draft" loading-label="Menyimpan…">Simpan draft</ds-button>
        <ds-button type="submit" variant="primary" icon="send" loading-label="Mengirim…">Kirim faktur</ds-button>
    </div>
</form>

<ds-button variant="ghost" tone="danger" icon="trash">Hapus draft</ds-button>
<ds-button variant="primary" disabled-reason="Tambahkan klien dahulu">Kirim faktur</ds-button>
<ds-button variant="primary" loading="true" loading-label="Mengirim…">Kirim faktur</ds-button>
```

| Atribut | Efek |
| --- | --- |
| `variant` | `primary`, `secondary` (bawaan), `outline`, `soft`, `ghost`, `link`, `neutral`, `destructive`, `success`, `warning`, `info`, `accent`, `excel`, `pdf` |
| `tone` | Mewarnai varian tenang: `danger`, `success`, `warning`, `info`, `neutral`, `accent` |
| `size` | `xs`, `sm`, `md` (bawaan), `lg`, `xl` |
| `icon`, `icon-end` | Nama ikon sebelum atau sesudah label |
| `icon-only` | Button persegi; isinya menjadi `aria-label` |
| `href`, `external` | Menghasilkan anchor; `external` menambah `target="_blank"`, `rel`, dan teks tersembunyi "(dibuka di tab baru)" |
| `type` | `button` (bawaan), `submit`, `reset` |
| `loading`, `loading-label` | `aria-busy`; label yang tampil saat sibuk (juga `data-ds-loading-label` untuk button submit) |
| `disabled`, `disabled-reason` | Disabled native, atau `aria-disabled` dengan alasan sebagai title dan deskripsi |
| `pressed`, `selected` | `aria-pressed`, atau tampilan terpilih |
| `full-width` | `btn-block` |

## JavaScript

| Atribut atau API | Efek |
| --- | --- |
| `form[data-ds-once]` | Form menolak submit kedua. Button submit yang ditekan menampilkan state sibuk setelah 300ms |
| `button[data-ds-loading-label]` | Teks pengganti label button submit yang ditekan |
| `DS.button.loading(el, on, { label, delay })` | Memblokir button seketika; mengatur `aria-busy` dan spinner setelah `delay` (300ms). Lebar dipertahankan |
| `DS.button.success(el, { label, duration })` | Kilas berhasil selama 1,6 sampai 2 detik, lalu kembali diam |
| `[data-ds-copy]` | Menyalin teks; button menampilkan tampilan berhasil selama 1,5 detik |

Event: `ds:button:loading` (`detail.loading`), `ds:button:success`. Klik pada kontrol `aria-disabled`, `.btn-disabled`, dan yang sedang sibuk dibatalkan pada fase capture.

```js
const button = document.querySelector("#send");
DS.button.loading(button, true, { label: "Mengirim…" });
await fetch("/invoices/INV-2026-0418/send", { method: "POST" });
DS.button.success(button, { label: "Terkirim" });
```

## Token

`--color-primary`, `--color-primary-content`, `--color-base-100`, `--color-base-content`, `--ds-control-border`, `--ds-quiet`, `--ds-link`, `--ds-error-text`, `--ds-warning-text`, `--ds-excel`, `--ds-pdf`, `--ds-focus`, `--ds-border-focus`, `--ds-radius-md|lg|box`, `--ds-size-target`, `--ds-opacity-state-hover|pressed|selected|drag`, `--ds-opacity-disabled`, `--ds-press-scale`, `--ds-duration-instant|fast|tracker`, `--ds-ease-standard|out`, `--ds-type-callout-size`.

## Native dan daisyUI

Button dibangun di atas `.btn` daisyUI. DS mempertahankan nama class-nya dan mengganti aturan warna, state, dan ukuran:

- Warna berasal dari satu state engine, sehingga setiap varian punya perilaku hover, pressed, selected, disabled, dan busy yang sama di kedua tema. Hover hanya berlaku pada perangkat yang mendukung hover.
- `btn-secondary` adalah button permukaan netral, bukan isian teal. `btn-ghost` adalah teks tanpa border; untuk tepi teal yang terlihat pakai `btn-outline`.
- Disabled mempertahankan warna varian pada opasitas 55%, bukan isian abu-abu daisyUI, dan button tetap menerima pointer agar kursor bisa menampilkan `not-allowed`.
- Ukurannya 28, 32, 40, 48, dan 56px, dengan target 44px di layar sentuh.
- `.ds-icon-btn`, `.ds-chrome-btn`, `.ds-actions`, `.ds-dense`, `btn-excel`, dan `btn-pdf` dari versi 1 tetap berfungsi.
