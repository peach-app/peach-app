module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  console.log('root', root.ref);
  return client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('campaign_by_user'), root.ref)),
      q.Lambda('ref', DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );
};
