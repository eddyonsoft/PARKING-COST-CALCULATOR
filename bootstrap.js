/* puppeteer import */
const puppeteer = require('puppeteer');
let browser;

/* domain and headless status should pass through the test */
const load = async (domain, headlessStatus) => {
    /* configurable options or object for puppeteer */
    const opts = {
        headless: headlessStatus,
        // by slowMo value it will slow down Puppeteer when performing each operation
        slowMo: 50,
        timeout: 0,
        args: ['--start-maximized', '--window-size=1920,1040']
    }

    /* puppeteer config to launch browser instance and load the 
     *  requested domain. 
     */
    browser = await puppeteer.launch(opts);
    let page = await browser.newPage();
    page.setDefaultTimeout(1000 * 60 * 5);
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(domain, { waitUntil: 'networkidle0' });
    return page;
};

const close = async () => {
    await browser.close();
};
module.exports = { load, close };