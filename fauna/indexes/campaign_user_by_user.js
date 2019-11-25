const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "campaign_user_by_user" index');

  await client.query(
    makeIndex({
      name: 'campaign_user_by_user',
      source: q.Collection('Campaign'),
      terms: [
        {
          field: ['data', 'user'],
        },
      ],
    })
  );
};
