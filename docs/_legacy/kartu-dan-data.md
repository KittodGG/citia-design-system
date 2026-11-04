---
title: Kartu dan tampilan data
group: Komponen
order: 7
summary: Surface, kartu, grid, KPI, daftar rincian, progress, grafik SVG sisi server, umpan aktivitas, dan avatar untuk menampilkan angka TPS.
source: TPS Styles/app.css L1448, L3461–3468, L3424–3458, L3654–3660, L3584–3634, L3722–3726, L3552–3603; Helpers/Charts.cs; Helpers/PortalUi.cs
---

Halaman ini memuat semua wadah dan tampilan data selain tabel. Permukaan selalu solid: `base-100` di atas `base-200`, border 1 px `base-300`, tanpa gradien dan tanpa kaca. Kedalaman datang dari kontras permukaan, bukan bayangan.

Angka datang dari database dan ditulis dengan `Fmt.Qty`/`Fmt.Number` (titik desimal, tanpa pemisah ribuan). Warna hanya mendukung kata: setiap tone selalu disertai label teks.

## Surface dan kartu {#kartu}

`.ds-surface` adalah kotak polos tanpa struktur, untuk panel yang isinya bebas (tabel, formulir panjang). `.ds-card` dipakai bila ada judul: kepala (judul + aksi), isi, dan footer opsional. Jangan menumpuk kartu di dalam kartu; pisahkan bagian dalam kartu dengan `.ds-section`.

```html preview title="Kartu dengan kepala, isi, dan footer"
<article class="ds-card">
  <header class="ds-card-head">
    <div>
      <h2><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-tank"></use></svg> Tangki T-01</h2>
      <p>Diperbarui 25 Jan 2026 14.30 WIB</p>
    </div>
    <a class="btn btn-ghost btn-sm" href="#">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg> Ubah
    </a>
  </header>
  <div class="ds-card-body">
    <p>Stok terakhir <strong>1574782 TNE</strong> dari kapasitas 2000000 TNE.</p>
  </div>
  <footer class="ds-card-foot">Pemilik: PT Akr Corporindo</footer>
</article>
```

```html preview title="Danger zone"
<article class="ds-card is-danger">
  <header class="ds-card-head"><h2>Hapus tangki</h2></header>
  <div class="ds-card-body">
    <p>Tangki yang dihapus tidak bisa dikembalikan. Riwayat pemakaian tetap tersimpan.</p>
    <div class="ds-actions is-start">
      <button type="button" class="btn btn-ghost is-danger">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg> Hapus tangki T-01
      </button>
    </div>
  </div>
</article>
```

### Varian

| Kelas | Pakai untuk |
| --- | --- |
| `.ds-surface` | Panel polos: border + radius box + latar `base-100` |
| `.ds-card` | Kartu bertajuk; `min-width: 0` agar tidak melebarkan grid |
| `.ds-card-body.is-flush` | Isi tanpa padding, untuk tabel atau daftar yang penuh sampai tepi kartu |
| `.ds-card-body.is-roomy` | Isi dengan padding panel (`--ds-space-panel`), untuk formulir atau penjelasan panjang |
| `.ds-card.is-danger` | Danger zone di akhir halaman pengaturan: tepi dan judul memerah, tombol tetap `btn-ghost is-danger` |

**Anatomi.** `.ds-card` → `.ds-card-head` (`h2`/`h3` + ikon, `p` keterangan 12 px, aksi di kanan) → `.ds-card-body` → `.ds-card-foot` (13 px, opsional). Kepala membungkus ke baris berikut saat sempit.

**Token.** `--ds-radius-card`, `--ds-radius-box`, `--ds-space-card-x`, `--ds-space-card-y`, `--ds-space-panel`, `--color-base-300`.

**Asal TPS.** `.master-surface` L1448; `.pt-card*` L3461–3468.

## Grid kartu {#grid}

`.ds-grid-2` dan `.ds-grid-3` membagi kartu menjadi kolom yang jatuh ke satu kolom sendiri, tanpa media query. Kolom minimal 28 rem pada `.ds-grid-2` dan 20 rem pada `.ds-grid-3`; jarak 20 px; kartu rata atas (`align-items: start`) supaya kartu pendek tidak ditarik setinggi tetangganya.

```html preview title="Dua kolom"
<div class="ds-grid-2">
  <article class="ds-card"><header class="ds-card-head"><h2>Pemasukan</h2></header><div class="ds-card-body">34 dokumen hari ini</div></article>
  <article class="ds-card"><header class="ds-card-head"><h2>Pengeluaran</h2></header><div class="ds-card-body">21 dokumen hari ini</div></article>
</div>
```

Pilih `.ds-grid-3` untuk tiga ringkasan sejajar, `.ds-grid-2` untuk pasangan (daftar + grafik). Untuk kartu angka kecil pakai KPI, bukan grid kartu.

## Kartu KPI {#kpi}

Angka dulu, artinya dalam satu baris redup. `.ds-kpis` memakai `auto-fill` dengan kolom minimal 13.5 rem. Tone dipasang pada `.ds-kpi` lewat `.is-success`, `.is-warning`, `.is-error`, `.is-info`, `.is-primary`, `.is-neutral`; tone mewarnai bilah kiri 4 px, ikon, dan cahaya hover.

```html preview title="Empat KPI"
<div class="ds-kpis">
  <div class="ds-kpi is-primary">
    <div class="ds-kpi-top">
      <span class="ds-kpi-label">Stok tangki</span>
      <span class="ds-kpi-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-tank"></use></svg></span>
    </div>
    <p class="ds-kpi-value">1574782<small>TNE</small></p>
    <p class="ds-kpi-sub">12 tangki aktif</p>
  </div>
  <div class="ds-kpi is-success">
    <div class="ds-kpi-top">
      <span class="ds-kpi-label">Selesai di Bea Cukai</span>
      <span class="ds-kpi-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check-circle"></use></svg></span>
    </div>
    <p class="ds-kpi-value">34</p>
    <p class="ds-kpi-sub">Hari ini, sampai 14.30 WIB</p>
  </div>
  <a class="ds-kpi is-warning" href="#">
    <div class="ds-kpi-top">
      <span class="ds-kpi-label">Perlu tindakan</span>
      <span class="ds-kpi-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg></span>
    </div>
    <p class="ds-kpi-value">3</p>
    <p class="ds-kpi-sub">Hasil belum pasti. Buka daftar.</p>
  </a>
  <a class="ds-kpi is-error" href="#">
    <div class="ds-kpi-top">
      <span class="ds-kpi-label">Ditolak Bea Cukai</span>
      <span class="ds-kpi-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg></span>
    </div>
    <p class="ds-kpi-value">2</p>
    <p class="ds-kpi-sub">BL-2026-00841 dan 1 lainnya</p>
  </a>
</div>
```

### Varian

| Bagian | Isi |
| --- | --- |
| `.ds-kpi-top` | Baris label + ikon |
| `.ds-kpi-label` | Nama ukuran, 13 px tebal 600, redup |
| `.ds-kpi-icon` | Kotak 36 px dengan tint 13% dari tone |
| `.ds-kpi-value` | Angka metrik, tabular. `<small>` di dalamnya = satuan (13 px, redup) |
| `.ds-kpi-sub` | Satu baris arti atau perbandingan |

### State dan perilaku

Hanya `<a class="ds-kpi">` yang bisa diklik: saat hover atau fokus keyboard kartu naik 2 px (`--ds-lift`), tepinya berwarna tone, dan bayangannya muncul. `<div class="ds-kpi">` tidak bereaksi. Di perangkat tanpa hover (`hover: none`) kartu tidak bergeser; di bawah `prefers-reduced-motion: reduce` transisi dimatikan.

> [!NOTE]
> Efek angkat hanya menandai kartu yang bisa diklik. Jangan memakai `<a class="ds-kpi">` untuk kartu yang tidak berpindah halaman, dan jangan menambahkan efek serupa pada `<div class="ds-kpi">`.

### Aksesibilitas

- Tone bukan satu-satunya penanda: label "Perlu tindakan" atau "Ditolak Bea Cukai" menyebut keadaannya.
- KPI tautan butuh teks yang menyebut tujuan; kalimat di `.ds-kpi-sub` ("Buka daftar") cukup.
- Ikon `aria-hidden="true"`. Label, nilai, dan sub dibaca berurutan oleh pembaca layar.

**Asal TPS.** `.pt-kpi*` L3424–3458.

## Konfigurasi dan daftar rincian {#rincian}

Empat bentuk untuk pasangan label–nilai. Pilih menurut tempatnya, bukan selera.

| Kelas | Bentuk | Pakai untuk |
| --- | --- | --- |
| `.ds-config-grid` + `.ds-config-item` | Kotak kecil, label huruf kapital 11 px di atas nilai tebal | Ringkasan konfigurasi: mode, koneksi, batas |
| `.ds-dl` | Kolom otomatis (minimal 13 rem), nilai 15 px tebal 600 | Detail portal berisi banyak field pendek |
| `.ds-dl.is-detail` | Dua kolom, nilai 16 px normal, `white-space: pre-wrap` | Halaman detail; nilai boleh panjang dan mempertahankan baris baru. Satu kolom di ≤ 640 px |
| `.ds-kv` | Dua kolom `auto` + sisa | Panel ringkasan dan dialog konfirmasi |

```html preview title="Konfigurasi dan detail"
<dl class="ds-config-grid">
  <div class="ds-config-item"><dt>Mode</dt><dd>Live<small>Terhubung ke Bea Cukai</small></dd></div>
  <div class="ds-config-item"><dt>Terminal</dt><dd>TPS Integration</dd></div>
  <div class="ds-config-item"><dt>Batas kirim</dt><dd>60 / menit</dd></div>
</dl>

<dl class="ds-dl is-detail" style="margin-top:1.5rem">
  <div><dt>No BL</dt><dd>BL-2026-00841</dd></div>
  <div><dt>Kapal</dt><dd>MT Sinar Jaya</dd></div>
  <div><dt>Kuantitas</dt><dd>992.5 TNE</dd></div>
  <div><dt>Catatan</dt><dd>Pemasukan sebagian.
Sisa dikirim 28 Jan 2026.</dd></div>
</dl>

<dl class="ds-kv" style="margin-top:1.5rem">
  <dt>Tangki</dt><dd>T-01</dd>
  <dt>Pelanggan</dt><dd>PT Akr Corporindo</dd>
</dl>
```

`.ds-kv` memakai `dt` dan `dd` langsung sebagai anak (tanpa `<div>` pembungkus), sedangkan `.ds-config-item`, `.ds-dl`, dan baris `.ds-preview-box dl` membungkus tiap pasangan dengan `<div>`.

## Preview box, section, dan hitungan {#pendukung}

`.ds-preview-box` menampilkan nilai yang akan tersimpan sebelum disimpan ("Akan disimpan sebagai"): latar `base-200`, `h3` 13 px, `dl > div` dua kolom (label maksimal 10 rem) yang jadi satu kolom di ≤ 640 px. `dl` kosong disembunyikan otomatis. `.ds-section` memberi garis pemisah dan jarak atas di dalam panel; `.ds-section-title` judulnya (15 px, 700); `.ds-counts` merangkai hitungan sebaris.

```html preview title="Preview box, section, hitungan"
<div class="ds-preview-box">
  <h3>Akan disimpan sebagai</h3>
  <dl>
    <div><dt>Kode</dt><dd>T-01</dd></div>
    <div><dt>Kapasitas</dt><dd>2000000 TNE</dd></div>
  </dl>
</div>
<section class="ds-section">
  <h3 class="ds-section-title">Jejak perubahan</h3>
  <p class="ds-counts"><span>12 diubah</span><span>3 dihapus</span><span>1 dikunci</span></p>
</section>
```

**Asal TPS.** `.pt-config-*` L3654–3660; `.pt-dl` L3644–3646; `.master-detail dl` L1911–1949; `.qa-preview` L3276–3321.

## Progress dan bar {#progress}

Empat bar tipis untuk proporsi. Bar hanya menggambar; angkanya selalu tertulis di dekatnya. Lebar diisi lewat `style="width:N%"` pada `<span>` di dalam bar; tone lewat `.is-*` pada bar atau pada span.

```html preview title="Progress, meter, activity bar, share"
<div class="ds-meter">
  <div class="ds-meter-row"><span>Tangki T-01</span><span>78%</span></div>
  <div class="ds-progress is-success" role="progressbar" aria-label="Isi tangki T-01" aria-valuemin="0" aria-valuemax="100" aria-valuenow="78">
    <span style="width:78%"></span>
  </div>
</div>
<div class="ds-meter" style="margin-top:1rem">
  <div class="ds-meter-row"><span>Hasil pengiriman hari ini</span><span>34 selesai · 3 perlu dicek · 2 ditolak</span></div>
  <div class="ds-activity-bar" aria-hidden="true">
    <span class="is-success" style="width:87%"></span>
    <span class="is-warning" style="width:8%"></span>
    <span class="is-error" style="width:5%"></span>
  </div>
</div>
<p style="margin-top:1rem">Sisa stok 992.5 TNE</p>
<span class="ds-share" aria-hidden="true"><span style="width:42%"></span></span>
```

| Kelas | Pakai untuk |
| --- | --- |
| `.ds-progress` | Satu nilai terhadap batas (6 px, bulat). Beri `role="progressbar"` + `aria-valuenow` bila nilainya penting |
| `.ds-meter` + `.ds-meter-row` | Bar dengan baris label kiri dan nilai kanan (tabular) di atasnya |
| `.ds-activity-bar` | Beberapa hasil bertumpuk (berhasil / peringatan / gagal); setiap `span` berbagi lebar total 100% |
| `.ds-share` | Garis 4 px di bawah angka besar (sisa stok), lebar maksimal 24 rem, selalu warna primary |

Bar bertumpuk dan bar dekoratif memakai `aria-hidden="true"`; teks di sebelahnya yang dibaca.

**Asal TPS.** `.pt-progress`/`.pt-meter` L3584–3634; `.activity-bar` L3722–3726; `.recap-share` L3476–3477.

## Grafik SVG {#grafik}

Grafik adalah SVG yang dirender server, tanpa pustaka JavaScript. Warna seri berasal dari token status sehingga mengikuti tema terang dan gelap. Aturan wajib:

- `<svg class="ds-chart" role="img" aria-label="…">` dengan ringkasan satu kalimat yang memuat angka pentingnya.
- Satu `<title>` per tanda (batang, segmen, titik) untuk tooltip native.
- Angkanya juga tersedia sebagai teks: legend dengan total, daftar di samping donat, atau tabel di bawah grafik. Pembaca layar tidak mengandalkan SVG.

```html preview title="Batang bertumpuk: pengiriman per hari"
<article class="ds-card">
  <header class="ds-card-head"><h2>Pengiriman per hari</h2><p>26–30 Okt 2026</p></header>
  <div class="ds-card-body">
    <svg class="ds-chart" viewBox="0 0 360 140" role="img" aria-label="Pengiriman 26 sampai 30 Oktober 2026: 136 selesai, 20 perlu dicek, 10 ditolak. Hari tersibuk 29 Oktober dengan 38 pengiriman.">
      <line class="ds-grid-line" x1="36" x2="360" y1="110" y2="110"/>
      <line class="ds-grid-line" x1="36" x2="360" y1="60" y2="60"/>
      <line class="ds-grid-line" x1="36" x2="360" y1="10" y2="10"/>
      <text x="30" y="113" text-anchor="end">0</text>
      <text x="30" y="63" text-anchor="end">20</text>
      <text x="30" y="13" text-anchor="end">40</text>
      <g><title>26 Okt: 28 selesai, 4 perlu dicek, 2 ditolak</title><rect class="ds-bar s-success" x="50" y="40" width="36" height="70"/><rect class="ds-bar s-warning" x="50" y="30" width="36" height="10"/><rect class="ds-bar s-error" x="50" y="25" width="36" height="5"/></g>
      <g><title>27 Okt: 31 selesai, 3 perlu dicek</title><rect class="ds-bar s-success" x="115" y="32.5" width="36" height="77.5"/><rect class="ds-bar s-warning" x="115" y="25" width="36" height="7.5"/></g>
      <g><title>28 Okt: 24 selesai, 6 perlu dicek, 3 ditolak</title><rect class="ds-bar s-success" x="180" y="50" width="36" height="60"/><rect class="ds-bar s-warning" x="180" y="35" width="36" height="15"/><rect class="ds-bar s-error" x="180" y="27.5" width="36" height="7.5"/></g>
      <g><title>29 Okt: 35 selesai, 2 perlu dicek, 1 ditolak</title><rect class="ds-bar s-success" x="245" y="22.5" width="36" height="87.5"/><rect class="ds-bar s-warning" x="245" y="17.5" width="36" height="5"/><rect class="ds-bar s-error" x="245" y="15" width="36" height="2.5"/></g>
      <g><title>30 Okt: 18 selesai, 5 perlu dicek, 4 ditolak</title><rect class="ds-bar s-success" x="310" y="65" width="36" height="45"/><rect class="ds-bar s-warning" x="310" y="52.5" width="36" height="12.5"/><rect class="ds-bar s-error" x="310" y="42.5" width="36" height="10"/></g>
      <text x="68" y="126" text-anchor="middle">26 Okt</text>
      <text x="133" y="126" text-anchor="middle">27 Okt</text>
      <text x="198" y="126" text-anchor="middle">28 Okt</text>
      <text x="263" y="126" text-anchor="middle">29 Okt</text>
      <text x="328" y="126" text-anchor="middle">30 Okt</text>
    </svg>
    <p class="ds-legend" style="margin-top:0.75rem">
      <span><i style="--ds-tone:var(--color-success)"></i>Selesai 136</span>
      <span><i style="--ds-tone:var(--color-warning)"></i>Perlu dicek 20</span>
      <span><i style="--ds-tone:var(--color-error)"></i>Ditolak 10</span>
    </p>
  </div>
</article>
```

### Varian

| Kelas | Dipakai pada | Warna |
| --- | --- | --- |
| `.ds-grid-line` | `<line>` garis bantu | `base-content` 10%, 1 px |
| `.s-success`, `.s-info`, `.s-error`, `.s-warning` | `<rect>`/`<path>` berisi | Token status |
| `.s-other` | Seri sisa | `base-content` 30% |
| `.s-line` | `<path>` garis utama | Primary, 2.25 px, ujung bulat |
| `.s-area` | `<path>` area di bawah garis | Primary 16% |
| `.s-line-2` | Garis pembanding | Warning, 2 px, putus-putus `4 3` |
| `.ds-bar` | Batang; hover `<g>` menurunkan opasitas ke .8 | |

Teks di dalam `.ds-chart` 10 px, warna `base-content` 62%. `.ds-legend` merangkai `<span><i style="--ds-tone:var(--color-success)"></i>Label</span>`; `i` adalah kotak 10 px yang mengambil warna dari `--ds-tone`.

## Donat {#donat}

`.ds-donut` menata SVG 8.5 rem di kiri dan daftar angka di kanan. Segmen berupa `<circle r="42">` dengan `stroke-width: 14`; panjang segmen diatur `stroke-dasharray="<panjang> <keliling>"` dan awalnya `stroke-dashoffset="-<jumlah panjang sebelumnya>"`. Keliling = 2π × 42 ≈ 263.89. Lingkaran diputar `-90` derajat agar mulai dari atas.

```html preview title="Donat: hasil pengiriman"
<div class="ds-donut">
  <svg viewBox="0 0 120 120" role="img" aria-label="166 pengiriman: 136 selesai, 20 perlu dicek, 10 ditolak">
    <circle class="ds-donut-track" cx="60" cy="60" r="42"/>
    <g transform="rotate(-90 60 60)">
      <circle cx="60" cy="60" r="42" style="stroke:var(--color-success)" stroke-dasharray="216.2 263.9" stroke-dashoffset="0"><title>Selesai 136</title></circle>
      <circle cx="60" cy="60" r="42" style="stroke:var(--color-warning)" stroke-dasharray="31.8 263.9" stroke-dashoffset="-216.2"><title>Perlu dicek 20</title></circle>
      <circle cx="60" cy="60" r="42" style="stroke:var(--color-error)" stroke-dasharray="15.9 263.9" stroke-dashoffset="-248"><title>Ditolak 10</title></circle>
    </g>
    <text class="ds-donut-center" x="60" y="62" text-anchor="middle">166</text>
    <text class="ds-donut-caption" x="60" y="76" text-anchor="middle">pengiriman</text>
  </svg>
  <ul>
    <li><i style="--ds-tone:var(--color-success)"></i><span>Selesai</span><strong>136</strong></li>
    <li><i style="--ds-tone:var(--color-warning)"></i><span>Perlu dicek</span><strong>20</strong></li>
    <li><i style="--ds-tone:var(--color-error)"></i><span>Ditolak</span><strong>10</strong></li>
  </ul>
</div>
```

### Razor

DS v1 belum punya helper C# untuk grafik. Referensinya `Helpers/Charts.cs` di TPS: `StackedBars` (viewBox 720 × 220), `Donut` (r = 42, stroke 14), dan `Line` dengan area. Sampai ada helper di DS, tulis SVG di partial aplikasi. Contoh donat dari daftar `(Label, Value, Tone)`:

```cshtml
@using System.Globalization
@model IReadOnlyList<(string Label, int Value, string Tone)>
@{
    const double c = 2 * Math.PI * 42;
    var total = Model.Sum(s => s.Value);
    var used = 0.0;
    string F(double v) => v.ToString("0.##", CultureInfo.InvariantCulture);
}
<div class="ds-donut">
    <svg viewBox="0 0 120 120" role="img" aria-label="@total pengiriman: @string.Join(", ", Model.Select(s => $"{s.Value} {s.Label.ToLowerInvariant()}"))">
        <circle class="ds-donut-track" cx="60" cy="60" r="42" />
        <g transform="rotate(-90 60 60)">
            @foreach (var s in Model.Where(s => s.Value > 0))
            {
                var len = c * s.Value / total;
                <circle cx="60" cy="60" r="42" style="stroke:var(--color-@s.Tone)" stroke-dasharray="@F(len) @F(c)" stroke-dashoffset="@F(-used)"><title>@s.Label @s.Value</title></circle>
                used += len;
            }
        </g>
        <text class="ds-donut-center" x="60" y="62" text-anchor="middle">@total</text>
        <text class="ds-donut-caption" x="60" y="76" text-anchor="middle">pengiriman</text>
    </svg>
    <ul>
        @foreach (var s in Model)
        {
            <li><i style="--ds-tone:var(--color-@s.Tone)"></i><span>@s.Label</span><strong>@s.Value</strong></li>
        }
    </ul>
</div>
```

> [!WARNING]
> Format angka SVG dengan `CultureInfo.InvariantCulture`. Kultur `id-ID` menulis koma desimal dan merusak atribut `stroke-dasharray`.

**Asal TPS.** `.pt-chart`/`.pt-donut`/`.pt-legend` L3605–3630; `Helpers/Charts.cs`.

## Umpan aktivitas {#feed}

Satu baris per kejadian: titik bertone, apa yang terjadi, konteksnya, kapan. Pakai di kartu dengan `.ds-card-body.is-flush`; `.ds-feed` sudah memberi padding sendiri per baris (`--ds-space-card-x`) dan garis pemisah.

```html preview title="Aktivitas terbaru"
<article class="ds-card">
  <header class="ds-card-head"><h2>Aktivitas terbaru</h2></header>
  <div class="ds-card-body is-flush">
    <ul class="ds-feed">
      <li>
        <span class="ds-feed-dot is-success"></span>
        <div><p class="ds-feed-title">BL-2026-00841 selesai di Bea Cukai</p><p class="ds-feed-sub">MT Sinar Jaya · 992.5 TNE</p></div>
        <time class="ds-feed-time">14.30 WIB</time>
      </li>
      <li>
        <span class="ds-feed-dot is-error"></span>
        <div><p class="ds-feed-title">Pengiriman ditolak: gudang tujuan tidak sesuai</p><p class="ds-feed-sub">PT Akr Corporindo · kode 007</p></div>
        <time class="ds-feed-time">13.05 WIB</time>
      </li>
    </ul>
  </div>
</article>
```

Judul (14 px, tebal 600) harus bisa dibaca tanpa titik: kata "selesai" atau "ditolak" membawa maknanya. `.ds-feed-time` tidak pernah membungkus (`white-space: nowrap`).

**Asal TPS.** `.pt-feed` L3596–3603.

## Avatar {#avatar}

Inisial putih di atas satu dari delapan warna (`.c0`–`.c7`). Warna dipilih oleh hash yang stabil: jumlah kode karakter nama modulo 8, sehingga "PT Akr Corporindo" selalu `c1` di semua halaman dan ekspor. Bentuk bawaan kotak membulat; `.is-round` untuk orang (akun, pengguna).

```html preview title="Avatar organisasi dan orang"
<div class="ds-actions is-start">
  <span class="ds-avatar c1" aria-hidden="true">PA</span>
  <span class="ds-avatar c3" aria-hidden="true">MS</span>
  <span class="ds-avatar c3 is-round" aria-hidden="true">BS</span>
  <span class="ds-avatar c6 is-round" aria-hidden="true">CM</span>
</div>
```

### Razor

```cshtml
@using Citia.DesignSystem.Ui
<div class="ds-cell-main">
    <span class="ds-avatar @Avatar.ColorClass(row.Name)" aria-hidden="true">@Avatar.Initials(row.Name)</span>
    <div>
        <div class="ds-cell-title"><a asp-action="Detail" asp-route-id="@row.Id">@row.Name</a></div>
        <div class="ds-cell-sub">@row.Npwp</div>
    </div>
</div>
```

`Avatar.Initials("PT Akr Corporindo")` menghasilkan `PA` (huruf pertama dua kata pertama; satu kata menghasilkan dua huruf pertama; kosong menghasilkan `?`). `Avatar.ColorClass(name)` menghasilkan `c0`–`c7`.

Avatar selalu didampingi nama di teks, jadi `aria-hidden="true"`. Teks putih di atas kedelapan latar memenuhi 4.5:1 (terendah `c0`, 4.52:1).

**Token.** `--ds-size-avatar`, `--ds-avatar`.

**Asal TPS.** `.pt-avatar` L3552–3559; `Helpers/PortalUi.cs`.
