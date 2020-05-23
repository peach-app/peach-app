const { client } = require('../helpers/db');
const { makeCollection } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "PromoCode" collection');

  await client.query(
    makeCollection({
      name: 'PromoCode',
    })
  );
};
