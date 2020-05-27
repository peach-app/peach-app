const { BUDGET_TYPE } = require('../../consts');

module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, formatRefs }
) => {
  const { size, after, before, type } = args;

  return client.query(
    q.Map(
      q.Paginate(
        q.If(
          Boolean(type),
          q.Intersection(
            q.Match(q.Index('all_campaign_by_private'), false),
            q.Match(
              q.Index('all_campaign_by_unpaid'),
              type === BUDGET_TYPE.UNPAID
            )
          ),
          q.Match(q.Index('all_campaign_by_private'), false)
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
