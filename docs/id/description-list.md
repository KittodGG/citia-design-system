---
title: Description list
group: components
category: data-display
order: 8
summary: Pasangan label dan nilai dalam tata letak vertikal, horizontal, atau grid, dengan aksi baris, tombol salin, dan tanda hubung untuk nilai kosong.
source: TPS app.css .pt-dl L3644–3646, .master-detail dl L1911–1949
---

Description list menampilkan properti satu rekaman: pelanggan, faktur, proyek. Ia adalah `dl` sungguhan dengan `dt` dan `dd`, sehingga teknologi bantu membaca pasangan. Untuk perbandingan banyak rekaman pakai [table](./table.md); untuk ringkasan singkat di dialog konfirmasi pakai `.ds-kv`.

## Contoh

```html preview title="Grid (bawaan) dan vertikal"
<div class="ds-grid-2">
  <dl class="ds-dl">
    <div class="ds-dl__row"><dt>Pelanggan</dt><dd>Mei Tanaka</dd></div>
    <div class="ds-dl__row"><dt>Faktur</dt><dd>INV-2026-0418</dd></div>
    <div class="ds-dl__row"><dt>Jumlah</dt><dd>Rp12.400.000</dd></div>
    <div class="ds-dl__row"><dt>Jatuh tempo</dt><dd>20 Nov 2026</dd></div>
  </dl>
  <dl class="ds-dl is-vertical">
    <div class="ds-dl__row"><dt>Proyek</dt><dd>PRJ-1024 Redesain situs web</dd></div>
    <div class="ds-dl__row"><dt>Penanggung jawab</dt><dd>Ayu Lestari</dd></div>
    <div class="ds-dl__row"><dt>Catatan</dt><dd></dd></div>
  </dl>
</div>
```

```html preview title="Horizontal dengan aksi dan salin"
<dl class="ds-dl is-horizontal is-boxed">
  <div class="ds-dl__row"><dt>Nama lengkap</dt><dd>Daniel Okafor</dd><span class="ds-dl__actions"><button type="button" class="btn btn-ghost btn-xs">Ubah</button></span></div>
  <div class="ds-dl__row"><dt>Email</dt><dd id="dl-mail">daniel.okafor@example.com</dd><span class="ds-dl__actions"><button type="button" class="btn btn-ghost btn-xs" data-ds-copy="#dl-mail" data-ds-copy-message="Email disalin" aria-label="Salin email"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg></button></span></div>
  <div class="ds-dl__row"><dt>Peran</dt><dd><span class="ds-status is-success has-dot">Administrator</span></dd></div>
  <div class="ds-dl__row"><dt>Telepon</dt><dd class="ds-dl__empty"><span aria-hidden="true">&mdash;</span><span class="ds-visually-hidden">Belum diisi</span></dd><span class="ds-dl__actions"><button type="button" class="btn btn-ghost btn-xs">Tambah</button></span></div>
</dl>
```

```html preview title="Grid sel"
<dl class="ds-dl is-grid is-cells">
  <div class="ds-dl__row"><dt>Wilayah</dt><dd>Jakarta</dd></div>
  <div class="ds-dl__row"><dt>Mata uang</dt><dd>IDR</dd></div>
  <div class="ds-dl__row"><dt>Termin pembayaran</dt><dd>Net 30</dd></div>
  <div class="ds-dl__row"><dt>NPWP</dt><dd>01.234.567.8-901.000</dd></div>
  <div class="ds-dl__row"><dt>Kontak penagihan</dt><dd>Sofia Marquez</dd></div>
  <div class="ds-dl__row"><dt>Faktur terakhir</dt><dd>2 Nov 2026</dd></div>
</dl>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | `dt` dalam `--ds-subtle` (13px), `dd` 15px berat sedang, hairline antar baris horizontal |
| Nilai kosong | `dd` kosong, atau `.ds-dl__empty` | Tanda hubung dalam `--ds-subtle`; pembaca layar mendengar "Belum diisi" dari teks tersembunyi |
| Nilai panjang | Teks panjang, kode panjang | `overflow-wrap: anywhere`; baris bertambah tinggi |
| Salin | Tombol `data-ds-copy` | Pesan sukses sementara selama 1,6 sampai 2 dtk |
| Hover, fokus aksi baris | Pointer, keyboard pada tombol baris | State milik tombol itu sendiri; baris tidak punya |
| Kontainer sempit | Di bawah 640px | Baris horizontal bertumpuk: label di atas nilai, aksi di samping nilai |
| Memuat | Konten belum siap | Pakai `.ds-bone` di `dd`; atur `aria-busy="true"` pada daftar |

## Anatomi

- `dl.ds-dl` dengan `is-vertical`, `is-horizontal`, `is-grid` (`is-cells`), `is-boxed`, `is-detail`.
- `.ds-dl__row` (`div` yang membungkus `dt` dan `dd`, diizinkan di `dl`), `dt`, `dd`, `.ds-dl__actions`, `.ds-dl__empty`.
- Lebar kolom label: `--ds-dl-label` (bawaan 14rem) pada `is-horizontal`.
- `.ds-config-grid` dan `.ds-kv` tetap ada untuk ubin konfigurasi dan dialog.

## Penggunaan

- Urutkan pasangan menurut cara orang membaca rekaman: identitas dulu, uang dan tanggal berikutnya, catatan terakhir.
- Jaga label 1 sampai 3 kata, tanpa titik dua. Tampilkan tanda hubung untuk nilai yang hilang, jangan sembunyikan barisnya.
- Pakai horizontal pada halaman selebar 640px atau lebih dan bila nilai berupa teks panjang; pakai grid untuk nilai pendek.
- Taruh paling banyak satu aksi per baris, di ujung baris. Utamakan "Ubah" untuk seluruh bagian di header card.
- Jangan memakai description list untuk navigasi atau untuk field formulir.

## Aksesibilitas

- `dl`, `dt`, dan `dd` memberi semantik pasangan; letakkan setiap `dd` setelah `dt`-nya.
- Tombol salin memerlukan nama aksesibel yang menyebut apa yang disalin ("Salin email").
- Tanda hubung saja dibaca sebagai "em dash" atau dilewati; pasangkan dengan teks tersembunyi "Belum diisi".

## Razor

Tidak ada tag helper; tulis markup-nya. Lewatkan nilai melalui `Fmt.Date`, `Fmt.Decimal`, dan `Html.Encode`:

```cshtml
<dl class="ds-dl is-horizontal">
    <div class="ds-dl__row"><dt>@T["Pelanggan"]</dt><dd>@Model.CustomerName</dd></div>
    <div class="ds-dl__row"><dt>@T["Jatuh tempo"]</dt><dd>@Fmt.Date(Model.DueDate)</dd></div>
</dl>
```

## Token

`--ds-subtle`, `--color-base-300`, `--ds-radius-card`, `--ds-space-card-x`, `--ds-dl-label` (atur pada daftar).

## Native dan daisyUI

Memakai `dl`, `dt`, `dd` native. daisyUI tidak punya description list; `.list-row` adalah pola lain. `.ds-dl` versi 1 (kolom otomatis) adalah tata letak bawaan di sini.
