const { USER_TYPE } = require('../../consts');

module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  const { state, size = 1, after, before } = args;

  return client.query(
    q.Map(
      q.Paginate(
        q.If(
          q.Equals(
            q.Select(['data', 'type'], q.Get(q.Identity())),
            USER_TYPE.BRAND
          ),

          // brand
          q.Match(q.Index('campaign_by_user'), q.Identity()),

          // influencer
          q.Match(
            q.Index('booking_campaign_by_user_state'),
            q.Identity(),
            state
          )
        ),
        {
          size,
          ...(after && { after: q.Ref(q.Collection('Campaign'), after) }),
          ...(before && { before: q.Ref(q.Collection('Campaign'), before) }),
        }
      ),
      q.Lambda('ref', DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );
};
