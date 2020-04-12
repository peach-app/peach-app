import { MODAL_TYPES } from 'consts';
import CampaignCreationModal from '../CampaignCreationModal';
import ConfirmRequestInfluencersModal from '../ConfirmRequestInfluencersModal';
import ConfirmRequestedInfluencerToCampaignModal from '../ConfirmRequestedInfluencerToCampaignModal';
import ConfirmPaymentModal from '../ConfirmPaymentModal';

export default {
  [MODAL_TYPES.CAMPAIGN_CREATION]: CampaignCreationModal,
  [MODAL_TYPES.CONFIRM_REQUEST_INFLUENCERS]: ConfirmRequestInfluencersModal,
  [MODAL_TYPES.CONFIRM_REQUESTED_INFLUENCER_TO_CAMPAIGNS]: ConfirmRequestedInfluencerToCampaignModal,
  [MODAL_TYPES.CONFIRM_PAYMENT]: ConfirmPaymentModal,
};
