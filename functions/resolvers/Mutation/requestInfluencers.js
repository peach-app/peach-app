/* eslint-disable no-underscore-dangle */
const { BOOKING_STATE } = require('../../consts');

module.exports = async (
  _,
  { requestedInfluencers, campaignId },
  { client, q, activeUserRef }
) => {
  await client.query(
    q.Let(
      {
        campaign: q.Ref(q.Collection('Campaign'), campaignId),
      },
      q.If(
        q.Equals(
          activeUserRef,
          q.Select(['data', 'user'], q.Get(q.Var('campaign')))
        ),

        q.Map(
          requestedInfluencers,
          q.Lambda(
            ['_id'],
            q.Create(q.Collection('Booking'), {
              data: {
                campaign: q.Var('campaign'),
                user: q.Ref(q.Collection('User'), q.Var('_id')),
                state: BOOKING_STATE.REQUESTED,
              },
            })
          )
        ),

        q.Abort('You are not the owner of this campaign')
      )
    )
  );

  return true;
};
