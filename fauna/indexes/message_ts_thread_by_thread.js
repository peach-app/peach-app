const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "message_ts_thread_by_thread" index');

  await client.query(
    makeIndex({
      name: 'message_ts_thread_by_thread',
      source: q.Collection('Message'),
      terms: [
        {
          field: ['data', 'thread'],
        },
      ],
      values: [
        {
          field: ['ts'],
          reverse: true,
        },
        { field: ['ref'] },
      ],
    })
  );
};
