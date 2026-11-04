---
title: Indicator
group: components
category: data-display
order: 9
summary: Menempelkan badge atau titik ke sudut elemen apa pun, dengan penempatan logis untuk RTL dan pudar plus skala saat muncul.
---

Indicator adalah pembungkus yang menempatkan item kecil ([badge](./badge.md), titik, ikon) di sudut elemen lain: icon button, [avatar](./avatar.md), card. Ia hanya memosisikan; item yang membawa makna, dan nama aksesibel host juga harus menyebutnya. Ia sepadan dengan `indicator` daisyUI.

## Contoh

```html preview title="Sudut"
<div style="display:flex;gap:2rem;align-items:center;flex-wrap:wrap">
  <span class="ds-indicator"><span class="ds-avatar c4 is-lg" role="img" aria-label="Atas akhir"><span aria-hidden="true">AA</span></span><span class="ds-badge is-error is-dot ds-indicator__item"><span class="ds-visually-hidden">Baru</span></span></span>
  <span class="ds-indicator"><span class="ds-avatar c4 is-lg" role="img" aria-label="Atas awal"><span aria-hidden="true">AW</span></span><span class="ds-badge is-error is-dot ds-indicator__item is-start"><span class="ds-visually-hidden">Baru</span></span></span>
  <span class="ds-indicator"><span class="ds-avatar c4 is-lg" role="img" aria-label="Bawah akhir"><span aria-hidden="true">BA</span></span><span class="ds-badge is-success is-dot ds-indicator__item is-bottom"><span class="ds-visually-hidden">Daring</span></span></span>
  <span class="ds-indicator"><span class="ds-avatar c4 is-lg" role="img" aria-label="Bawah awal"><span aria-hidden="true">BW</span></span><span class="ds-badge is-success is-dot ds-indicator__item is-bottom is-start"><span class="ds-visually-hidden">Daring</span></span></span>
  <span class="ds-indicator"><span class="ds-avatar c4 is-lg" role="img" aria-label="Tengah akhir"><span aria-hidden="true">TA</span></span><span class="ds-badge is-info is-dot ds-indicator__item is-middle"><span class="ds-visually-hidden">Info</span></span></span>
  <span class="ds-indicator"><span class="ds-avatar c4 is-lg" role="img" aria-label="Atas tengah"><span aria-hidden="true">AT</span></span><span class="ds-badge is-warning is-dot ds-indicator__item is-center"><span class="ds-visually-hidden">Peringatan</span></span></span>
</div>
```

```html preview title="Hitungan pada button, titik pada avatar bulat"
<div style="display:flex;gap:2rem;align-items:center;flex-wrap:wrap">
  <span class="ds-indicator">
    <button type="button" class="btn btn-ghost btn-square" aria-label="Pesan, 12 belum dibaca"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-message-square"></use></svg></button>
    <span class="ds-badge is-error is-sm ds-indicator__item" data-ds-badge data-count="12" data-ds-badge-label="belum dibaca"></span>
  </span>
  <span class="ds-indicator is-round">
    <span class="ds-avatar c5 is-round is-xl" role="img" aria-label="Mei Tanaka, daring"><span aria-hidden="true">MT</span></span>
    <span class="ds-badge is-dot ds-indicator__item is-bottom is-success"></span>
  </span>
  <span class="ds-indicator">
    <article class="ds-card" style="padding:1rem 2rem"><strong>Laporan draf</strong></article>
    <span class="ds-tag is-warning ds-indicator__item">Draf</span>
  </span>
</div>
```

```html preview title="Tampil dan sembunyi"
<div style="display:flex;gap:1rem;align-items:center">
  <span class="ds-indicator">
    <button type="button" class="btn btn-ghost btn-square" aria-label="Notifikasi"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"></use></svg></button>
    <span id="ind-dot" class="ds-badge is-error is-dot ds-indicator__item"><span class="ds-visually-hidden">Notifikasi baru</span></span>
  </span>
  <button type="button" class="btn btn-sm" onclick="const d=document.getElementById('ind-dot');d.hidden=!d.hidden">Alihkan titik</button>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Item ada | Item berada di sudut, berpusat pada titik sudut, cincin 2px `--color-base-100` |
| Muncul | `hidden` dilepas | Opacity dan skala 0,6 ke 1 selama 150 sampai 160 ms (`@starting-style`) |
| Hilang | `hidden` dipasang | Memudar dan mengecil, lalu `display: none` (`allow-discrete`) |
| Host bulat | `.ds-indicator.is-round` | Item ditarik 14% ke dalam agar menimpa lengkungan |
| RTL | `dir="rtl"` | Awal dan akhir bertukar otomatis |
| Reduced motion | `prefers-reduced-motion` | Hanya cross-fade opacity, tanpa skala |

Indicator tidak punya state hover, pressed, atau disabled: itu milik host.

## Anatomi

- `.ds-indicator` (pembungkus inline-flex, `position: relative`; `is-round` untuk host bulat).
- `.ds-indicator__item` dengan penempatan `is-start`, `is-center`, `is-middle`, `is-bottom` (bawaan: atas dan akhir). Gabungkan, misalnya `is-bottom is-start`.
- `indicator`, `indicator-item`, dan penempatan `indicator-*` daisyUI tetap berfungsi.

## Penggunaan

- Taruh satu item per sudut. Dua item di sudut yang sama bertumpuk.
- Jaga item tetap kecil: titik (8px), hitungan 1 sampai 2 digit, atau tag pendek.
- Jangan menaruh indicator pada teks. Bungkus ikon, avatar, thumbnail, atau card.
- Sebut maknanya di host (`aria-label="Pesan, 12 belum dibaca"`) atau beri item teks tersembunyi.

## Aksesibilitas

- Item adalah presentasi. Berikan informasi yang sama sebagai teks di host atau di dalam item (`.ds-visually-hidden`).
- Titik tidak boleh menjadi satu-satunya sinyal galat. Pasangkan dengan teks di tempat lain.
- Penempatan tidak mengubah urutan baca; letakkan item setelah host di DOM.

## Razor

Tidak ada tag helper; susun dengan yang lain:

```cshtml
<span class="ds-indicator">
    <button type="button" class="btn btn-ghost btn-square" aria-label="@T["Pesan, {0} belum dibaca", Model.Unread]">
        <ds-icon name="message-square" />
    </button>
    <ds-badge class="ds-indicator__item" count="@Model.Unread" size="sm" tone="Error" />
</span>
```

## Token

`--color-base-100` (cincin), `--ds-duration-fast`, `--ds-duration-quick`, `--ds-ease-standard`, `--ds-ease-emphasized`.

## Native dan daisyUI

Pembungkus `span` yang memakai offset logis (`inset-inline-end`) dan properti `translate` dengan variabel arah. Kompatibel dengan `indicator` daisyUI dan menambah cincin, transisi masuk dan keluar, serta penanganan RTL.
