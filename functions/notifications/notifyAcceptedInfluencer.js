const { Expo } = require('expo-server-sdk');
const sendMail = require('../helpers/sendMail');

const expo = new Expo();

const notifyAcceptedInfluencer = (influencer, brand) => {
  if (
    influencer.data.preferences.pushAlerts &&
    Expo.isExpoPushToken(influencer.data.pushToken)
  ) {
    expo.sendPushNotificationsAsync([
      {
        to: influencer.data.pushToken,
        sound: 'default',
        title: 'You have been accepted!',
        body: `${brand.data.name} has accepted you to their campaign! You can now message them if you have any questions.`,
      },
    ]);
  }

  if (influencer.data.preferences.emailAlerts) {
    sendMail({
      to: influencer.data.email,
      subject: 'You have been accepted!',
      text: `Hi ${influencer.data.name},

        ${brand.data.name} has accepted you to their campaign!

        You can now message them if you have any questions.

        Thank you,
        Team Peach`,
      html: `
        <p>Hi ${influencer.data.name},</p>

        <p>${brand.data.name} has accepted you to their campaign!</p>

        <p>You can now message them if you have any questions.</p>

        <p>Thank you,</p>
        <p>The Peach Team</p>`,
    });
  }
};

module.exports = notifyAcceptedInfluencer;
