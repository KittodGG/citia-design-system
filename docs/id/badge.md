---
title: Badge
group: components
category: data-display
order: 2
summary: Hitungan atau titik kecil yang menandai item baru atau belum dibaca, dibatasi 99+, dalam enam tone, ditempel di tombol dan avatar lewat indicator.
source: TPS app.css badge colours L256–257, L3068–3071
---

Badge memberi tahu bahwa ada yang perlu diperhatikan dan, dengan angka, berapa banyak. Ia bukan status (pakai [status](./status.md) untuk "Aktif" atau "Gagal") dan bukan label (pakai [tag](./tag.md)). Tempelkan di sudut tombol atau [avatar](./avatar.md) dengan [indicator](./indicator.md).

## Contoh

```html preview title="Hitungan, batas, dan tone"
<div style="display:flex;gap:.75rem;align-items:center;flex-wrap:wrap">
  <span class="ds-badge" data-ds-badge data-count="3"></span>
  <span class="ds-badge" data-ds-badge data-count="42"></span>
  <span class="ds-badge" data-ds-badge data-count="128"></span>
  <span class="ds-badge is-info" data-ds-badge data-count="5"></span>
  <span class="ds-badge is-success" data-ds-badge data-count="12"></span>
  <span class="ds-badge is-warning" data-ds-badge data-count="7"></span>
  <span class="ds-badge is-error" data-ds-badge data-count="9"></span>
  <span class="ds-badge is-neutral" data-ds-badge data-count="2"></span>
</div>
```

```html preview title="Soft, outline, ukuran, dan titik"
<div style="display:flex;gap:.75rem;align-items:center;flex-wrap:wrap">
  <span class="ds-badge is-soft" data-ds-badge data-count="14"></span>
  <span class="ds-badge is-outline is-error" data-ds-badge data-count="3"></span>
  <span class="ds-badge is-sm" data-ds-badge data-count="8"></span>
  <span class="ds-badge is-lg" data-ds-badge data-count="21"></span>
  <span class="ds-badge is-dot is-sm"><span class="ds-visually-hidden">Baru</span></span>
  <span class="ds-badge is-dot is-success"><span class="ds-visually-hidden">Daring</span></span>
  <span class="ds-badge is-dot is-lg is-error"><span class="ds-visually-hidden">Perlu tindakan</span></span>
</div>
```

```html preview title="Pada icon button dan avatar"
<div style="display:flex;gap:2rem;align-items:center;flex-wrap:wrap">
  <span class="ds-indicator">
    <button type="button" class="btn btn-ghost btn-square" aria-label="Notifikasi, 4 belum dibaca"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"></use></svg></button>
    <span class="ds-badge ds-indicator__item is-error is-sm" data-ds-badge data-count="4" data-ds-badge-label="belum dibaca"></span>
  </span>
  <span class="ds-indicator is-round">
    <span class="ds-avatar c1 is-round is-lg" role="img" aria-label="Daniel Okafor"><span aria-hidden="true">DO</span></span>
    <span class="ds-badge is-dot ds-indicator__item is-bottom is-success"><span class="ds-visually-hidden">Daring</span></span>
  </span>
</div>
```

```html preview title="Pembaruan langsung"
<div style="display:flex;gap:1rem;align-items:center">
  <span class="ds-indicator">
    <button type="button" class="btn btn-ghost btn-square" aria-label="Kotak masuk"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-mail"></use></svg></button>
    <span id="demo-badge" class="ds-badge ds-indicator__item is-error is-sm" data-ds-badge data-count="98" data-ds-badge-live></span>
  </span>
  <button type="button" class="btn btn-sm" onclick="const b=document.getElementById('demo-badge');DS.badge.set(b,Number(b.dataset.count)+1)">Terima pesan</button>
  <button type="button" class="btn btn-sm btn-ghost" onclick="DS.badge.set(document.getElementById('demo-badge'),0)">Tandai sudah dibaca</button>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Hitungan di atas 0 | Isi tone solid, teks putih, angka tabular |
| Dibatasi | Hitungan di atas `data-ds-badge-max` (bawaan 99) | Teks `99+`; teks tersembunyi berbunyi "Lebih dari 99 item" |
| Nol | Hitungan 0 | Disembunyikan (`hidden`); `data-ds-badge-zero="show"` mempertahankannya |
| Diperbarui | `DS.badge.set` dengan nilai baru | Satu kali membesar 120 ms dari 0,8 ke 1; tidak ada saat reduced motion |
| Dot | `.is-dot` | Lingkaran 8px tanpa teks; makna ada di nama aksesibel host |
| Muncul dan hilang | `hidden` diubah pada item indicator | Opacity dan skala 0,6 ke 1 selama 150 sampai 160 ms |
| Hover, pressed, disabled | Tidak berlaku | Badge tidak interaktif; tombol host yang membawa state ini |

## Anatomi

- `.ds-badge` dengan `is-primary|info|success|warning|error|neutral`, `is-soft`, `is-outline`, `is-sm|lg`, `is-dot`.
- Anak yang dibuat: `[data-ds-badge-text]` (terlihat, `aria-hidden`) dan `.ds-visually-hidden` (kalimat lengkap).

## Penggunaan

- Batasi pada 99 dan tampilkan `99+`. Jangan tampilkan hitungan 4 digit.
- Sembunyikan saat 0; badge kosong terbaca seperti bug.
- Pakai satu tone per area. Error untuk item yang menghambat pekerjaan, primary untuk belum dibaca umum.
- Titik berarti "ada yang berubah", angka berarti "sebanyak ini". Jangan campur keduanya pada satu host.
- Jangan taruh badge pada link teks; pakai [tag](./tag.md) atau [status](./status.md).

## Aksesibilitas

- Host membawa makna: `aria-label="Notifikasi, 4 belum dibaca"`. Teks badge `aria-hidden` dan kalimat tersembunyi ditambahkan.
- Pengumuman langsung bersifat opt-in (`data-ds-badge-live` membuat `role="status"`). Pakai untuk satu badge yang terlihat, bukan untuk daftar badge.
- Isi solid memakai warna `-content`: minimal 4,5:1 di kedua tema.
- Titik harus punya teks tersembunyi atau label host; warna saja bukan pesan.

## Razor

```cshtml
<ds-badge count="@Model.Unread" max="99" label="belum dibaca" tone="Error" size="sm" live />
<ds-badge dot tone="Success" label="Daring" />
```

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-badge` | Mengaktifkan badge: membuat teks terlihat dan tersembunyi |
| `data-count` | Nilai saat ini |
| `data-ds-badge-max` | Batas, bawaan 99 |
| `data-ds-badge-label` | Kata benda untuk kalimat tersembunyi ("belum dibaca") |
| `data-ds-badge-live` | Mengumumkan perubahan secara sopan |
| `data-ds-badge-zero="show"` | Mempertahankan badge pada 0 |

`DS.badge.set(element, count)` memperbaruinya. Event: tidak ada.

## Token

`--color-primary`, `--color-info`, `--color-success`, `--color-warning`, `--color-error` beserta `-content`, `--ds-tone`, `--ds-tone-text`, `--ds-radius-full`, `--ds-duration-quick`, `--ds-duration-enter`, `--ds-ease-emphasized`.

## Native dan daisyUI

`.ds-badge` adalah `span`. daisyUI `badge` tetap berfungsi dan mempertahankan perbaikan teks soft-tone; pakai `.ds-badge` untuk hitungan dan titik karena menambah batas, pembaruan langsung, dan penempatan indicator.
