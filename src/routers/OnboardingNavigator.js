import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Welcome,
  CompleteOnboarding,
  SocialDetails,
  PersonalDetails,
  NewBilling,
} from 'screens';

import { createStackNavigator } from './components';

const Stack = createStackNavigator();

const withSkipOption = (Component, { skipTo }) => () => {
  const navigation = useNavigation();

  const onComplete = () => navigation.navigate(skipTo);

  return (
    <Component
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
    <Stack.Screen
      name="SocialDetails"
      component={withSkipOption(SocialDetails, {
        skipTo: 'PersonalDetails',
      })}
    />
    <Stack.Screen
      name="PersonalDetails"
      component={withSkipOption(PersonalDetails, {
        skipTo: 'NewBilling',
      })}
    />
    <Stack.Screen
      name="NewBilling"
      component={withSkipOption(NewBilling, {
        skipTo: 'CompleteOnboarding',
      })}
    />
    <Stack.Screen name="CompleteOnboarding" component={CompleteOnboarding} />
  </Stack.Navigator>
);
