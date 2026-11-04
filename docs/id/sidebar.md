---
title: Sidebar
group: components
category: navigation
order: 6
summary: Kolom navigasi utama dengan grup, badge, slot pencarian, pengganti workspace, dan menu akun; bisa meluas, menciut menjadi rail, atau menjadi drawer.
source: TPS app.css L2854–3042, _DsSidebarNav
---

Sidebar mendaftar tujuan aplikasi dalam dua tingkat: grup (tombol dengan chevron) dan item (tautan dengan ikon). Sidebar berada di dalam [App shell](./app-shell.md). Untuk daftar horizontal 3 sampai 5 tujuan, pakai [Navbar](./navbar.md); di ponsel pertimbangkan [Bottom navigation](./bottom-navigation.md).

## Examples

### Groups, search, dan workspace

Grup membuka dan menutup dalam 200ms dan bisa diinterupsi di tengah jalan. Slot pencarian dan pengganti workspace ada di atas daftar; menu akun di bawahnya.

```html preview title="Sidebar lengkap"
<div class="ds-shell is-embedded" style="--ds-shell-height: 34rem">
  <aside class="ds-sidebar" aria-label="Aplikasi">
    <div class="ds-sidebar-head">
      <a class="ds-brand" href="#"><span class="ds-brand-mark" aria-hidden="true">C</span><span class="ds-brand-name">Citia</span></a>
      <button type="button" class="ds-sidebar-collapse" data-ds-sidebar-collapse aria-expanded="true" aria-label="Ringkas sidebar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-left"/></svg></button>
    </div>
    <div class="ds-sidebar-slot">
      <button type="button" class="ds-sidebar-switcher" aria-haspopup="true" aria-label="Ganti workspace, Northwind">
        <span class="ds-brand-mark" aria-hidden="true">N</span>
        <span class="ds-sidebar-switcher__text"><span>Northwind</span><span>Paket Tim</span></span>
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-up-down"/></svg>
      </button>
    </div>
    <div class="ds-sidebar-slot">
      <button type="button" class="ds-sidebar-search" aria-label="Cari"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"/></svg><span>Cari</span><kbd class="ds-kbd">Ctrl K</kbd></button>
    </div>
    <nav class="ds-sidebar-nav" aria-label="Navigasi utama">
      <ul class="ds-nav-list">
        <li><a class="ds-nav-link" href="#" aria-current="page" aria-label="Ringkasan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-dashboard"/></svg><span>Ringkasan</span></a></li>
        <li><a class="ds-nav-link" href="#" aria-label="Kotak masuk"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-inbox"/></svg><span>Kotak masuk</span><span class="ds-nav-badge is-primary">12</span></a></li>
        <li>
          <button type="button" class="ds-nav-group-toggle" aria-expanded="true" aria-controls="sb1id-work" data-ds-nav-group="sb1id-work"><span>Pekerjaan</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"/></svg></button>
          <div id="sb1id-work" class="ds-nav-panel" data-open><ul class="ds-nav-sub">
            <li><a class="ds-nav-link" href="#" aria-label="Proyek"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"/></svg><span>Proyek</span><span class="ds-nav-badge">24</span></a></li>
            <li><a class="ds-nav-link" href="#" aria-label="Faktur"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"/></svg><span>Faktur</span><span class="ds-nav-badge is-error">3</span></a></li>
            <li><a class="ds-nav-link is-disabled" aria-disabled="true" aria-label="Laporan, tersedia di paket Bisnis"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bar-chart"/></svg><span>Laporan</span></a></li>
          </ul></div>
        </li>
        <li>
          <button type="button" class="ds-nav-group-toggle" aria-expanded="false" aria-controls="sb1id-admin" data-ds-nav-group="sb1id-admin"><span>Administrasi</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"/></svg></button>
          <div id="sb1id-admin" class="ds-nav-panel"><ul class="ds-nav-sub">
            <li><a class="ds-nav-link" href="#" aria-label="Anggota"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-users"/></svg><span>Anggota</span></a></li>
            <li><a class="ds-nav-link" href="#" aria-label="Penagihan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-credit-card"/></svg><span>Penagihan</span></a></li>
          </ul></div>
        </li>
      </ul>
    </nav>
    <div class="ds-sidebar-footer">
      <details class="ds-sidebar-account" data-ds-menu>
        <summary aria-label="Menu akun"><span class="ds-account-avatar" aria-hidden="true">AL</span><span class="ds-account-text"><span>Ayu Lestari</span><span>ayu@northwind.example</span></span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-up-down"/></svg></summary>
        <ul class="ds-account-panel">
          <li><a href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user"/></svg>Profil</a></li>
          <li><a href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-settings"/></svg>Preferensi</a></li>
          <li><button type="button"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-logout"/></svg>Keluar</button></li>
        </ul>
      </details>
    </div>
  </aside>
  <div class="ds-shell-main"><main class="ds-main"><div class="ds-page"><h2 class="ds-page-title">Ringkasan</h2></div></main></div>
</div>
```

### Brand surface

`.is-brand` mengisi sidebar dengan teal tua. Pakai bila identitas produk butuh tepi yang kuat; permukaan netral adalah bawaan.

```html preview title="Varian brand"
<div class="ds-sidebar is-brand" style="position: static; transform: none; visibility: visible; width: 16rem; height: auto; padding: 0.75rem">
  <ul class="ds-nav-list">
    <li><a class="ds-nav-link" href="#" aria-current="page" aria-label="Ringkasan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-dashboard"/></svg><span>Ringkasan</span></a></li>
    <li><a class="ds-nav-link" href="#" aria-label="Kotak masuk"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-inbox"/></svg><span>Kotak masuk</span><span class="ds-nav-badge">12</span></a></li>
    <li><a class="ds-nav-link is-disabled" aria-disabled="true" aria-label="Laporan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bar-chart"/></svg><span>Laporan</span></a></li>
  </ul>
</div>
```

## States

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak ada | Teks `--color-base-content`, ikon di tingkat muted |
| Hover | Pointer di atas item atau grup (perangkat hover) | State layer 6%; baris tidak bergeser |
| Pressed | Pointer ditekan | State layer 10% |
| Focus-visible | Fokus keyboard | Ring 2px `--ds-focus`, offset 2px |
| Current | `aria-current="page"` | Isian primary tonal, teks primary, bobot 650, bar indikator 3px |
| Disabled | `.is-disabled` dengan `aria-disabled="true"`, tanpa `href` | Opacity 0,55, kursor `not-allowed`; jelaskan alasannya di `aria-label` atau tooltip |
| Grup terbuka atau tertutup | `aria-expanded` pada tombol grup | Chevron berputar 180°; panel tumbuh dari 0fr ke 1fr dalam 200ms |
| Badge | `.ds-nav-badge`, `.is-primary`, `.is-error`, `.is-dot` | Angka tabular; di rail berupa titik di atas ikon |
| Menu akun terbuka | `details[open]` | Panel terbuka ke atas (ke samping saat rail) |
| Rail | `data-ds-sidebar-collapsed` | Hanya ikon; tooltip setelah 350ms saat hover, langsung saat fokus keyboard |
| Label panjang | Label lebih lebar dari item | Dipotong dengan elipsis; tooltip menampilkan teks lengkap |
| Daftar bisa digulir | Item lebih banyak dari ruang | Pudar lembut di tepi atas dan bawah, scrollbar tipis |

## Anatomy

- `.ds-sidebar-head`: `.ds-brand` (`-mark`, `-name`) dan `.ds-sidebar-collapse`.
- `.ds-sidebar-slot`: wadah untuk `.ds-sidebar-switcher` (workspace) atau `.ds-sidebar-search`.
- `.ds-sidebar-nav`: satu-satunya bagian yang menggulir. Isinya: `.ds-nav-list`, `.ds-nav-group-toggle`, `.ds-nav-panel` dengan `.ds-nav-sub`, `.ds-nav-link`, `.ds-nav-badge`.
- `.ds-sidebar-footer` dengan `.ds-sidebar-account` (`details`), `.ds-account-avatar`, `.ds-account-text`, `.ds-account-panel`.
- `.ds-sidebar-mode`: baris bebas untuk pengganti tema atau bahasa.

## Usage

- Maksimal dua tingkat. Grup berisi 2 sampai 7 item; jika lebih, pecah grupnya.
- Beri setiap item ikon dari set yang sama dan batasi label 1 sampai 3 kata.
- Batasi menu akun 3 sampai 5 entri; taruh Keluar paling akhir.
- Pakai satu gaya badge per sidebar: angka untuk hal yang perlu dikerjakan, titik untuk "ada yang baru".
- Jangan menyarangkan grup di dalam grup dan jangan memakai header grup sebagai tautan.
- Biarkan item nonaktif tetap bisa difokus dengan `aria-disabled` hanya bila Anda bisa menjelaskan mengapa tidak tersedia.

## Accessibility

- `nav` dengan nama aksesibel (bawaan "Navigasi utama" atau "Main navigation"). Halaman saat ini memakai `aria-current="page"`.
- Grup adalah disclosure: `button` dengan `aria-expanded` dan `aria-controls`; panel tertutup `inert` dan `visibility: hidden`, sehingga keluar dari urutan tab.
- Tooltip rail berupa `role="tooltip"`, muncul saat fokus keyboard, dan Escape menyembunyikannya. Nama berasal dari `aria-label`, bukan dari tooltip.
- Status buka tiap grup diingat (`<prefix>-nav-groups`); grup yang memuat halaman saat ini selalu terbuka.
- Posisi gulir daftar dipulihkan setelah navigasi (`sessionStorage`).
- Target 44px; badge dan teks current menjaga 4,5:1.
- Reduced motion: grup membuka dan menutup tanpa gerak (transisi 0,01ms); pudarnya label tetap.

| Tombol | Aksi |
| --- | --- |
| Tab, Shift+Tab | Berpindah antar grup dan item |
| Enter, Space | Membuka tautan, mengalihkan grup, membuka menu |
| Escape | Menutup menu akun atau drawer, menyembunyikan tooltip |

## Razor

```cshtml
@{
    var nav = new NavModel(
        Top: [new NavItem("Ringkasan", "/", "dashboard", Active: true)],
        Groups: [new NavGroup("work", "Pekerjaan", [
            new NavItem("Proyek", "/projects", "folder", Badge: "24"),
            new NavItem("Faktur", "/invoices", "receipt", Badge: "3", BadgeTone: "error"),
            new NavItem("Laporan", "/reports", "bar-chart", Disabled: true)])]);
}
<partial name="_DsSidebarNav" model="nav" />
```

`NavItem` menerima `Badge`, `BadgeTone` (`primary` atau `error`), dan `Disabled`. `NavActive.Matches(HttpContext, href)` menentukan `Active`.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-nav-group="key"` | Tombol grup; key menyimpan status bukanya. `data-ds-nav-active="true"` memaksanya terbuka |
| `data-ds-nav-scroll` | Mengingat posisi gulir daftar |
| `data-ds-sidebar-collapse` | Mengalihkan icon rail |

Markup grup adalah `button[aria-controls]` ditambah `.ds-nav-panel` (panel dibuka lewat CSS). Markup lama dengan `ul.ds-nav-sub[hidden]` tetap berfungsi tanpa animasi.

## Tokens

`--ds-size-sidebar`, `--ds-size-sidebar-rail`, `--ds-size-target`, `--ds-opacity-state-hover|pressed|selected|disabled`, `--ds-focus`, `--ds-quiet`, `--ds-subtle`, `--ds-radius-lg`, `--ds-duration-fast`, `--ds-duration-layout`, `--ds-ease-emphasized`, `--ds-z-tooltip`.

## Native and daisyUI

Dibangun di atas `nav`, `ul`, `a`, `button`, dan `details`. Tidak memakai daisyUI `menu`: sidebar butuh dua jenis kontrol, mode rail, dan grup yang persisten. Variabel dalam (`--ds-sidebar-bg`, `-fg`, `-hover`, `-current-bg`) bisa ditimpa pada `.ds-sidebar`.
