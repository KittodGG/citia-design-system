---
title: Instalasi
group: getting-started
order: 3
summary: Satu perintah memasang Citia Design System ke aplikasi ASP.NET Core. Lalu pakai, pasang tanpa internet, atau atur bahasa, tema, dan Tailwind.
---

## Pasang

Di folder proyek web Anda, yang berisi `.csproj`:

```powershell
irm https://design.citia-engineering.com/install.ps1 | iex
```

Lalu `dotnet run`. Selesai.

Perintah ini menambahkan paket `Citia.DesignSystem`, `nuget.config` untuk feed Citia, namespace ke `_ViewImports.cshtml`, dan empat partial ke `_Layout.cshtml`. Jalankan lagi untuk memperbarui. Butuh .NET 10 SDK dan PowerShell, yang sudah ada di Windows; di macOS dan Linux jalankan di dalam `pwsh`.

### Mesin tanpa internet {#offline}

1. Unduh `citia-ds-offline-<versi>.zip` dari [rilis terbaru di GitHub](https://github.com/KittodGG/citia-design-system/releases/latest), lalu salin ke mesin tersebut.
2. Ekstrak, lalu jalankan ini dari folder proyek web:

   ```powershell
   powershell -ExecutionPolicy Bypass -File C:\ds\install-citia-ds.ps1 -From C:\ds
   ```

Paketnya masuk ke folder `packages` di samping solution. Commit `packages/` dan `nuget.config`, maka setiap clone dan build server bisa restore tanpa internet.

## Pakai

Tulis komponen di view mana pun:

```cshtml
<ds-alert tone="Success" title="Terpasang">Citia Design System siap dipakai.</ds-alert>

<form method="post" class="ds-fieldset">
    <ds-field asp-for="Name" label="Nama proyek" hint="Tampil di daftar." />
    <button type="submit" class="btn btn-primary">Simpan</button>
</form>
```

Setelah menyimpan, konfirmasi dengan toast lalu redirect:

```csharp
this.Toast(Tone.Success, "Proyek tersimpan");
return RedirectToPage();
```

Setiap halaman komponen menampilkan markup dan tag helper-nya. Bangun satu layar utuh lewat [panduan cepat](./quick-start.md).

> [!NOTE]
> Template bawaan ASP.NET Core menautkan Bootstrap di `_Layout.cshtml`. Bootstrap menimpa gaya `.btn` dan kontrol form dari design system, jadi hapus `<link>` itu. Installer memberi peringatan kalau menemukannya.

## Opsi installer

| Opsi | Bawaan | Fungsi |
| --- | --- | --- |
| `-Project` | folder saat ini | Folder proyek web atau `.csproj`. |
| `-From` | `feed` | Sumber paket: `feed`, `github`, file `.nupkg`, folder, atau `.zip` offline. |
| `-Version` | stabil terbaru | Versi yang dipasang, misalnya `2.0.2`. |
| `-Vendor` | mati | Simpan paket di `packages/` walau online, jadi aplikasi tidak pernah butuh feed. |
| `-NoWire` | mati | Hanya menambahkan paket; `_ViewImports` dan layout tidak diubah. |

Dengan `irm`, berikan opsi seperti ini:

```powershell
& ([scriptblock]::Create((irm https://design.citia-engineering.com/install.ps1))) -Version 2.0.2 -Vendor
```

## Pasang manual

Ini yang dilakukan installer.

1. Taruh `nuget.config` di samping solution. Mapping-nya mengambil `Citia.*` hanya dari feed Citia dan paket lain hanya dari nuget.org.

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <packageSources>
       <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
       <add key="citia" value="https://design.citia-engineering.com/nuget/v3/index.json" />
     </packageSources>
     <packageSourceMapping>
       <packageSource key="nuget.org"><package pattern="*" /></packageSource>
       <packageSource key="citia"><package pattern="Citia.*" /></packageSource>
     </packageSourceMapping>
   </configuration>
   ```

   Untuk offline, pakai `<add key="citia-local" value="packages" />` dengan `.nupkg` di folder itu, dan petakan `Citia.*` ke `citia-local`.

2. Di folder proyek web: `dotnet add package Citia.DesignSystem`.
3. Tambahkan ke `Pages/_ViewImports.cshtml` (Razor Pages) atau `Views/_ViewImports.cshtml` (MVC):

   ```cshtml
   @using Citia.DesignSystem.Icons
   @using Citia.DesignSystem.Ui
   @using Citia.DesignSystem.Formatting
   @using Citia.DesignSystem.Localization
   @addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
   @addTagHelper *, Citia.DesignSystem
   ```

4. Tambahkan partial ke layout:

   ```cshtml
   <html lang="id" data-theme="light">
   <head>
       <partial name="_DsHead" />          @* pertama di <head>: tema sebelum halaman tampil, stylesheet *@
       ...
   </head>
   <body>
       <partial name="_DsIconSprite" />    @* sprite ikon, sekali per halaman *@
       ...
       <partial name="_DsToast" />         @* area toast dan toast dari this.Toast(...) *@
       <partial name="_DsScripts" />       @* ds.js *@
   </body>
   </html>
   ```

Tambahkan `_DsConfirmDialog` dan `_DsLeaveDialog` kalau memakai dialog konfirmasi dan penjaga perubahan yang belum disimpan. Untuk sidebar dan top bar lihat [Pola halaman](./page-patterns.md).

## Bahasa dan tema

Pustaka ini berbahasa Inggris dan Indonesia. Biarkan request yang menentukan, di `Program.cs`:

```csharp
string[] languages = ["en", "id"];
app.UseRequestLocalization(new RequestLocalizationOptions()
    .SetDefaultCulture("en")
    .AddSupportedCultures(languages)
    .AddSupportedUICultures(languages));
```

lalu tulis culture ke layout: `<html lang="@System.Globalization.CultureInfo.CurrentUICulture.TwoLetterISOLanguageName" data-theme="light">`. Teks server (`DsText`), tanggal dan angka (`Fmt`), serta `ds.js` lalu mengikuti `?culture=id`, cookie culture, atau `Accept-Language`.

Tema mengikuti pilihan tersimpan atau preferensi sistem. Beri setiap aplikasi di domain yang sama kunci penyimpanan sendiri:

```cshtml
<partial name="_DsHead" model='new HeadOptions(Storage: "myapp")' />
```

Biarkan pengguna memilih lewat [pengalih tema](./theme-switcher.md). Selengkapnya di [Tema](./theming.md) dan [Lokalisasi](./localization.md).

## Halaman tanpa Razor {#static}

Untuk HTML biasa atau back end lain, unduh `citia-ds-static-<versi>.zip` dari [rilis](https://github.com/KittodGG/citia-design-system/releases/latest). Salin folder `citia-ds` di dalamnya ke situs Anda dan mulai dari `index.html`-nya:

```html
<link rel="stylesheet" href="/vendor/citia-ds/css/ds.css" />
<script type="module" src="/vendor/citia-ds/js/ds.js"></script>
```

URL font-nya relatif, jadi path mana pun bisa. Ikon butuh isi `citia-ds/icons/sprite.svg` di dalam halaman, dan file harus disajikan lewat HTTP, bukan `file://`.

## Build Tailwind sendiri {#option-b}

Secara bawaan `_DsHead` menautkan `ds.css` jadi: setiap class yang dipakai pustaka dan contoh di situs ini, tanpa langkah build. Untuk memakai utilitas Tailwind apa pun di view, bangun satu file CSS yang mengimpor design system. Clone `https://github.com/KittodGG/citia-design-system` di samping aplikasi Anda dan jalankan `powershell -File tools/css.ps1` di dalamnya sekali, untuk mengunduh Tailwind CLI dan daisyUI yang dipatok versinya. Lalu tulis `Styles/app.css`:

```css
@import "tailwindcss" source(none);
@plugin "../../citia-design-system/.tools/daisyui.mjs" { themes: false; logs: false; }
@import "../../citia-design-system/src/Citia.DesignSystem/Styles/ds.css";
@source "../Pages";
@source "../Views";
@source "../../citia-design-system/src/Citia.DesignSystem/Views";
```

Build dengan `..\citia-design-system\.tools\tailwindcss.exe -i Styles\app.css -o wwwroot\css\app.css --minify` (tambahkan `--watch` saat mendesain), lalu arahkan partial head ke hasilnya: `<partial name="_DsHead" model='new HeadOptions(Stylesheet: "~/css/app.css")' />`. Biarkan `themes: false`: token sudah mendefinisikan setiap variabel daisyUI.

## Masalah umum

| Gejala | Solusi |
| --- | --- |
| `irm` tidak dikenali | Jalankan perintahnya di PowerShell, bukan di cmd. |
| `NU1101: Unable to find package Citia.DesignSystem` | Tidak ada `nuget.config` dengan source Citia yang berlaku untuk proyek. Jalankan installer lagi dari folder proyek web. |
| Peringatan `NU1900` di mesin tanpa internet | NuGet tidak bisa mengunduh data kerentanannya. Kalau peringatan dianggap error, set `<NuGetAudit>false</NuGetAudit>` di sana. |
| Tombol dan input tampak seperti Bootstrap | Hapus `<link>` Bootstrap dari layout. |
| Tema terang berkedip di halaman gelap | `_DsHead` harus jadi stylesheet pertama di `<head>`. |
| Ikon kosong | Tambahkan `_DsIconSprite` sekali per halaman. |
| Toast tidak muncul | Tambahkan `_DsToast` dan redirect setelah `this.Toast(...)`. |
| Font 404 di sub-path | Sajikan aplikasi di root domain, atau salin font dan pakai `Styles/fonts.root.css`. |
| `dotnet` menolak `net10.0` | Pasang .NET 10 SDK; lihat [Persyaratan](./requirements.md). |
