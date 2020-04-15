const { BOOKING_STATE } = require('../../consts');
const stripe = require('../../helpers/stripe');

module.exports = async (root, args, { client, q, activeUserRef }) => {
  const { id, state, cardId, token } = args;

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

  const customerId = await client.query(
    q.Select(['data', 'stripeID'], q.Get(activeUserRef))
  );

  const getPaymentMethod = async () => {
    if (token) {
      return stripe.paymentMethods.create({
        type: 'card',
        card: {
          token,
        },
      });
    }

    return { id: cardId };
  };

  const { id: paymentId } = await getPaymentMethod();

  await stripe.paymentIntents.create({
    amount: 500, // Pence for campaign creation cost
    currency: 'gbp',
    confirm: true,
    payment_method: paymentId,
    setup_future_usage: 'on_session',
    customer: customerId,
  });

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

  return true;
};
