module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, activeUserRef }
) => {
  return client.query(
    q.Let(
      {
        message: q.Create(q.Collection('Message'), {
          data: {
            user: activeUserRef,
            thread: q.Ref(q.Collection('Thread'), args.threadId),
            text: args.text,
          },
        }),
      },
      DocumentDataWithId(q.Var('message'))
    )
  );
};
