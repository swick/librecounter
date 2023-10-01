import {promises as fs} from 'fs'

const favicon = await fs.readFile('doc/favicon.png')


export default async function setup(app) {
	app.get('/', home)
	app.get('/favicon.ico', serveFavicon)
	app.get('/favicon.png', serveFavicon)
}

async function serveFavicon(request, reply) {
	reply.type('image/png')
	return favicon
}

/**
 * Request: no parameters.
 * Response: home page.
 * No auth required.
 */
async function home(request, reply) {
	reply.type('text/html')
	return `
<html>
<head>
  <title>LibreCounter: free, libre counter stats</title>
</head>
<body>
	<img src="/counter.svg">
	<h1>LibreCounter package</h1>
	<p>
	Free, libre, open source software to show analytics for your site.
	No configuration required.
	Add the following HTML snippet to your site:
	</p>
	<textarea disabled rows="4" cols="55">
<a href="https://librecounter.org/example.org/show">
<img src="https://librecounter.org/counter.svg">
</a></textarea>
<p>
Replacing <code>example.org</code> with your domain.
That's it!
GDPR compliant by default: no browser tracking done,
no IPs stored anywhere.
</p>

	<!-- courtesy of https://codepo8.github.io/css-fork-on-github-ribbon/ -->
	<style>#forkongithub a{background:#000;color:#fff;text-decoration:none;font-family:arial,sans-serif;text-align:center;font-weight:bold;padding:5px 40px;font-size:1rem;line-height:2rem;position:relative;transition:0.5s;}#forkongithub a:hover{background:#c11;color:#fff;}#forkongithub a::before,#forkongithub a::after{content:"";width:100%;display:block;position:absolute;top:1px;left:0;height:1px;background:#fff;}#forkongithub a::after{bottom:1px;top:auto;}@media screen and (min-width:800px){#forkongithub{position:fixed;display:block;top:0;right:0;width:200px;overflow:hidden;height:200px;z-index:9999;}#forkongithub a{width:200px;position:absolute;top:60px;right:-60px;transform:rotate(45deg);-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);box-shadow:4px 4px 10px rgba(0,0,0,0.8);}}</style><span id="forkongithub"><a target="_blank" href="https://github.com/alexfernandez/librecounter">Fork me on GitHub</a></span>
</body>
</html>
`
}
