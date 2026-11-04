---
title: Empty state
group: components
category: feedback
order: 6
summary: Apa yang ditampilkan daftar, tabel atau halaman saat tidak ada isi: pemakaian pertama, tanpa hasil setelah filter, galat dengan coba lagi, tanpa izin, dan bentuk inline ringkas.
source: TPS app.css .pt-empty L3587–3590, .master-empty L1674–1687, partial _EmptyState
---

Empty state menggantikan konten yang tidak ada. Ia menjelaskan sebabnya dalam satu kalimat, dan menawarkan satu hal yang bisa dilakukan orang. Sebabnya menentukan variannya: belum ada yang dibuat (pemakaian pertama), tidak ada yang cocok (tanpa hasil), data tidak bisa dimuat (galat) atau orang itu tidak boleh melihatnya (izin). Saat data sedang dimuat pakai skeleton; empty state muncul hanya setelah pemuatan selesai.

## Contoh

Pemakaian pertama. Orang belum pernah membuat satu pun. Jelaskan gunanya dan tawarkan aksi utama; tautan kedua bersifat opsional.

```html preview title="Pemakaian pertama"
<div class="ds-empty is-first-use is-boxed">
  <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-briefcase"></use></svg></span>
  <h2>Buat proyek pertama Anda</h2>
  <p>Proyek mengelompokkan faktur, file dan komentar untuk satu klien. Tambahkan satu untuk mulai melacak pekerjaan.</p>
  <div class="ds-empty__actions">
    <a class="btn btn-primary btn-sm" href="#"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-plus"></use></svg>Proyek baru</a>
    <a class="btn btn-ghost btn-sm" href="#">Impor dari CSV</a>
  </div>
</div>
```

Tanpa hasil. Data ada tetapi filter menyembunyikannya. Sebut filternya dan tawarkan untuk menghapusnya.

```html preview title="Tanpa hasil"
<div class="ds-empty is-no-results is-boxed">
  <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-search"></use></svg></span>
  <h2>Tidak ada faktur yang cocok dengan filter ini</h2>
  <p>Status "Terlambat" dan klien "Mei Tanaka" tidak menghasilkan faktur. Hapus salah satu filter atau cari hal lain.</p>
  <div class="ds-empty__actions">
    <button type="button" class="btn btn-sm">Hapus filter</button>
  </div>
</div>
```

Galat. Data tidak bisa dimuat. Sebut apa yang gagal dan tawarkan coba lagi; jangan masukkan detail teknis ke dalam kalimat.

```html preview title="Galat dengan coba lagi"
<div class="ds-empty is-error is-boxed">
  <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg></span>
  <h2>Faktur tidak bisa dimuat</h2>
  <p>Server tidak menjawab. Data Anda aman. Periksa koneksi lalu coba lagi.</p>
  <div class="ds-empty__actions">
    <button type="button" class="btn btn-primary btn-sm"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-refresh"></use></svg>Coba lagi</button>
  </div>
  <p class="ds-empty__hint">Referensi 7F3A-2026-1102</p>
</div>
```

Izin. Orang sudah masuk tetapi tidak boleh melihat ini. Sebut siapa yang bisa memberi akses.

```html preview title="Tanpa izin"
<div class="ds-empty is-permission is-boxed">
  <span class="ds-empty-icon"><svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-lock"></use></svg></span>
  <h2>Anda tidak punya akses ke penagihan</h2>
  <p>Hanya admin workspace yang bisa melihat faktur dan metode pembayaran. Minta Ayu Lestari menambahkan Anda.</p>
  <div class="ds-empty__actions">
    <button type="button" class="btn btn-sm">Minta akses</button>
  </div>
</div>
```

Ringkas inline. Untuk isi tabel, kartu atau menu: satu baris, ikon kecil, satu kalimat, aksi opsional.

```html preview title="Ringkas inline"
<div style="display:grid;gap:.75rem;border:1px solid var(--color-base-300);border-radius:var(--ds-radius-box)">
  <div class="ds-empty is-compact">
    <span class="ds-empty-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-file"></use></svg></span>
    <h3>Belum ada file</h3>
    <p>Letakkan file di sini atau pilih file.</p>
    <div class="ds-empty__actions"><button type="button" class="btn btn-sm">Unggah</button></div>
  </div>
  <div class="ds-empty is-compact is-no-results" style="border-top:1px solid var(--color-base-300)">
    <span class="ds-empty-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-search"></use></svg></span>
    <h3>Tidak ada yang cocok dengan "Okafor"</h3>
  </div>
</div>
```

## State

Empty state bersifat statis; state-nya milik tombol aksi dan urutan pemuatan di sekitarnya.

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Pemakaian pertama | Belum ada yang dibuat | Ikon 56px bertint primary, judul, kalimat, aksi utama dan aksi kedua opsional |
| Tanpa hasil | Filter menyembunyikan semuanya | Ikon netral (cari), menyebut filter, "Hapus filter" |
| Galat | Pemuatan gagal | Ikon bertint galat, tombol coba lagi, referensi opsional |
| Izin | Akses ditolak | Ikon bertint peringatan (gembok), siapa yang bisa memberi akses |
| Ringkas | `is-compact` | Satu baris, ikon 32px, judul 14px |
| Berkotak | `is-boxed` | Border putus-putus 1px dan permukaan halaman; untuk seluruh halaman atau panel |
| Mencoba lagi | `aria-busy="true"` pada tombol coba lagi | Spinner sebelum label, lebar sama, input diblokir |
| State tombol | Pada aksi | Hover, pressed, focus-visible dan disabled seperti pada [button](./button.md) mana pun |

Tint lingkaran ikon hanya isyarat pendukung: bentuk ikon dan judul menyatakan hal yang sama dengan kata-kata.

## Anatomi

- `.ds-empty`: wadah, kolom di tengah. Varian `is-first-use`, `is-no-results`, `is-error`, `is-permission`, `is-compact`; `is-boxed` menambah border putus-putus.
- `.ds-empty-icon` (juga `.ds-empty__icon`): lingkaran 48px berisi ikon.
- Judul (`h2`, `h3` atau `h4`), `p` untuk kalimat.
- `.ds-empty__actions`: satu atau dua aksi. `.btn` anak langsung juga bekerja untuk markup versi 1.
- `.ds-empty__hint`: baris kecil seperti referensi galat.

## Penggunaan

- Satu judul maksimal 50 karakter dan satu kalimat maksimal 2 baris (sekitar 160 karakter).
- Tulis apa yang bisa dilakukan orang, bukan permintaan maaf: "Buat proyek pertama Anda", bukan "Maaf, tidak ada apa-apa".
- Pakai satu aksi utama. Aksi kedua berupa tombol ghost atau tautan.
- Sebut filter pada pesan tanpa hasil dan taruh "Hapus filter" di samping kalimat.
- Sesuaikan level judul dengan halaman: `h2` untuk halaman, `h3` di dalam kartu yang sudah punya `h2`.
- Jangan tampilkan empty state saat memuat; pakai skeleton dan gantikan saat data tiba.
- Jangan pakai ilustrasi yang memenuhi layar. Lingkaran ikon sudah cukup.
- Jangan pakai varian galat untuk kegagalan yang punya tempat lebih baik, seperti galat form di samping fieldnya.

## Aksesibilitas

- Judul menamai situasinya, sehingga pengguna pembaca layar yang melompat per judul menemukannya. Bila empty state menggantikan konten setelah filter berubah, umumkan: beri `role="status"` pada wadah atau perbarui live region ("0 hasil").
- Ikon bersifat dekoratif (`aria-hidden="true"`).
- Aksi adalah tombol atau tautan biasa dengan teks terlihat; ring fokus 2px.
- Kontras: judul berwarna teks penuh dan kalimat `--ds-subtle` (4,5:1 atau lebih); lingkaran ikon adalah tint di atas permukaan dan ikonnya mencapai 3:1.

| Tombol | Aksi |
| --- | --- |
| Tab | Pindah ke aksi |
| Enter, Space | Mengaktifkan aksi yang difokus |

Empty state sendiri tidak bergerak; wadahnya tidak beranimasi masuk, sehingga daftar hasil yang mengosong tidak berkedip.

## Razor

Tag helper merender empty state standar: ikon, judul, kalimat dan satu aksi. Pakai markup biasa untuk varian lain.

```cshtml
<ds-empty icon="briefcase" title="Buat proyek pertama Anda" action-label="Proyek baru" action-href="/Projects/Create" boxed>
    Proyek mengelompokkan faktur, file dan komentar untuk satu klien.
</ds-empty>

<div class="ds-empty is-no-results is-boxed">
    <span class="ds-empty-icon"><ds-icon name="search" size="lg" /></span>
    <h2>Tidak ada faktur yang cocok dengan filter ini</h2>
    <p>Hapus salah satu filter atau cari hal lain.</p>
    <div class="ds-empty__actions"><a class="btn btn-sm" href="?">Hapus filter</a></div>
</div>
```

| Atribut | Efek |
| --- | --- |
| `icon`, `title` | Nama ikon dan judul |
| `action-label`, `action-href`, `action-icon` | Satu aksi utama |
| `boxed` | Border putus-putus |
| `level` | Level judul 2 sampai 4 |

## Token

`--color-primary`, `--color-error`, `--color-warning`, `--ds-subtle`, `--ds-muted`, `--color-base-100`, `--color-base-300`, `--ds-radius-box`, `--ds-radius-full`, `--ds-type-section-size`, `--ds-type-callout-size`.

## Native dan daisyUI

Empty state adalah `div` dengan judul, paragraf dan tombol daisyUI `btn`. DS tidak memakai `hero` milik daisyUI. Margin `.btn` untuk tombol anak langsung versi 1 berada di layer utilities agar mengalahkan aturan tombol daisyUI.
