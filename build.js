const fs = require("fs");
const path = require("path");

const root = __dirname;
const outDir = path.join(root, "public");
const files = [
  "index.html",
  "dashboard.html",
  "mylearning.html",
  "courses.html",
  "aiasistant.html",
  "promptlibrary.html",
  "community.html",
  "workplace.html",
  "analytics.html",
  "portfolio.html",
  "badge.html",
  "settings.html",
  "styles.css",
  "app.js",
  "README.md",
];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(outDir, file));
}

console.log(`Static site built to ${outDir}`);
