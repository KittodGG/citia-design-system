---
title: Instalasi
group: Mulai
order: 3
summary: Memasang Citia Design System di proyek ASP.NET Core (MVC atau Razor Pages), membangun CSS tanpa Node, dan menjalankan situs dokumentasi.
source: TPS Integration tools/css.ps1, TPS.Integration.csproj (target BuildCss), Dockerfile, Views/Shared/_Layout.cshtml
---

Dua cara memakai CSS: **dibangun bersama aplikasi** (disarankan, sama seperti TPS) atau **CSS jadi** tanpa Tailwind. Bagian lain (Razor, JavaScript, font, ikon) sama untuk keduanya.

## Susunan folder yang disarankan

Letakkan repo DS bersebelahan dengan proyek aplikasi. Semua contoh di halaman ini memakai susunan ini:

```text
D:\citia_engineering\
├─ citia-design-system\          ← repo ini
│  ├─ .tools\                    ← Tailwind CLI + daisyUI (diunduh tools/css.ps1)
│  └─ src\Citia.DesignSystem\
└─ ProyekBaru\
   └─ ProyekBaru.Web\            ← aplikasi ASP.NET Core
      ├─ Styles\app.css
      └─ wwwroot\css\app.css     ← hasil build
```

Untuk repo terpisah di Git, tambahkan DS sebagai submodule:

```bash
git submodule add <url-repo>/citia-design-system.git external/citia-design-system
```

Sesuaikan path relatif di contoh bila memakai `external/`.

## Langkah 1: siapkan DS

```powershell
cd D:\citia_engineering\citia-design-system
powershell -NoProfile -File tools/css.ps1          # unduh + verifikasi Tailwind dan daisyUI, bangun ds.css dan docs.css
dotnet build Citia.DesignSystem.sln                # pastikan RCL dan situs docs terbangun
```

## Langkah 2: referensikan Razor Class Library

```powershell
cd D:\citia_engineering\ProyekBaru\ProyekBaru.Web
dotnet add reference ..\..\citia-design-system\src\Citia.DesignSystem\Citia.DesignSystem.csproj
```

Atau sebagai paket NuGet internal:

```powershell
dotnet pack ..\..\citia-design-system\src\Citia.DesignSystem -c Release -o D:\nuget-lokal
dotnet nuget add source D:\nuget-lokal --name citia-lokal
dotnet add package Citia.DesignSystem --version 1.0.0
```

Aset statis RCL otomatis tersedia di `/_content/Citia.DesignSystem/` (font, `ds.js`, `ds.css`, ikon, token). Pastikan pipeline memetakan aset statis:

```csharp
var app = builder.Build();
app.MapStaticAssets();                 // .NET 9+; atau app.UseStaticFiles()
app.MapRazorPages().WithStaticAssets();
app.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}").WithStaticAssets();
```

## Langkah 3: impor namespace dan tag helper

`Views/_ViewImports.cshtml` (MVC) atau `Pages/_ViewImports.cshtml` (Razor Pages):

```cshtml
@using Citia.DesignSystem.Icons
@using Citia.DesignSystem.Ui
@using Citia.DesignSystem.Formatting
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Citia.DesignSystem
```

## Langkah 4: pasang di layout

```cshtml
<!DOCTYPE html>
<html lang="id" data-theme="tps">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>@ViewData["Title"] - ProyekBaru</title>
    @* Tema dipasang sebelum stylesheet: tidak ada kilatan terang saat mode gelap. *@
    <partial name="_DsHead" model='new HeadOptions(Stylesheet: "~/css/app.css")' />
</head>
<body>
    <partial name="_DsIconSprite" />
    <a class="ds-skip-link btn btn-primary btn-sm" href="#main">Lewati ke konten</a>

    @RenderBody()

    <partial name="_DsToast" />
    <partial name="_DsConfirmDialog" />
    <partial name="_DsLeaveDialog" />
    <partial name="_DsScripts" />
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```

Kerangka lengkap dengan sidebar dan top bar ada di [Pola halaman](./pola-halaman.md#app-shell).

## Langkah 5a: CSS dibangun bersama aplikasi (disarankan)

Buat `Styles/app.css` di proyek aplikasi:

```css
@import "tailwindcss" source(none);
@plugin "../../../citia-design-system/.tools/daisyui.mjs" {
  themes: false;
  logs: false;
}
@import "../../../citia-design-system/src/Citia.DesignSystem/Styles/ds.css";

/* Kelas utilitas yang dipakai aplikasi dan partial DS */
@source "../Views";
@source "../Pages";
@source "../Areas";
@source "../wwwroot/js";
@source "../../../citia-design-system/src/Citia.DesignSystem/Views";

/* CSS khusus aplikasi di bawah ini */
```

Tambahkan target build di `ProyekBaru.Web.csproj`, sama seperti TPS:

```xml
<PropertyGroup>
  <CitiaDs>$(MSBuildProjectDirectory)\..\..\citia-design-system</CitiaDs>
</PropertyGroup>
<Target Name="BuildCss" BeforeTargets="BeforeBuild"
        Condition="$([MSBuild]::IsOSPlatform('Windows')) And Exists('$(CitiaDs)\.tools\tailwindcss.exe')">
  <Exec Command="&quot;$(CitiaDs)\.tools\tailwindcss.exe&quot; -i Styles\app.css -o wwwroot\css\app.css --minify"
        StandardErrorImportance="low" />
</Target>
```

Saat mengembangkan tampilan, jalankan mode pantau:

```powershell
..\..\citia-design-system\.tools\tailwindcss.exe -i Styles\app.css -o wwwroot\css\app.css --watch
```

> [!IMPORTANT]
> `wwwroot/css/app.css` adalah hasil build. Masukkan ke `.gitignore` seperti TPS dan bangun ulang setelah `git pull`.

## Langkah 5b: CSS jadi tanpa Tailwind

Untuk aplikasi kecil atau halaman statis, cukup pakai `ds.css` bawaan RCL. `_DsHead` tanpa model sudah menautkannya:

```cshtml
<partial name="_DsHead" />
```

`ds.css` berisi preflight, semua komponen daisyUI, token, dan komponen `ds-*`, tetapi **tanpa utilitas Tailwind** (`flex`, `gap-2`, dan sejenisnya). Tulis tata letak khusus dengan CSS biasa dan variabel token (`var(--ds-space-4)`, `var(--color-base-100)`).

## Langkah 6: pakai komponen

```cshtml
@* Controller: setelah simpan, redirect + toast *@
this.Toast(Tone.Success, "Tangki tersimpan", "T-01 siap dipakai di dokumen pemasukan.");
return RedirectToAction(nameof(Index));
```

```cshtml
<header class="ds-page-header">
    <div>
        <p class="ds-eyebrow">Data master</p>
        <h1 class="ds-page-title">Tangki</h1>
    </div>
    <div class="ds-actions">
        <a asp-action="Create" class="btn btn-primary"><ds-icon name="plus" /> Tambah tangki</a>
    </div>
</header>
<ds-pill tone="Success">Aktif</ds-pill>
```

## Docker

Stage CSS membutuhkan sumber DS di build context. Contoh untuk aplikasi yang menyimpan DS sebagai submodule `external/citia-design-system`:

```dockerfile
FROM debian:bookworm-slim AS css
WORKDIR /src
ADD --checksum=sha256:dc61b3ac6b8c9ca874c0cc4c57b2409791a64c5540404ca5f5367360babc313a --chmod=755 \
    https://github.com/tailwindlabs/tailwindcss/releases/download/v4.3.3/tailwindcss-linux-x64 /usr/local/bin/tailwindcss
COPY external/citia-design-system ./external/citia-design-system
ADD --checksum=sha256:85819d3fe86a852237b439b13f481481aac58e562ac47694cd11c3038e994f2a \
    https://github.com/saadeghi/daisyui/releases/download/v5.7.47/daisyui.mjs ./external/citia-design-system/.tools/daisyui.mjs
COPY ProyekBaru.Web ./ProyekBaru.Web
WORKDIR /src/ProyekBaru.Web
RUN tailwindcss -i Styles/app.css -o wwwroot/css/app.css --minify

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY . .
COPY --from=css /src/ProyekBaru.Web/wwwroot/css/app.css ProyekBaru.Web/wwwroot/css/app.css
RUN dotnet publish ProyekBaru.Web -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
USER app
ENV ASPNETCORE_HTTP_PORTS=8080
COPY --from=build --chown=app:app /app/publish .
ENTRYPOINT ["dotnet", "ProyekBaru.Web.dll"]
```

Situs dokumentasi DS punya `Dockerfile` sendiri di `site/Citia.DesignSystem.Docs/Dockerfile` dengan pola yang sama.

## Menjalankan situs dokumentasi

```powershell
cd D:\citia_engineering\citia-design-system
powershell -NoProfile -File tools/css.ps1 -Target docs
dotnet run --project site/Citia.DesignSystem.Docs        # http://localhost:5180
```

Isi situs adalah `docs/*.md`. Perubahan Markdown langsung terbaca saat halaman dimuat ulang; perubahan CSS butuh `tools/css.ps1 -Target docs` (atau `-Watch`).

Docker:

```powershell
docker build -f site/Citia.DesignSystem.Docs/Dockerfile -t citia-ds-docs .
docker run --rm -p 8090:8080 citia-ds-docs                  # http://localhost:8090
```

## Path base {#path-base}

Bila aplikasi berjalan di sub-path (misalnya `https://host/tps/`), `~/` di Razor sudah menyertakan `PathBase`, tetapi URL font di CSS bersifat absolut. Pilih salah satu:

1. Sajikan aplikasi di root domain atau subdomain (disarankan).
2. Salin font ke `wwwroot/fonts/manrope/` aplikasi dan ganti impor `fonts.css` dengan `fonts.root.css` yang memakai `/fonts/manrope/` (sesuaikan prefiksnya).

## Pemeriksaan setelah instalasi

- [ ] `<html>` punya `data-theme`, `data-ds-mode`, dan `data-ds-scheme` setelah halaman dimuat.
- [ ] `/_content/Citia.DesignSystem/js/ds.js` dan font Manrope merespons 200 (tab Network).
- [ ] Tombol `data-ds-theme-toggle` mengganti tema dan pilihan bertahan setelah reload.
- [ ] Toast dari `this.Toast(...)` muncul setelah redirect.
- [ ] Tab dari awal halaman: tautan "Lewati ke konten" muncul, cincin fokus terlihat di semua kontrol.
- [ ] `dotnet run tools/tokens.cs` di repo DS berakhir dengan "All required pairs pass".

## Masalah umum

| Gejala | Penyebab | Perbaikan |
| --- | --- | --- |
| `Can't resolve 'daisyui'` saat build CSS | Path `@plugin` salah atau `.tools` belum diunduh | Jalankan `tools/css.ps1` di repo DS; periksa path relatif dari `Styles/app.css` |
| Kelas utilitas (`flex`, `gap-2`) tidak ada | Folder view tidak terdaftar di `@source` | Tambahkan `@source` untuk folder yang memakai kelas itu |
| Kilatan tema terang saat buka halaman | `_DsHead` dipasang setelah stylesheet lain | Taruh `_DsHead` sebelum `<link>` CSS lain |
| Ikon `<use href="#ds-icon-…">` kosong | Sprite belum dirender | Tambahkan `<partial name="_DsIconSprite" />` sekali per halaman |
| Toast tidak muncul | `_DsToast` tidak ada di layout, atau tidak ada redirect setelah `Toast()` | Pasang partial; pakai pola Post/Redirect/Get |
| Font 404 di sub-path | URL absolut `/_content/...` | Lihat [Path base](#path-base) |
| `dotnet` menolak `net10.0` | SDK 10 belum terpasang | Lihat [Persyaratan](./persyaratan.md#memasang-net-sdk-10) |
