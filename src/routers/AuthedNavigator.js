import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { Navigation } from '../components';
import Campaign from '../screens/Campaign';
import Campaigns from '../screens/Campaigns';
import Inbox from '../screens/Inbox';
import Thread from '../screens/Thread';
import Discover from '../screens/Discover';
import Search from '../screens/Search';
import Account from '../screens/Account';
import AccountEdit from '../screens/AccountEdit';
import Payouts from '../screens/Payouts';
import CreateCampaign from '../screens/CreateCampaign';
import Profile from '../screens/Profile';
import RequestInfluencers from '../screens/RequestInfluencers';
import Apply from '../screens/Apply';


const CampaignStack = createStackNavigator(
  {
    Campaigns,
    CreateCampaign,
    RequestInfluencers,
  },
  {
    headerMode: 'none',
  }
);

const DiscoverStack = createStackNavigator(
  {
    Discover,
    Search,
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
    Campaigns: CampaignStack,
    Discover: DiscoverStack,
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
    Apply,
    Profile,
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(AuthedNavigator);
