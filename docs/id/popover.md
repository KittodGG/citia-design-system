---
title: Popover
group: components
category: overlays
order: 4
summary: Panel kecil non-modal yang menempel pada trigger-nya, berbasis HTML Popover API, dengan light dismiss, penempatan yang berbalik otomatis, dan arrow opsional.
source: TPS app.css .tps-popover (L3182)
---

Popover menampilkan beberapa kontrol atau penjelasan singkat di samping elemen yang membukanya, tanpa memblokir halaman:
pintasan tanggal, tautan berbagi, ubah cepat satu nilai, atau bantuan untuk sebuah field. Popover berada di top layer
melalui HTML Popover API, sehingga tidak pernah terpotong oleh tabel atau card yang dapat di-scroll, dan menutup saat
pengguna menekan di luar panel atau menekan Escape. Gunakan [Tooltip](./tooltip.md) untuk label satu baris yang tidak
membutuhkan interaksi, [Hover card](./hover-card.md) untuk pratinjau item yang ditautkan, [Dropdown menu](./dropdown-menu.md)
untuk daftar aksi, dan [Dialog](./dialog.md) bila tugas harus selesai sebelum pengguna melanjutkan.

## Contoh

### Dengan form

Focus berpindah ke dalam popover saat dibuka dan kembali ke trigger saat ditutup.

```html preview title="Ubah cepat"
<button type="button" class="btn" popovertarget="pop-budget">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg>
  Ubah anggaran
</button>

<div id="pop-budget" popover class="ds-popover" role="dialog" aria-labelledby="pop-budget-title" data-ds-side="bottom" data-ds-align="start">
  <div class="ds-popover__header">
    <div>
      <h2 id="pop-budget-title" class="ds-popover__title">Anggaran untuk PRJ-1024</h2>
      <p class="ds-popover__description">Terpakai sejauh ini: IDR 297.600.000</p>
    </div>
  </div>
  <div class="ds-popover__body">
    <label class="ds-field"><span class="ds-label">Anggaran (IDR)</span>
      <input class="input w-full" inputmode="decimal" value="480.000.000" data-ds-initial-focus></label>
  </div>
  <div class="ds-popover__footer">
    <button type="button" class="btn btn-sm" popovertarget="pop-budget" popovertargetaction="hide">Batal</button>
    <button type="button" class="btn btn-sm btn-primary" popovertarget="pop-budget" popovertargetaction="hide">Simpan</button>
  </div>
</div>
```

### Penempatan dan arrow

`data-ds-side` (`bottom`, `top`, `right`, `left`) dan `data-ds-align` (`start`, `center`, `end`) menentukan posisi yang
diutamakan. Bila tidak ada ruang, popover berbalik ke sisi yang berlawanan. `.is-arrow` menambahkan penunjuk ke trigger.

```html preview title="Sisi dengan arrow"
<div class="ds-actions" style="justify-content: center; padding-block: 3rem">
  <button type="button" class="btn" popovertarget="pop-top">Atas</button>
  <button type="button" class="btn" popovertarget="pop-right">Kanan</button>
  <button type="button" class="btn" popovertarget="pop-bottom">Bawah</button>
  <button type="button" class="btn" popovertarget="pop-left">Kiri</button>
</div>
<div id="pop-top" popover class="ds-popover is-arrow is-sm" data-ds-side="top" data-ds-align="center" role="dialog" aria-label="Termin pembayaran">Invoice jatuh tempo dalam 14 hari sejak tanggal terbit.</div>
<div id="pop-right" popover class="ds-popover is-arrow is-sm" data-ds-side="right" data-ds-align="center" role="dialog" aria-label="Kurs">Kurs diperbarui setiap hari pukul 09:00 WIB dari Bank Indonesia.</div>
<div id="pop-bottom" popover class="ds-popover is-arrow is-sm" data-ds-side="bottom" data-ds-align="center" role="dialog" aria-label="Persetujuan">Diperlukan dua persetujuan di atas IDR 50.000.000.</div>
<div id="pop-left" popover class="ds-popover is-arrow is-sm" data-ds-side="left" data-ds-align="center" role="dialog" aria-label="Retensi">File yang dihapus tetap berada di tempat sampah selama 30 hari.</div>
```

### Ukuran

| Class | Lebar | Gunakan untuk |
| --- | --- | --- |
| `ds-popover is-sm` | 15rem | Satu atau dua kalimat |
| `ds-popover` | 20rem | Form kecil, daftar hingga 6 item |
| `ds-popover is-lg` | 28rem | Dua kolom, kalender mini, panel berbagi |
| `ds-popover is-auto` | mengikuti konten | Swatch, toolbar |

```html preview title="Popover besar dengan daftar"
<button type="button" class="btn" popovertarget="pop-members" aria-label="Anggota PRJ-1024">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-users"></use></svg>
  4 anggota
</button>
<div id="pop-members" popover class="ds-popover is-lg" role="dialog" aria-labelledby="pop-members-title" data-ds-align="start">
  <div class="ds-popover__header">
    <h2 id="pop-members-title" class="ds-popover__title">Anggota PRJ-1024</h2>
    <button type="button" class="ds-popover__close" popovertarget="pop-members" popovertargetaction="hide" aria-label="Tutup">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
    </button>
  </div>
  <ul class="ds-popover__body" style="margin: 0; padding: 0; list-style: none">
    <li style="display: flex; justify-content: space-between; gap: 1rem"><span>Ayu Lestari</span><span class="ds-popover__description">Pemilik</span></li>
    <li style="display: flex; justify-content: space-between; gap: 1rem"><span>Daniel Okafor</span><span class="ds-popover__description">Editor</span></li>
    <li style="display: flex; justify-content: space-between; gap: 1rem"><span>Mei Tanaka</span><span class="ds-popover__description">Editor</span></li>
    <li style="display: flex; justify-content: space-between; gap: 1rem"><span>Sofia Marquez</span><span class="ds-popover__description">Pembaca</span></li>
  </ul>
  <div class="ds-popover__footer"><a class="btn btn-sm btn-ghost" href="#">Kelola akses</a></div>
</div>
```

## State

```html preview title="Panel, dengan arrow, fokus"
<div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: flex-start">
  <div class="ds-popover" style="padding: 1rem; width: 15rem" role="group" aria-label="Panel">
    <p class="ds-popover__title">Sinkronisasi</p>
    <p class="ds-popover__description">Terakhir disinkronkan 2 menit lalu.</p>
  </div>
  <div class="ds-popover" style="padding: 1rem; width: 15rem; outline: 2px solid var(--ds-focus); outline-offset: 2px" role="group" aria-label="Fokus">
    <p class="ds-popover__title">Panel dengan fokus</p>
    <p class="ds-popover__description">Fokus keyboard berada pada panel itu sendiri.</p>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Closed | default | `display: none`; trigger `aria-expanded="false"` |
| Opening | klik trigger, `DS.popover.open()` | Ditempatkan di samping trigger, lalu opacity 0 → 1 dan scale 0,96 → 1 dari sisi trigger (`--ds-origin`), 160ms emphasized |
| Open | `:popover-open` | Permukaan `--ds-popover`, hairline, radius 12px, `--ds-shadow-popover`; trigger `aria-expanded="true"` |
| Flipped | ruang di sisi yang diutamakan tidak cukup | `data-side` berubah; origin dan arrow mengikuti |
| Following | halaman atau container di-scroll | Ditempatkan ulang di setiap frame selama terbuka |
| Closing | tekan di luar, Escape, trigger ditekan lagi, `popovertargetaction="hide"` | Kembali ke arah trigger, 140ms, easing exit; focus kembali ke trigger |
| Focus | `:focus-visible` pada panel | Focus ring `--ds-focus` 2px |
| Reduced motion | media query | Hanya opacity |

## Anatomi

- `[popover].ds-popover`: panel (`role="dialog"` bila berisi kontrol). Modifier `is-sm`, `is-lg`, `is-auto`, `is-arrow`.
- `.ds-popover__header` dengan `.ds-popover__title`, `.ds-popover__description`, `.ds-popover__close`.
- `.ds-popover__body` (`is-scroll` untuk membatasi tinggi hingga 24rem).
- `.ds-popover__footer`: aksi di atas hairline.
- Trigger: tombol apa pun dengan `popovertarget`.

## Penggunaan

- Jaga popover tetap kecil: satu pertanyaan, satu nilai, atau hingga 6 item. Konten yang lebih banyak masuk ke [Sheet](./sheet.md) atau [Dialog](./dialog.md).
- Buka popover hanya dengan klik atau tap. Untuk pratinjau saat hover, gunakan [Hover card](./hover-card.md).
- Jangan menjadikan popover satu-satunya cara untuk menyelesaikan tugas; light dismiss dapat menutupnya kapan saja.
- Gunakan arrow bila beberapa trigger berdekatan dan harus jelas trigger mana yang membuka panel.
- Jangan membuka popover dari dalam popover lain; gunakan menu dengan submenu atau dialog.

## Aksesibilitas

- Trigger adalah `<button>` dengan `popovertarget`; browser mengekspos state expanded dan relasinya. Script juga menetapkan `aria-expanded` dan `aria-controls`.
- Popover dengan kontrol memiliki `role="dialog"` dan nama (`aria-labelledby` atau `aria-label`). Popover yang hanya berisi teks boleh tanpa role.
- Saat dibuka, focus menuju `[data-ds-initial-focus]` / `[autofocus]`, atau ke panel itu sendiri; Tab berlanjut ke kontrol di dalamnya. Saat ditutup, focus kembali ke trigger kecuali pengguna sudah memindahkannya ke tempat lain.

| Tombol | Aksi |
| --- | --- |
| Enter / Space pada trigger | Buka atau tutup |
| Tab / Shift+Tab | Berpindah antar kontrol di dalam |
| Escape | Tutup dan kembalikan focus ke trigger |

## Razor

```cshtml
<button type="button" class="btn" popovertarget="budget">Ubah anggaran</button>

<ds-popover id="budget" title="Anggaran untuk PRJ-1024" description="Terpakai sejauh ini: IDR 297.600.000" side="bottom" align="start" closable>
    <label class="ds-field"><span class="ds-label">Anggaran (IDR)</span>
        <input class="input w-full" asp-for="Budget" data-ds-initial-focus /></label>
</ds-popover>
```

| Atribut | Efek |
| --- | --- |
| `id` | Id popover untuk `popovertarget` |
| `title`, `description` | Header (menambahkan `aria-labelledby`) |
| `label` | Nama aksesibel bila tidak ada title |
| `side`, `align` | Penempatan yang diutamakan |
| `size` | `sm`, `lg`, `auto` |
| `arrow` | Penunjuk ke trigger |
| `closable` | Tombol tutup di header |

## JavaScript

| Atribut | Efek |
| --- | --- |
| `popovertarget="id"` | Membuka popover di samping trigger ini (script menempatkannya sebelum frame pertama) |
| `popovertargetaction="hide"` | Menutupnya (Batal, Selesai) |
| `data-ds-side`, `data-ds-align` | Penempatan yang diutamakan pada popover |
| `data-ds-gap="8"` | Jarak dari trigger dalam px (default 6) |
| `data-ds-initial-focus` | Elemen yang menerima focus saat dibuka |
| `[popover][data-ds-popover]` | Mengikutsertakan panel kustom ke penempatan dan motion |

```js
DS.popover.open("budget", document.querySelector("#edit-budget"), { side: "top" });
DS.popover.close("budget");
DS.popover.toggle("budget");
DS.popover.place(myPanel, anchorElementOrRect, { side: "bottom", align: "end" }); // hanya penempatan

document.addEventListener("ds:popover:close", (e) => console.log(e.target.id));
```

Event: `ds:popover:open`, `ds:popover:close` (bubble dari popover).

## Token

`--ds-popover`, `--color-base-300`, `--ds-shadow-popover`, `--ds-radius-xl`, `--ds-z-popover`, `--ds-duration-quick`,
`--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-type-card-title-*`, `--ds-type-callout-*`,
`--ds-type-footnote-size`, `--ds-focus`. Variabel script: `--ds-origin`, `--ds-arrow-x`, `--ds-arrow-y`.

## Native dan daisyUI

- HTML Popover API (`popover`, `popovertarget`, `:popover-open`): top layer, light dismiss, dan Escape bersifat native. Tanpa JavaScript, browser tetap membuka dan menutup popover, diposisikan di tengah viewport.
- DS menggunakan `@starting-style` dan `transition-behavior: allow-discrete` sehingga animasi masuk dan keluar berjalan di CSS dan tetap dapat diinterupsi.
- daisyUI `.dropdown` dengan `[popover]` tetap berfungsi; utamakan `.ds-popover` untuk penempatan di samping trigger. `.ds-popover` tanpa `[popover]` adalah permukaan mengambang biasa untuk layer kustom.
