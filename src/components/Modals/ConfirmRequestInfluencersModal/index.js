import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { get } from 'lodash/fp';
import {
  Title,
  SubTitle,
  Modal,
  Grid,
  Button,
  Avatar,
  Actions,
  FeedbackView,
  Container,
  Intro,
  GraphQLErrors,
} from 'components';
import REQUEST_INFLUENCERS from './graphql';

const ConfirmRequestedInfluencersModal = ({
  onClose,
  requestedInfluencers,
  campaignId,
  navigation,
}) => {
  const [isSuccessScreenVisible, setSuccessScreen] = useState(false);

  const [requestInfluencers, { loading, error }] = useMutation(
    REQUEST_INFLUENCERS,
    {
      refetchQueries: ['getCampaign'],
      onCompleted: () => setSuccessScreen(true),
    }
  );

  const onSubmitRequest = () => {
    requestInfluencers({
      variables: {
        requestedInfluencers: requestedInfluencers.map(
          influencer => influencer._id
        ),
        campaignId,
      },
    });
  };

  const handleFeedbackActionButtonPressed = useCallback(() => {
    onClose();
    navigation.goBack();
  }, []);

  return (
    <Modal isOpen onClose={onClose}>
      <Container>
        <Intro />
        <Grid justify="center" align="center">
          {isSuccessScreenVisible ? (
            <FeedbackView
              title="Influencers successfully requested!"
              subTitle="They will be notified about your interest"
              actionButtonLabel="Done"
              onActionButtonPressed={handleFeedbackActionButtonPressed}
            />
          ) : (
            <>
              <Grid.Item size={12}>
                <Title isCentered>Great choice!</Title>
              </Grid.Item>
              <Grid.Item size={12}>
                <SubTitle isCentered>
                  You are about to request the following influencers:
                </SubTitle>
              </Grid.Item>
              <Grid.Item size={12}>
                <Avatar.List isCentered>
                  {requestedInfluencers.map(influencer => (
                    <Avatar
                      key={influencer._id}
                      size={60}
                      fallback={influencer.name}
                      source={{ uri: get('avatar.url', influencer) }}
                    />
                  ))}
                </Avatar.List>
              </Grid.Item>
              {error && (
                <Grid.Item size={12}>
                  <GraphQLErrors error={error} />
                </Grid.Item>
              )}
              <Grid.Item size={12}>
                <Actions>
                  <Button
                    onPress={onSubmitRequest}
                    title="Request"
                    fixedWidth
                    isLoading={loading}
                  />
                </Actions>
              </Grid.Item>
            </>
          )}
        </Grid>
      </Container>
    </Modal>
  );
};

ConfirmRequestedInfluencersModal.propTypes = {
  requestedInfluencers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  campaignId: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
export default ConfirmRequestedInfluencersModal;
