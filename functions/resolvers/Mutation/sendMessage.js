module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, activeUserRef }
) => {
  return client.query(
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
};
