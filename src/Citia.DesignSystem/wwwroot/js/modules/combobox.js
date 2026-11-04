/* Combobox (ARIA 1.2 combobox + listbox) and multi-select.
   Sources:
   - select[data-ds-combobox]                 single choice; the real <select> stays (hidden) and posts the value.
   - input[list][data-ds-combobox]            free text with <datalist> suggestions: option[value][data-label][data-hint].
   - input[data-ds-combobox][data-ds-combobox-source]   free text with suggestions fetched from a URL.
   - select[multiple][data-ds-multiselect]    several choices shown as chips; the real <select multiple> posts every value.
   Options: <optgroup label> groups, option[data-hint], option[disabled]. Attributes on the source:
   data-ds-combobox-label (spoken noun), data-ds-combobox-add="Target" ('Add "term" to Target', fires ds:combobox-add and
   ds:combobox:add { term, label, input }), data-ds-combobox-create (adds the typed term as a new option),
   data-ds-combobox-source="/api/people?q={q}" (JSON array or { items: [] } of { value, label, hint?, group?, disabled? }),
   data-ds-combobox-min (characters before fetching, default 1), data-ds-combobox-clearable (clear button),
   data-ds-multiselect-max, data-ds-multiselect-visible (chips shown while the field is not focused).
   API: addComboboxOption(source, { value, label, hint }). Events: ds:combobox:change, ds:multiselect:change. */
import { focusQuietly, normalize, t, addMessages } from "../core.js";
import { makeToken, tokenKeydown, entryToTokens } from "./choices.js";

addMessages({
  en: {
    "combobox.defaultLabel": "option",
    "combobox.list": "{label} options",
    "combobox.add": 'Add "{term}" to {target}',
    "combobox.create": 'Create "{term}"',
    "combobox.noMatch": 'No {label} matches "{term}".',
    "combobox.empty": "No options available.",
    "combobox.results": "{count} results available.",
    "combobox.none": "No results.",
    "combobox.capped": " Showing the first {max}; type to narrow the list.",
    "combobox.addAvailable": " An add option is available.",
    "combobox.selected": "{label} selected.",
    "combobox.invalid": "Choose {label} from the list.",
    "combobox.invalidAdd": "Choose {label} from the list or add it.",
    "combobox.loading": "Loading…",
    "combobox.error": "Options could not be loaded. Type again to retry.",
    "combobox.short": "Type at least {min} characters to search.",
    "combobox.clear": "Clear {label}",
    "combobox.toggle": "Show {label} options",
    "multiselect.selectAll": "Select all",
    "multiselect.clear": "Clear",
    "multiselect.more": "+{count} more",
    "multiselect.moreLabel": "{count} more selected",
    "multiselect.max": "You can choose up to {max}.",
    "multiselect.added": "{label} selected, {count} selected in total.",
    "multiselect.removed": "{label} removed, {count} selected in total.",
    "multiselect.cleared": "Selection cleared.",
    "multiselect.all": "{count} selected.",
    "multiselect.required": "Choose at least one {label}.",
  },
  id: {
    "combobox.defaultLabel": "pilihan",
    "combobox.list": "Pilihan {label}",
    "combobox.add": 'Tambah "{term}" ke {target}',
    "combobox.create": 'Buat "{term}"',
    "combobox.noMatch": 'Tidak ada {label} yang cocok dengan "{term}".',
    "combobox.empty": "Belum ada pilihan aktif.",
    "combobox.results": "{count} hasil tersedia.",
    "combobox.none": "Tidak ada hasil.",
    "combobox.capped": " Menampilkan {max} pertama; ketik untuk mempersempit.",
    "combobox.addAvailable": " Pilihan tambah tersedia.",
    "combobox.selected": "{label} dipilih.",
    "combobox.invalid": "Pilih {label} dari daftar.",
    "combobox.invalidAdd": "Pilih {label} dari daftar atau tambahkan.",
    "combobox.loading": "Memuat…",
    "combobox.error": "Pilihan tidak dapat dimuat. Ketik lagi untuk mencoba ulang.",
    "combobox.short": "Ketik minimal {min} karakter untuk mencari.",
    "combobox.clear": "Kosongkan {label}",
    "combobox.toggle": "Tampilkan pilihan {label}",
    "multiselect.selectAll": "Pilih semua",
    "multiselect.clear": "Kosongkan",
    "multiselect.more": "+{count} lagi",
    "multiselect.moreLabel": "{count} lagi dipilih",
    "multiselect.max": "Anda dapat memilih paling banyak {max}.",
    "multiselect.added": "{label} dipilih, total {count} dipilih.",
    "multiselect.removed": "{label} dihapus, total {count} dipilih.",
    "multiselect.cleared": "Pilihan dikosongkan.",
    "multiselect.all": "{count} dipilih.",
    "multiselect.required": "Pilih minimal satu {label}.",
  },
});

let count = 0;
const MAX_SHOWN = 50;
const opened = new Set();

function readOptions(source) {
  if (source instanceof HTMLSelectElement) {
    return [...source.options].filter((o) => o.value !== "").map((o) => ({
      value: o.value,
      label: o.textContent.trim(),
      hint: o.dataset.hint || "",
      group: o.parentElement instanceof HTMLOptGroupElement ? o.parentElement.label : "",
      disabled: o.disabled || (o.parentElement instanceof HTMLOptGroupElement && o.parentElement.disabled),
    }));
  }
  const list = source.list;
  return list ? [...list.options].map((o) => ({ value: o.value, label: o.dataset.label || o.value, hint: o.dataset.hint || "", group: o.dataset.group || "", disabled: o.disabled })) : [];
}

const asItem = (x) => (typeof x === "string"
  ? { value: x, label: x, hint: "", group: "", disabled: false }
  : { value: String(x.value ?? x.id ?? ""), label: String(x.label ?? x.text ?? x.name ?? x.value ?? ""), hint: String(x.hint ?? ""), group: String(x.group ?? ""), disabled: Boolean(x.disabled) });

/** Make sure a <select> has an <option> for value (remote results, created entries). */
function ensureOption(select, { value, label, hint = "" }) {
  let option = [...select.options].find((o) => o.value === value);
  if (!option) { option = new Option(label, value); if (hint) option.dataset.hint = hint; select.add(option); }
  return option;
}

function iconButton(className, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.setAttribute("aria-label", label);
  return button;
}

function enhance(source) {
  if (source._dsCombobox) return;
  const isSelect = source instanceof HTMLSelectElement;
  const multi = isSelect && source.multiple;
  const id = ++count;
  const label = source.getAttribute("data-ds-combobox-label") || document.querySelector(`label[for="${source.id}"]`)?.textContent.trim() || t("combobox.defaultLabel");
  const addTarget = source.getAttribute("data-ds-combobox-add");
  const canCreate = source.hasAttribute("data-ds-combobox-create");
  const remoteUrl = source.getAttribute("data-ds-combobox-source");
  const minChars = Number(source.getAttribute("data-ds-combobox-min") ?? 1);
  const clearable = multi || source.hasAttribute("data-ds-combobox-clearable");
  const max = Number(source.getAttribute("data-ds-multiselect-max")) || 0;
  const visible = Number(source.getAttribute("data-ds-multiselect-visible")) || 0;
  const required = source.required;

  const wrap = document.createElement("div");
  wrap.className = multi ? "ds-combobox ds-multi-select" : "ds-combobox";
  const input = isSelect ? document.createElement("input") : source;
  let field = null;
  let tokens = null;
  if (isSelect) {
    input.type = "text";
    if (multi) input.className = "ds-multi-select__input";
    else input.className = source.className.replace(/\bselect\b/, "input").replace(/\bselect-(sm|xs|lg|md|xl)\b/g, "input-$1");
    if (source.id) { input.id = source.id; source.id = `${source.id}-value`; }
    for (const attr of ["aria-describedby", "aria-invalid", "placeholder", "aria-label", "aria-labelledby"]) if (source.hasAttribute(attr)) input.setAttribute(attr, source.getAttribute(attr));
    // <option value="">Choose a customer</option> doubles as the placeholder.
    const blank = [...source.options].find((o) => o.value === "");
    if (!input.placeholder && blank?.textContent.trim()) input.placeholder = blank.textContent.trim();
    if (!multi && required) input.required = true;
    source.required = false;
    input.disabled = source.disabled;
    source.hidden = true;
    source.tabIndex = -1;
    source.setAttribute("aria-hidden", "true");
  }
  source.before(wrap);
  if (multi) {
    field = document.createElement("div");
    field.className = `input ds-multi-select__field${/\bselect-sm\b/.test(source.className) ? " input-sm" : ""}`;
    tokens = document.createElement("ul");
    tokens.className = "ds-multi-select__tokens";
    tokens.setAttribute("role", "list");
    field.append(tokens, input);
    wrap.append(field);
  } else wrap.append(input);
  if (isSelect) wrap.append(source);
  const disabled = () => input.disabled || input.readOnly || (isSelect && source.disabled);

  // Trailing buttons: clear (in the Tab order) and the chevron (pointer only; the input opens with Alt+ArrowDown).
  const clearButton = clearable ? iconButton("ds-combobox__clear", t("combobox.clear", { label })) : null;
  const toggleButton = iconButton("ds-combobox__toggle", t("combobox.toggle", { label }));
  toggleButton.tabIndex = -1;
  const buttons = document.createElement("div");
  buttons.className = "ds-combobox__buttons";
  if (clearButton) buttons.append(clearButton);
  buttons.append(toggleButton);
  wrap.append(buttons);
  wrap.classList.toggle("is-clearable", Boolean(clearButton));

  const popup = document.createElement("div");
  popup.className = "ds-combobox-popup";
  popup.hidden = true;
  const list = document.createElement("ul");
  list.className = "ds-combobox-list";
  list.setAttribute("role", "listbox");
  list.id = `ds-cb-list-${id}`;
  list.setAttribute("aria-label", t("combobox.list", { label }));
  if (multi) list.setAttribute("aria-multiselectable", "true");
  const empty = document.createElement("p");
  empty.className = "ds-combobox-empty";
  empty.hidden = true;
  let actions = null;
  if (multi) {
    actions = document.createElement("div");
    actions.className = "ds-combobox-actions";
    const all = document.createElement("button");
    all.type = "button"; all.tabIndex = -1; all.textContent = t("multiselect.selectAll"); all.dataset.action = "all";
    const none = document.createElement("button");
    none.type = "button"; none.tabIndex = -1; none.textContent = t("multiselect.clear"); none.dataset.action = "none";
    actions.append(all, none);
    popup.append(actions);
  }
  popup.append(list, empty);
  const status = document.createElement("p");
  status.className = "ds-visually-hidden";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  wrap.append(popup, status);
  Object.assign(input, { autocomplete: "off", spellcheck: false });
  input.setAttribute("role", "combobox");
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("aria-expanded", "false");
  input.setAttribute("aria-controls", list.id);
  toggleButton.setAttribute("aria-controls", list.id);
  toggleButton.setAttribute("aria-expanded", "false");
  const placeholder = input.placeholder;

  let options = readOptions(source);
  let remote = null; // last fetched items
  let remoteState = ""; // "", "loading", "error", "short"
  let controller = null;
  let timer = 0;
  let items = [];
  let active = -1;
  let typed = false;
  const say = (message) => { status.textContent = ""; requestAnimationFrame(() => { status.textContent = message; }); };
  const selectedValues = () => (isSelect ? [...source.selectedOptions].map((o) => o.value).filter((v) => v !== "") : []);
  const committed = () => (isSelect && !multi ? options.find((o) => o.value === source.value) ?? (source.value ? { value: source.value, label: source.selectedOptions[0]?.textContent.trim() ?? source.value } : null) : null);
  const filled = () => (multi ? selectedValues().length > 0 : Boolean(input.value));
  const syncFilled = () => {
    wrap.toggleAttribute("data-filled", filled() && !disabled());
    if (clearButton) clearButton.disabled = disabled();
    toggleButton.disabled = disabled();
  };

  /* ---------------------------------------------------------------- multi-select chips */
  const renderTokens = () => {
    if (!multi) return;
    const chosen = [...source.selectedOptions].filter((o) => o.value !== "");
    const nodes = chosen.map((o, i) => {
      const token = makeToken(o.textContent.trim(), () => { o.selected = false; afterMultiChange(o.textContent.trim(), false); focusQuietly(input); }, { disabled: disabled() });
      if (visible && i >= visible) token.setAttribute("data-overflow", "");
      return token;
    });
    if (visible && chosen.length > visible) {
      const more = document.createElement("li");
      more.className = "ds-token is-more";
      more.textContent = t("multiselect.more", { count: chosen.length - visible });
      more.setAttribute("aria-label", t("multiselect.moreLabel", { count: chosen.length - visible }));
      nodes.push(more);
    }
    tokens.replaceChildren(...nodes);
    input.placeholder = chosen.length ? "" : placeholder;
    const atMax = max > 0 && chosen.length >= max;
    wrap.toggleAttribute("data-max", atMax);
    input.setCustomValidity(required && !chosen.length ? t("multiselect.required", { label }) : "");
  };

  const afterMultiChange = (changedLabel, added) => {
    renderTokens();
    syncFilled();
    if (!popup.hidden) render(true);
    const n = selectedValues().length;
    if (changedLabel) say(t(added ? "multiselect.added" : "multiselect.removed", { label: changedLabel, count: n }));
    source.dispatchEvent(new Event("input", { bubbles: true }));
    source.dispatchEvent(new Event("change", { bubbles: true }));
    source.dispatchEvent(new CustomEvent("ds:multiselect:change", { bubbles: true, detail: { values: selectedValues() } }));
  };

  /* ---------------------------------------------------------------- list */
  const setActive = (index) => {
    active = index;
    items.forEach((li, i) => {
      const on = i === index;
      li.toggleAttribute("data-active", on);
      if (!multi) li.setAttribute("aria-selected", String(on));
    });
    const li = items[index];
    if (li) { input.setAttribute("aria-activedescendant", li.id); li.scrollIntoView({ block: "nearest" }); }
    else input.removeAttribute("aria-activedescendant");
  };

  const optionNode = (o, i, term) => {
    const li = document.createElement("li");
    li.id = `ds-cb-${id}-opt-${i}`;
    li.className = "ds-combobox-option";
    li.setAttribute("role", "option");
    const text = document.createElement("span");
    text.className = "ds-combobox-option__text";
    const at = term ? o.label.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) : -1;
    if (at >= 0) {
      const mark = document.createElement("mark");
      mark.className = "ds-combobox-match";
      mark.textContent = o.label.slice(at, at + term.length);
      text.append(o.label.slice(0, at), mark, o.label.slice(at + term.length));
    } else text.textContent = o.label;
    if (o.hint) { const small = document.createElement("small"); small.textContent = o.hint; text.append(small); }
    li.append(text);
    const chosen = multi ? selectedValues().includes(o.value) : isSelect && o.value === source.value;
    if (multi) li.setAttribute("aria-selected", String(chosen));
    if (chosen && !multi) li.setAttribute("data-current", "");
    const blocked = o.disabled || (multi && !chosen && max > 0 && selectedValues().length >= max);
    if (blocked) li.setAttribute("aria-disabled", "true");
    li._dsOption = o;
    return li;
  };

  const render = (keepActive = false) => {
    const raw = typed ? input.value.trim() : "";
    const term = normalize(raw);
    const pool = remoteUrl ? remote ?? [] : options;
    const matches = pool.filter((o) => remoteUrl || !term || normalize(`${o.label} ${o.value} ${o.hint}`).includes(term));
    const shown = matches.slice(0, MAX_SHOWN);
    const exact = pool.some((o) => normalize(o.value) === term || normalize(o.label) === term || normalize(o.label.split(" · ")[0]) === term);
    const canAdd = Boolean(addTarget && term && !exact && !remoteState);
    const canMake = Boolean(canCreate && term && !exact && !remoteState && !(multi && max > 0 && selectedValues().length >= max));
    const previous = active;
    const nodes = [];
    const grouped = shown.some((o) => o.group);
    let groupList = null;
    let groupName = null;
    shown.forEach((o, i) => {
      const li = optionNode(o, i, raw);
      if (!grouped) { nodes.push(li); return; }
      if (o.group !== groupName || !groupList) {
        groupName = o.group;
        const wrapper = document.createElement("li");
        wrapper.className = "ds-combobox-group";
        wrapper.setAttribute("role", "presentation");
        const heading = document.createElement("div");
        heading.className = "ds-combobox-group-label";
        heading.id = `ds-cb-${id}-group-${i}`;
        heading.setAttribute("role", "presentation");
        heading.textContent = o.group || "—";
        groupList = document.createElement("ul");
        groupList.setAttribute("role", "group");
        groupList.setAttribute("aria-labelledby", heading.id);
        wrapper.append(heading, groupList);
        nodes.push(wrapper);
      }
      groupList.append(li);
    });
    const extra = (kind, text, value) => {
      const li = document.createElement("li");
      li.id = `ds-cb-${id}-${kind}`;
      li.className = `ds-combobox-option ds-combobox-${kind}`;
      li.setAttribute("role", "option");
      if (multi) li.setAttribute("aria-selected", "false");
      const span = document.createElement("span");
      span.className = "ds-combobox-option__text";
      span.textContent = text;
      li.append(span);
      li[kind === "add" ? "_dsAdd" : "_dsCreate"] = value;
      nodes.push(li);
    };
    if (canMake) extra("create", t("combobox.create", { term: raw }), raw);
    if (canAdd) extra("add", t("combobox.add", { term: raw, target: addTarget }), raw);
    list.replaceChildren(...nodes);
    items = [...list.querySelectorAll("[role=option]")];
    list.hidden = items.length === 0;
    if (actions) actions.hidden = remoteState === "loading" || shown.length === 0;

    let message;
    empty.removeAttribute("data-state");
    empty.replaceChildren();
    if (remoteState === "loading") {
      empty.setAttribute("data-state", "loading");
      const spinner = document.createElement("span");
      spinner.className = "ds-spinner";
      spinner.setAttribute("aria-hidden", "true");
      empty.append(spinner, t("combobox.loading"));
      message = t("combobox.loading");
    } else if (remoteState === "error") {
      empty.setAttribute("data-state", "error");
      empty.textContent = message = t("combobox.error");
    } else if (remoteState === "short") {
      empty.textContent = message = t("combobox.short", { min: minChars });
    } else {
      empty.textContent = pool.length || (remoteUrl && raw) ? t("combobox.noMatch", { label, term: raw }) : t("combobox.empty");
      message = shown.length ? t("combobox.results", { count: shown.length }) : t("combobox.none");
      if (matches.length > MAX_SHOWN) message += t("combobox.capped", { max: MAX_SHOWN });
      if (canAdd) message += t("combobox.addAvailable");
      if (multi && max > 0 && selectedValues().length >= max) message += ` ${t("multiselect.max", { max })}`;
    }
    empty.hidden = items.length > 0 && !remoteState;
    popup.toggleAttribute("aria-busy", remoteState === "loading");
    say(message);
    // Select modes highlight the first enabled match while typing, so Enter picks it.
    const firstEnabled = items.findIndex((li) => li.getAttribute("aria-disabled") !== "true");
    if (keepActive && previous >= 0) setActive(Math.min(previous, items.length - 1));
    else setActive(isSelect && typed && term && firstEnabled >= 0 ? firstEnabled : -1);
  };

  /* ---------------------------------------------------------------- remote source */
  const query = () => {
    if (!remoteUrl) return;
    clearTimeout(timer);
    controller?.abort();
    const term = typed ? input.value.trim() : "";
    if (term.length < minChars) { remote = []; remoteState = minChars > 0 ? "short" : ""; render(); return; }
    remoteState = "loading";
    render();
    timer = setTimeout(async () => {
      controller = new AbortController();
      const param = source.getAttribute("data-ds-combobox-param") || "q";
      const url = remoteUrl.includes("{q}") ? remoteUrl.replace("{q}", encodeURIComponent(term))
        : `${remoteUrl}${remoteUrl.includes("?") ? "&" : "?"}${encodeURIComponent(param)}=${encodeURIComponent(term)}`;
      try {
        const response = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" }, credentials: "same-origin" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        remote = (Array.isArray(data) ? data : data.items ?? []).map(asItem);
        remoteState = "";
      } catch (error) {
        if (error.name === "AbortError") return;
        remote = [];
        remoteState = "error";
      }
      if (!popup.hidden) render();
    }, 250);
  };

  /* ---------------------------------------------------------------- open, close, choose */
  const place = () => {
    popup.removeAttribute("data-side");
    const box = wrap.getBoundingClientRect();
    const below = window.innerHeight - box.bottom;
    const needed = Math.min(popup.scrollHeight || 288, 288) + 12;
    if (below < needed && box.top > below) popup.setAttribute("data-side", "top");
  };

  const open = () => {
    if (!popup.hidden || disabled()) return;
    opened.forEach((close) => close());
    options = readOptions(source);
    popup.hidden = false;
    input.setAttribute("aria-expanded", "true");
    toggleButton.setAttribute("aria-expanded", "true");
    wrap.setAttribute("data-open", "");
    if (remoteUrl) query(); else render();
    place();
    list.querySelector("[data-current]")?.scrollIntoView({ block: "nearest" });
    opened.add(close);
  };
  function close() {
    opened.delete(close);
    if (popup.hidden) return;
    popup.hidden = true;
    input.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-expanded", "false");
    wrap.removeAttribute("data-open");
    input.removeAttribute("aria-activedescendant");
    active = -1;
  }

  const changed = (option) => {
    source.dispatchEvent(new Event("input", { bubbles: true }));
    source.dispatchEvent(new Event("change", { bubbles: true }));
    source.dispatchEvent(new CustomEvent("ds:combobox:change", { bubbles: true, detail: { value: option?.value ?? "", label: option?.label ?? "" } }));
  };

  const choose = (li) => {
    if (!li || li.getAttribute("aria-disabled") === "true") return;
    if (li._dsAdd !== undefined) {
      close();
      const detail = { term: li._dsAdd, label: addTarget, input };
      source.dispatchEvent(new CustomEvent("ds:combobox-add", { bubbles: true, detail }));
      source.dispatchEvent(new CustomEvent("ds:combobox:add", { bubbles: true, detail }));
      return;
    }
    const option = li._dsCreate !== undefined ? { value: li._dsCreate, label: li._dsCreate, hint: "" } : li._dsOption;
    if (li._dsCreate !== undefined) {
      if (isSelect) ensureOption(source, option);
      source.dispatchEvent(new CustomEvent("ds:combobox:create", { bubbles: true, detail: { term: option.value, input } }));
    }
    if (multi) {
      const node = ensureOption(source, option);
      node.selected = !node.selected;
      input.value = "";
      typed = false;
      afterMultiChange(option.label, node.selected);
      if (remoteUrl) query();
      return;
    }
    if (isSelect) {
      ensureOption(source, option);
      source.value = option.value;
      input.value = option.label;
      source.setCustomValidity("");
      input.setCustomValidity("");
    } else input.value = option.value;
    typed = false;
    close();
    syncFilled();
    say(t("combobox.selected", { label: option.label }));
    changed(option);
    focusQuietly(input);
  };

  const clear = () => {
    if (disabled()) return;
    if (multi) {
      [...source.options].forEach((o) => { o.selected = false; });
      input.value = "";
      typed = false;
      afterMultiChange("", false);
      say(t("multiselect.cleared"));
    } else {
      if (isSelect) source.value = "";
      input.value = "";
      input.setCustomValidity("");
      typed = false;
      syncFilled();
      changed(null);
    }
    focusQuietly(input);
  };

  const selectAll = () => {
    const values = selectedValues();
    let room = max > 0 ? max - values.length : Infinity;
    for (const li of items) {
      const o = li._dsOption;
      if (!o || o.disabled || values.includes(o.value) || room <= 0) continue;
      ensureOption(source, o).selected = true;
      room--;
    }
    afterMultiChange("", true);
    say(t("multiselect.all", { count: selectedValues().length }));
  };

  if (isSelect && !multi) input.value = committed()?.label ?? "";
  renderTokens();
  syncFilled();

  input.addEventListener("click", () => { if (popup.hidden) open(); });
  input.addEventListener("input", () => {
    typed = true;
    if (popup.hidden) open();
    if (remoteUrl) query(); else render();
    if (isSelect && !multi) {
      const match = options.find((o) => normalize(o.label) === normalize(input.value));
      source.value = match ? match.value : "";
      input.setCustomValidity(match || !input.value ? "" : t(addTarget || canCreate ? "combobox.invalidAdd" : "combobox.invalid", { label }));
    }
    syncFilled();
  });
  input.addEventListener("keydown", (event) => {
    let total = items.length;
    const step = (from, dir) => {
      for (let n = 1; n <= total; n++) {
        const i = (from + dir * n + total * 2) % total;
        if (items[i].getAttribute("aria-disabled") !== "true") return i;
      }
      return -1;
    };
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (popup.hidden) { open(); if (event.altKey) return; total = items.length; }
      if (!total) return;
      const dir = event.key === "ArrowDown" ? 1 : -1;
      setActive(active < 0 ? step(dir > 0 ? -1 : total, dir) : step(active, dir));
    } else if ((event.key === "Home" || event.key === "End") && !popup.hidden && total && !multi && !typed) {
      event.preventDefault();
      setActive(event.key === "Home" ? step(-1, 1) : step(total, -1));
    } else if (event.key === "Enter" && !popup.hidden && active >= 0) {
      event.preventDefault();
      choose(items[active]);
    } else if (event.key === "Escape") {
      if (!popup.hidden) { event.preventDefault(); event.stopPropagation(); close(); }
      else if (isSelect && !multi && typed) { input.value = committed()?.label ?? ""; typed = false; input.setCustomValidity(""); }
      else if (multi && input.value) { input.value = ""; typed = false; }
    } else if (event.key === "Tab") {
      close();
    } else if (multi && event.key === "Backspace" && input.value === "" && selectedValues().length) {
      event.preventDefault();
      const last = [...source.selectedOptions].filter((o) => o.value !== "").at(-1);
      last.selected = false;
      afterMultiChange(last.textContent.trim(), false);
    } else if (multi && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a" && input.value === "" && !popup.hidden) {
      event.preventDefault();
      selectAll();
    } else if (multi) {
      entryToTokens(event, tokens);
    }
  });
  input.addEventListener("blur", () => {
    if (multi) { if (!wrap.contains(document.activeElement)) { input.value = ""; typed = false; } return; }
    if (isSelect && !source.value) return;
    if (isSelect) { input.value = committed()?.label ?? input.value; typed = false; input.setCustomValidity(""); }
    else {
      const match = options.find((o) => normalize(o.value) === normalize(input.value));
      if (match) input.value = match.value;
    }
  });
  if (tokens) tokens.addEventListener("keydown", (event) => tokenKeydown(event, tokens, input, (i) => {
    const o = [...source.selectedOptions].filter((x) => x.value !== "")[i];
    if (o) { o.selected = false; afterMultiChange(o.textContent.trim(), false); }
  }));
  if (field) field.addEventListener("pointerdown", (event) => {
    if (event.target === field || event.target === tokens) { event.preventDefault(); focusQuietly(input); if (popup.hidden) open(); }
  });
  popup.addEventListener("pointerdown", (event) => event.preventDefault()); // keep focus in the input
  list.addEventListener("click", (event) => { const li = event.target.closest("[role=option]"); if (li) choose(li); });
  list.addEventListener("pointermove", (event) => {
    const li = event.target.closest?.("[role=option]");
    if (li && items.indexOf(li) !== active && li.getAttribute("aria-disabled") !== "true") setActive(items.indexOf(li));
  });
  actions?.addEventListener("click", (event) => {
    const action = event.target.closest("button")?.dataset.action;
    if (action === "all") selectAll();
    if (action === "none") clear();
  });
  toggleButton.addEventListener("pointerdown", (event) => event.preventDefault());
  toggleButton.addEventListener("click", () => {
    if (popup.hidden) { focusQuietly(input); open(); } else { close(); focusQuietly(input); }
  });
  clearButton?.addEventListener("click", () => { clear(); if (!popup.hidden) render(); });
  document.addEventListener("pointerdown", (event) => { if (!wrap.contains(event.target)) close(); });
  source.form?.addEventListener("reset", () => setTimeout(() => {
    typed = false;
    if (multi) { renderTokens(); input.value = ""; } else if (isSelect) input.value = committed()?.label ?? "";
    syncFilled();
  }));
  source._dsCombobox = {
    open,
    close,
    clear,
    refresh: () => {
      options = readOptions(source);
      if (isSelect && !multi && !typed) input.value = committed()?.label ?? "";
      renderTokens();
      syncFilled();
      if (!popup.hidden) render();
    },
  };
}

/** Add an option to an enhanced combobox source (after a quick add) and select it. */
export function addComboboxOption(source, { value, label, hint = "" }) {
  if (source instanceof HTMLSelectElement) {
    const option = ensureOption(source, { value, label, hint });
    if (source.multiple) option.selected = true;
    else source.value = value;
    const input = source.closest(".ds-combobox")?.querySelector("[role=combobox]");
    if (input && !source.multiple) input.value = label;
  } else if (source.list) {
    const option = document.createElement("option");
    option.value = value; option.dataset.label = label; if (hint) option.dataset.hint = hint;
    source.list.append(option);
    source.value = value;
  } else source.value = value;
  source._dsCombobox?.refresh();
  source.dispatchEvent(new Event("change", { bubbles: true }));
}

export function wire() {}

export function init(root) {
  root.querySelectorAll("select[data-ds-combobox], input[data-ds-combobox], select[multiple][data-ds-multiselect]").forEach(enhance);
}

export const api = { addComboboxOption };
