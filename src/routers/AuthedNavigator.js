import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Campaigns from '../screens/Campaigns';
import Account from '../screens/Account';

const AuthedNavigator = createBottomTabNavigator({
  Campaigns,
  Account,
});

export default createAppContainer(AuthedNavigator);
