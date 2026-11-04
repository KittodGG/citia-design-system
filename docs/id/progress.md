---
title: Progress
group: components
category: feedback
order: 30
summary: Indikator progres linear dan melingkar (determinate, indeterminate, buffer), langkah bersegmen, tone, ukuran, dan meter untuk nilai dalam rentang yang diketahui.
source: TPS app.css L3584–3634
---

Pakai progress untuk menunjukkan sejauh mana sebuah tugas berjalan: unggahan, impor, penyiapan beberapa langkah. Pakai bentuk determinate saat pecahannya diketahui, bentuk indeterminate saat tidak, dan tampilkan angkanya sebagai teks di sampingnya. Untuk besaran dalam rentang yang diketahui yang bukan tugas (disk terpakai, skor) pakai bentuk meter. Untuk penantian tanpa ujung yang jelas dan tanpa tata letak yang diisi pakai [spinner](./spinner.md); untuk konten yang akan muncul pakai [skeleton](./skeleton.md); untuk tahap bernomor pakai [stepper](./stepper.md).

## Contoh

### Linear

Bar bergeser mengikuti `--ds-value` (0 sampai 100). Label dan nilai berada di atasnya dalam baris `.ds-meter`; nilainya berupa teks, jadi bar tidak perlu membawa angka sendirian.

```html preview title="Determinate, dengan label dan nilai"
<div style="display:grid;gap:1.25rem;max-width:26rem">
  <div class="ds-meter">
    <div class="ds-meter-row"><span id="pg-import">Mengimpor kontak</span><span>62%</span></div>
    <div class="ds-progress" role="progressbar" aria-labelledby="pg-import" aria-valuemin="0" aria-valuemax="100" aria-valuenow="62" aria-valuetext="62%" style="--ds-value:62"><span class="ds-progress__bar"></span></div>
  </div>
  <div class="ds-meter">
    <div class="ds-meter-row"><span id="pg-upload">Mengunggah INV-2026-0418.pdf</span><span>3,2 dari 4,0 MB</span></div>
    <div class="ds-progress is-success" role="progressbar" aria-labelledby="pg-upload" aria-valuemin="0" aria-valuemax="4" aria-valuenow="3.2" aria-valuetext="3,2 dari 4,0 MB" style="--ds-value:80"><span class="ds-progress__bar"></span></div>
  </div>
</div>
```

### Sizes and tones

Tinggi 4px (`is-sm`), 6px (bawaan), dan 10px (`is-lg`). Tone mengikuti pembawa tone bersama: `is-success`, `is-warning`, `is-error`, `is-info`, `is-primary`, `is-neutral`. Tone mendukung kata-kata ("Gagal di 41%"), bukan menggantikannya.

```html preview title="Ukuran dan tone"
<div style="display:grid;gap:1rem;max-width:26rem">
  <div class="ds-progress is-sm" role="progressbar" aria-label="Kecil" aria-valuemin="0" aria-valuemax="100" aria-valuenow="30" style="--ds-value:30"><span class="ds-progress__bar"></span></div>
  <div class="ds-progress" role="progressbar" aria-label="Bawaan" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" style="--ds-value:50"><span class="ds-progress__bar"></span></div>
  <div class="ds-progress is-lg" role="progressbar" aria-label="Besar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70" style="--ds-value:70"><span class="ds-progress__bar"></span></div>
  <div class="ds-progress is-success" role="progressbar" aria-label="Berhasil" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" style="--ds-value:100"><span class="ds-progress__bar"></span></div>
  <div class="ds-progress is-warning" role="progressbar" aria-label="Peringatan" aria-valuemin="0" aria-valuemax="100" aria-valuenow="85" style="--ds-value:85"><span class="ds-progress__bar"></span></div>
  <div class="ds-progress is-error" role="progressbar" aria-label="Galat" aria-valuemin="0" aria-valuemax="100" aria-valuenow="41" style="--ds-value:41"><span class="ds-progress__bar"></span></div>
</div>
```

### Indeterminate and buffer

Tanpa `aria-valuenow` bar bersifat indeterminate: satu segmen bergerak di sepanjang track (`--ds-duration-shimmer`). Lapisan buffer (`.ds-progress__buffer`, `--ds-buffer`) menunjukkan apa yang sudah siap di depan apa yang sudah selesai, untuk streaming dan unggahan bertahap.

```html preview title="Indeterminate dan buffer"
<div style="display:grid;gap:1.25rem;max-width:26rem">
  <div class="ds-meter">
    <div class="ds-meter-row"><span id="pg-wait">Menyiapkan laporan</span><span>Sedang diproses…</span></div>
    <div class="ds-progress is-indeterminate" role="progressbar" aria-labelledby="pg-wait" aria-valuetext="Sedang diproses…"><span class="ds-progress__bar"></span></div>
  </div>
  <div class="ds-meter">
    <div class="ds-meter-row"><span id="pg-buffer">Memutar rekaman</span><span>35% diputar, 70% termuat</span></div>
    <div class="ds-progress" role="progressbar" aria-labelledby="pg-buffer" aria-valuemin="0" aria-valuemax="100" aria-valuenow="35" aria-valuetext="35% diputar, 70% termuat" style="--ds-value:35;--ds-buffer:70"><span class="ds-progress__buffer"></span><span class="ds-progress__bar"></span></div>
  </div>
</div>
```

### Circular

Pakai cincin bila bar tidak muat: sudut kartu, tombol, toolbar. `is-sm` (20px) tanpa label, bawaannya 48px, `is-lg` 80px, dan `is-xl` 112px. Cincin indeterminate berputar sekali tiap 1,4 detik.

```html preview title="Melingkar, determinate dan indeterminate"
<div style="display:flex;flex-wrap:wrap;align-items:center;gap:1.5rem">
  <div class="ds-progress-circle is-sm" role="progressbar" aria-label="Sinkronisasi" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40" style="--ds-value:40"><svg viewBox="0 0 36 36" aria-hidden="true" focusable="false"><circle class="ds-progress-circle__track" cx="18" cy="18" r="15.9155" pathLength="100"/><circle class="ds-progress-circle__bar" cx="18" cy="18" r="15.9155" pathLength="100"/></svg></div>
  <div class="ds-progress-circle" role="progressbar" aria-label="Unggahan" aria-valuemin="0" aria-valuemax="100" aria-valuenow="72" style="--ds-value:72"><svg viewBox="0 0 36 36" aria-hidden="true" focusable="false"><circle class="ds-progress-circle__track" cx="18" cy="18" r="15.9155" pathLength="100"/><circle class="ds-progress-circle__bar" cx="18" cy="18" r="15.9155" pathLength="100"/></svg><span class="ds-progress-circle__label">72%</span></div>
  <div class="ds-progress-circle is-lg is-success" role="progressbar" aria-label="Kuota penyimpanan terpakai" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" style="--ds-value:100"><svg viewBox="0 0 36 36" aria-hidden="true" focusable="false"><circle class="ds-progress-circle__track" cx="18" cy="18" r="15.9155" pathLength="100"/><circle class="ds-progress-circle__bar" cx="18" cy="18" r="15.9155" pathLength="100"/></svg><span class="ds-progress-circle__label">100%</span></div>
  <div class="ds-progress-circle is-lg is-indeterminate" role="progressbar" aria-label="Memuat" aria-valuetext="Sedang diproses…"><svg viewBox="0 0 36 36" aria-hidden="true" focusable="false"><circle class="ds-progress-circle__track" cx="18" cy="18" r="15.9155" pathLength="100"/><circle class="ds-progress-circle__bar" cx="18" cy="18" r="15.9155" pathLength="100"/></svg></div>
</div>
```

### Segmented steps

Satu sel per langkah; sel yang selesai terisi penuh, yang sedang berjalan setengah tone. Pakai untuk urutan tetap yang pendek (penyiapan, onboarding) dengan nama langkah ditulis di sampingnya.

```html preview title="Bersegmen, 3 dari 5 selesai"
<div style="max-width:26rem">
  <div class="ds-meter-row" style="margin-bottom:.375rem"><span id="pg-steps">Penyiapan akun</span><span>3 dari 5 langkah selesai</span></div>
  <div class="ds-progress-steps" role="progressbar" aria-labelledby="pg-steps" aria-valuemin="0" aria-valuemax="5" aria-valuenow="3" aria-valuetext="3 dari 5 langkah selesai"><span class="is-done"></span><span class="is-done"></span><span class="is-done"></span><span aria-current="step"></span><span></span></div>
</div>
```

### Meter

Meter menunjukkan pengukuran dalam rentang yang diketahui, seperti penyimpanan terpakai. Pakai `role="meter"` pada bar yang sama. Pilih tone dari ambang batas dan jelaskan arti angkanya di baris atau teks bantuan.

```html preview title="Meter dengan ambang batas"
<div style="display:grid;gap:1.25rem;max-width:26rem">
  <div class="ds-meter">
    <div class="ds-meter-row"><span id="mt-a">Penyimpanan terpakai</span><span>38 dari 100 GB</span></div>
    <div class="ds-progress" role="meter" aria-labelledby="mt-a" aria-valuemin="0" aria-valuemax="100" aria-valuenow="38" aria-valuetext="38 dari 100 GB" style="--ds-value:38"><span class="ds-progress__bar"></span></div>
  </div>
  <div class="ds-meter">
    <div class="ds-meter-row"><span id="mt-b">Kursi terpakai</span><span>47 dari 50</span></div>
    <div class="ds-progress is-warning" role="meter" aria-labelledby="mt-b" aria-valuemin="0" aria-valuemax="50" aria-valuenow="47" aria-valuetext="47 dari 50 kursi" style="--ds-value:94"><span class="ds-progress__bar"></span></div>
    <p class="ds-meter-help">Hampir penuh: tambah kursi sebelum penagihan berikutnya.</p>
  </div>
</div>
```

### Outcome bar and share bar

Bar versi 1 tetap ada: `.ds-activity-bar` menumpuk hasil yang berjumlah 100%, `.ds-share` adalah garis 4px di bawah sebuah angka. Keduanya hiasan dan `aria-hidden`; angka di sebelahnya berupa teks.

```html preview title="Activity bar dan share"
<div style="display:grid;gap:1rem;max-width:26rem">
  <div class="ds-meter">
    <div class="ds-meter-row"><span>Pembayaran minggu ini</span><span>34 lunas · 3 menunggu · 2 gagal</span></div>
    <div class="ds-activity-bar" aria-hidden="true"><span class="is-success" style="width:87%"></span><span class="is-warning" style="width:8%"></span><span class="is-error" style="width:5%"></span></div>
  </div>
  <div><p style="margin:0 0 .375rem">Sisa anggaran: 42%</p><span class="ds-share" aria-hidden="true"><span style="width:42%"></span></span></div>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Determinate | `aria-valuenow` dan `--ds-value` | Bar bergeser ke nilai; perubahan memegas selama `--ds-duration-spring` (500ms) dari posisi saat itu |
| Indeterminate | Tanpa `aria-valuenow`, class `is-indeterminate` | Segmen 40% bergerak tiap `--ds-duration-shimmer` (1,6 dtk); cincin berputar sekali tiap 1,4 dtk |
| Buffer | `--ds-buffer` dan `.ds-progress__buffer` | Lapisan lebih terang (tone 26%) di belakang bar |
| Selesai | Nilai mencapai maksimum | Bar penuh; ganti tone ke `is-success` dan label menjadi "Selesai" |
| Galat | Tugas gagal | Tone `is-error`, bar tetap di nilai terakhir, label menyebut apa yang gagal |
| Teks diperbarui | Teks nilai berubah | Teks baris diperbarui; bar beranimasi; tidak ada yang lain |
| Disabled / read-only | Tidak berlaku | Progress adalah keluaran, bukan masukan: tidak pernah bisa difokus |
| Reduced motion | `prefers-reduced-motion: reduce` | Perubahan nilai melompat (hanya warna); bar indeterminate menjadi isian statis 45% dan cincin menjadi cincin statis 40%; label teks membawa "Sedang diproses…" |
| Forced colours | `forced-colors: active` | Track diberi garis `CanvasText`, isian `Highlight`, buffer `GrayText` |
| Dark | `data-theme="dark"` | Track `base-content` 9%, isian primary yang lebih terang |
| RTL | `dir="rtl"` | Bar terisi dari kanan; indeterminate bergerak kanan ke kiri |

## Anatomi

- `.ds-progress`: track (`is-sm`, `is-lg`, tone, `is-indeterminate`); `role="progressbar"` atau `role="meter"`.
- `.ds-progress__bar`, `.ds-progress__buffer`: isian, diposisikan oleh `--ds-value` dan `--ds-buffer`.
- `.ds-progress-steps`: bar bersegmen; anak `.is-done`, `[aria-current="step"]`.
- `.ds-progress-circle` dengan `svg`, `.ds-progress-circle__track`, `.ds-progress-circle__bar`, `.ds-progress-circle__label` (`is-sm`, `is-lg`, `is-xl`).
- `.ds-meter`, `.ds-meter-row`, `.ds-meter-help`: baris label dan nilai di atas, teks bantuan di bawah.
- `.ds-activity-bar`, `.ds-share`: bar proporsi versi 1.

## Penggunaan

- Tulis nilai sebagai teks: "62%", "3,2 dari 4,0 MB". Ratakan kanan di dalam baris (angka tabular).
- Tampilkan progres untuk penantian lebih dari 1 detik; di bawah itu jangan tampilkan apa pun. Tampilkan bar indeterminate hanya bila tidak bisa memperkirakan; beralih ke determinate begitu bisa.
- Jangan biarkan nilai mundur kecuali tugas dimulai ulang; katakan begitu ("Mencoba lagi, 0%").
- Satu bar progress per tugas. Jangan menumpuk beberapa bar untuk satu proses.
- Pakai `is-success` hanya bila tugas selesai; jangan menghijaukan bar selagi berjalan.
- Taruh label di atas bar, bukan di dalamnya; tinggi bar 4 sampai 10px dan tidak muat teks.
- Pakai bentuk melingkar pada 20px atau 48px ke atas; cincin 24 sampai 36px sulit dibaca.
- Untuk tombol yang sedang sibuk, pakai [spinner](./spinner.md) di dalam tombol, bukan bar progress.

## Aksesibilitas

- `role="progressbar"` dengan `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, dan nama (`aria-labelledby` ke label yang terlihat, atau `aria-label`). Tambahkan `aria-valuetext` bila angka saja kurang jelas ("3,2 dari 4,0 MB").
- Indeterminate: hilangkan `aria-valuenow`; pertahankan nama. Tambahkan `aria-valuetext="Sedang diproses…"` bila ingin dibacakan.
- Pakai `role="meter"` untuk pengukuran, bukan untuk progres tugas.
- Jangan mengumumkan setiap persen: pembaca layar membaca nilainya saat pengguna mencapai bar. Untuk tugas panjang tambahkan satu pesan `role="status"` sopan pada tonggak ("Impor selesai 50%"), paling banyak satu tiap 10 detik, dan satu di akhir.
- Isian setidaknya 3:1 terhadap track di kedua tema (kontras non-teks). Tone didukung oleh teks label.
- Bar hiasan (`.ds-activity-bar`, `.ds-share`) bersifat `aria-hidden="true"`.
- Gerak: bar bergerak hanya dengan `transform`, loop indeterminate adalah salah satu animasi tak berujung yang diizinkan, dan berhenti saat reduced motion.
- Progress tidak interaktif: tanpa fokus, tanpa tombol.

## Razor

```cshtml
<ds-progress value="62" label="Mengimpor kontak" visible-label show-value />
<ds-progress value="3" steps="5" label="Penyiapan akun" tone="Primary" />
<ds-progress label="Menyiapkan laporan" />                      @* indeterminate *@
<ds-progress value="35" buffer="70" label="Memutar rekaman" />
<ds-progress value="72" circular show-value size="lg" label="Unggahan" />
```

| Atribut | Efek |
| --- | --- |
| `value`, `max` | Nilai saat ini dan maksimum (bawaan 100). Tanpa `value` = indeterminate |
| `label` | Nama aksesibel (bawaan "Kemajuan", diterjemahkan); `visible-label` juga mencetaknya |
| `show-value` | Mencetak persentase di kanan (di dalam cincin bila `circular`) |
| `value-text` | `aria-valuetext` sebagai pengganti persentase |
| `buffer` | Nilai lapisan buffer |
| `steps` | Bar bersegmen; `value` adalah jumlah langkah yang selesai |
| `circular` | Cincin; `size` adalah `sm`, `lg`, `xl` |
| `tone` | `Primary` (bawaan), `Success`, `Warning`, `Error`, `Info`, `Neutral` |
| `size` | `sm`, `lg` untuk bar |

## Token

`--ds-value`, `--ds-buffer`, `--ds-tone`, `--color-primary`, `--color-base-content` (track 9%), `--ds-radius-full`, `--ds-duration-spring`, `--ds-ease-spring`, `--ds-duration-shimmer`, `--ds-duration-fast`, `--ds-subtle`, `--ds-type-caption-size`, `--ds-weight-bold`.

## Native dan daisyUI

Bar DS adalah `div` dengan `role="progressbar"` karena tone, lapisan buffer, label, dan transform geser butuh markup yang tidak dapat distyling pseudo-element `<progress>` native secara sama di setiap browser. Class `progress` daisyUI pada `<progress>` native dan `radial-progress` tetap berfungsi bila Anda lebih suka; style DS tidak menyentuhnya. Markup versi 1 (`<span style="width:N%">` di dalam `.ds-progress`) tetap tampil.
