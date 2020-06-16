import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/native';
import getOr from 'lodash/fp/getOr';

import {
  SafeAreaView,
  Header,
  ScrollView,
  UserProfileCard,
  Container,
  Grid,
} from 'components';

import GET_THREAD from './graphql/get-thread';

export const ThreadInfo = () => {
  const {
    params: { id },
  } = useRoute();
  const { data, loading } = useQuery(GET_THREAD, {
    variables: {
      id,
    },
  });

  return (
    <SafeAreaView>
      <Header title="Thread Users" />
      <ScrollView>
        <Container>
          <Grid>
            {loading && (
              <Grid.Item size={12}>
                <UserProfileCard isLoading />
              </Grid.Item>
            )}
            {!loading &&
              getOr([], 'findThreadById.users.data', data).map(user => (
                <Grid.Item size={12} key={user._id}>
                  <UserProfileCard {...user} />
                </Grid.Item>
              ))}
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};
