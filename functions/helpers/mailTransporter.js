const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'peachapp.io@gmail.com',
    pass: 'hxtgqwzfxisxiosd',
  },
});

module.exports = transporter;
