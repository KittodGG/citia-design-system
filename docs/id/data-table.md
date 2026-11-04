---
title: Data table
group: components
category: data-display
order: 12
summary: Tabel dengan toolbar, pencarian, chip filter, menu kolom, kepadatan, pemilihan baris dengan bilah aksi massal, pengurutan, paging, dan aksi baris. Server-side lebih dulu.
source: Halaman daftar TPS (_DsSortHeader, _DsPager, _DsPageSize), shadcn/ui Data Table, Material 3 data tables
---

Data table adalah permukaan kerja lengkap untuk sebuah koleksi: mencari data, mempersempitnya, memilih sebagian, lalu bertindak. Ia membungkus [table](./table.md) dalam `.ds-data-table` dan menambah toolbar, bilah aksi massal, dan pager. Koleksi besar tetap di server: query string memegang pencarian, filter, urutan, halaman, dan ukuran, dan setiap perubahan memuat satu halaman baru. Untuk beberapa baris dalam satu halaman, toolbar yang sama bisa memfilter di browser. Pakai [table](./table.md) biasa untuk data baca-saja, dan [list](./list.md) untuk baris bernilai tunggal.

## Contoh

```html preview title="Faktur: pencarian, chip, kolom, kepadatan, pemilihan, dan aksi baris"
<div class="ds-data-table" id="demo-invoices" data-ds-table data-ds-select data-total="24">
  <div class="ds-table-progress" aria-hidden="true"></div>
  <div class="ds-table-toolbar is-inline" role="search">
    <div class="ds-search">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
      <input type="search" class="input" aria-label="Cari faktur" placeholder="Cari faktur" data-ds-table-search autocomplete="off">
    </div>
    <div class="ds-chips" role="group" aria-label="Status" data-ds-filter-group="status">
      <button type="button" class="ds-chip" data-ds-filter-value="" aria-pressed="true">Semua</button>
      <button type="button" class="ds-chip" data-ds-filter-value="paid" aria-pressed="false">Lunas</button>
      <button type="button" class="ds-chip" data-ds-filter-value="due" aria-pressed="false">Segera jatuh tempo</button>
      <button type="button" class="ds-chip" data-ds-filter-value="overdue" aria-pressed="false">Lewat jatuh tempo</button>
      <button type="button" class="ds-chip" data-ds-filter-value="draft" aria-pressed="false">Draf</button>
    </div>
    <span class="ds-table-toolbar__spacer"></span>
    <div class="ds-table-toolbar__group">
      <details class="ds-disclosure-menu" data-ds-menu>
        <summary class="btn btn-ghost btn-sm"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-columns"></use></svg>Kolom</summary>
        <div class="ds-menu-panel">
          <div class="ds-table-columns">
            <label><input type="checkbox" class="checkbox checkbox-sm" data-ds-column="owner">Pemilik</label>
            <label><input type="checkbox" class="checkbox checkbox-sm" data-ds-column="issued">Terbit</label>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" data-ds-columns-reset>Tampilkan semua kolom</button>
        </div>
      </details>
      <div class="ds-density-toggle" role="group" aria-label="Kepadatan baris">
        <button type="button" data-ds-density-set="comfortable" aria-pressed="true" aria-label="Baris lega" title="Baris lega"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-rows"></use></svg></button>
        <button type="button" data-ds-density-set="compact" aria-pressed="false" aria-label="Baris rapat" title="Baris rapat"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-list"></use></svg></button>
      </div>
      <a class="btn btn-ghost btn-sm" href="#" data-ds-export="Excel"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg>Ekspor</a>
    </div>
  </div>
  <div class="ds-bulk-bar" data-ds-bulk inert aria-hidden="true">
    <div class="ds-bulk-bar__inner">
      <span class="ds-bulk-bar__count" data-ds-select-count role="status">Tidak ada baris dipilih</span>
      <button type="button" class="btn btn-ghost btn-sm" data-ds-select-everything hidden>Pilih semua 24 faktur</button>
      <div class="ds-bulk-bar__actions">
        <button type="button" class="btn btn-ghost btn-sm"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>Kirim pengingat</button>
        <button type="button" class="btn btn-ghost btn-sm"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg>Ekspor</button>
        <button type="button" class="btn btn-ghost btn-sm" style="color:var(--ds-error-text)"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>Hapus</button>
        <button type="button" class="btn btn-ghost btn-sm" data-ds-select-clear>Hapus pilihan</button>
      </div>
    </div>
  </div>
  <table class="ds-table">
    <caption class="ds-visually-hidden">Faktur, November 2026</caption>
    <thead>
      <tr>
        <th scope="col"><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-all aria-label="Pilih semua faktur di halaman ini"></label></th>
        <th scope="col" aria-sort="ascending"><a class="ds-sort" href="#" title="Urutkan turun">Faktur <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-up"></use></svg></a></th>
        <th scope="col">Pelanggan</th>
        <th scope="col" data-col="owner" hidden>Pemilik</th>
        <th scope="col" data-col="issued" hidden>Terbit</th>
        <th scope="col" class="ds-num"><a class="ds-sort" href="#" title="Urutkan naik">Jumlah <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-up-down"></use></svg></a></th>
        <th scope="col">Status</th>
        <th scope="col"><span class="ds-visually-hidden">Aksi</span></th>
      </tr>
    </thead>
    <tbody>
        <tr data-filter-status="paid">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0418" aria-label="Pilih INV-2026-0418"></label></td>
          <td data-label="Faktur"><a class="ds-link-ref" href="#">INV-2026-0418</a></td>
          <td data-label="Pelanggan">Kintara Studio</td>
          <td data-label="Pemilik" data-col="owner" hidden>Ayu Lestari</td>
          <td data-label="Terbit" data-col="issued" class="ds-nowrap" hidden>3 Nov 2026</td>
          <td data-label="Jumlah" class="ds-num">4.280,00<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-success">Lunas</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0418" aria-label="Aksi untuk INV-2026-0418"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0418" popover class="ds-menu" role="menu" aria-label="Aksi untuk INV-2026-0418" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">Lihat</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplikat</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Hapus</span></a></div></td>
        </tr>
        <tr data-filter-status="due">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0419" aria-label="Pilih INV-2026-0419"></label></td>
          <td data-label="Faktur"><a class="ds-link-ref" href="#">INV-2026-0419</a></td>
          <td data-label="Pelanggan">Marquez Logistics</td>
          <td data-label="Pemilik" data-col="owner" hidden>Sofia Marquez</td>
          <td data-label="Terbit" data-col="issued" class="ds-nowrap" hidden>5 Nov 2026</td>
          <td data-label="Jumlah" class="ds-num">1.150,50<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-warning">Segera jatuh tempo</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0419" aria-label="Aksi untuk INV-2026-0419"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0419" popover class="ds-menu" role="menu" aria-label="Aksi untuk INV-2026-0419" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">Lihat</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplikat</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Hapus</span></a></div></td>
        </tr>
        <tr data-filter-status="overdue">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0420" aria-label="Pilih INV-2026-0420"></label></td>
          <td data-label="Faktur"><a class="ds-link-ref" href="#">INV-2026-0420</a></td>
          <td data-label="Pelanggan">Tanaka Holdings</td>
          <td data-label="Pemilik" data-col="owner" hidden>Mei Tanaka</td>
          <td data-label="Terbit" data-col="issued" class="ds-nowrap" hidden>9 Nov 2026</td>
          <td data-label="Jumlah" class="ds-num">12.904,25<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-error">Lewat jatuh tempo</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0420" aria-label="Aksi untuk INV-2026-0420"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0420" popover class="ds-menu" role="menu" aria-label="Aksi untuk INV-2026-0420" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">Lihat</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplikat</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Hapus</span></a></div></td>
        </tr>
        <tr data-filter-status="paid">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0421" aria-label="Pilih INV-2026-0421"></label></td>
          <td data-label="Faktur"><a class="ds-link-ref" href="#">INV-2026-0421</a></td>
          <td data-label="Pelanggan">Okafor and Sons</td>
          <td data-label="Pemilik" data-col="owner" hidden>Daniel Okafor</td>
          <td data-label="Terbit" data-col="issued" class="ds-nowrap" hidden>10 Nov 2026</td>
          <td data-label="Jumlah" class="ds-num">980,00<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-success">Lunas</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0421" aria-label="Aksi untuk INV-2026-0421"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0421" popover class="ds-menu" role="menu" aria-label="Aksi untuk INV-2026-0421" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">Lihat</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplikat</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Hapus</span></a></div></td>
        </tr>
        <tr data-filter-status="draft">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0422" aria-label="Pilih INV-2026-0422"></label></td>
          <td data-label="Faktur"><a class="ds-link-ref" href="#">INV-2026-0422</a></td>
          <td data-label="Pelanggan">Lestari Coffee</td>
          <td data-label="Pemilik" data-col="owner" hidden>Ayu Lestari</td>
          <td data-label="Terbit" data-col="issued" class="ds-nowrap" hidden>12 Nov 2026</td>
          <td data-label="Jumlah" class="ds-num">2.440,00<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-neutral">Draf</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0422" aria-label="Aksi untuk INV-2026-0422"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0422" popover class="ds-menu" role="menu" aria-label="Aksi untuk INV-2026-0422" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">Lihat</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplikat</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Hapus</span></a></div></td>
        </tr>
        <tr data-filter-status="paid">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0423" aria-label="Pilih INV-2026-0423"></label></td>
          <td data-label="Faktur"><a class="ds-link-ref" href="#">INV-2026-0423</a></td>
          <td data-label="Pelanggan">Hana Kim Studio</td>
          <td data-label="Pemilik" data-col="owner" hidden>Hana Kim</td>
          <td data-label="Terbit" data-col="issued" class="ds-nowrap" hidden>14 Nov 2026</td>
          <td data-label="Jumlah" class="ds-num">310,00<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-success">Lunas</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0423" aria-label="Aksi untuk INV-2026-0423"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0423" popover class="ds-menu" role="menu" aria-label="Aksi untuk INV-2026-0423" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">Lihat</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplikat</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Hapus</span></a></div></td>
        </tr>
        <tr data-filter-status="due">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0424" aria-label="Pilih INV-2026-0424"></label></td>
          <td data-label="Faktur"><a class="ds-link-ref" href="#">INV-2026-0424</a></td>
          <td data-label="Pelanggan">Pratama Retail</td>
          <td data-label="Pemilik" data-col="owner" hidden>Rafi Pratama</td>
          <td data-label="Terbit" data-col="issued" class="ds-nowrap" hidden>16 Nov 2026</td>
          <td data-label="Jumlah" class="ds-num">1.775,00<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-warning">Segera jatuh tempo</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0424" aria-label="Aksi untuk INV-2026-0424"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0424" popover class="ds-menu" role="menu" aria-label="Aksi untuk INV-2026-0424" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">Lihat</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplikat</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Hapus</span></a></div></td>
        </tr>
        <tr data-filter-status="draft">
          <td><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-row value="INV-2026-0425" aria-label="Pilih INV-2026-0425"></label></td>
          <td data-label="Faktur"><a class="ds-link-ref" href="#">INV-2026-0425</a></td>
          <td data-label="Pelanggan">Nordlys AS</td>
          <td data-label="Pemilik" data-col="owner" hidden>Ingrid Solberg</td>
          <td data-label="Terbit" data-col="issued" class="ds-nowrap" hidden>18 Nov 2026</td>
          <td data-label="Jumlah" class="ds-num">6.120,00<span class="ds-unit">USD</span></td>
          <td data-label="Status"><span class="ds-pill is-neutral">Draf</span></td>
          <td class="ds-actions-cell"><button type="button" class="btn btn-ghost btn-sm btn-square" aria-haspopup="menu" popovertarget="dt-row-0425" aria-label="Aksi untuk INV-2026-0425"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button><div id="dt-row-0425" popover class="ds-menu" role="menu" aria-label="Aksi untuk INV-2026-0425" data-ds-align="end"><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">Lihat</span></a><a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><span class="ds-menu__text">Duplikat</span></a><a href="#" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Hapus</span></a></div></td>
        </tr>
      <tr class="ds-table-state" data-ds-table-empty hidden><td colspan="8"><div class="ds-table-state__body"><span>Tidak ada faktur yang cocok. Hapus pencarian atau pilih status lain.</span></div></td></tr>
    </tbody>
  </table>
  <footer class="ds-pager">
    <p role="status" data-ds-table-count>1–8 dari 24 faktur</p>
    <nav aria-label="Halaman daftar">
      <a class="btn btn-ghost btn-sm" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"></use></svg> Sebelumnya</a>
      <span class="ds-num">Halaman 1 / 3</span>
      <a class="btn btn-ghost btn-sm" href="#" rel="next">Berikutnya <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></a>
    </nav>
  </footer>
</div>
```

Demo ini memfilter 8 baris di browser (`data-ds-table-search`, `data-ds-filter-group`). Di aplikasi, pencarian, chip, pengurutan, dan paging berupa tautan dan form GET, seperti pada pola server-side di bawah. Pilih satu baris untuk melihat bilah aksi massal meluncur masuk; Shift+klik baris lain untuk memilih rentangnya.

```html preview title="Memuat, kosong, dan galat di dalam shell"
<div style="display:grid;gap:1rem">
  <div class="ds-data-table" aria-busy="true">
    <div class="ds-table-progress" aria-hidden="true"></div>
    <div class="ds-table-toolbar is-inline"><div class="ds-search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input type="search" class="input" aria-label="Cari proyek" placeholder="Cari proyek" disabled></div></div>
    <table class="ds-table">
      <caption class="ds-visually-hidden">Proyek, sedang memuat</caption>
      <thead><tr><th scope="col">Proyek</th><th scope="col">Pemilik</th><th scope="col" class="ds-num">Anggaran</th></tr></thead>
      <tbody>
        <tr><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:9rem"></span></td><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:7rem"></span></td><td><span class="ds-cell-skeleton ds-num" style="--ds-skeleton-w:4rem"></span></td></tr>
        <tr><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:11rem"></span></td><td><span class="ds-cell-skeleton" style="--ds-skeleton-w:6rem"></span></td><td><span class="ds-cell-skeleton ds-num" style="--ds-skeleton-w:3rem"></span></td></tr>
      </tbody>
    </table>
  </div>
  <div class="ds-data-table">
    <table class="ds-table">
      <caption class="ds-visually-hidden">Proyek</caption>
      <thead><tr><th scope="col">Proyek</th><th scope="col">Pemilik</th><th scope="col" class="ds-num">Anggaran</th></tr></thead>
      <tbody><tr class="ds-table-state"><td colspan="3"><div class="ds-empty"><span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-folder"></use></svg></span><h3>Belum ada proyek</h3><p>Proyek yang Anda buat tampil di sini bersama pemilik dan anggarannya.</p><a class="btn btn-primary btn-sm" href="#">Proyek baru</a></div></td></tr></tbody>
    </table>
  </div>
  <div class="ds-data-table">
    <table class="ds-table">
      <caption class="ds-visually-hidden">Proyek</caption>
      <thead><tr><th scope="col">Proyek</th><th scope="col">Pemilik</th><th scope="col" class="ds-num">Anggaran</th></tr></thead>
      <tbody><tr class="ds-table-state is-error" role="alert"><td colspan="3"><div class="ds-table-state__body"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg><span>Proyek tidak dapat dimuat. Periksa koneksi Anda.</span><button type="button" class="btn btn-ghost btn-sm">Coba lagi</button></div></td></tr></tbody>
    </table>
  </div>
</div>
```

```html preview title="Toolbar server-side: form GET"
<div class="ds-data-table">
  <form class="ds-table-toolbar is-inline" method="get" role="search">
    <input type="hidden" name="sort" value="issued">
    <input type="hidden" name="direction" value="desc">
    <div class="ds-search">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
      <input type="search" name="q" value="Okafor" class="input" aria-label="Cari faktur" placeholder="Cari faktur" autocomplete="off">
    </div>
    <select name="status" class="select" aria-label="Status"><option value="">Semua status</option><option value="paid" selected>Lunas</option><option value="due">Segera jatuh tempo</option></select>
    <span class="ds-table-toolbar__spacer"></span>
    <div class="ds-table-toolbar__group">
      <a class="btn btn-ghost btn-sm" href="#">Atur ulang</a>
      <label class="ds-page-size"><span>Tampilkan</span><select name="size" class="select select-sm" aria-label="Data per halaman"><option>10</option><option selected>20</option><option>50</option></select><span>data per halaman</span></label>
    </div>
  </form>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Toolbar di permukaan kartu, garis tipis di bawahnya, baris seperti pada [table](./table.md) |
| Hover, pressed, focus-visible | Baris, tautan urut, chip, tombol | Warna baris pada `--ds-opacity-state-hover`; chip dan tombol mengikuti komponennya; cincin `--ds-focus` 2px |
| Row selected | Kotak centang baris tercentang | Warna primary, tepi 3px, kotak centang header tercentang atau indeterminate |
| Header indeterminate | Sebagian baris terpilih | Garis pendek di kotak centang header |
| Bulk bar open | Satu baris atau lebih terpilih | Bilah terbuka di bawah toolbar selama 240ms (`grid-template-rows`) dengan pudar 150ms; jumlahnya diumumkan |
| Bulk bar closed | Tidak ada baris terpilih | Bilah menciut, `inert`, tersembunyi dari teknologi bantu |
| Filter chip on | `aria-pressed="true"` | Chip primary; baris tanpa nilai itu disembunyikan |
| Column hidden | Centang di menu kolom dihapus | Sel dengan `data-col` itu mendapat `hidden`; offset kolom tersemat dihitung ulang |
| Density | `data-density="comfortable/compact"` | Padding sel 12px × 16px, atau 6px × 12px |
| Loading | `aria-busy="true"` pada `.ds-data-table` | Setelah 300ms bilah progres 2px berjalan di tepi atas; tabel tetap terbaca dan tidak merespons klik |
| Empty (no data) | Tidak ada baris sama sekali | Baris `.ds-table-state` dengan [empty state](./empty-state.md) dan satu aksi |
| Empty (no match) | Filter tidak cocok dengan apa pun | Satu kalimat dan "Hapus filter"; `tr[data-ds-table-empty]` menampilkannya pada mode klien |
| Error | Pemuatan gagal | `.ds-table-state.is-error` dengan `role="alert"` dan tombol coba lagi |
| Row busy | `aria-busy="true"` pada `tr` | Sel diredupkan, baris inert |
| Row error | `data-state="error"` pada `tr` | Tepi error 3px; jelaskan di sebuah sel |
| Narrow | 640px atau kurang | Toolbar membungkus, baris menjadi kartu, kotak centang baris pindah ke sudut kartu |

## Anatomi

- Shell `.ds-data-table` dengan `data-ds-table` (kepadatan, kolom, filter klien) dan `data-ds-select` (pemilihan); `data-total` adalah jumlah data di semua halaman.
- `.ds-table-progress` bilah sibuk.
- `.ds-table-toolbar.is-inline` dengan `.ds-search`, `.ds-chips`, `.ds-table-toolbar__spacer`, `.ds-table-toolbar__group`, `.ds-table-columns`, `.ds-density-toggle`.
- `.ds-bulk-bar` dengan `.ds-bulk-bar__inner`, `.ds-bulk-bar__count`, `.ds-bulk-bar__actions`.
- Tabelnya (`.ds-table`, `.ds-list-table`, atau `.ds-table-scroll`), kepala `_DsSortHeader`, sel kotak centang `.ds-pick`, `.ds-actions-cell` dengan [dropdown menu](./dropdown-menu.md) (`popover`, sehingga tidak terpotong oleh scroll tabel) untuk aksi baris.
- `.ds-pager` (partial `_DsPager`) dan `.ds-page-size` (partial `_DsPageSize`).

## Penggunaan

- Taruh pencarian lebih dulu, lalu 1 atau 2 filter yang paling sering dipakai, dan sisanya (kolom, kepadatan, ekspor) di akhir. Lebih dari 4 filter sebaiknya masuk ke [sheet](./sheet.md) atau dialog filter.
- Batasi pemilihan pada halaman saat ini. Tawarkan "Pilih semua 24 faktur" (`data-ds-select-everything`) hanya bila server dapat bertindak atas seluruh hasil.
- Taruh 3 aksi massal yang paling umum di bilah dan aksi yang merusak terakhir, berwarna error, dengan [dialog](./alert-dialog.md) konfirmasi.
- Tampilkan jumlah data dan rentangnya ("1–8 dari 24 faktur"), jangan hanya "Halaman 1".
- Simpan urutan, halaman, dan ukuran di query string agar muat ulang, tautan yang dibagikan, dan tombol Kembali tetap bekerja.
- Jangan menaruh menu baris di `.ds-table-scroll`: wadah scroll-nya memotongnya. Pakai `.ds-table` atau `.ds-list-table`, atau satu tautan "Lihat" di kolom terakhir.
- Jangan menghapus pilihan secara diam-diam saat pengguna mencari: baris yang keluar dari hasil keluar dari pilihan, dan jumlahnya diperbarui.

## Aksesibilitas

- Shell ini bukan grid: ia adalah `table` dengan toolbar (`role="search"`) di sekelilingnya. Pemilihan memakai kotak centang asli di kolom pertama.
- Kotak centang header bernama "Pilih semua faktur di halaman ini"; kotak centang baris menyebut datanya.
- Jumlah terpilih ada di elemen `role="status"`, sehingga pembaca layar mendengar "3 dipilih" saat berubah; hasil filter diumumkan "Menampilkan 3 dari 8 baris".
- Bilah massal `inert` saat tertutup, jadi Tab melewatinya; membukanya tidak memindahkan fokus. Hapus pilihan mengembalikan fokus ke kotak centang header.
- Tautan urut menyebut aksi berikutnya di `title`; kepala yang terurut memiliki `aria-sort`.
- Kontrol kolom dan kepadatan mengumumkan hasilnya ("Kolom Pemilik disembunyikan").

| Tombol | Aksi |
| --- | --- |
| Space | Pada kotak centang baris: membaliknya. Pada baris yang fokus (`tabindex="0"`): membalik kotak centangnya |
| Shift+klik, Shift+Space | Memilih rentang dari baris yang terakhir dibalik |
| Arrow Up, Arrow Down | Berpindah antarkotak centang baris; dengan Shift, memperluas pilihan |
| Ctrl+A atau Cmd+A | Memilih semua baris yang terlihat (tidak saat mengetik di kolom isian) |
| Escape | Menghapus pilihan; mengosongkan kotak pencarian bila fokus ada di sana |
| Enter | Di kotak pencarian: mengirim form (mode server) |

## Razor

`<ds-data-table-toolbar>` merender toolbar server, `_DsSortHeader` kepalanya, `_DsPager` dan `_DsPageSize` bagian bawahnya.

```cshtml
<div class="ds-data-table" id="invoices" data-ds-table data-ds-select data-total="@Model.Rows.Total">
  <ds-data-table-toolbar search-value="@Model.Q" search-label="Cari faktur" density
      export-href="@Url.Page("Export", new { Model.Q, Model.Sort, Model.Direction })" export-kind="Excel"
      reset-href="@Url.Page("Index")" column-owner="Pemilik" column-issued="Terbit" hidden-columns="issued">
    <select name="status" class="select" aria-label="Status" data-ds-autosubmit>…</select>
    <partial name="_DsPageSize" model="Model.Rows.PageSize" />
  </ds-data-table-toolbar>

  <div class="ds-bulk-bar" data-ds-bulk inert aria-hidden="true">…</div>

  <table class="ds-table">
    <thead>
      <tr>
        <th scope="col"><label class="ds-pick"><input type="checkbox" class="checkbox" data-ds-select-all aria-label="Pilih semua"></label></th>
        <partial name="_DsSortHeader" model='new SortHeaderModel("Faktur", "number", Model.Rows.Sort)' />
        <th scope="col" data-col="owner">Pemilik</th>
        <partial name="_DsSortHeader" model='new SortHeaderModel("Jumlah", "amount", Model.Rows.Sort, Numeric: true)' />
      </tr>
    </thead>
    <tbody>@foreach (var invoice in Model.Rows.Rows) { <tr>…</tr> }</tbody>
  </table>

  <partial name="_DsPager" model='Model.Rows.Pager("faktur")' />
</div>
```

| Atribut `<ds-data-table-toolbar>` | Efek |
| --- | --- |
| `search-name`, `search-value`, `search-label`, `search-placeholder` | Kolom pencarian (nama bawaan `q`; kosong menyembunyikannya) |
| `client` | Merender `div` dan memfilter baris di halaman, bukan mengirim permintaan |
| `density`, `density-value` | Tombol baris lega dan rapat, dan mana yang ditekan |
| `export-href`, `export-label`, `export-kind` | Tautan ekspor (`data-ds-export` menampilkan toast "sedang disiapkan") |
| `reset-href` | Tautan atur ulang ke halaman tanpa filter |
| `column-<key>="Label"`, `hidden-columns="key,key"` | Menu kolom dan kolom yang awalnya tersembunyi |
| `keep` | Kunci query yang disalin ke field hidden (bawaan `sort,direction,size`; `page` dibuang, sehingga pencarian baru mulai dari halaman 1) |
| `action` | Action form (bawaan: URL saat ini) |

Isi tag (filter Anda) berada di antara kotak pencarian dan alat-alatnya.

### Pola server-side

Baca query, izinkan kunci urut lewat daftar putih, urutkan dan filter seluruh hasil, lalu potong halamannya. Partial hanya membaca nama yang sama.

```csharp
public sealed class IndexModel(AppDbContext db) : PageModel
{
    static readonly string[] SortKeys = ["number", "amount", "issued"];

    [BindProperty(SupportsGet = true)] public string? Q { get; set; }
    [BindProperty(SupportsGet = true)] public string? Status { get; set; }
    [BindProperty(SupportsGet = true)] public string? Sort { get; set; }
    [BindProperty(SupportsGet = true)] public string? Direction { get; set; }
    [BindProperty(SupportsGet = true)] public int? Size { get; set; }
    [BindProperty(SupportsGet = true, Name = "page")] public int PageNumber { get; set; } = 1;

    public ListPage<Invoice> Rows { get; private set; } = default!;

    public async Task OnGetAsync()
    {
        var sort = ListSort.Parse(Sort, Direction, SortKeys, defaultKey: "issued", defaultDescending: true);
        var size = PageSizes.Normalize(Size);

        var query = db.Invoices.AsNoTracking()
            .Where(i => Status == null || i.Status == Status)
            .Where(i => Q == null || EF.Functions.Like(i.Number, $"%{Q}%") || EF.Functions.Like(i.Customer, $"%{Q}%"));

        query = (sort.Key, sort.Descending) switch
        {
            ("amount", false) => query.OrderBy(i => i.Amount).ThenBy(i => i.Id),
            ("amount", true) => query.OrderByDescending(i => i.Amount).ThenBy(i => i.Id),
            ("number", false) => query.OrderBy(i => i.Number),
            ("number", true) => query.OrderByDescending(i => i.Number),
            (_, false) => query.OrderBy(i => i.Issued).ThenBy(i => i.Id),
            _ => query.OrderByDescending(i => i.Issued).ThenBy(i => i.Id),
        };

        var total = await query.CountAsync();
        var page = Math.Clamp(PageNumber, 1, Math.Max(1, (int)Math.Ceiling(total / (double)size)));
        var rows = await query.Skip((page - 1) * size).Take(size).ToListAsync();
        Rows = new ListPage<Invoice>(rows, Q, page, size, total, sort);
    }
}
```

`QueryUrl.With(Request, ("page", "2"))` membuat tautan di halaman yang sama dengan semua kunci lain tetap ikut. Bilah massal mengirim `value` terpilih (kotak centang) lewat form biasa ke sebuah handler; untuk "semua N" (`ds:selection:selectall`) kirim filter yang sedang aktif, bukan daftar id.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `.ds-data-table[data-ds-table]` | Mengaktifkan kepadatan, kolom, dan filter klien; `id` ditambah `data-ds-persist` mengingat kepadatan dan kolom tersembunyi per browser |
| `[data-ds-density-set="compact/comfortable"]` | Tombol kepadatan (`aria-pressed`) |
| `input[data-ds-column="key"]`, `[data-col="key"]`, `[data-ds-columns-reset]` | Visibilitas kolom |
| `input[data-ds-table-search]`, `[data-ds-table-count]`, `tr[data-ds-table-empty]` | Filter teks klien, baris jumlah, dan baris "tidak cocok" |
| `[data-ds-filter-group="key"] > [data-ds-filter-value="v"]`, `tr[data-filter-key="v"]` | Chip filter; nilai kosong berarti "semua" |
| `[data-ds-select]` | Mengaktifkan pemilihan di dalam elemen (`data-total` = semua data; `data-ds-select-click` membuat klik di ruang kosong baris membalik pilihan) |
| `thead input[data-ds-select-all]`, `tbody input[data-ds-select-row]` | Kotak centang header dan baris (`.ds-pick > input` juga bisa) |
| `[data-ds-bulk]` | Bilah massal; mendapat `data-open` dan kehilangan `inert` selama ada baris terpilih |
| `[data-ds-select-count]`, `[data-ds-select-clear]`, `[data-ds-select-everything]` | Teks jumlah (beri `role="status"`), tombol hapus, dan tombol "pilih semua N" |

Event naik dari shell: `ds:selection:change` (`detail: { count, total, values, rows }`), `ds:selection:selectall`, `ds:table:density`, `ds:table:columns` (`detail: { hidden }`), `ds:table:filter` (`detail: { shown, total, query }`), `ds:table:toggle`.

API: `DS.selection.clear(root)`, `DS.selection.selectAll(root)`, `DS.selection.values(root)`, `DS.selection.count(root)`, `DS.dataTable.setDensity(root, "compact")`.

## Token

`--ds-table-pad-y`, `--ds-table-pad-x`, `--ds-opacity-state-selected`, `--ds-opacity-state-hover`, `--ds-duration-layout`, `--ds-duration-fast`, `--ds-ease-emphasized`, `--ds-radius-card`, `--ds-space-card-x`, `--ds-z-table-head-pinned-end`, `--color-primary`.

## Native dan daisyUI

Dibangun di atas `table`, `form[method="get"]`, `input[type="search"]`, `details` (menu), dan `input[type="checkbox"]`. Memakai daisyUI `btn`, `input`, `select`, dan `checkbox`. Pola server tidak butuh JavaScript kecuali untuk bilah massal dan pemilihan; urutan, pencarian, filter, paging, dan ekspor adalah tautan dan form GET.
