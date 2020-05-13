const { BOOKING_STATE, USER_TYPE } = require('../../consts');

module.exports = async (root, args, { client, q, activeUserRef }) => {
  const isInfluencer = await client.query(
    q.Equals(
      q.Select(['data', 'type'], q.Get(activeUserRef)),
      USER_TYPE.INFLUENCER
    )
  );

  if (isInfluencer) {
    return client.query(
      q.Count(
        q.Intersection(
          q.Match(q.Index('booking_by_user'), activeUserRef),
          q.Match(q.Index('booking_by_state'), BOOKING_STATE.REQUESTED)
        )
      )
    );
  }

  return client.query(
    q.Count(
      q.Intersection(
        q.Match(q.Index('campaign_by_user'), activeUserRef),
        q.Match(q.Index('booking_campaign_by_state'), BOOKING_STATE.APPLIED)
      )
    )
  );
};
