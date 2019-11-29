module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Let(
      {
        match: q.Match(q.Index('message_ts_thread_by_thread'), root.ref),
      },
      q.If(
        q.Exists(q.Var('match')),
        q.Let(
          {
            message: q.Get(q.Var('match')),
          },
          q.Merge(q.Select(['data'], q.Var('message')), {
            _id: q.Select(['ref', 'id'], q.Var('message')),
            ref: q.Select(['ref'], q.Var('message')),
          })
        ),
        null
      )
    )
  );
};
