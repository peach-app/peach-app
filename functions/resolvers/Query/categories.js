module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  const { data } = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('Category'))),
      q.Lambda('ref', DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );

  return data;
};
