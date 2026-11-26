// Extrae los bloques <script> sin src de index.html y les pasa node --check.
// Uso: node scripts/check-inline-scripts.mjs (desde la raíz del frontend).
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const html = readFileSync("index.html", "utf8");
const blocks = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
  .map((m) => m[1])
  .filter((code) => code.trim().length > 0);
if (!blocks.length) {
  console.error("no inline scripts found");
  process.exit(1);
}
const dir = mkdtempSync(join(tmpdir(), "cc-scripts-"));
blocks.forEach((code, i) => {
  const file = join(dir, `script-${i}.js`);
  writeFileSync(file, code);
  execFileSync(process.execPath, ["--check", file], { stdio: "inherit" });
  console.log(`script ${i}: ok (${code.length} chars)`);
});
console.log(`all ${blocks.length} inline scripts pass node --check`);
