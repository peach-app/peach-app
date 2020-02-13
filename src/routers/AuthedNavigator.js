import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
import Apply from '../screens/Apply';

const CampaignStack = createNativeStackNavigator();

const CampaignNavigator = () => (
  <CampaignStack.Navigator screenOptions={{ headerShown: false }}>
    <CampaignStack.Screen name="Campaigns" component={Campaigns} />
    <CampaignStack.Screen name="CreateCampaign" component={CreateCampaign} />
  </CampaignStack.Navigator>
);

const DiscoverStack = createNativeStackNavigator();

const DiscoverNavigator = () => (
  <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
    <DiscoverStack.Screen name="Discover" component={Discover} />
    <DiscoverStack.Screen name="Search" component={Search} />
  </DiscoverStack.Navigator>
);

const InboxStack = createNativeStackNavigator();

const InboxNavigator = () => (
  <InboxStack.Navigator screenOptions={{ headerShown: false }}>
    <InboxStack.Screen name="Inbox" component={Inbox} />
    <InboxStack.Screen name="Thread" component={Thread} />
  </InboxStack.Navigator>
);

const AccountStack = createNativeStackNavigator();

const AccountNavigator = () => (
  <AccountStack.Navigator screenOptions={{ headerShown: false }}>
    <AccountStack.Screen name="Account" component={Account} />
    <AccountStack.Screen name="AccountEdit" component={AccountEdit} />
    <AccountStack.Screen name="Payouts" component={Payouts} />
  </AccountStack.Navigator>
);

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator tabBar={props => <Navigation {...props} />}>
    <Tab.Screen name="Campaigns" component={CampaignNavigator} />
    <Tab.Screen name="Discover" component={DiscoverNavigator} />
    <Tab.Screen name="Inbox" component={InboxNavigator} />
    <Tab.Screen name="Account" component={AccountNavigator} />
  </Tab.Navigator>
);

const Stack = createNativeStackNavigator();

export const AuthedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen name="Campaign" component={Campaign} />
    <Stack.Screen name="Apply" component={Apply} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);
