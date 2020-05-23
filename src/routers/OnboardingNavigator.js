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
  EditProfile,
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
          goTo: isBrand
            ? 'OnboardingNewPaymentMethod'
            : 'OnboardingSocialDetails',
        })}
      />
      <Stack.Screen
        name="OnboardingSocialDetails"
        component={withSkipOption(SocialDetails, {
          skipTo: 'OnboardingPersonalDetails',
        })}
      />
      <Stack.Screen
        name="OnboardingPersonalDetails"
        component={withSkipOption(PersonalDetails, {
          skipTo: 'OnboardingNewBilling',
        })}
      />
      <Stack.Screen
        name="OnboardingNewBilling"
        component={withSkipOption(NewBilling, {
          skipTo: 'OnboardingEditProfile',
        })}
      />
      <Stack.Screen
        name="OnboardingNewPaymentMethod"
        component={withSkipOption(NewPaymentMethod, {
          skipTo: 'OnboardingEditProfile',
        })}
      />
      <Stack.Screen
        name="OnboardingEditProfile"
        component={withSkipOption(EditProfile, {
          skipTo: 'CompleteOnboarding',
        })}
      />
      <Stack.Screen name="CompleteOnboarding" component={CompleteOnboarding} />
    </Stack.Navigator>
  );
};
