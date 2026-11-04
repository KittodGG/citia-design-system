---
title: Field
group: components
category: forms
order: 1
summary: Pembungkus setiap kontrol form - label, petunjuk, galat, penghitung, dan bantuan dalam satu kolom, dengan id yang menautkannya.
source: TPS app.css L1696-1975 (.master-field)
---

Field adalah satu kontrol beserta semua yang dibutuhkan untuk mengisinya: label di atas, petunjuk opsional, galat yang menjelaskan perbaikannya, penghitung karakter, dan tombol bantuan. Gunakan di sekeliling setiap [input](./input.md), [textarea](./textarea.md), [select](./select.md), dan [number input](./number-input.md). Kelompokkan field yang berkaitan dengan [fieldset](./fieldset.md).

## Contoh

### Label, petunjuk, dan galat

Label berada di atas kontrol dengan jarak 8px; antarfield berjarak 24px. Petunjuk untuk format dan batas, bukan untuk mengulang isi label.

```html preview title="Petunjuk dan galat"
<div class="ds-form" style="max-width:26rem">
  <div class="ds-field">
    <label for="fld-project">Kode proyek</label>
    <input id="fld-project" class="input" value="PRJ-1024" aria-describedby="fld-project-hint fld-project-error">
    <p class="ds-hint" id="fld-project-hint">Tiga huruf kapital, tanda hubung, dan empat angka.</p>
    <p class="ds-field-error" id="fld-project-error" aria-live="polite"></p>
  </div>
  <div class="ds-field">
    <label for="fld-invoice">Nomor faktur</label>
    <input id="fld-invoice" class="input" value="INV-2026-04" aria-invalid="true" aria-describedby="fld-invoice-hint fld-invoice-error">
    <p class="ds-hint" id="fld-invoice-hint">Format INV-2026-0418.</p>
    <p class="ds-field-error" id="fld-invoice-error" aria-live="polite">Nomor faktur harus diakhiri empat angka.</p>
  </div>
</div>
```

### Penanda opsional dan wajib

Tandai yang minoritas. Bila sebagian besar field wajib, beri `ds-label-note` "opsional" pada yang tidak wajib. Bila sebagian besar opsional, beri tanda bintang (`ds-required`) pada yang wajib dan jelaskan di atas form.

```html preview title="Menandai yang minoritas"
<div class="ds-form" style="max-width:26rem">
  <div class="ds-field">
    <label for="fld-name">Nama lengkap</label>
    <input id="fld-name" class="input" value="Ayu Lestari" required>
  </div>
  <div class="ds-field">
    <label for="fld-company">Perusahaan <span class="ds-label-note">opsional</span></label>
    <input id="fld-company" class="input" autocomplete="organization">
  </div>
  <div class="ds-field">
    <label for="fld-ref">Referensi <span class="ds-required" aria-hidden="true">*</span></label>
    <input id="fld-ref" class="input" required aria-required="true">
  </div>
</div>
```

### Penghitung dan bantuan sebaris

`ds-field__meta` menaruh petunjuk atau galat di sisi awal dan penghitung di sisi akhir. Tombol bantuan membuka penjelasan yang lebih panjang di bawah label; bekerja di layar sentuh dan dengan keyboard, tidak seperti tooltip hover.

```html preview title="Penghitung dan bantuan"
<div class="ds-form" style="max-width:26rem">
  <div class="ds-field">
    <div class="ds-field__label-row">
      <label for="fld-note">Catatan untuk pemberi persetujuan</label>
      <button type="button" class="ds-field__help" data-ds-field-help aria-expanded="false" aria-controls="fld-note-help" aria-label="Informasi lebih lanjut">
        <svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-help-circle"></use></svg>
      </button>
    </div>
    <div class="ds-field__help-text" id="fld-note-help"><p>Pemberi persetujuan melihat catatan ini di samping nominal. Catatan tidak dicetak di faktur.</p></div>
    <textarea id="fld-note" class="textarea" rows="3" maxlength="120" data-ds-counter aria-describedby="fld-note-hint">Pembayaran dipindah ke anggaran kuartal kedua.</textarea>
    <div class="ds-field__meta">
      <p class="ds-hint" id="fld-note-hint">Teks biasa, satu atau dua kalimat.</p>
      <span class="ds-counter">0 / 120</span>
    </div>
  </div>
</div>
```

### Tata letak horizontal

Pakai `is-horizontal` di halaman pengaturan, saat kolom label lebih cepat dibaca daripada field bertumpuk. Pada lebar 640px ke bawah tata letak kembali bertumpuk.

```html preview title="Field horizontal"
<div class="ds-form">
  <div class="ds-field is-horizontal">
    <label for="fld-h-email">Email penagihan</label>
    <input id="fld-h-email" type="email" class="input" value="finance@example.com" aria-describedby="fld-h-email-hint">
    <p class="ds-hint" id="fld-h-email-hint">Faktur dikirim ke alamat ini.</p>
  </div>
  <div class="ds-field is-horizontal">
    <label for="fld-h-lang">Bahasa</label>
    <select id="fld-h-lang" class="select"><option>Bahasa Indonesia</option><option>English</option></select>
  </div>
</div>
```

## State

```html preview title="State field"
<div class="ds-field-grid">
  <div class="ds-field"><label for="fs-rest">Awal</label><input id="fs-rest" class="input" placeholder="Placeholder"></div>
  <div class="ds-field"><label for="fs-filled">Terisi</label><input id="fs-filled" class="input" value="Daniel Okafor"></div>
  <div class="ds-field"><label for="fs-dis">Nonaktif</label><input id="fs-dis" class="input" value="PRJ-1024" disabled></div>
  <div class="ds-field"><label for="fs-ro">Hanya baca <span class="ds-label-note">terkunci</span></label><input id="fs-ro" class="input" value="Kantor Jakarta" readonly></div>
  <div class="ds-field"><label for="fs-inv">Tidak valid</label><input id="fs-inv" class="input" value="12" aria-invalid="true" aria-describedby="fs-inv-e"><p class="ds-field-error" id="fs-inv-e">Isi minimal 3 karakter.</p></div>
  <div class="ds-field"><label for="fs-ok">Valid</label><input id="fs-ok" class="input" value="PRJ-2048" data-state="success" aria-describedby="fs-ok-s"><p class="ds-field-success" id="fs-ok-s">Kode tersedia.</p></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Label 15px/600, kontrol dengan border 1px `--ds-control-border` (3:1) |
| Hover | Pointer di atas kontrol | Border satu tingkat lebih gelap |
| Focus | Keyboard atau klik di kontrol | Ring 2px `--ds-focus` dengan offset 2px dan border berwarna fokus |
| Filled | Kontrol berisi nilai | Teks `--color-base-content` |
| Placeholder | Kontrol kosong dengan `placeholder` | Teks `--ds-subtle` (minimal 4,5:1) |
| Disabled | `disabled` | `--ds-opacity-disabled`, kursor `not-allowed`, latar `base-200` |
| Read-only | `readonly` | Latar `base-200`, border tipis, teks kontras penuh, dapat diseleksi |
| Invalid | `aria-invalid="true"`, `input-validation-error`, `:user-invalid` | Border galat, ikon dan pesan `--ds-error-text` di bawah kontrol |
| Success | `data-state="success"` | Border sukses; hanya setelah pengecekan async |
| Loading | `aria-busy="true"` pada pembungkus | Spinner setelah 300ms, lebar tidak berubah |
| Help open | `aria-expanded="true"` pada tombol bantuan | Isian tonal pada tombol, teks bantuan tumbuh dalam 160ms |

## Anatomi

- `.ds-field`: tumpukan vertikal, jarak 8px. Modifier `is-horizontal`, `is-wide` (selebar grid).
- `label` atau `.ds-field__label-row` berisi label dan `.ds-field__help`.
- `.ds-label-note` (opsional atau terkunci) dan `.ds-required` (tanda bintang).
- `.ds-field__help-text`: bantuan yang terbuka, `data-state="open|closed"`.
- Kontrol (lihat halaman lain di kategori ini).
- `.ds-hint`, `.ds-field-error` (ikon digambar CSS), `.ds-field-success`.
- `.ds-field__meta` dengan `.ds-counter` (`data-state="ok|warn|limit|over"`).
- `.ds-field-grid`: dua kolom, satu kolom pada 640px ke bawah.

## Penggunaan

- Taruh label di atas kontrol. Placeholder tidak pernah menggantikan label.
- Tulis petunjuk hanya bila format tidak bisa ditebak, maksimal 60 karakter. Satuan masuk ke label: "Berat (kg)".
- Teks galat menyebut tindakannya: "Isi minimal 3 karakter." Bukan "Input tidak valid".
- Jaga jarak 24px antarfield dan 8px di dalam satu field. Jangan mengecilkan jarak demi muat lebih banyak.
- Tandai yang minoritas: opsional bila sebagian besar wajib, tanda bintang bila sebagian besar opsional.
- Pakai tombol bantuan untuk teks lebih dari satu kalimat. Satu kalimat cukup di petunjuk.
- Jangan menonaktifkan field untuk menjelaskan aturan; pakai read-only dengan petunjuk, atau `aria-disabled` dengan alasan tertulis.

## Aksesibilitas

- `label[for]` sama dengan id kontrol; `aria-describedby` kontrol memuat id petunjuk, lalu id galat.
- Elemen galat selalu ada di DOM dengan `aria-live="polite"`, sehingga pesan yang muncul setelah blur diumumkan sekali.
- `required` pada kontrol menyampaikan status wajib; tanda bintang `aria-hidden`.
- Tombol bantuan punya nama aksesibel (bawaan "Informasi lebih lanjut"), `aria-expanded`, dan `aria-controls`.
- Penghitung disembunyikan dari teknologi bantu; region live polite terpisah membacakan sisa karakter mendekati batas.
- Target: tombol bantuan 24px dengan area sentuh 44px. Kontras teks: label 15:1, petunjuk minimal 4,5:1, galat minimal 4,5:1 di kedua tema.
- Gerak: galat memudar masuk dengan geser 5px (150ms); pada reduced motion hanya pudar.

| Tombol | Aksi |
| --- | --- |
| Tab | Berpindah antara tombol bantuan label dan kontrol |
| Enter, Spasi | Pada tombol bantuan: membuka atau menutup teks bantuan |
| Escape | Pada tombol bantuan: menutup teks bantuan |

## Razor

`<ds-field>` membungkus `asp-for` dan `asp-validation-for` ASP.NET Core: merender label, kontrol, petunjuk, galat, dan penghitung dengan id dan `aria-describedby` yang sudah terhubung.

```cshtml
<ds-field asp-for="Code" label="Kode proyek" hint="Tiga huruf kapital, tanda hubung, dan empat angka." maxlength="8" counter />
<ds-field asp-for="Email" type="email" icon="mail" clearable hint="Faktur dikirim ke sini." />
<ds-field asp-for="Notes" type="textarea" rows="4" autogrow counter maxlength="500" />
<ds-field asp-for="Country" type="select" asp-items="Model.Countries" placeholder="Pilih negara" />
<ds-field asp-for="Quantity" type="number" min="1" max="99" step="1" unit="pcs" />
<ds-field name="q" type="search" shortcut="/" recent="5" label="Cari" />
```

| Atribut | Efek |
| --- | --- |
| `asp-for`, `asp-items` | Model binding, atribut validasi, galat dari ModelState |
| `label`, `hint`, `help`, `placeholder` | Teks; label bawaannya nama tampilan |
| `type` | text, email, tel, url, search, password, number, textarea, select |
| `icon`, `prefix`, `suffix`, `unit`, `clearable`, `loading`, `size` | Bagian input (lihat [Input](./input.md)) |
| `success`, `success-text`, `error` | State sukses, dan galat eksplisit bila tanpa model |
| `counter`, `maxlength` | Penghitung karakter |
| `horizontal`, `wide` | Tata letak |
| `required`, `marker` | `optional` (bawaan), `required`, atau `none` |

Isi di dalam tag menggantikan kontrol yang dihasilkan, sehingga combobox atau date picker dapat berada di field yang sama. Id-nya `{id}-hint` dan `{id}-error`.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-field-help` | Pada tombol bantuan: membuka atau menutup panel yang ditunjuk `aria-controls` |
| `data-ds-counter` | Lihat [Textarea](./textarea.md) |

Event: tidak ada. State bantuan adalah `aria-expanded` pada tombol dan `data-state` pada panel.

## Token

`--ds-space-field-stack`, `--ds-space-field-group`, `--ds-type-label-*`, `--ds-type-footnote-*`, `--ds-subtle`, `--ds-error-text`, `--ds-warning-text`, `--color-success`, `--ds-control-border`, `--ds-focus`, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-duration-quick`, `--ds-ease-emphasized`.

## Native dan daisyUI

Dibangun di atas `label`, `.input`, `.select`, dan `.textarea`. DS memberi ketiganya satu set state (hover, focus ring, invalid, success, disabled, read-only, autofill), tinggi minimum 44px, dan ikon pada setiap galat. Shadow inset dan lebar maksimum 20rem milik daisyUI dihapus di dalam `.ds-field`.
