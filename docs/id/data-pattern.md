---
title: Pola data
group: patterns
order: 3
summary: Pencarian, filter, urutan, paging, aksi massal, keadaan kosong, memuat, galat, dan export untuk daftar dan tabel data.
---

Daftar data adalah inti sebagian besar aplikasi. Halaman ini menetapkan cara orang menemukan, menyempitkan, mengurutkan, dan bertindak atas baris. Komponen: [Table](./table.md), [Data table](./data-table.md), [Pagination](./pagination.md), [Search input](./search-input.md), [Empty state](./empty-state.md), [Skeleton](./skeleton.md).

## Pencarian

- Satu field cari per daftar, di atas tabel, berlabel "Cari <objek>" dengan placeholder yang menyebut isian yang dicari ("Cari kode atau nama").
- Pencarian dikirim dengan `GET` (`?q=`) agar URL bisa dibagikan. Mengetik boleh menyaring langsung dengan debounce 300ms (`data-ds-autosubmit`), tetapi Enter selalu berfungsi.
- Cocokkan tanpa membedakan huruf besar kecil, abaikan aksen dan spasi berlebih; cari di kolom yang terlihat.
- Pertahankan kata kunci di field setelah hasil dimuat, dan sebut apa yang dicari di baris hasil ("3 hasil untuk "okafor"").
- Pencarian mengembalikan paging ke halaman 1.

## Filter

- Tampilkan paling banyak 3 filter langsung (status, penanggung jawab, tanggal). Sisanya di balik [Popover](./popover.md) atau [Sheet](./sheet.md) "Filter" dengan lencana jumlah ("Filter 2").
- Filter aktif tampil sebagai chip yang bisa dihapus di atas tabel; "Hapus filter" menghapus semuanya sekaligus.
- Filter berlaku lewat "Terapkan" bila ada beberapa kontrol, atau seketika untuk satu kontrol; pilih satu dan konsisten di seluruh produk.
- Filter berada di URL, sehingga daftar terfilter bisa di-bookmark dan tombol kembali memulihkannya.

```html preview title="Chip filter dan baris hasil"
<div class="ds-surface">
  <form class="ds-table-toolbar" role="search">
    <div>
      <label for="dp-q">Cari faktur</label>
      <div class="ds-search">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
        <input id="dp-q" type="search" class="input" value="okafor">
      </div>
    </div>
    <div>
      <label for="dp-st">Status</label>
      <select id="dp-st" class="select"><option>Belum dibayar</option><option>Lunas</option><option>Semua status</option></select>
    </div>
    <button type="button" class="btn">Terapkan</button>
  </form>
  <div class="ds-counts" style="padding-inline:1rem">
    <span><strong>3</strong> hasil untuk "okafor"</span>
    <span class="ds-chip">Status: Belum dibayar <button type="button" class="ds-icon-btn" aria-label="Hapus filter Status: Belum dibayar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button></span>
    <a href="#">Hapus filter</a>
  </div>
</div>
```

## Urutan

- Hanya kolom yang dibandingkan orang yang bisa diurutkan: nama, tanggal, jumlah, status. Bukan catatan atau kolom aksi.
- Header berupa tautan atau tombol di dalam `<th aria-sort>`. Klik pertama naik, kedua turun, ketiga kembali ke urutan bawaan.
- Tunjukkan arah dengan ikon panah dan `aria-sort`, tidak pernah dengan warna saja.
- Kunci urut berasal dari daftar putih tetap di server (`ListSort.Parse`); nama kolom di URL tidak pernah sampai ke query.
- Mengurutkan mempertahankan pencarian dan filter dan kembali ke halaman 1.

## Paging

- Ukuran halaman bawaan 10; tawarkan 10, 20, 50, 100 (`PageSizes.All`). Ingat pilihan per daftar.
- Pager menampilkan rentang ("1–10 dari 57 proyek") dan Sebelumnya, "Halaman 1 / 6", Berikutnya. Jangan tampilkan deretan nomor halaman untuk lebih dari 7 halaman.
- Pakai pager untuk data yang dicari; pakai "Muat lagi" atau gulir tak terbatas hanya untuk feed dan linimasa.
- Saat halaman berganti, gulir ke atas tabel agar header tetap terlihat.
- Jaga total tetap akurat; bila menghitung mahal, tulis "lebih dari 10.000" daripada angka yang salah.

## Aksi massal

- Tiap baris punya checkbox; checkbox header memilih halaman yang terlihat dan menampilkan keadaan indeterminate bila sebagian baris terpilih.
- Saat satu baris atau lebih terpilih, sebuah bar menggantikan toolbar: "3 dipilih", aksi, dan "Batalkan pilihan". Tawarkan "Pilih semua 57 hasil" hanya setelah halaman terpilih.
- Namai aksi dengan kata kerja dan objeknya ("Arsipkan 3 proyek"). Aksi massal yang merusak membuka dialog konfirmasi yang mengulang jumlahnya dan menyatakan apakah bisa dibatalkan.
- Laporkan hasil dalam toast dengan jumlahnya, dan biarkan kegagalan tetap terlihat ("2 diarsipkan, 1 gagal: PRJ-1031 masih punya faktur terbuka") dengan tautan ke baris yang gagal.

```html preview title="Bar pilihan"
<div class="ds-surface">
  <div class="ds-table-toolbar" role="toolbar" aria-label="Aksi massal">
    <p role="status"><strong>3 dipilih</strong></p>
    <div class="ds-actions">
      <button type="button" class="btn btn-sm">Arsipkan</button>
      <button type="button" class="btn btn-sm">Tetapkan penanggung jawab</button>
      <button type="button" class="btn btn-ghost btn-sm is-danger">Hapus</button>
      <button type="button" class="btn btn-ghost btn-sm">Batalkan pilihan</button>
    </div>
  </div>
</div>
```

## Kosong, memuat, dan galat

| Keadaan | Tampilkan | Lakukan |
| --- | --- | --- |
| Pertama kali | [Empty state](./empty-state.md) dengan aksi buat | Sembunyikan toolbar dan pager |
| Tanpa hasil | "Tidak ada proyek yang cocok dengan filter Anda" dan "Hapus filter" | Pertahankan toolbar agar orang bisa mengubah kata kunci |
| Memuat | Baris [Skeleton](./skeleton.md) sesuai tata letak kolom, setelah 300ms | Pertahankan header dan toolbar; tanpa spinner di seluruh halaman |
| Menyegarkan | Progres tipis di bawah toolbar, `aria-busy="true"` pada tabel | Pertahankan baris lama sampai yang baru tiba |
| Galat | [Alert](./alert.md) di atas tabel: apa yang gagal dan "Coba lagi" | Pertahankan baris terakhir yang baik bila ada, ditandai mungkin kedaluwarsa |

## Export

- Tombol export berada di sisi awal toolbar, di bawah baris hasil, dinamai sesuai format ("Export CSV", "Export Excel").
- Export apa yang dilihat pengguna: pencarian, filter, dan urutan yang sama, bukan hanya halaman saat ini. Sebut jumlah baris pada tombol atau petunjuk bila besar ("Export 1.240 baris").
- Tandai tombol sibuk dengan `data-ds-export` selama unduhan agar tidak diklik dua kali, dan konfirmasi dengan toast bila berkas dibuat di latar belakang.
- Pakai format tanggal yang sama dengan layar dan format mesin untuk angka (titik desimal, tanpa pemisah ribuan) agar bisa dibaca spreadsheet.

## Penggunaan

- Simpan keadaan cari, filter, dan urutan di URL.
- Tampilkan jumlah hasil setiap kali filter atau pencarian aktif.
- Jangan menyembunyikan toolbar saat tidak ada hasil.
- Jangan menawarkan aksi massal tanpa jumlah pilihan yang jelas.
- Jangan menampilkan spinner di atas tabel yang sudah berisi baris; tandai sibuk saja.
