---
title: Pola halaman
group: Pola
order: 1
summary: Kerangka aplikasi (_Layout, sidebar, top bar) dan enam pola halaman: daftar, form, detail, dasbor, masuk, galat, lengkap dengan Razor dan titik henti responsif.
source: TPS Views/Shared/_Layout.cshtml, _AuthLayout.cshtml, Error.cshtml; Styles/app.css L240–246, L444–553, L1405–1424, L2145–2269, L2854–3042; DESIGN.md bagian Master data operasional
---

Setiap halaman aplikasi adalah satu dari enam pola yang berjalan di atas satu kerangka. Pola menentukan urutan blok, bukan isi: judul di kiri, aksi di kanan, satu tombol utama, isi di dalam permukaan, jarak yang sama di mana-mana.

Halaman ini memakai API dari paket `Citia.DesignSystem` (partial `_Ds*`, `NavModel`, `ListPage<T>`, `Fmt`). Kelas komponen dijelaskan di halaman [Tombol](tombol.md), [Form dan field](form.md), [Tabel](tabel.md), dan [Kartu dan tampilan data](kartu-dan-data.md); sidebar, drawer, dan top bar dirinci di [Navigasi](navigasi.md).

## Kerangka aplikasi {#kerangka}

Kerangka = sidebar kiri, top bar yang menempel di atas, dan satu `<main>`. Layout menyusun partial DS dalam urutan tetap; aplikasi hanya mengisi nama produk, logo, menu, dan akun.

```html preview title="Anatomi kerangka"
<div style="display:grid;grid-template-columns:8rem minmax(0,1fr);min-height:12rem;overflow:hidden;border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box);font-size:.8125rem">
  <div style="display:grid;align-content:start;gap:.5rem;padding:.75rem;background:var(--color-secondary);color:var(--color-secondary-content)">
    <strong>TPS Integration</strong>
    <span>Dashboard</span>
    <span>Receiving</span>
    <span>Delivery</span>
    <span style="margin-top:2rem">Mode: Live</span>
  </div>
  <div style="display:grid;grid-template-rows:auto minmax(0,1fr)">
    <div style="padding:.625rem .75rem;border-bottom:1px solid var(--color-base-300);background:var(--color-base-100)">Top bar: menu · kembali · judul · tema · akun</div>
    <div style="padding:.75rem;background:var(--color-base-200)">main#main.ds-main &rarr; div.ds-page</div>
  </div>
</div>
```

### _Layout.cshtml {#layout}

Daftarkan tag helper dan namespace DS di `_ViewImports.cshtml` aplikasi, karena `_ViewImports` milik paket hanya berlaku untuk view paket.

```cshtml
@using Citia.DesignSystem.Icons
@using Citia.DesignSystem.Ui
@using Citia.DesignSystem.Formatting
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Citia.DesignSystem
```

Layout lengkap. Urutan di `<head>` penting: `_DsHead` menaruh skrip tema sebelum stylesheet agar mode gelap tidak berkedip terang.

```cshtml
@inject ISendMode SendMode
@{
    var nav = AppNav.Build(Context, canMaster: User.IsInRole("MasterAdmin"));
    var controller = ViewContext.RouteData.Values["controller"]?.ToString();
    var isHome = string.Equals(controller, "Home", StringComparison.OrdinalIgnoreCase);
    var live = SendMode.IsLive;                       // sumber mode milik aplikasi
    var modeLabel = live ? "Live" : "Simulator (Demo)";
    var modeHelp = live ? "Data dikirim ke layanan TPS Online Bea Cukai (DJBC)." : "Data dikirim ke simulator lokal, bukan ke Bea Cukai.";
}
<!DOCTYPE html>
<html lang="id" data-theme="tps">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - TPS Integration</title>
    <link rel="icon" type="image/png" href="~/images/favicon.png" asp-append-version="true" />
    <partial name="_DsHead" model='new HeadOptions(Stylesheet: "~/css/app.css", Storage: "tps")' />
    @await RenderSectionAsync("Head", required: false)
</head>
<body>
    <a href="#main" class="ds-skip-link btn btn-sm">Lewati ke konten</a>
    <partial name="_DsIconSprite" />

    <div class="ds-shell">
        <aside id="app-sidebar" class="ds-sidebar" tabindex="-1">
            <div class="ds-sidebar-head">
                <a href="/" class="ds-brand" aria-label="TPS Integration, kembali ke Dashboard">
                    <span class="ds-brand-mark"><img src="~/images/logo-white.png" asp-append-version="true" width="691" height="320" alt="" /></span>
                    <span class="ds-brand-name">TPS Integration</span>
                </a>
                <button type="button" class="ds-sidebar-collapse" data-ds-sidebar-collapse
                        aria-controls="app-sidebar" aria-expanded="true" aria-label="Ringkas sidebar" title="Ringkas sidebar">
                    <ds-icon name="menu" size="md" />
                </button>
            </div>

            <partial name="_DsSidebarNav" model="nav" />

            <div class="ds-sidebar-mode">
                <span class="ds-mode-badge" data-mode="@(live ? "live" : "simulator")" title="@modeHelp">
                    <span data-ds-full aria-hidden="true">@modeLabel</span>
                    <span data-ds-short aria-hidden="true">@(live ? "Live" : "Demo")</span>
                    <span class="ds-visually-hidden">Mode Bea Cukai: @modeLabel. @modeHelp</span>
                </span>
            </div>
            <div class="ds-sidebar-footer">
                <img src="~/images/citia-white.png" asp-append-version="true" width="650" height="650" alt="Citia Engineering Indonesia" />
            </div>
        </aside>

        <button type="button" class="ds-shell-scrim" data-ds-nav-close aria-label="Tutup menu"></button>

        <div class="ds-shell-main">
            <header class="ds-topbar">
                <button type="button" class="ds-chrome-btn ds-nav-toggle" data-ds-nav-toggle
                        aria-controls="app-sidebar" aria-expanded="false" aria-label="Buka menu">
                    <ds-icon name="menu" size="lg" />
                </button>
                @if (!isHome)
                {
                    <button type="button" class="ds-chrome-btn" data-ds-back="@Url.Action("Index", "Home")"
                            aria-label="Kembali ke halaman sebelumnya" title="Kembali ke halaman sebelumnya">
                        <ds-icon name="arrow-left" size="lg" />
                    </button>
                }
                <div class="ds-topbar-heading">
                    @if (ViewData["Section"] is string section) { <p class="ds-topbar-context">@section</p> }
                    <p class="ds-topbar-title">@ViewData["Title"]</p>
                </div>
                <div class="ds-topbar-actions">
                    <button type="button" class="ds-chrome-btn" data-ds-theme-toggle aria-label="Ganti tema">
                        @* Ikon bertanda tema aktif yang tampil: bulan di "light" = tombol menunjukkan tujuannya. *@
                        <svg class="ds-icon is-lg" data-ds-theme-icon="light" aria-hidden="true"><use href="#ds-icon-moon"></use></svg>
                        <svg class="ds-icon is-lg" data-ds-theme-icon="dark" aria-hidden="true" hidden><use href="#ds-icon-sun"></use></svg>
                    </button>
                    <details class="ds-account" data-ds-menu>
                        <summary aria-label="Menu akun">
                            <span class="ds-account-avatar"><ds-icon name="user" /></span>
                            <span>@User.Identity?.Name</span>
                            <ds-icon name="chevron-down" />
                        </summary>
                        <ul class="ds-account-panel">
                            <li class="ds-account-email">@User.Identity?.Name</li>
                            <li>
                                <form asp-controller="Account" asp-action="Logout" method="post" data-ds-logout>
                                    <button type="submit"><ds-icon name="logout" /> Keluar</button>
                                </form>
                            </li>
                        </ul>
                    </details>
                </div>
            </header>

            <main id="main" class="ds-main" tabindex="-1">
                @RenderBody()
            </main>
        </div>
    </div>

    <partial name="_DsToast" />
    <partial name="_DsConfirmDialog" />
    <partial name="_DsLeaveDialog" />
    <partial name="_DsScripts" />
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```

**Aturan layout.**

- Satu `<h1>` per halaman, di `.ds-page-title`. Judul top bar adalah `<p class="ds-topbar-title">`: top bar menempel, jadi judul tetap terlihat saat kepala halaman sudah tergulung.
- `ViewData["Section"]` mengisi baris konteks di atas judul ("Data master"). Kosongkan di halaman tingkat atas.
- Tombol kembali di top bar boleh memakai riwayat browser (`data-ds-back`). Tautan kembali di dalam halaman tidak boleh; lihat [Alur kerja](alur-kerja.md#kembali).
- `data-theme="tps"` di `<html>` adalah bawaan server. `HeadOptions.Light`, `Dark`, dan `Storage` harus sama dengan nama tema di CSS dan awalan kunci penyimpanan; ds.js membacanya dari atribut `data-ds-*` yang ditulis `_DsHead`.
- Dua dialog bersama (`_DsConfirmDialog`, `_DsLeaveDialog`) dan region toast dirender sekali, di luar `.ds-shell`.
- Di layar < 1024 px sidebar menjadi drawer: ds.js memberi `inert` pada `.ds-shell-main`, menjebak Tab di dalam sidebar, dan menutupnya lewat Escape atau klik scrim.

### Model navigasi {#nav}

`NavModel` = item atas, grup, item bawah. Item aktif dihitung di server dengan `NavActive.Matches`: path sama, atau di bawah `href` pada batas segmen (`/Submissions` cocok untuk `/Submissions/Details/7`, tidak untuk `/SubmissionsX`). Grup yang memuat halaman aktif dipaksa terbuka; selebihnya pilihan terakhir pengguna menang.

```csharp
public static class AppNav
{
    public static NavModel Build(HttpContext http, bool canMaster)
    {
        bool At(string href, bool exact = false) => NavActive.Matches(http, href, exact);

        var groups = new List<NavGroup>
        {
            new("receiving", "Receiving",
            [
                new("Input Laporan Pemasukan", "/Posting", "send", At("/Posting")),
                new("Dokumen Pemasukan", "/Submissions", "inbound", At("/Submissions")),
            ]),
            new("delivery", "Delivery",
            [
                new("Input Laporan Pengeluaran", "/OutgoingEvents/Create", "truck", At("/OutgoingEvents/Create")),
                new("Dokumen Pengeluaran", "/OutgoingEvents", "outbound", At("/OutgoingEvents") && !At("/OutgoingEvents/Create")),
            ]),
        };

        // Grup jarang dipakai mulai tertutup; membuka halamannya tetap membukanya.
        if (canMaster)
            groups.Add(new("master", "Data Master",
            [
                new("Tangki", "/Tanks", "tank", At("/Tanks")),
                new("Kapal", "/Vessels", "ship", At("/Vessels")),
                new("Pelanggan", "/Customers", "customer", At("/Customers")),
            ], DefaultOpen: false));

        return new NavModel(
            Top: [new("Dashboard", "/", "dashboard", At("/", exact: true))],
            Groups: groups,
            Bottom: [new("Status akses", "/Access", "clock", At("/Access"))]);
    }
}
```

Izin menentukan siapa melihat apa: tambahkan item hanya bila pengguna boleh membukanya, dan tetap periksa izin di server. Bila izin dibaca lewat `IAuthorizationService` (async), pindahkan `Build` ke view component `SidebarNav` yang mengembalikan view berisi `<partial name="_DsSidebarNav" model="Model" />`, lalu panggil `@await Component.InvokeAsync("SidebarNav")` di layout.

> [!NOTE]
> Setiap item punya ikon sendiri dan `aria-label`, karena di mode rail (4.75 rem) hanya ikon yang terlihat. Nama ikon harus ada di sprite DS; `Icon.Svg` melempar `ArgumentException` untuk nama yang tidak dikenal, jadi salah ketik gagal saat pengembangan.

## Kepala halaman dan toolbar {#kepala}

`.ds-page` menumpuk blok dengan jarak 24 px. Isinya berurutan: kepala (`.ds-page-header`), toolbar bila ada, lalu permukaan. Kepala memuat judul di kiri dan satu kelompok aksi di kanan; satu paragraf pengantar redup di bawah judul hanya bila perlu, satu baris.

Toolbar `.ds-toolbar` = satu kolom teks dan satu kelompok aksi. Export (Excel, PDF) berada di kelompok kiri (`.ds-actions.is-start`) di bawah teksnya; import dan aksi lain berada di kelompok kanan. Di ≤ 1180 px kelompok aksi turun ke baris sendiri dan tetap rata kanan.

```html preview title="Kepala halaman dan toolbar"
<div class="ds-page">
  <header class="ds-page-header">
    <div>
      <h1 class="ds-page-title">Dokumen Pemasukan</h1>
    </div>
    <div class="ds-actions">
      <a class="btn btn-primary btn-sm" href="#">
        <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>
        Input Laporan Pemasukan
      </a>
    </div>
  </header>
  <div class="ds-toolbar">
    <div>
      <p class="ds-text-subtle">Tgl. BL 01 Nov 2026 – 07 Nov 2026 · 57 BL</p>
      <div class="ds-actions is-start" style="margin-top:.5rem">
        <a class="btn btn-excel btn-sm" href="#" data-ds-export="Excel">
          <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-file-xls"></use></svg>
          Export Excel
        </a>
        <a class="btn btn-pdf btn-sm" href="#" data-ds-export="PDF">
          <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-file-pdf"></use></svg>
          Export PDF
        </a>
      </div>
    </div>
    <div class="ds-actions">
      <a class="btn btn-excel btn-sm" href="#">
        <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-file-import"></use></svg>
        Import Excel
      </a>
    </div>
  </div>
</div>
```

```cshtml
<div class="ds-page">
    <header class="ds-page-header">
        <div><h1 class="ds-page-title">Dokumen Pemasukan</h1></div>
        <div class="ds-actions">
            <a asp-controller="Posting" asp-action="Index" asp-route-returnUrl="@(Context.Request.Path + Context.Request.QueryString)"
               class="btn btn-primary btn-sm"><ds-icon name="plus" /> Input Laporan Pemasukan</a>
        </div>
    </header>

    <div class="ds-toolbar">
        <div>
            <p class="ds-text-subtle">Tgl. BL @Fmt.Date(Model.From) – @Fmt.Date(Model.To) · @Model.Rows.Total BL</p>
            <div class="ds-actions is-start">
                <a asp-action="ExportExcel" asp-route-q="@Model.Query" asp-route-sort="@Model.Rows.Sort.Key"
                   class="btn btn-excel btn-sm" data-ds-export="Excel"><ds-icon name="file-xls" size="lg" /> Export Excel</a>
            </div>
        </div>
        <div class="ds-actions">
            <a asp-action="Import" class="btn btn-excel btn-sm"><ds-icon name="file-import" size="lg" /> Import Excel</a>
        </div>
    </div>
    @* ... permukaan ... *@
</div>
```

Aksi halaman dan dokumen rata kanan; identitas dokumen (No BL, kapal) tetap terlihat saat tabel bergulir. Link ke halaman asal membawa `returnUrl` lokal; lihat [Alur kerja](alur-kerja.md#kembali).

## Halaman daftar {#daftar}

Urutan: kepala → hitungan (`.ds-counts`) → `.ds-surface` berisi `.ds-table-toolbar` (cari, filter, ukuran halaman, Terapkan, Reset), tabel, dan `_DsPager`. Pencarian dan filter memakai `GET` agar URL bisa dibagikan dan tombol kembali browser bekerja.

```html preview title="Kepala, hitungan, dan toolbar tabel"
<div class="ds-page">
  <header class="ds-page-header">
    <div><h1 class="ds-page-title">Tangki</h1></div>
    <div class="ds-actions">
      <a class="btn btn-primary btn-sm" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>Tambah tangki</a>
    </div>
  </header>
  <div class="ds-counts"><span><strong>12</strong> data tersimpan</span><span>10 aktif</span><span>2 nonaktif</span></div>
  <section class="ds-surface" aria-label="Daftar tangki">
    <form class="ds-table-toolbar" role="search">
      <div>
        <label for="pola-daftar-q">Cari tangki</label>
        <div class="ds-search">
          <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg>
          <input id="pola-daftar-q" type="search" class="input" placeholder="Cari kode atau produk">
        </div>
      </div>
      <div>
        <label for="pola-daftar-status">Status</label>
        <select id="pola-daftar-status" class="select"><option>Semua status</option><option>Aktif</option><option>Nonaktif</option></select>
      </div>
      <button type="button" class="btn">Terapkan</button>
    </form>
  </section>
</div>
```

```html preview title="Tabel master dan pager"
<section class="ds-surface" aria-label="Daftar tangki">
  <table class="ds-list-table">
    <thead><tr>
      <th scope="col" aria-sort="ascending"><a class="ds-sort" href="#">Kode <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-arrow-up"></use></svg></a></th>
      <th scope="col">Produk</th>
      <th scope="col" class="ds-num">Kapasitas</th>
      <th scope="col">Status</th>
      <th scope="col"><span class="ds-visually-hidden">Aksi</span></th>
    </tr></thead>
    <tbody>
      <tr>
        <td class="ds-primary-cell"><a href="#">T-01</a></td>
        <td data-label="Produk">Solar</td>
        <td data-label="Kapasitas" class="ds-num">5000<span class="ds-unit">TNE</span></td>
        <td data-label="Status"><span class="ds-status is-active">Aktif</span></td>
        <td class="ds-actions-cell"><div class="ds-row-actions"><a class="btn btn-ghost btn-sm" href="#">Ubah</a></div></td>
      </tr>
      <tr>
        <td class="ds-primary-cell"><a href="#">T-02</a></td>
        <td data-label="Produk">Pertalite</td>
        <td data-label="Kapasitas" class="ds-num">3200.5<span class="ds-unit">TNE</span></td>
        <td data-label="Status"><span class="ds-status is-inactive">Nonaktif</span></td>
        <td class="ds-actions-cell"><div class="ds-row-actions"><a class="btn btn-ghost btn-sm" href="#">Ubah</a></div></td>
      </tr>
    </tbody>
  </table>
  <footer class="ds-pager">
    <p role="status">1–10 dari 12 tangki</p>
    <nav aria-label="Halaman daftar">
      <a class="btn btn-ghost btn-sm" aria-disabled="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"></use></svg> Sebelumnya</a>
      <span class="ds-num">Halaman 1 / 2</span>
      <a class="btn btn-ghost btn-sm" href="#">Berikutnya <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg></a>
    </nav>
  </footer>
</section>
```

### Pilih jenis tabel

| Kelas | Pakai untuk |
| --- | --- |
| `ds-list-table` | Data master: baris lapang, urut lewat judul kolom, kartu berlabel di ≤ 640 px |
| `ds-table` | Daftar bergaya portal: judul huruf kapital, setiap `td` membawa `data-label` |
| `ds-table-scroll` | Transaksi lebar: judul menempel, kolom identitas dan status menempel (`data-ds-pin`), petunjuk geser |

### Razor {#daftar-razor}

Pengurutan, pemotongan halaman, dan `ListPage<T>` ada di [Tabel](tabel.md#contoh). View mengikat hasilnya ke partial DS; nama query `q`, `sort`, `direction`, `size`, `page` harus tetap.

```cshtml
@model TankListPage
@{
    ViewData["Title"] = "Tangki";
    ViewData["Section"] = "Data master";
    var here = Context.Request.Path + Context.Request.QueryString;   // dibawa ke Tambah/Ubah/Detail
    var rows = Model.Rows;
}
<div class="ds-page">
    <header class="ds-page-header">
        <div><h1 class="ds-page-title">Tangki</h1></div>
        <div class="ds-actions">
            <a asp-action="Create" asp-route-returnUrl="@here" class="btn btn-primary btn-sm"><ds-icon name="plus" /> Tambah tangki</a>
        </div>
    </header>

    <div class="ds-counts">
        <span><strong>@Model.AllCount</strong> data tersimpan</span>
        <span>@Model.ActiveCount aktif</span>
        <span>@(Model.AllCount - Model.ActiveCount) nonaktif</span>
    </div>

    <section class="ds-surface" aria-label="Daftar tangki">
        <form method="get" class="ds-table-toolbar" role="search">
            <div>
                <label for="q">Cari tangki</label>
                <div class="ds-search">
                    @Icon.Svg("search")
                    <input id="q" name="q" type="search" value="@rows.Query" maxlength="120" class="input" placeholder="Cari kode atau produk" />
                </div>
            </div>
            <partial name="_DsPageSize" model="rows.PageSize" />
            @if (rows.Sort.Chosen)
            {
                <input type="hidden" name="sort" value="@rows.Sort.Key" />
                <input type="hidden" name="direction" value="@rows.Sort.Direction" />
            }
            <button type="submit" class="btn">Terapkan</button>
            @if (!string.IsNullOrEmpty(rows.Query) || rows.Sort.Chosen)
            {
                <a asp-action="Index" class="btn btn-ghost">Reset</a>
            }
        </form>

        @if (rows.Total == 0)
        {
            <ds-empty icon="tank" title="@(string.IsNullOrEmpty(rows.Query) ? "Belum ada tangki" : "Tidak ada tangki yang cocok")">
                @(string.IsNullOrEmpty(rows.Query) ? "Tambahkan tangki pertama." : "Ubah atau hapus kata pencarian.")
            </ds-empty>
        }
        else
        {
            <table class="ds-list-table">
                <caption class="ds-visually-hidden">Tangki, halaman @rows.Page dari @rows.PageCount</caption>
                <thead>
                    <tr>
                        <partial name="_DsSortHeader" model='new SortHeaderModel("Kode", "code", rows.Sort)' />
                        <th scope="col">Produk</th>
                        <partial name="_DsSortHeader" model='new SortHeaderModel("Kapasitas", "capacity", rows.Sort, Numeric: true)' />
                        <th scope="col">Status</th>
                        <th scope="col"><span class="ds-visually-hidden">Aksi</span></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach (var t in rows.Rows)
                    {
                        <tr>
                            <td class="ds-primary-cell"><a asp-action="Details" asp-route-id="@t.Id" asp-route-returnUrl="@here">@t.Code</a></td>
                            <td data-label="Produk">@Fmt.Text(t.Product)</td>
                            <td data-label="Kapasitas" class="ds-num">@Fmt.Number(t.Capacity)<span class="ds-unit">TNE</span></td>
                            <td data-label="Status"><span class="ds-status @(t.IsActive ? "is-active" : "is-inactive")">@(t.IsActive ? "Aktif" : "Nonaktif")</span></td>
                            <td class="ds-actions-cell">
                                <div class="ds-row-actions">
                                    <a asp-action="Edit" asp-route-id="@t.Id" asp-route-returnUrl="@here" class="btn btn-ghost btn-sm">Ubah</a>
                                </div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            <partial name="_DsPager" model='rows.Pager("tangki")' />
        }
    </section>
</div>
```

## Halaman form {#form}

Satu `.ds-surface` membungkus `<form>`. Isi dikelompokkan per `fieldset` berjudul (identitas wajib dulu), isian tambahan dilipat di `details.ds-optional-group`, pengaturan aktif memakai `.ds-check-row`, dan footer `.ds-form-actions` menutup form: **Batal** di kiri, aksi simpan lalu aksi utama di kanan. Setelah submit gagal, `.ds-error-summary` muncul di atas permukaan dan menerima fokus.

```html preview title="Form dengan galat"
<div class="ds-page">
  <div class="ds-error-summary" role="alert" tabindex="-1">
    <h2>Tangki belum bisa disimpan</h2>
    <p>Perbaiki 1 isian berikut.</p>
    <ul><li><a href="#pola-form-kapasitas">Periksa format kapasitas. Ikuti petunjuk di bawah kolom.</a></li></ul>
  </div>
  <section class="ds-surface">
    <div class="ds-card-body is-roomy">
      <div class="ds-form">
        <fieldset class="ds-fieldset">
          <legend>Identitas tangki</legend>
          <div class="ds-field-grid">
            <div class="ds-field">
              <label for="pola-form-kode">Kode tangki</label>
              <input id="pola-form-kode" class="input" value="T-01">
            </div>
            <div class="ds-field">
              <label for="pola-form-kapasitas">Kapasitas (TNE)</label>
              <input id="pola-form-kapasitas" class="input" inputmode="decimal" value="5000 ton" aria-invalid="true" aria-describedby="pola-form-kapasitas-hint pola-form-kapasitas-error">
              <p id="pola-form-kapasitas-hint" class="ds-hint">Angka dengan titik desimal, contoh 5000 atau 20.5.</p>
              <p id="pola-form-kapasitas-error" class="ds-field-error">Periksa format kapasitas. Ikuti petunjuk di bawah kolom.</p>
            </div>
          </div>
        </fieldset>
        <details class="ds-optional-group">
          <summary>Informasi tambahan <small>opsional</small></summary>
          <div class="ds-field-grid">
            <div class="ds-field is-wide">
              <label for="pola-form-catatan">Catatan</label>
              <textarea id="pola-form-catatan" class="textarea" rows="2"></textarea>
            </div>
          </div>
        </details>
      </div>
    </div>
  </section>
</div>
```

```html preview title="Pengaturan aktif dan footer form"
<section class="ds-surface">
  <div class="ds-card-body is-roomy">
    <fieldset class="ds-fieldset">
      <legend>Pemakaian</legend>
      <label class="ds-check-row" style="margin-top:1rem">
        <input type="checkbox" class="checkbox" checked>
        <span><strong>Aktif</strong><small>Tangki nonaktif tidak muncul di form pemasukan.</small></span>
      </label>
    </fieldset>
  </div>
  <div class="ds-form-actions">
    <a class="btn" href="#" data-ds-guard-skip>Batal</a>
    <div>
      <button type="button" class="btn">Simpan &amp; tambah lagi</button>
      <button type="button" class="btn btn-primary">Simpan tangki</button>
    </div>
  </div>
</section>
```

### Razor {#form-razor}

`data-ds-guard` menjaga perubahan yang belum disimpan, `data-ds-once` menolak submit kedua. Bila view dirender ulang dengan galat, isinya sudah berbeda dari yang diminta pengguna tetapi sama dengan snapshot awal, sehingga tandai form dengan `data-ds-guard-dirty`. Aturan guard lengkap: [Alur kerja](alur-kerja.md#guard).

```cshtml
@model TankForm
@{
    ViewData["Title"] = Model.Id == 0 ? "Tambah tangki" : "Ubah tangki";
    ViewData["Section"] = "Data master";
    var errors = ViewData.ModelState.Where(e => e.Value!.Errors.Count > 0).ToList();
}
<div class="ds-page">
    <header class="ds-page-header"><div><h1 class="ds-page-title">@ViewData["Title"]</h1></div></header>

    @if (errors.Count > 0)
    {
        <div class="ds-error-summary" role="alert" tabindex="-1" id="error-summary" autofocus>
            <h2>Tangki belum bisa disimpan</h2>
            <p>Perbaiki @errors.Count isian berikut.</p>
            <ul>
                @foreach (var e in errors)
                {
                    <li><a href="#@e.Key">@e.Value!.Errors[0].ErrorMessage</a></li>
                }
            </ul>
        </div>
    }

    <section class="ds-surface">
        <form method="post" asp-action="Save" data-ds-guard data-ds-once novalidate
              data-ds-guard-dirty="@(errors.Count > 0 ? "true" : null)">
            <input type="hidden" asp-for="Id" />
            <input type="hidden" asp-for="ReturnUrl" />
            <input type="hidden" asp-for="RowVersion" />
            <div class="ds-card-body is-roomy">
                <div class="ds-form">
                    <fieldset class="ds-fieldset">
                        <legend>Identitas tangki</legend>
                        <div class="ds-field-grid">
                            <div class="ds-field">
                                <label asp-for="Code"></label>
                                <input asp-for="Code" class="input" aria-describedby="Code-hint Code-error"
                                       aria-invalid="@(ViewData.ModelState["Code"]?.Errors.Count > 0 ? "true" : null)" />
                                <p id="Code-hint" class="ds-hint">Huruf kapital, contoh T-01.</p>
                                <span id="Code-error" asp-validation-for="Code" class="ds-field-error"></span>
                            </div>
                            <div class="ds-field">
                                <label asp-for="Capacity">Kapasitas (TNE)</label>
                                <input asp-for="Capacity" class="input" inputmode="decimal" />
                                <span asp-validation-for="Capacity" class="ds-field-error"></span>
                            </div>
                        </div>
                    </fieldset>

                    <details class="ds-optional-group" open="@(!string.IsNullOrEmpty(Model.Notes))">
                        <summary>Informasi tambahan <small>opsional</small></summary>
                        <div class="ds-field-grid">
                            <div class="ds-field is-wide">
                                <label asp-for="Notes"></label>
                                <textarea asp-for="Notes" class="textarea" rows="2"></textarea>
                            </div>
                        </div>
                    </details>

                    <label class="ds-check-row">
                        <input asp-for="IsActive" class="checkbox" />
                        <span><strong>Aktif</strong><small>Tangki nonaktif tidak muncul di form pemasukan.</small></span>
                    </label>
                </div>
            </div>

            <div class="ds-form-actions">
                <a href="@Model.ReturnUrl" class="btn" data-ds-guard-skip>Batal</a>
                <div>
                    <button type="submit" name="command" value="saveAndNew" class="btn" data-ds-loading-label="Menyimpan…">Simpan &amp; tambah lagi</button>
                    <button type="submit" name="command" value="save" class="btn btn-primary" data-ds-loading-label="Menyimpan…">Simpan tangki</button>
                </div>
            </div>
        </form>
    </section>
</div>
```

Tombol submit pertama di form tidak boleh mengirim ke layanan luar; Enter di field hanya menyimpan. Lihat [Alur kerja](alur-kerja.md#kirim) untuk form yang mengirim.

## Halaman detail {#detail}

Detail menampilkan nilai apa adanya di `dl.ds-dl.is-detail` (dua kolom, satu kolom di ≤ 640 px; nilai panjang membungkus dan mempertahankan baris baru). Di bawahnya `.ds-section` memuat jejak perubahan, agar operator tahu siapa mengubah apa dan kapan. Footer menampung aksi: kembali di kiri, aksi merusak dan aksi biasa di tengah-kanan, aksi utama paling kanan.

```html preview title="Detail dengan jejak perubahan"
<div class="ds-page">
  <header class="ds-page-header">
    <div><h1 class="ds-page-title">Tangki T-01</h1></div>
    <span class="ds-status is-active">Aktif</span>
  </header>
  <section class="ds-surface">
    <div class="ds-card-body is-roomy">
      <dl class="ds-dl is-detail">
        <div><dt>Kode</dt><dd class="ds-id">T-01</dd></div>
        <div><dt>Produk</dt><dd>Solar</dd></div>
        <div><dt>Kapasitas</dt><dd>5000 TNE</dd></div>
        <div><dt>Dipakai</dt><dd>12 dokumen</dd></div>
      </dl>
      <div class="ds-section">
        <h2 class="ds-section-title"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-history"></use></svg>Jejak perubahan</h2>
        <ul class="ds-feed">
          <li>
            <span class="ds-feed-dot is-info"></span>
            <div><p class="ds-feed-title">Kapasitas diubah dari 4500 ke 5000 TNE</p><p class="ds-feed-sub">admin@tpsintegration.local</p></div>
            <time class="ds-feed-time">01 Nov 2026 14.30 WIB</time>
          </li>
          <li>
            <span class="ds-feed-dot is-success"></span>
            <div><p class="ds-feed-title">Tangki dibuat</p><p class="ds-feed-sub">admin@tpsintegration.local</p></div>
            <time class="ds-feed-time">25 Jan 2026 09.12 WIB</time>
          </li>
        </ul>
      </div>
    </div>
    <div class="ds-form-actions">
      <a class="btn" href="#">Kembali ke Tangki</a>
      <div>
        <button type="button" class="btn btn-ghost is-danger"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-trash"></use></svg>Hapus</button>
        <a class="btn btn-primary" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-pencil"></use></svg>Ubah tangki</a>
      </div>
    </div>
  </section>
</div>
```

### Razor {#detail-razor}

Hapus selalu `POST` dengan `data-ds-confirm`; tautan kembali memakai `returnUrl` yang sudah divalidasi di server dan menyebut tujuannya.

```cshtml
@model TankDetail
@{
    ViewData["Title"] = $"Tangki {Model.Code}";
    ViewData["Section"] = "Data master";
}
<div class="ds-page">
    <header class="ds-page-header">
        <div><h1 class="ds-page-title">Tangki @Model.Code</h1></div>
        <span class="ds-status @(Model.IsActive ? "is-active" : "is-inactive")">@(Model.IsActive ? "Aktif" : "Nonaktif")</span>
    </header>

    <section class="ds-surface">
        <div class="ds-card-body is-roomy">
            <dl class="ds-dl is-detail">
                <div><dt>Kode</dt><dd class="ds-id">@Model.Code</dd></div>
                <div><dt>Produk</dt><dd>@Fmt.Text(Model.Product)</dd></div>
                <div><dt>Kapasitas</dt><dd>@Fmt.Qty(Model.Capacity, "TNE")</dd></div>
                <div><dt>Diubah</dt><dd>@Wib.Format(Model.UpdatedAtUtc)</dd></div>
            </dl>

            <div class="ds-section">
                <h2 class="ds-section-title">@Icon.Svg("history") Jejak perubahan</h2>
                <ul class="ds-feed">
                    @foreach (var a in Model.Audit)
                    {
                        <li>
                            <span class="ds-feed-dot @a.Tone.Css()"></span>
                            <div><p class="ds-feed-title">@a.Text</p><p class="ds-feed-sub">@a.User</p></div>
                            <time class="ds-feed-time" datetime="@a.AtUtc.ToString("O")">@Wib.Format(a.AtUtc)</time>
                        </li>
                    }
                </ul>
            </div>
        </div>

        <div class="ds-form-actions">
            <a href="@Model.Back.Url" class="btn">Kembali ke @Model.Back.Label</a>
            <div>
                <form method="post" asp-action="Delete" asp-route-id="@Model.Id">
                    <input type="hidden" name="rowVersion" value="@Convert.ToBase64String(Model.RowVersion)" />
                    <button type="submit" class="btn btn-ghost is-danger"
                            data-ds-confirm="Hapus tangki @Model.Code?"
                            data-ds-confirm-text="Dokumen yang memakai tangki ini tetap tersimpan, tetapi tangki tidak bisa dipilih lagi."
                            data-ds-confirm-label="Hapus tangki">@Icon.Svg("trash") Hapus</button>
                </form>
                <a asp-action="Edit" asp-route-id="@Model.Id" asp-route-returnUrl="@Model.Back.Url" class="btn btn-primary">@Icon.Svg("pencil") Ubah tangki</a>
            </div>
        </div>
    </section>
</div>
```

## Dasbor {#dasbor}

Dasbor adalah halaman bacaan: angka dulu, lalu apa yang perlu dikerjakan. Kepala memakai `.ds-page-header.is-portal` dengan `.ds-eyebrow` di atas judul (judul satu tingkat lebih kecil). Berikutnya `.ds-kpis`, lalu `.ds-grid-2` berisi kartu grafik, umpan aktivitas, atau tabel ringkas. Setiap angka berasal dari database, dan setiap kartu menaut ke daftar yang menjelaskannya.

```html preview title="Kepala dan KPI"
<div class="ds-page">
  <header class="ds-page-header is-portal">
    <div>
      <p class="ds-eyebrow">Terminal TPS-01 · Senin, 02 Nov 2026</p>
      <h1 class="ds-page-title">Dashboard</h1>
    </div>
  </header>
  <div class="ds-kpis">
    <div class="ds-kpi is-primary">
      <div class="ds-kpi-top"><span class="ds-kpi-label">Stok tangki</span><span class="ds-kpi-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-tank"></use></svg></span></div>
      <p class="ds-kpi-value">1574782<small>TNE</small></p>
      <p class="ds-kpi-sub">12 tangki aktif</p>
    </div>
    <a class="ds-kpi is-warning" href="#">
      <div class="ds-kpi-top"><span class="ds-kpi-label">Perlu tindakan</span><span class="ds-kpi-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg></span></div>
      <p class="ds-kpi-value">3</p>
      <p class="ds-kpi-sub">Hasil belum pasti. Buka daftar.</p>
    </a>
    <a class="ds-kpi is-error" href="#">
      <div class="ds-kpi-top"><span class="ds-kpi-label">Ditolak Bea Cukai</span><span class="ds-kpi-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg></span></div>
      <p class="ds-kpi-value">2</p>
      <p class="ds-kpi-sub">BL-2026-00841 dan 1 lainnya</p>
    </a>
  </div>
</div>
```

```html preview title="Kartu grafik, aktivitas, dan tabel"
<div class="ds-grid-2">
  <article class="ds-card">
    <header class="ds-card-head"><h2>Pengiriman per hari</h2><p>29–30 Okt 2026</p></header>
    <div class="ds-card-body">
      <svg class="ds-chart" viewBox="0 0 200 90" role="img" aria-label="Pengiriman 29 dan 30 Oktober 2026: 29 Oktober 38 pengiriman, 30 Oktober 21 pengiriman.">
        <line class="ds-grid-line" x1="10" x2="200" y1="80" y2="80"/>
        <g><title>29 Okt: 38 pengiriman</title><rect class="ds-bar s-success" x="40" y="10" width="50" height="70"/></g>
        <g><title>30 Okt: 21 pengiriman</title><rect class="ds-bar s-success" x="110" y="42" width="50" height="38"/></g>
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
          <div><p class="ds-feed-title">BL-2026-00841 selesai di Bea Cukai</p><p class="ds-feed-sub">MT Sinar Jaya · 992.5 TNE</p></div>
          <time class="ds-feed-time">14.30 WIB</time>
        </li>
        <li>
          <span class="ds-feed-dot is-error"></span>
          <div><p class="ds-feed-title">Ditolak Bea Cukai: gudang tujuan tidak sesuai</p><p class="ds-feed-sub">PT Akr Corporindo · kode 007</p></div>
          <time class="ds-feed-time">13.05 WIB</time>
        </li>
      </ul>
    </div>
  </article>
</div>
```

Grafik dibuat di server sebagai SVG dengan `role="img"` dan `aria-label` yang memuat angka pentingnya; aturan lengkap ada di [Kartu dan tampilan data](kartu-dan-data.md).

### Razor {#dasbor-razor}

```cshtml
@model DashboardModel
@{
    ViewData["Title"] = "Dashboard";
    void KpiBody(Kpi k)
    {
        <div class="ds-kpi-top">
            <span class="ds-kpi-label">@k.Label</span>
            <span class="ds-kpi-icon">@Icon.Svg(k.Icon)</span>
        </div>
        <p class="ds-kpi-value">@k.Value<small>@k.Unit</small></p>
        <p class="ds-kpi-sub">@k.Hint</p>
    }
}
<div class="ds-page">
    <header class="ds-page-header is-portal">
        <div>
            <p class="ds-eyebrow">Terminal @Model.TerminalCode · @Fmt.Date(Wib.Today)</p>
            <h1 class="ds-page-title">Dashboard</h1>
        </div>
    </header>

    <div class="ds-kpis">
        @foreach (var k in Model.Kpis)
        {
            if (k.Href is null)
            {
                <div class="ds-kpi @k.Tone.Css()">@{ KpiBody(k); }</div>
            }
            else
            {
                <a class="ds-kpi @k.Tone.Css()" href="@k.Href">@{ KpiBody(k); }</a>   @* hanya <a> yang bereaksi saat hover *@
            }
        }
    </div>

    <div class="ds-grid-2">
        <article class="ds-card">
            <header class="ds-card-head"><h2>Aktivitas terbaru</h2></header>
            <div class="ds-card-body is-flush">
                @if (Model.Feed.Count == 0)
                {
                    <ds-empty icon="history" title="Belum ada aktivitas" level="3">Pengiriman dan perubahan terbaru tampil di sini.</ds-empty>
                }
                else
                {
                    <ul class="ds-feed">
                        @foreach (var f in Model.Feed)
                        {
                            <li>
                                <span class="ds-feed-dot @f.Tone.Css()"></span>
                                <div><p class="ds-feed-title">@f.Title</p><p class="ds-feed-sub">@f.Context</p></div>
                                <time class="ds-feed-time" datetime="@f.AtUtc.ToString("O")">@Wib.Format(f.AtUtc)</time>
                            </li>
                        }
                    </ul>
                }
            </div>
        </article>
    </div>
</div>
```

## Halaman masuk {#masuk}

Satu kolom, label di atas field, kontrol 44 px, satu aksi utama selebar panel. Permukaan solid: tanpa gradien dan tanpa glassmorphism. Kiri (hanya ≥ 1024 px) adalah `.ds-auth-hero` dengan gambar penuh dan nama produk; kanan `.ds-auth-main` memusatkan `.ds-auth-panel`. Halaman masuk tidak memakai `data-ds-guard`.

Pratinjau memperlihatkan panel saja; hero gambar tampil di layar lebar.

```html preview title="Panel masuk"
<div class="ds-auth-panel">
  <h1 class="ds-auth-title">Masuk ke TPS Integration</h1>
  <p class="ds-auth-subtitle">Gunakan akun yang dibuat oleh admin terminal atau pengelola layanan.</p>
  <form class="ds-auth-form" novalidate>
    <div class="ds-note is-error" role="alert" tabindex="-1">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg>
      <p>Email atau password salah.</p>
    </div>
    <div class="ds-field">
      <label for="pola-masuk-email">Email</label>
      <input id="pola-masuk-email" type="email" class="input" autocomplete="username" autocapitalize="none" spellcheck="false" value="operator@tpsintegration.local">
    </div>
    <div class="ds-field">
      <label for="pola-masuk-password">Password</label>
      <div class="ds-password">
        <input id="pola-masuk-password" type="password" class="input" autocomplete="current-password">
        <button type="button" class="ds-password-toggle" data-ds-password-toggle aria-controls="pola-masuk-password" aria-pressed="false" aria-label="Tampilkan password">
          <svg class="ds-icon" data-ds-password-icon="hidden" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>
          <svg class="ds-icon" data-ds-password-icon="shown" aria-hidden="true" hidden><use href="#ds-icon-eye-off"></use></svg>
        </button>
      </div>
    </div>
    <label class="ds-check-row">
      <input type="checkbox" class="checkbox checkbox-primary">
      <span><strong>Ingat saya</strong></span>
    </label>
    <button type="button" class="btn btn-primary">Masuk</button>
  </form>
  <p class="ds-auth-note">Lupa password? Hubungi admin terminal.</p>
</div>
```

### Razor {#masuk-razor}

Layout masuk berdiri sendiri: tanpa sidebar, tanpa dialog guard.

```cshtml
@* Views/Shared/_AuthLayout.cshtml *@
<!DOCTYPE html>
<html lang="id" data-theme="tps">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - TPS Integration</title>
    <partial name="_DsHead" model='new HeadOptions(Stylesheet: "~/css/app.css", Storage: "tps")' />
</head>
<body>
    <partial name="_DsIconSprite" />
    <div class="ds-auth">
        <section class="ds-auth-hero">
            <img src="~/images/terminal-cover.jpg" asp-append-version="true" alt="" />
            <div class="ds-brand">
                <span class="ds-brand-mark"><img src="~/images/logo-white.png" width="691" height="320" alt="" /></span>
                <span class="ds-brand-name">TPS Integration</span>
            </div>
            <div>
                <h2 class="ds-auth-hero-title">TPS Integration</h2>
                <p class="ds-auth-hero-slogan">Data Akurat, Integrasi Cepat, Pelaporan Tepat</p>
            </div>
        </section>
        <main id="main" class="ds-auth-main">@RenderBody()</main>
    </div>
    <partial name="_DsToast" />
    <partial name="_DsScripts" />
</body>
</html>
```

```cshtml
@* Views/Account/Login.cshtml *@
@model LoginViewModel
@{
    ViewData["Title"] = "Masuk";
    Layout = "_AuthLayout";
    var failed = ViewData.ModelState[string.Empty]?.Errors.Select(e => e.ErrorMessage).FirstOrDefault();
}
<div class="ds-auth-panel">
    <h1 class="ds-auth-title">Masuk ke TPS Integration</h1>
    <p class="ds-auth-subtitle">Gunakan akun yang dibuat oleh admin terminal atau pengelola layanan.</p>

    <form asp-action="Login" method="post" class="ds-auth-form" novalidate data-ds-once>
        <input type="hidden" asp-for="ReturnUrl" />
        @if (failed is not null)
        {
            <div class="ds-note is-error" role="alert" tabindex="-1" autofocus>
                <ds-icon name="x-circle" /><p>@failed</p>
            </div>
        }
        <div class="ds-field">
            <label asp-for="Email"></label>
            <input asp-for="Email" class="input" type="email" autocomplete="username" autocapitalize="none" spellcheck="false" required />
            <span asp-validation-for="Email" class="ds-field-error"></span>
        </div>
        <div class="ds-field">
            <label asp-for="Password"></label>
            <div class="ds-password">
                <input asp-for="Password" class="input" autocomplete="current-password" required />
                <button type="button" class="ds-password-toggle" data-ds-password-toggle aria-controls="Password" aria-pressed="false" aria-label="Tampilkan password">
                    <svg class="ds-icon" data-ds-password-icon="hidden" aria-hidden="true"><use href="#ds-icon-eye"></use></svg>
                    <svg class="ds-icon" data-ds-password-icon="shown" aria-hidden="true" hidden><use href="#ds-icon-eye-off"></use></svg>
                </button>
            </div>
            <span asp-validation-for="Password" class="ds-field-error"></span>
        </div>
        <label class="ds-check-row">
            <input asp-for="RememberMe" class="checkbox checkbox-primary" />
            <span><strong>Ingat saya</strong></span>
        </label>
        <button type="submit" class="btn btn-primary" data-ds-loading-label="Memeriksa…">Masuk</button>
    </form>

    <p class="ds-auth-note">Lupa password? Hubungi admin terminal.</p>
</div>
```

Pesan gagal masuk tidak menyebut apakah email atau password yang salah. Tombol utama mendapat `width: 100%` dari `.ds-auth-form`.

## Halaman galat {#galat}

Halaman galat memberi tahu apa yang terjadi dan ke mana pergi berikutnya, dalam satu kalimat dan satu tombol utama. Pesan sistem, SQL, dan jejak tumpukan tidak pernah tampil; tampilkan `Request ID` supaya admin bisa mencocokkannya dengan log.

| Kode | Kalimat |
| --- | --- |
| 400 | Permintaan tidak dapat diproses. Muat ulang halaman lalu coba lagi. |
| 403 | Anda tidak punya akses ke halaman ini. |
| 404 | Halaman atau data tidak ditemukan. |
| 429 | Terlalu banyak permintaan. Tunggu beberapa saat lalu coba lagi. |
| 500 | Terjadi kesalahan saat memproses permintaan. |

```html preview title="Halaman galat"
<div class="ds-empty is-boxed">
  <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-alert"></use></svg></span>
  <h1>Halaman atau data tidak ditemukan.</h1>
  <p>Tautan mungkin sudah kedaluwarsa, atau datanya sudah dihapus.</p>
  <a class="btn btn-primary btn-sm" href="#">Kembali ke dashboard</a>
  <p class="ds-text-subtle">Request ID: <span class="ds-id">0HN7K2M9QX4B3:00000001</span></p>
</div>
```

```csharp
// Program.cs
app.UseExceptionHandler("/Error");
app.UseStatusCodePagesWithReExecute("/Error/{0}");

// ErrorController
[Route("Error/{statusCode:int?}"), AllowAnonymous]
public IActionResult Index(int? statusCode = null) =>
    View(new ErrorViewModel(statusCode ?? 500, HttpContext.TraceIdentifier));
```

```cshtml
@model ErrorViewModel
@{
    ViewData["Title"] = Model.StatusCode == 403 ? "Akses ditolak" : "Terjadi kesalahan";
    Layout = User.Identity?.IsAuthenticated == true ? "_Layout" : "_AuthLayout";
    var message = Model.StatusCode switch
    {
        400 => "Permintaan tidak dapat diproses. Muat ulang halaman lalu coba lagi.",
        403 => "Anda tidak punya akses ke halaman ini.",
        404 => "Halaman atau data tidak ditemukan.",
        429 => "Terlalu banyak permintaan. Tunggu beberapa saat lalu coba lagi.",
        _ => "Terjadi kesalahan saat memproses permintaan.",
    };
}
<div class="ds-empty is-boxed">
    <span class="ds-empty-icon">@Icon.Svg("alert", "ds-icon is-lg")</span>
    <h1>@message</h1>
    <p>Bila berulang, hubungi admin dan sebutkan Request ID di bawah.</p>
    <a asp-controller="Home" asp-action="Index" class="btn btn-primary btn-sm">@Icon.Svg("arrow-left") Kembali ke dashboard</a>
    <p class="ds-text-subtle">Request ID: <span class="ds-id">@Model.RequestId</span></p>
</div>
```

`<ds-empty>` membatasi tingkat judul ke 2–4, jadi halaman galat menulis markup `.ds-empty` sendiri agar judulnya `<h1>`.

## Responsif {#responsif}

Tiga titik henti, semuanya `min-width`/`max-width` tetap. Uji setiap halaman di 360 px, 768 px, dan 1280 px.

| Lebar | Yang berubah |
| --- | --- |
| ≤ 640 px (ponsel) | Top bar membungkus; aksi top bar rata kanan selebar penuh. `.ds-page-header` menumpuk. Tabel `.ds-table` dan `.ds-list-table` menjadi kartu berlabel dari `data-label` tiap `td`. `.ds-field-grid` satu kolom. Footer form menumpuk dengan aksi utama di atas. Semua input 16 px agar iOS tidak memperbesar halaman. `.ds-dl.is-detail` satu kolom |
| < 1024 px | Sidebar menjadi drawer dari kiri (`data-nav-open` di `.ds-shell`), scrim dan tombol menu tampil; `.ds-auth-hero` disembunyikan |
| ≥ 1024 px | Sidebar kolom tetap 16 rem, bisa diringkas ke rail 4.75 rem (`data-ds-sidebar-collapsed` di `<html>`). Padding top bar dan `main` menjadi 2 rem di sisi. `.ds-auth` dua kolom 5 : 4 |
| ≤ 1180 px | `.ds-toolbar` menjadi satu kolom; kelompok aksi turun ke baris sendiri, tetap rata kanan, selebar penuh |

Tinggi kontrol minimal 44 px di semua lebar. Tabel transaksi lebar tidak menumpuk: ia bergulir horizontal di dalam `.ds-table-scroll` yang bisa difokuskan keyboard, dengan kolom identitas menempel.

## Jangan

- Jangan memakai dua `<h1>` di satu halaman, atau melompati level judul.
- Jangan menaruh dua tombol utama di satu kepala atau footer.
- Jangan menaruh tabel atau form di luar `.ds-surface` (atau `.ds-card`); latar `base-200` bukan tempat konten.
- Jangan memakai `history.back()` untuk tautan kembali di dalam halaman; pakai `returnUrl` lokal.
- Jangan memakai gradien, glassmorphism, atau dekorasi di halaman masuk dan dasbor.
- Jangan menaruh export dan import dalam satu kelompok: export kiri, import dan input kanan.
