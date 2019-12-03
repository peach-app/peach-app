module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  return client.query(
    q.Let(
      {
        ref: q.Ref(q.Collection('Campaign'), args.id),
      },
      DocumentDataWithId(q.Get(q.Var('ref')))
    )
  );
};
