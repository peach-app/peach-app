const { client, q } = require('../helpers/db');
const { makeFunction } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeFunction({
      name: 'register',
      body: q.Query(
        q.Lambda(
          ['email', 'password', 'type'],
          q.Create(q.Collection('User'), {
            data: {
              email: q.Var('email'),
              type: q.Var('type'),
            },
            credentials: { password: q.Var('password') },
          })
        )
      ),
    })
  );
  console.log('"register" function created');
};
