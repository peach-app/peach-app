const { BOOKING_STATE } = require('../../consts');

module.exports = async (root, args, { client, q }) => {
  const { id, note } = args;

  await client.query(
    q.Update(q.Ref(q.Collection('Booking'), id), {
      data: {
        state: BOOKING_STATE.COMPLETE,
        note,
      },
    })
  );
  return true;
};
