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
  PersonalDetails,
  BusinessDetails,
  BillingDetails,
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

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator tabBar={props => <Navigation {...props} />}>
    <Tab.Screen name="Campaigns" component={CampaignNavigator} />
    <Tab.Screen name="Discover" component={DiscoverNavigator} />
    <Tab.Screen name="Inbox" component={InboxNavigator} />
    <Tab.Screen name="Account" component={Account} />
  </Tab.Navigator>
);

const Stack = createStackNavigator();

export const AuthedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen name="Campaign" component={Campaign} />
    <Stack.Screen name="Apply" component={Apply} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="Payouts" component={Payouts} />
    <Stack.Screen name="SocialDetails" component={SocialDetails} />
    <Stack.Screen name="AccountDetails" component={AccountDetails} />
    <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
    <Stack.Screen name="BusinessDetails" component={BusinessDetails} />
    <Stack.Screen name="BillingDetails" component={BillingDetails} />
  </Stack.Navigator>
);
