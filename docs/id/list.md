---
title: List
group: components
category: data-display
order: 10
summary: Baris untuk orang, berkas, proyek atau kejadian dengan avatar atau ikon di depan, judul, teks pendukung, meta, dan aksi di belakang. Biasa, interaktif, dan bisa dipilih.
source: TPS app.css .ds-feed dan daftar .pt-card, Material 3 lists, Tailwind UI stacked lists
---

List menampilkan rangkaian pendek data sebagai baris: satu judul, teks pendukung opsional, waktu atau jumlah, dan satu aksi. Pakai untuk orang, proyek, berkas, aktivitas terbaru, dan baris pengaturan. Pakai [table](./table.md) bila baris punya beberapa kolom yang dibandingkan, [tree view](./tree-view.md) untuk data bersarang, dan [timeline](./timeline.md) bila urutan waktu adalah intinya.

## Contoh

```html preview title="List sederhana dengan avatar, meta, dan aksi"
<div class="ds-card" style="max-width:36rem">
  <ul class="ds-list">
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-avatar c0 is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title">Ayu Lestari</p>
        <p class="ds-list__text">Desainer produk, Jakarta</p>
      </div>
      <span class="ds-list__meta">Aktif sekarang</span>
      <span class="ds-list__trail"><button type="button" class="ds-icon-btn" aria-label="Aksi untuk Ayu Lestari"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button></span>
    </li>
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-avatar c1 is-round" role="img" aria-label="Daniel Okafor"><span aria-hidden="true">DO</span></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title">Daniel Okafor</p>
        <p class="ds-list__text">Insinyur backend, Lagos</p>
      </div>
      <span class="ds-list__meta">2 jam lalu</span>
      <span class="ds-list__trail"><button type="button" class="ds-icon-btn" aria-label="Aksi untuk Daniel Okafor"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button></span>
    </li>
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-avatar c5 is-round" role="img" aria-label="Mei Tanaka"><span aria-hidden="true">MT</span></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title">Mei Tanaka</p>
        <p class="ds-list__text">Kepala keuangan, Osaka</p>
      </div>
      <span class="ds-list__meta">Kemarin</span>
      <span class="ds-list__trail"><button type="button" class="ds-icon-btn" aria-label="Aksi untuk Mei Tanaka"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg></button></span>
    </li>
  </ul>
</div>
```

```html preview title="Ikon di depan, jumlah, dan pill"
<div class="ds-card" style="max-width:36rem">
  <ul class="ds-list">
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-list__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"></use></svg></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title">INV-2026-0418</p>
        <p class="ds-list__text">Kintara Studio, jatuh tempo 14 Nov 2026</p>
      </div>
      <span class="ds-list__meta"><span class="ds-num" style="display:block;color:var(--color-base-content);font-weight:650">USD 4.280,00</span><span class="ds-pill is-success">Lunas</span></span>
    </li>
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-list__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"></use></svg></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title">INV-2026-0419</p>
        <p class="ds-list__text">Marquez Logistics, jatuh tempo 21 Nov 2026</p>
      </div>
      <span class="ds-list__meta"><span class="ds-num" style="display:block;color:var(--color-base-content);font-weight:650">EUR 1.150,50</span><span class="ds-pill is-warning">Segera jatuh tempo</span></span>
    </li>
  </ul>
</div>
```

```html preview title="Baris interaktif (tautan)"
<div class="ds-card" style="max-width:36rem">
  <ul class="ds-list">
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-list__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"></use></svg></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title"><a class="ds-list__link" href="#">PRJ-1024 Peluncuran ulang situs</a></p>
        <p class="ds-list__text">12 tugas terbuka, pemilik Ayu Lestari</p>
      </div>
      <span class="ds-list__trail"><svg class="ds-icon ds-list__chevron" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></span>
    </li>
    <li class="ds-list__item" aria-current="page">
      <span class="ds-list__lead"><span class="ds-list__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"></use></svg></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title"><a class="ds-list__link" href="#" aria-current="page">PRJ-1031 Aplikasi seluler</a></p>
        <p class="ds-list__text">4 tugas terbuka, pemilik Daniel Okafor</p>
      </div>
      <span class="ds-list__trail"><svg class="ds-icon ds-list__chevron" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></span>
    </li>
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-list__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"></use></svg></span></span>
      <div class="ds-list__body">
        <p class="ds-list__title"><a class="ds-list__link" href="#">PRJ-1040 Laporan tahunan</a></p>
        <p class="ds-list__text">Draf, pemilik Mei Tanaka</p>
      </div>
      <span class="ds-list__trail"><button type="button" class="ds-icon-btn" aria-label="Arsipkan PRJ-1040"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-archive"></use></svg></button><svg class="ds-icon ds-list__chevron" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></span>
    </li>
  </ul>
</div>
```

Tautan direntangkan menutupi seluruh baris (`.ds-list__link::after`), sementara tombol di `.ds-list__trail` tetap bisa diklik. Baris yang hanya berupa tautan atau tombol juga bisa menjadi item itu sendiri: `<a class="ds-list__item" href="…">`.

```html preview title="List yang bisa dipilih: satu pilihan (listbox)"
<div class="ds-card" style="max-width:30rem">
  <ul class="ds-list" role="listbox" aria-label="Kontak penagihan" data-ds-listbox data-ds-name="contact">
    <li class="ds-list__item" role="option" data-value="ayu" aria-selected="true">
      <span class="ds-list__lead"><span class="ds-avatar c0 is-round" aria-hidden="true">AL</span></span>
      <div class="ds-list__body"><p class="ds-list__title">Ayu Lestari</p><p class="ds-list__text">ayu@kintara.example</p></div>
      <span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span>
    </li>
    <li class="ds-list__item" role="option" data-value="daniel" aria-selected="false">
      <span class="ds-list__lead"><span class="ds-avatar c1 is-round" aria-hidden="true">DO</span></span>
      <div class="ds-list__body"><p class="ds-list__title">Daniel Okafor</p><p class="ds-list__text">daniel@okafor.example</p></div>
      <span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span>
    </li>
    <li class="ds-list__item" role="option" data-value="mei" aria-selected="false" aria-disabled="true">
      <span class="ds-list__lead"><span class="ds-avatar c5 is-round" aria-hidden="true">MT</span></span>
      <div class="ds-list__body"><p class="ds-list__title">Mei Tanaka</p><p class="ds-list__text">Cuti sampai 3 Des</p></div>
      <span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span>
    </li>
    <li class="ds-list__item" role="option" data-value="sofia" aria-selected="false">
      <span class="ds-list__lead"><span class="ds-avatar c3 is-round" aria-hidden="true">SM</span></span>
      <div class="ds-list__body"><p class="ds-list__title">Sofia Marquez</p><p class="ds-list__text">sofia@marquez.example</p></div>
      <span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span>
    </li>
  </ul>
</div>
```

```html preview title="List yang bisa dipilih: beberapa pilihan (listbox dan kotak centang)"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));max-width:44rem">
  <div class="ds-card">
    <ul class="ds-list is-dense" role="listbox" aria-label="Beri tahu lewat" aria-multiselectable="true" data-ds-listbox>
      <li class="ds-list__item" role="option" data-value="mail" aria-selected="true"><div class="ds-list__body"><p class="ds-list__title">Email</p></div><span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span></li>
      <li class="ds-list__item" role="option" data-value="push" aria-selected="true"><div class="ds-list__body"><p class="ds-list__title">Notifikasi push</p></div><span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span></li>
      <li class="ds-list__item" role="option" data-value="sms" aria-selected="false"><div class="ds-list__body"><p class="ds-list__title">SMS</p></div><span class="ds-list__tick"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span></li>
    </ul>
  </div>
  <div class="ds-card">
    <ul class="ds-list is-dense" aria-label="Ringkasan mingguan pada hari">
      <li><label class="ds-list__item"><span class="ds-list__lead"><input type="checkbox" class="checkbox checkbox-sm" checked></span><div class="ds-list__body"><p class="ds-list__title">Senin</p></div></label></li>
      <li><label class="ds-list__item"><span class="ds-list__lead"><input type="checkbox" class="checkbox checkbox-sm"></span><div class="ds-list__body"><p class="ds-list__title">Rabu</p></div></label></li>
      <li><label class="ds-list__item"><span class="ds-list__lead"><input type="checkbox" class="checkbox checkbox-sm" disabled></span><div class="ds-list__body"><p class="ds-list__title">Jumat</p></div></label></li>
    </ul>
  </div>
</div>
```

```html preview title="Rapat, berbingkai, polos, dan dengan judul"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));max-width:44rem">
  <ul class="ds-list is-dense is-boxed">
    <li class="ds-list__heading" role="presentation">Berkas bersama</li>
    <li class="ds-list__item"><span class="ds-list__lead"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg></span><div class="ds-list__body"><p class="ds-list__title">Proposal v3.pdf</p></div><span class="ds-list__meta">2,4 MB</span></li>
    <li class="ds-list__item"><span class="ds-list__lead"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg></span><div class="ds-list__body"><p class="ds-list__title">Anggaran 2027.xlsx</p></div><span class="ds-list__meta">310 KB</span></li>
  </ul>
  <ul class="ds-list is-plain">
    <li class="ds-list__item"><div class="ds-list__body"><p class="ds-list__title">Sinkronisasi tiap 15 menit</p><p class="ds-list__text">Mengambil data baru dari sistem akuntansi.</p></div></li>
    <li class="ds-list__item"><div class="ds-list__body"><p class="ds-list__title">Simpan data terhapus selama 30 hari</p><p class="ds-list__text">Pulihkan dari arsip.</p></div></li>
  </ul>
</div>
```

## State

```html preview title="Terpilih, saat ini, nonaktif, memuat, dan kosong"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));max-width:56rem">
  <ul class="ds-list is-boxed" aria-label="Status item">
    <li class="ds-list__item is-selected"><div class="ds-list__body"><p class="ds-list__title">Baris terpilih</p><p class="ds-list__text">Warna tonal, tepi 3px, judul beraksen</p></div></li>
    <li class="ds-list__item" aria-current="true"><div class="ds-list__body"><p class="ds-list__title">Baris saat ini</p><p class="ds-list__text">aria-current menandai posisi Anda</p></div></li>
    <li class="ds-list__item" aria-disabled="true"><div class="ds-list__body"><p class="ds-list__title">Baris nonaktif</p><p class="ds-list__text">Diarsipkan, hanya baca</p></div></li>
  </ul>
  <ul class="ds-list is-boxed" aria-busy="true" aria-label="Memuat">
    <li class="ds-list__item is-skeleton"><span class="ds-list__lead"><span class="ds-cell-skeleton is-avatar"></span></span><div class="ds-list__body"><span class="ds-cell-skeleton" style="--ds-skeleton-w:45%"></span><span class="ds-cell-skeleton" style="--ds-skeleton-w:70%;margin-top:.5rem"></span></div></li>
    <li class="ds-list__item is-skeleton"><span class="ds-list__lead"><span class="ds-cell-skeleton is-avatar"></span></span><div class="ds-list__body"><span class="ds-cell-skeleton" style="--ds-skeleton-w:55%"></span><span class="ds-cell-skeleton" style="--ds-skeleton-w:35%;margin-top:.5rem"></span></div></li>
  </ul>
  <div class="ds-card"><p class="ds-list__empty">Belum ada anggota. Undang rekan tim untuk memulai.</p></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Baris transparan, garis pemisah 70% dari `--color-base-300` |
| Hover | Pointer di atas baris interaktif | Warna konten pada `--ds-opacity-state-hover`; chevron bergeser 2px |
| Pressed | `:active` | State layer pada `--ds-opacity-state-pressed` |
| Focus-visible | Fokus keyboard pada baris atau tautannya | Cincin `--ds-focus` 2px di dalam baris |
| Selected | `aria-selected="true"`, `.is-selected`, atau kotak yang dicentang | Warna primary pada `--ds-opacity-state-selected`, tepi primary 3px, judul beraksen; opsi juga menampilkan centang |
| Current | `aria-current` | Sama seperti selected |
| Disabled | `aria-disabled="true"` atau input nonaktif | `--ds-opacity-disabled`, `cursor: not-allowed`, tanpa hover |
| Loading | Baris `.is-skeleton` dalam `aria-busy="true"` | Batang skeleton; tinggi baris tetap |
| Empty | Tidak ada item | Teks `.ds-list__empty` dan, bila ada aksi, sebuah [empty state](./empty-state.md) |
| Long text | Judul atau teks lebih panjang dari baris | Dibungkus; `.is-clamp` pada teks membatasi 2 baris |

## Anatomi

- `.ds-list` (`ul`, atau `div` dengan `role="list"`) dengan `is-dense`, `is-boxed`, `is-plain`.
- `.ds-list__item` baris (`li`, `a`, `button`, atau `label`); `is-selected`, `is-centered`, `is-skeleton`.
- `.ds-list__lead` avatar, `.ds-list__icon` (kotak tonal), `.ds-list__thumb` (gambar), atau kotak centang.
- `.ds-list__body` dengan `.ds-list__title` dan `.ds-list__text`.
- `.ds-list__meta` waktu atau jumlah, `.ds-list__trail` aksi, `.ds-list__chevron`, `.ds-list__tick` (centang opsi).
- `.ds-list__link` tautan yang direntangkan, `.ds-list__heading` judul kelompok, `.ds-list__empty` teks kosong.
- `.ds-list-container` membuat meta turun di bawah teks saat list lebih sempit dari 22rem.

## Penggunaan

- Batasi judul pada satu baris makna (nama, kode) dan teks pendukung satu atau dua baris.
- Tampilkan satu aksi di belakang tiap baris. Aksi lain taruh di menu di balik tombol ikon `more`.
- Pakai baris 44px (bawaan) untuk layar sentuh; `is-dense` setinggi 36px dan cocok untuk alat desktop.
- Jangan menandai baris terpilih hanya dengan warna: tepi, judul yang lebih tebal, dan centang tetap terlihat di mode warna paksa.
- Jangan menaruh elemen interaktif di dalam baris tautan. Pakai pola `.ds-list__link` yang direntangkan bila baris juga butuh tombol.
- Pilih [table](./table.md) daripada list bila baris punya 3 nilai atau lebih yang dibandingkan.

## Aksesibilitas

- List biasa adalah `ul`; pemisah dekoratif tidak butuh role. List yang bisa dipilih memakai `role="listbox"` dengan baris `role="option"`, `aria-label`, dan `aria-selected`; `aria-multiselectable="true"` untuk beberapa pilihan.
- List kotak centang memakai `input type="checkbox"` asli di dalam `label` baris, sehingga seluruh baris bisa diklik dan statusnya native.
- Tombol ikon di bagian belakang butuh `aria-label` yang menyebut datanya.
- Baris setinggi minimal 44px untuk pointer kasar dan 36px selain itu (target minimal 24px selalu terpenuhi).
- Teks tetap 4,5:1 pada warna hover, terpilih, dan nonaktif.

| Tombol | Aksi |
| --- | --- |
| Tab | Pindah ke tautan, tombol, atau kotak centang berikutnya (listbox hanya satu perhentian tab) |
| Arrow Up, Arrow Down | Listbox: memindahkan fokus antaropsi |
| Home, End | Listbox: opsi pertama dan terakhir |
| Space, Enter | Listbox: memilih (membalik pilihan pada list ganda) |
| Shift+Arrow, Shift+klik | Listbox ganda: memperluas pilihan |
| Ctrl+A atau Cmd+A | Listbox ganda: memilih semua |
| Huruf | Listbox: melompat ke opsi yang diawali huruf yang Anda ketik |

## Razor

List adalah markup biasa; tidak ada tag helper. Render baris dari model Anda:

```cshtml
<ul class="ds-list">
  @foreach (var person in Model.People)
  {
    <li class="ds-list__item">
      <span class="ds-list__lead"><span class="ds-avatar @Avatar.ColorClass(person.Name) is-round" aria-hidden="true">@Avatar.Initials(person.Name)</span></span>
      <div class="ds-list__body">
        <p class="ds-list__title">@person.Name</p>
        <p class="ds-list__text">@person.Role</p>
      </div>
      <span class="ds-list__meta">@Fmt.Date(person.LastSeen)</span>
    </li>
  }
</ul>
```

## JavaScript

Hanya listbox yang memerlukan skrip (`selection.js`).

| Atribut | Efek |
| --- | --- |
| `data-ds-listbox` | Mengaktifkan fokus roving, pemilihan, dan type-ahead pada elemen `role="listbox"` |
| `data-ds-name="field"` | Menyimpan input hidden berisi nilai `data-value` terpilih agar list ikut terkirim bersama form |
| `data-ds-listbox-follow` | List tunggal: pilihan mengikuti fokus |
| `data-value` | Nilai sebuah opsi (bila kosong dipakai teksnya) |

Event `ds:listbox:change` naik dari list dengan `detail: { values, items }`.

## Token

`--ds-list-pad-y`, `--ds-list-pad-x` (diatur oleh `is-dense`), `--ds-size-target`, `--ds-radius-box`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-state-selected`, `--ds-opacity-disabled`, `--ds-border-accent`, `--ds-focus`, `--ds-subtle`.

## Native dan daisyUI

Dibangun di atas `ul`, `li`, `a`, `button`, dan `label`. daisyUI `list` dan `list-row` tidak dipakai; baris DS memiliki area lead, body, dan trail yang sama, ditambah status interaktif, terpilih, dan listbox.
