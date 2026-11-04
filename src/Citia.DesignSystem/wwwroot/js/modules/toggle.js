/* Actions: toggle button (aria-pressed), toggle group (single / multiple, roving focus), button busy and success states,
   click guard for aria-disabled / busy controls, FAB hide on scroll, split-button menu.
   Owner: batch A1 actions. Contract: docs/_contributing.md (wire() once per page, init(root) idempotent, optional api).

   Hooks
     button[data-ds-toggle]                         toggle button; flips aria-pressed, fires ds:toggle:change {pressed}
     [data-ds-toggle-group="single|multiple"]       group of .ds-toggle items (+ data-ds-name, data-ds-deselectable, data-ds-roving="false")
     .ds-toggle [data-value]                        item value (falls back to the item text)
     .ds-fab[data-ds-fab-hide]                      hides while scrolling down, shows when scrolling up
     details.ds-split-button__menu                         split-button menu: Escape, outside press, arrow keys
     form[data-ds-once] button[type=submit]         the pressed submit button shows the busy state after 300 ms (see forms.js)
   Events: ds:toggle:change (bubbles), ds:button:loading, ds:button:success
   API:    DS.button.loading(el, on, { label, delay }), DS.button.success(el, { label, duration }),
           DS.toggle.set(el, pressed), DS.toggle.group.get(group), DS.toggle.group.set(group, value | values) */
import { t, addMessages, focusQuietly, rovingKeydown } from "../core.js";

addMessages({
  en: {
    "button.loading": "Loading…",
    "button.done": "Done",
  },
  id: {
    "button.loading": "Memuat…",
    "button.done": "Selesai",
  },
});

const CONTROL = ".btn, .ds-icon-button, .ds-icon-btn, .ds-toggle, .ds-fab, .ds-chrome-btn, .ds-split-button__item";
const BLOCKED = '[aria-disabled="true"], .btn-disabled, [aria-busy="true"], [data-ds-pending]';
const SUCCESS_MS = 1800;
const BUSY_DELAY_MS = 300;

const isDisabled = (el) => el.disabled || el.getAttribute("aria-disabled") === "true";
const isRtl = (el) => getComputedStyle(el).direction === "rtl";

/* ------------------------------------------------------------------ live region */
let live = null;
function announce(text) {
  if (!text) return;
  if (!live) {
    live = document.createElement("div");
    live.className = "ds-visually-hidden";
    live.setAttribute("role", "status");
    live.setAttribute("aria-live", "polite");
    document.body.append(live);
  }
  live.textContent = "";
  window.setTimeout(() => { live.textContent = text; }, 30);
}

/* ------------------------------------------------------------------ busy and success */
/** Label element of a button: .ds-btn__label, or the last non-empty text node (icons stay). */
function labelNode(button) {
  const part = button.querySelector(".ds-btn__label");
  if (part) return part;
  return [...button.childNodes].reverse().find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
}

function swapLabel(button, text) {
  const node = labelNode(button);
  if (node) {
    if (button._dsLabel === undefined) button._dsLabel = node.textContent;
    node.textContent = node.nodeType === Node.TEXT_NODE ? ` ${text}` : text;
    return;
  }
  // Icon-only button: the accessible name changes.
  if (button._dsAria === undefined) button._dsAria = button.getAttribute("aria-label");
  button.setAttribute("aria-label", text);
}

function restoreLabel(button) {
  const node = labelNode(button);
  if (button._dsLabel !== undefined && node) node.textContent = button._dsLabel;
  button._dsLabel = undefined;
  if (button._dsAria !== undefined) {
    button._dsAria === null ? button.removeAttribute("aria-label") : button.setAttribute("aria-label", button._dsAria);
    button._dsAria = undefined;
  }
}

/** Busy state. Input is blocked at once (data-ds-pending); the spinner and aria-busy follow after `delay` ms, so fast actions never flash. */
function loading(button, on = true, { label, delay = BUSY_DELAY_MS } = {}) {
  if (!(button instanceof HTMLElement)) return;
  window.clearTimeout(button._dsBusyTimer);
  if (!on) {
    button.removeAttribute("data-ds-pending");
    button.removeAttribute("aria-busy");
    button.removeAttribute("data-ds-busy-source");
    button.style.minWidth = "";
    restoreLabel(button);
    button.dispatchEvent(new CustomEvent("ds:button:loading", { bubbles: true, detail: { loading: false } }));
    return;
  }
  if (button.hasAttribute("data-ds-pending")) return;
  window.clearTimeout(button._dsSuccessTimer);
  button.classList.remove("is-success");
  // Pin the width first, so the swap of icon, spinner and label cannot move neighbours.
  button.style.minWidth = `${Math.ceil(button.getBoundingClientRect().width)}px`;
  button.setAttribute("data-ds-pending", "");
  if (label) swapLabel(button, label);
  button._dsBusyTimer = window.setTimeout(() => {
    if (!button.hasAttribute("data-ds-pending")) return;
    button.setAttribute("aria-busy", "true");
    announce(label || labelNode(button)?.textContent?.trim() || t("button.loading"));
  }, delay);
  button.dispatchEvent(new CustomEvent("ds:button:loading", { bubbles: true, detail: { loading: true } }));
}

/** Transient success flash: glyph and tonal fill for 1.6–2 s, then back to rest. */
function success(button, { label, duration = SUCCESS_MS } = {}) {
  if (!(button instanceof HTMLElement)) return;
  loading(button, false);
  window.clearTimeout(button._dsSuccessTimer);
  button.classList.add("is-success");
  if (label) swapLabel(button, label);
  announce(label || t("button.done"));
  button.dispatchEvent(new CustomEvent("ds:button:success", { bubbles: true }));
  button._dsSuccessTimer = window.setTimeout(() => {
    button.classList.remove("is-success");
    restoreLabel(button);
  }, Math.min(2000, Math.max(1600, duration)));
}

/* ------------------------------------------------------------------ toggle button */
function setPressed(el, pressed) {
  if (el.getAttribute("role") === "radio" || el.hasAttribute("aria-checked")) el.setAttribute("aria-checked", String(pressed));
  else el.setAttribute("aria-pressed", String(pressed));
}

const isOn = (el) => el.getAttribute("aria-pressed") === "true" || el.getAttribute("aria-checked") === "true" || el.classList.contains("is-selected") || el.getAttribute("data-state") === "on";

function toggleButton(button, pressed = !isOn(button)) {
  if (isDisabled(button)) return;
  button.setAttribute("aria-pressed", String(pressed));
  button.dispatchEvent(new CustomEvent("ds:toggle:change", { bubbles: true, detail: { pressed } }));
}

/* ------------------------------------------------------------------ toggle group */
const ITEMS = ".ds-toggle, [data-ds-toggle-item]";
const itemsOf = (group) => [...group.querySelectorAll(ITEMS)].filter((el) => el.closest("[data-ds-toggle-group]") === group);
const modeOf = (group) => (group.getAttribute("data-ds-toggle-group") === "multiple" ? "multiple" : "single");
const radioMode = (group) => modeOf(group) === "single" && !group.hasAttribute("data-ds-deselectable");
const rovingOn = (group) => group.getAttribute("data-ds-roving") !== "false";
const valueOf = (item) => item.dataset.value ?? item.getAttribute("value") ?? item.textContent.trim();
const selectedOf = (group) => itemsOf(group).filter(isOn);

function syncTabindex(group, focused) {
  if (!rovingOn(group)) return;
  const items = itemsOf(group);
  const enabled = items.filter((el) => !isDisabled(el));
  const stop = (focused && enabled.includes(focused) ? focused : null) ?? (radioMode(group) ? selectedOf(group).find((el) => !isDisabled(el)) : null) ?? enabled[0];
  items.forEach((el) => el.setAttribute("tabindex", el === stop ? "0" : "-1"));
}

function syncInputs(group) {
  const name = group.dataset.dsName;
  if (!name) return;
  // Inputs rendered by the server (tag helper) directly after the group are replaced, not duplicated.
  while (group.nextElementSibling?.matches("input[data-ds-toggle-input]")) group.nextElementSibling.remove();
  (group._dsInputs ?? []).forEach((input) => input.remove());
  group._dsInputs = selectedOf(group).map((item) => {
    const input = Object.assign(document.createElement("input"), { type: "hidden", name, value: valueOf(item) });
    input.setAttribute("data-ds-toggle-input", "");
    return input;
  });
  group.after(...group._dsInputs);
}

function describe(group) {
  const values = selectedOf(group).map(valueOf);
  return { value: values[0] ?? null, values };
}

function setupGroup(group) {
  if (group.hasAttribute("data-ds-ready")) return;
  group.setAttribute("data-ds-ready", "");
  const mode = modeOf(group);
  const radio = radioMode(group);
  const roving = rovingOn(group);
  if (!group.hasAttribute("role")) group.setAttribute("role", radio ? "radiogroup" : roving && mode === "multiple" ? "toolbar" : "group");
  const items = itemsOf(group);
  let seen = false;
  items.forEach((item) => {
    const on = isOn(item) && (mode === "multiple" || !seen);
    seen ||= on;
    if (radio) {
      item.setAttribute("role", "radio");
      item.removeAttribute("aria-pressed");
      item.setAttribute("aria-checked", String(on));
    } else {
      item.setAttribute("aria-pressed", String(on));
    }
    if (item.tagName !== "BUTTON" && !item.hasAttribute("tabindex")) item.setAttribute("tabindex", "0");
    if (item.tagName === "BUTTON" && !item.hasAttribute("type")) item.setAttribute("type", "button");
  });
  if (!group.hasAttribute("aria-orientation") && group.classList.contains("is-vertical")) group.setAttribute("aria-orientation", "vertical");
  syncTabindex(group);
  syncInputs(group);
}

function pick(group, item) {
  if (isDisabled(item)) return;
  const mode = modeOf(group);
  const items = itemsOf(group);
  if (radioMode(group)) {
    if (isOn(item)) { syncTabindex(group, item); return; }
    items.forEach((el) => setPressed(el, el === item));
  } else if (mode === "single") {
    const next = !isOn(item);
    items.forEach((el) => setPressed(el, el === item ? next : false));
  } else {
    setPressed(item, !isOn(item));
  }
  syncTabindex(group, item);
  syncInputs(group);
  group.dispatchEvent(new CustomEvent("ds:toggle:change", { bubbles: true, detail: { ...describe(group), item } }));
}

function setGroupValue(group, input) {
  const wanted = new Set((Array.isArray(input) ? input : input == null ? [] : [input]).map(String));
  const items = itemsOf(group);
  const mode = modeOf(group);
  let used = false;
  items.forEach((item) => {
    const on = wanted.has(valueOf(item)) && (mode === "multiple" || !used);
    used ||= on;
    setPressed(item, on);
  });
  syncTabindex(group);
  syncInputs(group);
  group.dispatchEvent(new CustomEvent("ds:toggle:change", { bubbles: true, detail: describe(group) }));
}

/* ------------------------------------------------------------------ FAB hide on scroll */
const lastScroll = new WeakMap();
let scrollFrame = 0;
function onScroll(event) {
  const target = event.target === document ? document.scrollingElement : event.target;
  if (!(target instanceof Element)) return;
  const top = target.scrollTop;
  const previous = lastScroll.get(target) ?? top;
  lastScroll.set(target, top);
  const delta = top - previous;
  if (Math.abs(delta) < 6 || scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    const hide = delta > 0 && top > 80;
    document.querySelectorAll(".ds-fab[data-ds-fab-hide]").forEach((fab) => {
      if (hide) fab.setAttribute("data-ds-hidden", "true");
      else fab.removeAttribute("data-ds-hidden");
    });
  });
}

/* ------------------------------------------------------------------ split button menu */
const menuItems = (menu) => [...menu.querySelectorAll(".ds-split-button__item")].filter((el) => !isDisabled(el));

function closeMenu(menu, returnFocus = true) {
  if (!menu.open) return;
  menu.open = false;
  if (returnFocus) focusQuietly(menu.querySelector(":scope > summary"));
}

function setupMenu(menu) {
  if (menu.hasAttribute("data-ds-ready")) return;
  menu.setAttribute("data-ds-ready", "");
  const summary = menu.querySelector(":scope > summary");
  summary?.setAttribute("aria-haspopup", "menu");
  const panel = menu.querySelector(".ds-split-button__panel");
  if (panel && !panel.hasAttribute("role")) panel.setAttribute("role", "menu");
  menu.querySelectorAll(".ds-split-button__item").forEach((item) => {
    if (!item.hasAttribute("role")) item.setAttribute("role", "menuitem");
    item.setAttribute("tabindex", "-1");
  });
}

/* ------------------------------------------------------------------ wiring */
export function wire() {
  // Blocked controls: aria-disabled and busy stay focusable, but they never act.
  document.addEventListener("click", (event) => {
    const control = event.target instanceof Element ? event.target.closest(CONTROL) : null;
    if (control?.matches(BLOCKED)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const item = target.closest(ITEMS);
    const group = item?.closest("[data-ds-toggle-group]");
    if (item && group && itemsOf(group).includes(item)) { pick(group, item); return; }

    const toggle = target.closest("[data-ds-toggle]");
    if (toggle) { toggleButton(toggle); return; }

    const splitItem = target.closest(".ds-split-button__item");
    if (splitItem && !splitItem.matches(BLOCKED) && !splitItem.hasAttribute("data-ds-keep-open")) {
      const menu = splitItem.closest("details.ds-split-button__menu");
      if (menu) closeMenu(menu);
      return;
    }

    // Keyboard activation of the split trigger puts focus on the first item (menu button pattern).
    const summary = target.closest("details.ds-split-button__menu > summary");
    if (summary && event.detail === 0) {
      const menu = summary.parentElement;
      requestAnimationFrame(() => { if (menu.open) focusQuietly(menuItems(menu)[0]); });
    }
  });

  document.addEventListener("keydown", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const group = target.closest("[data-ds-toggle-group]");
    if (group && rovingOn(group) && target.closest(ITEMS)) {
      const vertical = group.getAttribute("aria-orientation") === "vertical";
      const orientation = radioMode(group) ? "both" : vertical ? "vertical" : "horizontal";
      let proxy = event;
      if (!vertical && isRtl(group) && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        proxy = { key: event.key === "ArrowLeft" ? "ArrowRight" : "ArrowLeft", preventDefault: () => event.preventDefault() };
      }
      if (rovingKeydown(proxy, itemsOf(group), { orientation }) && radioMode(group)) pick(group, document.activeElement);
      return;
    }

    const menu = target.closest("details.ds-split-button__menu");
    if (!menu) return;
    const summary = menu.querySelector(":scope > summary");
    if (event.key === "Escape" && menu.open) {
      event.preventDefault();
      event.stopPropagation();
      closeMenu(menu);
      return;
    }
    if (target === summary && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      event.preventDefault();
      menu.open = true;
      requestAnimationFrame(() => {
        const items = menuItems(menu);
        focusQuietly(event.key === "ArrowUp" ? items.at(-1) : items[0]);
      });
      return;
    }
    if (menu.open && target.closest(".ds-split-button__item")) {
      rovingKeydown(event, menuItems(menu), { orientation: "vertical" });
    }
  });

  // The roving stop follows focus, so Tab returns to the item that was used last.
  document.addEventListener("focusin", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const group = target?.closest("[data-ds-toggle-group]");
    if (group && target.closest(ITEMS) && rovingOn(group) && !radioMode(group)) syncTabindex(group, target.closest(ITEMS));
    // Tab out of an open split menu closes it.
    document.querySelectorAll("details.ds-split-button__menu[open]").forEach((menu) => { if (!menu.contains(target)) closeMenu(menu, false); });
  });

  document.addEventListener("pointerdown", (event) => {
    document.querySelectorAll("details.ds-split-button__menu[open]").forEach((menu) => {
      if (!menu.contains(event.target)) menu.open = false;
    });
  });

  // Submit once: the pressed button shows the busy state (forms.js already locks the form and swaps the label).
  document.addEventListener("submit", (event) => {
    const form = event.target;
    const submitter = event.submitter;
    if (!(form instanceof HTMLFormElement) || !form.matches("[data-ds-once]") || !submitter?.matches(CONTROL)) return;
    queueMicrotask(() => {
      if (event.defaultPrevented) return;
      loading(submitter, true);
      submitter.setAttribute("data-ds-busy-source", "form");
    });
  });

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    document.querySelectorAll('[data-ds-busy-source="form"]').forEach((button) => loading(button, false));
  });

  document.addEventListener("scroll", onScroll, { capture: true, passive: true });
}

export function init(root = document) {
  root.querySelectorAll("[data-ds-toggle-group]").forEach(setupGroup);
  root.querySelectorAll("button[data-ds-toggle]:not([aria-pressed])").forEach((button) => {
    button.setAttribute("aria-pressed", String(isOn(button)));
    if (!button.hasAttribute("type")) button.setAttribute("type", "button");
  });
  root.querySelectorAll("details.ds-split-button__menu").forEach(setupMenu);
}

export const api = {
  button: { loading, success },
  toggle: {
    set: toggleButton,
    group: { get: (group) => describe(group), set: setGroupValue },
  },
};
