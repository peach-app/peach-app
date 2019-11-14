const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
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

  console.log('"message_thread_by_thread_by_date" index created');
};
