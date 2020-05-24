import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';

import { USER_TYPE } from 'consts';

import { useAuth } from './Auth';
import GET_USER from './graphql/get-user';

const UserContext = React.createContext();

export const Provider = ({ children }) => {
  const { setToken } = useAuth();

  const { client, data, loading, networkStatus, error, refetch } = useQuery(
    GET_USER,
    {
      notifyOnNetworkStatusChange: true,
      onError: async err => {
        if (err?.networkError?.statusCode === 400) {
          await setToken(null);
          client.resetStore();
        }
      },
    }
  );

  const userType = get('user.type', data);
  const isBrand = userType === USER_TYPE.BRAND;
  const isInfluencer = userType === USER_TYPE.INFLUENCER;
  const user = {
    ...data,
    isEmailVerified: get('user.emailVerification.isVerified', data),
    isStripeEnabled:
      get('user.stripeAccount.capabilities.transfers', data) === 'active',
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isBrand,
        isInfluencer,
        loading,
        networkStatus,
        error,
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
