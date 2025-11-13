const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const filePath = path.join(__dirname, 'index.html');
  await page.goto(`file://${filePath}`);

  const downloadPromise = page.waitForEvent('download');
  await page.click('#export-button');
  const download = await downloadPromise;

  await download.saveAs('verification/narrow_margin_verification.pdf');

  await browser.close();
})();
