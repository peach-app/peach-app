const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "social_accounts_by_user" index');

  await client.query(
    makeIndex({
      name: 'social_accounts_by_user',
      source: q.Collection('SocialAccounts'),
      terms: [
        {
          field: ['data', 'user'],
        },
      ],
      values: [
        {
          field: ['ref'],
          reverse: true,
        },
      ],
    })
  );
};
