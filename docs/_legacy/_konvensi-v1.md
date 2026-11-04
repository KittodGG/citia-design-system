# Konvensi penulisan dokumentasi

File berawalan `_` tidak tampil di situs. Halaman ini aturan untuk siapa pun yang menulis atau mengubah `docs/*.md`.

## Bahasa dan nada

- Bahasa Indonesia baku yang ringkas. Istilah teknis tetap dalam bentuk aslinya: `class`, `token`, `focus ring`, `tag helper`, `partial`, `popover`.
- Kalimat aturan memakai bentuk perintah: "Pakai satu tombol utama per area." "Jangan mewarnai status tanpa kata."
- Sebut angka, bukan kata sifat: 44 px, 6 detik, 4.5:1, 24 px, 180 ms.
- Hindari pembuka dan penutup basa-basi ("Mari kita", "Dengan demikian", "Pada akhirnya"), klaim berlebihan ("sangat penting", "sempurna"), emoji, dan tanda seru.
- Contoh isi memakai konteks TPS yang realistis: No BL `BL-2026-00841`, tangki `T-01`, kapal `MT Sinar Jaya`, pelanggan `PT Akr Corporindo`, satuan `TNE`, waktu `WIB`.
- Kuantitas memakai titik desimal tanpa pemisah ribuan (`1574782 TNE`, `992.5 TNE`). Tanggal `25 Jan 2026`. Jam `14.30 WIB`.

## Frontmatter

Setiap halaman dimulai dengan:

```yaml
---
title: Tombol
group: Komponen
order: 1
summary: Satu kalimat (≤ 160 karakter) yang tampil sebagai lede dan meta description.
source: TPS Styles/app.css L3044–3106; Views/Shared/_EntryActions.cshtml
---
```

`group` salah satu dari: `Mulai`, `Fondasi`, `Komponen`, `Pola`, `Konten`, `Referensi`. `order` mengurutkan halaman di dalam grup. `source` opsional: jejak asal di TPS.

## Struktur

- Judul halaman berasal dari frontmatter. Jangan menulis `#` (h1) di isi.
- Paragraf pembuka sebelum `##` pertama boleh ada, maksimal dua paragraf pendek.
- `##` = bagian (tracker level 0), `###` = sub-bagian (level 1), `####` = rincian (level 2). Jangan melompati level.
- Judul pendek (≤ 40 karakter), huruf kapital hanya di awal: "Tombol utama", bukan "Tombol Utama".
- Id judul dibuat otomatis dari teksnya. Id eksplisit: `## Tombol utama {#utama}`.
- Satu halaman sebaiknya ≤ 30 judul (`##` + `###` + `####`) agar tracker tetap terbaca.

## Halaman komponen

Setiap komponen = satu `##`. Di bawahnya, maksimal empat `###` dari daftar ini, sesuai kebutuhan:

1. Kalimat pembuka (tanpa judul): kapan dipakai dan kapan tidak.
2. Pratinjau langsung (` ```html preview `).
3. `### Varian` — tabel `Kelas | Pakai untuk`.
4. `### State dan perilaku` — hover, fokus, aktif, nonaktif, sibuk, galat; hook `data-ds-*`; keyboard.
5. `### Aksesibilitas` — peran ARIA, nama aksesibel, target 44 px, kontras, kata status.
6. `### Razor` — contoh `cshtml` memakai tag helper / partial / helper C#.

Anatomi, token yang dipakai, dan asal TPS ditulis sebagai paragraf berlabel tebal atau daftar pendek, bukan judul:

```markdown
**Anatomi.** `.ds-card` → `.ds-card-head` (judul + aksi) → `.ds-card-body` → `.ds-card-foot` (opsional).

**Token.** `--ds-radius-card`, `--color-base-300`, `--ds-space-card-x`.

**Asal TPS.** `.pt-card` di `Styles/app.css` L3461–3468.
```

## Callout

Pakai sintaks peringatan GitHub (juga tampil benar di GitHub):

```markdown
> [!NOTE]
> Info tambahan.

> [!TIP]
> Cara yang disarankan.

> [!IMPORTANT]
> Aturan yang wajib diikuti.

> [!WARNING]
> Risiko kalau aturan dilanggar.

> [!CAUTION]
> Tindakan yang tidak bisa dibatalkan atau berbahaya.
```

## Blok kode

| Info string | Hasil di situs |
| --- | --- |
| ` ```html preview ` | Pratinjau langsung (tema mengikuti situs, bisa dialihkan per pratinjau) + kode di bawahnya |
| ` ```html preview title="Tombol utama" ` | Sama, dengan label |
| ` ```cshtml ` | Razor (ASP.NET Core) |
| ` ```csharp ` | C# |
| ` ```css `, ` ```js `, ` ```json `, ` ```html ` | Kode biasa |
| ` ```powershell `, ` ```bash ` | Perintah terminal |
| ` ```ds-swatches ` dan `ds-*` lain | Direktif visual (khusus halaman fondasi) |

Setiap blok kode punya tombol Salin.

## Isi pratinjau HTML

- Fragmen mandiri. Tanpa `<script>`, tanpa atribut `on*`, tanpa sumber eksternal (gambar CDN, font).
- Ikon memakai sprite yang sudah ada di halaman:
  `<svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>`. Ukuran: tambah `is-xs`, `is-md`, `is-lg`, `is-xl`.
- Interaksi hanya lewat atribut `data-ds-*` (ds.js dimuat di situs): `data-ds-dialog-open="id"`, `data-ds-dialog-close`, `data-ds-confirm`, `data-ds-toast-show`, `details[data-ds-menu]`, `data-ds-copy`, `data-ds-password-toggle`, `select[data-ds-combobox]`, `table[data-ds-pin]`, `data-ds-tree-toggle`, `data-ds-theme-toggle`.
- Setiap `id` unik di halaman: awali dengan slug halaman, misalnya `id="tombol-dialog-hapus"`.
- Formulir di pratinjau tidak dikirim (situs menahan submit dan menampilkan toast).
- Panjang maksimal sekitar 40 baris per pratinjau. Pecah jadi beberapa pratinjau bila lebih.
- Pratinjau dirender di atas kanvas `base-200`, seperti latar halaman aplikasi.

## Nama ikon yang tersedia

dashboard, inbound, outbound, send, history, ship, customer, port, tank, truck, plus, pencil, trash, eye, eye-off, search, filter, x, check, check-circle, alert, info, x-circle, clock, refresh, code, download, sun, moon, menu, logout, user, users, chevron-right, chevron-left, chevron-down, arrow-left, arrow-up, arrow-down, chevrons-up-down, copy, file, file-import, file-xls, file-pdf, scale, lock, shield, building, warehouse, briefcase, package, plug, database, bell, megaphone, activity, server, key, archive, restore, user-plus, trending-up, calendar, sliders, pie, mail, credit-card, hourglass, layers, log-in, more, progress.

## API Razor yang tersedia (Citia.DesignSystem)

| API | Bentuk |
| --- | --- |
| `@Icon.Svg("name", css = "ds-icon", label = null)` | Ikon inline |
| `<ds-icon name="plus" size="md" />` | Tag helper ikon |
| `<ds-pill tone="Success" live outline plain>Aktif</ds-pill>` | Pill status (`Tone`: Neutral, Primary, Info, Success, Warning, Error) |
| `<ds-tag tone="Info">Trial</ds-tag>` | Tag tanpa titik |
| `<ds-empty icon="tank" title="…" action-label="…" action-href="…" boxed level="2">Kalimat.</ds-empty>` | Empty state |
| `this.Toast(Tone.Success, "Judul", "Teks")` | Toast setelah redirect (Controller / PageModel) |
| `<partial name="_DsToast" />` | Region toast + toast dari TempData |
| `<partial name="_DsConfirmDialog" />`, `<partial name="_DsLeaveDialog" />` | Dialog bersama untuk `data-ds-confirm` dan guard perubahan |
| `<partial name="_DsPager" model="Model.Rows.Pager()" />` | Pager |
| `<partial name="_DsSortHeader" model='new SortHeaderModel("Nama", "name", Model.Rows.Sort)' />` | Header kolom yang bisa diurutkan |
| `<partial name="_DsPageSize" model="Model.Rows.PageSize" />` | Pilihan jumlah baris |
| `<partial name="_DsSidebarNav" model="nav" />` | Navigasi sidebar (`NavModel`, `NavGroup`, `NavItem`) |
| `<partial name="_DsHead" model='new HeadOptions(Stylesheet: "~/css/app.css")' />`, `<partial name="_DsScripts" />`, `<partial name="_DsIconSprite" />` | Kepala halaman, skrip, sprite ikon |
| `Fmt.Qty`, `Fmt.Number`, `Fmt.Date`, `Fmt.DateTime`, `Fmt.Percent`, `Fmt.Diff`, `Fmt.Range`, `Wib.Format` | Format angka/tanggal |
| `ListSort.Parse`, `ListPage<T>`, `PageSizes`, `QueryUrl.With` | Daftar, urutan, paging |
