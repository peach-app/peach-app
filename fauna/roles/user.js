const { client, q } = require('../helpers/db');
const { makeRole } = require('../helpers/updateOrCreate');
const { USER_TYPE } = require('../consts');

module.exports = async () => {
  console.log('Creating "user" role');

  await client.query(
    makeRole({
      name: 'user',
      membership: [
        {
          resource: q.Collection('User'),
        },
      ],
      privileges: [
        // COLLECTIONS
        {
          resource: q.Collection('Booking'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Collection('Campaign'),
          actions: {
            read: q.Query(
              q.Lambda(
                'ref',
                q.If(
                  // If user is brand
                  q.Equals(
                    q.Select(['data', 'type'], q.Get(q.Identity())),
                    USER_TYPE.BRAND
                  ),

                  // Return own campaigns
                  q.Equals(
                    q.Select(['data', 'user'], q.Get(q.Var('ref'))),
                    q.Identity()
                  ),

                  // Return all
                  true
                )
              )
            ),
            write: q.Query(
              q.Lambda(
                'ref',
                q.Equals(
                  q.Identity(),
                  q.Select(['data', 'user'], q.Get(q.Var('ref')))
                )
              )
            ),
            create: q.Query(
              q.Lambda(
                ['ref'],
                q.Equals(
                  q.Select(['data', 'type'], q.Get(q.Identity())),
                  USER_TYPE.BRAND
                )
              )
            ),
            delete: q.Query(
              q.Lambda(
                'ref',
                q.Equals(
                  q.Identity(),
                  q.Select(['data', 'user'], q.Get(q.Var('ref')))
                )
              )
            ),
          },
        },
        {
          resource: q.Collection('User'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Collection('Thread'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Collection('Message'),
          actions: {
            read: true,
            create: true,
          },
        },
        {
          resource: q.Collection('thread_users'),
          actions: {
            read: true,
          },
        },

        // INDEXES
        {
          resource: q.Index('all_campaign'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('all_thread_users'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('booking_campaign_by_campaign'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('booking_user_by_user'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('campaign_user_by_user'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('thread_users_by_thread'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('thread_users_by_thread_and_user'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('message_thread_by_thread'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('message_thread_by_thread_by_ts'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('thread_users_by_user'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('booking_by_campaign_user'),
          actions: {
            read: true,
          },
        },
      ],
    })
  );
};
