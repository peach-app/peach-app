module.exports = (root, args, { client, q, DocumentDataWithId }) => {
  return client.query(
    q.Let(
      {
        ref: q.Ref(q.Collection('User'), args.id),
      },
      DocumentDataWithId(q.Get(q.Var('ref')))
    )
  );
};
