const sendMessageNotification = require('../../notifications/sendMessageNotification');

module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, activeUserRef }
) => {
  const message = client.query(
    q.Let(
      {
        thread: q.Ref(q.Collection('Thread'), args.threadId),
      },
      q.If(
        q.Exists(
          q.Match(
            q.Index('thread_users_by_thread_user'),
            q.Var('thread'),
            activeUserRef
          )
        ),
        DocumentDataWithId(
          q.Create(q.Collection('Message'), {
            data: {
              user: activeUserRef,
              thread: q.Var('thread'),
              text: args.text,
            },
          })
        ),
        q.Abort('You do not belong to this thread')
      )
    )
  );

  const {
    recipient: { data: to },
    from,
  } = await client.query(
    q.Let(
      {
        thread: q.Ref(q.Collection('Thread'), args.threadId),
        sender: q.Get(activeUserRef),
      },
      {
        recipient: q.Map(
          q.Filter(
            q.Paginate(
              q.Match(q.Index('thread_users_by_thread'), q.Var('thread'))
            ),
            q.Lambda('ref', q.Not(q.Equals(q.Var('ref'), activeUserRef)))
          ),
          q.Lambda('ref', DocumentDataWithId(q.Get(q.Var('ref'))))
        ),

        from: q.Select(['data', 'name'], q.Var('sender')),
      }
    )
  );

  sendMessageNotification(to[0], from, args.text);

  return message;
};
