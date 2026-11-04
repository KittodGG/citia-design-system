/* Popover and hover card on the HTML Popover API, plus the placement used by menus. Owner: batch A9.
   Popover: <button popovertarget="id"> + <div id="id" popover class="ds-popover" data-ds-side="bottom" data-ds-align="start">.
     Without script the browser opens it (centred); with script it opens next to its trigger, grows from it, follows
     scroll and resize, flips when there is no room, and points an arrow at the trigger (.is-arrow).
     Light dismiss and Escape come from the platform (popover="auto"). Focus moves into the popover
     ([data-ds-initial-focus] / [autofocus], else the panel itself) and returns to the trigger on close.
   Hover card: <a href="…" data-ds-hover-card="id"> + <div id="id" popover="manual" class="ds-hover-card">.
     Opens after 500 ms of hover (data-ds-open-delay) or on keyboard focus, closes 300 ms after the pointer leaves both
     (data-ds-close-delay), Escape closes. Never opens on touch: the link itself is the way in.
   API: DS.popover.open(idOrEl, anchor, { side, align, focus }), .close(idOrEl), .toggle(idOrEl, anchor), .place(el, anchor, opts).
   Events (bubble): ds:popover:open, ds:popover:close. */
import { focusQuietly, coarsePointer } from "../core.js";

export const FLOATING = ".ds-popover[popover], .ds-menu[popover], .ds-menu-panel[popover], .ds-hover-card[popover], [popover][data-ds-popover]";
const FOCUSABLE = "a[href], button:not([disabled]), input:not([type=hidden], [disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

const resolve = (target) => (typeof target === "string" ? document.getElementById(target) : target);
const isOpen = (el) => { try { return el.matches(":popover-open"); } catch { return false; } };
const emit = (el, name, detail) => el.dispatchEvent(new CustomEvent(`ds:popover:${name}`, { bubbles: true, detail }));

/* ------------------------------------------------------------------ placement */
/**
 * Place a fixed floating layer next to an anchor (element or { getBoundingClientRect }), flipping to stay on screen.
 * Like core placeFloating, but measured with offsetWidth/offsetHeight so the enter scale does not skew the result,
 * and it sets transform-origin (--ds-origin) and the arrow offset (--ds-arrow-x / --ds-arrow-y) towards the anchor.
 */
export function place(floating, anchor, { side = "bottom", align = "start", gap = 6, inset = 8 } = {}) {
  const a = anchor.getBoundingClientRect();
  floating.style.position = "fixed";
  floating.style.margin = "0";
  const w = floating.offsetWidth;
  const h = floating.offsetHeight;
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const rtl = getComputedStyle(floating).direction === "rtl";
  // Logical align: "start" follows the reading direction.
  const physical = rtl && (side === "bottom" || side === "top") ? { start: "end", end: "start", center: "center" }[align] : align;
  const room = { bottom: vh - a.bottom - gap - inset, top: a.top - gap - inset, right: vw - a.right - gap - inset, left: a.left - gap - inset };
  const need = { bottom: h, top: h, right: w, left: w };
  const opposite = { bottom: "top", top: "bottom", left: "right", right: "left" };
  let used = side;
  if (room[side] < need[side] && room[opposite[side]] > room[side]) used = opposite[side];
  let top;
  let left;
  if (used === "bottom" || used === "top") {
    top = used === "bottom" ? a.bottom + gap : a.top - gap - h;
    left = physical === "end" ? a.right - w : physical === "center" ? a.left + a.width / 2 - w / 2 : a.left;
  } else {
    left = used === "right" ? a.right + gap : a.left - gap - w;
    top = physical === "end" ? a.bottom - h : physical === "center" ? a.top + a.height / 2 - h / 2 : a.top;
  }
  left = Math.round(Math.min(vw - w - inset, Math.max(inset, left)));
  top = Math.round(Math.min(vh - h - inset, Math.max(inset, top)));
  // Too tall for either side: cap the height, the panel scrolls.
  if ((used === "bottom" || used === "top") && h > Math.max(room.bottom, room.top)) floating.style.maxHeight = `${Math.max(room[used], 120)}px`;
  floating.style.left = `${left}px`;
  floating.style.top = `${top}px`;
  const ax = Math.min(w - 12, Math.max(12, a.left + a.width / 2 - left));
  const ay = Math.min(h - 12, Math.max(12, a.top + a.height / 2 - top));
  const origin = { bottom: `${ax}px top`, top: `${ax}px bottom`, right: `left ${ay}px`, left: `right ${ay}px` }[used];
  floating.style.setProperty("--ds-origin", origin);
  floating.style.setProperty("--ds-arrow-x", `${ax}px`);
  floating.style.setProperty("--ds-arrow-y", `${ay}px`);
  floating.dataset.side = used;
  return used;
}

/* ------------------------------------------------------------------ tracking while open */
const tracked = new Map(); // floating → { anchor, options }
let frame = 0;
function reposition() {
  frame = 0;
  for (const [floating, { anchor, options }] of tracked) {
    if (!isOpen(floating)) { tracked.delete(floating); continue; }
    if (anchor instanceof Element && !anchor.isConnected) continue;
    place(floating, anchor, options);
  }
}
const schedule = () => { if (!frame && tracked.size) frame = requestAnimationFrame(reposition); };

/** Keep a floating layer attached to its anchor while it is open (scroll, resize). */
export function track(floating, anchor, options) {
  floating.style.maxHeight = "";
  floating.setAttribute("data-ds-floating", "");
  tracked.set(floating, { anchor, options });
  place(floating, anchor, options);
}

export function untrack(floating) {
  tracked.delete(floating);
  delete floating.dataset.side;
}

export function optionsFor(floating, defaults = {}) {
  return {
    side: floating.getAttribute("data-ds-side") || defaults.side || "bottom",
    align: floating.getAttribute("data-ds-align") || defaults.align || "start",
    gap: Number(floating.getAttribute("data-ds-gap") || defaults.gap || 6),
  };
}

/** Show a [popover] next to its anchor. source sets the invoker relationship where supported. */
export function showAt(floating, anchor, options) {
  if (!isOpen(floating)) {
    try { floating.showPopover(anchor instanceof Element ? { source: anchor } : undefined); } catch { floating.showPopover(); }
  }
  track(floating, anchor, options);
}

/* ------------------------------------------------------------------ popover */
const invokers = new WeakMap(); // popover → trigger element

function focusInto(popover) {
  const target = popover.querySelector("[data-ds-initial-focus], [autofocus]");
  if (target) { focusQuietly(target); return; }
  if (!popover.hasAttribute("tabindex")) popover.tabIndex = -1;
  focusQuietly(popover);
}

export function open(target, anchor, { side, align, focus = true } = {}) {
  const popover = resolve(target);
  if (!popover) return null;
  const trigger = anchor ?? invokers.get(popover) ?? document.querySelector(`[popovertarget="${CSS.escape(popover.id)}"]`);
  if (trigger instanceof Element) invokers.set(popover, trigger);
  const options = optionsFor(popover, { side, align });
  if (side) options.side = side;
  if (align) options.align = align;
  if (trigger) showAt(popover, trigger, options);
  else if (!isOpen(popover)) popover.showPopover();
  trigger?.setAttribute?.("aria-expanded", "true");
  if (focus && popover.matches(".ds-popover")) focusInto(popover);
  return popover;
}

export function close(target) {
  const popover = resolve(target);
  if (popover && isOpen(popover)) popover.hidePopover();
}

export function toggle(target, anchor) {
  const popover = resolve(target);
  if (!popover) return;
  if (isOpen(popover)) close(popover);
  else open(popover, anchor);
}

/* ------------------------------------------------------------------ hover card */
const hoverCards = new WeakSet();

function hoverCard(trigger) {
  if (hoverCards.has(trigger)) return;
  hoverCards.add(trigger);
  const card = () => document.getElementById(trigger.getAttribute("data-ds-hover-card"));
  const openDelay = () => Number(trigger.getAttribute("data-ds-open-delay") || 500);
  const closeDelay = () => Number(trigger.getAttribute("data-ds-close-delay") || 300);
  let openTimer = 0;
  let closeTimer = 0;
  const show = () => {
    window.clearTimeout(closeTimer);
    const el = card();
    if (!el || isOpen(el)) return;
    if (!el.hasAttribute("popover")) el.setAttribute("popover", "manual");
    // One hover card at a time.
    document.querySelectorAll(".ds-hover-card[popover]").forEach((other) => { if (other !== el && isOpen(other)) other.hidePopover(); });
    showAt(el, trigger, optionsFor(el, { side: "bottom", align: "center", gap: 8 }));
    trigger.setAttribute("data-state", "open");
  };
  const hide = () => {
    window.clearTimeout(openTimer);
    const el = card();
    if (el && isOpen(el)) el.hidePopover();
    trigger.removeAttribute("data-state");
  };
  const scheduleOpen = (delay) => { window.clearTimeout(closeTimer); window.clearTimeout(openTimer); openTimer = window.setTimeout(show, delay); };
  const scheduleClose = () => { window.clearTimeout(openTimer); window.clearTimeout(closeTimer); closeTimer = window.setTimeout(hide, closeDelay()); };

  trigger.addEventListener("pointerenter", (event) => { if (event.pointerType !== "touch" && !coarsePointer()) scheduleOpen(openDelay()); });
  trigger.addEventListener("pointerleave", (event) => { if (event.pointerType !== "touch") scheduleClose(); });
  trigger.addEventListener("focus", () => { if (trigger.matches(":focus-visible")) scheduleOpen(Math.min(openDelay(), 300)); });
  trigger.addEventListener("blur", (event) => { if (!card()?.contains(event.relatedTarget)) scheduleClose(); });
  trigger.addEventListener("pointerdown", () => window.clearTimeout(openTimer));
  trigger.addEventListener("keydown", (event) => { if (event.key === "Escape" && isOpen(card() ?? trigger)) { event.preventDefault(); hide(); } });

  const el = card();
  if (el && !el._dsHoverWired) {
    el._dsHoverWired = true;
    el.addEventListener("pointerenter", () => window.clearTimeout(closeTimer));
    el.addEventListener("pointerleave", scheduleClose);
    el.addEventListener("focusout", (event) => { if (event.relatedTarget !== trigger && !el.contains(event.relatedTarget)) scheduleClose(); });
    el.addEventListener("keydown", (event) => { if (event.key === "Escape") { event.preventDefault(); hide(); focusQuietly(trigger); } });
  }
}

/* ------------------------------------------------------------------ wiring */
export function wire() {
  // Take over popovertarget activation for DS popovers, so placement happens before the first frame.
  let wasOpen = new WeakMap();
  document.addEventListener("pointerdown", (event) => {
    const trigger = event.target instanceof Element ? event.target.closest("[popovertarget]") : null;
    const popover = trigger && document.getElementById(trigger.getAttribute("popovertarget"));
    if (popover) wasOpen.set(trigger, isOpen(popover));
  }, true);
  document.addEventListener("click", (event) => {
    const trigger = event.target instanceof Element ? event.target.closest("[popovertarget]") : null;
    if (!trigger) return;
    const popover = document.getElementById(trigger.getAttribute("popovertarget"));
    if (!popover?.matches(".ds-popover[popover], [popover][data-ds-popover]")) return;
    event.preventDefault();
    if (trigger.disabled || trigger.getAttribute("aria-disabled") === "true") return;
    const action = trigger.getAttribute("popovertargetaction") || "toggle";
    const opened = wasOpen.has(trigger) ? wasOpen.get(trigger) : isOpen(popover);
    wasOpen = new WeakMap();
    if (action === "hide" || (action === "toggle" && opened)) { close(popover); return; }
    if (!isOpen(popover)) open(popover, trigger);
  });

  // Close bookkeeping for every DS floating layer: light dismiss, Escape, script.
  document.addEventListener("toggle", (event) => {
    const popover = event.target;
    if (!(popover instanceof HTMLElement) || !popover.matches(FLOATING)) return;
    const own = popover.matches(".ds-popover, .ds-hover-card, [data-ds-popover]");
    if (event.newState === "open") { if (own) emit(popover, "open"); return; }
    untrack(popover);
    const trigger = invokers.get(popover) ?? document.querySelector(`[popovertarget="${CSS.escape(popover.id)}"]`);
    if (trigger?.getAttribute("aria-expanded") === "true") trigger.setAttribute("aria-expanded", "false");
    const active = document.activeElement;
    if (popover.matches(".ds-popover") && trigger && (!active || active === document.body || popover.contains(active))) focusQuietly(trigger);
    if (own) emit(popover, "close");
  }, true);

  window.addEventListener("scroll", schedule, { capture: true, passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

export function init(root) {
  root.querySelectorAll?.("[data-ds-hover-card]").forEach(hoverCard);
  root.querySelectorAll?.(".ds-popover[popover]").forEach((popover) => {
    popover.setAttribute("data-ds-floating", "");
    document.querySelectorAll(`[popovertarget="${CSS.escape(popover.id)}"]`).forEach((trigger) => {
      if (!trigger.hasAttribute("aria-expanded")) trigger.setAttribute("aria-expanded", "false");
      if (!trigger.hasAttribute("aria-controls")) trigger.setAttribute("aria-controls", popover.id);
    });
  });
}

export const api = {
  popover: { open, close, toggle, place },
  hoverCard: {
    open: (id) => { const trigger = document.querySelector(`[data-ds-hover-card="${CSS.escape(id)}"]`); const el = resolve(id); if (trigger && el) showAt(el, trigger, optionsFor(el, { align: "center" })); },
    close: (id) => close(id),
  },
};
