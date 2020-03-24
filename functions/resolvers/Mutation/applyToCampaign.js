const { UserInputError } = require('apollo-server-lambda');
const { BOOKING_STATE } = require('../../consts');

module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  const { id, cost } = args;

  if (!cost) {
    throw new UserInputError('No pay rate supplied for application');
  }

  const existingBooking = await client.query(
    q.Let(
      {
        booking: q.Intersection(
          q.Match(q.Index('booking_by_user'), q.Identity()),
          q.Match(
            q.Index('booking_by_campaign'),
            q.Ref(q.Collection('Campaign'), id)
          )
        ),
      },
      q.If(q.Exists(q.Var('booking')), q.Get(q.Var('booking')), null)
    )
  );

  if (
    existingBooking &&
    existingBooking.data.state === BOOKING_STATE.REQUESTED
  ) {
    return client.query(
      q.Let(
        {
          booking: q.Update(existingBooking.ref, {
            data: {
              state: BOOKING_STATE.APPLIED,
              cost,
            },
          }),
        },
        DocumentDataWithId(q.Var('booking'))
      )
    );
  }

  return client.query(
    q.If(
      Boolean(existingBooking),
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
