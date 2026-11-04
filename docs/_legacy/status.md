---
title: Status, pill dan tag
group: Komponen
order: 4
summary: Pill untuk status alur kerja, status rekaman untuk master data, tag, badge lingkungan, dan aturan bahwa kata yang membawa makna, bukan warna.
source: TPS Styles/app.css L3561–3577, L1560–1577, L3376–3414, L521–530; Helpers/Fmt.cs (StatusUi); DESIGN.md bagian Teks dan petunjuk
---

Status memberi tahu apa yang terjadi dan apa yang harus dikerjakan. Kata di layar yang membawa makna; warna, titik, dan tint hanya mendukungnya (WCAG 1.4.1). Operator yang buta warna atau membaca hasil cetak harus tetap paham.

TPS punya tiga sistem status: badge daisyUI, `.pt-pill`, dan `.master-status`. DS menyatukannya menjadi `.ds-pill` untuk status alur kerja (dokumen, pengiriman, siaran) dan `.ds-status` untuk status rekaman (Aktif, Nonaktif, Terkunci).

## Pill status {#pill}

Pill = titik + kata, 12 px, tebal 650. Pakai untuk keadaan yang berubah seiring proses. Jangan pakai untuk kategori atau hitungan; itu tugas tag.

```html preview title="Nada pill"
<div class="ds-actions is-start">
  <span class="ds-pill is-success">Selesai di Bea Cukai</span>
  <span class="ds-pill is-info">Menunggu verifikasi</span>
  <span class="ds-pill is-warning">Hasil belum pasti</span>
  <span class="ds-pill is-error">Ditolak Bea Cukai</span>
  <span class="ds-pill is-primary">Terpilih</span>
  <span class="ds-pill is-neutral">Draft</span>
</div>
```

```html preview title="Outline, live, plain"
<div class="ds-actions is-start">
  <span class="ds-pill is-info is-outline">Terjadwal 12 Nov 2026 08.00 WIB</span>
  <span class="ds-pill is-neutral is-outline">Dibatalkan</span>
  <span class="ds-pill is-success is-live">Tayang</span>
  <span class="ds-pill is-neutral is-plain">Belum dikirim</span>
</div>
```

### Varian

| Kelas | Pakai untuk |
| --- | --- |
| `ds-pill is-success` | Selesai, aktif, tayang |
| `ds-pill is-warning` | Perlu dicek: hasil belum pasti, gangguan layanan, akses belum mulai |
| `ds-pill is-error` | Gagal atau ditolak; selalu sebut penyebab di halaman detail |
| `ds-pill is-info` | Sedang berjalan atau menunggu pihak lain |
| `ds-pill is-primary` | Pilihan atau penanda merek, bukan hasil proses |
| `ds-pill is-neutral` | Belum mulai atau sudah di luar alur (Draft, Lewat aplikasi lain) |
| `.is-outline` | Terdaftar tetapi belum aktif, terjadwal, dibatalkan: tepi saja, tanpa tint |
| `.is-live` | Titik berkedip 1.2 detik untuk keadaan yang sedang berlangsung (Tayang) |
| `.is-plain` | Tanpa titik, saat pill sudah berdampingan dengan ikon |

### State dan perilaku

Pill tidak interaktif. Penjelasan panjang ada di halaman detail; `title` atau tooltip hanya tambahan, bukan satu-satunya tempat informasi. Kedipan `.is-live` berhenti di bawah `prefers-reduced-motion: reduce`.

### Razor

Peta enum ke `(label, Tone)` ditulis sekali, di satu tempat, lalu dipakai oleh daftar, detail, dan filter.

```cshtml
@{
    var (label, tone) = Model.Status switch
    {
        SubmissionStatus.Confirmed => ("Selesai di Bea Cukai", Tone.Success),
        SubmissionStatus.Rejected  => ("Ditolak Bea Cukai",    Tone.Error),
        SubmissionStatus.Unknown   => ("Hasil belum pasti",    Tone.Warning),
        _                          => ("Draft",                Tone.Neutral),
    };
}
<ds-pill tone="@tone">@label</ds-pill>
<ds-pill tone="Success" live>Tayang</ds-pill>
<ds-pill tone="Info" outline>Terjadwal</ds-pill>
```

**Token.** `--ds-tone` (diatur oleh `.is-success`, `.is-warning`, `.is-error`, `.is-info`, `.is-primary`, `.is-neutral`), `--ds-radius-full`.

**Asal TPS.** `.pt-pill` di `Styles/app.css` L3561–3577.

## Tag {#tag}

Label kecil tanpa titik untuk kategori, paket, atau hitungan: "Trial", "3 tangki". Lebih tenang dari pill dan tidak menyatakan proses.

```html preview title="Tag"
<div class="ds-actions is-start">
  <span class="ds-tag">Pemasukan</span>
  <span class="ds-tag is-info">Trial</span>
  <span class="ds-tag is-success">Produksi</span>
  <span class="ds-tag is-warning">Segera berakhir</span>
  <span class="ds-tag is-error">Kedaluwarsa</span>
  <span class="ds-tag is-self">Anda</span>
</div>
```

| Kelas | Pakai untuk |
| --- | --- |
| `ds-tag` | Kategori netral, paket, hitungan |
| `ds-tag is-success`, `is-warning`, `is-error`, `is-info` | Penanda bernada; kata tetap menjelaskan sendiri |
| `ds-tag is-self` | Menandai pengguna yang sedang masuk di dalam daftar: "Anda" |

```cshtml
<ds-tag tone="Info">Trial</ds-tag>
<ds-tag>Pemasukan</ds-tag>
```

## Status rekaman {#rekaman}

Untuk baris master data: tangki, pelanggan, pengguna. Bentuknya kotak bersudut kecil, bukan kapsul, supaya pembaca membedakannya dari status alur kerja. Baris `.ds-usage` di bawahnya menyatakan pemakaian.

```html preview title="Status rekaman"
<table class="table">
  <thead><tr><th>Tangki</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>T-01</td><td><span class="ds-status is-active">Aktif</span><span class="ds-usage">dipakai 12 dokumen</span></td></tr>
    <tr><td>T-02</td><td><span class="ds-status is-inactive">Nonaktif</span><span class="ds-usage">tidak dipakai</span></td></tr>
    <tr><td>T-03</td><td><span class="ds-status is-locked">Terkunci: sedang dikuras</span></td></tr>
    <tr><td>T-04</td><td><span class="ds-status is-provisioning">Provisioning</span></td></tr>
  </tbody>
</table>
```

| Kelas | Gaya | Pakai untuk |
| --- | --- | --- |
| `ds-status is-active` | Teks hijau, tint 8% | Rekaman dipakai |
| `ds-status is-inactive` | Teks biasa di `base-200` | Rekaman dimatikan |
| `ds-status is-locked` | Teks peringatan, boleh membungkus | Rekaman terkunci; tulis alasannya |
| `ds-status is-provisioning` | Tepi 1 px, tanpa tint | Sedang disiapkan |
| `ds-usage` | 13 px, warna `--ds-subtle` | Baris pemakaian di bawah status |

## Badge Live {#live}

`.ds-live-badge` menandai lingkungan Live di Web Portal. Titik `.ds-live-dot` berdenyut dan badge berpendar pelan; semua gerak berhenti di bawah `prefers-reduced-motion: reduce`, dan kata "Live" tetap terbaca.

```html preview title="Badge Live"
<span class="ds-live-badge"><span class="ds-live-dot" aria-hidden="true"></span>Live</span>
```

## Badge mode di sidebar {#mode}

Di atas permukaan berwarna (sidebar), mode dibedakan lewat isi: Live terisi penuh, Simulator dan Demo hanya tepi. Bedanya terbaca dari kata dan bentuk, bukan dari hue.

```html preview title="Mode sidebar"
<div class="ds-actions is-start" style="background: var(--color-secondary); color: var(--color-secondary-content); padding: 1rem; border-radius: var(--ds-radius-box)">
  <span class="ds-mode-badge" data-mode="live">Live</span>
  <span class="ds-mode-badge" data-mode="simulator">Simulator</span>
  <span class="ds-mode-badge" data-mode="demo">Demo</span>
</div>
```

> [!NOTE]
> Di mode Simulator, kata "Bea Cukai" pada label status diganti "simulator": "Selesai di simulator", "Ditolak simulator". Operator tidak boleh mengira data uji sudah sampai ke Bea Cukai.

## Badge daisyUI {#daisyui}

`.badge` bawaan daisyUI tetap bisa dipakai untuk hitungan dan penanda kecil. DS memperbaiki warna varian soft agar teks mencapai 4.5:1 di atas tint:

| Kelas | Warna teks |
| --- | --- |
| `badge-soft badge-error` | `--ds-error-text` |
| `badge-soft badge-warning`, `alert-soft alert-warning` | `--ds-warning-text` |
| `badge-soft badge-info`, `alert-soft alert-info` | `--ds-link` |
| `badge badge-sm` | 12 px, tinggi minimum 24 px |

Untuk status alur kerja, pakai `.ds-pill`, bukan `.badge`.

## Pemetaan status TPS {#pemetaan}

Contoh kata dan nada yang baik: `StatusUi` di TPS. Label menjelaskan apa yang terjadi dan menyebut Bea Cukai.

| Nilai | Label | Nada |
| --- | --- | --- |
| `null` | Belum dikirim | Neutral |
| `Draft` | Draft | Neutral |
| `Sending` | Sedang mengirim | Info |
| `Accepted` | Menunggu verifikasi | Info |
| `Confirmed` | Selesai di Bea Cukai | Success |
| `Unknown` | Hasil belum pasti | Warning |
| `Fault` | Gangguan layanan | Warning |
| `Rejected` | Ditolak Bea Cukai | Error |
| `FailedBeforeSend` | Belum terkirim | Error |
| `NotFound` | Tidak tercatat | Warning |
| `ConfirmedDuplicate` | Double di Bea Cukai | Error |
| `ReportedOutside` | Lewat aplikasi lain | Neutral |

**Aturan kata.**

- Label menyebut apa yang terjadi, bukan nama teknis. Nama layanan (CekDataTerkirim, SOAP, XML) hanya muncul di riwayat dan panel XML.
- Kalimat panjang ("apa yang terjadi" dan "apa yang dikerjakan") ada di halaman detail, bukan di pill atau filter.
- Filter memakai label berkelompok: Selesai di Bea Cukai, Menunggu verifikasi, Menunggu Bea Cukai, Draft, Gagal ke Bea Cukai, Double di Bea Cukai.
- Nilai enum, kunci filter, dan kolom database tidak berubah saat label diubah.

### Contoh pemetaan di Web Portal

| Objek | Nilai | Tampilan |
| --- | --- | --- |
| Tenant | `Active` | `ds-pill is-success` |
| Tenant | `Provisioning` | `ds-pill is-info is-outline` |
| Tenant | lainnya | `ds-pill is-neutral` |
| Akses | `Active` | `ds-pill is-success` |
| Akses | `Expired` | `ds-pill is-error` |
| Akses | `NotStarted` | `ds-pill is-warning` |
| Akses | `Suspended` | `ds-pill is-neutral` |
| Siaran | Tayang | `ds-pill is-success is-live` |
| Siaran | Terjadwal | `ds-pill is-info is-outline` |

## Jangan

- Jangan mewarnai status tanpa kata. Titik berwarna sendirian tidak lolos 1.4.1.
- Jangan membuat warna baru per status. Pilih salah satu dari enam nada.
- Jangan memakai pill untuk kategori; pakai `.ds-tag`.
- Jangan menaruh penjelasan penting hanya di `title` atau tooltip.
