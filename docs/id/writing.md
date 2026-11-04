---
title: Menulis
group: content
order: 1
summary: Aturan penulisan UX untuk bahasa Inggris dan Indonesia: tombol, label, galat, keadaan kosong, angka, tanggal, mata uang, huruf kapital, dan bahasa yang jelas, dengan contoh baik dan buruk.
---

Teks antarmuka adalah bagian dari desain. Aturan ini berlaku untuk setiap string dalam aplikasi, dalam bahasa Inggris dan Indonesia. Karakter suara dibahas di [Suara dan nada](./voice-and-tone.md); helper format ada di [Lokalisasi](./localization.md) dan [API Razor dan C#](./razor-api.md).

## Tombol berupa kata kerja

Tombol menamai hasil dari menekannya: kata kerja, lalu objeknya bila tidak jelas. Dua atau tiga kata.

| Buruk | Baik (en) | Baik (id) |
| --- | --- | --- |
| OK | Save changes | Simpan perubahan |
| Submit | Create project | Buat proyek |
| Ya / Tidak | Delete project / Keep project | Hapus proyek / Pertahankan proyek |
| Klik di sini | View invoice | Lihat faktur |
| Proceed | Continue | Lanjut |

- Satu aksi utama per area, dinamai sesuai hasilnya. Batal adalah "Batal" / "Cancel".
- Pakai kata kerja yang sama untuk aksi yang sama di mana pun: jangan mencampur Hapus, Buang, dan Singkirkan untuk satu hal.
- Hapus menghilangkan data; Keluarkan mengeluarkannya dari daftar tetapi menyimpannya; Arsipkan menyembunyikannya dan bisa dipulihkan.

## Label

- Label adalah kata benda atau frasa benda pendek: "Email", "Tanggal jatuh tempo", "Due date". Tanpa titik dua, tanpa titik.
- Label di atas field dan selalu terlihat. Placeholder menunjukkan contoh ("nama@example.com"), bukan instruksi yang hilang.
- Jaga label di bawah 3 kata; taruh penjelasan di petunjuk di bawah field.
- Tandai pengecualian: "opsional" pada isian opsional (lihat [Pola form](./forms-pattern.md)).

## Petunjuk

Petunjuk menyebut apa yang diharapkan field atau mengapa ditanyakan, dalam satu kalimat pendek, dengan contoh bila formatnya tidak jelas.

- Baik: "Angka dengan titik desimal, misalnya 48500.50."
- Buruk: "Masukkan nilai yang valid."

## Pesan galat

Galat menyebut apa yang salah dan cara memperbaikinya, dalam kata sederhana, di samping isian. Galat tidak menyalahkan orang dan tidak menampilkan kode.

| Buruk | Baik (id) | Baik (en) |
| --- | --- | --- |
| Input tidak valid | Isi tanggal seperti 25 Jan 2026. | Enter a date like 25 Jan 2026. |
| Error 403 | Anda tidak punya akses ke halaman ini. Minta administrator menambahkan Anda. | You do not have access to this page. Ask an administrator to add you. |
| Password harus memenuhi persyaratan kompleksitas | Gunakan minimal 12 karakter. | Use at least 12 characters. |
| Anda salah memasukkan email | Email atau password tidak sesuai. Periksa keduanya lalu coba lagi. | The email or password is not correct. Check both and try again. |
| Terjadi kesalahan | Faktur belum tersimpan. Periksa koneksi Anda lalu coba lagi. | The invoice was not saved. Check your connection and try again. |

- Mulai dengan masalah atau instruksinya, bukan "Error:" atau "Ups".
- Sebut apa yang tetap tersimpan: "Perubahan Anda masih ada."
- Jangan memakai tanda seru, humor, atau permintaan maaf untuk galat yang wajar.

## Keadaan kosong

Katakan apa yang seharusnya ada di sini dan tawarkan langkah pertama. Paling banyak tiga bagian: judul, satu kalimat, satu aksi.

| Kasus | id | en |
| --- | --- | --- |
| Pertama kali | Belum ada faktur. Faktur yang Anda buat tampil di sini. [Buat faktur] | No invoices yet. Invoices you create appear here. [Create invoice] |
| Tanpa hasil | Tidak ada proyek yang cocok dengan "okafor". [Hapus filter] | No projects match "okafor". [Clear filters] |
| Tanpa akses | Anda hanya bisa melihat daftar ini bila menjadi anggota tim. | You can view this list only when you are a member of the team. |

## Konfirmasi

Sebut objek dan akibatnya; namai tombol sesuai aksinya. "Hapus PRJ-1024? Proyek dan 3 faktur terkait dihapus. Tindakan ini tidak bisa dibatalkan." dengan "Hapus proyek" dan "Pertahankan proyek".

## Angka, tanggal, mata uang

Format sesuai lokal pembaca di layar; pakai format mesin di berkas dan URL. Pakai `Fmt` di C# dan `Intl` di skrip, jangan merangkai string sendiri.

| Hal | Inggris | Indonesia |
| --- | --- | --- |
| Angka | 1,574,782.5 | 1.574.782,5 |
| Persentase | 12.5% | 12,5% |
| Tanggal | 25 Jan 2026 | 25 Jan 2026 |
| Tanggal dan jam | 25 Jan 2026, 2:30 PM atau 14:30 | 25 Jan 2026 14.30 |
| Rentang waktu | 08:00–17:00 | 08.00–17.00 |
| Mata uang | $1,250.00, USD 1,250.00 | Rp1.250.000, IDR 1.250.000 |
| Jumlah dengan satuan | 3 invoices | 3 faktur |

- Bulan disingkat 3 huruf; bahasa Indonesia memakai Jan Feb Mar Apr Mei Jun Jul Agu Sep Okt Nov Des.
- Jangan menulis tanggal sebagai 01/02/2026, yang berarti hari berbeda di negara berbeda.
- Tempatkan simbol atau kode mata uang secara konsisten, dengan spasi tak terputus untuk kode.
- Tampilkan zona waktu bila audiens lintas zona ("14.30 WIB", "14.30 UTC+7").
- Angka di tabel rata akhir, dalam angka tabular, dengan desimal yang sama per kolom.
- Tulis angka di bawah 10 dengan huruf dalam kalimat ("tiga faktur"), pakai digit di label, hitungan, dan data ("3 dipilih").
- Bentuk jamak: bahasa Indonesia tidak berubah ("1 faktur", "2 faktur"); bahasa Inggris ditulis bersama jumlahnya, "1 invoice" dan "2 invoices".

## Huruf kapital

- Huruf kapital kalimat untuk judul, tombol, label, dan item menu: "Buat proyek", "Detail penagihan".
- Kapitalkan nama produk dan nama diri saja.
- Bahasa Inggris mengikuti aturan yang sama: "Create project", bukan "Create Project".
- Jangan menulis dengan huruf kapital semua; pakai gaya `text-transform` bila desain membutuhkannya.
- Singkatan ditulis lengkap sekali: "Pajak pertambahan nilai (PPN)".

## Khusus bahasa Indonesia

- Sapa pengguna secara formal dan sederhana dengan "Anda", huruf A kapital. Jangan memakai "kamu" atau "kak". Hindari "Bapak/Ibu".
- Pakai kalimat aktif: "Pembayaran gagal", bukan "Pembayaran telah mengalami kegagalan".
- Pertahankan istilah teknis dalam bahasa Inggris yang lazim dipakai: email, password, file. Login adalah "masuk", upload adalah "unggah", download adalah "unduh". Konsisten dalam satu produk.
- Pilih kata sehari-hari yang pendek: "pakai" untuk "menggunakan" di label, "buat" untuk "membuat"; "gunakan" boleh dalam kalimat.
- Siapkan ruang 30 sampai 40% lebih panjang dari bahasa Inggris; jangan memotong label tombol.
- Koma desimal dan titik ribuan pada angka; "Rp" menempel pada jumlah.

## Tanpa jargon

- Tulis seperti orang mengucapkannya: "Masuk", bukan "Autentikasi"; "Tidak bisa terhubung", bukan "Request timeout 504".
- Namai hal seperti pengguna menamainya, satu nama per hal di seluruh produk, glosarium Inggris dan Indonesia disimpan berdampingan.
- Jangan menampilkan pengenal internal, exception, atau SQL. Tampilkan request ID untuk dukungan.
- Jangan memakai idiom atau humor yang tidak bisa diterjemahkan.
- Jangan memakai kata pemasaran (mulus, tangguh, tanpa usaha).

## Penggunaan

- Tulis pesan seperti Anda mengatakannya kepada rekan kerja.
- Pakai contoh nyata di petunjuk ("INV-2026-0418").
- Uji string pada panjang 140%.
- Jangan memakai tanda seru, emoji, atau HURUF KAPITAL SEMUA.
- Jangan merangkai kalimat dari potongan; penerjemah butuh kalimat utuh dengan placeholder (`{0} faktur dipilih`).
