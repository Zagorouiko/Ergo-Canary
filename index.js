const nodemailer = require("nodemailer");
const cron = require('node-cron');
const dotenv = require('dotenv');
const browserObject = require('./browser');
const scraper = require('./scraper')
const helpers = require('./helpers')
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: 'zagorouiko@gmail.com',
    pass: process.env.GOOGLE_APP_KEY
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


let currentPrices
let previousPrices

async function main() {
// cron.schedule('* * * * *', async () => {

  //1. read previous price file and set to var
  if (currentPrices) {
    previousPrices = currentPrices
  }
  
  //2. scrape new price and set to var
  let browser = await browserObject.startBrowser();
  let newPriceObj = await scraper.scraper(browser);
  currentPrices = newPriceObj

  // Do a check initially to see if previousPrices is undefined - Skip
  // if (!previousPrices) { return }
  // let priceDifference = helpers.priceDifference(previousPrices, currentPrices)

  await transporter.sendMail({
    from: '"Ergo Canary"',
    to: "zagorouiko@gmail.com", 
    subject: "Price difference detected!",
    html: `TESTING`
  });

  // if (priceDifference.isLargeDifference) {
  //   const info = await transporter.sendMail({
  //     from: '"Ergo Canary"',
  //     to: "zagorouiko@gmail.com", 
  //     subject: "Price difference detected!",
  //     html: `
  //      <b>priceDifference:</b> ${priceDifference.percentageDifference.toFixed(2)}%<br/>
  //      <b>rank:</b> ${priceDifference.rank}<br/>
  //      <b>address:</b> ${priceDifference.address}<br/>
       
  //      `
  //   });
  // }
// });
}

module.exports = main()
// main().catch(console.error);
