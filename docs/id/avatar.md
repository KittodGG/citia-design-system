---
title: Avatar
group: components
category: data-display
order: 1
summary: Orang, tim, atau entitas dalam bentuk gambar, inisial, atau ikon, dengan presence, ukuran, tumpukan grup, dan sisa +N.
source: TPS app.css .pt-avatar L3552–3559, Helpers/PortalUi.cs
---

Avatar mengenali orang atau entitas sekilas. Ia menampilkan gambar bila ada, lalu inisial pada salah satu dari delapan warna yang stabil, lalu ikon. Pakai [indicator](./indicator.md) untuk menempelkan [badge](./badge.md) di avatar, dan kolom nama biasa bila identitas bukan inti baris.

## Contoh

```html preview title="Inisial, gambar rusak, dan ikon"
<div style="display:flex;gap:.75rem;align-items:center;flex-wrap:wrap">
  <span class="ds-avatar c0" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c1" role="img" aria-label="Daniel Okafor"><span aria-hidden="true">DO</span></span>
  <span class="ds-avatar c5 is-round" role="img" aria-label="Mei Tanaka"><span aria-hidden="true">MT</span></span>
  <span class="ds-avatar c3 is-solid is-round" role="img" aria-label="Sofia Marquez"><span aria-hidden="true">SM</span></span>
  <span class="ds-avatar is-neutral is-round" role="img" aria-label="Pengguna tidak dikenal"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user"></use></svg></span>
  <span class="ds-avatar c2 is-round" role="img" aria-label="Gambar rusak, inisial tampil"><span aria-hidden="true">BI</span><img class="ds-avatar__img" src="/missing/avatar.png" alt=""></span>
</div>
```

```html preview title="Ukuran xs sampai xl"
<div style="display:flex;gap:.75rem;align-items:center;flex-wrap:wrap">
  <span class="ds-avatar c0 is-xs is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c0 is-sm is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c0 is-md is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c0 is-lg is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c0 is-xl is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c4 is-xs" role="img" aria-label="Daniel Okafor"><span aria-hidden="true">DO</span></span>
  <span class="ds-avatar c4 is-xl" role="img" aria-label="Daniel Okafor"><span aria-hidden="true">DO</span></span>
</div>
```

```html preview title="Presence dengan teks"
<div style="display:flex;gap:1.5rem;flex-wrap:wrap">
  <span class="ds-avatar-item">
    <span class="ds-avatar c0 is-round" role="img" aria-label="Ayu Lestari"><span aria-hidden="true">AL</span><span class="ds-avatar__presence" data-presence="online" aria-hidden="true"></span></span>
    <span class="ds-avatar-item__text"><span class="ds-avatar-item__name">Ayu Lestari</span><span class="ds-avatar-item__meta">Daring</span></span>
  </span>
  <span class="ds-avatar-item">
    <span class="ds-avatar c1 is-round" role="img" aria-label="Daniel Okafor"><span aria-hidden="true">DO</span><span class="ds-avatar__presence" data-presence="away" aria-hidden="true"></span></span>
    <span class="ds-avatar-item__text"><span class="ds-avatar-item__name">Daniel Okafor</span><span class="ds-avatar-item__meta">Tidak di tempat</span></span>
  </span>
  <span class="ds-avatar-item">
    <span class="ds-avatar c5 is-round" role="img" aria-label="Mei Tanaka"><span aria-hidden="true">MT</span><span class="ds-avatar__presence" data-presence="busy" aria-hidden="true"></span></span>
    <span class="ds-avatar-item__text"><span class="ds-avatar-item__name">Mei Tanaka</span><span class="ds-avatar-item__meta">Sedang rapat</span></span>
  </span>
  <span class="ds-avatar-item">
    <span class="ds-avatar c3 is-round" role="img" aria-label="Sofia Marquez"><span aria-hidden="true">SM</span><span class="ds-avatar__presence" data-presence="offline" aria-hidden="true"></span></span>
    <span class="ds-avatar-item__text"><span class="ds-avatar-item__name">Sofia Marquez</span><span class="ds-avatar-item__meta">Luring</span></span>
  </span>
</div>
```

```html preview title="Grup dengan sisa +N"
<div class="ds-avatar-group" role="group" aria-label="Anggota proyek">
  <span class="ds-avatar c0 is-round" role="img" aria-label="Ayu Lestari" title="Ayu Lestari"><span aria-hidden="true">AL</span></span>
  <span class="ds-avatar c1 is-round" role="img" aria-label="Daniel Okafor" title="Daniel Okafor"><span aria-hidden="true">DO</span></span>
  <span class="ds-avatar c5 is-round" role="img" aria-label="Mei Tanaka" title="Mei Tanaka"><span aria-hidden="true">MT</span></span>
  <button type="button" class="ds-avatar is-more is-round" aria-label="3 lagi: Sofia Marquez, Rafi Pratama, Hana Kim" title="Sofia Marquez, Rafi Pratama, Hana Kim"><span aria-hidden="true">+3</span></button>
</div>
```

## State

```html preview title="Interaktif, nonaktif, memuat"
<div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
  <button type="button" class="ds-avatar c0 is-round" aria-label="Buka profil Ayu Lestari"><span aria-hidden="true">AL</span></button>
  <button type="button" class="ds-avatar c1 is-round" aria-label="Profil tidak tersedia" disabled><span aria-hidden="true">DO</span></button>
  <span class="ds-avatar is-round" aria-busy="true" role="img" aria-label="Memuat"></span>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Isi tonal (16% dari warna) dengan inisial berwarna senada |
| Gambar memuat | Gambar belum selesai didekode | Inisial tetap terlihat di belakang gambar |
| Gambar rusak | Event `error` atau `naturalWidth` 0 | `data-state="failed"` menyembunyikan gambar; inisial tampil |
| Hover | Pointer di atas avatar button atau link | Cincin 2px pada 35% warna |
| Focus-visible | Fokus keyboard pada avatar button atau link | Cincin `--ds-focus` 2px, offset 2px |
| Pressed | `:active` | Kecerahan turun 6% |
| Disabled | `disabled` atau `aria-disabled="true"` | `--ds-opacity-disabled`, `cursor: not-allowed` |
| Memuat | `aria-busy="true"` | Bone dengan shimmer; berhenti saat reduced motion |
| Presence | `data-presence` pada `.ds-avatar__presence` | online: penuh; away: takik; busy: garis; offline: cincin kosong |

## Anatomi

- `.ds-avatar` dengan warna `c0`–`c7`, `is-xs|sm|md|lg|xl`, `is-round` (alias `is-circle`) atau `is-square`, `is-solid`, `is-neutral`.
- `.ds-avatar__img` gambar, `.ds-avatar__presence` titik.
- `.ds-avatar-group` tumpukan (`is-spread` menghilangkan tumpang tindih), `.ds-avatar.is-more` sisa.
- `.ds-avatar-item` avatar dengan `__text`, `__name`, `__meta`.

## Penggunaan

- Berikan nama lengkap ke `Avatar.Initials` dan `Avatar.ColorClass`: nama yang sama selalu mendapat warna yang sama.
- Tampilkan paling banyak 4 avatar dalam grup, lalu `+N`. Taruh nama yang tersembunyi di `title` dan di nama aksesibel.
- Pakai `xs` (20px) hanya di sebelah teks yang mengulang nama; inisial di sana 9px.
- Jangan mengandalkan warna presence saja: teks di samping avatar atau nama aksesibel harus menyebutnya.
- Pakai `is-round` untuk orang dan `is-square` untuk tim, proyek, dan organisasi.

## Aksesibilitas

- Avatar bermakna memakai `role="img"` dengan `aria-label` (nama, ditambah presence). Bila hanya dekorasi di samping nama: `aria-hidden="true"`.
- Bentuk presence berbeda (penuh, takik, garis, kosong) sehingga status tidak hanya lewat warna.
- Inisial tonal menjaga kontras minimal 4,5:1 pada isi berwarna di kedua tema.

| Tombol | Aksi |
| --- | --- |
| Tab | Pindah ke avatar button atau link |
| Enter, Space | Mengaktifkan avatar button (Enter untuk link) |

## Razor

```cshtml
<ds-avatar name="Ayu Lestari" src="/img/ayu.jpg" size="lg" shape="circle" presence="online" />
<ds-avatar icon="user" label="Tamu" />
<ds-avatar-group names="@Model.Members" max="4" size="sm" label="Anggota proyek" />
```

`Avatar.Initials("Ayu Lestari")` menghasilkan `AL`; `Avatar.ColorClass("Ayu Lestari")` menghasilkan `c0` sampai `c7`.

## JavaScript

| Atribut atau class | Efek |
| --- | --- |
| `img.ds-avatar__img` di dalam `.ds-avatar` | `chips.js` menyembunyikannya saat `error` (juga bila gagal sebelum skrip berjalan) |

## Token

`--ds-size-avatar` (diatur class ukuran), `--ds-radius-box`, `--ds-radius-full`, `--ds-focus`, `--ds-duration-shimmer`, `--ds-opacity-disabled`, `--color-success`, `--color-warning`, `--color-error`.

## Native dan daisyUI

Dibangun di atas `span`, `button`, atau `a`. Ia menggantikan daisyUI `avatar` dan `avatar-group`; nama DS menambah inisial, presence, dan warna stabil. Markup daisyUI `avatar` tetap tampil tetapi tidak mendapat state ini.
