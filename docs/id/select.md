---
title: Select
group: components
category: forms
order: 8
summary: Select native yang diberi gaya senada field lain, dengan ukuran, optgroup, opsi nonaktif, opsi placeholder, dan listbox multiple.
source: TPS app.css .select
---

Gunakan select native untuk 3 sampai 15 opsi pendek ketika pemilih bawaan platform adalah pengalaman terbaik, terutama di ponsel. Untuk daftar lebih panjang atau yang bisa dicari pakai [combobox](./combobox.md); untuk 2 sampai 4 opsi terlihat pakai [radio group](./radio-group.md) atau [segmented control](./segmented-control.md); untuk beberapa pilihan dengan chip pakai [multi-select](./multi-select.md).

## Contoh

### Ukuran, placeholder, dan grup

`option` pertama berisi nilai kosong adalah placeholder; selama terpilih, teksnya memakai `--ds-subtle`. Tambahkan `required` agar tidak bisa dikirim.

```html preview title="Select dengan placeholder dan optgroup"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-field">
    <label for="sel-1">Departemen</label>
    <select id="sel-1" class="select" required>
      <option value="">Pilih departemen</option>
      <optgroup label="Operasional">
        <option>Logistik</option>
        <option>Pengadaan</option>
      </optgroup>
      <optgroup label="Dukungan">
        <option>Keuangan</option>
        <option disabled>Hukum (tidak tersedia)</option>
      </optgroup>
    </select>
  </div>
  <div class="ds-field">
    <label for="sel-2">Kecil</label>
    <select id="sel-2" class="select select-sm"><option>Mingguan</option><option>Bulanan</option></select>
  </div>
  <div class="ds-field">
    <label for="sel-3">Besar</label>
    <select id="sel-3" class="select select-lg"><option>Bahasa Indonesia</option><option>English</option></select>
  </div>
</div>
```

### Multiple

`multiple` merender listbox. Opsi terpilih mendapat isian tonal dan bobot 600, sehingga pilihan tidak bergantung pada warna. Jelaskan di petunjuk cara memilih beberapa ("Tahan Ctrl atau Command").

```html preview title="Listbox multiple"
<div class="ds-form" style="max-width:24rem">
  <div class="ds-field">
    <label for="sel-4">Beri tahu</label>
    <select id="sel-4" class="select" multiple size="4" aria-describedby="sel-4-h">
      <option selected>Ayu Lestari</option>
      <option>Daniel Okafor</option>
      <option selected>Mei Tanaka</option>
      <option>Sofia Marquez</option>
    </select>
    <p class="ds-hint" id="sel-4-h">Tahan Ctrl atau Command untuk memilih beberapa.</p>
  </div>
</div>
```

## State

```html preview title="State select"
<div class="ds-field-grid">
  <div class="ds-field"><label for="ss1">Placeholder</label><select id="ss1" class="select"><option value="">Pilih</option><option>A</option></select></div>
  <div class="ds-field"><label for="ss2">Terisi</label><select id="ss2" class="select"><option>Logistik</option></select></div>
  <div class="ds-field"><label for="ss3">Nonaktif</label><select id="ss3" class="select" disabled><option>Logistik</option></select></div>
  <div class="ds-field"><label for="ss4">Tidak valid</label><select id="ss4" class="select" aria-invalid="true" aria-describedby="ss4-e"><option value="">Pilih</option></select><p class="ds-field-error" id="ss4-e">Pilih departemen.</p></div>
  <div class="ds-field"><label for="ss5">Valid</label><select id="ss5" class="select" data-state="success"><option>Keuangan</option></select></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest, hover | Bawaan, pointer di atas | Seperti [input](./input.md); chevron berwarna teks |
| Focus | `:focus` | Ring 2px dengan offset 2px |
| Open | Pemilih terbuka | Daftar platform; opsi dan grup memakai warna tema |
| Placeholder | Opsi bernilai kosong terpilih | Teks `--ds-subtle` |
| Filled | Opsi nyata terpilih | Teks isi |
| Disabled | `disabled` | Opasitas 55%, `base-200`, `not-allowed` |
| Opsi disabled | `option[disabled]` | Teks `--ds-subtle`, tidak dapat dipilih |
| Invalid | `aria-invalid`, `:user-invalid` | Border galat; pesan di bawah |
| Success | `data-state="success"` | Border sukses |
| Multiple | `multiple` | Listbox dengan isian tonal pada opsi terpilih |

## Anatomi

- `select.select` (daisyUI) dengan ukuran `select-sm`, bawaan, `select-lg`.
- `option`, `optgroup[label]`, `option[disabled]`.
- Di dalam [input group](./input-group.md) select menjadi addon dengan lebar otomatis.

## Penggunaan

- Urutkan opsi sesuai harapan orang (abjad, frekuensi, waktu), bukan menurut id basis data.
- Jaga teks opsi satu baris. Opsi 40 karakter masih muat di 320px.
- Jangan pakai select untuk ya atau tidak; pakai switch atau radio.
- Pakai opsi pertama yang terlihat ("Pilih departemen") daripada memilihkan nilai sembarang.
- Kelompokkan dengan `optgroup` setelah 8 opsi atau saat kategori penting.
- Jangan mengirim form otomatis saat berubah kecuali kontrolnya jelas sebuah filter (`data-ds-autosubmit`).

## Aksesibilitas

- Semantik, keyboard, dan perilaku pembaca layar native dipertahankan; ini alasan utama memilihnya.
- Label optgroup dibacakan sebagai nama grup. Opsi disabled tetap di daftar dan diumumkan tidak tersedia.
- Opsi terpilih di listbox multiple ditunjukkan oleh isian dan bobot, bukan hanya warna.
- Chevron adalah dekorasi; target 44px.

| Tombol | Aksi |
| --- | --- |
| Spasi, Enter, Alt + Panah Bawah | Membuka daftar |
| Panah Atas / Bawah | Mengganti opsi |
| Home / End | Opsi pertama / terakhir |
| Ketik huruf | Melompat ke opsi berikutnya yang cocok |
| Ctrl/Cmd + Klik, Shift + Klik | Multiple: menambah atau memperluas pilihan |

## Razor

```cshtml
<ds-field asp-for="Department" type="select" asp-items="Model.Departments" placeholder="Pilih departemen" />
```

## JavaScript

`select[data-ds-autosubmit]` mengirim form saat berubah (`forms.js`). Selebihnya tidak butuh skrip.

## Token

`--ds-control-border`, `--ds-focus`, `--ds-subtle`, `--color-base-100/200`, `--color-primary`, `--radius-field`, `--ds-opacity-disabled`.

## Native dan daisyUI

Dibangun di atas `select.select`: DS mempertahankan chevron daisyUI, menambah set state bersama, tinggi 44px, warna placeholder, gaya optgroup dan multiple, serta menghapus lebar maksimum 20rem di dalam `.ds-field`.
