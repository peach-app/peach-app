const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "booking_user_by_campaign" index');

  await client.query(
    makeIndex({
      name: 'booking_user_by_campaign',
      source: q.Collection('Booking'),
      terms: [
        {
          field: ['data', 'campaign'],
        },
      ],
      values: [
        {
          field: ['data', 'user'],
        },
      ],
    })
  );
};
