/* Tooltip: text on hover (500 ms delay, instant between neighbours) and on keyboard focus, Escape closes, placement flips
   inside the viewport. A tooltip describes (aria-describedby); it is never interactive and never the only place a fact lives.
   Owner: batch A8 feedback. Contract: docs/_contributing.md.

   Attributes on the trigger:
     data-ds-tooltip="text"              plain tooltip (a short label or hint)
     data-ds-tooltip-title="Title"       rich tooltip: title + text (+ optional kbd), light surface
     data-ds-tooltip-kbd="Ctrl K"        shortcut shown after the text
     data-ds-tooltip-placement="top"     top | bottom | left | right, optional -start | -end (default top)
     data-ds-tooltip-delay="500"         hover delay in ms (0 = immediate)
     data-ds-tooltip-overflow            show the element's own text, only when it is truncated
   Disabled controls swallow pointer events: wrap them in <span class="ds-tooltip-wrap" tabindex="0" data-ds-tooltip="…">.
   API: DS.tooltip.show(el), DS.tooltip.hide(). */
import { uid, placeFloating } from "../core.js";

const SELECTOR = "[data-ds-tooltip], [data-ds-tooltip-overflow]";
const HOVER_DELAY = 500;
const WARM_MS = 400; // after one tooltip closes, the next one opens without delay
const HIDE_GRACE = 120; // pointer may travel to the tooltip (WCAG 1.4.13 hoverable)
const supportsPopover = typeof HTMLElement !== "undefined" && "showPopover" in HTMLElement.prototype;

const tips = new WeakMap();
let current = null; // { trigger, tip }
let showTimer = 0;
let hideTimer = 0;
let lastHide = 0;
let hovering = null;

const triggerOf = (target) => (target instanceof Element ? target.closest(SELECTOR) : null);

function describe(trigger) {
  const title = trigger.getAttribute("data-ds-tooltip-title") || "";
  let text = trigger.getAttribute("data-ds-tooltip") || "";
  if (trigger.hasAttribute("data-ds-tooltip-overflow")) {
    const over = trigger.scrollWidth > trigger.clientWidth + 1 || trigger.scrollHeight > trigger.clientHeight + 1;
    text = over ? trigger.textContent.trim() : "";
  }
  const kbd = trigger.getAttribute("data-ds-tooltip-kbd") || "";
  return text || title ? { title, text, kbd } : null;
}

function placementOf(trigger) {
  const [side = "top", align = "center"] = (trigger.getAttribute("data-ds-tooltip-placement") || "top").split("-");
  return { side: ["top", "bottom", "left", "right"].includes(side) ? side : "top", align: ["start", "end"].includes(align) ? align : "center" };
}

function tipFor(trigger) {
  let tip = tips.get(trigger);
  if (tip) return tip;
  tip = document.createElement("div");
  tip.className = "ds-tooltip";
  tip.id = uid("tooltip");
  tip.setAttribute("role", "tooltip");
  if (supportsPopover) tip.setAttribute("popover", "manual");
  tip.addEventListener("pointerenter", () => window.clearTimeout(hideTimer));
  tip.addEventListener("pointerleave", (event) => {
    if (current?.tip === tip && !(event.relatedTarget instanceof Node && trigger.contains(event.relatedTarget))) hideSoon();
  });
  (supportsPopover ? document.body : trigger.closest("dialog[open]") ?? document.body).append(tip);
  tips.set(trigger, tip);
  if (!trigger.hasAttribute("data-ds-tooltip-named")) {
    const ids = new Set((trigger.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean));
    ids.add(tip.id);
    trigger.setAttribute("aria-describedby", [...ids].join(" "));
  }
  return tip;
}

function paint(tip, info) {
  tip.classList.toggle("is-rich", Boolean(info.title));
  tip.replaceChildren();
  if (info.title) {
    const title = document.createElement("span");
    title.className = "ds-tooltip__title";
    title.textContent = info.title;
    tip.append(title);
  }
  if (info.text) {
    const text = document.createElement("span");
    text.className = "ds-tooltip__text";
    text.textContent = info.text;
    tip.append(text);
  }
  if (info.kbd) {
    const kbd = document.createElement("kbd");
    kbd.className = "ds-tooltip__kbd";
    kbd.textContent = info.kbd;
    tip.append(kbd);
  }
}

function open(tip) {
  if (supportsPopover) { if (!tip.matches(":popover-open")) tip.showPopover(); } else tip.setAttribute("data-open", "");
}

function close(tip) {
  if (supportsPopover) { try { if (tip.matches(":popover-open")) tip.hidePopover(); } catch { /* already closed */ } } else tip.removeAttribute("data-open");
}

function hideNow() {
  window.clearTimeout(showTimer);
  window.clearTimeout(hideTimer);
  if (!current) return;
  close(current.tip);
  current = null;
  lastHide = performance.now();
}

function hideSoon() {
  window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(hideNow, HIDE_GRACE);
}

export function show(trigger, instant = false) {
  window.clearTimeout(showTimer);
  window.clearTimeout(hideTimer);
  const info = describe(trigger);
  if (!info || !trigger.isConnected) return;
  prepare(trigger);
  if (current && current.trigger === trigger) return;
  const warm = instant || current !== null || performance.now() - lastHide < WARM_MS;
  if (current) { close(current.tip); current = null; }
  const tip = tipFor(trigger);
  paint(tip, info);
  tip.toggleAttribute("data-instant", warm);
  const { side, align } = placementOf(trigger);
  open(tip);
  placeFloating(tip, trigger, { side, align, gap: 8 });
  current = { trigger, tip };
}

function schedule(trigger, delay) {
  window.clearTimeout(showTimer);
  window.clearTimeout(hideTimer);
  if (current?.trigger === trigger) return;
  const attr = trigger.getAttribute("data-ds-tooltip-delay");
  const wait = attr !== null && Number.isFinite(Number(attr)) ? Number(attr) : delay;
  const warm = current !== null || performance.now() - lastHide < WARM_MS;
  if (wait === 0 || warm) show(trigger, warm);
  else showTimer = window.setTimeout(() => show(trigger), wait);
}

const NATIVE_FOCUS = "a[href], button, input, select, textarea, summary, [tabindex], [contenteditable]";

function prepare(trigger) {
  if (!trigger.matches(NATIVE_FOCUS) && trigger.hasAttribute("data-ds-tooltip") && !trigger.hasAttribute("data-ds-tooltip-overflow")) trigger.setAttribute("tabindex", "0");
  // Icon-only controls get their accessible name from the tooltip text; everything else keeps its own name and gets a description.
  const text = trigger.getAttribute("data-ds-tooltip");
  if (text && !trigger.hasAttribute("data-ds-tooltip-title") && !trigger.textContent.trim() && !trigger.hasAttribute("aria-label") && !trigger.hasAttribute("aria-labelledby") && trigger.matches("button, a[href], [role='button']")) {
    trigger.setAttribute("aria-label", text);
    trigger.setAttribute("data-ds-tooltip-named", "");
  }
}

export function wire() {
  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") return;
    const trigger = triggerOf(event.target);
    if (trigger === hovering) return;
    hovering = trigger;
    if (trigger) schedule(trigger, HOVER_DELAY);
  });

  document.addEventListener("pointerout", (event) => {
    const from = triggerOf(event.target);
    if (!from) return;
    const to = event.relatedTarget;
    if (to instanceof Node && (from.contains(to) || current?.tip.contains(to))) return;
    if (hovering === from) hovering = null;
    window.clearTimeout(showTimer);
    if (current?.trigger === from && document.activeElement !== from) hideSoon();
  });

  document.addEventListener("focusin", (event) => {
    const trigger = triggerOf(event.target);
    if (!trigger || !trigger.matches(":focus-visible")) return;
    show(trigger, true);
  });

  document.addEventListener("focusout", (event) => {
    const trigger = triggerOf(event.target);
    if (trigger && current?.trigger === trigger) hideNow();
  });

  document.addEventListener("pointerdown", (event) => {
    window.clearTimeout(showTimer);
    if (current && !(event.target instanceof Node && current.tip.contains(event.target))) hideNow();
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !current) return;
    event.preventDefault();
    hideNow();
  }, true);

  document.addEventListener("scroll", () => { if (current) hideNow(); }, { capture: true, passive: true });
  window.addEventListener("resize", () => {
    if (!current) return;
    const { side, align } = placementOf(current.trigger);
    placeFloating(current.tip, current.trigger, { side, align, gap: 8 });
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) hideNow(); });
}

export function init(root = document) {
  root.querySelectorAll(SELECTOR).forEach(prepare);
}

export const api = { tooltip: { show: (el) => show(el, true), hide: hideNow } };
