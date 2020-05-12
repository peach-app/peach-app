const nodemailer = require('nodemailer');

const { MAIL_USER, MAIL_PASS } = process.env;

if (!MAIL_USER) {
  console.error(`No MAIL_USER found... \nrun: export MAIL_USER=YourMailUser`);
}

if (!MAIL_PASS) {
  console.error(`No MAIL_PASS found... \nrun: export MAIL_PASS=YourMailPass`);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

const sendMail = ({ to, subject, text, html }) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: MAIL_USER,
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
