/* eslint-disable no-underscore-dangle */
const { BOOKING_STATE } = require('../../consts');

module.exports = async (_, { influencerId, campaigns }, { client, q }) => {
  await client.query(
    q.Map(
      campaigns,
      q.Lambda(
        ['id'],
        q.Create(q.Collection('Booking'), {
          data: {
            campaign: q.Ref(q.Collection('Campaign'), q.Var('id')),
            user: q.Ref(q.Collection('User'), influencerId),
            state: BOOKING_STATE.REQUESTED,
          },
        })
      )
    )
  );
  return true;
};
