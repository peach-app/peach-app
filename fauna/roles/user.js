const { USER_TYPE, BOOKING_STATE } = require('../consts');
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
                q.If(
                  q.Equals(
                    q.Select(['data', 'type'], q.Get(q.Identity())),
                    USER_TYPE.BRAND
                  ),
                  q.Equals(
                    q.Select(
                      ['data', 'user'],
                      q.Get(q.Select(['data', 'campaign'], q.Var('booking')))
                    ),
                    q.Identity()
                  ),
                  q.Equals(
                    q.Select(['data', 'user'], q.Var('booking')),
                    q.Identity()
                  )
                )
              )
            ),
            write: q.Query(
              q.Lambda(
                ['newData', 'booking'],
                q.Or(
                  q.Equals(
                    q.Select(
                      ['data', 'user'],
                      q.Get(q.Select(['data', 'campaign'], q.Var('booking')))
                    ),
                    q.Identity()
                  ),
                  q.And(
                    q.Equals(
                      q.Select(['data', 'user'], q.Var('booking')),
                      q.Identity()
                    ),
                    q.Equals(
                      q.Select(['data', 'state'], q.Var('booking')),
                      BOOKING_STATE.COMPLETE
                    )
                  )
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
                ['newData', 'campaign'],
                q.Equals(
                  q.Select(['data', 'user'], q.Var('campaign')),
                  q.Identity()
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
                'campaign',
                q.Equals(
                  q.Select(['data', 'user'], q.Var('campaign')),
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
            write: true,
          },
        },
        {
          resource: q.Collection('Thread'),
          actions: {
            read: true,
            create: true,
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
            create: true,
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
          resource: q.Index('booking_by_campaign'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('booking_by_state'),
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
          resource: q.Index('booking_campaign_by_user_state'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('booking_campaign_by_state'),
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
          resource: q.Index('thread_users_by_user'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Index('user_name_by_type'),
          actions: {
            read: true,
          },
        },
      ],
    })
  );
};
