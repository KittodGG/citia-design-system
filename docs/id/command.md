---
title: Command
group: components
category: overlays
order: 9
summary: Kolom pencarian di atas daftar halaman dan aksi yang dikelompokkan, sebagai palette yang dibuka dengan pintasan atau inline, dengan state kosong dan loading.
---

Command palette memungkinkan pengguna melompat ke halaman mana pun atau menjalankan aksi apa pun dengan mengetik beberapa huruf: "inv" menemukan Invoices, "new cl" menemukan New client. Palette terbuka dengan pintasan (Ctrl+K di Windows dan Linux, Cmd+K di macOS) atau sebuah tombol, memfilter saat pengguna mengetik, dan menjalankan item yang di-highlight dengan Enter. Komponen yang sama dapat dipakai inline, misalnya sebagai isi dialog "Pindahkan ke proyek". Gunakan [Combobox](./combobox.md) untuk memilih nilai pada field form, [Search input](./search-input.md) untuk memfilter daftar di halaman, dan [Dropdown menu](./dropdown-menu.md) untuk daftar pendek aksi pada satu objek.

## Contoh

### Palette

Di situs ini Ctrl+K sudah membuka pencarian dokumentasi, jadi contoh ini memakai Ctrl+J (Cmd+J di macOS). Di aplikasi gunakan `data-ds-command-shortcut="mod+k"`.

```html preview title="Command palette"
<button type="button" class="btn" data-ds-command-open="cmd-palette">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
  Cari atau jalankan perintah
  <kbd class="ds-kbd" data-ds-command-hint="cmd-palette">Ctrl J</kbd>
</button>

<dialog id="cmd-palette" class="ds-command-dialog" data-ds-command data-ds-command-shortcut="mod+j" aria-label="Command palette">
  <div class="ds-command">
    <div class="ds-command__search">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
      <input type="search" class="ds-command__input" placeholder="Ketik perintah atau cari" aria-label="Command palette" data-ds-initial-focus>
      <kbd class="ds-kbd">Esc</kbd>
    </div>
    <div class="ds-command__list" aria-label="Hasil">
      <div class="ds-command__group">
        <div class="ds-command__group-label">Halaman</div>
        <a href="#" class="ds-command__item" data-keywords="home overview beranda ringkasan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-dashboard"></use></svg><span class="ds-command__text"><span class="ds-command__label">Dashboard</span></span><kbd class="ds-command__shortcut">G D</kbd></a>
        <a href="#" class="ds-command__item" data-keywords="billing tagihan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"></use></svg><span class="ds-command__text"><span class="ds-command__label">Invoices</span><span class="ds-command__description">1,284 faktur, 17 jatuh tempo</span></span><kbd class="ds-command__shortcut">G I</kbd></a>
        <a href="#" class="ds-command__item" data-keywords="customers companies pelanggan perusahaan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-building"></use></svg><span class="ds-command__text"><span class="ds-command__label">Clients</span></span><kbd class="ds-command__shortcut">G C</kbd></a>
        <a href="#" class="ds-command__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg><span class="ds-command__text"><span class="ds-command__label">Projects</span></span><kbd class="ds-command__shortcut">G P</kbd></a>
      </div>
      <div class="ds-command__group">
        <div class="ds-command__group-label">Aksi</div>
        <div class="ds-command__item" data-value="new-invoice" data-keywords="create bill buat tagihan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-plus"></use></svg><span class="ds-command__text"><span class="ds-command__label">New invoice</span></span><kbd class="ds-command__shortcut">N</kbd></div>
        <div class="ds-command__item" data-value="new-client" data-keywords="create customer buat pelanggan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user-plus"></use></svg><span class="ds-command__text"><span class="ds-command__label">New client</span></span></div>
        <div class="ds-command__item" data-value="export" data-keywords="excel download unduh ekspor"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg><span class="ds-command__text"><span class="ds-command__label">Export invoices to Excel</span></span></div>
        <div class="ds-command__item" data-value="theme" data-keywords="dark light appearance gelap terang tampilan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-moon"></use></svg><span class="ds-command__text"><span class="ds-command__label">Switch theme</span></span></div>
      </div>
      <div class="ds-command__group">
        <div class="ds-command__group-label">Orang</div>
        <a href="#" class="ds-command__item" data-keywords="operations jakarta operasional"><span class="ds-avatar is-sm" aria-hidden="true">AL</span><span class="ds-command__text"><span class="ds-command__label">Ayu Lestari</span><span class="ds-command__description">Kepala operasional</span></span></a>
        <a href="#" class="ds-command__item" data-keywords="finance lagos keuangan"><span class="ds-avatar is-sm" aria-hidden="true">DO</span><span class="ds-command__text"><span class="ds-command__label">Daniel Okafor</span><span class="ds-command__description">Keuangan</span></span></a>
        <a href="#" class="ds-command__item" data-keywords="design tokyo desain"><span class="ds-avatar is-sm" aria-hidden="true">MT</span><span class="ds-command__text"><span class="ds-command__label">Mei Tanaka</span><span class="ds-command__description">Desain</span></span></a>
      </div>
    </div>
    <div class="ds-command__empty" hidden>
      <strong>Tidak ada hasil untuk “<span data-ds-command-query></span>”</strong>
      <span data-ds-command-message>Periksa ejaan atau cari dengan kata yang lebih pendek.</span>
    </div>
    <div class="ds-command__footer" aria-hidden="true">
      <span><kbd class="ds-kbd">↑</kbd><kbd class="ds-kbd">↓</kbd>untuk berpindah</span>
      <span><kbd class="ds-kbd">Enter</kbd>untuk membuka</span>
      <span><kbd class="ds-kbd">Esc</kbd>untuk menutup</span>
    </div>
  </div>
</dialog>
```

### Inline

```html preview title="Pindah ke proyek"
<div class="ds-command is-inline" style="max-width: 28rem">
  <div class="ds-command__search">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
    <input type="search" class="ds-command__input" placeholder="Cari proyek" aria-label="Cari proyek">
  </div>
  <div class="ds-command__list" aria-label="Proyek">
    <div class="ds-command__group">
      <div class="ds-command__group-label">Terbaru</div>
      <div class="ds-command__item" data-value="PRJ-1024"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg><span class="ds-command__text"><span class="ds-command__label">Relokasi gudang</span></span><span class="ds-command__meta">PRJ-1024</span></div>
      <div class="ds-command__item" data-value="PRJ-1031"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg><span class="ds-command__text"><span class="ds-command__label">Brand refresh</span></span><span class="ds-command__meta">PRJ-1031</span></div>
    </div>
    <div class="ds-command__group">
      <div class="ds-command__group-label">Semua proyek</div>
      <div class="ds-command__item" data-value="PRJ-1040"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg><span class="ds-command__text"><span class="ds-command__label">Audit tahunan 2026</span></span><span class="ds-command__meta">PRJ-1040</span></div>
      <div class="ds-command__item" data-value="PRJ-1052"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg><span class="ds-command__text"><span class="ds-command__label">Portal pelanggan</span></span><span class="ds-command__meta">PRJ-1052</span></div>
      <div class="ds-command__item" data-value="PRJ-0998" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-archive"></use></svg><span class="ds-command__text"><span class="ds-command__label">Pindah kantor 2025</span><span class="ds-command__description">Diarsipkan, hanya baca</span></span><span class="ds-command__meta">PRJ-0998</span></div>
    </div>
  </div>
  <div class="ds-command__empty" hidden><strong>Tidak ada proyek yang cocok dengan “<span data-ds-command-query></span>”</strong><span data-ds-command-message>Proyek yang diarsipkan juga ikut dicari.</span></div>
</div>
```

## State

```html preview title="Highlight, kosong, loading"
<div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); align-items: start">
  <div class="ds-command" role="group" aria-label="Di-highlight">
    <div class="ds-command__search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input class="ds-command__input" value="inv" aria-label="Cari"></div>
    <div class="ds-command__list">
      <div class="ds-command__item" aria-selected="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-receipt"></use></svg><span class="ds-command__text"><span class="ds-command__label"><mark>Inv</mark>oices</span></span></div>
      <div class="ds-command__item"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-plus"></use></svg><span class="ds-command__text"><span class="ds-command__label">New <mark>inv</mark>oice</span></span></div>
    </div>
  </div>
  <div class="ds-command" role="group" aria-label="Kosong">
    <div class="ds-command__search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input class="ds-command__input" value="payroll" aria-label="Cari"></div>
    <div class="ds-command__empty"><strong>Tidak ada hasil untuk “payroll”</strong><span>Periksa ejaan atau cari dengan kata yang lebih pendek.</span></div>
  </div>
  <div class="ds-command" aria-busy="true" role="group" aria-label="Memuat">
    <div class="ds-command__search"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg><input class="ds-command__input" value="okafor" aria-label="Cari"></div>
    <div class="ds-command__loading"><span class="ds-spinner" aria-hidden="true"></span>Mencari</div>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Tertutup | default | Palette tersembunyi; petunjuk menampilkan "Ctrl K" atau "⌘K" sesuai platform |
| Membuka | pintasan, `data-ds-command-open`, `DS.command.open()` | Scrim memudar masuk; palette di 12% dari atas, opasitas + scale 0.98 → 1, 180ms; input fokus dan kosong |
| Memfilter | mengetik | Item yang tidak memuat setiap kata yang diketik disembunyikan, grup kosong disembunyikan, item pertama di-highlight, huruf yang cocok dicetak tebal |
| Di-highlight | tombol panah, pointer bergerak | Tint primary 12%, bar primary 2px di sisi awal, ikon dengan `--ds-primary-text` (`aria-selected="true"`) |
| Ditekan | `:active` | Tint 18% |
| Item nonaktif | `aria-disabled="true"` | Opasitas 55%, dilewati tombol panah, Enter tidak melakukan apa pun |
| Kosong | tidak ada item yang cocok | `.ds-command__empty`: query dicetak tebal dan satu baris petunjuk |
| Loading | pencarian remote berjalan selama 300ms (`aria-busy="true"`) | Spinner dan "Mencari"; item yang ada meredup ke 60% |
| Error | pencarian remote gagal | State kosong dengan "Pencarian tidak tersedia. Coba lagi sebentar lagi." |
| Menutup | Escape, tekan scrim, item dipilih | Kembali dengan cara yang sama, 140ms; fokus kembali ke tempat sebelumnya |
| Reduced motion | media query | Hanya opasitas |

## Anatomi

- `dialog.ds-command-dialog[data-ds-command]`: palette (hilangkan untuk inline).
- `.ds-command` (`is-inline` di luar dialog).
- `.ds-command__search` dengan `.ds-command__input` (`role="combobox"`, ditambahkan script) dan petunjuk `.ds-kbd` opsional.
- `.ds-command__list` (`role="listbox"`) → `.ds-command__group` (`.ds-command__group-label`) → `.ds-command__item` (`role="option"`).
- Bagian item: `.ds-icon` atau `.ds-avatar`, `.ds-command__text` (`.ds-command__label`, `.ds-command__description`), `.ds-command__shortcut` atau `.ds-command__meta`.
- `.ds-command__separator`, `.ds-command__empty` (`[data-ds-command-query]`, `[data-ds-command-message]`), `.ds-command__loading`, `.ds-command__footer`.

## Penggunaan

- Gunakan satu palette per aplikasi, dibuka dengan Ctrl+K / Cmd+K dan dari tombol pencarian yang terlihat di top bar.
- Kelompokkan hasil menurut jenis (Halaman, Aksi, Orang, Terbaru) dan jaga setiap grup di bawah 8 item sebelum pencarian mempersempitnya.
- Tulis label item sebagai kata benda untuk tempat ("Invoices") dan frasa kata kerja untuk aksi ("New invoice").
- Tambahkan `data-keywords` berisi sinonim dalam kata-kata pengguna ("bill" untuk invoice, "customer" untuk client) dan kedua bahasa bila aplikasi dwibahasa.
- Tampilkan hanya pintasan yang berfungsi.
- Jaga pencarian remote tetap cepat: mulai setelah 2 karakter, tampilkan spinner hanya setelah 300ms, batasi hasil hingga 20.

## Aksesibilitas

- Input adalah `combobox` dengan `aria-expanded="true"`, `aria-controls` yang mengarah ke `listbox`, dan `aria-activedescendant` yang mengarah ke `option` yang di-highlight. Fokus tidak pernah meninggalkan input.
- Grup adalah `role="group"` yang dinamai oleh label yang terlihat.
- Status polite mengumumkan jumlah hasil 400ms setelah pengetikan berhenti ("8 hasil", "Tidak ada hasil").
- Palette adalah dialog modal dengan nama; Escape menutupnya dan fokus kembali.

| Tombol | Aksi |
| --- | --- |
| Ctrl+K / Cmd+K (dapat dikonfigurasi) | Membuka atau menutup palette |
| ArrowDown / ArrowUp | Item berikutnya / sebelumnya (berputar, melewati item nonaktif) |
| Enter | Menjalankan item yang di-highlight |
| Escape | Menutup palette; inline: mengosongkan query |
| Home / End | Memindahkan caret di input |

## Razor

```cshtml
<button type="button" class="btn" data-ds-command-open="palette">
    Cari <kbd class="ds-kbd" data-ds-command-hint="palette">Ctrl K</kbd>
</button>

<ds-command id="palette" palette shortcut="mod+k" source="/api/search?q={query}" min-length="2">
    <ds-command-group label="Halaman">
        <ds-command-item icon="dashboard" href="/" shortcut="G D">Dashboard</ds-command-item>
        <ds-command-item icon="receipt" href="/Invoices" keywords="billing bill tagihan">Invoices</ds-command-item>
    </ds-command-group>
    <ds-command-group label="Aksi">
        <ds-command-item icon="file-plus" value="new-invoice" shortcut="N">New invoice</ds-command-item>
    </ds-command-group>
</ds-command>
```

`ds-command`: `id`, `palette`, `shortcut`, `placeholder`, `label`, `source`, `min-length`, `hints`.
`ds-command-item`: `icon`, `description`, `shortcut`, `href`, `value`, `keywords`, `disabled`, `danger`.

Endpoint `source` mengembalikan JSON, misalnya dari minimal API:

```csharp
app.MapGet("/api/search", (string q, AppDb db) => db.Clients
    .Where(c => c.Name.Contains(q))
    .Take(20)
    .Select(c => new { group = "Clients", label = c.Name, description = c.City, href = $"/Clients/{c.Id}", icon = "building" }));
```

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-command` pada `<dialog>` | Menandai palette |
| `data-ds-command-shortcut="mod+k"` | Pintasan: `mod` (Cmd di Apple, Ctrl di platform lain), `ctrl`, `meta`, `alt`, `shift` + sebuah tombol, atau satu tombol seperti `/` (diabaikan saat mengetik) |
| `data-ds-command-open="id"` | Membuka palette |
| `data-ds-command-hint="id"` | Mengisi elemen dengan label pintasan sesuai platform |
| `data-keywords`, `data-value` pada item | Kata pencocok tambahan; nilai yang dikirim bersama `ds:command:select` |
| `data-ds-command-always` | Item tidak pernah disaring keluar (misalnya "Cari di pusat bantuan untuk …") |
| `data-ds-keep-open` | Palette tetap terbuka setelah item dijalankan |
| `data-ds-command-source`, `data-ds-command-min` | Hasil remote (array JSON), panjang query minimum |

```js
document.addEventListener("ds:command:select", (event) => {
  if (event.detail.value === "export") location.assign("/invoices/export?format=xlsx");
  if (event.detail.value === "new-invoice") DS.dialog.open("dlg-new-invoice");
});

DS.command.open("palette");
DS.command.setLoading("palette", true);
DS.command.setItems("palette", [{ group: "Clients", label: "Okafor Logistics", href: "/clients/88", icon: "building" }]);
DS.command.filter("palette", "okafor");
```

Event: `ds:command:select` (dapat dibatalkan; `detail.value`, `detail.item`, `detail.query`), `ds:command:query`
(`detail.query`, pada setiap input), ditambah `ds:dialog:open` / `ds:dialog:close` untuk palette.

## Token

`--ds-popover`, `--color-base-300`, `--ds-shadow-overlay`, `--ds-radius-2xl`, `--ds-radius-md`, `--ds-scrim`,
`--color-primary`, `--ds-primary-text`, `--ds-opacity-state-selected`, `--ds-opacity-state-hover`, `--ds-opacity-disabled`,
`--ds-subtle`, `--ds-muted`, `--ds-focus`, `--ds-type-eyebrow-*`, `--ds-type-body-size`, `--ds-type-callout-size`,
`--ds-duration-base`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`.

## Native dan daisyUI

- Palette adalah `<dialog>` modal native; daftarnya HTML biasa, sehingga item berupa tautan berfungsi tanpa JavaScript (pemfilteran dan keyboard memerlukannya).
- `type="search"` memberi keyboard seluler tombol cari; DS menyembunyikan tombol hapus native agar baris tetap tenang.
- daisyUI tidak memiliki komponen command; input tidak mewarisi apa pun dari `.input` dengan sengaja (barisnya adalah field-nya).
