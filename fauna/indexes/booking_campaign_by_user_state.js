const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "booking_campaign_by_user_state" index');

  await client.query(
    makeIndex({
      name: 'booking_campaign_by_user_state',
      source: q.Collection('Booking'),
      terms: [
        {
          field: ['data', 'user'],
        },
        {
          field: ['data', 'state'],
        },
      ],
      values: [
        {
          field: ['data', 'campaign'],
        },
      ],
    })
  );
};
