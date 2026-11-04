---
title: Prinsip
group: Fondasi
order: 1
summary: Sepuluh aturan yang diikuti setiap komponen, dipetakan ke delapan prinsip desain Apple dan aturan antarmuka cair, dengan bukti dari TPS Integration.
source: TPS DESIGN.md bagian Master data operasional, Tipografi, Sidebar, Tabel dan tautan
---

Citia Design System lahir dari TPS Integration: aplikasi yang dipakai operator terminal untuk memasukkan dan mengirim data ke Bea Cukai berjam-jam per shift. Semua komponen mengikuti aturan di halaman ini. Bila sebuah komponen baru melanggar salah satunya, ubah komponennya, bukan aturannya.

Tiap aturan ditulis sebagai daftar singkat lalu bukti dari TPS. Arah gaya mengikuti ENERGY 1 / RHYTHM 2 / MOTION 1 yang dipakai selama pengerjaan TPS: energi visual rendah, ritme tata letak teratur, gerak seminimal mungkin.

## Operator lebih dulu {#operator}

Pengguna utama adalah operator terminal: data padat, shift panjang, keyboard di meja dan layar sentuh di lapangan.

- Rancang untuk keyboard dan sentuh sekaligus. Semua aksi bisa dicapai dengan Tab, Enter, dan Esc, dan semua target cukup besar untuk jari.
- Daftar mengutamakan pencarian, status, pemakaian, dan aksi baris. Angka berasal dari database, bukan dihias.
- Hapus teks yang mengulang judul. Paragraf pengantar di bawah judul halaman dibuang; bila perlu, satu baris.
- Jangan menjanjikan sesuatu yang tidak pasti di teks tetap (misalnya cek otomatis yang bisa mati).

**Bukti TPS.** Arahan pengguna "mengutamakan pengalaman operator terminal"; tabel master berubah menjadi baris berlabel di ponsel; tabel transaksi bergulir horizontal.

## Satu aksi utama per area {#aksi-utama}

- Satu `btn btn-primary` per area. Tombol kirim selalu utama dan paling kanan.
- Urutan dari kiri ke kanan: Batal, aksi simpan, aksi pratinjau, aksi utama.
- Simpan, nonaktifkan, dan hapus punya arti serta umpan balik berbeda. Jangan menggabungkannya.
- Label menyebut akibat: "Kirim ke Bea Cukai", bukan "Kirim".

**Bukti TPS.** Form pemasukan baru hanya berisi Batal, Simpan draft, dan Kirim. Enter di sebuah field tidak pernah mengirim ke layanan luar.

## Status adalah kata {#status}

- Status selalu berupa teks. Warna dan titik hanya mendukung.
- Kata menjelaskan apa yang terjadi dan apa yang harus dikerjakan, dengan subjek yang jelas: "Menunggu Bea Cukai", "Gagal ke Bea Cukai".
- Jangan menandai galat hanya dengan warna merah. Sertakan pesan di dekat field.

**Bukti TPS.** Enam status pengiriman (Draft, Menunggu Bea Cukai, Diterima Bea Cukai, Selesai di Bea Cukai, Gagal ke Bea Cukai, Double di Bea Cukai) ditulis sebagai kata. Panduan kode memakai hijau, merah, dan biru bersama kata, tidak pernah sendirian.

## Permukaan solid {#solid}

- Permukaan aplikasi solid: tanpa gradien, tanpa glassmorphism, tanpa bayangan dekoratif.
- Transparansi hanya untuk chrome yang melayang di atas isi yang bergulir, misalnya top bar situs dokumentasi ini. Selalu sediakan fallback `prefers-reduced-transparency: reduce` yang membuatnya opak.
- Lapisan dropdown dan kalender memakai permukaan solid, border netral 1 px, dan satu bayangan (`--ds-shadow-popover`).

**Bukti TPS.** Login dan Administrasi mengikuti arah HIG: "permukaan solid tanpa gradien atau glassmorphism". `--depth: 0` dan `--noise: 0` mematikan efek bawaan daisyUI.

## Target 44 px {#target}

- Semua kontrol interaktif minimal 44 × 44 px (`--ds-size-target`), termasuk `btn-sm`.
- Pengecualian satu-satunya: ikon aksi di tabel padat desktop, 36 px (`--ds-size-target-compact`). Jangan dipakai di layar sentuh.
- Input 16 px di ponsel agar iOS tidak memperbesar halaman.

**Bukti TPS.** "Kontrol aksi minimal 44 px; isi tabel 14 px dan teks bantuan 13 px." Kalender memakai tombol tanggal 44 px.

## Bantuan seperlunya {#bantuan}

- Tulis teks bantuan hanya bila format tidak bisa ditebak. Panjang maksimal 60 karakter.
- Label di atas field, bantuan di bawahnya, jarak 8 px (`--ds-space-field-stack`).
- Pesan validasi tetap dekat kolom yang membutuhkannya.

**Bukti TPS.** "Petunjuk field hanya ditulis bila format tidak bisa ditebak, maksimal sekitar 60 karakter." Contoh: Pos BC 1.1 memakai satu input `0001 - 0000 - 0000`.

## Warna punya satu tugas {#warna}

| Warna | Tugas | Jangan dipakai untuk |
| --- | --- | --- |
| Teal | Merek, aksi utama, navigasi aktif | Export, tautan |
| Biru | Tautan identitas (No BL, REF) | Tombol, dekorasi |
| Hijau Excel `--ds-excel` | Import, download, export `.xlsx` | Status sukses |
| Merah PDF `--ds-pdf` | Export `.pdf` | Galat |

Aturan lengkap ada di [Warna](/warna).

**Bukti TPS.** "Teal dipertahankan untuk aksi utama dan navigasi aktif." "Biru hanya untuk tautan; teal tetap warna merek." Review 29 Okt 2026: Excel hijau, PDF merah.

## Tabel menjaga identitas {#tabel}

- Identitas baris (No BL, kapal) tetap terlihat saat tabel digeser: kolom sticky kiri.
- Tabel bergulir di dalam kontainernya, bukan halaman. Kontainer berlabel dan bisa difokuskan dengan keyboard.
- Angka rata kanan, `tabular-nums`, satuan kecil di sebelahnya (`1574782 TNE`).
- Tautan identitas bergaris bawah, sehingga warna bukan satu-satunya penanda.

**Bukti TPS.** Arahan review 28 Okt 2026: "identitas BL/kapal tetap terlihat saat tabel digeser".

## Gerak minimal {#gerak}

- Gerak menjelaskan perubahan: halaman masuk, tema berganti, grup terbuka, dialog muncul. Bukan hiasan.
- Durasi 120–240 ms. Jarak kecil: masuk halaman hanya 5 px.
- Hover tidak menggeser elemen. Target klik tetap di bawah kursor.
- Di bawah `prefers-reduced-motion: reduce`, gerakan dimatikan; perubahan warna dan opasitas yang menjelaskan state tetap ada.

**Bukti TPS.** MOTION 1: "Motion ringan menyertai perpindahan halaman, tema, grup navigasi dan dialog." Item sidebar tidak memakai `translateX` saat hover.

## Terang dan gelap setara {#tema}

- Dua tema adalah warga kelas satu: `tps` dan `tps-dark`. Tiap token punya nilai di keduanya.
- Setiap pasangan teks harus lolos 4.5:1 dan non-teks 3:1 di kedua tema. Build gagal bila tidak.
- Tema mengikuti pilihan operator, lalu `prefers-color-scheme`. Tidak ada kilatan terang sebelum tema gelap dipasang.

**Bukti TPS.** Tema terang memakai off-white (`#f9f9f6` permukaan, `#f1f2ee` latar); tema gelap memakai `#151c25` dan `#0e141b`.

## Delapan prinsip Apple {#apple}

Panduan desain Apple (Human Interface Guidelines) dipakai sebagai kerangka. Setiap prinsip diterjemahkan ke satu aturan yang bisa diperiksa.

| Prinsip | Aturan di DS |
| --- | --- |
| Purpose | Setiap layar punya satu pekerjaan dan satu aksi utama; elemen yang tidak membantu pekerjaan itu dibuang. |
| Agency | Operator mengendalikan: Enter tidak pernah mengirim ke layanan luar, dan perubahan yang belum disimpan memunculkan dialog yang bisa dibatalkan. |
| Responsibility | Aksi yang tidak bisa dibatalkan (hapus, kirim ke Bea Cukai) memakai dialog konfirmasi dengan kata kerja akibatnya. |
| Familiarity | Pola standar: sidebar dua tingkat, tabel dengan header yang bisa diurutkan, ikon yang sama di setiap tempat, kalender dengan tombol 44 px. |
| Flexibility | Terang dan gelap, rail sidebar, ukuran halaman 10/20/50/100, keyboard dan sentuh. Preferensi sistem dihormati. |
| Simplicity, bukan minimalisme | Kurangi keputusan, bukan informasi: data penting tetap tampil penuh, penjelasan berulang dibuang. |
| Craft | Grid 8 pt, token untuk semua nilai, pasangan kontras diuji otomatis, tidak ada angka ajaib di komponen. |
| Delight | Respons yang terasa: efek tekan tombol, penanda scroll tracker, transisi halaman 180 ms. Kecil, bukan dekoratif. |

## Antarmuka cair {#cair}

Aturan gerak dari prinsip antarmuka cair Apple yang diadopsi DS.

### Respons saat ditekan

Elemen bereaksi pada saat disentuh, bukan saat dilepas. `.btn:active` memakai `transform: scale(.97)` (`--ds-press-scale`). Tidak ada penundaan antara sentuhan dan umpan balik.

### Animasi bisa disela

Animasi dimulai dari nilai yang sedang tampil di layar, bukan dari nilai awalnya. Kalau pengguna menekan lagi di tengah gerak, elemen berbalik dari posisi sekarang, tanpa melompat. Dipakai pada grup navigasi sidebar dan penanda scroll tracker dokumentasi (680 ms).

### Konsistensi spasial

Elemen keluar ke tempat asalnya masuk.

- Drawer sidebar masuk dari kiri dan keluar ke kiri.
- Menu dan popover berasal dari pemicunya dan menutup ke pemicunya.
- Halaman masuk dari bawah 5 px dan tidak pernah dari arah acak.

### Spring hanya untuk gestur

Spring dipakai untuk antarmuka yang digerakkan gestur (sheet yang diseret, daftar yang di-swipe), bukan untuk transisi biasa. Parameter bergaya Apple: damping ratio dan response dalam detik.

| Token | Nilai | Pakai untuk |
| --- | --- | --- |
| `default` | damping 1.0, response 0.35 | Semua gestur. Tidak memantul. |
| `momentum` | damping 0.8, response 0.35 | Hanya setelah flick yang membawa momentum. |
| `sheet` | damping 0.8, response 0.3 | Sheet yang dilempar ke posisi akhir. |

Transisi non-gestur memakai durasi dan easing di [token](/token-referensi), bukan spring.

### Preferensi sistem

- `prefers-reduced-motion: reduce`: durasi menjadi 0.01 ms, efek tekan dan loop dimatikan, indikator berputar disembunyikan tetapi kata statusnya tetap.
- `prefers-reduced-transparency: reduce`: popover, combobox, menu, dan toast menjadi opak, blur dihapus.
- `prefers-contrast: more`: teks `--ds-subtle` menjadi penuh, border kontrol dan pemisah lebih pekat.
- `forced-colors: active`: cincin fokus memakai `CanvasText`.

> [!NOTE]
> Semua preferensi ini berada di `accessibility.css`, tidak berlapis dan dimuat terakhir, sehingga selalu menang atas gaya komponen.
