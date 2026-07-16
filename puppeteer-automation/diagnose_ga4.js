const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  let ga4Hits = [];
  page.on('request', request => {
    const url = request.url();
    if (url.includes('google-analytics.com/g/collect') || url.includes('/g/collect')) {
      console.log('--> GA4 HIT DETECTED:', url.substring(0, 150) + '...');
      ga4Hits.push(url);
    }
  });

  console.log('Navigating to https://amankumarr.in ...');
  await page.goto('https://amankumarr.in', { waitUntil: 'networkidle2' });
  
  console.log('Waiting 5 seconds...');
  await new Promise(r => setTimeout(r, 5000));
  
  console.log(`Total GA4 Hits: ${ga4Hits.length}`);
  
  const hasGtag = await page.evaluate(() => typeof gtag === 'function');
  const dataLayer = await page.evaluate(() => window.dataLayer || []);
  console.log('Has gtag:', hasGtag);
  console.log('DataLayer length:', dataLayer.length);
  const gaConfig = dataLayer.find(d => d[0] === 'config' && typeof d[1] === 'string' && d[1].startsWith('G-'));
  if (gaConfig) console.log('GA4 Measurement ID:', gaConfig[1]);
  
  await browser.close();
})();
