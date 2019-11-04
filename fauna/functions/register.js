const { client, q } = require('../helpers/db');
const { makeFunction } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeFunction({
      name: 'register',
      body: q.Query(
        q.Lambda(
          ['email', 'password', 'type'],
          q.Do(
            q.Create(q.Collection('User'), {
              data: {
                email: q.Var('email'),
                type: q.Var('type'),
              },
              credentials: { password: q.Var('password') },
            }),
            q.Let(
              {
                user: q.Login(
                  q.Match(q.Index('unique_User_email'), q.Var('email')),
                  {
                    password: q.Var('password'),
                  }
                ),
              },
              {
                secret: q.Select(['secret'], q.Var('user')),
              }
            )
          )
        )
      ),
    })
  );
  console.log('"register" function created');
};
