import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Landing from '../screens/Landing';
import Login from '../screens/Login';
import Register from '../screens/Register';

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
