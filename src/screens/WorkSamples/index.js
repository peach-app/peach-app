import React from 'react';
import getOr from 'lodash/fp/getOr';
import { useQuery } from '@apollo/react-hooks';

import {
  SafeAreaView,
  Header,
  Intro,
  Text,
  Container,
  ScrollView,
  Grid,
} from 'components';
import { NETWORK_STATUS } from 'consts';

import { AddNewWorkSample, WorkSampleMedia } from './components';
import GET_WORK_SAMPLES from './graphql/get-work-samples';

export const WorkSamples = () => {
  const { data, loading, networkStatus } = useQuery(GET_WORK_SAMPLES, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const fetching = loading && networkStatus === NETWORK_STATUS.FETCHING;

  return (
    <SafeAreaView>
      <Header title="Work Samples" />
      <ScrollView>
        <Container>
          <Grid>
            <Grid.Item size={12}>
              <Intro>
                <Text isCenter>
                  Upload samples of your work to show on your public profile.
                </Text>
              </Intro>
            </Grid.Item>

            {fetching &&
              Array.from(Array(3)).map((_, i) => (
                <Grid.Item size={4} key={i}>
                  <WorkSampleMedia isLoading />
                </Grid.Item>
              ))}

            {!fetching &&
              getOr([], 'user.workSamples', data).map(sample => (
                <Grid.Item size={4} key={sample._id}>
                  <WorkSampleMedia {...sample} />
                </Grid.Item>
              ))}

            <Grid.Item size={12}>
              <AddNewWorkSample />
            </Grid.Item>
          </Grid>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};
