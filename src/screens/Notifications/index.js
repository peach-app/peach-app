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
import { registerForPushNotificationsAsync } from 'helpers';

import UPDATE_USER from './graphql/update-user.js';

import { Icon, IconWrapper, Main } from './styles';

export const Notifications = ({
  onComplete,
  rightActionLabel,
  onRightActionPressed,
}) => {
  const { isBrand } = useUser();

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      onComplete();
    },
  });

  const handleEnableNotifications = async () => {
    const notificationsToken = await registerForPushNotificationsAsync();

    if (notificationsToken) {
      updateUser({
        variables: {
          user: {
            notificationsToken,
            hasEnabledPushNotifications: true,
          },
        },
      });
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <Header
        title="Notifications"
        rightActionLabel={rightActionLabel}
        onRightActionPressed={onRightActionPressed}
      />
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
          onPress={handleEnableNotifications}
          isLoading={loading}
          fixedWidth
        />
      </Actions>
    </SafeAreaView>
  );
};
