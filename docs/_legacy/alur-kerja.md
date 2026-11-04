---
title: Alur kerja
group: Pola
order: 2
summary: POST-redirect-GET, penjaga perubahan belum disimpan, konfirmasi hapus, kirim aman dari ganda, export dan import, navigasi kembali, pembaruan langsung.
source: TPS DESIGN.md bagian Perubahan belum disimpan, Tombol (aturan kirim), Master data operasional; wwwroot/js/site.js, draft-send.js, import-send.js, bc-live.js; Views/Shared/_SendDialog.cshtml
---

Halaman ini mengatur apa yang terjadi antara klik dan hasilnya. Tiga aturan menopang semuanya: aksi yang mengubah data selalu `POST` dengan token anti-forgery lalu dijawab redirect; aksi yang tidak bisa dibatalkan meminta konfirmasi; dan mengirim ke layanan luar adalah langkah terpisah dari menyimpan.

Kode C# di sini untuk ASP.NET Core MVC (.NET 10). Pada Razor Pages, `this.Toast(...)` dipanggil dari `PageModel` dan `return RedirectToPage(...)` menggantikan `RedirectToAction`.

## Simpan, redirect, toast {#prg}

Setelah `POST` berhasil, jangan merender view: redirect ke halaman tujuan dan antre satu toast. Muat ulang halaman hasil tidak mengirim ulang form, dan tombol kembali browser tidak menampilkan "Kirim ulang formulir?". Bila validasi gagal, render ulang view yang sama (200) dengan isian pengguna dipertahankan dan `.ds-error-summary` di atas.

| Hasil | Cara |
| --- | --- |
| Berhasil | `this.Toast(Tone.Success, …)` lalu redirect |
| Validasi gagal | Render ulang view, tanpa toast; ringkasan galat menerima fokus |
| Bentrok data (`RowVersion` berbeda) | Render ulang dengan pesan form: "Data diubah orang lain. Muat ulang halaman, lalu ubah lagi." |
| Gangguan sistem | Catat detailnya di log; tampilkan kalimat pendek dan Request ID |

```csharp
// Program.cs: setiap POST, PUT, PATCH, dan DELETE wajib membawa token anti-forgery.
builder.Services.AddControllersWithViews(o => o.Filters.Add(new AutoValidateAntiforgeryTokenAttribute()));
builder.Services.AddAntiforgery(o => o.HeaderName = "RequestVerificationToken");   // untuk fetch()

public sealed class TanksController(AppDbContext db, ILogger<TanksController> log) : Controller
{
    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Save(TankForm form, string command)
    {
        if (!ModelState.IsValid)
            return View("Form", form);

        var tank = await db.Tanks.FindAsync(form.Id) ?? new Tank();
        form.ApplyTo(tank);
        if (form.Id == 0) db.Tanks.Add(tank);
        else db.Entry(tank).Property(t => t.RowVersion).OriginalValue = form.RowVersion;

        try
        {
            await db.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            ModelState.AddModelError("", "Data diubah orang lain. Muat ulang halaman, lalu ubah lagi.");
            return View("Form", form);
        }
        catch (DbUpdateException ex)
        {
            log.LogError(ex, "Tangki {Code} gagal disimpan", form.Code);     // detail SQL hanya di log
            ModelState.AddModelError("", $"Tangki belum tersimpan. Coba lagi; bila berulang, hubungi admin dengan Request ID {HttpContext.TraceIdentifier}.");
            return View("Form", form);
        }

        this.Toast(Tone.Success, $"Tangki {tank.Code} tersimpan");
        return command == "saveAndNew"
            ? RedirectToAction(nameof(Create), new { returnUrl = form.ReturnUrl })
            : LocalRedirect(BackTarget.From(Url, form.ReturnUrl, new(Url.Action(nameof(Index))!, "Tangki")).Url);
    }
}
```

`<form method="post" asp-action="…">` menulis `__RequestVerificationToken` sendiri. Form yang memakai `action` tulisan tangan harus menambahkan `@Html.AntiForgeryToken()`. Untuk `fetch()`, kirim token di header `RequestVerificationToken` (nama di atas):

```js
const token = document.querySelector('input[name="__RequestVerificationToken"]').value;
await fetch("/Tanks/Save", { method: "POST", headers: { RequestVerificationToken: token }, body: new FormData(form) });
```

Toast yang diantre lewat `this.Toast` disimpan di `TempData` dan dirender `_DsToast` pada halaman berikutnya. Satu toast per permintaan; yang baru menggantikan yang lama. Toast galat bertahan sampai ditutup; yang lain hilang setelah 6 detik dan berhenti menghitung selama dibaca (hover atau fokus). Pesan yang harus dibaca ulang nanti memakai catatan atau banner, bukan toast; lihat [Umpan balik](umpan-balik.md).

## Perubahan belum disimpan {#guard}

Pasang `data-ds-guard` pada setiap form yang isiannya bisa hilang. Bila nilainya berbeda dari saat halaman dimuat, tautan, tombol Back browser, dan reload membuka peringatan sebelum data hilang.

```cshtml
@* Layout, sekali: *@
<partial name="_DsLeaveDialog" />

@* Form: *@
<form method="post" asp-action="Save" data-ds-guard data-ds-once
      data-ds-guard-dirty="@(ViewData.ModelState.IsValid ? null : "true")">
    ...
    <a href="@Model.Back.Url" class="btn" data-ds-guard-skip>Batal</a>
    <button type="submit" class="btn btn-primary">Simpan</button>
</form>
```

### Kapan dialog muncul {#guard-kapan}

| Aksi pengguna | Hasil |
| --- | --- |
| Klik tautan ke halaman lain di situs yang sama | Dialog "Perubahan belum disimpan" |
| Tombol Back browser | Dialog (lewat satu entri riwayat tambahan, lihat di bawah) |
| Reload atau tutup tab | Prompt `beforeunload` bawaan browser; teksnya tidak bisa diubah |
| Submit form yang dijaga | Lolos tanpa tanya |
| Klik `a[data-ds-guard-skip]` (Batal eksplisit) | Lolos tanpa tanya |
| `DS.guard.allow()` | Lolos tanpa tanya sampai `DS.guard.reset()` |
| **Keluar** di dialog | Pindah halaman |
| **Tetap di halaman** atau Escape | Dialog tertutup, isian utuh |

Dialog menaruh fokus awal di **Tetap di halaman**. Tombol **Keluar** berwarna merah dan satu-satunya yang membuang isian.

### Cara kerja {#guard-cara}

- **Kotor** berarti `FormData` form sekarang berbeda dari snapshot saat `init`. Nilai `File` dibandingkan lewat namanya. Field token anti-forgery (`__RequestVerificationToken`, `_token`, `csrfmiddlewaretoken`) diabaikan. Mengembalikan isian ke nilai awal membuat form bersih lagi.
- **Dirender ulang dengan galat:** snapshot diambil dari HTML yang sudah berisi isian pengguna, sehingga form tampak bersih. Pasang `data-ds-guard-dirty` agar tetap dianggap kotor.
- **Tautan yang dicegat:** klik dengan tombol utama, tanpa Ctrl, Meta, Shift, atau Alt; protokol http(s); tanpa `target` selain `_self`; tanpa `download`; bukan lompatan hash di halaman yang sama.
- **Tombol Back:** pada ketikan atau tekanan pointer pertama saat form kotor, ds.js menambah satu entri riwayat (URL sama). Back pertama mendarat di entri itu, ds.js menambahnya lagi dan menampilkan dialog. **Keluar** menjalankan `history.go(-2)`. Browser hanya mempertahankan entri yang ditambahkan dari aksi pengguna, itulah sebabnya ditunggu sampai edit pertama.
- Form yang disisipkan sesudah halaman dimuat perlu `DS.init(wadah)` agar terdaftar.

### API {#guard-api}

```js
import DS from "/_content/Citia.DesignSystem/js/ds.js";

DS.guard.isDirty();      // true bila ada form berpenjaga yang berubah
DS.guard.allow();        // izinkan keluar tanpa tanya (setelah simpan lewat fetch lalu pindah halaman)
DS.guard.reset();        // ambil snapshot baru dan pasang kembali penjaga
DS.guard.register(form); // daftarkan form yang ditambah lewat skrip
```

Panggil `DS.guard.reset()` setelah halaman mengisi form secara asinkron (pratinjau import, hasil tambah cepat). Tanpa itu, pengisian otomatis dihitung sebagai perubahan pengguna.

> [!NOTE]
> Yang dijaga: tautan `a[href]`, tombol Back, reload/tutup tab (prompt `beforeunload` browser), dan form keluar akun yang diberi `data-ds-logout`. Form lain tidak dicegat.

> [!WARNING]
> Halaman masuk tidak dijaga. `data-ds-guard-skip` memanggil `DS.guard.allow()` untuk seluruh halaman; pakai hanya pada Batal yang memang berpindah halaman.

## Konfirmasi hapus {#hapus}

Hapus dan tindakan lain yang tidak bisa dibatalkan memakai `data-ds-confirm` pada tombol di dalam `<form method="post">`. Tombol di dialog berwarna merah dan **Batal mendapat fokus awal**. Atribut dan perilaku dialog ada di [Dialog, menu dan popover](dialog-dan-menu.md#konfirmasi).

Teks konfirmasi menyebut objeknya dan apa yang hilang, bukan "Apakah Anda yakin?":

| Bagian | Contoh |
| --- | --- |
| Judul (`data-ds-confirm`) | Hapus tangki T-01? |
| Teks (`data-ds-confirm-text`) | Tangki dan jadwal pengurasannya ikut hilang. Dokumen yang memakai T-01 tetap tersimpan. |
| Label (`data-ds-confirm-label`) | Hapus tangki |

```cshtml
<form method="post" asp-action="Delete" asp-route-id="@Model.Id">
    <input type="hidden" name="rowVersion" value="@Convert.ToBase64String(Model.RowVersion)" />
    <button type="submit" class="btn btn-ghost is-danger"
            data-ds-confirm="Hapus tangki @Model.Code?"
            data-ds-confirm-text="Tangki dan jadwal pengurasannya ikut hilang. Dokumen yang memakai @Model.Code tetap tersimpan."
            data-ds-confirm-label="Hapus tangki">
        @Icon.Svg("trash") Hapus
    </button>
</form>
```

```csharp
[HttpPost, ValidateAntiForgeryToken]
public async Task<IActionResult> Delete(int id, byte[] rowVersion)
{
    var deleted = await db.Tanks.Where(t => t.Id == id && t.RowVersion == rowVersion).ExecuteDeleteAsync();
    if (deleted == 0)
        this.Toast(Tone.Warning, "Tangki sudah berubah atau terhapus", "Muat ulang daftar untuk melihat keadaan terbaru.");
    else
        this.Toast(Tone.Success, "Tangki terhapus");
    return RedirectToAction(nameof(Index));
}
```

Jangan memasang `data-ds-confirm` pada `<a href>` untuk penghapusan: tautan berpindah lewat `GET`, dan `GET` tidak boleh mengubah data. Server tetap memeriksa izin dan `RowVersion`; dialog hanya perlindungan dari salah klik.

## Mengirim ke layanan luar {#kirim}

Mengirim ke Bea Cukai tidak bisa ditarik. Karena itu:

- Tombol kirim satu-satunya `btn-primary` di areanya dan paling kanan. Kata kerjanya menyebut akibat dan tujuan: "Kirim ke Bea Cukai", "Kirim koreksi ke Bea Cukai", "Perbaiki & kirim ulang". Lihat [Bahasa dan konten](konten.md#tombol).
- Tombol submit pertama di form tidak pernah mengirim ke layanan luar, sehingga Enter di field hanya menyimpan draft atau perubahan.
- Tombol kirim hanya membuka dialog. Dialog mencantumkan apa yang akan dikirim dan modenya.
- Mode **Live** menambah satu pernyataan yang harus dicentang sebelum tombol kirim di dialog aktif: "Saya sudah memeriksa data ini dan siap mengirimnya ke Bea Cukai (DJBC)." Mode simulator menyebut "Simulator: tidak ada data yang dikirim ke Bea Cukai."
- Klik pada tombol kirim di dialog diabaikan dalam 400 ms pertama sesudah dialog dibuka, agar klik ganda tidak langsung mengirim.
- Server menjamin kirim tidak pernah ganda (lihat di bawah). Tanpa JavaScript tidak ada yang terkirim.

### Dialog konfirmasi {#kirim-dialog}

Dialog dirender di dalam form yang dikirimnya. Tombol kirim di dalamnya `disabled` dari markup (dengan `autocomplete="off"` agar Firefox tidak memulihkan keadaan aktif), jadi tanpa skrip atau lewat Enter di field tidak ada yang terkirim. Pratinjau tidak menjalankan skrip aplikasi, sehingga tombol kirim tetap nonaktif.

```html preview title="Dialog kirim, mode Live"
<form data-ds-once>
  <button type="button" class="btn btn-primary" data-ds-dialog-open="alur-kirim" aria-haspopup="dialog" aria-controls="alur-kirim">
    <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>
    Kirim ke Bea Cukai
  </button>
  <noscript><p class="ds-field-error">Aktifkan JavaScript untuk mengirim. Simpan draft tetap bisa dipakai.</p></noscript>
  <dialog id="alur-kirim" class="modal" aria-labelledby="alur-kirim-judul" aria-describedby="alur-kirim-teks">
    <div class="modal-box ds-dialog is-md">
      <h2 id="alur-kirim-judul" class="ds-dialog-title">Kirim BL-2026-00841 ke Bea Cukai?</h2>
      <p id="alur-kirim-teks" class="ds-dialog-desc">Data yang sudah terkirim tidak bisa ditarik kembali.</p>
      <dl class="ds-kv" style="margin-top:1rem">
        <dt>No BL</dt><dd class="ds-id">BL-2026-00841</dd>
        <dt>Kapal</dt><dd>MT Sinar Jaya</dd>
        <dt>Kuantitas</dt><dd>992.5 TNE</dd>
        <dt>Mode</dt><dd>Live, Bea Cukai (DJBC)</dd>
      </dl>
      <label class="ds-check-row" style="margin-top:1rem">
        <input type="checkbox" class="checkbox" name="confirmLive" value="true" data-ds-initial-focus>
        <span>Saya sudah memeriksa data ini dan siap mengirimnya ke Bea Cukai (DJBC).</span>
      </label>
      <div class="modal-action">
        <button type="button" class="btn" data-ds-dialog-close>Batal</button>
        <button type="submit" class="btn btn-primary" autocomplete="off" disabled>
          <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-send"></use></svg>
          Kirim ke Bea Cukai
        </button>
      </div>
    </div>
  </dialog>
</form>
```

Di mode simulator, hapus label centang dan tampilkan "Simulator: tidak ada data yang dikirim ke Bea Cukai." Fokus awal ada di **Batal**.

```cshtml
<form method="post" asp-action="Send" asp-route-id="@Model.Id" data-ds-once>
    <input type="hidden" name="rowVersion" value="@Convert.ToBase64String(Model.RowVersion)" />
    <input type="hidden" name="returnUrl" value="@Model.ReturnUrl" />

    <button type="button" class="btn btn-primary" data-ds-dialog-open="send-dialog" aria-haspopup="dialog" aria-controls="send-dialog">
        <ds-icon name="send" /> Kirim ke Bea Cukai
    </button>
    <noscript><p class="ds-field-error">Aktifkan JavaScript untuk mengirim. Simpan draft tetap bisa dipakai.</p></noscript>

    <dialog id="send-dialog" class="modal" aria-labelledby="send-dialog-title" aria-describedby="send-dialog-text">
        <div class="modal-box ds-dialog is-md">
            <h2 id="send-dialog-title" class="ds-dialog-title">Kirim @Model.BlNumber ke Bea Cukai?</h2>
            <p id="send-dialog-text" class="ds-dialog-desc">Data yang sudah terkirim tidak bisa ditarik kembali.</p>
            <dl class="ds-kv" style="margin-top:1rem">
                <dt>No BL</dt><dd class="ds-id">@Model.BlNumber</dd>
                <dt>Kapal</dt><dd>@Fmt.Text(Model.Vessel)</dd>
                <dt>Kuantitas</dt><dd>@Fmt.Qty(Model.Quantity, "TNE")</dd>
                <dt>Mode</dt><dd>@(Model.Live ? "Live, Bea Cukai (DJBC)" : "Simulator")</dd>
            </dl>
            @if (Model.Live)
            {
                <label class="ds-check-row" style="margin-top:1rem">
                    <input type="checkbox" class="checkbox" name="confirmLive" value="true" data-send-live-tick data-ds-initial-focus />
                    <span>Saya sudah memeriksa data ini dan siap mengirimnya ke Bea Cukai (DJBC).</span>
                </label>
            }
            else
            {
                <p class="ds-hint" style="margin-top:1rem">Simulator: tidak ada data yang dikirim ke Bea Cukai.</p>
            }
            <div class="modal-action">
                <button type="button" class="btn" data-ds-dialog-close data-ds-initial-focus="@(Model.Live ? null : "true")">Batal</button>
                <button type="submit" class="btn btn-primary" autocomplete="off" disabled data-send-confirm>
                    <ds-icon name="send" /> Kirim ke Bea Cukai
                </button>
            </div>
        </div>
    </dialog>
</form>
```

ds.js membuka dialog, memindahkan fokus, dan mengembalikannya ke pemicu saat ditutup. Menyalakan tombol kirim adalah skrip aplikasi kecil (`wwwroot/js/send-dialog.js`):

```js
const dialog = document.getElementById("send-dialog");
const opener = document.querySelector('[data-ds-dialog-open="send-dialog"]');
const send = dialog.querySelector("[data-send-confirm]");
const tick = dialog.querySelector("[data-send-live-tick]");   // hanya ada di mode Live
let openedAt = 0;

const sync = () => { send.disabled = tick ? !tick.checked : false; };

opener.addEventListener("click", () => {
  openedAt = performance.now();
  if (tick) tick.checked = false;                  // setiap pengiriman dikonfirmasi ulang
  sync();
});
tick?.addEventListener("change", sync);
dialog.addEventListener("close", () => { send.disabled = true; });
send.addEventListener("click", (event) => {
  if (performance.now() - openedAt < 400) event.preventDefault();   // klik ganda yang terbawa
});
```

### Aman dari kirim ganda {#kirim-idempotent}

Respons yang hilang, halaman yang dimuat ulang, dan tab kedua semuanya bisa mengirim permintaan yang sama dua kali. Jadikan endpoint kirim idempoten di server: hanya dokumen berstatus Draft dengan `RowVersion` yang sama yang boleh dikirim, dan status berpindah ke Sending **sebelum** layanan luar dipanggil.

```csharp
[HttpPost, ValidateAntiForgeryToken]
public async Task<IActionResult> Send(int id, byte[] rowVersion, bool confirmLive, string? returnUrl)
{
    var doc = await db.Documents.FindAsync(id);
    if (doc is null) return NotFound();
    var back = BackTarget.From(Url, returnUrl, new(Url.Action("Details", new { id })!, "Detail"));

    if (sendMode.IsLive && !confirmLive)       // pernyataan Live juga diperiksa di server
    {
        this.Toast(Tone.Warning, "Centang pernyataan Live", "Pengiriman Live tidak bisa ditarik.");
        return LocalRedirect(back.Url);
    }

    // Klaim: hanya satu permintaan yang lolos. Yang lain melihat status Sending atau RowVersion berbeda.
    if (doc.Status != DocStatus.Draft)
    {
        this.Toast(Tone.Info, "Dokumen ini sudah dikirim", "Muat ulang halaman untuk melihat statusnya.");
        return LocalRedirect(back.Url);
    }
    db.Entry(doc).Property(d => d.RowVersion).OriginalValue = rowVersion;
    doc.Status = DocStatus.Sending;
    doc.SendStartedAtUtc = clock.GetUtcNow().UtcDateTime;
    try { await db.SaveChangesAsync(); }
    catch (DbUpdateConcurrencyException)
    {
        this.Toast(Tone.Info, "Dokumen ini sudah berubah", "Muat ulang halaman untuk melihat statusnya.");
        return LocalRedirect(back.Url);
    }

    var result = await beaCukai.SendAsync(doc, HttpContext.RequestAborted);   // setelah klaim tersimpan
    doc.Status = result.Accepted ? DocStatus.Accepted : DocStatus.Rejected;
    doc.ResponseText = result.Reason;
    await db.SaveChangesAsync();

    this.Toast(result.Accepted ? Tone.Success : Tone.Error,
               result.Accepted ? "Diterima Bea Cukai" : "Ditolak Bea Cukai", result.Reason);
    return LocalRedirect(back.Url);
}
```

Bila proses mati sesudah klaim, dokumen tertinggal di Sending tanpa jawaban. Pengecekan status berkala menandainya "Gagal ke Bea Cukai: Data tidak sampai ke Bea Cukai. Aman dikirim ulang." sehingga operator tahu langkah berikutnya.

### Tanpa JavaScript {#kirim-noscript}

Tombol kirim di dialog `disabled` dari markup, jadi tanpa skrip tombol itu tidak pernah aktif. Tampilkan `<noscript>` di dekat tombol pembuka yang menjelaskan alasannya dan menyebut apa yang tetap bisa dilakukan (Simpan draft). Jangan menawarkan jalan pintas yang mengirim tanpa dialog.

## Export dan import {#berkas}

**Export** adalah tautan `GET` ke endpoint yang mengikuti pencarian, filter, dan urutan yang sedang aktif, untuk semua halaman, bukan halaman yang terlihat. Tautan berada di kelompok kiri toolbar (`.ds-actions.is-start`) dengan `btn-excel` atau `btn-pdf`.

`data-ds-export="Excel"` menampilkan toast info "Menyiapkan file Excel" dan mengunci tautan selama 15 detik (`aria-disabled="true"`), karena browser tidak memberi tanda kapan unduhan selesai. Kunci dilepas lebih awal bila halaman dipulihkan dari back/forward cache.

```csharp
public async Task<IActionResult> ExportExcel(string? q, string? sort, string? direction)
{
    var rows = await Filtered(q, ListSort.Parse(sort, direction, SortKeys, "bl")).ToListAsync();   // semua halaman
    return File(ExcelWriter.Recap(rows),
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        $"Rekap-{Wib.Today:yyyy-MM-dd}.xlsx");
}
```

**Import** berhenti di Draft. Empat langkah, masing-masing halaman atau dialog sendiri:

| Langkah | Terjadi | Tersimpan |
| --- | --- | --- |
| 1. Unggah | Operator memilih berkas `.xlsx` lewat **Import Excel** | Tidak ada |
| 2. Pratinjau | Server membaca dan memeriksa tiap baris; operator melihat jumlah baris dan galat per baris | Tidak ada |
| 3. Simpan | **Simpan sebagai draft** membuat dokumen berstatus Draft, juga di mode Live | Draft |
| 4. Kirim | Langkah terpisah dengan dialog konfirmasi (lihat [Mengirim](#kirim) dan [Kirim massal](#batch)) | Status kirim |

```csharp
[HttpPost, ValidateAntiForgeryToken, RequestSizeLimit(5 * 1024 * 1024)]
public async Task<IActionResult> Preview(IFormFile? file)
{
    if (file is null || !file.FileName.EndsWith(".xlsx", StringComparison.OrdinalIgnoreCase))
    {
        ModelState.AddModelError("file", "Pilih berkas Excel (.xlsx).");
        return View("Import");
    }
    var parsed = importer.Parse(file.OpenReadStream());            // membaca dan memeriksa saja
    var batchId = await staging.SaveAsync(parsed, User);           // penampungan sementara, bukan tabel dokumen
    return View(new ImportPreview(batchId, parsed));
}

[HttpPost, ValidateAntiForgeryToken]
public async Task<IActionResult> SaveDrafts(Guid batchId)
{
    var count = await importer.CommitAsDraftsAsync(batchId, User);  // Status = Draft; tidak memanggil Bea Cukai
    this.Toast(Tone.Success, $"{count} draft tersimpan", "Belum ada yang dikirim ke Bea Cukai.");
    return RedirectToAction("Result", new { batchId });
}
```

Jangan pernah menggabungkan Simpan dan Kirim dalam satu klik di jalur import. Kolom Excel tidak dikutip di teks pengguna; pesan galat menyebut kolomnya dengan nama label di layar.

## Navigasi kembali {#kembali}

Tombol kembali dan **Batal** membawa operator ke halaman asalnya dengan pencarian, filter, urutan, ukuran, dan halaman yang sama, bukan ke daftar yang direset.

- Halaman daftar menaut ke Tambah, Ubah, dan Detail dengan `returnUrl` = path + query daftar itu.
- Server hanya menerima `returnUrl` lokal (`Url.IsLocalUrl`) sepanjang paling banyak 4096 karakter. URL luar (`https://…`, `//host`, `/\host`) ditolak dan diganti tujuan bawaan.
- Judul tombol menyebut tujuan sebenarnya: "Kembali ke Dokumen Pemasukan", "Kembali ke Dashboard". Detail yang dibuka langsung kembali ke daftar tanpa menciptakan filter.
- Tautan kembali di dalam halaman memakai `href` ke `returnUrl`, tidak pernah `history.back()`, karena tujuannya tidak pasti. Hanya tombol kembali di top bar (`data-ds-back`) boleh memakai riwayat: ia memanggil `history.back()` bila referrer berasal dari situs yang sama, selain itu berpindah ke URL cadangan di atributnya.

```csharp
public sealed record BackTarget(string Url, string Label)
{
    const int MaxLength = 4096;

    static readonly (string Prefix, string Label)[] Known =
    [
        ("/Submissions", "Dokumen Pemasukan"),
        ("/OutgoingEvents", "Dokumen Pengeluaran"),
        ("/Recap", "Rekap per BL"),
        ("/Tanks", "Tangki"),
    ];

    public static BackTarget From(IUrlHelper url, string? returnUrl, BackTarget fallback)
    {
        if (string.IsNullOrEmpty(returnUrl) || returnUrl.Length > MaxLength || !url.IsLocalUrl(returnUrl))
            return fallback;
        var path = returnUrl.Split('?', '#')[0];
        if (path == "/") return new(returnUrl, "Dashboard");
        foreach (var (prefix, label) in Known)
            if (path.StartsWith(prefix, StringComparison.OrdinalIgnoreCase)) return new(returnUrl, label);
        return fallback;
    }
}
```

```cshtml
@* Controller mengisi Model.Back = BackTarget.From(Url, returnUrl, new(Url.Action("Index")!, "Tangki")) *@
<a href="@Model.Back.Url" class="btn btn-ghost btn-sm" data-ds-guard-skip>@Icon.Svg("arrow-left") Kembali ke @Model.Back.Label</a>
```

## Pembaruan langsung {#live}

Halaman kerja yang datanya berubah di server (status pengiriman, antrean) menyegarkan dirinya tanpa memuat ulang halaman. Ini pola aplikasi, bukan bagian `ds.js`: TPS menulisnya di `wwwroot/js/bc-live.js` dengan pustaka morphdom 2.7.8. Aturannya:

| Parameter | Nilai |
| --- | --- |
| Interval di halaman kerja (Dashboard, daftar dokumen, Rekap, Import, Input) | 5 detik |
| Interval di halaman lain | 15 detik |
| Server menjawab `304` | Interval × 1.5, paling lama 30 detik |
| Galat atau jaringan putus | Interval × 2, paling lama 60 detik; tampil "Pembaruan terputus. Mencoba kembali; data terakhir tetap ditampilkan." |
| Batas waktu satu permintaan | 10 detik |
| Tab tidak terlihat | Berhenti; mulai lagi saat tab terlihat |
| Sesi atau izin berubah (401, 403, redirect) | Berhenti; tampil "Pembaruan berhenti. Sesi atau izin akses berubah." dengan tautan muat ulang |

Penyegaran **ditunda** selama ada dialog terbuka, popover terbuka, atau elemen `aria-busy="true"` di area live, supaya tidak merebut fokus atau mengubah isi yang sedang dibaca.

Penyegaran **memorph**, tidak memuat ulang: klien mengambil halaman yang sama dengan `If-None-Match`, mengambil `#live-content` dari HTML jawaban, lalu morphdom mengubah DOM seperlunya. Yang dijaga selama morph:

- form berisi isian (selain input tersembunyi) dan form `GET` filter;
- `details` yang sedang terbuka, tombol pohon (`aria-expanded`), dan baris yang dipilih;
- posisi gulir tabel, posisi gulir halaman, dan fokus;
- skrip tidak dijalankan ulang.

```cshtml
<main id="main" class="ds-main" tabindex="-1" data-live-root>
    <div id="live-content">
        @RenderBody()
    </div>
</main>
```

Server memberi `ETag` dari revisi data, pengguna, dan query, lalu menjawab `304` bila klien sudah memilikinya:

```csharp
var etag = $"\"{Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes($"{revisions.Current}|{User.Identity?.Name}|{Request.QueryString}")))[..16]}\"";
if (Request.Headers.IfNoneMatch == etag)
    return StatusCode(StatusCodes.Status304NotModified);
Response.Headers.ETag = etag;
Response.Headers.CacheControl = "no-store";     // klien yang mengatur If-None-Match
return View(model);
```

Kerangka klien:

```js
import DS from "/_content/Citia.DesignSystem/js/ds.js";

const content = document.getElementById("live-content");
const base = () => (/^\/(Home|Submissions|OutgoingEvents|Recap|Import|Posting)(\/|$)|^\/$/.test(location.pathname) ? 5000 : 15000);
let delay = base(), etag = null, timer = 0;

const busy = () => document.querySelector('dialog[open], [popover]:popover-open, #live-content [aria-busy="true"]');
const keep = (el) => el.matches("[data-live-preserve]")
  || (el.matches("form") && (el.method === "get" || el.querySelector("input:not([type=hidden]), select, textarea")));

async function refresh() {
  if (document.hidden || busy()) return schedule();
  try {
    const res = await fetch(location.href, {
      cache: "no-store", credentials: "same-origin", signal: AbortSignal.timeout(10000),
      headers: { Accept: "text/html", ...(etag && { "If-None-Match": etag }) },
    });
    if (res.status === 304) delay = Math.min(30000, Math.ceil(delay * 1.5));
    else if (res.status === 401 || res.status === 403 || res.redirected) return;   // sesi berakhir: berhenti
    else if (res.ok) {
      const next = new DOMParser().parseFromString(await res.text(), "text/html").getElementById("live-content");
      if (!next) return;
      if (!busy()) {
        morphdom(content, next, {
          getNodeKey: (n) => n.id || undefined,
          onBeforeNodeAdded: (n) => (n.nodeName === "SCRIPT" ? false : n),
          onBeforeNodeDiscarded: (n) => !(n.nodeType === 1 && keep(n)),
          onBeforeElUpdated(from, to) {
            if (keep(from)) return false;
            if (from.matches("details")) to.open = from.open;
            if (from.matches("[data-ds-tree-toggle]")) to.setAttribute("aria-expanded", from.getAttribute("aria-expanded"));
            return !from.isEqualNode(to);
          },
        });
        DS.init(content);                                                              // widget pada simpul baru
        content.querySelectorAll(".ds-table-scroll").forEach((s) => s.dispatchEvent(new Event("ds:tableupdate")));
      }
      etag = res.headers.get("ETag");
      delay = base();
    } else throw new Error(String(res.status));
  } catch {
    delay = Math.min(60000, delay * 2);
  }
  schedule();
}

const schedule = () => { clearTimeout(timer); if (!document.hidden) timer = setTimeout(refresh, delay); };
document.addEventListener("visibilitychange", () => { clearTimeout(timer); if (!document.hidden) refresh(); });
schedule();
```

Morph membuang atribut yang hanya ada di DOM (kelas `is-pinned`, gaya `--pin-left`), jadi bangunkan perhitungan kolom menempel lewat `ds:tableupdate` seperti di atas.

## Kirim massal {#batch}

Mengirim banyak draft sekaligus (**Kirim semua (n)**, **Kirim ke Bea Cukai (n)** untuk draft terpilih) berjalan lama dan tidak boleh ditinggalkan diam-diam. Satu dialog konfirmasi (jumlah draft, mode, pernyataan Live) membuka pengiriman; sesudahnya:

- Browser mengirim **satu draft per permintaan**, berurutan, ke endpoint kirim yang idempoten dari bagian [Mengirim](#kirim-idempotent). Hasil tiap draft tampil di barisnya: status, REF, alasan.
- Bilah menempel di bawah layar menunjukkan "Mengirim 3 dari 12", progress, banner **Jangan tutup tab ini sampai pengiriman selesai.**, dan tombol **Berhenti**. Berhenti menunggu draft yang sedang berjalan selesai; draft sisanya tetap Draft.
- Status `429` ditunggu lalu draft yang sama diulang. Respons bukan JSON atau koneksi putus menghentikan pengiriman dengan "Sesi berakhir atau koneksi terputus. Klik Muat ulang status, lalu lanjutkan."; status draft dibaca ulang dari server.
- Selama berjalan, setiap tautan keluar membuka dialog **Pengiriman sedang berjalan**: **Tetap di halaman** (utama, fokus awal) atau **Hentikan dan keluar** (berhenti setelah draft yang sedang dijawab, lalu pindah). Menutup atau memuat ulang tab memakai prompt `beforeunload`.
- Bila halaman tetap ditinggalkan, simpan penanda di `localStorage`. Halaman berikutnya menampilkan `ds-banner is-warning`: "Kirim semua dari hasil import berhenti sebelum selesai: 4 draft belum dikirim." dengan **Lanjutkan kirim** dan **Tutup**.

```html preview title="Bilah progres kirim massal"
<div class="ds-card">
  <div class="ds-card-body">
    <div class="ds-banner is-warning" role="status">
      <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg>
      <p><strong>Jangan tutup tab ini sampai pengiriman selesai.</strong> Draft yang belum terkirim tetap Draft.</p>
    </div>
    <div class="ds-meter" style="margin-top:1rem">
      <div class="ds-meter-row"><span role="status">Mengirim 3 dari 12</span><span>25%</span></div>
      <div class="ds-progress is-info" role="progressbar" aria-label="Progres pengiriman" aria-valuemin="0" aria-valuemax="12" aria-valuenow="3"><span style="width:25%"></span></div>
    </div>
    <div class="ds-actions" style="margin-top:1rem">
      <button type="button" class="btn btn-sm">Berhenti</button>
    </div>
  </div>
</div>
```

```html
<dialog id="batch-leave" class="modal" aria-labelledby="batch-leave-title" aria-describedby="batch-leave-text">
  <div class="modal-box ds-dialog">
    <h2 id="batch-leave-title" class="ds-dialog-title">Pengiriman sedang berjalan</h2>
    <p id="batch-leave-text" class="ds-dialog-desc">Pengiriman berhenti setelah draft yang sedang dikirim dijawab. Draft sisanya tetap Draft.</p>
    <div class="modal-action">
      <button type="button" class="btn" id="batch-leave-go">Hentikan dan keluar</button>
      <button type="button" class="btn btn-primary" data-ds-dialog-close data-ds-initial-focus>Tetap di halaman</button>
    </div>
  </div>
</dialog>
```

```js
const token = document.querySelector('input[name="__RequestVerificationToken"]').value;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let running = false, stopRequested = false, leaveTo = null;

async function sendAll(drafts) {
  running = true; stopRequested = false;
  let i = 0;
  while (i < drafts.length && !stopRequested) {
    showProgress(i, drafts.length);
    let res;
    try {
      res = await fetch(`/Import/SendDraft/${drafts[i].id}`, {
        method: "POST",
        headers: { RequestVerificationToken: token, "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ rowVersion: drafts[i].rowVersion }),
      });
    } catch { res = null; }
    if (res?.status === 429) { await sleep(Number(res.headers.get("Retry-After") ?? 5) * 1000); continue; }   // draft yang sama diulang
    if (!res?.ok || !res.headers.get("Content-Type")?.includes("json")) {
      showStopped("Sesi berakhir atau koneksi terputus. Klik Muat ulang status, lalu lanjutkan.");
      break;
    }
    showRowResult(drafts[i], await res.json());
    i++;
  }
  running = false;
  if (leaveTo) location.assign(leaveTo);
}

// Fase capture: berjalan sebelum penjaga perubahan DS dan mencegat setiap tautan keluar.
document.addEventListener("click", (e) => {
  const link = running && e.target.closest("a[href]");
  if (!link || link.target === "_blank" || (link.pathname === location.pathname && link.hash)) return;
  e.preventDefault();
  leaveTo = link.href;
  document.getElementById("batch-leave").showModal();
}, true);
document.getElementById("batch-leave-go").addEventListener("click", () => { stopRequested = true; if (!running) location.assign(leaveTo); });
document.querySelector("[data-batch-stop]").addEventListener("click", () => { stopRequested = true; });
window.addEventListener("beforeunload", (e) => { if (running) { e.preventDefault(); e.returnValue = ""; } });
```

`sendAll` menunggu draft yang sedang berjalan selesai sebelum berpindah halaman; "Hentikan dan keluar" memasang `leaveTo` lebih dulu lewat klik tautan.

## Jangan

- Jangan memakai `GET` untuk aksi yang mengubah data, termasuk hapus dan kirim.
- Jangan merender view langsung setelah `POST` yang berhasil; redirect.
- Jangan memakai `history.back()` untuk tautan kembali di dalam halaman.
- Jangan membiarkan Enter di field mengirim ke layanan luar.
- Jangan mengandalkan tombol `disabled` di browser sebagai satu-satunya pencegah kirim ganda; server yang menolak.
- Jangan menjaga halaman masuk dengan `data-ds-guard`.
- Jangan menjadikan pembaruan langsung bagian dari tindakan: ia hanya menampilkan, tidak pernah mengirim.
