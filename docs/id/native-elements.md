---
title: Elemen native
group: reference
order: 1
summary: Setiap elemen HTML tampil sesuai design system tanpa class: teks, daftar, tabel, kode, media, disclosure, dialog, dan setiap kontrol form dengan semua state.
---

HTML biasa sudah tampil benar. `native.css` memberi gaya pada setiap elemen di layer `base`, sehingga halaman Markdown, potongan CMS, atau form admin sederhana tidak butuh class, dan setiap class komponen (`.btn`, `.input`, `.ds-card`) tetap menang karena komponen berada di layer yang lebih akhir. Gunakan halaman ini untuk memeriksa tampilan sebuah elemen sebelum memakai komponen. Untuk konten panjang dengan ritme vertikal, bungkus dengan [prose](./prose.md). Untuk class daisyUI, lihat [penyelarasan daisyUI](./daisyui.md). [English](../en/native-elements.md).

Ada dua cakupan:

- **Elemen tingkat teks** (heading, semantik inline, kode, kutipan, garis pemisah, media) diberi gaya di mana saja.
- **Elemen struktural dan interaktif** (daftar, tautan polos, tabel, `details`, `dialog`, setiap kontrol form) hanya diberi gaya saat *polos*: tanpa class `ds-*`, tanpa class bagian BEM (`__`), tanpa class daisyUI, dan tidak berada di dalam komponen yang menggambarnya (`.input`, `.select`, `.join`, `.menu`, `.swap`, `.collapse`, `.tabs`, `.dock`, `*-input`, `*combobox*`, `*picker*`, `*segmented*`, `*otp*`). Tombol polos juga dilewati di dalam wadah `role="group"`, `toolbar`, `tablist`, `menu`, `menubar`, `listbox`, dan `radiogroup`. Tambahkan `.ds-unstyled` atau `data-ds-unstyled` pada wadah untuk menonaktifkannya sepenuhnya.

Margin tetap nol, seperti Tailwind: komponen mengatur jaraknya sendiri. Di dalam [prose](./prose.md), setiap blok mendapat ritme 1,25em.

## Contoh

### Heading dan paragraf

Heading memakai peran tipografi: `h1` title 1, `h2` title 2, `h3` title 3, `h4` headline, `h5` section, `h6` card title. Baris heading diseimbangkan; paragraf menghindari satu kata di baris terakhir (`text-wrap: pretty`).

```html preview title="h1 sampai h6 dan teks berjalan"
<div style="display:grid;gap:0.75rem">
  <h1>Tinjauan kuartal III 2026</h1>
  <h2>Kinerja pengiriman</h2>
  <h3>Proyek selesai tepat waktu</h3>
  <h4>PRJ-1024 migrasi gudang</h4>
  <h5>Lingkup dan penanggung jawab</h5>
  <h6>Diperbarui 30 Oktober 2026</h6>
  <p>Ayu Lestari menyelesaikan 14 dari 16 proyek sesuai jadwal. Dua proyek yang terlambat, PRJ-1031 dan PRJ-1040, mundur 3 dan 5 hari kerja karena dokumen pemasok datang setelah batas waktu yang disepakati.</p>
  <p><small>Angka tidak termasuk proyek yang dijeda oleh klien.</small></p>
</div>
```

### Semantik inline

```html preview title="Elemen frasa"
<div style="display:grid;gap:0.5rem;max-width:44rem">
  <p><strong>Strong</strong> menandai hal penting (bobot 650); <b>b</b> menarik perhatian tanpa makna tambahan. <em>Penekanan</em> dan <i>teks idiomatik</i> tampil miring.</p>
  <p>Pencarian menemukan <mark>INV-2026-0418</mark> di 3 dokumen. Tarif <abbr title="Pajak Pertambahan Nilai">PPN</abbr> adalah 11%.</p>
  <p>Jatuh tempo <del>14 November</del> <ins>21 November 2026</ins>. <s>Gratis ongkir untuk semua pesanan</s> hanya berlaku di atas Rp 500.000.</p>
  <p>H<sub>2</sub>O, 10<sup>3</sup> unit, catatan kaki<sup>1</sup>. <u>Garis bawah</u> untuk anotasi, bukan untuk penekanan.</p>
  <p>Mei Tanaka menulis <q>Jalankan pilot dulu, baru perluas</q> dalam <cite>Buku Panduan Operasional 2026</cite>.</p>
  <p><dfn>Siklus tagihan</dfn> adalah periode di antara dua invoice. Diposting <time datetime="2026-10-30T09:15">30 Okt 2026, 09.15</time>.</p>
  <p>Isi <var>n</var> dengan ukuran batch. Server menjawab <samp>HTTP 409 Conflict</samp>. Tekan <kbd>Ctrl</kbd> + <kbd>K</kbd> atau <kbd><kbd>Shift</kbd>+<kbd>?</kbd></kbd>. Jalankan <code>dotnet ef database update</code>.</p>
  <p>Pelanggan: <bdi>سارة الأحمد</bdi> membuat 2 pesanan. Total <data value="1250000">Rp 1.250.000</data>.</p>
</div>
```

### Tautan

Tautan polos memakai warna tautan dan garis bawah 1px dengan kekuatan 55%; saat hover garis bawah penuh dan 2px, saat ditekan warnanya lebih gelap, fokus keyboard menambah ring. Tautan di dalam `nav`, menu, daftar tab, dan toolbar diserahkan ke komponennya.

```html preview title="State tautan"
<div style="display:grid;gap:0.5rem">
  <p>Baca <a href="#ne-links">kebijakan pengembalian dana</a> sebelum menyetujui INV-2026-0418.</p>
  <p>Buka <a href="https://example.com/projects/PRJ-1024">PRJ-1024 di portal proyek</a> (eksternal).</p>
  <p>Ekspor <a>archive.zip</a> menjadi tautan setelah job malam selesai (<code>a</code> tanpa <code>href</code> tampil sebagai teks biasa).</p>
</div>
```

### Daftar

```html preview title="Daftar tak berurut, berurut, dan deskripsi"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))">
  <ul>
    <li>Unggah kontrak yang sudah ditandatangani</li>
    <li>Konfirmasi kontak penagihan
      <ul>
        <li>Sofia Marquez, keuangan</li>
        <li>Daniel Okafor, pengadaan</li>
      </ul>
    </li>
    <li>Jadwalkan rapat awal</li>
  </ul>
  <ol>
    <li>Susun draf invoice</li>
    <li>Periksa item baris
      <ol>
        <li>Kuantitas</li>
        <li>Kode pajak</li>
      </ol>
    </li>
    <li>Kirim ke klien</li>
  </ol>
  <dl>
    <dt>Proyek</dt>
    <dd>PRJ-1024 Migrasi gudang</dd>
    <dt>Pemilik</dt>
    <dd>Ayu Lestari</dd>
    <dt>Anggaran</dt>
    <dd>Rp 420.000.000</dd>
  </dl>
</div>
```

### Kutipan, figure, dan garis pemisah

```html preview title="blockquote, figure, figcaption, hr"
<div style="display:grid;gap:1.25rem;max-width:40rem">
  <blockquote>
    <p>Alur persetujuan baru memangkas siklus invoice kami dari sembilan hari menjadi empat.</p>
    <footer>Sofia Marquez, Kepala Keuangan</footer>
  </blockquote>
  <hr>
  <figure>
    <img src="/images/citia-engineering.png" alt="Logo Citia Engineering" width="180">
    <figcaption>Gambar 1. Logo di permukaan terang, lebar 180px.</figcaption>
  </figure>
</div>
```

### Tabel

`table` polos mendapat baris hairline, header huruf kapital, caption yang tenang, baris total di `tfoot`, angka tabular, dan hover baris di perangkat pointer. Untuk sortir, seleksi, dan kepadatan, gunakan [tabel](./table.md).

```html preview title="Tabel polos dengan caption, header, dan footer"
<table>
  <caption>Invoice terbuka, Oktober 2026</caption>
  <thead>
    <tr><th scope="col">Invoice</th><th scope="col">Klien</th><th scope="col">Jatuh tempo</th><th scope="col" data-type="number">Jumlah (Rp)</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">INV-2026-0418</th><td>Lestari Textiles</td><td><time datetime="2026-11-14">14 Nov 2026</time></td><td data-type="number">12.500.000</td></tr>
    <tr aria-selected="true"><th scope="row">INV-2026-0421</th><td>Okafor Logistics</td><td><time datetime="2026-11-18">18 Nov 2026</time></td><td data-type="number">8.240.000</td></tr>
    <tr><th scope="row">INV-2026-0427</th><td>Tanaka Studio</td><td><time datetime="2026-11-30">30 Nov 2026</time></td><td data-type="number">3.900.000</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row" colspan="3">Total</th><td data-type="number">24.640.000</td></tr>
  </tfoot>
</table>
```

### Kode dan teks praformat

```html preview title="code, pre, kbd, samp"
<div style="display:grid;gap:1rem;max-width:44rem">
  <p>Panggil <code>DS.toast({ tone: "success" })</code> setelah penyimpanan selesai.</p>
  <pre><code>{
  "invoice": "INV-2026-0418",
  "amount": 12500000,
  "currency": "IDR"
}</code></pre>
  <p>Pintasan: <kbd>Ctrl</kbd> + <kbd>S</kbd>. Keluaran: <samp>3 baris diperbarui</samp>.</p>
</div>
```

### Details dan summary

Penanda diganti chevron di ujung yang berputar 180° saat terbuka. Di browser yang mendukung `::details-content` (Chromium 131+), panel tumbuh dengan `interpolate-size` dalam 240ms dan menutup dalam 140ms; browser lain langsung terbuka.

```html preview title="Disclosure"
<div style="display:grid;gap:0.25rem;max-width:36rem">
  <details>
    <summary>Mengapa PRJ-1031 terlambat?</summary>
    <p>Dokumen pemasok tiba pada 22 Oktober, tiga hari kerja setelah batas waktu yang disepakati.</p>
  </details>
  <details open>
    <summary>Siapa yang menyetujui invoice di atas Rp 50.000.000?</summary>
    <p>Sofia Marquez yang menyetujui; Daniel Okafor menjadi penyetuju cadangan selama ia tidak ada.</p>
  </details>
</div>
```

### Dialog

`dialog` polos adalah kartu 34rem di atas scrim. Ia muncul dengan fade dan skala dari 98% dalam 180ms dan keluar dalam 140ms (`@starting-style`, `allow-discrete`). Contoh ini dibuka dengan invoker command tanpa script; gunakan [dialog](./dialog.md) untuk komponen lengkapnya.

```html preview title="Dialog native"
<div>
  <button type="button" commandfor="ne-dialog" command="show-modal">Arsipkan proyek</button>
  <dialog id="ne-dialog" aria-labelledby="ne-dialog-title">
    <h2 id="ne-dialog-title">Arsipkan PRJ-1024?</h2>
    <p style="margin-block:0.75rem 1.5rem">Proyek dipindahkan ke arsip. Invoice tetap tersedia di laporan.</p>
    <form method="dialog" style="display:flex;gap:0.5rem;justify-content:flex-end">
      <button value="cancel">Batal</button>
      <button type="submit" value="archive">Arsipkan</button>
    </form>
  </dialog>
</div>
```

### Field teks

Semua tipe teks memakai satu tampilan: tinggi 44px, teks 16px (tanpa zoom di iOS), border kontrol 1px (≥ 3:1), radius field. Search memiliki tombol hapus bertema, number mempertahankan tombol putar, keluarga tanggal mendapat tombol picker bertema dan sorotan segmen.

```html preview title="Tipe input"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr))">
  <div style="display:grid;gap:0.5rem"><label for="ne-text">Nama lengkap</label><input id="ne-text" type="text" autocomplete="name" value="Ayu Lestari"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-email">Email</label><input id="ne-email" type="email" placeholder="nama@perusahaan.co.id" autocomplete="email"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-url">Situs web</label><input id="ne-url" type="url" placeholder="https://"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-tel">Telepon</label><input id="ne-tel" type="tel" placeholder="+62 812 3456 7890" autocomplete="tel"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-password">Kata sandi</label><input id="ne-password" type="password" value="kuda-benar-baterai" autocomplete="new-password"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-search">Cari invoice</label><input id="ne-search" type="search" value="INV-2026"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-number">Kuantitas</label><input id="ne-number" type="number" value="12" min="0" max="999"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-date">Jatuh tempo</label><input id="ne-date" type="date" value="2026-11-14"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-time">Jam rapat</label><input id="ne-time" type="time" value="09:30"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-datetime">Jendela pengiriman</label><input id="ne-datetime" type="datetime-local" value="2026-11-14T13:00"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-month">Bulan tagihan</label><input id="ne-month" type="month" value="2026-11"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-week">Minggu sprint</label><input id="ne-week" type="week" value="2026-W45"></div>
</div>
```

### Select

Select tunggal memakai picker yang dapat dikustomisasi di browser yang mendukung `appearance: base-select` (Chromium 135+): panel popover dengan bayangan menu, chevron yang berputar 180°, tanda centang pada opsi terpilih, sorotan hover dan keyboard. Browser lain memakai picker sistem dengan field tertutup yang sama. `multiple` dan `size` tampil sebagai listbox.

```html preview title="Select tunggal, berkelompok, dan multiple"
<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));align-items:start">
  <div style="display:grid;gap:0.5rem">
    <label for="ne-select">Termin pembayaran</label>
    <select id="ne-select">
      <option>Net 14</option>
      <option selected>Net 30</option>
      <option>Net 45</option>
      <option disabled>Net 90 (perlu persetujuan)</option>
    </select>
  </div>
  <div style="display:grid;gap:0.5rem">
    <label for="ne-select-group">Penanggung jawab</label>
    <select id="ne-select-group">
      <optgroup label="Keuangan">
        <option>Sofia Marquez</option>
        <option>Ayu Lestari</option>
      </optgroup>
      <optgroup label="Pengadaan">
        <option>Daniel Okafor</option>
        <option>Mei Tanaka</option>
      </optgroup>
    </select>
  </div>
  <div style="display:grid;gap:0.5rem">
    <label for="ne-select-multi">Wilayah</label>
    <select id="ne-select-multi" multiple size="4">
      <option selected>Jakarta</option>
      <option>Surabaya</option>
      <option selected>Bandung</option>
      <option>Medan</option>
    </select>
  </div>
</div>
```

### Textarea

Textarea polos tumbuh mengikuti isinya (`field-sizing: content`) dari tiga baris hingga 24rem, lalu bergulir; tingginya tetap bisa diubah manual.

```html preview title="Textarea yang tumbuh otomatis"
<div style="display:grid;gap:0.5rem;max-width:32rem">
  <label for="ne-textarea">Catatan untuk klien</label>
  <textarea id="ne-textarea" placeholder="Tambahkan instruksi pengiriman, kontak, atau tenggat">Kirim ke dok bongkar muat di gerbang utara. Hubungi Daniel Okafor 30 menit sebelum tiba.</textarea>
</div>
```

### Checkbox, radio, dan switch

Kotak 18px dengan area sentuh 24px (44px di layar sentuh), halo state 6px saat hover dan ditekan, glyph centang, strip, atau titik yang digambar dengan border sehingga tetap terlihat di mode forced colours. Checkbox dengan `role="switch"` menjadi switch yang thumb-nya bergerak dengan spring.

```html preview title="Kontrol pilihan"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))">
  <fieldset>
    <legend>Notifikasi</legend>
    <div style="display:grid;gap:0.5rem">
      <label><input type="checkbox" checked> Invoice dibayar</label>
      <label><input type="checkbox"> Invoice lewat jatuh tempo</label>
      <label><input type="checkbox" id="ne-mixed"> Semua pembaruan proyek</label>
    </div>
  </fieldset>
  <fieldset>
    <legend>Pengiriman</legend>
    <div style="display:grid;gap:0.5rem">
      <label><input type="radio" name="ne-delivery" checked> Reguler, 3 sampai 5 hari</label>
      <label><input type="radio" name="ne-delivery"> Ekspres, besok</label>
      <label><input type="radio" name="ne-delivery" disabled> Hari yang sama (hanya Jakarta)</label>
    </div>
  </fieldset>
  <fieldset>
    <legend>Ruang kerja</legend>
    <div style="display:grid;gap:0.5rem">
      <label><input type="checkbox" role="switch" checked> Ringkasan email</label>
      <label><input type="checkbox" role="switch"> Peringatan akhir pekan</label>
      <label><input type="checkbox" role="switch" disabled> Verifikasi dua langkah (diatur admin)</label>
    </div>
  </fieldset>
</div>
<script>document.getElementById("ne-mixed").indeterminate = true;</script>
```

### Range, color, dan file

Track range terisi warna primer sampai thumb (`forms.js` menjaga `--ds-range-fill` tetap sinkron; Firefox mengisi secara native). Pemilih warna berupa kotak 44px. Tombol file adalah tombol sekunder dengan umpan balik saat ditekan.

```html preview title="Range, color, file"
<div style="display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));align-items:end">
  <div style="display:grid;gap:0.5rem">
    <label for="ne-range">Diskon <output for="ne-range" id="ne-range-out">15</output>%</label>
    <input id="ne-range" type="range" min="0" max="50" value="15" oninput="document.getElementById('ne-range-out').value = this.value">
  </div>
  <div style="display:grid;gap:0.5rem;justify-items:start">
    <label for="ne-color">Warna merek</label>
    <input id="ne-color" type="color" value="#00838f">
  </div>
  <div style="display:grid;gap:0.5rem">
    <label for="ne-file">Kontrak bertanda tangan (PDF)</label>
    <input id="ne-file" type="file" accept="application/pdf">
  </div>
</div>
```

### Tombol

`button` polos adalah tombol sekunder; `type="submit"` adalah aksi utama. Saat ditekan, tombol mengecil ke 97% pada pointer-down. `aria-pressed="true"` menampilkan isian tonal terpilih.

```html preview title="button dan tombol input"
<div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
  <button type="submit">Simpan invoice</button>
  <button type="button">Pratinjau</button>
  <button type="button" aria-pressed="true">Tampilkan yang lunas</button>
  <button type="reset">Atur ulang</button>
  <input type="button" value="Duplikat">
  <input type="submit" value="Kirim">
  <input type="image" src="/images/citia-favicon.png" alt="Buka Citia" width="44" height="44">
</div>
```

### Fieldset, legend, label, dan output

```html preview title="Form berkelompok"
<form style="max-width:34rem" oninput="document.getElementById('ne-total').value = (Number(document.getElementById('ne-qty').value) * 125000).toLocaleString('id-ID')">
  <fieldset>
    <legend>Baris pesanan</legend>
    <div style="display:grid;gap:1rem;grid-template-columns:1fr 1fr;align-items:end">
      <div style="display:grid;gap:0.5rem"><label for="ne-item">Barang</label><input id="ne-item" value="Plastik wrap palet, 50 rol"></div>
      <div style="display:grid;gap:0.5rem"><label for="ne-qty">Kuantitas</label><input id="ne-qty" type="number" value="4" min="1"></div>
    </div>
    <p style="margin-top:1rem">Total baris: Rp <output id="ne-total" for="ne-qty">500.000</output></p>
  </fieldset>
</form>
```

### Progress dan meter

`progress` tanpa nilai bersifat indeterminate: segmen 40% bergerak melintasi track (berhenti saat reduced motion). Warna `meter` mengikuti `low`, `high`, dan `optimum`: optimum hijau, kurang optimal jingga, terburuk merah. Selalu tampilkan angkanya di sebelahnya.

```html preview title="progress dan meter"
<div style="display:grid;gap:1rem;max-width:24rem">
  <div style="display:grid;gap:0.375rem"><label for="ne-progress">Unggahan 68%</label><progress id="ne-progress" max="100" value="68">68%</progress></div>
  <div style="display:grid;gap:0.375rem"><label for="ne-progress-i">Menyiapkan ekspor</label><progress id="ne-progress-i">Menyiapkan</progress></div>
  <div style="display:grid;gap:0.375rem"><label for="ne-meter-good">Penyimpanan terpakai 32%</label><meter id="ne-meter-good" min="0" max="100" low="70" high="90" optimum="10" value="32">32%</meter></div>
  <div style="display:grid;gap:0.375rem"><label for="ne-meter-mid">Penyimpanan terpakai 78%</label><meter id="ne-meter-mid" min="0" max="100" low="70" high="90" optimum="10" value="78">78%</meter></div>
  <div style="display:grid;gap:0.375rem"><label for="ne-meter-bad">Penyimpanan terpakai 95%</label><meter id="ne-meter-bad" min="0" max="100" low="70" high="90" optimum="10" value="95">95%</meter></div>
</div>
```

### Media

`img`, `video`, `canvas`, dan `picture` tidak pernah melebihi wadahnya. Teks alt tampil dalam ukuran footnote, miring, dan redup, sehingga gambar yang gagal dimuat tetap terbaca. `audio` tanpa `controls` disembunyikan; `iframe` tanpa border.

```html preview title="img, picture, video, audio, iframe, canvas, svg"
<div style="display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));align-items:start">
  <picture>
    <source srcset="/images/citia-white.png" media="(prefers-color-scheme: dark)">
    <img src="/images/citia-engineering.png" alt="Logo Citia Engineering" width="200">
  </picture>
  <img src="/images/missing-chart.png" alt="Grafik: invoice dibayar per minggu, minggu 41 sampai 45" width="220" height="80">
  <video controls width="260" aria-label="Panduan produk (tanpa sumber di contoh ini)"></video>
  <audio controls aria-label="Pesan suara dari Mei Tanaka (tanpa sumber di contoh ini)"></audio>
  <iframe title="Kuitansi tersemat" srcdoc="&lt;p style='font-family:system-ui'&gt;Kuitansi INV-2026-0418&lt;/p&gt;" width="240" height="80"></iframe>
  <svg width="64" height="64" viewBox="0 0 24 24" role="img" aria-label="Lingkaran"><circle cx="12" cy="12" r="10"/></svg>
</div>
```

## State

State yang dibekukan, berdampingan. Hover dan pressed membutuhkan pointer: coba pada contoh di atas.

```html preview title="State field, pilihan, tombol, dan tautan"
<div style="display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));align-items:start">
  <div style="display:grid;gap:0.5rem"><label for="ne-s-rest">Rest</label><input id="ne-s-rest" placeholder="Kode proyek"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-filled">Terisi</label><input id="ne-s-filled" value="PRJ-1024"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-ro">Read-only</label><input id="ne-s-ro" value="INV-2026-0418" readonly></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-dis">Nonaktif</label><input id="ne-s-dis" value="Dikunci oleh Sofia Marquez" disabled></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-inv">Tidak valid</label><input id="ne-s-inv" value="ayu@" aria-invalid="true" aria-describedby="ne-s-inv-msg"><small id="ne-s-inv-msg" style="color:var(--ds-error-text)">Masukkan alamat email lengkap, misalnya ayu@lestari.co.id.</small></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-ok">Berhasil</label><input id="ne-s-ok" value="PRJ-1050" data-state="success" aria-describedby="ne-s-ok-msg"><small id="ne-s-ok-msg">Kode tersedia.</small></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-busy">Sibuk</label><input id="ne-s-busy" value="Memeriksa PRJ-1051" aria-busy="true"></div>
  <div style="display:grid;gap:0.5rem"><label for="ne-s-sel-dis">Select nonaktif</label><select id="ne-s-sel-dis" disabled><option>Net 30</option></select></div>
  <div style="display:grid;gap:0.5rem">
    <label><input type="checkbox"> Tidak dicentang</label>
    <label><input type="checkbox" checked> Dicentang</label>
    <label><input type="checkbox" id="ne-s-mixed"> Indeterminate</label>
    <label><input type="checkbox" checked disabled> Dicentang, nonaktif</label>
    <label><input type="checkbox" aria-invalid="true"> Tidak valid (wajib)</label>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center">
    <button type="button">Rest</button>
    <button type="button" aria-pressed="true">Terpilih</button>
    <button type="button" aria-expanded="true">Terbuka</button>
    <button type="button" disabled>Nonaktif</button>
    <button type="button" aria-disabled="true" title="Tersedia setelah disetujui">Aria-disabled</button>
    <button type="submit" aria-busy="true">Menyimpan…</button>
  </div>
  <p><a href="#ne-states">Tautan rest</a>, <a>tautan placeholder tanpa href</a>.</p>
</div>
<script>document.getElementById("ne-s-mixed").indeterminate = true;</script>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | tidak ada | Field: permukaan base-100, border 1px `--ds-control-border`, radius field. Tombol: permukaan sama, bobot 600. Tautan: warna tautan, garis bawah 1px 55%. |
| Hover | `:hover` di dalam `@media (hover: hover)` | Border field menggelap 45% ke arah warna teks. Tombol mendapat state layer 6%. Kontrol pilihan mendapat halo primer 6px. Baris tabel diwarnai 6%. Garis bawah tautan penuh, 2px. |
| Pressed | `:active` | Tombol: state layer 10% dan `scale(var(--ds-press-scale))` (97%). Halo pilihan 10%. Tombol file mengecil. Warna tautan menggelap. |
| Focus-visible | `:focus-visible` | Ring `--ds-focus` 2px, offset 2px; border field juga menjadi primer. Range menggambar ring di sekeliling thumb. |
| Placeholder | `:placeholder-shown` | Teks `--ds-subtle` (75% warna teks, ≥ 4,5:1 di atas field). |
| Terisi / autofill | nilai, `:autofill` | Autofill mempertahankan permukaan tema (tanpa isian kuning atau biru). |
| Dicentang / aktif | `:checked` | Isian primer dengan centang, titik, atau thumb yang sudah bergeser. |
| Indeterminate | `.indeterminate = true`, `progress` tanpa `value` | Checkbox: isian primer dengan strip. Progress: segmen 40% yang bergerak. |
| Terpilih | `aria-pressed="true"`, `aria-selected="true"`, `option:checked` | Isian tonal primer 12%; tombol menambah border primer dan teks `--ds-primary-text`; opsi menambah bobot 600 dan centang. |
| Terbuka | `[open]`, `aria-expanded="true"`, `select:open` | Chevron berputar 180°; panel `details` tumbuh dalam 240ms; dialog muncul dengan fade dan skala dalam 180ms. |
| Nonaktif | `:disabled` | `--ds-opacity-disabled` (55%), `cursor: not-allowed`, tanpa hover atau press. |
| Aria-disabled | `aria-disabled="true"` | Tampilan sama, tetap bisa difokus; jelaskan alasannya di `title` atau teks bantuan. Tautan dengan `href` dan `aria-disabled` menjadi redup dan bergaris titik. |
| Read-only | `[readonly]` | Permukaan base-200, border base-300, kontras teks normal, bisa diseleksi. |
| Tidak valid | `:user-invalid`, `aria-invalid="true"`, `.input-validation-error` | Border error; pesan di bawahnya dalam `--ds-error-text`, dihubungkan dengan `aria-describedby`. |
| Berhasil / peringatan | `data-state="success"`, `data-state="warning"` | Border success atau warning; gunakan hanya untuk pemeriksaan async. |
| Sibuk | `aria-busy="true"` | `cursor: progress`; `forms.js` mempertahankan lebar dan menambah spinner setelah 300ms. |

## Penggunaan

- Tulis HTML biasa terlebih dahulu. Pakai komponen hanya bila elemen native tidak bisa mewujudkan perilakunya (pencarian dengan saran, multi-select dengan chip, rentang tanggal).
- Beri setiap kontrol `label` yang terlihat (dengan `for`) atau `fieldset` dengan `legend`. Placeholder adalah petunjuk, bukan label.
- Gunakan `type="submit"` untuk satu aksi utama form dan `button` biasa untuk sisanya.
- Jangan menambahkan class pada kontrol native hanya untuk mengatur jarak: bungkus dengan elemen tata letak. Class komponen apa pun mematikan tampilan native.
- Jangan menaruh kontrol polos di dalam markup komponen lain tanpa class komponen tersebut; bila terpaksa, tambahkan `.ds-unstyled` pada wadahnya.
- Gunakan `meter` untuk ukuran dalam rentang yang diketahui (penyimpanan 78%) dan `progress` untuk kemajuan sebuah tugas.
- Biarkan tabel polos untuk data statis kecil (sekitar 20 baris). Gunakan [tabel](./table.md) atau [data table](./data-table.md) untuk sortir, seleksi, dan paging.

## Aksesibilitas

- Fokus selalu terlihat: ring 2px `--ds-focus` (≥ 3:1 di kedua tema), tidak pernah dihapus, dan scroll padding menjaganya tidak tertutup bar sticky (`--ds-sticky-top`, `--ds-sticky-bottom`).
- Area sentuh minimal 24×24px, 44×44px pada pointer kasar (checkbox dan radio diperluas dengan pseudo-element; field dan tombol setinggi 44px).
- Kontras teks: teks isi ≥ 4,5:1, placeholder memakai `--ds-subtle`, border `--ds-control-border` ≥ 3:1.
- State tidak pernah hanya warna: glyph centang, strip, dan titik, posisi thumb switch, tautan bergaris bawah, bobot 600 pada opsi terpilih.
- Glyph digambar dengan border, sehingga tetap terlihat di forced colours Windows; fokus menjadi outline `Highlight`.
- Reduced motion: chevron, skala dialog, pergeseran switch, dan pertumbuhan details menjadi fade 150ms; bar indeterminate berhenti di tengah.
- `switch` membutuhkan `role="switch"` pada checkbox; pembaca layar mengumumkan aktif/nonaktif.

| Tombol | Aksi |
| --- | --- |
| Tab / Shift+Tab | Berpindah antarkontrol, tautan, dan summary |
| Space | Mengubah checkbox dan switch, menekan tombol, membuka select |
| Enter | Mengaktifkan tautan atau tombol, mengirim form dari field teks, membuka atau menutup `details` |
| Tombol panah | Berpindah antar-radio dalam grup, mengubah nilai range dan number, berpindah segmen tanggal dan opsi select |
| Escape | Menutup dialog atau picker select |
| Home / End | Range ke nilai minimum atau maksimum |

## JavaScript

Elemen native tidak membutuhkan script. `forms.js` menambah perilaku opsional; `guard.js` melindungi form yang belum disimpan.

| Atribut | Efek |
| --- | --- |
| `input[type=range]` | `forms.js` mengisi `--ds-range-fill` saat dimuat dan saat input, sehingga track terisi sampai thumb |
| `form[data-ds-once]` | Mengirim sekali: tombol submit mendapat `aria-disabled`, tombol pengirim mendapat `aria-busy`, lebarnya tetap, spinner muncul setelah 300ms |
| `data-ds-loading-label` | Label sibuk pada tombol pengirim; hanya kata-katanya yang berubah, ikon tetap |
| `[data-ds-save-status]` | Menerima teks "Menyimpan…" / "Saving…" selama form dikirim |
| `[data-ds-copy]`, `[data-ds-copy-text]` | Menyalin ke clipboard; `.is-copied` (atau `.is-error`) selama 1,8 detik, lalu kembali ke rest |
| `[data-ds-password-toggle][aria-controls]` | Menampilkan atau menyembunyikan kata sandi, mengatur `aria-pressed`, mengembalikan fokus ke field |
| `select[data-ds-autosubmit]` | Mengirim form saat nilainya berubah |
| `a[data-ds-export]` | Mengunci tautan ekspor dengan `aria-disabled` dan `aria-busy` selama file disiapkan |
| `form[data-ds-guard]` | Bertanya sebelum keluar bila ada perubahan yang belum disimpan; menambah `data-ds-dirty` selama form berbeda dari keadaan awalnya |
| `[data-ds-guard-status]` | Di dalam form yang dijaga: mengumumkan "Ada perubahan yang belum disimpan" secara polite |

API: `DS.copyText(text)`, `DS.setBusy(element, label?)`, `DS.clearBusy(element)`, `DS.guard.allow()`, `DS.guard.reset()`. Event: `ds:guard:change` dengan `detail.dirty`.

## Token

`--color-base-100/200/300`, `--color-base-content`, `--color-primary(-content)`, `--color-success`, `--color-warning`, `--color-error`, `--ds-control-border`, `--ds-focus`, `--ds-link`, `--ds-subtle`, `--ds-muted`, `--ds-quiet`, `--ds-primary-text`, `--ds-success-text`, `--ds-error-text`, `--ds-primary-soft`, `--ds-success-soft`, `--ds-warning-soft`, `--ds-error-soft`, `--ds-popover`, `--ds-popover-border`, `--ds-popover-hover`, `--ds-scrim`, `--radius-field`, `--ds-radius-*`, `--ds-size-target`, `--ds-size-target-compact`, `--ds-size-dialog-sm`, `--ds-shadow-xs|panel|overlay`, `--ds-opacity-state-*`, `--ds-opacity-disabled`, `--ds-press-scale`, `--ds-enter-offset`, `--ds-duration-*`, `--ds-ease-*`, `--ds-type-*`. Hook tingkat halaman: `--ds-sticky-top`, `--ds-sticky-bottom` (scroll padding), `--ds-range-fill` (diisi oleh `forms.js`).

## Native dan daisyUI

`native.css` berada di layer `base` setelah preflight Tailwind, sehingga reset preflight (heading mewarisi gaya, daftar tanpa penanda, tombol transparan) diganti tampilan DS, khusus untuk elemen polos. Class daisyUI (`.btn`, `.input`, `.select`, `.checkbox`, `.toggle`, `.range`, `.file-input`, `.table`, `.progress`, `.kbd`, `.modal`, `.collapse`) berada di layer utilities dan selalu menang; [penyelarasan daisyUI](./daisyui.md) mencantumkan semuanya. `ds.css` prebuilt berisi aturan yang sama, sehingga aplikasi tanpa Tailwind juga mendapat tampilan native.

Dukungan browser: `appearance: base-select`, `::details-content`, `interpolate-size`, `field-sizing`, dan invoker command bersifat progresif. Tanpa fitur tersebut, select memakai picker sistem, `details` langsung terbuka, textarea mempertahankan jumlah barisnya, dan contoh dialog membutuhkan script.

Cetak: isi `details` ikut tercetak, `pre` dibungkus, header tabel diulang di setiap halaman, tombol dan dialog tertutup disembunyikan, dan tema gelap dicetak dengan palet terang.
