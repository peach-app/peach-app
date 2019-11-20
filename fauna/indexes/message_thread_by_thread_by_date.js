const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "message_thread_by_thread_by_date" index');

  await client.query(
    makeIndex({
      name: 'message_thread_by_thread_by_date',
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
};
