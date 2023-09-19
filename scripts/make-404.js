import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const source_html = resolve(__dirname, "../dist/index.html");
const target_html = resolve(__dirname, "../dist/404.html");

import { copyFile } from "fs/promises";

copyFile(source_html, target_html)
  .then(() => {
    console.log("copied dist/index.html to dist/404.html");
  })
  .catch((err) => {
    console.error(err);
  });
