---
title: Chart
group: components
category: data-display
order: 18
summary: Grafik SVG yang dirender di server (batang, batang bertumpuk, garis, area, donat, sparkline) dengan token, titik data yang bisa difokus, tooltip, dan tabel alternatif.
source: TPS app.css L3605–3630, Helpers/Charts.cs
---

Chart adalah SVG biasa yang ditulis di server: tanpa pustaka grafik, tanpa gambar di sisi klien, dan markup yang sama tercetak serta berfungsi tanpa JavaScript. Pakai chart saat bentuk data lebih penting daripada angka pastinya (tren, perbandingan, porsi). Pakai [table](./table.md) saat pembaca mencari nilai, dan [stat](./stat.md) untuk satu angka. Chart tidak pernah menjadi satu-satunya tempat sebuah angka muncul: setiap chart membawa ringkasan teks, titik data yang bisa difokus dengan tooltip, dan data yang sama dalam bentuk tabel.

## Contoh

### Bar chart

Satu seri, satu warna. Tooltip berada di pita di atas plot, jadi tidak pernah menutupi batang. Arahkan kursor atau fokuskan satu kolom untuk membacanya; garis pemandu menandai kategori.

```html preview title="Grafik batang dengan sumbu, grid, dan tooltip"
<figure class="ds-chart-frame">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Faktur terbayar per minggu</h3><p class="ds-chart-frame__desc">Minggu 41 sampai 45, 2026</p></figcaption>
  <div class="ds-chart-frame__plot">
<svg class="ds-chart" viewBox="0 0 420 232" role="group" aria-label="Grafik batang, faktur terbayar per minggu, minggu 41 sampai 45 tahun 2026: 18, 26, 22, 34, dan 29. Minggu 44 tertinggi dengan 34."><line class="ds-axis-line" x1="40" x2="412" y1="182" y2="182"/><text x="34" y="185.5" text-anchor="end">0</text><line class="ds-grid-line" x1="40" x2="412" y1="151" y2="151"/><text x="34" y="154.5" text-anchor="end">10</text><line class="ds-grid-line" x1="40" x2="412" y1="120" y2="120"/><text x="34" y="123.5" text-anchor="end">20</text><line class="ds-grid-line" x1="40" x2="412" y1="89" y2="89"/><text x="34" y="92.5" text-anchor="end">30</text><line class="ds-grid-line" x1="40" x2="412" y1="58" y2="58"/><text x="34" y="61.5" text-anchor="end">40</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Minggu 41: 18 faktur"><rect class="ds-chart__hit" x="42" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="77.2" x2="77.2" y1="50" y2="182"/><rect class="ds-bar s-1" x="57.2" y="126.2" width="40" height="55.8" rx="2"/><g class="ds-chart__tip"><rect x="38.75" y="2" width="76.9" height="42" rx="6"/><text class="is-title" x="48.75" y="19">Minggu 41</text><text class="" x="48.75" y="34">18 faktur</text></g></g><text x="77.2" y="199" text-anchor="middle">M41</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Minggu 42: 26 faktur"><rect class="ds-chart__hit" x="116.4" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="151.6" x2="151.6" y1="50" y2="182"/><rect class="ds-bar s-1" x="131.6" y="101.4" width="40" height="80.6" rx="2"/><g class="ds-chart__tip"><rect x="113.15" y="2" width="76.9" height="42" rx="6"/><text class="is-title" x="123.15" y="19">Minggu 42</text><text class="" x="123.15" y="34">26 faktur</text></g></g><text x="151.6" y="199" text-anchor="middle">M42</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Minggu 43: 22 faktur"><rect class="ds-chart__hit" x="190.8" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="226" x2="226" y1="50" y2="182"/><rect class="ds-bar s-1" x="206" y="113.8" width="40" height="68.2" rx="2"/><g class="ds-chart__tip"><rect x="187.55" y="2" width="76.9" height="42" rx="6"/><text class="is-title" x="197.55" y="19">Minggu 43</text><text class="" x="197.55" y="34">22 faktur</text></g></g><text x="226" y="199" text-anchor="middle">M43</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Minggu 44: 34 faktur"><rect class="ds-chart__hit" x="265.2" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="300.4" x2="300.4" y1="50" y2="182"/><rect class="ds-bar s-1" x="280.4" y="76.6" width="40" height="105.4" rx="2"/><g class="ds-chart__tip"><rect x="261.95" y="2" width="76.9" height="42" rx="6"/><text class="is-title" x="271.95" y="19">Minggu 44</text><text class="" x="271.95" y="34">34 faktur</text></g></g><text x="300.4" y="199" text-anchor="middle">M44</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Minggu 45: 29 faktur"><rect class="ds-chart__hit" x="339.6" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="374.8" x2="374.8" y1="50" y2="182"/><rect class="ds-bar s-1" x="354.8" y="92.1" width="40" height="89.9" rx="2"/><g class="ds-chart__tip"><rect x="336.35" y="2" width="76.9" height="42" rx="6"/><text class="is-title" x="346.35" y="19">Minggu 45</text><text class="" x="346.35" y="34">29 faktur</text></g></g><text x="374.8" y="199" text-anchor="middle">M45</text></svg>
  </div>

  <details class="ds-chart-frame__data"><summary>Lihat data sebagai tabel</summary>
<table class="ds-chart-table"><caption>Faktur terbayar per minggu</caption><thead><tr><th scope="col">Minggu</th><th scope="col">Faktur</th></tr></thead><tbody><tr><th scope="row">Minggu 41</th><td>18</td></tr><tr><th scope="row">Minggu 42</th><td>26</td></tr><tr><th scope="row">Minggu 43</th><td>22</td></tr><tr><th scope="row">Minggu 44</th><td>34</td></tr><tr><th scope="row">Minggu 45</th><td>29</td></tr></tbody></table>
  </details>
</figure>
```

### Stacked bar chart

Seri ditumpuk dalam urutan tetap, terbesar di bawah. Tooltip mencantumkan tiap segmen dan totalnya. Beri nama seri di legend; warnanya berulang di seluruh halaman.

```html preview title="Grafik batang bertumpuk dengan legend"
<figure class="ds-chart-frame">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Tiket dukungan per kanal</h3><p class="ds-chart-frame__desc">Senin sampai Jumat, 26 sampai 30 Oktober 2026</p></figcaption>
  <div class="ds-chart-frame__plot">
<svg class="ds-chart" viewBox="0 0 420 232" role="group" aria-label="Grafik batang bertumpuk, tiket dukungan per kanal, Senin sampai Jumat: total 40, 46, 38, 52, dan 44 tiket. Email adalah kanal terbesar setiap hari."><line class="ds-axis-line" x1="40" x2="412" y1="182" y2="182"/><text x="34" y="185.5" text-anchor="end">0</text><line class="ds-grid-line" x1="40" x2="412" y1="140.67" y2="140.67"/><text x="34" y="144.17" text-anchor="end">20</text><line class="ds-grid-line" x1="40" x2="412" y1="99.33" y2="99.33"/><text x="34" y="102.83" text-anchor="end">40</text><line class="ds-grid-line" x1="40" x2="412" y1="58" y2="58"/><text x="34" y="61.5" text-anchor="end">60</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Sen: 22 email, 12 chat, 6 telepon"><rect class="ds-chart__hit" x="42" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="77.2" x2="77.2" y1="50" y2="182"/><rect class="ds-bar s-1" x="57.2" y="136.53" width="40" height="44.47"/><rect class="ds-bar s-2" x="57.2" y="111.73" width="40" height="23.8"/><rect class="ds-bar s-3" x="57.2" y="99.33" width="40" height="11.4"/><g class="ds-chart__tip"><rect x="35.7" y="2" width="83" height="87" rx="6"/><text class="is-title" x="45.7" y="19">Sen</text><text class="" x="45.7" y="34">Email: 22</text><text class="" x="45.7" y="49">Chat: 12</text><text class="" x="45.7" y="64">Telepon: 6</text><text class="" x="45.7" y="79">Total: 40</text></g></g><text x="77.2" y="199" text-anchor="middle">Sen</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Sel: 24 email, 14 chat, 8 telepon"><rect class="ds-chart__hit" x="116.4" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="151.6" x2="151.6" y1="50" y2="182"/><rect class="ds-bar s-1" x="131.6" y="132.4" width="40" height="48.6"/><rect class="ds-bar s-2" x="131.6" y="103.47" width="40" height="27.93"/><rect class="ds-bar s-3" x="131.6" y="86.93" width="40" height="15.53"/><g class="ds-chart__tip"><rect x="110.1" y="2" width="83" height="87" rx="6"/><text class="is-title" x="120.1" y="19">Sel</text><text class="" x="120.1" y="34">Email: 24</text><text class="" x="120.1" y="49">Chat: 14</text><text class="" x="120.1" y="64">Telepon: 8</text><text class="" x="120.1" y="79">Total: 46</text></g></g><text x="151.6" y="199" text-anchor="middle">Sel</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Rab: 20 email, 11 chat, 7 telepon"><rect class="ds-chart__hit" x="190.8" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="226" x2="226" y1="50" y2="182"/><rect class="ds-bar s-1" x="206" y="140.67" width="40" height="40.33"/><rect class="ds-bar s-2" x="206" y="117.93" width="40" height="21.73"/><rect class="ds-bar s-3" x="206" y="103.47" width="40" height="13.47"/><g class="ds-chart__tip"><rect x="184.5" y="2" width="83" height="87" rx="6"/><text class="is-title" x="194.5" y="19">Rab</text><text class="" x="194.5" y="34">Email: 20</text><text class="" x="194.5" y="49">Chat: 11</text><text class="" x="194.5" y="64">Telepon: 7</text><text class="" x="194.5" y="79">Total: 38</text></g></g><text x="226" y="199" text-anchor="middle">Rab</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Kam: 28 email, 15 chat, 9 telepon"><rect class="ds-chart__hit" x="265.2" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="300.4" x2="300.4" y1="50" y2="182"/><rect class="ds-bar s-1" x="280.4" y="124.13" width="40" height="56.87"/><rect class="ds-bar s-2" x="280.4" y="93.13" width="40" height="30"/><rect class="ds-bar s-3" x="280.4" y="74.53" width="40" height="17.6"/><g class="ds-chart__tip"><rect x="258.9" y="2" width="83" height="87" rx="6"/><text class="is-title" x="268.9" y="19">Kam</text><text class="" x="268.9" y="34">Email: 28</text><text class="" x="268.9" y="49">Chat: 15</text><text class="" x="268.9" y="64">Telepon: 9</text><text class="" x="268.9" y="79">Total: 52</text></g></g><text x="300.4" y="199" text-anchor="middle">Kam</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Jum: 23 email, 13 chat, 8 telepon"><rect class="ds-chart__hit" x="339.6" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="374.8" x2="374.8" y1="50" y2="182"/><rect class="ds-bar s-1" x="354.8" y="134.47" width="40" height="46.53"/><rect class="ds-bar s-2" x="354.8" y="107.6" width="40" height="25.87"/><rect class="ds-bar s-3" x="354.8" y="91.07" width="40" height="15.53"/><g class="ds-chart__tip"><rect x="333" y="2" width="83" height="87" rx="6"/><text class="is-title" x="343" y="19">Jum</text><text class="" x="343" y="34">Email: 23</text><text class="" x="343" y="49">Chat: 13</text><text class="" x="343" y="64">Telepon: 8</text><text class="" x="343" y="79">Total: 44</text></g></g><text x="374.8" y="199" text-anchor="middle">Jum</text></svg>
  </div>
  <ul class="ds-legend"><li class="s-1"><i></i>Email</li><li class="s-2"><i></i>Chat</li><li class="s-3"><i></i>Telepon</li></ul>
  <details class="ds-chart-frame__data"><summary>Lihat data sebagai tabel</summary>
<table class="ds-chart-table"><caption>Tiket dukungan per kanal</caption><thead><tr><th scope="col">Hari</th><th scope="col">Email</th><th scope="col">Chat</th><th scope="col">Telepon</th><th scope="col">Total</th></tr></thead><tbody><tr><th scope="row">Sen</th><td>22</td><td>12</td><td>6</td><td>40</td></tr><tr><th scope="row">Sel</th><td>24</td><td>14</td><td>8</td><td>46</td></tr><tr><th scope="row">Rab</th><td>20</td><td>11</td><td>7</td><td>38</td></tr><tr><th scope="row">Kam</th><td>28</td><td>15</td><td>9</td><td>52</td></tr><tr><th scope="row">Jum</th><td>23</td><td>13</td><td>8</td><td>44</td></tr></tbody></table>
  </details>
</figure>
```

### Line chart

Pakai garis untuk perubahan dari waktu ke waktu. Dua seri dibedakan oleh warna dan pola putus-putus, sehingga perbandingan tetap terbaca dalam skala abu-abu dan bagi yang buta warna. Batasi sampai empat seri; lebih dari itu, pecah grafiknya.

```html preview title="Grafik garis, dua seri"
<figure class="ds-chart-frame">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Pengguna aktif per bulan</h3><p class="ds-chart-frame__desc">Tahun ini dibanding tahun lalu, dalam ribuan</p></figcaption>
  <div class="ds-chart-frame__plot">
<svg class="ds-chart" viewBox="0 0 420 232" role="group" aria-label="Grafik garis, pengguna aktif per bulan dalam ribuan, Mei sampai Oktober. Tahun ini naik dari 12,4 ke 21,8; tahun lalu naik dari 10,1 ke 15,9."><line class="ds-axis-line" x1="40" x2="412" y1="182" y2="182"/><text x="34" y="185.5" text-anchor="end">0</text><line class="ds-grid-line" x1="40" x2="412" y1="157.2" y2="157.2"/><text x="34" y="160.7" text-anchor="end">5</text><line class="ds-grid-line" x1="40" x2="412" y1="132.4" y2="132.4"/><text x="34" y="135.9" text-anchor="end">10</text><line class="ds-grid-line" x1="40" x2="412" y1="107.6" y2="107.6"/><text x="34" y="111.1" text-anchor="end">15</text><line class="ds-grid-line" x1="40" x2="412" y1="82.8" y2="82.8"/><text x="34" y="86.3" text-anchor="end">20</text><line class="ds-grid-line" x1="40" x2="412" y1="58" y2="58"/><text x="34" y="61.5" text-anchor="end">25</text><path class="ds-line s-1" d="M54 120.5 L122.8 112.06 L191.6 103.14 L260.4 93.71 L329.2 81.81 L398 73.87"/><path class="ds-line s-2" d="M54 131.9 L122.8 126.45 L191.6 120.5 L260.4 114.54 L329.2 108.59 L398 103.14" stroke-dasharray="5 4"/><g class="ds-chart__point" tabindex="0" role="img" aria-label="Mei: 2026 12.4, 2025 10.1"><rect class="ds-chart__hit" x="19.6" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="54" x2="54" y1="50" y2="182"/><circle class="ds-dot s-1" cx="54" cy="120.5" r="3.5"/><circle class="ds-dot s-2" cx="54" cy="131.9" r="3.5"/><g class="ds-chart__tip"><rect x="12.5" y="2" width="83" height="57" rx="6"/><text class="is-title" x="22.5" y="19">Mei</text><text class="" x="22.5" y="34">2026: 12.4</text><text class="" x="22.5" y="49">2025: 10.1</text></g></g><text x="54" y="199" text-anchor="middle">Mei</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Jun: 2026 14.1, 2025 11.2"><rect class="ds-chart__hit" x="88.4" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="122.8" x2="122.8" y1="50" y2="182"/><circle class="ds-dot s-1" cx="122.8" cy="112.06" r="3.5"/><circle class="ds-dot s-2" cx="122.8" cy="126.45" r="3.5"/><g class="ds-chart__tip"><rect x="81.3" y="2" width="83" height="57" rx="6"/><text class="is-title" x="91.3" y="19">Jun</text><text class="" x="91.3" y="34">2026: 14.1</text><text class="" x="91.3" y="49">2025: 11.2</text></g></g><text x="122.8" y="199" text-anchor="middle">Jun</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Jul: 2026 15.9, 2025 12.4"><rect class="ds-chart__hit" x="157.2" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="191.6" x2="191.6" y1="50" y2="182"/><circle class="ds-dot s-1" cx="191.6" cy="103.14" r="3.5"/><circle class="ds-dot s-2" cx="191.6" cy="120.5" r="3.5"/><g class="ds-chart__tip"><rect x="150.1" y="2" width="83" height="57" rx="6"/><text class="is-title" x="160.1" y="19">Jul</text><text class="" x="160.1" y="34">2026: 15.9</text><text class="" x="160.1" y="49">2025: 12.4</text></g></g><text x="191.6" y="199" text-anchor="middle">Jul</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Agu: 2026 17.8, 2025 13.6"><rect class="ds-chart__hit" x="226" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="260.4" x2="260.4" y1="50" y2="182"/><circle class="ds-dot s-1" cx="260.4" cy="93.71" r="3.5"/><circle class="ds-dot s-2" cx="260.4" cy="114.54" r="3.5"/><g class="ds-chart__tip"><rect x="218.9" y="2" width="83" height="57" rx="6"/><text class="is-title" x="228.9" y="19">Agu</text><text class="" x="228.9" y="34">2026: 17.8</text><text class="" x="228.9" y="49">2025: 13.6</text></g></g><text x="260.4" y="199" text-anchor="middle">Agu</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Sep: 2026 20.2, 2025 14.8"><rect class="ds-chart__hit" x="294.8" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="329.2" x2="329.2" y1="50" y2="182"/><circle class="ds-dot s-1" cx="329.2" cy="81.81" r="3.5"/><circle class="ds-dot s-2" cx="329.2" cy="108.59" r="3.5"/><g class="ds-chart__tip"><rect x="287.7" y="2" width="83" height="57" rx="6"/><text class="is-title" x="297.7" y="19">Sep</text><text class="" x="297.7" y="34">2026: 20.2</text><text class="" x="297.7" y="49">2025: 14.8</text></g></g><text x="329.2" y="199" text-anchor="middle">Sep</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Okt: 2026 21.8, 2025 15.9"><rect class="ds-chart__hit" x="363.6" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="398" x2="398" y1="50" y2="182"/><circle class="ds-dot s-1" cx="398" cy="73.87" r="3.5"/><circle class="ds-dot s-2" cx="398" cy="103.14" r="3.5"/><g class="ds-chart__tip"><rect x="333" y="2" width="83" height="57" rx="6"/><text class="is-title" x="343" y="19">Okt</text><text class="" x="343" y="34">2026: 21.8</text><text class="" x="343" y="49">2025: 15.9</text></g></g><text x="398" y="199" text-anchor="middle">Okt</text></svg>
  </div>
  <ul class="ds-legend"><li class="s-1"><i class="is-line"></i>2026</li><li class="s-2"><i class="is-line is-dashed"></i>2025</li></ul>
  <details class="ds-chart-frame__data"><summary>Lihat data sebagai tabel</summary>
<table class="ds-chart-table"><caption>Pengguna aktif per bulan</caption><thead><tr><th scope="col">Bulan</th><th scope="col">2026</th><th scope="col">2025</th></tr></thead><tbody><tr><th scope="row">Mei</th><td>12.4</td><td>10.1</td></tr><tr><th scope="row">Jun</th><td>14.1</td><td>11.2</td></tr><tr><th scope="row">Jul</th><td>15.9</td><td>12.4</td></tr><tr><th scope="row">Agu</th><td>17.8</td><td>13.6</td></tr><tr><th scope="row">Sep</th><td>20.2</td><td>14.8</td></tr><tr><th scope="row">Okt</th><td>21.8</td><td>15.9</td></tr></tbody></table>
  </details>
</figure>
```

### Area chart

Area menambah bobot pada satu seri kumulatif. Jangan menumpuk lebih dari dua area: area di bawah menyembunyikan bentuk area di atasnya.

```html preview title="Grafik area"
<figure class="ds-chart-frame">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Penyimpanan terpakai</h3><p class="ds-chart-frame__desc">Gigabita pada akhir bulan, Mei sampai Oktober 2026</p></figcaption>
  <div class="ds-chart-frame__plot">
<svg class="ds-chart" viewBox="0 0 420 232" role="group" aria-label="Grafik area, penyimpanan terpakai dalam gigabita pada akhir bulan: 120, 148, 171, 190, 236, dan 262. Pemakaian bertambah 142 GB dalam enam bulan."><line class="ds-axis-line" x1="40" x2="412" y1="182" y2="182"/><text x="34" y="185.5" text-anchor="end">0</text><line class="ds-grid-line" x1="40" x2="412" y1="140.67" y2="140.67"/><text x="34" y="144.17" text-anchor="end">100</text><line class="ds-grid-line" x1="40" x2="412" y1="99.33" y2="99.33"/><text x="34" y="102.83" text-anchor="end">200</text><line class="ds-grid-line" x1="40" x2="412" y1="58" y2="58"/><text x="34" y="61.5" text-anchor="end">300</text><path class="ds-area s-1" d="M54 132.4 L122.8 120.83 L191.6 111.32 L260.4 103.47 L329.2 84.45 L398 73.71 L398 182 L54 182 Z"/><path class="ds-line s-1" d="M54 132.4 L122.8 120.83 L191.6 111.32 L260.4 103.47 L329.2 84.45 L398 73.71"/><g class="ds-chart__point" tabindex="0" role="img" aria-label="Mei: Penyimpanan (GB) 120"><rect class="ds-chart__hit" x="19.6" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="54" x2="54" y1="50" y2="182"/><circle class="ds-dot s-1" cx="54" cy="132.4" r="3.5"/><g class="ds-chart__tip"><rect x="2" y="2" width="150.1" height="42" rx="6"/><text class="is-title" x="12" y="19">Mei</text><text class="" x="12" y="34">Penyimpanan (GB): 120</text></g></g><text x="54" y="199" text-anchor="middle">Mei</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Jun: Penyimpanan (GB) 148"><rect class="ds-chart__hit" x="88.4" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="122.8" x2="122.8" y1="50" y2="182"/><circle class="ds-dot s-1" cx="122.8" cy="120.83" r="3.5"/><g class="ds-chart__tip"><rect x="47.75" y="2" width="150.1" height="42" rx="6"/><text class="is-title" x="57.75" y="19">Jun</text><text class="" x="57.75" y="34">Penyimpanan (GB): 148</text></g></g><text x="122.8" y="199" text-anchor="middle">Jun</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Jul: Penyimpanan (GB) 171"><rect class="ds-chart__hit" x="157.2" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="191.6" x2="191.6" y1="50" y2="182"/><circle class="ds-dot s-1" cx="191.6" cy="111.32" r="3.5"/><g class="ds-chart__tip"><rect x="116.55" y="2" width="150.1" height="42" rx="6"/><text class="is-title" x="126.55" y="19">Jul</text><text class="" x="126.55" y="34">Penyimpanan (GB): 171</text></g></g><text x="191.6" y="199" text-anchor="middle">Jul</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Agu: Penyimpanan (GB) 190"><rect class="ds-chart__hit" x="226" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="260.4" x2="260.4" y1="50" y2="182"/><circle class="ds-dot s-1" cx="260.4" cy="103.47" r="3.5"/><g class="ds-chart__tip"><rect x="185.35" y="2" width="150.1" height="42" rx="6"/><text class="is-title" x="195.35" y="19">Agu</text><text class="" x="195.35" y="34">Penyimpanan (GB): 190</text></g></g><text x="260.4" y="199" text-anchor="middle">Agu</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Sep: Penyimpanan (GB) 236"><rect class="ds-chart__hit" x="294.8" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="329.2" x2="329.2" y1="50" y2="182"/><circle class="ds-dot s-1" cx="329.2" cy="84.45" r="3.5"/><g class="ds-chart__tip"><rect x="254.15" y="2" width="150.1" height="42" rx="6"/><text class="is-title" x="264.15" y="19">Sep</text><text class="" x="264.15" y="34">Penyimpanan (GB): 236</text></g></g><text x="329.2" y="199" text-anchor="middle">Sep</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Okt: Penyimpanan (GB) 262"><rect class="ds-chart__hit" x="363.6" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="398" x2="398" y1="50" y2="182"/><circle class="ds-dot s-1" cx="398" cy="73.71" r="3.5"/><g class="ds-chart__tip"><rect x="265.9" y="2" width="150.1" height="42" rx="6"/><text class="is-title" x="275.9" y="19">Okt</text><text class="" x="275.9" y="34">Penyimpanan (GB): 262</text></g></g><text x="398" y="199" text-anchor="middle">Okt</text></svg>
  </div>

  <details class="ds-chart-frame__data"><summary>Lihat data sebagai tabel</summary>
<table class="ds-chart-table"><caption>Penyimpanan terpakai</caption><thead><tr><th scope="col">Bulan</th><th scope="col">Penyimpanan (GB)</th></tr></thead><tbody><tr><th scope="row">Mei</th><td>120</td></tr><tr><th scope="row">Jun</th><td>148</td></tr><tr><th scope="row">Jul</th><td>171</td></tr><tr><th scope="row">Agu</th><td>190</td></tr><tr><th scope="row">Sep</th><td>236</td></tr><tr><th scope="row">Okt</th><td>262</td></tr></tbody></table>
  </details>
</figure>
```

### Donut

Donat menunjukkan bagian dari keseluruhan dengan paling banyak lima segmen. Daftar di sebelahnya memuat angkanya, jadi cincin hanyalah ringkasan, bukan satu-satunya sumber. Segmen bisa difokus dan punya tooltip `<title>` bawaan.

```html preview title="Donat dengan daftar"
<div class="ds-donut">
  <svg class="ds-donut__plot" viewBox="0 0 120 120" role="group" aria-label="Grafik donat, 100 tiket menurut prioritas: 18 tinggi, 46 sedang, 36 rendah."><circle class="ds-donut-track" cx="60" cy="60" r="42"/><g transform="rotate(-90 60 60)"><circle class="s-1" cx="60" cy="60" r="42" stroke-dasharray="46 263.89" stroke-dashoffset="0" tabindex="0" role="img" aria-label="Tinggi: 18 tiket (18%)"><title>Tinggi: 18</title></circle><circle class="s-2" cx="60" cy="60" r="42" stroke-dasharray="119.89 263.89" stroke-dashoffset="-47.5" tabindex="0" role="img" aria-label="Sedang: 46 tiket (46%)"><title>Sedang: 46</title></circle><circle class="s-3" cx="60" cy="60" r="42" stroke-dasharray="93.5 263.89" stroke-dashoffset="-168.89" tabindex="0" role="img" aria-label="Rendah: 36 tiket (36%)"><title>Rendah: 36</title></circle></g><text class="ds-donut-center" x="60" y="62" text-anchor="middle">100</text><text class="ds-donut-caption" x="60" y="76" text-anchor="middle">tiket</text></svg>
  <ul>
    <li class="s-1"><i></i><span>Tinggi</span><strong>18</strong></li>
    <li class="s-2"><i></i><span>Sedang</span><strong>46</strong></li>
    <li class="s-3"><i></i><span>Rendah</span><strong>36</strong></li>
  </ul>
</div>
```

### Sparkline

Sparkline adalah tren tanpa sumbu, berukuran pas untuk satu baris teks, sel tabel, atau kartu. Labelnya menyebut awal, akhir, dan arahnya.

```html preview title="Sparkline dalam daftar"
<dl class="ds-kv">
  <dt>Pesanan</dt><dd>21 <svg class="ds-sparkline" viewBox="0 0 96 24" role="img" aria-label="Pesanan, 7 hari terakhir: dari 12 ke 21, naik" focusable="false"><path class="ds-area" d="M2 21 L17.33 17 L32.67 19 L48 15 L63.33 9 L78.67 11 L94 3 L94 24 L2 24 Z"/><path class="ds-line" d="M2 21 L17.33 17 L32.67 19 L48 15 L63.33 9 L78.67 11 L94 3"/><circle class="ds-dot" cx="94" cy="3" r="2.5"/></svg></dd>
  <dt>Pengembalian dana</dt><dd>4 <svg class="ds-sparkline is-warning" viewBox="0 0 96 24" role="img" aria-label="Pengembalian dana, 7 hari terakhir: dari 9 ke 4, turun" focusable="false"><path class="ds-area" d="M2 3 L17.33 6.6 L32.67 3 L48 10.2 L63.33 13.8 L78.67 17.4 L94 21 L94 24 L2 24 Z"/><path class="ds-line" d="M2 3 L17.33 6.6 L32.67 3 L48 10.2 L63.33 13.8 L78.67 17.4 L94 21"/><circle class="ds-dot" cx="94" cy="21" r="2.5"/></svg></dd>
</dl>
```

### Palette

Warna seri adalah `--ds-chart-1` sampai `--ds-chart-8`. Seri 1 adalah teal merek. Pakai seri berurutan dan jangan memberi makna pada warna saja (warna status seperti merah untuk "gagal" milik status, bukan seri).

```html preview title="Palet kategorikal"
<ul class="ds-legend">
  <li class="s-1"><i></i>1</li><li class="s-2"><i></i>2</li><li class="s-3"><i></i>3</li><li class="s-4"><i></i>4</li>
  <li class="s-5"><i></i>5</li><li class="s-6"><i></i>6</li><li class="s-7"><i></i>7</li><li class="s-8"><i></i>8</li>
</ul>
```

## State

Frame chart punya empat state. Pasang `data-state` pada `<figure>`: plot disembunyikan, pesan state menggantikannya, dan tinggi frame tetap sehingga tidak ada yang melompat. Loading baru muncul setelah sekitar 300 ms; pakai `ds-delayed` pada elemen state.

```html preview title="Loading, kosong, dan galat"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))">
<figure class="ds-chart-frame" data-state="loading" aria-busy="true">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Faktur terbayar per minggu</h3><p class="ds-chart-frame__desc">Minggu 41 sampai 45, 2026</p></figcaption>
  <div class="ds-chart-frame__plot">
    <svg class="ds-chart" viewBox="0 0 420 232" aria-hidden="true"></svg>
    <div class="ds-chart-state is-loading" role="status"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><p class="ds-visually-hidden">Memuat grafik…</p></div>
  </div>
</figure>
<figure class="ds-chart-frame" data-state="empty">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Faktur terbayar per minggu</h3><p class="ds-chart-frame__desc">Minggu 41 sampai 45, 2026</p></figcaption>
  <div class="ds-chart-frame__plot">
    <svg class="ds-chart" viewBox="0 0 420 232" aria-hidden="true"></svg>
    <div class="ds-chart-state"><strong>Belum ada data untuk grafik</strong><span>Faktur terbayar tampil di sini setelah pembayaran pertama.</span></div>
  </div>
</figure>
<figure class="ds-chart-frame" data-state="error">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Faktur terbayar per minggu</h3><p class="ds-chart-frame__desc">Minggu 41 sampai 45, 2026</p></figcaption>
  <div class="ds-chart-frame__plot">
    <svg class="ds-chart" viewBox="0 0 420 232" aria-hidden="true"></svg>
    <div class="ds-chart-state is-error" role="alert"><strong>Grafik tidak dapat dimuat</strong><span>Periksa koneksi lalu coba lagi.</span><button type="button" class="btn btn-sm">Coba lagi</button></div>
  </div>
</figure>
</div>
```

| State | Pemicu | Tampilan |
| --- | --- | --- |
| Rest | Data tersedia | Plot, legend, disclosure tabel |
| Hover | Kursor di atas kolom atau segmen (`@media (hover: hover)`) | Kolom diberi tint 6%, garis pemandu dan tooltip muncul dalam 150 ms |
| Focus-visible | Tab ke sebuah titik data | Ring 2px `--ds-focus` di sekitar kolom, tooltip tampil |
| Sentuh / terpilih | Ketuk kolom | Kolom tetap difokus, tooltip bertahan sampai ketukan berikutnya |
| Loading | `data-state="loading"`, `aria-busy="true"` | Batang berkilau menggantikan plot, teks status untuk pembaca layar |
| Kosong | `data-state="empty"` | Satu kalimat tentang apa yang akan muncul dan kapan |
| Galat | `data-state="error"`, `role="alert"` | Pesan berwarna `--ds-error-text`, tombol coba lagi |
| Tabel terbuka | `<details open>` | Angka yang sama dalam tabel di bawah chart |
| Kontras lebih | `prefers-contrast: more` | Seri garis memakai pola putus-putus, batang diberi garis tepi 1px |
| Forced colours | `forced-colors: active` | Tanda memakai `CanvasText`, fokus memakai `Highlight` |
| Dark | `data-theme="dark"` | Warna seri lebih terang agar tetap 3:1 terhadap permukaan |

## Anatomi

- `.ds-chart-frame` (sebuah `<figure>`): judul, plot, legend, tabel.
- `.ds-chart-frame__head`, `__title`, `__desc`: isi chart dan periodenya.
- `.ds-chart-frame__plot`: memuat SVG dan, bila ada, pesan state (di sel grid yang sama).
- `svg.ds-chart`: `viewBox` sekitar 420 lebar; teks 11 unit; `role="group"` dengan ringkasan satu kalimat.
- `.ds-grid-line`, `.ds-axis-line`: garis grid `base-content` 10%, garis dasar `--ds-control-border`.
- `.ds-chart__point`: `<g tabindex="0" role="img" aria-label="…">` yang bisa difokus untuk tiap kategori.
  - `.ds-chart__hit`: kolom transparan, lebar minimal 24px.
  - `.ds-bar`, `.ds-line`, `.ds-area`, `.ds-dot` dengan `.s-1` … `.s-8`: tanda datanya.
  - `.ds-chart__guide`, `.ds-chart__tip`: garis pemandu dan tooltip, digambar di pita atas plot.
- `.ds-legend`: swatch (`<i>`, `<i class="is-line">`) dan label.
- `.ds-chart-frame__data`: `<details>` berisi `table.ds-chart-table`.
- `.ds-donut`, `.ds-sparkline`: cincin dengan daftarnya, dan tren sebaris.
- `.ds-chart-state` (`is-loading`, `is-error`): pesan loading, kosong, dan galat.

## Penggunaan

- Pilih bentuk menurut pertanyaannya. Membandingkan kategori: batang. Perubahan dari waktu ke waktu: garis. Bagian dari keseluruhan: donat (lima segmen atau kurang) atau batang bertumpuk. Satu tren di tengah teks: sparkline.
- Mulai batang dari nol. Sumbu batang yang dipotong melebih-lebihkan selisih; garis boleh memakai rentang sempit bila sumbunya menyatakannya.
- Gambar 3 sampai 5 garis grid dan tulis satuan di judul atau keterangan, bukan di setiap tanda sumbu.
- Batasi satu chart sampai 8 seri. Bila butuh lebih, tampilkan 5 teratas dan gabungkan sisanya sebagai "Lainnya" dengan `--ds-chart-7`.
- Tulis judul sebagai temuan, atau subjek plus periode ("Faktur terbayar per minggu"), dan taruh satuan di keterangan.
- Jangan pakai 3D, gradien, bayangan, sumbu y ganda, atau pie chart dengan lebih dari lima irisan.
- Jaga SVG tetap responsif: lebar 100%, ada `viewBox`, tanpa ukuran piksel tetap. Plot dibatasi 40rem agar teks tetap sekitar 11 sampai 15px.
- Format angka di atribut SVG dengan `CultureInfo.InvariantCulture`; `id-ID` menulis koma desimal dan merusak `stroke-dasharray` serta koordinat.

> [!TIP]
> Lebih dari 12 titik data: jangan beri `tabindex="0"` pada tiap tanda. Jadikan seluruh `<svg>` satu perhentian tab dengan ringkasan, dan biarkan disclosure tabel membawa rinciannya.

## Aksesibilitas

- SVG memakai `role="group"` dan `aria-label` yang menyebut jenis, subjek, periode, dan temuan utama dalam satu atau dua kalimat. Jangan pakai `role="img"` pada root: itu menyembunyikan tanda yang bisa difokus.
- Setiap tanda adalah `role="img"` dengan `aria-label` seperti "Minggu 44: 34 faktur". Pembaca layar membaca nilainya tanpa hover.
- Angka yang sama ada sebagai teks: legend dengan nilai, daftar di samping donat, atau tabel `<details>`. WCAG 1.1.1 dan 1.4.1 dipenuhi oleh tabel dan label, bukan oleh warna.
- Warna bukan satu-satunya petunjuk: seri garis dibedakan oleh pola putus-putus, legend menamai setiap seri, tooltip menyebut kategori dan nilai.
- Tanda dan garis menjaga 3:1 terhadap `--color-base-100` di kedua tema; teks memakai `--ds-subtle` (4.5:1). Garis grid hanya hiasan dan tidak butuh kontras.
- Tooltip terbuka saat hover, fokus, dan ketuk; tidak bergantung pada kursor dan bukan satu-satunya tempat nilai ada (aria-label dan tabel mengulanginya).
- Loading memakai `aria-busy="true"` pada figure dan pesan `role="status"`; galat memakai `role="alert"`.
- Gerak: tooltip memudar masuk 150ms; tanda data tidak punya animasi masuk. Kilau loading berhenti saat reduced motion.

| Tombol | Aksi |
| --- | --- |
| Tab | Pindah ke titik data berikutnya (atau ke ringkasan tabel) |
| Shift + Tab | Pindah ke titik data sebelumnya |
| Enter / Space pada ringkasan | Membuka atau menutup tabel |

## Razor

Tidak ada tag helper chart: geometrinya bergantung pada data Anda. Hitung koordinat di partial lalu tulis SVG, dan pakai ulang markup di atas. Resep ini menggambar chart batang satu seri dari daftar pasangan (label, nilai). Pita tooltip adalah 56 unit teratas; batang memakai sisanya.

```cshtml
@using System.Globalization
@model IReadOnlyList<(string Label, int Value)>
@{
    const double left = 40, right = 412, top = 58, bottom = 182;
    var max = Math.Max(10, (int)Math.Ceiling(Model.Max(p => p.Value) * 1.15 / 10) * 10);
    var slot = (right - left) / Model.Count;
    var bar = Math.Min(40, slot * 0.56);
    string F(double v) => v.ToString("0.##", CultureInfo.InvariantCulture);
}
<figure class="ds-chart-frame">
    <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">@ViewData["Title"]</h3></figcaption>
    <div class="ds-chart-frame__plot">
        <svg class="ds-chart" viewBox="0 0 420 232" role="group" aria-label="@ViewData["Summary"]">
            @for (var i = 0; i < Model.Count; i++)
            {
                var (label, value) = Model[i];
                var cx = left + slot * (i + 0.5);
                var h = value / (double)max * (bottom - top);
                <g class="ds-chart__point" tabindex="0" role="img" aria-label="@label: @value">
                    <rect class="ds-chart__hit" x="@F(cx - slot / 2 + 2)" y="@(top - 6)" width="@F(slot - 4)" height="@F(bottom - top + 6)" rx="4" />
                    <rect class="ds-bar s-1" x="@F(cx - bar / 2)" y="@F(bottom - h)" width="@F(bar)" height="@F(h)" rx="2" />
                </g>
                <text x="@F(cx)" y="@(bottom + 17)" text-anchor="middle">@label</text>
            }
        </svg>
    </div>
</figure>
```

Untuk tren di dalam sel tabel atau kartu, pakai tag helper sparkline; ia menghitung path-nya:

```cshtml
<ds-sparkline values="@(new double[] { 12, 14, 13, 15, 18, 17, 21 })" label="Pesanan, 7 hari terakhir: dari 12 ke 21, naik" area />
```

| Atribut | Efek |
| --- | --- |
| `values` | Angka, minimal dua |
| `label` | Nama aksesibel; sebut awal, akhir, dan arah |
| `tone` | `Primary` (bawaan), `Success`, `Warning`, `Error`, `Info`, `Neutral` |
| `area` | Isi di bawah garis |
| `large` | 9 × 2,5 rem, bukan 6 × 1,5 rem |

String pesan loading, kosong, dan galat ada di `DsText`: `media.chart.loading`, `media.chart.empty`, `media.chart.error`, `media.chart.table`, `media.chart.retry`.

## Token

| Token | Dipakai untuk |
| --- | --- |
| `--ds-chart-1` … `--ds-chart-8` | Warna seri (bawaannya ada di `dataviz.css`; definisikan di file token untuk menimpa) |
| `--color-base-content` | Garis grid (10%), track (8%) |
| `--ds-control-border` | Garis dasar, garis pemandu |
| `--ds-subtle` | Teks sumbu, keterangan |
| `--ds-popover`, `--color-base-300` | Permukaan dan border tooltip |
| `--ds-focus` | Ring fokus pada kolom |
| `--ds-opacity-state-hover` | Tint kolom saat hover |
| `--ds-duration-fast`, `--ds-duration-shimmer` | Pudar tooltip, kilau loading |
| `--ds-tone` | Swatch legend, segmen donat, warna sparkline |

## Native dan daisyUI

Chart adalah `<svg>` biasa di dalam `<figure>`; daisyUI tidak punya chart. Disclosure tabel memakai `<details>` native. Warna status versi 1 (`s-success`, `s-warning`, `s-error`, `s-info`, `s-line`, `s-area`) tetap berfungsi untuk chart hasil, saat warna berarti status.
