import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingWelcome from '../screens/OnboardingWelcome';
import OnboardingPaymentDetails from '../screens/OnboardingPaymentDetails';
import OnboardingSocial from '../screens/OnboardingSocial';
import OnboardingComplete from '../screens/OnboardingComplete';

const Stack = createNativeStackNavigator();

export const OnboardingNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={OnboardingWelcome} />
    <Stack.Screen name="PaymentDetails" component={OnboardingPaymentDetails} />
    <Stack.Screen name="Social" component={OnboardingSocial} />
    <Stack.Screen name="Complete" component={OnboardingComplete} />
  </Stack.Navigator>
);
