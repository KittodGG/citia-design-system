---
title: Bentuk dan elevasi
group: foundations
order: 5
summary: Token radius, hairline 1px, tingkat bayangan, lapisan z-index, dan kapan material translusen boleh dipakai.
---

Kedalaman dibangun dari warna permukaan dan hairline 1px, bukan dari bayangan berat atau gradien. Bayangan hanya muncul pada lapisan yang melayang di atas konten, dan tetap sangat lembut.

## Radius

```ds-radius
```

| Token | Nilai | Dipakai oleh |
| --- | --- | --- |
| `--ds-radius-xs`, `--ds-radius-sm` | 2px, 4px | Kode inline, penanda kecil |
| `--ds-radius-md`, `--radius-field` | 6px | Tombol, input, select, tab |
| `--ds-radius-box`, `--radius-box` | 10px | Menu, alert, toast, popover |
| `--ds-radius-card` | 14px | Kartu, panel, dialog |
| `--ds-radius-full` | 999px | Pill, avatar, titik status |

Elemen di dalam wadah memakai radius lebih kecil daripada wadahnya agar sudutnya tampak sepusat. Pilih token terdekat; jangan menulis radius baru.

## Border

```ds-tokens
border
```

| Token | Nilai | Dipakai untuk |
| --- | --- | --- |
| `--ds-border-hairline` | 1px | Kartu, input, pemisah baris |
| `--ds-border-emphasis` | 1.5px | Dropzone putus-putus |
| `--ds-border-focus` | 2px | Focus ring |
| `--ds-border-accent` | 3px | Penanda item aktif |
| `--ds-border-rail`, `--ds-border-tone-bar` | 4px | Bilah tone di alert dan toast |

Pakai hairline `--color-base-300` untuk struktur dan `--ds-control-border` untuk tepi kontrol (3:1 terhadap permukaannya). Garis tebal membawa arti (status, hubungan); jangan dipakai sebagai dekorasi.

## Permukaan

- Konten berada di `--color-base-100` di atas kanvas `--color-base-200`, dengan border 1px `--color-base-300`.
- Tanpa gradien dan tanpa glow. daisyUI berjalan dengan `--depth: 0` dan `--noise: 0`.
- Di mode gelap, elevasi datang dari permukaan yang lebih terang, bukan bayangan yang lebih berat.

## Bayangan

```ds-shadows
```

| Tingkat | Token | Dipakai oleh |
| --- | --- | --- |
| 0 | `--ds-shadow-none` | Kartu, tabel, form: hanya border |
| 1 | `--ds-shadow-xs` | Tab terpilih, kontrol terangkat saat diam |
| 2 | `--ds-shadow-menu` | Panel menu inline |
| 3 | `--ds-shadow-panel` | Panel melayang: popover, combobox, kalender, item yang diseret |
| 4 | `--ds-shadow-overlay` | Dialog, panel notifikasi, command palette |
| lift | `--ds-shadow-lift` | Kartu yang bisa diklik saat hover, naik `--ds-lift` (-2px) |
| pinned | `--ds-shadow-pinned-start`, `-end` | Tepi kolom sticky tabel saat digeser |

Pakai hanya token ini. Lapisan melayang menggabungkan permukaan solid, border netral 1px (`--ds-popover-border`), dan satu tingkat bayangan.

```html preview title="Hairline dan tingkat bayangan"
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,11rem),1fr));gap:1.25rem;padding:.5rem">
  <div style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-card);background:var(--color-base-100);padding:1rem"><strong>Tingkat 0</strong><br><span class="ds-text-subtle">Hanya border</span></div>
  <div style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-card);background:var(--color-base-100);padding:1rem;box-shadow:var(--ds-shadow-menu)"><strong>Tingkat 2</strong><br><span class="ds-text-subtle">Panel menu</span></div>
  <div style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-card);background:var(--color-base-100);padding:1rem;box-shadow:var(--ds-shadow-panel)"><strong>Tingkat 3</strong><br><span class="ds-text-subtle">Panel melayang</span></div>
</div>
```

## Lapisan dan z-index

```ds-tokens
z
```

Dari bawah: kolom pinned tabel (2–3), header tabel (5–7), elemen sticky (10), menu (20), combobox (30), popover (40), notifikasi (45), modal (999), tooltip dan skip link (1000).

> [!IMPORTANT]
> Pakai lapisan bernama (`var(--ds-z-popover)`), bukan angka. Lapisan baru ditambahkan ke `tokens.json`, bukan ke CSS komponen. Utamakan top layer (`<dialog>`, `[popover]`) yang bertumpuk tanpa z-index.

### Scrim

`--ds-scrim` (`rgb(8 18 28 / .4)`) untuk dialog modal yang memblokir halaman. Popover dan drawer non-modal tidak memakai scrim. Dengan `prefers-reduced-transparency`, scrim naik ke 70%.

## Material translusen

Translusen hanya boleh untuk chrome yang menimpa konten yang bisa digulir: top bar sticky, bottom navigation, dan lapisan melayang. Bukan gaya untuk kartu atau panel.

- Campur token permukaan dengan transparansi, misalnya `color-mix(in oklab, var(--color-base-100) 85%, transparent)`, lalu tambahkan `backdrop-filter: blur(12px)`. Jangan memakai warna mentah.
- Jaga teks 4.5:1 terhadap konten terburuk yang bisa tergulir di bawahnya.
- Sediakan fallback opak: `@media (prefers-reduced-transparency: reduce)` dan browser tanpa `backdrop-filter` memakai `--color-base-100`. DS sudah melakukannya untuk popover, menu, combobox, dan toast.
- Jangan menumpuk dua lapisan translusen.

## Focus ring

Cincin 2px berwarna `--ds-focus` dengan offset 2px pada `:focus-visible`. Komponen yang rata dengan tepinya (area scroll tabel, item navigasi, opsi combobox) memakai -2px agar `overflow` tidak memotong cincin. Lihat [State](./states.md).

## Token

`--ds-radius-*`, `--ds-border-*`, `--ds-shadow-*`, `--ds-z-*`, `--ds-scrim`, `--ds-popover`, `--ds-popover-border`, `--ds-lift`.
