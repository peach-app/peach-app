module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Let(
      {
        message: q.Create(q.Collection('Message'), {
          data: {
            user: q.Identity(),
            thread: q.Ref(q.Collection('Thread'), args.threadId),
            text: args.text,
          },
        }),
      },
      q.Merge(
        {
          _id: q.Select(['ref', 'id'], q.Var('message')),
          ref: q.Select(['ref'], q.Var('message')),
        },
        q.Select(['data'], q.Var('message'))
      )
    )
  );
};
