import React from 'react';
import get from 'lodash/fp/get';
import { useNavigation } from '@react-navigation/native';

import { USER_TYPE } from 'consts';
import { useUser } from 'contexts/User';
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

const welcomeScreen = ({ goTo }) => () => <Welcome goTo={goTo} />;

export const OnboardingNavigator = () => {
  const { user } = useUser();
  const isBrand = get('user.type', user) === USER_TYPE.BRAND;

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Welcome"
        component={welcomeScreen({
          goTo: isBrand ? 'CompleteOnboarding' : 'SocialDetails',
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
      <Stack.Screen name="CompleteOnboarding" component={CompleteOnboarding} />
    </Stack.Navigator>
  );
};
