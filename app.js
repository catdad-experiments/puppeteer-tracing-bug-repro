#!/usr/bin/env node

const puppeteer = require('puppeteer');
const { large: text } = require('./lib/text');
const { sleep, screenshot, output, time, copy } = require('./lib/utils');

const appUrl = 'https://api.accusoft.com/editor/';

// Docker-based CIs need this disabled
// https://github.com/Quramy/puppeteer-example/blob/c28a5aa52fe3968c2d6cfca362ec28c36963be26/README.md#with-docker-based-ci-services
const args = process.env.CI ? [
  '--no-sandbox', '--disable-setuid-sandbox'
] : [];

const launch = async () => {
  return await puppeteer.launch({
    args,
    headless: false,
    defaultViewport: null,
  });
};

const initDoc = async (page) => {
  await page.goto('about:blank');
  await page.goto(appUrl);
  await page.waitForSelector('.doc-preview.item-blank');
  await page.click('.doc-preview.item-blank');
  await page.click('.dialog-page-action-bar button');
};

time((async () => {
  const docpage = '#page-1 .page-content';
  const doccolumn = `${docpage} .page-column`;

  const browser = await launch();

  await copy(browser, text);

  const page = await browser.newPage();
  await initDoc(page);

  await sleep(5000);

  await page.waitForSelector(docpage);
  await screenshot(page, '1-pre-paste.png');

  await page.tracing.start({ screenshots: true });

  await sleep(1000);

  await page.click(doccolumn);
  await sleep(1000);
  await page.keyboard.down('Control');
  await page.keyboard.down('v');
  await page.keyboard.up('v');
  await page.keyboard.up('Control');

  await sleep(5000);
  await screenshot(page, '2-end.png');

  await output('trace.json', await page.tracing.stop());

  await browser.close();
})())
  .catch(err => {
    console.log(err);
    process.exitCode = 1;
  });
