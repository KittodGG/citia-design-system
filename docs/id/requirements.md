---
title: Persyaratan
group: getting-started
order: 2
summary: SDK, alat, dan versi browser yang dibutuhkan untuk memakai Citia Design System, serta apa yang terjadi di browser yang belum punya fitur terbaru.
---

DS hanya membutuhkan .NET 10 SDK untuk berjalan. Node.js tidak pernah dibutuhkan. Build Tailwind bersifat opsional.

## Mesin pengembang

| Kebutuhan | Versi | Keterangan |
| --- | --- | --- |
| .NET SDK | 10.0.100 atau lebih baru | Repositori mengunci `10.0.100` di `global.json` dengan `rollForward: latestFeature`. Aplikasi yang mereferensikan DS menargetkan `net10.0`. |
| Sistem operasi | Windows 10/11, macOS 13+, Linux x64 | Skrip CSS menyertakan binari terverifikasi untuk Windows x64 dan Linux x64. |
| Tailwind CSS standalone CLI | 4.3.3 | Opsional. Hanya untuk [instalasi opsi B](./installation.md#option-b). Satu file eksekusi, tanpa Node. |
| daisyUI | 5.7.47 | Opsional, syarat yang sama. Diunduh sebagai `daisyui.mjs` dan diverifikasi dengan SHA-256. |
| PowerShell | 5.1 atau 7+ | Menjalankan `tools/css.ps1`. Di sistem lain, unduh binarinya secara manual. |
| Editor | Visual Studio, Rider, atau VS Code dengan C# Dev Kit | Ekstensi Tailwind CSS IntelliSense bersifat opsional. |

Periksa SDK dengan `dotnet --list-sdks`; harus ada baris `10.0.x`.

```powershell
# Seluruh mesin (administrator)
winget install Microsoft.DotNet.SDK.10

# Per pengguna, tanpa hak administrator, PATH tidak diubah
Invoke-WebRequest https://dot.net/v1/dotnet-install.ps1 -OutFile $env:TEMP\dotnet-install.ps1
& $env:TEMP\dotnet-install.ps1 -Channel 10.0 -InstallDir "$env:LOCALAPPDATA\Microsoft\dotnet" -NoPath
```

## Server

| Kebutuhan | Versi |
| --- | --- |
| ASP.NET Core runtime | 10.x (`mcr.microsoft.com/dotnet/aspnet:10.0`) |
| Database, CDN, layanan pihak ketiga | Tidak ada. DS tidak melakukan panggilan jaringan. |

Font disajikan sendiri: Manrope variable, subset Latin dan Latin Extended, dari `/_content/Citia.DesignSystem/fonts/`. Tidak ada yang dimuat dari Google Fonts atau origin lain, sehingga DS berjalan di jaringan tertutup dan lolos Content Security Policy ketat dengan `font-src 'self'`.

## Browser

DS memakai fitur platform terkini tanpa polyfill. Fitur inti menentukan versi minimum; peningkatan progresif menambah kehalusan bila tersedia dan dilewati begitu saja bila tidak.

| Fitur | Dipakai untuk | Chrome / Edge | Firefox | Safari |
| --- | --- | --- | --- | --- |
| `@layer` | Urutan cascade token, base, komponen | 99 | 97 | 15.4 |
| `:has()` | Kartu terpilih, baris pilihan, state baris tabel | 105 | 121 | 15.4 |
| `color-mix()` | Semua tint, lapisan hover, dan border | 111 | 113 | 16.2 |
| `:user-invalid` | Validasi tampil hanya setelah interaksi | 119 | 88 | 16.5 |
| CSS nesting | Sumber komponen | 120 | 117 | 17.2 |
| Popover API | Menu, popover, tooltip, daftar combobox | 114 | 125 | 17 |
| `@starting-style` | Animasi masuk popover, dialog, toast | 117 | 129 | 17.5 |
| `<dialog>` dan `showModal()` | Dialog, sheet, command palette | 37 | 98 | 15.4 |

**Batas dukungan: Chrome dan Edge 120, Firefox 129, Safari 17.5 ke atas** (macOS, iOS, iPadOS). Di bawahnya, teks dan form masih berfungsi, tetapi menu dan overlay tidak didukung.

Peningkatan progresif, semuanya opsional:

| Fitur | Efek bila tersedia | Bila tidak ada |
| --- | --- | --- |
| `field-sizing: content` (Chrome 123, Safari 26.2) | Textarea tumbuh mengikuti teks | Jumlah baris tetap dengan gulir biasa |
| `interpolate-size: allow-keywords` (Chrome 129) | Pembukaan tinggi collapsible dan accordion beranimasi | Konten terbuka tanpa animasi tinggi |
| `anchor-positioning` (Chrome 125, Safari 26) | Penempatan overlay lewat CSS | Penempatan lewat JavaScript (`placeFloating`) |
| View Transitions (Chrome 111, Safari 18) | Cross-fade halus saat tema berganti | Perubahan seketika |
| `text-wrap: balance` (Chrome 114, Safari 17.5) | Pemenggalan judul yang seimbang | Pemenggalan biasa |

> [!NOTE]
> Tanpa `@starting-style`, overlay tetap terbuka dan tertutup dengan benar; hanya animasi masuk 160 sampai 220 ms yang dilewati. Dukungan `prefers-reduced-motion` tidak mengubah apa pun karena DS hanya menganimasikan transform, opacity, dan warna.

## Standar

- WCAG 2.2 AA: 4.5:1 untuk teks, 3:1 untuk batas dan ikon, target minimal 24px (44px pada pointer kasar). Ke-72 pasangan warna diperiksa saat token dibangun.
- Tata letak kanan-ke-kiri berfungsi lewat properti CSS logis; setel `dir="rtl"` di `<html>`.
- Lisensi font: SIL OFL 1.1. Simpan `OFL.txt` bersama file font.

Berikutnya: [Instalasi](./installation.md).
