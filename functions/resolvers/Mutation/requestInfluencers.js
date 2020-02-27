/* eslint-disable no-underscore-dangle */
const { BOOKING_STATE } = require('../../consts');

module.exports = async (
  _,
  { requestedInfluencers, campaignId },
  { client, q }
) => {
  await client.query(
    q.Map(
      requestedInfluencers,
      q.Lambda(
        ['_id'],
        q.Create(q.Collection('Booking'), {
          data: {
            campaign: q.Ref(q.Collection('Campaign'), campaignId),
            user: q.Ref(q.Collection('User'), q.Var('_id')),
            state: BOOKING_STATE.REQUESTED,
          },
        })
      )
    )
  );

  return true;
};
