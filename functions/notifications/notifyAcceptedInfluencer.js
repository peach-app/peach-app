const { Expo } = require('expo-server-sdk');
const get = require('lodash/fp/get');
const sendMail = require('../helpers/sendMail');

const expo = new Expo();

const notifyAcceptedInfluencer = (influencer, brand) => {
  if (
    get('data.preferences.pushAlerts', influencer) &&
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

  if (get('data.preferences.emailAlerts', influencer)) {
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
