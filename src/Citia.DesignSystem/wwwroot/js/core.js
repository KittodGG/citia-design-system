/*!
 * Citia Design System — core utilities shared by every behaviour module (ES module, no dependencies).
 * Modules import from here, never from ds.js, so there are no import cycles.
 */

export const html = document.documentElement;
export const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const desktopQuery = window.matchMedia("(min-width: 1024px)");
export const coarsePointer = () => window.matchMedia("(pointer: coarse)").matches;

/** Runtime configuration. HTML attributes written by _DsHead win over these defaults. */
export const config = {
  light: html.dataset.dsLight || "light",
  dark: html.dataset.dsDark || "dark",
  storage: html.dataset.dsStorage || "ds",
  locale: null, // null = follow <html lang>
  toastTimeout: 6000,
  exportLock: 15000,
};

/** Override defaults (theme names, storage prefix, locale, timings). Call before init(). */
export function configure(options = {}) {
  Object.assign(config, options);
}

export const store = {
  get(name) { try { return localStorage.getItem(name); } catch { return null; } },
  set(name, value) { try { value == null ? localStorage.removeItem(name) : localStorage.setItem(name, value); } catch { /* blocked */ } },
  sessionGet(name) { try { return sessionStorage.getItem(name); } catch { return null; } },
  sessionSet(name, value) { try { sessionStorage.setItem(name, value); } catch { /* blocked */ } },
};

/** Storage key with the configured prefix: key("theme") → "ds-theme". */
export const key = (name) => `${config.storage}-${name}`;

/** Move focus without scrolling (returning focus must never drag a sidebar or a long page). */
export const focusQuietly = (el) => el && typeof el.focus === "function" && el.focus({ preventScroll: true });

let uidCounter = 0;
/** Unique id for generated elements: uid("tabs") → "ds-tabs-3". */
export const uid = (prefix = "el") => `ds-${prefix}-${++uidCounter}`;

/* ------------------------------------------------------------------ i18n */
const messages = { en: {}, id: {} };

/** Register UI strings: addMessages({ en: { "toast.close": "Close" }, id: { "toast.close": "Tutup" } }). Other languages may be added. */
export function addMessages(dict) {
  for (const [lang, entries] of Object.entries(dict)) Object.assign((messages[lang] ??= {}), entries);
}

/** Active language: configure({ locale }) or <html lang>, two-letter; falls back to English. */
export function locale() {
  const lang = String(config.locale || html.lang || "en").slice(0, 2).toLowerCase();
  return messages[lang] ? lang : "en";
}

/** Translate a key with {placeholders}: t("combobox.results", { count: 3 }). Missing keys fall back to English, then to the key. */
export function t(name, vars) {
  let text = messages[locale()]?.[name] ?? messages.en[name] ?? name;
  if (vars) text = text.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ""));
  return text;
}

/** Case- and space-insensitive text for matching, in the active locale. */
export const normalize = (s) => String(s ?? "").toLocaleLowerCase(locale()).replace(/\s+/g, " ").trim();

/* ------------------------------------------------------------------ icons */
const ICON_PATHS = {
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  success: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  warning: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  error: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "chevron-up": '<path d="m18 15-6-6-6 6"/>',
  "chevron-left": '<path d="m15 18-6-6 6-6"/>',
  "chevron-right": '<path d="m9 18 6-6-6-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  "more-vertical": '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
};

/** Add icon paths for modules (24 px grid, stroke drawn): registerIcons({ star: '<path …/>' }). */
export function registerIcons(paths) {
  Object.assign(ICON_PATHS, paths);
}

/**
 * Inline SVG markup for generated UI. Static names only, never user text. Names registered here are inlined; any other
 * name references the page sprite (_DsIconSprite partial: <use href="#ds-icon-name">), so every icon of the set works.
 */
export function icon(name, className = "ds-icon") {
  const body = ICON_PATHS[name] ?? `<use href="#ds-icon-${String(name).replace(/[^a-z0-9-]/g, "")}"></use>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}" aria-hidden="true" focusable="false">${body}</svg>`;
}

/* ------------------------------------------------------------------ dialogs (shared by several modules) */
/** Open a <dialog> modally, remember the opener, move focus to [data-ds-initial-focus] or [autofocus]. */
export function openDialog(dialog, opener) {
  if (!(dialog instanceof HTMLDialogElement) || dialog.open) return;
  dialog._dsOpener = opener ?? document.activeElement;
  dialog.showModal();
  const first = dialog.querySelector("[data-ds-initial-focus], [autofocus]");
  if (first) focusQuietly(first);
}

export function closeDialog(dialog, value = "") {
  if (dialog?.open) dialog.close(value);
}

/** Return focus to the opener when any dialog closes (wired once by ds.js). */
export function onDialogClose(event) {
  const dialog = event.target;
  if (!(dialog instanceof HTMLDialogElement) || !dialog._dsOpener) return;
  const opener = dialog._dsOpener;
  dialog._dsOpener = null;
  // Closing a dialog opened from a <details> menu closes that menu and returns focus to its summary.
  const menu = opener.closest?.("details[open]");
  if (menu && !menu.contains(dialog)) {
    menu.open = false;
    focusQuietly(menu.querySelector("summary"));
  } else {
    focusQuietly(opener);
  }
}

/* ------------------------------------------------------------------ positioning (floating layers) */
/**
 * Place a fixed-position floating element next to an anchor, flipping to stay inside the viewport.
 * side: "bottom" | "top" | "right" | "left"; align: "start" | "center" | "end". Returns the side used.
 */
export function placeFloating(floating, anchor, { side = "bottom", align = "start", gap = 6, inset = 8 } = {}) {
  const a = anchor.getBoundingClientRect();
  floating.style.position = "fixed";
  floating.style.margin = "0";
  // Layout size, not the painted box: an entering layer is still scaled (0.96–0.98), which would shrink the measurement.
  const f = { width: floating.offsetWidth, height: floating.offsetHeight };
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const fits = {
    bottom: a.bottom + gap + f.height <= vh - inset,
    top: a.top - gap - f.height >= inset,
    right: a.right + gap + f.width <= vw - inset,
    left: a.left - gap - f.width >= inset,
  };
  const opposite = { bottom: "top", top: "bottom", left: "right", right: "left" };
  const used = fits[side] || !fits[opposite[side]] ? side : opposite[side];
  let top;
  let left;
  if (used === "bottom" || used === "top") {
    top = used === "bottom" ? a.bottom + gap : a.top - gap - f.height;
    left = align === "end" ? a.right - f.width : align === "center" ? a.left + a.width / 2 - f.width / 2 : a.left;
  } else {
    left = used === "right" ? a.right + gap : a.left - gap - f.width;
    top = align === "end" ? a.bottom - f.height : align === "center" ? a.top + a.height / 2 - f.height / 2 : a.top;
  }
  floating.style.left = `${Math.round(Math.min(vw - f.width - inset, Math.max(inset, left)))}px`;
  floating.style.top = `${Math.round(Math.min(vh - f.height - inset, Math.max(inset, top)))}px`;
  floating.dataset.side = used;
  return used;
}

/* ------------------------------------------------------------------ roving focus (toolbars, menus, tab lists, toggle groups) */
/**
 * Arrow-key navigation inside a composite widget. items: focusable elements in order. Returns true when handled.
 * orientation: "horizontal" | "vertical" | "both". Home/End jump to the ends; wraps around.
 */
export function rovingKeydown(event, items, { orientation = "horizontal", wrap = true } = {}) {
  const enabled = items.filter((el) => !el.disabled && el.getAttribute("aria-disabled") !== "true");
  if (!enabled.length) return false;
  const index = enabled.indexOf(document.activeElement);
  const next = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
  const allowed = orientation === "both" ? Object.keys(next) : orientation === "horizontal" ? ["ArrowRight", "ArrowLeft"] : ["ArrowDown", "ArrowUp"];
  let target = null;
  if (allowed.includes(event.key)) {
    let i = index + next[event.key];
    if (i < 0) i = wrap ? enabled.length - 1 : 0;
    if (i >= enabled.length) i = wrap ? 0 : enabled.length - 1;
    target = enabled[i];
  } else if (event.key === "Home") target = enabled[0];
  else if (event.key === "End") target = enabled.at(-1);
  if (!target) return false;
  event.preventDefault();
  enabled.forEach((el) => el.setAttribute("tabindex", el === target ? "0" : "-1"));
  focusQuietly(target);
  return true;
}
