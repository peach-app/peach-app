const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "user_by_type" index');

  await client.query(
    makeIndex({
      name: 'user_by_type',
      source: q.Collection('User'),
      terms: [
        {
          field: ['data', 'type'],
        },
      ],
    })
  );
};
