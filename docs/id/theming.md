---
title: Tema
group: getting-started
order: 5
summary: Cara kerja tema terang dan gelap, mengikuti pengaturan sistem, menambah tema merek di tokens.json, dan daftar periksa rebrand.
---

Setiap warna di setiap komponen berasal dari variabel tema. Rebrand berarti mengganti nilai di `tokens/tokens.json`, menjalankan satu perintah, dan membangun ulang CSS. Tidak ada kelas komponen yang berubah.

## Terang, gelap, dan alias

DS menyertakan dua tema, dipilih lewat atribut `data-theme`:

| `data-theme` | Skema | Keterangan |
| --- | --- | --- |
| `light` | Terang | Bawaan. Permukaan putih hangat, primer teal. |
| `dark` | Gelap | Dipakai saat sistem memilih gelap dan belum ada pilihan tersimpan. |
| `tps`, `tps-dark` | Terang, gelap | Alias lama dari versi 1. Nilainya sama, sehingga aplikasi lama tetap jalan. Di kode baru pakai `light` dan `dark`. |

Setiap tema di `tokens.json` membawa metadata di `$extensions.ds`:

```json
"light": {
  "$extensions": { "ds": {
    "label": "Light", "colorScheme": "light",
    "default": true, "prefersdark": false,
    "themeColor": "#f9f9f6", "aliases": ["tps"]
  } }
}
```

| Kunci | Arti |
| --- | --- |
| `label` | Nama yang tampil di pemilih tema. |
| `colorScheme` | `light` atau `dark`; menyetel `color-scheme` browser agar kontrol native dan scrollbar serasi. |
| `default` | Tema yang ditulis ke `:root`. Tepat satu. |
| `prefersdark` | Dipakai saat sistem memilih gelap dan belum ada `data-theme`. Tepat satu. |
| `themeColor` | Warna UI browser (`<meta name="theme-color">`). |
| `aliases` | Nama `data-theme` tambahan yang memilih tema ini. |

## Cara tema dipilih

1. Server menulis bawaan: `<html data-theme="light">`.
2. `_DsHead` menjalankan skrip kecil **sebelum** stylesheet. Skrip membaca pilihan tersimpan dari `localStorage` (`<prefix>-theme`: `light`, `dark`, atau kosong untuk "ikuti sistem"), lalu menyetel `data-theme`, `data-ds-mode` (`light`, `dark`, `system`), dan `data-ds-scheme` (`light`, `dark`) di `<html>`. Tidak ada kedipan.
3. `ds.js` menangani `[data-ds-theme-toggle]` dan `[data-ds-theme-set="light|dark|system"]`, memperbarui meta theme-color, dan mengikuti sistem operasi selama mode `system`.

```html preview title="Pilihan tema (mengubah tema situs ini)"
<div class="ds-segmented" role="group" aria-label="Tema">
  <button type="button" data-ds-theme-set="light" aria-pressed="false">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-sun"></use></svg>Terang
  </button>
  <button type="button" data-ds-theme-set="dark" aria-pressed="false">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-moon"></use></svg>Gelap
  </button>
  <button type="button" data-ds-theme-set="system" aria-pressed="false">Sistem</button>
</div>
```

DS hanya menyimpan pilihan eksplisit. Tanpa pilihan tersimpan, tema mengikuti sistem operasi dan berubah langsung saat sistem berubah.

### Kait untuk CSS Anda

Pakai `data-ds-scheme` bila sebuah aturan harus berbeda di gelap tetapi tidak boleh bergantung pada nama tema, supaya tetap berlaku untuk tema merek:

```css
:root[data-ds-scheme="dark"] .logo-on-light { display: none; }
```

Dari JavaScript: `DS.theme.set("dark")`, `DS.theme.set("system")`. Baca skema saat ini dari `document.documentElement.dataset.dsScheme`.

### Tema berbeda per bagian

`data-theme` berfungsi di elemen mana pun dan variabelnya di-resolve per elemen. Misalnya hero gelap di halaman terang, atau kanvas pratinjau:

```html
<section data-theme="dark" class="p-8 bg-base-100 text-base-content">
  <h2>Selalu gelap</h2>
</section>
```

Batasi tema bersarang pada wilayah besar yang berdiri sendiri. Jangan bersarang hanya untuk mengubah gaya satu kontrol.

## Anatomi tema

Setiap tema di `tokens.json` pada `themes.<nama>` punya tiga kelompok:

| Kelompok | Keluaran CSS | Isi |
| --- | --- | --- |
| `color` | `--color-*` | 20 peran daisyUI 5: `base-100/200/300`, `base-content`, `primary`, `secondary`, `accent`, `neutral`, `info`, `success`, `warning`, `error`, masing-masing dengan `*-content`. |
| `ext` | `--ds-*` | Peran Citia: `control-border`, `quiet`, `link`, `error-text`, `warning-text`, `popover*`, `subtle`, `muted`, `focus`, `scrim`, `syntax-*`. |
| `shadow` | `--ds-shadow-*` | Bayangan, disetel per tema (lebih pekat di gelap). |

Nilai merujuk primitif (`{palette.teal.600}`), jadi satu perubahan di palet mengalir ke semua tema yang memakainya. Spasi, radius, tipografi, gerak, dan z-index dipakai bersama oleh semua tema.

## Menambah tema merek

Contoh: produk dengan primer indigo, nama tema `acme` dan `acme-dark`.

1. **Tambahkan primitif** ke `palette`. Jangan mengubah primitif yang dipakai tema lain.

   ```json
   "indigo": {
     "500": { "$value": "#4f6bed" },
     "600": { "$value": "#3a53c9" },
     "700": { "$value": "#2f45a8" }
   }
   ```

2. **Salin** `themes.light` menjadi `themes.acme` dan `themes.dark` menjadi `themes.acme-dark`. Ganti referensi merek: `primary`, `secondary`, `accent`, `quiet`, `focus`. Biarkan `success`, `warning`, `error`, dan `link` kecuali ada alasan.
3. **Setel metadata.** Di `acme`: `label`, `colorScheme: "light"`, `default: true`. Di `acme-dark`: `colorScheme: "dark"`, `prefersdark: true`. Setel `default` dan `prefersdark` menjadi `false` pada tema DS yang Anda gantikan, atau hapus dari salinan Anda.
4. **Bangun ulang dan periksa** dari akar repositori:

   ```powershell
   dotnet run tools/tokens.cs     # membangun CSS, JSON, tema Tailwind; exit 1 bila ada pasangan wajib gagal
   powershell -NoProfile -File tools/css.ps1
   ```

5. **Pakai namanya** di layout:

   ```cshtml
   <html lang="id" data-theme="acme">
   <partial name="_DsHead" model='new HeadOptions(Light: "acme", Dark: "acme-dark", Storage: "acme")' />
   ```

### Uji kontras

`tools/tokens.cs` menghitung kontras WCAG untuk 72 pasangan di kedua tema (teks di permukaan, teks di primer, border kontrol, focus ring, tautan, teks status, state sidebar) dan menulis `wwwroot/tokens/contrast.json`. Pasangan wajib di bawah 4.5:1 untuk teks, atau 3:1 untuk batas dan ikon, membuat perintah keluar dengan kode 1. Tabel lengkapnya ada di [Warna](./color.md#kontras). Bila Anda menambah komponen yang menaruh teks di atas warna baru, tambahkan pasangannya di `tools/tokens.cs`.

| Peran | Syarat |
| --- | --- |
| `primary` dengan `primary-content` | Teks tombol minimal 4.5:1 |
| `control-border` terhadap `base-100` | Border field minimal 3:1 |
| `link` di `base-100`, `base-200`, dan baris hover | Minimal 4.5:1 |
| `focus` di `base-100` dan `base-200` | Focus ring minimal 3:1 |
| Tema gelap | Warna merek satu langkah lebih terang, dengan `*-content` gelap |

> [!WARNING]
> Jangan mengubah arti warna status. Hijau tetap berhasil, jingga tetap perlu perhatian, merah tetap gagal atau destruktif. Merek boleh menyesuaikan nada, bukan maknanya.

## Daftar periksa rebrand

- [ ] Primitif palet ditambahkan; primitif yang ada tidak disentuh.
- [ ] Tema terang dan gelap terdefinisi, nama disetel di `HeadOptions` dan `<html data-theme>`.
- [ ] Flag `default` dan `prefersdark` disetel pada tepat satu tema masing-masing.
- [ ] `dotnet run tools/tokens.cs` berakhir dengan "All required pairs pass (72 checked)".
- [ ] `tools/css.ps1` dijalankan; aplikasi Opsi B dibangun ulang.
- [ ] Font merek, bila berbeda, ditambahkan di `Styles/fonts.css` dan `--ds-font-sans`; bobot dan tracking diperiksa di [Tipografi](./typography.md).
- [ ] Logo dan favicon diganti untuk kedua skema; `themeColor` sama dengan latar halaman.
- [ ] Setiap halaman diperiksa di terang dan gelap dengan focus ring terlihat pada tombol primer, tautan, dan input.
- [ ] Prefiks `Storage` unik per aplikasi di domain yang sama.

Spasi, radius, skala tipografi, gerak, dan breakpoint dibiarkan kecuali produknya memang berbeda (misalnya kios yang butuh target 56px). Catat alasannya di `$description` token.

## Tema untuk situs dokumentasi

Situs dokumentasi ini membaca temanya dari `appsettings.json` (`LightTheme`, `DarkTheme`, `Storage`). Arahkan ke tema merek Anda untuk memakai ulang situs ini bagi produk lain.
