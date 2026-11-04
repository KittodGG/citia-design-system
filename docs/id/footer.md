---
title: Footer
group: components
category: layout
order: 9
summary: Footer yang tenang untuk bagian bawah aplikasi atau halaman: baris legal, tautan, dan untuk footer halaman, kolom tautan berkelompok.
---

Footer menutup halaman dengan hal yang dicari paling akhir: siapa pemilik produk, halaman legal, dan jalan untuk meminta bantuan. Di aplikasi cukup satu baris; di halaman publik pakai tata letak berkelompok. Navigasi yang dipakai terus-menerus ada di [Sidebar](./sidebar.md), bukan di sini.

## Examples

### App footer

Satu baris: teks legal di sisi awal, tautan di sisi akhir. Letaknya di bawah `.ds-shell-main` setelah `main`.

```html preview title="App footer"
<footer class="ds-footer">
  <p class="ds-footer__legal">© 2026 Citia Engineering. Versi 2.0.1</p>
  <ul class="ds-footer__links">
    <li><a href="#">Pusat bantuan</a></li>
    <li><a href="#">Privasi</a></li>
    <li><a href="#">Ketentuan</a></li>
    <li><a href="#">Status</a></li>
  </ul>
</footer>
```

### Page footer

```html preview title="Page footer"
<footer class="ds-footer is-page">
  <div class="ds-footer__brand"><span>Citia</span><p>Proyek, faktur, dan orang dalam satu workspace.</p></div>
  <div class="ds-footer__cols">
    <nav class="ds-footer__group" aria-label="Produk"><h2 class="ds-footer__title">Produk</h2><a href="#">Ringkasan</a><a href="#">Harga</a><a href="#">Catatan perubahan</a></nav>
    <nav class="ds-footer__group" aria-label="Perusahaan"><h2 class="ds-footer__title">Perusahaan</h2><a href="#">Tentang</a><a href="#">Karier</a><a href="#">Kontak</a></nav>
    <nav class="ds-footer__group" aria-label="Legal"><h2 class="ds-footer__title">Legal</h2><a href="#">Privasi</a><a href="#">Ketentuan</a><a href="#">Keamanan</a></nav>
  </div>
  <p class="ds-footer__legal">© 2026 Citia Engineering. Seluruh hak dilindungi.</p>
</footer>
```

## States

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak ada | Teks muted (`--ds-subtle`), garis tipis di atas |
| Hover tautan | Pointer di atas tautan (perangkat hover) | Warna teks ke kontras penuh dan garis bawah |
| Focus-visible tautan | Fokus keyboard | Ring 2px `--ds-focus`, offset 2px |
| Halaman saat ini | `aria-current="page"` pada tautan | Pertahankan garis bawah dan bobot 600 di markup Anda |
| Sempit | Di bawah 640px | Baris legal dan tautan bertumpuk; kolom tautan membungkus menjadi 2 atau 1 |
| Tautan panjang | Label berbahasa Indonesia atau panjang | Membungkus ke baris berikut; tidak ada yang dipotong |
| Cetak | `@media print` | Tetap di akhir halaman |
| Flush | `.is-flush` | Tanpa garis atas, untuk halaman yang sudah berakhir dengan permukaan |

## Anatomy

- `.ds-footer`: bloknya. `.is-page` untuk tata letak berkelompok, `.is-flush` tanpa garis atas.
- `.ds-footer__legal`: hak cipta dan versi.
- `.ds-footer__links`: daftar tautan sebaris (app footer).
- `.ds-footer__brand`: nama dan satu kalimat (page footer).
- `.ds-footer__cols`, `.ds-footer__group`, `.ds-footer__title`: kolom tautan di bawah judul.

## Usage

- App footer: paling banyak 3 sampai 5 tautan; tanpa ikon media sosial.
- Page footer: 2 sampai 4 grup dengan 3 sampai 6 tautan masing-masing, diurutkan menurut seberapa sering dibutuhkan.
- Tulis label tautan sebagai apa yang dibuka ("Privasi", "Ketentuan"), bukan "Klik di sini".
- Jangan mengulang navigasi atas atau menaruh aksi utama di footer.

## Accessibility

- Pakai `<footer>` (landmark `contentinfo` bila anak langsung `body`; di dalam `main` atau kolom shell ia grup biasa, dan itu tidak masalah).
- Tiap grup tautan adalah `nav` dengan `aria-label`; judul grup adalah heading sungguhan (`h2`) agar orang bisa melompat ke sana.
- Tautan menjaga tinggi minimal 24px dan kontras 4,5:1 pada permukaan halaman; garis bawah muncul saat hover dan fokus sehingga warna bukan satu-satunya petunjuk.
- Tanpa gerak.

## Tokens

`--ds-subtle`, `--color-base-content`, `--color-base-300`, `--ds-main-pad-x` (di shell), `--ds-type-eyebrow-*`, `--ds-focus`, `--ds-duration-fast`.

## Native and daisyUI

Dibangun di atas `footer`, `ul`, `nav`, dan `a`. Komponen `footer` daisyUI adalah tabel kolom dengan jarak dan warna sendiri; yang ini lebih tenang dan berbagi padding shell.
