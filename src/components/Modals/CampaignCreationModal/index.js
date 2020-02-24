import React from 'react';
import PropTypes from 'prop-types';

import { SubTitle, Modal, Actions, Button, Grid } from '../..';
import FeedbackView from '../../FeedbackView';

const CampaignCreationModal = ({ onClose, onFinish, onRequestInfluencers }) => {
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
          title="Campaign created successfully!"
          subTitle="All influencers on our platform will be able to discover and apply
            for your campaign. If you want someone specific you can:"
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
};
export default CampaignCreationModal;
