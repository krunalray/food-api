var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.MAIL_ID, // TODO: your gmail account
      pass: process.env.MAIL_KEY // TODO: your gmail password
  }
});

function Mail() {

  this.sendHtml = function(mailFrom, mailTo, subject, html, callback) {
    transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      html: html,
    }, function(err){
      if(err){
        console.error(err);
      }
    });
  }
}

module.exports = new Mail();
