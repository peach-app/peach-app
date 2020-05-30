import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

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
import { useUser } from 'contexts/User';
import { registerForPushNotificationsAsync } from 'helpers';

import { Icon, Main } from './styles';
import UPDATE_USER_PREFERENCES from './graphql/update-user-preferences';

export const Notifications = ({
  onComplete,
  rightActionLabel,
  onRightActionPressed,
}) => {
  const { isBrand } = useUser();

  const [updateUser, { loading }] = useMutation(UPDATE_USER_PREFERENCES, {
    onCompleted: () => {
      onComplete();
    },
  });

  const handleEnableNotifications = async () => {
    const pushToken = await registerForPushNotificationsAsync();

    if (pushToken) {
      updateUser({
        variables: {
          pushToken,
          preferences: {
            pushAlerts: true,
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
              <Icon />
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
            <Grid.Item size={12}>
              <Actions>
                <Button
                  title="Enable"
                  onPress={handleEnableNotifications}
                  isLoading={loading}
                  fixedWidth
                />
              </Actions>
            </Grid.Item>
          </Grid>
        </Container>
      </Main>
    </SafeAreaView>
  );
};

Notifications.defaultProps = {
  rightActionLabel: null,
  onRightActionPressed: null,
  onComplete: null,
};

Notifications.propTypes = {
  rightActionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onRightActionPressed: PropTypes.func,
  onComplete: PropTypes.func,
};
