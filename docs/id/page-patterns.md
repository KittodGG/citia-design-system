---
title: Pola halaman
group: patterns
order: 1
summary: Delapan pola halaman di satu kerangka aplikasi: daftar, detail, form, dasbor, pengaturan, masuk, keadaan kosong pertama, dan halaman galat, masing-masing dengan contoh langsung dan aturan.
---

Setiap halaman aplikasi adalah satu dari delapan pola yang berjalan di atas satu kerangka. Pola menentukan urutan blok, bukan isinya: judul di sisi awal, aksi di sisi akhir, satu tombol utama, isi di dalam permukaan, jarak yang sama di mana-mana.

Contoh memakai kelas DS dari [App shell](./app-shell.md), [Page header](./page-header.md), [Table](./table.md), [Form](./form.md), dan [Card](./card.md). Cuplikan Razor memakai API paket yang dijelaskan di [API Razor dan C#](./razor-api.md).

## Kerangka

Kerangka terdiri dari sidebar, top bar yang menempel, dan satu `<main>`. Halaman tidak mengulang elemen kerangka. Di dalam `main`, `.ds-page` menumpuk blok dengan jarak 24px dengan urutan: kepala halaman, toolbar atau hitungan, lalu satu permukaan atau lebih.

| Blok | Kelas | Aturan |
| --- | --- | --- |
| Kepala halaman | `.ds-page-header` | Satu `<h1>` (`.ds-page-title`), satu kelompok aksi di sisi akhir, paling banyak satu baris redup di bawah judul |
| Hitungan | `.ds-counts` | Satu baris fakta: "12 proyek", "9 aktif" |
| Toolbar | `.ds-toolbar` | Teks di sisi awal, aksi di sisi akhir; export di sisi awal, import dan buat baru di sisi akhir |
| Permukaan | `.ds-surface`, `.ds-card` | Tabel, form, dan detail selalu di dalam permukaan; latar halaman bukan tempat konten |

## Halaman daftar

Urutan: kepala halaman, hitungan, permukaan berisi toolbar tabel (cari, filter, ukuran halaman), tabel, dan pager. Pencarian dan filter memakai `GET` agar URL bisa dibagikan dan tombol kembali browser bekerja. Aturan cari, urut, dan paging ada di [Pola data](./data-pattern.md).

```html preview title="Halaman daftar"
<div class="ds-page">
  <header class="ds-page-header">
    <div><h1 class="ds-page-title">Proyek</h1></div>
    <div class="ds-actions">
      <a class="btn btn-primary btn-sm" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>Proyek baru</a>
    </div>
  </header>
  <div class="ds-counts"><span><strong>12</strong> proyek</span><span>9 aktif</span><span>3 ditunda</span></div>
  <section class="ds-surface" aria-label="Daftar proyek">
    <form class="ds-table-toolbar" role="search">
      <div>
        <label for="pp-list-q">Cari proyek</label>
        <div class="ds-search">
          <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
          <input id="pp-list-q" type="search" class="input" placeholder="Cari kode atau nama">
        </div>
      </div>
      <div>
        <label for="pp-list-status">Status</label>
        <select id="pp-list-status" class="select"><option>Semua status</option><option>Aktif</option><option>Ditunda</option></select>
      </div>
      <button type="button" class="btn">Terapkan</button>
    </form>
    <table class="ds-list-table">
      <thead><tr>
        <th scope="col" aria-sort="ascending"><a class="ds-sort" href="#">Kode <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-up"></use></svg></a></th>
        <th scope="col">Nama</th>
        <th scope="col">Penanggung jawab</th>
        <th scope="col" class="ds-num">Anggaran</th>
        <th scope="col">Status</th>
      </tr></thead>
      <tbody>
        <tr>
          <td class="ds-primary-cell"><a href="#">PRJ-1024</a></td>
          <td data-label="Nama">Sensor gudang</td>
          <td data-label="Penanggung jawab">Ayu Lestari</td>
          <td data-label="Anggaran" class="ds-num">48.500,00</td>
          <td data-label="Status"><span class="ds-status is-active">Aktif</span></td>
        </tr>
        <tr>
          <td class="ds-primary-cell"><a href="#">PRJ-1031</a></td>
          <td data-label="Nama">Portal pelanggan</td>
          <td data-label="Penanggung jawab">Daniel Okafor</td>
          <td data-label="Anggaran" class="ds-num">112.000,00</td>
          <td data-label="Status"><span class="ds-status is-inactive">Ditunda</span></td>
        </tr>
      </tbody>
    </table>
    <footer class="ds-pager">
      <p role="status">1–10 dari 12 proyek</p>
      <nav aria-label="Halaman daftar">
        <a class="btn btn-ghost btn-sm" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"></use></svg> Sebelumnya</a>
        <span class="ds-num">Halaman 1 / 2</span>
        <a class="btn btn-ghost btn-sm" href="#">Berikutnya <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></a>
      </nav>
    </footer>
  </section>
</div>
```

Aturan:

- Kolom pertama adalah identitas (kode atau nama) dan menjadi tautan ke halaman detail.
- Rata akhirkan angka dengan `.ds-num` dan angka tabular; taruh satuan di `.ds-unit`, bukan di setiap sel.
- Rancang keadaan untuk 0 baris ([Empty state](./empty-state.md)), memuat ([Skeleton](./skeleton.md)), dan galat ([Alert](./alert.md) di atas tabel, dengan aksi coba lagi).
- Di bawah 640px baris menjadi kartu berlabel dari `data-label` tiap sel; tabel transaksi yang lebar bergulir di dalam `.ds-table-scroll`.

```cshtml
@model ListPage<ProjectRow>
<partial name="_DsSortHeader" model='new SortHeaderModel("Kode", "code", Model.Sort)' />
<partial name="_DsPager" model='Model.Pager("proyek")' />
```

## Halaman detail

Urutan: kepala halaman dengan status, satu permukaan berisi daftar deskripsi, bagian sekunder (riwayat, data terkait), lalu footer dengan Kembali di sisi awal dan aksi utama di sisi akhir. Aksi merusak memakai tombol ghost, tidak pernah tombol utama.

```html preview title="Halaman detail"
<div class="ds-page">
  <header class="ds-page-header">
    <div><h1 class="ds-page-title">PRJ-1024 Sensor gudang</h1></div>
    <span class="ds-status is-active">Aktif</span>
  </header>
  <section class="ds-surface">
    <div class="ds-card-body is-roomy">
      <dl class="ds-dl is-detail">
        <div><dt>Penanggung jawab</dt><dd>Ayu Lestari</dd></div>
        <div><dt>Anggaran</dt><dd>48.500,00</dd></div>
        <div><dt>Mulai</dt><dd>12 Jan 2026</dd></div>
        <div><dt>Faktur terkait</dt><dd>3</dd></div>
      </dl>
      <div class="ds-section">
        <h2 class="ds-section-title"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-history"></use></svg>Riwayat</h2>
        <ul class="ds-feed">
          <li>
            <span class="ds-feed-dot is-info"></span>
            <div><p class="ds-feed-title">Anggaran diubah dari 45.000,00 ke 48.500,00</p><p class="ds-feed-sub">Daniel Okafor</p></div>
            <time class="ds-feed-time">01 Nov 2026 14.30</time>
          </li>
          <li>
            <span class="ds-feed-dot is-success"></span>
            <div><p class="ds-feed-title">Proyek dibuat</p><p class="ds-feed-sub">Ayu Lestari</p></div>
            <time class="ds-feed-time">12 Jan 2026 09.12</time>
          </li>
        </ul>
      </div>
    </div>
    <div class="ds-form-actions">
      <a class="btn" href="#">Kembali ke Proyek</a>
      <div>
        <button type="button" class="btn btn-ghost is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>Hapus</button>
        <a class="btn btn-primary" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg>Ubah proyek</a>
      </div>
    </div>
  </section>
</div>
```

Aturan:

- Pertahankan identitas data tetap terlihat saat halaman bergulir (kode di judul).
- Urutkan riwayat dari yang terbaru dan tampilkan tanggal absolut; waktu relatif ("2 jam lalu") masuk ke `title`, bukan pengganti tanggal.
- Tautan ke halaman asal membawa `returnUrl` lokal; jangan memakai `history.back()`. Lihat [Alur kerja](./workflows.md).

## Halaman form buat dan ubah

Urutan: kepala halaman, ringkasan galat bila ada, satu permukaan berisi fieldset, grup opsional, lalu footer form. Tata letak yang sama melayani buat dan ubah; hanya judul dan label tombol yang berganti ("Proyek baru" dan "Buat proyek", "Ubah proyek" dan "Simpan perubahan"). Aturan lengkap (waktu validasi, guard perubahan, multi-langkah) ada di [Pola form](./forms-pattern.md).

```html preview title="Halaman form dengan galat"
<div class="ds-page">
  <header class="ds-page-header"><div><h1 class="ds-page-title">Proyek baru</h1></div></header>
  <div class="ds-error-summary" role="alert" tabindex="-1">
    <h2>Proyek belum tersimpan</h2>
    <p>Perbaiki 1 isian di bawah.</p>
    <ul><li><a href="#pp-form-budget">Isi anggaran dengan angka, misalnya 48500 atau 48500.50.</a></li></ul>
  </div>
  <section class="ds-surface">
    <div class="ds-card-body is-roomy">
      <div class="ds-form">
        <fieldset class="ds-fieldset">
          <legend>Detail proyek</legend>
          <div class="ds-field-grid">
            <div class="ds-field">
              <label for="pp-form-name">Nama</label>
              <input id="pp-form-name" class="input" value="Sensor gudang" required>
            </div>
            <div class="ds-field">
              <label for="pp-form-budget">Anggaran</label>
              <input id="pp-form-budget" class="input" inputmode="decimal" value="48 juta" aria-invalid="true" aria-describedby="pp-form-budget-hint pp-form-budget-error">
              <p id="pp-form-budget-hint" class="ds-hint">Angka dengan titik desimal, misalnya 48500.50.</p>
              <p id="pp-form-budget-error" class="ds-field-error">Isi anggaran dengan angka, misalnya 48500 atau 48500.50.</p>
            </div>
          </div>
        </fieldset>
        <details class="ds-optional-group">
          <summary>Informasi tambahan <small>opsional</small></summary>
          <div class="ds-field-grid">
            <div class="ds-field is-wide">
              <label for="pp-form-notes">Catatan</label>
              <textarea id="pp-form-notes" class="textarea" rows="2"></textarea>
            </div>
          </div>
        </details>
      </div>
    </div>
    <div class="ds-form-actions">
      <a class="btn" href="#" data-ds-guard-skip>Batal</a>
      <div>
        <button type="button" class="btn">Simpan dan tambah lagi</button>
        <button type="button" class="btn btn-primary">Buat proyek</button>
      </div>
    </div>
  </section>
</div>
```

Aturan:

- Satu tombol utama, di sisi akhir footer; Batal di sisi awal, tidak pernah tombol utama.
- Pakai `.ds-field-grid` untuk dua kolom; di bawah 640px menjadi satu kolom.
- Setelah simpan berhasil, redirect dan tampilkan toast (Post/Redirect/Get), lihat [Alur kerja](./workflows.md).

## Dasbor

Urutan: kepala halaman dengan baris eyebrow, satu baris tile KPI, lalu kartu (grafik, feed aktivitas, tabel singkat). Dasbor menjawab "apa yang butuh saya?" lebih dulu: taruh yang butuh tindakan sebelum total.

```html preview title="Dasbor"
<div class="ds-page">
  <header class="ds-page-header is-portal">
    <div>
      <p class="ds-eyebrow">Senin, 02 Nov 2026</p>
      <h1 class="ds-page-title">Ringkasan</h1>
    </div>
  </header>
  <div class="ds-kpis">
    <div class="ds-kpi is-primary">
      <div class="ds-kpi-top"><span class="ds-kpi-label">Proyek berjalan</span><span class="ds-kpi-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg></span></div>
      <p class="ds-kpi-value">24</p>
      <p class="ds-kpi-sub">3 dimulai minggu ini</p>
    </div>
    <a class="ds-kpi is-warning" href="#">
      <div class="ds-kpi-top"><span class="ds-kpi-label">Menunggu persetujuan</span><span class="ds-kpi-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-clock"></use></svg></span></div>
      <p class="ds-kpi-value">5</p>
      <p class="ds-kpi-sub">Terlama menunggu 4 hari. Buka daftar.</p>
    </a>
    <a class="ds-kpi is-error" href="#">
      <div class="ds-kpi-top"><span class="ds-kpi-label">Faktur lewat tempo</span><span class="ds-kpi-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg></span></div>
      <p class="ds-kpi-value">2</p>
      <p class="ds-kpi-sub">INV-2026-0418 dan 1 lainnya</p>
    </a>
  </div>
  <div class="ds-grid-2">
    <article class="ds-card">
      <header class="ds-card-head"><h2>Faktur per hari</h2><p>29–30 Okt 2026</p></header>
      <div class="ds-card-body">
        <svg class="ds-chart" viewBox="0 0 200 90" role="img" aria-label="Faktur: 29 Oktober 38, 30 Oktober 21.">
          <line class="ds-grid-line" x1="10" x2="200" y1="80" y2="80"/>
          <g><title>29 Okt: 38 faktur</title><rect class="ds-bar s-success" x="40" y="10" width="50" height="70"/></g>
          <g><title>30 Okt: 21 faktur</title><rect class="ds-bar s-success" x="110" y="42" width="50" height="38"/></g>
          <text x="65" y="88" text-anchor="middle">29 Okt</text>
          <text x="135" y="88" text-anchor="middle">30 Okt</text>
        </svg>
      </div>
    </article>
    <article class="ds-card">
      <header class="ds-card-head"><h2>Aktivitas terbaru</h2></header>
      <div class="ds-card-body is-flush">
        <ul class="ds-feed">
          <li>
            <span class="ds-feed-dot is-success"></span>
            <div><p class="ds-feed-title">INV-2026-0419 lunas</p><p class="ds-feed-sub">Mei Tanaka · 2.480,00</p></div>
            <time class="ds-feed-time">14.30</time>
          </li>
          <li>
            <span class="ds-feed-dot is-error"></span>
            <div><p class="ds-feed-title">Pembayaran gagal: kartu ditolak</p><p class="ds-feed-sub">Sofia Marquez · INV-2026-0420</p></div>
            <time class="ds-feed-time">13.05</time>
          </li>
        </ul>
      </div>
    </article>
  </div>
</div>
```

Aturan:

- Paling banyak 4 tile KPI dalam satu baris; tiap tile berisi satu angka, satu label, dan satu baris konteks. Tile yang mengarah ke suatu tempat berupa tautan.
- Setiap grafik punya `role="img"` dan `aria-label` yang menyebut angka pentingnya; alternatif berupa [tabel](./table.md) tersedia dalam satu klik.
- Tanpa gradien dan dekorasi. Warna hanya menandai status.

## Pengaturan

Halaman pengaturan mengelompokkan opsi dalam fieldset di satu permukaan. Opsi berlaku saat disimpan, bukan seketika, kecuali halaman menyatakan "Perubahan berlaku seketika". Kelompokkan opsi terkait di bawah satu legend; jelaskan tiap opsi dalam satu baris di bawah labelnya.

```html preview title="Halaman pengaturan"
<div class="ds-page">
  <header class="ds-page-header"><div><h1 class="ds-page-title">Notifikasi</h1><p class="ds-page-desc">Pilih apa yang sampai ke Anda dan lewat mana.</p></div></header>
  <section class="ds-surface">
    <div class="ds-card-body is-roomy">
      <div class="ds-form">
        <fieldset class="ds-fieldset">
          <legend>Email</legend>
          <label class="ds-check-row">
            <input type="checkbox" class="checkbox" checked>
            <span><strong>Faktur lunas</strong><small>Satu email saat pelanggan melunasi faktur.</small></span>
          </label>
          <label class="ds-check-row">
            <input type="checkbox" class="checkbox">
            <span><strong>Ringkasan mingguan</strong><small>Setiap Senin pukul 08.00.</small></span>
          </label>
        </fieldset>
        <fieldset class="ds-fieldset">
          <legend>Bahasa</legend>
          <div class="ds-field">
            <label for="pp-set-lang">Bahasa antarmuka</label>
            <select id="pp-set-lang" class="select"><option>English</option><option>Bahasa Indonesia</option></select>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="ds-form-actions">
      <a class="btn" href="#" data-ds-guard-skip>Batal</a>
      <div><button type="button" class="btn btn-primary">Simpan perubahan</button></div>
    </div>
  </section>
</div>
```

Aturan:

- Pengaturan yang merusak (hapus akun, cabut kunci) berada di permukaan sendiri di bagian bawah, dengan dialog konfirmasi.
- Rahasia ditampilkan sekali lalu disamarkan; sediakan Salin di samping nilainya.
- Pakai [Switch](./switch.md) hanya untuk opsi yang berlaku seketika; pakai checkbox di form yang punya tombol Simpan.

## Masuk

Satu panel, satu tugas: judul, satu kalimat, form, satu tombol utama, satu baris bantuan. Galat tampil di catatan `role="alert"` di atas isian dan tidak pernah menyebut mana yang salah, email atau password.

```html preview title="Panel masuk"
<div class="ds-auth-panel">
  <h1 class="ds-auth-title">Masuk ke Northwind Portal</h1>
  <p class="ds-auth-subtitle">Gunakan akun yang dibuat oleh administrator Anda.</p>
  <form class="ds-auth-form" novalidate>
    <div class="ds-note is-error" role="alert" tabindex="-1">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>
      <p>Email atau password tidak sesuai. Periksa keduanya lalu coba lagi.</p>
    </div>
    <div class="ds-field">
      <label for="pp-in-email">Email</label>
      <input id="pp-in-email" type="email" class="input" autocomplete="username" autocapitalize="none" spellcheck="false" value="ayu.lestari@example.com">
    </div>
    <div class="ds-field">
      <label for="pp-in-pass">Password</label>
      <div class="ds-password">
        <input id="pp-in-pass" type="password" class="input" autocomplete="current-password">
        <button type="button" class="ds-password-toggle" data-ds-password-toggle aria-controls="pp-in-pass" aria-pressed="false" aria-label="Tampilkan password">
          <svg class="ds-icon" data-ds-password-icon="hidden" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>
          <svg class="ds-icon" data-ds-password-icon="shown" aria-hidden="true" hidden><use href="#ds-icon-eye-off"></use></svg>
        </button>
      </div>
    </div>
    <label class="ds-check-row"><input type="checkbox" class="checkbox checkbox-primary"><span><strong>Ingat saya</strong></span></label>
    <button type="button" class="btn btn-primary">Masuk</button>
  </form>
  <p class="ds-auth-note">Lupa password? Hubungi administrator Anda.</p>
</div>
```

Aturan:

- Atur `autocomplete="username"` dan `current-password` agar pengelola password bekerja; jangan blokir tempel.
- Tanpa gradien atau ilustrasi di sisi form; gambar hero hanya di kolom hero terpisah milik [Auth layout](./auth-layout.md) dan disembunyikan di bawah 1024px.
- Setelah 5 percobaan gagal tampilkan pesan pembatasan dengan lama tunggu, bukan galat umum.

## Keadaan kosong pertama

Halaman yang belum punya data adalah kesempatan untuk memulai, bukan galat. Tampilkan ikon, satu kalimat tentang apa yang akan ada di sini, dan satu aksi utama. Jangan tampilkan filter, tabel kosong, atau pager.

```html preview title="Keadaan kosong pertama"
<div class="ds-page">
  <header class="ds-page-header"><div><h1 class="ds-page-title">Faktur</h1></div></header>
  <div class="ds-empty is-boxed">
    <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-receipt"></use></svg></span>
    <h2>Belum ada faktur</h2>
    <p>Faktur yang Anda buat tampil di sini beserta status dan tanggal jatuh temponya.</p>
    <a class="btn btn-primary btn-sm" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>Buat faktur</a>
  </div>
</div>
```

Bedakan tiga keadaan kosong: pertama kali (data belum ada, tawarkan aksi buat), tanpa hasil (filter tidak cocok, tawarkan "Hapus filter"), dan tanpa akses (jelaskan siapa yang bisa memberi akses). Lihat [Empty state](./empty-state.md).

## Halaman galat

Halaman galat menyatakan apa yang terjadi dan ke mana pergi berikutnya, dalam satu kalimat dan satu tombol utama. Pesan sistem, SQL, dan jejak tumpukan tidak pernah tampil. Tampilkan Request ID agar dukungan bisa menemukan entri log. Halaman memakai `.ds-empty` dengan `<h1>`.

| Kode | Kalimat |
| --- | --- |
| 400 | Permintaan tidak dapat diproses. Muat ulang halaman lalu coba lagi. |
| 403 | Anda tidak punya akses ke halaman ini. |
| 404 | Halaman atau data tidak ditemukan. |
| 429 | Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi. |
| 500 | Terjadi kesalahan saat memproses permintaan Anda. |

```html preview title="Halaman galat"
<div class="ds-empty is-boxed">
  <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-alert"></use></svg></span>
  <h1>Halaman atau data tidak ditemukan.</h1>
  <p>Tautan mungkin sudah kedaluwarsa, atau datanya sudah dihapus.</p>
  <a class="btn btn-primary btn-sm" href="#">Kembali ke ringkasan</a>
  <p class="ds-text-subtle">Request ID: <span class="ds-id">0HN7K2M9QX4B3:00000001</span></p>
</div>
```

```csharp
app.UseExceptionHandler("/Error");
app.UseStatusCodePagesWithReExecute("/Error/{0}");
```

## Perilaku responsif

| Lebar | Yang berubah |
| --- | --- |
| 640px ke bawah | Kepala halaman menumpuk; tabel menjadi kartu berlabel; `.ds-field-grid` satu kolom; footer form menumpuk dengan aksi utama di atas; input 16px agar iOS tidak memperbesar halaman |
| Di bawah 1024px | Sidebar menjadi drawer dari sisi awal; hero halaman masuk disembunyikan |
| 1024px ke atas | Sidebar tetap 16rem, bisa diringkas ke rail 4,75rem; padding halaman menjadi 2rem |
| 1180px ke bawah | `.ds-toolbar` menjadi satu kolom; kelompok aksi pindah ke baris sendiri |

Uji tiap halaman di 360px, 768px, dan 1280px, di tema terang dan gelap, dalam bahasa Inggris dan Indonesia.

## Penggunaan

- Pakai tepat satu `<h1>` per halaman dan jangan melompati level judul.
- Pakai satu tombol utama per kepala atau footer.
- Taruh tabel dan form di `.ds-surface` atau `.ds-card`.
- Taruh export di sisi awal dan import atau buat baru di sisi akhir toolbar.
- Jangan memakai gradien, kaca, atau dekorasi di halaman masuk dan dasbor.
- Jangan memakai `history.back()` untuk tautan Kembali; pakai `returnUrl` lokal.
