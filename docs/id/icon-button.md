---
title: Icon button
group: components
category: actions
order: 4
summary: Button persegi atau bulat yang hanya menampilkan ikon. Empat gaya, lima ukuran, slot badge, tooltip, dan nama yang bisa diakses.
source: TPS app.css .ds-icon-btn, .ds-chrome-btn
---

Icon button mengganti label dengan ikon bila maknanya sudah dikenal dan ruang sempit: tutup, salin, segarkan, lainnya. Ia selalu punya nama yang bisa diakses dan tooltip. Pakai [button](./button.md) bertulisan bila aksinya baru bagi pengguna, [toggle](./toggle.md) bila icon button menyala dan mati, dan [floating action button](./fab.md) untuk satu aksi utama sebuah layar.

## Contoh

### Gaya

Standard hanya ikon. Filled, tonal, dan outlined menambah penekanan sesuai urutan itu.

```html preview title="Standard, filled, tonal, outlined"
<div class="ds-actions is-start">
  <button type="button" class="ds-icon-button" aria-label="Ubah faktur" title="Ubah faktur"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg></button>
  <button type="button" class="ds-icon-button is-filled" aria-label="Tambah baris item" title="Tambah baris item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg></button>
  <button type="button" class="ds-icon-button is-tonal" aria-label="Bagikan" title="Bagikan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-share"></use></svg></button>
  <button type="button" class="ds-icon-button is-outlined" aria-label="Unduh PDF" title="Unduh PDF"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg></button>
  <button type="button" class="ds-icon-button is-tonal is-danger" aria-label="Hapus draft" title="Hapus draft"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg></button>
</div>
```

### Ukuran dan bentuk

`is-xs` 28px, `is-sm` 32px, sedang 40px, `is-lg` 48px, `is-xl` 56px. `is-round` membuat lingkaran. Di layar sentuh setiap ukuran punya area sentuh 44px.

```html preview title="Ukuran, persegi dan bulat"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-icon-button is-outlined is-xs" aria-label="Segarkan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
  <button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Segarkan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
  <button type="button" class="ds-icon-button is-outlined" aria-label="Segarkan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
  <button type="button" class="ds-icon-button is-outlined is-lg" aria-label="Segarkan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
  <button type="button" class="ds-icon-button is-outlined is-xl" aria-label="Segarkan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
  <button type="button" class="ds-icon-button is-filled is-round" aria-label="Putar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-play"></use></svg></button>
  <button type="button" class="ds-icon-button is-tonal is-round is-lg" aria-label="Jeda"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pause"></use></svg></button>
</div>
```

### Badge

Angka atau titik berada di sudut atas. Nama yang bisa diakses memuat angkanya, karena badge sendiri `aria-hidden`.

```html preview title="Badge dan titik"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-icon-button is-outlined" aria-label="Notifikasi, 3 belum dibaca" title="Notifikasi">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"></use></svg>
    <span class="ds-icon-button__badge" aria-hidden="true">3</span>
  </button>
  <button type="button" class="ds-icon-button is-outlined" aria-label="Pesan, baru" title="Pesan">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-mail"></use></svg>
    <span class="ds-icon-button__badge is-dot" aria-hidden="true"></span>
  </button>
  <button type="button" class="ds-icon-button is-outlined" aria-label="Peringatan, 12 perlu perhatian" title="Peringatan">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg>
    <span class="ds-icon-button__badge is-error" aria-hidden="true">12</span>
  </button>
</div>
```

### Dapat di-toggle

`aria-pressed` mengubahnya menjadi toggle. Gaya terpilih adalah isian tonal dan tepi 2px. Sediakan ikon untuk keadaan ditekan bila membantu.

```html preview title="Ditekan"
<div class="ds-actions is-start">
  <button type="button" class="ds-icon-button is-outlined" data-ds-toggle aria-pressed="false" aria-label="Penanda" title="Penanda">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg>
  </button>
  <button type="button" class="ds-icon-button is-outlined" data-ds-toggle aria-pressed="true" aria-label="Bintang" title="Bintang">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-star"></use></svg>
  </button>
</div>
```

### Kontrol versi 1

`.ds-icon-btn` (36px, teal tenang, untuk tabel padat) dan `.ds-chrome-btn` (44px, tanpa border, untuk top bar dan dialog) tetap berfungsi dan kini memakai state yang sama.

```html preview title=".ds-icon-btn dan .ds-chrome-btn"
<div class="ds-actions is-start" style="align-items:center">
  <a class="ds-icon-btn" href="#" aria-label="Ubah proyek PRJ-1024" title="Ubah proyek PRJ-1024"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg></a>
  <button type="button" class="ds-icon-btn is-danger" aria-label="Hapus proyek PRJ-1024" title="Hapus proyek PRJ-1024"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg></button>
  <button type="button" class="ds-chrome-btn" aria-label="Kembali" data-ds-back="/"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-arrow-left"></use></svg></button>
  <button type="button" class="ds-chrome-btn" aria-label="Ganti tema" data-ds-theme-toggle><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-moon"></use></svg></button>
</div>
```

## State

```html preview title="State icon button"
<div style="overflow-x:auto"><table style="border-collapse:separate;border-spacing:.25rem .5rem;font-size:.8125rem"><thead><tr><th></th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Diam</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Hover</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Focus</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Ditekan</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Terpilih</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Nonaktif</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">aria-disabled</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Memuat</th><th scope="col" style="text-align:start;font-weight:600;padding-inline:.125rem">Berhasil</th></tr></thead><tbody>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Standar</th><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Tandai"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Tandai" data-ds-demo="hover"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Tandai" data-ds-demo="focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Tandai" data-ds-demo="pressed"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Tandai" aria-pressed="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Tandai" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Tandai" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-sm" aria-label="Tandai" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-success is-sm" aria-label="Tandai"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Terisi</th><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Tandai"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Tandai" data-ds-demo="hover"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Tandai" data-ds-demo="focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Tandai" data-ds-demo="pressed"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Tandai" aria-pressed="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Tandai" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Tandai" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-sm" aria-label="Tandai" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-filled is-success is-sm" aria-label="Tandai"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Tonal</th><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Tandai"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Tandai" data-ds-demo="hover"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Tandai" data-ds-demo="focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Tandai" data-ds-demo="pressed"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Tandai" aria-pressed="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Tandai" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Tandai" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-sm" aria-label="Tandai" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-success is-sm" aria-label="Tandai"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Outlined</th><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Tandai"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Tandai" data-ds-demo="hover"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Tandai" data-ds-demo="focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Tandai" data-ds-demo="pressed"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Tandai" aria-pressed="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Tandai" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Tandai" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-sm" aria-label="Tandai" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-outlined is-success is-sm" aria-label="Tandai"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td></tr>
<tr><th scope="row" style="text-align:start;font-weight:600;white-space:nowrap;vertical-align:middle;padding-inline-end:.5rem">Bahaya</th><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Tandai"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Tandai" data-ds-demo="hover"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Tandai" data-ds-demo="focus"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Tandai" data-ds-demo="pressed"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Tandai" aria-pressed="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Tandai" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Tandai" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-sm" aria-label="Tandai" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td><td style="vertical-align:middle"><button type="button" class="ds-icon-button is-tonal is-danger is-success is-sm" aria-label="Tandai"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bookmark"></use></svg></button></td></tr>
</tbody></table></div>
```

```html preview title="State versi 1 dan chrome"
<div class="ds-actions is-start" style="align-items:center">
  <button type="button" class="ds-icon-btn" aria-label="Ubah"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg></button>
  <button type="button" class="ds-icon-btn" aria-label="Ubah" disabled><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg></button>
  <button type="button" class="ds-icon-btn" aria-label="Menyegarkan" aria-busy="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
  <button type="button" class="ds-chrome-btn" aria-label="Menu" aria-expanded="true"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-menu"></use></svg></button>
  <button type="button" class="ds-chrome-btn" aria-label="Menu" disabled><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-menu"></use></svg></button>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Diam | Tidak ada | Standard: hanya ikon. Filled: isian teal. Tonal: tint 12%. Outlined: tepi 1px |
| Hover | Pointer di atas, pada perangkat yang mendukung hover | State layer 6% (10% pada filled); 150ms |
| Focus-visible | Fokus keyboard | Cincin 2px `--ds-focus`, offset 2px |
| Pressed | Pointer ditekan | Layer 10% (16% pada filled), skala 0,97 selama 120ms |
| Selected | `aria-pressed="true"` | Isian tonal, warna tone, tepi 2px |
| Disabled | `disabled` | Opasitas 55%, `not-allowed`, tanpa hover atau tekan |
| aria-disabled | `aria-disabled="true"` | Tampilan sama, bisa difokuskan, alasan di `title` dan deskripsi |
| Loading | `aria-busy="true"` | Spinner menggantikan ikon di kotak yang sama; klik diblokir |
| Berhasil | `.is-success`, `.is-copied` | Hijau tonal dengan ikon centang selama 1,6 sampai 2 detik; `data-ds-copy` menerapkannya |
| Danger | `.is-danger` | Warna teks error di setiap state |
| Reduced motion | `prefers-reduced-motion` | Tanpa skala tekan; spinner menjadi cincin titik-titik |

## Anatomi

- `.ds-icon-button`: kontrolnya (`button`, `a`, `summary`), kotak persegi.
- Gaya: tanpa class (standard), `is-filled`, `is-tonal`, `is-outlined`. Tone: `is-danger`, atau `btn-success`, `btn-warning`, `btn-info`.
- Ukuran: `is-xs`, `is-sm`, sedang, `is-lg`, `is-xl`. Bentuk: `is-round`.
- `.ds-icon`: ikonnya (14px, 16px, 18px, 20px, 24px menurut ukuran).
- `.ds-icon-button__badge`: angka atau titik, `is-dot`, `is-error`. Selalu `aria-hidden`.
- Versi 1: `.ds-icon-btn` (36px), `.ds-chrome-btn` (44px).

## Penggunaan

- Pakai ikon yang dikenal orang: tutup, salin, cari, segarkan, lainnya, hapus. Untuk hal lain tulis label.
- Beri setiap icon button `aria-label` yang menyebut aksi dan objeknya ("Hapus faktur INV-2026-0418"), dan teks yang sama di `title`.
- Jaga target 24px atau lebih di desktop. Utamakan `is-sm` atau sedang; pakai `is-xs` hanya di toolbar padat.
- Tampilkan angka di badge hanya bila kurang dari 100; tulis `99+` di atasnya.
- Jangan pakai icon button untuk aksi terpenting di sebuah halaman; pakai [button](./button.md) bertulisan atau [FAB](./fab.md).
- Jangan mengandalkan warna untuk makna: icon button merah tetap butuh ikon dan nama yang tepat.

## Aksesibilitas

- Nama yang bisa diakses berasal dari `aria-label`. `title` menyediakan tooltip untuk pengguna pointer tetapi bukan nama.
- Badge bersifat dekoratif. Taruh angkanya di nama ("Notifikasi, 3 belum dibaca") agar terdengar oleh screen reader.
- Icon button yang bisa di-toggle memakai `aria-pressed` dan menjaga nama yang sama di kedua state ("Penanda", bukan "Hapus penanda").
- Target sentuh 44px pada `(pointer: coarse)`; ukuran kompak memperluas area sentuh dengan pseudo-element.
- Kontras: ikon 3:1 terhadap latarnya di setiap state, di tema terang dan gelap. Tepi outlined 3:1.

| Tombol | Aksi |
| --- | --- |
| Tab, Shift+Tab | Memindahkan fokus |
| Enter, Space | Mengaktifkan (anchor: hanya Enter) |

## Razor

```cshtml
<ds-icon-button icon="pencil" label="Ubah faktur INV-2026-0418" variant="outlined" size="sm" />
<ds-icon-button icon="bell" label="Notifikasi" badge="3" variant="outlined" />
<ds-icon-button icon="trash" label="Hapus draft" variant="tonal" tone="danger" />
<ds-icon-button icon="refresh" label="Segarkan" loading="true" />
<ds-icon-button icon="share" label="Bagikan" disabled-reason="Terbitkan proyek dahulu" />
```

| Atribut | Efek |
| --- | --- |
| `icon`, `label` | Nama ikon dan nama yang bisa diakses. `label` juga menjadi tooltip |
| `variant` | `standard` (bawaan), `filled`, `tonal`, `outlined` |
| `tone` | `danger`, `success`, `warning`, `info`, `neutral`, `accent` |
| `size` | `xs`, `sm`, `md` (bawaan), `lg`, `xl` |
| `round` | Lingkaran |
| `badge`, `badge-dot` | Angka atau titik; angkanya ditambahkan ke nama yang bisa diakses |
| `pressed` | `aria-pressed` |
| `loading`, `disabled`, `disabled-reason`, `href` | Seperti pada [button](./button.md) |

## JavaScript

Icon button memakai API [button](./button.md): `DS.button.loading(el, on)` dan `DS.button.success(el)`. Dengan `data-ds-toggle` kontrol membalik `aria-pressed` dan memicu `ds:toggle:change`. `data-ds-copy` dan `data-ds-copy-text` menyalin teks dan menampilkan state berhasil.

## Token

`--ds-size-target`, `--ds-size-target-compact`, `--ds-radius-md|lg|full`, `--color-base-content`, `--ds-quiet`, `--ds-error-text`, `--ds-control-border`, `--color-primary`, `--ds-opacity-state-*`, `--ds-opacity-disabled`, `--ds-press-scale`, `--ds-type-micro-size|weight`.

## Native dan daisyUI

`.ds-icon-button` adalah `button` (atau `a`) yang memakai state engine yang sama dengan `.btn`, sehingga menerima class varian dan tone yang sama. `btn btn-ghost btn-square` daisyUI tetap berfungsi; komponen DS menambah gaya filled, tonal, dan outlined, bentuk bulat, slot badge, dan ukuran.
