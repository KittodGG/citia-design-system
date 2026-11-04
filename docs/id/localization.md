---
title: Lokalisasi
group: foundations
order: 10
summary: Bahasa Inggris dan Indonesia sudah bawaan. Cara menambah bahasa di C# dan JavaScript, menyiapkan request localization, memformat tanggal dan angka, dan siap untuk kanan-ke-kiri.
---

Citia DS hadir dalam bahasa Inggris dan Indonesia: string komponen, pesan live region, format tanggal, dan dokumentasi ini. Bahasa lain cukup menambah satu kamus. String berada di tiga tempat yang didaftarkan terpisah: C# (`DsText`), JavaScript (`DS.addMessages`), dan, untuk situs dokumentasi ini, opsi `Languages`.

## Cara kerja

| Lapisan | Sumber | Membaca bahasa dari |
| --- | --- | --- |
| Razor dan tag helper | `DsText.T("pager.next")` | `CultureInfo.CurrentUICulture` (kode dua huruf; fallback ke `en`) |
| JavaScript | `t("combobox.results", { count })` | `configure({ locale })`, jika tidak ada `<html lang>` |
| Tanggal dan angka | `Fmt.*` | `CultureInfo.CurrentCulture` |

Kunci yang hilang jatuh ke bahasa Inggris, lalu ke kuncinya sendiri, sehingga terjemahan parsial tidak pernah menampilkan teks kosong.

## Setup ASP.NET Core

Atur request localization agar culture mengikuti pengguna, lalu tampilkan bahasanya di `<html>`.

```csharp
using Microsoft.AspNetCore.Localization;

var supported = new[] { "en", "id" };

builder.Services.Configure<RequestLocalizationOptions>(o =>
{
    o.SetDefaultCulture("en")
     .AddSupportedCultures(supported)
     .AddSupportedUICultures(supported);
    o.RequestCultureProviders.Insert(0, new CookieRequestCultureProvider());
});

var app = builder.Build();
app.UseRequestLocalization();
```

```cshtml
<html lang="@System.Globalization.CultureInfo.CurrentUICulture.TwoLetterISOLanguageName" data-theme="light">
```

Atribut `lang` menggerakkan helper `t()` di JavaScript dan teknologi bantu. Agar pengguna bisa memilih, tulis cookie culture standar:

```csharp
Response.Cookies.Append(
    CookieRequestCultureProvider.DefaultCookieName,
    CookieRequestCultureProvider.MakeCookieValue(new RequestCulture("id")),
    new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1), SameSite = SameSiteMode.Lax });
```

## Menambah bahasa di C#

Daftarkan kamus saat startup, dengan kunci yang sama seperti bahasa Inggris. Argumen posisional `{0}` bekerja seperti `string.Format`.

```csharp
DsText.Add("ms", new Dictionary<string, string>
{
    ["pager.next"] = "Seterusnya",
    ["pager.previous"] = "Sebelumnya",
    ["pager.page"] = "Halaman {0} daripada {1}",
});
```

Tambahkan `"ms"` ke culture yang didukung di atas. Untuk fitur Anda sendiri, buat `Localization/Strings.<Fitur>.cs` dengan `[ModuleInitializer]` yang memanggil `DsText.Add` untuk tiap bahasa, lalu baca string dengan `DsText.T("fitur.kunci", args)`.

## Menambah bahasa di JavaScript

```js
DS.addMessages({
  ms: {
    "combobox.results": "{count} hasil",
    "toast.close": "Tutup pemberitahuan",
  },
});
DS.configure({ locale: "ms" }); // opsional: jika tidak, <html lang> yang menentukan
```

Panggil `addMessages` sebelum `DS.init()`. Placeholder memakai `{nama}` dan diisi oleh `t("kunci", { nama })`. Kunci mengikuti `<modul>.<kunci>`.

## Situs dokumentasi

Situs dokumentasi mendaftar bahasanya di `appsettings.json`:

```json
"Docs": { "Languages": ["en", "id"], "DefaultLanguage": "en" }
```

Untuk menambah bahasa, tambahkan kodenya ke `Languages`, buat folder `docs/<kode>/` dengan nama file yang sama, dan daftarkan string antarmuka situs. Halaman yang belum ada di suatu bahasa jatuh ke bahasa default.

## Pemformatan

Format nilai untuk manusia dengan culture saat ini; jaga nilai mesin tetap invariant.

| Panggilan | Inggris | Indonesia | Dipakai untuk |
| --- | --- | --- | --- |
| `Fmt.Date(date)` | 25 Jan 2026 | 25 Jan 2026 | Tanggal; nama bulan mengikuti culture (id: Mei, Agu, Okt, Des) |
| `Fmt.DateTime(value)` | 25 Jan 2026 14:30 | 25 Jan 2026 14.30 | Tanggal dan jam 24 jam |
| `Fmt.Decimal(1574782.5m)` | 1,574,782.5 | 1.574.782,5 | Jumlah dan hitungan untuk manusia |
| `Fmt.Number(20.04m)` | 20.04 | 20.04 | Invariant: ekspor, XML, input dengan titik desimal |

Jangan mencampurnya: angka di laporan memakai `Fmt.Decimal`; angka yang sama di CSV atau API memakai `Fmt.Number`. Nilai kosong tampil sebagai en dash.

Di JavaScript, pakai `Intl` dengan locale halaman, bukan format tulisan tangan:

```js
const lang = document.documentElement.lang;
new Intl.NumberFormat(lang, { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(1248500);
new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeStyle: "short" }).format(new Date());
new Intl.RelativeTimeFormat(lang, { numeric: "auto" }).format(-1, "day");
new Intl.PluralRules(lang).select(count);
```

Pakai `toLocaleLowerCase(locale)` dan `Intl.Collator(lang)` untuk huruf dan pengurutan. Helper DS `normalize()` sudah melakukannya untuk pencarian.

## Pemanjangan teks

Bahasa Indonesia 20–40% lebih panjang daripada bahasa Inggris, dan bahasa Jerman atau Finlandia bisa lebih panjang lagi. Sisakan ruang: tanpa lebar tetap pada teks, bungkus secara default, uji dengan bahasa terpanjang. Lihat [Tipografi](./typography.md).

## Pengganti bahasa

Tulis nama tiap bahasa dalam bahasanya sendiri (endonym): **English**, **Bahasa Indonesia**, **Deutsch**. Jangan memakai bendera, karena mewakili negara, bukan bahasa. Beri tiap opsi atribut `lang` sendiri dan `aria-current` pada yang aktif.

```html preview title="Pengganti bahasa"
<nav aria-label="Bahasa" style="display:flex;gap:.5rem">
  <a class="btn btn-sm" href="#" lang="en">English</a>
  <a class="btn btn-sm btn-primary" href="#" lang="id" aria-current="true">Bahasa Indonesia</a>
</nav>
```

## Siap kanan-ke-kiri

DS memakai properti logis (`margin-inline-start`, `padding-inline`, `inset-inline-end`), jadi `dir="rtl"` pada `<html>` mencerminkan tata letak tanpa CSS tambahan. Di kode Anda sendiri:

- Jangan menulis `left` atau `right`; pakai `start` dan `end`, atau properti `inline-*`.
- Cerminkan ikon berarah (panah, chevron), tetapi bukan logo, kontrol media, atau angka.
- Jaga angka dan identifier Latin dalam run terisolasi: `<bdi>` atau `unicode-bidi: isolate`.
- Uji dengan `dir="rtl"` di setiap tata letak, meski belum merilis bahasa RTL.

## Tips menulis

**Inggris.** Sentence case. Label singkat berbentuk perintah ("Save changes", "Add client"). Sebut apa yang terjadi dan langkah berikutnya. Tanpa tanda seru.

**Indonesia.** Formal tetapi lugas: pakai "Anda", bukan "kamu". Pertahankan istilah teknis yang lazim dalam bahasa Inggris (`token`, `class`, `focus ring`, `popover`). Pilih kata kerja pendek ("Simpan", "Hapus", "Kirim") daripada frasa benda. Jangan menerjemahkan kata demi kata; "Rows per page" menjadi "Baris per halaman". Tanggal memakai singkatan bulan (Jan, Feb, Mar, Apr, Mei, Jun, Jul, Agu, Sep, Okt, Nov, Des).

**Keduanya.** Jangan merangkai kalimat dari potongan; beri penerjemah kalimat utuh dengan placeholder (`"Halaman {0} dari {1}"`), karena urutan kata berbeda.

## Panduan

- Taruh setiap string yang terlihat pengguna di balik kunci, di kedua bahasa, dalam perubahan yang sama.
- Jangan menyambung potongan terjemahan atau menaruh markup di dalam string.
- Jangan memformat tanggal dan angka dengan tangan; pakai `Fmt` atau `Intl`.
- Jangan mendeteksi bahasa dari alamat IP; pakai pilihan pengguna, lalu `Accept-Language`.
