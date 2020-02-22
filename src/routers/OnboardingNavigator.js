import React from 'react';

import {
  OnboardingWelcome,
  PaymentDetails,
  OnboardingSocial,
  OnboardingComplete,
} from 'screens';

import { createStackNavigator } from './components';

const Stack = createStackNavigator();

export const OnboardingNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={OnboardingWelcome} />
    <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
    <Stack.Screen name="Social" component={OnboardingSocial} />
    <Stack.Screen name="Complete" component={OnboardingComplete} />
  </Stack.Navigator>
);
