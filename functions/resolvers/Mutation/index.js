module.exports = {
  register: require('./register'),
  login: require('./login'),
  sendMessage: require('./sendMessage'),
  createOrUpdateCampaign: require('./createOrUpdateCampaign'),
  applyToCampaign: require('./applyToCampaign'),
  updateBookingState: require('./updateBookingState'),
  updateUser: require('./updateUser'),
  completeOnboarding: require('./completeOnboarding'),
  requestInfluencers: require('./requestInfluencers'),
  createBillingMethod: require('./createBillingMethod'),
  createPaymentMethod: require('./createPaymentMethod'),
  verifyEmail: require('./verifyEmail'),
  updateUserAvatar: require('./updateUserAvatar'),
  requestInfluencerToCampaigns: require('./requestInfluencerToCampaigns'),
  createOrUpdateSocialAccounts: require('./createOrUpdateSocialAccounts'),
  completeBooking: require('./completeBooking'),
  requestPasswordReset: require('./requestPasswordReset'),
  resetPassword: require('./resetPassword'),
  createPayment: require('./createPayment'),
  declineBooking: require('./declineBooking'),

};
