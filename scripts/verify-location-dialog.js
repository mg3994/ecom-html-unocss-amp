import http from 'http';
import socketserver from 'net';
import http_server from 'http';
import fs from 'fs';
import path from 'path';
import { sync_playwright } from 'playwright';

// Node.js script using Playwright
import playwright from 'playwright';

const server = http_server.createServer((req, res) => {
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

server.listen(8088, async () => {
  console.log('Server started on port 8088');
  const browser = await playwright.chromium.launch({ headless: true });

  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    recordVideo: { dir: '/home/jules/verification/videos' }
  });

  const page = await context.newPage();
  await page.goto('http://localhost:8088/index.html');
  await page.waitForTimeout(1000);

  // Click on location icon button in header
  await page.click('button[aria-label="Select Delivery Location"]');
  await page.waitForTimeout(1000);

  const screenshotPath = '/home/jules/verification/screenshots/verification_location_dialog.png';
  await page.screenshot({ path: screenshotPath });
  console.log('Captured ' + screenshotPath);

  await context.close();
  await browser.close();
  server.close();
  process.exit(0);
});
