---
title: Button group
group: components
category: actions
order: 2
summary: Gabungkan button yang berkaitan menjadi satu kontrol dengan tepi bersama, atau beri jarak merata. Horizontal, vertikal, lebar penuh, varian apa pun.
---

Button group menyatukan button yang bekerja pada hal yang sama: sebelumnya, hari ini, berikutnya; salin, cetak, unduh. Tepinya dipakai bersama dan hanya sudut luar yang tetap membulat. Pakai [toggle group](./toggle-group.md) bila button menyimpan state terpilih, [split button](./split-button.md) bila satu aksi punya menu alternatif, dan [pagination](./pagination.md) untuk nomor halaman.

## Contoh

### Menyatu

```html preview title="Menyatu"
<div class="ds-btn-group" role="group" aria-label="Navigasi rentang tanggal">
  <button type="button" class="btn">Sebelumnya</button>
  <button type="button" class="btn">Hari ini</button>
  <button type="button" class="btn">Berikutnya</button>
</div>
```

### Dengan ikon

```html preview title="Ikon dan label"
<div class="ds-btn-group" role="group" aria-label="Aksi faktur">
  <button type="button" class="btn">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg>
    Salin
  </button>
  <button type="button" class="btn">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-printer"></use></svg>
    Cetak
  </button>
  <button type="button" class="btn">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-download"></use></svg>
    Unduh
  </button>
</div>
```

### Varian

Varian apa pun bisa dipakai. Group terisi mendapat pemisah dengan warna turunan dari warna konten; group outline dan ghost memakai satu tepi bersama.

```html preview title="Primary, outline, soft"
<div style="display:grid;gap:.75rem;justify-items:start">
  <div class="ds-btn-group" role="group" aria-label="Persetujuan">
    <button type="button" class="btn btn-primary">Setujui</button>
    <button type="button" class="btn btn-primary">Minta perubahan</button>
  </div>
  <div class="ds-btn-group" role="group" aria-label="Periode laporan">
    <button type="button" class="btn btn-outline">Minggu</button>
    <button type="button" class="btn btn-outline">Bulan</button>
    <button type="button" class="btn btn-outline">Kuartal</button>
  </div>
  <div class="ds-btn-group" role="group" aria-label="Urutan">
    <button type="button" class="btn btn-soft">Terlama</button>
    <button type="button" class="btn btn-soft">Terbaru</button>
  </div>
</div>
```

### Ukuran

Atur ukuran pada setiap button. Semua item dalam satu group memakai ukuran yang sama.

```html preview title="xs, sm, md, lg"
<div style="display:grid;gap:.75rem;justify-items:start">
  <div class="ds-btn-group" role="group" aria-label="Sangat kecil"><button type="button" class="btn btn-xs">Kiri</button><button type="button" class="btn btn-xs">Tengah</button><button type="button" class="btn btn-xs">Kanan</button></div>
  <div class="ds-btn-group" role="group" aria-label="Kecil"><button type="button" class="btn btn-sm">Kiri</button><button type="button" class="btn btn-sm">Tengah</button><button type="button" class="btn btn-sm">Kanan</button></div>
  <div class="ds-btn-group" role="group" aria-label="Sedang"><button type="button" class="btn">Kiri</button><button type="button" class="btn">Tengah</button><button type="button" class="btn">Kanan</button></div>
  <div class="ds-btn-group" role="group" aria-label="Besar"><button type="button" class="btn btn-lg">Kiri</button><button type="button" class="btn btn-lg">Tengah</button><button type="button" class="btn btn-lg">Kanan</button></div>
</div>
```

### Vertikal

```html preview title="Vertikal"
<div class="ds-btn-group is-vertical" role="group" aria-label="Zoom">
  <button type="button" class="btn btn-square" aria-label="Perbesar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-zoom-in"></use></svg></button>
  <button type="button" class="btn btn-square" aria-label="Perkecil"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-zoom-out"></use></svg></button>
  <button type="button" class="btn btn-square" aria-label="Sesuaikan layar"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-maximize"></use></svg></button>
</div>
```

### Lebar penuh

`is-block` membuat setiap button berbagi baris dengan lebar sama.

```html preview title="Lebar penuh"
<div class="ds-btn-group is-block" role="group" aria-label="Metode pembayaran" style="max-width:26rem">
  <button type="button" class="btn">Kartu</button>
  <button type="button" class="btn">Transfer</button>
  <button type="button" class="btn">Tunai</button>
</div>
```

### Berjarak

`is-spaced` menghapus penyatuan dan memberi jarak 8px. Group tetap memiliki `role` dan nama.

```html preview title="Berjarak"
<div class="ds-btn-group is-spaced" role="group" aria-label="Aksi baris">
  <button type="button" class="btn btn-sm">Setujui</button>
  <button type="button" class="btn btn-sm">Tolak</button>
  <button type="button" class="btn btn-sm btn-ghost">Catatan</button>
</div>
```

## State

Setiap item mempertahankan seluruh state [button](./button.md). Di dalam group, item yang sedang di-hover, difokuskan, terpilih, atau aktif dinaikkan (`z-index`) agar seluruh tepinya tergambar di atas tetangganya.

```html preview title="State item"
<div style="display:grid;gap:.75rem;justify-items:start">
  <div class="ds-btn-group" role="group" aria-label="Diam, hover, focus, ditekan">
    <button type="button" class="btn">Diam</button>
    <button type="button" class="btn" data-ds-demo="hover">Hover</button>
    <button type="button" class="btn" data-ds-demo="focus">Focus-visible</button>
    <button type="button" class="btn" data-ds-demo="pressed">Ditekan</button>
  </div>
  <div class="ds-btn-group" role="group" aria-label="Ketersediaan dan aktivitas">
    <button type="button" class="btn" aria-pressed="true">Terpilih</button>
    <button type="button" class="btn" disabled>Nonaktif</button>
    <button type="button" class="btn" aria-disabled="true" title="Tersedia setelah disetujui">aria-disabled</button>
    <button type="button" class="btn" aria-busy="true">Memuat</button>
    <button type="button" class="btn is-success">Berhasil</button>
  </div>
  <div class="ds-btn-group" role="group" aria-label="Group terisi">
    <button type="button" class="btn btn-primary">Setujui</button>
    <button type="button" class="btn btn-primary" disabled>Minta perubahan</button>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Diam | Tidak ada | Tepi 1px bersama, sudut luar membulat, sudut dalam siku |
| Hover | Pointer di atas sebuah item | State layer item itu; item dinaikkan di atas tetangganya |
| Focus-visible | Fokus keyboard | Cincin 2px `--ds-focus` tergambar di atas semua item |
| Pressed | Pointer ditekan | Item mengecil ke 0,97 dan memekat; tetangga tidak bergerak |
| Selected | `aria-pressed="true"` pada item | Isian tonal dan tepi 2px hanya pada item itu |
| Disabled | `disabled` | Opasitas 55% pada item itu; sambungan tetap |
| aria-disabled | `aria-disabled="true"` | Tampilan sama, bisa difokuskan, menjelaskan alasan |
| Loading | `aria-busy="true"` | Spinner di dalam item itu; lebar group tidak berubah |
| Berhasil | `.is-success` | Hijau tonal pada item itu selama 1,6 sampai 2 detik |
| RTL | `dir="rtl"` | Radius dan sambungan tercermin lewat properti logis |

## Anatomi

- `.ds-btn-group`: wadah (`inline-flex`).
- Item: `.btn` (atau `.ds-icon-button`, `.ds-toggle`, anchor dengan `.btn`). Varian apa pun, satu ukuran.
- Modifier: `is-vertical`, `is-block`, `is-spaced`.

## Penggunaan

- Kelompokkan dua sampai lima aksi yang berkaitan. Lebih dari lima, pakai menu atau [split button](./split-button.md).
- Beri setiap group `role="group"` dan `aria-label` yang menyebut objek yang dikenai aksi.
- Pakai satu varian per group, kecuali satu item primary di ujung.
- Tulis label pendek, satu atau dua kata. Dalam bahasa Indonesia group melebar sekitar 40%; ia hanya membungkus ke baris kedua pada `is-block`.
- Jangan pakai group untuk berpindah halaman, atau untuk pilihan yang harus tetap terlihat. Pakai [tabs](./tabs.md) atau [toggle group](./toggle-group.md).

## Aksesibilitas

- `role="group"` dengan `aria-label` (atau `aria-labelledby`) memberi tahu teknologi bantu bahwa button-button itu satu kesatuan.
- Setiap button adalah titik tab sendiri. Group tidak memindahkan fokus dengan tombol panah; untuk navigasi panah pakai [toggle group](./toggle-group.md).
- Item hanya-ikon butuh `aria-label`; group vertikal berisi icon button memberi nama pada masing-masing.
- Kontras dan ukuran target mengikuti [button](./button.md): area sentuh 44px di layar sentuh, setiap item minimal 24px.

| Tombol | Aksi |
| --- | --- |
| Tab, Shift+Tab | Berpindah antar item |
| Enter, Space | Mengaktifkan item yang difokuskan |

## Razor

Group adalah markup; itemnya bisa berupa tag helper `<ds-button>`.

```cshtml
<div class="ds-btn-group" role="group" aria-label="Aksi faktur">
    <ds-button icon="copy">Salin</ds-button>
    <ds-button icon="printer">Cetak</ds-button>
    <ds-button icon="download">Unduh</ds-button>
</div>
```

## Token

`--ds-border-hairline`, `--ds-control-border`, `--ds-radius-md|lg|box`, `--ds-space-2` (jarak pada mode berjarak), `--ds-focus`, ditambah token [button](./button.md).

## Native dan daisyUI

`.ds-btn-group` adalah padanan DS untuk `.join` daisyUI. Keduanya berfungsi: item `.join` mempertahankan sudutnya lewat variabel `--join-*` yang sudah dibaca button. Group DS menambah vertikal, lebar penuh, berjarak, pemisah tinted untuk item terisi, dan tepi hover serta fokus yang dinaikkan.
