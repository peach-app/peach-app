import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Modal, FeedbackView, Grid, Intro, Container } from 'components';

const ConfirmRequestedInfluencerToCampaignModal = ({
  onClose,
  onNavigateBack,
}) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      onClose();
      onNavigateBack();
    }, 2500);
    return () => clearTimeout(timeOut);
  }, []);
  return (
    <Modal isOpen>
      <Container>
        <Intro />
        <Grid>
          <FeedbackView
            title="All done!"
            subTitle="We have sent the request to the influencer and we will notify you as soon as they respond."
          />
        </Grid>
      </Container>
    </Modal>
  );
};

ConfirmRequestedInfluencerToCampaignModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onNavigateBack: PropTypes.func.isRequired,
};
export default ConfirmRequestedInfluencerToCampaignModal;
