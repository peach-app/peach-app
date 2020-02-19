const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "booking_campaign_by_state" index');

  await client.query(
    makeIndex({
      name: 'booking_campaign_by_state',
      source: q.Collection('Booking'),
      terms: [
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