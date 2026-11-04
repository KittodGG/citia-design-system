---
title: Motion
group: foundations
order: 7
summary: Gerak yang menjelaskan perubahan lalu menyingkir: token durasi dan easing, spring, simetri masuk dan keluar, gerak yang bisa diinterupsi, dan reduced motion.
---

Motion di Citia DS bersifat fisik dan tenang. Ia menunjukkan dari mana sesuatu datang, apa yang berubah, dan bahwa antarmuka mendengar Anda. Gerakannya singkat, berjangkar pada elemen pemicunya, bisa diinterupsi, dan sebagian besar nyaris tak terlihat. Ia tidak pernah menjadi dekorasi.

## Token

```ds-motion
```

## Token mana untuk apa

| Pemakaian | Durasi | Easing |
| --- | --- | --- |
| Warna, latar, border, opasitas saat hover dan fokus | `--ds-duration-fast` (150ms) | `--ds-ease-standard` |
| Umpan balik tekan | `--ds-duration-instant` (120ms) | `--ds-ease-out` |
| Masuknya popover, menu, tooltip, toast, dropdown | `--ds-duration-quick` (160ms) sampai `--ds-duration-enter` (220ms) | `--ds-ease-emphasized` |
| Keluarnya elemen yang sama | `--ds-duration-exit` (140ms) | `--ds-ease-exit` |
| Indikator yang berpindah (thumb switch, indikator tab, snap slider), panel, sheet | `--ds-duration-spring` (500ms) | `--ds-ease-spring` |
| Hanya setelah gestur bermomentum (lemparan sheet, carousel) | `--ds-duration-spring-bounce` (450ms) | `--ds-ease-spring-bounce` |
| Dialog | `--ds-duration-base` (180ms) | `--ds-ease-emphasized` |
| Shimmer skeleton | `--ds-duration-shimmer` (1600ms) | linear, tanpa henti |

Di bawah 100ms terasa instan dan di atas 300ms terasa lambat untuk umpan balik. Hanya indikator yang berpindah dan panel yang boleh lebih panjang, sampai 500ms.

## Aturan

1. **Masuk berarti opasitas ditambah gerak kecil dari pemicu.** Geser paling banyak `--ds-enter-offset` (5px) atau skala dari 0.96–0.98, dengan `transform-origin` di sisi pemicu. Menu terbuka dari tombolnya; sheet meluncur dari tepinya dan keluar lewat tepi yang sama.
2. **Keluar lebih cepat daripada masuk** dan memakai easing keluar: 140ms dibanding 160–220ms.
3. **Animasikan hanya `transform` dan `opacity`**, ditambah warna. Ungkap tinggi dengan `grid-template-rows: 0fr` ke `1fr` atau `interpolate-size: allow-keywords`; jangan menganimasikan `top`, `left`, `width`, atau `height`.
4. **Respons saat pointer ditekan.** Umpan balik tekan berjalan lewat `:active`, bukan setelah klik.
5. **Tetap bisa diinterupsi.** Elemen yang dibuka kembali melanjutkan dari posisinya. Transisi CSS melakukannya; keyframe mengulang dari awal, jadi pilih transisi.
6. **Menahan diri.** Satu gerak per perubahan state. Tanpa bounce pada hal yang tidak bergerak karena gestur. Tanpa animasi tak berujung kecuali spinner, skeleton, live dot, dan progres indeterminate. Tanpa parallax. Tanpa hover lift di UI data yang padat; hanya kartu yang bisa diklik yang naik, sebesar `--ds-lift` (-2px).

## Spring

Spring memberi permukaan massa: mulai cepat dan berhenti perlahan tanpa benturan. DS punya dua kurva, keduanya berupa easing CSS `linear()` sehingga bekerja pada transisi biasa.

- `--ds-ease-spring` dengan `--ds-duration-spring` (500ms) **teredam kritis**: mencapai target tanpa overshoot. Pakai untuk apa pun yang bergerak karena pengguna memilih sesuatu (switch, indikator tab, panel, sheet).
- `--ds-ease-spring-bounce` dengan `--ds-duration-spring-bounce` (450ms) adalah **pantulan ringan** dengan overshoot sekitar 1.5%. Pakai hanya setelah gestur yang membawa momentum, seperti melempar sheet atau carousel. Jangan pada tombol, menu, atau apa pun yang tidak didorong pengguna.

```html preview title="Spring teredam kritis dan ease standar"
<style>
  .mo-track { position: relative; height: 2.75rem; border: 1px solid var(--color-base-300); border-radius: var(--ds-radius-full); background: var(--color-base-200); max-width: 22rem; }
  .mo-thumb { position: absolute; inset-block: .25rem; inset-inline-start: .25rem; width: 2.125rem; border-radius: var(--ds-radius-full); background: var(--color-primary); box-shadow: var(--ds-shadow-xs); transition: transform var(--ds-duration-spring) var(--ds-ease-spring); }
  .mo-track.is-standard .mo-thumb { transition-duration: var(--ds-duration-base); transition-timing-function: var(--ds-ease-standard); }
  .mo-track:hover .mo-thumb, .mo-track:focus-within .mo-thumb { transform: translateX(11.25rem); }
  [dir="rtl"] .mo-track:hover .mo-thumb, [dir="rtl"] .mo-track:focus-within .mo-thumb { transform: translateX(-11.25rem); }
  @media (hover: none) { .mo-track .mo-thumb { transform: translateX(11.25rem); } }
  @media (prefers-reduced-motion: reduce) { .mo-thumb { transition-property: opacity; } }
</style>
<div style="display:grid;gap:.75rem">
  <div class="mo-track" tabindex="0" aria-label="Demo spring"><span class="mo-thumb"></span></div>
  <div class="mo-track is-standard" tabindex="0" aria-label="Demo ease standar"><span class="mo-thumb"></span></div>
  <p class="ds-text-subtle" style="margin:0">Arahkan kursor atau fokus ke jalur. Atas: spring (500ms). Bawah: ease standar (180ms).</p>
</div>
```

Di JavaScript, pakai Web Animations API dengan token yang sama (baca lewat `getComputedStyle(document.documentElement)`), mulai dari nilai yang sedang tampil, dan serahkan kecepatan lepas gestur ke animasi agar tidak mulai dari nol. Periksa `matchMedia("(prefers-reduced-motion: reduce)").matches` lebih dulu.

## Simetri masuk dan keluar

Yang keluar sebaiknya keluar lewat jalur ia datang. Menu yang tumbuh dari tombolnya menyusut kembali ke sana; sheet yang meluncur dari bawah meluncur turun. Keluar lebih singkat (140ms) karena pengguna sudah memutuskan dan menunggu langkah berikutnya.

```html preview title="Disclosure dengan reveal grid-rows"
<style>
  .mo-panel { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows var(--ds-duration-exit) var(--ds-ease-exit), opacity var(--ds-duration-exit) var(--ds-ease-exit); }
  .mo-panel > div { overflow: hidden; min-height: 0; }
  details[open] > .mo-panel { grid-template-rows: 1fr; opacity: 1; transition-duration: var(--ds-duration-enter); transition-timing-function: var(--ds-ease-emphasized); }
  .mo-details { max-width: 26rem; border: 1px solid var(--color-base-300); border-radius: var(--ds-radius-box); padding: .75rem 1rem; background: var(--color-base-100); }
  .mo-details summary { cursor: pointer; font-weight: 600; min-height: 1.75rem; }
  @media (prefers-reduced-motion: reduce) { .mo-panel { transition-property: opacity; } }
</style>
<details class="mo-details" open>
  <summary>Ketentuan pembayaran</summary>
  <div class="mo-panel"><div><p style="margin:.5rem 0 0">Net 30 sejak tanggal faktur. Denda 1,5% per bulan berlaku setelah jatuh tempo.</p></div></div>
</details>
```

> [!NOTE]
> `<details>` yang tertutup menyembunyikan isinya seketika di sebagian besar browser, jadi animasi keluar di atas hanya terlihat di browser yang mendukung transisi `::details-content`. Animasi masuk selalu berjalan. Halaman komponen menyebut browser mana yang menganimasikan keluar.

## Dapat diinterupsi

Orang mengklik dua kali, berubah pikiran, dan berpindah halaman di tengah animasi. Transisi berbalik dari nilainya saat itu; ia tidak melompat ke akhir atau mengulang. Ujilah: buka dan tutup menu tiga kali dalam satu detik. Geraknya harus tetap mulus dan tidak tersangkut.

- Jangan memblokir input selama animasi. Kontrol tetap bisa ditekan selama transisinya sendiri.
- Pilih transisi CSS daripada `@keyframes` untuk apa pun yang digerakkan state.
- Untuk `[popover]`, `dialog`, dan toggle `display`, pakai `@starting-style` dan `transition-behavior: allow-discrete` agar CSS saja menganimasikan kedua arah.

## Umpan balik tekan

Tombol bereaksi saat pointer turun, bukan saat naik. `:active` memasang `transform: scale(var(--ds-press-scale))` (0.97) selama 120ms bersama state layer tekan. Skala tekan hanya untuk tombol dan chip. Jangan menggeser tombol saat hover; target klik harus tetap di bawah kursor.

```html preview title="Umpan balik tekan"
<div style="display:flex;flex-wrap:wrap;gap:.75rem">
  <button type="button" class="btn btn-primary">Kirim faktur</button>
  <button type="button" class="btn">Simpan draf</button>
  <button type="button" class="btn btn-ghost">Batal</button>
</div>
```

## Transisi halaman dan tema

- Antarhalaman, `@view-transition { navigation: auto }` memberi cross-fade 180ms pada aplikasi multi-halaman.
- Saat tema berganti, `ds.js` memanggil `document.startViewTransition()` agar warna cross-fade, bukan berkedip. Dilewati bila reduced motion aktif atau browser tidak mendukung.

## Reduced motion

`accessibility.css` tidak berlapis dan dimuat terakhir, jadi menang atas gerak komponen. Di bawah `prefers-reduced-motion: reduce`:

- Durasi turun ke 0.01ms, jumlah iterasi ke 1, `scroll-behavior` ke `auto`.
- View transition dimatikan.
- Transform dilepas: skala tekan tombol, lift kartu, rotasi chevron.
- Indikator berulang (`.ds-spinner`, denyut live dot, progres sibuk) disembunyikan, karena putaran akan membeku di tengah siklus. Label teks yang membawa state tetap tampil.
- Perubahan warna dan opasitas yang menjelaskan state tetap ada (cross-fade 150ms atau kurang). Reduced motion bukan berarti tanpa umpan balik.

Saat menulis komponen yang bergerak, tambahkan blok `@media (prefers-reduced-motion: reduce)` sendiri yang membuang transform dan menyisakan fade opasitas. Di JavaScript, periksa `reduceMotion()` sebelum menganimasikan.

## Panduan

- Jangan menambah durasi atau easing di luar token. Yang baru masuk ke `tokens.json`.
- Jangan membuat animasi lebih dari 500ms, dan jangan yang membuat pengguna menunggu.
- Jangan menjadikan gerak satu-satunya sinyal. Pasangkan dengan perubahan warna, teks, atau ikon.
- Jangan menganimasikan properti layout (`width`, `height`, `top`, `left`) tiap frame.

## Token

`--ds-duration-*`, `--ds-ease-*`, `--ds-press-scale`, `--ds-enter-offset`, `--ds-lift`.
