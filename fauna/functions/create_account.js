const { client, q } = require('../helpers/db');
const { makeFunction } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeFunction({
      name: 'create_account',
      body: q.Query(
        q.Lambda(
          ['id', 'user', 'balance'],
          q.Create(q.Collection('Account'), {
            data: {
              id: q.Var('id'),
              user: q.Identity(),
              balance: q.Var('balance'),
            },
          })
        )
      ),
    })
  );

  console.log('"create_account" function created');
};
