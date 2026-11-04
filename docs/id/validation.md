---
title: Validasi
group: components
category: forms
order: 37
summary: Pesan sebaris saat blur, pengecekan ulang langsung setelah galat pertama, ringkasan galat yang menaut ke field, dan keluaran validasi ASP.NET Core dengan gaya dan perilaku sama.
source: TPS validation rules (forms), DESIGN.md "Teks dan petunjuk"
---

Validasi memberi tahu pengguna apa yang perlu diperbaiki, di mana, dan bagaimana, pada saat mereka dapat bertindak. Design system menampilkan pesan di bawah field dengan ikon, menautkannya ke field lewat `aria-describedby`, menandai field `aria-invalid`, dan saat submit mendaftar setiap masalah dalam ringkasan di bagian atas dengan tautan yang memindahkan fokus ke field. Pesan berasal dari batasan HTML (`required`, `type`, `min`, `pattern`), dari atribut `data-val-*` ASP.NET Core, atau dari server Anda, dan ketiganya tampil sama. Anatomi field ada di [field](./field.md); perilaku tingkat form di [form](./form.md).

## Contoh

### Validasi saat blur, cek ulang saat mengetik

Tambahkan `data-ds-validate` pada form. Field diperiksa saat pengguna meninggalkannya setelah mengetik; begitu menampilkan galat, setiap ketikan memeriksanya ulang dan pesan hilang segera setelah nilainya valid. Berpindah dengan Tab melewati field kosong tidak menampilkan apa pun. Submit memeriksa semuanya.

```html preview title="Kontak baru"
<form class="ds-form" action="#" data-ds-validate onsubmit="return false" style="max-width:28rem">
  <div class="ds-field">
    <label for="vl-name">Nama lengkap</label>
    <input id="vl-name" name="Name" class="input" required autocomplete="name" aria-describedby="vl-name-error">
    <p class="ds-field-error" id="vl-name-error"></p>
  </div>
  <div class="ds-field">
    <label for="vl-email">Email kerja</label>
    <input id="vl-email" name="Email" type="email" class="input" required autocomplete="email" aria-describedby="vl-email-hint vl-email-error">
    <p class="ds-hint" id="vl-email-hint">Faktur untuk PRJ-1024 dikirim ke alamat ini.</p>
    <p class="ds-field-error" id="vl-email-error"></p>
  </div>
  <div class="ds-field">
    <label for="vl-code">Kode proyek</label>
    <input id="vl-code" name="Code" class="input" required pattern="PRJ-[0-9]{4}" data-ds-msg-pattern="Gunakan PRJ- dan empat angka, misalnya PRJ-1024." aria-describedby="vl-code-hint">
    <p class="ds-hint" id="vl-code-hint">PRJ- dan empat angka.</p>
  </div>
  <div class="ds-field">
    <label for="vl-hours">Jam minggu ini</label>
    <input id="vl-hours" name="Hours" type="number" class="input" min="0" max="60" step="0.5" value="72">
  </div>
  <fieldset class="ds-fieldset">
    <legend>Jenis kontrak</legend>
    <label class="ds-check-row"><input type="radio" class="radio" name="Contract" value="fixed" required><span>Harga tetap</span></label>
    <label class="ds-check-row"><input type="radio" class="radio" name="Contract" value="time"><span>Waktu dan material</span></label>
  </fieldset>
  <label class="ds-check-row"><input type="checkbox" class="checkbox" name="Terms" required><span>Saya sudah membaca ketentuan pemrosesan data</span></label>
  <div><button type="submit" class="btn btn-primary">Tambah kontak</button></div>
</form>
```

### Keluaran ASP.NET Core

Yang dirender tag helper bawaan setelah post gagal: `input-validation-error` pada input, `field-validation-error` pada span dari `asp-validation-for`, dan `validation-summary-errors` dari `asp-validation-summary`. Design system memberi gaya seperti class miliknya sendiri, menambahkan `aria-invalid`, menautkan setiap span dengan `aria-describedby`, mengubah baris ringkasan menjadi tautan bila ada field yang menampilkan pesan yang sama, dan memfokuskan ringkasan pada form dengan `data-ds-validate`.

```html preview title="Galat dari server"
<form class="ds-form" action="#" onsubmit="return false" style="max-width:28rem">
  <div class="validation-summary-errors" data-valmsg-summary="true"><ul><li>Nomor faktur wajib diisi.</li><li>Jumlah harus antara 1 dan 1.000.000.</li></ul></div>
  <div class="ds-field">
    <label for="InvoiceNumber">Nomor faktur</label>
    <input class="input input-validation-error" type="text" data-val="true" data-val-required="Nomor faktur wajib diisi." id="InvoiceNumber" name="InvoiceNumber" value="">
    <span class="field-validation-error" data-valmsg-for="InvoiceNumber" data-valmsg-replace="true">Nomor faktur wajib diisi.</span>
  </div>
  <div class="ds-field">
    <label for="Amount">Jumlah (USD)</label>
    <input class="input input-validation-error" type="text" data-val="true" data-val-range="Jumlah harus antara 1 dan 1.000.000." data-val-range-min="1" data-val-range-max="1000000" id="Amount" name="Amount" value="0">
    <span class="field-validation-error" data-valmsg-for="Amount" data-valmsg-replace="true">Jumlah harus antara 1 dan 1.000.000.</span>
  </div>
  <div class="ds-field">
    <label for="Reference">Referensi klien <span class="ds-label-note">opsional</span></label>
    <input class="input valid" type="text" id="Reference" name="Reference" value="PO-77812">
    <span class="field-validation-valid" data-valmsg-for="Reference" data-valmsg-replace="true"></span>
  </div>
</form>
```

### Sukses untuk pengecekan asinkron

Tampilkan sukses hanya bila membawa informasi, seperti pengecekan ketersediaan ke server. `data-ds-validate-success` pada field menampilkannya setelah pengecekan ulang yang valid.

```html preview title="Username tersedia"
<div class="ds-field" data-ds-validate-success data-state="success" style="max-width:28rem">
  <label for="vl-user">Alamat workspace</label>
  <input id="vl-user" class="input" value="harbourworks" data-state="success" aria-describedby="vl-user-ok">
  <p class="ds-field-success" id="vl-user-ok">harbourworks.example.app tersedia.</p>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Belum disentuh | Belum ada yang diketik | Tanpa pesan, bahkan bila wajib dan kosong |
| Invalid | Blur setelah mengetik, submit, galat server | `aria-invalid="true"`, border galat, ikon dan pesan `--ds-error-text` di bawah field, pesan memudar masuk dari 5px di atas |
| Memperbaiki | Mengetik di field invalid | Diperiksa ulang pada setiap input; pesan dan border hilang segera setelah nilai valid |
| Valid | Setelah pengecekan ulang | Kembali ke rest; tanpa warna hijau kecuali `data-ds-validate-success` |
| Sukses | `data-ds-validate-success` dan valid | `data-state="success"`: border dan pesan sukses |
| Grup invalid | Grup radio wajib masih kosong | `aria-invalid` pada radio dan fieldset; legend dan pesan memakai `--ds-error-text`, pesan di bawah grup |
| Ringkasan | Submit dengan galat | `.ds-error-summary` di atas, `role="alert"`, difokuskan; satu tautan per field |
| Ringkasan diperbarui | Field diperbaiki setelah submit | Baris hilang saat field menjadi valid; ringkasan tersembunyi saat nol |
| Ringkasan server | `.validation-summary-errors` | Tampilan sama; baris menjadi tautan bila cocok dengan pesan field |
| Span server valid | `.field-validation-valid` | Tersembunyi |

## Anatomi

- `form[data-ds-validate]`: opt-in; ds.js menetapkan `novalidate` agar bubble browser tidak bersaing.
- `.ds-field-error` (atau `span.field-validation-error[data-valmsg-for]`): pesannya; dibuat bila belum ada.
- `.ds-error-summary[data-ds-error-summary]`: ringkasannya; dibuat sebagai anak pertama form bila belum ada. Berisi `h2`, kalimat jumlah, dan `ul > li > a`.
- `.ds-field-success`: pesan sukses opsional (dari [field](./field.md)).

## Penggunaan

- Tulis pesan yang menyebut cara memperbaikinya: "Tulis alamat email seperti nama@contoh.com.", bukan "Input tidak valid." Mulai dengan nama field bila soal keberadaan nilai ("Nama lengkap wajib diisi.").
- Samakan pesan server dan klien: di ASP.NET Core taruh pesan di atribut (`[Required(ErrorMessage = "…")]`); klien membacanya dari `data-val-required`.
- Validasi saat blur dan saat submit, jangan pada ketikan pertama. Jangan menonaktifkan tombol submit sebagai pengganti menampilkan galat.
- Pertahankan apa yang sudah diketik pengguna setelah submit gagal. Render ulang form dengan nilai yang dikirim.
- Pakai `data-ds-msg-<rule>` untuk pesan yang lebih baik pada satu kontrol: `data-ds-msg-required`, `-type`, `-pattern`, `-min`, `-max`, `-minlength`, `-maxlength`, `-step`.
- Pakai `formnovalidate` pada tombol "Simpan draf" yang harus melewati validasi.

## Aksesibilitas

- Setiap pesan ditautkan lewat `aria-describedby` setelah petunjuk, sehingga pembaca layar membacakan label, nilai, petunjuk, lalu galat.
- Pesan sebaris bukan live region: pesan itu akan menyela pengetikan. Ringkasan adalah `role="alert"` dan menerima fokus setelah submit, sehingga dibacakan sekali.
- Tautan ringkasan memindahkan fokus ke field dan menggulir agar labelnya terlihat; `details` tertutup di sekitar field akan dibuka.
- Galat memakai ikon, teks, dan border, tidak pernah hanya warna; teks galat memenuhi 4,5:1 di kedua tema.

| Tombol | Aksi |
| --- | --- |
| Tab keluar dari field | Memeriksanya (bila ada yang diketik) |
| Enter pada submit | Memeriksa semua field; bila ada galat, memfokuskan ringkasan |
| Tab di ringkasan | Berpindah antar tautan |
| Enter pada tautan ringkasan | Memfokuskan field |

## Razor

```cshtml
<form method="post" class="ds-form" data-ds-validate>
    <ds-error-summary />
    <ds-field asp-for="InvoiceNumber" />
    <ds-field asp-for="Amount" type="number" unit="USD" />
    <button class="btn btn-primary">Simpan faktur</button>
</form>
```

`ds-error-summary` merender galat model state sebagai ringkasan yang sama dengan yang dibangun klien, dengan tautan ke `#{field id}` dan `data-ds-autofocus`, sehingga fokus mendarat di sana setelah post gagal. Bila model valid, ia merender kontainer kosong yang tersembunyi untuk diisi klien. `ds-field` (dari [field](./field.md)) merender `aria-invalid` dan galat dengan pesan model state. `asp-validation-for` dan `asp-validation-summary` bawaan juga berfungsi; class-nya diberi gaya.

```csharp
public sealed class InvoiceInput
{
    [Display(Name = "Nomor faktur")]
    [Required(ErrorMessage = "Nomor faktur wajib diisi.")]
    [RegularExpression(@"INV-\d{4}-\d{4}", ErrorMessage = "Gunakan INV-, tahun, dan empat angka, misalnya INV-2026-0418.")]
    public string? InvoiceNumber { get; set; }
}
```

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-validate` | Pada form: validasi saat blur, cek ulang saat input, ringkasan saat submit |
| `data-ds-error-summary` | Tempat ringkasan (di dalam form, atau `="formId"` di luarnya) |
| `data-ds-autofocus` | Pada ringkasan server: memfokuskannya saat dimuat |
| `data-ds-validate-success` | Pada field: menampilkan state sukses bila valid |
| `data-ds-msg-<rule>` | Pesan kustom untuk satu aturan pada satu kontrol |
| `data-val-*` | Aturan ASP.NET Core; dipakai sebagai aturan dan pesan bila jQuery Validation tidak dimuat |
| `formnovalidate` | Pada tombol submit: melewati validasi |

```js
const form = document.querySelector("#invoice-form");
if (!DS.validation.form(form)) return;           // periksa semuanya, tampilkan pesan
DS.validation.setError(form.elements.Email, "Email ini sudah dipakai oleh Mei Tanaka.");
DS.validation.clearError(form.elements.Email);
form.addEventListener("ds:validation:result", (e) => console.log(e.detail.valid, e.detail.invalid));
```

Bila jQuery Validation dengan adapter unobtrusive ada di halaman, ia tetap menguasai form tersebut: ds.js tidak memvalidasinya, tetapi gayanya tetap berlaku pada `input-validation-error`, `field-validation-error`, `validation-summary-errors`, dan `aria-invalid` dari jQuery.

## Token

`--ds-error-text`, `--color-error`, `--ds-error-soft`, `--ds-success-text`, `--ds-focus`, `--ds-radius-box`, `--ds-radius-xs`, `--ds-space-*`, `--ds-type-callout-*`, `--ds-type-footnote-*`, `--ds-duration-enter`, `--ds-ease-emphasized`, `--ds-enter-offset`, `--ds-duration-fast`.

## Native dan daisyUI

Memakai Constraint Validation API browser (`validity`, `setCustomValidity`) untuk aturannya dan mengganti bubble-nya dengan pesan sebaris. Tanpa JavaScript, bubble browser tetap muncul, karena `novalidate` hanya ditetapkan oleh ds.js. `input-validation-error`, `field-validation-error`, `field-validation-valid`, `validation-summary-errors`, dan `validation-summary-valid` dari ASP.NET Core diberi gaya di sini. Class `validator` daisyUI tidak diperlukan.
