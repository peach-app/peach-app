const { client } = require('../helpers/db');
const { makeCollection } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "thread_users" collection');

  await client.query(
    makeCollection({
      name: 'thread_users',
    })
  );
};
