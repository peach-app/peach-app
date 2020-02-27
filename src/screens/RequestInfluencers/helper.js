export const formatInfluencersArray = (
  requestedInfluencers,
  actionedInfluencer
) => {
  if (requestedInfluencers.length > 0) {
    if (
      requestedInfluencers.find(
        influencer => influencer._id === actionedInfluencer._id
      )
    ) {
      return requestedInfluencers.filter(
        influencer => influencer._id !== actionedInfluencer._id
      );
    }
    return [...requestedInfluencers, actionedInfluencer];
  }

  return [actionedInfluencer];
};
