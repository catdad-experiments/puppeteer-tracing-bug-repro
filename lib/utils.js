const fs = require('fs-extra');

const sleep = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const output = async (filename, content) => {
  await fs.outputFile(`output/${filename}`, content);
};

const screenshot = async (page, filename) => {
  await output(filename, await page.screenshot({ encoding: 'buffer' }));
};

const time = promise => {
  // eslint-disable-next-line no-console
  const { time, timeEnd } = console;

  time('Done in');
  promise.finally(() => {
    timeEnd('Done in');
  });

  return promise;
};

const copy = async (browser, text) => {
  const page = await browser.newPage();
  await page.goto('about:blank');
  await page.evaluate(txt => {
    // eslint-disable-next-line no-undef
    document.write(txt);
  }, text);

  await page.keyboard.down('Control');
  await page.keyboard.down('a');
  await page.keyboard.up('a');
  await page.keyboard.up('Control');

  await page.keyboard.down('Control');
  await page.keyboard.down('c');
  await page.keyboard.up('c');
  await page.keyboard.up('Control');

  await page.close();
};

module.exports = { copy, time, sleep, output, screenshot };
