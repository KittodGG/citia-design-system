---
title: Catatan perubahan
group: reference
order: 5
summary: Riwayat rilis: 2.0.2 (instalasi offline), 2.0.1 (paket NuGet), 2.0.0 (universal, dua bahasa, katalog lengkap) dan 1.0.0 (rilis pertama).
---

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/). Versi mengikuti SemVer: perubahan token atau class yang memaksa proyek mengubah markup menaikkan versi mayor. Teks yang sama ada di `CHANGELOG.md` di akar repositori (bahasa Inggris).

## 2.0.2 - 4 Nov 2026

### Diperbaiki

- `ds.css` jadi (opsi instalasi A) sekarang berisi setiap class daisyUI yang dipakai pustaka dan dokumentasi. Sebelumnya file ini dibangun tanpa memindai markup apa pun, sehingga daisyUI 5 tidak menyertakan `.btn-sm`, `.btn-ghost`, `.badge`, `.card`, `.menu`, `.kbd`, `.tooltip`, `.dropdown`, border `.input`, dan lainnya. Aplikasi dengan build Tailwind sendiri (opsi B) tidak terdampak.
- Command palette hanya menerima tautan `http:` dan `https:` (relatif atau absolut) dari hasil `data-ds-command-source`. Tautan `javascript:` atau `data:` di JSON dibuang, bukan dijadikan item yang bisa diklik.

### Ditambahkan

- Instalasi tanpa feed Citia: `install-citia-ds.ps1` menyalin paket ke repositori aplikasi (`packages/`) dan mengarahkan `nuget.config` ke sana, jadi clone dan build server bisa restore tanpa jaringan. Lihat [Instalasi](./installation.md#offline).
- Setiap rilis di GitHub membawa paket, zip offline (paket + installer), dan zip statis (CSS, JavaScript, font, dan ikon dengan path relatif) untuk halaman yang tidak memakai Razor.
- Smoke test memeriksa class daisyUI di `ds.css`, dan bisa menjalankan installer di mesin simulasi tanpa internet.

## 2.0.1 - 4 Nov 2026

Versi pertama yang diterbitkan sebagai paket NuGet untuk semua aplikasi Citia; lihat [Rilis dan pembaruan](./releases.md).

### Diperbaiki

- `<partial name="_DsHead" />` tanpa model tidak lagi error di halaman yang punya model sendiri (setiap Razor Page dengan `PageModel`). Partial ini sekarang menerima model apa pun dan memakai `HeadOptions` bawaan.

### Ditambahkan

- Metadata paket: readme, URL proyek, tag, dan tautan catatan rilis, tampil di feed NuGet.
- `tools/smoke-test.ps1`: memasang paket hasil pack ke aplikasi Razor Pages baru lalu memeriksa render, aset, bahasa, validasi, dan toast, di mode Development dan sebagai aplikasi hasil publish.
- Feed NuGet Citia di `https://design.citia-engineering.com/nuget/v3/index.json`, dilayani situs dokumentasi. `tools/release.ps1` memeriksa changelog, kontras, dan smoke test sebelum menerbitkan; `tools/deploy-site.ps1` men-deploy situs.

### Diubah

- Situs dokumentasi menampilkan versi paket yang dipakainya, jadi versi situs dan paket tidak bisa berbeda.

## 2.0.0 - 2 Nov 2026

Versi 2 mengubah pustaka hasil ekstraksi dari satu produk menjadi sistem desain universal untuk ASP.NET Core (.NET 10). Tidak ada perubahan merusak yang disengaja; lihat [Migrasi dari v1](./migration-v1.md).

### Ditambahkan

- Katalog komponen lengkap yang mencakup shadcn/ui, Material 3, Tailwind UI application UI, dan daisyUI 5: aksi, field teks dan pilihan, pemilih, unggah, tampilan data, umpan balik, overlay, navigasi, dan tata letak. Lihat [Cakupan](./coverage.md).
- Bahasa Inggris dan Indonesia di semua tempat: dokumentasi, string C# (`DsText`, `Fmt` yang peka culture), dan JavaScript (`addMessages`, `locale`).
- Token: peran tipe, state layer, motion spring dan enter, ukuran target, skala z-index, `--ds-focus`.
- Matriks state di setiap komponen: pointer, keyboard, pilihan, disclosure, ketersediaan, validasi, aktivitas, konten, drag, varian, dan lingkungan.
- JavaScript: satu modul per keluarga, API `DS` (`init`, `configure`, `addMessages`, `theme`, `toast`, `confirm`, `guard`, dan lainnya), event `ds:*`, dan `DS.init(root)` untuk pembaruan parsial.
- Preferensi pengguna di `accessibility.css`: gerak berkurang, transparansi berkurang, kontras lebih, warna paksa.
- Dukungan kanan-ke-kiri lewat properti logis.
- Dokumentasi: mulai, fondasi, halaman komponen, pola (halaman, form, data, alur kerja, umpan balik), konten (menulis, suara dan nada), dan referensi (JavaScript, Razor dan C#, cakupan, migrasi).
- Jauh lebih banyak tag helper dan partial; lihat [API Razor dan C#](./razor-api.md).

### Diubah

- Tema bernama `light` dan `dark`; `tps` dan `tps-dark` tetap sebagai alias.
- Slug dokumentasi berbahasa Inggris; alamat versi 1 dialihkan.
- Semua contoh dan teks netral domain; token ilustrasi tangki dan contoh khusus TPS dihapus.
- Bawaan `HeadOptions` menjadi `light` dan `dark`.

### Diperbaiki

- Warna cincin fokus selalu minimal 3:1 terhadap kedua permukaan.

## 1.0.0 - 2 Nov 2026

Rilis pertama, diekstrak dari INTEGRA TPS Integration (branch `feature/tps-integration`, commit `88cd8e4`).

### Ditambahkan

- Token DTCG di `tokens/tokens.json`: palet primitif, tema terang dan gelap, 17 peran tipografi, spasi, radius, border, bayangan, ukuran, z-index, motion, dan opasitas.
- `tools/tokens.cs` (.NET 10, satu berkas): membangun keluaran CSS, JSON, ikon, dan referensi serta memeriksa pasangan kontras WCAG.
- `tools/css.ps1`: Tailwind CSS standalone dan daisyUI dengan verifikasi SHA-256, Windows dan Linux, tanpa Node.js.
- Razor Class Library `Citia.DesignSystem`: tag helper `ds-icon`, `ds-pill`, `ds-tag`, `ds-empty`; partial `_DsHead`, `_DsScripts`, `_DsIconSprite`, `_DsToast`, `_DsConfirmDialog`, `_DsLeaveDialog`, `_DsPager`, `_DsSortHeader`, `_DsPageSize`, `_DsSidebarNav`; helper `Icon`, `Tone`, `ToastMessage`, `ListSort`, `ListPage<T>`, `QueryUrl`, `NavModel`, `Avatar`, `Fmt`, `Wib`.
- CSS komponen `ds-*` dan `ds.css` jadi untuk aplikasi tanpa Tailwind.
- `ds.js`: tema tiga mode, sidebar ringkas, grup navigasi, drawer, tautan kembali, dialog dan konfirmasi, toast, guard perubahan, kunci export, salin, tombol password, kirim otomatis, kirim sekali, kolom tabel tersemat, baris pohon, combobox ARIA.
- 73 ikon, font variabel Manrope, dan kalender Cally.
- Situs dokumentasi ASP.NET Core Razor Pages dengan scroll tracker, tema terang dan gelap, pencarian, dan pratinjau langsung.
