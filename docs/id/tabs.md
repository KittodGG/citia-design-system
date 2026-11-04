---
title: Tabs
group: components
category: navigation
order: 3
summary: Beralih antartampilan dari objek yang sama. Gaya underline, pill, dan boxed, tab panel atau tautan, indicator geser, overflow horizontal, dan tata letak vertikal.
source: TPS app.css .pt-tabs L3639–3642
---

Tabs beralih antartampilan dari satu objek, misalnya Ringkasan, Aktivitas, dan File pada sebuah proyek. Tiap tab menampilkan panelnya sendiri atau membuka URL-nya sendiri. Pakai tabs untuk 2 sampai 7 tampilan yang setara. Untuk satu pilihan yang mengubah cara data yang sama ditampilkan, pakai [Segmented control](./segmented-control.md). Untuk langkah berurutan, pakai [Stepper](./stepper.md). Untuk tujuan di seluruh situs, pakai [Navbar](./navbar.md).

Ada dua jenis. **Panel tabs** mengikuti pola WAI-ARIA tabs: satu tab list, satu panel per tab, navigasi tombol panah, tanpa memuat ulang halaman. **Link tabs** adalah `<nav>` berisi tautan; tiap tab adalah satu halaman dan yang sedang dibuka memakai `aria-current="page"`.

## Examples

### Underline

Bawaan. Indicator 2px berwarna `--color-primary` bergeser ke tab terpilih dengan easing spring. Di bawah list ada garis tipis.

```html preview title="Tabs underline (panel tabs)"
<div class="ds-tabs" data-ds-tabs>
  <div class="ds-tabs__list" role="tablist" aria-label="Proyek PRJ-1024">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-u-overview" aria-controls="tabs-u-overview-p" aria-selected="true">Ringkasan</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-u-activity" aria-controls="tabs-u-activity-p" aria-selected="false" tabindex="-1">Aktivitas <span class="ds-tabs__count">12</span></button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-u-files" aria-controls="tabs-u-files-p" aria-selected="false" tabindex="-1">File <span class="ds-tabs__count">4</span></button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-u-billing" aria-controls="tabs-u-billing-p" aria-selected="false" tabindex="-1" disabled>Penagihan</button>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-u-overview-p" aria-labelledby="tabs-u-overview" tabindex="0">
    <p>Proyek PRJ-1024 sesuai jadwal. Milestone berikutnya: tinjauan desain pada 14 Nov 2026.</p>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-u-activity-p" aria-labelledby="tabs-u-activity" tabindex="0" hidden>
    <p>Ayu Lestari berkomentar pada INV-2026-0418 dua jam lalu. Daniel Okafor menyetujui anggaran.</p>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-u-files-p" aria-labelledby="tabs-u-files" tabindex="0" hidden>
    <p>4 file, 18,4 MB. Unggahan terakhir oleh Mei Tanaka pada 2 Nov 2026.</p>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-u-billing-p" aria-labelledby="tabs-u-billing" tabindex="0" hidden>
    <p>Penagihan tidak tersedia di paket ini.</p>
  </div>
</div>
```

### Pill dan boxed

`is-pill` memberi tab terpilih isian tonal tanpa track. `is-boxed` menaruh tab di atas track dengan thumb terangkat, tampilannya sama dengan [Segmented control](./segmented-control.md) tetapi dengan panel.

```html preview title="Pill dan boxed"
<div class="ds-tabs is-pill" data-ds-tabs>
  <div class="ds-tabs__list" role="tablist" aria-label="Rentang laporan">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-p-day" aria-controls="tabs-p-day-p" aria-selected="true">Hari</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-p-week" aria-controls="tabs-p-week-p" aria-selected="false" tabindex="-1">Minggu</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-p-month" aria-controls="tabs-p-month-p" aria-selected="false" tabindex="-1">Bulan</button>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-p-day-p" aria-labelledby="tabs-p-day" tabindex="0"><p>24 faktur terbit hari ini.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-p-week-p" aria-labelledby="tabs-p-week" tabindex="0" hidden><p>131 faktur terbit minggu ini.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-p-month-p" aria-labelledby="tabs-p-month" tabindex="0" hidden><p>542 faktur terbit pada November 2026.</p></div>
</div>

<div class="ds-tabs is-boxed" data-ds-tabs style="margin-top:2rem">
  <div class="ds-tabs__list" role="tablist" aria-label="Akun">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-b-profile" aria-controls="tabs-b-profile-p" aria-selected="true"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-user"/></svg>Profil</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-b-security" aria-controls="tabs-b-security-p" aria-selected="false" tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-shield"/></svg>Keamanan</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-b-alerts" aria-controls="tabs-b-alerts-p" aria-selected="false" tabindex="-1"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-bell"/></svg>Peringatan</button>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-b-profile-p" aria-labelledby="tabs-b-profile" tabindex="0"><p>Sofia Marquez, kepala Keuangan.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-b-security-p" aria-labelledby="tabs-b-security" tabindex="0" hidden><p>Masuk dua faktor aktif. Penggantian kata sandi terakhir: 3 Okt 2026.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-b-alerts-p" aria-labelledby="tabs-b-alerts" tabindex="0" hidden><p>Peringatan email untuk faktur di atas 10.000.</p></div>
</div>
```

### Link tabs

Pakai tautan bila setiap tampilan punya URL sendiri (sehingga bisa dibagikan, di-bookmark, dan dimuat ulang). Tidak ada role tablist dan tidak ada panel: halaman di bawah tabs yang berubah. Tandai halaman saat ini dengan `aria-current="page"`.

```html preview title="Link tabs"
<nav class="ds-tabs" aria-label="Bagian pelanggan" data-ds-tabs>
  <div class="ds-tabs__list">
    <a class="ds-tabs__tab" href="#" aria-current="page">Detail</a>
    <a class="ds-tabs__tab" href="#">Faktur <span class="ds-tabs__count">8</span></a>
    <a class="ds-tabs__tab" href="#">Kontak</a>
    <a class="ds-tabs__tab" href="#" aria-disabled="true" title="Tersedia di paket Business">Kontrak</a>
  </div>
</nav>
```

### Manual activation

Dengan `data-ds-activation="manual"`, tombol panah hanya memindahkan fokus tanpa mengganti panel; Enter atau Space mengaktifkan. Pakai bila panel berat dimuat atau bila aktivasi mengubah URL.

```html preview title="Aktivasi manual"
<div class="ds-tabs" data-ds-tabs data-ds-activation="manual">
  <div class="ds-tabs__list" role="tablist" aria-label="Ekspor">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-m-csv" aria-controls="tabs-m-csv-p" aria-selected="true">CSV</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-m-xlsx" aria-controls="tabs-m-xlsx-p" aria-selected="false" tabindex="-1">Spreadsheet</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-m-pdf" aria-controls="tabs-m-pdf-p" aria-selected="false" tabindex="-1">PDF</button>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-m-csv-p" aria-labelledby="tabs-m-csv" tabindex="0"><p>Teks biasa, dipisah koma. Terbuka di editor apa pun.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-m-xlsx-p" aria-labelledby="tabs-m-xlsx" tabindex="0" hidden><p>Satu sheet per bulan, rumus tetap dipertahankan.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-m-pdf-p" aria-labelledby="tabs-m-pdf" tabindex="0" hidden><p>Tata letak tetap untuk dicetak dan diarsipkan.</p></div>
</div>
```

### Overflow

Bila tab tidak muat, list menggulir. Efek pudar muncul di setiap sisi yang masih punya tab, dan tombol kecil menggulir sebesar 60% lebar. Tab terpilih digulirkan ke area terlihat saat berubah. Ubah ukuran jendela untuk melihatnya.

```html preview title="List tab yang menggulir"
<div class="ds-tabs" data-ds-tabs style="max-width:28rem">
  <div class="ds-tabs__list" role="tablist" aria-label="Departemen">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-o-1" aria-controls="tabs-o-1-p" aria-selected="true">Keuangan</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-o-2" aria-controls="tabs-o-2-p" aria-selected="false" tabindex="-1">Teknik</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-o-3" aria-controls="tabs-o-3-p" aria-selected="false" tabindex="-1">Dukungan pelanggan</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-o-4" aria-controls="tabs-o-4-p" aria-selected="false" tabindex="-1">Sumber daya manusia</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-o-5" aria-controls="tabs-o-5-p" aria-selected="false" tabindex="-1">Hukum</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-o-6" aria-controls="tabs-o-6-p" aria-selected="false" tabindex="-1">Operasional</button>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-o-1-p" aria-labelledby="tabs-o-1" tabindex="0"><p>14 orang.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-o-2-p" aria-labelledby="tabs-o-2" tabindex="0" hidden><p>38 orang.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-o-3-p" aria-labelledby="tabs-o-3" tabindex="0" hidden><p>22 orang.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-o-4-p" aria-labelledby="tabs-o-4" tabindex="0" hidden><p>9 orang.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-o-5-p" aria-labelledby="tabs-o-5" tabindex="0" hidden><p>5 orang.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-o-6-p" aria-labelledby="tabs-o-6" tabindex="0" hidden><p>17 orang.</p></div>
</div>
```

### Vertical

`is-vertical` menaruh list di sisi inline-start, dengan indicator di tepi inline-end-nya. Arrow Up dan Down berpindah antartab. Pakai untuk halaman pengaturan dengan 5 bagian atau lebih.

```html preview title="Tabs vertikal"
<div class="ds-tabs is-vertical" data-ds-tabs>
  <div class="ds-tabs__list" role="tablist" aria-orientation="vertical" aria-label="Pengaturan">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-v-general" aria-controls="tabs-v-general-p" aria-selected="true">Umum</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-v-team" aria-controls="tabs-v-team-p" aria-selected="false" tabindex="-1">Tim</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-v-billing" aria-controls="tabs-v-billing-p" aria-selected="false" tabindex="-1">Penagihan</button>
  </div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-v-general-p" aria-labelledby="tabs-v-general" tabindex="0"><p>Nama workspace: Northwind. Zona waktu: Asia/Jakarta.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-v-team-p" aria-labelledby="tabs-v-team" tabindex="0" hidden><p>6 anggota. 2 undangan tertunda.</p></div>
  <div class="ds-tabs__panel" role="tabpanel" id="tabs-v-billing-p" aria-labelledby="tabs-v-billing" tabindex="0" hidden><p>Faktur berikutnya: INV-2026-0431 pada 1 Des 2026.</p></div>
</div>
```

### Sizes

`is-sm` (tab 32px) dan `is-lg` (tab 48px). Bawaannya 40px. Di layar sentuh semua ukuran naik menjadi 44px.

```html preview title="Ukuran"
<div class="ds-tabs is-sm" data-ds-tabs>
  <div class="ds-tabs__list" role="tablist" aria-label="Kecil">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-s-a" aria-selected="true">Kecil</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-s-b" aria-selected="false" tabindex="-1">Ringkas</button>
  </div>
</div>
<div class="ds-tabs is-lg" data-ds-tabs style="margin-top:1.5rem">
  <div class="ds-tabs__list" role="tablist" aria-label="Besar">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-l-a" aria-selected="true">Besar</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-l-b" aria-selected="false" tabindex="-1">Lega</button>
  </div>
</div>
```

## States

Di bawah ini terlihat tab terpilih, nonaktif, dan tab dengan hitungan. Hover, pressed, dan focus datang dari pointer dan keyboard: hover memberi tint 6% warna teks, pressed 10%, dan focus menggambar ring 2px di dalam tab (ring luar akan terpotong oleh list yang menggulir).

```html preview title="Terpilih, disabled, aria-disabled, hitungan"
<div class="ds-tabs is-boxed" data-ds-tabs>
  <div class="ds-tabs__list" role="tablist" aria-label="State">
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-st-1" aria-selected="true">Terpilih</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-st-2" aria-selected="false" tabindex="-1">Rest</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-st-3" aria-selected="false" tabindex="-1" disabled>Nonaktif</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-st-4" aria-selected="false" tabindex="-1" aria-disabled="true" title="Memerlukan paket Business">Terkunci</button>
    <button type="button" class="ds-tabs__tab" role="tab" id="tabs-st-5" aria-selected="false" tabindex="-1">Hitungan <span class="ds-tabs__count">128</span></button>
  </div>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak ada | Teks `--ds-subtle`, tanpa isian |
| Hover | pointer di atas tab (perangkat hover) | teks menjadi `--color-base-content`, tint 6% |
| Pressed | pointer ditekan | tint 10%, tanpa scale |
| Focus-visible | fokus keyboard | ring 2px `--ds-focus` di dalam tab |
| Selected | `aria-selected="true"` atau `aria-current="page"` | teks kontras penuh, indicator geser (underline, pill tonal, atau thumb terangkat), dan hitungan tonal |
| Disabled | `disabled` | opacity 55%, kursor `not-allowed`, dilewati tombol panah |
| aria-disabled | `aria-disabled="true"` | tampilan sama; tooltip penjelasnya tetap ada; dilewati tombol panah, klik diabaikan |
| Overflow | list lebih lebar dari kontainer | sisi pudar di tepi yang tersembunyi, tombol gulir |
| Tanpa JavaScript | `data-ds-ready` tidak terpasang | tab terpilih membawa underline atau isiannya sendiri; panel butuh script untuk berganti |

## Anatomy

- `.ds-tabs`: root. Modifier: `is-pill`, `is-boxed`, `is-vertical`, `is-sm`, `is-lg`, `is-full`.
- `.ds-tabs__list`: baris tab (`role="tablist"` untuk panel tabs). Menggulir horizontal.
- `.ds-tabs__tab`: satu tab, berupa `<button role="tab">` atau `<a>`.
- `.ds-tabs__count`: hitungan opsional setelah label.
- `.ds-tabs__panel`: panel (`role="tabpanel"`).
- `.ds-tabs__indicator` dan `.ds-tabs__scroll` dibuat oleh `tabs.js`.

## Usage

- Pakai 2 sampai 7 tab. Lebih dari 7, kelompokkan tampilan atau pakai [Navigation menu](./navigation-menu.md).
- Batasi label satu atau dua kata, maksimal 24 karakter. Label bahasa Indonesia sekitar 40% lebih panjang; list menggulir, tidak membungkus.
- Taruh tampilan yang paling sering dipakai di urutan pertama dan pilih secara bawaan.
- Jangan menyarangkan tabs di dalam tabs.
- Jangan pakai tabs untuk langkah yang harus berurutan; pakai [Stepper](./stepper.md).
- Pakai link tabs bila tampilan butuh URL sendiri; pakai panel tabs bila pergantian tidak boleh memuat ulang halaman.
- Tab nonaktif menyembunyikan alasannya. Pilih `aria-disabled="true"` dengan `title` atau tooltip yang menjelaskan alasannya.
- Jangan taruh tombol primary di dalam tab list.

## Accessibility

Panel tabs mengikuti [pola WAI-ARIA tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). List memakai `role="tablist"` dan nama yang dapat diakses, tiap tab memakai `role="tab"`, `aria-selected`, dan `aria-controls`, tiap panel memakai `role="tabpanel"` dan `aria-labelledby`. Hanya tab terpilih yang masuk urutan Tab (`tabindex="0"`); yang lain `-1`. Panel dapat difokuskan (`tabindex="0"`) agar pengguna keyboard dapat menjangkau konten yang tidak punya elemen fokus.

| Tombol | Aksi |
| --- | --- |
| Tab | Masuk ke list pada tab terpilih, lalu ke panel |
| Arrow Right / Arrow Left | Tab berikutnya atau sebelumnya (terbalik pada halaman kanan-ke-kiri); berputar di ujung |
| Arrow Down / Arrow Up | Tab berikutnya atau sebelumnya pada tabs vertikal |
| Home / End | Tab aktif pertama atau terakhir |
| Enter / Space | Mengaktifkan tab yang difokuskan (hanya aktivasi manual) |

- Aktivasi otomatis (bawaan) memilih tab begitu fokus tiba. Pakai `data-ds-activation="manual"` bila menampilkan panel lambat.
- Kontras: teks tab tidak terpilih memakai `--ds-subtle` (di atas 4,5:1 di kedua tema); indicator memakai `--color-primary`, di atas 3:1 terhadap permukaan.
- Terpilih tidak pernah hanya lewat warna: indicator, isian tonal, atau thumb terangkat menandainya.
- Tombol gulir hanya alat bantu pointer dan dikeluarkan dari urutan Tab serta accessibility tree; pengguna keyboard menggulir dengan tombol panah, yang juga menampilkan tab yang difokuskan.
- Motion: indicator bergerak dengan `--ds-ease-spring` selama `--ds-duration-spring` (500ms) tanpa overshoot, mulai dari posisinya di layar bila diinterupsi, dan langsung loncat di bawah `prefers-reduced-motion`. Panel muncul dengan fade dan naik 5px selama 160ms.
- Forced colours: indicator dan tab terpilih memakai `Highlight`.

## Razor

```cshtml
<ds-tabs label="Proyek PRJ-1024" variant="underline" hash>
    <ds-tab id="overview" label="Ringkasan">
        <p>Proyek PRJ-1024 sesuai jadwal.</p>
    </ds-tab>
    <ds-tab id="activity" label="Aktivitas" count="12" icon="history">
        <partial name="_Activity" model="Model.Activity" />
    </ds-tab>
    <ds-tab id="billing" label="Penagihan" disabled>Tidak tersedia di paket ini.</ds-tab>
</ds-tabs>

@* Link tabs: href pada setiap tab, current pada halaman yang terbuka *@
<ds-tabs label="Bagian pelanggan">
    <ds-tab label="Detail" href="/customers/42" current />
    <ds-tab label="Faktur" href="/customers/42/invoices" count="8" />
</ds-tabs>
```

| Atribut | Efek |
| --- | --- |
| `label` | Nama tab list atau nav tautan yang dapat diakses |
| `variant` | `underline` (bawaan), `pill`, `boxed` |
| `size` | `sm`, `md` (bawaan), `lg` |
| `vertical`, `full` | Tata letak vertikal; tab berbagi lebar |
| `manual` | Aktivasi manual |
| `hash` | Sinkronkan tab terpilih dengan hash URL |
| `selected` | Id tab yang terpilih pada render pertama (bawaan: tab aktif pertama) |

`ds-tab` menerima `id`, `label`, `icon`, `count`, `disabled`, dan untuk link tabs `href` serta `current`. Isi child dari panel tab adalah panelnya.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-tabs` | Pada root `.ds-tabs`: pengaitan ARIA, roving tabindex, indicator, overflow |
| `data-ds-activation="manual"` | Tombol panah hanya memindahkan fokus; Enter atau Space memilih |
| `data-ds-tabs-hash` | Pilih tab sesuai hash URL dan perbarui hash saat berubah |
| `data-ds-tab="name"` | Nama untuk hash (bawaan: id panel) |

```js
DS.tabs.select("#project-tabs", 2);          // berdasarkan indeks, id tab, atau elemen tab
DS.tabs.refresh("#project-tabs");            // ukur ulang setelah tata letak berubah
document.addEventListener("ds:tabs:change", (e) => {
  console.log(e.detail.tab.id, e.detail.panel?.id);
});
```

`ds:tabs:change` naik (bubble) dari root dan membawa `tab`, `panel`, `index`, dan `previous`. Panggil `DS.init(root)` setelah menyisipkan tabs secara dinamis.

## Tokens

`--color-primary`, `--color-base-100`, `--color-base-200`, `--color-base-300`, `--color-base-content`, `--ds-subtle`, `--ds-quiet`, `--ds-focus`, `--ds-radius-lg`, `--ds-radius-xl`, `--ds-radius-full`, `--ds-shadow-xs`, `--ds-size-target`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-primary-soft`, `--ds-opacity-disabled`, `--ds-duration-fast`, `--ds-duration-quick`, `--ds-duration-spring`, `--ds-ease-standard`, `--ds-ease-emphasized`, `--ds-ease-spring`, `--ds-enter-offset`.

## Native and daisyUI

Panel tabs adalah `<button role="tab">` dan `<div role="tabpanel">`; link tabs adalah `<a>` di dalam `<nav>`. Class `.tabs` dan `.tab` milik daisyUI tetap berfungsi sendiri, dan DS hanya menyelaraskan focus ring dan tampilan disabled-nya. Untuk DS tabs, nama daisyUI diterima sebagai alias pada root: `tabs-border` sama dengan underline bawaan, `tabs-box` sama dengan `is-boxed`, `tabs-sm` dan `tabs-lg` sama dengan `is-sm` dan `is-lg`. Markup versi 1 (`<nav class="ds-tabs">` dengan tautan sebagai child langsung) tetap berfungsi dan tampil sebagai boxed tabs.
