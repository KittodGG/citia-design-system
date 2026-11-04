---
title: Catatan perubahan
group: Referensi
order: 9
summary: Riwayat versi Citia Design System, perbedaan dari TPS Integration, dan hal yang belum disertakan.
---

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/). Versi mengikuti SemVer: perubahan token atau kelas yang memaksa proyek mengubah markup menaikkan versi mayor.

## 1.0.0 — 2 Nov 2026

Rilis pertama, diekstrak dari INTEGRA TPS Integration branch `feature/tps-integration` commit `88cd8e4`.

### Ditambahkan

- Token DTCG di `tokens/tokens.json`: palet primitif, tema `tps` dan `tps-dark`, 17 peran tipografi, spasi, radius, border, bayangan, ukuran, z-index, motion (termasuk nilai spring Apple untuk UI berbasis gestur), opasitas, breakpoint, dan token ilustrasi tangki.
- `tools/tokens.cs` (.NET 10, satu file): membangun `tokens.css`, `tailwind-theme.css`, `daisyui-themes.css`, `tokens.json`, `contrast.json`, `IconSet.g.cs`, `sprite.svg`, dan `docs/token-referensi.md`; memeriksa 72 pasangan kontras WCAG.
- `tools/css.ps1`: Tailwind CSS 4.3.3 standalone + daisyUI 5.7.47 dengan verifikasi SHA-256, Windows dan Linux.
- Razor Class Library `Citia.DesignSystem`: tag helper `ds-icon`, `ds-pill`, `ds-tag`, `ds-empty`; partial `_DsHead`, `_DsScripts`, `_DsIconSprite`, `_DsToast`, `_DsConfirmDialog`, `_DsLeaveDialog`, `_DsPager`, `_DsSortHeader`, `_DsPageSize`, `_DsSidebarNav`; helper `Icon`, `Tone`, `ToastMessage`, `ListSort`, `ListPage<T>`, `QueryUrl`, `NavModel`, `Avatar`, `Fmt`, `Wib`.
- 13 file CSS komponen `ds-*` dan `ds.css` jadi untuk aplikasi tanpa Tailwind.
- `ds.js`: tema tiga mode, sidebar ringkas, grup navigasi, drawer, kembali, menu `<details>`, dialog, konfirmasi, toast, guard perubahan (termasuk logout), export, salin, password, autosubmit, submit sekali, tabel kolom tersemat, baris pohon, combobox ARIA 1.2.
- 73 ikon TPS, font Manrope variable, Cally (kalender).
- Situs dokumentasi ASP.NET Core Razor Pages dengan tata letak scroll tracker, tema terang/gelap, pencarian, dan pratinjau langsung.

### Berbeda dari TPS (disengaja)

- Cincin fokus memakai `--ds-focus` (primary #00838f, 4.29:1) karena accent TPS #00a4b2 hanya 2.86:1 di permukaan terang.
- Satu sistem pill (`.ds-pill`), satu pager (`_DsPager`), satu empty state (`.ds-empty`) menggantikan masing-masing tiga varian di TPS.
- Tema mengikuti sistem operasi sampai pengguna memilih; `meta theme-color` diperbarui.
- Toast punya nada warning, berhenti menghitung saat di-hover atau difokus.
- Guard perubahan aktif per form (`data-ds-guard`), bukan untuk semua form POST.
- Drawer sidebar memakai implementasi sendiri (masuk dan keluar dari kiri), bukan checkbox drawer daisyUI.
- Font disajikan dari `/_content/Citia.DesignSystem/fonts/manrope/`; `fonts.root.css` mempertahankan path TPS `/fonts/manrope/`.
- Tema daisyUI tidak wajib didaftarkan: `tokens.css` sudah mendefinisikan semua variabel per `data-theme`.

### Belum disertakan

- Enhancer pemilih tanggal/waktu (acuan: TPS `wwwroot/js/site.js`). Input `date`/`datetime-local` bawaan tetap berfungsi.
- Polling notifikasi, live refresh dengan morphdom, alur quick-add sisi server, viewer XML, import Excel, pencarian pelabuhan. Pola dan acuan file TPS tercatat di [Perilaku JavaScript](./perilaku-js.md) dan [Peta asal TPS](./peta-asal-tps.md).
- Helper grafik C# (acuan: TPS `Helpers/Charts.cs`). Kelas CSS grafik sudah ada.
