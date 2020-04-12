module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, formatRefs }
) => {
  const { id, size = 10, after, before } = args;

  return client.query(
    q.Map(
      q.Paginate(
        q.Filter(
          q.Match(q.Index('campaign_by_user'), q.Ref(q.Collection('User'), id)),
          q.Lambda(
            ['ref'],
            q.Equals(q.Select(['data', 'private'], q.Get(q.Var('ref'))), false)
          )
        ),
        {
          size,
          ...(after && { after: formatRefs(after) }),
          ...(before && { before: formatRefs(before) }),
        }
      ),
      q.Lambda('ref', DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );
};
