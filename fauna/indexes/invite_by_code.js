const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "invite_by_code" index');

  await client.query(
    makeIndex({
      name: 'invite_by_code',
      source: q.Collection('Invite'),
      terms: [
        {
          field: ['data', 'code'],
        },
      ],
    })
  );
};
