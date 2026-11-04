---
title: Bahasa dan konten
group: Konten
order: 1
summary: Aturan teks antarmuka berbahasa Indonesia: label, status, galat, angka, tanggal, identitas, huruf kapital, dan helper C# yang menjaganya seragam.
source: TPS DESIGN.md bagian Teks dan petunjuk, Tipografi, Kalender dan waktu, Konvensi penamaan; Helpers/Fmt.cs
---

Operator terminal membaca antarmuka sambil bekerja. Teks yang baik menyebut apa yang terjadi dan apa yang harus dikerjakan, dengan kata yang sama di setiap halaman, tanpa membuat operator menebak.

Aturan angka dan tanggal tidak ditulis tangan: semuanya lewat helper `Fmt` dan `Wib` supaya layar, ekspor Excel, dan XML menampilkan nilai yang sama persis. Peta lengkapnya ada di [Peta helper C#](#helper).

## Suara {#suara}

Tulis langsung dan mengutamakan operator. Kalimat pendek, kata kerja aktif, objek disebut (No BL, tangki, kapal), akibat disebut sebelum saran.

| Tulis | Jangan |
| --- | --- |
| Tangki T-01 tersimpan. | Data berhasil disimpan ke dalam sistem. |
| Periksa format kapasitas. | Input tidak valid. |
| Anda tidak punya akses ke halaman ini. | Akses ditolak oleh sistem karena otorisasi tidak mencukupi. |
| Data tidak sampai ke Bea Cukai. Aman dikirim ulang. | Terjadi kegagalan pada proses pengiriman data. |

- Pakai bentuk perintah untuk instruksi: "Muat ulang halaman, lalu coba lagi."
- Pakai "Anda" hanya bila perlu menyebut izin atau akun.
- Tanpa basa-basi pembuka ("Mohon", "Perhatian:"), tanpa tanda seru, tanpa emoji.
- Paragraf pengantar di bawah judul halaman dihapus. Bila masih perlu, satu baris.

## Label dan tombol {#tombol}

Kata kerja pada label menyebut akibatnya dan, untuk pengiriman, tujuannya.

```html preview title="Label tombol menurut keadaan dokumen"
<div style="display:grid;gap:1rem">
  <div class="ds-actions is-start">
    <button type="button" class="btn">Simpan draft</button>
    <button type="button" class="btn btn-primary"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>Kirim ke Bea Cukai</button>
  </div>
  <div class="ds-actions is-start">
    <button type="button" class="btn btn-primary"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>Perbaiki &amp; kirim ulang</button>
    <button type="button" class="btn btn-primary"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>Kirim koreksi ke Bea Cukai</button>
  </div>
  <div class="ds-actions is-start">
    <button type="button" class="btn btn-sm"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>Kirim</button>
    <button type="button" class="btn btn-primary btn-sm"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>Kirim semua (4)</button>
  </div>
</div>
```

| Pakai | Jangan | Alasan |
| --- | --- | --- |
| Kirim ke Bea Cukai | Submit, Proses, Kirim data | Tujuan disebut |
| Kirim koreksi ke Bea Cukai | Kirim lagi | Pengeluaran yang sudah diterima lalu diubah |
| Perbaiki & kirim ulang | Kirim ulang | Pengiriman yang gagal: operator tahu ada data yang harus diperbaiki dulu |
| Simpan draft | Simpan | Beda arti dengan kirim |
| Tetap di halaman · Keluar | Ya · Tidak | Jawaban menyebut hasilnya |
| Hapus tangki (di dialog) | Ya, hapus | Label dialog = kata kerja tombol pemicunya |

"Kirim ulang" tanpa objek tidak dipakai sebagai label. Kata pendek **Kirim** dan **Kirim semua (n)** hanya di baris padat (Hasil import), karena dialog konfirmasinya menyebut tujuannya. Satu tombol utama per area, paling kanan; lihat [Tombol](tombol.md).

## Status {#status}

Label status menyebut tujuannya ("Ditolak Bea Cukai", bukan "Ditolak"). Kalimat panjang (apa yang terjadi dan apa yang dikerjakan) ada di detail, bukan di filter atau tabel. Warna hanya mendukung kata; lihat [Status, pill dan tag](status.md).

| Label | Apa yang terjadi | Yang dikerjakan operator | Nada |
| --- | --- | --- | --- |
| Draft | Tersimpan, belum dikirim | Periksa data, lalu kirim ke Bea Cukai | Neutral |
| Menunggu Bea Cukai | Terkirim, belum ada jawaban | Tunggu. Status dicek otomatis | Info |
| Diterima Bea Cukai | Bea Cukai menerima kiriman | Tidak ada | Success |
| Selesai di Bea Cukai | Tercatat di daftar terkirim Bea Cukai | Tidak ada | Success |
| Ditolak Bea Cukai | Bea Cukai menolak dan menyebut alasannya | Perbaiki data, lalu Perbaiki & kirim ulang | Error |
| Gagal ke Bea Cukai | Data tidak sampai ke Bea Cukai | Aman dikirim ulang | Warning |
| Lewat aplikasi lain | BL sudah dilaporkan lewat aplikasi lain | Kirim dari sini hanya untuk koreksi | Neutral |

```html preview title="Pill dengan kalimat tindak lanjut"
<ul class="ds-feed" style="max-width:36rem">
  <li>
    <span class="ds-pill is-error">Ditolak Bea Cukai</span>
    <div><p class="ds-feed-title">BL-2026-00841</p><p class="ds-feed-sub">Alasan Bea Cukai: gudang tujuan tidak sesuai (kode 007). Perbaiki data, lalu kirim ulang.</p></div>
    <time class="ds-feed-time">13.05 WIB</time>
  </li>
  <li>
    <span class="ds-pill is-warning">Gagal ke Bea Cukai</span>
    <div><p class="ds-feed-title">BL-2026-00842</p><p class="ds-feed-sub">Data tidak sampai ke Bea Cukai. Aman dikirim ulang.</p></div>
    <time class="ds-feed-time">13.40 WIB</time>
  </li>
</ul>
```

- Detail pengiriman yang ditolak menampilkan "Alasan Bea Cukai" dengan kata-kata Bea Cukai sendiri. Jangan memparafrasekan alasan itu.
- "Respons Bea Cukai" hanya untuk pengiriman Live. Riwayat simulator memakai "Respons simulator".
- Nilai enum, kunci filter, dan kolom database tidak berubah saat label diganti. Tulis peta enum ke label di satu tempat:

```csharp
public static class StatusText
{
    public static (string Label, Tone Tone, string Next) For(DocStatus status) => status switch
    {
        DocStatus.Draft     => ("Draft", Tone.Neutral, "Periksa data, lalu kirim ke Bea Cukai."),
        DocStatus.Sending   => ("Menunggu Bea Cukai", Tone.Info, "Tunggu. Status dicek otomatis."),
        DocStatus.Accepted  => ("Diterima Bea Cukai", Tone.Success, ""),
        DocStatus.Completed => ("Selesai di Bea Cukai", Tone.Success, ""),
        DocStatus.Rejected  => ("Ditolak Bea Cukai", Tone.Error, "Perbaiki data sesuai alasan, lalu kirim ulang."),
        DocStatus.Failed    => ("Gagal ke Bea Cukai", Tone.Warning, "Data tidak sampai ke Bea Cukai. Aman dikirim ulang."),
        _ => (status.ToString(), Tone.Neutral, ""),
    };
}
```

```cshtml
@{ var (label, tone, next) = StatusText.For(Model.Status); }
<ds-pill tone="@tone">@label</ds-pill>
@if (next.Length > 0) { <p class="ds-text-subtle">@next</p> }
```

## Teks bantuan {#bantuan}

Tulis petunjuk hanya bila format tidak bisa ditebak, paling banyak 60 karakter. Satuan masuk ke label ("Kapasitas (TNE)"), bukan petunjuk. Jangan mengutip nama kolom Excel di teks pengguna.

| Tulis | Jangan |
| --- | --- |
| Huruf kapital, contoh T-01. | Isi kode tangki. |
| 15 atau 16 digit, titik dan strip boleh. | Isi NPWP sesuai kolom NPWP_PEMILIK di berkas Excel. |
| Angka dengan titik desimal, contoh 5000 atau 20.5. | Gunakan angka. |

Nama layanan dan format teknis (CekDataTerkirim, SOAP, XML) hanya muncul di riwayat dan panel XML teknis, tidak di pesan untuk operator.

## Pesan galat {#galat}

Pesan galat singkat dan spesifik: menyebut kolom atau objek, apa yang salah, dan langkah berikutnya. Aturan field dan ringkasan galat ada di [Form dan field](form.md#validasi).

| Kasus | Tulis | Jangan tulis |
| --- | --- | --- |
| Kosong | Kode tangki wajib diisi. | The Code field is required. |
| Format salah | Periksa format kapasitas. Ikuti petunjuk di bawah kolom. | Input string was not in a correct format. |
| Data bentrok | Data diubah orang lain. Muat ulang halaman, lalu ubah lagi. | DbUpdateConcurrencyException |
| Koneksi putus | Sesi berakhir atau koneksi terputus. Muat ulang halaman, lalu coba lagi. | Failed to fetch |
| Layanan menolak | Ditolak Bea Cukai. Alasan Bea Cukai: gudang tujuan tidak sesuai (kode 007). | Terjadi kesalahan. |
| Sistem | Terjadi kesalahan saat memproses permintaan. Request ID: 0HN7K2M9QX4B3 | Teks pengecualian atau SQL |

- Pesan sistem, SQL, dan jejak tumpukan hanya masuk log. Layar menampilkan kalimat pendek dan Request ID supaya admin bisa mencocokkannya.
- Bila layanan luar menjelaskan sendiri alasan penolakan, tampilkan alasan itu apa adanya dan namai sumbernya.
- Peringatan skala (angka tampak jauh dari kebiasaan) menampilkan angka yang diketik pengguna, bukan angka yang sudah dibulatkan.

```html preview title="Galat dengan alasan layanan"
<div class="ds-note is-error" role="alert">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>
  <p>Ditolak Bea Cukai. Alasan Bea Cukai: gudang tujuan tidak sesuai (kode 007). Perbaiki Kode Gudang, lalu kirim ulang.</p>
</div>
```

## Konfirmasi {#konfirmasi}

Judul konfirmasi adalah pertanyaan yang menyebut objeknya. Teks satu kalimat menyebut apa yang hilang atau apa yang tidak bisa ditarik. Label tombol aksi memakai kata kerja yang sama dengan pemicunya.

| Tindakan | Judul | Teks | Label |
| --- | --- | --- | --- |
| Hapus | Hapus tangki T-01? | Tangki dan jadwal pengurasannya ikut hilang. Dokumen yang memakai T-01 tetap tersimpan. | Hapus tangki |
| Kirim | Kirim BL-2026-00841 ke Bea Cukai? | Data yang sudah terkirim tidak bisa ditarik kembali. | Kirim ke Bea Cukai |
| Keluar dari form | Perubahan belum disimpan | Keluar tanpa menyimpan? Isian di halaman ini akan hilang. | Keluar |

Pasang konfirmasi hanya pada tindakan yang tidak bisa dibatalkan. Jangan menanyakan "Apakah Anda yakin?" untuk simpan. Perilaku dialog: [Alur kerja](alur-kerja.md#hapus).

## Keadaan kosong {#kosong}

Satu judul, satu kalimat, paling banyak satu aksi. Data yang memang belum ada berbeda dari hasil pencarian yang kosong: yang pertama mengajak menambah, yang kedua mengajak mengubah filter.

```html preview title="Data kosong dan hasil kosong"
<div class="ds-grid-2">
  <div class="ds-card">
    <div class="ds-empty">
      <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-tank"></use></svg></span>
      <h3>Belum ada tangki</h3>
      <p>Tambahkan tangki pertama. Tangki baru bisa dipilih di dokumen pemasukan.</p>
      <a class="btn btn-primary btn-sm" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>Tambah tangki</a>
    </div>
  </div>
  <div class="ds-card">
    <div class="ds-empty">
      <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-search"></use></svg></span>
      <h3>Tidak ada BL yang cocok</h3>
      <p>Tidak ada BL yang cocok dengan filter. Ubah atau hapus filter.</p>
      <a class="btn btn-ghost btn-sm" href="#">Tampilkan semua BL</a>
    </div>
  </div>
</div>
```

Bila pengguna tidak boleh menambah, jelaskan siapa yang menyiapkan datanya: "Data ini disiapkan saat terminal diaktifkan platform admin."

## Angka {#angka}

Kuantitas memakai titik desimal, tanpa pemisah ribuan, dan satuan terpisah: `1574782 TNE`, `992.5 TNE`. Format ini sama di layar, ekspor Excel, dan XML. Persentase juga memakai titik desimal (`45.67%`). Selisih bertanda: `+45220`, `-746`, `0`.

- Jangan memformat angka dengan budaya aktif atau `ToString("N")`: id-ID akan menulis `1.574.782,5`, terbaca sebagai angka lain di XML.
- Satuan masuk ke `.ds-unit` (12 px, redup) setelah angka, bukan ke dalam angkanya. Angka di tabel rata kanan dengan angka tabular.
- Contoh di teks pengguna tidak boleh terbaca sebagai angka berkelompok. Pakai `1574782` atau `20.5`, bukan `992.676` atau `20.040`.
- Input pengguna dibaca dengan `Fmt.TryParseNumber`: `20.5` diterima, `1,574,782` ditolak.

## Tanggal dan jam {#tanggal}

| Hal | Aturan | Contoh |
| --- | --- | --- |
| Tanggal | id-ID, hari dua digit, bulan tiga huruf (Jan Feb Mar Apr Mei Jun Jul Agu Sep Okt Nov Des) | 25 Jan 2026 |
| Jam di server | Titik antara jam dan menit, sesuai id-ID | 14.30 |
| Zona waktu | Selalu tambah WIB pada waktu | 01 Nov 2026 14.30 WIB |
| Penyimpanan | Simpan UTC, tampilkan WIB (UTC+7, tanpa DST) | `Wib.FromUtc` |
| Rentang angka | En dash tanpa spasi | 1–20 dari 57 data |
| Rentang tanggal | En dash dengan spasi | 01 Nov 2026 – 07 Nov 2026 |
| Kosong | En dash, bukan strip, "N/A", atau "null" | – |

Tanggal tanpa jam tidak memakai WIB. Detik hanya bila perlu (`Fmt.DateTimeSeconds`: 25 Jan 2026 14.30.05).

### Titik, bukan titik dua {#titik}

TPS punya satu ketidakkonsistenan: date-time picker di klien menampilkan "14:30:00" dengan titik dua, sedangkan server mencetak "14.30" dengan titik (pola `HH:mm` di .NET memakai pemisah waktu budaya, dan id-ID memakai titik). Aturan DS: titik di semua teks antarmuka berbahasa Indonesia. Nilai di payload form tetap ISO.

| Tempat | Tampilan | Nilai |
| --- | --- | --- |
| Teks di layar (server) | 01 Nov 2026 14.30 WIB | `Wib.Format(utc)` |
| Teks di picker (klien) | 14.30.05 WIB | tampilan saja |
| Isian form dan payload | `2026-11-01T14:30:00` | ISO lokal WIB; server memanggil `Wib.ToUtc` sebelum menyimpan |

## Identitas {#identitas}

NPWP, kode tangki, No BL, REF_NUMBER, call sign, dan email di daftar pengguna memakai Manrope dengan angka tabular (`.ds-id`, alias `.code`). Monospace hanya untuk XML dan kode literal (`pre.code`). No BL dan REF yang punya halaman tujuan memakai `.ds-link-ref`: biru, selalu bergaris bawah.

```html preview title="Identitas dan kuantitas"
<table class="ds-list-table">
  <thead><tr><th scope="col">No BL</th><th scope="col">Kapal</th><th scope="col" class="ds-num">Kuantitas</th><th scope="col" class="ds-num">Selisih</th></tr></thead>
  <tbody>
    <tr>
      <td data-label="No BL"><a class="ds-link-ref ds-id" href="#">BL-2026-00841</a></td>
      <td data-label="Kapal">MT Sinar Jaya</td>
      <td data-label="Kuantitas" class="ds-num">1574782<span class="ds-unit">TNE</span></td>
      <td data-label="Selisih" class="ds-num">+45220</td>
    </tr>
    <tr>
      <td data-label="No BL"><a class="ds-link-ref ds-id" href="#">BL-2026-00842</a></td>
      <td data-label="Kapal">MT Bintang Timur</td>
      <td data-label="Kuantitas" class="ds-num">992.5<span class="ds-unit">TNE</span></td>
      <td data-label="Selisih" class="ds-num">-746</td>
    </tr>
  </tbody>
</table>
<pre class="code" style="margin-top:1rem">&lt;JML_SATUAN&gt;1574782&lt;/JML_SATUAN&gt;</pre>
```

## Huruf kapital {#kapital}

Pakai sentence case: huruf kapital hanya di awal kalimat dan pada nama diri. Ini berlaku untuk judul halaman, label, tombol, dan judul kolom.

| Hal | Aturan | Contoh |
| --- | --- | --- |
| Judul kolom dan label | Istilah baku ditulis seperti di layanan | Seri Out, No BL, Tgl. BL |
| Di dalam kalimat | Huruf kecil | "Seri out yang sudah dipakai tidak boleh dipakai ulang." |
| Nama diri | Tetap kapital | Bea Cukai, TPS Integration, DJBC |
| Judul baru | Huruf kapital di awal saja | Simpan perubahan, Tambah tangki |

Nama halaman dan dokumen yang sudah baku di produk (Dokumen Pemasukan, Rekap per BL) ditulis persis seperti itu di semua tempat: menu, judul, tautan kembali, dan teks.

## Konsistensi nama {#nama}

Nama produk hidup di satu tempat dan ikut ke semua tempat yang membawanya. Mengubah nama = mengubah semua baris di tabel ini sekaligus. Satu yang tertinggal membuat orang yang menerima serah terima menemukan nama lama dan bertanya apakah itu produk yang sama.

| Yang | Nilai di TPS |
| --- | --- |
| Nama produk, `<title>`, brand sidebar | `TPS Integration` |
| Cookie auth | `.TPSIntegration.Auth` |
| Nama aplikasi DataProtection | `TPSIntegration` |
| Proyek Compose dan image | `tps-integration` |
| Id tema daisyUI | `tps`, `tps-dark` |
| Awalan kunci localStorage dan sessionStorage | `tps-` (`tps-theme`, `tps-nav-groups`, `tps-nav-scroll`) |
| Email admin bawaan | `admin@tpsintegration.local` |

```csharp
public static class Product
{
    public const string Name = "TPS Integration";     // title, brand, teks
    public const string CookieName = ".TPSIntegration.Auth";
    public const string StoragePrefix = "tps";         // HeadOptions.Storage → tps-theme, tps-nav-groups
}

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(o => o.Cookie.Name = Product.CookieName);
builder.Services.AddDataProtection().SetApplicationName("TPSIntegration");
```

```cshtml
<title>@ViewData["Title"] - @Product.Name</title>
<partial name="_DsHead" model='new HeadOptions(Stylesheet: "~/css/app.css", Light: "tps", Dark: "tps-dark", Storage: Product.StoragePrefix)' />
```

## Peta helper C# {#helper}

Setiap aturan angka dan tanggal punya satu helper. Pakai helper itu di Razor, ekspor Excel, dan pembangun XML; jangan memanggil `ToString` dengan format sendiri.

| Aturan | Helper | Contoh | Hasil |
| --- | --- | --- | --- |
| Kuantitas dengan satuan | `Fmt.Qty(decimal?, string?)` | `Fmt.Qty(1574782m, "TNE")` | `1574782 TNE` |
| Kuantitas, kosong jadi – | `Fmt.Qty(decimal?)` | `Fmt.Qty(992.5m)` | `992.5` |
| Angka tanpa en dash (input, XML), paling banyak 4 desimal | `Fmt.Number(decimal?)` | `Fmt.Number(20.5000m)` | `20.5` |
| Selisih bertanda | `Fmt.Diff(decimal?)` | `Fmt.Diff(45220m)` | `+45220` |
| Persentase dari rasio | `Fmt.Percent(decimal?, int decimals = 3)` | `Fmt.Percent(0.4567m)` | `45.67%` |
| Tanggal | `Fmt.Date(DateOnly?)`, `Fmt.Date(DateTime?)` | `Fmt.Date(new DateOnly(2026, 1, 25))` | `25 Jan 2026` |
| Tanggal dan jam | `Fmt.DateTime(DateTime?)` | `Fmt.DateTime(new DateTime(2026, 11, 1, 14, 30, 0))` | `01 Nov 2026 14.30` |
| Waktu dari UTC dalam WIB | `Wib.Format(DateTime?, bool seconds = false)` | `Wib.Format(new DateTime(2026, 11, 1, 7, 30, 0, DateTimeKind.Utc))` | `01 Nov 2026 14.30 WIB` |
| Rentang pager | `Fmt.Range(from, to, total, noun)` | `Fmt.Range(1, 20, 57, "data")` | `1–20 dari 57 data` |
| Teks kosong jadi – | `Fmt.Text(string?)` | `Fmt.Text(null)` | `–` |
| Baca input angka | `Fmt.TryParseNumber(string?, out decimal)` | `Fmt.TryParseNumber("20.5", out var n)` | `true` |

`Fmt.Qty`, `Fmt.Diff`, `Fmt.Percent`, dan `Fmt.Date` mengembalikan `Fmt.Dash` (`–`) untuk `null`; `Fmt.Number` mengembalikan string kosong. Lainnya: `Fmt.DateTimeSeconds`, `Wib.FromUtc`, `Wib.ToUtc`, `Wib.Now`, `Wib.Today`.

```cshtml
<td class="ds-num">@Fmt.Number(row.Quantity)<span class="ds-unit">TNE</span></td>
<td class="ds-num">@Fmt.Diff(row.OutMinusIn)</td>
<td>@Wib.Format(row.UpdatedAtUtc)</td>
<td>@Fmt.Text(row.Vessel)</td>
<p role="status">@Fmt.Range(Model.From, Model.To, Model.Total, "BL")</p>
```

## Jangan

- Jangan menulis angka dengan pemisah ribuan atau koma desimal di layar, ekspor, maupun XML.
- Jangan menampilkan waktu tanpa WIB, atau menyimpan waktu WIB di database.
- Jangan memakai titik dua di teks jam berbahasa Indonesia ("14:30").
- Jangan menulis "Kirim ulang" sebagai label tombol berdiri sendiri.
- Jangan menampilkan teks pengecualian, SQL, atau nama layanan teknis kepada operator.
- Jangan mengutip nama kolom Excel di pesan atau petunjuk.
- Jangan menulis petunjuk untuk field yang formatnya jelas.
- Jangan menulis nama produk di dua tempat yang bisa berbeda.
