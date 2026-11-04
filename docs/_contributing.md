# Contributing contract (v2)

Files starting with `_` are not published. This page is the contract for everyone who adds or changes a component,
a token, a behaviour or a documentation page. Read it fully before touching anything. `_plan.md` lists the component
catalog, the batch that owns each file and the status.

## 1. Goal and quality bar

Citia Design System (DS) is a **universal** design system for ASP.NET Core (.NET 10) web applications: any product, any
domain. It was extracted from INTEGRA TPS Integration, but nothing in the components, examples or copy may assume that
product (no tanks, vessels, bills of lading, customs). It ships in **two languages, English and Indonesian**, in **light and
dark** themes, and it must be as complete as shadcn/ui, Material 3 and Tailwind UI together.

The feel is **premium, calm and precise**: Apple's fluid-interface principles and an editorial, minimal surface. Premium
means nothing is random and nothing shouts:

- **Every state is designed.** No component ships with only its resting look (section 5).
- **Motion explains, never decorates.** Short, anchored, interruptible, mostly invisible (section 6). Not "lebay".
- **Hairlines, not boxes.** 1px borders in `--color-base-300`, ultra-soft shadows from the shadow tokens only, crisp radii.
- **Colour is scarce.** Neutral surfaces; teal (`--color-primary`) for the one primary action, selection and focus; tonal
  (pale) fills for status; never a large saturated area. No gradients, no glow, no glassmorphism except the existing
  translucent bars and floating layers.
- **Type does the hierarchy.** Manrope, weight + size + tracking as a set, tabular numbers for data, `--ds-type-*` roles.
- **Real content.** Realistic, domain-neutral sample data with mixed-locale names (Ayu Lestari, Daniel Okafor, Mei Tanaka,
  Sofia Marquez), project codes (`PRJ-1024`), invoice numbers (`INV-2026-0418`), amounts, dates. No lorem ipsum, no
  "John Doe", no "Acme", no emoji anywhere, no marketing clichés (elevate, seamless, unleash, next-gen).

## 2. Repository layout

```
tokens/tokens.json                      DTCG source of truth (edit here, then run the generator)
tools/tokens.cs                         generator: dotnet run tools/tokens.cs
tools/css.ps1                           CSS build: powershell -File tools/css.ps1 -Target all|ds|docs
src/Citia.DesignSystem/                 Razor Class Library (NuGet package), static assets under /_content/Citia.DesignSystem/
  Styles/ds.css                         import list (do not edit; every file below is already imported)
  Styles/generated/                     generated tokens (never edit by hand)
  Styles/base.css, native.css           element defaults
  Styles/daisyui-overrides.css          global daisyUI alignment
  Styles/components/*.css               one file per component family (owned by one batch)
  Styles/accessibility.css              user-preference overrides (reduced motion/transparency, contrast, forced colours)
  wwwroot/js/core.js                    shared helpers (read-only for batches)
  wwwroot/js/ds.js                      aggregator (do not edit; every module below is already imported)
  wwwroot/js/modules/*.js               one behaviour module per family (owned by one batch)
  wwwroot/icons/icons.json              icon source (24px grid, 2px stroke, round caps)
  TagHelpers/*.cs                       tag helpers (one file per batch: <Feature>TagHelpers.cs)
  Views/Shared/_Ds*.cshtml              partials
  Localization/DsText.cs                C# string tables; add yours in Localization/Strings.<Feature>.cs
  Ui/, Formatting/, Icons/              C# helpers
site/Citia.DesignSystem.Docs/           documentation site (Razor Pages), runs at http://localhost:5180
docs/en/<slug>.md, docs/id/<slug>.md    documentation pages, one file per language, same slug
docs/_legacy/                           version 1 pages (Indonesian, TPS-flavoured): source material only
```

## 3. Ownership and parallel work

Several batches work at the same time. To stay safe:

1. **Edit only the files your batch owns** (listed in `_plan.md` and in your brief). If you need a change in a file you do
   not own (a token, a core.js helper, another component), do not make it: write it in your final report under
   "Requests" and work around it locally.
2. **Never run `dotnet build`, `dotnet run` of the site, or `dotnet publish`.** The integrator builds. C# you write must be
   correct by reading: nullable enabled, file-scoped namespaces, no new package references.
3. You may run `powershell -File tools/css.ps1 -Target docs` (and `-Target ds`) to rebuild CSS; if it fails because a file
   is locked by another batch, wait a few seconds and run it again.
4. The documentation site is already running at `http://localhost:5180` in Development. Markdown pages, CSS and JS are
   picked up live (rebuild CSS first). New Razor partials and tag helpers only work after the integrator builds; document
   them anyway.
5. Do not delete or rename existing public classes (`ds-*`), data attributes (`data-ds-*`), C# APIs or partials. Add, refine
   or alias instead. If a version 1 name was TPS-specific, add the universal name and keep the old one working.

## 4. CSS rules

- **Layers.** Component rules go in `@layer components { … }`. Rules that must beat daisyUI (daisyUI 5 emits some rules in
  the utilities layer, e.g. `.btn` colour variables) go in `@layer utilities { … }` in your own file. Never unlayered,
  never `!important` (only `accessibility.css` may use it).
- **Naming.** Block `ds-<component>` (English, singular: `ds-segmented`, `ds-date-picker`), parts `ds-<component>__<part>`,
  modifiers `is-<variant>` or `is-<size>` (`is-sm`, `is-lg`). daisyUI classes stay usable as the base where they exist
  (`btn`, `input`, `select`, `checkbox`, `toggle`, `range`, `tabs`, `menu`, …): the DS refines them, it does not replace them.
- **State comes from the platform**, not from extra classes: `:hover`, `:focus-visible`, `:active`, `:disabled`,
  `:checked`, `:indeterminate`, `:user-invalid`, `:placeholder-shown`, `:autofill`, `[open]`, `:popover-open`,
  `[aria-pressed="true"]`, `[aria-selected="true"]`, `[aria-checked]`, `[aria-current]`, `[aria-expanded="true"]`,
  `[aria-invalid="true"]`, `[aria-busy="true"]`, `[aria-disabled="true"]`, `[data-state="…"]` (only when no ARIA state fits).
- **Tokens only.** No raw colours, durations, radii, shadows or z-indexes. Mix with `color-mix(in oklab, …)` from tokens.
  Key tokens: colours `--color-base-100/200/300`, `--color-base-content`, `--color-primary(-content)`,
  `--color-info/success/warning/error(-content)`, `--ds-muted`, `--ds-subtle`, `--ds-quiet`, `--ds-control-border`,
  `--ds-focus`, `--ds-*-text`, `--ds-*-soft` (see `Styles/generated/tokens.css`); spacing `--ds-space-*`; radius
  `--ds-radius-*`; shadow `--ds-shadow-xs|menu|panel|overlay`; size `--ds-size-target` (44px), `--ds-size-target-compact`;
  z `--ds-z-*`; motion `--ds-duration-*`, `--ds-ease-*`, `--ds-press-scale`, `--ds-enter-offset`, `--ds-lift`;
  state layers `--ds-opacity-state-hover|pressed|selected|drag`; type `--ds-type-<role>-size|leading|weight|tracking`.
- **Layout.** Logical properties (`margin-inline-start`, `inset-inline-end`, `padding-block`) so `dir="rtl"` works. No
  fixed widths on text containers; allow 40% text growth (Indonesian strings are longer). Container queries are welcome.
- **Hover only where hover exists:** wrap hover styles in `@media (hover: hover)` when they would stick on touch.
- **Targets:** interactive elements are at least 24×24 CSS px everywhere and 44×44 (`--ds-size-target`) on
  `(pointer: coarse)`; compact sizes keep a 44px hit area with padding or a pseudo-element.

## 5. State matrix (every component, every state)

For each component, design and document every state that applies. A state table is mandatory on every component page.

| Group | States | How it is expressed | Visual rule |
| --- | --- | --- | --- |
| Pointer | rest, hover, pressed | `:hover` in `@media (hover:hover)`, `:active` | hover = state layer `--ds-opacity-state-hover` or one step deeper surface; pressed = `--ds-opacity-state-pressed` + `scale(var(--ds-press-scale))` on buttons and chips only, applied on pointer-down |
| Keyboard | focus-visible, focus-within | `:focus-visible`, `:focus-within` | 2px ring `--ds-focus`, 2px offset, never removed, never hidden by sticky UI; no ring on mouse focus |
| Selection | selected, checked, unchecked, indeterminate/mixed, on/off, current | `:checked`, `:indeterminate`, `aria-checked`, `aria-pressed`, `aria-selected`, `aria-current` | tonal fill `--ds-opacity-state-selected` of primary + primary text or a check glyph; never colour alone (add a glyph, weight or indicator) |
| Disclosure | expanded/collapsed, open/closed | `aria-expanded`, `[open]`, `:popover-open` | chevron rotates 180° (or 90° for tree), panel enters with section 6 motion |
| Availability | disabled, aria-disabled, read-only | `:disabled`, `[aria-disabled="true"]`, `[readonly]` | disabled = `--ds-opacity-disabled`, `cursor: not-allowed`, no hover/press; aria-disabled stays focusable and explains why (tooltip or helper text); read-only = no border emphasis, normal text contrast, selectable |
| Validation | required, invalid, valid/success, warning | `required`, `:user-invalid`, `aria-invalid="true"`, `[data-state="success"]` | error border + `--ds-error-text` message with icon below the field, linked by `aria-describedby`; success only when it helps (async checks); validate on blur, re-validate on input after the first error |
| Activity | loading/busy, progress, success-feedback, error-feedback | `aria-busy="true"`, `[data-state="loading"]`, transient `is-copied`/`is-success` | busy keeps the element's width (no layout shift), spinner replaces or precedes the icon, label stays readable, interaction blocked; indicators appear only after ~300ms; transient success lasts 1.6–2s then returns to rest |
| Content | empty, placeholder, autofill, overflow (long text), skeleton | `:placeholder-shown`, `:autofill`, text-overflow, `.ds-skeleton` | placeholder `--ds-subtle` (≥ 4.5:1 against field); autofill keeps the theme surface; long text wraps or truncates with a tooltip and full text in `title`/accessible name |
| Drag | dragging, drop-target, drag-over | `[data-dragging]`, `[data-drop-target]` | lifted surface `--ds-shadow-panel`, drop target tinted `--ds-opacity-state-drag` with a dashed primary border |
| Variants | tone (neutral, primary, info, success, warning, error/destructive), size (sm, md, lg), density | `is-*` modifiers, daisyUI `btn-*` | every variant × every state above must remain legible in both themes (WCAG 2.2 AA: 4.5:1 text, 3:1 boundaries and icons) |
| Environment | dark, reduced motion, reduced transparency, more contrast, forced colours, RTL, 200% zoom, 320px width, print | media queries, `[dir="rtl"]` | verify each; forced colours keep focus and selection visible with system colours |

Button-like controls (button, icon button, toggle, segmented item, chip, menu item, tab, pagination link) must cover at
least: rest, hover, focus-visible, pressed, selected/current (when toggleable), disabled, aria-disabled, loading (buttons),
and each tone. Field-like controls (input, textarea, select, combobox, date, number, password, OTP, tags) must cover at
least: rest, hover, focus, filled, placeholder, disabled, read-only, invalid, success (when used), loading (async), with
prefix/suffix, with clear button, sizes.

## 6. Motion

Motion must feel physical and quiet. Use the tokens:

| Use | Duration | Easing |
| --- | --- | --- |
| Colour, background, border, opacity on hover/focus | `--ds-duration-fast` (150ms) | `--ds-ease-standard` |
| Press feedback | `--ds-duration-instant` (120ms) | `--ds-ease-out` |
| Enter of popover, menu, tooltip, toast, dropdown | `--ds-duration-quick` (160ms) – `--ds-duration-enter` (220ms) | `--ds-ease-emphasized` |
| Exit of the same | `--ds-duration-exit` (140ms) | `--ds-ease-exit` |
| Indicators that travel (switch thumb, segmented/tab indicator, slider thumb snap), panels, sheets | `--ds-duration-spring` (500ms) | `--ds-ease-spring` (critically damped, no overshoot) |
| After a gesture with momentum only (sheet flick, carousel throw) | `--ds-duration-spring-bounce` | `--ds-ease-spring-bounce` |
| Dialog | `--ds-duration-base` (180ms) | `--ds-ease-emphasized` |
| Skeleton shimmer | `--ds-duration-shimmer` | linear, infinite |

Rules:

1. **Enter = opacity + a small move from the trigger.** Translate at most `--ds-enter-offset` (5px) or scale from 0.96–0.98,
   with `transform-origin` on the side of the trigger (menus open from their button, sheets slide from their edge and
   leave the same way). Use `@starting-style` and `transition-behavior: allow-discrete` for `[popover]`, `dialog`,
   `details` and `display` toggles, so CSS alone animates both directions and stays interruptible.
2. **Exit is faster than enter** and uses the exit easing.
3. **Animate only `transform` and `opacity`** (plus colours). Height reveals use `grid-template-rows: 0fr → 1fr` or
   `interpolate-size: allow-keywords`; never animate `top/left/width/height`.
4. **Respond on pointer-down** (press feedback through `:active`), never wait for click to show feedback.
5. **Interruptible:** a reopened element continues from where it is (CSS transitions do this; keyframe animations do not —
   prefer transitions).
6. **Restraint:** one motion per state change; no bounce on things that did not move by gesture; no infinite animation
   except spinner, skeleton, live dot and indeterminate progress; no parallax; no hover lift on dense data UI (only
   clickable cards may lift by `--ds-lift`).
7. **Reduced motion:** transforms go, opacity cross-fades stay (≤ 150ms), loops stop and keep a static label. Write a
   `@media (prefers-reduced-motion: reduce)` block in your own file when your component moves.
8. JavaScript-driven motion checks `reduceMotion()` from `core.js` and uses the Web Animations API with the same tokens
   (read them with `getComputedStyle`), always starting from the current on-screen value.

## 7. JavaScript contract

- Vanilla ES2022 modules, no dependencies. Each `modules/<name>.js` exports `wire()` (document-level listeners, called once
  per page), `init(root)` (per-element setup inside `root`, idempotent: mark processed elements with
  `data-ds-ready` or keep a `WeakSet`), and optionally `api` (an object merged into `window.DS`, e.g.
  `export const api = { sheet: { open, close } }`).
- Everything is opt-in by `data-ds-<feature>` attributes on server-rendered HTML; the HTML must work (or degrade to native
  behaviour) without JavaScript.
- Use `core.js` helpers: `t`, `addMessages`, `focusQuietly`, `reduceMotion`, `coarsePointer`, `uid`, `rovingKeydown`,
  `placeFloating`, `openDialog`, `closeDialog`, `icon`, `normalize`, `store`, `key`.
- **Keyboard and ARIA follow the WAI-ARIA Authoring Practices** pattern of the component (listbox, combobox, menu, menubar,
  tabs, tree, grid, slider, spinbutton, dialog, alertdialog, disclosure, accordion, carousel, toolbar, radio group,
  switch, tooltip, feed). Document the keyboard table on the component page.
- Dispatch `CustomEvent`s named `ds:<component>:<event>` (bubbles) for app code, e.g. `ds:tabs:change`.
- **i18n:** every user-visible string (labels, live-region messages, counts) goes through `t()` with keys
  `<module>.<key>` registered once at module top: `addMessages({ en: {…}, id: {…} })`. Both languages are required.
- No `innerHTML` with user data; build nodes or use `textContent`.

## 8. Razor and C#

- Tag helpers: `TagHelpers/<Feature>TagHelpers.cs`, namespace `Citia.DesignSystem.TagHelpers`, element names
  `ds-<component>` (English), attributes kebab-case. Use the `Classes.Add(output, "a b")` helper in `DsTagHelpers.cs`.
  Encode text through `TagHelperContent.Append` (never `AppendHtml` with user data).
- Partials: `Views/Shared/_Ds<Component>.cshtml` with a record model in `Ui/<Feature>.cs`.
- Strings: `Localization/Strings.<Feature>.cs`:

  ```csharp
  namespace Citia.DesignSystem.Localization;

  static class TabsStrings
  {
      [System.Runtime.CompilerServices.ModuleInitializer]
      internal static void Register()
      {
          DsText.Add("en", new Dictionary<string, string> { ["tabs.more"] = "More tabs" });
          DsText.Add("id", new Dictionary<string, string> { ["tabs.more"] = "Tab lainnya" });
      }
  }
  ```

  Read them with `DsText.T("tabs.more")` (positional `{0}` arguments supported).
- Dates and numbers for people: `Fmt.Date`, `Fmt.DateTime`, `Fmt.Decimal` (culture-aware); machine numbers `Fmt.Number`.

## 9. Documentation pages

One page per component, English slug, two files: `docs/en/<slug>.md` and `docs/id/<slug>.md`. Both are complete (the
Indonesian page is a real translation, not a stub). Front matter:

```yaml
---
title: Segmented control
group: components            # getting-started | foundations | components | patterns | content | reference
category: actions            # components only: actions | forms | data-display | feedback | overlays | navigation | layout
order: 4                     # order inside the category
summary: One sentence, at most 160 characters, shown as the lede and meta description.
source: TPS app.css L3044–3106   # optional, version 1 origin
---
```

Component page structure (keep the order; skip a section only when it does not apply):

1. Intro paragraph (no heading): what it is, when to use it, when to use something else (link to it).
2. `## Examples` — one live preview per variant/size; previews are ` ```html preview title="…" ` fences, self-contained,
   realistic content, no inline styles except layout wrappers.
3. `## States` — a live preview showing the states side by side (use static ARIA/attributes to freeze hover/focus is not
   possible: show disabled, selected, invalid, loading, etc.) and the state table: `State | Trigger | Appearance`.
4. `## Anatomy` — the parts (`.ds-x`, `.ds-x__part`) as a short list.
5. `## Usage` — do / don't bullets (concrete, with numbers).
6. `## Accessibility` — roles, accessible names, the keyboard table (`Key | Action`), contrast notes, motion notes.
7. `## Razor` — the tag helper or partial (```cshtml fence), when one exists.
8. `## JavaScript` — data attributes (`Attribute | Effect`), API, events, when one exists.
9. `## Tokens` — the variables the component reads.
10. `## Native and daisyUI` — which element or daisyUI class it builds on and what the DS changes.

Writing rules (both languages): plain, specific, imperative for rules ("Use one primary button per area."), numbers instead
of adjectives (44px, 6 s, 4.5:1), no filler, no exclamation marks, no emoji. Sentence-case headings, at most 40 characters,
no `#` (h1) in the body, `##` → `###` → `####` without skipping. Callouts: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`,
`> [!WARNING]`, `> [!CAUTION]`. Links to other pages: `[Dialog](./dialog.md)`; to the other language:
`[Bahasa Indonesia](../id/dialog.md)`. Indonesian: formal but plain, keep technical terms (`class`, `token`, `focus ring`,
`tag helper`, `popover`) and component names in English.

## 10. Verification before you report

1. `powershell -File tools/css.ps1 -Target docs` succeeds.
2. Every page you wrote returns 200 in both languages: `curl -s -o /dev/null -w "%{http_code}" http://localhost:5180/en/<slug>`.
3. JS modules pass `node --check` (copy to a `.mjs` file in your temp folder first).
4. Screenshot light, dark and 390px mobile for at least your two most complex pages with Edge headless
   (`"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --disable-gpu --hide-scrollbars
   --user-data-dir=<your own temp folder> --window-size=1440,2400 --screenshot=<windows path>.png
   --blink-settings=preferredColorScheme=1 <url>`; `=0` for dark; window width ≥ 500). **A unique `--user-data-dir`
   per batch is required**: several batches run Edge at once and a shared profile makes the screenshot silently fail.
   Pass Windows paths (`cygpath -w` in Git Bash), not `/tmp/...`. Look at the images with the Read tool; fix what looks wrong.
5. Final report: files created/changed, components and states covered, C# that needs a build, "Requests" for files you do
   not own, known gaps.
