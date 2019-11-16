const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeIndex({
      name: 'account_user_by_user',
      source: q.Collection('Account'),
      terms: [
        {
          field: ['data', 'user'],
        },
      ],
    })
  );

  console.log('"account_user_by_user" index created');
};
