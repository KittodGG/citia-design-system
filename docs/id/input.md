---
title: Input
group: components
category: forms
order: 2
summary: Field teks satu baris dengan ukuran, ikon awal dan akhir, tombol hapus, indikator memuat, dan setiap state validasi.
source: TPS app.css L1696-1975
---

Input menampung satu baris teks: nama, alamat email, kode. Gunakan [textarea](./textarea.md) untuk beberapa baris, [number input](./number-input.md) untuk jumlah, [password input](./password-input.md) untuk kata sandi, [search input](./search-input.md) untuk menyaring, dan [select](./select.md) atau [combobox](./combobox.md) bila jawabannya berasal dari daftar. Selalu letakkan di dalam [field](./field.md).

## Contoh

### Ukuran

Tiga ukuran: kecil 36px, sedang 44px (bawaan), dan besar 52px. Di layar sentuh ukuran kecil menjadi 44px. Teks 16px di ponsel agar iOS tidak memperbesar halaman.

```html preview title="Kecil, sedang, besar"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-input is-sm"><input class="ds-input__control" aria-label="Kecil" placeholder="Kecil, 36px"></div>
  <div class="ds-input"><input class="ds-input__control" aria-label="Sedang" placeholder="Sedang, 44px"></div>
  <div class="ds-input is-lg"><input class="ds-input__control" aria-label="Besar" placeholder="Besar, 52px"></div>
</div>
```

### Ikon, tombol hapus, dan afiks

Ikon awal menunjukkan jenis nilai. Tombol hapus muncul setelah ada teks, menjaga ruangnya agar tidak ada yang bergeser, dan tidak masuk urutan tab (Escape menghapus lewat keyboard). Afiks teks berada di dalam field.

```html preview title="Ikon awal, hapus, afiks"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-field">
    <label for="in-mail">Alamat email</label>
    <div class="ds-input">
      <svg class="ds-icon ds-input__icon" aria-hidden="true"><use href="#ds-icon-mail"></use></svg>
      <input id="in-mail" type="email" class="ds-input__control" value="ayu.lestari@example.com" autocomplete="email">
      <button type="button" class="ds-input__clear" tabindex="-1" aria-label="Hapus isi"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
    </div>
  </div>
  <div class="ds-field">
    <label for="in-site">Situs web</label>
    <div class="ds-input">
      <span class="ds-input__affix">https://</span>
      <input id="in-site" class="ds-input__control" value="citia-engineering.com" inputmode="url">
    </div>
  </div>
</div>
```

### Memuat dan sukses

Untuk pengecekan async (apakah kode sudah dipakai?) beri `aria-busy="true"` pada pembungkus. Spinner muncul setelah 300ms dan lebar field tetap. Saat pengecekan lolos beri `data-state="success"`.

```html preview title="Pengecekan async"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-field">
    <label for="in-busy">Kode proyek</label>
    <div class="ds-input" aria-busy="true"><input id="in-busy" class="ds-input__control" value="PRJ-1024"></div>
    <p class="ds-hint">Memeriksa ketersediaan</p>
  </div>
  <div class="ds-field">
    <label for="in-ok">Kode proyek</label>
    <div class="ds-input" data-state="success"><input id="in-ok" class="ds-input__control" value="PRJ-2048"></div>
    <p class="ds-field-success">Kode tersedia.</p>
  </div>
</div>
```

## State

```html preview title="Semua state input"
<div class="ds-field-grid">
  <div class="ds-field"><label for="is-1">Placeholder</label><div class="ds-input"><input id="is-1" class="ds-input__control" placeholder="Cari berdasarkan nama"></div></div>
  <div class="ds-field"><label for="is-2">Terisi</label><div class="ds-input"><input id="is-2" class="ds-input__control" value="Mei Tanaka"></div></div>
  <div class="ds-field"><label for="is-3">Nonaktif</label><div class="ds-input"><input id="is-3" class="ds-input__control" value="Sofia Marquez" disabled></div></div>
  <div class="ds-field"><label for="is-4">Hanya baca</label><div class="ds-input"><input id="is-4" class="ds-input__control" value="PRJ-1024" readonly></div></div>
  <div class="ds-field"><label for="is-5">Tidak valid</label><div class="ds-input"><input id="is-5" class="ds-input__control" value="abc" aria-invalid="true" aria-describedby="is-5-e"></div><p class="ds-field-error" id="is-5-e">Isi kode proyek yang valid.</p></div>
  <div class="ds-field"><label for="is-6">Sukses</label><div class="ds-input" data-state="success"><input id="is-6" class="ds-input__control" value="PRJ-2048"></div></div>
  <div class="ds-field"><label for="is-7">Memuat</label><div class="ds-input" aria-busy="true"><input id="is-7" class="ds-input__control" value="PRJ-3071"></div></div>
  <div class="ds-field"><label for="is-8">Input daisyUI polos</label><input id="is-8" class="input" value="State sama, tanpa pembungkus"></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Border 1px `--ds-control-border` (3:1), latar `base-100` |
| Hover | Pointer di atas | Border 40% lebih gelap; tidak di layar sentuh |
| Focus | `:focus-visible` pada kontrol | Ring fokus 2px, offset 2px, border berwarna fokus; pembungkus yang menggambarnya |
| Filled | Ada nilai | Tombol hapus terlihat |
| Placeholder | `:placeholder-shown` | Teks `--ds-subtle`, minimal 4,5:1 |
| Disabled | `disabled` pada kontrol | Opasitas 55%, `base-200`, `not-allowed` |
| Read-only | `readonly` | `base-200`, border tipis, teks kontras penuh, tanpa tombol hapus |
| Invalid | `aria-invalid`, `input-validation-error`, `:user-invalid` | Border galat dan ikon galat di ujung |
| Success | `data-state="success"` pada pembungkus | Border sukses dan ikon centang |
| Loading | `aria-busy="true"` pada pembungkus | Spinner setelah 300ms, kursor `progress` |
| Autofill | `:autofill` | Permukaan dan warna teks tema tetap |

## Anatomi

- `.ds-input`: pembungkus berbentuk field (border, radius, latar, focus ring). Modifier `is-sm`, `is-lg`.
- `.ds-input__control`: `input` native tanpa border.
- `.ds-icon.ds-input__icon`: ikon awal; tambahkan `is-end` untuk ikon akhir.
- `.ds-input__affix`: awalan teks; tambahkan `is-end` untuk akhiran atau satuan.
- `.ds-input__clear`, `.ds-input__action`: tombol bulat 28px dengan area sentuh 44px.
- Slot status (spinner, centang, peringatan) digambar oleh `::after`; tanpa markup.

## Penggunaan

- Pilih `type` dan `inputmode` yang sesuai data (`email`, `tel`, `url`, `inputmode="numeric"`); isi `autocomplete` dari daftar HTML.
- Pakai tombol hapus pada field cari dan filter, bukan pada field wajib yang pendek tempat salah hapus merugikan.
- Jangan menaruh label di dalam field. Placeholder menunjukkan contoh, bukan instruksi, dan tidak dibacakan sebagai label.
- Pakai `readonly` untuk nilai yang disalin orang, `disabled` untuk nilai yang tidak berlaku. Nilai disabled tidak dikirim.
- Tampilkan sukses hanya setelah pengecekan async; jangan menghijaukan setiap field valid.
- Validasi saat blur, lalu di setiap input setelah galat pertama.

## Aksesibilitas

- Kontrol adalah `input` native dengan `label[for]`; ikon `aria-hidden`.
- Tombol hapus punya nama aksesibel dan `tabindex="-1"` karena Escape sudah menghapus lewat keyboard; pengguna sentuh dan pembaca layar menjangkaunya dengan pointer.
- State invalid disampaikan oleh `aria-invalid` dan pesan teks, tidak pernah hanya warna atau ikon.
- State sibuk: beri `aria-busy` pada pembungkus dan umumkan hasilnya di petunjuk (polite).
- Kontras: border minimal 3:1, teks minimal 4,5:1, di tema terang dan gelap. Forced colours: ring memakai `Highlight`.

| Tombol | Aksi |
| --- | --- |
| Tab | Memindahkan fokus masuk dan keluar field |
| Escape | Menghapus isi bila ada tombol hapus dan nilai |
| Enter | Mengirim form (native) |

## Razor

```cshtml
<ds-field asp-for="Email" type="email" icon="mail" clearable hint="Faktur dikirim ke sini." />
<ds-field asp-for="Website" prefix="https://" />
<ds-field asp-for="ProjectCode" loading size="lg" />
```

`input-validation-error` dari `asp-for` diberi gaya seperti `aria-invalid`. Lihat [Field](./field.md#razor) untuk semua atribut.

## JavaScript

| Atribut atau class | Efek |
| --- | --- |
| `.ds-input` | Mendapat `data-ds-ready` dan `data-empty` agar tombol hapus tahu kapan tampil |
| `.ds-input__clear` | Mengosongkan kontrol, memicu `input` dan `change`, memfokuskan kontrol |

API: `DS.inputs.refresh(root)`, `DS.inputs.clear(el)`. Event: `ds:input:clear` (bubbles, `detail.control`). Perubahan nilai lewat kode tidak memicu `input`; panggil `DS.inputs.refresh(root)` sesudahnya.

## Token

`--ds-control-border`, `--ds-focus`, `--ds-subtle`, `--ds-quiet`, `--ds-error-text`, `--color-error`, `--color-success`, `--color-base-100/200/300`, `--radius-field`, `--ds-size-target`, `--ds-size-target-compact`, `--ds-opacity-disabled`, `--ds-duration-fast`.

## Native dan daisyUI

`input.input` polos tetap bekerja dan memakai state yang sama; gunakan pembungkus `.ds-input` bila butuh ikon, afiks, tombol hapus, atau slot status. Pembungkus tidak memakai pola `label.input` daisyUI, sehingga `width: clamp(…)`, shadow depth, dan reset outline input dalam tidak berlaku.
