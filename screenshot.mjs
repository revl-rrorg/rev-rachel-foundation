import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlFile = path.join(__dirname, 'index.html');
const url = `file://${htmlFile}`;

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none']
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

// Load fonts
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));

// 1. Hero
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: path.join(__dirname, 'shot-hero.jpg'), type: 'jpeg', quality: 90, clip: { x: 0, y: 0, width: 1440, height: 900 } });
console.log('✓ hero');

// 2. Mission section
const missionEl = await page.$('#mission');
const missionBox = await missionEl.boundingBox();
await page.evaluate((y) => window.scrollTo({ top: y - 80, behavior: 'instant' }), missionBox.y);
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: path.join(__dirname, 'shot-mission.jpg'), type: 'jpeg', quality: 90, clip: { x: 0, y: missionBox.y - 80, width: 1440, height: 900 } });
console.log('✓ mission');

// 3. Organizations
const orgEl = await page.$('#organizations');
const orgBox = await orgEl.boundingBox();
await page.evaluate((y) => window.scrollTo({ top: y - 80, behavior: 'instant' }), orgBox.y);
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: path.join(__dirname, 'shot-orgs.jpg'), type: 'jpeg', quality: 90, clip: { x: 0, y: orgBox.y - 80, width: 1440, height: 900 } });
console.log('✓ organizations');

// 4. Impact + Armenia
const impactEl = await page.$('#impact');
const impactBox = await impactEl.boundingBox();
await page.evaluate((y) => window.scrollTo({ top: y - 80, behavior: 'instant' }), impactBox.y);
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: path.join(__dirname, 'shot-impact.jpg'), type: 'jpeg', quality: 90, clip: { x: 0, y: impactBox.y - 80, width: 1440, height: 900 } });
console.log('✓ impact');

// 5. Contact
const contactEl = await page.$('#contact');
const contactBox = await contactEl.boundingBox();
await page.evaluate((y) => window.scrollTo({ top: y - 80, behavior: 'instant' }), contactBox.y);
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: path.join(__dirname, 'shot-contact.jpg'), type: 'jpeg', quality: 90, clip: { x: 0, y: contactBox.y - 80, width: 1440, height: 900 } });
console.log('✓ contact');

await browser.close();
console.log('done');
