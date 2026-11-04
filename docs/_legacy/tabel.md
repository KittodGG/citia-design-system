---
title: Tabel
group: Komponen
order: 8
summary: Tiga jenis tabel (daftar, master, transaksi lebar), aturan sel bersama, pengurutan, pager, toolbar, dan baris pohon, lengkap dengan contoh Razor.
source: TPS Styles/app.css L3526–3550, L3728–3738, L1503–1600, L2022–2093, L262–314; DESIGN.md bagian Tabel dan tautan, Master data operasional; Views/Shared/_SortHeader.cshtml, _Pager.cshtml
---

Satu halaman memakai satu jenis tabel. Pilih menurut isi dan lebar data, bukan menurut selera. Ketiganya berbagi aturan sel yang sama (angka, identitas, tautan), pengurutan di server, dan satu pager.

Isi tabel transaksi 14 px dan target kontrol 44 px. Teks panjang dibungkus di dalam sel; teks tidak dipotong dengan elipsis atau tooltip.

## Tiga jenis tabel {#jenis}

| Jenis | Pakai untuk | Ciri |
| --- | --- | --- |
| `.ds-table` | Daftar modern: pelanggan, pengguna, aktivitas. Beberapa kolom pendek | Kepala huruf kapital 11 px, hover tint, jadi kartu berlabel di ≤ 640 px |
| `.ds-list-table` | Data master: tangki, kapal, produk. Satu kolom nama yang membuka detail | Baris lega, kepala bisa diurutkan, jadi kartu dua kolom di ≤ 640 px |
| `.ds-table-scroll` | Tabel transaksi lebar: dokumen pemasukan, pengeluaran, rekap BL | Scroll horizontal dalam wadah, kepala menempel, kolom identitas dan status tersemat |

Jangan memaksa tabel transaksi menjadi kartu. Operator membandingkan banyak kolom sekaligus; bungkus dalam `.ds-table-scroll` dan semat identitasnya.

## Tabel daftar {#daftar}

`.ds-table` untuk daftar yang kolomnya sedikit dan pendek. Bungkus dalam `.ds-table-wrap` bila lebar bisa melebihi kartu.

```html preview title="Daftar dokumen"
<div class="ds-card">
  <div class="ds-card-body is-flush">
    <div class="ds-table-wrap">
      <table class="ds-table">
        <thead>
          <tr><th>Pelanggan</th><th>No BL</th><th>Kapal</th><th class="ds-num">Kuantitas</th><th>Status</th><th><span class="ds-visually-hidden">Aksi</span></th></tr>
        </thead>
        <tbody>
          <tr>
            <td class="ds-main-cell"><div class="ds-cell-main"><span class="ds-avatar c1" aria-hidden="true">PA</span><div><div class="ds-cell-title"><a href="#">PT Akr Corporindo</a></div><div class="ds-cell-sub">NPWP 01.234.567.8-901.000</div></div></div></td>
            <td data-label="No BL"><a class="ds-link-ref" href="#">BL-2026-00841</a></td>
            <td data-label="Kapal" class="ds-nowrap">MT Sinar Jaya</td>
            <td data-label="Kuantitas" class="ds-num">992.5<span class="ds-unit">TNE</span></td>
            <td data-label="Status"><span class="ds-pill is-success">Selesai di Bea Cukai</span></td>
            <td class="ds-actions-cell"><a class="btn btn-ghost btn-sm" href="#">Detail</a></td>
          </tr>
          <tr class="is-flagged">
            <td class="ds-main-cell"><div class="ds-cell-main"><span class="ds-avatar c1" aria-hidden="true">PW</span><div><div class="ds-cell-title"><a href="#">PT Waruna Nusa</a></div><div class="ds-cell-sub">Selisih 746 TNE dari dokumen</div></div></div></td>
            <td data-label="No BL"><a class="ds-link-ref" href="#">BL-2026-00842</a></td>
            <td data-label="Kapal" class="ds-nowrap">MT Bahari Prima</td>
            <td data-label="Kuantitas" class="ds-num">1574782<span class="ds-unit">TNE</span></td>
            <td data-label="Status"><span class="ds-pill is-warning">Hasil belum pasti</span></td>
            <td class="ds-actions-cell"><a class="btn btn-ghost btn-sm" href="#">Detail</a></td>
          </tr>
          <tr class="is-muted">
            <td class="ds-main-cell"><div class="ds-cell-main"><span class="ds-avatar c2" aria-hidden="true">PS</span><div><div class="ds-cell-title"><a href="#">PT Surya Energi</a></div></div></div></td>
            <td data-label="No BL">BL-2026-00843</td>
            <td data-label="Kapal" class="ds-nowrap">MT Citra Samudra</td>
            <td data-label="Kuantitas" class="ds-num">20.04<span class="ds-unit">TNE</span></td>
            <td data-label="Status"><span class="ds-pill is-neutral">Draft</span></td>
            <td class="ds-actions-cell"><a class="btn btn-ghost btn-sm" href="#">Lanjutkan</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

Baris ketiga belum punya halaman tujuan (draft), jadi No BL tampil sebagai teks biasa, bukan tautan.

### Varian

| Kelas | Pakai untuk |
| --- | --- |
| `.ds-table-wrap` | Pembungkus `overflow-x: auto` bila tabel bisa lebih lebar dari kartu |
| `td.ds-main-cell` | Sel identitas utama; di ≤ 640 px tidak memakai label |
| `td.ds-actions-cell` | Sel aksi: lebar 1%, rata kanan, tidak membungkus; di ≤ 640 px tanpa label dan rata kiri |
| `tr.is-flagged` | Baris bermasalah: garis 3 px warning di sisi kiri sel pertama |
| `tr.is-muted` | Baris tidak aktif atau sudah dibaca; sel turun ke `--ds-opacity-read` |
| `tr.ds-group-row` | Baris judul kelompok (huruf kapital 12 px) |

### State dan perilaku

- Hover baris memberi tint primary 4%.
- Kepala menempel (`position: sticky`) di dalam wadah scroll.
- Di ≤ 640 px kepala disembunyikan secara visual, tiap `tr` menjadi kartu, dan tiap `td` menampilkan `data-label` sebagai label 8 rem di kiri nilai. Isi `data-label` wajib untuk semua sel selain `.ds-main-cell` dan `.ds-actions-cell`.
- `.ds-num` dan sel aksi rata kiri di ponsel agar sejajar dengan labelnya.

**Token.** `--ds-type-table-head-size`, `--ds-type-table-head-weight`, `--ds-type-table-head-tracking`, `--ds-opacity-read`, `--ds-subtle`.

**Asal TPS.** `.pt-table` L3526–3550, L3728–3738.

## Tabel master {#master}

`.ds-list-table` untuk data master. Kolom pertama adalah nama yang membuka detail; kepala yang bisa diurutkan memakai `_DsSortHeader`. Baris 16 px padding dengan garis tipis antar baris.

```html preview title="Master tangki"
<div class="ds-card">
  <div class="ds-card-body is-flush">
    <table class="ds-list-table">
      <thead>
        <tr>
          <th scope="col" aria-sort="ascending"><a class="ds-sort" href="#" title="Urutkan turun">Nama <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-up"></use></svg></a></th>
          <th scope="col"><a class="ds-sort" href="#" title="Urutkan naik">Pelanggan <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-up-down"></use></svg></a></th>
          <th scope="col" class="ds-num"><a class="ds-sort" href="#" title="Urutkan naik">Kapasitas <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-up-down"></use></svg></a></th>
          <th scope="col">Status</th>
          <th scope="col"><span class="ds-visually-hidden">Aksi</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="ds-primary-cell"><a href="#">Tangki T-01</a></td>
          <td data-label="Pelanggan">PT Akr Corporindo</td>
          <td data-label="Kapasitas" class="ds-num">2000000<span class="ds-unit">TNE</span></td>
          <td data-label="Status"><span class="ds-status is-active">Aktif</span></td>
          <td class="ds-actions-cell">
            <div class="ds-row-actions">
              <a class="btn btn-ghost btn-sm" href="#">Ubah</a>
              <details class="ds-disclosure-menu" data-ds-menu>
                <summary class="btn btn-ghost btn-sm" aria-label="Pilihan lain untuk tangki T-01">Pilihan</summary>
                <div class="ds-menu-panel"><a href="#">Nonaktifkan</a><a href="#" class="is-danger">Hapus</a></div>
              </details>
            </div>
          </td>
        </tr>
        <tr>
          <td class="ds-primary-cell"><a href="#">Tangki T-02</a></td>
          <td data-label="Pelanggan">PT Waruna Nusa</td>
          <td data-label="Kapasitas" class="ds-num">1500000<span class="ds-unit">TNE</span></td>
          <td data-label="Status"><span class="ds-status is-inactive">Nonaktif</span></td>
          <td class="ds-actions-cell"><div class="ds-row-actions"><a class="btn btn-ghost btn-sm" href="#">Ubah</a></div></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### State dan perilaku

Di ≤ 900 px padding sel turun ke 14 × 10 px. Di ≤ 640 px:

- Tiap `tr` menjadi kartu dua kolom; label dari `data-label` tampil di atas nilainya (12 px, redup).
- `.ds-primary-cell` dan `.ds-actions-cell` memenuhi kedua kolom; sel aksi tanpa label.
- Kepala diganti satu baris tautan urut: hanya `th` yang memuat `<a>` yang tampil (Nama, Pelanggan, Kapasitas); `th` Status dan Aksi disembunyikan.

Nama di `.ds-primary-cell a` bergaris bawah dengan warna teks biasa (1 px, 2 px saat hover). Biru dipakai untuk tautan identitas saja.

**Asal TPS.** `.master-table` L1503–1600, L2022–2093.

## Tabel transaksi lebar {#transaksi}

`.ds-table-scroll` untuk tabel yang lebih lebar dari layar. Tabel bergulir di dalam wadahnya, halaman tidak. Kepala menempel di atas, kolom identitas tersemat di kiri, dan kolom status serta detail di kanan.

Wadah wajib `role="region"`, `aria-label`, dan `tabindex="0"` agar bisa digulir dengan keyboard. `.ds-table-hint[data-ds-scroll-hint]` berada langsung sebelum wadah dan hanya tampil saat tabel memang meluap.

```html preview title="Dokumen pemasukan"
<div class="ds-card">
  <p class="ds-table-hint" data-ds-scroll-hint>Geser tabel untuk melihat kolom lain. Identitas tetap terlihat.</p>
  <div class="ds-table-scroll" role="region" aria-label="Dokumen pemasukan" tabindex="0">
    <table data-ds-pin="2" data-ds-pin-primary="0" style="min-width:64rem">
      <thead>
        <tr>
          <th>No BL</th><th>Kapal</th><th>Pelanggan</th><th class="ds-num">Kuantitas</th><th>BC 1.1</th><th>Tanggal masuk</th><th>Gudang tujuan</th>
          <th data-ds-pin-end>Status dan respons</th><th data-ds-pin-end>Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="2" class="ds-nowrap"><a class="ds-link-ref" href="#">BL-2026-00841</a></td>
          <td class="ds-nowrap">MT Sinar Jaya</td><td>PT Akr Corporindo</td>
          <td class="ds-num">600<span class="ds-unit">TNE</span></td><td>000123 / 001</td><td>25 Jan 2026 14.30 WIB</td><td>Gudang G-01</td>
          <td><span class="ds-pill is-success">Selesai di Bea Cukai</span></td><td><a class="ds-icon-btn" href="#" aria-label="Detail pengiriman BL-2026-00841 seri 1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg></a></td>
        </tr>
        <tr>
          <td class="ds-nowrap">MT Sinar Jaya</td><td>PT Akr Corporindo</td>
          <td class="ds-num">392.5<span class="ds-unit">TNE</span></td><td>000123 / 001</td><td>26 Jan 2026 09.10 WIB</td><td>Gudang G-01</td>
          <td><span class="ds-pill is-error">Ditolak</span> 007 · Gudang tujuan tidak sesuai</td><td><a class="ds-icon-btn" href="#" aria-label="Detail pengiriman BL-2026-00841 seri 2"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg></a></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### State dan perilaku

Semua atribut dibaca `ds.js` saat halaman dimuat dan setiap kali wadah berubah ukuran.

| Atribut | Pada | Arti |
| --- | --- | --- |
| `data-ds-pin="N"` | `table` | Semat N kolom pertama di kiri. Offset dihitung dari lebar kolom yang terukur dan menghormati `rowspan`/`colspan` |
| `data-ds-pin-primary="i"` | `table` | Indeks kolom identitas (mulai 0, bawaan 0). Bila sisa lebar < 240 px, hanya kolom ini yang tersemat |
| `data-ds-pin-end` | `th` | Semat kolom ini di kanan (status, detail). Beberapa kolom menumpuk dari tepi kanan |
| `data-ds-scroll-hint` | `.ds-table-hint` | Petunjuk geser; `hidden` otomatis bila tabel tidak meluap |

Bila ruang tersisa untuk kolom yang bergulir terlalu kecil (sisa lebar < lebar kolom identitas + 120 px), penyematan kiri dilepas sama sekali (`data-pin-mode="none"` pada wadah); mode lainnya `full` dan `compact`. Penyematan kanan tetap aktif.

- Wadah mendapat `.is-scrolled` setelah digeser lebih dari 1 px; saat itu batas kolom tersemat diberi bayangan tepi.
- `.ds-table-scroll` bergulir vertikal bila tingginya melewati `--ds-size-table-max-height`, dengan kepala tetap menempel.
- Setelah mengubah baris atau kolom lewat skrip, kirim `scroller.dispatchEvent(new Event("ds:tableupdate"))` agar offset dihitung ulang. Membuka atau menutup baris pohon melakukannya sendiri.

### Aksesibilitas

- Wadah dapat difokuskan (`tabindex="0"`) dan bernama (`aria-label`); fokus tampil sebagai cincin 2 px `--ds-focus` di dalam tepi.
- Petunjuk geser memakai teks biasa, bukan hanya bayangan tepi.
- Tombol ikon di sel Detail wajib `aria-label` yang menyebut baris (nomor BL dan seri).
- Menu `<details>` di sel yang bergulir bisa terpotong wadah; di tabel transaksi pakai satu tautan Detail.

**Asal TPS.** `.data-table-scroll` L262–314; `wwwroot/js/data-table.js`.

## Isi sel {#sel}

Aturan sel berlaku di ketiga jenis tabel.

- Angka rata kanan dengan angka tabular: `.ds-num` pada `th` dan `td`; kepala ikut rata kanan. Satuan memakai `.ds-unit` (12 px, redup) tepat setelah angka, bukan bagian dari angkanya. Format dengan `Fmt.Qty`/`Fmt.Number`: `992.5`, bukan `992,5` dan bukan `1.574.782`.
- Identitas (No BL, kapal) satu baris: `.ds-nowrap`. Teks panjang (consignee, respons) dibungkus di dalam sel dan tidak pernah dipotong dengan tooltip.
- Nomor BL dan REF yang punya halaman tujuan memakai `.ds-link-ref`: biru `--ds-link`, selalu bergaris bawah, cincin fokus biru. Tanpa tujuan atau tanpa izin, tampilkan teks biasa.
- Nama rekaman di kolom pertama membuka detail: `.ds-cell-title a` (di `.ds-table`) atau `.ds-primary-cell a` (di `.ds-list-table`), bergaris bawah dengan warna teks, bukan biru.

```html preview title="Kelompok, pilihan, dan aksi baris"
<table class="ds-table">
  <thead><tr><th><span class="ds-visually-hidden">Pilih</span></th><th>No BL</th><th>Kapal</th><th class="ds-num">Kuantitas</th></tr></thead>
  <tbody>
    <tr class="ds-group-row"><td colspan="4">Januari 2026</td></tr>
    <tr>
      <td><label class="ds-pick"><input type="checkbox" class="checkbox" aria-label="Pilih BL-2026-00841"></label></td>
      <td data-label="No BL"><a class="ds-link-ref" href="#">BL-2026-00841</a></td>
      <td data-label="Kapal" class="ds-nowrap">MT Sinar Jaya</td>
      <td data-label="Kuantitas" class="ds-num">992.5<span class="ds-unit">TNE</span></td>
    </tr>
  </tbody>
</table>
```

### Varian

| Kelas | Pakai untuk |
| --- | --- |
| `.ds-num` | Sel dan kepala angka: rata kanan, tabular, tanpa pembungkusan |
| `.ds-unit` | Satuan setelah angka |
| `.ds-nowrap` | Sel identitas satu baris |
| `.ds-link-ref` | Tautan identitas (No BL, REF) |
| `.ds-cell-main` | Avatar + judul + satu baris konteks (`.ds-cell-sub`); lebar minimal 12 rem |
| `.ds-cell-title` | Judul sel; `a` di dalamnya bergaris bawah warna teks |
| `.ds-primary-cell` | Sel nama di `.ds-list-table` |
| `.ds-row-actions` | Aksi baris rata kanan, jarak 4 px; boleh memuat `details.ds-disclosure-menu[data-ds-menu]` dengan `summary.btn` |
| `.ds-pick` | Sel kotak centang: seluruh 44 × 44 px menjadi area klik, padding horizontal `td` dihapus |
| `tr.is-flagged`, `tr.is-muted`, `tr.ds-group-row` | Baris bermasalah, baris redup, judul kelompok |

> [!IMPORTANT]
> `.is-flagged` hanya garis warna. Selalu tulis alasannya di salah satu sel ("Selisih 746 TNE", "Hasil belum pasti").

## Pengurutan {#urut}

Daftar diurutkan di server lewat judul kolom. Kunci urut selalu berasal dari allowlist tetap per tabel, tidak pernah dari nama kolom di URL yang diteruskan ke query.

### State dan perilaku

- Klik pertama pada kolom mengurutkan naik, klik kedua turun, klik ketiga kembali naik. Urutan bawaan kembali lewat Reset.
- Pengurutan berjalan di server atas seluruh hasil terfilter sebelum paging. Nilai kosong selalu di akhir; id menjadi pemecah seri.
- Kolom aktif ditandai panah dan `aria-sort`. Kolom aksi, status, dan nilai yang dibaca dari XML (kolom Bea Cukai di rekap; vessel, BL, BC 1.1, dan quantity per pengiriman yang bisa berbeda dari dokumen saat ini) tidak bisa diurutkan.
- Mengganti urutan kembali ke halaman 1 dan mempertahankan pencarian, filter, dan ukuran (`QueryUrl.With` menghapus `page`).
- Reset kembali ke urutan bawaan. Export Excel mengikuti urutan terpilih.
- Kunci yang tidak ada di allowlist jatuh ke urutan bawaan dan tidak ada kolom yang ditandai.

### Razor

`ListSort.Parse(sort, direction, allowed, defaultKey, defaultDescending)` mengembalikan `ListSort(Key, Descending, Chosen)`. `Chosen` bernilai `false` bila pengguna belum memilih. Parameter query yang dipakai: `sort`, `direction` (`asc`/`desc`), `page`, `size`.

```cshtml
<partial name="_DsSortHeader" model='new SortHeaderModel("Nama", "name", Model.Rows.Sort)' />
<partial name="_DsSortHeader" model='new SortHeaderModel("Kapasitas", "capacity", Model.Rows.Sort, Numeric: true)' />
```

`Numeric: true` menambah `.ds-num` pada `th` (kepala rata kanan, panah di kiri label). `Class` menambah kelas lain. Partial menulis `<th scope="col" aria-sort>` dengan tautan `.ds-sort` yang menyebut arah berikutnya pada `title`.

## Pager dan ukuran halaman {#pager}

Satu pager untuk semua daftar: teks rentang di kiri, Sebelumnya, "Halaman n / N", Berikutnya di kanan. Pilihan ukuran halaman berada di toolbar.

```html preview title="Pager dan ukuran halaman"
<div class="ds-card">
  <div class="ds-table-toolbar">
    <label class="ds-page-size">
      <span>Tampilkan</span>
      <select class="select select-sm" aria-label="Data per halaman">
        <option>10</option><option selected>20</option><option>50</option><option>100</option>
      </select>
      <span>data per halaman</span>
    </label>
  </div>
  <footer class="ds-pager">
    <p role="status">1–20 dari 57 data</p>
    <nav aria-label="Halaman daftar">
      <a class="btn btn-ghost btn-sm" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"></use></svg> Sebelumnya</a>
      <span class="ds-num">Halaman 1 / 3</span>
      <a class="btn btn-ghost btn-sm" href="#" rel="next">Berikutnya <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></a>
    </nav>
  </footer>
</div>
```

### State dan perilaku

- `_DsPager` hanya menampilkan `nav` bila halaman lebih dari satu. Tanpa data, teksnya "0 data". Kata bendanya diganti lewat `Pager("tangki")` menjadi "1–10 dari 57 tangki".
- Tautan memakai `QueryUrl.With(Context.Request, ("page", n))`, sehingga pencarian, filter, urutan, dan ukuran ikut terbawa. Sebelumnya/Berikutnya membawa `rel="prev"`/`rel="next"`.
- Tombol di ujung rentang berupa `<a aria-disabled="true">` tanpa `href`, redup dan tidak bisa diklik.
- `_DsPageSize` menawarkan `PageSizes.All` (10, 20, 50, 100); bawaannya 10 (`PageSizes.Normalize`). Ukuran lain jatuh ke 10. `select[name=size]` memakai `data-ds-autosubmit`, jadi `ds.js` mengirim form GET induknya saat nilai berubah. Letakkan partial di dalam form filter itu.
- Mengganti ukuran, mencari, atau mengganti filter memulai halaman pertama karena form tidak membawa `page`.
- Di ≤ 640 px pager ditumpuk vertikal dan tombolnya dibagi ke dua sisi.

### Razor

```cshtml
<partial name="_DsPageSize" model="Model.Rows.PageSize" />
<partial name="_DsPager" model='Model.Rows.Pager("tangki")' />
```

## Toolbar tabel {#toolbar}

`.ds-table-toolbar` berada di atas tabel, di dalam kartu: pencarian, filter, ukuran halaman, lalu Terapkan dan Reset. Reset adalah `btn-ghost` yang menaut ke halaman tanpa query.

```html preview title="Toolbar daftar"
<div class="ds-card">
  <form class="ds-table-toolbar" method="get">
    <div class="ds-search">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
      <input type="search" name="q" class="input" aria-label="Cari dokumen" placeholder="Cari No BL, kapal, atau pelanggan">
    </div>
    <div>
      <label for="tabel-filter-status">Status</label>
      <select id="tabel-filter-status" name="status" class="select">
        <option value="">Semua status</option><option>Selesai</option><option>Ditolak</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Terapkan</button>
    <a class="btn btn-ghost" href="#">Reset</a>
  </form>
</div>
```

Label field di toolbar tampil di atas isian (13 px, tebal 600). Toolbar membungkus ke baris berikut bila sempit. Export (kiri) dan import (kanan) berada di toolbar halaman, bukan di toolbar tabel.

## Baris pohon {#pohon}

Rekap per BL adalah satu tabel pohon: satu baris per BL yang bisa dibuka, anaknya (truk) dan baris ringkasan berada di `<tbody>` terpisah yang tertutup secara bawaan. Anak lebih gelap dengan garis rail primary 4 px di sisi kiri sel pertama; baris ringkasan menutup grup dengan garis bawah 2 px.

```html preview title="Rekap per BL"
<div class="ds-card">
  <div class="ds-table-toolbar">
    <button type="button" class="btn btn-ghost btn-sm" data-ds-tree-all="open" aria-controls="tabel-rekap">Buka semua</button>
    <button type="button" class="btn btn-ghost btn-sm" data-ds-tree-all="close" aria-controls="tabel-rekap">Tutup semua</button>
  </div>
  <div class="ds-table-scroll" role="region" aria-label="Rekap per BL" tabindex="0">
    <table id="tabel-rekap">
      <thead><tr><th>No BL / truk</th><th class="ds-num">Keluar</th><th class="ds-num">Sisa</th></tr></thead>
      <tbody>
        <tr>
          <td class="ds-nowrap">
            <button type="button" class="btn btn-ghost btn-sm btn-square ds-tree-toggle" data-ds-tree-toggle aria-expanded="false" aria-controls="tabel-rekap-841" aria-label="Buka BL-2026-00841"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></button>
            <a class="ds-link-ref" href="#">BL-2026-00841</a>
          </td>
          <td class="ds-num">400.25<span class="ds-unit">TNE</span></td><td class="ds-num">592.25<span class="ds-unit">TNE</span></td>
        </tr>
      </tbody>
      <tbody id="tabel-rekap-841" hidden>
        <tr class="ds-tree-child"><td>└ Seri 1 · B 9012 XY</td><td class="ds-num">250.25<span class="ds-unit">TNE</span></td><td class="ds-num">742.25<span class="ds-unit">TNE</span></td></tr>
        <tr class="ds-tree-child"><td>└ Seri 2 · B 9140 KT</td><td class="ds-num">150<span class="ds-unit">TNE</span></td><td class="ds-num">592.25<span class="ds-unit">TNE</span></td></tr>
        <tr class="ds-tree-summary"><td>Ringkasan BL-2026-00841</td><td class="ds-num">400.25<span class="ds-unit">TNE</span></td><td class="ds-num">592.25<span class="ds-unit">TNE</span></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

### State dan perilaku

- `button[data-ds-tree-toggle]` mengubah `aria-expanded`, memberi atau mencabut `hidden` pada `<tbody>` yang ditunjuk `aria-controls`, dan menukar awal `aria-label` antara "Buka" dan "Tutup" ("Buka BL-2026-00841" menjadi "Tutup BL-2026-00841").
- Ikon chevron di dalam `.ds-tree-toggle` berputar 90° saat terbuka (`--ds-duration-fast`).
- `[data-ds-tree-all="open|close"]` dengan `aria-controls` ke id tabel membuka atau menutup semua baris di dalamnya. Tanpa `aria-controls` yang valid, ia bekerja pada seluruh halaman.
- Setiap perubahan mengirim `ds:tableupdate` ke `.ds-table-scroll` terdekat, sehingga kolom tersemat dan petunjuk geser dihitung ulang.
- Hanya baris induk yang menaut ke Rekap BL; baris truk menaut ke detail pengeluarannya.

### Aksesibilitas

- Hubungan anak ke induk disampaikan oleh `aria-expanded` dan `aria-controls`, bukan oleh garis rail; rail hanya penguat visual.
- Tombol toggle 44 px dan `aria-label` selalu menyebut BL yang dibuka.
- Teks hubungan ("└ Seri 1") tetap ada agar urutan terbaca tanpa warna.

## Contoh daftar lengkap {#contoh}

PageModel membaca query, memeriksa kunci urut dengan allowlist, mengurutkan seluruh hasil terfilter, lalu memotong halamannya. Nama properti query (`q`, `sort`, `direction`, `size`, `page`) harus sama dengan yang dipakai partial DS.

```csharp
public sealed class IndexModel(AppDbContext db) : PageModel
{
    static readonly string[] SortKeys = ["name", "customer", "capacity"];

    [BindProperty(SupportsGet = true)] public string? Q { get; set; }
    [BindProperty(SupportsGet = true)] public string? Sort { get; set; }
    [BindProperty(SupportsGet = true)] public string? Direction { get; set; }
    [BindProperty(SupportsGet = true)] public int? Size { get; set; }
    [BindProperty(Name = "page", SupportsGet = true)] public int PageNumber { get; set; } = 1;

    public ListPage<TankRow> Rows { get; private set; } = default!;

    public async Task OnGetAsync()
    {
        var sort = ListSort.Parse(Sort, Direction, SortKeys, defaultKey: "name");
        var size = PageSizes.Normalize(Size);

        var query = db.Tanks.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(Q))
            query = query.Where(t => t.Name.Contains(Q) || t.Customer!.Name.Contains(Q));

        var total = await query.CountAsync();
        var pageCount = Math.Max(1, (int)Math.Ceiling(total / (double)size));
        var page = Math.Clamp(PageNumber, 1, pageCount);

        var rows = await ApplySort(query, sort)
            .Skip((page - 1) * size).Take(size)
            .Select(t => new TankRow(t.Id, t.Name, t.Customer == null ? null : t.Customer.Name, t.Capacity, t.IsActive))
            .ToListAsync();

        Rows = new ListPage<TankRow>(rows, Q, page, size, total, sort);
    }

    // Nilai kosong selalu di akhir, id memecah seri.
    static IOrderedQueryable<Tank> ApplySort(IQueryable<Tank> q, ListSort s) => s.Key switch
    {
        "customer" => (s.Descending
                ? q.OrderBy(t => t.Customer == null).ThenByDescending(t => t.Customer!.Name)
                : q.OrderBy(t => t.Customer == null).ThenBy(t => t.Customer!.Name))
            .ThenBy(t => t.Id),
        "capacity" => (s.Descending
                ? q.OrderBy(t => t.Capacity == null).ThenByDescending(t => t.Capacity)
                : q.OrderBy(t => t.Capacity == null).ThenBy(t => t.Capacity))
            .ThenBy(t => t.Id),
        _ => (s.Descending ? q.OrderByDescending(t => t.Name) : q.OrderBy(t => t.Name)).ThenBy(t => t.Id),
    };
}

public sealed record TankRow(int Id, string Name, string? Customer, decimal? Capacity, bool IsActive);
```

Pola yang sama berlaku di `Controller`: tangkap `q`, `sort`, `direction`, `size`, `page` sebagai parameter action, lalu kirim `ListPage<T>` ke view.

### Razor

```cshtml
@page
@model IndexModel

<form method="get" class="ds-table-toolbar">
    <div class="ds-search">
        @Icon.Svg("search")
        <input type="search" name="q" value="@Model.Q" class="input" aria-label="Cari tangki" placeholder="Cari tangki atau pelanggan" />
    </div>
    <partial name="_DsPageSize" model="Model.Rows.PageSize" />
    @if (Model.Rows.Sort.Chosen)
    {
        <input type="hidden" name="sort" value="@Model.Rows.Sort.Key" />
        <input type="hidden" name="direction" value="@Model.Rows.Sort.Direction" />
    }
    <button type="submit" class="btn btn-primary">Terapkan</button>
    <a class="btn btn-ghost" asp-page="Index">Reset</a>
</form>

@if (Model.Rows.Total == 0)
{
    <ds-empty icon="tank" title="Belum ada tangki">Tidak ada tangki yang cocok dengan pencarian.</ds-empty>
}
else
{
    <table class="ds-list-table">
        <thead>
            <tr>
                <partial name="_DsSortHeader" model='new SortHeaderModel("Nama", "name", Model.Rows.Sort)' />
                <partial name="_DsSortHeader" model='new SortHeaderModel("Pelanggan", "customer", Model.Rows.Sort)' />
                <partial name="_DsSortHeader" model='new SortHeaderModel("Kapasitas", "capacity", Model.Rows.Sort, Numeric: true)' />
                <th scope="col">Status</th>
                <th scope="col"><span class="ds-visually-hidden">Aksi</span></th>
            </tr>
        </thead>
        <tbody>
            @foreach (var t in Model.Rows.Rows)
            {
                <tr>
                    <td class="ds-primary-cell"><a asp-page="Detail" asp-route-id="@t.Id">@t.Name</a></td>
                    <td data-label="Pelanggan">@Fmt.Text(t.Customer)</td>
                    <td data-label="Kapasitas" class="ds-num">@Fmt.Number(t.Capacity)<span class="ds-unit">TNE</span></td>
                    <td data-label="Status"><span class="ds-status @(t.IsActive ? "is-active" : "is-inactive")">@(t.IsActive ? "Aktif" : "Nonaktif")</span></td>
                    <td class="ds-actions-cell"><div class="ds-row-actions"><a class="btn btn-ghost btn-sm" asp-page="Edit" asp-route-id="@t.Id">Ubah</a></div></td>
                </tr>
            }
        </tbody>
    </table>
    <partial name="_DsPager" model='Model.Rows.Pager("tangki")' />
}
```

Bungkus toolbar, tabel, dan pager dalam satu `.ds-card` dengan `.ds-card-body.is-flush` bila halaman memakai kartu. Pager berada di dalam kartu yang sama, tepat di bawah tabel.
