const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "thread_users_by_thread_user" index');

  await client.query(
    makeIndex({
      name: 'thread_users_by_thread_user',
      source: q.Collection('thread_users'),
      terms: [
        {
          field: ['data', 'threadID'],
        },
        {
          field: ['data', 'userID'],
        },
      ],
    })
  );
};
