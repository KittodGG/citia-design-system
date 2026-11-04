---
title: Theme switcher
group: components
category: navigation
order: 7
summary: Biarkan pengguna memilih tema terang, gelap, atau sistem: segmented control dengan thumb geser, atau satu tombol ikon, keduanya digerakkan theme.js tanpa flash.
---

Theme switcher memungkinkan pengguna memilih tampilan antarmuka: Terang, Gelap, atau Sistem (mengikuti sistem operasi, langsung). Pilihan disimpan di browser dan diterapkan sebelum paint pertama, sehingga pengunjung yang kembali tidak pernah melihat flash tema yang salah. Pakai bentuk **segmented** di halaman pengaturan dan di sidebar atau footer, tempat ketiga opsi muat. Pakai **icon toggle** di navbar atau top bar yang ruangnya sempit; tombol ini berganti antara terang dan gelap.

Kedua bentuk digerakkan oleh `theme.js`; tidak ada yang perlu dikonfigurasi di markup selain atribut data.

## Examples

### Segmented (icons)

Tiga tombol ikon, masing-masing dengan nama yang dapat diakses dan tooltip. `aria-pressed` menandai pilihan tersimpan; thumb bergeser ke pilihan itu. Coba sendiri: ini mengubah tema seluruh halaman.

```html preview title="Segmented switcher, ikon"
<div class="ds-segmented ds-theme-switcher" role="group" aria-label="Tema" data-ds-segmented>
  <button type="button" data-ds-theme-set="light" aria-pressed="false" aria-label="Terang" title="Terang"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-sun"/></svg></button>
  <button type="button" data-ds-theme-set="dark" aria-pressed="false" aria-label="Gelap" title="Gelap"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-moon"/></svg></button>
  <button type="button" data-ds-theme-set="system" aria-pressed="false" aria-label="Sistem" title="Sistem"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-monitor"/></svg></button>
</div>
```

### Segmented with labels

Pakai `has-labels` di halaman pengaturan, tempat kata lebih jelas daripada ikon.

```html preview title="Segmented switcher, label"
<div class="ds-segmented ds-theme-switcher has-labels" role="group" aria-label="Tema" data-ds-segmented>
  <button type="button" data-ds-theme-set="light" aria-pressed="false"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-sun"/></svg><span>Terang</span></button>
  <button type="button" data-ds-theme-set="dark" aria-pressed="false"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-moon"/></svg><span>Gelap</span></button>
  <button type="button" data-ds-theme-set="system" aria-pressed="false"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-monitor"/></svg><span>Sistem</span></button>
</div>
<p class="ds-text-subtle" style="margin-top:0.75rem;font-size:0.875rem">Sistem mengikuti perangkat Anda dan berubah bersamanya, misalnya saat matahari terbenam.</p>
```

### Icon toggle

Satu tombol 40px yang berganti antara terang dan gelap. Tombol menampilkan tema saat ini (matahari di mode terang, bulan di mode gelap) dan labelnya menyebut aksinya: "Aktifkan tema gelap". Kedua ikon saling memudar dan berputar seperempat putaran.

```html preview title="Icon toggle"
<button type="button" class="ds-theme-toggle" data-ds-theme-toggle aria-label="Aktifkan tema gelap">
  <svg class="ds-icon ds-theme-toggle__light" aria-hidden="true"><use href="#ds-icon-sun"/></svg>
  <svg class="ds-icon ds-theme-toggle__dark" aria-hidden="true"><use href="#ds-icon-moon"/></svg>
</button>
```

### Sizes

`is-sm` dan `is-lg` berlaku pada bentuk segmented seperti pada Segmented control lainnya.

```html preview title="Segmented kecil"
<div class="ds-segmented ds-theme-switcher is-sm" role="group" aria-label="Tema (kecil)" data-ds-segmented>
  <button type="button" data-ds-theme-set="light" aria-pressed="false" aria-label="Terang" title="Terang"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-sun"/></svg></button>
  <button type="button" data-ds-theme-set="dark" aria-pressed="false" aria-label="Gelap" title="Gelap"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-moon"/></svg></button>
  <button type="button" data-ds-theme-set="system" aria-pressed="false" aria-label="Sistem" title="Sistem"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-monitor"/></svg></button>
</div>
```

## States

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak ada | ikon `--ds-subtle` di atas track |
| Hover | pointer di atas opsi atau toggle | tint 6%; teks menjadi kontras penuh |
| Pressed (active press) | pointer ditekan | tint 10% |
| Focus-visible | fokus keyboard | focus ring `--ds-focus` 2px |
| Selected | `aria-pressed="true"` | thumb terangkat di bawah opsi, ikon kontras penuh |
| System selected | tidak ada pilihan tersimpan | opsi Sistem berstatus pressed; halaman mengikuti OS dan diperbarui langsung |
| Dark | `html[data-ds-scheme="dark"]` | toggle menampilkan bulan, label terbaca "Aktifkan tema terang" |
| Changing | setelah klik | halaman saling memudar selama 200ms (View Transitions); instan pada reduced motion |
| Another tab changed it | event `storage` | halaman mengikuti tanpa animasi |

## Anatomy

- `.ds-segmented.ds-theme-switcher` root dengan `role="group"`, nama, dan `data-ds-segmented`. Modifier `has-labels`.
- Opsi: `button[data-ds-theme-set="light|dark|system"]`.
- `.ds-theme-toggle[data-ds-theme-toggle]` tombol tunggal, dengan ikon `.ds-theme-toggle__light` dan `.ds-theme-toggle__dark`.

## Usage

- Tawarkan ketiga opsi bila memungkinkan. "Sistem" adalah default terbaik untuk pengunjung baru.
- Letakkan toggle di top bar atau navbar, dan bentuk segmented di halaman pengaturan dan di footer sidebar.
- Jangan sembunyikan kontrol tema di balik lebih dari satu klik.
- Jangan menganimasikan perubahan tema sendiri; `theme.js` menangani cross-fade dan menghormati reduced motion.
- Sertakan `_DsHead` (atau `theme-init.js` inline) di `<head>`, sebelum stylesheet. Tanpa itu, paint pertama bisa berkedip.
- Uji setiap layar di kedua tema.

## Accessibility

- Bentuk segmented adalah grup tombol toggle: `aria-pressed` bernilai true pada pilihan tersimpan. Tombol hanya-ikon memiliki `aria-label` dan `title` (dilokalkan: "Terang", "Gelap", "Sistem").
- Toggle memiliki `aria-label` yang menyebut aksinya dan diperbarui setelah tiap perubahan ("Aktifkan tema gelap" / "Aktifkan tema terang").
- Status terpilih ditunjukkan oleh thumb terangkat, bukan hanya perubahan warna.
- Kontras: ikon mempertahankan 3:1 atau lebih di kedua tema; focus ring memakai `--ds-focus`.
- Forced colours: opsi terpilih mendapat border `Highlight` 2px.
- Perubahan tema hanya diumumkan lewat perubahan label; live region tidak diperlukan karena seluruh halaman berubah.

| Tombol | Aksi |
| --- | --- |
| Tab / Shift+Tab | Berpindah antar tombol |
| Enter / Space | Menerapkan tema |

## Razor

```cshtml
<ds-theme-switcher />                          @* segmented, icons *@
<ds-theme-switcher variant="labels" />         @* segmented with words *@
<ds-theme-switcher variant="toggle" />         @* single icon button *@
<ds-theme-switcher size="sm" label="Colour theme" />
```

Label berasal dari `DsText` ("theme.light", "theme.dark", "theme.system", "theme.label") dan mengikuti request culture.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-theme-set="light\|dark\|system"` | Menerapkan dan menyimpan pilihan itu; `aria-pressed` mengikuti pilihan tersimpan |
| `data-ds-theme-toggle` | Berganti antara terang dan gelap; menjaga `aria-label` dan `title` tetap mutakhir |
| `data-ds-theme-icon="light\|dark"` | Anak opsional dari toggle, ditampilkan menurut state (atribut hidden). Ikon `.ds-theme-toggle` tidak perlu atribut: CSS yang menampilkannya |

```js
DS.theme.get();        // active theme name, e.g. "light"
DS.theme.getMode();    // "light" | "dark" | "system" (the saved choice)
DS.theme.isDark();
DS.theme.set("dark");  // saves and applies; set("system") clears the saved choice
DS.theme.toggle();

document.addEventListener("ds:themechange", (e) => console.log(e.detail.mode, e.detail.theme));
```

Pilihan disimpan di `localStorage` dengan key `<prefix>-theme` (`ds-theme` secara default; prefix berasal dari `data-ds-storage` pada `<html>`). Menyimpan "system" menghapus key tersebut. `<meta name="theme-color">` mengikuti permukaan halaman.

## Tokens

`--color-base-200`, `--color-base-300`, `--color-base-100`, `--color-base-content`, `--ds-subtle`, `--ds-focus`, `--ds-radius-xl`, `--ds-radius-lg`, `--ds-shadow-xs`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-duration-enter`, `--ds-duration-theme`, `--ds-duration-spring`, `--ds-ease-emphasized`, `--ds-ease-spring`.

## Native and daisyUI

Elemen `<button>` native. `swap` dan `theme-controller` milik daisyUI tidak dipakai, karena tema DS dinamai lewat `data-theme` pada `<html>` dan pilihan harus berfungsi sebelum paint pertama. Lihat [Theming](./theming.md) untuk cara tema didefinisikan.
