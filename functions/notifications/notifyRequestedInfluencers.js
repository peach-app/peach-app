/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { Expo } = require('expo-server-sdk');
const sendMail = require('../helpers/sendMail');
const sendChunkNotifications = require('./sendChunkNotifications');

const notifyRequestedInfluencers = (influencers, brand) => {
  const notifications = [];
  const emails = [];
  for (const influencer of influencers) {
    const token = influencer.notificationsToken;
    if (token && influencer.hasEnabledPushNotifications) {
      if (!Expo.isExpoPushToken(token)) {
        // sentry one day
        console.error(`Push token ${token} is not a valid Expo push token`);

        emails.push({
          to: influencer.email,
          name: influencer.name,
        });
        continue;
      }

      notifications.push({
        to: token,
        sound: 'default',
        title: `${brand} has requested you their campaign!`,
        body: '📲 Open the app to accept or decline.',
        //   data: { body },
      });
    } else {
      emails.push({
        to: influencer.email,
        name: influencer.name,
      });
    }

    if (notifications.length > 0) {
      sendChunkNotifications(notifications);
    }

    if (emails.length > 0) {
      (async () => {
        for (const email of emails) {
          const { to, name } = email;
          try {
            await sendMail({
              to,
              subject: 'You have been requested!',
              text: `Hi ${name},

              ${brand} has requested you to their campaign!

              Login into the app to accept or decline.

              Thank you,
              Team Peach`,
              html: `
              <p>Hi ${name},</p>

              <p>${brand} has requested you to their campaign!</p>

              <p>Login into the app to accept or decline.</p>

              <p>Thank you,</p>
              <p>The Peach Team</p>`,
            });
          } catch (e) {
            console.log(
              'There was a problem sending the request emails to influencers',
              e
            );
          }
        }
      })();
    }
  }
};

module.exports = notifyRequestedInfluencers;
