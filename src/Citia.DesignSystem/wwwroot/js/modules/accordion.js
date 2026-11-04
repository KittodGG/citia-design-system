/* Accordion and collapsible on <details> (no JavaScript needed), plus the button form of the collapsible and show more / less.
   Owner: batch A8 feedback. Contract: docs/_contributing.md.

   Accordion  .ds-accordion > details.ds-accordion__item > summary.ds-accordion__trigger + .ds-accordion__panel
     data-ds-accordion="single"        only one item open: the script gives the items one shared name (the native
                                       exclusive accordion) and closes the others itself where name is not supported
     data-ds-accordion-all="open|close" on a button with aria-controls="<accordion id>": expand or collapse every item
     item aria-disabled="true"         cannot be toggled, stays focusable
     Keys on a trigger: Enter/Space toggle (native), ArrowDown/ArrowUp move between triggers, Home/End first/last.
   Collapsible (button form)  [data-ds-collapsible] > button.ds-collapsible__trigger[aria-expanded][aria-controls] + .ds-collapsible__content[hidden]
   Show more / less           .ds-collapsible.is-clamp[data-ds-collapsible] > .ds-collapsible__clamp + button.ds-collapsible__trigger
                              --ds-clamp-lines sets the lines (default 3); the button hides itself when the text fits.
   Events: ds:accordion:toggle { open }, ds:collapsible:toggle { open }. */
import { t, addMessages, uid, reduceMotion } from "../core.js";

addMessages({
  en: { "collapsible.more": "Show more", "collapsible.less": "Show less" },
  id: { "collapsible.more": "Tampilkan lebih banyak", "collapsible.less": "Tampilkan lebih sedikit" },
});

const nativeName = typeof HTMLDetailsElement !== "undefined" && "name" in HTMLDetailsElement.prototype;
const ready = new WeakSet();

const items = (accordion) => [...accordion.querySelectorAll(":scope > .ds-accordion__item")];
const triggers = (accordion) => items(accordion).map((item) => item.querySelector(":scope > summary")).filter(Boolean);

function setupAccordion(accordion) {
  if (ready.has(accordion)) return;
  ready.add(accordion);
  if (accordion.dataset.dsAccordion === "single") {
    const name = accordion.getAttribute("data-ds-accordion-name") || uid("accordion");
    const list = items(accordion);
    list.forEach((item) => { if (!item.getAttribute("name")) item.setAttribute("name", name); });
    list.filter((item) => item.open).slice(1).forEach((item) => { item.open = false; });
  }
  items(accordion).forEach(syncDisabled);
}

function syncDisabled(item) {
  const summary = item.querySelector(":scope > summary");
  if (!summary) return;
  if (item.getAttribute("aria-disabled") === "true") summary.setAttribute("aria-disabled", "true");
  else summary.removeAttribute("aria-disabled");
}

/* ------------------------------------------------------------------ collapsible, button form */
function setupCollapsible(box) {
  if (ready.has(box)) return;
  ready.add(box);
  const trigger = box.querySelector(":scope > .ds-collapsible__trigger");
  if (!trigger) return;
  const clamp = box.querySelector(":scope > .ds-collapsible__clamp");
  const content = clamp ?? box.querySelector(":scope > .ds-collapsible__content");
  if (!content) return;
  if (!content.id) content.id = uid("collapsible");
  trigger.setAttribute("aria-controls", content.id);
  if (!trigger.hasAttribute("aria-expanded")) trigger.setAttribute("aria-expanded", "false");
  if (!clamp && !content.querySelector(":scope > .ds-collapsible__inner:only-child")) {
    const inner = document.createElement("div");
    inner.className = "ds-collapsible__inner";
    inner.append(...content.childNodes);
    content.append(inner);
  }
  if (clamp) {
    setupClamp(box, trigger, clamp);
  } else {
    content.hidden = trigger.getAttribute("aria-expanded") !== "true";
  }
  box.setAttribute("data-ds-ready", "");
}

function setupClamp(box, trigger, clamp) {
  const labels = () => {
    const expanded = trigger.getAttribute("aria-expanded") === "true";
    trigger.textContent = expanded
      ? trigger.getAttribute("data-ds-label-expanded") || t("collapsible.less")
      : trigger.getAttribute("data-ds-label-collapsed") || t("collapsible.more");
  };
  const measure = () => {
    const expanded = clamp.hasAttribute("data-expanded");
    if (expanded) return;
    const overflowing = clamp.scrollHeight > clamp.clientHeight + 1;
    clamp.toggleAttribute("data-overflowing", overflowing);
    trigger.hidden = !overflowing;
  };
  box.setAttribute("data-ds-ready", "");
  labels();
  requestAnimationFrame(measure);
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(measure).observe(clamp);
  trigger._dsLabels = labels;
  trigger._dsClamp = clamp;
}

function toggleCollapsible(trigger) {
  const box = trigger.closest("[data-ds-collapsible]");
  if (!box || trigger.disabled || trigger.getAttribute("aria-disabled") === "true") return;
  const expanded = trigger.getAttribute("aria-expanded") === "true";
  const clamp = trigger._dsClamp;
  if (clamp) {
    clamp.toggleAttribute("data-expanded", !expanded);
    trigger.setAttribute("aria-expanded", String(!expanded));
    trigger._dsLabels();
  } else {
    const content = document.getElementById(trigger.getAttribute("aria-controls"));
    if (!content) return;
    if (!expanded) {
      content.hidden = false;
      void content.offsetHeight; // closed layout is committed, so the grid row can grow
      trigger.setAttribute("aria-expanded", "true");
    } else {
      trigger.setAttribute("aria-expanded", "false");
      if (reduceMotion()) content.hidden = true;
      else window.setTimeout(() => { if (trigger.getAttribute("aria-expanded") === "false") content.hidden = true; }, 200);
    }
  }
  box.dispatchEvent(new CustomEvent("ds:collapsible:toggle", { bubbles: true, detail: { open: !expanded } }));
}

/* ------------------------------------------------------------------ hash target inside a closed item */
function openHashTarget() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  for (let el = target?.closest("details"); el; el = el.parentElement?.closest("details")) {
    if (!el.open && el.matches(".ds-accordion__item, details.ds-collapsible")) el.open = true;
  }
}

/* ------------------------------------------------------------------ wiring */
export function wire() {
  // Disabled accordion items: the summary click (mouse, Enter or Space) must not toggle.
  document.addEventListener("click", (event) => {
    const el = event.target instanceof Element ? event.target : null;
    if (!el) return;
    const summary = el.closest(".ds-accordion__item > summary");
    if (summary?.parentElement?.getAttribute("aria-disabled") === "true") { event.preventDefault(); return; }
    const trigger = el.closest("button.ds-collapsible__trigger");
    if (trigger?.closest("[data-ds-collapsible]")) { toggleCollapsible(trigger); return; }
    const all = el.closest("[data-ds-accordion-all]");
    if (all) {
      const target = document.getElementById(all.getAttribute("aria-controls") || "");
      const open = all.getAttribute("data-ds-accordion-all") === "open";
      target?.querySelectorAll(":scope > .ds-accordion__item").forEach((item) => {
        if (item.getAttribute("aria-disabled") !== "true") item.open = open;
      });
    }
  });

  // Exclusive groups where the native name attribute is missing.
  document.addEventListener("toggle", (event) => {
    const item = event.target;
    if (!(item instanceof HTMLDetailsElement)) return;
    if (item.matches(".ds-accordion__item")) {
      item.dispatchEvent(new CustomEvent("ds:accordion:toggle", { bubbles: true, detail: { open: item.open } }));
      if (!nativeName && item.open && item.name) {
        document.querySelectorAll(`details[name="${CSS.escape(item.name)}"][open]`).forEach((other) => { if (other !== item) other.open = false; });
      }
    } else if (item.matches("details.ds-collapsible")) {
      item.dispatchEvent(new CustomEvent("ds:collapsible:toggle", { bubbles: true, detail: { open: item.open } }));
    }
  }, true);

  document.addEventListener("keydown", (event) => {
    const el = event.target instanceof Element ? event.target : null;
    const summary = el?.closest(".ds-accordion__item > summary");
    const accordion = summary?.closest(".ds-accordion");
    if (!summary || !accordion || event.altKey || event.ctrlKey || event.metaKey) return;
    const list = triggers(accordion).filter((s) => s.parentElement.getAttribute("aria-disabled") !== "true" || s === summary);
    const index = list.indexOf(summary);
    let next = null;
    if (event.key === "ArrowDown") next = list[Math.min(list.length - 1, index + 1)];
    else if (event.key === "ArrowUp") next = list[Math.max(0, index - 1)];
    else if (event.key === "Home") next = list[0];
    else if (event.key === "End") next = list.at(-1);
    if (!next) return;
    event.preventDefault();
    next.focus();
  });

  window.addEventListener("hashchange", openHashTarget);
}

export function init(root = document) {
  root.querySelectorAll(".ds-accordion").forEach(setupAccordion);
  root.querySelectorAll(".ds-accordion__item[aria-disabled]").forEach(syncDisabled);
  root.querySelectorAll("[data-ds-collapsible]").forEach(setupCollapsible);
  if (root === document) openHashTarget();
}

export const api = {
  accordion: {
    openAll: (accordion) => accordion.querySelectorAll(":scope > .ds-accordion__item:not([aria-disabled='true'])").forEach((i) => { i.open = true; }),
    closeAll: (accordion) => accordion.querySelectorAll(":scope > .ds-accordion__item").forEach((i) => { i.open = false; }),
  },
};
