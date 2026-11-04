---
title: Breadcrumb
group: components
category: navigation
order: 5
summary: Menunjukkan posisi halaman saat ini dalam hierarki. Pemisah slash atau chevron, label panjang dipotong, dan menu tengah yang diciutkan di container sempit.
source: TPS app.css .master-breadcrumb L1391–1403
---

Breadcrumb menunjukkan jalur dari puncak situs atau aplikasi ke halaman saat ini, satu link per tingkat, dan memungkinkan pengguna melompat ke atas. Pakai bila struktur sedalam minimal tiga tingkat (Proyek / PRJ-1024 / Faktur). Breadcrumb menampilkan jalur hierarki, bukan riwayat penjelajahan, dan bukan pengganti tombol kembali atau [Navbar](./navbar.md). Untuk langkah sebuah proses pakai [Stepper](./stepper.md).

Item terakhir adalah halaman saat ini, berupa teks biasa dengan `aria-current="page"`. Link memakai warna subtle dengan garis bawah 1px yang menggelap saat hover, sehingga tidak pernah hanya mengandalkan warna.

## Examples

### Pemisah slash dan chevron

Pemisah digambar oleh CSS, jadi tidak dibacakan dan bukan bagian dari markup. Slash adalah default; `is-chevron` memakai chevron yang dicerminkan pada halaman kanan-ke-kiri.

```html preview title="Pemisah"
<nav class="ds-breadcrumb" aria-label="Jejak navigasi">
  <ol>
    <li><a href="#">Proyek</a></li>
    <li><a href="#">PRJ-1024</a></li>
    <li><a href="#" aria-current="page">Faktur</a></li>
  </ol>
</nav>
<nav class="ds-breadcrumb is-chevron" aria-label="Jejak navigasi (chevron)" style="margin-top:1.5rem">
  <ol>
    <li><a href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-home"/></svg><span class="ds-visually-hidden">Beranda</span></a></li>
    <li><a href="#">Pelanggan</a></li>
    <li><a href="#">Okafor Trading</a></li>
    <li><span aria-current="page">INV-2026-0418</span></li>
  </ol>
</nav>
```

### Label panjang

Setiap item dipotong pada 16rem dengan ellipsis. Letakkan teks lengkap di `title`; accessible name selalu berisi teks lengkap.

```html preview title="Label terpotong"
<nav class="ds-breadcrumb is-chevron" aria-label="Jejak navigasi (panjang)">
  <ol>
    <li><a href="#">Proyek</a></li>
    <li><a href="#" title="Pembaruan pedoman merek tahunan untuk wilayah Asia Tenggara">Pembaruan pedoman merek tahunan untuk wilayah Asia Tenggara</a></li>
    <li><span aria-current="page" title="Wireframe, putaran 3 (disetujui oleh Sofia Marquez)">Wireframe, putaran 3 (disetujui oleh Sofia Marquez)</span></li>
  </ol>
</nav>
```

### Bagian tengah diciutkan

Dengan `is-collapsible`, item bertanda `data-collapsible` diganti tombol "..." saat container breadcrumb lebih sempit dari 36rem. Tombol itu membuka tingkat yang tersembunyi dalam menu kecil. Aturannya memakai lebar container, jadi juga berfungsi di kolom sempit pada halaman lebar. Seret preview agar lebih sempit, atau buka halaman ini di ponsel.

```html preview title="Breadcrumb yang menciut" 
<div style="max-width:22rem;border:1px dashed var(--color-base-300);padding:0.75rem;border-radius:0.5rem">
<nav class="ds-breadcrumb is-collapsible is-chevron" aria-label="Jejak navigasi (menciut)">
  <ol>
    <li><a href="#">Beranda</a></li>
    <li class="ds-breadcrumb__collapse">
      <details class="ds-breadcrumb__more" data-ds-popdown>
        <summary aria-label="Tampilkan tingkat tersembunyi"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"/></svg></summary>
        <ul class="ds-breadcrumb__menu">
          <li><a href="#">Proyek</a></li>
          <li><a href="#">Pembaruan merek</a></li>
          <li><a href="#">Hasil kerja</a></li>
        </ul>
      </details>
    </li>
    <li data-collapsible><a href="#">Proyek</a></li>
    <li data-collapsible><a href="#">Pembaruan merek</a></li>
    <li data-collapsible><a href="#">Hasil kerja</a></li>
    <li><a href="#" aria-current="page">Wireframe</a></li>
  </ol>
</nav>
</div>
```

## States

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Link rest | tidak ada | teks `--ds-subtle`, garis bawah 35% |
| Link hover | pointer di atas link | teks `--color-base-content`, garis bawah penuh |
| Link pressed | pointer ditekan | teks `--color-base-content` |
| Link focus-visible | fokus keyboard | ring `--ds-focus` 2px |
| Current | item terakhir, `aria-current="page"` | `--color-base-content`, ketebalan 600, tanpa garis bawah, bukan link |
| Truncated | label lebih lebar dari 16rem (10rem saat diciutkan) | ellipsis, teks lengkap di `title` |
| Collapsed | container lebih sempit dari 36rem dengan `is-collapsible` | tingkat tengah diganti tombol "..." |
| Menu open / closed | `[open]` pada `details` | menu masuk dengan opasitas dan pergeseran 5px selama 160ms; menutup lewat Escape, klik di luar, atau memilih link |

## Anatomy

- `nav.ds-breadcrumb` root. Modifier: `is-chevron`, `is-collapsible`.
- `ol > li` satu tingkat per item. Halaman saat ini punya `aria-current="page"` pada link atau span-nya.
- `li[data-collapsible]` tingkat yang dilipat ke dalam menu.
- `li.ds-breadcrumb__collapse` memuat `details.ds-breadcrumb__more[data-ds-popdown]` dengan `summary` dan `ul.ds-breadcrumb__menu`; disembunyikan sampai container menyempit.

## Usage

- Mulai dari akar bagian, tidak harus dari "Beranda". Tampilkan 2 sampai 5 tingkat.
- Label adalah judul halaman, dalam sentence case. Pakai ikon untuk Beranda hanya bila disertai label visually hidden.
- Jangan beri link pada halaman saat ini. Jangan ulangi judul halaman tepat di bawahnya sebagai jalur kedua.
- Ciutkan bagian tengah, jangan pernah tingkat pertama atau terakhir: akar dan induk tetap terlihat.
- Render tingkat yang tersembunyi dua kali di markup (sebaris dan di menu). Salinan tersembunyi berupa `display: none`, sehingga screen reader membaca tiap tingkat sekali.
- Jangan pakai breadcrumb pada halaman sedalam satu atau dua tingkat.

## Accessibility

- Landmark `<nav>` bernama "Breadcrumb" (dilokalkan) berisi daftar berurutan: screen reader mengumumkan posisi dalam daftar.
- Halaman saat ini ditandai dengan `aria-current="page"`.
- Tombol "..." adalah `<summary>` dengan `aria-label="Tampilkan tingkat tersembunyi"` dan bekerja sebagai disclosure native; Escape menutupnya dan mengembalikan fokus ke tombol itu.
- Target link setinggi minimal 24px dan 44px pada layar sentuh (tombol "...").
- Kontras: link 4,5:1 di kedua tema; pemisah memakai `--ds-muted` dan bersifat dekoratif.

| Tombol | Aksi |
| --- | --- |
| Tab / Shift+Tab | Berpindah antar link dan tombol "..." |
| Enter / Space | Membuka link; membuka atau menutup tingkat tersembunyi |
| Escape | Menutup menu tingkat tersembunyi yang terbuka |

## Razor

```cshtml
<ds-breadcrumb separator="chevron" collapse="true">
    <ds-breadcrumb-item href="/" icon="home">Beranda</ds-breadcrumb-item>
    <ds-breadcrumb-item href="/projects">Proyek</ds-breadcrumb-item>
    <ds-breadcrumb-item href="/projects/PRJ-1024">PRJ-1024</ds-breadcrumb-item>
    <ds-breadcrumb-item>Faktur</ds-breadcrumb-item>
</ds-breadcrumb>
```

Item terakhir selalu halaman saat ini. Dengan `collapse` (default true) dan lebih dari 3 item, tag helper menulis markup yang bisa diciutkan. `label` menimpa nama landmark; `separator` bernilai `slash` (default) atau `chevron`.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `details[data-ds-popdown]` | Menu tingkat tersembunyi menutup lewat Escape, tekanan pointer di luar, fokus keluar, dan saat link di dalamnya dipilih |

Penciutan itu sendiri adalah CSS (container query); tidak perlu skrip.

## Tokens

`--ds-subtle`, `--ds-muted`, `--color-base-content`, `--color-base-300`, `--ds-popover`, `--ds-shadow-menu`, `--ds-radius-xs`, `--ds-radius-md`, `--ds-radius-box`, `--ds-z-menu`, `--ds-enter-offset`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-duration-fast`, `--ds-duration-quick`, `--ds-ease-emphasized`.

## Native and daisyUI

`<nav>` dengan `<ol>`, sesuai pola breadcrumb WAI-ARIA. Class `breadcrumbs` milik daisyUI tidak dipakai. Markup v1 (`<nav class="ds-breadcrumb"><ol>` dengan `<li aria-current="page">` pada item terakhir) tetap berfungsi, dengan state truncation dan hover yang baru.
