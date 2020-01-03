import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import OnboardingWelcome from '../screens/OnboardingWelcome';
import OnboardingPaymentDetails from '../screens/OnboardingPaymentDetails';

const OnboardingNavigator = createStackNavigator(
  {
    Welcome: OnboardingWelcome,
    PaymentDetails: OnboardingPaymentDetails,
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(OnboardingNavigator);
