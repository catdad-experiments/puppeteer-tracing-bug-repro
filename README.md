# puppeteer-tracing-bug-repro

This repo is meant to show the reproduction steps for this puppeteer issue: https://github.com/GoogleChrome/puppeteer/issues/3913

You can reproduce the issue as such:

```bash
git clone git@github.com:catdad-experiments/puppeteer-tracing-bug-repro.git
cd puppeteer-tracing-bug-repro
npm install
node app.js
```

When you run this, it will generate a performance trace in `output/trace.json`, which can be opened by dragging and dropping it into the Performance tab of Chrome Dev Tools.

_Please excuse any bad practices in the code. It is meant to reproduce an issue rather than demonstrate the best way to automate this test scenario._
