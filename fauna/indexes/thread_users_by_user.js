const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "thread_users_by_user" index');

  await client.query(
    makeIndex({
      name: 'thread_users_by_user',
      source: q.Collection('thread_users'),
      terms: [
        {
          field: ['data', 'userID'],
        },
      ],
      values: [
        {
          field: ['data', 'threadID'],
        },
      ],
    })
  );
};
