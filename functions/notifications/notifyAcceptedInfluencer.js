const { Expo } = require('expo-server-sdk');
const sendMail = require('../helpers/sendMail');

const expo = new Expo();
const notifyAcceptedInfluencer = (influencer, brand) => {
  if (
    influencer.hasEnabledPushNotifications &&
    Expo.isExpoPushToken(influencer.notificationsToken)
  ) {
    (async () => {
      await expo.sendPushNotificationsAsync([
        {
          to: influencer.notificationsToken,
          sound: 'default',
          title: 'You have been accepted!',
          body: `${brand} has accepted you to their campaign! You can now message them if you have any questions.`,
        },
      ]);
    })();
  } else {
    (async () => {
      await sendMail({
        to: influencer.email,
        subject: 'You have been accepted!',
        text: `Hi ${influencer.name},

        ${brand} has accepted you to their campaign!

        You can now message them if you have any questions.

        Thank you,
        Team Peach`,
        html: `
        <p>Hi ${influencer.name},</p>

        <p>${brand} has accepted you to their campaign!</p>

        <p>You can now message them if you have any questions.</p>

        <p>Thank you,</p>
        <p>The Peach Team</p>`,
      });
    })();
  }
};

module.exports = notifyAcceptedInfluencer;
