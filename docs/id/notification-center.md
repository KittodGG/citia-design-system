---
title: Notification center
group: components
category: feedback
order: 5
summary: Bel dengan hitungan belum dibaca dan panel notifikasi yang dikelompokkan per hari, dengan item belum dibaca dan sudah dibaca, tandai semua dibaca, serta state memuat, kosong dan galat.
source: TPS app.css L3662–3718, view component NotificationBell
---

Notification center menyimpan hal yang terjadi saat orang pergi atau sibuk di tempat lain: komentar, persetujuan, pengingat tagihan, pemberitahuan sistem. Bel menunjukkan berapa yang belum dibaca; panel mendaftarnya; halaman inbox penuh (kartu notifikasi) memungkinkan orang membacanya utuh. Untuk hasil dari sesuatu yang baru dikerjakan orang pakai [toast](./toast.md). Untuk kondisi yang memengaruhi seluruh halaman pakai [banner](./banner.md).

Design system menyediakan markup dan gaya. Pengambilan data dan polling adalah urusan aplikasi: render daftar di server, dan jangan bangun ulang saat panel terbuka, agar tidak ada yang bergeser di bawah pointer.

## Contoh

Bel adalah `details` dengan pemicu `summary`. Badge menampilkan jumlah tepat sampai 99, lalu `99+`, dan tersembunyi pada 0.

```html preview title="Bel dan badge"
<div class="ds-actions is-start">
  <details class="ds-notif">
    <summary class="ds-notif-trigger" aria-label="Notifikasi: 3 belum dibaca"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><span class="ds-notif-count">3</span></summary>
  </details>
  <details class="ds-notif">
    <summary class="ds-notif-trigger" aria-label="Notifikasi: 120 belum dibaca"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><span class="ds-notif-count">99+</span></summary>
  </details>
  <details class="ds-notif">
    <summary class="ds-notif-trigger" aria-label="Notifikasi"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><span class="ds-notif-count" hidden>0</span></summary>
  </details>
</div>
```

Panel, dikelompokkan per hari, dengan item belum dibaca dan sudah dibaca. "Tandai semua dibaca" bekerja di klien dengan `data-ds-notif-read-all` (di dalam form juga mengirim ke server).

```html preview title="Panel per hari"
<div style="min-height:36rem;display:flex;justify-content:flex-end">
  <details class="ds-notif" open>
    <summary class="ds-notif-trigger" aria-label="Notifikasi: 3 belum dibaca"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><span class="ds-notif-count">3</span></summary>
    <div class="ds-notif-panel">
      <div class="ds-notif-head">
        <h2 style="font-size:.9375rem;font-weight:700">Notifikasi</h2>
        <button type="button" class="btn btn-ghost btn-xs" data-ds-notif-read-all>Tandai semua dibaca</button>
      </div>
      <div class="ds-notif-list">
        <section aria-labelledby="nc-today">
          <h3 class="ds-notif-day" id="nc-today">Hari ini</h3>
          <ul class="ds-notif-group">
            <li><a class="ds-notif-item is-info" href="#"><span class="ds-notif-dot" aria-hidden="true"></span><span>
              <span class="ds-notif-title"><span class="ds-visually-hidden" data-ds-notif-unread>Belum dibaca: </span>Mei Tanaka berkomentar di PRJ-1024</span>
              <span class="ds-notif-text">"Cakupan revisi sudah tepat. Bisakah Daniel mengonfirmasi anggaran sebelum Jumat?"</span>
              <span class="ds-notif-time"><time datetime="2026-11-02T14:05">14.05</time> · Komentar</span></span></a></li>
            <li><a class="ds-notif-item is-warning" href="#"><span class="ds-notif-dot" aria-hidden="true"></span><span>
              <span class="ds-notif-title"><span class="ds-visually-hidden" data-ds-notif-unread>Belum dibaca: </span>Faktur INV-2026-0418 jatuh tempo 3 hari lagi</span>
              <span class="ds-notif-text">Jumlah 12.450,00. Kirim pengingat ke klien.</span>
              <span class="ds-notif-time"><time datetime="2026-11-02T09:00">09.00</time> · Tagihan</span></span></a></li>
          </ul>
        </section>
        <section aria-labelledby="nc-yesterday">
          <h3 class="ds-notif-day" id="nc-yesterday">Kemarin</h3>
          <ul class="ds-notif-group">
            <li><a class="ds-notif-item is-error" href="#"><span class="ds-notif-dot" aria-hidden="true"></span><span>
              <span class="ds-notif-title"><span class="ds-visually-hidden" data-ds-notif-unread>Belum dibaca: </span>Impor gagal: baris 14 tidak punya nomor faktur</span>
              <span class="ds-notif-time"><time datetime="2026-11-01T17:30">17.30</time> · Impor</span></span></a></li>
            <li><a class="ds-notif-item is-success is-read" href="#"><span class="ds-notif-dot" aria-hidden="true"></span><span>
              <span class="ds-notif-title">Sofia Marquez menyetujui anggaran Q3</span>
              <span class="ds-notif-time"><time datetime="2026-11-01T11:12">11.12</time> · Persetujuan</span></span></a></li>
          </ul>
        </section>
        <section aria-labelledby="nc-older">
          <h3 class="ds-notif-day" id="nc-older">Sebelumnya</h3>
          <ul class="ds-notif-group">
            <li><a class="ds-notif-item is-info is-read" href="#"><span class="ds-notif-dot" aria-hidden="true"></span><span>
              <span class="ds-notif-title">Versi 2.4 sudah aktif</span>
              <span class="ds-notif-text">Pintasan keyboard kini bekerja di setiap tabel.</span>
              <span class="ds-notif-time"><time datetime="2026-10-28T10:00">28 Okt 2026</time> · Produk</span></span></a></li>
          </ul>
        </section>
      </div>
      <a class="ds-notif-all" href="#">Lihat semua notifikasi</a>
    </div>
  </details>
</div>
```

Memuat, kosong dan galat. Daftar `aria-busy` saat memuat; daftar kosong menyebut apa yang akan muncul; galat menawarkan coba lagi.

```html preview title="Memuat, kosong, galat"
<div style="display:grid;gap:1rem">
  <div style="min-height:15rem;display:flex;justify-content:flex-end">
    <details class="ds-notif" open><summary class="ds-notif-trigger" aria-label="Notifikasi"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg></summary>
      <div class="ds-notif-panel">
        <div class="ds-notif-head"><h2 style="font-size:.9375rem;font-weight:700">Notifikasi</h2></div>
        <div class="ds-notif-list" aria-busy="true">
          <span class="ds-visually-hidden" role="status">Memuat notifikasi</span>
          <div class="ds-notif-skeleton" aria-hidden="true"><span></span></div>
          <div class="ds-notif-skeleton" aria-hidden="true"><span></span></div>
          <div class="ds-notif-skeleton" aria-hidden="true"><span></span></div>
        </div>
      </div></details>
  </div>
  <div style="min-height:15rem;display:flex;justify-content:flex-end">
    <details class="ds-notif" open><summary class="ds-notif-trigger" aria-label="Notifikasi"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg></summary>
      <div class="ds-notif-panel">
        <div class="ds-notif-head"><h2 style="font-size:.9375rem;font-weight:700">Notifikasi</h2></div>
        <div class="ds-notif-empty"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><strong>Semua sudah terbaca</strong><span>Komentar, persetujuan dan pengingat baru tampil di sini.</span></div>
      </div></details>
  </div>
  <div style="min-height:15rem;display:flex;justify-content:flex-end">
    <details class="ds-notif" open><summary class="ds-notif-trigger" aria-label="Notifikasi"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg></summary>
      <div class="ds-notif-panel">
        <div class="ds-notif-head"><h2 style="font-size:.9375rem;font-weight:700">Notifikasi</h2></div>
        <div class="ds-notif-error" role="alert"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg><strong>Notifikasi tidak bisa dimuat</strong><span>Periksa koneksi lalu coba lagi.</span><button type="button" class="btn btn-sm">Coba lagi</button></div>
      </div></details>
  </div>
</div>
```

Halaman inbox penuh memakai kartu notifikasi. Kartu yang dibuka dari bel disorot dengan `:target`.

```html preview title="Kartu inbox"
<div style="display:grid;gap:.75rem;max-width:44rem">
  <article class="ds-notif-card is-warning" id="n-418">
    <span class="ds-notif-card-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg></span>
    <div style="flex:1;min-width:12rem">
      <h3 style="font-size:.9375rem;font-weight:700">Faktur INV-2026-0418 jatuh tempo 3 hari lagi</h3>
      <p style="color:var(--ds-subtle);font-size:.875rem">Jumlah 12.450,00. Kirim pengingat ke klien atau tandai faktur sebagai lunas.</p>
      <p style="color:var(--ds-subtle);font-size:.75rem;margin-top:.25rem"><time datetime="2026-11-02T09:00">2 Nov 2026, 09.00</time> · Tagihan</p>
    </div>
  </article>
  <article class="ds-notif-card is-info is-read">
    <span class="ds-notif-card-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg></span>
    <div style="flex:1;min-width:12rem">
      <h3 style="font-size:.9375rem;font-weight:600">Versi 2.4 sudah aktif</h3>
      <p style="color:var(--ds-subtle);font-size:.875rem">Pintasan keyboard kini bekerja di setiap tabel.</p>
    </div>
  </article>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Bel rest | Tertutup | Target 44px, ikon berwarna teks, tanpa badge bila 0 |
| Bel hover | Pointer di atas | State layer primary 6%, ikon berwarna teks primary |
| Bel terbuka | `details[open]` | State layer primary 12% |
| Bel pressed | Pointer turun | State layer 10%, skala 0,97 |
| Bel focus-visible | Fokus keyboard | Ring `--ds-focus` 2px |
| Badge | Belum dibaca di atas 0 | Warna error terisi dengan cincin 2px warna permukaan; angka tabular; `99+` di atas 99 |
| Item belum dibaca | Tanpa `is-read` | Titik nada terisi dengan halo, judul bobot 700, awalan "Belum dibaca:" tersembunyi untuk pembaca layar |
| Item sudah dibaca | `is-read` | Titik cincin, judul bobot 600, teks berwarna subtle (tetap 4,5:1) |
| Item hover, pressed, fokus | Pada item tautan | Permukaan `base-200`, lalu layer 10%, lalu ring fokus 2px di dalam |
| Judul hari | `.ds-notif-day` | Menempel di atas daftar yang digulir selama grupnya digulir |
| Memuat | `aria-busy="true"` | Tiga baris skeleton; shimmer diam pada reduced motion |
| Kosong | `.ds-notif-empty` | Bel dan kalimat yang menyebut apa yang akan muncul |
| Galat | `.ds-notif-error` | Ikon galat, satu kalimat dan tombol coba lagi |
| Tandai semua dibaca | `data-ds-notif-read-all` | Semua item menjadi terbaca, badge tersembunyi, nama bel diperbarui |
| Membuka | `details[open]` | Memudar masuk dengan geser 5px ke bawah selama 160ms, dari bel |

## Anatomi

- `details.ds-notif` dengan `summary.ds-notif-trigger` (bel) dan `.ds-notif-count` (badge).
- `.ds-notif-panel`: `.ds-notif-head` (judul dan "Tandai semua dibaca"), `.ds-notif-list` (menggulir setelah 32rem atau tinggi viewport), `.ds-notif-day` dan `.ds-notif-group`, bagian `.ds-notif-item` (`.ds-notif-dot`, `.ds-notif-title`, `.ds-notif-text`, `.ds-notif-time`), `.ds-notif-all`.
- State: `.ds-notif-skeleton`, `.ds-notif-empty`, `.ds-notif-error`.
- Inbox: `.ds-notif-card`, `.ds-notif-card-icon`. Nada pada item dan kartu: `is-info`, `is-success`, `is-warning`, `is-error`, `is-neutral`.

## Penggunaan

- Urutkan terbaru dulu dan kelompokkan per hari kalender: Hari ini, Kemarin, lalu tanggal. Tampilkan waktu dalam zona waktu orang itu.
- Judul: apa yang terjadi dalam satu baris. Teks: paling banyak 3 baris (sisanya dipotong; inbox menampilkannya utuh).
- Simpan 20 sampai 30 item di panel dan tautkan ke inbox penuh dengan "Lihat semua notifikasi".
- Hitung hanya item yang belum dilihat. Hapus hitungan saat "Tandai semua dibaca" dipakai atau saat halaman inbox dibuka.
- Perbarui badge dan daftar hanya saat panel tertutup, atau tanyakan dulu ("2 notifikasi baru").
- Jangan menampilkan toast untuk setiap notifikasi baru; sisakan toast untuk aksi orang itu sendiri dan untuk hal mendesak sesekali.
- Jangan mengandalkan warna titik: belum dibaca juga tebal dan diumumkan.

## Aksesibilitas

- `summary` adalah kontrolnya: beri `aria-label` dengan jumlah nyata ("Notifikasi: 3 belum dibaca"). Teks badge tidak dibaca terpisah karena label menggantikan namanya.
- Setiap item belum dibaca diawali "Belum dibaca: " yang tersembunyi secara visual agar state-nya diucapkan. Item sudah dibaca tanpa awalan.
- Setiap grup hari adalah `section` yang diberi label oleh `h3`-nya. Pakai `time` dengan `datetime` untuk waktu.
- Daftar memuat `aria-busy` dengan teks `role="status"`; blok galat `role="alert"`.
- Panel menutup saat penekanan di luar dan saat Escape, mengembalikan fokus ke bel (perilaku `data-ds-menu` dari skrip shell).

| Tombol | Aksi |
| --- | --- |
| Enter, Space | Membuka atau menutup panel dari bel |
| Tab, Shift+Tab | Berpindah melalui "Tandai semua dibaca", item dan "Lihat semua notifikasi" |
| Escape | Menutup panel dan mengembalikan fokus ke bel |

## Razor

Belum ada tag helper; markup adalah partial milik aplikasi Anda. Pertahankan strukturnya:

```cshtml
<details class="ds-notif" data-ds-menu>
    <summary class="ds-notif-trigger" aria-label="@(unread > 0 ? DsText.T("notif.label", unread) : DsText.T("notif.none"))">
        <ds-icon name="bell" size="lg" />
        <span class="ds-notif-count" hidden="@(unread == 0)">@(unread > 99 ? "99+" : unread.ToString())</span>
    </summary>
    <div class="ds-notif-panel">
        <div class="ds-notif-head">
            <h2>@DsText.T("notif.markAllRead")</h2>
            <form method="post" asp-action="MarkAllRead"><button class="btn btn-ghost btn-xs" data-ds-notif-read-all>@DsText.T("notif.markAllRead")</button></form>
        </div>
        @* grup dan item *@
    </div>
</details>
```

String `notif.label`, `notif.none`, `notif.markAllRead`, `notif.empty` dan `notif.unread` terdaftar dalam bahasa Inggris dan Indonesia.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-notif-read-all` | Pada tombol di dalam `.ds-notif`: menandai semua item terbaca, menyembunyikan badge dan memperbarui nama bel. Di dalam form, form tetap terkirim |
| `data-ds-notif-unread` | Pada teks "Belum dibaca:" tersembunyi dari sebuah item: disembunyikan saat item menjadi terbaca |

`DS.notif.setUnread(notifElement, count)` memperbarui badge dan nama; `DS.notif.markAllRead(notifElement)`. Event `ds:notif:read-all`.

## Token

`--ds-size-panel`, `--ds-z-notification`, `--ds-shadow-overlay`, `--ds-radius-box`, `--color-error`, `--ds-error-text`, `--ds-subtle`, `--ds-opacity-state-hover`, `--ds-opacity-state-selected`, `--ds-opacity-state-pressed`, `--ds-duration-quick`, `--ds-ease-emphasized`, `--ds-focus`, `--ds-duration-shimmer`.

## Native dan daisyUI

Bel dan panel adalah `details` native. daisyUI tidak dipakai. Skrip shell menutup `details[data-ds-menu]` yang terbuka saat penekanan di luar dan saat Escape; demo di atas tidak memakai `data-ds-menu` agar tetap terbuka.
