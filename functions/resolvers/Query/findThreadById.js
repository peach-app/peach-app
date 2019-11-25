module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Let(
      {
        ref: q.Ref(q.Collection('Thread'), args.id),
      },
      {
        _id: q.Select(['id'], q.Var('ref')),
        ref: q.Var('ref'),
      }
    )
  );
};
