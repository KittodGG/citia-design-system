---
title: Combobox dan tanggal
group: Komponen
order: 3
summary: Select yang bisa dicari, opsi tambah ke master dengan dialog quick-add, serta kalender dan waktu WIB untuk isian tanggal.
source: TPS wwwroot/js/combobox.js, wwwroot/js/site.js; Styles/app.css L3147–3241; DESIGN.md bagian Combobox master dan Kalender dan waktu
---

Combobox menggantikan `<select>` bila pilihannya bersumber dari data yang terus bertambah. Kalender menggantikan pemilih tanggal bawaan browser agar target sentuh 44 px dan waktu selalu WIB.

## Combobox {#combobox}

Pakai combobox untuk daftar bersumber data (master, dokumen asal BL, peran) dan untuk daftar lebih dari 4 pilihan, walau isinya masih sedikit. Daftar tetap kecil yang tidak tumbuh tetap `<select>` biasa: jenis ukuran, transportasi, status, jenis dokumen, jumlah baris per halaman.

```html preview title="Combobox dari select"
<div class="ds-field">
  <label for="form-cb-pelanggan">Pelanggan</label>
  <select id="form-cb-pelanggan" class="select" data-ds-combobox data-ds-combobox-label="pelanggan" aria-describedby="form-cb-pelanggan-hint">
    <option value="">Pilih pelanggan</option>
    <option value="1" data-hint="NPWP 01.234.567.8-402.000">PT Akr Corporindo</option>
    <option value="2" data-hint="NPWP 02.345.678.9-402.000">PT Sinar Energi Nusantara</option>
    <option value="3">PT Bumi Samudra Logistik</option>
    <option value="4">PT Tirta Kencana Petrokimia</option>
    <option value="5">PT Mitra Bahari Utama</option>
  </select>
  <p id="form-cb-pelanggan-hint" class="ds-hint">Ketik nama atau NPWP untuk mempersempit daftar.</p>
</div>
```

### Dua mode

| Mode | Markup | Nilai terkirim |
| --- | --- | --- |
| Pilih dari daftar | `select[data-ds-combobox]` | `select` asli disembunyikan dan tetap membawa id. Ketikan yang tidak cocok mengosongkan nilai dan memberi pesan validitas `Pilih {label} dari daftar.` |
| Teks bebas | `input[list][data-ds-combobox]` dengan `<datalist>` | Teks di input. Saran memakai `option[value][data-label][data-hint]`; isian manual tetap boleh |

```html preview title="Teks bebas dengan saran"
<div class="ds-field">
  <label for="form-cb-pos">Posting ke BC</label>
  <input id="form-cb-pos" class="input" list="form-cb-pos-list" data-ds-combobox data-ds-combobox-label="posting" value="">
  <datalist id="form-cb-pos-list">
    <option value="TNK-01" data-label="TNK-01 · Tangki 1" data-hint="Gudang Ciwandan"></option>
    <option value="TNK-02" data-label="TNK-02 · Tangki 2" data-hint="Gudang Ciwandan"></option>
  </datalist>
</div>
```

`data-ds-combobox-label` menjadi kata benda di pesan ("Tidak ada pelanggan yang cocok…") dan nama daftar. Bila tidak ada, ds.js memakai teks `<label for>`, lalu `pilihan`.

### Markup hasil ds.js

ds.js membungkus kontrol, tidak perlu menulisnya sendiri:

```html
<div class="ds-combobox">
  <input type="text" class="input" role="combobox" aria-autocomplete="list"
         aria-expanded="false" aria-controls="ds-cb-list-1" autocomplete="off">
  <select hidden aria-hidden="true" tabindex="-1">…</select>
  <div class="ds-combobox-popup" hidden>
    <ul class="ds-combobox-list" role="listbox" id="ds-cb-list-1" aria-label="Pilihan pelanggan">
      <li class="ds-combobox-option" role="option" data-current id="ds-cb-1-opt-0">PT Akr Corporindo<small>NPWP …</small></li>
    </ul>
    <p class="ds-combobox-empty" hidden></p>
  </div>
  <p class="ds-visually-hidden" role="status" aria-live="polite"></p>
</div>
```

- `id`, `aria-describedby`, `aria-invalid`, `required`, dan `placeholder` dari `select` pindah ke input; `id` select menjadi `{id}-value`. Label tetap menaut ke input.
- `[data-current]` menandai nilai yang sudah dipilih (tebal). `aria-selected="true"` menandai opsi di bawah kursor keyboard (latar teal 20% dan garis 2 px).
- Popup memakai permukaan solid, border netral 1 px, tinggi maksimal 18 rem, dan `z-index: var(--ds-z-combobox)`.

## Perilaku combobox

### Keyboard

| Tombol | Aksi |
| --- | --- |
| Panah bawah / atas | Buka daftar bila tertutup, lalu pindah satu opsi; berputar di ujung |
| Alt + panah | Hanya membuka daftar |
| Enter | Pilih opsi yang disorot; tanpa sorotan, Enter diteruskan ke form |
| Escape | Tutup daftar. Bila sudah tertutup, kembalikan teks ke label nilai terpilih |
| Tab | Tutup daftar dan lanjut fokus |
| Klik pada input | Buka daftar |

### Filter dan pengumuman

Filter bersifat substring tanpa memperhatikan huruf besar/kecil, dengan spasi ganda dilipat, atas label, nilai, dan petunjuk. Saat daftar baru dibuka dan belum ada ketikan, semua opsi tampil. Paling banyak 50 opsi ditampilkan.

Teks status (`role="status"`) mengumumkan:

| Keadaan | Pesan |
| --- | --- |
| Ada hasil | `{n} hasil tersedia.` |
| Lebih dari 50 | `… Menampilkan 50 pertama; ketik untuk mempersempit.` |
| Tanpa hasil | `Tidak ada hasil.` |
| Opsi tambah tersedia | `… Pilihan tambah tersedia.` |
| Setelah memilih | `{label} dipilih.` |

Keadaan kosong terlihat: `Tidak ada {label} yang cocok dengan "{ketikan}".`, atau `Belum ada pilihan aktif.` bila daftar memang kosong.

### Aksesibilitas

- Peran ARIA 1.2: input `role="combobox"` dengan `aria-autocomplete="list"`, `aria-expanded`, `aria-controls` ke listbox, dan `aria-activedescendant` ke opsi yang disorot. Fokus tidak pernah meninggalkan input.
- Opsi 44 px. Pemilihan dengan pointer tidak memindahkan fokus dari input.
- Jangan membuat combobox dari `select` yang `disabled` atau `readonly`; ds.js melewatinya.

## Tambah ke master {#tambah}

Bila ketikan tidak cocok persis dengan opsi mana pun, `data-ds-combobox-add="Pelanggan"` menambahkan opsi `Tambah "x" ke Pelanggan` (kelas `.ds-combobox-add`) di akhir daftar. Hanya tampilkan atribut ini bila pengguna berhak menambah master (`master.manage`).

```html preview title="Opsi tambah"
<div class="ds-field">
  <label for="form-cb-tambah">Pelanggan</label>
  <select id="form-cb-tambah" class="select" data-ds-combobox data-ds-combobox-label="pelanggan" data-ds-combobox-add="Pelanggan">
    <option value="">Pilih pelanggan</option>
    <option value="1">PT Akr Corporindo</option>
    <option value="2">PT Sinar Energi Nusantara</option>
  </select>
</div>
```

Memilih opsi tambah menutup daftar dan memicu `CustomEvent` `ds:combobox-add` pada elemen sumber (bubbles) dengan `detail: { term, label, input }`. Aplikasi membuka dialog quick-add, menyimpan ke server, lalu memanggil `DS.addComboboxOption`:

```js
document.addEventListener("ds:combobox-add", (event) => {
  const select = event.target;
  const { term, label, input } = event.detail;
  openQuickAdd(label, term, async (saved) => {
    DS.addComboboxOption(select, { value: saved.id, label: saved.label, hint: saved.hint });
    input.focus();
  });
});
```

`DS.addComboboxOption(source, { value, label, hint })` menambahkan `<option>` bila belum ada, memilihnya, menyegarkan daftar, lalu mengirim `change`. Untuk mode `input[list]`, opsi ditambahkan ke `<datalist>`.

### Dialog quick-add

Dialog berdiri di atas form, jadi memakai `.ds-dialog.is-raised` (border 2 px dan permukaan popover). Isi: field wajib master itu, sudah terisi ketikan operator dan nilai dari field lain di form (NPWP, kode TPS); lalu `.ds-preview-box` "Akan disimpan sebagai" yang diisi dari server; lalu notice bila perlu.

```html preview title="Dialog tambah pelanggan"
<div class="modal-box ds-dialog is-raised" role="dialog" aria-labelledby="form-qa-title">
  <h3 id="form-qa-title" class="ds-dialog-title">Tambah pelanggan</h3>
  <div class="ds-form">
    <div class="ds-field">
      <label for="form-qa-nama">Nama pelanggan</label>
      <input id="form-qa-nama" class="input" value="pt akr corporindo  tbk">
    </div>
    <div class="ds-field">
      <label for="form-qa-npwp">NPWP</label>
      <input id="form-qa-npwp" class="input" value="012345678402000" inputmode="numeric">
    </div>
    <div class="ds-preview-box">
      <h3>Akan disimpan sebagai</h3>
      <dl>
        <div><dt>Nama</dt><dd>PT AKR CORPORINDO TBK</dd></div>
        <div><dt>NPWP</dt><dd>01.234.567.8-402.000</dd></div>
      </dl>
    </div>
  </div>
  <div class="modal-action">
    <button type="button" class="btn" data-ds-dialog-close>Batal</button>
    <button type="button" class="btn btn-primary">Simpan pelanggan</button>
  </div>
</div>
```

### Kontrak server

Rekomendasi untuk `POST /{Master}/QuickAdd` (antiforgery, izin master):

- Server adalah sumber kebenaran. Normalisasi (trim, spasi ganda jadi satu, kode kapital), validasi atribut, dan deteksi duplikat memakai kode yang sama dengan form master. Klien tidak menormalkan sendiri.
- Pratinjau "Akan disimpan sebagai" berasal dari server dan persis sama dengan yang akan disimpan.
- Duplikat tidak membuat data baru. Server mengembalikan record yang ada dan klien memilihnya, disertai toast.

```json
{ "ok": true, "created": false, "id": 1, "label": "PT Akr Corporindo", "hint": "NPWP 01.234.567.8-402.000" }
{ "ok": false, "errors": { "Npwp": ["Periksa format NPWP. Ikuti petunjuk di bawah kolom."] } }
```

## Tanggal dan waktu {#tanggal}

Pemilih tanggal memakai komponen web Cally (`<calendar-date>`) dengan gaya daisyUI `.cally`. Berkas vendor ada di `/_content/Citia.DesignSystem/lib/cally/cally.js` (MIT). Popover kalender dirender di `.ds-popover.ds-calendar-popover` (lebar `--ds-size-popover-calendar`, hari 44 px, pilihan berwarna `--color-primary`).

> [!NOTE]
> ds.js v1 tidak menyertakan enhancer date-picker. Baseline-nya `input type="date"` dan `type="datetime-local"` bawaan browser. Implementasi acuannya `wwwroot/js/site.js` di TPS.Integration; porting dari sana bila aplikasi butuh popover kalender. Pratinjau di bawah hanya menampilkan markup dan gayanya.

```html preview title="Kalender tanggal"
<div class="ds-popover ds-calendar-popover">
  <div class="ds-calendar-jump">
    <label>Bulan
      <select class="select select-sm" aria-label="Bulan">
        <option>Januari</option><option>Februari</option><option>Maret</option>
      </select>
    </label>
    <label>Tahun
      <input class="input input-sm" type="number" value="2026" aria-label="Tahun">
    </label>
  </div>
  <calendar-date class="cally" locale="id-ID" first-day-of-week="1">
    <svg slot="previous" class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"></use></svg>
    <svg slot="next" class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg>
    <calendar-month></calendar-month>
  </calendar-date>
  <div class="ds-picker-footer">
    <button type="button" class="btn btn-ghost btn-sm">Kosongkan</button>
    <button type="button" class="btn btn-ghost btn-sm">Hari ini</button>
  </div>
</div>
```

```html preview title="Tanggal dan waktu WIB"
<div class="ds-popover ds-calendar-popover">
  <calendar-date class="cally" locale="id-ID" first-day-of-week="1" value="2026-01-25">
    <svg slot="previous" class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-left"></use></svg>
    <svg slot="next" class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-right"></use></svg>
    <calendar-month></calendar-month>
  </calendar-date>
  <div class="ds-time-row" role="group" aria-label="Waktu (WIB)">
    <label>Jam <input class="input input-sm" type="number" min="0" max="23" value="14"></label>
    <label>Menit <input class="input input-sm" type="number" min="0" max="59" value="30"></label>
    <label>Detik <input class="input input-sm" type="number" min="0" max="59" value="0"></label>
  </div>
  <div class="ds-picker-footer">
    <button type="button" class="btn btn-ghost btn-sm">Kosongkan</button>
    <button type="button" class="btn btn-ghost btn-sm">Hari ini</button>
    <button type="button" class="btn btn-sm">Batal</button>
    <button type="button" class="btn btn-primary btn-sm">Terapkan</button>
  </div>
</div>
```

### Perilaku acuan TPS

- Tanggal saja: nilai masuk ke field saat hari diklik, lalu popover menutup.
- Tanggal dan waktu: nilai masuk hanya saat **Terapkan**. Batal, Escape, atau klik di luar membuang draft dan mempertahankan nilai sebelumnya.
- Nilai terkirim berupa ISO lokal tanpa konversi UTC, sampai detik: `2026-01-25T14:30:00`.
- Jam 0–23, menit dan detik 0–59; batas `min`, `max`, dan `step` mengikuti field asli. Kontrol Jam/Menit/Detik tidak ikut payload atau validasi form.
- Pilihan bulan dan tahun (`.ds-calendar-jump`) mempercepat pencarian tanggal lama.
- **Hari ini** memakai zona `Asia/Jakarta`, bukan zona perangkat. **Kosongkan** menghapus nilai.
- Di ≤ 640 px (atau tinggi ≤ 600 px) popover menjadi lembar di tengah layar, maksimal `100dvh − 1rem`; di ≤ 360 px lebarnya penuh.
- Tampilkan tanggal sebagai `25 Jan 2026` dan jam `14.30 WIB`; aplikasi menulisnya lewat `Fmt.Date`, `Fmt.DateTime`, dan `Wib.Format`.

### Aksesibilitas

- Tombol hari dan panah bulan minimal 44 px (`.cally ::part(day)`, `::part(button)`).
- Field tanggal tetap `<input>` berlabel. Pengguna harus bisa mengetik nilainya tanpa membuka kalender.
- Tampilkan satuan zona di label atau di `.ds-hint`: "Waktu keluar (WIB)".

## Jangan

- Jangan memakai combobox untuk daftar tetap kecil seperti status; pakai `<select>`.
- Jangan memperlihatkan opsi tambah kepada pengguna tanpa izin master.
- Jangan menyimpan record dari klien sebelum server menormalkannya.
- Jangan mengubah tanggal-waktu ke UTC sebelum dikirim.
