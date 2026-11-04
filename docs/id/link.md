---
title: Link
group: components
category: actions
order: 8
summary: Teks yang menavigasi. Inline, mandiri dengan panah, eksternal dengan ikon dan catatan tersembunyi, aktif, nonaktif, dan sudah dikunjungi pada teks panjang.
source: TPS app.css .ds-link, .ds-link-ref
---

Link menuju suatu tempat: halaman lain, bagian, berkas, atau situs lain. Ia adalah `<a href>`. Pakai [button](./button.md) untuk aksi yang mengubah data atau tampilan saat ini, walau tampak seperti teks (`btn-link`), dan [komponen navigasi](./breadcrumb.md) untuk penunjuk arah tingkat situs.

## Contoh

### Inline

Link inline berada di dalam kalimat. Warnanya mengikuti teks dan selalu bergaris bawah, sehingga warna bukan satu-satunya petunjuk. Hover menebalkan garis bawah dari 1px ke 2px.

```html preview title="Inline"
<p style="max-width:34rem">Faktur <a class="ds-link" href="#">INV-2026-0418</a> dikirim ke Ayu Lestari pada 14 Maret. Baca <a class="ds-link" href="#">ketentuan pembayaran</a> atau hubungi <a class="ds-link" href="#">dukungan penagihan</a> bila ada yang tampak keliru.</p>
```

### Aksen dan halus

`is-accent` memakai warna link teal. `is-subtle` melembutkan link di teks padat atau sekunder.

```html preview title="Aksen dan halus"
<div style="display:grid;gap:.5rem;max-width:34rem">
  <p>Buka <a class="ds-link is-accent" href="#">linimasa proyek</a> untuk melihat setiap tonggak.</p>
  <p class="ds-text-subtle">Terakhir diubah oleh Daniel Okafor. <a class="ds-link is-subtle" href="#">Lihat riwayat</a></p>
</div>
```

### Link pengenal

`.ds-link-ref` adalah link biru bergaris bawah untuk pengenal catatan seperti kode proyek dan nomor faktur. Warna biru dikhususkan untuk link.

```html preview title="Link pengenal"
<p>Terkait dengan <a class="ds-link-ref" href="#">PRJ-1024</a> dan <a class="ds-link-ref" href="#">INV-2026-0418</a>.</p>
```

### Mandiri

Link mandiri berdiri sendiri di satu baris sebagai ajakan membaca lebih lanjut. Ia punya panah, tanpa garis bawah saat diam, dan garis bawah saat hover dan fokus. Panah bergeser 2px saat hover.

```html preview title="Mandiri dengan panah"
<div style="display:grid;gap:.75rem;justify-items:start">
  <a class="ds-link is-standalone" href="#">Lihat semua faktur</a>
  <a class="ds-link is-standalone" href="#">Buka panduan integrasi</a>
</div>
```

### Eksternal

Link eksternal terbuka di tab baru, menampilkan ikon panah, dan memberi tahu pembaca layar "(dibuka di tab baru)" lewat teks tersembunyi. Selalu tambahkan `rel="noopener noreferrer"`.

```html preview title="Eksternal"
<p>Baca <a class="ds-link is-external" href="https://developer.mozilla.org/docs/Web/Accessibility" target="_blank" rel="noopener noreferrer">panduan aksesibilitas MDN<span class="ds-visually-hidden"> (dibuka di tab baru)</span></a> untuk rincian.</p>
```

### Aktif

`aria-current="page"` menandai link yang menunjuk ke halaman yang sedang dibuka. Ia menjadi semibold dengan garis bawah aksen 2px.

```html preview title="Aktif"
<nav aria-label="Bagian faktur" class="ds-actions is-start" style="gap:1.25rem">
  <a class="ds-link" href="#" aria-current="page">Ringkasan</a>
  <a class="ds-link" href="#">Baris item</a>
  <a class="ds-link" href="#">Pembayaran</a>
  <a class="ds-link" href="#">Aktivitas</a>
</nav>
```

### Nonaktif

Link nonaktif tidak punya `href`, memakai `role="link"` dan `aria-disabled="true"`. Ia diredupkan, menampilkan `not-allowed`, dan mengabaikan klik. Jelaskan alasannya di teks di dekatnya.

```html preview title="Nonaktif"
<p>Langkah berikutnya: <a class="ds-link" role="link" aria-disabled="true" aria-describedby="why-link" title="Lengkapi data klien dahulu">Pratinjau faktur</a>. <span id="why-link" class="ds-text-subtle">Lengkapi data klien dahulu.</span></p>
```

### Sudah dikunjungi, pada teks panjang

Gaya `:visited` mati secara bawaan. Di dalam prosa, tempat "sudah dibaca" berguna, tambahkan `is-prose` (atau taruh link di wadah `.ds-prose`) dan link yang sudah dikunjungi berubah menjadi ungu redup.

```html preview title="Dikunjungi pada prosa"
<p style="max-width:34rem">Sebelum menerbitkan, baca <a class="ds-link is-prose" href="/id/button">panduan button</a> dan <a class="ds-link is-prose" href="/id/introduction">pengantar</a>. Halaman yang sudah Anda buka berubah warna.</p>
```

## State

```html preview title="State link"
<div style="display:grid;gap:.5rem;justify-items:start">
  <a class="ds-link" href="#">Diam</a>
  <a class="ds-link" href="#" style="text-decoration-thickness:2px">Hover (dibekukan: garis bawah 2px)</a>
  <a class="ds-link" href="#" style="outline:2px solid var(--ds-focus);outline-offset:2px">Focus-visible (dibekukan)</a>
  <a class="ds-link" href="#" aria-current="page">Aktif</a>
  <a class="ds-link" role="link" aria-disabled="true">Nonaktif</a>
  <a class="ds-link is-standalone" href="#">Mandiri</a>
  <a class="ds-link is-external" href="#" target="_blank" rel="noopener noreferrer">Eksternal<span class="ds-visually-hidden"> (dibuka di tab baru)</span></a>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Diam | Tidak ada | Garis bawah 1px, offset 0,2em, warna teks (aksen, halus, atau biru untuk pengenal) |
| Hover | Pointer di atas, pada perangkat yang mendukung hover | Garis bawah menebal ke 2px selama 150ms; link mandiri menampilkan garis bawah dan panah bergeser 2px |
| Focus-visible | Fokus keyboard | Cincin 2px `--ds-focus`, offset 2px, radius kecil |
| Pressed | Pointer ditekan | Opasitas 0,72. Tanpa skala: link adalah teks |
| Dikunjungi | `:visited` dengan `is-prose` atau `.ds-prose` | Ungu redup campuran biru link dan merah error |
| Aktif | `aria-current` selain `false` | Semibold, warna teks dasar, garis bawah aksen 2px |
| Nonaktif | `aria-disabled="true"`, tanpa `href` | Opasitas 55%, tanpa garis bawah, `not-allowed`, klik diabaikan |
| Eksternal | `.is-external` | Ikon panah di belakang, teks tersembunyi "(dibuka di tab baru)" |
| Reduced motion | `prefers-reduced-motion` | Panah tidak bergerak; perubahan garis bawah tetap |
| Forced colours | `forced-colors: active` | Selalu bergaris bawah; ikon memakai `LinkText` |

## Anatomi

- `a.ds-link`: link-nya. Modifier: `is-accent`, `is-subtle`, `is-standalone`, `is-external`, `is-prose`.
- `a.ds-link-ref`: link pengenal versi 1, biru.
- `.ds-visually-hidden`: catatan "dibuka di tab baru" di dalam link eksternal.

## Penggunaan

- Tulis teks link yang bermakna sendiri: "ketentuan pembayaran", bukan "klik di sini". Usahakan 2 sampai 5 kata.
- Beri garis bawah pada setiap link inline. Jangan mengandalkan warna untuk membedakan link dari teks.
- Pakai `target="_blank"` hanya untuk situs atau berkas eksternal yang mengganggu tugas, dan beri tahu pengguna lewat ikon dan teks tersembunyi.
- Pakai link mandiri paling banyak sekali per bagian.
- Jangan pakai link untuk aksi ("Hapus"). Pakai [button](./button.md), atau `btn btn-link` bila harus tampak seperti teks.
- Jangan menonaktifkan link tanpa menjelaskan alasannya; hapus link bila tidak akan pernah tersedia.

## Aksesibilitas

- Link adalah `<a href>`; nama yang bisa diakses adalah teksnya. Tambahkan `aria-current="page"` untuk halaman saat ini, atau `true` untuk langkah saat ini.
- Link nonaktif mempertahankan `role="link"` dan `aria-disabled="true"` agar teknologi bantu tetap membacanya.
- Link eksternal mengumumkan "(dibuka di tab baru)" lewat teks yang disembunyikan secara visual, bukan hanya lewat ikon.
- Kontras: teks link 4,5:1 terhadap halaman di kedua tema; garis bawah memberi petunjuk kedua (WCAG 1.4.1).
- Target: link inline di dalam teks dikecualikan dari aturan 44px; link mandiri setinggi minimal 24px, dan 44px di layar sentuh.

| Tombol | Aksi |
| --- | --- |
| Tab, Shift+Tab | Memindahkan fokus |
| Enter | Mengikuti link |

## Razor

```cshtml
<p>Lihat <ds-link href="@Url.Action("Terms")">ketentuan pembayaran</ds-link>.</p>
<ds-link href="@Url.Action("Index", "Invoices")" standalone>Lihat semua faktur</ds-link>
<ds-link href="https://developer.mozilla.org" external>MDN</ds-link>
<ds-link href="@Url.Action("Overview")" current>Ringkasan</ds-link>
<ds-link disabled>Pratinjau faktur</ds-link>
```

| Atribut | Efek |
| --- | --- |
| `href` | Tujuan. Tanpa itu link ditampilkan sebagai nonaktif |
| `standalone`, `external` | Panah; tab baru dengan ikon dan teks tersembunyi |
| `current`, `disabled`, `prose` | `aria-current="page"`; pola nonaktif; warna dikunjungi |
| `tone` | `accent` atau `subtle` |

## JavaScript

Tidak ada. Klik pada link `aria-disabled` dibatalkan oleh guard bersama di `toggle.js`.

## Token

`--ds-link`, `--ds-quiet`, `--ds-subtle`, `--ds-muted`, `--color-base-content`, `--color-error` (campuran dikunjungi), `--ds-radius-xs`, `--ds-border-focus`, `--ds-focus`, `--ds-opacity-disabled`, `--ds-duration-fast|quick`, `--ds-ease-standard|emphasized`.

## Native dan daisyUI

Link adalah `<a href>` native. `link`, `link-hover`, dan `link-primary` daisyUI tetap berfungsi; `.ds-link` menambah aturan garis bawah, ikon mandiri dan eksternal, state aktif dan nonaktif, serta aturan `:visited` untuk prosa.
