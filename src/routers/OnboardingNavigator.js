import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useUser } from 'contexts/User';
import {
  Welcome,
  CompleteOnboarding,
  SocialDetails,
  PersonalDetails,
  NewBilling,
  NewPaymentMethod,
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

const welcomeScreen = ({ goTo }) => () => <Welcome goTo={goTo} />;

export const OnboardingNavigator = () => {
  const { isBrand } = useUser();

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Welcome"
        component={welcomeScreen({
          goTo: isBrand ? 'NewPaymentMethod' : 'SocialDetails',
        })}
      />
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
      <Stack.Screen
        name="NewPaymentMethod"
        component={withSkipOption(NewPaymentMethod, {
          skipTo: 'CompleteOnboarding',
        })}
      />
      <Stack.Screen name="CompleteOnboarding" component={CompleteOnboarding} />
    </Stack.Navigator>
  );
};
