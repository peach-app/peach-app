import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Account from '../screens/Account';

const AuthedNavigator = createStackNavigator(
  {
    Account,
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(AuthedNavigator);
