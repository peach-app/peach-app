const { client, q } = require('../helpers/db');
const { makeRole } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeRole({
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
        {
          resource: q.Function('register'),
          actions: {
            call: true,
          },
        },
      ],
      membership: [],
    })
  );

  console.log('"auth" role created');
};
