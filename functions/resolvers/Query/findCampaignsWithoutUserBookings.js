module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, formatRefs, activeUserRef }
) => {
  const { id, size, before, after } = args;

  return client.query(
    q.Map(
      q.Paginate(
        q.Difference(
          q.Match(q.Index('campaign_by_user'), activeUserRef),
          q.Match(
            q.Index('booking_campaign_by_user'),
            q.Ref(q.Collection('User'), id)
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
