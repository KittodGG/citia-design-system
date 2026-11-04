---
title: Input group
group: components
category: forms
order: 3
summary: Menempelkan teks, tombol, atau select pada input agar bagian-bagiannya terbaca sebagai satu kontrol - protokol, domain, mata uang, satuan, kirim.
---

Input group menyambung input dengan konteks tetap: `https://`, `.com`, `USD`, select satuan, atau tombol aksi. Pakai bila addon adalah bagian dari nilai. Bila addon hanya menghias, gunakan ikon atau afiks di dalam [input](./input.md). Untuk jumlah dengan tombol tambah dan kurang, pakai [number input](./number-input.md).

## Contoh

### Addon teks

```html preview title="Addon teks"
<div class="ds-form" style="max-width:30rem">
  <div class="ds-field">
    <label for="ig-site">Situs web</label>
    <div class="ds-input-group">
      <span class="ds-input-group__addon">https://</span>
      <div class="ds-input"><input id="ig-site" class="ds-input__control" value="citia-engineering"></div>
      <span class="ds-input-group__addon">.com</span>
    </div>
  </div>
  <div class="ds-field">
    <label for="ig-amount">Nominal</label>
    <div class="ds-input-group">
      <span class="ds-input-group__addon">USD</span>
      <div class="ds-input"><input id="ig-amount" class="ds-input__control" inputmode="decimal" value="12,480.00"></div>
    </div>
  </div>
</div>
```

### Addon tombol dan select

Addon tombol menjalankan satu aksi pada nilai (salin, terapkan, kirim). Addon select mengubah cara nilai dibaca (mata uang, satuan, kode negara).

```html preview title="Tombol dan select"
<div class="ds-form" style="max-width:30rem">
  <div class="ds-field">
    <label for="ig-code">Kode diskon</label>
    <div class="ds-input-group">
      <div class="ds-input"><input id="ig-code" class="ds-input__control" value="SPRING-2026"></div>
      <button type="button" class="btn btn-primary">Terapkan</button>
    </div>
  </div>
  <div class="ds-field">
    <label for="ig-phone">Telepon</label>
    <div class="ds-input-group">
      <select class="select" aria-label="Kode negara"><option>+62</option><option>+81</option><option>+1</option></select>
      <div class="ds-input"><input id="ig-phone" type="tel" class="ds-input__control" value="812 5550 1987" autocomplete="tel-national"></div>
    </div>
  </div>
</div>
```

### Ukuran dan varian terpisah

`is-sm` dan `is-lg` mengubah ukuran semua bagian sekaligus. `is-separate` menjaga bagian dalam satu baris dengan jarak 8px, bukan tepi bersama.

```html preview title="Ukuran"
<div class="ds-form" style="max-width:30rem">
  <div class="ds-input-group is-sm"><span class="ds-input-group__addon">kg</span><div class="ds-input"><input class="ds-input__control" aria-label="Berat" value="18.5"></div></div>
  <div class="ds-input-group is-lg"><div class="ds-input"><input class="ds-input__control" aria-label="Faktur" value="INV-2026-0418"></div><button type="button" class="btn">Salin</button></div>
  <div class="ds-input-group is-separate"><div class="ds-input"><input class="ds-input__control" aria-label="Awal" value="PRJ-1024"></div><button type="button" class="btn">Cari</button></div>
</div>
```

## State

```html preview title="State group"
<div class="ds-form" style="max-width:30rem">
  <div class="ds-input-group"><span class="ds-input-group__addon">USD</span><div class="ds-input"><input class="ds-input__control" aria-label="Nonaktif" value="480.00" disabled></div></div>
  <div class="ds-input-group"><span class="ds-input-group__addon">USD</span><div class="ds-input"><input class="ds-input__control" aria-label="Tidak valid" value="-5" aria-invalid="true"></div></div>
  <div class="ds-input-group"><span class="ds-input-group__addon">USD</span><div class="ds-input" data-state="success"><input class="ds-input__control" aria-label="Valid" value="120.00"></div></div>
  <div class="ds-input-group"><div class="ds-input" aria-busy="true"><input class="ds-input__control" aria-label="Memuat" value="SPRING-2026"></div><button type="button" class="btn" aria-disabled="true">Terapkan</button></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Tepi 1px bersama (tanpa border ganda), sudut luar membulat |
| Hover | Pointer di atas input atau tombol | Setiap bagian punya hover sendiri |
| Focus | `:focus-visible` pada satu bagian | Bagian itu naik di atas tetangganya dan menggambar ring 2px |
| Disabled | `disabled` pada input | Teks addon meredup bersama input |
| Invalid | `aria-invalid` pada input | Addon memakai border galat |
| Loading | `aria-busy` pada `.ds-input` | Spinner di input; tombol `aria-disabled` selama pengecekan |

## Anatomi

- `.ds-input-group`: baris flex, bagian berbagi tepi (`margin-inline-start: -1px`).
- `.ds-input-group__addon`: teks atau ikon statis, latar `base-200`, teks `--ds-subtle`.
- `.ds-input`, `input.input`, `.select`, `.btn`: bagian interaktif, dalam urutan apa pun.
- Modifier: `is-sm`, `is-lg`, `is-separate`, `is-wrap` (bertumpuk di bawah 480px).

## Penggunaan

- Satu input per group. Untuk dua input berdampingan pakai [field grid](./field.md).
- Beri nama seluruh group dengan label field; beri addon select `aria-label` sendiri.
- Pakai addon teks hanya untuk nilai yang tidak pernah berubah (`https://`). Biarkan orang mengetik URL penuh bila mungkin menempel.
- Maksimal satu tombol per group, di ujung, dan harus menyebut aksinya ("Terapkan", bukan hanya ikon).
- Jangan menumpuk group. Jangan mencampur ukuran dalam satu group.

## Aksesibilitas

- Teks addon adalah teks sungguhan sehingga dibaca berurutan: "https://, Situs web, edit text".
- Beri addon teks `aria-hidden="true"` bila label sudah mengatakan hal yang sama.
- Addon select perlu `aria-label`; addon tombol perlu label teks atau `aria-label`.
- Target setinggi 44px; di layar sentuh ukuran kecil menjadi 44px.
- Ring fokus digambar pada bagian yang fokus dan diangkat dengan `z-index: 1`; forced colours memakai `Highlight`.

| Tombol | Aksi |
| --- | --- |
| Tab | Berpindah antarbagian sesuai urutan DOM |
| Enter | Di input: mengirim form atau memicu tombol bawaan |

## Razor

`<ds-field>` merender satu `ds-input` dengan `prefix` dan `suffix` di dalam border. Untuk group tersambung sungguhan, tulis markup di atas; pengabelan id field tetap sama.

```cshtml
<ds-field asp-for="Website" label="Situs web" prefix="https://" suffix=".com" />
```

## Token

`--ds-control-border`, `--color-base-200`, `--ds-subtle`, `--radius-field`, `--ds-size-target`, `--ds-size-target-compact`, `--ds-opacity-disabled`, `--color-error`.

## Native dan daisyUI

Menggantikan `join` daisyUI. Memakai `.btn`, `.select`, dan `.input` sebagai bagian; DS menghapus radius sambungan dan border ganda, dan menyamakan tinggi semua bagian dengan `--ds-group-h`.
