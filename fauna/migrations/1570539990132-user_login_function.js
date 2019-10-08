'use strict';
const { client, q } = require('../db');

module.exports.up = async () => {
  await client.query(
    q.CreateFunction({
      name: 'user_login',
      body: q.Query(
        q.Lambda(
          ['email', 'password'],
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
      ),
    })
  );
};

module.exports.down = async () => {
  await client.query(q.Delete(q.Function('user_login')));
};
