const { UserInputError } = require('apollo-server-lambda');
const { BOOKING_STATE } = require('../../consts');

module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  const { id, cost } = args;

  console.log(args);

  if (!cost) {
    throw new UserInputError('No pay rate supplied for application');
  }

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
              state: BOOKING_STATE.APPLIED,
              cost,
            },
          }),
        },
        DocumentDataWithId(q.Var('booking'))
      )
    )
  );
};
