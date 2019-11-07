const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeIndex({
      name: 'messages_by_date_asc',
      source: q.Collection('Message'),
      terms: [
        {
          field: ['data', 'thread'],
        },
      ],
      values: [
        {
          field: ['data', 'date'],
          reverse: true,
        },
        { field: ['ref'] },
      ],
    })
  );

  console.log('"messages_by_date_asc" index created');
};
