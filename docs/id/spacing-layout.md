---
title: Ruang dan tata letak
group: foundations
order: 4
summary: Skala jarak 4px, jarak semantik, grid, breakpoint, kepadatan nyaman dan ringkas, target sentuh, dan safe area.
---

Jarak mengikuti basis 4px dengan ritme 8px antarblok. Setiap nilai adalah token: pakai `--ds-space-*` dan jangan menulis angka piksel baru. Langkah kecil (2px, 4px) untuk penyelarasan optik di dalam komponen; jarak antarblok memakai kelipatan 8px.

## Skala jarak

```ds-spacing
```

Langkah 2px dan 4px (`--ds-space-0-5`, `--ds-space-1`) menjaga ikon dan teks sebaris tetap sejajar. Langkah `--ds-space-2` (8px), `-4` (16px), `-6` (24px), `-8` (32px), dan `-12` (48px) membentuk jarak antarbagian.

### Jarak semantik

Token semantik menamai tujuan sebuah jarak. Pakai ini sebelum skala mentah.

| Token | Nilai | Dipakai untuk |
| --- | --- | --- |
| `--ds-space-field-stack` | 8px | Label, kontrol, dan teks bantuan dalam satu field |
| `--ds-space-field-group` | 24px | Antarkelompok field di form |
| `--ds-space-section` | 32px | Antarbagian besar dalam halaman |
| `--ds-space-card-y` × `--ds-space-card-x` | 16 × 18px | Padding kartu |
| `--ds-space-panel` | 32px | Padding panel dan dialog besar |
| `--ds-space-toolbar-gap` | 16px baris × 24px kolom | Jarak di toolbar |

```ds-tokens
space
```

## Ukuran

```ds-tokens
size
```

- Sidebar 16rem, rail terlipat 4.75rem, top bar 4.75rem.
- Dialog 34rem (kecil) dan 54rem (besar). Di bawah 640px dialog memenuhi layar.
- Lebar baca `65ch` (`--ds-size-measure`).
- Tabel yang bisa digulir dibatasi `min(68dvh, 44rem)` agar header sticky tetap terlihat.

## Grid

Tata letak memakai CSS grid dengan `minmax(min(100%, X), 1fr)`, sehingga kolom tidak pernah lebih lebar dari wadahnya, bahkan di 320px.

| Kelas | Perilaku |
| --- | --- |
| `.ds-kpis` | `auto-fill`, kolom minimal 13.5rem |
| `.ds-grid-2` | `auto-fit`, kolom minimal 28rem; satu kolom bila sempit |
| `.ds-grid-3` | `auto-fit`, kolom minimal 20rem |
| `.ds-field-grid` | Dua kolom, satu kolom di 640px ke bawah |

```html preview title="Kartu statistik dalam grid auto-fill"
<div class="ds-kpis">
  <div class="ds-kpi"><span class="ds-text-subtle">Faktur terbuka</span><span class="ds-num" style="font-size:var(--ds-type-metric-size);font-weight:var(--ds-type-metric-weight)">42</span></div>
  <div class="ds-kpi"><span class="ds-text-subtle">Belum dibayar</span><span class="ds-num" style="font-size:var(--ds-type-metric-size);font-weight:var(--ds-type-metric-weight)">18.420,00</span></div>
  <div class="ds-kpi"><span class="ds-text-subtle">Proyek aktif</span><span class="ds-num" style="font-size:var(--ds-type-metric-size);font-weight:var(--ds-type-metric-weight)">7</span></div>
</div>
```

Pilih container query bila komponen harus menyesuaikan ruang yang diterimanya, bukan viewport.

## Breakpoint

```ds-tokens
breakpoint
```

| Lebar | Yang berubah |
| --- | --- |
| 640px | Tabel menjadi kartu berlabel, input tetap 16px, header halaman dan footer dialog menumpuk |
| 1024px | Sidebar tetap di kiri (di bawahnya menjadi drawer), tombol lipat muncul, padding `.ds-main` naik ke 32px |
| 1180px | Toolbar menumpuk: teks dahulu, aksi di bawah dan rata kanan |

Periksa 320px, 390px, 768px, dan 1280px di kedua bahasa. Jangan menambah breakpoint bila 640, 1024, atau 1180 cukup; catat breakpoint khusus komponen di halaman komponennya.

## Kepadatan

- **Nyaman** adalah default: kontrol setinggi 44px di layar sentuh dan jarak mengikuti skala di atas.
- **Ringkas** untuk tabel dan toolbar desktop yang padat. Bungkus area dengan `.ds-dense`: tombol dan chip kecil turun ke `--ds-size-target-compact` (36px) dan area tekan tetap minimal 24×24px. Jangan dipakai di perangkat sentuh atau untuk satu-satunya cara melakukan sesuatu.

```html preview title="Nyaman dan ringkas"
<div style="display:flex;flex-wrap:wrap;align-items:center;gap:1.5rem">
  <div style="display:flex;gap:.5rem"><button class="btn btn-sm">Nyaman</button><button class="btn btn-sm btn-primary">Simpan</button></div>
  <div class="ds-dense" style="display:flex;gap:.5rem"><button class="btn btn-sm">Ringkas</button><button class="btn btn-sm btn-primary">Simpan</button></div>
</div>
```

## Target sentuh

- Minimal 24×24px di mana pun (WCAG 2.5.8) dan 44×44px (`--ds-size-target`) pada `(pointer: coarse)`.
- Ukuran ringkas menjaga area tekan dengan padding atau pseudo-element, bukan dengan mengecilkan target.
- Beri jarak 8px antartarget agar jempol hanya mengenai satu.

## Safe area

Pada perangkat dengan notch dan sudut membulat, tambahkan `viewport-fit=cover` pada meta viewport dan beri padding tepi tetap dengan inset lingkungan:

```css
.bottom-bar {
  padding-block-end: max(var(--ds-space-3), env(safe-area-inset-bottom));
  padding-inline: max(var(--ds-space-4), env(safe-area-inset-left), env(safe-area-inset-right));
}
```

Terapkan pada bar tetap, bottom navigation, dan sheet. Jangan menaruh aksi utama di dalam inset.

## Panduan

- Pakai properti logis (`margin-inline-start`, `padding-block`, `inset-inline-end`) agar `dir="rtl"` bekerja tanpa perubahan.
- Kelompokkan item yang berkaitan lebih rapat daripada yang tidak: 8px dalam field, 24px antarfield, 32px antarbagian.
- Jangan menumpuk kartu lebih dari satu level; pakai hairline, bukan kotak kedua.
- Pakai `gap` antarsaudara, bukan margin di tiap anak.

## Token

`--ds-space-*`, `--ds-size-*`, `--ds-breakpoint-*`, `--ds-size-target`, `--ds-size-target-compact`, `--ds-size-measure`.
