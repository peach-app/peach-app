const { Expo } = require('expo-server-sdk');
const sendMail = require('../helpers/sendMail');

const expo = new Expo();
const notifyBrandForApplication = (brand, influencer) => {
  if (
    brand.hasEnabledPushNotifications &&
    Expo.isExpoPushToken(brand.notificationsToken)
  ) {
    (async () => {
      await expo.sendPushNotificationsAsync([
        {
          to: brand.notificationsToken,
          sound: 'default',
          title: '1 new application!',
          body: `${influencer} has applied to your campaign. Open the app to action it.`,
        },
      ]);
    })();
  } else {
    (async () => {
      await sendMail({
        to: brand.email,
        subject: '1 new application!',
        text: `Hi ${brand.name},

        ${influencer} has applied to your campaign!

        Login into the app to action it.

        Thank you,
        Team Peach`,
        html: `
        <p>Hi ${brand.name},</p>

        <p>${influencer} has applied to your campaign!</p>

        <p>Login into the app to action it.</p>

        <p>Thank you,</p>
        <p>The Peach Team</p>`,
      });
    })();
  }
};

module.exports = notifyBrandForApplication;
