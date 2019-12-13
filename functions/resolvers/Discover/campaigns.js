module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  const { size, after, before } = args;

  return client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('all_campaign')), {
        size,
        ...(after && { after: q.Ref(q.Collection('Campaign'), after) }),
        ...(before && { before: q.Ref(q.Collection('Campaign'), before) }),
      }),
      q.Lambda('ref', DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );
};
