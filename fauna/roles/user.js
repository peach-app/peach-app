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
      privileges: [],
    })
  );
};
