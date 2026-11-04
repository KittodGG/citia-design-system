---
title: Ruang dan tata letak
group: Fondasi
order: 4
summary: Ritme 8 pt dengan langkah 2/4 px, jarak semantik, ukuran layout, grid, breakpoint, skala z-index, dan aturan toolbar halaman.
source: TPS DESIGN.md bagian Master data operasional, Sidebar; Styles/app.css (shell, grid, toolbar)
---

Semua jarak mengikuti ritme 8 pt. Langkah 2 px dan 4 px hanya dipakai untuk penyesuaian optik di dalam komponen (ikon, pill, border), tidak untuk jarak antarblok. Setiap nilai punya token; pakai token, jangan menulis angka piksel baru.

## Skala ritme {#ritme}

```ds-spacing
```

Langkah 2 px dan 4 px (`--ds-space-0-5`, `--ds-space-1`) menjaga ikon dan teks sebaris tetap sejajar. Kelipatan 8 px (`--ds-space-2`, `-4`, `-6`, `-8`) membentuk jarak antarbagian.

## Jarak semantik {#semantik}

Token semantik menamai tujuan jarak. Pakai ini sebelum skala mentah.

| Token | Nilai | Pakai untuk |
| --- | --- | --- |
| `--ds-space-field-stack` | 8 px | Label, isian, dan bantuan dalam satu field |
| `--ds-space-field-group` | 24 px | Antarkelompok field di form |
| `--ds-space-section` | 32 px | Antarbagian besar dalam satu halaman |
| `--ds-space-card-y` × `--ds-space-card-x` | 16 × 18 px | Padding kartu |
| `--ds-space-panel` | 32 px, 20 px di ponsel | Padding panel dan dialog besar |
| `--ds-space-toolbar-gap` | 16 px baris × 24 px kolom | Jarak di `.ds-toolbar` |

## Ukuran layout {#ukuran}

```ds-tokens
size
```

**Shell.**

- Sidebar 16 rem (`--ds-size-sidebar`). Saat dilipat menjadi rail 4.75 rem (`--ds-size-sidebar-rail`) mulai 1024 px.
- Top bar 4.75 rem (`--ds-size-topbar`).
- `.ds-main`: padding 24 × 16 px di bawah 1024 px, 24 × 32 px mulai 1024 px.
- Panel masuk `.ds-auth-panel`: 24 rem (`--ds-size-auth-panel`).
- Dialog: 34 rem (kecil), 42 rem (sedang), 54 rem (besar). Di bawah 640 px dialog memenuhi lebar layar.

**Konten.**

- Ukuran baca 65ch (`--ds-size-measure`) untuk `.ds-page-desc` dan paragraf panjang.
- Tinggi maksimum area scroll tabel `min(68dvh, 44rem)` (`--ds-size-table-max-height`), sehingga kepala tabel sticky tetap terlihat tanpa halaman terpotong.

## Grid {#grid}

| Kelas | Perilaku |
| --- | --- |
| `.ds-kpis` | `auto-fill`, kolom minimum 13.5 rem |
| `.ds-grid-2` | `auto-fit`, kolom minimum 28 rem, satu kolom bila ruang kurang |
| `.ds-grid-3` | `auto-fit`, kolom minimum 20 rem |
| `.ds-field-grid` | 2 kolom, jadi 1 kolom di ≤ 640 px |

Grid memakai `minmax(min(100%, X), 1fr)`, sehingga kolom tidak pernah lebih lebar dari wadahnya di layar 320 px.

## Breakpoint {#breakpoint}

```ds-tokens
breakpoint
```

DS memakai media query `max-width` / `min-width` pada tiga titik utama dan beberapa titik komponen.

| Titik | Yang berubah |
| --- | --- |
| 640 px | Tabel menjadi kartu berlabel (`td[data-label]`). `.ds-actions` pindah ke baris sendiri. Input memakai 16 px agar iOS tidak memperbesar halaman. Header halaman menumpuk. Footer dialog menumpuk dengan aksi utama di atas. |
| 1024 px | Sidebar tetap di kiri (di bawahnya menjadi drawer). Tombol lipat sidebar muncul. Padding `.ds-main` dan top bar naik ke 32 px. Halaman masuk memakai dua kolom 5:4. |
| 1180 px | `.ds-toolbar` menumpuk: kolom teks, lalu kelompok aksi di bawahnya dengan perataan kanan tetap. |

Titik komponen:

| Titik | Komponen |
| --- | --- |
| 360 px | Popup combobox menyesuaikan layar sempit |
| 640 px atau tinggi 600 px | Popup combobox menjadi sheet di bawah layar |
| 900 px | Padding sel `.ds-list-table` diperkecil |

> [!NOTE]
> Titik 480, 520, 600, 700 dan 1000 px dari TPS belum dipakai di DS. Jangan menambah breakpoint baru bila 640, 1024, atau 1180 sudah cukup; breakpoint di dalam komponen dicatat di halaman komponennya.

## Skala z-index {#z}

```ds-tokens
z
```

> [!IMPORTANT]
> Pakai lapisan bernama (`var(--ds-z-popover)`), jangan menulis angka. Lapisan baru ditambahkan ke `tokens.json`, bukan ke CSS komponen.

Urutan dari bawah: kolom pinned tabel (2–3), kepala tabel (5–7), elemen sticky (10), menu (20), combobox (30), popover (40), notifikasi (45), modal (999), tooltip dan skip link (1000).

## Toolbar halaman {#toolbar}

`.ds-toolbar` berisi satu kolom teks dan satu kelompok aksi `.ds-actions`. Saat ruang habis (≤ 1180 px) kelompok aksi turun ke baris bawah dan tetap rata kanan.

```html preview title="Toolbar daftar"
<div class="ds-toolbar">
  <div>
    <p class="ds-text-subtle">Rekap per BL, 25 Jan 2026. 14 BL, 1574782 TNE.</p>
  </div>
  <div class="ds-actions">
    <a class="btn btn-excel btn-sm" href="#">Export Excel</a>
    <a class="btn btn-pdf btn-sm" href="#">Export PDF</a>
    <a class="btn btn-primary btn-sm" href="#">Buat BL</a>
  </div>
</div>
```

**Aturan.**

- Export (Excel, PDF, unduh) rata kiri dalam kelompok sendiri; import, input, dan aksi lain rata kanan.
- Satu aksi utama per toolbar, selalu paling kanan.
- `.ds-toolbar-wide` membuat satu anak memenuhi seluruh lebar (misalnya filter).

**Token.** `--ds-space-toolbar-gap`, `--ds-size-measure`, `--ds-size-table-max-height`.
