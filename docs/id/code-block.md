---
title: Code block
group: components
category: data-display
order: 16
summary: Kode dalam blok berbingkai dengan label bahasa, tombol salin, nomor baris opsional, baris tersorot dan diff, tombol bungkus, tinggi terlipat, serta kode inline.
source: TPS app.css .ds-code-block dan .ds-code-line (code.css), _XmlPreview
---

Code block menampilkan kode, perintah, payload, atau berkas konfigurasi yang dibaca dan disalin orang. Blok ini menggulir sendiri, mempertahankan spasi, dan menyalin teks yang persis sama. Pakai kode inline untuk nama pendek di dalam kalimat, dan [alert](./alert.md) atau [description list](./description-list.md) untuk nilai yang bukan kode. Blok bersifat baca-saja; untuk mengedit pakai textarea dengan `font-family: var(--ds-font-mono)`.

## Contoh

```html preview title="Bahasa, judul, dan tombol salin"
<figure class="ds-code">
  <div class="ds-code__bar">
    <span class="ds-code__lang">C#</span>
    <span class="ds-code__title">Program.cs</span>
    <div class="ds-code__actions">
      <button type="button" class="ds-code__btn ds-code__copy" data-ds-code-copy>
        <svg class="ds-icon is-rest-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><svg class="ds-icon is-copied-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg><svg class="ds-icon is-failed-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg>
        <span class="ds-code__label-rest">Salin</span><span class="ds-code__label-copied">Tersalin</span><span class="ds-code__label-failed">Gagal menyalin</span>
      </button>
    </div>
  </div>
  <pre class="ds-code-block" id="demo-code-1" tabindex="0"><code>var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages();

var app = builder.Build();
app.UseStaticFiles();
app.MapRazorPages();
app.Run();</code></pre>
</figure>
```

```html preview title="Nomor baris dan baris tersorot"
<figure class="ds-code">
  <div class="ds-code__bar"><span class="ds-code__lang">JSON</span><span class="ds-code__title">appsettings.json</span>
    <div class="ds-code__actions"><button type="button" class="ds-code__btn ds-code__copy" data-ds-code-copy><svg class="ds-icon is-rest-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><svg class="ds-icon is-copied-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg><svg class="ds-icon is-failed-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg><span class="ds-code__label-rest">Salin</span><span class="ds-code__label-copied">Tersalin</span><span class="ds-code__label-failed">Gagal menyalin</span></button></div>
  </div>
  <pre class="ds-code-block has-line-numbers" tabindex="0"><code><span class="ds-code-line">{</span>
<span class="ds-code-line">  "Localization": {</span>
<span class="ds-code-line" data-highlight>    "DefaultCulture": "id",</span>
<span class="ds-code-line" data-highlight>    "SupportedCultures": [ "en", "id" ]</span>
<span class="ds-code-line">  },</span>
<span class="ds-code-line">  "AllowedHosts": "*"</span>
<span class="ds-code-line">}</span></code></pre>
</figure>
```

```html preview title="Baris diff"
<figure class="ds-code">
  <div class="ds-code__bar"><span class="ds-code__lang">Diff</span><span class="ds-code__title">Pages/Invoices/Index.cshtml</span>
    <div class="ds-code__actions"><button type="button" class="ds-code__btn ds-code__copy" data-ds-code-copy><svg class="ds-icon is-rest-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><svg class="ds-icon is-copied-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg><svg class="ds-icon is-failed-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg><span class="ds-code__label-rest">Salin</span><span class="ds-code__label-copied">Tersalin</span><span class="ds-code__label-failed">Gagal menyalin</span></button></div>
  </div>
  <pre class="ds-code-block" tabindex="0"><code><span class="ds-code-line">&lt;table class="ds-table"&gt;</span>
<span class="ds-code-line" data-change="removed">  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Faktur&lt;/th&gt;&lt;th&gt;Jumlah&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;</span>
<span class="ds-code-line" data-change="added">  &lt;thead&gt;&lt;tr&gt;&lt;th scope="col"&gt;Faktur&lt;/th&gt;&lt;th scope="col" class="ds-num"&gt;Jumlah&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;</span>
<span class="ds-code-line">&lt;/table&gt;</span></code></pre>
</figure>
```

Salin tidak menyertakan baris yang dihapus, jadi teks yang tersalin adalah versi "sesudah".

```html preview title="Tombol bungkus dan tinggi terlipat"
<figure class="ds-code" data-ds-code-collapsible="9">
  <div class="ds-code__bar"><span class="ds-code__lang">Shell</span><span class="ds-code__title">deploy.sh</span>
    <div class="ds-code__actions">
      <button type="button" class="ds-code__btn" data-ds-code-wrap aria-pressed="false"><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-align-left"></use></svg>Bungkus baris</button>
      <button type="button" class="ds-code__btn ds-code__copy" data-ds-code-copy><svg class="ds-icon is-rest-icon" aria-hidden="true"><use href="#ds-icon-copy"></use></svg><svg class="ds-icon is-copied-icon" aria-hidden="true"><use href="#ds-icon-check"></use></svg><svg class="ds-icon is-failed-icon" aria-hidden="true"><use href="#ds-icon-x"></use></svg><span class="ds-code__label-rest">Salin</span><span class="ds-code__label-copied">Tersalin</span><span class="ds-code__label-failed">Gagal menyalin</span></button>
    </div>
  </div>
  <pre class="ds-code-block has-line-numbers" id="demo-code-4" tabindex="0"><code><span class="ds-code-line"><span class="ds-syntax-comment"># Bangun dan terbitkan situs</span></span>
<span class="ds-code-line">dotnet publish site/Citia.DesignSystem.Docs -c Release -o ./out --no-self-contained -p:UseAppHost=false</span>
<span class="ds-code-line"></span>
<span class="ds-code-line"><span class="ds-syntax-comment"># Salin ke server</span></span>
<span class="ds-code-line">scp -r ./out/* deploy@docs.kintara.example:/var/www/citia-docs/</span>
<span class="ds-code-line"></span>
<span class="ds-code-line"><span class="ds-syntax-comment"># Mulai ulang dan periksa</span></span>
<span class="ds-code-line">ssh deploy@docs.kintara.example "sudo systemctl restart citia-docs"</span>
<span class="ds-code-line">curl -s -o /dev/null -w "%{http_code}\n" https://docs.kintara.example/id/introduction</span>
<span class="ds-code-line"></span>
<span class="ds-code-line"><span class="ds-syntax-comment"># Kembalikan bila statusnya bukan 200</span></span>
<span class="ds-code-line">ssh deploy@docs.kintara.example "sudo systemctl stop citia-docs &amp;&amp; ./rollback.sh"</span></code></pre>
  <div class="ds-code__foot" hidden>
    <button type="button" class="ds-code__btn" data-ds-code-expand aria-expanded="false" aria-controls="demo-code-4"><span data-ds-code-expand-label>Tampilkan semua baris</span><svg class="ds-icon" aria-hidden="true"><use href="#ds-icon-chevron-down"></use></svg></button>
  </div>
</figure>
```

```html preview title="Blok polos, warna sintaks, dan kode inline"
<div style="display:grid;gap:1rem;max-width:40rem">
  <pre class="ds-code-block" tabindex="0"><code><span class="ds-syntax-tag">&lt;ds-kbd</span> <span class="ds-syntax-attr">keys</span>=<span class="ds-syntax-string">"Mod+K"</span> <span class="ds-syntax-tag">/&gt;</span>
<span class="ds-syntax-comment">&lt;!-- ⌘ K di Apple, Ctrl K di tempat lain --&gt;</span></code></pre>
  <p>Atur budaya dengan <code class="ds-code-inline">DsText.Language</code> atau kirim <code class="ds-code-inline">Accept-Language: id</code>; bawaannya <code class="ds-code-inline">en</code>.</p>
</div>
```

## State

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Bawaan | Permukaan `--color-base-200`, border 1px, mono 13px, tinggi baris 1,65 |
| Copy hover, pressed | Pointer di atas, `:active` | Tombol ghost mendapat state layer hover atau pressed; saat ditekan mengecil ke `--ds-press-scale` |
| Copy focus-visible | Keyboard | Cincin `--ds-focus` 2px |
| Copied | `data-state="copied"` selama 1,8 dtk setelah salin berhasil | Glyph centang dan "Tersalin" berwarna success; "Kode disalin ke papan klip" diumumkan |
| Copy failed | `data-state="failed"` selama 2,4 dtk | Glyph silang dan "Gagal menyalin" berwarna error; baris status menyuruh memilih kode lalu menekan Ctrl+C |
| Copy disabled | `disabled` atau `aria-disabled="true"` | `--ds-opacity-disabled`, tanpa pointer event |
| Wrap on | `aria-pressed="true"` pada tombol bungkus, `.is-wrapped` pada figure | Baris panjang dibungkus dengan indentasi menggantung di bawah nomor baris |
| Highlighted line | `data-highlight` | Warna primary dan tepi primary 3px |
| Added, removed line | `data-change="added/removed"` | Warna success atau error, tepi 3px, dan tanda `+` atau `−` bila tanpa nomor baris |
| Collapsed | `data-collapsed="true"` | Blok terpotong pada tinggi terlipatnya dengan bilah "Tampilkan semua N baris" |
| Expanded | `data-collapsed="false"` | Blok membesar selama 240ms (sampai batas gulir 48rem), tombol berbunyi "Tampilkan lebih sedikit" |
| Focus | `pre` punya `tabindex="0"` | Cincin 2px di dalam blok agar pengguna keyboard bisa menggulirnya |
| Empty | Tanpa kode | Jangan render blok |

## Anatomi

- `figure.ds-code` dengan `is-wrapped`, `data-ds-code-collapsible="<rem>"`, `data-collapsed`.
- `.ds-code__bar` dengan `.ds-code__lang`, `.ds-code__title`, `.ds-code__actions`; tombol `.ds-code__btn`, `.ds-code__copy` (dengan `.is-rest-icon`, `.is-copied-icon`, `.is-failed-icon`, dan tiga span `.ds-code__label-*`).
- `pre.ds-code-block` (dengan `has-line-numbers`) berisi `code` dan `span.ds-code-line` per baris.
- `.ds-code__foot` dengan tombol perluas; `.ds-code__status` (ditambah skrip, live region tersembunyi).
- Span sintaks `.ds-syntax-tag/attr/string/keyword/number/comment/prop/var`. Kode inline adalah `.ds-code-inline`.

## Penggunaan

- Sebut bahasanya di bilah dan nama berkas di judul bila kode itu milik sebuah berkas.
- Jaga baris di bawah 100 karakter atau sediakan tombol bungkus; utamakan 8 sampai 30 baris per blok dan lipat apa pun yang lebih tinggi dari 14rem.
- Taruh satu perintah per baris tanpa `$` di depan agar teks yang disalin bisa langsung dijalankan. Taruh keluaran di blok terpisah tanpa tombol salin.
- Sorot 1 sampai 3 baris yang penting. Pakai baris diff untuk sebelum dan sesudah, dengan baris yang dihapus lebih dulu.
- Pakai `.ds-code-inline` untuk nama di dalam kalimat; jangan menaruh tautan di dalam blok kode.
- Jangan menampilkan rahasia, token, atau data pelanggan sungguhan dalam contoh.
- Jangan mengandalkan warna saja untuk makna sintaks; komentar dicetak miring dan baris diff membawa tanda dan tepi.

## Aksesibilitas

- Blok adalah `figure`; teks di bilah menamainya. `pre` bisa difokuskan agar pengguna keyboard dapat menggulir kode yang panjang atau lebar.
- Tombol punya teks terlihat (Salin, Bungkus baris, Tampilkan semua N baris); tombol perluas membawa `aria-expanded` dan `aria-controls`.
- Hasil salin diumumkan di region `role="status"` tersembunyi, bukan lewat toast, sehingga halaman tetap tenang.
- Warna sintaks memakai token DS dan menjaga 4,5:1 pada permukaan blok di kedua tema. Baris sorot dan diff juga punya tepi 3px; warna paksa memakai `Highlight`.
- Nomor baris berasal dari counter CSS, jadi tidak ikut terpilih atau tersalin dan tidak dibacakan pembaca layar.
- Tombol setinggi 32px (44px dengan pointer kasar). Reduced motion menghapus animasi perluasan dan efek muncul pada centang.

| Tombol | Aksi |
| --- | --- |
| Tab | Berpindah ke tombol, lalu ke kode (untuk menggulirnya) |
| Tombol panah, Page Up, Page Down | Menggulir kode yang fokus |
| Enter, Space | Mengaktifkan tombol yang fokus |

## Razor

```cshtml
<ds-code-block language="csharp" title="Program.cs" line-numbers highlight="2,4-5" wrap-toggle collapsible="14"
               code="@Model.Snippet" />

<ds-code-block language="bash">
dotnet add package Citia.DesignSystem
</ds-code-block>
```

Pakai `code` untuk teks dinamis. Isi tag diambil apa adanya seperti tertulis di view (dihapus indentasinya, di-encode sekali), jadi cocok untuk cuplikan statis tanpa ekspresi `@`. Atribut: `language`, `title`, `code`, `line-numbers`, `highlight` (`2,4-6`), `diff` (juga tersirat dari `language="diff"`: baris yang diawali `+` atau `-` menjadi ditambah dan dihapus, dan karakter pertamanya dibuang), `wrap` (mulai dalam keadaan terbungkus), `wrap-toggle`, `collapsible` (rem), `no-copy`, `pre-id`. Tag helper tidak mewarnai sintaks.

## JavaScript

| Atribut | Efek |
| --- | --- |
| `[data-ds-code-copy]` | Menyalin teks `pre` milik figure, tanpa baris diff yang dihapus dan elemen `.ds-code-skip`, lalu mengatur `data-state` menjadi `copied` atau `failed` |
| `[data-ds-code-wrap]` | Membalik `.is-wrapped` pada figure dan `aria-pressed` pada tombol |
| `figure[data-ds-code-collapsible="14"]` | Mengukur saat dimuat; bila kode lebih tinggi dari batas, mengatur `data-collapsed` dan menampilkan footer |
| `[data-ds-code-expand]`, `[data-ds-code-expand-label]` | Tombol perluas dan perkecil beserta labelnya |

Tombol `[data-ds-copy="#selector"]` lama dari `forms.js` tetap bekerja dan menampilkan toast; code block memakai `data-ds-code-copy` agar bisa menampilkan status tersalin dan gagal di tempat. Tanpa skrip, blok menampilkan semua kodenya dan tombol tidak berbuat apa-apa, jadi hilangkan tombol di bilah bila Anda merender blok tanpa skrip DS.

## Token

`--ds-font-mono`, `--color-base-200`, `--color-base-300`, `--ds-radius-box`, `--ds-radius-md`, `--ds-syntax-tag`, `--ds-syntax-attr`, `--ds-success-text`, `--ds-quiet`, `--ds-link`, `--ds-warning-text`, `--color-primary`, `--color-success`, `--color-error`, `--ds-code-collapsed`, `--ds-code-gutter`, `--ds-duration-layout`, `--ds-duration-quick`, `--ds-press-scale`.

## Native dan daisyUI

Dibangun di atas `figure`, `pre`, dan `code`. daisyUI `mockup-code` tidak dipakai; ia menirukan terminal dengan awalan prompt dan tidak punya status salin, nomor baris, atau baris diff.
