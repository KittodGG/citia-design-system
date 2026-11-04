---
title: Floating action button
group: components
category: actions
order: 5
summary: Satu aksi utama sebuah layar sebagai button terangkat bersudut bulat, ditempatkan di ujung bawah di atas safe area. Reguler, kecil, besar, extended.
---

Floating action button (FAB) memuat satu aksi yang paling umum di sebuah layar, seperti Faktur baru atau Tulis, dan tetap terjangkau saat konten digulir. Pakai satu kali per layar, pada layar yang punya aksi pembuatan yang jelas. Pakai [button](./button.md) di header halaman bila aksinya bukan inti layar, [icon button](./icon-button.md) untuk alat sekunder, dan [split button](./split-button.md) bila aksinya punya variasi.

## Contoh

### Ukuran

Kecil 40px, reguler 56px, besar 96px. Ikonnya 20px, 24px, dan 36px.

```html preview title="Kecil, reguler, besar"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-fab is-sm" aria-label="Faktur baru" title="Faktur baru"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" aria-label="Faktur baru" title="Faktur baru"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab is-lg" aria-label="Faktur baru" title="Faktur baru"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
</div>
```

### Extended

Tambahkan label agar aksinya lebih jelas. Label menjadi nama yang bisa diakses, jadi `aria-label` tidak diperlukan.

```html preview title="Extended"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-fab is-extended"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg><span class="ds-btn__label">Faktur baru</span></button>
  <button type="button" class="ds-fab is-extended is-tonal"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg><span class="ds-btn__label">Tulis</span></button>
  <button type="button" class="ds-fab is-extended is-surface"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-upload"></use></svg><span class="ds-btn__label">Unggah berkas</span></button>
</div>
```

### Warna

Primary adalah bawaan. Tonal dan surface mempertahankan isian buram, karena FAB berada di atas konten.

```html preview title="Primary, tonal, surface"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-fab" aria-label="Tambah"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab is-tonal" aria-label="Ubah"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg></button>
  <button type="button" class="ds-fab is-surface" aria-label="Pindai"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-camera"></use></svg></button>
</div>
```

### Penempatan

`is-floating` menetapkan FAB di sudut akhir bawah, 16px dari tepi dan di atas safe area perangkat. `is-start` memindahkannya ke sudut awal. Atur `--ds-fab-offset` untuk mengangkatnya di atas bottom navigation atau snackbar. Pratinjau di bawah dipotong dalam bingkai agar posisinya terlihat.

```html preview title="Mengambang, ujung bawah"
<div style="position:relative;height:12rem;overflow:hidden;transform:translateZ(0);border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box)">
  <p class="ds-text-subtle" style="padding:1rem">Daftar faktur. Button tetap di ujung bawah saat daftar digulir.</p>
  <button type="button" class="ds-fab is-extended is-floating"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg><span class="ds-btn__label">Faktur baru</span></button>
</div>
```

### Sembunyi saat gulir

`data-ds-fab-hide` menyembunyikan FAB saat pengguna menggulir ke bawah dan menampilkannya lagi saat menggulir ke atas, sehingga tidak menutupi baris terakhir daftar. Ia tetap terlihat selama punya fokus.

```html
<button type="button" class="ds-fab is-floating" data-ds-fab-hide aria-label="Faktur baru" title="Faktur baru">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>
</button>
```

## State

```html preview title="State FAB"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-fab" aria-label="Diam"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" data-ds-demo="hover" aria-label="Hover"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" data-ds-demo="focus" aria-label="Focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" data-ds-demo="pressed" aria-label="Ditekan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" disabled aria-label="Nonaktif"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" aria-disabled="true" aria-label="aria-disabled" title="Pilih proyek dahulu"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab" aria-busy="true" aria-label="Memuat"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab is-success" aria-label="Berhasil"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-fab is-extended" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg><span class="ds-btn__label">Membuat…</span></button>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Diam | Tidak ada | Teal terisi (atau tonal, surface), elevasi `--ds-shadow-popover` |
| Hover | Pointer di atas, pada perangkat yang mendukung hover | State layer 10% lebih pekat; 150ms. Bayangan tidak berubah |
| Focus-visible | Fokus keyboard | Cincin 2px `--ds-focus`, offset 2px |
| Pressed | Pointer ditekan | Layer 16% dan skala 0,97 selama 120ms |
| Selected | `aria-pressed="true"` | Tepi dalam 2px (FAB yang membuka speed dial) |
| Disabled | `disabled` | Opasitas 55%, tanpa bayangan, `not-allowed` |
| aria-disabled | `aria-disabled="true"` | Tampilan sama, bisa difokuskan, alasan di `title` dan deskripsi |
| Loading | `aria-busy="true"` | Spinner menggantikan ikon; label extended tetap terbaca; klik diblokir |
| Berhasil | `.is-success` | Hijau tonal dan ikon centang selama 1,6 sampai 2 detik |
| Tersembunyi saat gulir | `data-ds-hidden="true"` | Meluncur 100% ditambah 2rem ke bawah, memudar, dan keluar dari urutan tab setelah 500ms. Tidak pernah saat difokuskan |
| Reduced motion | `prefers-reduced-motion` | Tanpa luncuran, tanpa skala tekan; FAB hanya memudar |
| Sentuh | `(pointer: coarse)` | FAB kecil membesar ke 44px |

## Anatomi

- `.ds-fab`: button (atau `a`). Ukuran `is-sm`, reguler, `is-lg`. Warna `is-tonal`, `is-surface`.
- `is-extended`: ikon ditambah `.ds-btn__label`.
- `is-floating`: penempatan tetap; `is-start` untuk sudut awal. `--ds-fab-offset` mengangkatnya.
- `data-ds-fab-hide`: sembunyi saat menggulir ke bawah.

## Penggunaan

- Pakai satu FAB per layar, untuk aksi yang paling sering dilakukan di sana. Layar tanpa aksi pembuatan yang jelas tidak memakai FAB.
- Pakai bentuk extended bila ikon saja ambigu atau saat pertama dipakai. Tanda tambah polos cukup untuk "tambah" pada daftar.
- Jaga agar tidak bertabrakan dengan UI tetap lain: atur `--ds-fab-offset` sebesar tinggi bottom navigation (56px) ditambah 8px.
- Jangan menaruh FAB dan button primary terisi di layar yang sama, jangan menumpuk FAB, dan jangan memakainya untuk aksi destruktif.
- Di layar lebar (1024px ke atas) utamakan [button](./button.md) di header; FAB cocok untuk ponsel dan tablet.

## Aksesibilitas

- FAB hanya-ikon butuh `aria-label`; FAB extended diberi nama oleh labelnya.
- Taruh FAB di akhir DOM (setelah konten) agar pengguna keyboard mencapai konten lebih dahulu.
- FAB tersembunyi saat menggulir hanya untuk gulir pointer dan sentuh; memfokuskannya, atau kontrol di dalamnya, selalu menampilkannya.
- Inset safe area (`env(safe-area-inset-*)`) menjaganya dari indikator beranda dan takik layar.
- Kontras: ikon atau label 4,5:1 terhadap isian; FAB 3:1 terhadap halaman lewat isian atau tepinya.
- Target: 56px bawaan, minimal 44px untuk ukuran kecil di layar sentuh.

| Tombol | Aksi |
| --- | --- |
| Tab, Shift+Tab | Memindahkan fokus |
| Enter, Space | Mengaktifkan |

## Razor

```cshtml
<ds-fab icon="plus" label="Faktur baru" floating hide-on-scroll />
<ds-fab icon="plus" floating variant="tonal">Faktur baru</ds-fab>
<ds-fab icon="plus" size="sm" label="Tambah" href="@Url.Action("Create")" />
```

| Atribut | Efek |
| --- | --- |
| `icon`, `label` | Nama ikon; nama yang bisa diakses pada FAB hanya-ikon |
| Isi elemen | Menjadikan FAB extended; isinya menjadi label |
| `size` | `sm`, `md` (bawaan), `lg` |
| `variant` | `primary` (bawaan), `tonal`, `surface` |
| `floating`, `start` | Penempatan tetap; sudut awal |
| `hide-on-scroll` | `data-ds-fab-hide` |
| `loading`, `disabled`, `disabled-reason`, `href` | Seperti pada [button](./button.md) |

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-fab-hide` | Mengatur `data-ds-hidden="true"` saat pengguna menggulir ke bawah melewati 80px, menghapusnya saat menggulir ke atas |

API yang sama dengan [button](./button.md) berlaku: `DS.button.loading(fab, true)` dan `DS.button.success(fab)`.

## Token

`--ds-shadow-popover`, `--ds-radius-xl|2xl`, `--ds-space-4|8`, `--ds-z-sticky`, `--ds-fab-offset` (kustom, bawaan 0), `--color-primary`, `--color-primary-content`, `--ds-duration-spring`, `--ds-ease-spring`, `--ds-duration-quick`, `--ds-opacity-state-*`.

## Native dan daisyUI

FAB adalah `button` atau `a` yang memakai state engine button. daisyUI tidak punya FAB; komponen speed dial `fab`-nya tidak dipakai. Komponen DS memakai transisi `translate` dan `opacity` dengan ease pegas tanpa overshoot.
