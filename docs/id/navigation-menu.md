---
title: Navigation menu
group: components
category: navigation
order: 4
summary: Navigasi situs dengan panel dropdown dan mega. Terbuka lewat klik atau hover intent, highlight bergeser mengikuti pointer, dukungan keyboard penuh, menumpuk di container sempit.
---

Navigation menu adalah daftar horizontal tujuan tingkat atas, dengan sebagian entri membuka panel link terkait: dropdown berisi 4 sampai 8 link, atau mega panel dengan kolom berkelompok dan blok unggulan. Pakai untuk situs pemasaran, dokumentasi, dan situs produk dengan struktur dalam. Untuk aplikasi dengan sampai 6 link rata pakai [Navbar](./navbar.md); untuk daftar aksi pakai [Dropdown menu](./dropdown-menu.md) (itu menu perintah, bukan navigasi).

Komponen ini mengikuti pola **disclosure navigation** WAI-ARIA: trigger panel berupa tombol dengan `aria-expanded`, dan panel berisi link biasa. Ini bukan ARIA `menu`, sehingga screen reader tetap memperlakukan link sebagai link.

## Examples

### Panel dropdown dan mega

Arahkan mouse ke sebuah trigger: panel terbuka setelah jeda singkat dan highlight bergeser antar trigger. Berpindah ke trigger di sebelahnya langsung mengganti panel, dan panel baru masuk dari sisi arah perpindahan. Klik mengunci panel tetap terbuka; Escape menutupnya.

```html preview title="Navigation menu"
<nav class="ds-nav-menu" aria-label="Situs" data-ds-nav-menu style="min-height:22rem">
  <ul class="ds-nav-menu__list">
    <li class="ds-nav-menu__item">
      <button type="button" class="ds-nav-menu__trigger" id="nm-prod-btn" aria-expanded="false" aria-controls="nm-prod">Produk<svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"/></svg></button>
      <div class="ds-nav-menu__panel is-wide" id="nm-prod" hidden>
        <div class="ds-nav-menu__grid" style="grid-template-columns:1.1fr 1fr 1fr">
          <a class="ds-nav-menu__feature" href="#"><strong>Invoicing 3.0</strong><span class="ds-nav-menu__desc">Faktur berulang, aturan pajak untuk 14 negara, dan pencocokan bank.</span></a>
          <ul class="ds-nav-menu__group">
            <li class="ds-nav-menu__heading">Penagihan</li>
            <li><a class="ds-nav-menu__entry" href="#"><span class="ds-nav-menu__title">Faktur</span><span class="ds-nav-menu__desc">Terbitkan dan lacak pembayaran</span></a></li>
            <li><a class="ds-nav-menu__entry" href="#"><span class="ds-nav-menu__title">Penawaran</span><span class="ds-nav-menu__desc">Kirim, tanda tangani, konversi</span></a></li>
          </ul>
          <ul class="ds-nav-menu__group">
            <li class="ds-nav-menu__heading">Operasional</li>
            <li><a class="ds-nav-menu__entry" href="#"><span class="ds-nav-menu__title">Proyek</span><span class="ds-nav-menu__desc">Rencanakan pekerjaan dan anggaran</span></a></li>
            <li><a class="ds-nav-menu__entry" href="#" aria-current="page"><span class="ds-nav-menu__title">Laporan</span><span class="ds-nav-menu__desc">Dasbor dan ekspor</span></a></li>
          </ul>
        </div>
      </div>
    </li>
    <li class="ds-nav-menu__item">
      <button type="button" class="ds-nav-menu__trigger" id="nm-res-btn" aria-expanded="false" aria-controls="nm-res">Sumber daya<svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"/></svg></button>
      <div class="ds-nav-menu__panel" id="nm-res" hidden>
        <ul class="ds-nav-menu__group">
          <li><a class="ds-nav-menu__entry" href="#"><span class="ds-nav-menu__title">Dokumentasi</span><span class="ds-nav-menu__desc">Panduan dan referensi API</span></a></li>
          <li><a class="ds-nav-menu__entry" href="#"><span class="ds-nav-menu__title">Changelog</span><span class="ds-nav-menu__desc">Rilis bulan ini</span></a></li>
          <li><a class="ds-nav-menu__entry" href="#"><span class="ds-nav-menu__title">Status</span><span class="ds-nav-menu__desc">Uptime dan insiden</span></a></li>
        </ul>
      </div>
    </li>
    <li class="ds-nav-menu__item"><a class="ds-nav-menu__trigger" href="#" aria-current="page">Harga</a></li>
    <li class="ds-nav-menu__item"><a class="ds-nav-menu__trigger" href="#">Pelanggan</a></li>
    <li class="ds-nav-menu__item"><a class="ds-nav-menu__trigger" href="#" aria-disabled="true" title="Segera hadir">Mitra</a></li>
  </ul>
</nav>
```

## States

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak ada | label `--ds-subtle` |
| Hover | mouse di atas trigger | label menjadi `--color-base-content`; highlight (tint 6%) bergeser ke sana |
| Pressed | pointer ditekan | tint 10% |
| Focus-visible | fokus keyboard | ring `--ds-focus` 2px; highlight juga mengikuti fokus keyboard |
| Expanded | `aria-expanded="true"` | chevron berputar 180°, panel terbuka, highlight tetap di trigger |
| Current | `aria-current="page"` (link, trigger, atau entri panel) | label kontras penuh dengan tanda primary 2px di bawahnya; entri mendapat isian tonal dan judul teal |
| Disabled | `aria-disabled="true"` | opasitas 55%, kursor `not-allowed` |
| Panel enter | membuka | opasitas dan pergeseran ke bawah 5px selama 220ms; menyamping 24px saat berpindah dari trigger tetangga |
| Panel exit | menutup | opasitas selama 140ms |
| Narrow (di bawah 40rem) | lebar container menu | trigger menumpuk, panel terbuka sebaris di bawah triggernya, tanpa highlight |
| Without JavaScript | `data-ds-ready` tidak diset | trigger tetap punya tint hover; panel butuh skrip untuk terbuka |

## Anatomy

- `nav.ds-nav-menu[data-ds-nav-menu]` root dengan accessible name.
- `.ds-nav-menu__list` dan `.ds-nav-menu__item` daftar tingkat atas.
- `.ds-nav-menu__trigger` berupa `<button aria-expanded aria-controls>` untuk panel, atau `<a>` untuk tujuan biasa.
- `.ds-nav-menu__panel` panel mengambang (`hidden` saat tertutup; `is-wide` untuk 40rem).
- `.ds-nav-menu__grid` kolom, `.ds-nav-menu__group` daftar dengan `.ds-nav-menu__heading`.
- `.ds-nav-menu__entry` link dengan `.ds-nav-menu__title` dan `.ds-nav-menu__desc`.
- `.ds-nav-menu__feature` blok yang disorot.
- `.ds-nav-menu__indicator` highlight yang bergeser, dibuat oleh skrip.

## Usage

- Pakai 3 sampai 7 item tingkat atas dan paling banyak 8 link per dropdown. Mega panel memuat sampai 3 grup berisi 4 link.
- Beri setiap entri judul 1 sampai 3 kata dan, bila membantu, satu deskripsi pendek paling banyak 8 kata.
- Label tingkat atas menamai area ("Produk"), bukan aksi.
- Jangan menyarangkan panel di dalam panel. Jangan taruh kontrol formulir di dalam panel.
- Trigger tingkat atas sebuah panel bukan link. Bila area punya halaman ringkasan, jadikan entri pertama.
- Sediakan link yang sama di footer atau di halaman ringkasan bagi pengguna yang tidak bisa memakai panel hover.
- Jangan pakai navigation menu untuk perintah (Hapus, Ekspor): pakai [Dropdown menu](./dropdown-menu.md).

## Accessibility

- Trigger adalah tombol dengan `aria-expanded` dan `aria-controls`. Panel adalah container link biasa; fokus tetap di trigger saat panel terbuka lewat Enter atau Space.
- Hover intent hanya berlaku untuk pointer mouse (bukan sentuh atau pen): 90ms untuk membuka, 250ms untuk menutup, tanpa jeda saat berpindah dari tetangga yang terbuka. Panel punya jembatan tak terlihat di atas celah agar pointer bisa berpindah ke panel.
- Panel yang dibuka lewat hover menutup saat pointer keluar; mengeklik triggernya mengunci panel tetap terbuka. Panel yang dibuka lewat klik atau keyboard tetap terbuka sampai Escape, klik di luar, atau fokus keluar.
- Fokus keluar dari menu menutupnya. Escape menutup panel yang terbuka dan mengembalikan fokus ke triggernya.
- Panel tetap berada di dalam viewport (digeser sebesar kelebihannya, margin 8px) dan berbalik mengikuti arah penulisan.
- Kontras: 4,5:1 untuk label, deskripsi memakai `--ds-subtle`; current ditandai garis bawah dan tint, bukan hanya warna.

| Tombol | Aksi |
| --- | --- |
| Tab / Shift+Tab | Berpindah antar trigger dan, saat panel terbuka, ke link di dalamnya |
| Enter / Space | Membuka atau menutup panel sebuah trigger (fokus tetap di sana) |
| Arrow Down | Pada trigger: membuka panelnya dan memfokuskan link pertama. Di panel: link berikutnya |
| Arrow Up | Di panel: link sebelumnya; dari link pertama, kembali ke trigger |
| Arrow Right / Left | Pada trigger atau di panel: item tingkat atas berikutnya atau sebelumnya (dibalik pada halaman kanan-ke-kiri); membuka panelnya bila ada |
| Home / End | Pada trigger: item tingkat atas pertama atau terakhir. Di panel: link pertama atau terakhir |
| Escape | Menutup panel dan mengembalikan fokus ke triggernya |

Motion: panel masuk 220ms pada `--ds-ease-emphasized`, keluar 140ms; highlight bergerak dengan `--ds-ease-spring`. Pada reduced motion panel hanya memudar dan highlight langsung berpindah.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-nav-menu` | Pada `<nav>`: menghubungkan trigger, panel, hover intent, keyboard, dan highlight |

Event (naik dari root): `ds:navmenu:open` dan `ds:navmenu:close`, keduanya dengan `detail.trigger` dan `detail.panel`. Panggil `DS.init(root)` setelah menyisipkan menu.

## Tokens

`--ds-popover`, `--color-base-300`, `--color-base-100`, `--color-base-200`, `--color-base-content`, `--color-primary`, `--ds-subtle`, `--ds-quiet`, `--ds-shadow-panel`, `--ds-radius-card`, `--ds-radius-lg`, `--ds-z-menu`, `--ds-enter-offset`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-primary-soft`, `--ds-duration-enter`, `--ds-duration-exit`, `--ds-duration-spring`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-ease-spring`, `--ds-type-eyebrow-*`.

## Native and daisyUI

Dibangun dari `<nav>`, daftar, tombol, dan link; tanpa class `menu` atau `dropdown` daisyUI, karena itu untuk daftar perintah dan dropdown fokus berbasis CSS. Letakkan menu di dalam [Navbar](./navbar.md) sebagai pengganti `.ds-navbar__nav` bila situs membutuhkan panel; di dalam menu navbar yang sempit, menu menumpuk sebagai accordion.
