module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  return client.query(
    q.Let(
      {
        match: q.Intersection(
          q.Match(q.Index('booking_by_user'), q.Identity()),
          q.Match(q.Index('booking_by_campaign'), root.ref)
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
