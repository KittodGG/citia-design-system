---
title: OTP input
group: components
category: forms
order: 28
summary: Field kode sekali pakai berbentuk 4 sampai 8 sel, dengan pindah otomatis, tempel dan autofill SMS, state galat, sukses, dan sibuk, serta mengirim satu nilai.
---

OTP input mengumpulkan kode sekali pakai yang singkat, dikirim lewat SMS, email, atau aplikasi autentikator. Komponen ini menampilkan satu sel per karakter agar orang bisa mencocokkan kode dengan pesannya. Untuk kode yang lebih panjang dari 8 karakter atau berformat campuran (kode pemulihan), pakai satu [Input](./input.md) dengan `autocomplete="one-time-code"`.

## Contoh

### Enam digit

Tulis satu input teks di dalam `.ds-otp[data-ds-otp]`. Tanpa JavaScript, ini adalah input biasa dengan `autocomplete="one-time-code"` dan `inputmode="numeric"`. ds.js menampilkan sel dan menjadikan input asli (kini tersembunyi) sebagai satu-satunya nilai yang dikirim (`Code=482913`).

```html preview title="Kode enam digit"
<div class="ds-otp" data-ds-otp data-ds-otp-length="6">
  <label for="otp-signin" class="ds-label">Kode verifikasi</label>
  <input id="otp-signin" name="Code" class="input ds-otp__value" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required aria-describedby="otp-signin-hint">
  <p id="otp-signin-hint" class="ds-hint">Kami mengirim kode 6 digit ke +62 812 ••• 4471. Kode kedaluwarsa dalam 10 menit.</p>
</div>
```

### Empat digit, enam digit berkelompok

`data-ds-otp-length` menentukan jumlah sel. `data-ds-otp-group="3"` menambahkan pemisah setiap 3 sel, sesuai cara kode dicetak di pesan.

```html preview title="Panjang dan pengelompokan"
<div class="grid gap-6">
  <div class="ds-otp" data-ds-otp data-ds-otp-length="4">
    <label for="otp-pin" class="ds-label">Konfirmasi PIN kartu</label>
    <input id="otp-pin" name="Pin" class="input ds-otp__value" inputmode="numeric" autocomplete="one-time-code" maxlength="4">
  </div>
  <div class="ds-otp" data-ds-otp data-ds-otp-length="6" data-ds-otp-group="3">
    <label for="otp-grouped" class="ds-label">Kode email</label>
    <input id="otp-grouped" name="EmailCode" class="input ds-otp__value" inputmode="numeric" autocomplete="one-time-code" maxlength="6">
  </div>
</div>
```

### Huruf dan digit

`data-ds-otp-type="alphanumeric"` menerima A–Z dan 0–9 (tampil huruf kapital) dan memakai keyboard teks.

```html preview title="Alfanumerik"
<div class="ds-otp" data-ds-otp data-ds-otp-length="6" data-ds-otp-type="alphanumeric">
  <label for="otp-alpha" class="ds-label">Kode pemasangan perangkat</label>
  <input id="otp-alpha" name="PairingCode" class="input ds-otp__value" autocomplete="one-time-code" maxlength="6">
</div>
```

### Verifikasi saat lengkap

Dengarkan `ds:otp:complete`, setel state sibuk selagi server memeriksa, lalu sukses atau galat. `data-ds-otp-autosubmit` mengirim form sebagai gantinya.

```html preview title="Alur verifikasi"
<div class="ds-otp" data-ds-otp data-ds-otp-length="6" id="otp-demo">
  <label for="otp-verify" class="ds-label">Kode dari aplikasi autentikator</label>
  <input id="otp-verify" name="TotpCode" class="input ds-otp__value" inputmode="numeric" autocomplete="one-time-code" maxlength="6" aria-describedby="otp-verify-hint">
  <p id="otp-verify-hint" class="ds-hint">Demo ini menerima 123456; kode lain menampilkan state galat.</p>
</div>
<script type="module">
  const host = document.getElementById("otp-demo");
  host.addEventListener("ds:otp:complete", (event) => {
    const otp = window.DS.otp(host);
    otp.setState("busy");
    setTimeout(() => otp.setState(event.detail.value === "123456" ? "success" : "error"), 900);
  });
</script>
```

## State

```html preview title="State OTP"
<div class="grid gap-6">
  <div class="ds-otp" data-ds-otp data-ds-otp-length="6"><label for="otp-st-1" class="ds-label">Terisi sebagian</label><input id="otp-st-1" class="input ds-otp__value" value="482" inputmode="numeric" autocomplete="one-time-code"></div>
  <div class="ds-otp" data-ds-otp data-ds-otp-length="6" data-state="error"><label for="otp-st-2" class="ds-label">Galat</label><input id="otp-st-2" class="input ds-otp__value" value="482913" aria-invalid="true" aria-describedby="otp-st-2-err" inputmode="numeric" autocomplete="one-time-code"><p id="otp-st-2-err" class="ds-field-error">Kode tidak valid. Periksa pesan terbaru dan coba lagi.</p></div>
  <div class="ds-otp" data-ds-otp data-ds-otp-length="6" data-state="success"><label for="otp-st-3" class="ds-label">Terverifikasi</label><input id="otp-st-3" class="input ds-otp__value" value="551208" readonly inputmode="numeric" autocomplete="one-time-code"></div>
  <div class="ds-otp" data-ds-otp data-ds-otp-length="6" aria-busy="true"><label for="otp-st-4" class="ds-label">Memeriksa</label><input id="otp-st-4" class="input ds-otp__value" value="551208" readonly inputmode="numeric" autocomplete="one-time-code"></div>
  <div class="ds-otp" data-ds-otp data-ds-otp-length="6"><label for="otp-st-5" class="ds-label">Nonaktif</label><input id="otp-st-5" class="input ds-otp__value" disabled inputmode="numeric" autocomplete="one-time-code"></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Empty | tidak ada karakter | sel dengan border field; tanpa placeholder |
| Focus | sebuah sel difokuskan | focus ring field pada sel itu, caret primary, isi terpilih sehingga mengetik menggantikannya |
| Filled cell | karakter dimasukkan (`data-filled`) | border satu tingkat lebih gelap, angka tabular semibold 20px |
| Complete | semua sel terisi | "Kode sudah diisi." diumumkan, `ds:otp:complete` dipicu |
| Busy | `aria-busy="true"` (`setState("busy")`) | sel hanya baca, spinner setelah sel muncul setelah 300ms |
| Error | `data-state="error"`, `aria-invalid="true"` | border galat pada setiap sel, pesan di bawah; mengedit menghapus state |
| Success | `data-state="success"` | border sukses dan tanda centang setelah sel; sel hanya baca |
| Incomplete on submit | wajib diisi atau terisi sebagian | pesan browser "Isi semua 6 karakter." pada sel pertama |
| Disabled | `disabled` | sel diredupkan pada `--color-base-200`, `cursor: not-allowed` |

## Anatomi

- `.ds-otp[data-ds-otp]`: pembungkus dengan label, petunjuk, dan galat.
- `input.ds-otp__value`: input asli; mengirim kode (tersembunyi setelah disempurnakan, id menjadi `{id}-value`).
- `.ds-otp__cells[role="group"]`: sel-sel, dinamai oleh label.
- `input.ds-otp__cell.input`: satu sel, bernama "Karakter 2 dari 6"; sel pertama memakai `id` asli dan `autocomplete="one-time-code"`.
- `.ds-otp__sep`: pemisah grup.
- `.ds-otp__status`: tanda centang (sukses) atau spinner (sibuk).

## Penggunaan

- Sebutkan ke mana kode dikirim dan berapa lama berlakunya ("dikirim ke +62 812 ••• 4471, kedaluwarsa dalam 10 menit").
- Tawarkan "Kirim ulang kode" setelah 30 sampai 60 detik, sebagai tombol berbentuk tautan di bawah field.
- Verifikasi otomatis saat lengkap hanya bila pemeriksaannya cepat; bila tidak, tunggu tombol Verifikasi.
- Setelah galat, pertahankan digitnya agar orang bisa membandingkan, dan biarkan mereka mengedit; jangan mengosongkan field.
- Jangan pakai untuk kata sandi atau PIN yang harus tetap tersembunyi; sel menampilkan karakternya.

## Aksesibilitas

- Sel-sel berupa `group` yang dinamai label yang terlihat; setiap sel bernama "Karakter n dari 6". Petunjuk dan galat dihubungkan dengan `aria-describedby`.
- Autofill SMS dan pengelola kata sandi bekerja: sel pertama punya `autocomplete="one-time-code"` dan kode lengkap yang diketik atau dimasukkan ke satu sel disebar ke semua sel.
- Tempel di sel mana pun mengisi mulai dari sel itu (atau dari sel pertama bila kode yang ditempel lengkap); spasi dan tanda hubung diabaikan.
- Live region: "Kode sudah diisi." saat lengkap; state sibuk disampaikan dengan `aria-busy`.
- Setiap sel berukuran 44×52px (40×48px di bawah lebar 380px).

| Tombol | Aksi |
| --- | --- |
| 0–9 (A–Z bila alfanumerik) | Mengisi sel dan pindah ke sel berikutnya |
| Backspace | Menghapus sel; pada sel kosong, menghapus sel sebelumnya dan mundur |
| Delete | Menghapus sel dan tetap di tempat |
| Arrow Left / Arrow Right | Berpindah antar sel |
| Home / End | Sel pertama atau terakhir |
| Ctrl/Cmd + V | Menempel dan membagikan kode |
| Tab | Pindah ke sel berikutnya (setiap sel adalah perhentian Tab) |

## Razor

```cshtml
<ds-otp asp-for="Code" length="6" required
        hint="Kami mengirim kode 6 digit ke +62 812 ••• 4471." />
<ds-otp asp-for="PairingCode" label="Kode pemasangan perangkat" length="6" alphanumeric group="3" autosubmit />
```

Helper menulis pembungkus, label (bawaan "Kode verifikasi"), input dengan `inputmode`, `autocomplete`, `maxlength`, dan `pattern`, petunjuk (bawaan "Masukkan kode 6 karakter.") dan galat model, yang juga menyetel state galat.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `.ds-otp[data-ds-otp]` | Menyempurnakan input di dalamnya |
| `data-ds-otp-length` | Jumlah sel (bawaan: `maxlength` input, bila tidak ada 6) |
| `data-ds-otp-type="alphanumeric"` | Menerima huruf dan digit |
| `data-ds-otp-group="3"` | Pemisah setiap n sel |
| `data-ds-otp-autosubmit` | Mengirim form saat lengkap |
| `data-state="error"` / `"success"`, `aria-busy="true"` | State awal |

API: `DS.otp(element)` mengembalikan `{ setState("error" | "success" | "busy" | ""), clear(), focus(), value }`. Event: `ds:otp:complete` `{ value }` pada pembungkus; `input` dan `change` pada input asli.

## Token

Sel: seperti [Input](./input.md), ditambah `--ds-type-title-3-size`, `--ds-weight-semibold`, `--color-primary` (caret), `--color-error`, `--color-success`, `--ds-control-border` (pemisah), `--ds-opacity-disabled`, `--ds-space-2`.

## Native dan daisyUI

Dibangun di atas satu `<input>` dengan `autocomplete="one-time-code"`, bentuk paling tangguh tanpa JavaScript dan yang diharapkan autofill SMS di iOS dan Android. Setiap sel adalah `.input` daisyUI berukuran 44×52px dan rata tengah; daisyUI tidak punya komponen OTP.
