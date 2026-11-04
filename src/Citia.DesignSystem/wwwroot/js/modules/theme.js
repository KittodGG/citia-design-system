/* Theme: light / dark / system, persisted choice, meta theme-color, cross-fade on change, sync between tabs.
   Hooks: [data-ds-theme-toggle] (with optional [data-ds-theme-icon="light|dark"] children, or the CSS-driven .ds-theme-toggle icons),
          [data-ds-theme-set="light|dark|system"] (aria-pressed marks the choice; inside .ds-theme-switcher the sliding thumb follows it).
   Event: ds:themechange on document ({ mode, theme }). Owner: batch A10 navigation. */
import { html, config, store, key, reduceMotion, t, addMessages } from "../core.js";

addMessages({
  en: { "theme.toLight": "Switch to light theme", "theme.toDark": "Switch to dark theme", "theme.light": "Light theme", "theme.dark": "Dark theme", "theme.system": "Follow system theme" },
  id: { "theme.toLight": "Aktifkan tema terang", "theme.toDark": "Aktifkan tema gelap", "theme.light": "Tema terang", "theme.dark": "Tema gelap", "theme.system": "Ikuti tema sistem" },
});

const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function resolved(mode) {
  if (mode === "dark") return config.dark;
  if (mode === "light") return config.light;
  return darkQuery.matches ? config.dark : config.light;
}

export const theme = {
  /** Active theme name (value of html[data-theme]). */
  get: () => html.getAttribute("data-theme") || config.light,
  /** User choice: "light" | "dark" | "system". */
  getMode: () => {
    const saved = store.get(key("theme"));
    return saved === "light" || saved === "dark" ? saved : "system";
  },
  isDark: () => theme.get() === config.dark,
  set(mode, { animate = true } = {}) {
    const next = mode === "light" || mode === "dark" ? mode : "system";
    store.set(key("theme"), next === "system" ? null : next);
    apply(next, animate);
  },
  toggle() {
    theme.set(theme.isDark() ? "light" : "dark");
  },
};

function syncControls() {
  const mode = theme.getMode();
  const dark = theme.isDark();
  document.querySelectorAll("[data-ds-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-label", t(dark ? "theme.toLight" : "theme.toDark"));
    button.title = t(dark ? "theme.dark" : "theme.light");
    button.querySelectorAll("[data-ds-theme-icon]").forEach((el) => {
      el.hidden = el.getAttribute("data-ds-theme-icon") !== (dark ? "dark" : "light");
    });
  });
  document.querySelectorAll("[data-ds-theme-set]").forEach((button) => {
    const choice = button.getAttribute("data-ds-theme-set");
    button.setAttribute("aria-pressed", String(choice === mode));
    // Icon-only buttons without their own name get one; the visible text of labelled buttons stays the name.
    if (!button.hasAttribute("aria-label") && !button.textContent.trim()) button.setAttribute("aria-label", t(`theme.${choice === "light" || choice === "dark" ? choice : "system"}`));
  });
}

function syncThemeColor() {
  let meta = document.querySelector('meta[name="theme-color"]:not([media])');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.append(meta);
  }
  const color = getComputedStyle(html).getPropertyValue("--color-base-100").trim();
  if (color) meta.content = color;
}

function apply(mode, animate) {
  const run = () => {
    html.setAttribute("data-theme", resolved(mode));
    html.dataset.dsMode = mode;
    html.dataset.dsScheme = theme.isDark() ? "dark" : "light";
    syncControls();
    syncThemeColor();
    document.dispatchEvent(new CustomEvent("ds:themechange", { detail: { mode, theme: theme.get() } }));
  };
  // Ease the brightness jump with a cross-fade (avoid abrupt light/dark flashes); instant under reduced motion.
  if (animate && document.startViewTransition && !reduceMotion()) document.startViewTransition(run).finished.catch(() => {});
  else run();
}

export function wire() {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const toggle = target?.closest("[data-ds-theme-toggle]");
    if (toggle) return theme.toggle();
    const set = target?.closest("[data-ds-theme-set]");
    if (set) theme.set(set.getAttribute("data-ds-theme-set"));
  });
  darkQuery.addEventListener("change", () => { if (theme.getMode() === "system") apply("system", true); });
  // Another tab changed the choice: follow it without animation.
  window.addEventListener("storage", (event) => {
    if (event.key === key("theme") || event.key === null) apply(theme.getMode(), false);
  });
  html.dataset.dsScheme = theme.isDark() ? "dark" : "light";
  syncThemeColor();
}

export function init() {
  syncControls();
}

export const api = { theme };
