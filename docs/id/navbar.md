---
title: Navbar
group: components
category: navigation
order: 1
summary: Top app bar tembus pandang untuk aplikasi tanpa sidebar: brand, tautan, slot pencarian, aksi, dan menu mobile. Garis tipis baru muncul setelah halaman tergulir di bawahnya.
---

Navbar adalah top bar untuk aplikasi atau situs dengan sampai sekitar 6 tujuan. Isinya brand, tautan utama, kolom pencarian opsional, dan aksi akun; pada bar sempit tautan dilipat menjadi menu. Untuk aplikasi dengan banyak tujuan pakai [App shell](./app-shell.md) beserta sidebar-nya; untuk tujuan dengan dropdown atau panel mega, taruh [Navigation menu](./navigation-menu.md) di dalam navbar; untuk navigasi utama khusus ponsel pakai [Bottom navigation](./bottom-navigation.md).

Bar bersifat buram di puncak halaman. Saat konten tergulir di bawahnya, bar menjadi material tembus pandang yang diburamkan (78% dari `--color-base-100`) dan garis tipis 1px muncul perlahan: efek scroll-edge. Bar menempel di atas kontainer gulirnya.

## Examples

### Bar sticky dengan scroll edge

Gulir area di bawah: garis tipis dan blur muncul setelah gulir 2px. Slot `search` tersembunyi dan tautan terlipat ke tombol menu saat bar lebih sempit dari 40rem (640px). Aturan ini mengikuti lebar bar, bukan lebar jendela, sehingga berlaku juga di kolom sempit.

```html preview title="Navbar dengan pencarian dan aksi"
<div style="height:22rem;overflow:auto;border:1px solid var(--color-base-300);border-radius:0.75rem;background:var(--color-base-200)">
  <header class="ds-navbar" data-ds-navbar>
    <div class="ds-navbar__inner">
      <a class="ds-navbar__brand" href="#"><span class="ds-navbar__mark" aria-hidden="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-layers"/></svg></span>Northwind</a>
      <nav class="ds-navbar__nav" id="navbar-demo-menu" aria-label="Utama">
        <a class="ds-navbar__link" href="#" aria-current="page">Ringkasan</a>
        <a class="ds-navbar__link" href="#">Proyek</a>
        <a class="ds-navbar__link" href="#">Faktur</a>
      </nav>
      <div class="ds-navbar__search">
        <label class="input input-sm" style="width:100%"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"/></svg><input type="search" placeholder="Cari proyek" aria-label="Cari proyek"></label>
      </div>
      <div class="ds-navbar__actions">
        <button type="button" class="ds-theme-toggle" data-ds-theme-toggle aria-label="Ganti ke tema gelap"><svg class="ds-icon ds-theme-toggle__light" aria-hidden="true"><use href="#ds-icon-sun"/></svg><svg class="ds-icon ds-theme-toggle__dark" aria-hidden="true"><use href="#ds-icon-moon"/></svg></button>
        <button type="button" class="btn btn-ghost btn-square btn-sm" aria-label="Notifikasi, 3 belum dibaca"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"/></svg></button>
      </div>
      <button type="button" class="ds-navbar__toggle" data-ds-navbar-toggle aria-controls="navbar-demo-menu" aria-expanded="false" aria-label="Buka menu">
        <svg class="ds-icon is-open" aria-hidden="true"><use href="#ds-icon-menu"/></svg><svg class="ds-icon is-close" aria-hidden="true"><use href="#ds-icon-x"/></svg>
      </button>
    </div>
  </header>
  <div style="padding:1.5rem">
    <p>INV-2026-0418 · Ayu Lestari · 4.250,00</p>
    <p style="margin-top:6rem">INV-2026-0419 · Daniel Okafor · 1.180,50</p>
    <p style="margin-top:6rem">INV-2026-0420 · Mei Tanaka · 9.730,00</p>
    <p style="margin-top:6rem">INV-2026-0421 · Sofia Marquez · 612,25</p>
    <p style="margin-top:6rem">Akhir daftar.</p>
  </div>
</div>
```

### Variants

`is-bordered` mempertahankan garis tipis setiap saat. `is-solid` tidak pernah menjadi tembus pandang. `is-contained` membatasi konten hingga 80rem. `is-static` menghapus sifat sticky. `data-ds-hide-on-scroll` menggeser bar keluar saat menggulir ke bawah dan mengembalikannya saat menggulir ke atas.

```html preview title="Bordered, solid, contained"
<header class="ds-navbar is-static is-bordered is-solid is-contained" data-ds-navbar>
  <div class="ds-navbar__inner">
    <a class="ds-navbar__brand" href="#"><span class="ds-navbar__mark" aria-hidden="true">N</span>Northwind</a>
    <nav class="ds-navbar__nav" aria-label="Utama (varian)">
      <a class="ds-navbar__link" href="#">Ringkasan</a>
      <a class="ds-navbar__link" href="#" aria-current="page">Proyek</a>
    </nav>
    <div class="ds-navbar__actions"><a class="btn btn-primary btn-sm" href="#">Proyek baru</a></div>
  </div>
</header>
```

## States

```html preview title="State tautan"
<header class="ds-navbar is-static is-bordered" data-ds-navbar>
  <div class="ds-navbar__inner">
    <nav class="ds-navbar__nav" style="margin:0" aria-label="State">
      <a class="ds-navbar__link" href="#">Rest</a>
      <a class="ds-navbar__link" href="#" aria-current="page">Saat ini</a>
      <a class="ds-navbar__link" href="#" aria-disabled="true" title="Memerlukan peningkatan paket">Nonaktif</a>
    </nav>
    <div class="ds-navbar__actions">
      <button type="button" class="ds-navbar__toggle" style="display:inline-grid" aria-expanded="true" aria-label="Tutup menu"><svg class="ds-icon is-open" aria-hidden="true"><use href="#ds-icon-menu"/></svg><svg class="ds-icon is-close" aria-hidden="true"><use href="#ds-icon-x"/></svg></button>
    </div>
  </div>
</header>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Top of page | posisi gulir di bawah 3px | `--color-base-100` buram, tanpa garis tipis |
| Scrolled | konten di bawah bar (`data-scrolled`) | permukaan 78% dengan blur 16px, garis tipis muncul dalam 180ms |
| Link rest | tidak ada | teks `--ds-subtle` |
| Link hover | pointer di atas tautan | teks `--color-base-content`, tint 6% |
| Link pressed | pointer ditekan | tint 10% |
| Link focus-visible | fokus keyboard | ring 2px `--ds-focus` |
| Link current | `aria-current="page"` | isian primary tonal (`--ds-primary-soft`), teks `--ds-quiet` |
| Link disabled | `aria-disabled="true"` | opacity 55%, kursor `not-allowed`, dijelaskan oleh `title` |
| Menu closed / open | `aria-expanded` pada toggle (bar di bawah 40rem) | tautan tersembunyi / tampil di panel di bawah bar; ikon berubah dari menu ke tutup |
| Hidden on scroll | `data-hidden` (bersama `data-ds-hide-on-scroll`) | bar bergeser ke atas setinggi dirinya; tidak pernah saat memegang fokus atau menunya terbuka |
| Reduced transparency | `prefers-reduced-transparency` | permukaan buram, tanpa blur |

## Anatomy

- `header.ds-navbar`: root dan hook `data-ds-navbar`. Modifier: `is-static`, `is-bordered`, `is-solid`, `is-contained`.
- `.ds-navbar__inner`: barisnya (tinggi 3,5rem).
- `.ds-navbar__brand` dan `.ds-navbar__mark`: tautan brand dan mark-nya yang 2rem.
- `.ds-navbar__nav`: tautan utama; `.ds-navbar__link` satu tautan.
- `.ds-navbar__search`: slot untuk kolom pencarian (lebar minimal 8rem); `is-mobile` mempertahankannya di baris kedua saat bar sempit.
- `.ds-navbar__actions`: button dan menu di sisi inline-end.
- `.ds-navbar__toggle`: tombol menu, terlihat saat bar lebih sempit dari 40rem.

## Usage

- Pakai maksimal 6 tautan. Lebih dari itu masuk ke [Navigation menu](./navigation-menu.md) atau sidebar.
- Taruh paling banyak satu tombol primary di aksi, di sisi inline-end.
- Tandai bagian saat ini dengan `aria-current="page"` pada tautan; cocokkan berdasarkan prefiks path di server.
- Arahkan tautan brand ke beranda dan beri nama (`Northwind`), bukan "Beranda".
- Pencarian: pakai slot `.ds-navbar__search` di layar lebar dan tombol ikon di aksi pada layar sempit, atau tambahkan `is-mobile` untuk mempertahankan kolom selebar penuh di barisnya sendiri.
- Jangan menumpuk navbar di atas app shell bersidebar; pakai top bar milik shell.
- Sediakan `data-ds-hide-on-scroll` hanya untuk halaman baca yang padat konten; biarkan bar tetap terlihat pada alat kerja.

## Accessibility

- Tautan berada di `<nav>` dengan nama yang dapat diakses (`aria-label="Utama"`). Bila halaman punya dua nav, beri masing-masing label berbeda.
- Tombol menu memakai `aria-expanded` dan `aria-controls` yang menunjuk ke nav, dan labelnya berganti antara "Buka menu" dan "Tutup menu" (dilokalkan).
- Menu mobile adalah disclosure, bukan `role="menu"`: tautan tetap tautan biasa dalam urutan Tab.
- Teks di bar tembus pandang tetap 4,5:1 karena permukaan buramnya dicampur dari `--color-base-100` pada 78%; di bawah reduced transparency permukaannya buram penuh.
- Area sentuh: tautan 40px, 44px di layar sentuh. Focus ring tidak pernah terpotong oleh bar.
- Skip link sebelum bar memungkinkan pengguna keyboard melompat ke konten utama.

| Tombol | Aksi |
| --- | --- |
| Tab / Shift+Tab | Berpindah melalui brand, tautan, pencarian, aksi, tombol menu |
| Enter / Space | Mengaktifkan tautan atau tombol menu |
| Escape | Menutup menu mobile yang terbuka dan mengembalikan fokus ke tombol menu |

Motion: garis tipis dan latar cross-fade dalam 180ms; panel mobile masuk dengan opacity dan geser 5px selama 220ms dan keluar dalam 140ms; hide-on-scroll adalah transform 220ms. Di bawah reduced motion transform dihapus dan hanya perubahan opacity yang tersisa.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-navbar` | Pada bar: state scroll-edge, menu mobile, Escape dan klik di luar untuk menutup |
| `data-ds-navbar-toggle` | Pada tombol menu |
| `data-ds-hide-on-scroll` | Sembunyi saat gulir ke bawah, tampil saat gulir ke atas |

Bar mendengarkan ancestor penggulir terdekat, atau window. Event: `ds:navbar:toggle` dengan `detail.open`. API: `DS.navbar.close(bar)`.

Tanpa JavaScript, toggle tersembunyi dan tautan tetap berada dalam baris gulir di bawah brand pada bar sempit.

## Tokens

`--color-base-100`, `--color-base-300`, `--color-primary`, `--color-primary-content`, `--ds-subtle`, `--ds-quiet`, `--ds-z-sticky`, `--ds-radius-lg`, `--ds-radius-xl`, `--ds-shadow-menu`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-primary-soft`, `--ds-duration-base`, `--ds-duration-enter`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-enter-offset`.

## Native and daisyUI

Sebuah `<header>` dengan `<nav>` serta tautan dan button biasa. Ini menggantikan `navbar` milik daisyUI: jangan digabung. Kolom pencarian di dalam slot memakai `input` daisyUI (lihat [Search input](./search-input.md)); button memakai `btn`. Batas 80rem pada `is-contained` mengikuti lebar kontainer tata letak.
