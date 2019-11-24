module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Map(
      q.Filter(
        q.Paginate(q.Match(q.Index('thread_users_by_thread'), root.ref)),
        q.Lambda('ref', q.Not(q.Equals(q.Var('ref'), q.Identity())))
      ),
      q.Lambda(
        'ref',
        q.Merge(
          { _id: q.Select(['id'], q.Var('ref')), ref: q.Var('ref') },
          q.Select(['data'], q.Get(q.Var('ref')))
        )
      )
    )
  );
};
