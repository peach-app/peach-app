import React, { useContext } from 'react';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { useQuery, useMutation } from '@apollo/react-hooks';
import get from 'lodash/fp/get';

import UPDATE_PUSH_TOKEN from './graphql/update-push-token';
import GET_USER from './graphql/get-user';

const UserContext = React.createContext();

const registerForPushNotificationsAsync = async () => {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

  if (status !== 'granted') {
    return;
  }

  return Notifications.getExpoPushTokenAsync();
};

export const Provider = ({ children }) => {
  const [updatePushToken] = useMutation(UPDATE_PUSH_TOKEN);
  const { data, loading } = useQuery(GET_USER, {
    onCompleted: async data => {
      if (data.user.pushToken) return;

      const token = await registerForPushNotificationsAsync();

      if (token) {
        updatePushToken({
          variables: {
            id: get('user._id', data),
            token,
          },
        });
      }
    },
  });

  return (
    <UserContext.Provider value={{ user: get('user', data), loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
