module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
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
        DocumentDataWithId(q.Get(q.Var('match'))),
        null
      )
    )
  );
};
