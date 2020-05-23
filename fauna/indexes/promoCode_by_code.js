const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "promoCode_by_code" index');

  await client.query(
    makeIndex({
      name: 'promoCode_by_code',
      source: q.Collection('PromoCode'),
      terms: [
        {
          field: ['data', 'code'],
        },
      ],
    })
  );
};
