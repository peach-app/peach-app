module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, formatRefs }
) => {
  const { size, after, before } = args;

  return client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('all_campaign')), {
        size,
        ...(after && { after: formatRefs(after) }),
        ...(before && { before: formatRefs(before) }),
      }),
      q.Lambda('ref', DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );
};
