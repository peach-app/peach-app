module.exports = {
  register: require('./register'),
  login: require('./login'),
  sendMessage: require('./sendMessage'),
  createCampaign: require('./createCampaign'),
  applyToCampaign: require('./applyToCampaign'),
  updateBookingState: require('./updateBookingState'),
  updateUser: require('./updateUser'),
  completeOnboarding: require('./completeOnboarding'),
  createBillingMethod: require('./createBillingMethod'),
};
