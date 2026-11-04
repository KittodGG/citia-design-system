---
title: Pola form
group: patterns
order: 2
summary: Cara form ditata, divalidasi, dan disimpan: tata letak field, wajib dan opsional, waktu validasi, form multi-langkah, simpan dan batal, serta guard perubahan.
---

Form mengubah satu tugas menjadi isian. Halaman ini menetapkan keputusan yang sama untuk semua form, supaya dua form dalam satu produk berperilaku sama. Komponen field ada di [Field](./field.md), [Input](./input.md), dan [Form](./form.md); pesan galat dibahas di [Validation](./validation.md) dan [Menulis](./writing.md).

## Tata letak

- Satu kolom secara bawaan. Pakai `.ds-field-grid` (dua kolom) hanya untuk isian pendek yang berkaitan, seperti nama depan dan belakang, dan biarkan menjadi satu kolom di bawah 640px.
- Label berada di atas field dan selalu terlihat. Placeholder adalah contoh, bukan label.
- Kelompokkan isian terkait dalam `<fieldset>` dengan `<legend>`. Taruh isian yang jarang dipakai di `.ds-optional-group`, tertutup secara bawaan.
- Lebar mengikuti isi: kode pos sempit, deskripsi lebar. Jangan melebarkan isian 4 digit sampai 640px.
- Teks bantuan ada di bawah label atau field (`.ds-hint`), dihubungkan dengan `aria-describedby`.

```html preview title="Field satu kolom dengan petunjuk"
<div class="ds-form" style="max-inline-size:28rem">
  <fieldset class="ds-fieldset">
    <legend>Kontak penagihan</legend>
    <div class="ds-field">
      <label for="fp-name">Nama lengkap</label>
      <input id="fp-name" class="input" value="Daniel Okafor" autocomplete="name" required>
    </div>
    <div class="ds-field">
      <label for="fp-email">Email</label>
      <input id="fp-email" type="email" class="input" value="daniel.okafor@example.com" autocomplete="email" aria-describedby="fp-email-hint" required>
      <p id="fp-email-hint" class="ds-hint">Faktur dikirim ke alamat ini.</p>
    </div>
    <div class="ds-field">
      <label for="fp-phone">Telepon <small class="ds-label-note">opsional</small></label>
      <input id="fp-phone" type="tel" class="input" autocomplete="tel">
    </div>
  </fieldset>
</div>
```

## Wajib dan opsional

Pada form yang baik sebagian besar isian wajib, jadi tandai pengecualiannya. Tambahkan kata "opsional" pada label isian opsional dan jangan tandai isian wajib. Bila form hampir seluruhnya opsional, katakan sekali di pengantar ("Semua isian opsional") dan tandai yang wajib dengan "wajib". Pasang atribut `required` pada isian wajib; jangan mengandalkan tanda bintang, karena pembaca layar membacakannya dengan buruk.

## Waktu validasi

| Saat | Aturan |
| --- | --- |
| Selama mengetik | Jangan tampilkan galat sebelum blur pertama. Pengecualian: kekuatan password dan penghitung karakter, yang membantu saat mengetik |
| Saat blur | Validasi isian dan tampilkan pesan di bawahnya. Pakai `:user-invalid` agar isian yang belum disentuh tetap tenang |
| Setelah galat pertama | Validasi ulang pada setiap input agar galat hilang begitu nilainya benar |
| Saat kirim | Validasi semuanya di klien, lalu di server. Tampilkan ringkasan galat di atas dan pindahkan fokus ke sana |
| Pemeriksaan async | Mulai setelah 300ms tanpa ketikan, tampilkan spinner di field dan pertahankan lebar; beri tanda berhasil hanya bila pemeriksaan itu berguna (nama pengguna tersedia) |

Server adalah sumber kebenaran: setiap aturan klien diulang di server, dan galat server tampil di tempat yang sama dengan galat klien. Lihat [Validation](./validation.md).

```html preview title="Field tidak valid dan valid"
<div class="ds-form" style="max-inline-size:28rem">
  <div class="ds-field">
    <label for="fp-v1">Nomor faktur</label>
    <input id="fp-v1" class="input" value="INV-26-418" aria-invalid="true" aria-describedby="fp-v1-err">
    <p id="fp-v1-err" class="ds-field-error">Pakai format INV-2026-0418 (INV, tahun, angka 4 digit).</p>
  </div>
  <div class="ds-field">
    <label for="fp-v2">Nomor faktur</label>
    <input id="fp-v2" class="input" value="INV-2026-0418" data-state="success">
  </div>
</div>
```

### Ringkasan galat

Setelah kirim gagal, tampilkan `.ds-error-summary` sebagai blok pertama form dengan `role="alert"` dan `tabindex="-1"`, lalu fokuskan. Judulnya menyebut apa yang gagal ("Faktur belum tersimpan"), lalu jumlahnya ("Perbaiki 2 isian di bawah"), lalu satu tautan per galat yang melompat ke isiannya. Teks tautan sama dengan pesan di bawah isian.

## Simpan dan batal

- Footer (`.ds-form-actions`) berisi Batal di sisi awal dan aksi di sisi akhir. Tombol utama adalah satu-satunya tombol terisi dan dinamai sesuai hasilnya: "Buat proyek", "Simpan perubahan", "Kirim faktur". Jangan "Submit" atau "OK".
- Aksi sekunder yang menjaga pengguna dalam alur ("Simpan dan tambah lagi") berupa tombol biasa di sebelahnya.
- Saat kirim, cegah kirim ganda dengan `data-ds-once`, pertahankan lebar tombol dan tampilkan spinner; `data-ds-loading-label` mengatur teks sibuk ("Menyimpan…").
- Setelah simpan berhasil, redirect (Post/Redirect/Get) dan tampilkan [Toast](./toast.md) yang menyebut hasilnya ("Proyek tersimpan"). Bila gagal tetap di halaman, pertahankan nilai yang diketik, dan tampilkan ringkasan.
- Batal kembali ke halaman asal lewat `returnUrl` lokal.

```cshtml
<form method="post" data-ds-guard data-ds-once>
    <div class="ds-form-actions">
        <a class="btn" href="@Model.ReturnUrl" data-ds-guard-skip>Batal</a>
        <div><button class="btn btn-primary" data-ds-loading-label="Menyimpan…">Simpan perubahan</button></div>
    </div>
</form>
```

## Perubahan belum disimpan

Tambahkan `data-ds-guard` pada form yang memuat pekerjaan lebih dari semenit. Bila pengguna mengubah isian lalu mencoba pergi lewat tautan, tombol kembali browser, atau keluar akun, dialog Leave (`_DsLeaveDialog`) bertanya. Dialog menawarkan "Tetap di halaman" lebih dulu dan "Keluar" kedua, karena bertahan adalah pilihan yang aman.

- Tautan yang tidak boleh bertanya (Batal, kirim itu sendiri) membawa `data-ds-guard-skip`.
- Atur `data-ds-guard-dirty` pada form untuk menandainya kotor lewat skrip, misalnya setelah penyuntingan teks kaya.
- Jangan pasang guard pada form pencarian, filter, atau pengaturan satu isian.

## Form multi-langkah

Pakai langkah hanya bila form punya lebih dari sekitar 8 isian dalam kelompok yang jelas berbeda, atau bila langkah berikutnya bergantung pada sebelumnya. Selain itu pakai satu halaman dengan fieldset.

- Tampilkan [Stepper](./stepper.md) di atas form dengan nama langkah, bukan angka saja.
- Validasi tiap langkah sebelum lanjut; Kembali tidak pernah membuang nilai yang sudah diketik.
- Tombol utama tetap di sisi akhir: "Lanjut" pada langkah 1 sampai n-1, hasil bernama ("Buat akun") pada langkah terakhir.
- Tambahkan langkah tinjau untuk form yang tidak bisa dibatalkan, berisi semua jawaban dengan tautan untuk mengubahnya.
- Simpan draf di server bila pengisian memakan waktu lebih dari beberapa menit, dan katakan ("Draf tersimpan 14.32").

## Penggunaan

- Minta seminimal mungkin; setiap isian mengurangi tingkat penyelesaian.
- Pakai `type`, `inputmode`, dan `autocomplete` yang tepat agar keyboard ponsel dan isi otomatis bekerja.
- Pertahankan nilai yang diketik setelah galat server.
- Jangan mengosongkan form saat galat, menonaktifkan tombol kirim sebelum percobaan pertama, atau memvalidasi tiap ketikan sebelum blur pertama.
- Jangan menaruh dua tombol utama dalam satu footer.
- Jangan memakai toast untuk galat validasi; tempatnya di samping isian.
