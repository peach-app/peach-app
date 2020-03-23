import PropTypes from 'prop-types';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Grid } from '../Grid';
import { Text } from '../Text';
import { Button } from '../Button';

export const RequestActions = ({ campaignId }) => {
  const navigation = useNavigation();

  return (
    <Grid justify="center">
      <Grid.Item size={12}>
        <Text isCenter>You've been requested onto this campaign.</Text>
      </Grid.Item>
      <Grid.Item>
        <Button
          title="Accept"
          fixedWidth
          onPress={() => {
            navigation.navigate('Apply', { id: campaignId });
          }}
        />
      </Grid.Item>
    </Grid>
  );
};

RequestActions.propTypes = {
  campaignId: PropTypes.string.isRequired,
};
