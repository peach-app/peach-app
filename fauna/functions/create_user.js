const { client, q } = require('../helpers/db');
const { makeFunction } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeFunction({
      name: 'create_user',
      body: q.Query(
        q.Lambda(
          ['email', 'password'],
          q.Create(q.Collection('User'), {
            data: {
              email: q.Var('email'),
            },
            credentials: { password: q.Var('password') },
          })
        )
      ),
    })
  );
  console.log('"create_user" function created');
};
