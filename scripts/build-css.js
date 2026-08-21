import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { createGenerator } from "unocss";
import unoConfig from "../uno.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptContent = `
function updateCurrency() {
  const currency = localStorage.getItem("antinna_currency") || "USD";
  const rate = currency === "USD" ? 1.0 : (currency === "EUR" ? 0.92 : (currency === "GBP" ? 0.78 : 3.67));
  const symbol = currency === "USD" ? "$" : (currency === "EUR" ? "€" : (currency === "GBP" ? "£" : "د.إ"));
  AMP.setState({ storeState: { currency, rate, symbol } });
}

updateCurrency();

const currencySelect = document.getElementById("currency-select");
if (currencySelect) {
  currencySelect.addEventListener("change", (e) => {
    localStorage.setItem("antinna_currency", e.target.value);
    updateCurrency();
  });
}
`.trim();

const hash = crypto.createHash("sha384").update(scriptContent).digest("base64");
const hashMeta = "sha384-" + hash.replace(/=/g, "");

const customThemeVariablesCss = `
:root {
  --bg-color: #f8fafc;
  --surface-color: #ffffff;
  --surface-hover: #f1f5f9;
  --border-color: #e2e8f0;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --accent-color: #0284c7;
}

/* System dark fallback */
@media (prefers-color-scheme: dark) {
  body:not(.amp-dark-mode) {
    --bg-color: #0f172a;
    --surface-color: #1e293b;
    --surface-hover: #334155;
    --border-color: #334155;
    --text-main: #f8fafc;
    --text-muted: #cbd5e1;
    --accent-color: #38bdf8;
  }
}

/* Native AMP Dark Mode Override */
body.amp-dark-mode {
  --bg-color: #0f172a;
  --surface-color: #1e293b;
  --surface-hover: #334155;
  --border-color: #334155;
  --text-main: #f8fafc;
  --text-muted: #cbd5e1;
  --accent-color: #38bdf8;
  background-color: #0f172a;
  color: #f8fafc;
}

body.amp-dark-mode,
body.amp-dark-mode div,
body.amp-dark-mode header,
body.amp-dark-mode main,
body.amp-dark-mode section,
body.amp-dark-mode footer,
body.amp-dark-mode amp-sidebar {
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

/* Comprehensive Dark Mode Component Overrides */
body.amp-dark-mode .bg-white,
body.amp-dark-mode .card-base,
body.amp-dark-mode .trust-card,
body.amp-dark-mode .glass-header {
  background-color: #1e293b;
  border-color: #334155;
}

body.amp-dark-mode .bg-surface-50,
body.amp-dark-mode .bg-surface-100 {
  background-color: #0f172a;
}

body.amp-dark-mode .bg-surface-200,
body.amp-dark-mode .bg-surface-300 {
  background-color: #334155;
}

body.amp-dark-mode .text-surface-900,
body.amp-dark-mode h1,
body.amp-dark-mode h2,
body.amp-dark-mode h3,
body.amp-dark-mode h4,
body.amp-dark-mode h5,
body.amp-dark-mode h6 {
  color: #f8fafc;
}

body.amp-dark-mode .text-surface-700,
body.amp-dark-mode .text-surface-600,
body.amp-dark-mode .text-surface-500,
body.amp-dark-mode p {
  color: #cbd5e1;
}

body.amp-dark-mode .border-surface-200,
body.amp-dark-mode .border-surface-100,
body.amp-dark-mode .border-surface-300 {
  border-color: #334155;
}

body.amp-dark-mode input,
body.amp-dark-mode select,
body.amp-dark-mode textarea {
  background-color: #0f172a;
  color: #f8fafc;
  border-color: #334155;
}

body.amp-dark-mode .badge-category {
  background-color: #082f49;
  color: #7dd3fc;
  border-color: #075985;
}

body.amp-dark-mode .badge-sale {
  background-color: #4c0519;
  color: #fda4af;
  border-color: #9f1239;
}

body.amp-dark-mode amp-sidebar {
  background-color: #0f172a;
  color: #f8fafc;
}

body.amp-dark-mode amp-sidebar a {
  color: #cbd5e1;
}

body.amp-dark-mode amp-sidebar a:hover {
  color: #38bdf8;
}

/* Sun/Moon Toggle Icons */
.sun {
  display: none;
}
.moon {
  display: inline;
}
body.amp-dark-mode .sun {
  display: inline;
}
body.amp-dark-mode .moon {
  display: none;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-main);
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

    // Clean body tag for native AMP theme switching
    html = html.replace(/<body[^>]*>/i, '<body class="transition-colors duration-200 max-w-full overflow-x-hidden">');

    // Ensure theme toggle button uses on="tap:AMP.toggleTheme()" with sun/moon spans
    if (html.includes('id="theme-toggle-btn"')) {
      const nativeThemeBtn = `<button id="theme-toggle-btn" type="button" aria-label="Toggle theme" on="tap:AMP.toggleTheme()" class="bg-surface-800 hover:bg-surface-700 text-surface-200 px-2.5 py-1 rounded-lg text-xs transition flex items-center justify-center gap-1 cursor-pointer border-none font-medium">
          <span class="moon" aria-hidden="true">🌙</span>
          <span class="sun" aria-hidden="true">☀️</span>
        </button>`;
      html = html.replace(/<button id="theme-toggle-btn"[\s\S]*?<\/button>/i, nativeThemeBtn);
    }

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
