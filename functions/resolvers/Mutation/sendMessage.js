module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.If(
      q.Exists(q.Match(q.Index('thread_users_by_user'), q.Identity())),
      q.Let(
        {
          message: q.Select(
            ['ref'],
            q.Create(q.Collection('Message'), {
              data: {
                user: q.Identity(),
                thread: q.Ref(q.Collection('Thread'), args.threadId),
                text: args.text,
              },
            })
          ),
        },
        q.Merge(q.Select(['data'], q.Get(q.Var('message'))), {
          _id: q.Select(['id'], q.Var('message')),
          ref: q.Var('message'),
        })
      ),
      q.Abort('User does not belong to thread.')
    )
  );
};
