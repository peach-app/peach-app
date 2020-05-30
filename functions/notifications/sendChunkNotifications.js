const { Expo } = require('expo-server-sdk');

const expo = new Expo();

const sendChunkNotifications = notifications => {
  if (notifications.length <= 0) return null;

  const chunks = expo.chunkPushNotifications(notifications);

  return Promise.all(
    chunks.map(chunk => {
      return expo.sendPushNotificationsAsync(chunk);
    })
  );
};

module.exports = sendChunkNotifications;
