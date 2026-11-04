---
title: API Razor dan C#
group: Referensi
order: 3
summary: Semua tag helper, partial view, dan kelas C# di Citia.DesignSystem beserta parameter dan contohnya.
source: TPS Helpers/Icon.cs, Ui.cs, PortalUi.cs, Fmt.cs, ListSort.cs; Views/Shared/_Toast, _Pager, _SortHeader, _PageSize, _EmptyState
---

Hasil render nyata semua API ini ada di halaman [Contoh Razor](/contoh-razor) situs dokumentasi (kode: `site/Citia.DesignSystem.Docs/Pages/ContohRazor.cshtml`).

Namespace: `Citia.DesignSystem.Icons`, `Citia.DesignSystem.Ui`, `Citia.DesignSystem.Formatting`, `Citia.DesignSystem.TagHelpers`. Daftarkan sekali di `_ViewImports.cshtml` (lihat [Instalasi](./instalasi.md#langkah-3-impor-namespace-dan-tag-helper)).

## Tag helper

| Tag | Atribut | Hasil |
| --- | --- | --- |
| `<ds-icon>` | `name` (wajib), `size` (`xs`, `md`, `lg`, `xl`), `label`, `class`, atribut lain diteruskan ke `<svg>` | SVG inline `class="ds-icon …"`, `aria-hidden="true"` kecuali `label` diisi |
| `<ds-pill>` | `tone` (`Tone`), `live`, `outline`, `plain` | `<span class="ds-pill is-…">` |
| `<ds-tag>` | `tone` | `<span class="ds-tag is-…">` |
| `<ds-empty>` | `icon`, `title`, `action-label`, `action-href`, `action-icon` (bawaan `plus`), `boxed`, `level` (2–4) | Empty state lengkap; isi elemen menjadi kalimat penjelas |

```cshtml
<ds-icon name="ship" size="lg" />
<ds-pill tone="Warning">Menunggu Bea Cukai</ds-pill>
<ds-pill tone="Success" live>Tayang</ds-pill>
<ds-tag tone="Info">Trial</ds-tag>
<ds-empty icon="tank" title="Belum ada tangki" action-label="Tambah tangki" action-href="/Tanks/Create" boxed>
    Tangki yang ditambahkan tampil di sini beserta kapasitasnya.
</ds-empty>
```

## Partial view

| Partial | Model | Isi |
| --- | --- | --- |
| `_DsHead` | `HeadOptions?` | Meta `color-scheme` dan `theme-color`, preload font, skrip tema sebelum paint, stylesheet |
| `_DsScripts` | – | `ds.js` sebagai ES module (auto-init) |
| `_DsIconSprite` | – | Sprite SVG semua ikon untuk `<use href="#ds-icon-…">` |
| `_DsToast` | – | Region toast + toast dari `TempData` |
| `_DsConfirmDialog` | – | `#ds-confirm` untuk `data-ds-confirm` dan `DS.confirm()` |
| `_DsLeaveDialog` | – | `#ds-leave` untuk `form[data-ds-guard]` |
| `_DsPager` | `PagerModel` | Teks rentang + Sebelumnya / Halaman n / N / Berikutnya |
| `_DsSortHeader` | `SortHeaderModel` | `<th>` dengan tautan urut dan `aria-sort` |
| `_DsPageSize` | `int` | Pilihan 10/20/50/100 baris, kirim otomatis |
| `_DsSidebarNav` | `NavModel` | Navigasi sidebar dua tingkat |

```cshtml
<partial name="_DsHead" model='new HeadOptions(Stylesheet: "~/css/app.css")' />
<partial name="_DsSortHeader" model='new SortHeaderModel("Kapasitas", "capacity", Model.Rows.Sort, Numeric: true)' />
<partial name="_DsPager" model='Model.Rows.Pager("tangki")' />
```

## Ikon: `Icon`

| Anggota | Keterangan |
| --- | --- |
| `IHtmlContent Svg(string name, string css = "ds-icon", string? label = null)` | Satu ikon. Nama tidak dikenal melempar `ArgumentException` |
| `IHtmlContent Sprite()` | Seluruh set sebagai `<symbol id="ds-icon-…">` |
| `IEnumerable<string> Names` | 73 nama, urut sumber |
| `bool Exists(string name)` | Cek nama |

## Nada: `Tone`

`enum Tone { Neutral, Primary, Info, Success, Warning, Error }` dengan ekstensi:

| Metode | Contoh |
| --- | --- |
| `Css()` | `Tone.Success.Css()` → `is-success` |
| `ToastName()` | `Tone.Primary.ToastName()` → `info` |
| `IconName()` | `Tone.Error.IconName()` → `x-circle` |

Pemetaan status domain ke nada sebaiknya satu `switch` di proyek:

```csharp
public static (string Label, Tone Tone) Status(SubmissionStatus? s) => s switch
{
    null => ("Belum dikirim", Tone.Neutral),
    SubmissionStatus.Draft => ("Draft", Tone.Neutral),
    SubmissionStatus.Confirmed => ("Selesai di Bea Cukai", Tone.Success),
    SubmissionStatus.Rejected => ("Ditolak Bea Cukai", Tone.Error),
    _ => ("Menunggu Bea Cukai", Tone.Warning),
};
```

## Toast: `ToastMessage`, `ToastExtensions`

| Anggota | Keterangan |
| --- | --- |
| `record ToastMessage(Tone Tone, string Title, string? Text = null)` | Isi toast |
| `controller.Toast(Tone, title, text?)` | Dari MVC controller |
| `pageModel.Toast(Tone, title, text?)` | Dari Razor Page |
| `tempData.SetToast(message)` / `TakeToast()` | Akses langsung; kunci `ds.toast` |

```csharp
[HttpPost, ValidateAntiForgeryToken]
public async Task<IActionResult> Save(TankForm form)
{
    if (!ModelState.IsValid) return View("Form", form);
    await _tanks.SaveAsync(form);
    this.Toast(Tone.Success, "Tangki tersimpan", $"{form.Code} siap dipakai.");
    return RedirectToAction(nameof(Index));
}
```

## Daftar dan paging

| Tipe | Anggota penting |
| --- | --- |
| `record ListSort(string Key, bool Descending, bool Chosen)` | `Direction`; `static Parse(sort, direction, allowed, defaultKey, defaultDescending = false)` menolak kunci di luar daftar |
| `static class PageSizes` | `All` = 10, 20, 50, 100; `Normalize(size, fallback = 10)` |
| `record ListPage<T>(Rows, Query, Page, PageSize, Total, Sort)` | `PageCount`, `From`, `To`, `Pager(noun)` |
| `record PagerModel(Page, PageCount, Total, From, To, Noun = "data")` | Model `_DsPager` |
| `record SortHeaderModel(Label, Key, Current, Numeric = false, Class = null)` | `Active`, `NextDirection`, `AriaSort` |
| `static class QueryUrl` | `With(request, ("page", "2"), ("sort", null))` mempertahankan query lain; nilai `null` menghapus kunci |

```csharp
static readonly string[] Sortable = ["code", "name", "capacity"];

public async Task OnGetAsync(string? q, string? sort, string? direction, int page = 1, int? size = null)
{
    var order = ListSort.Parse(sort, direction, Sortable, defaultKey: "code");
    var pageSize = PageSizes.Normalize(size);
    var (rows, total) = await _tanks.SearchAsync(q, order, page, pageSize);
    Rows = new ListPage<TankRow>(rows, q, page, pageSize, total, order);
}
```

## Navigasi

| Tipe | Keterangan |
| --- | --- |
| `record NavItem(Label, Href, Icon, Active = false)` | Tautan sidebar |
| `record NavGroup(Key, Label, Items, DefaultOpen = true)` | Grup; `HasActive` membuka grup secara paksa |
| `record NavModel(Top, Groups, Bottom = null, Label = "Navigasi utama")` | Model `_DsSidebarNav` |
| `static NavActive.Matches(HttpContext, href, exact = false)` | Aktif bila path sama atau di bawah `href` |

## Avatar

| Anggota | Contoh |
| --- | --- |
| `Avatar.Initials(text)` | `"PT Akr Corporindo"` → `PA`; `"AKR1"` → `AK`; kosong → `?` |
| `Avatar.ColorClass(text)` | `c0`–`c7`, jumlah kode karakter modulo 8 |

```cshtml
<span class="ds-avatar @Avatar.ColorClass(customer.Name)">@Avatar.Initials(customer.Name)</span>
```

## Format: `Fmt`, `Wib`

| Metode | Hasil |
| --- | --- |
| `Fmt.Number(20.0400m)` | `20.04` (titik desimal, tanpa pemisah ribuan, maksimal 4 desimal) |
| `Fmt.Qty(1574782m, "TNE")` | `1574782 TNE`; `null` → `–` |
| `Fmt.Diff(-746m)` | `-746`; nol → `0`, tidak pernah `-0` |
| `Fmt.Percent(-0.00075m)` | `-0.075%` |
| `Fmt.TryParseNumber("20.040", out v)` | `true`, `20.04`; `"1,574,782"` → `false` |
| `Fmt.Date(new DateOnly(2026, 1, 25))` | `25 Jan 2026` |
| `Fmt.DateTime(dt)` | `01 Nov 2026 14.30` |
| `Fmt.Range(1, 20, 57)` | `1–20 dari 57 data` |
| `Fmt.Text(null)` | `–` |
| `Wib.Format(utc)` | `01 Nov 2026 21.30 WIB` (UTC+7, tanpa DST) |
| `Wib.Now`, `Wib.Today`, `Wib.FromUtc`, `Wib.ToUtc` | Konversi waktu |

## Kepala halaman: `HeadOptions`

`record HeadOptions(string? Stylesheet = null, string Light = "tps", string Dark = "tps-dark", string Storage = "ds", bool PreloadFont = true)`

- `Stylesheet` kosong → `~/_content/Citia.DesignSystem/css/ds.css`.
- `Storage` adalah prefiks kunci `localStorage` (`<prefix>-theme`, `<prefix>-sidebar-collapsed`, `<prefix>-nav-groups`) dan harus sama dengan `configure({ storage })` di `ds.js` bila diubah lewat JavaScript.
