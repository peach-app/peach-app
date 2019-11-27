const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "booking_by_user" index');

  await client.query(
    makeIndex({
      name: 'booking_by_user',
      source: q.Collection('Booking'),
      terms: [
        {
          field: ['data', 'user'],
        },
      ],
    })
  );
};
