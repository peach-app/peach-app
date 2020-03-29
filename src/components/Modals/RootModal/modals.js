import { MODAL_TYPES } from 'consts';
import CampaignCreationModal from '../CampaignCreationModal';
import ConfirmRequestInfluencersModal from '../ConfirmRequestInfluencersModal';
import SocialAccountWebViewModal from '../SocialAccountWebViewModal';

export default {
  [MODAL_TYPES.CAMPAIGN_CREATION]: CampaignCreationModal,
  [MODAL_TYPES.CONFIRM_REQUEST_INFLUENCERS]: ConfirmRequestInfluencersModal,
  [MODAL_TYPES.SOCIAL_ACCOUNT_WEB_VIEW]: SocialAccountWebViewModal,
};
