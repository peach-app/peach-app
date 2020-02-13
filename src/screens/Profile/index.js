import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import startCase from 'lodash/startCase';
import { useRoute } from '@react-navigation/native';

import { USER_TYPE } from '../../consts';
import {
  SafeAreaView,
  Header,
  Container,
  ProfileHeader,
  Text,
  Grid,
  Actions,
  Button,
} from '../../components';
import { useUser } from '../../contexts/User';

import GET_USER from './graphql/get-user';

export const Profile = () => {
  const { user } = useUser();
  const {
    params: { id },
  } = useRoute();
  const { data } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  const name = get('findUserByID.name', data);
  const bio = get('findUserByID.bio', data);
  const isBrand = get('user.type', user) === USER_TYPE.BRAND;

  return (
    <SafeAreaView>
      <Header title={startCase(name)} />
      <ScrollView>
        <Container>
          <Grid>
            <Grid.Item size={12}>
              <ProfileHeader {...get('findUserByID', data)} />
            </Grid.Item>

            {bio && (
              <Grid.Item size={12}>
                <Text isCenter>{bio}</Text>
              </Grid.Item>
            )}

            {isBrand && (
              <Grid.Item size={12}>
                <Actions>
                  <Button title="Request work" fixedWidth />
                </Actions>
              </Grid.Item>
            )}
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};
