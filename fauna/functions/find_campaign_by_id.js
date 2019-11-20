const { client, q } = require('../helpers/db');
const { makeFunction } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeFunction({
      name: 'find_campaign_by_id',
      body: q.Query(
        q.Lambda(
          ['id'],
          q.Let(
            {
              ref: q.Ref(q.Collection('Campaign'), q.Var('id')),
              campaign: q.Get(q.Var('ref')),
            },
            q.Merge(q.Var('campaign'), {
              data: q.Merge(q.Select(['data'], q.Var('campaign')), {
                userBooking: q.Match(q.Index('booking_by_campaign_user'), [
                  q.Identity(),
                  q.Var('ref'),
                ]),
              }),
            })
          )
        )
      ),
    })
  );

  console.log('"find_campaign_by_id" function created');
};
