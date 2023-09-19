import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const source_html = resolve(__dirname, "../index.html");
const target_html = resolve(__dirname, "../404.html");

import { copyFile } from "fs/promises";

await copyFile(source_html, target_html);
