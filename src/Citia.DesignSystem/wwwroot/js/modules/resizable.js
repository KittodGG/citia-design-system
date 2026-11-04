/* Resizable panels with a keyboard-operable separator (WAI-ARIA window splitter).
   Markup: .ds-resizable[data-ds-resizable] > .ds-resizable__panel + .ds-resizable__handle[role=separator] + .ds-resizable__panel ...
   Panel sizes are percentages kept in --ds-panel-size (flex-grow). Panel options: data-min, data-max (percent), data-collapsible.
   Container options: .is-vertical (panels stacked), data-ds-resizable-id (persist sizes), data-step (keyboard step, default 5).
   Events: ds:resizable:resize { sizes }, ds:resizable:collapse { index, collapsed }. API: DS.resizable.setSizes(el, [..]).
   Owner: batch A11 layout. */
import { t, addMessages, uid, store, key } from "../core.js";

addMessages({
  en: { "resizable.handle": "Resize panels", "resizable.size": "{size}%", "resizable.collapsed": "collapsed" },
  id: { "resizable.handle": "Ubah ukuran panel", "resizable.size": "{size}%", "resizable.collapsed": "diciutkan" },
});

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const state = new WeakMap();

function read(panel) {
  const raw = parseFloat(panel.style.getPropertyValue("--ds-panel-size") || panel.dataset.size || "");
  return Number.isFinite(raw) ? raw : NaN;
}

function limits(panel) {
  const min = parseFloat(panel.dataset.min);
  const max = parseFloat(panel.dataset.max);
  return { min: Number.isFinite(min) ? min : 10, max: Number.isFinite(max) ? max : 100 };
}

function vertical(root) {
  return root.classList.contains("is-vertical") || root.dataset.orientation === "vertical";
}

function apply(root, sizes, { persist = true, silent = false } = {}) {
  const s = state.get(root);
  s.sizes = sizes;
  s.panels.forEach((panel, i) => {
    panel.style.setProperty("--ds-panel-size", String(Math.round(sizes[i] * 100) / 100));
    panel.toggleAttribute("data-collapsed", sizes[i] === 0 && panel.hasAttribute("data-collapsible"));
  });
  s.handles.forEach((handle, i) => refresh(root, handle, i));
  if (persist && root.dataset.dsResizableId) store.set(key(`resizable-${root.dataset.dsResizableId}`), JSON.stringify(sizes.map((n) => Math.round(n * 100) / 100)));
  if (!silent) root.dispatchEvent(new CustomEvent("ds:resizable:resize", { bubbles: true, detail: { sizes: [...sizes] } }));
}

/** The range the handle's leading panel may take, given the min/max of both neighbours and the space they share. */
function range(root, i) {
  const { panels, sizes } = state.get(root);
  const a = limits(panels[i]);
  const b = limits(panels[i + 1]);
  const total = sizes[i] + sizes[i + 1];
  return { min: Math.max(a.min, total - b.max), max: Math.min(a.max, total - b.min), total };
}

function refresh(root, handle, i) {
  const { panels, sizes } = state.get(root);
  const r = range(root, i);
  const collapsed = sizes[i] === 0 || sizes[i + 1] === 0;
  handle.setAttribute("aria-orientation", vertical(root) ? "horizontal" : "vertical");
  handle.setAttribute("aria-valuenow", String(Math.round(sizes[i])));
  handle.setAttribute("aria-valuemin", String(Math.round(panels[i].hasAttribute("data-collapsible") ? 0 : r.min)));
  handle.setAttribute("aria-valuemax", String(Math.round(r.max)));
  handle.setAttribute("aria-valuetext", collapsed ? t("resizable.collapsed") : t("resizable.size", { size: Math.round(sizes[i]) }));
  if (panels[i].hasAttribute("data-collapsible") || panels[i + 1].hasAttribute("data-collapsible")) handle.setAttribute("aria-expanded", String(!collapsed));
}

function moveTo(root, i, value, opts) {
  const s = state.get(root);
  const r = range(root, i);
  const collapsible = s.panels[i].hasAttribute("data-collapsible");
  let next = clamp(value, r.min, r.max);
  if (collapsible && value < r.min / 2) next = 0; // dragging past half the minimum snaps the panel shut
  const sizes = [...s.sizes];
  sizes[i] = next;
  sizes[i + 1] = r.total - next;
  apply(root, sizes, opts);
}

function toggleCollapse(root, i) {
  const s = state.get(root);
  const lead = s.panels[i].hasAttribute("data-collapsible");
  const follow = s.panels[i + 1].hasAttribute("data-collapsible");
  if (!lead && !follow) return;
  const total = s.sizes[i] + s.sizes[i + 1];
  const sizes = [...s.sizes];
  const index = lead ? i : i + 1;
  const other = index === i ? i + 1 : i;
  if (sizes[index] === 0) {
    const restore = Number(s.panels[index].dataset.restore) || limits(s.panels[index]).min;
    sizes[index] = clamp(restore, limits(s.panels[index]).min, total - limits(s.panels[other]).min);
  } else {
    s.panels[index].dataset.restore = String(sizes[index]);
    sizes[index] = 0;
  }
  sizes[other] = total - sizes[index];
  apply(root, sizes);
  root.dispatchEvent(new CustomEvent("ds:resizable:collapse", { bubbles: true, detail: { index, collapsed: sizes[index] === 0 } }));
}

function begin(root, handle, i, event) {
  if (handle.getAttribute("aria-disabled") === "true" || event.button > 0) return;
  const s = state.get(root);
  const box = root.getBoundingClientRect();
  const isV = vertical(root);
  const size = (isV ? box.height : box.width) - s.handles.length; // handles are 1px
  const rtl = !isV && getComputedStyle(root).direction === "rtl";
  const startPos = isV ? event.clientY : event.clientX;
  const startSize = s.sizes[i];
  handle.setPointerCapture(event.pointerId);
  handle.setAttribute("data-dragging", "");
  root.setAttribute("data-dragging", "");
  const move = (e) => {
    const delta = ((isV ? e.clientY : e.clientX) - startPos) * (rtl ? -1 : 1);
    moveTo(root, i, startSize + (delta / Math.max(1, size)) * 100);
  };
  const end = () => {
    handle.removeAttribute("data-dragging");
    root.removeAttribute("data-dragging");
    handle.removeEventListener("pointermove", move);
    handle.removeEventListener("pointerup", end);
    handle.removeEventListener("pointercancel", end);
  };
  handle.addEventListener("pointermove", move);
  handle.addEventListener("pointerup", end);
  handle.addEventListener("pointercancel", end);
  event.preventDefault();
  handle.focus({ preventScroll: true });
}

function keydown(root, handle, i, event) {
  const s = state.get(root);
  const isV = vertical(root);
  const rtl = !isV && getComputedStyle(root).direction === "rtl";
  const step = Number(root.dataset.step) || 5;
  const r = range(root, i);
  let target = null;
  const grow = isV ? "ArrowDown" : rtl ? "ArrowLeft" : "ArrowRight";
  const shrink = isV ? "ArrowUp" : rtl ? "ArrowRight" : "ArrowLeft";
  const amount = event.shiftKey ? step * 2 : step;
  if (event.key === grow) target = s.sizes[i] === 0 ? r.min : s.sizes[i] + amount;
  else if (event.key === shrink) target = s.sizes[i] - amount;
  else if (event.key === "Home") target = r.min;
  else if (event.key === "End") target = r.max;
  else if (event.key === "Enter") { event.preventDefault(); return toggleCollapse(root, i); }
  if (target === null) return;
  event.preventDefault();
  root.setAttribute("data-stepping", "");
  window.clearTimeout(s.timer);
  s.timer = window.setTimeout(() => root.removeAttribute("data-stepping"), 160);
  moveTo(root, i, target);
}

function setup(root) {
  if (root.dataset.dsReady) return;
  const panels = [...root.querySelectorAll(":scope > .ds-resizable__panel")];
  const handles = [...root.querySelectorAll(":scope > .ds-resizable__handle")];
  if (panels.length < 2 || handles.length !== panels.length - 1) return;
  root.dataset.dsReady = "true";
  let sizes = panels.map(read);
  if (sizes.some(Number.isNaN)) sizes = panels.map(() => 100 / panels.length);
  const sum = sizes.reduce((a, b) => a + b, 0) || 100;
  sizes = sizes.map((n) => (n / sum) * 100);
  state.set(root, { panels, handles, sizes, timer: 0 });

  const id = root.dataset.dsResizableId;
  if (id) {
    try {
      const saved = JSON.parse(store.get(key(`resizable-${id}`)) || "null");
      if (Array.isArray(saved) && saved.length === panels.length && saved.every(Number.isFinite)) sizes = saved;
    } catch { /* ignore stored value */ }
  }

  panels.forEach((panel) => { panel.id ||= uid("panel"); });
  handles.forEach((handle, i) => {
    handle.setAttribute("role", "separator");
    if (!handle.hasAttribute("tabindex")) handle.tabIndex = 0;
    if (!handle.hasAttribute("aria-label") && !handle.hasAttribute("aria-labelledby")) handle.setAttribute("aria-label", t("resizable.handle"));
    handle.setAttribute("aria-controls", panels[i].id);
    handle.addEventListener("pointerdown", (event) => begin(root, handle, i, event));
    handle.addEventListener("keydown", (event) => keydown(root, handle, i, event));
    handle.addEventListener("dblclick", () => toggleCollapse(root, i));
  });
  apply(root, sizes, { persist: false, silent: true });
}

export function wire() {}

export function init(root = document) {
  root.querySelectorAll("[data-ds-resizable]").forEach(setup);
}

export const api = {
  resizable: {
    /** Set the panel sizes (percentages) of a resizable group element. */
    setSizes(element, sizes) {
      setup(element);
      if (state.has(element) && sizes.length === state.get(element).panels.length) apply(element, sizes);
    },
  },
};
