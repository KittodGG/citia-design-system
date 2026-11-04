---
title: Timeline
group: components
category: data-display
order: 13
summary: Rangkaian kejadian vertikal dengan ikon dan warna per kejadian, waktu, pengelompokan per hari opsional, bentuk rapat, dan langkah yang belum terjadi.
source: TPS app.css .ds-feed (dataviz.css), Tailwind UI feeds, Material 3 timelines
---

Timeline mendaftar apa yang terjadi, dari yang terbaru atau terlama, di sepanjang garis tipis. Setiap kejadian punya penanda, judul, satu kalimat opsional, dan waktu. Pakai untuk jejak audit, riwayat data, atau log pengiriman. Pakai [stepper](./stepper.md) untuk langkah yang dilalui pengguna, [list](./list.md) bila urutan waktu tidak penting, dan activity feed di kartu dasbor untuk aliran singkat yang hidup.

## Contoh

```html preview title="Kejadian dengan ikon dan warna"
<ol class="ds-timeline" aria-label="Riwayat INV-2026-0418">
  <li class="ds-timeline__item is-success" aria-current="true">
    <span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check-circle"></use></svg></span>
    <div class="ds-timeline__body">
      <div class="ds-timeline__head"><p class="ds-timeline__title">Pembayaran diterima</p><time class="ds-timeline__time" datetime="2026-11-03T09:42">3 Nov, 09.42</time></div>
      <p class="ds-timeline__text">Kintara Studio membayar 4.280,00 USD lewat transfer bank.</p>
    </div>
  </li>
  <li class="ds-timeline__item is-info">
    <span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-mail"></use></svg></span>
    <div class="ds-timeline__body">
      <div class="ds-timeline__head"><p class="ds-timeline__title">Pengingat dikirim ke Ayu Lestari</p><time class="ds-timeline__time" datetime="2026-11-01T08:00">1 Nov, 08.00</time></div>
    </div>
  </li>
  <li class="ds-timeline__item is-warning">
    <span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg></span>
    <div class="ds-timeline__body">
      <div class="ds-timeline__head"><p class="ds-timeline__title">Total berbeda dari pesanan pembelian</p><time class="ds-timeline__time" datetime="2026-10-29T16:20">29 Okt, 16.20</time></div>
      <p class="ds-timeline__text">Faktur 4.280,00 USD, pesanan pembelian 4.240,00 USD. Daniel Okafor menerima selisihnya.</p>
    </div>
  </li>
  <li class="ds-timeline__item is-primary">
    <span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file-plus"></use></svg></span>
    <div class="ds-timeline__body">
      <div class="ds-timeline__head"><p class="ds-timeline__title">Faktur dibuat oleh <a href="#">Mei Tanaka</a></p><time class="ds-timeline__time" datetime="2026-10-28T10:05">28 Okt, 10.05</time></div>
    </div>
  </li>
</ol>
```

```html preview title="Dikelompokkan per hari"
<ol class="ds-timeline" aria-label="Aktivitas proyek">
  <li class="ds-timeline__group">
    <h3 class="ds-timeline__day">Hari ini</h3>
    <ol class="ds-timeline__list">
      <li class="ds-timeline__item is-primary"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Sofia Marquez mengubah lingkup kerja</p><time class="ds-timeline__time" datetime="2026-11-02T14:10">14.10</time></div></div></li>
      <li class="ds-timeline__item is-success"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Tahap 2 disetujui</p><time class="ds-timeline__time" datetime="2026-11-02T09:30">09.30</time></div><p class="ds-timeline__text">Disetujui oleh Daniel Okafor.</p></div></li>
    </ol>
  </li>
  <li class="ds-timeline__group">
    <h3 class="ds-timeline__day">Kemarin</h3>
    <ol class="ds-timeline__list">
      <li class="ds-timeline__item is-neutral"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-users"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Hana Kim bergabung ke proyek</p><time class="ds-timeline__time" datetime="2026-11-01T11:00">11.00</time></div></div></li>
    </ol>
  </li>
</ol>
```

```html preview title="Rapat, dengan satu langkah yang belum terjadi"
<ol class="ds-timeline is-compact" aria-label="Pengiriman pesanan 8841">
  <li class="ds-timeline__item is-success"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Pesanan dibuat</p><time class="ds-timeline__time">Sen 08.12</time></div></div></li>
  <li class="ds-timeline__item is-success"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Dikemas</p><time class="ds-timeline__time">Sen 15.40</time></div></div></li>
  <li class="ds-timeline__item is-primary" aria-current="true"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-truck"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Dalam pengantaran</p><time class="ds-timeline__time">Sel 07.55</time></div></div></li>
  <li class="ds-timeline__item is-pending"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-package"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Diterima</p><time class="ds-timeline__time">Perkiraan Sel</time></div></div></li>
</ol>
```

## State

```html preview title="Memuat, muat lebih banyak, dan kosong"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));max-width:48rem">
  <div aria-busy="true">
    <ol class="ds-timeline" aria-label="Memuat riwayat">
      <li class="ds-timeline__item is-skeleton"><span class="ds-timeline__marker"></span><div class="ds-timeline__body"><span class="ds-cell-skeleton" style="--ds-skeleton-w:60%"></span><span class="ds-cell-skeleton" style="--ds-skeleton-w:85%;margin-top:.5rem"></span></div></li>
      <li class="ds-timeline__item is-skeleton"><span class="ds-timeline__marker"></span><div class="ds-timeline__body"><span class="ds-cell-skeleton" style="--ds-skeleton-w:45%"></span><span class="ds-cell-skeleton" style="--ds-skeleton-w:70%;margin-top:.5rem"></span></div></li>
    </ol>
  </div>
  <div>
    <ol class="ds-timeline" aria-label="Riwayat"><li class="ds-timeline__item is-neutral"><span class="ds-timeline__marker"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-clock"></use></svg></span><div class="ds-timeline__body"><div class="ds-timeline__head"><p class="ds-timeline__title">Draf disimpan</p><time class="ds-timeline__time">12.04</time></div></div></li></ol>
    <button type="button" class="btn btn-ghost btn-sm ds-timeline__more">Tampilkan 12 kejadian sebelumnya</button>
  </div>
  <p class="ds-list__empty">Belum ada aktivitas. Kejadian muncul di sini saat orang mengerjakan data ini.</p>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Konektor tipis, penanda bulat tonal dengan ikon, judul berbobot 650, waktu dan teks dalam `--ds-subtle` |
| Tones | `is-primary`, `is-info`, `is-success`, `is-warning`, `is-error` (netral bawaan) | Isi dan border penanda berwarna, ikon berwarna aman untuk teks (3:1 atau lebih) |
| Current | `aria-current="true"` pada item | Cincin di sekitar penanda dan judul berbobot 750 |
| Pending | `.is-pending` | Penanda putus-putus, konektor putus-putus, teks senyap |
| Link in the title | `a` di dalam `.ds-timeline__title` | Bergaris bawah; hover dan focus-visible seperti tautan |
| Loading | Item `.is-skeleton` dalam `aria-busy="true"` | Penanda dan batang abu-abu; garis tetap ada |
| Empty | Tidak ada kejadian | Satu kalimat; tanpa garis kosong |
| Long text | Judul atau teks lebih panjang dari baris | Dibungkus; waktu pindah ke bawah judul pada kolom sempit |
| Compact | `.is-compact` | Penanda 18px berupa titik tanpa ikon, jarak 10px, spasi lebih kecil |
| Load more | `btn-ghost` `.ds-timeline__more` | Sejajar dengan kolom teks |

## Anatomi

- `.ds-timeline` (`ol`) dengan `is-compact`; `.ds-timeline__group` dengan `.ds-timeline__day` (`h3`) dan `.ds-timeline__list` (`ol`) untuk kelompok per hari.
- `.ds-timeline__item` dengan warna (`is-primary/info/success/warning/error`), `is-pending`, `is-skeleton`.
- `.ds-timeline__marker` (ikon), `.ds-timeline__body`, `.ds-timeline__head`, `.ds-timeline__title`, `.ds-timeline__time`, `.ds-timeline__text`, `.ds-timeline__extra`, `.ds-timeline__more`.

## Penggunaan

- Pakai `ol` dan jaga satu urutan: terbaru dulu untuk riwayat, terlama dulu untuk proses. Sebutkan mana yang dipakai di `aria-label` atau judul.
- Tulis judul sebagai fakta lampau dengan nama: "Pembayaran diterima", "Mei Tanaka menyetujui anggaran".
- Selalu pakai elemen `time` dengan `datetime`. Tampilkan waktu relatif ("2 jam lalu") hanya dalam satu hari terakhir dan beri tanggal lengkap di `title`.
- Kelompokkan per hari bila kejadian lebih dari 8 atau rentangnya lebih dari sehari. Judul hari memakai format tanggal pembaca (`Fmt.Date`).
- Pakai warna hanya bila bermakna (success, warning, error); selebihnya netral atau primary. Jangan mengandalkan warna saja: judulnya menyatakan apa yang terjadi.
- Jangan memakai timeline untuk lebih dari sekitar 50 kejadian sekaligus. Muat lebih banyak sesuai permintaan.
- Jangan menganimasikan garis atau penanda; timeline dibaca, bukan ditonton.

## Aksesibilitas

- `ol` mengumumkan jumlah itemnya; beri `aria-label` yang menyebut subjeknya.
- Ikon penanda dekoratif (`aria-hidden="true"`); statusnya ada di teks judul. Langkah yang belum terjadi menulis "Perkiraan" atau "Menunggu" di teks waktunya.
- `aria-current="true"` menandai langkah terbaru atau saat ini; ia juga menambah cincin dan judul yang lebih tebal, jadi tidak hanya warna.
- Warna ikon memenuhi 4,5:1 (teks) dan 3:1 (ikon dan border penanda) pada isi tonalnya di kedua tema. Pada warna paksa penanda tetap berborder.
- Komponen ini tidak beranimasi, jadi reduced motion tidak mengubah apa pun.

| Tombol | Aksi |
| --- | --- |
| Tab | Berpindah ke tautan dan tombol di dalam kejadian (daftarnya sendiri bukan perhentian tab) |

## Razor

Timeline adalah markup; render kejadian dari model Anda.

```cshtml
<ol class="ds-timeline" aria-label="@Model.Title">
  @foreach (var e in Model.Events)
  {
    <li class="ds-timeline__item @e.Tone.Css()">
      <span class="ds-timeline__marker">@Icon.Svg(e.Tone.IconName())</span>
      <div class="ds-timeline__body">
        <div class="ds-timeline__head">
          <p class="ds-timeline__title">@e.Title</p>
          <time class="ds-timeline__time" datetime="@e.At.ToString("O")">@Fmt.DateTime(e.At)</time>
        </div>
        @if (e.Text is not null) { <p class="ds-timeline__text">@e.Text</p> }
      </div>
    </li>
  }
</ol>
```

`Tone.Css()` menghasilkan `is-success` dan seterusnya; `Tone.IconName()` menghasilkan ikon yang sesuai.

## JavaScript

Tidak ada. Timeline adalah HTML dan CSS statis.

## Token

`--ds-timeline-marker` (1,75rem, atau 1,125rem saat rapat), `--ds-timeline-gap`, `--color-primary`, `--color-info`, `--color-success`, `--color-warning`, `--color-error`, `--ds-primary-soft`, `--ds-info-soft`, `--ds-success-soft`, `--ds-warning-soft`, `--ds-error-soft`, `--ds-neutral-soft`, `--ds-primary-text`, `--ds-info-text`, `--ds-success-text`, `--ds-warning-text`, `--ds-error-text`, `--ds-subtle`, `--color-base-300`, `--ds-radius-full`, `--ds-type-callout-size`.

## Native dan daisyUI

Dibangun di atas `ol`, `li`, `time`, dan `h3`. daisyUI `timeline` tidak dipakai; ia mengutamakan tata letak horizontal dan tidak punya warna, kelompok hari, atau status belum terjadi. `.ds-feed` lama tetap tersedia di gaya dasbor untuk feed singkat yang hidup.
