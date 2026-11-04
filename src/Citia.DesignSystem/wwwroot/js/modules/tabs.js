/* Tabs (ARIA tablist) and the sliding-indicator family: segmented control, bottom navigation, theme switcher.
   Owner: batch A10 navigation. Contract: docs/_contributing.md (wire() once per page, init(root) idempotent, optional api).
   Hooks: [data-ds-tabs] (+ data-ds-activation="manual", data-ds-tabs-hash), [data-ds-segmented], [data-ds-bottom-nav]
          (+ data-ds-hide-on-scroll). Events: ds:tabs:change, ds:segmented:change. */
import { t, addMessages, focusQuietly, reduceMotion, uid } from "../core.js";

addMessages({
  en: { "tabs.scrollStart": "Show earlier tabs", "tabs.scrollEnd": "Show later tabs" },
  id: { "tabs.scrollStart": "Tampilkan tab sebelumnya", "tabs.scrollEnd": "Tampilkan tab berikutnya" },
});

const isRtl = (el) => getComputedStyle(el).direction === "rtl";
const emit = (el, name, detail) => el.dispatchEvent(new CustomEvent(`ds:${name}`, { bubbles: true, detail }));
const isDisabled = (el) => el.disabled || el.getAttribute("aria-disabled") === "true";
const SELECTED = '[aria-selected="true"], [aria-pressed="true"], [aria-checked="true"], [aria-current]:not([aria-current="false"])';

function scan(root, selector) {
  const found = [...root.querySelectorAll(selector)];
  return root.matches?.(selector) ? [root, ...found] : found;
}

/** Nearest ancestor that scrolls vertically, or window. Bars react to the container their page really scrolls in. */
export function scrollContainer(el) {
  for (let node = el.parentElement; node; node = node.parentElement) {
    const overflow = getComputedStyle(node).overflowY;
    if ((overflow === "auto" || overflow === "scroll") && node.scrollHeight > node.clientHeight) return node;
  }
  return window;
}

export const scrollTopOf = (container) => (container === window ? window.scrollY : container.scrollTop);

/** "500ms" or ".5s" to milliseconds (the browser may serialise a token in either unit). */
function toMs(value, fallback) {
  const text = String(value).trim();
  const n = parseFloat(text);
  if (Number.isNaN(n)) return fallback;
  return text.endsWith("ms") ? n : text.endsWith("s") ? n * 1000 : n;
}

/** Spring from the motion tokens (read from the element so themes and overrides apply). */
function springOf(el) {
  const style = getComputedStyle(el);
  return {
    duration: toMs(style.getPropertyValue("--ds-duration-spring"), 500),
    easing: style.getPropertyValue("--ds-ease-spring").trim() || "ease-out",
  };
}

/** Where the indicator is on screen right now (position and size along the axis), read from its computed transform. */
function visualBox(indicator, horizontal) {
  const m = new DOMMatrixReadOnly(getComputedStyle(indicator).transform);
  const scale = horizontal ? m.a : m.d;
  return { pos: horizontal ? m.m41 : m.m42, size: (indicator._size || 0) * scale };
}

/**
 * Move an indicator (an absolutely positioned child of host) to cover target. Only transform and opacity animate:
 * the box takes the target's size at once and a transform travels from the old geometry (read from the screen, so an
 * interrupted move continues from where it is) to the new one; at rest the scale is exactly 1.
 * axis: "x" | "y". fill: also copy the cross-axis position and size (pill, boxed, thumb).
 */
export function placeIndicator(host, indicator, target, { axis = "x", fill = false, animate = true } = {}) {
  if (!target || (!target.offsetWidth && !target.offsetHeight)) {
    indicator.removeAttribute("data-placed");
    return;
  }
  const horizontal = axis === "x";
  const hostRect = host.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  const x = rect.left - hostRect.left - host.clientLeft + host.scrollLeft;
  const y = rect.top - hostRect.top - host.clientTop + host.scrollTop;
  const pos = horizontal ? x : y;
  const size = horizontal ? rect.width : rect.height;
  const move = (p, scale = 1) => (horizontal ? `translateX(${p}px) scaleX(${scale})` : `translateY(${p}px) scaleY(${scale})`);

  const wasPlaced = indicator.hasAttribute("data-placed") && indicator._size > 0;
  const from = animate && wasPlaced && !reduceMotion() ? visualBox(indicator, horizontal) : null;
  indicator.getAnimations().forEach((a) => a.cancel());

  indicator.style[horizontal ? "width" : "height"] = `${size}px`;
  if (fill) {
    if (horizontal) {
      indicator.style.top = `${y}px`;
      indicator.style.height = `${rect.height}px`;
    } else {
      indicator.style.left = `${x}px`;
      indicator.style.width = `${rect.width}px`;
    }
  }
  indicator.style.transform = move(pos);
  indicator._size = size;
  indicator.setAttribute("data-placed", "");

  if (from && (Math.abs(from.pos - pos) > 0.5 || Math.abs(from.size - size) > 0.5)) {
    indicator.animate([{ transform: move(from.pos, from.size / size) }, { transform: move(pos) }], springOf(indicator));
  }
}

/** Hide a fixed or sticky bar while the user scrolls down and bring it back on scroll up (never while it holds focus). */
export function hideOnScroll(bar, { isOpen = () => false } = {}) {
  if (bar._dsHide) return;
  bar._dsHide = true;
  const container = scrollContainer(bar);
  const target = container === window ? window : container;
  let last = scrollTopOf(container);
  let frame = 0;
  const update = () => {
    frame = 0;
    const y = Math.max(0, scrollTopOf(container));
    const delta = y - last;
    if (Math.abs(delta) < 8) return;
    const hide = delta > 0 && y > bar.offsetHeight * 1.5 && !bar.matches(":focus-within") && !isOpen();
    bar.toggleAttribute("data-hidden", hide);
    last = y;
  };
  target.addEventListener("scroll", () => { if (!frame) frame = requestAnimationFrame(update); }, { passive: true });
  bar.addEventListener("focusin", () => bar.removeAttribute("data-hidden"));
}

/* ------------------------------------------------------------------ tabs */
const controllers = new WeakMap();
const hashRoots = new Set();

function setupTabs(root) {
  if (controllers.has(root)) return;
  const legacy = !root.querySelector(".ds-tabs__list");
  const list = legacy ? root : root.querySelector(".ds-tabs__list");
  const aria = list.getAttribute("role") === "tablist";
  const vertical = root.classList.contains("is-vertical") || list.getAttribute("aria-orientation") === "vertical";
  const manual = root.dataset.dsActivation === "manual";
  const fill = ["is-pill", "tabs-pill", "is-boxed", "tabs-box"].some((c) => root.classList.contains(c)) || legacy;
  const tabsOf = () => [...list.querySelectorAll(".ds-tabs__tab, :scope > :is(a, button)")];
  const panels = [...root.querySelectorAll(":scope > .ds-tabs__panel")];

  const indicator = document.createElement("span");
  indicator.className = "ds-tabs__indicator";
  indicator.setAttribute("aria-hidden", "true");
  list.append(indicator);

  if (aria) {
    if (vertical) list.setAttribute("aria-orientation", "vertical");
    tabsOf().forEach((tab, index) => {
      tab.id ||= uid("tab");
      if (!tab.hasAttribute("type") && tab.tagName === "BUTTON") tab.type = "button";
      const panel = document.getElementById(tab.getAttribute("aria-controls") ?? "") ?? panels[index];
      if (!panel) return;
      panel.id ||= uid("panel");
      tab.setAttribute("aria-controls", panel.id);
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      if (!panel.hasAttribute("tabindex")) panel.tabIndex = 0;
    });
  }

  const panelOf = (tab) => (tab.getAttribute("aria-controls") ? document.getElementById(tab.getAttribute("aria-controls")) : null);
  const current = () => tabsOf().find((tab) => tab.matches(SELECTED)) ?? null;

  const place = (animate) => {
    const tab = current();
    placeIndicator(list, indicator, tab, { axis: vertical ? "y" : "x", fill, animate });
  };

  const updateOverflow = () => {
    if (legacy || vertical) return;
    const max = list.scrollWidth - list.clientWidth;
    const pos = Math.abs(list.scrollLeft);
    root.toggleAttribute("data-overflow-start", max > 1 && pos > 1);
    root.toggleAttribute("data-overflow-end", max > 1 && pos < max - 1);
  };

  const reveal = (tab) => {
    if (legacy || vertical) return;
    const l = list.getBoundingClientRect();
    const r = tab.getBoundingClientRect();
    const pad = 40;
    const behavior = reduceMotion() ? "auto" : "smooth";
    if (r.left < l.left + pad) list.scrollBy({ left: r.left - l.left - pad, behavior });
    else if (r.right > l.right - pad) list.scrollBy({ left: r.right - l.right + pad, behavior });
  };

  const setRoving = (focusable) => tabsOf().forEach((tab) => tab.setAttribute("tabindex", tab === focusable ? "0" : "-1"));

  function select(tab, { user = true, animate = true, focus = false } = {}) {
    if (!tab || isDisabled(tab)) return;
    const previous = current();
    const changed = previous !== tab;
    tabsOf().forEach((item) => {
      const on = item === tab;
      if (aria) item.setAttribute("aria-selected", String(on));
      const panel = panelOf(item);
      if (panel) panel.hidden = !on;
    });
    if (aria) setRoving(tab);
    place(animate && user);
    reveal(tab);
    if (focus) focusQuietly(tab);
    if (!changed) return;
    const panel = panelOf(tab);
    if (user && root.hasAttribute("data-ds-tabs-hash")) {
      const slug = tab.dataset.dsTab || panel?.id || tab.id;
      history.replaceState(null, "", `#${encodeURIComponent(slug)}`);
    }
    emit(root, "tabs:change", { tab, panel, index: tabsOf().indexOf(tab), previous });
  }

  function fromHash() {
    const hash = decodeURIComponent(location.hash.slice(1));
    if (!hash) return;
    const match = tabsOf().find((tab) => tab.dataset.dsTab === hash || tab.id === hash || tab.getAttribute("aria-controls") === hash);
    if (match) select(match, { user: false });
  }

  if (aria) {
    list.addEventListener("click", (event) => {
      const tab = event.target.closest?.(".ds-tabs__tab");
      if (!tab || !list.contains(tab)) return;
      if (isDisabled(tab)) return event.preventDefault();
      select(tab);
    });

    list.addEventListener("keydown", (event) => {
      const tab = event.target.closest?.(".ds-tabs__tab");
      if (!tab || event.altKey || event.ctrlKey || event.metaKey) return;
      const enabled = tabsOf().filter((item) => !isDisabled(item));
      const index = enabled.indexOf(tab);
      if (index < 0) return;
      const rtl = isRtl(list);
      const back = vertical ? "ArrowUp" : rtl ? "ArrowRight" : "ArrowLeft";
      const forward = vertical ? "ArrowDown" : rtl ? "ArrowLeft" : "ArrowRight";
      let next = null;
      if (event.key === forward) next = enabled[(index + 1) % enabled.length];
      else if (event.key === back) next = enabled[(index - 1 + enabled.length) % enabled.length];
      else if (event.key === "Home") next = enabled[0];
      else if (event.key === "End") next = enabled.at(-1);
      if (!next) return;
      event.preventDefault();
      setRoving(next);
      focusQuietly(next);
      reveal(next);
      if (!manual) select(next);
    });

    // Manual activation: focus can rest on an unselected tab; leaving the list returns the tab stop to the selected one.
    list.addEventListener("focusout", (event) => {
      if (!list.contains(event.relatedTarget)) setRoving(current());
    });
  }

  if (!legacy) {
    for (const side of ["start", "end"]) {
      // A span, not a button: a pointer aid that stays out of the tab order and the accessibility tree.
      const button = document.createElement("span");
      button.className = `ds-tabs__scroll is-${side}`;
      button.setAttribute("aria-hidden", "true");
      button.title = t(`tabs.scroll${side === "start" ? "Start" : "End"}`);
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ds-icon" aria-hidden="true" focusable="false"><path d="${side === "start" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"}"/></svg>`;
      button.addEventListener("click", () => {
        const sign = (side === "start" ? -1 : 1) * (isRtl(list) ? -1 : 1);
        list.scrollBy({ left: sign * list.clientWidth * 0.6, behavior: reduceMotion() ? "auto" : "smooth" });
      });
      root.append(button);
    }
    list.addEventListener("scroll", updateOverflow, { passive: true });
  }

  const observer = new ResizeObserver(() => { place(false); updateOverflow(); });
  observer.observe(list);
  tabsOf().forEach((tab) => observer.observe(tab));
  new MutationObserver(() => place(true)).observe(list, { attributes: true, subtree: true, attributeFilter: ["aria-current"] });

  const controller = { select, tabs: tabsOf, current, refresh: () => { place(false); updateOverflow(); } };
  controllers.set(root, controller);

  if (aria) {
    const initial = current() ?? tabsOf().find((tab) => !isDisabled(tab));
    tabsOf().forEach((tab) => { const panel = panelOf(tab); if (panel) panel.hidden = tab !== initial; });
    if (initial) { initial.setAttribute("aria-selected", "true"); setRoving(initial); }
  }
  list.setAttribute("data-ds-ready", "");
  root.setAttribute("data-ds-ready", "");
  place(false);
  updateOverflow();
  if (root.hasAttribute("data-ds-tabs-hash")) {
    hashRoots.add(root);
    fromHash();
    controller.fromHash = fromHash;
  }
}

/* ------------------------------------------------------------------ segmented control and theme switcher */
function setupSegmented(root) {
  if (controllers.has(root) || root.dataset.dsSegmented === "off") return;
  const thumb = document.createElement("span");
  thumb.className = "ds-segmented__thumb";
  thumb.setAttribute("aria-hidden", "true");
  root.prepend(thumb);

  const items = () => [...root.children].filter((el) => el !== thumb && el.matches("a, button, label"));
  const selected = () => items().find((el) => el.matches(SELECTED) || el.querySelector?.("input:checked")) ?? null;
  const place = (animate) => placeIndicator(root, thumb, selected(), { fill: true, animate });

  root.addEventListener("change", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== "radio") return;
    place(true);
    emit(root, "segmented:change", { value: input.value, item: input.closest("label") });
  });

  root.addEventListener("click", (event) => {
    const button = event.target.closest?.("button");
    if (!button || button.parentElement !== root || isDisabled(button) || !button.hasAttribute("aria-pressed")) return;
    // Theme buttons update their own pressed state; plain buttons behave as one single-choice group.
    if (button.matches("[data-ds-theme-set], [data-ds-theme-toggle]")) return;
    if (button.getAttribute("aria-pressed") === "true") return;
    items().forEach((item) => item.hasAttribute("aria-pressed") && item.setAttribute("aria-pressed", String(item === button)));
    emit(root, "segmented:change", { value: button.value || button.getAttribute("aria-label") || button.textContent.trim(), item: button });
  });

  new MutationObserver(() => place(true)).observe(root, { attributes: true, subtree: true, attributeFilter: ["aria-pressed", "aria-current", "aria-checked", "aria-selected"] });
  new ResizeObserver(() => place(false)).observe(root);
  controllers.set(root, { refresh: () => place(false) });
  root.setAttribute("data-ds-ready", "");
  place(false);
}

/* ------------------------------------------------------------------ bottom navigation */
function setupBottomNav(nav) {
  if (controllers.has(nav)) return;
  const indicator = document.createElement("span");
  indicator.className = "ds-bottom-nav__indicator";
  indicator.setAttribute("aria-hidden", "true");
  nav.prepend(indicator);

  const items = () => [...nav.querySelectorAll(".ds-bottom-nav__item")];
  const current = () => items().find((item) => item.matches('[aria-current]:not([aria-current="false"])')) ?? null;
  const place = (animate) => {
    const item = current();
    placeIndicator(nav, indicator, item?.querySelector(".ds-bottom-nav__icon") ?? null, { fill: true, animate });
  };

  nav.addEventListener("click", (event) => {
    const item = event.target.closest?.("button.ds-bottom-nav__item");
    if (!item || isDisabled(item) || item.getAttribute("aria-current") === "page") return;
    items().forEach((other) => other.removeAttribute("aria-current"));
    item.setAttribute("aria-current", "page");
    emit(nav, "bottomnav:change", { item });
  });

  new MutationObserver(() => place(true)).observe(nav, { attributes: true, subtree: true, attributeFilter: ["aria-current"] });
  new ResizeObserver(() => place(false)).observe(nav);
  controllers.set(nav, { refresh: () => place(false) });
  nav.setAttribute("data-ds-ready", "");
  place(false);
  if (nav.hasAttribute("data-ds-hide-on-scroll")) hideOnScroll(nav);
}

export function wire() {
  window.addEventListener("hashchange", () => {
    for (const root of hashRoots) {
      if (!root.isConnected) hashRoots.delete(root);
      else controllers.get(root)?.fromHash?.();
    }
  });
}

export function init(root = document) {
  scan(root, "[data-ds-tabs]").forEach(setupTabs);
  scan(root, "[data-ds-segmented]").forEach(setupSegmented);
  scan(root, "[data-ds-bottom-nav]").forEach(setupBottomNav);
}

function resolve(target) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  return el ? { el, controller: controllers.get(el) } : { el: null, controller: null };
}

export const api = {
  tabs: {
    /** DS.tabs.select(root, index | tab id | tab element) */
    select(target, which) {
      const { controller } = resolve(target);
      if (!controller?.tabs) return;
      const tabs = controller.tabs();
      const tab = typeof which === "number" ? tabs[which] : typeof which === "string" ? tabs.find((item) => item.id === which || item.dataset.dsTab === which) : which;
      controller.select(tab);
    },
    refresh(target) {
      resolve(target).controller?.refresh?.();
    },
  },
};
