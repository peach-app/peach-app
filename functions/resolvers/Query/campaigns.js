const { USER_TYPE } = require('../../consts');

module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  return client.query(
    q.If(
      // If current user is a BRAND
      q.Equals(
        q.Select(['data', 'type'], q.Get(q.Identity())),
        USER_TYPE.BRAND
      ),

      // Return user created campaigns
      q.Map(
        q.Paginate(q.Match(q.Index('campaign_by_user'), q.Identity())),
        q.Lambda('ref', DocumentDataWithId(q.Get(q.Var('ref'))))
      ),

      // Return campaigns by user bookings
      q.Map(
        q.Paginate(
          q.Match(q.Index('booking_by_user_state'), q.Identity(), args.state)
        ),
        q.Lambda(
          'ref',
          q.Let(
            {
              campaign: q.Select(['data', 'campaign'], q.Get(q.Var('ref'))),
            },
            DocumentDataWithId(q.Get(q.Var('campaign')))
          )
        )
      )
    )
  );
};
