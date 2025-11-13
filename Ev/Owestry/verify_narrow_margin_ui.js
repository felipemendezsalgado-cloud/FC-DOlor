const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const filePath = path.join(__dirname, 'index.html');
  await page.goto(`file://${filePath}`);
  await page.screenshot({ path: '/home/jules/verification/narrow_margin_verification.png' });
  await browser.close();
})();
