import { Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export const registerForPushNotificationsAsync = async () => {
  if (!Constants.isDevice) {
    throw new Error('Physical device must be used for Push Notifications');
  }

  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }

  if (status !== 'granted') {
    return;
  }

  return Notifications.getExpoPushTokenAsync();
};
