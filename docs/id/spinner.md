---
title: Spinner
group: components
category: feedback
order: 32
summary: Cincin berputar kecil untuk penantian singkat yang lamanya tidak diketahui, dengan ukuran, tone, label yang terlihat, jeda kemunculan 300 ms, dan overlay region sibuk.
source: TPS app.css ds-spin, .ds-spinner
---

Pakai spinner untuk penantian yang singkat atau tidak diketahui lamanya dan bentuknya: tombol yang sedang menyimpan, panel yang sedang menyegarkan, pencarian yang berjalan. Jika bentuk hasilnya diketahui pakai [skeleton](./skeleton.md); jika Anda bisa menyebut sudah sejauh mana tugasnya pakai [progress](./progress.md). Spinner tidak pernah sendirian: ia disertai label yang terlihat, karena ia berhenti berputar (dan disembunyikan) saat reduced motion.

## Contoh

### Sizes

`is-xs` (0,75em), `is-sm` (0,875em), bawaan (1em, mengikuti teks), `is-lg` (24px), dan `is-xl` (40px). Cincin memakai warna teks. Garis 2px, 3px mulai `is-xl`.

```html preview title="Ukuran"
<div style="display:flex;align-items:center;gap:1.25rem">
  <span class="ds-spinner is-xs" aria-hidden="true"></span>
  <span class="ds-spinner is-sm" aria-hidden="true"></span>
  <span class="ds-spinner" aria-hidden="true"></span>
  <span class="ds-spinner is-lg" aria-hidden="true"></span>
  <span class="ds-spinner is-xl" aria-hidden="true"></span>
</div>
```

### Tones

Tone mengikuti pembawa bersama: netral (warna teks, bawaan), `is-primary`, `is-success`, `is-warning`, `is-error`, `is-info`. Tone jarang dibutuhkan; pakai saat cincin berada di atas permukaan berwarna.

```html preview title="Tone"
<div style="display:flex;align-items:center;gap:1.25rem">
  <span class="ds-spinner is-lg" aria-hidden="true"></span>
  <span class="ds-spinner is-lg is-primary" aria-hidden="true"></span>
  <span class="ds-spinner is-lg is-success" aria-hidden="true"></span>
  <span class="ds-spinner is-lg is-warning" aria-hidden="true"></span>
  <span class="ds-spinner is-lg is-error" aria-hidden="true"></span>
  <span class="ds-spinner is-lg is-info" aria-hidden="true"></span>
</div>
```

### With a label

`.ds-loading` memasangkan cincin dengan label di dalam `role="status"`. Label adalah state saat cincin disembunyikan oleh reduced motion. `is-block` memusatkannya di wadah dengan padding yang lega.

```html preview title="Sebaris dan blok"
<div style="display:grid;gap:1.5rem">
  <span class="ds-loading" role="status"><span class="ds-spinner" aria-hidden="true"></span><span class="ds-loading__label">Memuat faktur…</span></span>
  <div style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box)">
    <div class="ds-loading is-block" role="status"><span class="ds-spinner is-lg is-primary" aria-hidden="true"></span><span class="ds-loading__label">Menyiapkan laporan Anda. Ini bisa memakan waktu sampai satu menit.</span></div>
  </div>
</div>
```

### In a button

Tombol yang sibuk mempertahankan lebarnya, menampilkan cincin sebelum label, dan memblokir interaksi. Label boleh berubah ("Menyimpan…") tetapi harus tetap terbaca. Lihat [button](./button.md) untuk pola lengkapnya.

```html preview title="Tombol sibuk"
<div style="display:flex;gap:.75rem;flex-wrap:wrap">
  <button type="button" class="btn btn-primary" aria-busy="true" aria-disabled="true"><span class="ds-spinner is-sm" aria-hidden="true"></span> Menyimpan…</button>
  <button type="button" class="btn" aria-busy="true" aria-disabled="true"><span class="ds-spinner is-sm" aria-hidden="true"></span> Mengekspor</button>
</div>
```

### Delayed

`ds-delayed` menyembunyikan elemen selama 300 ms, lalu memudarkannya masuk dalam 160ms. Penantian yang lebih singkat tidak menampilkan apa pun, yang terasa lebih cepat daripada kedipan cincin. Timpa dengan `--ds-delay`.

```html preview title="Muncul setelah 300 ms"
<span class="ds-loading ds-delayed" role="status"><span class="ds-spinner" aria-hidden="true"></span><span class="ds-loading__label">Mencari…</span></span>
```

### Busy region

Tandai region `aria-busy="true"` pada induk `.ds-busy` dan tambahkan `.ds-loading-overlay`. Overlay muncul setelah 300 ms, meredupkan konten dengan permukaan 72%, dan memblokir klik selama region sibuk; ia hilang saat Anda menghapus `aria-busy`.

```html preview title="Overlay pada region sibuk"
<div class="ds-busy" aria-busy="true" style="padding:1rem;min-height:9rem;border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box)">
  <p style="margin:0 0 .5rem"><strong>Faktur</strong></p>
  <p style="margin:0">INV-2026-0418 · Daniel Okafor · 4.250,00</p>
  <p style="margin:0">INV-2026-0419 · Sofia Marquez · 1.180,50</p>
  <div class="ds-loading-overlay"><span class="ds-loading" role="status"><span class="ds-spinner is-lg is-primary" aria-hidden="true"></span><span class="ds-loading__label">Menyegarkan…</span></span></div>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Berputar | Selama terpasang | Cincin berputar sekali tiap 0,7 dtk, linear, tak berujung (`ds-spin`) |
| Delayed | `ds-delayed` atau overlay sibuk | Tak terlihat selama 300 ms, lalu pudar masuk 160ms |
| Berlabel | `.ds-loading` | Cincin plus label, `--ds-subtle`, 14px |
| Tombol sibuk | `aria-busy="true"` pada tombol | Cincin sebelum label, lebar tak berubah, tanpa respons hover atau tekan |
| Region sibuk | `.ds-busy[aria-busy="true"]` | Overlay permukaan 72%, interaksi diblokir |
| Selesai | `aria-busy` dihapus, spinner dihapus | Konten tampil; umumkan hasilnya bila tidak jelas |
| Reduced motion | `prefers-reduced-motion: reduce` | Cincin disembunyikan (cincin yang membeku setengah terlihat rusak); label teks tetap dan membawa state |
| Forced colours | `forced-colors: active` | Cincin memakai `currentColor` (`CanvasText`) |
| Dark | `data-theme="dark"` | Cincin mengikuti warna teks; track 22% |
| Disabled / fokus / hover | Tidak berlaku | Spinner adalah keluaran dan tidak pernah interaktif |

## Anatomi

- `.ds-spinner`: cincinnya (`is-xs`, `is-sm`, `is-lg`, `is-xl`, tone). `aria-hidden="true"`.
- `.ds-loading`: cincin plus label dalam `role="status"` (`is-block` untuk memusatkan). `.ds-loading__label` adalah teksnya.
- `.ds-delayed`: utilitas, jeda 300 ms lalu pudar masuk.
- `.ds-busy` dan `.ds-loading-overlay`: sebuah region dan scrim-nya, aktif selama `aria-busy="true"`.

## Penggunaan

- Selalu tulis label ("Menyimpan…", "Mencari…"). Akhiri dengan elipsis; katakan apa yang sedang terjadi, bukan "Mohon tunggu".
- Pakai untuk penantian sekitar 1 sampai 10 detik. Di atas 10 detik, tampilkan [progress](./progress.md) atau pesan dengan perkiraan.
- Pakai jeda 300 ms untuk segala sesuatu yang mungkin selesai cepat.
- Satu spinner per region. Jangan taruh satu di setiap baris daftar; pakai [skeleton](./skeleton.md) atau satu overlay.
- Di dalam tombol pakai `is-sm` (0,875em) dan pertahankan lebar tombol.
- Untuk penantian satu halaman pakai `is-block` dengan `is-lg` atau `is-xl`, jangan pernah overlay layar penuh lebih dari 2 detik.
- Jangan pakai sebagai hiasan atau untuk state yang tidak berubah.

## Aksesibilitas

- Cincin bersifat `aria-hidden="true"`; namanya adalah label. Bungkus keduanya dalam `role="status"` (live region sopan) agar pesan diumumkan sekali saat muncul.
- Pada region sibuk atur `aria-busy="true"`, lalu hapus saat selesai. Tombol sibuk juga mendapat `aria-busy` dan tetap dalam urutan tab dengan `aria-disabled="true"`, sehingga fokus tidak hilang.
- Reduced motion: aturan global menyembunyikan `.ds-spinner`, jadi label wajib. Karena itu cincin saja tidak pernah menjadi state loading yang valid.
- Cincin memiliki kontras 3:1 terhadap permukaan (memakai warna teks); label 4,5:1.
- Spinner tidak interaktif: tanpa fokus, tanpa tombol.
- Jangan mengumumkan perubahan label lebih sering dari beberapa detik sekali.

## Razor

```cshtml
<ds-spinner label="Menyimpan…" />
<ds-spinner label="Menyiapkan laporan Anda" size="lg" tone="Primary" block />
<ds-spinner label="Mencari…" delayed />
<ds-spinner label="Memuat" quiet-label size="sm" />   @* label disembunyikan secara visual; pakai di samping teks lain yang terlihat *@
```

| Atribut | Efek |
| --- | --- |
| `label` | Teks yang terlihat (bawaan "Memuat…", diterjemahkan) |
| `size` | `xs`, `sm`, `lg`, `xl` |
| `tone` | `Neutral` (bawaan), `Primary`, `Success`, `Warning`, `Error`, `Info` |
| `block` | Pusatkan di wadah dengan padding |
| `delayed` | Jeda 300 ms lalu pudar |
| `quiet-label` | Label hanya untuk teknologi bantu |

## Token

`--ds-spinner-size`, `--ds-tone`, `--ds-subtle`, `--ds-delay` (300ms), `--ds-duration-quick`, `--ds-ease-standard`, `--color-base-100` (overlay), `--ds-z-sticky`, `--ds-type-callout-size`, `--ds-space-2`, `--ds-space-3`, `--ds-space-8`.

## Native dan daisyUI

Cincin adalah `span` berborder yang diputar dengan keyframe; aturan dasar (`.ds-spinner`, 1em, 0,7 dtk) ada di `button.css` dan `media.css` menambah ukuran, tone, dan track. Class `loading` daisyUI menggambar animasi yang berbeda; cincin DS menggantikannya. `role="status"` dan `aria-busy` adalah mekanisme ARIA native untuk mengumumkan progres ke teknologi bantu.
