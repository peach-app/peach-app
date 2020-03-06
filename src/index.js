import React from 'react';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import { NavigationContainer } from '@react-navigation/native';

import { App } from './App';

enableScreens();

export default () => (
  <NavigationContainer>
    <App />
  </NavigationContainer>
);
