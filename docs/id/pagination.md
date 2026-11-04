---
title: Pagination
group: components
category: navigation
order: 6
summary: Halaman bernomor dengan elipsis, sebelumnya/berikutnya, pertama/terakhir, bentuk ringkas untuk mobile, plus partial footer daftar dan select ukuran halaman.
source: TPS _Pager, _PtPager, .master-pagination (unified)
---

Pagination berpindah antarhalaman pada kumpulan hasil yang dipecah menjadi beberapa halaman. Pakai pagination bernomor (`.ds-pagination`) saat pengguna perlu melompat ke halaman tertentu atau perlu gambaran ukuran data, misalnya 24 halaman pada daftar faktur. Pakai **list footer** (`_DsPager`) di bawah tabel, tempat teks rentang ("21–40 dari 128 faktur") dan tombol sebelumnya / berikutnya sudah cukup. Untuk feed panjang yang posisinya tidak penting, pilih "Muat lebih banyak" atau infinite scroll dengan akhir yang terlihat. Pagination mengganti halaman lewat link, sehingga berfungsi tanpa JavaScript, bisa di-bookmark, dan menjaga filter tetap di URL.

## Examples

### Numbered, with ellipsis

Angka berupa link. Halaman saat ini memakai `aria-current="page"`. Elipsis mewakili rentang yang dilewati; secara default helper menyisakan 1 halaman di tiap ujung dan 1 halaman di kiri dan kanan halaman saat ini.

```html preview title="Pagination bernomor (halaman 8 dari 24)"
<nav class="ds-pagination" aria-label="Penomoran halaman">
  <ul class="ds-pagination__list">
    <li><a class="ds-pagination__link is-prev" href="#" rel="prev" aria-label="Sebelumnya"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"/></svg><span>Sebelumnya</span></a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Ke halaman 1">1</a></li>
    <li class="ds-pagination__gap" aria-hidden="true">…</li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Ke halaman 7">7</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-current="page" aria-label="Halaman 8">8</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Ke halaman 9">9</a></li>
    <li class="ds-pagination__gap" aria-hidden="true">…</li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Ke halaman 24">24</a></li>
    <li class="ds-pagination__summary">Halaman 8 dari 24</li>
    <li><a class="ds-pagination__link is-next" href="#" rel="next" aria-label="Berikutnya"><span>Berikutnya</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"/></svg></a></li>
  </ul>
</nav>
```

### First and last, outline, sizes

Tombol pertama dan terakhir (`.ds-pagination__edge`) berguna pada kumpulan lebih dari 20 halaman. `is-outline` memberi setiap link garis tepi tipis. `is-sm` setinggi 32px, `is-lg` 44px; defaultnya 36px.

```html preview title="Edge, outline, kecil"
<nav class="ds-pagination is-outline is-sm" aria-label="Penomoran halaman (outline)">
  <ul class="ds-pagination__list">
    <li class="ds-pagination__edge"><a class="ds-pagination__link is-first" aria-disabled="true" aria-label="Halaman pertama"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-left"/></svg></a></li>
    <li><a class="ds-pagination__link is-prev" aria-disabled="true" aria-label="Sebelumnya"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"/></svg><span>Sebelumnya</span></a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-current="page" aria-label="Halaman 1">1</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Ke halaman 2">2</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Ke halaman 3">3</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Ke halaman 4">4</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Ke halaman 5">5</a></li>
    <li class="ds-pagination__gap" aria-hidden="true">…</li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Ke halaman 12">12</a></li>
    <li class="ds-pagination__summary">Halaman 1 dari 12</li>
    <li><a class="ds-pagination__link is-next" href="#" rel="next" aria-label="Berikutnya"><span>Berikutnya</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"/></svg></a></li>
    <li class="ds-pagination__edge"><a class="ds-pagination__link is-last" href="#" aria-label="Halaman terakhir"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevrons-right"/></svg></a></li>
  </ul>
</nav>
```

### Compact (narrow containers)

Di bawah lebar container 32rem (ponsel, atau card yang sempit) angka dan tombol pertama/terakhir disembunyikan, lalu "Halaman 8 dari 24" tampil di antara sebelumnya dan berikutnya. `is-simple` memaksa bentuk ini di lebar berapa pun.

```html preview title="Bentuk ringkas (is-simple)"
<nav class="ds-pagination is-simple" aria-label="Penomoran halaman (ringkas)">
  <ul class="ds-pagination__list">
    <li><a class="ds-pagination__link is-prev" href="#" rel="prev" aria-label="Sebelumnya"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"/></svg><span>Sebelumnya</span></a></li>
    <li class="ds-pagination__summary">Halaman 8 dari 24</li>
    <li><a class="ds-pagination__link is-next" href="#" rel="next" aria-label="Berikutnya"><span>Berikutnya</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"/></svg></a></li>
  </ul>
</nav>
```

### List footer and page size

`_DsPager` merender footer daftar: rentang di kiri, sebelumnya / halaman / berikutnya di kanan. `_DsPageSize` adalah select jumlah baris per halaman di dalam form GET milik daftar; select ini terkirim saat nilainya berubah. Keduanya partial sisi server, ditampilkan di sini sebagai HTML-nya.

```html preview title="Footer pager dan ukuran halaman"
<div style="border:1px solid var(--color-base-300);border-radius:0.75rem;background:var(--color-base-100)">
  <div style="padding:1rem">
    <label class="ds-page-size"><span>Tampilkan</span>
      <select class="select select-sm" aria-label="Data per halaman"><option>10</option><option selected>20</option><option>50</option><option>100</option></select>
      <span>data per halaman</span></label>
  </div>
  <footer class="ds-pager">
    <p role="status">21–40 dari 128 faktur</p>
    <nav aria-label="Penomoran halaman (daftar)">
      <a class="btn btn-ghost btn-sm" href="#" rel="prev"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"/></svg> Sebelumnya</a>
      <span class="ds-num">Halaman 2 dari 7</span>
      <a class="btn btn-ghost btn-sm" href="#" rel="next">Berikutnya <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"/></svg></a>
    </nav>
  </footer>
</div>
```

## States

```html preview title="Saat ini, ujung nonaktif; hover dan fokus muncul lewat interaksi"
<nav class="ds-pagination" aria-label="Penomoran halaman (state)">
  <ul class="ds-pagination__list">
    <li><a class="ds-pagination__link is-prev" aria-disabled="true" aria-label="Sebelumnya"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"/></svg><span>Sebelumnya</span></a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-current="page" aria-label="Halaman 1">1</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Ke halaman 2">2</a></li>
    <li class="ds-pagination__page"><a class="ds-pagination__link" href="#" aria-label="Ke halaman 3">3</a></li>
    <li class="ds-pagination__summary">Halaman 1 dari 3</li>
    <li><a class="ds-pagination__link is-next" href="#" aria-label="Berikutnya"><span>Berikutnya</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"/></svg></a></li>
  </ul>
</nav>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak ada | teks `--color-base-content`, tanpa isian atau border (outline: border tipis) |
| Hover | pointer di atas link | tint 6% |
| Pressed | pointer ditekan | tint 10% |
| Focus-visible | fokus keyboard | focus ring `--ds-focus` 2px |
| Current | `aria-current="page"` | isian primary tonal, teks `--ds-quiet`, border 1px bernuansa primary, bobot 700; tidak bisa diklik |
| Disabled end | `aria-disabled="true"` pada sebelumnya atau berikutnya di halaman pertama atau terakhir | opasitas 45%, kursor `not-allowed`, tanpa `href`, tidak bisa difokus |
| Ellipsis | `.ds-pagination__gap` | teks `--ds-muted`, `aria-hidden` |
| Compact | container di bawah 32rem, atau `is-simple` | angka disembunyikan, "Halaman n dari N" ditampilkan |
| Empty | satu halaman atau kurang | tag helper tidak merender apa pun |

## Anatomy

- `nav.ds-pagination` root dengan nama yang dapat diakses. Modifier: `is-outline`, `is-simple`, `is-sm`, `is-lg`.
- `ul.ds-pagination__list`, satu `li` untuk setiap kontrol.
- `.ds-pagination__link` link apa pun; `is-prev`, `is-next`, `is-first`, `is-last` untuk panah.
- `li.ds-pagination__page` halaman bernomor; `li.ds-pagination__edge` pertama atau terakhir; `li.ds-pagination__gap` elipsis; `li.ds-pagination__summary` teks "Halaman n dari N" untuk mode compact.
- List footer: `footer.ds-pager` dengan `p` (rentang) dan `nav`; `label.ds-page-size` dengan `select`.

## Usage

- Tampilkan paling banyak 7 slot angka di desktop: pertama, terakhir, saat ini, satu di tiap sisi, dan dua elipsis.
- Letakkan pagination di bawah daftar, rata dengan ujung tabel atau di tengah di bawah grid.
- Pertahankan filter dan urutan di link halaman; mengubah filter kembali ke halaman 1. Jangan pernah berpindah halaman lewat POST.
- Sebelumnya dan berikutnya selalu ada; nonaktifkan di ujung, jangan dihapus, agar tata letak tidak bergeser.
- Ukuran halaman: 10, 20, 50, dan 100. Simpan pilihan di URL (`size=20`).
- Jangan pakai pagination untuk kurang dari 2 halaman. Jangan paginasi daftar yang bisa difilter hingga muat satu layar.
- Selalu beri tahu pengguna posisinya dalam kumpulan data: teks rentang, atau "Halaman 8 dari 24".

## Accessibility

- Landmark `<nav>` dengan nama ("Penomoran halaman", dilokalkan). Jika satu halaman memiliki dua pagination, beri masing-masing label yang berbeda.
- Setiap link angka punya nama yang dapat diakses ("Ke halaman 9"); halaman saat ini terbaca "Halaman 8" dan memakai `aria-current="page"`.
- `rel="prev"` dan `rel="next"` pada panah membantu crawler dan teknologi bantu.
- Ujung yang nonaktif bukan link (tanpa `href`), sehingga keluar dari urutan tab dan dibaca sebagai teks tidak tersedia.
- Target berukuran 36px (32px untuk kecil) dan 44px di layar sentuh.
- Teks rentang di footer memakai `role="status"`, sehingga screen reader mengumumkan rentang baru setelah halaman dimuat tanpa reload.

| Tombol | Aksi |
| --- | --- |
| Tab / Shift+Tab | Berpindah antar link halaman |
| Enter | Membuka link |

## Razor

```cshtml
@* Numbered pagination: links keep the current query and set ?page=n *@
<ds-pagination page="Model.Rows.Page" page-count="Model.Rows.PageCount" edges />

@* Path URLs instead of a query string *@
<ds-pagination page="3" page-count="12" href-template="/invoices/page/{0}" outline size="sm" />

@* Compact only *@
<ds-pagination page="3" page-count="12" simple />

@* List footer and page size (existing partials) *@
<form method="get" data-ds-autosubmit>
    <partial name="_DsPageSize" model="Model.Rows.PageSize" />
</form>
<partial name="_DsPager" model="Model.Rows.Pager("invoices")" />
```

| Atribut | Efek |
| --- | --- |
| `page`, `page-count` | Halaman saat ini (mulai dari 1) dan jumlah halaman |
| `href-template` | URL dengan `{0}` untuk halaman; default: URL saat ini dengan `page=n` (`page` dihilangkan untuk halaman 1) |
| `siblings`, `boundaries` | Halaman di samping halaman saat ini (1) dan di tiap ujung (1) |
| `edges` | Tombol halaman pertama dan terakhir |
| `simple`, `outline`, `size` | Bentuk compact, link berborder, `sm` atau `lg` |
| `label` | Menimpa nama landmark |

`PageRange.Compute(page, pageCount, siblings, boundaries)` mengembalikan angka dengan `null` di tempat elipsis, untuk markup kustom.

## JavaScript

Tidak ada. Pagination adalah link; select ukuran halaman terkirim lewat perilaku `data-ds-autosubmit` pada form.

## Tokens

`--color-primary`, `--color-base-content`, `--color-base-100`, `--color-base-300`, `--ds-quiet`, `--ds-subtle`, `--ds-muted`, `--ds-focus`, `--ds-radius-lg`, `--ds-space-card-x`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-primary-soft`, `--ds-opacity-pager-disabled`, `--ds-duration-fast`, `--ds-ease-standard`.

## Native and daisyUI

Link dalam daftar di dalam `<nav>`. Class `join` dan `btn` milik daisyUI tidak dipakai untuk bentuk bernomor; partial footer tetap memakai `btn btn-ghost btn-sm`, dan select ukuran halaman adalah `select select-sm` milik daisyUI.
