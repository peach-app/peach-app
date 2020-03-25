const { BOOKING_STATE } = require('../../consts');

module.exports = async (root, args, { client, q, activeUserRef }) => {
  const { id, state } = args;

  await client.query(
    q.Update(q.Ref(q.Collection('Booking'), id), {
      data: {
        state,
      },
    })
  );

  if (state === BOOKING_STATE.ACCEPTED) {
    const {
      data: [hasThread],
    } = await client.query(
      q.Any(
        q.Map(
          q.Paginate(q.Match(q.Index('thread_users_by_user'), activeUserRef)),
          q.Lambda(
            'thread',
            q.Exists(
              q.Match(
                q.Index('thread_users_by_thread_user'),
                q.Var('thread'),
                q.Select(
                  ['data', 'user'],
                  q.Get(q.Ref(q.Collection('Booking'), id))
                )
              )
            )
          )
        )
      )
    );

    if (hasThread) return true;

    await client.query(
      q.Let(
        {
          thread: q.Create(q.Collection('Thread')),
        },
        q.Do(
          q.Create(q.Collection('thread_users'), {
            data: {
              threadID: q.Select(['ref'], q.Var('thread')),
              userID: activeUserRef,
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
