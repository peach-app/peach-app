const { BOOKING_STATE } = require('../../consts');
const notifyRequestedInfluencers = require('../../notifications/notifyRequestedInfluencers');

module.exports = async (
  root,
  { requestedInfluencers, campaignId },
  { client, q, activeUserRef, DocumentDataWithId }
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

  let influencersToNotify;
  try {
    influencersToNotify = await client.query(
      q.Map(
        requestedInfluencers,
        q.Lambda(
          '_id',
          DocumentDataWithId(q.Get(q.Ref(q.Collection('User'), q.Var('_id'))))
        )
      )
    );
  } catch (e) {
    console.log('There was a problem getting the influencer profiles', e);
  }

  if (influencersToNotify.length > 0) {
    const {
      data: { name },
    } = await client.query(q.Get(activeUserRef));

    notifyRequestedInfluencers(influencersToNotify, name);
  }

  return true;
};
