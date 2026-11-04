---
title: Hover card
group: components
category: overlays
order: 5
summary: Pratinjau orang, proyek, atau dokumen yang ditautkan, muncul setelah setengah detik hover atau saat keyboard focus, dan bukan satu-satunya jalan ke konten.
---

Hover card menampilkan pratinjau tujuan sebuah tautan (orang, proyek, invoice) agar pengguna dapat memutuskan apakah
akan membukanya. Card terbuka setelah 500ms hover atau saat tautan menerima keyboard focus, tetap terbuka selama pointer
bergerak ke dalamnya, dan menutup 300ms setelah pointer pergi. Card tidak pernah terbuka pada layar sentuh: tautan itu
sendiri adalah jalan masuknya, dan semua isi card juga harus ada di halaman tujuan. Gunakan [Tooltip](./tooltip.md)
untuk label singkat pada tombol ikon dan [Popover](./popover.md) untuk konten yang sengaja dibuka pengguna.

## Contoh

### Orang

```html preview title="Pratinjau penanggung jawab"
<p>Ditugaskan kepada
  <a href="#" data-ds-hover-card="hc-ayu">Ayu Lestari</a>
  pada 4 Maret 2026.
</p>

<div id="hc-ayu" popover="manual" class="ds-hover-card" data-ds-side="bottom" data-ds-align="start">
  <div class="ds-hover-card__head">
    <span class="ds-avatar" aria-hidden="true">AL</span>
    <div>
      <p class="ds-hover-card__title">Ayu Lestari</p>
      <p class="ds-hover-card__meta">Kepala operasional · Kantor Jakarta</p>
    </div>
  </div>
  <p class="ds-hover-card__body">Memegang 6 proyek, termasuk PRJ-1024 Relokasi gudang.</p>
  <div class="ds-hover-card__footer">
    <span>Waktu setempat 14:20 WIB</span>
    <span>Bergabung Januari 2023</span>
  </div>
</div>
```

### Proyek, dengan arrow

```html preview title="Pratinjau proyek"
<p>Invoice ini milik
  <a href="#" data-ds-hover-card="hc-prj">PRJ-1031</a>.
</p>

<div id="hc-prj" popover="manual" class="ds-hover-card is-arrow" data-ds-side="top" data-ds-align="center">
  <p class="ds-hover-card__title">PRJ-1031 · Penyegaran merek</p>
  <p class="ds-hover-card__meta">Tanaka Studio · pemilik Mei Tanaka</p>
  <p class="ds-hover-card__body">Logo, warna, dan template baru untuk cetak dan web. Fase 2 dari 3.</p>
  <div class="ds-hover-card__footer">
    <span>Anggaran IDR 185.000.000</span>
    <span>Tenggat 15 Mei 2026</span>
  </div>
</div>
```

## State

```html preview title="Trigger dan card"
<div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start">
  <p style="margin: 0">Diam: <a href="#" data-ds-hover-card="none">Daniel Okafor</a></p>
  <p style="margin: 0">Terbuka: <a href="#" data-ds-hover-card="none" data-state="open">Daniel Okafor</a></p>
  <div class="ds-hover-card" role="group" aria-label="Card">
    <p class="ds-hover-card__title">Daniel Okafor</p>
    <p class="ds-hover-card__meta">Keuangan · Cabang Lagos</p>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | default | Tautan dengan garis bawah putus-putus 1px (hanya pada tautan teks) |
| Waiting | pointer di atas tautan | Belum ada perubahan; card terbuka setelah 500ms (`data-ds-open-delay`) |
| Open | delay terlewati, atau keyboard focus (300ms) | Card membesar dari sisi tautan, 160ms emphasized; garis bawah menjadi solid (`data-state="open"`) |
| Pointer in the card | pointer bergerak ke dalam card | Tetap terbuka; teks dapat dipilih, tautan di dalamnya berfungsi |
| Closing | pointer meninggalkan tautan dan card selama 300ms, blur, Escape | Memudar kembali ke arah tautan, 140ms |
| Touch | `pointer: coarse` atau sentuhan | Tidak pernah terbuka; ketukan mengikuti tautan |
| Reduced motion | media query | Hanya opacity |

## Anatomi

- Trigger: tautan (atau tombol) dengan `data-ds-hover-card="id"`.
- `[popover=manual].ds-hover-card`: card; `is-arrow` menambahkan penunjuk.
- `.ds-hover-card__head` (avatar, title, meta), `.ds-hover-card__title`, `.ds-hover-card__meta`, `.ds-hover-card__body`, `.ds-hover-card__footer`.

## Penggunaan

- Gunakan hover card pada tautan ke orang, proyek, dan dokumen di teks atau tabel yang padat, tempat membuka setiap tautan akan lambat.
- Jangan menampilkan apa pun yang tidak ada di halaman tujuan; card adalah pintasan, bukan wadah.
- Batasi pada satu title, satu baris meta, paling banyak dua baris body, dan footer berisi fakta. Tanpa form.
- Jangan menaruh satu-satunya salinan sebuah aksi di hover card; paling banyak satu tautan yang mengulang trigger.
- Pertahankan delay 500ms. Delay yang lebih pendek membuka card saat pointer hanya melintasi teks.

## Aksesibilitas

- Trigger mempertahankan role dan namanya sendiri; card bersifat pelengkap dan tidak mengubahnya.
- Pengguna keyboard mendapatkan card saat focus (300ms) dan menutupnya dengan Escape; focus tetap pada tautan.
- Pengguna screen reader mencapai informasi yang sama dengan mengikuti tautan, sehingga card tidak menambahkan `aria-describedby`.
- Card tidak terbuka pada layar sentuh, sehingga tidak pernah menutupi tujuan di ponsel.

| Tombol | Aksi |
| --- | --- |
| Tab ke tautan | Membuka card setelah 300ms |
| Escape | Menutup card |
| Enter | Mengikuti tautan |
| Tab keluar | Menutup card |

## Razor

```cshtml
<a asp-page="/People/Details" asp-route-id="@person.Id" data-ds-hover-card="@($"hc-{person.Id}")">@person.Name</a>

<ds-hover-card id="@($"hc-{person.Id}")" side="bottom" align="start">
    <div class="ds-hover-card__head">
        <span class="ds-avatar" aria-hidden="true">@person.Initials</span>
        <div><p class="ds-hover-card__title">@person.Name</p><p class="ds-hover-card__meta">@person.Role</p></div>
    </div>
</ds-hover-card>
```

Atribut `ds-hover-card`: `id`, `side`, `align`, `arrow`.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-hover-card="id"` | Menghubungkan trigger ke card |
| `data-ds-open-delay="500"` | Delay hover dalam ms (focus memakai paling lama 300ms) |
| `data-ds-close-delay="300"` | Delay sebelum menutup setelah pointer pergi |
| `data-ds-side`, `data-ds-align` pada card | Penempatan yang diutamakan (default bottom, center) |

```js
DS.hoverCard.open("hc-ayu");
DS.hoverCard.close("hc-ayu");
```

Event: `ds:popover:open` dan `ds:popover:close` bubble dari card.

## Token

`--ds-popover`, `--color-base-300`, `--ds-shadow-popover`, `--ds-radius-xl`, `--ds-z-popover`, `--ds-subtle`,
`--ds-type-card-title-*`, `--ds-type-callout-*`, `--ds-type-footnote-size`, `--ds-duration-quick`, `--ds-duration-exit`,
`--ds-ease-emphasized`, `--ds-ease-exit`.

## Native dan daisyUI

- HTML Popover API dengan `popover="manual"`, sehingga hover card tidak pernah menutup menu atau popover yang sedang terbuka. Tanpa JavaScript, card tetap tersembunyi dan tautan berfungsi seperti biasa.
- daisyUI tidak memiliki hover card; `.dropdown-hover` terbuka saat hover tanpa delay atau dukungan keyboard dan tidak disarankan untuk pratinjau.
