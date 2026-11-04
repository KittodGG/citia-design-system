---
title: Kbd
group: components
category: data-display
order: 15
summary: Tombol keyboard dan pintasan sebagai tutup tombol kecil, dalam tombol tunggal, kombinasi seperti Ctrl + K, dan urutan, tiga ukuran, dengan simbol Apple yang ditukar lewat skrip.
source: TPS app.css .ds-kbd (base.css), kbd Tailwind UI dan shadcn/ui
---

`kbd` menampilkan sebuah tombol atau pintasan: di teks bantuan, item menu, tooltip, baris command palette, dan petunjuk pada tombol. Ia memberi tahu apa yang ditekan; ia tidak memicu apa pun. Pakai teks [tooltip](./tooltip.md) untuk petunjuk singkat pada satu kontrol, dan halaman bantuan dengan tabel keyboard untuk daftar lengkap.

## Contoh

```html preview title="Tombol tunggal dan kombinasi"
<div style="display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap">
  <kbd class="ds-kbd">Esc</kbd>
  <kbd class="ds-kbd">Enter</kbd>
  <span class="ds-kbd-group"><kbd class="ds-kbd" data-ds-kbd-mac="⌘" data-ds-kbd-mac-label="Command">Ctrl</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd">K</kbd></span>
  <span class="ds-kbd-group"><kbd class="ds-kbd" data-ds-kbd-mac="⌘" data-ds-kbd-mac-label="Command">Ctrl</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd" data-ds-kbd-mac="⇧" data-ds-kbd-mac-label="Shift">Shift</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd">P</kbd></span>
  <span class="ds-kbd-group"><kbd class="ds-kbd" aria-label="Panah atas">↑</kbd><kbd class="ds-kbd" aria-label="Panah bawah">↓</kbd></span>
</div>
```

```html preview title="Ukuran"
<div style="display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap">
  <span class="ds-kbd-group"><kbd class="ds-kbd is-sm">Ctrl</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd is-sm">S</kbd></span>
  <span class="ds-kbd-group"><kbd class="ds-kbd">Ctrl</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd">S</kbd></span>
  <span class="ds-kbd-group"><kbd class="ds-kbd is-lg">Ctrl</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd is-lg">S</kbd></span>
</div>
```

```html preview title="Dalam konteks: kalimat, tombol, menu, dan urutan"
<div style="display:grid;gap:1rem;max-width:34rem">
  <p>Tekan <span class="ds-kbd-group"><kbd class="ds-kbd is-sm" data-ds-kbd-mac="⌘" data-ds-kbd-mac-label="Command">Ctrl</kbd><span class="ds-kbd-sep">+</span><kbd class="ds-kbd is-sm">K</kbd></span> untuk membuka command palette, atau <kbd class="ds-kbd is-sm">Esc</kbd> untuk menutupnya.</p>
  <div style="display:flex;gap:.75rem;flex-wrap:wrap;align-items:center">
    <button type="button" class="btn btn-primary btn-sm">Simpan <kbd class="ds-kbd is-sm" data-ds-kbd-mac="⌘" data-ds-kbd-mac-label="Command">Ctrl</kbd></button>
    <button type="button" class="btn btn-ghost btn-sm">Cari <span class="ds-kbd-group"><kbd class="ds-kbd is-sm" data-ds-kbd-mac="⌘" data-ds-kbd-mac-label="Command">Ctrl</kbd><kbd class="ds-kbd is-sm">K</kbd></span></button>
  </div>
  <div class="ds-menu-panel" style="position:static;width:auto;max-width:18rem">
    <button type="button" style="justify-content:space-between"><span>Faktur baru</span><kbd class="ds-kbd is-sm is-ghost">N</kbd></button>
    <button type="button" style="justify-content:space-between"><span>Buka daftar proyek</span><span class="ds-kbd-group is-sequence"><kbd class="ds-kbd is-sm is-ghost">G</kbd><span class="ds-kbd-sep">lalu</span><kbd class="ds-kbd is-sm is-ghost">P</kbd></span></button>
  </div>
</div>
```

## State

`kbd` tidak interaktif, jadi tidak punya status hover, pressed, atau fokus. Ini adalah varian yang penting.

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Tutup tombol 24px, border tipis dengan tepi bawah lebih tebal, mono 12px, isi permukaan |
| Small, large | `is-sm`, `is-lg` | 20px dengan teks 11px, atau 32px dengan teks 14px |
| Quiet | `is-ghost`, atau di dalam item `.btn` dan `.ds-menu-panel` | Tanpa border, tint konten 8%, teks subtle |
| On a primary button | Di dalam `.btn-primary` | Tint 18% dari warna teks tombol |
| Apple platform | `data-ds-kbd-mac` dan Mac, iPhone, atau iPad | Teks menjadi ⌘, ⇧, ⌥, atau ⌃; `aria-label` menjadi nama tombol |
| Combination | `.ds-kbd-group` dengan `.ds-kbd-sep` | Tombol berjarak 4px dengan tanda plus yang terbaca di antaranya |
| Sequence | `.ds-kbd-group.is-sequence` | Pemisahnya berupa kata ("lalu") dalam font isi |
| Forced colours | `forced-colors: active` | Border `ButtonText` |
| Print | Selalu | Tercetak seperti teks biasa; tanpa perubahan |

## Anatomi

- `kbd.ds-kbd` tutup tombol, dengan `is-sm`, `is-lg`, `is-ghost`.
- `.ds-kbd-group` membungkus kombinasi atau urutan; `.ds-kbd-sep` tanda plus atau kata di antara tombol; `.is-sequence` untuk "tekan, lalu tekan".

## Penggunaan

- Tulis nama tombol seperti tercetak di keyboard: `Ctrl`, `Shift`, `Alt`, `Enter`, `Esc`, `Tab`. Pakai `↑ ↓ ← →` untuk panah dan beri `aria-label`.
- Tulis kombinasi dengan `+` di antara tombol, satu `kbd` per tombol. Jangan menaruh `Ctrl+K` dalam satu `kbd`.
- Tampilkan pengubah sesuai platform: tambahkan `data-ds-kbd-mac="⌘"` pada `Ctrl` agar pengguna Apple melihat ⌘ dan yang lain melihat Ctrl.
- Pakai `is-sm` di dalam tombol, menu, dan tooltip (20px) dan ukuran bawaan di teks berjalan.
- Jangan memakai lebih dari 3 tombol dalam satu pintasan; jangan menampilkan pintasan yang tidak berfungsi di halaman saat ini.
- Jangan menata `kbd` seperti tombol. Bila bisa diklik, pakai [button](./button.md).

## Aksesibilitas

- `kbd` adalah elemen semantik untuk input keyboard; pembaca layar membacakan teksnya. Tombol berupa kata tidak butuh tambahan.
- Tombol simbol (↑, ⌘) butuh nama yang diucapkan di `aria-label`. Penukaran Apple mengaturnya dari `data-ds-kbd-mac-label`.
- Tanda plus di antara tombol adalah teks asli, jadi "Ctrl plus K" dibaca apa adanya.
- Kontras: teks 4,5:1 pada isi tutup tombol dan 3:1 untuk border, di kedua tema.
- Pintasan yang ditampilkan harus bisa dijangkau dengan cara lain (item menu atau tombol): pintasan tidak pernah menjadi satu-satunya jalan.
- Tanpa gerak.

| Tombol | Aksi |
| --- | --- |
| Tidak ada | `kbd` hanya untuk tampilan; tidak bisa difokuskan |

## Razor

```cshtml
<ds-kbd keys="Mod+K" />
<ds-kbd keys="Mod+Shift+P" size="sm" />
<ds-kbd keys="Esc" ghost />
<p>Tekan <ds-kbd keys="Up" /> dan <ds-kbd keys="Down" /> untuk berpindah.</p>
```

`keys` dipecah pada `+`. Token: `Mod` (Ctrl, ⌘ di Apple), `Ctrl`, `Cmd`, `Alt`, `Shift`, `Enter`, `Esc`, `Tab`, `Backspace`, `Delete`, `Space`, `Up`, `Down`, `Left`, `Right`, `Home`, `End`, `PageUp`, `PageDown`, `F1` sampai `F12`, atau satu karakter apa pun. Satu tombol merender satu `kbd`; beberapa tombol merender `.ds-kbd-group`. `size` berisi `sm` atau `lg`, `ghost` memilih gaya senyap. Bila `keys` kosong, isi tag yang dipakai.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `[data-ds-kbd-mac="⌘"]` | Di Mac, iPhone, dan iPad teks elemen berganti menjadi simbol ini; teks asli disimpan di `data-ds-kbd-original` |
| `[data-ds-kbd-mac-label="Command"]` | Nama yang diucapkan, diatur sebagai `aria-label` saat penukaran terjadi |

Deteksi membaca `navigator.userAgentData.platform`, lalu `navigator.platform`. Tanpa skrip, teks biasa (`Ctrl`) tetap tampil, yang benar untuk kebanyakan keyboard.

## Token

`--ds-kbd-size` (lokal), `--color-base-100`, `--color-base-300`, `--color-base-content`, `--ds-font-mono`, `--ds-subtle`, `--ds-radius-sm`, `--ds-radius-md`.

## Native dan daisyUI

Dibangun di atas elemen `kbd` native. daisyUI `kbd` tetap tampil; class `ds-kbd` memberi DS tutup tombol yang sama dengan tepi bawah lebih tebal, ukuran, grup, dan gaya senyap.
