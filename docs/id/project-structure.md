---
title: Struktur proyek
group: getting-started
order: 6
summary: Peta repositori: apa yang dimiliki tiap folder, file mana yang dihasilkan otomatis, dan perintah untuk membangunnya ulang.
---

Repositori punya satu sumber kebenaran untuk nilai desain (`tokens/`), satu pustaka yang dirilis (`src/`), satu situs yang mendokumentasikannya (`site/`), dan halaman yang ditampilkannya (`docs/`).

## Peta repositori

```text
citia-design-system/
├─ tokens/
│  ├─ tokens.json                  sumber DTCG untuk setiap nilai desain
│  └─ descriptions.id.json         deskripsi token dalam bahasa Indonesia
├─ tools/
│  ├─ tokens.cs                    generator token + cek kontras (dotnet run tools/tokens.cs)
│  ├─ css.ps1                      build CSS dengan Tailwind standalone + daisyUI
│  ├─ smoke-test.ps1               memasang paket ke aplikasi baru lalu memeriksanya
│  ├─ release.ps1                  menerbitkan paket ke feed NuGet Citia
│  └─ deploy-site.ps1              men-deploy situs ini beserta feed-nya
├─ src/Citia.DesignSystem/         Razor Class Library, dikemas sebagai paket NuGet
│  ├─ Styles/
│  │  ├─ ds.css                    daftar impor: pintu masuk untuk aplikasi dengan build Tailwind sendiri
│  │  ├─ ds.bundle.css             Tailwind + daisyUI + ds.css, membangun stylesheet jadi
│  │  ├─ generated/                tokens.css, tailwind-theme.css (jangan diedit)
│  │  ├─ base.css, native.css      bawaan elemen
│  │  ├─ daisyui-overrides.css     penyelarasan daisyUI global
│  │  ├─ components/*.css          satu file per keluarga komponen
│  │  ├─ accessibility.css         gerak/transparansi dikurangi, kontras lebih, forced colours
│  │  └─ fonts.css                 @font-face untuk Manrope
│  ├─ TagHelpers/                  tag helper <ds-*>
│  ├─ Views/Shared/_Ds*.cshtml     partial: _DsHead, _DsScripts, _DsIconSprite, _DsToast, ...
│  ├─ Ui/, Formatting/, Icons/     record C#, Fmt, helper ikon
│  ├─ Localization/                DsText dan tabel teks bahasa Inggris dan Indonesia
│  └─ wwwroot/
│     ├─ css/ds.css                stylesheet jadi (dihasilkan)
│     ├─ js/ds.js, core.js, modules/   perilaku
│     ├─ fonts/manrope/            font variabel yang disajikan sendiri
│     ├─ icons/                    sumber icons.json dan sprite.svg (dihasilkan)
│     └─ tokens/                   tokens.json dan contrast.json hasil resolusi (dihasilkan)
├─ site/Citia.DesignSystem.Docs/   situs dokumentasi (Razor Pages + Markdig)
├─ docs/
│  ├─ en/<slug>.md                 halaman bahasa Inggris
│  └─ id/<slug>.md                 halaman bahasa Indonesia, slug sama
├─ Directory.Build.props, global.json, Citia.DesignSystem.sln
└─ .tools/                         Tailwind CLI dan daisyUI (diunduh, diabaikan Git)
```

## Yang dimiliki tiap bagian

| Bagian | Memiliki | Ubah bila |
| --- | --- | --- |
| `tokens/tokens.json` | Warna per tema, peran tipografi, spasi, radius, bayangan, gerak, z-index, breakpoint | Sebuah nilai atau tema berubah. Lalu jalankan generator. |
| `tools/tokens.cs` | CSS, JSON, sprite ikon, dan halaman referensi token yang dihasilkan, serta cek kontras 72 pasangan | Anda menambah pasangan warna untuk diverifikasi. |
| `Styles/components/*.css` | Tampilan satu keluarga komponen, hanya memakai token, di dalam `@layer components` | Tampilan komponen berubah. |
| `Styles/accessibility.css` | Penimpa untuk preferensi pengguna, dimuat terakhir | Sebuah preferensi perlu ditangani di mana-mana. |
| `TagHelpers/` dan `Views/Shared/` | Markup sisi server untuk komponen yang terbantu olehnya | Anda menambah atau mengubah API Razor. |
| `wwwroot/js/modules/*.js` | Satu perilaku per keluarga, diaktifkan lewat atribut `data-ds-*` | Sebuah perilaku berubah. |
| `Localization/` | Teks untuk keluaran Razor, Inggris dan Indonesia | Anda menambah teks yang terlihat pengguna. |
| `docs/` | Halaman tiap komponen, fondasi, dan pola | Salah satu di atas berubah. |

## File yang dihasilkan

Jangan diedit manual; build berikutnya menimpanya.

| File | Dihasilkan oleh |
| --- | --- |
| `Styles/generated/tokens.css`, `tailwind-theme.css` | `dotnet run tools/tokens.cs` |
| `wwwroot/tokens/tokens.json`, `contrast.json` | `dotnet run tools/tokens.cs` |
| `wwwroot/icons/sprite.svg`, `Icons/IconSet.g.cs` | `dotnet run tools/tokens.cs`, dari `icons.json` |
| `docs/en/tokens.md`, `docs/id/tokens.md` | `dotnet run tools/tokens.cs` |
| `wwwroot/css/ds.css`, `site/.../wwwroot/css/docs.css` | `powershell -File tools/css.ps1` |

## Perintah

| Perintah | Fungsi |
| --- | --- |
| `dotnet run tools/tokens.cs` | Membangun ulang token, ikon, dan halaman referensi; memeriksa kontras (exit 1 bila gagal). |
| `powershell -NoProfile -File tools/css.ps1 [-Target ds\|docs] [-Watch]` | Membangun CSS. |
| `dotnet build Citia.DesignSystem.sln` | Membangun pustaka dan situs dokumentasi. |
| `dotnet run --project site/Citia.DesignSystem.Docs` | Menjalankan dokumentasi di `http://localhost:5180`. |
| `dotnet pack src/Citia.DesignSystem -c Release -o artifacts` | Menghasilkan paket NuGet. |
| `powershell -NoProfile -File tools/smoke-test.ps1 -PackageDir artifacts -Version <v>` | Memasang paket ke aplikasi baru lalu memeriksanya. |
| `powershell -NoProfile -File tools/release.ps1` | Menerbitkan rilis; lihat [Rilis dan pembaruan](./releases.md). |
| `powershell -NoProfile -File tools/deploy-site.ps1` | Men-deploy situs ini beserta feed-nya. |

## Dari mana aset dimuat

Saat berjalan, aplikasi pemakai melihat aset statis pustaka di `/_content/Citia.DesignSystem/` (`css/ds.css`, `js/ds.js`, `fonts/`, `icons/`, `tokens/`). Sumber CSS juga dikemas di `styles/` agar aplikasi bisa mengimpornya ke build Tailwind sendiri.

## Menambah sesuatu

- **Komponen:** CSS di `Styles/components/<keluarga>.css`, perilaku di `wwwroot/js/modules/<keluarga>.js`, tag helper di `TagHelpers/`, teks di `Localization/`, dan sepasang halaman di `docs/en` dan `docs/id`.
- **Warna atau ukuran:** `tokens/tokens.json`, lalu bangun ulang.
- **Bahasa:** `DsText.Add` untuk teks server, `DS.addMessages` untuk teks browser, dan folder baru `docs/<kode>/`.

Berikutnya: [Prinsip](./principles.md).
