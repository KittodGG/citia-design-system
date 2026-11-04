/* Feedback behaviours: toast, alert and banner dismissal, notification bell helpers.
   Owner: batch A8 feedback. Contract: docs/_contributing.md.

   Toast: stacked (3 visible, the rest behind, expanded on hover or focus), paused on hover, focus, window blur and while
   swiping, swipe to dismiss with velocity on touch, positions, action button (stays until used), loading → success/error.
   API: DS.toast({ tone, title, text, timeout, stack, id, position, action, closeButton }) → { id, close, update }
        DS.toast.promise(promise, { loading, success, error }), DS.toast.success|error|info|warning|loading(title, options),
        DS.toast.dismiss(id?)
   Hooks: [data-ds-toast-show="tone" data-ds-toast-title data-ds-toast-text data-ds-toast-action data-ds-toast-id
          data-ds-toast-position data-ds-toast-timeout], loading demo: data-ds-toast-show="loading" data-ds-toast-resolve="success|error"
          data-ds-toast-resolve-title|text|after, server-rendered [data-ds-toast] with [data-ds-toast-close].
   Alert and banner: [data-ds-alert-close], [data-ds-banner-close], [data-ds-banner="id"] remembers dismissal.
   Notification bell: [data-ds-notif-read-all]. Events: ds:toast:close, ds:toast:action, ds:alert:dismiss, ds:banner:dismiss,
   ds:notif:read-all. */
import { config, reduceMotion, icon, t, addMessages, focusQuietly, key, store, registerIcons } from "../core.js";

addMessages({
  en: {
    "toast.close": "Close notification",
    "toast.region": "Notifications (Alt+T)",
    "alert.dismiss": "Dismiss",
    "banner.dismiss": "Dismiss banner",
    "notif.label": "Notifications: {count} unread",
    "notif.none": "Notifications",
  },
  id: {
    "toast.close": "Tutup notifikasi",
    "toast.region": "Notifikasi (Alt+T)",
    "alert.dismiss": "Tutup",
    "banner.dismiss": "Tutup banner",
    "notif.label": "Notifikasi: {count} belum dibaca",
    "notif.none": "Notifikasi",
  },
});

registerIcons({ loading: '<path d="M21 12a9 9 0 1 1-6.22-8.56"/>' });

const LIMIT = 3; // visible when collapsed
const MAX = 8; // kept per region; the oldest leaves first
const PEEK = 10; // px of each toast showing behind the newest
const GAP = 8; // px between expanded toasts
const POSITIONS = ["bottom-end", "bottom-center", "bottom-start", "top-end", "top-center", "top-start"];

const states = new WeakMap();
const wired = new WeakSet();
let seq = 0;
let returnFocus = null;

const positionOf = (region) => {
  const value = region.dataset.position || region.getAttribute("data-ds-toast-region") || "bottom-end";
  return POSITIONS.includes(value) ? value : "bottom-end";
};

const allRegions = () => [...document.querySelectorAll("[data-ds-toast-region]")];
const live = (region) => [...region.children].filter((n) => n.classList.contains("ds-toast") && !n.hasAttribute("data-leaving"));

/* ------------------------------------------------------------------ regions */
function getRegion(position = "bottom-end") {
  let region = allRegions().find((r) => positionOf(r) === position);
  if (!region) {
    region = document.createElement("div");
    region.className = "ds-toast-region";
    region.setAttribute("data-ds-toast-region", "");
    region.dataset.position = position;
    document.body.append(region);
  }
  wireRegion(region);
  return region;
}

function wireRegion(region) {
  if (wired.has(region)) return;
  wired.add(region);
  region.dataset.position = positionOf(region);
  if (!region.hasAttribute("aria-live")) region.setAttribute("aria-live", "polite");
  if (!region.hasAttribute("role")) region.setAttribute("role", "region");
  if (!region.hasAttribute("aria-label")) region.setAttribute("aria-label", t("toast.region"));
  region.setAttribute("aria-relevant", "additions text");

  region.addEventListener("pointerenter", (e) => { if (e.pointerType !== "touch") { region._hover = true; refresh(region); } });
  region.addEventListener("pointerleave", (e) => { if (e.pointerType !== "touch") { region._hover = false; refresh(region); } });
  region.addEventListener("focusin", () => { region._focus = true; refresh(region); });
  region.addEventListener("focusout", (e) => {
    if (e.relatedTarget instanceof Node && region.contains(e.relatedTarget)) return;
    region._focus = false;
    refresh(region);
  });
  region.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const node = e.target instanceof Element ? e.target.closest(".ds-toast") : null;
    if (!node) return;
    dismissToast(node);
    if (returnFocus?.isConnected) focusQuietly(returnFocus);
  });
  region.addEventListener("pointerup", (e) => {
    if (e.pointerType !== "touch" || region._dragged) return;
    if (live(region).length > 1 && !region._tap && !(e.target instanceof Element && e.target.closest("button, a"))) {
      region._tap = true;
      refresh(region);
    }
  });
  new MutationObserver(() => refresh(region)).observe(region, { childList: true });
}

const isPaused = (region) => !document.hasFocus() || document.visibilityState === "hidden" || region._hover || region._focus || region._dragging;

function refresh(region) {
  const expanded = Boolean(region._hover || region._focus || region._tap || region._dragging);
  region.toggleAttribute("data-expanded", expanded);
  layout(region);
  syncTimers(region);
}

function layout(region) {
  const items = live(region);
  const n = items.length;
  if (!n) { region.style.setProperty("--ds-toast-region-h", "0px"); return; }
  const expanded = region.hasAttribute("data-expanded");
  items.forEach((node) => { node.style.height = ""; node.style.overflow = ""; });
  const heights = items.map((node) => node.offsetHeight);
  const front = heights[n - 1];
  let offset = 0;
  for (let idx = 0; idx < n; idx += 1) {
    const node = items[n - 1 - idx];
    const h = heights[n - 1 - idx];
    node.dataset.index = String(idx);
    node.style.zIndex = String(100 - idx);
    if (expanded) {
      node.style.setProperty("--ds-toast-y", `${offset}px`);
      node.style.setProperty("--ds-toast-s", "1");
      node.toggleAttribute("data-hidden", false);
      offset += h + GAP;
    } else {
      node.style.setProperty("--ds-toast-y", `${idx * PEEK}px`);
      node.style.setProperty("--ds-toast-s", String(Math.max(0.8, 1 - idx * 0.05)));
      node.toggleAttribute("data-hidden", idx >= LIMIT);
      if (idx > 0) { node.style.height = `${front}px`; node.style.overflow = "hidden"; }
    }
  }
  region.style.setProperty("--ds-toast-region-h", `${expanded ? Math.max(0, offset - GAP) : front}px`);
}

/* ------------------------------------------------------------------ timers (remaining time survives pauses) */
function startTimer(st) {
  if (st.persistent || st.timer || st.remaining == null) return;
  st.startedAt = performance.now();
  st.timer = window.setTimeout(() => { st.timer = 0; dismissToast(st.node); }, st.remaining);
}

function stopTimer(st) {
  if (!st.timer) return;
  window.clearTimeout(st.timer);
  st.timer = 0;
  st.remaining = Math.max(1500, st.remaining - (performance.now() - st.startedAt));
}

function syncTimers(region) {
  const paused = isPaused(region);
  for (const node of live(region)) {
    const st = states.get(node);
    if (!st) continue;
    if (paused) stopTimer(st);
    else startTimer(st);
  }
}

const syncAll = () => allRegions().forEach(syncTimers);

function autoTimeout(o) {
  const base = config.toastTimeout;
  return `${o.title ?? ""}${o.text ?? ""}`.length > 80 ? Math.min(8000, base + 2000) : base;
}

function isPersistent(o) {
  if (o.timeout === 0 || o.timeout === Infinity) return true;
  if (typeof o.timeout === "number") return false;
  return o.tone === "error" || o.tone === "loading" || Boolean(o.action);
}

/* ------------------------------------------------------------------ dismiss */
export function dismissToast(node, { swipe = false } = {}) {
  if (!node?.isConnected || node.hasAttribute("data-leaving")) return;
  const st = states.get(node);
  if (st) { window.clearTimeout(st.timer); st.timer = 0; }
  const region = node.parentElement;
  node.dispatchEvent(new CustomEvent("ds:toast:close", { bubbles: true, detail: { id: st?.id } }));
  if (node.contains(document.activeElement) && region) {
    const target = returnFocus?.isConnected ? returnFocus : null;
    if (target) focusQuietly(target); else document.activeElement.blur?.();
  }
  node.setAttribute("data-leaving", "");
  node.setAttribute("aria-hidden", "true");
  const done = () => {
    node.remove();
    if (region) { region._dragging = false; if (!live(region).length) { region._tap = false; region._hover = false; } refresh(region); }
  };
  if (region) layout(region);
  const ms = reduceMotion() ? 150 : swipe ? Number.parseFloat(node.style.getPropertyValue("--ds-toast-swipe-ms")) + 40 || 240 : 200;
  window.setTimeout(done, ms);
}

/* ------------------------------------------------------------------ swipe */
function swipeSetup(region) {
  const pos = positionOf(region);
  if (pos.endsWith("center")) return { axis: "y", sign: pos.startsWith("top") ? -1 : 1 };
  const rtl = getComputedStyle(region).direction === "rtl";
  return { axis: "x", sign: pos.endsWith("end") !== rtl ? 1 : -1 };
}

function attachSwipe(node) {
  let drag = null;
  const reset = (snap) => {
    node.removeAttribute("data-dragging");
    node.parentElement && (node.parentElement._dragging = false);
    if (snap) { node.style.setProperty("--ds-toast-x", "0px"); node.style.setProperty("--ds-toast-dy", "0px"); }
  };

  node.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" || !e.isPrimary || (e.target instanceof Element && e.target.closest("button, a, input, textarea, select"))) return;
    const region = node.parentElement;
    if (!region) return;
    const { axis, sign } = swipeSetup(region);
    node.style.touchAction = axis === "x" ? "pan-y" : "pan-x";
    drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, axis, sign, active: false, eff: 0, samples: [{ t: e.timeStamp, p: 0 }], size: axis === "x" ? node.offsetWidth : node.offsetHeight };
  });

  node.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag.axis === "x" ? e.clientX - drag.x0 : e.clientY - drag.y0;
    const cross = drag.axis === "x" ? e.clientY - drag.y0 : e.clientX - drag.x0;
    if (!drag.active) {
      if (Math.abs(cross) > 10 && Math.abs(cross) > Math.abs(d)) { drag = null; return; }
      if (Math.abs(d) < 6) return;
      drag.active = true;
      node.setPointerCapture(e.pointerId);
      node.setAttribute("data-dragging", "");
      const region = node.parentElement;
      if (region) { region._dragging = true; region._dragged = true; refresh(region); }
    }
    drag.eff = d * drag.sign >= 0 ? d : d * 0.12;
    node.style.setProperty(drag.axis === "x" ? "--ds-toast-x" : "--ds-toast-dy", `${drag.eff}px`);
    drag.samples.push({ t: e.timeStamp, p: drag.eff });
    while (drag.samples.length > 2 && e.timeStamp - drag.samples[0].t > 100) drag.samples.shift();
  });

  const finish = (e, cancelled) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag;
    drag = null;
    const region = node.parentElement;
    window.setTimeout(() => { if (region) region._dragged = false; }, 0);
    if (!d.active) return;
    const first = d.samples[0];
    const last = d.samples.at(-1);
    const velocity = last.t > first.t ? ((last.p - first.p) / (last.t - first.t)) * d.sign : 0; // px per ms toward the dismiss edge
    const travelled = Math.max(0, d.eff * d.sign);
    const projected = travelled + Math.max(0, velocity) * 120;
    const threshold = Math.min(100, d.size * 0.35);
    if (!cancelled && projected > threshold) {
      const target = d.sign * (d.size + 40);
      const remaining = Math.abs(target - d.eff);
      const ms = Math.round(Math.min(280, Math.max(140, remaining / Math.max(velocity, 0.6))));
      node.style.setProperty("--ds-toast-swipe-ms", `${ms}ms`);
      node.setAttribute("data-swiped", "");
      node.removeAttribute("data-dragging");
      node.style.setProperty(d.axis === "x" ? "--ds-toast-x" : "--ds-toast-dy", `${target}px`);
      if (region) region._dragging = false;
      dismissToast(node, { swipe: true });
    } else {
      reset(true);
      if (region) refresh(region);
    }
  };
  node.addEventListener("pointerup", (e) => finish(e, false));
  node.addEventListener("pointercancel", (e) => finish(e, true));
}

/* ------------------------------------------------------------------ build and update */
const glyph = (tone) => (tone === "success" || tone === "warning" || tone === "error" || tone === "loading" ? tone : "info");

function fill(node, o) {
  node.className = `ds-toast is-${o.tone}`;
  node.setAttribute("role", o.tone === "error" ? "alert" : "status");
  node.setAttribute("data-ds-toast", o.tone);
  node.toggleAttribute("aria-busy", o.tone === "loading");
  if (o.tone === "loading") node.setAttribute("aria-busy", "true");
  node.innerHTML = `${icon(glyph(o.tone), "ds-toast__icon")}<div class="ds-toast__body"><p class="ds-toast__title"></p><p class="ds-toast__text"></p></div>${o.closeButton === false ? "" : `<button type="button" class="ds-toast__close" data-ds-toast-close>${icon("x", "ds-icon")}</button>`}`;
  node.querySelector(".ds-toast__title").textContent = o.title ?? "";
  const textEl = node.querySelector(".ds-toast__text");
  if (o.text) textEl.textContent = o.text;
  else textEl.remove();
  const close = node.querySelector("[data-ds-toast-close]");
  if (close) close.setAttribute("aria-label", t("toast.close"));
  if (o.action?.label) {
    const row = document.createElement("div");
    row.className = "ds-toast__actions";
    const el = document.createElement(o.action.href ? "a" : "button");
    el.className = "ds-toast__action";
    if (o.action.href) el.setAttribute("href", o.action.href);
    else el.setAttribute("type", "button");
    el.textContent = o.action.label;
    el.addEventListener("click", (event) => {
      const st = states.get(node);
      o.action.onClick?.(handleOf(node), event);
      node.dispatchEvent(new CustomEvent("ds:toast:action", { bubbles: true, detail: { id: st?.id, trigger: o.trigger ?? null } }));
      if (!o.action.keepOpen) dismissToast(node);
    });
    row.append(el);
    node.querySelector(".ds-toast__body").append(row);
  }
}

function arm(node, o) {
  const st = states.get(node) ?? { node, timer: 0 };
  st.opts = o;
  st.id = o.id ?? st.id ?? `ds-toast-${++seq}`;
  node.dataset.dsToastId = st.id;
  st.persistent = isPersistent(o);
  st.remaining = st.persistent ? null : (typeof o.timeout === "number" ? o.timeout : autoTimeout(o));
  window.clearTimeout(st.timer);
  st.timer = 0;
  states.set(node, st);
  return st;
}

function handleOf(node) {
  const st = states.get(node);
  return {
    id: st?.id,
    close: () => dismissToast(node),
    dismiss: () => dismissToast(node),
    update(next = {}) {
      if (!node.isConnected || node.hasAttribute("data-leaving")) return this;
      const o = { ...st.opts, timeout: undefined, action: undefined, ...next };
      o.tone = o.tone ?? "info";
      fill(node, o);
      arm(node, o);
      const region = node.parentElement;
      region && refresh(region);
      return this;
    },
  };
}

function wireNode(node) {
  if (node._dsWired) return;
  node._dsWired = true;
  node.setAttribute("tabindex", "-1");
  node.addEventListener("click", (e) => {
    if (e.target instanceof Element && e.target.closest("[data-ds-toast-close]")) dismissToast(node);
  });
  attachSwipe(node);
}

/**
 * Show a toast. tone: "success" | "info" | "warning" | "error" | "loading". Errors, loading and toasts with an action stay
 * until closed unless timeout is a number. stack: false replaces what is showing. id: update instead of adding a duplicate.
 */
export function toast(options = {}) {
  const o = { tone: "info", title: "", text: "", stack: true, position: "bottom-end", ...options };
  const region = getRegion(o.position);
  const same = o.id
    ? allRegions().flatMap(live).find((n) => states.get(n)?.id === o.id)
    : live(region).find((n) => { const prev = states.get(n)?.opts; return prev && !prev.action && !o.action && prev.tone === o.tone && prev.title === o.title && prev.text === o.text; });
  if (same) {
    const st = states.get(same);
    if (o.id) return handleOf(same).update(o);
    stopTimer(st);
    st.remaining = st.persistent ? null : autoTimeout(o);
    syncTimers(same.parentElement);
    return handleOf(same);
  }
  if (!o.stack) live(region).forEach((n) => dismissToast(n));
  const node = document.createElement("div");
  fill(node, o);
  arm(node, o);
  wireNode(node);
  region.append(node);
  live(region).slice(0, -MAX).forEach((n) => dismissToast(n));
  refresh(region);
  return handleOf(node);
}

toast.promise = (promise, { loading = "", success, error, ...rest } = {}) => {
  const norm = (v) => (typeof v === "string" ? { title: v } : v ?? {});
  const handle = toast({ ...rest, ...norm(loading), tone: "loading" });
  const source = typeof promise === "function" ? promise() : promise;
  Promise.resolve(source).then(
    (value) => handle.update({ ...rest, ...norm(typeof success === "function" ? success(value) : success), tone: "success" }),
    (reason) => handle.update({ ...rest, ...norm(typeof error === "function" ? error(reason) : error), tone: "error" }),
  );
  handle.promise = source;
  return handle;
};

for (const tone of ["success", "error", "info", "warning", "loading"]) {
  toast[tone] = (title, options = {}) => toast({ ...options, tone, title });
}

toast.dismiss = (id) => {
  for (const node of allRegions().flatMap(live)) if (!id || states.get(node)?.id === id) dismissToast(node);
};

/* ------------------------------------------------------------------ alert and banner */
function nextFocusable(node) {
  const sel = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
  const list = [...document.querySelectorAll(sel)].filter((el) => !node.contains(el) && el.getClientRects().length);
  return list.find((el) => node.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) ?? list.at(-1);
}

function leave(node, done) {
  const hadFocus = node.contains(document.activeElement);
  const target = hadFocus ? nextFocusable(node) : null;
  node.setAttribute("data-leaving", "");
  node.setAttribute("aria-hidden", "true");
  if (target) focusQuietly(target);
  window.setTimeout(done, reduceMotion() ? 0 : 280);
}

export function dismissAlert(node) {
  if (!node || node.hasAttribute("data-leaving")) return;
  if (!node.dispatchEvent(new CustomEvent("ds:alert:dismiss", { bubbles: true, cancelable: true }))) return;
  leave(node, () => node.remove());
}

const bannerStore = (node) => (node.dataset.dsBannerRemember === "session" ? { get: store.sessionGet, set: store.sessionSet } : { get: store.get, set: store.set });
const bannerKey = (id) => key(`banner-${id}`);

function bannerDismissed(node) {
  const id = node.dataset.dsBanner;
  if (!id || node.dataset.dsBannerRemember === "none") return false;
  const raw = bannerStore(node).get(bannerKey(id));
  if (!raw) return false;
  const days = Number(node.dataset.dsBannerDays);
  if (days > 0 && Date.now() - Number(raw) > days * 86400000) {
    bannerStore(node).set(bannerKey(id), null);
    return false;
  }
  return true;
}

export function dismissBanner(target) {
  const node = typeof target === "string" ? document.querySelector(`[data-ds-banner="${CSS.escape(target)}"]`) : target;
  if (!node || node.hasAttribute("data-leaving")) return;
  if (!node.dispatchEvent(new CustomEvent("ds:banner:dismiss", { bubbles: true, cancelable: true, detail: { id: node.dataset.dsBanner } }))) return;
  const id = node.dataset.dsBanner;
  if (id && node.dataset.dsBannerRemember !== "none") bannerStore(node).set(bannerKey(id), String(Date.now()));
  leave(node, () => { node.hidden = true; node.removeAttribute("data-leaving"); node.removeAttribute("aria-hidden"); });
}

function resetBanner(id) {
  const node = document.querySelector(`[data-ds-banner="${CSS.escape(id)}"]`);
  store.set(bannerKey(id), null);
  store.sessionSet(bannerKey(id), "");
  if (node) node.hidden = false;
}

/* ------------------------------------------------------------------ notification bell */
function setUnread(notif, count) {
  const n = Math.max(0, Math.floor(count));
  const badge = notif.querySelector(".ds-notif-count");
  if (badge) { badge.textContent = n > 99 ? "99+" : String(n); badge.hidden = n === 0; }
  notif.dataset.unread = String(n);
  notif.querySelector(".ds-notif-trigger")?.setAttribute("aria-label", n ? t("notif.label", { count: n }) : t("notif.none"));
}

function markAllRead(notif) {
  notif.querySelectorAll(".ds-notif-item:not(.is-read)").forEach((item) => {
    item.classList.add("is-read");
    item.querySelector("[data-ds-notif-unread]")?.setAttribute("hidden", "");
  });
  setUnread(notif, 0);
  notif.dispatchEvent(new CustomEvent("ds:notif:read-all", { bubbles: true }));
}

/* ------------------------------------------------------------------ wiring */
export function wire() {
  document.addEventListener("click", (event) => {
    const el = event.target instanceof Element ? event.target : null;
    if (!el) return;
    const trigger = el.closest("[data-ds-toast-show]");
    if (trigger) {
      const label = trigger.getAttribute("data-ds-toast-action");
      const timeout = trigger.getAttribute("data-ds-toast-timeout");
      const handle = toast({
        tone: trigger.getAttribute("data-ds-toast-show") || "info",
        title: trigger.getAttribute("data-ds-toast-title") || "",
        text: trigger.getAttribute("data-ds-toast-text") || "",
        id: trigger.getAttribute("data-ds-toast-id") || undefined,
        position: trigger.getAttribute("data-ds-toast-position") || undefined,
        timeout: timeout === null ? undefined : Number(timeout),
        trigger,
        action: label ? { label } : undefined,
      });
      const resolve = trigger.getAttribute("data-ds-toast-resolve");
      if (resolve) {
        const after = Number(trigger.getAttribute("data-ds-toast-resolve-after")) || 1800;
        window.setTimeout(() => handle.update({
          tone: resolve,
          title: trigger.getAttribute("data-ds-toast-resolve-title") || "",
          text: trigger.getAttribute("data-ds-toast-resolve-text") || "",
        }), after);
      }
      return;
    }
    const alertClose = el.closest("[data-ds-alert-close]");
    if (alertClose) { dismissAlert(alertClose.closest(".ds-alert")); return; }
    const bannerClose = el.closest("[data-ds-banner-close]");
    if (bannerClose) { dismissBanner(bannerClose.closest(".ds-banner")); return; }
    const readAll = el.closest("[data-ds-notif-read-all]");
    if (readAll) { const notif = readAll.closest(".ds-notif"); if (notif) markAllRead(notif); }
    if (!el.closest("[data-ds-toast-region]")) allRegions().forEach((r) => { if (r._tap) { r._tap = false; refresh(r); } });
  });

  document.addEventListener("keydown", (event) => {
    if (!event.altKey || event.key.toLowerCase() !== "t" || event.ctrlKey || event.metaKey) return;
    const newest = allRegions().flatMap(live).at(-1);
    if (!newest) return;
    event.preventDefault();
    returnFocus = document.activeElement;
    focusQuietly(newest);
  });

  window.addEventListener("blur", syncAll);
  window.addEventListener("focus", syncAll);
  document.addEventListener("visibilitychange", syncAll);
  window.addEventListener("resize", () => allRegions().forEach(layout));
}

export function init(root = document) {
  root.querySelectorAll("[data-ds-toast-region]").forEach(wireRegion);
  root.querySelectorAll("[data-ds-toast]").forEach((node) => {
    if (states.has(node) || !node.parentElement?.matches("[data-ds-toast-region]")) return;
    const tone = node.getAttribute("data-ds-toast") || "info";
    arm(node, { tone, title: "", text: "" });
    wireNode(node);
    refresh(node.parentElement);
  });
  root.querySelectorAll("[data-ds-banner]").forEach((node) => { if (bannerDismissed(node)) node.hidden = true; });
}

export const api = {
  toast,
  alert: { dismiss: dismissAlert },
  banner: { dismiss: dismissBanner, reset: resetBanner },
  notif: { setUnread, markAllRead },
};
