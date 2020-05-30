const notifyMessageRecipients = require('../../notifications/notifyMessageRecipients');

module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, activeUserRef }
) => {
  const { threadId, text } = args;

  const message = client.query(
    q.Let(
      {
        thread: q.Ref(q.Collection('Thread'), threadId),
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
              text,
            },
          })
        ),
        q.Abort('You do not belong to this thread')
      )
    )
  );

  const { recipients, from } = await client.query({
    recipients: q.Map(
      q.Filter(
        q.Paginate(
          q.Match(
            q.Index('thread_users_by_thread'),
            q.Ref(q.Collection('Thread'), threadId)
          )
        ),
        q.Lambda('ref', q.Not(q.Equals(q.Var('ref'), activeUserRef)))
      ),
      q.Lambda('ref', q.Get(q.Var('ref')))
    ),
    from: q.Get(activeUserRef),
  });

  notifyMessageRecipients(recipients.data, from, text);

  return message;
};
