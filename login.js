const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const config = require("./config.json");
const fs = require("fs");
puppeteer.use(StealthPlugin());
const dotenv = require("dotenv");
dotenv.config();

async function login() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    slowMo: 10,
    executablePath:
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  });

  const page = await browser.pages();

  await page[0].setUserAgent(config.userAgent);

  await page[0].goto(
    "https://www.chegg.com/auth?action=login&redirect=https%3A%2F%2Fwww.chegg.com%2F",
    { waitUntil: "networkidle2" }
  );
  await page[0].type("#emailForSignIn", config.email, {
    delay: generateDelay(80, 110),
  });
  await page[0].type("#passwordForSignIn", config.password, {
    delay: generateDelay(80, 110),
  });
  await page[0].click(".login-button");
  await page[0].waitForTimeout(3000);

  const cookies = await page[0].cookies();
  fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 2));
}

const generateDelay = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
