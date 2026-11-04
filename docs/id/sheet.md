---
title: Sheet
group: components
category: overlays
order: 3
summary: Panel yang meluncur dari tepi layar untuk tugas samping, dengan spring yang mengikuti jari, snap point, dan tarik untuk menutup.
---

Sheet adalah panel modal yang menempel pada satu tepi layar. Cocok untuk tugas yang berkaitan dengan halaman di
belakangnya dan membutuhkan ruang lebih besar daripada [Dialog](./dialog.md): filter, detail sebuah record, form panjang,
keranjang belanja, atau, di ponsel, daftar aksi dari tepi bawah. Halaman tetap terlihat di tepi, sehingga konteks
terjaga. Sheet meluncur masuk dengan critically damped spring dan keluar dengan cara yang sama; bottom sheet dapat
ditarik antar snap point atau dijentikkan untuk menutup. Untuk menu berisi beberapa aksi di desktop gunakan
[Dropdown menu](./dropdown-menu.md); untuk navigasi utama aplikasi di ponsel gunakan drawer [Sidebar](./sidebar.md).

## Contoh

### Side sheet

Terbuka dari tepi akhir inline (kanan pada bahasa kiri-ke-kanan). Body dapat di-scroll; footer memuat aksi.

```html preview title="Filter dari tepi akhir"
<button type="button" class="btn" data-ds-sheet-open="sheet-filters">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-filter"></use></svg>
  Filter
</button>

<dialog id="sheet-filters" class="ds-sheet is-end" aria-labelledby="sheet-filters-title">
  <div class="ds-sheet__header">
    <div class="ds-sheet__heading">
      <h2 id="sheet-filters-title" class="ds-sheet__title">Filter invoice</h2>
      <p class="ds-sheet__description">1.284 invoice sesuai.</p>
    </div>
    <button type="button" class="ds-sheet__close" data-ds-sheet-close aria-label="Tutup">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
    </button>
  </div>
  <div class="ds-sheet__body">
    <div style="display: grid; gap: 1.25rem">
      <label class="ds-field"><span class="ds-label">Klien</span>
        <select class="select w-full"><option>Semua klien</option><option>PT Sinar Mandiri</option><option>Okafor Logistics</option><option>Tanaka Studio</option></select></label>
      <label class="ds-field"><span class="ds-label">Status</span>
        <select class="select w-full"><option>Semua status</option><option>Draf</option><option>Terkirim</option><option>Lunas</option><option>Terlambat</option></select></label>
      <label class="ds-field"><span class="ds-label">Diterbitkan dari</span><input class="input w-full" type="date" value="2026-01-01"></label>
      <label class="ds-field"><span class="ds-label">Diterbitkan sampai</span><input class="input w-full" type="date" value="2026-03-31"></label>
      <label class="ds-field"><span class="ds-label">Jumlah minimum (IDR)</span><input class="input w-full" inputmode="decimal" placeholder="0"></label>
    </div>
  </div>
  <div class="ds-sheet__footer">
    <button type="button" class="btn btn-ghost">Atur ulang</button>
    <button type="button" class="btn btn-primary" data-ds-sheet-close>Tampilkan 1.284 invoice</button>
  </div>
</dialog>
```

### Sisi dan ukuran

```html preview title="Awal, atas, dan besar"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-sheet-open="sheet-start">Dari tepi awal</button>
  <button type="button" class="btn" data-ds-sheet-open="sheet-top">Dari atas</button>
  <button type="button" class="btn" data-ds-sheet-open="sheet-large">Besar, dari tepi akhir</button>
</div>

<dialog id="sheet-start" class="ds-sheet is-start is-sm" aria-labelledby="sheet-start-title">
  <div class="ds-sheet__header">
    <div class="ds-sheet__heading"><h2 id="sheet-start-title" class="ds-sheet__title">Workspace</h2></div>
    <button type="button" class="ds-sheet__close" data-ds-sheet-close aria-label="Tutup"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
  <div class="ds-sheet__body">
    <ul style="display: grid; gap: 0.75rem; margin: 0; padding: 0; list-style: none">
      <li>Kantor Jakarta</li><li>Gudang Surabaya</li><li>Studio Tokyo</li><li>Cabang Lagos</li>
    </ul>
  </div>
</dialog>

<dialog id="sheet-top" class="ds-sheet is-top" aria-labelledby="sheet-top-title">
  <div class="ds-sheet__header">
    <div class="ds-sheet__heading">
      <h2 id="sheet-top-title" class="ds-sheet__title">Pemeliharaan pada hari Minggu, 01:00–03:00 WIB</h2>
      <p class="ds-sheet__description">Ekspor dan pengiriman invoice dijeda selama jendela waktu ini. Draf tersimpan.</p>
    </div>
    <button type="button" class="ds-sheet__close" data-ds-sheet-close aria-label="Tutup"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
  <button type="button" class="ds-sheet__handle" aria-label="Tutup panel"></button>
</dialog>

<dialog id="sheet-large" class="ds-sheet is-end is-lg" aria-labelledby="sheet-large-title">
  <div class="ds-sheet__header">
    <div class="ds-sheet__heading">
      <h2 id="sheet-large-title" class="ds-sheet__title">PRJ-1024 · Relokasi gudang</h2>
      <p class="ds-sheet__description">Penanggung jawab Ayu Lestari · jatuh tempo 30 April 2026</p>
    </div>
    <button type="button" class="ds-sheet__close" data-ds-sheet-close aria-label="Tutup"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
  <div class="ds-sheet__body">
    <p>Pindahkan stok dari gudang Cakung ke lokasi baru di Cikarang dalam tiga gelombang. Setiap gelombang ditutup saat hasil hitung sesuai dengan sistem dalam selisih 0,5%.</p>
    <p>Anggaran IDR 480.000.000, 62% di antaranya sudah terpakai. Milestone berikutnya: penghitungan gelombang 2 pada 14 April.</p>
  </div>
  <div class="ds-sheet__footer">
    <button type="button" class="btn" data-ds-sheet-close>Tutup</button>
    <button type="button" class="btn btn-primary">Buka proyek</button>
  </div>
</dialog>
```

| Class | Ukuran |
| --- | --- |
| `is-sm` | Lebar 20rem (atas dan bawah: lebar maksimum 30rem) |
| default | 24rem (`--ds-size-panel`); atas dan bawah: 40rem |
| `is-lg` | 32rem; atas dan bawah: 52rem |
| `is-xl` | 42rem |
| `is-full` | Selebar layar penuh |

Di ponsel, side sheet menyisakan strip halaman selebar 3rem yang tetap terlihat, sehingga selalu ada konteks dan tempat untuk mengetuk keluar.

### Bottom sheet dengan snap point

Tarik handle atau header. Lepaskan di atas tengah dan sheet berhenti di snap point terdekat; jentikkan ke bawah dan sheet
menutup. Scrim mengikuti jari. Dengan keyboard, handle adalah tombol: Enter berpindah antar snap point dan
ArrowUp / ArrowDown memperbesar atau memperkecil sheet.

```html preview title="Bottom sheet, 45% dan 100%"
<button type="button" class="btn" data-ds-sheet-open="sheet-share">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-share"></use></svg>
  Bagikan laporan
</button>

<dialog id="sheet-share" class="ds-sheet is-bottom" data-ds-sheet-snap="45%,100%" aria-labelledby="sheet-share-title">
  <button type="button" class="ds-sheet__handle" aria-label="Ubah ukuran atau tutup panel"></button>
  <div class="ds-sheet__header">
    <div class="ds-sheet__heading">
      <h2 id="sheet-share-title" class="ds-sheet__title">Bagikan laporan pendapatan Q1</h2>
      <p class="ds-sheet__description">Siapa pun yang memiliki akses ke workspace Keuangan dapat membukanya.</p>
    </div>
    <button type="button" class="ds-sheet__close" data-ds-sheet-close aria-label="Tutup"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
  <div class="ds-sheet__body">
    <div style="display: grid; gap: 0.75rem">
      <button type="button" class="btn btn-ghost" style="justify-content: flex-start"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-link"></use></svg>Salin tautan</button>
      <button type="button" class="btn btn-ghost" style="justify-content: flex-start"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-mail"></use></svg>Kirim lewat email</button>
      <button type="button" class="btn btn-ghost" style="justify-content: flex-start"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg>Unduh PDF (1,4 MB)</button>
      <button type="button" class="btn btn-ghost" style="justify-content: flex-start"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg>Unduh Excel</button>
      <p>Orang dengan akses: Ayu Lestari, Daniel Okafor, Mei Tanaka, Sofia Marquez, dan 8 lainnya.</p>
    </div>
  </div>
</dialog>
```

## State

```html preview title="Diam, header di-scroll, footer sibuk"
<div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); align-items: start">
  <div class="ds-sheet is-static" style="height: 14rem" role="group" aria-label="Diam">
    <div class="ds-sheet__header"><div class="ds-sheet__heading"><h2 class="ds-sheet__title">Detail</h2></div></div>
    <div class="ds-sheet__body"><p>INV-2026-0418 · IDR 12.400.000</p></div>
  </div>
  <div class="ds-sheet is-static" style="height: 14rem" role="group" aria-label="Di-scroll">
    <div class="ds-sheet__header"><div class="ds-sheet__heading"><h2 class="ds-sheet__title">Aktivitas</h2></div></div>
    <div class="ds-sheet__body" data-ds-scrolled><p>Daniel Okafor mengirim INV-2026-0418.</p></div>
  </div>
  <div class="ds-sheet is-static" style="height: 14rem" aria-busy="true" role="group" aria-label="Sibuk">
    <div class="ds-sheet__header"><div class="ds-sheet__heading"><h2 class="ds-sheet__title">Ubah klien</h2></div></div>
    <div class="ds-sheet__body"><input class="input w-full" value="Tanaka Studio" aria-label="Nama"></div>
    <div class="ds-sheet__footer"><button type="button" class="btn btn-primary" aria-busy="true" aria-disabled="true"><span class="ds-spinner" aria-hidden="true"></span>Menyimpan</button></div>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Tertutup | default | Di luar layar melewati tepinya, `display: none` |
| Membuka | `DS.sheet.open()`, `data-ds-sheet-open` | Meluncur dari tepinya dengan `--ds-ease-spring` selama 500ms; scrim memudar masuk selama 220ms |
| Terbuka | `[open]` | Hairline di tepi dalam, `--ds-shadow-overlay`; halaman di belakang inert |
| Ditarik | jari atau pointer pada handle/header (`[data-ds-dragging]`) | Mengikuti 1:1; melewati posisi terbuka penuh, sheet rubber-band (hambatan bertambah seiring jarak); scrim memudar sesuai jarak |
| Menetap | dilepas | Snap point terdekat setelah memproyeksikan lemparan; critically damped spring, atau bounce spring setelah jentikan lebih cepat dari 0.5px/ms antar snap point |
| Ditutup dengan tarikan | lepas dengan proyeksi melewati tepi | Keluar dari posisinya saat itu, 140ms setelah jentikan atau 240ms jika tidak |
| Menutup | Tutup, Escape, klik scrim | Kembali ke tepinya, 240ms, exit easing |
| Body di-scroll | `.ds-sheet__body[data-ds-scrolled]` | Hairline di bawah header |
| Sibuk | `aria-busy="true"` | Body pada 70% dan tidak interaktif; tarikan dan penutupan lewat scrim diblokir |
| Handle hover / fokus | `:hover`, `:focus-visible` | Grabber menggelap; focus ring di sekeliling grabber |
| Reduced motion | media query | Tanpa slide: fade opacity 150ms; tarikan tetap berfungsi |

## Anatomi

- `dialog.ds-sheet` dengan sisi (`is-start`, `is-end`, `is-top`, `is-bottom`) dan ukuran.
- `.ds-sheet__handle`: tombol grabber (bottom dan top sheet); area tarik dan kontrol keyboard.
- `.ds-sheet__header` → `.ds-sheet__heading` (`.ds-sheet__title`, `.ds-sheet__description`) dan `.ds-sheet__close`.
- `.ds-sheet__body`: dapat di-scroll.
- `.ds-sheet__footer`: aksi, selalu terlihat.

## Penggunaan

- Gunakan side sheet untuk konten yang melekat pada halaman (filter, detail sebuah baris, form terkait). Gunakan halaman untuk tugas yang berdiri sendiri.
- Buka side sheet dari tepi akhir; sisakan tepi awal untuk navigasi.
- Gunakan bottom sheet di ponsel untuk daftar aksi dan form cepat; di desktop pilih menu atau side sheet.
- Tambahkan snap point hanya saat keadaan setengah tinggi berguna dengan sendirinya (daftar singkat dengan "tampilkan lebih banyak"). Paling banyak dua snap point.
- Letakkan aksi utama di footer, bukan di ujung body yang panjang.
- Sheet dapat ditutup dengan klik pada scrim; tambahkan `data-ds-dismissible="false"` saat sheet berisi input yang belum disimpan.

## Aksesibilitas

- Sheet adalah dialog modal: `aria-labelledby` pada judul, fokus terjebak di dalam, halaman di belakang inert, fokus dikembalikan saat ditutup.
- Fokus awal menuju field pertama di body, jika tidak ada maka tombol tutup.
- Menarik tidak pernah menjadi satu-satunya cara: tombol tutup, Escape, dan tombol handle melakukan hal yang sama.

| Tombol | Aksi |
| --- | --- |
| Tab / Shift+Tab | Berpindah di dalam sheet |
| Escape | Menutup |
| Enter / Space pada handle | Snap point berikutnya; menutup sheet tanpa snap point |
| ArrowUp / ArrowDown pada handle | Memperbesar / memperkecil bottom sheet (ArrowDown pada ukuran terkecil menutupnya) |

Gerak: slide memakai critically damped spring (tanpa overshoot); bounce spring hanya dipakai setelah jentikan, dan tidak
pernah melewati posisi terbuka penuh, sehingga tidak ada celah yang terlihat di tepi.

## Razor

```cshtml
<button type="button" class="btn" data-ds-sheet-open="filters">Filter</button>

<ds-sheet id="filters" side="end" title="Filter invoice" description="@($"{Model.Count:N0} invoice sesuai.")">
    <form id="filter-form" method="get">…</form>
    <ds-sheet-footer>
        <a asp-page="./Index" class="btn btn-ghost">Atur ulang</a>
        <button type="submit" form="filter-form" class="btn btn-primary">Tampilkan hasil</button>
    </ds-sheet-footer>
</ds-sheet>

<ds-sheet id="share" side="bottom" snap="45%,100%" title="Bagikan laporan">…</ds-sheet>
```

| Atribut | Efek |
| --- | --- |
| `side` | `start`, `end` (default), `top`, `bottom` |
| `size` | `sm`, `lg`, `xl`, `full` |
| `title`, `description` | Teks header |
| `snap` | Snap point sebagai pecahan yang terlihat, dari yang terkecil |
| `handle` | Tampilkan atau sembunyikan grabber (default: top dan bottom sheet) |
| `dismissible="false"` | Klik scrim tidak menutup |

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-sheet-open="id"` | Membuka sheet |
| `data-ds-sheet-close` | Menutup sheet terdekat |
| `data-ds-sheet-snap="45%,100%"` | Snap point |
| `data-ds-sheet-initial="1"` | Indeks snap point tempat sheet dibuka |
| `data-ds-sheet-drag` | Area tarik tambahan di dalam sheet |
| `data-ds-no-drag` | Tidak pernah memulai tarikan dari elemen ini |
| `data-ds-dismissible="false"` | Tetap terbuka saat scrim diklik |

```js
DS.sheet.open("share", button, { snap: 1 });   // buka di snap point kedua
DS.sheet.snap("share", 0);
DS.sheet.close("share");
DS.sheet.open("inspector", null, { modal: false }); // tanpa scrim, halaman tetap dapat dipakai

document.addEventListener("ds:sheet:snap", (e) => console.log(e.detail.index));
```

Event: `ds:sheet:open`, `ds:sheet:close`, `ds:sheet:snap` (`detail.index`), ditambah `ds:dialog:open` / `ds:dialog:close`.

## Token

`--ds-size-panel`, `--ds-scrim`, `--ds-shadow-overlay`, `--ds-radius-2xl`, `--ds-z-modal`, `--ds-duration-spring`,
`--ds-ease-spring`, `--ds-duration-spring-bounce`, `--ds-ease-spring-bounce`, `--ds-duration-layout`, `--ds-ease-exit`,
`--ds-duration-exit`, `--ds-duration-enter`, `--ds-type-section-*`, `--ds-space-*`. Variabel script:
`--ds-sheet-dx`, `--ds-sheet-dy` (offset dalam px), `--ds-sheet-scrim` (0–1).

## Native dan daisyUI

- Dibangun di atas `<dialog>` modal native: top layer, focus trap, dan Escape tanpa script. Tanpa JavaScript, buka dengan `<button commandfor="id" command="show-modal">` bila didukung.
- daisyUI `.drawer` tetap tersedia untuk layout aplikasi; `.ds-sheet` adalah versi overlay-nya. Box daisyUI `.modal-bottom` / `.modal-start` / `.modal-end` juga mendapat gerak DS, tetapi tanpa tarikan.
