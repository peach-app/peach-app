import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Navigation from '../components/Navigation';
import Campaigns from '../screens/Campaigns';
import Inbox from '../screens/Inbox';
import Discover from '../screens/Discover';
import Account from '../screens/Account';
import Payouts from '../screens/Payouts';

const AccountStack = createStackNavigator(
  {
    Account,
    Payouts,
  },
  {
    headerMode: 'none',
  }
);

const AuthedNavigator = createBottomTabNavigator(
  {
    Campaigns,
    Discover,
    Inbox,
    Account: AccountStack,
  },
  {
    tabBarComponent: Navigation,
  }
);

export default createAppContainer(AuthedNavigator);
