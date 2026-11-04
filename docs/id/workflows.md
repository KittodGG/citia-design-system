---
title: Alur kerja
group: patterns
order: 4
summary: Alur multi-langkah, persetujuan, pekerjaan panjang dengan progres, dan kapan menawarkan batalkan alih-alih konfirmasi.
---

Alur kerja adalah tugas yang melintasi lebih dari satu layar atau satu waktu. Halaman ini membahas siklus simpan, alur multi-langkah, persetujuan, pekerjaan panjang, dan pilihan antara batalkan dan konfirmasi. Terkait: [Pola form](./forms-pattern.md), [Pola umpan balik](./feedback-pattern.md), [Stepper](./stepper.md), [Progress](./progress.md), [Alert dialog](./alert-dialog.md).

## Simpan, redirect, toast

Setiap penulisan yang berhasil mengikuti Post/Redirect/Get: server menyimpan, mengantrekan toast, lalu redirect ke halaman yang menampilkan hasilnya. Muat ulang tidak pernah mengirim ulang, dan toast mengonfirmasi apa yang terjadi.

```csharp
[HttpPost, ValidateAntiForgeryToken]
public async Task<IActionResult> Save(ProjectForm form)
{
    if (!ModelState.IsValid) return View("Form", form);
    await _projects.SaveAsync(form);
    this.Toast(Tone.Success, "Proyek tersimpan", $"{form.Code} siap dipakai.");
    return RedirectToAction(nameof(Index));
}
```

Kembalikan orang ke halaman asalnya dengan `returnUrl` lokal (validasi dengan `Url.IsLocalUrl`); jangan pakai `history.back()`, yang bisa keluar dari aplikasi.

## Alur multi-langkah

- Tampilkan langkah dengan [Stepper](./stepper.md); langkah aktif memakai `aria-current="step"`, langkah selesai berupa tautan, langkah mendatang bukan.
- Satu keputusan per langkah. Taruh aksi berikutnya di sisi akhir dan Kembali di sisi awal.
- Simpan keadaan di server atau di URL, bukan hanya di halaman, agar muat ulang atau tombol kembali membawa ke langkah dan jawaban yang sama.
- Akhiri dengan layar hasil yang menyebut apa yang dibuat dan menawarkan aksi berikutnya ("Lihat proyek", "Buat lagi").

## Persetujuan

Persetujuan adalah keputusan oleh orang selain pemohon. Rancang untuk kedua orang.

| Peran | Kebutuhan | Rancangan |
| --- | --- | --- |
| Pemohon | Tahu keadaan dan langkah berikutnya | [Pill](./status.md) status pada data ("Menunggu persetujuan"), siapa yang harus menyetujui, dan sejak kapan; aksi "Tarik permohonan" selama menunggu |
| Penyetuju | Fakta untuk memutuskan, dan satu aksi jelas ke tiap arah | Ringkasan permohonan, perubahannya (sebelum dan sesudah), aksi setujui dan tolak berdampingan; Tolak meminta alasan |
| Keduanya | Jejak | Feed riwayat berisi siapa, apa, dan kapan, dalam waktu absolut |

Status dinamai menurut keadaannya, bukan sistem: Draf, Menunggu persetujuan, Disetujui, Ditolak, Ditarik. Ditolak menampilkan alasan dan aksi "Revisi dan kirim ulang". Setujui adalah tombol utama; Tolak adalah tombol sekunder yang membuka dialog dengan alasan wajib.

## Pekerjaan panjang

Apa pun yang lebih lambat dari sekitar 1 detik perlu respons; yang lebih lambat dari sekitar 10 detik perlu progres.

| Durasi | Respons |
| --- | --- |
| Di bawah 300ms | Tidak ada; jangan menampilkan spinner sekilas |
| 300ms sampai 1d | Tombol sibuk (spinner, lebar sama, `aria-busy`) |
| 1 sampai 10d | Keadaan sibuk plus label tentang yang sedang terjadi ("Membuat laporan…") |
| Lebih dari 10d atau tak diketahui | Pindah ke latar belakang: mulai pekerjaan, tampilkan bar [Progress](./progress.md) atau baris status, dan biarkan orang pergi |

Aturan pekerjaan latar belakang:

- Tampilkan progres pasti dengan angka bila total diketahui ("340 dari 1.200 baris"), progres tak pasti bila tidak, plus langkah saat ini dalam kata.
- Sediakan Batal selama aman dibatalkan, dan sebut apa yang terjadi pada pekerjaan yang sudah selesai.
- Simpan pekerjaan di server; tampilkan lagi saat pengguna kembali. Beri tahu saat selesai dengan [Toast](./toast.md) bila masih di aplikasi dan dengan [notifikasi](./notification-center.md) bila sudah pergi.
- Saat gagal, sebut apa yang gagal, apa yang tersimpan, dan apa yang harus dilakukan ("12 baris dilewati. Unduh daftar baris yang dilewati"). Tawarkan Coba lagi.
- Umumkan progres ke teknologi bantu dengan sopan dan jarang: saat mulai, selesai, dan gagal, bukan tiap persen.

```html preview title="Pekerjaan dengan progres"
<div class="ds-card" style="max-inline-size:32rem">
  <div class="ds-card-body">
    <p><strong>Mengimpor pelanggan</strong></p>
    <progress class="progress progress-primary" value="340" max="1200" aria-label="Mengimpor pelanggan"></progress>
    <p class="ds-text-subtle" role="status">340 dari 1.200 baris · sekitar 2 menit lagi</p>
    <div class="ds-actions is-start"><button type="button" class="btn btn-sm">Batalkan impor</button></div>
  </div>
</div>
```

## Batalkan atau konfirmasi

| Pakai | Kapan | Contoh |
| --- | --- | --- |
| Batalkan (bertindak, lalu tawarkan pembalikan) | Aksi bisa dibalik dan sering, dan biaya salah kecil | Arsipkan baris, hapus tag, pindah ke sampah. Toast: "Proyek diarsipkan" dengan aksi Batalkan yang bertahan 8d |
| Konfirmasi (tanya dulu) | Aksi tidak bisa dibatalkan, berefek di luar sistem, atau memengaruhi banyak data | Hapus permanen, kirim ke pelanggan, hapus massal, cabut akses |
| Tidak keduanya | Aksi sepele dan tidak berbahaya | Ganti filter, urutkan kolom |

Dialog konfirmasi menyebut objek dan akibatnya, dan menamai tombol sesuai aksinya: "Hapus PRJ-1024" dan "Pertahankan proyek", bukan "Ya" dan "Tidak". Tombol merusak bukan fokus awal; fokus dimulai di Batal. Pakai `data-ds-confirm` pada tautan atau tombol, atau `DS.confirm()` dari skrip.

```cshtml
<form method="post" asp-action="Delete" asp-route-id="@project.Id"
      data-ds-confirm="Hapus PRJ-1024?"
      data-ds-confirm-text="Proyek dan 3 faktur terkait dihapus. Tindakan ini tidak bisa dibatalkan."
      data-ds-confirm-label="Hapus proyek" data-ds-confirm-tone="danger">
    <button class="btn btn-ghost is-danger">Hapus</button>
</form>
```

Jangan menumpuk keduanya: bila ada batalkan, jangan juga bertanya dulu.

## Mengirim ke layanan luar

Aksi yang keluar dari sistem Anda (email ke pelanggan, kirim ke penyedia pembayaran, panggil API) dikonfirmasi dulu dan harus aman diulang:

- Pakai `data-ds-once` agar form terkirim sekali; beri server kunci idempotensi agar kiriman kedua diabaikan.
- Tampilkan hasil panggilan, bukan hanya bahwa permintaan terkirim ("Faktur INV-2026-0418 terkirim ke daniel.okafor@example.com").
- Bila hasilnya tidak diketahui (timeout), katakan itu dan tawarkan cara memeriksa; jangan menyatakan berhasil atau gagal.

## Penggunaan

- Redirect setelah setiap penulisan yang berhasil dan konfirmasi dengan toast.
- Tampilkan progres dengan angka bila total diketahui.
- Beri pekerjaan panjang tombol Batal dan jalan kembali.
- Jangan meminta konfirmasi untuk aksi yang bisa dibalik; tawarkan Batalkan.
- Jangan memakai "Apakah Anda yakin?"; sebut akibatnya.
