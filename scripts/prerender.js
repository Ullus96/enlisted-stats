const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const routes = ['/', '/events', '/calculator', '/skill-builds'];

const run = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	for (const route of routes) {
		const url = `http://localhost:8080${route}`;
		await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
		const html = await page.content();

		// если это главная страница, сохраняем в dist/prerendered/index.html
		const outputDir =
			route === '/'
				? path.join('dist', 'prerendered')
				: path.join('dist', route.slice(1));

		const filePath = path.join(outputDir, 'index.html');

		fs.mkdirSync(path.dirname(filePath), { recursive: true });
		fs.writeFileSync(filePath, html);
		console.log(`✅ saved ${filePath}`);
	}

	await browser.close();
};

run();
