import React from 'react';
import 'react-native-gesture-handler';
import * as Sentry from 'sentry-expo';
import { enableScreens } from 'react-native-screens';

import { NavigationContainer } from '@react-navigation/native';

import { App } from './App';

enableScreens();

Sentry.init({
  dsn:
    'https://05ee3234bab843a3a9fcac6890e3694a@o392600.ingest.sentry.io/5240413',
  enableInExpoDevelopment: true,
  debug: true,
});

export default () => (
  <NavigationContainer>
    <App />
  </NavigationContainer>
);
