const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "user_by_email" index');

  await client.query(
    makeIndex({
      name: 'user_by_email',
      source: q.Collection('User'),
      terms: [
        {
          field: ['data', 'email'],
        },
      ],
    })
  );
};
