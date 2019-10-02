import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

const AuthContext = React.createContext();

const getStoredAuth = async setAuth => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    setAuth(token);
  }
};

const setStoredAuth = async auth => {
  if (auth) {
    await AsyncStorage.setItem('token', auth);
    return;
  }

  await AsyncStorage.removeItem('token');
};

export const Provider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    getStoredAuth(setAuth);
  }, []);

  useEffect(() => {
    setStoredAuth(auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
