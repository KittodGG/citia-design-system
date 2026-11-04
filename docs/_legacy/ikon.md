---
title: Ikon
group: Fondasi
order: 7
summary: 73 ikon SVG inline di grid 24 px dengan stroke 2 px, tiga cara memakainya di ASP.NET Core, ukuran, aksesibilitas, dan cara menambah ikon.
source: TPS Helpers/Icon.cs; DESIGN.md bagian Sidebar
---

Set ikon DS disalin dari `Helpers/Icon.cs` di TPS Integration: 73 ikon, grid 24 px, stroke 2 px, ujung dan sambungan bulat, `stroke="currentColor"`. Gayanya garis (outline) ala Lucide dan Feather, sehingga warna ikon mengikuti warna teks di sekitarnya. Hanya `file-xls` dan `file-pdf` memakai stroke 1.75 px pada hurufnya supaya "XLS" dan "PDF" tetap terbaca di 20 px.

Ikon menemani kata, tidak menggantikannya. Tombol utama tetap berlabel; ikon hanya mempercepat pengenalan.

## Tiga cara memakai {#cara}

### Helper C# {#helper}

`Icon.Svg` menghasilkan SVG inline. Cocok bila ikon dipilih di kode atau PageModel.

```cshtml
@using Citia.DesignSystem.Icons

<button type="submit" class="btn btn-primary">@Icon.Svg("send") Kirim ke Bea Cukai</button>
<span>@Icon.Svg("ship", "ds-icon is-lg") MT Sinar Jaya</span>
```

Tanda tangan: `Icon.Svg(string name, string css = "ds-icon", string? label = null)`.

### Tag helper {#tag-helper}

```cshtml
<ds-icon name="ship" size="lg" />
<ds-icon name="trash" size="md" class="text-error-text" />
```

`size` menerima `xs`, `md`, `lg`, `xl`; tanpa `size` ikon berukuran 16 px. `class` ditambahkan di belakang kelas bawaan.

### Sprite {#sprite}

Satu `<symbol>` per ikon dalam satu SVG tersembunyi. Render sekali per halaman, lalu rujuk dengan `<use>`. Cocok untuk markup statis, pratinjau, dan HTML yang dihasilkan JavaScript.

```cshtml
<partial name="_DsIconSprite" />
```

```html
<svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-ship"></use></svg>
```

| Cara | Pakai bila | Catatan |
| --- | --- | --- |
| `Icon.Svg` | Nama ikon dihitung di server | Nama salah melempar `ArgumentException` |
| `<ds-icon>` | Markup Razor biasa | Sama dengan `Icon.Svg` di balik layar |
| Sprite | HTML statis atau dari JavaScript | Nama salah tidak menimbulkan galat, ikon kosong |

## Ukuran {#ukuran}

| Kelas | Ukuran | Pakai untuk |
| --- | --- | --- |
| `ds-icon` | 16 px (`--ds-size-icon-sm`) | Di dalam tombol dan teks |
| `ds-icon is-xs` | 12 px | Penanda kecil, chevron di badge |
| `ds-icon is-md` | 18 px (`--ds-size-icon-md`) | Navigasi sidebar |
| `ds-icon is-lg` | 20 px (`--ds-size-icon-lg`) | Tombol Excel/PDF, kontrol top bar, empty state |
| `ds-icon is-xl` | 32 px (`--ds-size-icon-xl`) | Dropzone, avatar akun |

```html preview title="Ukuran ikon"
<div class="ds-actions is-start">
  <svg class="ds-icon is-xs" aria-hidden="true"><use href="#ds-icon-ship"></use></svg>
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-ship"></use></svg>
  <svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-ship"></use></svg>
  <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-ship"></use></svg>
  <svg class="ds-icon is-xl" aria-hidden="true"><use href="#ds-icon-ship"></use></svg>
</div>
```

## Aksesibilitas {#aksesibilitas}

- Ikon dekoratif secara bawaan: `aria-hidden="true"` dan `focusable="false"`.
- Kontrol yang hanya berisi ikon wajib punya nama: `aria-label` pada `<button>` atau `<a>`. Tombol ikon 44 px (`ds-chrome-btn`, `btn btn-square`) dijelaskan di [Tombol](/tombol).
- Parameter `label` hanya dipakai bila ikon adalah satu-satunya isi dan tidak ada elemen lain yang memberi nama. Hasilnya `role="img"` dengan `aria-label`. Jangan memberi `label` pada ikon yang berdampingan dengan teks.
- Ikon tidak menjadi satu-satunya pembawa arti. Status tetap ditulis dengan kata.
- Setiap item sidebar punya ikon yang berbeda, agar operator mengenali menu dari bentuknya. TPS mengujinya (`Navigation_icons_are_unique`).

```cshtml
@* Benar: nama ada di aria-label, ikon dekoratif *@
<button type="button" class="btn btn-ghost btn-square" aria-label="Hapus tangki T-01">@Icon.Svg("trash")</button>

@* Benar: ikon berdiri sendiri tanpa kontrol *@
@Icon.Svg("alert", "ds-icon is-lg", label: "Peringatan")

@* Salah: nama ikon tidak ada, melempar ArgumentException saat render *@
@Icon.Svg("kapal")
```

> [!TIP]
> Nama yang tidak dikenal melempar `ArgumentException` di C#, jadi salah ketik gagal saat pengembangan, bukan menghasilkan ikon kosong di produksi. Daftar nama ada di `Icon.Names`; `Icon.Exists("ship")` memeriksa satu nama.

## Menambah ikon {#menambah}

1. Tambahkan entri di `src/Citia.DesignSystem/wwwroot/icons/icons.json`: nama dalam huruf kecil dengan tanda hubung, nilainya isi `<svg>` (tanpa tag pembungkus) di grid 24 px.
2. Jalankan generator:

   ```powershell
   dotnet run tools/tokens.cs
   ```

   Perintah ini menghasilkan ulang `Icons/IconSet.g.cs` (dipakai `Icon.Svg`) dan `wwwroot/icons/sprite.svg`.
3. Tambahkan nama ke daftar di `docs/_konvensi.md` bila ikon akan dipakai di contoh dokumentasi.

**Aturan gambar.**

- Grid 24 × 24, padding 2 px dari tepi, stroke 2 px, ujung dan sambungan bulat, tanpa isi (`fill="none"`).
- Jangan menulis warna. Ikon memakai `currentColor`.
- Satu ikon, satu arti. Jangan memakai ikon yang sama untuk dua menu sidebar.

> [!NOTE]
> Path ikon mengikuti gaya Lucide (ISC), Feather (MIT), dan Tabler (MIT). Bila menyalin path baru dari salah satunya, simpan pemberitahuan lisensi aslinya di berkas lisensi pihak ketiga proyek.

## Semua ikon {#semua}

Klik sebuah ikon untuk menyalin namanya.

```ds-icons
```
