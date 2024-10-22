const { UserInputError } = require('apollo-server-lambda');
const { BOOKING_STATE, USER_TYPE } = require('../../consts');
const notifyBrandForApplication = require('../../notifications/notifyBrandForApplication');

module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, activeUserRef }
) => {
  const { id, cost } = args;
  const isInfluencer = await client.query(
    q.Equals(
      q.Select(['data', 'type'], q.Get(activeUserRef)),
      USER_TYPE.INFLUENCER
    )
  );

  if (!isInfluencer) {
    throw new Error('User is not an influencer');
  }

  const isUnpaid = await client.query(
    q.Select(['data', 'unpaid'], q.Get(q.Ref(q.Collection('Campaign'), id)))
  );

  if (!isUnpaid && !cost) {
    throw new UserInputError('No pay rate supplied for application');
  }

  const existingBooking = await client.query(
    q.Let(
      {
        booking: q.Intersection(
          q.Match(q.Index('booking_by_user'), activeUserRef),
          q.Match(
            q.Index('booking_by_campaign'),
            q.Ref(q.Collection('Campaign'), id)
          )
        ),
      },
      q.If(q.Exists(q.Var('booking')), q.Get(q.Var('booking')), null)
    )
  );

  const { brand, influencer } = await client.query({
    brand: q.Get(
      q.Select(['data', 'user'], q.Get(q.Ref(q.Collection('Campaign'), id)))
    ),
    influencer: q.Get(activeUserRef),
  });

  notifyBrandForApplication(brand, influencer);

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
              user: activeUserRef,
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
