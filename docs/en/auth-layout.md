---
title: Auth layout
group: components
category: layout
order: 8
summary: Page layouts for sign in, sign up and password recovery: a form panel beside an optional brand panel, or a centred card.
source: TPS _AuthLayout, app.css L2145–2269
---

The auth layout frames the pages people see before they are signed in. It keeps one thing on screen: a short form with one primary button. Use the split layout for a product with a brand story, the centred card for a quiet, fast page. Inside the product use the [App shell](./app-shell.md).

## Examples

### Sign in with brand panel

The brand panel appears from 1024px. Below it the form fills the screen and the brand mark moves above the title.

```html preview title="Sign in, split"
<div class="ds-auth is-embedded">
  <section class="ds-auth-hero" aria-label="About the product">
    <div class="ds-auth-brand"><span class="ds-brand-mark" aria-hidden="true">C</span>Citia</div>
    <div><h2 class="ds-auth-hero-title">Work in one place.</h2><p class="ds-auth-hero-slogan">Projects, invoices and people, kept in step.</p></div>
    <p class="ds-auth-hero-foot">© 2026 Citia Engineering</p>
  </section>
  <main class="ds-auth-main">
    <div class="ds-auth-panel">
      <h1 class="ds-auth-title">Sign in</h1>
      <p class="ds-auth-subtitle">Use your work email to continue.</p>
      <form class="ds-auth-form" novalidate>
        <label class="ds-stack is-gap-xs">Email<input class="input w-full" type="email" autocomplete="username" placeholder="ayu@northwind.example"></label>
        <label class="ds-stack is-gap-xs">Password<input class="input w-full" type="password" autocomplete="current-password"></label>
        <button type="submit" class="btn btn-primary">Sign in</button>
      </form>
      <p class="ds-auth-note"><a href="#">Forgot your password?</a></p>
    </div>
  </main>
</div>
```

### Sign up and forgot password

```html preview title="Sign up, hero on the right"
<div class="ds-auth is-embedded is-reverse">
  <section class="ds-auth-hero" aria-label="About the product">
    <div class="ds-auth-brand"><span class="ds-brand-mark" aria-hidden="true">C</span>Citia</div>
    <p class="ds-auth-hero-slogan">Set up your workspace in two minutes.</p>
    <p class="ds-auth-hero-foot">No card required for the first 30 days.</p>
  </section>
  <main class="ds-auth-main">
    <div class="ds-auth-panel">
      <h1 class="ds-auth-title">Create your account</h1>
      <form class="ds-auth-form" novalidate>
        <label class="ds-stack is-gap-xs">Full name<input class="input w-full" type="text" autocomplete="name" placeholder="Mei Tanaka"></label>
        <label class="ds-stack is-gap-xs">Email<input class="input w-full" type="email" autocomplete="email"></label>
        <button type="submit" class="btn btn-primary">Create account</button>
        <div class="ds-auth-divider">or</div>
        <button type="button" class="btn btn-outline">Continue with a passkey</button>
      </form>
      <p class="ds-auth-note">Already have an account? <a href="#">Sign in</a></p>
    </div>
  </main>
</div>
```

### Centred card

```html preview title="Forgot password, centred"
<div class="ds-auth is-embedded is-centered">
  <main class="ds-auth-main">
    <div class="ds-auth-panel">
      <h1 class="ds-auth-title">Reset your password</h1>
      <p class="ds-auth-subtitle">We send a link that works for 30 minutes.</p>
      <form class="ds-auth-form" novalidate>
        <label class="ds-stack is-gap-xs">Email<input class="input w-full" type="email" autocomplete="email"></label>
        <button type="submit" class="btn btn-primary">Send link</button>
      </form>
      <p class="ds-auth-note"><a href="#">Back to sign in</a></p>
    </div>
  </main>
</div>
```

## States

| State | Trigger | Appearance |
| --- | --- | --- |
| Default | none | Form panel on `--color-base-100`; brand panel on deep teal |
| Wide | 1024px and up | Two columns, 5fr brand and 4fr form (`.is-reverse` swaps them) |
| Narrow | Under 1024px | Form only; padding 24px, 40px from 640px |
| Field states | Focus, filled, invalid | See [Input](./input.md) and [Validation](./validation.md) |
| Submitting | `aria-busy="true"` on the button | Width kept, spinner before the label, form inert |
| Error | Wrong password or expired link | [Alert](./alert.md) above the form; focus moves to it |
| Brand image | `<img>` as first child of the hero | Cover image with a 55% dark overlay so white text keeps 4.5:1 |
| Entering | Page load | Panel fades in with a 5px rise, 220ms; none under reduced motion |

## Anatomy

- `.ds-auth`: the grid. `.is-centered`, `.is-reverse`, `.is-embedded` (inside a card or preview).
- `.ds-auth-hero` with `.ds-auth-brand`, `.ds-auth-hero-title`, `.ds-auth-hero-slogan`, `.ds-auth-hero-foot`.
- `.ds-auth-main` and `.ds-auth-panel` (24rem): the form column.
- `.ds-auth-title`, `.ds-auth-subtitle`, `.ds-auth-form`, `.ds-auth-divider`, `.ds-auth-note`.

## Usage

- One primary button per page, full width. Put secondary routes ("Forgot password", "Create account") in the note under the form.
- Keep the title to 1 to 4 words and the subtitle to one short sentence.
- Use `autocomplete` values (`username`, `current-password`, `new-password`, `one-time-code`) so password managers work.
- Keep the brand panel decorative: no content that is not also available in the form column.
- Do not ask for more than 3 fields on sign up; collect the rest after.

## Accessibility

- The page has one `<main>` and one `<h1>` (the title). The brand panel is a labelled `section`; it can be removed from the tab order because it has no controls.
- Errors are announced (`role="alert"`) and linked to fields through `aria-describedby`.
- On narrow screens nothing is lost: the brand mark moves to `.ds-auth-brand` above the title when you place one in the form column.
- Text on the brand panel keeps 4.5:1 against the teal and against the image overlay.

## Tokens

`--ds-size-auth-panel` (24rem), `--ds-type-title-auth-*`, `--ds-type-display-*`, `--color-secondary`, `--color-base-100|200|300`, `--ds-radius-card`, `--ds-shadow-menu`, `--ds-duration-enter`.

## Native and daisyUI

Built on `main`, `form` and CSS grid. Fields and buttons are daisyUI `input` and `btn`; `.ds-auth-form` makes the primary button full width. Version 1 classes (`.ds-auth`, `.ds-auth-hero`, `.ds-auth-panel`) are unchanged; the TPS photograph and slogan are now content you supply.
