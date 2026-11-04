---
title: File upload
group: components
category: forms
order: 35
summary: Dropzone dengan klik, keyboard, seret, dan tempel; pemeriksaan jenis, ukuran, dan jumlah per file; thumbnail, progres, hapus, coba lagi; plus varian avatar.
source: TPS .excel-dropzone / .excel-file (app.css L574–594)
---

File upload memungkinkan orang melampirkan file ke form: kuitansi pada pengeluaran, kontrak pada proyek, spreadsheet untuk diimpor. Dropzone menerima klik, Enter atau Space, seret dan lepas, serta tempel. Setiap file muncul di daftar dengan ikon jenis atau thumbnail, ukurannya, dan galatnya sendiri bila melanggar aturan, sehingga satu file yang salah tidak membuang yang lain. File dapat dikirim bersama form (post `multipart/form-data` biasa) atau diunggah satu per satu dengan progres ke endpoint yang Anda tentukan. Untuk foto profil, pakai varian avatar.

Server merender `label.ds-dropzone` di sekeliling `input type="file"` native. Itu sudah berupa unggahan yang berfungsi tanpa JavaScript.

## Contoh

### Lampirkan bersama form

File dikirim bersama form dengan `name` input. Menambah file akan menambah daftar, bukan menggantinya.

```html preview title="Kuitansi"
<div class="ds-field" style="max-width:34rem">
  <label for="up-receipts">Kuitansi</label>
  <div class="ds-file-upload" data-ds-upload data-ds-upload-max-size="10 MB" data-ds-upload-max-files="5">
    <label class="ds-dropzone">
      <input id="up-receipts" class="ds-dropzone__input" type="file" name="Receipts" multiple accept=".pdf,.xlsx,image/*" aria-describedby="up-receipts-hint">
      <span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-cloud-upload"></use></svg></span>
      <span class="ds-dropzone__text">
        <span class="ds-dropzone__title"><span class="ds-dropzone__browse">Pilih file</span> atau seret ke sini</span>
        <span class="ds-dropzone__hint" id="up-receipts-hint">PDF, XLSX, atau gambar, maksimal 10 MB per file, paling banyak 5 file</span>
      </span>
    </label>
    <ul class="ds-file-list" aria-label="File terpilih"></ul>
  </div>
</div>
```

### Baris file

Yang ditampilkan daftar untuk setiap state. ds.js membangun baris ini; markup ditampilkan di sini agar state terlihat tanpa menambah file.

```html preview title="Siap, mengunggah, selesai, tidak valid, gagal"
<ul class="ds-file-list" style="max-width:34rem">
  <li class="ds-file" data-state="ready">
    <span class="ds-file__thumb"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg></span>
    <div class="ds-file__body"><span class="ds-file__name">INV-2026-0418.pdf</span><span class="ds-file__meta">248 kB · PDF</span></div>
    <div class="ds-file__actions"><button type="button" class="ds-file__action is-remove" aria-label="Hapus INV-2026-0418.pdf"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></div>
  </li>
  <li class="ds-file" data-state="uploading">
    <span class="ds-file__thumb"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg></span>
    <div class="ds-file__body"><span class="ds-file__name">PRJ-1024 timesheet October 2026.xlsx</span><span class="ds-file__meta">1,8 MB · Mengunggah 64%</span><progress class="ds-file__progress" max="100" value="64" aria-label="Mengunggah 64%"></progress></div>
    <div class="ds-file__actions"><button type="button" class="ds-file__action is-remove" aria-label="Batalkan unggahan PRJ-1024 timesheet October 2026.xlsx"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></div>
  </li>
  <li class="ds-file" data-state="done">
    <span class="ds-file__thumb"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-image"></use></svg></span>
    <div class="ds-file__body"><span class="ds-file__name">site-visit-mei-tanaka.jpg</span><span class="ds-file__meta is-success"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check-circle"></use></svg>3,2 MB · Terunggah</span></div>
    <div class="ds-file__actions"><button type="button" class="ds-file__action is-remove" aria-label="Hapus site-visit-mei-tanaka.jpg"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></div>
  </li>
  <li class="ds-file" data-state="invalid">
    <span class="ds-file__thumb"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file"></use></svg></span>
    <div class="ds-file__body"><span class="ds-file__name">contract-draft.pages</span><span class="ds-file__meta is-error"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>Jenis file ini tidak diterima. Gunakan PDF, XLSX, gambar.</span></div>
    <div class="ds-file__actions"><button type="button" class="ds-file__action is-remove" aria-label="Hapus contract-draft.pages"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></div>
  </li>
  <li class="ds-file" data-state="error">
    <span class="ds-file__thumb"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg></span>
    <div class="ds-file__body"><span class="ds-file__name">signed-scope-daniel-okafor.pdf</span><span class="ds-file__meta is-error"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>Gagal mengunggah. Periksa koneksi lalu coba lagi.</span></div>
    <div class="ds-file__actions">
      <button type="button" class="ds-file__action" aria-label="Coba lagi signed-scope-daniel-okafor.pdf"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg></button>
      <button type="button" class="ds-file__action is-remove" aria-label="Hapus signed-scope-daniel-okafor.pdf"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
    </div>
  </li>
</ul>
```

### Unggah langsung, dengan progres

Dengan `data-ds-upload-url`, setiap file dikirim sendiri (3 sekaligus) begitu ditambahkan, dengan progres, batal, dan coba lagi. Endpoint menjawab JSON seperti `{ "id": "f_81c2" }`; ds.js menambahkan input tersembunyi per file (`data-ds-upload-field`, bawaan nama input ditambah `Ids`) sehingga form mengirim id, bukan file. Token antiforgery milik form dikirim sebagai header `RequestVerificationToken`. Mengirim form saat file masih diunggah diblokir dengan sebuah pesan.

> [!NOTE]
> Situs dokumentasi ini tidak punya endpoint `/api/files`, jadi file yang ditambahkan di bawah berakhir pada state gagal dengan Coba lagi dan Hapus. Itu state yang ditampilkan galat jaringan sungguhan.

```html preview title="Ringkas, langsung mengunggah"
<div class="ds-file-upload" data-ds-upload data-ds-upload-url="/api/files" data-ds-upload-field="AttachmentIds" data-ds-upload-max-size="25 MB" style="max-width:34rem">
  <label class="ds-dropzone is-compact">
    <input class="ds-dropzone__input" type="file" name="Attachments" multiple aria-label="Lampiran">
    <span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-paperclip"></use></svg></span>
    <span class="ds-dropzone__text">
      <span class="ds-dropzone__title"><span class="ds-dropzone__browse">Lampirkan file</span> atau lepas di sini</span>
      <span class="ds-dropzone__hint">Semua jenis, maksimal 25 MB per file</span>
    </span>
  </label>
  <ul class="ds-file-list" aria-label="Lampiran"></ul>
</div>
```

### Avatar

Pratinjau bulat dengan Ubah dan Hapus. Gambar yang dipilih langsung tampil; Hapus mengisi field tersembunyi `RemovePhoto` dengan `true` agar server dapat menghapus foto yang tersimpan. Gambar juga dapat dilepas di atas pratinjau.

```html preview title="Foto profil"
<div class="ds-avatar-upload" data-ds-upload="avatar" data-ds-upload-max-size="2 MB">
  <span class="ds-avatar-upload__preview"><span aria-hidden="true">AL</span></span>
  <div class="ds-avatar-upload__body">
    <p class="ds-avatar-upload__title" id="up-photo-title">Foto profil</p>
    <p class="ds-hint" id="up-photo-hint">JPG, PNG, atau WebP, persegi, maksimal 2 MB.</p>
    <div class="ds-avatar-upload__actions">
      <label class="btn btn-sm">
        <input type="file" id="up-photo" name="Photo" accept="image/jpeg,image/png,image/webp" aria-labelledby="up-photo-action up-photo-title" aria-describedby="up-photo-hint">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-camera"></use></svg><span id="up-photo-action">Unggah foto</span>
      </label>
      <button type="button" class="btn btn-ghost btn-sm" data-ds-upload-remove hidden>Hapus</button>
      <input type="hidden" name="RemovePhoto" value="false" data-ds-upload-removed>
    </div>
    <p class="ds-field-error"></p>
  </div>
</div>
```

## State

```html preview title="State dropzone"
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(15rem,1fr));gap:1rem">
  <label class="ds-dropzone"><input class="ds-dropzone__input" type="file" aria-label="Rest"><span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-cloud-upload"></use></svg></span><span class="ds-dropzone__title">Rest</span><span class="ds-dropzone__hint">Klik, lepas, atau tempel</span></label>
  <label class="ds-dropzone" data-dragging><input class="ds-dropzone__input" type="file" aria-label="File di halaman"><span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-cloud-upload"></use></svg></span><span class="ds-dropzone__title">File di halaman</span><span class="ds-dropzone__hint">data-dragging</span></label>
  <label class="ds-dropzone" data-drop-target><input class="ds-dropzone__input" type="file" aria-label="Di atas zona"><span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-cloud-upload"></use></svg></span><span class="ds-dropzone__title">Di atas zona</span><span class="ds-dropzone__hint">data-drop-target</span></label>
  <label class="ds-dropzone"><input class="ds-dropzone__input" type="file" aria-label="Tidak valid" aria-invalid="true"><span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-cloud-upload"></use></svg></span><span class="ds-dropzone__title">Tidak valid</span><span class="ds-dropzone__hint">Galat server atau wajib diisi</span></label>
  <label class="ds-dropzone"><input class="ds-dropzone__input" type="file" aria-label="Nonaktif" disabled><span class="ds-dropzone__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-cloud-upload"></use></svg></span><span class="ds-dropzone__title">Nonaktif</span><span class="ds-dropzone__hint">Tidak menerima file</span></label>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | — | Garis putus-putus 1px `--ds-control-border`, permukaan tenang, cakram ikon tonal, tautan "Pilih file" berwarna primary |
| Hover | Pointer di atas zona | Border menuju primary, state layer pada permukaan, garis bawah tautan menjadi solid |
| Pressed | Pointer ditekan | State layer pressed |
| Focus-visible | Tab ke input tersembunyi | Ring `--ds-focus` 2px mengelilingi seluruh zona |
| File on the page | File diseret ke mana saja di jendela (`data-dragging`) | Border bernuansa primary dan tint ringan, agar orang tahu tempat melepas |
| Drag over | File berada di atas zona (`data-drop-target`) | Border primary putus-putus, tint `--ds-opacity-state-drag`, ikon naik 5px |
| Invalid | `aria-invalid` atau `input-validation-error` pada input | Border galat; pesan di bawah field |
| Disabled | `disabled` pada input | `--ds-opacity-disabled`, `not-allowed`, file yang dilepas ditolak |
| Busy | Unggahan berjalan (`aria-busy="true"` pada `.ds-file-upload`) | Kursor progres; pengiriman form diblokir dengan "Tunggu sampai semua file selesai diunggah." |
| Row: ready | File valid, mode form-post | Ukuran dan jenis |
| Row: waiting / uploading | Mode URL | "Menunggu", lalu "Mengunggah 64%" dan bar 4px yang muncul setelah 300ms |
| Row: done | Server menjawab 2xx | Ikon centang dan "Terunggah" dalam teks sukses |
| Row: invalid | Jenis salah, terlalu besar, kosong, melebihi jumlah | Tint galat dan alasannya; tidak dikirim; hanya Hapus |
| Row: failed | Galat jaringan atau 4xx/5xx | Tint galat, pesan dari server atau pesan bawaan, Coba lagi dan Hapus |
| Avatar: drag over | Gambar di atas pratinjau | Ring primary putus-putus dan tint |

## Anatomi

- `.ds-file-upload`: pembungkus dengan `data-ds-upload`.
- `.ds-dropzone`: `label`-nya; `.is-compact` untuk satu baris. Bagian: `.ds-dropzone__input`, `__icon`, `__text`, `__title`, `__browse`, `__hint`.
- `.ds-file-list`: daftarnya (`aria-label`), tersembunyi saat kosong.
- `.ds-file`: sebuah baris dengan `data-state`; bagian `__thumb`, `__body`, `__name`, `__meta` (`.is-error`, `.is-success`), `__progress`, `__actions`, `__action` (`.is-remove`).
- `.ds-avatar-upload`: `__preview`, `__body`, `__title`, `__actions`; `.is-lg` untuk 96px.

## Penggunaan

- Sebutkan jenis yang diterima dan batas ukuran di hint ("PDF atau XLSX, maksimal 10 MB per file") dan setel nilai yang sama pada `accept` dan `data-ds-upload-max-size`.
- Periksa jenis dan ukuran juga di server; `accept` adalah filter di dialog, bukan kontrol keamanan.
- Pakai mode URL untuk file di atas 10 MB atau lebih dari 5 file, agar file yang gagal dapat dicoba lagi tanpa mengirim ulang form.
- Pakai satu dropzone per bagian form. Pakai `data-ds-upload-paste="page"` hanya bila itu satu-satunya uploader di halaman.
- Jangan menyembunyikan input native dengan `display: none`; input harus tetap bisa difokuskan.

## Aksesibilitas

| Tombol | Aksi |
| --- | --- |
| Tab | Memfokuskan zona (input file tersembunyinya) |
| Enter / Space | Membuka dialog file |
| Ctrl + V / Cmd + V | Menempel file dari clipboard bila fokus berada di dalam uploader |
| Tab di daftar | Tombol Coba lagi dan Hapus pada setiap baris |

- Input dinamai oleh label field ditambah teks dropzone, dan dijelaskan oleh hint.
- Region status polite mengumumkan "2 file ditambahkan.", "INV-2026-0418.pdf dihapus.", "… terunggah." dan setiap penolakan beserta alasannya.
- Setelah Hapus, fokus berpindah ke tombol Hapus pada baris berikutnya, atau kembali ke zona.
- Setiap galat baris berupa teks dengan ikon; warna tidak pernah menjadi satu-satunya sinyal. Tombol punya area sentuh 44px di layar sentuh.
- Baris muncul dengan fade 5px (220ms). Dengan reduced motion hanya fade yang tersisa.

## Razor

```cshtml
<ds-field asp-for="Receipts">
    <ds-file-upload asp-for="Receipts" accept=".pdf,.xlsx,image/*" max-size="10 MB" max-files="5" />
</ds-field>

<ds-file-upload asp-for="Attachments" upload-url="/api/files" upload-field="AttachmentIds" compact />

<ds-avatar-upload asp-for="Photo" src="@Model.PhotoUrl" initials="AL" remove-name="RemovePhoto" max-size="2 MB" />
```

`ds-file-upload` menulis dropzone dengan judul yang dilokalkan ("Pilih file atau seret ke sini") dan hint yang disusun dari `accept` dan `max-size` ("PDF, XLSX, gambar, maksimal 10 MB per file") kecuali Anda mengisi `title` atau `hint`. Model berupa koleksi `IFormFile`, `multiple`, atau `max-files` di atas 1 mengizinkan beberapa file. Galat model state menyetel `aria-invalid` dan `input-validation-error`. Opsi: `name`, `id`, `accept`, `max-size`, `max-files`, `multiple`, `upload-url`, `upload-field`, `upload-param`, `paste-page`, `title`, `hint`, `icon`, `compact`, `required`, `disabled`.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-upload` | Aktifkan uploader di sekitar input file; `="avatar"` untuk varian avatar |
| `data-ds-upload-max-size` | `10 MB`, `500 KB`, atau byte |
| `data-ds-upload-max-files` | Jumlah tertinggi file valid |
| `data-ds-upload-url` | Unggah setiap file ke URL ini dengan progres (POST, multipart) |
| `data-ds-upload-field` | Nama input id tersembunyi (bawaan: nama input + `Ids`) |
| `data-ds-upload-param` | Nama field form untuk file dalam request unggah (bawaan `file`) |
| `data-ds-upload-paste="page"` | Terima file tempelan di mana saja di halaman |
| `data-ds-upload-remove`, `data-ds-upload-removed` | Avatar: tombol Hapus dan flag tersembunyi yang disetelnya |

Event (bubbling): `ds:upload:add` (`detail.files`), `ds:upload:remove`, `ds:upload:done` (`detail.file`, `detail.response`), `ds:upload:error` (`detail.status`). API: `DS.upload.files(el)`, `DS.upload.add(el, files)`, `DS.upload.clear(el)`, `DS.upload.formatSize(bytes, "id")`.

```js
document.addEventListener("ds:upload:done", (event) => {
  console.log(event.detail.file.name, event.detail.response.id);
});
```

File yang dilepas di samping dropzone diabaikan, tidak dibuka di tab, sehingga form yang setengah terisi tidak pernah hilang.

## Token

`--ds-control-border`, `--color-primary`, `--ds-primary-soft`, `--ds-primary-text`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-state-drag`, `--ds-error-soft`, `--ds-error-text`, `--ds-success-text`, `--ds-radius-card`, `--ds-radius-xl`, `--ds-radius-md`, `--ds-radius-full`, `--ds-duration-fast`, `--ds-duration-enter`, `--ds-duration-spring`, `--ds-ease-emphasized`, `--ds-ease-spring`, `--ds-enter-offset`, `--ds-press-scale`, `--ds-size-target`, `--ds-focus`, `--ds-type-callout-*`, `--ds-type-footnote-*`, `--ds-type-caption-*`.

## Native dan daisyUI

Dibangun di atas `input type="file"` di dalam `label`, yang sudah membuka dialog saat klik, Enter, dan Space serta mengirim tanpa JavaScript. ds.js menjaga `FileList` input tetap selaras dengan daftar (lewat `DataTransfer`), sehingga submit biasa mengirim tepat file yang valid. `.file-input` milik daisyUI tidak dipakai: dropzone butuh ruang untuk target seret dan daftar. Tombol avatar adalah `btn btn-sm` dan `btn-ghost` milik daisyUI.
