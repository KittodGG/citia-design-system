# v2 plan: catalog, ownership, status

Private page (starts with `_`). Contract: `_contributing.md`. Every path is relative to the repository root.
CSS = `src/Citia.DesignSystem/Styles/components/`, JS = `src/Citia.DesignSystem/wwwroot/js/modules/`,
C# = `src/Citia.DesignSystem/`. Docs pages are always the pair `docs/en/<slug>.md` + `docs/id/<slug>.md`.

Coverage target: the union of shadcn/ui, Material 3, Tailwind UI application UI and daisyUI 5 components.

## Batches

| Batch | Scope | Owns (CSS / JS / C#) | Docs slugs (category) |
| --- | --- | --- | --- |
| A1 actions | buttons and their families | CSS `button.css`, `actions.css`; JS `toggle.js`; C# `TagHelpers/ActionTagHelpers.cs`, `Localization/Strings.Actions.cs` | `button`, `button-group`, `icon-button`, `fab`, `toggle`, `toggle-group`, `link`, `split-button` (actions) |
| A2 forms basic | text-like fields | CSS `field.css`, `inputs.css`; JS `inputs.js`; C# `TagHelpers/FieldTagHelpers.cs`, `Localization/Strings.Fields.cs` | `field`, `input`, `input-group`, `textarea`, `number-input`, `password-input`, `search-input`, `select`, `fieldset` (forms) |
| A3 forms choice | choice controls | CSS `choices.css`, `combobox.css`; JS `choices.js`, `combobox.js`; C# `TagHelpers/ChoiceTagHelpers.cs`, `Localization/Strings.Choices.cs` | `checkbox`, `radio-group`, `switch`, `slider`, `rating`, `combobox`, `multi-select`, `tags-input`, `otp-input` (forms) |
| A4 date, files, form | pickers, upload, form behaviour | CSS `calendar.css`, `upload.css`, `form-layout.css`; JS `datepicker.js`, `upload.js`, `validation.js`; C# `TagHelpers/FormTagHelpers.cs`, `Localization/Strings.Forms.cs` | `date-picker`, `date-range-picker`, `time-picker`, `calendar`, `color-picker`, `file-upload`, `form`, `validation` (forms) |
| A5 data display 1 | small display atoms and cards | CSS `status.css`, `display.css`, `surface.css`; JS `chips.js`; C# `TagHelpers/DisplayTagHelpers.cs`, `Localization/Strings.Display.cs` | `avatar`, `badge`, `status`, `tag`, `chip`, `card`, `stat`, `description-list`, `indicator` (data-display) |
| A6 data display 2 | lists and tables | CSS `table.css`, `lists.css`, `code.css`; JS `table.js`, `tree-view.js`, `selection.js`; C# `TagHelpers/DataTagHelpers.cs`, `Localization/Strings.Data.cs` | `list`, `table`, `data-table`, `timeline`, `tree-view`, `kbd`, `code-block` (data-display) |
| A7 data display 3 | media and quantities | CSS `dataviz.css`, `media.css`; JS `carousel.js`; C# `TagHelpers/MediaTagHelpers.cs`, `Localization/Strings.Media.cs` | `image`, `aspect-ratio`, `carousel`, `chart`, `progress`, `skeleton`, `separator`, `spinner` (data-display; progress, skeleton, spinner in feedback) |
| A8 feedback | messages and disclosure | CSS `feedback.css`, `notification.css`, `disclosure.css`, `tooltip.css`; JS `toast.js`, `tooltip.js`, `accordion.js`; C# `TagHelpers/FeedbackTagHelpers.cs`, `Localization/Strings.Feedback.cs` | `alert`, `banner`, `toast`, `tooltip`, `notification-center`, `empty-state`, `accordion`, `collapsible`, `stepper` (feedback; accordion, collapsible in layout) |
| A9 overlays | floating and modal layers | CSS `overlay.css`, `popover.css`, `sheet.css`, `menu.css`, `command.css`; JS `dialog.js`, `sheet.js`, `popover.js`, `menu.js`, `context-menu.js`, `command.js`; C# `TagHelpers/OverlayTagHelpers.cs`, `Localization/Strings.Overlays.cs` | `dialog`, `alert-dialog`, `sheet`, `popover`, `hover-card`, `dropdown-menu`, `context-menu`, `menubar`, `command` (overlays) |
| A10 navigation | moving between places | CSS `navigation.css`, `nav-bars.css`; JS `tabs.js`, `navigation-menu.js`, `theme.js`; C# `TagHelpers/NavigationTagHelpers.cs`, `Localization/Strings.Navigation.cs` | `navbar`, `bottom-navigation`, `tabs`, `segmented-control`, `breadcrumb`, `pagination`, `navigation-menu`, `theme-switcher`, `language-switcher` (navigation; segmented-control in actions) |
| A11 layout | page structure | CSS `shell.css`, `layout.css`; JS `shell.js`, `resizable.js`; C# `TagHelpers/LayoutTagHelpers.cs`, `Localization/Strings.Layout.cs` | `app-shell`, `sidebar`, `page-header`, `toolbar`, `container`, `stack-grid`, `scroll-area`, `resizable`, `auth-layout`, `footer` (layout; sidebar in navigation) |
| A12 native and daisyUI | element defaults, daisyUI alignment, user preferences, prose | `Styles/base.css`, `native.css`, `daisyui-overrides.css`, `accessibility.css`, `fonts.css`, CSS `prose.css`; JS `forms.js`, `guard.js` | `native-elements`, `daisyui`, `prose` (reference) |
| A13 docs start | getting started and colour | docs only | `introduction`, `requirements`, `installation`, `quick-start`, `theming`, `project-structure` (getting-started); `principles`, `color` (foundations) |
| A14 docs foundations | foundations | docs only | `typography`, `spacing-layout`, `shape-elevation`, `motion`, `states`, `accessibility`, `localization` (foundations) |
| A15 docs patterns and reference | patterns, content, reference | docs only (+ `README.md`, `CHANGELOG.md`) | `page-patterns`, `forms-pattern`, `data-pattern`, `workflows`, `feedback-pattern` (patterns); `writing`, `voice-and-tone` (content); `javascript`, `razor-api`, `coverage`, `migration-v1`, `changelog` (reference) |
| I icons | icon set | `src/Citia.DesignSystem/wwwroot/icons/icons.json`, `NOTICE.md` (icons section) | `icons` (foundations) |
| T token text | bilingual token descriptions | `tokens/tokens.json` (`$description` values only), `tokens/descriptions.id.json` | none (the generator writes `tokens.md`) |

Integrator (not a batch): `Styles/ds.css`, `ds.bundle.css`, `generated/*`, `js/core.js`, `js/ds.js`, `TagHelpers/DsTagHelpers.cs`,
`Localization/DsText.cs`, existing partials `_DsHead`, `_DsScripts`, `_DsIconSprite`, the docs site, `tools/*`.
Existing partials stay with the batch of their component: `_DsPager`, `_DsPageSize`, `_DsSortHeader` (A10/A6 read-only,
integrator edits), `_DsToast` (A8), `_DsConfirmDialog`, `_DsLeaveDialog` (A9), `_DsSidebarNav` (A11). Batches propose changes
to these in their report.

## Where version 1 styles live

Some existing rules sit in another batch's file. Refine them from your own file (it is imported later in `ds.css`, same
layer, so it wins) instead of editing the other file:

- checkbox / radio rows `.ds-choice`, `.ds-check-row`, `.ds-choice-grid` are in `field.css` (A2) → A3 refines in `choices.css`.
- `.ds-segmented`, `.ds-tabs`, `.ds-breadcrumb`, `.ds-pager`, `.ds-page-size` are in `navigation.css` (A10, owner).
- `.ds-spinner`, `.ds-icon-btn`, `.ds-actions` are in `button.css` (A1) → A7 documents spinner and adds variants in `media.css`.
- `.ds-feed` (activity feed) is in `dataviz.css` (A7) → A6's `timeline` uses new `.ds-timeline` classes in `lists.css`.
- `.ds-steps` is in `disclosure.css` (A8, owner of stepper).
- sidebar navigation `.ds-nav-*`, top bar, page header, auth layout are in `shell.css` (A11, owner).
- `.ds-dropzone`, `.ds-file` are in `upload.css` (A4, owner).

## Icon names available to every batch

Existing: activity alert archive arrow-down arrow-left arrow-up bell briefcase building calendar check check-circle
chevron-down chevron-left chevron-right chevrons-up-down clock code copy credit-card customer dashboard database download
eye eye-off file file-import file-pdf file-xls filter history hourglass inbound info key layers lock log-in logout mail
megaphone menu moon more outbound package pencil pie plug plus port progress refresh restore scale search send server
shield ship sliders sun tank trash trending-up truck user user-plus users warehouse x x-circle.

Added by batch I (use them freely; they appear after the integrator regenerates the sprite): arrow-right arrow-up-right
external-link link chevron-up chevrons-left chevrons-right minus plus-circle minus-circle star star-filled heart bookmark
share upload image paperclip grip-vertical grip-horizontal more-vertical settings home folder folder-open globe phone
map-pin tag zap help-circle alert-triangle loader maximize minimize undo redo bold italic underline list list-ordered
list-checks align-left layout-grid columns rows table kanban sort-asc sort-desc panel-left panel-right play pause
skip-back skip-forward volume mic camera video message-square at-sign hash command corner-down-left delete clipboard
square check-square circle dot printer save rotate-ccw zoom-in zoom-out palette pipette type bar-chart line-chart
trending-down inbox flag award shopping-cart wallet receipt file-text file-plus files cloud cloud-upload wifi wifi-off
smartphone monitor laptop keyboard move user-check user-x shield-check unlock fingerprint ban calendar-days
calendar-range sparkles check-check circle-dot

## Status

| Batch | Status |
| --- | --- |
| Phase 0 (structure, i18n, tokens, site) | done |
| A1–A15, I, T | done (A3 and A4 Indonesian pages written at integration) |
| Integration | done 2026-11-02: library and site build with 0 warnings; 128 slugs × 2 languages return 200; no script errors or page overflow at 1440px light and 390px dark; internal links resolve; `razor-api`, `javascript` and `ds.d.ts` synced with the code |

### Open follow-ups (optional)

- `table.js` also carries the code-block and kbd behaviour; split into `code-block.js` / `kbd.js` if the module list should match the docs.
- `.ds-bone` (A5) and `.ds-cell-skeleton` (A6) predate `.ds-skeleton` (A7); fold them into `.ds-skeleton` aliases.
- `_DsSortHeader` button mode for client-side sort; `_DsPager` "select all N" slot.
- Tree view drag-reorder, code-block syntax colouring, client-side table sort: not built.

## Distribution (4 Nov 2026)

Done: `Citia.DesignSystem` 2.0.1 on the Citia NuGet feed `https://design.citia-engineering.com/nuget/v3/index.json`
(read-only feed in the docs site, `site/.../Docs/NuGetFeed.cs`; packages in `~/apps/citia-ds-feed` on the staging server, SSH alias `citia-ds-staging`).
`tools/smoke-test.ps1`, `tools/release.ps1`, `tools/deploy-site.ps1`. Verified: install from the live feed into a new app
(Development and published), `dotnet list package --outdated`, `dotnet package search`, overwrite refused.
Fixed on the way: `_DsHead` without a model threw on every page with a PageModel.

Open:
- Done 4 Nov: private repo KittodGG/citia-design-system with CI (tokens/CSS drift, build, smoke tests incl. offline installer).
  2.0.2 released to the feed and as GitHub release v2.0.2 (nupkg + offline zip + static zip). Fixed: ds.css missed most daisyUI classes.
- Update bots for app repositories (Dependabot needs a registry entry for the feed; not tested yet).
- Pilot: move one real app (RevCM, CCIS or TPS) from copied CSS to the package and record what broke.
- Visual regression screenshots per release (light/dark, EN/ID) before publishing.
- Staging VPS disk is 97% full: clean old builds before the next release.
- Feed is public (no auth): fine for UI code; add basic auth in nginx if that changes.
