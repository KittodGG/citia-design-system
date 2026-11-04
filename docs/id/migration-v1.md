---
title: Migrasi dari v1
group: reference
order: 4
summary: Perubahan dari versi 1 ke 2: nama tema, slug Inggris, contoh universal, token dan modul baru, i18n, dan beberapa catatan perilaku. Tidak ada perubahan yang merusak.
---

Versi 2 mempertahankan semua class, atribut, partial, dan API C# publik versi 1. Aplikasi yang ada tetap berjalan setelah paket diperbarui. Halaman ini mendaftar apa yang baru, apa yang diganti namanya (nama lama tetap berfungsi), dan apa yang perlu diperiksa.

> [!NOTE]
> Versi 1 hanya berbahasa Indonesia dan dibentuk oleh produk pertamanya. Versi 2 bersifat universal: tidak ada contoh, komentar class, atau teks sampel yang mengandaikan produk itu.

## Sekilas

| Area | Versi 1 | Versi 2 |
| --- | --- | --- |
| Tema | `tps`, `tps-dark` | `light`, `dark`; `tps` dan `tps-dark` tetap sebagai alias |
| Bahasa | Dokumentasi dan string berbahasa Indonesia | Inggris dan Indonesia di dokumentasi, C#, dan JavaScript |
| Slug dokumentasi | Indonesia (`tombol`, `tabel`) | Inggris (`button`, `table`); alamat lama dialihkan |
| Komponen | Sekitar 30 keluarga | Katalog lengkap, lihat [Cakupan](./coverage.md) |
| Contoh | Khusus domain | Netral domain |
| Token | Palet, ruang, tipe, motion | Menambah peran tipe, state layer, motion spring, ukuran target, skala z-index |
| Perilaku | 12 area dalam satu berkas | Satu modul per keluarga di `js/modules/` |
| Perubahan merusak | | Tidak ada yang disengaja |

## Tema

Nama tema sekarang `light` dan `dark`. CSS hasil generate menjawab kedua nama, sehingga `data-theme="tps"` dan `data-theme="tps-dark"` di markup, preferensi tersimpan, dan CSS Anda tetap berfungsi.

| Versi 1 | Versi 2 | Catatan |
| --- | --- | --- |
| `data-theme="tps"` | `data-theme="light"` | alias dipertahankan |
| `data-theme="tps-dark"` | `data-theme="dark"` | alias dipertahankan |
| `HeadOptions(Light: "tps", Dark: "tps-dark")` | `HeadOptions()` | bawaan menjadi `light`, `dark`; berikan nama lama untuk mempertahankannya |
| tema `tps` di `tokens.json` | tema `light` dengan `aliases: ["tps"]` | |

Bila CSS atau tes Anda memilih `[data-theme="tps"]`, tidak ada yang berubah. Pindah ke nama baru saat sempat; alias tidak akan dihapus selama versi 2.

## Alamat halaman

Halaman versi 1 memakai slug Indonesia tanpa awalan bahasa. Halaman versi 2 memakai slug Inggris di bawah `/en/` dan `/id/`. Alamat lama dialihkan ke halaman Indonesia yang sesuai, sehingga bookmark dan tautan di dokumen Anda tetap sampai.

| Slug versi 1 | Slug versi 2 |
| --- | --- |
| `pengantar` | [introduction](./introduction.md) |
| `persyaratan` | [requirements](./requirements.md) |
| `instalasi` | [installation](./installation.md) |
| `tema` | [theming](./theming.md) |
| `prinsip` | [principles](./principles.md) |
| `warna` | [color](./color.md) |
| `tipografi` | [typography](./typography.md) |
| `ruang-dan-tata-letak` | [spacing-layout](./spacing-layout.md) |
| `bentuk-dan-elevasi` | [shape-elevation](./shape-elevation.md) |
| `motion` | [motion](./motion.md) |
| `ikon` | [icons](./icons.md) |
| `aksesibilitas` | [accessibility](./accessibility.md) |
| `tombol` | [button](./button.md) |
| `form` | [form](./form.md) |
| `combobox-dan-tanggal` | [combobox](./combobox.md), [date-picker](./date-picker.md) |
| `tabel` | [data-table](./data-table.md), [table](./table.md) |
| `kartu-dan-data` | [card](./card.md), [stat](./stat.md), [chart](./chart.md) |
| `status` | [status](./status.md) |
| `umpan-balik` | [alert](./alert.md), [banner](./banner.md) |
| `notifikasi` | [toast](./toast.md), [notification-center](./notification-center.md) |
| `dialog-dan-menu` | [dialog](./dialog.md), [dropdown-menu](./dropdown-menu.md) |
| `navigasi` | [sidebar](./sidebar.md), [navbar](./navbar.md) |
| `pola-halaman` | [page-patterns](./page-patterns.md) |
| `alur-kerja` | [workflows](./workflows.md) |
| `konten` | [writing](./writing.md), [voice-and-tone](./voice-and-tone.md) |
| `perilaku-js` | [javascript](./javascript.md) |
| `razor-api` | [razor-api](./razor-api.md) |
| `token-referensi` | [tokens](./tokens.md) |
| `contoh-razor` | [razor-demo](./razor-demo.md) |
| `catatan-perubahan` | [changelog](./changelog.md) |
| `peta-asal-tps` | tidak lagi diterbitkan; halaman v1 disimpan di `docs/_legacy` |

## Contoh dan teks

Setiap contoh khusus TPS diganti dengan konten netral domain: proyek (`PRJ-1024`), faktur (`INV-2026-0418`), orang dengan nama dari berbagai lokal, jumlah, dan tanggal. Ilustrasi tangki, status bea cukai, dan pencarian pelabuhan hilang dari contoh dan dari kumpulan token; class grafik (`ds-chart`, `ds-bar`, `ds-donut`) tetap ada. Bila Anda menyalin markup contoh ke produk Anda, markup itu tetap berfungsi; hanya katanya yang berbeda.

## Baru di versi 2

- **Token.** Peran tipe (`--ds-type-<peran>-size|leading|weight|tracking`), state layer (`--ds-opacity-state-*`), token motion spring dan enter, ukuran target (`--ds-size-target`), skala z-index, dan `--ds-focus`. Lihat [Token](./tokens.md).
- **Komponen.** Tombol dan keluarganya, field teks dan pilihan, pemilih, unggah, tampilan data, umpan balik, overlay, navigasi, dan tata letak. Masing-masing punya halaman dengan bagian state, aksesibilitas, Razor, dan JavaScript.
- **Modul JavaScript.** Satu modul per keluarga, API `DS`, dan event `ds:*`. Lihat [JavaScript](./javascript.md).
- **Internasionalisasi.** Inggris dan Indonesia di dalam pustaka: `DsText` dan `Fmt` di C#, `addMessages` di JavaScript. Lihat [Lokalisasi](./localization.md).
- **Preferensi.** Gerak berkurang, transparansi berkurang, kontras lebih, warna paksa, RTL, dan cetak ditangani di `accessibility.css`. Lihat [Aksesibilitas](./accessibility.md).
- **Tag helper.** Jauh lebih banyak elemen `ds-*`; lihat [API Razor dan C#](./razor-api.md).

## Yang perlu diperiksa

Tidak ada yang wajib, tetapi perilaku berikut layak dicek saat memperbarui:

| Periksa | Alasan |
| --- | --- |
| Culture aplikasi | `Fmt.Date`, `Fmt.DateTime`, `Fmt.Decimal`, dan teks partial mengikuti `CultureInfo.CurrentCulture` dan `CurrentUICulture`. Pertahankan keluaran Indonesia dengan menetapkan `id-ID` (misalnya lewat request localization). `Fmt.Number` dan `Fmt.Qty` tetap invarian terhadap culture |
| Bawaan `HeadOptions` | Sekarang `light` dan `dark`. Berikan `Light: "tps", Dark: "tps-dark"` bila stylesheet Anda hanya mendefinisikan nama lama |
| String di partial | `_DsPager`, `_DsPageSize`, `_DsConfirmDialog`, dan `_DsLeaveDialog` membaca `DsText`; bahasa Inggris sebagai cadangan. Timpa string dengan `DsText.Add("id", …)` |
| Gaya `data-theme` khusus | Tata kedua nama, atau hanya yang baru |
| Stylesheet | Bangun ulang dengan `powershell -File tools/css.ps1` agar berkas komponen baru ikut |

## Tidak dibawa

Polling notifikasi, live refresh dengan morphdom, quick add sisi server, penampil XML, impor Excel, dan pencarian pelabuhan adalah fitur produk pertama. Semuanya bukan bagian dari sistem desain.
