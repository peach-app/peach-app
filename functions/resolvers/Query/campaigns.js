const { USER_TYPE } = require('../../consts');

module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, formatRefs }
) => {
  const { state, size = 30, after, before } = args;

  const isBrand = q.Equals(
    q.Select(['data', 'type'], q.Get(q.Identity())),
    USER_TYPE.BRAND
  );

  return client.query(
    q.Map(
      q.Paginate(
        q.If(
          isBrand,

          // brand
          q.If(
            Boolean(state),
            q.Intersection(
              q.Match(q.Index('campaign_by_user'), q.Identity()),
              q.Match(q.Index('booking_campaign_by_state'), state)
            ),
            q.Match(q.Index('campaign_by_user'), q.Identity())
          ),

          // influencer
          q.Match(
            q.Index('booking_campaign_by_user_state'),
            q.Identity(),
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
