import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  SubTitle,
  Modal,
  Actions,
  Button,
  FeedbackView,
} from 'components';

const CampaignCreationModal = ({
  onClose,
  onFinish,
  onRequestInfluencers,
  hasBeenEdited,
}) => {
  const onActionTaken = action => {
    // refactor
    // useEffect clean up with onClose does not work for some reason
    // need to investigate
    action();
    onClose();
  };

  return (
    <Modal isOpen onClose={onClose}>
      <Grid justify="center" align="center">
        <FeedbackView
          title={
            hasBeenEdited
              ? 'Your changes were saved! '
              : 'Campaign created successfully!'
          }
          subTitle={
            hasBeenEdited
              ? 'We will notify everyone involved. Meanwhile you can:'
              : 'All influencers on our platform will be able to discover and apply for your campaign. If you want someone specific you can:'
          }
        />
        <Grid.Item size={12}>
          <Actions>
            <Button
              fixedWidth
              title="Request Influencers"
              onPress={() => onActionTaken(onRequestInfluencers)}
            />
          </Actions>
        </Grid.Item>
        <Grid.Item size={12}>
          <SubTitle isCentered>or</SubTitle>
        </Grid.Item>
        <Grid.Item size={12}>
          <Actions>
            <Button
              fixedWidth
              title="Finish"
              onPress={() => onActionTaken(onFinish)}
            />
          </Actions>
        </Grid.Item>
      </Grid>
    </Modal>
  );
};

CampaignCreationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  onRequestInfluencers: PropTypes.func.isRequired,
  hasBeenEdited: PropTypes.bool.isRequired,
};
export default CampaignCreationModal;
