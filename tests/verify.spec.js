import { test, expect } from '@playwright/test';
import http from 'http';
import fs from 'fs';
import path from 'path';

let server;

test.beforeAll(async () => {
  server = http.createServer((req, res) => {
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

  await new Promise((resolve) => server.listen(8081, resolve));
});

test.afterAll(async () => {
  if (server) server.close();
});

test('capture homepage screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:8081/index.html');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot_desktop.png', fullPage: false });
});
