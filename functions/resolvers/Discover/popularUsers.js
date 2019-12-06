module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  return client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('user_name_by_type'), args.type)),
      q.Lambda(['name', 'ref'], DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );
};
