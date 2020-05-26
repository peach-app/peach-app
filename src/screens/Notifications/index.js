import React, { useState } from 'react';
import { Platform, Alert, Linking } from 'react-native';
import {
  SafeAreaView,
  StatusBar,
  Header,
  Container,
  Grid,
  Text,
  Button,
  Title,
  Actions,
} from 'components';
import { Notifications as Notif } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useMutation } from '@apollo/react-hooks';
import { useUser } from 'contexts/User';

import UPDATE_USER from './graphql/update-user.js';

import { Icon, IconWrapper, Main } from './styles';

export const Notifications = ({ onComplete }) => {
  const { isBrand } = useUser();

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      onComplete();
    },
  });

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
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
      const notificationsToken = await Notif.getExpoPushTokenAsync();

      updateUser({
        variables: {
          user: {
            notificationsToken,
            hasEnabledPushNotifications: true,
          },
        },
      });
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title="Notifications" />
      <Main>
        <Container>
          <Grid>
            <Grid.Item size={12}>
              <IconWrapper>
                <Icon />
              </IconWrapper>
            </Grid.Item>
            <Grid.Item size={12}>
              <Title isCentered>Enable Notifications</Title>
            </Grid.Item>
            <Grid.Item size={12}>
              <Text isCenter>
                {isBrand
                  ? 'Get notifications when an influencer message you, applies to your campaign or completes it.'
                  : 'Get notifications when you receive a message, request or payment from brands.'}
              </Text>
            </Grid.Item>
          </Grid>
        </Container>
      </Main>

      <Actions>
        <Button
          title="Enable"
          onPress={async () => {
            await registerForPushNotificationsAsync();
          }}
          isLoading={loading}
          fixedWidth
        />
      </Actions>
    </SafeAreaView>
  );
};
