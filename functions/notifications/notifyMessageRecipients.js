const { Expo } = require('expo-server-sdk');
const sendMail = require('../helpers/sendMail');
const sendChunkNotifications = require('./sendChunkNotifications');

const notifyMessageRecipients = async (recipients, sender, message) => {
  const notifications = recipients
    .map(recipient => {
      if (
        recipient.data.preferences.pushAlerts &&
        Expo.isExpoPushToken(recipient.data.pushToken)
      ) {
        return {
          to: recipient.data.pushToken,
          sound: 'default',
          title: 'New message!',
          body: `${sender.data.name}: ${message}`,
        };
      }

      return null;
    })
    .filter(notif => Boolean(notif));

  await sendChunkNotifications(notifications);

  return Promise.all(
    recipients.map(recipient => {
      if (!recipient.data.preferences.emailAlerts) return null;

      return sendMail({
        to: recipient.data.email,
        subject: `${sender.data.name} sent you a message!`,
        text: `Hi ${recipient.data.name},

        You have one new message from ${sender.data.name}:

        ${message}

        Thank you,
        Team Peach`,
        html: `
        <p>Hi ${recipient.data.name},</p>

        <p> You have one new message from ${sender.data.name}:</p>

        <p>${message}</p>

        <p>Thank you,</p>
        <p>The Peach Team</p>`,
      });
    })
  );
};

module.exports = notifyMessageRecipients;
