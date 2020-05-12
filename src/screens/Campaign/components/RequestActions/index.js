import PropTypes from 'prop-types';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import { Grid, Text, Button } from 'components';
import DECLINE_BOOKING from './graphql/decline-booking';

export const RequestActions = ({ campaignId }) => {
  const navigation = useNavigation();
  const [declineBooking, { loading }] = useMutation(DECLINE_BOOKING, {
    refetchQueries: ['getCampaigns', 'getCampaign'],
    variables: {
      campaignId,
    },
    onCompleted: () => {
      navigation.goBack();
    },
  });

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
      <Grid.Item>
        <Button
          title="Decline"
          fixedWidth
          isLoading={loading}
          onPress={() => {
            declineBooking();
          }}
        />
      </Grid.Item>
    </Grid>
  );
};

RequestActions.propTypes = {
  campaignId: PropTypes.string.isRequired,
};
