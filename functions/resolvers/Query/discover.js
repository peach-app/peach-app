module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Select(
      ['data'],
      q.Map(
        q.Paginate(q.Match(q.Index('all_campaign'))),
        q.Lambda(
          'ref',
          q.Merge(
            { _id: q.Select(['id'], q.Var('ref')) },
            q.Select(['data'], q.Get(q.Var('ref')))
          )
        )
      )
    )
  );
};
