---
title: Toast
group: components
category: feedback
order: 3
summary: Pesan singkat yang mengonfirmasi hal yang baru terjadi, menumpuk hingga tiga, berhenti saat dibaca, membawa satu aksi dan berubah dari memuat menjadi berhasil atau gagal.
source: TPS partial _Toast dan aturan toast di app.css
---

Toast mengonfirmasi hasil dari sesuatu yang baru dikerjakan orang ("Draf tersimpan") lalu menyingkir. Toast tidak menyimpan informasi yang harus dibaca nanti: taruh di [alert](./alert.md) atau [banner](./banner.md). Toast tidak bisa memuat keputusan; untuk itu pakai [dialog](./dialog.md). Toast dengan satu aksi pemulihan ("Urungkan") boleh dan bertahan sampai orang menjawabnya.

## Contoh

Klik sebuah tombol. Toast masuk dari tepi tempatnya berada (kanan bawah secara bawaan), tampil 6 detik (8 detik untuk teks panjang) dan keluar dengan cara yang sama. Galat bertahan sampai ditutup.

```html preview title="Nada"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-toast-show="success" data-ds-toast-title="Draf tersimpan" data-ds-toast-text="Proposal PRJ-1024 disimpan pukul 14.05.">Berhasil</button>
  <button type="button" class="btn" data-ds-toast-show="info" data-ds-toast-title="Menyiapkan ekspor" data-ds-toast-text="File terunduh saat sudah siap.">Info</button>
  <button type="button" class="btn" data-ds-toast-show="warning" data-ds-toast-title="Penyimpanan hampir penuh" data-ds-toast-text="92% dari 50 GB terpakai.">Peringatan</button>
  <button type="button" class="btn" data-ds-toast-show="error" data-ds-toast-title="Faktur tidak terkirim" data-ds-toast-text="INV-2026-0418 belum punya penerima. Tambahkan email lalu coba lagi.">Galat</button>
</div>
```

Dengan aksi. Toast yang punya aksi tidak menutup sendiri: orang menjawabnya atau menutupnya. Aksi memicu `ds:toast:action`.

```html preview title="Aksi (bertahan sampai dipakai)"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-toast-show="success" data-ds-toast-id="deleted-1" data-ds-toast-title="3 faktur dihapus" data-ds-toast-action="Urungkan">Hapus 3 faktur</button>
</div>
```

Memuat, lalu berhasil atau gagal. Toast yang sama berubah di tempat; keadaan memuat tidak pernah habis waktu.

```html preview title="Memuat → berhasil / gagal"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-toast-show="loading" data-ds-toast-id="export" data-ds-toast-title="Mengekspor 1.284 baris" data-ds-toast-resolve="success" data-ds-toast-resolve-title="Ekspor siap" data-ds-toast-resolve-text="Report-2026-Q3.xlsx, 2,4 MB.">Ekspor (berhasil)</button>
  <button type="button" class="btn" data-ds-toast-show="loading" data-ds-toast-id="sync" data-ds-toast-title="Menyinkronkan dengan sistem akuntansi" data-ds-toast-resolve="error" data-ds-toast-resolve-title="Sinkronisasi gagal" data-ds-toast-resolve-text="Server tidak menjawab tepat waktu. Coba lagi.">Sinkron (gagal)</button>
</div>
```

Tumpukan dan posisi. Klik beberapa kali: sampai 3 toast terlihat, yang lebih lama berada di belakang yang terbaru. Arahkan kursor atau fokus ke tumpukan untuk membukanya (timer juga berhenti); di layar sentuh ketuk tumpukan. Geser toast ke samping pada layar sentuh untuk menutupnya.

```html preview title="Tumpukan dan posisi"
<div class="ds-actions is-start">
  <button type="button" class="btn" data-ds-toast-show="info" data-ds-toast-title="Komentar baru" data-ds-toast-text="Mei Tanaka membalas di PRJ-1024.">Tambah ke tumpukan</button>
  <button type="button" class="btn" data-ds-toast-show="success" data-ds-toast-position="top-center" data-ds-toast-title="Tengah atas" data-ds-toast-text="Dipakai untuk hasil tingkat halaman.">Tengah atas</button>
  <button type="button" class="btn" data-ds-toast-show="info" data-ds-toast-position="bottom-start" data-ds-toast-title="Kiri bawah">Kiri bawah</button>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Masuk | Toast ditambahkan | Opacity 0 ke 1 dan bergeser dari tepi regionnya selama 350ms |
| Rest | Terlihat dan menghitung | Isian tonal dengan ikon nada, judul, teks opsional dan aksi |
| Bertumpuk | Lebih dari satu toast | Yang terbaru di depan; yang di belakang menampakkan 10px masing-masing, 5% lebih kecil; paling banyak 3 terlihat, sisanya tersembunyi |
| Terbuka | Hover atau fokus pada tumpukan, ketuk di layar sentuh | Setiap toast berukuran penuh dengan jarak 8px; timer berhenti |
| Dijeda | Pointer atau fokus di dalam, jendela kehilangan fokus, tab tersembunyi, menggeser | Hitung mundur berhenti dan berlanjut dengan sisa waktu (paling sedikit 1,5 detik) |
| Memuat | `tone: "loading"` | Cincin berputar, tanpa batas waktu, `aria-busy="true"` |
| Berhasil, galat | `update()` atau `promise` | Nada, ikon, judul dan teks berubah di tempat; berhasil habis waktu, galat bertahan |
| Hover, pressed | Pada aksi atau tombol tutup | State layer 6% dan 10%, skala 0,97 saat ditekan |
| Focus-visible | Fokus keyboard | Ring `--ds-focus` 2px pada toast dan tombolnya |
| Menyeret | Gerak sentuh pada sumbu tutup | Toast mengikuti jari tanpa transisi; ke arah sebaliknya menahan |
| Keluar | Habis waktu, tutup, Escape, geser | Opacity ke 0 selama 140ms dengan bergeser ke tepi (atau ke arah geser) |

Aturan geser: toast ditutup bila jarak seretan ditambah kecepatan 120ms melewati 35% lebarnya (paling banyak 100px). Bila tidak, toast kembali. Sentakan cepat keluar secepat jari (antara 140ms dan 280ms).

## Anatomi

- `.ds-toast-region`: live region tetap. `data-position` adalah `bottom-end` (bawaan), `bottom-center`, `bottom-start`, `top-end`, `top-center`, atau `top-start`. Pada layar di bawah 640px selebar layar.
- `.ds-toast`: satu toast, nada `is-info`, `is-success`, `is-warning`, `is-error`, `is-loading`.
- `.ds-toast__icon`, `.ds-toast__body`, `.ds-toast__title`, `.ds-toast__text`: konten (nama versi 1 `.ds-toast-body`, `.ds-toast-title`, `.ds-toast-text`, `.ds-toast-close` tetap berfungsi).
- `.ds-toast__actions` dan `.ds-toast__action`: baris dan tombol aksi.
- `.ds-toast__close`: tombol tutup.

## Penggunaan

- Judul di bawah 50 karakter dan teks di bawah 2 baris. Sebut dulu apa yang terjadi, lalu sebab atau langkah berikutnya.
- Tampilkan toast untuk hasil dari aksi orang itu sendiri. Jangan untuk hal yang terjadi di tempat lain; pakai [notification center](./notification-center.md).
- Tampilkan toast galat hanya bila galat itu juga tampil di tempat orang bekerja ([alert](./alert.md) atau field). Toast menghilang; galat tidak boleh.
- Pakai paling banyak satu aksi, dan hanya bila aksi itu mengurungkan atau mengulang yang baru terjadi. Bila aksi butuh keputusan, buka dialog.
- Tumpuk sampai 3. Bila satu operasi menghasilkan banyak hasil, tampilkan satu toast ("12 file terunggah").
- Perbarui toast alih-alih menambah yang baru untuk operasi yang sama: berikan `id` yang sama.
- Jangan menaruh fakta penting hanya di toast. Orang yang menoleh selama 6 detik akan melewatkannya.

## Aksesibilitas

- Region berupa `role="region"` dengan `aria-live="polite"`. Galat memakai `role="alert"` (diumumkan seketika); nada lain memakai `role="status"` (sopan). Toast memuat memakai `aria-busy`.
- WCAG 2.2.1: hitung mundur berhenti saat hover, saat fokus dan saat jendela kehilangan fokus; toast dengan aksi, toast memuat dan galat tidak habis waktu.
- Keyboard: `Alt+T` memindahkan fokus ke toast terbaru; `Escape` menutup toast yang difokus dan mengembalikan fokus ke tempat semula.
- Tombol tutup 28px dengan area sentuh 44px dan bernama. Toast tidak pernah menjadi satu-satunya cara menyelesaikan tugas.
- Kontras: teks 4,5:1, ikon 3:1 di kedua tema. Reduced motion: hanya opacity yang berubah, tumpukan tidak berskala atau berpindah, spinner diam.

| Tombol | Aksi |
| --- | --- |
| Alt+T | Fokus ke toast terbaru |
| Tab, Shift+Tab | Pindah antara aksi dan tombol tutup, dan ke toast berikutnya |
| Enter, Space | Mengaktifkan tombol yang difokus |
| Escape | Menutup toast yang difokus |

## Razor

Antre toast sebelum redirect dan render region sekali di layout.

```csharp
this.Toast(Tone.Success, "Draf tersimpan");
this.Toast(Tone.Error, "Faktur tidak terkirim", "INV-2026-0418 belum punya penerima.");
return RedirectToAction(nameof(Index));
```

```cshtml
<partial name="_DsToast" />
```

Partial merender `<div class="ds-toast-region" data-ds-toast-region data-position="bottom-end">`; ubah `data-position` untuk memindahkannya.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `data-ds-toast-show="tone"` | Saat diklik, menampilkan toast. Nada: `success`, `info`, `warning`, `error`, `loading` |
| `data-ds-toast-title`, `data-ds-toast-text` | Judul dan teks |
| `data-ds-toast-action="Urungkan"` | Menambah aksi; toast lalu bertahan sampai dipakai. Dengarkan `ds:toast:action` |
| `data-ds-toast-id` | Menampilkan toast yang sama sebagai pembaruan, bukan duplikat |
| `data-ds-toast-position` | Region yang dipakai |
| `data-ds-toast-timeout="8000"` | Milidetik; `0` membiarkannya terbuka |
| `data-ds-toast-resolve="success\|error"` | Dengan `loading`: berganti setelah `data-ds-toast-resolve-after` (1800ms) ke `-resolve-title` dan `-resolve-text` |
| `data-ds-toast`, `data-ds-toast-close`, `data-ds-toast-region` | Toast hasil render server, tombol tutupnya dan region |

```js
const handle = DS.toast({ tone: "success", title: "3 faktur dihapus", action: { label: "Urungkan", onClick: () => restore() } });
handle.update({ tone: "info", title: "Dipulihkan" });
handle.close();

DS.toast.promise(exportReport(), {
  loading: { title: "Mengekspor 1.284 baris" },
  success: (file) => ({ title: "Ekspor siap", text: file.name }),
  error: (err) => ({ title: "Ekspor gagal", text: err.message }),
});

DS.toast.success("Draf tersimpan");   // juga error, info, warning, loading
DS.toast.dismiss();                   // semuanya, atau DS.toast.dismiss(id)
```

| Opsi | Bawaan | Arti |
| --- | --- | --- |
| `tone` | `"info"` | `success`, `info`, `warning`, `error`, `loading` |
| `title`, `text` | | Konten, teks biasa |
| `timeout` | 6000 (8000 untuk teks panjang) | Milidetik; `0` atau `Infinity` menahannya. Galat, memuat dan toast beraksi bertahan secara bawaan |
| `stack` | `true` | `false` mengganti toast yang tampil di region itu |
| `id` | | Memperbarui toast yang ada dengan id ini |
| `position` | `"bottom-end"` | Posisi region |
| `action` | | `{ label, onClick, href, keepOpen }` |
| `closeButton` | `true` | `false` menyembunyikan tombol tutup |

Event (naik dari toast): `ds:toast:close` dengan `detail: { id }` dan `ds:toast:action` dengan `detail: { id, trigger }`.

## Token

`--ds-z-tooltip`, `--ds-shadow-panel`, `--ds-radius-box`, `--ds-duration-settle`, `--ds-duration-exit`, `--ds-ease-emphasized`, `--ds-ease-exit`, `--ds-size-target`, `--ds-press-scale`, `--ds-opacity-state-hover`, `--ds-opacity-state-pressed`, `--ds-focus`, dan warna nada.

## Native dan daisyUI

Toast bukan `.toast` milik daisyUI. Posisi dan tumpukannya diatur `toast.js` hanya dengan `transform` dan `opacity`. Tombol aksi adalah tombol kecil berborder (`ds-toast__action`), bukan `btn`, agar kontrasnya mengikuti nada.
