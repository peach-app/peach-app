import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { useAuth } from './Auth';
import GET_USER from './graphql/get-user';

const UserContext = React.createContext();

export const Provider = ({ children }) => {
  const { setToken } = useAuth();

  const { client, data: user, loading } = useQuery(GET_USER, {
    onError: async () => {
      await setToken(null);
      client.resetStore();
    },
  });

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
