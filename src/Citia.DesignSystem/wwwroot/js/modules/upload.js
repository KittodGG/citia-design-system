/* File upload: dropzone with drag, drop, paste, keyboard; per-file validation, progress, remove and retry; avatar variant.
   Owner: batch A4. Contract: docs/_contributing.md (wire() once per page, init(root) idempotent, optional api).
   Hooks: [data-ds-upload] around a .ds-dropzone label with input[type=file] (+ data-ds-upload-max-size="10 MB",
   data-ds-upload-max-files, data-ds-upload-url (upload each file at once with progress), data-ds-upload-field (hidden
   input name for the returned ids), data-ds-upload-param, data-ds-upload-paste="page").
   [data-ds-upload="avatar"]: image preview, change and remove. Without JavaScript the file input posts normally. */
import { t, addMessages, focusQuietly, uid, icon, registerIcons, config, html } from "../core.js";
import { setFieldError, clearFieldError } from "./validation.js";

registerIcons({
  file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z"/><path d="M14 3v5h5"/>',
  "file-pdf": '<path d="M5 11V4a1 1 0 0 1 1-1h8l5 5v3"/><path d="M14 3v5h5"/><path stroke-width="1.75" d="M3 21v-6h2a1.5 1.5 0 0 1 0 3H3M10 15v6h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 11 15h-1ZM21 15h-3.5v6M17.5 18H20"/>',
  "file-xls": '<path d="M5 11V4a1 1 0 0 1 1-1h8l5 5v3"/><path d="M14 3v5h5"/><path stroke-width="1.75" d="m3 15 4 6M7 15l-4 6M10 15v6h3M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H16"/>',
  "file-text": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8M16 13H8M16 17H8"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.8-4L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14.8 4L21 15"/><path d="M21 20v-5h-5"/>',
  "check-circle": '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  "alert-circle": '<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>',
  "cloud-upload": '<path d="M12 13v8"/><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m8 17 4-4 4 4"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
});

addMessages({
  en: {
    "upload.list": "Selected files",
    "upload.remove": "Remove {name}",
    "upload.cancel": "Cancel upload of {name}",
    "upload.retry": "Retry {name}",
    "upload.ready": "Ready to send",
    "upload.uploading": "Uploading {percent}%",
    "upload.waiting": "Waiting",
    "upload.done": "Uploaded",
    "upload.failed": "Upload failed. Check the connection and try again.",
    "upload.type": "This file type is not accepted. Use {types}.",
    "upload.size": "This file is larger than {max}.",
    "upload.empty": "This file is empty.",
    "upload.count": "You can add up to {max} files. Remove one to add another.",
    "upload.images": "images",
    "upload.added": "{count} files added.",
    "upload.addedOne": "{name} added.",
    "upload.removed": "{name} removed.",
    "upload.uploaded": "{name} uploaded.",
    "upload.busy": "Wait until the files finish uploading.",
    "upload.photoRemoved": "Photo removed.",
    "upload.photoChosen": "New photo selected: {name}.",
  },
  id: {
    "upload.list": "File terpilih",
    "upload.remove": "Hapus {name}",
    "upload.cancel": "Batalkan unggahan {name}",
    "upload.retry": "Coba lagi {name}",
    "upload.ready": "Siap dikirim",
    "upload.uploading": "Mengunggah {percent}%",
    "upload.waiting": "Menunggu",
    "upload.done": "Terunggah",
    "upload.failed": "Gagal mengunggah. Periksa koneksi lalu coba lagi.",
    "upload.type": "Jenis file ini tidak diterima. Gunakan {types}.",
    "upload.size": "Ukuran file melebihi {max}.",
    "upload.empty": "File ini kosong.",
    "upload.count": "Maksimal {max} file. Hapus salah satu untuk menambah.",
    "upload.images": "gambar",
    "upload.added": "{count} file ditambahkan.",
    "upload.addedOne": "{name} ditambahkan.",
    "upload.removed": "{name} dihapus.",
    "upload.uploaded": "{name} terunggah.",
    "upload.busy": "Tunggu sampai semua file selesai diunggah.",
    "upload.photoRemoved": "Foto dihapus.",
    "upload.photoChosen": "Foto baru dipilih: {name}.",
  },
});

const READY = new WeakSet();
const UPLOADERS = new Set();
const CONCURRENT = 3;
const langTag = (el) => config.locale || el.closest("[lang]")?.getAttribute("lang") || html.lang || "en";

/** "10 MB", "500KB", "2.5mb", "1048576" → bytes. */
export function parseSize(text) {
  const m = /^\s*([\d.,]+)\s*(b|kb|mb|gb)?\s*$/i.exec(String(text ?? ""));
  if (!m) return Infinity;
  const n = parseFloat(m[1].replace(",", "."));
  const unit = { b: 1, kb: 1024, mb: 1024 ** 2, gb: 1024 ** 3 }[(m[2] || "b").toLowerCase()];
  return n * unit;
}

/** Human size in the page language: 2.4 MB (en), 2,4 MB (id). */
export function formatSize(bytes, tag) {
  const units = [["gigabyte", 1024 ** 3], ["megabyte", 1024 ** 2], ["kilobyte", 1024], ["byte", 1]];
  const [unit, size] = units.find(([, s]) => bytes >= s) || units.at(-1);
  if (unit === "byte") return `${new Intl.NumberFormat(tag).format(bytes)} B`;
  try {
    return new Intl.NumberFormat(tag, { style: "unit", unit, unitDisplay: "short", maximumFractionDigits: size >= 1024 ** 2 ? 1 : 0 }).format(bytes / size);
  } catch {
    return `${Math.round(bytes / size)} ${unit[0].toUpperCase()}B`;
  }
}

const extOf = (name) => (/\.([a-z0-9]+)$/i.exec(name)?.[1] || "").toLowerCase();

function iconFor(file) {
  const ext = extOf(file.name);
  if (ext === "pdf" || file.type === "application/pdf") return "file-pdf";
  if (["xls", "xlsx", "csv", "ods"].includes(ext)) return "file-xls";
  if (file.type.startsWith("image/")) return "image";
  if (["doc", "docx", "txt", "rtf", "odt", "md"].includes(ext)) return "file-text";
  return "file";
}

function accepts(accept, file) {
  const tokens = String(accept || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!tokens.length) return true;
  const type = (file.type || "").toLowerCase();
  const ext = `.${extOf(file.name)}`;
  return tokens.some((tok) => (tok.startsWith(".") ? tok === ext : tok.endsWith("/*") ? type.startsWith(tok.slice(0, -1)) : tok === type));
}

function typesLabel(accept) {
  const out = new Set();
  for (const tok of String(accept || "").split(",").map((s) => s.trim()).filter(Boolean)) {
    if (tok.startsWith(".")) out.add(tok.slice(1).toUpperCase());
    else if (tok.endsWith("/*")) out.add(tok.startsWith("image") ? t("upload.images") : tok);
    else out.add((tok.split("/")[1] || tok).replace(/^vnd\..*sheet$/, "XLSX").toUpperCase());
  }
  return [...out].join(", ");
}

const make = (tag, cls, text) => {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text != null) el.textContent = text;
  return el;
};

function iconButton(name, label, cls) {
  const b = make("button", `ds-file__action ${cls || ""}`.trim());
  b.type = "button";
  b.setAttribute("aria-label", label);
  b.title = label;
  b.innerHTML = icon(name); // static icon markup
  return b;
}

/* ------------------------------------------------------------------ uploader (list variant) */
class Uploader {
  constructor(host) {
    this.host = host;
    this.input = host.querySelector('input[type="file"]');
    this.zone = host.querySelector(".ds-dropzone") || this.input.closest("label");
    this.tag = langTag(host);
    this.multiple = this.input.multiple;
    this.accept = this.input.accept;
    this.maxSize = parseSize(host.getAttribute("data-ds-upload-max-size") || "");
    this.maxFiles = +(host.getAttribute("data-ds-upload-max-files") || (this.multiple ? Infinity : 1));
    this.url = host.getAttribute("data-ds-upload-url");
    this.name = this.input.name;
    this.field = host.getAttribute("data-ds-upload-field") || (this.name ? `${this.name}Ids` : "fileIds");
    this.param = host.getAttribute("data-ds-upload-param") || "file";
    this.entries = [];
    this.list = host.querySelector(".ds-file-list") || make("ul", "ds-file-list");
    if (!this.list.isConnected) host.append(this.list);
    this.list.setAttribute("aria-label", t("upload.list"));
    this.status = host.querySelector("[data-ds-upload-status]") || make("p", "ds-visually-hidden");
    if (!this.status.isConnected) { this.status.setAttribute("role", "status"); this.status.setAttribute("aria-live", "polite"); host.append(this.status); }
    // In URL mode the files travel by XHR; the form posts the returned ids instead.
    if (this.url && this.input.name) { this.input.dataset.dsName = this.input.name; this.input.removeAttribute("name"); }
    this.bind();
    host._dsUploader = this;
    host.setAttribute("data-ds-ready", "");
  }

  bind() {
    this.input.addEventListener("change", () => {
      const files = [...this.input.files];
      if (!files.length) return;
      if (!this.multiple) this.clear(false);
      this.add(files);
    });
    const zone = this.zone;
    if (!zone) return;
    zone.addEventListener("dragenter", (e) => { if (this.hasFiles(e)) { e.preventDefault(); zone.setAttribute("data-drop-target", ""); } });
    zone.addEventListener("dragover", (e) => { if (this.hasFiles(e)) { e.preventDefault(); e.dataTransfer.dropEffect = this.input.disabled ? "none" : "copy"; zone.setAttribute("data-drop-target", ""); } });
    zone.addEventListener("dragleave", (e) => { if (!zone.contains(e.relatedTarget)) zone.removeAttribute("data-drop-target"); });
    zone.addEventListener("drop", (e) => {
      if (!this.hasFiles(e)) return;
      e.preventDefault();
      zone.removeAttribute("data-drop-target");
      clearDragging();
      if (this.input.disabled) return;
      const files = [...e.dataTransfer.files];
      if (!this.multiple) { this.clear(false); files.splice(1); }
      this.add(files);
    });
  }

  hasFiles(e) { return [...(e.dataTransfer?.types || [])].includes("Files"); }

  get uploading() { return this.entries.some((x) => x.status === "uploading" || x.status === "waiting"); }

  add(files) {
    const added = [];
    for (const file of files) {
      if (this.entries.some((x) => x.file.name === file.name && x.file.size === file.size && x.file.lastModified === file.lastModified)) continue;
      const entry = { id: uid("file"), file, status: "ready", progress: 0, error: "" };
      const valid = this.entries.filter((x) => x.status !== "invalid").length;
      if (!accepts(this.accept, file)) entry.error = t("upload.type", { types: typesLabel(this.accept) });
      else if (file.size > this.maxSize) entry.error = t("upload.size", { max: formatSize(this.maxSize, this.tag) });
      else if (file.size === 0) entry.error = t("upload.empty");
      else if (valid >= this.maxFiles) entry.error = t("upload.count", { max: this.maxFiles });
      if (entry.error) entry.status = "invalid";
      else if (this.url) entry.status = "waiting";
      this.entries.push(entry);
      this.renderEntry(entry);
      added.push(entry);
    }
    this.sync();
    if (added.length) this.say(added.length === 1 ? (added[0].error ? `${added[0].file.name}: ${added[0].error}` : t("upload.addedOne", { name: added[0].file.name })) : t("upload.added", { count: added.length }));
    this.pump();
    this.host.dispatchEvent(new CustomEvent("ds:upload:add", { bubbles: true, detail: { files: added.map((x) => x.file) } }));
  }

  renderEntry(entry) {
    const li = entry.row || make("li", "ds-file");
    entry.row = li;
    li.id = entry.id;
    li.setAttribute("data-state", entry.status);
    const thumb = make("span", "ds-file__thumb");
    if (entry.file.type.startsWith("image/") && entry.file.size < 20 * 1024 ** 2 && entry.status !== "invalid") {
      entry.thumb ||= URL.createObjectURL(entry.file);
      const img = make("img");
      img.alt = "";
      img.src = entry.thumb;
      img.decoding = "async";
      thumb.append(img);
    } else thumb.innerHTML = icon(iconFor(entry.file));
    const body = make("div", "ds-file__body");
    const name = make("span", "ds-file__name", entry.file.name);
    name.title = entry.file.name;
    const meta = make("span", "ds-file__meta");
    const size = formatSize(entry.file.size, this.tag);
    if (entry.status === "invalid" || entry.status === "error") {
      meta.classList.add("is-error");
      meta.innerHTML = icon("alert-circle");
      meta.append(entry.error);
    } else if (entry.status === "uploading") meta.textContent = `${size} · ${t("upload.uploading", { percent: Math.round(entry.progress) })}`;
    else if (entry.status === "waiting") meta.textContent = `${size} · ${t("upload.waiting")}`;
    else if (entry.status === "done") { meta.classList.add("is-success"); meta.innerHTML = icon("check-circle"); meta.append(`${size} · ${t("upload.done")}`); }
    else meta.textContent = `${size} · ${extOf(entry.file.name).toUpperCase() || t("upload.ready")}`;
    body.append(name, meta);
    if (entry.status === "uploading" || entry.status === "waiting") {
      const bar = make("progress", "ds-file__progress");
      bar.max = 100;
      if (entry.status === "uploading") bar.value = entry.progress;
      bar.setAttribute("aria-label", t("upload.uploading", { percent: Math.round(entry.progress) }));
      body.append(bar);
    }
    const actions = make("div", "ds-file__actions");
    if (entry.status === "error") {
      const retry = iconButton("refresh", t("upload.retry", { name: entry.file.name }));
      retry.addEventListener("click", () => { entry.status = "waiting"; entry.progress = 0; this.renderEntry(entry); this.pump(); focusQuietly(entry.row.querySelector(".ds-file__action")); });
      actions.append(retry);
    }
    const busy = entry.status === "uploading" || entry.status === "waiting";
    const remove = iconButton("x", t(busy ? "upload.cancel" : "upload.remove", { name: entry.file.name }), "is-remove");
    remove.addEventListener("click", () => this.remove(entry));
    actions.append(remove);
    if (entry.result != null) {
      const hidden = make("input");
      hidden.type = "hidden";
      hidden.name = this.field;
      hidden.value = entry.result;
      actions.append(hidden);
    }
    li.replaceChildren(thumb, body, actions);
    if (!li.isConnected) this.list.append(li);
    this.host.toggleAttribute("aria-busy", this.uploading);
    if (this.uploading) this.host.setAttribute("aria-busy", "true");
    const invalid = this.entries.some((x) => x.status === "invalid" || x.status === "error");
    this.host.toggleAttribute("data-invalid", invalid);
  }

  remove(entry, announce = true) {
    entry.xhr?.abort();
    if (entry.thumb) URL.revokeObjectURL(entry.thumb);
    const index = this.entries.indexOf(entry);
    this.entries.splice(index, 1);
    const next = this.entries[index]?.row || this.entries[index - 1]?.row;
    entry.row?.remove();
    this.sync();
    this.renderStateOnly();
    if (announce) {
      this.say(t("upload.removed", { name: entry.file.name }));
      focusQuietly(next?.querySelector(".is-remove") || this.input);
      this.host.dispatchEvent(new CustomEvent("ds:upload:remove", { bubbles: true, detail: { file: entry.file } }));
    }
    this.pump();
  }

  clear(announce = true) {
    [...this.entries].forEach((x) => this.remove(x, false));
    if (announce) this.say("");
  }

  renderStateOnly() {
    this.host.toggleAttribute("aria-busy", this.uploading);
    if (this.uploading) this.host.setAttribute("aria-busy", "true");
    this.host.toggleAttribute("data-invalid", this.entries.some((x) => x.status === "invalid" || x.status === "error"));
  }

  /** Form-post mode: the file input holds exactly the valid files, so a normal submit sends them. */
  sync() {
    if (this.url) { try { this.input.value = ""; } catch { /* old engines */ } return; }
    try {
      const dt = new DataTransfer();
      this.entries.filter((x) => x.status === "ready").forEach((x) => dt.items.add(x.file));
      this.input.files = dt.files;
    } catch { /* DataTransfer unsupported: the input keeps the last pick */ }
    // A server error on the input (required, too many files) clears once valid files are listed.
    if (this.input.getAttribute("aria-invalid") === "true" && this.entries.some((x) => x.status === "ready")) clearFieldError(this.input);
  }

  pump() {
    if (!this.url) return;
    let running = this.entries.filter((x) => x.status === "uploading").length;
    for (const entry of this.entries) {
      if (running >= CONCURRENT) break;
      if (entry.status === "waiting") { running++; this.send(entry); }
    }
    this.renderStateOnly();
  }

  send(entry) {
    const xhr = new XMLHttpRequest();
    entry.xhr = xhr;
    entry.status = "uploading";
    entry.progress = 0;
    this.renderEntry(entry);
    const data = new FormData();
    data.append(this.param, entry.file, entry.file.name);
    const form = this.input.form || this.host.closest("form");
    const token = form?.querySelector('input[name="__RequestVerificationToken"]')?.value;
    xhr.open("POST", this.url);
    xhr.setRequestHeader("Accept", "application/json");
    if (token) { xhr.setRequestHeader("RequestVerificationToken", token); data.append("__RequestVerificationToken", token); }
    let last = 0;
    xhr.upload.addEventListener("progress", (e) => {
      if (!e.lengthComputable) return;
      entry.progress = (e.loaded / e.total) * 100;
      const now = performance.now();
      if (now - last < 100 && entry.progress < 100) return;
      last = now;
      const bar = entry.row?.querySelector("progress");
      const meta = entry.row?.querySelector(".ds-file__meta");
      if (bar) bar.value = entry.progress;
      if (meta) meta.textContent = `${formatSize(entry.file.size, this.tag)} · ${t("upload.uploading", { percent: Math.round(entry.progress) })}`;
    });
    xhr.addEventListener("load", () => {
      entry.xhr = null;
      let body = null;
      try { body = JSON.parse(xhr.responseText); } catch { body = xhr.responseText; }
      if (xhr.status >= 200 && xhr.status < 300) {
        entry.status = "done";
        entry.result = body && typeof body === "object" ? (body.id ?? body.fileId ?? body.key ?? "") : String(body || "").trim();
        this.say(t("upload.uploaded", { name: entry.file.name }));
        this.host.dispatchEvent(new CustomEvent("ds:upload:done", { bubbles: true, detail: { file: entry.file, response: body } }));
      } else {
        entry.status = "error";
        entry.error = (body && typeof body === "object" && (body.error || body.message || body.title)) || t("upload.failed");
        this.say(`${entry.file.name}: ${entry.error}`);
        this.host.dispatchEvent(new CustomEvent("ds:upload:error", { bubbles: true, detail: { file: entry.file, status: xhr.status, response: body } }));
      }
      this.renderEntry(entry);
      this.pump();
    });
    const fail = () => {
      if (!this.entries.includes(entry)) return;
      entry.xhr = null;
      entry.status = "error";
      entry.error = t("upload.failed");
      this.renderEntry(entry);
      this.pump();
    };
    xhr.addEventListener("error", fail);
    xhr.addEventListener("timeout", fail);
    xhr.send(data);
  }

  say(text) {
    this.status.textContent = "";
    if (text) requestAnimationFrame(() => { this.status.textContent = text; });
  }
}

/* ------------------------------------------------------------------ avatar variant */
function initAvatar(host) {
  const input = host.querySelector('input[type="file"]');
  if (!input) return;
  const preview = host.querySelector(".ds-avatar-upload__preview");
  const tag = langTag(host);
  const maxSize = parseSize(host.getAttribute("data-ds-upload-max-size") || "");
  const removeButton = host.querySelector("[data-ds-upload-remove]");
  const removed = host.querySelector("[data-ds-upload-removed]");
  const status = make("p", "ds-visually-hidden");
  status.setAttribute("role", "status");
  host.append(status);
  let url = null;
  const original = preview?.querySelector("img")?.getAttribute("src") || null;

  const show = (src) => {
    if (!preview) return;
    let img = preview.querySelector("img");
    if (src) {
      if (!img) { img = make("img"); img.alt = ""; preview.prepend(img); }
      img.src = src;
      preview.setAttribute("data-state", "filled");
    } else {
      img?.remove();
      preview.removeAttribute("data-state");
    }
    if (removeButton) removeButton.hidden = !src;
  };
  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (!file) return;
    let error = "";
    if (!accepts(input.accept || "image/*", file)) error = t("upload.type", { types: typesLabel(input.accept || "image/*") });
    else if (file.size > maxSize) error = t("upload.size", { max: formatSize(maxSize, tag) });
    if (error) { input.value = ""; setFieldError(input, error); return; }
    clearFieldError(input);
    if (url) URL.revokeObjectURL(url);
    url = URL.createObjectURL(file);
    show(url);
    if (removed) removed.value = "false";
    status.textContent = t("upload.photoChosen", { name: file.name });
    host.dispatchEvent(new CustomEvent("ds:upload:add", { bubbles: true, detail: { files: [file] } }));
  });
  removeButton?.addEventListener("click", () => {
    input.value = "";
    if (url) { URL.revokeObjectURL(url); url = null; }
    show(null);
    if (removed) removed.value = "true";
    clearFieldError(input);
    status.textContent = t("upload.photoRemoved");
    focusQuietly(input);
    input.dispatchEvent(new Event("change", { bubbles: true }));
    host.dispatchEvent(new CustomEvent("ds:upload:remove", { bubbles: true, detail: {} }));
  });
  if (removeButton) removeButton.hidden = !original;
  // Drop an image on the preview.
  const target = preview || host;
  target.addEventListener("dragover", (e) => { if ([...(e.dataTransfer?.types || [])].includes("Files")) { e.preventDefault(); target.setAttribute("data-drop-target", ""); } });
  target.addEventListener("dragleave", (e) => { if (!target.contains(e.relatedTarget)) target.removeAttribute("data-drop-target"); });
  target.addEventListener("drop", (e) => {
    if (!e.dataTransfer?.files?.length) return;
    e.preventDefault();
    target.removeAttribute("data-drop-target");
    clearDragging();
    try { const dt = new DataTransfer(); dt.items.add(e.dataTransfer.files[0]); input.files = dt.files; } catch { return; }
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
  host.setAttribute("data-ds-ready", "");
}

/* ------------------------------------------------------------------ page-level drag, paste, submit */
let dragDepth = 0;
function clearDragging() {
  dragDepth = 0;
  document.querySelectorAll("[data-ds-upload][data-dragging], [data-ds-upload] [data-dragging]").forEach((el) => el.removeAttribute("data-dragging"));
}

export function wire() {
  const hasFiles = (e) => [...(e.dataTransfer?.types || [])].includes("Files");
  const zones = () => [...document.querySelectorAll("[data-ds-upload] .ds-dropzone, [data-ds-upload='avatar'] .ds-avatar-upload__preview")];
  document.addEventListener("dragenter", (e) => {
    if (!hasFiles(e) || !zones().length) return;
    dragDepth++;
    zones().forEach((z) => { if (!z.closest("[data-ds-upload]")?.querySelector("input[type=file]:disabled")) z.setAttribute("data-dragging", ""); });
  });
  document.addEventListener("dragleave", (e) => { if (hasFiles(e) && --dragDepth <= 0) clearDragging(); });
  // A file dropped beside a zone must not navigate away from a half-filled form.
  document.addEventListener("dragover", (e) => { if (hasFiles(e) && zones().length && !e.target.closest?.(".ds-dropzone, .ds-avatar-upload__preview")) { e.preventDefault(); e.dataTransfer.dropEffect = "none"; } });
  document.addEventListener("drop", (e) => { if (hasFiles(e) && zones().length) { if (!e.target.closest?.(".ds-dropzone, .ds-avatar-upload__preview")) e.preventDefault(); clearDragging(); } });

  document.addEventListener("paste", (e) => {
    const files = [...(e.clipboardData?.files || [])];
    if (!files.length) return;
    const active = document.activeElement;
    let host = active?.closest?.("[data-ds-upload]");
    if (!host && !(active && active.matches?.("input, textarea, [contenteditable]"))) {
      const pagewide = [...UPLOADERS].filter((u) => u.host.isConnected && u.host.getAttribute("data-ds-upload-paste") === "page");
      if (pagewide.length === 1) host = pagewide[0].host;
    }
    const uploader = host?._dsUploader;
    if (!uploader || uploader.input.disabled) return;
    e.preventDefault();
    uploader.add(uploader.multiple ? files : files.slice(0, 1));
  });

  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    const busy = [...UPLOADERS].find((u) => u.host.isConnected && form.contains(u.host) && u.uploading);
    if (!busy) return;
    e.preventDefault();
    busy.say(t("upload.busy"));
    focusQuietly(busy.list.querySelector(".ds-file[data-state=uploading] .ds-file__action") || busy.input);
  }, true);
}

export function init(root = document) {
  const scope = root.querySelectorAll ? root : document;
  const hosts = [...(scope.matches?.("[data-ds-upload]") ? [scope] : []), ...scope.querySelectorAll("[data-ds-upload]")];
  for (const host of hosts) {
    if (READY.has(host)) continue;
    READY.add(host);
    try {
      if (host.getAttribute("data-ds-upload") === "avatar") initAvatar(host);
      else if (host.querySelector('input[type="file"]')) UPLOADERS.add(new Uploader(host));
    } catch (error) { console.error("[ds] upload", error); }
  }
}

export const api = {
  upload: {
    /** DS.upload.files(el) → the File objects currently listed (valid and invalid). */
    files: (el) => (typeof el === "string" ? document.querySelector(el) : el)?.closest("[data-ds-upload]")?._dsUploader?.entries.map((x) => x.file) ?? [],
    add: (el, files) => (typeof el === "string" ? document.querySelector(el) : el)?.closest("[data-ds-upload]")?._dsUploader?.add([...files]),
    clear: (el) => (typeof el === "string" ? document.querySelector(el) : el)?.closest("[data-ds-upload]")?._dsUploader?.clear(),
    formatSize,
  },
};
