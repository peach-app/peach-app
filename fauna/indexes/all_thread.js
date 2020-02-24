const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "all_thread" index');

  await client.query(
    makeIndex({
      name: 'all_thread',
      source: q.Collection('Thread'),
    })
  );
};