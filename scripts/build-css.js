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
  --background: #f8fafc;
  --surface: #ffffff;
  --text: #0f172a;
  --muted: #64748b;
  --border: #e2e8f0;
  --accent: #0284c7;
}

@media (prefers-color-scheme: dark) {
  body:not(.amp-dark-mode) {
  }
}

body.amp-dark-mode {
  --background: #0f172a;
  --surface: #1e293b;
  --text: #f8fafc;
  --muted: #94a3b8;
  --border: #334155;
  --accent: #38bdf8;
  background-color: #0f172a;
  color: #f8fafc;
}

body.amp-dark-mode .bg-white {
  background-color: #1e293b;
}
body.amp-dark-mode .text-surface-900 {
  color: #f8fafc;
}
body.amp-dark-mode .text-surface-600,
body.amp-dark-mode .text-surface-500 {
  color: #cbd5e1;
}
body.amp-dark-mode .border-surface-200 {
  border-color: #334155;
}
body.amp-dark-mode .bg-surface-50,
body.amp-dark-mode .bg-surface-100 {
  background-color: #0f172a;
}

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
  background-color: var(--background);
  color: var(--text);
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
