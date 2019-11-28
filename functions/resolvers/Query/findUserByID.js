module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Let(
      {
        ref: q.Ref(q.Collection('User'), args.id),
      },
      q.Merge(
        {
          _id: q.Select(['id'], q.Var('ref')),
          ref: q.Var('ref'),
        },
        q.Select(['data'], q.Get(q.Var('ref')))
      )
    )
  );
};
