---
title: Segmented control
group: components
category: actions
order: 9
summary: Satu pilihan dari 2 sampai 5 opsi yang mengubah cara konten ditampilkan. Thumb terangkat bergeser ke opsi terpilih; markup radio, button, dan link.
source: TPS app.css .view-switch L708–760
---

Segmented control memilih satu opsi dari himpunan pendek yang saling eksklusif dan langsung menerapkannya: daftar atau grid, harian atau mingguan, longgar atau ringkas. Pakai untuk 2 sampai 5 opsi dengan label pendek. Untuk opsi lebih banyak pakai [Select](./select.md) atau [Radio group](./radio-group.md); untuk tampilan dengan panel konten sendiri pakai [Tabs](./tabs.md); untuk hidup/mati pakai [Switch](./switch.md).

Kontrol ini punya tiga markup. **Radio** (`<label><input type="radio">`) adalah pilihan tepat di dalam form: mengirim nilai dan memakai navigasi tombol panah bawaan. **Button** dengan `aria-pressed` untuk perubahan tampilan di sisi klien. **Link** dengan `aria-current` untuk pilihan yang memuat ulang halaman dengan query string baru.

## Examples

### Radios

Tombol panah berpindah antaropsi dan memilihnya, seperti pada radio group mana pun. Radio disembunyikan secara visual tetapi tetap dapat difokuskan.

```html preview title="Segmen radio"
<div class="ds-segmented" role="radiogroup" aria-label="Kepadatan tabel" data-ds-segmented>
  <label><input type="radio" name="seg-density" value="comfortable" checked>Longgar</label>
  <label><input type="radio" name="seg-density" value="compact">Ringkas</label>
</div>
```

### Buttons dan ikon

Opsi hanya-ikon memerlukan `aria-label`. Pasang `aria-pressed` pada tepat satu button.

```html preview title="Segmen button dengan ikon"
<div class="ds-segmented" role="group" aria-label="Tampilan" data-ds-segmented>
  <button type="button" aria-pressed="true" aria-label="Daftar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-list"/></svg></button>
  <button type="button" aria-pressed="false" aria-label="Grid"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-layout-grid"/></svg></button>
  <button type="button" aria-pressed="false" aria-label="Tabel"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-table"/></svg></button>
</div>
<div class="ds-segmented" role="group" aria-label="Rentang" data-ds-segmented style="margin-top:1.5rem">
  <button type="button" aria-pressed="false"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-calendar"/></svg>7 hari</button>
  <button type="button" aria-pressed="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-calendar"/></svg>30 hari</button>
  <button type="button" aria-pressed="false"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-calendar"/></svg>90 hari</button>
</div>
```

### Links

Pakai tautan bila pilihannya adalah URL (`?view=weekly`). Server menandai opsi saat ini dengan `aria-current="page"`.

```html preview title="Segmen link"
<div class="ds-segmented" role="group" aria-label="Faktur per" data-ds-segmented>
  <a href="#" aria-current="page">Per pelanggan</a>
  <a href="#">Per proyek</a>
</div>
```

### Sizes, full width, dan primary

`is-sm` (32px), bawaan (40px), `is-lg` (48px). `is-full` memenuhi kontainer dengan kolom sama lebar. `is-primary` mengisi thumb dengan `--color-primary` untuk pilihan yang menjadi kontrol utama area itu.

```html preview title="Ukuran, lebar penuh, primary"
<div class="ds-segmented is-sm" role="group" aria-label="Kecil" data-ds-segmented>
  <button type="button" aria-pressed="true">Hari</button><button type="button" aria-pressed="false">Minggu</button><button type="button" aria-pressed="false">Bulan</button>
</div>
<div class="ds-segmented is-lg" role="group" aria-label="Besar" data-ds-segmented style="margin-top:1rem">
  <button type="button" aria-pressed="true">Hari</button><button type="button" aria-pressed="false">Minggu</button><button type="button" aria-pressed="false">Bulan</button>
</div>
<div class="ds-segmented is-full" role="group" aria-label="Lebar penuh" data-ds-segmented style="margin-top:1rem">
  <button type="button" aria-pressed="false">Faktur</button><button type="button" aria-pressed="true">Penawaran</button>
</div>
<div class="ds-segmented is-primary" role="group" aria-label="Primary" data-ds-segmented style="margin-top:1rem">
  <button type="button" aria-pressed="true">Bulanan</button><button type="button" aria-pressed="false">Tahunan</button>
</div>
```

## States

```html preview title="Terpilih, opsi nonaktif, grup nonaktif"
<div class="ds-segmented" role="radiogroup" aria-label="Paket" data-ds-segmented>
  <label><input type="radio" name="seg-st-1" value="free" checked>Gratis</label>
  <label><input type="radio" name="seg-st-1" value="team">Tim</label>
  <label><input type="radio" name="seg-st-1" value="enterprise" disabled>Enterprise</label>
</div>
<fieldset disabled style="border:0;padding:0;margin:1.5rem 0 0">
  <legend class="ds-visually-hidden">Pilihan terkunci</legend>
  <div class="ds-segmented" role="radiogroup" aria-label="Terkunci" data-ds-segmented>
    <label><input type="radio" name="seg-st-2" value="a" checked>Bulanan</label>
    <label><input type="radio" name="seg-st-2" value="b">Tahunan</label>
  </div>
</fieldset>
<div class="ds-segmented" role="group" aria-label="Dengan penjelasan" data-ds-segmented style="margin-top:1.5rem">
  <button type="button" aria-pressed="true">Standar</button>
  <button type="button" aria-pressed="false" aria-disabled="true" title="Tersedia setelah verifikasi">Ekspres</button>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak ada | Teks `--ds-subtle` di atas track `--color-base-200` |
| Hover | pointer di atas opsi | teks menjadi `--color-base-content`, tint 6% |
| Pressed | pointer ditekan | tint 10% |
| Focus-visible | fokus keyboard (juga pada radio tersembunyi) | ring 2px `--ds-focus` di sekeliling opsi |
| Selected | `:checked`, `aria-pressed="true"`, atau `aria-current` | thumb `--color-base-100` terangkat dengan garis tipis dan `--ds-shadow-xs`, teks kontras penuh; thumb bergeser |
| Disabled | `disabled` pada input atau button, atau fieldset nonaktif | opacity 55%, kursor `not-allowed`, tanpa hover atau press |
| aria-disabled | `aria-disabled="true"` | tampilan sama, tetap dapat difokuskan agar `title` bisa menjelaskan alasannya |
| Tanpa JavaScript | `data-ds-ready` tidak terpasang | opsi terpilih membawa isian terangkatnya sendiri; hanya tidak bergeser |

## Anatomy

- `.ds-segmented`: track dan root. Modifier: `is-sm`, `is-lg`, `is-full`, `is-primary`.
- Opsi: child langsung `label`, `button`, atau `a`.
- `.ds-segmented__thumb`: thumb geser, dibuat oleh `tabs.js`.

## Usage

- Pakai 2 sampai 5 opsi, masing-masing satu atau dua kata, maksimal 16 karakter. Semua opsi sama lebar, jadi label terpanjang menentukan ukurannya.
- Pilih satu opsi sejak awal. Segmented control tidak punya state "tidak ada".
- Terapkan perubahan segera. Bila pilihan butuh tombol Simpan, pakai [Radio group](./radio-group.md).
- Jangan pakai untuk navigasi antarhalaman situs (pakai [Tabs](./tabs.md) atau [Navbar](./navbar.md)) atau untuk menghidupkan satu pengaturan (pakai [Switch](./switch.md)).
- Tambahkan satu kalimat di bawah kontrol bila opsinya tidak jelas dengan sendirinya.

## Accessibility

- Radio memakai `role="radiogroup"` (atau `<fieldset>` dengan legend) dan nama yang dapat diakses. Button memakai `role="group"` dan `aria-pressed`. Link memakai `aria-current`.
- Terpilih tidak ditunjukkan hanya lewat warna: thumb terangkat dan perubahan kontras menandainya.
- Opsi hanya-ikon memerlukan `aria-label`; label menamai opsi, bukan statusnya.
- Area sentuh setinggi 40px dan 44px di layar sentuh.
- Motion: thumb bergerak dengan `--ds-ease-spring` selama `--ds-duration-spring` tanpa overshoot, melanjutkan dari posisinya saat diinterupsi, dan langsung loncat di bawah `prefers-reduced-motion`.
- Forced colours: opsi terpilih mendapat border `Highlight` 2px.

| Tombol | Aksi |
| --- | --- |
| Tab | Masuk ke grup (radio: ke opsi yang dicentang) dan keluar |
| Arrow keys | Radio: memilih opsi berikutnya atau sebelumnya, berputar |
| Space | Radio: memilih opsi yang difokuskan. Button: menekannya |
| Enter | Button dan link: mengaktifkan |

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-segmented` | Membuat thumb geser dan menjaganya di opsi terpilih. Button dengan `aria-pressed` bekerja sebagai satu pilihan. `data-ds-segmented="off"` untuk menonaktifkan |

```js
document.addEventListener("ds:segmented:change", (e) => {
  console.log(e.detail.value);   // nilai radio, atau value / teks button
});
```

Thumb juga mengikuti perubahan yang dibuat kode Anda pada `aria-pressed`, `aria-current`, `aria-checked`, dan state radio.

## Tokens

`--color-base-100`, `--color-base-200`, `--color-base-300`, `--color-base-content`, `--color-primary`, `--color-primary-content`, `--ds-subtle`, `--ds-focus`, `--ds-radius-lg`, `--ds-radius-xl`, `--ds-shadow-xs`, `--ds-size-target`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-duration-spring`, `--ds-ease-spring`.

## Native and daisyUI

Dibangun di atas input radio, button, dan link bawaan. Pola grup `join` dan `btn` milik daisyUI tidak dipakai; track dan thumb adalah class DS. Markup versi 1 (`.ds-segmented` dengan child `<a>`, `<button aria-pressed>`, atau `<label>`) tidak berubah. Satu-satunya perubahan visual dari versi 1 adalah tampilan bawaan: thumb netral terangkat, bukan opsi teal terisi; tambahkan `is-primary` untuk tampilan versi 1. [Theme switcher](./theme-switcher.md) dan [Language switcher](./language-switcher.md) dibangun di atas kontrol ini.
