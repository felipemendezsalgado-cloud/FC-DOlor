const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Listen for console events
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  try {
    await page.goto(`file://${__dirname}/index.html`, { waitUntil: 'networkidle' });

    // Take a screenshot to see what the page looks like
    await page.screenshot({ path: 'debug_screenshot.png' });
    console.log('Debug screenshot saved as debug_screenshot.png');

    // Wait for the button to be available before clicking
    await page.waitForSelector('#export-button', { timeout: 10000 });

    // Start waiting for the download with a longer timeout
    const downloadPromise = page.waitForEvent('download', { timeout: 60000 });

    await page.click('#export-button');

    // Wait for the download to complete
    const download = await downloadPromise;

    // Save the downloaded file
    await download.saveAs('exported_quiz.pdf');

    console.log('PDF exported successfully to exported_quiz.pdf');
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
})();
