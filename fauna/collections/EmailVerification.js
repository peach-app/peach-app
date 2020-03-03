const { client } = require('../helpers/db');
const { makeCollection } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "Email Verification" collection');

  await client.query(
    makeCollection({
      name: 'EmailVerification',
    })
  );
};
