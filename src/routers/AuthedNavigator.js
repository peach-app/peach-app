import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Navigation from '../components/Navigation';
import Campaign from '../screens/Campaign';
import Campaigns from '../screens/Campaigns';
import Inbox from '../screens/Inbox';
import Discover from '../screens/Discover';
import Account from '../screens/Account';
import Payouts from '../screens/Payouts';
import CreateCampaign from '../screens/CreateCampaign';

const CampaignStack = createStackNavigator(
  {
    Campaigns,
    CreateCampaign,
  },
  {
    headerMode: 'none',
  }
);

const AccountStack = createStackNavigator(
  {
    Account,
    Payouts,
  },
  {
    headerMode: 'none',
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Discover,
    Campaigns: CampaignStack,
    Inbox,
    Account: AccountStack,
  },
  {
    tabBarComponent: Navigation,
  }
);

const AuthedNavigator = createStackNavigator(
  {
    Home: TabNavigator,
    Campaign,
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(AuthedNavigator);
