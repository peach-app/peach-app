import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Welcome, CompleteOnboarding, SocialDetails } from 'screens';

import { createStackNavigator } from './components';

const Stack = createStackNavigator();

const Social = () => {
  const navigation = useNavigation();

  const onComplete = () => navigation.navigate('CompleteOnboarding');

  return (
    <SocialDetails
      rightActionLabel="Skip"
      onRightActionPressed={onComplete}
      onComplete={onComplete}
    />
  );
};

export const OnboardingNavigator = () => (
  <Stack.Navigator
    initialRouteName="Welcome"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="SocialDetails" component={Social} />
    <Stack.Screen name="CompleteOnboarding" component={CompleteOnboarding} />
  </Stack.Navigator>
);
