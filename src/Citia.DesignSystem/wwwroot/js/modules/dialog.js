/* Dialog and alert dialog. Owner: batch A9.
   Hooks: [data-ds-dialog-open="id"], [data-ds-dialog-close="value"], [data-ds-initial-focus] / [autofocus],
   dialog[data-ds-dismissible] (press on the scrim closes; sheets and the command palette are dismissible by default,
   data-ds-dismissible="false" opts out), form[data-ds-busy="false"] (no busy state on submit),
   [data-ds-confirm="Title"] (+ data-ds-confirm-text, -label, -tone="danger|primary", -focus="accept") on any element.
   Behaviour: initial focus = [data-ds-initial-focus]/[autofocus] → first field in the body → Close; focus returns to the
   opener (core onDialogClose); Escape closes the top dialog only; nested dialogs dim less and the lower one recedes;
   scroll-edge hairlines on .ds-dialog__body / .ds-sheet__body; submitting a form inside marks the dialog busy
   (aria-busy, spinner after 300 ms, Escape and scrim blocked).
   API: DS.dialog.open(idOrEl, opener), DS.dialog.close(idOrEl, value), DS.dialog.busy(idOrEl, on, button),
        DS.confirm({ title, text, label, tone, focus, action }) → Promise<boolean>.
   Events (bubble): ds:dialog:open, ds:dialog:close (detail.value), ds:confirmed (on the trigger). */
import { openDialog, closeDialog, focusQuietly, t, addMessages } from "../core.js";
import { guard } from "./guard.js";

addMessages({
  en: {
    "dialog.confirmTitle": "Continue?",
    "dialog.confirmAccept": "Delete",
    "dialog.cancel": "Cancel",
    "dialog.close": "Close",
    "dialog.busy": "Working",
    "dialog.failed": "That did not work. Check your connection and try again.",
  },
  id: {
    "dialog.confirmTitle": "Lanjutkan?",
    "dialog.confirmAccept": "Hapus",
    "dialog.cancel": "Batal",
    "dialog.close": "Tutup",
    "dialog.busy": "Sedang diproses",
    "dialog.failed": "Gagal diproses. Periksa koneksi lalu coba lagi.",
  },
});

const FIELD = "input:not([type=hidden], [type=button], [type=submit], [type=reset], [disabled], [readonly]), select:not([disabled]), textarea:not([disabled], [readonly]), [contenteditable=true]";
const CLOSE = ".ds-dialog__close, .ds-dialog-close, .ds-sheet__close";
const BODY = ".ds-dialog__body, .ds-sheet__body";
const stack = [];

const resolve = (target) => (typeof target === "string" ? document.getElementById(target) : target);
const visible = (el) => el.getClientRects().length > 0;
const emit = (el, name, detail) => el.dispatchEvent(new CustomEvent(`ds:dialog:${name}`, { bubbles: true, detail }));
export const isBusy = (dialog) => dialog?.getAttribute("aria-busy") === "true";

/* ------------------------------------------------------------------ scroll-edge hairlines */
const resizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver((entries) => entries.forEach((e) => syncScroll(e.target))) : null;

/** Mark a scroll body: data-ds-scrolled (content hidden above), data-ds-more (content hidden below). */
export function syncScroll(body) {
  if (!body) return;
  const rest = body.scrollHeight - body.clientHeight - body.scrollTop;
  body.toggleAttribute("data-ds-scrolled", body.scrollTop > 1);
  body.toggleAttribute("data-ds-more", rest > 1);
}

export function watchScroll(container) {
  container.querySelectorAll(BODY).forEach((body) => {
    syncScroll(body);
    resizeObserver?.observe(body);
    // A long body that cannot take focus otherwise must be reachable by keyboard for scrolling.
    if (!body.hasAttribute("tabindex") && body.scrollHeight > body.clientHeight && !body.querySelector(FIELD + ", a[href], button")) body.tabIndex = 0;
  });
}

function unwatchScroll(container) {
  container.querySelectorAll(BODY).forEach((body) => resizeObserver?.unobserve(body));
}

/* ------------------------------------------------------------------ open / close */
/** Element that should receive focus when the dialog opens. */
export function initialFocus(dialog) {
  const explicit = dialog.querySelector("[data-ds-initial-focus], [autofocus]");
  if (explicit) return explicit;
  if (dialog.getAttribute("role") === "alertdialog") {
    return dialog.querySelector("[data-ds-confirm-cancel], [data-ds-leave-stay], [data-ds-dialog-close]:not(.ds-dialog__close)") ?? dialog.querySelector(CLOSE);
  }
  const scope = dialog.querySelector(".ds-dialog__body, .ds-dialog-body, .ds-sheet__body") ?? dialog;
  const field = [...scope.querySelectorAll(FIELD)].find(visible);
  return field ?? dialog.querySelector(CLOSE) ?? null;
}

/** Open a modal dialog (any <dialog>, including sheets). Returns the dialog. */
export function open(target, opener) {
  const dialog = resolve(target);
  if (!(dialog instanceof HTMLDialogElement) || dialog.open) return dialog ?? null;
  const below = [...stack].reverse().find((d) => d.open);
  openDialog(dialog, opener ?? document.activeElement);
  if (!dialog.open) return dialog;
  stack.push(dialog);
  if (below) {
    dialog.setAttribute("data-ds-nested", "");
    below.setAttribute("data-ds-covered", "");
    dialog._dsBelow = below;
  }
  const first = initialFocus(dialog);
  if (first) focusQuietly(first);
  watchScroll(dialog);
  emit(dialog, "open");
  return dialog;
}

/** Close a dialog unless it is busy. value becomes dialog.returnValue. */
export function close(target, value = "") {
  const dialog = resolve(target);
  if (!dialog?.open || isBusy(dialog)) return;
  closeDialog(dialog, value);
}

/** Busy state while the dialog submits: blocks Escape, the scrim and Close; spinner on the button after 300 ms. */
export function busy(target, on = true, button) {
  const dialog = resolve(target);
  if (!dialog) return;
  const submit = button ?? dialog._dsBusyButton;
  if (on) {
    dialog.setAttribute("aria-busy", "true");
    dialog.querySelectorAll(CLOSE).forEach((el) => { if (!el.disabled) { el.disabled = true; el._dsBusyDisabled = true; } });
    if (submit) {
      dialog._dsBusyButton = submit;
      submit.setAttribute("aria-busy", "true");
      submit.setAttribute("aria-disabled", "true");
      window.clearTimeout(submit._dsSpinTimer);
      submit._dsSpinTimer = window.setTimeout(() => {
        if (submit.getAttribute("aria-busy") !== "true" || submit.querySelector(".ds-spinner")) return;
        const spinner = document.createElement("span");
        spinner.className = "ds-spinner";
        spinner.setAttribute("aria-hidden", "true");
        submit.prepend(spinner);
      }, 300);
    }
  } else {
    dialog.removeAttribute("aria-busy");
    dialog.querySelectorAll(CLOSE).forEach((el) => { if (el._dsBusyDisabled) { el.disabled = false; el._dsBusyDisabled = false; } });
    if (submit) {
      window.clearTimeout(submit._dsSpinTimer);
      submit.removeAttribute("aria-busy");
      submit.removeAttribute("aria-disabled");
      submit.querySelector(":scope > .ds-spinner")?.remove();
      dialog._dsBusyButton = null;
    }
  }
}

function dismissible(dialog) {
  const value = dialog.getAttribute("data-ds-dismissible");
  if (value !== null) return value !== "false";
  return dialog.matches(".ds-sheet, .ds-command-dialog");
}

/* ------------------------------------------------------------------ alert dialog (confirmation) */
function getConfirmDialog() {
  let dialog = document.getElementById("ds-confirm");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "ds-confirm";
    dialog.className = "modal";
    dialog.setAttribute("aria-labelledby", "ds-confirm-title");
    dialog.setAttribute("aria-describedby", "ds-confirm-text");
    // Static markup only; every text below is set with textContent.
    dialog.innerHTML = '<div class="modal-box ds-dialog is-sm"><h2 id="ds-confirm-title" class="ds-dialog-title" data-ds-confirm-title></h2><p id="ds-confirm-text" class="ds-dialog-desc" data-ds-confirm-text></p><div class="modal-action"><button type="button" class="btn" data-ds-confirm-cancel></button><button type="button" class="btn btn-error" data-ds-confirm-accept></button></div></div>';
    dialog.querySelector("[data-ds-confirm-cancel]").textContent = t("dialog.cancel");
    document.body.append(dialog);
  }
  dialog.setAttribute("role", "alertdialog");
  if (!dialog.querySelector("[data-ds-confirm-error]")) {
    const error = document.createElement("p");
    error.className = "ds-dialog__error";
    error.setAttribute("role", "alert");
    error.setAttribute("data-ds-confirm-error", "");
    error.hidden = true;
    dialog.querySelector(".modal-action, .ds-dialog__footer")?.before(error);
  }
  return dialog;
}

/**
 * Ask before a consequential action. Resolves true when accepted.
 * tone "danger" (default, red action) or "primary". Cancel gets the initial focus unless focus: "accept".
 * action: optional async function run while the dialog shows a busy state; a rejection keeps the dialog open with an error.
 */
export function confirm({ title, text = "", label, tone = "danger", focus = "cancel", action } = {}, opener) {
  const dialog = getConfirmDialog();
  dialog.querySelector("[data-ds-confirm-title]").textContent = title || t("dialog.confirmTitle");
  const textEl = dialog.querySelector("[data-ds-confirm-text]");
  textEl.textContent = text;
  textEl.hidden = !text;
  const errorEl = dialog.querySelector("[data-ds-confirm-error]");
  if (errorEl) { errorEl.hidden = true; errorEl.textContent = ""; }
  const accept = dialog.querySelector("[data-ds-confirm-accept]");
  const cancel = dialog.querySelector("[data-ds-confirm-cancel]");
  accept.textContent = label || t("dialog.confirmAccept");
  accept.className = `btn ${tone === "primary" ? "btn-primary" : "btn-error"}`;
  accept.disabled = false;
  busy(dialog, false, accept);
  return new Promise((resolvePromise) => {
    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      accept.removeEventListener("click", onAccept);
      cancel.removeEventListener("click", onCancel);
      dialog.removeEventListener("close", onClose);
      resolvePromise(ok);
    };
    const onAccept = async () => {
      if (isBusy(dialog)) return;
      if (typeof action === "function") {
        busy(dialog, true, accept);
        try {
          await action();
        } catch (error) {
          busy(dialog, false, accept);
          if (errorEl) { errorEl.textContent = error?.message || t("dialog.failed"); errorEl.hidden = false; }
          focusQuietly(accept);
          return;
        }
        busy(dialog, false, accept);
      }
      accept.disabled = true;
      closeDialog(dialog, "accept");
      finish(true);
    };
    const onCancel = () => close(dialog, "cancel");
    const onClose = () => finish(dialog.returnValue === "accept");
    accept.addEventListener("click", onAccept);
    cancel.addEventListener("click", onCancel);
    dialog.addEventListener("close", onClose);
    dialog.returnValue = "";
    open(dialog, opener);
    focusQuietly(focus === "accept" ? accept : cancel);
  });
}

/* ------------------------------------------------------------------ wiring */
export function wire() {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const opener = target.closest("[data-ds-dialog-open]");
    if (opener) {
      event.preventDefault();
      if (opener.getAttribute("aria-disabled") === "true") return;
      open(opener.getAttribute("data-ds-dialog-open"), opener);
      return;
    }
    const closer = target.closest("[data-ds-dialog-close]");
    if (closer) { close(closer.closest("dialog"), closer.getAttribute("data-ds-dialog-close") || ""); return; }

    const trigger = target.closest("[data-ds-confirm]");
    if (!trigger || trigger._dsConfirmed) return;
    event.preventDefault();
    if (trigger.getAttribute("aria-disabled") === "true") return;
    confirm({
      title: trigger.getAttribute("data-ds-confirm") || undefined,
      text: trigger.getAttribute("data-ds-confirm-text") || "",
      label: trigger.getAttribute("data-ds-confirm-label") || undefined,
      tone: trigger.getAttribute("data-ds-confirm-tone") || "danger",
      focus: trigger.getAttribute("data-ds-confirm-focus") || "cancel",
    }, trigger).then((ok) => {
      if (!ok) return;
      trigger._dsConfirmed = true;
      const form = trigger.form ?? (trigger.matches("button, input") ? trigger.closest("form") : null);
      if (form) { guard.allow(); form.requestSubmit(trigger.matches("[type=submit], button:not([type])") ? trigger : undefined); }
      else if (trigger.matches("a[href]")) { guard.allow(); location.assign(trigger.href); }
      else trigger.dispatchEvent(new CustomEvent("ds:confirmed", { bubbles: true }));
      trigger._dsConfirmed = false;
    });
  });

  // Scrim press closes dismissible dialogs. Both pointerdown and click must land outside the box,
  // so selecting text inside and releasing outside never closes the dialog.
  let downOutside = null;
  const outside = (dialog, event) => {
    const box = dialog.querySelector(":scope > .modal-box, :scope > [data-ds-dialog-box]") ?? dialog;
    const r = box.getBoundingClientRect();
    return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
  };
  document.addEventListener("pointerdown", (event) => {
    const dialog = event.target;
    downOutside = dialog instanceof HTMLDialogElement && dialog.open && outside(dialog, event) ? dialog : null;
  }, true);
  document.addEventListener("click", (event) => {
    const dialog = event.target;
    const started = downOutside;
    downOutside = null;
    if (!(dialog instanceof HTMLDialogElement) || !dialog.open || started !== dialog) return;
    if (!dismissible(dialog) || isBusy(dialog) || !outside(dialog, event)) return;
    closeDialog(dialog, "dismiss");
  });

  // Escape: busy dialogs stay open.
  document.addEventListener("cancel", (event) => {
    if (event.target instanceof HTMLDialogElement && isBusy(event.target)) event.preventDefault();
  }, true);

  // Edge hairlines follow the scroll position of any dialog or sheet body.
  document.addEventListener("scroll", (event) => {
    if (event.target instanceof Element && event.target.matches(BODY)) syncScroll(event.target);
  }, { capture: true, passive: true });

  // Submitting a form inside an open dialog marks it busy (the server answers with a new page or a redirect).
  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (event.defaultPrevented || !(form instanceof HTMLFormElement)) return;
    const dialog = form.closest("dialog[open]");
    if (!dialog || form.method === "dialog" || form.getAttribute("data-ds-busy") === "false") return;
    if (isBusy(dialog)) { event.preventDefault(); return; }
    busy(dialog, true, event.submitter ?? form.querySelector("[type=submit], button:not([type])"));
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) document.querySelectorAll("dialog[aria-busy='true']").forEach((d) => busy(d, false));
  });

  // Bookkeeping when any dialog closes (Escape, form method=dialog, script).
  document.addEventListener("close", (event) => {
    const dialog = event.target;
    if (!(dialog instanceof HTMLDialogElement)) return;
    const index = stack.indexOf(dialog);
    if (index >= 0) stack.splice(index, 1);
    dialog.removeAttribute("data-ds-nested");
    dialog._dsBelow?.removeAttribute("data-ds-covered");
    dialog._dsBelow = null;
    if (isBusy(dialog)) busy(dialog, false);
    unwatchScroll(dialog);
    emit(dialog, "close", { value: dialog.returnValue });
  }, true);
}

const seen = new WeakSet();

export function init(root) {
  // dialog[data-ds-open-on-load]: reopen after a server round trip (validation errors), once per element.
  root.querySelectorAll?.("dialog[data-ds-open-on-load]").forEach((dialog) => {
    if (seen.has(dialog)) return;
    seen.add(dialog);
    if (dialog.open) watchScroll(dialog);
    else open(dialog);
  });
}

export const api = { confirm, dialog: { open, close, busy, confirm } };
