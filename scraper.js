async function scraper(browser) {
  let url = "https://explorer.ergoplatform.com/en/rich-list";
  let page = await browser.newPage();
  console.log(`Navigating to ${url}`);
  await page.goto(url);

  await page.waitForSelector(".rich-list-table__body.bi-table a");
  const prices = await page.$$(".rich-list-table__cell.bi-table__cell.bi-tokens-table__cell > span");
  const addresses = await page.$$(".rich-list-table__body.bi-table a");

  let array = []
  for (let i = 0; i < prices.length; i++) {
    let address = await page.evaluate((el) => el.getAttribute('href'), addresses[i])
    let parsedAddress = address.slice(14)

    let text = await page.evaluate((el) => el.innerText, prices[i])
    let formattedPrice = text.replace(/,/g, '')
    let price = formattedPrice.split(".")[0]

    let obj = {
      rank: i+1,
      quantity: parseInt(price),
      address: parsedAddress
    }
    array.push(obj)
  }
  return array
}

async function startBrowser(){
	let browser;
	try {
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch({
	        headless: true,
	        args: ["--disable-setuid-sandbox"],
	        ignoreHTTPSErrors: true
	    });
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = { scraper };
