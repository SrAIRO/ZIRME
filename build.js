#!/usr/bin/env node
/**
 * ZIRME Build Script
 * Compiles _source.html (JSX) → index.html (plain JS, no Babel runtime needed)
 * Run with: node build.js
 *
 * Setup (first time):
 *   npm install --prefix ./node_modules_build @babel/core @babel/preset-react @babel/preset-env
 */
const fs = require("fs");
const path = require("path");

let babel;
try {
  babel = require("./node_modules_build/node_modules/@babel/core");
} catch {
  try {
    babel = require("/tmp/zbuild/node_modules/@babel/core");
  } catch {
    console.error("Babel not found. Run: npm install --prefix ./node_modules_build @babel/core @babel/preset-react @babel/preset-env");
    process.exit(1);
  }
}

const srcPath = path.join(__dirname, "_source.html");
const outPath = path.join(__dirname, "index.html");

if (!fs.existsSync(srcPath)) {
  console.error("Source file _source.html not found.");
  process.exit(1);
}

const html = fs.readFileSync(srcPath, "utf8");

const startMarker = '<script type="text/babel">';
const startIdx = html.indexOf(startMarker);
if (startIdx === -1) { console.error("No <script type=\"text/babel\"> found in _source.html"); process.exit(1); }

const jsxStart = startIdx + startMarker.length;
const lastEnd = html.lastIndexOf("</script>");
const jsxCode = html.slice(jsxStart, lastEnd);

console.log("Compiling JSX…");
const result = babel.transformSync(jsxCode, {
  presets: [
    ["./node_modules_build/node_modules/@babel/preset-react", { runtime: "classic" }],
    ["./node_modules_build/node_modules/@babel/preset-env", {
      targets: { browsers: ["last 2 Chrome versions", "last 2 Firefox versions", "last 2 Safari versions"] },
      modules: false,
    }]
  ],
  configFile: false,
  babelrc: false,
});

const withoutBabel = html.replace(
  '  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.2/babel.min.js"></script>\n',
  ""
);

const before = withoutBabel.slice(0, withoutBabel.indexOf(startMarker));
const after = withoutBabel.slice(withoutBabel.lastIndexOf("</script>") + "</script>".length);
const output = before + "<script>\n" + result.code + "\n</script>" + after;

fs.writeFileSync(outPath, output);
console.log(`Done → index.html  (${(output.length / 1024).toFixed(0)} KB, ${output.split("\n").length} lines)`);
