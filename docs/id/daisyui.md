---
title: Penyelarasan daisyUI
group: reference
order: 2
summary: Cara setiap komponen daisyUI 5 membaca token design system, batch yang menyempurnakannya, padanan DS-nya, dan komponen tanpa pemilik yang ditata ulang.
---

Design system dibangun di atas daisyUI 5.7: `.btn`, `.input`, `.select`, `.checkbox`, `.menu`, `.modal`, dan lainnya tetap bisa dipakai, dan DS menyempurnakannya alih-alih menggantinya. Halaman ini mencantumkan setiap komponen daisyUI, asal tampilan DS-nya, dan komponen DS yang sebaiknya dipakai. Untuk HTML polos tanpa class, lihat [elemen native](./native-elements.md). [English](../en/daisyui.md).

Ada dua mekanisme:

1. **Variabel global.** `generated/tokens.css` mendefinisikan setiap variabel tema daisyUI per tema (`light`, `dark`, alias `tps`, `tps-dark`), sehingga semua komponen membaca warna, radius, dan ukuran DS, tanpa gradien depth dan tanpa noise. Tema bawaan daisyUI dimatikan.
2. **Aturan komponen.** daisyUI 5 menulis setiap komponen di dalam layer `utilities` (sub-layer `daisyui.l1` sampai `l3`). Aturan DS yang harus menang ditulis langsung di `@layer utilities`, yang selalu mengalahkan sub-layer berapa pun spesifisitasnya. Batch pemilik menyempurnakan komponennya di file masing-masing; `daisyui-overrides.css` menata ulang komponen tanpa pemilik dengan selector `:where()`, sehingga utility Tailwind dan penyempurnaan pemilik tetap menang.

## Variabel global

| Variabel | Nilai DS | Efek |
| --- | --- | --- |
| `--color-base-100/200/300`, `--color-base-content` | Permukaan dan teks DS | Setiap permukaan, border, dan warna teks |
| `--color-primary` … `--color-error` dan `-content` | Primer teal, warna status | Setiap class nada (`btn-primary`, `badge-success`, …) |
| `--radius-selector` | 0,375rem (`--ds-radius-md`) | Checkbox, toggle, badge, tab |
| `--radius-field` | 0,375rem | Tombol, input, select, item join |
| `--radius-box` | 0,625rem (`--ds-radius-box`) | Card, modal, alert, dropdown, mockup |
| `--size-selector` | 0,25rem | Ukuran dasar checkbox, radio, toggle (×6 = 24px) |
| `--size-field` | 0,25rem | Tinggi dasar tombol, input, select (×10 = 40px; DS menaikkan target ke 44px) |
| `--border` | 1px | Border setiap komponen |
| `--depth` | 0 | Tanpa gradien inset atau bayangan pada tombol dan field |
| `--noise` | 0 | Tanpa tekstur noise |

## Contoh

Komponen tanpa batch pemilik, ditata ulang di `daisyui-overrides.css`.

### Chat

```html preview title="chat, nada chat-bubble, header, dan footer"
<div style="max-width:34rem">
  <div class="chat chat-start">
    <div class="chat-header">Mei Tanaka <time datetime="2026-10-30T09:12">09.12</time></div>
    <div class="chat-bubble">Bisa konfirmasi jendela pengiriman untuk PRJ-1024?</div>
    <div class="chat-footer">Terkirim</div>
  </div>
  <div class="chat chat-end">
    <div class="chat-header">Anda <time datetime="2026-10-30T09:14">09.14</time></div>
    <div class="chat-bubble chat-bubble-primary">Kamis, 13.00 sampai 15.00. Daniel akan menemui sopirnya.</div>
    <div class="chat-footer">Dibaca 09.15</div>
  </div>
  <div class="chat chat-start">
    <div class="chat-bubble chat-bubble-warning">Dok bongkar muat tutup pukul 14.30 setiap Kamis.</div>
  </div>
</div>
```

### Countdown, radial progress, swap, text rotate

```html preview title="Kuantitas dan toggle"
<div style="display:flex;flex-wrap:wrap;gap:2rem;align-items:center">
  <span class="countdown" style="font-size:1.75rem" role="timer" aria-label="Sesi berakhir dalam 4 menit 32 detik">
    <span style="--value:4" aria-hidden="true">4</span>:<span style="--value:32;--digits:2" aria-hidden="true">32</span>
  </span>
  <div class="radial-progress" style="--value:68" role="progressbar" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100" aria-label="Kemajuan unggahan"><span>68%</span></div>
  <label class="swap swap-rotate" aria-label="Tandai favorit">
    <input type="checkbox">
    <svg class="swap-off ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-star"></use></svg>
    <svg class="swap-on ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-star-filled"></use></svg>
  </label>
  <p>Kirim <span class="text-rotate"><span><span>invoice</span><span>penawaran</span><span>pesanan</span></span></span> tepat waktu.</p>
</div>
```

### Join, label, floating label, dan validator

```html preview title="Kontrol berkelompok dan petunjuk validasi"
<div style="display:grid;gap:1.25rem;max-width:30rem">
  <div class="join">
    <button class="btn join-item" type="button">Hari</button>
    <button class="btn join-item" type="button" aria-pressed="true">Minggu</button>
    <button class="btn join-item" type="button">Bulan</button>
  </div>
  <label class="input">
    <span class="label">https://</span>
    <input type="text" placeholder="perusahaan.co.id" aria-label="Situs web">
  </label>
  <label class="floating-label">
    <span>Nomor invoice</span>
    <input class="input" type="text" placeholder="Nomor invoice" value="INV-2026-0418">
  </label>
  <div>
    <input class="input validator" type="email" required placeholder="nama@perusahaan.co.id" aria-label="Email penagihan" aria-describedby="dz-email-hint">
    <p class="validator-hint" id="dz-email-hint">Masukkan alamat email lengkap.</p>
  </div>
</div>
```

### List, stack, filter, diff

```html preview title="Pembantu tata letak"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));align-items:start">
  <ul class="list">
    <li class="list-row"><div><strong>Ayu Lestari</strong><div class="ds-text-subtle">Keuangan</div></div><span>12 tugas</span></li>
    <li class="list-row"><div><strong>Daniel Okafor</strong><div class="ds-text-subtle">Pengadaan</div></div><span>8 tugas</span></li>
    <li class="list-row"><div><strong>Sofia Marquez</strong><div class="ds-text-subtle">Kepala keuangan</div></div><span>5 tugas</span></li>
  </ul>
  <div class="stack" style="width:12rem">
    <div class="card bg-base-100 border border-base-300"><div class="card-body">INV-2026-0418</div></div>
    <div class="card bg-base-100 border border-base-300"><div class="card-body">INV-2026-0417</div></div>
    <div class="card bg-base-100 border border-base-300"><div class="card-body">INV-2026-0416</div></div>
  </div>
  <form class="filter">
    <input class="btn filter-reset" type="radio" name="dz-status" aria-label="Semua">
    <input class="btn" type="radio" name="dz-status" aria-label="Terbuka">
    <input class="btn" type="radio" name="dz-status" aria-label="Lunas">
    <input class="btn" type="radio" name="dz-status" aria-label="Terlambat">
  </form>
  <figure class="diff aspect-16/9" tabindex="0" aria-label="Bandingkan tata letak invoice lama dan baru">
    <div class="diff-item-1" role="img" tabindex="0"><div style="display:grid;align-items:center;justify-items:start;padding-inline:1.5rem;background:var(--color-base-100);font-weight:700">Sebelum: 9 hari</div></div>
    <div class="diff-item-2" role="img"><div style="display:grid;align-items:center;justify-items:end;padding-inline:1.5rem;background:var(--ds-primary-soft);font-weight:700">Sesudah: 4 hari</div></div>
    <div class="diff-resizer"></div>
  </figure>
</div>
```

### Hero dan dock

```html preview title="hero dan dock (ditampilkan di tempat, tidak fixed)"
<div style="display:grid;gap:1.5rem">
  <div class="hero bg-base-100 border border-base-300" style="min-height:14rem">
    <div class="hero-content text-center">
      <div style="max-width:28rem">
        <h1>Tutup buku bulanan dalam dua hari</h1>
        <p style="margin-block:0.75rem 1.25rem">Setujui invoice, cocokkan pembayaran, dan ekspor buku besar dari satu tempat.</p>
        <button class="btn btn-primary" type="button">Mulai rekonsiliasi</button>
      </div>
    </div>
  </div>
  <div class="dock" style="position:relative">
    <button type="button"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-home"></use></svg><span class="dock-label">Beranda</span></button>
    <button type="button" aria-current="page"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-inbox"></use></svg><span class="dock-label">Kotak masuk</span></button>
    <button type="button"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-settings"></use></svg><span class="dock-label">Pengaturan</span></button>
    <button type="button" aria-disabled="true"><svg class="ds-icon is-md" aria-hidden="true"><use href="#ds-icon-bar-chart"></use></svg><span class="dock-label">Laporan</span></button>
  </div>
</div>
```

### Mockup, mask, aura, glass

```html preview title="mockup-code, mockup-browser, mockup-window, mask, aura, glass"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));align-items:start">
  <div class="mockup-code">
    <pre data-prefix="$"><code>dotnet add package Citia.DesignSystem</code></pre>
    <pre data-prefix=">"><code>terpasang 2.0.0</code></pre>
  </div>
  <div class="mockup-browser">
    <div class="mockup-browser-toolbar"><div class="input">app.perusahaan.co.id/invoice</div></div>
    <div style="padding:2rem;background:var(--color-base-100)">Daftar invoice</div>
  </div>
  <div class="mockup-window">
    <div style="padding:2rem;background:var(--color-base-100)">Jendela pengaturan</div>
  </div>
  <div style="display:flex;gap:1rem;align-items:center">
    <img class="mask mask-squircle" src="/images/citia-favicon.png" alt="Citia" width="64" height="64">
    <div class="aura text-primary"><button class="btn" type="button">Aura tampil sebagai cincin tenang</button></div>
  </div>
  <div class="glass" style="padding:1.25rem;border-radius:var(--ds-radius-box)">Glass menjadi material tembus pandang DS.</div>
</div>
```

## State

| Komponen | State | Pemicu | Tampilan |
| --- | --- | --- | --- |
| Chat bubble | nada | `chat-bubble-*` | Primer adalah satu-satunya bubble berisi penuh; info, success, warning, error memakai isian tonal `--ds-*-soft` dengan warna teks isi |
| Item dock | hover / pressed / fokus | `:hover`, `:active`, `:focus-visible` | Teks menggelap; mengecil ke 97%; ring fokus inset 2px |
| Item dock | current | `aria-current`, `.dock-active` | Warna `--ds-quiet` dan bar indikator yang memanjang dengan spring |
| Item dock | nonaktif | `aria-disabled="true"`, `disabled` | Opasitas 55%, `cursor: not-allowed` |
| Swap | fokus / pressed / nonaktif | `:has(input:focus-visible)`, `:active`, `:has(input:disabled)` | Ring fokus pada wadah; tekan 97%; opasitas 55% |
| Diff | fokus | `:focus-visible` pada figure atau item pertama | Ring `--ds-focus` 2px, offset 2px |
| Floating label | fokus | `:focus-within` | Label menjadi `--ds-quiet`, naik dalam 180ms |
| Validator | tidak valid | `:user-invalid`, `aria-invalid` | Border error, petunjuk dalam `--ds-error-text` (tanpa pergeseran layout: ruang petunjuk sudah disediakan) |
| Radial progress | nilai | `--value` | Busur bergerak dengan spring di atas track 14% |
| Setiap komponen | reduced motion | `prefers-reduced-motion: reduce` | Swap rotate dan flip menjadi cross-fade, hover-3d berhenti miring, text-rotate menampilkan frasa pertama, digit countdown berganti tanpa bergeser |

## Audit

Status: **Pemilik** = disempurnakan batch pemilik di filenya; **Di sini** = ditata ulang di `daisyui-overrides.css`; **Dinetralkan** = dipertahankan demi kompatibilitas tetapi diredam sesuai prinsip DS; **Token** = hanya membaca variabel global.

| daisyUI | Class | Status | Ditata di | Padanan DS | Catatan |
| --- | --- | --- | --- | --- | --- |
| Alert | `alert`, `alert-*` | Pemilik | `feedback.css` (A8) | [Alert](./alert.md) | Isian tonal, ikon dan judul |
| Avatar | `avatar`, `avatar-group`, `avatar-online` | Pemilik | `status.css`, `display.css` (A5) | [Avatar](./avatar.md) | |
| Badge | `badge`, `badge-*` | Pemilik | `status.css` (A5) | [Badge](./badge.md) | |
| Breadcrumbs | `breadcrumbs` | Pemilik | `navigation.css` (A10) | [Breadcrumb](./breadcrumb.md) | |
| Button | `btn`, `btn-*` | Pemilik | `button.css`, `actions.css` (A1) | [Button](./button.md) | Target 44px, skala saat ditekan |
| Calendar | `cally`, `pika-*`, `rdp-*` | Pemilik | `calendar.css` (A4) | [Calendar](./calendar.md) | |
| Card | `card`, `card-body`, `card-title` | Pemilik | `surface.css` (A5) | [Card](./card.md) | |
| Carousel | `carousel`, `carousel-item` | Pemilik | `media.css` (A7) | [Carousel](./carousel.md) | |
| Chat | `chat`, `chat-bubble`, `chat-*` | Di sini | `daisyui-overrides.css` | tidak ada | Bubble tonal, radius 12px, metadata ukuran caption |
| Checkbox | `checkbox`, `checkbox-*` | Pemilik | `choices.css` (A3) | [Checkbox](./checkbox.md) | Checkbox polos: [native](./native-elements.md) |
| Collapse | `collapse`, `collapse-title`, `collapse-content` | Pemilik | `disclosure.css` (A8) | [Collapsible](./collapsible.md), [Accordion](./accordion.md) | |
| Countdown | `countdown` | Di sini | `daisyui-overrides.css` | tidak ada | Digit tabular, geser emphasized; beri `role="timer"` dan label teks |
| Diff | `diff`, `diff-item-*`, `diff-resizer` | Di sini | `daisyui-overrides.css` | tidak ada | Ring fokus dan handle DS |
| Divider | `divider`, `divider-*` | Pemilik | `media.css` (A7) | [Separator](./separator.md) | |
| Dock | `dock`, `dock-label`, `dock-active` | Di sini, A10 dapat menyempurnakan | `daisyui-overrides.css`, `nav-bars.css` | [Bottom navigation](./bottom-navigation.md) | Bar tembus pandang, item 44px, warna current |
| Drawer | `drawer`, `drawer-side`, `drawer-toggle` | Pemilik | `shell.css` (A11), `sheet.css` (A9) | [Sidebar](./sidebar.md), [Sheet](./sheet.md) | |
| Dropdown | `dropdown`, `dropdown-content` | Pemilik | `menu.css`, `popover.css` (A9) | [Dropdown menu](./dropdown-menu.md) | |
| FAB | `fab`, `fab-flower` | Pemilik | `actions.css` (A1) | [FAB](./fab.md) | |
| Fieldset | `fieldset`, `fieldset-legend` | Pemilik | `field.css` (A2) | [Fieldset](./fieldset.md) | |
| File input | `file-input` | Pemilik | `upload.css` (A4) | [File upload](./file-upload.md) | File input polos: [native](./native-elements.md) |
| Filter | `filter`, `filter-reset` | Di sini | `daisyui-overrides.css` | [Toggle group](./toggle-group.md) | Durasi token, jarak 6px; item berupa `.btn` (A1) |
| Footer | `footer`, `footer-title` | Pemilik | `shell.css`, `layout.css` (A11) | [Footer](./footer.md) | |
| Hero | `hero`, `hero-content`, `hero-overlay` | Di sini | `daisyui-overrides.css` | [Page header](./page-header.md) | Radius card, overlay scrim, tipografi display untuk `h1` |
| Hover 3D | `hover-3d` | Dinetralkan | `daisyui-overrides.css` | tidak ada | Tanpa overshoot, tidak miring saat reduced motion; hindari di UI produk |
| Hover gallery | `hover-gallery` | Di sini | `daisyui-overrides.css` | [Carousel](./carousel.md) | Hanya hover: tidak bisa dipakai dengan keyboard atau sentuhan, pilih carousel |
| Indicator | `indicator`, `indicator-item` | Pemilik | `display.css` (A5) | [Indicator](./indicator.md) | |
| Input | `input`, `input-*` | Pemilik | `field.css`, `inputs.css` (A2) | [Input](./input.md) | |
| Join | `join`, `join-item` | Di sini (token) | `daisyui-overrides.css` | [Button group](./button-group.md), [Input group](./input-group.md) | Radius dari `--radius-field`; item yang difokus di atas |
| Kbd | `kbd`, `kbd-*` | Pemilik | `code.css` (A6) | [Kbd](./kbd.md) | `kbd` polos: [native](./native-elements.md) |
| Label | `label`, `floating-label` | Di sini | `daisyui-overrides.css` | [Field](./field.md) | Teks `--ds-subtle` (≥ 4,5:1), motion token |
| Link | `link`, `link-*` | Pemilik | `button.css`, `actions.css` (A1) | [Link](./link.md) | |
| List | `list`, `list-row` | Di sini, A6 dapat menyempurnakan | `daisyui-overrides.css`, `lists.css` | [List](./list.md) | Pemisah hairline `--color-base-300` |
| Loading | `loading`, `loading-*` | Pemilik | `media.css` (A7) | [Spinner](./spinner.md) | Diam saat reduced motion |
| Mask | `mask`, `mask-*` | Token | tidak ada | [Avatar](./avatar.md) | Hanya bentuk; pertahankan `alt` pada gambar yang di-mask |
| Megamenu | `megamenu`, `megamenu-*` | Pemilik | `nav-bars.css`, `navigation.css` (A10) | [Navigation menu](./navigation-menu.md) | |
| Menu | `menu`, `menu-*` | Pemilik | `menu.css` (A9), `shell.css` (A11) | [Dropdown menu](./dropdown-menu.md), [Sidebar](./sidebar.md) | |
| Mockup | `mockup-code`, `mockup-browser`, `mockup-window`, `mockup-phone` | Di sini | `daisyui-overrides.css` | [Code block](./code-block.md) | Permukaan kode, bukan blok neutral terbalik; bingkai ponsel tetap memakai warna perangkat daisyUI |
| Modal | `modal`, `modal-box`, `modal-action` | Pemilik | `overlay.css` (A9) | [Dialog](./dialog.md) | |
| Navbar | `navbar`, `navbar-*` | Pemilik | `nav-bars.css` (A10) | [Navbar](./navbar.md) | |
| OTP | `otp`, `otp-*` | Pemilik | `choices.css` (A3) | [OTP input](./otp-input.md) | |
| Pagination | `join` + `btn` | Pemilik | `navigation.css` (A10) | [Pagination](./pagination.md) | daisyUI tidak punya class sendiri |
| Progress | `progress`, `progress-*` | Pemilik | `dataviz.css`, `media.css` (A7) | [Progress](./progress.md) | `progress` polos: [native](./native-elements.md) |
| Radial progress | `radial-progress` | Di sini | `daisyui-overrides.css` | [Progress](./progress.md) | Busur primer di atas track 14%, motion spring, label tabular |
| Radio | `radio`, `radio-*` | Pemilik | `choices.css` (A3) | [Radio group](./radio-group.md) | |
| Range | `range`, `range-*` | Pemilik | `choices.css` (A3) | [Slider](./slider.md) | |
| Rating | `rating`, `rating-*` | Pemilik | `choices.css` (A3) | [Rating](./rating.md) | |
| Select | `select`, `select-*` | Pemilik | `field.css`, `inputs.css` (A2) | [Select](./select.md) | `select` polos: picker yang dapat dikustomisasi di [native](./native-elements.md) |
| Skeleton | `skeleton`, `skeleton-text` | Pemilik | `media.css` (A7) | [Skeleton](./skeleton.md) | Diam saat reduced motion |
| Stack | `stack`, `stack-*` | Di sini | `daisyui-overrides.css` | tidak ada | Anak mewarisi radius |
| Stat | `stats`, `stat`, `stat-*` | Pemilik | `surface.css` (A5) | [Stat](./stat.md) | |
| Status | `status`, `status-*` | Pemilik | `status.css` (A5) | [Status](./status.md) | |
| Steps | `steps`, `step`, `step-*` | Pemilik | `disclosure.css` (A8) | [Stepper](./stepper.md) | |
| Swap | `swap`, `swap-on`, `swap-off` | Di sini | `daisyui-overrides.css` | [Toggle](./toggle.md) | Motion token, ring fokus, tekan; cross-fade saat reduced motion |
| Tab | `tabs`, `tab`, `tab-content` | Pemilik | `navigation.css` (A10) | [Tabs](./tabs.md) | |
| Table | `table`, `table-*` | Pemilik | `table.css` (A6) | [Table](./table.md) | `table` polos: [native](./native-elements.md) |
| Text rotate | `text-rotate` | Dinetralkan | `daisyui-overrides.css` | tidak ada | Loop dekoratif; siklus 12 detik, hanya frasa pertama saat reduced motion; hindari di UI produk |
| Textarea | `textarea`, `textarea-*` | Pemilik | `field.css`, `inputs.css` (A2) | [Textarea](./textarea.md) | |
| Timeline | `timeline`, `timeline-*` | Pemilik | `lists.css` (A6) | [Timeline](./timeline.md) | |
| Toast | `toast`, `toast-*` | Pemilik | `notification.css` (A8) | [Toast](./toast.md) | |
| Toggle | `toggle`, `toggle-*` | Pemilik | `choices.css` (A3) | [Switch](./switch.md) | Switch polos: `input[type=checkbox][role=switch]` |
| Tooltip | `tooltip`, `tooltip-*` | Pemilik | `tooltip.css` (A8) | [Tooltip](./tooltip.md) | |
| Validator | `validator`, `validator-hint` | Di sini | `daisyui-overrides.css` | [Validation](./validation.md) | Petunjuk dalam `--ds-error-text`, ukuran footnote |
| Aura | `aura`, `aura-*` | Dinetralkan | `daisyui-overrides.css` | tidak ada | DS tidak memakai glow dan loop: tampil sebagai cincin tenang 2px dalam `currentColor` |
| Glass | `glass` | Dinetralkan | `daisyui-overrides.css` | tidak ada | Menjadi material tembus pandang DS (permukaan 82%, blur, hairline); buram penuh saat reduced transparency |
| Utility radius | `rounded-box`, `rounded-field`, `rounded-selector` | Token | `tokens.css` | `--ds-radius-*` | Membaca variabel radius global |
| Typography | `prose` | Token | tidak ada | [Prose](./prose.md) | daisyUI hanya mengatur warna untuk plugin typography Tailwind; gunakan `.ds-prose` |

## Penggunaan

- Pertahankan class daisyUI sebagai dasar dan tambahkan class DS di atasnya (`btn btn-primary`); jangan membuat ulang komponen daisyUI dari nol.
- Pilih padanan DS bila ada: padanan itu menambah state, perilaku keyboard, dan helper Razor.
- Jangan memakai `aura`, `hover-3d`, `text-rotate`, atau `hover-gallery` di layar produk: komponen ini bergerak tanpa alasan atau menyembunyikan isi di balik hover.
- Jangan menaikkan `--depth` atau `--noise` di atas 0 per komponen; tampilan DS datar dengan hairline.
- Timpa aturan daisyUI dari CSS Anda sendiri di `@layer utilities`; aturan di `@layer components` kalah dari daisyUI.

## Aksesibilitas

- Setiap komponen yang ditata ulang mempertahankan ring `--ds-focus` 2px; dock memakai ring inset agar tetap di dalam bar.
- Teks pada chat bubble tonal memakai warna teks isi (≥ 4,5:1); bubble primer memakai `--color-primary-content`.
- Countdown dan radial progress bersifat visual: beri `role="timer"` atau `role="progressbar"` dengan `aria-valuenow` dan label teks.
- Swap membutuhkan nama aksesibel pada label (`aria-label`), dan state-nya berasal dari checkbox di dalamnya.
- Reduced motion: lihat tabel state; loop pada `loading`, `skeleton`, `text-rotate`, dan `aura` berhenti (lihat `accessibility.css`).

## Token

Global: `--radius-selector`, `--radius-field`, `--radius-box`, `--size-selector`, `--size-field`, `--border`, `--depth`, `--noise`. Komponen yang ditata ulang: `--color-base-100/200/300`, `--color-base-content`, `--color-primary(-content)`, `--color-neutral(-content)`, `--ds-*-soft`, `--ds-subtle`, `--ds-muted`, `--ds-quiet`, `--ds-error-text`, `--ds-focus`, `--ds-scrim`, `--ds-control-border`, `--ds-radius-*`, `--ds-shadow-xs|menu`, `--ds-duration-*`, `--ds-ease-*`, `--ds-press-scale`, `--ds-z-sticky`, `--ds-type-*`.

## Native dan daisyUI

daisyUI adalah plugin Tailwind CSS; build memuatnya dengan `themes: false` sehingga hanya tema DS yang ada. Tailwind hanya menulis komponen daisyUI bila class-nya muncul di sumber yang dipindai (`@source`), jadi aplikasi yang memakai `.chat` harus mencantumkannya di view yang dipindai. `wwwroot/css/ds.css` prebuilt untuk aplikasi tanpa Tailwind hanya berisi class yang di-safelist oleh integrator.
