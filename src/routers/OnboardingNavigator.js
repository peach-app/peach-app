import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  OnboardingWelcome,
  OnboardingPaymentDetails,
  OnboardingSocial,
  OnboardingComplete,
} from '../screens';

const Stack = createNativeStackNavigator();

export const OnboardingNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={OnboardingWelcome} />
    <Stack.Screen name="PaymentDetails" component={OnboardingPaymentDetails} />
    <Stack.Screen name="Social" component={OnboardingSocial} />
    <Stack.Screen name="Complete" component={OnboardingComplete} />
  </Stack.Navigator>
);
