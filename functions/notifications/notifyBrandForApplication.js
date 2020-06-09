const { Expo } = require('expo-server-sdk');
const get = require('lodash/fp/get');
const sendMail = require('../helpers/sendMail');

const expo = new Expo();

const notifyBrandForApplication = (brand, influencer) => {
  if (
    get('data.preferences.pushAlerts', brand) &&
    Expo.isExpoPushToken(brand.data.pushToken)
  ) {
    (async () => {
      await expo.sendPushNotificationsAsync([
        {
          to: brand.data.pushToken,
          sound: 'default',
          title: '1 new application!',
          body: `${influencer.data.name} has applied to your campaign. Open the app to action it.`,
        },
      ]);
    })();
  }

  if (get('data.preferences.emailAlerts', brand)) {
    (async () => {
      await sendMail({
        to: brand.data.email,
        subject: '1 new application!',
        text: `Hi ${brand.data.name},

        ${influencer.data.name} has applied to your campaign!

        Login into the app to action it.

        Thank you,
        Team Peach`,
        html: `
        <p>Hi ${brand.data.name},</p>

        <p>${influencer.data.name} has applied to your campaign!</p>

        <p>Login into the app to action it.</p>

        <p>Thank you,</p>
        <p>The Peach Team</p>`,
      });
    })();
  }
};

module.exports = notifyBrandForApplication;
