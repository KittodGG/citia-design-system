---
title: Citia Design System
group: getting-started
order: 1
summary: Design system yang tenang dan presisi untuk aplikasi ASP.NET Core: token, komponen Razor, dan perilaku JavaScript kecil, terang dan gelap, Indonesia dan Inggris.
---

Citia Design System (DS) adalah satu sumber untuk tampilan dan perilaku aplikasi web. Targetnya ASP.NET Core di .NET 10 (MVC dan Razor Pages) dan tidak terikat pada satu produk: tidak ada bagian yang mengasumsikan bidang usaha tertentu. DS diangkat dari aplikasi operasional yang sudah berjalan di produksi, lalu disusun ulang supaya mencakup seluruh kebutuhan UI aplikasi, dari formulir masuk sampai tabel data padat.

Kesannya premium dan tenang. Permukaan netral, border berupa garis tipis 1px, warna jarang dipakai, dan gerak pendek serta nyaris tak terlihat. Aturan gerak dan interaksi mengikuti prinsip antarmuka cair Apple: merespons saat disentuh, beranimasi dari nilai yang sedang tampil, keluar ke tempat asalnya masuk.

## Untuk siapa

- **Tim yang membangun aplikasi ASP.NET Core dengan render server** dan menginginkan lapisan antarmuka jadi tanpa framework JavaScript atau Node.
- **Desainer dan penulis** yang butuh kosakata bersama: token, state, dan aturan penulisan.
- **Siapa pun yang merilis dalam dua bahasa.** Setiap teks yang dihasilkan DS tersedia dalam bahasa Indonesia dan Inggris, dan bahasa ketiga cukup satu pemanggilan.

## Isi paket

| Bagian | Lokasi | Yang didapat |
| --- | --- | --- |
| Token | `tokens/tokens.json` | Satu sumber DTCG untuk warna, tipografi, spasi, radius, bayangan, gerak, z-index, dan breakpoint, per tema. Dihasilkan menjadi variabel CSS, tema Tailwind, dan C#. |
| Razor Class Library | `src/Citia.DesignSystem` | Tag helper (`<ds-icon>`, `<ds-pill>`, `<ds-empty>`), partial (`_DsHead`, `_DsScripts`, `_DsToast`, `_DsPager`), helper C# (`Icon`, `Fmt`, `Tone`, toast), dan aset statis. |
| Gaya | `Styles/` | Kelas komponen `ds-*` di atas Tailwind CSS v4 dan daisyUI 5, atau `ds.css` jadi. |
| Perilaku | `wwwroot/js/ds.js` | Satu modul ES tanpa dependensi: tema, dialog, menu, tab, combobox, pemilih tanggal, seleksi tabel, toast. Diaktifkan lewat atribut `data-ds-*`. |
| Font dan ikon | `wwwroot/fonts`, `wwwroot/icons` | Font variabel Manrope yang disajikan sendiri dan sprite ikon SVG dengan grid 24px. |
| Situs dokumentasi | `site/Citia.DesignSystem.Docs` | Situs ini: aplikasi Razor Pages yang memakai DS-nya sendiri. |

## Prinsip dalam satu baris

- **Purpose.** Setiap layar punya satu pekerjaan dan satu aksi utama.
- **Agency.** Pengguna tetap memegang kendali: batal, urungkan, konfirmasi sebelum aksi yang tak bisa dibalik.
- **Responsibility.** Label menyebut apa yang dilakukan sebuah aksi.
- **Familiarity.** Pakai perilaku platform dan pola standar sebelum menciptakan yang baru.
- **Flexibility.** Terang dan gelap, keyboard dan sentuh, gerak dikurangi, dua bahasa.
- **Simplicity.** Kurangi keputusan, pertahankan informasi.
- **Craft.** Token untuk setiap nilai, kontras diuji, tanpa angka ajaib.
- **Delight.** Umpan balik kecil, fisik, dan cepat; bukan hiasan.

Rinciannya, lengkap dengan angka, ada di [Prinsip](./principles.md).

## Susunan dokumentasi

| Kelompok | Dibaca untuk |
| --- | --- |
| Mulai | Persyaratan, instalasi, halaman pertama, tema, peta repositori. |
| Fondasi | Prinsip, warna, tipografi, spasi, bentuk, gerak, state, aksesibilitas, lokalisasi, ikon. |
| Komponen | Satu halaman per komponen, dikelompokkan per kategori: aksi, form, tampilan data, umpan balik, overlay, navigasi, tata letak. Masing-masing berisi contoh langsung, tabel state, catatan aksesibilitas, serta API Razor dan JavaScript. |
| Pola | Tata letak halaman, form, tampilan data, alur kerja, umpan balik. |
| Konten | Penulisan serta suara dan nada. |
| Referensi | JavaScript, API Razor, cakupan, migrasi dari versi 1, catatan perubahan. |

Pratinjau langsung memakai CSS dan JavaScript yang sama dengan aplikasi. Bilah di atas tiap pratinjau mengganti tema pratinjau itu: ikut situs, terang, atau gelap. Pencarian dibuka dengan `Ctrl K` (`Cmd K` di macOS) atau `/`, dan pilihan bahasa serta tema ada di kaki sidebar.

## Mulai dari sini

1. Periksa [persyaratan](./requirements.md): .NET 10 SDK dan browser terkini.
2. [Pasang](./installation.md) pustakanya dan tambahkan empat partial ke layout.
3. Bangun halaman pertama lewat [panduan cepat](./quick-start.md).
4. Telusuri komponen, mulai dari [Button](./button.md) dan [Field](./field.md).

> [!NOTE]
> Halaman ini juga tersedia dalam [English](../en/introduction.md). Kedua bahasa lengkap dan dirawat bersama.
