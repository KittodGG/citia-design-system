---
title: Context menu
group: components
category: overlays
order: 7
summary: Aksi untuk item di posisi pointer, dibuka dengan klik kanan, long-press di layar sentuh, Shift+F10 atau tombol menu, dengan anatomi yang sama seperti dropdown menu.
---

Context menu menampilkan aksi yang berlaku untuk objek di bawah pointer: sebuah berkas, satu baris, atau kartu di papan. Menu ini terbuka di posisi pointer saat klik kanan, setelah long-press 500ms di layar sentuh, dan di elemen yang sedang fokus dengan Shift+F10 atau tombol ContextMenu. Item, keyboard, dan state-nya sama dengan [Dropdown menu](./dropdown-menu.md). Context menu hanyalah jalan pintas, bukan satu-satunya cara: setiap aksi di dalamnya harus juga dapat dijangkau dari tombol atau menu yang terlihat.

## Contoh

### Daftar berkas

Klik kanan sebuah berkas (atau long-press di ponsel, atau fokuskan lalu tekan Shift+F10). Baris yang ditekan dikirim bersama event pemilihan sebagai `detail.context`.

```html preview title="Berkas"
<ul data-ds-context-menu="ctx-file" aria-label="Berkas di PRJ-1024" style="display: grid; gap: 0.25rem; margin: 0; padding: 0; list-style: none">
  <li><button type="button" class="btn btn-ghost w-full" style="justify-content: flex-start" data-ds-context-item data-file="site-plan.pdf"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg>site-plan.pdf<span class="ds-menu__meta" style="margin-inline-start: auto">2.4 MB</span></button></li>
  <li><button type="button" class="btn btn-ghost w-full" style="justify-content: flex-start" data-ds-context-item data-file="stock-count-wave-1.xlsx"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg>stock-count-wave-1.xlsx<span class="ds-menu__meta" style="margin-inline-start: auto">380 KB</span></button></li>
  <li><button type="button" class="btn btn-ghost w-full" style="justify-content: flex-start" data-ds-context-item data-file="handover-notes.docx"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-text"></use></svg>handover-notes.docx<span class="ds-menu__meta" style="margin-inline-start: auto">54 KB</span></button></li>
</ul>

<div id="ctx-file" popover class="ds-menu" role="menu" aria-label="Aksi berkas">
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-eye"></use></svg><span class="ds-menu__text">Buka</span><kbd class="ds-menu__shortcut">Enter</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg><span class="ds-menu__text">Unduh</span></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg><span class="ds-menu__text">Ganti nama</span><kbd class="ds-menu__shortcut">F2</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-link"></use></svg><span class="ds-menu__text">Salin tautan</span><kbd class="ds-menu__shortcut">Ctrl L</kbd></button>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitem" class="ds-menu__item is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg><span class="ds-menu__text">Pindahkan ke tempat sampah</span><kbd class="ds-menu__shortcut">Del</kbd></button>
</div>
```

### Area kanvas

Region tanpa child yang dapat difokuskan mendapat `tabindex="0"` dari script, sehingga pengguna keyboard dapat menjangkau menunya.

```html preview title="Area papan"
<div class="ds-context-area" data-ds-context-menu="ctx-board" aria-label="Papan: Brand refresh">
  Klik kanan atau long-press di mana saja pada area ini
</div>

<div id="ctx-board" popover class="ds-menu" role="menu" aria-label="Papan">
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg><span class="ds-menu__text">Kartu baru</span><kbd class="ds-menu__shortcut">N</kbd></button>
  <button type="button" role="menuitem" class="ds-menu__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-columns"></use></svg><span class="ds-menu__text">Kolom baru</span></button>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitemcheckbox" aria-checked="true" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Tampilkan tenggat</span></button>
  <button type="button" role="menuitemcheckbox" aria-checked="false" class="ds-menu__item"><span class="ds-menu__indicator" aria-hidden="true"><svg><use href="#ds-icon-check"></use></svg></span><span class="ds-menu__text">Tampilkan avatar</span></button>
  <div role="separator" class="ds-menu__separator"></div>
  <button type="button" role="menuitem" class="ds-menu__item" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-clipboard"></use></svg><span class="ds-menu__text">Tempel<span class="ds-menu__description">Belum ada yang disalin</span></span><kbd class="ds-menu__shortcut">Ctrl V</kbd></button>
</div>
```

## State

State menu sama dengan [Dropdown menu](./dropdown-menu.md#state). Region menambahkan dua state.

```html preview title="Region saat diam dan ditekan"
<div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr))">
  <div class="ds-context-area" data-ds-context-menu="none" style="min-height: 6rem">Diam</div>
  <div class="ds-context-area" data-ds-context-menu="none" data-ds-pressing style="min-height: 6rem">Long-press sedang berlangsung</div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Region diam | default | Tidak ada perubahan visual; `.ds-context-area` menampilkan kotak petunjuk putus-putus untuk kanvas kosong |
| Long-press | sentuhan ditahan 150ms (`[data-ds-pressing]`) | Region diberi tint dengan state layer hover; menu terbuka pada 500ms dengan getaran 8ms jika didukung |
| Long-press dibatalkan | jari bergeser lebih dari 10px, diangkat, atau sistem melakukan scroll | Tint memudar, tidak ada yang terbuka |
| Terbuka di pointer | klik kanan | Sudut kiri atas menu berada di pointer (membalik agar tetap di layar), tumbuh dari sudut itu, 160ms |
| Terbuka dari keyboard | Shift+F10, tombol ContextMenu | Di bawah elemen yang fokus, item pertama di-highlight |
| Menu native | Shift + klik kanan saat `data-ds-context-native="shift"` | Menu bawaan browser |
| Tertutup | Escape, tekan di luar, pemilihan, Tab | Fokus kembali ke elemen yang sebelumnya fokus |

## Anatomi

- Region: elemen apa pun dengan `data-ds-context-menu="menu-id"`; `.ds-context-area` opsional untuk kanvas kosong.
- `[data-ds-context-item]` di dalam region: item yang ditekan, dikirim sebagai `detail.context`.
- Menu: `[popover].ds-menu[role=menu]` dengan anatomi [Dropdown menu](./dropdown-menu.md#anatomi).

## Penggunaan

- Sediakan aksi yang sama di tempat yang terlihat (tombol "Lainnya" pada baris, atau toolbar). Pengguna yang tidak tahu soal klik kanan atau long-press tidak boleh kehilangan fungsi apa pun.
- Urutkan item berdasarkan frekuensi; letakkan item destruktif paling akhir.
- Batasi menu kurang dari 10 item; submenu tidak lebih dari satu tingkat.
- Jangan ganti menu browser pada teks yang mungkin ingin disalin pengguna, tautan, atau input. Gunakan `data-ds-context-native="shift"` jika menu browser masih berguna.

## Aksesibilitas

- Region harus dapat difokuskan (child yang dapat difokuskan, atau `tabindex="0"` yang ditambahkan script) dan sebaiknya punya nama aksesibel.
- Shift+F10 dan tombol ContextMenu membuka menu di elemen yang fokus dengan item pertama di-highlight; Escape mengembalikan fokus ke sana.
- Di dalam menu, perilaku keyboard sama dengan dropdown menu.

| Tombol | Aksi |
| --- | --- |
| Shift+F10 / ContextMenu | Membuka menu di elemen yang fokus |
| ArrowDown / ArrowUp, Home / End | Memindahkan highlight |
| A–Z | Typeahead |
| Enter / Space | Mengaktifkan |
| Escape | Menutup dan mengembalikan fokus |

## Razor

```cshtml
<ul data-ds-context-menu="file-menu" aria-label="Berkas">
    @foreach (var file in Model.Files)
    {
        <li><a asp-page="/Files/Open" asp-route-id="@file.Id" data-ds-context-item data-value="@file.Id">@file.Name</a></li>
    }
</ul>

<ds-menu id="file-menu" label="Aksi berkas">
    <ds-menu-item icon="download" value="download">Unduh</ds-menu-item>
    <ds-menu-item icon="pencil" value="rename" shortcut="F2">Ganti nama</ds-menu-item>
    <ds-menu-separator />
    <ds-menu-item icon="trash" value="delete" danger>Pindahkan ke tempat sampah</ds-menu-item>
</ds-menu>
```

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-context-menu="id"` | Membuka menu dengan id tersebut saat klik kanan, long-press, Shift+F10 atau ContextMenu di dalam elemen |
| `data-ds-context-item` | Menandai elemen yang dikirim sebagai `detail.context` |
| `data-ds-context-native="shift"` | Shift + klik kanan menampilkan menu browser |

```js
document.addEventListener("ds:menu:select", (event) => {
  const file = event.detail.context?.dataset.file;
  if (event.target.closest("#ctx-file") && file) console.log(event.detail.value, file);
});

DS.contextMenu.open(region, 320, 240); // di sebuah titik; hilangkan x/y untuk membuka di elemen yang fokus
```

Event: `ds:context-menu:open` pada region (`detail.context`), lalu event menu `ds:menu:open`, `ds:menu:select`,
`ds:menu:close`.

## Token

Sama dengan [Dropdown menu](./dropdown-menu.md#token), ditambah `--ds-opacity-state-hover` (tint long-press),
`--ds-duration-settle` (tint memudar), `--ds-control-border` dan `--ds-radius-xl` (`.ds-context-area`).

## Native dan daisyUI

- Memakai event `contextmenu` native, yang dipicu browser untuk klik kanan, Shift+F10 dan tombol ContextMenu; long-press dideteksi dengan pointer event karena iOS tidak memicu `contextmenu`.
- Menu adalah popover HTML; tanpa JavaScript, menu browser muncul seperti biasa.
- daisyUI tidak memiliki context menu.
