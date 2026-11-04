---
title: Status
group: components
category: data-display
order: 3
summary: Pill dan status rekaman dengan titik dan kata dalam lima tone, outline, denyut live, dan tiga ukuran. Kata membawa makna, warna hanya mendukung.
source: TPS app.css .pt-pill L3561–3577, .master-status L1560–1577, .portal-badge L3376–3414
---

Status memberi tahu orang dalam keadaan apa sesuatu berada. Kata di layar membawa makna; titik dan tint hanya mendukung (WCAG 1.4.1). Pakai `ds-pill` untuk keadaan alur kerja yang berubah (Menunggu, Dikirim) dan `ds-status` untuk keadaan rekaman (Aktif, Terkunci). Untuk kategori dan paket pakai [tag](./tag.md); untuk hitungan pakai [badge](./badge.md).

## Contoh

```html preview title="Tone pill"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <span class="ds-pill is-neutral">Draf</span>
  <span class="ds-pill is-info">Ditinjau</span>
  <span class="ds-pill is-success">Lunas</span>
  <span class="ds-pill is-warning">Jatuh tempo</span>
  <span class="ds-pill is-error">Ditolak</span>
  <span class="ds-pill is-primary">Dipilih</span>
</div>
```

```html preview title="Outline, polos, live, dan ukuran"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <span class="ds-pill is-info is-outline">Terjadwal 12 Nov 2026</span>
  <span class="ds-pill is-neutral is-outline">Dibatalkan</span>
  <span class="ds-pill is-neutral is-plain">Belum dikirim</span>
  <span class="ds-pill is-success is-live">Tayang</span>
  <span class="ds-pill is-warning is-sm">Kecil</span>
  <span class="ds-pill is-warning">Sedang</span>
  <span class="ds-pill is-warning is-lg">Besar</span>
</div>
```

```html preview title="Status rekaman"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <span class="ds-status is-success has-dot">Aktif</span>
  <span class="ds-status is-neutral has-dot">Nonaktif</span>
  <span class="ds-status is-warning has-dot">Terkunci setelah 5 percobaan</span>
  <span class="ds-status is-error has-dot">Ditangguhkan</span>
  <span class="ds-status is-info has-dot is-outline">Disiapkan</span>
  <span class="ds-status is-success has-dot is-live">Menyinkronkan</span>
  <span class="ds-status is-success is-sm">Kecil</span>
  <span class="ds-status is-success is-lg">Besar</span>
</div>
```

```html preview title="Titik live dan live badge"
<div style="display:flex;gap:1.25rem;flex-wrap:wrap;align-items:center">
  <span style="display:inline-flex;gap:.5rem;align-items:center"><span class="ds-live-dot" aria-hidden="true"></span> Menerima data</span>
  <span style="display:inline-flex;gap:.5rem;align-items:center"><span class="ds-live-dot is-lg is-warning" aria-hidden="true"></span> Menyambung ulang</span>
  <span class="ds-live-badge"><span class="ds-live-dot" aria-hidden="true"></span> Live</span>
</div>
```

## State

```html preview title="Pill sebagai link filter, dan nonaktif"
<div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
  <a class="ds-pill is-success" href="#lunas">Lunas</a>
  <button type="button" class="ds-pill is-warning">Jatuh tempo</button>
  <button type="button" class="ds-pill is-error" disabled>Ditolak</button>
  <span class="ds-pill is-info" style="max-inline-size:9rem"><span class="ds-pill__label" style="overflow:hidden;text-overflow:ellipsis">Menunggu konfirmasi bank</span></span>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Tint tone 10%, garis tone 25%, teks tone, titik |
| Hover | Pointer di atas pill link atau button | Tint naik ke 16% |
| Focus-visible | Fokus keyboard pada pill link atau button | Cincin `--ds-focus` 2px, offset 2px |
| Pressed | `:active` | Tint naik ke 18% |
| Disabled | `disabled` atau `aria-disabled="true"` | `--ds-opacity-disabled`, `cursor: not-allowed` |
| Live | `.is-live` | Titik berkedip setiap 1,2 dtk; `.ds-live-dot` juga berdenyut setiap 1,6 dtk |
| Reduced motion | `prefers-reduced-motion` | Titik diam; kata tetap membawa makna |
| Overflow | Teks panjang di sel sempit | `.ds-pill__label` dipotong dengan elipsis; taruh teks penuh di `title` |
| Forced colours | `forced-colors: active` | Garis dan titik berwarna sistem |

Pill atau status biasa tidak interaktif. Tambahkan link atau button hanya bila ia memfilter atau membuka rincian.

## Anatomi

- `.ds-pill`: titik (`::before`) dan kata. Modifier: `is-success|warning|error|info|primary|neutral`, `is-outline`, `is-plain`, `is-live`, `is-sm|lg`, `is-truncate`.
- `.ds-status`: label tonal bersudut kecil. Modifier: tone yang sama, `has-dot`, `is-outline`, `is-live`, `is-sm|lg`. `is-active`, `is-inactive`, `is-locked`, `is-provisioning` versi 1 tetap berfungsi.
- `.ds-live-dot` dengan `is-sm|lg`; `.ds-live-badge`; `.ds-usage` keterangan di bawah status.

## Penggunaan

- Tulis keadaan sebagai kata (Lunas, Jatuh tempo), 1 sampai 3 kata. Taruh alasan di halaman detail.
- Pakai satu pemetaan enum ke `(label, tone)` di satu tempat dan pakai ulang di daftar, detail, dan filter.
- Pakai paling banyak 5 tone; warning berarti "periksa ini", error berarti "gagal atau ditolak".
- Pakai `is-live` hanya untuk yang sedang berlangsung, dan pertahankan katanya ("Tayang").
- Jangan pakai status sebagai label tombol atau untuk menampilkan hitungan.

## Aksesibilitas

- Kata yang terlihat adalah statusnya. Jangan menambah `aria-label` yang menyebutnya berbeda.
- Warna teks memakai token tone yang aman AA (`--ds-tone-text`): 4,5:1 atau lebih pada tint di tema terang dan gelap.
- Titik tanpa teks memerlukan label tersembunyi.
- `.ds-live-dot` bersifat dekoratif (`aria-hidden="true"`); sebut "Tayang" dalam teks. Umumkan perubahan di live region Anda sendiri bila penting.
- Gerak: hanya titik live yang berulang, dan berhenti saat `prefers-reduced-motion`.

## Razor

```cshtml
@{
    var (label, tone) = Model.Status switch
    {
        InvoiceStatus.Paid => ("Lunas", Tone.Success),
        InvoiceStatus.Overdue => ("Jatuh tempo", Tone.Warning),
        InvoiceStatus.Rejected => ("Ditolak", Tone.Error),
        _ => ("Draf", Tone.Neutral),
    };
}
<ds-pill tone="@tone">@label</ds-pill>
<ds-pill tone="Success" live>Tayang</ds-pill>
<ds-status tone="Success">Aktif</ds-status>
<ds-status tone="Warning" outline size="sm">Terkunci</ds-status>
```

## Token

`--ds-tone`, `--ds-tone-text`, `--ds-tone-content`, `--color-success|warning|error|info`, `--ds-link`, `--ds-quiet`, `--ds-radius-full`, `--ds-radius-sm`, `--ds-opacity-disabled`, `--ds-focus`.

## Native dan daisyUI

`span` biasa. Ia menggantikan daisyUI `badge-soft` untuk status. Class tone (`is-success`…) dipakai bersama oleh tag, badge, stat, alert, dan progress lewat `--ds-tone`.
