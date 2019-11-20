const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeIndex({
      name: 'booking_by_campaign_user',
      source: q.Collection('Booking'),
      terms: [
        {
          field: ['data', 'user'],
        },
        {
          field: ['data', 'campaign'],
        },
      ],
    })
  );

  console.log('"booking_by_campaign_user" index created');
};
