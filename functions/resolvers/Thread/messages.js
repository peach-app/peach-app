module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('message_thread_by_thread_by_ts'), root.ref)),
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
