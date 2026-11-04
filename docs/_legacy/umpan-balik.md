---
title: Umpan balik
group: Komponen
order: 5
summary: Catatan inline, banner halaman, toast, empty state, dan status sibuk: kapan memakai masing-masing, dengan kata yang menjelaskan hasil dan langkah berikutnya.
source: TPS Styles/app.css L3636–3637, L2664–2703, L3702–3707, L3587–3590, L1674–1687; Views/Shared/_Toast.cshtml, _EmptyState.cshtml
---

Umpan balik menjawab satu dari empat hal: **status** (sedang apa), **selesai** (berhasil), **peringatan** (perlu dicek), **galat** (gagal dan apa yang dikerjakan). Setiap jenis memakai kata lebih dulu; tint dan ikon hanya mendukung. Pilih tempatnya menurut seberapa mengganggu pesan itu: catatan di dalam konten, banner di atas halaman, toast sesaat.

Pesan yang butuh keputusan memakai dialog, lihat [Dialog, menu dan popover](./dialog-dan-menu.md). Galat isian form memakai ringkasan galat, lihat halaman form.

## Catatan inline {#note}

`.ds-note` berada di dalam kartu atau form, di dekat hal yang dijelaskannya. Nada lewat `.is-*`; tanpa nada, bawaannya info.

```html preview title="Catatan inline"
<div style="display: grid; gap: 0.75rem">
  <div class="ds-note">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg>
    <p>Data pemasukan BL-2026-00841 tersimpan sebagai draft. Belum ada yang dikirim ke Bea Cukai.</p>
  </div>
  <div class="ds-note is-warning">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg>
    <p>Total tangki T-01 melebihi kapasitas: 1574782 TNE dari 1500000 TNE. Periksa angka sebelum mengirim.</p>
  </div>
  <div class="ds-note is-error">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>
    <p>Bea Cukai menolak kiriman ini. Perbaiki No BL lalu kirim ulang.</p>
  </div>
</div>
```

| Kelas | Pakai untuk |
| --- | --- |
| `ds-note` / `is-info` | Informasi netral |
| `ds-note is-success` | Hasil berhasil yang perlu tetap terlihat |
| `ds-note is-warning` | Perlu dicek tetapi tidak menghalangi |
| `ds-note is-error` | Kegagalan dan langkah perbaikan |

Isi ikon dengan `aria-hidden="true"`. Teks catatan berada di `<p>` atau `<div>` langsung di bawah `.ds-note` agar tidak terpotong oleh `overflow-wrap`.

## Banner halaman {#banner}

`.ds-banner` berada di atas konten halaman, untuk kondisi yang berlaku di seluruh halaman: masa akses, pemeliharaan, siaran kritis. Tepi kiri tebal (`--ds-border-edge`) menandai nadanya. Tautan di dalamnya digarisbawahi.

```html preview title="Banner masa akses"
<div class="ds-banner is-warning" role="status">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-clock"></use></svg>
  <p>Masa trial terminal ini berakhir 30 Nov 2026 23.59 WIB (12 hari lagi). Hubungi admin platform untuk memperpanjang. <a href="#">Hubungi admin</a></p>
</div>
```

```html preview title="Banner kritis"
<div class="ds-banner is-error is-critical" role="alert">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-megaphone"></use></svg>
  <div>
    <strong>Pemeliharaan Bea Cukai 2 Nov 2026, 22.00 sampai 23.30 WIB.</strong>
    Pengiriman ditahan sebagai draft sampai layanan kembali.
  </div>
</div>
```

| Kelas | Pakai untuk |
| --- | --- |
| `ds-banner` (+ `is-info`, `is-success`, `is-warning`) | Kondisi halaman: masa akses, pemberitahuan |
| `ds-banner is-error` | Akses berakhir atau layanan terganggu |
| `ds-banner is-critical` | Siaran kritis: ikon berkedip 1.6 detik untuk menarik mata, berhenti di bawah `prefers-reduced-motion: reduce` |

Pakai `role="status"` untuk banner biasa dan `role="alert"` hanya untuk yang kritis. Satu banner kritis per halaman; susun sisanya jadi satu kalimat bila lebih dari satu.

## Toast {#toast}

Toast mengonfirmasi hasil aksi yang baru terjadi, lalu hilang. Pakai untuk "Data tersimpan"; jangan pakai untuk pesan yang harus dibaca ulang nanti, itu tugas catatan atau banner.

Toast muncul di `.ds-toast-region` (kanan bawah, live region `polite`), satu per satu: toast baru menggantikan yang lama supaya klik berulang tidak menumpuk.

```html preview title="Toast dari atribut"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-toast-show="success" data-ds-toast-title="Draft tersimpan" data-ds-toast-text="BL-2026-00841 belum dikirim ke Bea Cukai.">Toast berhasil</button>
  <button type="button" class="btn" data-ds-toast-show="info" data-ds-toast-title="Menyiapkan file Excel" data-ds-toast-text="File terunduh otomatis bila sudah siap.">Toast info</button>
  <button type="button" class="btn" data-ds-toast-show="warning" data-ds-toast-title="Hasil belum pasti" data-ds-toast-text="Cek status lagi dalam beberapa menit.">Toast peringatan</button>
  <button type="button" class="btn" data-ds-toast-show="error" data-ds-toast-title="Gagal ke Bea Cukai" data-ds-toast-text="Ditolak: No BL BL-2026-00841 sudah terdaftar. Perbaiki lalu kirim ulang.">Toast galat</button>
</div>
```

### Perilaku dan aksesibilitas

| Aspek | Aturan |
| --- | --- |
| Lama tayang | Galat tetap sampai ditutup; lainnya hilang setelah 6 detik |
| Jeda | Hitung mundur berhenti saat kursor di atas toast atau fokus di dalamnya (WCAG 2.2.1) |
| Peran | `role="alert"` untuk galat, `role="status"` untuk lainnya |
| Tombol tutup | 44 × 44 px, `aria-label="Tutup notifikasi"` |
| Jumlah | Satu toast pada satu waktu |

Isi toast: judul menyatakan hasil, teks (opsional) menyatakan sebab atau langkah berikutnya. Toast galat wajib menyebut alasan.

> [!IMPORTANT]
> Jangan menaruh aksi di toast. Toast hilang sebelum operator sempat memilih. Aksi lanjutan ada di halaman.

### Razor

Server: antre toast sebelum redirect, lalu render sekali di layout.

```csharp
this.Toast(Tone.Success, "Data tersimpan");
this.Toast(Tone.Error, "Gagal ke Bea Cukai", "Ditolak: No BL sudah terdaftar.");
return RedirectToAction(nameof(Index));
```

```cshtml
<partial name="_DsToast" />
```

Klien: `DS.toast({ tone, title, text })`; `tone` salah satu dari `success`, `info`, `warning`, `error`.

```js
DS.toast({ tone: "success", title: "Draft tersimpan", text: "BL-2026-00841" });
```

**Token.** `--ds-z-tooltip`, `--ds-shadow-popover`, `--ds-duration-base`, `--ds-size-target`.

**Asal TPS.** Partial `_Toast` dan `Styles/app.css` bagian toast.

## Empty state {#empty}

Dipakai saat daftar atau halaman belum punya isi. Satu ikon, satu judul, satu kalimat, maksimal satu aksi. Kalimat menjelaskan cara mengisinya, bukan meminta maaf.

```html preview title="Empty state dengan kotak putus-putus"
<div class="ds-empty is-boxed">
  <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-tank"></use></svg></span>
  <h2>Belum ada tangki</h2>
  <p>Tangki yang ditambahkan akan tampil di sini dan bisa dipilih di dokumen pemasukan.</p>
  <a class="btn btn-primary btn-sm" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>Tambah tangki</a>
</div>
```

| Kelas | Pakai untuk |
| --- | --- |
| `ds-empty` | Kosong di dalam kartu atau tabel |
| `ds-empty is-boxed` | Kosong di seluruh halaman: kotak putus-putus |
| `ds-empty-icon` | Lingkaran 48 px berisi ikon |

Pakai `h2` untuk halaman, `h3` untuk di dalam kartu yang sudah punya `h2`. Hasil pencarian kosong memakai kalimat berbeda dari data kosong: "Tidak ada BL yang cocok dengan filter. Ubah atau hapus filter."

```cshtml
<ds-empty icon="tank" title="Belum ada tangki" action-label="Tambah tangki" action-href="/Tanks/Create" boxed>
    Tangki yang ditambahkan akan tampil di sini.
</ds-empty>
```

## Sibuk dan memuat {#sibuk}

Konten tetap terlihat saat sibuk; hanya interaksi yang berhenti. Pasang `aria-busy="true"` pada wilayah `.ds-busy`: anak-anaknya menjadi 60% buram, tidak bisa diklik, dan kursor menjadi progress. Spinner hanya untuk tombol, dan hilang di bawah `prefers-reduced-motion: reduce` karena label sibuk sudah membawa kabar.

```html preview title="Wilayah sibuk dan baris status"
<p class="ds-live-status" role="status">Memperbarui daftar… terakhir 14.30 WIB.</p>
<section class="ds-busy" aria-busy="true">
  <p>BL-2026-00841, MT Sinar Jaya, PT Akr Corporindo</p>
  <button type="button" class="btn btn-primary"><span class="ds-spinner" aria-hidden="true"></span>Mengirim…</button>
</section>
```

- `.ds-live-status` untuk baris kabar otomatis (segarkan, simpan). Beri `role="status"` agar pembaca layar mengumumkannya.
- Ubah label tombol saat sibuk ("Mengirim…"), jangan hanya memutar spinner.
- Lepas `aria-busy` begitu selesai, sukses maupun gagal; kabari hasilnya dengan toast atau catatan.

## Galat form {#galat}

Galat isian ditampilkan di samping field dan dirangkum di atas form. Pola ringkasan galat, `aria-describedby`, dan fokus ke galat pertama ada di halaman form; di sini hanya aturan umum: tulis apa yang salah dan cara memperbaikinya, tanpa nama layanan teknis.

## Jangan

- Jangan memakai toast untuk galat yang harus dikerjakan. Pakai catatan atau banner yang bertahan.
- Jangan menumpuk lebih dari satu banner kritis di halaman.
- Jangan menulis pesan tanpa langkah berikutnya: "Gagal" saja tidak cukup; tulis "Gagal ke Bea Cukai. Periksa No BL, lalu kirim ulang."
- Jangan mengandalkan warna. Setiap pesan punya kata dan ikon.
