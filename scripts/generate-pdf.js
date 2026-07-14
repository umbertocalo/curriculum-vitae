// Genera _site/assets/YYYY-MM-DD-UmbertoCalo-CV.pdf e copia come cv.pdf.
// Va eseguito DOPO `jekyll build` e PRIMA di caricare l'artifact di Pages.
// Usa Chromium headless via Puppeteer: nessuna gem Ruby matura fa questo lavoro
// in modo affidabile oggi, quindi la conversione vive fuori dall'ecosistema Jekyll.

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

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
  const outputPath = path.join(outputDir, `${today()}-UmbertoCalo-CV.pdf`);

  if (!fs.existsSync(cvHtmlPath)) {
    console.error(`Non trovo ${cvHtmlPath}. Hai lanciato "jekyll build" prima di questo script?`);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.emulateMediaType("screen");
    await page.goto("file://" + cvHtmlPath, { waitUntil: "networkidle0" });

    // Forza tema light e accent blue
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.setAttribute("data-accent", "blue");
    });

    // Inietta stile print: copre header, footer, tag-list, tema e paginazione
    await page.evaluate(() => {
      const style = document.createElement("style");
      style.textContent = `
        @page { size: A4; margin: 0; }

        body { font-size: 15.5px; }

        .site-header, .site-footer, .theme-toggle, .download-btn, .tag-list, script {
          display: none !important;
        }

        .wrap {
          max-width: 100%;
          padding: 0;
          margin: 0;
        }

        .entry {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        p {
          break-inside: avoid;
          page-break-inside: avoid;
          orphans: 3;
          widows: 3;
        }

        h2 {
          margin-top: 1.5rem;
          font-size: 0.85rem;
        }

        .entry { margin-bottom: 1.1rem; }

        .hero p.tagline { margin-top: -0.2rem; }

        a { text-decoration: none; }

        .footer {
          margin-top: 2rem;
          padding-top: 0.6rem;
          border-top: 1px solid var(--border);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-faint);
        }
      `;
      document.head.appendChild(style);
    });

    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: "16mm", bottom: "16mm", left: "16mm", right: "16mm" },
    });

    // Copia anche come cv.pdf per il link di download nell'header
    fs.copyFileSync(outputPath, path.join(outputDir, "cv.pdf"));

    console.log(`PDF generato: ${outputPath}`);
  } finally {
    await browser.close();
  }
})();
