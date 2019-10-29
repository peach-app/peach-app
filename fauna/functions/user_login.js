const { client, q } = require('../helpers/db');
const { makeFunction } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeFunction({
      name: 'user_login',
      body: q.Query(
        q.Lambda(
          ['email', 'password'],
          q.Let(
            {
              user: q.Login(q.Match(q.Index('unique_User_email'), q.Var('email')), {
                password: q.Var('password')
              })
            },
            {
              secret: q.Select(['secret'], q.Var('user'))
            }
          )
        )
      )
    })
  );

  console.log('"user_login" function created');
};
