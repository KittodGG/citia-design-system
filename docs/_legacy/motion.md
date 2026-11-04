---
title: Motion
group: Fondasi
order: 6
summary: Motion ringan yang menjelaskan perubahan: durasi, easing, keyframe, View Transitions, gerakan yang bisa diinterupsi, spring, dan reduced motion.
source: TPS DESIGN.md (MOTION 1); Styles/app.css (keyframe, transisi); wwwroot/js/ds.js (grup navigasi, tema)
---

Motion di DS bernilai 1 dari 10: ringan dan menjelaskan. Gerakan dipakai untuk masuknya halaman, pergantian tema, grup navigasi, dan dialog. Jangan memakai gerakan sebagai dekorasi.

## Durasi {#durasi}

```ds-motion
```

| Token | Nilai | Dipakai oleh |
| --- | --- | --- |
| `--ds-duration-instant` | 120 ms | Hover baris tabel |
| `--ds-duration-fast` | 150 ms | Warna dan latar item navigasi, tombol |
| `--ds-duration-quick` | 160 ms | Latar dan border kontrol |
| `--ds-duration-base` | 180 ms | Dialog masuk, View Transition antarhalaman, putar chevron |
| `--ds-duration-theme` | 200 ms | Pergantian tema |
| `--ds-duration-enter` | 220 ms | Halaman masuk, lebar bilah progres |
| `--ds-duration-layout` | 240 ms | Lebar sidebar, drawer masuk dan keluar |
| `--ds-duration-settle` | 350 ms | Perpindahan yang berakhir di posisi tetap |
| `--ds-duration-tracker` | 680 ms | Penanda posisi scroll di daftar isi |
| `--ds-duration-rise` | 1500 ms | Kemunculan berurutan di dashboard |

Batas praktis: di bawah 100 ms terasa instan, di atas 300 ms terasa lambat untuk umpan balik. Hanya penanda scroll dan kemunculan dashboard yang boleh lebih panjang.

## Easing {#easing}

| Token | Kurva | Pakai untuk |
| --- | --- | --- |
| `--ds-ease-standard` | `ease` | Perubahan warna dan latar |
| `--ds-ease-out` | `ease-out` | Elemen masuk |
| `--ds-ease-in-out` | `ease-in-out` | Perubahan dua arah |
| `--ds-ease-emphasized` | `cubic-bezier(.22, 1, .36, 1)` | Dialog, drawer, grup navigasi |
| `--ds-ease-settle` | `cubic-bezier(.22, .8, .26, 1)` | Elemen yang berhenti di tempat |
| `--ds-ease-rise` | `cubic-bezier(.2, .75, .25, 1)` | Kemunculan dashboard |
| `--ds-ease-ping` | `cubic-bezier(0, 0, .2, 1)` | Cincin denyut status live |

## Keyframe {#keyframe}

Didefinisikan di `base.css`.

| Nama | Gerak | Dipakai oleh |
| --- | --- | --- |
| `ds-enter` | Naik 5 px (`--ds-enter-offset`) sambil memudar masuk | `.ds-page`, panel |
| `ds-rise` | Naik 6 px sambil memudar masuk | Kartu dan baris dashboard |
| `ds-ping` | Membesar 2.8× sambil memudar, berulang | Titik status live |
| `ds-glow` | Cincin 5 px berdenyut | Lencana portal |
| `ds-blink` | Opasitas 1 ke .35 | Pill live |
| `ds-spin` | Putar 360° | `.ds-spinner` |
| `ds-dialog-in` | Skala dan naik singkat, 180 ms | `dialog[open]` |

## Umpan balik tekan {#tekan}

Tekan memberi respons saat pointer ditekan, bukan saat dilepas: `.btn:active` memakai `transform: scale(.97)` (`--ds-press-scale`). Jangan menggeser tombol saat hover; target klik harus tetap di bawah kursor.

## Gerakan yang bisa diinterupsi {#interupsi}

Pengguna sering mengklik dua kali atau berpindah halaman di tengah animasi. Gerakan harus berbalik dari posisinya saat itu, bukan lompat.

- **Grup navigasi.** Tinggi panel dianimasikan dari tinggi yang diukur saat ini ke `scrollHeight` (atau 0). Klik kedua di tengah animasi membatalkan animasi lama (`panel._dsAnimation?.cancel()`) dan berbalik mulus.
- **Penanda scroll.** Animasi mulai dari panjang jalur yang sedang tampil di layar, bukan dari 0.
- **Halaman masuk.** `ds-enter` hanya 220 ms; navigasi berikutnya langsung menggantikannya.

## View Transitions {#view-transition}

- **Antarhalaman.** `@view-transition { navigation: auto }` di `base.css` membuat cross-fade 180 ms (`--ds-duration-base`) pada aplikasi multi-halaman. Aplikasi SPA mengabaikan aturan ini.
- **Pergantian tema.** `ds.js` memanggil `document.startViewTransition(apply)` sehingga warna berganti dengan cross-fade. Dilewati bila `prefers-reduced-motion: reduce` atau browser tidak mendukungnya.

## Konsistensi spasial {#spasial}

Gerakan mengikuti asal elemen:

- Drawer sidebar masuk dari kiri dan keluar ke kiri.
- Popover dan combobox tumbuh dari pemicunya.
- Dialog muncul di tengah dan hanya memudar serta naik singkat.
- Toast masuk dari tepi tempat ia berada.

## Spring untuk UI berbasis gestur {#spring}

DS tidak memakai spring pada komponen standar. Proyek yang punya gestur (geser sheet, tarik untuk menyegarkan, seret kartu) boleh menambahkannya. Nilai acuan dari Apple HIG:

| Jenis | Damping | Response |
| --- | --- | --- |
| Default | 1.0 | 0.35 s |
| Momentum | 0.8 | 0.35 s |
| Sheet | 0.8 | 0.3 s |

**Aturan.**

- Serahkan kecepatan jari ke animasi (velocity hand-off): spring dimulai dengan kecepatan saat jari dilepas, bukan dari nol.
- Proyeksikan momentum: tentukan titik berhenti dari kecepatan lepas, lalu pilih posisi akhir terdekat (misalnya sheet terbuka atau tertutup).
- Spring harus bisa diinterupsi oleh sentuhan berikutnya.

```js
// Sheet: lepas jari, proyeksikan titik berhenti, lalu animasikan dengan kecepatan awal.
function releaseSheet(sheet, { y, velocityY }, snaps) {
  const projected = y + velocityY * 0.12;              // proyeksi momentum, 120 ms ke depan
  const target = snaps.reduce((a, b) =>
    Math.abs(b - projected) < Math.abs(a - projected) ? b : a);

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    sheet.style.transform = `translateY(${target}px)`;
    return;
  }
  sheet.getAnimations().forEach((a) => a.cancel());      // interupsi animasi lama
  sheet.animate(
    [{ transform: `translateY(${y}px)` }, { transform: `translateY(${target}px)` }],
    { duration: 300, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "forwards" }
  );
}
```

Web Animations API tidak punya spring bawaan; kurva `--ds-ease-emphasized` meniru spring teredam. Untuk spring fisik penuh dengan velocity hand-off, pakai pustaka spring (misalnya `motion`) dan tetap hormati reduced motion.

## Reduced motion {#reduced}

`accessibility.css` berlaku tanpa lapisan dan paling akhir, sehingga menang atas gerakan komponen. Di bawah `prefers-reduced-motion: reduce`:

- `animation-duration` dan `transition-duration` menjadi 0.01 ms; `animation-iteration-count` menjadi 1; `scroll-behavior` menjadi `auto`.
- View Transition antarhalaman dan tema dimatikan.
- Transform dilepas: efek tekan tombol, naik kartu KPI, dan putar chevron grup navigasi.
- Indikator yang berulang disembunyikan (`.ds-spinner`, `.ds-live-dot::after`, progres file sibuk), karena akan membeku di tengah siklus. Kata status tetap tampil.

Perubahan warna dan opasitas yang menjelaskan state tetap ada. Reduced motion bukan berarti tanpa umpan balik.

## Jangan {#jangan}

- Jangan menganimasikan `width` atau `height` layout besar tiap frame. Pengecualian: tinggi grup navigasi yang diukur, dan lebar sidebar (240 ms, hanya saat dilipat).
- Jangan memakai animasi berulang selain untuk status live (lencana portal, pill live). Semuanya berhenti di bawah reduced motion.
- Jangan menunda input. Animasi tidak boleh membuat kontrol tidak bisa ditekan.
- Jangan menambah durasi atau easing baru di komponen; tambahkan ke `tokens.json`.
