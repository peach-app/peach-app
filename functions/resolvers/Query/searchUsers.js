module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  return client.query(
    q.Map(
      q.Paginate(
        q.Filter(
          q.If(
            Boolean(args.campaignId),
            q.Difference(
              q.Match(q.Index('user_by_type'), args.type),
              q.Match(
                q.Index('booking_user_by_campaign'),
                q.Ref(q.Collection('Campaign'), args.campaignId)
              )
            ),
            q.Match(q.Index('user_by_type'), args.type)
          ),
          q.Lambda(
            ['ref'],
            q.Not(
              q.Equals(
                q.FindStr(
                  q.LowerCase(q.Select(['data', 'name'], q.Get(q.Var('ref')))),
                  args.query.toLowerCase()
                ),
                -1
              )
            )
          )
        )
      ),
      q.Lambda(['ref'], DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );
};
