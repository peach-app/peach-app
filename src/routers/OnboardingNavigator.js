import React from 'react';

import {
  OnboardingWelcome,
  OnboardingPaymentDetails,
  OnboardingSocial,
  OnboardingComplete,
} from 'screens';

import { createStackNavigator } from './components';

const Stack = createStackNavigator();

export const OnboardingNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={OnboardingWelcome} />
    <Stack.Screen name="PaymentDetails" component={OnboardingPaymentDetails} />
    <Stack.Screen name="Social" component={OnboardingSocial} />
    <Stack.Screen name="Complete" component={OnboardingComplete} />
  </Stack.Navigator>
);
