const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "all_user" index');

  await client.query(
    makeIndex({
      name: 'all_user',
      source: q.Collection('User'),
    })
  );
};
