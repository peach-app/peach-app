import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

const AuthContext = React.createContext();

const getStoredToken = async setIsLoggedIn => {
  const token = await AsyncStorage.getItem('token');
  setIsLoggedIn(!!token);
};

export const Provider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (loading) {
    return (
      <AppLoading
        startAsync={async () => getStoredToken(setIsLoggedIn)}
        onFinish={() => setLoading(false)}
      />
    );
  }

  const setToken = async token => {
    if (token) {
      await AsyncStorage.setItem('token', token);
    } else {
      await AsyncStorage.removeItem('token');
    }
    setIsLoggedIn(!!token);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
