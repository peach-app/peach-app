export const formatSelectedCampaigns = (selectedCampaigns, campaignId) => {
  if (selectedCampaigns.length > 0) {
    if (selectedCampaigns.indexOf(campaignId) > -1) {
      return selectedCampaigns.filter(cId => cId !== campaignId);
    }
    return [...selectedCampaigns, campaignId];
  }
  return [campaignId];
};
