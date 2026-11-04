---
title: Language switcher
group: components
category: navigation
order: 8
summary: Switch between English and Bahasa Indonesia with endonyms, lang and hreflang on every link, a current state, and a remembered choice that works with ASP.NET Core request localization.
---

The language switcher lets people choose the language of the interface. Each language is written in its own language (endonym): **English** and **Bahasa Indonesia**, never "Indonesian" in English and never a flag, because a flag stands for a country, not a language. Use it in the navbar, the footer or the account settings of any product that ships in more than one language. For 5 or more languages use the menu form.

There are three ways to carry the choice to the server, and the page documents all of them: **URL segment** (`/en/pricing`, `/id/pricing`; best for public sites and SEO), **query string plus remembered cookie** (apps behind a sign-in), and **POST with a cookie** (no JavaScript needed, no language in the URL).

## Examples

### Segmented links

Links are the right element: each language is a place with its own URL. The current language has `aria-current="true"`; every link has `lang` (so screen readers pronounce the name correctly) and `hreflang`. The `data-ds-language-remember` attribute makes the browser remember the choice in the culture cookie when a link is followed.

```html preview title="Segmented language switcher"
<nav class="ds-segmented ds-language-switcher" aria-label="Language" data-ds-segmented data-ds-language-remember>
  <a href="#" lang="en" hreflang="en" aria-current="true">English</a>
  <a href="#" lang="id" hreflang="id">Bahasa Indonesia</a>
</nav>
```

### Language codes

In a tight bar, use the two-letter codes. The accessible name and tooltip carry the full endonym.

```html preview title="Code form"
<nav class="ds-segmented ds-language-switcher is-sm" aria-label="Language" data-ds-segmented>
  <a href="#" lang="en" hreflang="en" aria-current="true" aria-label="English" title="English">EN</a>
  <a href="#" lang="id" hreflang="id" aria-label="Bahasa Indonesia" title="Bahasa Indonesia">ID</a>
</nav>
```

### Menu

A `details` disclosure with the current endonym on the button and the languages in a list; the current one has a check and `aria-current="true"`. It closes on Escape, outside click and when a language is chosen.

```html preview title="Menu form" 
<div style="min-height:9rem">
<details class="ds-language-switcher is-menu" data-ds-popdown data-ds-language-remember>
  <summary aria-label="Language"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-globe"/></svg><span lang="en">English</span><svg class="ds-icon ds-language-switcher__chevron" aria-hidden="true"><use href="#ds-icon-chevron-down"/></svg></summary>
  <ul class="ds-language-switcher__panel">
    <li><a href="#" lang="en" hreflang="en" aria-current="true"><span>English</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-check"/></svg></a></li>
    <li><a href="#" lang="id" hreflang="id"><span>Bahasa Indonesia</span></a></li>
    <li><a href="#" lang="ms" hreflang="ms"><span>Bahasa Melayu</span></a></li>
  </ul>
</details>
</div>
```

### POST form

A real form with one submit button per language. It works without JavaScript and keeps the language out of the URL. The server sets the culture cookie and redirects back.

```html preview title="Form with buttons"
<form class="ds-segmented ds-language-switcher" method="post" action="#" role="group" aria-label="Language" data-ds-segmented onsubmit="return false">
  <input type="hidden" name="returnUrl" value="/pricing" />
  <button type="submit" name="culture" value="en" lang="en" aria-pressed="true">English</button>
  <button type="submit" name="culture" value="id" lang="id" aria-pressed="false">Bahasa Indonesia</button>
</form>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | none | `--ds-subtle` text on the track |
| Hover | pointer over a language | 6% tint, full-contrast text |
| Pressed | pointer down | 10% tint |
| Focus-visible | keyboard focus | 2px `--ds-focus` ring |
| Current | `aria-current="true"` (links) or `aria-pressed="true"` (buttons) | raised thumb that slides; menu form: tonal fill, bold, check glyph |
| Menu open / closed | `[open]` on the `details` | chevron turns 180°; panel enters with opacity and a 5px move over 160ms |
| Remembered | a link followed with `data-ds-language-remember` | the culture cookie is written before navigation |
| Unavailable language | no translation for the page | omit the link or point it to that language's home page; do not show a dead link |

## Anatomy

- `.ds-segmented.ds-language-switcher` the links form (`nav`) or the form variant (`form`).
- `details.ds-language-switcher.is-menu` the menu form, with `summary` and `ul.ds-language-switcher__panel`.
- Each language: `<a lang hreflang href>` or `<button type="submit" name="culture" value>`.

## Usage

- Write each language in itself: "English", "Bahasa Indonesia", "Bahasa Melayu", "Deutsch". Do not translate the names and do not use flags.
- Set `lang` on every language link and on the page (`<html lang="id">`), and add `<link rel="alternate" hreflang>` for every language in `<head>`.
- Keep the user on the equivalent page: link to the same path in the other language, not to the home page.
- Order languages the same way on every page (default language first).
- Remember the choice. Do not switch language from `Accept-Language` after the user has chosen.
- Do not use a language switcher to change region or currency; use a separate control.
- Test long strings: Indonesian text is about 40% longer than English.

## Accessibility

- The group is named ("Language", localised). Links announce their own language through `lang`, so "Bahasa Indonesia" is read with Indonesian pronunciation inside an English page.
- The current language is `aria-current="true"`, not `"page"`.
- In the code form the full endonym is the accessible name and the tooltip.
- Do not rely on a change of `<html lang>` through JavaScript; the server renders the page in the chosen language and sets `lang`.
- Contrast and hit areas are those of the [Segmented control](./segmented-control.md): 4.5:1, 40px and 44px on touch screens.

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Moves between languages (menu form: to the button, then into the list when open) |
| Enter / Space | Follows the link, or opens and closes the menu |
| Escape | Closes the menu and returns focus to its button |

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

| Attribute | Effect |
| --- | --- |
| `languages` | Comma-separated two-letter codes (default `en,id`) |
| `current` | Current language; default: the request UI culture |
| `href-template` | URL with `{0}` for the code; default: the current URL with `culture` and `ui-culture` |
| `action`, `return-url` | Render the POST form; `return-url` defaults to the current path and query |
| `variant` | `segmented` (default), `code`, `menu` |
| `remember` | Add `data-ds-language-remember` (links and menu forms) |
| `label` | Overrides the group name |

Endonyms for `en` and `id` ship in `DsText` (`language.name.en`, `language.name.id`). For another language, add `DsText.Add("en", new Dictionary<string, string> { ["language.name.ms"] = "Bahasa Melayu" })`; without an entry the .NET native culture name is used.

## Server side

Configure request localization once in `Program.cs`. `UseRequestLocalization` sets `CultureInfo.CurrentCulture` and `CurrentUICulture` per request, which `DsText`, `Fmt` and your own resources follow.

```csharp
var supported = new[] { "en", "id" };

builder.Services.AddLocalization();
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    options.SetDefaultCulture("en")
           .AddSupportedCultures(supported)
           .AddSupportedUICultures(supported);

    // Order matters: the first provider that returns a culture wins.
    options.RequestCultureProviders.Insert(0, new RouteDataRequestCultureProvider { Options = options }); // /en/..., /id/...
    // Then the built-in providers: ?culture=id, the cookie ".AspNetCore.Culture", and the Accept-Language header.
});

var app = builder.Build();
app.UseRequestLocalization();
```

**URL segment.** Route `/{culture}/...` to your pages (`@page "/{culture}/pricing"` or a route convention) and list every language in `<head>`:

```cshtml
<html lang="@CultureInfo.CurrentUICulture.TwoLetterISOLanguageName">
<head>
    <link rel="alternate" hreflang="en" href="/en/pricing" />
    <link rel="alternate" hreflang="id" href="/id/pricing" />
    <link rel="alternate" hreflang="x-default" href="/en/pricing" />
</head>
```

**Cookie.** The built-in `CookieRequestCultureProvider` reads the cookie `.AspNetCore.Culture` (value `c=id|uic=id`). With `data-ds-language-remember` the browser writes it for you when a link is followed (path `/`, one year, `SameSite=Lax`). To write it on the server instead, add a small endpoint that the POST form posts to:

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

The form posts the antiforgery token that `<ds-language-switcher action>` adds; keep antiforgery validation on for the endpoint. Only accept cultures from the supported list, and only redirect to local URLs (open redirect).

> [!NOTE]
> A language cookie is functional, not tracking. Mark it essential (`IsEssential = true`) so a cookie-consent policy does not drop it.

## JavaScript

| Attribute | Effect |
| --- | --- |
| `data-ds-segmented` | Sliding thumb for the segmented and form variants |
| `data-ds-language-remember` | On a link group or a menu: following a link writes the culture cookie (`c=xx\|uic=xx`, one year) and saves `<prefix>-language` in `localStorage`. `="storage"` saves only in `localStorage` |
| `data-ds-language-cookie="name"` | Cookie name to write (default `.AspNetCore.Culture`) |
| `details[data-ds-popdown]` | Menu form: closes on Escape, outside click, focus leaving and link choice |

Event: `ds:language:change` with `detail.language`, dispatched on the group before navigation. `DS.language.current()` returns the page language, `DS.language.remembered()` the one saved on this device. Interface strings of the design-system scripts follow `<html lang>`; `DS.addMessages()` adds more languages.

## Tokens

`--color-base-100`, `--color-base-200`, `--color-base-300`, `--color-base-content`, `--ds-subtle`, `--ds-quiet`, `--ds-popover`, `--ds-focus`, `--ds-shadow-menu`, `--ds-radius-lg`, `--ds-radius-box`, `--ds-z-menu`, `--ds-enter-offset`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-primary-soft`, `--ds-duration-fast`, `--ds-duration-quick`, `--ds-duration-spring`, `--ds-ease-emphasized`, `--ds-ease-spring`.

## Native and daisyUI

Built from native links, buttons, a form and a `details`. The segmented forms reuse the [Segmented control](./segmented-control.md). daisyUI's `select` is not used because the endonyms of a language list must be visible without opening a native picker; if you need a native `<select>`, give each `<option>` a `lang` attribute and navigate on change.
