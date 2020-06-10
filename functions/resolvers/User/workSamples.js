module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  const { data } = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('work_sample_by_user'), root.ref)),
      q.Lambda('ref', DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );

  return data;
};
