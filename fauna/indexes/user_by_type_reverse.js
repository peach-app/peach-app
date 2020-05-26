const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "user_by_type_reverse" index');

  await client.query(
    makeIndex({
      name: 'user_by_type_reverse',
      source: q.Collection('User'),
      terms: [
        {
          field: ['data', 'type'],
        },
      ],
      values: [
        {
          field: ['ref'],
          reverse: true,
        },
      ],
    })
  );
};
