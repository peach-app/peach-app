const { USER_TYPE } = require('../../consts');

module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, formatRefs, activeUserRef }
) => {
  const { state, size = 30, after, before } = args;

  return client.query(
    q.Map(
      q.Paginate(
        q.If(
          q.Equals(
            q.Select(['data', 'type'], q.Get(activeUserRef)),
            USER_TYPE.BRAND
          ),

          // brand
          q.If(
            Boolean(state),
            q.Intersection(
              q.Match(q.Index('campaign_by_user'), activeUserRef),
              q.Match(q.Index('booking_campaign_by_state'), state)
            ),
            q.Match(q.Index('campaign_by_user'), activeUserRef)
          ),

          // influencer
          q.Match(
            q.Index('booking_campaign_by_user_state'),
            activeUserRef,
            state
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
