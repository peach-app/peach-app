module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Let(
      {
        match: q.Match(
          q.Index('booking_by_campaign_user'),
          root.ref,
          q.Identity()
        ),
      },
      q.If(
        q.Exists(q.Var('match')),
        q.Let(
          {
            booking: q.Get(q.Var('match')),
          },
          q.Merge(
            {
              _id: q.Select(['ref', 'id'], q.Var('booking')),
              ref: q.Select(['ref'], q.Var('booking')),
            },
            q.Select(['data'], q.Var('booking'))
          )
        ),
        null
      )
    )
  );
};
