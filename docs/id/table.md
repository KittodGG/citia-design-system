---
title: Table
group: components
category: data-display
order: 11
summary: Tabel bergaris tipis untuk data dan angka, dalam tiga jenis (daftar, master, lebar) dengan caption, kepala menempel, total, kepadatan, status baris, dan kartu di ponsel.
source: TPS app.css .pt-table L3526–3550, .master-table L1503–1600, .data-table-scroll L262–314
---

Table menyejajarkan data agar orang bisa memindai dan membandingkan nilai dalam kolom. Pilih jenisnya menurut datanya: `.ds-table` untuk beberapa kolom pendek, `.ds-list-table` untuk data master dengan satu nama yang membuka detail, dan `.ds-table-scroll` untuk data transaksi lebar dengan kolom tersemat. Tambahkan pencarian, aksi massal, dan paging di sekelilingnya dengan [data table](./data-table.md). Pakai [list](./list.md) bila baris hanya punya satu nilai, dan [description list](./description-list.md) untuk satu data.

## Contoh

```html preview title="Tabel dengan caption, satuan, dan total"
<div class="ds-card">
  <div class="ds-card-body is-flush">
    <div class="ds-table-wrap">
      <table class="ds-table">
        <caption>Faktur, November 2026<small>Jumlah dalam dolar AS, termasuk pajak</small></caption>
        <thead>
          <tr><th scope="col">Faktur</th><th scope="col">Pelanggan</th><th scope="col">Terbit</th><th scope="col" class="ds-num">Jumlah</th><th scope="col">Status</th></tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Faktur"><a class="ds-link-ref" href="#">INV-2026-0418</a></td>
            <td data-label="Pelanggan"><div class="ds-cell-main"><span class="ds-avatar c0 is-round" aria-hidden="true">KS</span><div><div class="ds-cell-title">Kintara Studio</div><div class="ds-cell-sub">Ayu Lestari</div></div></div></td>
            <td data-label="Terbit" class="ds-nowrap">3 Nov 2026</td>
            <td data-label="Jumlah" class="ds-num">4.280,00<span class="ds-unit">USD</span></td>
            <td data-label="Status"><span class="ds-pill is-success">Lunas</span></td>
          </tr>
          <tr>
            <td data-label="Faktur"><a class="ds-link-ref" href="#">INV-2026-0419</a></td>
            <td data-label="Pelanggan"><div class="ds-cell-main"><span class="ds-avatar c3 is-round" aria-hidden="true">ML</span><div><div class="ds-cell-title">Marquez Logistics</div><div class="ds-cell-sub">Sofia Marquez</div></div></div></td>
            <td data-label="Terbit" class="ds-nowrap">5 Nov 2026</td>
            <td data-label="Jumlah" class="ds-num">1.150,50<span class="ds-unit">USD</span></td>
            <td data-label="Status"><span class="ds-pill is-warning">Jatuh tempo 6 hari lagi</span></td>
          </tr>
          <tr>
            <td data-label="Faktur"><a class="ds-link-ref" href="#">INV-2026-0420</a></td>
            <td data-label="Pelanggan"><div class="ds-cell-main"><span class="ds-avatar c5 is-round" aria-hidden="true">TH</span><div><div class="ds-cell-title">Tanaka Holdings</div><div class="ds-cell-sub">Mei Tanaka</div></div></div></td>
            <td data-label="Terbit" class="ds-nowrap">9 Nov 2026</td>
            <td data-label="Jumlah" class="ds-num">12.904,25<span class="ds-unit">USD</span></td>
            <td data-label="Status"><span class="ds-pill is-error">Lewat 12 hari</span></td>
          </tr>
        </tbody>
        <tfoot>
          <tr><th scope="row" colspan="3">Total, 3 faktur</th><td class="ds-num" data-label="Jumlah">18.334,75<span class="ds-unit">USD</span></td><td></td></tr>
        </tfoot>
      </table>
    </div>
  </div>
</div>
```

```html preview title="Rapat dan bergaris selang-seling"
<div class="ds-card">
  <div class="ds-card-body is-flush">
    <table class="ds-table is-compact is-striped">
      <thead><tr><th scope="col">Tugas</th><th scope="col">Pemilik</th><th scope="col" class="ds-num">Jam</th><th scope="col" class="ds-num">Anggaran terpakai</th></tr></thead>
      <tbody>
        <tr><td data-label="Tugas">Tinjauan desain</td><td data-label="Pemilik">Mei Tanaka</td><td data-label="Jam" class="ds-num">6,5<span class="ds-unit">jam</span></td><td data-label="Anggaran terpakai" class="ds-num">42<span class="ds-unit">%</span></td></tr>
        <tr><td data-label="Tugas">Kontrak API</td><td data-label="Pemilik">Daniel Okafor</td><td data-label="Jam" class="ds-num">14<span class="ds-unit">jam</span></td><td data-label="Anggaran terpakai" class="ds-num">78<span class="ds-unit">%</span></td></tr>
        <tr><td data-label="Tugas">Naskah dan terjemahan</td><td data-label="Pemilik">Sofia Marquez</td><td data-label="Jam" class="ds-num">3,25<span class="ds-unit">jam</span></td><td data-label="Anggaran terpakai" class="ds-num">12<span class="ds-unit">%</span></td></tr>
        <tr><td data-label="Tugas">Audit aksesibilitas</td><td data-label="Pemilik">Ayu Lestari</td><td data-label="Jam" class="ds-num">9<span class="ds-unit">jam</span></td><td data-label="Anggaran terpakai" class="ds-num">55<span class="ds-unit">%</span></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

```html preview title="Daftar master dengan tautan urut"
<div class="ds-card">
  <div class="ds-card-body is-flush">
    <table class="ds-list-table">
      <thead>
        <tr>
          <th scope="col" aria-sort="ascending"><a class="ds-sort" href="#" title="Urutkan turun">Proyek <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-up"></use></svg></a></th>
          <th scope="col"><a class="ds-sort" href="#" title="Urutkan naik">Pemilik <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-up-down"></use></svg></a></th>
          <th scope="col" class="ds-num"><a class="ds-sort" href="#" title="Urutkan naik">Anggaran <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-up-down"></use></svg></a></th>
          <th scope="col">Status</th>
          <th scope="col"><span class="ds-visually-hidden">Aksi</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="ds-primary-cell"><a href="#">PRJ-1024 Peluncuran ulang situs</a></td>
          <td data-label="Pemilik">Ayu Lestari</td>
          <td data-label="Anggaran" class="ds-num">48.000<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-success">Aktif</span></td>
          <td class="ds-actions-cell"><div class="ds-row-actions"><a class="btn btn-ghost btn-sm" href="#">Ubah</a></div></td>
        </tr>
        <tr>
          <td class="ds-primary-cell"><a href="#">PRJ-1031 Aplikasi seluler</a></td>
          <td data-label="Pemilik">Daniel Okafor</td>
          <td data-label="Anggaran" class="ds-num">112.500<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-neutral">Ditunda</span></td>
          <td class="ds-actions-cell"><div class="ds-row-actions"><a class="btn btn-ghost btn-sm" href="#">Ubah</a></div></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

```html preview title="Tabel lebar dengan kolom tersemat"
<div class="ds-card">
  <p class="ds-table-hint" data-ds-scroll-hint>Geser tabel untuk melihat kolom lain. Nomor faktur tetap terlihat.</p>
  <div class="ds-table-scroll" role="region" aria-label="Faktur, semua kolom" tabindex="0">
    <table data-ds-pin="1" data-ds-pin-primary="0" style="min-width:60rem">
      <thead>
        <tr><th scope="col">Faktur</th><th scope="col">Pelanggan</th><th scope="col">Proyek</th><th scope="col">Terbit</th><th scope="col">Jatuh tempo</th><th scope="col" class="ds-num">Neto</th><th scope="col" class="ds-num">Pajak</th><th scope="col" class="ds-num">Total</th><th scope="col" data-ds-pin-end>Status</th></tr>
      </thead>
      <tbody>
        <tr><td class="ds-nowrap"><a class="ds-link-ref" href="#">INV-2026-0418</a></td><td>Kintara Studio</td><td>PRJ-1024</td><td class="ds-nowrap">3 Nov 2026</td><td class="ds-nowrap">3 Des 2026</td><td class="ds-num">3.890,91</td><td class="ds-num">389,09</td><td class="ds-num">4.280,00</td><td><span class="ds-pill is-success">Lunas</span></td></tr>
        <tr><td class="ds-nowrap"><a class="ds-link-ref" href="#">INV-2026-0419</a></td><td>Marquez Logistics</td><td>PRJ-1031</td><td class="ds-nowrap">5 Nov 2026</td><td class="ds-nowrap">5 Des 2026</td><td class="ds-num">1.045,91</td><td class="ds-num">104,59</td><td class="ds-num">1.150,50</td><td><span class="ds-pill is-warning">Jatuh tempo 6 hari lagi</span></td></tr>
        <tr><td class="ds-nowrap"><a class="ds-link-ref" href="#">INV-2026-0420</a></td><td>Tanaka Holdings</td><td>PRJ-1040</td><td class="ds-nowrap">9 Nov 2026</td><td class="ds-nowrap">9 Des 2026</td><td class="ds-num">11.731,14</td><td class="ds-num">1.173,11</td><td class="ds-num">12.904,25</td><td><span class="ds-pill is-error">Lewat jatuh tempo</span></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

```html preview title="Baris yang bisa dibuka"
<div class="ds-card">
  <div class="ds-table-toolbar is-inline">
    <button type="button" class="btn btn-ghost btn-sm" data-ds-tree-all="open" aria-controls="demo-expand">Buka semua</button>
    <button type="button" class="btn btn-ghost btn-sm" data-ds-tree-all="close" aria-controls="demo-expand">Tutup semua</button>
  </div>
  <div class="ds-table-scroll" role="region" aria-label="Rincian faktur" tabindex="0">
    <table id="demo-expand">
      <thead><tr><th scope="col">Faktur dan rincian</th><th scope="col" class="ds-num">Jumlah</th><th scope="col" class="ds-num">Nilai</th></tr></thead>
      <tbody>
        <tr>
          <td class="ds-nowrap">
            <button type="button" class="btn btn-ghost btn-sm btn-square ds-tree-toggle" data-ds-tree-toggle aria-expanded="false" aria-controls="demo-expand-418" data-ds-label-expand="Tampilkan rincian INV-2026-0418" data-ds-label-collapse="Sembunyikan rincian INV-2026-0418" aria-label="Tampilkan rincian INV-2026-0418"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></button>
            <a class="ds-link-ref" href="#">INV-2026-0418</a>
          </td>
          <td class="ds-num">3</td><td class="ds-num">4.280,00<span class="ds-unit">USD</span></td>
        </tr>
      </tbody>
      <tbody id="demo-expand-418" hidden>
        <tr class="ds-tree-child"><td>Lokakarya penemuan</td><td class="ds-num">1</td><td class="ds-num">1.200,00<span class="ds-unit">USD</span></td></tr>
        <tr class="ds-tree-child"><td>Audit design system</td><td class="ds-num">1</td><td class="ds-num">2.080,00<span class="ds-unit">USD</span></td></tr>
        <tr class="ds-tree-child"><td>Sesi pelatihan</td><td class="ds-num">1</td><td class="ds-num">1.000,00<span class="ds-unit">USD</span></td></tr>
        <tr class="ds-tree-summary"><td>Total INV-2026-0418</td><td class="ds-num">3</td><td class="ds-num">4.280,00<span class="ds-unit">USD</span></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

## State

```html preview title="Baris terpilih, bertanda, redup, dan sibuk"
<div class="ds-card">
  <div class="ds-card-body is-flush">
    <table class="ds-table">
      <thead><tr><th scope="col"><span class="ds-visually-hidden">Pilih</span></th><th scope="col">Faktur</th><th scope="col">Catatan</th><th scope="col" class="ds-num">Jumlah</th></tr></thead>
      <tbody>
        <tr aria-selected="true"><td><label class="ds-pick"><input type="checkbox" class="checkbox" checked aria-label="Pilih INV-2026-0421"></label></td><td data-label="Faktur" class="ds-nowrap">INV-2026-0421</td><td data-label="Catatan">Terpilih</td><td data-label="Jumlah" class="ds-num">980,00<span class="ds-unit">USD</span></td></tr>
        <tr class="is-flagged"><td><label class="ds-pick"><input type="checkbox" class="checkbox" aria-label="Pilih INV-2026-0422"></label></td><td data-label="Faktur" class="ds-nowrap">INV-2026-0422</td><td data-label="Catatan">Bertanda: total berbeda 40,00 USD dari pesanan pembelian</td><td data-label="Jumlah" class="ds-num">2.440,00<span class="ds-unit">USD</span></td></tr>
        <tr class="is-muted"><td><label class="ds-pick"><input type="checkbox" class="checkbox" aria-label="Pilih INV-2026-0423"></label></td><td data-label="Faktur" class="ds-nowrap">INV-2026-0423</td><td data-label="Catatan">Redup: dibatalkan</td><td data-label="Jumlah" class="ds-num">310,00<span class="ds-unit">USD</span></td></tr>
        <tr aria-busy="true"><td><label class="ds-pick"><input type="checkbox" class="checkbox" disabled aria-label="Pilih INV-2026-0424"></label></td><td data-label="Faktur" class="ds-nowrap">INV-2026-0424</td><td data-label="Catatan">Sibuk: sedang dikirim ke pelanggan</td><td data-label="Jumlah" class="ds-num">1.775,00<span class="ds-unit">USD</span></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

```html preview title="Memuat, kosong, dan galat"
<div style="display:grid;gap:1rem">
  <div class="ds-card" aria-busy="true">
    <table class="ds-table">
      <thead><tr><th scope="col">Faktur</th><th scope="col">Pelanggan</th><th scope="col" class="ds-num">Jumlah</th></tr></thead>
      <tbody aria-label="Memuat faktur">
        <tr><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:6rem"></span></td><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:10rem"></span></td><td><span class="ds-cell-skeleton ds-num" style="--ds-skeleton-w:4rem"></span></td></tr>
        <tr><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:6rem"></span></td><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:8rem"></span></td><td><span class="ds-cell-skeleton ds-num" style="--ds-skeleton-w:3rem"></span></td></tr>
        <tr><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:6rem"></span></td><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:9rem"></span></td><td><span class="ds-cell-skeleton ds-num" style="--ds-skeleton-w:4rem"></span></td></tr>
      </tbody>
    </table>
  </div>
  <div class="ds-card">
    <table class="ds-table">
      <thead><tr><th scope="col">Faktur</th><th scope="col">Pelanggan</th><th scope="col" class="ds-num">Jumlah</th></tr></thead>
      <tbody>
        <tr class="ds-table-state"><td colspan="3"><div class="ds-table-state__body"><span>Tidak ada faktur yang cocok dengan "INV-2027". Hapus pencarian atau ubah filter status.</span><a class="btn btn-ghost btn-sm" href="#">Hapus filter</a></div></td></tr>
      </tbody>
    </table>
  </div>
  <div class="ds-card">
    <table class="ds-table">
      <thead><tr><th scope="col">Faktur</th><th scope="col">Pelanggan</th><th scope="col" class="ds-num">Jumlah</th></tr></thead>
      <tbody>
        <tr class="ds-table-state is-error" role="alert"><td colspan="3"><div class="ds-table-state__body"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg><span>Faktur tidak dapat dimuat (galat jaringan).</span><button type="button" class="btn btn-ghost btn-sm">Coba lagi</button></div></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Garis pemisah baris tipis 70% dari `--color-base-300`, angka tabular |
| Hover | Pointer di atas baris | Warna konten pada `--ds-opacity-state-hover` di atas permukaan baris; sel tersemat ikut |
| Focus-visible | Baris yang bisa diklik dengan `tabindex="0"`, tautan urut, scroller | Cincin `--ds-focus` 2px di dalam elemen |
| Selected | `aria-selected="true"`, `.is-selected`, atau kotak centang baris tercentang | Warna primary pada `--ds-opacity-state-selected` dan tepi primary 3px pada sel pertama |
| Flagged | `.is-flagged` | Tepi warning 3px pada sel pertama; tulis alasannya di sebuah sel |
| Error row | `data-state="error"` | Tepi error 3px |
| Muted | `.is-muted` | Sel pada `--ds-opacity-read` |
| Busy row | `aria-busy="true"` pada `tr` | Sel pada `--ds-opacity-read`, tanpa pointer event, `cursor: progress` |
| Sorted column | `aria-sort="ascending/descending"` | Teks kepala berwarna konten, panah penuh |
| Loading | Baris skeleton dalam wadah `aria-busy="true"` | Batang selebar sel asli dengan shimmer; tanpa pergeseran tata letak |
| Empty | Baris `.ds-table-state` | Satu kalimat di tengah dan paling banyak satu aksi |
| Error | `.ds-table-state.is-error` | `--ds-error-text`, ikon, tombol coba lagi, `role="alert"` |
| Scrolled | `.is-scrolled` pada scroller | Bayangan tepi pada batas kolom tersemat |
| Narrow | 640px atau kurang | Tiap baris menjadi kartu berlabel |
| Compact | `.is-compact` | Padding sel 6px × 12px, bukan 12px × 16px |

## Anatomi

- `.ds-table-wrap` scroll horizontal opsional; `.ds-table`, `.ds-list-table`, `.ds-table-scroll` (dengan `table` di dalamnya).
- `caption` (dengan `small` untuk baris kedua), `thead th`, `tbody tr`, `tfoot`.
- Modifier: `is-compact`, `is-comfortable`, `is-striped`; baris `is-selected`, `is-flagged`, `is-muted`, `is-clickable`, `ds-group-row`, `ds-detail-row`, `ds-tree-child`, `ds-tree-summary`, `ds-table-state`.
- Sel: `.ds-num`, `.ds-unit`, `.ds-nowrap`, `.ds-cell-truncate`, `.ds-cell-muted`, `.ds-cell-main`, `.ds-cell-title`, `.ds-cell-sub`, `.ds-primary-cell`, `.ds-actions-cell`, `.ds-row-actions`, `.ds-pick`, `.ds-sort`, `.ds-cell-skeleton`.

## Penggunaan

- Beri setiap tabel `caption` atau `aria-label`. Sembunyikan caption dengan `ds-visually-hidden` bila judul di dekatnya sudah menamainya.
- Rata kanan angka dengan `.ds-num` pada `th` dan `td`, taruh satuan di `.ds-unit` setelah angka, dan format dengan `Fmt.Decimal` atau `Fmt.Qty`.
- Pakai satu gaya angka per kolom. Jangan mencampur `4,280` dan `4.280,00` dalam satu tabel.
- Taruh pengenal atau nama di kolom pertama dan jaga satu baris (`.ds-nowrap`). Bungkus teks panjang; pakai `.ds-cell-truncate` (16rem) hanya dengan teks lengkap di `title`.
- Jaga tabel tetap terbaca di 640px ke bawah dengan menambah `data-label` pada setiap sel kecuali sel utama dan sel aksi.
- Jangan mengubah tabel transaksi lebar menjadi kartu. Pakai `.ds-table-scroll` dan semat pengenalnya.
- Jangan mengandalkan tepi berwarna saja untuk baris bertanda. Tulis alasannya di sebuah sel.
- Jangan menampilkan lebih dari 7 kolom di `.ds-table`. Pindahkan sisanya ke baris detail atau tabel lebar.

## Aksesibilitas

- Pakai `table`, `th scope="col"`, dan `th scope="row"` (total) yang asli. Jangan memakai grid `div` untuk data.
- Scroller berupa `role="region"` dengan `aria-label` dan `tabindex="0"` agar pengguna keyboard bisa menggulirnya; petunjuknya berupa teks, bukan hanya bayangan tepi.
- Kepala urut menyediakan `aria-sort`; tautan atau tombolnya menyebut aksi berikutnya di `title`.
- Baris terpilih mengatur `aria-selected` dan kotak centang adalah kontrolnya; tepi 3px dan warna hanya tambahan.
- Kotak centang baris dan toggle pohon punya nama yang menyebut datanya (`Pilih INV-2026-0421`).
- Wadah yang memuat memakai `aria-busy="true"`; baris kosong dan galat memakai teks biasa, baris galat dengan `role="alert"`.
- Warna paksa: tepi baris terpilih menjadi border `Highlight`; batang skeleton mendapat border.
- Gerak: membuka baris memudar dan bergeser 5px selama 160ms; menutup 140ms. Reduced motion menghapus gerakannya dan mempertahankan pudarnya.

| Tombol | Aksi |
| --- | --- |
| Tab | Berpindah ke tautan, kotak centang, dan tombol sesuai urutan baca; scroller satu perhentian |
| Tombol panah | Menggulir scroller yang fokus |
| Enter, Space | Mengaktifkan kepala urut atau toggle buka |

## Razor

Kepala urut dan pager adalah partial. Pengurutan dan paging berjalan di server, jadi query string (`sort`, `direction`, `page`, `size`, `q`) menggambarkan seluruh keadaan.

```cshtml
<table class="ds-list-table">
  <thead>
    <tr>
      <partial name="_DsSortHeader" model='new SortHeaderModel("Proyek", "name", Model.Rows.Sort)' />
      <partial name="_DsSortHeader" model='new SortHeaderModel("Anggaran", "budget", Model.Rows.Sort, Numeric: true)' />
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    @foreach (var row in Model.Rows.Rows) { <tr>…</tr> }
  </tbody>
</table>
<partial name="_DsPager" model='Model.Rows.Pager("proyek")' />
```

`ListSort.Parse(sort, direction, allowedKeys, defaultKey)` memeriksa kunci terhadap daftar yang diizinkan, `PageSizes.Normalize(size)` membatasi ukuran halaman ke 10, 20, 50, atau 100, dan `QueryUrl.With(Request, ("page", "2"))` mempertahankan query lainnya. Lihat [data table](./data-table.md) untuk pola lengkapnya.

## JavaScript

Kolom tersemat, petunjuk geser, dan baris yang bisa dibuka memakai `table.js`.

| Atribut | Efek |
| --- | --- |
| `table[data-ds-pin="N"]` | Menyematkan N kolom pertama; `data-ds-pin-primary="i"` adalah kolom yang dipertahankan bila ruang sempit |
| `th[data-ds-pin-end]` | Menyematkan kolom itu di tepi akhir |
| `[data-ds-scroll-hint]` | Petunjuk sebelum scroller; disembunyikan bila tabel tidak meluap |
| `button[data-ds-tree-toggle][aria-controls]` | Membuka atau menutup `tbody` yang dikendalikannya dan menukar `aria-label` dari `data-ds-label-expand` dan `data-ds-label-collapse` |
| `[data-ds-tree-all="open/close"][aria-controls]` | Membuka atau menutup semua toggle di dalam tabel dengan id itu |

Setelah mengubah baris atau kolom lewat skrip, kirim `new Event("ds:tableupdate")` ke scroller. Toggle mengirim `ds:table:toggle` dengan `detail: { expanded, body }`.

## Token

`--ds-type-table-head-size|weight|tracking`, `--ds-type-callout-size`, `--ds-table-pad-y`, `--ds-table-pad-x`, `--ds-table-head-pad-y`, `--ds-opacity-state-hover|selected|pressed`, `--ds-opacity-read`, `--ds-size-table-max-height`, `--ds-z-table-head`, `--ds-z-pinned`, `--ds-shadow-pinned-start|end`, `--ds-border-accent`, `--ds-duration-shimmer`.

## Native dan daisyUI

Dibangun di atas `table`. Tabel DS tidak memakai daisyUI `table`, `table-zebra`, atau `table-pin-rows`; `is-striped`, kepala yang menempel, dan kolom tersemat menggantikannya. Sel kotak centang memakai daisyUI `checkbox` di dalam `.ds-pick`.
