'use strict';
const { client, q } = require('../db');

module.exports.up = async () => {
  await client.query(
    q.CreateRole({
      name: 'auth',
      privileges: [
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
          resource: q.Index('unique_User_email'),
          actions: {
            unrestricted_read: false,
            read: true,
            history_read: false,
          },
        },
        {
          resource: q.Function('user_login'),
          actions: {
            call: true,
          },
        },
      ],
      membership: [],
    })
  );
};

module.exports.down = async () => {
  await client.query(q.Delete(q.Role('auth')));
};
