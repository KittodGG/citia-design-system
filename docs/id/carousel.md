---
title: Carousel
group: components
category: data-display
order: 22
summary: Kumpulan slide yang bergulir horizontal di atas CSS scroll snap, dengan tombol sebelumnya dan berikutnya, indikator, keyboard, seret mouse dengan momentum, dan autoplay opsional.
---

Pakai carousel untuk menampilkan sedikit item setara dalam satu baris saat ruang sempit: galeri foto, proyek unggulan, foto produk. Jangan menyembunyikan konten penting atau langkah wajib di dalamnya; jika setiap item harus terlihat, pakai daftar, grid, atau [stepper](./stepper.md). Carousel pertama-tama adalah kontainer scroll: tanpa JavaScript ia bergulir dan snap lewat geser, roda mouse, dan scrollbar. Dengan JavaScript ia menambah tombol, indikator, kontrol keyboard, seret mouse, dan pengumuman "Slide 2 dari 5".

## Contoh

### Gallery

Satu slide per tampilan, titik, sebelumnya dan berikutnya. Seret dengan mouse, geser di layar sentuh, tekan tombol panah saat fokus ada di dalam, atau pakai tombolnya.

```html preview title="Galeri dengan titik"
<section class="ds-carousel" data-ds-carousel aria-label="Foto lokasi" style="max-width:34rem">
  <div class="ds-carousel__viewport"><div class="ds-carousel__track">
    <div class="ds-carousel__slide"><figure class="ds-figure"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan di bawah matahari pucat" draggable="false"></div><figcaption>Tampak utara, 28 Oktober</figcaption></figure></div>
    <div class="ds-carousel__slide"><figure class="ds-figure"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dbe4f3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f6e3b8'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234a6fb0'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%2334528a'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan biru di tengah hari" draggable="false"></div><figcaption>Jalan akses timur</figcaption></figure></div>
    <div class="ds-carousel__slide"><figure class="ds-figure"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23efe3d0'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23fbf1d3'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%23b9845a'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%238a5d3b'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan berpasir saat senja" draggable="false"></div><figcaption>Area penyimpanan saat senja</figcaption></figure></div>
    <div class="ds-carousel__slide"><figure class="ds-figure"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dcebd9'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f4ead0'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234f8a5b'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%23356b43'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan hijau setelah hujan" draggable="false"></div><figcaption>Penanaman, minggu 43</figcaption></figure></div>
    <div class="ds-carousel__slide"><figure class="ds-figure"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23e2e4ea'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f3e6cf'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%235b6478'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%233f4757'%2F%3E%3C%2Fsvg%3E" alt="Perbukitan abu-abu dalam kabut" draggable="false"></div><figcaption>Kabut pagi, pagar barat</figcaption></figure></div>
  </div></div>
</section>
```

### Thumbnails

`data-ds-indicators="thumbs"` mengganti titik dengan sederet thumbnail yang diambil dari gambar pertama tiap slide (atau `data-ds-thumb="url"` pada slide). Yang aktif punya ring primary 2px.

```html preview title="Indikator thumbnail"
<section class="ds-carousel" data-ds-carousel data-ds-indicators="thumbs" aria-label="Galeri proyek" style="max-width:34rem">
  <div class="ds-carousel__viewport"><div class="ds-carousel__track">
    <div class="ds-carousel__slide"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23cfe3e3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f2d9a6'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%232f7f86'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%231f5f66'%2F%3E%3C%2Fsvg%3E" alt="Pekerjaan fondasi, PRJ-1024" draggable="false"></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dbe4f3'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f6e3b8'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234a6fb0'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%2334528a'%2F%3E%3C%2Fsvg%3E" alt="Rangka baja, PRJ-1024" draggable="false"></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23efe3d0'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23fbf1d3'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%23b9845a'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%238a5d3b'%2F%3E%3C%2Fsvg%3E" alt="Pelapis dinding, PRJ-1024" draggable="false"></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-16-9"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20160%2090'%3E%3Crect%20width%3D'160'%20height%3D'90'%20fill%3D'%23dcebd9'%2F%3E%3Ccircle%20cx%3D'118'%20cy%3D'28'%20r%3D'12'%20fill%3D'%23f4ead0'%2F%3E%3Cpath%20d%3D'M0%2090V62l40-26%2036%2024%2028-16%2056%2034v12z'%20fill%3D'%234f8a5b'%2F%3E%3Cpath%20d%3D'M0%2090V76l50-18%2048%2020%2062-14v26z'%20fill%3D'%23356b43'%2F%3E%3C%2Fsvg%3E" alt="Penataan taman, PRJ-1024" draggable="false"></div></div>
  </div></div>
</section>
```

### Several slides per view, with loop

Atur `--ds-per-view` (1 sampai 4) pada carousel. Wadah sempit menampilkan lebih sedikit: paling banyak 2 di bawah 40rem dan 1 di bawah 24rem, diukur pada carousel itu sendiri. Berikutnya dan sebelumnya bergeser satu halaman; `data-ds-loop` memutar kembali dari halaman terakhir ke pertama. Indikator hitungan menampilkan `2 / 3`.

```html preview title="Tiga per tampilan, loop, hitungan"
<section class="ds-carousel" data-ds-carousel data-ds-loop data-ds-indicators="count" aria-label="Proyek unggulan" style="--ds-per-view:3">
  <div class="ds-carousel__viewport"><div class="ds-carousel__track">
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1024</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1031</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1042</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1057</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1063</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1078</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-4-3"><div class="ds-aspect__fill">PRJ-1085</div></div></div>
  </div></div>
</section>
```

### Autoplay

Autoplay mati secara bawaan. `data-ds-autoplay="6000"` maju tiap 6 detik dan menambah tombol jeda. Ia berhenti saat kursor di atas carousel atau fokus ada di dalamnya, saat tab atau carousel di luar layar, dan setelah tombol jeda ditekan. Ia tidak pernah mulai saat `prefers-reduced-motion: reduce`, dan tombol jeda tidak ditampilkan.

```html preview title="Autoplay dengan tombol jeda"
<section class="ds-carousel" data-ds-carousel data-ds-autoplay="6000" aria-label="Pengumuman" style="max-width:34rem">
  <div class="ds-carousel__viewport"><div class="ds-carousel__track">
    <div class="ds-carousel__slide"><div class="ds-aspect is-21-9"><div class="ds-aspect__fill">Penutupan faktur 30 Oktober</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-21-9"><div class="ds-aspect__fill">Tata letak laporan baru mulai 3 November</div></div></div>
    <div class="ds-carousel__slide"><div class="ds-aspect is-21-9"><div class="ds-aspect__fill">Jendela pemeliharaan, Minggu 02.00</div></div></div>
  </div></div>
</section>
```

## State

Carousel adalah kontrol komposit. Tiap bagian punya state sendiri; tabel mencakup semuanya. Pratinjau di atas menampilkan state diam, saat ini, ujung nonaktif (tombol sebelumnya di slide pertama), dan fokus secara langsung.

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Awal | Slide pertama di awal, tombol sebelumnya `aria-disabled="true"` (tidak dengan `data-ds-loop`) |
| Hover (tombol) | Kursor di atas tombol (`@media (hover: hover)`) | Permukaan satu tingkat lebih dalam (`--ds-popover-hover`) |
| Pressed (tombol) | Pointer down | `scale(var(--ds-press-scale))`, 120ms, tanpa skala saat reduced motion |
| Focus-visible | Fokus keyboard pada tombol, titik, thumbnail, atau isi slide | Ring 2px `--ds-focus`, offset 2px (di dalam slide untuk isi slide) |
| Ujung nonaktif | Halaman pertama atau terakhir tanpa loop | Tombol pada `--ds-opacity-disabled`, `cursor: not-allowed`, tetap bisa difokus (`aria-disabled`) |
| Indikator aktif | `aria-current="true"` pada titik atau thumbnail | Titik berwarna primary dan 1,5× lebih besar; thumbnail buram penuh dengan ring primary; hitungan menampilkan `n / total` |
| Hover (indikator) | Kursor di atas titik atau thumbnail | Titik menggelap ke `--color-base-content`; thumbnail menjadi buram penuh |
| Dragging | Mouse ditekan lalu digeser lebih dari 4px | Kursor `grabbing`, snap mati, track mengikuti pointer; klik pada tautan di dalamnya dibatalkan |
| Rubber band | Menyeret melewati slide pertama atau terakhir | Track meregang dengan hambatan (sampai selebar viewport) lalu kembali dalam 500ms |
| Momentum | Dilepas dengan kecepatan | Slide tujuan dipilih dengan memproyeksikan kecepatan (laju 0,998, paling banyak satu halaman); pegas dengan sedikit overshoot membawanya ke sana |
| Slide di luar layar | Slide terlihat kurang dari 50% | `inert`, opasitas 60%: tidak bisa difokus, tidak dibaca dalam mode jelajah |
| Autoplay / jeda | `data-ds-autoplay` | Tombol menampilkan glif jeda saat berjalan dan glif putar setelah ditekan; hover dan fokus menahan timer tanpa mengubah tombol |
| Reduced motion | `prefers-reduced-motion: reduce` | Tanpa autoplay, pegas, dan rubber band: perpindahan instan; titik tidak berskala dan menampilkan ring |
| Tanpa JavaScript | Skrip diblokir | Bergulir dan snap; tanpa tombol, tanpa indikator |
| RTL | `dir="rtl"` | Slide berjalan kanan ke kiri; chevron dicerminkan; ArrowLeft ke slide berikutnya |
| Forced colours | `forced-colors: active` | Titik aktif memakai `Highlight`, outline thumbnail memakai `Highlight` |

## Anatomi

- `section.ds-carousel[data-ds-carousel]`: root dengan `aria-label` (dan `aria-roledescription="carousel"`, ditambahkan skrip).
- `.ds-carousel__viewport`: kontainer scroll dengan `scroll-snap-type: x mandatory`.
- `.ds-carousel__track`: baris flex dengan `gap: var(--ds-carousel-gap)` (bawaan 16px).
- `.ds-carousel__slide`: satu item, basis `100% / --ds-per-view`; skrip menambah `role="group"`, `aria-roledescription="slide"`, dan "2 dari 5".
- Ditambahkan skrip: `.ds-carousel__nav.is-prev|is-next` (`.ds-media-btn`), `.ds-carousel__footer` dengan `.ds-carousel__play`, `.ds-carousel__dots` (`.ds-carousel__dot`) atau `.ds-carousel__thumbs` (`.ds-carousel__thumb`) atau `.ds-carousel__count`, dan live region `.ds-carousel__status` yang tersembunyi secara visual.
- `.ds-carousel__caption`: keterangan opsional di bawah media slide.

## Penggunaan

- Pakai 3 sampai 8 slide. Lebih dari itu adalah daftar, bukan carousel.
- Beri setiap slide bobot yang sama dan rasio yang sama; satu slide tidak pernah bergantung pada yang lain.
- Autoplay hanya untuk konten promosi tambahan, jangan pernah untuk konten yang dibutuhkan orang. Jika dipakai, 6 detik atau lebih per slide, dan pertahankan tombol jeda.
- Jangan taruh formulir, teks panjang, atau aksi wajib di dalam slide; slide yang bergulir keluar layar mudah terlewat.
- Tulis label carousel sebagai frasa benda ("Foto lokasi"), bukan "Carousel".
- Pilih titik untuk sampai 8 slide, thumbnail untuk galeri yang gambarnya sendiri menjadi pilihan, dan hitungan untuk per-view di atas 1.
- Jaga tinggi isi slide tetap stabil (rasio aspek) agar carousel tidak melompat antar slide.
- Beri setiap gambar `draggable="false"` agar seret gambar bawaan browser tidak bertabrakan dengan seret carousel.

## Aksesibilitas

- Pola: carousel WAI-ARIA APG. Root adalah region landmark (`section` berlabel) dengan `aria-roledescription="carousel"`; tiap slide adalah `role="group"` dengan `aria-roledescription="slide"` dan label seperti "2 dari 5".
- Live region sopan mengumumkan "Slide 2 dari 5" (atau "Slide 2–4 dari 8" untuk beberapa per tampilan) setelah seseorang menggeser carousel, setelah gerakan selesai. Nilainya `aria-live="off"` selama autoplay berjalan, sehingga carousel yang berputar tidak pernah menyela pembaca layar.
- Tombol adalah elemen `<button>` asli dengan nama ("Slide sebelumnya", "Slide berikutnya", "Buka slide 3", "Jeda tayangan slide otomatis"). Ujung nonaktif memakai `aria-disabled` agar fokus tidak hilang saat halaman terakhir tercapai.
- Seret tidak pernah satu-satunya cara: tombol, titik, dan tombol keyboard adalah alternatif satu pointer (WCAG 2.5.1, 2.5.7).
- Autoplay berhenti saat hover dan fokus, punya tombol jeda yang terlihat (WCAG 2.2.2), dan tidak pernah mulai saat reduced motion.
- Slide di luar viewport bersifat `inert`, sehingga Tab tidak mendarat di konten yang tidak terlihat.
- Target: tombol 36px dengan area sentuh 44px; titik 24px (44px di layar sentuh).
- Kontras: glif tombol 4,5:1 di atas `--ds-popover`; titik tidak aktif memakai `--ds-control-border` (3:1 terhadap halaman).

| Tombol | Aksi |
| --- | --- |
| Tab | Berpindah melalui sebelumnya, berikutnya, isi slide, jeda, indikator |
| Enter / Space | Mengaktifkan tombol, titik, atau thumbnail yang difokus |
| Panah Kanan / Panah Kiri | Halaman berikutnya / sebelumnya saat fokus ada di dalam carousel (dicerminkan di RTL); di dalam indikator memindahkan fokus sepanjang baris |
| Home / End | Halaman pertama / terakhir |

## Razor

```cshtml
<ds-carousel label="Foto lokasi" per-view="1" indicators="Thumbs">
    @foreach (var photo in Model.Photos)
    {
        <ds-slide>
            <figure class="ds-figure">
                <div class="ds-aspect is-16-9"><img src="@photo.Url" alt="@photo.Alt" draggable="false" loading="lazy" /></div>
                <figcaption>@photo.Caption</figcaption>
            </figure>
        </ds-slide>
    }
</ds-carousel>
```

| Atribut | Efek |
| --- | --- |
| `label` | `aria-label` carousel (bawaan "Carousel", diterjemahkan) |
| `per-view` | 1 sampai 4 slide sekaligus (`--ds-per-view`) |
| `loop` | `data-ds-loop`: berikutnya dari halaman terakhir memutar kembali ke pertama |
| `autoplay` | Milidetik per slide; 0 atau tidak ada = mati |
| `indicators` | `Dots` (bawaan), `Thumbs`, `Count`, `None` |

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-carousel` | Tingkatkan elemen ini |
| `data-ds-loop` | Putar kembali di ujung (autoplay selalu memutar kembali) |
| `data-ds-autoplay="ms"` | Interval autoplay |
| `data-ds-indicators` | `dots` (bawaan), `thumbs`, `count`, `none` |
| `data-ds-thumb` (pada slide) | URL thumbnail sebagai pengganti gambar pertama |
| `--ds-per-view` (CSS) | Slide yang terlihat sekaligus |
| `--ds-carousel-gap` (CSS) | Jarak antar slide |

API: `DS.carousel.next(el)`, `prev(el)`, `goTo(el, slideIndex)`, `play(el)`, `pause(el)`; `el` adalah elemen atau selector. Event `ds:carousel:change` (bubble) dengan `detail: { index, slide, count, slides }`.

Catatan perilaku: layar sentuh dan trackpad memakai scroll bawaan browser (momentum dan pantulan tepi datang dari platform). Mouse mendapat seret: pointer capture, kecepatan dari 100ms terakhir, slide tujuan yang diproyeksikan dengan laju deselerasi iOS (0,998), rubber band di ujung dengan hambatan sampai selebar viewport, dan pegas dari `--ds-duration-spring` (serta `--ds-duration-spring-bounce` setelah lemparan). Menekan saat bergerak membatalkan gerakan dan melanjutkan dari posisi saat itu.

## Token

`--ds-carousel-gap`, `--ds-per-view`, `--ds-radius-box`, `--ds-popover`, `--ds-popover-hover`, `--color-base-300`, `--ds-shadow-xs`, `--ds-size-target`, `--ds-size-target-compact`, `--ds-control-border`, `--color-primary`, `--ds-focus`, `--ds-press-scale`, `--ds-opacity-disabled`, `--ds-duration-spring`, `--ds-duration-spring-bounce`, `--ds-ease-spring`, `--ds-duration-fast`, `--ds-duration-quick`.

## Native dan daisyUI

Dasarnya adalah CSS scroll snap native (`scroll-snap-type`, `scroll-snap-align`, `scroll-snap-stop`), `overscroll-behavior-x`, dan container query. Class `carousel` daisyUI adalah kontainer scroll yang serupa; carousel DS menggantikannya saat Anda butuh indikator, tombol, dan aksesibilitas, dan tidak membutuhkannya.
