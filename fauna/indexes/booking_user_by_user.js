const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeIndex({
      name: 'booking_user_by_user',
      source: q.Collection('Booking'),
      terms: [
        {
          field: ['data', 'user'],
        },
      ],
    })
  );

  console.log('"booking_user_by_user" index created');
};
