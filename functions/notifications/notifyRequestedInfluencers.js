const { Expo } = require('expo-server-sdk');
const sendMail = require('../helpers/sendMail');
const sendChunkNotifications = require('./sendChunkNotifications');

const notifyRequestedInfluencers = async (influencers, brand) => {
  const notifications = influencers
    .map(influencer => {
      if (
        influencer.data.preferences.pushAlerts &&
        Expo.isExpoPushToken(influencer.data.pushToken)
      ) {
        return {
          to: influencer.data.pushToken,
          sound: 'default',
          title: `${brand.data.name} has requested you onto their campaign!`,
          body: '📲 Open the app to accept or decline.',
        };
      }

      return null;
    })
    .filter(notif => Boolean(notif));

  await sendChunkNotifications(notifications);

  return Promise.all(
    influencers.map(influencer => {
      if (!influencer.data.preferences.emailAlerts) return null;

      return sendMail({
        to: influencer.data.email,
        subject: 'You have been requested!',
        text: `Hi ${influencer.data.name},

          ${brand.data.name} has requested you onto their campaign!

          Login into the app to accept or decline.

          Thank you,
          Team Peach`,
        html: `
          <p>Hi ${influencer.data.name},</p>

          <p>${brand.data.name} has requested you onto their campaign!</p>

          <p>Login into the app to accept or decline.</p>

          <p>Thank you,</p>
          <p>The Peach Team</p>`,
      });
    })
  );
};

module.exports = notifyRequestedInfluencers;
