const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "all_campaign" index');

  await client.query(
    makeIndex({
      name: 'all_campaign',
      source: q.Collection('Campaign'),
      values: [
        {
          field: ['ref'],
          reverse: true,
        },
      ],
    })
  );
};
