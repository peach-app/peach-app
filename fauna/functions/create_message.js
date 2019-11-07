const { client, q } = require('../helpers/db');
const { makeFunction } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeFunction({
      name: 'create_message',
      body: q.Query(
        q.Lambda(
          ['thread', 'text'],
          q.Create(q.Collection('Message'), {
            data: {
              user: q.Identity(),
              text: q.Var('text'),
              thread: q.Ref(q.Collection('Thread'), q.Var('thread')),
              date: q.Time('now'),
            },
          })
        )
      ),
    })
  );

  console.log('"create_message" function created');
};
