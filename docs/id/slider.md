---
title: Slider
group: components
category: forms
order: 23
summary: Input range native dengan tampilan sama di semua engine: output langsung, gelembung nilai saat digeser, penanda berlabel, rentang dua thumb, dan opsi vertikal.
---

Slider memilih satu nilai, atau rentang nilai, dari skala kontinu atau bertahap ketika posisi perkiraan lebih penting daripada angka pastinya (volume, rentang harga, persentase). Bila orang tahu angka pastinya, gunakan [number input](./number-input.md); tawarkan keduanya bersama untuk rentang yang presisi. Untuk kurang dari 5 pilihan diskret, gunakan [radio group](./radio-group.md) atau [segmented control](./segmented-control.md).

## Contoh

### Dengan label dan nilai langsung

`.ds-slider` memuat head (label dan `output`) dan sebuah control. ds.js menggambar fill, memperbarui `output`, dan menampilkan gelembung di atas thumb saat digeser atau saat memakai tombol panah. `data-ds-slider-format` mengatur format nilai yang tampil (`{value}` diganti, angka mengikuti bahasa halaman).

```html preview title="Slider dengan output"
<div class="ds-slider" data-ds-slider-format="{value}%" style="max-width: 28rem">
  <div class="ds-slider__head">
    <label for="sl-discount">Diskon</label>
    <output for="sl-discount" aria-hidden="true">15%</output>
  </div>
  <div class="ds-slider__control">
    <input id="sl-discount" type="range" class="range" name="Discount" min="0" max="50" step="5" value="15">
  </div>
</div>
```

### Penanda berlabel

Tambahkan `<datalist>` dan arahkan `list` pada input ke sana. Setiap `option` menjadi tanda; `label`-nya tampil di bawah track. Penanda di dalam rentang terpilih memakai warna teks penuh.

```html preview title="Penanda"
<div class="ds-slider" style="max-width: 28rem">
  <div class="ds-slider__head">
    <label for="sl-priority">Target respons</label>
    <output for="sl-priority" aria-hidden="true">24</output>
  </div>
  <div class="ds-slider__control">
    <input id="sl-priority" type="range" class="range" name="ResponseHours" min="0" max="72" step="4" value="24" list="sl-priority-marks" aria-valuetext="24 jam">
  </div>
  <datalist id="sl-priority-marks">
    <option value="0" label="Sekarang"></option>
    <option value="24" label="1 hari"></option>
    <option value="48" label="2 hari"></option>
    <option value="72" label="3 hari"></option>
  </datalist>
</div>
```

### Rentang dengan dua thumb

Letakkan dua input range di dalam `.ds-slider__control.is-range`. Masing-masing mengirim nilainya sendiri (`MinPrice`, `MaxPrice`), mempertahankan keyboard slider native, dan mendapat `aria-label`. ds.js menjaga thumb bawah tidak melewati thumb atas dan menggambar fill di antara keduanya.

```html preview title="Rentang harga"
<div class="ds-slider" data-ds-slider-format="Rp {value}rb" style="max-width: 28rem">
  <div class="ds-slider__head">
    <span class="ds-label" id="sl-price-label">Harga per unit</span>
    <output for="sl-price-min sl-price-max" aria-hidden="true">Rp 200rb sampai Rp 750rb</output>
  </div>
  <div class="ds-slider__control is-range">
    <input id="sl-price-min" type="range" class="range" name="MinPrice" min="0" max="1000" step="50" value="200" aria-label="Harga per unit, minimum">
    <input id="sl-price-max" type="range" class="range" name="MaxPrice" min="0" max="1000" step="50" value="750" aria-label="Harga per unit, maksimum">
  </div>
  <div class="ds-slider__hint"><span>Rp 0</span><span>Rp 1.000rb</span></div>
</div>
```

### Ukuran

```html preview title="Ukuran"
<div class="grid gap-6" style="max-width: 28rem">
  <div class="ds-slider"><div class="ds-slider__control"><input type="range" class="range is-sm" value="30" aria-label="Slider kecil"></div></div>
  <div class="ds-slider"><div class="ds-slider__control"><input type="range" class="range" value="50" aria-label="Slider bawaan"></div></div>
  <div class="ds-slider"><div class="ds-slider__control"><input type="range" class="range is-lg" value="70" aria-label="Slider besar"></div></div>
</div>
```

### Vertikal

`.is-vertical` memutar input dengan `writing-mode`; Arrow Up menaikkan nilai. Didukung di Chromium, Firefox, dan Safari terbaru.

```html preview title="Vertikal"
<div class="ds-slider is-vertical">
  <div class="ds-slider__control">
    <input type="range" class="range" min="0" max="100" value="60" aria-label="Level keluaran">
  </div>
</div>
```

## State

```html preview title="State slider"
<div class="grid gap-6 sm:grid-cols-2">
  <div class="ds-slider"><div class="ds-slider__head"><label for="sl-st-1">Rest</label><output>40</output></div><div class="ds-slider__control"><input id="sl-st-1" type="range" class="range" value="40"></div></div>
  <div class="ds-slider"><div class="ds-slider__head"><label for="sl-st-2">Nonaktif</label><output>65</output></div><div class="ds-slider__control"><input id="sl-st-2" type="range" class="range" value="65" disabled></div></div>
  <div class="ds-slider"><div class="ds-slider__head"><label for="sl-st-3">Tidak valid</label><output>90</output></div><div class="ds-slider__control"><input id="sl-st-3" type="range" class="range" value="90" aria-invalid="true" aria-describedby="sl-st-3-err"></div><p id="sl-st-3-err" class="ds-field-error">Anggaran PRJ-1024 maksimal 80%.</p></div>
  <div class="ds-slider"><div class="ds-slider__head"><label for="sl-st-4">Minimum dan maksimum</label><output>0</output></div><div class="ds-slider__control"><input id="sl-st-4" type="range" class="range" value="0"></div></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | — | Track 6px (netral 16%), fill primary sampai tengah thumb, thumb 20px dengan border primary 2px |
| Hover | pointer di atas slider | Halo 6px di sekitar thumb pada `--ds-opacity-state-selected` |
| Dragging | pointer ditekan pada thumb | Halo 8px pada `--ds-opacity-state-drag`; gelembung nilai naik 5px dan memudar masuk (160ms) |
| Focus-visible | fokus keyboard | Ring 2px `--ds-focus` di sekitar thumb dengan celah permukaan 2px; gelembung tampil selama tombol dipakai |
| Perubahan nilai | input | Fill dan output mengikuti thumb seketika (tanpa easing pada manipulasi langsung) |
| Invalid | `aria-invalid="true"` atau `:user-invalid` | Fill dan border thumb menjadi warna galat, pesan di bawah |
| Disabled | `:disabled` | Fill dan thumb abu-abu, `--ds-opacity-disabled`, head dan penanda diredupkan, `cursor: not-allowed` |
| Di batas | nilai sama dengan `min` atau `max` | Thumb rata dengan ujung track; tanpa gaya tambahan |

## Anatomi

- `.ds-slider`: pembungkus; opsi sebagai `data-ds-slider-*`.
- `.ds-slider__head`: `label` (atau `.ds-label` untuk rentang) dan `output` / `.ds-slider__output`.
- `.ds-slider__control`: input; `.is-range` untuk dua input (ds.js menambahkannya bila belum ada).
- `input.range`: input range native (daisyUI `.range`, disempurnakan).
- `.ds-slider__bubble`: gelembung nilai (dibuat otomatis).
- `.ds-slider__marks` / `.ds-slider__mark`: tanda dan label (dibuat dari `datalist`).
- `.ds-slider__hint`: label minimum dan maksimum statis.

## Penggunaan

- Selalu tampilkan nilai saat ini (output atau gelembung); posisi saja bukan nilai.
- Pakai step yang sesuai keputusan: 5% untuk diskon, 50rb untuk harga. Jaga skala di bawah sekitar 100 step agar nyaman di layar sentuh.
- Beri label pada ujung bila tidak jelas (`.ds-slider__hint` atau penanda).
- Pasangkan dengan number input bila butuh nilai pasti.
- Jangan pakai slider untuk nilai yang butuh ketepatan sampai satuan (jumlah uang pada faktur, kuantitas).
- Jangan menjalankan perubahan berat pada setiap event `input`; dengarkan `change` (dipicu saat dilepas) untuk menyimpan.

## Aksesibilitas

- `input type="range"` native memberi role slider, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, dan dukungan keyboard penuh. Setiap thumb perlu label: `<label for>` untuk satu thumb, `aria-label` per thumb untuk dua.
- Isi `aria-valuetext` bila angka butuh satuan atau kata ("24 jam"); dengan `data-ds-slider-format`, ds.js menjaganya tetap terbaru.
- `output` bersifat `aria-hidden` karena slider sudah mengumumkan nilainya; output ditujukan bagi pengguna yang melihat.
- Area sentuh: input setinggi 28px, 44px pada pointer kasar; thumb 20px.
- Fill memakai primary di atas track netral; thumb punya border 2px dan shadow, sehingga posisinya terlihat tanpa warna.

| Tombol | Aksi |
| --- | --- |
| Arrow Right / Arrow Up | Naik satu step |
| Arrow Left / Arrow Down | Turun satu step |
| Page Up / Page Down | Naik atau turun 10% dari rentang (dibulatkan ke step; `data-ds-slider-page` menggantikan) |
| Home / End | Menuju minimum atau maksimum |
| Tab | Berpindah di antara dua thumb pada rentang |

## Razor

```cshtml
<ds-slider asp-for="Discount" label="Diskon" min="0" max="50" step="5" format="{value}%" />
<ds-slider asp-for="ResponseHours" label="Target respons" max="72" step="4"
           marks="0:Sekarang,24:1 hari,48:2 hari,72:3 hari" />
<ds-slider asp-for="MinPrice" asp-for-end="MaxPrice" label="Harga per unit" max="1000" step="50"
           format="Rp {value}rb" />
```

Atribut: `min`, `max`, `step`, `value`, `value-end`, `name-end`, `label`, `format`, `marks` (`value` atau `value:label`, dipisah koma), `output="false"`, `bubble="false"`, `size="sm|lg"`, `vertical`, `disabled`. Helper menulis fill awal, sehingga slider tampak benar sebelum ds.js dimuat.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `.ds-slider` | Mengaktifkan output, gelembung, penanda, dan perilaku dua thumb untuk input di dalamnya |
| `data-ds-slider-format="{value} satuan"` | Format output, gelembung, dan `aria-valuetext` |
| `data-ds-slider-bubble="false"` | Tanpa gelembung nilai |
| `data-ds-slider-page="n"` | Step Page Up/Down |
| `input[list]` + `datalist` | Penanda berlabel |

Setiap `input[type=range]` di halaman mendapat fill (`--ds-range-p`), dengan atau tanpa `.ds-slider`. Event-nya adalah `input` native (saat bergerak) dan `change` (saat dilepas).

## Token

`--color-primary`, `--color-base-content`, `--color-base-100`, `--ds-control-border`, `--ds-shadow-xs`, `--ds-opacity-state-selected`, `--ds-opacity-state-drag`, `--ds-opacity-disabled`, `--ds-focus`, `--color-error`, `--ds-radius-full`, `--ds-radius-md`, `--ds-duration-quick`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-enter-offset`. Variabel komponen: `--ds-range-thumb`, `--ds-range-track`, `--ds-range-color`, `--ds-range-rest`.

## Native dan daisyUI

Dibangun di atas `<input type="range">` dengan daisyUI `.range`. daisyUI menggambar fill dengan shadow thumb yang sangat besar di dalam `overflow: hidden`, yang memotong halo dan focus ring. DS menghapusnya dan menggambar fill dengan latar hard-stop pada track WebKit (digerakkan oleh `--ds-range-p`) dan `::-moz-range-progress` di Firefox, sehingga thumb dapat membawa halo hover, halo tekan, dan focus ring. Tanpa JavaScript, Chromium menampilkan track tanpa fill sampai gerakan pertama; Firefox menampilkan fill secara native.
