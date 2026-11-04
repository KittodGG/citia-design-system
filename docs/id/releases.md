---
title: Rilis dan pembaruan
group: getting-started
order: 7
summary: Cara penomoran versi, cara aplikasi pindah ke versi baru dan kembali, dan cara maintainer menerbitkan rilis ke feed NuGet Citia.
---

Citia Design System dikirim sebagai satu paket NuGet, `Citia.DesignSystem`, di feed Citia. Setiap aplikasi memutuskan sendiri kapan mengambil versi baru. Tidak ada yang berubah di aplikasi sampai seseorang memperbarui referensi paket, melakukan build, lalu men-deploy-nya, jadi rilis baru tidak pernah merusak aplikasi yang sedang berjalan dengan sendirinya.

- **Paket:** `Citia.DesignSystem`
- **Feed:** `https://design.citia-engineering.com/nuget/v3/index.json`
- **Versi saat ini:** di samping logo di bagian atas situs ini
- **Apa yang berubah:** [Catatan perubahan](./changelog.md)

## Nomor versi

Versi mengikuti SemVer, `mayor.minor.patch`.

| Perubahan | Contoh | Yang perlu dilakukan aplikasi |
| --- | --- | --- |
| Patch | `2.0.1 → 2.0.2` | Tidak ada. Hanya perbaikan, markup tetap sama. |
| Minor | `2.0.2 → 2.1.0` | Tidak ada. Komponen, atribut, atau token baru; markup lama tetap berfungsi. |
| Mayor | `2.1.0 → 3.0.0` | Ikuti panduan migrasi: ada token, class, atau tag helper yang dipakai aplikasi yang berubah. |

Versi yang sudah terbit tidak pernah diganti atau dihapus. Perbaikan selalu datang sebagai versi baru.

## Memperbarui aplikasi

Dari folder proyek web, jalankan lagi perintah instalasi. Aplikasi pindah ke versi terbaru:

```powershell
irm https://design.citia-engineering.com/install.ps1 | iex
```

Untuk memilih versi, atau melihat versi baru lebih dulu:

```powershell
dotnet list package --outdated
dotnet add package Citia.DesignSystem --version 2.1.0
```

Aplikasi offline menjalankan `install-citia-ds.ps1 -From <folder>` dari zip offline yang lebih baru. Sebelum meng-commit perubahan `.csproj`, buka aplikasinya dan periksa:

- [ ] Halaman yang paling sering Anda ubah, dalam tema terang dan gelap.
- [ ] Satu halaman dengan `?culture=id`.
- [ ] Form dengan error validasi, tabel, serta dialog atau menu kalau aplikasi memakainya.
- [ ] Console browser tidak menampilkan error.

Lalu commit dan deploy seperti biasa. Untuk kembali, pasang versi sebelumnya dengan perintah yang sama, build, lalu deploy.

### Beberapa proyek dalam satu repositori

Simpan versinya di satu tempat dengan central package management. `Directory.Packages.props` di samping solution:

```xml
<Project>
  <PropertyGroup>
    <ManagePackageVersionsCentrally>true</ManagePackageVersionsCentrally>
  </PropertyGroup>
  <ItemGroup>
    <PackageVersion Include="Citia.DesignSystem" Version="2.0.1" />
  </ItemGroup>
</Project>
```

Setiap proyek lalu mereferensikan paket tanpa versi:

```xml
<PackageReference Include="Citia.DesignSystem" />
```

Pembaruan cukup mengubah satu baris di `Directory.Packages.props`. Central package management berlaku untuk semua paket di repositori, jadi pindahkan versi paket lain ke sana juga.

## Menerbitkan rilis

Untuk maintainer design system. Anda butuh .NET 10 SDK, PowerShell, akses SSH ke server staging sebagai user deploy lewat alias `citia-ds-staging` di `~/.ssh/config` (atau set `CITIA_DS_SSH_HOST`), dan GitHub CLI yang sudah login dengan akses tulis ke `KittodGG/citia-design-system`.

1. Buat perubahannya, beserta dokumentasinya dalam bahasa Inggris dan Indonesia.
2. Naikkan `<Version>` di `src/Citia.DesignSystem/Citia.DesignSystem.csproj` sesuai tabel di atas.
3. Tambahkan entri `## <versi> - <tanggal>` di `CHANGELOG.md`, `docs/en/changelog.md`, dan `docs/id/changelog.md`.
4. Commit dan push. CI membangun dan menjalankan smoke test untuk setiap push; tunggu sampai lulus.
5. Jalankan skrip rilis:

   ```powershell
   powershell -NoProfile -File tools/release.ps1
   ```

6. Kalau dokumentasinya berubah, deploy situsnya:

   ```powershell
   powershell -NoProfile -File tools/deploy-site.ps1
   ```

`release.ps1` berhenti di pemeriksaan pertama yang gagal:

| Pemeriksaan | Gagal kalau |
| --- | --- |
| Changelog | Salah satu dari tiga file changelog tidak punya entri untuk versi itu. |
| Belum terbit | Versi itu sudah ada di feed atau di GitHub. |
| Git | Ada perubahan yang belum di-commit, atau commit-nya belum di-push. |
| Token dan CSS | Ada pasangan kontras WCAG wajib yang di bawah batas minimum, atau membangun ulang token atau `ds.css` mengubah file yang sudah di-commit. |
| Smoke test | Paket yang dipasang ke aplikasi Razor Pages baru tidak bisa render, tidak menyajikan aset dan class daisyUI-nya, tidak bisa ganti bahasa, tidak menampilkan error validasi, atau tidak menampilkan toast. Dijalankan di mode Development dan sebagai aplikasi hasil publish. |
| Installer offline | `install-citia-ds.ps1`, dijalankan dari zip offline di mesin simulasi tanpa internet, tidak menghasilkan aplikasi yang berfungsi. |
| Feed live | Setelah upload, smoke test yang sama gagal saat memasang dari feed. |

Setelah itu skrip membuat rilis GitHub `v<versi>` berisi `.nupkg` (file yang sama dengan di feed), `citia-ds-offline-<versi>.zip`, dan `citia-ds-static-<versi>.zip`. Lihat [Instalasi](./installation.md#offline).

`deploy-site.ps1` membangun situs untuk Linux, meng-upload-nya, lalu menjalankannya ulang. Kalau build baru tidak merespons, build sebelumnya dikembalikan. Paket yang sudah terbit disimpan di folder tersendiri di server dan tetap ada setiap kali situs di-deploy.

Smoke test juga bisa dijalankan sendiri kapan saja:

```powershell
powershell -NoProfile -File tools/smoke-test.ps1 -Source https://design.citia-engineering.com/nuget/v3/index.json -Version 2.0.2
```
