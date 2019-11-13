import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import GET_USER from './graphql/get-user';

const UserContext = React.createContext();

export const Provider = ({ children }) => {
  const { data: user, loading } = useQuery(GET_USER);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;
