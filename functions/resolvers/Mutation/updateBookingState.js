const { BOOKING_STATE } = require('../../consts');

module.exports = async (root, args, { client, q }) => {
  const { id, state } = args;

  await client.query(
    q.Update(q.Ref(q.Collection('Booking'), id), {
      data: {
        state,
      },
    })
  );

  if (state === BOOKING_STATE.ACCEPTED) {
    await client.query(
      q.Let(
        {
          thread: q.Create(q.Collection('Thread')),
        },
        q.Do(
          q.Create(q.Collection('thread_users'), {
            data: {
              threadID: q.Select(['ref'], q.Var('thread')),
              userID: q.Identity(),
            },
          }),
          q.Create(q.Collection('thread_users'), {
            data: {
              threadID: q.Select(['ref'], q.Var('thread')),
              userID: q.Select(
                ['data', 'user'],
                q.Get(q.Ref(q.Collection('Booking'), id))
              ),
            },
          })
        )
      )
    );
  }

  return true;
};
