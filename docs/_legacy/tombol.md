---
title: Tombol
group: Komponen
order: 1
summary: Empat tingkat tombol yang semuanya terlihat saat diam, tombol jenis berkas, tombol ikon, kelompok aksi, dan status sibuk.
source: TPS Styles/app.css L3044–3106, L1284–1291; DESIGN.md bagian Tombol; Views/Shared/_EntryActions.cshtml
---

Tombol memicu aksi. Tautan berpindah halaman. Bila sebuah kontrol membuka halaman lain tanpa mengubah data, pakai `<a>` bergaya tombol; bila mengubah data, pakai `<button>` di dalam `<form>`.

## Hierarki tombol

Setiap tombol terlihat saat diam. Hover dan tekan hanya memperdalam gaya diamnya, tidak pernah memunculkan tombol yang tadinya tak terlihat. Fokus selalu memakai cincin 2 px warna `--ds-focus`.

```html preview title="Empat tingkat"
<div class="ds-actions is-start">
  <button type="button" class="btn btn-primary">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>
    Kirim ke Bea Cukai
  </button>
  <button type="button" class="btn">Batal</button>
  <button type="button" class="btn btn-ghost">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg>
    Ubah
  </button>
  <button type="button" class="btn btn-error">Hapus</button>
  <button type="button" class="btn btn-ghost is-danger">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>
    Hapus draft
  </button>
</div>
```

### Varian

| Kelas | Gaya diam | Pakai untuk |
| --- | --- | --- |
| `btn btn-primary` | Teal terisi, teks putih (4.52:1) | Satu per area: Simpan, Buat pengguna, Kirim ke Bea Cukai |
| `btn` | Permukaan + border kontrol 1 px (3.37:1) | Batal, Terapkan, Simpan & tambah lagi, Tetap di halaman |
| `btn btn-ghost` | Teks teal tenang, tint 6%, tepi terlihat | Aksi baris (Ubah, Pilihan), Salin XML, tautan bantu di kepala halaman |
| `btn btn-error` | Merah terisi | Konfirmasi hapus di dalam dialog |
| `btn btn-ghost is-danger` | Teks merah + tepi | Hapus di baris atau di halaman detail (membuka dialog konfirmasi) |

**Aturan.**

- Satu tombol utama per area. Tombol kirim selalu utama dan paling kanan.
- Tombol submit pertama di sebuah form tidak pernah mengirim ke layanan luar, sehingga Enter di field hanya menyimpan draft atau perubahan.
- Kata kerja di label menyebut akibatnya: "Kirim ke Bea Cukai", "Kirim koreksi ke Bea Cukai", "Perbaiki & kirim ulang". "Kirim ulang" tanpa objek tidak dipakai.

> [!NOTE]
> Tombol `btn-ghost` di DS tetap punya tepi tipis (82% `currentColor`). Ini keputusan TPS: aksi tersier harus terlihat sebagai tombol, bukan teks biasa.

### State dan perilaku

| State | Yang berubah |
| --- | --- |
| Hover | Latar sedikit lebih pekat (`btn`: tint 6% base-content; `btn-ghost`: tint 14%) |
| Tekan | `transform: scale(.97)` saat pointer ditekan, bukan saat dilepas |
| Fokus | Cincin 2 px `--ds-focus`, offset 2 px |
| Nonaktif | Border 25% base-content; tombol Excel/PDF mempertahankan warnanya |
| Sibuk | `aria-busy="true"` atau tautan export `aria-disabled="true"`: opasitas .55, kursor progress |

Di bawah `prefers-reduced-motion: reduce`, efek tekan dan transisi dimatikan.

### Aksesibilitas

- Tinggi minimum 44 px untuk semua tombol, termasuk `btn-sm` dan `btn-xs`. Di tabel desktop yang padat, bungkus dengan `.ds-dense` untuk kembali ke tinggi daisyUI.
- Tombol yang hanya berisi ikon wajib punya `aria-label`. Ikon di dalam tombol berlabel selalu `aria-hidden="true"`.
- Jangan menonaktifkan tombol tanpa penjelasan di dekatnya. Lebih baik biarkan aktif dan tampilkan pesan galat saat ditekan.

### Razor

```cshtml
<form method="post" asp-action="Save" data-ds-once>
    <div class="ds-actions">
        <a asp-action="Index" class="btn" data-ds-guard-skip>Batal</a>
        <button type="submit" name="command" value="draft" class="btn" data-ds-loading-label="Menyimpan…">
            @Icon.Svg("file") Simpan draft
        </button>
        <button type="submit" name="command" value="send" class="btn btn-primary" data-ds-loading-label="Mengirim…">
            <ds-icon name="send" /> Kirim ke Bea Cukai
        </button>
    </div>
</form>
```

**Token.** `--ds-control-border`, `--ds-quiet`, `--ds-error-text`, `--ds-focus`, `--ds-press-scale`, `--ds-size-target`, `--radius-field`.

**Asal TPS.** Hierarki di `Styles/app.css` L3044–3106 ("Buttons: four levels, all visible at rest"), efek tekan L1284–1291, aturan di `DESIGN.md` bagian Tombol.

## Tombol jenis berkas

Tombol yang menghasilkan atau menerima berkas memakai warna aplikasinya, sehingga operator mengenali formatnya sebelum membaca label.

```html preview title="Excel dan PDF"
<div class="ds-actions is-start">
  <a class="btn btn-excel btn-sm" href="#" data-ds-export="Excel">
    <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg>
    Export Excel
  </a>
  <a class="btn btn-pdf btn-sm" href="#" data-ds-export="PDF">
    <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg>
    Export PDF
  </a>
  <a class="btn btn-excel btn-sm" href="#">
    <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-file-import"></use></svg>
    Import Excel
  </a>
</div>
```

| Kelas | Warna | Kontras teks |
| --- | --- | --- |
| `btn-excel` | `--ds-excel` #1d6f42, hover #185c37 | 6.17:1 |
| `btn-pdf` | `--ds-pdf` #b30b00, hover #8f0900 | 7.08:1 |

Export (unduh dan export) berada di kelompok kiri toolbar; import dan input berada di kanan.

### State dan perilaku

`a[data-ds-export="Excel"]` menampilkan toast info "Menyiapkan file Excel" lalu mengunci tautan 15 detik (`aria-disabled="true"`), karena browser tidak memberi sinyal kapan unduhan selesai. Kunci dilepas lebih awal bila halaman dipulihkan dari back/forward cache.

## Tombol ikon

Dua bentuk, keduanya wajib `aria-label`:

```html preview title="Tombol ikon"
<div class="ds-actions is-start">
  <button type="button" class="ds-chrome-btn" data-ds-back="/" aria-label="Kembali ke halaman sebelumnya">
    <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-arrow-left"></use></svg>
  </button>
  <button type="button" class="ds-chrome-btn" data-ds-theme-toggle aria-label="Ganti tema">
    <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-moon"></use></svg>
  </button>
  <a class="ds-icon-btn" href="#" aria-label="Ubah tangki T-01">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg>
  </a>
  <button type="button" class="ds-icon-btn is-danger" aria-label="Hapus tangki T-01" data-ds-confirm="Hapus tangki T-01?" data-ds-confirm-text="Tangki yang dihapus tidak bisa dikembalikan." data-ds-confirm-label="Hapus">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>
  </button>
</div>
```

| Kelas | Ukuran | Pakai untuk |
| --- | --- | --- |
| `ds-chrome-btn` | 44 × 44 px, tanpa border | Kontrol di top bar: kembali, tema, tutup |
| `ds-icon-btn` | 36 × 36 px, warna `--ds-quiet` | Aksi di tabel padat desktop saja |
| `ds-icon-btn is-danger` | 36 × 36 px, merah | Hapus di tabel padat |
| `btn btn-square` | 44 × 44 px | Tombol ikon di form dan dialog |

> [!WARNING]
> `ds-icon-btn` 36 px di bawah target sentuh 44 px. Pakai hanya di tabel desktop yang barisnya sudah cukup tinggi; di layar sentuh pakai `btn btn-ghost btn-square`.

## Kelompok aksi

`.ds-actions` merapikan tombol ke kanan dan membungkus ke baris berikut saat ruang habis, tetap rata kanan. `is-start` untuk kelompok kiri (export), `is-between` untuk dua kelompok yang dipisah.

```html preview title="Urutan aksi form"
<div class="ds-actions">
  <button type="button" class="btn">Batal</button>
  <button type="button" class="btn">Simpan draft</button>
  <button type="button" class="btn">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-code"></use></svg>
    Preview XML
  </button>
  <button type="button" class="btn btn-primary">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>
    Kirim ke Bea Cukai
  </button>
</div>
```

Urutan baku dari kiri ke kanan: **Batal** · aksi simpan · aksi pratinjau · **aksi utama**. Di ponsel (≤ 640 px) footer form ditumpuk vertikal dengan aksi utama di atas (`flex-direction: column-reverse`).

## Tombol sibuk

Form dengan `data-ds-once` menolak submit kedua. Setelah submit berjalan, semua tombol submit diberi `aria-disabled="true"` (bukan `disabled`, karena tombol yang `disabled` kehilangan `formaction`), dan label tombol yang ditekan diganti `data-ds-loading-label`.

```html preview title="Submit sekali"
<form class="ds-actions is-start" data-ds-once>
  <button type="submit" class="btn btn-primary" data-ds-loading-label="Menyimpan…">Simpan</button>
  <p class="ds-text-subtle" data-ds-save-status role="status"></p>
</form>
```

Saat halaman dipulihkan dari back/forward cache, tombol kembali aktif.

## Jangan

- Jangan memakai dua tombol utama berdampingan. Pilih satu; yang lain `btn`.
- Jangan menyembunyikan aksi sampai hover. Operator memakai layar sentuh dan keyboard.
- Jangan menggeser tombol saat hover (`translate`). Target klik harus tetap di bawah kursor.
- Jangan mewarnai tombol export dengan teal. Teal untuk aksi utama dan navigasi aktif.
