import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Landing, Login, Register } from 'screens';

const Stack = createNativeStackNavigator();

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
