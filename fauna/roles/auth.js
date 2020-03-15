const { client, q } = require('../helpers/db');
const { makeRole } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "auth" role');

  await client.query(
    makeRole({
      name: 'auth',
      privileges: [
        {
          resource: q.Collection('User'),
          actions: {
            read: true,
            create: true,
          },
        },
        {
          resource: q.Index('user_by_email'),
          actions: {
            read: true,
          },
        },
        {
          resource: q.Collection('EmailVerification'),
          actions: {
            create: true,
            write: true,
          },
        },
      ],
      membership: [],
    })
  );
};
