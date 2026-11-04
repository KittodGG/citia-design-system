---
title: Bottom navigation
group: components
category: navigation
order: 2
summary: Navigasi utama untuk ponsel: 3 sampai 5 tujuan dengan ikon dan label, pil tonal yang bergeser ke tujuan aktif, badge, safe area, dan opsi sembunyi saat gulir.
---

Bottom navigation menempatkan 3 sampai 5 tujuan terpenting aplikasi dalam jangkauan ibu jari di layar kompak. Setiap tujuan punya ikon dan label; tujuan aktif mendapat pil tonal di belakang ikonnya yang bergeser ke tujuan berikutnya. Pakai untuk tujuan tingkat atas yang rata dan sering berpindah (Beranda, Proyek, Pesan, Akun). Untuk lebih banyak tujuan pakai [Sidebar](./app-shell.md); untuk tampilan dari satu objek pakai [Tabs](./tabs.md); di desktop pakai [Navbar](./navbar.md).

Bar terpasang di tepi bawah, tembus pandang dengan garis tipis di atas, dan memberi padding sendiri dengan `env(safe-area-inset-bottom)` agar tidak tertutup home indicator.

## Examples

### Empat tujuan dengan badge

Demo memakai `is-static` agar bar berada di dalam preview. Di aplikasi, hapus class itu: bar berupa `position: fixed`. Klik tombolnya: pil bergeser dan state berubah.

```html preview title="Bottom navigation (tombol)"
<nav class="ds-bottom-nav is-static" aria-label="Utama" data-ds-bottom-nav style="max-width:26rem;margin-inline:auto;border:1px solid var(--color-base-300);border-radius:1rem">
  <button type="button" class="ds-bottom-nav__item" aria-current="page">
    <span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-home"/></svg></span>
    <span class="ds-bottom-nav__label">Beranda</span>
  </button>
  <button type="button" class="ds-bottom-nav__item">
    <span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"/></svg></span>
    <span class="ds-bottom-nav__label">Proyek</span>
  </button>
  <button type="button" class="ds-bottom-nav__item">
    <span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-inbox"/></svg><span class="ds-bottom-nav__badge" aria-hidden="true">3</span></span>
    <span class="ds-bottom-nav__label">Pesan<span class="ds-visually-hidden">, 3 belum dibaca</span></span>
  </button>
  <button type="button" class="ds-bottom-nav__item">
    <span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user"/></svg></span>
    <span class="ds-bottom-nav__label">Akun</span>
  </button>
</nav>
```

### Link dan state

Pada aplikasi yang dirender server, item berupa link dan server menetapkan `aria-current="page"`. Halaman dimuat ulang, jadi pil tidak bergeser; pil langsung ditempatkan. Di bawah: rest, current, badge titik, badge angka, dan item disabled.

```html preview title="Link, badge titik, item disabled"
<nav class="ds-bottom-nav is-static" aria-label="Utama (link)" data-ds-bottom-nav style="max-width:30rem;margin-inline:auto;border:1px solid var(--color-base-300);border-radius:1rem">
  <a class="ds-bottom-nav__item" href="#"><span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-home"/></svg></span><span class="ds-bottom-nav__label">Beranda</span></a>
  <a class="ds-bottom-nav__item" href="#" aria-current="page"><span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"/></svg><span class="ds-bottom-nav__badge is-dot" aria-hidden="true"></span></span><span class="ds-bottom-nav__label">Faktur<span class="ds-visually-hidden">, ada aktivitas baru</span></span></a>
  <a class="ds-bottom-nav__item" href="#"><span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"/></svg><span class="ds-bottom-nav__badge" aria-hidden="true">12</span></span><span class="ds-bottom-nav__label">Notifikasi<span class="ds-visually-hidden">, 12 belum dibaca</span></span></a>
  <a class="ds-bottom-nav__item" aria-disabled="true" title="Tersedia setelah verifikasi"><span class="ds-bottom-nav__icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-wallet"/></svg></span><span class="ds-bottom-nav__label">Dompet</span></a>
</nav>
```

## States

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak ada | ikon dan label `--ds-subtle` |
| Hover | pointer di atas item (perangkat dengan hover) | teks menjadi `--color-base-content`, tint 6% di belakang ikon |
| Pressed | pointer ditekan | tint 10% di belakang ikon (tanpa scale) |
| Focus-visible | fokus keyboard | ring `--ds-focus` 2px di dalam item |
| Current | `aria-current="page"` | ikon `--ds-quiet`, label tebal, pil tonal (`--ds-primary-soft`) yang bergeser antar item |
| Badge | `.ds-bottom-nav__badge` | angka atau titik berwarna error di sudut atas ikon, dengan ring surface 2px |
| Disabled | `aria-disabled="true"` | opasitas 55%, kursor `not-allowed` |
| Hidden on scroll | `data-hidden` | bar meluncur ke bawah setinggi dirinya; tidak pernah saat sebuah item punya fokus |
| Without JavaScript | `data-ds-ready` tidak diset | item current menggambar pilnya sendiri |

## Anatomy

- `nav.ds-bottom-nav` root. Modifier: `is-static` (tidak fixed), `is-compact-only` (disembunyikan mulai 768px).
- `.ds-bottom-nav__item` berupa `<a>` atau `<button>`; satu per tujuan.
- `.ds-bottom-nav__icon` area pil 4rem kali 2rem berisi ikon (grid 24px, digambar 22px); badge berada di dalamnya.
- `.ds-bottom-nav__label` label, selalu terlihat, satu baris, dipotong dengan ellipsis.
- `.ds-bottom-nav__badge` angka atau titik (`is-dot`).
- `.ds-bottom-nav__indicator` pil yang bergeser, dibuat oleh `tabs.js`.
- `.ds-bottom-nav-spacer` blok kosong setinggi bar, untuk akhir halaman.

## Usage

- Pakai 3 sampai 5 item. Dua item adalah toggle (pakai [Segmented control](./segmented-control.md)), enam atau lebih tidak muat di layar 320px.
- Selalu tampilkan ikon dan label bersama. Bar hanya berikon membingungkan.
- Pertahankan item yang sama dengan urutan yang sama di setiap layar aplikasi.
- Label: satu kata, paling banyak 10 karakter. Label lebih panjang dipotong dengan ellipsis, jadi periksa juga teks Indonesia.
- Badge: tampilkan angka sampai 99 (`99+` jika lebih); pakai titik bila angkanya tidak penting.
- Halaman perlu padding bawah sebesar bar: tambahkan `<div class="ds-bottom-nav-spacer"></div>` di akhir konten.
- Jangan sembunyikan tujuan bar di balik item "Lainnya" bila sidebar lebih cocok untuk tugasnya.

## Accessibility

- Bar adalah `<nav>` dengan accessible name. Item berupa link atau tombol dengan teks terlihat, jadi tidak perlu label tambahan.
- Badge bersifat dekoratif (`aria-hidden`); letakkan maknanya di teks visually hidden dalam label ("Pesan, 3 belum dibaca").
- Tandai item aktif dengan `aria-current="page"`. Item tombol diperbarui oleh skrip saat diklik; item link oleh server.
- Area sentuh setinggi 64px dan tiap item selebar minimal 64px di layar 320px; pada 5 item lebar tiap item seperlima layar.
- Kontras: label 4,5:1 atau lebih di kedua tema; state aktif memakai ketebalan, warna, dan pil sekaligus.
- Safe area: `padding-block-end: env(safe-area-inset-bottom)` dan inset kiri/kanan pada mode landscape.

| Tombol | Aksi |
| --- | --- |
| Tab / Shift+Tab | Berpindah antar item |
| Enter / Space | Mengaktifkan item |

Motion: pil bergerak dengan `--ds-ease-spring` selama `--ds-duration-spring` tanpa overshoot dan mulai dari posisinya saat ini jika terputus. Hide on scroll berupa transform 220ms. Pada reduced motion pil langsung berpindah dan bar tidak meluncur.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-bottom-nav` | Membuat pil yang bergeser; item tombol menetapkan `aria-current` saat diklik |
| `data-ds-hide-on-scroll` | Sembunyi saat gulir ke bawah (setelah tinggi bar dikali 1,5), tampil saat gulir ke atas |

Event: `ds:bottomnav:change` dengan `detail.item` saat item tombol dipilih.

## Tokens

`--color-base-100`, `--color-base-300`, `--color-error`, `--color-error-content`, `--ds-subtle`, `--ds-quiet`, `--ds-z-sticky`, `--ds-radius-full`, `--ds-radius-lg`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-primary-soft`, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-duration-enter`, `--ds-duration-spring`, `--ds-ease-emphasized`, `--ds-ease-spring`.

## Native and daisyUI

`<nav>` biasa dengan link atau tombol. Komponen ini menggantikan `dock` milik daisyUI; jangan dipadukan. Tambahkan `viewport-fit=cover` pada meta tag viewport agar inset safe area punya nilai di perangkat berponi.
