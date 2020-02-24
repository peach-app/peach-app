import React from 'react';

import { Navigation } from 'components';
import {
  Campaign,
  Campaigns,
  Inbox,
  Thread,
  Discover,
  Search,
  Account,
  EditProfile,
  Payouts,
  SocialDetails,
  AccountDetails,
  CreateCampaign,
  Profile,
  Apply,
} from 'screens';

import { createStackNavigator, createBottomTabNavigator } from './components';

const CampaignStack = createStackNavigator();

const CampaignNavigator = () => (
  <CampaignStack.Navigator screenOptions={{ headerShown: false }}>
    <CampaignStack.Screen name="Campaigns" component={Campaigns} />
    <CampaignStack.Screen name="CreateCampaign" component={CreateCampaign} />
  </CampaignStack.Navigator>
);

const DiscoverStack = createStackNavigator();

const DiscoverNavigator = () => (
  <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
    <DiscoverStack.Screen name="Discover" component={Discover} />
    <DiscoverStack.Screen name="Search" component={Search} />
  </DiscoverStack.Navigator>
);

const InboxStack = createStackNavigator();

const InboxNavigator = () => (
  <InboxStack.Navigator screenOptions={{ headerShown: false }}>
    <InboxStack.Screen name="Inbox" component={Inbox} />
    <InboxStack.Screen name="Thread" component={Thread} />
  </InboxStack.Navigator>
);

const AccountStack = createStackNavigator();

const AccountNavigator = () => (
  <AccountStack.Navigator screenOptions={{ headerShown: false }}>
    <AccountStack.Screen name="Account" component={Account} />
    <AccountStack.Screen name="EditProfile" component={EditProfile} />
    <AccountStack.Screen name="Payouts" component={Payouts} />
    <AccountStack.Screen name="SocialDetails" component={SocialDetails} />
    <AccountStack.Screen name="AccountDetails" component={AccountDetails} />
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

const Stack = createStackNavigator();

export const AuthedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen name="Campaign" component={Campaign} />
    <Stack.Screen name="Apply" component={Apply} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);
