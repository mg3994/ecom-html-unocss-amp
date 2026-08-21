import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { createGenerator } from "unocss";
import unoConfig from "../uno.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptContent = `
function updateState() {
  const cookieMatch = document.cookie.match(new RegExp('(?:^|; )amp_theme=([^;]+)'));
  const savedTheme = cookieMatch ? cookieMatch[1] : (localStorage.getItem("antinna_theme") || "light");
  const currency = localStorage.getItem("antinna_currency") || "USD";
  const rate = currency === "USD" ? 1.0 : (currency === "EUR" ? 0.92 : (currency === "GBP" ? 0.78 : 3.67));
  const symbol = currency === "USD" ? "$" : (currency === "EUR" ? "€" : (currency === "GBP" ? "£" : "د.إ"));

  AMP.setState({ storeState: { theme: savedTheme, currency, rate, symbol } });
}

updateState();

const themeBtn = document.getElementById("theme-toggle-btn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    let currentTheme = localStorage.getItem("antinna_theme") || "light";
    let newTheme = currentTheme === "light" ? "dark" : "light";
    document.cookie = "amp_theme=" + newTheme + "; path=/; max-age=31536000";
    localStorage.setItem("antinna_theme", newTheme);
    updateState();
  });
}

const currencySelect = document.getElementById("currency-select");
if (currencySelect) {
  currencySelect.addEventListener("change", (e) => {
    localStorage.setItem("antinna_currency", e.target.value);
    updateState();
  });
}
`.trim();

const hash = crypto.createHash("sha384").update(scriptContent).digest("base64");
const hashMeta = "sha384-" + hash.replace(/=/g, "");

const customThemeVariablesCss = `
:root {
  --bg-color: #f8fafc;
  --text-color: #0f172a;
}
.dark {
  background-color: #0f172a;
  color: #f8fafc;
}
.light {
  background-color: #f8fafc;
  color: #0f172a;
}
.dark .bg-white {
  background-color: #1e293b;
}
.dark .text-surface-900 {
  color: #f8fafc;
}
.dark .text-surface-600,
.dark .text-surface-500 {
  color: #cbd5e1;
}
.dark .border-surface-200 {
  border-color: #334155;
}
.dark .bg-surface-50,
.dark .bg-surface-100 {
  background-color: #0f172a;
}
body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.2s ease, color 0.2s ease;
}
a {
  text-decoration: none;
}
.rtl {
  direction: rtl;
  text-align: right;
}
.ltr {
  direction: ltr;
  text-align: left;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.cart-drawer-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.cart-items-scroll {
  flex: 1;
  overflow-y: auto;
}
`.trim();

async function buildCss() {
  const uno = await createGenerator(unoConfig);
  const rootDir = path.resolve(__dirname, "..");

  const files = fs.readdirSync(rootDir).filter(f => f.endsWith(".html"));
  console.log(`Found ${files.length} HTML file(s) to build CSS for: ${files.join(", ")}`);

  for (const file of files) {
    const filePath = path.join(rootDir, file);
    let html = fs.readFileSync(filePath, "utf-8");

    // Clean html tag and body tag
    html = html.replace(/<html ⚡ lang="en" dir="ltr"[^>]*>/i, '<html ⚡ lang="en" dir="ltr">');
    html = html.replace(/<body[^>]*>/i, '<body [class]="storeState.theme + \' transition-colors duration-200 max-w-full overflow-x-hidden\'" class="light transition-colors duration-200 max-w-full overflow-x-hidden">');

    // Remove inline scripts from head if any were added
    html = html.replace(/<script>\s*\(function\(\)[\s\S]*?<\/script>\s*/gi, '');

    const res = await uno.generate(html);
    const compiledCss = res.css + "\n" + customThemeVariablesCss;

    // Inject compiled CSS into <style amp-custom>
    html = html.replace(/<style amp-custom>[\s\S]*?<\/style>/i, `<style amp-custom>\n${compiledCss}\n</style>`);

    // Ensure amp-script extension script is in head
    if (!html.includes('custom-element="amp-script"')) {
      html = html.replace('</head>', '  <script async custom-element="amp-script" src="https://cdn.ampproject.org/v0/amp-script-0.1.js"></script>\n</head>');
    }

    // Ensure amp-script script and hash meta tag are present
    if (!html.includes('id="state-script"')) {
      const scriptBlock = `
  <script id="state-script" type="text/plain" target="amp-script">
${scriptContent}
  </script>`;
      html = html.replace("</body>", `${scriptBlock}\n</body>`);
    } else {
      html = html.replace(/<script id="state-script"[\s\S]*?<\/script>/i, `<script id="state-script" type="text/plain" target="amp-script">\n${scriptContent}\n  </script>`);
    }

    if (html.includes('<meta name="amp-script-src"')) {
      html = html.replace(/<meta name="amp-script-src" content="[^"]*">/i, `<meta name="amp-script-src" content="${hashMeta}">`);
    } else {
      html = html.replace("</head>", `  <meta name="amp-script-src" content="${hashMeta}">\n</head>`);
    }

    fs.writeFileSync(filePath, html, "utf-8");
    console.log(`[CSS Build] Updated ${file} with ${compiledCss.length} bytes of compiled AMP CSS & amp-script hash: ${hashMeta}`);
  }
}

buildCss().catch(err => {
  console.error("Build failed:", err);
  process.exit(1);
});
