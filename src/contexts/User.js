import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';

import { useAuth } from './Auth';
import GET_USER from './graphql/get-user';

const UserContext = React.createContext();

export const Provider = ({ children }) => {
  const { setToken } = useAuth();

  const { client, data, loading } = useQuery(GET_USER, {
    onError: async error => {
      console.log(error);
      // await setToken(null);
      // client.resetStore();
    },
  });

  const user = {
    ...data,
    isEmailVerified: get('user.emailVerification.isVerified', data),
    isStripeEnabled:
      get('user.stripeAccount.capabilities.transfers', data) === 'active',
  };

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
