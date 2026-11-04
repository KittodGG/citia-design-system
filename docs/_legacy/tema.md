---
title: Tema dan rebrand
group: Mulai
order: 4
summary: Cara tema terang/gelap bekerja, cara membuat tema merek untuk proyek lain, dan cara mengganti konteks situs dokumentasi.
source: TPS Styles/app.css L141–209 (tema daisyUI tps dan tps-dark), L2826–2852 (variabel --tps-*), _Layout head script
---

Semua warna komponen berasal dari variabel tema. Mengganti merek berarti mengganti nilai di `tokens/tokens.json`, menjalankan satu perintah, lalu membangun ulang CSS. Tidak ada kelas komponen yang perlu diubah.

## Anatomi tema

Setiap tema di `tokens.json` → `themes.<nama>` punya tiga kelompok:

| Kelompok | Keluaran CSS | Isi |
| --- | --- | --- |
| `color` | `--color-*` | 20 warna semantik daisyUI 5: `base-100/200/300`, `base-content`, `primary`, `secondary`, `accent`, `neutral`, `info`, `success`, `warning`, `error`, masing-masing dengan `*-content` |
| `ext` | `--ds-*` | Ekstensi Citia: `control-border`, `quiet`, `link`, `error-text`, `warning-text`, `popover*`, `subtle`, `muted`, `focus`, `scrim`, `excel`, `pdf`, `syntax-*` |
| `shadow` | `--ds-shadow-*` | Bayangan yang berbeda per tema: `popover`, `lift`, `pinned-end` |

Metadata di `$extensions.ds`: `label`, `colorScheme` (`light`/`dark`), `default` (tema untuk `:root`), `prefersdark` (dipakai saat sistem operasi gelap dan belum ada data-theme), `themeColor`.

```json
"tps": {
  "$extensions": { "ds": { "label": "Terang", "colorScheme": "light", "default": true, "prefersdark": false } },
  "color": {
    "primary": { "$value": "{palette.teal.600}", "$description": "Aksi utama, navigasi aktif, fokus merek." },
    "primary-content": { "$value": "{palette.white}" }
  }
}
```

Nilai merujuk palet primitif (`{palette.teal.600}`), jadi satu perubahan di palet mengalir ke semua tema yang memakainya.

## Bagaimana tema dipilih

1. Server menulis tema bawaan: `<html lang="id" data-theme="tps">`.
2. `_DsHead` menjalankan skrip kecil **sebelum** stylesheet: membaca pilihan pengguna (`<prefix>-theme` di `localStorage`: `light`, `dark`, atau kosong = ikuti sistem), lalu menulis `data-theme`, `data-ds-mode`, dan `data-ds-scheme` di `<html>`.
3. `ds.js` menangani tombol `[data-ds-theme-toggle]` dan `[data-ds-theme-set="light|dark|system"]`, memperbarui `meta[name=theme-color]`, dan mengikuti perubahan tema sistem selama mode `system`.

```html preview title="Pilihan tema (mengubah tema situs ini)"
<div class="ds-segmented" role="group" aria-label="Tema tampilan">
  <button type="button" data-ds-theme-set="light" aria-pressed="false">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-sun"></use></svg>Terang
  </button>
  <button type="button" data-ds-theme-set="dark" aria-pressed="false">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-moon"></use></svg>Gelap
  </button>
  <button type="button" data-ds-theme-set="system" aria-pressed="false">Sistem</button>
</div>
```

> [!NOTE]
> TPS menyimpan hasil tema pada kunjungan pertama, sehingga perubahan tema sistem setelahnya diabaikan. DS hanya menyimpan pilihan eksplisit pengguna; tanpa pilihan, tema terus mengikuti sistem operasi.

**Kait CSS tanpa nama tema.** Pakai `data-ds-scheme` bila gaya harus berbeda di gelap tetapi tidak boleh bergantung pada nama tema:

```css
:root[data-ds-scheme="dark"] .logo-terang { display: none; }
```

**Tema bersarang.** `data-theme` boleh dipasang di elemen mana pun. Pratinjau di situs ini memakai cara itu: kanvas pratinjau mendapat `data-theme="tps-dark"` sementara halaman tetap terang.

## Membuat tema merek baru

Contoh untuk proyek dengan warna utama biru tua, nama tema `proyekb` dan `proyekb-dark`:

1. Tambahkan primitif ke `palette` (jangan mengubah primitif TPS yang masih dipakai tema lain):

   ```json
   "indigo": {
     "500": { "$value": "#4f6bed" },
     "600": { "$value": "#3a53c9" },
     "700": { "$value": "#2f45a8" }
   }
   ```

2. Salin `themes.tps` menjadi `themes.proyekb` dan `themes.tps-dark` menjadi `themes.proyekb-dark`. Ganti referensi warna merek (`primary`, `secondary`, `accent`, `quiet`, `focus`). Biarkan `success`, `warning`, `error`, dan `link` kecuali ada alasan kuat.
3. Pindahkan flag `default: true` dan `prefersdark: true` ke tema baru. Hapus tema TPS dari salinan repo proyek bila tidak dipakai.
4. Bangun dan periksa:

   ```powershell
   dotnet run tools/tokens.cs              # gagal (exit 1) bila ada pasangan di bawah 4.5:1 atau 3:1
   powershell -NoProfile -File tools/css.ps1
   ```

5. Pakai nama tema baru di layout:

   ```cshtml
   <html lang="id" data-theme="proyekb">
   <partial name="_DsHead" model='new HeadOptions(Stylesheet: "~/css/app.css", Light: "proyekb", Dark: "proyekb-dark", Storage: "proyekb")' />
   ```

   `Storage` memisahkan pilihan tema antaraplikasi yang berbagi domain.

### Aturan memilih warna

| Peran | Syarat | Cara memeriksa |
| --- | --- | --- |
| `primary` + `primary-content` | Teks tombol ≥ 4.5:1 | Baris `primary-content` di laporan kontras |
| `secondary` | Latar sidebar; teks putih ≥ 4.5:1, termasuk pill aktif (secondary 76% + hitam) dan kepala grup 11 px | Baris `secondary-content`, `sidebar active`, `sidebar group` |
| `control-border` | Batas input ≥ 3:1 terhadap `base-100` | Baris `control-border` |
| `link` | ≥ 4.5:1 di `base-100`, `base-200`, dan baris hover | Tiga baris `link` |
| `focus` | ≥ 3:1 di `base-100` dan `base-200` | Baris `focus ring` |
| Tema gelap | Warna merek lebih terang dengan teks gelap (`*-content` = `base-200` gelap) | Semua baris `tps-dark` |

> [!WARNING]
> Jangan mengubah arti warna status. Hijau tetap berhasil, jingga tetap perlu perhatian, merah tetap gagal atau destruktif. Proyek baru boleh mengubah nada, bukan maknanya.

### Yang tidak perlu diubah

Spasi, radius, tipografi, motion, z-index, dan breakpoint berlaku untuk semua merek. Ubah hanya bila produk benar-benar berbeda (misalnya kios layar sentuh yang butuh target 56 px); catat alasannya di `$description` token.

## Konteks situs dokumentasi

Situs ini bisa dipakai ulang untuk dokumentasi produk lain. Yang diganti hanya konfigurasi dan isi Markdown, bukan kode.

`site/Citia.DesignSystem.Docs/appsettings.json`:

```json
"Docs": {
  "SiteName": "Citia Design System",
  "ShortName": "Citia DS",
  "Tagline": "Token, komponen dan pola UI untuk aplikasi ASP.NET Core Citia Engineering",
  "Version": "1.0",
  "HomeSlug": "pengantar",
  "Groups": [ "Mulai", "Fondasi", "Komponen", "Pola", "Konten", "Referensi" ],
  "LightTheme": "tps",
  "DarkTheme": "tps-dark",
  "Storage": "ds-docs",
  "ContentPath": null
}
```

| Kunci | Fungsi |
| --- | --- |
| `SiteName`, `ShortName`, `Tagline`, `Version` | Nama di judul tab, sidebar, dan footer |
| `HomeSlug` | Halaman yang tampil di `/` |
| `Groups` | Urutan kelompok di sidebar. Halaman memilih kelompoknya lewat frontmatter `group` |
| `LightTheme`, `DarkTheme` | Tema DS untuk situs (pakai tema merek produk) |
| `Storage` | Prefiks `localStorage` pilihan tema situs |
| `ContentPath` | Folder Markdown lain (relatif ke content root). Kosong = `content/docs` (hasil publish) lalu `../../docs` |

Logo ada di `wwwroot/images/`. Struktur halaman, peta kanan, pencarian, dan pratinjau langsung mengikuti isi Markdown secara otomatis.
