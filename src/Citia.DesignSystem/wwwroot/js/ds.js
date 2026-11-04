/*!
 * Citia Design System — behaviours entry (vanilla JS, no dependencies, ES module).
 * Every feature is opt-in through data-ds-* attributes and works with server-rendered HTML (Razor, Blade, Django)
 * and with SPAs: document-level listeners are wired once; call DS.init(root) after inserting markup.
 * UI strings follow <html lang> (English and Indonesian built in; DS.addMessages() adds more languages).
 * Each module lives in ./modules/*.js and exports wire() (once per page), init(root) (idempotent) and an optional api.
 */
import { html, config, configure, addMessages, t, locale, onDialogClose } from "./core.js";
import * as themeModule from "./modules/theme.js";
import * as shellModule from "./modules/shell.js";
import * as toastModule from "./modules/toast.js";
import * as guardModule from "./modules/guard.js";
import * as dialogModule from "./modules/dialog.js";
import * as formsModule from "./modules/forms.js";
import * as tableModule from "./modules/table.js";
import * as comboboxModule from "./modules/combobox.js";
import * as toggleModule from "./modules/toggle.js";
import * as inputsModule from "./modules/inputs.js";
import * as choicesModule from "./modules/choices.js";
import * as datepickerModule from "./modules/datepicker.js";
import * as uploadModule from "./modules/upload.js";
import * as validationModule from "./modules/validation.js";
import * as chipsModule from "./modules/chips.js";
import * as treeViewModule from "./modules/tree-view.js";
import * as selectionModule from "./modules/selection.js";
import * as carouselModule from "./modules/carousel.js";
import * as tooltipModule from "./modules/tooltip.js";
import * as accordionModule from "./modules/accordion.js";
import * as sheetModule from "./modules/sheet.js";
import * as popoverModule from "./modules/popover.js";
import * as menuModule from "./modules/menu.js";
import * as contextMenuModule from "./modules/context-menu.js";
import * as commandModule from "./modules/command.js";
import * as tabsModule from "./modules/tabs.js";
import * as navigationMenuModule from "./modules/navigation-menu.js";
import * as resizableModule from "./modules/resizable.js";

const MODULES = {
  theme: themeModule,
  shell: shellModule,
  toast: toastModule,
  guard: guardModule,
  dialog: dialogModule,
  forms: formsModule,
  table: tableModule,
  combobox: comboboxModule,
  toggle: toggleModule,
  inputs: inputsModule,
  choices: choicesModule,
  datepicker: datepickerModule,
  upload: uploadModule,
  validation: validationModule,
  chips: chipsModule,
  treeView: treeViewModule,
  selection: selectionModule,
  carousel: carouselModule,
  tooltip: tooltipModule,
  accordion: accordionModule,
  sheet: sheetModule,
  popover: popoverModule,
  menu: menuModule,
  contextMenu: contextMenuModule,
  command: commandModule,
  tabs: tabsModule,
  navigationMenu: navigationMenuModule,
  resizable: resizableModule,
};

// One set of document/window listeners per page, even if the module is loaded twice under different URLs (?v=hash).
const WIRED = "__citiaDsWired";

function each(step, run) {
  for (const [name, mod] of Object.entries(MODULES)) {
    try { run(mod); } catch (error) { console.error(`[ds] ${name}.${step} failed`, error); }
  }
}

/** Wire per-element widgets inside root (default document). Safe to call again after inserting markup. */
export function init(root = document) {
  if (!window[WIRED]) {
    window[WIRED] = true;
    document.addEventListener("close", onDialogClose, true);
    each("wire", (mod) => mod.wire?.());
  }
  each("init", (mod) => mod.init?.(root));
}

const DS = { configure, init, addMessages, t, locale, config };
for (const mod of Object.values(MODULES)) if (mod.api) Object.assign(DS, mod.api);

export default DS;
export { configure, addMessages, t, locale };
export const { theme, toast, confirm, guard, addComboboxOption, copyText } = DS;

// Global handle for inline scripts in server-rendered views: DS.toast({ tone: "success", title: "Saved" }).
if (!("DS" in window)) window.DS = DS;

if (!html.hasAttribute("data-ds-manual")) {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => init(), { once: true });
  else init();
}
