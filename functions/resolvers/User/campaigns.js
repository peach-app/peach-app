module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('campaign_by_user'), root.ref)),
      q.Lambda(
        'ref',
        q.Merge(
          { _id: q.Select(['id'], q.Var('ref')) },
          q.Select(['data'], q.Get(q.Var('ref')))
        )
      )
    )
  );
};
