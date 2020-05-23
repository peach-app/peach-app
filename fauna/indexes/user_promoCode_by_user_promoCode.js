const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "user_promoCode_by_user_promoCode" index');

  await client.query(
    makeIndex({
      name: 'user_promoCode_by_user_promoCode',
      source: q.Collection('User_PromoCode'),
      terms: [
        {
          field: ['data', 'user'],
        },
        {
          field: ['data', 'promoCode'],
        },
      ],
    })
  );
};
