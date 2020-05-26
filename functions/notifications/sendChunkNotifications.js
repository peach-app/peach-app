/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { Expo } = require('expo-server-sdk');

const expo = new Expo();

const sendChunkNotifications = notifications => {
  const chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (const chunk of chunks) {
      try {
        const receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

module.exports = sendChunkNotifications;
