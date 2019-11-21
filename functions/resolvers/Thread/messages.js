module.exports = async (root, args, { client, q }) => {
  console.log('go');
  return client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('message_thread_by_thread'), root.ref)),
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
