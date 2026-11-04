---
title: Peta asal TPS
group: Referensi
order: 4
summary: Pemetaan setiap token, kelas CSS, perilaku JS, dan helper Razor dari TPS Integration ke padanannya di Citia Design System.
source: TPS Integration @ 88cd8e4
---

Halaman ini menjadi jejak asal (akar) setiap bagian Design System. Path TPS relatif ke `D:\citia_engineering\TPS\TPS.Integration`. Path DS relatif ke `src/Citia.DesignSystem`. Baris `app.css` mengacu ke `Styles/app.css` di TPS.

## Token

| TPS | DS | Catatan |
| --- | --- | --- |
| `--tps-control-border` | `--ds-control-border` | Border input, select, tombol sekunder (≥ 3:1). |
| `--tps-quiet-fg` | `--ds-quiet` | Teks teal tenang. |
| `--tps-link` | `--ds-link` | Tautan identitas. Biru hanya untuk tautan. |
| `--tps-error-text` | `--ds-error-text` | Teks galat. |
| `--tps-warning-text` | `--ds-warning-text` | Teks peringatan. |
| `--tps-popover-bg` | `--ds-popover` | Permukaan lapisan melayang. |
| `--tps-popover-border` | `--ds-popover-border` | Border lapisan melayang. |
| `--tps-popover-shadow` | `--ds-shadow-popover` | Bayangan lapisan melayang. |
| `--tps-popover-hover` | `--ds-popover-hover` | Latar baris saat hover di lapisan melayang. |
| Tema daisyUI `tps`, `tps-dark` | `tps`, `tps-dark` | Nama tema dipertahankan. Bisa diganti lewat `data-ds-light` dan `data-ds-dark`. |
| `--color-accent` (`#00a4b2`) | `--ds-focus` | Focus ring memakai primary di tema terang. Accent hanya 2.86:1 di base-100, di bawah 3:1 (WCAG 1.4.11). Tema gelap memakai aqua-400. |

Kunci penyimpanan browser memakai prefiks yang bisa diatur (`data-ds-storage`, default `ds`).

| TPS | DS (prefiks default) |
| --- | --- |
| `tps-theme` | `ds-theme` |
| `tps-sidebar-collapsed` | `ds-sidebar-collapsed` |
| `tps-nav-groups` | `ds-nav-groups` |
| `tps-nav-scroll` | `ds-nav-scroll` |

## Komponen CSS

Kolom "app.css" berisi baris TPS. Entri bertanda "(periksa)" belum dicocokkan dengan kelas DS secara visual.

### Surface, tabel, dan data

| Kelas TPS | app.css | Kelas DS | File DS |
| --- | --- | --- | --- |
| `.pt-card` | L3461–3468 | `.ds-card` | `components/surface.css` |
| `.pt-kpi` | L3424–3458 | `.ds-kpi` | `components/surface.css` |
| `.master-surface` | L1448 | `.ds-surface` | `components/surface.css` |
| `.pt-dl` | L3644–3646 | `.ds-dl` | `components/surface.css` |
| `.master-detail dl` | L1911–1949 | `.ds-dl.is-detail` | `components/surface.css` |
| `.pt-config-*` | L3654–3660 | `.ds-config-grid`, `.ds-config-item` | `components/surface.css` |
| `.qa-preview` | L3276–3321 | `.ds-preview-box` | `components/surface.css` |
| `.pt-table` | (periksa) | `.ds-table` | `components/table.css` |
| `.master-table` | L1503–1552 | `.ds-list-table` | `components/table.css` |
| `.data-table-scroll` | L250–316 | `.ds-table-scroll` | `components/table.css` |
| `.pinned-column` | L282–314 | `.is-pinned` | `components/table.css` |
| `.table-scroll-hint` | L268 | `.ds-table-hint` | `components/table.css` |
| `.recap-tree-*` | L279–280, L3481–3482 | `.ds-tree-*` | `components/table.css` |

### Navigasi dan penomoran

| Kelas TPS | app.css | Kelas DS | File DS |
| --- | --- | --- | --- |
| `.pt-pager`, `.master-pagination` | L631, L1652–1669 | `.ds-pager` | `components/navigation.css` |
| `.pt-tabs` | L3639–3642 | `.ds-tabs` | `components/navigation.css` |
| `.view-switch` | L708–760 | `.ds-segmented` | `components/navigation.css` |
| `.pt-chip*` | L3515–3524 | `.ds-chip` | `components/navigation.css` |
| `.master-breadcrumb` | L1391–1403 | `.ds-breadcrumb` | `components/navigation.css` |
| `.bc-verification` | L52–57, L82–88 | `.ds-steps` (periksa) | `components/navigation.css` |
| `.payload-details`, `.bc-guide-entry` | L3502–3504, L398–414 | `.ds-disclosure` | `components/navigation.css` |

### Status dan umpan balik

| Kelas TPS | app.css | Kelas DS | File DS |
| --- | --- | --- | --- |
| `.pt-pill` | L3561–3577 | `.ds-pill` | `components/status.css` |
| `.pt-tag` | L3648–3650 | `.ds-tag` | `components/status.css` |
| `.master-status` | L1560–1577, L2362, L2707 | `.ds-status` | `components/status.css` |
| `.portal-badge` | L3376–3414 | `.ds-live-badge` | `components/status.css` |
| `.sb-mode-badge` | L521–530 | `.ds-mode-badge` | `components/status.css` |
| Badge soft | L256–257, L3068–3071 | `.badge-soft` + `.ds-*` warna teks | `components/status.css` |
| `.pt-note` | L3636–3637 | `.ds-note` | `components/feedback.css` |
| `.access-banner`, `.notif-critical` | L2664–2703, L3702–3707 | `.ds-banner` | `components/feedback.css` |
| `.pt-empty`, `.master-empty`, `_EmptyState` | L3587–3590, L1674–1687 | `.ds-empty` | `components/feedback.css` |
| `_Toast` | (partial) | `.ds-toast`, `_DsToast` | `components/feedback.css` |

### Form

| Kelas TPS | app.css | Kelas DS | File DS |
| --- | --- | --- | --- |
| `.master-field`, `.master-fieldset`, `.entry-form` | L1696–1975 | `.ds-field`, `.ds-fieldset`, `.ds-form` | `components/field.css` |
| `.auth-*` (form) | L2144–2347 | `.ds-auth-form` | `components/field.css` |
| `.master-help` | L1762–1768 | `.ds-hint` | `components/field.css` |
| `.master-field-error` | L1772–1779 | `.ds-field-error` | `components/field.css` |
| `.master-error-summary` | L1867–1889 | `.ds-error-summary` | `components/field.css` |
| `.master-form-actions` | L1850–1860 | `.ds-form-actions` | `components/button.css` |
| `.user-role`, `.pt-registration-plans` | L117–121 | `.ds-choice` (periksa) | `components/field.css` |
| `.auth-key-box` | (periksa) | `.ds-secret` | `components/field.css` |
| `.auth-codes` | (periksa) | `.ds-codes` | `components/field.css` |

### Overlay, layar, dan dialog

| Kelas TPS | app.css | Kelas DS | File DS |
| --- | --- | --- | --- |
| `.cb-*` | L3147–3241 | `.ds-combobox*` | `components/combobox.css` |
| `.tps-popover` | L315–336, L3182 | `.ds-popover` | `components/combobox.css` |
| `.master-menu-content` | L1616–1650 | `.ds-menu-panel` | `components/combobox.css` |
| `.modal` | L555–561, L3103–3106, L3347–3350 | `.ds-dialog` | `components/overlay.css` |
| `.tank-detail-box`, `.excel-import-box`, `.qa-box` | L557–572, L574–609, L3244–3262 | `.ds-dialog.is-lg`, `.ds-dialog`, `.ds-dialog.is-raised` | `components/overlay.css` |
| `.excel-dropzone`, `.excel-file` | L578–589 | `.ds-dropzone`, `.ds-file` | `components/overlay.css` |
| `.preview-notice` | L494–510 | `.ds-notice` | `components/overlay.css` |
| `.app-shell`, `#app-sidebar`, `.sb-*` | L2854–3042 | `.ds-shell`, `.ds-sidebar`, `.ds-nav-*` | `components/shell.css` |
| `.app-topbar`, `.topbar-*` | L444–553 | `.ds-topbar`, `.ds-topbar-*` | `components/shell.css` |
| `.theme-toggle`, `.topbar-back` | L457–465 | `.ds-chrome-btn` | `components/button.css` |
| `.account-*` | L479–490 | `.ds-account*` | `components/shell.css` |
| `.topbar-tenant` | (periksa) | `.ds-scope-chip` | `components/shell.css` |
| `.master-heading`, `.pt-header` | L1405–1424, L3416–3422 | `.ds-page-header` | `components/shell.css` |
| `.page-toolbar`, `.page-actions` | L240–246 | `.ds-toolbar`, `.ds-actions` | `components/shell.css`, `components/button.css` |
| `.pt-icon-btn` | (periksa) | `.ds-icon-btn` | `components/button.css` |
| `.auth-*` (layout) | L2145–2269 | `.ds-auth-*` | `components/shell.css` |

### Tombol, teks, dan kode

| Kelas TPS | app.css | Kelas DS | File DS |
| --- | --- | --- | --- |
| `.btn` hierarki (primary, secondary, ghost, error) | L3044–3106, L1284–1291 | `.btn` (dipertahankan, daisyUI) | `components/button.css` |
| `.btn-excel`, `.btn-pdf` | (periksa) | Dipertahankan sebagai ekstensi daisyUI | `components/button.css` |
| `.link-ref` | L656–674 | `.ds-link-ref` (alias `.link-ref` dipertahankan) | `base.css` |
| `.text-muted` | L674 | `.ds-text-muted` (`.text-muted` dipertahankan) | `base.css` |
| `.code` | L644 | `.ds-id` (alias `.code` dipertahankan) | `base.css` |
| `.xml-tag`, `.xml-attribute`, `.xml-comment` | L3505–3509 | `.ds-syntax-tag`, `.ds-syntax-attr`, `.ds-syntax-comment` | `components/code.css` |
| `.quick-xml` | L36–48 | `.ds-code-block`, `.ds-code-line` | `components/code.css` |

### Data visual dan lainnya

| Kelas TPS | app.css | Kelas DS | File DS |
| --- | --- | --- | --- |
| `.pt-progress` | L3584–3634 | `.ds-progress` | `components/dataviz.css` |
| `.pt-meter` | L3584–3634 | `.ds-meter` | `components/dataviz.css` |
| `.activity-bar` | L3722–3726 | `.ds-activity-bar` | `components/dataviz.css` |
| `.recap-share` | L3476–3477 | `.ds-share` | `components/dataviz.css` |
| `.pt-chart`, `.pt-donut`, `.pt-legend` | L3605–3630 | `.ds-chart`, `.ds-donut`, `.ds-legend` | `components/dataviz.css` |
| `.pt-feed` | L3596–3603 | `.ds-feed` | `components/dataviz.css` |
| `.pt-avatar` | L3552–3559 | `.ds-avatar` | `components/dataviz.css` |
| `.notif-*` | L3662–3718 | `.ds-notif-*` | `components/notification.css` |

## Perilaku JS

Sumber TPS ada di `wwwroot/js/`. Hook DS ada di `wwwroot/js/ds.js`, yang menggabungkan `site.js`, `master.js`, `combobox.js`, `data-table.js`, dan `recap-tree.js`.

| TPS (file dan perilaku) | Hook DS |
| --- | --- |
| `site.js`: toggle tema | `data-ds-theme-toggle` |
| `site.js`: collapse sidebar | `data-ds-sidebar-collapse` |
| `site.js`: grup navigasi | `data-ds-nav-group` |
| `site.js`: posisi scroll navigasi | `data-ds-nav-scroll` |
| `master.js`: drawer navigasi | `data-ds-nav-toggle`, `data-ds-nav-close` |
| `data-back` | `data-ds-back` |
| `_ConfirmDialog`: `data-confirm-*` | `data-ds-confirm`, `data-ds-confirm-*` |
| Leave guard (`site.js`, `data-guard-skip`) | `form[data-ds-guard]`, `data-ds-guard-skip`. Opt-in per form. |
| Toast (`[data-toast]`) | `toast()` (export `ds.js`), `data-ds-toast`, `data-ds-toast-show` |
| `data-export` | `data-ds-export` |
| `data-copy-target` | `data-ds-copy` |
| `data-password-toggle` | `data-ds-password-toggle` |
| `data-autosubmit` | `data-ds-autosubmit` |
| `form[data-once]` | `form[data-ds-once]` |
| `data-table.js`: kolom pinned | `table[data-ds-pin]`, `th[data-ds-pin-end]` |
| `recap-tree.js`: `data-tree-toggle`, `data-tree-all` | `data-ds-tree-toggle`, `data-ds-tree-all` |
| `combobox.js`: `data-combobox`, `data-combobox-add` | `select[data-ds-combobox]`, `data-ds-combobox-add`. Event `ds:combobox-add`. |

## Razor dan C#

Namespace DS: `Citia.DesignSystem.*`.

| TPS | DS |
| --- | --- |
| `Helpers/Icon.cs` | `Citia.DesignSystem.Icons.Icon`, `<ds-icon>` |
| `Helpers/PortalUi.cs` `Initials`, `AvatarClass` | `Ui.Avatar` |
| `Helpers/Ui.cs` `ToastMessage`, `Controller.Toast` | `Ui.ToastMessage`, `this.Toast(Tone, …)`, `_DsToast` |
| `Helpers/ListSort.cs`, `SortHeader`, `_SortHeader` | `Ui.ListSort`, `SortHeaderModel`, `_DsSortHeader` |
| `_Pager`, `_PtPager` | `_DsPager` (`PagerModel`) |
| `_PageSize` | `_DsPageSize` |
| `_EmptyState` | `<ds-empty>` |
| `_ConfirmDialog` | `_DsConfirmDialog` |
| `_LeaveDialog` | `_DsLeaveDialog` |
| `_Toast` | `_DsToast` |
| `Helpers/Fmt.cs`, `Wib` | `Citia.DesignSystem.Formatting.Fmt`, `Wib` (subset generik) |
| Script dan kepala layout (`_Layout`) | `_DsHead` (`HeadOptions`) |

## Perbedaan yang disengaja

- Focus ring memakai primary di tema terang, bukan accent (lihat [Token](#token)).
- Satu sistem pill, bukan tiga.
- Satu pager, bukan tiga.
- Satu empty state, bukan tiga.
- Tema tetap mengikuti OS sampai pengguna memilih. Pilihan disimpan per browser.
- Meta `theme-color` diatur mengikuti tema.
- Ada toast peringatan. Toast berhenti hilang saat hover atau fokus.
- Leave guard opt-in per form, tidak aktif otomatis di semua form.
- Drawer off-canvas sendiri, bukan drawer checkbox daisyUI.
- Font dilayani dari `/_content/Citia.DesignSystem/fonts/manrope`. `fonts.root.css` tetap memakai path `/fonts/manrope` TPS.
- Plugin tema daisyUI bersifat opsional, karena `tokens.css` mendefinisikan setiap variabel.

## Tidak dibawa (khusus domain TPS)

| Bagian | Asal TPS |
| --- | --- |
| Ilustrasi tangki (`_TankFarm`, `.tk-*`). Token tetap di `illustration.tank` pada `tokens/tokens.json`. | `Views/Shared/_TankFarm.cshtml`, `Styles/app.css` |
| Respons BC dan field review (`.bc-response`, `.bc-field-*`) | `Views/Shared/_BcResponse.cshtml`, `Views/Shared/_BcVerification.cshtml`, `wwwroot/js/bc-response-guide.js`, `Styles/app.css` |
| Ringkasan rekap (`.recap-summary-*`, `.recap-bc-*`) | `Styles/app.css` |
| Lookup pelabuhan (`.port-*`) | `wwwroot/js/port-lookup.js`, `Styles/app.css` |
| Koreksi cepat (`.quick-*`) | `wwwroot/js/quick-correction.js`, `Views/Shared/_QuickCorrection.cshtml`, `Styles/app.css` |
| Refresh langsung BC (`bc-live.js` + morphdom) | `wwwroot/js/bc-live.js` |
| Batch kirim dan impor | `wwwroot/js/draft-send.js`, `wwwroot/js/import-send.js` |
| Enhancer date picker | `wwwroot/js/site.js` |
