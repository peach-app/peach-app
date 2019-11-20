const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "all_thread_users" index');

  await client.query(
    makeIndex({
      name: 'all_thread_users',
      source: q.Collection('thread_users'),
    })
  );
};
