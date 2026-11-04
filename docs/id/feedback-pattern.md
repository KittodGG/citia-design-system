---
title: Pola umpan balik
group: patterns
order: 5
summary: Pohon keputusan untuk memilih pesan inline, alert, banner, toast, atau dialog, dengan tingkat keparahan, waktu, dan aturan aksi.
---

Sistem berbicara kepada orang dengan lima cara. Memilih yang tepat bergantung pada seberapa besar pesan itu mengganggu dan berapa lama harus bertahan. Komponen: [Alert](./alert.md), [Banner](./banner.md), [Toast](./toast.md), [Dialog](./dialog.md), [Alert dialog](./alert-dialog.md), [Validation](./validation.md).

## Pohon keputusan

Tanyakan berurutan dan berhenti pada jawaban ya pertama.

1. Tentang satu isian? Pakai **pesan inline** di bawah isian (`.ds-field-error`, `.ds-hint`).
2. Pengguna harus memutuskan sebelum hal lain bisa terjadi? Pakai **dialog** ([Alert dialog](./alert-dialog.md) untuk pilihan yang merusak atau tidak bisa dibalik).
3. Tentang seluruh aplikasi atau akun dan tetap berlaku sampai diperbaiki (offline, pemeliharaan, paket kedaluwarsa)? Pakai **banner** di atas halaman.
4. Hasil dari sesuatu yang baru dilakukan pengguna dan tidak butuh balasan? Pakai **toast**.
5. Tentang satu blok konten di halaman ini (form, tabel, bagian)? Pakai **alert** di blok itu.

| Jenis | Mengganggu | Bertahan | Contoh |
| --- | --- | --- | --- |
| Inline | Tidak | Sampai diperbaiki | "Isi alamat email seperti nama@example.com." |
| Alert | Tidak | Selama berlaku | "Penyedia pembayaran lambat. Faktur mungkin butuh beberapa menit." di atas tabel faktur |
| Banner | Tidak | Selama berlaku, bisa ditutup bila tidak kritis | "Pemeliharaan terjadwal 08 Nov, 01.00–03.00." |
| Toast | Tidak | 4–8 d | "Proyek tersimpan" |
| Dialog | Ya, modal | Sampai dijawab | "Hapus PRJ-1024?" |

## Tingkat keparahan

| Nada | Arti | Ikon | Pakai |
| --- | --- | --- | --- |
| Info | Hal yang perlu diketahui | `info` | Fakta netral, tips, status yang tidak butuh tindakan |
| Success | Berhasil | `check-circle` | Aksi selesai, hanya bila konfirmasi membantu |
| Warning | Bisa berjalan salah | `alert` | Risiko atau keadaan yang perlu perhatian segera |
| Error | Tidak berhasil | `x-circle` | Kegagalan dan apa yang harus dilakukan |

Tingkat keparahan selalu dibawa oleh kata dan ikon, bukan hanya warna. Nada hanya mendukung pesan (WCAG 1.4.1). Pakai tingkat terendah yang benar; layar penuh peringatan mengajari orang mengabaikannya.

```html preview title="Satu pesan di tiap tingkat"
<div class="ds-grid-2">
  <div class="ds-note is-info"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg><p>Faktur dikirim setiap hari pukul 08.00.</p></div>
  <div class="ds-note is-success"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check-circle"></use></svg><p>Faktur INV-2026-0418 terkirim.</p></div>
  <div class="ds-note is-warning"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg><p>Kartu yang tersimpan kedaluwarsa pada 30 Nov.</p></div>
  <div class="ds-note is-error"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg><p>Pembayaran gagal. Minta pelanggan memakai kartu lain.</p></div>
</div>
```

## Waktu

- Toast bertahan 4 sampai 8 detik: 4 untuk keberhasilan singkat ("Tersalin"), 6 sebagai bawaan, 8 bila punya aksi atau kalimat lebih panjang. Pewaktu berhenti saat hover dan fokus, dan toast tidak pernah bergeser di bawah penunjuk.
- Toast dengan aksi (Batalkan, Lihat) bertahan minimal 8 detik, dan aksinya tetap tersedia dari pusat notifikasi sesudahnya.
- Galat tidak kedaluwarsa: tampilkan sebagai alert, banner, atau dialog, bukan toast.
- Tampilkan indikator sibuk setelah 300ms, bukan sebelumnya. Tampilkan umpan balik berhasil selama 1,6 sampai 2 detik pada kontrolnya sendiri (tombol yang menampilkan centang setelah menyalin).
- Live region: success dan info memakai `role="status"` (sopan); galat memakai `role="alert"` (tegas). Jangan mengumumkan pesan yang sama dua kali.

## Aksi tetap ada

Pesan dengan aksi mempertahankan aksi itu sampai pengguna bertindak atau kondisinya berakhir.

- Jangan menghapus aksi Batalkan, Coba lagi, atau Lihat dengan batas waktu kurang dari 8 detik.
- Banner yang meminta sesuatu ("Verifikasi email Anda") bertahan sampai selesai; Tutup hanya untuk pesan opsional dan mengingat pilihannya.
- Taruh paling banyak satu aksi di toast dan dua di alert; yang utama lebih dulu. Namai aksi ("Batalkan", "Coba lagi", "Lihat faktur"), jangan "OK" atau "Klik di sini".
- Dialog selalu punya jalan keluar: aksi Batal, tombol tutup, dan Escape, kecuali pilihannya benar-benar wajib.

## Menulis pesan

Sebut apa yang terjadi, lalu apa yang harus dilakukan. Satu atau dua kalimat. Contoh dan nada ada di [Menulis](./writing.md).

| Alih-alih | Tulis |
| --- | --- |
| "Error 500" | "Terjadi masalah di sisi kami. Coba lagi sebentar lagi." |
| "Berhasil!" | "Proyek tersimpan" |
| "Input tidak valid" | "Isi tanggal seperti 25 Jan 2026." |

## Penggunaan

- Taruh pesan di samping hal yang dibicarakannya.
- Pakai satu pesan per penyebab; kelompokkan beberapa galat isian dalam ringkasan.
- Jangan memakai toast untuk galat yang butuh tindakan, atau untuk hal yang wajib dibaca pengguna.
- Jangan memakai dialog modal untuk informasi; pakai alert atau banner.
- Jangan menampilkan lebih dari 3 toast sekaligus; antrekan sisanya.
