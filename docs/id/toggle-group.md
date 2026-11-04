---
title: Toggle group
group: components
category: actions
order: 7
summary: Sekumpulan toggle yang satu (single) atau beberapa (multiple) di antaranya bisa menyala. Roving focus, tombol panah, semantik radiogroup atau toolbar, nilai form.
---

Toggle group adalah deretan [toggle](./toggle.md) yang saling terkait: pengganti tampilan (daftar, kisi), bilah format teks (tebal, miring, garis bawah), filter status. Pada mode single tepat satu item menyala, seperti radio group. Pada mode multiple sejumlah item boleh menyala. Untuk memilih bagian halaman pakai [tabs](./tabs.md), untuk pengganti yang menganimasikan indikator pakai [segmented control](./segmented-control.md), dan untuk aksi biasa pakai [button group](./button-group.md).

## Contoh

### Single

Satu item selalu menyala. Tombol panah memindahkan dan memilih, Tab masuk ke item yang terpilih.

```html preview title="Single, radiogroup"
<div class="ds-toggle-group" data-ds-toggle-group="single" role="radiogroup" aria-label="Periode laporan">
  <button type="button" class="ds-toggle" role="radio" aria-checked="false" data-value="week">Minggu</button>
  <button type="button" class="ds-toggle" role="radio" aria-checked="true" data-value="month">Bulan</button>
  <button type="button" class="ds-toggle" role="radio" aria-checked="false" data-value="quarter">Kuartal</button>
  <button type="button" class="ds-toggle" role="radio" aria-checked="false" data-value="year">Tahun</button>
</div>
```

### Dengan ikon

Item hanya-ikon butuh `aria-label`.

```html preview title="Pengganti tampilan"
<div class="ds-toggle-group" data-ds-toggle-group="single" role="radiogroup" aria-label="Tampilan">
  <button type="button" class="ds-toggle is-icon" role="radio" aria-checked="true" data-value="list" aria-label="Tampilan daftar" title="Tampilan daftar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-list"></use></svg></button>
  <button type="button" class="ds-toggle is-icon" role="radio" aria-checked="false" data-value="grid" aria-label="Tampilan kisi" title="Tampilan kisi"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-layout-grid"></use></svg></button>
  <button type="button" class="ds-toggle is-icon" role="radio" aria-checked="false" data-value="board" aria-label="Tampilan papan" title="Tampilan papan"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-kanban"></use></svg></button>
</div>
```

### Multiple

Sejumlah item boleh menyala. Group menjadi `toolbar`: tombol panah memindahkan fokus, Space mengalihkan.

```html preview title="Multiple, toolbar"
<div class="ds-toggle-group" data-ds-toggle-group="multiple" role="toolbar" aria-label="Format teks">
  <button type="button" class="ds-toggle is-icon" aria-pressed="true" aria-label="Tebal" title="Tebal"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bold"></use></svg></button>
  <button type="button" class="ds-toggle is-icon" aria-pressed="false" aria-label="Miring" title="Miring"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-italic"></use></svg></button>
  <button type="button" class="ds-toggle is-icon" aria-pressed="true" aria-label="Garis bawah" title="Garis bawah"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-underline"></use></svg></button>
</div>
```

### Single yang bisa dikosongkan

`data-ds-deselectable` membiarkan pengguna mengosongkan pilihan. Item memakai `aria-pressed` dan group berupa `group` biasa.

```html preview title="Single, bisa dikosongkan"
<div class="ds-toggle-group" data-ds-toggle-group="single" data-ds-deselectable role="group" aria-label="Filter status">
  <button type="button" class="ds-toggle" aria-pressed="false" data-value="draft">Draft</button>
  <button type="button" class="ds-toggle" aria-pressed="true" data-value="sent">Terkirim</button>
  <button type="button" class="ds-toggle" aria-pressed="false" data-value="paid">Lunas</button>
</div>
```

### Berjarak, vertikal, ukuran

`is-spaced` memisahkan item, `is-vertical` menumpuknya. Atur ukuran pada setiap item.

```html preview title="Berjarak, vertikal, kecil"
<div class="ds-actions is-start" style="align-items:start;gap:2rem">
  <div class="ds-toggle-group is-spaced" data-ds-toggle-group="multiple" role="toolbar" aria-label="Tampilkan kolom">
    <button type="button" class="ds-toggle is-outlined" aria-pressed="true">Klien</button>
    <button type="button" class="ds-toggle is-outlined" aria-pressed="true">Jumlah</button>
    <button type="button" class="ds-toggle is-outlined" aria-pressed="false">Jatuh tempo</button>
  </div>
  <div class="ds-toggle-group is-vertical" data-ds-toggle-group="single" role="radiogroup" aria-label="Urutkan menurut" aria-orientation="vertical">
    <button type="button" class="ds-toggle is-sm" role="radio" aria-checked="true" data-value="date">Tanggal</button>
    <button type="button" class="ds-toggle is-sm" role="radio" aria-checked="false" data-value="amount">Jumlah</button>
    <button type="button" class="ds-toggle is-sm" role="radio" aria-checked="false" data-value="client">Klien</button>
  </div>
</div>
```

### Nilai form

`data-ds-name` mengirim pilihan sebagai input hidden setelah group: satu input untuk single, satu per item terpilih untuk multiple. ASP.NET mengikat beberapa nilai ke `List<string>`.

```html preview title="Mengirim period=month"
<form method="get" class="ds-actions is-start" style="align-items:center">
  <div class="ds-toggle-group" data-ds-toggle-group="single" data-ds-name="period" role="radiogroup" aria-label="Periode">
    <button type="button" class="ds-toggle" role="radio" aria-checked="false" data-value="week">Minggu</button>
    <button type="button" class="ds-toggle" role="radio" aria-checked="true" data-value="month">Bulan</button>
  </div>
  <button type="submit" class="btn btn-sm">Terapkan</button>
</form>
```

## State

```html preview title="State item group"
<div style="display:grid;gap:.75rem;justify-items:start">
  <div class="ds-toggle-group" data-ds-toggle-group="multiple" data-ds-roving="false" role="group" aria-label="State pointer dan keyboard">
    <button type="button" class="ds-toggle" aria-pressed="false">Diam</button>
    <button type="button" class="ds-toggle" aria-pressed="false" data-ds-demo="hover">Hover</button>
    <button type="button" class="ds-toggle" aria-pressed="false" data-ds-demo="focus">Focus</button>
    <button type="button" class="ds-toggle" aria-pressed="false" data-ds-demo="pressed">Ditekan</button>
    <button type="button" class="ds-toggle" aria-pressed="true">Aktif</button>
  </div>
  <div class="ds-toggle-group" data-ds-toggle-group="multiple" data-ds-roving="false" role="group" aria-label="Ketersediaan dan aktivitas">
    <button type="button" class="ds-toggle" aria-pressed="true">Aktif</button>
    <button type="button" class="ds-toggle" aria-pressed="false" disabled>Nonaktif</button>
    <button type="button" class="ds-toggle" aria-pressed="false" aria-disabled="true" title="Perlu paket Pro">aria-disabled</button>
    <button type="button" class="ds-toggle" aria-pressed="false" aria-busy="true">Memuat</button>
  </div>
  <div class="ds-toggle-group" data-ds-toggle-group="single" role="radiogroup" aria-label="Tone filled">
    <button type="button" class="ds-toggle is-filled" role="radio" aria-checked="true" data-value="a">Filled aktif</button>
    <button type="button" class="ds-toggle is-filled" role="radio" aria-checked="false" data-value="b">Filled mati</button>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Diam (mati) | `aria-pressed="false"` atau `aria-checked="false"` | Item outlined yang berbagi tepi dengan tetangganya |
| Hover | Pointer di atas sebuah item | State layer 6%; item dinaikkan di atas tetangganya |
| Focus-visible | Fokus keyboard | Cincin 2px `--ds-focus` di atas semua item; roving stop adalah satu-satunya titik tab |
| Pressed | Pointer ditekan | Layer 10%, skala 0,97 selama 120ms |
| Aktif | `aria-pressed="true"` atau `aria-checked="true"` | Tint primary 12%, teks primary, tepi 2px |
| Disabled | `disabled` | Opasitas 55%; dilewati tombol panah |
| aria-disabled | `aria-disabled="true"` | Tampilan sama; klik diabaikan; dilewati tombol panah. Pada group `data-ds-roving="false"` ia menjadi titik tab, sehingga alasannya bisa dibaca |
| Loading | `aria-busy="true"` | Spinner pada item itu; kliknya diabaikan |
| Group vertikal | `is-vertical`, `aria-orientation="vertical"` | Item bertumpuk; panah Atas dan Bawah menavigasi |
| RTL | `dir="rtl"` | Urutan dan radius tercermin; panah Kiri dan Kanan bertukar |
| Reduced motion | `prefers-reduced-motion` | Tanpa skala tekan |

## Anatomi

- `.ds-toggle-group`: wadah. Modifier `is-spaced`, `is-vertical`.
- `data-ds-toggle-group="single|multiple"`: mode. `data-ds-deselectable`, `data-ds-name`, `data-ds-roving="false"`.
- Item: `.ds-toggle` (atau `[data-ds-toggle-item]`) dengan `data-value`; `role="radio"` dan `aria-checked` dalam radio group, `aria-pressed` selain itu.
- Input hidden `input[data-ds-toggle-input]` setelah group bila `data-ds-name` diatur.

## Penggunaan

- Pakai dua sampai enam item. Untuk lebih banyak, pakai [select](./select.md) atau [combobox](./combobox.md).
- Pilih single bila tepat satu item harus menyala, multiple bila kombinasi apa pun valid, single yang bisa dikosongkan bila "tidak ada" adalah pilihan valid.
- Jaga setiap label di bawah sekitar 16 karakter, atau pakai item hanya-ikon dengan title.
- Selalu beri `aria-label` pada group.
- Jangan pakai toggle group untuk mengganti panel konten; pakai [tabs](./tabs.md). Jangan mencampur item teks dan hanya-ikon dalam satu group.

## Aksesibilitas

- Mode single mengikuti pola radio group: `role="radiogroup"`, item `role="radio"` dengan `aria-checked`, item terpilih (atau yang pertama bila tidak ada) adalah satu-satunya titik tab, tombol panah memindahkan fokus dan memilih.
- Mode multiple mengikuti pola toolbar: `role="toolbar"`, item `aria-pressed`, satu titik tab, tombol panah hanya memindahkan fokus.
- Single yang bisa dikosongkan dan group `data-ds-roving="false"` memakai `role="group"` dengan setiap item dalam urutan tab.
- Item disabled dan `aria-disabled` dilewati tombol panah.
- Beri nama group dengan `aria-label` atau `aria-labelledby`. Item hanya-ikon butuh `aria-label`.
- Kontras dan target mengikuti [toggle](./toggle.md): 4,5:1 untuk label, 3:1 untuk tepi, area sentuh 44px di layar sentuh.

| Tombol | Aksi |
| --- | --- |
| Tab, Shift+Tab | Masuk atau keluar dari group (satu titik) |
| ArrowRight, ArrowDown | Item berikutnya; pada mode single juga memilihnya. Berputar |
| ArrowLeft, ArrowUp | Item sebelumnya; pada mode single juga memilihnya. Berputar |
| Home, End | Item aktif pertama atau terakhir |
| Space, Enter | Mengalihkan item yang difokuskan (multiple, bisa dikosongkan) atau memilihnya (single) |

Pada group vertikal mode multiple hanya panah Atas dan Bawah yang memindahkan fokus; pada halaman kanan-ke-kiri panah Kiri dan Kanan bertukar.

## Razor

```cshtml
<ds-toggle-group type="single" label="Periode laporan" name="period" value="@Model.Period" size="sm">
    <ds-toggle-item value="week">Minggu</ds-toggle-item>
    <ds-toggle-item value="month">Bulan</ds-toggle-item>
    <ds-toggle-item value="quarter">Kuartal</ds-toggle-item>
</ds-toggle-group>

<ds-toggle-group type="multiple" label="Format teks" value="bold,underline">
    <ds-toggle-item value="bold" icon="bold" label="Tebal" />
    <ds-toggle-item value="italic" icon="italic" label="Miring" />
    <ds-toggle-item value="underline" icon="underline" label="Garis bawah" />
</ds-toggle-group>
```

| Atribut (group) | Efek |
| --- | --- |
| `type` | `single` (bawaan) atau `multiple` |
| `label` | Nama group yang bisa diakses (wajib) |
| `name`, `value` | Nama field form dan nilai terpilih (dipisah koma untuk multiple); menghasilkan input hidden |
| `size`, `variant` | Ukuran item; `outlined` (bawaan), `tonal`, `filled` |
| `spaced`, `vertical`, `deselectable` | Tata letak dan pengosongan |

Item menerima `value`, `icon`, `label` (nama item hanya-ikon), `selected`, `disabled`, `disabled-reason`.

## JavaScript

| Atribut atau API | Efek |
| --- | --- |
| `[data-ds-toggle-group]` | Mengatur role, roving tabindex, dan input hidden saat dimuat; menangani klik dan tombol |
| `data-ds-roving="false"` | Membiarkan setiap item dalam urutan tab dan memakai `role="group"` |
| `data-ds-deselectable` | Mode single dengan item terpilih yang bisa dikosongkan |
| `data-ds-name` | Nama field untuk input hidden |
| `DS.toggle.group.get(group)` | Mengembalikan `{ value, values }` |
| `DS.toggle.group.set(group, valueOrValues)` | Mengatur pilihan dan memicu event |

Event `ds:toggle:change` naik dari group dengan `detail.value`, `detail.values`, dan `detail.item`.

```js
document.querySelector("#period").addEventListener("ds:toggle:change", (event) => {
  loadReport(event.detail.value);
});
```

## Token

Token [toggle](./toggle.md), ditambah `--ds-border-hairline`, `--ds-control-border`, `--ds-radius-md|lg|box`, dan `--ds-space-2` (jarak mode berjarak).

## Native dan daisyUI

Group adalah `div` dengan role ARIA di atas elemen `button` native, sehingga hanya berfungsi sebagai kontrol form lewat input hidden. `join` dan `filter` daisyUI menyediakan tata letak serupa; group DS menambah semantik radio dan toolbar, roving focus, dan nilai form.
