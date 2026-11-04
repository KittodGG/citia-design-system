---
title: Citia Design System
group: getting-started
order: 1
summary: A calm, precise design system for ASP.NET Core apps: tokens, Razor components and small vanilla JavaScript behaviours, in light and dark, English and Indonesian.
---

Citia Design System (DS) is one source for how web applications look and behave. It targets ASP.NET Core on .NET 10 (MVC and Razor Pages) and is not tied to one product: nothing in it assumes a domain. It was extracted from a production operations app, then rebuilt to cover the full range of application UI, from a sign-in form to a dense data table.

The feel is premium and quiet. Surfaces are neutral, borders are 1px hairlines, colour is rare, and motion is short and mostly invisible. The motion and interaction rules follow Apple's fluid-interface thinking: respond on pointer-down, animate from the current value, leave where you entered.

## Who it is for

- **Teams building server-rendered ASP.NET Core apps** that want a finished interface layer without a JavaScript framework or a Node toolchain.
- **Designers and writers** who need a shared vocabulary of tokens, states and wording rules.
- **Anyone shipping in two languages.** Every string the DS produces exists in English and Indonesian, and a third language is one call away.

## What is inside

| Part | Where | What it gives you |
| --- | --- | --- |
| Tokens | `tokens/tokens.json` | One DTCG source for colour, type, spacing, radius, shadow, motion, z-index and breakpoints, per theme. Generated into CSS variables, a Tailwind theme and C#. |
| Razor Class Library | `src/Citia.DesignSystem` | Tag helpers (`<ds-icon>`, `<ds-pill>`, `<ds-empty>`), partials (`_DsHead`, `_DsScripts`, `_DsToast`, `_DsPager`), C# helpers (`Icon`, `Fmt`, `Tone`, toasts) and static assets. |
| Styles | `Styles/` | `ds-*` component classes on top of Tailwind CSS v4 and daisyUI 5, or a precompiled `ds.css`. |
| Behaviours | `wwwroot/js/ds.js` | One dependency-free ES module: theme, dialogs, menus, tabs, combobox, date picker, table selection, toasts. Opt in with `data-ds-*` attributes. |
| Fonts and icons | `wwwroot/fonts`, `wwwroot/icons` | Self-hosted Manrope variable font and an SVG icon sprite on a 24px grid. |
| Docs site | `site/Citia.DesignSystem.Docs` | This site: a Razor Pages app that uses the DS itself. |

## Principles in one line each

- **Purpose.** Each screen has one job and one primary action.
- **Agency.** The person stays in control: undo, cancel, confirm before the irreversible.
- **Responsibility.** Say what an action does, in its label.
- **Familiarity.** Use platform behaviour and standard patterns before inventing.
- **Flexibility.** Light and dark, keyboard and touch, reduced motion, two languages.
- **Simplicity.** Remove decisions, keep information.
- **Craft.** A token for every value, tested contrast, no magic numbers.
- **Delight.** Small, physical, quick feedback; never decoration.

The details, with numbers, are on [Principles](./principles.md).

## How the docs are organised

| Group | Read it for |
| --- | --- |
| Getting started | Requirements, installation, a first page, theming, repository map. |
| Foundations | Principles, colour, typography, spacing, shape, motion, states, accessibility, localization, icons. |
| Components | One page per component, grouped by category: actions, forms, data display, feedback, overlays, navigation, layout. Each has live examples, a state table, accessibility notes and the Razor and JavaScript API. |
| Patterns | Page layouts, forms, data views, workflows, feedback. |
| Content | Writing, voice and tone. |
| Reference | JavaScript, Razor API, coverage, migration from version 1, changelog. |

Live previews use the same CSS and JavaScript as an app. The bar above each preview switches that preview between the site theme, light and dark. Search opens with `Ctrl K` (`Cmd K` on macOS) or `/`, and the language and theme switches sit in the sidebar footer.

## Start here

1. Check the [requirements](./requirements.md): the .NET 10 SDK and a current browser.
2. [Install](./installation.md) the library and add four partials to your layout.
3. Build a first page with the [quick start](./quick-start.md).
4. Browse the components, starting with [Button](./button.md) and [Field](./field.md).

> [!NOTE]
> This page is also available in [Bahasa Indonesia](../id/introduction.md). Both languages are complete and maintained together.
