const { client, q } = require('../helpers/db');
const { makeRole } = require('../helpers/updateOrCreate');
const { USER_TYPE } = require('../consts');

module.exports = async () => {
  await client.query(
    makeRole({
      name: 'user',
      membership: [
        {
          resource: q.Collection('User'),
        },
      ],
      privileges: [
        {
          resource: q.Collection('Booking'),
          actions: {
            read: true,
            write: false,
            create: false,
            delete: false,
            history_read: false,
            history_write: false,
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
            create: false,
            delete: q.Query(
              q.Lambda(
                'ref',
                q.Equals(
                  q.Identity(),
                  q.Select(['data', 'user'], q.Get(q.Var('ref')))
                )
              )
            ),
            history_read: false,
            history_write: false,
          },
        },
        {
          resource: q.Collection('User'),
          actions: {
            read: true,
            write: false,
            create: false,
            delete: false,
            history_read: false,
            history_write: false,
          },
        },
        {
          resource: q.Collection('Thread'),
          actions: {
            read: true,
            write: false,
            create: false,
            delete: false,
            history_read: false,
            history_write: false,
          },
        },
        {
          resource: q.Collection('Message'),
          actions: {
            read: true,
            write: false,
            create: false,
            delete: false,
            history_read: false,
            history_write: false,
          },
        },
        {
          resource: q.Collection('thread_users'),
          actions: {
            read: true,
            write: false,
            create: false,
            delete: false,
            history_read: false,
            history_write: false,
          },
        },
        {
          resource: q.Index('campaigns'),
          actions: {
            unrestricted_read: false,
            read: true,
            history_read: false,
          },
        },
        {
          resource: q.Index('booking_campaign_by_campaign'),
          actions: {
            unrestricted_read: false,
            read: true,
            history_read: false,
          },
        },
        {
          resource: q.Index('booking_user_by_user'),
          actions: {
            unrestricted_read: false,
            read: true,
            history_read: false,
          },
        },
        {
          resource: q.Index('campaign_user_by_user'),
          actions: {
            unrestricted_read: false,
            read: true,
            history_read: false,
          },
        },
        {
          resource: q.Index('thread_users_by_thread'),
          actions: {
            unrestricted_read: false,
            read: true,
            history_read: false,
          },
        },
        {
          resource: q.Index('all_thread_users'),
          actions: {
            unrestricted_read: false,
            read: true,
            history_read: false,
          },
        },
        {
          resource: q.Index('thread_users_by_thread_and_user'),
          actions: {
            unrestricted_read: false,
            read: true,
            history_read: false,
          },
        },
        {
          resource: q.Index('message_thread_by_thread'),
          actions: {
            unrestricted_read: false,
            read: true,
            history_read: false,
          },
        },
        {
          resource: q.Index('thread_users_by_user'),
          actions: {
            unrestricted_read: false,
            read: true,
            history_read: false,
          },
        },
        {
          resource: q.Function('current_user'),
          actions: {
            call: true,
          },
        },
        {
          resource: q.Function('campaigns_by_user_type'),
          actions: {
            call: true,
          },
        },
      ],
    })
  );

  console.log('"user" role created');
};
