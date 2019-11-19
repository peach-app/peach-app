import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Navigation from '../components/Navigation';
import Campaign from '../screens/Campaign';
import Campaigns from '../screens/Campaigns';
import Inbox from '../screens/Inbox';
import Thread from '../screens/Thread';
import Discover from '../screens/Discover';
import Account from '../screens/Account';
import AccountEdit from '../screens/AccountEdit';
import Payouts from '../screens/Payouts';
import CreateCampaign from '../screens/CreateCampaign';
import Profile from '../screens/Profile';

const CampaignStack = createStackNavigator(
  {
    Campaigns,
    CreateCampaign,
  },
  {
    headerMode: 'none',
  }
);

const InboxStack = createStackNavigator(
  {
    Inbox,
    Thread,
  },
  {
    headerMode: 'none',
  }
);

const AccountStack = createStackNavigator(
  {
    Account,
    AccountEdit,
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
    Inbox: InboxStack,
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
    Profile,
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(AuthedNavigator);
