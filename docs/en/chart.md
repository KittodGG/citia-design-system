---
title: Chart
group: components
category: data-display
order: 18
summary: Server-rendered SVG charts (bar, stacked bar, line, area, donut, sparkline) styled by tokens, with focusable marks, tooltips and a table alternative.
source: TPS app.css L3605–3630, Helpers/Charts.cs
---

Charts are plain SVG written on the server: no chart library, no client-side drawing, and the same markup prints and works without JavaScript. Use a chart when the shape of the data matters more than the exact numbers (a trend, a comparison, a share). Use a [table](./table.md) when readers look up values, and a [stat](./stat.md) for one number. A chart is never the only place a number appears: every chart carries a text summary, focusable marks with a tooltip, and the same data as a table.

## Examples

### Bar chart

One series, one colour. The tooltip sits in a band above the plot, so it never covers a bar. Hover or focus a column to read it; the guide line marks the category.

```html preview title="Bar chart with axis, grid and tooltip"
<figure class="ds-chart-frame">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Invoices paid per week</h3><p class="ds-chart-frame__desc">Weeks 41 to 45, 2026</p></figcaption>
  <div class="ds-chart-frame__plot">
<svg class="ds-chart" viewBox="0 0 420 232" role="group" aria-label="Bar chart, invoices paid per week, weeks 41 to 45 of 2026: 18, 26, 22, 34 and 29. Week 44 is the highest with 34."><line class="ds-axis-line" x1="40" x2="412" y1="182" y2="182"/><text x="34" y="185.5" text-anchor="end">0</text><line class="ds-grid-line" x1="40" x2="412" y1="151" y2="151"/><text x="34" y="154.5" text-anchor="end">10</text><line class="ds-grid-line" x1="40" x2="412" y1="120" y2="120"/><text x="34" y="123.5" text-anchor="end">20</text><line class="ds-grid-line" x1="40" x2="412" y1="89" y2="89"/><text x="34" y="92.5" text-anchor="end">30</text><line class="ds-grid-line" x1="40" x2="412" y1="58" y2="58"/><text x="34" y="61.5" text-anchor="end">40</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Week 41: 18 invoices"><rect class="ds-chart__hit" x="42" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="77.2" x2="77.2" y1="50" y2="182"/><rect class="ds-bar s-1" x="57.2" y="126.2" width="40" height="55.8" rx="2"/><g class="ds-chart__tip"><rect x="32.65" y="2" width="89.1" height="42" rx="6"/><text class="is-title" x="42.65" y="19">Week 41</text><text class="" x="42.65" y="34">18 invoices</text></g></g><text x="77.2" y="199" text-anchor="middle">W41</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Week 42: 26 invoices"><rect class="ds-chart__hit" x="116.4" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="151.6" x2="151.6" y1="50" y2="182"/><rect class="ds-bar s-1" x="131.6" y="101.4" width="40" height="80.6" rx="2"/><g class="ds-chart__tip"><rect x="107.05" y="2" width="89.1" height="42" rx="6"/><text class="is-title" x="117.05" y="19">Week 42</text><text class="" x="117.05" y="34">26 invoices</text></g></g><text x="151.6" y="199" text-anchor="middle">W42</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Week 43: 22 invoices"><rect class="ds-chart__hit" x="190.8" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="226" x2="226" y1="50" y2="182"/><rect class="ds-bar s-1" x="206" y="113.8" width="40" height="68.2" rx="2"/><g class="ds-chart__tip"><rect x="181.45" y="2" width="89.1" height="42" rx="6"/><text class="is-title" x="191.45" y="19">Week 43</text><text class="" x="191.45" y="34">22 invoices</text></g></g><text x="226" y="199" text-anchor="middle">W43</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Week 44: 34 invoices"><rect class="ds-chart__hit" x="265.2" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="300.4" x2="300.4" y1="50" y2="182"/><rect class="ds-bar s-1" x="280.4" y="76.6" width="40" height="105.4" rx="2"/><g class="ds-chart__tip"><rect x="255.85" y="2" width="89.1" height="42" rx="6"/><text class="is-title" x="265.85" y="19">Week 44</text><text class="" x="265.85" y="34">34 invoices</text></g></g><text x="300.4" y="199" text-anchor="middle">W44</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Week 45: 29 invoices"><rect class="ds-chart__hit" x="339.6" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="374.8" x2="374.8" y1="50" y2="182"/><rect class="ds-bar s-1" x="354.8" y="92.1" width="40" height="89.9" rx="2"/><g class="ds-chart__tip"><rect x="326.9" y="2" width="89.1" height="42" rx="6"/><text class="is-title" x="336.9" y="19">Week 45</text><text class="" x="336.9" y="34">29 invoices</text></g></g><text x="374.8" y="199" text-anchor="middle">W45</text></svg>
  </div>

  <details class="ds-chart-frame__data"><summary>View data as a table</summary>
<table class="ds-chart-table"><caption>Invoices paid per week</caption><thead><tr><th scope="col">Week</th><th scope="col">Invoices</th></tr></thead><tbody><tr><th scope="row">Week 41</th><td>18</td></tr><tr><th scope="row">Week 42</th><td>26</td></tr><tr><th scope="row">Week 43</th><td>22</td></tr><tr><th scope="row">Week 44</th><td>34</td></tr><tr><th scope="row">Week 45</th><td>29</td></tr></tbody></table>
  </details>
</figure>
```

### Stacked bar chart

Series stack in a fixed order, largest at the bottom. The tooltip lists each segment and the total. Name the series in the legend; the colours repeat across the page.

```html preview title="Stacked bar chart with legend"
<figure class="ds-chart-frame">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Support tickets by channel</h3><p class="ds-chart-frame__desc">Monday to Friday, 26 to 30 October 2026</p></figcaption>
  <div class="ds-chart-frame__plot">
<svg class="ds-chart" viewBox="0 0 420 232" role="group" aria-label="Stacked bar chart, support tickets by channel, Monday to Friday: 40, 46, 38, 52 and 44 tickets in total. Email is the largest channel every day."><line class="ds-axis-line" x1="40" x2="412" y1="182" y2="182"/><text x="34" y="185.5" text-anchor="end">0</text><line class="ds-grid-line" x1="40" x2="412" y1="140.67" y2="140.67"/><text x="34" y="144.17" text-anchor="end">20</text><line class="ds-grid-line" x1="40" x2="412" y1="99.33" y2="99.33"/><text x="34" y="102.83" text-anchor="end">40</text><line class="ds-grid-line" x1="40" x2="412" y1="58" y2="58"/><text x="34" y="61.5" text-anchor="end">60</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Mon: 22 email, 12 chat, 6 phone"><rect class="ds-chart__hit" x="42" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="77.2" x2="77.2" y1="50" y2="182"/><rect class="ds-bar s-1" x="57.2" y="136.53" width="40" height="44.47"/><rect class="ds-bar s-2" x="57.2" y="111.73" width="40" height="23.8"/><rect class="ds-bar s-3" x="57.2" y="99.33" width="40" height="11.4"/><g class="ds-chart__tip"><rect x="38.75" y="2" width="76.9" height="87" rx="6"/><text class="is-title" x="48.75" y="19">Mon</text><text class="" x="48.75" y="34">Email: 22</text><text class="" x="48.75" y="49">Chat: 12</text><text class="" x="48.75" y="64">Phone: 6</text><text class="" x="48.75" y="79">Total: 40</text></g></g><text x="77.2" y="199" text-anchor="middle">Mon</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Tue: 24 email, 14 chat, 8 phone"><rect class="ds-chart__hit" x="116.4" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="151.6" x2="151.6" y1="50" y2="182"/><rect class="ds-bar s-1" x="131.6" y="132.4" width="40" height="48.6"/><rect class="ds-bar s-2" x="131.6" y="103.47" width="40" height="27.93"/><rect class="ds-bar s-3" x="131.6" y="86.93" width="40" height="15.53"/><g class="ds-chart__tip"><rect x="113.15" y="2" width="76.9" height="87" rx="6"/><text class="is-title" x="123.15" y="19">Tue</text><text class="" x="123.15" y="34">Email: 24</text><text class="" x="123.15" y="49">Chat: 14</text><text class="" x="123.15" y="64">Phone: 8</text><text class="" x="123.15" y="79">Total: 46</text></g></g><text x="151.6" y="199" text-anchor="middle">Tue</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Wed: 20 email, 11 chat, 7 phone"><rect class="ds-chart__hit" x="190.8" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="226" x2="226" y1="50" y2="182"/><rect class="ds-bar s-1" x="206" y="140.67" width="40" height="40.33"/><rect class="ds-bar s-2" x="206" y="117.93" width="40" height="21.73"/><rect class="ds-bar s-3" x="206" y="103.47" width="40" height="13.47"/><g class="ds-chart__tip"><rect x="187.55" y="2" width="76.9" height="87" rx="6"/><text class="is-title" x="197.55" y="19">Wed</text><text class="" x="197.55" y="34">Email: 20</text><text class="" x="197.55" y="49">Chat: 11</text><text class="" x="197.55" y="64">Phone: 7</text><text class="" x="197.55" y="79">Total: 38</text></g></g><text x="226" y="199" text-anchor="middle">Wed</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Thu: 28 email, 15 chat, 9 phone"><rect class="ds-chart__hit" x="265.2" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="300.4" x2="300.4" y1="50" y2="182"/><rect class="ds-bar s-1" x="280.4" y="124.13" width="40" height="56.87"/><rect class="ds-bar s-2" x="280.4" y="93.13" width="40" height="30"/><rect class="ds-bar s-3" x="280.4" y="74.53" width="40" height="17.6"/><g class="ds-chart__tip"><rect x="261.95" y="2" width="76.9" height="87" rx="6"/><text class="is-title" x="271.95" y="19">Thu</text><text class="" x="271.95" y="34">Email: 28</text><text class="" x="271.95" y="49">Chat: 15</text><text class="" x="271.95" y="64">Phone: 9</text><text class="" x="271.95" y="79">Total: 52</text></g></g><text x="300.4" y="199" text-anchor="middle">Thu</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Fri: 23 email, 13 chat, 8 phone"><rect class="ds-chart__hit" x="339.6" y="52" width="70.4" height="130" rx="4"/><line class="ds-chart__guide" x1="374.8" x2="374.8" y1="50" y2="182"/><rect class="ds-bar s-1" x="354.8" y="134.47" width="40" height="46.53"/><rect class="ds-bar s-2" x="354.8" y="107.6" width="40" height="25.87"/><rect class="ds-bar s-3" x="354.8" y="91.07" width="40" height="15.53"/><g class="ds-chart__tip"><rect x="336.35" y="2" width="76.9" height="87" rx="6"/><text class="is-title" x="346.35" y="19">Fri</text><text class="" x="346.35" y="34">Email: 23</text><text class="" x="346.35" y="49">Chat: 13</text><text class="" x="346.35" y="64">Phone: 8</text><text class="" x="346.35" y="79">Total: 44</text></g></g><text x="374.8" y="199" text-anchor="middle">Fri</text></svg>
  </div>
  <ul class="ds-legend"><li class="s-1"><i></i>Email</li><li class="s-2"><i></i>Chat</li><li class="s-3"><i></i>Phone</li></ul>
  <details class="ds-chart-frame__data"><summary>View data as a table</summary>
<table class="ds-chart-table"><caption>Support tickets by channel</caption><thead><tr><th scope="col">Day</th><th scope="col">Email</th><th scope="col">Chat</th><th scope="col">Phone</th><th scope="col">Total</th></tr></thead><tbody><tr><th scope="row">Mon</th><td>22</td><td>12</td><td>6</td><td>40</td></tr><tr><th scope="row">Tue</th><td>24</td><td>14</td><td>8</td><td>46</td></tr><tr><th scope="row">Wed</th><td>20</td><td>11</td><td>7</td><td>38</td></tr><tr><th scope="row">Thu</th><td>28</td><td>15</td><td>9</td><td>52</td></tr><tr><th scope="row">Fri</th><td>23</td><td>13</td><td>8</td><td>44</td></tr></tbody></table>
  </details>
</figure>
```

### Line chart

Use a line for change over time. Two series differ by colour and by dash, so the comparison survives greyscale and colour blindness. Keep it to four series; beyond that, split the chart.

```html preview title="Line chart, two series"
<figure class="ds-chart-frame">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Active users per month</h3><p class="ds-chart-frame__desc">This year compared with last year, in thousands</p></figcaption>
  <div class="ds-chart-frame__plot">
<svg class="ds-chart" viewBox="0 0 420 232" role="group" aria-label="Line chart, active users per month in thousands, May to October. This year rises from 12.4 to 21.8; last year rises from 10.1 to 15.9."><line class="ds-axis-line" x1="40" x2="412" y1="182" y2="182"/><text x="34" y="185.5" text-anchor="end">0</text><line class="ds-grid-line" x1="40" x2="412" y1="157.2" y2="157.2"/><text x="34" y="160.7" text-anchor="end">5</text><line class="ds-grid-line" x1="40" x2="412" y1="132.4" y2="132.4"/><text x="34" y="135.9" text-anchor="end">10</text><line class="ds-grid-line" x1="40" x2="412" y1="107.6" y2="107.6"/><text x="34" y="111.1" text-anchor="end">15</text><line class="ds-grid-line" x1="40" x2="412" y1="82.8" y2="82.8"/><text x="34" y="86.3" text-anchor="end">20</text><line class="ds-grid-line" x1="40" x2="412" y1="58" y2="58"/><text x="34" y="61.5" text-anchor="end">25</text><path class="ds-line s-1" d="M54 120.5 L122.8 112.06 L191.6 103.14 L260.4 93.71 L329.2 81.81 L398 73.87"/><path class="ds-line s-2" d="M54 131.9 L122.8 126.45 L191.6 120.5 L260.4 114.54 L329.2 108.59 L398 103.14" stroke-dasharray="5 4"/><g class="ds-chart__point" tabindex="0" role="img" aria-label="May: 2026 12.4, 2025 10.1"><rect class="ds-chart__hit" x="19.6" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="54" x2="54" y1="50" y2="182"/><circle class="ds-dot s-1" cx="54" cy="120.5" r="3.5"/><circle class="ds-dot s-2" cx="54" cy="131.9" r="3.5"/><g class="ds-chart__tip"><rect x="12.5" y="2" width="83" height="57" rx="6"/><text class="is-title" x="22.5" y="19">May</text><text class="" x="22.5" y="34">2026: 12.4</text><text class="" x="22.5" y="49">2025: 10.1</text></g></g><text x="54" y="199" text-anchor="middle">May</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Jun: 2026 14.1, 2025 11.2"><rect class="ds-chart__hit" x="88.4" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="122.8" x2="122.8" y1="50" y2="182"/><circle class="ds-dot s-1" cx="122.8" cy="112.06" r="3.5"/><circle class="ds-dot s-2" cx="122.8" cy="126.45" r="3.5"/><g class="ds-chart__tip"><rect x="81.3" y="2" width="83" height="57" rx="6"/><text class="is-title" x="91.3" y="19">Jun</text><text class="" x="91.3" y="34">2026: 14.1</text><text class="" x="91.3" y="49">2025: 11.2</text></g></g><text x="122.8" y="199" text-anchor="middle">Jun</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Jul: 2026 15.9, 2025 12.4"><rect class="ds-chart__hit" x="157.2" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="191.6" x2="191.6" y1="50" y2="182"/><circle class="ds-dot s-1" cx="191.6" cy="103.14" r="3.5"/><circle class="ds-dot s-2" cx="191.6" cy="120.5" r="3.5"/><g class="ds-chart__tip"><rect x="150.1" y="2" width="83" height="57" rx="6"/><text class="is-title" x="160.1" y="19">Jul</text><text class="" x="160.1" y="34">2026: 15.9</text><text class="" x="160.1" y="49">2025: 12.4</text></g></g><text x="191.6" y="199" text-anchor="middle">Jul</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Aug: 2026 17.8, 2025 13.6"><rect class="ds-chart__hit" x="226" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="260.4" x2="260.4" y1="50" y2="182"/><circle class="ds-dot s-1" cx="260.4" cy="93.71" r="3.5"/><circle class="ds-dot s-2" cx="260.4" cy="114.54" r="3.5"/><g class="ds-chart__tip"><rect x="218.9" y="2" width="83" height="57" rx="6"/><text class="is-title" x="228.9" y="19">Aug</text><text class="" x="228.9" y="34">2026: 17.8</text><text class="" x="228.9" y="49">2025: 13.6</text></g></g><text x="260.4" y="199" text-anchor="middle">Aug</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Sep: 2026 20.2, 2025 14.8"><rect class="ds-chart__hit" x="294.8" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="329.2" x2="329.2" y1="50" y2="182"/><circle class="ds-dot s-1" cx="329.2" cy="81.81" r="3.5"/><circle class="ds-dot s-2" cx="329.2" cy="108.59" r="3.5"/><g class="ds-chart__tip"><rect x="287.7" y="2" width="83" height="57" rx="6"/><text class="is-title" x="297.7" y="19">Sep</text><text class="" x="297.7" y="34">2026: 20.2</text><text class="" x="297.7" y="49">2025: 14.8</text></g></g><text x="329.2" y="199" text-anchor="middle">Sep</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Oct: 2026 21.8, 2025 15.9"><rect class="ds-chart__hit" x="363.6" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="398" x2="398" y1="50" y2="182"/><circle class="ds-dot s-1" cx="398" cy="73.87" r="3.5"/><circle class="ds-dot s-2" cx="398" cy="103.14" r="3.5"/><g class="ds-chart__tip"><rect x="333" y="2" width="83" height="57" rx="6"/><text class="is-title" x="343" y="19">Oct</text><text class="" x="343" y="34">2026: 21.8</text><text class="" x="343" y="49">2025: 15.9</text></g></g><text x="398" y="199" text-anchor="middle">Oct</text></svg>
  </div>
  <ul class="ds-legend"><li class="s-1"><i class="is-line"></i>2026</li><li class="s-2"><i class="is-line is-dashed"></i>2025</li></ul>
  <details class="ds-chart-frame__data"><summary>View data as a table</summary>
<table class="ds-chart-table"><caption>Active users per month</caption><thead><tr><th scope="col">Month</th><th scope="col">2026</th><th scope="col">2025</th></tr></thead><tbody><tr><th scope="row">May</th><td>12.4</td><td>10.1</td></tr><tr><th scope="row">Jun</th><td>14.1</td><td>11.2</td></tr><tr><th scope="row">Jul</th><td>15.9</td><td>12.4</td></tr><tr><th scope="row">Aug</th><td>17.8</td><td>13.6</td></tr><tr><th scope="row">Sep</th><td>20.2</td><td>14.8</td></tr><tr><th scope="row">Oct</th><td>21.8</td><td>15.9</td></tr></tbody></table>
  </details>
</figure>
```

### Area chart

An area adds weight to a single cumulative series. Do not stack more than two areas: the lower ones hide the shape of the upper ones.

```html preview title="Area chart"
<figure class="ds-chart-frame">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Storage used</h3><p class="ds-chart-frame__desc">Gigabytes at month end, May to October 2026</p></figcaption>
  <div class="ds-chart-frame__plot">
<svg class="ds-chart" viewBox="0 0 420 232" role="group" aria-label="Area chart, storage used in gigabytes at month end: 120, 148, 171, 190, 236 and 262. Use grew by 142 GB in six months."><line class="ds-axis-line" x1="40" x2="412" y1="182" y2="182"/><text x="34" y="185.5" text-anchor="end">0</text><line class="ds-grid-line" x1="40" x2="412" y1="140.67" y2="140.67"/><text x="34" y="144.17" text-anchor="end">100</text><line class="ds-grid-line" x1="40" x2="412" y1="99.33" y2="99.33"/><text x="34" y="102.83" text-anchor="end">200</text><line class="ds-grid-line" x1="40" x2="412" y1="58" y2="58"/><text x="34" y="61.5" text-anchor="end">300</text><path class="ds-area s-1" d="M54 132.4 L122.8 120.83 L191.6 111.32 L260.4 103.47 L329.2 84.45 L398 73.71 L398 182 L54 182 Z"/><path class="ds-line s-1" d="M54 132.4 L122.8 120.83 L191.6 111.32 L260.4 103.47 L329.2 84.45 L398 73.71"/><g class="ds-chart__point" tabindex="0" role="img" aria-label="May: Storage (GB) 120"><rect class="ds-chart__hit" x="19.6" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="54" x2="54" y1="50" y2="182"/><circle class="ds-dot s-1" cx="54" cy="132.4" r="3.5"/><g class="ds-chart__tip"><rect x="2" y="2" width="125.7" height="42" rx="6"/><text class="is-title" x="12" y="19">May</text><text class="" x="12" y="34">Storage (GB): 120</text></g></g><text x="54" y="199" text-anchor="middle">May</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Jun: Storage (GB) 148"><rect class="ds-chart__hit" x="88.4" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="122.8" x2="122.8" y1="50" y2="182"/><circle class="ds-dot s-1" cx="122.8" cy="120.83" r="3.5"/><g class="ds-chart__tip"><rect x="59.95" y="2" width="125.7" height="42" rx="6"/><text class="is-title" x="69.95" y="19">Jun</text><text class="" x="69.95" y="34">Storage (GB): 148</text></g></g><text x="122.8" y="199" text-anchor="middle">Jun</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Jul: Storage (GB) 171"><rect class="ds-chart__hit" x="157.2" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="191.6" x2="191.6" y1="50" y2="182"/><circle class="ds-dot s-1" cx="191.6" cy="111.32" r="3.5"/><g class="ds-chart__tip"><rect x="128.75" y="2" width="125.7" height="42" rx="6"/><text class="is-title" x="138.75" y="19">Jul</text><text class="" x="138.75" y="34">Storage (GB): 171</text></g></g><text x="191.6" y="199" text-anchor="middle">Jul</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Aug: Storage (GB) 190"><rect class="ds-chart__hit" x="226" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="260.4" x2="260.4" y1="50" y2="182"/><circle class="ds-dot s-1" cx="260.4" cy="103.47" r="3.5"/><g class="ds-chart__tip"><rect x="197.55" y="2" width="125.7" height="42" rx="6"/><text class="is-title" x="207.55" y="19">Aug</text><text class="" x="207.55" y="34">Storage (GB): 190</text></g></g><text x="260.4" y="199" text-anchor="middle">Aug</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Sep: Storage (GB) 236"><rect class="ds-chart__hit" x="294.8" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="329.2" x2="329.2" y1="50" y2="182"/><circle class="ds-dot s-1" cx="329.2" cy="84.45" r="3.5"/><g class="ds-chart__tip"><rect x="266.35" y="2" width="125.7" height="42" rx="6"/><text class="is-title" x="276.35" y="19">Sep</text><text class="" x="276.35" y="34">Storage (GB): 236</text></g></g><text x="329.2" y="199" text-anchor="middle">Sep</text><g class="ds-chart__point" tabindex="0" role="img" aria-label="Oct: Storage (GB) 262"><rect class="ds-chart__hit" x="363.6" y="52" width="68.8" height="130" rx="4"/><line class="ds-chart__guide" x1="398" x2="398" y1="50" y2="182"/><circle class="ds-dot s-1" cx="398" cy="73.71" r="3.5"/><g class="ds-chart__tip"><rect x="290.3" y="2" width="125.7" height="42" rx="6"/><text class="is-title" x="300.3" y="19">Oct</text><text class="" x="300.3" y="34">Storage (GB): 262</text></g></g><text x="398" y="199" text-anchor="middle">Oct</text></svg>
  </div>

  <details class="ds-chart-frame__data"><summary>View data as a table</summary>
<table class="ds-chart-table"><caption>Storage used</caption><thead><tr><th scope="col">Month</th><th scope="col">Storage (GB)</th></tr></thead><tbody><tr><th scope="row">May</th><td>120</td></tr><tr><th scope="row">Jun</th><td>148</td></tr><tr><th scope="row">Jul</th><td>171</td></tr><tr><th scope="row">Aug</th><td>190</td></tr><tr><th scope="row">Sep</th><td>236</td></tr><tr><th scope="row">Oct</th><td>262</td></tr></tbody></table>
  </details>
</figure>
```

### Donut

A donut shows parts of a whole with at most five segments. The list next to it carries the numbers, so the ring is a summary, not the only source. Segments are focusable and have a native `<title>` tooltip.

```html preview title="Donut with list"
<div class="ds-donut">
  <svg class="ds-donut__plot" viewBox="0 0 120 120" role="group" aria-label="Donut chart, 100 tickets by priority: 18 high, 46 medium, 36 low."><circle class="ds-donut-track" cx="60" cy="60" r="42"/><g transform="rotate(-90 60 60)"><circle class="s-1" cx="60" cy="60" r="42" stroke-dasharray="46 263.89" stroke-dashoffset="0" tabindex="0" role="img" aria-label="High: 18 tickets (18%)"><title>High: 18</title></circle><circle class="s-2" cx="60" cy="60" r="42" stroke-dasharray="119.89 263.89" stroke-dashoffset="-47.5" tabindex="0" role="img" aria-label="Medium: 46 tickets (46%)"><title>Medium: 46</title></circle><circle class="s-3" cx="60" cy="60" r="42" stroke-dasharray="93.5 263.89" stroke-dashoffset="-168.89" tabindex="0" role="img" aria-label="Low: 36 tickets (36%)"><title>Low: 36</title></circle></g><text class="ds-donut-center" x="60" y="62" text-anchor="middle">100</text><text class="ds-donut-caption" x="60" y="76" text-anchor="middle">tickets</text></svg>
  <ul>
    <li class="s-1"><i></i><span>High</span><strong>18</strong></li>
    <li class="s-2"><i></i><span>Medium</span><strong>46</strong></li>
    <li class="s-3"><i></i><span>Low</span><strong>36</strong></li>
  </ul>
</div>
```

### Sparkline

A sparkline is a trend without axes, sized to sit in a line of text, a table cell or a card. Its label states the start, the end and the direction.

```html preview title="Sparklines in a list"
<dl class="ds-kv">
  <dt>Orders</dt><dd>21 <svg class="ds-sparkline" viewBox="0 0 96 24" role="img" aria-label="Orders, last 7 days: from 12 to 21, rising" focusable="false"><path class="ds-area" d="M2 21 L17.33 17 L32.67 19 L48 15 L63.33 9 L78.67 11 L94 3 L94 24 L2 24 Z"/><path class="ds-line" d="M2 21 L17.33 17 L32.67 19 L48 15 L63.33 9 L78.67 11 L94 3"/><circle class="ds-dot" cx="94" cy="3" r="2.5"/></svg></dd>
  <dt>Refunds</dt><dd>4 <svg class="ds-sparkline is-warning" viewBox="0 0 96 24" role="img" aria-label="Refunds, last 7 days: from 9 to 4, falling" focusable="false"><path class="ds-area" d="M2 3 L17.33 6.6 L32.67 3 L48 10.2 L63.33 13.8 L78.67 17.4 L94 21 L94 24 L2 24 Z"/><path class="ds-line" d="M2 3 L17.33 6.6 L32.67 3 L48 10.2 L63.33 13.8 L78.67 17.4 L94 21"/><circle class="ds-dot" cx="94" cy="21" r="2.5"/></svg></dd>
</dl>
```

### Palette

Series colours are `--ds-chart-1` to `--ds-chart-8`. Series 1 is the brand teal. Use the series in order and never assign meaning to a colour only (a status colour such as red for "failed" belongs to a status, not a series).

```html preview title="Categorical palette"
<ul class="ds-legend">
  <li class="s-1"><i></i>1</li><li class="s-2"><i></i>2</li><li class="s-3"><i></i>3</li><li class="s-4"><i></i>4</li>
  <li class="s-5"><i></i>5</li><li class="s-6"><i></i>6</li><li class="s-7"><i></i>7</li><li class="s-8"><i></i>8</li>
</ul>
```

## States

A chart frame has four states. Set `data-state` on the `<figure>`: the plot hides, the state message takes its place, and the frame keeps its height so nothing jumps. Loading appears only after about 300 ms; use `ds-delayed` on the state element.

```html preview title="Loading, empty and error"
<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))">
<figure class="ds-chart-frame" data-state="loading" aria-busy="true">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Invoices paid per week</h3><p class="ds-chart-frame__desc">Weeks 41 to 45, 2026</p></figcaption>
  <div class="ds-chart-frame__plot">
    <svg class="ds-chart" viewBox="0 0 420 232" aria-hidden="true"></svg>
    <div class="ds-chart-state is-loading" role="status"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><p class="ds-visually-hidden">Loading chart…</p></div>
  </div>
</figure>
<figure class="ds-chart-frame" data-state="empty">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Invoices paid per week</h3><p class="ds-chart-frame__desc">Weeks 41 to 45, 2026</p></figcaption>
  <div class="ds-chart-frame__plot">
    <svg class="ds-chart" viewBox="0 0 420 232" aria-hidden="true"></svg>
    <div class="ds-chart-state"><strong>No data to chart yet</strong><span>Paid invoices appear here after the first payment.</span></div>
  </div>
</figure>
<figure class="ds-chart-frame" data-state="error">
  <figcaption class="ds-chart-frame__head"><h3 class="ds-chart-frame__title">Invoices paid per week</h3><p class="ds-chart-frame__desc">Weeks 41 to 45, 2026</p></figcaption>
  <div class="ds-chart-frame__plot">
    <svg class="ds-chart" viewBox="0 0 420 232" aria-hidden="true"></svg>
    <div class="ds-chart-state is-error" role="alert"><strong>The chart could not be loaded</strong><span>Check the connection and try again.</span><button type="button" class="btn btn-sm">Try again</button></div>
  </div>
</figure>
</div>
```

| State | Trigger | Appearance |
| --- | --- | --- |
| Rest | Data available | Plot, legend, table disclosure |
| Hover | Pointer over a column or segment (`@media (hover: hover)`) | Column tinted 6%, guide line and tooltip fade in over 150 ms |
| Focus-visible | Tab to a mark | 2px ring `--ds-focus` around the column, tooltip shown |
| Touch / selected | Tap on a column | Column keeps focus, tooltip stays until the next tap |
| Loading | `data-state="loading"`, `aria-busy="true"` | Shimmering bars in place of the plot, status text for screen readers |
| Empty | `data-state="empty"` | One sentence saying what will appear and when |
| Error | `data-state="error"`, `role="alert"` | Message in `--ds-error-text`, retry button |
| Table open | `<details open>` | Same numbers as a table below the chart |
| More contrast | `prefers-contrast: more` | Line series use dash patterns, bars get a 1px outline |
| Forced colours | `forced-colors: active` | Marks use `CanvasText`, focus uses `Highlight` |
| Dark | `data-theme="dark"` | Series lighten to keep 3:1 against the surface |

## Anatomy

- `.ds-chart-frame` (a `<figure>`): title block, plot, legend, table.
- `.ds-chart-frame__head`, `__title`, `__desc`: what the chart shows and for which period.
- `.ds-chart-frame__plot`: holds the SVG and, when set, the state message (same grid cell).
- `svg.ds-chart`: `viewBox` about 420 wide; text is 11 units; `role="group"` with a one-sentence summary.
- `.ds-grid-line`, `.ds-axis-line`: gridlines at `base-content` 10%, baseline in `--ds-control-border`.
- `.ds-chart__point`: a focusable `<g tabindex="0" role="img" aria-label="…">` per category.
  - `.ds-chart__hit`: transparent column, at least 24px wide.
  - `.ds-bar`, `.ds-line`, `.ds-area`, `.ds-dot` with `.s-1` … `.s-8`: the marks.
  - `.ds-chart__guide`, `.ds-chart__tip`: guide line and tooltip, drawn in the band above the plot.
- `.ds-legend`: swatches (`<i>`, `<i class="is-line">`) and labels.
- `.ds-chart-frame__data`: a `<details>` holding `table.ds-chart-table`.
- `.ds-donut`, `.ds-sparkline`: the ring with its list, and the inline trend.
- `.ds-chart-state` (`is-loading`, `is-error`): loading, empty and error messages.

## Usage

- Pick the form by the question. Compare categories: bars. Change over time: line. Part of a whole: donut (five segments or fewer) or a stacked bar. One trend in a row of text: sparkline.
- Start bars at zero. A truncated bar axis exaggerates differences; a line may use a tight range if the axis says so.
- Draw 3 to 5 gridlines and label the axis with units in the title or caption, not in every tick.
- Limit a chart to 8 series. If you need more, show the top 5 and group the rest as "Other" in `--ds-chart-7`.
- Write the title as the finding, or the subject plus the period ("Invoices paid per week"), and put the unit in the description.
- Do not use 3D, gradients, drop shadows, dual y-axes or pie charts with more than five slices.
- Keep the SVG responsive: width 100%, a `viewBox`, no fixed pixel size. The plot caps at 40rem so text stays near 11 to 15px.
- Format numbers in SVG attributes with `CultureInfo.InvariantCulture`; `id-ID` writes a decimal comma and breaks `stroke-dasharray` and coordinates.

> [!TIP]
> More than 12 data points: skip `tabindex="0"` on each mark. Make the whole `<svg>` one tab stop with a summary, and let the table disclosure carry the detail.

## Accessibility

- The SVG has `role="group"` and an `aria-label` that states the type, the subject, the period and the key finding in one or two sentences. Do not use `role="img"` on the root: it hides the focusable marks.
- Each mark is `role="img"` with an `aria-label` such as "Week 44: 34 invoices". Screen readers read the value without a hover.
- The same numbers exist as text: legend with values, list beside a donut, or the `<details>` table. WCAG 1.1.1 and 1.4.1 are met by the table plus labels, not by colour.
- Colour is never the only cue: line series differ by dash, legends name every series, the tooltip names the category and the value.
- Marks and lines keep 3:1 against `--color-base-100` in both themes; text is `--ds-subtle` (4.5:1). Gridlines are decorative and need no contrast.
- Tooltips open on hover, on focus and on tap; they do not depend on the pointer and they are not the only place the value exists (the aria-label and the table repeat it).
- Loading uses `aria-busy="true"` on the figure and a `role="status"` message; errors use `role="alert"`.
- Motion: the tooltip fades in 150ms; there is no entrance animation of the marks. Loading shimmer stops under reduced motion.

| Key | Action |
| --- | --- |
| Tab | Moves to the next data point (or to the table summary) |
| Shift + Tab | Moves to the previous data point |
| Enter / Space on the summary | Opens or closes the table |

## Razor

There is no chart tag helper: the geometry depends on your data. Compute coordinates in a partial and write the SVG, then reuse the markup above. This recipe draws a single-series bar chart from a list of (label, value) pairs. The tooltip band is the top 56 units; bars use the rest.

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

For a trend inside a table cell or card use the sparkline tag helper; it computes the path:

```cshtml
<ds-sparkline values="@(new double[] { 12, 14, 13, 15, 18, 17, 21 })" label="Orders, last 7 days: from 12 to 21, rising" area />
```

| Attribute | Effect |
| --- | --- |
| `values` | Numbers, at least two |
| `label` | Accessible name; state start, end and direction |
| `tone` | `Primary` (default), `Success`, `Warning`, `Error`, `Info`, `Neutral` |
| `area` | Fill under the line |
| `large` | 9 × 2.5 rem instead of 6 × 1.5 rem |

Strings for loading, empty and error messages are in `DsText`: `media.chart.loading`, `media.chart.empty`, `media.chart.error`, `media.chart.table`, `media.chart.retry`.

## Tokens

| Token | Use |
| --- | --- |
| `--ds-chart-1` … `--ds-chart-8` | Series colours (defaults live in `dataviz.css`; define them in the token file to override) |
| `--color-base-content` | Gridlines (10%), track (8%) |
| `--ds-control-border` | Baseline, guide line |
| `--ds-subtle` | Axis text, descriptions |
| `--ds-popover`, `--color-base-300` | Tooltip surface and border |
| `--ds-focus` | Focus ring on a column |
| `--ds-opacity-state-hover` | Column tint on hover |
| `--ds-duration-fast`, `--ds-duration-shimmer` | Tooltip fade, loading shimmer |
| `--ds-tone` | Legend swatch, donut segment, sparkline colour |

## Native and daisyUI

The chart is plain `<svg>` inside a `<figure>`; daisyUI has no chart. The table disclosure uses native `<details>`. Status colours (`s-success`, `s-warning`, `s-error`, `s-info`, `s-line`, `s-area`) from version 1 still work for outcome charts where colour means a status.
