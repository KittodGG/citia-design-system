---
title: Toggle
group: components
category: actions
order: 6
summary: Button dua keadaan yang tetap tertekan atau tidak, dengan aria-pressed. Gaya ghost, outlined, filled, dan tonal, dengan atau tanpa label.
---

Toggle adalah button yang menyalakan atau mematikan satu opsi dan tetap dalam keadaan itu: Tebal, Bisukan, Tampilkan arsip, Sematkan. Ia adalah `button` dengan `aria-pressed`. Pakai [switch](./switch.md) untuk pengaturan yang langsung berlaku di form, [checkbox](./checkbox.md) untuk pilihan yang dikirim bersama form, [toggle group](./toggle-group.md) untuk beberapa toggle yang berkaitan, dan [button](./button.md) untuk aksi yang tidak menyimpan state.

## Contoh

### Dengan label

Klik untuk mengalihkan. `data-ds-toggle` membalik `aria-pressed`.

```html preview title="Toggle teks dan ikon"
<div class="ds-actions is-start">
  <button type="button" class="ds-toggle" data-ds-toggle aria-pressed="false">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg>
    <span class="ds-btn__label">Sematkan proyek</span>
  </button>
  <button type="button" class="ds-toggle" data-ds-toggle aria-pressed="true">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>
    <span class="ds-btn__label">Tampilkan arsip</span>
  </button>
  <button type="button" class="ds-toggle" data-ds-toggle aria-pressed="false">
    <span class="ds-btn__label">Hanya faktur saya</span>
  </button>
</div>
```

### Hanya ikon

Toggle hanya-ikon butuh `aria-label`, dan label tidak berubah saat state berubah.

```html preview title="Toggle ikon"
<div class="ds-actions is-start">
  <button type="button" class="ds-toggle is-icon" data-ds-toggle aria-pressed="true" aria-label="Tebal" title="Tebal"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bold"></use></svg></button>
  <button type="button" class="ds-toggle is-icon" data-ds-toggle aria-pressed="false" aria-label="Miring" title="Miring"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-italic"></use></svg></button>
  <button type="button" class="ds-toggle is-icon" data-ds-toggle aria-pressed="false" aria-label="Garis bawah" title="Garis bawah"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-underline"></use></svg></button>
</div>
```

### Gaya

Ghost adalah bawaan. Outlined menambah tepi 1px, tonal tint 12%. Filled menampilkan isian netral saat mati dan teal solid saat menyala.

```html preview title="Ghost, outlined, tonal, filled"
<div class="ds-actions is-start">
  <button type="button" class="ds-toggle" data-ds-toggle aria-pressed="false">Ghost</button>
  <button type="button" class="ds-toggle is-outlined" data-ds-toggle aria-pressed="false">Outlined</button>
  <button type="button" class="ds-toggle is-tonal" data-ds-toggle aria-pressed="false">Tonal</button>
  <button type="button" class="ds-toggle is-filled" data-ds-toggle aria-pressed="false">Filled</button>
  <button type="button" class="ds-toggle" aria-pressed="true">Ghost aktif</button>
  <button type="button" class="ds-toggle is-outlined" aria-pressed="true">Outlined aktif</button>
  <button type="button" class="ds-toggle is-tonal" aria-pressed="true">Tonal aktif</button>
  <button type="button" class="ds-toggle is-filled" aria-pressed="true">Filled aktif</button>
</div>
```

### Ukuran

```html preview title="xs, sm, md, lg"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-toggle is-outlined is-xs" data-ds-toggle aria-pressed="true">Sangat kecil</button>
  <button type="button" class="ds-toggle is-outlined is-sm" data-ds-toggle aria-pressed="true">Kecil</button>
  <button type="button" class="ds-toggle is-outlined" data-ds-toggle aria-pressed="true">Sedang</button>
  <button type="button" class="ds-toggle is-outlined is-lg" data-ds-toggle aria-pressed="true">Besar</button>
</div>
```

### Ikon untuk tiap state

Bungkus ikon dalam `.ds-toggle__off` dan `.ds-toggle__on`. Hanya yang sesuai `aria-pressed` yang tampil. Nama yang bisa diakses tetap sama.

```html preview title="Pergantian ikon"
<button type="button" class="ds-toggle is-outlined" data-ds-toggle aria-pressed="false" aria-label="Bisukan notifikasi">
  <span class="ds-toggle__off"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"></use></svg>Notifikasi aktif</span>
  <span class="ds-toggle__on"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg>Dibisukan</span>
</button>
```

## State

```html preview title="State toggle"
<div style="overflow-x:auto"><table style="border-collapse:separate;border-spacing:.375rem .5rem;font-size:.8125rem">
<thead><tr><th></th><th scope="col" style="text-align:start">Diam</th><th scope="col" style="text-align:start">Hover</th><th scope="col" style="text-align:start">Focus</th><th scope="col" style="text-align:start">Ditekan</th><th scope="col" style="text-align:start">Aktif</th><th scope="col" style="text-align:start">Nonaktif</th><th scope="col" style="text-align:start">aria-disabled</th><th scope="col" style="text-align:start">Memuat</th></tr></thead>
<tbody>
<tr><th scope="row" style="text-align:start;vertical-align:middle">Ghost</th>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false" data-ds-demo="hover">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false" data-ds-demo="focus">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false" data-ds-demo="pressed">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="true">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false" disabled>Sematkan</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false" aria-disabled="true" title="Tersedia untuk admin">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-sm" aria-pressed="false" aria-busy="true">Sematkan</button></td></tr>
<tr><th scope="row" style="text-align:start;vertical-align:middle">Outlined</th>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false" data-ds-demo="hover">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false" data-ds-demo="focus">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false" data-ds-demo="pressed">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="true">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false" disabled>Sematkan</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false" aria-disabled="true" title="Tersedia untuk admin">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-outlined is-sm" aria-pressed="false" aria-busy="true">Sematkan</button></td></tr>
<tr><th scope="row" style="text-align:start;vertical-align:middle">Filled</th>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false" data-ds-demo="hover">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false" data-ds-demo="focus">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false" data-ds-demo="pressed">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="true">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false" disabled>Sematkan</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false" aria-disabled="true" title="Tersedia untuk admin">Sematkan</button></td>
<td><button type="button" class="ds-toggle is-filled is-sm" aria-pressed="false" aria-busy="true">Sematkan</button></td></tr>
</tbody></table></div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Diam (mati) | `aria-pressed="false"` | Ghost: teks warna dasar. Outlined: tepi kontrol 1px. Filled: isian netral 8% |
| Hover | Pointer di atas, pada perangkat yang mendukung hover | State layer 6% (10% pada filled); 150ms |
| Focus-visible | Fokus keyboard | Cincin 2px `--ds-focus`, offset 2px |
| Pressed | Pointer ditekan | Layer 10% dan skala 0,97 selama 120ms |
| Aktif | `aria-pressed="true"` | Tint primary 12%, teks primary, tepi 2px: petunjuk bentuk selain warna. Filled menjadi teal solid dengan teks putih |
| Disabled | `disabled` | Opasitas 55%, `not-allowed`, mempertahankan tampilan aktif atau matinya |
| aria-disabled | `aria-disabled="true"` | Tampilan sama, bisa difokuskan, klik diabaikan, alasan di `title` dan deskripsi |
| Loading | `aria-busy="true"` | Spinner sebelum label; state tidak berubah sampai permintaan selesai |
| Reduced motion | `prefers-reduced-motion` | Tanpa skala tekan; perubahan warna tetap |
| Forced colours | `forced-colors: active` | State aktif memakai `Highlight` dan `HighlightText` |

## Anatomi

- `.ds-toggle`: button-nya. Gaya: tanpa class (ghost), `is-outlined`, `is-tonal`, `is-filled`. Ukuran: `is-xs`, `is-sm`, sedang, `is-lg`, `is-xl`. `is-icon` untuk hanya-ikon.
- `data-ds-toggle`: membuat `toggle.js` membalik `aria-pressed` saat diklik.
- `.ds-toggle__off`, `.ds-toggle__on`: isi opsional yang tampil untuk satu state.
- `.ds-btn__label`: pembungkus teks.

## Penggunaan

- Namai toggle menurut yang dikendalikannya ("Tebal", "Sematkan proyek"), bukan aksinya ("Nyalakan tebal"). State pressed menunjukkan apakah ia menyala.
- Jangan mengubah label saat state berubah; screen reader akan mengumumkan state dua kali. Ganti ikon, bukan nama.
- Pakai toggle untuk opsi yang langsung berlaku dan bisa dibatalkan. Untuk pengaturan yang menunggu tombol Simpan pakai [checkbox](./checkbox.md) atau [switch](./switch.md).
- Jangan pakai toggle untuk aksi sekali jalan (pakai [button](./button.md)) atau navigasi (pakai [tabs](./tabs.md)).
- Kelompokkan tiga toggle berkaitan atau lebih dalam [toggle group](./toggle-group.md).

## Aksesibilitas

- Role: `button` native dengan `aria-pressed="true|false"`. Jangan menggabungkan `aria-pressed` dengan `role="switch"` atau `aria-checked`.
- Toggle hanya-ikon butuh `aria-label`; namanya tetap.
- Aktif ditunjukkan lewat tint, warna teks, dan tepi lebih tebal, bukan hanya warna.
- `aria-disabled="true"` menjaga toggle tetap bisa difokuskan dan mengabaikan klik.
- Kontras: 4,5:1 untuk teks, 3:1 untuk tepi, di kedua tema. Target: 44px di layar sentuh.

| Tombol | Aksi |
| --- | --- |
| Tab, Shift+Tab | Memindahkan fokus |
| Enter, Space | Mengalihkan toggle |

## Razor

```cshtml
<ds-toggle icon="bookmark" pressed="true" variant="outlined">Sematkan proyek</ds-toggle>
<ds-toggle icon="bold" label="Tebal" size="sm" />
<ds-toggle variant="tonal" disabled-reason="Tersedia untuk admin">Tampilkan arsip</ds-toggle>
```

| Atribut | Efek |
| --- | --- |
| Isi elemen, `icon`, `label` | Teks dan ikon yang terlihat. Tanpa isi elemen toggle menjadi hanya-ikon dan `label` menjadi namanya |
| `variant` | `ghost` (bawaan), `outlined`, `tonal`, `filled` |
| `size` | `xs`, `sm`, `md` (bawaan), `lg`, `xl` |
| `pressed` | State awal |
| `loading`, `disabled`, `disabled-reason` | Seperti pada [button](./button.md) |

## JavaScript

| Atribut atau API | Efek |
| --- | --- |
| `[data-ds-toggle]` | Klik membalik `aria-pressed`. Tanpa `aria-pressed` modul menambahkan `false` saat dimuat |
| `DS.toggle.set(el, pressed)` | Mengatur state dan memicu event |

Event `ds:toggle:change` naik dari toggle dengan `detail.pressed`.

```js
document.addEventListener("ds:toggle:change", (event) => {
  if (event.target.id === "pin") save({ pinned: event.detail.pressed });
});
```

## Token

`--color-primary`, `--ds-quiet`, `--color-base-content`, `--ds-control-border`, `--ds-opacity-state-hover|pressed|selected`, `--ds-opacity-disabled`, `--ds-press-scale`, `--ds-radius-md|lg|box`, `--ds-size-target`, `--ds-focus`.

## Native dan daisyUI

Toggle adalah `button` native dengan `aria-pressed`. Ia bukan `.toggle` daisyUI (switch berbasis checkbox); itu didokumentasikan sebagai [Switch](./switch.md). Toggle DS memakai selector `aria-pressed` yang juga dipakai daisyUI untuk `.btn`, dan menambah tampilan terpilih tonal.
