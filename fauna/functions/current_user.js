const { client, q } = require('../helpers/db');
const { makeFunction } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeFunction({
      name: 'current_user',
      body: q.Query(q.Lambda([], q.Get(q.Identity()))),
    })
  );

  console.log('"current_user" function created');
};
