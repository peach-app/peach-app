const nodemailer = require('nodemailer');

console.log('Nodemailer user', process.MAIL_USER);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.MAIL_USER,
    pass: process.MAIL_PASS,
  },
});

const sendMail = ({ to, subject, text }) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.MAIL_USER,
        to,
        subject,
        text,
      },
      (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      }
    );
  });
};

module.exports = sendMail;
