---
title: Persyaratan
group: Mulai
order: 2
summary: Perangkat lunak, versi, dan dukungan browser yang dibutuhkan untuk memakai, membangun, dan menjalankan Citia Design System.
source: TPS Integration TPS.Integration.csproj (net10.0), tools/css.ps1, Dockerfile
---

DS mengikuti tumpukan TPS Integration: ASP.NET Core .NET 10, CSS dari Tailwind CSS v4 + daisyUI 5 lewat binari standalone, tanpa Node.js.

## Mesin pengembang

| Kebutuhan | Versi | Keterangan |
| --- | --- | --- |
| Sistem operasi | Windows 10/11, macOS 13+, atau Linux x64 | Skrip CSS bawaan menyiapkan binari Windows x64 dan Linux x64. Untuk macOS tambahkan aset rilis yang sesuai ke `tools/css.ps1`. |
| .NET SDK | 10.0.100 atau lebih baru | `global.json` mengunci `10.0.100` dengan `rollForward: latestFeature`. |
| PowerShell | Windows PowerShell 5.1 atau PowerShell 7+ | Menjalankan `tools/css.ps1`. |
| Git | 2.40+ | Mengambil repo DS, opsional sebagai submodule. |
| Akses internet | Hanya saat pertama | Mengunduh Tailwind CLI 4.3.3 (± 110 MB) dan daisyUI 5.7.47 dari GitHub Releases, lalu memverifikasi SHA-256. |
| Docker Desktop | 4.x, opsional | Build image situs dokumentasi atau aplikasi konsumen. |
| Editor | Visual Studio 2026, Rider, atau VS Code + C# Dev Kit | Ekstensi Tailwind CSS IntelliSense opsional. |

> [!TIP]
> Tanpa internet, salin isi folder `.tools/` dari TPS Integration (`TPS.Integration/.tools/`). Versi dan hash-nya sama persis, jadi `tools/css.ps1` langsung memakainya.

### Memasang .NET SDK 10

```powershell
# Seluruh sistem (butuh admin)
winget install Microsoft.DotNet.SDK.10

# Per pengguna, tanpa admin dan tanpa mengubah PATH
Invoke-WebRequest https://dot.net/v1/dotnet-install.ps1 -OutFile $env:TEMP\dotnet-install.ps1
& $env:TEMP\dotnet-install.ps1 -Channel 10.0 -InstallDir "$env:LOCALAPPDATA\Microsoft\dotnet" -NoPath
& "$env:LOCALAPPDATA\Microsoft\dotnet\dotnet.exe" --list-sdks
```

Periksa hasilnya dengan `dotnet --list-sdks`; harus ada baris `10.0.x`.

## Versi yang di-pin

| Komponen | Versi | Di mana |
| --- | --- | --- |
| Target framework | `net10.0` | `Directory.Build.props` |
| Tailwind CSS standalone CLI | 4.3.3 | `tools/css.ps1`, `Dockerfile` |
| daisyUI | 5.7.47 (`daisyui.mjs`, `daisyui-theme.mjs`) | `tools/css.ps1`, `Dockerfile` |
| Manrope variable | 5.3.0 (@fontsource-variable), subset latin + latin-ext | `wwwroot/fonts/manrope` |
| Cally (kalender web component) | dari TPS, lisensi MIT | `wwwroot/lib/cally` |
| Markdig | 1.5.1 | Hanya situs dokumentasi |

Hash SHA-256 binari:

| File | SHA-256 |
| --- | --- |
| `tailwindcss-windows-x64.exe` 4.3.3 | `e0e260ce048014e9268f6237ff18f8ccf02cef521cbd0ae04e82c2cdf7aa3955` |
| `tailwindcss-linux-x64` 4.3.3 | `dc61b3ac6b8c9ca874c0cc4c57b2409791a64c5540404ca5f5367360babc313a` |
| `daisyui.mjs` 5.7.47 | `85819d3fe86a852237b439b13f481481aac58e562ac47694cd11c3038e994f2a` |
| `daisyui-theme.mjs` 5.7.47 | `d92d2f488933dab757f046e81ebd4986e51e9423307798dc3545d09a15542c89` |

Naikkan versi bersamaan di `tools/css.ps1`, `Dockerfile`, dan halaman ini. Hash yang tidak cocok membuat skrip berhenti dan menghapus file unduhan.

## Server

| Kebutuhan | Versi |
| --- | --- |
| ASP.NET Core Runtime | 10.x (`mcr.microsoft.com/dotnet/aspnet:10.0`) |
| Reverse proxy | Opsional (nginx/IIS). Font memakai URL absolut `/_content/Citia.DesignSystem/...`; bila aplikasi dipasang di sub-path, lihat [instalasi](./instalasi.md#path-base). |

Tidak ada database, layanan pihak ketiga, atau CDN yang dibutuhkan DS.

## Browser yang didukung

DS memakai fitur CSS dan HTML modern tanpa polyfill. Versi minimum mengikuti fitur yang paling baru dipakai:

| Fitur | Dipakai untuk | Chrome / Edge | Firefox | Safari |
| --- | --- | --- | --- | --- |
| `color-mix()` | Semua tint, teks redup, hover | 111 | 113 | 16.2 |
| `:has()` | Kartu pilihan, label checkbox, tabel | 105 | 121 | 15.4 |
| `<dialog>` + `showModal()` | Dialog, konfirmasi, pencarian | 37 | 98 | 15.4 |
| Popover API | Menu baris, kalender | 114 | 125 | 17 |
| CSS nesting via Tailwind v4 output | Seluruh CSS | 112 | 117 | 16.5 |
| `@property` | Variabel animasi ilustrasi | 85 | 128 | 16.4 |
| `text-wrap: balance` | Judul | 114 | 121 | 17.5 (diabaikan bila belum ada) |
| View Transitions | Pergantian tema dan halaman | 111 | 144 | 18 (diabaikan bila belum ada) |
| Anchor positioning | Posisi kalender TPS | 125 | belum | 26 (ada fallback) |

**Minimum yang didukung:** Chrome/Edge 114+, Firefox 128+, Safari 17+ (macOS dan iOS). Browser lama tetap membaca konten, tetapi tint dan menu bisa tampil tanpa warna campuran.

## Aksesibilitas dan standar

- Target WCAG 2.2 AA. Kontras dicek otomatis oleh `dotnet run tools/tokens.cs`.
- Bahasa antarmuka Indonesia (`lang="id"`), format angka dan tanggal mengikuti [Bahasa dan konten](./konten.md).
- Lisensi font OFL 1.1 mengizinkan penyertaan di aplikasi; simpan `OFL.txt` bersama file font.
