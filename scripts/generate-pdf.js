// Genera _site/assets/cv.pdf (+ copia datata) a partire da _site/cv/index.html.
// Va eseguito DOPO `jekyll build` e PRIMA di caricare l'artifact di Pages / Cloudflare.
//
// IMPORTANTE: la pagina viene servita via HTTP locale, non aperta con file://.
// _layouts/print.html carica il CSS con un path root-relative (es. "/assets/css/print.css"),
// generato da Jekyll tramite `relative_url`. Sotto file://, un path che comincia con "/"
// viene risolto rispetto alla root del FILESYSTEM, non del sito, quindi il CSS non
// caricherebbe mai e il PDF uscirebbe senza stile (font di default, nessun colore).
// Servendo _site su http://127.0.0.1, il path root-relative si risolve correttamente
// esattamente come farebbe in produzione dietro Cloudflare Pages.

const http = require("http");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".pdf": "application/pdf",
};

function serveStatic(rootDir) {
  return http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath.endsWith("/")) urlPath += "index.html";
    const filePath = path.join(rootDir, urlPath);

    // protezione minima da path traversal
    if (!filePath.startsWith(rootDir)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("Not found: " + urlPath);
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(data);
    });
  });
}

function today() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

(async () => {
  const sitePath = path.resolve(__dirname, "..", "_site");
  const cvHtmlPath = path.join(sitePath, "cv", "index.html");
  const outputDir = path.join(sitePath, "assets");
  const datedOutputPath = path.join(outputDir, `${today()}-UmbertoCalo-CV.pdf`);
  const stableOutputPath = path.join(outputDir, "cv.pdf");

  if (!fs.existsSync(cvHtmlPath)) {
    console.error(`Non trovo ${cvHtmlPath}. Hai lanciato "jekyll build" prima di questo script?`);
    process.exit(1);
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const server = serveStatic(sitePath);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/cv/`, { waitUntil: "networkidle0" });

    // sanity check: se il CSS non è stato applicato, il font-family del body
    // resta quello di default del browser invece di finire con "serif" (Source Serif 4).
    const fontFamily = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
    if (!fontFamily.toLowerCase().includes("serif")) {
      console.warn(`Attenzione: font-family calcolato è "${fontFamily}" — il CSS potrebbe non essersi caricato.`);
    }

    await page.pdf({
      path: datedOutputPath,
      format: "A4",
      printBackground: true,
      margin: { top: "16mm", bottom: "16mm", left: "16mm", right: "16mm" },
    });

    fs.copyFileSync(datedOutputPath, stableOutputPath);

    console.log(`PDF generato: ${datedOutputPath}`);
    console.log(`Copiato come: ${stableOutputPath}`);
  } finally {
    await browser.close();
    server.close();
  }
})();
