---
title: Citia Design System
group: Mulai
order: 1
summary: Token, komponen, perilaku, dan pola UI untuk aplikasi ASP.NET Core Citia Engineering, diturunkan dari INTEGRA TPS Integration versi terbaru.
source: TPS Integration branch feature/tps-integration, commit 88cd8e4 (Styles/app.css, DESIGN.md, Views, Helpers, wwwroot/js)
---

Citia Design System (DS) adalah satu sumber untuk tampilan dan perilaku aplikasi web Citia. Isinya diangkat dari TPS Integration yang sudah dipakai operator terminal di Production, lalu dirapikan supaya bisa dipasang ulang di proyek ASP.NET Core berikutnya tanpa menyalin file satu per satu.

## Isi paket

| Bagian | Lokasi | Untuk apa |
| --- | --- | --- |
| Token | `tokens/tokens.json` | Sumber tunggal warna, tipografi, spasi, radius, bayangan, motion, z-index, breakpoint. Format DTCG. |
| Tool token | `tools/tokens.cs` | Aplikasi C# satu file (.NET 10). Membangun CSS, JSON, set ikon, halaman referensi, dan memeriksa kontras WCAG. |
| Razor Class Library | `src/Citia.DesignSystem` | Tag helper (`<ds-icon>`, `<ds-pill>`, `<ds-tag>`, `<ds-empty>`), partial (`_DsHead`, `_DsToast`, `_DsPager`, `_DsSidebarNav`, …), helper C# (`Icon`, `Fmt`, `Wib`, `ListSort`, `Tone`), dan aset statis. |
| CSS sumber | `src/Citia.DesignSystem/Styles` | Komponen `ds-*` di atas Tailwind CSS v4 + daisyUI 5. Diimpor oleh build CSS aplikasi. |
| CSS jadi | `/_content/Citia.DesignSystem/css/ds.css` | Untuk aplikasi tanpa Tailwind: preflight, daisyUI, token, dan semua komponen. |
| Perilaku | `/_content/Citia.DesignSystem/js/ds.js` | Modul JavaScript tanpa dependensi: tema, sidebar, dialog, konfirmasi, toast, guard perubahan, tabel, combobox. |
| Font dan ikon | `/_content/Citia.DesignSystem/fonts`, `/icons` | Manrope variable (OFL) dan 73 ikon TPS dalam JSON + sprite SVG. |
| Situs dokumentasi | `site/Citia.DesignSystem.Docs` | Situs ini: ASP.NET Core Razor Pages yang memakai DS-nya sendiri. |
| Dokumen | `docs/*.md` | Isi situs ini, juga terbaca di GitHub. |

## Cara kerjanya

```text
tokens/tokens.json ──► dotnet run tools/tokens.cs ──► Styles/generated/tokens.css (variabel per tema)
                                                  ├─► Styles/generated/tailwind-theme.css (utilitas Tailwind)
                                                  ├─► wwwroot/tokens/tokens.json + contrast.json
                                                  ├─► Icons/IconSet.g.cs + wwwroot/icons/sprite.svg
                                                  └─► docs/token-referensi.md

Styles/ds.css (token + komponen) ──► Tailwind standalone CLI + daisyUI ──► css aplikasi atau ds.css jadi
Razor Class Library ──► ProjectReference / paket NuGet ──► _Layout.cshtml aplikasi
```

Aplikasi konsumen tidak perlu Node.js. CSS dibangun dengan binari Tailwind standalone yang di-pin dan diverifikasi SHA-256, sama seperti TPS (`tools/css.ps1`).

## Mulai dalam tiga langkah

1. Penuhi [persyaratan](./persyaratan.md): .NET SDK 10, PowerShell, dan (opsional) Docker.
2. Ikuti [instalasi](./instalasi.md): tambahkan referensi `Citia.DesignSystem`, pasang `_DsHead`, `_DsScripts`, dan partial dialog di layout.
3. Bangun halaman dari [pola halaman](./pola-halaman.md) dan [komponen](./tombol.md). Ganti warna merek lewat [tema](./tema.md) bila proyeknya bukan TPS.

```powershell
git clone <repo>/citia-design-system
cd citia-design-system
powershell -NoProfile -File tools/css.ps1      # unduh Tailwind + daisyUI terverifikasi, bangun CSS
dotnet run tools/tokens.cs                     # bangun ulang token (hanya bila tokens.json berubah)
dotnet run --project site/Citia.DesignSystem.Docs
```

Situs dokumentasi berjalan di `http://localhost:5180`.

## Cara membaca dokumentasi

- **Navigasi kiri** berisi semua halaman per kelompok: Mulai, Fondasi, Komponen, Pola, Konten, Referensi.
- **Peta kanan** ("Di halaman ini") mengikuti posisi baca. Titik terang menandai bagian aktif; titik kosong menandai bagian sebelumnya ke arah gulir.
- **Pratinjau langsung** memakai CSS dan JavaScript DS yang sama dengan aplikasi. Tombol **Terang/Gelap** di kepala pratinjau mengganti tema pratinjau itu saja.
- **Pencarian** dibuka dengan `Ctrl K` (macOS `⌘ K`) atau `/`.
- Pilihan tema situs ada di kaki sidebar: Terang, Gelap, atau Sistem (mengikuti sistem operasi).

> [!NOTE]
> Setiap halaman komponen mencantumkan **Asal TPS**: kelas, file, dan nomor baris di TPS Integration commit `88cd8e4`. Peta lengkapnya ada di [Peta asal TPS](./peta-asal-tps.md).

## Prinsip singkat

- Operator dulu: data padat, keyboard dan sentuh, dua tema setara.
- Satu aksi utama per area. Kirim selalu paling kanan.
- Status berupa kata. Warna hanya menguatkan.
- Permukaan solid, border tenang, bayangan hanya untuk lapisan melayang.
- Semua kontrol minimal 44 px. Fokus selalu terlihat.
- Motion ringan yang menjelaskan perubahan, dan berhenti bila pengguna meminta gerak dikurangi.

Rinciannya di [Prinsip](./prinsip.md).

## Versi dan asal

| Item | Nilai |
| --- | --- |
| Versi DS | 1.0.0 |
| Sumber | INTEGRA TPS Integration, branch `feature/tps-integration`, commit `88cd8e4` (2 Nov 2026) |
| Target | ASP.NET Core .NET 10 (`net10.0`), MVC dan Razor Pages |
| CSS | Tailwind CSS 4.3.3 standalone + daisyUI 5.7.47 |
| Tema | `tps` (terang, bawaan) dan `tps-dark` (gelap) |
| Pemilik | Citia Engineering Indonesia |

Perubahan antarversi dicatat di [Catatan perubahan](./catatan-perubahan.md).
