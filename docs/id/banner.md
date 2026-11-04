---
title: Banner
group: components
category: feedback
order: 2
summary: Pesan tingkat halaman atau aplikasi yang bertahan sampai ditutup, mengingat penutupan, dapat menempel di atas dan dapat menampilkan status sistem.
source: TPS app.css .access-banner L2664–2703, .notif-critical L3702–3707
---

Banner berbicara untuk seluruh halaman atau seluruh aplikasi: jendela pemeliharaan terjadwal, masa percobaan yang akan habis, layanan yang menurun. Banner berada di atas konten, bertahan sampai orang menutupnya (atau kondisinya selesai) dan, bila punya `key`, tidak muncul lagi setelah ditutup. Untuk pesan tentang satu bagian pakai [alert](./alert.md). Untuk konfirmasi singkat pakai [toast](./toast.md).

## Contoh

Banner bawaan berupa kotak membulat di atas konten halaman. Nadanya mengikuti nada [alert](./alert.md).

```html preview title="Nada"
<div style="display:grid;gap:.75rem">
  <div class="ds-banner is-info" role="status" style="margin:0">
    <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-megaphone"></use></svg>
    <div class="ds-banner__body"><strong class="ds-banner__title">Versi 2.4 sudah aktif.</strong> Pintasan keyboard kini bekerja di setiap tabel. <a href="#">Apa yang berubah</a></div>
  </div>
  <div class="ds-banner is-warning" role="status" style="margin:0">
    <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-clock"></use></svg>
    <div class="ds-banner__body"><strong class="ds-banner__title">Masa percobaan berakhir 30 Nov 2026 pukul 23.59.</strong> Sisa 12 hari. Pilih paket agar tetap bisa mengubah.</div>
    <div class="ds-banner__actions"><a class="btn btn-sm btn-primary" href="#">Pilih paket</a></div>
  </div>
  <div class="ds-banner is-error" role="alert" style="margin:0">
    <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>
    <div class="ds-banner__body"><strong class="ds-banner__title">Pembayaran tidak tersedia.</strong> Faktur ditahan sebagai draf sampai layanan kembali.</div>
  </div>
  <div class="ds-banner is-success" role="status" style="margin:0">
    <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-check-circle"></use></svg>
    <div class="ds-banner__body"><strong class="ds-banner__title">Migrasi selesai.</strong> Seluruh 1.284 data dipindahkan ke workspace baru.</div>
  </div>
</div>
```

Dapat ditutup. Banner dengan `data-ds-banner="key"` menyimpan penutupan di browser, sehingga tetap hilang pada kunjungan berikutnya. Demo di bawah memakai `data-ds-banner-remember="none"` agar bisa dimuat ulang.

```html preview title="Dapat ditutup, diingat"
<div class="ds-banner is-info" role="status" data-ds-banner="planned-maintenance-2026-11" data-ds-banner-remember="none" style="margin:0">
  <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-megaphone"></use></svg>
  <div class="ds-banner__body"><strong class="ds-banner__title">Pemeliharaan terjadwal 2 Nov 2026, 22.00 sampai 23.30.</strong> Penyimpanan dijeda selama 90 menit.</div>
  <div class="ds-banner__actions"><a class="btn btn-sm" href="#">Detail</a></div>
  <button type="button" class="ds-banner__close" data-ds-banner-close aria-label="Tutup banner"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
</div>
```

Status sistem. Titik berlabel menggantikan ikon; titik berdenyut hanya selama masalah masih terbuka.

```html preview title="Status sistem"
<div style="display:grid;gap:.75rem">
  <div class="ds-banner is-system is-warning" role="status" style="margin:0">
    <span class="ds-banner__status"><span class="ds-banner__dot" aria-hidden="true"></span>Performa menurun</span>
    <div class="ds-banner__body">Ekspor lebih lambat dari biasanya. Diperbarui 14.05.</div>
    <div class="ds-banner__actions"><a href="#">Halaman status</a></div>
  </div>
  <div class="ds-banner is-system is-success" role="status" style="margin:0">
    <span class="ds-banner__status"><span class="ds-banner__dot" aria-hidden="true"></span>Semua sistem normal</span>
    <div class="ds-banner__body">Terakhir diperiksa 14.05.</div>
  </div>
</div>
```

Selebar layar dan menempel. `is-bar` menghapus radius dan border samping; `is-sticky` menjaga bar di atas halaman yang digulir (geser dengan `--ds-banner-top` bila ada header di atasnya).

```html preview title="Bar, kritis"
<div style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box);overflow:hidden">
  <div class="ds-banner is-bar is-error is-critical" role="alert">
    <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-megaphone"></use></svg>
    <div class="ds-banner__body"><strong class="ds-banner__title">Gangguan layanan.</strong> Masuk gagal bagi sebagian pengguna. Kami sedang menanganinya.</div>
  </div>
  <div style="padding:1rem">Konten halaman dimulai di sini.</div>
</div>
```

## State

```html preview title="Hover, fokus dan pressed ada pada kontrol"
<div class="ds-banner is-warning" role="status" style="margin:0">
  <svg class="ds-icon ds-banner__icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg>
  <div class="ds-banner__body"><strong class="ds-banner__title">2 faktur jatuh tempo.</strong> INV-2026-0418 dan INV-2026-0421.</div>
  <div class="ds-banner__actions"><button type="button" class="btn btn-sm">Tinjau</button><button type="button" class="btn btn-sm" aria-disabled="true">Kirim pengingat</button></div>
  <button type="button" class="ds-banner__close" aria-label="Tutup banner"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Dirender | Isian tonal 8%, border 1px 30%, ikon nada, teks berkontras penuh |
| Hover | Pointer di atas aksi atau tombol tutup | State layer 6% pada kontrol |
| Focus-visible | Fokus keyboard | Ring `--ds-focus` 2px, offset 2px; banner sticky tidak menutupi ring kontrol di bawahnya karena halaman menggulir di bawahnya dengan `scroll-padding-top` |
| Pressed | Pointer turun | State layer 10%, skala 0,97 |
| Ditutup | Tombol tutup | Memudar 140ms, ruang menutup 240ms, lalu `hidden`; diingat bila `data-ds-banner` diisi |
| Diingat | Storage menyimpan key | Banner tersembunyi saat halaman dimuat |
| Kritis | `is-critical` | Ikon berkedip tiap 1,6 detik; diam pada reduced motion |
| Sistem, terbuka | `is-system` dengan nada selain success | Titik berdenyut tiap 2 detik; diam pada reduced motion |
| Sticky | `is-sticky` | Tetap di atas viewport di atas konten |

## Anatomi

- `.ds-banner`: wadah. Nada `is-info` (bawaan), `is-success`, `is-warning`, `is-error`, `is-neutral`. Modifier `is-bar`, `is-sticky`, `is-critical`, `is-system`.
- `.ds-banner__icon`: ikon nada (20px).
- `.ds-banner__body`: pesan; `.ds-banner__title` adalah kalimat pertama yang tebal.
- `.ds-banner__actions`: satu atau dua tombol atau tautan.
- `.ds-banner__close`: tombol tutup.
- `.ds-banner__status` dan `.ds-banner__dot`: label status dan titik pada varian sistem.

## Penggunaan

- Tampilkan paling banyak satu banner pada satu waktu. Bila beberapa kondisi berlaku, tulis satu kalimat yang mencakup semuanya atau tampilkan yang paling mendesak.
- Sebut fakta, waktu dan akibatnya: "Pemeliharaan terjadwal 2 Nov, 22.00 sampai 23.30. Penyimpanan dijeda."
- Beri banner untuk peristiwa terjadwal sebuah `key` yang memuat tanggal (`planned-maintenance-2026-11`), agar peristiwa berikutnya tampil lagi.
- Jangan pakai `is-critical` untuk selain insiden yang sedang berlangsung. Itu satu-satunya banner yang berkedip.
- Jangan jadikan banner satu-satunya tempat galat yang memblokir muncul; taruh galat di layar yang terdampak.
- Banner tidak boleh menggeser halaman setelah dimuat. Render di server; skrip hanya menyembunyikan banner yang sudah ditutup, jadi banner yang diingat bisa berkedip sekali. Untuk banner yang tidak boleh berkedip, tulis juga penutupan ke cookie dan lewati render di server.

## Aksesibilitas

- Pakai `role="status"` untuk banner biasa dan `role="alert"` hanya untuk yang kritis.
- Titik dan ikon dekoratif; kata-katanya membawa status.
- Tombol tutup bernama ("Tutup banner"). Saat banner pergi dengan fokus di dalamnya, fokus pindah ke elemen fokus berikutnya.
- Banner sticky dapat menutupi kontrol yang sedang fokus. Atur `scroll-padding-top` pada halaman sebesar tinggi banner agar kontrol yang difokus tergulir ke bawahnya.

| Tombol | Aksi |
| --- | --- |
| Tab | Pindah ke aksi berikutnya atau tombol tutup |
| Enter, Space | Mengaktifkan kontrol yang difokus |

Kontras 4,5:1 untuk teks dan 3:1 untuk ikon dan border di kedua tema. `prefers-reduced-motion: reduce` menghentikan kedip dan denyut serta menutup banner seketika.

## Razor

```cshtml
<ds-banner tone="Warning" title="Pemeliharaan terjadwal 2 Nov, 22.00 sampai 23.30."
           key="planned-maintenance-2026-11" dismissible sticky>
    Penyimpanan dijeda selama 90 menit.
    <ds-banner-actions><a class="btn btn-sm" href="/status">Detail</a></ds-banner-actions>
</ds-banner>

<ds-banner tone="Warning" system status-label="Performa menurun">Ekspor lebih lambat dari biasanya.</ds-banner>
```

| Atribut | Efek |
| --- | --- |
| `tone` | `Info` (bawaan), `Success`, `Warning`, `Error`, `Neutral` |
| `title` | Kalimat pertama yang tebal |
| `key` | Mengingat penutupan dengan id ini |
| `remember` | `local` (bawaan), `session` atau `none` |
| `days` | Tampilkan lagi setelah sekian hari |
| `dismissible`, `sticky`, `bar`, `critical` | Flag |
| `system`, `status-label` | Varian status sistem dan labelnya |
| `icon` | Nama ikon pengganti ikon nada |

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-banner="key"` | Banner disembunyikan saat dimuat bila key sudah ditutup |
| `data-ds-banner-remember="local\|session\|none"` | Tempat penyimpanan penutupan |
| `data-ds-banner-days="7"` | Penutupan kedaluwarsa setelah 7 hari |
| `data-ds-banner-close` | Pada tombol di dalam banner: menutup |

`DS.banner.dismiss(elementOrKey)` dan `DS.banner.reset(key)` (tampilkan lagi). Event `ds:banner:dismiss` (bubble, dapat dibatalkan, `detail.id`). Kunci storage adalah `ds-banner-<key>` (prefiks mengikuti `data-ds-storage`).

## Token

`--color-info`, `--color-success`, `--color-warning`, `--color-error`, `--color-base-100`, `--color-base-300`, `--ds-radius-box`, `--ds-z-sticky`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-focus`, `--ds-duration-exit`, `--ds-duration-layout`.

## Native dan daisyUI

Banner adalah HTML biasa tanpa dasar daisyUI. Aksinya memakai tombol daisyUI `btn btn-sm`. Markup versi 1 (`.ds-banner` dengan `svg` dan `p`) tetap tampil.
