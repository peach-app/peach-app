const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "work_sample_by_user" index');

  await client.query(
    makeIndex({
      name: 'work_sample_by_user',
      source: q.Collection('WorkSample'),
      terms: [
        {
          field: ['data', 'user'],
        },
      ],
    })
  );
};
