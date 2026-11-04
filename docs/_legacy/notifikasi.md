---
title: Notifikasi
group: Komponen
order: 10
summary: Bel dengan badge belum dibaca, panel dan item, kartu kotak masuk, banner kritis, dan spesifikasi polling sisi aplikasi untuk menjaga hitungan tetap segar.
source: TPS Styles/app.css L3662–3718; ViewComponents/NotificationBell; Views/Notifications
---

Notifikasi menyampaikan siaran dari operator platform ke terminal: pemeliharaan, pengingat pembayaran, pengingat trial, dan pengumuman umum. Tiga permukaan melayani satu data: bel di top bar untuk sekilas, halaman kotak masuk untuk membaca penuh, dan banner di atas konten untuk siaran kritis yang belum dibaca.

DS menyediakan markup dan gaya. Pengambilan data berkala (polling) ada di sisi aplikasi, bukan di `ds.js`; spesifikasinya di bagian [Polling](#polling).

## Bel dan badge {#bel}

Bel adalah `details.ds-notif[data-ds-menu]` dengan `summary.ds-notif-trigger`. Badge `.ds-notif-count` menampilkan jumlah belum dibaca: angka biasa sampai 99, `99+` di atasnya, dan atribut `hidden` saat 0.

```html preview title="Badge: 3, 99+, dan 0"
<div class="ds-actions is-start">
  <details class="ds-notif" data-ds-menu>
    <summary class="ds-notif-trigger" aria-label="Notifikasi: 3 belum dibaca">
      <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><span class="ds-notif-count">3</span>
    </summary>
    <div class="ds-notif-panel"><p class="ds-notif-empty">Belum ada notifikasi.</p></div>
  </details>
  <details class="ds-notif" data-ds-menu>
    <summary class="ds-notif-trigger" aria-label="Notifikasi: 120 belum dibaca">
      <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><span class="ds-notif-count">99+</span>
    </summary>
    <div class="ds-notif-panel"><p class="ds-notif-empty">Belum ada notifikasi.</p></div>
  </details>
  <details class="ds-notif" data-ds-menu>
    <summary class="ds-notif-trigger" aria-label="Notifikasi: 0 belum dibaca">
      <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><span class="ds-notif-count" hidden>0</span>
    </summary>
    <div class="ds-notif-panel"><p class="ds-notif-empty">Belum ada notifikasi.</p></div>
  </details>
</div>
```

### State dan perilaku

- Pemicu 44 × 44 px. Hover dan saat panel terbuka, latar bertint primary 8% dan ikon berwarna primary.
- Badge berada di sudut kanan atas, bulat, merah (`--color-error`) dengan cincin 2 px `base-100` agar terpisah dari ikon.
- Panel menutup saat penekanan di luar, saat Escape (fokus kembali ke `summary`), dan saat menu `data-ds-menu` lain dibuka. Panel muncul dengan animasi singkat (`--ds-duration-quick`).
- Jumlah dan daftar tidak pernah dibangun ulang saat panel terbuka; lihat [Polling](#polling).

### Aksesibilitas

- `aria-label` pada `summary` memuat jumlah nyata: "Notifikasi: 3 belum dibaca", "Notifikasi: 120 belum dibaca". Teks badge tidak dibaca terpisah karena nama aksesibel sudah ditimpa `aria-label`.
- Warna merah bukan satu-satunya penanda: angkanya tertulis di badge dan di `aria-label`.

## Panel dan item {#panel}

Panel berisi kepala (`.ds-notif-head`), daftar (`.ds-notif-list`, maksimal 22 rem lalu bergulir), keadaan kosong (`.ds-notif-empty`), dan tautan "Lihat semua notifikasi" (`.ds-notif-all`). Item adalah `a.ds-notif-item` bernada `.is-error`, `.is-warning`, atau `.is-info`. Item yang sudah dibaca ditambah `.is-read`: opasitas turun dan titik menjadi cincin kosong.

```html preview title="Panel dengan tiga item"
<div style="min-height:30rem;display:flex;justify-content:flex-end">
  <details class="ds-notif" data-ds-menu>
    <summary class="ds-notif-trigger" aria-label="Notifikasi: 2 belum dibaca">
      <svg class="ds-icon is-lg" aria-hidden="true"><use href="#ds-icon-bell"></use></svg><span class="ds-notif-count">2</span>
    </summary>
    <div class="ds-notif-panel">
      <div class="ds-notif-head">
        <strong>Notifikasi</strong>
        <form method="post"><button type="submit" class="btn btn-ghost btn-xs">Tandai semua dibaca</button></form>
      </div>
      <ul class="ds-notif-list">
        <li><a class="ds-notif-item is-error" href="#">
          <span class="ds-notif-dot"></span>
          <span><span class="ds-notif-title"><span class="ds-visually-hidden">Belum dibaca: </span>Pemeliharaan terjadwal malam ini</span>
          <span class="ds-notif-text">Pengiriman ke Bea Cukai berhenti 22.00–23.30 WIB. Selesaikan posting sebelum jam itu.</span>
          <span class="ds-notif-time">14.30 WIB · Pemeliharaan</span></span>
        </a></li>
        <li><a class="ds-notif-item is-warning" href="#">
          <span class="ds-notif-dot"></span>
          <span><span class="ds-notif-title"><span class="ds-visually-hidden">Belum dibaca: </span>Pembayaran langganan jatuh tempo 3 Nov 2026</span>
          <span class="ds-notif-text">Akses terminal berhenti bila tagihan belum dibayar.</span>
          <span class="ds-notif-time">09.00 WIB · Pengingat pembayaran</span></span>
        </a></li>
        <li><a class="ds-notif-item is-info is-read" href="#">
          <span class="ds-notif-dot"></span>
          <span><span class="ds-notif-title">Rekap per BL kini bisa dibuka per truk</span>
          <span class="ds-notif-time">25 Jan 2026 10.15 WIB · Umum</span></span>
        </a></li>
      </ul>
      <a class="ds-notif-all" href="#">Lihat semua notifikasi</a>
    </div>
  </details>
</div>
```

Bila tidak ada notifikasi, ganti `.ds-notif-list` dengan `<p class="ds-notif-empty">Belum ada notifikasi.</p>`.

### State dan perilaku

| Bagian | Perilaku |
| --- | --- |
| `.ds-notif-head` | Judul di kiri; form "Tandai semua dibaca" (`btn btn-ghost btn-xs`) di kanan, berupa `<form method="post">` biasa |
| `.ds-notif-title` | 13 px tebal 700; membungkus, tidak dipotong |
| `.ds-notif-text` | 12 px, dipotong pada 3 baris (`-webkit-line-clamp: 3`); teks lengkap ada di kotak masuk |
| `.ds-notif-time` | 11 px redup: waktu WIB lalu kategori, dipisah " · " (mis. `14.30 WIB · Pemeliharaan`) |
| `.ds-notif-dot` | Titik 0.6 rem bertone dengan halo; berubah menjadi cincin kosong saat `.is-read` |
| `.ds-notif-all` | Tautan biru di dasar panel, 13 px tebal 650, hover berlatar `base-200` |

Panel selebar `min(--ds-size-panel, 100vw − 2rem)` dan rata kanan terhadap bel.

### Razor

```cshtml
@using Citia.DesignSystem.Ui
@model BellModel
<details class="ds-notif" data-ds-menu data-notif-url="@Url.Action("Feed", "Notifications")" data-unread="@Model.Unread">
    <summary class="ds-notif-trigger" aria-label="Notifikasi: @Model.Unread belum dibaca">
        @Icon.Svg("bell", css: "ds-icon is-lg")
        <span class="ds-notif-count" hidden="@(Model.Unread == 0)">@(Model.Unread > 99 ? "99+" : Model.Unread.ToString())</span>
    </summary>
    <div class="ds-notif-panel">
        <div class="ds-notif-head">
            <strong>Notifikasi</strong>
            <form method="post" asp-controller="Notifications" asp-action="MarkAllRead">
                <button type="submit" class="btn btn-ghost btn-xs">Tandai semua dibaca</button>
            </form>
        </div>
        @if (Model.Items.Count == 0)
        {
            <p class="ds-notif-empty">Belum ada notifikasi.</p>
        }
        else
        {
            <ul class="ds-notif-list">
                @foreach (var n in Model.Items)
                {
                    <li>
                        <a class="ds-notif-item is-@NotificationUi.Tone(n.Level)@(n.Read ? " is-read" : "")"
                           href="@Url.Action("Index", "Notifications")#n-@n.Id">
                            <span class="ds-notif-dot"></span>
                            <span>
                                <span class="ds-notif-title">@if (!n.Read) {<span class="ds-visually-hidden">Belum dibaca: </span>}@n.Title</span>
                                <span class="ds-notif-text">@n.Message</span>
                                <span class="ds-notif-time">@n.Time · @n.Category</span>
                            </span>
                        </a>
                    </li>
                }
            </ul>
        }
        <a class="ds-notif-all" asp-controller="Notifications" asp-action="Index">Lihat semua notifikasi</a>
    </div>
</details>
```

**Token.** `--ds-size-panel`, `--ds-z-notification`, `--ds-shadow-overlay`, `--ds-opacity-read`, `--ds-type-micro-size`.

**Asal TPS.** `Styles/app.css` L3662–3718; view component `NotificationBell`.

## Tingkat dan kategori {#nada}

Tingkat siaran menentukan nada; kategori hanya label di baris waktu. Kritis menjadi `error`, Peringatan menjadi `warning`, sisanya `info`.

| Tingkat | Nada | Kelas |
| --- | --- | --- |
| Kritis | `error` | `.is-error` |
| Peringatan | `warning` | `.is-warning` |
| Lainnya | `info` | `.is-info` |

Kategori: **Pemeliharaan**, **Pengingat pembayaran**, **Pengingat trial**, **Umum**.

Nada mewarnai titik, bilah kiri kartu, dan ikon, tetapi hanya mendukung: judul dan kategori selalu tertulis, dan kartu kotak masuk menyebut tingkatnya ("Kritis") di judul.

### Razor

```csharp
public sealed record NotificationItem(int Id, string Title, string Message, string Time, string Category, string Level, bool Read);
public sealed record BellModel(int Unread, IReadOnlyList<NotificationItem> Items);

public static class NotificationUi
{
    public static string Tone(string level) => level switch
    {
        "Kritis" => "error",
        "Peringatan" => "warning",
        _ => "info",
    };

    public static string Icon(string level) => Tone(level) switch
    {
        "error" => "x-circle",
        "warning" => "alert",
        _ => "info",
    };
}
```

## Kartu kotak masuk {#kartu}

Halaman "Semua notifikasi" memakai `.ds-notif-card`: bilah kiri 4 px sesuai nada, ikon `.ds-notif-card-icon` bertint, lalu isi lengkap (tanpa pemotongan baris). Kartu yang sudah dibaca (`.is-read`) atau sudah berakhir (`.is-ended`) berlatar lebih tenang.

Setiap kartu diberi `id="n-<id>"`. Item di bel menaut ke `/Notifications#n-<id>`, dan `:target` menandai kartu itu dengan cincin 3 px bernada, jadi operator langsung melihat notifikasi yang dibuka dari bel. `scroll-margin-top: 6rem` menjaga kartu tidak tertutup top bar.

```html preview title="Kartu kotak masuk"
<div style="display:grid;gap:0.75rem">
  <article class="ds-notif-card is-error" id="notifikasi-n-12">
    <span class="ds-notif-card-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-x-circle"></use></svg></span>
    <div style="flex:1 1 16rem;min-width:0">
      <h2 class="ds-notif-title">Kritis · Pemeliharaan terjadwal malam ini</h2>
      <p>Pengiriman ke Bea Cukai berhenti 22.00–23.30 WIB. Selesaikan posting BL-2026-00841 sebelum jam itu.</p>
      <p class="ds-notif-time">14.30 WIB · Pemeliharaan</p>
    </div>
    <form method="post"><button type="submit" class="btn btn-ghost btn-sm">Tandai dibaca</button></form>
  </article>
  <article class="ds-notif-card is-info is-read" id="notifikasi-n-9">
    <span class="ds-notif-card-icon"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-info"></use></svg></span>
    <div style="flex:1 1 16rem;min-width:0">
      <h2 class="ds-notif-title">Rekap per BL kini bisa dibuka per truk</h2>
      <p class="ds-notif-time">25 Jan 2026 10.15 WIB · Umum · Sudah dibaca</p>
    </div>
  </article>
</div>
```

## Banner kritis {#banner}

Siaran Kritis yang belum dibaca tampil sebagai banner di atas konten setiap halaman sampai operator menandainya. Banner memakai `.ds-banner.is-error.is-critical`: bilah kiri merah, ikon yang berkedip 1.6 detik (berhenti di bawah `prefers-reduced-motion: reduce`), dan form "Tandai sudah dibaca".

```html preview title="Banner kritis"
<div class="ds-banner is-error is-critical">
  <svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-alert"></use></svg>
  <div><strong>Pemeliharaan 3 Nov 2026 22.00–23.30 WIB.</strong> Pengiriman ke Bea Cukai tidak tersedia pada jam itu. <a href="#">Lihat detail</a></div>
  <form method="post"><button type="submit" class="btn btn-sm">Tandai sudah dibaca</button></form>
</div>
```

```cshtml
@if (Model.CriticalBroadcast is { } c)
{
    <div class="ds-banner is-error is-critical">
        @Icon.Svg("alert")
        <div><strong>@c.Title</strong> @c.Message <a asp-controller="Notifications" asp-action="Index" asp-fragment="n-@c.Id">Lihat detail</a></div>
        <form method="post" asp-controller="Notifications" asp-action="MarkRead" asp-route-id="@c.Id">
            <button type="submit" class="btn btn-sm">Tandai sudah dibaca</button>
        </form>
    </div>
}
```

Kedipan ikon hanya penarik perhatian; kalimat di banner yang membawa maknanya. Banner tidak punya tombol tutup selain "Tandai sudah dibaca", supaya siaran kritis tidak hilang tanpa disadari.

## Polling {#polling}

Hitungan di bel dijaga segar oleh skrip aplikasi, bukan `ds.js`. Spesifikasi dari TPS:

- Ambil data setiap 60 detik dan sekali lagi saat tab kembali terlihat. Hanya saat tab terlihat (`document.visibilityState === "visible"`); tab di latar belakang tidak memanggil server.
- `GET` ke endpoint JSON milik aplikasi (di contoh: `data-notif-url`) dengan balasan berbentuk seperti di bawah daftar ini.
- Jangan membangun ulang daftar saat panel terbuka: isinya tidak boleh bergeser di bawah kursor. Simpan balasan terbaru dan terapkan saat panel menutup.
- Sisipkan teks dengan `textContent`, bukan `innerHTML`. Judul dan pesan berasal dari operator platform dan diperlakukan sebagai tidak tepercaya. Batasi `tone` pada `error`, `warning`, `info` sebelum dijadikan nama kelas.
- Badge: tersembunyi di 0, `99+` di atas 99, dan `aria-label` ikut diperbarui.

Bentuk balasan:

```json
{
  "unread": 3,
  "items": [
    { "id": 12, "title": "Pemeliharaan terjadwal malam ini", "message": "Pengiriman ke Bea Cukai berhenti 22.00–23.30 WIB.", "time": "14.30 WIB", "category": "Pemeliharaan", "tone": "error", "read": false }
  ]
}
```

```js
const bell = document.querySelector("details.ds-notif[data-notif-url]");
if (bell) {
  const count = bell.querySelector(".ds-notif-count");
  const trigger = bell.querySelector(".ds-notif-trigger");
  const list = bell.querySelector(".ds-notif-list");
  const empty = bell.querySelector(".ds-notif-empty");
  const live = document.getElementById("notif-live");
  let last = Number(bell.dataset.unread);
  let pending = null;
  let timer = 0;

  const paintCount = (n) => {
    count.hidden = n <= 0;
    count.textContent = n > 99 ? "99+" : String(n);
    trigger.setAttribute("aria-label", `Notifikasi: ${n} belum dibaca`);
  };

  const paintList = (items) => {
    list?.replaceChildren(...items.map((n) => {
      const tone = n.tone === "error" || n.tone === "warning" ? n.tone : "info";
      const a = document.createElement("a");
      a.className = `ds-notif-item is-${tone}${n.read ? " is-read" : ""}`;
      a.href = `/Notifications#n-${encodeURIComponent(n.id)}`;
      const body = document.createElement("span");
      for (const [cls, text] of [["ds-notif-title", n.title], ["ds-notif-text", n.message], ["ds-notif-time", `${n.time} · ${n.category}`]]) {
        const line = document.createElement("span");
        line.className = cls;
        line.textContent = text;
        body.append(line);
      }
      const dot = document.createElement("span");
      dot.className = "ds-notif-dot";
      a.append(dot, body);
      const li = document.createElement("li");
      li.append(a);
      return li;
    }));
    if (empty) empty.hidden = items.length > 0;
  };

  const apply = (data) => {
    if (data.unread > last) live.textContent = `${data.unread - last} notifikasi baru`;
    last = data.unread;
    paintCount(data.unread);
    paintList(data.items);
  };

  async function poll() {
    if (document.visibilityState !== "visible") return;
    try {
      const res = await fetch(bell.dataset.notifUrl, { headers: { Accept: "application/json" }, credentials: "same-origin" });
      if (!res.ok) return;
      const data = await res.json();
      if (bell.open) pending = data; else apply(data);
    } catch { /* offline: coba lagi pada putaran berikutnya */ }
  }

  const start = (now) => { clearInterval(timer); timer = setInterval(poll, 60000); if (now) poll(); };
  bell.addEventListener("toggle", () => { if (!bell.open && pending) { apply(pending); pending = null; } });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") start(true); else clearInterval(timer);
  });
  start(false);
}
```

Kode di atas mengandaikan markup dari partial bel di atas dan satu wilayah live:

```html
<p id="notif-live" class="ds-visually-hidden" role="status" aria-live="polite"></p>
```

### Aksesibilitas

TPS belum mengumumkan perubahan hitungan: badge berubah diam-diam. Disarankan wilayah live sopan (`role="status"`, `aria-live="polite"`) yang hanya diisi saat jumlah naik ("2 notifikasi baru"), tidak saat turun atau saat halaman dimuat. Jangan memakai `aria-live="assertive"` atau `role="alert"` untuk polling; siaran kritis sudah punya banner.
