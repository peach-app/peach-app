const { client, q } = require('../helpers/db');
const { makeRole } = require('../helpers/updateOrCreate');

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
            create: q.Query(
              q.Lambda(
                'booking',
                q.Equals(
                  q.Select(['data', 'user'], q.Var('booking')),
                  q.Identity()
                )
              )
            ),
          },
        },
        {
          resource: q.Collection('Campaign'),
          actions: {
            read: true,
            write: q.Query(
              q.Lambda(
                'ref',
                q.Equals(
                  q.Select(['data', 'user'], q.Get(q.Var('ref'))),
                  q.Identity()
                )
              )
            ),
            delete: q.Query(
              q.Lambda(
                'ref',
                q.Equals(
                  q.Select(['data', 'user'], q.Get(q.Var('ref'))),
                  q.Identity()
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
            create: q.Query(
              q.Lambda(
                'message',
                q.Exists(
                  q.Match(
                    q.Index('thread_users_by_thread_user'),
                    q.Select(['data', 'thread'], q.Var('message')),
                    q.Identity()
                  )
                )
              )
            ),
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
          resource: q.Index('booking_by_campaign'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('booking_by_campaign_state'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('booking_by_user'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('booking_by_user_state'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('campaign_by_user'),
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
          resource: q.Index('thread_users_by_thread_user'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('message_by_thread'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('message_ts_thread_by_thread'),
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
