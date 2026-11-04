---
title: Dialog
group: components
category: overlays
order: 1
summary: Jendela modal untuk satu tugas terfokus, seperti form singkat atau keputusan, di atas elemen dialog native dengan focus trap dan animasi scale-in yang tenang.
source: TPS app.css L555–561, L3103–3106, L3347–3350
---

Dialog menginterupsi halaman untuk satu tugas yang harus diselesaikan atau dibatalkan pengguna sebelum melanjutkan: form
singkat, sebuah pilihan, sebuah preview. Komponen ini dibangun di atas elemen native `<dialog>` yang dibuka dengan
`showModal()`, sehingga browser menangani top layer, focus trap, dan Escape; design system menambahkan box, bagian-bagian,
gerak, dan perilaku di sekitarnya. Gunakan [Alert dialog](./alert-dialog.md) untuk mengonfirmasi tindakan yang berdampak
besar, [Sheet](./sheet.md) untuk tugas samping yang lebih panjang (filter, detail) dengan halaman tetap terlihat, dan
[Popover](./popover.md) untuk konten kecil yang tidak memblokir di samping pemicunya.

## Contoh

### Dialog form

Body dapat di-scroll, header dan footer tetap di tempat. Field pertama mendapat fokus saat dialog terbuka.

```html preview title="Undang anggota tim"
<button type="button" class="btn btn-primary" data-ds-dialog-open="dlg-invite">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user-plus"></use></svg>
  Undang anggota tim
</button>

<dialog id="dlg-invite" class="modal" aria-labelledby="dlg-invite-title" aria-describedby="dlg-invite-desc">
  <form class="modal-box ds-dialog is-md" method="post" action="/team/invite">
    <div class="ds-dialog__header">
      <div class="ds-dialog__heading">
        <h2 id="dlg-invite-title" class="ds-dialog__title">Undang anggota tim</h2>
        <p id="dlg-invite-desc" class="ds-dialog__description">Mereka menerima email berisi tautan yang kedaluwarsa dalam 7 hari.</p>
      </div>
      <button type="button" class="ds-dialog__close" data-ds-dialog-close aria-label="Tutup">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
      </button>
    </div>
    <div class="ds-dialog__body">
      <div style="display: grid; gap: 1rem">
        <label class="ds-field">
          <span class="ds-label">Alamat email</span>
          <input class="input w-full" type="email" name="email" placeholder="nama@perusahaan.com" required>
        </label>
        <label class="ds-field">
          <span class="ds-label">Peran</span>
          <select class="select w-full" name="role">
            <option>Pembaca</option>
            <option selected>Editor</option>
            <option>Admin</option>
          </select>
        </label>
      </div>
    </div>
    <div class="ds-dialog__footer">
      <button type="button" class="btn" data-ds-dialog-close>Batal</button>
      <button type="submit" class="btn btn-primary">Kirim undangan</button>
    </div>
  </form>
</dialog>
```

### Ukuran

| Class | Lebar | Gunakan untuk |
| --- | --- | --- |
| `ds-dialog is-sm` | 26rem | Alert dialog, satu pertanyaan |
| `ds-dialog` | 34rem | Satu atau dua field |
| `ds-dialog is-md` | 42rem | Form singkat |
| `ds-dialog is-lg` | 54rem | Konten panjang, tabel, preview |
| `is-full-mobile` (dengan ukuran apa pun) | layar penuh di bawah 640px | Form dengan banyak field di ponsel |

```html preview title="Kecil, besar, dan layar penuh di ponsel"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-dialog-open="dlg-sm">Kecil</button>
  <button type="button" class="btn" data-ds-dialog-open="dlg-lg">Besar dengan konten panjang</button>
  <button type="button" class="btn" data-ds-dialog-open="dlg-full">Layar penuh di ponsel</button>
</div>

<dialog id="dlg-sm" class="modal" aria-labelledby="dlg-sm-title" data-ds-dismissible>
  <div class="modal-box ds-dialog is-sm">
    <h2 id="dlg-sm-title" class="ds-dialog-title">Ubah nama proyek</h2>
    <p class="ds-dialog-desc">PRJ-1024 tetap memakai kodenya; hanya namanya yang berubah.</p>
    <div class="ds-dialog-body">
      <input class="input w-full" value="Relokasi gudang" aria-label="Nama proyek">
    </div>
    <div class="modal-action">
      <button type="button" class="btn" data-ds-dialog-close>Batal</button>
      <button type="button" class="btn btn-primary" data-ds-dialog-close="save">Ubah nama</button>
    </div>
  </div>
</dialog>

<dialog id="dlg-lg" class="modal" aria-labelledby="dlg-lg-title" data-ds-dismissible>
  <div class="modal-box ds-dialog is-lg">
    <div class="ds-dialog__header">
      <div class="ds-dialog__heading">
        <h2 id="dlg-lg-title" class="ds-dialog__title">Ketentuan layanan, versi 4</h2>
        <p class="ds-dialog__description">Berlaku 1 Maret 2026. Gulir untuk membaca seluruh 6 bagian.</p>
      </div>
      <button type="button" class="ds-dialog__close" data-ds-dialog-close aria-label="Tutup">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
      </button>
    </div>
    <div class="ds-dialog__body">
      <h3>1. Akun</h3>
      <p>Setiap orang memakai akunnya sendiri. Login bersama tidak diizinkan karena setiap perubahan dicatat atas nama orang yang melakukannya.</p>
      <h3>2. Data yang Anda tambahkan</h3>
      <p>Anda memiliki proyek, invoice, dan file yang diunggah. Kami memprosesnya hanya untuk menjalankan layanan dan menyimpan cadangan selama 30 hari.</p>
      <h3>3. Ketersediaan</h3>
      <p>Kami menargetkan ketersediaan bulanan 99,9%. Pemeliharaan terjadwal diumumkan 48 jam sebelumnya dan berlangsung antara pukul 01:00 dan 04:00 WIB.</p>
      <h3>4. Penagihan</h3>
      <p>Invoice seperti INV-2026-0418 diterbitkan pada hari kerja pertama setiap bulan dan jatuh tempo dalam 14 hari.</p>
      <h3>5. Mengakhiri perjanjian</h3>
      <p>Seluruh data dapat diekspor sebagai CSV atau Excel kapan saja. Setelah pembatalan, workspace tetap dapat dibaca selama 30 hari.</p>
      <h3>6. Perubahan</h3>
      <p>Kami mengumumkan perubahan ketentuan ini 30 hari sebelum berlaku, melalui email dan di pusat notifikasi.</p>
    </div>
    <div class="ds-dialog__footer">
      <span class="ds-dialog__aside">Terakhir diperbarui 12 Februari 2026</span>
      <button type="button" class="btn" data-ds-dialog-close>Nanti saja</button>
      <button type="button" class="btn btn-primary" data-ds-dialog-close="accept">Setujui ketentuan</button>
    </div>
  </div>
</dialog>

<dialog id="dlg-full" class="modal" aria-labelledby="dlg-full-title">
  <div class="modal-box ds-dialog is-md is-full-mobile">
    <div class="ds-dialog__header">
      <div class="ds-dialog__heading">
        <h2 id="dlg-full-title" class="ds-dialog__title">Pengeluaran baru</h2>
      </div>
      <button type="button" class="ds-dialog__close" data-ds-dialog-close aria-label="Tutup">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
      </button>
    </div>
    <div class="ds-dialog__body">
      <div style="display: grid; gap: 1rem">
        <label class="ds-field"><span class="ds-label">Deskripsi</span><input class="input w-full" value="Kunjungan lokasi, Surabaya"></label>
        <label class="ds-field"><span class="ds-label">Jumlah (IDR)</span><input class="input w-full" inputmode="decimal" value="1.250.000"></label>
        <label class="ds-field"><span class="ds-label">Proyek</span><input class="input w-full" value="PRJ-1024"></label>
      </div>
    </div>
    <div class="ds-dialog__footer">
      <button type="button" class="btn" data-ds-dialog-close>Batal</button>
      <button type="button" class="btn btn-primary" data-ds-dialog-close="save">Simpan pengeluaran</button>
    </div>
  </div>
</dialog>
```

### Markup native tanpa daisyUI

Elemen `<dialog>` itu sendiri dapat menjadi box. Scrim adalah `::backdrop` native.

```html preview title="Elemen dialog native"
<button type="button" class="btn" data-ds-dialog-open="dlg-native">Tampilkan pintasan</button>

<dialog id="dlg-native" class="ds-dialog is-sm" aria-labelledby="dlg-native-title" data-ds-dismissible>
  <div class="ds-dialog__header">
    <div class="ds-dialog__heading">
      <h2 id="dlg-native-title" class="ds-dialog__title">Pintasan keyboard</h2>
    </div>
    <button type="button" class="ds-dialog__close" data-ds-dialog-close aria-label="Tutup">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
    </button>
  </div>
  <div class="ds-dialog__body">
    <ul style="display: grid; gap: 0.75rem; margin: 0; padding: 0; list-style: none">
      <li style="display: flex; justify-content: space-between; gap: 1rem"><span>Cari</span><span><kbd class="ds-kbd">Ctrl</kbd> <kbd class="ds-kbd">K</kbd></span></li>
      <li style="display: flex; justify-content: space-between; gap: 1rem"><span>Invoice baru</span><kbd class="ds-kbd">N</kbd></li>
      <li style="display: flex; justify-content: space-between; gap: 1rem"><span>Simpan</span><span><kbd class="ds-kbd">Ctrl</kbd> <kbd class="ds-kbd">S</kbd></span></li>
    </ul>
  </div>
</dialog>
```

### Dialog bertingkat

Sebuah dialog dapat membuka dialog kedua untuk sub-tugas (misalnya "buat klien baru" dari dalam form invoice). Scrim kedua
lebih ringan dan box pertama mengecil menjadi 98%; Escape hanya menutup dialog teratas. Batasi sampai dua tingkat.

```html preview title="Dialog yang dibuka dari dialog"
<button type="button" class="btn" data-ds-dialog-open="dlg-invoice">Invoice baru</button>

<dialog id="dlg-invoice" class="modal" aria-labelledby="dlg-invoice-title">
  <div class="modal-box ds-dialog is-md">
    <div class="ds-dialog__header">
      <div class="ds-dialog__heading">
        <h2 id="dlg-invoice-title" class="ds-dialog__title">Invoice baru</h2>
        <p class="ds-dialog__description">INV-2026-0419 · draf</p>
      </div>
      <button type="button" class="ds-dialog__close" data-ds-dialog-close aria-label="Tutup">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
      </button>
    </div>
    <div class="ds-dialog__body">
      <label class="ds-field">
        <span class="ds-label">Klien</span>
        <span style="display: flex; gap: 0.5rem">
          <select class="select w-full"><option>PT Sinar Mandiri</option><option>Okafor Logistics</option></select>
          <button type="button" class="btn" data-ds-dialog-open="dlg-client">Klien baru</button>
        </span>
      </label>
    </div>
    <div class="ds-dialog__footer">
      <button type="button" class="btn" data-ds-dialog-close>Batal</button>
      <button type="button" class="btn btn-primary" data-ds-dialog-close="save">Buat draf</button>
    </div>
  </div>
</dialog>

<dialog id="dlg-client" class="modal" aria-labelledby="dlg-client-title">
  <div class="modal-box ds-dialog is-sm">
    <div class="ds-dialog__header">
      <div class="ds-dialog__heading">
        <h2 id="dlg-client-title" class="ds-dialog__title">Klien baru</h2>
      </div>
      <button type="button" class="ds-dialog__close" data-ds-dialog-close aria-label="Tutup">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
      </button>
    </div>
    <div class="ds-dialog__body">
      <label class="ds-field"><span class="ds-label">Nama perusahaan</span><input class="input w-full" placeholder="mis. Tanaka Studio"></label>
    </div>
    <div class="ds-dialog__footer">
      <button type="button" class="btn" data-ds-dialog-close>Batal</button>
      <button type="button" class="btn btn-primary" data-ds-dialog-close="save">Tambah klien</button>
    </div>
  </div>
</dialog>
```

## State

State yang dibekukan, ditampilkan tanpa scrim. Hairline scroll-edge hanya muncul saat konten tersembunyi di bawah header
atau footer.

```html preview title="Diam, di-scroll, sibuk"
<div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr)); align-items: start">
  <div class="ds-dialog" style="width: auto; max-width: none" role="group" aria-label="Diam">
    <h2 class="ds-dialog-title">Arsipkan PRJ-1024?</h2>
    <p class="ds-dialog-desc">Proyek yang diarsipkan tetap dapat dicari.</p>
    <div class="modal-action"><button type="button" class="btn">Batal</button><button type="button" class="btn btn-primary">Arsipkan</button></div>
  </div>
  <div class="ds-dialog" style="width: auto; max-width: none; height: 15rem" role="group" aria-label="Di-scroll">
    <div class="ds-dialog__header"><div class="ds-dialog__heading"><h2 class="ds-dialog__title">Aktivitas</h2></div></div>
    <div class="ds-dialog__body" data-ds-scrolled data-ds-more>
      <p>Mei Tanaka menyetujui INV-2026-0418.</p><p>Daniel Okafor menambahkan 3 file.</p><p>Sofia Marquez mengubah tanggal jatuh tempo.</p>
    </div>
    <div class="ds-dialog__footer"><button type="button" class="btn">Tutup</button></div>
  </div>
  <div class="ds-dialog" style="width: auto; max-width: none" aria-busy="true" role="group" aria-label="Sibuk">
    <div class="ds-dialog__header"><div class="ds-dialog__heading"><h2 class="ds-dialog__title">Kirim undangan</h2></div>
      <button type="button" class="ds-dialog__close" disabled aria-label="Tutup"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></div>
    <div class="ds-dialog__body"><input class="input w-full" value="ayu.lestari@company.com" aria-label="Email"></div>
    <div class="ds-dialog__footer"><button type="button" class="btn">Batal</button><button type="button" class="btn btn-primary" aria-busy="true" aria-disabled="true"><span class="ds-spinner" aria-hidden="true"></span>Mengirim</button></div>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Tertutup | default | Tidak dirender (`display: none`), tidak ada di accessibility tree |
| Membuka | `showModal()` | Scrim memudar masuk; box bergerak dari opacity 0 dan scale 0.97 ke 1 dalam 180ms, emphasized easing, dari tengah |
| Terbuka | `[open]` | Box pada `--color-base-100`, hairline 1px, `--ds-shadow-overlay`, radius 16px; halaman di belakang inert |
| Menutup | `close()`, Escape, Tutup, klik scrim saat dismissible | Jalur yang sama kembali, 140ms, exit easing |
| Body di-scroll | `.ds-dialog__body[data-ds-scrolled]` | Hairline di bawah header |
| Masih ada di bawah | `.ds-dialog__body[data-ds-more]` | Hairline di atas footer |
| Bertingkat | `[data-ds-nested]` pada dialog atas | Scrim setengah kekuatan; box bawah (`[data-ds-covered]`) mengecil ke scale 0.98 |
| Sibuk | `aria-busy="true"` pada dialog | Body pada opacity 70% dan tidak interaktif, Tutup nonaktif, Escape dan scrim diblokir; spinner pada tombol submit setelah 300ms |
| Tombol tutup hover / ditekan | `:hover`, `:active` | State layer 6% / 10%, scale saat ditekan 0.97 |
| Fokus tombol tutup | `:focus-visible` | Ring `--ds-focus` 2px, offset 2px |
| Reduced motion | `prefers-reduced-motion: reduce` | Tanpa scale; hanya cross-fade opacity |
| Layar penuh | `.is-full-mobile` di bawah 640px | Box memenuhi viewport, tanpa radius atau border |

## Anatomi

- `dialog.modal` (daisyUI) atau `dialog.ds-dialog` (native): layer, scrim, dan focus trap.
- `.modal-box.ds-dialog`: box. Ukuran `is-sm`, `is-md`, `is-lg`; `is-full-mobile`; `is-raised` untuk dialog di atas form.
- `.ds-dialog__header` dengan `.ds-dialog__heading` (`.ds-dialog__title`, `.ds-dialog__description`) dan `.ds-dialog__close`.
- `.ds-dialog__body`: dapat di-scroll; header dan footer tetap di tempat.
- `.ds-dialog__footer`: aksi, yang utama paling kanan; `.ds-dialog__aside` untuk catatan di sisi awal.
- Bagian versi 1 tetap berfungsi: `.ds-dialog-head`, `.ds-dialog-title`, `.ds-dialog-desc`, `.ds-dialog-body`, `.ds-dialog-foot`, `.ds-dialog-close`, `.modal-action`.

## Penggunaan

- Gunakan dialog hanya untuk tugas yang harus diselesaikan atau dibatalkan sebelum pengguna melanjutkan. Tampilkan informasi yang tidak membutuhkan keputusan di [Toast](./toast.md) atau [Alert](./alert.md).
- Buat judul satu baris yang menyebut tugas dengan kata kerja: "Undang anggota tim", bukan "Undangan".
- Letakkan satu aksi utama di footer, paling kanan, dengan kata kerja yang sesuai dengan judul ("Kirim undangan"). Batal berada di sebelah kirinya; di ponsel aksi bertumpuk dengan yang utama di atas.
- Batasi form di dalam dialog sampai 5 field atau kurang; form yang lebih panjang sebaiknya berada di halaman atau di [Sheet](./sheet.md).
- Tambahkan `data-ds-dismissible` hanya saat menutup tidak menghilangkan apa pun (preview, konten read-only). Dialog form ditutup dengan Batal, Tutup, atau Escape, tidak pernah dengan klik tidak sengaja pada scrim.
- Susun paling banyak satu dialog bertingkat. Jangan buka dialog dari alert dialog.
- Jangan buka dialog saat halaman dimuat, kecuali halaman kembali dari POST dengan error di dialog tersebut (`data-ds-open-on-load`).

## Aksesibilitas

- `<dialog>` memiliki `aria-labelledby` yang menunjuk ke judul dan, bila ada, `aria-describedby` yang menunjuk ke deskripsi.
- `showModal()` membuat sisa halaman inert, sehingga fokus dan virtual cursor tetap berada di dalam.
- Fokus awal: `[data-ds-initial-focus]` atau `[autofocus]`, jika tidak ada maka field pertama di body, jika tidak ada maka tombol Tutup. Fokus kembali ke elemen yang membuka dialog, tanpa menggulir halaman.
- Body panjang tanpa konten yang dapat difokuskan mendapat `tabindex="0"` agar dapat di-scroll dengan keyboard.
- Tombol tutup memiliki nama aksesibel ("Tutup") dan target 44px di layar sentuh.

| Tombol | Aksi |
| --- | --- |
| Tab / Shift+Tab | Berpindah antar kontrol di dalam dialog (fokus tetap di dalam) |
| Escape | Menutup dialog teratas (tidak saat sibuk) |
| Enter | Mengirim form saat fokus berada di sebuah field |
| Space / Enter pada tombol | Mengaktifkannya |

Gerak: 180ms masuk, 140ms keluar, hanya scale 0.97 ke 1; dengan reduced motion hanya opacity yang berubah. Kontras: judul
dan body memakai `--color-base-content`, deskripsi `--ds-subtle` (minimal 4.5:1 pada `--color-base-100` di kedua tema).

## Razor

```cshtml
<button type="button" class="btn btn-primary" data-ds-dialog-open="invite">Undang anggota tim</button>

<ds-dialog id="invite" title="Undang anggota tim" description="Mereka menerima email berisi tautan yang kedaluwarsa dalam 7 hari." size="md">
    <form id="invite-form" method="post" asp-page-handler="Invite">
        <label class="ds-field"><span class="ds-label">Alamat email</span>
            <input class="input w-full" asp-for="Invite.Email" /></label>
    </form>
    <ds-dialog-footer>
        <button type="button" class="btn" data-ds-dialog-close>Batal</button>
        <button type="submit" form="invite-form" class="btn btn-primary">Kirim undangan</button>
    </ds-dialog-footer>
</ds-dialog>
```

| Atribut | Efek |
| --- | --- |
| `id` | Id dialog, juga dipakai untuk id `-title` dan `-description` |
| `title`, `description` | Teks header (di-encode) |
| `size` | `sm`, `md`, `lg` (default 34rem) |
| `full-mobile` | Layar penuh di bawah 640px |
| `dismissible` | Klik scrim menutup |
| `alert` | `role="alertdialog"`, tanpa tombol Tutup |
| `closable="false"` | Sembunyikan tombol Tutup |
| `icon`, `icon-tone` | Ikon di awal (`danger`, `warning`, `primary`) |
| `open-on-load` | Terbuka saat halaman dimuat (setelah POST dengan error validasi) |

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-dialog-open="id"` | Membuka dialog dengan id tersebut; elemen ini menjadi target kembalinya fokus |
| `data-ds-dialog-close="value"` | Menutup dialog terdekat; value menjadi `dialog.returnValue` |
| `data-ds-initial-focus`, `autofocus` | Elemen yang difokuskan saat dibuka |
| `data-ds-dismissible` | Klik yang dimulai dan berakhir di scrim menutup dialog |
| `data-ds-open-on-load` | Terbuka satu kali saat halaman dimuat |
| `form[data-ds-busy="false"]` | Mengirim form ini tidak menandai dialog sebagai sibuk |

```js
const dialog = DS.dialog.open("invite", document.querySelector("#invite-button"));
DS.dialog.busy(dialog, true, dialog.querySelector("[type=submit]")); // selama fetch berjalan
await saveInvite();
DS.dialog.busy(dialog, false);
DS.dialog.close(dialog, "sent");

document.addEventListener("ds:dialog:close", (event) => {
  if (event.detail.value === "sent") DS.toast({ tone: "success", title: "Undangan terkirim" });
});
```

Event: `ds:dialog:open` dan `ds:dialog:close` (`detail.value` adalah return value), keduanya bubbling dari `<dialog>`.
Mengirim form biasa di dalam dialog yang terbuka menetapkan `aria-busy="true"` sampai halaman berikutnya dimuat.

## Token

`--ds-scrim`, `--ds-size-dialog-sm`, `--ds-size-dialog-lg`, `--ds-radius-2xl`, `--ds-shadow-overlay`, `--color-base-100`,
`--color-base-300`, `--ds-subtle`, `--ds-focus`, `--ds-duration-base`, `--ds-duration-exit`, `--ds-ease-emphasized`,
`--ds-ease-exit`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-press-scale`,
`--ds-type-headline-*`, `--ds-type-callout-*`, `--ds-space-*`, `--ds-size-target`, `--ds-size-target-compact`.

## Native dan daisyUI

- Dibangun di atas `<dialog>` + `showModal()`. Tanpa JavaScript, tombol `<form method="dialog">` tetap menutupnya, dan browser tetap menjebak fokus serta menangani Escape.
- daisyUI `.modal` / `.modal-box` tetap berfungsi: DS mengganti warna scrim daisyUI dengan `--ds-scrim`, transisi 300ms dengan token gerak, box 32rem dengan ukuran DS, dan menambahkan hairline, radius, serta shadow.
- Bentuk `.modal-backdrop` daisyUI dan varian `.modal-open` / `:target` juga mendapat gerak DS.
- `.modal-action` bertumpuk selebar penuh di bawah 640px.
