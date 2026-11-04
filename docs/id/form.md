---
title: Form
group: components
category: forms
order: 36
summary: Tata letak form dengan bagian berjudul, grid field responsif, dan action bar lengket, plus status perubahan belum disimpan, state sibuk, ringkasan, dan mode lihat.
source: TPS .entry-form, .form-footer (app.css L2144–2347)
---

Form di sini berarti seluruh halaman atau panel yang mengumpulkan dan menyimpan data: bagian-bagiannya, grid tempat field berada, aksi di bagian akhir, serta perilakunya sebelum, selama, dan sesudah menyimpan. Field tunggal didokumentasikan di [field](./field.md), [input](./input.md), dan halaman form lainnya; pesan di klien dan server ada di [validation](./validation.md). Untuk form pendek di dalam dialog, lewati bagian dan pakai `.ds-form` biasa.

## Contoh

### Bagian dengan kolom judul

`.ds-form-layout` adalah size container. Saat lebar form minimal 52rem, setiap `.ds-form-section` menaruh judul dan deskripsi di sisi awal dan field di sisi akhir; bila lebih sempit, judul berada di atas. `.ds-form-grid` memiliki dua kolom mulai lebar form 36rem; `.is-full` memenuhi satu baris. Karena memakai container query, form yang sama berfungsi di halaman, side sheet, dan dialog.

```html preview title="Pengaturan proyek"
<form class="ds-form-layout" action="#" onsubmit="return false" data-ds-validate>
  <section class="ds-form-section" aria-labelledby="fm-s1">
    <div class="ds-form-section__header">
      <h2 class="ds-form-section__title" id="fm-s1">Proyek</h2>
      <p class="ds-form-section__description">Terlihat oleh semua orang yang memiliki akses ke PRJ-1024.</p>
    </div>
    <div class="ds-form-section__body">
      <div class="ds-form-grid">
        <div class="ds-field">
          <label for="fm-name">Nama proyek</label>
          <input id="fm-name" name="Name" class="input" value="Interior kantor Harbour" required>
        </div>
        <div class="ds-field">
          <label for="fm-code">Kode proyek</label>
          <input id="fm-code" name="Code" class="input" value="PRJ-1024" readonly>
        </div>
        <div class="ds-field is-full">
          <label for="fm-desc">Deskripsi <span class="ds-label-note">opsional</span></label>
          <textarea id="fm-desc" name="Description" class="textarea" rows="3">Dua lantai, 640 m², serah terima direncanakan Maret 2027.</textarea>
        </div>
      </div>
    </div>
  </section>
  <section class="ds-form-section" aria-labelledby="fm-s2">
    <div class="ds-form-section__header">
      <h2 class="ds-form-section__title" id="fm-s2">Penagihan</h2>
      <p class="ds-form-section__description">Dipakai pada setiap faktur proyek ini.</p>
    </div>
    <div class="ds-form-section__body">
      <div class="ds-form-grid">
        <div class="ds-field">
          <label for="fm-client">Kontak klien</label>
          <input id="fm-client" name="Contact" class="input" value="Sofia Marquez" autocomplete="name">
        </div>
        <div class="ds-field">
          <label for="fm-email">Email penagihan</label>
          <input id="fm-email" name="Email" type="email" class="input" value="accounts@harbourworks.example" autocomplete="email">
        </div>
        <div class="ds-field">
          <label for="fm-rate">Tarif harian (USD)</label>
          <input id="fm-rate" name="Rate" type="number" class="input" value="840" min="0" step="10">
        </div>
        <div class="ds-field">
          <label for="fm-start">Tanggal mulai</label>
          <div class="ds-date-picker" data-ds-date-picker><input id="fm-start" name="Start" type="date" class="input" value="2026-11-16"></div>
        </div>
      </div>
    </div>
  </section>
</form>
```

### Action bar lengket dengan perubahan belum disimpan

Tambahkan `data-ds-guard` pada form: [leave guard](./native-elements.md) bertanya sebelum pengguna meninggalkan halaman, dan `.ds-form-bar` melaporkan "Ada perubahan yang belum disimpan" dengan sebuah titik begitu ada nilai yang berbeda dari nilai saat dimuat. `.is-dirty-only` menyembunyikan bar sampai saat itu dan memunculkannya dari tepi bawah. `data-ds-once` membuat form terkirim satu kali: tombol menjadi `aria-disabled`, pengirim menampilkan `data-ds-loading-label`, dan form mendapat `aria-busy="true"`.

```html preview title="Ubah klien, bar muncul setelah perubahan"
<form class="ds-form-layout" action="#" onsubmit="return false" data-ds-guard data-ds-once style="min-height:20rem">
  <section class="ds-form-section is-stacked">
    <div class="ds-form-section__header"><h2 class="ds-form-section__title">Klien</h2></div>
    <div class="ds-form-section__body">
      <div class="ds-form-grid">
        <div class="ds-field"><label for="fb-name">Perusahaan</label><input id="fb-name" name="Company" class="input" value="Harbourworks Ltd"></div>
        <div class="ds-field"><label for="fb-contact">Kontak</label><input id="fb-contact" name="Contact" class="input" value="Daniel Okafor"></div>
      </div>
    </div>
  </section>
  <div class="ds-form-bar is-dirty-only">
    <p class="ds-form-bar__status" data-ds-dirty-status aria-live="polite"></p>
    <div class="ds-form-bar__actions">
      <button type="reset" class="btn btn-ghost">Buang</button>
      <button type="submit" class="btn btn-primary" data-ds-loading-label="Menyimpan…">Simpan perubahan</button>
    </div>
  </div>
</form>
```

### Mode lihat read-only

`data-ds-mode="view"` menampilkan form yang sama sebagai nilai: border, placeholder, petunjuk, dan picker hilang, teks tetap dapat diseleksi, dan setiap kontrol menjadi read-only atau disabled. Tombol dengan `data-ds-form-edit` beralih ke mode ubah dan memfokuskan field pertama; `data-ds-form-cancel` mereset dan kembali ke mode lihat. Tombol submit disembunyikan di mode lihat.

```html preview title="Kontak, lihat lalu ubah"
<form class="ds-form-layout" action="#" onsubmit="return false" data-ds-mode="view">
  <section class="ds-form-section is-stacked">
    <div class="ds-form-section__header" style="display:flex;justify-content:space-between;align-items:center">
      <h2 class="ds-form-section__title">Kontak</h2>
      <button type="button" class="btn btn-sm" data-ds-form-edit>Ubah</button>
    </div>
    <div class="ds-form-section__body">
      <div class="ds-form-grid">
        <div class="ds-field"><label for="fv-name">Nama</label><input id="fv-name" name="Name" class="input" value="Ayu Lestari"></div>
        <div class="ds-field"><label for="fv-role">Peran</label><select id="fv-role" name="Role" class="select"><option>Manajer proyek</option><option>Insinyur lapangan</option></select></div>
        <div class="ds-field"><label for="fv-phone">Telepon</label><input id="fv-phone" name="Phone" class="input" type="tel" value="+62 812 5550 1024"></div>
        <div class="ds-field"><label for="fv-since">Anggota sejak</label><div class="ds-date-picker" data-ds-date-picker><input id="fv-since" name="Since" type="date" class="input" value="2024-03-04"></div></div>
      </div>
    </div>
  </section>
  <div class="ds-form-actions" style="border:0;padding-inline:0;background:none">
    <span></span>
    <div>
      <button type="button" class="btn btn-ghost" data-ds-form-cancel>Batal</button>
      <button type="submit" class="btn btn-primary">Simpan kontak</button>
    </div>
  </div>
</form>
```

### Ringkasan

Setelah submit gagal, ringkasan galat di bagian atas mendaftar setiap masalah sebagai tautan ke field-nya (lihat [validation](./validation.md)). Setelah penyimpanan yang tetap di halaman yang sama, ringkasan sukses menyebut apa yang terjadi dalam satu kalimat.

```html preview title="Galat dan sukses"
<div style="display:grid;gap:1rem;max-width:40rem">
  <div class="ds-error-summary" role="alert" tabindex="-1" aria-labelledby="fs-err-title">
    <h2 id="fs-err-title">Perbaiki isian yang ditandai</h2>
    <p>2 isian perlu diperbaiki.</p>
    <ul>
      <li><a href="#fm-name">Nama proyek wajib diisi.</a></li>
      <li><a href="#fm-email">Tulis alamat email seperti nama@contoh.com.</a></li>
    </ul>
  </div>
  <div class="ds-form-summary is-success" role="status">
    <h2>Perubahan disimpan</h2>
    <p>Faktur INV-2026-0418 memakai email penagihan yang baru mulai hari ini.</p>
  </div>
  <div class="ds-form-summary is-info" role="status">
    <h2>Hanya baca</h2>
    <p>Proyek ini sudah diarsipkan. Minta Mei Tanaka membukanya kembali sebelum mengubah.</p>
  </div>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Pristine | Halaman dimuat | Tanpa teks status; bar `.is-dirty-only` tersembunyi di bawah tepi |
| Dirty | Ada nilai yang berbeda dari snapshot saat dimuat (`data-ds-dirty` pada form) | Status "Ada perubahan yang belum disimpan" dengan titik peringatan; bar dirty-only naik dengan spring (500ms) |
| Meninggalkan saat dirty | Tautan, Back, logout, atau menutup tab | Dialog keluar dari [guard](./native-elements.md), atau prompt browser |
| Submit tidak valid | `data-ds-validate` menemukan galat | Submit berhenti, ringkasan muncul dan menerima fokus, galat sebaris di setiap field |
| Mengirim | `data-ds-once` dan submit yang valid | `aria-busy="true"`, tombol `aria-disabled`, pengirim menampilkan label memuat, kursor progress |
| Back-forward cache | Halaman dipulihkan dari riwayat | State sibuk dibersihkan, tombol dapat dipakai lagi |
| Tersimpan (halaman sama) | Kode Anda setelah penyimpanan berhasil | `.ds-form-summary.is-success`; panggil `DS.guard.reset()` |
| Lihat | `data-ds-mode="view"` | Nilai sebagai teks, tanpa chrome, submit tersembunyi, Ubah terlihat |
| Ubah | `data-ds-form-edit` diklik | Kontrol dipulihkan, field pertama difokuskan |
| Section nonaktif | `fieldset disabled` | Lihat [fieldset](./fieldset.md) |

## Anatomi

- `.ds-form-layout`: size container `ds-form`.
- `.ds-form-section`: `__header` (`__title`, `__description`) dan `__body`; `.is-card` menaruh body di atas permukaan, `.is-stacked` menjaga judul tetap di atas.
- `.ds-form-grid`: grid field, `.is-3` untuk tiga kolom, anak `.is-full` memenuhi baris.
- `.ds-form-bar`: `__status` (`[data-ds-dirty-status]`) dan `__actions`; `.is-dirty-only`, `.is-floating`.
- `.ds-form-summary`: `.is-success`, `.is-info`; `.ds-error-summary` untuk galat.
- `.ds-form-actions`: footer statis dari [field](./field.md), untuk form pendek.

## Penggunaan

- Kelompokkan 3 sampai 8 field per bagian dan beri setiap bagian judul maksimal 4 kata; taruh alasan adanya bagian itu di deskripsi.
- Pakai satu tombol primer: Simpan, dinamai sesuai objeknya ("Simpan kontak"). Batal atau Buang adalah tombol ghost di sisi awal.
- Pakai bar lengket pada form yang lebih tinggi dari satu layar; form pendek diakhiri dengan `.ds-form-actions`.
- Biarkan tombol tetap aktif selagi field tidak valid; tampilkan galat saat submit. Tombol Simpan yang nonaktif tidak menjelaskan apa pun.
- Setelah menyimpan di halaman yang sama, reset guard (`DS.guard.reset()`) dan tampilkan ringkasan sukses; setelah redirect, pakai [toast](./toast.md).
- Pakai mode lihat untuk data yang lebih sering dibaca; jangan memakainya untuk menyembunyikan field yang tidak boleh diubah (tampilkan teks saja).

## Aksesibilitas

- Bagian adalah elemen `section` yang diberi label oleh judulnya; jaga urutan level judul (h2 di bawah h1 halaman).
- Baris status adalah live region polite; ia membacakan "Ada perubahan yang belum disimpan" sekali, bukan pada setiap ketikan.
- Bar lengket tidak pernah menutupi field yang sedang fokus: field memiliki `scroll-margin` dan bar maksimal satu baris di desktop.
- Pada mode lihat teks tetap dapat diseleksi dan difokuskan (read-only), sehingga pembaca layar membacakan nilai beserta labelnya.
- State sibuk menjaga lebar tombol dan label tetap terbaca; kursor progress hanyalah petunjuk, label memuat adalah pesannya.

| Tombol | Aksi |
| --- | --- |
| Enter di field teks | Mengirim form (native) |
| Tab | Melewati field, lalu action bar |
| Escape di dialog keluar | Tetap di halaman |

## Razor

```cshtml
<form method="post" class="ds-form-layout" data-ds-validate data-ds-guard data-ds-once>
    <ds-error-summary />
    <ds-form-section title="Penagihan" description="Dipakai pada setiap faktur proyek ini." grid>
        <ds-field asp-for="BillingEmail" type="email" />
        <ds-field asp-for="DayRate" type="number" unit="USD" />
    </ds-form-section>
    <ds-form-bar dirty-only>
        <a class="btn btn-ghost" asp-page="Index" data-ds-guard-skip>Batal</a>
        <button class="btn btn-primary" data-ds-loading-label="Menyimpan…">Simpan proyek</button>
    </ds-form-bar>
</form>
```

| Tag helper | Output |
| --- | --- |
| `ds-form-section` | `section.ds-form-section` dengan header dan body; `title`, `description`, `card`, `stacked`, `grid`, `level` |
| `ds-form-bar` | `.ds-form-bar` dengan baris status dan aksi anak; `dirty-only`, `floating`, `dirty-text` |
| `ds-error-summary` | Ringkasan galat dari model state (lihat [validation](./validation.md)) |

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-guard` | Bertanya sebelum meninggalkan halaman dengan perubahan belum disimpan ([guard](./native-elements.md)); juga mengatur `data-ds-dirty` dan baris status |
| `data-ds-dirty-status` | Elemen yang menampilkan "Ada perubahan yang belum disimpan" (`data-ds-dirty-text` mengganti teksnya) |
| `data-ds-once` | Kirim satu kali, state sibuk, `data-ds-loading-label` pada pengirim |
| `data-ds-validate` | Validasi klien dan ringkasan ([validation](./validation.md)) |
| `data-ds-mode="view|edit"` | Tampilan read-only atau ubah |
| `data-ds-form-edit` / `data-ds-form-cancel` | Beralih ke mode ubah / reset dan kembali ke mode lihat |
| `data-ds-form-view-only`, `data-ds-form-edit-only`, `data-ds-form-keep` | Tampil hanya di mode lihat / hanya di mode ubah / menjaga submit tetap terlihat di mode lihat |

Event: `ds:form:dirty` (`detail.dirty`), `ds:form:mode` (`detail.mode`). API: `DS.formMode(form, "edit")`, `DS.guard.reset()`, `DS.guard.allow()`.

## Token

`--ds-space-8`, `--ds-space-field-group`, `--ds-space-panel`, `--ds-space-card-x`, `--ds-space-card-y`, `--color-base-300`, `--ds-radius-card`, `--ds-radius-box`, `--ds-shadow-xs`, `--ds-shadow-panel`, `--ds-z-sticky`, `--color-warning`, `--ds-error-soft`, `--ds-success-soft`, `--ds-info-soft`, `--ds-duration-spring`, `--ds-ease-spring`, `--ds-duration-exit`, `--ds-ease-exit`, `--ds-type-section-*`, `--ds-type-callout-*`, `--ds-type-footnote-*`.

## Native dan daisyUI

`form` biasa dengan pengiriman native, `reset`, constraint validation, dan `fieldset disabled`. Tata letak memakai CSS grid dan container query; daisyUI tidak memiliki tata letak form. Tombol adalah `btn` daisyUI; field adalah kontrol daisyUI yang dihaluskan di halaman field.
