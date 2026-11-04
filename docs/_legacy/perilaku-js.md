---
title: Perilaku JavaScript (ds.js)
group: Referensi
order: 2
summary: Referensi lengkap ds.js: pemasangan, konfigurasi, ekspor, event, setiap atribut data-ds-*, kunci penyimpanan, waktu, gerak, dan yang sengaja berbeda dari TPS.
source: wwwroot/js/ds.js dan ds.d.ts; asal TPS wwwroot/js/site.js, master.js, combobox.js, data-table.js, recap-tree.js
---

`ds.js` adalah satu modul ES tanpa dependensi. Semua fitur opt-in lewat atribut `data-ds-*` dan bekerja pada HTML yang dirender server (Razor) maupun SPA: handler klik, input, submit, dan keyboard didelegasikan ke `document`, jadi markup yang disisipkan belakangan langsung bekerja.

Hanya widget per elemen yang perlu `DS.init(wadah)` setelah markup baru disisipkan: grup navigasi, gulir navigasi, tabel `.ds-table-scroll`, form `data-ds-guard`, combobox, dan toast hasil render server.

## Pemasangan {#pasang}

Taruh partial di akhir `<body>`:

```cshtml
<partial name="_DsScripts" />
```

Partial itu menulis `<script type="module" src="~/_content/Citia.DesignSystem/js/ds.js" asp-append-version="true">`. Modul ES tertunda secara alami dan tidak menghalangi render. Tanpa atribut tambahan, ds.js memanggil `init()` sendiri saat DOM siap.

Untuk mengendalikan sendiri, tambahkan `data-ds-manual` di `<html>` dan impor modulnya:

```html
<html lang="id" data-theme="tps" data-ds-manual>
...
<script type="module">
  import DS from "/_content/Citia.DesignSystem/js/ds.js";
  DS.configure({ toastTimeout: 8000 });
  DS.init();
</script>
```

> [!WARNING]
> Satu modul, satu URL. `_DsScripts` memakai `asp-append-version`, jadi URL-nya berakhiran `?v=…`; URL impor polos adalah modul yang berbeda. Dua salinan memasang dua set listener dan setiap klik bekerja dua kali. Bila memakai `data-ds-manual`, jangan menyertakan `_DsScripts`; gunakan satu URL impor yang sama di semua modul aplikasi. ds.js tidak menulis `window.DS`.

Tipe TypeScript ada di `/_content/Citia.DesignSystem/js/ds.d.ts`.

## Konfigurasi {#konfigurasi}

| Opsi | Bawaan | Atribut `<html>` | Arti |
| --- | --- | --- | --- |
| `light` | `"tps"` | `data-ds-light` | Nama tema daisyUI untuk terang |
| `dark` | `"tps-dark"` | `data-ds-dark` | Nama tema daisyUI untuk gelap |
| `storage` | `"ds"` | `data-ds-storage` | Awalan kunci penyimpanan |
| `toastTimeout` | `6000` | tidak ada | Jeda hilang otomatis toast non-galat, ms |
| `exportLock` | `15000` | tidak ada | Lama tautan export terkunci, ms |

`_DsHead` menulis tiga atribut itu dari `HeadOptions(Light, Dark, Storage)` sebelum stylesheet, bersama `data-ds-mode` (pilihan pengguna: `light`, `dark`, atau `system`) dan `data-ds-sidebar-collapsed="true"` bila sidebar tersimpan ringkas. Ubah nama tema dan awalan lewat `HeadOptions`, bukan `configure`, karena skrip tema di `_DsHead` berjalan sebelum ds.js dan harus memakai nilai yang sama.

`configure(options)` menggabungkan opsi ke konfigurasi dan harus dipanggil sebelum `init()`; karena itu pakai `data-ds-manual` bila memanggilnya.

## Ekspor {#api}

```js
import DS, { init, configure, theme, toast, confirm, guard, addComboboxOption } from "/_content/Citia.DesignSystem/js/ds.js";
```

| Ekspor | Tanda tangan | Fungsi |
| --- | --- | --- |
| `init` | `init(root?: ParentNode): void` | Memasang widget per elemen di `root` (bawaan `document`). Panggilan pertama memasang listener terdelegasi. Aman dipanggil ulang |
| `configure` | `configure(options?: Partial<DsConfig>): void` | Menimpa bawaan |
| `theme.get` | `get(): string` | Nama tema aktif (nilai `html[data-theme]`) |
| `theme.getMode` | `getMode(): "light" \| "dark" \| "system"` | Pilihan pengguna; `system` bila belum memilih |
| `theme.set` | `set(mode, options?: { animate?: boolean }): void` | Menyimpan pilihan dan menerapkan tema. `"system"` menghapus kunci simpanan |
| `theme.toggle` | `toggle(): void` | Beralih terang/gelap dan menyimpannya sebagai pilihan eksplisit |
| `toast` | `toast({ tone?, title, text?, timeout?, stack? }): { close(): void }` | Menampilkan toast. `tone`: `success`, `info` (bawaan), `warning`, `error`. Galat bertahan sampai ditutup. `stack: true` menambah, bawaan menggantikan toast yang ada |
| `confirm` | `confirm({ title?, text?, label?, tone? }, opener?): Promise<boolean>` | Dialog konfirmasi bersama. Bawaan: judul "Lanjutkan?", label "Hapus", `tone` `"danger"`. `"primary"` memberi tombol biru dan fokus ke aksi. `opener` menerima kembali fokus |
| `guard` | `{ isDirty, allow, reset, register }` | Penjaga perubahan belum disimpan; lihat [Alur kerja](alur-kerja.md#guard-api) |
| `addComboboxOption` | `addComboboxOption(source, { value, label, hint? }): void` | Menambah opsi ke combobox, memilihnya, menyegarkan daftar, dan memicu `change` |

```js
DS.toast({ tone: "success", title: "Tangki T-01 tersimpan" });

if (await DS.confirm({ title: "Hapus pelanggan PT Akr Corporindo?", text: "Dokumen yang sudah ada tetap tersimpan.", label: "Hapus" })) {
  await hapusPelanggan();
}

// Tambah cepat: server membuat data, combobox menerima opsinya.
document.addEventListener("ds:combobox-add", async (e) => {
  const { term, label } = e.detail;            // e.target = select atau input sumber
  const res = await fetch("/Tanks/QuickAdd", { method: "POST", headers: { RequestVerificationToken: token }, body: new URLSearchParams({ code: term }) });
  const tank = await res.json();
  DS.addComboboxOption(e.target, { value: String(tank.id), label: tank.code, hint: tank.product });
});
```

## Event {#event}

| Event | Target | `detail` | Kapan |
| --- | --- | --- | --- |
| `ds:themechange` | `document` | `{ mode: "light" \| "dark" \| "system", theme: string }` | Setelah tema diterapkan, juga saat OS berganti dan pilihannya `system` |
| `ds:combobox-add` | `select` atau `input` sumber (bubbles) | `{ term: string, label: string, input: HTMLInputElement }` | Pengguna memilih opsi `Tambah "…" ke …`. `label` = nilai `data-ds-combobox-add`; `input` = kolom teks yang terlihat |
| `ds:confirmed` | Pemicu `data-ds-confirm` (bubbles) | tidak ada | Konfirmasi diterima pada pemicu yang bukan tombol dalam form dan bukan `a[href]` |
| `ds:tableupdate` | `.ds-table-scroll` | tidak ada | Masukan, bukan keluaran: ds.js mendengarkannya untuk menghitung ulang kolom menempel. DS sendiri mengirimnya setelah tombol pohon berubah; kirim sendiri setelah mengganti isi tabel |

## Atribut data-ds {#atribut}

Tabel di bawah memuat setiap atribut yang dibaca ds.js, dikelompokkan menurut fungsi.

### Tema dan kerangka {#atribut-kerangka}

| Atribut | Elemen | Efek |
| --- | --- | --- |
| `data-ds-theme-toggle` | `button` | Klik memanggil `theme.toggle()`. ds.js menulis `aria-label` ("Aktifkan tema terang" atau "Aktifkan tema gelap") dan `title` |
| `data-ds-theme-icon="light"` atau `"dark"` | Anak tombol toggle | Tampil (tanpa `hidden`) hanya saat tema aktif sama dengan nilainya. Taruh ikon bulan di `light` agar tombol menunjukkan tujuannya |
| `data-ds-theme-set="light"`, `"dark"`, `"system"` | `button` | Klik memanggil `theme.set(nilai)`. `aria-pressed` menyala bila nilainya sama dengan pilihan pengguna |
| `data-ds-sidebar-collapse` | `button` | Beralih `data-ds-sidebar-collapsed` di `<html>` dan menyimpannya. Menulis `aria-expanded`, `aria-label` ("Ringkas sidebar" atau "Perluas sidebar"), dan `title`. Hanya berefek ≥ 1024 px |
| `data-ds-nav-toggle` | `button` | Membuka atau menutup drawer: `data-nav-open` pada `.ds-shell` terdekat, `aria-expanded`, `inert` pada `.ds-shell-main`. Fokus pindah ke tautan pertama sidebar, atau kembali ke tombol saat menutup |
| `data-ds-nav-close` | `button` (scrim) | Menutup drawer |
| `data-ds-nav-group="kunci"` | `button` grup | Membuka atau menutup panel di `aria-controls` dengan animasi 200 ms; menyimpan keadaannya di `<awalan>-nav-groups`. Di mode rail semua panel tampil |
| `data-ds-nav-active="true"` | Tombol grup | Grup dipaksa terbuka saat `init` |
| `data-ds-nav-scroll` | `nav` | Posisi gulirnya disimpan (debounce 100 ms dan saat `pagehide`) di `sessionStorage`, dipulihkan juga setelah font dan `load` selesai |
| `data-ds-back="url"` | `button` atau `a` | Klik dicegah, lalu: `history.back()` bila referrer berasal dari situs yang sama dan `history.length > 1`; selain itu `location.assign(url)` (bawaan `/`) |
| `data-ds-menu` | `details` | Satu menu terbuka pada satu waktu (selain yang bersarang). Tekan di luar menutupnya; Escape menutup dan mengembalikan fokus ke `summary` bila tidak ada dialog terbuka |

Keyboard: Escape menutup menu terbuka, lalu drawer. Tab dijebak di dalam sidebar saat drawer terbuka (< 1024 px).

### Dialog dan konfirmasi {#atribut-dialog}

| Atribut | Elemen | Efek |
| --- | --- | --- |
| `data-ds-dialog-open="id"` | Pemicu | `showModal()` pada `<dialog id>`. Fokus kembali ke pemicu saat ditutup; bila pemicu ada di `details[open]` di luar dialog, menu itu ditutup dan fokus ke `summary`-nya |
| `data-ds-dialog-close` (nilai opsional) | Tombol di dalam dialog | Menutup dialog terdekat dengan `returnValue` sama dengan nilainya |
| `data-ds-initial-focus` | Elemen di dalam dialog | Menerima fokus saat dibuka (bersama `[autofocus]`) |
| `data-ds-confirm="judul"` | `button`, `a`, atau lainnya | Membuka `#ds-confirm`. Bila diterima: di dalam form, form dikirim (`requestSubmit`, dengan pemicu sebagai submitter bila tombol submit) setelah `guard.allow()`; pada `a[href]`, `location.assign(href)` (GET); selain itu event `ds:confirmed` |
| `data-ds-confirm-text` | Pemicu | Kalimat akibat di dialog |
| `data-ds-confirm-label` | Pemicu | Label tombol aksi (bawaan "Hapus") |
| `data-ds-confirm-tone` | Pemicu | `danger` (bawaan): tombol merah, fokus ke Batal. `primary`: tombol biru, fokus ke aksi |
| `data-ds-confirm-title`, `-text`, `-cancel`, `-accept` | Di dalam `#ds-confirm` | Kontrak markup dialog bersama (`_DsConfirmDialog`); jangan dihapus. Tanpa dialog di halaman, ds.js membuatnya |
| `data-ds-leave-stay` | Tombol di `#ds-leave` | Menutup dialog dan membatalkan perpindahan |
| `data-ds-leave-go` | Tombol di `#ds-leave` | `guard.allow()`, menutup dialog, menjalankan perpindahan yang tertunda |

Tanpa `#ds-leave` di halaman, penjaga memakai `window.confirm("Perubahan belum disimpan. Keluar tanpa menyimpan?")`.

### Toast, export, salin {#atribut-umpan}

```html preview title="Toast, salin, dan konfirmasi"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-toast-show="success" data-ds-toast-title="Tangki T-01 tersimpan">Toast sukses</button>
  <button type="button" class="btn" data-ds-toast-show="warning" data-ds-toast-title="Kapasitas melebihi 1500000 TNE" data-ds-toast-text="Periksa angka sebelum mengirim.">Toast peringatan</button>
  <button type="button" class="btn" data-ds-copy data-ds-copy-text="BL-2026-00841" data-ds-copy-message="No BL disalin">Salin No BL</button>
  <button type="button" class="btn btn-ghost is-danger" data-ds-confirm="Hapus tangki T-01?" data-ds-confirm-text="Tangki dan jadwal pengurasannya ikut hilang." data-ds-confirm-label="Hapus tangki">Hapus tangki</button>
</div>
```

| Atribut | Elemen | Efek |
| --- | --- | --- |
| `data-ds-toast-show="tone"` | Pemicu | Klik menampilkan toast. `data-ds-toast-title` dan `data-ds-toast-text` mengisi judul dan teks |
| `data-ds-toast="tone"` | `.ds-toast` | Toast yang sudah ada di HTML: `init` memasang tombol tutup dan hitung mundur (galat tidak hilang sendiri). Juga ditulis ke toast buatan skrip |
| `data-ds-toast-close` | Tombol di dalam toast | Menutup toast |
| `data-ds-toast-region` | Wadah | Region toast. Dibuat otomatis (`aria-live="polite"`) bila tidak ada |
| `data-ds-export="Excel"` | `a` | Klik menampilkan toast "Menyiapkan file {nilai}" dan mengunci tautan (`aria-disabled`, `.btn-disabled`) selama `exportLock`. Klik saat terkunci dicegah. Kunci dilepas saat halaman dipulihkan dari bfcache |
| `data-ds-copy="selektor"` | `button` | Menyalin `textContent` elemen pertama yang cocok |
| `data-ds-copy-text="teks"` | Tombol salin | Teks literal yang disalin; boleh berdiri sendiri tanpa `data-ds-copy` |
| `data-ds-logout` | `form` keluar akun | Saat ada perubahan belum disimpan, submit ditahan dan dialog `#ds-leave` terbuka; "Keluar" melanjutkan submit |
| `data-ds-copy-message="teks"` | Tombol salin | Judul toast sukses (bawaan "Berhasil disalin"). Tombol memakai `aria-label` "Tersalin" dan `.btn-success` selama 1500 ms. Gagal: toast galat "Gagal menyalin" |

### Form {#atribut-form}

| Atribut | Elemen | Efek |
| --- | --- | --- |
| `data-ds-password-toggle` | `button` | `aria-controls` menunjuk id input. Klik beralih `type` password/text dan `aria-pressed`. Saat submit, kolom dikembalikan ke `password` |
| `data-ds-password-icon="hidden"` atau `"shown"` | Anak tombol | `hidden` tampil saat kata sandi tersembunyi, `shown` saat terlihat |
| `data-ds-autosubmit` | `select` | `change` memanggil `form.requestSubmit()` |
| `data-ds-once` | `form` | Menolak submit kedua. Setelah submit sah: `data-ds-submitted`, `aria-busy="true"`, tombol submit mendapat `aria-disabled` dan `.btn-disabled` (bukan `disabled`, agar `formaction` tetap). Dipulihkan saat halaman kembali dari bfcache |
| `data-ds-loading-label="teks"` | Tombol submit di form `data-ds-once` | Teks tombol diganti selama kirim lewat `textContent`, jadi ikon di dalamnya hilang. Label asli disimpan di `data-ds-label` |
| `data-ds-save-status` | Elemen di form `data-ds-once` | Diisi "Data sedang disimpan." saat submit; beri `role="status"` |
| `data-ds-guard` | `form` | Didaftarkan ke penjaga saat `init` (snapshot isian). Submit form ini memanggil `guard.allow()` |
| `data-ds-guard-skip` | `a[href]` | Klik memanggil `guard.allow()` lalu menaut seperti biasa (Batal eksplisit) |
| `data-ds-guard-dirty` | `form` | Selalu dianggap kotor, untuk form yang dirender ulang dengan galat |

### Tabel {#atribut-tabel}

| Atribut | Elemen | Efek |
| --- | --- | --- |
| `data-ds-pin="n"` | `table` di dalam `.ds-table-scroll` | n kolom pertama menempel di kiri. Dihitung ulang saat ukuran, font, atau `ds:tableupdate` berubah. Mode ditulis ke `data-pin-mode` pada `.ds-table-scroll`: `full`; `compact` (hanya kolom primer) bila sisa ruang setelah kolom menempel < 240 px; `none` bila sisa di luar kolom kanan < lebar kolom primer + 120 px |
| `data-ds-pin-primary="i"` | `table` | Indeks kolom (mulai 0) yang tetap menempel di mode `compact`; bawaan 0 |
| `data-ds-pin-end` | `th` pada baris judul terakhir | Kolom itu menempel di kanan (Status, Detail) |
| `data-ds-scroll-hint` | Elemen tepat sebelum `.ds-table-scroll` | `hidden` dilepas hanya bila tabel bisa digulir mendatar |
| `data-ds-tree-toggle` | `button` | `aria-controls` menunjuk `<tbody>` anak. Klik beralih `aria-expanded` dan `hidden`, mengganti awalan `aria-label` "Buka" dan "Tutup", lalu mengirim `ds:tableupdate` |
| `data-ds-tree-all="open"` atau `"close"` | `button` | Membuka atau menutup semua `[data-ds-tree-toggle]`; nilai selain `open` menutup. `aria-controls` membatasi ke wadah ber-id itu, tanpanya seluruh dokumen |

### Combobox {#atribut-combobox}

| Atribut | Elemen | Efek |
| --- | --- | --- |
| `data-ds-combobox` | `select` atau `input[list]` | Menjadi combobox ARIA 1.2 (cari saat mengetik, panah, Enter, Escape, hasil diumumkan; paling banyak 50 hasil). Pada `select`, kolom teks menggantikannya dan `select` tersembunyi tetap membawa nilai. Pada `input` + `datalist`, isian bebas tetap boleh; `<option>` membaca `data-label` dan `data-hint`. Tidak diaktifkan bila `disabled` atau `readonly` |
| `data-ds-combobox-label="kata"` | Sumber | Nama pilihan untuk pesan ("Tidak ada {kata} yang cocok…"). Bawaan: teks `label[for]`, lalu "pilihan" |
| `data-ds-combobox-add="master"` | Sumber | Bila teks tidak cocok persis, daftar menambah opsi `Tambah "…" ke {master}`; memilihnya memicu `ds:combobox-add` |

### Atribut keadaan dan penanda CSS {#atribut-keadaan}

Atribut ini ditulis atau dibaca, bukan dipasang di markup oleh pemakai.

| Atribut | Elemen | Arti |
| --- | --- | --- |
| `data-ds-manual` | `<html>` | Mematikan inisialisasi otomatis |
| `data-ds-light`, `data-ds-dark`, `data-ds-storage` | `<html>` | Konfigurasi dari server (ditulis `_DsHead`) |
| `data-ds-mode` | `<html>` | Pilihan pengguna: `light`, `dark`, `system` |
| `data-ds-sidebar-collapsed="true"` | `<html>` | Sidebar dalam mode rail (≥ 1024 px) |
| `data-ds-full`, `data-ds-short` | Elemen di sidebar | Hanya CSS: label panjang disembunyikan saat rail, label pendek saat tidak rail |
| `data-ds-submitted`, `data-ds-label` | `form`, tombol | Keadaan internal `data-ds-once` dan `data-ds-loading-label` |

## Kunci penyimpanan {#storage}

`<awalan>` adalah `HeadOptions.Storage` (bawaan `ds`).

| Kunci | Tempat | Nilai |
| --- | --- | --- |
| `<awalan>-theme` | `localStorage` | `"light"` atau `"dark"`. Tidak ada = mengikuti OS secara langsung |
| `<awalan>-sidebar-collapsed` | `localStorage` | `"true"` atau `"false"` |
| `<awalan>-nav-groups` | `localStorage` | JSON `{ "kunci-grup": true \| false }` |
| `<awalan>-nav-scroll` | `sessionStorage` | Posisi gulir navigasi, piksel bulat |

Penyimpanan yang diblokir browser tidak menimbulkan galat; fiturnya jatuh ke bawaan.

## Waktu {#waktu}

| Hal | Nilai |
| --- | --- |
| Toast hilang otomatis (non-galat) | 6000 ms (`toastTimeout`); hitungan berhenti saat hover atau fokus; galat tidak hilang |
| Kunci tautan export | 15000 ms (`exportLock`) |
| Animasi grup navigasi | 200 ms |
| Debounce simpan gulir navigasi | 100 ms |
| Umpan balik tombol salin | 1500 ms |
| Animasi keluar toast | 170 ms |
| Klik ganda pada tombol kirim (skrip aplikasi, bukan ds.js) | diabaikan dalam 400 ms |

## Gerak {#gerak}

- Pergantian tema memakai cross-fade View Transition (`document.startViewTransition`). Dilewati, sehingga tema berganti seketika, di bawah `prefers-reduced-motion: reduce`, bila browser belum mendukung, atau dengan `theme.set(mode, { animate: false })`.
- Animasi buka-tutup grup navigasi dilewati di bawah `prefers-reduced-motion: reduce`; panel langsung tampil atau hilang.
- Toast tidak beranimasi keluar di bawah `prefers-reduced-motion: reduce`; ia langsung dilepas.

## Beda dari TPS {#beda}

| Hal | TPS | ds.js |
| --- | --- | --- |
| Tema | Skrip head menulis `tps-theme` pada kunjungan pertama, sehingga tema OS terkunci | Tidak menulis apa pun sampai pengguna memilih; selama itu tema mengikuti OS secara langsung (`system`) |
| `meta theme-color` | Tidak ada | Dibuat bila belum ada dan diperbarui dari `--color-base-100` setiap tema berganti |
| Toast dari skrip | Sukses, info, galat (`warning` hanya dari server) | Ditambah `warning` di `DS.toast` |
| Toast dibaca | Hilang setelah 6 detik tanpa jeda | Berhenti menghitung saat hover atau fokus (WCAG 2.2.1) |
| Penjaga perubahan | Setiap form POST di `#main` dijaga otomatis | Opt-in per form lewat `data-ds-guard` |
| Keluar akun saat ada perubahan | Dialog sendiri (`data-logout-form`) | Sama: `form[data-ds-logout]` membuka `#ds-leave` |
| Awalan penyimpanan | `tps-` tetap | Dapat diatur (`HeadOptions.Storage`, `data-ds-storage`) |
| Drawer navigasi | Drawer daisyUI berbasis checkbox | Drawer sendiri: `data-nav-open` di `.ds-shell`, `inert` pada konten, scrim, jebakan Tab |

## Belum termasuk di v1 {#belum}

Fitur berikut tetap di aplikasi. Rujukan ada di TPS (`TPS.Integration/wwwroot/js`):

| Fitur | Berkas TPS |
| --- | --- |
| Date dan date-time picker (kalender Cally, jam-menit-detik WIB, tombol Terapkan) | `site.js`, `wwwroot/lib/cally/cally.js` |
| Polling notifikasi | `notifications.js` |
| Pembaruan langsung (morph halaman) | `bc-live.js` dengan morphdom; polanya di [Alur kerja](alur-kerja.md#live) |
| Alur tambah cepat ke server (dialog, `POST {Master}/QuickAdd`) | `combobox.js`; DS hanya menyediakan opsi tambah, event `ds:combobox-add`, dan `addComboboxOption` |
| Penampil XML | `xml-viewer.js` |
| Import Excel (dropzone dan pratinjau) | `excel-import.js`, `import-preview.js` |
| Pencarian pelabuhan UN/LOCODE | `port-lookup.js` |
| Validasi sisi klien (`aria-invalid` saat blur) | Aturan di [Form dan field](form.md#validasi); tulis di aplikasi |
