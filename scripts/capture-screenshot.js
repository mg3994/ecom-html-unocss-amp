import http from 'http';
import fs from 'fs';
import path from 'path';

// Dynamic import of playwright
const { chromium } = await import('playwright');

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

server.listen(8085, async () => {
  console.log('Server running on http://localhost:8085');
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8085/index.html');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot_desktop.png' });
  console.log('Saved screenshot_desktop.png');

  await browser.close();
  server.close();
  process.exit(0);
});
