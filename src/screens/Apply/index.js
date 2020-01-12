import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import {
  SafeAreaView,
  StatusBar,
  Button,
  Intro,
  Header,
  Container,
  TextInput,
  Actions,
  Grid,
} from '../../components';

import APPLY_TO_CAMPAIGN from './graphql/apply-to-campaign';

const Apply = ({ navigation }) => {
  const id = navigation.getParam('id');

  const [applyToCampaign, { loading }] = useMutation(APPLY_TO_CAMPAIGN, {
    variables: {
      id,
    },
    refetchQueries: ['getCampaign', 'getCampaigns'],
    onCompleted: () => navigation.goBack(),
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title="Campaign Application" />
      <Container>
        <Intro>
          <Grid>
            <Grid.Item size={12}>
              <TextInput label="Pay Rate" />
            </Grid.Item>
            <Grid.Item size={12}>
              <Actions>
                <Button
                  fixedWidth
                  title="Apply"
                  isLoading={loading}
                  onPress={applyToCampaign}
                />
              </Actions>
            </Grid.Item>
          </Grid>
        </Intro>
      </Container>
    </SafeAreaView>
  );
};

Apply.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default Apply;
