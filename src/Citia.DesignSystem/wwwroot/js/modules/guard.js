/* Unsaved-changes guard: form[data-ds-guard] (+ data-ds-guard-dirty), a[data-ds-guard-skip], form[data-ds-logout].
   Intercepts same-origin links, the browser Back button (one guard history entry) and logout; reload/close uses the
   browser prompt. Dialog: #ds-leave with [data-ds-leave-stay] / [data-ds-leave-go].
   State: a guarded form carries data-ds-dirty while it differs from its snapshot; an optional [data-ds-guard-status]
   inside it announces "Unsaved changes" (polite live region). Event: ds:guard:change { dirty } on the form. */
import { openDialog, closeDialog, focusQuietly, t, addMessages } from "../core.js";

addMessages({
  en: { "guard.fallback": "You have unsaved changes. Leave without saving?", "guard.unsaved": "Unsaved changes" },
  id: { "guard.fallback": "Perubahan belum disimpan. Keluar tanpa menyimpan?", "guard.unsaved": "Ada perubahan yang belum disimpan" },
});

/** Reflect one form's dirty state on the form (data-ds-dirty), its status line and a ds:guard:change event. */
function reflect(form, dirty) {
  if (form.hasAttribute("data-ds-dirty") === dirty) return;
  form.toggleAttribute("data-ds-dirty", dirty);
  const status = form.querySelector("[data-ds-guard-status]");
  if (status) {
    if (!status.hasAttribute("aria-live")) status.setAttribute("aria-live", "polite");
    status.textContent = dirty ? t("guard.unsaved") : "";
  }
  form.dispatchEvent(new CustomEvent("ds:guard:change", { bubbles: true, detail: { dirty } }));
}

let reflectFrame = 0;
function scheduleReflect() {
  if (reflectFrame) return;
  reflectFrame = requestAnimationFrame(() => {
    reflectFrame = 0;
    for (const form of guard.forms) if (form.isConnected) reflect(form, guard.isFormDirty(form));
  });
}

export const guard = {
  forms: new Set(),
  allowed: false,
  armed: false,
  snapshot(form) {
    const entries = [];
    for (const [name, value] of new FormData(form)) {
      if (/^(__RequestVerificationToken|_token|csrfmiddlewaretoken)$/i.test(name)) continue;
      entries.push([name, value instanceof File ? value.name : value]);
    }
    return JSON.stringify(entries);
  },
  register(form) {
    if (this.forms.has(form)) return;
    this.forms.add(form);
    form._dsSnapshot = this.snapshot(form);
  },
  /** One form differs from its snapshot (or is marked dirty by the app). */
  isFormDirty(form) {
    return form.hasAttribute("data-ds-guard-dirty") || this.snapshot(form) !== form._dsSnapshot;
  },
  isDirty() {
    if (this.allowed) return false;
    for (const form of this.forms) {
      if (!form.isConnected) { this.forms.delete(form); continue; }
      if (this.isFormDirty(form)) return true;
    }
    return false;
  },
  /** Leave without asking (after a successful save, or on an explicit Cancel). */
  allow() { this.allowed = true; },
  /** Take fresh snapshots (after an async fill or a save without navigation). */
  reset() {
    this.allowed = false;
    this.armed = false;
    for (const form of this.forms) { form._dsSnapshot = this.snapshot(form); reflect(form, this.isFormDirty(form)); }
  },
};

let pendingLeave = null;

/** Ask before leaving a dirty page; go() runs when the user chooses to leave. */
export function askToLeave(go) {
  const dialog = document.getElementById("ds-leave");
  if (!dialog) {
    if (window.confirm(t("guard.fallback"))) { guard.allow(); go(); }
    return;
  }
  if (dialog.open) return;
  pendingLeave = go;
  openDialog(dialog);
  focusQuietly(dialog.querySelector("[data-ds-leave-stay]"));
}

function armHistory() {
  if (guard.armed || !guard.isDirty()) return;
  guard.armed = true;
  // Added during a user action so browsers keep it; Back then lands here first and the dialog can ask.
  history.pushState({ dsGuard: true }, "", location.href);
}

export function wire() {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const stay = target.closest("[data-ds-leave-stay]");
    if (stay) { pendingLeave = null; closeDialog(stay.closest("dialog")); return; }
    const go = target.closest("[data-ds-leave-go]");
    if (go) { const next = pendingLeave; pendingLeave = null; guard.allow(); closeDialog(go.closest("dialog")); next?.(); return; }

    const link = target.closest("a[href]");
    if (!link || !guard.forms.size || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.hasAttribute("data-ds-guard-skip")) { guard.allow(); return; }
    if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return;
    const url = new URL(link.href, location.href);
    if (!/^https?:$/.test(url.protocol) || (url.pathname === location.pathname && url.search === location.search && url.hash)) return;
    if (guard.isDirty()) { event.preventDefault(); askToLeave(() => location.assign(url.href)); }
  });

  document.addEventListener("pointerdown", () => { if (guard.forms.size) armHistory(); }, true);
  const onEdit = (event) => {
    if (!(event.target instanceof Element) || !event.target.closest("form[data-ds-guard]")) return;
    armHistory();
    scheduleReflect();
  };
  document.addEventListener("input", onEdit);
  document.addEventListener("change", onEdit);
  document.addEventListener("reset", (event) => { if (event.target instanceof HTMLFormElement && guard.forms.has(event.target)) setTimeout(scheduleReflect, 0); });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (form.matches("[data-ds-guard]")) {
      guard.allow();
      // A later handler (client validation) may cancel the submit: then the page is still dirty and guarded.
      queueMicrotask(() => { if (event.defaultPrevented) guard.allowed = false; });
    }
    // Logging out of a dirty page asks first; "Leave" in the dialog submits for real.
    if (form.matches("[data-ds-logout]") && !form._dsLeaving && guard.forms.size && guard.isDirty()) {
      event.preventDefault();
      askToLeave(() => { form._dsLeaving = true; guard.allow(); form.requestSubmit(); });
    }
  });

  window.addEventListener("popstate", () => {
    if (!guard.armed) return;
    if (!guard.isDirty()) { guard.armed = false; history.back(); return; }
    history.pushState({ dsGuard: true }, "", location.href);
    askToLeave(() => { guard.armed = false; history.go(-2); });
  });

  window.addEventListener("beforeunload", (event) => {
    if (!guard.isDirty()) return;
    event.preventDefault();
    event.returnValue = "";
  });

  window.addEventListener("pageshow", (event) => { if (event.persisted) guard.allowed = false; });
}

export function init(root) {
  root.querySelectorAll("form[data-ds-guard]").forEach((form) => guard.register(form));
}

export const api = { guard };
