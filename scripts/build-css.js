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
  const theme = localStorage.getItem("antinna_theme") || "light";
  const currency = localStorage.getItem("antinna_currency") || "USD";
  const rate = currency === "USD" ? 1.0 : (currency === "EUR" ? 0.92 : (currency === "GBP" ? 0.78 : 3.67));
  const symbol = currency === "USD" ? "$" : (currency === "EUR" ? "€" : (currency === "GBP" ? "£" : "د.إ"));
  AMP.setState({ storeState: { theme, currency, rate, symbol } });
}

updateState();

const themeBtn = document.getElementById("theme-toggle-btn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    let currentTheme = localStorage.getItem("antinna_theme") || "light";
    let newTheme = currentTheme === "light" ? "dark" : "light";
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

const customExtraCss = `
a {
  text-decoration: none;
}
.dark {
  background-color: #0f172a;
  color: #f8fafc;
}
.light {
  background-color: #f8fafc;
  color: #0f172a;
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
amp-carousel .amp-carousel-slide {
  height: 100%;
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

    // Standardize initial theme state across all files to "light"
    html = html.replace(/"theme":\s*"[^"]*"/g, '"theme": "light"');

    // Fix amp-carousel slide heights for responsive layout
    if (file === "index.html") {
      html = html.replace(/<amp-carousel width="1200" height="420" layout="responsive"/i, '<amp-carousel width="1200" height="320" layout="responsive"');
    }

    // Ensure body tag uses storeState.theme class binding for dark/light mode
    if (!html.includes('[class]="storeState.theme')) {
      html = html.replace(/<body[^>]*>/i, '<body [class]="storeState.theme + \' transition-colors duration-200 max-w-full overflow-x-hidden\'" class="light transition-colors duration-200 max-w-full overflow-x-hidden">');
    }

    const res = await uno.generate(html);
    const compiledCss = res.css + "\n" + customExtraCss;

    // Inject compiled CSS into <style amp-custom>
    html = html.replace(/<style amp-custom>[\s\S]*?<\/style>/i, `<style amp-custom>\n${compiledCss}\n</style>`);

    // Ensure amp-script extension script is in head
    if (!html.includes('custom-element="amp-script"')) {
      html = html.replace('</head>', '  <script async custom-element="amp-script" src="https://cdn.ampproject.org/v0/amp-script-0.1.js"></script>\n</head>');
    }

    // Ensure state controls are wrapped in amp-script container
    if (html.includes('id="currency-select"') && !html.includes('id="state-manager"')) {
      const newControls = `<amp-script id="state-manager" script="state-script" layout="container" class="inline-flex items-center gap-2 sm:gap-4">
          <div class="flex items-center gap-1">
            <label for="currency-select" class="text-surface-400 text-[10px] sm:text-xs">Currency:</label>
            <select id="currency-select" class="bg-surface-800 text-white border border-surface-700 rounded-lg px-2 py-0.5 text-[10px] sm:text-xs focus:outline-none">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AED">AED (د.إ)</option>
            </select>
          </div>

          <button class="bg-surface-800 hover:bg-surface-700 text-surface-200 px-2.5 py-0.5 rounded-lg text-[10px] sm:text-xs transition cursor-pointer font-medium"
            on="tap:AMP.setState({ storeState: { dir: storeState.dir == 'ltr' ? 'rtl' : 'ltr', lang: storeState.dir == 'ltr' ? 'ar' : 'en' } })">
            <span [text]="storeState.dir == 'ltr' ? '🌐 RTL' : '🌐 LTR'">🌐 RTL</span>
          </button>

          <button id="theme-toggle-btn" class="bg-surface-800 hover:bg-surface-700 text-surface-200 px-2.5 py-0.5 rounded-lg text-[10px] sm:text-xs transition flex items-center gap-1 cursor-pointer font-medium"
            on="tap:AMP.setState({ storeState: { theme: storeState.theme == 'dark' ? 'light' : 'dark' } })">
            <span [text]="storeState.theme == 'dark' ? '☀️ Light' : '🌙 Dark'">🌙 Dark</span>
          </button>
        </amp-script>
      </div>`;
      html = html.replace(/<div class="flex flex-wrap items-center gap-2 sm:gap-4">[\s\S]*?<\/div>\s*<\/div>/i, newControls);
    }

    // Ensure amp-script script and hash meta tag are present with correct type="text/plain"
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
