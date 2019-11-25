const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "unique_user_email" index');

  await client.query(
    makeIndex({
      name: 'unique_user_email',
      source: q.Collection('User'),
      terms: [
        {
          field: ['data', 'email'],
        },
      ],
    })
  );
};
