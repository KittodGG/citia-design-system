/* Navigation menu (disclosure navigation with dropdown and mega panels), navbar (scroll edge, mobile menu, hide on scroll),
   breadcrumb and language menus (details popdowns), language remember.
   Owner: batch A10 navigation. Contract: docs/_contributing.md (wire() once per page, init(root) idempotent, optional api).
   Hooks: [data-ds-nav-menu], [data-ds-navbar] (+ [data-ds-navbar-toggle], data-ds-hide-on-scroll), details[data-ds-popdown],
          [data-ds-language-remember] (+ data-ds-language-cookie). Events: ds:navmenu:open|close, ds:navbar:toggle, ds:language:change. */
import { t, addMessages, focusQuietly, store, key, html } from "../core.js";
import { placeIndicator, hideOnScroll, scrollContainer, scrollTopOf } from "./tabs.js";

addMessages({
  en: { "navbar.open": "Open menu", "navbar.close": "Close menu" },
  id: { "navbar.open": "Buka menu", "navbar.close": "Tutup menu" },
});

const isRtl = (el) => getComputedStyle(el).direction === "rtl";
const emit = (el, name, detail) => el.dispatchEvent(new CustomEvent(`ds:${name}`, { bubbles: true, detail }));
/** Narrow means the component's own width is under 40rem, the same rule as the CSS container queries. */
const isNarrow = (el) => el.clientWidth < 40 * (parseFloat(getComputedStyle(html).fontSize) || 16);
const done = new WeakSet();

function scan(root, selector) {
  const found = [...root.querySelectorAll(selector)];
  return root.matches?.(selector) ? [root, ...found] : found;
}

/* ------------------------------------------------------------------ navbar */
function setupNavbar(bar) {
  if (done.has(bar)) return;
  done.add(bar);
  const toggle = bar.querySelector("[data-ds-navbar-toggle]");

  const container = scrollContainer(bar);
  const target = container === window ? window : container;
  const edge = () => bar.toggleAttribute("data-scrolled", scrollTopOf(container) > 2);
  let frame = 0;
  target.addEventListener("scroll", () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; edge(); }); }, { passive: true });
  edge();

  const setOpen = (open, { returnFocus = false } = {}) => {
    if (!toggle || bar.hasAttribute("data-open") === open) return;
    bar.toggleAttribute("data-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", t(open ? "navbar.close" : "navbar.open"));
    if (open) bar.removeAttribute("data-hidden");
    if (!open && returnFocus) focusQuietly(toggle);
    emit(bar, "navbar:toggle", { open });
  };

  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", t("navbar.open"));
    toggle.addEventListener("click", () => setOpen(!bar.hasAttribute("data-open")));
    bar.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && bar.hasAttribute("data-open")) { event.stopPropagation(); setOpen(false, { returnFocus: true }); }
    });
    bar.addEventListener("click", (event) => {
      if (event.target.closest?.(".ds-navbar__nav a[href]")) setOpen(false);
    });
    document.addEventListener("pointerdown", (event) => {
      if (bar.hasAttribute("data-open") && !bar.contains(event.target)) setOpen(false);
    });
    new ResizeObserver(() => { if (!isNarrow(bar)) setOpen(false); }).observe(bar);
  }

  if (bar.hasAttribute("data-ds-hide-on-scroll")) hideOnScroll(bar, { isOpen: () => bar.hasAttribute("data-open") });
  bar.setAttribute("data-ds-ready", "");
}

/* ------------------------------------------------------------------ navigation menu */
function setupNavMenu(menu) {
  if (done.has(menu)) return;
  done.add(menu);
  const list = menu.querySelector(".ds-nav-menu__list");
  if (!list) return;

  const triggers = () => [...list.querySelectorAll(":scope > .ds-nav-menu__item > .ds-nav-menu__trigger")].filter((el) => el.getAttribute("aria-disabled") !== "true");
  const panelOf = (trigger) => document.getElementById(trigger.getAttribute("aria-controls") ?? "");
  const entriesOf = (panel) => [...panel.querySelectorAll(".ds-nav-menu__entry")].filter((el) => el.getAttribute("aria-disabled") !== "true");

  const indicator = document.createElement("span");
  indicator.className = "ds-nav-menu__indicator";
  indicator.setAttribute("aria-hidden", "true");
  list.prepend(indicator);
  list.setAttribute("data-ds-ready", "");

  let openTrigger = null;
  let openedBy = "";
  let openTimer = 0;
  let closeTimer = 0;
  const clearTimers = () => { clearTimeout(openTimer); clearTimeout(closeTimer); };

  const highlight = (el) => {
    if (!el || isNarrow(menu)) return;
    placeIndicator(list, indicator, el, { fill: true, animate: indicator.hasAttribute("data-active") });
    indicator.setAttribute("data-active", "");
  };
  const unhighlight = () => {
    if (openTrigger) highlight(openTrigger);
    else indicator.removeAttribute("data-active");
  };

  const shift = (trigger, panel) => {
    const item = trigger.closest(".ds-nav-menu__item");
    if (isNarrow(menu) || !item) return panel.style.setProperty("--ds-panel-shift", "0px");
    const rect = item.getBoundingClientRect();
    const width = panel.offsetWidth;
    const left = isRtl(item) ? rect.right - width : rect.left;
    const viewport = document.documentElement.clientWidth;
    let offset = 0;
    if (left + width > viewport - 8) offset = viewport - 8 - (left + width);
    if (left + offset < 8) offset = 8 - left;
    panel.style.setProperty("--ds-panel-shift", `${Math.round(offset)}px`);
  };

  const close = (trigger, { silent = false } = {}) => {
    const panel = panelOf(trigger);
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    if (openTrigger === trigger) { openTrigger = null; openedBy = ""; }
    if (!silent) { emit(menu, "navmenu:close", { trigger, panel }); unhighlight(); }
  };

  const closeAll = () => { clearTimers(); if (openTrigger) close(openTrigger); };

  const open = (trigger, by) => {
    const panel = panelOf(trigger);
    if (!panel) return;
    clearTimers();
    if (openTrigger === trigger) { openedBy = by === "pointer" ? openedBy : by; return; }
    const previous = openTrigger;
    const all = triggers();
    if (previous) close(previous, { silent: true });
    // Direction-aware entrance when moving from one open panel to its neighbour.
    if (previous) panel.dataset.motion = all.indexOf(trigger) > all.indexOf(previous) ? "from-end" : "from-start";
    else delete panel.dataset.motion;
    panel.hidden = false;
    shift(trigger, panel);
    trigger.setAttribute("aria-expanded", "true");
    openTrigger = trigger;
    openedBy = by;
    highlight(trigger);
    emit(menu, "navmenu:open", { trigger, panel });
  };

  list.querySelectorAll(".ds-nav-menu__trigger[aria-controls]").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", trigger.getAttribute("aria-expanded") === "true" ? "true" : "false");
    const panel = panelOf(trigger);
    if (panel) panel.hidden = trigger.getAttribute("aria-expanded") !== "true";
  });

  // Hover intent: a short delay to open, a longer one to close, immediate switching between neighbours.
  list.addEventListener("pointerover", (event) => {
    if (event.pointerType !== "mouse" || isNarrow(menu)) return;
    const item = event.target.closest?.(".ds-nav-menu__item");
    if (!item) return;
    clearTimeout(closeTimer);
    const trigger = item.querySelector(":scope > .ds-nav-menu__trigger");
    if (!trigger || trigger.getAttribute("aria-disabled") === "true") return;
    if (!event.target.closest(".ds-nav-menu__panel")) highlight(trigger);
    if (!trigger.hasAttribute("aria-controls") || trigger === openTrigger) return;
    clearTimeout(openTimer);
    openTimer = setTimeout(() => open(trigger, "pointer"), openTrigger ? 0 : 90);
  });

  list.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "mouse") return;
    clearTimeout(openTimer);
    unhighlight();
    if (openTrigger && openedBy === "pointer") closeTimer = setTimeout(closeAll, 250);
  });

  list.addEventListener("focusin", (event) => {
    const trigger = event.target.closest?.(".ds-nav-menu__trigger");
    if (trigger && event.target.matches(":focus-visible")) highlight(trigger);
  });

  list.addEventListener("click", (event) => {
    const trigger = event.target.closest?.(".ds-nav-menu__trigger[aria-controls]");
    if (trigger) {
      event.preventDefault();
      if (openTrigger === trigger) {
        if (openedBy === "pointer" && event.detail > 0) openedBy = "click";
        else close(trigger);
      } else open(trigger, event.detail === 0 ? "keyboard" : "click");
      return;
    }
    if (event.target.closest?.(".ds-nav-menu__panel a[href]")) closeAll();
  });

  list.addEventListener("keydown", (event) => {
    const trigger = event.target.closest?.(".ds-nav-menu__trigger");
    const panel = event.target.closest?.(".ds-nav-menu__panel");
    const rtl = isRtl(list);
    const all = triggers();
    if (event.key === "Escape" && openTrigger) {
      event.preventDefault();
      event.stopPropagation();
      const owner = openTrigger;
      close(owner);
      focusQuietly(owner);
      return;
    }
    if (trigger) {
      const index = all.indexOf(trigger);
      if (event.key === "ArrowDown" && trigger.hasAttribute("aria-controls")) {
        event.preventDefault();
        open(trigger, "keyboard");
        focusQuietly(entriesOf(panelOf(trigger))[0]);
      } else if (event.key === (rtl ? "ArrowLeft" : "ArrowRight") || event.key === (rtl ? "ArrowRight" : "ArrowLeft")) {
        const forward = event.key === (rtl ? "ArrowLeft" : "ArrowRight");
        const next = all[(index + (forward ? 1 : -1) + all.length) % all.length];
        event.preventDefault();
        if (openTrigger && next.hasAttribute("aria-controls")) open(next, "keyboard");
        else if (openTrigger) closeAll();
        focusQuietly(next);
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        focusQuietly(event.key === "Home" ? all[0] : all.at(-1));
      }
      return;
    }
    if (panel) {
      const owner = [...list.querySelectorAll(".ds-nav-menu__trigger[aria-controls]")].find((item) => panelOf(item) === panel);
      const entries = entriesOf(panel);
      const index = entries.indexOf(document.activeElement);
      const move = (target) => { event.preventDefault(); focusQuietly(target); };
      if (event.key === "ArrowDown") move(entries[(index + 1) % entries.length]);
      else if (event.key === "ArrowUp") {
        if (index <= 0 && owner) move(owner);
        else move(entries[index - 1]);
      } else if (event.key === "Home") move(entries[0]);
      else if (event.key === "End") move(entries.at(-1));
      else if ((event.key === "ArrowRight" || event.key === "ArrowLeft") && owner) {
        const forward = event.key === (rtl ? "ArrowLeft" : "ArrowRight");
        const next = all[(all.indexOf(owner) + (forward ? 1 : -1) + all.length) % all.length];
        event.preventDefault();
        if (next.hasAttribute("aria-controls")) open(next, "keyboard");
        else closeAll();
        focusQuietly(next);
      }
    }
  });

  menu.addEventListener("focusout", (event) => {
    if (openTrigger && event.relatedTarget && !menu.contains(event.relatedTarget)) closeAll();
  });
  document.addEventListener("pointerdown", (event) => {
    if (openTrigger && !menu.contains(event.target)) closeAll();
  });
  window.addEventListener("resize", () => { if (openTrigger) shift(openTrigger, panelOf(openTrigger)); });
  new ResizeObserver(() => { if (indicator.hasAttribute("data-active")) unhighlight(); }).observe(list);
}

/* ------------------------------------------------------------------ details popdowns (breadcrumb, language menu) */
function wirePopdowns() {
  const openOnes = () => document.querySelectorAll("details[data-ds-popdown][open]");
  document.addEventListener("pointerdown", (event) => {
    openOnes().forEach((details) => { if (!details.contains(event.target)) details.open = false; });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    openOnes().forEach((details) => {
      const hadFocus = details.contains(document.activeElement);
      details.open = false;
      if (hadFocus) focusQuietly(details.querySelector("summary"));
    });
  });
  document.addEventListener("focusout", (event) => {
    const details = event.target.closest?.("details[data-ds-popdown][open]");
    if (details && event.relatedTarget && !details.contains(event.relatedTarget)) details.open = false;
  });
  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("details[data-ds-popdown] a[href]");
    if (link) link.closest("details").open = false;
  });
}

/* ------------------------------------------------------------------ language remember */
const LANG = /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/;

function wireLanguage() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("[data-ds-language-remember] a[hreflang]");
    if (!link) return;
    const box = link.closest("[data-ds-language-remember]");
    const language = link.getAttribute("hreflang") ?? "";
    if (!LANG.test(language)) return;
    if (box.dataset.dsLanguageRemember !== "storage") {
      const name = box.dataset.dsLanguageCookie || ".AspNetCore.Culture";
      const secure = location.protocol === "https:" ? "; secure" : "";
      document.cookie = `${name}=${encodeURIComponent(`c=${language}|uic=${language}`)}; path=/; max-age=31536000; samesite=lax${secure}`;
    }
    store.set(key("language"), language);
    emit(box, "language:change", { language });
  });
}

export function wire() {
  wirePopdowns();
  wireLanguage();
}

export function init(root = document) {
  scan(root, "[data-ds-navbar]").forEach(setupNavbar);
  scan(root, "[data-ds-nav-menu]").forEach(setupNavMenu);
}

export const api = {
  language: {
    /** Language of the page (two letters) and the one remembered on this device. */
    current: () => (html.lang || "en").slice(0, 2).toLowerCase(),
    remembered: () => store.get(key("language")),
  },
  navbar: {
    /** DS.navbar.close(bar): close the mobile menu of a navbar. */
    close(bar) {
      const el = typeof bar === "string" ? document.querySelector(bar) : bar;
      el?.querySelector("[data-ds-navbar-toggle][aria-expanded='true']")?.click();
    },
  },
};
