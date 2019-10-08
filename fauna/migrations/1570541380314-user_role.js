'use strict';
const { client, q } = require('../db');

module.exports.up = async () => {
  await client.query(
    q.CreateRole({
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
                q.Equals(
                  q.Identity(),
                  q.Select(['data', 'user'], q.Get(q.Var('ref')))
                )
              )
            ),
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
      ],
    })
  );
};

module.exports.down = async () => {
  await client.query(q.Delete(q.Role('user')));
};
