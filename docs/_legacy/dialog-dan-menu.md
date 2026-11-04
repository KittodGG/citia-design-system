---
title: Dialog, menu dan popover
group: Komponen
order: 6
summary: Dialog modal, konfirmasi, dialog keluar, dropzone berkas, panel menu aksi, dan info notice, dengan aturan fokus dan keyboard.
source: TPS Styles/app.css L555–594, L1616–1650, L3103–3106, L3244–3262, L494–510; Views/Shared/_ConfirmDialog.cshtml, _LeaveDialog.cshtml; wwwroot/js/excel-import.js
---

Lapisan di atas halaman mengikuti satu aturan ruang: panel muncul dari pemicunya. Menu dan popover tumbuh dari tombol yang membukanya dan tidak meredupkan halaman. Dialog meredupkan halaman hanya untuk tugas yang memblokir: konfirmasi, isian singkat, pilihan yang harus diputuskan dulu.

Pesan yang tidak butuh keputusan memakai [toast, catatan, atau banner](./umpan-balik.md).

## Dialog modal {#modal}

Dialog memakai elemen `<dialog class="modal">` bawaan browser dengan `.modal-box.ds-dialog` di dalamnya. Browser mengurus lapisan atas, jebakan fokus, dan Escape; DS menambahkan scrim `--ds-scrim` dan animasi materialise (skala 0.98 ke 1 sambil memudar, 6 px dari bawah, dari tempat kotak berada).

```html preview title="Dialog dengan tombol pembuka"
<button type="button" class="btn" data-ds-dialog-open="dialog-tangki">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>
  Tambah tangki
</button>
<dialog id="dialog-tangki" class="modal" aria-labelledby="dialog-tangki-judul">
  <div class="modal-box ds-dialog is-md">
    <div class="ds-dialog-head">
      <div>
        <h2 id="dialog-tangki-judul" class="ds-dialog-title">Tambah tangki</h2>
        <p class="ds-dialog-desc">Tangki baru bisa dipilih di dokumen pemasukan.</p>
      </div>
      <button type="button" class="ds-dialog-close" data-ds-dialog-close aria-label="Tutup">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
      </button>
    </div>
    <div class="ds-dialog-body">
      <label for="dialog-tangki-kode">Kode tangki</label>
      <input id="dialog-tangki-kode" class="input" value="T-01" data-ds-initial-focus>
    </div>
    <div class="modal-action">
      <button type="button" class="btn" data-ds-dialog-close>Batal</button>
      <button type="button" class="btn btn-primary" data-ds-dialog-close>Simpan tangki</button>
    </div>
  </div>
</dialog>
```

### Varian

| Kelas | Lebar | Pakai untuk |
| --- | --- | --- |
| `modal-box ds-dialog` | 34 rem | Konfirmasi dan isian satu-dua field |
| `ds-dialog is-md` | 42 rem | Form singkat |
| `ds-dialog is-lg` | 54 rem | Isi panjang dengan `.ds-dialog-head`, `.ds-dialog-body`, `.ds-dialog-foot` yang bergaris pemisah (tanpa padding kotak) |
| `ds-dialog is-raised` | ikut ukuran | Dialog di atas form (tambah cepat): tepi 2 px dan permukaan popover |

Bagian: `.ds-dialog-title` (judul), `.ds-dialog-desc` (satu kalimat), `.ds-dialog-close` (tombol tutup 44 px), `.modal-action` (tombol, utama paling kanan). Di ponsel (≤ 640 px) `.modal-action` dan `.ds-dialog-foot` ditumpuk dengan aksi utama di atas.

### State dan perilaku

| Hook | Efek |
| --- | --- |
| `data-ds-dialog-open="id"` | Membuka dialog dengan id itu (`showModal()`) |
| `data-ds-dialog-close` | Menutup dialog terdekat; nilai atribut menjadi `returnValue` |
| `[autofocus]` atau `[data-ds-initial-focus]` | Elemen yang mendapat fokus pertama |
| Escape | Menutup dialog |

Saat ditutup, fokus kembali ke pembuka dengan `preventScroll`, sehingga halaman tidak melompat. Dialog yang dibuka dari menu `<details>` ikut menutup menu itu dan mengembalikan fokus ke `summary`-nya.

> [!IMPORTANT]
> Setiap dialog punya `aria-labelledby` ke judulnya. Jangan tutup dialog yang berisi isian lewat klik di scrim saja; sediakan Batal dan Tutup.

**Token.** `--ds-scrim`, `--ds-size-dialog-sm`, `--ds-size-dialog-lg`, `--ds-popover`, `--ds-popover-border`, `--ds-shadow-popover`.

**Asal TPS.** `.modal` di `Styles/app.css` L555–561, L3103–3106, L3347–3350.

## Konfirmasi {#konfirmasi}

Tindakan yang tidak bisa dibatalkan meminta konfirmasi lewat satu dialog bersama, `#ds-confirm`. Pasang atribut pada pemicu; tidak perlu markup dialog per tombol.

```html preview title="Konfirmasi hapus dan kirim"
<div class="ds-actions is-start">
  <button type="button" class="btn btn-ghost is-danger"
          data-ds-confirm="Hapus tangki T-01?"
          data-ds-confirm-text="Tangki yang dihapus tidak bisa dikembalikan."
          data-ds-confirm-label="Hapus">Hapus tangki</button>
  <button type="button" class="btn btn-primary"
          data-ds-confirm="Kirim BL-2026-00841 ke Bea Cukai?"
          data-ds-confirm-text="Data yang sudah terkirim tidak bisa ditarik kembali."
          data-ds-confirm-label="Kirim ke Bea Cukai"
          data-ds-confirm-tone="primary">Kirim ke Bea Cukai</button>
</div>
```

| Atribut | Isi |
| --- | --- |
| `data-ds-confirm` | Judul: pertanyaan yang menyebut objeknya |
| `data-ds-confirm-text` | Satu kalimat akibatnya |
| `data-ds-confirm-label` | Label tombol aksi: kata kerja yang sama dengan pemicu |
| `data-ds-confirm-tone="primary"` | Tombol biru untuk pengiriman yang tidak bisa dibatalkan tetapi bukan penghapusan |

**Perilaku.**

- Bawaan destruktif: tombol merah dan **Batal mendapat fokus awal**. Dengan `data-ds-confirm-tone="primary"`, fokus awal ada di tombol aksi.
- Di dalam `<form>`, pemicu dikirim (submit) setelah diterima. Pada tautan `<a href>`, browser berpindah halaman. Selain itu, pemicu memancarkan event `ds:confirmed`.
- Dari skrip: `DS.confirm({ title, text, label, tone })` mengembalikan promise yang bernilai `true` bila diterima.

```js
const ok = await DS.confirm({ title: "Hapus pelanggan PT Akr Corporindo?", text: "Dokumen yang sudah ada tetap tersimpan.", label: "Hapus" });
if (ok) await hapusPelanggan();
```

```cshtml
<partial name="_DsConfirmDialog" />

<form method="post" asp-action="Delete" asp-route-id="7">
    <button type="submit" class="btn btn-ghost is-danger"
            data-ds-confirm="Hapus tangki T-01?"
            data-ds-confirm-text="Tangki yang dihapus tidak bisa dikembalikan."
            data-ds-confirm-label="Hapus">Hapus</button>
</form>
```

Render `_DsConfirmDialog` sekali per layout. Tanpa partial, ds.js membuat dialognya sendiri.

## Dialog perubahan belum disimpan {#keluar}

Form dengan `data-ds-guard` dijaga: bila isinya berbeda dari saat dimuat, tautan, tombol kembali, dan Keluar membuka dialog "Perubahan belum disimpan". **Tetap di halaman** adalah pilihan aman dan mendapat fokus awal; Escape juga tetap di halaman. Reload dan tutup tab memakai prompt bawaan browser.

```cshtml
<partial name="_DsLeaveDialog" />

<form method="post" data-ds-guard>
    ...
    <a asp-action="Index" class="btn" data-ds-guard-skip>Batal</a>
</form>
```

Submit, Batal dengan `data-ds-guard-skip`, dan mengembalikan nilai ke semula tidak memicu dialog. Aturan lengkap ada di [Alur kerja](./alur-kerja.md).

## Dropzone berkas {#dropzone}

Area untuk menyeret atau memilih satu berkas. Berkas terpilih tampil di `.ds-file` dengan nama, ukuran, dan aksi hapus. Progress muncul hanya saat wadahnya `aria-busy="true"`, dan dropzone memudar ke 60%.

```html preview title="Dropzone dan berkas terpilih"
<div style="display: grid; gap: 0.75rem">
  <div class="ds-dropzone is-dragging">
    <svg class="ds-icon is-xl" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg>
    <p>Seret berkas Excel ke sini</p>
    <small>Format .xlsx, maksimal 5 MB</small>
    <label class="btn btn-sm" for="dialog-dropzone-input">Pilih berkas</label>
    <input id="dialog-dropzone-input" type="file" accept=".xlsx" class="sr-only">
  </div>
  <div class="ds-file" aria-busy="true">
    <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg>
    <div>
      <strong>pemasukan-januari-2026.xlsx</strong>
      <small>48.5 KB</small>
      <progress max="100" value="40"></progress>
    </div>
    <button type="button" class="btn btn-ghost btn-sm" aria-label="Hapus berkas pemasukan-januari-2026.xlsx">Hapus</button>
  </div>
</div>
```

| Kelas | Fungsi |
| --- | --- |
| `ds-dropzone` | Kotak putus-putus 2 px di atas `base-200` |
| `ds-dropzone is-dragging` | Berkas sedang di atas area: tepi dan tint primer |
| `ds-file` | Baris berkas terpilih; atribut `hidden` menyembunyikannya |

**Pesan validasi** (periksa di klien, periksa lagi di server):

| Kondisi | Pesan |
| --- | --- |
| Lebih dari satu berkas | Pilih satu berkas Excel. |
| Bukan `.xlsx` | Gunakan berkas Excel dengan format .xlsx. |
| Ukuran 0 | Berkas kosong. Pilih berkas Excel yang berisi data. |
| Terlalu besar | Ukuran berkas melebihi N MB. Pilih berkas yang lebih kecil. |

> [!NOTE]
> DS hanya menyediakan gaya. JS dropzone (seret, validasi, tampil berkas) ada di sisi aplikasi; rujukannya `wwwroot/js/excel-import.js` di TPS. Tampilkan pesan galat di `role="alert"` dan jangan pernah membaca isi berkas di klien.

## Panel menu {#menu}

Menu aksi baris atau menu "Pilihan" memakai `<details data-ds-menu>` sehingga tetap bekerja tanpa JS untuk dibuka. ds.js menutupnya saat pointer ditekan di luar dan saat Escape (fokus kembali ke `summary`), dan hanya satu menu terbuka pada satu waktu.

```html preview title="Menu aksi"
<details class="ds-disclosure-menu" data-ds-menu>
  <summary class="btn btn-ghost">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg>
    Pilihan
  </summary>
  <div class="ds-menu-panel">
    <a href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>Lihat detail</a>
    <a href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg>Ubah</a>
    <button type="button" class="is-danger" data-ds-confirm="Hapus BL-2026-00841?" data-ds-confirm-text="Draft yang dihapus tidak bisa dikembalikan." data-ds-confirm-label="Hapus">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>Hapus draft
    </button>
    <p>Dokumen yang sudah terkirim tidak bisa dihapus.</p>
  </div>
</details>
```

| Elemen | Fungsi |
| --- | --- |
| `details.ds-disclosure-menu[data-ds-menu]` | Wadah; `summary` tanpa penanda bawaan |
| `summary.btn.btn-ghost` | Pemicu, tinggi 44 px |
| `.ds-menu-panel` | Panel rata kanan pemicu, lebar `--ds-size-menu`, muncul 180 ms |
| `a`, `button` di dalam panel | Item 44 px; `.is-danger` untuk aksi merah |
| `p` atau `.ds-menu-note` | Catatan di bawah garis pemisah |

### Popover untuk tabel yang bergulir

Panel absolut terpotong oleh wadah tabel yang bergulir. Di sana, jadikan panel `[popover]` agar naik ke lapisan atas (`position: fixed`, permukaan popover, bayangan lebih kuat). Posisinya dihitung oleh aplikasi dari `getBoundingClientRect()` pemicu; browser mengurus tutup dengan klik di luar dan Escape.

```html
<button type="button" class="btn btn-ghost" popovertarget="menu-baris-1" aria-label="Pilihan untuk BL-2026-00841">Pilihan</button>
<div id="menu-baris-1" class="ds-menu-panel" popover>
  <a href="/Receipts/Details/841">Lihat detail</a>
  <button type="button" class="is-danger">Hapus draft</button>
</div>
```

## Info notice {#notice}

Pil kecil di top bar yang membuka penjelasan singkat, misalnya tentang mode simulator. Panel muncul tepat di bawah pemicunya; di ponsel panel menjadi `position: fixed` agar tidak keluar layar.

```html preview title="Info notice"
<details class="ds-notice" data-ds-menu>
  <summary>
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg>
    Mode Simulator
  </summary>
  <div class="ds-notice-panel">
    <strong>Data tidak dikirim ke Bea Cukai.</strong>
    <p>Pengiriman dijawab oleh simulator. Gunakan untuk latihan dan uji coba.</p>
  </div>
</details>
```

Pakai `data-ds-menu` agar menutup saat klik di luar dan Escape. Satu notice, satu hal; penjelasan panjang ada di halaman bantuan.

## Jangan

- Jangan membuka dialog di atas dialog. Selesaikan atau tutup yang pertama.
- Jangan memakai dialog untuk pesan yang tidak butuh keputusan; pakai toast atau catatan.
- Jangan memberi aksi destruktif fokus awal. Batal yang mendapat fokus.
- Jangan menaruh lebih dari satu tombol utama di dialog, dan selalu di kanan.
