const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "all_booking" index');

  await client.query(
    makeIndex({
      name: 'all_booking',
      source: q.Collection('Booking'),
    })
  );
};
