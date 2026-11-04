---
title: Tree view
group: components
category: data-display
order: 14
summary: Pohon ARIA untuk data bersarang seperti berkas, kategori, dan izin, dengan buka-tutup beranimasi, pemilihan, kotak centang tri-state, dan pemuatan malas.
source: Pola tree WAI-ARIA Authoring Practices, resep tree shadcn/ui, Material 3 navigation lists
---

Tree view menampilkan hierarki: folder dan berkas, kategori dan subkategori, peran dan izin. Pengguna membuka dan menutup cabang, bergerak dengan tombol panah, dan bila perlu memilih satu atau beberapa item atau mencentang kotak. Pakai bila kedalamannya nyata dan orang menjelajahinya. Pakai [navigasi](./sidebar.md) untuk struktur situs, [accordion](./accordion.md) untuk beberapa bagian isi, [list](./list.md) untuk data datar, dan [baris tabel yang bisa dibuka](./table.md) bila tiap simpul punya beberapa kolom.

## Contoh

```html preview title="Pohon berkas, pilihan tunggal"
<ul class="ds-tree" role="tree" aria-label="Berkas proyek PRJ-1024" data-ds-tree>
  <li class="ds-tree__item" role="treeitem" aria-expanded="true" data-value="design">
    <div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="folder" data-ds-icon-open="folder-open"></span><span class="ds-tree__label">Desain</span><span class="ds-tree__meta">2</span></div>
    <ul class="ds-tree__group" role="group">
      <li class="ds-tree__item" role="treeitem" aria-selected="true" data-value="design/brand-guide.pdf"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file-pdf"></span><span class="ds-tree__label">Panduan merek.pdf</span></div></li>
      <li class="ds-tree__item" role="treeitem" data-value="design/wireframes.fig"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file"></span><span class="ds-tree__label">Wireframes.fig</span></div></li>
    </ul>
  </li>
  <li class="ds-tree__item" role="treeitem" aria-expanded="false" data-value="finance">
    <div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="folder" data-ds-icon-open="folder-open"></span><span class="ds-tree__label">Keuangan</span><span class="ds-tree__meta">3</span></div>
    <ul class="ds-tree__group" role="group">
      <li class="ds-tree__item" role="treeitem" data-value="finance/budget-2027.xlsx"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file-xls"></span><span class="ds-tree__label">Anggaran 2027.xlsx</span></div></li>
      <li class="ds-tree__item" role="treeitem" data-value="finance/inv-0418.pdf"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file-pdf"></span><span class="ds-tree__label">INV-2026-0418.pdf</span></div></li>
      <li class="ds-tree__item" role="treeitem" aria-expanded="false" data-value="finance/archive">
        <div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="folder" data-ds-icon-open="folder-open"></span><span class="ds-tree__label">Arsip 2025</span><span class="ds-tree__meta">1</span></div>
        <ul class="ds-tree__group" role="group">
          <li class="ds-tree__item" role="treeitem" data-value="finance/archive/q4.xlsx"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file-xls"></span><span class="ds-tree__label">Ringkasan Q4.xlsx</span></div></li>
        </ul>
      </li>
    </ul>
  </li>
  <li class="ds-tree__item" role="treeitem" data-value="notes"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file-text"></span><span class="ds-tree__label">Catatan rapat.txt</span></div></li>
  <li class="ds-tree__item" role="treeitem" aria-disabled="true" data-value="legal"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="lock"></span><span class="ds-tree__label">Hukum (tanpa akses)</span></div></li>
</ul>
```

```html preview title="Kotak centang dengan induk tri-state"
<ul class="ds-tree" role="tree" aria-label="Izin peran" data-ds-tree data-ds-tree-checkable data-ds-name="permission">
  <li class="ds-tree__item" role="treeitem" aria-expanded="true" data-value="invoices">
    <div class="ds-tree__row"><span class="ds-tree__label">Faktur</span></div>
    <ul class="ds-tree__group" role="group">
      <li class="ds-tree__item" role="treeitem" aria-checked="true" data-value="invoices.view"><div class="ds-tree__row"><span class="ds-tree__label">Lihat</span></div></li>
      <li class="ds-tree__item" role="treeitem" aria-checked="true" data-value="invoices.create"><div class="ds-tree__row"><span class="ds-tree__label">Buat</span></div></li>
      <li class="ds-tree__item" role="treeitem" aria-checked="false" data-value="invoices.approve"><div class="ds-tree__row"><span class="ds-tree__label">Setujui</span></div></li>
    </ul>
  </li>
  <li class="ds-tree__item" role="treeitem" aria-expanded="true" data-value="projects">
    <div class="ds-tree__row"><span class="ds-tree__label">Proyek</span></div>
    <ul class="ds-tree__group" role="group">
      <li class="ds-tree__item" role="treeitem" aria-checked="false" data-value="projects.view"><div class="ds-tree__row"><span class="ds-tree__label">Lihat</span></div></li>
      <li class="ds-tree__item" role="treeitem" aria-checked="false" data-value="projects.edit"><div class="ds-tree__row"><span class="ds-tree__label">Ubah</span></div></li>
    </ul>
  </li>
</ul>
```

```html preview title="Pilihan ganda dan pemuatan malas"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));max-width:44rem">
  <ul class="ds-tree is-dense" role="tree" aria-label="Wilayah pelanggan" data-ds-tree data-ds-tree-select="multiple">
    <li class="ds-tree__item" role="treeitem" aria-expanded="true">
      <div class="ds-tree__row"><span class="ds-tree__label">Asia</span></div>
      <ul class="ds-tree__group" role="group">
        <li class="ds-tree__item" role="treeitem" aria-selected="true"><div class="ds-tree__row"><span class="ds-tree__label">Indonesia</span><span class="ds-tree__meta">128</span></div></li>
        <li class="ds-tree__item" role="treeitem" aria-selected="true"><div class="ds-tree__row"><span class="ds-tree__label">Jepang</span><span class="ds-tree__meta">41</span></div></li>
        <li class="ds-tree__item" role="treeitem"><div class="ds-tree__row"><span class="ds-tree__label">Singapura</span><span class="ds-tree__meta">57</span></div></li>
      </ul>
    </li>
    <li class="ds-tree__item" role="treeitem" aria-expanded="false">
      <div class="ds-tree__row"><span class="ds-tree__label">Eropa</span></div>
      <ul class="ds-tree__group" role="group">
        <li class="ds-tree__item" role="treeitem"><div class="ds-tree__row"><span class="ds-tree__label">Norwegia</span><span class="ds-tree__meta">19</span></div></li>
        <li class="ds-tree__item" role="treeitem"><div class="ds-tree__row"><span class="ds-tree__label">Spanyol</span><span class="ds-tree__meta">33</span></div></li>
      </ul>
    </li>
  </ul>

  <ul class="ds-tree" role="tree" aria-label="Pelanggan, dimuat sesuai permintaan" data-ds-tree>
    <li class="ds-tree__item" role="treeitem" aria-expanded="false" data-ds-tree-src="#demo-tree-latam" data-ds-tree-delay="900">
      <div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="folder" data-ds-icon-open="folder-open"></span><span class="ds-tree__label">Amerika Latin</span></div>
    </li>
    <li class="ds-tree__item" role="treeitem" aria-expanded="false" data-ds-tree-src="#demo-tree-missing" data-ds-tree-delay="600">
      <div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="folder" data-ds-icon-open="folder-open"></span><span class="ds-tree__label">Afrika (gagal)</span></div>
    </li>
  </ul>
</div>
<template id="demo-tree-latam">
  <li role="treeitem"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file"></span><span class="ds-tree__label">Marquez Logistics, Meksiko</span></div></li>
  <li role="treeitem"><div class="ds-tree__row"><span class="ds-tree__icon" data-ds-icon="file"></span><span class="ds-tree__label">Costa Verde SA, Cile</span></div></li>
</template>
```

Buka "Amerika Latin": baris menampilkan spinner selama 900ms (demo mensimulasikan jeda dengan `data-ds-tree-delay`), lalu anak-anaknya terbuka. "Afrika (gagal)" menunjuk ke template yang tidak ada, sehingga menampilkan status gagal dan menawarkan "Coba lagi".

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Baris 36px, indentasi 20px per tingkat, chevron, ikon, label, meta opsional |
| Hover | Pointer di atas baris | State layer `--ds-opacity-state-hover` pada baris |
| Pressed | `:active` | State layer `--ds-opacity-state-pressed` |
| Focus-visible | Treeitem punya fokus | Cincin `--ds-focus` 2px di dalam baris (bukan mengelilingi anak-anaknya) |
| Expanded, collapsed | `aria-expanded="true/false"` | Chevron berputar 90° (150ms); grup terbuka dalam 240ms (tinggi dan pudar 160ms) dan menutup dalam 140ms |
| Selected | `aria-selected="true"` | Warna primary, tepi primary 3px, label beraksen, bobot lebih tebal |
| Checked, unchecked, mixed | `aria-checked="true/false/mixed"` | Kotak terisi dengan centang atau garis pendek; induk mengikuti anak-anaknya |
| Disabled | `aria-disabled="true"` | `--ds-opacity-disabled`, `cursor: not-allowed`, dilewati tombol panah |
| Loading | `aria-busy="true"` | Spinner menggantikan chevron; live region mengatakan "Memuat Amerika Latin" |
| Load failed | `data-state="error"` | "Coba lagi" berwarna error di slot meta; cabang tetap tertutup |
| Empty branch | Dimuat tanpa anak | Catatan senyap "Nama kosong" |
| Long label | Lebih lebar dari baris | Elipsis; teks lengkap tersedia lewat label (isi `title`) |

## Anatomi

- `ul.ds-tree[role="tree"][data-ds-tree]` dengan `is-dense`; `ul.ds-tree__group[role="group"]` bersarang.
- `li.ds-tree__item[role="treeitem"]` (fokus berada di sini) dengan `aria-expanded` pada cabang, `aria-selected` atau `aria-checked`, `aria-disabled`, `data-value`.
- `.ds-tree__row` (area klik), `.ds-tree__toggle` (chevron, ditambah skrip), `.ds-tree__check` (ditambah skrip bila bisa dicentang), `.ds-tree__icon`, `.ds-tree__label`, `.ds-tree__meta`, `.ds-tree__note`.
- Tingkat berasal dari pembersarangan, sampai 8 tingkat.

## Penggunaan

- Jaga label tetap pendek dan unik dalam satu cabang. Taruh jumlah atau ukuran di `.ds-tree__meta`.
- Pakai `data-ds-tree-select="single"` (bawaan) untuk memilih satu item, `multiple` untuk beberapa, dan `data-ds-tree-checkable` untuk pengaturan seperti izin. Jangan menggabungkan pemilihan dan kotak centang dalam satu pohon.
- Muat cabang besar secara malas (`data-ds-tree-src`) dan kembalikan paling banyak sekitar 200 anak; sediakan pencarian di atas pohon bila lebih dari itu.
- Buka cabang yang berisi item saat ini dan biarkan sisanya tertutup.
- Jangan membersarang lebih dari 5 tingkat; 8 adalah batas keras gaya indentasi.
- Jangan memakai pohon untuk navigasi halaman. Tautan di dalam baris bisa dipakai (Enter mengikutinya), tetapi navigasi situs ada di [sidebar](./sidebar.md).

## Aksesibilitas

- Mengikuti pola tree WAI-ARIA: `role="tree"`, `treeitem`, `group`, `aria-level`, `aria-setsize`, `aria-posinset` (diatur skrip), satu perhentian tab (`tabindex` roving), `aria-multiselectable` untuk pilihan ganda.
- Beri pohon sebuah `aria-label`. Kotak centang memakai `aria-checked` pada treeitem (`mixed` untuk induk yang sebagian tercentang); kotak yang digambar berupa `aria-hidden`.
- Pembukaan, pemuatan, kegagalan muat, dan jumlah item tercentang diumumkan lewat live region polite.
- Baris terpilih punya tepi dan label lebih tebal, dan kotak tercentang membawa glyph, jadi status tidak hanya warna. Warna paksa memakai `Highlight`.
- Baris setinggi 44px untuk pointer kasar.
- Reduced motion menghapus animasi tinggi; pudarnya tetap pada 140ms atau kurang.

| Tombol | Aksi |
| --- | --- |
| Arrow Down, Arrow Up | Pindah ke item terlihat berikutnya dan sebelumnya |
| Arrow Right | Cabang tertutup: membukanya. Cabang terbuka: pindah ke anak pertama |
| Arrow Left | Cabang terbuka: menutupnya. Selain itu pindah ke induk |
| Home, End | Item terlihat pertama dan terakhir |
| `*` | Membuka semua saudara yang tertutup di tingkat saat ini |
| Enter | Mengikuti tautan di baris, atau memilih (atau membalik centang; pada pohon tanpa pemilihan, membuka/menutup cabang); mengulang pemuatan yang gagal |
| Space | Memilih, atau membalik pilihan pada pohon ganda, atau membalik centang |
| Ctrl+A atau Cmd+A | Pohon ganda: memilih semua item yang terlihat |
| Huruf | Melompat ke item terlihat berikutnya yang labelnya diawali huruf yang diketik |
| Klik, klik ganda | Klik memilih atau membalik; klik ganda membuka/menutup cabang; chevron selalu membuka/menutup |

## Razor

Tidak ada tag helper; render simpulnya secara rekursif dengan partial atau fungsi lokal.

```cshtml
@functions {
  IHtmlContent Node(FolderNode node) => ... // merender li.ds-tree__item dan, untuk folder, ul bersarang
}
<ul class="ds-tree" role="tree" aria-label="@Model.Title" data-ds-tree data-ds-name="folder">
  @foreach (var node in Model.Roots) { @Node(node) }
</ul>
```

Untuk cabang malas, render `data-ds-tree-src="@Url.Page("Children", new { id = node.Id })"`; handler hanya mengembalikan item `<li role="treeitem">` milik cabang itu, sebagai HTML.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-tree` | Mengaktifkan pohon (membuat toggle, kotak centang, ikon, dan posisi ARIA) |
| `data-ds-tree-select="single/multiple/none"` | Mode pemilihan (bawaan single) |
| `data-ds-tree-checkable` | Kotak centang dengan perambatan tri-state |
| `data-ds-name="field"` | Input hidden menyimpan nilai `data-value` terpilih atau tercentang untuk form |
| `data-ds-tree-src="/url"` atau `"#template-id"` | Anak malas, diambil sebagai HTML atau disalin dari `template` |
| `data-ds-tree-delay="ms"` | Menambah jeda pada pemuatan, untuk demo |
| `data-ds-icon`, `data-ds-icon-open` | Nama ikon; yang terbuka tampil saat cabang dibuka |

Event naik dari pohon: `ds:tree:toggle` (`{ item, expanded }`), `ds:tree:select` (`{ item, items, values }`), `ds:tree:check` (`{ item, checked, values }`), `ds:tree:activate`, `ds:tree:load` (bisa dibatalkan; panggil `event.detail.load(nodes)` atau `.fail()` untuk memuat anak sendiri), `ds:tree:loaded`, `ds:tree:error`.

API: `DS.tree.load(item, nodes)`, `DS.tree.fail(item)`, `DS.tree.setExpanded(item, true)`, `DS.tree.expandAll(tree)`, `DS.tree.collapseAll(tree)`.

## Token

`--ds-tree-indent`, `--ds-tree-row`, `--ds-opacity-state-hover|pressed|selected|disabled`, `--ds-duration-layout`, `--ds-duration-quick`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-control-border`, `--color-primary`, `--ds-border-accent`, `--ds-focus`.

## Native dan daisyUI

Dibangun di atas `ul` dan `li` dengan role ARIA; tidak ada elemen tree native. daisyUI `menu` dengan `details` bersarang adalah menu navigasi, bukan tree, dan tidak menyediakan fokus roving, pemilihan, atau perilaku tri-state. Tree DS tidak memakainya.
