import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  StatusBar,
  Container,
  NavLink,
  ProfileHeader,
  AccountDetailsBanner,
  ScrollView,
  AppVersion,
  Actions,
} from 'components';
import { useAuth } from 'contexts/Auth';
import { useUser } from 'contexts/User';

import GET_USER from './graphql/get-user';

export const Account = () => {
  const navigation = useNavigation();
  const { setToken } = useAuth();
  const { isBrand, isInfluencer } = useUser();
  const { client, data, loading } = useQuery(GET_USER);

  return (
    <>
      <AccountDetailsBanner />
      <SafeAreaView>
        <ScrollView>
          <Container>
            <StatusBar />
            <ProfileHeader isLoading={loading} {...get('user', data)} />
            <NavLink
              title="Edit Profile"
              iconProps={{ name: 'ios-arrow-forward' }}
              onPress={() => navigation.navigate('EditProfile')}
            />
            {isInfluencer && (
              <>
                <NavLink
                  title="Social Accounts"
                  iconProps={{ name: 'ios-arrow-forward' }}
                  onPress={() => navigation.navigate('SocialDetails')}
                />
                <NavLink
                  title="Account Details"
                  iconProps={{ name: 'ios-arrow-forward' }}
                  onPress={() => navigation.navigate('AccountDetails')}
                />
              </>
            )}
            {isBrand && (
              <>
                <NavLink
                  title="Personal Details"
                  iconProps={{ name: 'ios-arrow-forward' }}
                  onPress={() => navigation.navigate('PersonalDetails')}
                />
                <NavLink
                  title="Payment Methods"
                  iconProps={{ name: 'ios-arrow-forward' }}
                  onPress={() => navigation.navigate('PaymentMethods')}
                />
              </>
            )}
            <NavLink
              title="Payouts"
              iconProps={{ name: 'ios-arrow-forward' }}
              onPress={() => navigation.navigate('Payouts')}
            />
            <NavLink
              title="Support"
              iconProps={{ name: 'ios-arrow-forward' }}
              onPress={() => navigation.navigate('Support')}
            />
            <NavLink
              title="Logout"
              onPress={async () => {
                await setToken(null);
                client.resetStore();
              }}
            />
          </Container>
        </ScrollView>
        <Actions>
          <AppVersion />
        </Actions>
      </SafeAreaView>
    </>
  );
};
