const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();
    await page.setContent("<h1>Hello World!</h1>");
    await page.emulateMediaType("screen");

    let pdf = await page.pdf({
      format: "letter",
    });

    await browser.close();
    process.exit;
    res.contentType("application/pdf");

    // optionally:
    res.setHeader("Content-Disposition", "inline; filename=invoice.pdf");
    res.send(pdf);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
