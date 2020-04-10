import React from 'react';

import { Landing, Login, Register, PasswordResetEmail } from 'screens';

import { createStackNavigator } from './components';

const Stack = createStackNavigator();

export const UnAuthedNavigator = () => (
  <Stack.Navigator
    initialRouteName="Landing"
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white',
      },
    }}
  >
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="PasswordResetEmail" component={PasswordResetEmail} />
  </Stack.Navigator>
);
