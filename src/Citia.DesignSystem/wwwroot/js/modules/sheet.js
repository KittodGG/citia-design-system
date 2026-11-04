/* Sheet: a modal <dialog class="ds-sheet"> that slides from an edge. Owner: batch A9.
   Hooks: [data-ds-sheet-open="id"], [data-ds-sheet-close], dialog.ds-sheet[data-ds-sheet-snap="45%,100%"]
   (visible fractions of the sheet, smallest first; the first is where it opens), data-ds-sheet-initial="1"
   (index to open at), data-ds-dismissible="false" (scrim press does not close).
   Gesture: drag the handle (any pointer) or the header (touch and pen) towards the edge. The sheet follows the finger
   1:1 with pointer capture, rubber-bands past fully open, and on release projects the throw (deceleration 0.998,
   Apple's scroll-view rate) to choose the nearest snap point or dismissal. A flick (> 0.5 px/ms) settles with the bounce
   spring; a slow release with the critically damped one. The scrim follows the drag.
   Keyboard: the handle is a button: Enter/Space steps through the snap points (or closes), ArrowUp/ArrowDown grow and
   shrink a bottom sheet. Focus trap, Escape and focus return come from the native modal dialog (dialog.js).
   API: DS.sheet.open(idOrEl, opener, { snap, modal }), DS.sheet.close(idOrEl), DS.sheet.snap(idOrEl, index).
   Events (bubble): ds:sheet:open, ds:sheet:close, ds:sheet:snap (detail { index }). */
import { t, addMessages, reduceMotion } from "../core.js";
import { open as openDialog, close as closeDialog, isBusy } from "./dialog.js";

addMessages({
  en: { "sheet.close": "Close", "sheet.handle": "Resize or close the panel", "sheet.handleClose": "Close the panel" },
  id: { "sheet.close": "Tutup", "sheet.handle": "Ubah ukuran atau tutup panel", "sheet.handleClose": "Tutup panel" },
});

const DECELERATION = 0.998;
const FLICK = 0.5; // px per ms
const project = (velocity) => (velocity * DECELERATION) / (1 - DECELERATION); // px/ms → px
const rubber = (overshoot, dimension) => (1 - 1 / ((overshoot * 0.55) / dimension + 1)) * dimension;

const resolve = (target) => (typeof target === "string" ? document.getElementById(target) : target);
const emit = (el, name, detail) => el.dispatchEvent(new CustomEvent(`ds:sheet:${name}`, { bubbles: true, detail }));

function sideOf(sheet) {
  if (sheet.classList.contains("is-bottom")) return "bottom";
  if (sheet.classList.contains("is-top")) return "top";
  return sheet.classList.contains("is-start") ? "start" : "end";
}

const vertical = (side) => side === "bottom" || side === "top";

/** +1 when moving towards the closed position increases the physical coordinate. */
function closingSign(sheet, side) {
  const rtl = getComputedStyle(sheet).direction === "rtl";
  if (side === "bottom") return 1;
  if (side === "top") return -1;
  if (side === "end") return rtl ? -1 : 1;
  return rtl ? 1 : -1;
}

const dimension = (sheet, side) => (vertical(side) ? sheet.offsetHeight : sheet.offsetWidth);

/** Visible fractions, smallest first; [1] when the sheet has no snap points. */
function snaps(sheet) {
  const raw = sheet.getAttribute("data-ds-sheet-snap");
  if (!raw) return [1];
  const list = raw.split(",").map((s) => parseFloat(s) / (s.trim().endsWith("%") ? 100 : 1)).filter((n) => n > 0 && n <= 1);
  return list.length ? list.sort((a, b) => a - b) : [1];
}

/** Write the offset (px towards the closed edge) into the CSS variables. */
function setOffset(sheet, side, px, dim) {
  const signed = px * closingSign(sheet, side);
  sheet.style.setProperty(vertical(side) ? "--ds-sheet-dy" : "--ds-sheet-dx", `${signed}px`);
  sheet.style.setProperty(vertical(side) ? "--ds-sheet-dx" : "--ds-sheet-dy", "0px");
  sheet.style.setProperty("--ds-sheet-scrim", String(Math.max(0, Math.min(1, 1 - px / Math.max(dim, 1)))));
}

function settleTo(sheet, index, { flick = false } = {}) {
  const side = sideOf(sheet);
  const list = snaps(sheet);
  const i = Math.max(0, Math.min(list.length - 1, index));
  const dim = dimension(sheet, side);
  sheet._dsSnap = i;
  if (flick && !reduceMotion()) sheet.setAttribute("data-ds-settle", "bounce");
  else sheet.removeAttribute("data-ds-settle");
  setOffset(sheet, side, (1 - list[i]) * dim, dim);
  // Fully open: the scrim is fully on whatever the snap.
  if (list[i] === list.at(-1)) sheet.style.setProperty("--ds-sheet-scrim", "1");
  emit(sheet, "snap", { index: i });
}

/* ------------------------------------------------------------------ open / close */
export function open(target, opener, { snap, modal = true } = {}) {
  const sheet = resolve(target);
  if (!(sheet instanceof HTMLDialogElement) || sheet.open) return sheet ?? null;
  prepare(sheet);
  sheet.removeAttribute("data-ds-settle");
  sheet.removeAttribute("data-ds-dragging");
  const list = snaps(sheet);
  const index = snap ?? Number(sheet.getAttribute("data-ds-sheet-initial") || 0);
  sheet._dsSnap = Math.max(0, Math.min(list.length - 1, index));
  sheet.style.setProperty("--ds-sheet-dx", "0px");
  sheet.style.setProperty("--ds-sheet-dy", "0px");
  sheet.style.setProperty("--ds-sheet-scrim", "1");
  if (modal) {
    sheet.removeAttribute("data-ds-modeless");
    openDialog(sheet, opener);
  } else {
    sheet.setAttribute("data-ds-modeless", "");
    sheet._dsOpener = opener ?? document.activeElement;
    sheet.show();
  }
  // Set in the same frame as showModal, so the slide from the edge ends exactly at the snap point.
  if (list.length > 1) settleTo(sheet, sheet._dsSnap);
  emit(sheet, "open");
  return sheet;
}

export function close(target) {
  const sheet = resolve(target);
  if (!sheet?.open) return;
  closeDialog(sheet, "close");
}

/* ------------------------------------------------------------------ drag */
function startDrag(sheet, event) {
  const side = sideOf(sheet);
  const axis = vertical(side) ? "clientY" : "clientX";
  const sign = closingSign(sheet, side);
  const dim = dimension(sheet, side);
  const list = snaps(sheet);
  const base = (1 - list[sheet._dsSnap ?? 0]) * dim;
  const handle = event.target.closest(".ds-sheet__handle");
  const state = { pointerId: event.pointerId, start: event[axis], base, position: base, samples: [{ t: event.timeStamp, p: base }], dragging: false, captured: event.target };

  const move = (e) => {
    if (e.pointerId !== state.pointerId) return;
    const delta = (e[axis] - state.start) * sign;
    if (!state.dragging) {
      if (Math.abs(delta) < 4) return;
      state.dragging = true;
      try { state.captured.setPointerCapture(e.pointerId); } catch { /* element gone */ }
      sheet.setAttribute("data-ds-dragging", "");
      sheet.removeAttribute("data-ds-settle");
    }
    let p = state.base + delta;
    if (p < 0) p = -rubber(-p, dim); // past fully open: resistance grows with distance
    state.position = p;
    state.samples.push({ t: e.timeStamp, p });
    if (state.samples.length > 8) state.samples.shift();
    setOffset(sheet, side, p, dim);
  };

  const end = (e) => {
    if (e.pointerId !== state.pointerId) return;
    sheet.removeEventListener("pointermove", move);
    sheet.removeEventListener("pointerup", end);
    sheet.removeEventListener("pointercancel", end);
    if (!state.dragging) return;
    if (handle) handle._dsDragged = true;
    const recent = state.samples.filter((s) => e.timeStamp - s.t < 100);
    const first = recent[0] ?? state.samples[0];
    const last = state.samples.at(-1);
    const velocity = last.t > first.t ? (last.p - first.p) / (last.t - first.t) : 0;
    const projected = state.position + project(velocity);
    const targets = list.map((s) => (1 - s) * dim);
    const dismissable = !isBusy(sheet) && e.type !== "pointercancel";
    let best = 0;
    targets.forEach((tgt, i) => { if (Math.abs(tgt - projected) < Math.abs(targets[best] - projected)) best = i; });
    const flick = Math.abs(velocity) > FLICK;
    const dismiss = dismissable && (Math.abs(dim - projected) < Math.abs(targets[best] - projected) || (flick && velocity > 0 && best === 0 && state.position > targets[0]));
    if (dismiss) {
      if (flick) sheet.setAttribute("data-ds-settle", "flick");
      sheet.removeAttribute("data-ds-dragging");
      closeDialog(sheet, "dismiss");
      return;
    }
    // The bounce spring overshoots in the direction of travel; never past fully open (it would show a gap at the edge).
    sheet.removeAttribute("data-ds-dragging");
    settleTo(sheet, best, { flick: flick && !(list[best] === 1 && velocity < 0) });
  };

  sheet.addEventListener("pointermove", move);
  sheet.addEventListener("pointerup", end);
  sheet.addEventListener("pointercancel", end);
}

/* ------------------------------------------------------------------ setup */
const prepared = new WeakSet();
function prepare(sheet) {
  if (prepared.has(sheet)) return;
  prepared.add(sheet);
  const handle = sheet.querySelector(".ds-sheet__handle");
  if (handle) {
    if (handle.tagName === "BUTTON" && !handle.hasAttribute("type")) handle.type = "button";
    if (!handle.hasAttribute("aria-label")) handle.setAttribute("aria-label", t(snaps(sheet).length > 1 ? "sheet.handle" : "sheet.handleClose"));
  }
  sheet.querySelectorAll(".ds-sheet__close:not([aria-label])").forEach((button) => button.setAttribute("aria-label", t("sheet.close")));
  sheet.addEventListener("pointerdown", (event) => {
    if (!sheet.open || event.button !== 0 || isBusy(sheet)) return;
    const target = event.target instanceof Element ? event.target : null;
    if (!target || target.closest("button:not(.ds-sheet__handle), a, input, select, textarea, label, [contenteditable], [data-ds-no-drag]")) return;
    const onHandle = target.closest(".ds-sheet__handle, [data-ds-sheet-drag]");
    const onHeader = target.closest(".ds-sheet__header");
    if (onHandle || (onHeader && event.pointerType !== "mouse")) startDrag(sheet, event);
  });
  sheet.addEventListener("transitionend", (event) => {
    if (event.target === sheet && event.propertyName === "translate") sheet.removeAttribute("data-ds-settle");
  });
  sheet.addEventListener("close", () => {
    sheet.removeAttribute("data-ds-dragging");
    window.setTimeout(() => { if (!sheet.open) sheet.removeAttribute("data-ds-settle"); }, 400);
    emit(sheet, "close");
  });
}

function stepHandle(sheet, step) {
  const list = snaps(sheet);
  const i = (sheet._dsSnap ?? 0) + step;
  if (i < 0) { close(sheet); return; }
  settleTo(sheet, Math.min(list.length - 1, i));
}

export function wire() {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const opener = target.closest("[data-ds-sheet-open]");
    if (opener) { event.preventDefault(); if (opener.getAttribute("aria-disabled") !== "true") open(opener.getAttribute("data-ds-sheet-open"), opener); return; }
    const closer = target.closest("[data-ds-sheet-close]");
    if (closer) { const sheet = closer.closest("dialog"); if (sheet && !isBusy(sheet)) close(sheet); return; }
    const handle = target.closest(".ds-sheet__handle");
    if (handle) {
      if (handle._dsDragged) { handle._dsDragged = false; return; }
      const sheet = handle.closest(".ds-sheet");
      const list = snaps(sheet);
      if (list.length < 2) close(sheet);
      else settleTo(sheet, ((sheet._dsSnap ?? 0) + 1) % list.length);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const modeless = event.target instanceof Element ? event.target.closest("dialog.ds-sheet[open][data-ds-modeless]") : null;
      if (modeless && !isBusy(modeless)) { event.preventDefault(); close(modeless); }
      return;
    }
    const handle = event.target instanceof Element ? event.target.closest(".ds-sheet__handle") : null;
    if (!handle) return;
    const sheet = handle.closest(".ds-sheet");
    if (!sheet || !vertical(sideOf(sheet))) return;
    const grow = sideOf(sheet) === "bottom" ? "ArrowUp" : "ArrowDown";
    const shrink = grow === "ArrowUp" ? "ArrowDown" : "ArrowUp";
    if (event.key === grow) { event.preventDefault(); stepHandle(sheet, 1); }
    else if (event.key === shrink) { event.preventDefault(); stepHandle(sheet, -1); }
  });

  // Rotation or resize: keep the snap point (offsets are in px).
  window.addEventListener("resize", () => {
    document.querySelectorAll("dialog.ds-sheet[open][data-ds-sheet-snap]").forEach((sheet) => settleTo(sheet, sheet._dsSnap ?? 0));
  }, { passive: true });
}

export function init(root) {
  root.querySelectorAll?.("dialog.ds-sheet").forEach(prepare);
}

export const api = {
  sheet: {
    open,
    close,
    snap: (target, index) => { const sheet = resolve(target); if (sheet?.open) settleTo(sheet, index); },
  },
};
