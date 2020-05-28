const { BOOKING_STATE } = require('../../consts');
const notifyAcceptedInfluencer = require('../../notifications/notifyAcceptedInfluencer');

module.exports = async (root, args, { client, q, activeUserRef }) => {
  const { id, state } = args;

  await client.query(
    q.Let(
      {
        booking: q.Ref(q.Collection('Booking'), id),
      },
      q.If(
        q.Equals(
          q.Select(
            ['data', 'user'],
            q.Get(q.Select(['data', 'campaign'], q.Get(q.Var('booking'))))
          ),
          activeUserRef
        ),
        q.Update(q.Ref(q.Collection('Booking'), id), {
          data: {
            state,
          },
        }),
        q.Abort('You are not the owner of this campaign')
      )
    )
  );
  // Stop function here if not accepting booking
  if (state !== BOOKING_STATE.ACCEPTED) return true;
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

  const { influencer, brand } = await client.query(
    q.Let(
      {
        booking: q.Ref(q.Collection('Booking'), id),
      },
      {
        influencer: q.Select(
          'data',
          q.Get(q.Select(['data', 'user'], q.Get(q.Var('booking'))))
        ),
        brand: q.Select(['data', 'name'], q.Get(activeUserRef)),
      }
    )
  );
  notifyAcceptedInfluencer(influencer, brand);

  return true;
};
