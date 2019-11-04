const { client, q } = require('../helpers/db');
const { makeRole } = require('../helpers/updateOrCreate');

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
            read: true,
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
