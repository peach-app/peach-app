const { Expo } = require('expo-server-sdk');
const sendMail = require('../helpers/sendMail');

const expo = new Expo();
const sendMessageNotification = (recipient, sender, message) => {
  if (
    recipient.hasEnabledPushNotifications &&
    Expo.isExpoPushToken(recipient.notificationsToken)
  ) {
    (async () => {
      await expo.sendPushNotificationsAsync([
        {
          to: recipient.notificationsToken,
          sound: 'default',
          title: 'New message!',
          body: `${sender}: ${message}`,
        },
      ]);
    })();
  } else {
    (async () => {
      await sendMail({
        to: recipient.email,
        subject: `${sender} sent you a message!`,
        text: `Hi ${recipient.name},

        You have one new message from ${sender}:

        ${message}

        Thank you,
        Team Peach`,
        html: `
        <p>Hi ${recipient.name},</p>

        <p> You have one new message from ${sender}:</p>

        <p>${message}</p>

        <p>Thank you,</p>
        <p>The Peach Team</p>`,
      });
    })();
  }
};

module.exports = sendMessageNotification;
