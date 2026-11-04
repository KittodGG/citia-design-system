---
title: Password input
group: components
category: forms
order: 6
summary: Field kata sandi dengan tombol tampil dan sembunyi, peringatan Caps Lock, meter kekuatan opsional, dan autocomplete yang benar.
source: TPS app.css .ds-password
---

Gunakan password input untuk rahasia yang diketik di keyboard. Untuk kode sekali pakai gunakan [OTP input](./otp-input.md); untuk teks lain gunakan [input](./input.md).

## Contoh

### Tampil dan sembunyi

Tombol memakai ulang `data-ds-password-toggle`. Tombol mengganti field antara `password` dan `text`, mengatur `aria-pressed`, dan form mengembalikan field ke `password` saat dikirim.

```html preview title="Masuk"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-field">
    <label for="pw-1">Kata sandi</label>
    <div class="ds-input ds-password">
      <input id="pw-1" type="password" class="ds-input__control" value="correct-horse" autocomplete="current-password" autocapitalize="off" spellcheck="false" data-ds-capslock aria-describedby="pw-1-caps">
      <button type="button" class="ds-password-toggle" data-ds-password-toggle aria-controls="pw-1" aria-pressed="false" aria-label="Tampilkan kata sandi">
        <svg class="ds-icon" data-ds-password-icon="hidden" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>
        <svg class="ds-icon" data-ds-password-icon="shown" aria-hidden="true" hidden><use href="#ds-icon-eye-off"></use></svg>
      </button>
    </div>
    <p class="ds-password__caps" id="pw-1-caps" role="status" aria-live="polite"></p>
  </div>
</div>
```

Tekan Caps Lock saat field fokus: "Caps Lock aktif" muncul di bawahnya dan hilang saat blur.

### Kata sandi baru dengan kekuatan

Pakai `autocomplete="new-password"` di form daftar dan ganti kata sandi agar pengelola kata sandi menawarkan yang dibuatkan. Meter hanya saran, bukan aturan: terapkan kebijakan di server dan tulis di petunjuk.

```html preview title="Buat kata sandi"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-field">
    <label for="pw-2">Kata sandi baru</label>
    <div class="ds-input ds-password">
      <input id="pw-2" type="password" class="ds-input__control" value="Lestari-2026!" autocomplete="new-password" autocapitalize="off" spellcheck="false" data-ds-strength data-ds-capslock aria-describedby="pw-2-h pw-2-caps">
      <button type="button" class="ds-password-toggle" data-ds-password-toggle aria-controls="pw-2" aria-pressed="false" aria-label="Tampilkan kata sandi">
        <svg class="ds-icon" data-ds-password-icon="hidden" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>
        <svg class="ds-icon" data-ds-password-icon="shown" aria-hidden="true" hidden><use href="#ds-icon-eye-off"></use></svg>
      </button>
    </div>
    <div class="ds-strength" data-level="0"><div class="ds-strength__bars" aria-hidden="true"><i></i><i></i><i></i><i></i></div><span class="ds-strength__label"></span></div>
    <p class="ds-password__caps" id="pw-2-caps" role="status" aria-live="polite"></p>
    <p class="ds-hint" id="pw-2-h">Minimal 12 karakter. Frasa beberapa kata bekerja dengan baik.</p>
  </div>
</div>
```

## State

```html preview title="State kata sandi"
<div class="ds-field-grid">
  <div class="ds-field"><label for="ps-1">Kosong</label><div class="ds-input ds-password"><input id="ps-1" type="password" class="ds-input__control" autocomplete="current-password"></div></div>
  <div class="ds-field"><label for="ps-2">Nonaktif</label><div class="ds-input ds-password"><input id="ps-2" type="password" class="ds-input__control" value="secret" disabled></div></div>
  <div class="ds-field"><label for="ps-3">Tidak valid</label><div class="ds-input ds-password"><input id="ps-3" type="password" class="ds-input__control" value="abc" aria-invalid="true" aria-describedby="ps-3-e"></div><p class="ds-field-error" id="ps-3-e">Kata sandi minimal 12 karakter.</p></div>
  <div class="ds-field"><label for="ps-4">Ditampilkan</label><div class="ds-input ds-password"><input id="ps-4" type="text" class="ds-input__control" value="Okafor-2026-Bridge"><button type="button" class="ds-password-toggle" aria-pressed="true" aria-label="Tampilkan kata sandi"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye-off"></use></svg></button></div></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest, hover, focus | Seperti [input](./input.md) | Ikon tombol `--ds-subtle`, lebih gelap saat hover |
| Pressed (tampil) | `aria-pressed="true"` | Ikon tombol berkontras penuh, field berupa teks biasa |
| Caps Lock aktif | Event tombol melaporkannya | Teks peringatan dengan ikon di bawah field, polite |
| Kekuatan 1 sampai 4 | Mengetik | Batang terisi: galat, peringatan, primer, sukses; label setelah 300ms |
| Disabled | `disabled` | Opasitas 55% |
| Invalid | `aria-invalid` | Border dan pesan galat |
| Autofill | Browser mengisi | Permukaan tema tetap |

## Anatomi

- `.ds-input.ds-password` dengan `.ds-input__control`.
- `.ds-password-toggle[data-ds-password-toggle]`: tombol 28px, area sentuh 44px; dua ikon yang dialihkan oleh `data-ds-password-icon`.
- `.ds-password__caps`: region live untuk peringatan Caps Lock.
- `.ds-strength`: `data-level` 0-4, `.ds-strength__bars > i` x4, `.ds-strength__label`.
- Markup versi 1 (`.ds-password > input.input`, tombol absolut) tetap bekerja.

## Penggunaan

- Isi `autocomplete` pada setiap field kata sandi: `current-password` untuk masuk, `new-password` untuk membuat atau mengganti. Jangan `off`.
- Selalu izinkan tempel. Jangan memblokir pengelola kata sandi.
- Matikan `autocapitalize`, `autocorrect`, dan `spellcheck`.
- Jangan memakai meter saja untuk menerima atau menolak. Tulis aturannya: "Minimal 12 karakter."
- Dengan tombol tampil, field "Konfirmasi kata sandi" menambah gesekan tanpa menangkap lebih banyak salah ketik; tidak perlu.
- Jangan mencatat, menyimpan, atau mengirim skor kekuatan.

## Aksesibilitas

- Tombol: `aria-pressed` dengan nama tetap "Tampilkan kata sandi"; statusnya adalah status tertekan, bukan nama yang diganti.
- Pesan Caps Lock adalah region live polite yang kosong sampai dibutuhkan.
- Label kekuatan adalah region live polite yang diperbarui 300ms setelah mengetik berhenti; batang `aria-hidden` dan tingkat tidak pernah bergantung pada warna (label menyebutkannya).
- Kata sandi tidak pernah ditaruh di `title`, `aria-label`, atau URL. Field kembali ke `type="password"` saat dikirim.
- Urutan fokus: field, lalu tombol.

| Tombol | Aksi |
| --- | --- |
| Tab | Field, lalu tombol tampil |
| Enter, Spasi | Pada tombol: menampilkan atau menyembunyikan |
| Enter | Di field: mengirim form |

## Razor

```cshtml
<ds-field asp-for="Password" type="password" label="Kata sandi" />
<ds-field asp-for="NewPassword" type="password" autocomplete="new-password" strength hint="Minimal 12 karakter." />
```

Opsi: `show-toggle` (bawaan true), `caps-warning` (bawaan true), `strength`.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-password-toggle` (`forms.js`) | Beralih antara `password` dan `text` |
| `data-ds-capslock` | Menampilkan pesan Caps Lock di `.ds-password__caps` milik field |
| `data-ds-strength` | Menggerakkan meter `.ds-strength` milik field |

API: `DS.inputs.passwordScore(value)` mengembalikan 0 sampai 4. Event: `ds:password:capslock` (`detail.on`). Skor memeriksa panjang, jenis karakter, pengulangan, dan daftar pendek kata umum; ini petunjuk, bukan kontrol keamanan.

## Token

`--ds-subtle`, `--ds-warning-text`, `--ds-error-text`, `--ds-quiet`, `--color-error`, `--color-warning`, `--color-primary`, `--color-success`, `--color-base-300`, `--ds-duration-base`.

## Native dan daisyUI

Dibangun di atas `input[type=password]`. Tombol adalah versi DS dari `swap` daisyUI; bagian Caps Lock dan kekuatan tidak punya padanan native.
