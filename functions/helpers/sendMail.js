const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = ({ to, subject, text, html }) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.MAIL_USER,
        to,
        subject,
        text,
        html,
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
