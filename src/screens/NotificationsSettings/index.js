import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  Header,
  KeyboardAvoidingView,
  LabeledSwitch,
  Grid,
  Container,
  Intro,
} from 'components';
import { useMutation } from '@apollo/react-hooks';
import { useUser } from 'contexts/User';
import { registerForPushNotificationsAsync } from 'helpers';
import UPDATE_USER from '../Notifications/graphql/update-user';

export const NotificationsSettings = () => {
  const { user } = useUser();

  const [
    hasEnabledPushNotifications,
    setHasEnabledPushNotifications,
  ] = useState(user.hasEnabledPushNotifications);

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: ['getCurrentUser'],
  });

  const handleNotificationToggle = async () => {
    if (!hasEnabledPushNotifications) {
      const notificationsToken = await registerForPushNotificationsAsync();

      if (notificationsToken) {
        updateUser({
          variables: {
            user: {
              ...(!user.notificationsToken && { notificationsToken }),
              hasEnabledPushNotifications: true,
            },
          },
        });

        setHasEnabledPushNotifications(true);
      }
    } else {
      updateUser({
        variables: {
          user: { hasEnabledPushNotifications: false },
        },
      });

      setHasEnabledPushNotifications(false);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <Header title="Notifications Settings" />
        <Intro />
        <Container>
          <Grid>
            <Grid.Item size={12}>
              <LabeledSwitch
                label="Notifications"
                onToggle={handleNotificationToggle}
                isEnabled={hasEnabledPushNotifications}
              />
            </Grid.Item>
          </Grid>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
