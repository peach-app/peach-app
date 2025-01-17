import PropTypes from 'prop-types';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import { Grid, Text, Button } from 'components';
import DECLINE_BOOKING from './graphql/decline-booking';

export const RequestActions = ({ campaignId, onAccept }) => {
  const navigation = useNavigation();
  const [declineBooking, { loading }] = useMutation(DECLINE_BOOKING, {
    refetchQueries: ['getCampaigns', 'getCampaign'],
    awaitRefetchQueries: true,
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
      <Grid.Item size={3}>
        <Button
          title="Decline"
          isGhost
          isLoading={loading}
          onPress={() => {
            declineBooking();
          }}
        />
      </Grid.Item>
      <Grid.Item size={5}>
        <Button title="Accept" onPress={onAccept} />
      </Grid.Item>
    </Grid>
  );
};

RequestActions.propTypes = {
  campaignId: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
};
