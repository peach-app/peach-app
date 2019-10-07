import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Navigation from '../components/Navigation';
import Campaigns from '../screens/Campaigns';
import Inbox from '../screens/Inbox';
import Discover from '../screens/Discover';
import Account from '../screens/Account';

const AuthedNavigator = createBottomTabNavigator(
  {
    Campaigns,
    Inbox,
    Discover,
    Account,
  },
  {
    tabBarComponent: Navigation,
  }
);

export default createAppContainer(AuthedNavigator);
