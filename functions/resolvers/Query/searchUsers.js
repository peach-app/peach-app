module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  if (args.campaignId) {
    let a;

    try {
      a = await client.query(
        q.Map(
          q.Paginate(
            q.Filter(
              q.Difference(
                q.Match(q.Index('user_name_by_type'), args.type),
                q.Match(
                  q.Index('user_by_campaign_booking'),
                  q.Ref(q.Collection('Campaign'), args.campaignId)
                )
                // q.Select(
                //   ['data'],
                //   q.Get(
                //     q.Select(
                //       ['data', 'user'],
                //       q.Get(
                //         q.Match(
                //           q.Index('booking_by_campaign'),
                //           q.Ref(q.Collection('Campaign'), args.campaignId)
                //         )
                //       )
                //     )
                //   )
                // )
              ),
              q.Lambda(
                ['name', 'ref'],
                q.Not(
                  q.Equals(
                    q.FindStr(
                      q.LowerCase(q.Var('name')),
                      args.query.toLowerCase()
                    ),
                    -1
                  )
                )
              )
            )
          ),
          q.Lambda(['name', 'ref'], DocumentDataWithId(q.Get(q.Var('ref'))))
        )
      );
    } catch (e) {
      console.log('error', e);
    }
    console.log('filtered', a);
    return a;
  }

  return client.query(
    q.Map(
      q.Paginate(
        q.Filter(
          q.Match(q.Index('user_name_by_type'), args.type),
          q.Lambda(
            ['name', 'ref'],
            q.Not(
              q.Equals(
                q.FindStr(q.LowerCase(q.Var('name')), args.query.toLowerCase()),
                -1
              )
            )
          )
        )
      ),
      q.Lambda(['name', 'ref'], DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );
};
