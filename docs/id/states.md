---
title: State
group: foundations
order: 8
summary: Matriks state yang diikuti setiap komponen: state pointer, keyboard, pilihan, ketersediaan, validasi, dan aktivitas, state layer, aturan fokus, dan state lingkungan.
---

Setiap komponen interaktif punya lebih dari tampilan diam. Citia DS merancang dan mendokumentasikan tiap state, menyatakannya dengan HTML native dan ARIA sebelum class apa pun, dan memverifikasinya di kedua tema. Halaman ini adalah acuan bersama; halaman komponen mengulang tabel untuk state miliknya.

## Matriks state

| Grup | State | Dinyatakan oleh | Aturan visual |
| --- | --- | --- | --- |
| Pointer | rest, hover, pressed | `:hover` di dalam `@media (hover: hover)`, `:active` | Hover adalah state layer (`--ds-opacity-state-hover`) atau permukaan satu langkah lebih dalam. Pressed adalah `--ds-opacity-state-pressed` plus `scale(var(--ds-press-scale))` hanya pada tombol dan chip |
| Keyboard | focus-visible, focus-within | `:focus-visible`, `:focus-within` | Cincin 2px `--ds-focus`, offset 2px; tidak pernah dihapus, tidak pernah tertutup UI sticky; tanpa cincin pada fokus mouse |
| Pilihan | selected, checked, indeterminate, on/off, current | `:checked`, `:indeterminate`, `aria-checked`, `aria-pressed`, `aria-selected`, `aria-current` | Isi tonal (`--ds-opacity-state-selected` dari primary) dengan teks primary, atau glyph centang. Jangan hanya warna |
| Disclosure | expanded, collapsed, open, closed | `aria-expanded`, `[open]`, `:popover-open` | Chevron berputar 180° (90° untuk tree); panel masuk dengan aturan [motion](./motion.md) |
| Ketersediaan | disabled, aria-disabled, read-only | `:disabled`, `[aria-disabled="true"]`, `[readonly]` | Disabled memakai `--ds-opacity-disabled`, `cursor: not-allowed`, tanpa hover atau tekan. `aria-disabled` tetap bisa difokus dan menjelaskan alasannya. Read-only menjaga kontras normal dan bisa diseleksi |
| Validasi | required, invalid, success, warning | `required`, `:user-invalid`, `aria-invalid="true"`, `[data-state="success"]` | Border galat plus pesan `--ds-error-text` dengan ikon di bawah field, dihubungkan `aria-describedby`. Validasi saat blur, validasi ulang saat input setelah galat pertama |
| Aktivitas | busy, progress, umpan balik sukses, galat | `aria-busy="true"`, `[data-state="loading"]`, `is-copied` sementara | Busy menjaga lebar, menampilkan spinner dan label terbaca, memblokir interaksi. Indikator muncul setelah sekitar 300ms. Sukses sementara bertahan 1.6–2 detik |
| Konten | empty, placeholder, autofill, overflow, skeleton | `:placeholder-shown`, `:autofill`, `text-overflow`, `.ds-skeleton` | Placeholder memakai `--ds-subtle` (4.5:1). Autofill menjaga permukaan tema. Teks panjang dibungkus atau dipotong dengan teks penuh tetap tersedia |
| Drag | dragging, drop target | `[data-dragging]`, `[data-drop-target]` | Permukaan terangkat dengan `--ds-shadow-panel`; drop target diwarnai `--ds-opacity-state-drag` dengan border primary putus-putus |
| Varian | tone, ukuran, kepadatan | modifier `is-*`, `btn-*` daisyUI | Setiap varian dan state tetap terbaca di kedua tema: 4.5:1 untuk teks, 3:1 untuk batas dan ikon |
| Lingkungan | gelap, reduced motion, reduced transparency, more contrast, forced colours, RTL, zoom 200%, 320px, cetak | media query, `[dir="rtl"]` | Lihat [State lingkungan](#state-lingkungan) |

## Tombol

```html preview title="State tombol"
<div style="display:flex;flex-wrap:wrap;gap:.75rem;align-items:center">
  <button type="button" class="btn">Rest</button>
  <button type="button" class="btn" aria-pressed="true">Pressed (toggle)</button>
  <button type="button" class="btn" disabled>Disabled</button>
  <button type="button" class="btn" aria-disabled="true" title="Tambahkan klien terlebih dahulu">aria-disabled</button>
  <button type="button" class="btn btn-primary" aria-busy="true"><span class="ds-spinner" aria-hidden="true"></span> Mengirim</button>
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-error">Hapus</button>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Hover | Pointer di atas, pada perangkat yang mendukung hover | Permukaan lebih dalam atau state layer 6% |
| Focus-visible | Fokus keyboard | Cincin `--ds-focus` 2px, offset 2px |
| Pressed | Pointer turun | State layer 10%, skala 0.97 selama 120ms |
| Toggled | `aria-pressed="true"` | Isi tonal terpilih dan teks primary |
| Disabled | `disabled` | Opasitas 55%, `not-allowed`, tanpa hover atau tekan, tidak bisa difokus |
| aria-disabled | `aria-disabled="true"` | Tampilan disabled, tetap bisa difokus, tooltip atau bantuan menjelaskan alasannya |
| Busy | `aria-busy="true"` | Spinner sebelum label, lebar sama, input diblokir |

## Field

```html preview title="State field"
<div style="display:grid;gap:1rem;max-width:26rem">
  <div class="ds-field"><label for="st-rest">Rest</label><input id="st-rest" class="input" placeholder="Nama proyek" /></div>
  <div class="ds-field"><label for="st-filled">Terisi</label><input id="st-filled" class="input" value="Redesain pelabuhan" /></div>
  <div class="ds-field"><label for="st-ro">Read-only</label><input id="st-ro" class="input" value="PRJ-1024" readonly /></div>
  <div class="ds-field"><label for="st-dis">Disabled</label><input id="st-dis" class="input" value="Ayu Lestari" disabled /></div>
  <div class="ds-field"><label for="st-inv">Tidak valid</label><input id="st-inv" class="input" value="2026-13-40" aria-invalid="true" aria-describedby="st-inv-e" /><p id="st-inv-e" class="ds-field-error">Masukkan tanggal yang valid, misalnya 2026-03-14.</p></div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Focus | Fokus keyboard atau pointer | Border primary dan cincin 2px |
| Placeholder | `:placeholder-shown` | Teks `--ds-subtle`, bukan satu-satunya label |
| Read-only | `readonly` | Tanpa penekanan border, kontras normal, bisa diseleksi |
| Disabled | `disabled` | Opasitas 55%, tidak bisa difokus, tidak ikut submit |
| Invalid | `aria-invalid="true"` | Border galat, ikon dan pesan di bawah, tautan `aria-describedby` |

## Kontrol pilihan

```html preview title="Checkbox, radio, dan switch"
<div style="display:flex;flex-wrap:wrap;gap:1.5rem 2rem;align-items:center">
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="checkbox" class="checkbox" /> Tidak dicentang</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="checkbox" class="checkbox" checked /> Dicentang</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="checkbox" class="checkbox" aria-checked="mixed" /> Campuran</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="checkbox" class="checkbox" disabled checked /> Disabled</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="radio" class="radio" name="st-r" checked /> Terpilih</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="radio" class="radio" name="st-r" /> Lainnya</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="checkbox" role="switch" class="toggle" checked /> Aktif</label>
  <label style="display:inline-flex;gap:.5rem;align-items:center"><input type="checkbox" role="switch" class="toggle" disabled /> Mati, disabled</label>
</div>
```

Campuran adalah `aria-checked="mixed"` di markup atau `input.indeterminate = true` di skrip; HTML tidak punya atributnya.

## Disclosure dan pemuatan

```html preview title="Details, spinner, dan skeleton"
<div style="display:grid;gap:1rem;max-width:26rem">
  <details style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box);padding:.75rem 1rem"><summary style="cursor:pointer;font-weight:600">Tertutup</summary><p style="margin:.5rem 0 0">Tersembunyi sampai dibuka.</p></details>
  <details open style="border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box);padding:.75rem 1rem"><summary style="cursor:pointer;font-weight:600">Terbuka</summary><p style="margin:.5rem 0 0">Tampil, dan summary melaporkan state expanded secara native.</p></details>
  <div style="display:flex;align-items:center;gap:.75rem"><span class="ds-spinner" aria-hidden="true"></span><span role="status">Memuat faktur</span></div>
  <div class="skeleton" style="height:1rem;width:70%" aria-hidden="true"></div>
  <div class="skeleton" style="height:1rem;width:45%" aria-hidden="true"></div>
</div>
```

## State layer

State layer adalah lapisan tipis warna isi di atas permukaan. Ia bekerja di permukaan mana pun dan di kedua tema karena dihitung dengan `color-mix()`.

```ds-tokens
opacity
```

| Token | Nilai | Pemakaian |
| --- | --- | --- |
| `--ds-opacity-state-hover` | 0.06 | Hover |
| `--ds-opacity-state-pressed` | 0.10 | Pressed |
| `--ds-opacity-state-selected` | 0.12 | Selected, current |
| `--ds-opacity-state-drag` | 0.16 | Drop target |
| `--ds-opacity-disabled` | 0.55 | Kontrol disabled dan busy |

## Aturan focus ring

- 2px solid `--ds-focus` dengan offset 2px pada `:focus-visible`. Komponen yang rata dengan tepinya memakai -2px.
- Jangan `outline: none` tanpa pengganti yang setara.
- Fokus tidak boleh tertutup header sticky atau bar bawah (WCAG 2.4.11). Pakai `scroll-padding` sebesar tinggi elemen sticky.
- Tanpa cincin pada fokus mouse; `:focus-visible` menanganinya.
- Kontras cincin fokus 3:1 terhadap permukaan dan kontrolnya.

## Menyatakan state

1. **Native dahulu.** `disabled`, `checked`, `readonly`, `required`, `open`, `:user-invalid`.
2. **ARIA bila native tidak ada.** `aria-pressed`, `aria-expanded`, `aria-selected`, `aria-current`, `aria-invalid`, `aria-busy`, `aria-disabled`.
3. **`data-state` terakhir**, hanya bila tidak ada state ARIA yang cocok (misalnya `data-state="success"`).
4. Beri gaya dari atribut, bukan dari class paralel, agar teknologi bantu dan CSS tidak pernah berselisih.

## State lingkungan

| Lingkungan | Perilaku |
| --- | --- |
| Gelap | Setiap state diperiksa di `data-theme="dark"`; state layer tetap bekerja karena mencampur warna isi |
| Reduced motion | Transform hilang, cross-fade opasitas singkat tetap, loop berhenti. Lihat [Motion](./motion.md) |
| Reduced transparency | Lapisan melayang menjadi opak, scrim naik ke 70% |
| More contrast | `--ds-subtle` menjadi warna isi penuh, border lebih gelap |
| Forced colours | Fokus memakai `2px solid CanvasText`; pilihan butuh glyph atau border, bukan isi warna |
| RTL | Properti logis; chevron dan indikator ikut tercermin |
| Zoom 200% dan 320px | Tanpa pemotongan, tanpa scroll horizontal kecuali di dalam area data |

## Panduan

- Tampilkan setiap state yang bisa terjadi; jangan merilis kontrol dengan tampilan diamnya saja.
- Pilih `aria-disabled` daripada `disabled` bila pengguna perlu tahu alasan aksi tidak tersedia.
- Jangan menyatakan state hanya dengan warna. Tambahkan glyph, perubahan bobot, atau indikator.
- Jangan menampilkan indikator pemuatan untuk proses di bawah 300ms.

## Aksesibilitas

State diumumkan lewat atribut yang sama dengan yang menatanya: `aria-busy` untuk area sibuk, `aria-invalid` dengan `aria-describedby` untuk galat, `aria-pressed` untuk toggle. Lihat [Aksesibilitas](./accessibility.md).
