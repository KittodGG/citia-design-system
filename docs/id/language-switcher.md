---
title: Language switcher
group: components
category: navigation
order: 8
summary: Beralih antara English dan Bahasa Indonesia dengan endonym, lang dan hreflang, state current, dan pilihan tersimpan untuk request localization ASP.NET Core.
---

Language switcher memungkinkan pengguna memilih bahasa antarmuka. Setiap bahasa ditulis dalam bahasanya sendiri (endonym): **English** dan **Bahasa Indonesia**, jangan pernah "Inggris" atau "Indonesian", dan jangan pakai bendera, karena bendera mewakili negara, bukan bahasa. Pakai di navbar, footer, atau pengaturan akun produk yang tersedia dalam lebih dari satu bahasa. Untuk 5 bahasa atau lebih, pakai bentuk menu.

Ada tiga cara membawa pilihan ke server, dan halaman ini mendokumentasikan ketiganya: **URL segment** (`/en/pricing`, `/id/pricing`; terbaik untuk situs publik dan SEO), **query string plus cookie yang diingat** (aplikasi di balik login), dan **POST dengan cookie** (tanpa JavaScript, tanpa bahasa di URL).

## Examples

### Segmented links

Link adalah elemen yang tepat: setiap bahasa adalah tempat dengan URL sendiri. Bahasa saat ini memakai `aria-current="true"`; setiap link memiliki `lang` (agar screen reader melafalkan nama dengan benar) dan `hreflang`. Atribut `data-ds-language-remember` membuat browser mengingat pilihan di cookie culture saat link diikuti.

```html preview title="Segmented language switcher"
<nav class="ds-segmented ds-language-switcher" aria-label="Bahasa" data-ds-segmented data-ds-language-remember>
  <a href="#" lang="en" hreflang="en" aria-current="true">English</a>
  <a href="#" lang="id" hreflang="id">Bahasa Indonesia</a>
</nav>
```

### Language codes

Di bar yang sempit, pakai kode dua huruf. Nama yang dapat diakses dan tooltip memuat endonym lengkap.

```html preview title="Bentuk kode"
<nav class="ds-segmented ds-language-switcher is-sm" aria-label="Bahasa" data-ds-segmented>
  <a href="#" lang="en" hreflang="en" aria-current="true" aria-label="English" title="English">EN</a>
  <a href="#" lang="id" hreflang="id" aria-label="Bahasa Indonesia" title="Bahasa Indonesia">ID</a>
</nav>
```

### Menu

Disclosure `details` dengan endonym saat ini pada tombol dan daftar bahasa di dalam list; bahasa saat ini memiliki tanda centang dan `aria-current="true"`. Menu menutup saat Escape, klik di luar, dan saat bahasa dipilih.

```html preview title="Bentuk menu" 
<div style="min-height:9rem">
<details class="ds-language-switcher is-menu" data-ds-popdown data-ds-language-remember>
  <summary aria-label="Bahasa"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-globe"/></svg><span lang="en">English</span><svg class="ds-icon ds-language-switcher__chevron" aria-hidden="true"><use href="#ds-icon-chevron-down"/></svg></summary>
  <ul class="ds-language-switcher__panel">
    <li><a href="#" lang="en" hreflang="en" aria-current="true"><span>English</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"/></svg></a></li>
    <li><a href="#" lang="id" hreflang="id"><span>Bahasa Indonesia</span></a></li>
    <li><a href="#" lang="ms" hreflang="ms"><span>Bahasa Melayu</span></a></li>
  </ul>
</details>
</div>
```

### POST form

Form sungguhan dengan satu tombol submit per bahasa. Berfungsi tanpa JavaScript dan menjaga bahasa tetap di luar URL. Server menulis cookie culture lalu mengarahkan kembali.

```html preview title="Form dengan tombol"
<form class="ds-segmented ds-language-switcher" method="post" action="#" role="group" aria-label="Bahasa" data-ds-segmented onsubmit="return false">
  <input type="hidden" name="returnUrl" value="/pricing" />
  <button type="submit" name="culture" value="en" lang="en" aria-pressed="true">English</button>
  <button type="submit" name="culture" value="id" lang="id" aria-pressed="false">Bahasa Indonesia</button>
</form>
```

## States

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak ada | teks `--ds-subtle` di atas track |
| Hover | pointer di atas bahasa | tint 6%, teks kontras penuh |
| Pressed | pointer ditekan | tint 10% |
| Focus-visible | fokus keyboard | focus ring `--ds-focus` 2px |
| Current | `aria-current="true"` (link) atau `aria-pressed="true"` (tombol) | thumb terangkat yang bergeser; bentuk menu: isian tonal, tebal, glyph centang |
| Menu open / closed | `[open]` pada `details` | chevron berputar 180°; panel masuk dengan opasitas dan pergeseran 5px selama 160ms |
| Remembered | link diikuti dengan `data-ds-language-remember` | cookie culture ditulis sebelum navigasi |
| Unavailable language | tidak ada terjemahan untuk halaman | hilangkan link atau arahkan ke beranda bahasa itu; jangan tampilkan link mati |

## Anatomy

- `.ds-segmented.ds-language-switcher` bentuk link (`nav`) atau varian form (`form`).
- `details.ds-language-switcher.is-menu` bentuk menu, dengan `summary` dan `ul.ds-language-switcher__panel`.
- Setiap bahasa: `<a lang hreflang href>` atau `<button type="submit" name="culture" value>`.

## Usage

- Tulis setiap bahasa dalam bahasanya sendiri: "English", "Bahasa Indonesia", "Bahasa Melayu", "Deutsch". Jangan terjemahkan nama dan jangan pakai bendera.
- Set `lang` pada setiap link bahasa dan pada halaman (`<html lang="id">`), lalu tambahkan `<link rel="alternate" hreflang>` untuk setiap bahasa di `<head>`.
- Pertahankan pengguna di halaman yang setara: arahkan ke path yang sama di bahasa lain, bukan ke beranda.
- Urutkan bahasa dengan cara yang sama di setiap halaman (bahasa default lebih dulu).
- Ingat pilihan pengguna. Jangan ganti bahasa berdasarkan `Accept-Language` setelah pengguna memilih.
- Jangan pakai language switcher untuk mengubah wilayah atau mata uang; pakai kontrol terpisah.
- Uji string panjang: teks bahasa Indonesia sekitar 40% lebih panjang daripada bahasa Inggris.

## Accessibility

- Grup diberi nama ("Bahasa", dilokalkan). Link mengumumkan bahasanya sendiri lewat `lang`, sehingga "Bahasa Indonesia" dibaca dengan lafal Indonesia di dalam halaman berbahasa Inggris.
- Bahasa saat ini memakai `aria-current="true"`, bukan `"page"`.
- Pada bentuk kode, endonym lengkap menjadi nama yang dapat diakses dan tooltip.
- Jangan mengandalkan perubahan `<html lang>` lewat JavaScript; server merender halaman dalam bahasa terpilih dan mengatur `lang`.
- Kontras dan area sentuh mengikuti [Segmented control](./segmented-control.md): 4,5:1, 40px, dan 44px di layar sentuh.

| Tombol | Aksi |
| --- | --- |
| Tab / Shift+Tab | Berpindah antar bahasa (bentuk menu: ke tombol, lalu ke dalam daftar saat terbuka) |
| Enter / Space | Membuka link, atau membuka dan menutup menu |
| Escape | Menutup menu dan mengembalikan fokus ke tombolnya |

## Razor

```cshtml
@* Same URL with ?culture=id&ui-culture=id (query string provider); remember writes the cookie *@
<ds-language-switcher languages="en,id" remember />

@* Language in the path: /en/pricing, /id/pricing *@
<ds-language-switcher languages="en,id" current="@lang" href-template="/{0}/pricing" />

@* Menu form, code form *@
<ds-language-switcher languages="en,id,ms" variant="menu" href-template="/{0}/pricing" />
<ds-language-switcher variant="code" href-template="/{0}/pricing" />

@* POST form (cookie pattern): posts culture and returnUrl, includes the antiforgery token *@
<ds-language-switcher action="/culture" return-url="@Context.Request.Path" />
```

| Atribut | Efek |
| --- | --- |
| `languages` | Kode dua huruf dipisah koma (default `en,id`) |
| `current` | Bahasa saat ini; default: UI culture request |
| `href-template` | URL dengan `{0}` untuk kode; default: URL saat ini dengan `culture` dan `ui-culture` |
| `action`, `return-url` | Merender form POST; `return-url` default ke path dan query saat ini |
| `variant` | `segmented` (default), `code`, `menu` |
| `remember` | Menambahkan `data-ds-language-remember` (bentuk link dan menu) |
| `label` | Menimpa nama grup |

Endonym untuk `en` dan `id` tersedia di `DsText` (`language.name.en`, `language.name.id`). Untuk bahasa lain, tambahkan `DsText.Add("en", new Dictionary<string, string> { ["language.name.ms"] = "Bahasa Melayu" })`; tanpa entri, dipakai nama culture native .NET.

## Server side

Konfigurasikan request localization sekali di `Program.cs`. `UseRequestLocalization` mengatur `CultureInfo.CurrentCulture` dan `CurrentUICulture` per request, yang diikuti oleh `DsText`, `Fmt`, dan resource Anda sendiri.

```csharp
var supported = new[] { "en", "id" };

builder.Services.AddLocalization();
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    options.SetDefaultCulture("en")
           .AddSupportedCultures(supported)
           .AddSupportedUICultures(supported);

    // Urutan berpengaruh: provider pertama yang mengembalikan culture menang.
    options.RequestCultureProviders.Insert(0, new RouteDataRequestCultureProvider { Options = options }); // /en/..., /id/...
    // Lalu provider bawaan: ?culture=id, cookie ".AspNetCore.Culture", dan header Accept-Language.
});

var app = builder.Build();
app.UseRequestLocalization();
```

**URL segment.** Arahkan `/{culture}/...` ke halaman Anda (`@page "/{culture}/pricing"` atau route convention) dan daftarkan setiap bahasa di `<head>`:

```cshtml
<html lang="@CultureInfo.CurrentUICulture.TwoLetterISOLanguageName">
<head>
    <link rel="alternate" hreflang="en" href="/en/pricing" />
    <link rel="alternate" hreflang="id" href="/id/pricing" />
    <link rel="alternate" hreflang="x-default" href="/en/pricing" />
</head>
```

**Cookie.** `CookieRequestCultureProvider` bawaan membaca cookie `.AspNetCore.Culture` (nilai `c=id|uic=id`). Dengan `data-ds-language-remember`, browser menuliskannya untuk Anda saat link diikuti (path `/`, satu tahun, `SameSite=Lax`). Untuk menulisnya di server, tambahkan endpoint kecil yang menjadi tujuan POST form:

```csharp
app.MapPost("/culture", (HttpContext http, [FromForm] string culture, [FromForm] string? returnUrl,
                         IOptions<RequestLocalizationOptions> localization) =>
{
    var allowed = localization.Value.SupportedUICultures!.Any(c => c.Name.Equals(culture, StringComparison.OrdinalIgnoreCase));
    if (allowed)
    {
        http.Response.Cookies.Append(
            CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
            new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1), IsEssential = true, SameSite = SameSiteMode.Lax });
    }
    var target = !string.IsNullOrEmpty(returnUrl) && Uri.IsWellFormedUriString(returnUrl, UriKind.Relative) && returnUrl.StartsWith('/') && !returnUrl.StartsWith("//")
        ? returnUrl : "/";
    return Results.LocalRedirect(target);
});
```

Form mengirim token antiforgery yang ditambahkan oleh `<ds-language-switcher action>`; biarkan validasi antiforgery aktif untuk endpoint ini. Terima hanya culture dari daftar yang didukung, dan arahkan ulang hanya ke URL lokal (open redirect).

> [!NOTE]
> Cookie bahasa bersifat fungsional, bukan pelacakan. Tandai sebagai essential (`IsEssential = true`) agar kebijakan cookie-consent tidak membuangnya.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-segmented` | Thumb geser untuk varian segmented dan form |
| `data-ds-language-remember` | Pada grup link atau menu: mengikuti link menulis cookie culture (`c=xx\|uic=xx`, satu tahun) dan menyimpan `<prefix>-language` di `localStorage`. `="storage"` hanya menyimpan di `localStorage` |
| `data-ds-language-cookie="name"` | Nama cookie yang ditulis (default `.AspNetCore.Culture`) |
| `details[data-ds-popdown]` | Bentuk menu: menutup saat Escape, klik di luar, fokus keluar, dan pemilihan link |

Event: `ds:language:change` dengan `detail.language`, dikirim pada grup sebelum navigasi. `DS.language.current()` mengembalikan bahasa halaman, `DS.language.remembered()` bahasa yang tersimpan di perangkat ini. String antarmuka pada script design system mengikuti `<html lang>`; `DS.addMessages()` menambahkan bahasa lain.

## Tokens

`--color-base-100`, `--color-base-200`, `--color-base-300`, `--color-base-content`, `--ds-subtle`, `--ds-quiet`, `--ds-popover`, `--ds-focus`, `--ds-shadow-menu`, `--ds-radius-lg`, `--ds-radius-box`, `--ds-z-menu`, `--ds-enter-offset`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-primary-soft`, `--ds-duration-fast`, `--ds-duration-quick`, `--ds-duration-spring`, `--ds-ease-emphasized`, `--ds-ease-spring`.

## Native and daisyUI

Dibangun dari link native, tombol, form, dan `details`. Bentuk segmented memakai ulang [Segmented control](./segmented-control.md). `select` milik daisyUI tidak dipakai karena endonym dalam daftar bahasa harus terlihat tanpa membuka picker native; jika Anda butuh `<select>` native, beri setiap `<option>` atribut `lang` dan navigasi saat nilainya berubah.
