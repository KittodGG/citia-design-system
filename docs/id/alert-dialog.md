---
title: Alert dialog
group: components
category: overlays
order: 2
summary: Pertanyaan modal sebelum tindakan yang berdampak besar, dengan pilihan aman difokuskan lebih dulu dan konsekuensi dinyatakan dalam satu kalimat.
source: TPS Views/Shared/_ConfirmDialog.cshtml, _LeaveDialog.cshtml
---

Alert dialog mengajukan satu pertanyaan sebelum sesuatu yang sulit atau tidak mungkin dibatalkan: menghapus, mengirim,
pergi dengan perubahan yang belum disimpan. Komponen ini adalah [Dialog](./dialog.md) dengan `role="alertdialog"`, judul
singkat yang menyebut objeknya, satu kalimat tentang konsekuensi, dan dua tombol. Aksi yang aman (Batal, Tetap di sini)
mendapat fokus, sehingga menekan Enter secara refleks tidak pernah menghancurkan apa pun. Sebagian besar aplikasi tidak
membutuhkan markup per tombol: pasang `data-ds-confirm` pada pemicu dan dialog bersama menangani sisanya. Untuk tindakan
yang dapat dibatalkan, lewati pertanyaan dan tawarkan Urungkan di [Toast](./toast.md).

## Contoh

### Konfirmasi dari atribut

Pemicu tetap berfungsi tanpa JavaScript (form langsung dikirim); dengan JavaScript, pemicu bertanya lebih dulu. Setelah
"Hapus", form dikirim dengan tombol yang sama, sehingga server melihat request yang sama.

```html preview title="Konfirmasi destruktif dan utama"
<div class="ds-actions is-start">
  <form method="post" action="/projects/1024/delete">
    <button type="submit" class="btn btn-ghost is-danger"
            data-ds-confirm="Hapus proyek PRJ-1024?"
            data-ds-confirm-text="38 tugas dan 12 file di dalamnya ikut terhapus. Tindakan ini tidak dapat dibatalkan."
            data-ds-confirm-label="Hapus proyek">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>
      Hapus proyek
    </button>
  </form>
  <button type="button" class="btn btn-primary"
          data-ds-confirm="Kirim INV-2026-0418 ke Daniel Okafor?"
          data-ds-confirm-text="Klien menerima PDF melalui email. Invoice yang sudah terkirim hanya dapat dikoreksi dengan nota kredit."
          data-ds-confirm-label="Kirim invoice"
          data-ds-confirm-tone="primary">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>
    Kirim invoice
  </button>
</div>
```

### Markup tertulis dengan ikon

Saat dialog membutuhkan lebih dari satu judul dan satu kalimat (daftar hal yang terdampak, konfirmasi yang diketik),
tulis sebagai dialog dengan `role="alertdialog"`. Ikon mengulang tone; judul tetap menyampaikan semuanya.

```html preview title="Cabut akses"
<button type="button" class="btn" data-ds-dialog-open="alert-revoke">Cabut akses</button>

<dialog id="alert-revoke" class="modal" role="alertdialog" aria-labelledby="alert-revoke-title" aria-describedby="alert-revoke-desc">
  <div class="modal-box ds-dialog is-sm">
    <div class="ds-dialog__header">
      <div class="ds-dialog__heading">
        <span class="ds-dialog__icon is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert-triangle"></use></svg></span>
        <h2 id="alert-revoke-title" class="ds-dialog__title">Cabut akses Mei Tanaka?</h2>
        <p id="alert-revoke-desc" class="ds-dialog__description">Ia keluar dari semua perangkat dalam satu menit dan kehilangan akses ke 4 proyek.</p>
      </div>
    </div>
    <div class="ds-dialog__footer">
      <button type="button" class="btn" data-ds-dialog-close="cancel">Batal</button>
      <button type="button" class="btn btn-error" data-ds-dialog-close="revoke">Cabut akses</button>
    </div>
  </div>
</dialog>
```

### Konfirmasi dengan aksi async

`DS.confirm({ action })` menjaga dialog tetap terbuka selama request berjalan: tombol menampilkan spinner setelah 300ms,
Escape dan Batal diblokir, dan kegagalan tetap berada di dalam dialog sebagai error yang diumumkan, bukan menutupnya.

```html preview title="Arsipkan dengan panggilan server"
<button type="button" class="btn" id="archive-demo">Arsipkan workspace</button>
<script type="module">
  document.getElementById("archive-demo").addEventListener("click", async (event) => {
    let attempts = 0;
    const ok = await DS.confirm({
      title: "Arsipkan workspace kantor Jakarta?",
      text: "Anggota tetap memiliki akses baca. Workspace dapat dipulihkan dalam 30 hari.",
      label: "Arsipkan",
      tone: "primary",
      action: () => new Promise((resolve, reject) => setTimeout(() => (++attempts === 1 ? reject(new Error("Server tidak menjawab. Coba lagi.")) : resolve()), 1200)),
    }, event.currentTarget);
    if (ok) DS.toast({ tone: "success", title: "Workspace diarsipkan" });
  });
</script>
```

Percobaan pertama pada contoh ini sengaja gagal untuk menampilkan state error; percobaan kedua berhasil.

## State

```html preview title="Diam, error, sibuk"
<div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr)); align-items: start">
  <div class="ds-dialog" style="width: auto; max-width: none" role="group" aria-label="Diam">
    <h2 class="ds-dialog-title">Hapus 3 invoice?</h2>
    <p class="ds-dialog-desc">Draf INV-2026-0420 sampai 0422 dihapus.</p>
    <div class="modal-action"><button type="button" class="btn">Batal</button><button type="button" class="btn btn-error">Hapus</button></div>
  </div>
  <div class="ds-dialog" style="width: auto; max-width: none" role="group" aria-label="Error">
    <h2 class="ds-dialog-title">Arsipkan workspace?</h2>
    <p class="ds-dialog-desc">Anggota tetap memiliki akses baca.</p>
    <p class="ds-dialog__error" role="presentation">Server tidak menjawab. Coba lagi.</p>
    <div class="modal-action"><button type="button" class="btn">Batal</button><button type="button" class="btn btn-primary">Arsipkan</button></div>
  </div>
  <div class="ds-dialog" style="width: auto; max-width: none" aria-busy="true" role="group" aria-label="Sibuk">
    <h2 class="ds-dialog-title">Arsipkan workspace?</h2>
    <p class="ds-dialog-desc">Anggota tetap memiliki akses baca.</p>
    <div class="modal-action"><button type="button" class="btn">Batal</button><button type="button" class="btn btn-primary" aria-busy="true" aria-disabled="true"><span class="ds-spinner" aria-hidden="true"></span>Arsipkan</button></div>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Terbuka, destruktif | `data-ds-confirm`, tone `danger` (default) | Aksi merah (`btn-error`), Batal difokuskan |
| Terbuka, utama | `data-ds-confirm-tone="primary"` | Aksi teal, Batal tetap difokuskan kecuali `data-ds-confirm-focus="accept"` |
| Sibuk | `action` berjalan | `aria-busy="true"`; spinner pada aksi setelah 300ms; label dan lebar tidak berubah; Escape, Batal, dan scrim tidak melakukan apa pun |
| Error | `action` ditolak | `.ds-dialog__error` dengan `role="alert"` di atas aksi dalam `--ds-error-text`; fokus kembali ke aksi |
| Diterima | tombol aksi | Dialog menutup lewat jalur masuknya (140ms); promise resolve `true`; pemicu form mengirim form |
| Dibatalkan | Batal, Escape | Promise resolve `false`; fokus kembali ke pemicu |
| Reduced motion | media query | Hanya opacity |

## Anatomi

- `dialog#ds-confirm.modal[role=alertdialog]`: dialog bersama, dari partial `_DsConfirmDialog` atau dibuat oleh script.
- `[data-ds-confirm-title]`, `[data-ds-confirm-text]`: judul dan konsekuensi.
- `[data-ds-confirm-cancel]`, `[data-ds-confirm-accept]`: dua aksi.
- `.ds-dialog__error[data-ds-confirm-error]`: baris error, ditambahkan oleh script bila belum ada.
- `.ds-dialog__icon` opsional dengan `is-danger`, `is-warning`, atau `is-primary` pada markup tertulis.
- `#ds-leave`: dialog perubahan yang belum disimpan (`_DsLeaveDialog`), anatomi sama dengan Tetap di sini dan Tinggalkan.

## Penggunaan

- Bertanya hanya sebelum tindakan yang tidak dapat dibatalkan atau yang menjangkau orang lain. Bertanya sebelum setiap penyimpanan melatih orang untuk mengklik tanpa membaca.
- Sebut objek di judul sebagai pertanyaan: "Hapus proyek PRJ-1024?", bukan "Apakah Anda yakin?".
- Nyatakan konsekuensi dalam satu kalimat dengan angka bila ada: "38 tugas dan 12 file di dalamnya ikut terhapus."
- Gunakan kata kerja yang sama pada aksi dan pemicu: pemicu "Hapus proyek", aksi "Hapus proyek". Jangan pernah "Ya" dan "Tidak".
- Pertahankan Batal sebagai fokus awal untuk tindakan destruktif. Gunakan `data-ds-confirm-focus="accept"` hanya untuk konfirmasi yang aman dan sering.
- Jangan tambahkan tombol tutup: dua aksi dan Escape adalah satu-satunya jalan keluar.
- Jangan susun alert dialog di dalam alert dialog lain.

## Aksesibilitas

- `role="alertdialog"` membuat screen reader mengumumkan judul dan deskripsi (`aria-describedby`) segera setelah dialog terbuka.
- Fokus menuju Batal (atau Tetap di sini); fokus kembali ke pemicu setelah ditutup.
- Baris error memakai `role="alert"`, sehingga dibacakan saat muncul.
- Warna tidak pernah menjadi satu-satunya sinyal: label aksi menyatakan efeknya.

| Tombol | Aksi |
| --- | --- |
| Tab / Shift+Tab | Berpindah antara Batal dan aksi |
| Enter / Space | Mengaktifkan tombol yang difokuskan |
| Escape | Batal (tidak saat aksi berjalan) |

## Razor

```cshtml
@* Sekali per layout, sebelum </body>. *@
<partial name="_DsConfirmDialog" />
<partial name="_DsLeaveDialog" />

<form method="post" asp-page-handler="Delete" asp-route-id="@Model.Project.Id">
    <button type="submit" class="btn btn-ghost is-danger"
            data-ds-confirm="@($"Hapus proyek {Model.Project.Code}?")"
            data-ds-confirm-text="Tugas dan file di dalamnya ikut terhapus. Tindakan ini tidak dapat dibatalkan."
            data-ds-confirm-label="Hapus proyek">Hapus proyek</button>
</form>

@* Alert dialog tertulis dengan tag helper. *@
<ds-dialog id="revoke" alert size="sm" icon="alert-triangle" icon-tone="danger"
           title="Cabut akses Mei Tanaka?" description="Ia keluar dari semua perangkat dalam satu menit.">
    <ds-dialog-footer>
        <button type="button" class="btn" data-ds-dialog-close="cancel">Batal</button>
        <button type="submit" form="revoke-form" class="btn btn-error">Cabut akses</button>
    </ds-dialog-footer>
</ds-dialog>
```

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-confirm="Title"` | Bertanya sebelum klik diteruskan (form dikirim dengan submitter yang sama, tautan dinavigasi) |
| `data-ds-confirm-text` | Kalimat konsekuensi |
| `data-ds-confirm-label` | Label aksi (default "Delete" / "Hapus") |
| `data-ds-confirm-tone` | `danger` (default) atau `primary` |
| `data-ds-confirm-focus="accept"` | Fokus ke aksi, bukan Batal |

```js
const ok = await DS.confirm({
  title: "Keluarkan Sofia Marquez dari PRJ-1024?",
  text: "Tugasnya tetap ditugaskan kepadanya sampai Anda menugaskan ulang.",
  label: "Keluarkan",
  tone: "danger",                 // atau "primary"
  focus: "cancel",                // atau "accept"
  action: () => api.removeMember(1024, "sofia"), // opsional; reject untuk menampilkan error dan tetap terbuka
});
```

Event: `ds:confirmed` pada pemicu yang bukan bagian dari form maupun tautan; `ds:dialog:open` dan `ds:dialog:close` pada dialog.

## Token

`--ds-scrim`, `--ds-radius-2xl`, `--ds-shadow-overlay`, `--ds-error-text`, `--ds-warning-text`, `--color-error`,
`--color-warning`, `--color-primary`, `--ds-subtle`, `--ds-duration-base`, `--ds-duration-exit`, `--ds-ease-emphasized`,
`--ds-ease-exit`, `--ds-type-headline-*`, `--ds-type-footnote-size`.

## Native dan daisyUI

- `<dialog>` native dengan `showModal()` dan daisyUI `.modal` / `.modal-box`; lihat [Dialog](./dialog.md) untuk perubahan yang dibuat DS.
- `window.confirm()` hanya menjadi fallback untuk penjaga perubahan yang belum disimpan saat `#ds-leave` tidak ada; semua yang lain memakai dialog bergaya.
- Tombol aksi adalah daisyUI `btn btn-error` dan `btn btn-primary`; Batal adalah `btn` biasa.
