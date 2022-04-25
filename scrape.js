const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cookies = require("./cookies.json");
const fs = require("fs");
const config = require("./config.json");

puppeteer.use(StealthPlugin());

async function scrape(url) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    slowMo: 10,
    executablePath:
      config.path
  });

  const page = await browser.pages();
  await page[0].setUserAgent(config.userAgent);
  await page[0].setCookie(...cookies);
  await page[0].goto(url, { waitUntil: "load" });

  if ((await page[0].$(".ugc-base")) !== null) {
    const elem = await page[0].evaluate(() => {
      let htmlContent = "<html><body><h1>Question</h1>";
      const children = Array.from(document.querySelectorAll(".ugc-base"));
      htmlContent += children[0].innerHTML;
      htmlContent += "<h1>Answer</h1>" + children[1].innerHTML;
      htmlContent += "<html><body>";
      return htmlContent;
    });

    fs.writeFile("./chegg.html", elem, (error) => {
      console.log(error);
    });
    console.log('found')

    await browser.close();
  } else {
    await browser.close();
    return; 
  }
}


module.exports = scrape;
