---
title: Navigasi
group: Komponen
order: 9
summary: Sidebar dua tingkat dengan rail ikon, drawer ponsel, top bar, aturan tombol kembali, serta tab, kontrol bersegmen, chip, breadcrumb, langkah, dan disclosure.
source: TPS Styles/app.css L444–553, L2854–3042, L3639–3642, L708–760, L3515–3524, L1391–1403, L52–57, L3502–3504; DESIGN.md bagian Sidebar, Master data operasional; Views/Shared/_Layout.cshtml
---

Navigasi dibagi dua lapis. Cangkang aplikasi (sidebar, drawer, top bar) menjawab "aplikasi apa dan di mana"; kontrol dalam halaman (tab, segmen, chip, breadcrumb, langkah, disclosure) menjawab "bagian mana dari halaman ini".

Perilaku cangkang digerakkan `ds.js` lewat atribut `data-ds-*`. Kunci penyimpanan memakai awalan `<prefix>` dari `data-ds-storage` pada `<html>` (`HeadOptions.Storage`, bawaan `ds`).

## Sidebar {#sidebar}

Sidebar berlatar `--color-secondary` (teal), lebar 16 rem. Dua tingkat dibedakan oleh jenis kontrol, bukan hanya ukuran: **grup adalah tombol** dengan chevron dan `aria-expanded`, **item adalah tautan** dengan ikon. Induk tidak pernah bisa salah dibaca sebagai anak.

```html preview title="Sidebar (dipaksa tampil statis)"
<aside class="ds-sidebar" style="position:relative;inset:auto;z-index:auto;transform:none;visibility:visible;width:16rem;height:auto">
  <div class="ds-sidebar-head">
    <a class="ds-brand" href="#"><span class="ds-brand-mark"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-ship"></use></svg></span><span class="ds-brand-name">TPS Integration</span></a>
  </div>
  <nav class="ds-sidebar-nav" aria-label="Navigasi utama" data-ds-nav-scroll>
    <ul class="ds-nav-list">
      <li><a class="ds-nav-link" href="#" aria-label="Dashboard" title="Dashboard"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-dashboard"></use></svg><span>Dashboard</span></a></li>
      <li>
        <button type="button" id="navigasi-ops-toggle" class="ds-nav-group-toggle" aria-expanded="true" aria-controls="navigasi-ops-panel" data-ds-nav-group="navigasi-ops" data-ds-nav-active="true"><span>Operasional</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></button>
        <ul id="navigasi-ops-panel" class="ds-nav-sub">
          <li><a class="ds-nav-link" href="#" aria-current="page" aria-label="Posting ke BC" title="Posting ke BC"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg><span>Posting ke BC</span></a></li>
          <li><a class="ds-nav-link" href="#" aria-label="Riwayat Pengiriman" title="Riwayat Pengiriman"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-history"></use></svg><span>Riwayat Pengiriman</span></a></li>
        </ul>
      </li>
      <li>
        <button type="button" id="navigasi-master-toggle" class="ds-nav-group-toggle" aria-expanded="false" aria-controls="navigasi-master-panel" data-ds-nav-group="navigasi-master" data-ds-nav-active="false"><span>Data Master</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></button>
        <ul id="navigasi-master-panel" class="ds-nav-sub" hidden>
          <li><a class="ds-nav-link" href="#" aria-label="Tangki / Silo" title="Tangki / Silo"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-tank"></use></svg><span>Tangki / Silo</span></a></li>
          <li><a class="ds-nav-link" href="#" aria-label="Kapal" title="Kapal"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-ship"></use></svg><span>Kapal</span></a></li>
        </ul>
      </li>
      <li><a class="ds-nav-link" href="#" aria-label="Status akses" title="Status akses"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-clock"></use></svg><span>Status akses</span></a></li>
    </ul>
  </nav>
  <div class="ds-sidebar-mode"><span class="ds-mode-badge" data-mode="live">Live</span></div>
  <div class="ds-sidebar-footer"><span class="ds-brand-name">CITIA</span></div>
</aside>
```

### Varian

| Bagian | Peran |
| --- | --- |
| `.ds-sidebar-head` | Baris atas: `.ds-brand` (`.ds-brand-mark` + `.ds-brand-name`) dan tombol ringkas |
| `.ds-sidebar-collapse[data-ds-sidebar-collapse]` | Tombol ringkas 44 px berbingkai, hanya tampil di ≥ 1024 px |
| `.ds-sidebar-nav[data-ds-nav-scroll]` | Satu-satunya bagian yang bergulir |
| `button.ds-nav-group-toggle[data-ds-nav-group]` | Kepala grup: `aria-expanded`, `aria-controls`, chevron di kanan |
| `ul.ds-nav-sub` | Anak grup, maju 8 px dengan rail tipis di kiri |
| `a.ds-nav-link` | Item: tinggi 44 px, ikon 18 px, jarak 10 px |
| `.ds-sidebar-mode` + `.ds-mode-badge` | Badge mode lingkungan (Live berisi, Simulator/Demo berupa garis tepi) |
| `.ds-sidebar-footer` | Logo CITIA di tengah, di bawah garis tipis |

### State dan perilaku

- **Ringkas.** Di ≥ 1024 px tombol `data-ds-sidebar-collapse` mengubah sidebar menjadi rail ikon selebar 4.75 rem (`html[data-ds-sidebar-collapsed="true"]`). Pilihan disimpan di `localStorage` `<prefix>-sidebar-collapsed` dan dipulihkan oleh `_DsHead` sebelum paint. Label tombol bergantian antara "Ringkas sidebar" dan "Perluas sidebar" (`aria-label`, `title`, `aria-expanded`). Di rail, merek dan kepala grup disembunyikan, semua panel grup tampil, rail anak dan penanda aktif hilang, logo footer mengecil ke 2.5 rem. Elemen bertanda `[data-ds-full]` disembunyikan di rail dan `[data-ds-short]` hanya tampil di rail.
- **Gulir.** Merek dan footer tidak bergulir; hanya `.ds-sidebar-nav`. Posisinya disimpan di `sessionStorage` `<prefix>-nav-scroll`, dipulihkan setelah font dan logo selesai dimuat. Tidak ada gulir otomatis ke item aktif; `overflow-anchor: none` dan `scrollbar-gutter: stable` menahan reflow.
- **Grup.** Grup yang memuat halaman aktif (`data-ds-nav-active="true"`) dipaksa terbuka. Di halaman lain, pilihan terakhir operator dipakai (`localStorage` `<prefix>-nav-groups`, per `data-ds-nav-group`), lalu nilai `aria-expanded` di markup. Buka dan tutup beranimasi 200 ms dari tinggi panel saat itu, sehingga klik kedua yang cepat membalik arah dengan mulus. Panel tertutup memakai `hidden` dan `inert`. Di bawah `prefers-reduced-motion: reduce` panel langsung berganti.
- **Item.** Hover hanya mengganti latar (`--ds-pill-hover`); baris tidak pernah bergeser agar target klik tetap di bawah kursor. `aria-current="page"` memberi pill lebih gelap (`--ds-pill-active`), bobot 600, dan, untuk item di dalam grup, garis aksen 2 px (`--color-accent`) pada rail.
- **Data Master** tertutup secara bawaan (`DefaultOpen: false`) karena jarang dipakai dan memakan ruang terbesar.

### Aksesibilitas

- Setiap item punya ikon unik dan `aria-label` serta `title` berisi labelnya, sehingga di rail ikon tetap punya nama.
- Kepala grup 11 px, bobot 700, huruf kapital, `letter-spacing` .08em, warna 90% putih di atas teal agar tetap ≥ 4.5:1 (`--ds-group-fg`). Tingginya 44 px, sama dengan item.
- `<nav>` berlabel (`NavModel.Label`, bawaan "Navigasi utama"). Fokus berupa cincin 2 px berwarna `--color-secondary-content`, di dalam tepi.
- Jangan menambah tingkat ketiga. Dua tingkat sudah cukup untuk 9 layar master.

### Razor

Bangun `NavModel` sekali di partial aplikasi, lalu serahkan ke `_DsSidebarNav`. `NavActive.Matches(HttpContext, href, exact)` mencocokkan jalur persis atau turunannya pada batas segmen.

```cshtml
@using Citia.DesignSystem.Ui
@{
    NavItem Item(string label, string href, string icon, bool exact = false) =>
        new(label, href, icon, NavActive.Matches(Context, href, exact));

    var nav = new NavModel(
        Top: [Item("Dashboard", "/", "dashboard", exact: true)],
        Groups:
        [
            new NavGroup("operasional", "Operasional",
            [
                Item("Posting ke BC", "/Posting", "send"),
                Item("Riwayat Pengiriman", "/Riwayat", "history"),
            ]),
            new NavGroup("master", "Data Master",
            [
                Item("Tangki / Silo", "/Master/Tanks", "tank"),
                Item("Kapal", "/Master/Vessels", "ship"),
                Item("Pelanggan", "/Master/Customers", "customer"),
            ], DefaultOpen: false),
        ],
        Bottom: [Item("Status akses", "/Access", "clock")]);
}
<partial name="_DsSidebarNav" model="nav" />
```

> [!WARNING]
> `Matches` bersifat prefiks. Bila dua item berurutan seperti `/Submissions` dan `/Submissions/Post`, keduanya aktif di halaman kedua; beri `exact: true` pada induknya.

`Key` grup menjadi id elemen (`ds-nav-<key>-toggle`, `ds-nav-<key>-panel`) dan kunci penyimpanan; pakai huruf kecil dan jangan ubah setelah rilis, karena pilihan operator hilang.

**Token.** `--ds-size-sidebar`, `--ds-size-sidebar-rail`, `--ds-pill-hover`, `--ds-pill-active`, `--ds-group-fg`, `--ds-size-icon-md`, `--ds-duration-layout`.

**Asal TPS.** `Styles/app.css` L2854–3042 (sidebar), L444–553 (ringkas); `DESIGN.md` bagian Sidebar.

## Drawer di layar sempit {#drawer}

Di bawah 1024 px sidebar menjadi drawer di luar layar. Ia meluncur masuk dari kiri dan keluar ke kiri, lewat jalur yang sama. Rangka cangkang lengkap:

```html
<div class="ds-shell">
  <aside class="ds-sidebar" id="app-sidebar">
    <div class="ds-sidebar-head">
      <a class="ds-brand" href="/">…</a>
      <button type="button" class="ds-sidebar-collapse" data-ds-sidebar-collapse aria-expanded="true" aria-label="Ringkas sidebar">…</button>
    </div>
    <!-- _DsSidebarNav -->
    <div class="ds-sidebar-mode">…</div>
    <div class="ds-sidebar-footer">…</div>
  </aside>
  <button type="button" class="ds-shell-scrim" data-ds-nav-close aria-label="Tutup navigasi" tabindex="-1"></button>
  <div class="ds-shell-main">
    <header class="ds-topbar">
      <button type="button" class="ds-chrome-btn ds-nav-toggle" data-ds-nav-toggle aria-controls="app-sidebar" aria-expanded="false" aria-label="Buka navigasi">…</button>
      …
    </header>
    <main id="main" class="ds-main" tabindex="-1">…</main>
  </div>
</div>
```

### State dan perilaku

- `button[data-ds-nav-toggle]` memasang `data-nav-open` pada `.ds-shell` dan memperbarui `aria-expanded`. Sidebar meluncur dalam `--ds-duration-layout`; scrim memudar masuk. Saat menutup, `visibility: hidden` baru berlaku setelah transisi selesai.
- Fokus pindah ke tautan pertama di sidebar saat terbuka dan kembali ke tombol toggle saat tertutup.
- Tab terkunci di dalam sidebar: dari item terakhir kembali ke yang pertama, dan sebaliknya dengan Shift+Tab.
- `.ds-shell-main` diberi `inert` selama drawer terbuka, sehingga konten di belakangnya tidak bisa difokuskan atau dibaca pembaca layar.
- Escape menutup drawer (menu `<details>` yang terbuka menutup lebih dulu, dialog menangani Escape-nya sendiri). Klik scrim (`data-ds-nav-close`) menutup juga.
- Melewati 1024 px menutup drawer tanpa memindahkan fokus. Tombol toggle dan scrim disembunyikan di desktop.

## Top bar {#topbar}

Top bar menempel di atas (`position: sticky`), tinggi minimal 4.75 rem. Kiri ke kanan: tombol kembali, judul (konteks di atas, judul halaman di bawah), lalu kelompok aksi.

```html preview title="Top bar halaman detail"
<header class="ds-topbar" style="position:static">
  <button type="button" class="ds-chrome-btn" data-ds-back="/" aria-label="Kembali ke Dokumen pemasukan">
    <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-arrow-left"></use></svg>
  </button>
  <div class="ds-topbar-heading">
    <p class="ds-topbar-context">Dokumen pemasukan</p>
    <h1 class="ds-topbar-title">BL-2026-00841</h1>
  </div>
  <div class="ds-topbar-actions">
    <span class="ds-scope-chip"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-building"></use></svg><span>TPS Integration</span></span>
    <a class="ds-pill is-warning" href="#">Akses berakhir 3 hari lagi</a>
    <details class="ds-notif" data-ds-menu>
      <summary class="ds-notif-trigger" aria-label="Notifikasi: 3 belum dibaca"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><span class="ds-notif-count">3</span></summary>
      <div class="ds-notif-panel"><p class="ds-notif-empty">Belum ada notifikasi.</p></div>
    </details>
    <button type="button" class="ds-chrome-btn" data-ds-theme-toggle aria-label="Aktifkan tema gelap">
      <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-moon"></use></svg>
    </button>
    <details class="ds-account" data-ds-menu>
      <summary><span class="ds-account-avatar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user"></use></svg></span><span>Admin Terminal</span></summary>
      <ul class="ds-account-panel">
        <li class="ds-account-email">admin@tps-integration.example</li>
        <li><form method="post" action="/Logout" data-ds-logout><button type="submit"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-logout"></use></svg> Keluar</button></form></li>
      </ul>
    </details>
  </div>
</header>
```

### State dan perilaku

- **Kembali.** `[data-ds-back="/fallback"]` memanggil `history.back()` hanya bila referrer berasal dari origin yang sama dan ada riwayat; selain itu ia membuka alamat di atribut. Tombol ini tidak pernah mengubah sidebar.
- **Tema.** `[data-ds-theme-toggle]` mengganti tema terang/gelap, menyimpannya di `<prefix>-theme`, dan menulis ulang `aria-label` ("Aktifkan tema gelap" atau "Aktifkan tema terang"). Elemen dalam tombol dengan `data-ds-theme-icon="light"` tampil saat tema terang dan `"dark"` saat gelap.
- **Akun.** `details.ds-account[data-ds-menu]` menutup saat ada penekanan di luar, saat Escape (fokus kembali ke `summary`), dan saat menu lain dibuka. Panelnya daftar biasa (bukan `role="menu"`): baris email (`.ds-account-email`, satu baris) lalu tautan atau tombol 44 px. Keluar adalah `<form method="post">` sungguhan dengan tombol, sehingga token antiforgery ikut terkirim.
- **Chip lingkup.** `.ds-scope-chip` menyebut terminal atau tenant yang sedang aktif; lebar maksimal 18 rem, teks yang lebih panjang dipotong dengan elipsis.
- **Ponsel (≤ 640 px).** Top bar membungkus; kelompok aksi turun ke baris sendiri selebar penuh, rata kanan, dan chip lingkup menempel di kiri.

### Aksesibilitas

- Tombol kembali menyebut tujuan sebenarnya di `aria-label` ("Kembali ke Dokumen pemasukan"), bukan "Kembali".
- Semua tombol chrome 44 × 44 px; ikon `aria-hidden="true"`.
- Judul di top bar dipotong elipsis dalam satu baris; pakai judul pendek (nomor BL, nama rekaman) dan taruh keterangan panjang di halaman.

**Asal TPS.** `_Layout`/`_PlatformLayout`; `Styles/app.css` L444–553.

## Aturan tombol kembali {#kembali}

Dari `DESIGN.md` TPS: Kembali dan Batal membawa tujuan yang pasti, bukan tebakan riwayat browser.

- Tautan Kembali dan Batal membawa `returnUrl` lokal dari halaman asal, termasuk `q`, filter, `sort`, `size`, dan `page`. Detail yang dibuka langsung (tanpa `returnUrl`) kembali ke daftarnya tanpa filter.
- Header menyebut tujuan sebenarnya: "Kembali ke Dashboard", "Kembali ke Detail pengeluaran", "Kembali ke Dokumen pemasukan".
- `returnUrl` hanya alamat lokal; URL luar ditolak. Periksa di server dengan `Url.IsLocalUrl`.
- Tautan Kembali dan Batal di dalam halaman tidak memakai `history.back()`. `data-ds-back` hanya untuk panah di top bar, dengan alamat cadangan.

```cshtml
@* Daftar: bawa alamat sekarang ke detail *@
<a asp-page="Detail" asp-route-id="@row.Id"
   asp-route-returnUrl="@(Context.Request.PathBase + Context.Request.Path + Context.Request.QueryString)">@row.Name</a>

@* Detail: tujuan kembali yang aman *@
@{
    var back = Url.IsLocalUrl(Model.ReturnUrl) ? Model.ReturnUrl! : Url.Page("Index")!;
}
<button type="button" class="ds-chrome-btn" data-ds-back="@back" aria-label="Kembali ke Dokumen pemasukan">…</button>
<a class="btn" href="@back" data-ds-guard-skip>Batal</a>
```

## Tab {#tab}

Tab berpindah antar tampilan objek yang sama (Ringkasan, Pengiriman, Riwayat dari satu BL). Tiap tab adalah tautan ke URL sendiri; yang sedang dibuka `aria-current="page"` (latar `base-100` dan bayangan tipis). `[aria-selected="true"]` juga didukung untuk tab berupa tombol, tetapi `ds.js` tidak menyediakan perilaku tablist (panah, `role="tabpanel"`); pakai tautan.

```html preview title="Tab"
<nav class="ds-tabs" aria-label="Bagian BL-2026-00841">
  <a href="#" aria-current="page">Ringkasan</a>
  <a href="#">Pengiriman</a>
  <a href="#">Riwayat</a>
</nav>
```

Tinggi tab 40 px, jarak antar tab 4 px. Jangan memakai tab untuk langkah berurutan; pakai langkah.

## Kontrol bersegmen {#segmen}

Satu pilihan yang mengubah cara daftar ditampilkan (satu baris per pengiriman atau per BL). Pilihan aktif terisi warna primary dengan teks putih; server menambahkan ikon centang pada pilihan aktif supaya aktif tidak hanya ditandai warna. Isi bisa `<a>`, `<button>` (`aria-pressed`), atau `<label>` dengan radio (`:checked`).

```html preview title="Segmen: tautan dan radio"
<div class="ds-segmented" role="group" aria-label="Tampilan pemasukan">
  <a href="#" aria-current="page"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg> Per pengiriman</a>
  <a href="#">Per BL</a>
</div>
<div class="ds-segmented" role="radiogroup" aria-label="Rentang waktu" style="margin-top:1rem">
  <label><input type="radio" name="navigasi-rentang" value="7" checked> 7 hari</label>
  <label><input type="radio" name="navigasi-rentang" value="30"> 30 hari</label>
</div>
```

Tinggi minimal 44 px; fokus berupa cincin 2 px `base-content` di luar tepi (di dalam `label`, radio disembunyikan tetapi tetap bisa difokuskan). Tulis satu kalimat di bawah kontrol yang membedakan tiap pilihan.

## Chip filter {#chip}

Chip menyaring daftar dan menampilkan jumlah di tiap pilihan. `.ds-chip-count` berada di dalam chip. Chip aktif `aria-current="true"` (tautan) atau `aria-pressed="true"` (tombol), terisi primary. Di dalam `.ds-dense` tinggi chip turun ke 32 px.

```html preview title="Chip dengan jumlah"
<div class="ds-chips" role="group" aria-label="Saring menurut status">
  <a class="ds-chip" href="#" aria-current="true">Semua <span class="ds-chip-count">57</span></a>
  <a class="ds-chip" href="#">Selesai <span class="ds-chip-count">34</span></a>
  <a class="ds-chip" href="#">Perlu dicek <span class="ds-chip-count">3</span></a>
  <a class="ds-chip" href="#">Ditolak <span class="ds-chip-count">2</span></a>
</div>
```

## Breadcrumb {#breadcrumb}

Menunjukkan lokasi halaman dalam hierarki. Tautan bergaris bawah; halaman sekarang berupa teks biasa dengan `aria-current="page"`. Pemisah "/" dibuat CSS, bukan markup.

```html preview title="Breadcrumb"
<nav class="ds-breadcrumb" aria-label="Lokasi halaman">
  <ol>
    <li><a href="#">Dokumen pemasukan</a></li>
    <li><a href="#">BL-2026-00841</a></li>
    <li aria-current="page">Seri 2</li>
  </ol>
</nav>
```

Breadcrumb bukan pengganti tombol kembali. Ia menyebut jalur, bukan riwayat.

## Langkah {#langkah}

`<ol class="ds-steps">` menomori tahap proses (verifikasi, pendaftaran). Lingkaran nomor terisi tone hasilnya lewat `li.is-success`, `.is-error`, `.is-warning`, atau `.is-info`; tanpa tone ia berupa lingkaran kosong (belum dikerjakan). Garis penghubung vertikal otomatis di antara item.

```html preview title="Langkah verifikasi"
<ol class="ds-steps">
  <li class="is-success"><strong>Dokumen diterima</strong><span class="ds-text-subtle">25 Jan 2026 14.30 WIB</span></li>
  <li class="is-error"><strong>Ditolak Bea Cukai</strong><span class="ds-text-subtle">Kode 007: gudang tujuan tidak sesuai</span></li>
  <li><strong>Kirim ulang</strong><span class="ds-text-subtle">Menunggu perbaikan data</span></li>
</ol>
```

Hasil selalu tertulis ("Ditolak", "diterima"); warna lingkaran hanya mendukung.

## Disclosure {#disclosure}

`<details class="ds-disclosure">` untuk isi sekunder yang tertutup secara bawaan: payload teknis, bantuan. Dapat dioperasikan keyboard (Enter/Spasi pada `summary`) tanpa JavaScript. Penanda "+" berubah menjadi "−" saat terbuka. `.ds-disclosure-list` merapikan beberapa disclosure menjadi satu kotak bersekat.

```html preview title="Daftar disclosure"
<div class="ds-disclosure-list">
  <details class="ds-disclosure">
    <summary>Permintaan XML</summary>
    <p>Dikirim 25 Jan 2026 14.30 WIB oleh admin terminal.</p>
  </details>
  <details class="ds-disclosure">
    <summary>Respons Bea Cukai</summary>
    <p>Diterima 25 Jan 2026 14.30 WIB.</p>
  </details>
</div>
```

`summary` setinggi minimal 44 px dengan cincin fokus 2 px `--ds-focus` di dalam tepi. Jangan menyembunyikan informasi yang dibutuhkan untuk menyelesaikan tugas di dalam disclosure.

**Asal TPS.** `.pt-tabs` L3639–3642; `.view-switch` L708–760; `.pt-chip*` L3515–3524; `.master-breadcrumb` L1391–1403; `.bc-verification` L52–57; `.payload-details` L3502–3504.
