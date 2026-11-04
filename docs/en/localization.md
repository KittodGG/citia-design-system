---
title: Localization
group: foundations
order: 10
summary: English and Indonesian are built in. How to add a language in C# and JavaScript, set up request localization, format dates and numbers, and prepare for right-to-left.
---

Citia DS ships in English and Indonesian: component strings, live-region messages, date formats and this documentation. Another language is a dictionary away. Strings live in three places that you register separately: C# (`DsText`), JavaScript (`DS.addMessages`) and, for this documentation site, the `Languages` option.

## How it works

| Layer | Source | Reads the language from |
| --- | --- | --- |
| Razor and tag helpers | `DsText.T("pager.next")` | `CultureInfo.CurrentUICulture` (two-letter code; falls back to `en`) |
| JavaScript | `t("combobox.results", { count })` | `configure({ locale })`, otherwise `<html lang>` |
| Dates and numbers | `Fmt.*` | `CultureInfo.CurrentCulture` |

A missing key falls back to English, then to the key itself, so a partial translation never shows a blank.

## ASP.NET Core setup

Configure request localization so the culture follows the user, then render the language on `<html>`.

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

The `lang` attribute drives the JavaScript `t()` helper and assistive technology. To let the user choose, write the standard culture cookie:

```csharp
Response.Cookies.Append(
    CookieRequestCultureProvider.DefaultCookieName,
    CookieRequestCultureProvider.MakeCookieValue(new RequestCulture("id")),
    new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1), SameSite = SameSiteMode.Lax });
```

## Add a language in C#

Register a dictionary at startup, with the same keys as English. Positional `{0}` arguments work as in `string.Format`.

```csharp
DsText.Add("ms", new Dictionary<string, string>
{
    ["pager.next"] = "Seterusnya",
    ["pager.previous"] = "Sebelumnya",
    ["pager.page"] = "Halaman {0} daripada {1}",
});
```

Add `"ms"` to the supported cultures above. For your own features, create `Localization/Strings.<Feature>.cs` with a `[ModuleInitializer]` that calls `DsText.Add` for each language, then read strings with `DsText.T("feature.key", args)`.

## Add a language in JavaScript

```js
DS.addMessages({
  ms: {
    "combobox.results": "{count} hasil",
    "toast.close": "Tutup pemberitahuan",
  },
});
DS.configure({ locale: "ms" }); // optional: otherwise <html lang> decides
```

Call `addMessages` before `DS.init()`. Placeholders use `{name}` and are filled by `t("key", { name })`. Keys follow `<module>.<key>`.

## Documentation site

The docs site lists its languages in `appsettings.json`:

```json
"Docs": { "Languages": ["en", "id"], "DefaultLanguage": "en" }
```

To add a language, add its code to `Languages`, add a `docs/<code>/` folder with the same file names, and register the site's own interface strings. Pages missing in a language fall back to the default language.

## Formatting

Format values for people with the current culture; keep machine values invariant.

| Call | English | Indonesian | Use for |
| --- | --- | --- | --- |
| `Fmt.Date(date)` | 25 Jan 2026 | 25 Jan 2026 | Dates; month names follow the culture (id: Mei, Agu, Okt, Des) |
| `Fmt.DateTime(value)` | 25 Jan 2026 14:30 | 25 Jan 2026 14.30 | Date and 24-hour time |
| `Fmt.Decimal(1574782.5m)` | 1,574,782.5 | 1.574.782,5 | Amounts and counts shown to people |
| `Fmt.Number(20.04m)` | 20.04 | 20.04 | Culture-invariant: exports, XML, inputs with a dot decimal |

Do not mix them: a figure in a report uses `Fmt.Decimal`; the same figure in a CSV or an API uses `Fmt.Number`. Blank values render as an en dash.

In JavaScript, use `Intl` with the page locale instead of hand-written formats:

```js
const lang = document.documentElement.lang;
new Intl.NumberFormat(lang, { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(1248500);
new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeStyle: "short" }).format(new Date());
new Intl.RelativeTimeFormat(lang, { numeric: "auto" }).format(-1, "day");
new Intl.PluralRules(lang).select(count);
```

Use `toLocaleLowerCase(locale)` and `Intl.Collator(lang)` for case and sorting. The DS helper `normalize()` already does this for search.

## Text expansion

Indonesian runs 20–40% longer than English, and German or Finnish can run longer still. Keep room: no fixed widths on text, wrap by default, test with the longest language. See [Typography](./typography.md).

## Language switcher

Name each language in its own language (endonym): **English**, **Bahasa Indonesia**, **Deutsch**. Do not use flags, which stand for countries, not languages. Mark each option with its own `lang` attribute and set `aria-current` on the active one.

```html preview title="Language switcher"
<nav aria-label="Language" style="display:flex;gap:.5rem">
  <a class="btn btn-sm btn-primary" href="#" lang="en" aria-current="true">English</a>
  <a class="btn btn-sm" href="#" lang="id">Bahasa Indonesia</a>
</nav>
```

## Right-to-left readiness

The DS uses logical properties (`margin-inline-start`, `padding-inline`, `inset-inline-end`), so setting `dir="rtl"` on `<html>` mirrors layout without extra CSS. In your own code:

- Never write `left` or `right`; use `start` and `end`, or `inline-*` properties.
- Mirror directional icons (arrows, chevrons) but not logos, media controls or numerals.
- Keep numbers and Latin identifiers in an isolated run: `<bdi>` or `unicode-bidi: isolate`.
- Test with `dir="rtl"` on every layout, even if you do not ship an RTL language yet.

## Writing tips

**English.** Sentence case. Short imperative labels ("Save changes", "Add client"). Say what happened and what to do next. No exclamation marks.

**Indonesian.** Formal but plain: use "Anda", not "kamu". Keep widely used technical terms in English (`token`, `class`, `focus ring`, `popover`). Prefer a short verb ("Simpan", "Hapus", "Kirim") over a noun phrase. Do not translate word for word; "Rows per page" is "Baris per halaman". Dates use month abbreviations (Jan, Feb, Mar, Apr, Mei, Jun, Jul, Agu, Sep, Okt, Nov, Des).

**Both.** Never build a sentence by joining fragments; give translators the whole sentence with placeholders (`"Page {0} of {1}"`), because word order differs.

## Usage

- Put every user-visible string behind a key, in both languages, in the same change.
- Do not concatenate translated fragments or put markup inside a string.
- Do not format dates and numbers by hand; use `Fmt` or `Intl`.
- Do not detect language from the IP address; use the user's choice, then `Accept-Language`.
