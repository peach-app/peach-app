const { BOOKING_STATE } = require('../../consts');

module.exports = async (root, args, { client, q, activeUserRef }) => {
  const { id, note } = args;

  await client.query(
    q.Let(
      {
        booking: q.Ref(q.Collection('Booking'), id),
      },
      q.If(
        q.Equals(
          activeUserRef,
          q.Select(['data', 'user'], q.Get(q.Var('booking')))
        ),
        q.Update(q.Var('booking'), {
          data: {
            state: BOOKING_STATE.COMPLETE,
            note,
          },
        }),
        q.Abort('You are not the owner of this booking')
      )
    )
  );

  return true;
};
