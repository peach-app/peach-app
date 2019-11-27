module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('message_ts_thread_by_thread'), root.ref), {
        size: 30,
      }),
      q.Lambda(
        ['ts', 'ref'],
        q.Merge(
          { _id: q.Select(['id'], q.Var('ref')), ref: q.Var('ref') },
          q.Select(['data'], q.Get(q.Var('ref')))
        )
      )
    )
  );
};
