---
title: Switch
group: components
category: forms
order: 22
summary: Kontrol aktif/nonaktif untuk pengaturan yang berlaku seketika, dengan thumb yang bergerak mengikuti spring, ikon opsional, ukuran, dan state sibuk untuk simpan async.
---

Switch menyalakan atau mematikan pengaturan dengan efek seketika, seperti saklar lampu. Gunakan di halaman pengaturan dan daftar preferensi. Bila pilihan baru berlaku setelah form dikirim, gunakan [Checkbox](./checkbox.md). Bila pilihannya antara dua opsi bernama yang bukan aktif/nonaktif ("Grid" dan "Daftar"), gunakan [Segmented control](./segmented-control.md).

## Contoh

### Dengan label dan deskripsi

Switch adalah checkbox native dengan `role="switch"` dan `.toggle` daisyUI. Bungkus dalam `label.ds-check-row` seperti checkbox.

```html preview title="Baris switch"
<div class="ds-choice-group__items">
  <label class="ds-check-row">
    <input type="checkbox" role="switch" class="toggle" name="TwoFactor" value="true" checked aria-describedby="sw-2fa">
    <span><strong>Verifikasi dua langkah</strong><small id="sw-2fa">Minta kode 6 digit dari aplikasi autentikator setiap kali masuk.</small></span>
  </label>
  <label class="ds-check-row">
    <input type="checkbox" role="switch" class="toggle" name="Digest" value="true">
    <span><strong>Ringkasan aktivitas mingguan</strong></span>
  </label>
</div>
```

### Label di awal, switch di ujung

Daftar pengaturan paling mudah dibaca bila label di awal dan switch sejajar di ujung. Tambahkan `.is-end` pada baris.

```html preview title="Daftar pengaturan"
<div class="ds-choice-group__items" style="max-width: 32rem">
  <label class="ds-check-row is-end">
    <input type="checkbox" role="switch" class="toggle" name="Alerts.Payments" checked>
    <span><strong>Pembayaran diterima</strong><small>Saat pelanggan membayar faktur.</small></span>
  </label>
  <label class="ds-check-row is-end">
    <input type="checkbox" role="switch" class="toggle" name="Alerts.Overdue" checked>
    <span><strong>Faktur jatuh tempo</strong><small>Sehari setelah tanggal jatuh tempo, lalu setiap 7 hari.</small></span>
  </label>
  <label class="ds-check-row is-end">
    <input type="checkbox" role="switch" class="toggle" name="Alerts.Comments">
    <span><strong>Komentar baru</strong><small>Saat seseorang menyebut Anda di PRJ-1024.</small></span>
  </label>
</div>
```

### Ikon di thumb

`.is-icons` menggambar centang saat aktif dan silang saat nonaktif. Ini menambah petunjuk kedua selain posisi dan warna; pakai bila switch berdiri sendiri.

```html preview title="Dengan ikon"
<label class="ds-check-row">
  <input type="checkbox" role="switch" class="toggle is-icons" name="Public" checked>
  <span>Proyek terlihat oleh seluruh workspace</span>
</label>
```

### Ukuran

```html preview title="Ukuran"
<div class="flex flex-wrap items-center gap-8">
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle is-sm" checked><span>Kecil, 32×20</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" checked><span>Bawaan, 40×24</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle is-lg" checked><span>Besar, 48×28</span></label>
</div>
```

### Simpan async

`data-ds-switch-action="url"` mengirim nilai baru begitu berubah (form-encoded `name=true|false`, dengan token antiforgery bila halaman memilikinya). Selama permintaan berjalan, switch berstatus sibuk: `aria-busy="true"`, input diblokir, spinner muncul di thumb setelah 300ms. Bila permintaan gagal, switch kembali ke state sebelumnya dan toast menjelaskannya.

```html preview title="Menyimpan saat berubah"
<label class="ds-check-row is-end" style="max-width: 32rem">
  <input type="checkbox" role="switch" class="toggle" name="Maintenance" data-ds-switch-action="/__demo/does-not-exist">
  <span><strong>Mode pemeliharaan</strong><small>Menampilkan pemberitahuan kepada setiap pengguna yang masuk. Permintaan demo ini gagal, sehingga switch kembali mati.</small></span>
</label>
```

## State

```html preview title="State switch"
<div class="grid gap-x-8 sm:grid-cols-2">
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle"><span>Mati</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" checked><span>Hidup</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" aria-busy="true"><span>Sibuk (mati, menyimpan)</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" aria-busy="true" checked><span>Sibuk (hidup, menyimpan)</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" disabled><span>Nonaktif, mati</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" disabled checked><span>Nonaktif, hidup</span></label>
  <label class="ds-check-row"><input type="checkbox" role="switch" class="toggle" aria-invalid="true" aria-describedby="sw-err"><span><strong>Bagikan data ke auditor</strong><small id="sw-err" class="ds-field-error">Aktifkan ini untuk mengirim permintaan audit.</small></span></label>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Off | tidak dicentang | Track 40×24 dengan isi netral 8% dan `--ds-control-border` 1px, thumb abu-abu di awal |
| On | `:checked` (diumumkan sebagai "on") | track primary, thumb `--color-primary-content` di ujung |
| Hover | pointer di atas switch atau barisnya | track satu tingkat lebih pekat |
| Pressed | pointer ditekan | thumb memanjang 114% searah geraknya (120ms) |
| Travel | perubahan state | thumb bergerak dengan `--ds-ease-spring` selama `--ds-duration-spring`; dapat diinterupsi |
| Focus-visible | fokus keyboard | ring 2px `--ds-focus`, offset 2px |
| Busy | `aria-busy="true"` | spinner di thumb setelah 300ms, klik dan Space diabaikan, lebar tidak berubah |
| Invalid | `aria-invalid="true"` atau `:user-invalid` | border galat pada track, pesan di bawah |
| Disabled | `:disabled` | `--ds-opacity-disabled`, `cursor: not-allowed` |

## Anatomi

- `input.toggle[role="switch"]`: checkbox native; track adalah elemennya, thumb adalah `::before`, ikon atau spinner adalah `::after`.
- `label.ds-check-row`: baris berisi label dan deskripsi; `.is-end` menaruh switch di ujung.
- Modifier: `.is-sm`, `.is-lg`, `.is-icons`.

## Penggunaan

- Beri label pada pengaturannya, bukan aksinya: "Verifikasi dua langkah", bukan "Aktifkan verifikasi dua langkah".
- Terapkan perubahan seketika. Jangan taruh switch dalam form yang butuh tombol Simpan; pakai checkbox di sana.
- Jangan menambahkan teks "On"/"Off" di samping switch; state diumumkan dan ditunjukkan oleh posisi.
- Konfirmasi hanya perubahan yang merusak (misalnya "Hapus data setelah 30 hari") dengan [Alert dialog](./alert-dialog.md).
- Jaga penyimpanan sibuk di bawah 2 detik; lebih dari itu, tampilkan progres di tempat lain.

## Aksesibilitas

- `role="switch"` pada checkbox native: pembaca layar mengumumkan "switch, on/off"; form tetap terkirim seperti checkbox.
- Label yang terlihat adalah nama aksesibel. Jangan pernah hanya mengandalkan posisi atau warna thumb; `.is-icons` menambahkan petunjuk bentuk.
- Saat sibuk, `aria-busy="true"` diumumkan dan aktivasi diblokir. Saat gagal, pesan toast diumumkan oleh live region ("Perubahan tidak dapat disimpan. Coba lagi.").
- Batas track dan thumb memenuhi 3:1 di kedua tema; track off memiliki border 3:1.
- Gerak: thumb bergerak dengan spring teredam kritis (tanpa overshoot). Dengan reduced motion, thumb melompat dan hanya warna yang cross-fade.

| Tombol | Aksi |
| --- | --- |
| Tab / Shift+Tab | Memindahkan fokus ke atau dari switch |
| Space | Mengganti aktif dan nonaktif (diabaikan saat sibuk) |

## Razor

```cshtml
<ds-switch asp-for="TwoFactor" label="Verifikasi dua langkah"
           description="Minta kode 6 digit setiap kali masuk." />
<ds-switch asp-for="Alerts.Overdue" label="Faktur jatuh tempo" label-position="start" />
<ds-switch asp-for="Maintenance" label="Mode pemeliharaan" action="/settings/maintenance" icons size="lg" />
```

Model `bool` mengirim `true`/`false` (dengan input `false` tersembunyi). `action` menambahkan `data-ds-switch-action`; `method` mengubah metode HTTP (bawaan `POST`).

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-switch-action="url"` | Saat berubah, mengirim `name=true|false` (FormData) dan token antiforgery; sibuk selama menunggu; mengembalikan state dan menampilkan toast galat bila gagal |
| `data-ds-switch-method` | Metode HTTP untuk permintaan (bawaan `POST`) |
| `aria-busy="true"` | Memblokir klik dan Space; menampilkan spinner |

API: `DS.switchBusy(input, promise)` menandai switch sibuk sampai promise selesai dan mengembalikannya bila promise ditolak. Event (bubble): `ds:switch:change` `{ checked, result }`, `ds:switch:error` `{ checked, error }`.

```js
document.querySelector("#Notifications").addEventListener("change", (event) => {
  DS.switchBusy(event.target, fetch("/api/profile/notifications", { method: "PUT", body: String(event.target.checked) }));
});
```

## Token

`--color-primary`, `--color-primary-content`, `--ds-control-border`, `--color-base-content`, `--color-base-100`, `--ds-shadow-xs`, `--ds-duration-spring`, `--ds-ease-spring`, `--ds-duration-instant`, `--ds-duration-fast`, `--ds-opacity-disabled`, `--ds-focus`, `--color-error`, `--ds-radius-full`.

## Native dan daisyUI

Dibangun di atas `<input type="checkbox" role="switch">` dengan `.toggle` daisyUI. DS mempertahankan class tersebut tetapi mengganti thumb grid-column milik daisyUI (yang menganimasikan layout) dengan thumb yang digeser memakai token spring, menetapkan 40×24 secara bawaan (`is-sm` 32×20, `is-lg` 48×28; `toggle-sm`/`-lg` juga berfungsi), menambahkan peregangan saat ditekan, ikon, spinner sibuk, border off 3:1, dan focus ring DS. Pola daisyUI `label.toggle > input + svg` tidak diubah.
