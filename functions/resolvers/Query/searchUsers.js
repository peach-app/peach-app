module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  return client.query(
    q.Map(
      q.Paginate(
        q.Filter(
          q.Match(q.Index('user_name_by_type'), args.type),
          q.Lambda(
            ['name', 'ref'],
            q.Not(
              q.Equals(
                q.FindStr(q.LowerCase(q.Var('name')), args.query.toLowerCase()),
                -1
              )
            )
          )
        )
      ),
      q.Lambda(['name', 'ref'], DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );
};
