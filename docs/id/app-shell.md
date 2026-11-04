---
title: App shell
group: components
category: layout
order: 1
summary: Kerangka aplikasi: sidebar, top bar tembus pandang, dan area utama, dengan icon rail di desktop dan drawer di mobile.
source: TPS _Layout, _PlatformLayout, app.css L444–553, L2854–3042
---

App shell menampung semua halaman setelah masuk: sidebar untuk navigasi, top bar sticky untuk konteks dan aksi akun, serta satu `<main>` untuk halaman. Pakai untuk produk dengan lebih dari lima tujuan. Untuk sedikit tujuan, [Navbar](./navbar.md) lebih ringan; untuk halaman masuk, pakai [Auth layout](./auth-layout.md).

Desktop (1024px ke atas): sidebar berupa kolom 16rem yang bisa diciutkan menjadi icon rail 4,75rem. Di bawah 1024px sidebar menjadi drawer yang meluncur dari tepinya di atas scrim dan kembali lewat jalur yang sama.

## Examples

### Full shell

Sidebar dengan tombol ciutkan, navigasi berkelompok, top bar, dan halaman. Gulir area halaman: top bar mendapat garis tipis setelah konten lewat di bawahnya.

```html preview title="Sidebar, top bar, dan main"
<div class="ds-shell is-embedded">
  <a class="ds-skip-link" href="#shell-main-1">Lewati ke konten utama</a>
  <aside class="ds-sidebar" aria-label="Aplikasi">
    <div class="ds-sidebar-head">
      <a class="ds-brand" href="#"><span class="ds-brand-mark" aria-hidden="true">C</span><span class="ds-brand-name">Citia</span></a>
      <button type="button" class="ds-sidebar-collapse" data-ds-sidebar-collapse aria-expanded="true" aria-label="Ringkas sidebar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-left"/></svg></button>
    </div>
    <nav class="ds-sidebar-nav" aria-label="Navigasi utama">
      <ul class="ds-nav-list">
        <li><a class="ds-nav-link" href="#" aria-current="page" aria-label="Ringkasan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-dashboard"/></svg><span>Ringkasan</span></a></li>
        <li><a class="ds-nav-link" href="#" aria-label="Kotak masuk"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-inbox"/></svg><span>Kotak masuk</span><span class="ds-nav-badge is-primary">12</span></a></li>
        <li>
          <button type="button" class="ds-nav-group-toggle" aria-expanded="true" aria-controls="shell1id-work" data-ds-nav-group="shell1id-work"><span>Pekerjaan</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"/></svg></button>
          <div id="shell1id-work" class="ds-nav-panel" data-open><ul class="ds-nav-sub">
            <li><a class="ds-nav-link" href="#" aria-label="Proyek"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"/></svg><span>Proyek</span></a></li>
            <li><a class="ds-nav-link" href="#" aria-label="Faktur"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"/></svg><span>Faktur</span></a></li>
          </ul></div>
        </li>
        <li><a class="ds-nav-link" href="#" aria-label="Pengaturan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-settings"/></svg><span>Pengaturan</span></a></li>
      </ul>
    </nav>
  </aside>
  <button type="button" class="ds-shell-scrim" data-ds-nav-close aria-label="Tutup navigasi"></button>
  <div class="ds-shell-main">
    <header class="ds-topbar">
      <button type="button" class="btn btn-ghost btn-square ds-nav-toggle" data-ds-nav-toggle aria-expanded="false" aria-label="Buka navigasi"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-menu"/></svg></button>
      <div class="ds-topbar-heading"><div class="ds-topbar-context">Workspace Northwind</div><div class="ds-topbar-title">Ringkasan</div></div>
      <div class="ds-topbar-actions"><button type="button" class="btn btn-ghost btn-square" aria-label="Notifikasi"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"/></svg></button></div>
    </header>
    <main class="ds-main" id="shell-main-1" tabindex="-1">
      <div class="ds-page">
        <header class="ds-page-header"><div><h1 class="ds-page-title">Ringkasan</h1><p class="ds-page-desc">Proyek terbuka, faktur belum dibayar, dan aktivitas terbaru.</p></div></header>
        <p>12 proyek sedang terbuka. INV-2026-0418 jatuh tempo pada 14 Nov 2026.</p>
        <p style="min-height: 18rem">Gulir di sini untuk melihat tepi top bar muncul.</p>
      </div>
    </main>
  </div>
</div>
```

### Icon rail

Beri `data-collapsed="true"` pada shell tertanam, atau pilihan pengguna pada `<html data-ds-sidebar-collapsed="true">` di aplikasi nyata. Label memudar, badge menjadi titik, dan tiap item menampilkan tooltip saat hover dan fokus keyboard.

```html preview title="Rail diciutkan"
<div class="ds-shell is-embedded" data-collapsed="true" style="--ds-shell-height: 20rem">
  <aside class="ds-sidebar" aria-label="Aplikasi">
    <div class="ds-sidebar-head">
      <a class="ds-brand" href="#"><span class="ds-brand-mark" aria-hidden="true">C</span><span class="ds-brand-name">Citia</span></a>
      <button type="button" class="ds-sidebar-collapse" data-ds-sidebar-collapse aria-expanded="false" aria-label="Perluas sidebar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-left"/></svg></button>
    </div>
    <nav class="ds-sidebar-nav" aria-label="Navigasi utama">
      <ul class="ds-nav-list">
        <li><a class="ds-nav-link" href="#" aria-current="page" aria-label="Ringkasan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-dashboard"/></svg><span>Ringkasan</span></a></li>
        <li><a class="ds-nav-link" href="#" aria-label="Kotak masuk, 12 belum dibaca"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-inbox"/></svg><span>Kotak masuk</span><span class="ds-nav-badge is-primary">12</span></a></li>
        <li><a class="ds-nav-link" href="#" aria-label="Proyek"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"/></svg><span>Proyek</span></a></li>
      </ul>
    </nav>
  </aside>
  <div class="ds-shell-main"><main class="ds-main"><div class="ds-page"><h2 class="ds-page-title">Ringkasan</h2></div></main></div>
</div>
```

### Content width

Tambahkan `is-sm`, `is-md`, `is-lg`, `is-xl`, `is-prose`, atau `is-full` (bawaan) pada `.ds-main`. Halaman diletakkan di tengah dalam batas itu.

| Class | Lebar maksimum | Untuk |
| --- | --- | --- |
| `.is-sm` | 40rem | Form pengaturan, wizard |
| `.is-md` | 48rem | Halaman detail satu kolom |
| `.is-lg` | 64rem | Halaman campuran |
| `.is-xl` | 80rem | Dashboard |
| `.is-prose` | 65ch | Bacaan panjang |
| `.is-full` | tanpa batas | Tabel, board |

## States

```html preview title="State item sidebar"
<div class="ds-sidebar" style="position: static; transform: none; visibility: visible; width: 16rem; height: auto; padding: 0.75rem">
  <ul class="ds-nav-list">
    <li><a class="ds-nav-link" href="#" aria-label="Rest"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"/></svg><span>Rest</span></a></li>
    <li><a class="ds-nav-link" href="#" aria-current="page" aria-label="Current"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"/></svg><span>Halaman saat ini</span></a></li>
    <li><a class="ds-nav-link" href="#" aria-label="Dengan badge"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-inbox"/></svg><span>Dengan badge</span><span class="ds-nav-badge is-error">3</span></a></li>
    <li><a class="ds-nav-link is-disabled" aria-disabled="true" aria-label="Nonaktif"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-lock"/></svg><span>Nonaktif</span></a></li>
  </ul>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak ada | Teks dan ikon di permukaan sidebar |
| Hover | Pointer di atas item (perangkat hover) | State layer 6% warna teks; baris tidak bergeser |
| Pressed | Pointer ditekan | State layer 10% |
| Focus-visible | Fokus keyboard | Ring 2px `--ds-focus`, offset 2px |
| Current | `aria-current="page"` | Isian primary tonal, teks primary, bobot 650, dan bar indikator 3px |
| Disabled | `aria-disabled="true"` | Opacity 0,55, kursor `not-allowed`, tanpa hover |
| Drawer terbuka | `data-nav-open` pada `.ds-shell` | Sidebar di translate 0, scrim opacity penuh, area utama `inert` |
| Rail | `data-ds-sidebar-collapsed` atau `data-collapsed` | Hanya ikon, tooltip saat hover dan fokus, badge menjadi titik |
| Tergulir | Halaman tergulir lebih dari 1px | Garis top bar muncul dalam 180ms |

## Anatomy

- `.ds-shell`: grid sidebar dan main. `.is-embedded` menahannya di dalam kotak (card, preview).
- `.ds-sidebar`: kolom navigasi; lihat [Sidebar](./sidebar.md). `.is-brand` memakai permukaan teal tua.
- `.ds-shell-scrim`: tombol di belakang drawer terbuka; menutupnya.
- `.ds-shell-main`: kolom berisi top bar, `main`, dan [Footer](./footer.md) opsional.
- `.ds-topbar` dengan `.ds-topbar-heading` (`-context`, `-title`), `.ds-topbar-search`, `.ds-topbar-actions`, `.ds-nav-toggle`.
- `.ds-main` dan `.ds-page`: area konten dan tumpukan vertikalnya (jarak 24px).
- `.ds-skip-link`: elemen pertama di shell; terlihat saat fokus.

## Usage

- Pasang satu `<main>` per halaman dan beri `id` serta `tabindex="-1"` agar skip link mendarat di sana.
- Batasi top bar untuk konteks, pencarian, dan maksimal 3 aksi. Judul halaman dan aksi utama masuk ke [Page header](./page-header.md).
- Simpan status rail di `localStorage`; head script memasang `data-ds-sidebar-collapsed` sebelum paint pertama sehingga shell tidak berkedip terbuka.
- Jangan menambah kontainer gulir kedua di samping halaman; window yang menggulir.
- Jangan memberi transisi sendiri pada sidebar. Kolom grid dan drawer memakai token layout dan bisa diinterupsi di tengah jalan.

## Accessibility

- Landmark: `<aside aria-label>` (complementary), `<nav aria-label>`, `<header>` untuk top bar, `<main>`.
- Saat drawer terbuka di mobile, sidebar mendapat `role="dialog"` dan `aria-modal="true"`, `main` menjadi `inert`, Tab berputar di dalam sidebar, fokus pindah ke tautan pertama dan kembali ke tombol menu saat ditutup.
- Tombol ciutkan mengubah `aria-expanded` dan labelnya ("Ringkas sidebar" atau "Perluas sidebar").
- Setiap tautan nav menyimpan `aria-label`, sehingga rail tetap menamai tiap item.
- Target 44px; kontras teks dan indikator current minimal 4,5:1 dan 3:1 di kedua tema.
- Reduced motion: drawer dan scrim cross-fade tanpa gerak; rail berubah tanpa animasi.

| Tombol | Aksi |
| --- | --- |
| Tab | Berpindah di sidebar, lalu top bar dan halaman |
| Enter, Space | Mengaktifkan tautan, grup, atau tombol ciutkan |
| Escape | Menutup drawer atau menu yang terbuka dan mengembalikan fokus ke pemicu |

## Razor

Pakai partial untuk navigasi dan tulis kerangkanya sebagai markup:

```cshtml
<body>
    <partial name="_DsIconSprite" />
    <div class="ds-shell">
        <a class="ds-skip-link" href="#main">@DsText.T("layout.skip")</a>
        <aside class="ds-sidebar" aria-label="Aplikasi">
            <div class="ds-sidebar-head">...</div>
            <partial name="_DsSidebarNav" model="Model.Nav" />
        </aside>
        <button type="button" class="ds-shell-scrim" data-ds-nav-close aria-label="@DsText.T("layout.closeNav")"></button>
        <div class="ds-shell-main">
            <header class="ds-topbar">...</header>
            <main id="main" class="ds-main is-xl" tabindex="-1">@RenderBody()</main>
        </div>
    </div>
</body>
```

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-sidebar-collapse` | Tombol yang mengalihkan rail; menyimpan pilihan di `<prefix>-sidebar-collapsed` |
| `data-ds-nav-toggle` | Membuka drawer (mobile) |
| `data-ds-nav-close` | Menutup drawer (scrim, tombol tutup) |
| `data-ds-nav-group` | Toggle grup; lihat [Sidebar](./sidebar.md) |
| `data-ds-back="/fallback"` | Tombol kembali: history back bila referrer satu situs, jika tidak ke URL cadangan |

API: `DS.init(root)` setelah menyisipkan markup. Event: `ds:sidebar:toggle` (`detail.collapsed`) dan `ds:drawer:toggle` (`detail.open`).

## Tokens

`--ds-size-sidebar` (16rem), `--ds-size-sidebar-rail` (4,75rem), `--ds-duration-layout` (240ms), `--ds-duration-spring` (500ms), `--ds-ease-spring`, `--ds-scrim`, `--ds-shadow-overlay`, `--ds-z-sticky`, `--ds-z-modal`, `--ds-opacity-state-*`, `--color-base-100`, `--color-base-200`, `--color-primary`.

## Native and daisyUI

Dibangun di atas `aside`, `nav`, `header`, `main`, dan CSS grid. Tombol di top bar adalah daisyUI `btn btn-ghost`. DS mengganti sidebar teal solid versi 1 dengan permukaan netral; tambahkan `.is-brand` untuk mengembalikannya.
