import React from 'react';

import { Landing, Login, Register } from 'screens';

import { createStackNavigator } from './components';

const Stack = createStackNavigator();

export const UnAuthedNavigator = () => (
  <Stack.Navigator
    initialRouteName="Landing"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);
