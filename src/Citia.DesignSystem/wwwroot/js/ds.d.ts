export type ThemeMode = "light" | "dark" | "system";
export type Tone = "success" | "info" | "warning" | "error";
export type ToastTone = Tone | "loading";
export type Side = "top" | "bottom" | "left" | "right";
export type Align = "start" | "center" | "end";

/** An element, or a CSS selector that resolves to one. */
export type ElementOrSelector<T extends Element = HTMLElement> = T | string;
/** An element, or its id. */
export type ElementOrId<T extends Element = HTMLElement> = T | string;
/** Anything that can anchor a floating layer. */
export type Anchor = Element | { getBoundingClientRect(): DOMRect };

export interface DsConfig {
  /** daisyUI theme name used for light (default "light", or data-ds-light on <html>). */
  light: string;
  /** daisyUI theme name used for dark (default "dark", or data-ds-dark on <html>). */
  dark: string;
  /** Prefix for storage keys: <prefix>-theme, <prefix>-sidebar-collapsed, <prefix>-nav-groups, <prefix>-nav-scroll (default "ds"). */
  storage: string;
  /** Language override; null follows <html lang>. */
  locale: string | null;
  /** Auto-hide delay for non-error toasts in ms (default 6000). */
  toastTimeout: number;
  /** How long an export link stays locked in ms (default 15000). */
  exportLock: number;
}

/** UI strings per language: { en: { "toast.close": "Close" }, id: { "toast.close": "Tutup" } }. */
export type DsMessages = Record<string, Record<string, string>>;

export declare function configure(options?: Partial<DsConfig>): void;
export declare function init(root?: ParentNode): void;
export declare function addMessages(dict: DsMessages): void;
export declare function t(key: string, vars?: Record<string, string | number | null | undefined>): string;
export declare function locale(): string;

/* ------------------------------------------------------------------ theme */
export declare const theme: {
  /** Active theme name (html[data-theme]). */
  get(): string;
  getMode(): ThemeMode;
  isDark(): boolean;
  set(mode: ThemeMode, options?: { animate?: boolean }): void;
  toggle(): void;
};

/* ------------------------------------------------------------------ toast, alert, banner, notifications */
export interface ToastAction {
  label: string;
  href?: string;
  onClick?(handle: ToastHandle, event: MouseEvent): void;
  /** Keep the toast open after the action is used. */
  keepOpen?: boolean;
}

export interface ToastOptions {
  tone?: ToastTone;
  title?: string;
  text?: string;
  /** Milliseconds; 0 or Infinity keeps the toast. Errors, loading and toasts with an action stay unless a number is given. */
  timeout?: number;
  /** false replaces the toasts on screen (default true). */
  stack?: boolean;
  /** A toast with the same id is updated instead of duplicated. */
  id?: string;
  position?: "bottom-end" | "bottom-center" | "bottom-start" | "top-end" | "top-center" | "top-start";
  action?: ToastAction;
  /** false hides the close button. */
  closeButton?: boolean;
}

export interface ToastHandle {
  id: string;
  close(): void;
  dismiss(): void;
  update(options?: Partial<ToastOptions>): ToastHandle;
}

export type ToastMessage = string | Partial<ToastOptions>;

export interface ToastApi {
  (options?: ToastOptions): ToastHandle;
  promise<T>(
    promise: Promise<T> | (() => Promise<T>),
    messages?: {
      loading?: ToastMessage;
      success?: ToastMessage | ((value: T) => ToastMessage);
      error?: ToastMessage | ((reason: unknown) => ToastMessage);
    } & Omit<ToastOptions, "tone" | "title" | "text">,
  ): ToastHandle & { promise: Promise<T> };
  success(title: string, options?: Omit<ToastOptions, "tone" | "title">): ToastHandle;
  error(title: string, options?: Omit<ToastOptions, "tone" | "title">): ToastHandle;
  info(title: string, options?: Omit<ToastOptions, "tone" | "title">): ToastHandle;
  warning(title: string, options?: Omit<ToastOptions, "tone" | "title">): ToastHandle;
  loading(title: string, options?: Omit<ToastOptions, "tone" | "title">): ToastHandle;
  /** Close the toast with that id, or every toast without an id. */
  dismiss(id?: string): void;
}

export declare const toast: ToastApi;

/* ------------------------------------------------------------------ dialog */
export interface ConfirmOptions {
  title?: string;
  text?: string;
  /** Accept button text. */
  label?: string;
  tone?: "danger" | "primary";
  /** Which button gets the initial focus (default "cancel"). */
  focus?: "cancel" | "accept";
  /** Run while the dialog is busy; a rejection keeps the dialog open with the error message. */
  action?: () => unknown | Promise<unknown>;
}

export declare function confirm(options?: ConfirmOptions, opener?: Element): Promise<boolean>;

/* ------------------------------------------------------------------ guard */
export declare const guard: {
  isDirty(): boolean;
  allow(): void;
  reset(): void;
  register(form: HTMLFormElement): void;
};

/* ------------------------------------------------------------------ forms */
export declare function copyText(text: string, returnFocusTo?: HTMLElement | null): Promise<boolean>;
export declare function setBusy(el: HTMLElement, label?: string): void;
export declare function clearBusy(el: HTMLElement): void;

/* ------------------------------------------------------------------ combobox */
export declare function addComboboxOption(source: HTMLSelectElement | HTMLInputElement, option: { value: string; label: string; hint?: string }): void;

/* ------------------------------------------------------------------ module namespaces */
export interface OtpControl {
  setState(state: "error" | "success" | "busy" | ""): void;
  clear(): void;
  focus(): void;
  readonly value: string;
}

export interface TagsControl {
  /** Returns the number of tags added. */
  add(text: string): number;
  remove(tag: string): void;
  clear(): void;
  get(): string[];
}

export interface CommandItem {
  label?: string;
  description?: string;
  href?: string;
  value?: string | number;
  /** Icon name from the sprite. */
  icon?: string;
  shortcut?: string;
  group?: string;
  disabled?: boolean;
}

export interface PlaceOptions {
  side?: Side;
  align?: Align;
  gap?: number;
  inset?: number;
}

export interface DsApi {
  configure: typeof configure;
  init: typeof init;
  addMessages: typeof addMessages;
  t: typeof t;
  locale: typeof locale;
  /** The live configuration object. */
  config: DsConfig;

  theme: typeof theme;
  toast: typeof toast;
  confirm: typeof confirm;
  guard: typeof guard;
  addComboboxOption: typeof addComboboxOption;
  copyText: typeof copyText;
  setBusy: typeof setBusy;
  clearBusy: typeof clearBusy;

  alert: { dismiss(alert: Element): void };
  banner: {
    dismiss(banner: ElementOrId<Element>): void;
    reset(id: string): void;
  };
  notif: {
    setUnread(notif: HTMLElement, count: number): void;
    markAllRead(notif: HTMLElement): void;
  };

  dialog: {
    open(dialog: ElementOrId<HTMLDialogElement>, opener?: Element | null): HTMLDialogElement | null;
    close(dialog: ElementOrId<HTMLDialogElement>, value?: string): void;
    busy(dialog: ElementOrId<HTMLDialogElement>, on?: boolean, button?: HTMLElement): void;
    confirm: typeof confirm;
  };

  badge: { set(el: HTMLElement, count: number): void };
  chips: {
    /** Returns false when ds:chip:remove was cancelled. */
    remove(chip: HTMLElement): boolean;
  };

  inputs: {
    refresh(root?: ParentNode): void;
    clear(el: Element): void;
    /** Returns true when the value changed. */
    step(el: HTMLInputElement, direction?: 1 | -1): boolean;
    /** Returns the written (clamped, rounded) value. */
    setNumber(el: HTMLInputElement, value: number): number;
    passwordScore(value: string): 0 | 1 | 2 | 3 | 4;
    locale: typeof locale;
  };

  /** Mark a switch busy while the promise runs; the switch reverts and the promise rejects on failure. */
  switchBusy<T>(input: HTMLInputElement, promise: Promise<T>): Promise<T>;
  otp(element: Element): OtpControl | null;
  tagsInput(element: Element): TagsControl | null;

  dataTable: {
    setTree(button: HTMLElement, open: boolean): void;
    setDensity(root: HTMLElement, density: "compact" | "comfortable", remember?: boolean): void;
    applyFilter(root: HTMLElement): void;
    setColumn(root: HTMLElement, name: string, visible: boolean): void;
  };

  tabs: {
    /** which: index, tab id or data-ds-tab slug, or the tab element. */
    select(root: ElementOrSelector, which: number | string | Element): void;
    refresh(root: ElementOrSelector): void;
  };

  button: {
    loading(el: HTMLElement, on?: boolean, options?: { label?: string; delay?: number }): void;
    success(el: HTMLElement, options?: { label?: string; duration?: number }): void;
  };

  toggle: {
    set(el: HTMLElement, pressed?: boolean): void;
    group: {
      get(group: HTMLElement): { value: string | null; values: string[] };
      set(group: HTMLElement, value: string | string[] | null): void;
    };
  };

  accordion: {
    openAll(accordion: Element): void;
    closeAll(accordion: Element): void;
  };

  picker: {
    /** Opens a date or range picker; time and colour pickers have no popup. */
    open(el: ElementOrSelector<Element>): void;
    close(el: ElementOrSelector<Element>): void;
    /** "2026-05-14", a range "2026-05-01", "2026-05-31", a time "14:30" or a colour "#0f766e". */
    set(el: ElementOrSelector<Element>, ...values: string[]): void;
    /** Returns yyyy-MM-dd, "" for empty text, or null when invalid. */
    parseDate(text: string, lang?: string): string | null;
  };

  upload: {
    files(el: ElementOrSelector<Element>): File[];
    add(el: ElementOrSelector<Element>, files: Iterable<File>): void;
    clear(el: ElementOrSelector<Element>): void;
    formatSize(bytes: number, lang?: string): string;
  };

  validation: {
    /** Returns true when valid. */
    form(form: Element, options?: { focus?: boolean }): boolean;
    field(el: Element): boolean;
    setError(el: Element, message: string): void;
    clearError(el: Element): void;
  };
  formMode(form: HTMLFormElement, mode: "view" | "edit"): void;

  tooltip: {
    show(el: HTMLElement): void;
    hide(): void;
  };

  popover: {
    open(popover: ElementOrId, anchor?: Anchor, options?: { side?: Side; align?: Align; focus?: boolean }): HTMLElement | null;
    close(popover: ElementOrId): void;
    toggle(popover: ElementOrId, anchor?: Anchor): void;
    /** Returns the side used after flipping. */
    place(floating: HTMLElement, anchor: Anchor, options?: PlaceOptions): Side;
  };
  hoverCard: {
    open(id: string): void;
    close(id: string): void;
  };

  menu: {
    open(
      menu: ElementOrId,
      anchor?: Anchor,
      options?: { focus?: "first" | "last" | "menu" | null; side?: Side; align?: Align; gap?: number; trigger?: Element; context?: unknown },
    ): HTMLElement | null;
    close(menu: ElementOrId): void;
    closeAll(): void;
  };

  contextMenu: {
    /** Without x and y the menu opens at the focused element. */
    open(region: ElementOrSelector<Element>, x?: number, y?: number): void;
  };

  command: {
    open(id?: string): HTMLDialogElement | null;
    close(id?: string): void;
    /** Returns the number of visible items. */
    filter(command: ElementOrId, query?: string): number;
    setItems(command: ElementOrId, items?: CommandItem[]): void;
    setLoading(command: ElementOrId, on?: boolean): void;
  };

  sheet: {
    open(sheet: ElementOrId<HTMLDialogElement>, opener?: Element | null, options?: { snap?: number; modal?: boolean }): HTMLDialogElement | null;
    close(sheet: ElementOrId<HTMLDialogElement>): void;
    snap(sheet: ElementOrId<HTMLDialogElement>, index: number): void;
  };

  tree: {
    /** nodes: a DocumentFragment, an element, or an array of li[role=treeitem]. */
    load(item: HTMLElement, nodes: DocumentFragment | Element | Element[]): void;
    fail(item: HTMLElement): void;
    setExpanded(item: HTMLElement, open: boolean, options?: { announce?: boolean }): void;
    expandAll(tree: HTMLElement): void;
    collapseAll(tree: HTMLElement): void;
  };

  selection: {
    clear(root: HTMLElement): void;
    selectAll(root: HTMLElement, state?: boolean): void;
    values(root: HTMLElement): string[];
    count(root: HTMLElement): number;
  };

  language: {
    /** Two-letter language of the page. */
    current(): string;
    /** Language remembered on this device. */
    remembered(): string | null;
  };

  navbar: { close(bar: ElementOrSelector): void };

  resizable: {
    /** Percentages, one per panel. */
    setSizes(element: HTMLElement, sizes: number[]): void;
  };

  carousel: {
    next(el: ElementOrSelector): void;
    prev(el: ElementOrSelector): void;
    goTo(el: ElementOrSelector, index: number): void;
    play(el: ElementOrSelector): void;
    pause(el: ElementOrSelector): void;
  };
  image: {
    /** Returns false when the trigger has no image source. */
    zoom(el: ElementOrSelector): boolean;
  };
}

declare const DS: DsApi;
export default DS;

declare global {
  interface Window {
    /** Same object as the default export, for inline scripts in server-rendered views. */
    DS: DsApi;
  }
}
