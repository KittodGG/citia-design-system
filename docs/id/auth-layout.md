---
title: Auth layout
group: components
category: layout
order: 8
summary: Tata letak halaman masuk, daftar, dan pemulihan kata sandi: panel form di samping panel brand opsional, atau kartu di tengah.
source: TPS _AuthLayout, app.css L2145–2269
---

Auth layout membingkai halaman yang dilihat orang sebelum masuk. Hanya satu hal yang ditampilkan: form singkat dengan satu tombol utama. Pakai layout terbagi untuk produk dengan cerita brand, kartu di tengah untuk halaman yang tenang dan cepat. Di dalam produk pakai [App shell](./app-shell.md).

## Examples

### Masuk dengan panel brand

Panel brand muncul mulai 1024px. Di bawahnya form memenuhi layar dan tanda brand pindah ke atas judul.

```html preview title="Masuk, terbagi"
<div class="ds-auth is-embedded">
  <section class="ds-auth-hero" aria-label="Tentang produk">
    <div class="ds-auth-brand"><span class="ds-brand-mark" aria-hidden="true">C</span>Citia</div>
    <div><h2 class="ds-auth-hero-title">Bekerja di satu tempat.</h2><p class="ds-auth-hero-slogan">Proyek, faktur, dan orang, selalu selaras.</p></div>
    <p class="ds-auth-hero-foot">© 2026 Citia Engineering</p>
  </section>
  <main class="ds-auth-main">
    <div class="ds-auth-panel">
      <h1 class="ds-auth-title">Masuk</h1>
      <p class="ds-auth-subtitle">Gunakan email kerja Anda untuk melanjutkan.</p>
      <form class="ds-auth-form" novalidate>
        <label class="ds-stack is-gap-xs">Email<input class="input w-full" type="email" autocomplete="username" placeholder="ayu@northwind.example"></label>
        <label class="ds-stack is-gap-xs">Kata sandi<input class="input w-full" type="password" autocomplete="current-password"></label>
        <button type="submit" class="btn btn-primary">Masuk</button>
      </form>
      <p class="ds-auth-note"><a href="#">Lupa kata sandi?</a></p>
    </div>
  </main>
</div>
```

### Daftar dan lupa kata sandi

```html preview title="Daftar, hero di kanan"
<div class="ds-auth is-embedded is-reverse">
  <section class="ds-auth-hero" aria-label="Tentang produk">
    <div class="ds-auth-brand"><span class="ds-brand-mark" aria-hidden="true">C</span>Citia</div>
    <p class="ds-auth-hero-slogan">Siapkan workspace Anda dalam dua menit.</p>
    <p class="ds-auth-hero-foot">Tanpa kartu untuk 30 hari pertama.</p>
  </section>
  <main class="ds-auth-main">
    <div class="ds-auth-panel">
      <h1 class="ds-auth-title">Buat akun Anda</h1>
      <form class="ds-auth-form" novalidate>
        <label class="ds-stack is-gap-xs">Nama lengkap<input class="input w-full" type="text" autocomplete="name" placeholder="Mei Tanaka"></label>
        <label class="ds-stack is-gap-xs">Email<input class="input w-full" type="email" autocomplete="email"></label>
        <button type="submit" class="btn btn-primary">Buat akun</button>
        <div class="ds-auth-divider">atau</div>
        <button type="button" class="btn btn-outline">Lanjutkan dengan passkey</button>
      </form>
      <p class="ds-auth-note">Sudah punya akun? <a href="#">Masuk</a></p>
    </div>
  </main>
</div>
```

### Kartu di tengah

```html preview title="Lupa kata sandi, di tengah"
<div class="ds-auth is-embedded is-centered">
  <main class="ds-auth-main">
    <div class="ds-auth-panel">
      <h1 class="ds-auth-title">Atur ulang kata sandi</h1>
      <p class="ds-auth-subtitle">Kami mengirim tautan yang berlaku 30 menit.</p>
      <form class="ds-auth-form" novalidate>
        <label class="ds-stack is-gap-xs">Email<input class="input w-full" type="email" autocomplete="email"></label>
        <button type="submit" class="btn btn-primary">Kirim tautan</button>
      </form>
      <p class="ds-auth-note"><a href="#">Kembali ke halaman masuk</a></p>
    </div>
  </main>
</div>
```

## States

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Default | tidak ada | Panel form di `--color-base-100`; panel brand teal tua |
| Lebar | 1024px ke atas | Dua kolom, brand 5fr dan form 4fr (`.is-reverse` menukarnya) |
| Sempit | Di bawah 1024px | Hanya form; padding 24px, 40px mulai 640px |
| State field | Fokus, terisi, tidak valid | Lihat [Input](./input.md) dan [Validation](./validation.md) |
| Mengirim | `aria-busy="true"` pada tombol | Lebar dipertahankan, spinner sebelum label, form inert |
| Error | Kata sandi salah atau tautan kedaluwarsa | [Alert](./alert.md) di atas form; fokus pindah ke sana |
| Gambar brand | `<img>` sebagai anak pertama hero | Gambar cover dengan overlay gelap 55% agar teks putih tetap 4,5:1 |
| Masuk | Halaman dimuat | Panel memudar dengan naik 5px, 220ms; tidak ada pada reduced motion |

## Anatomy

- `.ds-auth`: grid-nya. `.is-centered`, `.is-reverse`, `.is-embedded` (di dalam card atau preview).
- `.ds-auth-hero` dengan `.ds-auth-brand`, `.ds-auth-hero-title`, `.ds-auth-hero-slogan`, `.ds-auth-hero-foot`.
- `.ds-auth-main` dan `.ds-auth-panel` (24rem): kolom form.
- `.ds-auth-title`, `.ds-auth-subtitle`, `.ds-auth-form`, `.ds-auth-divider`, `.ds-auth-note`.

## Usage

- Satu tombol primary per halaman, lebar penuh. Taruh rute sekunder ("Lupa kata sandi", "Buat akun") di catatan di bawah form.
- Batasi judul 1 sampai 4 kata dan subjudul satu kalimat pendek.
- Pakai nilai `autocomplete` (`username`, `current-password`, `new-password`, `one-time-code`) agar pengelola kata sandi bekerja.
- Jaga panel brand tetap dekoratif: tidak ada konten yang tidak tersedia juga di kolom form.
- Jangan meminta lebih dari 3 field saat mendaftar; kumpulkan sisanya setelahnya.

## Accessibility

- Halaman punya satu `<main>` dan satu `<h1>` (judul). Panel brand adalah `section` berlabel; ia boleh keluar dari urutan tab karena tidak punya kontrol.
- Error diumumkan (`role="alert"`) dan dikaitkan ke field lewat `aria-describedby`.
- Di layar sempit tidak ada yang hilang: tanda brand pindah ke `.ds-auth-brand` di atas judul bila Anda menaruhnya di kolom form.
- Teks di panel brand menjaga 4,5:1 terhadap teal dan terhadap overlay gambar.

## Tokens

`--ds-size-auth-panel` (24rem), `--ds-type-title-auth-*`, `--ds-type-display-*`, `--color-secondary`, `--color-base-100|200|300`, `--ds-radius-card`, `--ds-shadow-menu`, `--ds-duration-enter`.

## Native and daisyUI

Dibangun di atas `main`, `form`, dan CSS grid. Field dan tombol adalah daisyUI `input` dan `btn`; `.ds-auth-form` membuat tombol primary selebar penuh. Class versi 1 (`.ds-auth`, `.ds-auth-hero`, `.ds-auth-panel`) tidak berubah; foto dan slogan TPS kini menjadi konten yang Anda sediakan.
