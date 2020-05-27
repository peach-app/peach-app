import { Platform, Alert, Linking } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert(
        `Enable notifications`,
        'Please go to settings and turn on notification permission manually',
        [
          { text: 'Cancel', onPress: () => console.log('cancel') },
          {
            text: 'Take me',
            onPress: () => Linking.openURL('app-settings:'),
          },
        ],
        { cancelable: false }
      );
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);

    return token;
  }
  alert('Must use physical device for Push Notifications');

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
};
