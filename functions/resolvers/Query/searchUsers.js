module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  if (!args.query) {
    return {
      data: [],
    };
  }

  return client.query(
    q.Map(
      q.Paginate(
        q.Filter(
          q.Match(q.Index('user_by_type'), args.type),
          q.Lambda(
            'ref',
            q.Not(
              q.Equals(
                q.FindStr(
                  q.Select(['data', 'name'], q.Get(q.Var('ref'))),
                  args.query.toLowerCase()
                ),
                -1
              )
            )
          )
        )
      ),
      q.Lambda('ref', DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );
};
