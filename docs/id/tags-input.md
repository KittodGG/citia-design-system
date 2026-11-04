---
title: Tags input
group: components
category: forms
order: 27
summary: Field yang mengubah teks ketikan atau tempelan menjadi chip yang bisa dihapus, dengan umpan balik duplikat, batas maksimum, validasi per tag, dan nilai form.
---

Tags input mengumpulkan daftar pendek nilai teks bebas: label, kata kunci, alamat email yang diundang. Orang mengetik nilai lalu menekan Enter atau koma; nilai itu menjadi chip. Bila nilai harus berasal dari daftar yang sudah diketahui, pakai [Multi-select](./multi-select.md). Untuk satu nilai teks bebas, pakai [Input](./input.md).

## Contoh

### Dasar

Letakkan `data-ds-tags` pada input teks. Tanpa JavaScript, ini adalah field teks yang dipisah koma. Dengan ds.js, input yang sama disembunyikan dan tetap menyimpan nilai yang dipisah koma, sehingga data yang dikirim tidak berubah (`Labels=design,urgent`).

```html preview title="Tags input"
<div class="ds-field" style="max-width: 30rem">
  <label for="tg-labels">Label</label>
  <input id="tg-labels" name="Labels" class="input" value="keuangan, tutup buku q3" data-ds-tags placeholder="Tambah label" aria-describedby="tg-labels-hint">
  <p id="tg-labels-hint" class="ds-hint">Tekan Enter atau koma setelah setiap label.</p>
</div>
```

### Maksimum dan panjang

`data-ds-tags-max` membatasi jumlah tag dan menampilkan penghitung; `data-ds-tags-maxlength` memangkas setiap tag.

```html preview title="Maksimum 5 tag"
<div class="ds-field" style="max-width: 30rem">
  <label for="tg-keywords">Kata kunci pencarian</label>
  <input id="tg-keywords" name="Keywords" class="input" value="faktur,jatuh tempo,PRJ-1024" data-ds-tags data-ds-tags-max="5" data-ds-tags-maxlength="24" placeholder="Tambah kata kunci">
</div>
```

### Validasi per tag

`data-ds-tags-pattern` adalah regular expression yang harus dipenuhi setiap tag (seluruh nilai). Tag yang tidak valid tetap tampil sebagai chip galat agar bisa dihapus atau diketik ulang, dan field melaporkan "2 isian tidak valid. Hapus atau perbaiki." saat dikirim.

```html preview title="Alamat email"
<div class="ds-field" style="max-width: 30rem">
  <label for="tg-invite">Undang lewat email</label>
  <input id="tg-invite" name="Invitees" class="input" value="ayu.lestari@example.com, daniel.okafor@example" data-ds-tags data-ds-tags-pattern="[^@\s]+@[^@\s]+\.[^@\s]+" placeholder="nama@perusahaan.com" aria-describedby="tg-invite-hint">
  <p id="tg-invite-hint" class="ds-hint">Tempel daftar yang dipisah koma, titik koma, atau baris baru.</p>
</div>
```

### Satu nilai per tag

`data-ds-tags-mode="multiple"` mengirim setiap tag sebagai nilai tersendiri dengan nama yang sama (`Tags=a&Tags=b`), yang terikat ke `List<string>`.

```html preview title="Beberapa nilai"
<div class="ds-field" style="max-width: 30rem">
  <label for="tg-multi">Tag</label>
  <input id="tg-multi" name="Tags" class="input" value="onboarding,remote" data-ds-tags data-ds-tags-mode="multiple">
</div>
```

## State

```html preview title="State tags input"
<div class="grid gap-4 sm:grid-cols-2">
  <div class="ds-field"><label for="tg-st-1">Kosong</label><input id="tg-st-1" class="input" data-ds-tags placeholder="Tambah label"></div>
  <div class="ds-field"><label for="tg-st-2">Batas tercapai</label><input id="tg-st-2" class="input" value="utara,selatan" data-ds-tags data-ds-tags-max="2"></div>
  <div class="ds-field"><label for="tg-st-3">Tidak valid</label><input id="tg-st-3" class="input" value="ok@example.com,not-an-email" data-ds-tags data-ds-tags-pattern="[^@\s]+@[^@\s]+\.[^@\s]+" aria-invalid="true" aria-describedby="tg-st-3-err"><p id="tg-st-3-err" class="ds-field-error">Hapus atau perbaiki not-an-email.</p></div>
  <div class="ds-field"><label for="tg-st-4">Nonaktif</label><input id="tg-st-4" class="input" value="arsip,2025" data-ds-tags disabled></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Empty | tidak ada tag | placeholder dengan `--ds-subtle` |
| Focus | fokus di kolom isian | focus ring field (dari [Input](./input.md)) |
| Typing | teks di kolom isian | hanya teks; tidak ada yang ditambahkan sampai Enter, koma, Tab, tempel, atau blur |
| Added | Enter, koma, Tab, blur | chip memudar masuk dan membesar dari 96% (160ms); "{label} ditambahkan." diumumkan |
| Duplicate | nilai sudah ada (tidak membedakan huruf besar kecil) | chip yang sudah ada berkedip dengan rona primary selama 1,6 detik; "{label} sudah ada di daftar." |
| Limit reached | `data-ds-tags-max` | penghitung berwarna teks penuh, nilai berikutnya ditolak dengan "Anda dapat menambahkan paling banyak 5." |
| Invalid tag | nilai tidak memenuhi `data-ds-tags-pattern` | chip dengan `--ds-error-soft`, border dan teks galat; field tidak valid sampai diperbaiki |
| Chip focus | Arrow Left dari kolom isian | focus ring pada tombol × chip |
| Removed | tombol ×, Backspace, Delete | chip hilang, "{label} dihapus." diumumkan |
| Invalid field | `aria-invalid="true"` | border galat, pesan di bawah |
| Disabled | `disabled` | field diredupkan, chip tanpa aksi hapus |

## Anatomi

- `.ds-tags-input`: pembungkus (dibuat otomatis).
- `.ds-tags-input__field.input`: field di sekitar chip dan kolom isian.
- `.ds-tags-input__tokens`: daftar chip `.ds-token`.
- `.ds-tags-input__input`: kolom isian teks; memakai `id` asli, sehingga label tetap menunjuk ke sana.
- `input[type=hidden][data-ds-tags]`: input asli (id `{id}-value`), menyimpan nilai gabungan.
- `.ds-tags-input__meta` / `.ds-tags-input__count`: penghitung bila maksimum ditetapkan.

## Penggunaan

- Jelaskan cara menambah tag di petunjuk ("Tekan Enter atau koma setelah setiap label.").
- Jaga tag tetap pendek (di bawah 24 karakter) dan tetapkan `data-ds-tags-maxlength` untuk menegakkannya.
- Terima tempel seluruh daftar; orang sering menyalin dari spreadsheet atau email.
- Normalisasi juga di server (trim, huruf besar kecil): klien mencegah duplikat yang jelas, bukan semuanya.
- Jangan pakai untuk nilai yang harus ada di daftar (orang, proyek); gunakan [Multi-select](./multi-select.md).

## Aksesibilitas

- Kolom isian adalah input teks biasa dengan label, petunjuk, dan galat milik field. Chip berupa daftar; setiap tombol hapus bernama "Hapus {label}".
- Tombol hapus bukan perhentian Tab; Arrow Left di awal kolom isian memindahkan ke tombol itu, sehingga field dengan 20 tag tetap satu perhentian Tab.
- Live region polite mengumumkan nilai yang ditambahkan, dihapus, duplikat, melebihi maksimum, dan tidak valid.
- Chip tidak valid memakai border, isian, dan warna teks; pesan galat menyebutkan masalahnya dengan kata-kata.

| Tombol | Aksi |
| --- | --- |
| Enter atau , (koma) | Menambahkan teks yang diketik sebagai tag (Enter pada kolom isian kosong mengirim form) |
| Tab | Menambahkan teks yang diketik, lalu lanjut |
| Backspace | Saat kolom isian kosong: menghapus tag terakhir |
| Arrow Left | Di awal kolom isian: memfokuskan tombol hapus tag terakhir |
| Arrow Left / Right pada tag | Berpindah antar tag; setelah tag terakhir, kembali ke kolom isian |
| Backspace / Delete / Enter pada tag | Menghapus tag itu |
| Escape atau End pada tag | Kembali ke kolom isian |
| Ctrl/Cmd + V | Menempel; teks dipecah pada koma, titik koma, tab, dan baris baru |

## Razor

```cshtml
<div class="ds-field">
    <label asp-for="Labels">Label</label>
    <ds-tags-input asp-for="Labels" max="8" max-length="24" placeholder="Tambah label" />
</div>

<ds-tags-input asp-for="Invitees" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" />
```

Properti `string` mengirim satu nilai yang dipisah koma; koleksi (`List<string>`, `string[]`) beralih ke satu nilai per tag. Atribut lain: `separator`, `required`, `disabled`, `size="sm"`. Galat model menambahkan `aria-invalid` dan pesan.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `input[data-ds-tags]` | Menyempurnakan input |
| `data-ds-tags-separator` | Pemisah untuk nilai yang dikirim dan saat mengetik (bawaan `,`) |
| `data-ds-tags-mode="multiple"` | Satu input hidden per tag dengan nama yang sama |
| `data-ds-tags-max` | Jumlah maksimum tag (menampilkan penghitung) |
| `data-ds-tags-maxlength` | Maksimum karakter per tag |
| `data-ds-tags-pattern` | Regular expression yang harus dipenuhi setiap tag |
| `data-ds-tags-commit="false"` | Jangan menambahkan teks yang diketik saat blur |

API: `DS.tagsInput(input)` mengembalikan `{ add(text), remove(tag), clear(), get() }`. Event pada input asli: `input`, `change`, dan `ds:tags:change` `{ tags }`. Reset form memulihkan tag awal.

## Token

Field: seperti [Input](./input.md). Chip: `--color-base-200`, `--color-base-300`, `--ds-radius-md`, `--ds-radius-sm`, `--ds-type-footnote-size`, `--ds-subtle`, `--ds-error-soft`, `--ds-error-text`, `--color-primary`, `--ds-opacity-state-drag` (kedipan duplikat), `--ds-duration-quick`, `--ds-ease-emphasized`.

## Native dan daisyUI

Dibangun di atas `<input>` teks, sehingga bekerja tanpa JavaScript sebagai teks yang dipisah koma. Field adalah `.input` daisyUI yang dipakai sebagai kontainer; chip adalah `.ds-token` milik DS, dipakai bersama dengan [Multi-select](./multi-select.md).
