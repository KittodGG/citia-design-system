---
title: Radio group
group: components
category: forms
order: 21
summary: Sekumpulan kontrol bulat untuk memilih tepat satu dari 2 sampai 7 opsi, sebagai baris atau kartu yang dapat dipilih, dengan perilaku tombol panah native.
source: TPS app.css L1890–1975 (.ds-choice, .ds-choice-grid)
---

Radio group memungkinkan orang memilih tepat satu opsi dan menampilkan semua opsi sekaligus. Gunakan untuk 2 sampai 7 opsi bila membandingkannya penting. Untuk opsi lebih banyak, atau bila ruang sempit, gunakan [Select](./select.md) atau [Combobox](./combobox.md). Untuk satu pilihan aktif/nonaktif, gunakan [Checkbox](./checkbox.md) atau [Switch](./switch.md). Untuk berpindah tampilan di tempat, gunakan [Segmented control](./segmented-control.md).

## Contoh

### Vertikal (bawaan)

```html preview title="Radio group vertikal"
<fieldset class="ds-radio-group">
  <legend>Siklus penagihan</legend>
  <div class="ds-choice-group__items">
    <label class="ds-check-row"><input type="radio" class="radio" name="Cycle" value="monthly" checked><span>Bulanan</span></label>
    <label class="ds-check-row"><input type="radio" class="radio" name="Cycle" value="quarterly"><span>Per kuartal</span></label>
    <label class="ds-check-row"><input type="radio" class="radio" name="Cycle" value="yearly"><span>Tahunan</span></label>
  </div>
</fieldset>
```

### Dengan deskripsi

```html preview title="Opsi dengan deskripsi"
<fieldset class="ds-radio-group" aria-describedby="rg-ship-hint">
  <legend>Pengiriman</legend>
  <p id="rg-ship-hint" class="ds-hint">Harga sudah termasuk pajak.</p>
  <div class="ds-choice-group__items">
    <label class="ds-check-row">
      <input type="radio" class="radio" name="Delivery" value="standard" checked aria-describedby="rg-ship-1">
      <span><strong>Standar</strong><small id="rg-ship-1">3 sampai 5 hari kerja. Gratis di atas Rp 500.000.</small></span>
    </label>
    <label class="ds-check-row">
      <input type="radio" class="radio" name="Delivery" value="express" aria-describedby="rg-ship-2">
      <span><strong>Ekspres</strong><small id="rg-ship-2">Hari kerja berikutnya. Rp 45.000.</small></span>
    </label>
    <label class="ds-check-row">
      <input type="radio" class="radio" name="Delivery" value="pickup" disabled aria-describedby="rg-ship-3">
      <span><strong>Ambil di kantor</strong><small id="rg-ship-3">Tidak tersedia untuk pesanan di atas 20 kg.</small></span>
    </label>
  </div>
</fieldset>
```

### Horizontal

Gunakan `.is-horizontal` untuk 2 sampai 4 label pendek. Baris membungkus di layar sempit.

```html preview title="Radio group horizontal"
<fieldset class="ds-radio-group is-horizontal">
  <legend>Format laporan</legend>
  <div class="ds-choice-group__items">
    <label class="ds-check-row"><input type="radio" class="radio" name="Format" value="pdf" checked><span>PDF</span></label>
    <label class="ds-check-row"><input type="radio" class="radio" name="Format" value="xlsx"><span>Excel</span></label>
    <label class="ds-check-row"><input type="radio" class="radio" name="Format" value="csv"><span>CSV</span></label>
  </div>
</fieldset>
```

### Radio kartu

Kartu cocok untuk pilihan paket atau peran yang tiap opsinya butuh satu kalimat. Taruh `role="radiogroup"` pada grid hanya bila tidak ada `fieldset`; utamakan fieldset.

```html preview title="Radio kartu"
<fieldset class="ds-radio-group">
  <legend>Paket</legend>
  <div class="ds-choice-grid is-3">
    <label class="ds-choice">
      <input type="radio" class="radio" name="Plan" value="starter">
      <span><strong>Starter</strong><small>Hingga 3 pengguna. Rp 150.000 per bulan.</small></span>
    </label>
    <label class="ds-choice">
      <input type="radio" class="radio" name="Plan" value="team" checked>
      <span><strong>Team</strong><small>Hingga 25 pengguna, proyek bersama. Rp 900.000 per bulan.</small></span>
    </label>
    <label class="ds-choice">
      <input type="radio" class="radio" name="Plan" value="enterprise">
      <span><strong>Enterprise</strong><small>Pengguna tanpa batas, SSO, dan audit log. Harga sesuai kontrak.</small></span>
    </label>
  </div>
</fieldset>
```

### Kartu dengan ikon, kontrol di ujung

```html preview title="Kartu dengan ikon"
<fieldset class="ds-radio-group">
  <legend>Metode pembayaran</legend>
  <div class="ds-choice-grid is-2">
    <label class="ds-choice is-end">
      <input type="radio" class="radio" name="Pay" value="transfer" checked>
      <span class="flex gap-3"><span class="ds-choice__icon"><svg class="ds-icon"><use href="#ds-icon-building"></use></svg></span><span><strong>Transfer bank</strong><small>Dikonfirmasi dalam 1 hari kerja.</small></span></span>
    </label>
    <label class="ds-choice is-end">
      <input type="radio" class="radio" name="Pay" value="card">
      <span class="flex gap-3"><span class="ds-choice__icon"><svg class="ds-icon"><use href="#ds-icon-credit-card"></use></svg></span><span><strong>Kartu kredit</strong><small>Ditagih seketika. Visa dan Mastercard.</small></span></span>
    </label>
  </div>
</fieldset>
```

## State

```html preview title="State radio"
<div class="grid gap-6 sm:grid-cols-2">
  <fieldset class="ds-radio-group">
    <legend>Rest, terpilih, nonaktif</legend>
    <div class="ds-choice-group__items">
      <label class="ds-check-row"><input type="radio" class="radio" name="st-a" value="1"><span>Tidak dipilih</span></label>
      <label class="ds-check-row"><input type="radio" class="radio" name="st-a" value="2" checked><span>Dipilih</span></label>
      <label class="ds-check-row"><input type="radio" class="radio" name="st-b" value="3" disabled><span>Nonaktif</span></label>
      <label class="ds-check-row"><input type="radio" class="radio" name="st-c" value="4" disabled checked><span>Nonaktif, dipilih</span></label>
    </div>
  </fieldset>
  <fieldset class="ds-radio-group" aria-invalid="true" aria-describedby="rg-err">
    <legend>Grup tidak valid</legend>
    <div class="ds-choice-group__items">
      <label class="ds-check-row"><input type="radio" class="radio" name="st-d" value="1" required><span>Ayu Lestari</span></label>
      <label class="ds-check-row"><input type="radio" class="radio" name="st-d" value="2" required><span>Daniel Okafor</span></label>
    </div>
    <p id="rg-err" class="ds-field-error">Pilih siapa yang menyetujui permintaan.</p>
  </fieldset>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak dipilih | Lingkaran 20px, border 1px `--ds-control-border`, permukaan `--color-base-100` |
| Hover | pointer di atas lingkaran atau barisnya | border lebih gelap, pratinjau titik samar 18% |
| Pressed | pointer ditekan | isi state-layer `--ds-opacity-state-pressed` |
| Focus-visible | fokus keyboard | ring 2px `--ds-focus`, offset 2px |
| Selected | `:checked` | border primary, titik primary 10px yang membesar masuk (180ms, easing emphasized) |
| Invalid | `fieldset[aria-invalid="true"]` atau `:user-invalid` | border galat pada setiap lingkaran atau kartu, pesan di bawah grup |
| Disabled | `:disabled` pada satu opsi atau fieldset | `--ds-opacity-disabled`, `cursor: not-allowed`, tanpa hover |
| Card selected | `.ds-choice:has(:checked)` | border primary ditambah ring dalam, rona primary 6% |

## Anatomi

- `fieldset.ds-radio-group`: grup; `legend` menamainya; `.is-horizontal` menyusun opsi dalam satu baris.
- `.ds-choice-group__items`: daftar baris.
- `label.ds-check-row`: satu opsi: `input.radio`, label `strong`, deskripsi `small`.
- `.ds-choice-grid` + `label.ds-choice`: tata letak kartu (`.is-2`, `.is-3`, `.is-horizontal` untuk auto-fit); `.ds-choice__icon`, `.ds-choice__body`.

## Penggunaan

- Urutkan opsi secara logis (terkecil ke terbesar, yang paling umum dahulu); jangan menurut abjad bila ada urutan alami.
- Pilih lebih dulu opsi yang paling aman atau paling umum, kecuali pilihan harus disengaja (persetujuan, hukum).
- Jaga label tetap pendek (1 sampai 5 kata) dan taruh rincian di deskripsi.
- Pakai kartu untuk 2 sampai 6 opsi dengan satu kalimat masing-masing; pakai baris untuk label pendek.
- Jangan pakai radio untuk aktif/nonaktif; satu radio tidak pernah bisa dikosongkan.
- Jangan memicu navigasi atau penyimpanan saat berubah; radio disimpan saat form dikirim.

## Aksesibilitas

- Semua radio dalam satu grup memakai `name` yang sama; browser menjadikannya satu perhentian Tab dengan perpindahan tombol panah. Pertahankan input native, jangan membangunnya ulang dengan ARIA.
- `fieldset` + `legend` menamai grup. Taruh bantuan dan galat pada fieldset dengan `aria-describedby`, serta `aria-invalid="true"` saat grup gagal validasi.
- Opsi yang nonaktif dilewati tombol panah. Jelaskan alasannya di deskripsinya.
- Titik berukuran 10px pada lingkaran 20px; state terpilih juga mengubah warna border, sehingga tidak hanya warna.

| Tombol | Aksi |
| --- | --- |
| Tab | Masuk ke grup (ke opsi yang terpilih, atau yang pertama) dan keluar darinya |
| Arrow Down / Arrow Right | Memilih opsi berikutnya (berputar) |
| Arrow Up / Arrow Left | Memilih opsi sebelumnya (berputar) |
| Space | Memilih opsi yang fokus bila belum ada yang terpilih |

## Razor

```cshtml
<ds-radio-group asp-for="Cycle" label="Siklus penagihan" asp-items="Model.Cycles" />

<ds-radio-group asp-for="Plan" label="Paket" card columns="3" items="Model.Plans" />
@* Model.Plans: IEnumerable<ChoiceItem>, mis. new ChoiceItem("team", "Team", "Hingga 25 pengguna.") *@

<ds-radio-group asp-for="Format" label="Format laporan" horizontal required
                items="new[] { new ChoiceItem("pdf", "PDF"), new ChoiceItem("xlsx", "Excel") }" />
```

Helper merender fieldset, legend, opsi, dan galat model. Opsi yang terpilih berasal dari model, `value`, atau `SelectListItem.Selected`.

## JavaScript

Tidak ada. Radio group bersifat native; pemilihan, tombol panah, dan pengiriman form berfungsi tanpa ds.js.

## Token

`--color-primary`, `--ds-control-border`, `--color-base-100`, `--color-base-200`, `--color-base-300`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-opacity-state-selected`, `--ds-opacity-disabled`, `--ds-focus`, `--color-error`, `--ds-radius-lg` (kartu), `--ds-duration-base`, `--ds-ease-emphasized`, `--ds-space-3`, `--ds-space-6`.

## Native dan daisyUI

Dibangun di atas `<input type="radio">` dengan `.radio` daisyUI. DS menetapkan ukuran bawaan 20px (`is-sm` 16px, `is-lg` 24px), primary sebagai warna bawaan, titik yang membesar sebagai ganti inset shadow daisyUI, border 3:1, focus ring DS, dan titik pratinjau hover. Class tone daisyUI (`radio-success`, …) tetap mengubah warna.
