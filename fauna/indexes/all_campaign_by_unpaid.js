const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "all_campaign_by_unpaid" index');

  await client.query(
    makeIndex({
      name: 'all_campaign_by_unpaid',
      source: q.Collection('Campaign'),
      terms: [
        {
          field: ['data', 'unpaid'],
        },
      ],
      values: [
        {
          field: ['ref'],
          reverse: true,
        },
      ],
    })
  );
};
