const { client, q } = require('../helpers/db');
const { makeFunction } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeFunction({
      name: 'campaigns_by_user_type',
      body: q.Query(
        q.Lambda(
          ['size', 'afterCursor', 'beforeCursor'],
          q.If(
            // If identity type === "INFLUENCER"
            q.Equals(
              q.Select(['data', 'type'], q.Get(q.Identity())),
              'INFLUENCER'
            ),

            // Then
            q.Map(
              q.Paginate(
                q.Match(q.Index('booking_user_by_user'), q.Identity())
              ),
              q.Lambda('cmp', q.Get(q.Var('cmp')))
            ),

            // Else
            q.Map(
              q.Paginate(
                q.Match(q.Index('campaign_user_by_user'), q.Identity())
              ),
              q.Lambda('cmp', q.Get(q.Var('cmp')))
            )
          )
        )
      ),
    })
  );

  console.log('"campaigns_by_user_type" function created');
};
