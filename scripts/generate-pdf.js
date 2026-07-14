// Genera _site/assets/cv.pdf a partire da _site/cv/index.html.
// Va eseguito DOPO `jekyll build` e PRIMA di caricare l'artifact di Pages.
// Usa Chromium headless via Puppeteer: nessuna gem Ruby matura fa questo lavoro
// in modo affidabile oggi, quindi la conversione vive fuori dall'ecosistema Jekyll.

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

(async () => {
  const sitePath = path.resolve(__dirname, "..", "_site");
  const cvHtmlPath = path.join(sitePath, "cv", "index.html");
  const outputPath = path.join(sitePath, "assets", "cv.pdf");

  if (!fs.existsSync(cvHtmlPath)) {
    console.error(`Non trovo ${cvHtmlPath}. Hai lanciato "jekyll build" prima di questo script?`);
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.emulateMediaType("print");
    await page.goto("file://" + cvHtmlPath, { waitUntil: "networkidle0" });

    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: "16mm", bottom: "16mm", left: "16mm", right: "16mm" },
    });

    console.log(`PDF generato: ${outputPath}`);
  } finally {
    await browser.close();
  }
})();
