const nodemailer = require("nodemailer");
const cron = require('node-cron');
const dotenv = require('dotenv');
const browserObject = require('./browser');
const scraper = require('./scraper')
const helpers = require('./helpers')
dotenv.config();
const express = require('express')
const app = express()


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
let newPriceObj

async function main() {

cron.schedule('0 0 * * *', async () => {

  //1. read previous price file and set to var
  if (currentPrices) {
    previousPrices = currentPrices
  }
  
  //2. scrape new price and set to var
  const browser = await browserObject.startBrowser()

  if (browser) {
    console.log("running scraper")
    newPriceObj = await scraper.scraper(browser)

    currentPrices = newPriceObj

    // Do a check initially to see if previousPrices is undefined - Skip
    if (!previousPrices) { return }
    let priceDifference = helpers.priceDifference(previousPrices, currentPrices)

    if (priceDifference.isLargeDifference) {
      const info = await transporter.sendMail({
        from: '"Ergo Canary"',
        to: "zagorouiko@gmail.com", 
        subject: "Price difference detected!",
        html: `
         <b>priceDifference:</b> ${priceDifference.percentageDifference.toFixed(2)}%<br/>
         <b>rank:</b> ${priceDifference.rank}<br/>
         <b>address:</b> ${priceDifference.address}<br/>     
         `
      });
    }
  } 
});
}


main().catch(console.error);
