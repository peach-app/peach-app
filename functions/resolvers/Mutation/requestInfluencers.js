const { BOOKING_STATE } = require('../../consts');

module.exports = async (
  root,
  { requestedInfluencers, campaignId },
  { client, q, activeUserRef }
) => {
  await client.query(
    q.Let(
      {
        campaign: q.Ref(q.Collection('Campaign'), campaignId),
      },
      q.If(
        q.Equals(
          activeUserRef,
          q.Select(['data', 'user'], q.Get(q.Var('campaign')))
        ),

        q.Map(
          q.Filter(
            requestedInfluencers,
            q.Lambda(
              ['_id'],
              q.Not(
                q.Exists(
                  q.Intersection(
                    q.Match(
                      q.Index('booking_by_user'),
                      q.Ref(q.Collection('User'), q.Var('_id'))
                    ),
                    q.Match(q.Index('booking_by_campaign'), q.Var('campaign'))
                  )
                )
              )
            )
          ),
          q.Lambda(
            ['_id'],
            q.Create(q.Collection('Booking'), {
              data: {
                campaign: q.Var('campaign'),
                user: q.Ref(q.Collection('User'), q.Var('_id')),
                state: BOOKING_STATE.REQUESTED,
              },
            })
          )
        ),

        q.Abort('You are not the owner of this campaign')
      )
    )
  );

  return true;
};
