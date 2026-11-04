/* Form helpers: export lock, copy to clipboard, password show/hide, auto-submit selects, submit once with busy label,
   native range fill.
   Hooks: a[data-ds-export="Excel"], [data-ds-copy="selector"] / [data-ds-copy-text] (+ data-ds-copy-message),
   [data-ds-password-toggle][aria-controls] (+ [data-ds-password-icon="hidden|shown"]), select[data-ds-autosubmit],
   form[data-ds-once] (+ button[data-ds-loading-label], [data-ds-save-status]), input[type=range] (sets --ds-range-fill).
   States: busy controls get aria-busy="true" and keep their width; the spinner appears only after 300 ms;
   copy success (.is-copied) and copy failure (.is-error) last 1.8 s, then return to rest. */
import { config, focusQuietly, t, addMessages } from "../core.js";
import { toast } from "./toast.js";

addMessages({
  en: {
    "forms.exportTitle": "Preparing the {label} file",
    "forms.exportText": "The download starts automatically when it is ready.",
    "forms.copyFailTitle": "Copy failed",
    "forms.copyFailText": "Copy manually with Ctrl+C.",
    "forms.copied": "Copied",
    "forms.copySuccess": "Copied to clipboard",
    "forms.saving": "Saving…",
  },
  id: {
    "forms.exportTitle": "Menyiapkan file {label}",
    "forms.exportText": "File terunduh otomatis bila sudah siap.",
    "forms.copyFailTitle": "Gagal menyalin",
    "forms.copyFailText": "Salin manual dengan Ctrl+C.",
    "forms.copied": "Tersalin",
    "forms.copySuccess": "Berhasil disalin",
    "forms.saving": "Menyimpan…",
  },
});

/** Copy text to the clipboard with a textarea fallback. Resolves true when copied. */
export async function copyText(text, returnFocusTo) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = Object.assign(document.createElement("textarea"), { value: text });
    area.style.cssText = "position:fixed;opacity:0";
    document.body.append(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch { ok = false; }
    area.remove();
    focusQuietly(returnFocusTo);
    return ok;
  }
}

const FEEDBACK_MS = 1800;
const SPINNER_DELAY_MS = 300;

/** Keep the fill of a native range slider in sync (native.css reads --ds-range-fill on the bare input). */
function syncRange(input) {
  const min = Number(input.min || 0);
  const max = Number(input.max || 100);
  const ratio = max > min ? (Number(input.value) - min) / (max - min) : 0;
  input.style.setProperty("--ds-range-fill", `${Math.min(100, Math.max(0, ratio * 100))}%`);
}

/** Last non-empty text node of a control, so a busy label replaces the words and keeps the icon. */
function labelNode(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.data.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
  });
  let node = null;
  for (let n = walker.nextNode(); n; n = walker.nextNode()) node = n;
  return node;
}

/** Busy state: aria-busy, fixed width (no layout shift), optional label swap, spinner after 300 ms. */
export function setBusy(el, label) {
  if (!(el instanceof HTMLElement) || el.getAttribute("aria-busy") === "true") return;
  el.setAttribute("aria-busy", "true");
  el.style.minInlineSize = `${el.getBoundingClientRect().width}px`;
  if (label) {
    if (el instanceof HTMLInputElement) {
      el.dataset.dsLabel = el.value;
      el.value = label;
    } else {
      const node = labelNode(el);
      if (node) { el.dataset.dsLabel = node.data; el._dsLabelNode = node; node.data = label; }
      else { el.dataset.dsLabel = el.textContent; el.textContent = label; }
    }
  }
  if (el instanceof HTMLInputElement) return;
  el._dsSpinnerTimer = window.setTimeout(() => {
    if (el.getAttribute("aria-busy") !== "true" || el.querySelector(":scope > .ds-spinner")) return;
    const spinner = document.createElement("span");
    spinner.className = "ds-spinner";
    spinner.setAttribute("aria-hidden", "true");
    spinner.dataset.dsBusySpinner = "";
    el.prepend(spinner);
  }, SPINNER_DELAY_MS);
}

/** Return a control from busy to rest (label, width, spinner). */
export function clearBusy(el) {
  if (!(el instanceof HTMLElement)) return;
  window.clearTimeout(el._dsSpinnerTimer);
  el.removeAttribute("aria-busy");
  el.style.minInlineSize = "";
  el.querySelectorAll(":scope > [data-ds-busy-spinner]").forEach((s) => s.remove());
  if (el.dataset.dsLabel != null) {
    if (el instanceof HTMLInputElement) el.value = el.dataset.dsLabel;
    else if (el._dsLabelNode?.isConnected) el._dsLabelNode.data = el.dataset.dsLabel;
    else el.textContent = el.dataset.dsLabel;
    delete el.dataset.dsLabel;
    el._dsLabelNode = null;
  }
}

/** Transient feedback class (is-copied / is-error) that returns to rest after 1.8 s. */
function flash(el, className, ariaLabel) {
  if (el._dsFlashRestore) el._dsFlashRestore();
  const previous = el.getAttribute("aria-label");
  el.classList.add(className);
  if (ariaLabel) el.setAttribute("aria-label", ariaLabel);
  el._dsFlashRestore = () => {
    window.clearTimeout(el._dsFlashTimer);
    el.classList.remove(className);
    if (ariaLabel) previous == null ? el.removeAttribute("aria-label") : el.setAttribute("aria-label", previous);
    el._dsFlashRestore = null;
  };
  el._dsFlashTimer = window.setTimeout(() => el._dsFlashRestore?.(), FEEDBACK_MS);
}

export function wire() {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const exportLink = target.closest("a[data-ds-export]");
    if (exportLink) {
      if (exportLink.getAttribute("aria-disabled") === "true") { event.preventDefault(); return; }
      const label = exportLink.getAttribute("data-ds-export") || "Excel";
      toast({ tone: "info", title: t("forms.exportTitle", { label }), text: t("forms.exportText") });
      // No signal says when the download arrived, so the link unlocks after a fixed time.
      window.setTimeout(() => {
        exportLink.setAttribute("aria-disabled", "true");
        exportLink.setAttribute("aria-busy", "true");
        exportLink.classList.add("btn-disabled");
      }, 0);
      window.setTimeout(() => {
        exportLink.removeAttribute("aria-disabled");
        exportLink.removeAttribute("aria-busy");
        exportLink.classList.remove("btn-disabled");
      }, config.exportLock);
      return;
    }

    const copy = target.closest("[data-ds-copy], [data-ds-copy-text]");
    if (copy) {
      const selector = copy.getAttribute("data-ds-copy");
      const text = copy.getAttribute("data-ds-copy-text") ?? (selector ? document.querySelector(selector)?.textContent ?? "" : "");
      copyText(text, copy).then((ok) => {
        if (!ok) {
          flash(copy, "is-error");
          toast({ tone: "error", title: t("forms.copyFailTitle"), text: t("forms.copyFailText") });
          return;
        }
        flash(copy, "is-copied", t("forms.copied"));
        toast({ tone: "success", title: copy.getAttribute("data-ds-copy-message") || t("forms.copySuccess") });
      });
      return;
    }

    const password = target.closest("[data-ds-password-toggle]");
    if (password) {
      const field = document.getElementById(password.getAttribute("aria-controls"));
      if (!field) return;
      const show = field.type === "password";
      field.type = show ? "text" : "password";
      password.setAttribute("aria-pressed", String(show));
      password.querySelectorAll("[data-ds-password-icon]").forEach((el) => { el.hidden = el.getAttribute("data-ds-password-icon") !== (show ? "shown" : "hidden"); });
      // Pointer users keep typing where they were: focus returns to the field with the caret at the end.
      if (event.detail > 0) {
        const end = field.value.length;
        focusQuietly(field);
        try { field.setSelectionRange(end, end); } catch { /* no selection API for this type */ }
      }
    }
  });

  document.addEventListener("input", (event) => {
    const range = event.target;
    if (range instanceof HTMLInputElement && range.type === "range") syncRange(range);
  });

  document.addEventListener("change", (event) => {
    const select = event.target;
    if (select instanceof HTMLSelectElement && select.hasAttribute("data-ds-autosubmit")) select.form?.requestSubmit();
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    // A password left visible would show again if the browser restores the page.
    form.querySelectorAll("[data-ds-password-toggle]").forEach((button) => {
      const field = document.getElementById(button.getAttribute("aria-controls"));
      if (field && field.type === "text") field.type = "password";
    });
    if (!form.matches("[data-ds-once]")) return;
    if (form.hasAttribute("data-ds-submitted")) { event.preventDefault(); return; }
    // Let validation and other handlers cancel first; only a submit that goes ahead turns busy.
    queueMicrotask(() => {
      if (event.defaultPrevented) return;
      form.setAttribute("data-ds-submitted", "");
      form.setAttribute("aria-busy", "true");
      const submitter = event.submitter;
      // aria-disabled, not disabled: a disabled submitter loses its formaction.
      form.querySelectorAll("button[type=submit], button:not([type]), input[type=submit]").forEach((button) => {
        button.setAttribute("aria-disabled", "true");
        button.classList.add("btn-disabled");
      });
      if (submitter instanceof HTMLElement) setBusy(submitter, submitter.getAttribute("data-ds-loading-label"));
      const status = form.querySelector("[data-ds-save-status]");
      if (status) status.textContent = t("forms.saving");
    });
  });

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    // Back/forward cache: restore usable controls.
    document.querySelectorAll("form[data-ds-submitted]").forEach((form) => {
      form.removeAttribute("data-ds-submitted");
      form.removeAttribute("aria-busy");
      form.querySelectorAll("[aria-disabled=true].btn-disabled").forEach((button) => {
        button.removeAttribute("aria-disabled");
        button.classList.remove("btn-disabled");
        clearBusy(button);
      });
      const status = form.querySelector("[data-ds-save-status]");
      if (status) status.textContent = "";
    });
    document.querySelectorAll("a[data-ds-export][aria-disabled=true]").forEach((link) => {
      link.removeAttribute("aria-disabled");
      link.removeAttribute("aria-busy");
      link.classList.remove("btn-disabled");
    });
  });
}

export function init(root = document) {
  root.querySelectorAll?.('input[type="range"]').forEach(syncRange);
}

export const api = { copyText, setBusy, clearBusy };
