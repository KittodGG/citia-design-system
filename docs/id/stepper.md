---
title: Stepper
group: components
category: feedback
order: 7
summary: Daftar langkah dalam sebuah proses, vertikal atau horizontal, dengan langkah selesai, saat ini, mendatang, galat, opsional dan nonaktif, berupa tautan atau status saja, dan "Langkah 2 dari 5" yang ringkas di layar sempit.
source: TPS app.css .bc-verification L52–57
---

Stepper menunjukkan posisi orang dalam proses yang urutannya tetap: onboarding, checkout, form beberapa halaman, impor. Ia menjawab "berapa langkah, yang mana sekarang, apa yang sudah selesai". Stepper bukan navigasi antarbagian (pakai [tabs](./tabs.md)) dan bukan ukuran kemajuan tugas dalam persen (pakai progress bar). Batasi 3 sampai 7 langkah; lebih dari itu, kelompokkan langkahnya.

## Contoh

Vertikal, hanya status. Penghubung antar penanda menjadi primary setelah langkah selesai.

```html preview title="Vertikal"
<div class="ds-stepper" style="max-width:26rem">
  <ol class="ds-steps" aria-label="Penyiapan proyek">
    <li class="ds-step is-complete"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Selesai: </span>Buat proyek</span><span class="ds-step__desc">PRJ-1024, dibuat 28 Okt 2026</span></div></li>
    <li class="ds-step is-complete"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Selesai: </span>Undang tim</span><span class="ds-step__desc">4 orang bergabung</span></div></li>
    <li class="ds-step" aria-current="step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Tetapkan anggaran</span><span class="ds-step__desc">Isi total dan mata uang</span></div></li>
    <li class="ds-step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Tinjau dan mulai</span></div></li>
  </ol>
</div>
```

Horizontal, dengan tautan. Langkah yang selesai berupa tautan, sehingga orang bisa kembali. Langkah saat ini dan mendatang bukan tautan.

```html preview title="Horizontal, dapat diklik"
<div class="ds-stepper">
  <p class="ds-stepper__compact" aria-hidden="true">Langkah 3 dari 4: <span>Pembayaran</span></p>
  <ol class="ds-steps is-horizontal" aria-label="Checkout">
    <li class="ds-step is-complete"><a class="ds-step__link" href="#"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Selesai: </span>Keranjang</span><span class="ds-step__desc">3 barang</span></a></li>
    <li class="ds-step is-complete"><a class="ds-step__link" href="#"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Selesai: </span>Pengiriman</span><span class="ds-step__desc">Kantor Jakarta</span></a></li>
    <li class="ds-step" aria-current="step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Pembayaran</span><span class="ds-step__desc">Kartu atau transfer</span></div></li>
    <li class="ds-step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Konfirmasi</span></div></li>
  </ol>
</div>
```

Langkah galat, opsional dan nonaktif.

```html preview title="Galat, opsional, nonaktif"
<div class="ds-stepper">
  <ol class="ds-steps is-horizontal" aria-label="Impor data">
    <li class="ds-step is-complete"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Selesai: </span>Unggah file</span></div></li>
    <li class="ds-step is-error" aria-current="step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Perlu diperiksa: </span>Petakan kolom</span><span class="ds-step__desc">2 kolom belum cocok</span></div></li>
    <li class="ds-step is-optional"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Bersihkan<span class="ds-step__tag">Opsional</span></span></div></li>
    <li class="ds-step is-disabled" aria-disabled="true"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Tidak tersedia: </span>Impor</span><span class="ds-step__desc">Selesaikan pemetaan dulu</span></div></li>
  </ol>
</div>
```

Layar sempit. Saat container lebih sempit dari 26rem, label melebur ke dalam penanda dan baris "Langkah 2 dari 4" muncul. Demo ini selebar 20rem.

```html preview title="Ringkas (container sempit)"
<div class="ds-stepper" style="max-width:20rem">
  <p class="ds-stepper__compact" aria-hidden="true">Langkah 2 dari 4: <span>Pengiriman</span></p>
  <ol class="ds-steps is-horizontal" aria-label="Checkout">
    <li class="ds-step is-complete"><a class="ds-step__link" href="#"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label"><span class="ds-visually-hidden">Selesai: </span>Keranjang</span></a></li>
    <li class="ds-step" aria-current="step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Pengiriman</span></div></li>
    <li class="ds-step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Pembayaran</span></div></li>
    <li class="ds-step"><div class="ds-step__link"><span class="ds-step__marker" aria-hidden="true"></span><span class="ds-step__label">Konfirmasi</span></div></li>
  </ol>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Mendatang | Bawaan | Penanda 28px berongga dengan angkanya, teks berwarna normal |
| Saat ini | `aria-current="step"` | Border primary, cincin 22% dan isian bertint; label bobot 700 |
| Selesai | `is-complete` | Penanda primary terisi dengan glyph centang; penghubung setelahnya primary; "Selesai: " tersembunyi untuk pembaca layar |
| Galat | `is-error` | Border berwarna galat dan glyph tanda seru; deskripsi berwarna galat; "Perlu diperiksa: " tersembunyi |
| Opsional | `is-optional` | Penanda putus-putus dan tag "Opsional" di samping label |
| Nonaktif | `is-disabled` atau `aria-disabled="true"` | Opasitas 55%, `not-allowed`, bukan tautan |
| Hover tautan | Pointer di atas langkah tautan | Label bergaris bawah; border penanda menjadi primary (tidak pada langkah selesai) |
| Pressed tautan | Pointer turun | Penanda berskala 0,97 |
| Focus-visible | Fokus keyboard pada tautan | Ring 2px di sekeliling seluruh langkah |
| Ringkas | Container di bawah 26rem | Label disembunyikan secara visual, baris "Langkah n dari m" tampil |

Warna tidak pernah menjadi satu-satunya isyarat: selesai punya centang, galat punya tanda seru, opsional punya penanda putus-putus dan kata, saat ini punya cincin dan bobot, dan setiap state juga punya teks tersembunyi untuk pembaca layar.

## Anatomi

- `.ds-stepper`: pembungkus opsional yang menjadi container untuk tata letak ringkas, dan `.ds-stepper__compact` baris "Langkah 2 dari 5".
- `ol.ds-steps`: daftar. `is-horizontal` menata langkah dalam satu baris; `is-centered` memusatkan labelnya.
- `li.ds-step`: satu langkah dengan `is-complete`, `is-error`, `is-optional`, `is-disabled` dan `aria-current="step"`.
- `.ds-step__link`: `a` untuk langkah yang dapat diklik, `div` untuk hanya status.
- `.ds-step__marker`, `.ds-step__label`, `.ds-step__desc`, `.ds-step__tag`.
- Markup versi 1 (`ol.ds-steps > li` dengan `is-success`, `is-error`, `is-warning`) tetap tampil sebagai lingkaran bernomor.

## Penggunaan

- Namai langkah dengan kata benda atau frasa kerja pendek maksimal 24 karakter: "Pembayaran", "Petakan kolom".
- Tautkan langkah yang selesai agar orang bisa kembali; jangan tautkan langkah mendatang, karena melompat ke depan merusak proses. Bila langkah boleh dikerjakan dalam urutan apa pun, pakai [checklist](./list.md).
- Tambahkan deskripsi satu baris hanya bila label belum cukup, dan hanya pada langkah yang membutuhkannya.
- Tampilkan bentuk ringkas di bawah 26rem. Jangan sembunyikan nama langkah saat ini: ia ada di baris "Langkah 2 dari 4".
- Tandai langkah sebagai galat bila orang harus kembali ke sana, dan tulis apa yang salah di deskripsinya.
- Jangan pakai stepper untuk navigasi antarhalaman yang mandiri.
- Jangan melebihi 7 langkah.

## Aksesibilitas

- Daftar adalah `ol` dengan `aria-label` yang menamai prosesnya. Langkah saat ini memakai `aria-current="step"`.
- Kata state berada di teks tersembunyi sebelum label ("Selesai: Keranjang"), sehingga state tidak bergantung pada glyph.
- Langkah tautan adalah tautan sungguhan. Langkah yang tidak bisa dikunjungi bukan tautan dan, bila nonaktif, memakai `aria-disabled="true"`.
- Baris ringkas bersifat `aria-hidden="true"` karena daftarnya sudah membawa informasi yang sama.
- Kontras: border penanda 3:1 atau lebih, label 4,5:1, di kedua tema. Forced colours: penanda selesai dan saat ini memakai `Highlight`.
- Gerak: warna penanda berubah selama 160ms; tidak ada yang berpindah.

| Tombol | Aksi |
| --- | --- |
| Tab | Pindah ke langkah tautan berikutnya |
| Enter | Mengikuti tautan |

## Razor

```cshtml
<ds-stepper current="3" orientation="Horizontal" label="Checkout">
    <ds-step title="Keranjang" href="/checkout/cart" description="3 barang" />
    <ds-step title="Pengiriman" href="/checkout/delivery" />
    <ds-step title="Pembayaran" description="Kartu atau transfer" />
    <ds-step title="Bersihkan" optional />
    <ds-step title="Konfirmasi" disabled />
</ds-stepper>
```

| Atribut | Efek |
| --- | --- |
| `ds-stepper current` | Langkah saat ini mulai dari 1; langkah sebelumnya selesai, sesudahnya mendatang |
| `orientation` | `Vertical` (bawaan) atau `Horizontal` |
| `centered` | Memusatkan label (horizontal) |
| `label` | Nama aksesibel daftar |
| `ds-step title`, `description` | Label dan deskripsi satu baris |
| `href` | Menjadikan langkah sebuah tautan |
| `state` | `Auto` (bawaan), `Complete`, `Current`, `Upcoming`, `Error` |
| `optional`, `disabled` | Flag |

Tata letak horizontal merender baris "Langkah 3 dari 5: Pembayaran" untuk container sempit.

## JavaScript

Tidak ada. Stepper adalah HTML dan CSS; container query yang mengalihkan tata letak ringkas. Perbarui langkah di server untuk setiap halaman dalam proses.

## Token

`--color-primary`, `--color-primary-content`, `--ds-control-border`, `--ds-error-text`, `--color-base-100`, `--color-base-300`, `--ds-subtle`, `--ds-border-emphasis`, `--ds-opacity-state-selected`, `--ds-opacity-disabled`, `--ds-duration-quick`, `--ds-focus`.

## Native dan daisyUI

Stepper adalah daftar berurutan. Ia tidak memakai `steps` milik daisyUI: komponen itu menggambar penghubung dengan pseudo-element yang tidak bisa memuat tautan, deskripsi, atau state galat dan opsional.
