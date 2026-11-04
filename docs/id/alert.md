---
title: Alert
group: components
category: feedback
order: 1
summary: Pesan inline dengan isian tonal pucat, ikon, judul, deskripsi dan aksi opsional, dalam lima nada, ringkas atau penuh, dapat ditutup.
source: TPS app.css .pt-note L3636–3637
---

Alert memberi tahu sesuatu tentang konten di sebelahnya: draf yang tersimpan, batas yang hampir tercapai, impor yang gagal. Alert tetap di tempatnya sampai keadaan berubah atau orang menutupnya. Untuk kondisi yang berlaku di seluruh halaman pakai [banner](./banner.md). Untuk hasil yang hilang sendiri pakai [toast](./toast.md). Untuk keputusan yang menahan pekerjaan pakai alert dialog.

## Contoh

Lima nada. Setiap nada punya ikon dan kata sendiri, jadi makna tidak pernah bergantung pada warna.

```html preview title="Nada"
<div style="display:grid;gap:.75rem;max-width:42rem">
  <div class="ds-alert is-info" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg>
    <div class="ds-alert__body">
      <p class="ds-alert__title">Proyek PRJ-1024 dibagikan ke 4 orang</p>
      <div class="ds-alert__text">Ayu Lestari, Daniel Okafor, Mei Tanaka dan Sofia Marquez dapat mengubahnya.</div>
    </div>
  </div>
  <div class="ds-alert is-success" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-check-circle"></use></svg>
    <div class="ds-alert__body">
      <p class="ds-alert__title">Faktur INV-2026-0418 terkirim</p>
      <div class="ds-alert__text">Klien menerimanya pukul 09.42 dan punya 30 hari untuk membayar.</div>
    </div>
  </div>
  <div class="ds-alert is-warning" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg>
    <div class="ds-alert__body">
      <p class="ds-alert__title">Penyimpanan terisi 92%</p>
      <div class="ds-alert__text">Unggahan berhenti di 50 GB. Hapus ekspor lama atau tingkatkan paket.</div>
    </div>
  </div>
  <div class="ds-alert is-error" role="alert">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>
    <div class="ds-alert__body">
      <p class="ds-alert__title">Impor gagal</p>
      <div class="ds-alert__text">Baris 14 tidak punya nomor faktur. Perbaiki file lalu impor lagi.</div>
    </div>
  </div>
  <div class="ds-alert is-neutral" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg>
    <div class="ds-alert__body">
      <p class="ds-alert__title">Tampilan hanya baca</p>
      <div class="ds-alert__text">Laporan ini diarsipkan pada 31 Okt 2026 dan tidak bisa diubah lagi.</div>
    </div>
  </div>
</div>
```

Dengan aksi dan tombol tutup. Aksi berupa tombol atau tautan biasa, paling banyak dua: yang memperbaiki masalah lebih dulu.

```html preview title="Aksi dan tutup"
<div class="ds-alert is-warning" role="status" style="max-width:42rem">
  <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg>
  <div class="ds-alert__body">
    <p class="ds-alert__title">Masa percobaan berakhir 3 hari lagi</p>
    <div class="ds-alert__text">Setelah 5 Nov 2026 workspace menjadi hanya baca. Pilih paket agar tetap bisa mengubah.</div>
    <div class="ds-alert__actions">
      <a class="btn btn-sm btn-primary" href="#">Pilih paket</a>
      <a class="btn btn-sm btn-ghost" href="#">Bandingkan paket</a>
    </div>
  </div>
  <button type="button" class="ds-alert__close" data-ds-alert-close aria-label="Tutup">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
  </button>
</div>
```

Ringkas, untuk toolbar tabel atau bagian form. Judul dan teks berjalan dalam satu baris.

```html preview title="Ringkas"
<div style="display:grid;gap:.5rem;max-width:42rem">
  <div class="ds-alert is-compact is-info" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg>
    <div class="ds-alert__body"><p class="ds-alert__title">Draf.</p><div class="ds-alert__text">Tersimpan otomatis pukul 14.05.</div></div>
  </div>
  <div class="ds-alert is-compact is-error" role="alert">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>
    <div class="ds-alert__body"><p class="ds-alert__title">Tidak bisa menyimpan.</p><div class="ds-alert__text">Periksa koneksi lalu coba lagi.</div></div>
    <button type="button" class="ds-alert__close" data-ds-alert-close aria-label="Tutup"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
</div>
```

## State

Alert adalah pesan statis, jadi state-nya milik kontrolnya dan gerak penutupannya. Nada adalah variannya; setiap nada di bawah tetap terbaca di tema terang dan gelap.

```html preview title="Rest, dengan aksi, dapat ditutup"
<div style="display:grid;gap:.75rem;max-width:42rem">
  <div class="ds-alert is-success" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-check-circle"></use></svg>
    <div class="ds-alert__body"><p class="ds-alert__title">Pencadangan selesai</p></div>
  </div>
  <div class="ds-alert is-info" role="status">
    <svg class="ds-icon ds-alert__icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg>
    <div class="ds-alert__body">
      <p class="ds-alert__title">Ekspor siap</p>
      <div class="ds-alert__text">Report-2026-Q3.xlsx, 2,4 MB.</div>
      <div class="ds-alert__actions"><button type="button" class="btn btn-sm">Unduh</button><button type="button" class="btn btn-sm" aria-disabled="true">Tautan bagikan</button></div>
    </div>
    <button type="button" class="ds-alert__close" data-ds-alert-close aria-label="Tutup"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg></button>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Dirender | Isian tonal 8% dari nada, border 1px 30%, ikon berwarna nada, teks dengan warna teks normal dan subtle |
| Hover | Pointer di atas tombol tutup atau aksi | State layer 6% di belakang kontrol; alert sendiri tidak berubah |
| Focus-visible | Fokus keyboard pada kontrol | Ring `--ds-focus` 2px, offset 2px |
| Pressed | Pointer turun pada tombol tutup atau aksi | State layer 10% dan skala 0,97 |
| Menutup | Tombol tutup | Memudar 140ms dengan geser 5px ke atas, lalu ruang menutup dalam 240ms; seketika pada reduced motion |
| Aksi aria-disabled | `aria-disabled="true"` pada tombol | Opasitas 55%, tetap bisa difokus |
| Nada | `is-info`, `is-success`, `is-warning`, `is-error`, `is-neutral` | Ikon dan kata berbeda per nada |
| Ringkas | `is-compact` | Padding 8px × 12px, ikon 16px, teks 13px |

## Anatomi

- `.ds-alert`: wadah, grid berisi ikon, isi dan tombol tutup. Modifier nada `is-info` (bawaan), `is-success`, `is-warning`, `is-error`, `is-neutral`.
- `.ds-alert__icon`: ikon nada, 20px (16px pada ringkas).
- `.ds-alert__body`: judul, teks dan aksi.
- `.ds-alert__title`: hasil dalam satu baris, bobot 650.
- `.ds-alert__text`: deskripsi, dengan warna teks subtle.
- `.ds-alert__actions`: paling banyak dua tombol atau tautan.
- `.ds-alert__close`: tombol tutup, terlihat 28px dengan area sentuh 44px pada layar sentuh.
- `.ds-note` adalah nama versi 1 untuk alert sederhana (ikon dan satu paragraf). Tetap berfungsi.

## Penggunaan

- Tulis judul sebagai hasil ("Impor gagal") dan teks sebagai sebab dan langkah berikutnya ("Baris 14 tidak punya nomor faktur. Perbaiki file lalu impor lagi.").
- Letakkan alert di samping hal yang dibicarakannya: di atas form yang dijelaskan, di dalam kartu yang bersangkutan.
- Pakai paling banyak satu alert per bagian. Dua alert dalam satu bagian berarti pesannya perlu ditulis ulang.
- Judul maksimal 60 karakter dan deskripsi maksimal 2 kalimat.
- Pakai `is-error` hanya untuk kegagalan yang harus ditindaklanjuti; pakai `is-warning` untuk hal yang akan menjadi kegagalan.
- Jangan pakai alert untuk hasil klik yang memudar sendiri; itu tugas [toast](./toast.md).
- Jangan beri tombol tutup pada galat yang masih berlaku. Tutup menyembunyikan pesan, bukan memperbaiki masalah.
- Jangan mengandalkan nada saja: pertahankan ikon dan kata.

## Aksesibilitas

- Galat memakai `role="alert"` (diumumkan seketika). Info, success, warning dan neutral memakai `role="status"` (diumumkan dengan sopan). Alert yang sudah ada saat halaman dimuat sebaiknya tidak memakai `role="alert"` kecuali galat, agar pembaca layar tidak membacanya sebelum konten halaman.
- Ikon bersifat dekoratif (`aria-hidden="true"`); judul dan teks membawa makna.
- Tombol tutup punya nama aksesibel (`aria-label="Tutup"`). Saat alert ditutup dengan fokus di dalamnya, fokus pindah ke elemen fokus berikutnya di halaman.
- Kontras: teks 4,5:1 atau lebih di atas isian tonal; ikon dan border 3:1 atau lebih, di kedua tema.
- Gerak: keluar berupa opacity dan geser 5px, lalu ruang menutup. Pada `prefers-reduced-motion: reduce` menutup seketika.

| Tombol | Aksi |
| --- | --- |
| Tab | Pindah ke aksi berikutnya atau tombol tutup |
| Enter, Space | Mengaktifkan aksi yang difokus atau menutup alert |

## Razor

```cshtml
<ds-alert tone="Warning" title="Penyimpanan terisi 92%" dismissible>
    Unggahan berhenti di 50 GB. Hapus ekspor lama atau tingkatkan paket.
    <ds-alert-actions>
        <a class="btn btn-sm btn-primary" href="/billing">Tingkatkan</a>
    </ds-alert-actions>
</ds-alert>

<ds-alert tone="Error" compact title="Tidak bisa menyimpan.">Periksa koneksi lalu coba lagi.</ds-alert>
```

| Atribut | Efek |
| --- | --- |
| `tone` | `Info` (bawaan), `Success`, `Warning`, `Error`, `Neutral` |
| `title` | Judul satu baris |
| `icon` | Nama ikon pengganti ikon nada |
| `dismissible` | Menambah tombol tutup |
| `compact` | Varian ringkas |
| `role` | Menimpa `status` / `alert` |
| `dismiss-label` | Nama tombol tutup (bawaan: "Tutup" sesuai bahasa) |

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-alert-close` | Pada tombol di dalam alert: menutup alert dengan gerak keluar |

`DS.alert.dismiss(element)` menutup alert dari kode. Event `ds:alert:dismiss` naik (bubble) dari alert dan dapat dibatalkan dengan `preventDefault()` agar alert tetap tampil.

## Token

`--color-info`, `--color-success`, `--color-warning`, `--color-error` (nada), `--color-base-100`, `--color-base-300`, `--ds-subtle`, `--ds-radius-box`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-focus`, `--ds-duration-exit`, `--ds-duration-layout`, `--ds-ease-exit`, `--ds-ease-emphasized`, `--ds-enter-offset`.

## Native dan daisyUI

Alert tidak memakai `.alert` daisyUI (isian jenuh). `.ds-alert` adalah komponen tonal tersendiri agar permukaan tetap pucat dan teks tetap berkontras penuh. Aksi memakai tombol daisyUI `btn` dengan `btn-sm`.
