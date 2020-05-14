const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "user_by_campaign_booking" index');

  await client.query(
    makeIndex({
      name: 'user_by_campaign_booking',
      source: q.Collection('User'),
      terms: [
        {
          field: ['data', 'campaign'],
        },
      ],
      values: [
        {
          field: ['data', 'booking'],
        },
      ],
    })
  );
};
