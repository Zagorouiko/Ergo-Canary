const nodemailer = require("nodemailer");
const cron = require('node-cron');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: 'zagorouiko@gmail.com',
    pass: 'lhoqmbcmpropoyie'
  }
});

async function main() {
cron.schedule('* * * * *', async () => {
  const info = await transporter.sendMail({
    from: '"Blockchain Canary" <foo@example.com>',
    to: "zagorouiko@gmail.com", 
    subject: "Hello ✔ - Blockchain Canary",
    text: "Hello world?", 
    html: "<b>Hello world?</b>", 
  });
  console.log("Message sent: %s", info.messageId);
});


  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>

}

main().catch(console.error);
