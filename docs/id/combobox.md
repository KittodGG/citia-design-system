---
title: Combobox
group: components
category: forms
order: 25
summary: Field teks dengan daftar pilihan yang disaring (ARIA 1.2), dibangun di atas select atau input asli; grup, pencarian async, opsi buat, tombol hapus, dan setiap state daftar.
source: TPS wwwroot/js/combobox.js; app.css L3147–3241 (.cb-*)
---

Combobox memungkinkan orang mengetik untuk menyaring daftar dan memilih satu pilihan. Gunakan bila daftar berasal dari data yang terus bertambah (pelanggan, proyek, orang) atau berisi lebih dari 7 pilihan. Pertahankan [select](./select.md) biasa untuk daftar tetap yang pendek (status, ukuran, jumlah per halaman). Untuk beberapa nilai, gunakan [multi-select](./multi-select.md); untuk kata kunci bebas tanpa daftar, gunakan [tags input](./tags-input.md); untuk perintah dan navigasi, gunakan [command](./command.md).

## Contoh

### Dari select

Tambahkan `data-ds-combobox` pada `<select>`. ds.js menaruh input teks dengan `role="combobox"` di depannya; select tetap berada di form (tersembunyi) dan mengirim nilainya, sehingga `asp-for` dan model binding bekerja tanpa perubahan. `option[data-hint]` menambahkan baris kedua.

```html preview title="Combobox dari select"
<div class="ds-field" style="max-width: 24rem">
  <label for="cb-customer">Pelanggan</label>
  <select id="cb-customer" name="CustomerId" class="select" data-ds-combobox data-ds-combobox-label="pelanggan" aria-describedby="cb-customer-hint">
    <option value="">Pilih pelanggan</option>
    <option value="17" data-hint="Jakarta · 14 faktur terbuka">Lestari Design Studio</option>
    <option value="23" data-hint="Lagos · 2 faktur terbuka">Okafor Engineering Ltd</option>
    <option value="31" data-hint="Osaka">Tanaka Foods</option>
    <option value="38" data-hint="Madrid · 5 faktur terbuka" selected>Marquez Arquitectura</option>
    <option value="42">Nusantara Logistics</option>
    <option value="47">Harbour Point Clinic</option>
    <option value="52">Blue Pine Software</option>
    <option value="58">Kaori Textiles</option>
  </select>
  <p id="cb-customer-hint" class="ds-hint">Ketik nama atau kota.</p>
</div>
```

### Pilihan berkelompok

`<optgroup label>` menjadi judul grup di daftar (`role="group"` dengan judul sebagai namanya).

```html preview title="Berkelompok"
<div class="ds-field" style="max-width: 24rem">
  <label for="cb-owner">Pemilik</label>
  <select id="cb-owner" name="OwnerId" class="select" data-ds-combobox data-ds-combobox-label="pemilik" data-ds-combobox-clearable>
    <option value="">Belum ditugaskan</option>
    <optgroup label="Keuangan">
      <option value="u1" data-hint="Kepala keuangan">Ayu Lestari</option>
      <option value="u2">Sofia Marquez</option>
    </optgroup>
    <optgroup label="Teknik">
      <option value="u3" data-hint="Cuti sampai 12 Mei" disabled>Daniel Okafor</option>
      <option value="u4">Mei Tanaka</option>
      <option value="u5">Rahul Iyer</option>
    </optgroup>
  </select>
</div>
```

### Membuat pilihan

`data-ds-combobox-create` menawarkan `Buat "term"` ketika teks yang diketik tidak cocok dengan pilihan mana pun. Memilihnya menambahkan `<option>` dengan term sebagai nilai dan label, memilihnya, dan memicu `ds:combobox:create`. Gunakan untuk data ringan yang dapat dibuat server dari sebuah nama. `data-ds-combobox-clearable` menambahkan tombol hapus.

```html preview title="Buat dan hapus"
<div class="ds-field" style="max-width: 24rem">
  <label for="cb-category">Kategori biaya</label>
  <select id="cb-category" name="Category" class="select" data-ds-combobox data-ds-combobox-label="kategori" data-ds-combobox-create data-ds-combobox-clearable>
    <option value="">Pilih atau buat</option>
    <option>Perjalanan</option>
    <option>Langganan perangkat lunak</option>
    <option>Perlengkapan kantor</option>
    <option>Pelatihan</option>
  </select>
</div>
```

### Menambah lewat dialog

`data-ds-combobox-add="Target"` menawarkan `Tambah "term" ke Target` dan memicu `ds:combobox-add` (serta `ds:combobox:add`) dengan `{ term, label, input }`. Aplikasi membuka dialog tambah cepat, menyimpan, lalu memanggil `DS.addComboboxOption`. Tampilkan ini hanya kepada orang yang berhak membuat datanya.

```html preview title="Tambah ke daftar"
<div class="ds-field" style="max-width: 24rem">
  <label for="cb-project">Proyek</label>
  <select id="cb-project" name="ProjectId" class="select" data-ds-combobox data-ds-combobox-label="proyek" data-ds-combobox-add="Proyek">
    <option value="">Pilih proyek</option>
    <option value="1024" data-hint="Ayu Lestari">PRJ-1024 Peluncuran ulang situs web</option>
    <option value="1031" data-hint="Daniel Okafor">PRJ-1031 Sensor gudang</option>
    <option value="1040" data-hint="Mei Tanaka">PRJ-1040 Audit tahunan</option>
  </select>
</div>
```

```js
document.addEventListener("ds:combobox:add", async (event) => {
  const { term, input } = event.detail;
  const saved = await openQuickAdd(term); // dialog Anda: mengembalikan { id, name, owner }
  if (saved) DS.addComboboxOption(event.target, { value: saved.id, label: saved.name, hint: saved.owner });
  input.focus();
});
```

### Teks bebas dengan saran

Pada `input[list]`, teks itu sendiri adalah nilainya; saran berasal dari `datalist` (`option[value][data-label][data-hint]`).

```html preview title="Teks bebas"
<div class="ds-field" style="max-width: 24rem">
  <label for="cb-city">Kota</label>
  <input id="cb-city" name="City" class="input" list="cb-city-list" data-ds-combobox data-ds-combobox-label="kota">
  <datalist id="cb-city-list">
    <option value="Jakarta" data-hint="Indonesia"></option>
    <option value="Lagos" data-hint="Nigeria"></option>
    <option value="Osaka" data-hint="Jepang"></option>
    <option value="Madrid" data-hint="Spanyol"></option>
  </datalist>
</div>
```

### Sumber async

`data-ds-combobox-source` mengambil pilihan saat orang mengetik (debounce 250ms, permintaan usang dibatalkan). `{q}` pada URL diganti dengan teks yang sudah di-encode; tanpa itu, `?q=` ditambahkan (`data-ds-combobox-param` mengganti namanya). Responsnya berupa array JSON, atau `{ "items": [...] }`, berisi `{ value, label, hint?, group?, disabled? }`. `data-ds-combobox-min` menentukan jumlah karakter yang memulai pencarian (bawaan 1). Pada select, item jarak jauh yang dipilih ditambahkan sebagai `<option>` agar terkirim.

```html
<select id="AssigneeId" name="AssigneeId" class="select"
        data-ds-combobox data-ds-combobox-label="orang"
        data-ds-combobox-source="/api/people/search?term={q}" data-ds-combobox-min="2">
  <option value="">Cari orang</option>
  <option value="u4" selected>Mei Tanaka</option>   <!-- nilai saat ini, dirender oleh server -->
</select>
```

## State

State field berasal dari input. Daftar di bawah adalah salinan beku dari popup (tanpa ds.js) agar setiap state daftar terlihat sekaligus.

```html preview title="State field"
<div class="grid gap-4 sm:grid-cols-2">
  <div class="ds-field"><label for="cb-st-1">Nonaktif</label><select id="cb-st-1" class="select" data-ds-combobox disabled><option>Marquez Arquitectura</option></select></div>
  <div class="ds-field"><label for="cb-st-2">Tidak valid</label><select id="cb-st-2" class="select" data-ds-combobox aria-invalid="true" aria-describedby="cb-st-2-err"><option value="">Pilih pelanggan</option><option value="1">Tanaka Foods</option></select><p id="cb-st-2-err" class="ds-field-error">Pilih pelanggan dari daftar.</p></div>
</div>
```

```html preview title="State daftar (beku)"
<div class="grid gap-6 sm:grid-cols-2" style="min-height: 25rem">
  <div class="ds-combobox" data-open data-filled>
    <input class="input" role="combobox" aria-expanded="true" aria-controls="cb-frozen-1" value="ta" aria-label="Pelanggan">
    <div class="ds-combobox__buttons"><button type="button" class="ds-combobox__toggle" tabindex="-1" aria-label="Tampilkan pilihan pelanggan"></button></div>
    <div class="ds-combobox-popup">
      <ul class="ds-combobox-list" role="listbox" id="cb-frozen-1" aria-label="Pilihan pelanggan">
        <li class="ds-combobox-group" role="presentation">
          <div class="ds-combobox-group-label">Aktif</div>
          <ul role="group">
            <li class="ds-combobox-option" role="option" aria-selected="false"><span class="ds-combobox-option__text"><mark class="ds-combobox-match">Ta</mark>naka Foods<small>Osaka</small></span></li>
            <li class="ds-combobox-option" role="option" aria-selected="true" data-active><span class="ds-combobox-option__text">Harbour Point Clinic <small>Disorot (keyboard atau pointer)</small></span></li>
            <li class="ds-combobox-option" role="option" aria-selected="false" data-current><span class="ds-combobox-option__text">Marquez Arquitectura<small>Nilai saat ini</small></span></li>
          </ul>
        </li>
        <li class="ds-combobox-group" role="presentation">
          <div class="ds-combobox-group-label">Diarsipkan</div>
          <ul role="group">
            <li class="ds-combobox-option" role="option" aria-selected="false" aria-disabled="true"><span class="ds-combobox-option__text">Kaori Textiles<small>Nonaktif</small></span></li>
          </ul>
        </li>
        <li class="ds-combobox-option ds-combobox-create" role="option" aria-selected="false"><span class="ds-combobox-option__text">Buat "ta"</span></li>
      </ul>
    </div>
  </div>
  <div class="grid content-start gap-3">
    <div class="ds-combobox-popup" style="position: static"><p class="ds-combobox-empty" data-state="loading"><span class="ds-spinner" aria-hidden="true"></span>Memuat…</p></div>
    <div class="ds-combobox-popup" style="position: static"><p class="ds-combobox-empty">Tidak ada pelanggan yang cocok dengan "zz".</p></div>
    <div class="ds-combobox-popup" style="position: static"><p class="ds-combobox-empty">Ketik minimal 2 karakter untuk mencari.</p></div>
    <div class="ds-combobox-popup" style="position: static"><p class="ds-combobox-empty" data-state="error">Pilihan tidak dapat dimuat. Ketik lagi untuk mencoba ulang.</p></div>
    <div class="ds-combobox-popup" style="position: static"><p class="ds-combobox-empty">Belum ada pilihan aktif.</p></div>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | — | Input dengan tombol chevron di ujung |
| Hover / focus | pointer, fokus | State input dari [Input](./input.md); state layer pada tombol chevron saat hover |
| Open | klik, mengetik, Arrow Down, Alt+Arrow Down | Popup memudar masuk dan bergeser 5px dari field (160ms), chevron berputar 180°; membalik ke atas bila tidak ada ruang di bawah |
| Closed | Escape, Tab, memilih, pointer di luar | Popup memudar keluar lebih cepat (140ms, exit easing) |
| Filled | nilai dipilih | Tombol hapus muncul (`data-ds-combobox-clearable`) |
| Pilihan disorot | tombol panah atau pointer (`data-active`, `aria-activedescendant`) | Isian tonal `--ds-primary-soft` |
| Nilai saat ini | `data-current` | Label semibold dan tanda centang di ujung |
| Cocok | teks yang diketik | Bagian label yang cocok dicetak semibold |
| Pilihan nonaktif | `option[disabled]` | `--ds-opacity-disabled`, dilewati tombol panah |
| Grup | `optgroup` | Judul kecil, garis tipis antar grup |
| Buat / tambah | tidak ada yang cocok persis dan `data-ds-combobox-create` / `-add` | Baris terakhir dengan tanda plus, teks primary yang tenang |
| Loading | permintaan async berjalan | Spinner (setelah 300ms) dan "Memuat…"; diumumkan |
| Tanpa hasil / kosong / terlalu pendek / galat | — | Satu kalimat di popup; galat dengan `--ds-error-text`; diumumkan |
| Invalid | teks yang diketik tidak cocok dengan pilihan saat blur, `aria-invalid="true"` | Border galat; pesan `Pilih {label} dari daftar.` |
| Disabled | `disabled` pada select atau input | Input nonaktif, tombol nonaktif, tanpa popup |

## Anatomi

- `.ds-combobox`: pembungkus (dibuat otomatis); `[data-open]`, `[data-filled]`, `.is-clearable`.
- `input[role="combobox"]`: field teks (`.input`).
- `select[hidden]`: select asli, tetap mengirim nilai; id-nya menjadi `{id}-value`.
- `.ds-combobox__buttons`: `.ds-combobox__clear` dan `.ds-combobox__toggle`.
- `.ds-combobox-popup`: panel mengambang; `[data-side="top"]` saat dibalik.
- `.ds-combobox-list[role="listbox"]`: pilihan; `.ds-combobox-group` + `.ds-combobox-group-label` untuk grup.
- `.ds-combobox-option[role="option"]`: `.ds-combobox-option__text` dengan petunjuk `small`; `.ds-combobox-create`, `.ds-combobox-add`.
- `.ds-combobox-empty`: pesan kosong, memuat, galat, dan petunjuk.

## Penggunaan

- Pakai kata benda pada `data-ds-combobox-label` ("pelanggan"); kata itu muncul di pesan ("Tidak ada pelanggan yang cocok …").
- Taruh baris kedua yang paling berguna di `data-hint` (kota, pemilik, kode), bukan ID yang tidak terbaca orang.
- Batasi daftar pada 50 pilihan yang tampil; sisanya dijangkau dengan mengetik (petunjuk menyatakannya).
- Pakai `data-ds-combobox-min="2"` atau lebih untuk sumber jarak jauh dengan ribuan baris.
- Jangan pakai combobox untuk 5 pilihan tetap atau kurang; [radio group](./radio-group.md) atau [select](./select.md) lebih cepat.
- Jangan kirim otomatis saat memilih.

## Aksesibilitas

- Combobox ARIA 1.2: input punya `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls`, dan `aria-activedescendant`; fokus tidak pernah meninggalkan input. Pilihan adalah `role="option"` dalam `role="listbox"` bernama "Pilihan {label}".
- Tombol chevron punya nama ("Tampilkan pilihan pelanggan") tetapi berada di luar urutan Tab (pola APG); tombol hapus berada di urutan Tab.
- Live region polite mengumumkan jumlah hasil, "Memuat…", galat, dan pilihan yang dipilih.
- Label tetap tertaut: input mengambil `id`, `aria-describedby`, `aria-invalid`, `required`, dan `placeholder` dari select.
- Pilihan setinggi 36px (44px di layar sentuh). Sorotan berupa isian tonal, nilai saat ini menambah tanda centang dan ketebalan, sehingga keduanya tidak bergantung pada warna saja.

| Tombol | Aksi |
| --- | --- |
| Arrow Down / Arrow Up | Membuka daftar, lalu memindahkan sorotan (berputar, melewati pilihan nonaktif) |
| Alt + Arrow Down | Membuka daftar tanpa memindahkan sorotan |
| Home / End | Pilihan pertama atau terakhir (sebelum mengetik) |
| Enter | Memilih pilihan yang disorot; saat mengetik di combobox select, kecocokan pertama disorot |
| Escape | Menutup daftar; bila sudah tertutup, mengembalikan teks nilai yang dipilih |
| Tab | Menutup daftar dan berpindah |
| Mengetik | Menyaring menurut label, nilai, dan petunjuk (tanpa membedakan huruf besar atau spasi) |

## Razor

Tanpa tag helper baru: pakai helper select bawaan dan tambahkan atributnya.

```cshtml
<select asp-for="CustomerId" asp-items="Model.Customers" class="select"
        data-ds-combobox data-ds-combobox-label="pelanggan" data-ds-combobox-clearable>
    <option value="">Pilih pelanggan</option>
</select>
```

`SelectListGroup` pada item dirender sebagai `optgroup`, yang menjadi judul grup.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-combobox` | Menyempurnakan `select` (pilihan) atau `input` (teks bebas) |
| `data-ds-combobox-label` | Kata benda untuk pesan dan nama daftar |
| `data-ds-combobox-clearable` | Tombol hapus saat terisi |
| `data-ds-combobox-create` | Pilihan `Buat "term"`; memicu `ds:combobox:create` `{ term, input }` |
| `data-ds-combobox-add="Target"` | `Tambah "term" ke Target`; memicu `ds:combobox-add` dan `ds:combobox:add` `{ term, label, input }` |
| `data-ds-combobox-source="url"` | Pilihan jarak jauh; placeholder `{q}` atau `?q=` |
| `data-ds-combobox-param`, `data-ds-combobox-min` | Nama parameter query, jumlah karakter minimum |
| `option[data-hint]`, `optgroup`, `option[disabled]` | Baris petunjuk, grup, pilihan nonaktif |

API: `DS.addComboboxOption(source, { value, label, hint })` menambahkan (bila belum ada) dan memilih sebuah pilihan. `source._dsCombobox` menyediakan `open()`, `close()`, `clear()`, dan `refresh()` (setelah mengubah pilihan). Event: `input` dan `change` native pada source, serta `ds:combobox:change` `{ value, label }`.

## Token

`--ds-popover`, `--ds-popover-border`, `--ds-shadow-popover`, `--ds-z-combobox`, `--ds-radius-lg`, `--ds-radius-md`, `--color-primary`, `--ds-opacity-state-selected`, `--ds-opacity-state-hover`, `--ds-quiet`, `--ds-subtle`, `--ds-error-text`, `--ds-duration-quick`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-enter-offset`, `--ds-size-target-compact`, `--ds-size-target`, `--ds-type-eyebrow-*`.

## Native dan daisyUI

Dibangun di atas `<select>` atau `<input list>` asli; tanpa JavaScript, kontrol native tetap bekerja dan mengirim nilai yang sama. Field yang terlihat adalah daisyUI `.input` (class `select` menjadi `input`, ukuran ikut terbawa). DS menambahkan popup, yang bukan komponen daisyUI; popup berbagi resep floating layer dengan [popover](./popover.md). UI `<datalist>` native diganti karena tidak dapat diberi gaya, dikelompokkan, atau diumumkan secara konsisten.
