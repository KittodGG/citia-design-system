---
title: Bentuk dan elevasi
group: Fondasi
order: 5
summary: Radius per komponen, ketebalan border, permukaan tanpa gradien, tingkat bayangan, scrim, cincin fokus, dan token opasitas.
source: TPS DESIGN.md bagian Master data operasional; Styles/app.css (radius, shadow, focus)
---

Kedalaman dibangun dari warna permukaan dan border tipis, bukan dari gradien atau bayangan berat. Bayangan hanya dipakai untuk lapisan yang melayang di atas konten.

## Radius {#radius}

```ds-radius
```

| Token | Nilai | Dipakai oleh |
| --- | --- | --- |
| `--radius-selector`, `--radius-field` | 0.375 rem (6 px) | Tombol, input, select, checkbox, tab: kontrol daisyUI |
| `--radius-box` | 0.625 rem (10 px) | Menu, alert, toast, popup |
| `--ds-radius-card` | 0.875 rem (14 px) | Kartu, panel, dialog |
| `--ds-radius-full` | 999 px | Pill status, avatar, titik status |

Radius di dalam wadah lebih kecil daripada radius wadahnya, supaya sudut tampak sejajar. Pilih token terdekat; jangan menulis radius baru.

## Border {#border}

```ds-tokens
border
```

| Token | Nilai | Pakai untuk |
| --- | --- | --- |
| `--ds-border-hairline` | 1 px | Border kartu, input, pemisah baris |
| `--ds-border-emphasis` | 1.5 px | Dropzone (putus-putus) |
| `--ds-border-focus` | 2 px | Cincin fokus |
| `--ds-border-accent` | 3 px | Penanda item aktif |
| `--ds-border-rail` | 4 px | Garis teal baris anak tabel |
| `--ds-border-edge` | 5 px | Tepi kartu status |
| `--ds-border-tone-bar` | 4 px | Bilah warna di toast dan alert |

Garis tebal membawa arti (hubungan anak, status). Jangan memakainya sebagai dekorasi.

## Permukaan {#permukaan}

- Konten berada di `base-100` di atas kanvas `base-200`, dengan border 1 px `base-300`.
- Tanpa gradien dan tanpa glassmorphism. daisyUI diatur `--depth: 0` dan `--noise: 0`.
- Tema terang: `#f9f9f6` (kartu) di atas `#f1f2ee` (kanvas). Tema gelap: `#151c25` di atas `#0e141b`.

## Tingkat elevasi {#elevasi}

```ds-shadows
```

| Tingkat | Token | Dipakai oleh |
| --- | --- | --- |
| 0 | `--ds-shadow-none` | Kartu, tabel, form: hanya border |
| 1 | `--ds-shadow-xs` | Tab aktif |
| 2 | `--ds-shadow-menu` | Panel menu baris yang tampil inline di bawah `<details>` (`.ds-menu-panel`) |
| 3 | `--ds-shadow-popover` | Lapisan melayang: popup combobox, kalender, menu `[popover]`, panel akun, toast, dialog `is-raised` |
| 4 | `--ds-shadow-panel` | Panel info di top bar (`.ds-notice-panel`) |
| 5 | `--ds-shadow-overlay` | Panel notifikasi (`.ds-notif-panel`) dan palet pencarian situs ini |
| lift | `--ds-shadow-lift` | Kartu yang bisa diklik saat hover, naik 2 px (`--ds-lift`) |
| pinned | `--ds-shadow-pinned-start`, `--ds-shadow-pinned-end` | Tepi kolom sticky tabel saat digeser |

### Lapisan melayang {#melayang}

Menu, popover, combobox, dan kalender memakai permukaan solid, border netral 1 px (`--ds-popover-border`), dan bayangan terbatas. Di tema gelap permukaan dinaikkan dengan 6% putih (`--ds-popover`) dan bayangan tidak diperberat.

### Scrim {#scrim}

`--ds-scrim` (`rgb(8 18 28 / .4)`) hanya untuk dialog yang memblokir halaman. Popover dan drawer non-modal tidak memakai scrim. Dengan `prefers-reduced-transparency`, scrim naik ke 70%.

## Cincin fokus {#fokus}

Cincin 2 px berwarna `--ds-focus` dengan offset 2 px, tampil pada `:focus-visible`. Komponen yang rata dengan tepinya (area scroll tabel, item navigasi, opsi combobox) memakai offset -2 px agar cincin tidak terpotong `overflow`.

```html preview title="Fokus pada tombol dan kontrol"
<div class="ds-actions is-start">
  <button type="button" class="btn">Tekan Tab</button>
  <button type="button" class="btn btn-primary">Simpan</button>
  <input class="input" aria-label="No BL" placeholder="BL-2026-00841" />
</div>
```

Warna cincin: `#00838f` (terang), `#00d4df` (gelap). Di mode warna paksa Windows, cincin berganti ke `CanvasText`.

## Opasitas {#opasitas}

```ds-tokens
opacity
```

- `--ds-opacity-disabled` .55: kontrol nonaktif dan sibuk.
- `--ds-opacity-pager-disabled` .45: panah pager di ujung daftar.
- `--ds-opacity-read` .62: baris notifikasi yang sudah dibaca.

Teks sekunder tidak diredupkan dengan opasitas; pakai `--ds-subtle` atau `--ds-muted` supaya kontras tetap terukur.
