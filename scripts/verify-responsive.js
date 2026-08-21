import playwright from 'playwright';
import path from 'path';
import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') filePath = './index.html';
  filePath = filePath.split('?')[0];

  const ext = path.extname(filePath);
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png'
  }[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(8080, async () => {
  console.log('Server started on port 8080');
  const browser = await playwright.chromium.launch();

  const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 900 }
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.goto('http://localhost:8080/index.html');
    await page.waitForTimeout(1000);
    const screenshotPath = 'screenshot_index_' + vp.name + '.png';
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log('Captured ' + screenshotPath);
    await context.close();
  }

  await browser.close();
  server.close();
  process.exit(0);
});
