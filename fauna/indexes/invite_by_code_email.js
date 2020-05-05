const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "invite_by_code_email" index');

  await client.query(
    makeIndex({
      name: 'invite_by_code_email',
      source: q.Collection('Invite'),
      terms: [
        {
          field: ['data', 'code'],
        },
        {
          field: ['data', 'email'],
        },
      ],
    })
  );
};
