---
title: Panduan cepat
group: getting-started
order: 4
summary: Membangun halaman pertama dalam lima langkah dengan kode siap salin: layout, header halaman, form dengan field, tabel data, dan toast setelah menyimpan.
---

Panduan ini membangun layar faktur di Razor Pages: daftar dengan tabel, dan form yang menyimpan lalu mengonfirmasi dengan toast. Diasumsikan [Instalasi](./installation.md) sudah selesai, sehingga `_ViewImports` dan layout sudah ada.

## 1. Layout

Layout dari instalasi sudah cukup. Untuk aplikasi nyata, tambahkan lebar konten terbatas agar baris teks dan tabel tetap nyaman dibaca:

```cshtml
<main id="main" class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
    @RenderBody()
</main>
```

Dengan `ds.css` jadi (opsi A) tidak ada utilitas Tailwind; pakai aturan kecil sendiri:

```css
.app-content { max-width: 72rem; margin-inline: auto; padding: var(--ds-space-8) var(--ds-space-4); }
```

## 2. Header halaman

Satu judul, satu aksi utama. Eyebrow bersifat opsional sebagai konteks di atas judul.

```cshtml
@page
@model InvoicesModel
@{ ViewData["Title"] = "Faktur"; }

<header class="ds-page-header">
    <div>
        <p class="ds-eyebrow">Penagihan</p>
        <h1 class="ds-page-title">Faktur</h1>
    </div>
    <div class="ds-actions">
        <a asp-page="Create" class="btn btn-primary"><ds-icon name="plus" /> Buat faktur</a>
    </div>
</header>
```

Pakai satu `btn-primary` per area dan sebut hasilnya di label: "Buat faktur", bukan "Tambah".

## 3. Form dengan field

Setiap field adalah `.ds-field`: label di atas, kontrol, lalu bantuan atau galat. Hubungkan dengan `aria-describedby`; validasi bawaan browser mengerjakan sisanya dan menampilkan galat hanya setelah pengguna berinteraksi (`:user-invalid`).

```cshtml
@page
@model CreateModel
@{ ViewData["Title"] = "Faktur baru"; }

<header class="ds-page-header">
    <div>
        <p class="ds-eyebrow">Faktur</p>
        <h1 class="ds-page-title">Faktur baru</h1>
    </div>
</header>

<form method="post" class="ds-fieldset" data-ds-guard>
    <div class="ds-field-grid">
        <div class="ds-field">
            <label for="customer">Pelanggan</label>
            <input id="customer" name="Customer" class="input" required autocomplete="organization"
                   value="@Model.Input.Customer" aria-describedby="customer-hint" />
            <p id="customer-hint" class="ds-hint">Sesuai nama di kontrak.</p>
        </div>

        <div class="ds-field">
            <label for="number">Nomor faktur</label>
            <input id="number" name="Number" class="input" required pattern="INV-\d{4}-\d{4}"
                   placeholder="INV-2026-0418" value="@Model.Input.Number" aria-describedby="number-hint" />
            <p id="number-hint" class="ds-hint">Format INV-TTTT-NNNN.</p>
        </div>

        <div class="ds-field">
            <label for="due">Jatuh tempo</label>
            <input id="due" name="DueDate" type="date" class="input" required value="@Model.Input.DueDate?.ToString("yyyy-MM-dd")" />
        </div>

        <div class="ds-field">
            <label for="amount">Jumlah</label>
            <input id="amount" name="Amount" type="text" inputmode="decimal" class="input" required
                   value="@Model.Input.Amount" aria-describedby="amount-hint" />
            <p id="amount-hint" class="ds-hint">Total termasuk pajak.</p>
        </div>
    </div>

    <div class="ds-actions">
        <a asp-page="Index" class="btn btn-ghost">Batal</a>
        <button type="submit" class="btn btn-primary">Simpan faktur</button>
    </div>
</form>
```

Urutkan tombol Batal, lalu aksi utama di kanan. `data-ds-guard` bertanya sebelum meninggalkan halaman yang punya perubahan belum disimpan (memakai `_DsLeaveDialog`). Di server, tampilkan galat field di sebelah fieldnya:

```cshtml
<span class="ds-field-error" asp-validation-for="Input.Number"></span>
```

Lihat [Field](./field.md), [Input](./input.md), dan [Validation](./validation.md) untuk semua state.

## 4. Tabel data

Angka rata kanan dengan angka tabular (`ds-num`), status berupa kata lebih dulu (`ds-pill`), dan pembungkus bergulir di dalam dirinya sendiri pada layar sempit.

```cshtml
<div class="ds-table-wrap">
    <table class="ds-table">
        <caption class="ds-visually-hidden">Faktur, terbaru lebih dulu</caption>
        <thead>
            <tr>
                <th scope="col">Nomor</th>
                <th scope="col">Pelanggan</th>
                <th scope="col">Jatuh tempo</th>
                <th scope="col" class="ds-num">Jumlah</th>
                <th scope="col">Status</th>
            </tr>
        </thead>
        <tbody>
        @foreach (var i in Model.Invoices)
        {
            <tr>
                <th scope="row"><a asp-page="Details" asp-route-id="@i.Id">@i.Number</a></th>
                <td>@i.Customer</td>
                <td>@i.DueDate.ToString("d MMM yyyy")</td>
                <td class="ds-num">@Fmt.Decimal(i.Amount)</td>
                <td>
                    @switch (i.Status)
                    {
                        case "Paid":    <ds-pill tone="Success">Lunas</ds-pill> break;
                        case "Overdue": <ds-pill tone="Error">Terlambat</ds-pill> break;
                        default:        <ds-pill tone="Warning">Menunggu pembayaran</ds-pill> break;
                    }
                </td>
            </tr>
        }
        </tbody>
    </table>
</div>

@if (!Model.Invoices.Any())
{
    <ds-empty icon="receipt" title="Belum ada faktur" action-label="Buat faktur" action-href="/Invoices/Create">
        Faktur yang Anda buat tampil di sini.
    </ds-empty>
}
```

Untuk pengurutan, paging, dan seleksi lihat [Table](./table.md) dan [Data table](./data-table.md). `Fmt.Decimal` dan `ToString("d MMM yyyy")` mengikuti culture request, sehingga `1,250.50` menjadi `1.250,50` dalam bahasa Indonesia.

## 5. Toast setelah menyimpan

Pakai Post/Redirect/Get. `this.Toast` menyimpan pesan di TempData; `_DsToast` di layout menampilkannya di halaman berikutnya lalu menghapusnya.

```csharp
public class CreateModel : PageModel
{
    [BindProperty] public InvoiceInput Input { get; set; } = new();

    public IActionResult OnPost()
    {
        if (!ModelState.IsValid) return Page();

        // simpan faktur di sini

        this.Toast(Tone.Success, "Faktur tersimpan", $"{Input.Number} untuk {Input.Customer} siap dikirim.");
        return RedirectToPage("Index");
    }
}
```

Dari JavaScript (misalnya setelah fetch) panggil komponen yang sama:

```js
DS.toast({ tone: "success", title: "Faktur tersimpan", text: "INV-2026-0418 siap dikirim." });
```

Toast sukses dan info hilang setelah 6 detik; galat bertahan sampai ditutup. Lihat [Toast](./toast.md).

## Hasilnya

Halaman dengan header, form tervalidasi, tabel dengan kata status dan empty state, toast konfirmasi, tema terang dan gelap, serta bahasa Indonesia dan Inggris, semuanya dari token. Buka halaman dengan `?culture=id` dan ganti tema untuk memeriksa keduanya.

Berikutnya: [Tema](./theming.md) untuk memasang merek Anda, atau [katalog komponen](./button.md).
