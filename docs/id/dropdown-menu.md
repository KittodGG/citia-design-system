---
title: Dropdown menu
group: components
category: overlays
order: 6
summary: Daftar aksi atau opsi yang dibuka dari sebuah tombol, dengan ikon, shortcut, item checkbox dan radio, submenu, typeahead, dan dukungan keyboard penuh.
source: TPS app.css .master-menu-content (L1616–1650)
---

Dropdown menu mengumpulkan aksi yang tidak layak mendapat tombol sendiri: aksi baris pada tabel, tombol "Lainnya",
menu pengguna, atau opsi tampilan. Menu mengikuti pola menu button WAI-ARIA: menu terbuka dari trigger-nya, highlight
mengikuti tombol panah dan pointer, huruf melompat ke item yang cocok, dan Escape mengembalikan focus ke trigger.
Gunakan [Select](./select.md) atau [Combobox](./combobox.md) untuk memilih nilai di form, [Tabs](./tabs.md) atau
[Segmented control](./segmented-control.md) untuk berpindah tampilan, [Context menu](./context-menu.md) untuk item yang
sama pada klik kanan, dan palet [Command](./command.md) untuk pencarian dan aksi di seluruh aplikasi.

## Contoh

### Aksi dengan ikon dan shortcut

```html preview title="Aksi baris"
<button type="button" class="btn btn-ghost" aria-haspopup="menu" popovertarget="menu-row" aria-label="Aksi untuk INV-2026-0418">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-more"></use></svg>
</button>

<div id="menu-row" popover class="ds-menu" role="menu" aria-label="Aksi untuk INV-2026-0418" data-ds-align="end">
  <button type="button" role="menuitem" class="ds-menu__item">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>
    <span class="ds-menu__text">Lihat invoice</span>
    <kbd class="ds-menu__shortcut">Enter</kbd>
  </button>
  <button type="button" role="menuitem" class="ds-menu__item">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg>
    <span class="ds-menu__text">Ubah</span>
    <kbd class="ds-menu__shortcut">E</kbd>
  </button>
  <button type="button" role="menuitem" class="ds-menu__item">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg>
    <span class="ds-menu__text">Duplikat</span>
    <kbd class="ds-menu__shortcut">Ctrl D</kbd>
  </button>
  <button type="button" role="menuitem" class="ds-menu__item">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg>
    <span class="ds-menu__text">Unduh PDF</span>
  </button>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitem" class="ds-menu__item" aria-disabled="true">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>
    <span class="ds-menu__text">Kirim pengingat<span class="ds-menu__description">Tersedia 3 hari setelah jatuh tempo</span></span>
  </button>
  <button type="button" role="menuitem" class="ds-menu__item is-danger"
          data-ds-confirm="Hapus INV-2026-0418?" data-ds-confirm-text="Draf dan 4 baris itemnya akan dihapus." data-ds-confirm-label="Hapus invoice">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>
    <span class="ds-menu__text">Hapus</span>
    <kbd class="ds-menu__shortcut">Del</kbd>
  </button>
</div>
```

### Item checkbox dan radio, label

Item checkbox dan radio membiarkan menu tetap terbuka, sehingga beberapa opsi dapat diatur dalam satu kunjungan.

```html preview title="Opsi tampilan"
<button type="button" class="btn" aria-haspopup="menu" popovertarget="menu-view">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-sliders"></use></svg>
  Tampilan
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg>
</button>

<div id="menu-view" popover class="ds-menu" role="menu" aria-label="Opsi tampilan">
  <div role="group" aria-labelledby="menu-view-columns">
    <div id="menu-view-columns" class="ds-menu__label" role="presentation">Kolom</div>
    <button type="button" role="menuitemcheckbox" aria-checked="true" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Klien</span></button>
    <button type="button" role="menuitemcheckbox" aria-checked="true" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Jumlah</span></button>
    <button type="button" role="menuitemcheckbox" aria-checked="false" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Jatuh tempo</span></button>
  </div>
  <div role="separator" class="ds-menu__separator"></div>
  <div role="group" aria-labelledby="menu-view-sort">
    <div id="menu-view-sort" class="ds-menu__label" role="presentation">Urutkan menurut</div>
    <button type="button" role="menuitemradio" aria-checked="true" class="ds-menu__item" data-value="newest"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">Terbaru lebih dulu</span></button>
    <button type="button" role="menuitemradio" aria-checked="false" class="ds-menu__item" data-value="oldest"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">Terlama lebih dulu</span></button>
    <button type="button" role="menuitemradio" aria-checked="false" class="ds-menu__item" data-value="amount"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">Jumlah terbesar</span></button>
  </div>
</div>
```

### Submenu

Submenu terbuka ke sisi inline end saat hover (setelah 100ms), saat klik, atau dengan ArrowRight. Menggerakkan pointer
secara diagonal ke arahnya menjaga submenu tetap terbuka.

```html preview title="Pindahkan ke proyek"
<button type="button" class="btn" aria-haspopup="menu" popovertarget="menu-file">
  Aksi file
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg>
</button>

<div id="menu-file" popover class="ds-menu" role="menu" aria-label="Aksi file">
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg><span class="ds-menu__text">Ganti nama</span><kbd class="ds-menu__shortcut">F2</kbd></button>
  <div class="ds-menu__sub" role="none">
    <button type="button" role="menuitem" class="ds-menu__item" aria-haspopup="menu" aria-expanded="false" aria-controls="menu-file-move">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"></use></svg>
      <span class="ds-menu__text">Pindahkan ke</span>
      <svg class="ds-menu__chevron" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg>
    </button>
    <div id="menu-file-move" popover class="ds-menu" role="menu" aria-label="Pindahkan ke">
      <button type="button" role="menuitem" class="ds-menu__item"><span class="ds-menu__text">PRJ-1024 · Relokasi gudang</span></button>
      <button type="button" role="menuitem" class="ds-menu__item"><span class="ds-menu__text">PRJ-1031 · Penyegaran merek</span></button>
      <button type="button" role="menuitem" class="ds-menu__item"><span class="ds-menu__text">PRJ-1040 · Audit tahunan 2026</span></button>
      <div role="separator" class="ds-menu__separator"></div>
      <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg><span class="ds-menu__text">Proyek baru</span></button>
    </div>
  </div>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-share"></use></svg><span class="ds-menu__text">Bagikan</span></button>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Pindahkan ke tempat sampah</span></button>
</div>
```

### Menu pengguna dengan tautan

Item dapat berupa tautan. Catatan di bagian akhir menjelaskan apa yang tidak ada di menu.

```html preview title="Akun"
<button type="button" class="btn btn-ghost" aria-haspopup="menu" popovertarget="menu-account">
  <span class="ds-avatar is-sm" aria-hidden="true">AL</span>
  Ayu Lestari
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg>
</button>

<div id="menu-account" popover class="ds-menu" role="menu" aria-label="Akun" data-ds-align="end">
  <div class="ds-menu__label" role="presentation">ayu.lestari@company.com</div>
  <a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user"></use></svg><span class="ds-menu__text">Profil</span></a>
  <a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-settings"></use></svg><span class="ds-menu__text">Pengaturan</span><kbd class="ds-menu__shortcut">Ctrl ,</kbd></a>
  <a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-credit-card"></use></svg><span class="ds-menu__text">Penagihan</span><span class="ds-menu__meta">Paket Pro</span></a>
  <div role="separator" class="ds-menu__separator"></div>
  <a href="#" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-logout"></use></svg><span class="ds-menu__text">Keluar</span></a>
</div>
```

### Panel versi 1

`.ds-menu-panel` di dalam `<details data-ds-menu>` tetap berfungsi dan terbuka tanpa JavaScript. Panel ini tidak memiliki
roving focus; gunakan `.ds-menu` untuk menu baru.

```html preview title="Menu details (v1)"
<details class="ds-disclosure-menu" data-ds-menu>
  <summary class="btn btn-ghost">Opsi <svg class="ds-icon ds-disclosure-menu__chevron" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></summary>
  <div class="ds-menu-panel">
    <a href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>Lihat detail</a>
    <a href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg>Ubah</a>
    <p>Invoice yang sudah terkirim tidak dapat dihapus.</p>
  </div>
</details>
```

## State

State yang dibekukan pada menu statis (`.is-static`). Pada menu yang aktif, highlight mengikuti focus.

```html preview title="State item"
<div class="ds-menu is-static" role="menu" aria-label="State item">
  <div role="menuitem" class="ds-menu__item" tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">Rest</span></div>
  <div role="menuitem" class="ds-menu__item" data-highlighted tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg><span class="ds-menu__text">Highlighted</span><kbd class="ds-menu__shortcut">E</kbd></div>
  <div role="menuitem" class="ds-menu__item" aria-expanded="true" aria-haspopup="menu" tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-folder"></use></svg><span class="ds-menu__text">Submenu terbuka</span><svg class="ds-menu__chevron" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></div>
  <div role="menuitemcheckbox" aria-checked="true" class="ds-menu__item" tabindex="-1"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Dicentang</span></div>
  <div role="menuitemcheckbox" aria-checked="mixed" class="ds-menu__item" tabindex="-1"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">Campuran</span></div>
  <div role="menuitemradio" aria-checked="true" class="ds-menu__item" tabindex="-1"><span class="ds-menu__indicator" aria-hidden="true"></span><span class="ds-menu__text">Radio terpilih</span></div>
  <div role="menuitem" class="ds-menu__item" aria-disabled="true" tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg><span class="ds-menu__text">Nonaktif<span class="ds-menu__description">Menjelaskan alasannya</span></span></div>
  <div role="menuitem" class="ds-menu__item is-danger" tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Destruktif</span></div>
  <div role="menuitem" class="ds-menu__item is-danger" data-highlighted tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Destruktif, highlighted</span></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Closed | default | Trigger `aria-expanded="false"`, chevron ke bawah |
| Opening | klik, Enter, Space, ArrowDown, ArrowUp | Membesar dari sisi trigger, opacity + scale 0,96 → 1, 160ms emphasized; trigger `aria-expanded="true"`, chevron berputar 180° |
| Item rest | default | Transparan, tinggi 36px (44px pada layar sentuh) |
| Highlighted | pointer di atas item, tombol panah (`:focus`) | State layer 7% dari `--color-base-content` |
| Keyboard focus | `:focus-visible` | Ditambah focus ring `--ds-focus` 2px inset |
| Pressed | `:active` | State layer 10% |
| Checked | `aria-checked="true"` | Centang atau titik di kolom indikator dengan `--ds-primary-text`, bobot label 600 |
| Mixed | `aria-checked="mixed"` | Garis pendek di kolom indikator |
| Submenu open | `aria-expanded="true"` pada item | Mempertahankan highlight selama pointer berada di submenu |
| Disabled | `aria-disabled="true"` | Opacity 55%, kursor `not-allowed`, tetap dapat difokuskan sehingga dapat menjelaskan dirinya |
| Destructive | `.is-danger` | `--ds-error-text`; highlight berupa tint error 10% |
| Empty / loading | `.ds-menu__empty`, `aria-busy="true"` | Catatan di tengah, spinner sebelum teks |
| Closing | Escape, tekan di luar, pemilihan, Tab | Kembali ke trigger, 140ms easing exit |
| Reduced motion | media query | Hanya opacity; indikator tidak berskala |

## Anatomi

- Trigger: `<button>` dengan `aria-haspopup="menu"` dan `popovertarget`.
- `[popover].ds-menu[role=menu]`: panel. Item berada pada subgrid 3 kolom: indikator atau ikon, teks, shortcut atau chevron.
- `.ds-menu__item` dengan `role="menuitem"`, `"menuitemcheckbox"`, atau `"menuitemradio"`.
- Bagian item: `.ds-icon`, `.ds-menu__indicator`, `.ds-menu__text` (dengan `.ds-menu__description`), `.ds-menu__shortcut`, `.ds-menu__meta`, `.ds-menu__chevron`.
- `.ds-menu__label`, `[role=group]` / `.ds-menu__group`, `[role=separator]` / `.ds-menu__separator`, `.ds-menu__note`, `.ds-menu__empty`.
- `.ds-menu__sub[role=none]`: membungkus item submenu dan `.ds-menu` bersarangnya (submenu harus berada di dalam menu induk).

## Penggunaan

- Jaga menu pada 3–10 item; kelompokkan dengan separator setiap 3–5 item. Lebih dari 15 item membutuhkan pencarian: gunakan [Command](./command.md) atau [Combobox](./combobox.md).
- Awali label dengan kata kerja ("Unduh PDF") dan batasi 1–3 kata; taruh detail di `.ds-menu__description`.
- Taruh item destruktif paling akhir, setelah separator, dan konfirmasikan dengan [Alert dialog](./alert-dialog.md).
- Tampilkan item yang nonaktif bila ketiadaannya membingungkan, dan jelaskan alasannya di description.
- Tampilkan shortcut hanya bila benar-benar berfungsi di halaman.
- Paling banyak satu tingkat submenu; jangan menaruh satu-satunya salinan aksi yang sering dipakai di submenu.
- Beri trigger yang hanya berisi ikon sebuah `aria-label` yang menyebut objeknya: "Aksi untuk INV-2026-0418".

## Aksesibilitas

- Trigger: `aria-haspopup="menu"`, `aria-expanded`, `aria-controls` (ditambahkan oleh script). Menu: `role="menu"` dengan nama (`aria-label` atau `aria-labelledby`).
- Item tidak berada dalam urutan Tab (`tabindex="-1"`); focus berpindah di dalam dengan tombol panah dan kembali ke trigger saat menu ditutup.
- Item checkbox dan radio mengekspos `aria-checked`; group mendapat nama dari label yang terlihat.
- Item yang nonaktif tetap dapat difokuskan dengan `aria-disabled="true"` sehingga screen reader dapat membacakan alasannya.

| Tombol | Aksi |
| --- | --- |
| Enter / Space / ArrowDown pada trigger | Buka, highlight item pertama |
| ArrowUp pada trigger | Buka, highlight item terakhir |
| ArrowDown / ArrowUp | Item berikutnya / sebelumnya (berputar) |
| Home / End | Item pertama / terakhir |
| A–Z | Lompat ke item berikutnya yang diawali huruf yang diketik |
| Enter / Space | Aktifkan item (item checkbox dan radio beralih dan tetap terbuka) |
| ArrowRight (ArrowLeft pada RTL) | Buka submenu dan highlight item pertamanya |
| ArrowLeft (ArrowRight pada RTL) | Tutup submenu, kembali ke itemnya |
| Escape | Tutup satu tingkat dan kembalikan focus |
| Tab | Tutup menu dan lanjutkan |

## Razor

```cshtml
<button type="button" class="btn btn-ghost" aria-haspopup="menu" popovertarget="row-@invoice.Id"
        aria-label="@($"Aksi untuk {invoice.Number}")"><ds-icon name="more" /></button>

<ds-menu id="row-@invoice.Id" label="@($"Aksi untuk {invoice.Number}")" align="end">
    <ds-menu-item icon="eye" href="@Url.Page("./Details", new { invoice.Id })">Lihat invoice</ds-menu-item>
    <ds-menu-item icon="pencil" shortcut="E">Ubah</ds-menu-item>
    <ds-menu-sub>
        <ds-menu-item icon="folder" submenu="move-@invoice.Id">Pindahkan ke</ds-menu-item>
        <ds-menu id="move-@invoice.Id" label="Pindahkan ke">
            @foreach (var p in Model.Projects) { <ds-menu-item value="@p.Code">@p.Code · @p.Name</ds-menu-item> }
        </ds-menu>
    </ds-menu-sub>
    <ds-menu-group label="Urutkan menurut">
        <ds-menu-item type="radio" checked value="newest">Terbaru lebih dulu</ds-menu-item>
        <ds-menu-item type="radio" value="amount">Jumlah terbesar</ds-menu-item>
    </ds-menu-group>
    <ds-menu-separator />
    <ds-menu-item icon="send" disabled description="Tersedia 3 hari setelah jatuh tempo">Kirim pengingat</ds-menu-item>
    <ds-menu-item icon="trash" danger>Hapus</ds-menu-item>
</ds-menu>
```

Atribut `ds-menu-item`: `icon`, `shortcut`, `description`, `href`, `value`, `type` (`item`, `checkbox`, `radio`),
`checked`, `disabled`, `danger`, `submenu`. `ds-menu`: `id`, `label`, `side`, `align`, `size`.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `popovertarget="id"` / `data-ds-menu-open="id"` pada trigger | Membuka menu di samping trigger |
| `data-ds-side`, `data-ds-align` pada menu | Penempatan yang diutamakan (default `bottom` + `start`) |
| `data-value` pada item | Nilai di `ds:menu:select` |
| `data-ds-close="false"` / `"true"` | Biarkan menu tetap terbuka setelah item ini / tutup setelah item checkbox atau radio |
| `aria-controls` + `aria-haspopup="menu"` pada item | Submenu |

```js
document.addEventListener("ds:menu:select", (event) => {
  const { value, checked, context } = event.detail;
  if (event.target.closest("#menu-view")) table.sort(value);
});

DS.menu.open("menu-row");   // di samping trigger-nya, item pertama di-highlight
DS.menu.close("menu-row");
DS.menu.closeAll();
```

Event: `ds:menu:open`, `ds:menu:close` (pada menu), `ds:menu:select` (pada item; batalkan untuk membiarkan menu tetap terbuka).

## Token

`--ds-popover`, `--color-base-300`, `--ds-shadow-popover`, `--ds-radius-lg`, `--ds-radius-md`, `--ds-z-menu`,
`--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-disabled`, `--ds-error-text`, `--color-error`,
`--ds-primary-text`, `--ds-focus`, `--ds-subtle`, `--ds-muted`, `--ds-size-target`, `--ds-size-target-compact`,
`--ds-type-eyebrow-*`, `--ds-duration-quick`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`.
Variabel script: `--ds-origin`, `--ds-trigger-width` (menu setidaknya selebar trigger-nya).

## Native dan daisyUI

- HTML Popover API: tanpa JavaScript, trigger tetap membuka menu (di tengah) dan item tetap berfungsi; light dismiss dan Escape bersifat native.
- `<details data-ds-menu>` dengan `.ds-menu-panel` (versi 1) mempertahankan perilakunya dari shell script: tekan di luar dan Escape menutupnya, hanya satu yang terbuka pada satu waktu.
- daisyUI `.dropdown` dan `.menu` tetap tersedia; `.ds-menu` menambahkan pola menu ARIA, penempatan, dan desain state. daisyUI `.menu` adalah daftar navigasi, bukan menu ARIA; gunakan untuk sidebar, bukan untuk menu aksi.
