---
title: Prinsip
group: foundations
order: 1
summary: Delapan prinsip desain Apple yang disesuaikan menjadi aturan yang bisa diperiksa, ditambah lima aturan Citia untuk state, gerak, garis tipis, warna, dan konten, lengkap dengan angkanya.
---

Prinsip ini menentukan setiap komponen. Bila komponen baru melanggar salah satunya, ubah komponennya, bukan prinsipnya. Setiap aturan ditulis agar bisa diperiksa saat review: angka, state, atau kata.

## Delapan prinsip yang disesuaikan

Prinsip desain Apple menjadi kerangka. Masing-masing menjadi satu aturan di sini.

| Prinsip | Aturan di DS |
| --- | --- |
| Purpose | Satu layar punya satu pekerjaan dan satu aksi utama: satu `btn-primary` per area. Apa pun yang tidak membantu pekerjaan itu dibuang. |
| Agency | Pengguna yang memutuskan. Tidak ada yang terkirim karena Enter tak sengaja; perubahan yang belum disimpan memunculkan dialog yang bisa dibatalkan; aksi destruktif bisa dikonfirmasi atau diurungkan. |
| Responsibility | Katakan apa yang akan terjadi. Label menyebut hasilnya ("Hapus 3 faktur"), dan aksi yang tak bisa dibalik bertanya dulu dengan kata kerja yang sama di tombol konfirmasi. |
| Familiarity | Pakai elemen native, pintasan platform, dan pola standar (tab, menu, tabel dengan header yang bisa diurutkan) sebelum menciptakan yang baru. Ikon yang sama berarti hal yang sama di mana pun. |
| Flexibility | Terang dan gelap, keyboard dan sentuh, mouse dan pena, Indonesia dan Inggris, zoom 200%, gerak dan transparansi dikurangi, kontras lebih tinggi, kanan-ke-kiri. |
| Simplicity | Kurangi keputusan, bukan informasi. Tampilkan data penting secara utuh; buang penjelasan yang berulang. Pengungkapan bertahap, bukan menyembunyikan. |
| Craft | Token untuk setiap nilai, grid 8pt, kontras diuji pada 72 pasangan di kedua tema, tanpa angka ajaib di komponen. |
| Delight | Umpan balik kecil dan fisik: skala tekan `--ds-press-scale`, thumb switch yang bergeser, toast yang mengendap. Bukan hiasan, bukan kejutan. |

## Aturan Citia

### Kelengkapan state {#states}

Komponen selesai ketika setiap state dirancang, bukan ketika tampilan diamnya selesai.

- Setiap komponen interaktif mencakup rest, hover, focus-visible, pressed, selected, disabled dan, bila berlaku, loading, invalid, read-only, dan empty.
- Tabel state wajib ada di setiap halaman komponen.
- Setiap varian harus tetap terbaca di setiap state, di kedua tema: 4.5:1 untuk teks, 3:1 untuk batas dan ikon.
- State berasal dari platform (`:hover`, `:focus-visible`, `:checked`, `[aria-expanded]`), bukan dari kelas tambahan.
- State tidak pernah disampaikan hanya lewat warna. Tambahkan glyph, kata, ketebalan, atau indikator.

### Gerak yang tenang {#motion}

Gerak menjelaskan perubahan lalu menyingkir.

- Perubahan warna dan opasitas memakan 150ms (`--ds-duration-fast`). Umpan balik tekan 120ms.
- Menu, popover, dan toast masuk dalam 160 sampai 220ms dan keluar dalam 140ms: keluar lebih cepat dari masuk.
- Elemen masuk dengan bergeser paling jauh 5px (`--ds-enter-offset`) atau membesar dari skala 0.96, dari sisi pemicunya, dan keluar dengan cara yang sama.
- Indikator yang berpindah (thumb switch, garis bawah tab, snap slider) memakan 500ms dengan spring teredam kritis tanpa overshoot. Pantulan hanya untuk gestur yang membawa momentum, seperti lemparan sheet.
- Animasikan hanya `transform`, `opacity`, dan warna. Jangan `width`, `height`, `top`, atau `left`.
- Respons saat pointer ditekan. Animasi bisa diinterupsi dan mulai ulang dari nilai yang tampil di layar.
- Tidak ada yang berulang selain spinner, skeleton, titik live, dan progres indeterminate. Tanpa parallax, tanpa efek terangkat pada UI data padat.
- Dengan `prefers-reduced-motion: reduce`, pergerakan hilang dan cross-fade singkat (sampai 150ms) tetap ada.

### Garis tipis, bukan kotak {#hairlines}

- Pisahkan dengan border 1px `--color-base-300`, bukan border lebih tebal, panel berisi, atau bayangan.
- Bayangan hanya untuk lapisan yang melayang (menu, popover, dialog) dan berasal dari empat token: `xs`, `menu`, `panel`, `overlay`.
- Radius tegas dan sedikit (`--ds-radius-*`). Tanpa gradien, tanpa glow, tanpa glassmorphism kecuali bilah translusen di atas konten yang bergulir, yang menjadi opak pada `prefers-reduced-transparency`.
- Border field memakai `--ds-control-border`, minimal 3:1 terhadap permukaan, sehingga field mudah ditemukan tanpa hover.

### Warna yang jarang {#colour}

- Permukaan netral. Teal (`--color-primary`) menandai satu aksi utama, seleksi, dan fokus.
- Status memakai isian tonal pucat dengan kata dan ikon. Area besar yang jenuh adalah cacat.
- Biru hanya untuk tautan. Jangan pakai warna merek untuk dekorasi.
- Hierarki berasal dari tipografi: Manrope dengan ukuran, bobot, dan tracking disetel bersama, angka tabular untuk data.

Lihat [Warna](./color.md) untuk peran, status, dan mode gelap.

### Konten nyata {#content}

- Pratinjau dan contoh memakai data yang masuk akal dan netral bidang usaha, dengan nama campuran (Ayu Lestari, Daniel Okafor, Mei Tanaka, Sofia Marquez), kode proyek (`PRJ-1024`), nomor faktur (`INV-2026-0418`), jumlah, dan tanggal.
- Tanpa lorem ipsum, tanpa orang atau perusahaan rekaan, tanpa emoji, tanpa bahasa pemasaran.
- Label adalah kata kerja yang menyebut hasil. Status berupa kata dulu, warna kedua.
- Sediakan ruang untuk teks 40% lebih panjang: bahasa Indonesia lebih panjang dari Inggris, jadi tanpa label berlebar tetap.

## Angka yang perlu diingat

| Topik | Nilai |
| --- | --- |
| Target sentuh | 44px (`--ds-size-target`); minimal 24px untuk pointer apa pun |
| Focus ring | 2px, offset 2px, `--ds-focus`, tidak pernah dihapus |
| Kontras teks | 4.5:1; batas dan ikon 3:1 |
| Border | 1px, `--color-base-300` |
| Skala tekan | `--ds-press-scale` hanya pada tombol dan chip |
| Offset masuk | 5px |
| Transisi hover dan fokus | 150ms |
| Perpindahan indikator | 500ms, tanpa overshoot |
| State layer | hover 6%, pressed 10%, selected 12%, drag 16% |
| Teks bantuan | paling banyak 60 karakter |

## Antarmuka cair, dalam praktik

- **Merespons seketika.** Umpan balik dimulai saat pointer ditekan, bukan saat klik.
- **Tetap bisa diinterupsi.** Tekan lagi di tengah animasi dan elemen berbalik dari posisinya sekarang.
- **Jaga konsistensi ruang.** Sheet keluar ke sisi asalnya; menu menutup ke tombolnya.
- **Spring hanya untuk gestur.** Transisi biasa memakai token durasi dan easing.
- **Hormati sistem.** `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast: more`, dan `forced-colors` ditangani di satu file, `accessibility.css`, dimuat terakhir sehingga selalu menang.

Berikutnya: [Warna](./color.md).
