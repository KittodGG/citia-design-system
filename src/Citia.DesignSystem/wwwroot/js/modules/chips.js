/* Chips, badges and avatars: filter chip toggle (aria-pressed), input chip removal (Backspace/Delete), chip set with roving focus
   and "+N more" overflow, live badge counts, avatar image fallback.
   Owner: batch A5 data-display-1. Contract: docs/_contributing.md (wire() once per page, init(root) idempotent, optional api).

   Hooks:
     [data-ds-chips]                      chip set; value "single" makes pressed chips exclusive; roving focus with arrow keys, Home, End
     [data-ds-chips-max="5"]              collapse chips beyond 5 behind a "+N more" chip
     [data-ds-chip-toggle]                filter chip (button): click flips aria-pressed
     .ds-chip.is-input                    Backspace/Delete removes; [data-ds-chip-remove] button removes
     [data-ds-badge][data-count]          count badge; [data-ds-badge-max="99"], [data-ds-badge-label="unread"], [data-ds-badge-live], [data-ds-badge-zero="show"]
     .ds-avatar > img.ds-avatar__img      a failed image is hidden so the initials show
   Events (bubble): ds:chip:toggle {pressed}, ds:chip:remove (cancelable) {label}, ds:chips:expand. API: DS.badge.set(el, count), DS.chips.remove(chip). */
import { t, addMessages, focusQuietly, reduceMotion } from "../core.js";

addMessages({
  en: {
    "chip.remove": "Remove {label}",
    "chip.removed": "{label} removed",
    "chip.more": "{count} more",
    "chip.moreLabel": "Show {count} more",
    "chip.less": "Show fewer",
    "badge.count": "{count} items",
    "badge.one": "1 item",
    "badge.overflow": "More than {max} items",
  },
  id: {
    "chip.remove": "Hapus {label}",
    "chip.removed": "{label} dihapus",
    "chip.more": "{count} lagi",
    "chip.moreLabel": "Tampilkan {count} lagi",
    "chip.less": "Tampilkan lebih sedikit",
    "badge.count": "{count} item",
    "badge.one": "1 item",
    "badge.overflow": "Lebih dari {max} item",
  },
});

const ready = new WeakSet();
let announcer = null;

const chipItems = (set) => [...set.querySelectorAll(".ds-chip")].filter((c) => !c.hidden && !c.closest("[hidden]") && !c.disabled && c.getAttribute("aria-disabled") !== "true");
const labelOf = (chip) => (chip.querySelector(".ds-chip__label")?.textContent ?? chip.textContent).trim();

function announce(message) {
  if (!announcer) {
    announcer = document.createElement("div");
    announcer.className = "ds-visually-hidden";
    announcer.setAttribute("role", "status");
    announcer.setAttribute("aria-live", "polite");
    document.body.append(announcer);
  }
  announcer.textContent = "";
  setTimeout(() => { announcer.textContent = message; }, 30);
}

/* ------------------------------------------------------------------ chips */
function syncRoving(set) {
  const items = chipItems(set);
  if (!items.length) return;
  const current = items.find((c) => c.getAttribute("tabindex") === "0" && c !== set.querySelector("[data-ds-chips-more]")) ?? items.find((c) => c.matches('[aria-pressed="true"]')) ?? items[0];
  set.querySelectorAll(".ds-chip").forEach((c) => c.setAttribute("tabindex", c === current ? "0" : "-1"));
}

function collapse(set) {
  const max = Number(set.dataset.dsChipsMax);
  if (!max) return;
  const chips = [...set.querySelectorAll(":scope > .ds-chip:not([data-ds-chips-more])")];
  const extra = chips.slice(max);
  if (!extra.length) { set.querySelector("[data-ds-chips-more]")?.remove(); return; }
  let more = set.querySelector("[data-ds-chips-more]");
  if (!more) {
    more = document.createElement("button");
    more.type = "button";
    more.className = "ds-chip is-more";
    more.dataset.dsChipsMore = "";
    more.setAttribute("aria-expanded", "false");
    set.append(more);
  }
  const expanded = more.getAttribute("aria-expanded") === "true";
  extra.forEach((c) => { c.hidden = !expanded; });
  more.textContent = expanded ? t("chip.less") : t("chip.more", { count: extra.length });
  more.setAttribute("aria-label", expanded ? t("chip.less") : t("chip.moreLabel", { count: extra.length }));
  more.hidden = false;
}

export function remove(chip) {
  const set = chip.closest("[data-ds-chips]");
  const label = labelOf(chip);
  const event = new CustomEvent("ds:chip:remove", { bubbles: true, cancelable: true, detail: { label, chip } });
  if (!chip.dispatchEvent(event)) return false;
  const items = set ? chipItems(set) : [];
  const index = items.indexOf(chip);
  const next = items[index + 1] ?? items[index - 1];
  chip.remove();
  if (set) {
    collapse(set);
    if (next) { syncRoving(set); set.querySelectorAll(".ds-chip").forEach((c) => c.setAttribute("tabindex", c === next ? "0" : "-1")); focusQuietly(next); }
  }
  announce(t("chip.removed", { label }));
  return true;
}

function initChipSet(set) {
  if (ready.has(set)) return;
  ready.add(set);
  set.querySelectorAll(".ds-chip__remove").forEach((btn) => {
    const chip = btn.closest(".ds-chip");
    btn.setAttribute("data-ds-chip-remove", "");
    btn.tabIndex = -1;
    if (!btn.hasAttribute("aria-label")) btn.setAttribute("aria-label", t("chip.remove", { label: chip ? labelOf(chip) : "" }));
  });
  collapse(set);
  syncRoving(set);
}

/* ------------------------------------------------------------------ badges */
export function setBadge(el, count) {
  const max = Number(el.dataset.dsBadgeMax) || 99;
  const n = Math.max(0, Math.floor(Number(count) || 0));
  const previous = el.dataset.count;
  el.dataset.count = String(n);
  const shown = n > max ? `${max}+` : String(n);
  const hide = n === 0 && el.dataset.dsBadgeZero !== "show";
  const sr = el.dataset.dsBadgeLabel ? `${n} ${el.dataset.dsBadgeLabel}` : n > max ? t("badge.overflow", { max }) : n === 1 ? t("badge.one") : t("badge.count", { count: n });
  if (!el.classList.contains("is-dot")) {
    let visual = el.querySelector(":scope > [data-ds-badge-text]");
    let hidden = el.querySelector(":scope > .ds-visually-hidden");
    if (!visual) {
      el.textContent = "";
      visual = document.createElement("span");
      visual.dataset.dsBadgeText = "";
      visual.setAttribute("aria-hidden", "true");
      hidden = document.createElement("span");
      hidden.className = "ds-visually-hidden";
      if ("dsBadgeLive" in el.dataset) { hidden.setAttribute("role", "status"); hidden.setAttribute("aria-live", "polite"); }
      el.append(visual, hidden);
    }
    visual.textContent = shown;
    hidden.textContent = sr;
  }
  el.hidden = hide;
  if (previous !== undefined && previous !== String(n) && !hide && !reduceMotion()) {
    el.classList.remove("is-updated");
    void el.offsetWidth;
    el.classList.add("is-updated");
  }
}

function initBadge(el) {
  if (ready.has(el)) return;
  ready.add(el);
  const initial = el.dataset.count ?? el.textContent;
  delete el.dataset.count;
  setBadge(el, initial);
  el.addEventListener("animationend", () => el.classList.remove("is-updated"));
}

/* ------------------------------------------------------------------ avatars */
function initAvatar(img) {
  if (ready.has(img)) return;
  ready.add(img);
  const fail = () => { img.closest(".ds-avatar")?.setAttribute("data-state", "failed"); };
  img.addEventListener("error", fail);
  if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fail();
}

/* ------------------------------------------------------------------ wiring */
export function wire() {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const removeBtn = target.closest("[data-ds-chip-remove]");
    if (removeBtn) {
      const chip = removeBtn.closest(".ds-chip");
      if (chip && !chip.hasAttribute("aria-disabled") && !removeBtn.disabled && !(removeBtn.type === "submit" && removeBtn.form && !chip.closest("[data-ds-chips]"))) {
        event.preventDefault();
        remove(chip);
      }
      return;
    }
    const more = target.closest("[data-ds-chips-more]");
    if (more) {
      const set = more.closest("[data-ds-chips]");
      more.setAttribute("aria-expanded", String(more.getAttribute("aria-expanded") !== "true"));
      collapse(set);
      syncRoving(set);
      more.dispatchEvent(new CustomEvent("ds:chips:expand", { bubbles: true, detail: { expanded: more.getAttribute("aria-expanded") === "true" } }));
      return;
    }
    const chip = target.closest("[data-ds-chip-toggle]");
    if (chip && !chip.disabled && chip.getAttribute("aria-disabled") !== "true") {
      const set = chip.closest("[data-ds-chips]");
      const pressed = chip.getAttribute("aria-pressed") !== "true";
      if (set?.dataset.dsChips === "single" && pressed) set.querySelectorAll('[data-ds-chip-toggle][aria-pressed="true"]').forEach((c) => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", String(pressed));
      chip.dispatchEvent(new CustomEvent("ds:chip:toggle", { bubbles: true, detail: { pressed } }));
    }
  });

  document.addEventListener("keydown", (event) => {
    const chip = event.target instanceof Element ? event.target.closest(".ds-chip") : null;
    if (!chip || event.altKey || event.ctrlKey || event.metaKey) return;
    if ((event.key === "Backspace" || event.key === "Delete") && chip.classList.contains("is-input") && event.target === chip && chip.getAttribute("aria-disabled") !== "true") {
      event.preventDefault();
      remove(chip);
      return;
    }
    const set = chip.closest("[data-ds-chips]");
    if (!set) return;
    const rtl = getComputedStyle(set).direction === "rtl";
    const keys = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 };
    const items = chipItems(set);
    let target = null;
    if (event.key in keys) target = items[(items.indexOf(chip) + keys[event.key] + items.length) % items.length];
    else if (event.key === "Home") target = items[0];
    else if (event.key === "End") target = items.at(-1);
    if (!target) return;
    event.preventDefault();
    set.querySelectorAll(".ds-chip").forEach((c) => c.setAttribute("tabindex", c === target ? "0" : "-1"));
    focusQuietly(target);
  });

  document.addEventListener("focusin", (event) => {
    const chip = event.target instanceof Element ? event.target.closest(".ds-chip") : null;
    const set = chip?.closest("[data-ds-chips]");
    if (set) set.querySelectorAll(".ds-chip").forEach((c) => c.setAttribute("tabindex", c === chip ? "0" : "-1"));
  });
}

export function init(root = document) {
  root.querySelectorAll("[data-ds-chips]").forEach(initChipSet);
  root.querySelectorAll("[data-ds-badge]").forEach(initBadge);
  root.querySelectorAll(".ds-avatar > img.ds-avatar__img").forEach(initAvatar);
}

export const api = { badge: { set: setBadge }, chips: { remove } };
