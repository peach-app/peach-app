const { client } = require('../helpers/db');
const { makeCollection } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "User_PromoCode" collection');

  await client.query(
    makeCollection({
      name: 'User_PromoCode',
    })
  );
};
