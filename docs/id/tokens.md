---
title: Token
group: reference
order: 1
summary: Semua token beserta nilai akhirnya di tiap tema. Dihasilkan otomatis dari tokens/tokens.json.
---

> [!NOTE]
> Halaman ini **dihasilkan** oleh `dotnet run tools/tokens.cs`. Ubah `tokens/tokens.json` (dan `tokens/descriptions.id.json` untuk deskripsi Indonesia), lalu jalankan ulang. Source: TPS/TPS.Integration/Styles/app.css @ 88cd8e4.

## Nama tema dan alias

Setiap tema dikenali lewat namanya dan aliasnya di `data-theme` (alias menjaga aplikasi lama tetap jalan).

| `data-theme` | Nilai |
| --- | --- |
| `light` | light · alias: `tps` |
| `dark` | dark · alias: `tps-dark` |

## Warna tema

Kolom pertama adalah variabel CSS. `--color-*` mengikuti daisyUI 5; `--ds-*` adalah ekstensi Citia.

| Variabel | `light` | `dark` | Peran |
| --- | --- | --- | --- |
| `--color-base-100` | `#f9f9f6` | `#151c25` | Permukaan: kartu, tabel, input, sidebar dokumen. |
| `--color-base-200` | `#f1f2ee` | `#0e141b` | Latar halaman, header tabel, field readonly. |
| `--color-base-300` | `#dfe3dd` | `#253040` | Border dan pemisah. |
| `--color-base-content` | `#0f172a` | `#e6edf3` | Teks utama. |
| `--color-primary` | `#00838f` | `#00a4b2` | Aksi utama, navigasi aktif, fokus merek. |
| `--color-primary-content` | `#ffffff` | `#0e141b` |  |
| `--color-secondary` | `#00767f` | `#05666f` | Latar sidebar aplikasi. |
| `--color-secondary-content` | `#ffffff` | `#ffffff` |  |
| `--color-accent` | `#00a4b2` | `#00d4df` | Cincin fokus, penanda rail aktif, grafik. |
| `--color-accent-content` | `#0f172a` | `#0e141b` |  |
| `--color-neutral` | `#0f172a` | `#e6edf3` |  |
| `--color-neutral-content` | `#f6f8fa` | `#0e141b` |  |
| `--color-info` | `#3b6fd4` | `#7aa2f7` |  |
| `--color-info-content` | `#ffffff` | `#0e141b` |  |
| `--color-success` | `#047857` | `#34d399` |  |
| `--color-success-content` | `#ffffff` | `#0e141b` |  |
| `--color-warning` | `#c2410c` | `#f59e0b` |  |
| `--color-warning-content` | `#ffffff` | `#0e141b` |  |
| `--color-error` | `#dc2626` | `#f87171` |  |
| `--color-error-content` | `#ffffff` | `#0e141b` |  |
| `--ds-control-border` | `#7b8a94` | `#74848f` | Border input, select, tombol sekunder (≥ 3:1). |
| `--ds-quiet` | `#006a73` | `var(--color-primary)` | Teks teal tenang: tombol ghost, eyebrow, ikon kosong. |
| `--ds-link` | `#2b5cc4` | `var(--color-info)` | Tautan identitas (.ds-link-ref). Biru hanya untuk tautan. |
| `--ds-error-text` | `#b91c1c` | `var(--color-error)` |  |
| `--ds-warning-text` | `#9a3412` | `var(--color-warning)` |  |
| `--ds-popover` | `var(--color-base-100)` | `color-mix(in oklab, var(--color-base-100) 94%, #ffffff)` | Permukaan lapisan melayang (dropdown, kalender, combobox). |
| `--ds-popover-border` | `var(--ds-control-border)` | `var(--ds-control-border)` |  |
| `--ds-popover-hover` | `color-mix(in oklab, var(--color-base-content) 7%, var(--color-base-100))` | `color-mix(in oklab, var(--color-base-100) 88%, #ffffff)` |  |
| `--ds-subtle` | `color-mix(in oklab, var(--color-base-content) 75%, var(--color-base-100))` | `color-mix(in oklab, var(--color-base-content) 75%, var(--color-base-100))` | Teks sekunder: bantuan field, keterangan, label meta. |
| `--ds-muted` | `color-mix(in oklab, var(--color-base-content) 68%, transparent)` | `color-mix(in oklab, var(--color-base-content) 68%, transparent)` | Teks tersier yang tetap lolos AA di base-100 (.text-muted). |
| `--ds-focus` | `#00838f` | `#00d4df` | Cincin fokus. Versi lama memakai accent (#00a4b2 = 2.86:1 di base-100); DS memakai primary agar ≥ 3:1 (WCAG 1.4.11). |
| `--ds-scrim` | `rgb(8 18 28 / .4)` | `rgb(8 18 28 / .4)` | Latar belakang modal (::backdrop). |
| `--ds-excel` | `#1d6f42` | `#1d6f42` |  |
| `--ds-excel-hover` | `#185c37` | `#185c37` |  |
| `--ds-pdf` | `#b30b00` | `#b30b00` |  |
| `--ds-pdf-hover` | `#8f0900` | `#8f0900` |  |
| `--ds-syntax-tag` | `#006780` | `#66d9e8` | Tag XML/HTML. |
| `--ds-syntax-attr` | `#8c3a17` | `#edba82` | Atribut XML/HTML. |
| `--ds-primary-soft` | `color-mix(in oklab, var(--color-primary) 12%, var(--color-base-100))` | `color-mix(in oklab, var(--color-primary) 20%, var(--color-base-100))` | Isian tonal primary untuk permukaan status (alert, pill, chip, baris terpilih). Pasangkan dengan --ds-primary-text atau teks dasar. |
| `--ds-info-soft` | `color-mix(in oklab, var(--color-info) 12%, var(--color-base-100))` | `color-mix(in oklab, var(--color-info) 20%, var(--color-base-100))` | Isian tonal info untuk permukaan status (alert, pill, chip, baris terpilih). Pasangkan dengan --ds-info-text atau teks dasar. |
| `--ds-success-soft` | `color-mix(in oklab, var(--color-success) 12%, var(--color-base-100))` | `color-mix(in oklab, var(--color-success) 20%, var(--color-base-100))` | Isian tonal success untuk permukaan status (alert, pill, chip, baris terpilih). Pasangkan dengan --ds-success-text atau teks dasar. |
| `--ds-warning-soft` | `color-mix(in oklab, var(--color-warning) 12%, var(--color-base-100))` | `color-mix(in oklab, var(--color-warning) 20%, var(--color-base-100))` | Isian tonal warning untuk permukaan status (alert, pill, chip, baris terpilih). Pasangkan dengan --ds-warning-text atau teks dasar. |
| `--ds-error-soft` | `color-mix(in oklab, var(--color-error) 12%, var(--color-base-100))` | `color-mix(in oklab, var(--color-error) 20%, var(--color-base-100))` | Isian tonal error untuk permukaan status (alert, pill, chip, baris terpilih). Pasangkan dengan --ds-error-text atau teks dasar. |
| `--ds-neutral-soft` | `color-mix(in oklab, var(--color-base-content) 6%, var(--color-base-100))` | `color-mix(in oklab, var(--color-base-content) 10%, var(--color-base-100))` | Isian tonal netral: tag, pill nonaktif, latar kode inline. |
| `--ds-info-text` | `#2b5cc4` | `var(--color-info)` | Teks dan ikon info di permukaan terang (≥ 4.5:1). |
| `--ds-success-text` | `#047857` | `var(--color-success)` | Teks dan ikon sukses di permukaan terang (≥ 4.5:1). |
| `--ds-primary-text` | `#006a73` | `var(--color-primary)` | Teks berwarna primary di permukaan terang (≥ 4.5:1). |
| `--ds-chart-1` | `var(--color-primary)` | `var(--color-primary)` | Seri grafik kategorikal 1. Kontras grafis di base-100 (≥ 3.9:1); pakai sesuai urutan, jangan jadi satu-satunya penanda (beri label atau legenda). |
| `--ds-chart-2` | `#3a61c4` | `#86a9f7` | Seri grafik kategorikal 2. Kontras grafis di base-100 (≥ 3.9:1); pakai sesuai urutan, jangan jadi satu-satunya penanda (beri label atau legenda). |
| `--ds-chart-3` | `#c26300` | `#f0a646` | Seri grafik kategorikal 3. Kontras grafis di base-100 (≥ 3.9:1); pakai sesuai urutan, jangan jadi satu-satunya penanda (beri label atau legenda). |
| `--ds-chart-4` | `#c72c53` | `#f6838e` | Seri grafik kategorikal 4. Kontras grafis di base-100 (≥ 3.9:1); pakai sesuai urutan, jangan jadi satu-satunya penanda (beri label atau legenda). |
| `--ds-chart-5` | `#137738` | `#6cd092` | Seri grafik kategorikal 5. Kontras grafis di base-100 (≥ 3.9:1); pakai sesuai urutan, jangan jadi satu-satunya penanda (beri label atau legenda). |
| `--ds-chart-6` | `#8048b6` | `#be95ec` | Seri grafik kategorikal 6. Kontras grafis di base-100 (≥ 3.9:1); pakai sesuai urutan, jangan jadi satu-satunya penanda (beri label atau legenda). |
| `--ds-chart-7` | `#576574` | `#a0b0c1` | Seri grafik kategorikal 7. Kontras grafis di base-100 (≥ 3.9:1); pakai sesuai urutan, jangan jadi satu-satunya penanda (beri label atau legenda). |
| `--ds-chart-8` | `#857d0b` | `#c9c261` | Seri grafik kategorikal 8. Kontras grafis di base-100 (≥ 3.9:1); pakai sesuai urutan, jangan jadi satu-satunya penanda (beri label atau legenda). |

## Bayangan per tema

| Variabel | `light` | `dark` | Peran |
| --- | --- | --- | --- |
| `--ds-shadow-popover` | `0 .5rem 1.5rem rgb(15 23 42 / .16)` | `0 .5rem 1.5rem rgb(0 0 0 / .36)` | Lapisan melayang: combobox, kalender, menu popover. |
| `--ds-shadow-lift` | `0 14px 26px -16px rgb(6 30 46 / .5), 0 2px 6px rgb(6 30 46 / .06)` | `0 14px 28px -14px rgb(0 0 0 / .8)` | Kartu interaktif saat hover/fokus. |
| `--ds-shadow-pinned-end` | `-4px 0 8px rgb(0 0 0 / .04)` | `-4px 0 8px rgb(0 0 0 / .16)` | Kolom sticky kanan saat tabel digeser. |

## Bentuk daisyUI

| Variabel | Nilai | Peran |
| --- | --- | --- |
| `--radius-selector` | `0.375rem` | Checkbox, toggle, badge. |
| `--radius-field` | `0.375rem` | Tombol, input, select, tab. |
| `--radius-box` | `0.625rem` | Kartu, modal, alert, permukaan. |
| `--size-selector` | `0.25rem` |  |
| `--size-field` | `0.25rem` |  |
| `--border` | `1px` |  |
| `--depth` | `0` | 0 = permukaan datar tanpa gradien/bayangan bawaan daisyUI. |
| `--noise` | `0` |  |

## Palet primitif

Komponen tidak pernah memakai primitif langsung. Ganti di sini; tema mengikuti lewat referensi `{palette.*}`.

| Token | Nilai | Catatan |
| --- | --- | --- |
| `palette.white` | `#ffffff` |  |
| `palette.teal.500` | `#00a4b2` | Teal utama. Grafik besar (isi wadah), primary tema gelap. Teks putih di atasnya hanya 3.0:1, jadi bukan warna tombol tema terang. |
| `palette.teal.600` | `#00838f` | Teal-600 utama. Primary tema terang (teks putih ≥ 4.5:1). |
| `palette.teal.700` | `#00767f` | Secondary tema terang; latar sidebar. |
| `palette.teal.750` | `#006a73` | Teks teal tenang (quiet) tema terang. |
| `palette.teal.800` | `#05666f` | Secondary tema gelap; latar sidebar gelap. |
| `palette.aqua.400` | `#00d4df` | Accent tema gelap; penanda aktif. |
| `palette.paper.50` | `#f9f9f6` | Off-white permukaan (base-100 terang). Arahan review 29 Okt 2026. |
| `palette.paper.100` | `#f1f2ee` | Off-white latar (base-200 terang). |
| `palette.paper.200` | `#dfe3dd` | Garis/border tenang (base-300 terang). |
| `palette.steel.400` | `#7b8a94` | Border kontrol tema terang (≥ 3:1 terhadap permukaan). |
| `palette.steel.450` | `#74848f` | Border kontrol tema gelap. |
| `palette.slate.900` | `#0f172a` | Tinta utama tema terang; neutral. |
| `palette.frost.50` | `#f6f8fa` | Neutral-content tema terang. |
| `palette.frost.100` | `#e6edf3` | Tinta utama tema gelap. |
| `palette.night.700` | `#253040` | Border tema gelap (base-300). |
| `palette.night.800` | `#151c25` | Permukaan tema gelap (base-100). |
| `palette.night.900` | `#0e141b` | Latar tema gelap (base-200); teks di atas warna terang tema gelap. |
| `palette.blue.400` | `#7aa2f7` | Info dan tautan tema gelap (≥ 5.3:1 pada base-100/200/300). |
| `palette.blue.500` | `#3b6fd4` | Info tema terang (4.47:1 pada base-200, jadi bukan warna teks tautan). |
| `palette.blue.600` | `#2b5cc4` | Tautan tema terang (≥ 5.75:1 pada base-100, base-200 dan baris hover). |
| `palette.emerald.400` | `#34d399` |  |
| `palette.emerald.700` | `#047857` |  |
| `palette.amber.500` | `#f59e0b` |  |
| `palette.orange.700` | `#c2410c` |  |
| `palette.orange.800` | `#9a3412` | Teks peringatan tema terang. |
| `palette.red.400` | `#f87171` |  |
| `palette.red.600` | `#dc2626` |  |
| `palette.red.700` | `#b91c1c` | Teks galat tema terang. |
| `palette.excel.600` | `#1d6f42` | Hijau Excel: import/download/export .xlsx. |
| `palette.excel.700` | `#185c37` |  |
| `palette.pdf.600` | `#b30b00` | Merah PDF: export .pdf. |
| `palette.pdf.700` | `#8f0900` |  |
| `palette.avatar.c0` | `#00838f` |  |
| `palette.avatar.c1` | `#2b5cc4` |  |
| `palette.avatar.c2` | `#7c3aed` |  |
| `palette.avatar.c3` | `#c2410c` |  |
| `palette.avatar.c4` | `#047857` |  |
| `palette.avatar.c5` | `#be185d` |  |
| `palette.avatar.c6` | `#4d7c0f` |  |
| `palette.avatar.c7` | `#0e7490` |  |
| `palette.brand.deep` | `#04222a` |  |
| `palette.brand.ink` | `#0b1720` |  |
| `palette.brand.amber` | `#ffb938` |  |

## Font

| Variabel | Nilai | Catatan |
| --- | --- | --- |
| `--ds-font-sans` | `"Manrope", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | Manrope variable 200–800 (dipakai 400–800), self-hosted, OFL 1.1. |
| `--ds-font-mono` | `ui-monospace, "Cascadia Mono", "Segoe UI Mono", Consolas, "SF Mono", Menlo, monospace` | Hanya XML, kode literal, kunci rahasia. |
| `--ds-weight-regular` | `400` |  |
| `--ds-weight-medium` | `500` |  |
| `--ds-weight-semibold` | `600` |  |
| `--ds-weight-strong` | `650` |  |
| `--ds-weight-bold` | `700` |  |
| `--ds-weight-heavy` | `750` |  |
| `--ds-weight-extrabold` | `800` |  |

## Tipografi

| Variabel | Nilai | Catatan |
| --- | --- | --- |
| `--ds-type-display-size` | `clamp(2rem, 3vw, 3rem)` | Judul hero halaman login/landing (.auth-hero-title). |
| `--ds-type-display-leading` | `1.1` |  |
| `--ds-type-display-weight` | `750` |  |
| `--ds-type-display-tracking` | `-0.04em` |  |
| `--ds-type-title-1-size` | `clamp(1.75rem, 2.5vw, 2.25rem)` | Judul halaman (h1) daftar/form/detail (.master-heading h1). |
| `--ds-type-title-1-leading` | `1.15` |  |
| `--ds-type-title-1-weight` | `650` |  |
| `--ds-type-title-1-tracking` | `-0.035em` |  |
| `--ds-type-title-2-size` | `clamp(1.375rem, 2vw, 1.75rem)` | Judul layar portal/dashboard (.pt-header h1). |
| `--ds-type-title-2-leading` | `1.2` |  |
| `--ds-type-title-2-weight` | `750` |  |
| `--ds-type-title-2-tracking` | `-0.03em` |  |
| `--ds-type-title-3-size` | `clamp(1.25rem, 1.6vw, 1.625rem)` | Judul di top bar (.topbar-title). |
| `--ds-type-title-3-leading` | `1.25` |  |
| `--ds-type-title-3-weight` | `750` |  |
| `--ds-type-title-3-tracking` | `-0.03em` |  |
| `--ds-type-title-auth-size` | `1.75rem` | Judul panel login (.auth-title). |
| `--ds-type-title-auth-leading` | `1.2` |  |
| `--ds-type-title-auth-weight` | `650` |  |
| `--ds-type-title-auth-tracking` | `-0.02em` |  |
| `--ds-type-headline-size` | `1.25rem` | Judul dialog, empty state (.qa-title, .master-empty h2). |
| `--ds-type-headline-leading` | `1.3` |  |
| `--ds-type-headline-weight` | `650` |  |
| `--ds-type-headline-tracking` | `-0.01em` |  |
| `--ds-type-section-size` | `1.0625rem` | Legend fieldset, judul bagian form (.master-fieldset legend). |
| `--ds-type-section-leading` | `1.4` |  |
| `--ds-type-section-weight` | `650` |  |
| `--ds-type-section-tracking` | `0` |  |
| `--ds-type-card-title-size` | `0.9375rem` | Judul kartu (.pt-card-head h2). |
| `--ds-type-card-title-leading` | `1.4` |  |
| `--ds-type-card-title-weight` | `700` |  |
| `--ds-type-card-title-tracking` | `0` |  |
| `--ds-type-body-size` | `1rem` | Teks isi dan semua input (16 px mencegah zoom di iOS). |
| `--ds-type-body-leading` | `1.5` |  |
| `--ds-type-body-weight` | `400` |  |
| `--ds-type-body-tracking` | `0` |  |
| `--ds-type-label-size` | `0.9375rem` | Label field (.master-field > label). |
| `--ds-type-label-leading` | `1.5` |  |
| `--ds-type-label-weight` | `600` |  |
| `--ds-type-label-tracking` | `0` |  |
| `--ds-type-callout-size` | `0.875rem` | Isi tabel, item navigasi, tombol. |
| `--ds-type-callout-leading` | `1.5` |  |
| `--ds-type-callout-weight` | `400` |  |
| `--ds-type-callout-tracking` | `0` |  |
| `--ds-type-footnote-size` | `0.8125rem` | Bantuan field, header tabel data, catatan (.master-help). |
| `--ds-type-footnote-leading` | `1.5` |  |
| `--ds-type-footnote-weight` | `400` |  |
| `--ds-type-footnote-tracking` | `0` |  |
| `--ds-type-caption-size` | `0.75rem` | Keterangan KPI, waktu, meta (.pt-kpi-sub). |
| `--ds-type-caption-leading` | `1.4` |  |
| `--ds-type-caption-weight` | `400` |  |
| `--ds-type-caption-tracking` | `0` |  |
| `--ds-type-eyebrow-size` | `0.6875rem` | Kepala grup sidebar, eyebrow portal, label badge (.sb-group-toggle, .pt-eyebrow). |
| `--ds-type-eyebrow-leading` | `1rem` |  |
| `--ds-type-eyebrow-weight` | `700` |  |
| `--ds-type-eyebrow-tracking` | `0.08em` |  |
| `--ds-type-table-head-size` | `0.6875rem` | Header tabel modern (.pt-table th). |
| `--ds-type-table-head-leading` | `1rem` |  |
| `--ds-type-table-head-weight` | `700` |  |
| `--ds-type-table-head-tracking` | `0.06em` |  |
| `--ds-type-micro-size` | `0.625rem` | Angka badge notifikasi (.notif-badge). |
| `--ds-type-micro-leading` | `1` |  |
| `--ds-type-micro-weight` | `800` |  |
| `--ds-type-micro-tracking` | `0` |  |
| `--ds-type-metric-size` | `1.75rem` | Angka KPI (.pt-kpi-value). |
| `--ds-type-metric-leading` | `1.1` |  |
| `--ds-type-metric-weight` | `750` |  |
| `--ds-type-metric-tracking` | `-0.03em` |  |

## Spasi

| Variabel | Nilai | Catatan |
| --- | --- | --- |
| `--ds-space-0` | `0` |  |
| `--ds-space-0-5` | `0.125rem` |  |
| `--ds-space-1` | `0.25rem` |  |
| `--ds-space-1-5` | `0.375rem` |  |
| `--ds-space-2` | `0.5rem` |  |
| `--ds-space-2-5` | `0.625rem` |  |
| `--ds-space-3` | `0.75rem` |  |
| `--ds-space-3-5` | `0.875rem` |  |
| `--ds-space-4` | `1rem` |  |
| `--ds-space-4-5` | `1.125rem` |  |
| `--ds-space-5` | `1.25rem` |  |
| `--ds-space-6` | `1.5rem` |  |
| `--ds-space-7` | `1.75rem` |  |
| `--ds-space-8` | `2rem` |  |
| `--ds-space-10` | `2.5rem` |  |
| `--ds-space-12` | `3rem` |  |
| `--ds-space-field-stack` | `0.5rem` | Label → input → bantuan (8 px). |
| `--ds-space-field-group` | `1.5rem` | Antar kelompok field dan antar section form (24 px). |
| `--ds-space-section` | `2rem` | Antar blok besar dalam form/detail (32 px). |
| `--ds-space-card-x` | `1.125rem` | Padding horizontal kartu portal. |
| `--ds-space-card-y` | `1rem` |  |
| `--ds-space-panel` | `2rem` | Padding isi form/detail desktop; 1.25rem di ≤ 640 px. |
| `--ds-space-toolbar-gap` | `1rem 1.5rem` | Celah baris × kolom toolbar halaman. |

## Radius

| Variabel | Nilai | Catatan |
| --- | --- | --- |
| `--ds-radius-none` | `0` |  |
| `--ds-radius-xs` | `0.125rem` | Fokus tautan. |
| `--ds-radius-sm` | `0.25rem` | Status master, item menu. |
| `--ds-radius-md` | `0.375rem` | Field, tombol (radius-field). |
| `--ds-radius-lg` | `0.5rem` | Pill navigasi, popup combobox, opsi. |
| `--ds-radius-box` | `0.625rem` | Permukaan, modal, alert (radius-box). |
| `--ds-radius-xl` | `0.75rem` | Kontrol top bar, tab container, notice. |
| `--ds-radius-card` | `0.875rem` | Kartu portal, KPI, dropzone, panel. |
| `--ds-radius-2xl` | `1rem` | Dialog besar. |
| `--ds-radius-full` | `999px` | Pill, chip, badge, dot. |

## Border

| Variabel | Nilai | Catatan |
| --- | --- | --- |
| `--ds-border-hairline` | `1px` |  |
| `--ds-border-emphasis` | `1.5px` | Dropzone bergaris putus. |
| `--ds-border-focus` | `2px` | Cincin fokus, penanda rail aktif. |
| `--ds-border-accent` | `3px` | Garis aksen kiri (baris bermasalah, data yang ada). |
| `--ds-border-rail` | `4px` | Rail anak di tabel pohon. |
| `--ds-border-edge` | `0.3125rem` | Tepi kiri banner/kartu notifikasi (5 px). |
| `--ds-border-tone-bar` | `0.25rem` | Bar warna kiri kartu KPI. |

## Bayangan tetap

| Variabel | Nilai | Catatan |
| --- | --- | --- |
| `--ds-shadow-none` | `none` |  |
| `--ds-shadow-xs` | `0 1px 2px rgb(15 23 42 / .08)` | Tab/segmen aktif. |
| `--ds-shadow-menu` | `0 4px 16px rgb(0 0 0 / .04)` | Menu baris tabel (inline). |
| `--ds-shadow-panel` | `0 8px 30px rgb(0 0 0 / .1)` | Panel info di top bar. |
| `--ds-shadow-overlay` | `0 18px 40px -18px rgb(15 23 42 / .35)` | Panel notifikasi. |
| `--ds-shadow-pinned-start` | `3px 0 5px -3px rgb(0 0 0 / .24)` | Kolom sticky kiri saat tabel digeser. |

## Ukuran

| Variabel | Nilai | Catatan |
| --- | --- | --- |
| `--ds-size-target` | `2.75rem` | Target sentuh minimum semua kontrol (44 px). |
| `--ds-size-target-compact` | `2.25rem` | Ikon aksi di tabel padat desktop (36 px). Jangan untuk layar sentuh. |
| `--ds-size-control-lg` | `3rem` | Input form master (48 px). |
| `--ds-size-icon-sm` | `1rem` |  |
| `--ds-size-icon-md` | `1.125rem` | Ikon navigasi (18 px). |
| `--ds-size-icon-lg` | `1.25rem` |  |
| `--ds-size-icon-xl` | `2rem` | Ikon dropzone, avatar akun. |
| `--ds-size-avatar` | `2.25rem` |  |
| `--ds-size-sidebar` | `16rem` |  |
| `--ds-size-sidebar-rail` | `4.75rem` |  |
| `--ds-size-topbar` | `4.75rem` |  |
| `--ds-size-auth-panel` | `24rem` |  |
| `--ds-size-dialog-sm` | `34rem` |  |
| `--ds-size-dialog-lg` | `54rem` |  |
| `--ds-size-panel` | `24rem` | Panel notifikasi. |
| `--ds-size-popover-calendar` | `22rem` |  |
| `--ds-size-menu` | `15rem` |  |
| `--ds-size-measure` | `65ch` | Lebar baca paragraf. |
| `--ds-size-table-max-height` | `min(68dvh, 44rem)` |  |

## Z-index

| Variabel | Nilai | Catatan |
| --- | --- | --- |
| `--ds-z-pinned` | `2` |  |
| `--ds-z-pinned-end` | `3` |  |
| `--ds-z-table-head` | `5` |  |
| `--ds-z-table-head-pinned` | `6` |  |
| `--ds-z-table-head-pinned-end` | `7` |  |
| `--ds-z-sticky` | `10` | Bilah aksi lengket. |
| `--ds-z-menu` | `20` |  |
| `--ds-z-combobox` | `30` |  |
| `--ds-z-popover` | `40` |  |
| `--ds-z-notification` | `45` |  |
| `--ds-z-modal` | `999` | Bawaan daisyUI .modal. |
| `--ds-z-tooltip` | `1000` |  |

## Motion

| Variabel | Nilai | Catatan |
| --- | --- | --- |
| `--ds-duration-instant` | `120ms` | Hover baris tabel. |
| `--ds-duration-fast` | `150ms` | Chip, menu, tombol ikon, pohon tabel. |
| `--ds-duration-quick` | `160ms` | Masuk popover/menu, kontrol sidebar. |
| `--ds-duration-base` | `180ms` | Dialog, view transition, drawer, KPI. |
| `--ds-duration-theme` | `200ms` | Ikon tema/kembali. |
| `--ds-duration-enter` | `220ms` | Masuk halaman. |
| `--ds-duration-layout` | `240ms` | Lebar sidebar. |
| `--ds-duration-settle` | `350ms` | Kartu ilustrasi. |
| `--ds-duration-tracker` | `680ms` | Penanda scroll tracker dokumentasi. |
| `--ds-duration-rise` | `1500ms` | Animasi data (nilai yang naik). |
| `--ds-duration-exit` | `140ms` | Keluar popover, menu, tooltip, dan toast: lebih cepat dari masuknya agar penutupan terasa langsung. |
| `--ds-duration-spring` | `500ms` | Panjang kurva spring teredam kritis (--ds-ease-spring): panel, sheet, switch, indikator segmen. |
| `--ds-duration-spring-bounce` | `450ms` | Panjang kurva spring memantul ringan (--ds-ease-spring-bounce): hanya setelah gestur dengan momentum (lepas drag, flick). |
| `--ds-duration-shimmer` | `1600ms` | Satu sapuan shimmer skeleton. |
| `--ds-ease-standard` | `ease` |  |
| `--ds-ease-out` | `ease-out` |  |
| `--ds-ease-in-out` | `ease-in-out` |  |
| `--ds-ease-emphasized` | `cubic-bezier(0.22, 1, 0.36, 1)` | Keluar halus untuk penanda dan panel. |
| `--ds-ease-settle` | `cubic-bezier(0.22, 0.8, 0.26, 1)` |  |
| `--ds-ease-rise` | `cubic-bezier(0.2, 0.75, 0.25, 1)` |  |
| `--ds-ease-ping` | `cubic-bezier(0, 0, 0.2, 1)` |  |
| `--ds-ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Keluar yang makin cepat: elemen pergi lebih cepat daripada datang. |
| `--ds-ease-spring` | `linear(0, 0.043, 0.14, 0.258, 0.376, 0.487, 0.584, 0.667, 0.736, 0.793, 0.838, 0.874, 0.903, 0.925, 0.943, 0.956, 0.967, 0.975, 0.981, 0.986, 0.989, 0.992, 0.994, 0.995, 1)` | Spring teredam kritis (damping 1.0, response 0.4 s) yang disampel untuk CSS. Pasangkan dengan --ds-duration-spring. Tanpa overshoot. |
| `--ds-ease-spring-bounce` | `linear(0, 0.036, 0.122, 0.235, 0.356, 0.475, 0.585, 0.682, 0.764, 0.831, 0.885, 0.926, 0.957, 0.98, 0.995, 1.005, 1.011, 1.014, 1.015, 1.015, 1.014, 1.012, 1.01, 1.008, 1.007, 1.005, 1.004, 1.003, 1)` | Spring dengan overshoot 1,5% (damping 0,8, response 0,35 s). Pasangkan dengan --ds-duration-spring-bounce. Hanya untuk gerak yang digerakkan momentum. |
| `--ds-press-scale` | `0.97` | Tombol ditekan (:active). |
| `--ds-enter-offset` | `5px` |  |
| `--ds-lift` | `-2px` | Kartu KPI saat hover. |

## Opasitas

| Variabel | Nilai | Catatan |
| --- | --- | --- |
| `--ds-opacity-disabled` | `0.55` |  |
| `--ds-opacity-pager-disabled` | `0.45` |  |
| `--ds-opacity-read` | `0.62` | Notifikasi terbaca, baris redup. |
| `--ds-opacity-state-hover` | `0.06` | Lapisan state: tint hover yang dicampur di atas permukaan (color-mix dengan currentColor atau accent). |
| `--ds-opacity-state-pressed` | `0.1` | Lapisan state: tint saat ditekan. |
| `--ds-opacity-state-selected` | `0.12` | Lapisan state: tint untuk item terpilih, dicentang, atau saat ini. |
| `--ds-opacity-state-drag` | `0.16` | Lapisan state: elemen yang sedang diseret atau target drop di bawah pointer. |

## Breakpoint

| Variabel | Nilai | Catatan |
| --- | --- | --- |
| `--ds-breakpoint-xs` | `360px` |  |
| `--ds-breakpoint-sm` | `640px` | Ponsel: tabel jadi baris berlabel, aksi turun ke baris sendiri. |
| `--ds-breakpoint-md` | `768px` |  |
| `--ds-breakpoint-lg` | `1024px` | Sidebar menjadi kolom tetap (drawer terbuka). |
| `--ds-breakpoint-xl` | `1280px` |  |

## Utilitas Tailwind

`Styles/generated/tailwind-theme.css` mendaftarkan token ke Tailwind v4: `text-link`, `text-quiet`, `border-control`, `bg-popover`, `text-subtle`, `text-muted`, `bg-excel`, `bg-pdf`, `shadow-popover`, `shadow-lift`, `text-title-1`, `text-body`, `text-eyebrow`, `rounded-card`, `rounded-box`, `ease-emphasized`, dan seterusnya.
