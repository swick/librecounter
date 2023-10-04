import {shorten} from '../core/format.js'


export function createHome(latestSites) {
	latestSites.sort((a, b) => b.value - a.value)
	const barHeight = 30
	const labels = latestSites.map(site => site.key).map(shorten)
	const data = latestSites.map(site => site.value)
	const height = barHeight * (data.length + 2)
	return `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, minimum-scale=1">
	<title>LibreCounter: free, libre counter stats</title>
	<link rel="shortcut icon" href="/favicon.png">
	<link rel="stylesheet" href="/main.css">
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
	<header>
		<h1 class="title">
		<img src="/counter.svg" style="vertical-align:middle"/>
		LibreCounter
		</h1>
		<p>
		Free, <a href="https://github.com/alexfernandez/librecounter/">libre, open source software</a> to show analytics for your site.
		No installation or configuration required.
		</p>
	</header>
	<article>
		<h2>Top Sites Today</h2>
		<div class="graphs">
			<div class="graph">
				<div class="canvas">
					<canvas id="top-sites" height="${height}px"></canvas>
				</div>
			</div>
		</div>
		<script>
		const ctx = document.getElementById('top-sites')
		const data = {
			labels: ['${labels.join("','")}'],
			datasets: [{
				label: 'Top sites today',
				data: [${data.join(',')}],
				borderColor: '#3366ff',
				backgroundColor: '#3366ff33',
				barThickness: ${barHeight},
			}],
		}
		const config = {
			type: 'bar',
			data,
			options: {
				indexAxis: 'y',
				elements: {bar: {borderWidth: 2}},
				responsive: true,
				plugins: {legend: {display: false}},
				scales: {y: {beginAtZero: true}},
				maintainAspectRatio: false,
			},
		}
		new Chart(ctx, config)
		</script>
		<table>
			<thead>
				<tr>
				<th>Site</th>
				<th>Clicks</th>
				</tr>
			</thead>
			<tbody>
				${createRows(latestSites)}
			</tbody>
		</table>
		<h2>How to Use</h2>
		<p>
		Add the following HTML snippet to your site, replacing <code>example.org</code> with your domain name:
		</p>
		<textarea disabled rows="3" cols="80">
<a href="https://librecounter.org/example.org/show">
<img src="https://librecounter.org/counter.svg" referrerPolicy="unsafe-url">
</a></textarea>
		<p>
		That's it!
		Your stats will start appearing at <a href="https://librecounter.org/example.org/show">librecounter.org/example.org/show</a>,
		again replacing <code>example.org</code> with your domain name.
		</p>
		<p>
		If you prefer your stats to be hidden the HTML snippet to add is even simpler:
		</p>
		<textarea disabled rows="2" cols="80">
<img src="https://librecounter.org/counter.svg" referrerPolicy="unsafe-url" width="0"></textarea>
		<p>
		Keep in mind that your stats will still appear in the list above.
		</p>

		<h2>Compliance</h2>
		<p>
		LibreCounter is GDPR compliant by default: no browser tracking done,
		no IPs or user agents stored anywhere.
		</p>
		<p>
		Since no cookies are used you don't need to add a disclaimer to your site.
		</p>
	</article>

	<footer>
		© 2023 Alex Fernández and contributors.<br />
		Licensed under the <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GPLv3</a>.
	</footer>

</body>
</html>
`
}

function createRows(latestSites) {
	return latestSites.map(site => `		<tr>
			<td>
				<a href="/${site.key}/show">${site.key}</a>
			</td>
			<td>${site.value}</td>
		</tr>`).join('\n')
}
