const { USER_TYPE } = require('../../consts');

// Another nested if didn't work
const getCampaignsWithoutState = (influencerId, q, activeUserRef) =>
  influencerId
    ? q.Difference(
        q.Match(q.Index('campaign_by_user'), activeUserRef),
        q.Match(
          q.Index('booking_campaign_by_user'),
          q.Ref(q.Collection('User'), influencerId)
        )
      )
    : q.Match(q.Index('campaign_by_user'), q.Identity());

module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, formatRefs, activeUserRef }
) => {
  const { state, size = 30, after, before, influencerId } = args;

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
            getCampaignsWithoutState(influencerId, q, activeUserRef)
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
