const { BOOKING_STATE } = require('../../consts');

module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  const { id } = args;

  return client.query(
    q.If(
      q.Exists(
        q.Match(
          q.Index('booking_by_campaign_user'),
          q.Ref(q.Collection('Campaign'), id),
          q.Identity()
        )
      ),
      q.Abort('User already applied to campaign.'),
      q.Let(
        {
          booking: q.Create(q.Collection('Booking'), {
            data: {
              campaign: q.Ref(q.Collection('Campaign'), id),
              user: q.Identity(),
              cost: 100.0,
              state: BOOKING_STATE.APPLIED,
            },
          }),
        },
        DocumentDataWithId(q.Var('booking'))
      )
    )
  );
};
