import CampaignCreationModal from '../CampaignCreationModal';
import ConfirmRequestInfluencersModal from '../ConfirmRequestInfluencersModal';
import { MODAL_TYPES } from '../../../consts';

export default {
  [MODAL_TYPES.CAMPAIGN_CREATION]: CampaignCreationModal,
  [MODAL_TYPES.CONFIRM_REQUEST_INFLUENCERS]: ConfirmRequestInfluencersModal
};
